# Ssrf Labs

_Category: Common Web Attacks / SSRF — Source: https://www.canva.com/design/DAGnVrL7gq4/OasFa-Rbg8Ctpt1CPWGnOA/edit_

---

## Slide 1

SERVER SIDE 

REQUEST FORGERY

LAB

Server Side

Request Forgery

lab

## Slide 2

LAB WALKTHROUGH

 BASIC SSRF AGAINST THE LOCAL SERVER

This walkthrough is part of PortSwigger’s Web Security Academy, focusing on
exploiting vulnerabilities on realistic targets.

Lab Walkthrough

Basic SSRF against the local server

This walkthrough is part of PortSwigger’s Web Security Academy, focusing on exploiting vulnerabilities on realistic targets.

## Slide 3

IN THIS LAB, YOU WILL:

Identify an SSRF vulnerability in a web application.

Exploit it against the local server

This lab is Vulnerable to SSRF

It has a stock check feature that fetches data
from an internal system. To solve the lab, change
the stock check URL to access the admin interface
at http://localhost/admin and delete the user Carlos

In this lab, you will:

Identify an SSRF vulnerability in a web application.

Exploit it against the local server

This lab is Vulnerable to SSRF

It has a stock check feature that fetches data from an internal system. To solve the lab, change the stock check URL to access the admin interface at http://localhost/admin and delete the user Carlos

## Slide 4

Navigate to the lab environment and click Access the Lab.

STEPS

ACCESS THE LAB

The application interface will open a shopping website. There
are lists of products and click on view details.

ACCESS
THE LAB

VIEW DETAILS

Steps

Access the Lab

Navigate to the lab environment and click Access the Lab.

The application interface will open a shopping website. There are lists of products and click on view details.

access the lab

view details

## Slide 5

Select any Product First

Open your burp suite and intercept the
request to check the stock

STOCK CHECKER

2. ANALYZE THE APPLICATION

2. Analyze the Application

Select any Product First

Open your burp suite and intercept the request to check the stock

2 elements, To start navigating the group contents, press Enter

stock checker

## Slide 6

Launch Burp Suite and configure your browser to route
traffic through Burp's proxy.

A request was sent to the backend server to check 

the stock price and a REST API got the request. 

But you can't see the API request.

3. INTERCEPT THE REQUEST

REQUEST

BACKEND

 SERVER

3. Intercept the Request

Launch Burp Suite and configure your browser to route traffic through Burp's proxy.

A request was sent to the backend server to check

the stock price and a REST API got the request.

But you can't see the API request.

request

backend

server

## Slide 7

3. INTERCEPT THE REQUEST

Therefore, you need to
Intercept the Request in
Burp Suite.

This is how the request
looks between the user and
the server.

See the stockApi=URL 

 This URL is the decoded
form of the actual URL.

stockApi=URL

3. Intercept the Request

Therefore, you need to Intercept the Request in Burp Suite.

This is how the request looks between the user and the server.

stockApi=URL

See the stockApi=URL

This URL is the decoded form of the actual URL.

## Slide 8

4. TESTING

Send this request to our repeater where we
are going to change the above API and see
what response will given by the server.

This is the response we got from the server

Instead of the above API, I’m going to use
another API i.e. http://localhost/admin
mentioned in the question.

4. Testing

Send this request to our repeater where we are going to change the above API and see what response will given by the server.

Instead of the above API, I’m going to use another API i.e. http://localhost/admin mentioned in the question.

This is the response we got from the server

## Slide 9

Request another 

API stockApi=http://localhost/admin/delete?username=carlos 

and the user Carlos will be deleted.

4. TESTING

Now, we are in the admin panel and got unauthorized access and
we can easily delete the user carlos.

ADMIN PANEL

UNAUTHORIZED ACCESS

DELETE USER CARLOS

4. Testing

Now, we are in the admin panel and got unauthorized access and we can easily delete the user carlos.

Request another

API stockApi=http://localhost/admin/delete?username=carlos

and the user Carlos will be deleted.

admin panel

unauthorized access

delete user carlos

## Slide 10

5. VERIFY LAB COMPLETION

The application displays a message: "Congratulations, you solved the lab!".

5. Verify Lab Completion

The application displays a message: "Congratulations, you solved the lab!".

## Slide 11

(no text captured)

## Slide 12

(no text captured)

## Slide 13

(no text captured)

## Slide 14

(no text captured)

## Slide 15

MITIGATION STRATEGIES

Input Validation
and Filtering

Allowlist
URLs/Domains

Block IP Ranges

Enforce URL
Schemes

Mitigation Strategies

Input Validation and Filtering

Allowlist URLs/Domains

Block IP Ranges

Enforce URL Schemes

## Slide 16

MITIGATION STRATEGIES

Isolate servers that
handle external requests.

Use firewall rules to block
server access to sensitive
internal services.

Disable Unnecessary
URL Fetching Features

URL

Mitigation Strategies

Url

Isolate servers that handle external requests.

Use firewall rules to block server access to sensitive internal services.

Disable Unnecessary URL Fetching Features

## Slide 17

SSRF vulnerabilities can lead to severe security breaches, including internal network
access, sensitive data leakage, and cloud metadata theft. Understanding how SSRF
works and implementing strict input controls and network defenses is essential to
securing web applications.

CONCLUSION

Conclusion

SSRF vulnerabilities can lead to severe security breaches, including internal network access, sensitive data leakage, and cloud metadata theft. Understanding how SSRF works and implementing strict input controls and network defenses is essential to securing web applications.

## Slide 18

Allowlist

Internal IP

Instance MetaData

NEW TERMS

A security control that defines a list of explicitly
allowed inputs or domains.

Sensitive information provided by cloud
services about the instance, including
credentials and configs

IP addresses used within private networks, not
exposed to the public internet.

New Terms

Allowlist

A security control that defines a list of explicitly allowed inputs or domains.

Internal IP

IP addresses used within private networks, not exposed to the public internet.

Instance MetaData

Sensitive information provided by cloud services about the instance, including credentials and configs
