# SQL_Injection_lab

_Category: Common Web Attacks / SQLi — Source: https://www.canva.com/design/DAGmYafFu4I/qxX3jYYDf6yktzHZSc_MVQ/edit_

---

## Slide 1

SQL INJECTION 

LAB

SQL Injection

lab

## Slide 2

SQL INJECTION (SQLI) VULNERABILITY LAB

OBJECTIVE

In this lab, you will test a website for an SQLi vulnerability in the WHERE clause, retrieve hidden data from the database, and view it. We will use Burp Suite Community Edition for this lab. This guide simplifies the process for beginners.

Community Edition

SQL Injection (SQLi) Vulnerability Lab

Objective

In this lab, you will test a website for an SQLi vulnerability in the WHERE clause, retrieve hidden data from the database, and view it. We will use Burp Suite Community Edition for this lab. This guide simplifies the process for beginners.

Community Edition

## Slide 3

Tools Required

 Burp Suite
Community Edition
(preinstalled on Kali
Linux and Parrot OS).

Browser Extension
Install FoxyProxy
to configure your
browser for Burp
Suite traffic.

SQL Basics
Knowledge of
SQL queries and
comments (e.g., --
for commenting).

PRE-REQUISITES

Community Edition

Pre-requisites

Tools Required

Burp Suite Community Edition (preinstalled on Kali Linux and Parrot OS).

Community Edition

Browser Extension Install FoxyProxy to configure your browser for Burp Suite traffic.

SQL Basics Knowledge of SQL queries and comments (e.g., -- for commenting).

## Slide 4

This query retrieves all products in the "Gifts" category where the released column is set to TRUE (1).

SELECT * FROM products WHERE category = 'Gifts' AND released = 1

Modify the SQL query to bypass restrictions and retrieve both released and unreleased data.

LAB SETUP

The vulnerable query in this lab is as follows:

QUERY DESCRIPTION

OBJECTIVE

Lab Setup

Query Description

The vulnerable query in this lab is as follows:

SELECT * FROM products WHERE category = 'Gifts' AND released = 1

This query retrieves all products in the "Gifts" category where the released column is set to TRUE (1).

Objective

Modify the SQL query to bypass restrictions and retrieve both released and unreleased data.

## Slide 5

Open the lab page and click the ACCESS THE LAB button.

STEP-BY-STEP INSTRUCTIONS

1.  ACCESS THE LAB

Step-by-Step Instructions

1. Access the Lab

Open the lab page and click the ACCESS THE LAB button.

## Slide 6

Click Next to start a new project.

In the dialog box, click Start Burp.

Start a new temporary project in Burp Suite:

NEW PROJECT

2. LAUNCH BURP SUITE

2. Launch Burp Suite

Start a new temporary project in Burp Suite:

Click Next to start a new project.

In the dialog box, click Start Burp.

new project

## Slide 7

(no text captured)

## Slide 8

Configure FoxyProxy to route traffic through Burp Suite.

Install the FoxyProxy browser extension.

3. CONFIGURE PROXY

Install

Configure

3. Configure Proxy

Install the FoxyProxy browser extension.

Configure FoxyProxy to route traffic through Burp Suite.

Install

Configure

## Slide 9

Enable Intercept.

The traffic request will appear in Burp Suite.

4. INTERCEPT TRAFFIC

Navigate to the Proxy tab.

Select the "Pets" category.

In Burp Suite

In the browser

4. Intercept Traffic

In Burp Suite

In the browser

Navigate to the Proxy tab.

Select the "Pets" category.

Enable Intercept.

The traffic request will appear in Burp Suite.

## Slide 10

(no text captured)

## Slide 11

Right-click the intercepted request and choose Send to Repeater.

Modify the category parameter in the request to test SQL injection.

This payload appends an OR 1=1 condition, which always evaluates to TRUE, bypassing the restriction.

' OR 1=1 --

A. Send the Request to Repeater

B. Craft the Payload

Use the payload: 

5. TEST FOR SQLI VULNERABILITY

5. Test for SQLi Vulnerability

A. Send the Request to Repeater

Right-click the intercepted request and choose Send to Repeater.

B. Craft the Payload

Modify the category parameter in the request to test SQL injection.

Use the payload:

' OR 1=1 --

This payload appends an OR 1=1 condition, which always evaluates to TRUE, bypassing the restriction.

## Slide 12

Highlight the modified request and press Ctrl + U to URL-encode it.

Click Send in the Repeater tab.

C. URL-Encode the Payload

U

D. Send the Modified Request

5. TEST FOR SQLI VULNERABILITY

5. Test for SQLi Vulnerability

C. URL-Encode the Payload

Highlight the modified request and press Ctrl + U to URL-encode it.

U

D. Send the Modified Request

Click Send in the Repeater tab.

## Slide 13

The application will execute the following query: 

SELECT * FROM products WHERE category = 'Gifts' OR 1=1 --

Both released and unreleased data will be displayed.

6. VERIFY THE RESULT

6. Verify the Result

The application will execute the following query:

SELECT * FROM products WHERE category = 'Gifts' OR 1=1 --

Both released and unreleased data will be displayed.

## Slide 14

(no text captured)

## Slide 15

The lab will display a message: "Congratulations, you solved the lab!"

7. SUCCESS

7. Success

The lab will display a message: "Congratulations, you solved the lab!"

## Slide 16

In this lab, you have:

Explored the concept of SQL injection.

Set up Burp Suite for web application testing.

Performed a web request and modified the payload to bypass restrictions.

Verified the result using Burp Suite.

Identified and exploited an SQLi vulnerability.

Retrieved hidden data using a crafted payload.

Used Burp Suite effectively for penetration testing.

CONCLUSION

Conclusion

In this lab, you have:

Explored the concept of SQL injection.

Set up Burp Suite for web application testing.

Performed a web request and modified the payload to bypass restrictions.

Verified the result using Burp Suite.

Identified and exploited an SQLi vulnerability.

Retrieved hidden data using a crafted payload.

Used Burp Suite effectively for penetration testing.
