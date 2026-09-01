# 9.x. ARP Spoofing

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGYgN4mJII/do_VxWRWz90JRNIPPJObdw/edit_

---

## Slide 1

ARP SPOOFING

ARP Spoofing

## Slide 2

9.0s
Animate
Position

ARP (Address Resolution Protocol) is used to map a known IP address to a MAC
address in a local area network (LAN).

INTRODUCTION TO ARP SPOOFING

WHAT IS ARP?

IP address to MAC address

Introduction to ARP Spoofing

What is ARP?

ARP (Address Resolution Protocol) is used to map a known IP address to a MAC address in a local area network (LAN).

IP address to MAC address

## Slide 3

5.0s
Animate
Position

ARP SPOOFING OVERVIEW

ARP spoofing (or ARP poisoning) is a type of attack where a malicious actor sends
fake ARP messages to a network, causing devices on the network to associate
incorrect IP-to-MAC address mappings.

ATTACK

FAKE 

ARP MESSAGES

NETWORK

ARP Spoofing Overview

ARP spoofing (or ARP poisoning) is a type of attack where a malicious actor sends fake ARP messages to a network, causing devices on the network to associate incorrect IP-to-MAC address mappings.

attack

fake

ARP messages

network

## Slide 4

5.0s
Animate
Position

In ARP spoofing, an attacker sends falsified ARP messages over a local network.
These fake ARP replies contain the attacker’s MAC address, associating it with a
legitimate IP address (often the gateway or another device).

When the target device updates its ARP table with this incorrect mapping, the
attacker can intercept, redirect, or manipulate traffic between the victim and other
devices on the network. This is known as a Man-in-the-Middle (MitM) Attack.

HOW ARP SPOOFING WORKS?

How ARP Spoofing Works?

In ARP spoofing, an attacker sends falsified ARP messages over a local network. These fake ARP replies contain the attacker’s MAC address, associating it with a legitimate IP address (often the gateway or another device).

When the target device updates its ARP table with this incorrect mapping, the attacker can intercept, redirect, or manipulate traffic between the victim and other devices on the network. This is known as a Man-in-the-Middle (MitM) Attack.

2 elements, To start navigating the group contents, press Enter

## Slide 5

5.0s
Animate
Position

An attacker can capture sensitive data being sent over the network, such as
passwords or other unencrypted information.

OBJECTIVES OF ARP SPOOFING

INTERCEPTION

Objectives of ARP Spoofing

Interception

An attacker can capture sensitive data being sent over the network, such as passwords or other unencrypted information.

## Slide 6

5.0s
Animate
Position

 By intercepting communication between two devices, the attacker can inject
malicious data or take control of an ongoing session.

SESSION HIJACKING

OBJECTIVES OF ARP SPOOFING

Objectives of ARP Spoofing

Session Hijacking

By intercepting communication between two devices, the attacker can inject malicious data or take control of an ongoing session.

## Slide 7

5.0s
Animate
Position

 By sending malicious ARP replies that disrupt communication, an attacker can
effectively shut down network services.

DENIAL OF SERVICE (DOS)

OBJECTIVES OF ARP SPOOFING

Objectives of ARP Spoofing

Denial of Service (DoS)

By sending malicious ARP replies that disrupt communication, an attacker can effectively shut down network services.

## Slide 8

6.0s
Animate
Position

Tools like Wireshark or arp-scan
allow network administrators to
capture network traffic and
identify abnormal ARP
messages.

DETECTION METHODS

Regularly checking the ARP
cache for suspicious entries or
inconsistencies can help detect
poisoning.

ARP

Detection Methods

ARP

Regularly checking the ARP cache for suspicious entries or inconsistencies can help detect poisoning.

Tools like Wireshark or arp-scan allow network administrators to capture network traffic and identify abnormal ARP messages.

## Slide 9

5.0s
Animate
Position

Encryption

Encrypting all
communication (such as
using HTTPS) ensures that
intercepted data is not
readable even if the
attacker can capture it.

MITIGATION TECHNIQUES

Static ARP Entries

By assigning static IP-
to-MAC address
mappings, you ensure
that devices will not
accept false ARP replies.

Packet Filtering
Firewalls and intrusion
detection systems (IDS)
can monitor and block
suspicious ARP packets.

IP

MAC

Mitigation Techniques

IP

mac

Static ARP Entries

By assigning static IP-to-MAC address mappings, you ensure that devices will not accept false ARP replies.

Packet Filtering Firewalls and intrusion detection systems (IDS) can monitor and block suspicious ARP packets.

Encryption

Encrypting all communication (such as using HTTPS) ensures that intercepted data is not readable even if the attacker can capture it.

## Slide 10

5.0s
Animate
Position

IN SIMPLE WORDS

ARP Spoofing is an attack where the attacker sends fake ARP responses to mislead
devices on the network into associating the attacker’s MAC address with a legitimate
IP address (like the router). This allows the attacker to intercept or alter the traffic.
The attack can lead to session hijacking, data interception, and network disruptions.

To detect ARP spoofing, regularly monitor the ARP cache, and use tools like
Wireshark or arp-scan. Mitigation includes using static ARP entries, packet filtering,
and encryption.

In simple words

ARP Spoofing is an attack where the attacker sends fake ARP responses to mislead devices on the network into associating the attacker’s MAC address with a legitimate IP address (like the router). This allows the attacker to intercept or alter the traffic. The attack can lead to session hijacking, data interception, and network disruptions.

To detect ARP spoofing, regularly monitor the ARP cache, and use tools like Wireshark or arp-scan. Mitigation includes using static ARP entries, packet filtering, and encryption.

2 elements, To start navigating the group contents, press Enter

## Slide 11

8.0s
Animate
Position

If your router’s IP address is associated with the attacker’s MAC address, all your
internet traffic will be rerouted through the attacker’s machine. The attacker could
then read your passwords, modify files, or even block your internet access
completely.

EXAMPLE

Example

If your router’s IP address is associated with the attacker’s MAC address, all your internet traffic will be rerouted through the attacker’s machine. The attacker could then read your passwords, modify files, or even block your internet access completely.
