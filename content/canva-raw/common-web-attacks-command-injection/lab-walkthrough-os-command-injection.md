# Lab Walkthrough: OS Command Injection

_Category: Common Web Attacks / Command Injection — Source: https://www.canva.com/design/DAGmYX7shxg/xO1DYt-gJ30UldEeuFAR3w/edit_

---

## Slide 1

LAB WALKTHROUGH

OS COMMAND INJECTION

Lab Walkthrough

OS Command Injection

## Slide 2

LAB WALKTHROUGH

OS COMMAND INJECTION - SIMPLE CASE

This walkthrough provides a step-by-step guide to solving the "OS Command Injection,
Simple Case" lab. Screenshots to include at specific steps are mentioned for
comprehensive documentation.

Lab Walkthrough

OS Command Injection - Simple Case

This walkthrough provides a step-by-step guide to solving the "OS Command Injection, Simple Case" lab. Screenshots to include at specific steps are mentioned for comprehensive documentation.

## Slide 3

stock
checker

Identify and exploit an OS command injection vulnerability in the stock checker
application by injecting the whoami command into the storeID parameter.

OBJECTIVE

whoami

Objective

Identify and exploit an OS command injection vulnerability in the stock checker application by injecting the whoami command into the storeID parameter.

stock checker

whoami

## Slide 4

Burp Suite

(Community or Professional Edition)

A modern web browser
(e.g., Firefox, Chrome)

TOOLS REQUIRED

Tools Required

Burp Suite

(Community or Professional Edition)

A modern web browser (e.g., Firefox, Chrome)

## Slide 5

Navigate to the lab environment and click Access the Lab.

The application interface will open in a new tab, displaying 

the stock checker functionality.

STOCK CHECKER

STEPS TO SOLVE THE LAB

1.  ACCESS THE LAB

ACCESS
THE LAB

Steps to Solve the Lab

1. Access the Lab

Navigate to the lab environment and click Access the Lab.

The application interface will open in a new tab, displaying

the stock checker functionality.

access the lab

2 elements, To start navigating the group contents, press Enter

stock checker

## Slide 6

(no text captured)

## Slide 7

Use the stock checker form to check the stock for a product.

Observe the request and response in your browser's developer
tools or using Burp Suite's HTTP history.

2. ANALYZE THE APPLICATION

STOCK OF
PRODUCT

2. Analyze the Application

Use the stock checker form to check the stock for a product.

Observe the request and response in your browser's developer tools or using Burp Suite's HTTP history.

stock of product

## Slide 8

Enable Intercept in Burp Suite.

Intercept the HTTP request in Burp Suite.

STOCK CHECKER

Launch Burp Suite and configure your browser to 

route traffic through Burp's proxy.

Submit a stock check request by filling out the 

form and clicking the "Check stock" button.

3. INTERCEPT THE STOCK CHECK REQUEST

3. Intercept the Stock Check Request

Launch Burp Suite and configure your browser to

route traffic through Burp's proxy.

Enable Intercept in Burp Suite.

Submit a stock check request by filling out the

form and clicking the "Check stock" button.

Intercept the HTTP request in Burp Suite.

stock checker

## Slide 9

(no text captured)

## Slide 10

Identify the storeID parameter in the intercepted request.

Modify the value of the storeID parameter to 1|whoami.
This will inject the whoami command into the shell command
executed by the server.

Forward the modified request to the server.

4. MODIFY THE REQUEST TO INJECT WHOAMI

IDENTIFY

MODIFY

FORWARD

4. Modify the Request to Inject whoami

Identify the storeID parameter in the intercepted request.

Modify the value of the storeID parameter to 1|whoami. This will inject the whoami command into the shell command executed by the server.

Forward the modified request to the server.

Identify

modify

forward

## Slide 11

(no text captured)

## Slide 12

View the response in Burp Suite's HTTP history or in your browser.

Verify that the response contains the output of the whoami command, which
reveals the name of the current user.

5. OBSERVE THE RESPONSE

5. Observe the Response

View the response in Burp Suite's HTTP history or in your browser.

Verify that the response contains the output of the whoami command, which reveals the name of the current user.

## Slide 13

Return to the lab interface.

Click Submit Solution to complete the lab.

6. SUBMIT THE SOLUTION

6. Submit the Solution

Return to the lab interface.

Click Submit Solution to complete the lab.
