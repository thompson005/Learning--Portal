# Basic_log_analysis

_Category: Blue Team Labs — Source: https://www.canva.com/design/DAGmTTodbz0/fnBXM4E_71u1d3YJkphCgg/edit_

---

## Slide 1

BASIC LOG
ANALYSIS

basic log analysis

## Slide 2

The Windows Event Viewer is a built-in tool that displays a log of system events,
including errors, warnings, and informational messages, to help troubleshoot and
monitor your Windows system.

BASIC LOG ANALYSIS WITH WINDOWS EVENT VIEWER

Basic Windows OS
knowledge

Event log concepts

Basic Security
Knowledge

Basic Log Analysis with Windows Event Viewer

Basic Windows OS knowledge

Event log concepts

Basic Security Knowledge

The Windows Event Viewer is a built-in tool that displays a log of system events, including errors, warnings, and informational messages, to help troubleshoot and monitor your Windows system.

## Slide 3

One of the employees at your company has their computer infected by malware!
Turns out every time they try to switch on the computer, it shuts down right after
they log in. The story given by the employee is as follows:

See if you can find evidence for the each of these events and retrieve the flag (split
into 3 pieces) from the correct logs!

    They installed software using an installer they downloaded online




    They ran the installed software but it seemed to do nothing




    Now every time they bootup and login to their computer, a black command
prompt screen quickly opens and closes and their computer shuts down instantly.

CHALLENGE DESCRIPTION

Challenge Description

One of the employees at your company has their computer infected by malware! Turns out every time they try to switch on the computer, it shuts down right after they log in. The story given by the employee is as follows:

They installed software using an installer they downloaded online

They ran the installed software but it seemed to do nothing

Now every time they bootup and login to their computer, a black command prompt screen quickly opens and closes and their computer shuts down instantly.

See if you can find evidence for the each of these events and retrieve the flag (split into 3 pieces) from the correct logs!

## Slide 4

We have been provided with a file Windows_logs.evtx. An evtx is a file extension used
for saved log files that can be viewed in the event viewer.

WALKTHROUGH

Walkthrough

We have been provided with a file Windows_logs.evtx. An evtx is a file extension used for saved log files that can be viewed in the event viewer.

## Slide 5

On the left you can see that our log file
got loaded in Saved Logs, we can also
view the current logs of the system in
the Windows Logs and Application and
Services Logs.

On the left you can see that our log file got loaded in Saved Logs, we can also view the current logs of the system in the Windows Logs and Application and Services Logs.

## Slide 6

In the center, you can see a
brief summary of the event
and a more detailed output
below it.

In the center, you can see a brief summary of the event and a more detailed output below it.

## Slide 7

On the right we have options to
create views and filter data.

On the right we have options to create views and filter data.

## Slide 8

Since there are around 8000 logs,it is
not possible to go through each one.
So we will filter the events using their
event id. Each event ID is a unique
number that helps identify specific
events logged by the system.

Since there are around 8000 logs,it is not possible to go through each one. So we will filter the events using their event id. Each event ID is a unique number that helps identify specific events logged by the system.

## Slide 9

Informational message that the
installation of the product was
successful.

We can see that the user installed a software, with a quick google search, we can
filter for the ID's 11707 and 1033.

Gives a more detailed info Product:
%1. Version: %2. Language: %3.
Installation completed with status:
%4. Manufacturer: %5.

11707

1033

We can see that the user installed a software, with a quick google search, we can filter for the ID's 11707 and 1033.

11707

1033

Informational message that the installation of the product was successful.

Gives a more detailed info Product: %1. Version: %2. Language: %3. Installation completed with status: %4. Manufacturer: %5.

## Slide 10

We can see a software with the name of Totally_Legit_Software is
installed successfully.

We can see more info on the software and we get the first part of the
flag in the Manufacturer field.

We can see a software with the name of Totally_Legit_Software is installed successfully.

We can see more info on the software and we get the first part of the flag in the Manufacturer field.

## Slide 11

The user mentioned that
running the installer seemed
to do nothing, so it probably
ran something in the
background that forces the
system to shutdown. We can
look for registry key changes
for any suspicious activity
with the event ID 4657.

The user mentioned that running the installer seemed to do nothing, so it probably ran something in the background that forces the system to shutdown. We can look for registry key changes for any suspicious activity with the event ID 4657.

## Slide 12

We can see that the Run registry key was indeed modified to a immediate shutdown
and we get the second part of the flag.

Whenever the system is shutdown windows logs it as an event with the
event ID 1074. So we can use this to view the log of the shutdown, which
gives us the final part of the flag.

We can see that the Run registry key was indeed modified to a immediate shutdown and we get the second part of the flag.

Whenever the system is shutdown windows logs it as an event with the event ID 1074. So we can use this to view the log of the shutdown, which gives us the final part of the flag.

## Slide 13

TIMELINE ANALYSIS

The user installed a
suspicious msi installer called
Totally_Legit_Software.msi

When run, it
modified the run
registry key.

with that modification,
everytime the user logged
in, it initiated the shutdown
command.

Timeline Analysis

The user installed a suspicious msi installer called Totally_Legit_Software.msi

When run, it modified the run registry key.

with that modification, everytime the user logged in, it initiated the shutdown command.
