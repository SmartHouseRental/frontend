import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function StatCard({
    title,
    value,
    icon: Icon,
    iconBg = 'bg-primary/10',
    iconColor = 'text-primary',
    change,
    changeDirection = 'up',
    borderColor,
    sub,
    className = '',
    onClick,
}) {
    return (
        <Card
            className={`border-0 ${borderColor ? `border-l-4 ${borderColor}` : ''} group hover:shadow-lg transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
        >
            <CardHeader className="flex justify-between pb-2">
                <span className={`rounded-lg p-2 ${iconBg} ${iconColor} transition-transform group-hover:scale-110`}>
                    {Icon && <Icon size={20} />}
                </span>
                {change && (
                    <span
                        className={`flex items-center gap-1 text-xs font-bold ${changeDirection === 'alert'
                                ? 'text-rose-500 animate-pulse'
                                : changeDirection === 'down'
                                    ? 'text-rose-500'
                                    : 'text-emerald-500'
                            }`}
                    >
                        {changeDirection === 'up' && <ArrowUpRight size={14} />}
                        {changeDirection === 'down' && <ArrowDownRight size={14} />}
                        {change}
                    </span>
                )}
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">{title}</p>
                <h3 className="mt-1 text-2xl font-black">{value}</h3>
                {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
            </CardContent>
        </Card>
    );
}

export default StatCard;
