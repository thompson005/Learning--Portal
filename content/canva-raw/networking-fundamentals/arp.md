# ARP

_Category: Networking (Fundamentals) — Source: https://www.canva.com/design/DAGjcUvvXEE/GL4gwEqz_yoYTqkGJkwrWg/edit_

---

## Slide 1

ADDRESS RESOLUTION
PROTOCOL ARP

Address Resolution Protocol ARP

## Slide 2

ARP (Address Resolution Protocol) is a network protocol used to map an IP address to
a MAC address within a local network (LAN). It operates at the Data Link Layer 

(Layer 2) of the OSI model and is essential for communication 

between devices on the same subnet.

UNDERSTANDING ARP

AA:BB:CC:DD:EE:FF

MAC address

IP address

Understanding ARP

ARP (Address Resolution Protocol) is a network protocol used to map an IP address to a MAC address within a local network (LAN). It operates at the Data Link Layer

(Layer 2) of the OSI model and is essential for communication

between devices on the same subnet.

AA:BB:CC:DD:EE:FF

IP address

MAC address

## Slide 3

SIMPLE TERMS

Imagine you want to send a message to John, but you only know his 

phone number (IP address) and not his house address (MAC address).

MAC address

IP address

Simple Terms

Imagine you want to send a message to John, but you only know his

phone number (IP address) and not his house address (MAC address).

IP address

MAC address

## Slide 4

SIMPLE TERMS

You ask around: "Who has this phone number?" → (ARP Request - Broadcast)

Who has this 

phone number?

Simple Terms

You ask around: "Who has this phone number?" → (ARP Request - Broadcast)

Who has this

phone number?

## Slide 5

SIMPLE TERMS

John replies: "That’s my number, and my address is 12A!" → (ARP Reply - Unicast)

That’s my number, 

 my address is 12A!

Simple Terms

John replies: "That’s my number, and my address is 12A!" → (ARP Reply - Unicast)

That’s my number,

my address is 12A!

## Slide 6

SIMPLE TERMS

Now you know John’s address and can send him a letter.

Simple Terms

Now you know John’s address and can send him a letter.

## Slide 7

SIMPLE TERMS

In a network, computers use ARP the same way to find each other’s MAC addresses
and send data.

Simple Terms

In a network, computers use ARP the same way to find each other’s MAC addresses and send data.

## Slide 8

HOW ARP WORKS

CHECK ARP CACHE

SEND ARP REQUEST

The host device first checks its
ARP cache to see if it already
has the MAC address for the
target IP (e.g., 34.40.21.20). If
found, it uses it directly.

If the MAC address isn’t in the
cache, the host sends an ARP
request as a broadcast
message on the network, asking
"Who has 34.40.21.20?"

Check ARP Cache

The host device first checks its ARP cache to see if it already has the MAC address for the target IP (e.g., 34.40.21.20). If found, it uses it directly.

How ARP Works

Send ARP Request

If the MAC address isn’t in the cache, the host sends an ARP request as a broadcast message on the network, asking "Who has 34.40.21.20?"

## Slide 9

HOW ARP WORKS

RECEIVE ARP REPLY

UPDATE ARP CACHE

The device with the IP address
34.40.21.20 responds with

 its MAC address 

(e.g., A5:22:98:5C:24:93),
sending it back to the host.

The host updates its ARP cache
with the newly received MAC
address, so it doesn’t need to
ask again for future
communications.

Receive ARP Reply

The device with the IP address 34.40.21.20 responds with

its MAC address

(e.g., A5:22:98:5C:24:93), sending it back to the host.

How ARP Works

Update ARP Cache

The host updates its ARP cache with the newly received MAC address, so it doesn’t need to ask again for future communications.

## Slide 10

TYPES OF ARP

A router responds
to ARP requests
on behalf of
another device.

Automatically
resolves IP to
MAC and stores
it temporarily.

Sent by a device to
announce or update
its MAC address,
often used to
detect IP conflicts.

Manually
configured ARP
entries that
don’t expire.

Dynamic ARP

Static ARP

Proxy ARP

Gratuitous ARP

Dynamic ARP

Automatically resolves IP to MAC and stores it temporarily.

Static ARP

Manually configured ARP entries that don’t expire.

Types of ARP

Proxy ARP

A router responds to ARP requests on behalf of another device.

Gratuitous ARP

Sent by a device to announce or update its MAC address, often used to detect IP conflicts.

## Slide 11

ARP TABLE (CACHE)

Devices maintain an ARP cache—a table storing IP-to-MAC address mappings. 

This cache is periodically updated to ensure accurate and efficient communication 

within the network.

Stores recently discovered IP-to-MAC mappings

Entries are periodically updated to stay accurate

ARP Table (Cache)

Devices maintain an ARP cache—a table storing IP-to-MAC address mappings.

This cache is periodically updated to ensure accurate and efficient communication

within the network.

Stores recently discovered IP-to-MAC mappings

Entries are periodically updated to stay accurate

## Slide 12

ARP Spoofing / ARP Poisoning

An attacker sends fake ARP responses, mapping their MAC to a legitimate IP.

Used in Man-in-the-Middle (MitM) attacks to intercept or modify traffic.




ARP ATTACKS

CHECKING ARP TABLES

Windows: arp -a

Linux/macOS: arp -n

ARP Attacks

ARP Spoofing / ARP Poisoning

An attacker sends fake ARP responses, mapping their MAC to a legitimate IP.

Used in Man-in-the-Middle (MitM) attacks to intercept or modify traffic.

Checking ARP Tables

Windows: arp -a

Linux/macOS: arp -n

## Slide 13

ARP is essential for resolving IP addresses to MAC addresses,
facilitating proper data transmission within a LAN. However, due
to its inherent vulnerabilities, implementing security measures is
crucial to protect against ARP poisoning attacks and ensure
network integrity.

CONCLUSION

AA:BB:CC:DD:EE:FF

MAC address

IP address

Conclusion

ARP is essential for resolving IP addresses to MAC addresses, facilitating proper data transmission within a LAN. However, due to its inherent vulnerabilities, implementing security measures is crucial to protect against ARP poisoning attacks and ensure network integrity.

AA:BB:CC:DD:EE:FF

IP address

MAC address
