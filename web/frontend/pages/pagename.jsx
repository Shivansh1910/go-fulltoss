import {
  Page,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";

import {  HomeComponent} from "../components";

export default function PageName() {
  const { t } = useTranslation();

  return (
    <Page>
      <HomeComponent />
    </Page>
  );
}
