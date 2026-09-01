# Access Control List

_Category: Windows — Source: https://www.canva.com/design/DAGn-kmlIDw/6GdNm44Kwq4VdOF3psdsgw/edit_

---

## Slide 1

WINDOWS 

ACCESS CONTROL LIST

ACL

acl

Windows

Access Control List

## Slide 2

ACCESS CONTROL LIST (ACL)

ACL

Access Control Lists (ACLs) are fundamental components of Windows security, used
to manage permissions for users, groups, and systems on various objects like files,
folders, registry keys, and network resources. This lab provides an overview of ACL
concepts and commands for managing them effectively.

Access Control List (ACL)

Access Control Lists (ACLs) are fundamental components of Windows security, used to manage permissions for users, groups, and systems on various objects like files, folders, registry keys, and network resources. This lab provides an overview of ACL concepts and commands for managing them effectively.

acl

## Slide 3

An Access Control List (ACL) is a list of rules that specifies which users or systems are
granted or denied access to a particular object or system resource. Each object in
Windows has an ACL that defines its security settings.

WHAT IS AN ACCESS CONTROL LIST (ACL)?

What is an Access Control List (ACL)?

An Access Control List (ACL) is a list of rules that specifies which users or systems are granted or denied access to a particular object or system resource. Each object in Windows has an ACL that defines its security settings.

## Slide 4

Types of ACLs in Windows

Discretionary ACL (DACL)

Managed by the
object's owner or
administrators.

Example: Read, Write, Modify permissions for a file.

Specifies permissions
for users and groups
to access an object.

Types of ACLs in Windows

Discretionary ACL (DACL)

Specifies permissions for users and groups to access an object.

Managed by the object's owner or administrators.

Example: Read, Write, Modify permissions for a file.

## Slide 5

Types of ACLs in Windows

System ACL (SACL)

Tracks access
attempts for security
monitoring purposes.

Example: Logging failed access attempts to a file.

Defines auditing
rules for an object.

Types of ACLs in Windows

System ACL (SACL)

Defines auditing rules for an object.

Tracks access attempts for security monitoring purposes.

Example: Logging failed access attempts to a file.

## Slide 6

Key Concepts of ACLs

Each ACL consists of multiple ACEs that define specific
permissions for users or groups.

An ACE might grant "Read" permission to the user "JohnDoe."

Read
Access 

JohnDoe

Access Control Entries (ACEs)

Example

Key Concepts of ACLs

Access Control Entries (ACEs)

Each ACL consists of multiple ACEs that define specific permissions for users or groups.

Example

An ACE might grant "Read" permission to the user "JohnDoe."

Read Access

JohnDoe

## Slide 7

Key Concepts of ACLs

Unique identifiers assigned to users, groups, and computers.

Used in ACEs to specify subjects.

Security Identifiers (SIDs)

Read

Write

Modify

Key Concepts of ACLs

Security Identifiers (SIDs)

Unique identifiers assigned to users, groups, and computers.

Used in ACEs to specify subjects.

Read

Write

Modify

## Slide 8

Key Concepts of ACLs

Permissions can be inherited from parent objects to child
objects.

Inheritance

A folder's permissions are inherited by its subfolders and files.

Example

Key Concepts of ACLs

Inheritance

Permissions can be inherited from parent objects to child objects.

Example

A folder's permissions are inherited by its subfolders and files.

## Slide 9

Key Concepts of ACLs

Every object has an owner who controls its permissions.

Ownership

Owners can modify the DACL to grant or deny access.

Key Concepts of ACLs

Ownership

Every object has an owner who controls its permissions.

Owners can modify the DACL to grant or deny access.

## Slide 10

MANAGING ACLS IN WINDOWS

Viewing and Modifying ACLs via GUI

Steps

Navigate to the Security
tab.

View or edit permissions
for users and groups.

Right-click a file or folder
and select Properties.

Managing ACLs in Windows

Viewing and Modifying ACLs via GUI

Steps

Right-click a file or folder and select Properties.

Navigate to the Security tab.

View or edit permissions for users and groups.

## Slide 11

MANAGING ACLS VIA COMMAND-LINE

icacls Command

Key Features

View permissions
for files and folders.

Modify DACLs by granting
or revoking permissions.

Backup and restore
ACL settings.

icacls is a powerful CMD utility for viewing and modifying
ACLs on files and directories.

Managing ACLs via Command-Line

icacls Command

icacls is a powerful CMD utility for viewing and modifying ACLs on files and directories.

Key Features

View permissions for files and folders.

Modify DACLs by granting or revoking permissions.

Backup and restore ACL settings.

## Slide 12

# Display the ACLs of a file

icacls "C:\example\file.txt"




# Grant "Read" permission to a user

icacls "C:\example\file.txt" /grant JohnDoe:R




# Remove all permissions for a user

icacls "C:\example\file.txt" /remove JohnDoe




# Backup ACL settings to a file

icacls "C:\example" /save "C:\acl_backup.txt"




# Restore ACL settings from a backup

icacls "C:\example" /restore "C:\acl_backup.txt"

COMMAND EXAMPLES

# Display the ACLs of a file

icacls "C:\example\file.txt"

# Grant "Read" permission to a user

icacls "C:\example\file.txt" /grant JohnDoe:R

# Remove all permissions for a user

icacls "C:\example\file.txt" /remove JohnDoe

# Backup ACL settings to a file

icacls "C:\example" /save "C:\acl_backup.txt"

# Restore ACL settings from a backup

icacls "C:\example" /restore "C:\acl_backup.txt"

Command Examples

## Slide 13

MANAGING ACLS VIA COMMAND-LINE

Set-Acl Command

Key Features

Programmatically set
DACLs and SACLs.

Supports advanced
scripting scenarios.

Set-Acl is a PowerShell cmdlet used to modify ACLs on files,
folders, and other objects.

Managing ACLs via Command-Line

Set-Acl Command

Set-Acl is a PowerShell cmdlet used to modify ACLs on files, folders, and other objects.

Key Features

Programmatically set DACLs and SACLs.

Supports advanced scripting scenarios.

## Slide 14

# Get the current ACL of a file

$acl = Get-Acl "C:\example\file.txt"




# Modify the ACL by adding read permission for a user

$permission = New-Object
System.Security.AccessControl.FileSystemAccessRule("JohnDoe", "Read",
"Allow")

$acl.SetAccessRule($permission)

Set-Acl "C:\example\file.txt" $acl




# View the updated ACL

Get-Acl "C:\example\file.txt"

COMMAND EXAMPLES

Command Examples

# Get the current ACL of a file

$acl = Get-Acl "C:\example\file.txt"

# Modify the ACL by adding read permission for a user

$permission = New-Object System.Security.AccessControl.FileSystemAccessRule("JohnDoe", "Read", "Allow")

$acl.SetAccessRule($permission)

Set-Acl "C:\example\file.txt" $acl

# View the updated ACL

Get-Acl "C:\example\file.txt"

## Slide 15

Auditing tracks access attempts on objects using System ACLs (SACLs). Administrators
can configure auditing policies to log successful or failed access attempts.

AUDITING WITH SACLS

Steps to Enable Auditing

Navigate to Local Policies
> Audit Policy.

Configure audit settings
(e.g., Audit Object Access).

Open Local Security
Policy (secpol.msc).

Auditing with SACLs

Auditing tracks access attempts on objects using System ACLs (SACLs). Administrators can configure auditing policies to log successful or failed access attempts.

Steps to Enable Auditing

Open Local Security Policy (secpol.msc).

Navigate to Local Policies > Audit Policy.

Configure audit settings (e.g., Audit Object Access).

## Slide 16

SUMMARY TABLE

FEATURE/COMMAND

PURPOSE

EXAMPLE USE CASE

GUI (Security Tab)

View/edit permissions via
graphical interface

Modify folder permissions
easily

icacls

Manage ACLs via CMD

Grant/revoke file access

Set-Acl

Manage ACLs via
PowerShell

Automate permission
changes

SACL Auditing

Track access attempts

Monitor unauthorized
access

Feature/Command

GUI (Security Tab)

icacls

Set-Acl

SACL Auditing

Summary Table

Empty	Empty	Empty
Empty	Empty	Empty
Empty	Empty	Empty
Empty	Empty	Empty
Empty	Empty	Empty

Purpose

View/edit permissions via graphical interface

Manage ACLs via CMD

Manage ACLs via PowerShell

Track access attempts

Example Use Case

Modify folder permissions easily

Grant/revoke file access

Automate permission changes

Monitor unauthorized access

## Slide 17

Access Control Lists (ACLs) are vital for securing resources in Windows environments.
By understanding how to manage DACLs, SACLs, inheritance, and ownership, you can
ensure proper access control while maintaining system security. Mastering tools like
icacls and Set-Acl will enhance your ability to manage permissions efficiently!

OUTRO

DACLs

SACLs

Outro

Access Control Lists (ACLs) are vital for securing resources in Windows environments. By understanding how to manage DACLs, SACLs, inheritance, and ownership, you can ensure proper access control while maintaining system security. Mastering tools like icacls and Set-Acl will enhance your ability to manage permissions efficiently!

DACLs

SACLs
