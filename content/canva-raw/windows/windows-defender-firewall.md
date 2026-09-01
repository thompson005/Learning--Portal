# Windows Defender & Firewall

_Category: Windows — Source: https://www.canva.com/design/DAGn-kOYLV4/uDTl1NhStOvAn0KynKRgRg/edit_

---

## Slide 1

WINDOWS DEFENDER
& 

WINDOWS FIREWALL

windows defender &

windows firewall

## Slide 2

COMPREHENSIVE GUIDE TO 

WINDOWS DEFENDER & WINDOWS FIREWALL
MANAGEMENT

This guide provides an in-depth overview of Windows Defender Antivirus and
Windows Firewall, covering their functionality, management tools, and essential
commands. These tools are critical for protecting your system from malware and
controlling network traffic.

Comprehensive Guide to

Windows Defender & Windows Firewall Management

This guide provides an in-depth overview of Windows Defender Antivirus and Windows Firewall, covering their functionality, management tools, and essential commands. These tools are critical for protecting your system from malware and controlling network traffic.

## Slide 3

Windows Defender Antivirus is the default anti-malware solution in Windows,
offering real-time protection against viruses, ransomware, spyware, and other
threats. It can be managed via the Windows Security app, PowerShell, Command
Prompt, Group Policy, or third-party tools like Microsoft Intune.

WINDOWS DEFENDER ANTIVIRUS

Windows Defender Antivirus

Windows Defender Antivirus is the default anti-malware solution in Windows, offering real-time protection against viruses, ransomware, spyware, and other threats. It can be managed via the Windows Security app, PowerShell, Command Prompt, Group Policy, or third-party tools like Microsoft Intune.

## Slide 4

KEY FEATURES

Real-time
protection against
malware and
threats.

Scheduled scans
and on-demand
scanning.

Quarantine and
exclusion
management.

Malware
definition
updates.

Key Features

Real-time protection against malware and threats.

Scheduled scans and on-demand scanning.

Quarantine and exclusion management.

Malware definition updates.

## Slide 5

Open Start, type Windows Security, and press Enter.

Navigate to the Virus & Threat Protection tab.

From here, you can

Run quick or full
scans.

Manage
protection history
(quarantined files).

Configure
exclusions.

MANAGING WINDOWS DEFENDER VIA GUI

Using the Windows Security App

Managing Windows Defender via GUI

Using the Windows Security App

Open Start, type Windows Security, and press Enter.

Navigate to the Virus & Threat Protection tab.

Run quick or full scans.

From here, you can

Manage protection history (quarantined files).

Configure exclusions.

## Slide 6

MANAGING WINDOWS DEFENDER VIA POWERSHELL

PowerShell provides advanced control over Windows Defender settings.

Essential PowerShell Commands

	


	


	


	


	

COMMAND

PURPOSE

Get-MpComputerStatus

Get-MpPreference

Set-MpPreference

Update-MpSignature

View the current status
of Defender.

View Defender
configuration settings.

Modify Defender preferences
(e.g., exclusions).

Update malware
definitions manually.

Managing Windows Defender via PowerShell

Essential PowerShell Commands

PowerShell provides advanced control over Windows Defender settings.

Command

Get-MpComputerStatus

Get-MpPreference

Set-MpPreference

Update-MpSignature

Empty	Empty
Empty	Empty
Empty	Empty
Empty	Empty
Empty	Empty

Purpose

View the current status of Defender.

View Defender configuration settings.

Modify Defender preferences (e.g., exclusions).

Update malware definitions manually.

## Slide 7

# Check Defender status

Get-MpComputerStatus




# View current preferences

Get-MpPreference




# Add an exclusion for a folder

Set-MpPreference -ExclusionPath "C:\ExampleFolder"




# Update malware definitions

Update-MpSignature

EXAMPLES

# Check Defender status

Get-MpComputerStatus

# View current preferences

Get-MpPreference

# Add an exclusion for a folder

Set-MpPreference -ExclusionPath "C:\ExampleFolder"

# Update malware definitions

Update-MpSignature

Examples

## Slide 8

MANAGING WINDOWS DEFENDER VIA COMMAND PROMPT

MpCmdRun.exe is a command-line utility for managing Defender tasks.

Using MpCmdRun

	


	


	


	


	

OPTION

-Scan -ScanType 1

-Scan -ScanType 2

-SignatureUpdate

-Restore -ListAll

Perform a quick scan.

Perform a full scan.

Update malware definitions.

Restore quarantined items.

PURPOSE

Managing Windows Defender via Command Prompt

Using MpCmdRun

MpCmdRun.exe is a command-line utility for managing Defender tasks.

Empty	Empty
Empty	Empty
Empty	Empty
Empty	Empty
Empty	Empty

Option

-Scan -ScanType 1

Purpose

Perform a quick scan.

-Scan -ScanType 2

Perform a full scan.

-SignatureUpdate

Update malware definitions.

-Restore -ListAll

Restore quarantined items.

## Slide 9

# Quick scan

MpCmdRun.exe -Scan -ScanType 1




# Full scan

MpCmdRun.exe -Scan -ScanType 2




# Update definitions

MpCmdRun.exe -SignatureUpdate




# List quarantined items

MpCmdRun.exe -Restore -ListAll

EXAMPLES

# Quick scan

MpCmdRun.exe -Scan -ScanType 1

# Full scan

MpCmdRun.exe -Scan -ScanType 2

# Update definitions

MpCmdRun.exe -SignatureUpdate

# List quarantined items

MpCmdRun.exe -Restore -ListAll

Examples

## Slide 10

ADVANCED MANAGEMENT TOOLS

Configure Defender
settings for domain-
joined devices.

Manage Defender
policies across
multiple endpoints.

Deploy and monitor
Defender across
enterprise environments.

GROUP POLICY (GPO)

MICROSOFT INTUNE

SYSTEM CENTER CONFIGURATION
MANAGER (SCCM)

Advanced Management Tools

Group Policy (GPO)

Microsoft Intune

System Center Configuration Manager (SCCM)

Configure Defender settings for domain-joined devices.

Manage Defender policies across multiple endpoints.

Deploy and monitor Defender across enterprise environments.

## Slide 11

Windows Firewall is a built-in security feature that monitors and controls
incoming/outgoing network traffic based on predefined rules.

WINDOWS FIREWALL

Windows Firewall

Windows Firewall is a built-in security feature that monitors and controls incoming/outgoing network traffic based on predefined rules.

## Slide 12

KEY FEATURES

Protects against
unauthorized access
to the network.

Allows creation of
custom inbound

& outbound rules.

Supports advanced
configurations via GUI
or command-line tools.

Key Features

Protects against unauthorized access to the network.

Allows creation of custom inbound

& outbound rules.

Supports advanced configurations via GUI or command-line tools.

## Slide 13

Open Start, type firewall.cpl, and press Enter.

From here, you can:

Enable/disable the firewall
for different profiles
(Domain, Private, Public).

Allow apps through
the firewall.

Reset firewall
settings to default.

MANAGING WINDOWS FIREWALL VIA GUI

Using the Control Panel

Managing Windows Firewall via GUI

Using the Control Panel

Open Start, type firewall.cpl, and press Enter.

From here, you can:

Enable/disable the firewall for different profiles (Domain, Private, Public).

Allow apps through the firewall.

Reset firewall settings to default.
