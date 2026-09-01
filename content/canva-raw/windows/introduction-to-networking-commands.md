# Introduction to Networking Commands

_Category: Windows — Source: https://www.canva.com/design/DAGn-hJxWdM/rTPOLKJpllt337593YREMA/edit_

---

## Slide 1

INTRODUCTION TO
NETWORKING
COMMANDS

Introduction to Networking Commands

## Slide 2

Networking commands are essential tools for diagnosing, configuring, and
troubleshooting network-related issues. They allow users to interact with and
manage network interfaces, connections, and DNS settings effectively. 

Below is an overview of some commonly used networking commands:

INTRODUCTION TO NETWORKING COMMANDS

netstat

ipconfig

Get-NetIPConfiguration

nslookup

Resolve-DnsName

Get-NetTCPConnection

Introduction to Networking Commands

Networking commands are essential tools for diagnosing, configuring, and troubleshooting network-related issues. They allow users to interact with and manage network interfaces, connections, and DNS settings effectively.

Below is an overview of some commonly used networking commands:

ipconfig

netstat

Get-NetTCPConnection

Get-NetIPConfiguration

nslookup

Resolve-DnsName

## Slide 3

ipconfig is a command-line tool in Windows that displays and manages 

the IP configuration of a computer's network interfaces.

IPCONFIG

ipconfig

ipconfig is a command-line tool in Windows that displays and manages

the IP configuration of a computer's network interfaces.

## Slide 4

Displays the current IP
address, subnet mask,
and default gateway.

Can release or renew
DHCP-assigned IP
addresses.

Flushes and displays
DNS cache.

KEY FEATURES

Key Features

Displays the current IP address, subnet mask, and default gateway.

Can release or renew DHCP-assigned IP addresses.

Flushes and displays DNS cache.

## Slide 5

Checking Network Configuration

 Use ipconfig to find your
computer's IP address when
setting up a local network.

Troubleshooting Connectivity

If you can't access the internet,
ipconfig /renew can request a new
IP address from the DHCP server.

EXAMPLE IN REAL LIFE

Example in Real Life

Checking Network Configuration

Use ipconfig to find your computer's IP address when setting up a local network.

Troubleshooting Connectivity

If you can't access the internet, ipconfig /renew can request a new IP address from the DHCP server.

## Slide 6

# Display all IP configuration details

ipconfig




# Release the current DHCP-assigned IP

ipconfig /release




# Renew the DHCP-assigned IP

ipconfig /renew




# Flush the DNS cache

ipconfig /flushdns

COMMAND EXAMPLES

# Display all IP configuration details

ipconfig

# Release the current DHCP-assigned IP

ipconfig /release

# Renew the DHCP-assigned IP

ipconfig /renew

# Flush the DNS cache

ipconfig /flushdns

Command Examples

## Slide 7

This PowerShell cmdlet provides detailed information about the
IP configuration of all network adapters on a Windows machine.

GET-NETIPCONFIGURATION

Get-NetIPConfiguration

This PowerShell cmdlet provides detailed information about the IP configuration of all network adapters on a Windows machine.

## Slide 8

Displays advanced
details like DNS server
addresses and interface
indexes.

Useful for scripting
and automation in
PowerShell.

KEY FEATURES

Key Features

Displays advanced details like DNS server addresses and interface indexes.

Useful for scripting and automation in PowerShell.

## Slide 9

Advanced Diagnostics

 Use Get-NetIPConfiguration to view DNS settings when troubleshooting
domain resolution issues.

EXAMPLE IN REAL LIFE

# Display detailed IP configuration

Get-NetIPConfiguration

COMMAND
EXAMPLES

Get-NetIPConfiguration

Example in Real Life

Advanced Diagnostics

Use Get-NetIPConfiguration to view DNS settings when troubleshooting domain resolution issues.

Get-NetIPConfiguration

Command Examples

# Display detailed IP configuration

Get-NetIPConfiguration

## Slide 10

netstat (Network Statistics) is a command-line tool that displays active network
connections, listening ports, and routing tables.

NETSTAT

NETSTAT

Active network

Listening ports

Routing table

netstat

netstat (Network Statistics) is a command-line tool that displays active network connections, listening ports, and routing tables.

Active network

Listening ports

netstat

Routing table

## Slide 11

Shows TCP/UDP
connections and their
states.

Identifies open ports
and associated
processes.

Useful for monitoring
network activity.

KEY FEATURES

TCP/UDP

Key Features

tcp/udp

Shows TCP/UDP connections and their states.

Identifies open ports and associated processes.

Useful for monitoring network activity.

## Slide 12

NO PERMISSIONS

WRITE

Security Check

Use netstat -an to check for
unusual connections that might
indicate malware activity.

Server Monitoring

Identify which ports are actively
being used by services on a server.

EXAMPLE IN REAL LIFE

Example in Real Life

Security Check

Use netstat -an to check for unusual connections that might indicate malware activity.

Server Monitoring

Identify which ports are actively being used by services on a server.

write

no permissions

## Slide 13

# Display all active connections

netstat -an




# Show connections with process IDs

netstat -ano




# Display statistics for each protocol

netstat -s

COMMAND EXAMPLES

# Display all active connections

netstat -an

# Show connections with process IDs

netstat -ano

# Display statistics for each protocol

netstat -s

Command Examples
