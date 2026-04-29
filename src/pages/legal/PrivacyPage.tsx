import { useTranslation } from "react-i18next";
import LegalPage from "./LegalPage";
import privacyPL from "@/legal/privacy-policy.pl.md?raw";
import privacyEN from "@/legal/privacy-policy.en.md?raw";

export default function PrivacyPage() {
  const { i18n } = useTranslation();
  const content = i18n.language === "pl" ? privacyPL : privacyEN;
  return <LegalPage content={content} titleKey="legal.privacyTitle" />;
}
