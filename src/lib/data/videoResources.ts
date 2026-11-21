import type { Resource } from "@/types"

// Verified YouTube videos per curriculum topic id. Each one was found via search, passed
// YouTube's oEmbed check (exists and can be embedded) and was chosen as the best match
// for the topic. They play inside the portal (VideoEmbed). Re-verify with:
//   npx tsx scripts/check-videos.ts
export const VIDEO_RESOURCES: Record<string, Resource[]> = {
  "m1-6": [
    {
      "title": "Ethical Hacking Laws and Policies Explained | Legal Rules Every Hacker Must Know (ByteClass)",
      "url": "https://www.youtube.com/watch?v=yK_k77IbFkw",
      "type": "video"
    },
    {
      "title": "EHPT011: Implications for Ethical Hackers & Security Researchers (Converged Security Institute CSI)",
      "url": "https://www.youtube.com/watch?v=L7x-r90djt8",
      "type": "video"
    }
  ],
  "m3-linux-11": [
    {
      "title": "apt, dpkg, git, Python PiP (Linux Package Management) // Linux for Hackers // EP 5 (NetworkChuck)",
      "url": "https://www.youtube.com/watch?v=vX3krP6JmOY",
      "type": "video"
    }
  ],
  "m3-linux-12": [
    {
      "title": "Master SSH, SCP, and SFTP | Secure Remote Access for Beginners (WsCube Cyber Security)",
      "url": "https://www.youtube.com/watch?v=fKEqb7OkjR4",
      "type": "video"
    },
    {
      "title": "How SSH Works (Mental Outlaw)",
      "url": "https://www.youtube.com/watch?v=5JvLV2-ngCI",
      "type": "video"
    }
  ],
  "m3-linux-13": [
    {
      "title": "CRON JOB Explained in a Simple Way | Crash Course for Beginners | Day 67/100 (Coder's Gyan)",
      "url": "https://www.youtube.com/watch?v=RPrp875BsGc",
      "type": "video"
    }
  ],
  "m3-linux-14": [
    {
      "title": "OverTheWire Bandit: Ultimate Guide (Levels 0-10 Command Line Basics) (Anyascii)",
      "url": "https://www.youtube.com/watch?v=-GXCqqdbzFM",
      "type": "video"
    },
    {
      "title": "OverTheWire Bandit Walkthrough - Level 0 - 6 (HackerSploit)",
      "url": "https://www.youtube.com/watch?v=ff2Au8BIy_A",
      "type": "video"
    }
  ],
  "m3-linux-15": [
    {
      "title": "Shell Scripting in 20 Minutes - Crash Course | In One Video for Beginners | MPrashant (M Prashant)",
      "url": "https://www.youtube.com/watch?v=CeCah9nD9XE",
      "type": "video"
    }
  ],
  "m3-windows-12": [
    {
      "title": "Introducing BitLocker; Your Defence Against Stolen Devices (Jonathan Edwards)",
      "url": "https://www.youtube.com/watch?v=Sg93dPnPP6A",
      "type": "video"
    },
    {
      "title": "Breaking Bitlocker - Bypassing the Windows Disk Encryption (stacksmashing)",
      "url": "https://www.youtube.com/watch?v=wTl4vEednkQ",
      "type": "video"
    }
  ],
  "m3-windows-13": [
    {
      "title": "Cisco - CyberOps Associate - 3.3.11 Lab - Using Windows PowerShell (Arthur Salmon)",
      "url": "https://www.youtube.com/watch?v=K98kdYX-0J0",
      "type": "video"
    }
  ],
  "m3-windows-14": [
    {
      "title": "TryHackMe Walkthrough - Windows Fundamentals 1 (The Helpful Hacker)",
      "url": "https://www.youtube.com/watch?v=Ssa2W1bUoAg",
      "type": "video"
    },
    {
      "title": "TryHackMe - Windows Fundamentals 2 (The Helpful Hacker)",
      "url": "https://www.youtube.com/watch?v=9lz5nLOw7iU",
      "type": "video"
    }
  ],
  "m4-5": [
    {
      "title": "What Is REST API? Examples And How To Use It: Crash Course System Design #3 (ByteByteGo)",
      "url": "https://www.youtube.com/watch?v=-mN3VyJuCjM",
      "type": "video"
    },
    {
      "title": "HTTP Status Codes Explained In 5 Minutes (ByteByteGo)",
      "url": "https://www.youtube.com/watch?v=qmpUfWN7hh4",
      "type": "video"
    }
  ],
  "m6-12": [
    {
      "title": "How to Draw a Network Diagram with Draw io (Cyberkraft)",
      "url": "https://www.youtube.com/watch?v=e_R1AGzBEmk",
      "type": "video"
    },
    {
      "title": "What is a DMZ? (Demilitarized Zone) (PowerCert Animated Videos)",
      "url": "https://www.youtube.com/watch?v=dqlzQXo1wqo",
      "type": "video"
    }
  ],
  "m7-3": [
    {
      "title": "Nmap Tutorial to find Network Vulnerabilities (NetworkChuck)",
      "url": "https://www.youtube.com/watch?v=4t4kBkMsDbQ",
      "type": "video"
    },
    {
      "title": "Nmap - Banner Grabbing (HackerSploit)",
      "url": "https://www.youtube.com/watch?v=chVPS_sRjoI",
      "type": "video"
    }
  ],
  "m7-5": [
    {
      "title": "Introduction To The Nmap Scripting Engine (NSE) (HackerSploit)",
      "url": "https://www.youtube.com/watch?v=ceGywKe8RnY",
      "type": "video"
    },
    {
      "title": "How to Use Nmap Scripts for Penetration Testing (Nielsen Networking)",
      "url": "https://www.youtube.com/watch?v=038uGW0ZrpQ",
      "type": "video"
    }
  ],
  "m7-6": [
    {
      "title": "Subdomain Enumeration: The Ultimate Guide (Amass, Subfinder, OSINT Tools) (CavemenTech)",
      "url": "https://www.youtube.com/watch?v=2UM41V__bSQ",
      "type": "video"
    },
    {
      "title": "find HIDDEN urls!! (subdomain enumeration hacking) // ft. HakLuke (NetworkChuck)",
      "url": "https://www.youtube.com/watch?v=mYCyZgAv_zE",
      "type": "video"
    }
  ],
  "m8-6": [
    {
      "title": "Tutorial 07- Decoder Tab in Burp Suite Explained | Complete Beginner-Friendly Tutorial (SanQA Mastery)",
      "url": "https://www.youtube.com/watch?v=Cuo9CH1WXeE",
      "type": "video"
    }
  ],
  "m8-10": [
    {
      "title": "Tutorial 10- SQL Injection Attack Simulation: Cracking Login in Burp Suite (SanQA Mastery)",
      "url": "https://www.youtube.com/watch?v=NwkfftF6vG8",
      "type": "video"
    },
    {
      "title": "Burp Suite: Repeater || JrPenetrationTester || TryHackMe || 2021 (Let's Break Security)",
      "url": "https://www.youtube.com/watch?v=uRWSJGRiePU",
      "type": "video"
    }
  ],
  "m9-9": [
    {
      "title": "PortSwigger Blind SQL Injection Lab-12 | Blind SQL injection with conditional errors (The Cyber Expert)",
      "url": "https://www.youtube.com/watch?v=vXlCW_TUt6c",
      "type": "video"
    },
    {
      "title": "SQL Injection UNION Attack: Find Columns & Oracle Database Version | Web App Pentesting (Lesson (GenTiL Security | Ahmed Hamdy)",
      "url": "https://www.youtube.com/watch?v=jYUFti7uFh4",
      "type": "video"
    }
  ],
  "m12-7": [
    {
      "title": "Exploiting ChatGPT Code (The Cyber Mentors)",
      "url": "https://www.youtube.com/watch?v=jRETli3M8Rw",
      "type": "video"
    }
  ],
  "m13-1": [
    {
      "title": "Machine Learning | What Is Machine Learning? | Introduction To Machine Learning | 2026 | Simpli (Simplilearn)",
      "url": "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      "type": "video"
    },
    {
      "title": "Deep Learning | What is Deep Learning? | Deep Learning Tutorial For Beginners | 2026 | Simplile (Simplilearn)",
      "url": "https://www.youtube.com/watch?v=6M5VXKLf4D4",
      "type": "video"
    }
  ],
  "m13-2": [
    {
      "title": "AI Agents for Cybersecurity: Enhancing Automation & Threat Detection (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=xdUR8-_P3DU",
      "type": "video"
    }
  ],
  "m13-3": [
    {
      "title": "What is AI Ethics? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=aGwYtUzMQUk",
      "type": "video"
    },
    {
      "title": "Cybersecurity Ethics: The Legal Minefield You Didn't See Coming (Hackery)",
      "url": "https://www.youtube.com/watch?v=_ti0N8_P-tc",
      "type": "video"
    }
  ],
  "m13-4": [
    {
      "title": "the ONLY way to run Deepseek... (NetworkChuck)",
      "url": "https://www.youtube.com/watch?v=7TR-FLWNVHY",
      "type": "video"
    },
    {
      "title": "Private & Uncensored Local LLMs in 5 minutes (DeepSeek and Dolphin) (David Bombal)",
      "url": "https://www.youtube.com/watch?v=A2CqSfd5I4I",
      "type": "video"
    }
  ],
  "m13-5": [
    {
      "title": "Google Hacking with AI | Creating an OSINT AI Agent with CrewAI (Artificial Security)",
      "url": "https://www.youtube.com/watch?v=GfwUGABFjvs",
      "type": "video"
    }
  ],
  "m13-6": [
    {
      "title": "AI-Powered Phishing ? | Scammers Are Using AI to Hack You (2025) (M Security)",
      "url": "https://www.youtube.com/watch?v=gTBzdVyK9eg",
      "type": "video"
    },
    {
      "title": "Phishing Defenses: Top Cybersecurity Strategies to Protect Your Data (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=nSGQkE67jcg",
      "type": "video"
    }
  ],
  "m13-7": [
    {
      "title": "Hacking AI is TOO EASY (this should be illegal) (NetworkChuck)",
      "url": "https://www.youtube.com/watch?v=Qvx2sVgQ-u0",
      "type": "video"
    },
    {
      "title": "Free AI Hacking Course: Indirect Prompt Injection (+FREE LABS) (NahamSec)",
      "url": "https://www.youtube.com/watch?v=8yI10AgOevQ",
      "type": "video"
    }
  ],
  "m13-8": [
    {
      "title": "Finding Web App Vulnerabilities with AI (John Hammond)",
      "url": "https://www.youtube.com/watch?v=v-McepNOrTQ",
      "type": "video"
    }
  ],
  "m13-9": [
    {
      "title": "Create Your Own Python SUBDOMAIN ENUMERATION TOOL (Joe Helle)",
      "url": "https://www.youtube.com/watch?v=E5BklV9I2-4",
      "type": "video"
    }
  ],
  "m13-10": [
    {
      "title": "Cybersecurity SOC Analyst Lab - Email Analysis (Phishing) (MyDFIR)",
      "url": "https://www.youtube.com/watch?v=k7HeshxhwPk",
      "type": "video"
    }
  ],
  "m14-1": [
    {
      "title": "TryHackMe - Intro to Defensive Security (The Helpful Hacker)",
      "url": "https://www.youtube.com/watch?v=b3XfXg1Rg-w",
      "type": "video"
    }
  ],
  "m14-2": [
    {
      "title": "SOC Analyst Roadmap: From Beginner to Job Ready in 2026 | TryHackMe (TryHackMe and Haxxy)",
      "url": "https://www.youtube.com/watch?v=jRQRhTdw5so",
      "type": "video"
    }
  ],
  "m14-3": [
    {
      "title": "Security Operations Center (SOC) Explained (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=OHkWXFheSKM",
      "type": "video"
    },
    {
      "title": "SOC Tools Explained: SIEM, EDR, XDR, SOAR & More (Mohd Maaz)",
      "url": "https://www.youtube.com/watch?v=DS70_6YuHFg",
      "type": "video"
    }
  ],
  "m14-4": [
    {
      "title": "How To Use The Windows Event Viewer For Cyber Security Audit (Jon Good)",
      "url": "https://www.youtube.com/watch?v=-fV7jZwZuGQ",
      "type": "video"
    },
    {
      "title": "Hack The Box SOC Analyst Lab - Logjammer (Windows Event Logs) (MyDFIR)",
      "url": "https://www.youtube.com/watch?v=7PzMYcPPLjE",
      "type": "video"
    }
  ],
  "m14-5": [
    {
      "title": "Hands-On Traffic Analysis with Wireshark - Let's practice! (Chris Greer)",
      "url": "https://www.youtube.com/watch?v=5PKAa6TI82U",
      "type": "video"
    },
    {
      "title": "How SOC Analysts Actually Investigate Network Traffic (Wireshark Walkthrough) (Dr. K Cybersecurity)",
      "url": "https://www.youtube.com/watch?v=xl56QIsMoTQ",
      "type": "video"
    }
  ],
  "m14-6": [
    {
      "title": "Cybersecurity Tool for Beginner Security Analysts - VirusTotal (MyDFIR)",
      "url": "https://www.youtube.com/watch?v=1oXpWJC_VUc",
      "type": "video"
    }
  ],
  "m14-7": [
    {
      "title": "Incident Response Lifecycle | IR Plan | NIST SP 800-61 Security Incident Handling| Cybersecurit (CyberPlatter)",
      "url": "https://www.youtube.com/watch?v=IRSQEO0koYY",
      "type": "video"
    },
    {
      "title": "Incident Response - CompTIA Security+ SY0-701 - 4.8 (Professor Messer)",
      "url": "https://www.youtube.com/watch?v=X2UiMLxRdhE",
      "type": "video"
    }
  ],
  "m14-8": [
    {
      "title": "What are Yara Rules (and How Cybersecurity Analysts Use Them) (Simply Cyber - Gerald Auger, PhD)",
      "url": "https://www.youtube.com/watch?v=BM23_H2GGMA",
      "type": "video"
    },
    {
      "title": "Classify Malware with YARA (John Hammond)",
      "url": "https://www.youtube.com/watch?v=fu71CljrxsU",
      "type": "video"
    }
  ],
  "m15-1": [
    {
      "title": "Red Team VS Blue Team in Cyber Security: Skills & Tools, Salary, Job Overview (Full Guide) (WsCube Cyber Security)",
      "url": "https://www.youtube.com/watch?v=mDyd_dLdZQQ",
      "type": "video"
    },
    {
      "title": "Ethical Hacking in Action: Red Teaming, Pen Testing, & Cybersecurity (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=bSVGrA1_gYw",
      "type": "video"
    }
  ],
  "m15-2": [
    {
      "title": "Ethical Hacking Certs Better than OSCP (Updated 2025) (UnixGuy | Cyber Security)",
      "url": "https://www.youtube.com/watch?v=5hiqPTUs-yc",
      "type": "video"
    }
  ],
  "m15-3": [
    {
      "title": "Should you get the CompTIA Security+ in 2026 ? - Detailed review and verdict (The Social Dork | Cyber Security)",
      "url": "https://www.youtube.com/watch?v=kBRYmhG8sbE",
      "type": "video"
    },
    {
      "title": "Is SECURITY+ worth it for Cyber Security careers? // CompTIA (Jon Good)",
      "url": "https://www.youtube.com/watch?v=V-Cqsbj3raU",
      "type": "video"
    }
  ],
  "m15-4": [
    {
      "title": "Tutorial: How to Create a Portfolio on Github (BEAUTIFUL) | Cybersecurity, IT, or Developer (Josh Madakor)",
      "url": "https://www.youtube.com/watch?v=zgqfWLHNKLk",
      "type": "video"
    }
  ],
  "m15-6": [
    {
      "title": "CTFs explained in 5 Minutes (Mad Hat)",
      "url": "https://www.youtube.com/watch?v=nCMGIR8V-NE",
      "type": "video"
    },
    {
      "title": "How to join your first cybersecurity CTF in 2026 | Learn with HTB (Hack The Box)",
      "url": "https://www.youtube.com/watch?v=IdjIkGfRIqs",
      "type": "video"
    }
  ],
  "m16-1": [
    {
      "title": "Kerberos Authentication Explained | A deep dive (Destination Certification)",
      "url": "https://www.youtube.com/watch?v=5N242XcKAsM",
      "type": "video"
    }
  ],
  "m16-2": [
    {
      "title": "Attacking Active Directory - Kerberoasting (Conda)",
      "url": "https://www.youtube.com/watch?v=-3MxoxdzFNI",
      "type": "video"
    }
  ],
  "m16-3": [
    {
      "title": "Attacking Active Directory - AS-REP Roasting (Conda)",
      "url": "https://www.youtube.com/watch?v=EVdwnBFtUtQ",
      "type": "video"
    },
    {
      "title": "Kerberos Attacks Explained: User Enumeration, Kerberoasting and AS-REP Roasting (m0rn1ngstr)",
      "url": "https://www.youtube.com/watch?v=U1nMgb8AEB4",
      "type": "video"
    }
  ],
  "m16-9": [
    {
      "title": "4 Active Directory Attacks to become Domain Admin! (thehackerish)",
      "url": "https://www.youtube.com/watch?v=ppmveP0-2UA",
      "type": "video"
    }
  ],
  "m17-1": [
    {
      "title": "OSCP - Windows Privilege Escalation Methodology (Conda)",
      "url": "https://www.youtube.com/watch?v=Qfy-traJwIs",
      "type": "video"
    },
    {
      "title": "Windows Enumeration With winPEAS (HackerSploit)",
      "url": "https://www.youtube.com/watch?v=dSa_mdg3gCg",
      "type": "video"
    }
  ],
  "m17-2": [
    {
      "title": "Windows Privilege Escalation - Unquoted Service Path (Conda)",
      "url": "https://www.youtube.com/watch?v=WWE7VIpgd5I",
      "type": "video"
    }
  ],
  "m17-3": [
    {
      "title": "Windows Privilege Escalation - AlwaysInstallElevated (Conda)",
      "url": "https://www.youtube.com/watch?v=rMqcZ9pCoKU",
      "type": "video"
    }
  ],
  "m17-4": [
    {
      "title": "SeImpersonatePrivilege Exploitation (hexdump)",
      "url": "https://www.youtube.com/watch?v=01ODXD-oqyc",
      "type": "video"
    }
  ],
  "m17-5": [
    {
      "title": "All About DLL Hijacking - My Favorite Persistence Method (IppSec)",
      "url": "https://www.youtube.com/watch?v=3eROsG_WNpE",
      "type": "video"
    }
  ],
  "m17-6": [
    {
      "title": "SSH Tunnels SIMPLIFIED! (Shawn Powers)",
      "url": "https://www.youtube.com/watch?v=Wp7boqm3Xts",
      "type": "video"
    },
    {
      "title": "How Hackers Pivot Through Networks with SSH (Attack Surface)",
      "url": "https://www.youtube.com/watch?v=473DZziOcbU",
      "type": "video"
    }
  ],
  "m17-7": [
    {
      "title": "How To Pivot Through a Network with Chisel (John Hammond)",
      "url": "https://www.youtube.com/watch?v=pbR_BNSOaMk",
      "type": "video"
    },
    {
      "title": "Network Pivoting with Ligolo-NG (Gonski Cyber)",
      "url": "https://www.youtube.com/watch?v=DM1B8S80EvQ",
      "type": "video"
    }
  ],
  "m17-8": [
    {
      "title": "How To Pivot Through a Network with Chisel (John Hammond)",
      "url": "https://www.youtube.com/watch?v=pbR_BNSOaMk",
      "type": "video"
    }
  ],
  "m18-1": [
    {
      "title": "Stack Frames, RSP and RBP (hexdump)",
      "url": "https://www.youtube.com/watch?v=S94CHJWBSfw",
      "type": "video"
    },
    {
      "title": "Buffer Overflow (Aaron Yoo)",
      "url": "https://www.youtube.com/watch?v=AD-iXWANggo",
      "type": "video"
    }
  ],
  "m18-2": [
    {
      "title": "Fuzzing (fuzz testing) 101: Lessons from cyber security expert Dr. David Brumley (TechRepublic)",
      "url": "https://www.youtube.com/watch?v=17ebHty54T4",
      "type": "video"
    }
  ],
  "m18-4": [
    {
      "title": "Getting Control of the Instruction Pointer (EIP)! Exploring Stack Buffer Overflows (Dr Josh Stroschein - The Cyber Yeti)",
      "url": "https://www.youtube.com/watch?v=ilj9LYIn33U",
      "type": "video"
    },
    {
      "title": "Buffer Overflow 101: Ep 4 - Controlling EIP (flipthebit)",
      "url": "https://www.youtube.com/watch?v=SajNnjeHOWI",
      "type": "video"
    }
  ],
  "m18-5": [
    {
      "title": "013 bad characters (Pentester Academy TV)",
      "url": "https://www.youtube.com/watch?v=FAonEAfID4c",
      "type": "video"
    },
    {
      "title": "Exploiting Simple Buffer Overflows on Win32 : Automating Bad Character Detection (Pentester Academy TV)",
      "url": "https://www.youtube.com/watch?v=vHfxCo_7sOY",
      "type": "video"
    }
  ],
  "m18-6": [
    {
      "title": "[ 5 ] - Buffer Overflow - Locating JMP ESP Instruction (Computer Says No)",
      "url": "https://www.youtube.com/watch?v=-KEN0I-G3qk",
      "type": "video"
    },
    {
      "title": "Buffer Overflows Made Easy - Part 7: Finding the Right Module (The Cyber Mentors)",
      "url": "https://www.youtube.com/watch?v=k9D9RuFT02I",
      "type": "video"
    }
  ],
  "m18-7": [
    {
      "title": "First Exploit! Buffer Overflow with Shellcode - bin 0x0E (LiveOverflow)",
      "url": "https://www.youtube.com/watch?v=HSlhY4Uy8SA",
      "type": "video"
    }
  ],
  "m19-1": [
    {
      "title": "Test if Your Wireless Network Adapter Supports Monitor Mode & Packet Injection [Tutorial] (Null Byte)",
      "url": "https://www.youtube.com/watch?v=JSMw4AHjRAE",
      "type": "video"
    },
    {
      "title": "Monitor Wi-Fi Networks with airodump-ng | Wi-Fi Hacking Basics (WiFiChallenge)",
      "url": "https://www.youtube.com/watch?v=C2PDixrea1U",
      "type": "video"
    }
  ],
  "m19-2": [
    {
      "title": "WiFi (Wireless) Password Security - WEP, WPA, WPA2, WPA3, WPS Explained (PowerCert Animated Videos)",
      "url": "https://www.youtube.com/watch?v=WZaIfyvERcA",
      "type": "video"
    }
  ],
  "m19-3": [
    {
      "title": "The 4-Way Handshake (Marcus Burton, CWNP) (CWNPTV)",
      "url": "https://www.youtube.com/watch?v=9M8kVYFhMDw",
      "type": "video"
    },
    {
      "title": "Wi-Fi 4-Way Handshake In Depth (Tall Paul Tech)",
      "url": "https://www.youtube.com/watch?v=vHIRmG_BzQI",
      "type": "video"
    }
  ],
  "m19-4": [
    {
      "title": "Cracking WiFi WPA2 Handshake (David Bombal)",
      "url": "https://www.youtube.com/watch?v=WfYxrLaqlN8",
      "type": "video"
    },
    {
      "title": "Wireless Penetration Testing: Crack WPA2 Passwords with Aircrack-NG (Kyser Clark - Cybersecurity)",
      "url": "https://www.youtube.com/watch?v=MYrMOlyYsyg",
      "type": "video"
    }
  ],
  "m19-5": [
    {
      "title": "Cracking WiFi WPA2 Handshakes (And does it work with WPA3?) (David Bombal)",
      "url": "https://www.youtube.com/watch?v=X49lIPHcurE",
      "type": "video"
    },
    {
      "title": "Cracking WPA/WPA2 Handshake Files with Aircrack-ng & Hashcat | Ethical Hacking Tutorial (Hacktrickz)",
      "url": "https://www.youtube.com/watch?v=L0czo6KF1O4",
      "type": "video"
    }
  ],
  "m19-6": [
    {
      "title": "Cracking Wifi Protected Setup (WPS) - Part 1 : Reaver & Bully (PenSec Tutorials)",
      "url": "https://www.youtube.com/watch?v=_d7EHujPt-U",
      "type": "video"
    },
    {
      "title": "Hack WPA & WPA2 Wi-Fi Passwords with a Pixie-Dust Attack using Airgeddon [Tutorial] (Null Byte)",
      "url": "https://www.youtube.com/watch?v=SY0WMHTCCOM",
      "type": "video"
    }
  ],
  "m19-7": [
    {
      "title": "️ How Evil Twin Wi-Fi Attacks Work & How to Defend | Parrot OS & Fluxion Deep Dive (Ethical Explorers)",
      "url": "https://www.youtube.com/watch?v=GuCm0sHoEVs",
      "type": "video"
    }
  ],
  "m20-1": [
    {
      "title": "Cloud Security Begins with the Shared Responsibility Model (SANS Institute)",
      "url": "https://www.youtube.com/watch?v=rSMKSquxykE",
      "type": "video"
    },
    {
      "title": "AWS Shared Responsibility Model for Beginners | Understanding Cloud Security (2025) (BeSA Cloud Academy)",
      "url": "https://www.youtube.com/watch?v=WopTpel6DUY",
      "type": "video"
    }
  ],
  "m20-2": [
    {
      "title": "Overview of Users, Groups, Roles and Policies | AWS IAM (Digital Cloud Training)",
      "url": "https://www.youtube.com/watch?v=PjKvwxTTSUk",
      "type": "video"
    },
    {
      "title": "AWS IAM Core Concepts You NEED to Know (Be A Better Dev)",
      "url": "https://www.youtube.com/watch?v=_ZCTvmaPgao",
      "type": "video"
    }
  ],
  "m20-3": [
    {
      "title": "Dumping S3 Buckets | Exploiting S3 Bucket Misconfigurations (HackerSploit)",
      "url": "https://www.youtube.com/watch?v=ITSZ8743MUk",
      "type": "video"
    }
  ],
  "m20-4": [
    {
      "title": "SSRF to Cloud Takeover | Stealing IAM Role Credentials LIVE (5 Minutes Cloud)",
      "url": "https://www.youtube.com/watch?v=Gb7mhc2wYJw",
      "type": "video"
    }
  ],
  "m20-5": [
    {
      "title": "Microsoft Entra ID Beginner's Tutorial (Azure Active Directory) (Microsoft Mechanics)",
      "url": "https://www.youtube.com/watch?v=0qZzcK1mHwA",
      "type": "video"
    },
    {
      "title": "Everything you need to know about Microsoft EntraID (ExamPro)",
      "url": "https://www.youtube.com/watch?v=41Uo-T3Yt7Q",
      "type": "video"
    }
  ],
  "m20-6": [
    {
      "title": "AWS Security Series Episode 3 Amazon GuardDuty Explained AWS Threat Detection & Security Monito (KubeNine)",
      "url": "https://www.youtube.com/watch?v=ZRJyfw8Gv3k",
      "type": "video"
    },
    {
      "title": "Beginner's Guide to AWS CloudTrail for Security - Full Course (Cybr)",
      "url": "https://www.youtube.com/watch?v=1ZKuwyATV3c",
      "type": "video"
    }
  ],
  "m20-7": [
    {
      "title": "We accidentally Leaked AWS access Keys on Github (Cloud Security Podcast)",
      "url": "https://www.youtube.com/watch?v=44LIddMGIUo",
      "type": "video"
    },
    {
      "title": "Secrets Management: Secure Credentials & Avoid Data Leaks (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=BqekRTA6VCs",
      "type": "video"
    }
  ],
  "m20-8": [
    {
      "title": "Attacking AWS: The Full Cyber Kill Chain - Pawel Rzepa (OWASP Foundation)",
      "url": "https://www.youtube.com/watch?v=Bg1Pd-9YTRQ",
      "type": "video"
    },
    {
      "title": "Abusing XXE to SSRF via IMDSv1 & Stealing IAM Role Credentials | AWS EC2 Attack Tutorial (5 Minutes Cloud)",
      "url": "https://www.youtube.com/watch?v=kqcvPR4666s",
      "type": "video"
    }
  ],
  "m21-1": [
    {
      "title": "Turn Pentest Reports into Actionable Risk Intelligence w/ Dan DeCloss (Antisyphon Training)",
      "url": "https://www.youtube.com/watch?v=ZyE1uMREzbc",
      "type": "video"
    }
  ],
  "m21-2": [
    {
      "title": "How to Calculate CVSS Score | Metrics Explained (Woman in WhiteHat)",
      "url": "https://www.youtube.com/watch?v=Q6B2wjQdRxY",
      "type": "video"
    },
    {
      "title": "You're (Probably) Using CVSS Wrong (Tib3rius)",
      "url": "https://www.youtube.com/watch?v=AlYtTB2aJPE",
      "type": "video"
    }
  ],
  "m21-3": [
    {
      "title": "How To Write A Pentest Report That Gets Your Findings Fixed (NahamSec)",
      "url": "https://www.youtube.com/watch?v=oBtJ7bryKII",
      "type": "video"
    },
    {
      "title": "Writing a Pentest Report (The Cyber Mentors)",
      "url": "https://www.youtube.com/watch?v=EOoBAq6z4Zk",
      "type": "video"
    }
  ],
  "m21-4": [
    {
      "title": "How To Write A Penetration Testing Report (HackerSploit)",
      "url": "https://www.youtube.com/watch?v=J34DnrX7dTo",
      "type": "video"
    }
  ],
  "m21-5": [
    {
      "title": "Using a Risk-Based Approach to Prioritize Vulnerability Remediation (ISACA HQ)",
      "url": "https://www.youtube.com/watch?v=EHatAncaeYU",
      "type": "video"
    }
  ],
  "m21-6": [
    {
      "title": "Burying the Main Point - Common Cybersecurity Writing Mistakes (SANS Institute)",
      "url": "https://www.youtube.com/watch?v=xM6PgakpLgU",
      "type": "video"
    },
    {
      "title": "Including details most readers don't need - Common Cybersecurity Writing Mistakes (SANS Institute)",
      "url": "https://www.youtube.com/watch?v=-5Nv3g5_hUE",
      "type": "video"
    }
  ],
  "ai-m1-1": [
    {
      "title": "CompTIA SecAI+ (CY0-001) Full Course: Lesson 3 - AI System Lifecycle Security (CertCrush)",
      "url": "https://www.youtube.com/watch?v=KZ2FVDmMYEo",
      "type": "video"
    },
    {
      "title": "Introduction to AI Security - Jim Manico - NDC AI 2025 (NDC Conferences)",
      "url": "https://www.youtube.com/watch?v=RLOaFg7XAzM",
      "type": "video"
    }
  ],
  "ai-m1-2": [
    {
      "title": "Neural Networks Explained in 5 minutes (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=jmmW0F0biz0",
      "type": "video"
    }
  ],
  "ai-m1-3": [
    {
      "title": "What are Transformers (Machine Learning Model)? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=ZXiruGOCn9s",
      "type": "video"
    },
    {
      "title": "Transformer Architecture Explained (Under The Hood)",
      "url": "https://www.youtube.com/watch?v=6vThlsJ_ASE",
      "type": "video"
    }
  ],
  "ai-m1-4": [
    {
      "title": "Why Are There So Many Foundation Models? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=QPQy7jUpmyA",
      "type": "video"
    }
  ],
  "ai-m1-5": [
    {
      "title": "Agentic AI Frameworks Explained: Workflows, Multi-Agent, & Production (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=ZVPlLaehjLk",
      "type": "video"
    },
    {
      "title": "Model Context Protocol Clearly Explained | MCP Beyond the Hype (codebasics)",
      "url": "https://www.youtube.com/watch?v=tzrwxLNHtRY",
      "type": "video"
    }
  ],
  "ai-m1-6": [
    {
      "title": "Security & AI Governance: Reducing Risks in AI Systems (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=4QXtObc61Lw",
      "type": "video"
    },
    {
      "title": "Guide to Architect Secure AI Agents: Best Practices for Safety (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=UMYtqHptYvA",
      "type": "video"
    }
  ],
  "ai-m2-1": [
    {
      "title": "Anatomy of an AI ATTACK: MITRE ATLAS (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=QhoG74PDFyc",
      "type": "video"
    },
    {
      "title": "Overview of Adversarial Machine Learning (Software Engineering Institute | Carnegie Mellon University)",
      "url": "https://www.youtube.com/watch?v=C8jJ4H6BL1c",
      "type": "video"
    }
  ],
  "ai-m2-2": [
    {
      "title": "OWASP's Top 10 Ways to Attack LLMs: AI Vulnerabilities Exposed (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=gUNXZMcd2jU",
      "type": "video"
    },
    {
      "title": "AI Hacking: Bug Bounty Edition | DEF CON 34 | BBV Workshop with NahamSec (Bug Bounty DEFCON)",
      "url": "https://www.youtube.com/watch?v=WkCe5VTf1MA",
      "type": "video"
    }
  ],
  "ai-m2-3": [
    {
      "title": "OWASP's Top 10 Ways to Attack LLMs: AI Vulnerabilities Exposed (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=gUNXZMcd2jU",
      "type": "video"
    }
  ],
  "ai-m2-4": [
    {
      "title": "How to Make Hugging Face to Hug Worms: Discovering and Exploiting Unsafe Pickle.loads (Black Hat)",
      "url": "https://www.youtube.com/watch?v=KtbeMz2UHN0",
      "type": "video"
    },
    {
      "title": "Pickle vs SafeTensors vs GGUF – Secure & Efficient Model Saving Explained (Ankit Wahane)",
      "url": "https://www.youtube.com/watch?v=UUchaTGU7ZQ",
      "type": "video"
    }
  ],
  "ai-m2-5": [
    {
      "title": "What is Retrieval-Augmented Generation (RAG)? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=T-D1OfcDW1M",
      "type": "video"
    }
  ],
  "ai-m2-6": [
    {
      "title": "Jailbreak the Enterprise: Attacking Agentic AI & LLM Infrastructure | Alicia Cuestas (Antisyphon Training)",
      "url": "https://www.youtube.com/watch?v=HHuR2ejRsuI",
      "type": "video"
    },
    {
      "title": "Securing AI Agents with Zero Trust (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=d8d9EZHU7fw",
      "type": "video"
    }
  ],
  "ai-m3-1": [
    {
      "title": "Build Your AI Security Lab in 2026 | Kali Linux, Docker, Python & VS Code Setup (Episode 2) (The Techzeen)",
      "url": "https://www.youtube.com/watch?v=9_7lzrzRfCM",
      "type": "video"
    },
    {
      "title": "Container Security Explained (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=b_euX_M82uI",
      "type": "video"
    }
  ],
  "ai-m3-2": [
    {
      "title": "What is Ollama? Running Local LLMs Made Simple (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=5RIOQuHOihY",
      "type": "video"
    },
    {
      "title": "Local AI Explained: How to Run AI Models on Your Computer (Tech With Tim)",
      "url": "https://www.youtube.com/watch?v=edIHPoWgIKU",
      "type": "video"
    }
  ],
  "ai-m3-3": [
    {
      "title": "AI Goat: A Damn Vulnerable AI Infrastructure - Ofir Yakobi & Shir Sadon (OWASP Foundation)",
      "url": "https://www.youtube.com/watch?v=nRIfq8NCY08",
      "type": "video"
    },
    {
      "title": "I Hacked an AI Agent (DVLA Complete Walkthrough) (Medusa)",
      "url": "https://www.youtube.com/watch?v=EwRb1fNBmnA",
      "type": "video"
    }
  ],
  "ai-m3-4": [
    {
      "title": "LLM Vulnerability Scanning with garak. Tutorial: Test your own chat bots! (Embrace The Red)",
      "url": "https://www.youtube.com/watch?v=f713_sFqItY",
      "type": "video"
    }
  ],
  "ai-m3-5": [
    {
      "title": "NVIDIA NeMo Guardrails: Full Walkthrough for Chatbots / AI (James Briggs)",
      "url": "https://www.youtube.com/watch?v=SwqusllMCnE",
      "type": "video"
    },
    {
      "title": "2-NVIDIA NeMo Guardrails Tutorial: Defend RAG Apps Against Prompt Injection | Part 1 (Krish Naik)",
      "url": "https://www.youtube.com/watch?v=-7VgYNiGxYw",
      "type": "video"
    }
  ],
  "ai-m4-1": [
    {
      "title": "Episode 3: Direct Prompt Injection Explained | AI Red Teaming 101 (Microsoft Developer)",
      "url": "https://www.youtube.com/watch?v=8i95orzUrY0",
      "type": "video"
    },
    {
      "title": "What Is a Prompt Injection Attack? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=jrHRe9lSqqA",
      "type": "video"
    }
  ],
  "ai-m4-2": [
    {
      "title": "Indirect Prompt Injection | How Hackers Hijack AI (Seven Seas Security)",
      "url": "https://www.youtube.com/watch?v=s-rOBuZWbQE",
      "type": "video"
    },
    {
      "title": "Attacking LLM - Prompt Injection (LiveOverflow)",
      "url": "https://www.youtube.com/watch?v=Sv5OLj2nVAQ",
      "type": "video"
    }
  ],
  "ai-m4-3": [
    {
      "title": "Securing AI Agents: How to Prevent Hidden Prompt Injection Attacks (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=5ZA1lTxTH3c",
      "type": "video"
    }
  ],
  "ai-m4-4": [
    {
      "title": "KEYNOTE: Attacking AI by Jason Haddix | Bug Bounty Village, DEF CON 33 (Bug Bounty DEFCON)",
      "url": "https://www.youtube.com/watch?v=mYQgUHVgBPU",
      "type": "video"
    }
  ],
  "ai-m4-5": [
    {
      "title": "Prompt Injection in LLM Agents (ReAct, Langchain) (Donato Capitella)",
      "url": "https://www.youtube.com/watch?v=43qfHaKh0Xk",
      "type": "video"
    },
    {
      "title": "Hijacking Google’s CI/CD Through Prompt Injection:The New Era of AI-Based Exploits-Mackenzie Ja (NDC Conferences)",
      "url": "https://www.youtube.com/watch?v=OtG6hBDSt24",
      "type": "video"
    }
  ],
  "ai-m4-6": [
    {
      "title": "Augustus: Open-Source LLM Vulnerability Scanner Exposing 210+ AI Attacks (The Executive Briefing)",
      "url": "https://www.youtube.com/watch?v=UPzCtQ6EccY",
      "type": "video"
    }
  ],
  "ai-m4-7": [
    {
      "title": "Free AI Hacking Course: Indirect Prompt Injection (+FREE LABS) (NahamSec)",
      "url": "https://www.youtube.com/watch?v=8yI10AgOevQ",
      "type": "video"
    }
  ],
  "ai-m5-1": [
    {
      "title": "I Removed an AI's Ability to Say No (Refusal Ablation Explained) (Agents with Adam)",
      "url": "https://www.youtube.com/watch?v=prcXZuXblxQ",
      "type": "video"
    },
    {
      "title": "I Learned How to Jailbreak AI Chatbots (NahamSec)",
      "url": "https://www.youtube.com/watch?v=BehGpUB-frc",
      "type": "video"
    }
  ],
  "ai-m5-2": [
    {
      "title": "How hackers jailbreak LLM chatbots (Neurix)",
      "url": "https://www.youtube.com/watch?v=R9EUGBa5jok",
      "type": "video"
    },
    {
      "title": "AI Model Penetration: Testing LLMs for Prompt Injection & Jailbreaks (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=xOQW_qMZdlc",
      "type": "video"
    }
  ],
  "ai-m5-3": [
    {
      "title": "Red Teaming Mini Course: Attacking LLMs with other LLMs (Crescendo Attack) (Probably Private)",
      "url": "https://www.youtube.com/watch?v=RbpHr0S8njA",
      "type": "video"
    },
    {
      "title": "AI Red Teaming 101 – Full Course (Episodes 1-10) (Microsoft Developer)",
      "url": "https://www.youtube.com/watch?v=DwFVhFdD2fs",
      "type": "video"
    }
  ],
  "ai-m5-5": [
    {
      "title": "Test Your AI Like a Hacker , Promptfoo Tutorial (LLM Red-Teaming Guide) (SecureTechIn)",
      "url": "https://www.youtube.com/watch?v=KghDstjwwNA",
      "type": "video"
    }
  ],
  "ai-m6-1": [
    {
      "title": "Top 10 Security Risks in AI Agents Explained (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=soFWS8NBcSU",
      "type": "video"
    },
    {
      "title": "Securing & Governing Autonomous AI Agents: Risks & Safeguards (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=E_yPUsCpoC8",
      "type": "video"
    }
  ],
  "ai-m6-2": [
    {
      "title": "What is Retrieval-Augmented Generation (RAG)? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=T-D1OfcDW1M",
      "type": "video"
    },
    {
      "title": "Every RAG Strategy Explained in 13 Minutes (No Fluff) (Cole Medin)",
      "url": "https://www.youtube.com/watch?v=tLMViADvSNE",
      "type": "video"
    }
  ],
  "ai-m6-3": [
    {
      "title": "How Attackers Exploit RAG Systems | AI Security | TryHackMe (TryHackMe and Andre King)",
      "url": "https://www.youtube.com/watch?v=s1276sI9kHM",
      "type": "video"
    },
    {
      "title": "OWASP's Top 10 Ways to Attack LLMs: AI Vulnerabilities Exposed (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=gUNXZMcd2jU",
      "type": "video"
    }
  ],
  "ai-m6-4": [
    {
      "title": "OWASP Agentic Top 10 Explained: The New Security Risks of AI Agents (ByteMonk)",
      "url": "https://www.youtube.com/watch?v=UftYcziWO3g",
      "type": "video"
    },
    {
      "title": "What is Tool Calling? Connecting LLMs to Your Data (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=h8gMhXYAv1k",
      "type": "video"
    }
  ],
  "ai-m6-5": [
    {
      "title": "MCP Security Survival Guide: Best Practices, Pitfalls & Real-World Lessons (w/IBM’s Hailey Thao (Agentic AI Foundation)",
      "url": "https://www.youtube.com/watch?v=VrNCes10kH8",
      "type": "video"
    },
    {
      "title": "AWS re:Invent 2025 - Securing AI Agent Ecosystems: MCP Server & Agent Security at Scale (ISV325 (AWS Events)",
      "url": "https://www.youtube.com/watch?v=78sgXVNf808",
      "type": "video"
    }
  ],
  "ai-m6-6": [
    {
      "title": "Exploiting Insecure Output Handling in LLMs (Intigriti)",
      "url": "https://www.youtube.com/watch?v=ZySEV5SwTTE",
      "type": "video"
    },
    {
      "title": "Exploiting insecure output handling in LLMs | PortSwigger Web LLM Attacks (ad4m Academy)",
      "url": "https://www.youtube.com/watch?v=jALhMGU-uWE",
      "type": "video"
    }
  ],
  "ai-m6-7": [
    {
      "title": "LLM Chronicles #6.9: Design Patterns for Securing LLM Agents Against Prompt Injection (Paper Re (Donato Capitella)",
      "url": "https://www.youtube.com/watch?v=2Er7bmyhPfM",
      "type": "video"
    },
    {
      "title": "Guide to Architect Secure AI Agents: Best Practices for Safety (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=UMYtqHptYvA",
      "type": "video"
    }
  ],
  "ai-m7-1": [
    {
      "title": "OWASP Top 10 for LLM Applications 2026 Explained | AI Security Risks & Mitigations (FANATICUS)",
      "url": "https://www.youtube.com/watch?v=d3aFLLMUWQs",
      "type": "video"
    },
    {
      "title": "Intro to LLM Security - OWASP Top 10 for Large Language Models (LLMs) (WhyLabs)",
      "url": "https://www.youtube.com/watch?v=dj1H4g4YSlU",
      "type": "video"
    }
  ],
  "ai-m7-2": [
    {
      "title": "OWASP Top 10 for LLM Applications 2026 Explained | AI Security Risks & Mitigations (FANATICUS)",
      "url": "https://www.youtube.com/watch?v=d3aFLLMUWQs",
      "type": "video"
    },
    {
      "title": "Intro to LLM Security - OWASP Top 10 for Large Language Models (LLMs) (WhyLabs)",
      "url": "https://www.youtube.com/watch?v=dj1H4g4YSlU",
      "type": "video"
    }
  ],
  "ai-m7-3": [
    {
      "title": "OWASP Top 10 for LLM Applications 2026 Explained | AI Security Risks & Mitigations (FANATICUS)",
      "url": "https://www.youtube.com/watch?v=d3aFLLMUWQs",
      "type": "video"
    }
  ],
  "ai-m7-4": [
    {
      "title": "OWASP GenAI LLM Top 10 2026: Every Entry, Every Change,Complete Coverage (Kandi Brian)",
      "url": "https://www.youtube.com/watch?v=YAuUZFz00V4",
      "type": "video"
    },
    {
      "title": "Deep Dive into OWASP Top 10 for Large Language Model (LLM) Applications 2025 - Part 2 (Ali Dorri)",
      "url": "https://www.youtube.com/watch?v=TSH5P5NuPVg",
      "type": "video"
    }
  ],
  "ai-m7-5": [
    {
      "title": "OWASP GenAI LLM Top 10 2026: Every Entry, Every Change,Complete Coverage (Kandi Brian)",
      "url": "https://www.youtube.com/watch?v=YAuUZFz00V4",
      "type": "video"
    },
    {
      "title": "Deep Dive into OWASP Top 10 for Large Language Model (LLM) Applications 2025 - Part 2 (Ali Dorri)",
      "url": "https://www.youtube.com/watch?v=TSH5P5NuPVg",
      "type": "video"
    }
  ],
  "ai-m7-6": [
    {
      "title": "LLM Vulnerability Scanning with garak. Tutorial: Test your own chat bots! (Embrace The Red)",
      "url": "https://www.youtube.com/watch?v=f713_sFqItY",
      "type": "video"
    },
    {
      "title": "LLM Vulnerability Scanning With Garak | AI Security Testing (Kiso Secure)",
      "url": "https://www.youtube.com/watch?v=rTYs00s3-w4",
      "type": "video"
    }
  ],
  "ai-m8-1": [
    {
      "title": "Breaking LLMs: How Data Poisoning Attacks Work (Threat Surface - Cybersecurity & AI)",
      "url": "https://www.youtube.com/watch?v=LfJZxc8S6fA",
      "type": "video"
    },
    {
      "title": "How to poison an AI model? (Code & bird)",
      "url": "https://www.youtube.com/watch?v=d_yHOJVLpZI",
      "type": "video"
    }
  ],
  "ai-m8-2": [
    {
      "title": "LLMbotomy: Shutting the Trojan Backdoors (Black Hat)",
      "url": "https://www.youtube.com/watch?v=Zbo4I0IKhTs",
      "type": "video"
    },
    {
      "title": "TrustML Seminar: Pin-Yu Chen on Practical Backdoor Attacks and Defenses in Machine Learning Sys (Trustworthy ML Initiative)",
      "url": "https://www.youtube.com/watch?v=RY8j_2zIvPY",
      "type": "video"
    }
  ],
  "ai-m8-3": [
    {
      "title": "EP131: The backdoor clean training can't wash out (data poisoning) (VoxAgent)",
      "url": "https://www.youtube.com/watch?v=A3H3Xttkel4",
      "type": "video"
    },
    {
      "title": "Data Poisoning Explained: How Hackers Corrupt AI Models (OWASP Top Risk) (CyberPaw)",
      "url": "https://www.youtube.com/watch?v=wLRTfkaVMrM",
      "type": "video"
    }
  ],
  "ai-m8-4": [
    {
      "title": "How AI Gets Poisoned : The Dark Side of AI Training (Backdoor Attacks in LLMs) (AaiTech)",
      "url": "https://www.youtube.com/watch?v=QrAR7gq9duo",
      "type": "video"
    },
    {
      "title": "Overview of Adversarial Machine Learning (Software Engineering Institute | Carnegie Mellon University)",
      "url": "https://www.youtube.com/watch?v=C8jJ4H6BL1c",
      "type": "video"
    }
  ],
  "ai-m8-5": [
    {
      "title": "CompTIA SecAI+ (CY0-001) Full Course: Lesson 5 - Data and Pipeline Security (CertCrush)",
      "url": "https://www.youtube.com/watch?v=LsZptoKJ39I",
      "type": "video"
    }
  ],
  "ai-m8-6": [
    {
      "title": "The New AI Security Nightmare: Undetectable LLM Backdoors (Internet of Bugs)",
      "url": "https://www.youtube.com/watch?v=rloMMrPNDPU",
      "type": "video"
    }
  ],
  "ai-m9-1": [
    {
      "title": "Large Language Model Security: Model Extraction Attacks Explained (Fuzzy Labs)",
      "url": "https://www.youtube.com/watch?v=U0sqSJQHMwc",
      "type": "video"
    },
    {
      "title": "Lecture 6: Model Extraction Attacks (Birhanu Eshete)",
      "url": "https://www.youtube.com/watch?v=V6kjVPLDno4",
      "type": "video"
    }
  ],
  "ai-m9-2": [
    {
      "title": "Membership inference attacks from first principles (IEEE Symposium on Security and Privacy)",
      "url": "https://www.youtube.com/watch?v=1CNxfhMlk-A",
      "type": "video"
    },
    {
      "title": "Membership Inference Attacks against Machine Learning Models (IEEE Symposium on Security and Privacy)",
      "url": "https://www.youtube.com/watch?v=rDm1n2gceJY",
      "type": "video"
    }
  ],
  "ai-m9-3": [
    {
      "title": "CompTIA SecAI+ Domain 2.3: Model Inversion, Inference & Poisoning (SecGuy)",
      "url": "https://www.youtube.com/watch?v=3TBYD8ECDyc",
      "type": "video"
    },
    {
      "title": "Model Inversion Attacks (Product Security Podcast)",
      "url": "https://www.youtube.com/watch?v=wfPNEvzVA1g",
      "type": "video"
    }
  ],
  "ai-m9-4": [
    {
      "title": "Extracting Training Data from Large Language Models (Paper Explained) (Yannic Kilcher)",
      "url": "https://www.youtube.com/watch?v=plK2WVdLTOY",
      "type": "video"
    }
  ],
  "ai-m9-5": [
    {
      "title": "USENIX Security '22 - Mitigating Membership Inference Attacks by Self-Distillation Through a No (USENIX)",
      "url": "https://www.youtube.com/watch?v=zBzHnCz-DPM",
      "type": "video"
    }
  ],
  "ai-m9-6": [
    {
      "title": "Somebody Leaked the System Prompts of 32 AI Agents (Cursor, Claude Code) (Bitwise AI)",
      "url": "https://www.youtube.com/watch?v=XOddQHz4gtA",
      "type": "video"
    },
    {
      "title": "What Is a Prompt Injection Attack? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=jrHRe9lSqqA",
      "type": "video"
    }
  ],
  "ai-m10-1": [
    {
      "title": "Payload | Inside a Weaponized AI Model | TryHackMe | AI Security (WireDogSec)",
      "url": "https://www.youtube.com/watch?v=sGkG8Dugk4k",
      "type": "video"
    },
    {
      "title": "TryHackMe Securing the AI Supply Chain Walkthrough | AI Security | 2026 (Djalil Ayed)",
      "url": "https://www.youtube.com/watch?v=Y_5hmaVMzkU",
      "type": "video"
    }
  ],
  "ai-m10-2": [
    {
      "title": "Understanding AI Supply Chains Explained | AI Security Path | TryHackMe Walkthrough (AlphaBey)",
      "url": "https://www.youtube.com/watch?v=CqRBB82WfQ8",
      "type": "video"
    }
  ],
  "ai-m10-3": [
    {
      "title": "LLM4Shell: Discovering and Exploiting RCE Vulnerabilities in Real-World LLM-Integrated Framewor (Black Hat)",
      "url": "https://www.youtube.com/watch?v=LcLrG_4i19E",
      "type": "video"
    },
    {
      "title": "Practical Machine Learning Security: Major Security Flaws in ML and How to Avoid Them with MLSe (Alejandro Saucedo)",
      "url": "https://www.youtube.com/watch?v=sCOmXwFEVpI",
      "type": "video"
    }
  ],
  "ai-m10-4": [
    {
      "title": "From MLOps to MLOops - Exposing the Attack Surface of Machine Learning Platforms (Black Hat)",
      "url": "https://www.youtube.com/watch?v=1dsRAEdbpq4",
      "type": "video"
    }
  ],
  "ai-m10-5": [
    {
      "title": "Signing and Verifying Container Images With Sigstore Cosign and Kyverno (DevOps & AI Toolkit)",
      "url": "https://www.youtube.com/watch?v=HLb1Q086u6M",
      "type": "video"
    },
    {
      "title": "Demystifying Digital Signatures - Priya Wadhwa, Chainguard, Inc (The Linux Foundation)",
      "url": "https://www.youtube.com/watch?v=-yb9TaWvpiY",
      "type": "video"
    }
  ],
  "ai-m10-6": [
    {
      "title": "Guide to Architect Secure AI Agents: Best Practices for Safety (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=UMYtqHptYvA",
      "type": "video"
    }
  ],
  "ai-m11-2": [
    {
      "title": "Overview of Adversarial Machine Learning (Software Engineering Institute | Carnegie Mellon University)",
      "url": "https://www.youtube.com/watch?v=C8jJ4H6BL1c",
      "type": "video"
    },
    {
      "title": "[Attack AI in 5 mins] Adversarial ML #1. FGSM (EJ)",
      "url": "https://www.youtube.com/watch?v=4TseynD_v7M",
      "type": "video"
    }
  ],
  "ai-m11-4": [
    {
      "title": "Anatomy of an AI ATTACK: MITRE ATLAS (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=QhoG74PDFyc",
      "type": "video"
    },
    {
      "title": "Attacking AI - Jason Haddix - NDC Security 2026 (NDC Conferences)",
      "url": "https://www.youtube.com/watch?v=j51uMah-3js",
      "type": "video"
    }
  ],
  "ai-m11-5": [
    {
      "title": "USENIX Security '18 - With Great Training Comes Great Vulnerability... (USENIX)",
      "url": "https://www.youtube.com/watch?v=mMYywx_HEXE",
      "type": "video"
    },
    {
      "title": "BadEncoder: Backdoor Attacks to Pre-trained Encoders in Self-Supervised Learning (IEEE Symposium on Security and Privacy)",
      "url": "https://www.youtube.com/watch?v=JtS__NB4gDM",
      "type": "video"
    }
  ],
  "ai-m11-6": [
    {
      "title": "Mastering AI Risk: NIST’s Risk Management Framework Explained (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=0oeD2Wf25wY",
      "type": "video"
    },
    {
      "title": "Anatomy of an AI ATTACK: MITRE ATLAS (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=QhoG74PDFyc",
      "type": "video"
    }
  ],
  "ai-m12-1": [
    {
      "title": "How to add guardrails to generative AI in OpenShift AI (Red Hat)",
      "url": "https://www.youtube.com/watch?v=Owr2ToxRbho",
      "type": "video"
    },
    {
      "title": "Using Guardrails for AI Security: LlamaGuard Demonstration (Probably Private)",
      "url": "https://www.youtube.com/watch?v=MTFKSAfyGIo",
      "type": "video"
    }
  ],
  "ai-m12-2": [
    {
      "title": "Learn to Build Production-Ready LLM Guardrails From Scratch! (Pavan Belagatti)",
      "url": "https://www.youtube.com/watch?v=zBV-xAWNEKk",
      "type": "video"
    },
    {
      "title": "Guardrails with LangChain: A Complete Crash Course for Building Safe AI Agents (Krish Naik)",
      "url": "https://www.youtube.com/watch?v=ruiLq0OzjkI",
      "type": "video"
    }
  ],
  "ai-m12-3": [
    {
      "title": "OWASP Top 10 for LLM05:2025 - Improper Output Handling (Vandana Verma)",
      "url": "https://www.youtube.com/watch?v=ip0rbmDnugw",
      "type": "video"
    },
    {
      "title": "AI Security Mini-Course: Prompt Sanitization with Microsoft Presidio (Probably Private)",
      "url": "https://www.youtube.com/watch?v=RfxnD00xxwo",
      "type": "video"
    }
  ],
  "ai-m12-4": [
    {
      "title": "Black Hat USA 2025 | Reinventing Agentic AI Security With Architectural Controls (Black Hat)",
      "url": "https://www.youtube.com/watch?v=iLX4OdAEznY",
      "type": "video"
    },
    {
      "title": "LLM Hacking Defense: Strategies for Secure AI (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=y8iDGA4Y650",
      "type": "video"
    }
  ],
  "ai-m12-5": [
    {
      "title": "Prompt Injection Explained: How Attackers Bypass AI Guardrails (CBT Nuggets)",
      "url": "https://www.youtube.com/watch?v=S4SHQw4VhCI",
      "type": "video"
    }
  ],
  "ai-m12-6": [
    {
      "title": "What is Agentic Security Runtime? Securing AI Agents (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=NH0plIdqDMk",
      "type": "video"
    }
  ],
  "ai-m13-1": [
    {
      "title": "Cybersecurity: CompTIA PenTest + 6 Phases | Scoping an engagement (CCS Learning Academy)",
      "url": "https://www.youtube.com/watch?v=4ZFgrPU13WI",
      "type": "video"
    },
    {
      "title": "Professionally Evil Fundamentals: Permission and Rules of Engagement (Secure Ideas)",
      "url": "https://www.youtube.com/watch?v=igpc2l3nyN0",
      "type": "video"
    }
  ],
  "ai-m13-2": [
    {
      "title": "Best AI Red Teaming Tools in 2026? Garak vs Giskard vs PyRIT (Motasem Hamdan )",
      "url": "https://www.youtube.com/watch?v=lXS0rWB5t98",
      "type": "video"
    },
    {
      "title": "Promptfoo Red Teaming: A beginner's guide to finding vulnerabilities in Your LLM Apps (Jason Koo)",
      "url": "https://www.youtube.com/watch?v=y6Dlsz5P8s8",
      "type": "video"
    }
  ],
  "ai-m13-4": [
    {
      "title": "LLM as a Judge: Scaling AI Evaluation Strategies (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=trfUBIDeI1Y",
      "type": "video"
    },
    {
      "title": "How to Systematically Setup LLM Evals (Metrics, Unit Tests, LLM-as-a-Judge) (Dave Ebbelaar)",
      "url": "https://www.youtube.com/watch?v=a3SMraZWNNs",
      "type": "video"
    }
  ],
  "ai-m13-5": [
    {
      "title": "Start with PromptFoo in under 10 min. (Jason Koo)",
      "url": "https://www.youtube.com/watch?v=7Z6_7XkXwj0",
      "type": "video"
    },
    {
      "title": "Test Your AI Like a Hacker , Promptfoo Tutorial (LLM Red-Teaming Guide) (SecureTechIn)",
      "url": "https://www.youtube.com/watch?v=KghDstjwwNA",
      "type": "video"
    }
  ],
  "ai-m14-1": [
    {
      "title": "Guide to Architect Secure AI Agents: Best Practices for Safety (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=UMYtqHptYvA",
      "type": "video"
    }
  ],
  "ai-m14-2": [
    {
      "title": "Secrets Management: Secure Credentials & Avoid Data Leaks (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=BqekRTA6VCs",
      "type": "video"
    },
    {
      "title": "Cybersecurity Architecture: Who Are You? Identity and Access Management (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=5uNifnVlBy4",
      "type": "video"
    }
  ],
  "ai-m14-3": [
    {
      "title": "FastAPI Rate Limiting — Protect LLM Costs with slowapi (Analytics Vidhya)",
      "url": "https://www.youtube.com/watch?v=tW3hEyyz2E4",
      "type": "video"
    },
    {
      "title": "How API Rate Limiting Actually Works and How to Build Your Own (LearnThatStack)",
      "url": "https://www.youtube.com/watch?v=s3wIoIN_-u4",
      "type": "video"
    }
  ],
  "ai-m14-4": [
    {
      "title": "Mastering AI Observability | Logging & Monitoring AI Systems in Production (Tejav Academy)",
      "url": "https://www.youtube.com/watch?v=_Ne-LbgYzd8",
      "type": "video"
    }
  ],
  "ai-m14-5": [
    {
      "title": "Mastering AI Risk: NIST’s Risk Management Framework Explained (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=0oeD2Wf25wY",
      "type": "video"
    },
    {
      "title": "Security & AI Governance: Reducing Risks in AI Systems (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=4QXtObc61Lw",
      "type": "video"
    }
  ],
  "ai-m14-6": [
    {
      "title": "Anatomy of an AI ATTACK: MITRE ATLAS (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=QhoG74PDFyc",
      "type": "video"
    },
    {
      "title": "AI Red Teaming 101 – Full Course (Episodes 1-10) (Microsoft Developer)",
      "url": "https://www.youtube.com/watch?v=DwFVhFdD2fs",
      "type": "video"
    }
  ],
  "cloud-m1-1": [
    {
      "title": "CLOUD SECURITY explained in 8 minutes (Mad Hat)",
      "url": "https://www.youtube.com/watch?v=khvT_CjrURs",
      "type": "video"
    },
    {
      "title": "What is Cloud Security? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=jI8IKpjiCSM",
      "type": "video"
    }
  ],
  "cloud-m1-2": [
    {
      "title": "Cloud Security Begins with the Shared Responsibility Model (SANS Institute)",
      "url": "https://www.youtube.com/watch?v=rSMKSquxykE",
      "type": "video"
    },
    {
      "title": "CCSP | Cloud Service Models | IaaS, PaaS, SaaS | Cloud Shared Responsibility Model | Cloud Secu (CyberPlatter)",
      "url": "https://www.youtube.com/watch?v=3JB76z4aJS0",
      "type": "video"
    }
  ],
  "cloud-m1-3": [
    {
      "title": "AWS vs Azure vs GCP | Amazon Web Services vs Microsoft Azure vs Google Cloud Platform | Simplil (Simplilearn)",
      "url": "https://www.youtube.com/watch?v=Vnk0p-63mHQ",
      "type": "video"
    }
  ],
  "cloud-m1-4": [
    {
      "title": "AWS re:Invent 2016: Reduce Blast Radius by Using Multiple AWS Accounts Per Region & Service (SE (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=ha2ojsF27dg",
      "type": "video"
    },
    {
      "title": "AWS re:Invent 2018: How AWS Minimizes the Blast Radius of Failures (ARC338) (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=swQbA4zub20",
      "type": "video"
    }
  ],
  "cloud-m1-5": [
    {
      "title": "Cloud Security Risks: Exploring the latest Threat Landscape Report (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=VK0GyUSDwQY",
      "type": "video"
    }
  ],
  "cloud-m1-6": [
    {
      "title": "AWS Budgets Tutorial - Setup Alerts for AWS Billing | Amazon Web Services (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=O0sofGVT7uw",
      "type": "video"
    },
    {
      "title": "How to Create an AWS Free Tier Account, Setup Budget Alerts & Avoid Unexpected Charges (CodeSnippet by Chetan)",
      "url": "https://www.youtube.com/watch?v=5MRTCayjzQk",
      "type": "video"
    }
  ],
  "cloud-m2-1": [
    {
      "title": "AWS IAM Explained for Beginners | Users, Groups, Roles, Permissions with Examples (CodeSnippet by Chetan)",
      "url": "https://www.youtube.com/watch?v=B-MwKnNBh5s",
      "type": "video"
    },
    {
      "title": "Overview of Users, Groups, Roles and Policies | AWS IAM (Digital Cloud Training)",
      "url": "https://www.youtube.com/watch?v=PjKvwxTTSUk",
      "type": "video"
    }
  ],
  "cloud-m2-2": [
    {
      "title": "AWS IAM Policies Explained -- From JSON Structure to Real-World Security Patterns (DevXOps Tech)",
      "url": "https://www.youtube.com/watch?v=13-9hB_bhNc",
      "type": "video"
    },
    {
      "title": "AWS IAM Policies Tutorial: Write JSON Policies for Beginners | Fine-Grained Access Control (CodeLucky)",
      "url": "https://www.youtube.com/watch?v=IpByb6Z6Yh0",
      "type": "video"
    }
  ],
  "cloud-m2-3": [
    {
      "title": "IAM Policy Evaluation Logic | AWS IAM (Digital Cloud Training)",
      "url": "https://www.youtube.com/watch?v=PC6a-5VzrRw",
      "type": "video"
    },
    {
      "title": "AWS IAM Permissions Boundary (Digital Cloud Training)",
      "url": "https://www.youtube.com/watch?v=t8P8ffqWrsY",
      "type": "video"
    }
  ],
  "cloud-m2-4": [
    {
      "title": "IAM Policy Evaluation Series: policy evaluation chains | Amazon Web Services (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=71-Gjo6a5Cs",
      "type": "video"
    },
    {
      "title": "How does IAM evaluation logic work using an explicit Deny policy with multiple condition keys? (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=8KLh1idp-1M",
      "type": "video"
    }
  ],
  "cloud-m2-5": [
    {
      "title": "AWS STS Deep Dive: AssumeRole and Cross-Account Patterns (Cloud Explainers)",
      "url": "https://www.youtube.com/watch?v=b-R40XGKrF4",
      "type": "video"
    },
    {
      "title": "AWS AssumeRole Explained | IAM Roles, STS & Temporary Credentials Demo (Anything Cloud)",
      "url": "https://www.youtube.com/watch?v=xNYPZxd_m4M",
      "type": "video"
    }
  ],
  "cloud-m2-6": [
    {
      "title": "Automatic Least Privilege in AWS (AI Security Engineers Community)",
      "url": "https://www.youtube.com/watch?v=YlDSIYqLIYM",
      "type": "video"
    },
    {
      "title": "What is the Principle of Least Privilege? (Google Cloud Tech)",
      "url": "https://www.youtube.com/watch?v=8GZ6516Kao4",
      "type": "video"
    }
  ],
  "cloud-m2-7": [
    {
      "title": "Azure Active Directory (AD, AAD) Tutorial | Identity and Access Management Service (Adam Marczak - Azure for Everyone)",
      "url": "https://www.youtube.com/watch?v=Ma7VAQE7ga4",
      "type": "video"
    },
    {
      "title": "IAM Explained in Google Cloud: Manage Access and Permissions (TechTrapture)",
      "url": "https://www.youtube.com/watch?v=iTY64is1-qk",
      "type": "video"
    }
  ],
  "cloud-m3-1": [
    {
      "title": "Finding Domains Using Certificate Transparency (NahamSec)",
      "url": "https://www.youtube.com/watch?v=siELBLVW5cU",
      "type": "video"
    },
    {
      "title": "S3 Bucket Recon: Finding Exposed AWS Buckets Like a Pro! (𝙇𝙤𝙨𝙩𝙨𝙚𝙘)",
      "url": "https://www.youtube.com/watch?v=LEFikziGL6s",
      "type": "video"
    }
  ],
  "cloud-m3-2": [
    {
      "title": "Learn Trufflehog in Under 10 Min (Journey Cybersecurity)",
      "url": "https://www.youtube.com/watch?v=Tma0bKnlOlw",
      "type": "video"
    },
    {
      "title": "Finding Leaked Server Passwords with Trufflehog (bRootForce)",
      "url": "https://www.youtube.com/watch?v=J2qVGYOAXlY",
      "type": "video"
    }
  ],
  "cloud-m3-3": [
    {
      "title": "Intro to AWS IAM Enumeration | Walkthrough | Pwned Labs (Pwned Labs)",
      "url": "https://www.youtube.com/watch?v=i6lyGaLAnRk",
      "type": "video"
    },
    {
      "title": "Securing AWS Discover Cloud Vulnerabilities via Pentesting Techniques | Beau Bullock (Black Hills Information Security)",
      "url": "https://www.youtube.com/watch?v=fg_hey18tio",
      "type": "video"
    }
  ],
  "cloud-m3-4": [
    {
      "title": "intro to AWS PENTESTING (with Pacu) (Cybr)",
      "url": "https://www.youtube.com/watch?v=IbqjtqTeyr0",
      "type": "video"
    },
    {
      "title": "GrrCon 2018 Augusta17 Pacu Attack and Post Exploitation in AWS Spencer Gietzen (Adrian Crenshaw)",
      "url": "https://www.youtube.com/watch?v=BT4py9n2WTA",
      "type": "video"
    }
  ],
  "cloud-m3-5": [
    {
      "title": "BSidesSF 2019 - Lyft Cartography: Automating Security Visibility and Democratization (Sacha Fau (Security BSides San Francisco)",
      "url": "https://www.youtube.com/watch?v=ZukUmZSKSek",
      "type": "video"
    }
  ],
  "cloud-m3-6": [
    {
      "title": "Intro to Azure Recon with BloodHound | Walkthrough | Pwned Labs (Pwned Labs)",
      "url": "https://www.youtube.com/watch?v=eGYfP8SPxTA",
      "type": "video"
    },
    {
      "title": "Hacking Google Cloud Platform (GCP) - Part 1 - Enumeration (Tyler Ramsbey - Hack Smarter)",
      "url": "https://www.youtube.com/watch?v=sc2ySPGRiFM",
      "type": "video"
    }
  ],
  "cloud-m4-2": [
    {
      "title": "AWS IAM PassRole Explained (Prasad Domala)",
      "url": "https://www.youtube.com/watch?v=hzJB1W0PAAA",
      "type": "video"
    },
    {
      "title": "Auditing PassRole: Finding Hidden Trails of Problematic Privilege Escalation Permission - Noam  (fwd:cloudsec)",
      "url": "https://www.youtube.com/watch?v=R039RTcy6_w",
      "type": "video"
    }
  ],
  "cloud-m4-4": [
    {
      "title": "Resource Policies & SCPs --- [Attacking & Defending AWS - TryHackMe - Part 6] (Tyler Ramsbey - Hack Smarter)",
      "url": "https://www.youtube.com/watch?v=zh3eSRRPVlQ",
      "type": "video"
    }
  ],
  "cloud-m4-6": [
    {
      "title": "AWS IAM Privilege Escalation Attacks & Defenses (Cybr)",
      "url": "https://www.youtube.com/watch?v=Sn3Az9pcAOU",
      "type": "video"
    },
    {
      "title": "Speeding Up AWS IAM Least Privileges with Cloudsplaining, Elastic Stack, & AWS Access Analyzer (SANS Cloud Security)",
      "url": "https://www.youtube.com/watch?v=LJfe1jMAeFk",
      "type": "video"
    }
  ],
  "cloud-m4-7": [
    {
      "title": "AWS IAM Permissions Boundary (Digital Cloud Training)",
      "url": "https://www.youtube.com/watch?v=t8P8ffqWrsY",
      "type": "video"
    },
    {
      "title": "AWS Solution Architect | IAM Access Analyzer - Part 8 (Rahul Wagh)",
      "url": "https://www.youtube.com/watch?v=m2w-18Mx3dQ",
      "type": "video"
    }
  ],
  "cloud-m5-1": [
    {
      "title": "Protect Your AWS S3 files with Policies and ACLs! (Alex Rusin)",
      "url": "https://www.youtube.com/watch?v=bkc8mYX-Mjo",
      "type": "video"
    }
  ],
  "cloud-m5-2": [
    {
      "title": "S3 Bucket Recon: Finding Exposed AWS Buckets Like a Pro! (𝙇𝙤𝙨𝙩𝙨𝙚𝙘)",
      "url": "https://www.youtube.com/watch?v=LEFikziGL6s",
      "type": "video"
    },
    {
      "title": "Exploiting Publicly Exposed GCP Storage Buckets! (Hac )",
      "url": "https://www.youtube.com/watch?v=JAr0jDz_AuA",
      "type": "video"
    }
  ],
  "cloud-m5-3": [
    {
      "title": "Amazon S3 Presigned URLs Uploads and Downloads Tutorial (Milan Jovanović)",
      "url": "https://www.youtube.com/watch?v=V2arOZ72d6M",
      "type": "video"
    },
    {
      "title": "A Guide to S3 Pre-Signed URLs: What They Are and How They Work (Forward Networks)",
      "url": "https://www.youtube.com/watch?v=ITSFLfqWy8o",
      "type": "video"
    }
  ],
  "cloud-m5-4": [
    {
      "title": "AWS Backup Demo: Cross-Account & Cross-Region Backup (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=dCy7ixko3tE",
      "type": "video"
    }
  ],
  "cloud-m5-5": [
    {
      "title": "Encrypting Data with AWS KMS (Enlear Academy)",
      "url": "https://www.youtube.com/watch?v=eIvbUU8VH30",
      "type": "video"
    },
    {
      "title": "AWS Envelope Encryption Explained | Data Encryption Keys (DEK) & KMS (CloudWolf AWS)",
      "url": "https://www.youtube.com/watch?v=OPCzAwY3Wj4",
      "type": "video"
    }
  ],
  "cloud-m5-6": [
    {
      "title": "Exfiltration Paths in Isolated Environments using VPC Endpoints (SANS Cloud Security)",
      "url": "https://www.youtube.com/watch?v=mFK-GksgopI",
      "type": "video"
    }
  ],
  "cloud-m6-1": [
    {
      "title": "Secrets Manager vs Parameter Store: Which Should You Use? (cloudmancer)",
      "url": "https://www.youtube.com/watch?v=ULU2cRQI4hY",
      "type": "video"
    },
    {
      "title": "Back to Basics: Secrets Management (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=NwEg5yKv_QE",
      "type": "video"
    }
  ],
  "cloud-m6-2": [
    {
      "title": "Gitleaks - Find Secrets Like API Keys, Tokens, Passwords - Install and Test Locally (Fahd Mirza)",
      "url": "https://www.youtube.com/watch?v=VB6yohnukGk",
      "type": "video"
    }
  ],
  "cloud-m6-3": [
    {
      "title": "️AWS Secrets Manager in Action Protect Your Secrets In Cloud (CodeSnippet by Chetan)",
      "url": "https://www.youtube.com/watch?v=5LyYH9nC67g",
      "type": "video"
    }
  ],
  "cloud-m6-4": [
    {
      "title": "Secure access to GKE workloads with Workload Identity (Google Cloud Tech)",
      "url": "https://www.youtube.com/watch?v=4OzbPaJCUr8",
      "type": "video"
    },
    {
      "title": "Access Google Cloud from GitHub Action Sans Keys - Workload Identity Federation (Cloud Advocate)",
      "url": "https://www.youtube.com/watch?v=zRF5uTWXV8Y",
      "type": "video"
    }
  ],
  "cloud-m6-5": [
    {
      "title": "AWS Envelope Encryption Explained | Data Encryption Keys (DEK) & KMS (CloudWolf AWS)",
      "url": "https://www.youtube.com/watch?v=OPCzAwY3Wj4",
      "type": "video"
    },
    {
      "title": "Encrypting Data with AWS KMS (Enlear Academy)",
      "url": "https://www.youtube.com/watch?v=eIvbUU8VH30",
      "type": "video"
    }
  ],
  "cloud-m7-1": [
    {
      "title": "AWS how to setup VPC, Public, Private Subnet, NAT, Internet Gateway, Route Table? - (Part-5) (Rahul Wagh)",
      "url": "https://www.youtube.com/watch?v=43tIX7901Gs",
      "type": "video"
    },
    {
      "title": "Amazon VPC Explained for Beginners: Subnets, Route Tables, NAT, Security Groups and NACLs (Trustscrin CloudLab )",
      "url": "https://www.youtube.com/watch?v=iK3y-5UhJrU",
      "type": "video"
    }
  ],
  "cloud-m7-2": [
    {
      "title": "#NahamCon2024: Deep Dive Into AWS Instance Metadata | @congon4tor (NahamSec)",
      "url": "https://www.youtube.com/watch?v=pa0wYm2sJbs",
      "type": "video"
    }
  ],
  "cloud-m7-3": [
    {
      "title": "How Hackers Steal Cloud Credentials with SSRF and How to Stop It (KodeKloud)",
      "url": "https://www.youtube.com/watch?v=SC1WEe5-WDA",
      "type": "video"
    },
    {
      "title": "Find and Exploit Server-Side Request Forgery (SSRF) (The Cyber Mentors)",
      "url": "https://www.youtube.com/watch?v=eVI0Ny5cZ2c",
      "type": "video"
    }
  ],
  "cloud-m7-4": [
    {
      "title": "What is ASM (Attack Surface Management)? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=NqKid53v5x8",
      "type": "video"
    },
    {
      "title": "Exploring the Wiz Cloud Security Platform (John Hammond)",
      "url": "https://www.youtube.com/watch?v=ueM8XxkUSFI",
      "type": "video"
    }
  ],
  "cloud-m7-5": [
    {
      "title": "AWS Pentesting - Creating cloud lab for VPC lateral movement (Cyber's Secret)",
      "url": "https://www.youtube.com/watch?v=0oZjhP5hcyQ",
      "type": "video"
    },
    {
      "title": "Keep Your Network Traffic in AWS with VPC Endpoints | Overview and Tutorial (Be A Better Dev)",
      "url": "https://www.youtube.com/watch?v=jo3X_aay4Vs",
      "type": "video"
    }
  ],
  "cloud-m7-6": [
    {
      "title": "Transition to IMDSv2 on EC2 - Introduction, Preparation, Pitfalls (cloudonaut)",
      "url": "https://www.youtube.com/watch?v=bi3bIs92xE0",
      "type": "video"
    },
    {
      "title": "How Hackers Steal Cloud Credentials with SSRF and How to Stop It (KodeKloud)",
      "url": "https://www.youtube.com/watch?v=SC1WEe5-WDA",
      "type": "video"
    }
  ],
  "cloud-m8-1": [
    {
      "title": "Serverless Attack Vectors (RSAC Cybersecurity)",
      "url": "https://www.youtube.com/watch?v=Zv2jFISTHuE",
      "type": "video"
    },
    {
      "title": "AWS Serverless Security: the Most Secure Way to Build in the Cloud (AWS Events)",
      "url": "https://www.youtube.com/watch?v=2s_x55xj010",
      "type": "video"
    }
  ],
  "cloud-m8-2": [
    {
      "title": "OWASP Serverless Top 10 - TAL MELAMED (OWASP Foundation)",
      "url": "https://www.youtube.com/watch?v=3A49USGCmvU",
      "type": "video"
    },
    {
      "title": "Alexa, Hack My Server(less) Please (Black Hat)",
      "url": "https://www.youtube.com/watch?v=R78An94BFaY",
      "type": "video"
    }
  ],
  "cloud-m8-3": [
    {
      "title": "Privilege Escalation via Lambda – Attack and Investigation Series (Check Point Software)",
      "url": "https://www.youtube.com/watch?v=_--yB9u-aco",
      "type": "video"
    }
  ],
  "cloud-m8-4": [
    {
      "title": "Secure your API Gateway with Lambda Authorizer | Step by Step AWS Tutorial (Be A Better Dev)",
      "url": "https://www.youtube.com/watch?v=al5I9v5Y-kA",
      "type": "video"
    },
    {
      "title": "AWS API Gateway Explained | Create, Manage & Secure APIs Easily | Hands on Demo ⌨️ (CodeSnippet by Chetan)",
      "url": "https://www.youtube.com/watch?v=cr1BdiU35Uw",
      "type": "video"
    }
  ],
  "cloud-m8-5": [
    {
      "title": "Supply Chain Vulnerabilities - CompTIA Security+ SY0-701 - 2.3 (Professor Messer)",
      "url": "https://www.youtube.com/watch?v=WqvCJLpwExY",
      "type": "video"
    },
    {
      "title": "The largest supply-chain attack ever… (Fireship)",
      "url": "https://www.youtube.com/watch?v=QVqIx-Y8s-s",
      "type": "video"
    }
  ],
  "cloud-m8-6": [
    {
      "title": "AWS re:Invent 2024 - Implementing security best practices for serverless applications (SVS324) (AWS Events)",
      "url": "https://www.youtube.com/watch?v=jYbfQ07Z7rM",
      "type": "video"
    },
    {
      "title": "AWS re:Invent 2021 - Serverless security best practices (AWS Events)",
      "url": "https://www.youtube.com/watch?v=nEaAuX4O9TU",
      "type": "video"
    }
  ],
  "cloud-m9-1": [
    {
      "title": "Container Security Fundamentals - Containers Are Just Processes (Datadog)",
      "url": "https://www.youtube.com/watch?v=7CKCWqUkMJ4",
      "type": "video"
    },
    {
      "title": "Container Security Fundamentals - Linux Namespaces (Part 1): The Mount Namespace (Datadog)",
      "url": "https://www.youtube.com/watch?v=BwI89OnYm-4",
      "type": "video"
    }
  ],
  "cloud-m9-2": [
    {
      "title": "Container Security Explained End to End | Dockerfile to Kubernetes Production (Cloud Advocate)",
      "url": "https://www.youtube.com/watch?v=mBiUKUycvts",
      "type": "video"
    },
    {
      "title": "Understand & Secure Supply Chain (SBOM): Demo BOM, SYFT, TRIVY & GRYPE (Cyber Secure)",
      "url": "https://www.youtube.com/watch?v=dI6b0mhj5Ks",
      "type": "video"
    }
  ],
  "cloud-m9-3": [
    {
      "title": "Escaping a Docker container (Sysdig)",
      "url": "https://www.youtube.com/watch?v=ZbHVRoWEwA8",
      "type": "video"
    },
    {
      "title": "Docker Containers - How Hackers Can ESCAPE Them in Seconds! (Better Stack)",
      "url": "https://www.youtube.com/watch?v=giXlSlFLKwA",
      "type": "video"
    }
  ],
  "cloud-m9-4": [
    {
      "title": "Kubernetes Security: Attacking and Defending Modern Infrastructure (RSAC Cybersecurity)",
      "url": "https://www.youtube.com/watch?v=iCzUv6-9zrI",
      "type": "video"
    },
    {
      "title": "Kubernetes Explained in 6 Minutes | k8s Architecture (ByteByteGo)",
      "url": "https://www.youtube.com/watch?v=TlHvYWVUZyc",
      "type": "video"
    }
  ],
  "cloud-m9-5": [
    {
      "title": "Understanding Kubernetes RBAC | Access control basics explained (That DevOps Guy)",
      "url": "https://www.youtube.com/watch?v=jvhKOAyD8S8",
      "type": "video"
    },
    {
      "title": "Kubernetes RBAC Explained (Anton Putra)",
      "url": "https://www.youtube.com/watch?v=iE9Qb8dHqWI",
      "type": "video"
    }
  ],
  "cloud-m9-6": [
    {
      "title": "Kubernetes Security Best Practices you need to know | THE Guide for securing your K8s cluster! (TechWorld with Nana)",
      "url": "https://www.youtube.com/watch?v=oBf5lrmquYI",
      "type": "video"
    },
    {
      "title": "Day-5 | Kubernetes Security Tutorial - RBAC, Network Policies, Kyverno, Secrets, External Secre (Abhishek.Veeramalla)",
      "url": "https://www.youtube.com/watch?v=o7-H8QWUPqI",
      "type": "video"
    }
  ],
  "cloud-m9-7": [
    {
      "title": "Kubernetes to Cloud Attack Vectors: Demos Inside - Danny Hershko Shemesh & Alon Schindel, Wiz (CNCF [Cloud Native Computing Foundation])",
      "url": "https://www.youtube.com/watch?v=_VcmdlV6xaY",
      "type": "video"
    }
  ],
  "cloud-m10-1": [
    {
      "title": "AWS CloudTrail – API Auditing, Events, and Monitoring (Digital Cloud Training)",
      "url": "https://www.youtube.com/watch?v=IIgMX2ILK6g",
      "type": "video"
    },
    {
      "title": "\"CloudTrail Logging Internals: A Methodology For Investigating AWS Security Incidents\" - Eliav  (fwd:cloudsec)",
      "url": "https://www.youtube.com/watch?v=w_ysQTOqYHI",
      "type": "video"
    }
  ],
  "cloud-m10-2": [
    {
      "title": "AWS Guard Duty & Detective Tutorial & Demo (Cloud With Manu)",
      "url": "https://www.youtube.com/watch?v=yK6le5AuDLU",
      "type": "video"
    },
    {
      "title": "AWS Security Series Episode 3 Amazon GuardDuty Explained AWS Threat Detection & Security Monito (KubeNine)",
      "url": "https://www.youtube.com/watch?v=ZRJyfw8Gv3k",
      "type": "video"
    }
  ],
  "cloud-m10-3": [
    {
      "title": "Unlock traffic visibility across your network (Google Cloud)",
      "url": "https://www.youtube.com/watch?v=5r_FqspEI8g",
      "type": "video"
    },
    {
      "title": "Using AWS Networking and Logging Features to Enhance Security (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=a23TGXx6gEA",
      "type": "video"
    }
  ],
  "cloud-m10-4": [
    {
      "title": "Use Athena to Query AWS Cloudtrail Logs (CloudwithJerry)",
      "url": "https://www.youtube.com/watch?v=LoAvYew3s9g",
      "type": "video"
    },
    {
      "title": "Using Athena with CloudTrail logs - SCS-C03 (Cybr)",
      "url": "https://www.youtube.com/watch?v=IReDwvrjHXw",
      "type": "video"
    }
  ],
  "cloud-m10-5": [
    {
      "title": "Building Detections For Cloud With Kql and ATT&CK - November 2020 (mitrecorp (The MITRE Corporation))",
      "url": "https://www.youtube.com/watch?v=dEORNlCS7xc",
      "type": "video"
    },
    {
      "title": "SANS Webcast | Detection Engineering in the Cloud: A Defenders Wonderland (SANS Cloud Security)",
      "url": "https://www.youtube.com/watch?v=1yG49PfRZmQ",
      "type": "video"
    }
  ],
  "cloud-m10-6": [
    {
      "title": "AWS re:Invent 2020: Building your cloud incident response program (AWS Events)",
      "url": "https://www.youtube.com/watch?v=MW7kcXL6OVo",
      "type": "video"
    }
  ],
  "cloud-m11-1": [
    {
      "title": "Attacking AWS: the full cyber kill chain | SANS Cloud & DevOps Security Summit 2020 (SANS Cloud Security)",
      "url": "https://www.youtube.com/watch?v=njsNy2bNuT8",
      "type": "video"
    },
    {
      "title": "Breaking the Cloud Kill Chain (SANS Cloud Security)",
      "url": "https://www.youtube.com/watch?v=1ipdbiIFQeg",
      "type": "video"
    }
  ],
  "cloud-m11-3": [
    {
      "title": "Pivoting in Amazon Clouds (Black Hat)",
      "url": "https://www.youtube.com/watch?v=2NF4LjjwoZw",
      "type": "video"
    }
  ],
  "cloud-m11-5": [
    {
      "title": "Analyzing Data Exfiltration in AWS Cloud with Amazon Athena (CYBERWOX)",
      "url": "https://www.youtube.com/watch?v=FxzG8fsADKc",
      "type": "video"
    }
  ],
  "cloud-m11-6": [
    {
      "title": "Find Privilege Escalation Paths in Microsoft Azure with AzureHound (Beau Bullock)",
      "url": "https://www.youtube.com/watch?v=m33VeLRUi4w",
      "type": "video"
    }
  ],
  "cloud-m11-7": [
    {
      "title": "So You Think You Can Secure Your Cloud : Red Team Engagements in GCP | Pen Test HackFest Summit (SANS Offensive Operations)",
      "url": "https://www.youtube.com/watch?v=AwXswDg-rKc",
      "type": "video"
    },
    {
      "title": "RED TEAM IN CLOUD (Cloud Security Podcast)",
      "url": "https://www.youtube.com/watch?v=pKpaXhsVMoI",
      "type": "video"
    }
  ],
  "cloud-m12-1": [
    {
      "title": "What is CSPM (Cloud Security Posture Management)? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=V4wmb5KVmKM",
      "type": "video"
    },
    {
      "title": "Cloud Security - What is CSPM / CNAP? Cloud Security Posture Management explained (Aikido Security)",
      "url": "https://www.youtube.com/watch?v=R9nlg5zsmiM",
      "type": "video"
    }
  ],
  "cloud-m12-2": [
    {
      "title": "CIS Benchmark on AWS Explained with Examples (Cloud Security Podcast)",
      "url": "https://www.youtube.com/watch?v=tZtPHh49JyQ",
      "type": "video"
    }
  ],
  "cloud-m12-3": [
    {
      "title": "Building a Cybersecurity Framework (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=Ula3TG8QS7g",
      "type": "video"
    }
  ],
  "cloud-m12-4": [
    {
      "title": "Enforce Preventive Guardrails Using Service Control Policies | Amazon Web Services (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=mEO05mmbSms",
      "type": "video"
    },
    {
      "title": "Building AWS Security Guardrails (Cloud Security Podcast)",
      "url": "https://www.youtube.com/watch?v=jW-LkpVvsLk",
      "type": "video"
    }
  ],
  "cloud-m12-5": [
    {
      "title": "Azure Landing Zones Overview (John Savill's Technical Training)",
      "url": "https://www.youtube.com/watch?v=mluS8ovuBKg",
      "type": "video"
    },
    {
      "title": "Why Landing Zones Matter (What are they and How to Build One) - Simone Bennett (NDC Conferences)",
      "url": "https://www.youtube.com/watch?v=huEzpDoLrqQ",
      "type": "video"
    }
  ],
  "cloud-m12-6": [
    {
      "title": "Cloud Security - What is CSPM / CNAP? Cloud Security Posture Management explained (Aikido Security)",
      "url": "https://www.youtube.com/watch?v=R9nlg5zsmiM",
      "type": "video"
    },
    {
      "title": "Enforce Preventive Guardrails Using Service Control Policies | Amazon Web Services (Amazon Web Services)",
      "url": "https://www.youtube.com/watch?v=mEO05mmbSms",
      "type": "video"
    }
  ],
  "cloud-m13-1": [
    {
      "title": "AZ-900 Episode 25 | Azure Identity Services | Authentication, Authorization & Active Directory  (Adam Marczak - Azure for Everyone)",
      "url": "https://www.youtube.com/watch?v=b_WIjY-burU",
      "type": "video"
    },
    {
      "title": "AZ-900 Episode 28 | Azure Role-based Access Control (RBAC) (Adam Marczak - Azure for Everyone)",
      "url": "https://www.youtube.com/watch?v=4v7ffXxOnwU",
      "type": "video"
    }
  ],
  "cloud-m13-2": [
    {
      "title": "Find Privilege Escalation Paths in Microsoft Azure with AzureHound (Beau Bullock)",
      "url": "https://www.youtube.com/watch?v=m33VeLRUi4w",
      "type": "video"
    },
    {
      "title": "Azure Cloud Security Meetup: Using Azurehound to Identify Azure Attack Paths by Kevin Mwanjumwa (David Okeyode)",
      "url": "https://www.youtube.com/watch?v=Jxx2nV6-wPE",
      "type": "video"
    }
  ],
  "cloud-m13-3": [
    {
      "title": "What are Service Accounts? (Google Cloud Tech)",
      "url": "https://www.youtube.com/watch?v=xXk1YlkKW_k",
      "type": "video"
    },
    {
      "title": "What is Cloud IAM? (Google Cloud Tech)",
      "url": "https://www.youtube.com/watch?v=xQClVtAECdg",
      "type": "video"
    }
  ],
  "cloud-m13-4": [
    {
      "title": "Privilege Escalation in GCP A Transitive Path (SANS Cloud Security)",
      "url": "https://www.youtube.com/watch?v=dRVFoyQxRiU",
      "type": "video"
    }
  ],
  "cloud-m13-5": [
    {
      "title": "Your CI/CD Pipeline is My Attack Path: Graphing GitHub OIDC to Cloud Takeover | SO-CON 2026 (SpecterOps)",
      "url": "https://www.youtube.com/watch?v=97HQ_Y3DBbM",
      "type": "video"
    },
    {
      "title": "AWS re:Invent 2025 - Easy cross-cloud authN : AWS outbound identity federation in action (SEC23 (AWS Events)",
      "url": "https://www.youtube.com/watch?v=gkMnYCMJmBI",
      "type": "video"
    }
  ],
  "cloud-m13-6": [
    {
      "title": "What Is Cloud Security Posture Management (CSPM)? How to Secure Multicloud Environments (Prisma Cloud by Palo Alto Networks)",
      "url": "https://www.youtube.com/watch?v=jSAJrphRjIc",
      "type": "video"
    },
    {
      "title": "What is CSPM (Cloud Security Posture Management)? (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=V4wmb5KVmKM",
      "type": "video"
    }
  ],
  "m11-10": [
    {
      "title": "Basic Pentesting - Full Walkthrough | TryHackMe | CTF for Hackers (HackHunt)",
      "url": "https://www.youtube.com/watch?v=iaCfgtUF9-o",
      "type": "video"
    },
    {
      "title": "Simple CTF TryHackMe Full Walk-through (CAPS LOCK DAVE)",
      "url": "https://www.youtube.com/watch?v=WB0B4mJiWWg",
      "type": "video"
    }
  ],
  "m15-5": [
    {
      "title": "How to Become a Top Bug Bounty Hunter in 2026 (NahamSec)",
      "url": "https://www.youtube.com/watch?v=oFxcG7yerG4",
      "type": "video"
    },
    {
      "title": "How To Learn Bug Bounty Hunting - a Full Guide (2026) (CyberFlow)",
      "url": "https://www.youtube.com/watch?v=1F0mEkfxlaM",
      "type": "video"
    }
  ],
  "m16-4": [
    {
      "title": "Attack Tutorial: How a Pass the Hash Attack Works (Netwrix)",
      "url": "https://www.youtube.com/watch?v=7bxyWOQuj9c",
      "type": "video"
    }
  ],
  "m16-5": [
    {
      "title": "Kerberos Golden Ticket Attack Explained (VbScrub)",
      "url": "https://www.youtube.com/watch?v=o98_eRt777Y",
      "type": "video"
    }
  ],
  "m16-6": [
    {
      "title": "Kerberos Silver Ticket Attack Explained (VbScrub)",
      "url": "https://www.youtube.com/watch?v=_nJ-b1UFDVM",
      "type": "video"
    },
    {
      "title": "Attack Tutorial: How Silver Ticket Attack Works (Netwrix)",
      "url": "https://www.youtube.com/watch?v=k9IGSmZaEHk",
      "type": "video"
    }
  ],
  "m16-7": [
    {
      "title": "DC Sync Attacks With Secretsdump.py (VbScrub)",
      "url": "https://www.youtube.com/watch?v=QfyZQDyeXjQ",
      "type": "video"
    }
  ],
  "m16-8": [
    {
      "title": "Active Directory Enumeration With BloodHound (HackerSploit)",
      "url": "https://www.youtube.com/watch?v=sGO4F23Xik4",
      "type": "video"
    }
  ],
  "m17-9": [
    {
      "title": "The Complete Windows Privilege Escalation Course | TryHackMe Windows Privesc | OSCP (Motasem Hamdan )",
      "url": "https://www.youtube.com/watch?v=k_99-dXtdpc",
      "type": "video"
    }
  ],
  "m18-3": [
    {
      "title": "How to find offset by using cyclic in stack based buffer overflow exploit (Abdelkader Belcaid)",
      "url": "https://www.youtube.com/watch?v=1C8FAokAV5U",
      "type": "video"
    },
    {
      "title": "Exploit Development Part 2 : Finding and Overwriting Offset (Tech69)",
      "url": "https://www.youtube.com/watch?v=ij8TcFC8TtM",
      "type": "video"
    }
  ],
  "m21-7": [
    {
      "title": "Writing a Pentest Report (The Cyber Mentors)",
      "url": "https://www.youtube.com/watch?v=EOoBAq6z4Zk",
      "type": "video"
    },
    {
      "title": "How To Write A Pentest Report That Gets Your Findings Fixed (NahamSec)",
      "url": "https://www.youtube.com/watch?v=oBtJ7bryKII",
      "type": "video"
    }
  ],
  "ai-m11-3": [
    {
      "title": "Anatomy of an AI ATTACK: MITRE ATLAS (IBM Technology)",
      "url": "https://www.youtube.com/watch?v=QhoG74PDFyc",
      "type": "video"
    },
    {
      "title": "MITRE ATLAS™ Introduction (mitrecorp (The MITRE Corporation))",
      "url": "https://www.youtube.com/watch?v=3FN9v-y-C-w",
      "type": "video"
    }
  ],
  "cloud-m4-1": [
    {
      "title": "AWS IAM Privilege Escalation Attacks & Defenses (Cybr)",
      "url": "https://www.youtube.com/watch?v=Sn3Az9pcAOU",
      "type": "video"
    }
  ],
  "cloud-m6-6": [
    {
      "title": "AWS Secrets Manager Step-by-Step: Store, Rotate & Delete Secrets (Tiny Technical Tutorials)",
      "url": "https://www.youtube.com/watch?v=ItzzgWe7elE",
      "type": "video"
    }
  ],
  "cloud-m11-2": [
    {
      "title": "Cross-account access with roles - AWS SCS-C03 (Cybr)",
      "url": "https://www.youtube.com/watch?v=yvSwNz5G5xk",
      "type": "video"
    },
    {
      "title": "Cross account IAM - How to use IAM role from another AWS account | Hands-On Tutorial 2023 (Lepczynski – Practical Tech, Cloud, AI & Home Lab)",
      "url": "https://www.youtube.com/watch?v=Qrm84k9vRXg",
      "type": "video"
    }
  ]
}
