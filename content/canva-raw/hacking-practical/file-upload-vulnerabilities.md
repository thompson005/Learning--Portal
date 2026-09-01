# File Upload Vulnerabilities

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGdAFv_eJ0/w2KdCWsPhnFnxN5g98RlSA/edit_

---

## Slide 1

FILE UPLOAD
VULNERABILITIES

File Upload Vulnerabilities

## Slide 2

6.0s
Animate
Position

FILE UPLOAD VULNERABILITIES IN
WEB APPLICATIONS

File upload vulnerabilities are a significant security concern in web applications. They occur when a web server allows users to upload files without implementing adequate validation checks on various aspects such as file name, type, contents, and size. This oversight can lead to severe security risks, including the ability for attackers to upload malicious files that can compromise the server or application.

File Upload Vulnerabilities in Web Applications

File upload vulnerabilities are a significant security concern in web applications. They occur when a web server allows users to upload files without implementing adequate validation checks on various aspects such as file name, type, contents, and size. This oversight can lead to severe security risks, including the ability for attackers to upload malicious files that can compromise the server or application.

## Slide 3

5.0s
Animate
Position

IMPORTANCE OF FILE UPLOAD SECURITY

The security of file uploads is critical for several reasons:

Depending on the backend system, attackers can exploit file upload functionalities to upload scripts that execute commands on the server, if not handled securely. This can lead to full control over the server.

By uploading large files, attackers can fill up server storage, making it unavailable for legitimate users.

REMOTE CODE EXECUTION

DENIAL OF SERVICE (DOS)

Importance of File Upload Security

The security of file uploads is critical for several reasons:

Remote Code Execution

Denial of Service (DoS)

Depending on the backend system, attackers can exploit file upload functionalities to upload scripts that execute commands on the server, if not handled securely. This can lead to full control over the server.

By uploading large files, attackers can fill up server storage, making it unavailable for legitimate users.

## Slide 4

5.0s
Animate
Position

This occurs when the server does

 not properly validate the type of file
being uploaded. Attackers can upload
executable scripts disguised as
harmless files.

Relying solely on file extensions
or MIME types without checking
the actual content can lead to
vulnerabilities.

UNRESTRICTED FILE TYPE UPLOAD

IMPROPER CONTENT VALIDATION

COMMON FILE UPLOAD VULNERABILITIES

Unrestricted File Type Upload

This occurs when the server does

not properly validate the type of file being uploaded. Attackers can upload executable scripts disguised as harmless files.

Common File Upload Vulnerabilities

Improper Content Validation

Relying solely on file extensions or MIME types without checking the actual content can lead to vulnerabilities.

## Slide 5

5.0s
Animate
Position

Attackers may exploit
inadequate validation of
filenames to overwrite
critical files or execute
unauthorized scripts.

If not properly restricted,
attackers can manipulate
file paths to upload files
outside designated
directories.

Failing to set limits on file
sizes can allow attackers
to perform DoS attacks
by uploading excessively
large files.

COMMON FILE UPLOAD VULNERABILITIES

FILENAME MANIPULATION

DIRECTORY TRAVERSAL

FILE SIZE BYPASS

Common File Upload Vulnerabilities

Filename Manipulation

Directory Traversal

File Size Bypass

Attackers may exploit inadequate validation of filenames to overwrite critical files or execute unauthorized scripts.

If not properly restricted, attackers can manipulate file paths to upload files outside designated directories.

Failing to set limits on file sizes can allow attackers to perform DoS attacks by uploading excessively large files.

## Slide 6

5.0s
Animate
Position

A web shell is a malicious script that allows an attacker to execute arbitrary commands
on a web server. If a web application allows unrestricted file uploads, an attacker could
upload web shells via those file upload feature. For example, if there is a PHP web
application, which allows users to upload any files, one could potentially upload a PHP file,
and force the server to execute the PHP code they uploaded by accessing it:

<?php 

    // A simple web shell that executes
commands

    echo system($_GET['command']); 

?>

EXAMPLE 1: WEB SHELL UPLOAD

MALICIOUS PHP WEB SHELL EXAMPLE:

PRACTICAL IMPLEMENTATION EXAMPLES

Practical Implementation Examples

A web shell is a malicious script that allows an attacker to execute arbitrary commands on a web server. If a web application allows unrestricted file uploads, an attacker could upload web shells via those file upload feature. For example, if there is a PHP web application, which allows users to upload any files, one could potentially upload a PHP file, and force the server to execute the PHP code they uploaded by accessing it:

Example 1: Web Shell Upload

<?php

// A simple web shell that executes commands

echo system($_GET['command']);

?>

Malicious PHP Web Shell Example:

## Slide 7

5.0s
Animate
Position

An attacker could upload this PHP script instead of an image (e.g., image.php).




Once uploaded, they could try to access it. For example, if the uploaded file is
stored in /uploads/ directory, then they could access it via the following URL
and pass commands through the query string:

If the server is misconfigured, the server would execute the command and will
return the output.

ATTACK SCENARIO

GET /uploads/image.php?command=id

Attack Scenario

An attacker could upload this PHP script instead of an image (e.g., image.php).

Once uploaded, they could try to access it. For example, if the uploaded file is stored in /uploads/ directory, then they could access it via the following URL and pass commands through the query string:

GET /uploads/image.php?command=id

If the server is misconfigured, the server would execute the command and will return the output.

## Slide 8

5.0s
Animate
Position

EXAMPLE 2: BYPASSING FILE TYPE VALIDATION

EXAMPLE OF EXPLOIT:

Sometimes developers implement basic validation by checking content type of the file
being uploaded. However, this method is often flawed and can be bypassed.

POST /upload HTTP/1.1

Content-Type: multipart/form-data; boundary=--boundary




--boundary

Content-Disposition: form-data; name="file";
filename="malicious.php"

Content-Type: image/jpeg




<?php echo system($_GET['cmd']); ?>

--boundary--

Example 2: Bypassing File Type Validation

Sometimes developers implement basic validation by checking content type of the file being uploaded. However, this method is often flawed and can be bypassed.

POST /upload HTTP/1.1

Content-Type: multipart/form-data; boundary=--boundary

--boundary

Content-Disposition: form-data; name="file"; filename="malicious.php"

Content-Type: image/jpeg

<?php echo system($_GET['cmd']); ?>

--boundary--

Example of Exploit:

## Slide 9

5.0s
Animate
Position



The attacker manipulates the Content-Type header and uploads a PHP script
disguised as an image.




If the server only checks the content-type and not the file extension, it may accept
this malicious file.

EXPLANATION

Explanation

The attacker manipulates the Content-Type header and uploads a PHP script disguised as an image.

If the server only checks the content-type and not the file extension, it may accept this malicious file.

## Slide 10

5.0s
Animate
Position

COMMON VALIDATION BYPASS TECHNIQUES

Sometimes developers implement basic
validation by extension of the file being
uploaded. However, this method is often
flawed and can be bypassed depending on
the server configuration.

Common Validation Bypass Techniques

Sometimes developers implement basic validation by extension of the file being uploaded. However, this method is often flawed and can be bypassed depending on the server configuration.

## Slide 11

5.0s
Animate
Position

EXTENSION OBFUSCATION METHODS

An attacker uploads
exploit.pHp, which may
bypass checks that are
case-sensitive.

An attacker might use
exploit.php%00.jpg, where
%00 represents a null byte
that some systems interpret
as the end of the filename.

CASE SENSITIVITY BYPASS

NULL BYTE INJECTION

exploit.php%00.jpg

exploit.pHp

Extension Obfuscation Methods

Case Sensitivity Bypass

exploit.pHp

An attacker uploads exploit.pHp, which may bypass checks that are case-sensitive.

Null Byte Injection

exploit.php%00.jpg

An attacker might use exploit.php%00.jpg, where %00 represents a null byte that some systems interpret as the end of the filename.

## Slide 12

5.0s
Animate
Position

Encoding characters such as
dots or slashes can help
bypass validation checks
designed to block certain
extensions.

There are few other extensions exists,
which can also be used to run PHP code. 

For example: php6, phtml. If developers
did not block all the extensions,
attackers could use other extensions.

EXTENSION OBFUSCATION METHODS

URL ENCODING

OTHER EXTENSIONS THAT CAN BE
EXECUTED AS PHP CODE

Extension Obfuscation Methods

Other Extensions that can be executed as PHP code

URL Encoding

Encoding characters such as dots or slashes can help bypass validation checks designed to block certain extensions.

There are few other extensions exists, which can also be used to run PHP code.

For example: php6, phtml. If developers did not block all the extensions, attackers could use other extensions.

## Slide 13

6.0s
Animate
Position

MITIGATION STRATEGIES

SERVER-SIDE VALIDATION TECHNIQUES

To protect against file upload vulnerabilities, developers should implement
several best practices:

Strict File Type Checking

Restrict Upload Locations

Sanitize Filenames

Limit File Sizes

Mitigation Strategies

To protect against file upload vulnerabilities, developers should implement several best practices:

Server-Side Validation Techniques

Strict File Type Checking

Sanitize Filenames

Restrict Upload Locations

Limit File Sizes

## Slide 14

6.8s
Animate
Position

Strict File Type Checking

FILE EXTENSION

CONTENT-TYPE

Validate both file extension and content-type, and the content using magic
numbers (specific byte sequences at the beginning of files).




Implement allowlists for permitted file types based on actual content rather
than relying solely on extensions.

Strict File Type Checking

Validate both file extension and content-type, and the content using magic numbers (specific byte sequences at the beginning of files).

Implement allowlists for permitted file types based on actual content rather than relying solely on extensions.

FILE EXTENSION

content-type

## Slide 15

5.0s
Animate
Position

Sanitize Filenames

Remove special characters from filenames and limit their length.




Generate random filenames for uploaded files to prevent overwriting existing files.

PHOTO01.jpg

PHOTO_01*.jpg

Sanitize Filenames

Remove special characters from filenames and limit their length.

Generate random filenames for uploaded files to prevent overwriting existing files.

PHOTO_01*.jpg

PHOTO01.jpg

## Slide 16

6.7s
Animate
Position

Restrict Upload Locations

Store uploaded files outside of publicly accessible directories (web root).




Use strict permission settings on directories where uploads are stored.

Restrict Upload Locations

Store uploaded files outside of publicly accessible directories (web root).

Use strict permission settings on directories where uploads are stored.

## Slide 17

5.4s
Animate
Position

Limit File Sizes

Limited File Sizes

Set maximum allowed sizes for uploaded files to prevent potential DoS attacks.




Validate file sizes before processing uploads.

Limit File Sizes

Set maximum allowed sizes for uploaded files to prevent potential DoS attacks.

Validate file sizes before processing uploads.

Limited File Sizes

## Slide 18

5.2s
Animate
Position

File upload vulnerabilities represent a
significant threat in web applications if
not properly managed. By understanding
how these vulnerabilities arise and
implementing robust security measures,
developers can protect their
applications from potential exploits
effectively.

CONCLUSION

File upload vulnerabilities represent a significant threat in web applications if not properly managed. By understanding how these vulnerabilities arise and implementing robust security measures, developers can protect their applications from potential exploits effectively.

Conclusion
