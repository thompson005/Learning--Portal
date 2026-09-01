"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { Download, Moon, Sun, Upload } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getProgress, updateProfile, exportProgress, importProgress, resetProgress } from "@/lib/store/progress"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [resetOpen, setResetOpen] = useState(false)
  const [resetStep, setResetStep] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
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
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Account & Data</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile, appearance, and data.</p>
      </div>

      <Card>
        <CardHeader>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Profile</p>
          <CardTitle className="text-base">Your details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Appearance</p>
          <CardTitle className="text-base">Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {mounted && theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="text-sm font-medium">Dark theme</span>
            </div>
            {mounted && (
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Data</p>
          <CardTitle className="text-base">Backup & reset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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
        </CardContent>
      </Card>

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
