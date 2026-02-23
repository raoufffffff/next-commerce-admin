import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EnAuth from "./locales/en/EnAuth.json"
import EnAccount from "./locales/en/account.json"
import EnStore from "./locales/en/store.json"
import EnOrder from "./locales/en/order.json"
import EnProduct from "./locales/en/product.json"
import EnCategories from "./locales/en/Categories.json"
import EnDelivery from "./locales/en/Delivery.json"
import EnSubscriptions from "./locales/en/subscriptions.json"

// ar
import ArAuth from "./locales/ar/ArAuth.json"
import ArAccount from "./locales/ar/account.json"
import Arstore from "./locales/ar/store.json"
import ArOrder from "./locales/ar/order.json"
import ArProduct from "./locales/ar/product.json"
import ArCategories from "./locales/ar/Categories.json"
import ArDelivery from "./locales/ar/Delivery.json"
import ArSubscriptions from "./locales/ar/subscriptions.json"

// fr
import FrAuth from "./locales/fr/FrAuth.json"
import FrAccount from "./locales/fr/account.json"
import Frstore from "./locales/fr/store.json"
import FrOrder from "./locales/fr/order.json"
import FrProduct from "./locales/fr/product.json"
import FrCategories from "./locales/fr/Categories.json"
import FrDelivery from "./locales/fr/Delivery.json"
import FrSubscriptions from "./locales/fr/subscriptions.json"
 


i18n
    .use(LanguageDetector) // detects language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                auth: EnAuth,
                account: EnAccount,
                store: EnStore,
                order: EnOrder,
                product: EnProduct,
                Categories: EnCategories,
                Delivery: EnDelivery,
                subscriptions: EnSubscriptions
             },
            ar: {
                auth: ArAuth,
                account: ArAccount,
                store: Arstore,
                order: ArOrder,
                product: ArProduct,
                Categories: ArCategories,
                Delivery: ArDelivery,
                subscriptions: ArSubscriptions
            },
             fr: {
                auth: FrAuth,
                account: FrAccount,
                store: Frstore,
                order: FrOrder,
                product: FrProduct,
                Categories: FrCategories,
                Delivery: FrDelivery,
                subscriptions: FrSubscriptions
             },
        },
        fallbackLng: "en", // default language
        ns: ["admin", "store", "product", "order", "delevry"], // list of namespaces
        defaultNS: "auth", // default namespace
        interpolation: {
            escapeValue: false // react already escapes
        }
    });

export default i18n;