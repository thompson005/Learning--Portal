# DMZ

_Category: Corporate Network — Source: https://www.canva.com/design/DAGliXC28Vs/PL3gTaEwoB-4gSsqkyYAiQ/edit_

---

## Slide 1

DMZ

## Slide 2

DMZ

INTERNAL LAN

EXTERNAL INTERNET

DMZ

A DMZ in networking is a segmented, isolated subnetwork that sits between 

a trusted internal network (like your organization's LAN) and 

an untrusted external network (like the internet). 

The purpose of a DMZ is to expose public-facing services (e.g., web servers,
email servers, DNS servers) to external users while protecting 

the internal network from direct exposure.

DMZ

A DMZ in networking is a segmented, isolated subnetwork that sits between

a trusted internal network (like your organization's LAN) and

an untrusted external network (like the internet).

The purpose of a DMZ is to expose public-facing services (e.g., web servers, email servers, DNS servers) to external users while protecting

the internal network from direct exposure.

internal Lan

dmz

external internet

## Slide 3

One interface connects to
the Internal LAN

 (trusted zone)

One interface
connects to the DMZ
(semi-trusted zone)

One interface connects
to the Internet
(untrusted zone)

In a typical 3-legged firewall setup

HOW IT WORKS

How It Works

In a typical 3-legged firewall setup

One interface connects to the Internet (untrusted zone)

One interface connects to the DMZ (semi-trusted zone)

One interface connects to the Internal LAN

(trusted zone)

## Slide 4

Internet → DMZ                                 :Allowed (e.g., HTTP access to web server)

DMZ → Internal Network             : Strictly restricted

Internal Network → DMZ             : Allowed (e.g., for administration)

Internet → Internal Network     : Blocked

TRAFFIC RULES ARE APPLIED LIKE THIS

DMZ

Traffic rules are applied like this

Internet → DMZ :Allowed (e.g., HTTP access to web server)

DMZ → Internal Network : Strictly restricted

Internal Network → DMZ : Allowed (e.g., for administration)

Internet → Internal Network : Blocked

dmz

## Slide 5

Limit attack surface

Only specific
ports/services are
exposed.

Isolate public services 

If a public server gets
compromised, the attacker
can’t easily pivot into the
internal network.

Logging & monitoring

Easier to monitor and
detect malicious activity
targeting public-facing
assets.

PURPOSE OF DMZ

Purpose of DMZ

Isolate public services

If a public server gets compromised, the attacker can’t easily pivot into the internal network.

Limit attack surface

Only specific ports/services are exposed.

Logging & monitoring

Easier to monitor and detect malicious activity targeting public-facing assets.

## Slide 6

Web Servers
(HTTP/HTTPS)

Mail Servers
(SMTP)

DNS 

Servers

Reverse Proxies
/ Load Balancers

VPN 

Gateways

COMMON SERVICES PLACED IN A DMZ

Common Services Placed in a DMZ

Web Servers (HTTP/HTTPS)

Mail Servers (SMTP)

DNS

Servers

VPN

Gateways

Reverse Proxies / Load Balancers
