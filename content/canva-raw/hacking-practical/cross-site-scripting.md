# Cross-Site Scripting

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGbgwDHQD8/yZ1H-cCNE3d7T6xiWBXa7w/edit_

---

## Slide 1

CROSS-SITE SCRIPTING

Cross-Site Scripting

## Slide 2

5.0s
Animate
Position

DOM Based XSS

CROSS-SITE SCRIPTING (XSS)

TYPES OF CROSS-SITE SCRIPTING

Cross-Site Scripting (XSS) is a common web application vulnerability that
allows attackers to inject malicious scripts into web pages viewed by
other users.

There are various types of Cross-Site Scripting, but are broadly classified
into the following types:

Reflected XSS

Stored XSS

Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) is a common web application vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.

Types of Cross-Site Scripting

There are various types of Cross-Site Scripting, but are broadly classified into the following types:

Reflected XSS

2 elements, To start navigating the group contents, press Enter

DOM Based XSS

Stored XSS

## Slide 3

7.1s
Animate
Position

Reflected XSS occurs when an application immediately reflects
untrusted data from the request back to the browser without
proper sanitization or encoding.

REFLECTED XSS

ATTACKER

WEBSITE USER

WEBSITE

Reflected XSS

Reflected XSS occurs when an application immediately reflects untrusted data from the request back to the browser without proper sanitization or encoding.

WEBSITE

ATTACKER

WEBSITE USER

## Slide 4

5.0s
Animate
Position

http://example.com/search?query=alert('XSS')

EXAMPLE

An attacker crafts a malicious URL with a script embedded in the query parameter.
When the victim clicks the link, the script executes in their browser.

If the application includes the query parameter value directly in the response without
sanitization, the script runs in the victim’s browser, allowing the attacker to steal
sensitive information or perform malicious actions.

ACTION

ACTION

REFLECTED XSS

Impact: This type of XSS requires the victim to click a malicious link or interact with the
application in a specific way. It is often used in phishing attacks.

example

Reflected XSS

An attacker crafts a malicious URL with a script embedded in the query parameter. When the victim clicks the link, the script executes in their browser.

action

http://example.com/search?query=alert('XSS')

If the application includes the query parameter value directly in the response without sanitization, the script runs in the victim’s browser, allowing the attacker to steal sensitive information or perform malicious actions.

Impact: This type of XSS requires the victim to click a malicious link or interact with the application in a specific way. It is often used in phishing attacks.

## Slide 5

8.0s
Animate
Position

Stored XSS occurs when malicious input is permanently stored on the target
server (e.g., in a database, logs, or user profile). When another user views the
affected page, the script is automatically executed in their browser.

STORED XSS

ATTACKER

WEB REQUEST

Bad Script

SERVER

stored XSS

Stored XSS occurs when malicious input is permanently stored on the target server (e.g., in a database, logs, or user profile). When another user views the affected page, the script is automatically executed in their browser.

ATTACKER

SERVER

Bad Script

WEB REQUEST

## Slide 6

5.0s
Animate
Position

Hello everyone! <script>alert('XSS')</script>

EXAMPLE

A user submits a form with malicious script content that is later rendered by the
application without sanitization.

A comment field allows users to input text, but the application does not sanitize input.
Whenever another user visits the page with this comment, the script will execute.

ACTION

ACTION

Impact: Stored XSS can affect multiple users and is considered more severe since the
payload persists in the system.

STORED XSS

stored XSS

example

A user submits a form with malicious script content that is later rendered by the application without sanitization.

action

Hello everyone! <script>alert('XSS')</script>

A comment field allows users to input text, but the application does not sanitize input. Whenever another user visits the page with this comment, the script will execute.

Impact: Stored XSS can affect multiple users and is considered more severe since the payload persists in the system.

## Slide 7

7.1s
Animate
Position

DOM-based XSS occurs when the vulnerability exists in the client-side
JavaScript, which modifies the Document Object Model (DOM) directly using
unsanitized user input. Unlike other types of XSS, the server does not reflect
or store malicious content.

DOM-BASED XSS

ATTACKER

WEBSITE USER

WEBSITE

Malicious URL

DOM-Based XSS

DOM-based XSS occurs when the vulnerability exists in the client-side JavaScript, which modifies the Document Object Model (DOM) directly using unsanitized user input. Unlike other types of XSS, the server does not reflect or store malicious content.

WEBSITE

ATTACKER

Malicious URL

WEBSITE USER

## Slide 8

5.0s
Animate
Position

document.body.innerHTML = 'Welcome, ' + location.search.substring(6);

http://example.com/welcome.html?name=alert('XSS')

EXAMPLE

A script on the page dynamically updates content based on URL parameters
without proper sanitization.

An attacker crafts a URL:

Impact: Since this attack happens entirely on the client-side, it does not involve server
responses but can still result in significant damage.

DOM-BASED XSS

ACTION

ACTION

dom-based XSS

example

A script on the page dynamically updates content based on URL parameters without proper sanitization.

action

document.body.innerHTML = 'Welcome, ' + location.search.substring(6);

An attacker crafts a URL:

http://example.com/welcome.html?name=alert('XSS')

Impact: Since this attack happens entirely on the client-side, it does not involve server responses but can still result in significant damage.

## Slide 9

5.0s
Animate
Position

Type

	

Source of Input

	

Persistence

	

Requires User
Action?

	

Risk Level




Reflected XSS

	

HTTP Request

	

No

	

Yes

	

High




Stored XSS

	

Database/Logs

	

Yes

	

No

	

Critical




DOM-Based XSS

	

Client-Side Code

	

No

	

Yes

	

High

SUMMARY

summary

Type

	

Source of Input

	

Persistence

	

Requires User Action?

	

Risk Level




Reflected XSS

	

HTTP Request

	

No

	

Yes

	

High




Stored XSS

	

Database/Logs

	

Yes

	

No

	

Critical




DOM-Based XSS

	

Client-Side Code

	

No

	

Yes

	

High
