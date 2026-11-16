import type { Lab } from "@/types"

// Extra in-house / open-source targets for the offensive-security track
// (vuln-bank + famous vulnerable apps).
export const CYBER_EXTRA_LABS: Lab[] = [
  {
    "id": "xl-01",
    "number": 100,
    "week": 9,
    "moduleId": "m10",
    "title": "vuln-bank (Commando-X) — Vulnerable Bank",
    "description": "Learner attacks a deliberately vulnerable online-banking web app: broken auth/JWT, BOLA/BOPLA on money-transfer and loan endpoints, GraphQL SQLi + introspection, file-upload path traversal/SSRF, race conditions on transfers, plus an AI support-chatbot for prompt-injection and authz-bypass practice. VERIFIED: repo live, docker-compose.yml present, app on port 5000, MIT license. No published Docker Hub image so buildFromRepo. Flask + PostgreSQL on multi-arch base images -> builds natively on ARM64 (no prebuilt manifest to check). AI chatbot = 'Real LLM with DeepSeek API / Mock Mode'; mock fallback auto-engages when no API key set -> use that to avoid DeepSeek spend (TIP LLM spend gate). THE vuln-bank the request asked for.",
    "platform": "Self-host: build from GitHub repo",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Learner attacks a deliberately vulnerable online-banking web app: broken auth/JWT, BOLA/BOPLA on money-transfer and loan endpoints, GraphQL SQLi + introspection, file-upload path traversal/SSRF, race conditions on transfers, plus an AI support-chatbot for prompt-injection and authz-bypass practice.",
    "instructions": [
      "Clone the repo: git clone https://github.com/Commando-X/vuln-bank",
      "git clone https://github.com/Commando-X/vuln-bank && cd vuln-bank && docker-compose up -d --build  # app on http://localhost:5000, API docs /api/docs, GraphQL /graphql",
      "The app listens on container port 5000. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "vuln-bank (Commando-X) — Vulnerable Bank — GitHub repo",
        "url": "https://github.com/Commando-X/vuln-bank",
        "type": "tool"
      }
    ]
  },
  {
    "id": "xl-02",
    "number": 101,
    "week": 9,
    "moduleId": "m9",
    "title": "OWASP Juice Shop",
    "description": "Modern single-page shop (Angular + Node/Express + SQLite) covering the full OWASP Top 10: SQLi, XSS, broken access control, JWT flaws, SSRF, insecure deserialization, with a built-in score board and ~100+ gamified challenges. VERIFIED pullable + multi-arch: latest manifest carries linux/amd64, linux/arm64 and linux/arm/v7. Internal port 3000 confirmed. The best-maintained reference web target and the arm64-proven gold standard.",
    "platform": "In-house Docker (one-click)",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Modern single-page shop (Angular + Node/Express + SQLite) covering the full OWASP Top 10: SQLi, XSS, broken access control, JWT flaws, SSRF, insecure deserialization, with a built-in score board and ~100+ gamified challenges.",
    "dockerImage": "bkimminich/juice-shop:latest",
    "containerPort": 3000,
    "resources": [
      {
        "title": "OWASP Juice Shop — GitHub repo",
        "url": "https://github.com/juice-shop/juice-shop",
        "type": "tool"
      }
    ],
    "onlineAlternative": {
      "label": "https://demo.owasp-juice.shop",
      "url": "https://demo.owasp-juice.shop",
      "note": "No-setup online alternative."
    }
  },
  {
    "id": "xl-03",
    "number": 102,
    "week": 9,
    "moduleId": "m9",
    "title": "DVWA (Damn Vulnerable Web Application)",
    "description": "Classic PHP/MySQL training app with adjustable security levels (low/medium/high/impossible) for SQLi, command injection, file inclusion/upload, CSRF, XSS, brute force -- ideal first lab. VERIFIED on GHCR package page: latest manifest publishes linux/amd64 AND linux/arm64 -> arm64 upgraded from unknown to yes. Internal port 80. Auto-built on every master commit. Default creds admin/password; must click Create/Reset Database on first run. (Avoid the old amd64-only vulnerables/web-dvwa image.)",
    "platform": "In-house Docker (one-click)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "Classic PHP/MySQL training app with adjustable security levels (low/medium/high/impossible) for SQLi, command injection, file inclusion/upload, CSRF, XSS, brute force -- ideal first lab.",
    "dockerImage": "ghcr.io/digininja/dvwa:latest",
    "containerPort": 80,
    "resources": [
      {
        "title": "DVWA (Damn Vulnerable Web Application) — GitHub repo",
        "url": "https://github.com/digininja/DVWA",
        "type": "tool"
      }
    ]
  },
  {
    "id": "xl-04",
    "number": 103,
    "week": 9,
    "moduleId": "m9",
    "title": "OWASP WebGoat",
    "description": "Guided Java/Spring lesson-based platform with step-by-step hacking exercises (SQLi, XXE, JWT, path traversal, deserialization) plus a companion WebWolf attacker service for out-of-band/CSRF labs. VERIFIED: official webgoat/webgoat image, latest tag exists (updated ~1 mo ago), manifest carries linux/amd64 AND linux/arm64 -> arm64 upgraded from unknown to yes. Internal port 8080 (app); 9090 is the WebWolf attacker service needed for several out-of-band lessons -> expose both.",
    "platform": "In-house Docker (one-click)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "Guided Java/Spring lesson-based platform with step-by-step hacking exercises (SQLi, XXE, JWT, path traversal, deserialization) plus a companion WebWolf attacker service for out-of-band/CSRF labs.",
    "dockerImage": "webgoat/webgoat:latest",
    "containerPort": 8080,
    "resources": [
      {
        "title": "OWASP WebGoat — GitHub repo",
        "url": "https://github.com/WebGoat/WebGoat",
        "type": "tool"
      }
    ]
  },
  {
    "id": "xl-05",
    "number": 104,
    "week": 9,
    "moduleId": "m9",
    "title": "OWASP NodeGoat",
    "description": "Deliberately vulnerable Node.js/Express + MongoDB retirement-savings app mapped to the OWASP Top 10, with an in-app /tutorial walking through each flaw (NoSQLi, SSJS injection, insecure direct object refs, weak crypto). VERIFIED: Dockerfile + docker-compose.yml present (app + MongoDB), default port 4000 (PORT env overrides; npm run dev uses 5000). No published official image -> buildFromRepo. Node + Mongo base images are multi-arch so builds natively on ARM64. 401k/finance app, good complement to vuln-bank.",
    "platform": "Self-host: build from GitHub repo",
    "difficulty": "medium",
    "estimatedHours": 2,
    "objective": "Deliberately vulnerable Node.js/Express + MongoDB retirement-savings app mapped to the OWASP Top 10, with an in-app /tutorial walking through each flaw (NoSQLi, SSJS injection, insecure direct object refs, weak crypto).",
    "instructions": [
      "Clone the repo: git clone https://github.com/OWASP/NodeGoat",
      "git clone https://github.com/OWASP/NodeGoat && cd NodeGoat && docker-compose build && docker-compose up   # http://localhost:4000, tutorial at /tutorial",
      "The app listens on container port 4000. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "OWASP NodeGoat — GitHub repo",
        "url": "https://github.com/OWASP/NodeGoat",
        "type": "tool"
      }
    ]
  },
  {
    "id": "xl-06",
    "number": 105,
    "week": 9,
    "moduleId": "m10",
    "title": "OWASP crAPI (completely ridiculous API)",
    "description": "Realistic microservices car-service app for API security practice: BOLA, mass assignment, broken auth/JWT, SSRF, unauthenticated internal endpoints -- the reference lab for the OWASP API Security Top 10. VERIFIED: crapi/crapi-web exists, latest tag carries BOTH linux/amd64 and linux/arm64 -> arm64 upgraded from unknown to yes (the whole crapi/* set is published multi-arch; a dedicated chatbot-arm64 tag also exists). Multi-container (web/identity/community/workshop + Postgres/Mongo/MailHog), accessed on host port 8888. Needs Docker Compose >=1.27; raise crapi-identity mem limit 256M->512M if it OOMs. Apache-2.0. Heaviest lab -- not a single pull+run, needs the compose stack.",
    "platform": "Self-host: build from GitHub repo",
    "difficulty": "hard",
    "estimatedHours": 2,
    "objective": "Realistic microservices car-service app for API security practice: BOLA, mass assignment, broken auth/JWT, SSRF, unauthenticated internal endpoints -- the reference lab for the OWASP API Security Top 10.",
    "instructions": [
      "Clone the repo: git clone https://github.com/OWASP/crAPI",
      "curl -L -o crapi.zip https://github.com/OWASP/crAPI/archive/refs/heads/main.zip && unzip crapi.zip && cd crAPI-main/deploy/docker && docker compose pull && docker compose -f docker-compose.yml --compatibility up -d   # web http://localhost:8888, MailHog http://localhost:8025",
      "The app listens on container port 8888. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "OWASP crAPI (completely ridiculous API) — GitHub repo",
        "url": "https://github.com/OWASP/crAPI",
        "type": "tool"
      }
    ]
  },
  {
    "id": "xl-07",
    "number": 106,
    "week": 9,
    "moduleId": "m10",
    "title": "VAmPI (Vulnerable API)",
    "description": "Small Flask REST API (OpenAPI 3 + Swagger UI) built to teach the OWASP API Top 10: broken auth, excessive data exposure, BOLA, SQLi -- with a global switch to toggle vulnerable vs secure mode for before/after comparison. VERIFIED: erev0s/vampi latest manifest carries linux/amd64 AND linux/arm64 -> arm64 upgraded from unknown to yes. Internal Flask port 5000. Mode env var is 'vulnerable' (1=vuln default per Dockerfile, 0=secure). MIT, ~41MB, fast -- good API starter before crAPI. On a host already using 5000 map a different host port.",
    "platform": "In-house Docker (one-click)",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "Small Flask REST API (OpenAPI 3 + Swagger UI) built to teach the OWASP API Top 10: broken auth, excessive data exposure, BOLA, SQLi -- with a global switch to toggle vulnerable vs secure mode for before/after comparison.",
    "dockerImage": "erev0s/vampi:latest",
    "containerPort": 5000,
    "resources": [
      {
        "title": "VAmPI (Vulnerable API) — GitHub repo",
        "url": "https://github.com/erev0s/VAmPI",
        "type": "tool"
      }
    ]
  },
  {
    "id": "xl-08",
    "number": 107,
    "week": 9,
    "moduleId": "m9",
    "title": "BrokenCrystals",
    "description": "Full-stack vulnerable app (NestJS/Node + React + PostgreSQL) with a large catalogue of real-world bugs: SQLi, SSRF, XXE, JWT key confusion, path traversal, CSS/HTML injection, OAuth flaws -- closer to a production-looking app than DVWA. VERIFIED: brightsec/brokencrystals:latest exists but is amd64-ONLY (every tag incl latest/stable/unstable is linux/amd64) -> arm64 is no, a direct pull+run would need --platform linux/amd64 emulation on the DGX Spark. Recommend buildFromRepo=true: Node/Postgres base images are multi-arch so docker-compose builds natively on ARM64. Internal port 3000. (Prefer brightsec over the stale neuralegion/brokencrystals image.) ARM64: not supported — run elsewhere.",
    "platform": "Self-host: build from GitHub repo",
    "difficulty": "hard",
    "estimatedHours": 2,
    "objective": "Full-stack vulnerable app (NestJS/Node + React + PostgreSQL) with a large catalogue of real-world bugs: SQLi, SSRF, XXE, JWT key confusion, path traversal, CSS/HTML injection, OAuth flaws -- closer to a production-looking app than DVWA.",
    "instructions": [
      "Clone the repo: git clone https://github.com/NeuraLegion/brokencrystals",
      "git clone https://github.com/NeuraLegion/brokencrystals && cd brokencrystals && docker-compose up -d   # app http://localhost:3000 (app + Postgres + MailCatcher)",
      "The app listens on container port 3000. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "BrokenCrystals — GitHub repo",
        "url": "https://github.com/NeuraLegion/brokencrystals",
        "type": "tool"
      }
    ],
    "onlineAlternative": {
      "label": "https://brokencrystals.com",
      "url": "https://brokencrystals.com",
      "note": "No-setup online alternative."
    }
  },
  {
    "id": "xl-09",
    "number": 108,
    "week": 9,
    "moduleId": "m9",
    "title": "bWAPP (buggy Web Application)",
    "description": "PHP/MySQL app with 100+ catalogued web vulnerabilities (SQLi, XSS, RCE, LDAP/XML injection, HTTP smuggling) -- broad coverage for drilling many bug classes, selectable by difficulty. VERIFIED: raesene/bwapp:latest exists but is amd64-ONLY (single linux/amd64 image) and the repo/image are ARCHIVED, >4 yrs old -> arm64 no; on the ARM64 runner it only runs under --platform linux/amd64 (qemu) emulation. Internal port 80; must hit /install.php once before use, creds bee/bug. Legacy/unmaintained -- keep only for breadth; consider dropping if native-arm64 is a hard requirement. ARM64: not supported — run elsewhere.",
    "platform": "Self-host: build from GitHub repo",
    "difficulty": "easy",
    "estimatedHours": 2,
    "objective": "PHP/MySQL app with 100+ catalogued web vulnerabilities (SQLi, XSS, RCE, LDAP/XML injection, HTTP smuggling) -- broad coverage for drilling many bug classes, selectable by difficulty.",
    "instructions": [
      "Clone the repo: git clone https://github.com/raesene/bWAPP-Docker",
      "docker run -d -p 80:80 raesene/bwapp:latest   # then browse http://localhost/install.php, then login bee/bug",
      "The app listens on container port 80. Open it in your browser once it is up.",
      "Attack the target per the lab objective, then record your findings."
    ],
    "resources": [
      {
        "title": "bWAPP (buggy Web Application) — GitHub repo",
        "url": "https://github.com/raesene/bWAPP-Docker",
        "type": "tool"
      }
    ]
  }
]
