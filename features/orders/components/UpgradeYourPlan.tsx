import { useTranslation } from 'react-i18next';
import { Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpgradeYourPlan = ({ ordersUsed = 0, maxOrder, isPaid }: { ordersUsed: number, maxOrder: number, isPaid: boolean }) => {
    const { t } = useTranslation("order");

    const ordersLeft = maxOrder - ordersUsed;
    const percentageUsed = (ordersUsed / maxOrder) * 100;
    const hasReachedLimit = !isPaid && ordersLeft <= 0;

    return (
        <div className="w-full">
            <div className={`relative overflow-hidden rounded-2xl border bg-white p-6 shadow-lg transition-all
                ${hasReachedLimit ? 'border-red-200 shadow-red-500/5' : 'border-purple-100 shadow-purple-500/5'}`}>
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-50 blur-3xl opacity-50 pointer-events-none"></div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex gap-5 items-start">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md
                            ${hasReachedLimit ? 'bg-red-500 shadow-red-200' : 'bg-purple-600 shadow-purple-200'}`}>
                            <Crown size={24} strokeWidth={2} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                {isPaid ? t("ProPlan") : hasReachedLimit ? t("LimitReached") : t("UnlockFullAccess")}
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                    ${hasReachedLimit ? 'bg-red-100 text-red-700' : isPaid ? 'bg-amber-100 text-amber-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {isPaid ? t("Pro") : hasReachedLimit ? t("Free") : t("Pro")}
                                </span>
                            </h3>

                            <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
                                {hasReachedLimit ? t("YouHaveReachedYourOrderLimit") : t("UpgradeYourPlanToAccessOrderManagement")}
                            </p>

                            {/* Always show progress bar with max */}
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ease-out
                                            ${hasReachedLimit ? 'bg-red-500' : 'bg-purple-500'}`}
                                        style={{ width: `${percentageUsed > 100 ? 100 : percentageUsed}%` }}
                                    />
                                </div>
                                <span className={`text-xs font-medium ${hasReachedLimit ? 'text-red-600' : 'text-purple-700'}`}>
                                    {ordersUsed}/{maxOrder} {t("OrdersUsed")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {hasReachedLimit && (
                        <Link
                            to="/upgrade"
                            className="group whitespace-nowrap rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-95 mx-auto md:m-0 flex items-center gap-2"
                        >
                            {t("UpgradeNow")}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpgradeYourPlan;