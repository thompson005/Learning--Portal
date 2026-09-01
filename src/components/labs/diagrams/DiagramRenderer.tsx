"use client"

import { useEffect, useState } from "react"

import type {
  LabDiagram,
  NetworkTopologyDiagram,
  RequestResponseDiagram,
  TerminalDiagram,
  LayerStackDiagram,
  FlowChainDiagram,
  GraphTreeDiagram,
  FileTreeDiagram,
  ContainerArchDiagram,
  BrowserMockupDiagram,
  PacketCaptureDiagram,
  ComparisonDiagram,
} from "@/types"
import { staggerDelay } from "@/components/labs/diagrams/stagger"

const ORANGE = "#E8792A"
const PLUM_SECONDARY = "#8E44AD"
const RED = "#C0392B"
const GREEN = "#27AE60"
const PURPLE = "#8E44AD"
const BLUE = "#1B4F72"
const INK = "#0E0D0B"

const NODE_COLOR: Record<string, string> = {
  attacker: RED,
  victim: BLUE,
  server: ORANGE,
  router: "#7F8C8D",
  firewall: PLUM_SECONDARY,
  device: PURPLE,
}

/** Reveals `true` after `delayMs` on first mount when `active`; renders already-revealed at rest otherwise. */
function useRevealed(active: boolean, delayMs: number) {
  const [revealed, setRevealed] = useState(!active)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setRevealed(true), delayMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return revealed
}

function popIn(active: boolean, delayMs: number) {
  return active
    ? {
        className:
          "animate-in fade-in zoom-in-75 fill-mode-both duration-500 [animation-timing-function:cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:animate-none",
        style: { animationDelay: `${delayMs}ms` },
      }
    : { className: "", style: undefined }
}

function fadeUp(active: boolean, delayMs: number) {
  return active
    ? {
        className:
          "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none",
        style: { animationDelay: `${delayMs}ms` },
      }
    : { className: "", style: undefined }
}

function DrawLine({
  x1,
  y1,
  x2,
  y2,
  stroke,
  strokeWidth,
  dashed,
  markerEnd,
  active,
  delay,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  stroke: string
  strokeWidth: number
  dashed?: boolean
  markerEnd?: string
  active: boolean
  delay: number
}) {
  const length = Math.hypot(x2 - x1, y2 - y1)
  const revealed = useRevealed(active, delay)
  if (dashed) {
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray="6 5"
        markerEnd={markerEnd}
        className={cnRaw(
          active &&
            "animate-in fade-in fill-mode-both duration-300 motion-reduce:animate-none",
        )}
        style={active ? { animationDelay: `${delay}ms` } : undefined}
      />
    )
  }
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      markerEnd={markerEnd}
      strokeDasharray={length}
      strokeDashoffset={revealed ? 0 : length}
      className="motion-reduce:transition-none"
      style={{
        transition: "stroke-dashoffset 620ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  )
}

function cnRaw(v: string | false | undefined) {
  return v || ""
}

function Frame({
  children,
  height = 220,
  width = 720,
}: {
  children: React.ReactNode
  height?: number
  width?: number
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-muted/20 p-3">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block h-auto w-full"
        style={{ minWidth: 480, maxWidth: width }}
      >
        {children}
      </svg>
    </div>
  )
}

function NetworkTopologyView({
  diagram,
  animate = true,
}: {
  diagram: NetworkTopologyDiagram
  animate?: boolean
}) {
  const { nodes, edges } = diagram
  const w = Math.max(720, nodes.length * 130)
  const gap = w / (nodes.length + 1)
  const pos = new Map(nodes.map((n, i) => [n.id, { x: gap * (i + 1), y: 110 }]))
  const nodesLandBy = staggerDelay(nodes.length - 1, 60) + 120
  return (
    <Frame width={w}>
      {edges.map((e, i) => {
        const a = pos.get(e.from)
        const b = pos.get(e.to)
        if (!a || !b) return null
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2 - 18
        const { className, style } = fadeUp(
          !!animate && !!e.dashed,
          nodesLandBy + staggerDelay(i, 90),
        )
        return (
          <g key={i} className={className} style={style}>
            <DrawLine
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#94a3b8"
              strokeWidth={2}
              dashed={e.dashed}
              active={!!animate}
              delay={nodesLandBy + staggerDelay(i, 90)}
            />
            {e.label && (
              <text
                x={mx}
                y={my}
                textAnchor="middle"
                fontSize={11}
                fill="#64748b"
                fontFamily="monospace"
              >
                {e.label}
              </text>
            )}
          </g>
        )
      })}
      {nodes.map((n, i) => {
        const p = pos.get(n.id)!
        const color = NODE_COLOR[n.kind] ?? ORANGE
        const { className, style } = popIn(!!animate, staggerDelay(i, 60))
        return (
          <g key={n.id} className={className} style={style}>
            <circle cx={p.x} cy={p.y} r={26} fill={color} opacity={0.15} />
            <circle
              cx={p.x}
              cy={p.y}
              r={26}
              fill="none"
              stroke={color}
              strokeWidth={2}
            />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill={color}
            >
              {n.label.slice(0, 2).toUpperCase()}
            </text>
            <text
              x={p.x}
              y={p.y + 46}
              textAnchor="middle"
              fontSize={12}
              fill="currentColor"
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </Frame>
  )
}

function RequestResponseView({
  diagram,
  animate = true,
}: {
  diagram: RequestResponseDiagram
  animate?: boolean
}) {
  const { leftLabel, rightLabel, exchanges } = diagram
  const rowH = 46
  const height = 60 + exchanges.length * rowH
  return (
    <Frame height={height}>
      <text
        x={90}
        y={28}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill={RED}
      >
        {leftLabel}
      </text>
      <text
        x={630}
        y={28}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill={ORANGE}
      >
        {rightLabel}
      </text>
      <line
        x1={90}
        y1={40}
        x2={90}
        y2={height - 10}
        stroke="#cbd5e1"
        strokeWidth={1.5}
      />
      <line
        x1={630}
        y1={40}
        x2={630}
        y2={height - 10}
        stroke="#cbd5e1"
        strokeWidth={1.5}
      />
      {exchanges.map((ex, i) => {
        const y = 55 + i * rowH
        const toRight = ex.direction === "right"
        const x1 = toRight ? 90 : 630
        const x2 = toRight ? 630 : 90
        const { className, style } = fadeUp(!!animate, staggerDelay(i, 90))
        return (
          <g key={i} className={className} style={style}>
            <line
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke={toRight ? PLUM_SECONDARY : ORANGE}
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
            <text
              x={360}
              y={y - 8}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill="currentColor"
            >
              {ex.label}
            </text>
            {ex.payload && (
              <text
                x={360}
                y={y + 14}
                textAnchor="middle"
                fontSize={11}
                fontFamily="monospace"
                fill="#64748b"
              >
                {ex.payload}
              </text>
            )}
          </g>
        )
      })}
      <defs>
        <marker
          id="arrow"
          markerWidth={8}
          markerHeight={8}
          refX={6}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#64748b" />
        </marker>
      </defs>
    </Frame>
  )
}

function TerminalView({
  diagram,
  animate = true,
}: {
  diagram: TerminalDiagram
  animate?: boolean
}) {
  return (
    <div
      className="w-full overflow-x-auto rounded-lg border border-border"
      style={{ background: INK }}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: RED }}
        />
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: PLUM_SECONDARY }}
        />
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN }}
        />
      </div>
      <div className="space-y-1 p-3 font-mono text-[12.5px] leading-relaxed">
        {diagram.lines.map((l, i) => {
          const { className, style } = fadeUp(!!animate, staggerDelay(i, 90))
          return (
            <div key={i} className={className} style={style}>
              {l.command && (
                <div style={{ color: ORANGE }}>
                  <span style={{ color: GREEN }}>{diagram.prompt}</span>{" "}
                  {l.command}
                </div>
              )}
              {l.output && (
                <div style={{ color: "#cbd5e1", whiteSpace: "pre-wrap" }}>
                  {l.output}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LayerStackView({
  diagram,
  animate = true,
}: {
  diagram: LayerStackDiagram
  animate?: boolean
}) {
  const layers = diagram.layers
  return (
    <div className="w-full rounded-lg border border-border bg-muted/20 p-4">
      {layers.map((l, i) => {
        const { className, style } = fadeUp(!!animate, staggerDelay(i, 70))
        const isLast = i === layers.length - 1
        return (
          <div
            key={i}
            className={cn2("flex items-stretch gap-3", className)}
            style={style}
          >
            <div className="flex flex-col items-center">
              <span
                className={cn2(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10.5px] font-bold transition-colors duration-300",
                  l.highlighted
                    ? "border-brand-orange bg-brand-orange text-white"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
              {!isLast && (
                <span className="my-0.5 w-px flex-1 bg-border" aria-hidden />
              )}
            </div>
            <div
              className={cn2(
                "mb-2.5 flex flex-1 items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 transition-all duration-300",
                l.highlighted
                  ? "border-brand-orange bg-brand-orange/10 shadow-[0_4px_16px_-4px_rgba(232,121,42,0.35)]"
                  : "border-border bg-card",
              )}
              style={{ marginRight: `${i * 14}px` }}
            >
              <span
                className={cn2(
                  "text-sm font-semibold",
                  l.highlighted ? "text-brand-orange" : "text-foreground",
                )}
              >
                {l.label}
              </span>
              {l.detail && (
                <span className="text-right text-xs text-muted-foreground">
                  {l.detail}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function cn2(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ")
}

function FlowChainView({
  diagram,
  animate = true,
}: {
  diagram: FlowChainDiagram
  animate?: boolean
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-muted/20 p-4">
      <div className="flex min-w-max items-start gap-2">
        {diagram.steps.map((s, i) => {
          const nodeDelay = staggerDelay(i, 70)
          const { className: nodeClass, style: nodeStyle } = animate
            ? {
                className:
                  "animate-pop-check fill-mode-both motion-reduce:animate-none",
                style: { animationDelay: `${nodeDelay}ms` },
              }
            : { className: "", style: undefined }
          const connectorDelay = nodeDelay + 35
          const { className: connClass, style: connStyle } = fadeUp(
            !!animate,
            connectorDelay,
          )
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="flex w-32 flex-col items-center text-center">
                <div
                  className={cn2(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white",
                    nodeClass,
                  )}
                  style={{ background: PLUM_SECONDARY, ...nodeStyle }}
                >
                  {i + 1}
                </div>
                <p className="mt-2 text-xs font-semibold">{s.label}</p>
                {s.detail && (
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {s.detail}
                  </p>
                )}
              </div>
              {i < diagram.steps.length - 1 && (
                <div
                  className={cn2("mt-4 h-px w-6 bg-border", connClass)}
                  style={connStyle}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function GraphTreeView({
  diagram,
  animate = true,
}: {
  diagram: GraphTreeDiagram
  animate?: boolean
}) {
  const parentOf = new Map<string, string>()
  for (const e of diagram.edges) {
    if (!parentOf.has(e.to)) parentOf.set(e.to, e.from)
  }
  const level = new Map<string, number>()
  function levelOf(id: string, seen: Set<string>): number {
    if (level.has(id)) return level.get(id)!
    const parent = parentOf.get(id)
    const lvl =
      parent && !seen.has(parent)
        ? levelOf(parent, new Set(seen).add(id)) + 1
        : 0
    level.set(id, lvl)
    return lvl
  }
  diagram.nodes.forEach((n) => levelOf(n.id, new Set([n.id])))
  const maxLevel = Math.max(0, ...diagram.nodes.map((n) => level.get(n.id)!))
  const rows: (typeof diagram.nodes)[] = Array.from(
    { length: maxLevel + 1 },
    () => [],
  )
  diagram.nodes.forEach((n) => rows[level.get(n.id)!].push(n))
  const edgeLabel = new Map(diagram.edges.map((e) => [e.to, e.label]))

  let idx = 0
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-muted/20 p-4">
      <div className="flex min-w-max flex-col items-center gap-2">
        {rows.map((row, ri) => (
          <div key={ri} className="flex flex-col items-center gap-2">
            {ri > 0 && <div className="h-4 w-px bg-border" />}
            <div className="flex flex-wrap justify-center gap-3">
              {row.map((n) => {
                const i = idx++
                const { className, style } = popIn(
                  !!animate,
                  staggerDelay(i, 50),
                )
                const hl = !!n.highlighted
                const lbl = edgeLabel.get(n.id)
                return (
                  <div key={n.id} className="flex flex-col items-center gap-1">
                    <div
                      className={cn2(
                        "min-w-[100px] max-w-[220px] rounded-lg border-2 px-3 py-2 text-center text-[11px] font-semibold leading-snug",
                        ri === 0 && "text-sm font-bold",
                        className,
                      )}
                      style={{
                        borderColor: hl ? PURPLE : "#94a3b8",
                        background: hl ? `${PURPLE}15` : "transparent",
                        color: hl ? PURPLE : undefined,
                        ...style,
                      }}
                    >
                      {n.label}
                    </div>
                    {lbl && (
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {lbl}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FileTreeView({
  diagram,
  animate = true,
}: {
  diagram: FileTreeDiagram
  animate?: boolean
}) {
  return (
    <div className="w-full rounded-lg border border-border bg-muted/20 p-3 font-mono text-[12.5px]">
      <div className="font-semibold">{diagram.root}</div>
      {diagram.entries.map((e, i) => {
        const { className, style } = fadeUp(!!animate, staggerDelay(i, 55, 10))
        return (
          <div
            key={i}
            className={cn2("flex items-center gap-2", className)}
            style={{
              paddingLeft: `${e.depth * 16 + 8}px`,
              color: e.flagged ? RED : undefined,
              ...style,
            }}
          >
            <span>
              {"└─ "}
              {e.path}
            </span>
            {e.note && (
              <span className="text-[11px] text-muted-foreground">
                {e.note}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ContainerArchView({
  diagram,
  animate = true,
}: {
  diagram: ContainerArchDiagram
  animate?: boolean
}) {
  const containerRevealed = useRevealed(!!animate, 150)
  const containerReveal = animate
    ? {
        className: "transition-all duration-300 ease-out",
        style: containerRevealed
          ? { opacity: 1, transform: "scale(1)" }
          : { opacity: 0, transform: "scale(0.9)" },
      }
    : { className: "", style: undefined }
  return (
    <Frame height={180}>
      <DrawLine
        x1={30}
        y1={20}
        x2={690}
        y2={20}
        stroke="#94a3b8"
        strokeWidth={2}
        active={!!animate}
        delay={0}
      />
      <DrawLine
        x1={690}
        y1={20}
        x2={690}
        y2={160}
        stroke="#94a3b8"
        strokeWidth={2}
        active={!!animate}
        delay={90}
      />
      <DrawLine
        x1={690}
        y1={160}
        x2={30}
        y2={160}
        stroke="#94a3b8"
        strokeWidth={2}
        active={!!animate}
        delay={180}
      />
      <DrawLine
        x1={30}
        y1={160}
        x2={30}
        y2={20}
        stroke="#94a3b8"
        strokeWidth={2}
        active={!!animate}
        delay={270}
      />
      <text x={50} y={44} fontSize={12} fontWeight={700} fill="#64748b">
        {diagram.hostLabel}
      </text>
      <g
        style={{ transformOrigin: "360px 95px", ...containerReveal.style }}
        className={containerReveal.className}
      >
        <rect
          x={230}
          y={55}
          width={260}
          height={80}
          rx={8}
          fill={`${ORANGE}15`}
          stroke={ORANGE}
          strokeWidth={2}
        />
        <text
          x={360}
          y={80}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill={ORANGE}
        >
          {diagram.containerLabel}
        </text>
        <text
          x={360}
          y={100}
          textAnchor="middle"
          fontSize={11}
          fontFamily="monospace"
          fill="currentColor"
        >
          {diagram.image}
        </text>
        <text
          x={360}
          y={118}
          textAnchor="middle"
          fontSize={11}
          fontFamily="monospace"
          fill="#64748b"
        >
          :{diagram.containerPort}
        </text>
      </g>
      <DrawLine
        x1={490}
        y1={95}
        x2={598}
        y2={95}
        stroke={PLUM_SECONDARY}
        strokeWidth={2}
        markerEnd="url(#carrow)"
        active={!!animate}
        delay={300}
      />
      <text
        x={545}
        y={85}
        textAnchor="middle"
        fontSize={11}
        fontFamily="monospace"
        fill={PLUM_SECONDARY}
      >
        :{diagram.hostPort}
      </text>
      <defs>
        <marker
          id="carrow"
          markerWidth={8}
          markerHeight={8}
          refX={6}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={PLUM_SECONDARY} />
        </marker>
      </defs>
    </Frame>
  )
}

function BrowserMockupView({
  diagram,
  animate = true,
}: {
  diagram: BrowserMockupDiagram
  animate?: boolean
}) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 flex-1 truncate rounded-md bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground">
          {diagram.url}
        </span>
      </div>
      <div className="space-y-2 p-4">
        {diagram.annotations.map((a, i) => {
          const { className, style } = fadeUp(!!animate, staggerDelay(i, 90))
          return (
            <div
              key={i}
              className={cn2(
                "flex items-start gap-2 rounded-md border border-border bg-muted/20 px-3 py-2",
                className,
              )}
              style={style}
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ background: ORANGE }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold">{a.label}</p>
                <p className="text-[11px] text-muted-foreground">{a.note}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PacketCaptureView({
  diagram,
  animate = true,
}: {
  diagram: PacketCaptureDiagram
  animate?: boolean
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] font-mono text-[11.5px]">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-[10px] uppercase tracking-wide text-muted-foreground">
            <th className="px-3 py-2">Time</th>
            <th className="px-3 py-2">Source</th>
            <th className="px-3 py-2">Destination</th>
            <th className="px-3 py-2">Protocol</th>
            <th className="px-3 py-2">Info</th>
          </tr>
        </thead>
        <tbody>
          {diagram.rows.map((r, i) => {
            const { className, style } = fadeUp(
              !!animate,
              staggerDelay(i, 55, 10),
            )
            return (
              <tr
                key={i}
                className={cn2("border-b border-border/60", className)}
                style={{
                  ...(r.highlighted ? { background: `${RED}12` } : undefined),
                  ...style,
                }}
              >
                <td className="px-3 py-1.5 text-muted-foreground">{r.time}</td>
                <td className="px-3 py-1.5">{r.source}</td>
                <td className="px-3 py-1.5">{r.dest}</td>
                <td className="px-3 py-1.5" style={{ color: ORANGE }}>
                  {r.protocol}
                </td>
                <td
                  className="px-3 py-1.5"
                  style={
                    r.highlighted ? { color: RED, fontWeight: 700 } : undefined
                  }
                >
                  {r.info}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function ComparisonView({
  diagram,
  animate = true,
}: {
  diagram: ComparisonDiagram
  animate?: boolean
}) {
  return (
    <div
      className="grid w-full gap-3"
      style={{
        gridTemplateColumns: `repeat(${diagram.columns.length}, minmax(0, 1fr))`,
      }}
    >
      {diagram.columns.map((col, i) => {
        const { className, style } = fadeUp(!!animate, staggerDelay(i, 90))
        return (
          <div
            key={i}
            className={cn2(
              "flex flex-col gap-2 rounded-lg border p-3",
              col.highlighted
                ? "border-brand-orange bg-brand-orange/[0.06]"
                : "border-border bg-muted/20",
              className,
            )}
            style={style}
          >
            <p
              className={cn2(
                "font-mono text-xs font-semibold uppercase tracking-widest",
                col.highlighted ? "text-brand-orange" : "text-muted-foreground",
              )}
            >
              {col.label}
            </p>
            <ul className="space-y-1.5 text-sm">
              {col.points.map((point, j) => (
                <li key={j} className="flex gap-1.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export function LabDiagramView({
  diagram,
  animate = true,
}: {
  diagram: LabDiagram
  animate?: boolean
}) {
  switch (diagram.type) {
    case "network-topology":
      return <NetworkTopologyView diagram={diagram} animate={animate} />
    case "request-response":
      return <RequestResponseView diagram={diagram} animate={animate} />
    case "terminal":
      return <TerminalView diagram={diagram} animate={animate} />
    case "layer-stack":
      return <LayerStackView diagram={diagram} animate={animate} />
    case "flow-chain":
      return <FlowChainView diagram={diagram} animate={animate} />
    case "graph-tree":
      return <GraphTreeView diagram={diagram} animate={animate} />
    case "file-tree":
      return <FileTreeView diagram={diagram} animate={animate} />
    case "container-arch":
      return <ContainerArchView diagram={diagram} animate={animate} />
    case "browser-mockup":
      return <BrowserMockupView diagram={diagram} animate={animate} />
    case "packet-capture":
      return <PacketCaptureView diagram={diagram} animate={animate} />
    case "comparison":
      return <ComparisonView diagram={diagram} animate={animate} />
    default:
      return null
  }
}
