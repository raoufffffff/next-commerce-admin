import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface PlanCardProps {
  name: string;
  price: string;
  currency: string;
  term: string;
  ordersLimit: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
  buttonText: string;
 }

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  price,
  currency,
  term,
  ordersLimit,
  features = [],
  badge,
  isPopular,
  buttonText,
 }) => {
    const { t } = useTranslation("subscriptions");
  
  return (
    <div
      className={`relative flex flex-col w-full bg-white rounded-2xl transition-all duration-300
      ${isPopular
          ? 'border-2 border-purple-600 shadow-xl scale-100 md:scale-105 z-10'
          : 'border border-gray-200 shadow-sm hover:shadow-purple-200 hover:border-purple-300'
        }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-0 translate-y-[-50%] w-full flex justify-center">
          <span className={`px-4 py-1 text-xs font-bold tracking-wide text-center text-white uppercase rounded-full shadow-xs ${
            isPopular ? 'bg-purple-600' : 'bg-teal-500'
          }`}>
            {badge}
          </span>
        </div>
      )}

      <div className="p-6 flex-1">
        {/* Plan Name */}
        <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-4">{name}</h3>

        {/* Orders Highlight */}
        <div className="mb-4">
          <span className={`text-5xl font-extrabold tracking-tight ${isPopular ? 'text-purple-700' : 'text-gray-900'}`}>
            {ordersLimit}
          </span>
          <span className="ml-2 text-base font-medium text-gray-400">{t("orders")}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline mb-6 border-t border-gray-100 pt-4">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          <span className="ml-1 text-sm font-medium text-gray-500">{currency}</span>
          <span className="ml-1 text-xs text-gray-400">/ {term}</span>
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="ml-3 text-sm text-gray-600">{feature}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-0 mt-auto">
        <Link
        onClick={()=>{
              localStorage.setItem('selectedPlanOption', JSON.stringify({
      orders: ordersLimit,
      plan: name,
      price: price
    }));
        }   }
        to={'/checkout'}
           className={`w-full flex items-center justify-center px-4 py-3 text-sm font-bold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isPopular
              ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-md hover:shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-700 focus:ring-teal-500'
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;