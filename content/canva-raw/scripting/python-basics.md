# Python Basics

_Category: Scripting — Source: https://www.canva.com/design/DAGn-uFZYq8/tos9lw5W1xfKapbVVMBH-A/edit_

---

## Slide 1

PYTHON BASICS

Python Basics

## Slide 2

INTRODUCTION

Python is a powerful and easy-to-learn programming language used in various fields,
including cybersecurity. This guide covers Python basics and essential libraries for
security research.

Introduction

Python is a powerful and easy-to-learn programming language used in various fields, including cybersecurity. This guide covers Python basics and essential libraries for security research.

## Slide 3

x = 10  # Integer

y = 3.14  # Float

name = "Alice"  # String

is_authenticated = True  # Boolean

age = 20

if age >= 18:

    print("You are an adult.")

else:

    print("You are a minor.")

PYTHON BASICS

VARIABLES & DATA TYPES

CONDITIONAL STATEMENTS

Python Basics

Variables & Data Types

Conditional Statements

x = 10 # Integer

y = 3.14 # Float

name = "Alice" # String

is_authenticated = True # Boolean

age = 20

if age >= 18:

print("You are an adult.")

else:

print("You are a minor.")

## Slide 4

# For Loop

for i in range(5):

    print(i)




# While Loop

count = 0

while count < 5:

    print(count)

    count += 1

def greet(name):

    return f"Hello, {name}!"

print(greet("Alice"))

LOOPS

FUNCTIONS

PYTHON BASICS

Python Basics

Loops

Functions

# For Loop

for i in range(5):

print(i)

# While Loop

count = 0

while count < 5:

print(count)

count += 1

def greet(name):

return f"Hello, {name}!"

print(greet("Alice"))

## Slide 5

# List

fruits = ["apple", "banana", "cherry"]

print(fruits[0])




# Dictionary

user = {"name": "Alice", "age": 25}

print(user["name"])

# Writing to a file

with open("test.txt", "w") as f:

    f.write("Hello, World!")




# Reading a file

with open("test.txt", "r") as f:

    print(f.read())

LISTS & DICTIONARIES

FILE HANDLING

PYTHON BASICS

Python Basics

Lists & Dictionaries

File Handling

# List

fruits = ["apple", "banana", "cherry"]

print(fruits[0])

# Dictionary

user = {"name": "Alice", "age": 25}

print(user["name"])

# Writing to a file

with open("test.txt", "w") as f:

f.write("Hello, World!")

# Reading a file

with open("test.txt", "r") as f:

print(f.read())

## Slide 6

ADVANCED PYTHON CONCEPTS

try:

    x = 1 / 0

except ZeroDivisionError as e:

    print(f"Error: {e}")

import os

import sys

import math

import random

print(os.getcwd())  # Get current working directory

EXCEPTION HANDLING

MODULES & LIBRARIES

Advanced Python Concepts

Exception Handling

try:

x = 1 / 0

except ZeroDivisionError as e:

print(f"Error: {e}")

Modules & Libraries

import os

import sys

import math

import random

print(os.getcwd()) # Get current working directory

## Slide 7

ESSENTIAL LIBRARIES

scapy

socket

requests

BeautifulSoup

Packet manipulation and network scanning

Network programming and port scanning

Web requests and scraping

Web scraping

scapy

Essential Libraries

Packet manipulation and network scanning

socket

Network programming and port scanning

requests

Web requests and scraping

BeautifulSoup

Web scraping

## Slide 8

hashlib

base64

pyshark

nmap

Cryptographic hashing

Encoding and decoding

Analyzing network traffic

Using Python for Nmap scanning (python-nmap)

ESSENTIAL LIBRARIES

hashlib

Essential Libraries

Cryptographic hashing

base64

Encoding and decoding

pyshark

Analyzing network traffic

nmap

Using Python for Nmap scanning (python-nmap)

## Slide 9

PYTHON BUILT-IN FUNCTIONS

print(len("Hello"))  # Length of a string

print("hello".upper())  # Convert to uppercase

print("HELLO".lower())  # Convert to lowercase

print("hello world".split())  # Split into list

import os

print(os.system("ls"))  # Run shell command

print(os.getenv("HOME"))  # Get environment variable

STRING AND DATA MANIPULATION

SYSTEM AND PROCESS INTERACTION

Python Built-in Functions

String and Data Manipulation

print(len("Hello")) # Length of a string

print("hello".upper()) # Convert to uppercase

print("HELLO".lower()) # Convert to lowercase

print("hello world".split()) # Split into list

System and Process Interaction

import os

print(os.system("ls")) # Run shell command

print(os.getenv("HOME")) # Get environment variable

## Slide 10

import random

print(random.randint(1, 100))  # Random number

print(random.choice(["A", "B", "C"]))  # Random choice

import time

print(time.time())  # Current epoch time

time.sleep(2)  # Pause execution for 2 seconds

RANDOMIZATION AND ENCODING

TIME AND EXECUTION CONTROL

PYTHON BUILT-IN FUNCTIONS

Python Built-in Functions

Randomization and Encoding

import random

print(random.randint(1, 100)) # Random number

print(random.choice(["A", "B", "C"])) # Random choice

Time and Execution Control

import time

print(time.time()) # Current epoch time

time.sleep(2) # Pause execution for 2 seconds

## Slide 11

print(os.listdir("."))  # List files in directory

print(os.path.exists("test.txt"))  # Check if file exists

FILE AND DIRECTORY HANDLING

PYTHON BUILT-IN FUNCTIONS

Python Built-in Functions

File and Directory Handling

print(os.listdir(".")) # List files in directory

print(os.path.exists("test.txt")) # Check if file exists
