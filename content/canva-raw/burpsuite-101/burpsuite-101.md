# Burpsuite 101

_Category: Burpsuite 101 — Source: https://www.canva.com/design/DAGmQQZS6bM/Ut5__-zbnOHsoQZPpOnqTA/edit_

---

## Slide 1

BURP SUITE 101

Burp Suite 101

## Slide 2

BURP SUITE 101

In essence, Burp Suite is a Java-based framework designed to serve as a
comprehensive solution for conducting application penetration testing. It has become
the industry standard tool for hands-on security assessments of web and mobile
applications, including those that rely on application programming interfaces (APIs).

Simply put, Burp Suite captures and enables manipulation of all the HTTP/HTTPS
traffic between a browser and a web server.

Burp Suite 101

In essence, Burp Suite is a Java-based framework designed to serve as a comprehensive solution for conducting application penetration testing. It has become the industry standard tool for hands-on security assessments of web and mobile applications, including those that rely on application programming interfaces (APIs).

Simply put, Burp Suite captures and enables manipulation of all the HTTP/HTTPS traffic between a browser and a web server.

## Slide 3

The Burp Proxy is the most renowned aspect of Burp Suite. It enables the interception
and modification of requests and responses while interacting with the applications. 

FEATURES

PROXY

Features

Proxy

The Burp Proxy is the most renowned aspect of Burp Suite. It enables the interception and modification of requests and responses while interacting with the applications.

## Slide 4

In the image above, you can see the exact request sent by the browser,and the
response it received along with the length of the response and status code.

In the image above, you can see the exact request sent by the browser,and the response it received along with the length of the response and status code.

## Slide 5

Another well-known feature. The repeater allows for the capture, modification, and
resending of the same request multiple times. This functionality is particularly useful
when crafting payloads through trial and error (e.g., in SQLi - Structured Query
Language Injection) or testing the functionality of an endpoint for vulnerabilities. 

REPEATER

MODIFICATION

CAPTURE

RESENDING

Repeater

Another well-known feature. The repeater allows for the capture, modification, and resending of the same request multiple times. This functionality is particularly useful when crafting payloads through trial and error (e.g., in SQLi - Structured Query Language Injection) or testing the functionality of an endpoint for vulnerabilities.

capture

modification

resending

## Slide 6

In the image above, we have a productId in the GET request, we can send this request
to the repeater and enumerate through all the valid productId's.

In the image above, we have a productId in the GET request, we can send this request to the repeater and enumerate through all the valid productId's.

## Slide 7

Despite rate limitations in Burp Suite Community, Intruder allows for spraying
endpoints with requests. It is commonly utilized for brute-force attacks or

 fuzzing endpoints.

INTRUDER

SPRAYS REQUESTS TO
MULTIPLE ENDPOINTS

OR TO TEST FOR ENDPOINT
WEAKNESSES

USED FOR BRUTE-FORCE
LOGIN ATTEMPTS

Intruder

Despite rate limitations in Burp Suite Community, Intruder allows for spraying endpoints with requests. It is commonly utilized for brute-force attacks or

fuzzing endpoints.

Used for brute-force login attempts

Sprays requests to multiple endpoints

Or to test for endpoint weaknesses

## Slide 8

In the example above, we have a web application that tells us if we entered a wrong
username, We can use this information to create a list of usernames and send them
with intruder to find valid usernames. The Atlas user returned a response with length
3250 which is different from other responses, so it's probably a valid username. 

You can also check the response to ensure that it's correct.

In the example above, we have a web application that tells us if we entered a wrong username, We can use this information to create a list of usernames and send them with intruder to find valid usernames. The Atlas user returned a response with length 3250 which is different from other responses, so it's probably a valid username.

You can also check the response to ensure that it's correct.

## Slide 9

DECODER

The Decoder offers a valuable service for data transformation. It can decode
captured information or encode payloads before sending them to the target. While
alternative services exist for this purpose, leveraging Decoder within Burp Suite can
be highly efficient.

Decoder

The Decoder offers a valuable service for data transformation. It can decode captured information or encode payloads before sending them to the target. While alternative services exist for this purpose, leveraging Decoder within Burp Suite can be highly efficient.

## Slide 10

In the example below, I've URL encoded a simple Javascript payload, and
then decoded it back.

In the example below, I've URL encoded a simple Javascript payload, and then decoded it back.

## Slide 11

As the name suggests, Comparer enables the comparison of two pieces of data at
either the word or byte level. While not exclusive to Burp Suite, the ability to send
potentially large data segments directly to a comparison tool with a single keyboard
shortcut significantly accelerates the process. 

COMPARER

Comparer

As the name suggests, Comparer enables the comparison of two pieces of data at either the word or byte level. While not exclusive to Burp Suite, the ability to send potentially large data segments directly to a comparison tool with a single keyboard shortcut significantly accelerates the process.

## Slide 12

Below is a example that shows you how the comparer highlights the difference
between different responses.

Below is a example that shows you how the comparer highlights the difference between different responses.

## Slide 13

A Sequencer is typically employed when assessing the randomness of tokens, such as
session cookie values or other supposedly randomly generated data. If the algorithm
used for generating these values lacks secure randomness, 

it can expose avenues for devastating attacks. 

SEQUENCER

RANDOM COOKIES OR DATAS

Sequencer

A Sequencer is typically employed when assessing the randomness of tokens, such as session cookie values or other supposedly randomly generated data. If the algorithm used for generating these values lacks secure randomness,

it can expose avenues for devastating attacks.

random cookies or datas
