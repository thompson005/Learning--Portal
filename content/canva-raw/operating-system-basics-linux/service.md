# Service

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGkCtPonII/9ss3aZF2Ut2U-MT0I7HZlg/edit_

---

## Slide 1

SERVICE

Service

## Slide 2

A service is a process or an application that is running in the background performing
a specified task or waiting for something to happen. The first process that runs
when your system starts up is systemd, it then starts up the rest of the processes
required to run the system. The 'd' means its a daemon, which is just a fancy way of
saying lightweight processes that run in the background.

System

 Boots Up

systemd Starts

Services

Services Run in
Background

d = Daemon = lightweight
background service

LINUX SERVICE MANAGEMENT

Linux Service Management

A service is a process or an application that is running in the background performing a specified task or waiting for something to happen. The first process that runs when your system starts up is systemd, it then starts up the rest of the processes required to run the system. The 'd' means its a daemon, which is just a fancy way of saying lightweight processes that run in the background.

d = Daemon = lightweight background service

System

Boots Up

systemd Starts

Services

Services Run in Background

## Slide 3

If you look at Unix/Linux history, you will find the first process which starts up, is also
known as init process. This process used to start other processes by using the rc files
from /etc/rc.d directory. In the modern Linux systems,

 systemd has replaced the init system.

LINUX SERVICE MANAGEMENT

systemd

init system

Linux Service Management

If you look at Unix/Linux history, you will find the first process which starts up, is also known as init process. This process used to start other processes by using the rc files from /etc/rc.d directory. In the modern Linux systems,

systemd has replaced the init system.

systemd

init system

## Slide 4

systemctl is the command line utility that we will use to control the
services running on our system.

lets take the sshd daemon, which is used to manage the ssh service(secure shell). 

To check the status of a service, we use the systemctl status command.

SYSTEMCTL

EXAMPLE

sshd daemon used to manage the
ssh service

systemctl status  used to 

check the status 

systemctl

systemctl is the command line utility that we will use to control the services running on our system.

example

lets take the sshd daemon, which is used to manage the ssh service(secure shell).

To check the status of a service, we use the systemctl status command.

sshd daemon used to manage the ssh service

systemctl status used to

check the status

## Slide 5

As you can see, the service
is active and listening on
port 22 for any incoming
connections. However,
most people don't use ssh
or don't want it enabled to
secure their systems. 

To stop a service, we can
use the systemctl stop
command.

quixel@pop-os:~/Desktop/nova$ sudo systemctl status sshd

 ssh.service - OpenBSD Secure Shell server

     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset:
enabled)

     Active: active (running) since Mon 2025-03-17 14:36:36 IST; 20s ago

       Docs: man:sshd(8)

             man:sshd_config(5)

   Main PID: 10690 (sshd)

      Tasks: 1 (limit: 18242)

     Memory: 1.8M

        CPU: 14ms

     CGroup: /system.slice/ssh.service

             └─10690 "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups"




Mar 17 14:36:36 pop-os systemd[1]: Starting OpenBSD Secure Shell server...

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on 0.0.0.0 port 22.

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on :: port 22.

Mar 17 14:36:36 pop-os systemd[1]: Started OpenBSD Secure Shell server.

As you can see, the service is active and listening on port 22 for any incoming connections. However, most people don't use ssh or don't want it enabled to secure their systems.

To stop a service, we can use the systemctl stop command.

quixel@pop-os:~/Desktop/nova$ sudo systemctl status sshd

ssh.service - OpenBSD Secure Shell server

Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)

Active: active (running) since Mon 2025-03-17 14:36:36 IST; 20s ago

Docs: man:sshd(8)

man:sshd_config(5)

Main PID: 10690 (sshd)

Tasks: 1 (limit: 18242)

Memory: 1.8M

CPU: 14ms

CGroup: /system.slice/ssh.service

└─10690 "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups"

Mar 17 14:36:36 pop-os systemd[1]: Starting OpenBSD Secure Shell server...

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on 0.0.0.0 port 22.

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on :: port 22.

Mar 17 14:36:36 pop-os systemd[1]: Started OpenBSD Secure Shell server.

## Slide 6

quixel@pop-os:~/Desktop/nova$ sudo systemctl status sshd

 ssh.service - OpenBSD Secure Shell server

     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset:
enabled)

     Active: inactive (dead) since Mon 2025-03-17 14:37:28 IST; 2s ago

       Docs: man:sshd(8)

             man:sshd_config(5)

    Process: 10690 ExecStart=/usr/sbin/sshd -D $SSHD_OPTS (code=exited,
status=0/SUCCESS)

   Main PID: 10690 (code=exited, status=0/SUCCESS)

        CPU: 16ms




Mar 17 14:36:36 pop-os systemd[1]: Starting OpenBSD Secure Shell server...

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on 0.0.0.0 port 22.

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on :: port 22.

Mar 17 14:36:36 pop-os systemd[1]: Started OpenBSD Secure Shell server.

Mar 17 14:37:28 pop-os systemd[1]: Stopping OpenBSD Secure Shell server...

Mar 17 14:37:28 pop-os sshd[10690]: Received signal 15; terminating.

Mar 17 14:37:28 pop-os systemd[1]: ssh.service: Deactivated successfully.

Mar 17 14:37:28 pop-os systemd[1]: Stopped OpenBSD Secure Shell server.

quixel@pop-os:~/Desktop/nova$ sudo systemctl status sshd

ssh.service - OpenBSD Secure Shell server

Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)

Active: inactive (dead) since Mon 2025-03-17 14:37:28 IST; 2s ago

Docs: man:sshd(8)

man:sshd_config(5)

Process: 10690 ExecStart=/usr/sbin/sshd -D $SSHD_OPTS (code=exited, status=0/SUCCESS)

Main PID: 10690 (code=exited, status=0/SUCCESS)

CPU: 16ms

Mar 17 14:36:36 pop-os systemd[1]: Starting OpenBSD Secure Shell server...

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on 0.0.0.0 port 22.

Mar 17 14:36:36 pop-os sshd[10690]: Server listening on :: port 22.

Mar 17 14:36:36 pop-os systemd[1]: Started OpenBSD Secure Shell server.

Mar 17 14:37:28 pop-os systemd[1]: Stopping OpenBSD Secure Shell server...

Mar 17 14:37:28 pop-os sshd[10690]: Received signal 15; terminating.

Mar 17 14:37:28 pop-os systemd[1]: ssh.service: Deactivated successfully.

Mar 17 14:37:28 pop-os systemd[1]: Stopped OpenBSD Secure Shell server.

## Slide 7

Enabling a service means that the service gets started as soon as the
system boots up. It is important to note that start makes the service run but
upon a reboot, the service won't be running unless you enable it.

sudo systemctl enable [service]

sudo systemctl disable [service]

To enable a service

To disable a service

ENABLING OR DISABLING SERVICES

Enabling or disabling services

Enabling a service means that the service gets started as soon as the system boots up. It is important to note that start makes the service run but upon a reboot, the service won't be running unless you enable it.

To enable a service

sudo systemctl enable [service]

To disable a service

sudo systemctl disable [service]
