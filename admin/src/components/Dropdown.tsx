import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type DropdownItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  className ?: string ;
};

export default function Dropdown({ label, items, className = "bg-secondary-bg" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full border border-border hover:cursor-pointer inline-flex items-center gap-2 rounded-lg text-secondary-text px-4 py-2 text-sm font-medium focus:outline-none hover:bg-hover text-center ${className}`}
      >
        {label}
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-secondary-bg shadow-lg ring-1 ring-black/5 transition-all">
          <ul className="py-1">
            {items.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-secondary-text cursor-pointer hover:bg-hover"
                >
                  {item.icon && <span className="text-secondary-text">{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
