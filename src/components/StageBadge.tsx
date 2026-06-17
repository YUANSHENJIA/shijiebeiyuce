import { cn } from '@/lib/utils';

interface StageBadgeProps {
  stage: string;
}

const stageConfig: Record<string, { label: string; className: string }> = {
  group: { label: '小组赛', className: 'bg-wc-accent/20 text-wc-accent' },
  r32: { label: '32强', className: 'bg-blue-500/20 text-blue-400' },
  r16: { label: '16强', className: 'bg-purple-500/20 text-purple-400' },
  qf: { label: '8强', className: 'bg-orange-500/20 text-orange-400' },
  sf: { label: '半决赛', className: 'bg-wc-red/20 text-wc-red' },
  '3rd': { label: '季军赛', className: 'bg-amber-700/20 text-amber-500' },
  final: { label: '决赛', className: 'bg-wc-gold/20 text-wc-gold' },
};

export default function StageBadge({ stage }: StageBadgeProps) {
  const config = stageConfig[stage] ?? { label: stage, className: 'bg-gray-500/20 text-gray-400' };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-heading font-semibold tracking-wide',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
