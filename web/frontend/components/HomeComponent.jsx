import { useState } from "react";
import { LegacyCard, VerticalStack, Text, Button } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function HomeComponent() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const productsCount = 5;

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/create");

    if (response.ok) {
      await refetchProductCount();
      setToastProps({
        content: t("ProductsCard.productsCreatedToast", {
          count: productsCount,
        }),
      });
    } else {
      setIsLoading(false);
      setToastProps({
        content: t("ProductsCard.errorCreatingProductsToast"),
        error: true,
      });
    }
  };

  const handleInstall = async () => {
    setIsLoading(true);

    const script_url =
      "https://2k21.s3.ap-south-1.amazonaws.com/testingJavascript/index.js";

    const response = await fetch("/api/scripttag/install", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ script_url }),
    });
    const json = await response.json();

    console.log("response", json);
    setIsLoading(false);
  };

  const handleScripts = async () => {
    setIsLoading(true);

    const response = await fetch("/api/scripttags");
    const json = await response.json();

    console.log("response", json);
    setIsLoading(false);
  };

  return (
    <>
      {toastMarkup}
      <LegacyCard
        title={"HomeComponent"}
        sectioned
        primaryFooterAction={{
          content: t("ProductsCard.populateProductsButton", {
            count: productsCount,
          }),
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <VerticalStack spacing='loose'>
          <p>{t("ProductsCard.description")}</p>
          <Text as='h4' variant='headingMd'>
            {t("ProductsCard.totalProductsHeading")}
            <Text variant='bodyMd' as='p' fontWeight='semibold'>
              {isLoadingCount ? "-" : data.count}
            </Text>
          </Text>
        </VerticalStack>

        <VerticalStack spacing='loose'>
          <Button onClick={handleInstall}>Install Script</Button>
          <Button onClick={handleScripts}>Get Scripts</Button>
        </VerticalStack>
      </LegacyCard>
    </>
  );
}
