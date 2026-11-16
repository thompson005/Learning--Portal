import { Skeleton } from "@/components/ui/skeleton"
import { LogoMark } from "@/components/shared/Logo"

/** Shown while the signed-in user's progress is loading — a rough silhouette of
 * the shell so the first paint isn't a blank spinner. */
export function PortalSkeleton() {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      {/* Sidebar silhouette */}
      <div className="hidden w-64 flex-col gap-4 border-r border-border bg-background p-4 md:flex">
        <div className="flex items-center gap-2 pb-2">
          <LogoMark className="h-7 w-auto" />
          <Skeleton className="h-4 w-24" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full" />
        ))}
        <div className="mt-auto space-y-2">
          <Skeleton className="h-16 w-full" />
        </div>
      </div>

      {/* Main silhouette */}
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-hidden bg-dot-grid p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl space-y-5">
            <Skeleton className="h-40 w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              <Skeleton className="h-52 rounded-xl lg:col-span-3" />
              <Skeleton className="h-52 rounded-xl lg:col-span-2" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
