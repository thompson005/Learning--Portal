# Navigation & working files

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGjcbyCb1Q/jQFtcdABD_LiJ33FjFDdOA/edit_

---

## Slide 1

NAVIGATION AND
WORKING WITH FILES

Navigation and working with files

## Slide 2

NAVIGATION AND WORKING WITH FILES

All these files are really nice and organized, 

but how exactly do we navigate them?

This is what you'll see in a typical terminal.

From left to right, we have: user@host: current directory $

quixel denotes username

pop-os dednotes hostname

~: denotes current directory

quixel@pop-os:~$ 

Navigation and working with files

All these files are really nice and organized,

but how exactly do we navigate them?

This is what you'll see in a typical terminal.

quixel@pop-os:~$

From left to right, we have: user@host: current directory $

quixel denotes username

pop-os dednotes hostname

~: denotes current directory

## Slide 3

What's with the weird squigly line, you ask? It's called a 'tilde' and denotes the current
user's home directory. In my case, it's/home/quixel, and as you have seen / it
represents the root directory.

Tilde (~) is a shortcut to your
personal home folder

Slash (/) is the base — the
starting point of everything

NAVIGATION AND WORKING WITH FILES

HOME DIRECTORY

~

/

ROOT DIRECTORY

Navigation and working with files

What's with the weird squigly line, you ask? It's called a 'tilde' and denotes the current user's home directory. In my case, it's/home/quixel, and as you have seen / it represents the root directory.

~

Home Directory

root Directory

/

Tilde (~) is a shortcut to your personal home folder

Slash (/) is the base — the starting point of everything

## Slide 4

COMMANDS

name_of_binary [options/arguments]

Commands in the shell are generally run in 

the following format:

Basic Format of Shell Commands

Commands

Basic Format of Shell Commands

Commands in the shell are generally run in

the following format:

name_of_binary [options/arguments]

## Slide 5

COMMANDS

Not all terminals display the current directory
we're in, so we can use the pwd command to
print the current working directory.

Use the command: pwd

It prints the current working directory

Helpful when the terminal doesn’t 

        show your location

Where Am I in the Terminal?

Commands

Where Am I in the Terminal?

Not all terminals display the current directory we're in, so we can use the pwd command to print the current working directory.

Use the command: pwd

It prints the current working directory

Helpful when the terminal doesn’t

show your location

## Slide 6

COMMANDS

To change directories, we can use

cd / → Go to the root directory

cd ~ → Go to your home directory

cd is the command, / or ~ are arguments




Move Between Folders Using cd

Commands

Move Between Folders Using cd

To change directories, we can use

cd / → Go to the root directory

cd ~ → Go to your home directory

cd is the command, / or ~ are arguments

## Slide 7

COMMANDS

We use the ls command. ls will print
the files in the current directory, and
ls [directory] will print the list of files
in the specified directory.




ls → Lists files in the current folder

ls [folder_name] → Lists files in a specific folder




See What’s Inside a Folder

Commands

See What’s Inside a Folder

We use the ls command. ls will print the files in the current directory, and ls [directory] will print the list of files in the specified directory.

ls → Lists files in the current folder

ls [folder_name] → Lists files in a specific folder

## Slide 8

ABSOLUTE AND RELATIVE FILE PATHS

There are two other common things you'll see besides '/' and '~'.

/home/quixel

/home

cd.

denotes the current
directory you're in

denotes the previous
directory

If I am in /home/quixel and I run cd .., I'll change the directory to /home. cd .
does nothing as it denotes the present directory.

Absolute and Relative file paths

There are two other common things you'll see besides '/' and '~'.

denotes the current directory you're in

denotes the previous directory

/home/quixel

/home

cd.

If I am in /home/quixel and I run cd .., I'll change the directory to /home. cd . does nothing as it denotes the present directory.

## Slide 9

ABSOLUTE PATH

An Absolute path denotes the location of a file from the root directory

Keep in mind that absolute paths will work from anywhere in the
filesystem while relative paths are just that...relative.

In this /home/quixel/github/ctf-challs/ is an absolute path.

quixel@pop-os:~/Desktop/github$ ls /home/quixel/Desktop/github/ctf-challs/

Crypto  Forensics  misc  OSINT  PWN  README.md  Reverse

Absolute Path

An Absolute path denotes the location of a file from the root directory

quixel@pop-os:~/Desktop/github$ ls /home/quixel/Desktop/github/ctf-challs/

Crypto Forensics misc OSINT PWN README.md Reverse

In this /home/quixel/github/ctf-challs/ is an absolute path.

Keep in mind that absolute paths will work from anywhere in the filesystem while relative paths are just that...relative.

## Slide 10

RELATIVE PATH

Relative path shows the location relative to your current directory.

./ctf-challs/ is a relative path, as it tells ls what folder to
show from my current directory.

quixel@pop-os:~/Desktop/github$ ls ./ctf-challs/

Crypto  Forensics  misc  OSINT  PWN  README.md  Reverse

Relative Path

Relative path shows the location relative to your current directory.

quixel@pop-os:~/Desktop/github$ ls ./ctf-challs/

Crypto Forensics misc OSINT PWN README.md Reverse

./ctf-challs/ is a relative path, as it tells ls what folder to show from my current directory.

## Slide 11

quixel@pop-os:~/Desktop/test$ touch text_file

quixel@pop-os:~/Desktop/test$ ls

text_file

CREATING FILES AND FOLDERS

To create a new file, we can use the
touch command. The touch is used
to update the timestamp of a file;
however, if the file specified does
not exist, it gets created.

Creating files and folders

To create a new file, we can use the touch command. The touch is used to update the timestamp of a file; however, if the file specified does not exist, it gets created.

quixel@pop-os:~/Desktop/test$ touch text_file

quixel@pop-os:~/Desktop/test$ ls

text_file

## Slide 12

quixel@pop-os:~/Desktop/test$ mkdir emptyDirectory

quixel@pop-os:~/Desktop/test$ ls

emptyDirectory  text_file




To create a new directory, we use
the mkdir command.

CREATING FILES AND FOLDERS

Creating files and folders

To create a new directory, we use the mkdir command.

quixel@pop-os:~/Desktop/test$ mkdir emptyDirectory

quixel@pop-os:~/Desktop/test$ ls

emptyDirectory text_file

## Slide 13

quixel@pop-os:~/Desktop/test/emptyDirectory$ touch file1 file2

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls

file1  file2

To go to the new folder we just created,
we can use cd emptyDirectory. Let's
create 2 new files here. file1 and file2.
touch command can create multiple
files at the same time like so.

CREATING FILES AND FOLDERS

Creating files and folders

To go to the new folder we just created, we can use cd emptyDirectory. Let's create 2 new files here. file1 and file2. touch command can create multiple files at the same time like so.

quixel@pop-os:~/Desktop/test/emptyDirectory$ touch file1 file2

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls

file1 file2

## Slide 14

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls

file1  file2

quixel@pop-os:~/Desktop/test/emptyDirectory$ rm file2 

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls

file1

To delete a file, we use the rm
command.

CREATING FILES AND FOLDERS

Creating files and folders

To delete a file, we use the rm command.

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls

file1 file2

quixel@pop-os:~/Desktop/test/emptyDirectory$ rm file2

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls

file1

## Slide 15

mv [source] [destination]

quixel@pop-os:~/Desktop/test/emptyDirectory$ mv file1 ../

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls ../

emptyDirectory  file1  text_file

To move files around, we can use 

the mv command.

Example

To move the file1 from emptyDirectory
to test, the previous directory

CREATING FILES AND FOLDERS

Creating files and folders

To move files around, we can use

the mv command.

mv [source] [destination]

Example

To move the file1 from emptyDirectory to test, the previous directory

quixel@pop-os:~/Desktop/test/emptyDirectory$ mv file1 ../

quixel@pop-os:~/Desktop/test/emptyDirectory$ ls ../

emptyDirectory file1 text_file

## Slide 16

quixel@pop-os:~/Desktop/test$ rm -r emptyDirectory/

quixel@pop-os:~/Desktop/test$ ls

file1  text_file

To copy the file, we can use cp with the
same syntax as mv.

To remove an entire directory with all
the files, we can use the -r option to
delete files recursively.

CREATING FILES AND FOLDERS

Creating files and folders

To copy the file, we can use cp with the same syntax as mv.

To remove an entire directory with all the files, we can use the -r option to delete files recursively.

quixel@pop-os:~/Desktop/test$ rm -r emptyDirectory/

quixel@pop-os:~/Desktop/test$ ls

file1 text_file

## Slide 17

There are two primary commands we can use to find files, find and locate. To
locate commands, we can use which.

FINDING FILES

FIND

LOCATE

Finding Files

There are two primary commands we can use to find files, find and locate. To locate commands, we can use which.

Find

locate

## Slide 18

This command searches the entire filesystem for a file named index.html.

find is a very versatile command that can be used to find files based on many criteria,
such as creation time, permissions, name, etc.

FIND

A basic usage of find:

find / -type f -name index.html 

find

find is a very versatile command that can be used to find files based on many criteria, such as creation time, permissions, name, etc.

A basic usage of find:

find / -type f -name index.html

This command searches the entire filesystem for a file named index.html.

## Slide 19

Both of these commands essentially do the same thing, but what if you only wanted
files created after a certain date or owned by a certain user? That's where find is
more useful than locate.

Find allows for specifying a lot of options; however, if you just want to search by
name, we can use the locate command.

LOCATE

locate index.html

Locate

Find allows for specifying a lot of options; however, if you just want to search by name, we can use the locate command.

locate index.html

Both of these commands essentially do the same thing, but what if you only wanted files created after a certain date or owned by a certain user? That's where find is more useful than locate.
