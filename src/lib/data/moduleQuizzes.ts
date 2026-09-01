import type { ModuleQuiz } from "@/types"
export const MODULE_QUIZZES: ModuleQuiz[] = [
  {
    moduleId: "m0",
    questions: [
      {
        question:
          "Which sequence correctly represents the boot chain from power-on to OS load?",
        options: [
          "POST -> firmware reads partition table -> boot loader -> kernel -> init (systemd)",
          "init -> kernel -> boot loader -> firmware -> POST",
          "boot loader -> kernel -> POST -> firmware",
          "kernel -> POST -> init -> boot loader",
        ],
        correctIndex: 0,
        explanation:
          "Firmware runs POST, reads the partition table, hands off to the boot loader, which loads the kernel, which finally starts the init process.",
      },
      {
        question:
          "A forensic examiner wants to recover encryption keys from a running suspect machine. What should they capture first?",
        options: [
          "A RAM dump, before the machine is powered off, since RAM is volatile",
          "The ROM contents, since they never change",
          "The optical drive contents",
          "The GPU's frame buffer only",
        ],
        correctIndex: 0,
        explanation:
          "RAM is volatile and can hold live encryption keys/passwords, so it must be captured before shutdown or that evidence is lost.",
      },
      {
        question: "Which storage/security pairing is correct?",
        options: [
          "SSD TRIM/wear-levelling complicates forensic recovery of deleted data",
          "HDD data is impossible to recover once deleted",
          "ROM is volatile and lost on power-off",
          "NVMe always disables encryption",
        ],
        correctIndex: 0,
        explanation:
          "SSD/NVMe TRIM and wear-levelling relocate and clear data in ways that make forensic recovery unreliable, unlike HDDs where deleted data is often recoverable.",
      },
      {
        question:
          "Why does a stack buffer overflow give an attacker code execution?",
        options: [
          "It overwrites the return address/instruction pointer so the CPU jumps to attacker-controlled code",
          "It directly modifies the GPU shader",
          "It rewrites the BIOS ROM permanently",
          "It corrupts the MBR partition table",
        ],
        correctIndex: 0,
        explanation:
          "Overwriting the saved return address redirects the CPU's instruction pointer to code the attacker controls.",
      },
      {
        question:
          "Which firmware feature specifically defends the boot chain against unsigned bootkits?",
        options: ["Secure Boot", "TRIM", "EEPROM", "POST alone"],
        correctIndex: 0,
        explanation:
          "Secure Boot verifies bootloader signatures, blocking unsigned bootkits from persisting even through a reimage.",
      },
      {
        question: "What distinguishes UEFI from legacy BIOS?",
        options: [
          "UEFI uses GPT partitioning, offers a GUI, and supports Secure Boot, whereas BIOS uses MBR and a text-only interface",
          "UEFI is slower and lacks a GUI",
          "BIOS supports Secure Boot but UEFI does not",
          "BIOS uses GPT and UEFI uses MBR",
        ],
        correctIndex: 0,
        explanation:
          "UEFI modernises firmware with GPT partitioning (supporting >2TB disks), a graphical interface, and Secure Boot support.",
      },
      {
        question:
          "Why is GPU parallelism attractive for both graphics rendering and password cracking?",
        options: [
          "GPUs can perform many simple calculations, like hash attempts, simultaneously across many cores",
          "GPUs execute one instruction per clock cycle like a CPU",
          "GPUs store the OS kernel",
          "GPUs replace ROM firmware",
        ],
        correctIndex: 0,
        explanation:
          "A GPU's many parallel cores let it try huge numbers of hash computations at once, which is why tools like Hashcat rely on GPUs.",
      },
      {
        question: "What happens immediately after POST completes successfully?",
        options: [
          "Firmware reads the boot device's partition table (MBR/GPT) and hands off to the boot loader",
          "The kernel starts the init process directly",
          "The OS desktop is rendered",
          "The CPU begins the fetch-decode-execute cycle for the first time",
        ],
        correctIndex: 0,
        explanation:
          "After POST verifies hardware, firmware reads the partition table and passes control to the boot loader, well before the kernel or desktop load.",
      },
      {
        question: "Which statement about RAM vs ROM is correct?",
        options: [
          "RAM is volatile working memory; ROM/EEPROM is non-volatile and holds firmware like BIOS settings",
          "RAM is non-volatile; ROM is volatile",
          "Both RAM and ROM lose contents on power-off",
          "ROM holds actively running processes",
        ],
        correctIndex: 0,
        explanation:
          "RAM loses its contents without power, while ROM/EEPROM retains firmware such as BIOS/UEFI settings across power cycles.",
      },
      {
        question:
          "A Windows machine using BitLocker is seized while still running and powered on. Why might capturing RAM first be critical?",
        options: [
          "The disk's encryption key may only be recoverable from RAM while the system is unlocked and powered on",
          "ROM always contains the BitLocker key in plaintext",
          "RAM has no forensic value once a disk image exists",
          "BitLocker keys are stored on the motherboard silkscreen",
        ],
        correctIndex: 0,
        explanation:
          "Encryption keys held in memory disappear once power is lost, so capturing RAM live is often the only way to recover them before the volume locks.",
      },
    ],
  },
  {
    moduleId: "m1",
    questions: [
      {
        question:
          "Which three pillars does every security control map back to in the CIA Triad?",
        options: [
          "Confidentiality, Integrity, Availability",
          "Authentication, Authorization, Accounting",
          "Prevention, Detection, Response",
          "Encryption, Hashing, Backups",
        ],
        correctIndex: 0,
        explanation:
          "The CIA Triad - Confidentiality, Integrity, Availability - is the foundational model every security control maps to.",
      },
      {
        question:
          "A ransomware attack that encrypts a company's files and demands payment most directly threatens which CIA pillar?",
        options: [
          "Availability, since legitimate users can no longer access their data",
          "Only Confidentiality",
          "Only Integrity",
          "None of the pillars",
        ],
        correctIndex: 0,
        explanation:
          "By denying legitimate access to data until a ransom is paid, ransomware primarily attacks availability.",
      },
      {
        question:
          "Which domain would a red teamer performing an authorised simulated attack belong to?",
        options: [
          "Offensive Security",
          "GRC",
          "Defensive Security",
          "It is not a recognised security domain",
        ],
        correctIndex: 0,
        explanation:
          "Offensive Security covers pentesting, red teaming, and bug bounty work - simulating attacks to find vulnerabilities first.",
      },
      {
        question:
          "Which term describes a sophisticated, long-term, often state-sponsored attack campaign?",
        options: ["APT (Advanced Persistent Threat)", "CVE", "IOC", "TTP"],
        correctIndex: 0,
        explanation:
          "APT specifically refers to a sophisticated, long-term, often state-sponsored campaign, distinct from a single CVE, IOC, or TTP.",
      },
      {
        question: "What is the difference between a CVE and a CWE?",
        options: [
          "CVE is a specific known vulnerability instance; CWE is the general class/root-cause weakness behind it",
          "CVE is a root-cause weakness class; CWE is a specific instance",
          "They are exact synonyms",
          "CWE only applies to network vulnerabilities",
        ],
        correctIndex: 0,
        explanation:
          "CVE-2021-44228 (Log4Shell) is one specific vulnerability, while a CWE like CWE-79 describes the general weakness class (e.g. behind all XSS).",
      },
      {
        question:
          "Before testing any system you don't own, what must you always obtain first?",
        options: [
          "Written authorisation (Rules of Engagement)",
          "A screenshot of the login page",
          "A CVE number for the target",
          "Access to a lab platform's VPN",
        ],
        correctIndex: 0,
        explanation:
          "Written authorisation defining scope and rules of engagement is required before testing any system that isn't yours, regardless of intent.",
      },
      {
        question:
          "Which attack technique commonly relies on ARP spoofing to intercept traffic between two parties?",
        options: ["MITM (Man-in-the-Middle)", "DDoS", "Ransomware", "Phishing"],
        correctIndex: 0,
        explanation:
          "ARP spoofing lets an attacker position themselves between two hosts on a LAN, which is a classic MITM technique.",
      },
      {
        question:
          "Encrypting a sensitive file so only authorised staff can read it directly protects which CIA pillar?",
        options: [
          "Confidentiality",
          "Integrity",
          "Availability",
          "Non-repudiation",
        ],
        correctIndex: 0,
        explanation:
          "Restricting readability to authorised parties is the definition of confidentiality.",
      },
      {
        question:
          "Which vocabulary term specifically describes evidence of a breach, such as a suspicious IP or file hash?",
        options: ["IOC (Indicator of Compromise)", "TTP", "Zero-Day", "APT"],
        correctIndex: 0,
        explanation:
          "An IOC is concrete evidence of compromise, such as a malicious IP, hash, or registry key, distinct from TTPs which describe attacker behaviour.",
      },
      {
        question:
          "Why is 'responsible disclosure' considered an ethical requirement rather than optional?",
        options: [
          "It gives the vendor a chance to fix a vulnerability before any public release, preventing real-world exploitation",
          "It guarantees a bug bounty payout",
          "It is legally mandated identically in every country with no exceptions",
          "It replaces the need for authorisation entirely",
        ],
        correctIndex: 0,
        explanation:
          "Responsible disclosure protects users by letting the vendor patch the flaw before details become public and exploitable.",
      },
    ],
  },
  {
    moduleId: "m2",
    questions: [
      {
        question:
          "Which model do real-world networks actually run on, versus the theoretical 7-layer reference model?",
        options: [
          "TCP/IP (4 layers)",
          "OSI (7 layers) exclusively",
          "Both are used identically in practice with no distinction",
          "Neither model reflects real traffic",
        ],
        correctIndex: 0,
        explanation:
          "TCP/IP is the practical engine real networks run on, while OSI serves mainly as a theoretical reference/vocabulary model.",
      },
      {
        question: "A /24 network provides how many usable host addresses?",
        options: ["254", "256", "128", "62"],
        correctIndex: 0,
        explanation:
          "A /24 has 256 total addresses, minus the network and broadcast addresses, leaving 254 usable.",
      },
      {
        question: "Which port/protocol pairing is correct?",
        options: [
          "HTTPS uses port 443 with TLS encryption",
          "SSH uses port 21",
          "DNS uses port 80",
          "RDP uses port 22",
        ],
        correctIndex: 0,
        explanation:
          "HTTPS runs on port 443 over TLS; SSH is 22, FTP is 21, and RDP is 3389, not the values in the distractor options.",
      },
      {
        question:
          "What does ARP spoofing exploit to enable a Man-in-the-Middle attack?",
        options: [
          "Trusting unauthenticated ARP replies that map an IP address to a MAC address",
          "A weakness in the TCP 3-way handshake",
          "A flaw in DNS TTL values",
          "A misconfigured NAT gateway",
        ],
        correctIndex: 0,
        explanation:
          "ARP has no built-in authentication, so an attacker can send forged replies mapping their MAC to a victim's IP, enabling interception.",
      },
      {
        question:
          "Which transport protocol would a live video call typically use, and why?",
        options: [
          "UDP, because it favours speed over guaranteed delivery",
          "TCP, because ordered delivery matters more than speed",
          "ICMP, because it is the fastest transport protocol",
          "ARP, because it operates at Layer 4",
        ],
        correctIndex: 0,
        explanation:
          "Real-time services like video calls favour UDP's speed over TCP's delivery guarantees, tolerating occasional dropped packets.",
      },
      {
        question:
          "Which device operates at Layer 3 and can enforce ACLs between different networks?",
        options: ["Router", "Hub", "Unmanaged switch", "Repeater"],
        correctIndex: 0,
        explanation:
          "Routers forward traffic between networks based on IP and can enforce access control lists, unlike Layer 1/2 devices.",
      },
      {
        question:
          "What is the main advantage of a stateful firewall over a simple packet filter?",
        options: [
          "It tracks ongoing connection state/context rather than evaluating each packet in isolation",
          "It cannot inspect TCP traffic at all",
          "It is always slower with no added benefit",
          "It operates only at Layer 1",
        ],
        correctIndex: 0,
        explanation:
          "Stateful inspection understands the context of an ongoing connection, giving more accurate filtering than a stateless packet filter.",
      },
      {
        question:
          "Why does an organisation deploy NAT even though it complicates inbound connections?",
        options: [
          "To conserve scarce public IPv4 addresses by sharing one public IP across many internal devices",
          "To speed up DNS resolution",
          "To provide encryption for internal traffic",
          "To eliminate the need for a firewall",
        ],
        correctIndex: 0,
        explanation:
          "NAT's core purpose is address conservation, sharing one public IP among many internal hosts, at the cost of needing port forwarding for inbound access.",
      },
      {
        question:
          "When you type a URL and hit Enter, what must occur before the TCP handshake can begin?",
        options: [
          "DNS resolution of the domain to an IP address",
          "The TLS handshake",
          "The HTTP response rendering",
          "An ARP broadcast to the destination server across the internet",
        ],
        correctIndex: 0,
        explanation:
          "The browser must first resolve the domain name to an IP address via DNS before it can open a TCP connection to that IP.",
      },
      {
        question:
          "In Wireshark, which view gives an overall breakdown of captured protocols during a capture-and-label exercise?",
        options: [
          "Statistics -> Protocol Hierarchy",
          "Follow -> TCP Stream only",
          "Capture Options",
          "Preferences -> Appearance",
        ],
        correctIndex: 0,
        explanation:
          "Statistics -> Protocol Hierarchy summarises the proportion of each protocol present in a capture, ideal for an OSI-layer labelling exercise.",
      },
    ],
  },
  {
    moduleId: "m3-linux",
    questions: [
      {
        question:
          "Which combination makes up a Linux distro, and which distro is purpose-built for pentesting?",
        options: [
          "Kernel + software + package manager; Kali Linux is the pentesting-focused distro",
          "Only the kernel; Ubuntu is the pentesting distro",
          "GUI only; Arch is the pentesting distro",
          "Package manager only; Mint is the pentesting distro",
        ],
        correctIndex: 0,
        explanation:
          "A distro bundles kernel, software, and package manager, and Kali is specifically built with pentesting tools pre-installed.",
      },
      {
        question:
          "Where do Linux logs typically live, and where are temporary files cleared on reboot?",
        options: [
          "/var for logs, /tmp for temporary files",
          "/etc for logs, /home for temporary files",
          "/bin for logs, /opt for temporary files",
          "/root for logs, /usr for temporary files",
        ],
        correctIndex: 0,
        explanation:
          "/var holds variable data like logs, while /tmp holds temporary files that are typically cleared on reboot.",
      },
      {
        question:
          "Which octal value would you chmod a file to grant the owner full rwx and deny all access to group/others?",
        options: ["700", "777", "644", "400"],
        correctIndex: 0,
        explanation:
          "700 breaks down as 7 (rwx) for the owner and 0 (---) for both group and others.",
      },
      {
        question:
          "Why is a world-writable SUID binary owned by root considered dangerous?",
        options: [
          "An attacker could modify or exploit it and inherit root privileges regardless of who invoked it",
          "It disables all execute permissions for everyone",
          "It only affects directories, never binaries",
          "It automatically gets removed by the kernel at boot",
        ],
        correctIndex: 0,
        explanation:
          "SUID makes a binary run with its owner's (root's) privileges, so a writable or exploitable SUID root binary is a direct path to privilege escalation.",
      },
      {
        question:
          "Which command finds all SUID binaries on a Linux filesystem for a privesc audit?",
        options: [
          "find / -perm -4000 -type f 2>/dev/null",
          "chmod -s /",
          "ls -la /root",
          "locate SUID",
        ],
        correctIndex: 0,
        explanation:
          "find / -perm -4000 -type f searches the whole filesystem for files with the SUID bit set.",
      },
      {
        question:
          "What is the key difference between 'systemctl start' and 'systemctl enable' for a service?",
        options: [
          "start runs it now only; enable makes it persist across reboots",
          "They are functionally identical",
          "enable runs it now only; start makes it persist forever",
          "start disables the service permanently",
        ],
        correctIndex: 0,
        explanation:
          "start affects only the current session, whereas enable configures the service to also launch automatically on future boots.",
      },
      {
        question:
          "Which tool captures live traffic for later Wireshark analysis, and which command shows listening ports?",
        options: [
          "tcpdump for capture; ss -tulpn for listening ports",
          "iptables for capture; crontab for listening ports",
          "ps aux for capture; man for listening ports",
          "apt for capture; chmod for listening ports",
        ],
        correctIndex: 0,
        explanation:
          "tcpdump -w saves captured packets to a .pcap file, and ss -tulpn (or netstat -tulpn) lists listening ports.",
      },
      {
        question:
          "Where does Linux store actual password hashes, separate from general user metadata?",
        options: [
          "/etc/shadow, readable only by root",
          "/etc/passwd, world-readable",
          "/etc/group",
          "/home/<user>/.bash_history",
        ],
        correctIndex: 0,
        explanation:
          "Password hashes live in the root-only-readable /etc/shadow, while /etc/passwd only stores non-sensitive metadata.",
      },
      {
        question:
          "Why is a world-writable script invoked by a root cron job a classic privilege-escalation vector?",
        options: [
          "A low-privileged user can modify the script and have their code run as root the next time cron fires it",
          "Cron jobs never actually execute as root",
          "Crontab files cannot reference scripts, only built-in commands",
          "World-writable files are automatically quarantined by cron",
        ],
        correctIndex: 0,
        explanation:
          "If cron runs a script as root and an unprivileged user can edit that script, their injected commands then run with root privileges.",
      },
      {
        question:
          "What is the practical difference between find and locate when searching the filesystem?",
        options: [
          "find searches live and reflects the current state; locate uses a prebuilt index that can be stale",
          "find and locate are functionally identical in every way",
          "locate always searches live; find uses a cached index",
          "find can only locate directories",
        ],
        correctIndex: 0,
        explanation:
          "find walks the live filesystem in real time, while locate is faster but relies on a periodically-updated index that can be out of date.",
      },
    ],
  },
  {
    moduleId: "m3-windows",
    questions: [
      {
        question:
          "Which privilege ring does Kernel Mode run in, and what typically happens if it crashes?",
        options: [
          "Ring 0; a kernel crash typically causes a BSOD",
          "Ring 3; a kernel crash silently restarts one app",
          "Ring 1; a kernel crash only affects networking",
          "Ring 2; a kernel crash requires no reboot",
        ],
        correctIndex: 0,
        explanation:
          "Kernel Mode runs at Ring 0 with full hardware access, so a crash there can bring down the whole system as a BSOD.",
      },
      {
        question:
          "Which command-line tool edits ACL permissions on NTFS files, and what wins when NTFS and share permissions conflict?",
        options: [
          "icacls; the most restrictive permission wins",
          "chmod; the least restrictive permission wins",
          "regedit; NTFS always wins regardless",
          "net user; the share permission always wins",
        ],
        correctIndex: 0,
        explanation:
          "icacls manages NTFS ACLs from the command line, and when NTFS and share permissions differ, the more restrictive of the two applies.",
      },
      {
        question:
          "Which registry hive holds system-wide settings, and which sub-path is a classic persistence mechanism?",
        options: [
          "HKEY_LOCAL_MACHINE; the ...\\Run keys",
          "HKEY_CURRENT_USER only; HKEY_CLASSES_ROOT\\Run",
          "HKEY_USERS; HKLM\\Boot",
          "HKEY_CLASSES_ROOT; HKCU\\Software\\Explorer",
        ],
        correctIndex: 0,
        explanation:
          "HKLM stores system-wide configuration, and the Run keys under HKLM/HKCU auto-launch programs at login, a common persistence mechanism.",
      },
      {
        question:
          "What does UAC do, and which command adds a user to the local administrators group?",
        options: [
          "Prompts for consent before privileged actions; net localgroup administrators user /add",
          "Blocks all admin actions permanently; net user administrators /add",
          "Grants admin silently; icacls administrators /add",
          "Disables Group Policy; net group administrators /add",
        ],
        correctIndex: 0,
        explanation:
          "UAC prompts for consent/credentials before elevated actions, and net localgroup administrators <user> /add adds a user to the local admins group.",
      },
      {
        question:
          "Which Event IDs correspond to successful and failed logons respectively?",
        options: [
          "4624 (success) and 4625 (failure)",
          "4625 (success) and 4624 (failure)",
          "1074 (success) and 1033 (failure)",
          "4657 (success) and 1074 (failure)",
        ],
        correctIndex: 0,
        explanation:
          "Event ID 4624 logs successful logons, while 4625 logs failed logon attempts, together enabling brute-force detection.",
      },
      {
        question:
          "What hardware component does BitLocker rely on to bind the encryption key to specific hardware?",
        options: [
          "TPM (Trusted Platform Module)",
          "the GPU",
          "the CMOS battery",
          "the network adapter's MAC address",
        ],
        correctIndex: 0,
        explanation:
          "BitLocker seals its encryption key to the TPM, ensuring the key is tied to that specific machine's hardware.",
      },
      {
        question:
          "Which taskkill flags force-kill a process along with its child processes?",
        options: ["/F /T /IM", "/S /Q", "/X /Y", "/A /L"],
        correctIndex: 0,
        explanation:
          "/F forces termination, /T also terminates the process's child tree, and /IM specifies the target image name.",
      },
      {
        question:
          "What does PowerShell's Invoke-Expression do, and why is it notable to defenders?",
        options: [
          "It executes a string as code, a common living-off-the-land technique attackers abuse",
          "It only shows cmdlet help text, harmless from a security perspective",
          "It permanently locks the execution policy to Restricted",
          "It only works when run remotely via RDP",
        ],
        correctIndex: 0,
        explanation:
          "Invoke-Expression runs arbitrary text as PowerShell code, making it a favoured living-off-the-land technique for attackers.",
      },
      {
        question:
          "Which command shows a Windows service's RUNNING/STOPPED state from CMD, and which PowerShell cmdlet does the equivalent?",
        options: [
          "sc query; Get-Service",
          "tasklist; Get-Process",
          "icacls; Get-Acl",
          "wmic; Get-WmiObject only",
        ],
        correctIndex: 0,
        explanation:
          "sc query reports a service's state from CMD, and Get-Service is the PowerShell cmdlet that reports the same information.",
      },
      {
        question:
          "Which netsh command adds a new inbound firewall rule, and which PowerShell cmdlet lists existing firewall rules?",
        options: [
          "netsh advfirewall firewall add rule ...; Get-NetFirewallRule",
          "netsh advfirewall show allprofiles; Get-MpComputerStatus",
          "MpCmdRun.exe; Get-Service",
          "manage-bde; Get-LocalUser",
        ],
        correctIndex: 0,
        explanation:
          "netsh advfirewall firewall add rule creates a new rule, and Get-NetFirewallRule is the PowerShell cmdlet for listing configured firewall rules.",
      },
    ],
  },
  {
    moduleId: "m4",
    questions: [
      {
        question:
          "Which combination of cookie flags best protects a session cookie from both XSS-based theft and being sent over plaintext HTTP?",
        options: [
          "SameSite=Lax only",
          "HttpOnly + Secure",
          "Domain + Path",
          "Max-Age only",
        ],
        correctIndex: 1,
        explanation:
          "HttpOnly blocks JS access (XSS theft) and Secure ensures the cookie is only sent over HTTPS.",
      },
      {
        question:
          "Which statement best explains why the SDLC's 'testing' phase should not be the only place security is addressed?",
        options: [
          "Because shift-left security (e.g. SAST/code review earlier) catches issues cheaper and earlier than a pentest at the end",
          "Because testing is optional in the SDLC",
          "Because deployment happens before development",
          "Because maintenance has no security relevance",
        ],
        correctIndex: 0,
        explanation:
          "Shift-left integrates security earlier (design/development) rather than relying solely on end-stage testing.",
      },
      {
        question:
          "A pentester finds that a mobile app's PIN check logic is implemented entirely in the app's local code with no server-side re-check. What is the most accurate assessment?",
        options: [
          "This is secure because mobile apps can't be reverse engineered",
          "This is a security flaw since client-side/on-device logic can be bypassed via static analysis or patched",
          "This is fine because APIs are always secure",
          "Mobile apps cannot contain security logic at all",
        ],
        correctIndex: 1,
        explanation:
          "Mobile app logic partly runs on-device and can be statically analysed/tampered with, so critical checks must be enforced server-side.",
      },
      {
        question:
          "Why is Broken Access Control fundamentally different from a failed login attempt?",
        options: [
          "Access control governs authorization (what an authenticated user can do) whereas login governs authentication (who you are)",
          "They are the same vulnerability",
          "Access control only applies to APIs",
          "Login failures are a subset of RBAC",
        ],
        correctIndex: 0,
        explanation:
          "Authentication answers 'who are you'; authorization (RBAC/ABAC) answers 'what are you allowed to do' -- access control flaws are authorization failures.",
      },
      {
        question:
          "Which HTTP status code range indicates a client-side error, such as an unauthorized or malformed request?",
        options: ["2xx", "3xx", "4xx", "5xx"],
        correctIndex: 2,
        explanation:
          "4xx codes (401, 403, 404) represent client errors, distinct from 3xx redirects and 5xx server errors.",
      },
      {
        question:
          "Why does NoSQL injection require different payloads than SQL injection?",
        options: [
          "NoSQL databases don't accept any input",
          "NoSQL databases like MongoDB use JSON-like query operators (e.g. $ne, $gt) instead of SQL syntax",
          "NoSQL databases are always encrypted",
          "NoSQL databases don't run queries",
        ],
        correctIndex: 1,
        explanation:
          "MongoDB and similar NoSQL databases use operator-based queries, so injection payloads target those operators rather than SQL syntax.",
      },
      {
        question:
          "Which of the following is the strongest reason OAuth2 misconfigured redirect URIs are dangerous?",
        options: [
          "They can allow an attacker to intercept the authorization code/token by redirecting it to an attacker-controlled URL",
          "They slow down the login process",
          "They only affect HTTP status codes",
          "They prevent MFA from being configured",
        ],
        correctIndex: 0,
        explanation:
          "A misconfigured/unvalidated redirect_uri lets an attacker redirect the auth code or token to a server they control, enabling account takeover.",
      },
      {
        question:
          "A thick client application communicating directly with a database using hardcoded credentials embedded in the binary illustrates which risk?",
        options: [
          "A risk unique to web applications only",
          "A risk of thick clients having direct OS/DB access, exposing embedded secrets to reverse engineering",
          "No risk since thick clients aren't network-based",
          "A risk that only exists in REST APIs",
        ],
        correctIndex: 1,
        explanation:
          "Thick clients run natively with direct access to databases/OS, and embedded credentials can be extracted via binary analysis.",
      },
      {
        question:
          "Which pairing correctly matches the security concept to the application-basics control?",
        options: [
          "SameSite cookie flag mitigates CSRF (integrity of session use)",
          "HttpOnly encrypts the database",
          "REST is an authentication protocol",
          "ABAC is a hashing algorithm",
        ],
        correctIndex: 0,
        explanation:
          "SameSite specifically blocks cross-site request forgery by controlling when cookies are sent cross-site.",
      },
      {
        question:
          "Which statement about the relationship between frontend validation and backend enforcement is correct?",
        options: [
          "If frontend validation exists, backend validation is redundant",
          "Frontend validation is a UX feature; backend validation is the actual security control",
          "Backend validation should be removed if the frontend already validates",
          "Only mobile apps need backend validation",
        ],
        correctIndex: 1,
        explanation:
          "Since the client (frontend) is fully under the user's control, only server-side (backend) validation can be trusted as a security control.",
      },
    ],
  },
  {
    moduleId: "m5",
    questions: [
      {
        question:
          "Which statement correctly distinguishes encoding from encryption?",
        options: [
          "Encoding requires a secret key to reverse; encryption does not",
          "Encoding is reversible by anyone with no key; encryption requires a key to reverse",
          "Both provide equivalent security guarantees",
          "Encoding is one-way like hashing",
        ],
        correctIndex: 1,
        explanation:
          "Encoding has no security value and is reversible without a key, while encryption requires the correct key.",
      },
      {
        question:
          "Why is it a 'cryptographic failure' (OWASP A02) to hash a password with unsalted SHA-256 instead of bcrypt?",
        options: [
          "SHA-256 is an asymmetric algorithm and can't process passwords",
          "SHA-256 is fast and lacks the deliberate slowness/salting that makes brute-forcing a cracked password database impractical",
          "SHA-256 requires a private key that must be kept secret",
          "bcrypt is not a hashing algorithm",
        ],
        correctIndex: 1,
        explanation:
          "General-purpose fast hashes like SHA-256 make offline brute-force/dictionary attacks on stolen password hashes far easier than deliberately slow, salted bcrypt/Argon2.",
      },
      {
        question:
          "In the TLS chain of trust, if a site's Intermediate CA certificate were compromised, what would be the impact?",
        options: [
          "None, since only Root CAs matter",
          "An attacker could potentially issue fraudulent certificates trusted by anyone who trusts that Root CA",
          "It would only affect Base64 encoding",
          "It would break AES only",
        ],
        correctIndex: 1,
        explanation:
          "Since browsers trust the Root CA and everything it (or its Intermediates) signs, a compromised Intermediate CA can issue fraudulent trusted certificates.",
      },
      {
        question:
          "Which pairing correctly matches an algorithm to its category?",
        options: [
          "AES is asymmetric",
          "RSA is symmetric",
          "bcrypt is a password hashing algorithm",
          "Diffie-Hellman is a hash function",
        ],
        correctIndex: 2,
        explanation:
          "bcrypt is a password-hashing algorithm; AES is symmetric, RSA is asymmetric, and Diffie-Hellman is a key-exchange protocol.",
      },
      {
        question:
          "What is the core reason Diffie-Hellman/ECDH is needed even though symmetric encryption (AES) is faster than asymmetric encryption?",
        options: [
          "To avoid encryption entirely",
          "To let two parties agree on a shared symmetric key over an untrusted channel before using fast symmetric encryption",
          "To replace hashing",
          "To encode binary data as text",
        ],
        correctIndex: 1,
        explanation:
          "Key exchange protocols solve the 'key exchange problem' so both parties can then use fast symmetric encryption (like AES) with a securely shared key.",
      },
      {
        question:
          "A digital signature verification fails after a file transfer. What does this most likely indicate?",
        options: [
          "The file was encoded in Base64 during transfer",
          "The file was altered/corrupted in transit, breaking the hash-signature match",
          "The verifier used the wrong hash algorithm intentionally",
          "Digital signatures always fail on the first attempt",
        ],
        correctIndex: 1,
        explanation:
          "Verification recomputes the file's hash and compares it against the signed hash; any alteration in transit causes a mismatch and failed verification.",
      },
      {
        question:
          "Which of these is true regarding HTTPS/TLS's use of both symmetric and asymmetric cryptography?",
        options: [
          "TLS uses only asymmetric crypto throughout the session for speed",
          "TLS uses asymmetric crypto (RSA/ECDH) to establish a session key, then switches to fast symmetric crypto (AES) for the bulk data",
          "TLS never uses hashing",
          "TLS uses only Base64 encoding for security",
        ],
        correctIndex: 1,
        explanation:
          "TLS handshakes use asymmetric methods for key exchange/authentication, then symmetric AES for the actual encrypted data transfer -- combining strengths of both.",
      },
      {
        question:
          "Why is Base64 sometimes mistaken by beginners for 'encryption'?",
        options: [
          "Because it uses a secret key",
          "Because the output looks unreadable at a glance even though it requires no key to reverse",
          "Because it's slower than AES",
          "Because it hashes the input",
        ],
        correctIndex: 1,
        explanation:
          "Base64 output looks obfuscated, leading beginners to assume it's secure, when in fact anyone can decode it with no key -- a classic OWASP A02 mistake.",
      },
      {
        question: "What role does a Certificate Authority (CA) play in HTTPS?",
        options: [
          "It generates the website's private key for them",
          "It vouches for/signs the binding between a public key and a domain identity that clients already trust",
          "It encrypts all HTTP traffic directly",
          "It stores users' passwords",
        ],
        correctIndex: 1,
        explanation:
          "A CA signs X.509 certificates, vouching that a given public key belongs to the claimed domain, which browsers trust via the chain of trust.",
      },
      {
        question:
          "When generating an RSA keypair and signing a file with OpenSSL, which key is used to create the signature and which to verify it?",
        options: [
          "Public key to sign, private key to verify",
          "Private key to sign, public key to verify",
          "Both to sign, neither to verify",
          "A symmetric key for both",
        ],
        correctIndex: 1,
        explanation:
          "The signer uses their private key to sign (encrypt the hash); anyone can verify using only the corresponding public key.",
      },
    ],
  },
  {
    moduleId: "m6",
    questions: [
      {
        question:
          "Which network design choice most directly limits how far an attacker can move laterally after compromising one host?",
        options: [
          "A flat network topology",
          "VLAN segmentation with restricted inter-VLAN routing",
          "Removing all VPNs",
          "Disabling DNS",
        ],
        correctIndex: 1,
        explanation:
          "Segmenting into VLANs with controlled Layer-3 routing between them limits lateral movement compared to a flat network.",
      },
      {
        question:
          "In a properly designed DMZ, why is DMZ-to-Internal traffic strictly restricted while Internet-to-DMZ is allowed?",
        options: [
          "Because the DMZ hosts public-facing services that need external reachability but must not become a stepping stone into sensitive internal systems",
          "Because DMZ servers are more trusted than internal ones",
          "Because Internet-to-Internal is always allowed instead",
          "Because DMZ has no firewall rules at all",
        ],
        correctIndex: 0,
        explanation:
          "The DMZ intentionally isolates internet-facing services so that if one is compromised, the attacker still can't freely reach the internal LAN.",
      },
      {
        question:
          "Why is Active Directory typically the single highest-value target in a corporate pentest?",
        options: [
          "It has no valuable data",
          "Compromising AD (e.g. reaching Domain Admin) grants centralized control over users, computers, and permissions across the whole domain",
          "AD only manages printers",
          "AD is always isolated in its own DMZ",
        ],
        correctIndex: 1,
        explanation:
          "Because AD centrally manages authentication and authorization for the whole Windows network, gaining Domain Admin effectively compromises the entire domain.",
      },
      {
        question:
          "How does Zero Trust's 'assume breach' principle change traditional perimeter-based security thinking?",
        options: [
          "It assumes the perimeter firewall alone is sufficient",
          "It assumes an attacker may already be inside, so every request must be verified regardless of network location",
          "It removes the need for authentication",
          "It only applies to external users",
        ],
        correctIndex: 1,
        explanation:
          "Zero Trust assumes the perimeter can't be fully trusted and continuously verifies every request, rather than trusting anything already 'inside'.",
      },
      {
        question:
          "An EDR solution flags unusual process behavior that a signature-based AV missed entirely. What best explains this difference in detection capability?",
        options: [
          "EDR uses real-time behavioural analysis rather than only matching known malware signatures",
          "EDR is simply a rebranded antivirus with no functional difference",
          "Signature-based AV is always superior",
          "EDR only scans files at rest",
        ],
        correctIndex: 0,
        explanation:
          "EDR's continuous behavioural monitoring can detect anomalous activity that static signature matching in traditional AV would miss.",
      },
      {
        question:
          "Which combination of controls would best defend a public-facing web application against both network-layer scanning and application-layer attacks like SQLi?",
        options: [
          "An NGFW alone with no WAF",
          "A WAF for HTTP/HTTPS payload inspection plus an NGFW/firewall for broader network-layer filtering",
          "Only network segmentation with no firewall at all",
          "Disabling all logging to improve performance",
        ],
        correctIndex: 1,
        explanation:
          "A WAF is purpose-built to catch SQLi/XSS-style payloads in HTTP traffic, while an NGFW provides broader network and application-aware filtering -- together they form layered defence.",
      },
      {
        question:
          "Why might anomaly-based IDS generate more false positives than signature-based IDS, despite catching more novel attacks?",
        options: [
          "Because it flags any deviation from a learned baseline of 'normal' behaviour, which can include legitimate but unusual activity",
          "Because it only checks a fixed list of known bad signatures",
          "Because it never analyses live traffic",
          "Because it is identical to a WAF",
        ],
        correctIndex: 0,
        explanation:
          "Anomaly detection is more sensitive to any deviation from the baseline, which increases the chance of flagging legitimate but atypical behaviour as suspicious.",
      },
      {
        question:
          "In VDI, why does keeping data 'on the server' rather than the endpoint reduce risk?",
        options: [
          "Because a lost/stolen endpoint device does not itself contain sensitive corporate data",
          "Because it eliminates the need for a hypervisor",
          "Because it removes the need for a Connection Broker",
          "Because it disables remote display protocols",
        ],
        correctIndex: 0,
        explanation:
          "Since the actual desktop/data runs on centralized servers and is only streamed to the endpoint, a compromised or stolen endpoint doesn't expose the underlying data directly.",
      },
      {
        question:
          "A pentester gains a foothold on a workstation in the Finance VLAN. Under a well-segmented Zero Trust corporate network, what should NOT happen next?",
        options: [
          "The pentester should be automatically able to reach the Domain Controller and HR VLAN without further authentication or verification",
          "The pentester's further requests should still be verified/authenticated even though they're inside the network",
          "Micro-segmentation should still limit which other segments are reachable",
          "The workstation being compromised should still trigger monitoring/alerts",
        ],
        correctIndex: 0,
        explanation:
          "Under Zero Trust and proper segmentation, being on one VLAN should not grant free lateral access to the Domain Controller or other VLANs without further verification.",
      },
      {
        question:
          "Which statement correctly ranks these technologies by where they primarily operate in a defence-in-depth stack?",
        options: [
          "WAF (Layer 7 app traffic), EDR (endpoint), IDS/IPS (network traffic), AD/Zero Trust (identity/access)",
          "All of these operate at exactly the same layer",
          "EDR operates at Layer 3 only",
          "WAF replaces the need for IDS/IPS entirely",
        ],
        correctIndex: 0,
        explanation:
          "Each control targets a different layer: WAF inspects application-layer HTTP traffic, EDR protects the endpoint itself, IDS/IPS monitors network traffic, and AD/Zero Trust governs identity and access -- together forming layered defence.",
      },
    ],
  },
  {
    moduleId: "m7",
    questions: [
      {
        question:
          "Which two phases of the 5-phase hacking lifecycle does this module focus on in depth?",
        options: [
          "Gaining Access and Maintaining Access",
          "Reconnaissance and Scanning",
          "Covering Tracks and Maintaining Access",
          "Only Gaining Access",
        ],
        correctIndex: 1,
        explanation:
          "The module description states it covers Recon and Scanning deeply, while Access/Exploitation is covered in M9-M11.",
      },
      {
        question:
          "Why should a pentester perform passive OSINT before any active Nmap scanning?",
        options: [
          "Passive OSINT is illegal so it must be done last",
          "Passive recon gathers intelligence without alerting the target, informing a more efficient/targeted active scan afterward",
          "Active scanning must always come first per RoE",
          "Passive OSINT replaces the need for authorization",
        ],
        correctIndex: 1,
        explanation:
          "Passive recon (WHOIS, Shodan, Google dorking) gathers information without touching the target, letting the pentester plan active scanning more effectively before it begins.",
      },
      {
        question:
          "A scan reveals a service running vsftpd 2.3.4. What is the correct next professional step before attempting exploitation?",
        options: [
          "Immediately run an untested exploit against a production system with no authorization check",
          "Cross-reference the version against CVE Details/Exploit-DB to confirm a known vulnerability (e.g. CVE-2011-2523) and confirm it's within authorised scope",
          "Ignore the finding since version detection is unreliable",
          "Change the finding's severity to Critical without verification",
        ],
        correctIndex: 1,
        explanation:
          "The workflow in this module is to identify service versions via -sV, then research known CVEs, and always confirm the target is within the authorised Rules of Engagement scope.",
      },
      {
        question:
          "Why does subdomain enumeration matter even if the main domain is already thoroughly hardened?",
        options: [
          "Subdomains are never in scope",
          "Subdomains often run older, forgotten, or less-hardened applications, significantly expanding the real attack surface",
          "Subdomains cannot be scanned with subfinder/amass",
          "Only the root domain can ever be vulnerable",
        ],
        correctIndex: 1,
        explanation:
          "Legacy or forgotten subdomains frequently run outdated, less-monitored applications, making them valuable additional attack surface.",
      },
      {
        question:
          "What distinguishes a credentialed Nessus scan from a non-credentialed one, and why does it matter?",
        options: [
          "Credentialed scans log into the target for deeper, more accurate visibility into installed software and misconfigurations, whereas non-credentialed scans only see externally visible signals",
          "There is no practical difference",
          "Non-credentialed scans are always more accurate",
          "Credentialed scans cannot detect CVEs",
        ],
        correctIndex: 0,
        explanation:
          "Credentialed scans provide much deeper visibility (patch levels, local misconfigurations) than non-credentialed external-only scans.",
      },
      {
        question:
          "Which statement correctly distinguishes vertical from horizontal privilege escalation?",
        options: [
          "Vertical means gaining a higher privilege tier (e.g. user to admin); Horizontal means accessing another same-level user's data",
          "Vertical means accessing another user's data; Horizontal means gaining admin rights",
          "They are synonyms for the same concept",
          "Both only apply to Windows systems",
        ],
        correctIndex: 0,
        explanation:
          "Vertical privesc raises your privilege level; horizontal privesc accesses peer data at the same privilege level -- both are conceptually introduced here and expanded hands-on in M11.",
      },
      {
        question:
          "What is the primary purpose of the Executive Summary in a pentest report, as opposed to the Detailed Findings section?",
        options: [
          "To list every CVE with full technical PoC steps",
          "To communicate business risk and overall posture to a non-technical audience",
          "To replace the need for CVSS scoring",
          "To document Nmap command syntax",
        ],
        correctIndex: 1,
        explanation:
          "The Executive Summary is aimed at non-technical stakeholders, summarizing risk and impact, while Detailed Findings holds the technical depth.",
      },
      {
        question:
          "Before conducting any active recon (e.g. an Nmap scan) against a client's systems, what is legally/ethically required?",
        options: [
          "Nothing -- active recon requires no special authorization since it's just scanning",
          "Explicit written authorisation and agreed Rules of Engagement must already be in place",
          "Only a verbal green light from a random employee",
          "Completion of the Nessus scan first",
        ],
        correctIndex: 1,
        explanation:
          "Because active recon directly touches the target and may be noticed, written authorisation and RoE must be established beforehand -- this is the line between a pentest and a crime.",
      },
      {
        question:
          "A tester obtains a low-privilege foothold and notices a scheduled cron job runs as root. What broader post-exploitation category does exploiting this fall under, and what comes next in the lifecycle?",
        options: [
          "Reconnaissance; nothing further happens",
          "Privilege escalation (vertical) leading toward Maintaining Access/persistence if successful",
          "Covering tracks only",
          "Passive OSINT",
        ],
        correctIndex: 1,
        explanation:
          "Exploiting a misconfigured root cron job to escalate is vertical privilege escalation; successful post-exploitation often continues into establishing persistence (Maintaining Access).",
      },
      {
        question:
          "Why does this module emphasize that Nmap's --script vuln output and Nessus findings both still require manual triage rather than blind trust?",
        options: [
          "Because automated scanners can produce false positives/negatives, so findings must be verified and prioritised by an analyst before being included in a report",
          "Because scanners are always 100% accurate",
          "Because manual triage is illegal",
          "Because Nessus and Nmap always agree with each other",
        ],
        correctIndex: 0,
        explanation:
          "Both --script vuln and vulnerability scanners can misfire, so results need human verification and risk-based prioritisation before being reported as confirmed findings.",
      },
    ],
  },
  {
    moduleId: "m8",
    questions: [
      {
        question:
          "Which sequence correctly reflects the standard Burp Suite testing workflow for manually testing a parameter for SQL injection?",
        options: [
          "Decoder, then Comparer, then Scanner",
          "Intercept the request, Send to Repeater, inject and iterate on payloads, observe response differences",
          "Sequencer, then Intruder, then Decoder",
          "Target Scope, then Nessus, then Report",
        ],
        correctIndex: 1,
        explanation:
          "The standard manual-testing workflow is capturing via Proxy/Intercept, sending to Repeater, then iterating payloads and observing responses.",
      },
      {
        question:
          "Why is installing Burp's CA certificate a prerequisite for effectively testing HTTPS traffic?",
        options: [
          "Because Burp performs a man-in-the-middle on TLS, and without the CA trusted, the browser will show certificate warnings",
          "Because HTTP traffic cannot be intercepted without it",
          "Because it enables the Scanner tool",
          "Because it changes the default proxy port",
        ],
        correctIndex: 0,
        explanation:
          "Burp decrypts and re-encrypts HTTPS traffic as a MITM proxy; trusting its CA certificate avoids browser warnings during this process.",
      },
      {
        question:
          "A tester wants to brute-force a login form with both a username list and a password list, testing every combination. Which Intruder attack type is correct?",
        options: [
          "Sniper",
          "Cluster Bomb",
          "Battering Ram",
          "Pitchfork attack type in Scanner",
        ],
        correctIndex: 1,
        explanation:
          "Testing every combination of two independent payload sets (username x password) across two positions is exactly what Cluster Bomb in Intruder is designed for.",
      },
      {
        question:
          "Why does the Community edition's lack of an automated Scanner make Repeater and Intruder especially important in this course?",
        options: [
          "Because without Scanner's automated crawling/testing, manual tools are the primary means of discovering and confirming vulnerabilities",
          "Because Repeater and Intruder replace the need for a proxy",
          "Because Scanner is required to even intercept traffic",
          "Because Community edition cannot capture HTTP traffic at all",
        ],
        correctIndex: 0,
        explanation:
          "Since Community lacks the automated Scanner (a Professional-only feature), manual tools like Repeater and Intruder become the primary way to find and confirm vulnerabilities.",
      },
      {
        question:
          "What is the security implication of Burp being able to freely modify a request after Intercept captures it but before the server sees it?",
        options: [
          "It proves that client-side-only validation and hidden form fields can never be trusted as security controls, since the raw request can always be edited",
          "It has no security implication",
          "It only affects encoding, not application logic",
          "It means HTTPS itself is broken",
        ],
        correctIndex: 0,
        explanation:
          "Since a proxy can freely edit any request field before it reaches the server, any check enforced only in the browser/JS is not a real security control.",
      },
      {
        question:
          "Why would a tester URL-encode a payload like ' OR 1=1 -- using Ctrl+U in Repeater before sending it?",
        options: [
          "To make it render as valid HTML",
          "To ensure special characters in the payload are properly transmitted within the URL/query string without being mangled",
          "To disable the WAF automatically",
          "To convert it into a hash",
        ],
        correctIndex: 1,
        explanation:
          "URL-encoding ensures special characters like spaces and quotes in the payload survive transmission correctly as part of the request.",
      },
      {
        question:
          "A pentester adds only the target application's domain to Burp's Scope. What is the direct benefit during a multi-hour testing session?",
        options: [
          "It automatically encrypts all traffic",
          "It filters the Site map/HTTP History to relevant in-scope traffic, reducing noise from ads/trackers/unrelated domains",
          "It disables Intercept",
          "It replaces the need for FoxyProxy",
        ],
        correctIndex: 1,
        explanation:
          "Scope filtering keeps the Site map and HTTP History focused on the actual target, cutting out unrelated third-party noise.",
      },
      {
        question:
          "In the Intruder password-spray lab against DVWA, why is Grep-Match essential rather than manually reading every response?",
        options: [
          "Grep-Match automatically cracks the password hash",
          "Grep-Match flags which specific response(s) contain a success-only string, letting the tester instantly spot the valid credential among potentially hundreds of attempts",
          "Grep-Match encrypts the wordlist",
          "Grep-Match is required to enable the Sniper attack type",
        ],
        correctIndex: 1,
        explanation:
          "With many payload attempts, manually reviewing every response is impractical -- Grep-Match automatically flags the response(s) matching a success indicator.",
      },
      {
        question:
          "Which statement correctly distinguishes Burp's passive and active scanning (Professional edition)?",
        options: [
          "Passive scanning sends additional crafted requests; active scanning only observes existing traffic",
          "Passive scanning analyses your normal traffic without extra requests; active scanning proactively sends crafted/malicious requests to probe for issues",
          "Both are identical and interchangeable",
          "Passive scanning is only available in Community edition",
        ],
        correctIndex: 1,
        explanation:
          "Passive scanning is non-intrusive, analysing existing traffic; active scanning proactively sends test payloads to look for vulnerabilities.",
      },
      {
        question:
          "What is the fundamental reason Burp Suite is described as essential preparation for the OWASP Top 10 modules (M9/M10) that follow?",
        options: [
          "Because those modules require intercepting, modifying, repeating, and fuzzing HTTP requests, which are exactly the skills built with Burp's Proxy/Repeater/Intruder/Decoder",
          "Because Burp Suite performs automatic exploitation with no manual skill required",
          "Because M9/M10 only test thick client applications",
          "Because Burp Suite is a vulnerability scanner unrelated to manual testing",
        ],
        correctIndex: 0,
        explanation:
          "Nearly every later web-attack lab assumes fluency with Burp's core manual tools for intercepting, modifying, repeating, and fuzzing requests.",
      },
    ],
  },
  {
    moduleId: "m9",
    questions: [
      {
        question:
          "Which vulnerability class is present in 94% of tested applications, per the data cited in this module?",
        options: ["SQL Injection", "Broken Access Control", "XSS", "CSRF"],
        correctIndex: 1,
        explanation:
          "The Broken Access Control topic cites OWASP data showing it appears in 94% of tested applications, the highest prevalence of the classes covered in this module.",
      },
      {
        question:
          "Comparing a UNION-based SQLi payload with a stored XSS payload, what distinguishes their persistence model?",
        options: [
          "SQLi payloads are always more severe than XSS",
          "UNION-based SQLi extracts data in a single request/response; stored XSS persists server-side and re-executes for every subsequent visitor",
          "Both require a victim to click a link",
          "Neither can be automated",
        ],
        correctIndex: 1,
        explanation:
          "UNION-based SQLi is a direct, one-shot data extraction technique, whereas stored XSS's defining trait is that the payload is saved and re-triggers for every future viewer.",
      },
      {
        question:
          'An application blocks the literal string "script" in user input, but a comment payload still executes JavaScript in the browser. What does this represent, and why is blacklisting insufficient?',
        options: [
          "CSRF token bypass — tokens aren't checked at all",
          "XSS filter bypass — blacklisting specific substrings misses equivalent payloads (e.g. event handlers, encoding)",
          "SQL injection — because comments are stored in a database",
          "Path traversal — because comments are files on disk",
        ],
        correctIndex: 1,
        explanation:
          "Blacklist-based filters that block specific strings are trivially bypassed with alternative XSS vectors, such as event handlers or case variation, that don't contain the blocked substring.",
      },
      {
        question:
          "Which combination correctly pairs a vulnerability with its OWASP-referenced root-cause CWE?",
        options: [
          "XSS - CWE-89",
          "SQLi - CWE-79",
          "Command Injection - CWE-77",
          "IDOR - CWE-77",
        ],
        correctIndex: 2,
        explanation:
          "CWE-77 (Command Injection) is correctly paired; XSS is actually CWE-79 and SQLi is CWE-89, making the other options mismatched.",
      },
      {
        question:
          "A pentester finds ' AND (SELECT 'a' FROM users LIMIT 1)='a returns a different response than the same payload ending in ='b. What technique is this?",
        options: [
          "Error-based SQLi",
          "Blind boolean-based SQLi",
          "Stored XSS",
          "CSRF",
        ],
        correctIndex: 1,
        explanation:
          "Comparing two conditional payloads and observing different application behaviour based on the true/false condition, without any direct data in the response, defines blind boolean-based SQL injection.",
      },
      {
        question:
          "Which statement about horizontal vs vertical privilege escalation is correct?",
        options: [
          "Horizontal: a same-privilege-level user accesses another user's data; Vertical: a lower-privilege user reaches higher-privilege functionality",
          "Horizontal: a user becomes admin; Vertical: a user accesses another same-level user's data",
          "They are synonyms for the same attack",
          "Horizontal only applies to admin accounts",
        ],
        correctIndex: 0,
        explanation:
          "Horizontal privilege escalation stays at the same trust level but crosses between different users' data; vertical privilege escalation crosses from a lower to a higher trust tier.",
      },
      {
        question:
          "Why does sqlmap require a candidate injection point to already be suspected before it's run?",
        options: [
          "sqlmap automates detection and exploitation once a parameter is suspected vulnerable; it isn't a full-application crawler that discovers every vulnerable parameter unassisted",
          "sqlmap must be given the database password first",
          "sqlmap only works with GET requests",
          "sqlmap requires source code access",
        ],
        correctIndex: 0,
        explanation:
          "sqlmap automates the detection and exploitation of SQL injection once pointed at a candidate parameter/request, rather than independently discovering every injectable field across an application.",
      },
      {
        question:
          "In a CSRF proof-of-concept, why is a GET-based state-changing action even easier to exploit than a POST-based one?",
        options: [
          "It requires no form submission — the malicious action can be triggered just by loading an <img> tag pointing at the URL",
          "GET requests are always encrypted",
          "GET requests bypass all authentication",
          "GET requests cannot carry cookies",
        ],
        correctIndex: 0,
        explanation:
          "A GET-based state change can be triggered simply by embedding the URL in an image tag, requiring no JavaScript or form auto-submission at all.",
      },
      {
        question:
          "Which mitigation most directly addresses path traversal at the root cause, rather than just filtering known attack strings?",
        options: [
          'Blacklisting "../"',
          "Canonicalising the resolved path and enforcing it remains within an allowed base directory",
          "Rate-limiting requests",
          "Adding a CSRF token to the download request",
        ],
        correctIndex: 1,
        explanation:
          "Canonicalising the path and checking it's still within the intended base directory closes off traversal via encoding tricks or alternate path syntax that blacklist filtering would miss.",
      },
      {
        question:
          "Which of these best explains why DVWA's four difficulty levels are pedagogically useful for learning SQLi/XSS?",
        options: [
          "They demonstrate how the same vulnerability class requires progressively different bypass techniques as mitigations are added, culminating in a properly-fixed 'Impossible' level",
          "They test unrelated vulnerability classes at each level",
          "Higher levels use a different database engine",
          "They only change the UI styling",
        ],
        correctIndex: 0,
        explanation:
          "Each DVWA level adds a real-world mitigation layer, so working through Low to Impossible teaches both the attack and why each specific defense does or doesn't work.",
      },
    ],
  },
  {
    moduleId: "m10",
    questions: [
      {
        question:
          "Both SSRF against cloud metadata endpoints and RFI ultimately rely on what shared weakness in server behaviour?",
        options: [
          "The server making outbound/inclusion requests to attacker-influenced destinations without validating them",
          "Weak TLS cipher suites",
          "Missing CSRF tokens",
          "SQL syntax errors",
        ],
        correctIndex: 0,
        explanation:
          "Both SSRF and RFI stem from the server trusting user-supplied URLs or paths to reach or include content without validating the destination.",
      },
      {
        question: "Which payload/technique pairing is correctly matched?",
        options: [
          "{{7*7}} rendering as 49 — confirms SSTI",
          "http://169.254.169.254/latest/meta-data/ — confirms stored XSS",
          "exploit.pHp — confirms SSRF",
          '{ "role": "admin" } — confirms path traversal',
        ],
        correctIndex: 0,
        explanation:
          "{{7*7}} evaluating to 49 is the standard SSTI confirmation technique; the other pairings mismatch payload with vulnerability class.",
      },
      {
        question:
          "Why is mass assignment considered an API-specific evolution of a broader vulnerability concept covered in this module?",
        options: [
          "It's unrelated to any other vulnerability covered here",
          "It generalises the idea of trusting client-supplied data unconditionally, similar in spirit to trusting a client-supplied price in a business logic flaw",
          "It only affects GraphQL",
          "It requires SSRF first",
        ],
        correctIndex: 1,
        explanation:
          "Both mass assignment and price manipulation share the same root weakness: the server accepts client-supplied values for fields it should independently control or validate.",
      },
      {
        question:
          "Which combination of a mitigation and the vulnerability it addresses is correct?",
        options: [
          "Allowlisting destination IPs/URLs — SSRF",
          "Anti-CSRF tokens — Cryptographic failures",
          "bcrypt/Argon2 — Business logic vulnerabilities",
          "Canonicalising paths — Mass assignment",
        ],
        correctIndex: 0,
        explanation:
          "Allowlisting valid destination URLs/IPs and blocking private ranges is the standard SSRF mitigation; the other pairings mismatch mitigation with vulnerability class.",
      },
      {
        question:
          "A pentester finds an exposed backup file containing a hardcoded database encryption key. Which two OWASP categories from this module does this single finding touch?",
        options: [
          "Information disclosure and cryptographic failures",
          "SSRF and business logic",
          "BOLA and SSTI",
          "File upload and LLM prompt injection",
        ],
        correctIndex: 0,
        explanation:
          "The exposed backup file is itself an information disclosure issue, while the hardcoded key inside it is a cryptographic failure — the single finding spans both categories.",
      },
      {
        question:
          "Why does modern PHP configuration make classic RFI less common than it used to be?",
        options: [
          "allow_url_fopen, needed for remote includes, is increasingly disabled by default",
          "PHP no longer supports the include() function",
          "RFI was replaced entirely by SSTI",
          "Modern web servers block all outbound requests",
        ],
        correctIndex: 0,
        explanation:
          "RFI depends on settings like allow_url_fopen that let include()/require() fetch remote URLs; secure-by-default configurations increasingly disable this.",
      },
      {
        question:
          "An LLM-integrated support tool executes a destructive database action based on a user's plain-English request. Which pairing correctly describes the root cause and the correct mitigation?",
        options: [
          "Excessive agency (root cause) and enforcing authorization independent of the model (mitigation)",
          "SSTI (root cause) and canonicalising paths (mitigation)",
          "Mass assignment (root cause) and bcrypt (mitigation)",
          "CSRF (root cause) and SameSite cookies (mitigation)",
        ],
        correctIndex: 0,
        explanation:
          "The root cause is excessive agency, and the correct mitigation is enforcing authorization on the API itself, never trusting the model's judgement as the security boundary.",
      },
      {
        question:
          "Business logic vulnerabilities are described as difficult for automated scanners to find. What property do BOLA and mass assignment share that also makes them hard to catch with generic scanning?",
        options: [
          "They both require understanding the application's intended data model or ownership rules, not just a syntactic payload pattern",
          "They are both cryptographic in nature",
          "They both require a buffer overflow first",
          "They only occur over UDP",
        ],
        correctIndex: 0,
        explanation:
          "Like business logic flaws, BOLA and mass assignment require understanding what a field or object reference is supposed to mean, context a scanner can't infer from syntax alone.",
      },
      {
        question:
          "A file upload feature accepts a file whose Content-Type header says image/jpeg but whose actual bytes are a PHP script. Which principle would have prevented this if properly implemented?",
        options: [
          "Validating actual file content/magic bytes rather than trusting a client-supplied header",
          "Requiring HTTPS for the upload",
          "Increasing the maximum file size limit",
          "Adding a CAPTCHA to the upload form",
        ],
        correctIndex: 0,
        explanation:
          "The Content-Type header is entirely client-controlled and trivially spoofed; robust validation inspects the file's actual content rather than a claimed MIME type.",
      },
      {
        question:
          "Which statement best synthesises the common thread across SSRF, LFI/RFI, and SSTI as covered in this module?",
        options: [
          "All three ultimately let attacker-influenced input control a server-side operation (a request, an include, or a template evaluation) meant to be safe, escalating from data exposure toward code execution",
          "All three exclusively target client-side JavaScript",
          "All three require a valid admin session first",
          "All three are only exploitable over UDP",
        ],
        correctIndex: 0,
        explanation:
          "SSRF hijacks an outbound request, LFI/RFI hijacks a file include, and SSTI hijacks template evaluation — all three let untrusted input steer a server-side mechanism, often escalating to code execution.",
      },
    ],
  },
  {
    moduleId: "m11",
    questions: [
      {
        question:
          "You've just run `sessions -l` after a successful EternalBlue exploit in msfconsole and see session 1 listed. What command interacts with it?",
        options: [
          "sessions -i 1",
          "use sessions 1",
          "exploit -i 1",
          "search sessions 1",
        ],
        correctIndex: 0,
        explanation:
          "sessions -i <id> is the correct syntax to interact with a specific already-established session.",
      },
      {
        question:
          "Why would an attacker choose offline hash cracking with Hashcat over online brute-forcing with Hydra against the same target account?",
        options: [
          "Offline cracking works against a stolen hash with no further interaction with the live service, avoiding lockouts and detection that online brute-forcing risks",
          "Hashcat is the only tool capable of cracking SSH passwords",
          "Hydra cannot use wordlists, only Hashcat can",
          "Offline cracking always takes longer than online brute-forcing regardless of hash type",
        ],
        correctIndex: 0,
        explanation:
          "Once a hash is exfiltrated, cracking it offline requires no further contact with the target, unlike online brute-forcing which generates live, detectable authentication attempts.",
      },
      {
        question:
          "On a Linux box, `find / -perm -4000 -type f` reveals a custom SUID binary. What is the next logical step in exploiting it for privesc?",
        options: [
          "Check GTFOBins for that specific binary to see if it has a known privilege-escalation technique",
          "Immediately reboot the machine to apply the SUID bit",
          "Run hashcat against the binary's file hash",
          "Use msfvenom to generate a payload matching the binary's architecture",
        ],
        correctIndex: 0,
        explanation:
          "GTFOBins catalogues exactly which common Unix binaries can be abused for privesc when they carry elevated permissions like SUID.",
      },
      {
        question:
          "A Windows service is found running as `C:\\Program Files\\My App\\service.exe` with no quotes around the path. What is the exploitation mechanism here?",
        options: [
          "Windows will try each space-delimited segment as a candidate executable path in order, so a planted binary at an earlier path (e.g. C:\\Program.exe) executes instead",
          "The unquoted path automatically grants SYSTEM privileges to any logged-in user",
          "This only matters if AlwaysInstallElevated is also enabled",
          "This vulnerability requires SeImpersonatePrivilege to exploit",
        ],
        correctIndex: 0,
        explanation:
          "Unquoted service paths are exploited by planting an executable at one of the earlier ambiguous path segments Windows will try before the real target.",
      },
      {
        question:
          "Which combination correctly pairs a Windows privesc technique with its underlying mechanism?",
        options: [
          "'Potato' exploits abuse token impersonation privileges like SeImpersonatePrivilege",
          "AlwaysInstallElevated abuses unquoted service paths",
          "Unquoted service paths abuse the sudo -l command",
          "Token impersonation abuses SUID binaries",
        ],
        correctIndex: 0,
        explanation:
          "The Potato family specifically abuses token impersonation (e.g. SeImpersonatePrivilege), which is distinct from AlwaysInstallElevated (registry/installer policy) or unquoted paths (service configuration).",
      },
      {
        question:
          "An attacker has a captured NTLM hash for a domain account but has not cracked it to plaintext. How can they still authenticate to another Windows host?",
        options: [
          "Pass-the-Hash: authenticate directly using the hash itself, since NTLM accepts it as proof of identity",
          "They cannot authenticate without the plaintext password under any circumstances",
          "They must first run the hash through John the Ripper before any authentication is possible",
          "They must brute-force the plaintext using Hydra before proceeding",
        ],
        correctIndex: 0,
        explanation:
          "Pass-the-Hash exploits the fact that NTLM authentication uses the hash itself, not the plaintext, as the credential.",
      },
      {
        question:
          "Which two protocols would an attacker most likely use to move laterally after compromising one host in a Windows/AD network?",
        options: [
          "SMB and RDP",
          "FTP and Telnet",
          "DNS and NTP",
          "SNMP and SMTP",
        ],
        correctIndex: 0,
        explanation:
          "SMB (shares, Pass-the-Hash) and RDP (interactive remote sessions) are the module's named common lateral-movement protocols in Windows/AD environments.",
      },
      {
        question:
          "Given a hash file with 32-character hex values and one with 64-character hex values, which Hashcat mode pairing is correct?",
        options: [
          "-m 0 for the 32-character (MD5) file, -m 1400 for the 64-character (SHA2-256) file",
          "-m 1400 for the 32-character file, -m 0 for the 64-character file",
          "-a 0 for both files regardless of length",
          "The hash length is irrelevant to selecting a Hashcat mode",
        ],
        correctIndex: 0,
        explanation:
          "MD5 hashes are 32 hex characters (mode 0) and SHA-256 hashes are 64 hex characters (mode 1400) — length is exactly how you disambiguate before cracking.",
      },
      {
        question:
          "What is the correct methodology order for compromising a VulnMachines box end-to-end?",
        options: [
          "Recon (Nmap) -> identify vulnerable service -> exploit -> privesc -> capture the flag",
          "Privesc -> exploit -> recon -> flag",
          "Exploit blindly -> recon -> privesc -> flag",
          "Flag -> recon -> exploit -> privesc",
        ],
        correctIndex: 0,
        explanation:
          "The module's consistent methodology starts with recon to find attack surface before ever attempting exploitation or privilege escalation.",
      },
      {
        question:
          "Why might a penetration tester deliberately choose a staged Meterpreter payload over a non-staged one during an engagement against a monitored network?",
        options: [
          "The smaller initial stager has a lower initial detection footprint before the full payload is fetched",
          "Staged payloads never require a functioning network connection",
          "Staged payloads always execute faster than non-staged ones",
          "Non-staged payloads cannot be caught by exploit/multi/handler",
        ],
        correctIndex: 0,
        explanation:
          "Staged payloads trade a follow-up network dependency for a smaller, less conspicuous initial footprint, which matters against network monitoring.",
      },
    ],
  },
  {
    moduleId: "m12",
    questions: [
      {
        question:
          "Which Python construct should wrap a socket connection attempt to avoid crashing the whole port scanner on one bad host?",
        options: [
          "try/except around the connection logic",
          "a bare for loop with no error handling",
          "a lambda function",
          "the argparse module",
        ],
        correctIndex: 0,
        explanation:
          "try/except lets the scanner gracefully continue past hosts/ports that raise errors instead of terminating the whole run.",
      },
      {
        question:
          "In the port scanner script, what does `s.connect_ex((target, port)) == 0` actually test?",
        options: [
          "Whether the TCP connection to that specific port succeeded, indicating the port is open",
          "Whether the target host responds to ICMP ping",
          "Whether the target's DNS record resolves correctly",
          "Whether the wordlist contains a matching password",
        ],
        correctIndex: 0,
        explanation:
          "connect_ex() returns 0 specifically on a successful connection, which is how the scanner determines a port is open.",
      },
      {
        question:
          "Why does the MAC changer script need to bring the interface down before changing its address, rather than changing it live?",
        options: [
          "The network interface's hardware address typically cannot be changed while the interface is active/up",
          "Because Python sockets require the interface to be down to import",
          "Because argparse cannot parse flags while the interface is up",
          "There is no real reason; it's purely cosmetic",
        ],
        correctIndex: 0,
        explanation:
          "Changing a MAC address while the interface is active is unreliable/unsupported on most systems, hence down -> change -> up.",
      },
      {
        question:
          "A subdomain brute-forcer script gets a `requests.ConnectionError` on 90% of its wordlist entries. What does this most likely mean?",
        options: [
          "Most guessed subdomains simply don't exist/resolve, which is expected and should be caught, not treated as a fatal error",
          "The target's main domain itself is down",
          "The wordlist file is corrupted",
          "The script has a syntax error",
        ],
        correctIndex: 0,
        explanation:
          "Since most subdomain guesses won't exist, ConnectionError is the expected, common case that the script should catch and skip past.",
      },
      {
        question:
          "Which requests.post() parameter would you use to submit form-encoded username/password data to a login endpoint?",
        options: [
          "data={}",
          "headers={}",
          "params={}",
          "json={} exclusively, never data={}",
        ],
        correctIndex: 0,
        explanation:
          "The data parameter sends form-encoded body content, matching how most HTML login forms submit credentials, whereas json= would send a JSON body instead.",
      },
      {
        question:
          "What single design flaw would make a login brute-forcer script also break a well-defended production login form?",
        options: [
          "It doesn't account for rate limiting, CAPTCHAs, or account lockouts a hardened production form would enforce",
          "It uses too many CPU cores",
          "It cannot import the requests library on Windows",
          "It is incompatible with HTTPS URLs",
        ],
        correctIndex: 0,
        explanation:
          "The lab targets simple lab apps like DVWA precisely because production systems typically add lockouts, rate limiting, and CAPTCHAs that a naive brute-force loop doesn't handle.",
      },
      {
        question:
          "Why is scapy specifically relevant among Python's security libraries, compared to requests or socket?",
        options: [
          "It enables crafting and manipulating raw packets, beyond the higher-level abstractions socket and requests provide",
          "It replaces the need for the standard library entirely",
          "It is used exclusively for password hashing",
          "It only works for HTTP-layer traffic",
        ],
        correctIndex: 0,
        explanation:
          "scapy operates at the packet-crafting level, a different and lower layer than socket's stream connections or requests' HTTP abstraction.",
      },
      {
        question:
          "An AI assistant suggests a script that hardcodes a database password as a string literal. What is the correct response, per this module's guidance?",
        options: [
          "Flag it as an insecure pattern and require it to be fixed (e.g. via environment variables) before running the script",
          "Run the script as-is since AI-generated code is already validated",
          "Ignore it since hardcoded secrets are only a concern in production, never in scripts",
          "Paste the real password into the AI chat to ask if it's safe",
        ],
        correctIndex: 0,
        explanation:
          "The module explicitly calls out hardcoded secrets as a pattern AI can help spot, and the developer must still catch and fix it before running the code, never validating it by pasting real secrets into the AI tool.",
      },
      {
        question:
          "Which single line of reasoning connects all four scripts built in this module (MAC changer, port scanner, subdomain brute-forcer, login brute-forcer)?",
        options: [
          "Each automates a manual security task using core building blocks: argparse/input handling, loops, and either socket or requests",
          "Each one requires a GPU to execute effectively",
          "Each one is only usable on Windows",
          "Each one replaces the need to learn networking concepts",
        ],
        correctIndex: 0,
        explanation:
          "All four scripts are variations on the same pattern: looping over inputs (ports, subdomains, passwords) using socket or requests, wrapped in basic CLI/input handling.",
      },
      {
        question:
          "Why does the module insist AI-generated scripts be tested in an isolated lab before operational use, even though AI can speed up development significantly?",
        options: [
          "Because AI-generated code hasn't been independently validated and could behave unpredictably or unsafely against real targets",
          "Because isolated labs run scripts faster than production networks",
          "Because AI-generated Python cannot execute outside a sandbox",
          "Because operational targets block all Python-based tools automatically",
        ],
        correctIndex: 0,
        explanation:
          "Speed of generation doesn't guarantee correctness or safety, so validating behaviour in an isolated environment first remains essential.",
      },
    ],
  },
  {
    moduleId: "m13",
    questions: [
      {
        question:
          "A security team uses labelled historical attack data to train a model that flags likely phishing emails. Which layer of the AI/ML/DL hierarchy is this?",
        options: [
          "Machine Learning",
          "Deep Learning specifically",
          "General AI with no learning component",
          "None of these; it's a static rule engine by definition",
        ],
        correctIndex: 0,
        explanation:
          "Training on labelled data to find patterns is the definition of ML given in the module, distinct from DL's auto-feature-discovery on large unlabelled datasets.",
      },
      {
        question:
          "Which pairing correctly matches an offensive AI use case with its defensive counterpart from this module?",
        options: [
          "Offensive: PassGAN for password recovery | Defensive: anomaly detection for logins from new locations",
          "Offensive: anomaly detection | Defensive: AI-generated phishing",
          "Offensive: automated incident response | Defensive: AI-evasive malware",
          "Offensive and defensive AI use cases are described as identical",
        ],
        correctIndex: 0,
        explanation:
          "PassGAN (offensive password recovery) and anomaly detection (defensive) are explicitly listed on opposite sides of the module's offense/defense breakdown.",
      },
      {
        question:
          "A prompt injection attack embeds malicious instructions inside a webpage that an AI agent is asked to summarise. What type of prompt injection is this?",
        options: [
          "Indirect prompt injection",
          "Direct prompt injection",
          "Jailbreaking exclusively",
          "This is not a form of prompt injection at all",
        ],
        correctIndex: 0,
        explanation:
          "Indirect prompt injection is defined as instructions hidden in content the model is asked to analyse, as opposed to direct injection coming straight from the user's own prompt.",
      },
      {
        question:
          "Which defence is most directly aimed at preventing prompt injection, per this module?",
        options: [
          "Isolating user input from system instructions",
          "Running the model on more powerful GPU hardware",
          "Increasing the model's context window size",
          "Disabling all model logging",
        ],
        correctIndex: 0,
        explanation:
          "Isolating user-supplied input from trusted system instructions (plus input validation/filtering) is the module's named defence against prompt injection.",
      },
      {
        question:
          "Running DeepSeek locally via Ollama instead of using a cloud chatbot primarily addresses which concern from this module?",
        options: [
          "Data privacy — no data leaves the machine",
          "Faster internet speeds",
          "Automatic vulnerability patching",
          "Guaranteed higher model accuracy than any cloud model",
        ],
        correctIndex: 0,
        explanation:
          "The module frames local AI's main advantage as privacy: no data leaving your machine, comparable capability to cloud tools like ChatGPT/Copilot.",
      },
      {
        question:
          "Which AI code-review tool is described as offering inline, in-editor suggestions as you type?",
        options: ["GitHub Copilot", "CodeQL", "Semgrep", "Nmap"],
        correctIndex: 0,
        explanation:
          "GitHub Copilot is specifically described as providing inline suggestions/warnings, distinct from CodeQL's static analysis and Semgrep's customisable scanning.",
      },
      {
        question:
          "An AI-generated recon script is technically correct but targets IP ranges outside the engagement's authorised scope. What should happen?",
        options: [
          "The script must not be run until it's corrected to match the authorised scope, regardless of technical correctness",
          "It should be run immediately since AI-generated code is presumed safe",
          "Scope only matters for exploitation, not reconnaissance",
          "The script should be run against the extra ranges since AI suggested it",
        ],
        correctIndex: 0,
        explanation:
          "The module stresses validating AI-suggested recon scripts against the authorised scope before running them — technical correctness never overrides authorization.",
      },
      {
        question:
          "Which phishing type would best describe a fraudulent SMS message claiming to be from a bank?",
        options: ["Smishing", "Vishing", "Whaling", "Clone phishing"],
        correctIndex: 0,
        explanation:
          "Smishing specifically refers to SMS-based phishing, distinct from vishing (voice/phone) or whaling (targeting executives).",
      },
      {
        question:
          "What is the key ethical distinction this module draws between generating a phishing email for a training exercise versus sending it to real people?",
        options: [
          "The training exercise is for awareness/annotation only; sending generated phishing content to real people outside an authorised, scoped engagement is out of bounds",
          "There is no distinction; both are treated as equally acceptable",
          "Sending it to real people is fine as long as AI generated the content",
          "The distinction only applies to emails, not SMS or voice phishing",
        ],
        correctIndex: 0,
        explanation:
          "The module is explicit that the phishing-generation exercise is for awareness/training, and actually sending such content to real people outside an authorised engagement crosses an ethical/legal line.",
      },
      {
        question:
          "Why does the module recommend reviewing every AI-suggested change to the M12 subdomain script line by line, even though AI sped up development?",
        options: [
          "Because AI-generated code still needs human validation before being trusted to run, especially against live targets",
          "Because line-by-line review is required by Python's syntax rules",
          "Because the AI model cannot execute code itself under any circumstance",
          "Because concurrency/threading code never contains bugs",
        ],
        correctIndex: 0,
        explanation:
          "Consistent with the module's broader theme, speed from AI assistance doesn't remove the need to understand and validate what the code actually does.",
      },
    ],
  },
  {
    moduleId: "m14",
    questions: [
      {
        question:
          "Which SOC tier would be responsible for building new detection rules after discovering a novel attack pattern during proactive hunting?",
        options: [
          "Tier 3 (Threat Hunter/Advanced Analyst)",
          "Tier 1 (Junior Analyst)",
          "Tier 2 (Incident Responder)",
          "None of the tiers build detection rules",
        ],
        correctIndex: 0,
        explanation:
          "Tier 3 is specifically described as proactively hunting hidden threats and building detection rules, beyond Tier 1's triage and Tier 2's containment role.",
      },
      {
        question:
          "A SOC needs to correlate login logs, firewall logs, and endpoint logs to spot a coordinated attack pattern. Which blue-team discipline is this?",
        options: ["SIEM", "IAM", "DFIR", "Threat Intelligence"],
        correctIndex: 0,
        explanation:
          "SIEM's defining function is aggregating and correlating logs across the organisation to detect suspicious patterns, exactly this scenario.",
      },
      {
        question:
          "Digital evidence from a compromised server needs to be preserved and analysed for a potential legal case. Which discipline handles this specifically?",
        options: [
          "DFIR (Digital Forensics & Incident Response)",
          "IAM",
          "SIEM",
          "General Incident Response only, with no forensic component",
        ],
        correctIndex: 0,
        explanation:
          "DFIR is defined as deep technical investigation after an incident, often specifically for legal/evidentiary purposes, beyond general IR.",
      },
      {
        question:
          "In the Event Viewer lab, what does discovering both Event ID 4657 and Event ID 1074 together suggest happened on the host?",
        options: [
          "A registry key was modified, and the system was later shut down — consistent with malware altering a Run key that triggers reboots",
          "Only a normal software update occurred, with no suspicious activity",
          "The machine was never actually compromised",
          "Event ID 1074 always occurs before 4657, reversing the actual timeline",
        ],
        correctIndex: 0,
        explanation:
          "The lab's reconstructed timeline is exactly this: a registry change (4657) tied to malware persistence, followed by shutdown events (1074) triggered by every login.",
      },
      {
        question:
          "In the Wireshark lab, why check Statistics before diving into individual packets?",
        options: [
          "To quickly spot unusual source/destination IPs or protocol patterns that narrow down where to focus deeper analysis",
          "Because Statistics automatically decrypts all TLS traffic",
          "Because individual packets cannot be viewed without first opening Statistics",
          "Because Statistics is required to export the PCAP file",
        ],
        correctIndex: 0,
        explanation:
          "Statistics gives a fast overview that helps identify which conversation or IP is worth following in detail, rather than manually scanning every packet.",
      },
      {
        question:
          "A suspicious binary returns a 'clean' VirusTotal result. What is the appropriate interpretation per this module?",
        options: [
          "Treat it as inconclusive, since brand-new malware strains can evade AV engine detection",
          "Treat it as definitive proof the file is safe to execute anywhere",
          "Immediately delete VirusTotal's verdict and re-scan with a different hash",
          "Assume the file has been personally reviewed by a VirusTotal analyst",
        ],
        correctIndex: 0,
        explanation:
          "The lab explicitly warns that a clean VT result is inconclusive, not proof-of-safety, since brand-new strains can be missed.",
      },
      {
        question:
          "Which phase of the Incident Response lifecycle involves determining the scope of an ongoing incident?",
        options: [
          "Detect & Analyse",
          "Prepare",
          "Contain, Eradicate, Recover",
          "Post-Incident",
        ],
        correctIndex: 0,
        explanation:
          "Detect & Analyse is specifically the phase for identifying that an incident is happening and understanding its scope, before containment begins.",
      },
      {
        question:
          "A YARA rule with a Computed IOC type is written to catch malware samples. What is it most likely matching on?",
        options: [
          "A fuzzy hash that tolerates minor variations between related malware samples",
          "An exact IP address used by a C2 server",
          "A specific behavioural code pattern",
          "A hardcoded username",
        ],
        correctIndex: 0,
        explanation:
          "Computed IOCs are specifically described as fuzzy hashes, distinct from Atomic (exact hash/IP) and Behavioural (code pattern) types.",
      },
      {
        question:
          "Why is IAM considered a distinct blue-team discipline from SIEM, even though both relate to monitoring/security?",
        options: [
          "IAM governs who can access what and enforces least privilege, while SIEM aggregates and correlates logs to detect suspicious activity",
          "IAM and SIEM are simply two names for the same discipline",
          "IAM only applies to physical building access, not systems",
          "SIEM enforces least privilege, while IAM aggregates logs",
        ],
        correctIndex: 0,
        explanation:
          "IAM is about access governance (who can do what), while SIEM is about log aggregation/correlation — related but distinct disciplines.",
      },
      {
        question:
          "A pentester wants to think more realistically about how their attack would be detected. Which of this module's areas would most directly help them anticipate defender response?",
        options: [
          "Understanding the SOC tier structure and incident lifecycle",
          "Learning more Hashcat attack modes",
          "Studying msfvenom payload encoding options",
          "Memorising more Nmap scan flags",
        ],
        correctIndex: 0,
        explanation:
          "This module's core argument is that understanding SOC structure and the IR lifecycle sharpens a pentester's sense of how and when their activity would actually be detected and escalated.",
      },
    ],
  },
  {
    moduleId: "m15",
    questions: [
      {
        question:
          "Following this module's certification roadmap, which certification would a learner most likely pursue immediately after eJPT?",
        options: [
          "CEH or PNPT",
          "OSEP",
          "A senior architect role with no further certification",
          "Security+ retroactively, before eJPT",
        ],
        correctIndex: 0,
        explanation:
          "The roadmap sequence given is eJPT -> CEH/PNPT -> OSCP -> OSEP, so CEH/PNPT is the next step after eJPT.",
      },
      {
        question:
          "Why might an entry-level candidate pursue CompTIA Security+ even if their long-term goal is a red team role?",
        options: [
          "It's a vendor-neutral baseline often required as a minimum by employers, even for roles needing deeper offensive skills later",
          "It fully substitutes for OSCP and eliminates the need for further certifications",
          "It is only relevant for blue team careers and irrelevant to red teamers",
          "It has no relevance to hiring processes in any sector",
        ],
        correctIndex: 0,
        explanation:
          "Security+ is described as a widely-required baseline credential, even in job postings for roles that ultimately need deeper offensive skills.",
      },
      {
        question:
          "A learner has completed several VulnMachines boxes and wants to convert that into something employers can see. What does this module recommend?",
        options: [
          "Publish write-ups documenting the methodology, findings, and lessons learned as portfolio entries",
          "Keep all findings private to avoid any risk",
          "Submit them directly as a bug bounty report regardless of platform scope",
          "Wait until earning OSCP before publishing anything",
        ],
        correctIndex: 0,
        explanation:
          "The module recommends documenting VulnMachines/HTB writeups as the first portfolio entries, since a visible portfolio of applied skill is what helps get hired.",
      },
      {
        question:
          "What is the practical difference between reporting a vulnerability through a paid bug bounty programme versus a VDP?",
        options: [
          "A VDP accepts the report but doesn't necessarily pay a bounty, while paid programmes reward the researcher financially",
          "VDPs are illegal to participate in",
          "Paid programmes never require staying within scope, unlike VDPs",
          "There is no practical difference between the two",
        ],
        correctIndex: 0,
        explanation:
          "The module distinguishes VDPs (report-only, reputation-building) from paid bounty programmes (financial reward), both requiring adherence to scope/safe-harbor.",
      },
      {
        question:
          "A beginner wants a guided, hint-supported environment for their very first hands-on hacking practice. Which platform best matches this need per the module?",
        options: [
          "TryHackMe",
          "Hack The Box",
          "OSCP's PEN-200 exam environment",
          "A live, unauthorised production website",
        ],
        correctIndex: 0,
        explanation:
          "TryHackMe is specifically described as guided and beginner-friendly with structure and hints, unlike HTB's less-guided, more realistic style.",
      },
      {
        question:
          "Which of the following best reflects the roadmap's view of CTFs relative to certifications?",
        options: [
          "CTFs are a gamified, legal way to keep practicing hands-on skills, complementary to certifications rather than a replacement for them",
          "CTFs are a formal substitute for all certifications",
          "CTFs are only useful after achieving OSEP",
          "CTFs have no connection to career development in this roadmap",
        ],
        correctIndex: 0,
        explanation:
          "The module frames CTFs as ongoing practice environments to keep skills sharp after the programme, alongside — not instead of — the certification roadmap.",
      },
      {
        question:
          "Why does the module suggest building a home lab with Kali VMs and vulnerable targets, rather than practicing solely on public platforms?",
        options: [
          "It lets a learner practice safely and repeatably, reinforcing skills from across the whole programme in a controlled environment",
          "Public platforms like TryHackMe/HTB are described as illegal to use",
          "A home lab is required before any certification exam can be scheduled",
          "It removes any need to ever learn scripting",
        ],
        correctIndex: 0,
        explanation:
          "The module frames a home lab as a repeatable, safe practice space for everything covered in the course, complementing (not replacing) guided platforms.",
      },
      {
        question:
          "Which role from this module's list would be the most natural fit for someone who enjoyed the M14 Blue Team module the most?",
        options: [
          "SOC Analyst",
          "Red Teamer",
          "Bug Bounty Hunter",
          "Penetration Tester",
        ],
        correctIndex: 0,
        explanation:
          "SOC Analyst is the role most directly aligned with the defensive/blue-team skills covered in M14, distinct from the offensively-focused roles listed.",
      },
      {
        question:
          "A learner wants to start earning bounties responsibly right after finishing this course. What is the module's guidance on doing so safely?",
        options: [
          "Always read and stay strictly within a programme's published scope and safe-harbor terms before testing anything",
          "Test any publicly reachable website since bug bounty implies blanket permission",
          "Skip reading scope documents to save time",
          "Only test programmes that don't publish a scope, since those are easiest",
        ],
        correctIndex: 0,
        explanation:
          "The module is explicit that scope and safe-harbor terms must be read and respected before any testing begins, regardless of platform.",
      },
      {
        question:
          "Which single idea ties together this module's coverage of career roles, certifications, portfolio-building, bug bounty, and CTFs?",
        options: [
          "Growth after this programme is a combination of provable knowledge (certifications), demonstrated application (portfolio/CTFs/bounty), and choosing a role that fits your interests",
          "Only certifications matter; practical portfolios are optional and irrelevant to hiring",
          "CTFs and bug bounty are legal risks best avoided entirely",
          "Career growth requires picking exactly one narrow specialisation immediately",
        ],
        correctIndex: 0,
        explanation:
          "The module's closing thread is that certifications, applied practice (portfolio/CTF/bounty), and role-fit all combine to support continued growth after the programme.",
      },
    ],
  },
  {
    moduleId: "m16",
    questions: [
      {
        question:
          "What does the KDC hand back to a client to prove it has a valid password, and what encrypts it?",
        options: [
          "A TGS ticket encrypted with the client's own password",
          "A Ticket Granting Ticket (TGT), encrypted with the krbtgt account's hash",
          "A plaintext session cookie",
          "A service ticket encrypted with the target service's hash",
        ],
        correctIndex: 1,
        explanation:
          "The AS-REP contains a TGT, which is encrypted with the domain's krbtgt account hash so only the KDC can decrypt it.",
      },
      {
        question:
          "Which population of accounts does Kerberoasting specifically target, and why?",
        options: [
          "Disabled accounts, because they never log in",
          "Domain Controller computer accounts, because they hold krbtgt's hash",
          "SPN-registered service accounts, because their passwords are rarely rotated and any domain user can request their TGS",
          "Accounts with preauth disabled, because their AS-REP is unencrypted",
        ],
        correctIndex: 2,
        explanation:
          "Kerberoasting targets accounts with a registered SPN - typically service accounts, whose passwords are set once and rarely rotated, and any authenticated user can request their TGS.",
      },
      {
        question: "What single account flag makes AS-REP Roasting possible?",
        options: [
          "UF_DONT_REQUIRE_PREAUTH",
          "DONT_EXPIRE_PASSWORD",
          "TRUSTED_FOR_DELEGATION",
          "PASSWD_NOTREQD",
        ],
        correctIndex: 0,
        explanation:
          "Accounts flagged UF_DONT_REQUIRE_PREAUTH skip the preauthentication check, letting the KDC return an AS-REP to anyone naming that username.",
      },
      {
        question:
          "Why does Pass-the-Hash work at all against NTLM authentication?",
        options: [
          "Because NTLM stores passwords in plaintext on disk",
          "Because NTLM's challenge-response math only ever needs the NT hash, never the plaintext password",
          "Because NTLM hashes can be trivially reversed to plaintext",
          "Because Windows disables NTLM by default, exposing the hash",
        ],
        correctIndex: 1,
        explanation:
          "NTLM authentication computes its challenge response from the NT hash alone, so possessing the hash is sufficient without ever knowing the plaintext.",
      },
      {
        question:
          "An attacker holds only an NTLM hash but needs to reach a Kerberos-only service. What technique do they use?",
        options: [
          "Golden Ticket",
          "DCSync",
          "Overpass-the-hash",
          "AS-REP Roasting",
        ],
        correctIndex: 2,
        explanation:
          "Overpass-the-hash uses the NT hash to request a legitimate Kerberos ticket, since plain Pass-the-Hash only works against NTLM authentication.",
      },
      {
        question:
          "Why is resetting the krbtgt password once not sufficient to remove a Golden Ticket attacker's persistence?",
        options: [
          "AD retains the previous krbtgt password to avoid breaking in-flight tickets, so tickets forged with the old hash still work until a second reset",
          "krbtgt passwords cannot technically be changed",
          "Golden Tickets are stored as files on the DC that survive password resets",
          "The reset only applies to Silver Tickets, not Golden Tickets",
        ],
        correctIndex: 0,
        explanation:
          "Because AD keeps the old krbtgt password around to avoid invalidating tickets in flight, a Golden Ticket forged with the old hash keeps working until krbtgt is reset a second time.",
      },
      {
        question:
          "What limits a Silver Ticket to a single service rather than the whole domain?",
        options: [
          "It expires after one use",
          "It requires Domain Admin rights to create",
          "It can only be created by real Domain Controllers",
          "It is forged using a specific service account's own hash, so it only works for that account's SPN/service class",
        ],
        correctIndex: 3,
        explanation:
          "A Silver Ticket is encrypted with one particular service account's hash, scoping it to only the service class that account belongs to (e.g. CIFS, HOST, MSSQLSvc).",
      },
      {
        question:
          "What real, legitimate protocol does DCSync abuse to pull password hashes from a DC?",
        options: [
          "MS-DRSR, the directory replication protocol DCs use with each other",
          "SMB file sharing",
          "LDAP simple bind",
          "Kerberos AS-REQ/AS-REP exchange",
        ],
        correctIndex: 0,
        explanation:
          "DCSync abuses MS-DRSR, the legitimate protocol real Domain Controllers use to replicate directory data with each other.",
      },
      {
        question:
          "Which tool is BloodHound's official data collector, and what two enumeration methods does it combine?",
        options: [
          "PowerView, combining registry and WMI queries",
          "ldapsearch, combining LDAP and DNS lookups",
          "Impacket's secretsdump.py, combining SAM and LSASS dumping",
          "SharpHound, combining LDAP queries with SMB/RPC session enumeration",
        ],
        correctIndex: 3,
        explanation:
          "SharpHound is BloodHound's official collector, walking AD via LDAP plus SMB/RPC session enumeration to build the graph BloodHound visualizes.",
      },
      {
        question:
          "In the full AD attack-path chain, what step directly precedes forging a Golden Ticket?",
        options: [
          "Kerberoasting a service account",
          "DCSync-ing the krbtgt hash from a principal with replication rights",
          "Running SharpHound for the first time",
          "AS-REP Roasting an unauthenticated account",
        ],
        correctIndex: 1,
        explanation:
          "The chain's step 5 is DCSync, which pulls krbtgt's hash - the exact prerequisite for step 6, forging a Golden Ticket for domain-wide persistence.",
      },
    ],
  },
  {
    moduleId: "m17",
    questions: [
      {
        question:
          "Why does manual Windows privesc enumeration remain a necessary skill even with tools like WinPEAS and Seatbelt available?",
        options: [
          "Automated tools can be flagged by AV/EDR or fail to run through a restrictive shell, so the manual checklist is the fallback",
          "WinPEAS and Seatbelt are deprecated projects no longer maintained",
          "Manual commands can enumerate remote hosts, while WinPEAS only works locally",
          "Seatbelt requires a GUI session to run",
        ],
        correctIndex: 0,
        explanation:
          "Manual enumeration is the fallback for exactly the situations where automated tools can't be used: AV/EDR detection or a shell too restrictive to upload a binary.",
      },
      {
        question:
          "A service's binary path is unquoted and contains a writable directory earlier in the path. What second condition is required to actually exploit it?",
        options: [
          "The current user must be a local administrator",
          "A way to trigger the service to (re)start, such as a reboot or SERVICE_START rights",
          "The service must be configured to run as a domain account",
          "AlwaysInstallElevated must also be enabled",
        ],
        correctIndex: 1,
        explanation:
          "The malicious binary only executes once the service starts, so a writable directory must be paired with a way to restart the service.",
      },
      {
        question:
          "For AlwaysInstallElevated to be exploitable for privesc, what must be true?",
        options: [
          "Only the HKCU key needs to be set to 1",
          "Only the HKLM key needs to be set to 1",
          "Both the HKLM and HKCU AlwaysInstallElevated values must be set to 1",
          "The Print Spooler service must be running",
        ],
        correctIndex: 2,
        explanation:
          "Checking only one of the two registry locations and concluding the box isn't vulnerable is a common mistake — both HKLM and HKCU must be set to 1 for the policy to apply.",
      },
      {
        question:
          "What privilege do PrintSpoofer, RoguePotato, and JuicyPotato all abuse to obtain a SYSTEM token?",
        options: [
          "SeDebugPrivilege",
          "SeImpersonatePrivilege",
          "SeBackupPrivilege",
          "SeTakeOwnershipPrivilege",
        ],
        correctIndex: 1,
        explanation:
          "The entire Potato family exists to abuse SeImpersonatePrivilege, which many service accounts hold by default, to obtain a SYSTEM-level token.",
      },
      {
        question:
          "Why does PrintSpoofer avoid the CLSID-matching problem that limits JuicyPotato on newer Windows builds?",
        options: [
          "It abuses the Print Spooler service's named-pipe impersonation instead of coercing a DCOM connection",
          "It runs as a scheduled task instead of a service",
          "It requires local administrator rights up front",
          "It targets the registry instead of a running service",
        ],
        correctIndex: 0,
        explanation:
          "PrintSpoofer's named-pipe approach via the Print Spooler service needs no CLSID at all, unlike JuicyPotato/RoguePotato which depend on DCOM coercion.",
      },
      {
        question:
          "A scheduled task runs as SYSTEM and its target script sits in a directory you can write to. What's the correct exploitation approach?",
        options: [
          "Overwrite the script the task already points to, then trigger or wait for the task to run",
          "Recreate the entire scheduled task from scratch with elevated rights",
          "Modify the task's registry key directly to point to your binary",
          "This is only exploitable if the task also has an unquoted path",
        ],
        correctIndex: 0,
        explanation:
          "Like an unquoted-path service, a writable scheduled-task target is exploited by replacing what will already run, not by modifying the task configuration.",
      },
      {
        question:
          "What must a DLL-hijack payload provide to avoid crashing the process that loads it?",
        options: [
          "A valid code-signing certificate",
          "The same exported function names the legitimate DLL provides",
          "A smaller file size than the original DLL",
          "Administrator-only file permissions",
        ],
        correctIndex: 1,
        explanation:
          "The importing process expects specific exported functions; if the hijack DLL doesn't provide them, the process crashes instead of running the payload.",
      },
      {
        question:
          "You have a foothold that can only reach the attacker over outbound HTTPS, with no SSH server anywhere in the chain. Which tool is purpose-built for this?",
        options: [
          "ssh -D dynamic forwarding",
          "chisel, which tunnels TCP/UDP over HTTP as a single static binary",
          "proxychains alone, with no other tooling",
          "GatewayPorts configured on the target",
        ],
        correctIndex: 1,
        explanation:
          "chisel is designed for exactly this case: no SSH available, but HTTP/HTTPS egress works, and it ships as a single static binary for both Windows and Linux.",
      },
      {
        question:
          "Why does ligolo-ng let you run any tool against a pivoted subnet without configuring each tool individually?",
        options: [
          "It disables the target's antivirus during the session",
          "It only supports pre-approved tools like nmap and curl",
          "Its proxy/agent model adds a real tun interface and route on the attacker's machine, so routing works transparently",
          "It tunnels over DNS instead of TCP",
        ],
        correctIndex: 2,
        explanation:
          "Unlike a SOCKS proxy every tool must be told to use, ligolo-ng's tun interface with a routed subnet makes any tool work natively against that subnet.",
      },
      {
        question:
          "Through a proxychains-wrapped nmap scan, why does a TCP connect scan (-sT) work but a SYN scan (-sS) generally does not?",
        options: [
          "proxychains only wraps standard connect() calls, not raw packet crafting that SYN scans require",
          "SYN scans are disabled by dynamic_chain specifically",
          "TCP connect scans do not use sockets at all",
          "proxychains only supports scanning UDP ports",
        ],
        correctIndex: 0,
        explanation:
          "proxychains intercepts library-level connect() calls, which a TCP connect scan uses, but a SYN scan crafts raw packets directly, bypassing what proxychains can redirect.",
      },
      {
        question:
          "What is the realistic order of operations this module's synthesis exercise follows?",
        options: [
          "Tunnel -> proxychains -> enumerate -> privesc -> SYSTEM",
          "Enumerate -> privesc -> SYSTEM -> tunnel -> proxychains",
          "Privesc -> SYSTEM -> enumerate -> proxychains -> tunnel",
          "SYSTEM -> enumerate -> tunnel -> privesc -> proxychains",
        ],
        correctIndex: 1,
        explanation:
          "The realistic chain is always enumerate first, escalate to SYSTEM, then use that access to stand up a tunnel and route tools through proxychains — not the two halves worked independently.",
      },
    ],
  },
  {
    moduleId: "m18",
    questions: [
      {
        question:
          "Why does overwriting a function's saved return address on the stack give an attacker control over execution?",
        options: [
          "Because the return address is the value the CPU jumps to once the function returns",
          "Because it directly modifies the CPU's clock speed",
          "Because it changes which registers the ALU can access",
          "Because it disables the fetch-decode-execute cycle",
        ],
        correctIndex: 0,
        explanation:
          "The saved return address determines where execution resumes after the function returns, so controlling it means controlling where the CPU jumps next.",
      },
      {
        question:
          "What is the actual purpose of the fuzzing step, given that it only reports a rough byte range like 300-400 rather than an exact number?",
        options: [
          "To generate the final shellcode payload directly",
          "To narrow down roughly where a crash occurs, before a cyclic pattern pinpoints the exact offset",
          "To disable ASLR and DEP on the target before further steps",
          "To identify all bad characters in one pass",
        ],
        correctIndex: 1,
        explanation:
          "Fuzzing is deliberately coarse, establishing a rough crash range that later steps refine into an exact offset.",
      },
      {
        question:
          "Why is a De Bruijn (cyclic) pattern used instead of a repeated string of 'A' characters to find the exact offset?",
        options: [
          "It compiles faster than a string of 'A's",
          "It bypasses bad character restrictions",
          "Every 4-byte window in the pattern is unique, so the bytes captured in EIP can be traced back to one exact position",
          "It automatically finds a JMP ESP address at the same time",
        ],
        correctIndex: 2,
        explanation:
          "The uniqueness of every window in a De Bruijn pattern is what lets pattern_offset.rb resolve a crash value in EIP to a precise offset.",
      },
      {
        question:
          "After computing an offset, why is a distinct marker like 'BBBB' sent before moving on to bad character analysis or shellcode?",
        options: [
          "To directly execute a test shellcode payload",
          "To confirm the offset is exactly right by verifying EIP reads precisely that marker value",
          "To measure the target's response latency",
          "To disable the saved EBP value",
        ],
        correctIndex: 1,
        explanation:
          "Seeing EIP overwritten with exactly the chosen marker proves the computed offset is correct before building further on top of it.",
      },
      {
        question:
          "Why does the value of ESP at the moment of the crash matter for the rest of the exploit?",
        options: [
          "ESP determines the target's bad character list",
          "ESP must match the offset value exactly",
          "ESP typically points into the attacker-controlled buffer, which is where shellcode will eventually be placed and where JMP ESP will redirect to",
          "ESP is only relevant if DEP is disabled",
        ],
        correctIndex: 2,
        explanation:
          "ESP pointing into the surviving buffer at crash time is exactly what makes a JMP ESP redirect land in the shellcode.",
      },
      {
        question:
          "Why is 0x00 almost always excluded as a bad character when building the exploit buffer?",
        options: [
          "It always corresponds to the JMP ESP opcode",
          "It terminates C strings, truncating anything in the buffer that comes after it",
          "It is reserved exclusively for the NOP sled",
          "It only affects UDP-based services",
        ],
        correctIndex: 1,
        explanation:
          "0x00 is a null terminator in C strings, so its presence would cut the buffer short and corrupt whatever was meant to follow.",
      },
      {
        question:
          "Why is bad character testing repeated iteratively rather than done once across the whole 0x00-0xFF range?",
        options: [
          "Because a single bad byte can corrupt everything after it, hiding whether later bytes are also bad, until it's removed and the rest retested",
          "Because mona.py has a hard limit of testing 10 bytes per session",
          "Because the target's bad character list changes randomly between runs",
          "Because ASLR must be recalculated before each byte is tested",
        ],
        correctIndex: 0,
        explanation:
          "One bad byte corrupting the bytes after it means later bytes can't be trusted until the confirmed-bad byte is removed and the range is retested.",
      },
      {
        question:
          "Why must a usable JMP ESP address come from a module with no ASLR protection?",
        options: [
          "Because ASLR-protected modules cannot contain a JMP ESP instruction at all",
          "Because ASLR randomizes module base addresses each run, making a hardcoded address unreliable across sessions",
          "Because ASLR only affects bad character filtering, not addresses",
          "Because non-ASLR modules automatically disable DEP as well",
        ],
        correctIndex: 1,
        explanation:
          "A JMP ESP address only stays valid across runs if it comes from a module that loads at a fixed, non-randomized base address.",
      },
      {
        question:
          "Why does DEP defeat a classic JMP ESP exploit even when the address and offset are both correct?",
        options: [
          "DEP changes the offset calculated during the cyclic pattern step",
          "DEP marks stack memory as non-executable, so even landing on the shellcode there fails to run it, requiring ROP-based bypasses instead",
          "DEP prevents fuzzing from ever reaching the target",
          "DEP overwrites the bad character list at runtime",
        ],
        correctIndex: 1,
        explanation:
          "DEP's non-executable stack means shellcode placed there cannot run even if EIP correctly redirects execution to it, which is why modern exploitation shifts to ROP.",
      },
      {
        question:
          "In the final exploit buffer - padding, JMP ESP address, NOP sled, shellcode - what specific purpose does the NOP sled serve?",
        options: [
          "It encrypts the shellcode so bad characters don't matter",
          "It replaces the need for an exact offset calculation",
          "It gives landing-zone tolerance, since the jump into the buffer may not be perfectly byte-aligned with the shellcode's start",
          "It stores the return address in little-endian format",
        ],
        correctIndex: 2,
        explanation:
          "A run of 0x90 NOP bytes before the shellcode means an imprecise jump can still slide down into the real payload instead of missing it entirely.",
      },
    ],
  },
  {
    moduleId: "m19",
    questions: [
      {
        question:
          "What is the essential difference between managed mode and monitor mode?",
        options: [
          "Monitor mode passively captures all 802.11 frames on a channel regardless of destination/association, while managed mode only processes frames addressed to it after associating",
          "Managed mode captures more traffic than monitor mode",
          "There is no real difference; the terms are interchangeable",
          "Monitor mode only works with WPA3 networks",
        ],
        correctIndex: 0,
        explanation:
          "Monitor mode strips the destination/association filtering that managed mode applies, capturing every frame on the channel.",
      },
      {
        question:
          "Why is WEP considered broken by design rather than merely misconfigured?",
        options: [
          "Because its passphrases are always shorter than WPA2's",
          "Because its small 24-bit IV space reuses quickly, leaking the RC4 keystream and allowing statistical key recovery with no brute force needed",
          "Because it requires physical access to the router",
          "Because it was never actually deployed in real networks",
        ],
        correctIndex: 1,
        explanation:
          "WEP's tiny IV space forces frequent reuse, leaking the RC4 keystream and enabling statistical key recovery regardless of configuration.",
      },
      {
        question:
          "In the WPA/WPA2 4-way handshake, what is actually transmitted over the air, and what never is?",
        options: [
          "The PMK is transmitted; the nonces never are",
          "The passphrase is transmitted in Message 3",
          "Nonces (ANonce/SNonce) and a MIC are exchanged; the PMK itself is never transmitted",
          "Nothing is transmitted — the handshake is purely computed locally",
        ],
        correctIndex: 2,
        explanation:
          "The handshake exchanges nonces and a MIC over the air, but the PMK itself never leaves either device.",
      },
      {
        question:
          "What does aireplay-ng's deauthentication attack achieve in a handshake-capture workflow?",
        options: [
          "It cracks the passphrase without needing a wordlist",
          "It permanently blocks the client from ever reconnecting",
          "It converts a .cap file into hashcat format",
          "It forces an already-connected client to disconnect and reassociate, regenerating the 4-way handshake for capture",
        ],
        correctIndex: 3,
        explanation:
          "Spoofed deauth frames force a connected client to reassociate, regenerating the handshake so it can be captured.",
      },
      {
        question:
          "What is the actual bottleneck in cracking a captured WPA2 handshake offline?",
        options: [
          "Wordlist coverage — if the real passphrase isn't in the list, no amount of compute power will find it",
          "The number of deauth packets sent",
          "The AP's firmware version",
          "The strength of the ESSID name",
        ],
        correctIndex: 0,
        explanation:
          "Offline cracking is a dictionary-coverage problem: without the real passphrase in the wordlist, no compute power will recover it.",
      },
      {
        question: "How does hashcat mode 22000 relate to mode 2500?",
        options: [
          "2500 replaced 22000 as the newer mode",
          "They target WEP cracking exclusively",
          "22000 is the current unified mode for WPA-PBKDF2-PMKID+EAPOL, superseding the older EAPOL-only mode 2500",
          "Mode numbers are arbitrary and interchangeable",
        ],
        correctIndex: 2,
        explanation:
          "Mode 22000 unified WPA handshake and PMKID-based cracking, superseding the older EAPOL-only mode 2500.",
      },
      {
        question:
          "Why does a WPS PIN attack succeed far faster than a true 8-digit brute force would suggest?",
        options: [
          "Because WPS PINs are never actually 8 digits",
          "Because many APs validate the PIN in two independently-acknowledged halves, collapsing the real search space to about 10^4 + 10^3 guesses",
          "Because the PIN is sent in plaintext in beacon frames",
          "Because reaver disables the AP's power supply",
        ],
        correctIndex: 1,
        explanation:
          "Split validation of the PIN's two halves collapses the true 10^7 keyspace to roughly 10^4 + 10^3 feasible guesses.",
      },
      {
        question:
          "What fundamentally distinguishes an Evil Twin attack from every handshake- or PIN-based attack in this module?",
        options: [
          "It requires GPU acceleration that the others do not",
          "It targets human trust and deception via a captive portal, producing no handshake to crack and involving no WPS PIN math",
          "It only works against WEP networks",
          "It requires physical access to the router's Ethernet port",
        ],
        correctIndex: 1,
        explanation:
          "Evil Twin attacks deceive the victim into handing over credentials via a captive portal, with no cryptographic cracking involved at all.",
      },
      {
        question:
          "Why is a dedicated USB WiFi adapter standard kit for these attacks rather than a laptop's built-in card?",
        options: [
          "Built-in cards cannot enter monitor mode under any circumstances",
          "USB adapters are required by the aircrack-ng license",
          "Packet injection capability is chipset/driver-dependent, and most built-in laptop WiFi adapters cannot inject packets",
          "Built-in cards cannot connect to 2.4GHz networks",
        ],
        correctIndex: 2,
        explanation:
          "Packet injection is gated by chipset and driver support, which most built-in laptop cards lack, making a known-compatible USB adapter standard kit.",
      },
    ],
  },
  {
    moduleId: "m20",
    questions: [
      {
        question:
          "Under the AWS shared-responsibility model, who is responsible for guest-OS patching on an EC2 instance (IaaS)?",
        options: [
          "AWS handles guest OS patching automatically for EC2",
          "The customer, since IaaS leaves everything above the hypervisor to the customer",
          "Neither party -- IaaS instances don't run an OS",
          "A third-party MSSP by default",
        ],
        correctIndex: 1,
        explanation:
          "On IaaS, the customer patches the guest OS and everything above it -- the provider only secures the hypervisor and below.",
      },
      {
        question:
          "What does an IAM policy of Action: '*' and Resource: '*' effectively grant?",
        options: [
          "Read-only access to one S3 bucket",
          "No access, since AWS blocks wildcard policies",
          "Administrator-equivalent power over the entire AWS account",
          "Access limited to EC2 only",
        ],
        correctIndex: 2,
        explanation:
          "A wildcard Action and Resource together grant administrator-equivalent power over the entire account.",
      },
      {
        question:
          "What AWS feature overrides any public-granting bucket policy or ACL underneath it?",
        options: [
          "S3 Versioning",
          "S3 Lifecycle Rules",
          "S3 Transfer Acceleration",
          "S3 Block Public Access",
        ],
        correctIndex: 3,
        explanation:
          "S3 Block Public Access is the account- or bucket-level override recommended as the defensive baseline against public exposure.",
      },
      {
        question:
          "An application with an SSRF flaw is tricked into fetching http://169.254.169.254/latest/meta-data/iam/security-credentials/<role>. What does the attacker obtain?",
        options: [
          "The EC2 instance's root disk encryption key",
          "The temporary access key/secret key/session token for the instance's attached IAM role",
          "The AWS account's root password",
          "A copy of the instance's kernel",
        ],
        correctIndex: 1,
        explanation:
          "IMDS returns the attached IAM role's temporary credentials, which the attacker can then use against the AWS API.",
      },
      {
        question:
          "Why does enforcing IMDSv2-only mitigate the metadata SSRF chain?",
        options: [
          "It requires a PUT request for a session token before any GET is honored, which most SSRF (GET-only) can't complete",
          "It encrypts all metadata responses",
          "It moves the metadata service to a public IP",
          "It disables IAM roles entirely",
        ],
        correctIndex: 0,
        explanation:
          "IMDSv2's required PUT-then-GET flow can't be completed by a GET-only SSRF, which is why it mitigates the chain.",
      },
      {
        question:
          "Which of these does Entra ID lack, unlike on-prem Active Directory?",
        options: [
          "Users and groups",
          "Group Policy Objects (GPOs)",
          "Tenants",
          "Conditional Access policies",
        ],
        correctIndex: 1,
        explanation:
          "Entra ID has no Organizational Units, GPOs, or Kerberos tickets -- it uses tenants and Conditional Access policies instead.",
      },
      {
        question:
          "A sophisticated intruder gains a privileged foothold. Why would they target CloudTrail early?",
        options: [
          "To speed up their own API calls",
          "Because CloudTrail is required for lateral movement",
          "To disable, scope down, or redirect logging so incident response has no way to reconstruct what happened",
          "Because CloudTrail stores their stolen credentials",
        ],
        correctIndex: 2,
        explanation:
          "Disabling or redirecting CloudTrail is one of the first moves a sophisticated intruder makes, since it blinds incident response.",
      },
      {
        question:
          "Why is a Docker image secret still recoverable even after a later layer deletes it?",
        options: [
          "Docker automatically backs up all secrets to AWS",
          "Each image layer is an immutable, independently extractable filesystem diff, so the secret persists in the earlier layer",
          "Secrets are stored in DNS records",
          "Docker images cannot delete files once written",
        ],
        correctIndex: 1,
        explanation:
          "Because image layers are immutable diffs, a secret set in an earlier layer persists and is extractable regardless of later deletions.",
      },
      {
        question:
          "In a realistic AWS attack chain, what typically enables privilege escalation after initial access?",
        options: [
          "Exploiting a new zero-day in AWS's hypervisor",
          "Physically accessing the AWS data center",
          "Brute-forcing the root account password",
          "An over-broad existing IAM policy (e.g. wildcard iam:PassRole) that lets the attacker grant themselves more access",
        ],
        correctIndex: 3,
        explanation:
          "Privilege escalation in the chain comes from abusing an over-broad policy someone else already configured, not a new exploit.",
      },
    ],
  },
  {
    moduleId: "m21",
    questions: [
      {
        question:
          "Per this module, what is the actual deliverable a client receives at the end of a penetration test?",
        options: [
          "The exploit code",
          "The compromised shell",
          "The raw evidence folder",
          "The report",
        ],
        correctIndex: 3,
        explanation:
          "The module frames the report itself as the product of a penetration test, not the exploit, shell, or evidence folder.",
      },
      {
        question:
          "A finding receives a CVSS v3.1 Base score of 5.5. Which severity band does it fall into?",
        options: [
          "Low (0.1-3.9)",
          "Medium (4.0-6.9)",
          "High (7.0-8.9)",
          "Critical (9.0-10.0)",
        ],
        correctIndex: 1,
        explanation:
          "The module's severity bands place 4.0-6.9 in Medium, and 5.5 falls within that range.",
      },
      {
        question:
          "Why does an executive summary say 'an attacker could read every customer's payment data' instead of 'SQL injection in the /api/orders endpoint'?",
        options: [
          "Because SQL injection is not a real vulnerability class",
          "Because CVSS forbids naming the endpoint",
          "Because the summary is aimed at a non-technical reader and must translate technique into business impact",
          "Because endpoints are always redacted for legal reasons",
        ],
        correctIndex: 2,
        explanation:
          "The module states executive summaries frame findings by business impact rather than technical jargon so a non-technical reader understands them.",
      },
      {
        question:
          "Which of these is required in the standard anatomy of a technical finding, per this module?",
        options: [
          "Exact reproduction steps, numbered and complete enough for someone not in the room to trigger the same result",
          "A narrative paraphrase of what was seen, without evidence",
          "A generic remediation like 'improve security'",
          "An estimate of how long the finding took to discover",
        ],
        correctIndex: 0,
        explanation:
          "The module states reproduction steps must be exact and complete enough that someone who wasn't in the room can trigger the same result.",
      },
      {
        question:
          "What remediation timeframe does this module recommend for a Critical-severity finding?",
        options: [
          "The next scheduled release cycle",
          "No deadline is necessary since severity alone conveys urgency",
          "A multi-month window",
          "An immediate or days-scale fix window",
        ],
        correctIndex: 3,
        explanation:
          "The module ties Critical findings to an immediate or days-scale fix window, with lower severities getting longer windows.",
      },
      {
        question:
          "Why does inflating severity ratings (labeling everything Critical or High) backfire, per this module?",
        options: [
          "It has no real downside as long as the client pays",
          "The first time a client successfully disputes a score, every other score in the report becomes suspect",
          "CVSS automatically corrects inflated scores",
          "It only affects the executive summary, not the technical findings",
        ],
        correctIndex: 1,
        explanation:
          "The module states inflated severity erodes trust fast, since the first successful dispute makes every other score suspect.",
      },
      {
        question:
          "In the capstone synthesis exercise, how many of your own findings must receive a full CVSS v3.1 base score walkthrough?",
        options: [
          "Exactly one",
          "Zero — scoring is optional for the capstone",
          "At least three",
          "All findings from every module",
        ],
        correctIndex: 2,
        explanation:
          "The capstone exercise requires a full CVSS v3.1 base score walkthrough for at least three of your own capstone findings.",
      },
      {
        question: "What does the CVSS Scope metric measure?",
        options: [
          "Whether a successful exploit can affect resources beyond the vulnerable component's own security authority, such as escaping a sandbox",
          "How many servers are in the client's environment",
          "Whether the finding was discovered via active or passive recon",
          "The number of remediation options available",
        ],
        correctIndex: 0,
        explanation:
          "The module defines Scope as capturing whether an exploit affects resources beyond the vulnerable component's own security authority.",
      },
      {
        question:
          "Why is a finding with missing or vague reproduction steps a serious reporting mistake?",
        options: [
          "Because it automatically raises the CVSS score",
          "Because it violates the FIRST.org specification",
          "Because it requires the executive summary to be rewritten",
          "Because it makes the finding unverifiable — indistinguishable to a skeptical reader from one that was never real",
        ],
        correctIndex: 3,
        explanation:
          "The module states missing or vague reproduction steps make a finding unverifiable, indistinguishable from an incorrect one.",
      },
    ],
  },
]
