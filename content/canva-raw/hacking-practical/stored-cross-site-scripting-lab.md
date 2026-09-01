# Stored Cross-Site Scripting Lab

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGdXhUflhs/ea5eZghPIkslLTR4jgMxQA/edit_

---

## Slide 1

STORED CROSS-SITE
SCRIPTING LAB

Stored Cross-Site Scripting Lab

## Slide 2

8.0s
Animate
Position

Stored Cross-Site Scripting (XSS) is a web application
vulnerability where malicious scripts are permanently
stored on the target server and executed in the
browsers of other users. Unlike reflected XSS, which
involves user input being immediately reflected in the
HTTP response, stored XSS occurs when user input is
saved in a database or other persistent storage and
later rendered on web pages accessed by other users.

STORED CROSS-SITE SCRIPTING (XSS) LAB

INTRODUCTION TO STORED XSS

STORED XSS INTO HTML CONTEXT WITH NOTHING ENCODED

Stored Cross-Site Scripting (XSS) Lab

Stored XSS into HTML Context with Nothing Encoded

Introduction to Stored XSS

Stored Cross-Site Scripting (XSS) is a web application vulnerability where malicious scripts are permanently stored on the target server and executed in the browsers of other users. Unlike reflected XSS, which involves user input being immediately reflected in the HTTP response, stored XSS occurs when user input is saved in a database or other persistent storage and later rendered on web pages accessed by other users.

## Slide 3

5.0s
Animate
Position
3 elements, To start navigating the group contents, press Enter

## Slide 4

5.0s
Animate
Position

LAB SCENARIO

In this PortSwigger Web Security
Academy lab, you'll exploit a stored
XSS vulnerability in a blog's comment
functionality. The goal is to inject a
JavaScript payload that will be stored
on the server and executed when
other users view the blog post.

In this PortSwigger Web Security Academy lab, you'll exploit a stored XSS vulnerability in a blog's comment functionality. The goal is to inject a JavaScript payload that will be stored on the server and executed when other users view the blog post.

Lab Scenario

## Slide 5

5.3s
Animate
Position

More persistent and
widespread compared to
reflected XSS

UNDERSTANDING STORED XSS

KEY CHARACTERISTICS

Malicious script is saved
permanently on the target
server

Executes for every user who
visits the affected page

Understanding Stored XSS

Key Characteristics

Executes for every user who visits the affected page

Malicious script is saved permanently on the target server

More persistent and widespread compared to reflected XSS

## Slide 6

6.5s
Animate
Position

Locate the comment
submission form

STEP-BY-STEP SOLUTION

IDENTIFY THE VULNERABILITY

Navigate to a blog
post

Observe that the form
accepts user input without
proper sanitization

Step-by-Step Solution

Identify the Vulnerability

Navigate to a blog post

Observe that the form accepts user input without proper sanitization

Locate the comment submission form

## Slide 7

5.0s
Animate
Position

Use the following payload, which will create a popup displaying the user's cookies, if
executed successfully:

HTML tags defining a JavaScript code block

JavaScript method to display document cookies

2. CRAFT THE PAYLOAD

PAYLOAD BREAKDOWN

<script>alert(document.cookie)</script>

<script>

alert(document.cookie)

2. Craft the Payload

Use the following payload, which will create a popup displaying the user's cookies, if executed successfully:

<script>alert(document.cookie)</script>

Payload Breakdown

<script>

HTML tags defining a JavaScript code block

alert(document.cookie)

JavaScript method to display document cookies

## Slide 8

7.6s
Animate
Position

## Slide 9

7.9s
Animate
Position

3. SUBMIT THE COMMENT

Fill out the comment
form fields (name,
email, website)

Enter the payload in
the comment box

Post the
comment

3. Submit the Comment

Fill out the comment form fields (name, email, website)

Enter the payload in the comment box

Post the comment

## Slide 10

5.8s
Animate
Position

4. VERIFY EXPLOITATION

Confirm that the alert
pops up, displaying
document cookies

Return to the
blog post

4. Verify Exploitation

Return to the blog post

Confirm that the alert pops up, displaying document cookies

## Slide 11

5.0s
Animate
Position

TECHNICAL DETAILS

THIS ALLOWS ATTACKERS TO

In a stored XSS attack, the application receives data from an untrusted source and
includes that data within its later HTTP responses unsafely. 

Execute arbitrary JavaScript

Potentially steal user cookies

Perform actions on behalf of the victim

Technical Details

In a stored XSS attack, the application receives data from an untrusted source and includes that data within its later HTTP responses unsafely.

This allows attackers to

Execute arbitrary JavaScript

Potentially steal user cookies

Perform actions on behalf of the victim

## Slide 12

6.8s
Animate
Position

This lab demonstrates how stored XSS can be exploited by
injecting a script that persists on the server and executes for
multiple users. Understanding and preventing such vulnerabilities
is crucial for web application security.

CONCLUSION

Conclusion

This lab demonstrates how stored XSS can be exploited by injecting a script that persists on the server and executes for multiple users. Understanding and preventing such vulnerabilities is crucial for web application security.
