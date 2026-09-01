# Broken Access Control - Hands on

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGbC_5JQNg/Ufl6MqJFGBtu0DQCJZ_DAg/edit_

---

## Slide 1

BROKEN ACCESS
CONTROL - HANDS ON

Broken Access Control - Hands on

## Slide 2

5.0s
Animate
Position

Broken access control issues are generally straightforward to identify when proper
methodologies are followed.




The first step is to identify the primary key or unique identifier the website uses to
recognize a user or resource. For instance, a system might use random IDs, such as
UUIDv4, or incremental numerical IDs for user identification.

COMMON VULNERABILITY PATTERNS

IDENTIFY THE PRIMARY KEY

USE RANDOM IDS

UUIDV4

Common Vulnerability Patterns

Broken access control issues are generally straightforward to identify when proper methodologies are followed.

The first step is to identify the primary key or unique identifier the website uses to recognize a user or resource. For instance, a system might use random IDs, such as UUIDv4, or incremental numerical IDs for user identification.

2 elements, To start navigating the group contents, press Enter

identify the primary key

UUIDv4

use random IDs

## Slide 3

5.0s
Animate
Position

EXAMPLE

If the application uses incremental IDs, imagine a user accessing their profile. The app
might send an HTTP request to the server—depending on the application architecture
—to retrieve the user’s information for display in the UI. This request could look like
/api/user/profile/123, where 123 is the logged-in user’s ID.

If the application lacks proper authorization checks, another user with the ID 124
could potentially access the profile page of the user with the ID 123 by directly
querying the server.

API/USER/PROFILE/123

HTTP REQUEST

example

If the application uses incremental IDs, imagine a user accessing their profile. The app might send an HTTP request to the server—depending on the application architecture—to retrieve the user’s information for display in the UI. This request could look like /api/user/profile/123, where 123 is the logged-in user’s ID.

If the application lacks proper authorization checks, another user with the ID 124 could potentially access the profile page of the user with the ID 123 by directly querying the server.

HTTP request

api/user/profile/123

## Slide 4

8.0s
Animate
Position

PortSwigger Web Security Academy provides hands-on labs for learning web
security concepts. These labs simulate real-world vulnerabilities in a safe, controlled
environment, allowing security practitioners and enthusiasts to practice their skills
legally and ethically.

INTRODUCTION TO PORTSWIGGER LABS

Introduction to PortSwigger Labs

PortSwigger Web Security Academy provides hands-on labs for learning web security concepts. These labs simulate real-world vulnerabilities in a safe, controlled environment, allowing security practitioners and enthusiasts to practice their skills legally and ethically.

## Slide 5

7.8s
Animate
Position

This lab demonstrates an Insecure Direct Object Reference (IDOR) vulnerability where
we can access another user's data by manipulating a parameter in the URL.

Basic understanding of HTTP requests

Familiarity with web browsers

Access to PortSwigger Web Security Academy




LAB DESCRIPTION

PREREQUISITES

Lab Description

This lab demonstrates an Insecure Direct Object Reference (IDOR) vulnerability where we can access another user's data by manipulating a parameter in the URL.

Prerequisites

Basic understanding of HTTP requests

Familiarity with web browsers

Access to PortSwigger Web Security Academy

## Slide 6

5.0s
Animate
Position

*The image shows the initial lab environment URL provided by PortSwigger.

1. INITIAL LAB ACCESS

STEP-BY-STEP SOLUTION

Step-by-Step Solution

1. Initial Lab Access

*The image shows the initial lab environment URL provided by PortSwigger.

## Slide 7

5.0s
Animate
Position

*Screenshot shows the lab interface with the title "Insecure Direct Object References" and lab status.

2. UNDERSTANDING THE LAB INTERFACE

STEP-BY-STEP SOLUTION

Step-by-Step Solution

2. Understanding the Lab Interface

*Screenshot shows the lab interface with the title "Insecure Direct Object References" and lab status.

## Slide 8

5.0s
Animate
Position

In this lab, we have access to a live chat feature with a support agent named Hal Pline.
The chat interface allows users to download chat transcripts.

3. EXPLORING THE CHAT FEATURE

STEP-BY-STEP SOLUTION

*Screenshot shows a conversation with the chat support agent.

Step-by-Step Solution

3. Exploring the Chat Feature

In this lab, we have access to a live chat feature with a support agent named Hal Pline. The chat interface allows users to download chat transcripts.

*Screenshot shows a conversation with the chat support agent.

## Slide 9

5.0s
Animate
Position

When clicking "View transcript", we can observe the HTTP request made to download
the transcript:

4. ANALYZING THE REQUEST

STEP-BY-STEP SOLUTION

Screenshot shows the HTTP request details with the transcript parameter.

Step-by-Step Solution

4. Analyzing the Request

When clicking "View transcript", we can observe the HTTP request made to download the transcript:

Screenshot shows the HTTP request details with the transcript parameter.

## Slide 10

6.8s
Animate
Position

Key observations:

Request path: GET /download-transcript/2.txt

The filename parameter (2.txt) appears to be
directly referencing a file on the server

4. ANALYZING THE REQUEST

STEP-BY-STEP SOLUTION

Step-by-Step Solution

4. Analyzing the Request

Key observations:

Request path: GET /download-transcript/2.txt

The filename parameter (2.txt) appears to be directly referencing a file on the server

## Slide 11

5.0s
Animate
Position

5. EXPLOITING THE VULNERABILITY

STEP-BY-STEP SOLUTION

We noticed the transcript file is named "2.txt"

By changing the request to fetch "1.txt" instead, we can access another user's transcript

This transcript contained sensitive information - a user's password

Step-by-Step Solution

5. Exploiting the Vulnerability

2 elements, To start navigating the group contents, press Enter

We noticed the transcript file is named "2.txt"

By changing the request to fetch "1.txt" instead, we can access another user's transcript

This transcript contained sensitive information - a user's password

## Slide 12

5.0s
Animate
Position

6. ACCESSING THE ACCOUNT

STEP-BY-STEP SOLUTION

*Screenshot shows the login page where we can use the discovered credentials.

Step-by-Step Solution

6. Accessing the Account

*Screenshot shows the login page where we can use the discovered credentials.

## Slide 13

5.0s
Animate
Position

6. ACCESSING THE ACCOUNT

STEP-BY-STEP SOLUTION

Username: Carlos (default for this lab)

Password: [retrieved from transcript]

Successfully logged in and solved the lab

Step-by-Step Solution

6. Accessing the Account

Username: Carlos (default for this lab)

Password: [retrieved from transcript]

Successfully logged in and solved the lab

## Slide 14

7.1s
Animate
Position

TO PREVENT IDOR VULNERABILITIES:

SECURITY RECOMMENDATIONS

Implement Proper
Access Controls

Verify user permissions before allowing
access to resources

Instead of using sequential numbers or predictable identifiers

Generate random, unpredictable tokens for resources

Use Indirect
References

Always verify if the logged-in user has permission to
access the requested resource

Implement proper session management

Session Validation

Log all access attempts

Monitor for suspicious patterns of behavior

Audit Trails

Security Recommendations

To prevent IDOR vulnerabilities:

2 elements, To start navigating the group contents, press Enter

Implement Proper Access Controls

Verify user permissions before allowing access to resources

2 elements, To start navigating the group contents, press Enter

Use Indirect References

Instead of using sequential numbers or predictable identifiers

Generate random, unpredictable tokens for resources

2 elements, To start navigating the group contents, press Enter

Always verify if the logged-in user has permission to access the requested resource

Implement proper session management

Session Validation

2 elements, To start navigating the group contents, press Enter

Audit Trails

Log all access attempts

Monitor for suspicious patterns of behavior

## Slide 15

5.0s
Animate
Position

LAB COMPLETION

*Screenshot showing the "Lab Solved" message.

Lab Completion

*Screenshot showing the "Lab Solved" message.

## Slide 16

8.1s
Animate
Position

FINAL NOTES

This lab demonstrates how simple
parameter manipulation can lead to
unauthorized access




Always implement proper access
controls in production applications




Regular security testing can help
identify such vulnerabilities before
they're exploited




Final Notes

This lab demonstrates how simple parameter manipulation can lead to unauthorized access

Always implement proper access controls in production applications

Regular security testing can help identify such vulnerabilities before they're exploited
