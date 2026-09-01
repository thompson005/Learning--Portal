# User & Group Management

_Category: Windows — Source: https://www.canva.com/design/DAGn-s_Z3RU/w5KHxjADTr0I97KhHIFQxQ/edit_

---

## Slide 1

USER & GROUP
MANAGEMENT

User & Group Management

## Slide 2

Managing users and groups is critical for access control, privilege delegation, and
securing a Windows system—especially in enterprise and penetration testing
environments.

USER & GROUP MANAGEMENT IN WINDOWS

ACCESS CONTROL

PRIVILEGE DELEGATION

SECURING A WINDOWS

User & Group Management in Windows

Managing users and groups is critical for access control, privilege delegation, and securing a Windows system—especially in enterprise and penetration testing environments.

access control

privilege delegation

securing a Windows

## Slide 3

net user Used to view, add, modify, and delete user accounts.

net user

net user <username>

net user testuser /del

net user testuser Pass@123 /add

MANAGING USERS

View all users

Create a new user

Delete a user

View a specific user’s details

Managing Users

net user Used to view, add, modify, and delete user accounts.

View all users

net user

View a specific user’s details

net user <username>

Create a new user

net user testuser Pass@123 /add

Delete a user

net user testuser /del

## Slide 4

IDENTIFY CURRENT USER

USEFUL FOR

Displays the currently logged-in user in DOMAIN\Username format.

Verifying current
privileges

Confirming domain
vs local context

Scripting & enumeration
during red teaming

whoami

Identify Current User

whoami

Displays the currently logged-in user in DOMAIN\Username format.

Useful for

Verifying current privileges

Confirming domain vs local context

Scripting & enumeration during red teaming

## Slide 5

DETAILED USER INFO

wmic useraccount

List all user accounts

Filter by local account

Retrieves detailed information about local and domain user accounts.

This is particularly helpful for scripting, privilege analysis, and SID lookups.

wmic useraccount get name,sid,status

wmic useraccount where "LocalAccount=True" get name,sid

Detailed User Info

wmic useraccount

Retrieves detailed information about local and domain user accounts.

List all user accounts

wmic useraccount get name,sid,status

Filter by local account

wmic useraccount where "LocalAccount=True" get name,sid

This is particularly helpful for scripting, privilege analysis, and SID lookups.

## Slide 6

Used to view, create, add to, or delete from local groups.

net localgroup

net localgroup

net localgroup administrators

net localgroup administrators testuser /add

net localgroup administrators testuser /delete

MANAGING GROUPS

View all groups

Add a user to a group

Remove a user from a group

View group members

Managing Groups

net localgroup

Used to view, create, add to, or delete from local groups.

View all groups

View group members

net localgroup

net localgroup administrators

Add a user to a group

net localgroup administrators testuser /add

Remove a user from a group

net localgroup administrators testuser /delete

## Slide 7

net user 

List, create, and
remove user accounts

net localgroup
Elevate or audit
privileges (e.g., Admin)

whoami

Check current
identity & privileges

wmic useraccount
Enumerate users and
their SIDs

net user

List, create, and remove user accounts

whoami

Check current identity & privileges

wmic useraccount Enumerate users and their SIDs

net localgroup Elevate or audit privileges (e.g., Admin)
