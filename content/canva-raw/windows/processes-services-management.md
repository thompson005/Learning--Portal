# Processes & Services Management

_Category: Windows — Source: https://www.canva.com/design/DAGoKcuBnR4/HUxRnFVAJW1LCFzvlgNqmA/edit_

---

## Slide 1

PROCESSES & SERVICES
MANAGEMENT

Processes & Services Management

## Slide 2

tasklist is a CMD utility that lists all currently running processes on your system, along
with details such as process ID (PID), memory usage, and executable name.

TASKLIST

PROCESSES MANAGEMENT

Processes Management

tasklist

tasklist is a CMD utility that lists all currently running processes on your system, along with details such as process ID (PID), memory usage, and executable name.

## Slide 3

View active processes
on local or remote
systems.

Filter processes by
attributes like name
or PID.

KEY FEATURES

Key Features

View active processes on local or remote systems.

Filter processes by attributes like name or PID.

## Slide 4

EXAMPLE IN REAL LIFE

Resource Monitoring
Use tasklist to identify
which processes
consume the most
memory.

Troubleshooting
Locate unresponsive
applications by their
process name or ID.

Example in Real Life

Resource Monitoring Use tasklist to identify which processes consume the most memory.

Troubleshooting Locate unresponsive applications by their process name or ID.

## Slide 5

# List all running processes

tasklist




# Display processes in table format

tasklist /fo table




# Filter by process name (e.g., Notepad)

tasklist | findstr "notepad"




# List processes on a remote computer

tasklist /s  /u  /p 

COMMAND EXAMPLES

# List all running processes

tasklist

# Display processes in table format

tasklist /fo table

# Filter by process name (e.g., Notepad)

tasklist | findstr "notepad"

# List processes on a remote computer

tasklist /s /u /p

Command Examples

## Slide 6

taskkill is a CMD utility used to terminate running processes by
their PID or name.

TASKKILL

taskkill

taskkill is a CMD utility used to terminate running processes by their PID or name.

## Slide 7

KEY FEATURES

Forcefully terminate
unresponsive
applications.

Kill processes along
with their child
processes.

Key Features

Forcefully terminate unresponsive applications.

Kill processes along with their child processes.

## Slide 8

EXAMPLE IN REAL LIFE

Stopping Unresponsive Programs

 Use taskkill to end a frozen
application that cannot be closed
via Task Manager.

Freeing Resources
Terminate background
processes consuming
excessive memory or CPU.

Example in Real Life

Stopping Unresponsive Programs

Use taskkill to end a frozen application that cannot be closed via Task Manager.

Freeing Resources Terminate background processes consuming excessive memory or CPU.

## Slide 9

# Kill a process by its PID

taskkill /PID 




# Kill a process by its name

taskkill /IM notepad.exe




# Forcefully kill a process and its child processes

taskkill /F /T /IM notepad.exe




# Kill multiple processes by PID

taskkill /PID 1234 /PID 5678 /F

COMMAND EXAMPLES

# Kill a process by its PID

taskkill /PID

# Kill a process by its name

taskkill /IM notepad.exe

# Forcefully kill a process and its child processes

taskkill /F /T /IM notepad.exe

# Kill multiple processes by PID

taskkill /PID 1234 /PID 5678 /F

Command Examples

## Slide 10

Get-Process is a PowerShell cmdlet that retrieves information about currently
running processes on the system.

GET-PROCESS

Get-Process

Get-Process is a PowerShell cmdlet that retrieves information about currently running processes on the system.

## Slide 11

Provides detailed
information like CPU usage,
memory consumption, and
start time.

Supports filtering and
sorting of processes.

KEY FEATURES

Key Features

Provides detailed information like CPU usage, memory consumption, and start time.

Supports filtering and sorting of processes.

## Slide 12

NO PERMISSIONS

EXAMPLE IN REAL LIFE

Monitoring System Performance
Use Get-Process to identify high
CPU or memory-consuming
applications.

Advanced Filtering

Find specific processes using
PowerShell filters.

Example in Real Life

Monitoring System Performance Use Get-Process to identify high CPU or memory-consuming applications.

Advanced Filtering

Find specific processes using PowerShell filters.

no permissions

## Slide 13

# List all running processes

Get-Process




# Filter by process name (e.g., Notepad)

Get-Process -Name "notepad"




# Sort processes by CPU usage

Get-Process | Sort-Object -Property CPU -Descending




# Export process details to a file

Get-Process | Out-File C:\temp\Processes.txt

COMMAND EXAMPLES

# List all running processes

Get-Process

# Filter by process name (e.g., Notepad)

Get-Process -Name "notepad"

# Sort processes by CPU usage

Get-Process | Sort-Object -Property CPU -Descending

# Export process details to a file

Get-Process | Out-File C:\temp\Processes.txt

Command Examples
