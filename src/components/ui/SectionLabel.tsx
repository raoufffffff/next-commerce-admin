import type { SectionLabelProps } from "@/types";

function SectionLabel({ label, isCollapsed }: SectionLabelProps) {
  if (isCollapsed) return <div className="h-4" />;
  return (
    <div className="px-4 mt-6 mb-2">
      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default SectionLabel