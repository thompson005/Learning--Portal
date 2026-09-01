# File Permissions

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGjcU-4oAY/NkF3rF1SgLc4Q6jgoRSumA/edit_

---

## Slide 1

FILE PERMISSIONS

File Permissions

## Slide 2

In Linux, each file and directory has different permissions or file modes, you
can check the permission of a file or directory using the ls -l command. 

FILE PERMISSIONS

IS -I

File Permissions

In Linux, each file and directory has different permissions or file modes, you can check the permission of a file or directory using the ls -l command.

is -i

## Slide 3

quixel@pop-os:~/test$ touch newfile

quixel@pop-os:~/test$ mkdir newdir

quixel@pop-os:~/test$ ls -l

total 4

drwxrwxr-x 2 quixel quixel 4096 Mar  6 15:57 newdir

-rw-rw-r-- 1 quixel quixel    0 Mar  6 15:55 newfile

The first character of each line represents the file type. the d means its a directory
and a - tells us that its a file. There are other types but this will do for now.

LET'S MAKE A FILE AND LOOK AT ITS PERMISSIONS.

( d )Directory

( - ) Regular file

THE FILE TYPE

quixel@pop-os:~/test$ touch newfile

quixel@pop-os:~/test$ mkdir newdir

quixel@pop-os:~/test$ ls -l

total 4

drwxrwxr-x 2 quixel quixel 4096 Mar 6 15:57 newdir

-rw-rw-r-- 1 quixel quixel 0 Mar 6 15:55 newfile

Let's make a file and look at its permissions.

The file type

The first character of each line represents the file type. the d means its a directory and a - tells us that its a file. There are other types but this will do for now.

( d )Directory

( - ) Regular file

## Slide 4

drwxrwxr-x 2 quixel quixel 4096 Mar  6 15:57 newdir

-rw-rw-r-- 1 quixel quixel    0 Mar  6 15:55 newfile

First 3 (rw-): Owner’s permissions (read, write)

Next 3 (rw-): Group’s permissions (read, write)

Last 3 (r--): Others’ permissions (read only)

The next nine characters represent the file permission, split into 3 characters that
denote the permissions of the owner(the one who created the file),3 characters
denoting the permission of the group that owns the file, 3 characters denoting the
permission that all others have access to.

THE PERMISSION

The permission

The next nine characters represent the file permission, split into 3 characters that denote the permissions of the owner(the one who created the file),3 characters denoting the permission of the group that owns the file, 3 characters denoting the permission that all others have access to.

drwxrwxr-x 2 quixel quixel 4096 Mar 6 15:57 newdir

-rw-rw-r-- 1 quixel quixel 0 Mar 6 15:55 newfile

First 3 (rw-): Owner’s permissions (read, write)

Next 3 (rw-): Group’s permissions (read, write)

Last 3 (r--): Others’ permissions (read only)

## Slide 5

drwxrwxr-x 2 quixel quixel 4096 Mar  6 15:57 newdir

-rw-rw-r-- 1 quixel quixel    0 Mar  6 15:55 newfile

chown [username] [filename]

There are also 2 columns showing the user that owns the file(in this case, quixel) and
the group that owns the file(also quixel).

To change the ownership of a file, we can use the chown command

OWNERSHIP

quixel (User who owns the file)

quixel (Group that owns the file)

Ownership

There are also 2 columns showing the user that owns the file(in this case, quixel) and the group that owns the file(also quixel).

drwxrwxr-x 2 quixel quixel 4096 Mar 6 15:57 newdir

-rw-rw-r-- 1 quixel quixel 0 Mar 6 15:55 newfile

quixel (User who owns the file)

quixel (Group that owns the file)

To change the ownership of a file, we can use the chown command

chown [username] [filename]

## Slide 6

Typically, chown can only be invoked by the root user.

chown → Changes file owner

chgrp → Changes file group

An almost identical command is chgrp,
which is used to change the group
ownership of a file.

As we can see, once we invoked the
chown command, the owner of the file
changed from root to quixel.

root@pop-os:~# touch test_file

root@pop-os:~# ls -l

total 4

drwx------ 3 root root 4096 Mar  6 13:59 snap

-rw-r--r-- 1 root root    0 Mar  6 16:04 test_file

root@pop-os:~# chown quixel test_file 

root@pop-os:~# ls -l

total 4

drwx------ 3 root   root 4096 Mar  6 13:59 snap

-rw-r--r-- 1 quixel root    0 Mar  6 16:04 test_file

Typically, chown can only be invoked by the root user.

root@pop-os:~# touch test_file

root@pop-os:~# ls -l

total 4

drwx------ 3 root root 4096 Mar 6 13:59 snap

-rw-r--r-- 1 root root 0 Mar 6 16:04 test_file

root@pop-os:~# chown quixel test_file

root@pop-os:~# ls -l

total 4

drwx------ 3 root root 4096 Mar 6 13:59 snap

-rw-r--r-- 1 quixel root 0 Mar 6 16:04 test_file

An almost identical command is chgrp, which is used to change the group ownership of a file.

chgrp → Changes file group

As we can see, once we invoked the chown command, the owner of the file changed from root to quixel.

chown → Changes file owner

## Slide 7

Files have both an owning user and group. A group can have
multiple users in it, and a user can be a member of multiple groups.

You can check what groups you are part of with the id command.

The most common use case for groups is to control access to
different system resources.

quixel@pop-os:~$ id

uid=1000(quixel) gid=1000(quixel)
groups=1000(quixel),4(adm),27(sudo),124(lpadmin)

uid=1000(quixel)  =  User ID

gid=1000(quixel)  =  Group ID

groups=.......            =  Other groups you are part of

Files have both an owning user and group. A group can have multiple users in it, and a user can be a member of multiple groups.

You can check what groups you are part of with the id command.

quixel@pop-os:~$ id

uid=1000(quixel) gid=1000(quixel) groups=1000(quixel),4(adm),27(sudo),124(lpadmin)

The most common use case for groups is to control access to different system resources.

uid=1000(quixel) = User ID

gid=1000(quixel) = Group ID

groups=....... = Other groups you are part of

## Slide 8

MODIFYING PERMISSIONS

FOR EXAMPLE

To modify the permissions of a file, we use the chmod command.

let's say I wanted to give a program permission to execute.

chmod [permissions] [file]

quixel@pop-os:~/Desktop/test$ ls -l

total 4

-rw-rw-r-- 1 quixel quixel 52 Mar 10 15:43
program.py

quixel@pop-os:~/Desktop/test$ ./program.py

bash: ./program.py: Permission denied

Modifying permissions

To modify the permissions of a file, we use the chmod command.

chmod [permissions] [file]

For example

let's say I wanted to give a program permission to execute.

quixel@pop-os:~/Desktop/test$ ls -l

total 4

-rw-rw-r-- 1 quixel quixel 52 Mar 10 15:43 program.py

quixel@pop-os:~/Desktop/test$ ./program.py

bash: ./program.py: Permission denied

## Slide 9

To provide the program execute permissions, we run the command 

chmod +x program.py

quixel@pop-os:~/Desktop/test$ chmod +x program.py 

quixel@pop-os:~/Desktop/test$ ./program.py 

This program runs!

quixel@pop-os:~/Desktop/test$ ls -l

total 4

-rwxrwxr-x 1 quixel quixel 52 Mar 10 15:43 program.py

To provide the program execute permissions, we run the command

chmod +x program.py

quixel@pop-os:~/Desktop/test$ chmod +x program.py

quixel@pop-os:~/Desktop/test$ ./program.py

This program runs!

quixel@pop-os:~/Desktop/test$ ls -l

total 4

-rwxrwxr-x 1 quixel quixel 52 Mar 10 15:43 program.py

## Slide 10

If you look closely, you can notice that everyone gets permission to execute the
program. But what if I only wanted the owner to run commands? 

We can remove permissions with 

chmod -x program.py.

quixel@pop-os:~/Desktop/test$ chmod u+x program.py 

quixel@pop-os:~/Desktop/test$ ls -l

total 4

-rwxrw-r-- 1 quixel quixel 52 Mar 10 15:43 program.py

If you look closely, you can notice that everyone gets permission to execute the program. But what if I only wanted the owner to run commands?

We can remove permissions with

chmod -x program.py.

quixel@pop-os:~/Desktop/test$ chmod u+x program.py

quixel@pop-os:~/Desktop/test$ ls -l

total 4

-rwxrw-r-- 1 quixel quixel 52 Mar 10 15:43 program.py

## Slide 11

u ( user )

r ( read )

g ( group )

w ( write )

o ( others )

x ( execute )

USERS

PERMISSIONS

u ( user )

users

permissions

g ( group )

r ( read )

o ( others )

x ( execute )

w ( write )

## Slide 12

So far, we have used r,w, and x to represent permissions, however, there is another
way to specify perms known as octal notation. We use numbers to represent what
permissions we have

We can also add them,

The maximum number for a file permission is 7,
hence the name octal.

OCTAL PERMISSIONS

NO PERMISSIONS

READ

X

WRITE

 *EXECUTE

FOR EXAMPLE

read+write permissions = 4+2 = 6

read+write+execute permissions = 4+2+1 = 7

Octal permissions

So far, we have used r,w, and x to represent permissions, however, there is another way to specify perms known as octal notation. We use numbers to represent what permissions we have

We can also add them,

For example

read+write permissions = 4+2 = 6

read+write+execute permissions = 4+2+1 = 7

The maximum number for a file permission is 7, hence the name octal.

x

*execute

Read

write

no permissions

## Slide 13

We can represent the permissions of a file using a 3 digit octal notation, 

The first digit represents the permissions of the user, the second digit for
the group, and the third digit for others.

Using chmod, you can precisely control who can access your files!

chmod 700 file  -> all permissions for user, no permissions for group and others

chmod 400 file -> only read permissions for user.

chmod 744 file -> all permissions for user, group, and others can only be read.

700 → Only the user has full access.

400 → Only the user can read, no one else can access it.

744  → The user has full control, while others can only read.

Breaking It Down

We can represent the permissions of a file using a 3 digit octal notation,

The first digit represents the permissions of the user, the second digit for the group, and the third digit for others.

chmod 700 file -> all permissions for user, no permissions for group and others

chmod 400 file -> only read permissions for user.

chmod 744 file -> all permissions for user, group, and others can only be read.

Breaking It Down

700 → Only the user has full access.

400 → Only the user can read, no one else can access it.

744 → The user has full control, while others can only read.

Using chmod, you can precisely control who can access your files!

## Slide 14

SUMMARY

NO PERMISSION

---

EXECUTE

--X

WRITE

-W-

WRITE & EXECUTE

-WX

READ

R--

READ & EXECUTE

R-X

READ & WRITE

RW-

READ, WRITE,
EXECUTE

RWX

Summary

no permission

---

execute

--x

write

-w-

write & execute

-wx

read

r--

read & execute

r-x

read & write

rw-

read, write, execute

rwx

## Slide 15

3 SPEICAL PERMISSIONS

SUID

Set user id, makes it so that no matter who runs the program, it is run with the
privilege of the owner.




SGID

Set group id, program runs with the permissions of the group that owns it.




Sticky bit

When the sticky bit is enabled on a directory, it restricts the ability to delete or
rename files within that directory to the file owner,the directory owner, and the
superuser. It ensures that each user can only remove or modify their files

Besides the usual r,w,x bits, there are three more permissions possible in Linux.

3 speical permissions

Besides the usual r,w,x bits, there are three more permissions possible in Linux.

SUID

Set user id, makes it so that no matter who runs the program, it is run with the privilege of the owner.

SGID

Set group id, program runs with the permissions of the group that owns it.

Sticky bit

When the sticky bit is enabled on a directory, it restricts the ability to delete or rename files within that directory to the file owner,the directory owner, and the superuser. It ensures that each user can only remove or modify their files

## Slide 16

To set the suid bit, We can either use chmod u+s or chmod 4xxx the set
sgid bit, we can use chmod g+s or chmod 2xxx To set sticky bit, we can use
chmod +t directory or chmod 1xxx directory

Although these permissions may not seem that useful, they are very commonly used
and, in some cases, can even be misused.

chmod u+s 

chmod 4xxx 

chmod g+s 

chmod 2xxx 

Sgid Bit

To set the suid bit

Sticky Bit

To set the suid bit, We can either use chmod u+s or chmod 4xxx the set sgid bit, we can use chmod g+s or chmod 2xxx To set sticky bit, we can use chmod +t directory or chmod 1xxx directory

To set the suid bit

Sgid Bit

chmod u+s

chmod 4xxx

Sticky Bit

chmod g+s

chmod 2xxx

Although these permissions may not seem that useful, they are very commonly used and, in some cases, can even be misused.
