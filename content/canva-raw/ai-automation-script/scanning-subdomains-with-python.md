# scanning_subdomains_with_python

_Category: AI Automation Script — Source: https://www.canva.com/design/DAGohEaJHiM/dc9_JFO_lsztfJ7_kx5MfA/edit_

---

## Slide 1

SCANNING SUBDOMAINS
WITH PYTHON

scanning subdomains with python

## Slide 2

PYTHON-BASED SUBDOMAIN ENUMERATION SCRIPT

INTRODUCTION

Subdomain enumeration is the process of finding all the subdomains associated with a
particular domain (like finding different doors to a building). Cybersecurity
professionals use this technique to discover entry points that attackers might exploit.

Python-Based Subdomain Enumeration Script

Introduction

Subdomain enumeration is the process of finding all the subdomains associated with a particular domain (like finding different doors to a building). Cybersecurity professionals use this technique to discover entry points that attackers might exploit.

## Slide 3

PYTHON-BASED SUBDOMAIN ENUMERATION SCRIPT

INTRODUCTION

Python, being simple and powerful, is commonly used to write automation scripts for
subdomain enumeration. These scripts help automate the process of discovering
subdomains quickly and efficiently.

Python-Based Subdomain Enumeration Script

Introduction

Python, being simple and powerful, is commonly used to write automation scripts for subdomain enumeration. These scripts help automate the process of discovering subdomains quickly and efficiently.

## Slide 4

WHAT IS A SUBDOMAIN?

FOR EXAMPLE

A subdomain is a part of a main website address.

 is a subdomain of 

 is a subdomain of 

mail.google.com

google.com

store.apple.com

apple.com

Subdomains often host different services like login pages, admin panels, blogs, or
development environments—making them potential targets in cybersecurity.

What Is a Subdomain?

A subdomain is a part of a main website address.

For example

mail.google.com

is a subdomain of

google.com

store.apple.com

is a subdomain of

apple.com

Subdomains often host different services like login pages, admin panels, blogs, or development environments—making them potential targets in cybersecurity.

## Slide 5

WHY USE PYTHON FOR SUBDOMAIN ENUMERATION?

Python is easy to learn
and widely used in
cybersecurity.

It supports many
libraries and APIs to
make the process faster.

Python can automate
the task of checking
hundreds of possible
subdomains in minutes.

Why Use Python for Subdomain Enumeration?

Python is easy to learn and widely used in cybersecurity.

It supports many libraries and APIs to make the process faster.

Python can automate the task of checking hundreds of possible subdomains in minutes.

## Slide 6

WHAT THE SCRIPT DOES

A typical subdomain enumeration script in Python:

Takes a domain
name as input 

(e.g., example.com).

Checks a list of common
subdomains (like www,
login, admin, etc.).

Sends requests to see
which of those
subdomains are active.

Displays the
subdomains that are
reachable (live).

What the Script Does

A typical subdomain enumeration script in Python:

Takes a domain name as input

(e.g., example.com).

Checks a list of common subdomains (like www, login, admin, etc.).

Sends requests to see which of those subdomains are active.

Displays the subdomains that are reachable (live).

## Slide 7

import requests




# List of common subdomains to check

subdomains = ["www", "mail", "ftp", "admin", "test", "dev"]

domain = input("Enter the domain (e.g., example.com): ")




print("\nEnumerating subdomains...\n")

for sub in subdomains:

    url = f"http://{sub}.{domain}"

    try:

        response = requests.get(url, timeout=3)

        if response.status_code == 200:

            print(f"[+] Found: {url}")

    except requests.ConnectionError:

        pass

BASIC PYTHON SCRIPT EXAMPLE

import requests

# List of common subdomains to check

subdomains = ["www", "mail", "ftp", "admin", "test", "dev"]

domain = input("Enter the domain (e.g., example.com): ")

print("\nEnumerating subdomains...\n")

for sub in subdomains:

url = f"http://{sub}.{domain}"

try:

response = requests.get(url, timeout=3)

if response.status_code == 200:

print(f"[+] Found: {url}")

except requests.ConnectionError:

pass

Basic Python Script Example

## Slide 8

HOW TO USE THE SCRIPT

Copy the code 

into a Python file 

(e.g., subdomain_enum.py).

Run it using
Python 3 in your
terminal or IDE.

Enter a domain like
example.com.

It will show which
subdomains are
active.

How to Use the Script

Copy the code

into a Python file

(e.g., subdomain_enum.py).

Run it using Python 3 in your terminal or IDE.

Enter a domain like example.com.

It will show which subdomains are active.

## Slide 9

CONCLUSION

Python-based subdomain enumeration scripts are an excellent way to start learning
practical cybersecurity. They help discover hidden parts of a website that might
otherwise go unnoticed. This process is vital for both offensive security (like penetration
testing) and defensive security (like vulnerability assessments).

Conclusion

Python-based subdomain enumeration scripts are an excellent way to start learning practical cybersecurity. They help discover hidden parts of a website that might otherwise go unnoticed. This process is vital for both offensive security (like penetration testing) and defensive security (like vulnerability assessments).
