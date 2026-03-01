// src/features/Upgrade/constants/plans.ts

export const plans = [
    {
        id: 'starter',
        nameKey: 'plan_starter_name',
        price: "990",
        currency: "DZD",
        ordersLimit: "150",
        termKey: 'per_month',
        featuresKeys: [
            'up_to_150_orders',
            'basic_support',
            'remove_branding'
        ],
        badgeKey: null,
        isPopular: false
    },
    {
        id: 'growth',
        nameKey: 'plan_growth_name',
        price: "1,500",
        currency: "DZD",
        ordersLimit: "290",
        termKey: 'per_month',
        featuresKeys: [
            'up_to_290_orders',
            'priority_support',
            'analytics',
            'everything_in_starter'
        ],
        badgeKey: 'most_popular',
        isPopular: true
    },
    {
        id: 'scale',
        nameKey: 'plan_scale_name',
        price: "1,900",
        currency: "DZD",
        ordersLimit: "5000",
        termKey: 'per_month',
        featuresKeys: [
            'up_to_5000_orders',
            'vip_support',
            'api_access',
            'everything_in_growth'
        ],
        badgeKey: 'best_value',
        isPopular: false
    }
];

export default plans;