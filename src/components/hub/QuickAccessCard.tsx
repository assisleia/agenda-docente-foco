import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAccessCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

const QuickAccessCard = ({ title, icon: Icon, onClick, className }: QuickAccessCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-6 bg-card border rounded-lg",
        "hover:border-primary hover:shadow-md transition-all duration-200",
        "min-h-[140px] w-full",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-3">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <span className="text-sm font-medium text-center text-foreground">{title}</span>
    </button>
  );
};

export default QuickAccessCard;
