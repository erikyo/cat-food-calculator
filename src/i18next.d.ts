// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import nsDe from "../locales/de/translation.json";
import nsEn from "../locales/en/translation.json";
import nsEs from "../locales/es/translation.json";
import nsFr from "../locales/fr/translation.json";
import nsIt from "../locales/it/translation.json";
import nsJp from "../locales/jp/translation.json";
import nsPt from "../locales/pt/translation.json";
import nsZh from "../locales/zh/translation.json";

declare module "i18next" {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: "nsEn";
        // custom resources type
        resources: {
            nsDe: typeof nsDe;
            nsEn: typeof nsEn;
            nsEs: typeof nsEs;
            nsFr: typeof nsFr;
            nsIt: typeof nsIt;
            nsJp: typeof nsJp;
            nsPt: typeof nsPt;
            nsZh: typeof nsZh;
        };
    }
}
