# File Inclusion - LFI (Lab)

_Category: Common Web Attacks / File Inclusion Lab — Source: https://www.canva.com/design/DAGm87zdcRI/rTgL1VXweKeEWHsd5e_WnA/edit_

---

## Slide 1

FILE INCLUSION - LFI

LAB

File Inclusion - LFI

LAB

## Slide 2

LOCAL FILE INCLUSION (LFI)

LAB WALKTHROUGH

This walkthrough is part of TryHackMe focusing on
exploiting vulnerabilities on realistic targets. 

Room Link

https://tryhackme.com/room/fileinc

Lab Walkthrough

Local File Inclusion (LFI)

This walkthrough is part of TryHackMe focusing on exploiting vulnerabilities on realistic targets.

Room Link

https://tryhackme.com/room/fileinc

## Slide 3

IN THIS LAB, YOU WILL:

Identify and exploit a Local File Inclusion (LFI) vulnerability in a
PHP-based web application.

Use path traversal techniques to read sensitive files

This confirms that the server is vulnerable to LFI using basic
path traversal

This task contains a Local File Inclusion vulnerability in a PHP
application that dynamically loads pages using a page
parameter in the URL.

To solve this task, manipulate the URL using path traversal
sequences to retrieve the contents of the /etc/passwd file`.

In this lab, you will:

Identify and exploit a Local File Inclusion (LFI) vulnerability in a PHP-based web application.

Use path traversal techniques to read sensitive files

This task contains a Local File Inclusion vulnerability in a PHP application that dynamically loads pages using a page parameter in the URL.

To solve this task, manipulate the URL using path traversal sequences to retrieve the contents of the /etc/passwd file`.

This confirms that the server is vulnerable to LFI using basic path traversal

## Slide 4

CHALLENGE 1

In this section, we will walk you through various LFI scenarios and how to exploit them.﻿

Suppose the web application provides two languages, and the user can select
between the EN and AR

The PHP code above uses a GET request via the
URL parameter lang to include the file of the page.

<?PHP 

 include($_GET["lang"]);

?>

Challenge 1

In this section, we will walk you through various LFI scenarios and how to exploit them.﻿

Suppose the web application provides two languages, and the user can select between the EN and AR

<?PHP

include($_GET["lang"]);

?>

The PHP code above uses a GET request via the URL parameter lang to include the file of the page.

## Slide 5

The call can be done by sending the following HTTP request as follows:

to load the English page or

http://webapp.thm/index.php?lang=EN.php

http://webapp.thm/index.php?lang=AR.php

to load the Arabic page, where EN.php and AR.php files exist in the same
directory

Theoretically, we can access and display any readable file on the server
from the code above if there isn't any input validation.

The call can be done by sending the following HTTP request as follows:

http://webapp.thm/index.php?lang=EN.php

to load the English page or

http://webapp.thm/index.php?lang=AR.php

to load the Arabic page, where EN.php and AR.php files exist in the same directory

Theoretically, we can access and display any readable file on the server from the code above if there isn't any input validation.

## Slide 6

http://webapp.thm/get.php?file=/etc/passwd

Let's say we want to read the /etc/passwd file, which contains sensitive
information about the users of the Linux operating system,

 we can try the following:

Now apply what we discussed and try to read /etc/passwd file. 

Also, answer question #1 below.

Let's say we want to read the /etc/passwd file, which contains sensitive information about the users of the Linux operating system,

we can try the following:

http://webapp.thm/get.php?file=/etc/passwd

Now apply what we discussed and try to read /etc/passwd file.

Also, answer question #1 below.

## Slide 7

Try to read /etc/passwd. What would the request URI be?

QUESTION

Question

Try to read /etc/passwd. What would the request URI be?

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

Enter /etc/passwd in the
input box and include.

If successful, you’ll see the
contents of the Linux
password file.

STEPS TO SOLVE

Steps to Solve

Enter /etc/passwd in the input box and include.

If successful, you’ll see the contents of the Linux password file.

## Slide 10

Check the Request URI

The answer is /lab1.php?file=/etc/passwd

ANSWER

Answer

Check the Request URI

The answer is /lab1.php?file=/etc/passwd

## Slide 11

CHALLENGE 2

Next, in the following code, the developer decided to
specify the directory inside the function.

In the above code, the developer decided to use the
include function to call PHP pages in the languages
directory only via lang parameters.

<?PHP 

 include("languages/". $_GET['lang']); 

?>

Challenge 2

Next, in the following code, the developer decided to specify the directory inside the function.

<?PHP

include("languages/". $_GET['lang']);

?>

In the above code, the developer decided to use the include function to call PHP pages in the languages directory only via lang parameters.

## Slide 12

If there is no input validation, the
attacker can manipulate the URL
by replacing the lang input with
other OS-sensitive files such as
/etc/passwd

Now apply what we discussed, try
to read files within the server, and
figure out the directory specified in
the include function and answer
question #2 below.

If there is no input validation, the attacker can manipulate the URL by replacing the lang input with other OS-sensitive files such as /etc/passwd

Now apply what we discussed, try to read files within the server, and figure out the directory specified in the include function and answer question #2 below.

## Slide 13

What is the directory specified in the include function?

QUESTION

Question

What is the directory specified in the include function?

## Slide 14

Enter some string in the
input box and include. 

(Ex: test)

Now, you’ll see the
warning error, reveals the
directory.

STEPS TO SOLVE

Steps to Solve

Enter some string in the input box and include.

(Ex: test)

Now, you’ll see the warning error, reveals the directory.

## Slide 15

The answer is includes.

ANSWER

Answer

The answer is includes.
