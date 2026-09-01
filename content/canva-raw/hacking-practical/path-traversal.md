# Path Traversal

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGdMf3b1eU/3lghBaTIhWbF3vGUf6A2ig/edit_

---

## Slide 1

PATH TRAVERSAL

Path Traversal

## Slide 2

8.0s
Animate
Position

PATH TRAVERSAL VULNERABILITIES IN 

WEB APPLICATIONS

Path traversal vulnerabilities are a type of security flaw that allows an attacker to access files and directories stored outside the intended directory on a web server. This vulnerability occurs when an application uses unvalidated user input to construct file paths, which might be later used to read a file. Attackers can exploit this by manipulating the file paths to gain unauthorized access to sensitive files or directories, potentially leading to access of file system, which can potentially result in data breaches or system compromise.

Path Traversal Vulnerabilities in

Web Applications

Path traversal vulnerabilities are a type of security flaw that allows an attacker to access files and directories stored outside the intended directory on a web server. This vulnerability occurs when an application uses unvalidated user input to construct file paths, which might be later used to read a file. Attackers can exploit this by manipulating the file paths to gain unauthorized access to sensitive files or directories, potentially leading to access of file system, which can potentially result in data breaches or system compromise.

## Slide 3

5.0s
Animate
Position

PATH TRAVERSAL

The security of file handling in web applications is critical for several reasons:

UNAUTHORIZED ACCESS 

DATA BREACHES

Attackers can read sensitive files such as configuration files,
password files, or even source code.

Accessing sensitive information can lead to data leaks
and compromiseuser privacy.

Path Traversal

The security of file handling in web applications is critical for several reasons:

Unauthorized Access

Attackers can read sensitive files such as configuration files, password files, or even source code.

Data Breaches

Accessing sensitive information can lead to data leaks and compromiseuser privacy.

## Slide 4

5.0s
Animate
Position

PATH TRAVERSAL

The security of file handling in web applications is critical for several reasons:

SYSTEM INTEGRITY COMPROMISE

ESCALATION OF PRIVILEGES

Attackers may modify or delete critical files, affecting the
integrity and availability of the application.

Gaining access to sensitive files may provide attackers with the
information needed to escalate their privileges within the system.

Path Traversal

The security of file handling in web applications is critical for several reasons:

System Integrity Compromise

Attackers may modify or delete critical files, affecting the integrity and availability of the application.

Escalation of Privileges

Gaining access to sensitive files may provide attackers with the information needed to escalate their privileges within the system.

## Slide 5

5.0s
Animate
Position

HOW PATH TRAVERSAL VULNERABILITIES WORK

Path traversal attacks typically involve the following steps:

USER INPUT MANIPULATION

FILE PATH CONSTRUCTION

UNAUTHORIZED FILE ACCESS

An attacker provides
specially crafted input
that includes directory
traversal sequences
(e.g., ../).

The vulnerable
application constructs
a file path using this
unvalidated user input.

The server processes the
manipulated file path,
allowing the attacker to
access unintended files or
directories.

How Path Traversal Vulnerabilities Work

Path traversal attacks typically involve the following steps:

User Input Manipulation

File Path Construction

Unauthorized File Access

An attacker provides specially crafted input that includes directory traversal sequences (e.g., ../).

The vulnerable application constructs a file path using this unvalidated user input.

The server processes the manipulated file path, allowing the attacker to access unintended files or directories.

## Slide 6

5.7s
Animate
Position

EXAMPLE OF PATH TRAVERSAL ATTACK

Consider a web application that allows users to view their profile
pictures by specifying a filename in the URL

<?PHP

$FILENAME = $_GET['FILE'];

$PATH = "/UPLOADS/" . $FILENAME;

READFILE($PATH);

?>

Example of Path Traversal Attack

Consider a web application that allows users to view their profile pictures by specifying a filename in the URL

<?php

$filename = $_GET['file'];

$path = "/uploads/" . $filename;

readfile($path);

?>

## Slide 7

5.4s
Animate
Position

THIS PHP PERFORMS THE FOLLOWING 

File Retrieval

The file name is taken directly from user input
($_GET['file]). 

File Path Construction The provided file name
is appended to the /uploads/ directory. 

File Serving

The file at the constructed path is served using
readfile().

This PHP performs the following

File Retrieval

The file name is taken directly from user input ($_GET['file]).

File Path Construction The provided file name is appended to the /uploads/ directory.

File Serving

The file at the constructed path is served using readfile().

## Slide 8

5.0s
Animate
Position

If the server fails to properly validate user input, it could read and display the
contents of /etc/passwd. This is because the user-supplied input is appended to
/uploads/, resulting in a path like /uploads/../../../../../etc/passwd. The ../ sequences
traverse back five directories from /uploads/, ultimately potentially reaching
the root of the file system, allowing access to /etc/passwd.

ATTACK SCENARIO

An attacker could manipulate the URL:

http://example.com/view.php?file=../../../../../etc/passwd

Attack Scenario

An attacker could manipulate the URL:

http://example.com/view.php?file=../../../../../etc/passwd

If the server fails to properly validate user input, it could read and display the contents of /etc/passwd. This is because the user-supplied input is appended to /uploads/, resulting in a path like /uploads/../../../../../etc/passwd. The ../ sequences traverse back five directories from /uploads/, ultimately potentially reaching the root of the file system, allowing access to /etc/passwd.

## Slide 9

5.0s
Animate
Position

In this example, the application constructs a file path using 

user input without validation.




An attacker could exploit this by providing input like ../../secret.txt, allowing them to
access files outside of the intended directory.

EXAMPLE 1: VULNERABLE CODE SNIPPET

Here’s a simple PHP code snippet that demonstrates a path traversal vulnerability:

Explanation

<?PHP

$FILENAME = $_GET['FILE'];

$PATH = "/VAR/WWW/HTML/UPLOADS/" . $FILENAME; // UNSAFE CONCATENATION

READFILE($PATH); // READS AND OUTPUTS THE FILE

?>

Example 1: Vulnerable Code Snippet

Here’s a simple PHP code snippet that demonstrates a path traversal vulnerability:

<?php

$filename = $_GET['file'];

$path = "/var/www/html/uploads/" . $filename; // Unsafe concatenation

readfile($path); // Reads and outputs the file

?>

Explanation

In this example, the application constructs a file path using

user input without validation.

An attacker could exploit this by providing input like ../../secret.txt, allowing them to access files outside of the intended directory.

## Slide 10

5.4s
Animate
Position

EXAMPLE 2: EXPLOITING PATH TRAVERSAL

If successful, this request would return the contents of /etc/passwd, revealing
sensitive information about users on the system.

An attacker can exploit the above vulnerability by crafting a URL like this:

http://example.com/view.php?file=../../../../../etc/passwd

Example 2: Exploiting Path Traversal

An attacker can exploit the above vulnerability by crafting a URL like this:

http://example.com/view.php?file=../../../../../etc/passwd

If successful, this request would return the contents of /etc/passwd, revealing sensitive information about users on the system.

## Slide 11

5.0s
Animate
Position

Restricting File Paths

Ensure that file paths are
restricted to a specific
directory. Use functions
that resolve absolute paths
and check if they reside
within allowed directories.

MITIGATION STRATEGIES

INPUT VALIDATION AND SANITIZATION

Whitelisting Valid Inputs

Use a whitelist approach
to validate user inputs.
Only allow specific
filenames or patterns
that are known to be safe.

Normalization of Input
Normalize user inputs to
remove any potentially
harmful characters or
sequences before
processing them.

To protect against path traversal vulnerabilities, developers should implement several best practices:

Mitigation Strategies

To protect against path traversal vulnerabilities, developers should implement several best practices:

Input Validation and Sanitization

Whitelisting Valid Inputs

Use a whitelist approach to validate user inputs. Only allow specific filenames or patterns that are known to be safe.

Normalization of Input Normalize user inputs to remove any potentially harmful characters or sequences before processing them.

Restricting File Paths

Ensure that file paths are restricted to a specific directory. Use functions that resolve absolute paths and check if they reside within allowed directories.

## Slide 12

5.0s
Animate
Position

PRINCIPLE OF LEAST PRIVILEGE

LIMIT APPLICATION PERMISSIONS

FILE PERMISSIONS

Run applications with minimal privileges necessary for their operation. This limits potential damage if an attack occurs.

Set appropriate permissions on files and directories to restrict unauthorized access.

Principle of Least Privilege

Limit Application Permissions

Run applications with minimal privileges necessary for their operation. This limits potential damage if an attack occurs.

File Permissions

Set appropriate permissions on files and directories to restrict unauthorized access.

## Slide 13

8.0s
Animate
Position

Path traversal vulnerabilities pose
significant risks in web applications if not
properly managed. By understanding 

how these vulnerabilities arise and
implementing robust security measures,
developers can effectively protect their
applications from potential exploits.

CONCLUSION

Path traversal vulnerabilities pose significant risks in web applications if not properly managed. By understanding

how these vulnerabilities arise and implementing robust security measures, developers can effectively protect their applications from potential exploits.

Conclusion
