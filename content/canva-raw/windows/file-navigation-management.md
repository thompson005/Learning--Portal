# File Navigation & Management

_Category: Windows — Source: https://www.canva.com/design/DAGn-llDvIQ/avzueVZLMkszTCwnzSalMw/edit_

---

## Slide 1

FILE NAVIGATION &
MANAGEMENT

File Navigation & Management

## Slide 2

Understanding how to navigate, manage, and secure files is fundamental for both
system administration and cybersecurity tasks. In this section, we’ll look at how to
work with files using File Explorer, the Command Line Interface (CLI), and manage file
permissions using icacls.

FILE NAVIGATION & MANAGEMENT

File Navigation & Management

Understanding how to navigate, manage, and secure files is fundamental for both system administration and cybersecurity tasks. In this section, we’ll look at how to work with files using File Explorer, the Command Line Interface (CLI), and manage file permissions using icacls.

## Slide 3

NAVIGATION COMMANDS

CLI (Commmand Line Interface) gives you more control, speed, and is essential for
scripting and remote work.

COMMAND LINE NAVIGATION & 

FILE OPERATIONS (CLI)

cd

dir

Change Directory

List contents of a directory

cd C:\Users\Admin\Documents

dir /a (shows all including hidden files)

Command Line Navigation &

File Operations (CLI)

CLI (Commmand Line Interface) gives you more control, speed, and is essential for scripting and remote work.

Navigation Commands

cd

Change Directory

dir

List contents of a directory

cd C:\Users\Admin\Documents

dir /a (shows all including hidden files)

## Slide 4

FILE MANAGEMENT

copy

move

Copy files

Move/rename files

copy file.txt D:\Backup\file.txt

move data.csv C:\Archive\data.csv

File Management

copy

Copy files

move

Move/rename files

copy file.txt D:\Backup\file.txt

move data.csv C:\Archive\data.csv

## Slide 5

FILE MANAGEMENT

del

rmdir

Delete files

Remove directory

del old_report.txt

mkdir NewFolder

mkdir

Create new directory

rmdir /s /q UnusedFolder (/s = with subfolders, /q = quiet mode)

File Management

del

Delete files

mkdir

Create new directory

del old_report.txt

mkdir NewFolder

rmdir

Remove directory

rmdir /s /q UnusedFolder (/s = with subfolders, /q = quiet mode)

## Slide 6

Windows uses Access Control Lists (ACLs) to control 

who can read, write, or execute files.

icacls filename.txt

icacls filename.txt /grant UserName:F

icacls – Inspect and modify file permissions

FILE ATTRIBUTES AND PERMISSIONS

View permissions

Grant full control to a user

File Attributes and Permissions

Windows uses Access Control Lists (ACLs) to control

who can read, write, or execute files.

icacls – Inspect and modify file permissions

View permissions

Grant full control to a user

icacls filename.txt

icacls filename.txt /grant UserName:F

## Slide 7

(OI) – Object Inherit (files) (CI) – Container Inherit (folders) /T – Traverse subfolders

icacls filename.txt /reset

Reset permissions to default

Apply changes recursively

icacls C:\MyFolder /grant UserName:(OI)(CI)F /T

Reset permissions to default

Apply changes recursively

icacls filename.txt /reset

icacls C:\MyFolder /grant UserName:(OI)(CI)F /T

(OI) – Object Inherit (files) (CI) – Container Inherit (folders) /T – Traverse subfolders
