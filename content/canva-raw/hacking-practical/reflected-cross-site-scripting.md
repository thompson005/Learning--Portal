# Reflected Cross-Site Scripting

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGbmLWvGuw/Y4XtYPq97Y_7fUpyIwd5rA/edit_

---

## Slide 1

REFLECTED 

CROSS-SITE SCRIPTING

Reflected

Cross-Site Scripting

## Slide 2

5.0s
Animate
Position

Cross-Site Scripting (XSS) is a common web application vulnerability that allows
attackers to inject malicious scripts into web pages viewed by other users.

CROSS-SITE SCRIPTING (XSS)

There are various types of Cross-Site Scripting, but are broadly classified into
the following types:

TYPES OF CROSS-SITE SCRIPTING

Reflected XSS

Stored XSS

DOM Based XSS

Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) is a common web application vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.

Types of Cross-Site Scripting

There are various types of Cross-Site Scripting, but are broadly classified into the following types:

Reflected XSS

Stored XSS

DOM Based XSS

## Slide 3

5.0s
Animate
Position

REFLECTED XSS

Reflected XSS occurs when the injected script is reflected off the web server and
executed in the user's browser.

INJECTED SCRIPT

WEB SERVER

USER'S BROWSER

Reflected XSS

Reflected XSS occurs when the injected script is reflected off the web server and executed in the user's browser.

injected script

web server

user's browser

## Slide 4

5.3s
Animate
Position

Identify the vulnerability
in the search bar.

This guide simplifies the process for beginners.

Exploit it to execute a
simple script.

Learn how XSS can be used
in real-world attacks.

XSS

IN THIS LAB, YOU WILL TEST A VULNERABLE BLOG PAGE FOR REFLECTED XSS. 

YOU WILL:

In this lab, you will test a vulnerable blog page for reflected XSS.

You will:

XSS

Identify the vulnerability in the search bar.

Exploit it to execute a simple script.

Learn how XSS can be used in real-world attacks.

This guide simplifies the process for beginners.

## Slide 5

6.5s
Animate
Position

The website features a blog page with several posts and a search bar. Your goal is to
exploit the search functionality by injecting JavaScript code that triggers an alert
box.

LAB SCENARIO

Lab Scenario

The website features a blog page with several posts and a search bar. Your goal is to exploit the search functionality by injecting JavaScript code that triggers an alert box.

## Slide 6

5.0s
Animate
Position

Open the blog
page.

Enter a random
query, such as
Hello world.

Click Search.

0 results found for "Hello world".

The query is reflected in the search results.

 For example, the page displays: 

1. TEST THE SEARCH BAR

OBSERVATION

STEP-BY-STEP INSTRUCTIONS

Step-by-Step Instructions

1. Test the Search Bar

Open the blog page.

Enter a random query, such as Hello world.

Click Search.

Observation

The query is reflected in the search results.

For example, the page displays:

0 results found for "Hello world".

## Slide 7

5.0s
Animate
Position

Enter the following query
into the search bar: 

Click Search.

<h1>Hello world</h1>

<h1>Hello world</h1>

<h1>Hello world</h1>

The search result now shows the query on a new line in a
larger font.

Right-click near the search result and select Inspect.

The HTML source displays:

This indicates that the input is not sanitized or encoded on
the server side, making it vulnerable to XSS attacks.

2. TEST FOR SPECIAL CHARACTERS

OBSERVATION

2. Test for Special Characters

Enter the following query into the search bar:

<h1>Hello world</h1>

<h1>Hello world</h1>

Click Search.

Observation

The search result now shows the query on a new line in a larger font.

Right-click near the search result and select Inspect.

The HTML source displays:

<h1>Hello world</h1>

This indicates that the input is not sanitized or encoded on the server side, making it vulnerable to XSS attacks.

## Slide 8

5.7s
Animate
Position

To solve the lab, we need to execute JavaScript code using the
search bar. Use the following payload

<script>alert(1)</script>

Explanation of the Payload:

<script></script>: These are HTML script tags that define a
block of JavaScript code to be executed.

alert: A JavaScript method that opens a pop-up alert box.

(1): The parameter passed to the alert function. In this case, it
simply displays the number 1.

3. CRAFT AND TEST THE PAYLOAD

3. Craft and Test the Payload

To solve the lab, we need to execute JavaScript code using the search bar. Use the following payload

<script>alert(1)</script>

<script></script>: These are HTML script tags that define a block of JavaScript code to be executed.

alert: A JavaScript method that opens a pop-up alert box.

(1): The parameter passed to the alert function. In this case, it simply displays the number 1.

Explanation of the Payload:

## Slide 9

5.0s
Animate
Position

<script>alert(1)</script>

Enter the payload  

into the search bar.

Click Search.

<script>alert(1)</script>

A pop-up alert window appears, indicating that the
script has executed successfully.

4. INJECT THE PAYLOAD

OBSERVATION

XSS Popup

Enter the payload

<script>alert(1)</script>

into the search bar.

4. Inject the Payload

2 elements, To start navigating the group contents, press Enter

<script>alert(1)</script>

Click Search.

Observation

A pop-up alert window appears, indicating that the script has executed successfully.

XSS Popup

## Slide 10

8.0s
Animate
Position

The lab displays a message: "Congratulations, you solved
the lab!".

Lab Solved

5. VERIFY LAB COMPLETION

5. Verify Lab Completion

The lab displays a message: "Congratulations, you solved the lab!".

Lab Solved

## Slide 11

5.0s
Animate
Position

Reflected XSS can be used to execute malicious scripts on a victim's browser. 




A common attack vector involves sending an infected link (e.g.,
https://example.com/search?<script>...malicious_code...</script>) via email or text.
When the user clicks the link, the script executes, potentially:

Stealing cookies,
session tokens,
or sensitive data.

Redirecting users
to malicious
websites.

REAL-WORLD IMPLICATIONS OF REFLECTED XSS

Real-World Implications of Reflected XSS

Reflected XSS can be used to execute malicious scripts on a victim's browser.

A common attack vector involves sending an infected link (e.g., https://example.com/search?<script>...malicious_code...</script>) via email or text. When the user clicks the link, the script executes, potentially:

Stealing cookies, session tokens, or sensitive data.

Redirecting users to malicious websites.

## Slide 12

5.0s
Animate
Position

Sanitize and encode user inputs.

Use modern frameworks that automatically escape special characters.

Implement a Content Security Policy (CSP).

Identified a
reflected XSS
vulnerability.

Exploited it with a
crafted payload.

Learned about its
potential real-
world impact.

MITIGATION

CONCLUSION

Mitigation

Sanitize and encode user inputs.

Use modern frameworks that automatically escape special characters.

Implement a Content Security Policy (CSP).

Identified a reflected XSS vulnerability.

Conclusion

Exploited it with a crafted payload.

Learned about its potential real-world impact.
