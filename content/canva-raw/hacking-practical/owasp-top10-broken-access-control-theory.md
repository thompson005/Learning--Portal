# OWASP Top10 - Broken Access Control (Theory)

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGaL7NLiYs/84GKTogCHxyeLTOZjJNlbw/edit_

---

## Slide 1

BROKEN ACCESS
CONTROL

broken access control

## Slide 2

6.9s
Animate
Position

WHAT IS ACCESS CONTROL?

Access control is a security mechanism that restricts access to resources
based on the identity of users or devices. It enforces policies that determine
who can perform what actions on which resources. Effective access control
ensures that only authorized users can access sensitive information or
perform critical functions.

Access control is like having a security guard at a
building who checks if people are allowed to enter
certain areas. In websites and applications, it's
the system that makes sure users can only
access what they're supposed to.

What is Access Control?

Access control is a security mechanism that restricts access to resources based on the identity of users or devices. It enforces policies that determine who can perform what actions on which resources. Effective access control ensures that only authorized users can access sensitive information or perform critical functions.

Access control is like having a security guard at a building who checks if people are allowed to enter certain areas. In websites and applications, it's the system that makes sure users can only access what they're supposed to.

## Slide 3

5.0s
Animate
Position

QUICK RECAP ABOUT AUTHENTICATION
AND AUTHORIZATION

Authentication: Verifying who the user is (e.g., username and password).

Authorization: Determining what an authenticated user is allowed to do
(e.g., accessing specific files or functions).

Quick Recap about Authentication and Authorization

Authentication: Verifying who the user is (e.g., username and password).

Authorization: Determining what an authenticated user is allowed to do (e.g., accessing specific files or functions).

## Slide 4

5.0s
Animate
Position

BROKEN ACCESS CONTROL

Broken access control is a security vulnerability that occurs when an
application does not properly enforce restrictions on what
authenticated users are allowed to do.

This can lead to unauthorized access to sensitive data or functionality,
allowing attackers to exploit these weaknesses for malicious purposes.

According to recent data statistics, 94% of applications were tested
for some form of broken access control, with an average incidence rate
of 3.81%. This indicates that broken access control is a common
vulnerability in many applications

Broken Access Control

Broken access control is a security vulnerability that occurs when an application does not properly enforce restrictions on what authenticated users are allowed to do.

This can lead to unauthorized access to sensitive data or functionality, allowing attackers to exploit these weaknesses for malicious purposes.

According to recent data statistics, 94% of applications were tested for some form of broken access control, with an average incidence rate of 3.81%. This indicates that broken access control is a common vulnerability in many applications

## Slide 5

5.0s
Animate
Position

Vertical Privilege Escalation

Horizontal Privilege Escalation

PRIVILEGE ESCALATION

Privilege escalation is a type of cybersecurity vulnerability or attack where an
attacker gains higher levels of access or permissions within a system than they
are supposed to have. This can allow the attacker to perform unauthorized
actions, such as accessing sensitive data, modifying configurations, or executing
administrative tasks.

Privilege escalation can be categorized into two main types:

Privilege Escalation

Privilege escalation is a type of cybersecurity vulnerability or attack where an attacker gains higher levels of access or permissions within a system than they are supposed to have. This can allow the attacker to perform unauthorized actions, such as accessing sensitive data, modifying configurations, or executing administrative tasks.

Privilege escalation can be categorized into two main types:

3 elements, To start navigating the group contents, press Enter

Vertical Privilege Escalation

4 elements, To start navigating the group contents, press Enter

Horizontal Privilege Escalation

## Slide 6

5.0s
Animate
Position

VERTICAL PRIVILEGE ESCALATION

The attacker gains access to higher privileges, such as going from a normal
user to an administrator or root user. This is typically achieved by exploiting
vulnerabilities or misconfigurations in the system.

Think of it like a regular employee finding a way to get manager-level access.
It’s when a normal user gains powers they shouldn’t have, like admin privileges.

User

User

Admin

Admin

Vertical Privilege Escalation

The attacker gains access to higher privileges, such as going from a normal user to an administrator or root user. This is typically achieved by exploiting vulnerabilities or misconfigurations in the system.

Think of it like a regular employee finding a way to get manager-level access. It’s when a normal user gains powers they shouldn’t have, like admin privileges.

Admin

User

## Slide 7

5.0s
Animate
Position

REAL-WORLD EXAMPLE

Imagine a school website where:

Students should only view their own grades.

Teachers can view and change all grades.

A student finds a way to access the grade-
changing feature meant only for teachers.

Real-World Example

Imagine a school website where:

Students should only view their own grades.

Teachers can view and change all grades.

A student finds a way to access the grade-changing feature meant only for teachers.

## Slide 8

5.0s
Animate
Position

HORIZONTAL PRIVILEGE ESCALATION

This is when a user accesses another user’s information even though they’re
at the same level. It’s like a student being able to see other students’ private
information.

Each customer should only see their own
account.

Think of a banking app where:

A customer changes something in the
website address.

They can suddenly see someone else's
account details.

horizontal Privilege Escalation

This is when a user accesses another user’s information even though they’re at the same level. It’s like a student being able to see other students’ private information.

Think of a banking app where:

Each customer should only see their own account.

A customer changes something in the website address.

They can suddenly see someone else's account details.

## Slide 9

6.9s
Animate
Position

www.shop.com/receipt/12345

For example, Normal address to
view your receipt:

IDOR (pronounced “eye-door”) happens when a website uses simple numbers or IDs
that are easy to guess to show information.

INSECURE DIRECT OBJECT
REFERENCES (IDOR)

An attacker might try to view
someone else’s receipt:

www.shop.com/receipt/12346

If the website doesn't check who’s asking for the receipt, anyone could view other
people’s receipts just by changing the number.

Insecure Direct Object References (IDOR)

IDOR (pronounced “eye-door”) happens when a website uses simple numbers or IDs that are easy to guess to show information.

For example, Normal address to view your receipt:

An attacker might try to view someone else’s receipt:

www.shop.com/receipt/12345

2 elements, To start navigating the group contents, press Enter

www.shop.com/receipt/12346

If the website doesn't check who’s asking for the receipt, anyone could view other people’s receipts just by changing the number.

## Slide 10

5.0s
Animate
Position

COMMON VULNERABILITIES OR
MISTAKES

Improper Access Control Configuration

Insufficient Permission Validation

Inadequate Monitoring and Logging

Common Vulnerabilities or Mistakes

Improper Access Control Configuration

Insufficient Permission Validation

Inadequate Monitoring and Logging

## Slide 11

7.1s
Animate
Position

IMPROPER ACCESS CONTROL
CONFIGURATION

Access control vulnerabilities commonly occur when security measures are
not properly implemented or configured. This includes:

Missing authorization checks on critical endpoints.

Inadequate validation of user permissions.

Incomplete access control matrices.

Misconfigured security settings.

Improper Access Control Configuration

Access control vulnerabilities commonly occur when security measures are not properly implemented or configured. This includes:

Missing authorization checks on critical endpoints.

Inadequate validation of user permissions.

Incomplete access control matrices.

Misconfigured security settings.

## Slide 12

5.0s
Animate
Position

INSUFFICIENT PERMISSION
VALIDATION

Systems often fail to properly validate user permissions before granting access
to resources. This occurs when:

User roles are not properly verified before executing privileged operations.

Access controls are implemented client-side only.

Authorization checks are bypassed due to logical flaws.

Permission inheritance is not properly managed.

Insufficient Permission Validation

Systems often fail to properly validate user permissions before granting access to resources. This occurs when:

User roles are not properly verified before executing privileged operations.

Access controls are implemented client-side only.

Authorization checks are bypassed due to logical flaws.

Permission inheritance is not properly managed.

## Slide 13

8.0s
Animate
Position

INADEQUATE MONITORING AND
LOGGING

Many systems lack proper monitoring mechanisms, making it difficult to:

Detect unauthorized access attempts

Track suspicious patterns of behavior

Identify potential security breaches

Audit user actions effectively.

Inadequate Monitoring and Logging

Many systems lack proper monitoring mechanisms, making it difficult to:

Detect unauthorized access attempts

Track suspicious patterns of behavior

Identify potential security breaches

Audit user actions effectively.

## Slide 14

5.0s
Animate
Position

BANKING APPLICATION
VULNERABILITY

Horizontal Privilege Escalation

Users access their
account information
through unique identifiers.

The system fails to
validate user ownership
of accounts.

Unauthorized users can
access others’ financial data
by modifying identifiers.

Consider a banking application where,

Banking Application Vulnerability

Horizontal Privilege Escalation

Consider a banking application where,

Users access their account information through unique identifiers.

The system fails to validate user ownership of accounts.

Unauthorized users can access others’ financial data by modifying identifiers.

## Slide 15

9.6s
Animate
Position

CONTENT MANAGEMENT
SYSTEM ACCESS

Vertical Privilege Escalation

Different user roles exist
(editors, authors,
administrators)

Improper access controls
allow users to access
unauthorized functions.

Users can perform actions
beyond their assigned
privileges.

In a typical Content Management System environment,

Content Management System Access

Vertical Privilege Escalation

In a typical Content Management System environment,

Different user roles exist (editors, authors, administrators)

Improper access controls allow users to access unauthorized functions.

Users can perform actions beyond their assigned privileges.

## Slide 16

5.0s
Animate
Position

DECTECTION METHODS

Systematic Security Auditing:

Conduct regular security assessments.

Perform penetration testing

Review access control configurations

Update security measures based on
findings

Comprehensive Monitoring:

Implement detailed logging
mechanisms

Monitor access patterns and
anomalies

Set up alerting systems for
suspicious activities

Maintain audit trails of all critical
operations

Dectection Methods

Systematic Security Auditing:

Comprehensive Monitoring:

Conduct regular security assessments.

Implement detailed logging mechanisms

Perform penetration testing

Monitor access patterns and anomalies

Review access control configurations

Update security measures based on findings

Set up alerting systems for suspicious activities

Maintain audit trails of all critical operations

## Slide 17

7.1s
Animate
Position

PREVENTION METHODS

Implement Robust Authorization

Develop comprehensive role-based access control (RBAC)

Implement attribute-based access control where
necessary

Enforce principle of least privilege

Validate permissions at every access point

Prevention Methods

Implement Robust Authorization

Develop comprehensive role-based access control (RBAC)

Implement attribute-based access control where necessary

Enforce principle of least privilege

Validate permissions at every access point

## Slide 18

5.4s
Animate
Position

BEST PRACTICES SUMMARY

Implement comprehensive access
control mechanisms

Validate all access attempts
server-side

Maintain detailed security logs

Conduct regular security assessments

Update security measures proactively

Best Practices SummarY

Implement comprehensive access control mechanisms

Validate all access attempts server-side

Maintain detailed security logs

Conduct regular security assessments

Update security measures proactively
