# File Uploads - PortSwigger Walkthrough

_Category: Hacking Practical — Source: https://www.canva.com/design/DAGc6Wk0IQA/1Z4S9vR1FstZMar07zKJdQ/edit_

---

## Slide 1

PORTSWIGGER
WALKTHROUGH

PortSwigger Walkthrough

## Slide 2

8.0s
Animate
Position

Add full HTTP request and response for every HTTP
request/response you are talking about.

Use a different font for Burp Suite. I am using Ayuthya, with
size of 13. If the letters are still now clear, please try to
increase the DPI of your burp suite. If any questions, please
reach out!

Add full HTTP request and response for every HTTP request/response you are talking about.

Use a different font for Burp Suite. I am using Ayuthya, with size of 13. If the letters are still now clear, please try to increase the DPI of your burp suite. If any questions, please reach out!

## Slide 3

8.1s
Animate
Position

WEB SHELL UPLOAD VIA PATH 

TRAVERSAL LAB - WALKTHROUGH

Upload a basic PHP web shell and use it to
exfiltrate the contents of the file
/home/carlos/secret. (Submit this secret using
the button provided in the lab banner.)

This lab contains a vulnerable image upload
function. The server is configured to prevent
the execution of user-supplied files, but this
restriction can be bypassed by exploiting
another vulnerability.

AGENDA

Web Shell Upload via Path

Traversal Lab - Walkthrough

Agenda

Upload a basic PHP web shell and use it to exfiltrate the contents of the file /home/carlos/secret. (Submit this secret using the button provided in the lab banner.)

This lab contains a vulnerable image upload function. The server is configured to prevent the execution of user-supplied files, but this restriction can be bypassed by exploiting another vulnerability.

## Slide 4

5.2s
Animate
Position

WALKTHROUGH

Start the lab and launch Burp Suite.




Turn off the intercept if it is already on.

STEP 1: START THE LAB

Walkthrough

Step 1: Start the Lab

Start the lab and launch Burp Suite.

Turn off the intercept if it is already on.

## Slide 5

5.0s
Animate
Position

Log in as wiener. 

Navigate to the My Account page and observe the Image Upload
functionality. ADD screenshot of the image functionality here.

STEP 2: LOG IN AND OBSERVE FUNCTIONALITY

Step 2: Log In and Observe Functionality

Log in as wiener.

Navigate to the My Account page and observe the Image Upload functionality. ADD screenshot of the image functionality here.

## Slide 6

5.0s
Animate
Position

Open a code editor and create a PHP file. 

        For this example, we will use the any-name.php name.

Paste the following PHP code:

Upload an sample image as shown in the following screenshot: Add a screenshot here, showing a sample image being uploaded

In order to exploit this file upload, we can start by trying to upload a PHP script. In order to do that,

If the script is successfully executed, then we should be able to see the contents of
the /home/carlos/secret/ file when we access the uploaded file.

<?php

// This script reads and shows the content of a file.

echo file_get_contents('/home/carlos/secret');

?>

STEP 3: FILE UPLOAD EXAMPLE

Step 3: File Upload Example

Upload an sample image as shown in the following screenshot: Add a screenshot here, showing a sample image being uploaded

In order to exploit this file upload, we can start by trying to upload a PHP script. In order to do that,

Open a code editor and create a PHP file.

For this example, we will use the any-name.php name.

Paste the following PHP code:

<?php

// This script reads and shows the content of a file.

echo file_get_contents('/home/carlos/secret');

?>

If the script is successfully executed, then we should be able to see the contents of the /home/carlos/secret/ file when we access the uploaded file.

## Slide 7

5.0s
Animate
Position

Use the Image Upload functionality to upload any-name.php.

Observe that the file is successfully uploaded but cannot be
executed due to file execution restrictions, as shown in the
following screenshot:

STEP 4: UPLOAD THE WEB SHELL

Step 4: Upload the Web Shell

Use the Image Upload functionality to upload any-name.php.

Observe that the file is successfully uploaded but cannot be executed due to file execution restrictions, as shown in the following screenshot:

## Slide 8

5.0s
Animate
Position

In Burp Suite, go to the HTTP history tab and locate the
POST /my-account/avatar request.

Send this request to the Repeater tab.

Modify the filename parameter in the request body from:

STEP 5: MODIFY THE UPLOAD PATH

TO

filename="any-name.php"

filename="../any-name.php"

Step 5: Modify the Upload Path

In Burp Suite, go to the HTTP history tab and locate the POST /my-account/avatar request.

Send this request to the Repeater tab.

Modify the filename parameter in the request body from:

to

filename="any-name.php"

filename="../any-name.php"

## Slide 9

5.0s
Animate
Position

STEP 5: MODIFY THE UPLOAD PATH

Send the request and observe that the file is still uploaded
to the same location (/files/avatar/any-name.php).

Step 5: Modify the Upload Path

Send the request and observe that the file is still uploaded to the same location (/files/avatar/any-name.php).

## Slide 10

5.0s
Animate
Position

Use the Decoder tab in Burp Suite to URL-encode the /
(slash) character. 

For example:

Replace the ../ in the filename parameter with ..%2f. The
final value should look like this:

STEP 6: ENCODE THE FILE PATH

/* Plaintext */

/




/* URL Encoding */

%2f

..%2fany-name.php

Step 6: Encode the File Path

Use the Decoder tab in Burp Suite to URL-encode the / (slash) character.

For example:

/* Plaintext */

/

/* URL Encoding */

%2f

Replace the ../ in the filename parameter with ..%2f. The final value should look like this:

..%2fany-name.php

## Slide 11

5.0s
Animate
Position

Send the request again. Observe that the file is now uploaded
to one directory back successfully. 

STEP 6: ENCODE THE FILE PATH

Step 6: Encode the File Path

Send the request again. Observe that the file is now uploaded to one directory back successfully.

## Slide 12

5.0s
Animate
Position

Reload the My Account page and locate the request in HTTP
history: GET /files/avatar/..%2fany-name.php.

Send the modified request and observe the response, which
contains the secret from /home/carlos/secret.

Send this request to the Repeater tab and modify it to:

STEP 7: ACCESS THE WEB SHELL

GET /files/any-name.php

Step 7: Access the Web Shell

Reload the My Account page and locate the request in HTTP history: GET /files/avatar/..%2fany-name.php.

Send this request to the Repeater tab and modify it to:

GET /files/any-name.php

Send the modified request and observe the response, which contains the secret from /home/carlos/secret.

## Slide 13

5.4s
Animate
Position

Copy the secret.

Copy the secret.

Submit it using the button provided in the lab banner to
successfully solve the lab.

STEP 8: SUBMIT THE SECRET

Step 8: Submit the Secret

Copy the secret.

Submit it using the button provided in the lab banner to successfully solve the lab.

Copy the secret.

## Slide 14

6.8s
Animate
Position

This lab demonstrated how to bypass file execution restrictions by exploiting a path traversal vulnerability in the file upload functionality.




Always validate and sanitize user input to prevent such vulnerabilities.




KEY POINTS

Key Points

This lab demonstrated how to bypass file execution restrictions by exploiting a path traversal vulnerability in the file upload functionality.

Always validate and sanitize user input to prevent such vulnerabilities.
