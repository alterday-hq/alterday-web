import { useTranslation } from "react-i18next";
import LegalPage from "./LegalPage";
import termsPL from "@/legal/terms-of-service.pl.md?raw";
import termsEN from "@/legal/terms-of-service.en.md?raw";

export default function TermsPage() {
  const { i18n } = useTranslation();
  const content = i18n.language === "pl" ? termsPL : termsEN;
  return <LegalPage content={content} titleKey="legal.termsTitle" />;
}
