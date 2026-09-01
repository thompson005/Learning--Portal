# Command Injection

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGccXnslh4/WVJgVGk3EiNh7XgswS4f-Q/edit_

---

## Slide 1

COMMAND INJECTION

Command Injection

## Slide 2

8.0s
Animate
Position

Command Injection is a type of security
vulnerability that occurs when an application
allows user input to be used in constructing
system-level commands without proper
validation or sanitization. This can allow an
attacker to execute arbitrary system
commands on the server or the host running
the vulnerable application.

In command injection, user input is
concatenated with a command string and
passed to the system shell. If this input isn’t
properly sanitized, attackers can
manipulate it to inject malicious commands.

COMMAND INJECTION

Command Injection is a type of security vulnerability that occurs when an application allows user input to be used in constructing system-level commands without proper validation or sanitization. This can allow an attacker to execute arbitrary system commands on the server or the host running the vulnerable application.

Command Injection

In command injection, user input is concatenated with a command string and passed to the system shell. If this input isn’t properly sanitized, attackers can manipulate it to inject malicious commands.

## Slide 3

5.0s
Animate
Position

EXAMPLE OF A VULNERABLE CODE

In this example, if a user enters filename.txt, the program runs cat filename.txt.
However, if the input is filename.txt; rm -rf /, it could run both cat filename.txt and rm
-rf /, causing critical damage to the system.

import os

user_input = input("Enter filename: ")

os.system(f"cat {user_input}")

Example of a Vulnerable Code

3 elements, To start navigating the group contents, press Enter

import os

user_input = input("Enter filename: ")

os.system(f"cat {user_input}")

In this example, if a user enters filename.txt, the program runs cat filename.txt. However, if the input is filename.txt; rm -rf /, it could run both cat filename.txt and rm -rf /, causing critical damage to the system.

## Slide 4

5.0s
Animate
Position

Using semicolons (;) to chain multiple commands.




Using && or || to add conditional commands.




Redirecting input/output (>, >>, <).




Using | to pipe output into other commands.

COMMON SHELL INJECTION TECHNIQUES

;

&

>

|

<

>>

Using semicolons (;) to chain multiple commands.

Using && or || to add conditional commands.

Redirecting input/output (>, >>, <).

Using | to pipe output into other commands.

Common Shell Injection Techniques

;

>>

&

>

<

|

## Slide 5

5.0s
Animate
Position

This lab has a vulnerability of OS command injection in web applications. This
vulnerability allows attackers to execute arbitrary commands on the underlying
operating system, posing a significant risk of compromising both the application and
its associated data.

COMMAND INJECTION LAB

Command Injection Lab

This lab has a vulnerability of OS command injection in web applications. This vulnerability allows attackers to execute arbitrary commands on the underlying operating system, posing a significant risk of compromising both the application and its associated data.

## Slide 6

5.0s
Animate
Position

When you access the lab, the following page appears in the web browser:

1. CONFIGURE BURP SUITE AND ACCESS THE LAB

1. Configure Burp Suite and Access the Lab

When you access the lab, the following page appears in the web browser:

## Slide 7

5.0s
Animate
Position

Return to the lab interface and click on the description of any image.

2 . INTERACT WITH THE LAB INTERFACE

2 . Interact with the Lab Interface

Return to the lab interface and click on the description of any image.

## Slide 8

5.2s
Animate
Position

Open Burp Suite and navigate to the Proxy tab.

3. OPEN BURP SUITE

PROXY

3. Open Burp Suite

Proxy

Open Burp Suite and navigate to the Proxy tab.

## Slide 9

5.0s
Animate
Position

Click on the “Check Stock” button.

4. CLICK ON "CHECK STOCK"

(We click “Check Stock” to trigger a server request. With Burp Suite, we capture and analyze this
action to understand how the application manages stock and find vulnerabilities or injection points.)

4. Click on "Check Stock"

Click on the “Check Stock” button.

(We click “Check Stock” to trigger a server request. With Burp Suite, we capture and analyze this action to understand how the application manages stock and find vulnerabilities or injection points.)

## Slide 10

5.0s
Animate
Position

Use Burp Suite to capture the stock request and send it to the Repeater tool.

5. CAPTURE THE REQUEST

5. Capture the Request

Use Burp Suite to capture the stock request and send it to the Repeater tool.

## Slide 11

5.0s
Animate
Position

6. INJECT COMMAND

In the last line, which shows productId and storeId, we inject the |whoami command at
the end of the line because it is used to check the current user’s identity after
injecting commands. This helps us understand the level of access gained through the
injected command and assess how much control or damage has occurred.

productID = 1 & storeID=1 | whoami

6. Inject Command

In the last line, which shows productId and storeId, we inject the |whoami command at the end of the line because it is used to check the current user’s identity after injecting commands. This helps us understand the level of access gained through the injected command and assess how much control or damage has occurred.

productID = 1 & storeID=1 | whoami

## Slide 12

5.0s
Animate
Position

(The ‘|’ symbol, commonly referred to as a pipe, functions by taking the output of one
command and forwarding it as input to another command. Therefore, when employing
‘|whoami’, it shows that we retrieve the output of the preceding command and pass it
to the ‘whoami’ command.)Upon sending this command, we discover the user’s name,
indicating successful exploitation of the vulnerability.

6. INJECT COMMAND

6. Inject Command

(The ‘|’ symbol, commonly referred to as a pipe, functions by taking the output of one command and forwarding it as input to another command. Therefore, when employing ‘|whoami’, it shows that we retrieve the output of the preceding command and pass it to the ‘whoami’ command.)Upon sending this command, we discover the user’s name, indicating successful exploitation of the vulnerability.

## Slide 13

5.0s
Animate
Position

7 . COMPLETE THE LAB

The lab is successfully completed.

7 . Complete the Lab

The lab is successfully completed.

## Slide 14

5.0s
Animate
Position

CONCLUSION

OS command injection problems are very risky for web applications. They allow
attackers to run commands and compromise system integrity. It’s crucial for web
developers and security experts to know how to deal with and fix these issues.
Understanding command injection vulnerabilities is essential for developing secure
applications and protecting sensitive data from unauthorized access.

Conclusion

OS command injection problems are very risky for web applications. They allow attackers to run commands and compromise system integrity. It’s crucial for web developers and security experts to know how to deal with and fix these issues. Understanding command injection vulnerabilities is essential for developing secure applications and protecting sensitive data from unauthorized access.
