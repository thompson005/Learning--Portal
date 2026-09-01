# What happens when you type a URL and press Enter

_Category: Networking — Source: https://www.canva.com/design/DAGUKdynDu0/GXE9mtkzJi6K2Z6inUmvVw/edit_

---

## Slide 1

WHAT HAPPENS WHEN
YOU TYPE A URL IN YOUR
BROWSER AND PRESS
ENTER?

What happens when you type a URL in your browser and press Enter?

## Slide 2

6.0s
Animate
Position

The internet relies on IP addresses to route data between servers and clients, but
people use human-readable domain names (like google.com). DNS is the system that
translates domain names into IP addresses.

DNS RESOLUTION (DOMAIN NAME SYSTEM)

WWW.GOOGLE.COM (URL)

95.185.162.23 (IP)

DNS Resolution (Domain Name System)

The internet relies on IP addresses to route data between servers and clients, but people use human-readable domain names (like google.com). DNS is the system that translates domain names into IP addresses.

www.google.com (url)

95.185.162.23 (IP)

## Slide 3

6.0s
Animate
Position

Browser Cache Check

 First, your browser checks its cache (saved history) to see if it has the IP address for
(google.com) saved from a previous visit.

HERE’S THE DETAILED DNS PROCESS

Here’s the detailed DNS process

Browser Cache Check

First, your browser checks its cache (saved history) to see if it has the IP address for (google.com) saved from a previous visit.

4 elements, To start navigating the group contents, press Enter

## Slide 4

6.0s
Animate
Position

Operating System Cache Check

If the browser doesn’t have the IP in the cache, the request is passed to the operating
system (OS), which checks its own DNS cache.

HERE’S THE DETAILED DNS PROCESS

OS CACHE CHECK

Here’s the detailed DNS process

Operating System Cache Check

If the browser doesn’t have the IP in the cache, the request is passed to the operating system (OS), which checks its own DNS cache.

os Cache Check

## Slide 5

6.0s
Animate
Position

OS CACHE CHECK

Local DNS Server Check

If the OS cache doesn’t have the IP, it sends a DNS query to a DNS resolver (usually
your Internet Service Provider’s DNS server). This server might already know the IP
address of google.com and can respond immediately.

HERE’S THE DETAILED DNS PROCESS

Here’s the detailed DNS process

Local DNS Server Check

If the OS cache doesn’t have the IP, it sends a DNS query to a DNS resolver (usually your Internet Service Provider’s DNS server). This server might already know the IP address of google.com and can respond immediately.

2 elements, To start navigating the group contents, press Enter

os Cache Check

## Slide 6

6.0s
Animate
Position

Recursive Query

 If the local DNS server doesn’t know the IP, it acts as a recursive resolver, querying
other DNS servers on the internet. This may involve

Root DNS / TLD DNS / Authoritative DNS

HERE’S THE DETAILED DNS PROCESS

Here’s the detailed DNS process

Recursive Query

If the local DNS server doesn’t know the IP, it acts as a recursive resolver, querying other DNS servers on the internet. This may involve

Root DNS / TLD DNS / Authoritative DNS

## Slide 7

5.0s
Animate
Position

Root DNS Servers 

These are the highest level of DNS servers. They direct the query to the DNS servers
responsible for the .com domain (Top-Level Domain servers).

HERE’S THE DETAILED DNS PROCESS

ROOT DNS SERVERS 

Here’s the detailed DNS process

Root DNS Servers

These are the highest level of DNS servers. They direct the query to the DNS servers responsible for the .com domain (Top-Level Domain servers).

Root DNS Servers

## Slide 8

6.4s
Animate
Position

TLD DNS Servers

These servers know where to find the authoritative name servers for google.com.

HERE’S THE DETAILED DNS PROCESS

Here’s the detailed DNS process

TLD DNS Servers

These servers know where to find the authoritative name servers for google.com.

## Slide 9

5.0s
Animate
Position

Authoritative DNS Servers

The DNS server that holds the IP address information for google.com. This server
replies with the IP address (e.g., 172.217.1.110).

 google.com
(172.217.1.110)

HERE’S THE DETAILED DNS PROCESS

Here’s the detailed DNS process

Authoritative DNS Servers

The DNS server that holds the IP address information for google.com. This server replies with the IP address (e.g., 172.217.1.110).

google.com (172.217.1.110)

## Slide 10

6.0s
Animate
Position

Cache and Return

The recursive resolver caches the IP address for future use and sends it back to your
browser. This process usually takes milliseconds.

HERE’S THE DETAILED DNS PROCESS

BROWSER

DNS SERVER

Here’s the detailed DNS process

Cache and Return

The recursive resolver caches the IP address for future use and sends it back to your browser. This process usually takes milliseconds.

BROWSER

DNS SERVER

## Slide 11

5.0s
Animate
Position

Now that the browser knows the IP address of google.com, it needs to establish a
connection. The browser initiates a TCP (Transmission Control Protocol) connection to
the server using the IP address it received.

ESTABLISHING A TCP CONNECTION

TCP CONNECTION

BROWSER

SERVER

Establishing a TCP Connection

Now that the browser knows the IP address of google.com, it needs to establish a connection. The browser initiates a TCP (Transmission Control Protocol) connection to the server using the IP address it received.

BROWSER

TCP Connection

SERVER

## Slide 12

5.3s
Animate
Position

SYN

The browser sends a TCP packet with the SYN (synchronize) flag to the server,
essentially saying, “I want to establish a connection”.

HERE’S HOW TCP WORKS

THREE-WAY HANDSHAKE

CLIENT

SERVER

SYN (SYNCHRONIZE)

Here’s how TCP works

Three-Way Handshake

SYN

The browser sends a TCP packet with the SYN (synchronize) flag to the server, essentially saying, “I want to establish a connection”.

CLIENT

SYN (synchronize)

SERVER

## Slide 13

5.3s
Animate
Position

SYN-ACK

The server responds with a SYN-ACK (synchronize-acknowledge) packet, indicating
that it’s ready to establish a connection

HERE’S HOW TCP WORKS

THREE-WAY HANDSHAKE

CLIENT

SERVER

SYN-ACK 

(SYNCHRONIZE-ACKNOWLEDGE)

Here’s how TCP works

Three-Way Handshake

SYN-ACK

The server responds with a SYN-ACK (synchronize-acknowledge) packet, indicating that it’s ready to establish a connection

CLIENT

SYN-ACK

(synchronize-acknowledge)

SERVER
