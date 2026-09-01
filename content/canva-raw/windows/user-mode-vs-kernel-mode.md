# User Mode vs Kernel Mode

_Category: Windows — Source: https://www.canva.com/design/DAGn-nq3OVI/xJm6yQP47U1w7pstS7q1VQ/edit_

---

## Slide 1

USER MODE VS
KERNEL MODE

 KERNEL 

USER

USER

Kernel

User Mode vs Kernel Mode

## Slide 2

WINDOWS ARCHITECTURE

USER MODE VS KERNEL MODE

In the Windows operating system, the CPU operates in two main privilege levels
defined by the processor’s protection rings:

User Mode 

(Ring 3)

Kernel Mode 

(Ring 0)

Windows Architecture

User Mode vs Kernel Mode

In the Windows operating system, the CPU operates in two main privilege levels defined by the processor’s protection rings:

User Mode

(Ring 3)

Kernel Mode

(Ring 0)

## Slide 3

User Mode is where most applications and user-level processes run. It provides a
restricted execution environment with no direct access to hardware or critical
system memory. Instead, applications interact with system resources by invoking
Windows API functions, which internally use system calls to transition into Kernel
Mode through mechanisms like software interrupts or the syscall instruction

 (on x64 systems)

USER MODE

System 

Resources

Hardware

Resources

User Mode

User Mode is where most applications and user-level processes run. It provides a restricted execution environment with no direct access to hardware or critical system memory. Instead, applications interact with system resources by invoking Windows API functions, which internally use system calls to transition into Kernel Mode through mechanisms like software interrupts or the syscall instruction

(on x64 systems)

System

Resources

Hardware

Resources

## Slide 4

Purpose

 Runs application-level
code.

Access Level

 Limited access to
system resources and
hardware.

Isolation

Each process runs in its
own virtual address
space—prevents one app
from crashing others.

USER MODE

Purpose

Runs application-level code.

User Mode

Access Level

Limited access to system resources and hardware.

Isolation

Each process runs in its own virtual address space—prevents one app from crashing others.

## Slide 5

Communication

User-mode applications request OS services
via System Calls (API calls) to transition into
Kernel Mode.

Examples of components running in User Mode

Applications (e.g., Chrome, Notepad)

USER MODE

User Mode

Communication

User-mode applications request OS services via System Calls (API calls) to transition into Kernel Mode.

Examples of components running in User Mode

Applications (e.g., Chrome, Notepad)

## Slide 6

Kernel Mode, on the other hand, is a privileged mode that allows direct interaction
with system memory, hardware devices, and CPU instructions. It’s where the
Windows Kernel, executive subsystems (e.g., memory manager, I/O manager, object
manager), and device drivers operate.

KERNAL MODE

Kernal Mode

Kernel Mode, on the other hand, is a privileged mode that allows direct interaction with system memory, hardware devices, and CPU instructions. It’s where the Windows Kernel, executive subsystems (e.g., memory manager, I/O manager, object manager), and device drivers operate.

## Slide 7

Purpose

Executes low-level
OS code with full
system privileges.

Security

Must be tightly
secured—exploits in
kernel mode can
give full system
control.

Access Level

Direct access to
hardware and all
system memory.

Stability

A crash in kernel
mode = system crash
(BSOD).

KERNAL MODE

Kernal Mode

Purpose

Executes low-level OS code with full system privileges.

Access Level

Direct access to hardware and all system memory.

Stability

A crash in kernel mode = system crash (BSOD).

Security

Must be tightly secured—exploits in kernel mode can give full system control.

## Slide 8

Core components in Kernel Mode

Executive 

(handles object manager, process manager, etc.)

Device Drivers

KERNAL MODE

Kernal Mode

Core components in Kernel Mode

Executive

(handles object manager, process manager, etc.)

Device Drivers

## Slide 9

Think of Your Computer Like a Building

User Mode is like the lobby of the building
open to the public, but you can’t just go
anywhere.

Kernel Mode is like the control room 

 only trusted staff can go in, and they
control everything: lights, power,
elevators, etc.

IN LAYMAN TERM

In Layman term

Think of Your Computer Like a Building

User Mode is like the lobby of the building open to the public, but you can’t just go anywhere.

Kernel Mode is like the control room

only trusted staff can go in, and they control everything: lights, power, elevators, etc.

## Slide 10

SUMMARY TABLE

FEATURE/COMMAND

USER MODE

KERNAL MODE

Privilege Level

Low

High

Memory Access

Own process space only

App crash only affects
itself

Crash can affect
entire system

Full system access

Stability Impact

Lower

Higher

Security Risk

Examples

Applications, APIs, CSRSS

Kernel, Drivers, HAL

Summary Table

Feature/Command

User Mode

Kernal Mode

Privilege Level

Low

High

Memory Access

Own process space only

Full system access

Empty	Empty	Empty
Empty	Empty	Empty
Empty	Empty	Empty
Empty	Empty	Empty
Empty	Empty	Empty
Empty	Empty	Empty

Stability Impact

App crash only affects itself

Crash can affect entire system

Security Risk

Examples

Lower

Applications, APIs, CSRSS

Higher

Kernel, Drivers, HAL
