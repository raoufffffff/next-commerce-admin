import { motion } from 'framer-motion';
import BoxCard from '@/components/ui/BoxCard';
import { statuses } from '@/features/orders/constants/ordersStatusIcons';
import type { orders } from '@/types';
import { useTranslation } from 'react-i18next';
import {  Package } from 'lucide-react';

const StatusSummary = ({ orders = [], id }: { orders: [] | orders[] | undefined, id: string | undefined }) => {
    const { t } = useTranslation("store");

    const getStatusData = (statusKey: string) => {
        const filtered = orders.filter(order => order.status === statusKey);
        const total = filtered.length;
        const value = filtered.reduce((sum, order) => sum + (order.price || 0), 0);
        return { total, value };
    };

    // Calculate total for percentage
    const grandTotal = orders.length;

    return (
        <BoxCard about={t("OrderSummary")}  link={`store/${id}/orders`}>
            {/* Summary Cards */}
          

            {/* Status Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-50 to-purple-50/30 border-b-2 border-purple-100">
                                <th className="px-6 py-4 text-left">
                                    <span className="text-sm font-bold text-gray-700">
                                        {t("Status")}
                                    </span>
                                </th>
                                <th className="px-6 py-4 text-center">
                                    <span className="text-sm font-bold text-gray-700">
                                        {t("Total")}
                                    </span>
                                </th>
                                <th className="px-6 py-4 text-center">
                                    <span className="text-sm font-bold text-gray-700">
                                        {t("Value")}
                                    </span>
                                </th>
                                <th className="px-6 py-4 text-right">
                                    <span className="text-sm font-bold text-gray-700">
                                        %
                                    </span>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {statuses.map((status, i) => {
                                const { total, value } = getStatusData(status.key);
                                const percentage = grandTotal > 0 ? ((total / grandTotal) * 100).toFixed(1) : 0;

                                return (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.02)' }}
                                        className="border-b border-gray-100 last:border-0 transition-colors duration-200"
                                    >
                                        {/* Status Badge */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`
                                                        inline-flex items-center gap-2 px-4 py-2 
                                                        text-xs font-semibold rounded-xl 
                                                        border-2 ${status.color}
                                                        shadow-sm hover:shadow-md
                                                        transition-all duration-200
                                                    `}
                                                >
                                                    <span className="flex-shrink-0">{status.icon}</span>
                                                    <span className="whitespace-nowrap">{t(status.label)}</span>
                                                </motion.span>
                                            </div>
                                        </td>

                                        {/* Total Count */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-lg bg-gray-50">
                                                <span className="text-lg font-bold text-gray-800">
                                                    {total}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Value */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center justify-center min-w-[100px] px-3 py-1.5 rounded-lg bg-green-50">
                                                <span className="text-base font-bold text-gray-800">
                                                    {value.toLocaleString()} DA
                                                </span>
                                            </div>
                                        </td>

                                        {/* Percentage with Progress Bar */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3">
                                                {/* Progress Bar */}
                                                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        transition={{ delay: i * 0.05 + 0.2, duration: 0.6 }}
                                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                                    />
                                                </div>
                                                {/* Percentage Text */}
                                                <span className="text-sm font-bold text-gray-700 min-w-[45px] text-right">
                                                    {percentage}%
                                                </span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {orders.length === 0 && (
                <div className="py-16 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                        {t("No orders yet") || "No orders yet"}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        {t("Orders will appear here once customers start purchasing") || "Orders will appear here once customers start purchasing"}
                    </p>
                </div>
            )}
        </BoxCard>
    );
};

export default StatusSummary;