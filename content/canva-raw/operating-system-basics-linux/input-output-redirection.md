# Input/Output redirection

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGjcZq_Ojs/f4yyYclpHjzE9DZsrnjamQ/edit_

---

## Slide 1

INPUT/OUTPUT
REDIRECTION

Input/Output redirection

## Slide 2

Input and output in linux is distributed over three streams, they are:

INPUT/OUTPUT REDIRECTION

When we run a program, it takes input through stdin, and the terminal prints the
stdout and stderr stream.

0 or stdin (standard input)

stdin (input)

stdout (output)

stderr (error)

1 or stdout (standard output)

2 or stderr (standard error)

Input/Output redirection

Input and output in linux is distributed over three streams, they are:

0 or stdin (standard input)

1 or stdout (standard output)

2 or stderr (standard error)

When we run a program, it takes input through stdin, and the terminal prints the stdout and stderr stream.

stdin (input)

stdout (output)

stderr (error)

## Slide 3

quixel@pop-os:~/Desktop/test$ ls

hello.txt

quixel@pop-os:~/Desktop/test$ cat hello.txt 

Hello from linux!

To output a text file and see its contents in the terminal, we use the cat command. cat
stands for concatenate and can be used to concatenate 2 or more files and print
them; however, you can also just specify one file, and it prints that to the terminal.

cat

hello

To output a text file and see its contents in the terminal, we use the cat command. cat stands for concatenate and can be used to concatenate 2 or more files and print them; however, you can also just specify one file, and it prints that to the terminal.

quixel@pop-os:~/Desktop/test$ ls

hello.txt

quixel@pop-os:~/Desktop/test$ cat hello.txt

Hello from linux!

cat

hello

## Slide 4

To print directly to the terminal, we can use the echo command.

The echo command just prints whatever you type to stdout.

quixel@pop-os:~/Desktop/test$ echo "very
cool command"

very cool command

echo




very cool 

command

To print directly to the terminal, we can use the echo command.

quixel@pop-os:~/Desktop/test$ echo "very cool command"

very cool command

The echo command just prints whatever you type to stdout.

echo

very cool

command

## Slide 5

Linux allows you to write the data from a stream into a file; if the specified file does
not exist, then a new one is created

> - standard output

< - standard input

2> - standard error

>> - append stdout to file

<< - append stdin to file

2>> - Append strerr to file

STREAM REDIRECTION

> will overwrite the file

>> appends the file

Stream redirection

Linux allows you to write the data from a stream into a file; if the specified file does not exist, then a new one is created

> will overwrite the file

>> appends the file

> - standard output

< - standard input

2> - standard error

>> - append stdout to file

<< - append stdin to file

2>> - Append strerr to file

## Slide 6

Let's say I want to create a file with the contents "Hello World!", to achive this, we can
use the echo command to print it to stdout, then we redirect it to the file we want.

echo

Hello
World

quixel@pop-os:~/test$ echo "Hello World!" > hello.txt

quixel@pop-os:~/test$ ls

hello.txt

quixel@pop-os:~/test$ cat hello.txt 

Hello World!

Let's say I want to create a file with the contents "Hello World!", to achive this, we can use the echo command to print it to stdout, then we redirect it to the file we want.

echo

Hello World

quixel@pop-os:~/test$ echo "Hello World!" > hello.txt

quixel@pop-os:~/test$ ls

hello.txt

quixel@pop-os:~/test$ cat hello.txt

Hello World!

## Slide 7

Now to append to file,

quixel@pop-os:~/test$ echo "this line is appended to file" >> hello.txt 

quixel@pop-os:~/test$ cat hello.txt 

Hello World!

this line is appended to the file

Now to append to file,

quixel@pop-os:~/test$ echo "this line is appended to file" >> hello.txt

quixel@pop-os:~/test$ cat hello.txt

Hello World!

this line is appended to the file

## Slide 8

There's a special file that is /dev/null that is used to trash any data that is redirected
to it. This is often useful when you don't want to see the output or redirect any errors.

quixel@pop-os:~/test$ echo "hello" > /dev/null

quixel@pop-os:~/test$ cat /dev/null 

quixel@pop-os:~/test$ 

Output

Error

There's a special file that is /dev/null that is used to trash any data that is redirected to it. This is often useful when you don't want to see the output or redirect any errors.

Output

Error

quixel@pop-os:~/test$ echo "hello" > /dev/null

quixel@pop-os:~/test$ cat /dev/null

quixel@pop-os:~/test$

## Slide 9

To redirect errors, we can use 2>.So 2>/dev/null will
ensure that errors are not shown.

As you can see, ls: cannot open directory '/root': Permission denied is sent to the error stream,
which we then redirected with 2>. Notice that the stdout stream is printed to the terminal

quixel@pop-os:~/test$ ls /home

quixel

quixel@pop-os:~/test$ ls /root

ls: cannot open directory '/root': Permission denied

quixel@pop-os:~/test$ ls /home /root 

/home:

quixel

ls: cannot open directory '/root': Permission denied

quixel@pop-os:~/test$ ls /home /root 2>/dev/null

/home:

quixel

To redirect errors, we can use 2>.So 2>/dev/null will ensure that errors are not shown.

quixel@pop-os:~/test$ ls /home

quixel

quixel@pop-os:~/test$ ls /root

ls: cannot open directory '/root': Permission denied

quixel@pop-os:~/test$ ls /home /root

/home:

quixel

ls: cannot open directory '/root': Permission denied

quixel@pop-os:~/test$ ls /home /root 2>/dev/null

/home:

quixel

As you can see, ls: cannot open directory '/root': Permission denied is sent to the error stream, which we then redirected with 2>. Notice that the stdout stream is printed to the terminal

## Slide 10

LINUX PIPES

A pipe in Linux is used to redirect the stdout of a program to the stdin
of another program. 

stdout

Pipe in Linux

We take the output of a program and pass it as input to another program.

stdin

Linux Pipes

A pipe in Linux is used to redirect the stdout of a program to the stdin of another program.

stdout

Pipe in Linux

stdin

We take the output of a program and pass it as input to another program.

## Slide 11

There is a very useful command in linux that can be used to find words in a
file called grep. Most of the time you'll see it being used with a pipe.

It is also possible to redirect to 2 streams at the same time using the tee command.

The output of cat is being sent as input to our grep program, which then searches for
the string that we want and returns a result. We can also have multiple pipes.

EXAMPLE

quixel@pop-os:~$ cat /proc/meminfo | grep MemFree

MemFree:         7135800 kB

1

3

2

4

Example

There is a very useful command in linux that can be used to find words in a file called grep. Most of the time you'll see it being used with a pipe.

quixel@pop-os:~$ cat /proc/meminfo | grep MemFree

MemFree: 7135800 kB

The output of cat is being sent as input to our grep program, which then searches for the string that we want and returns a result. We can also have multiple pipes.

1

2

3

4

It is also possible to redirect to 2 streams at the same time using the tee command.

## Slide 12

lets say I wanted to view a log file on the terminal but I also need it to be stored for
future reference, Normally just piping the output will not display it on the terminal.

As you can see, I was able to send the output of ping to both the terminal
and the file called ping.log

EXAMPLE

quixel@pop-os:~/Desktop/test$ ping google.com | tee ping.log

PING google.com (142.250.196.174) 56(84) bytes of data.

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=1 ttl=117 time=20.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=2 ttl=117 time=31.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=3 ttl=117 time=32.4 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=4 ttl=117 time=40.2 ms

^C

quixel@pop-os:~/Desktop/test$ cat ping.log 

PING google.com (142.250.196.174) 56(84) bytes of data.

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=1 ttl=117 time=20.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=2 ttl=117 time=31.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=3 ttl=117 time=32.4 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=4 ttl=117 time=40.2 ms

Example

lets say I wanted to view a log file on the terminal but I also need it to be stored for future reference, Normally just piping the output will not display it on the terminal.

quixel@pop-os:~/Desktop/test$ ping google.com | tee ping.log

PING google.com (142.250.196.174) 56(84) bytes of data.

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=1 ttl=117 time=20.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=2 ttl=117 time=31.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=3 ttl=117 time=32.4 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=4 ttl=117 time=40.2 ms

^C

quixel@pop-os:~/Desktop/test$ cat ping.log

PING google.com (142.250.196.174) 56(84) bytes of data.

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=1 ttl=117 time=20.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=2 ttl=117 time=31.0 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=3 ttl=117 time=32.4 ms

64 bytes from maa03s47-in-f14.1e100.net (142.250.196.174): icmp_seq=4 ttl=117 time=40.2 ms

As you can see, I was able to send the output of ping to both the terminal and the file called ping.log
