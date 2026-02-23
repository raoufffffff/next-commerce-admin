import BoxCard from '@/components/ui/BoxCard';
import type { orders } from '@/types';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingCart, 
  Clock, 
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatsProps {
    orders: orders[];
    product: number;
    id: string | undefined;
}

const Stats = ({ orders = [], product, id }: StatsProps) => {
    const { t } = useTranslation("store"); 
    
    // Filter Orders
    const ConfirmedOrder = orders.filter(e =>
        e.status &&
        ["confirmed", "ready", "in company"].includes(e.status)
    );

    const PendingOrder = orders.filter(e =>
        e.status &&
        ["pending", "Connection failed 1", "Connection failed 2", "Connection failed 3", "Postponed"].includes(e.status)
    );

    const totalEarnings = ConfirmedOrder.reduce(
        (acc, curr) => acc + (curr.price || 0),
        0
    );

    const statsData = [
        {
            label: t("SoldProducts"),
            value: product,
            icon: ShoppingCart,
            color: "text-purple-600",
            bg: "bg-purple-100",
            to: `/store/${id}/products`
        },
        {
            label: t("NewOrders"),
            value: PendingOrder.length,
            icon: Clock,
            color: "text-blue-600",
            bg: "bg-blue-100",
            to: `/store/${id}/orders`
        },
        {
            label: t("Earnings"),
            value: `${totalEarnings.toLocaleString()} DA`,
            icon: DollarSign,
            color: "text-green-600",
            bg: "bg-green-100",
            to: `/store/${id}`
        }
    ];

    return (
        <BoxCard about={t('Overview')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <Link
                        to={stat.to}
                            key={index}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </BoxCard>
    );
};

export default Stats;