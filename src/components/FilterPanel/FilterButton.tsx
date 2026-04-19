interface FilterButtonProps {
  label: string;
  icon: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterButton({ label, icon, color, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
        isActive
          ? 'border-transparent text-white shadow-md'
          : 'border-gray-200 bg-white/80 text-gray-500'
      }`}
      style={isActive ? { backgroundColor: color } : undefined}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
