# Network Traffic Analysis

_Category: Blue Team Labs — Source: https://www.canva.com/design/DAGmTUJP3LU/JQ77xMwwycw9dznUshASPA/edit_

---

## Slide 1

NETWORK TRAFFIC
ANALYSIS

Network Traffic Analysis

## Slide 2

NETWORK TRAFFIC ANALYSIS WITH WIRESHARK

Basic Networking
Concepts

Packet Structure
Knowledge

Security
Awareness

Wireshark 

Basics

PRE-REQUISITES

Network Traffic Analysis with Wireshark

Pre-requisites

Basic Networking Concepts

Packet Structure Knowledge

Security Awareness

Wireshark

Basics

## Slide 3

Whenever we communicate over a network, our data is sent in 'packets' over the
network and anyone on the network can see those packets. This is generally not a big
issue because most traffic is encrypted(HTTPS). 

There are also protocols like FTP and HTTP that do no encrypt their traffic, 

these can be analysed easily.It is also possible to decrypt encrypted traffic if you
know the algorithm and key used to encrypt the traffic

(eg. if you have the SSL certificate for HTTPS).

Whenever we communicate over a network, our data is sent in 'packets' over the network and anyone on the network can see those packets. This is generally not a big issue because most traffic is encrypted(HTTPS).

There are also protocols like FTP and HTTP that do no encrypt their traffic,

these can be analysed easily.It is also possible to decrypt encrypted traffic if you know the algorithm and key used to encrypt the traffic

(eg. if you have the SSL certificate for HTTPS).

## Slide 4

Network captures are usually stored in a .pcap(packet capture) file. Let us analyse a
simple pcap file where a capture of a conversation between two hosts was taken.

ANALYZING PCAP FILES

.pcap

Analyzing PCAP files

Network captures are usually stored in a .pcap(packet capture) file. Let us analyse a simple pcap file where a capture of a conversation between two hosts was taken.

.pcap

## Slide 5

One of the first things we can do is look at the statistics of the
capture, Let's look at the number of packets sent by different IP's.

The main windows has a concise
view showing you important
information such as source IP,
destination IP, Protocol etc.

The main windows has a concise view showing you important information such as source IP, destination IP, Protocol etc.

One of the first things we can do is look at the statistics of the capture, Let's look at the number of packets sent by different IP's.

## Slide 6

This can sometimes give important info, 

for example, is there any traffic from an unknown IP?

This can sometimes give important info,

for example, is there any traffic from an unknown IP?

## Slide 7

We can see a three way TCP handshake happening here 

followed by a GET request.

We can see a three way TCP handshake happening here

followed by a GET request.

## Slide 8

Once a connection is
established, the data
is sent in a stream, we
can follow the stream
by right clicking the
packet and clicking on
follow.

Once a connection is established, the data is sent in a stream, we can follow the stream by right clicking the packet and clicking on follow.

## Slide 9

This will open a different window that shows the request and response in different
colors for better readability.

As we follow the stream, we
see some data that looks
like ROT13, this is indeed the
flag for the challenge.

 (Note: This screenshot is taken from a different
capture for understanding, ignore the actual request).

This will open a different window that shows the request and response in different colors for better readability.

(Note: This screenshot is taken from a different capture for understanding, ignore the actual request).

As we follow the stream, we see some data that looks like ROT13, this is indeed the flag for the challenge.
