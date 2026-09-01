# Man_pages

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGkCNYyu6w/2GCa8_iyvFnt9Onh3SVDUA/edit_

---

## Slide 1

MAN PAGES

Man Pages

## Slide 2

Man (manual) pages are built-in documentation for Unix-like operating systems,
providing details on commands and system calls. 

We can access them using the man command:

man <command>

man man

man [section] [page_name]

Even man has a page for it.

The man pages are also divided into sections 1
through 9. To access a section, we specify it
before the page.

MAN PAGES

Man Pages

Man (manual) pages are built-in documentation for Unix-like operating systems, providing details on commands and system calls.

We can access them using the man command:

man <command>

Even man has a page for it.

man man

The man pages are also divided into sections 1 through 9. To access a section, we specify it before the page.

man [section] [page_name]

## Slide 3

System calls 

(functions provided by 

the kernel)

 Library calls 

(functions within program
libraries)

 Executable programs
or shell commands 

OVERVIEW OF UNIX/LINUX COMPONENTS

Overview of Unix/Linux Components

Executable programs or shell commands

System calls

(functions provided by

the kernel)

Library calls

(functions within program libraries)

## Slide 4

File formats and conventions, 

e.g. /etc/passwd

 Games 

Special files 

(usually found in /dev)

OVERVIEW OF UNIX/LINUX COMPONENTS

Overview of Unix/Linux Components

Special files

(usually found in /dev)

File formats and conventions,

e.g. /etc/passwd

Games

## Slide 5

System administration
commands

 (usually only for root)

 Kernel routines 

[Non standard]

Miscellaneous (including
macro packages and
conventions), e.g., man(7),
groff(7), man-pages(7)

OVERVIEW OF UNIX/LINUX COMPONENTS

Overview of Unix/Linux Components

Miscellaneous (including macro packages and conventions), e.g., man(7), groff(7), man-pages(7)

System administration commands

(usually only for root)

Kernel routines

[Non standard]

## Slide 6

The Linux man pages is a great resource for learning more about commands,
functions, files etc.

when someone wants to read about passwd, it could refer to the command,
or it could refer to the /etc/passwd file.

To view the section 

about the command

To view the section 

about the file

FOR EXAMPLE

man 1 passwd

man 5 passwd

For example

when someone wants to read about passwd, it could refer to the command, or it could refer to the /etc/passwd file.

To view the section

about the command

man 1 passwd

To view the section

about the file

man 5 passwd

The Linux man pages is a great resource for learning more about commands, functions, files etc.

## Slide 7

https://man7.org/linux/man-pages/index.html

To search for a specific string in the man pages, you should press / followed by the string you want to search for and then press enter. Pressing 'n' will take you to the next occurrence of the word and 'N' (capital n) to view previous occurrence. Once you're done reading, you can press 'q' to quit.

In case you don't have access to a terminal for some reason, 

there are also online man pages that have the same content:

To search for a specific string in the man pages, you should press / followed by the string you want to search for and then press enter. Pressing 'n' will take you to the next occurrence of the word and 'N' (capital n) to view previous occurrence. Once you're done reading, you can press 'q' to quit.

In case you don't have access to a terminal for some reason,

there are also online man pages that have the same content:

https://man7.org/linux/man-pages/index.html
