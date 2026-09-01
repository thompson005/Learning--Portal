# Linux Process Management

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGjcc6vtWQ/VRz2Flp9SVezVCZmZNx2iw/edit_

---

## Slide 1

LINUX PROCESS
MANAGEMENT

Linux Process Management

## Slide 2

LINUX PROCESS MANAGEMENT

To list the running processes, we use the ps command, which stands for process
status. By default, it shows processes running in the Linux.

quixel@pop-os:~$ ps

    PID TTY          TIME CMD

   4560 pts/1    00:00:00 bash

   4568 pts/1    00:00:00 ps

Linux Process Management

To list the running processes, we use the ps command, which stands for process status. By default, it shows processes running in the Linux.

quixel@pop-os:~$ ps

PID TTY TIME CMD

4560 pts/1 00:00:00 bash

4568 pts/1 00:00:00 ps

## Slide 3

EXAMPLE

As ps is a very old utility, its usage is a bit of a mess. 

There are two ways to specify arguments.

we just have bash and the ps process itself. Each process also has a Process Id(PID),
which is a number that uniquely identifies every running process in a Linux
environment. We also see the terminal on which the commands are running 

(in this case, the designation pts/1).

example

we just have bash and the ps process itself. Each process also has a Process Id(PID), which is a number that uniquely identifies every running process in a Linux environment. We also see the terminal on which the commands are running

(in this case, the designation pts/1).

As ps is a very old utility, its usage is a bit of a mess.

There are two ways to specify arguments.

## Slide 4

STANDARD" SYNTAX

"BSD" SYNTAX

In this syntax, you can use -e to list
"every" process and -f for a "full
format" output, including
arguments. These can be combined
into a single argument -ef.

In this syntax, you can use a to list
processes for all users, x to list
processes that aren't running in a
terminal, and u for a "user-readable"
output. These can be combined into
a single argument aux

Standard" Syntax

"BSD" Syntax

In this syntax, you can use -e to list "every" process and -f for a "full format" output, including arguments. These can be combined into a single argument -ef.

In this syntax, you can use a to list processes for all users, x to list processes that aren't running in a terminal, and u for a "user-readable" output. These can be combined into a single argument aux

## Slide 5

quixel@pop-os:~$ ps -aux

USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND

root           1  0.1  0.0 166868 11344 ?        Ss   18:19   0:01 /sbin/init splash

root           2  0.0  0.0      0     0 ?        S    18:19   0:00 [kthreadd]

root           3  0.0  0.0      0     0 ?        S    18:19   0:00 [pool_workqueue_release]

root           4  0.0  0.0      0     0 ?        I<   18:19   0:00 [kworker/R-rcu_g]

root           5  0.0  0.0      0     0 ?        I<   18:19   0:00 [kworker/R-slub_]

root           6  0.0  0.0      0     0 ?        I<   18:19   0:00 [kworker/R-netns]

root           8  0.0  0.0      0     0 ?        I    18:19   0:00 [kworker/0:1-events]

root           9  0.0  0.0      0     0 ?        I<   18:19   0:00 [kworker/0:0H-events_highpri]

root          10  0.6  0.0      0     0 ?        I    18:19   0:05 [kworker/u64:0-kcryptd/252:0]

....

quixel@pop-os:~$ ps -aux

USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND

root 1 0.1 0.0 166868 11344 ? Ss 18:19 0:01 /sbin/init splash

root 2 0.0 0.0 0 0 ? S 18:19 0:00 [kthreadd]

root 3 0.0 0.0 0 0 ? S 18:19 0:00 [pool_workqueue_release]

root 4 0.0 0.0 0 0 ? I< 18:19 0:00 [kworker/R-rcu_g]

root 5 0.0 0.0 0 0 ? I< 18:19 0:00 [kworker/R-slub_]

root 6 0.0 0.0 0 0 ? I< 18:19 0:00 [kworker/R-netns]

root 8 0.0 0.0 0 0 ? I 18:19 0:00 [kworker/0:1-events]

root 9 0.0 0.0 0 0 ? I< 18:19 0:00 [kworker/0:0H-events_highpri]

root 10 0.6 0.0 0 0 ? I 18:19 0:05 [kworker/u64:0-kcryptd/252:0]

....

## Slide 6

To kill or terminate a process in Linux, we use the kill command and pass its
PID(Process identifier) as an argument. 

For example, let's say I have a sleep process running in another terminal.

To find its PID, we can use the grep command with ps -e to find it, and use the kill
command to terminate the process.

TERMINATING PROCESSES

quixel@pop-os:~$ sleep 1000

quixel@pop-os:~$ ps -e | grep sleep

   4667 pts/1    00:00:00 sleep

quixel@pop-os:~$ kill 4667

quixel@pop-os:~$ ps -e | grep sleep

quixel@pop-os:~$ 

Terminating processes

To kill or terminate a process in Linux, we use the kill command and pass its PID(Process identifier) as an argument.

For example, let's say I have a sleep process running in another terminal.

quixel@pop-os:~$ sleep 1000

To find its PID, we can use the grep command with ps -e to find it, and use the kill command to terminate the process.

quixel@pop-os:~$ ps -e | grep sleep

4667 pts/1 00:00:00 sleep

quixel@pop-os:~$ kill 4667

quixel@pop-os:~$ ps -e | grep sleep

quixel@pop-os:~$

## Slide 7

Sometimes, you just want to get rid of the process that's clogging up

 your terminal. Terminals have a hotkey for this: Ctrl+C sends an "interrupt" to 

whatever application is waiting on input in the terminal and typically, 

this will cause a process to exit cleanly.

INTERRUPTING PROCESSES

quixel@pop-os:~$ sleep 1000

^C

quixel@pop-os:~$ 

A process is running and
waiting in the terminal

User presses Ctrl+C to
sends an interrupt signal

Process is stopped,
terminal is ready again

Interrupting processes

Sometimes, you just want to get rid of the process that's clogging up

your terminal. Terminals have a hotkey for this: Ctrl+C sends an "interrupt" to

whatever application is waiting on input in the terminal and typically,

this will cause a process to exit cleanly.

quixel@pop-os:~$ sleep 1000

^C

quixel@pop-os:~$

A process is running and waiting in the terminal

User presses Ctrl+C to sends an interrupt signal

Process is stopped, terminal is ready again

## Slide 8

If you want your terminal back without terminating the process, you can suspend it
using Ctrl+Z. You can then resume the process using the built-in command fg

SUSPENDING AND RESUMING PROCESSES

quixel@pop-os:~$ sleep 2000

^Z

[1]+  Stopped                               sleep 2000

quixel@pop-os:~$ fg

sleep 2000

^C

User suspends the process.
Terminal becomes free.

Brings the suspended process
back to the foreground.

Cmd

fg

Suspending and resuming processes

If you want your terminal back without terminating the process, you can suspend it using Ctrl+Z. You can then resume the process using the built-in command fg

quixel@pop-os:~$ sleep 2000

^Z

[1]+ Stopped sleep 2000

quixel@pop-os:~$ fg

sleep 2000

^C

User suspends the process. Terminal becomes free.

Cmd

fg

Brings the suspended process back to the foreground.

## Slide 9

BACKGROUND PROCESSES

Once you have suspended a process, you can resume it in the Background with the bg
command. This will allow the process to keep running while giving your 

shell to invoke more commands.

quixel@pop-os:~$ sleep 2000

^Z

[1]+  Stopped                 sleep 2000

quixel@pop-os:~$ bg

[1]+ sleep 2000 &

Process is paused using Ctrl+Z

User resumes the process in the
background

Process continues

Background processes

Once you have suspended a process, you can resume it in the Background with the bg command. This will allow the process to keep running while giving your

shell to invoke more commands.

quixel@pop-os:~$ sleep 2000

^Z

[1]+ Stopped sleep 2000

quixel@pop-os:~$ bg

[1]+ sleep 2000 &

Process is paused using Ctrl+Z

User resumes the process in the background

Process continues

## Slide 10

The sleep command is still running, just in the background. You can also directly start a
process in the background by appending & at the end of the command, like Sometimes

It also gives you the PID of the process so that you can keep track of it.

quixel@pop-os:~$ sleep 2000 &

[3] 5565

The sleep command is still running, just in the background. You can also directly start a process in the background by appending & at the end of the command, like Sometimes

quixel@pop-os:~$ sleep 2000 &

[3] 5565

It also gives you the PID of the process so that you can keep track of it.

## Slide 11

commands that succeed typically return 0 and commands that fail
typically return a non-zero value, most commonly 1 but sometimes an error
code that identifies a specific failure mode

Every process exits with an exit code when it finishes running and terminates. This can
be used by the shell or the user to tell if a process succeeded in its functionality. 

You can access the exit code of the most recently terminated command using the
special? Variable (don't forget to prepend it with $ to read its value!):

PROCESS EXIT CODES

quixel@pop-os:~$ touch test-file

quixel@pop-os:~$ echo $?

0

Process Exit codes

Every process exits with an exit code when it finishes running and terminates. This can be used by the shell or the user to tell if a process succeeded in its functionality.

You can access the exit code of the most recently terminated command using the special? Variable (don't forget to prepend it with $ to read its value!):

quixel@pop-os:~$ touch test-file

quixel@pop-os:~$ echo $?

0

commands that succeed typically return 0 and commands that fail typically return a non-zero value, most commonly 1 but sometimes an error code that identifies a specific failure mode

## Slide 12

Both top and btop are command line utilities for monitoring processes and resource
usage. 

btop is an enhanced version of top, offering a more user-friendly interface with color
coded display, mouse support, and more features.

TOP AND BTOP

TOP

BTOP

top and btop

Both top and btop are command line utilities for monitoring processes and resource usage.

btop

top

btop is an enhanced version of top, offering a more user-friendly interface with color coded display, mouse support, and more features.

## Slide 13

top - 18:53:49 up 34 min,  1 user,  load average: 2.12, 1.72, 1.15

Tasks: 411 total,   2 running, 409 sleeping,   0 stopped,   0 zombie

%Cpu(s):  1.8 us,  1.8 sy,  8.9 ni, 87.1 id,  0.1 wa,  0.0 hi,  0.4 si,  0.0 st

MiB Mem :  15289.7 total,   8339.9 free,   4025.8 used,   2924.0 buff/cache

MiB Swap:  19385.5 total,  19385.5 free,      0.0 used.  10213.4 avail Mem 




    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                                                                                              

   5023 quixel    26   6 1159.6g 633280 134784 R  82.5   4.0   7:52.13 spotify                                                                                                              

   4919 quixel    26   6   35.4g 229516 126496 S  63.4   1.5   7:07.35 spotify                                                                                                              

   2304 quixel    17  -3   25.3g 188848 122328 S  19.1   1.2   2:44.14 Xorg                                                                                                                 

   2470 quixel    17  -3 5777852 369752 162432 S  18.8   2.4   1:40.76 gnome-shell                                                                                                          

   3050 quixel    26   6   11.7g 620088 298296 S   5.3   4.0   5:08.22 firefox-bin                                                                                                          

   4158 quixel    29   9  608964  59920  42172 S   3.0   0.4   0:31.15 gnome-terminal-                                                                                                      

   4893 quixel    26   6 5143852 333912 195008 S   2.6   2.1   0:31.78 spotify                                                                                                              

   3294 quixel    26   6 2660852 236052 107260 S   1.7   1.5   0:46.77 Isolated Web Co                                                                                                      

    730 root      20   0       0      0      0 D   1.3   0.0   0:05.49 kworker/u64:9+events_unbound                                                                                         

   4250 quixel    20   0   78596  55868  11008 S   1.3   0.4   1:00.76 nvim                                                                                                                 

   1118 root      32  12  332820  14080  12288 S   1.0   0.1   0:04.03 touchegg                                                                                                             

   2278 quixel     5 -15  132020  25424   8276 S   1.0   0.2   0:31.84 pipewire-pulse                                                                                                       

   4104 root      20   0       0      0      0 I   1.0   0.0   0:03.51 kworker/u64:1-gfx_0.0.0                                                                                              

   2273 quixel     5 -15  128352  15128   8916 S   0.7   0.1   0:18.03 pipewire

Here's a sample output of top from my system:

top - 18:53:49 up 34 min, 1 user, load average: 2.12, 1.72, 1.15

Tasks: 411 total, 2 running, 409 sleeping, 0 stopped, 0 zombie

%Cpu(s): 1.8 us, 1.8 sy, 8.9 ni, 87.1 id, 0.1 wa, 0.0 hi, 0.4 si, 0.0 st

MiB Mem : 15289.7 total, 8339.9 free, 4025.8 used, 2924.0 buff/cache

MiB Swap: 19385.5 total, 19385.5 free, 0.0 used. 10213.4 avail Mem

PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND

5023 quixel 26 6 1159.6g 633280 134784 R 82.5 4.0 7:52.13 spotify

4919 quixel 26 6 35.4g 229516 126496 S 63.4 1.5 7:07.35 spotify

2304 quixel 17 -3 25.3g 188848 122328 S 19.1 1.2 2:44.14 Xorg

2470 quixel 17 -3 5777852 369752 162432 S 18.8 2.4 1:40.76 gnome-shell

3050 quixel 26 6 11.7g 620088 298296 S 5.3 4.0 5:08.22 firefox-bin

4158 quixel 29 9 608964 59920 42172 S 3.0 0.4 0:31.15 gnome-terminal-

4893 quixel 26 6 5143852 333912 195008 S 2.6 2.1 0:31.78 spotify

3294 quixel 26 6 2660852 236052 107260 S 1.7 1.5 0:46.77 Isolated Web Co

730 root 20 0 0 0 0 D 1.3 0.0 0:05.49 kworker/u64:9+events_unbound

4250 quixel 20 0 78596 55868 11008 S 1.3 0.4 1:00.76 nvim

1118 root 32 12 332820 14080 12288 S 1.0 0.1 0:04.03 touchegg

2278 quixel 5 -15 132020 25424 8276 S 1.0 0.2 0:31.84 pipewire-pulse

4104 root 20 0 0 0 0 I 1.0 0.0 0:03.51 kworker/u64:1-gfx_0.0.0

2273 quixel 5 -15 128352 15128 8916 S 0.7 0.1 0:18.03 pipewire

Here's a sample output of top from my system:
