'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export interface BreakdownItem {
  factor: string
  amount: number
  multiplier: string
}

interface CostBreakdownChartProps {
  data: BreakdownItem[]
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: BreakdownItem; value: number }>
}) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-3 shadow-lg">
      <p className="font-sans text-sm font-semibold text-neutral-800">{item.factor}</p>
      <p className="font-sans text-sm text-primary-dark">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.amount)}
      </p>
      <p className="font-sans text-xs text-neutral-500">Multiplier: {item.multiplier}</p>
    </div>
  )
}

export default function CostBreakdownChart({ data }: CostBreakdownChartProps) {
  const filtered = data.filter((d) => d.amount > 0)

  return (
    <div className="mt-4">
      <p className="font-sans text-sm font-medium text-neutral-600 mb-3">Cost breakdown by factor</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={filtered}
          layout="vertical"
          margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
        >
          <XAxis
            type="number"
            tickFormatter={(v) =>
              new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
            }
            tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="factor"
            width={120}
            tick={{ fontFamily: 'var(--font-inter)', fontSize: 12, fill: '#374151' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#D9EFE3' }} />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={600}>
            {filtered.map((_, index) => (
              <Cell key={index} fill="#3FAE76" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
