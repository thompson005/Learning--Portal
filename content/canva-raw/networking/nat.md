# NAT

_Category: Networking — Source: https://www.canva.com/design/DAGW0fM0ruk/_R0pTys9FCs0SvpJdyju5w/edit_

---

## Slide 1

NETWORK ADDRESS
TRANSLATION (NAT)

Network Address Translation (Nat)

## Slide 2

10.0s
Animate
Position

WHAT IS NAT?

NAT (Network Address Translation) is a
method used by routers and firewalls to
translate private IP addresses to public
ones and vice versa.

WHY IS NAT USED?

It helps to hide internal network
addresses and conserve public IP
addresses.

INTRODUCTION TO NAT

PRIVATE IP




 PUBLIC IP

Introduction to NAT

What is Nat?

NAT (Network Address Translation) is a method used by routers and firewalls to translate private IP addresses to public ones and vice versa.

Why is NAT used?

It helps to hide internal network addresses and conserve public IP addresses.

private IP

public ip

## Slide 3

10.0s
Animate
Position

Imagine your home has multiple devices (phones, computers), but there’s only one
public IP address provided by your internet service provider (ISP). NAT allows all
your devices to access the internet using that single public IP.




Your phone (private IP: 192.168.1.2) connects to the internet through your router
(public IP: 203.0.113.1). NAT on the router changes the private IP to the public one
when accessing websites.

IN SIMPLE WORDS

EXAMPLE

PUBLIC IP: 203.0.113.1

PRIVATE IP: 192.168.1.2

In Simple Words

Imagine your home has multiple devices (phones, computers), but there’s only one public IP address provided by your internet service provider (ISP). NAT allows all your devices to access the internet using that single public IP.

Example

Your phone (private IP: 192.168.1.2) connects to the internet through your router (public IP: 203.0.113.1). NAT on the router changes the private IP to the public one when accessing websites.

private IP: 192.168.1.2

public IP: 203.0.113.1

## Slide 4

8.0s
Animate
Position

A one-to-one mapping between a private IP
and a public IP.

Your computer always uses the same public
IP when accessing the internet.

eg., 192.168.1.2 is always mapped to
203.0.113.2.

HOW DOES NAT WORK?

STATIC NAT

IN SIMPLE WORDS

ONE-TO-ONE

How does NAT work?

Static NAT

A one-to-one mapping between a private IP and a public IP.

In Simple Words

Your computer always uses the same public IP when accessing the internet.

eg., 192.168.1.2 is always mapped to 203.0.113.2.

one-to-one

## Slide 5

7.3s
Animate
Position

Multiple private IPs are mapped to a pool of
public IPs.

Your computer is assigned any public IP
from a pool.

eg., 192.168.1.2 could be mapped to any
public IP from a pool (203.0.113.2,
203.0.113.3).

HOW DOES NAT WORK?

DYNAMIC NAT

IN SIMPLE WORDS

MULTIPLE PRIVATE IPS

How does NAT work?

Dynamic NAT

Multiple private IPs are mapped to a pool of public IPs.

In Simple Words

Your computer is assigned any public IP from a pool.

eg., 192.168.1.2 could be mapped to any public IP from a pool (203.0.113.2, 203.0.113.3).

Multiple private IPs

## Slide 6

6.0s
Animate
Position

Multiple private IPs are mapped to a single
public IP using different port numbers (also
called “overloading”).

Many devices in your home can use the
same public IP to access the internet, but
with different port numbers.

eg., Devices 192.168.1.2 and 192.168.1.3 both
use 203.0.113.1, but the router distinguishes
them by using different port numbers.

HOW DOES NAT WORK?

PORT ADDRESS TRANSLATION (PAT)

IN SIMPLE WORDS

OVERLOADING

How does NAT work?

Port Address Translation (PAT)

Multiple private IPs are mapped to a single public IP using different port numbers (also called “overloading”).

In Simple Words

Many devices in your home can use the same public IP to access the internet, but with different port numbers.

eg., Devices 192.168.1.2 and 192.168.1.3 both use 203.0.113.1, but the router distinguishes them by using different port numbers.

overloading

## Slide 7

9.0s
Animate
Position

HOW NAT HELPS IN NETWORK
SECURITY

NAT hides internal IP addresses from
external networks, providing an additional
layer of security. It makes it harder for
attackers to target devices in your local
network directly.

How NAT Helps in Network Security

NAT hides internal IP addresses from external networks, providing an additional layer of security. It makes it harder for attackers to target devices in your local network directly.

## Slide 8

10.0s
Animate
Position

Without NAT, external websites and users could directly see and attack devices
inside your network. NAT acts like a shield by masking internal addresses with its
own public address.

If a hacker tries to access 192.168.1.2 from the outside, they only see
203.0.113.1, the router’s public address, making it harder to know which device
inside the network to attack.

IN SIMPLE WORDS

EXAMPLE

192.168.1.2

203.0.113.1

In Simple Words

Without NAT, external websites and users could directly see and attack devices inside your network. NAT acts like a shield by masking internal addresses with its own public address.

Example

If a hacker tries to access 192.168.1.2 from the outside, they only see 203.0.113.1, the router’s public address, making it harder to know which device inside the network to attack.

203.0.113.1

192.168.1.2

## Slide 9

6.0s
Animate
Position

REAL LIFE NAT EXAMPLES

In most homes, a router uses
NAT to allow multiple devices
to access the internet with a
single public IP address.

A company might use NAT to
connect its internal network
(with private IPs) to the
internet via a single public IP.

Home Network

Corporate Network

Real Life NAT Examples

Home Network

Corporate Network

In most homes, a router uses NAT to allow multiple devices to access the internet with a single public IP address.

A company might use NAT to connect its internal network (with private IPs) to the internet via a single public IP.

## Slide 10

10.0s
Animate
Position

At home, your smartphone, laptop, and smart TV all use NAT to share one public IP
when browsing the internet. In businesses, NAT lets many employees share a public
IP while working securely.

Your laptop at home has the private IP 192.168.1.3, and your phone has
192.168.1.4. Both access the web using your router’s public IP 203.0.113.1.

IN SIMPLE WORDS

EXAMPLE

203.0.113.1

192.168.1.3

192.168.1.4

In Simple Words

At home, your smartphone, laptop, and smart TV all use NAT to share one public IP when browsing the internet. In businesses, NAT lets many employees share a public IP while working securely.

Example

Your laptop at home has the private IP 192.168.1.3, and your phone has 192.168.1.4. Both access the web using your router’s public IP 203.0.113.1.

192.168.1.3

192.168.1.4

203.0.113.1
