# Installing_DeepSeek

_Category: Hacking with AI / Leverage AI for Hacking — Source: https://www.canva.com/design/DAGqTNhgIWE/IDotQD2cB8bwx3mmZcI85Q/edit_

---

## Slide 1

INSTALLING DEEPSEEK
R1 LOCALLY

Installing DeepSeek R1 Locally

## Slide 2

DeepSeek R1 is an advanced AI model designed to operate locally on your computer. 

It functions similarly to ChatGPT or GitHub Copilot, but without relying on cloud
services. With DeepSeek, you can write code, ask questions, analyze text, and 

more all while maintaining full control of your data.

Running DeepSeek locally offers privacy, customization, and offline access,
making it ideal for students, researchers, and professionals who want to
explore AI safely and independently.

INTRODUCTION

Introduction

DeepSeek R1 is an advanced AI model designed to operate locally on your computer.

It functions similarly to ChatGPT or GitHub Copilot, but without relying on cloud services. With DeepSeek, you can write code, ask questions, analyze text, and

more all while maintaining full control of your data.

Running DeepSeek locally offers privacy, customization, and offline access, making it ideal for students, researchers, and professionals who want to explore AI safely and independently.

## Slide 3

To run DeepSeek locally, you need a backend tool to download, configure, and manage
the model efficiently. That tool is Ollama.

WHAT IS OLLAMA AND WHY IS IT REQUIRED?

What is Ollama and Why Is It Required?

To run DeepSeek locally, you need a backend tool to download, configure, and manage the model efficiently. That tool is Ollama.

## Slide 4

Ollama is a lightweight platform that allows users to run large language models (LLMs)
on their own machines without needing advanced technical skills. It supports models
like DeepSeek, LLaMA, and others. Ollama handles system optimization, resource
management, and model integration—all in one place.

WHAT IS OLLAMA?

LLM

What is Ollama?

Ollama is a lightweight platform that allows users to run large language models (LLMs) on their own machines without needing advanced technical skills. It supports models like DeepSeek, LLaMA, and others. Ollama handles system optimization, resource management, and model integration—all in one place.

llm

## Slide 5

WHY DO WE USE OLLAMA FOR DEEPSEEK?

Downloading and
storing model files

Running the model
efficiently

 (with or without a GPU)

DeepSeek does not come as a ready-to-run desktop application. 

It requires a framework to handle:

Ollama takes care of all of this in a single, simplified process.

Connecting it with user-
friendly tools 

(like VS Code)

Why Do We Use Ollama for DeepSeek?

DeepSeek does not come as a ready-to-run desktop application.

It requires a framework to handle:

Downloading and storing model files

Running the model efficiently

(with or without a GPU)

Connecting it with user-friendly tools

(like VS Code)

Ollama takes care of all of this in a single, simplified process.

## Slide 6

Simplifies installation 

You only need one
command to install
and launch DeepSeek.

Manages system resources

 Optimizes performance
whether you're using a CPU or
GPU.

HOW OLLAMA HELPS

How Ollama Helps

Simplifies installation

You only need one command to install and launch DeepSeek.

Manages system resources

Optimizes performance whether you're using a CPU or GPU.

## Slide 7

Supports integration

 Can connect with Visual
Studio Code and other
applications for seamless AI-
assisted workflows.




Keeps everything local

Your data stays on your
computer—nothing is sent to
external servers.

HOW OLLAMA HELPS

How Ollama Helps

Supports integration

Can connect with Visual Studio Code and other applications for seamless AI-assisted workflows.

Keeps everything local

Your data stays on your computer—nothing is sent to external servers.

## Slide 8

SYSTEM REQUIREMENTS

	


	


	


	


	

COMPONENT

MINIMUM REQUIREMENT

OS

RAM

Storage

GPU

Windows 10/11, macOS, or Linux

16 GB (32 GB recommended)

20–50 GB free space

Optional – NVIDIA CUDA
supported GPU for acceleration

System Requirements

Empty	Empty
Empty	Empty
Empty	Empty
Empty	Empty
Empty	Empty

Component

OS

Minimum Requirement

Windows 10/11, macOS, or Linux

RAM

16 GB (32 GB recommended)

Storage

20–50 GB free space

GPU

Optional – NVIDIA CUDA supported GPU for acceleration

## Slide 9

Go to https://ollama.com/download

STEP 1: INSTALL OLLAMA

Choose the version for your operating system (Windows, macOS, or Linux)

Download and install Ollama following the on-screen instructions

STEP-BY-STEP: INSTALL DEEPSEEK R1 LOCALLY
USING OLLAMA

Step-by-Step: Install DeepSeek R1 Locally Using Ollama

Step 1: Install Ollama

Go to https://ollama.com/download

Choose the version for your operating system (Windows, macOS, or Linux)

Download and install Ollama following the on-screen instructions

## Slide 10

On Windows: Open Command Prompt

On macOS/Linux: Open Terminal

STEP 2: OPEN TERMINAL OR COMMAND PROMPT

Step 2: Open Terminal or Command Prompt

On Windows: Open Command Prompt

On macOS/Linux: Open Terminal

## Slide 11

Type the following command:

It may take a few minutes depending on your internet speed

This command will download and start the DeepSeek model locally

STEP 3: RUN THE DEEPSEEK MODEL

ollama run deepseek-coder:6.7b

Step 3: Run the DeepSeek Model

Type the following command:

ollama run deepseek-coder:6.7b

This command will download and start the DeepSeek model locally

It may take a few minutes depending on your internet speed

## Slide 12

Open Visual Studio Code

Install the Continue extension from the marketplace:
https://marketplace.visualstudio.com/items?itemName=Continue.continue

The extension will automatically detect DeepSeek if Ollama is
running

STEP 4: (OPTIONAL) INTEGRATE WITH VISUAL STUDIO CODE

Step 4: (Optional) Integrate with Visual Studio Code

Open Visual Studio Code

Install the Continue extension from the marketplace: https://marketplace.visualstudio.com/items?itemName=Continue.continue

The extension will automatically detect DeepSeek if Ollama is running

## Slide 13

To keep DeepSeek updated:

ollama pull deepseek-coder:6.7b

This ensures you always have the latest stable release.

UPDATING THE MODEL

Updating the Model

To keep DeepSeek updated:

ollama pull deepseek-coder:6.7b

This ensures you always have the latest stable release.

## Slide 14

Installing DeepSeek locally using Ollama is a practical and secure way to experience
advanced AI. It requires no deep technical background, works offline, and offers full
control over data and performance. With just one tool—Ollama—you can unlock the
power of private, open-source language models right from your desktop.

CONCLUSION

Conclusion

Installing DeepSeek locally using Ollama is a practical and secure way to experience advanced AI. It requires no deep technical background, works offline, and offers full control over data and performance. With just one tool—Ollama—you can unlock the power of private, open-source language models right from your desktop.
