import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DropdownProps } from "@/types";

function Dropdown({ icon, label, isOpen, toggle, children, isCollapsed, isActive }: DropdownProps) {
  return (
    <div className="mb-1">
      <div
        onClick={toggle}
        className={`
          group flex items-center transition-all duration-200 select-none rounded-xl cursor-pointer
          ${isCollapsed ? "justify-center w-10 h-10 mx-auto px-0" : "justify-between px-3 py-2.5 w-full"}
          ${isActive ? "text-purple-700 font-bold bg-purple-50" : "text-gray-600 font-semibold hover:bg-purple-50 hover:text-purple-700"}
        `}
      >
        <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "gap-3"} overflow-hidden`}>
          <span className={`flex-shrink-0 ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-500"} transition-colors`}>{icon}</span>
          {!isCollapsed && <span className="text-sm truncate">{label}</span>}
        </div>
        {!isCollapsed && (
          <span className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-purple-600" : "group-hover:text-purple-500"}`}>
            <ChevronDown className="w-4 h-4" />
          </span>
        )}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative mt-1 mb-2 ml-2">
              <div className="absolute left-[13px] top-0 bottom-0 w-px bg-purple-100"></div>
              <div className="pl-2">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;