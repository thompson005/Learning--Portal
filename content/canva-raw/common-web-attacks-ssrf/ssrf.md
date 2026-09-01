# Ssrf

_Category: Common Web Attacks / SSRF — Source: https://www.canva.com/design/DAGm26pJWh0/AI8XVPd1pb_LME1tlQZP6A/edit_

---

## Slide 1

SERVER SIDE 

REQUEST FORGERY

Server Side

Request Forgery

## Slide 2

SERVER SIDE REQUEST FORGERY

Server-side request Forgery (SSRF) is a security vulnerability where an attacker tricks a server-side application into making unintended requests to internal or external resources.

Server Side Request Forgery

Server-side request Forgery (SSRF) is a security vulnerability where an attacker tricks a server-side application into making unintended requests to internal or external resources.

## Slide 3

SERVER SIDE REQUEST FORGERY

This happens when the application accepts a user-supplied URL or address and
fetches data without proper validation. In a typical SSRF attack, the attacker might
cause the server to connect to internal-only services within the organization's
infrastructure.

Accept without proper validation

Server Side Request Forgery

This happens when the application accepts a user-supplied URL or address and fetches data without proper validation. In a typical SSRF attack, the attacker might cause the server to connect to internal-only services within the organization's infrastructure.

Accept without proper validation

## Slide 4

SERVER SIDE REQUEST FORGERY

In other cases, they may be able to force the server to connect to arbitrary external systems. This could leak sensitive data, such as authorization credentials.

Server Side Request Forgery

In other cases, they may be able to force the server to connect to arbitrary external systems. This could leak sensitive data, such as authorization credentials.

## Slide 5

SIMPLE TERMS

Imagine, You are staying at a hotel. The hotel receptionist (server) is responsible for
making phone calls on behalf of guests. Normally, you tell them to call your friend’s
number, and they connect you.

Simple Terms

Imagine, You are staying at a hotel. The hotel receptionist (server) is responsible for making phone calls on behalf of guests. Normally, you tell them to call your friend’s number, and they connect you.

## Slide 6

SIMPLE TERMS

Instead of asking them to call your friend, you sneakily tell them to dial the hotel
manager’s private line. The receptionist doesn’t realize and makes 

the internal call for you.

You end up accessing internal, sensitive information.

Simple Terms

Instead of asking them to call your friend, you sneakily tell them to dial the hotel manager’s private line. The receptionist doesn’t realize and makes

the internal call for you.

You end up accessing internal, sensitive information.

## Slide 7

IMPORTANCE

Access to Internal
Systems

Sensitive Data
Exposure

Pivoting Attacks

Denial of
Service (DoS)

Attackers can
target internal
servers, metadata
services, or admin
interfaces.

Attackers may
access sensitive
resources, cloud
credentials, or files.

SSRF can launch
further attacks
from inside the
network.

Flooding internal
services via the
server.

Access to Internal Systems

Attackers can target internal servers, metadata services, or admin interfaces.

Importance

Sensitive Data Exposure

Pivoting Attacks

Attackers may access sensitive resources, cloud credentials, or files.

SSRF can launch further attacks from inside the network.

Denial of Service (DoS)

Flooding internal services via the server.

## Slide 8

HOW SSRF VULNERABILITIES WORK

The user provides a URL or
address to the web
application.

The application fetches
data from the provided
URL/server without
validating it.

The attacker manipulates
the input to access
unintended internal
systems or sensitive data.

How SSRF Vulnerabilities Work

The user provides a URL or address to the web application.

The application fetches data from the provided URL/server without validating it.

The attacker manipulates the input to access unintended internal systems or sensitive data.

## Slide 9

COMMON SSRF ATTACKS

SSRF attacks often exploit trust relationships to escalate an attack from the
vulnerable application and perform unauthorized actions. These trust relationships
might exist in relation to the server, or in relation to other back-end systems within
the same organization.

SSRF attack against
the server

SSRF attacks against other
back-end systems

Common SSRF Attacks

SSRF attacks often exploit trust relationships to escalate an attack from the vulnerable application and perform unauthorized actions. These trust relationships might exist in relation to the server, or in relation to other back-end systems within the same organization.

SSRF attack against the server

SSRF attacks against other back-end systems

## Slide 10

1.SSRF ATTACK AGAINST THE SERVER

The attacker causes the application to make an HTTP request back to the server that
is hosting the application, via its loopback network interface. - This typically involves
supplying a URL with a hostname like 127.0.0.1 (a reserved IP address that points to
the loopback adapter) or localhost (a commonly used name for the same adapter)

Attacker Initiates
Request

Application Sends
HTTP Request

Request Uses
Loopback Interface

Request Reaches
Server

1.SSRF attack against the server

The attacker causes the application to make an HTTP request back to the server that is hosting the application, via its loopback network interface. - This typically involves supplying a URL with a hostname like 127.0.0.1 (a reserved IP address that points to the loopback adapter) or localhost (a commonly used name for the same adapter)

Attacker Initiates Request

Application Sends HTTP Request

Request Uses Loopback Interface

Request Reaches Server

## Slide 11

2.SSRF ATTACKS AGAINST OTHER
BACK-END SYSTEMS

In some cases, the application server is able to interact with back-end systems that
are not directly reachable by users.

These systems often have non-routable private IP addresses. The back-end systems
are normally protected by the network topology, so they often have a weaker
security posture

Internal Backend
Servers

Surrounded by
firewalls

Weaker defenses

Risk: If reached via
SSRF or misconfig

2.SSRF attacks against other back-end systems

In some cases, the application server is able to interact with back-end systems that are not directly reachable by users.

These systems often have non-routable private IP addresses. The back-end systems are normally protected by the network topology, so they often have a weaker security posture

Internal Backend Servers

Surrounded by firewalls

Weaker defenses

Risk: If reached via SSRF or misconfig

## Slide 12

Consider a web application with a
PDF generation feature that
fetches content from a user-
supplied URL

The attacker manipulates the URL
parameter by submitting a specially
crafted request.

EXAMPLE

Example

Consider a web application with a PDF generation feature that fetches content from a user-supplied URL

The attacker manipulates the URL parameter by submitting a specially crafted request.

## Slide 13

What happens in the background is,

The server, running inside a private network, fetches http://localhost:8000/admin (accessible internally but not publicly).

Instead of blocking or checking the request, the server blindly includes the fetched content inside the generated PDF.

The attacker downloads the PDF and gets access to the internal admin page’s content, which they normally wouldn’t be able to access.

The attacker abuses the fact that the request is made from inside the server, allowing them to access internal-only resources.

EXAMPLE

Attacker
Initiates
Request

Server
Includes
Content in PDF

Server
Processes
Request

Attacker
Downloads
PDF

Server Fetches
Internal
Content

Attacker
Accesses
Internal Content

Example

What happens in the background is,

The server, running inside a private network, fetches http://localhost:8000/admin (accessible internally but not publicly).

Instead of blocking or checking the request, the server blindly includes the fetched content inside the generated PDF.

The attacker downloads the PDF and gets access to the internal admin page’s content, which they normally wouldn’t be able to access.

The attacker abuses the fact that the request is made from inside the server, allowing them to access internal-only resources.

Attacker Initiates Request

Server Processes Request

Server Fetches Internal Content

Server Includes Content in PDF

Attacker Downloads PDF

Attacker Accesses Internal Content

## Slide 14

REAL-WORLD EXAMPLE

In cloud environments (e.g., AWS), Attackers can fetch sensitive instance metadata,
gaining credentials or internal secrets.

Real-World Example

In cloud environments (e.g., AWS), Attackers can fetch sensitive instance metadata, gaining credentials or internal secrets.

## Slide 15

MITIGATION STRATEGIES

Input Validation
and Filtering

Allowlist
URLs/Domains

Block IP Ranges

Enforce URL
Schemes

Mitigation Strategies

Input Validation and Filtering

Allowlist URLs/Domains

Block IP Ranges

Enforce URL Schemes

## Slide 16

MITIGATION STRATEGIES

Isolate servers that
handle external requests.

Use firewall rules to block
server access to sensitive
internal services.

Disable Unnecessary
URL Fetching Features

URL

Mitigation Strategies

Url

Isolate servers that handle external requests.

Use firewall rules to block server access to sensitive internal services.

Disable Unnecessary URL Fetching Features

## Slide 17

SSRF vulnerabilities can lead to severe security breaches, including internal network
access, sensitive data leakage, and cloud metadata theft. Understanding how SSRF
works and implementing strict input controls and network defenses is essential to
securing web applications.

CONCLUSION

Conclusion

SSRF vulnerabilities can lead to severe security breaches, including internal network access, sensitive data leakage, and cloud metadata theft. Understanding how SSRF works and implementing strict input controls and network defenses is essential to securing web applications.

## Slide 18

Allowlist

Internal IP

Instance MetaData

NEW TERMS

A security control that defines a list of explicitly
allowed inputs or domains.

Sensitive information provided by cloud
services about the instance, including
credentials and configs

IP addresses used within private networks, not
exposed to the public internet.

New Terms

Allowlist

A security control that defines a list of explicitly allowed inputs or domains.

Internal IP

IP addresses used within private networks, not exposed to the public internet.

Instance MetaData

Sensitive information provided by cloud services about the instance, including credentials and configs
