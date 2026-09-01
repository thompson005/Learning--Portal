# Networking Commands

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGjcX56weI/UWDjMG5he1swjAXqkwSGBA/edit_

---

## Slide 1

NETWORKING
COMMANDS

Networking Commands

## Slide 2

Knowing networking commands is an important part of system
administration/cybersecurity when it comes to Linux.

These two utilities have mostly been replaced by the ip command, but you'll still see
them being used quite a lot.




The ip a command will show you information about your network interfaces.

NETWORKING COMMANDS

There are two primary utilities that you will use to display network information:

iwconfig

ifconfig

to display information about wireless interfaces.

to display information about/configure network interfaces.

Networking Commands

Knowing networking commands is an important part of system administration/cybersecurity when it comes to Linux.

There are two primary utilities that you will use to display network information:

iwconfig

to display information about wireless interfaces.

ifconfig

to display information about/configure network interfaces.

These two utilities have mostly been replaced by the ip command, but you'll still see them being used quite a lot.

The ip a command will show you information about your network interfaces.

## Slide 3

quixel@pop-os:~/Desktop/github/Bridge_presentations/Operating_System_basics/Linux$ ip a

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000

    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

    inet 127.0.0.1/8 scope host lo

       valid_lft forever preferred_lft forever

    inet6 ::1/128 scope host 

       valid_lft forever preferred_lft forever

2: enp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000

    link/ether 74:d4:dd:74:cb:69 brd ff:ff:ff:ff:ff:ff

3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000

    link/ether 28:d0:43:85:20:25 brd ff:ff:ff:ff:ff:ff

    inet 192.168.22.5/24 brd 192.168.22.255 scope global dynamic noprefixroute wlp4s0

       valid_lft 1865sec preferred_lft 1865sec

    inet6 2401:4900:9275:9430:4187:a004:ac9e:6e03/64 scope global temporary dynamic 

       valid_lft 6189sec preferred_lft 6189sec

    inet6 2401:4900:9275:9430:5e9c:9ae:63ca:bc2e/64 scope global dynamic mngtmpaddr noprefixroute 

       valid_lft 6189sec preferred_lft 6189sec

    inet6 fe80::fc1a:208a:1237:a54d/64 scope link noprefixroute 

       valid_lft forever preferred_lft forever

quixel@pop-os:~/Desktop/github/Bridge_presentations/Operating_System_basics/Linux$ ip a

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000

link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

inet 127.0.0.1/8 scope host lo

valid_lft forever preferred_lft forever

inet6 ::1/128 scope host

valid_lft forever preferred_lft forever

2: enp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000

link/ether 74:d4:dd:74:cb:69 brd ff:ff:ff:ff:ff:ff

3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000

link/ether 28:d0:43:85:20:25 brd ff:ff:ff:ff:ff:ff

inet 192.168.22.5/24 brd 192.168.22.255 scope global dynamic noprefixroute wlp4s0

valid_lft 1865sec preferred_lft 1865sec

inet6 2401:4900:9275:9430:4187:a004:ac9e:6e03/64 scope global temporary dynamic

valid_lft 6189sec preferred_lft 6189sec

inet6 2401:4900:9275:9430:5e9c:9ae:63ca:bc2e/64 scope global dynamic mngtmpaddr noprefixroute

valid_lft 6189sec preferred_lft 6189sec

inet6 fe80::fc1a:208a:1237:a54d/64 scope link noprefixroute

valid_lft forever preferred_lft forever

## Slide 4

The lo is a loopback adapter that is mostly used for troubleshooting.

The enp3s0 is my wired adapter, that is ethernet.

The wlp4s0 is my wireless adapter that is connected to the internet.

My current private ipv4 is 192.168.22.5 on a /24 subnet(don't worry about
subnetting for now). This is used to identify my device uniquely on the
network.

I also have an ipv6 address assigned.

The output of ifconfig will be pretty similar to what you see here, iwconfig will provide
more detailed information about your adapters.

The lo is a loopback adapter that is mostly used for troubleshooting.

The enp3s0 is my wired adapter, that is ethernet.

The wlp4s0 is my wireless adapter that is connected to the internet.

My current private ipv4 is 192.168.22.5 on a /24 subnet(don't worry about subnetting for now). This is used to identify my device uniquely on the network.

I also have an ipv6 address assigned.

The output of ifconfig will be pretty similar to what you see here, iwconfig will provide more detailed information about your adapters.

## Slide 5

Netstat stands for Network Statistics and is a tool used for troubleshooting and
configuration and can also serve as a monitoring tool for connections 

over the network.

A socket is a file that allows for two processes to communicate, either locally or over
a network. Think of it as a door that allows other people to come in and you to go out.

NETSTAT

Netstat

Netstat stands for Network Statistics and is a tool used for troubleshooting and configuration and can also serve as a monitoring tool for connections

over the network.

A socket is a file that allows for two processes to communicate, either locally or over a network. Think of it as a door that allows other people to come in and you to go out.

## Slide 6

To list all listening sockets, using both TCP and UDP, we use the netstat - a command.

quixel@pop-os:~$ netstat -a

Active Internet connections (servers and established)

Proto Recv-Q Send-Q Local Address           Foreign Address         State      

tcp        0      0 localhost:domain        0.0.0.0:*               LISTEN     

tcp        0      0 pop-os:domain           0.0.0.0:*               LISTEN     

tcp        0      0 localhost:ipp           0.0.0.0:*               LISTEN     

tcp        0      0 pop-os:55928            maa03s26-in-f4.1e:https ESTABLISHED

tcp        0      0 pop-os:57948            maa05s25-in-f14.1:https ESTABLISHED

tcp        0      0 pop-os:52032            maa03s46-in-f10.1:https ESTABLISHED

......

To list all listening sockets, using both TCP and UDP, we use the netstat - a command.

quixel@pop-os:~$ netstat -a

Active Internet connections (servers and established)

Proto Recv-Q Send-Q Local Address Foreign Address State

tcp 0 0 localhost:domain 0.0.0.0:* LISTEN

tcp 0 0 pop-os:domain 0.0.0.0:* LISTEN

tcp 0 0 localhost:ipp 0.0.0.0:* LISTEN

tcp 0 0 pop-os:55928 maa03s26-in-f4.1e:https ESTABLISHED

tcp 0 0 pop-os:57948 maa05s25-in-f14.1:https ESTABLISHED

tcp 0 0 pop-os:52032 maa03s46-in-f10.1:https ESTABLISHED

......

## Slide 7

This prints a lot of information, the -t option gives you a much more user-friendly
readout of TCP connections only.

To list only UDP connections, you can use the -u flag.

To list actively listening ports, use the -l flag.

There are a lot more options you can use with netstat that you can read 

about in the man pages.

You'll mostly be using netstat in combination with grep, so make sure you're familiar
with using Linux pipes. While in recent years, netstat has been deprecated in favor of
the ss command, you may still find it in your networking toolbox.

This prints a lot of information, the -t option gives you a much more user-friendly readout of TCP connections only.

To list only UDP connections, you can use the -u flag.

To list actively listening ports, use the -l flag.

There are a lot more options you can use with netstat that you can read

about in the man pages.

You'll mostly be using netstat in combination with grep, so make sure you're familiar with using Linux pipes. While in recent years, netstat has been deprecated in favor of the ss command, you may still find it in your networking toolbox.

## Slide 8

Tcpdump is a command-line utility that allows you to capture and analyze network
traffic going through your system. It is often used to help troubleshoot network
issues, as well as a security tool.

To begin, use the command tcpdump --list-interfaces(-D for short) to see the
interfaces available for capture.

TCPDUMP

quixel@pop-os:~$ sudo tcpdump -D

[sudo] password for quixel: 

1.wlp4s0 [Up, Running, Wireless, Associated]

2.any (Pseudo-device that captures on all interfaces) [Up, Running]

3.lo [Up, Running, Loopback]

4.enp3s0 [Up, Disconnected]

TCPdump

Tcpdump is a command-line utility that allows you to capture and analyze network traffic going through your system. It is often used to help troubleshoot network issues, as well as a security tool.

To begin, use the command tcpdump --list-interfaces(-D for short) to see the interfaces available for capture.

quixel@pop-os:~$ sudo tcpdump -D

[sudo] password for quixel:

1.wlp4s0 [Up, Running, Wireless, Associated]

2.any (Pseudo-device that captures on all interfaces) [Up, Running]

3.lo [Up, Running, Loopback]

4.enp3s0 [Up, Disconnected]

## Slide 9

To capture on all interfaces, we can just specify any.

sudo tcpdump --interface any




quixel@pop-os:~$ sudo tcpdump --interface any

tcpdump: data link type LINUX_SLL2

tcpdump: verbose output suppressed, use -v[v]... for full protocol decode

listening on any, link-type LINUX_SLL2 (Linux cooked v2), snapshot length 262144 bytes

14:22:59.176004 wlp4s0 M   IP6 fe80::8493:deff:fe06:13db > ff02::2: ICMP6, router solicitation, length 16

14:22:59.176007 wlp4s0 M   IP 10.1.5.171.mdns > mdns.mcast.net.mdns: 0 PTR (QU)? _ipp._tcp.local. (33)

14:22:59.176064 wlp4s0 M   IP6 fe80::1fa0:a45d:4253:6f5a.mdns > ff02::fb.mdns: 0 PTR (QU)? _ipp._tcp.local. (33)

14:22:59.176068 wlp4s0 M   IP 10.1.5.171.mdns > mdns.mcast.net.mdns: 0 PTR (QU)? _ipps._tcp.local. (34)

14:22:59.176088 wlp4s0 M   IP6 fe80::1fa0:a45d:4253:6f5a.mdns > ff02::fb.mdns: 0 PTR (QU)? _ipps._tcp.local. (34)

14:22:59.176090 wlp4s0 B   ARP, Request who-has 10.1.11.218 tell 10.1.11.59, length 46

14:22:59.176100 wlp4s0 B   ARP, Reply 10.1.5.77 is-at 62:07:31:84:62:12 (oui Unknown), length 46

14:22:59.176101 wlp4s0 M   IP6 fe80::1c47:f4ff:fe05:4b2c > ff02::16: HBH ICMP6, multicast listener report v2, 1 group
record(s), length 28




-- MORE OUTPUT --




37 packets captured

1350 packets received by filter

659 packets dropped by kernel

To capture on all interfaces, we can just specify any.

sudo tcpdump --interface any

quixel@pop-os:~$ sudo tcpdump --interface any

tcpdump: data link type LINUX_SLL2

tcpdump: verbose output suppressed, use -v[v]... for full protocol decode

listening on any, link-type LINUX_SLL2 (Linux cooked v2), snapshot length 262144 bytes

14:22:59.176004 wlp4s0 M IP6 fe80::8493:deff:fe06:13db > ff02::2: ICMP6, router solicitation, length 16

14:22:59.176007 wlp4s0 M IP 10.1.5.171.mdns > mdns.mcast.net.mdns: 0 PTR (QU)? _ipp._tcp.local. (33)

14:22:59.176064 wlp4s0 M IP6 fe80::1fa0:a45d:4253:6f5a.mdns > ff02::fb.mdns: 0 PTR (QU)? _ipp._tcp.local. (33)

14:22:59.176068 wlp4s0 M IP 10.1.5.171.mdns > mdns.mcast.net.mdns: 0 PTR (QU)? _ipps._tcp.local. (34)

14:22:59.176088 wlp4s0 M IP6 fe80::1fa0:a45d:4253:6f5a.mdns > ff02::fb.mdns: 0 PTR (QU)? _ipps._tcp.local. (34)

14:22:59.176090 wlp4s0 B ARP, Request who-has 10.1.11.218 tell 10.1.11.59, length 46

14:22:59.176100 wlp4s0 B ARP, Reply 10.1.5.77 is-at 62:07:31:84:62:12 (oui Unknown), length 46

14:22:59.176101 wlp4s0 M IP6 fe80::1c47:f4ff:fe05:4b2c > ff02::16: HBH ICMP6, multicast listener report v2, 1 group record(s), length 28

-- MORE OUTPUT --

37 packets captured

1350 packets received by filter

659 packets dropped by kernel

## Slide 10

Tcpdump continues to capture packets until it receives an interrupt signal. 

You can interrupt capturing by pressing Ctrl+C. To limit to a certain number of
packets, we can use the -c option(count).

By default, tcpdump resolves IP addresses and ports into names, as shown in the
previous example. When troubleshooting network issues, it is often easier to use the
IP addresses and port numbers; disable name resolution by using 

the option -n and port resolution with -nn

To capture 1000 packets:

sudo tcpdump -i any -c 1000

For Example

Name Resolution

Simplifies understanding 

with names

Provides precise data
with numbers

No Resolution

Tcpdump continues to capture packets until it receives an interrupt signal.

You can interrupt capturing by pressing Ctrl+C. To limit to a certain number of packets, we can use the -c option(count).

For Example

To capture 1000 packets:

sudo tcpdump -i any -c 1000

Name Resolution

Simplifies understanding

with names

No Resolution

Provides precise data with numbers

By default, tcpdump resolves IP addresses and ports into names, as shown in the previous example. When troubleshooting network issues, it is often easier to use the IP addresses and port numbers; disable name resolution by using

the option -n and port resolution with -nn

## Slide 11

Tcpdump is capable of capturing and decoding many different protocols, such as TCP,
UDP, ICMP, and many more. Let's try to understand the output format of the TCP
packet. You can read more about it in the man pages.

TCP Packet Output

TCP Protocol

UDP Protocol

ICMP Protocol

Other Protocol

Tcpdump is capable of capturing and decoding many different protocols, such as TCP, UDP, ICMP, and many more. Let's try to understand the output format of the TCP packet. You can read more about it in the man pages.

TCP Packet Output

TCP Protocol

UDP Protocol

ICMP Protocol

Other Protocol

## Slide 12

You can also filter the packets using various criteria such as
protocol,host,port,source ip etc. To save to a file, you can use the -w
option (saved in .pcap format).

*That's a lot of info. A detailed explanation will take too long and I recommend
you read the man pages.

[timestamp]  [interface] [link type] [network layer protocol](IP in this case) [source ip and
port] [destination ip and port] [TCP flags] [sequence number] [ack number] [window size]
[length] 

The general format is:

The general format is:

[timestamp] [interface] [link type] [network layer protocol](IP in this case) [source ip and port] [destination ip and port] [TCP flags] [sequence number] [ack number] [window size] [length]

*That's a lot of info. A detailed explanation will take too long and I recommend you read the man pages.

You can also filter the packets using various criteria such as protocol,host,port,source ip etc. To save to a file, you can use the -w option (saved in .pcap format).

## Slide 13

iptables is a command line utility for configuring the built-in Linux kernel firewall.

iptables uses rules to determine what to do with a network packet. The utility consists
of the following components:

Tables are files that
group similar rules. A
table consists of
several rule chains.

A chain is a string of 

rules. When a packet is
received, iptables finds
the appropriate table and
filters it through the rule
chain until it finds a match.

A rule is a statement
that defines the
conditions for matching
a packet, which is then
sent to a target.

A target is a decision
of what to do with a
packet. The packet is
either accepted,
dropped, or rejected.

IPTABLES

TABLES

CHAINS

RULES

TARGETS

HOW DOES IPTABLES WORK?

iptables

iptables is a command line utility for configuring the built-in Linux kernel firewall.

How Does iptables Work?

iptables uses rules to determine what to do with a network packet. The utility consists of the following components:

Tables

Chains

Rules

Targets

Tables are files that group similar rules. A table consists of several rule chains.

A chain is a string of

rules. When a packet is received, iptables finds the appropriate table and filters it through the rule chain until it finds a match.

A rule is a statement that defines the conditions for matching a packet, which is then sent to a target.

A target is a decision of what to do with a packet. The packet is either accepted, dropped, or rejected.

## Slide 14

sudo iptables -L 

sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

To view the current rule, we can use

Allow incoming SSH(secure shell) traffic

To view the current rule, we can use

sudo iptables -L

Allow incoming SSH(secure shell) traffic

sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
