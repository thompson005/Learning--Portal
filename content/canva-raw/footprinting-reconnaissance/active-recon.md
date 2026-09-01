# Active_recon

_Category: Footprinting & Reconnaissance — Source: https://www.canva.com/design/DAGiEStriX8/IeF3FClGG9-G_A0Ell09Og/edit_

---

## Slide 1

ACTIVE
RECONNAISSANCE

Active Reconnaissance

## Slide 2

5.4s
Animate
Position

ACTIVE RECONNAISSANCE

Active Footprinting involves collecting
information about a target network
with direct interaction, where the
target may recognize the process.

As an ethical hacker or

 pen tester, you perform active
security assessments. Before you
begin, always discuss and define the
scope with management to establish 

Rules of Engagement (RoE).

Active Reconnaissance

Active Footprinting involves collecting information about a target network with direct interaction, where the target may recognize the process.

As an ethical hacker or

pen tester, you perform active security assessments. Before you begin, always discuss and define the scope with management to establish

Rules of Engagement (RoE).

## Slide 3

5.0s
Animate
Position

Think of it like knocking on doors in a neighborhood to see who’s home and what
they’re doing — but in the digital world.

SIMPLE TERM

Simple Term

Think of it like knocking on doors in a neighborhood to see who’s home and what they’re doing — but in the digital world.

## Slide 4

5.0s
Animate
Position

The key goals are:

Extract information about the target organization through direct interaction.

Identify live hosts and open ports

Detect running services and versions

Map the network infrastructure

Identify vulnerabilities

GOAL OF ACTIVE RECONNAISSANCE

Goal of Active Reconnaissance

Extract information about the target organization through direct interaction.

The key goals are:

Identify live hosts and open ports

Detect running services and versions

Map the network infrastructure

Identify vulnerabilities

## Slide 5

5.0s
Animate
Position

Use ping to check the availability
and response time of a target
website.

Example: ping example.com
sends ICMP echo requests to
the target domain and measures
the response time, indicating
whether the host is up.

Ping Command Line Utility

Initiate Ping

Send Echo Request

Receive Echo Reply

Measure Response Time

Determine Host
Status

This section details methods that involve directly interacting with the target website
to gather information.

1. PERFORM WEBSITE FOOTPRINTING (ACTIVE)

1. Perform Website Footprinting (Active)

This section details methods that involve directly interacting with the target website to gather information.

Ping Command Line Utility

Initiate Ping

Receive Echo Reply

Determine Host Status

Use ping to check the availability and response time of a target website.

Example: ping example.com sends ICMP echo requests to the target domain and measures the response time, indicating whether the host is up.

Send Echo Request

Measure Response Time

## Slide 6

5.0s
Animate
Position

Use Photon to crawl a target website and extract URLs, files, and other information.

Example: photon -u http://example.com -t 3 -l 2 crawls the target website, sets the
number of threads to 3, and sets the maximum depth of crawling to 2.

Photon

Photon

Use Photon to crawl a target website and extract URLs, files, and other information.

Example: photon -u http://example.com -t 3 -l 2 crawls the target website, sets the number of threads to 3, and sets the maximum depth of crawling to 2.

## Slide 7

5.0s
Animate
Position

Gather a wordlist from the target website to use in password cracking attacks.

HTTrack Web Site Copier

Example: cewl -d 2 -w passlist.txt http://example.com sets the depth of crawling to 2
and specifies the output file for the generated wordlist.

CeWL

Specify output
file

Set crawling
depth

Initiate cewl
command

cewl

CeWL

Gather a wordlist from the target website to use in password cracking attacks.

Example: cewl -d 2 -w passlist.txt http://example.com sets the depth of crawling to 2 and specifies the output file for the generated wordlist.

cewl

Initiate cewl command

Set crawling depth

Specify output file

HTTrack Web Site Copier

## Slide 8

6.0s
Animate
Position

Actively trace emails to identify sender locations and paths. Use this tool to analyze
the origin and route of emails sent by the target organization.

eMailTrackerPro

Actively analyze email headers and traces to gain insights into the target's email
infrastructure.

2. PERFORM EMAIL FOOTPRINTING (ACTIVE)

2. Perform Email Footprinting (Active)

Actively analyze email headers and traces to gain insights into the target's email infrastructure.

eMailTrackerPro

Actively trace emails to identify sender locations and paths. Use this tool to analyze the origin and route of emails sent by the target organization.

## Slide 9

6.0s
Animate
Position

Gather DNS information.

Example: nslookup example.com queries DNS servers for records related to the
target domain.

nslookup Command Line Utility

Techniques for directly querying DNS servers to gather information about the
target domain.

3. PERFORM DNS FOOTPRINTING (ACTIVE)

3. Perform DNS Footprinting (Active)

Techniques for directly querying DNS servers to gather information about the target domain.

nslookup Command Line Utility

Gather DNS information.

Example: nslookup example.com queries DNS servers for records related to the target domain.

## Slide 10

9.0s
Animate
Position

Perform reverse DNS lookups and standard DNS checks.

Example: dnsrecon -d example.com -t std performs standard DNS checks on the
specified domain.

DNSRecon

DNSRecon

Perform reverse DNS lookups and standard DNS checks.

Example: dnsrecon -d example.com -t std performs standard DNS checks on the specified domain.

## Slide 11

7.1s
Animate
Position

Attempt to request a zone transfer from the DNS server (if allowed).

Example: dig axfr example.com @ns1.example.com attempts to perform a zone
transfer from the specified DNS server (if allowed).

Zone Transfer Attempt

Zone Transfer Attempt

Attempt to request a zone transfer from the DNS server (if allowed).

Example: dig axfr example.com @ns1.example.com attempts to perform a zone transfer from the specified DNS server (if allowed).

## Slide 12

5.8s
Animate
Position

Use traceroute (Linux/macOS) or tracert (Windows) to map network paths.

Example (Linux/macOS): traceroute example.com traces the route to the target domain.

Network Tracerouting

Tracerouting

Methods for actively probing and mapping the network infrastructure of the target.

4. PERFORM NETWORK FOOTPRINTING (ACTIVE)

4. Perform Network Footprinting (Active)

Methods for actively probing and mapping the network infrastructure of the target.

Network Tracerouting

Use traceroute (Linux/macOS) or tracert (Windows) to map network paths.

Example (Linux/macOS): traceroute example.com traces the route to the target domain.

Tracerouting

## Slide 13

6.0s
Animate
Position

Use the Network Mapper to
scan for open ports.

Use this tool to perform
vulnerability scanning.

Example: nmap -sS -sV -O -p 1-
65535 [target ip]

Nmap

Nessus

Using Network Scanning Tools 

5.ACTIVE SCANNING

5.Active Scanning

Using Network Scanning Tools

Nmap

Use the Network Mapper to scan for open ports.

Nessus

Use this tool to perform vulnerability scanning.

Example: nmap -sS -sV -O -p 1-65535 [target ip]

## Slide 14

5.0s
Animate
Position

Gathering information about the target organization, you must understand the type of
information to collect

Network blocks

IP addresses of systems

OS

Services

Versions

Firewall

Gathering information about the target organization, you must understand the type of information to collect

Network blocks

IP addresses of systems

OS

Services

Versions

Firewall

## Slide 15

5.0s
Animate
Position

Nessus is a commercial product, whereas OpenVAS is free and is a good alternative
to the former.

NESSUS/OPENVAS

Nessus/OpenVAS

Nessus is a commercial product, whereas OpenVAS is free and is a good alternative to the former.

## Slide 16

5.0s
Animate
Position

Port Scanning with Nmap

Directly scan the target network
to identify open ports.

Example: nmap -p 1-65535
target.com

Service Version Detection Scan
with Nmap

Determine versions of services
running on open ports.

Example: nmap -sV target.com

Attempts to Find Vulnerabilities

Actively assess the target system
for known vulnerabilities.

Example: Using Nikto to scan a
web server: nikto -h target.com

Ping Sweeps: 

Identifying live hosts on a network.

Example: nmap -sn 192.168.1.0/24

ADDITIONAL ACTIVE RECONNAISSANCE METHODS

Additional Active Reconnaissance Methods

Port Scanning with Nmap

Directly scan the target network to identify open ports.

Example: nmap -p 1-65535 target.com

Attempts to Find Vulnerabilities

Actively assess the target system for known vulnerabilities.

Example: Using Nikto to scan a web server: nikto -h target.com

Service Version Detection Scan with Nmap

Determine versions of services running on open ports.

Example: nmap -sV target.com

Ping Sweeps:

Identifying live hosts on a network.

Example: nmap -sn 192.168.1.0/24

## Slide 17

5.0s
Animate
Position

Obtain explicit permission before performing active reconnaissance.

Respect the privacy and legal boundaries of the target organization.

Document all activities and findings.

Follow the agreed-upon rules of engagement.

ETHICAL CONSIDERATIONS

Ethical Considerations

Obtain explicit permission before performing active reconnaissance.

Respect the privacy and legal boundaries of the target organization.

Document all activities and findings.

Follow the agreed-upon rules of engagement.
