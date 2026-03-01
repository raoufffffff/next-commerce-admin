import PageContainer from "@/components/ui/PageContainer";
import PlanCard from "@/features/Upgrade/components/PlanCard";
 import plans from "@/features/Upgrade/constants/plans";
 import { useTranslation } from "react-i18next";

const Upgrade = () => {
  const { t } = useTranslation("subscriptions");
 
  return (
    <PageContainer
      title={t('upgrade')}
      about={t("Choosetheplan")}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple header */}
        <div className="text-center mb-10">
          <p className="text-gray-500 text-sm">{t("all_plans_monthly_billing")}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              name={t(plan.nameKey)}
              price={plan.price}
              currency={plan.currency}
              term={t(plan.termKey)}
              ordersLimit={plan.ordersLimit}
              badge={plan.badgeKey ? t(plan.badgeKey) : undefined}
              isPopular={plan.isPopular}
              features={plan.featuresKeys.map(key => t(key))}
              buttonText={t('see_details')}
             />
          ))}
        </div>
      </div>

      
    </PageContainer>
  );
};

export default Upgrade;