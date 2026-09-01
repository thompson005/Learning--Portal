# Tool_frida_installation

_Category: Android — Source: https://www.canva.com/design/DAGqmHALPIg/6Ai68EQDCtT9afW1c5azFg/edit_

---

## Slide 1

FRIDA

Frida

## Slide 2

Frida is a dynamic instrumentation toolkit.It lets you inject your own code into apps
while they’re running, so you can observe or change how they behave.

FRIDA

Frida

Frida is a dynamic instrumentation toolkit.It lets you inject your own code into apps while they’re running, so you can observe or change how they behave.

## Slide 3

To install frida for the desktop, we can use pip.

pip install frida-tools

$ adb shell getprop ro.product.cpu.abilist # check your device cpu type




$ unxz frida-server.xz

First off, download the latest frida-server for Android from here
https://github.com/frida/frida/releases and uncompress it.

To install frida for the desktop, we can use pip.

pip install frida-tools

First off, download the latest frida-server for Android from here https://github.com/frida/frida/releases and uncompress it.

$ adb shell getprop ro.product.cpu.abilist # check your device cpu type

$ unxz frida-server.xz

## Slide 4

Now, let’s get it running on your device:

$ adb root # might be required

$ adb push frida-server /data/local/tmp/

$ adb shell "chmod 755 /data/local/tmp/frida-server"

$ adb shell "/data/local/tmp/frida-server &"

Some apps might be able to detect the frida-server location. Renaming the
frida-server binary to a random name, or moving it to another location
such as /dev may do the trick.

Now, let’s get it running on your device:

$ adb root # might be required

$ adb push frida-server /data/local/tmp/

$ adb shell "chmod 755 /data/local/tmp/frida-server"

$ adb shell "/data/local/tmp/frida-server &"

Some apps might be able to detect the frida-server location. Renaming the frida-server binary to a random name, or moving it to another location such as /dev may do the trick.

## Slide 5

Make sure that adb can see the device

To run a quick test, on your desktop

This should give you a process list

$ adb devices -l

$ frida-ps -U

  PID NAME

 1590 com.facebook.katana

13194 com.facebook.katana:providers

12326 com.facebook.orca

13282 com.twitter.android

Make sure that adb can see the device

$ adb devices -l

To run a quick test, on your desktop

$ frida-ps -U

This should give you a process list

PID NAME

1590 com.facebook.katana

13194 com.facebook.katana:providers

12326 com.facebook.orca

13282 com.twitter.android
