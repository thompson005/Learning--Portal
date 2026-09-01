"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/shared/Logo"
import { updateProfile } from "@/lib/store/progress"
import { getSettings, updateSettings } from "@/lib/store/settings"

export function OnboardingModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  )
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const settings = getSettings()
    if (!settings.onboarded) setOpen(true)
  }, [])

  function handleSubmit() {
    if (!name.trim() || !confirmed) return
    updateProfile({ name: name.trim(), startDate })
    updateSettings({ onboarded: true })
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent hideClose className="max-w-md">
        <DialogHeader>
          <Logo className="mb-2" />
          <DialogTitle>
            Welcome to the Cybersecurity Onboarding Portal
          </DialogTitle>
          <DialogDescription>
            Let&apos;s set up your profile before you start the self-paced
            offensive security programme.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="onboard-name">Your name</Label>
            <Input
              id="onboard-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Smith"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="onboard-date">Programme start date</Label>
            <Input
              id="onboard-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Used to calculate your current week automatically.
            </p>
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5"
            />
            <span>I&apos;m ready to start.</span>
          </label>
        </div>

        <Button
          variant="default"
          className="w-full"
          disabled={!name.trim() || !confirmed}
          onClick={handleSubmit}
        >
          Start My Journey
        </Button>
      </DialogContent>
    </Dialog>
  )
}
