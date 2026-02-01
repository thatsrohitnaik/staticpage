import { LucideIcon } from 'lucide-react';

interface QuickNavProps {
    icon: LucideIcon;
    targetId: string;
    label: string;
    colorClass: string; // Tailwind text color class
    bottomOffset: string; // e.g., 'bottom-32'
}

export function QuickNavButton({ icon: Icon, targetId, label, colorClass, bottomOffset }: QuickNavProps) {
    const scrollToSection = () => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button
            onClick={scrollToSection}
            className={`fixed ${bottomOffset} right-8 z-50 p-4 rounded-full transition-all bg-gray-100 border border-gray-200 
      shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]
      group active:scale-95 hover:scale-110 ${colorClass}`}
            aria-label={`Scroll to ${label}`}
        >
            <Icon className="w-6 h-6" />

            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white
      text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-gray-100
      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
        </button>
    );
}