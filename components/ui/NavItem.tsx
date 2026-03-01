import type { NavItemProps } from "@/types";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function NavItem({ icon, label, to, isSubItem, isHot, isCollapsed, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex items-center transition-all duration-200 group my-0.5 rounded-xl
        ${isCollapsed
          ? "justify-center w-10 h-10 mx-auto px-0 py-0"
          : `gap-3 px-3 py-2.5 w-full ${isSubItem ? "ml-4" : ""}`
        }
        ${isActive
          ? "bg-purple-50 text-purple-700 font-bold shadow-sm ring-1 ring-purple-100"
          : "text-gray-600 font-semibold hover:bg-purple-50 hover:text-purple-700"
        }
        `
      }
    >
      {({ isActive }) => (
        <>
          {isActive && !isCollapsed && (
            <motion.div layoutId="active-pill" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-500 to-orange-500 rounded-r-full" />
          )}
          <span className={`flex-shrink-0 transition-colors ${isActive ? "text-purple-600" : "text-gray-500 group-hover:text-purple-500"}`}>
            {icon}
          </span>
          {!isCollapsed && (
            <span className="text-sm flex-1 truncate flex items-center justify-between">
              {label}
              {isHot && <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-extrabold rounded-full uppercase tracking-wide">New</span>}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default NavItem;