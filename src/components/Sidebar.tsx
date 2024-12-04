import { Home, Dog, Dumbbell, Scissors, HeartPulse, MoreHorizontal } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { name: 'Hogar', icon: Home },
  { name: 'Mascotas', icon: Dog },
  { name: 'Deporte', icon: Dumbbell },
  { name: 'Estética', icon: Scissors },
  { name: 'Asistencia', icon: HeartPulse },
  { name: 'Mas', icon: MoreHorizontal },
];

export function Sidebar({ selectedCategory, onCategorySelect }: SidebarProps) {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 ml-8 z-40">
      <div className="flex flex-col gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors w-40
                ${isSelected 
                  ? 'bg-white text-[#2B5BA9]' 
                  : 'bg-[#2B5BA9] text-white hover:bg-blue-700'}`}
            >
              <Icon className="w-5 h-5" />
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}