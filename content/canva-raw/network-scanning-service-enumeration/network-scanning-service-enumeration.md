# Network Scanning & Service Enumeration

_Category: Network Scanning & Service Enumeration — Source: https://www.canva.com/design/DAGnxjyFyAg/xWr7Zi9-86eKotyLpl2LYA/edit_

---

## Slide 1

NETWORK SCANNING &
SERVICE ENUMERATION

Network Scanning & Service Enumeration

## Slide 2

NETWORK SCANNING & SERVICE ENUMERATION

This module covers how attackers and security professionals identify live systems,
open ports, running services, and potential vulnerabilities on a network. 

Tools like Nmap, Netcat, and Nessus are commonly used in these phases.

Network Scanning & Service Enumeration

This module covers how attackers and security professionals identify live systems, open ports, running services, and potential vulnerabilities on a network.

Tools like Nmap, Netcat, and Nessus are commonly used in these phases.

## Slide 3

Network Discovery is the process of identifying active devices (hosts) on a network.
Before scanning ports or services, you must first find which IP addresses are alive.

Eg: It’s like "knocking on doors" to see who is home.

NETWORK DISCOVERY

Network Discovery

Network Discovery is the process of identifying active devices (hosts) on a network. Before scanning ports or services, you must first find which IP addresses are alive.

Eg: It’s like "knocking on doors" to see who is home.

## Slide 4

TECHNIQUES

Identify live hosts Tool:
fping, nmap -sn
192.168.1.0/24

Tool: 

arp-scan, nmap -PR

nmap -sn 192.168.0.0/24

This performs a ping sweep and lists live hosts. Host/Network Discovery is the
process of finding which IP addresses on a network are up (alive). This is the first
step before scanning for services or ports.

Identify hostnames from
DNS Tool:

 nslookup, dnsenum, dig

ICMP ECHO REQUESTS
(PING SWEEP)

ARP SCANNING 

(LOCAL NETWORKS)

DNS 

ENUMERATION

Techniques

ICMP Echo Requests (Ping Sweep)

ARP Scanning

(Local Networks)

DNS

Enumeration

Identify live hosts Tool: fping, nmap -sn 192.168.1.0/24

Tool:

arp-scan, nmap -PR

nmap -sn 192.168.0.0/24

Identify hostnames from DNS Tool:

nslookup, dnsenum, dig

This performs a ping sweep and lists live hosts. Host/Network Discovery is the process of finding which IP addresses on a network are up (alive). This is the first step before scanning for services or ports.

## Slide 5

Identifying which services and protocols are running on the discovered systems.

Port scanning is the process
of probing a target machine
to see which ports are open
and which services are
running on those ports.

Each open port may
indicate a running service,
which can be further
enumerated or exploited.

ENUMERATING NETWORK SERVICES & PROTOCOLS

WHAT IS PORT SCANNING?

Enumerating Network Services & Protocols

Identifying which services and protocols are running on the discovered systems.

What is port scanning?

Port scanning is the process of probing a target machine to see which ports are open and which services are running on those ports.

Each open port may indicate a running service, which can be further enumerated or exploited.

## Slide 6

Default TCP Scan (Top 1000 Ports)

TCP SYN Scan (Stealth Scan)

Full Port Scan (All 65535 Ports)

Use with -sS for full TCP SYN scan: nmap -sS -p- <target-ip>

nmap <target-ip>

nmap -sV <target>

nmap -p- <target-ip>

ESSENTIAL NMAP PORT SCAN COMMANDS

Essential Nmap Port Scan Commands

Default TCP Scan (Top 1000 Ports)

nmap <target-ip>

TCP SYN Scan (Stealth Scan)

nmap -sV <target>

Full Port Scan (All 65535 Ports)

nmap -p- <target-ip>

Use with -sS for full TCP SYN scan: nmap -sS -p- <target-ip>

## Slide 7

Scan Specific Ports Only

UDP Port Scan

Slower than TCP

Good for finding services like DNS,
SNMP, TFTP

Scan TCP and UDP Together

Useful for full enumeration across both protocols

nmap -p 21,22,80,443 <target-ip>

nmap -sV <target>

nmap -sS -sU -p T:1-1024,U:1-100 <target-ip>

ESSENTIAL NMAP PORT SCAN COMMANDS

Essential Nmap Port Scan Commands

Scan Specific Ports Only

nmap -p 21,22,80,443 <target-ip>

UDP Port Scan

Slower than TCP

Good for finding services like DNS, SNMP, TFTP

nmap -sV <target>

Scan TCP and UDP Together

nmap -sS -sU -p T:1-1024,U:1-100 <target-ip>

Useful for full enumeration across both protocols

## Slide 8

FTP, SMB, SNMP, HTTP, SSH, etc

nmap --script

enum4linux (for
SMB/NetBIOS)

snmpwalk 

(for SNMP)

PROTOCOL ENUMERATION

USE TOOLS LIKE

Protocol Enumeration

FTP, SMB, SNMP, HTTP, SSH, etc

Use tools like

nmap --script

enum4linux (for SMB/NetBIOS)

snmpwalk

(for SNMP)

## Slide 9

After discovering live hosts and enumerating services, the next step is to identify
known vulnerabilities that can be exploited. This process involves version
fingerprinting, banner grabbing, vulnerability scanning, and manual verification.

IDENTIFYING VULNERABILITIES IN
NETWORK SERVICES

Identifying Vulnerabilities in Network Services

After discovering live hosts and enumerating services, the next step is to identify known vulnerabilities that can be exploited. This process involves version fingerprinting, banner grabbing, vulnerability scanning, and manual verification.

## Slide 10

Service Version Detection Accurately detecting the version of a service helps in
mapping it to known CVEs (Common Vulnerabilities and Exposures).

nc <target> <port>

220 ProFTPD 1.3.5 Server (Debian)

nmap -sV 

 Detects service versions

nmap --script=banner
Grabs banners

netcat, telnet, or curl
Manual banner grabbing

TOOLS

You can search this version on https://cvedetails.com or Exploit-DB

Service Version Detection Accurately detecting the version of a service helps in mapping it to known CVEs (Common Vulnerabilities and Exposures).

Tools

nmap -sV

Detects service versions

nmap --script=banner Grabs banners

netcat, telnet, or curl Manual banner grabbing

nc <target> <port>

220 ProFTPD 1.3.5 Server (Debian)

You can search this version on https://cvedetails.com or Exploit-DB

## Slide 11

Automated Vulnerability Scanning Automated tools scan for a wide range of
known issues in discovered services.

Nmap NSE (Nmap Scripting Engine)

Scripts like smb-vuln-ms17-010, http-vuln-cve2020-3452

Detects outdated server versions, directory traversal, default files.

Nikto (for Web Servers)

nmap --script vuln <target>

nikto -h http://<target>

Automated Vulnerability Scanning Automated tools scan for a wide range of known issues in discovered services.

Nmap NSE (Nmap Scripting Engine)

nmap --script vuln <target>

Scripts like smb-vuln-ms17-010, http-vuln-cve2020-3452

Nikto (for Web Servers)

nikto -h http://<target>

Detects outdated server versions, directory traversal, default files.

## Slide 12

OpenVAS / Nessus

Comprehensive
vulnerability
scanners

Provides CVSS score,
CVE ID, and remediation
guidance

Supports
authenticated scans
for deeper analysis

OpenVAS / Nessus

Comprehensive vulnerability scanners

Provides CVSS score, CVE ID, and remediation guidance

Supports authenticated scans for deeper analysis

## Slide 13

Manual CVE Research

Once service and version info is known

Use CVE Details,
NVD, Exploit-DB

Cross-check with

Vendor advisory pages

Metasploit modules

GitHub PoCs

Manual CVE Research

Once service and version info is known

Use CVE Details, NVD, Exploit-DB

Vendor advisory pages

Cross-check with

Metasploit modules

GitHub PoCs

## Slide 14

nmap -sV -p 21,22,80 <target>

Offensive security involves roles such as Penetration testing, Vulnerability assessment,
Red teaming etc. where your goal is to try to compromise a system.

Look up vsftpd 2.3.4
Known backdoor
vulnerability 

(CVE-2011-2523)

Apache 2.2.8 

Search for CVEs and verify
using tools like Nikto or
manual directory fuzzing

EXAMPLE

NMAP SHOWS

ACTIONS

Example

Offensive security involves roles such as Penetration testing, Vulnerability assessment, Red teaming etc. where your goal is to try to compromise a system.

Nmap shows

nmap -sV -p 21,22,80 <target>

Actions

Look up vsftpd 2.3.4 Known backdoor vulnerability

(CVE-2011-2523)

Apache 2.2.8

Search for CVEs and verify using tools like Nikto or manual directory fuzzing
