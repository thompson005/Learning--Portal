# Authoring a Cloud Range lab

A Cloud Range lab is a self-contained, **auto-graded** cloud security lab that runs entirely in the
learner's browser: no real cloud account, no Docker. The learner reads a scenario, inspects
artifacts (policies, logs, configs), drives a **scripted CLI terminal**, answers questions, and fixes
**IAM policies** that the portal grades by *actually evaluating them*.

You write the lab as JSON. It is only accepted when `npx tsx scripts/validate-cloud-ranges.ts <your file>`
passes — that QA replays your solution through the real terminal engine and runs your policy tasks
against your reference solution, so a lab that cannot be solved fails.

Reference lab (read it first, match its quality): `scripts/cloud-ranges/cloud-m4-L07.json`.
Types: the `CloudRange` section of `src/types/index.ts`.

## File shape

Your output is a JSON **array**, one object per lab you were assigned:

```jsonc
{
  "labId": "cloud-L07",              // must be an existing id in src/lib/data/tracks/cloudLabs.ts
  "objective": "…",                   // 1-2 sentences, concrete (you may sharpen the existing one, keep its intent)
  "successCriteria": ["…", "…"],      // >= 2, checkable outcomes
  "hints": ["gentle", "firmer", "near-answer"],   // >= 3, progressive
  "estimatedHours": 1,                // 1-2
  "resources": [{ "title": "…", "url": "https://docs.aws.amazon.com/…", "type": "link" }],  // only URLs you are SURE exist
  "range": { "scenario": "…", "artifacts": [...], "terminal": {...}, "solution": [...], "tasks": [...], "takeaways": [...] }
}
```

## range fields

- **scenario** (>= 80 chars): a short story. Who you are, what you have, what the goal is. Do **not** give away the answer.
- **artifacts** (>= 1): things to inspect. `{name, language: "json"|"text"|"bash"|"yaml", content, note?}`.
  `json` artifacts must parse. Use real-looking policies, CloudTrail events, `describe-*` output, configs, code.
- **terminal** (needed if any `flag` task): a scripted shell.
  - `prompt`, optional `intro`, optional `help`, `rules[]`, optional `fallback`.
  - Each rule: `{ "match": "<regex>", "output": "<text>", "requires": ["state"], "sets": ["state"] }`.
  - `match` is a **regex source**, tested case-insensitively against the command with whitespace collapsed to single spaces.
    Use `^…$` anchors. `$1..$9` in `output` insert capture groups. Remember JSON needs `\\` for a regex backslash (`\\S+`, `\\d+`).
  - **First matching rule whose `requires` are all satisfied wins** — put specific/gated rules BEFORE generic ones.
  - `requires`/`sets` are state keys (any string). Use them to make the lab procedural: e.g. the privileged call only
    works after `sets: ["assumed_role"]` from the assume-role command. Every key you `require` must be `set` by some rule.
  - Add realistic wrong turns: `AccessDenied` errors, `ResourceNotFound`, usage errors. Real AWS CLI error wording:
    `An error occurred (AccessDenied) when calling the <Op> operation: User: <arn> is not authorized to perform: <action>`.
  - Be tolerant of argument order/optional flags where it matters (`.*` between args, optional `--region`).
  - Output must look like real CLI output (JSON for aws, kubectl tables, etc.). Use fictional account ids
    (`111122223333`, `444455556666`), fictional names, and **fake keys that end in `EXAMPLE`** (e.g. `AKIAIOSFODNN7EXAMPLE`).
- **solution** (>= 3 commands, needed if any `flag` task): the exact commands that reach every flag. The QA replays them from a
  fresh state; each must be handled by a rule, and every flag string must appear in the combined output.
- **tasks** (>= 4, aim for 6-8): graded automatically. Kinds:
  - `answer`: `{id, kind:"answer", prompt, accept:["…"], explanation}` — `accept` are lowercase accepted answers
    (the portal normalises case/spaces/quotes). Include sensible variants (arn and short name).
  - `choice`: `{id, kind:"choice", prompt, options:[3-5], correct:[indexes], explanation}` — more than one correct index = multi-select.
    Distractors must be plausible, not silly.
  - `flag`: `{id, kind:"flag", prompt, flag:"FLAG{some_text_here}", explanation}` — the flag text must appear in terminal output
    only after the learner does the right work. Format `FLAG{[A-Za-z0-9_-]{6,60}}`.
  - `policy`: `{id, kind:"policy", prompt, mode, starter, solution, fixed?, tests[], explanation}` — the learner edits a JSON policy;
    the portal evaluates `tests` against it. `mode` is which slot their policy occupies: `identity`, `resource`
    (bucket policy / role trust policy), `boundary`, or `scp`. `fixed` adds unchangeable context
    (`{identity?:[json strings], resource?:json string, boundary?, scp?:[...], crossAccount?:true}`).
    `starter` is the broken policy shown; `solution` is a passing reference (never shown). The QA requires: starter FAILS at
    least one test, solution passes ALL tests, tests contain at least one `allow` and one `deny`, >= 3 tests.
    Write tests that make the fix unambiguous but do not give it away (name tests by behaviour, e.g.
    "Anonymous users cannot read objects").
- **takeaways** (>= 2): what the learner should remember.

Every task needs `explanation` (>= 30 chars) that teaches **why** — this is where the learning happens. Aim for 2-4 sentences.

## What the IAM evaluator understands (policy tasks)

Real evaluation order: explicit Deny anywhere wins; SCPs and permission boundaries must allow (they never grant);
same-account: identity policy OR a resource policy that names the caller directly is enough (a resource policy naming only the
account `:root` delegates to identity policies and grants nothing by itself); cross-account (`crossAccount:true`): BOTH an identity
allow and a resource-policy allow are required.
Supported: `Effect, Action, NotAction, Resource, NotResource, Principal (AWS/Service/Federated/"*")`, wildcards `*` `?`,
assumed-role sessions matching their role, and `Condition` operators `StringEquals/NotEquals/EqualsIgnoreCase/Like/NotLike,
ArnEquals/ArnLike/NotEquals/NotLike, Numeric*, Bool, IpAddress/NotIpAddress, Null`, set modifiers `ForAnyValue:` / `ForAllValues:`,
`…IfExists`, policy variables like `${aws:username}`, and the real missing-key rules (a negated operator on a missing key is true).
A test is `{name, action, resource?, principal?, context?:{ "aws:SourceIp": "…", "aws:SecureTransport": false, … }, expect:"allow"|"deny"}`.
For trust-policy tasks use `mode:"resource"`, `action:"sts:AssumeRole"`, `principal:<caller arn or service>` (no `resource`).
This evaluator is AWS-style — **do not use policy tasks for Azure/GCP/Kubernetes labs**; use terminal flags + choice/answer there.

## Quality bar

- **Realistic and correct.** Real service names, real CLI syntax, real behaviour. Never invent a CLI flag, API action, or feature.
  If you are not sure something exists, don't use it. Mirror well-known real techniques/incidents (Capital One SSRF, Rhino Security
  privilege-escalation methods, flaws.cloud-style exposure, etc.).
- **Discovery, not lookup.** The learner should have to explore (list, inspect, reason) — with a wrong turn or two — and then
  prove it. Gate the winning command behind the right earlier steps using `requires`/`sets`.
- **Teach the fix, not only the attack.** Each lab should include a remediation task (usually a graded policy fix; for non-AWS labs a
  choice/answer on the right control).
- **Mix task types.** A lab usually has: a reasoning choice, a discovery answer, the hands-on flag, the remediation, and a "why" answer.
- Defensive/educational framing; everything is simulated. No real credentials, hosts, companies, or personal data.

## Self-check loop (required)

1. Write your JSON to the file you were assigned (valid JSON array).
2. Run `npx tsx scripts/validate-cloud-ranges.ts <your file>`.
3. Fix every reported error and re-run until it prints `All N lab(s) pass QA`.
4. Do not edit any other file.
