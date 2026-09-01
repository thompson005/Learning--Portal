# User and group management

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGjcdEAaIE/_E8X9R6dQui16deulA1eQQ/edit_

---

## Slide 1

USER & GROUP
MANAGEMENT

User & group management

## Slide 2

USER & GROUP MANAGEMENT

In linux, every user is assigned a username
and a group that they belong to. 

This is used to distinguish between users
and give certain permissions and manage
access to the system.

User & group management

In linux, every user is assigned a username and a group that they belong to.

This is used to distinguish between users and give certain permissions and manage access to the system.

## Slide 3

The whoami command displays the current username.

quixel@pop-os:~$ whoami

quixel

quixel@pop-os:~$ id

uid=1000(quixel) gid=1000(quixel)
groups=1000(quixel),4(adm),27(sudo),124(lpadmin),137(ubridge),139(libvirt)

The id command provides more comprehensive information, including user id (uid),
primary group id(gid) and all the groups that the user belongs to.

The whoami command displays the current username.

quixel@pop-os:~$ whoami

quixel

The id command provides more comprehensive information, including user id (uid), primary group id(gid) and all the groups that the user belongs to.

quixel@pop-os:~$ id

uid=1000(quixel) gid=1000(quixel) groups=1000(quixel),4(adm),27(sudo),124(lpadmin),137(ubridge),139(libvirt)

## Slide 4

ROOT

The root is the user with the highest privilege in Linux, represented by the UID 0 and
GID 0. As a root, you have access to everything. When you're logged in as root, you
can notice a slight change in the terminal:

root@pop-os:~# id

uid=0(root) gid=0(root) groups=0(root)

root

The root is the user with the highest privilege in Linux, represented by the UID 0 and GID 0. As a root, you have access to everything. When you're logged in as root, you can notice a slight change in the terminal:

root@pop-os:~# id

uid=0(root) gid=0(root) groups=0(root)

## Slide 5

The $ will change to a # to indicate that you're the root user. But you would normally
not use this for day to day purposes as its just too risky and its easy to accidentally
modify or delete system critical files. This is where sudo comes in.

ROOT

root

The $ will change to a # to indicate that you're the root user. But you would normally not use this for day to day purposes as its just too risky and its easy to accidentally modify or delete system critical files. This is where sudo comes in.

## Slide 6

sudo allows you to run commands as the root user without actually logging into the
root. To check what commands you can run as root, you can use the sudo -l command.

If you see a prefix of NOPASSWD, it means the command can be run as sudo without a
password. In the above example, I can run all commands as a root with a password.

SUDO

quixel@pop-os:~$ sudo -l

Matching Defaults entries for quixel on pop-os:

    env_reset, mail_badpass,
secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty




User quixel may run the following commands on pop-os:

    (ALL : ALL) ALL

sudo

sudo allows you to run commands as the root user without actually logging into the root. To check what commands you can run as root, you can use the sudo -l command.

quixel@pop-os:~$ sudo -l

Matching Defaults entries for quixel on pop-os:

env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User quixel may run the following commands on pop-os:

(ALL : ALL) ALL

If you see a prefix of NOPASSWD, it means the command can be run as sudo without a password. In the above example, I can run all commands as a root with a password.

## Slide 7

The passwd command is used to manage user passwords, in its simplest form, it can
be used to change the password of the user you're logged in as.

If you supply a user, when in root, you can change the password of another user.

PASSWORD

passwd

passwd [user]

Password

The passwd command is used to manage user passwords, in its simplest form, it can be used to change the password of the user you're logged in as.

passwd

If you supply a user, when in root, you can change the password of another user.

passwd [user]

## Slide 8

Historically, passwords were stored in the /etc/passwd file,
but if you look at the file now, this is probably what you'll see.

uixel@pop-os:~$ cat /etc/passwd

root:x:0:0:root:/root:/bin/bash

daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin

bin:x:2:2:bin:/bin:/usr/sbin/nologin

sys:x:3:3:sys:/dev:/usr/sbin/nologin

sync:x:4:65534:sync:/bin:/bin/sync

games:x:5:60:games:/usr/games:/usr/sbin/nologin

man:x:6:12:man:/var/cache/man:/usr/sbin/nologin

lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin

mail:x:8:8:mail:/var/mail:/usr/sbin/nologin

news:x:9:9:news:/var/spool/news:/usr/sbin/nologin

uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin

proxy:x:13:13:proxy:/bin:/usr/sbin/nologin

www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin

backup:x:34:34:backup:/var/backups:/usr/sbin/nologin

list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin

irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin

Historically, passwords were stored in the /etc/passwd file, but if you look at the file now, this is probably what you'll see.

uixel@pop-os:~$ cat /etc/passwd

root:x:0:0:root:/root:/bin/bash

daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin

bin:x:2:2:bin:/bin:/usr/sbin/nologin

sys:x:3:3:sys:/dev:/usr/sbin/nologin

sync:x:4:65534:sync:/bin:/bin/sync

games:x:5:60:games:/usr/games:/usr/sbin/nologin

man:x:6:12:man:/var/cache/man:/usr/sbin/nologin

lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin

mail:x:8:8:mail:/var/mail:/usr/sbin/nologin

news:x:9:9:news:/var/spool/news:/usr/sbin/nologin

uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin

proxy:x:13:13:proxy:/bin:/usr/sbin/nologin

www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin

backup:x:34:34:backup:/var/backups:/usr/sbin/nologin

list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin

irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin

## Slide 9

The x is a placeholder for the password. The actual hashes of the password are
stored in /etc/shadow, which can only be read by the root.

THIS CONTAINS SEVEN FIELDS SEPARATED BY COLONS

Username

Password placeholder 

(actual password stored in
/etc/shadow)

User ID

Group ID

Home directory

User information

 (GECOS field)

Shell

This contains seven fields separated by colons

Username

Password placeholder

(actual password stored in /etc/shadow)

User information

(GECOS field)

Shell

User ID

Group ID

Home directory

The x is a placeholder for the password. The actual hashes of the password are stored in /etc/shadow, which can only be read by the root.

## Slide 10

These commands create new user accounts, but they work differently:

adduser

useradd

USER MANAGEMENT

is more user-friendly
and interactive, setting
up home directories and
asking questions

is the lower-level
command that requires
more explicit options

user management

These commands create new user accounts, but they work differently:

is more user-friendly and interactive, setting up home directories and asking questions

adduser

3 elements, To start navigating the group contents, press Enter

useradd

is the lower-level command that requires more explicit options

## Slide 11

$ sudo adduser newuser

Adding user `newuser' ...

Adding new group `newuser' (1002) ...

Adding new user `newuser' (1002) with group `newuser' ...

Creating home directory `/home/newuser' ...

Copying files from `/etc/skel' ...

New password: 

Retype new password: 

passwd: password updated successfully

Changing the user information for newuser

Enter the new value, or press ENTER for the default

    Full Name []: New User

    Room Number []: 

    Work Phone []: 

    Home Phone []: 

    Other []: 

Is the information correct? [Y/n] Y

$ sudo adduser newuser

Adding user `newuser' ...

Adding new group `newuser' (1002) ...

Adding new user `newuser' (1002) with group `newuser' ...

Creating home directory `/home/newuser' ...

Copying files from `/etc/skel' ...

New password:

Retype new password:

passwd: password updated successfully

Changing the user information for newuser

Enter the new value, or press ENTER for the default

Full Name []: New User

Room Number []:

Work Phone []:

Home Phone []:

Other []:

Is the information correct? [Y/n] Y

## Slide 12

With useradd

-m creates the
home directory 

 -s sets creates
the Shell

$ sudo useradd -m -s /bin/bash newuser

$ sudo passwd newuser

With useradd

$ sudo useradd -m -s /bin/bash newuser

$ sudo passwd newuser

-m creates the home directory

-s sets creates the Shell

## Slide 13

To remove user accounts, we use the deluser and userdel

# Interactive way

$ sudo deluser newuser

Removing user `newuser' ...

Warning: group `newuser' has no more members.

Done.




# To also remove the home directory

$ sudo deluser --remove-home newuser

$ sudo userdel newuser

# To also remove home directory

$ sudo userdel -r newuser

To remove user accounts, we use the deluser and userdel

# Interactive way

$ sudo deluser newuser

Removing user `newuser' ...

Warning: group `newuser' has no more members.

Done.

# To also remove the home directory

$ sudo deluser --remove-home newuser

$ sudo userdel newuser

# To also remove home directory

$ sudo userdel -r newuser

## Slide 14

USERMOD

The usermod command modifies existing user accounts. 

It's extremely versatile for changing various user attributes

# Add a user to a supplementary group

$ sudo usermod -aG sudo sarah




# Change a user's home directory

$ sudo usermod -d /newhome/david david




# Change a user's shell

$ sudo usermod -s /bin/zsh david




# Change a user's login name

$ sudo usermod -l newdavid david




# Lock a user account (preventing login)

$ sudo usermod -L david




# Unlock a user account

$ sudo usermod -U david

usermod

The usermod command modifies existing user accounts.

It's extremely versatile for changing various user attributes

# Add a user to a supplementary group

$ sudo usermod -aG sudo sarah

# Change a user's home directory

$ sudo usermod -d /newhome/david david

# Change a user's shell

$ sudo usermod -s /bin/zsh david

# Change a user's login name

$ sudo usermod -l newdavid david

# Lock a user account (preventing login)

$ sudo usermod -L david

# Unlock a user account

$ sudo usermod -U david

## Slide 15

GROUP MANAGEMENT

Create a new group.

Delete a group

$sudo groupadd developers

$sudo groupdel developers

group management

Create a new group.

Delete a group

$sudo groupadd developers

$sudo groupdel developers

<!-- NOTE: the original scrape of this deck continued with 3 more slides (a
     "Complete Your Order" / leather-jacket checkout walkthrough concluding a
     Burp Suite business-logic-vulnerability lab) that are unrelated to Linux
     user/group management -- almost certainly a different Canva design's
     slides bleeding in across a page-boundary during extraction. Trimmed
     during the 2026-08-22 content-integrity cleanup pass; not used for any
     curriculum enrichment. -->
