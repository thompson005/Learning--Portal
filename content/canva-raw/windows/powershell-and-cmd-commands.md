# PowerShell and CMD Commands

_Category: Windows — Source: https://www.canva.com/design/DAGoIu8kVyE/-iR-LmZlskSalf_yJg1igg/edit_

---

## Slide 1

POWERSHELL &
COMMANDS

powershell & commands

## Slide 2

Get-Command is a PowerShell cmdlet that lists all available commands, including
cmdlets, functions, aliases, workflows, and executables.

GET-COMMAND

ESSENTIAL POWERSHELL AND CMD COMMANDS

functions

cmdlets

aliases

executables

workflows

Essential PowerShell and CMD Commands

Get-Command

Get-Command is a PowerShell cmdlet that lists all available commands, including cmdlets, functions, aliases, workflows, and executables.

cmdlets

functions

aliases

executables

workflows

## Slide 3

Discover commands
available in your current
session.

Search for
commands by name
or functionality.

Identify the source
module of a
command.

KEY FEATURES

Discover commands available in your current session.

Key Features

Search for commands by name or functionality.

Identify the source module of a command.

## Slide 4

Discovering Commands

 Use Get-Command to find cmdlets for managing
Windows services or network configurations.

EXAMPLE IN REAL LIFE

Example in Real Life

Discovering Commands

Use Get-Command to find cmdlets for managing Windows services or network configurations.

## Slide 5

# List all available commands

Get-Command




# Search for commands related to "service"

Get-Command *service*




# Find the source module of a specific command

Get-Command Get-Service | Select-Object -
Property ModuleName

COMMAND EXAMPLES

# List all available commands

Get-Command

# Search for commands related to "service"

Get-Command *service*

# Find the source module of a specific command

Get-Command Get-Service | Select-Object -Property ModuleName

Command Examples

## Slide 6

Get-Help provides detailed documentation about PowerShell
cmdlets, including syntax, parameters, and examples.

GET-HELP

 including syntax

cmdlets

parameters

Get-Help

Get-Help provides detailed documentation about PowerShell cmdlets, including syntax, parameters, and examples.

cmdlets

parameters

including syntax

## Slide 7

KEY FEATURES

Access built-in help
documentation.

Learn how to use
unfamiliar cmdlets
effectively.

Update help files for
the latest
information.

Key Features

Access built-in help documentation.

Learn how to use unfamiliar cmdlets effectively.

Update help files for the latest information.

## Slide 8

Learning New Commands

 Use Get-Help to understand the usage of Set-ExecutionPolicy.

EXAMPLE IN REAL LIFE

Example in Real Life

Learning New Commands

Use Get-Help to understand the usage of Set-ExecutionPolicy.

## Slide 9

# Display help for a specific cmdlet

Get-Help Get-Service




# Show examples of how to use a cmdlet

Get-Help Get-Service -Examples




# Update help files to the latest version

Update-Help

COMMAND EXAMPLES

# Display help for a specific cmdlet

Get-Help Get-Service

# Show examples of how to use a cmdlet

Get-Help Get-Service -Examples

# Update help files to the latest version

Update-Help

Command Examples

## Slide 10

Set-ExecutionPolicy configures the PowerShell script execution policy on your system
to control which scripts can run.

SET-EXECUTIONPOLICY

Set-ExecutionPolicy

Set-ExecutionPolicy configures the PowerShell script execution policy on your system to control which scripts can run.

## Slide 11

Prevents unauthorized
or harmful scripts from
running.

Supports multiple levels

 (e.g., Restricted,
RemoteSigned, Unrestricted).

KEY FEATURES

Key Features

Prevents unauthorized or harmful scripts from running.

Supports multiple levels

(e.g., Restricted, RemoteSigned, Unrestricted).

## Slide 12

NO PERMISSIONS

Enabling Script Execution

Use Set-ExecutionPolicy RemoteSigned to allow locally created
scripts to run while blocking unsigned downloaded scripts.

EXAMPLE IN REAL LIFE

Example in Real Life

Enabling Script Execution

Use Set-ExecutionPolicy RemoteSigned to allow locally created scripts to run while blocking unsigned downloaded scripts.

no permissions

## Slide 13

# Set the execution policy to RemoteSigned

Set-ExecutionPolicy RemoteSigned




# Check the current execution policy

Get-ExecutionPolicy




# Forcefully set the execution policy (requires admin
privileges)

Set-ExecutionPolicy Unrestricted -Force

COMMAND EXAMPLES

# Set the execution policy to RemoteSigned

Set-ExecutionPolicy RemoteSigned

# Check the current execution policy

Get-ExecutionPolicy

# Forcefully set the execution policy (requires admin privileges)

Set-ExecutionPolicy Unrestricted -Force

Command Examples
