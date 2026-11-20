// Regression tests for the Cloud Range IAM evaluator. Run: npx tsx scripts/test-iam.ts
import { evaluate, parsePolicy, type EvalRequest, type EvalStack, type PolicyDoc } from "../src/lib/cloud/iam"

let failed = 0
const P = (o: unknown): PolicyDoc => {
  const r = parsePolicy(JSON.stringify(o))
  if (!r.ok) throw new Error(r.error)
  return r.doc
}
function check(name: string, req: EvalRequest, stack: EvalStack, expect: "allow" | "deny", reasonHas?: string) {
  const r = evaluate(req, stack)
  const ok = r.decision === expect && (!reasonHas || r.reason.includes(reasonHas))
  if (!ok) failed++
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `   -> got ${r.decision}: ${r.reason}`}`)
}

const s3get = { Effect: "Allow", Action: "s3:GetObject", Resource: "arn:aws:s3:::data/*" }

// basics
check("implicit deny with no policy", { action: "s3:GetObject", resource: "arn:aws:s3:::data/a" }, { identity: [] }, "deny", "Implicit")
check("identity allow", { action: "s3:GetObject", resource: "arn:aws:s3:::data/a" }, { identity: [P({ Statement: [s3get] })] }, "allow")
check("action wildcard + case-insensitive", { action: "S3:getobject", resource: "arn:aws:s3:::data/a" }, { identity: [P({ Statement: { ...s3get, Action: "s3:Get*" } })] }, "allow")
check("resource mismatch is deny", { action: "s3:GetObject", resource: "arn:aws:s3:::other/a" }, { identity: [P({ Statement: [s3get] })] }, "deny")
check("NotAction allows everything else", { action: "ec2:RunInstances", resource: "*" }, { identity: [P({ Statement: [{ Effect: "Allow", NotAction: "iam:*", Resource: "*" }] })] }, "allow")
check("NotAction excludes listed", { action: "iam:CreateUser", resource: "*" }, { identity: [P({ Statement: [{ Effect: "Allow", NotAction: "iam:*", Resource: "*" }] })] }, "deny")

// explicit deny wins
check("explicit deny beats allow", { action: "s3:GetObject", resource: "arn:aws:s3:::data/a" },
  { identity: [P({ Statement: [s3get, { Effect: "Deny", Action: "s3:*", Resource: "*" }] })] }, "deny", "Explicit Deny")

// conditions
const mfa = P({ Statement: [{ Effect: "Allow", Action: "ec2:StopInstances", Resource: "*", Condition: { Bool: { "aws:MultiFactorAuthPresent": "true" } } }] })
check("Bool condition met", { action: "ec2:StopInstances", resource: "*", context: { "aws:MultiFactorAuthPresent": true } }, { identity: [mfa] }, "allow")
check("Bool condition false", { action: "ec2:StopInstances", resource: "*", context: { "aws:MultiFactorAuthPresent": false } }, { identity: [mfa] }, "deny")
check("Bool condition key missing -> deny", { action: "ec2:StopInstances", resource: "*" }, { identity: [mfa] }, "deny")
const ipOnly = P({ Statement: [{ Effect: "Allow", Action: "s3:*", Resource: "*", Condition: { IpAddress: { "aws:SourceIp": ["203.0.113.0/24"] } } }] })
check("IpAddress inside CIDR", { action: "s3:GetObject", resource: "x", context: { "aws:SourceIp": "203.0.113.77" } }, { identity: [ipOnly] }, "allow")
check("IpAddress outside CIDR", { action: "s3:GetObject", resource: "x", context: { "aws:SourceIp": "198.51.100.9" } }, { identity: [ipOnly] }, "deny")
const denyNotIp = P({ Statement: [{ Effect: "Allow", Action: "*", Resource: "*" }, { Effect: "Deny", Action: "*", Resource: "*", Condition: { NotIpAddress: { "aws:SourceIp": ["203.0.113.0/24"] } } }] })
check("Deny NotIpAddress: outside range denied", { action: "s3:GetObject", resource: "x", context: { "aws:SourceIp": "198.51.100.9" } }, { identity: [denyNotIp] }, "deny")
check("Deny NotIpAddress: inside range allowed", { action: "s3:GetObject", resource: "x", context: { "aws:SourceIp": "203.0.113.5" } }, { identity: [denyNotIp] }, "allow")
check("Negated op on missing key is true (Deny fires)", { action: "s3:GetObject", resource: "x" }, { identity: [denyNotIp] }, "deny")
const tls = P({ Statement: [{ Effect: "Deny", Principal: "*", Action: "s3:*", Resource: "arn:aws:s3:::b/*", Condition: { Bool: { "aws:SecureTransport": "false" } } }, { Effect: "Allow", Principal: "*", Action: "s3:GetObject", Resource: "arn:aws:s3:::b/*" }] })
check("Bucket policy: HTTP denied", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: "arn:aws:iam::111122223333:user/u", context: { "aws:SecureTransport": false } }, { resource: tls }, "deny", "Explicit Deny")
check("Bucket policy: HTTPS allowed (public read)", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: "arn:aws:iam::111122223333:user/u", context: { "aws:SecureTransport": true } }, { resource: tls }, "allow")
const varPolicy = P({ Statement: [{ Effect: "Allow", Action: "s3:*", Resource: "arn:aws:s3:::home/${aws:username}/*" }] })
check("Policy variable matches own folder", { action: "s3:GetObject", resource: "arn:aws:s3:::home/alice/f", context: { "aws:username": "alice" } }, { identity: [varPolicy] }, "allow")
check("Policy variable blocks other folder", { action: "s3:GetObject", resource: "arn:aws:s3:::home/bob/f", context: { "aws:username": "alice" } }, { identity: [varPolicy] }, "deny")
const fa = P({ Statement: [{ Effect: "Allow", Action: "dynamodb:*", Resource: "*", Condition: { "ForAllValues:StringEquals": { "dynamodb:Attributes": ["id", "name"] } } }] })
check("ForAllValues all inside set", { action: "dynamodb:GetItem", resource: "*", context: { "dynamodb:Attributes": ["id", "name"] } }, { identity: [fa] }, "allow")
check("ForAllValues one outside set", { action: "dynamodb:GetItem", resource: "*", context: { "dynamodb:Attributes": ["id", "ssn"] } }, { identity: [fa] }, "deny")

// guardrails
const adminAll = P({ Statement: [{ Effect: "Allow", Action: "*", Resource: "*" }] })
const boundary = P({ Statement: [{ Effect: "Allow", Action: ["s3:*", "ec2:Describe*"], Resource: "*" }] })
check("Boundary blocks what identity allows", { action: "iam:CreateUser", resource: "*" }, { identity: [adminAll], boundary }, "deny", "permission boundary")
check("Boundary lets intersection through", { action: "s3:GetObject", resource: "x" }, { identity: [adminAll], boundary }, "allow")
check("Boundary alone grants nothing", { action: "s3:GetObject", resource: "x" }, { identity: [], boundary }, "deny")
const scpDenyRegion = P({ Statement: [{ Effect: "Allow", Action: "*", Resource: "*" }, { Effect: "Deny", Action: "*", Resource: "*", Condition: { StringNotEquals: { "aws:RequestedRegion": ["eu-west-1"] } } }] })
check("SCP region lock denies us-east-1", { action: "ec2:RunInstances", resource: "*", context: { "aws:RequestedRegion": "us-east-1" } }, { identity: [adminAll], scp: [scpDenyRegion] }, "deny", "service control policy")
check("SCP region lock allows eu-west-1", { action: "ec2:RunInstances", resource: "*", context: { "aws:RequestedRegion": "eu-west-1" } }, { identity: [adminAll], scp: [scpDenyRegion] }, "allow")

// resource policies / principals / accounts
const caller = "arn:aws:iam::111122223333:user/alice"
const bucketToAlice = P({ Statement: [{ Effect: "Allow", Principal: { AWS: caller }, Action: "s3:GetObject", Resource: "arn:aws:s3:::b/*" }] })
check("Same account: resource policy grants named user with no identity policy", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: caller }, { identity: [], resource: bucketToAlice }, "allow")
check("Resource policy for someone else does not grant", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: "arn:aws:iam::111122223333:user/bob" }, { identity: [], resource: bucketToAlice }, "deny")
const bucketToRoot = P({ Statement: [{ Effect: "Allow", Principal: { AWS: "arn:aws:iam::111122223333:root" }, Action: "s3:GetObject", Resource: "arn:aws:s3:::b/*" }] })
check("Account-root principal alone does NOT grant", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: caller }, { identity: [], resource: bucketToRoot }, "deny", "delegates")
check("Account-root principal + identity allow grants", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: caller }, { identity: [P({ Statement: [{ Effect: "Allow", Action: "s3:GetObject", Resource: "*" }] })], resource: bucketToRoot }, "allow")
const other = "arn:aws:iam::999988887777:role/partner"
check("Cross-account needs BOTH (only resource policy) -> deny", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: other }, { identity: [], resource: P({ Statement: [{ Effect: "Allow", Principal: { AWS: other }, Action: "s3:GetObject", Resource: "arn:aws:s3:::b/*" }] }), crossAccount: true }, "deny")
check("Cross-account with both -> allow", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: other }, { identity: [P({ Statement: [{ Effect: "Allow", Action: "s3:GetObject", Resource: "*" }] })], resource: P({ Statement: [{ Effect: "Allow", Principal: { AWS: other }, Action: "s3:GetObject", Resource: "arn:aws:s3:::b/*" }] }), crossAccount: true }, "allow")
const trust = P({ Statement: [{ Effect: "Allow", Principal: { Service: "lambda.amazonaws.com" }, Action: "sts:AssumeRole" }] })
check("Trust policy: service principal may assume", { action: "sts:AssumeRole", principal: "lambda.amazonaws.com" }, { resource: trust }, "allow")
check("Trust policy: user may not assume", { action: "sts:AssumeRole", principal: caller }, { resource: trust }, "deny")
check("Assumed-role session matches its role principal", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: "arn:aws:sts::111122223333:assumed-role/app/sess" }, { resource: P({ Statement: [{ Effect: "Allow", Principal: { AWS: "arn:aws:iam::111122223333:role/app" }, Action: "s3:GetObject", Resource: "arn:aws:s3:::b/*" }] }) }, "allow")
check("Public (*) bucket policy allows anyone", { action: "s3:GetObject", resource: "arn:aws:s3:::b/k", principal: "arn:aws:iam::444455556666:user/stranger" }, { resource: P({ Statement: [{ Effect: "Allow", Principal: "*", Action: "s3:GetObject", Resource: "arn:aws:s3:::b/*" }] }) }, "allow")

// parsing
const bad = parsePolicy('{"Statement":[{"Effect":"Maybe","Action":"s3:*"}]}')
console.log(`${!bad.ok ? "PASS" : "FAIL"}  rejects invalid Effect`)
if (bad.ok) failed++
const notJson = parsePolicy("{oops")
console.log(`${!notJson.ok ? "PASS" : "FAIL"}  rejects non-JSON`)
if (notJson.ok) failed++

console.log(failed ? `\n${failed} FAILED` : "\nAll IAM evaluator tests passed")
process.exit(failed ? 1 : 0)
