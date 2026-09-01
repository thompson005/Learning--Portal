# SSTI_LAB

_Category: Common Web Attacks — Source: https://www.canva.com/design/DAGi0GuLu8g/HmMseUG_VjAuQUhkcme1IA/edit_

---

## Slide 1

SERVER SIDE
TEMPLATE INJECTION

LAB

Server Side Template Injection

LAB

## Slide 2

6.0s
Animate
Position

In this lab, you will learn:

This walkthrough is part of PortSwigger’s Web Security Academy, focusing on
exploiting vulnerabilities on realistic targets.

Identify an SSTI vulnerability in a web application.

Exploit it to execute arbitrary code.

Understand the real-world implications of SSTI attacks.

This lab is vulnerable to server-side template injection due to the
unsafe construction of an ERB template.

To solve the lab, review the ERB documentation to find out how to
execute arbitrary code, then delete the “morale.txt” file from
Carlos’s home directory

LAB WALKTHROUGH

 BASIC SERVER-SIDE TEMPLATE INJECTION

Lab Walkthrough

Basic server-side template injection

This walkthrough is part of PortSwigger’s Web Security Academy, focusing on exploiting vulnerabilities on realistic targets.

In this lab, you will learn:

Identify an SSTI vulnerability in a web application.

Exploit it to execute arbitrary code.

Understand the real-world implications of SSTI attacks.

This lab is vulnerable to server-side template injection due to the unsafe construction of an ERB template.

To solve the lab, review the ERB documentation to find out how to execute arbitrary code, then delete the “morale.txt” file from Carlos’s home directory

## Slide 3

8.1s
Animate
Position

STEPS

ACCESS THE LAB

ANALYZE THE APPLICATION

INTERCEPT THE REQUEST

TESTING

VERIFY LAB COMPLETION

Steps

Access the Lab

Analyze the Application

Intercept the Request

Testing

Verify Lab Completion

## Slide 4

9.9s
Animate
Position

Navigate to the lab environment and click Access the Lab.

The application interface will open, showcasing a shop with interesting
product descriptions

1.ACCESS THE LAB

LAB ENVIRONMENT

ACCESS THE LAB

ACCESS THE LAB

1.Access the Lab

Navigate to the lab environment and click Access the Lab.

The application interface will open, showcasing a shop with interesting product descriptions

lab environment

Access the Lab

## Slide 5

5.9s
Animate
Position

Select any Product. First, we need to detect does the SSTI(Server-Side Template
Injection) vulnerability exist.

To do so, we can fuzz the site via ${{<%[%'"}}%\, which might trigger an template error.

On the home page, I noticed something interesting,

2.ANALYZE THE APPLICATION

2.Analyze the Application

Select any Product. First, we need to detect does the SSTI(Server-Side Template Injection) vulnerability exist.

To do so, we can fuzz the site via ${{<%[%'"}}%\, which might trigger an template error.

On the home page, I noticed something interesting,

## Slide 6

5.0s
Animate
Position

Launch Burp Suite and configure your
browser to route traffic through Burp's
proxy.

Enable Intercept in Burp Suite.

Reload the product page and intercept
the request

When I try to view the details in the
first, it displays Unfortunately this
product is out of stock.

3.INTERCEPT THE REQUEST

3.Intercept the Request

Launch Burp Suite and configure your browser to route traffic through Burp's proxy.

Enable Intercept in Burp Suite.

Reload the product page and intercept the request

When I try to view the details in the first, it displays Unfortunately this product is out of stock.

## Slide 7

5.0s
Animate
Position

Let's check the HTTP history
via Burp Suite

When a product is out of
stock, the application will
render a template, which uses
the message parameter. Let's
fuzz this parameter.

This template engine is ruby
and the working payload is
<%= 7*7 %> - Got a successful
response.

4.TESTING

4.Testing

Let's check the HTTP history via Burp Suite

When a product is out of stock, the application will render a template, which uses the message parameter. Let's fuzz this parameter.

This template engine is ruby and the working payload is <%= 7*7 %> - Got a successful response.

## Slide 8

5.0s
Animate
Position

Now to delete the morale.txt
file from Carlos directory, a
modified payload has to be
constructed.

<%= system("rm morale.txt")
%>, this payload however has
to be URL encoded to execute.

4.TESTING

4.Testing

Now to delete the morale.txt file from Carlos directory, a modified payload has to be constructed.

<%= system("rm morale.txt") %>, this payload however has to be URL encoded to execute.

## Slide 9

7.9s
Animate
Position

The application displays a message: "Congratulations, you solved the lab!".

5.VERIFY LAB COMPLETION

5.Verify Lab Completion

The application displays a message: "Congratulations, you solved the lab!".
