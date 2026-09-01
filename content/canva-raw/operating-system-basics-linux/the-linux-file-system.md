# The Linux file system

_Category: Operating System Basics - Linux — Source: https://www.canva.com/design/DAGjcnAOF48/1xME2G9epkUhXTyv9imG9w/edit_

---

## Slide 1

THE LINUX 

FILE SYSTEM

The Linux

file system

## Slide 2

The linux filesystem provides information storage and retrieval. Unlike windows which
uses different trees for seperate volumes, the linux filesystem appears as one rooted
tree of directories.The root of the entire tree is denoted by /. All other drives are
"mounted" as part of /. Mounting just means using a folder to access your drive. Here
are all the files that are present in the root directory.

THE LINUX FILE SYSTEM

/

/bin

/etc

/home

Root Directory

The Linux file system

The linux filesystem provides information storage and retrieval. Unlike windows which uses different trees for seperate volumes, the linux filesystem appears as one rooted tree of directories.The root of the entire tree is denoted by /. All other drives are "mounted" as part of /. Mounting just means using a folder to access your drive. Here are all the files that are present in the root directory.

/bin

/

Root Directory

/etc

/home

## Slide 3

quixel@pop-os:/$ tree / -L 1

/

├── bin -> usr/bin

├── boot

├── dev

├── etc

├── home

├── lib -> usr/lib

├── lib32 -> usr/lib32

├── lib64 -> usr/lib64

├── libx32 -> usr/libx32

├── lost+found

├── media

├── mnt

├── opt

├── proc

├── recovery

├── root

├── run

├── sbin -> usr/sbin

├── srv

├── sys

├── tmp

├── usr

└── var




23 directories, 0 files




/bin: contains system binaries such as bash, ls, cat, etc.

/boot: contains files needed for successful booting.

/dev: stands for devices, contains file representations
of peripheral devices(such as usbs,ssds and hard disks)

/etc: system configuration files and system databases.

/home: contains home directories of users.

/lib: shared libraries needed by other programs.

/lost+found: special directory for storing lost or
corrupted files.

/media: default mount point for removable devices

AN OVERVIEW OF THE ROOT DIRECTORY

An overview of the root directory

/bin: contains system binaries such as bash, ls, cat, etc.

/boot: contains files needed for successful booting.

/dev: stands for devices, contains file representations of peripheral devices(such as usbs,ssds and hard disks)

/etc: system configuration files and system databases.

/home: contains home directories of users.

/lib: shared libraries needed by other programs.

/lost+found: special directory for storing lost or corrupted files.

/media: default mount point for removable devices

quixel@pop-os:/$ tree / -L 1

/

├── bin -> usr/bin

├── boot

├── dev

├── etc

├── home

├── lib -> usr/lib

├── lib32 -> usr/lib32

├── lib64 -> usr/lib64

├── libx32 -> usr/libx32

├── lost+found

├── media

├── mnt

├── opt

├── proc

├── recovery

├── root

├── run

├── sbin -> usr/sbin

├── srv

├── sys

├── tmp

├── usr

└── var

23 directories, 0 files

## Slide 4

quixel@pop-os:/$ tree / -L 1

/

├── bin -> usr/bin

├── boot

├── dev

├── etc

├── home

├── lib -> usr/lib

├── lib32 -> usr/lib32

├── lib64 -> usr/lib64

├── libx32 -> usr/libx32

├── lost+found

├── media

├── mnt

├── opt

├── proc

├── recovery

├── root

├── run

├── sbin -> usr/sbin

├── srv

├── sys

├── tmp

├── usr

└── var




23 directories, 0 files




/mnt: empty directory commonly used for temporary mounting.

/opt: locally installed software that isn't from the package manager.

/root: home directory of the root user.

/sbin: system binaries, contains fundamental utilities usually needed to start , maintain and recover the system.

/tmp: temporary files, often get deleted after reboot.

/usr: originally used for user home directories, but is now used to store non-critical binaries and libraries.

/var: variable, a place for files that change frequently.

AN OVERVIEW OF THE ROOT DIRECTORY

An overview of the root directory

/mnt: empty directory commonly used for temporary mounting.

/opt: locally installed software that isn't from the package manager.

/root: home directory of the root user.

/sbin: system binaries, contains fundamental utilities usually needed to start , maintain and recover the system.

/tmp: temporary files, often get deleted after reboot.

/usr: originally used for user home directories, but is now used to store non-critical binaries and libraries.

/var: variable, a place for files that change frequently.

quixel@pop-os:/$ tree / -L 1

/

├── bin -> usr/bin

├── boot

├── dev

├── etc

├── home

├── lib -> usr/lib

├── lib32 -> usr/lib32

├── lib64 -> usr/lib64

├── libx32 -> usr/libx32

├── lost+found

├── media

├── mnt

├── opt

├── proc

├── recovery

├── root

├── run

├── sbin -> usr/sbin

├── srv

├── sys

├── tmp

├── usr

└── var

23 directories, 0 files
