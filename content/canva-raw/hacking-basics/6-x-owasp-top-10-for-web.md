# 6.x. OWASP Top 10 For Web

_Category: Hacking Basics — Source: https://www.canva.com/design/DAGYTtapyO8/t3IPAoh3GqyQigQ0WMBeEg/edit_

---

## Slide 1

OWASP TOP 10 FOR WEB

OWASP Top 10 For Web

## Slide 2

5.0s
Animate
Position

The OWASP Top 10 for Web is a standard awareness document for web
application security. It represents a consensus-driven list of the most
critical security risks to web applications.

The OWASP Foundation, a globally recognized authority on web security,
compiles this list based on extensive data collection and expert input from
the cybersecurity community.

The Top 10 focuses on common vulnerabilities, such as injection attacks,
broken authentication, and cross-site scripting (XSS), aiming to educate
developers, testers, and security professionals about best practices to
mitigate these risks.

The OWASP Top 10 for Web is a standard awareness document for web application security. It represents a consensus-driven list of the most critical security risks to web applications.

The OWASP Foundation, a globally recognized authority on web security, compiles this list based on extensive data collection and expert input from the cybersecurity community.

The Top 10 focuses on common vulnerabilities, such as injection attacks, broken authentication, and cross-site scripting (XSS), aiming to educate developers, testers, and security professionals about best practices to mitigate these risks.

## Slide 3

5.4s
Animate
Position

The OWASP Top 10 for the Web is a list of the most dangerous vulnerabilities
that hackers use to attack web applications. It’s like a guide to what can go
wrong in web security.

IN SIMPLE WORDS

Website

Checklist

In Simple words

The OWASP Top 10 for the Web is a list of the most dangerous vulnerabilities that hackers use to attack web applications. It’s like a guide to what can go wrong in web security.

Website

Checklist

## Slide 4

5.0s
Animate
Position

OWASP TOP 10 FOR WEB (2021)

Injection

Insecure Design

Security Misconfiguration

Vulnerable and Outdated Components

Security Logging and Monitoring Failure

Server-Site Request Forger

Software and Data Integrity Failure

Identification and Authentication Failure

Broken Authentication

Sensitive Data Exposure

OWASP Top 10 For Web (2021)

2 elements, To start navigating the group contents, press Enter

Injection

4 elements, To start navigating the group contents, press Enter

Vulnerable and Outdated Components

3 elements, To start navigating the group contents, press Enter

Insecure Design

3 elements, To start navigating the group contents, press Enter

Sensitive Data Exposure

4 elements, To start navigating the group contents, press Enter

Identification and Authentication Failure

4 elements, To start navigating the group contents, press Enter

Software and Data Integrity Failure

3 elements, To start navigating the group contents, press Enter

Security Misconfiguration

4 elements, To start navigating the group contents, press Enter

Security Logging and Monitoring Failure

4 elements, To start navigating the group contents, press Enter

Server-Site Request Forger

3 elements, To start navigating the group contents, press Enter

Broken Authentication

## Slide 5

5.0s
Animate
Position

INJECTION

Injection flaws occur when user input is improperly
sanitized or validated, allowing malicious data to be
interpreted as part of a command or query. 

This can lead to attackers accessing or manipulating
a database (SQL Injection) or executing arbitrary
commands (Command Injection).

When applications don’t properly filter inputs,
attackers can inject malicious commands to
compromise systems or steal data

injection

Injection flaws occur when user input is improperly sanitized or validated, allowing malicious data to be interpreted as part of a command or query.

This can lead to attackers accessing or manipulating a database (SQL Injection) or executing arbitrary commands (Command Injection).

When applications don’t properly filter inputs, attackers can inject malicious commands to compromise systems or steal data

## Slide 6

5.0s
Animate
Position

SELECT * FROM users WHERE username = 'input' AND password = 'input’;

SELECT * FROM users WHERE username = ‘admin’--’ AND password = 'input’;

INJECTION

For example, a vulnerable SQL query might look like this:

An attacker could provide ‘admin’-- as username, and login as admin without
the correct password

injection

For example, a vulnerable SQL query might look like this:

SELECT * FROM users WHERE username = 'input' AND password = 'input’;

2 elements, To start navigating the group contents, press Enter

An attacker could provide ‘admin’-- as username, and login as admin without the correct password

SELECT * FROM users WHERE username = ‘admin’--’ AND password = 'input’;

## Slide 7

5.0s
Animate
Position

INJECTION

One Pizza and wipe
out the kitchen,
please.

Ok!

REAL-WORLD EXAMPLE

SQL Injection vulnerabilities in their
systems allowed attackers to
exfiltrate a massive amount of
sensitive data, including unreleased
movies and employee details

Sony Pictures Hack (2014)

Source: Attacks by the Lazarus Group

injection

One Pizza and wipe out the kitchen, please.

Ok!

real-World example

Sony Pictures Hack (2014)

SQL Injection vulnerabilities in their systems allowed attackers to exfiltrate a massive amount of sensitive data, including unreleased movies and employee details

Source: Attacks by the Lazarus Group

## Slide 8

5.0s
Animate
Position

BROKEN
AUTHENTICATION

Authentication systems may fail due to weak
mechanisms, predictable session identifiers, or
insecure handling of credentials. Attackers can exploit
these issues to impersonate users, hijack accounts, or
escalate privileges.

Weak or improperly managed login systems
allow attackers to take over accounts or
impersonate users.

4 elements, To start navigating the group contents, press Enter

Broken Authentication

Authentication systems may fail due to weak mechanisms, predictable session identifiers, or insecure handling of credentials. Attackers can exploit these issues to impersonate users, hijack accounts, or escalate privileges.

Weak or improperly managed login systems allow attackers to take over accounts or impersonate users.

## Slide 9

5.0s
Animate
Position

BROKEN
AUTHENTICATION

REAL-WORLD ATTACK

A vulnerability allowed attackers to
view private posts and photos. By
manipulating the “user ID” in API
requests, attackers could bypass
access control restrictions and access
content intended for private viewing

Facebook (2019)

Source: Reported through Facebook’s
Bug Bounty program

An application uses sequential user
IDs (e.g., user1, user2) and allows
users to reset passwords without
verifying ownership of the account.
An attacker can enumerate user IDs
and reset passwords for all accounts

EXAMPLE

EXAMPLE

An application uses sequential user IDs (e.g., user1, user2) and allows users to reset passwords without verifying ownership of the account. An attacker can enumerate user IDs and reset passwords for all accounts

example

4 elements, To start navigating the group contents, press Enter

Broken Authentication

real-World attack

Facebook (2019)

A vulnerability allowed attackers to view private posts and photos. By manipulating the “user ID” in API requests, attackers could bypass access control restrictions and access content intended for private viewing

Source: Reported through Facebook’s Bug Bounty program

## Slide 10

5.0s
Animate
Position

SENSITIVE DATA
EXPOSURE

Applications that fail to encrypt sensitive data, like
passwords, credit card information, or personal details,
are vulnerable. Weak encryption algorithms, lack of
HTTPS, or improper key management can lead to
breaches.

Sensitive information, like personal or financial
data, is easily stolen when it isn’t encrypted or
securely stored.

4 elements, To start navigating the group contents, press Enter

sensitive data exposure

Applications that fail to encrypt sensitive data, like passwords, credit card information, or personal details, are vulnerable. Weak encryption algorithms, lack of HTTPS, or improper key management can lead to breaches.

Sensitive information, like personal or financial data, is easily stolen when it isn’t encrypted or securely stored.

## Slide 11

5.0s
Animate
Position

SENSITIVE DATA
EXPOSURE

REAL-WORLD ATTACK

Hackers stole approximately 38 million user records, including encrypted passwords
and sensitive customer details such as names and credit card information. The
encryption method used was weak (unsalted MD5 hashes), making it trivial for
attackers to crack and expose user credentials. Additionally, parts of the database,
such as password hints, were stored in plain text, exacerbating the issue.

Adobe Data Breach (2013)

EXAMPLE

EXAMPLE

Passwords stored in plaintext instead of being hashed
can be exposed if the database is compromised

2 elements, To start navigating the group contents, press Enter

real-World attack

Adobe Data Breach (2013)

4 elements, To start navigating the group contents, press Enter

sensitive data exposure

Passwords stored in plaintext instead of being hashed can be exposed if the database is compromised

example

Hackers stole approximately 38 million user records, including encrypted passwords and sensitive customer details such as names and credit card information. The encryption method used was weak (unsalted MD5 hashes), making it trivial for attackers to crack and expose user credentials. Additionally, parts of the database, such as password hints, were stored in plain text, exacerbating the issue.

## Slide 12

5.0s
Animate
Position

INSECURE DESIGN

Insecure design stems from a lack of security consideration during the development
process. Examples include not implementing rate limiting, failing to validate inputs, or
ignoring threat models

A login system without account lockout allows
brute-force attacks to guess passwords
indefinitely

A poorly designed system invites attacks
because it doesn’t account for potential
threats.

It’s like building a house without locks or an
alarm system. Anyone can walk in without
resistance.

REAL-WORLD ATTACK

Insecure design in AWS
configurations allowed attackers to
exploit a vulnerability in a web
application firewall (WAF), gaining
unauthorized access to over 100
million records stored on S3 buckets.

Capital One Data Breach (2019)

Insecure Design

Insecure design stems from a lack of security consideration during the development process. Examples include not implementing rate limiting, failing to validate inputs, or ignoring threat models

A login system without account lockout allows brute-force attacks to guess passwords indefinitely

real-World attack

Capital One Data Breach (2019)

A poorly designed system invites attacks because it doesn’t account for potential threats.

Insecure design in AWS configurations allowed attackers to exploit a vulnerability in a web application firewall (WAF), gaining unauthorized access to over 100 million records stored on S3 buckets.

It’s like building a house without locks or an alarm system. Anyone can walk in without resistance.

## Slide 13

5.0s
Animate
Position

SECURITY
MISCONFIGURATION

Misconfigurations occur when default settings
are left unchanged, unnecessary features are
enabled, or systems are not patched.

In simple words:

Systems that aren’t properly configured or
updated are easy targets for attackers.

4 elements, To start navigating the group contents, press Enter

Security Misconfiguration

Misconfigurations occur when default settings are left unchanged, unnecessary features are enabled, or systems are not patched.

2 elements, To start navigating the group contents, press Enter

In simple words:

Systems that aren’t properly configured or updated are easy targets for attackers.
