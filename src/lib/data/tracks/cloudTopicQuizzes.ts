import type { TopicQuiz } from "@/types"

export const CLOUD_TOPIC_QUIZZES: TopicQuiz[] = [
  {
    "topicId": "cloud-m1-1",
    "questions": [
      {
        "question": "Which set correctly lists the five essential cloud characteristics from NIST SP 800-145?",
        "options": [
          "Encryption, firewalls, redundancy, monitoring, backups",
          "On-demand self-service, broad network access, resource pooling, rapid elasticity, measured service",
          "IaaS, PaaS, SaaS, FaaS, XaaS",
          "Availability, integrity, confidentiality, scalability, portability"
        ],
        "correctIndex": 1,
        "explanation": "NIST defines cloud by five traits: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. The others are real concepts but not the NIST definition."
      },
      {
        "question": "What best distinguishes the control plane from the data plane?",
        "options": [
          "The control plane is encrypted and the data plane is not",
          "The control plane is the management API that creates/configures/deletes resources; the data plane is the workload traffic to those resources",
          "The control plane is for admins and the data plane is for developers",
          "They are two names for the same HTTPS traffic"
        ],
        "correctIndex": 1,
        "explanation": "Control plane = management APIs (e.g. ec2/s3/iam) that manipulate resources. Data plane = the actual application/workload traffic once a resource exists. Most cloud breaches target the control plane via stolen credentials."
      },
      {
        "question": "As you move from IaaS to PaaS to SaaS to serverless, what happens to the customer's management responsibility?",
        "options": [
          "It increases because there are more moving parts",
          "It stays constant across all service models",
          "It shifts 'left' toward the provider — the customer manages progressively less",
          "It disappears entirely at the SaaS level"
        ],
        "correctIndex": 2,
        "explanation": "More managed service means the provider handles more layers (OS, runtime, scaling), so customer responsibility shrinks toward just data and access as you move IaaS → PaaS → SaaS → serverless."
      },
      {
        "question": "Why is multi-tenancy a security-relevant property of the cloud?",
        "options": [
          "Because it means every customer gets a dedicated physical server",
          "Because tenants share pooled hardware, so the provider's isolation boundary (hypervisor) failing can cause cross-tenant exposure",
          "Because it eliminates the need for IAM",
          "Because it makes denial-of-wallet impossible"
        ],
        "correctIndex": 1,
        "explanation": "Resource pooling means many customers share hardware, separated by virtualization. A break in that isolation boundary is a high-severity cross-tenant vulnerability — which is why isolation is squarely the provider's responsibility."
      },
      {
        "question": "What is the cloud equivalent of running `whoami`, used to identify the credential you currently hold?",
        "options": [
          "aws ec2 describe-instances",
          "aws s3 ls",
          "aws sts get-caller-identity",
          "aws configure list"
        ],
        "correctIndex": 2,
        "explanation": "`aws sts get-caller-identity` returns the account, user ID, and ARN of the calling identity without needing any extra permissions — the first thing to run after obtaining credentials."
      }
    ]
  },
  {
    "topicId": "cloud-m1-2",
    "questions": [
      {
        "question": "In AWS's phrasing, the provider is responsible for security 'OF the cloud' and the customer for security 'IN the cloud.' Which item is customer-owned?",
        "options": [
          "The physical data center and its access controls",
          "The hypervisor that isolates tenants",
          "IAM policies and S3 bucket access configuration",
          "The host operating system under the virtualization layer"
        ],
        "correctIndex": 2,
        "explanation": "IAM and resource access configuration (like bucket policies) are always the customer's job. Physical facilities, the hypervisor, and the host OS are the provider's 'security OF the cloud.'"
      },
      {
        "question": "How does the responsibility line move as you adopt more managed services (IaaS → SaaS)?",
        "options": [
          "The customer takes on more responsibility",
          "The provider takes on more layers; the customer's surface shrinks toward data and access",
          "Responsibility is fixed and never changes",
          "The customer becomes responsible for the hypervisor"
        ],
        "correctIndex": 1,
        "explanation": "More managed service means the provider operates more of the stack (OS, runtime, scaling), so the customer's responsibility narrows — but identity/access and data always remain the customer's."
      },
      {
        "question": "Which responsibilities remain with the customer in essentially every cloud service model?",
        "options": [
          "Hypervisor patching and physical security",
          "Identity/access management and data governance",
          "Host OS hardening and facility power",
          "Managed-service source code"
        ],
        "correctIndex": 1,
        "explanation": "Regardless of IaaS/PaaS/SaaS/serverless, the customer always decides who can access resources (IAM) and how data is classified, located, and protected."
      },
      {
        "question": "For a managed database like Amazon RDS, which task is still the customer's responsibility?",
        "options": [
          "Patching the underlying host operating system",
          "Patching the database engine binaries",
          "Choosing whether the database is publicly accessible and which principals/security groups can reach it",
          "Replacing failed physical disks"
        ],
        "correctIndex": 2,
        "explanation": "AWS patches the engine and host OS for RDS, but network exposure, encryption choice, and access control remain customer-configured — 'managed' covers operations, not your access decisions."
      },
      {
        "question": "What is the 'common fatal assumption' the shared responsibility model warns against?",
        "options": [
          "That encryption is always enabled by default",
          "That because a service is managed (e.g. S3), its data is automatically secure without configuring access",
          "That the customer must patch the hypervisor",
          "That IAM is handled by the provider"
        ],
        "correctIndex": 1,
        "explanation": "Assuming 'it's managed, so it's secure' ignores that bucket policies, ACLs, and Block Public Access are customer-owned. Most cloud data leaks stem from exactly this misconfiguration."
      }
    ]
  },
  {
    "topicId": "cloud-m1-3",
    "questions": [
      {
        "question": "Which row correctly maps object storage across AWS, Azure, and GCP?",
        "options": [
          "EBS / Managed Disk / Persistent Disk",
          "S3 / Azure Blob Storage / Cloud Storage (GCS)",
          "EC2 / Virtual Machine / Compute Engine",
          "VPC / VNet / VPC"
        ],
        "correctIndex": 1,
        "explanation": "Object storage: AWS S3 = Azure Blob Storage = GCP Cloud Storage. EBS/Managed Disk/Persistent Disk is block storage; EC2/VM/GCE is compute; VPC/VNet/VPC is networking."
      },
      {
        "question": "An AWS IAM role attached to a workload most closely corresponds on GCP to a:",
        "options": [
          "Firewall rule",
          "Service account",
          "Folder",
          "Persistent Disk"
        ],
        "correctIndex": 1,
        "explanation": "Workload identity maps as AWS role ≈ Azure managed identity/service principal ≈ GCP service account. These are the non-human identities attackers target to inherit cloud permissions."
      },
      {
        "question": "The primary unit of isolation and billing maps roughly as:",
        "options": [
          "AWS Region ≈ Azure VNet ≈ GCP Folder",
          "AWS Account ≈ Azure Subscription ≈ GCP Project",
          "AWS Security Group ≈ Azure Subscription ≈ GCP Org",
          "AWS OU ≈ Azure NSG ≈ GCP Firewall"
        ],
        "correctIndex": 1,
        "explanation": "AWS Account ≈ Azure Subscription ≈ GCP Project is the standard mapping for the main containment/billing unit, each sitting inside a higher org hierarchy."
      },
      {
        "question": "AWS Security Group, Azure NSG, and GCP Firewall rule are all examples of:",
        "options": [
          "Identity providers",
          "Object storage services",
          "Resource-level network access controls (stateful allow-lists)",
          "Organization governance policies"
        ],
        "correctIndex": 2,
        "explanation": "All three control inbound/outbound traffic to resources with allow-lists — they are the per-resource firewall primitive on each provider."
      },
      {
        "question": "What is the correct caution about the cross-provider mapping?",
        "options": [
          "It is exact and interchangeable in every detail",
          "It is a good orientation tool, but IAM semantics, defaults, and org tiers differ, so verify the specific provider before acting",
          "It only applies to compute, never to identity",
          "It is outdated and no longer used"
        ],
        "correctIndex": 1,
        "explanation": "The mapping orients you quickly, but evaluation logic, public-exposure defaults, and hierarchy tiers genuinely differ. Use it to get bearings, then consult the specific provider's documentation."
      }
    ]
  },
  {
    "topicId": "cloud-m1-4",
    "questions": [
      {
        "question": "In AWS, what is the strongest default isolation boundary between workloads?",
        "options": [
          "The region",
          "The security group",
          "The account",
          "The availability zone"
        ],
        "correctIndex": 2,
        "explanation": "The AWS account is a hard boundary: by default, principals in one account cannot access another account's resources unless cross-account trust is explicitly granted. Regions and AZs are about geography/resilience, not identity isolation."
      },
      {
        "question": "What can a Service Control Policy (SCP) do in AWS Organizations?",
        "options": [
          "Grant new permissions to accounts in an OU",
          "Only restrict — set the maximum permissions available, never grant",
          "Replace the need for IAM policies entirely",
          "Encrypt data across accounts"
        ],
        "correctIndex": 1,
        "explanation": "SCPs are guardrails that can only restrict the maximum possible permissions in member accounts. They never grant access — an action still needs an IAM allow, and the SCP caps what is even possible."
      },
      {
        "question": "Which AWS services are global rather than regional, meaning a change applies everywhere at once?",
        "options": [
          "EC2 and RDS",
          "S3 buckets and EBS volumes",
          "IAM and Route 53",
          "Lambda and DynamoDB"
        ],
        "correctIndex": 2,
        "explanation": "IAM (identities/policies) and Route 53 (DNS) are global services. Most others (EC2, S3 buckets, RDS, EBS) are regional and must be enumerated region by region."
      },
      {
        "question": "Why does running dev, staging, and prod in separate accounts reduce risk?",
        "options": [
          "It makes resources cheaper",
          "A compromise in one account cannot reach the others without explicit cross-account trust, containing the blast radius",
          "It automatically encrypts all data",
          "It removes the need for IAM policies"
        ],
        "correctIndex": 1,
        "explanation": "Account separation means a breach in dev is contained to dev; prod does not trust dev, so the attacker cannot pivot. This structural segmentation shrinks blast radius."
      },
      {
        "question": "Besides resilience, why does region selection matter for security and compliance?",
        "options": [
          "Regions determine the price of IAM",
          "Regions set data residency/sovereignty — which jurisdiction's laws govern your data (e.g. GDPR requiring EU data in EU regions)",
          "Regions control who the root user is",
          "Regions are only relevant for DNS"
        ],
        "correctIndex": 1,
        "explanation": "The region a resource lives in decides the legal jurisdiction over its data. Storing regulated data in the wrong region can be a compliance violation regardless of technical controls."
      }
    ]
  },
  {
    "topicId": "cloud-m1-5",
    "questions": [
      {
        "question": "What was the attack chain in the 2019 Capital One breach?",
        "options": [
          "Phishing → malware → ransomware on endpoints",
          "SSRF → instance metadata (IMDS) credential theft → over-permissioned role → S3 data exfiltration",
          "Hypervisor zero-day → cross-tenant memory read",
          "Supply-chain compromise of an open-source package"
        ],
        "correctIndex": 1,
        "explanation": "An SSRF let the attacker query the EC2 instance metadata service, steal the over-permissioned role's credentials, and use them to download customer data from S3 — a chain of a classic web bug, a cloud credential source, and a least-privilege failure."
      },
      {
        "question": "What special IP address does an EC2 instance's metadata service (IMDS) use, making it the target of SSRF-to-credential attacks?",
        "options": [
          "127.0.0.1",
          "10.0.0.1",
          "169.254.169.254",
          "8.8.8.8"
        ],
        "correctIndex": 2,
        "explanation": "169.254.169.254 is the link-local IMDS address where an instance fetches its own identity and role credentials. An SSRF that can reach it can steal those temporary credentials."
      },
      {
        "question": "Which statement best matches real cloud breach data?",
        "options": [
          "Most cloud breaches exploit unpatched CVEs in the hypervisor",
          "Most cloud breaches stem from misconfiguration and credential leakage, not CVE exploitation",
          "Most cloud breaches are physical data-center intrusions",
          "Most cloud breaches are caused by DDoS"
        ],
        "correctIndex": 1,
        "explanation": "Misconfiguration (public storage, open access, over-broad roles) and leaked/over-permissioned credentials dominate cloud incidents. This is why identity and configuration are the primary battleground."
      },
      {
        "question": "Which is NOT a common source of leaked cloud credentials?",
        "options": [
          "Access keys committed to a public Git repository",
          "Secrets echoed into CI/CD build logs",
          "Keys baked into public AMIs or disk snapshots",
          "Credentials stolen by physically removing a data-center hard drive"
        ],
        "correctIndex": 3,
        "explanation": "Physical drive theft is not a realistic or common cloud initial-access vector. Git repos, CI logs, container images, and public AMIs/snapshots are the typical credential-leak sources."
      },
      {
        "question": "What is the purpose of mapping a cloud finding to MITRE ATT&CK for Cloud or the CSA Pandemic Eleven?",
        "options": [
          "To encrypt the finding before reporting",
          "To give the attack a standard, recognized name/classification so reports are credible and coverage is measurable",
          "To automatically remediate the vulnerability",
          "To bill the attacker for the API calls"
        ],
        "correctIndex": 1,
        "explanation": "These frameworks provide shared taxonomies that turn an observation into a named technique or ranked threat, making findings comparable, credible, and useful for measuring defensive coverage."
      }
    ]
  },
  {
    "topicId": "cloud-m1-6",
    "questions": [
      {
        "question": "Why create a dedicated, isolated AWS account for lab work rather than using an existing account?",
        "options": [
          "Dedicated accounts get faster API responses",
          "The account is AWS's hard isolation boundary, so mistakes and teardown stay contained and cannot touch real resources",
          "Only new accounts are eligible for IAM",
          "It is required to use the AWS CLI"
        ],
        "correctIndex": 1,
        "explanation": "The AWS account is the strong isolation boundary. A sandbox account contains any mistakes, lets you safely run aggressive teardown tools, and keeps lab activity away from anything you care about."
      },
      {
        "question": "Which combination forms the cost guardrail against accidentally running up a large bill?",
        "options": [
          "A WAF and a security group",
          "AWS Budgets with alert thresholds plus a CloudWatch billing alarm, free-tier-first, and teardown of idle resources",
          "Multi-factor authentication on the root user",
          "Encrypting all S3 buckets"
        ],
        "correctIndex": 1,
        "explanation": "Budgets with alerts and a CloudWatch billing alarm warn you early, free-tier habits minimize spend, and tearing down idle resources stops ongoing charges — together defending against denial-of-wallet on yourself."
      },
      {
        "question": "What is the single most important command to run before performing actions in a cloud lab, and why?",
        "options": [
          "aws ec2 run-instances — to ensure compute exists",
          "aws sts get-caller-identity — to confirm which account and identity you are operating as",
          "aws s3 ls — to list all buckets",
          "aws configure — to reset credentials"
        ],
        "correctIndex": 1,
        "explanation": "`aws sts get-caller-identity` verifies you are in the intended sandbox and running as the expected identity, preventing you from accidentally acting against the wrong or a production account."
      },
      {
        "question": "What is LocalStack and why is it useful for safe labs?",
        "options": [
          "A paid AWS premium support tier",
          "A Docker-based local emulator of AWS services that runs offline with no cost and no real tenant, ideal for enumeration and automation practice",
          "A tool that scans other people's cloud accounts",
          "A replacement for the AWS root user"
        ],
        "correctIndex": 1,
        "explanation": "LocalStack emulates AWS services (S3, IAM, Lambda, etc.) locally in Docker. You point the CLI at its endpoint with dummy credentials — zero cost, zero risk, no real tenant touched."
      },
      {
        "question": "Which practice violates safe-testing discipline?",
        "options": [
          "Tagging all lab resources with project=cloudlab",
          "Running aws-nuke against your dedicated sandbox account after a lab",
          "Enumerating another company's AWS account you found a resource ID for, without authorization",
          "Verifying your identity before running a script"
        ],
        "correctIndex": 2,
        "explanation": "Enumerating or testing any account you do not own or lack explicit authorization for is out of scope and illegal. The core rule is: only ever test resources you own or are explicitly authorized to test."
      }
    ]
  },
  {
    "topicId": "cloud-m1-7",
    "questions": [
      {
        "question": "What is the core method of 'reading cloud like an attacker vs defender'?",
        "options": [
          "Running an automated vulnerability scanner and reading the report",
          "Enumerating identities and public entry points, tracing trust edges to data, then assigning a control to each attacker edge",
          "Encrypting every resource and enabling MFA",
          "Memorizing the AWS service catalog"
        ],
        "correctIndex": 1,
        "explanation": "The method is to read one architecture twice: as an attacker (reachable assets + trust edges to data) and as a defender (a control that cuts each edge). It is the manual logic behind threat modeling and cloud pentests."
      },
      {
        "question": "Why do attackers think primarily in terms of identities and what they can assume?",
        "options": [
          "Because identity is the cloud perimeter, and chaining from a weak identity to a powerful one is the main escalation path",
          "Because identities are the only thing that can be encrypted",
          "Because IAM is a provider responsibility",
          "Because identities do not appear in logs"
        ],
        "correctIndex": 0,
        "explanation": "In the cloud, identity is the perimeter. An identity that can assume a more privileged identity is a privilege-escalation edge — the primary way a small foothold becomes a large compromise."
      },
      {
        "question": "Which is a 'trust edge' an attacker would trace?",
        "options": [
          "The color of a diagram box",
          "A role that another identity can sts:AssumeRole into, or a secret a workload can read",
          "The monthly bill for an account",
          "The number of availability zones"
        ],
        "correctIndex": 1,
        "explanation": "A trust edge is any relationship granting access — an assumable role, a readable secret, a listable bucket, a reachable network path. Chains of these edges from an entry point to data form the attack path."
      },
      {
        "question": "In the paired exercise, what does the defender do with the attacker's attack-path graph?",
        "options": [
          "Delete the entire cloud account",
          "Assign a specific control to each edge so that cutting at least one link breaks the whole path (defense in depth)",
          "Report it to the provider as their responsibility",
          "Increase the budget alarm threshold"
        ],
        "correctIndex": 1,
        "explanation": "The defender converts each attacker edge into a concrete control (WAF/IMDSv2, remove trust, least privilege, scoped bucket policy, detection). Breaking any single link defeats the path, and multiple controls give defense in depth."
      },
      {
        "question": "Which AWS CLI capability lets you predict whether an action would be allowed, to map escalation edges with low noise?",
        "options": [
          "aws s3 sync",
          "aws iam simulate-principal-policy",
          "aws ec2 reboot-instances",
          "aws configure list-profiles"
        ],
        "correctIndex": 1,
        "explanation": "`aws iam simulate-principal-policy` evaluates whether a given principal could perform an action on a resource, letting you confirm escalation edges (like web-role → deploy-role) without blindly firing real API calls."
      }
    ]
  },
  {
    "topicId": "cloud-m2-1",
    "questions": [
      {
        "question": "What distinguishes an IAM role from an IAM user?",
        "options": [
          "A role has permanent credentials; a user does not",
          "A role has no permanent credentials and is assumed to get temporary ones",
          "A role can only be used by AWS services, never by humans",
          "There is no real difference; the terms are interchangeable"
        ],
        "correctIndex": 1,
        "explanation": "Roles carry no standing credentials. A trusted principal assumes the role and STS returns temporary, expiring credentials. Both humans (via SSO) and services can assume roles."
      },
      {
        "question": "An access key beginning with 'ASIA' tells you what?",
        "options": [
          "It is a long-lived user key",
          "It is a temporary credential from STS (an assumed role or session)",
          "It belongs to the root account",
          "It is an invalid or revoked key"
        ],
        "correctIndex": 1,
        "explanation": "ASIA is the prefix for temporary STS credentials. AKIA is the prefix for long-lived IAM user access keys."
      },
      {
        "question": "What is the role of an IAM group?",
        "options": [
          "A credential you can assume like a role",
          "A container that holds permissions for a set of users; it has no credentials",
          "The same thing as a service role",
          "A way to federate external identities"
        ],
        "correctIndex": 1,
        "explanation": "Groups just bundle users so one policy applies to many. Groups cannot be assumed and have no credentials of their own."
      },
      {
        "question": "Why should the root account never be used for daily operations?",
        "options": [
          "It is slower than normal accounts",
          "It owns everything and cannot be restricted by policies, so any compromise is total",
          "It cannot have MFA enabled",
          "AWS charges extra for root usage"
        ],
        "correctIndex": 1,
        "explanation": "Root has unrestricted power that IAM policies and SCPs cannot cap. Best practice is to lock it with MFA, remove its access keys, and operate through scoped roles and SSO users."
      }
    ]
  },
  {
    "topicId": "cloud-m2-2",
    "questions": [
      {
        "question": "Which field in a policy statement decides whether access is granted or blocked?",
        "options": [
          "Action",
          "Effect",
          "Resource",
          "Condition"
        ],
        "correctIndex": 1,
        "explanation": "Effect is either Allow or Deny. Action, Resource, and Condition define what the statement applies to, but Effect sets the verdict it contributes."
      },
      {
        "question": "What does an identity statement with Effect Allow, Action '*', Resource '*' grant?",
        "options": [
          "Read-only access to all services",
          "Full administrator access to everything in the account",
          "Nothing, because wildcards are invalid",
          "Access only to IAM"
        ],
        "correctIndex": 1,
        "explanation": "Action '*' is every operation and Resource '*' is every resource, so this is effectively AdministratorAccess. It is the pattern attackers search for."
      },
      {
        "question": "Why is 'Allow' combined with 'NotAction' dangerous?",
        "options": [
          "It denies all actions by mistake",
          "It allows every action except the ones listed, which is usually far broader than intended",
          "It is a syntax error AWS rejects",
          "It only works on resource policies"
        ],
        "correctIndex": 1,
        "explanation": "NotAction inverts the match. Allow + NotAction grants everything except the named actions, commonly producing accidental near-admin access."
      },
      {
        "question": "A policy allows s3:GetObject but says nothing about s3:DeleteObject. Can the principal delete objects?",
        "options": [
          "Yes, read implies delete",
          "No, because IAM is default-deny and there is no Allow for delete",
          "Only if MFA is present",
          "Yes, unless a Deny exists"
        ],
        "correctIndex": 1,
        "explanation": "IAM denies by default. With no matching Allow for s3:DeleteObject, the action is denied."
      },
      {
        "question": "Which condition key restricts a statement to principals inside your AWS Organization?",
        "options": [
          "aws:SourceIp",
          "aws:PrincipalOrgID",
          "aws:MultiFactorAuthPresent",
          "aws:CurrentTime"
        ],
        "correctIndex": 1,
        "explanation": "aws:PrincipalOrgID matches the caller's Organization ID, a common guard against cross-account confused-deputy access."
      }
    ]
  },
  {
    "topicId": "cloud-m2-3",
    "questions": [
      {
        "question": "Which policy type can grant cross-account access without the caller assuming a role?",
        "options": [
          "Permission boundary",
          "Resource-based policy",
          "Session policy",
          "SCP"
        ],
        "correctIndex": 1,
        "explanation": "Resource-based policies include a Principal field and can name a principal in another account directly, granting access without any AssumeRole step."
      },
      {
        "question": "What can a Service Control Policy (SCP) do?",
        "options": [
          "Grant new permissions org-wide",
          "Only restrict the maximum permissions available in an account; it never grants",
          "Replace all identity policies",
          "Add temporary credentials"
        ],
        "correctIndex": 1,
        "explanation": "SCPs are guardrails. They cap what principals in an account can do but cannot by themselves grant any permission."
      },
      {
        "question": "A permission boundary allows s3:* and the identity policy allows s3:* and ec2:*. What are the effective permissions?",
        "options": [
          "s3:* and ec2:*",
          "s3:* only",
          "ec2:* only",
          "Nothing"
        ],
        "correctIndex": 1,
        "explanation": "Effective permissions are the intersection of the boundary and identity policy. Only s3:* is in both, so ec2:* is dropped."
      },
      {
        "question": "What is the effect of a session policy passed at AssumeRole time?",
        "options": [
          "It expands the role's permissions for that session",
          "It can only narrow the session's permissions, never expand them",
          "It overrides the role's trust policy",
          "It applies to all future sessions of the role"
        ],
        "correctIndex": 1,
        "explanation": "Session policies intersect with the role's permissions, narrowing just that one session. They cannot grant anything the role itself lacks."
      }
    ]
  },
  {
    "topicId": "cloud-m2-4",
    "questions": [
      {
        "question": "In IAM evaluation, what beats every Allow?",
        "options": [
          "A broad wildcard Allow",
          "An explicit Deny in any applicable policy",
          "An SCP Allow",
          "A resource policy"
        ],
        "correctIndex": 1,
        "explanation": "Explicit Deny always wins and is evaluated first. No Allow of any breadth can override it."
      },
      {
        "question": "A new IAM user has no policies attached. What can it do?",
        "options": [
          "Read-only actions by default",
          "Nothing, because IAM is default-deny",
          "Everything until a Deny is added",
          "Only STS calls"
        ],
        "correctIndex": 1,
        "explanation": "Default deny means no access without an explicit Allow. With no policies, every request is denied."
      },
      {
        "question": "For a cross-account request, where must an Allow exist?",
        "options": [
          "Only in the resource's account",
          "On both sides: the resource account must permit the caller and the caller's identity policy must allow the action",
          "Only in the caller's account",
          "In the SCP only"
        ],
        "correctIndex": 1,
        "explanation": "Cross-account access requires both accounts to agree: the resource (or role trust) permits the external principal, and the caller's own identity policy allows the action."
      },
      {
        "question": "Which tool predicts an IAM verdict without performing the real action?",
        "options": [
          "aws iam simulate-principal-policy / the IAM Policy Simulator",
          "aws s3 cp",
          "CloudTrail Lookup",
          "aws configure"
        ],
        "correctIndex": 0,
        "explanation": "simulate-principal-policy (and the IAM Policy Simulator UI) evaluate the actual policies and return the decision and the deciding statement, safely."
      },
      {
        "question": "What does 'aws sts decode-authorization-message' do?",
        "options": [
          "Creates new credentials",
          "Decodes an encoded access-denied message into the human-readable reason",
          "Assumes a role",
          "Rotates access keys"
        ],
        "correctIndex": 1,
        "explanation": "It turns the opaque encoded authorization-failure blob returned with some denials into the matched statements and reason, which is invaluable for debugging."
      }
    ]
  },
  {
    "topicId": "cloud-m2-5",
    "questions": [
      {
        "question": "What does a role's trust policy control?",
        "options": [
          "What actions the role can perform",
          "Which principals are allowed to assume the role",
          "How long credentials last",
          "Which region the role works in"
        ],
        "correctIndex": 1,
        "explanation": "The trust policy answers WHO may assume the role. The permission policy answers WHAT the role can do once assumed."
      },
      {
        "question": "Which field do temporary STS credentials include that long-lived user keys do not?",
        "options": [
          "AccessKeyId",
          "SecretAccessKey",
          "SessionToken",
          "Region"
        ],
        "correctIndex": 2,
        "explanation": "Temporary credentials carry a SessionToken (plus an Expiration). Long-lived IAM user keys have only an AccessKeyId and SecretAccessKey."
      },
      {
        "question": "What problem does ExternalId in a cross-account trust policy prevent?",
        "options": [
          "Credential expiry",
          "The confused-deputy problem, where a third party is tricked into assuming a role on an attacker's behalf",
          "Role chaining past one hour",
          "Region lock-in"
        ],
        "correctIndex": 1,
        "explanation": "ExternalId is a shared secret that forces a third-party vendor to prove it intends to act for your account specifically, blocking confused-deputy abuse of a known role ARN."
      },
      {
        "question": "Which STS API would GitHub Actions use to get AWS credentials without storing a secret key?",
        "options": [
          "AssumeRole",
          "AssumeRoleWithSAML",
          "AssumeRoleWithWebIdentity",
          "GetSessionToken"
        ],
        "correctIndex": 2,
        "explanation": "GitHub Actions presents an OIDC token, so it uses AssumeRoleWithWebIdentity for keyless, federated access."
      },
      {
        "question": "What is the default maximum duration of credentials from a chained role assumption?",
        "options": [
          "15 minutes",
          "1 hour",
          "12 hours",
          "No limit"
        ],
        "correctIndex": 1,
        "explanation": "Role chaining caps the session at 1 hour, regardless of a role's configured maximum session duration."
      }
    ]
  },
  {
    "topicId": "cloud-m2-6",
    "questions": [
      {
        "question": "What is the goal of least privilege?",
        "options": [
          "Grant admin to avoid breakage",
          "Give a principal only the permissions it needs and nothing more",
          "Remove all permissions from every principal",
          "Use only AWS-managed policies"
        ],
        "correctIndex": 1,
        "explanation": "Least privilege grants the minimal permissions required for the job, shrinking the blast radius when a credential is compromised."
      },
      {
        "question": "Which IAM feature shows when a principal last used each service, to find unused permissions?",
        "options": [
          "Service last-accessed data",
          "CloudFront logs",
          "The trust policy",
          "Access keys list"
        ],
        "correctIndex": 0,
        "explanation": "Service last-accessed data reports the last time a principal used each service, highlighting permissions that can likely be removed."
      },
      {
        "question": "Which policy attachment type is generally recommended for maintainability and reuse?",
        "options": [
          "Inline policies",
          "AWS-managed policies",
          "Customer-managed policies",
          "No policy at all"
        ],
        "correctIndex": 2,
        "explanation": "Customer-managed policies are owned, versioned, and reusable across principals, making them easier to audit and maintain than inline or overly broad AWS-managed policies."
      },
      {
        "question": "The best way to replace a guessed broad policy with a tight one is to:",
        "options": [
          "Add more wildcards",
          "Generate a policy from the principal's real CloudTrail activity with Access Analyzer",
          "Attach AdministratorAccess temporarily",
          "Delete the principal and recreate it"
        ],
        "correctIndex": 1,
        "explanation": "Access Analyzer policy generation turns actual recorded activity into a scoped policy, replacing guesswork with evidence."
      }
    ]
  },
  {
    "topicId": "cloud-m2-7",
    "questions": [
      {
        "question": "What is the GCP equivalent of attaching a policy to a principal in AWS?",
        "options": [
          "A role definition",
          "An IAM binding of a member to a role on a resource",
          "A management group",
          "A service principal"
        ],
        "correctIndex": 1,
        "explanation": "In GCP you bind a member to a role at a scope. That IAM binding is the analogue of an AWS policy attachment."
      },
      {
        "question": "How does GCP IAM behave across the resource hierarchy?",
        "options": [
          "Each resource is fully isolated with no inheritance",
          "Bindings are inherited downward: org -> folder -> project -> resource",
          "Inheritance flows upward from resource to org",
          "Only projects inherit, nothing else"
        ],
        "correctIndex": 1,
        "explanation": "GCP IAM inherits down the hierarchy, so a higher-level binding cascades to everything below it, which makes high-scope grants especially risky."
      },
      {
        "question": "Which Azure identity type is the closest analogue to an AWS instance profile (a workload identity with no stored secret)?",
        "options": [
          "User",
          "Managed identity",
          "App registration",
          "Management group"
        ],
        "correctIndex": 1,
        "explanation": "A managed identity is auto-managed by Azure for a resource, with no credentials to store, mirroring how an AWS instance profile gives an EC2 instance a role."
      },
      {
        "question": "Why are GCP primitive roles (Owner/Editor/Viewer) discouraged?",
        "options": [
          "They cost more",
          "They are very broad legacy roles; predefined or custom roles give tighter, least-privilege control",
          "They do not work on service accounts",
          "They cannot be bound to projects"
        ],
        "correctIndex": 1,
        "explanation": "Primitive roles grant sweeping access across a project. Predefined (service-scoped) and custom roles support least privilege far better."
      }
    ]
  },
  {
    "topicId": "cloud-m3-1",
    "questions": [
      {
        "question": "Which source most reliably enumerates an organisation's subdomains without sending traffic to the target?",
        "options": [
          "Brute-forcing the login page",
          "Certificate Transparency logs (e.g. crt.sh)",
          "Port-scanning the company's IP range",
          "Running Pacu against the account"
        ],
        "correctIndex": 1,
        "explanation": "CT logs are public records of every issued TLS certificate. Reading them is passive - the target sees nothing - yet it reveals hostnames including internal-sounding ones."
      },
      {
        "question": "A subdomain resolves via CNAME to 'cdn.example.com -> d123.cloudfront.net'. What does this tell you?",
        "options": [
          "The asset is hosted on Azure Blob Storage",
          "The asset is served through AWS CloudFront",
          "The subdomain is vulnerable to SSRF",
          "The bucket is publicly listable"
        ],
        "correctIndex": 1,
        "explanation": "The *.cloudfront.net suffix identifies AWS CloudFront. CNAME suffixes are a quick way to attribute which cloud hosts a given hostname."
      },
      {
        "question": "When permuting bucket names, what distinguishes a worthwhile finding from noise?",
        "options": [
          "A 404 response, meaning the bucket is hidden",
          "A 403 response on every candidate",
          "A bucket that exists and is public/listable (open), not merely existing-but-private",
          "Any name containing the word 'cloud'"
        ],
        "correctIndex": 2,
        "explanation": "Existence alone (403) is not access. An open, listable or readable bucket (often 200 with an object index) is the actionable finding."
      },
      {
        "question": "Why is external footprinting usually invisible to the target organisation?",
        "options": [
          "Attackers use stolen credentials to hide",
          "It mostly reads third-party public records (CT, DNS, code hosts) rather than touching the target's own systems",
          "Cloud providers suppress all recon alerts",
          "GuardDuty does not exist for external traffic"
        ],
        "correctIndex": 1,
        "explanation": "Passive recon queries public datasets held by others (crt.sh, DNS resolvers, GitHub), so no request ever hits the target's logs."
      }
    ]
  },
  {
    "topicId": "cloud-m3-2",
    "questions": [
      {
        "question": "You find an AWS key beginning with 'ASIA'. What does the prefix tell you?",
        "options": [
          "It is a long-lived IAM user key with no expiry",
          "It is a temporary STS credential that also needs a session token and will expire",
          "It is a root account key",
          "It is an invalid or fake key"
        ],
        "correctIndex": 1,
        "explanation": "ASIA denotes a temporary STS credential (from AssumeRole, SSO, or metadata). It requires a SessionToken and expires, unlike long-lived AKIA user keys."
      },
      {
        "question": "A developer committed a secret, then removed it in a later commit. What is the correct remediation?",
        "options": [
          "Nothing - deleting it in a new commit is sufficient",
          "Force-push to hide the commit",
          "Rotate/revoke the exposed credential, because it still exists in git history",
          "Rename the repository"
        ],
        "correctIndex": 2,
        "explanation": "The secret persists in commit history and may already be harvested. Only rotating/revoking the credential actually removes the risk."
      },
      {
        "question": "Enforcing IMDSv2 (HttpTokens=required) primarily defends against which initial-access path?",
        "options": [
          "Typosquatting on package registries",
          "SSRF being used to read instance-role credentials from 169.254.169.254",
          "Phishing of console passwords",
          "Public bucket enumeration"
        ],
        "correctIndex": 1,
        "explanation": "IMDSv2 requires a PUT-obtained session token before reading metadata, which simple SSRF (a GET of an attacker-chosen URL) cannot perform, breaking the common SSRF-to-credential chain."
      },
      {
        "question": "What is the quietest, safest first command to validate a credential you are authorised to test?",
        "options": [
          "aws ec2 terminate-instances",
          "aws iam create-access-key",
          "aws sts get-caller-identity",
          "aws s3 rm --recursive"
        ],
        "correctIndex": 2,
        "explanation": "get-caller-identity is read-only, low-noise, and returns the principal ARN - confirming the key works without changing anything."
      }
    ]
  },
  {
    "topicId": "cloud-m3-3",
    "questions": [
      {
        "question": "What is the purpose of running 'aws sts get-caller-identity' first?",
        "options": [
          "To escalate privileges",
          "To confirm the credential is live and reveal the account ID and principal ARN with a quiet read-only call",
          "To delete CloudTrail logs",
          "To create a new IAM user"
        ],
        "correctIndex": 1,
        "explanation": "It validates the key and anchors all later enumeration to a known account and principal, with minimal noise."
      },
      {
        "question": "Which enumerated capability is the strongest privilege-escalation lead?",
        "options": [
          "s3:GetBucketLocation on one bucket",
          "iam:PassRole combined with a service (Lambda/EC2) that will assume a powerful role",
          "ec2:DescribeInstances",
          "cloudwatch:GetMetricData"
        ],
        "correctIndex": 1,
        "explanation": "PassRole plus a compute service that assumes the passed role lets you inherit that role's permissions - a classic escalation primitive."
      },
      {
        "question": "During an authorised assessment, which behaviour is most likely to trigger a GuardDuty recon finding?",
        "options": [
          "A single get-caller-identity call",
          "Reading one S3 object you are allowed to read",
          "Rapidly firing hundreds of list/describe APIs across services and regions",
          "Assuming a role you are explicitly trusted to assume"
        ],
        "correctIndex": 2,
        "explanation": "High-volume, broad enumeration is exactly the anomalous pattern GuardDuty's recon detections look for. Pacing and targeting reduce that signal."
      },
      {
        "question": "Why can behavioural IAM brute-forcing reveal permissions even without iam:Get* access?",
        "options": [
          "It reads the policy JSON from S3",
          "It infers each permission from whether an API call returns data or AccessDenied",
          "It uses the root credentials",
          "It queries the IAM Policy Simulator anonymously"
        ],
        "correctIndex": 1,
        "explanation": "The API response itself is the oracle: a non-denied result proves the action is permitted, so you never need to read the underlying policy."
      }
    ]
  },
  {
    "topicId": "cloud-m3-4",
    "questions": [
      {
        "question": "Which tool is purpose-built to answer 'can this principal reach an admin-equivalent via IAM escalation edges?'",
        "options": [
          "ScoutSuite",
          "PMapper (Principal Mapper)",
          "trufflehog",
          "CloudMapper"
        ],
        "correctIndex": 1,
        "explanation": "PMapper builds an IAM identity graph and has presets (e.g. privesc) that compute reachability to admin, understanding edges like PassRole."
      },
      {
        "question": "Prowler and ScoutSuite are best described as:",
        "options": [
          "Exploitation frameworks that take actions on your behalf",
          "Posture/compliance auditors that enumerate config and flag misconfigurations against frameworks like CIS",
          "Secret scanners for git history",
          "Network packet sniffers"
        ],
        "correctIndex": 1,
        "explanation": "They enumerate configuration and map findings to benchmarks (CIS, NIST, PCI). They audit posture rather than exploit."
      },
      {
        "question": "What does Cartography primarily provide that a flat 'aws iam list-roles' does not?",
        "options": [
          "Automatic privilege escalation",
          "A graph of relationships (edges) between principals and resources, queryable for attack paths",
          "Real-time intrusion blocking",
          "A list of public buckets only"
        ],
        "correctIndex": 1,
        "explanation": "Cartography loads nodes and edges into Neo4j so you can query relationships and paths, revealing structure that flat lists hide."
      },
      {
        "question": "Why should a tester cross-check Pacu's iam__privesc_scan with a manual enumerate-iam pass?",
        "options": [
          "Pacu requires internet access that enumerate-iam does not",
          "Each tool has blind spots; conditional or write-only permissions may be missed by one and caught by another",
          "enumerate-iam is faster at exploitation",
          "Pacu cannot read S3"
        ],
        "correctIndex": 1,
        "explanation": "No tool is complete. Behavioural brute-forcing and module-based scanning miss different things, so cross-checking improves coverage and reduces false negatives."
      }
    ]
  },
  {
    "topicId": "cloud-m3-5",
    "questions": [
      {
        "question": "In an identity trust graph, what do the edges represent?",
        "options": [
          "The physical network cables between servers",
          "Permissions/relationships such as can-assume, can-read-secret, or can-pass-role",
          "The cost of each resource",
          "The geographic region of each service"
        ],
        "correctIndex": 1,
        "explanation": "Edges encode the permissions that connect principals and resources; chains of these edges form attack paths."
      },
      {
        "question": "Which query best captures the core offensive use of the graph?",
        "options": [
          "Count the total number of S3 buckets",
          "Find the shortest path of escalation edges from a foothold principal to an admin-equivalent principal",
          "List all regions in use",
          "Sort resources alphabetically"
        ],
        "correctIndex": 1,
        "explanation": "The shortest-path-to-admin query turns enumeration into an attack plan and, for defenders, pinpoints the edge to cut."
      },
      {
        "question": "Why is a graph path more useful to a defender than a single 'over-privileged' finding?",
        "options": [
          "It hides the sensitive details",
          "It shows the full chain and identifies the specific edge whose removal breaks the escalation",
          "It automatically patches the account",
          "It is required by the AWS API"
        ],
        "correctIndex": 1,
        "explanation": "Severity lives in the path. Showing the chain lets a defender cut the minimal edge that collapses it, which is concrete and actionable."
      },
      {
        "question": "Which pair of tools is typically used to build and query a cloud identity graph?",
        "options": [
          "trufflehog and gitleaks",
          "Cartography (with Neo4j) and PMapper",
          "Prowler and ScoutSuite",
          "nmap and masscan"
        ],
        "correctIndex": 1,
        "explanation": "Cartography loads the estate into Neo4j for Cypher queries; PMapper computes IAM reachability to admin. The others are secret scanners, posture auditors, and network scanners."
      }
    ]
  },
  {
    "topicId": "cloud-m3-6",
    "questions": [
      {
        "question": "What is the GCP primitive most analogous to abusing sts:AssumeRole in AWS?",
        "options": [
          "Creating a new GCS bucket",
          "Service-account impersonation via actAs / iam.serviceAccounts.getAccessToken",
          "Enabling an API in the project",
          "Resizing a Compute Engine VM"
        ],
        "correctIndex": 1,
        "explanation": "Impersonating a more privileged service account to mint its token inherits that SA's permissions - GCP's equivalent of assuming a role."
      },
      {
        "question": "Which tool dumps an Entra ID (Azure AD) tenant into a local database for offline enumeration?",
        "options": [
          "Pacu",
          "roadrecon",
          "GCPBucketBrute",
          "trufflehog"
        ],
        "correctIndex": 1,
        "explanation": "roadrecon authenticates to a tenant and gathers users, groups, service principals and app roles into a local DB. Pacu is AWS; GCPBucketBrute is GCS; trufflehog finds secrets."
      },
      {
        "question": "What single idea makes cloud recon skills transfer across AWS, Azure and GCP?",
        "options": [
          "All three use identical CLI commands",
          "Graph thinking: reduce the estate to principals and edges, then find the shortest path to a high-privilege identity",
          "They all store data only in S3",
          "None of them have service accounts"
        ],
        "correctIndex": 1,
        "explanation": "BloodHound/AzureHound/Cartography/PMapper all express the same model. The question - what can I become, and does a chain reach admin - is identical across clouds."
      },
      {
        "question": "In GCP, why are long-lived service-account keys a prime recon/defence concern?",
        "options": [
          "They expire every five minutes and break pipelines",
          "They are static credentials that, if leaked, grant the SA's permissions and support impersonation chains; workload identity federation is the safer alternative",
          "They cannot be used outside the console",
          "They are only used for billing"
        ],
        "correctIndex": 1,
        "explanation": "Static SA keys are a durable foothold if leaked and feed impersonation paths. Replacing them with workload identity federation removes the stored secret."
      }
    ]
  },
  {
    "topicId": "cloud-m4-1",
    "questions": [
      {
        "question": "What single property makes an IAM permission a 'privilege-escalation primitive'?",
        "options": [
          "It can be used to grant the caller (or a principal the caller controls) additional permissions",
          "It costs money to call",
          "It only works from the AWS Console",
          "It can only be called by the root user"
        ],
        "correctIndex": 0,
        "explanation": "The defining trait is self-referential power over the identity system: the permission writes to IAM/STS in a way that increases the caller's effective access."
      },
      {
        "question": "Why is iam:PassRole NOT an escalation on its own?",
        "options": [
          "Because passing a role does nothing unless a service (Lambda/EC2/Glue) actually assumes that role and runs code with it",
          "Because PassRole is deprecated",
          "Because PassRole always requires MFA",
          "Because PassRole only works on roles you already own"
        ],
        "correctIndex": 0,
        "explanation": "PassRole just permits handing a role to a service. The escalation needs a paired service permission (e.g. lambda:CreateFunction + InvokeFunction) that assumes the passed role so you can run with its privileges."
      },
      {
        "question": "A policy attached to your user allows 'iam:CreatePolicyVersion' with Resource '*'. What is the fastest path to admin?",
        "options": [
          "Create a new default version of an attached customer-managed policy that allows Action:* Resource:*",
          "Delete your own user to reset permissions",
          "Call sts:GetSessionToken repeatedly",
          "Ask the root user via email"
        ],
        "correctIndex": 0,
        "explanation": "With CreatePolicyVersion on a policy already attached to you, write a new version allowing everything and set it default (--set-as-default); your effective permissions become administrator."
      },
      {
        "question": "Which control most reliably neutralises the entire escalation catalogue for a developer role, even if the role's own policy is too broad?",
        "options": [
          "A permission boundary (and/or SCP) that does not allow the dangerous iam:* write actions",
          "Enabling CloudTrail logging",
          "Rotating the access key weekly",
          "Renaming the IAM policies"
        ],
        "correctIndex": 0,
        "explanation": "Effective permission is the intersection of identity policy AND boundary AND SCP. If the boundary/SCP omits or denies the iam: write actions, the role cannot escalate no matter what its identity policy says. Logging detects but does not prevent."
      }
    ]
  },
  {
    "topicId": "cloud-m4-2",
    "questions": [
      {
        "question": "In a PassRole-to-Lambda escalation, how does the attacker actually obtain the privileged role's power?",
        "options": [
          "The Lambda runs with the passed role's temporary credentials; the attacker's code uses or exfiltrates them",
          "iam:PassRole directly returns admin credentials",
          "The attacker's own access key is upgraded in place",
          "AWS emails the attacker the role's permanent password"
        ],
        "correctIndex": 0,
        "explanation": "Creating the function with --role causes Lambda to assume that role and run the handler with its STS temp credentials. The attacker's handler code can read those creds or directly call admin APIs from inside the function."
      },
      {
        "question": "Which single IAM condition best constrains iam:PassRole against abuse?",
        "options": [
          "iam:PassedToService, limiting which service the role may be passed to",
          "aws:MultiFactorAuthPresent on reads",
          "s3:x-amz-server-side-encryption",
          "aws:RequestedRegion"
        ],
        "correctIndex": 0,
        "explanation": "iam:PassedToService ensures a role can only be passed to an intended service (e.g. only EC2, not Lambda), combined with scoping the resource to exact role ARNs. This directly limits the escalation sinks."
      },
      {
        "question": "For an EC2-based PassRole escalation, where does the attacker read the privileged credentials from?",
        "options": [
          "The Instance Metadata Service at 169.254.169.254 /latest/meta-data/iam/security-credentials/",
          "The S3 bucket named after the role",
          "The CloudTrail log file",
          "The Lambda invoke response"
        ],
        "correctIndex": 0,
        "explanation": "An EC2 instance launched with an instance profile exposes the role's temporary credentials via IMDS. The attacker queries 169.254.169.254 (using an IMDSv2 token if required) to retrieve them."
      },
      {
        "question": "Why can reviewing identity policies one action at a time MISS a PassRole escalation?",
        "options": [
          "Because the escalation emerges from the combination of PassRole + a compute-create permission + a trusting role, not from any single action",
          "Because PassRole is never written in identity policies",
          "Because CloudTrail hides PassRole events",
          "Because PassRole only appears in SCPs"
        ],
        "correctIndex": 0,
        "explanation": "Each permission looks benign in isolation. The risk is the chain: pass a privileged role + create a service that assumes it + the role trusts that service. You must reason about combinations and trust policies together."
      }
    ]
  },
  {
    "topicId": "cloud-m4-3",
    "questions": [
      {
        "question": "What does a role's trust policy (AssumeRolePolicyDocument) control?",
        "options": [
          "Which principals are allowed to call sts:AssumeRole on the role",
          "What actions the role can perform once assumed",
          "How long the role's credentials last by default",
          "Which regions the role may operate in"
        ],
        "correctIndex": 0,
        "explanation": "The trust policy is the 'who can become this role' guest list. The separate permission policy governs what the role can do. Trust abuse exploits an over-broad guest list."
      },
      {
        "question": "Why is 'Principal: arn:aws:iam::ACCOUNT:root' in a trust policy risky?",
        "options": [
          "It trusts the entire account, so any principal there with sts:AssumeRole (even a compromised low-priv one) can assume the role",
          "It only lets the root user assume the role, which is always safe",
          "It disables the role entirely",
          "It grants public internet access to the role"
        ],
        "correctIndex": 0,
        "explanation": "':root' means the whole account and delegates the decision to that account's IAM. A single compromised principal in the account can then assume a privileged role."
      },
      {
        "question": "A monitoring vendor's role in your account trusts the vendor's AWS account with no ExternalId. What attack does this enable?",
        "options": [
          "Cross-account confused deputy: another of the vendor's customers can induce the vendor to assume your role",
          "A SQL injection into the vendor dashboard",
          "A DNS cache-poisoning attack",
          "Nothing — missing ExternalId is purely cosmetic"
        ],
        "correctIndex": 0,
        "explanation": "Without a unique ExternalId secret, the shared vendor account can be tricked by a malicious customer into assuming your role. ExternalId ensures the vendor only assumes the role for the correct customer."
      },
      {
        "question": "For a GitHub Actions OIDC role, which trust condition prevents other repositories from assuming it?",
        "options": [
          "Pinning the sub claim to the exact repo and ref, e.g. repo:org/name:ref:refs/heads/main",
          "Allowing sub claim repo:*",
          "Removing all conditions",
          "Trusting ec2.amazonaws.com instead"
        ],
        "correctIndex": 0,
        "explanation": "A wildcard sub (repo:*) lets any GitHub repo's workflow assume the role. Pinning sub to the full repo/ref ensures only your specific workflow qualifies."
      },
      {
        "question": "Which account-wide condition key best limits internal roles to your own AWS Organization?",
        "options": [
          "aws:PrincipalOrgID",
          "aws:RequestedRegion",
          "s3:prefix",
          "ec2:InstanceType"
        ],
        "correctIndex": 0,
        "explanation": "aws:PrincipalOrgID restricts assumption to principals belonging to your Organization, neutralising many cross-account trust mistakes in one condition."
      }
    ]
  },
  {
    "topicId": "cloud-m4-4",
    "questions": [
      {
        "question": "What is the key difference between an identity policy and a resource policy?",
        "options": [
          "Identity policies attach to a principal; resource policies attach to the resource and say who may use it",
          "Resource policies only work for S3",
          "Identity policies are cross-account; resource policies are same-account only",
          "They are the same thing with different names"
        ],
        "correctIndex": 0,
        "explanation": "A resource policy is attached to the resource (bucket, key, function, secret) and enumerates the principals allowed to use it, independent of their identity policy."
      },
      {
        "question": "A KMS key policy grants kms:Decrypt to arn:aws:iam::SAME_ACCOUNT:root. Your foothold user has no KMS permissions in its identity policy. Can you decrypt?",
        "options": [
          "Yes — same-account access is allowed if the resource policy allows it, even if the identity policy is silent",
          "No — you always need the permission in your identity policy",
          "Only if you first AssumeRole into the key",
          "Only during business hours"
        ],
        "correctIndex": 0,
        "explanation": "Same-account requests succeed if either policy allows the action. The broad key policy grants Decrypt to the whole account, so your low-priv user can decrypt despite its identity policy saying nothing about KMS."
      },
      {
        "question": "Which single tool best discovers resources whose policies grant access outside your account?",
        "options": [
          "IAM Access Analyzer (external-access findings)",
          "CloudFront",
          "AWS Cost Explorer",
          "Route 53"
        ],
        "correctIndex": 0,
        "explanation": "IAM Access Analyzer evaluates resource policies (S3, KMS, Lambda, SQS, Secrets Manager, etc.) and reports any that grant access to principals outside your zone of trust."
      },
      {
        "question": "Which condition key helps prevent SNS/SQS/Secrets Manager cross-account confused-deputy abuse via resource policies?",
        "options": [
          "aws:SourceArn / aws:SourceAccount (and aws:PrincipalOrgID)",
          "s3:x-amz-acl",
          "ec2:InstanceType",
          "aws:RequestedRegion only"
        ],
        "correctIndex": 0,
        "explanation": "aws:SourceArn/aws:SourceAccount (and aws:PrincipalOrgID) constrain which calling service/principal may use the resource, closing confused-deputy paths that an over-broad Principal would open."
      }
    ]
  },
  {
    "topicId": "cloud-m4-5",
    "questions": [
      {
        "question": "What makes a backdoor IAM role an effective persistence mechanism after revoking the attacker's original key?",
        "options": [
          "A role with AdministratorAccess and a wide/attacker-controlled trust policy lets the attacker AssumeRole back in without re-exploitation",
          "Roles cannot be deleted, so they are permanent",
          "A role automatically re-enables any disabled access key",
          "Roles bypass CloudTrail entirely"
        ],
        "correctIndex": 0,
        "explanation": "If the role has admin and trusts the attacker's account (or :root), they can call sts:AssumeRole later and regain full access, independent of the revoked foothold key."
      },
      {
        "question": "Which CloudTrail events best reveal common identity persistence? (choose the strongest set)",
        "options": [
          "CreateAccessKey, CreateUser/AttachUserPolicy, UpdateAssumeRolePolicy, CreateLoginProfile",
          "GetObject, ListBuckets, DescribeInstances",
          "AssumeRole only",
          "DescribeRegions and GetCallerIdentity"
        ],
        "correctIndex": 0,
        "explanation": "These mutating IAM events are the footprint of key/user/role/login persistence. Read-only events like GetObject or GetCallerIdentity don't indicate persistence creation."
      },
      {
        "question": "Why is 'rotate the leaked key' often an incomplete incident response in the cloud?",
        "options": [
          "The attacker may have planted a second access key, hidden user, or backdoor role that the single rotation doesn't touch",
          "Key rotation deletes CloudTrail history",
          "Rotation always re-grants the attacker admin",
          "Keys can't actually be rotated in AWS"
        ],
        "correctIndex": 0,
        "explanation": "Admins can plant multiple persistence mechanisms. Full IR requires sweeping all keys, users, roles, login profiles and guardrail changes, not just rotating the one known credential."
      },
      {
        "question": "How does an EventBridge-rule + Lambda backdoor achieve 'self-healing' persistence?",
        "options": [
          "The rule triggers a Lambda (running an admin role) that re-creates the attacker's access whenever a condition fires, undoing cleanup",
          "EventBridge deletes CloudTrail automatically",
          "Lambda functions cannot be deleted by defenders",
          "The rule prevents any other API calls from succeeding"
        ],
        "correctIndex": 0,
        "explanation": "An event-triggered Lambda with a privileged role can re-add a key/user/role each time it runs, so simply deleting the attacker's credentials isn't enough until the rule and function are also removed."
      },
      {
        "question": "Since you can't stop an admin from calling admin APIs, what is the primary defensive strategy against identity persistence?",
        "options": [
          "Minimise who can reach admin (least privilege, boundaries, SCPs) and detect the specific CloudTrail events fast with immutable logging",
          "Disable CloudTrail to save cost",
          "Give every user two keys so attackers can't add a distinguishing one",
          "Rely solely on network firewalls"
        ],
        "correctIndex": 0,
        "explanation": "Defence is reducing the population that can ever become admin, protecting the audit log's integrity, and building detections/automated response on the exact persistence events."
      }
    ]
  },
  {
    "topicId": "cloud-m4-6",
    "questions": [
      {
        "question": "Which tool statically analyses an account's IAM Authorization Details to flag risky policies without any exploitation?",
        "options": [
          "Cloudsplaining",
          "Pacu iam__privesc_scan",
          "Nmap",
          "Hashcat"
        ],
        "correctIndex": 0,
        "explanation": "Cloudsplaining ingests `iam get-account-authorization-details` JSON and produces a report of privilege-escalation, resource-exposure and data-exfiltration risks — purely static, read-only analysis."
      },
      {
        "question": "What question does PMapper primarily answer?",
        "options": [
          "Across the whole account, which principals can reach admin and by what path (graph reachability)?",
          "What TLS ciphers does the endpoint support?",
          "How much does each IAM role cost per month?",
          "Which S3 objects are publicly listable?"
        ],
        "correctIndex": 0,
        "explanation": "PMapper builds a directed IAM graph (edges = 'A can gain B's privileges') and answers reachability queries such as which principals can escalate to admin and through which edges."
      },
      {
        "question": "Why must automated escalation findings be validated before reporting?",
        "options": [
          "A permission boundary, SCP, condition key, or missing trust may block a path the tool flagged from identity policy alone, making it a false positive",
          "Because the tools always under-report, so every negative is wrong",
          "Because AWS charges per finding",
          "Validation is unnecessary; tool output is always exploitable"
        ],
        "correctIndex": 0,
        "explanation": "Tools often see only part of the picture (e.g. identity policy but not boundaries/SCPs/conditions/trust). You validate by attempting the exploit in your sandbox and keep only confirmed edges."
      },
      {
        "question": "How can the same offensive tooling be used defensively?",
        "options": [
          "Run Cloudsplaining/PMapper on a schedule or in CI to detect and fix new escalation edges before attackers find them",
          "They cannot be used defensively",
          "By disabling IAM entirely",
          "By deleting CloudTrail logs they analyse"
        ],
        "correctIndex": 0,
        "explanation": "Cloudsplaining (read-only) and PMapper reachability queries make excellent continuous guardrails: detect any policy/trust change that creates a path to admin and remediate it with a scoped policy fix."
      }
    ]
  },
  {
    "topicId": "cloud-m4-7",
    "questions": [
      {
        "question": "Why can a defender neutralise an escalation even when a principal's identity policy is too broad?",
        "options": [
          "Effective permissions are the AND of identity policy, SCPs, permission boundaries and conditions — any one can deny the action",
          "Because identity policies are ignored in production",
          "Because AWS auto-corrects over-broad policies",
          "Because broad policies only apply to the console, not the CLI"
        ],
        "correctIndex": 0,
        "explanation": "An action must pass every layer (and face no explicit Deny). An SCP Deny or a boundary that omits the action vetoes it regardless of how permissive the identity policy is."
      },
      {
        "question": "What does a permission boundary do?",
        "options": [
          "Sets the maximum permissions a principal can ever have, capping effective access even if broad policies are attached",
          "Grants a principal all permissions up to admin",
          "Encrypts the principal's access keys",
          "Automatically rotates credentials"
        ],
        "correctIndex": 0,
        "explanation": "A boundary is a ceiling: the principal's effective permissions are the intersection of its identity policy and the boundary. Omitting iam:* writes from the boundary blocks IAM escalation even if AdministratorAccess is attached."
      },
      {
        "question": "Which condition key most directly closes the over-trusting-role cross-account breakout from this module?",
        "options": [
          "aws:PrincipalOrgID (restrict assumption to your own Organization) / sts:ExternalId for vendor roles",
          "s3:prefix",
          "ec2:InstanceType",
          "aws:RequestedRegion"
        ],
        "correctIndex": 0,
        "explanation": "aws:PrincipalOrgID limits who can assume internal roles to your Org, and ExternalId stops vendor confused-deputy abuse — both directly address trust-policy breakout."
      },
      {
        "question": "Which AWS feature continuously flags roles, keys, buckets or secrets that grant access outside your account?",
        "options": [
          "IAM Access Analyzer (external-access findings)",
          "AWS Budgets",
          "Amazon Macie only for PII",
          "Elastic Load Balancing"
        ],
        "correctIndex": 0,
        "explanation": "IAM Access Analyzer evaluates trust and resource policies and reports external access, catching over-broad trust policies (topic 3) and resource policies (topic 4)."
      },
      {
        "question": "What is the verification standard for this module's defensive exercise?",
        "options": [
          "Re-running each earlier exploit and confirming it now fails (AccessDenied) or triggers a detection alert",
          "Simply writing the SCP document without testing",
          "Counting how many policies exist in the account",
          "Disabling all IAM users"
        ],
        "correctIndex": 0,
        "explanation": "Goal-driven defence means each control is proven by re-running the specific attack it targets and observing it blocked or detected — the attack-then-verify loop."
      }
    ]
  },
  {
    "topicId": "cloud-m5-1",
    "questions": [
      {
        "question": "In S3, what does an ACL grant to 'AuthenticatedUsers' actually allow?",
        "options": [
          "Only users authenticated to your application",
          "Only IAM users inside your own AWS account",
          "Any holder of any AWS account anywhere",
          "Nobody - it is a deprecated no-op"
        ],
        "correctIndex": 2,
        "explanation": "AuthenticatedUsers means any AWS account holder in the world, which is effectively public. It does not mean users of your app or only your account."
      },
      {
        "question": "How does S3 combine IAM policies, bucket policies, and ACLs for a request (ignoring Block Public Access)?",
        "options": [
          "All layers must allow (intersection)",
          "Access is granted if any layer allows and no layer explicitly denies (union minus deny)",
          "Only the most restrictive layer applies",
          "ACLs always take priority over policies"
        ],
        "correctIndex": 1,
        "explanation": "Access is the union of allows across layers, overridden by any explicit deny. A single public grant is enough to expose data even if other layers are strict."
      },
      {
        "question": "What is the main benefit of setting Object Ownership to 'Bucket owner enforced'?",
        "options": [
          "It encrypts all objects automatically",
          "It disables ACLs, so access is governed only by IAM and bucket policies",
          "It makes the bucket public by default",
          "It enables cross-region replication"
        ],
        "correctIndex": 1,
        "explanation": "'Bucket owner enforced' disables ACLs entirely, removing an error-prone layer and simplifying access control to just IAM and bucket policies."
      },
      {
        "question": "Which control, enabled at the account level, is the strongest safety net against accidentally public buckets?",
        "options": [
          "SSE-KMS encryption",
          "S3 Access Points",
          "Block Public Access",
          "Versioning"
        ],
        "correctIndex": 2,
        "explanation": "Account-level Block Public Access overrides public ACLs and public bucket policies on every bucket, preventing accidental exposure regardless of individual bucket settings."
      },
      {
        "question": "Why are S3 Access Points useful for a large shared bucket?",
        "options": [
          "They replace the need for encryption",
          "They give each consumer a separate endpoint with its own scoped policy instead of one giant bucket policy",
          "They make the bucket faster by caching",
          "They automatically make the bucket public for easier access"
        ],
        "correctIndex": 1,
        "explanation": "Access Points let each application have a dedicated endpoint with a tightly scoped policy (e.g. one prefix, read-only), applying least privilege without a sprawling bucket policy."
      }
    ]
  },
  {
    "topicId": "cloud-m5-2",
    "questions": [
      {
        "question": "Why can an attacker guess bucket names without any insider knowledge?",
        "options": [
          "Buckets send their names to a public registry you can download",
          "Bucket names map to predictable, globally-unique web addresses derived from the name itself",
          "AWS publishes a list of all bucket names daily",
          "Only buckets that opt in are guessable"
        ],
        "correctIndex": 1,
        "explanation": "A bucket's address is its name plus a fixed suffix (e.g. name.s3.amazonaws.com). Since names are global and often derived from a company's brand, attackers permute keywords and check which exist."
      },
      {
        "question": "Which tool is best for a first-pass sweep across AWS, Azure Blob, and GCS from a single keyword?",
        "options": [
          "s3scanner",
          "GCPBucketBrute",
          "cloud_enum",
          "trufflehog"
        ],
        "correctIndex": 2,
        "explanation": "cloud_enum enumerates all three major providers from one seed keyword, making it ideal when you only know a company name. s3scanner is S3-focused and GCPBucketBrute is GCS-only."
      },
      {
        "question": "Why is a writable public bucket often MORE dangerous than a readable one?",
        "options": [
          "Writable buckets expose more data to download",
          "An attacker can plant malware, deface a bucket-hosted site, or poison files that downstream systems trust",
          "Write access also always grants read access",
          "It isn't - read is always worse"
        ],
        "correctIndex": 1,
        "explanation": "Writable access lets an attacker inject content under a trusted domain - malware hosting, website defacement, or data poisoning of pipelines that ingest the bucket - impacts beyond mere data disclosure."
      },
      {
        "question": "You confirm a bucket is listable but every object download returns AccessDenied. What is the correct exposure classification?",
        "options": [
          "Readable - listing implies reading",
          "Writable",
          "Listable only - object names/metadata leak, but contents are not readable",
          "Not exposed at all"
        ],
        "correctIndex": 2,
        "explanation": "Listable means you can see object names and metadata (itself an information leak) but cannot download contents. Precisely distinguishing list vs read vs write is essential for accurate severity."
      }
    ]
  },
  {
    "topicId": "cloud-m5-3",
    "questions": [
      {
        "question": "How does a pre-signed URL grant access without the recipient having AWS credentials?",
        "options": [
          "It logs the recipient into AWS automatically",
          "The permission is embedded as a signature and expiry in the URL's query string, which S3 verifies",
          "It disables Block Public Access temporarily",
          "It makes the object public for everyone"
        ],
        "correctIndex": 1,
        "explanation": "The grant is packed into query parameters (X-Amz-Signature, X-Amz-Expires, etc.). S3 verifies the signature on each request, so no login occurs - possession of the URL is the permission."
      },
      {
        "question": "What determines how much power a pre-signed URL carries?",
        "options": [
          "The size of the object",
          "The permissions of the identity that signed it, scoped to the requested operation",
          "The region the bucket is in",
          "Whether Block Public Access is enabled"
        ],
        "correctIndex": 1,
        "explanation": "A pre-signed URL inherits the signer's permissions for that action. Signing with a broad admin role produces a dangerously powerful URL; signing with a narrowly-scoped role limits the blast radius."
      },
      {
        "question": "Which combination makes a leaked pre-signed download URL most dangerous?",
        "options": [
          "A short expiry and a scoped signer",
          "A long expiry combined with the URL leaking into logs, caches, or Referer headers",
          "SSE-KMS encryption on the object",
          "A random object key"
        ],
        "correctIndex": 1,
        "explanation": "Because the grant lives in the URL, leakage into logs/caches/Referer plus a long expiry gives anyone who sees the URL durable access. Short expiries shrink the exposure window."
      },
      {
        "question": "For a presigned upload (PutObject) URL, which mitigation prevents an attacker from writing arbitrary objects?",
        "options": [
          "Making the bucket public",
          "Using a 7-day expiry",
          "Constraining the request: pin the exact key and enforce content-type and content-length-range conditions",
          "Removing the signature from the URL"
        ],
        "correctIndex": 2,
        "explanation": "Upload URLs should pin the object key and enforce content-type/size conditions so the URL can only write the one intended object, not be repurposed to overwrite other files or plant content."
      }
    ]
  },
  {
    "topicId": "cloud-m5-4",
    "questions": [
      {
        "question": "How does an attacker read data from a snapshot that has been made public?",
        "options": [
          "They must steal the victim's AWS credentials first",
          "They create a volume from the snapshot in their own account and mount its filesystem",
          "Public snapshots can only be viewed by ID, never read",
          "They have to decrypt it even if it was never encrypted"
        ],
        "correctIndex": 1,
        "explanation": "A shared/public snapshot can be restored into the attacker's own account as a volume and mounted directly - no access to the victim's account is needed."
      },
      {
        "question": "Why does encrypting snapshots with a CUSTOMER-MANAGED KMS key (CMK) defend against accidental over-sharing?",
        "options": [
          "Encrypted snapshots cannot be shared at all",
          "The recipient also needs kms:Decrypt on your key, which a mistaken share does not grant",
          "KMS automatically un-shares the snapshot",
          "Encryption makes the snapshot invisible to describe-snapshots"
        ],
        "correctIndex": 1,
        "explanation": "Reading an encrypted snapshot requires decrypt access to the KMS key. Sharing the snapshot alone does not grant key access, so an accidental share with a CMK does not expose the data."
      },
      {
        "question": "Which of these is NOT a secondary-copy exposure path for data?",
        "options": [
          "A public RDS snapshot",
          "A DynamoDB export landing in a public S3 bucket",
          "An AMI made public that bakes in credentials",
          "Enabling account-level Block Public Access on S3"
        ],
        "correctIndex": 3,
        "explanation": "Block Public Access is a defensive control, not an exposure path. Public RDS snapshots, exports into open buckets, and public AMIs with embedded secrets are all real leak routes."
      },
      {
        "question": "What is the safest practice when you must share a snapshot with a partner?",
        "options": [
          "Set createVolumePermission to 'all' for convenience",
          "Share to the specific partner account ID, un-share when finished, and encrypt with a CMK whose decrypt you grant explicitly",
          "Make it public but rely on a long random snapshot ID",
          "Replicate it to another region first"
        ],
        "correctIndex": 1,
        "explanation": "Share only to the exact account ID needed, revoke when done, and use customer-managed-key encryption so access requires an explicit kms:Decrypt grant - never make it public."
      }
    ]
  },
  {
    "topicId": "cloud-m5-5",
    "questions": [
      {
        "question": "With SSE-KMS, what is actually the access control over the plaintext?",
        "options": [
          "The strength of the AES encryption algorithm",
          "Permission to call kms:Decrypt on the key, enforced by the KMS key policy and IAM",
          "The S3 bucket's region",
          "Whether the object is public"
        ],
        "correctIndex": 1,
        "explanation": "Because S3 decrypts automatically for authorised callers, the real control is who is permitted kms:Decrypt. The key policy, not the encryption math, decides who sees plaintext."
      },
      {
        "question": "To read an SSE-KMS encrypted object, which permissions must a caller have?",
        "options": [
          "Only s3:GetObject",
          "Only kms:Decrypt",
          "Both s3:GetObject and kms:Decrypt on the encrypting key",
          "s3:GetObject and s3:PutObject"
        ],
        "correctIndex": 2,
        "explanation": "SSE-KMS reads require both the S3 permission and kms:Decrypt. The KMS key policy is an independent gate; lacking decrypt permission denies the read even with full S3 access."
      },
      {
        "question": "What problem do S3 Bucket Keys primarily solve?",
        "options": [
          "They make objects public",
          "They reduce KMS API call volume and cost by caching a bucket-level key, without weakening the encryption model",
          "They replace the need for a key policy",
          "They encrypt object names as well as contents"
        ],
        "correctIndex": 1,
        "explanation": "Bucket Keys cut the number of per-object KMS calls dramatically (up to ~99%), lowering cost while keeping the same SSE-KMS security model."
      },
      {
        "question": "A bucket policy denies PutObject unless the request includes SSE-KMS. Why add this on top of default encryption?",
        "options": [
          "Default encryption is purely cosmetic",
          "It blocks uploads that explicitly send no encryption or the wrong type, enforcing the requirement rather than just defaulting it",
          "It encrypts existing objects retroactively",
          "It grants cross-account decrypt automatically"
        ],
        "correctIndex": 1,
        "explanation": "Default encryption applies a fallback, but an explicit deny rejects any upload that specifies no or incorrect SSE, guaranteeing every new object meets the encryption standard."
      },
      {
        "question": "What is required for a principal in account B to decrypt an object encrypted with account A's customer-managed KMS key?",
        "options": [
          "Only account A's key policy needs to allow it",
          "Only account B's IAM policy needs to allow it",
          "Both account A's key policy must allow B's principal AND B's IAM policy must allow kms:Decrypt on the key",
          "Nothing - cross-account decrypt is automatic for encrypted objects"
        ],
        "correctIndex": 2,
        "explanation": "Cross-account KMS decrypt requires both sides to allow: the key owner's key policy grants the external principal, and that principal's own IAM policy permits kms:Decrypt on the key ARN."
      }
    ]
  },
  {
    "topicId": "cloud-m5-6",
    "questions": [
      {
        "question": "Why must a 'locked-down' bucket close every exfiltration path rather than just the obvious one?",
        "options": [
          "Because AWS requires all controls for billing",
          "An attacker only needs a single open path; one unclosed exit undoes all the others",
          "Only public read actually leaks data",
          "Closing one path automatically closes the rest"
        ],
        "correctIndex": 1,
        "explanation": "Data leaves through the weakest path. Public read, pre-signed URLs, over-shared snapshots, replication, and over-broad IAM are independent exits - any one left open defeats the defence."
      },
      {
        "question": "How does a VPC endpoint plus a bucket policy condition on aws:sourceVpce defend against stolen credentials?",
        "options": [
          "It encrypts the credentials",
          "It denies requests that did not arrive through your VPC endpoint, so credentials used from the public internet are refused",
          "It rotates the credentials automatically",
          "It makes the bucket public only inside the VPC"
        ],
        "correctIndex": 1,
        "explanation": "The bucket policy requires requests to come via your VPC endpoint. A stolen credential used from an attacker's internet host fails the aws:sourceVpce condition and is denied despite being valid."
      },
      {
        "question": "What does enabling CloudTrail S3 DATA events give you that management events do not?",
        "options": [
          "Encryption of all objects",
          "Object-level visibility into GetObject/PutObject/DeleteObject calls",
          "Automatic blocking of public access",
          "Lower KMS costs"
        ],
        "correctIndex": 1,
        "explanation": "Management events log bucket-level operations; data events are required to record per-object reads and writes, giving an audit trail of exactly who accessed which objects."
      },
      {
        "question": "Which service classifies which buckets actually contain sensitive data like PII or credentials?",
        "options": [
          "GuardDuty",
          "Amazon Macie",
          "CloudTrail",
          "VPC Reachability Analyzer"
        ],
        "correctIndex": 1,
        "explanation": "Amazon Macie scans and classifies bucket contents to flag sensitive data (PII, secrets, financials), helping you prioritise which buckets need the tightest controls. GuardDuty detects anomalous access; CloudTrail logs it."
      },
      {
        "question": "What makes a defensive control 'real' in this module's methodology?",
        "options": [
          "That it appears in the AWS console as enabled",
          "That you have tested each exfiltration path and confirmed it is denied",
          "That compliance marked the box as checked",
          "That the bucket is encrypted"
        ],
        "correctIndex": 1,
        "explanation": "A control you have not tested is one you do not really have. The method is to attack your own locked-down design and capture the AccessDenied for each path as evidence of closure."
      }
    ]
  },
  {
    "topicId": "cloud-m6-1",
    "questions": [
      {
        "question": "Why is deleting a hardcoded API key from the current version of a file an insufficient fix?",
        "options": [
          "The key is still recoverable from earlier git commits, so it must be rotated",
          "Deleting files is not allowed in git",
          "The key is automatically re-added on the next commit",
          "Git encrypts deleted files but keeps them readable"
        ],
        "correctIndex": 0,
        "explanation": "git history preserves every version. git log -p or a scanner recovers the key from the commit that introduced it. Because the value is already exposed, rotation (invalidating the key) is the only reliable remediation."
      },
      {
        "question": "Reading a SecureString parameter from SSM Parameter Store requires which combination of permissions?",
        "options": [
          "ssm:GetParameter only",
          "ssm:GetParameter plus kms:Decrypt (for the backing key)",
          "secretsmanager:GetSecretValue",
          "No IAM permission is needed for SecureStrings"
        ],
        "correctIndex": 1,
        "explanation": "A SecureString is KMS-encrypted. The caller needs ssm:GetParameter (with WithDecryption) to read it AND kms:Decrypt on the backing key. The two-permission requirement is a deliberate layered control shared with Secrets Manager."
      },
      {
        "question": "Why can a secret still be extracted from a Docker image even if the final layer deletes the secret file?",
        "options": [
          "Docker caches secrets in a hidden vault",
          "An earlier image layer still contains the file; deletion only adds a new layer on top",
          "The registry restores deleted files automatically",
          "It cannot be extracted once deleted"
        ],
        "correctIndex": 1,
        "explanation": "Images are built from stacked immutable layers. A later RUN rm only writes a deletion marker in a new layer; the earlier layer that added the secret is still present and extractable with docker history or by unpacking layers. Multi-stage builds or build secret mounts avoid baking it in."
      },
      {
        "question": "Which location is designed as a managed secret store with native rotation support?",
        "options": [
          "EC2 user-data script",
          "Terraform state file",
          "AWS Secrets Manager",
          "Lambda environment variables"
        ],
        "correctIndex": 2,
        "explanation": "Secrets Manager is purpose-built for secrets and supports automatic rotation via Lambda rotation functions. The other three are sprawl locations that store secrets in plaintext or near-plaintext with weak access control and no rotation."
      }
    ]
  },
  {
    "topicId": "cloud-m6-2",
    "questions": [
      {
        "question": "What advantage does a 'verified' secret scan (e.g. trufflehog --only-verified) give a hunter?",
        "options": [
          "It hides the secret values for safety",
          "It confirms each candidate is a live, working credential by testing it against the provider API, reducing false positives",
          "It only looks at the latest commit",
          "It rotates the secret automatically"
        ],
        "correctIndex": 1,
        "explanation": "Verification actively checks the credential against the provider (e.g. an STS call for AWS keys). Only live secrets are reported, so triage effort goes to real, exploitable findings instead of dead or example values."
      },
      {
        "question": "When scanning a container image for secrets, why must you scan all layers rather than the running filesystem?",
        "options": [
          "The running filesystem is encrypted",
          "A secret added in one layer and deleted in a later layer still exists in the earlier layer and is recoverable",
          "Running containers block all file reads",
          "Layers are stored only in the registry, never locally"
        ],
        "correctIndex": 1,
        "explanation": "Images are stacked immutable layers. Deleting a file just adds a whiteout in a new layer; the original layer still contains the secret. Layer-aware scanning (or docker history) recovers it even when the final filesystem looks clean."
      },
      {
        "question": "Which AWS CLI action lets an attacker with read access dump a Lambda function's plaintext environment variables?",
        "options": [
          "aws lambda get-function-configuration",
          "aws kms decrypt",
          "aws s3 cp",
          "aws sts get-caller-identity"
        ],
        "correctIndex": 0,
        "explanation": "get-function-configuration returns the Environment.Variables map in plaintext. No KMS decrypt is needed because the describe response contains the cleartext values — a very common and low-noise credential source."
      },
      {
        "question": "Which control best PREVENTS a secret from ever reaching a public repository in the first place?",
        "options": [
          "Scanning the repo once a year",
          "A pre-commit/CI secret scanner plus provider push protection that blocks the commit or push",
          "Deleting the secret after it is committed",
          "Storing the secret in an environment variable instead"
        ],
        "correctIndex": 1,
        "explanation": "Prevention means catching the secret before it lands. gitleaks/detect-secrets as a pre-commit or CI gate, combined with GitHub/GitLab push protection that rejects pushes containing known key formats, stops the leak at the source. Post-hoc deletion still requires rotation because the value was exposed."
      }
    ]
  },
  {
    "topicId": "cloud-m6-3",
    "questions": [
      {
        "question": "Reading a Secrets Manager secret requires which two permissions together?",
        "options": [
          "secretsmanager:GetSecretValue and kms:Decrypt",
          "secretsmanager:GetSecretValue and s3:GetObject",
          "kms:Decrypt and iam:PassRole",
          "ssm:GetParameter and kms:Encrypt"
        ],
        "correctIndex": 0,
        "explanation": "Secrets are KMS-encrypted, so a read needs the Secrets Manager action to fetch the ciphertext AND kms:Decrypt on the backing key to turn it into plaintext. This two-lock model is a deliberate layered control."
      },
      {
        "question": "What makes a Secrets Manager resource policy dangerous?",
        "options": [
          "It encrypts the secret twice",
          "A broad Principal (e.g. \"AWS\": \"*\" or an external account) can grant read access outside your organisation",
          "It disables CloudTrail logging",
          "It prevents rotation from working"
        ],
        "correctIndex": 1,
        "explanation": "A resource policy attached to the secret can grant cross-account access. An over-broad Principal, combined with a KMS key that also allows cross-account decrypt, silently exposes the secret externally. Policies should name specific roles or constrain to aws:PrincipalOrgID."
      },
      {
        "question": "During rotation, which staging label marks the live version that applications read?",
        "options": [
          "AWSPENDING",
          "AWSPREVIOUS",
          "AWSCURRENT",
          "AWSLATEST"
        ],
        "correctIndex": 2,
        "explanation": "AWSCURRENT always points at the live version. Rotation creates an AWSPENDING candidate, tests it, then moves the AWSCURRENT label to it atomically, so apps that always request AWSCURRENT get seamless zero-downtime rotation."
      },
      {
        "question": "What is a key access-control feature of SSM Parameter Store that supports least privilege?",
        "options": [
          "It never uses encryption",
          "Access can be scoped by the parameter path hierarchy, e.g. /prod/billing/*",
          "It grants all parameters to any authenticated user",
          "It has built-in automatic rotation"
        ],
        "correctIndex": 1,
        "explanation": "Parameter Store organises values in a path hierarchy, and IAM policies can grant access per path prefix. A role can be limited to /prod/billing/* and nothing else. (It has NO native rotation, which is a reason to prefer Secrets Manager when rotation matters.)"
      }
    ]
  },
  {
    "topicId": "cloud-m6-4",
    "questions": [
      {
        "question": "What is the core security benefit of workload identity federation over a stored static access key?",
        "options": [
          "It makes credentials longer-lived so they rotate less often",
          "There is no durable credential to steal; the workload proves its identity and receives short-lived, auto-expiring credentials",
          "It encrypts the access key with KMS",
          "It stores the key in Secrets Manager instead of env vars"
        ],
        "correctIndex": 1,
        "explanation": "Federation issues temporary credentials on demand based on a proof of identity (an OIDC token). Nothing long-lived is stored, so a leaked credential expires in minutes to hours and cannot be reused indefinitely — removing the top cause of cloud breaches."
      },
      {
        "question": "How does an EKS pod using IRSA obtain AWS credentials?",
        "options": [
          "It reads a static key from a mounted Kubernetes secret",
          "It presents a signed OIDC token to AWS STS via AssumeRoleWithWebIdentity and receives temporary credentials scoped to the mapped role",
          "It queries the EC2 node's instance profile directly",
          "It downloads a service-account JSON key"
        ],
        "correctIndex": 1,
        "explanation": "IRSA annotates a service account with a role ARN. The pod gets a short-lived signed OIDC JWT; the SDK exchanges it with STS (AssumeRoleWithWebIdentity) for temporary credentials scoped to that role — no stored key and per-pod least privilege."
      },
      {
        "question": "In GitHub-to-AWS OIDC, which misconfiguration would let any repository assume your deploy role?",
        "options": [
          "Setting a short session duration",
          "A trust policy with no condition on the token's sub claim (or a wildcard sub)",
          "Enabling CloudTrail",
          "Using a customer-managed KMS key"
        ],
        "correctIndex": 1,
        "explanation": "The role's trust policy must restrict the OIDC sub claim to specific repos/branches. Omitting the sub condition, or using an overly broad wildcard, lets tokens from other repos satisfy the trust policy and assume the role. The trust policy IS the access control in a keyless setup."
      },
      {
        "question": "Which is the Azure equivalent of metadata-delivered keyless identity for a VM or Function?",
        "options": [
          "Managed Identity",
          "Access key pair",
          "Service-account JSON key",
          "SAS token"
        ],
        "correctIndex": 0,
        "explanation": "Azure Managed Identities attach to a resource and obtain Azure AD tokens from a local endpoint with no secret in config, analogous to EC2 instance profiles / ECS task roles. GCP's equivalent is Workload Identity (Federation)."
      }
    ]
  },
  {
    "topicId": "cloud-m6-5",
    "questions": [
      {
        "question": "In envelope encryption, what actually travels and gets stored next to the ciphertext?",
        "options": [
          "The KMS master key in plaintext",
          "An encrypted (wrapped) data key; the master key never leaves KMS",
          "Nothing — the data is encrypted with the master key directly",
          "The plaintext data key, stored for fast access"
        ],
        "correctIndex": 1,
        "explanation": "Data is encrypted locally with a data key. The plaintext data key is discarded; only the KMS-wrapped data key is stored beside the ciphertext. The master key (CMK) never leaves KMS — you send the wrapped key back to KMS to unwrap it when decrypting."
      },
      {
        "question": "What is the TRUE access control over KMS-encrypted data?",
        "options": [
          "The strength of the AES algorithm",
          "The KMS key policy (plus grants and IAM) deciding who may call Decrypt",
          "The size of the ciphertext",
          "Whether the data is stored in S3 or a secret"
        ],
        "correctIndex": 1,
        "explanation": "The encryption is unbreakable, so it is not the protection — access is. KMS performs Decrypt only for principals its key policy, grants and IAM allow. A broad key policy exposes the data regardless of cipher strength. Audit policies, not algorithms."
      },
      {
        "question": "To read an encrypted object in ANOTHER AWS account, what must be satisfied?",
        "options": [
          "Only the resource (bucket/secret) policy",
          "Only the KMS key policy",
          "Both the resource policy AND the KMS key policy must allow the caller",
          "Neither — cross-account access is impossible"
        ],
        "correctIndex": 2,
        "explanation": "KMS is the cross-account gatekeeper. Cross-account decryption requires BOTH the resource policy (to get the ciphertext) and the KMS key policy (to decrypt it). Either denying is a hard stop, which makes a tightly scoped key policy a strong containment control."
      },
      {
        "question": "Why prefer a customer-managed CMK over an AWS-managed key for sensitive secrets?",
        "options": [
          "AWS-managed keys use weaker encryption",
          "A CMK lets you write and tightly scope the key policy (and control rotation), while AWS-managed key policies are not editable",
          "CMKs are free and AWS-managed keys are expensive",
          "AWS-managed keys cannot encrypt secrets"
        ],
        "correctIndex": 1,
        "explanation": "Both use the same strong encryption. The difference is control: with a CMK you own the key policy and can scope Decrypt to specific principals and add conditions, plus manage rotation. AWS-managed key policies cannot be edited, giving you less containment control."
      }
    ]
  },
  {
    "topicId": "cloud-m6-6",
    "questions": [
      {
        "question": "What makes Secrets Manager rotation zero-downtime for applications?",
        "options": [
          "Applications are stopped during rotation",
          "The rotation Lambda creates an AWSPENDING version, tests it, and only then moves the AWSCURRENT label; apps always read AWSCURRENT",
          "The old secret works forever alongside the new one",
          "Rotation happens only at midnight"
        ],
        "correctIndex": 1,
        "explanation": "Rotation runs createSecret (AWSPENDING) -> setSecret -> testSecret -> finishSecret (move AWSCURRENT). The live AWSCURRENT label only moves after the new value is verified, so apps reading AWSCURRENT never see a broken credential."
      },
      {
        "question": "Why give each service its own unique secret rather than sharing one?",
        "options": [
          "It is cheaper",
          "It limits blast radius — a leak affects only that service — and makes rotation touch only one service so rotation actually happens",
          "Shared secrets cannot be encrypted",
          "AWS forbids sharing secrets"
        ],
        "correctIndex": 1,
        "explanation": "Unique per-service secrets contain a leak to one service and let you rotate that one credential without coordinating many deployments. Shared secrets make rotation painful (so teams skip it) and let one leak compromise everything that shared it."
      },
      {
        "question": "Which CloudTrail pattern is the strongest signal of secret exfiltration?",
        "options": [
          "A service reading its own single secret once per hour",
          "A single principal calling GetSecretValue across many distinct secrets in a short time window",
          "A successful kms:Encrypt call",
          "A failed login to the console"
        ],
        "correctIndex": 1,
        "explanation": "Attackers sweep secrets to grab everything quickly. One principal reading an unusual number of distinct secrets (or secrets it has never accessed before) in a short burst is a high-fidelity exfiltration signal worth alerting on."
      },
      {
        "question": "After confirming an AWS access key is leaked, what must you do IN ADDITION to rotating the secret?",
        "options": [
          "Nothing else is needed once rotated",
          "Revoke the attacker's active sessions, review CloudTrail for what the key already did, and rotate downstream secrets it could have reached",
          "Delete the CloudTrail logs",
          "Make the key longer"
        ],
        "correctIndex": 1,
        "explanation": "Rotation stops future use of the leaked value, but the revocation playbook must also cut active sessions, assess what the credential already accessed via CloudTrail, rotate anything within its blast radius, and fix the leak source. Forgetting active sessions or downstream secrets leaves the attacker inside."
      },
      {
        "question": "What does GitHub push protection do?",
        "options": [
          "Encrypts every commit",
          "Blocks a git push when it detects a known secret format, stopping the leak before it lands in the repo",
          "Rotates leaked secrets automatically after they are committed",
          "Scans only once per year"
        ],
        "correctIndex": 1,
        "explanation": "Push protection recognises known credential formats and rejects the push outright, forcing removal before the secret ever reaches the repository. It is a prevention gate — the cheapest place to stop a leak — complementing pre-commit scanners like gitleaks."
      }
    ]
  },
  {
    "topicId": "cloud-m7-1",
    "questions": [
      {
        "question": "What actually makes a subnet 'public' in a VPC?",
        "options": [
          "A checkbox named 'public' on the subnet",
          "A route 0.0.0.0/0 pointing to an Internet Gateway in its route table",
          "Having at least one instance with a private IP",
          "Being in a specific Availability Zone"
        ],
        "correctIndex": 1,
        "explanation": "A subnet is public purely because its route table sends catch-all traffic (0.0.0.0/0) to an Internet Gateway. Names and other settings are cosmetic; the route table is ground truth."
      },
      {
        "question": "Which statement about Security Groups vs NACLs is correct?",
        "options": [
          "Security Groups are stateless; NACLs are stateful",
          "Both support explicit deny rules",
          "Security Groups are stateful and allow-only; NACLs are stateless and support allow+deny",
          "NACLs attach to instances; Security Groups attach to subnets"
        ],
        "correctIndex": 2,
        "explanation": "Security Groups attach to the instance/ENI, are stateful, and only allow. NACLs attach to the subnet, are stateless (each direction evaluated separately), and support both allow and deny rules."
      },
      {
        "question": "A NAT Gateway in a private subnet's route table allows what?",
        "options": [
          "Inbound connections from the internet to private instances",
          "Private instances to make outbound internet connections but not receive inbound ones",
          "Peering between two VPCs",
          "Direct S3 access without leaving AWS"
        ],
        "correctIndex": 1,
        "explanation": "A NAT Gateway is a one-way valve: private instances can initiate outbound connections (e.g., for updates), but the internet cannot initiate connections to them."
      },
      {
        "question": "VPC peering between A-B and B-C means:",
        "options": [
          "A can automatically reach C through B",
          "A cannot reach C — peering is non-transitive",
          "All three VPCs become one flat network",
          "C can reach A but not vice versa"
        ],
        "correctIndex": 1,
        "explanation": "Peering is strictly non-transitive. A reaching C would require its own A-C peering. This limit contains blast radius, which is why Transit Gateway's hub model (which can create flat reachability) deserves extra scrutiny."
      }
    ]
  },
  {
    "topicId": "cloud-m7-2",
    "questions": [
      {
        "question": "What is the security significance of the path /latest/meta-data/iam/security-credentials/<role>?",
        "options": [
          "It returns the instance's public IP only",
          "It returns live temporary AWS credentials carrying the instance role's full permissions",
          "It returns an encrypted blob that cannot be used remotely",
          "It only works for the AWS account root user"
        ],
        "correctIndex": 1,
        "explanation": "That path returns a working AccessKeyId, SecretAccessKey, and session Token for the attached IAM role. Whoever holds them inherits that role's permissions until they expire."
      },
      {
        "question": "169.254.169.254 is a link-local address, which means:",
        "options": [
          "It is reachable from anywhere on the internet",
          "It is only valid on the local link / from the instance itself and is never routed externally",
          "It changes every time the instance reboots",
          "It requires TLS to connect"
        ],
        "correctIndex": 1,
        "explanation": "Link-local addresses (169.254.0.0/16) are not routed across networks. IMDS is only reachable from on the instance — which is exactly why 'being on the box' is treated as sufficient authorization."
      },
      {
        "question": "Which is the correct first step to read metadata under IMDSv2?",
        "options": [
          "A plain GET to /latest/meta-data/",
          "A PUT to /latest/api/token to obtain a session token, then GETs carrying that token",
          "An IAM login with username and password",
          "An SSH connection to 169.254.169.254"
        ],
        "correctIndex": 1,
        "explanation": "IMDSv2 requires a PUT to /latest/api/token (with a TTL header) to get a short-lived token, which must then accompany every GET in the X-aws-ec2-metadata-token header."
      },
      {
        "question": "On GCP, reaching the metadata server typically requires which header?",
        "options": [
          "Authorization: Bearer <token>",
          "Metadata-Flavor: Google",
          "X-aws-ec2-metadata-token",
          "No header at all"
        ],
        "correctIndex": 1,
        "explanation": "GCP's metadata server at metadata.google.internal requires the 'Metadata-Flavor: Google' header. Azure similarly requires 'Metadata: true'. These header requirements can block the most naive pure-GET SSRF."
      }
    ]
  },
  {
    "topicId": "cloud-m7-3",
    "questions": [
      {
        "question": "In an SSRF-to-metadata attack, why does the metadata service hand over credentials to the attacker?",
        "options": [
          "The attacker authenticates with stolen IAM credentials first",
          "The vulnerable server makes the request, so to IMDS it looks like a trusted local request",
          "The metadata service has a public internet endpoint",
          "The attacker brute-forces the metadata token"
        ],
        "correctIndex": 1,
        "explanation": "IMDS trusts any request originating from the instance. SSRF makes the vulnerable server issue the request, so it appears local and trusted — the attacker's packet never touches 169.254.169.254 directly."
      },
      {
        "question": "Which application feature is a classic SSRF entry point?",
        "options": [
          "A static image served from a CDN",
          "A link-preview / URL-fetch feature that retrieves a user-supplied URL server-side",
          "A client-side JavaScript date picker",
          "A CSS stylesheet import"
        ],
        "correctIndex": 1,
        "explanation": "Any feature where the server fetches a user-supplied URL (link previews, webhooks, document/image processors, import-from-URL) can be abused for SSRF. Client-side-only features don't make server-side requests."
      },
      {
        "question": "Against an IMDSv1 instance, what does pointing an SSRF at /latest/meta-data/iam/security-credentials/<role> return?",
        "options": [
          "A 401 Unauthorized error",
          "The instance's live role credentials (AccessKey, Secret, Token)",
          "Only the role's name, never the keys",
          "An encrypted token usable only on that instance"
        ],
        "correctIndex": 1,
        "explanation": "IMDSv1 needs no token, so a single GET to the credentials path returns usable temporary credentials. This is what makes the naive SSRF chain trivial on IMDSv1."
      },
      {
        "question": "What made the 2019 Capital One breach possible through this exact chain?",
        "options": [
          "A zero-day in the AWS hypervisor",
          "An SSRF in a misconfigured WAF on an IMDSv1 EC2 instance with an over-broad S3 role",
          "A leaked root account password",
          "A supply-chain attack on an npm package"
        ],
        "correctIndex": 1,
        "explanation": "The attacker used an SSRF in a misconfigured ModSecurity WAF to read role credentials from IMDSv1, then used that over-permissioned role to exfiltrate ~100M records from S3 — the textbook SSRF-to-metadata chain."
      }
    ]
  },
  {
    "topicId": "cloud-m7-4",
    "questions": [
      {
        "question": "Which security-group rule is almost always a finding?",
        "options": [
          "443 (HTTPS) open to 0.0.0.0/0 on a public load balancer",
          "22 (SSH) open to 0.0.0.0/0",
          "5432 open only to the application's security group",
          "80 redirecting to 443"
        ],
        "correctIndex": 1,
        "explanation": "Management ports like SSH (22) and RDP (3389) open to the entire internet are a standing invitation to brute-forcing and exploitation and are rarely intentional. Public HTTPS on a load balancer is normal."
      },
      {
        "question": "Why is exposure a 'whole-path' property rather than a single setting?",
        "options": [
          "Because AWS randomly blocks some traffic",
          "Because a resource is only reachable if the route table, NACL, and security group all permit the path",
          "Because security groups are evaluated client-side",
          "Because exposure only depends on whether the instance has a public IP"
        ],
        "correctIndex": 1,
        "explanation": "Traffic must pass every layer: a public route to the subnet, a permitting NACL, and a permitting security group. An open security group on a resource with no public route is not internet-reachable."
      },
      {
        "question": "What does AWS VPC Reachability Analyzer provide that a rule-by-rule scan does not?",
        "options": [
          "It encrypts the security groups",
          "It traces whether a specific source can actually reach a destination through all routing and filtering layers",
          "It automatically fixes open ports",
          "It scans the application code for bugs"
        ],
        "correctIndex": 1,
        "explanation": "Reachability Analyzer follows the real routing graph (including peering and endpoints) to prove whether a path exists end to end — catching shadow exposures that per-rule inspection misses."
      },
      {
        "question": "Which tools are purpose-built to scan an account for exposure misconfigurations?",
        "options": [
          "Prowler and ScoutSuite",
          "Wireshark and tcpdump",
          "Terraform and CloudFormation",
          "git and jq"
        ],
        "correctIndex": 0,
        "explanation": "Prowler and ScoutSuite are cloud security-posture scanners that run many checks, including over-broad security groups and public resources, producing prioritized reports. The others are not posture scanners."
      }
    ]
  },
  {
    "topicId": "cloud-m7-5",
    "questions": [
      {
        "question": "What is east-west traffic, and why do attackers target it?",
        "options": [
          "Traffic crossing the internet perimeter; it is heavily defended",
          "Internal service-to-service traffic; it is often implicitly trusted and under-defended",
          "Encrypted traffic only",
          "Traffic between AWS regions"
        ],
        "correctIndex": 1,
        "explanation": "East-west is internal traffic between resources. Defenses concentrate on the north-south perimeter, leaving the internal interior implicitly trusted — which is exactly where lateral movement happens."
      },
      {
        "question": "Why are internal Redis/Memcached caches a common lateral-movement target?",
        "options": [
          "They require MFA by default",
          "They historically ship with no authentication, so any host that can connect gets full access",
          "They are always exposed to the internet",
          "They encrypt all data at rest"
        ],
        "correctIndex": 1,
        "explanation": "Redis and Memcached traditionally have no authentication. In a flat network an attacker who can reach them simply connects — reinforcing that 'internal' must never be treated as 'trusted.'"
      },
      {
        "question": "What is the core defense against DNS rebinding in an SSRF context?",
        "options": [
          "Allowing all internal IP ranges",
          "Resolve the hostname once and connect to that exact IP, and block link-local/private ranges",
          "Increasing the DNS TTL",
          "Using HTTP instead of HTTPS"
        ],
        "correctIndex": 1,
        "explanation": "Rebinding exploits the gap between check and use. Resolving once and connecting to that resolved IP (plus blocking private/link-local destinations) removes the swap window the attack depends on."
      },
      {
        "question": "Why is a bastion/jump host a prime pivot target?",
        "options": [
          "It stores the root account password",
          "By design it has reach into the private network, so compromising it inherits that reach",
          "It is the only host without a security group",
          "It runs the metadata service"
        ],
        "correctIndex": 1,
        "explanation": "A bastion is deliberately bridged into the private network for admin access. Compromising it hands the attacker that same privileged reach, which is why bastions need the strictest controls (MFA, logging, or replacement by SSM Session Manager)."
      }
    ]
  },
  {
    "topicId": "cloud-m7-6",
    "questions": [
      {
        "question": "Which control most directly breaks the SSRF-to-metadata credential-theft chain?",
        "options": [
          "Adding a WAF in front of the app",
          "Enforcing IMDSv2 (HttpTokens=required) with hop-limit 1",
          "Enabling CloudTrail logging",
          "Rotating the root account password"
        ],
        "correctIndex": 1,
        "explanation": "Enforcing IMDSv2 requires a PUT-obtained token on every metadata read, which naive SSRF can't perform, and hop-limit 1 drops proxied requests. This directly severs the credential-theft step."
      },
      {
        "question": "In micro-segmentation, how should a database security group ideally allow the app to connect?",
        "options": [
          "Allow 5432 from 0.0.0.0/0",
          "Allow 5432 from a broad CIDR like 10.0.0.0/8",
          "Allow 5432 only from the application's security group",
          "Allow all ports from the whole VPC"
        ],
        "correctIndex": 2,
        "explanation": "Referencing the specific source security group (not a CIDR) keeps access least-privilege and stable as instances change, so only the app — not any host on the network — can reach the database port."
      },
      {
        "question": "What does the GuardDuty InstanceCredentialExfiltration finding detect?",
        "options": [
          "A security group opened to 0.0.0.0/0",
          "EC2 instance-role credentials being used from outside that instance (external IP or different account)",
          "A failed SSH login",
          "An unencrypted S3 bucket"
        ],
        "correctIndex": 1,
        "explanation": "This finding fires when credentials minted for an instance role are used off-instance — e.g., from an attacker's machine (.OutsideAWS) or another account (.InsideAWS) — which is the tell-tale sign of metadata credential theft."
      },
      {
        "question": "Why is egress filtering an important hardening layer?",
        "options": [
          "It speeds up the application",
          "It limits a compromised host's ability to exfiltrate data and pull down tooling, and makes outbound attempts detectable",
          "It replaces the need for IMDSv2",
          "It encrypts inbound traffic"
        ],
        "correctIndex": 1,
        "explanation": "Exfiltration and credential-beaconing are outbound. Restricting egress to only what the workload needs (and routing AWS calls through VPC endpoints) stops free data exfiltration and turns outbound attempts into loud anomalies."
      }
    ]
  },
  {
    "topicId": "cloud-m8-1",
    "questions": [
      {
        "question": "What are the four core elements of the serverless attack surface?",
        "options": [
          "OS, kernel, network, disk",
          "Code, event data, execution role, dependencies",
          "VPC, subnet, security group, NACL",
          "CPU, memory, timeout, concurrency"
        ],
        "correctIndex": 1,
        "explanation": "Serverless has no host to patch; the surface collapses to the code, the untrusted event input, the IAM execution role, and the bundled dependencies."
      },
      {
        "question": "Why is warm-container reuse a security concern?",
        "options": [
          "It makes functions slower",
          "Leftover data in /tmp or globals can leak between invocations",
          "It increases the IAM role's permissions",
          "It disables CloudTrail logging"
        ],
        "correctIndex": 1,
        "explanation": "AWS reuses warm containers, so writable /tmp and module-level globals persist across invokes and can leak data from one request into another."
      },
      {
        "question": "Which document best frames serverless-specific risks?",
        "options": [
          "OWASP Web Top 10 only",
          "OWASP Serverless Top 10",
          "PCI-DSS",
          "CIS Docker Benchmark"
        ],
        "correctIndex": 1,
        "explanation": "The OWASP Serverless Top 10 catalogues FaaS-specific risks like event injection and over-privileged roles."
      },
      {
        "question": "An S3 object key that reaches a function's handler should be treated as:",
        "options": [
          "Trusted, because S3 is an AWS service",
          "Untrusted attacker-influenceable input",
          "Irrelevant to security",
          "Automatically sanitized by Lambda"
        ],
        "correctIndex": 1,
        "explanation": "Any field from an event source, including S3 object keys, can be attacker-controlled and must be validated like any other untrusted input."
      }
    ]
  },
  {
    "topicId": "cloud-m8-2",
    "questions": [
      {
        "question": "Event injection is best described as:",
        "options": [
          "A denial-of-service against the event bus",
          "Untrusted event-source data reaching a dangerous execution/interpretation sink",
          "A misconfigured IAM trust policy",
          "A cold-start performance problem"
        ],
        "correctIndex": 1,
        "explanation": "It is the serverless analogue of injection: attacker-controlled event fields flow unvalidated into sinks like os.system or raw SQL."
      },
      {
        "question": "Which code pattern is most likely to enable command injection?",
        "options": [
          "subprocess.run(['convert', name], shell=False)",
          "os.system('convert ' + name)",
          "json.loads(event['body'])",
          "boto3.client('s3').get_object(...)"
        ],
        "correctIndex": 1,
        "explanation": "Concatenating untrusted input into a shell string run by os.system lets shell metacharacters execute. The argv form with shell=False and json.loads are safe."
      },
      {
        "question": "An S3-triggered function is often under-tested for injection because:",
        "options": [
          "S3 events cannot contain attacker data",
          "The object key is not internet-facing, so teams forget it is attacker-influenceable",
          "S3 automatically sanitizes keys",
          "Lambda blocks injection by default"
        ],
        "correctIndex": 1,
        "explanation": "Non-HTTP event sources feel 'internal', but an attacker who can place an object controls the key, which is untrusted input."
      },
      {
        "question": "The safest way to handle an attacker-controlled event body that must be parsed is:",
        "options": [
          "pickle.loads for speed",
          "yaml.load without SafeLoader",
          "json.loads against a strict schema",
          "eval of the string"
        ],
        "correctIndex": 2,
        "explanation": "JSON parsing with schema validation avoids code execution. pickle, unsafe yaml.load and eval all execute attacker-controlled data."
      }
    ]
  },
  {
    "topicId": "cloud-m8-3",
    "questions": [
      {
        "question": "How does a compromised Lambda typically obtain AWS credentials?",
        "options": [
          "By querying 169.254.169.254 like EC2",
          "From AWS_* environment variables injected by the runtime",
          "By brute-forcing IAM",
          "They cannot obtain any credentials"
        ],
        "correctIndex": 1,
        "explanation": "Lambda places the execution role's temporary credentials in environment variables; unlike EC2 there is no IMDS endpoint."
      },
      {
        "question": "Which permission on its own function gives an attacker quiet persistence?",
        "options": [
          "lambda:GetFunction",
          "lambda:UpdateFunctionCode",
          "logs:CreateLogStream",
          "cloudwatch:PutMetricData"
        ],
        "correctIndex": 1,
        "explanation": "UpdateFunctionCode lets the attacker overwrite the function with a backdoor that runs on every legitimate invoke."
      },
      {
        "question": "iam:PassRole is dangerous because it can let an attacker:",
        "options": [
          "Delete CloudTrail logs",
          "Assign a more privileged role to code they control",
          "Change the function timeout",
          "Read environment variables"
        ],
        "correctIndex": 1,
        "explanation": "PassRole combined with a service that runs code (Lambda, EC2, Glue) lets an attacker launch workloads under a higher-privileged role, which is privilege escalation."
      },
      {
        "question": "The primary mitigation for execution-role abuse is:",
        "options": [
          "A longer function timeout",
          "One tightly-scoped least-privilege role per function",
          "Disabling environment variables",
          "Increasing memory"
        ],
        "correctIndex": 1,
        "explanation": "Each function should have its own role scoped to specific actions and resource ARNs, limiting what a compromise can reach."
      },
      {
        "question": "Why is harvesting Lambda role creds attractive versus finding a host to persist on?",
        "options": [
          "Lambda has no managed host, so the pre-authenticated role creds are the prize and work from anywhere until they expire",
          "Lambda creds never expire",
          "The creds grant AdministratorAccess by default",
          "It triggers no CloudTrail events"
        ],
        "correctIndex": 0,
        "explanation": "There is no long-lived server to backdoor, so the role's temporary credentials are the natural objective and work off-box until expiry. They are not admin by default, and STS calls are logged."
      }
    ]
  },
  {
    "topicId": "cloud-m8-4",
    "questions": [
      {
        "question": "A sensitive route has authorizationType set to NONE. This means:",
        "options": [
          "Only admins can call it",
          "Anyone on the internet can call it unauthenticated",
          "It is cached",
          "CORS is disabled"
        ],
        "correctIndex": 1,
        "explanation": "NONE means API Gateway performs no authorization; the route is open to any caller."
      },
      {
        "question": "Long authorizer result caching is risky because:",
        "options": [
          "It slows down requests",
          "A revoked or replayed token is accepted for the whole TTL",
          "It disables Lambda",
          "It blocks CORS"
        ],
        "correctIndex": 1,
        "explanation": "Cached Allow decisions are reused for the TTL, so revocation is delayed and replayed tokens may be honored without re-validation."
      },
      {
        "question": "With a Lambda proxy (AWS_PROXY) integration, mass assignment happens when:",
        "options": [
          "API Gateway rejects the body",
          "The handler blindly spreads the forwarded request body into a data store",
          "Throttling is enabled",
          "The authorizer caches a token"
        ],
        "correctIndex": 1,
        "explanation": "Proxy integration forwards the full body; if the handler merges it into an update without allowlisting fields, attackers inject fields like role=admin."
      },
      {
        "question": "A resource policy differs from an authorizer in that it:",
        "options": [
          "Validates JSON schemas",
          "Controls which networks/principals can reach the API at all",
          "Rotates credentials",
          "Renders HTML"
        ],
        "correctIndex": 1,
        "explanation": "Resource policies are coarse network/principal controls (IP, VPC, account), while authorizers decide per-request identity and authorization."
      }
    ]
  },
  {
    "topicId": "cloud-m8-5",
    "questions": [
      {
        "question": "Why is a malicious dependency especially dangerous in a Lambda?",
        "options": [
          "It cannot run in Lambda",
          "It runs in the same process as your handler, with the execution role's credentials",
          "Lambda sandboxes each dependency separately",
          "It only affects the build server"
        ],
        "correctIndex": 1,
        "explanation": "Dependencies execute inside the function runtime under the function's role, so they can read env creds and exfiltrate data."
      },
      {
        "question": "Dependency confusion succeeds when:",
        "options": [
          "All packages are pinned by hash",
          "A public package shares a private package's name and has a higher version, so the installer prefers it",
          "Install scripts are disabled",
          "A lockfile is committed"
        ],
        "correctIndex": 1,
        "explanation": "Unscoped name resolution across public and private registries lets a higher-versioned public impostor win."
      },
      {
        "question": "A Lambda layer referenced from another account should be treated as:",
        "options": [
          "Trusted AWS-managed code",
          "Unvetted third-party code running with your function's role",
          "A network control",
          "Automatically scanned by AWS"
        ],
        "correctIndex": 1,
        "explanation": "Layers run in your function's process; a layer you did not build and pin is an unreviewed supply-chain dependency."
      },
      {
        "question": "Which practice most directly makes serverless builds reproducible and auditable?",
        "options": [
          "Increasing function memory",
          "Committing lockfiles, pinning versions, and generating an SBOM",
          "Enabling CORS",
          "Using a longer timeout"
        ],
        "correctIndex": 1,
        "explanation": "Lockfiles and pinning give deterministic builds; an SBOM lets you quickly assess exposure to new CVEs."
      }
    ]
  },
  {
    "topicId": "cloud-m8-6",
    "questions": [
      {
        "question": "The best way to produce a least-privilege Lambda policy is to:",
        "options": [
          "Attach AdministratorAccess and remove later",
          "Generate it from observed CloudTrail activity with IAM Access Analyzer",
          "Use s3:* scoped to *",
          "Copy another team's role"
        ],
        "correctIndex": 1,
        "explanation": "Policy generation from real CloudTrail usage yields a tight policy matching actual needs, avoiding guesswork and wildcards."
      },
      {
        "question": "Reserved (maximum) concurrency primarily protects against:",
        "options": [
          "Cold starts",
          "Denial-of-wallet and one route exhausting account concurrency",
          "CORS errors",
          "IAM misconfiguration"
        ],
        "correctIndex": 1,
        "explanation": "Capping concurrency bounds cost and prevents a single abused function from starving the rest of the account."
      },
      {
        "question": "Lambda code signing defeats which attack?",
        "options": [
          "Event injection",
          "Persistence via unauthorized UpdateFunctionCode with a backdoor",
          "Dependency confusion",
          "CORS abuse"
        ],
        "correctIndex": 1,
        "explanation": "With enforced code signing, Lambda rejects unsigned or altered packages, blocking attacker-supplied code."
      },
      {
        "question": "Request validation at API Gateway helps because it:",
        "options": [
          "Encrypts the database",
          "Rejects malformed/invalid request bodies before the function runs",
          "Rotates credentials",
          "Caches authorizer decisions"
        ],
        "correctIndex": 1,
        "explanation": "A JSON Schema model plus the request validator returns 400 for bad input at the gateway, reducing what reaches the handler."
      },
      {
        "question": "Which single CloudTrail event is the highest-value alarm for serverless persistence?",
        "options": [
          "GetFunction",
          "UpdateFunctionCode",
          "ListFunctions",
          "GetAccountSettings"
        ],
        "correctIndex": 1,
        "explanation": "UpdateFunctionCode changes the code that runs on every invoke; an unexpected one is a classic persistence/backdoor signal."
      }
    ]
  },
  {
    "topicId": "cloud-m9-1",
    "questions": [
      {
        "question": "Which three Linux kernel features provide the core of container isolation?",
        "options": [
          "Hypervisor, BIOS, and TPM",
          "Namespaces, cgroups, and capabilities",
          "SELinux, iptables, and systemd",
          "Virtual disks, virtual NICs, and vCPUs"
        ],
        "correctIndex": 1,
        "explanation": "Namespaces control what a process can see, cgroups control how much it can use, and capabilities control what it is allowed to do. Together they create the container boundary on a shared kernel."
      },
      {
        "question": "A container is configured with hostPID. What does this allow?",
        "options": [
          "The container gets its own isolated process tree",
          "The container can see and send signals to all processes on the host",
          "The container is given a dedicated kernel",
          "The container's CPU usage is capped"
        ],
        "correctIndex": 1,
        "explanation": "Sharing the host PID namespace removes process isolation, so the container sees every host process and can signal them. It is a common step in breakout and host-recon."
      },
      {
        "question": "Why can a kernel exploit launched from inside a container compromise the host?",
        "options": [
          "Because containers run their own vulnerable kernel",
          "Because the container and host share the single host kernel, with no hypervisor between them",
          "Because Docker disables all kernel protections",
          "Because cgroups forward exploits to the host"
        ],
        "correctIndex": 1,
        "explanation": "Containers share the host kernel. There is no hypervisor boundary, so a successful kernel-level exploit runs with host-kernel privileges. VM-grade isolation (gVisor, Kata) is needed to stop this."
      },
      {
        "question": "What problem does user-namespace remapping (or rootless containers) solve?",
        "options": [
          "It encrypts the container filesystem",
          "It makes UID 0 inside the container map to an unprivileged UID on the host, so a breakout lands as a non-root user",
          "It gives each container a unique IP address",
          "It automatically scans images for CVEs"
        ],
        "correctIndex": 1,
        "explanation": "Remapping breaks the equivalence between in-container root and host root. If an attacker escapes, they are an unprivileged host user, greatly limiting damage."
      },
      {
        "question": "CVE-2019-5736 is significant because it showed that:",
        "options": [
          "Alpine images are always vulnerable",
          "A malicious container could overwrite the host runc binary and gain root code execution on the host",
          "cgroups can be disabled remotely",
          "Kubernetes secrets are stored in plaintext"
        ],
        "correctIndex": 1,
        "explanation": "The runc flaw let a container abuse /proc/self/exe to overwrite the host runc binary, achieving host root. It is the classic example that runtime CVEs are breakout-grade, so runc/containerd must be kept patched."
      }
    ]
  },
  {
    "topicId": "cloud-m9-2",
    "questions": [
      {
        "question": "A developer copies an API key into an image and removes it with a later RUN rm. Is the key safe?",
        "options": [
          "Yes, the file is gone from the running container so it is safe",
          "No, the key remains in the earlier image layer and can be extracted from the image history",
          "Yes, as long as the image is private",
          "No, but only if the image uses Alpine"
        ],
        "correctIndex": 1,
        "explanation": "Image layers are append-only and individually inspectable. A later deletion does not remove the bytes from the layer where the key was added; tools like docker save or dive recover it easily."
      },
      {
        "question": "What is the main security benefit of a distroless base image?",
        "options": [
          "It encrypts the application automatically",
          "It removes the shell and package manager, shrinking the attack surface and hindering post-exploitation pivoting",
          "It signs the image for you",
          "It guarantees zero CVEs forever"
        ],
        "correctIndex": 1,
        "explanation": "Distroless ships only the app and its runtime, no shell or package manager. Fewer packages mean fewer CVEs, and an attacker who lands has no /bin/sh or tooling to pivot with."
      },
      {
        "question": "What does Cosign (Sigstore) provide in the image supply chain?",
        "options": [
          "It scans images for malware at runtime",
          "It cryptographically signs images and lets admission controllers verify provenance before running them",
          "It compresses image layers",
          "It rotates registry passwords"
        ],
        "correctIndex": 1,
        "explanation": "Cosign signs images and stores signatures in the registry. An admission policy (Kyverno verifyImages, Connaisseur) can then reject unsigned or untrusted images, proving integrity and origin."
      },
      {
        "question": "Why do immutable tags and pinning by digest improve supply-chain security?",
        "options": [
          "They make images run faster",
          "They ensure a given tag or digest always refers to the exact same bits, preventing a silent malicious re-push from changing what you deploy",
          "They automatically remove secrets",
          "They disable the registry's authentication"
        ],
        "correctIndex": 1,
        "explanation": "Immutable tags cannot be overwritten and a digest (@sha256:...) is content-addressed, so the image you reviewed is the image that runs. This blocks attackers who re-push a poisoned image under the same tag."
      },
      {
        "question": "What is a key limitation of image vulnerability scanners like Trivy or Grype?",
        "options": [
          "They cannot read Alpine images",
          "They detect only known CVEs in recognised packages, so they miss custom backdoors and unknown zero-days",
          "They can only run inside Kubernetes",
          "They delete vulnerable layers automatically"
        ],
        "correctIndex": 1,
        "explanation": "Scanners match packages against vulnerability databases. They are essential but not sufficient: a bespoke backdoor or an undisclosed zero-day will not appear in any database, so scanning must be paired with signing, minimisation and trusted sourcing."
      }
    ]
  },
  {
    "topicId": "cloud-m9-3",
    "questions": [
      {
        "question": "What does 'container breakout' mean?",
        "options": [
          "A container crashing and restarting",
          "Moving from code execution inside a container to code execution on the host",
          "Scaling a deployment to more replicas",
          "A container running out of memory"
        ],
        "correctIndex": 1,
        "explanation": "Breakout (escape) is escalating from inside the container to the host, which then exposes other containers, node credentials and often the cloud account. MITRE ATT&CK tracks it as Escape to Host (T1611)."
      },
      {
        "question": "Which of these is the LEAST likely to be a real-world breakout cause?",
        "options": [
          "A novel, never-seen kernel zero-day",
          "The container run with --privileged",
          "The Docker socket bind-mounted into the container",
          "A writable hostPath mount of the host root filesystem"
        ],
        "correctIndex": 0,
        "explanation": "Most breakouts are operator misconfigurations: privileged, mounted sockets, host namespaces and host mounts. Exotic kernel zero-days are rare by comparison, which is why defense centers on secure configuration."
      },
      {
        "question": "Why is mounting /var/run/docker.sock into a container equivalent to giving it host root?",
        "options": [
          "The socket contains the host's password hash",
          "The socket is the root-level daemon API; the container can create a privileged container that mounts the host filesystem",
          "It automatically grants CAP_NET_ADMIN only",
          "It merely lets the container read its own logs"
        ],
        "correctIndex": 1,
        "explanation": "The socket is the full Docker API of a daemon running as host root. Access lets an attacker launch a new privileged container mounting / and run commands as host root. There is no safe read-only mode."
      },
      {
        "question": "Which single setting most directly prevents the classic privileged-container and capability-based escapes?",
        "options": [
          "Adding more memory to the container",
          "Running without --privileged and dropping all capabilities, adding back only what is needed",
          "Using a larger base image",
          "Exposing the container on hostNetwork"
        ],
        "correctIndex": 1,
        "explanation": "Removing --privileged and using --cap-drop=ALL with a minimal cap-add removes the kernel powers (mount, cgroup manipulation) that breakouts rely on. hostNetwork would make things worse, not better."
      },
      {
        "question": "For an untrusted multi-tenant workload that needs a genuine isolation boundary, the best option is to:",
        "options": [
          "Run it with hostPID so you can monitor it",
          "Run it under a sandboxed runtime such as gVisor or Kata Containers",
          "Give it CAP_SYS_ADMIN so it can self-police",
          "Mount the Docker socket so it can restart itself"
        ],
        "correctIndex": 1,
        "explanation": "gVisor (user-space kernel) and Kata (microVM per container) provide a real kernel boundary, unlike standard namespace isolation. They are the right choice when the workload is untrusted."
      }
    ]
  },
  {
    "topicId": "cloud-m9-4",
    "questions": [
      {
        "question": "Which single component is the central policy decision point that all Kubernetes requests pass through?",
        "options": [
          "kube-scheduler",
          "kube-apiserver",
          "kube-proxy",
          "the container runtime"
        ],
        "correctIndex": 1,
        "explanation": "The kube-apiserver is the front door for every request and performs authentication, authorization (RBAC) and admission. It is the only component that talks to etcd, so controlling access to it is central to cluster security."
      },
      {
        "question": "Why is etcd considered the crown jewels of a Kubernetes cluster?",
        "options": [
          "It runs the container workloads",
          "It stores all cluster state including every Secret, often only base64-encoded unless encryption at rest is enabled",
          "It is the user-facing dashboard",
          "It schedules pods onto nodes"
        ],
        "correctIndex": 1,
        "explanation": "etcd holds the entire cluster state and all Secrets. Without encryption at rest these are merely base64-encoded, so reading etcd (or a leaked backup) exposes every secret, equalling total compromise."
      },
      {
        "question": "After getting code execution in a pod, why is the auto-mounted service-account token so valuable to an attacker?",
        "options": [
          "It contains the node's SSH key",
          "It is a credential that lets them call the API server as that service account, inheriting its RBAC permissions",
          "It disables network policy",
          "It is the etcd encryption key"
        ],
        "correctIndex": 1,
        "explanation": "The SA token at /var/run/secrets/kubernetes.io/serviceaccount/token authenticates to the API server as the pod's service account. If that SA has broad RBAC, a single popped pod becomes cluster control."
      },
      {
        "question": "What is the risk of a kubelet API (port 10250) that allows anonymous authentication?",
        "options": [
          "It only exposes Prometheus metrics",
          "Anyone who can reach it can exec into the node's pods and read their secrets without credentials",
          "It reboots the cluster nightly",
          "It encrypts etcd automatically"
        ],
        "correctIndex": 1,
        "explanation": "The kubelet API can exec into pods on its node. With anonymous auth, unauthenticated network access to 10250 lets an attacker run commands in those pods and harvest secrets, so it must be firewalled and require webhook authn/authz."
      },
      {
        "question": "Which framework is most directly useful for systematically mapping Kubernetes attack techniques?",
        "options": [
          "OWASP Mobile Top 10",
          "MITRE ATT&CK for Containers / Microsoft Threat Matrix for Kubernetes",
          "PCI-DSS",
          "The CAP theorem"
        ],
        "correctIndex": 1,
        "explanation": "MITRE ATT&CK for Containers and Microsoft's Kubernetes threat matrix enumerate K8s-specific tactics and techniques, giving attackers and defenders a shared map of where to focus."
      }
    ]
  },
  {
    "topicId": "cloud-m9-5",
    "questions": [
      {
        "question": "What is the difference between a RoleBinding and a ClusterRoleBinding?",
        "options": [
          "RoleBinding grants permissions within a single namespace; ClusterRoleBinding grants them across the whole cluster",
          "They are identical",
          "RoleBinding is for users only; ClusterRoleBinding is for pods only",
          "ClusterRoleBinding denies permissions; RoleBinding allows them"
        ],
        "correctIndex": 0,
        "explanation": "A RoleBinding scopes a grant to one namespace, while a ClusterRoleBinding applies cluster-wide. A ClusterRoleBinding to cluster-admin is effectively god mode, so it should be rare and tightly controlled."
      },
      {
        "question": "Which permission most directly lets an attacker read other service accounts' tokens and cloud credentials?",
        "options": [
          "get/list on configmaps",
          "get/list on secrets",
          "watch on pods",
          "get on services"
        ],
        "correctIndex": 1,
        "explanation": "secrets get/list exposes every Secret in scope, including SA token secrets and cloud credentials. It is a top dangerous verb and should be granted only when strictly necessary."
      },
      {
        "question": "Why is 'create pods' a dangerous RBAC permission even without any other verb?",
        "options": [
          "Creating a pod automatically deletes RBAC",
          "The attacker controls the pod spec, so they can mount a privileged SA's token or use hostPath/privileged to escape to the node",
          "It grants read access to etcd directly",
          "It has no security impact at all"
        ],
        "correctIndex": 1,
        "explanation": "Controlling a pod spec lets an attacker set serviceAccountName to a higher-privileged SA or use hostPath/hostPID/privileged for node breakout. That is why pods/create must be paired with Pod Security restrictions."
      },
      {
        "question": "Which command gives an attacker (or auditor) the quickest view of what a service-account token can do?",
        "options": [
          "kubectl get nodes",
          "kubectl auth can-i --list",
          "kubectl version",
          "kubectl cluster-info"
        ],
        "correctIndex": 1,
        "explanation": "kubectl auth can-i --list (with the token) enumerates the identity's effective permissions, immediately revealing any dangerous verbs available for escalation."
      },
      {
        "question": "Which mitigation most reduces the value of a stolen service-account token for a pod that never calls the API server?",
        "options": [
          "Giving the SA cluster-admin so it is consistent",
          "Setting automountServiceAccountToken: false so no token is mounted",
          "Running the pod as privileged",
          "Disabling network policy"
        ],
        "correctIndex": 1,
        "explanation": "If the pod does not need to call the API server, disabling token auto-mount means there is no token on disk to steal. Combined with least-privilege RBAC and short-lived projected tokens, this shrinks the blast radius."
      }
    ]
  },
  {
    "topicId": "cloud-m9-6",
    "questions": [
      {
        "question": "What replaced PodSecurityPolicy (removed in Kubernetes 1.25) for enforcing pod-level restrictions?",
        "options": [
          "NetworkPolicy",
          "Pod Security Admission enforcing the Pod Security Standards (privileged/baseline/restricted)",
          "etcd encryption",
          "kube-proxy"
        ],
        "correctIndex": 1,
        "explanation": "Pod Security Admission is the built-in replacement. Labeling a namespace with enforce=restricted blocks privileged, hostPath and host-namespace pods, neutralizing common breakout and escalation setups."
      },
      {
        "question": "What is the default pod-to-pod network behavior in Kubernetes, before any NetworkPolicy?",
        "options": [
          "All pod-to-pod traffic is allowed on all ports",
          "All pod-to-pod traffic is denied",
          "Pods have no networking",
          "Only control-plane traffic is allowed"
        ],
        "correctIndex": 0,
        "explanation": "By default every pod can reach every other pod on any port, enabling easy lateral movement. A default-deny NetworkPolicy plus explicit allow rules segments the network and limits blast radius (requires a CNI like Calico or Cilium)."
      },
      {
        "question": "Why is a Kubernetes Secret not actually secure by default in etcd?",
        "options": [
          "Because it is stored only base64-encoded, which is encoding, not encryption",
          "Because it is encrypted with a public key everyone has",
          "Because secrets are stored in plaintext ConfigMaps",
          "Because they are printed to pod logs"
        ],
        "correctIndex": 0,
        "explanation": "Secrets are base64-encoded in etcd by default, so anyone who reads etcd or a backup reads them. Encryption at rest (ideally KMS envelope encryption) and external secret stores fix this."
      },
      {
        "question": "What do admission controllers like OPA Gatekeeper and Kyverno provide?",
        "options": [
          "They scan running containers for CPU usage",
          "They evaluate policy-as-code on every create/update request and can deny or mutate non-compliant resources",
          "They encrypt network traffic between nodes",
          "They store secrets in etcd"
        ],
        "correctIndex": 1,
        "explanation": "Admission controllers enforce custom policies at object creation: denying privileged pods, requiring signed images, forbidding dangerous RBAC bindings, and more. They make best practices automatic and auditable."
      },
      {
        "question": "Which per-pod setting prevents an attacker from writing new tools or modifying binaries inside a compromised container?",
        "options": [
          "hostNetwork: true",
          "readOnlyRootFilesystem: true",
          "privileged: true",
          "allowPrivilegeEscalation: true"
        ],
        "correctIndex": 1,
        "explanation": "A read-only root filesystem stops the attacker from dropping tools or altering binaries; needed scratch space comes from an emptyDir. The other options would weaken security, not strengthen it."
      }
    ]
  },
  {
    "topicId": "cloud-m9-7",
    "questions": [
      {
        "question": "How does a compromised pod typically pivot from a Kubernetes cluster to the whole AWS account on EKS?",
        "options": [
          "By editing etcd directly",
          "By reaching the Instance Metadata Service at 169.254.169.254 and stealing the node's IAM role credentials",
          "By restarting the kube-apiserver",
          "By scaling a deployment to zero"
        ],
        "correctIndex": 1,
        "explanation": "Pods can often reach the node's IMDS endpoint, which hands out the EC2 node instance-role credentials. Those are usually broad, so the attacker gains account-wide AWS access."
      },
      {
        "question": "What does enforcing IMDSv2 with a metadata hop limit of 1 achieve on EKS?",
        "options": [
          "It encrypts all pod traffic",
          "It requires a session token (defeating simple GET SSRF) and prevents the metadata response from reaching pods a hop away, blocking node-credential theft from pods",
          "It deletes the node IAM role",
          "It gives every pod cluster-admin"
        ],
        "correctIndex": 1,
        "explanation": "IMDSv2 needs a token via PUT, defeating GET-only SSRF, and a hop limit of 1 stops the response from traversing the extra hop to pods. Node-local processes still work; pods are cut off."
      },
      {
        "question": "What is the correct way to give a pod scoped cloud permissions instead of the shared node role on EKS?",
        "options": [
          "Attach cluster-admin to the pod",
          "Use IRSA (IAM Roles for Service Accounts) to federate the pod's ServiceAccount to its own least-privilege IAM role",
          "Mount the Docker socket",
          "Run the pod with hostNetwork so it can reach AWS"
        ],
        "correctIndex": 1,
        "explanation": "IRSA (or EKS Pod Identity) binds a Kubernetes ServiceAccount to a dedicated least-privilege IAM role via OIDC, giving the pod short-lived scoped credentials and letting you shrink the node role."
      },
      {
        "question": "On GKE, which feature both scopes per-pod cloud access and conceals node metadata from pods?",
        "options": [
          "kube-proxy",
          "Workload Identity (with metadata concealment)",
          "PodSecurityPolicy",
          "Ingress controllers"
        ],
        "correctIndex": 1,
        "explanation": "GKE Workload Identity binds a Kubernetes SA to a Google service account and enables the metadata concealment server, so pods use scoped identities and cannot steal the node's GCE service-account token."
      },
      {
        "question": "Why should the node instance role be kept least-privilege even after blocking pod access to IMDS?",
        "options": [
          "To speed up image pulls",
          "Defense in depth: if the IMDS block ever fails or is bypassed, stolen node credentials grant minimal cloud power",
          "Because the node role controls RBAC",
          "It has no security benefit"
        ],
        "correctIndex": 1,
        "explanation": "Layered defense assumes a control can fail. A tightly scoped node role means that even if a pod does reach IMDS, the credentials it steals are nearly useless, limiting blast radius."
      }
    ]
  },
  {
    "topicId": "cloud-m10-1",
    "questions": [
      {
        "question": "An attacker uses stolen credentials to download 4,000 objects from a sensitive S3 bucket. CloudTrail is enabled with management events only. What will the logs show?",
        "options": [
          "4,000 GetObject events, one per download",
          "Nothing about the object reads — GetObject is a data event, which is off by default",
          "A single summarised 'bulk download' event",
          "Only the first and last GetObject"
        ],
        "correctIndex": 1,
        "explanation": "S3 GetObject is a data-plane (data) event. Data events are off by default and billed separately, so a management-only trail records none of the object reads. You must explicitly enable S3 data events to see them."
      },
      {
        "question": "Which CloudTrail field most directly tells you WHERE an API call came from?",
        "options": [
          "eventName",
          "userAgent",
          "sourceIPAddress",
          "errorCode"
        ],
        "correctIndex": 2,
        "explanation": "sourceIPAddress records the network origin of the call. eventName is the API, userAgent is the tool, and errorCode only appears when a call fails."
      },
      {
        "question": "What does CloudTrail log file validation protect against?",
        "options": [
          "An attacker calling StopLogging",
          "After-the-fact tampering with or deletion of already-delivered log files",
          "Data events being too expensive",
          "Logs being delivered more than 5 minutes late"
        ],
        "correctIndex": 1,
        "explanation": "Log file validation produces signed hourly digest files of SHA-256 hashes, so you can later prove that delivered log files were not altered or removed. Stopping logging is prevented instead by SCPs."
      },
      {
        "question": "Why is an organization trail delivering to a locked bucket in a separate account better than a per-account trail?",
        "options": [
          "It is cheaper because it compresses logs",
          "An attacker who fully compromises a workload account still cannot reach or alter the centralised evidence",
          "It captures data events for free",
          "It makes CloudTrail real-time instead of ~5 minutes delayed"
        ],
        "correctIndex": 1,
        "explanation": "Centralising to a separate, locked log-archive account means the logs live outside the blast radius of a compromised workload account, preserving the evidence even against a full account takeover."
      }
    ]
  },
  {
    "topicId": "cloud-m10-2",
    "questions": [
      {
        "question": "Which GuardDuty finding type directly signals a successful SSRF-to-IMDS credential theft chain?",
        "options": [
          "Recon:IAMUser/NetworkPermissions",
          "CryptoCurrency:EC2/BitcoinTool.B",
          "UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration.OutsideAWS",
          "Policy:S3/BucketPublicAccessGranted"
        ],
        "correctIndex": 2,
        "explanation": "InstanceCredentialExfiltration.OutsideAWS fires when EC2 instance-role credentials are used from outside AWS — the telltale sign that role credentials stolen via SSRF/IMDS are being replayed from an attacker's machine."
      },
      {
        "question": "What is the key difference between GuardDuty and Amazon Detective?",
        "options": [
          "GuardDuty investigates, Detective detects",
          "GuardDuty detects threats and emits findings; Detective builds behaviour graphs to investigate and scope those findings",
          "They are the same service with different names",
          "Detective blocks attacks while GuardDuty only alerts"
        ],
        "correctIndex": 1,
        "explanation": "GuardDuty is the detector that produces findings. Detective consumes those findings and log data to build entity-behaviour graphs so analysts can investigate relationships and scope an incident over time."
      },
      {
        "question": "A business-logic attack uses perfectly valid API calls by an authorized principal to abuse an application feature. Why might GuardDuty miss it?",
        "options": [
          "GuardDuty does not read CloudTrail",
          "The calls look normal and authorized, so there is no anomaly, known-bad IP, or signature to match",
          "GuardDuty only works on S3",
          "GuardDuty blocks all API calls by default"
        ],
        "correctIndex": 1,
        "explanation": "GuardDuty keys on anomalies, threat-intel matches, and known signatures. Legitimate, authorized API calls that abuse application logic have none of those markers, so they fall into a blind spot that requires application-aware detection."
      },
      {
        "question": "Which service would you use to answer 'was the data in the exfiltrated S3 bucket actually sensitive (PII, secrets)?'",
        "options": [
          "Amazon Macie",
          "VPC Flow Logs",
          "AWS Config",
          "GuardDuty Malware Protection"
        ],
        "correctIndex": 0,
        "explanation": "Macie scans and classifies the contents of S3 buckets, identifying PII, credentials, and other sensitive data — exactly the question of whether what was taken actually mattered."
      }
    ]
  },
  {
    "topicId": "cloud-m10-3",
    "questions": [
      {
        "question": "What information is contained in a VPC Flow Log record?",
        "options": [
          "The full contents of each packet",
          "Connection metadata: source/dest IP and port, protocol, byte/packet counts, and ACCEPT/REJECT",
          "The AWS API calls made by the instance",
          "The DNS domains the instance resolved"
        ],
        "correctIndex": 1,
        "explanation": "Flow logs capture connection metadata (the envelope) — IPs, ports, protocol, byte and packet counts, and the accept/reject decision — not packet payloads, API calls, or DNS names."
      },
      {
        "question": "Why does enforcing IMDSv2 defend against many SSRF credential-theft attacks?",
        "options": [
          "It encrypts the metadata service responses",
          "It requires a session token obtained via a PUT request, which simple GET-only SSRF payloads cannot supply",
          "It moves the metadata service to a public IP",
          "It disables the metadata service entirely"
        ],
        "correctIndex": 1,
        "explanation": "IMDSv2 requires the client to first PUT to obtain a session token and then include it on GETs. Most SSRF primitives can only issue a basic GET, so they fail to obtain the token and cannot read the credentials."
      },
      {
        "question": "Which combination is the strongest flow-log signal of data exfiltration?",
        "options": [
          "Low byte count to a known AWS IP",
          "High outbound byte volume to a brand-new, non-allowlisted external destination",
          "Many REJECTed inbound connections",
          "Normal egress during business hours"
        ],
        "correctIndex": 1,
        "explanation": "Exfiltration combines a volume anomaly (large outbound bytes) with a destination anomaly (an IP the environment has never contacted). The pairing of both is far more reliable than either alone."
      },
      {
        "question": "Why centralise VPC Flow Logs and Resolver query logs across accounts?",
        "options": [
          "To make them real-time",
          "To trace cross-account/cross-VPC attacker traffic, apply consistent detections, and keep evidence out of a compromised account's reach",
          "To reduce the number of AWS regions",
          "Because GuardDuty cannot read per-account logs"
        ],
        "correctIndex": 1,
        "explanation": "Centralising enables cross-account tracing and uniform detection logic, and it protects the evidence from tampering by a compromised workload account — the same rationale as centralising CloudTrail."
      }
    ]
  },
  {
    "topicId": "cloud-m10-4",
    "questions": [
      {
        "question": "What is the role of Amazon Athena in a CloudTrail log pipeline?",
        "options": [
          "It delivers CloudTrail events in real time to Lambda",
          "It runs SQL queries directly over CloudTrail JSON stored in S3, for historical investigation, paying per data scanned",
          "It blocks malicious API calls",
          "It is a managed SIEM dashboard"
        ],
        "correctIndex": 1,
        "explanation": "Athena is serverless SQL over data in S3. You define a table over the CloudTrail logs and query API history on demand, paying per query. It is for after-the-fact investigation, not real-time alerting."
      },
      {
        "question": "Which service fires an action within minutes of a matching CloudTrail event arriving, such as StopLogging?",
        "options": [
          "Amazon Athena",
          "Amazon EventBridge with an event-pattern rule and a target",
          "Amazon Macie",
          "AWS Config history"
        ],
        "correctIndex": 1,
        "explanation": "EventBridge matches events against a pattern as they arrive and routes them to targets (SNS, Lambda). Because CloudTrail feeds it in near-real-time, it is the native way to alert or auto-respond to specific API calls promptly."
      },
      {
        "question": "What is the central tradeoff when deciding whether to index logs in a SIEM vs keep them in S3 + Athena?",
        "options": [
          "Encryption vs compression",
          "Cost vs retention vs query speed — hot SIEM is fast but expensive (short window); S3+Athena is cheap with long retention but slower",
          "Real-time vs batch only",
          "There is no tradeoff; SIEMs are always better"
        ],
        "correctIndex": 1,
        "explanation": "A SIEM gives fast, correlated search but is costly, so teams keep a recent window hot there and retain the long tail cheaply in S3, querying it with Athena when needed. The tiering balances cost, retention, and query speed."
      },
      {
        "question": "In a SOAR auto-response that quarantines a compromised EC2 instance, why prefer swapping it to an isolation security group over terminating it?",
        "options": [
          "Termination is more expensive",
          "Isolation is reversible and preserves the instance for forensics, limiting the damage of a false positive while cutting off the attacker",
          "Security groups cannot be changed by Lambda",
          "Termination does not stop the attacker"
        ],
        "correctIndex": 1,
        "explanation": "Isolating with a no-traffic security group cuts the attacker's connectivity while keeping the instance and its memory/disk intact for investigation, and a false positive only causes temporary isolation rather than destroying a healthy workload."
      }
    ]
  },
  {
    "topicId": "cloud-m10-5",
    "questions": [
      {
        "question": "Which set of CloudTrail eventNames best indicates IAM privilege escalation?",
        "options": [
          "GetObject, PutObject, DeleteObject",
          "AttachUserPolicy, UpdateAssumeRolePolicy, CreateAccessKey (especially targeting privileged principals)",
          "DescribeInstances, DescribeSecurityGroups",
          "GetCallerIdentity, ListBuckets"
        ],
        "correctIndex": 1,
        "explanation": "Attaching powerful policies, rewriting trust policies, and minting access keys are the signature escalation/persistence actions. Detection is tightest when these target sensitive principals or come from an unexpected actor."
      },
      {
        "question": "What underlying rule lets you detect stolen EC2 instance-role credentials being replayed?",
        "options": [
          "Instance-role credentials should only be used from inside AWS, so any use from a non-AWS source IP is suspicious",
          "EC2 roles never make API calls",
          "Only root can use instance-role credentials",
          "Instance roles rotate every second"
        ],
        "correctIndex": 0,
        "explanation": "Credentials bound to an EC2 instance role should only ever originate from inside AWS. Seeing those credentials in CloudTrail events from an external source IP means they have been exfiltrated and replayed — the basis of both your rule and GuardDuty's InstanceCredentialExfiltration.OutsideAWS."
      },
      {
        "question": "Why is detecting mass GetSecretValue a rate-based rule rather than a per-call rule?",
        "options": [
          "GetSecretValue is always malicious",
          "No single GetSecretValue is suspicious; it is the high volume by one principal in a short window that signals bulk credential theft",
          "GetSecretValue is a data event that cannot be logged",
          "Secrets Manager blocks more than one read per minute"
        ],
        "correctIndex": 1,
        "explanation": "Applications legitimately read secrets, so one call is normal. Exfiltration shows up as an abnormal volume of reads by a single principal over a short period, which is why you count and threshold rather than alert on each call."
      },
      {
        "question": "What is the purpose of mapping detections to MITRE ATT&CK and writing them in Sigma?",
        "options": [
          "To make them run faster",
          "ATT&CK mapping measures detection coverage against a shared taxonomy, and Sigma makes rules portable and version-controllable across SIEMs",
          "To encrypt the detection logic",
          "Both are required by AWS to enable CloudTrail"
        ],
        "correctIndex": 1,
        "explanation": "Tagging rules with ATT&CK technique IDs turns a rule set into measurable coverage you can report on, and Sigma's vendor-neutral YAML lets you write a rule once and convert it to multiple query languages, keeping detections portable."
      }
    ]
  },
  {
    "topicId": "cloud-m10-6",
    "questions": [
      {
        "question": "Why does disabling an IAM role not, by itself, stop an attacker already using credentials from that role?",
        "options": [
          "Roles cannot be disabled",
          "Temporary credentials already issued keep working until they expire; you must explicitly revoke existing sessions (e.g. a DenyAllBefore/TokenIssueTime policy)",
          "The attacker becomes root",
          "Disabling a role deletes CloudTrail"
        ],
        "correctIndex": 1,
        "explanation": "Role credentials are temporary tokens already handed out. Changes to the role don't retroactively kill issued sessions, so you attach a policy denying actions for sessions issued before a cutoff time (TokenIssueTime) to revoke them immediately."
      },
      {
        "question": "What is the correct order of the cloud IR lifecycle phases?",
        "options": [
          "Investigate, recover, contain, eradicate",
          "Contain, preserve/investigate, eradicate, recover",
          "Eradicate, contain, recover, investigate",
          "Recover, contain, investigate, eradicate"
        ],
        "correctIndex": 1,
        "explanation": "You contain first to stop the bleeding, preserve evidence and investigate to scope the damage, eradicate the attacker's footholds, then recover and harden. Containment precedes full investigation precisely because stopping the attack can't wait."
      },
      {
        "question": "During eradication, why rotate ALL secrets the compromised principal could reach, not just the one known to be leaked?",
        "options": [
          "AWS requires rotating all secrets monthly",
          "Under the 'assume full compromise' rule, any secret the principal could read may have been taken; rotating only the known one leaves the attacker a way back in",
          "Rotating one secret automatically rotates the rest",
          "It is cheaper to rotate everything"
        ],
        "correctIndex": 1,
        "explanation": "You rarely know with certainty exactly what an attacker exfiltrated. The safe assumption is that everything the compromised credential could access is exposed, so you rotate all reachable secrets to eliminate residual footholds."
      },
      {
        "question": "Which tool gives you the authoritative, exact list of 'what did this compromised credential do and when' for scoping?",
        "options": [
          "GuardDuty findings alone",
          "Athena querying CloudTrail for all actions by that principal over the retention window",
          "VPC Flow Logs only",
          "The EC2 console"
        ],
        "correctIndex": 1,
        "explanation": "CloudTrail is the record of every API action by the principal, and Athena lets you query the full history precisely. Detective helps visualise the shape, but Athena over CloudTrail gives the exact, authoritative scope that drives rotation and disclosure decisions."
      }
    ]
  },
  {
    "topicId": "cloud-m11-1",
    "questions": [
      {
        "question": "In cloud environments, lateral movement most often means:",
        "options": [
          "Scanning the internal network for open ports and popping shells host to host",
          "Assuming roles and calling APIs to move identity-to-identity and service-to-service",
          "Physically moving between data centres",
          "Rotating encryption keys across regions"
        ],
        "correctIndex": 1,
        "explanation": "The cloud control plane is an API. Attackers move by assuming roles and calling services, not by host-to-host network pivoting as in traditional on-prem intrusions."
      },
      {
        "question": "Which framework provides the standard tactic/technique IDs used to describe cloud attacker behaviour?",
        "options": [
          "OWASP LLM Top 10",
          "MITRE ATT&CK for IaaS",
          "CIS AWS Foundations Benchmark",
          "NIST AI RMF"
        ],
        "correctIndex": 1,
        "explanation": "MITRE ATT&CK for IaaS catalogues cloud tactics (goals) and techniques (methods). CIS is a hardening benchmark and the others are unrelated to cloud attacker TTPs."
      },
      {
        "question": "Why is removing iam:PassRole and broad AssumeRole considered high-leverage defence?",
        "options": [
          "It encrypts all data at rest automatically",
          "It collapses many privilege-escalation and lateral-movement paths at a single choke point",
          "It is required by law in every jurisdiction",
          "It prevents all initial access entirely"
        ],
        "correctIndex": 1,
        "explanation": "PassRole and broad AssumeRole are shared edges that many attack paths route through. Cutting them breaks escalation and lateral movement simultaneously, far more efficient than fixing findings one by one."
      },
      {
        "question": "What is 'dwell time' from the defender's perspective?",
        "options": [
          "How long a VM takes to boot",
          "How long an attacker operates in the environment before being detected",
          "The TTL on a DNS record",
          "The latency of an API call"
        ],
        "correctIndex": 1,
        "explanation": "Dwell time is the window between compromise and detection. The kill-chain model helps defenders place controls that shorten it at each stage."
      }
    ]
  },
  {
    "topicId": "cloud-m11-2",
    "questions": [
      {
        "question": "A role trust policy uses Principal \"arn:aws:iam::111122223333:root\". The safest reading is:",
        "options": [
          "Only the literal root user may assume it",
          "The entire account 111122223333 is trusted, so any suitably-permitted principal there can assume it",
          "The role cannot be assumed at all",
          "Only EC2 instances in that account"
        ],
        "correctIndex": 1,
        "explanation": "\":root\" delegates trust to the whole account's IAM, not the root user. Any principal in that account allowed sts:AssumeRole can assume the role."
      },
      {
        "question": "Which crossing leaves NO sts:AssumeRole event in CloudTrail?",
        "options": [
          "Assuming OrganizationAccountAccessRole",
          "A permissive S3 bucket or KMS key policy that names an external account",
          "Assuming a cross-account admin role",
          "Using the management account to access a member"
        ],
        "correctIndex": 1,
        "explanation": "Resource-policy crossings (S3, KMS, SNS) are honoured when you call the resource directly from your own account. No role is assumed, which is why they are easy to miss in audits."
      },
      {
        "question": "What does the sts:ExternalId condition primarily defend against?",
        "options": [
          "Weak encryption of data at rest",
          "The confused-deputy problem with third-party vendor roles",
          "Denial-of-wallet from excessive API calls",
          "Public S3 buckets"
        ],
        "correctIndex": 1,
        "explanation": "ExternalId is a shared secret a third party must supply when assuming your role, preventing one of the vendor's other customers (or an attacker) from assuming your role via the vendor, the classic confused deputy."
      },
      {
        "question": "Which native AWS tool continuously reports resources shared outside your account or organization?",
        "options": [
          "IAM Access Analyzer (external findings)",
          "CloudFront",
          "AWS Shield",
          "Route 53"
        ],
        "correctIndex": 0,
        "explanation": "IAM Access Analyzer evaluates resource and trust policies and surfaces external-access findings continuously, the first place to look for unintended cross-account exposure."
      },
      {
        "question": "Why is the Organizations management account the highest-value target?",
        "options": [
          "It stores all the customer data",
          "It can often reach every member account (e.g. via OrganizationAccountAccessRole) and controls org-wide SCP guardrails",
          "It is the only account with internet access",
          "It holds the DNS zones"
        ],
        "correctIndex": 1,
        "explanation": "The management account typically has a trusted admin role in each member account and defines the SCPs for the whole org. Compromising it often means compromising the entire organization."
      }
    ]
  },
  {
    "topicId": "cloud-m11-3",
    "questions": [
      {
        "question": "What makes IMDSv1 especially dangerous in the presence of SSRF?",
        "options": [
          "It stores credentials in plaintext files on disk",
          "It answers a plain GET to 169.254.169.254 and returns role credentials, which SSRF can trigger",
          "It requires a password that is easily guessed",
          "It exposes the instance over the public internet"
        ],
        "correctIndex": 1,
        "explanation": "IMDSv1 responds to any GET request. An SSRF that forces the app to GET the metadata credentials path returns live role credentials. IMDSv2 requires a token obtained via PUT, which most SSRF cannot do."
      },
      {
        "question": "Which permission pairing is a classic cross-service privilege-escalation primitive?",
        "options": [
          "s3:GetObject + s3:ListBucket",
          "iam:PassRole + lambda:CreateFunction (or similar create/invoke)",
          "ec2:DescribeInstances + ec2:DescribeTags",
          "cloudwatch:GetMetricData + logs:FilterLogEvents"
        ],
        "correctIndex": 1,
        "explanation": "PassRole lets a weak identity attach a powerful role to compute it creates (Lambda, Glue, EC2). Combined with a create/invoke permission, the attacker runs code as the powerful role. The other pairings are read-only."
      },
      {
        "question": "ssm:SendCommand (Run Command) lets an attacker:",
        "options": [
          "Only read instance tags",
          "Execute commands (often as root/SYSTEM) on instances running the SSM agent, with no SSH or open port needed",
          "Rotate KMS keys",
          "Create new AWS accounts"
        ],
        "correctIndex": 1,
        "explanation": "SSM Run Command executes shell commands on managed instances through the AWS API, bypassing security groups and SSH entirely, a powerful host-level pivot."
      },
      {
        "question": "The single most effective hardening against metadata credential theft is:",
        "options": [
          "Disable CloudTrail to avoid logging",
          "Enforce IMDSv2 (HttpTokens=required) and set the metadata hop limit to 1",
          "Use a longer instance name",
          "Put the instance in a public subnet"
        ],
        "correctIndex": 1,
        "explanation": "Requiring IMDSv2 forces a PUT-obtained token on every metadata request, defeating typical SSRF, and a hop limit of 1 stops containers from reaching the host metadata service."
      },
      {
        "question": "Why should iam:PassRole never use Resource \"*\"?",
        "options": [
          "It makes API calls slower",
          "It lets the identity pass ANY role to a service, including powerful roles, enabling escalation",
          "It is a billing problem only",
          "Wildcards are not valid in IAM"
        ],
        "correctIndex": 1,
        "explanation": "PassRole on \"*\" means the principal can hand any role (including admin) to compute it controls. Scoping PassRole to specific role ARNs with iam:PassedToService conditions removes the escalation edge."
      }
    ]
  },
  {
    "topicId": "cloud-m11-4",
    "questions": [
      {
        "question": "Why is a backdoor IAM role better persistence than keeping the original leaked access key?",
        "options": [
          "Roles are cheaper to run",
          "A separate principal survives password resets and key rotations of the original identity",
          "Roles cannot be logged by CloudTrail",
          "Roles bypass MFA automatically"
        ],
        "correctIndex": 1,
        "explanation": "A backdoor role is an independent principal, so rotating or deleting the original key does not remove it. It must be found and deleted on its own, which is why it is more durable."
      },
      {
        "question": "'Self-healing' cloud persistence typically relies on:",
        "options": [
          "A cron job on a single EC2 host",
          "An EventBridge rule invoking a Lambda that recreates the backdoor",
          "A browser extension",
          "A hardcoded password in the system prompt"
        ],
        "correctIndex": 1,
        "explanation": "EventBridge (on a schedule or watching for deletion events) invokes a Lambda that re-creates the attacker's access, so deleting the credential alone does not evict them."
      },
      {
        "question": "Creating a GuardDuty suppression rule as persistence is an example of which ATT&CK tactic?",
        "options": [
          "Impair Defenses (T1562)",
          "Initial Access",
          "Exfiltration",
          "Reconnaissance"
        ],
        "correctIndex": 0,
        "explanation": "Suppressing or disabling detection quietly blinds the defender so future malicious activity is auto-archived, the hallmark of Impair Defenses."
      },
      {
        "question": "Why is poisoning the Terraform/CloudFormation repo especially durable persistence?",
        "options": [
          "IaC files are encrypted and unreadable",
          "The organization's own CI/CD redeploys the backdoor as 'intended' infrastructure, surviving even full rebuilds",
          "It disables the AWS API",
          "It only affects the dev account"
        ],
        "correctIndex": 1,
        "explanation": "Once malicious resources are merged into IaC, the pipeline re-creates them on every apply. A rebuild does not remove the backdoor, it reinstalls it, so the IaC repo and CI roles must be protected like crown jewels."
      },
      {
        "question": "The core threat-hunting technique for cloud persistence is:",
        "options": [
          "Running a port scan of the VPC",
          "Comparing current configuration against a known-good baseline and alerting on drift (Config, Access Analyzer, CloudTrail baselines)",
          "Rebooting all instances nightly",
          "Rotating the root password weekly"
        ],
        "correctIndex": 1,
        "explanation": "Persistence hides as config. Diffing current IAM/SCP/trail/Lambda state against a baseline (via AWS Config, Access Analyzer and CloudTrail event baselines) surfaces the new roles, loosened policies and disabled logging that persistence leaves behind."
      }
    ]
  },
  {
    "topicId": "cloud-m11-5",
    "questions": [
      {
        "question": "Why do attackers often grab Secrets Manager / Parameter Store contents before bulk data?",
        "options": [
          "Secrets are the largest objects and fill the exfil quota",
          "One secret (DB password, API key) can unlock far more than exfiltrating a huge dataset directly",
          "Secrets are never logged",
          "Secrets cannot be encrypted"
        ],
        "correctIndex": 1,
        "explanation": "Secrets are leverage: a single DB master password or live API key often grants access to everything else, cheaper and quieter than exfiltrating terabytes."
      },
      {
        "question": "Sharing an EBS/RDS snapshot with a specific external account (vs making it public) is preferred by stealthy attackers because:",
        "options": [
          "It is faster to download",
          "It avoids 'public resource' detections (Access Analyzer/GuardDuty) while still handing over a full copy",
          "It encrypts the data for them",
          "Public snapshots cost more money"
        ],
        "correctIndex": 1,
        "explanation": "A snapshot shared to one account does not trigger public-exposure findings, yet the attacker can restore it in their account. Public snapshots are loud and caught quickly."
      },
      {
        "question": "What is true about S3 pre-signed URLs as an exfil channel?",
        "options": [
          "They require the downloader to have AWS credentials",
          "They let anyone with the link download a private object for a limited time, appearing as a normal authorised GET",
          "They only work inside the VPC",
          "They cannot be generated from the CLI"
        ],
        "correctIndex": 1,
        "explanation": "A pre-signed URL embeds a temporary signature, so no AWS credentials are needed to fetch it. The request looks like an ordinary authorised GET, which is why CloudTrail S3 data events are needed to catch it."
      },
      {
        "question": "Which AWS service continuously discovers and classifies sensitive data (like PII) in S3?",
        "options": [
          "Amazon Macie",
          "Amazon Inspector",
          "AWS Shield",
          "Amazon Cognito"
        ],
        "correctIndex": 0,
        "explanation": "Macie is AWS's data-classification/DLP service for S3, helping defenders find crown-jewel data and detect anomalous access before an attacker exfiltrates it."
      },
      {
        "question": "Why do CloudTrail S3 data events matter for detecting exfiltration?",
        "options": [
          "They are the only way to enable encryption",
          "Object-level GetObject/PutObject are not logged by default, so without data events pre-signed-URL and bulk-download exfil is invisible",
          "They block public buckets automatically",
          "They reduce storage costs"
        ],
        "correctIndex": 1,
        "explanation": "CloudTrail management events do not record object reads. Enabling S3 data events is what makes pull-style exfiltration (GetObject at scale, pre-signed downloads) visible to detection."
      }
    ]
  },
  {
    "topicId": "cloud-m11-6",
    "questions": [
      {
        "question": "In an IAM attack graph, a 'choke point' is:",
        "options": [
          "The slowest API endpoint",
          "An edge (permission/trust) that many attack paths route through, so cutting it collapses many paths at once",
          "The account with the most users",
          "A network firewall rule"
        ],
        "correctIndex": 1,
        "explanation": "A choke point is a shared edge, like a broad PassRole, that appears in many paths to crown jewels. Removing it eliminates many routes simultaneously, maximising risk reduction per change."
      },
      {
        "question": "Which open-source tool builds an IAM privilege graph and answers 'can principal X escalate/reach Y?'",
        "options": [
          "Prowler",
          "PMapper (Principal Mapper)",
          "Terraform",
          "CloudFront"
        ],
        "correctIndex": 1,
        "explanation": "PMapper models IAM principals and escalation edges into a directed graph and supports privesc/path queries. Prowler is a CSPM scanner, not a path-graphing tool."
      },
      {
        "question": "Why is prioritising by path-count reduction better than by finding count?",
        "options": [
          "It produces a longer report",
          "Cutting a single shared edge can remove many attack paths, giving measurable risk reduction rather than fixing isolated low-impact findings",
          "Finding count is illegal to report",
          "Path count is always smaller so it looks better"
        ],
        "correctIndex": 1,
        "explanation": "Findings are disconnected; paths show how risk actually chains. Removing one choke-point edge can collapse dozens of paths, far more impactful than closing many unconnected findings."
      },
      {
        "question": "Cartography differs from PMapper mainly in that it:",
        "options": [
          "Only works on Azure",
          "Ingests cloud assets into a Neo4j graph DB for broad Cypher queries across IAM, EC2, S3, VPC and more",
          "Cannot model relationships",
          "Is a commercial-only product"
        ],
        "correctIndex": 1,
        "explanation": "Cartography (Lyft) loads multiple asset types into Neo4j so you can query relationships across the whole estate with Cypher, broader than PMapper's IAM-focused privilege graph."
      },
      {
        "question": "Which permission is a classic high-value choke point to recommend scoping down?",
        "options": [
          "cloudwatch:GetMetricData",
          "iam:PassRole on Resource \"*\"",
          "s3:ListAllMyBuckets",
          "ec2:DescribeRegions"
        ],
        "correctIndex": 1,
        "explanation": "PassRole on \"*\" feeds nearly every compute-based escalation path. Scoping it to specific role ARNs is a single edge cut that collapses many paths; the other read-only permissions are not escalation edges."
      }
    ]
  },
  {
    "topicId": "cloud-m11-7",
    "questions": [
      {
        "question": "What is the one non-negotiable prerequisite before any cloud red-team activity?",
        "options": [
          "A fast internet connection",
          "Written authorisation from an empowered party, with explicit scope",
          "A commercial CNAPP licence",
          "Approval from the cloud provider's marketing team"
        ],
        "correctIndex": 1,
        "explanation": "Written authorisation with defined scope is the legal and ethical foundation. Without it, the same actions are unauthorised access, regardless of intent or skill."
      },
      {
        "question": "A path leads into another company's SaaS tenant that is not in scope. The correct action is to:",
        "options": [
          "Exploit it to demonstrate maximum impact",
          "Stop at the boundary and document the path as a finding without crossing it",
          "Ask the blue team for permission verbally and proceed",
          "Ignore it entirely and delete your notes"
        ],
        "correctIndex": 1,
        "explanation": "Authorisation covers only in-scope assets. The path is reported (it shows blast radius) but never traversed into an out-of-scope third party, which would be illegal unauthorised access."
      },
      {
        "question": "'Deconfliction' during an engagement refers to:",
        "options": [
          "Resolving merge conflicts in Terraform",
          "A process letting the blue team verify whether suspicious activity is the red team or a real attacker",
          "Compressing exfiltrated data",
          "Rotating encryption keys"
        ],
        "correctIndex": 1,
        "explanation": "Deconfliction lets defenders attribute alerts to the authorised test, so they do not burn resources chasing simulated activity, and so a genuine intrusion mixed in is not dismissed."
      },
      {
        "question": "How should a red-teamer prove access to a sensitive customer database?",
        "options": [
          "Download the full database and keep it as evidence",
          "Capture minimal proof: a masked sample and record count (or hash/screenshot), never a full copy, and delete it after sign-off",
          "Publish a sample publicly to prove it",
          "Reuse the database credentials for other targets"
        ],
        "correctIndex": 1,
        "explanation": "Prove impact without becoming the breach: minimal, redacted evidence, stored securely and deleted after the report is accepted. Never exfiltrate real user data beyond genuine PoC need."
      },
      {
        "question": "What makes purple-teaming a valuable close to a red-team engagement?",
        "options": [
          "It lets the red team keep its techniques secret",
          "The red and blue teams replay each stage so defenders confirm which detections fired and tune the ones that missed",
          "It doubles the number of findings",
          "It removes the need for a written report"
        ],
        "correctIndex": 1,
        "explanation": "Purple-teaming turns findings into improved detection coverage by validating and tuning the blue team's alerts against each attack stage, the lasting defensive value of the engagement."
      }
    ]
  },
  {
    "topicId": "cloud-m12-1",
    "questions": [
      {
        "question": "What does a CSPM tool primarily evaluate?",
        "options": [
          "The CPU and memory usage of running workloads",
          "Cloud resource configuration against best-practice/benchmark rules",
          "The source code of applications for injection bugs",
          "Network packet payloads in real time"
        ],
        "correctIndex": 1,
        "explanation": "CSPM reads cloud configuration (buckets, security groups, IAM, logging settings) and compares it to a rule set such as the CIS Benchmark. It is a configuration auditor, not a runtime, code, or packet scanner."
      },
      {
        "question": "A Prowler scan returns 3,000 findings. What is the best triage approach?",
        "options": [
          "Fix them strictly in the order they appear",
          "Fix the lowest-severity ones first because there are more of them",
          "Prioritise by exploitability and blast radius, fixing internet-reachable, high-impact issues first",
          "Ignore all findings until a pentest confirms each one"
        ],
        "correctIndex": 2,
        "explanation": "Raw count is a poor guide. Rank by whether an attacker can reach the resource, what they gain, and how far it spreads. A handful of internet-exposed, high-impact findings outrank hundreds of cosmetic ones."
      },
      {
        "question": "Which option is the AWS-native, always-on CSPM capability?",
        "options": [
          "ScoutSuite",
          "Prowler",
          "AWS Security Hub with AWS Config rules",
          "Cloud Custodian"
        ],
        "correctIndex": 2,
        "explanation": "Security Hub aggregates standards (CIS, AWS Foundational) and Config continuously records and evaluates resource state. Together they are the native, continuously-running CSPM, with no server for you to operate."
      },
      {
        "question": "How are hundreds of accounts scanned efficiently with open-source tooling?",
        "options": [
          "Log into each account manually and run the tool",
          "A central security account assumes a standard read-only cross-account role in every member account via AWS Organizations",
          "Give every developer the scanner to run ad hoc",
          "Only scan the management account, which covers all others automatically"
        ],
        "correctIndex": 1,
        "explanation": "Using Organizations and delegated admin, a central account assumes a standardized audit role (e.g. SecurityAudit) in each member account, enabling one estate-wide scan. Security Hub automates the native version of this."
      },
      {
        "question": "What does a CNAPP add on top of basic CSPM?",
        "options": [
          "It replaces the need for IAM entirely",
          "It correlates misconfiguration with vulnerabilities, exposure and sensitive data to surface prioritised attack paths",
          "It only works on a single cloud and single account",
          "It runs the workloads for you"
        ],
        "correctIndex": 1,
        "explanation": "CNAPP platforms (Wiz, Prisma Cloud, Defender for Cloud) add context, combining config issues with CVEs, network reachability and data sensitivity to highlight 'toxic combinations' as attack paths across clouds."
      }
    ]
  },
  {
    "topicId": "cloud-m12-2",
    "questions": [
      {
        "question": "What is the CIS AWS Foundations Benchmark?",
        "options": [
          "A paid AWS service that blocks misconfigurations",
          "A consensus checklist of specific hardening controls for AWS, grouped into areas like IAM, logging, monitoring and networking",
          "A machine-learning model that predicts breaches",
          "An AWS region dedicated to compliance"
        ],
        "correctIndex": 1,
        "explanation": "The CIS Benchmark is a published, consensus-built set of numbered hardening controls, each with an audit procedure and remediation, organized into sections such as IAM, Logging, Monitoring and Networking."
      },
      {
        "question": "Why does CIS require MFA on the root account specifically?",
        "options": [
          "Root is the only user that can use the console",
          "Root cannot be restricted by IAM policy, so MFA is a critical compensating control for its unlimited power",
          "AWS charges extra without it",
          "Root automatically expires without MFA"
        ],
        "correctIndex": 1,
        "explanation": "The root user has unrestricted access that IAM policies cannot limit. MFA is therefore essential: it is the main barrier protecting the most powerful identity in the account."
      },
      {
        "question": "What is the purpose of an AWS Config conformance pack aligned to CIS?",
        "options": [
          "To run a single scan and then stop",
          "To continuously evaluate resources against a bundle of benchmark-mapped rules, flagging drift as it happens",
          "To delete non-compliant resources automatically",
          "To replace CloudTrail"
        ],
        "correctIndex": 1,
        "explanation": "A conformance pack bundles Config rules matching a benchmark and evaluates resources continuously, marking them COMPLIANT or NON_COMPLIANT as the environment changes, turning the checklist into a live signal."
      },
      {
        "question": "A failing control cannot be fixed because a legacy system needs the setting. What is the correct response?",
        "options": [
          "Silently ignore it so the score looks better",
          "Delete the legacy system immediately regardless of impact",
          "Record a documented exception with the reason, owner, compensating controls and a review date",
          "Turn off CIS checking entirely"
        ],
        "correctIndex": 2,
        "explanation": "When remediation is infeasible, a documented risk acceptance (exception) with reason, owner, compensating controls and review date keeps the posture honest and auditable, unlike silently ignoring the failure."
      },
      {
        "question": "What is 'benchmark drift'?",
        "options": [
          "The benchmark changing its control numbers each year",
          "The gradual slide back toward insecure configuration as people make changes after a clean baseline",
          "Moving resources between AWS regions",
          "A scanner producing random results"
        ],
        "correctIndex": 1,
        "explanation": "Drift is the slow regression away from a compliant baseline as everyday changes reintroduce misconfigurations. Tracking the compliance score over time makes drift visible and points to which controls regressed."
      }
    ]
  },
  {
    "topicId": "cloud-m12-3",
    "questions": [
      {
        "question": "What is the relationship between a technical control and a framework requirement?",
        "options": [
          "They are identical and interchangeable",
          "A framework states an abstract requirement; a technical control is the concrete implementation that satisfies it, backed by evidence",
          "Frameworks replace the need for technical controls",
          "Technical controls only matter for PCI-DSS"
        ],
        "correctIndex": 1,
        "explanation": "Frameworks are written in abstract audit language (e.g. 'log all access'). You map each requirement to the concrete cloud control that implements it (e.g. CloudTrail multi-region) plus the evidence that proves it."
      },
      {
        "question": "Why is mapping one control to many frameworks valuable?",
        "options": [
          "It lets you skip implementing the control",
          "A single control (e.g. encryption at rest) can satisfy matching requirements across PCI, SOC 2, NIST and ISO at once, avoiding duplicate work",
          "It makes each framework legally weaker",
          "It is required by AWS billing"
        ],
        "correctIndex": 1,
        "explanation": "One well-implemented control often answers equivalent clauses in several frameworks. Implementing it once and referencing it against each framework avoids doing the same work repeatedly."
      },
      {
        "question": "Under the shared responsibility model, which statement is correct for compliance?",
        "options": [
          "Running on AWS automatically makes you PCI-DSS compliant",
          "AWS is responsible for all controls once you sign up",
          "AWS attests to the infrastructure layer, but the customer must still meet the customer-responsibility controls in their own configuration",
          "The customer is responsible for the physical data center security"
        ],
        "correctIndex": 2,
        "explanation": "AWS covers security OF the cloud and provides attestations, but the customer is responsible for security IN the cloud, their IAM, encryption, networking and logging, which is what the auditor assesses."
      },
      {
        "question": "What does AWS Audit Manager do?",
        "options": [
          "Automatically fixes every non-compliant resource",
          "Continuously collects evidence from services like Config and CloudTrail and maps it to a chosen framework's controls",
          "Replaces the external auditor",
          "Blocks all deployments until compliant"
        ],
        "correctIndex": 1,
        "explanation": "Audit Manager automates evidence collection against prebuilt frameworks (PCI, SOC 2, CIS, etc.), pulling current data from Config, CloudTrail and Security Hub so the evidence package stays up to date."
      },
      {
        "question": "What distinguishes continuous compliance from a point-in-time audit?",
        "options": [
          "Continuous compliance only runs once a year",
          "Continuous compliance keeps evidence current and catches drift early, rather than proving a single moment then going stale",
          "Point-in-time audits never go stale",
          "They are the same thing"
        ],
        "correctIndex": 1,
        "explanation": "A point-in-time audit proves compliance for one moment and the evidence is stale immediately after. Continuous compliance (via Config and Audit Manager) keeps evidence current and surfaces drift between formal audits."
      }
    ]
  },
  {
    "topicId": "cloud-m12-4",
    "questions": [
      {
        "question": "What is the key difference between a detective and a preventative control?",
        "options": [
          "Detective controls are always better",
          "A detective control finds misconfiguration after it exists; a preventative control stops the bad state from being created at all",
          "Preventative controls only work in test environments",
          "There is no practical difference"
        ],
        "correctIndex": 1,
        "explanation": "Detective controls (CSPM, Config) report a problem after creation, leaving an exposure window and triage work. Preventative controls (SCPs, policy-as-code in CI) block the bad configuration up front, scaling without triage."
      },
      {
        "question": "How do SCPs interact with IAM policies?",
        "options": [
          "IAM policies override SCPs",
          "An action must be allowed by both the SCP and the IAM policy; an SCP deny cannot be granted back, even for root",
          "SCPs only apply to new accounts",
          "SCPs grant permissions that IAM then restricts"
        ],
        "correctIndex": 1,
        "explanation": "SCPs set the permission ceiling for an account. The effective permission is the intersection of SCP and IAM. If an SCP denies an action, no IAM policy can re-enable it, and root is bound too."
      },
      {
        "question": "What does running Checkov or OPA/Conftest against Terraform in CI achieve?",
        "options": [
          "It scans running cloud resources only",
          "It catches insecure Infrastructure-as-Code before deployment, failing the pull request so the misconfiguration never reaches the cloud",
          "It automatically fixes production drift",
          "It replaces the need for IAM"
        ],
        "correctIndex": 1,
        "explanation": "Policy-as-code scans IaC pre-deploy. A plan declaring, say, a public bucket fails the check and the build/PR is blocked. This 'shift-left' stops misconfiguration at the cheapest point, before it exists."
      },
      {
        "question": "What makes Cloud Custodian different from a pure detection tool?",
        "options": [
          "It only produces reports",
          "It can both match a bad state and take an automated action (remove ACL, tag, notify), often event-driven",
          "It runs exclusively in CI pipelines",
          "It can only scan Terraform"
        ],
        "correctIndex": 1,
        "explanation": "Cloud Custodian is a policy engine that detects AND acts. A policy can match public buckets and automatically remediate them, serving as a runtime enforcement layer between detection and hard SCP prevention."
      },
      {
        "question": "Why do preventative guardrails scale better than detection alone?",
        "options": [
          "They require one engineer per finding",
          "One policy protects the entire current and future estate without per-issue triage, whereas detection needs a human to triage every finding",
          "They never need to be written",
          "They work only on a single account"
        ],
        "correctIndex": 1,
        "explanation": "Detection scales with headcount, someone must triage each finding. A single preventative guardrail (an SCP or CI policy) silently blocks the mistake for every team indefinitely, so the same misconfiguration stops recurring."
      }
    ]
  },
  {
    "topicId": "cloud-m12-5",
    "questions": [
      {
        "question": "What is the core idea of a secure landing zone?",
        "options": [
          "A single large account with every workload inside it",
          "A pre-built, secure-by-default foundation that every new account inherits, making the secure path the default path",
          "A tool that scans for misconfigurations after deployment",
          "A compliance report template"
        ],
        "correctIndex": 1,
        "explanation": "A landing zone provides accounts that already have logging, guardrails, detection and identity baselines switched on, so teams start secure by default rather than configuring safety from scratch."
      },
      {
        "question": "Why do landing zones use many accounts organized into OUs rather than one big account?",
        "options": [
          "To increase the AWS bill intentionally",
          "Account-per-workload isolation contains blast radius, so a breach in one account cannot easily reach others, and OUs let guardrails be inherited",
          "Because single accounts cannot run CloudTrail",
          "Multiple accounts are required for every region"
        ],
        "correctIndex": 1,
        "explanation": "Separating workloads into their own accounts limits blast radius, a compromise is contained. Organizing accounts into OUs lets baseline SCPs and controls be inherited automatically by every account in the OU."
      },
      {
        "question": "What is the role of a central Log Archive account?",
        "options": [
          "To run all production workloads",
          "To store CloudTrail and Config logs centrally and immutably, separate from the workload accounts that generate them",
          "To hold all IAM users",
          "To serve as the only account with internet access"
        ],
        "correctIndex": 1,
        "explanation": "A dedicated Log Archive account centralizes audit logs immutably and away from the accounts that produce them, so an attacker who compromises a workload account cannot tamper with the evidence."
      },
      {
        "question": "What does AWS Control Tower's Account Factory provide?",
        "options": [
          "A way to manually harden each account one setting at a time",
          "Automated provisioning of new accounts with the baseline (CloudTrail, Config, central logging, inherited SCPs) already applied",
          "A replacement for IAM roles",
          "Nothing related to security"
        ],
        "correctIndex": 1,
        "explanation": "Account Factory provisions new accounts that automatically receive the landing-zone baseline, logging, Config, central log shipping and inherited guardrails, so an engineer gets a secure account without manual hardening."
      },
      {
        "question": "What is the purpose of 'golden-path' templates?",
        "options": [
          "To document which attacks are allowed",
          "To give teams pre-approved, pre-hardened building blocks so the easy, documented way to build is already secure",
          "To bypass all guardrails for speed",
          "To replace Terraform with manual console work"
        ],
        "correctIndex": 1,
        "explanation": "Golden paths are secure, reusable modules. When the simplest documented way to build is already hardened, teams rarely need to construct insecure alternatives, making the secure path the easy path."
      }
    ]
  },
  {
    "topicId": "cloud-m12-6",
    "questions": [
      {
        "question": "In the capstone, why is attack-path analysis needed on top of a flat CSPM finding list?",
        "options": [
          "Because CSPM tools do not find any misconfigurations",
          "Because the real risk is often a chain of findings across accounts (e.g. SSRF to instance role to cross-account admin), not any single finding in isolation",
          "Because attack paths replace the need to remediate",
          "Because it reduces the number of accounts to scan"
        ],
        "correctIndex": 1,
        "explanation": "A flat list misses how an attacker chains issues together. Attack-path analysis reveals that a public app plus an over-broad role plus a cross-account trust combine into a route to the crown jewels, which is the risk worth fixing first."
      },
      {
        "question": "How should the thousands of findings in the broken estate be prioritised?",
        "options": [
          "Strictly alphabetically by resource name",
          "By raw count, fixing whichever category has the most findings",
          "By exploitability and blast radius, tackling internet-reachable, high-impact, wide-reaching risks first",
          "By how recently each resource was created"
        ],
        "correctIndex": 2,
        "explanation": "Judgement, not volume, is the goal. Rank by whether an attacker can reach it and how far compromise spreads. A handful of exploitable, high-blast-radius paths outrank hundreds of cosmetic findings."
      },
      {
        "question": "What should accompany each remediation to change the estate's trajectory?",
        "options": [
          "Deleting the affected account",
          "A preventative guardrail (SCP or policy-as-code) that blocks the same misconfiguration org-wide so it cannot recur",
          "Turning off detection to reduce noise",
          "A note in a spreadsheet and nothing else"
        ],
        "correctIndex": 1,
        "explanation": "Remediation fixes today's instance; without prevention the problem returns. Pairing each fix with a guardrail (e.g. an SCP denying public S3) ensures the same mistake is blocked everywhere going forward."
      },
      {
        "question": "What is the purpose of enabling GuardDuty, Security Hub and high-risk CloudTrail alerts in the capstone?",
        "options": [
          "To prevent all attacks with certainty",
          "To catch residual risk fast, since prevention is never perfect, and shorten detection-to-response time with a defined runbook",
          "To replace the need for SCPs",
          "To generate more findings for the report's page count"
        ],
        "correctIndex": 1,
        "explanation": "No estate is 100% prevented, so detection and IR catch what slips through. GuardDuty, Security Hub and targeted CloudTrail alerts plus a runbook ensure bypasses or new exposures are caught in minutes, not in a breach notice."
      },
      {
        "question": "What makes a good executive posture report for the capstone?",
        "options": [
          "The full raw 3,000-line scan output pasted in",
          "A business-framed before/after story backed by evidence: compliance score change, attack paths closed, guardrails and detection now in place",
          "A list of every tag that is missing",
          "Only the tools used, with no outcomes"
        ],
        "correctIndex": 1,
        "explanation": "Leadership needs the risk, the action, the residual exposure and proof, framed in business terms. Show the score improving (e.g. 61% to 92%), the critical paths closed, and the guardrails and detection enforcing it, each backed by evidence."
      }
    ]
  },
  {
    "topicId": "cloud-m13-1",
    "questions": [
      {
        "question": "In Azure, which layer decides authentication (who you are) versus resource permissions (what you can touch)?",
        "options": [
          "Azure RBAC authenticates; Entra ID grants resource permissions",
          "Entra ID authenticates; Azure RBAC grants resource permissions",
          "Both are handled entirely by Azure RBAC",
          "Both are handled entirely by Entra ID"
        ],
        "correctIndex": 1,
        "explanation": "Entra ID is the identity plane (sign-in, MFA, Conditional Access). Azure RBAC is the resource plane that grants permissions on resources via role assignments."
      },
      {
        "question": "What three elements make up an Azure RBAC role assignment?",
        "options": [
          "Principal, role definition, and scope",
          "Username, password, and tenant",
          "App registration, secret, and redirect URI",
          "Subscription, region, and resource group"
        ],
        "correctIndex": 0,
        "explanation": "A role assignment binds a principal (who), a role definition (what actions), and a scope (where). Permissions then inherit downward from that scope."
      },
      {
        "question": "Does an Entra ID Global Administrator automatically have Owner rights on all Azure subscriptions?",
        "options": [
          "Yes, Global Admin always implies Owner",
          "No, but a Global Admin can self-elevate to User Access Administrator at root scope",
          "No, and there is no way to bridge the two planes",
          "Only if the subscription is in the same region"
        ],
        "correctIndex": 1,
        "explanation": "The planes are separate, but the 'Access management for Azure resources' elevation lets a Global Admin grant themselves User Access Administrator at root scope, bridging into RBAC."
      },
      {
        "question": "Which control is the primary identity guardrail in Entra ID?",
        "options": [
          "Resource locks",
          "Network security groups",
          "Conditional Access policies combined with MFA",
          "Storage account firewalls"
        ],
        "correctIndex": 2,
        "explanation": "Conditional Access evaluates conditions (user, location, device) and enforces requirements such as MFA, so a stolen password alone does not yield a token."
      }
    ]
  },
  {
    "topicId": "cloud-m13-2",
    "questions": [
      {
        "question": "What makes blind SSRF against the Azure IMDS endpoint harder than against the legacy AWS IMDSv1?",
        "options": [
          "Azure IMDS uses HTTPS with a client certificate",
          "Azure IMDS requires the custom header 'Metadata: true'",
          "Azure IMDS is only reachable over IPv6",
          "Azure IMDS requires a pre-existing bearer token"
        ],
        "correctIndex": 1,
        "explanation": "Azure IMDS rejects requests without 'Metadata: true'. A basic SSRF that cannot inject headers usually cannot retrieve a token, unlike AWS IMDSv1 which answered plain GETs."
      },
      {
        "question": "Which RBAC action enables a principal to grant itself the Owner role?",
        "options": [
          "Microsoft.Compute/virtualMachines/read",
          "Microsoft.Storage/storageAccounts/listKeys/action",
          "Microsoft.Authorization/roleAssignments/write",
          "Microsoft.Network/virtualNetworks/write"
        ],
        "correctIndex": 2,
        "explanation": "roleAssignments/write is the ability to create role assignments. It is held by Owner and User Access Administrator, and lets a principal escalate itself to full control."
      },
      {
        "question": "AzureHound collects Entra and RBAC data primarily to feed which analysis tool?",
        "options": [
          "BloodHound",
          "Wireshark",
          "Metasploit",
          "Nessus"
        ],
        "correctIndex": 0,
        "explanation": "AzureHound exports Entra objects and Azure RBAC assignments into BloodHound, which graphs attack paths such as the shortest route to Global Admin or Owner."
      },
      {
        "question": "What is the Azure equivalent of leaking root S3 credentials?",
        "options": [
          "A leaked storage account key, which grants full access to every container",
          "A leaked VM SSH key",
          "A leaked Conditional Access policy",
          "A leaked resource group name"
        ],
        "correctIndex": 0,
        "explanation": "Storage account keys grant full read/write to all blobs in the account. Disabling key auth (forcing Entra ID authorization) and using short, scoped SAS tokens mitigates this."
      },
      {
        "question": "After stealing a managed-identity token, what bounds the attacker's impact?",
        "options": [
          "The VM's CPU size",
          "The RBAC roles assigned to that managed identity",
          "The Azure region",
          "The length of the bearer token"
        ],
        "correctIndex": 1,
        "explanation": "A managed-identity token can only do what the identity's RBAC assignments allow. Least-privilege scoping is the primary control that caps the blast radius."
      }
    ]
  },
  {
    "topicId": "cloud-m13-3",
    "questions": [
      {
        "question": "In what order are GCP IAM bindings inherited?",
        "options": [
          "Resource -> Project -> Folder -> Organization",
          "Organization -> Folder -> Project -> Resource",
          "Project -> Organization -> Folder -> Resource",
          "Folder -> Organization -> Project -> Resource"
        ],
        "correctIndex": 1,
        "explanation": "Policies attach anywhere in the hierarchy and inherit downward: a binding at the Organization applies to every folder, project and resource beneath it."
      },
      {
        "question": "Why is a downloaded service-account key file (key.json) a security concern?",
        "options": [
          "It expires every hour and must be renewed constantly",
          "It is a long-lived credential, effectively a non-expiring password, often leaked in Git or CI",
          "It only works from inside the VM that created it",
          "It cannot be used by the gcloud CLI"
        ],
        "correctIndex": 1,
        "explanation": "SA keys are long-lived JSON credentials. A leaked key.json is a persistent login as that service account, which is why runtime tokens or Workload Identity are preferred."
      },
      {
        "question": "What does the role roles/iam.serviceAccountTokenCreator enable?",
        "options": [
          "Reading objects in Cloud Storage",
          "Creating VMs in Compute Engine",
          "Minting access tokens for a target service account (impersonation)",
          "Viewing billing data"
        ],
        "correctIndex": 2,
        "explanation": "Token Creator grants iam.serviceAccounts.getAccessToken, letting the holder act as the target SA without its key — the core GCP impersonation primitive."
      },
      {
        "question": "What role has the Compute Engine default service account historically been granted on the project?",
        "options": [
          "Viewer (read-only)",
          "No role by default",
          "Editor (broad write access)",
          "Billing Administrator"
        ],
        "correctIndex": 2,
        "explanation": "By default the Compute Engine default SA receives the primitive Editor role, so a foothold on any VM can yield project-wide Editor unless the automatic grant is disabled."
      }
    ]
  },
  {
    "topicId": "cloud-m13-4",
    "questions": [
      {
        "question": "Which header must a request to the GCE metadata server carry to retrieve an SA token?",
        "options": [
          "Metadata: true",
          "Metadata-Flavor: Google",
          "X-Google-Metadata: 1",
          "Authorization: Bearer"
        ],
        "correctIndex": 1,
        "explanation": "GCP requires 'Metadata-Flavor: Google'. The required header differs per cloud and serves both as an anti-SSRF guard and a platform fingerprint."
      },
      {
        "question": "Which gcloud flag performs service-account impersonation for a command?",
        "options": [
          "--as-service-account",
          "--impersonate-service-account",
          "--run-as",
          "--sudo-sa"
        ],
        "correctIndex": 1,
        "explanation": "gcloud ... --impersonate-service-account=<SA> mints a short-lived token for the target SA (needs Token Creator) and runs the command as it."
      },
      {
        "question": "Which IAM binding makes a Cloud Storage bucket readable by anyone on the internet?",
        "options": [
          "roles/storage.objectViewer bound to allUsers",
          "roles/storage.admin bound to the project SA",
          "roles/viewer bound to a group",
          "roles/owner bound to a user"
        ],
        "correctIndex": 0,
        "explanation": "Binding objectViewer to allUsers exposes objects to unauthenticated internet users — the GCS equivalent of a public S3 bucket. allAuthenticatedUsers exposes them to any Google account."
      },
      {
        "question": "Why is resourcemanager.projects.setIamPolicy so dangerous?",
        "options": [
          "It lets the holder delete the project",
          "It lets the holder rewrite the project IAM policy and grant itself Owner",
          "It only allows reading the IAM policy",
          "It restarts all VMs in the project"
        ],
        "correctIndex": 1,
        "explanation": "setIamPolicy can add any binding, including Owner for the attacker, instantly taking over the project. It is a critical escalation permission."
      },
      {
        "question": "Which tool is purpose-built to discover public or mis-permissioned Cloud Storage buckets?",
        "options": [
          "AzureHound",
          "GCPBucketBrute",
          "Wireshark",
          "roadrecon"
        ],
        "correctIndex": 1,
        "explanation": "GCPBucketBrute brute-forces likely bucket names from a keyword and reports which are public or list-able. ScoutSuite covers broader GCP auditing."
      }
    ]
  },
  {
    "topicId": "cloud-m13-5",
    "questions": [
      {
        "question": "What is the main security advantage of workload identity federation?",
        "options": [
          "It eliminates the need for IAM roles entirely",
          "It avoids long-lived static credentials by issuing short-lived, scoped tokens",
          "It makes cloud APIs run faster",
          "It disables MFA requirements"
        ],
        "correctIndex": 1,
        "explanation": "WIF exchanges a short-lived OIDC token for temporary credentials, removing the durable secret that static keys represent. Trust must still be scoped with tight claim conditions."
      },
      {
        "question": "Which AWS API does a GitHub Actions job call to turn its OIDC token into temporary AWS credentials?",
        "options": [
          "sts:GetSessionToken",
          "sts:AssumeRoleWithWebIdentity",
          "iam:CreateAccessKey",
          "sts:GetFederationToken"
        ],
        "correctIndex": 1,
        "explanation": "AssumeRoleWithWebIdentity exchanges a validated OIDC/web-identity token for temporary role credentials, after AWS checks the token's issuer, audience and subject against the role's trust policy."
      },
      {
        "question": "What is the critical misconfiguration in a GitHub-OIDC-to-AWS trust policy?",
        "options": [
          "Setting a one-hour session duration",
          "Wildcarding the 'sub' claim so any repository can assume the role",
          "Using SAML instead of OIDC",
          "Pinning the audience claim"
        ],
        "correctIndex": 1,
        "explanation": "A wildcarded 'sub' means any GitHub repo (not just yours) can assume the role. The subject should be matched exactly with StringEquals to the intended repo and ref."
      },
      {
        "question": "Why is a compromise of a central identity provider especially severe in a multi-cloud estate?",
        "options": [
          "It only affects one cloud at a time",
          "The trust from the IdP cascades, exposing every federated cloud and SaaS at once",
          "It is easily contained to the IdP's own data",
          "Clouds do not trust external IdPs"
        ],
        "correctIndex": 1,
        "explanation": "Every cloud and SaaS that federates to the IdP trusts tokens it signs. Controlling the IdP lets an attacker reach all of them simultaneously, which is why IdP MFA and monitoring are vital."
      }
    ]
  },
  {
    "topicId": "cloud-m13-6",
    "questions": [
      {
        "question": "Which log is the GCP equivalent of AWS CloudTrail?",
        "options": [
          "Azure Activity Log",
          "Cloud Audit Logs",
          "VPC Flow Logs",
          "Stackdriver Uptime"
        ],
        "correctIndex": 1,
        "explanation": "Cloud Audit Logs (Admin Activity and Data Access) record GCP control-plane and data API calls, playing the same role as AWS CloudTrail and Azure's Activity Log."
      },
      {
        "question": "In the unified model, what single concept maps to an AWS IAM policy, an Azure RBAC assignment, and a GCP IAM binding?",
        "options": [
          "The metadata endpoint",
          "The permission grant (a principal given a role/permission at a scope)",
          "The audit log",
          "The network firewall"
        ],
        "correctIndex": 1,
        "explanation": "All three are expressions of the same idea: granting a principal a set of permissions at a scope. Learning this spine lets you translate findings across clouds."
      },
      {
        "question": "What is the core value of a CSPM/CNAPP platform in a multi-cloud estate?",
        "options": [
          "It provisions resources more cheaply",
          "It presents one normalised, ranked view of misconfigurations across all connected clouds",
          "It replaces each cloud's native IAM",
          "It encrypts data at rest automatically"
        ],
        "correctIndex": 1,
        "explanation": "Tools like ScoutSuite, Prowler and Wiz normalise configuration from every cloud into a single consistent findings list, so posture can be assessed without juggling three consoles."
      },
      {
        "question": "Which MITRE ATT&CK technique covers stealing credentials from a cloud metadata endpoint?",
        "options": [
          "Phishing (T1566)",
          "Cloud Instance Metadata API (T1552.005)",
          "Data Encrypted for Impact (T1486)",
          "Brute Force (T1110)"
        ],
        "correctIndex": 1,
        "explanation": "T1552.005, Unsecured Credentials: Cloud Instance Metadata API, is the provider-neutral label for stealing a workload's token from the metadata service in AWS, Azure or GCP."
      }
    ]
  }
]
