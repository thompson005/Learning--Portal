"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface LabFilterState {
  moduleId: string
  difficulty: string
  status: string
}

export function LabFilters({
  filters,
  onChange,
  modules,
}: {
  filters: LabFilterState
  onChange: (next: LabFilterState) => void
  modules: { id: string; shortName: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={filters.moduleId}
        onValueChange={(v) => onChange({ ...filters, moduleId: v })}
      >
        <SelectTrigger className="h-9 w-[150px] text-xs">
          <SelectValue placeholder="Module" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Modules</SelectItem>
          {modules.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.shortName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.difficulty}
        onValueChange={(v) => onChange({ ...filters, difficulty: v })}
      >
        <SelectTrigger className="h-9 w-[120px] text-xs">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Difficulty</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(v) => onChange({ ...filters, status: v })}
      >
        <SelectTrigger className="h-9 w-[130px] text-xs">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="not_started">Not Started</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="skipped">Skipped</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
