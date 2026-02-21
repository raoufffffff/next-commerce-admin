import {
  Home, Store, Box, Tag, Layers, Truck, Megaphone,
  Eye, FishingHook, ChevronDown, Menu, X
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UpgradeBanner from './UpgradBanner';
import type { SidebarProps } from '@/types';
import { useStore } from '@/features/store/hooks/UseStore';

/* ─────────────────────────────────────────────
   SectionLabel
───────────────────────────────────────────── */
function SectionLabel({ label, isCollapsed }: { label: string; isCollapsed: boolean }) {
  if (isCollapsed) return <div className="h-3" />;
  return (
    <div className="px-3 pt-5 pb-1.5">
      <span className="text-[9px] font-black text-purple-400/60 uppercase tracking-[0.18em] select-none">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NavItem
───────────────────────────────────────────── */
interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  to: string;
  isSubItem?: boolean;
  isHot?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, to, isSubItem, isHot, isCollapsed, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex items-center transition-all duration-200 group my-0.5 rounded-xl
        ${isCollapsed
          ? "justify-center w-10 h-10 mx-auto"
          : `gap-3 px-3 py-2.5 w-full ${isSubItem ? "pl-5" : ""}`
        }
        ${isActive
          ? "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 shadow-sm ring-1 ring-purple-200/60"
          : "text-gray-500 hover:bg-purple-50/70 hover:text-purple-700"
        }
        `
      }
    >
      {({ isActive }) => (
        <>
          {isActive && !isCollapsed && (
            <motion.div
              layoutId="nav-active-bar"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-full"
            />
          )}

          {isActive && isCollapsed && (
            <span className="absolute right-1 top-1 w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 shadow-sm" />
          )}

          {icon && (
            <span className={`flex-shrink-0 transition-colors ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-500"}`}>
              {icon}
            </span>
          )}

          {!isCollapsed && (
            <span className="text-sm flex-1 truncate flex items-center justify-between font-medium">
              {label}
              {isHot && (
                <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 text-[9px] font-bold rounded-full uppercase tracking-wide">
                  New
                </span>
              )}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

/* ─────────────────────────────────────────────
   Dropdown
───────────────────────────────────────────── */
interface DropdownProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
  isCollapsed: boolean;
  isActive?: boolean;
}

function Dropdown({ icon, label, isOpen, toggle, children, isCollapsed, isActive }: DropdownProps) {
  return (
    <div className="mb-0.5">
      <div
        onClick={toggle}
        className={`
          group flex items-center transition-all duration-200 select-none rounded-xl cursor-pointer
          ${isCollapsed ? "justify-center w-10 h-10 mx-auto" : "justify-between px-3 py-2.5 w-full"}
          ${isActive
            ? "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-700 ring-1 ring-purple-200/60"
            : "text-gray-500 hover:bg-purple-50/70 hover:text-purple-700"
          }
        `}
      >
        <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "gap-3"} overflow-hidden`}>
          <span className={`flex-shrink-0 transition-colors ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-500"}`}>
            {icon}
          </span>
          {!isCollapsed && <span className="text-sm font-medium truncate">{label}</span>}
        </div>
        {!isCollapsed && (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`flex-shrink-0 ${isActive ? "text-purple-500" : "text-gray-300 group-hover:text-purple-400"}`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative mt-0.5 mb-1 ml-3">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-purple-100 rounded-full" />
              <div className="pl-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Sidebar
───────────────────────────────────────────── */
export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  name,
  isPaid,
  ordersCount,
  storeid
}: SidebarProps) {
  const { t, i18n } = useTranslation("account");
  const currentLang = i18n.language;
  const isRtl = currentLang === "ar";
  const location = useLocation();
  const { data } = useStore(storeid);

  const [expandedMenus, setExpandedMenus] = useState({
    store: false,
    orders: false,
    products: false,
    categories: false,
    delivery: false,
    marketing: false,
  });

  useEffect(() => {
    const path = location.pathname;
    setExpandedMenus((s) => ({
      ...s,
      orders: path.includes('/orders'),
      products: path.includes('/products') || path.includes('/additems'),
    }));
  }, [location.pathname]);

  const handleToggleMenu = (key: keyof typeof expandedMenus) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.aside
      initial={{ x: isRtl ? 300 : -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className={`
        fixed top-0 z-[500] h-full flex flex-col
        ${isRtl ? "right-0 border-l border-purple-100/60" : "left-0 border-r border-purple-100/60"}
        bg-white/80 backdrop-blur-xl
        shadow-[4px_0_30px_rgba(139,92,246,0.08)]
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-0 md:w-[72px]" : "w-[82%] md:w-[268px]"}
      `}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-purple-400/0 via-purple-400/40 to-indigo-400/0" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 35% at 50% 0%, rgba(139,92,246,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Header — exact same height as the main Header (h-16) ── */}
      <div
        className={`
          flex items-center shrink-0 h-16 border-b border-purple-100/50
          ${isCollapsed ? "justify-center px-0" : "justify-between px-5"}
        `}
      >
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 }}
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-200/60 flex-shrink-0"
            >
              <span className="text-white font-bold text-sm">
                {data?.storeName?.charAt(0)?.toUpperCase() || "S"}
              </span>
            </motion.div>
            <span className="font-black text-base bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent truncate">
              {data?.storeName}
            </span>
          </motion.div>
        )}

        {/* Toggle — identical style to Header's menu button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-200/50 hover:shadow-xl hover:shadow-purple-300/50 transition-all duration-300"
        >
          {isCollapsed
            ? <Menu className="w-5 h-5 text-white" />
            : <X className="w-4 h-4 text-white" />
          }
        </motion.button>
      </div>

      {/* ── Visit Website Button ── */}
      <div className={`shrink-0 mt-4 mb-2 transition-all ${isCollapsed ? "px-2 flex justify-center" : "px-4"}`}>
        <a
          href={`https://${data?.domain}.next-commerce.shop`}
          target="_blank"
          rel="noreferrer"
          className={`
            group flex items-center justify-center rounded-xl transition-all duration-300 font-semibold text-sm
            ${isCollapsed
              ? "w-10 h-10 bg-purple-50 border border-purple-100 text-purple-500 hover:bg-purple-100 hover:text-purple-700"
              : "gap-2.5 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-200/50 hover:shadow-xl hover:shadow-purple-300/50 hover:-translate-y-0.5"
            }
          `}
        >
          <Eye className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>{t("yourWebsite")}</span>}
        </a>
      </div>

      {/* Divider */}
      {!isCollapsed && (
        <div className="mx-4 mb-1 h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
      )}

      {/* ── Navigation ── */}
      <nav
        className={`flex-1 overflow-y-auto scrollbar-hide pb-4 ${isCollapsed ? "px-2" : "px-3"}`}
        style={{ scrollbarWidth: "none" }}
      >
        <SectionLabel label={t("Dashboard")} isCollapsed={isCollapsed} />

        <NavItem
          icon={<Home className="w-4 h-4" />}
          label={t("Home")}
          to={`/store/${storeid}`}
          isCollapsed={isCollapsed}
          onClick={toggleSidebar}
        />

        <SectionLabel label={t("Management")} isCollapsed={isCollapsed} />

        <Dropdown
          label={t("Store")} icon={<Store className="w-4 h-4" />}
          isOpen={expandedMenus.store} toggle={() => handleToggleMenu('store')}
          isCollapsed={isCollapsed} isActive={location.pathname.includes('/update')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("Logo")} to={`/store/${storeid}/update/logo`} />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Theme")} to={`/store/${storeid}/update/theme`} />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Contactinformation")} to={`/store/${storeid}/update/Contact-information`} />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Faqspage")} to={`/store/${storeid}/update/faqs`} />
          <NavItem onClick={toggleSidebar} isSubItem label={t("Storesettings")} to={`/store/${storeid}/update/setting`} />
        </Dropdown>

        <Dropdown
          label={t("Orders")} icon={<Box className="w-4 h-4" />}
          isOpen={expandedMenus.orders} toggle={() => handleToggleMenu('orders')}
          isCollapsed={isCollapsed} isActive={location.pathname.includes('/orders')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("AllOrders")} to={`/store/${storeid}/orders`} />
        </Dropdown>

        <Dropdown
          label={t("Products")} icon={<Tag className="w-4 h-4" />}
          isOpen={expandedMenus.products} toggle={() => handleToggleMenu('products')}
          isCollapsed={isCollapsed} isActive={location.pathname.includes('/products')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("Products")} to={`/store/${storeid}/products`} />
          <NavItem onClick={toggleSidebar} isSubItem label={t("AddProducts")} to={`/store/${storeid}/Add-Product`} />
        </Dropdown>

        <Dropdown
          label={t("Categories")} icon={<Layers className="w-4 h-4" />}
          isOpen={expandedMenus.categories} toggle={() => handleToggleMenu('categories')}
          isCollapsed={isCollapsed} isActive={location.pathname.includes('/Categories')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("Categories")} to={`/store/${storeid}/Categories`} />
          <NavItem onClick={toggleSidebar} isSubItem label={t("AddCategories")} to={`/store/${storeid}/add-categories`} />
        </Dropdown>

        <Dropdown
          label={t("Delivery")} icon={<Truck className="w-4 h-4" />}
          isOpen={expandedMenus.delivery} toggle={() => handleToggleMenu('delivery')}
          isCollapsed={isCollapsed}
          isActive={location.pathname.includes('/delivery') || location.pathname.includes('/Liv')}
        >
          <NavItem onClick={toggleSidebar} isSubItem label={t("DeliveryCompanies")} to={`/store/${storeid}/delivery-companies`} />
          <NavItem onClick={toggleSidebar} isSubItem label={t("DeliveryPrices")} to={`/store/${storeid}/delivery-prices`} />
        </Dropdown>

        <SectionLabel label={t("Growth")} isCollapsed={isCollapsed} />

        <Dropdown
          label={t("marketingTools")} icon={<Megaphone className="w-4 h-4" />}
          isOpen={expandedMenus.marketing} toggle={() => handleToggleMenu('marketing')}
          isCollapsed={isCollapsed} isActive={location.pathname.includes('Pixel')}
        >
          <NavItem
            onClick={toggleSidebar} isSubItem
            icon={<FishingHook className="w-3.5 h-3.5" />}
            label={t("Pixels")} to={`/store/${storeid}/pixals`}
          />
        </Dropdown>
      </nav>

      {/* ── Upgrade Banner ── */}
      {!isCollapsed && (
        <div className="px-3 pb-3 shrink-0">
          <UpgradeBanner isPaid={isPaid} orders={ordersCount} toggleSidebar={toggleSidebar} />
        </div>
      )}

      {/* ── User Footer ── */}
      {!isCollapsed ? (
        <Link
          to="/"
          className="shrink-0 mx-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-center gap-3 hover:from-purple-100 hover:to-indigo-100 transition-all duration-200 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-200/60 flex-shrink-0">
            {name ? name.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-gray-800 truncate">{name}</p>
            <p className="text-xs text-gray-400 truncate">{t("StoreOwner")}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-purple-400 -rotate-90 transition-colors flex-shrink-0" />
        </Link>
      ) : (
        <div className="pb-4 flex justify-center shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-200/60">
            {name ? name.charAt(0).toUpperCase() : "A"}
          </div>
        </div>
      )}
    </motion.aside>
  );
}