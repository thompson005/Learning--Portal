"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Download, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getProgress, updateProfile, exportProgress, importProgress, resetProgress } from "@/lib/store/progress"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { Reveal } from "@/components/ui3d/Reveal"

export default function SettingsPage() {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [resetOpen, setResetOpen] = useState(false)
  const [resetStep, setResetStep] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const progress = getProgress()
    setName(progress.name)
    setStartDate(progress.startDate ? progress.startDate.slice(0, 10) : "")
  }, [])

  function handleSaveProfile() {
    updateProfile({ name, startDate })
    toast.success("Profile saved")
  }

  function handleExport() {
    const json = exportProgress()
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `technieum-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Backup downloaded")
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importProgress(reader.result as string)
        toast.success("Data restored")
        const progress = getProgress()
        setName(progress.name)
        setStartDate(progress.startDate ? progress.startDate.slice(0, 10) : "")
      } catch {
        toast.error("Invalid backup file")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  function handleReset() {
    if (resetStep === 0) {
      setResetStep(1)
      return
    }
    resetProgress()
    setName("")
    setStartDate("")
    setResetOpen(false)
    setResetStep(0)
    toast.success("Everything has been reset")
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Reveal
        as="section"
        className="glass-strong relative overflow-hidden rounded-3xl p-6 elev-2 md:p-8"
      >
        <MeshGradient strength={0.9} />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Account & Data</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your profile, appearance, and data.</p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <GlassCard className="p-6">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Profile</p>
            <h2 className="text-base font-semibold text-foreground">Your details</h2>
          </div>
          <div className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="settings-name">Your name</Label>
              <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-date">Programme start date</Label>
              <Input
                id="settings-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Used to calculate your current week automatically.</p>
            </div>
            <Button variant="default" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          </div>
        </GlassCard>
      </Reveal>

      <Reveal delay={160}>
        <GlassCard className="p-6">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Data</p>
            <h2 className="text-base font-semibold text-foreground">Backup & reset</h2>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4" /> Export all data
              </Button>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4" /> Import data
              </Button>
              <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleFileChange} />
            </div>
            <div className="border-t border-border pt-3">
              <p className="mb-2 text-sm font-medium text-destructive">Danger zone</p>
              <Button variant="destructive" onClick={() => setResetOpen(true)}>
                Reset everything
              </Button>
            </div>
          </div>
        </GlassCard>
      </Reveal>

      <Dialog open={resetOpen} onOpenChange={(o) => { setResetOpen(o); if (!o) setResetStep(0) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset everything?</DialogTitle>
            <DialogDescription>
              {resetStep === 0
                ? "This permanently clears your name, start date, and all topic/lab progress. This cannot be undone."
                : "Final confirmation — click Reset Everything to permanently erase all local data."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              {resetStep === 0 ? "Continue" : "Reset Everything"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
