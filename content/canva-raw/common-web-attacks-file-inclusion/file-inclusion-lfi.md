# File Inclusion - LFI

_Category: Common Web Attacks / File Inclusion — Source: https://www.canva.com/design/DAGmv0NEsFQ/UxF3wBH783T4r9I4z_sXnA/edit_

---

## Slide 1

FILE INCLUSION - LFI

LOCAL FILE INCLUSION

File Inclusion - LFI

Local File Inclusion

## Slide 2

LOCAL FILE INCLUSION (LFI)

LFI is a web vulnerability where the application allows users to include files from the local server's file system by manipulating input parameters.

LFI often relies on path traversal to access unintended files.

Local File Inclusion (LFI)

LFI is a web vulnerability where the application allows users to include files from the local server's file system by manipulating input parameters.

LFI often relies on path traversal to access unintended files.

## Slide 3

THIS CAN LET AN ATTACKER

Read sensitive files 

(e.g., /etc/passwd).

View source code.

Sometimes execute
arbitrary code by
including log files or
uploaded payloads.

This can let an attacker

Read sensitive files

(e.g., /etc/passwd).

View source code.

Sometimes execute arbitrary code by including log files or uploaded payloads.

## Slide 4

SIMPLE TERMS

LFI is like asking a hotel to bring you a document by name — but instead of asking for
the brochure, you ask for their private staff contracts folder, and they just hand it
over without checking.

Simple Terms

LFI is like asking a hotel to bring you a document by name — but instead of asking for the brochure, you ask for their private staff contracts folder, and they just hand it over without checking.

## Slide 5

LFI is like convincing
someone to open the door
and show you what's inside.

SIMPLE TERMS

Path Traversal is like
sneaking into rooms using
a hallway.

Simple Terms

Path Traversal is like sneaking into rooms using a hallway.

LFI is like convincing someone to open the door and show you what's inside.

## Slide 6

IMPORTANCE OF LFI SECURITY

Sensitive File
Disclosure

Code
Execution

Privilege
Escalation

Recon for
RCE

Read server
configs, password
files, logs, keys.

Include files that
contain user-
controlled input.

Gain information
to aid in bigger
attacks.

Used as a step
before remote
code execution.

Importance of LFI Security

Sensitive File Disclosure

Code Execution

Privilege Escalation

Recon for RCE

Read server configs, password files, logs, keys.

Include files that contain user-controlled input.

Gain information to aid in bigger attacks.

Used as a step before remote code execution.

## Slide 7

HOW LFI WORKS

App takes user input to
decide which file to load
(e.g., a page).

Input is not validated or
sanitized.

Attacker provides paths
like ../../etc/passwd to
include system files.

How LFI Works

App takes user input to decide which file to load (e.g., a page).

Input is not validated or sanitized.

Attacker provides paths like ../../etc/passwd to include system files.

## Slide 8

Imagine a blog website that displays different
pages based on a post parameter in the URL:

The backend might include a file
like this:

If the attacker changes the post parameter
to something like:

The server might include and display the contents of the Linux
password file, which contains system usernames and other
sensitive details.

http://blogsite.com/?post=about 

include("posts/" . $_GET['post'] . ".php");

../../../../etc/passwd

EXAMPLE

Example

Imagine a blog website that displays different pages based on a post parameter in the URL:

http://blogsite.com/?post=about

The backend might include a file like this:

include("posts/" . $_GET['post'] . ".php");

If the attacker changes the post parameter to something like:

../../../../etc/passwd

The server might include and display the contents of the Linux password file, which contains system usernames and other sensitive details.

## Slide 9

MITIGATION STRATEGIES

Input
Validation

Path
Sanitization

Use Framework
Features

Least
Privilege

Mitigation Strategies

Input Validation

Path Sanitization

Use Framework Features

Least Privilege

## Slide 10

CONCLUSION

LFI is a dangerous vulnerability
that allows attackers to explore
the server's file system and
possibly execute code.

By validating input and avoiding
raw file access based on user
data, developers can effectively
prevent LFI vulnerabilities.

Conclusion

LFI is a dangerous vulnerability that allows attackers to explore the server's file system and possibly execute code.

By validating input and avoiding raw file access based on user data, developers can effectively prevent LFI vulnerabilities.

## Slide 11

LFI (Local File Inclusion)

Path Traversal

/etc/passwd

File Disclosure

Log Poisoning

NEW TERMS

A vulnerability that allows attackers to include
files from the local server using user input.

A vulnerability that allows attackers to include
files from the local server using user input.

A vulnerability that allows attackers to include
files from the local server using user input.

A vulnerability that allows attackers to include
files from the local server using user input.

A vulnerability that allows attackers to include
files from the local server using user input.

New Terms

LFI (Local File Inclusion)

A vulnerability that allows attackers to include files from the local server using user input.

Path Traversal

A vulnerability that allows attackers to include files from the local server using user input.

/etc/passwd

A vulnerability that allows attackers to include files from the local server using user input.

File Disclosure

A vulnerability that allows attackers to include files from the local server using user input.

Log Poisoning

A vulnerability that allows attackers to include files from the local server using user input.
