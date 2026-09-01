# TCP

_Category: Networking — Source: https://www.canva.com/design/DAGWWIKPbew/G426IVValICKMtzdhKJ9nw/edit_

---

## Slide 1

TRANSMISSION
CONTROL PROTOCOL
(TCP)

## Slide 2

6.0s
Animate
Position

TCP stands for Transmission Control
Protocol.




It’s a connection-oriented protocol used for
reliable data transmission in network
communications.




Provides mechanisms to ensure data
integrity, order, and error checking.

INTRODUCTION TO TCP

TCP stands for Transmission Control Protocol.

It’s a connection-oriented protocol used for reliable data transmission in network communications.

Provides mechanisms to ensure data integrity, order, and error checking.

Introduction to TCP

4 elements, To start navigating the group contents, press Enter

## Slide 3

7.2s
Animate
Position

TCP

TCP is like a “postal service” for the internet, ensuring that data gets from one
computer to another in the correct order without errors.

Imagine you’re sending a long letter to a friend, broken up into several envelopes
(packets). TCP makes sure each envelope arrives in the right order and resends any
that are lost or damaged.

IN SIMPLE WORDS

EXAMPLE

LOST OR DAMAGED 

LETTER

In Simple Words

TCP is like a “postal service” for the internet, ensuring that data gets from one computer to another in the correct order without errors.

Example

Imagine you’re sending a long letter to a friend, broken up into several envelopes (packets). TCP makes sure each envelope arrives in the right order and resends any that are lost or damaged.

2 elements, To start navigating the group contents, press Enter

tcp

lost or damaged

letter

## Slide 4

5.0s
Animate
Position

KEY CHARACTERISTICS

RELIABLE

CONNECTION-ORIENTED

ENSURES ORDERED
DATA DELIVERY

Ensures ordered data delivery

Key Characteristics

Reliable

Connection-oriented

## Slide 5

6.0s
Animate
Position

TCP

TCP

UDP

UDP

TCP

UDP

TCP is (Transmission Control
Protocol) connection-oriented and
ensures reliable data transmission.

TCP is suitable for applications
needing accuracy 

(e.g., web pages, emails)

UDP is preferred for real-time data

 (e.g., video streaming, gaming)

UDP (User Datagram Protocol) is
connectionless and faster but
doesn’t guarantee delivery.

TCP

3 elements, To start navigating the group contents, press Enter

TCP

UDP

UDP

TCP is (Transmission Control Protocol) connection-oriented and ensures reliable data transmission.

UDP (User Datagram Protocol) is connectionless and faster but doesn’t guarantee delivery.

TCP is suitable for applications needing accuracy

(e.g., web pages, emails)

UDP is preferred for real-time data

(e.g., video streaming, gaming)

## Slide 6

9.9s
Animate
Position

TCP is like a “certified mail” that ensures delivery, whereas UDP is a quick “postcard”
with no tracking.

TCP is used when sending critical information (like a document), and UDP is used for
live video, where speed is more important than complete accuracy.

IN SIMPLE WORDS

EXAMPLE

TCP

UDP

In Simple Words

TCP is like a “certified mail” that ensures delivery, whereas UDP is a quick “postcard” with no tracking.

Example

TCP is used when sending critical information (like a document), and UDP is used for live video, where speed is more important than complete accuracy.

TCP

UDP

## Slide 7

8.0s
Animate
Position

SYN

SYN

SYN-ACK

SYN-ACK

ACK

ACK

The client sends a
synchronize (SYN) request.

The server acknowledges
and responds.

The client responds with an
acknowledgment to
confirm the connection.

The TCP three-way handshake establishes a connection before data
transmission

HOW TCP WORKS?

CONNECTION ESTABLISHMENT: THREE-WAY HANDSHAKE

How TCP Works?

Connection Establishment: Three-Way Handshake

The TCP three-way handshake establishes a connection before data transmission

SYN

SYN-ACK

ACK

The client sends a synchronize (SYN) request.

The server acknowledges and responds.

The client responds with an acknowledgment to confirm the connection.

SYN

SYN-ACK

ACK

## Slide 8

5.0s
Animate
Position

The handshake is like introducing yourself, receiving a friendly reply, and responding
with a final confirmation, ensuring both are ready to communicate.

Imagine a phone call setup: “Hello?” (SYN), “Hi, can I help you?” (SYN-ACK), “Yes, I’d like
to talk!” (ACK).

IN SIMPLE WORDS

EXAMPLE

“HELLO?”

“HI, CAN I HELP YOU?”

“YES, I’D LIKE TO TALK!”

SYN

SYN-ACK

ACK

In Simple Words

The handshake is like introducing yourself, receiving a friendly reply, and responding with a final confirmation, ensuring both are ready to communicate.

Example

Imagine a phone call setup: “Hello?” (SYN), “Hi, can I help you?” (SYN-ACK), “Yes, I’d like to talk!” (ACK).

“Hello?”

SYN

SYN-ACK

“Hi, can I help you?”

“Yes, I’d like to talk!”

ACK

## Slide 9

7.1s
Animate
Position

DATA TRANSMISSION IN TCP

TCP transmits data in segments and assigns sequence numbers to
track each segment. It ensures all packets arrive in order and
without errors. TCP uses ACKs to confirm receipt of data and
retransmits any missing packets

TRACK

ARRIVE 

ERROR

RECEIPT

Data Transmission in TCP

TCP transmits data in segments and assigns sequence numbers to track each segment. It ensures all packets arrive in order and without errors. TCP uses ACKs to confirm receipt of data and retransmits any missing packets

track

arrive

receipt

error

## Slide 10

9.5s
Animate
Position

TCP breaks down large messages into small parts and numbers them to ensure they
arrive in order.

Like sending the pages of a book, one at a time, with page numbers so the receiver can
reassemble them in the right order.

IN SIMPLE WORDS

EXAMPLE

PAGE NUMBER

PAGES

BOOK

In Simple Words

TCP breaks down large messages into small parts and numbers them to ensure they arrive in order.

Example

Like sending the pages of a book, one at a time, with page numbers so the receiver can reassemble them in the right order.

pages

Page Number

book

## Slide 11

5.0s
Animate
Position

TCP FLOW CONTROL AND
CONGESTION CONTROL

TCP uses flow control mechanisms, like the
sliding window, to regulate the speed of data
transmission between sender and receiver.




Congestion control algorithms (e.g., TCP
Reno, TCP Cubic) prevent network overload
by adjusting the rate of data flow.




SPEED OF DATA TRANSMISSION 

TCP RENO

TCP CUBIC

TCP Flow Control and Congestion Control

TCP uses flow control mechanisms, like the sliding window, to regulate the speed of data transmission between sender and receiver.

Congestion control algorithms (e.g., TCP Reno, TCP Cubic) prevent network overload by adjusting the rate of data flow.

3 elements, To start navigating the group contents, press Enter

speed of data transmission

TCP RENO

TCP CUBIC

## Slide 12

10.0s
Animate
Position

TCP adjusts its speed based on network conditions, like driving faster on an empty
road but slowing down in traffic.

Imagine two friends passing notes in class. If the reader gets too many notes at once,
they ask the sender to slow down.

IN SIMPLE WORDS

EXAMPLE

In Simple Words

TCP adjusts its speed based on network conditions, like driving faster on an empty road but slowing down in traffic.

Example

Imagine two friends passing notes in class. If the reader gets too many notes at once, they ask the sender to slow down.

2 elements, To start navigating the group contents, press Enter

## Slide 13

5.0s
Animate
Position

FIN

ACK

FIN

ACK

A device initiates
the termination
request.

The other device
acknowledges

The other device
then sends its own
termination request

Both confirm the
termination is
complete.

TDP CONNECTION TERMINATION

TCP TERMINATES A SESSION THROUGH A FOUR-WAY HANDSHAKE

TDP Connection Termination

TCP terminates a session through a four-way handshake

FIN

ACK

FIN

ACK

A device initiates the termination request.

The other device acknowledges

The other device then sends its own termination request

Both confirm the termination is complete.

## Slide 14

10.0s
Animate
Position

TCP termination is like both sides politely saying goodbye to ensure neither side is left
waiting.

Ending a phone call where both parties say, “Bye,” to confirm the conversation is
over.

IN SIMPLE WORDS

EXAMPLE

In Simple Words

TCP termination is like both sides politely saying goodbye to ensure neither side is left waiting.

Example

Ending a phone call where both parties say, “Bye,” to confirm the conversation is over.

## Slide 15

5.4s
Animate
Position

IMPORTANCE OF TCP

TCP provides reliability, flow control,
congestion control, and secure connection
termination, making it suitable for 

reliable applications. TCP is critical for data
integrity on the internet and ensures that
sensitive or important information is
transmitted safely.

TCP is a backbone protocol for reliable
data transfer, making it essential for
applications where accuracy is key.

IN SIMPLE WORDS

TCP provides reliability, flow control, congestion control, and secure connection termination, making it suitable for

reliable applications. TCP is critical for data integrity on the internet and ensures that sensitive or important information is transmitted safely.

Importance of TCP

In Simple Words

TCP is a backbone protocol for reliable data transfer, making it essential for applications where accuracy is key.
