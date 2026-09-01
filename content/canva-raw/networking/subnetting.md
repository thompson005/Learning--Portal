# Subnetting

_Category: Networking — Source: https://www.canva.com/design/DAGWKm1P1aY/biDOAIzwiUlUsDpL1JCgxA/edit_

---

## Slide 1

SUBNETTING

Subnetting

## Slide 2

6.0s
Animate
Position

WHAT IS SUBNETTING?

Subnetting is a technique used to divide a
larger network into smaller, more
manageable sub-networks, or subnets.
This allows organizations to optimize
their network, control traffic flow, and
enhance security by isolating different
parts of the network.

Subnetting is a technique used to divide a larger network into smaller, more manageable sub-networks, or subnets. This allows organizations to optimize their network, control traffic flow, and enhance security by isolating different parts of the network.

What is Subnetting?

## Slide 3

6.0s
Animate
Position

Think of it like organizing a large warehouse. Instead of having one giant space
where everything is stored together, you create different sections (subnets) for
different types of products. This makes it easier to find, manage, and control
access to each section.

IN SIMPLE WORDS

In simple words

Think of it like organizing a large warehouse. Instead of having one giant space where everything is stored together, you create different sections (subnets) for different types of products. This makes it easier to find, manage, and control access to each section.

## Slide 4

6.2s
Animate
Position

Subnetting helps reduce IP address wastage by dividing a network into smaller
segments, each with its own set of IP addresses.

WHY IS SUBNETTING USEFUL?

EFFICIENT IP ADDRESS ALLOCATION

Why is subnetting Useful?

Efficient IP Address Allocation

Subnetting helps reduce IP address wastage by dividing a network into smaller segments, each with its own set of IP addresses.

## Slide 5

8.0s
Animate
Position

Isolating network segments makes it easier to apply specific security policies to
different subnets, which can help prevent unauthorized access.

WHY IS SUBNETTING USEFUL?

ENHANCED SECURITY

Why is subnetting Useful?

Enhanced Security

Isolating network segments makes it easier to apply specific security policies to different subnets, which can help prevent unauthorized access.

## Slide 6

8.4s
Animate
Position

By creating smaller network segments, broadcast traffic is limited to each subnet,
reducing unnecessary traffic on the main network.

WHY IS SUBNETTING USEFUL?

IMPROVED NETWORK PERFORMANCE

Why is subnetting Useful?

Improved Network Performance

By creating smaller network segments, broadcast traffic is limited to each subnet, reducing unnecessary traffic on the main network.

## Slide 7

8.0s
Animate
Position

Subnetting allows network administrators to manage each subnet separately, making
the overall network easier to maintain and troubleshoot.

WHY IS SUBNETTING USEFUL?

SIMPLIFIED MANAGEMENT

Why is subnetting Useful?

Simplified Management

Subnetting allows network administrators to manage each subnet separately, making the overall network easier to maintain and troubleshoot.

## Slide 8

8.0s
Animate
Position

IP

A

B

C

Traditionally, IP addresses were divided into classes (Class A, B, and C) that
determined the default subnet mask. Subnetting builds upon these classes to create
smaller networks within each class.

HOW SUBNETTING WORKS?

IP ADDRESS CLASSES

IP ADDRESS

SUBNET

How subnetting works?

IP Address Classes

Traditionally, IP addresses were divided into classes (Class A, B, and C) that determined the default subnet mask. Subnetting builds upon these classes to create smaller networks within each class.

5 elements, To start navigating the group contents, press Enter

ip

a

b

c

IP Address

subnet

## Slide 9

5.4s
Animate
Position

The subnet mask is a key part of subnetting. It defines which portion of an IP address
belongs to the network and which part belongs to the host. By changing the subnet
mask, you can create different subnet sizes within a network.

HOW SUBNETTING WORKS?

SUBNET MASKS

SUBNET MASKS

NETWORK

HOST

How subnetting works?

Subnet Masks

The subnet mask is a key part of subnetting. It defines which portion of an IP address belongs to the network and which part belongs to the host. By changing the subnet mask, you can create different subnet sizes within a network.

network

host

Subnet Masks

## Slide 10

5.0s
Animate
Position

CIDR (Classless Inter-Domain Routing) notation is commonly used to define subnet
masks. Instead of the traditional mask format, CIDR uses a “/” followed by a number
to represent the number of bits used for the network portion of the address. 

For example, /24 represents a subnet mask of 255.255.255.0.

HOW SUBNETTING WORKS?

CIDR NOTATION

CIDR

24 BITS

SUBNET

MASK

TRADITIONAL

MASK

How subnetting works?

CIDR Notation

CIDR (Classless Inter-Domain Routing) notation is commonly used to define subnet masks. Instead of the traditional mask format, CIDR uses a “/” followed by a number to represent the number of bits used for the network portion of the address.

For example, /24 represents a subnet mask of 255.255.255.0.

CIDR

subnet

mask

traditional

mask

24 bits

## Slide 11

6.0s
Animate
Position

Let’s say you have an 

IP address 192.168.1.0/24. 

Here’s what it means:

EXAMPLE OF SUBNETTING

The /24 CIDR notation means the first 24 bits are allocated to the network.




This leaves 8 bits for host addresses, allowing for 256 IP addresses, from
192.168.1.0 to 192.168.1.255 (though typically, only 254 can be used, as the first
and last addresses are reserved for network and broadcast purposes).

Example of Subnetting

Let’s say you have an

IP address 192.168.1.0/24.

The /24 CIDR notation means the first 24 bits are allocated to the network.

This leaves 8 bits for host addresses, allowing for 256 IP addresses, from 192.168.1.0 to 192.168.1.255 (though typically, only 254 can be used, as the first and last addresses are reserved for network and broadcast purposes).

Here’s what it means:
