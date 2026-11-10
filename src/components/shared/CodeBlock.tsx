"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

function detectLanguage(command: string): string {
  if (/^(Get-|Set-|New-|Remove-|Invoke-|\$)/i.test(command.trim())) return "powershell"
  if (/^(import |from |def |print\(|#!\/usr\/bin\/env python)/.test(command.trim())) return "python"
  return "bash"
}

export function CodeBlock({ command, language }: { command: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const lang = language ?? detectLanguage(command)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="overflow-hidden rounded-lg bg-background shadow-well">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-brand-orange">{lang}</span>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          )}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-scroll overflow-x-auto px-3 py-2">
        <code className="font-mono text-[13px] leading-relaxed text-foreground whitespace-pre">{command}</code>
      </pre>
    </div>
  )
}
