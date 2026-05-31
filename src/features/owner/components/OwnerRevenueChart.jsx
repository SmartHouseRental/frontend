import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CHART_STROKE = '#0A0A0A';
const CHART_GRID = '#E5E5E5';
const CHART_TICK = '#737373';

function formatTooltipValue(value, currency) {
  const num = Number(value) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M ${currency}`;
  if (num >= 1_000) return `${Math.round(num / 1_000)}K ${currency}`;
  return `${num.toLocaleString()} ${currency}`;
}

export function OwnerRevenueChart({ data = [], currency = 'ETB' }) {
  const chartData = data.length > 0 ? data : [{ label: '—', revenue: 0 }];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="ownerRevenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_STROKE} stopOpacity={0.22} />
            <stop offset="100%" stopColor={CHART_STROKE} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: CHART_TICK }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: CHART_TICK }}
          axisLine={false}
          tickLine={false}
          width={48}
          tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))}
        />
        <Tooltip
          formatter={(value) => [formatTooltipValue(value, currency), 'Revenue']}
          labelStyle={{ fontWeight: 600 }}
          contentStyle={{
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07)',
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={CHART_STROKE}
          strokeWidth={2.5}
          fill="url(#ownerRevenueFill)"
          dot={{ r: 3, fill: CHART_STROKE, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: CHART_STROKE, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
