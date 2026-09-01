import type { WeekPlan } from "@/types"

export const WEEKLY_PLAN: WeekPlan[] = [
  {
    week: 1,
    month: 1,
    theme: "Foundations",
    modules: ["m0", "m1"],
    keyTopics:
      "CPU, RAM, ROM, Storage, BIOS/UEFI. What is Cybersecurity. CIA Triad. Attack types. Key terms: CVE, CWE, IOC, APT, Zero-Day. Ethical & legal boundaries.",
    labs: ["L01", "L02"],
    estimatedHours: 20,
    checkpoint: "Quiz: Define CIA Triad, CVE, CWE. List 5 attack types and explain each.",
    resources: ["TryHackMe Pre-Security Path", "NIST Glossary", "cve.mitre.org"],
  },
  {
    week: 2,
    month: 1,
    theme: "Foundations",
    modules: ["m2"],
    keyTopics:
      "OSI Model (all 7 layers). TCP/IP. IP Addressing & Subnetting. Ports & protocols (DNS, HTTP/S, FTP, SSH). MAC Address. ARP. TCP vs UDP. Switches/Routers/Hubs. Firewalls. VPN & Proxies. NAT. What happens when you type a URL.",
    labs: ["L03", "L04", "L05"],
    estimatedHours: 22,
    checkpoint:
      "Explain a full HTTP request from browser to server, mapping each step to an OSI layer.",
    resources: ["TryHackMe Networking Fundamentals", "Professor Messer", "Wireshark"],
  },
  {
    week: 3,
    month: 1,
    theme: "Foundations",
    modules: ["m3-linux"],
    keyTopics:
      "Linux overview & distros. File system hierarchy. Navigation & file ops. Permissions (chmod, chown, SUID, SGID). Process mgmt (ps, top, kill). Pipes & redirection. User/group mgmt. SSH & remote access. Package management. Cron jobs.",
    labs: ["L06", "L07", "L08"],
    estimatedHours: 22,
    checkpoint:
      "Complete Bandit Lvl 0-10. Submit screenshot of final flag + script that enumerates all running processes.",
    resources: ["OverTheWire Bandit", "TryHackMe Linux Fundamentals", "explainshell.com"],
  },
  {
    week: 4,
    month: 1,
    theme: "Foundations",
    modules: ["m3-windows"],
    keyTopics:
      "Windows versions & architecture (User/Kernel mode). File system (NTFS). Registry. ACL & permissions. User/group management. Processes & services. PowerShell & CMD essentials. Windows Defender & Firewall. Event Viewer & log analysis.",
    labs: ["L09", "L10", "L11"],
    estimatedHours: 20,
    checkpoint:
      "Month 1 Review Quiz (20 questions). PowerShell script submitted. Event log analysis submitted.",
    resources: ["TryHackMe Windows Fundamentals", "Microsoft Docs", "SS64.com"],
  },
  {
    week: 5,
    month: 2,
    theme: "Core Offensive Skills",
    modules: ["m4", "m5"],
    keyTopics:
      "Web vs Mobile vs Thick Client. SDLC. Frontend/Backend/API/DB. REST vs SOAP. Sessions & Cookies (HttpOnly, Secure, SameSite). Auth (Password, MFA, OAuth). RBAC/ABAC. Encoding vs Encryption vs Hashing. Symmetric/Asymmetric crypto. PKI & Certificates. Digital Signatures.",
    labs: ["L12", "L13", "L14"],
    estimatedHours: 22,
    checkpoint:
      "Explain the difference between encoding, encryption, and hashing with an example each.",
    resources: ["PortSwigger Web Academy Intro", "CryptoHack.org", "OWASP"],
  },
  {
    week: 6,
    month: 2,
    theme: "Core Offensive Skills",
    modules: ["m6", "m7"],
    keyTopics:
      "Corporate network architecture. VLANs & segmentation. DMZ. VPN. Active Directory (AD). Zero Trust Architecture. EDR, IDS/IPS, WAF, NGFW. VDI. Ethical hacking 5 phases. Passive recon (OSINT: WHOIS, Shodan, Google Dorks). Rules of engagement & scoping.",
    labs: ["L15", "L16"],
    estimatedHours: 20,
    checkpoint:
      "Draw a corporate network with DMZ, VLAN, AD, Zero Trust. Label each security control.",
    resources: ["TryHackMe AD Basics", "draw.io", "BloodHound", "Shodan.io"],
  },
  {
    week: 7,
    month: 2,
    theme: "Core Offensive Skills",
    modules: ["m7"],
    keyTopics:
      "Active recon. Nmap: host discovery, port scan, version detection, OS fingerprint, NSE scripts. Subdomain enumeration (subfinder, amass). Nessus: install & run vulnerability scans. Analyse scan results. Privilege escalation overview. Post-exploitation theory.",
    labs: ["L17", "L18", "L19"],
    estimatedHours: 22,
    checkpoint:
      "Full recon report on a target: open ports, services, OS, subdomains, known CVEs.",
    resources: ["TryHackMe Nmap rooms", "Nessus Essentials (free)", "OSINT Framework"],
  },
  {
    week: 8,
    month: 2,
    theme: "Core Offensive Skills",
    modules: ["m8"],
    keyTopics:
      "What is Burp Suite. Step-by-step proxy + browser setup (Firefox + CA cert). Intercepting & modifying requests. Repeater. Intruder (fuzzing & brute-force). Decoder. Scanner (passive/active). Scope & Target sitemap.",
    labs: ["L20", "L21", "L22", "L23"],
    estimatedHours: 20,
    checkpoint: "Month 2 Review: full recon + Burp intercept workflow demo on DVWA target.",
    resources: ["PortSwigger Web Academy Burp Suite Path", "DVWA", "HackTheBox"],
  },
  {
    week: 9,
    month: 3,
    theme: "Exploitation + Reporting",
    modules: ["m9"],
    keyTopics:
      "OWASP Top 10 overview. XSS (Reflected, Stored, DOM). SQL Injection (manual + sqlmap). Broken Access Control (IDOR, forced browsing). Path Traversal. Command Injection. CSRF basics.",
    labs: ["L24", "L25", "L26", "L27"],
    estimatedHours: 22,
    checkpoint:
      "Exploit SQLi + XSS on PortSwigger. Write a 1-page findings report per vulnerability.",
    resources: ["PortSwigger Web Academy", "OWASP Testing Guide", "HackTricks"],
  },
  {
    week: 10,
    month: 3,
    theme: "Exploitation + Reporting",
    modules: ["m10"],
    keyTopics:
      "SSRF. File Inclusion (LFI/RFI). SSTI. File Upload Attacks & bypass techniques. Business Logic Vulnerabilities. Information Disclosure. Cryptographic Failures. OWASP API Security Top 10. LLM/AI attack surface (prompt injection, OWASP LLM Top 10).",
    labs: ["L28", "L29", "L30", "L31", "L32"],
    estimatedHours: 24,
    checkpoint:
      "Complete 5 PortSwigger labs. Document each: vulnerability, payload, impact, remediation.",
    resources: ["PortSwigger Web Academy", "HackTricks", "OWASP API Top 10"],
  },
  {
    week: 11,
    month: 3,
    theme: "Exploitation + Reporting",
    modules: ["m11", "m12", "m13"],
    keyTopics:
      "Reverse shells vs bind shells. Staged/non-staged payloads. Metasploit basics. Hash cracking (Hashcat, John). Brute-force (Hydra). Privesc Linux & Windows. Lateral movement. Python: MAC changer, port scanner, subdomain bruter, login bruteforcer. AI-assisted recon & scripting. DeepSeek locally. Prompt injection basics.",
    labs: ["L33", "L34", "L35", "L36"],
    estimatedHours: 24,
    checkpoint:
      "3 VulnMachines writeups + 2 Python scripts (port scanner + subdomain bruter) submitted.",
    resources: ["VulnMachines", "HackTheBox Starting Point", "PentestGPT", "GitHub: ippsec"],
  },
  {
    week: 12,
    month: 3,
    theme: "Exploitation + Reporting",
    modules: ["m14", "m15"],
    keyTopics:
      "SOC structure & defensive overview. Log analysis (Windows Event Viewer). Network traffic analysis (Wireshark). Malware detection (VirusTotal). Incident response lifecycle. YARA basics. Certifications roadmap (eJPT, CEH, OSCP). Career roles. Bug bounty intro. CTF competitions.",
    labs: ["L37", "L38"],
    estimatedHours: 26,
    checkpoint:
      "CAPSTONE: 48-hr pentest sim. Submit full pentest report (scope, recon, exploitation, recommendations).",
    resources: ["TryHackMe SOC Level 1", "eJPT exam prep", "OffSec Learning", "INE.com"],
  },
  {
    week: 13,
    month: 4,
    theme: "Advanced Offensive Security",
    modules: ["m16"],
    keyTopics:
      "Kerberos fundamentals (KDC, TGT/TGS). Kerberoasting. AS-REP Roasting. Pass-the-Hash. Golden & Silver Tickets. DCSync. AD enumeration (PowerView, SharpHound, ldapsearch). Full attack-path chaining.",
    labs: ["L16"],
    estimatedHours: 14,
    checkpoint:
      "Written attack-path narrative: enumerate a sample AD dataset, identify a Kerberoastable account, and trace the full chain to Domain Admin.",
    resources: ["HackTricks - Active Directory", "harmj0y's blog", "Impacket (GitHub)", "Mimikatz (GitHub)"],
  },
  {
    week: 14,
    month: 4,
    theme: "Advanced Offensive Security",
    modules: ["m17"],
    keyTopics:
      "Windows privesc enumeration methodology. Unquoted service paths & weak ACLs. AlwaysInstallElevated. Token impersonation (PrintSpoofer, RoguePotato, JuicyPotatoNG). Scheduled task & DLL hijacking. SSH tunneling. chisel & ligolo-ng. proxychains.",
    labs: ["L49"],
    estimatedHours: 15,
    checkpoint: "TryHackMe Windows PrivEsc room solved to SYSTEM, plus a working self-built SSH tunnel demo.",
    resources: ["HackTricks - Windows Privilege Escalation", "PayloadsAllTheThings", "chisel (GitHub)", "ligolo-ng (GitHub)"],
  },
  {
    week: 15,
    month: 4,
    theme: "Advanced Offensive Security",
    modules: ["m18", "m19"],
    keyTopics:
      "Buffer overflow methodology: stack layout, fuzzing, offset discovery, EIP control, bad-character analysis, JMP ESP, shellcode. Wireless: 802.11 fundamentals, WPA2 4-way handshake, aircrack-ng capture/crack workflow, WPS attacks, Evil Twin concept.",
    labs: ["L52", "L50"],
    estimatedHours: 17,
    checkpoint: "TryHackMe Buffer Overflow Prep solved end to end, plus a real (or sample) WPA2 handshake cracked.",
    resources: ["corelan.be Exploit Writing Tutorials", "Aircrack-ng documentation", "hashcat"],
  },
  {
    week: 16,
    month: 4,
    theme: "Advanced Offensive Security",
    modules: ["m20", "m21"],
    keyTopics:
      "Cloud shared-responsibility model. AWS IAM & least privilege. S3 misconfiguration. EC2 metadata-service SSRF. Azure AD basics. CloudTrail/GuardDuty. Secrets exposure. CVSS v3.1 scoring. Executive summaries. Technical finding structure. Remediation prioritisation.",
    labs: ["L53", "L51"],
    estimatedHours: 22,
    checkpoint:
      "flAWS.cloud levels completed, plus a full written report (CVSS-scored findings, exec summary, one full technical finding) for your L38 capstone.",
    resources: ["flAWS.cloud", "AWS IAM documentation", "FIRST.org CVSS v3.1 Specification", "TCM Security sample reports"],
  },
]
