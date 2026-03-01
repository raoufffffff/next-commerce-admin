import { Zap, Crown, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion";

const UpgradBanner = ({ toggleHeader, isPaid, orders, max }: any) => {
    const { t } = useTranslation("account");
    const maxOrders = max;
    const percentageUsed = (orders / maxOrders) * 100;
    const hasReachedLimit = !isPaid && orders >= maxOrders;

    return (
        <div className="px-4 mb-4 mt-2 shrink-0">
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-4 text-white shadow-xl border border-gray-800/50">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/20 blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-teal-500/20 blur-2xl"></div>

                <div className="relative z-10">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`p-1 rounded-lg ${isPaid ? 'bg-gradient-to-br from-teal-400 to-purple-600' : 'bg-white/10'}`}>
                                {isPaid
                                    ? <Crown className="w-3.5 h-3.5 text-white" fill="currentColor" />
                                    : <Zap className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                                }
                            </div>
                            <span className="text-xs font-bold tracking-wide text-gray-200">
                                {isPaid ? t("ProPlan") : t("FreePlan")}
                            </span>
                        </div>

                        {isPaid ? (
                            <NavLink
                                to="/subscriptions"
                                onClick={toggleHeader}
                                className="flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md"
                            >
                                {t("Manage")}
                                <ChevronRight className="w-3 h-3" />
                            </NavLink>
                        ) : (
                            <span className={`text-[10px] font-medium ${hasReachedLimit ? 'text-red-400' : 'text-gray-400'}`}>
                                {orders}/{maxOrders}
                            </span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full rounded-full bg-gray-700 mb-1 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: percentageUsed > 100 ? '100%' : `${percentageUsed}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                                hasReachedLimit
                                    ? 'bg-red-500'
                                    : isPaid
                                        ? 'bg-gradient-to-r from-teal-400 to-purple-500'
                                        : 'bg-gradient-to-r from-teal-400 to-purple-500'
                            }`}
                        />
                    </div>

                    {/* Orders count for paid */}
                    {isPaid && (
                        <div className="flex justify-end mb-3">
                            <span className="text-[10px] font-medium text-gray-400">{orders}/{maxOrders}</span>
                        </div>
                    )}

                    {/* Upgrade button: only when free AND limit reached */}
                    {hasReachedLimit && (
                        <div className="mt-3">
                            <NavLink
                                to="/upgrade"
                                onClick={toggleHeader}
                                className="block w-full rounded-lg bg-white py-2 text-center text-xs font-bold text-gray-900 transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/10"
                            >
                                {t("UpgradeNow")} 🚀
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UpgradBanner