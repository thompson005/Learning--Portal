import type { Resource } from "@/types"

// Extra curated resources per topic/module/lab id, layered on top of the base
// resources already defined in curriculum.ts / labs.ts.
export const RESOURCE_ADDITIONS: Record<string, Resource[]> = {
  "m0-1": [
    {
      "title": "Professor Messer: Computer Basics",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "How a CPU Works - HowStuffWorks",
      "url": "https://computer.howstuffworks.com/microprocessor.htm",
      "type": "link"
    },
    {
      "title": "Crash Course Computer Science (YouTube)",
      "url": "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo",
      "type": "video"
    }
  ],
  "m0-2": [
    {
      "title": "NIST SP 800-88 Media Sanitization",
      "url": "https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final",
      "type": "link"
    },
    {
      "title": "How RAM Works - HowStuffWorks",
      "url": "https://computer.howstuffworks.com/ram.htm",
      "type": "link"
    },
    {
      "title": "Volatility Foundation (memory forensics)",
      "url": "https://www.volatilityfoundation.org",
      "type": "tool"
    }
  ],
  "m0-3": [
    {
      "title": "Professor Messer: Storage Devices",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "NVMe vs SATA SSD - Kingston",
      "url": "https://www.kingston.com/en/blog/pc-performance/nvme-vs-sata-ssd",
      "type": "link"
    },
    {
      "title": "NIST SP 800-88 Media Sanitization",
      "url": "https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final",
      "type": "link"
    }
  ],
  "m0-4": [
    {
      "title": "UEFI vs Legacy BIOS - Microsoft Learn",
      "url": "https://learn.microsoft.com/windows-hardware/manufacture/desktop/uefi-and-legacy-bios",
      "type": "link"
    },
    {
      "title": "Secure Boot Overview - Microsoft Learn",
      "url": "https://learn.microsoft.com/windows-hardware/design/device-experiences/oem-secure-boot",
      "type": "link"
    },
    {
      "title": "Hashcat",
      "url": "https://hashcat.net/hashcat/",
      "type": "tool"
    }
  ],
  "m0-5": [
    {
      "title": "Linux Boot Process - Red Hat",
      "url": "https://www.redhat.com/sysadmin/linux-boot-process",
      "type": "link"
    },
    {
      "title": "systemd documentation",
      "url": "https://www.freedesktop.org/wiki/Software/systemd/",
      "type": "link"
    },
    {
      "title": "Windows Boot and UEFI - Microsoft Learn",
      "url": "https://learn.microsoft.com/windows-hardware/manufacture/desktop/boot-and-uefi",
      "type": "link"
    }
  ],
  "m0": [
    {
      "title": "Professor Messer: Hardware Basics",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "NIST SP 800-12",
      "url": "https://csrc.nist.gov/pubs/sp/800/12/r1/final",
      "type": "link"
    },
    {
      "title": "HowStuffWorks Computer",
      "url": "https://computer.howstuffworks.com",
      "type": "link"
    }
  ],
  "m1-1": [
    {
      "title": "NIST Cybersecurity Framework",
      "url": "https://www.nist.gov/cyberframework",
      "type": "link"
    },
    {
      "title": "TryHackMe Pre-Security Path",
      "url": "https://tryhackme.com/path/outline/presecurity",
      "type": "platform"
    },
    {
      "title": "Professor Messer Security+ videos",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m1-2": [
    {
      "title": "NIST SP 800-12 (CIA Triad overview)",
      "url": "https://csrc.nist.gov/pubs/sp/800/12/r1/final",
      "type": "link"
    },
    {
      "title": "Professor Messer: CIA Triad",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "OWASP",
      "url": "https://owasp.org",
      "type": "link"
    }
  ],
  "m1-3": [
    {
      "title": "CompTIA Security+ overview",
      "url": "https://www.comptia.org/certifications/security",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "ISC2",
      "url": "https://www.isc2.org",
      "type": "link"
    }
  ],
  "m1-4": [
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    },
    {
      "title": "CISA",
      "url": "https://www.cisa.gov",
      "type": "link"
    },
    {
      "title": "Professor Messer Security+ videos",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m1-5": [
    {
      "title": "cve.mitre.org",
      "url": "https://cve.mitre.org",
      "type": "link"
    },
    {
      "title": "CWE (cwe.mitre.org)",
      "url": "https://cwe.mitre.org",
      "type": "link"
    },
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    }
  ],
  "m1-6": [
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "type": "link"
    },
    {
      "title": "HackerOne Disclosure Guidelines",
      "url": "https://www.hackerone.com/disclosure-guidelines",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m1": [
    {
      "title": "TryHackMe Pre-Security Path",
      "url": "https://tryhackme.com/path/outline/presecurity",
      "type": "platform"
    },
    {
      "title": "cve.mitre.org",
      "url": "https://cve.mitre.org",
      "type": "link"
    },
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    }
  ],
  "L01": [
    {
      "title": "cve.mitre.org",
      "url": "https://cve.mitre.org",
      "type": "link"
    },
    {
      "title": "CWE (cwe.mitre.org)",
      "url": "https://cwe.mitre.org",
      "type": "link"
    },
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    }
  ],
  "L02": [
    {
      "title": "TryHackMe Pre-Security Path",
      "url": "https://tryhackme.com/path/outline/presecurity",
      "type": "platform"
    },
    {
      "title": "TryHackMe VPN/access guide",
      "url": "https://tryhackme.com/access",
      "type": "link"
    }
  ],
  "m2-1": [
    {
      "title": "Professor Messer: OSI Model",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "Cloudflare: What is the OSI Model?",
      "url": "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-osi-model/",
      "type": "link"
    },
    {
      "title": "TryHackMe Networking Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m2-2": [
    {
      "title": "Cloudflare: What is TCP/IP?",
      "url": "https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/",
      "type": "link"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "RFC 1180: A TCP/IP Tutorial",
      "url": "https://www.rfc-editor.org/rfc/rfc1180",
      "type": "link"
    }
  ],
  "m2-3": [
    {
      "title": "subnettingpractice.com",
      "url": "https://subnettingpractice.com",
      "type": "tool"
    },
    {
      "title": "Professor Messer: Subnetting",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "Cloudflare: What is an IP Address?",
      "url": "https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/",
      "type": "link"
    }
  ],
  "m2-4": [
    {
      "title": "IANA Service Name and Port Number Registry",
      "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
      "type": "link"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m2-5": [
    {
      "title": "Cloudflare: What is ARP?",
      "url": "https://www.cloudflare.com/learning/ddos/glossary/address-resolution-protocol-arp/",
      "type": "link"
    },
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m2-6": [
    {
      "title": "Cloudflare: What is UDP?",
      "url": "https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/",
      "type": "link"
    },
    {
      "title": "Nmap official docs",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m2-7": [
    {
      "title": "Cisco Networking Basics",
      "url": "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html",
      "type": "link"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m2-8": [
    {
      "title": "Cloudflare: What is a Firewall?",
      "url": "https://www.cloudflare.com/learning/security/what-is-a-firewall/",
      "type": "link"
    },
    {
      "title": "iptables(8) man page",
      "url": "https://man7.org/linux/man-pages/man8/iptables.8.html",
      "type": "link"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m2-9": [
    {
      "title": "Cloudflare: What is a VPN?",
      "url": "https://www.cloudflare.com/learning/access-management/what-is-a-vpn/",
      "type": "link"
    },
    {
      "title": "TryHackMe VPN/access guide",
      "url": "https://tryhackme.com/access",
      "type": "link"
    }
  ],
  "m2-10": [
    {
      "title": "Cloudflare: What is NAT?",
      "url": "https://www.cloudflare.com/learning/network-layer/what-is-nat/",
      "type": "link"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m2-11": [
    {
      "title": "What happens when you type a URL and press Enter",
      "url": "https://github.com/alex/what-happens-when",
      "type": "link"
    },
    {
      "title": "Cloudflare Learning Center",
      "url": "https://www.cloudflare.com/learning/",
      "type": "link"
    }
  ],
  "m2-12": [
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    },
    {
      "title": "Wireshark User Guide",
      "url": "https://www.wireshark.org/docs/wsug_html_chunked/",
      "type": "link"
    }
  ],
  "m2-13": [
    {
      "title": "subnettingpractice.com",
      "url": "https://subnettingpractice.com",
      "type": "tool"
    },
    {
      "title": "Professor Messer: Subnetting",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m2": [
    {
      "title": "TryHackMe Networking Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    }
  ],
  "L03": [
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    },
    {
      "title": "Wireshark User Guide",
      "url": "https://www.wireshark.org/docs/wsug_html_chunked/",
      "type": "link"
    }
  ],
  "L04": [
    {
      "title": "subnettingpractice.com",
      "url": "https://subnettingpractice.com",
      "type": "tool"
    },
    {
      "title": "Professor Messer: Subnetting",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "L05": [
    {
      "title": "TryHackMe Networking Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m3-linux-1": [
    {
      "title": "Kali Linux official documentation",
      "url": "https://www.kali.org/docs/",
      "type": "link"
    },
    {
      "title": "DistroWatch",
      "url": "https://distrowatch.com",
      "type": "link"
    },
    {
      "title": "TryHackMe Linux Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m3-linux-2": [
    {
      "title": "Linux Filesystem Hierarchy - hier(7) man page",
      "url": "https://man7.org/linux/man-pages/man7/hier.7.html",
      "type": "link"
    },
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    }
  ],
  "m3-linux-3": [
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    },
    {
      "title": "find(1) man page",
      "url": "https://man7.org/linux/man-pages/man1/find.1.html",
      "type": "link"
    },
    {
      "title": "OverTheWire Bandit",
      "url": "https://overthewire.org/wargames/bandit/",
      "type": "platform"
    }
  ],
  "m3-linux-4": [
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    },
    {
      "title": "Bash scripting cheat sheet (devhints.io)",
      "url": "https://devhints.io/bash",
      "type": "link"
    },
    {
      "title": "bash(1) man page",
      "url": "https://man7.org/linux/man-pages/man1/bash.1.html",
      "type": "link"
    }
  ],
  "m3-linux-5": [
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io",
      "type": "link"
    },
    {
      "title": "chmod(1) man page",
      "url": "https://man7.org/linux/man-pages/man1/chmod.1.html",
      "type": "link"
    },
    {
      "title": "HackTricks: Linux Privilege Escalation",
      "url": "https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html",
      "type": "link"
    }
  ],
  "m3-linux-6": [
    {
      "title": "man7.org",
      "url": "https://man7.org",
      "type": "link"
    },
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    }
  ],
  "m3-linux-7": [
    {
      "title": "ps(1) man page",
      "url": "https://man7.org/linux/man-pages/man1/ps.1.html",
      "type": "link"
    },
    {
      "title": "htop",
      "url": "https://htop.dev",
      "type": "tool"
    }
  ],
  "m3-linux-8": [
    {
      "title": "passwd(5) man page",
      "url": "https://man7.org/linux/man-pages/man5/passwd.5.html",
      "type": "link"
    },
    {
      "title": "HackTricks: Linux Privilege Escalation",
      "url": "https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html",
      "type": "link"
    }
  ],
  "m3-linux-9": [
    {
      "title": "systemd documentation",
      "url": "https://www.freedesktop.org/wiki/Software/systemd/",
      "type": "link"
    },
    {
      "title": "systemctl(1) man page",
      "url": "https://man7.org/linux/man-pages/man1/systemctl.1.html",
      "type": "link"
    }
  ],
  "m3-linux-10": [
    {
      "title": "ss(8) man page",
      "url": "https://man7.org/linux/man-pages/man8/ss.8.html",
      "type": "link"
    },
    {
      "title": "tcpdump official site",
      "url": "https://www.tcpdump.org",
      "type": "tool"
    },
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    }
  ],
  "m3-linux-11": [
    {
      "title": "Debian APT wiki",
      "url": "https://wiki.debian.org/Apt",
      "type": "link"
    },
    {
      "title": "dpkg(1) man page",
      "url": "https://man7.org/linux/man-pages/man1/dpkg.1.html",
      "type": "link"
    }
  ],
  "m3-linux-12": [
    {
      "title": "OpenSSH official manual",
      "url": "https://www.openssh.com/manual.html",
      "type": "link"
    },
    {
      "title": "ssh(1) man page",
      "url": "https://man7.org/linux/man-pages/man1/ssh.1.html",
      "type": "link"
    }
  ],
  "m3-linux-13": [
    {
      "title": "crontab(5) man page",
      "url": "https://man7.org/linux/man-pages/man5/crontab.5.html",
      "type": "link"
    },
    {
      "title": "HackTricks: Linux Privilege Escalation",
      "url": "https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html",
      "type": "link"
    }
  ],
  "m3-linux-14": [
    {
      "title": "OverTheWire Bandit",
      "url": "https://overthewire.org/wargames/bandit/",
      "type": "platform"
    },
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    }
  ],
  "m3-linux-15": [
    {
      "title": "Bash scripting cheat sheet (devhints.io)",
      "url": "https://devhints.io/bash",
      "type": "link"
    },
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    }
  ],
  "m3-linux": [
    {
      "title": "OverTheWire Bandit",
      "url": "https://overthewire.org/wargames/bandit/",
      "type": "platform"
    },
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    },
    {
      "title": "TryHackMe Linux Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "L06": [
    {
      "title": "OverTheWire Bandit",
      "url": "https://overthewire.org/wargames/bandit/",
      "type": "platform"
    },
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    }
  ],
  "L07": [
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io",
      "type": "link"
    },
    {
      "title": "HackTricks: Linux Privilege Escalation",
      "url": "https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html",
      "type": "link"
    }
  ],
  "L08": [
    {
      "title": "explainshell.com",
      "url": "https://explainshell.com",
      "type": "tool"
    },
    {
      "title": "Bash scripting cheat sheet (devhints.io)",
      "url": "https://devhints.io/bash",
      "type": "link"
    }
  ],
  "m3-windows-1": [
    {
      "title": "Microsoft Learn: Windows editions",
      "url": "https://learn.microsoft.com/windows/whats-new/windows-editions",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: User Mode and Kernel Mode",
      "url": "https://learn.microsoft.com/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode",
      "type": "link"
    }
  ],
  "m3-windows-2": [
    {
      "title": "SS64 CMD reference",
      "url": "https://ss64.com/nt/",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: icacls",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/icacls",
      "type": "link"
    }
  ],
  "m3-windows-3": [
    {
      "title": "Microsoft Learn: NTFS overview",
      "url": "https://learn.microsoft.com/windows-server/storage/file-server/ntfs-overview",
      "type": "link"
    },
    {
      "title": "SS64.com reference",
      "url": "https://ss64.com",
      "type": "link"
    }
  ],
  "m3-windows-4": [
    {
      "title": "Microsoft Learn: Windows Registry",
      "url": "https://learn.microsoft.com/windows/win32/sysinfo/registry",
      "type": "link"
    },
    {
      "title": "SS64: reg command reference",
      "url": "https://ss64.com/nt/reg.html",
      "type": "link"
    }
  ],
  "m3-windows-5": [
    {
      "title": "Microsoft Learn: net user",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/net-user",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: Active Directory Domain Services",
      "url": "https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/adds-getting-started",
      "type": "link"
    }
  ],
  "m3-windows-6": [
    {
      "title": "Microsoft Learn: icacls",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/icacls",
      "type": "link"
    },
    {
      "title": "SS64 PowerShell: Get-Acl",
      "url": "https://ss64.com/ps/get-acl.html",
      "type": "link"
    }
  ],
  "m3-windows-7": [
    {
      "title": "Microsoft Learn: tasklist",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/tasklist",
      "type": "link"
    },
    {
      "title": "SS64 PowerShell reference",
      "url": "https://ss64.com/ps/",
      "type": "link"
    }
  ],
  "m3-windows-8": [
    {
      "title": "Microsoft PowerShell Docs",
      "url": "https://learn.microsoft.com/powershell/",
      "type": "link"
    },
    {
      "title": "SS64 PowerShell reference",
      "url": "https://ss64.com/ps/",
      "type": "link"
    }
  ],
  "m3-windows-9": [
    {
      "title": "SS64.com CMD reference",
      "url": "https://ss64.com",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: systeminfo",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/systeminfo",
      "type": "link"
    }
  ],
  "m3-windows-10": [
    {
      "title": "Microsoft Learn: Microsoft Defender Antivirus",
      "url": "https://learn.microsoft.com/microsoft-365/security/defender-endpoint/microsoft-defender-antivirus-windows",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: Windows Firewall",
      "url": "https://learn.microsoft.com/windows/security/operating-system-security/network-security/windows-firewall/",
      "type": "link"
    }
  ],
  "m3-windows-11": [
    {
      "title": "Windows Event ID reference (ultimatewindowssecurity.com)",
      "url": "https://www.ultimatewindowssecurity.com/securitylog/encyclopedia",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: Event Viewer",
      "url": "https://learn.microsoft.com/windows/win32/wes/eventviewer",
      "type": "link"
    }
  ],
  "m3-windows-12": [
    {
      "title": "Microsoft Learn: BitLocker overview",
      "url": "https://learn.microsoft.com/windows/security/operating-system-security/data-protection/bitlocker/",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: manage-bde",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/manage-bde",
      "type": "link"
    }
  ],
  "m3-windows-13": [
    {
      "title": "Microsoft PowerShell Docs",
      "url": "https://learn.microsoft.com/powershell/",
      "type": "link"
    },
    {
      "title": "SS64 PowerShell reference",
      "url": "https://ss64.com/ps/",
      "type": "link"
    }
  ],
  "m3-windows-14": [
    {
      "title": "TryHackMe Windows Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Microsoft Docs",
      "url": "https://learn.microsoft.com",
      "type": "link"
    }
  ],
  "m3-windows": [
    {
      "title": "TryHackMe Windows Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Microsoft Docs",
      "url": "https://learn.microsoft.com",
      "type": "link"
    },
    {
      "title": "SS64.com CMD/PowerShell reference",
      "url": "https://ss64.com",
      "type": "link"
    }
  ],
  "L09": [
    {
      "title": "Microsoft PowerShell Docs",
      "url": "https://learn.microsoft.com/powershell/",
      "type": "link"
    },
    {
      "title": "SS64 PowerShell reference",
      "url": "https://ss64.com/ps/",
      "type": "link"
    }
  ],
  "L10": [
    {
      "title": "TryHackMe Windows Fundamentals",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Microsoft Docs",
      "url": "https://learn.microsoft.com",
      "type": "link"
    }
  ],
  "L11": [
    {
      "title": "Windows Event ID reference (ultimatewindowssecurity.com)",
      "url": "https://www.ultimatewindowssecurity.com/securitylog/encyclopedia",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: Event Viewer",
      "url": "https://learn.microsoft.com/windows/win32/wes/eventviewer",
      "type": "link"
    }
  ],
  "m4-1": [
    {
      "title": "OWASP Mobile Application Security",
      "url": "https://owasp.org/www-project-mobile-app-security/",
      "type": "link"
    },
    {
      "title": "MDN Web Docs",
      "url": "https://developer.mozilla.org",
      "type": "link"
    },
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    }
  ],
  "m4-2": [
    {
      "title": "OWASP SAMM",
      "url": "https://owaspsamm.org",
      "type": "link"
    },
    {
      "title": "Microsoft Security Development Lifecycle",
      "url": "https://www.microsoft.com/en-us/securityengineering/sdl",
      "type": "link"
    },
    {
      "title": "NIST Secure Software Development Framework",
      "url": "https://csrc.nist.gov/Projects/ssdf",
      "type": "link"
    }
  ],
  "m4-3": [
    {
      "title": "MDN Web Docs",
      "url": "https://developer.mozilla.org",
      "type": "link"
    },
    {
      "title": "React documentation",
      "url": "https://react.dev",
      "type": "link"
    },
    {
      "title": "freeCodeCamp",
      "url": "https://www.freecodecamp.org",
      "type": "platform"
    }
  ],
  "m4-4": [
    {
      "title": "Node.js documentation",
      "url": "https://nodejs.org/en/docs",
      "type": "link"
    },
    {
      "title": "Django documentation",
      "url": "https://docs.djangoproject.com",
      "type": "link"
    },
    {
      "title": "OWASP Cheat Sheet Series",
      "url": "https://cheatsheetseries.owasp.org",
      "type": "link"
    }
  ],
  "m4-5": [
    {
      "title": "MDN HTTP documentation",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP",
      "type": "link"
    },
    {
      "title": "OWASP API Security Top 10",
      "url": "https://owasp.org/www-project-api-security/",
      "type": "link"
    },
    {
      "title": "RESTful API Tutorial",
      "url": "https://restfulapi.net",
      "type": "link"
    }
  ],
  "m4-6": [
    {
      "title": "OWASP SQL Injection Prevention Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "MongoDB Documentation",
      "url": "https://www.mongodb.com/docs/",
      "type": "link"
    },
    {
      "title": "PostgreSQL Documentation",
      "url": "https://www.postgresql.org/docs/",
      "type": "link"
    }
  ],
  "m4-7": [
    {
      "title": "OWASP Session Management Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "MDN Set-Cookie",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie",
      "type": "link"
    },
    {
      "title": "PortSwigger - Session hijacking",
      "url": "https://portswigger.net/web-security/session-hijacking",
      "type": "platform"
    }
  ],
  "m4-8": [
    {
      "title": "OWASP Authentication Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "OAuth 2.0",
      "url": "https://oauth.net/2/",
      "type": "link"
    },
    {
      "title": "Auth0 Docs",
      "url": "https://auth0.com/docs",
      "type": "link"
    }
  ],
  "m4-9": [
    {
      "title": "OWASP Access Control Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "PortSwigger - Access control",
      "url": "https://portswigger.net/web-security/access-control",
      "type": "platform"
    },
    {
      "title": "NIST RBAC",
      "url": "https://csrc.nist.gov/projects/role-based-access-control",
      "type": "link"
    }
  ],
  "m4-10": [
    {
      "title": "Chrome DevTools documentation",
      "url": "https://developer.chrome.com/docs/devtools/",
      "type": "link"
    },
    {
      "title": "OWASP Session Management Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "Firefox Developer Tools",
      "url": "https://developer.mozilla.org/en-US/docs/Tools",
      "type": "link"
    }
  ],
  "m4": [
    {
      "title": "MDN Web Docs",
      "url": "https://developer.mozilla.org",
      "type": "link"
    },
    {
      "title": "OWASP Cheat Sheet Series",
      "url": "https://cheatsheetseries.owasp.org",
      "type": "link"
    },
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    }
  ],
  "L12": [
    {
      "title": "Chrome DevTools documentation",
      "url": "https://developer.chrome.com/docs/devtools/",
      "type": "link"
    },
    {
      "title": "OWASP Session Management Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
      "type": "link"
    }
  ],
  "m5-1": [
    {
      "title": "OWASP Cryptographic Failures",
      "url": "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
      "type": "link"
    },
    {
      "title": "CyberChef",
      "url": "https://gchq.github.io/CyberChef/",
      "type": "tool"
    },
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    }
  ],
  "m5-2": [
    {
      "title": "MDN - Base64",
      "url": "https://developer.mozilla.org/en-US/docs/Glossary/Base64",
      "type": "link"
    },
    {
      "title": "CyberChef",
      "url": "https://gchq.github.io/CyberChef/",
      "type": "tool"
    },
    {
      "title": "OWASP XSS Prevention Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      "type": "link"
    }
  ],
  "m5-3": [
    {
      "title": "NIST FIPS 197 (AES)",
      "url": "https://csrc.nist.gov/pubs/fips/197/final",
      "type": "link"
    },
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    },
    {
      "title": "Python cryptography library documentation",
      "url": "https://cryptography.io",
      "type": "link"
    }
  ],
  "m5-4": [
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    },
    {
      "title": "Khan Academy - Cryptography",
      "url": "https://www.khanacademy.org/computing/computer-science/cryptography",
      "type": "video"
    },
    {
      "title": "NIST SP 800-56A",
      "url": "https://csrc.nist.gov/pubs/sp/800/56/a/r3/final",
      "type": "link"
    }
  ],
  "m5-5": [
    {
      "title": "OWASP Password Storage Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "Argon2 reference implementation",
      "url": "https://github.com/P-H-C/phc-winner-argon2",
      "type": "link"
    },
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    }
  ],
  "m5-6": [
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    },
    {
      "title": "NIST FIPS 186-5 (Digital Signature Standard)",
      "url": "https://csrc.nist.gov/pubs/fips/186-5/final",
      "type": "link"
    },
    {
      "title": "OWASP Cryptographic Failures",
      "url": "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
      "type": "link"
    }
  ],
  "m5-7": [
    {
      "title": "MDN - Transport Layer Security",
      "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security",
      "type": "link"
    },
    {
      "title": "Let's Encrypt documentation",
      "url": "https://letsencrypt.org/docs/",
      "type": "link"
    },
    {
      "title": "DigiCert - What is PKI",
      "url": "https://www.digicert.com/what-is-pki",
      "type": "link"
    }
  ],
  "m5-8": [
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    },
    {
      "title": "Khan Academy - Cryptography",
      "url": "https://www.khanacademy.org/computing/computer-science/cryptography",
      "type": "video"
    },
    {
      "title": "NIST SP 800-56A",
      "url": "https://csrc.nist.gov/pubs/sp/800/56/a/r3/final",
      "type": "link"
    }
  ],
  "m5-9": [
    {
      "title": "CyberChef",
      "url": "https://gchq.github.io/CyberChef/",
      "type": "tool"
    },
    {
      "title": "MDN - Percent-encoding",
      "url": "https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding",
      "type": "link"
    }
  ],
  "m5-10": [
    {
      "title": "OpenSSL documentation",
      "url": "https://www.openssl.org/docs/",
      "type": "link"
    },
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    }
  ],
  "m5": [
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    },
    {
      "title": "OWASP Cryptographic Failures",
      "url": "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/",
      "type": "link"
    },
    {
      "title": "Khan Academy - Cryptography",
      "url": "https://www.khanacademy.org/computing/computer-science/cryptography",
      "type": "video"
    }
  ],
  "L13": [
    {
      "title": "CyberChef",
      "url": "https://gchq.github.io/CyberChef/",
      "type": "tool"
    },
    {
      "title": "MDN - Base64",
      "url": "https://developer.mozilla.org/en-US/docs/Glossary/Base64",
      "type": "link"
    }
  ],
  "L14": [
    {
      "title": "OpenSSL documentation",
      "url": "https://www.openssl.org/docs/",
      "type": "link"
    },
    {
      "title": "CryptoHack",
      "url": "https://cryptohack.org",
      "type": "platform"
    }
  ],
  "m6-1": [
    {
      "title": "Cisco Networking Academy",
      "url": "https://www.netacad.com",
      "type": "platform"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    },
    {
      "title": "NIST SP 800-41 (Firewall Guidelines)",
      "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
      "type": "link"
    }
  ],
  "m6-2": [
    {
      "title": "Cisco Networking Academy",
      "url": "https://www.netacad.com",
      "type": "platform"
    },
    {
      "title": "Professor Messer Networking",
      "url": "https://www.professormesser.com",
      "type": "video"
    }
  ],
  "m6-3": [
    {
      "title": "Cisco Networking Academy",
      "url": "https://www.netacad.com",
      "type": "platform"
    },
    {
      "title": "IEEE 802.1Q standard",
      "url": "https://www.ieee802.org/1/pages/802.1Q.html",
      "type": "link"
    }
  ],
  "m6-4": [
    {
      "title": "Cisco Networking Academy",
      "url": "https://www.netacad.com",
      "type": "platform"
    },
    {
      "title": "NIST SP 800-41 (Firewall Guidelines)",
      "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
      "type": "link"
    }
  ],
  "m6-5": [
    {
      "title": "Cisco Networking Academy",
      "url": "https://www.netacad.com",
      "type": "platform"
    },
    {
      "title": "NIST SP 800-77 (IPsec VPN Guide)",
      "url": "https://csrc.nist.gov/pubs/sp/800/77/r1/final",
      "type": "link"
    }
  ],
  "m6-6": [
    {
      "title": "Microsoft Active Directory Domain Services documentation",
      "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ad-ds-getting-started",
      "type": "link"
    },
    {
      "title": "BloodHound documentation",
      "url": "https://bloodhound.readthedocs.io",
      "type": "tool"
    },
    {
      "title": "TryHackMe AD Basics",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m6-7": [
    {
      "title": "NIST SP 800-207 (Zero Trust Architecture)",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
      "type": "link"
    },
    {
      "title": "Microsoft Zero Trust documentation",
      "url": "https://learn.microsoft.com/en-us/security/zero-trust/",
      "type": "link"
    }
  ],
  "m6-8": [
    {
      "title": "Microsoft Defender for Endpoint documentation",
      "url": "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/",
      "type": "link"
    },
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    }
  ],
  "m6-9": [
    {
      "title": "Snort documentation",
      "url": "https://www.snort.org",
      "type": "tool"
    },
    {
      "title": "Suricata documentation",
      "url": "https://docs.suricata.io",
      "type": "tool"
    }
  ],
  "m6-10": [
    {
      "title": "OWASP - Web Application Firewall",
      "url": "https://owasp.org/www-community/Web_Application_Firewall",
      "type": "link"
    },
    {
      "title": "ModSecurity",
      "url": "https://github.com/SpiderLabs/ModSecurity",
      "type": "tool"
    }
  ],
  "m6-11": [
    {
      "title": "VMware Horizon documentation",
      "url": "https://docs.vmware.com/en/VMware-Horizon/index.html",
      "type": "link"
    },
    {
      "title": "Microsoft Azure Virtual Desktop documentation",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-desktop/",
      "type": "link"
    }
  ],
  "m6-12": [
    {
      "title": "draw.io",
      "url": "https://app.diagrams.net",
      "type": "tool"
    },
    {
      "title": "Cisco Networking Academy",
      "url": "https://www.netacad.com",
      "type": "platform"
    }
  ],
  "m6": [
    {
      "title": "TryHackMe AD Basics",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Microsoft Active Directory documentation",
      "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ad-ds-getting-started",
      "type": "link"
    },
    {
      "title": "BloodHound documentation",
      "url": "https://bloodhound.readthedocs.io",
      "type": "tool"
    }
  ],
  "L15": [
    {
      "title": "draw.io",
      "url": "https://app.diagrams.net",
      "type": "tool"
    },
    {
      "title": "Cisco Networking Academy",
      "url": "https://www.netacad.com",
      "type": "platform"
    }
  ],
  "L16": [
    {
      "title": "BloodHound documentation",
      "url": "https://bloodhound.readthedocs.io",
      "type": "tool"
    },
    {
      "title": "HackTricks - Active Directory",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "m7-1": [
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m7-2": [
    {
      "title": "OSINT Framework",
      "url": "https://osintframework.com",
      "type": "link"
    },
    {
      "title": "Shodan",
      "url": "https://www.shodan.io",
      "type": "tool"
    },
    {
      "title": "Netcraft Site Report",
      "url": "https://sitereport.netcraft.com",
      "type": "tool"
    }
  ],
  "m7-3": [
    {
      "title": "Nmap official documentation",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m7-4": [
    {
      "title": "Nmap official documentation",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    },
    {
      "title": "Nmap Network Scanning book",
      "url": "https://nmap.org/book/toc.html",
      "type": "link"
    }
  ],
  "m7-5": [
    {
      "title": "Nmap NSE documentation",
      "url": "https://nmap.org/book/nse.html",
      "type": "link"
    },
    {
      "title": "Nmap NSE script library",
      "url": "https://nmap.org/nsedoc/",
      "type": "link"
    }
  ],
  "m7-6": [
    {
      "title": "subfinder (ProjectDiscovery)",
      "url": "https://github.com/projectdiscovery/subfinder",
      "type": "tool"
    },
    {
      "title": "OWASP Amass",
      "url": "https://github.com/owasp-amass/amass",
      "type": "tool"
    },
    {
      "title": "crt.sh",
      "url": "https://crt.sh",
      "type": "tool"
    }
  ],
  "m7-7": [
    {
      "title": "Nessus Essentials",
      "url": "https://www.tenable.com/products/nessus/nessus-essentials",
      "type": "tool"
    },
    {
      "title": "Greenbone/OpenVAS",
      "url": "https://www.greenbone.net",
      "type": "tool"
    }
  ],
  "m7-8": [
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "m7-9": [
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "m7-10": [
    {
      "title": "PTES (Penetration Testing Execution Standard)",
      "url": "http://www.pentest-standard.org",
      "type": "link"
    },
    {
      "title": "OWASP Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "type": "link"
    }
  ],
  "m7-11": [
    {
      "title": "PTES Pre-engagement",
      "url": "http://www.pentest-standard.org",
      "type": "link"
    },
    {
      "title": "SANS Institute",
      "url": "https://www.sans.org",
      "type": "link"
    }
  ],
  "m7-12": [
    {
      "title": "Metasploitable2",
      "url": "https://sourceforge.net/projects/metasploitable/files/Metasploitable2/",
      "type": "tool"
    },
    {
      "title": "Nmap official documentation",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    },
    {
      "title": "Nessus Essentials",
      "url": "https://www.tenable.com/products/nessus/nessus-essentials",
      "type": "tool"
    }
  ],
  "m7": [
    {
      "title": "OSINT Framework",
      "url": "https://osintframework.com",
      "type": "link"
    },
    {
      "title": "Nmap official documentation",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    },
    {
      "title": "Nessus Essentials",
      "url": "https://www.tenable.com/products/nessus/nessus-essentials",
      "type": "tool"
    }
  ],
  "L17": [
    {
      "title": "OSINT Framework",
      "url": "https://osintframework.com",
      "type": "link"
    },
    {
      "title": "Shodan",
      "url": "https://www.shodan.io",
      "type": "tool"
    },
    {
      "title": "Netcraft Site Report",
      "url": "https://sitereport.netcraft.com",
      "type": "tool"
    }
  ],
  "L18": [
    {
      "title": "Nmap official documentation",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    },
    {
      "title": "TryHackMe Nmap rooms",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "L19": [
    {
      "title": "Nessus Essentials",
      "url": "https://www.tenable.com/products/nessus/nessus-essentials",
      "type": "tool"
    },
    {
      "title": "Metasploitable2",
      "url": "https://sourceforge.net/projects/metasploitable/files/Metasploitable2/",
      "type": "tool"
    }
  ],
  "m8-1": [
    {
      "title": "PortSwigger Burp Suite documentation",
      "url": "https://portswigger.net/burp/documentation",
      "type": "link"
    },
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    }
  ],
  "m8-2": [
    {
      "title": "PortSwigger - Getting started with Burp Proxy",
      "url": "https://portswigger.net/burp/documentation/desktop/getting-started",
      "type": "link"
    },
    {
      "title": "FoxyProxy",
      "url": "https://getfoxyproxy.org",
      "type": "tool"
    }
  ],
  "m8-3": [
    {
      "title": "PortSwigger Burp Proxy documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/proxy",
      "type": "link"
    }
  ],
  "m8-4": [
    {
      "title": "PortSwigger Repeater documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/repeater",
      "type": "link"
    }
  ],
  "m8-5": [
    {
      "title": "PortSwigger Intruder documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/intruder",
      "type": "link"
    }
  ],
  "m8-6": [
    {
      "title": "PortSwigger Decoder documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/decoder",
      "type": "link"
    },
    {
      "title": "CyberChef",
      "url": "https://gchq.github.io/CyberChef/",
      "type": "tool"
    }
  ],
  "m8-7": [
    {
      "title": "PortSwigger Burp Scanner documentation",
      "url": "https://portswigger.net/burp/documentation/scanner",
      "type": "link"
    }
  ],
  "m8-8": [
    {
      "title": "PortSwigger Target/Scope documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/target",
      "type": "link"
    }
  ],
  "m8-9": [
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    },
    {
      "title": "FoxyProxy",
      "url": "https://getfoxyproxy.org",
      "type": "tool"
    }
  ],
  "m8-10": [
    {
      "title": "PortSwigger - SQL injection",
      "url": "https://portswigger.net/web-security/sql-injection",
      "type": "platform"
    },
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    }
  ],
  "m8-11": [
    {
      "title": "PortSwigger Intruder documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/intruder",
      "type": "link"
    },
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    }
  ],
  "m8": [
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    },
    {
      "title": "PortSwigger Burp Suite documentation",
      "url": "https://portswigger.net/burp/documentation",
      "type": "link"
    },
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    }
  ],
  "L20": [
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    },
    {
      "title": "FoxyProxy",
      "url": "https://getfoxyproxy.org",
      "type": "tool"
    }
  ],
  "L21": [
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "PortSwigger Burp Proxy documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/proxy",
      "type": "link"
    }
  ],
  "L22": [
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "PortSwigger - SQL injection",
      "url": "https://portswigger.net/web-security/sql-injection",
      "type": "platform"
    },
    {
      "title": "PayloadsAllTheThings - SQL Injection",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection",
      "type": "link"
    }
  ],
  "L23": [
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "PortSwigger Intruder documentation",
      "url": "https://portswigger.net/burp/documentation/desktop/tools/intruder",
      "type": "link"
    }
  ],
  "m9-1": [
    {
      "title": "OWASP Top Ten Project",
      "url": "https://owasp.org/www-project-top-ten/",
      "type": "link"
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "m9-2": [
    {
      "title": "PortSwigger: Cross-site scripting",
      "url": "https://portswigger.net/web-security/cross-site-scripting",
      "type": "link"
    },
    {
      "title": "OWASP Cross Site Scripting Prevention Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "link"
    },
    {
      "title": "PwnFunction (YouTube)",
      "url": "https://www.youtube.com/@PwnFunction",
      "type": "video"
    }
  ],
  "m9-3": [
    {
      "title": "PortSwigger: SQL injection",
      "url": "https://portswigger.net/web-security/sql-injection",
      "type": "link"
    },
    {
      "title": "sqlmap",
      "url": "https://github.com/sqlmapproject/sqlmap",
      "type": "tool"
    },
    {
      "title": "OWASP SQL Injection Prevention Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
      "type": "link"
    }
  ],
  "m9-4": [
    {
      "title": "PortSwigger: Access control vulnerabilities",
      "url": "https://portswigger.net/web-security/access-control",
      "type": "link"
    },
    {
      "title": "OWASP Top 10:2021 A01 Broken Access Control",
      "url": "https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "m9-5": [
    {
      "title": "PortSwigger: Path traversal",
      "url": "https://portswigger.net/web-security/file-path-traversal",
      "type": "link"
    },
    {
      "title": "CWE-22: Path Traversal",
      "url": "https://cwe.mitre.org/data/definitions/22.html",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "link"
    }
  ],
  "m9-6": [
    {
      "title": "PortSwigger: OS command injection",
      "url": "https://portswigger.net/web-security/os-command-injection",
      "type": "link"
    },
    {
      "title": "OWASP OS Command Injection Defense Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io/",
      "type": "tool"
    }
  ],
  "m9-7": [
    {
      "title": "PortSwigger: CSRF",
      "url": "https://portswigger.net/web-security/csrf",
      "type": "link"
    },
    {
      "title": "OWASP Cross-Site Request Forgery Prevention Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "CWE-352: Cross-Site Request Forgery",
      "url": "https://cwe.mitre.org/data/definitions/352.html",
      "type": "link"
    }
  ],
  "m9-8": [
    {
      "title": "PortSwigger: Cross-site scripting",
      "url": "https://portswigger.net/web-security/cross-site-scripting",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "link"
    }
  ],
  "m9-9": [
    {
      "title": "PortSwigger: SQL injection",
      "url": "https://portswigger.net/web-security/sql-injection",
      "type": "link"
    },
    {
      "title": "sqlmap",
      "url": "https://github.com/sqlmapproject/sqlmap",
      "type": "tool"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "m9-10": [
    {
      "title": "PortSwigger: Access control vulnerabilities",
      "url": "https://portswigger.net/web-security/access-control",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "m9-11": [
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "PortSwigger: SQL injection",
      "url": "https://portswigger.net/web-security/sql-injection",
      "type": "link"
    },
    {
      "title": "PortSwigger: Cross-site scripting",
      "url": "https://portswigger.net/web-security/cross-site-scripting",
      "type": "link"
    }
  ],
  "m10-1": [
    {
      "title": "PortSwigger: SSRF",
      "url": "https://portswigger.net/web-security/ssrf",
      "type": "link"
    },
    {
      "title": "OWASP SSRF Prevention Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "HackTricks: SSRF",
      "url": "https://book.hacktricks.xyz/pentesting-web/ssrf-server-side-request-forgery",
      "type": "link"
    }
  ],
  "m10-2": [
    {
      "title": "PortSwigger: Path traversal",
      "url": "https://portswigger.net/web-security/file-path-traversal",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "link"
    }
  ],
  "m10-3": [
    {
      "title": "PortSwigger: Server-side template injection",
      "url": "https://portswigger.net/web-security/server-side-template-injection",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings: Server Side Template Injection",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection",
      "type": "link"
    },
    {
      "title": "PortSwigger Research: Server-Side Template Injection",
      "url": "https://portswigger.net/research/server-side-template-injection",
      "type": "link"
    }
  ],
  "m10-4": [
    {
      "title": "PortSwigger: File upload vulnerabilities",
      "url": "https://portswigger.net/web-security/file-upload",
      "type": "link"
    },
    {
      "title": "OWASP File Upload Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "link"
    }
  ],
  "m10-5": [
    {
      "title": "PortSwigger: Business logic vulnerabilities",
      "url": "https://portswigger.net/web-security/logic-flaws",
      "type": "link"
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "type": "link"
    }
  ],
  "m10-6": [
    {
      "title": "PortSwigger: Information disclosure",
      "url": "https://portswigger.net/web-security/information-disclosure",
      "type": "link"
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "type": "link"
    }
  ],
  "m10-7": [
    {
      "title": "OWASP Top 10:2021 A02 Cryptographic Failures",
      "url": "https://owasp.org/Top10/2021/A02_2021-Cryptographic_Failures/",
      "type": "link"
    },
    {
      "title": "OWASP Cryptographic Storage Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "CWE-327: Use of a Broken or Risky Cryptographic Algorithm",
      "url": "https://cwe.mitre.org/data/definitions/327.html",
      "type": "link"
    }
  ],
  "m10-8": [
    {
      "title": "OWASP API Security Project",
      "url": "https://owasp.org/API-Security/",
      "type": "link"
    },
    {
      "title": "OWASP API Security Top 10 (GitHub)",
      "url": "https://github.com/OWASP/API-Security",
      "type": "link"
    }
  ],
  "m10-9": [
    {
      "title": "OWASP GenAI Security Project: Top 10 for LLM & GenAI",
      "url": "https://genai.owasp.org/llm-top-10/",
      "type": "link"
    },
    {
      "title": "OWASP Top 10 for Large Language Model Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    }
  ],
  "m10-10": [
    {
      "title": "PortSwigger: SSRF",
      "url": "https://portswigger.net/web-security/ssrf",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "m10-11": [
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "m10-12": [
    {
      "title": "PortSwigger: File upload vulnerabilities",
      "url": "https://portswigger.net/web-security/file-upload",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "m10-13": [
    {
      "title": "PortSwigger: Server-side template injection",
      "url": "https://portswigger.net/web-security/server-side-template-injection",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings: Server Side Template Injection",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection",
      "type": "link"
    }
  ],
  "m10-14": [
    {
      "title": "PortSwigger: Business logic vulnerabilities",
      "url": "https://portswigger.net/web-security/logic-flaws",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "m9": [
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    },
    {
      "title": "OWASP Top Ten Project",
      "url": "https://owasp.org/www-project-top-ten/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    },
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    }
  ],
  "m10": [
    {
      "title": "PortSwigger Web Security Academy",
      "url": "https://portswigger.net/web-security",
      "type": "platform"
    },
    {
      "title": "OWASP API Security Project",
      "url": "https://owasp.org/API-Security/",
      "type": "link"
    },
    {
      "title": "OWASP GenAI Security Project: Top 10 for LLM & GenAI",
      "url": "https://genai.owasp.org/llm-top-10/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "L24": [
    {
      "title": "PortSwigger: Cross-site scripting",
      "url": "https://portswigger.net/web-security/cross-site-scripting",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "link"
    }
  ],
  "L25": [
    {
      "title": "PortSwigger: SQL injection",
      "url": "https://portswigger.net/web-security/sql-injection",
      "type": "link"
    },
    {
      "title": "sqlmap",
      "url": "https://github.com/sqlmapproject/sqlmap",
      "type": "tool"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "L26": [
    {
      "title": "PortSwigger: Access control vulnerabilities",
      "url": "https://portswigger.net/web-security/access-control",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "L27": [
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "PortSwigger: SQL injection",
      "url": "https://portswigger.net/web-security/sql-injection",
      "type": "link"
    },
    {
      "title": "PortSwigger: Cross-site scripting",
      "url": "https://portswigger.net/web-security/cross-site-scripting",
      "type": "link"
    }
  ],
  "L28": [
    {
      "title": "PortSwigger: SSRF",
      "url": "https://portswigger.net/web-security/ssrf",
      "type": "link"
    },
    {
      "title": "HackTricks: SSRF",
      "url": "https://book.hacktricks.xyz/pentesting-web/ssrf-server-side-request-forgery",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "L29": [
    {
      "title": "DVWA",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.xyz",
      "type": "link"
    }
  ],
  "L30": [
    {
      "title": "PortSwigger: File upload vulnerabilities",
      "url": "https://portswigger.net/web-security/file-upload",
      "type": "link"
    },
    {
      "title": "OWASP File Upload Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "L31": [
    {
      "title": "PortSwigger: Server-side template injection",
      "url": "https://portswigger.net/web-security/server-side-template-injection",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings: Server Side Template Injection",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection",
      "type": "link"
    }
  ],
  "L32": [
    {
      "title": "PortSwigger: Business logic vulnerabilities",
      "url": "https://portswigger.net/web-security/logic-flaws",
      "type": "link"
    },
    {
      "title": "Burp Suite",
      "url": "https://portswigger.net/burp",
      "type": "tool"
    }
  ],
  "m11": [
    {
      "title": "VulnMachines",
      "url": "https://vulnmachines.com",
      "type": "platform"
    },
    {
      "title": "Hack The Box",
      "url": "https://www.hackthebox.com",
      "type": "platform"
    },
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io",
      "type": "link"
    },
    {
      "title": "Metasploit Unleashed",
      "url": "https://www.offsec.com/metasploit-unleashed/",
      "type": "link"
    }
  ],
  "m11-1": [
    {
      "title": "ired.team Red Team Notes",
      "url": "https://www.ired.team/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.wiki/",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "tool"
    }
  ],
  "m11-2": [
    {
      "title": "Metasploit Unleashed",
      "url": "https://www.offsec.com/metasploit-unleashed/",
      "type": "link"
    },
    {
      "title": "Metasploit Documentation",
      "url": "https://docs.metasploit.com/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.wiki/",
      "type": "link"
    }
  ],
  "m11-3": [
    {
      "title": "Metasploit Unleashed",
      "url": "https://www.offsec.com/metasploit-unleashed/",
      "type": "link"
    },
    {
      "title": "Metasploit Documentation",
      "url": "https://docs.metasploit.com/",
      "type": "link"
    },
    {
      "title": "IppSec (HTB walkthroughs)",
      "url": "https://www.youtube.com/@ippsec",
      "type": "video"
    }
  ],
  "m11-4": [
    {
      "title": "Hashcat",
      "url": "https://hashcat.net/hashcat/",
      "type": "tool"
    },
    {
      "title": "Hashcat example hashes wiki",
      "url": "https://hashcat.net/wiki/doku.php?id=example_hashes",
      "type": "link"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "m11-5": [
    {
      "title": "John the Ripper",
      "url": "https://www.openwall.com/john/",
      "type": "tool"
    },
    {
      "title": "Hashcat",
      "url": "https://hashcat.net/hashcat/",
      "type": "tool"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "m11-6": [
    {
      "title": "THC-Hydra",
      "url": "https://github.com/vanhauser-thc/thc-hydra",
      "type": "tool"
    },
    {
      "title": "Medusa",
      "url": "https://github.com/jmk-foofus/medusa",
      "type": "tool"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "m11-7": [
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.wiki/",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "tool"
    },
    {
      "title": "ired.team Red Team Notes",
      "url": "https://www.ired.team/",
      "type": "link"
    }
  ],
  "m11-8": [
    {
      "title": "LOLBAS Project",
      "url": "https://lolbas-project.github.io/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.wiki/",
      "type": "link"
    },
    {
      "title": "PayloadsAllTheThings",
      "url": "https://github.com/swisskyrepo/PayloadsAllTheThings",
      "type": "tool"
    },
    {
      "title": "ired.team Red Team Notes",
      "url": "https://www.ired.team/",
      "type": "link"
    }
  ],
  "m11-9": [
    {
      "title": "ired.team Red Team Notes",
      "url": "https://www.ired.team/",
      "type": "link"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.wiki/",
      "type": "link"
    },
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    }
  ],
  "m11-10": [
    {
      "title": "VulnMachines",
      "url": "https://vulnmachines.com",
      "type": "platform"
    },
    {
      "title": "Hack The Box",
      "url": "https://www.hackthebox.com",
      "type": "platform"
    },
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io",
      "type": "link"
    }
  ],
  "m11-11": [
    {
      "title": "Hashcat",
      "url": "https://hashcat.net/hashcat/",
      "type": "tool"
    },
    {
      "title": "Hashcat example hashes wiki",
      "url": "https://hashcat.net/wiki/doku.php?id=example_hashes",
      "type": "link"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "m12": [
    {
      "title": "Python Docs",
      "url": "https://docs.python.org/3/",
      "type": "link"
    },
    {
      "title": "Requests library docs",
      "url": "https://requests.readthedocs.io",
      "type": "link"
    },
    {
      "title": "Real Python",
      "url": "https://realpython.com",
      "type": "link"
    },
    {
      "title": "Automate the Boring Stuff with Python",
      "url": "https://automatetheboringstuff.com/",
      "type": "link"
    }
  ],
  "m12-1": [
    {
      "title": "Python Docs",
      "url": "https://docs.python.org/3/",
      "type": "link"
    },
    {
      "title": "Real Python",
      "url": "https://realpython.com",
      "type": "link"
    },
    {
      "title": "Automate the Boring Stuff with Python",
      "url": "https://automatetheboringstuff.com/",
      "type": "link"
    }
  ],
  "m12-2": [
    {
      "title": "Python socket module docs",
      "url": "https://docs.python.org/3/library/socket.html",
      "type": "link"
    },
    {
      "title": "Requests library docs",
      "url": "https://requests.readthedocs.io",
      "type": "link"
    },
    {
      "title": "Real Python: Socket Programming in Python",
      "url": "https://realpython.com/python-sockets/",
      "type": "link"
    }
  ],
  "m12-3": [
    {
      "title": "Python argparse docs",
      "url": "https://docs.python.org/3/library/argparse.html",
      "type": "link"
    },
    {
      "title": "Python re (regex) module docs",
      "url": "https://docs.python.org/3/library/re.html",
      "type": "link"
    },
    {
      "title": "Python subprocess module docs",
      "url": "https://docs.python.org/3/library/subprocess.html",
      "type": "link"
    }
  ],
  "m12-4": [
    {
      "title": "Python socket module docs",
      "url": "https://docs.python.org/3/library/socket.html",
      "type": "link"
    },
    {
      "title": "Nmap Reference Guide",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    },
    {
      "title": "Real Python: Socket Programming in Python",
      "url": "https://realpython.com/python-sockets/",
      "type": "link"
    }
  ],
  "m12-5": [
    {
      "title": "Requests library docs",
      "url": "https://requests.readthedocs.io",
      "type": "link"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.wiki/",
      "type": "link"
    }
  ],
  "m12-6": [
    {
      "title": "Requests library docs",
      "url": "https://requests.readthedocs.io",
      "type": "link"
    },
    {
      "title": "DVWA (Damn Vulnerable Web Application)",
      "url": "https://github.com/digininja/DVWA",
      "type": "tool"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "m12-7": [
    {
      "title": "Ollama",
      "url": "https://ollama.com",
      "type": "tool"
    },
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    },
    {
      "title": "GitHub Copilot",
      "url": "https://github.com/features/copilot",
      "type": "tool"
    }
  ],
  "m13": [
    {
      "title": "Ollama",
      "url": "https://ollama.com",
      "type": "tool"
    },
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    },
    {
      "title": "Simon Willison: Prompt Injection series",
      "url": "https://simonwillison.net/series/prompt-injection/",
      "type": "link"
    },
    {
      "title": "GitHub Copilot",
      "url": "https://github.com/features/copilot",
      "type": "tool"
    }
  ],
  "m13-1": [
    {
      "title": "Google Machine Learning Crash Course",
      "url": "https://developers.google.com/machine-learning/crash-course",
      "type": "link"
    },
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    },
    {
      "title": "MITRE ATLAS",
      "url": "https://atlas.mitre.org/",
      "type": "link"
    }
  ],
  "m13-2": [
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    },
    {
      "title": "MITRE ATLAS",
      "url": "https://atlas.mitre.org/",
      "type": "link"
    },
    {
      "title": "Google Machine Learning Crash Course",
      "url": "https://developers.google.com/machine-learning/crash-course",
      "type": "link"
    }
  ],
  "m13-3": [
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    },
    {
      "title": "MITRE ATLAS",
      "url": "https://atlas.mitre.org/",
      "type": "link"
    }
  ],
  "m13-4": [
    {
      "title": "Ollama",
      "url": "https://ollama.com",
      "type": "tool"
    },
    {
      "title": "Ollama library: deepseek-coder",
      "url": "https://ollama.com/library/deepseek-coder",
      "type": "link"
    }
  ],
  "m13-5": [
    {
      "title": "OSINT Framework",
      "url": "https://osintframework.com/",
      "type": "link"
    },
    {
      "title": "Ollama",
      "url": "https://ollama.com",
      "type": "tool"
    },
    {
      "title": "HackTricks",
      "url": "https://book.hacktricks.wiki/",
      "type": "link"
    }
  ],
  "m13-6": [
    {
      "title": "Have I Been Pwned",
      "url": "https://haveibeenpwned.com",
      "type": "tool"
    },
    {
      "title": "SANS Security Awareness Training",
      "url": "https://www.sans.org/for-organizations/workforce/security-awareness-training",
      "type": "link"
    },
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    }
  ],
  "m13-7": [
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    },
    {
      "title": "Simon Willison: Prompt Injection series",
      "url": "https://simonwillison.net/series/prompt-injection/",
      "type": "link"
    },
    {
      "title": "MITRE ATLAS",
      "url": "https://atlas.mitre.org/",
      "type": "link"
    }
  ],
  "m13-8": [
    {
      "title": "GitHub Copilot",
      "url": "https://github.com/features/copilot",
      "type": "tool"
    },
    {
      "title": "CodeQL",
      "url": "https://codeql.github.com",
      "type": "tool"
    },
    {
      "title": "Semgrep",
      "url": "https://semgrep.dev",
      "type": "tool"
    }
  ],
  "m13-9": [
    {
      "title": "Ollama",
      "url": "https://ollama.com",
      "type": "tool"
    },
    {
      "title": "Requests library docs",
      "url": "https://requests.readthedocs.io",
      "type": "link"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "m13-10": [
    {
      "title": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "type": "link"
    },
    {
      "title": "Have I Been Pwned",
      "url": "https://haveibeenpwned.com",
      "type": "tool"
    },
    {
      "title": "SANS Security Awareness Training",
      "url": "https://www.sans.org/for-organizations/workforce/security-awareness-training",
      "type": "link"
    }
  ],
  "m14": [
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "VirusTotal",
      "url": "https://www.virustotal.com",
      "type": "tool"
    },
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    }
  ],
  "m14-1": [
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    },
    {
      "title": "OWASP",
      "url": "https://owasp.org",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m14-2": [
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "NIST SP 800-61: Computer Security Incident Handling Guide",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r2/final",
      "type": "link"
    },
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    }
  ],
  "m14-3": [
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    },
    {
      "title": "NIST SP 800-61: Computer Security Incident Handling Guide",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r2/final",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m14-4": [
    {
      "title": "Microsoft Learn: Event 4657 (registry value modified)",
      "url": "https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4657",
      "type": "link"
    },
    {
      "title": "Microsoft Learn: Audit Registry",
      "url": "https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/audit-registry",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    }
  ],
  "m14-5": [
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    },
    {
      "title": "Wireshark Documentation",
      "url": "https://www.wireshark.org/docs/",
      "type": "link"
    },
    {
      "title": "CyberChef",
      "url": "https://gchq.github.io/CyberChef/",
      "type": "tool"
    }
  ],
  "m14-6": [
    {
      "title": "VirusTotal",
      "url": "https://www.virustotal.com",
      "type": "tool"
    },
    {
      "title": "VirusTotal Documentation",
      "url": "https://docs.virustotal.com",
      "type": "link"
    }
  ],
  "m14-7": [
    {
      "title": "NIST SP 800-61: Computer Security Incident Handling Guide",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r2/final",
      "type": "link"
    },
    {
      "title": "MITRE ATT&CK",
      "url": "https://attack.mitre.org",
      "type": "link"
    }
  ],
  "m14-8": [
    {
      "title": "YARA Documentation",
      "url": "https://yara.readthedocs.io",
      "type": "link"
    },
    {
      "title": "Awesome YARA",
      "url": "https://github.com/InQuest/awesome-yara",
      "type": "tool"
    }
  ],
  "m15": [
    {
      "title": "roadmap.sh/cyber-security",
      "url": "https://roadmap.sh/cyber-security",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Hack The Box",
      "url": "https://www.hackthebox.com",
      "type": "platform"
    }
  ],
  "m15-1": [
    {
      "title": "roadmap.sh/cyber-security",
      "url": "https://roadmap.sh/cyber-security",
      "type": "link"
    },
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Hack The Box",
      "url": "https://www.hackthebox.com",
      "type": "platform"
    }
  ],
  "m15-2": [
    {
      "title": "roadmap.sh/cyber-security",
      "url": "https://roadmap.sh/cyber-security",
      "type": "link"
    },
    {
      "title": "eJPT Certification (INE)",
      "url": "https://ine.com/security/certifications/ejpt-certification",
      "type": "link"
    },
    {
      "title": "OffSec PEN-200 / OSCP",
      "url": "https://www.offsec.com/courses/pen-200/",
      "type": "link"
    }
  ],
  "m15-3": [
    {
      "title": "CompTIA Security+",
      "url": "https://www.comptia.org/en-us/certifications/security/",
      "type": "link"
    },
    {
      "title": "roadmap.sh/cyber-security",
      "url": "https://roadmap.sh/cyber-security",
      "type": "link"
    }
  ],
  "m15-4": [
    {
      "title": "roadmap.sh/cyber-security",
      "url": "https://roadmap.sh/cyber-security",
      "type": "link"
    },
    {
      "title": "Hack The Box",
      "url": "https://www.hackthebox.com",
      "type": "platform"
    },
    {
      "title": "VulnMachines",
      "url": "https://vulnmachines.com",
      "type": "platform"
    }
  ],
  "m15-5": [
    {
      "title": "HackerOne",
      "url": "https://www.hackerone.com",
      "type": "platform"
    },
    {
      "title": "Bugcrowd",
      "url": "https://www.bugcrowd.com",
      "type": "platform"
    }
  ],
  "m15-6": [
    {
      "title": "TryHackMe",
      "url": "https://tryhackme.com",
      "type": "platform"
    },
    {
      "title": "Hack The Box",
      "url": "https://www.hackthebox.com",
      "type": "platform"
    },
    {
      "title": "PicoCTF",
      "url": "https://picoctf.org",
      "type": "platform"
    }
  ],
  "L33": [
    {
      "title": "VulnMachines",
      "url": "https://vulnmachines.com",
      "type": "platform"
    },
    {
      "title": "GTFOBins",
      "url": "https://gtfobins.github.io",
      "type": "link"
    },
    {
      "title": "Exploit-DB",
      "url": "https://www.exploit-db.com",
      "type": "tool"
    }
  ],
  "L34": [
    {
      "title": "Hashcat",
      "url": "https://hashcat.net/hashcat/",
      "type": "tool"
    },
    {
      "title": "Hashcat example hashes wiki",
      "url": "https://hashcat.net/wiki/doku.php?id=example_hashes",
      "type": "link"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "L35": [
    {
      "title": "Python socket module docs",
      "url": "https://docs.python.org/3/library/socket.html",
      "type": "link"
    },
    {
      "title": "Nmap Reference Guide",
      "url": "https://nmap.org/book/man.html",
      "type": "link"
    }
  ],
  "L36": [
    {
      "title": "Requests library docs",
      "url": "https://requests.readthedocs.io",
      "type": "link"
    },
    {
      "title": "SecLists",
      "url": "https://github.com/danielmiessler/SecLists",
      "type": "tool"
    }
  ],
  "L37": [
    {
      "title": "Wireshark",
      "url": "https://www.wireshark.org",
      "type": "tool"
    },
    {
      "title": "Wireshark Documentation",
      "url": "https://www.wireshark.org/docs/",
      "type": "link"
    }
  ],
  "L38": [
    {
      "title": "PTES (Penetration Testing Execution Standard)",
      "url": "http://www.pentest-standard.org",
      "type": "link"
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "type": "link"
    },
    {
      "title": "NIST SP 800-61: Computer Security Incident Handling Guide",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r2/final",
      "type": "link"
    }
  ]
}
