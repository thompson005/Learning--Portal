# API

_Category: Application Basics — Source: https://www.canva.com/design/DAGSNd-bp8M/dajys3_G-9yNAhiCAb3_vQ/edit_

---

## Slide 1

API

APPLICATION
PROGRAMMING
INTERFACE

API

Application programming interface

## Slide 2

5.0s
Animate
Position

An API documentation is like a menu in a restaurant. It lists the dishes you can
order. The API is like a waiter who picks the order. The chef (backend) prepares
your meal based on your request.

INTRODUCTION TO API

An API (Application Programming Interface) is a set of rules and protocols that
allows different software applications to communicate with each other.

API

Client

Back-end

3 elements, To start navigating the group contents, press Enter

Introduction to API

An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other.

An API documentation is like a menu in a restaurant. It lists the dishes you can order. The API is like a waiter who picks the order. The chef (backend) prepares your meal based on your request.

8 elements, To start navigating the group contents, press Enter

Client

API

Back-end

## Slide 3

5.0s
Animate
Position

Imagine you’re at a restaurant. You tell the waiter what you want,
and they bring it back to you from the kitchen.

HOW API WORKS ?

When you use an API, you send a request to the server (back-end), and
it sends back a response with the requested information.

Make the Order

Take the Order

Bringing from
Kitchen

Delivery of
Order

Waiter (API)

Customer (User)

Chef (Back-end)

2 elements, To start navigating the group contents, press Enter

How API Works ?

When you use an API, you send a request to the server (back-end), and it sends back a response with the requested information.

Imagine you’re at a restaurant. You tell the waiter what you want, and they bring it back to you from the kitchen.

Make the Order

Delivery of Order

Customer (User)

Waiter (API)

Take the Order

Bringing from Kitchen

Chef (Back-end)

## Slide 4

9.0s
Animate
Position

TYPES OF API

API

API

REST

SOAP

API

There are different types of APIs, with REST
and SOAP being the most common

2 elements, To start navigating the group contents, press Enter

Types of API

There are different types of APIs, with REST and SOAP being the most common

6 elements, To start navigating the group contents, press Enter

REST

API

SOAP

API

## Slide 5

9.0s
Animate
Position

WHAT IS A REST API ?

REST (Representational State Transfer) is an
architectural style for designing networked
applications. It uses HTTP requests to perform
CRUD (Create, Read, Update, Delete) operations.

CREATE

Request

response

HTTP

request

DELETE

READ

UPDATES

A REST API is like a vending machine. You put in a
request (choose a snack), and it gives you what
you asked for (dispenses the snack).

2 elements, To start navigating the group contents, press Enter

What is a REST API ?

REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP requests to perform CRUD (Create, Read, Update, Delete) operations.

5 elements, To start navigating the group contents, press Enter

Request

response

A REST API is like a vending machine. You put in a request (choose a snack), and it gives you what you asked for (dispenses the snack).

HTTP

request

4 elements, To start navigating the group contents, press Enter

CREATE

READ

UPDATES

DELETE

## Slide 6

5.0s
Animate
Position

KEY FEATURES OF REST API 

Stateless: Each request from a client to a server is
independent. The server doesn’t remember past
requests, making REST simpler and scalable.

Lightweight: REST APIs are easy to implement and
usually send data in lightweight formats like JSON or
XML, making them faster and more efficient.

Uses standard HTTP methods: REST relies on standard
HTTP methods like GET, POST, PUT, and DELETE to
perform operations, which makes it easy to work with.

Key features of REST API

Stateless: Each request from a client to a server is independent. The server doesn’t remember past requests, making REST simpler and scalable.

Lightweight: REST APIs are easy to implement and usually send data in lightweight formats like JSON or XML, making them faster and more efficient.

Uses standard HTTP methods: REST relies on standard HTTP methods like GET, POST, PUT, and DELETE to perform operations, which makes it easy to work with.

## Slide 7

5.0s
Animate
Position

KEY FEATURES OF REST API 

Scalable and flexible: REST is well-suited for handling
large volumes of data and requests, making it popular
for modern web applications.

Readable URLs: REST uses human-readable URLs (like
/users/123) to access resources, making it easy to
understand and work with.

Supports multiple data formats: Although JSON is the
most common format, REST can handle other
formats, such as XML.

Key features of REST API

Scalable and flexible: REST is well-suited for handling large volumes of data and requests, making it popular for modern web applications.

Readable URLs: REST uses human-readable URLs (like /users/123) to access resources, making it easy to understand and work with.

Supports multiple data formats: Although JSON is the most common format, REST can handle other formats, such as XML.

## Slide 8

5.0s
Animate
Position

EXAMPLE OF REST API 

HTTP REQUEST




POST https://api.example.com/users




{

  "UserId": 123

}

HTTP RESPONSE




HTTP/1.1 200 OK

Content-Type: application/json

{

  "UserId": 123,

  "FirstName": "John",

  "LastName": "Doe",

  "Email": "john.doe@example.com"

}

Example of REST API

HTTP Request

POST https://api.example.com/users

{

"UserId": 123

}

HTTP Response

HTTP/1.1 200 OK

Content-Type: application/json

{

"UserId": 123,

"FirstName": "John",

"LastName": "Doe",

"Email": "john.doe@example.com"

}

## Slide 9

5.0s
Animate
Position

WHAT IS A SOAP API ?

SOAP (Simple Object Access Protocol) is a protocol for exchanging structured
information in web services. It relies on XML structure and is more rigid than REST.

A SOAP API is like a formal restaurant with specific rules. You have to follow a strict
process to place your order, and the chef prepares your meal exactly as requested.

Formal dining experience 

Casual dining experience 

REST

SOAP

2 elements, To start navigating the group contents, press Enter

What is a SOAP API ?

SOAP (Simple Object Access Protocol) is a protocol for exchanging structured information in web services. It relies on XML structure and is more rigid than REST.

7 elements, To start navigating the group contents, press Enter

SOAP

Formal dining experience

REST

Casual dining experience

A SOAP API is like a formal restaurant with specific rules. You have to follow a strict process to place your order, and the chef prepares your meal exactly as requested.

## Slide 10

5.0s
Animate
Position

KEY FEATURES OF SOAP API 

Protocol-based: SOAP is a strict protocol, meaning it follows a set
of rules for sending and receiving messages between systems. It’s
more structured compared to REST.

XML Format: All data in SOAP is sent in XML format, which
makes it a bit heavier, but also very standardized.

Supports multiple protocols: SOAP can work over a variety of
protocols like HTTP, SMTP, and more, making it versatile in
different communication environments.

Key features of SOAP API

Protocol-based: SOAP is a strict protocol, meaning it follows a set of rules for sending and receiving messages between systems. It’s more structured compared to REST.

XML Format: All data in SOAP is sent in XML format, which makes it a bit heavier, but also very standardized.

Supports multiple protocols: SOAP can work over a variety of protocols like HTTP, SMTP, and more, making it versatile in different communication environments.

## Slide 11

5.0s
Animate
Position

KEY FEATURES OF SOAP API 

Built-in security: SOAP has built-in support for security features
like encryption and authentication through WS-Security, which
makes it ideal for sensitive data exchanges.

Error handling: SOAP has a standardized way of handling
errors, which makes troubleshooting and debugging easier.

Stateful operations: SOAP can maintain the state of an
operation, meaning it can keep track of previous interactions,
making it suitable for complex, multi-step transactions.

Key features of SOAP API

Built-in security: SOAP has built-in support for security features like encryption and authentication through WS-Security, which makes it ideal for sensitive data exchanges.

Error handling: SOAP has a standardized way of handling errors, which makes troubleshooting and debugging easier.

Stateful operations: SOAP can maintain the state of an operation, meaning it can keep track of previous interactions, making it suitable for complex, multi-step transactions.

## Slide 12

5.0s
Animate
Position

EXAMPLE OF SOAP API 

HTTP REQUEST

POST https://api.example.com/users




<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:web="http://webservice.example.com/">

   <soapenv:Header/>

   <soapenv:Body>

      <web:GetUser>

         <web:UserId>123</web:UserId>

      </web:GetUser>

   </soapenv:Body>

</soapenv:Envelope>




HTTP Request

2 elements, To start navigating the group contents, press Enter

Example of Soap API

POST https://api.example.com/users

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.example.com/">

<soapenv:Header/>

<soapenv:Body>

<web:GetUser>

<web:UserId>123</web:UserId>

</web:GetUser>

</soapenv:Body>

</soapenv:Envelope>

## Slide 13

5.0s
Animate
Position

EXAMPLE OF SOAP API 

HTTP/1.1 200 OK

Content-Type: text/xml; charset=utf-8




<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">

   <soapenv:Header/>

   <soapenv:Body>

      <web:GetUserResponse xmlns:web="http://webservice.example.com/">

         <web:User>

            <web:UserId>123</web:UserId>

            <web:FirstName>John</web:FirstName>

            <web:LastName>Doe</web:LastName>

            <web:Email>john.doe@example.com</web:Email>

         </web:User>

      </web:GetUserResponse>

   </soapenv:Body>

</soapenv:Envelope>

HTTP RESPONSE

2 elements, To start navigating the group contents, press Enter

Example of Soap API

HTTP Response

HTTP/1.1 200 OK

Content-Type: text/xml; charset=utf-8

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">

<soapenv:Header/>

<soapenv:Body>

<web:GetUserResponse xmlns:web="http://webservice.example.com/">

<web:User>

<web:UserId>123</web:UserId>

<web:FirstName>John</web:FirstName>

<web:LastName>Doe</web:LastName>

<web:Email>john.doe@example.com</web:Email>

</web:User>

</web:GetUserResponse>

</soapenv:Body>

</soapenv:Envelope>
