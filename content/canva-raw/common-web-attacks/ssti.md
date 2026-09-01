# SSTI

_Category: Common Web Attacks — Source: https://www.canva.com/design/DAGi0CPxIE8/_43vy4u69W9iIh1GPmyQjQ/edit_

---

## Slide 1

SERVER SIDE
TEMPLATE INJECTION

Server Side Template Injection

## Slide 2

5.0s
Animate
Position

SERVER SIDE TEMPLATE INJECTION

Server-side template injection is when an attacker can use native
template syntax to inject a malicious payload into a template, which is
then executed server-side.

{{7*7}}

49

Attacker enters template code:
{{7*7}} in an input field.

Template engine executes the
injected code on the server.

Executed result is returned,
revealing sensitive information.

Server Side Template Injection

Server-side template injection is when an attacker can use native template syntax to inject a malicious payload into a template, which is then executed server-side.

{{7*7}}

49

Attacker enters template code: {{7*7}} in an input field.

Template engine executes the injected code on the server.

Executed result is returned, revealing sensitive information.

## Slide 3

6.5s
Animate
Position

Template engines are designed to generate web pages by
combining fixed templates with volatile data.

SERVER SIDE TEMPLATE INJECTION

Server Side Template Injection

Template engines are designed to generate web pages by combining fixed templates with volatile data.

## Slide 4

8.0s
Animate
Position

Server-side template injection attacks can occur when user input is concatenated
directly into a template, rather than passed in as data.

SERVER SIDE TEMPLATE INJECTION

User submits input containing
template code directly

Server concatenates input
into the template unsafely

Server Side Template Injection

Server-side template injection attacks can occur when user input is concatenated directly into a template, rather than passed in as data.

User submits input containing template code directly

Server concatenates input into the template unsafely

## Slide 5

5.0s
Animate
Position

As the name suggests, server-side template injection payloads are delivered and
evaluated server-side, potentially making them much more dangerous than a typical
client-side template injection.

SERVER SIDE TEMPLATE INJECTION

Server Side Template Injection

As the name suggests, server-side template injection payloads are delivered and evaluated server-side, potentially making them much more dangerous than a typical client-side template injection.

## Slide 6

6.0s
Animate
Position

As the name suggests, server-side template injection payloads are delivered and
evaluated server-side, potentially making them much more dangerous than a typical
client-side template injection.

SERVER SIDE TEMPLATE INJECTION

Executed in the browser, affects only the client.

Less Dangerous

More Dangerous

Executed on the server, can lead to remote 

code execution.

Server Side Template Injection

As the name suggests, server-side template injection payloads are delivered and evaluated server-side, potentially making them much more dangerous than a typical client-side template injection.

Executed in the browser, affects only the client.

Executed on the server, can lead to remote

code execution.

Less Dangerous

More Dangerous

## Slide 7

5.0s
Animate
Position

Server-Side Template Injection (SSTI) is like handing someone a blank check and asking
them to fill it out — but instead of just writing their name, they add extra instructions
to take all your money.

SIMPLE TERMS

Simple Terms

Server-Side Template Injection (SSTI) is like handing someone a blank check and asking them to fill it out — but instead of just writing their name, they add extra instructions to take all your money.

## Slide 8

5.4s
Animate
Position

A template engine is a tool that allows you to dynamically generate HTML, XML, or
other text-based formats by combining static content with dynamic data.

TEMPLATE ENGINE

Template engine

A template engine is a tool that allows you to dynamically generate HTML, XML, or other text-based formats by combining static content with dynamic data.

## Slide 9

5.4s
Animate
Position

IMPORTANCE OF SSTI SECURITY

Remote Code Execution (RCE)

System Compromise

Data Exposure

Attackers can execute
arbitrary commands on
the server, potentially
taking full control.

Unauthorized access to
sensitive data stored on
the server.

Installation of malware or
creation of backdoors for
persistent access.

Importance of SSTI Security

Remote Code Execution (RCE)

Data Exposure

System Compromise

Attackers can execute arbitrary commands on the server, potentially taking full control.

Unauthorized access to sensitive data stored on the server.

Installation of malware or creation of backdoors for persistent access.

## Slide 10

8.0s
Animate
Position

HOW SSTI VULNERABILITIES WORK

User Input Injection

Code Execution

Template Rendering

An attacker provides
specially crafted input
containing template
syntax.

The vulnerable application
processes this input within
a template engine.

The server executes the
injected template code,
allowing the attacker to
perform unauthorized
actions.

How SSTI Vulnerabilities Work

User Input Injection

Template Rendering

Code Execution

An attacker provides specially crafted input containing template syntax.

The vulnerable application processes this input within a template engine.

The server executes the injected template code, allowing the attacker to perform unauthorized actions.

## Slide 11

5.0s
Animate
Position

Consider a web application that uses the Jinja2 template engine in Python and
renders user input without proper sanitization

EXAMPLE

from flask import Flask, request, render_template_string




app = Flask(__name__)




@app.route('/')

def index():

    name = request.args.get('name', 'World')

    template = f'Hello {name}!'

    return render_template_string(template)

Example

Consider a web application that uses the Jinja2 template engine in Python and renders user input without proper sanitization

from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/')

def index():

name = request.args.get('name', 'World')

template = f'Hello {name}!'

return render_template_string(template)

## Slide 12

5.4s
Animate
Position

This indicates that the input is being evaluated as code,
confirming an SSTI vulnerability.

An attacker could manipulate
the URL as follows

If the server does not
properly sanitize the input, it
would render Hello 49!

ATTACK SCENARIO

http://example.com/?name={{7*7}}

Hello 49!

Hello 49!

Attack Scenario

Hello 49!

http://example.com/?name={{7*7}}

Hello 49!

If the server does not properly sanitize the input, it would render Hello 49!

An attacker could manipulate the URL as follows

This indicates that the input is being evaluated as code, confirming an SSTI vulnerability.

## Slide 13

5.0s
Animate
Position

Here's a simple Python code snippet using the Jinja2 template engine that
demonstrates an SSTI vulnerability

EXAMPLE 1: VULNERABLE CODE SNIPPET

PRACTICA
L

from flask import Flask, request, render_template_string




app = Flask(__name__)




@app.route('/')

def index():

    user_input = request.args.get('name', '')

    template = f'Hello {user_input}!'

    return render_template_string(template)

Practical

Example 1: Vulnerable Code Snippet

Here's a simple Python code snippet using the Jinja2 template engine that demonstrates an SSTI vulnerability

from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/')

def index():

user_input = request.args.get('name', '')

template = f'Hello {user_input}!'

return render_template_string(template)

## Slide 14

5.0s
Animate
Position

It creates a template using that input like this:

EXPLANATION

In this example, the application takes a user input from the URL parameter name.

The template is then processed using render_template_string(), which allows Flask to
interpret the input as a template.

template = f'Hello {name}!'

Explanation

In this example, the application takes a user input from the URL parameter name.

It creates a template using that input like this:

template = f'Hello {name}!'

The template is then processed using render_template_string(), which allows Flask to interpret the input as a template.

## Slide 15

5.0s
Animate
Position

EXAMPLE 2: EXPLOITING SSTI

http://example.com/?name={{7*7}}

http://localhost:5000/?name=
{{config.__class__.__init__.__globals__['os'].popen('whoami').read()}}

Hello 49!

Hello root!

An attacker can exploit the above vulnerability by crafting a URL like this:

If successful, this request would return:

This confirms that the server is evaluating user input as code, indicating
an SSTI vulnerability.

The app could execute the system command and display:




Example 2: Exploiting SSTI

An attacker can exploit the above vulnerability by crafting a URL like this:

http://example.com/?name={{7*7}}

If successful, this request would return:

Hello 49!

This confirms that the server is evaluating user input as code, indicating an SSTI vulnerability.

The app could execute the system command and display:

http://localhost:5000/?name={{config.__class__.__init__.__globals__['os'].popen('whoami').read()}}

Hello root!

## Slide 16

5.0s
Animate
Position

Input Validation and Sanitization

Avoid Direct User Input in Templates

Utilize Template Engine Safeguards

Principle of Least Privilege

Use security features in the template engine to
block dangerous commands.




MITIGATION STRATEGIES

Mitigation Strategies

Input Validation and Sanitization

Avoid Direct User Input in Templates

Utilize Template Engine Safeguards

Principle of Least Privilege

Use security features in the template engine to block dangerous commands.

## Slide 17

6.0s
Animate
Position

Server-side template Injection vulnerabilities pose significant risks in web applications
if not properly managed. By understanding how these vulnerabilities arise and
implementing robust security measures, developers can effectively protect their
applications from potential exploits.

CONCLUSION

Conclusion

Server-side template Injection vulnerabilities pose significant risks in web applications if not properly managed. By understanding how these vulnerabilities arise and implementing robust security measures, developers can effectively protect their applications from potential exploits.

## Slide 18

5.0s
Animate
Position

NEW TERMS

A component used in web
applications to combine
templates with data to generate
dynamic web pages.

The ability for an attacker to
execute arbitrary code on a
remote server, potentially taking
full control.

Template Engine

Remote Code Execution (RCE)

New Terms

Template Engine

Remote Code Execution (RCE)

A component used in web applications to combine templates with data to generate dynamic web pages.

The ability for an attacker to execute arbitrary code on a remote server, potentially taking full control.

## Slide 19

5.0s
Animate
Position

The process of cleaning user
input to remove or neutralize
potentially harmful elements.

A security concept where users and
applications are granted the
minimum levels of access necessary
to perform their functions.

Input Sanitization

Principle of Least Privilege

NEW TERMS

New Terms

Input Sanitization

Principle of Least Privilege

The process of cleaning user input to remove or neutralize potentially harmful elements.

A security concept where users and applications are granted the minimum levels of access necessary to perform their functions.
