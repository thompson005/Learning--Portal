# Technieum 4-Month Plan — 16 Weeks

_Auto-generated from `src/lib/data/weeklyPlan.ts`. Do not edit by hand — run `npm run docs:generate`._

---

## Week 1 — Foundations (Month 1)

**Modules:** m0, m1

**Key Topics:** CPU, RAM, ROM, Storage, BIOS/UEFI. What is Cybersecurity. CIA Triad. Attack types. Key terms: CVE, CWE, IOC, APT, Zero-Day. Ethical & legal boundaries.

**Labs:** L01, L02

**Checkpoint:** Quiz: Define CIA Triad, CVE, CWE. List 5 attack types and explain each.

**Resources:** TryHackMe Pre-Security Path · NIST Glossary · cve.mitre.org

---

## Week 2 — Foundations (Month 1)

**Modules:** m2

**Key Topics:** OSI Model (all 7 layers). TCP/IP. IP Addressing & Subnetting. Ports & protocols (DNS, HTTP/S, FTP, SSH). MAC Address. ARP. TCP vs UDP. Switches/Routers/Hubs. Firewalls. VPN & Proxies. NAT. What happens when you type a URL.

**Labs:** L03, L04, L05

**Checkpoint:** Explain a full HTTP request from browser to server, mapping each step to an OSI layer.

**Resources:** TryHackMe Networking Fundamentals · Professor Messer · Wireshark

---

## Week 3 — Foundations (Month 1)

**Modules:** m3-linux

**Key Topics:** Linux overview & distros. File system hierarchy. Navigation & file ops. Permissions (chmod, chown, SUID, SGID). Process mgmt (ps, top, kill). Pipes & redirection. User/group mgmt. SSH & remote access. Package management. Cron jobs.

**Labs:** L06, L07, L08

**Checkpoint:** Complete Bandit Lvl 0-10. Submit screenshot of final flag + script that enumerates all running processes.

**Resources:** OverTheWire Bandit · TryHackMe Linux Fundamentals · explainshell.com

---

## Week 4 — Foundations (Month 1)

**Modules:** m3-windows

**Key Topics:** Windows versions & architecture (User/Kernel mode). File system (NTFS). Registry. ACL & permissions. User/group management. Processes & services. PowerShell & CMD essentials. Windows Defender & Firewall. Event Viewer & log analysis.

**Labs:** L09, L10, L11

**Checkpoint:** Month 1 Review Quiz (20 questions). PowerShell script submitted. Event log analysis submitted.

**Resources:** TryHackMe Windows Fundamentals · Microsoft Docs · SS64.com

---

## Week 5 — Core Offensive Skills (Month 2)

**Modules:** m4, m5

**Key Topics:** Web vs Mobile vs Thick Client. SDLC. Frontend/Backend/API/DB. REST vs SOAP. Sessions & Cookies (HttpOnly, Secure, SameSite). Auth (Password, MFA, OAuth). RBAC/ABAC. Encoding vs Encryption vs Hashing. Symmetric/Asymmetric crypto. PKI & Certificates. Digital Signatures.

**Labs:** L12, L13, L14

**Checkpoint:** Explain the difference between encoding, encryption, and hashing with an example each.

**Resources:** PortSwigger Web Academy Intro · CryptoHack.org · OWASP

---

## Week 6 — Core Offensive Skills (Month 2)

**Modules:** m6, m7

**Key Topics:** Corporate network architecture. VLANs & segmentation. DMZ. VPN. Active Directory (AD). Zero Trust Architecture. EDR, IDS/IPS, WAF, NGFW. VDI. Ethical hacking 5 phases. Passive recon (OSINT: WHOIS, Shodan, Google Dorks). Rules of engagement & scoping.

**Labs:** L15, L16

**Checkpoint:** Draw a corporate network with DMZ, VLAN, AD, Zero Trust. Label each security control.

**Resources:** TryHackMe AD Basics · draw.io · BloodHound · Shodan.io

---

## Week 7 — Core Offensive Skills (Month 2)

**Modules:** m7

**Key Topics:** Active recon. Nmap: host discovery, port scan, version detection, OS fingerprint, NSE scripts. Subdomain enumeration (subfinder, amass). Nessus: install & run vulnerability scans. Analyse scan results. Privilege escalation overview. Post-exploitation theory.

**Labs:** L17, L18, L19

**Checkpoint:** Full recon report on a target: open ports, services, OS, subdomains, known CVEs.

**Resources:** TryHackMe Nmap rooms · Nessus Essentials (free) · OSINT Framework

---

## Week 8 — Core Offensive Skills (Month 2)

**Modules:** m8

**Key Topics:** What is Burp Suite. Step-by-step proxy + browser setup (Firefox + CA cert). Intercepting & modifying requests. Repeater. Intruder (fuzzing & brute-force). Decoder. Scanner (passive/active). Scope & Target sitemap.

**Labs:** L20, L21, L22, L23

**Checkpoint:** Month 2 Review: full recon + Burp intercept workflow demo on DVWA target.

**Resources:** PortSwigger Web Academy Burp Suite Path · DVWA · HackTheBox

---

## Week 9 — Exploitation + Reporting (Month 3)

**Modules:** m9

**Key Topics:** OWASP Top 10 overview. XSS (Reflected, Stored, DOM). SQL Injection (manual + sqlmap). Broken Access Control (IDOR, forced browsing). Path Traversal. Command Injection. CSRF basics.

**Labs:** L24, L25, L26, L27

**Checkpoint:** Exploit SQLi + XSS on PortSwigger. Write a 1-page findings report per vulnerability.

**Resources:** PortSwigger Web Academy · OWASP Testing Guide · HackTricks

---

## Week 10 — Exploitation + Reporting (Month 3)

**Modules:** m10

**Key Topics:** SSRF. File Inclusion (LFI/RFI). SSTI. File Upload Attacks & bypass techniques. Business Logic Vulnerabilities. Information Disclosure. Cryptographic Failures. OWASP API Security Top 10. LLM/AI attack surface (prompt injection, OWASP LLM Top 10).

**Labs:** L28, L29, L30, L31, L32

**Checkpoint:** Complete 5 PortSwigger labs. Document each: vulnerability, payload, impact, remediation.

**Resources:** PortSwigger Web Academy · HackTricks · OWASP API Top 10

---

## Week 11 — Exploitation + Reporting (Month 3)

**Modules:** m11, m12, m13

**Key Topics:** Reverse shells vs bind shells. Staged/non-staged payloads. Metasploit basics. Hash cracking (Hashcat, John). Brute-force (Hydra). Privesc Linux & Windows. Lateral movement. Python: MAC changer, port scanner, subdomain bruter, login bruteforcer. AI-assisted recon & scripting. DeepSeek locally. Prompt injection basics.

**Labs:** L33, L34, L35, L36

**Checkpoint:** 3 VulnMachines writeups + 2 Python scripts (port scanner + subdomain bruter) submitted.

**Resources:** VulnMachines · HackTheBox Starting Point · PentestGPT · GitHub: ippsec

---

## Week 12 — Exploitation + Reporting (Month 3)

**Modules:** m14, m15

**Key Topics:** SOC structure & defensive overview. Log analysis (Windows Event Viewer). Network traffic analysis (Wireshark). Malware detection (VirusTotal). Incident response lifecycle. YARA basics. Certifications roadmap (eJPT, CEH, OSCP). Career roles. Bug bounty intro. CTF competitions.

**Labs:** L37, L38

**Checkpoint:** CAPSTONE: 48-hr pentest sim. Submit full pentest report (scope, recon, exploitation, recommendations).

**Resources:** TryHackMe SOC Level 1 · eJPT exam prep · OffSec Learning · INE.com

---

## Week 13 — Advanced Offensive Security (Month 4)

**Modules:** m16

**Key Topics:** Kerberos fundamentals (KDC, TGT/TGS). Kerberoasting. AS-REP Roasting. Pass-the-Hash. Golden & Silver Tickets. DCSync. AD enumeration (PowerView, SharpHound, ldapsearch). Full attack-path chaining.

**Labs:** L16

**Checkpoint:** Written attack-path narrative: enumerate a sample AD dataset, identify a Kerberoastable account, and trace the full chain to Domain Admin.

**Resources:** HackTricks - Active Directory · harmj0y's blog · Impacket (GitHub) · Mimikatz (GitHub)

---

## Week 14 — Advanced Offensive Security (Month 4)

**Modules:** m17

**Key Topics:** Windows privesc enumeration methodology. Unquoted service paths & weak ACLs. AlwaysInstallElevated. Token impersonation (PrintSpoofer, RoguePotato, JuicyPotatoNG). Scheduled task & DLL hijacking. SSH tunneling. chisel & ligolo-ng. proxychains.

**Labs:** L49

**Checkpoint:** TryHackMe Windows PrivEsc room solved to SYSTEM, plus a working self-built SSH tunnel demo.

**Resources:** HackTricks - Windows Privilege Escalation · PayloadsAllTheThings · chisel (GitHub) · ligolo-ng (GitHub)

---

## Week 15 — Advanced Offensive Security (Month 4)

**Modules:** m18, m19

**Key Topics:** Buffer overflow methodology: stack layout, fuzzing, offset discovery, EIP control, bad-character analysis, JMP ESP, shellcode. Wireless: 802.11 fundamentals, WPA2 4-way handshake, aircrack-ng capture/crack workflow, WPS attacks, Evil Twin concept.

**Labs:** L52, L50

**Checkpoint:** TryHackMe Buffer Overflow Prep solved end to end, plus a real (or sample) WPA2 handshake cracked.

**Resources:** corelan.be Exploit Writing Tutorials · Aircrack-ng documentation · hashcat

---

## Week 16 — Advanced Offensive Security (Month 4)

**Modules:** m20, m21

**Key Topics:** Cloud shared-responsibility model. AWS IAM & least privilege. S3 misconfiguration. EC2 metadata-service SSRF. Azure AD basics. CloudTrail/GuardDuty. Secrets exposure. CVSS v3.1 scoring. Executive summaries. Technical finding structure. Remediation prioritisation.

**Labs:** L53, L51

**Checkpoint:** flAWS.cloud levels completed, plus a full written report (CVSS-scored findings, exec summary, one full technical finding) for your L38 capstone.

**Resources:** flAWS.cloud · AWS IAM documentation · FIRST.org CVSS v3.1 Specification · TCM Security sample reports

---

