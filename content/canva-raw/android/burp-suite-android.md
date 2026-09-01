# Burp Suite (Android)

_Category: Android — Source: https://www.canva.com/design/DAGqmJFOKuk/lCANdOpuu8APHu3eLwFxzg/edit_

---

## Slide 1

BURP SUITE

Burp Suite

## Slide 2

To interact with HTTPS traffic, we need to install a CA certificate on our android
device. Go to Proxy tab and choose Proxy settings. Click on Import/export CA
certificate and choose Certificate in DER format

BURP SUITE

Burp Suite

To interact with HTTPS traffic, we need to install a CA certificate on our android device. Go to Proxy tab and choose Proxy settings. Click on Import/export CA certificate and choose Certificate in DER format

## Slide 3

Now we need to convert the certificate to a valid format. A DER (Distinguished
Encoding Rules) file is a digital certificate file that is created and stored in a binary
format. It is a binary encoding for the X.509 certificates and private keys. In contrast
to PEM (Privacy Enhanced Mail) files, DER files do not contain human-readable plain
text statements such as 

—–BEGIN CERTIFICATE—–.

Using terminal, go to the location where you saved the DER file and convert it to .pem
using the following command

openssl x509 -inform der -in cert.der -out cert.pem

Now we need to convert the certificate to a valid format. A DER (Distinguished Encoding Rules) file is a digital certificate file that is created and stored in a binary format. It is a binary encoding for the X.509 certificates and private keys. In contrast to PEM (Privacy Enhanced Mail) files, DER files do not contain human-readable plain text statements such as

—–BEGIN CERTIFICATE—–.

Using terminal, go to the location where you saved the DER file and convert it to .pem using the following command

openssl x509 -inform der -in cert.der -out cert.pem

## Slide 4

Connect to the device using adb and push the certificate to /sdcard/Download.

PUSH THE CERTIFICATE TO THE DEVICE

AD

./adb push /path-to-file/cert.pem /sdcard/Download

Push the certificate to the device

Connect to the device using adb and push the certificate to /sdcard/Download.

./adb push /path-to-file/cert.pem /sdcard/Download

ad

## Slide 5

INSTALLING CERTIFICATE ON DEVICE

Open Setting on your phone, search for certificate and go to Install a certificate.
Click on CA certificate.

Installing certificate on device

Open Setting on your phone, search for certificate and go to Install a certificate. Click on CA certificate.

## Slide 6

INSTALLING CERTIFICATE ON DEVICE

The phone will show a warning about Your data won't be private and it will remind you
to only install a certificate from an organization you trust. By installing this
certificate, you can display requests sent from the phone on Burp Suite application.
This means that also some sensitive data could be sent to Burp Suite. You shouldn't use
your personal phone whenever you play around with all these tools.

Installing certificate on device

The phone will show a warning about Your data won't be private and it will remind you to only install a certificate from an organization you trust. By installing this certificate, you can display requests sent from the phone on Burp Suite application. This means that also some sensitive data could be sent to Burp Suite. You shouldn't use your personal phone whenever you play around with all these tools.

## Slide 7

INSTALLING CERTIFICATE ON DEVICE

Click Install anyway and locate the cert.pem file we copied to the phone.

 cert.pem 

Installing certificate on device

Click Install anyway and locate the cert.pem file we copied to the phone.

cert.pem

## Slide 8

CONFIGURING THE PROXY

Sometimes you might need to configure port forwarding to get the proxy working.
If the proxy doesn't work run the following command

adb reverse tcp:8080 tcp:8080

Configuring the proxy

Sometimes you might need to configure port forwarding to get the proxy working. If the proxy doesn't work run the following command

adb reverse tcp:8080 tcp:8080

## Slide 9

CONFIGURING THE PROXY

8080

adb reverse is a command that allows you to expose a port on your Android
device to a port on your computer. Now when your phone tries to access the
port 8080 (the common port for web traffic), your request will be routed to
port 8080 of your computer.

8080

Configuring the proxy

adb reverse is a command that allows you to expose a port on your Android device to a port on your computer. Now when your phone tries to access the port 8080 (the common port for web traffic), your request will be routed to port 8080 of your computer.

8080

8080

## Slide 10

CONFIGURING THE PROXY

Open a browser and test if http://example.com and https://example.com works.
Both of these websites should now be sending traffic to Burp Suite Proxy tab

http://example.com

https://example.com

Configuring the proxy

Open a browser and test if http://example.com and https://example.com works. Both of these websites should now be sending traffic to Burp Suite Proxy tab

https://example.com

http://example.com
