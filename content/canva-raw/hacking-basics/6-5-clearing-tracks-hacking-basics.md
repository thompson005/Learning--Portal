# 6.5. Clearing Tracks - Hacking Basics

_Category: Hacking Basics — Source: https://www.canva.com/design/DAGXjrWS0z4/QQUSkf2s2RyWxT-LbkT5qg/edit_

---

## Slide 1

CLEARING TRACKS

Clearing Tracks

## Slide 2

5.0s
Animate
Position

WHAT IS CLEARING TRACKS?

Clearing tracks involves removing or hiding
evidence of activities during or after an attack to
avoid detection.

It focuses on actions like log modification, deleting
artifacts, and disguising commands.

What is Clearing Tracks?

Clearing tracks involves removing or hiding evidence of activities during or after an attack to avoid detection.

It focuses on actions like log modification, deleting artifacts, and disguising commands.

## Slide 3

6.1s
Animate
Position

WHY CLEARING TRACKS IS
IMPORTANT?

To avoid detection by security systems and
investigators.

Helps attackers maintain their presence
undetected.

Why Clearing Tracks is Important?

To avoid detection by security systems and investigators.

Helps attackers maintain their presence undetected.

## Slide 4

5.0s
Animate
Position

EXAMPLES OF CLEARING TRACKS

Log Cleansing

SCENARIO

An attacker logs into a system
using stolen credentials.

ACTION

ACTION

They find and edit the log file
that recorded their login event
(User admin logged in from IP
192.168.1.5 at 10:30 AM) and
replace it with a harmless event
like System maintenance
initiated by admin at 10:30 AM

Examples of Clearing Tracks

Log Cleansing

scenario

An attacker logs into a system using stolen credentials.

action

They find and edit the log file that recorded their login event (User admin logged in from IP 192.168.1.5 at 10:30 AM) and replace it with a harmless event like System maintenance initiated by admin at 10:30 AM

## Slide 5

5.7s
Animate
Position

EXAMPLES OF CLEARING TRACKS

Command Obfuscation

SCENARIO

ACTION

ACTION

An attacker needs to delete a sensitive
folder (rm -rf /sensitive_data).

Instead of running the command
directly, they encode it using Base64:

Original command: 

rm -rf /sensitive_data

Obfuscated:

echo
cm0gLXJmIC9zZW5zaXRpdmV
fZGF0YQ== | base64 -d | bash

Examples of Clearing Tracks

Command Obfuscation

scenario

action

An attacker needs to delete a sensitive folder (rm -rf /sensitive_data).

Instead of running the command directly, they encode it using Base64:

Original command:

rm -rf /sensitive_data

Obfuscated:

echo cm0gLXJmIC9zZW5zaXRpdmVfZGF0YQ== | base64 -d | bash

## Slide 6

5.4s
Animate
Position

EXAMPLES OF CLEARING TRACKS

Secure Deletion

SCENARIO

ACTION

ACTION

The attacker creates a script to
exfiltrate data but doesn’t want it
recovered after execution.

They use tools like shred or srm to
securely delete the file:

shred -u exfil_script.sh
overwrites the file multiple
times before removing it,
ensuring it cannot be recovered.

Examples of Clearing Tracks

Secure Deletion

scenario

The attacker creates a script to exfiltrate data but doesn’t want it recovered after execution.

action

They use tools like shred or srm to securely delete the file:

shred -u exfil_script.sh overwrites the file multiple times before removing it, ensuring it cannot be recovered.

## Slide 7

5.0s
Animate
Position

EXAMPLES OF CLEARING TRACKS

Network Concealment

SCENARIO

ACTION

ACTION

An attacker communicates with a
Command and Control (C2) server.

Instead of directly connecting, they
route their traffic through a VPN or a
proxy chain using tools like TOR.

This hides their actual IP address
and encrypts the traffic, making
it difficult to trace.

Examples of Clearing Tracks

Network Concealment

scenario

An attacker communicates with a Command and Control (C2) server.

action

Instead of directly connecting, they route their traffic through a VPN or a proxy chain using tools like TOR.

This hides their actual IP address and encrypts the traffic, making it difficult to trace.

## Slide 8

6.9s
Animate
Position

CLEARING TRACKS

Log Cleansing: 

Like wiping away your footprints in the garden
so no one knows you were there.

Command Obfuscation: 

Speaking in code or using gestures instead of
words to avoid being overheard.

Secure Deletion: 

Disposing of any notes or maps you used to plan
your exit, so they can’t be found later.

Network Concealment: 

Wearing a disguise to avoid being recognized by the neighbors.

This is exactly how
attackers clear their tracks
in a digital environment:
they erase, disguise, or hide
their activity to avoid being
caught

Clearing Tracks

Log Cleansing:

Like wiping away your footprints in the garden so no one knows you were there.

Command Obfuscation:

Speaking in code or using gestures instead of words to avoid being overheard.

Secure Deletion:

Disposing of any notes or maps you used to plan your exit, so they can’t be found later.

Network Concealment:

Wearing a disguise to avoid being recognized by the neighbors.

This is exactly how attackers clear their tracks in a digital environment: they erase, disguise, or hide their activity to avoid being caught
