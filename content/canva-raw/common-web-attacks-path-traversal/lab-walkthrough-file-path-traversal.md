# Lab Walkthrough: File Path Traversal

_Category: Common Web Attacks / Path Traversal — Source: https://www.canva.com/design/DAGmYbHVDgE/0IQ0SVZl5gmpo-ZKc65e4w/edit_

---

## Slide 1

LAB WALKTHROUGH

FILE PATH TRAVERSAL

Lab Walkthrough

File Path Traversal

## Slide 2

LAB WALKTHROUGH

FILE PATH TRAVERSAL - SIMPLE CASE

This walkthrough is part of my series for PortSwigger’s Web Security Academy,
focusing on exploiting vulnerabilities on realistic targets. In this lab, we explore a file
path traversal vulnerability to access unauthorized files on the server.

Lab Walkthrough

File Path Traversal - Simple Case

This walkthrough is part of my series for PortSwigger’s Web Security Academy, focusing on exploiting vulnerabilities on realistic targets. In this lab, we explore a file path traversal vulnerability to access unauthorized files on the server.

## Slide 3

The lab contains a vulnerability in the way file paths are processed in the filename
parameter of an image retrieval endpoint. Exploiting this vulnerability allows us to
access sensitive files from the server. The goal is to retrieve the contents of
/etc/passwd to solve the lab.

LAB DESCRIPTION

Lab Description

The lab contains a vulnerability in the way file paths are processed in the filename parameter of an image retrieval endpoint. Exploiting this vulnerability allows us to access sensitive files from the server. The goal is to retrieve the contents of /etc/passwd to solve the lab.

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

The application interface will open, showcasing a shop with interesting
product descriptions.

STEPS TO SOLVE THE LAB

1.  ACCESS THE LAB

ACCESS
THE LAB

Steps to Solve the Lab

1. Access the Lab

Navigate to the lab environment and click Access the Lab.

The application interface will open, showcasing a shop with interesting product descriptions.

access the lab

## Slide 6

Inspect the page source and find the image retrieval 

endpoint: /image?filename=10.jpg.

Confirm that images are directly accessible by visiting the URL in
your browser (e.g., https://<lab-url>/image?filename=10.jpg).

2. ANALYZE THE APPLICATION

2. Analyze the Application

Inspect the page source and find the image retrieval

endpoint: /image?filename=10.jpg.

Confirm that images are directly accessible by visiting the URL in your browser (e.g., https://<lab-url>/image?filename=10.jpg).

## Slide 7

Enable Intercept in Burp Suite.

Send the intercepted request to Repeater for further analysis.

Launch Burp Suite and configure your browser to
route traffic through Burp's proxy.

Reload the product page and intercept the
request to /image?filename=10.jpg.

3. INTERCEPT THE REQUEST

3. Intercept the Request

Launch Burp Suite and configure your browser to route traffic through Burp's proxy.

Enable Intercept in Burp Suite.

Reload the product page and intercept the request to /image?filename=10.jpg.

Send the intercepted request to Repeater for further analysis.

## Slide 8

In Burp Repeater, modify the filename parameter to test for file path traversal. 

Send the request and observe the response.

Start with ../../etc/passwd. Increase the number of ../ until the correct
directory level is reached.

Example: ../../../etc/passwd

The modified HTTP request in Burp Repeater with filename=../../../etc/passwd.

The HTTP response showing the contents of the /etc/passwd file.

4. TEST FOR FILE PATH TRAVERSAL

4. Test for File Path Traversal

In Burp Repeater, modify the filename parameter to test for file path traversal.

Start with ../../etc/passwd. Increase the number of ../ until the correct directory level is reached.

Example: ../../../etc/passwd

Send the request and observe the response.

The modified HTTP request in Burp Repeater with filename=../../../etc/passwd.

The HTTP response showing the contents of the /etc/passwd file.

## Slide 9

Once the contents of /etc/passwd are displayed, the lab will mark as solved.

Return to the lab interface and confirm the completion.

5. VERIFY THE LAB COMPLETION

5. Verify the Lab Completion

Once the contents of /etc/passwd are displayed, the lab will mark as solved.

Return to the lab interface and confirm the completion.

## Slide 10

(no text captured)

## Slide 11

(no text captured)

## Slide 12

(no text captured)
