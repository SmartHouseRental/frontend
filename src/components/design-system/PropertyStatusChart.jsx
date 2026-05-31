import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const STATUS_COLORS = {
  Available: '#22C55E',
  Rented: '#171717',
  Maintenance: '#f59e0b',
  Unavailable: '#94a3b8',
};

export function PropertyStatusChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          { name: 'Available', value: 0, color: STATUS_COLORS.Available },
          { name: 'Rented', value: 0, color: STATUS_COLORS.Rented },
        ];

  const total = chartData.reduce((sum, d) => sum + (d.value || 0), 0);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative mx-auto size-44 sm:mx-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color || STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-foreground text-2xl font-bold tabular-nums">{total}</span>
          <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wide">
            Total
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-2.5">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color || STATUS_COLORS[item.name] }}
              />
              <span className="text-muted-foreground text-sm">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-semibold tabular-nums">
                {item.value}
              </span>
              {total > 0 && (
                <span className="text-muted-foreground text-xs tabular-nums">
                  {Math.round((item.value / total) * 100)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyStatusChart;
