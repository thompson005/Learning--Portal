# File Inclusion attacks Basics

_Category: Common Web Attacks / File Inclusion — Source: https://www.canva.com/design/DAGmYRJF13E/IdfxLsdReky4dTBL4zUWgg/edit_

---

## Slide 1

FILE INCLUSION
ATTACKS BASICS

File Inclusion attacks Basics

## Slide 2

FILE INCLUSION ATTACKS

File Inclusion is a feature in many web applications where the server includes a file based on user input.

This feature becomes dangerous when the application doesn’t properly check 

what file is being included, allowing attackers to load:

Sensitive files from 

the server

 (Local File Inclusion — LFI

Malicious scripts from
external servers 

(Remote File Inclusion — RFI)

File Inclusion Attacks

File Inclusion is a feature in many web applications where the server includes a file based on user input.

This feature becomes dangerous when the application doesn’t properly check

what file is being included, allowing attackers to load:

Sensitive files from

the server

(Local File Inclusion — LFI

Malicious scripts from external servers

(Remote File Inclusion — RFI)

## Slide 3

FILE INCLUSION ATTACKS

In some scenarios, web applications are written to request access to files on a given system, including images, static text, and so on via parameters. Parameters are query parameter strings attached to the URL that could be used to retrieve data or perform actions based on user input.

 The following diagram breaks down the essential parts of a URL.

User requests a file
via query parameter

Static content
returned to user

Query parameter =
file request

 Server receives
request

File Inclusion Attacks

In some scenarios, web applications are written to request access to files on a given system, including images, static text, and so on via parameters. Parameters are query parameter strings attached to the URL that could be used to retrieve data or perform actions based on user input.

User requests a file via query parameter

Query parameter = file request

Server receives request

Static content returned to user

The following diagram breaks down the essential parts of a URL.

## Slide 4

https://www.google.com/search?q=FileInclusion

Parameters are used with Google searching, where GET requests pass user input into the search engine.

FOR EXAMPLE

For example

Parameters are used with Google searching, where GET requests pass user input into the search engine.

https://www.google.com/search?q=FileInclusion

## Slide 5

http://webapp.thm/get.php?file=userCV.pdf

Let's discuss a scenario where a user requests to access files from a web server. First, the user sends an HTTP request to the webserver that includes a file to display.

For example, if a user wants to access and display their CV within the web application, the request may look as follows,

 where the file is the parameter and the userCV.pdf, is the required file to access.﻿

HTTP REQUEST

ACCESS CV

Let's discuss a scenario where a user requests to access files from a web server. First, the user sends an HTTP request to the webserver that includes a file to display.

For example, if a user wants to access and display their CV within the web application, the request may look as follows,

http://webapp.thm/get.php?file=userCV.pdf

where the file is the parameter and the userCV.pdf, is the required file to access.﻿

HTTP request

access cv

## Slide 6

These vulnerabilities are commonly found
and exploited in various programming
languages for web applications, such as
PHP, that are poorly written and
implemented. The main issue of these
vulnerabilities is the input validation, in
which the user inputs are not sanitized or
validated, and the user controls them. When
the input is not validated, the user can pass
any input to the function, 

causing the vulnerability.

WHY DOES IT HAPPEN?

Why does it happen?

These vulnerabilities are commonly found and exploited in various programming languages for web applications, such as PHP, that are poorly written and implemented. The main issue of these vulnerabilities is the input validation, in which the user inputs are not sanitized or validated, and the user controls them. When the input is not validated, the user can pass any input to the function,

causing the vulnerability.

## Slide 7

By default, an attacker can leverage file inclusion vulnerabilities to leak data,
such as code, credentials, or other important files related to the web
application or operating system.

Moreover, if the attacker can write files to the server by any other means,
file inclusion might be used together to gain 

remote command execution (RCE).

RISK?

Risk?

By default, an attacker can leverage file inclusion vulnerabilities to leak data, such as code, credentials, or other important files related to the web application or operating system.

Moreover, if the attacker can write files to the server by any other means, file inclusion might be used together to gain

remote command execution (RCE).

## Slide 8

It is also known as Directory traversal, a web security vulnerability allows an attacker to read operating system resources, such as local files on the server running an application.

PATH TRAVERSAL

Path Traversal

It is also known as Directory traversal, a web security vulnerability allows an attacker to read operating system resources, such as local files on the server running an application.

## Slide 9

The attacker exploits this vulnerability by manipulating and abusing the web application's URL to locate and access files or directories stored outside the application's root directory.

PATH TRAVERSAL

Path Traversal

The attacker exploits this vulnerability by manipulating and abusing the web application's URL to locate and access files or directories stored outside the application's root directory.

## Slide 10

The following graph shows how a web application stores files in /var/www/app. The happy path would be the user requesting the contents of userCV.pdf from a defined path /var/www/app/CVs.

PATH TRAVERSAL

Path Traversal

The following graph shows how a web application stores files in /var/www/app. The happy path would be the user requesting the contents of userCV.pdf from a defined path /var/www/app/CVs.

## Slide 11

We can test out the URL parameter by adding payloads to see how the web
application behaves. 

Path traversal attacks, also known as the dot-dot-slash attack, take
advantage of moving the directory one step up using the double dots ../. If the
attacker finds the entry point, which in this case get.php?file=, then the
attacker may send something as follows,

http://webapp.thm/get.php?file=../../../../etc/passwd

We can test out the URL parameter by adding payloads to see how the web application behaves.

Path traversal attacks, also known as the dot-dot-slash attack, take advantage of moving the directory one step up using the double dots ../. If the attacker finds the entry point, which in this case get.php?file=, then the attacker may send something as follows,

http://webapp.thm/get.php?file=../../../../etc/passwd

## Slide 12

Suppose there isn't input validation, and instead of accessing the PDF files at /var/www/app/CVs location, the web application retrieves files from other directories, which in this case /etc/passwd. Each .. entry moves one directory until it reaches the root directory /. Then it changes the directory to /etc, and from there, it read the passwd file.

Target Folder

Server reads and returns
/etc/passwd

Suppose there isn't input validation, and instead of accessing the PDF files at /var/www/app/CVs location, the web application retrieves files from other directories, which in this case /etc/passwd. Each .. entry moves one directory until it reaches the root directory /. Then it changes the directory to /etc, and from there, it read the passwd file.

Target Folder

Server reads and returns /etc/passwd

## Slide 13

A file download feature lets users download PDFs like this:

Internally, the server does something like:

REAL WORLD EXAMPLE

https://vulnerable-website.com/download?file=report.pdf

$file = $_GET['file'];

readfile("documents/" . $file);

Real World Example

A file download feature lets users download PDFs like this:

https://vulnerable-website.com/download?file=report.pdf

Internally, the server does something like:

$file = $_GET['file'];

readfile("documents/" . $file);

## Slide 14

An attacker modifies the URL to

Now the server returns the
contents of a sensitive system file

 (/etc/passwd) instead of a PDF

https://vulnerable-website.com/download?file=../../../../etc/passwd

https://vulnerable-website.com/download?file=report.pdf

An attacker modifies the URL to

https://vulnerable-website.com/download?file=report.pdf

https://vulnerable-website.com/download?file=../../../../etc/passwd

Now the server returns the contents of a sensitive system file

(/etc/passwd) instead of a PDF
