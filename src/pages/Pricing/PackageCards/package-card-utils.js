import { getLabel } from "../../../hooks/use-labels";

export const preparePackageCardsData = () => {
  return [
    {
      packageType: getLabel("packageTypeOne"),
      packageTypeLiner: getLabel("packageTypeOneLiner"),
      packageTypePrice: getLabel("packageTypeOnePrice"),
      packageTypeDuration: getLabel("packageTypeOnePrice"),
      packageTypePaymentDuration: getLabel("packageTypeOnePaymentDuration"),
      packageTypeBtnLink: getLabel("packageTypeOneLink"),
      packageTypePlanIncludes: getLabel("packageTypeOnePlanOffers"),
      packageTypePlanList: getLabel("packageTypeOnePlanList"),
      className: "package-one",
      iconColor: "white-color-icon",
      btnLinkColor: "",
    },
    {
      packageType: getLabel("packageTypeTwo"),
      packageTypeLiner: getLabel("packageTypeTwoLiner"),
      packageTypePrice: getLabel("packageTypeTwoPrice"),
      packageTypeDuration: getLabel("packageTypeTwoPrice"),
      packageTypePaymentDuration: getLabel("packageTypeTwoPaymentDuration"),
      packageTypeBtnLink: getLabel("packageTypeTwoLink"),
      packageTypePlanIncludes: getLabel("packageTypeTwoPlanOffers"),
      packageTypePlanList: getLabel("packageTypeTwoPlanList"),
      className: "package-two",
      iconColor: "blue-color-icon",
      btnLinkColor: "white-button-color",
    },
    {
      packageType: getLabel("packageTypeThree"),
      packageTypeLiner: getLabel("packageTypeThreeLiner"),
      packageTypePrice: getLabel("packageTypeThreePrice"),
      packageTypeDuration: getLabel("packageTypeThreePrice"),
      packageTypePaymentDuration: getLabel("packageTypeThreePaymentDuration"),
      packageTypeBtnLink: getLabel("packageTypeThreeLink"),
      packageTypePlanIncludes: getLabel("packageTypeThreePlanOffers"),
      packageTypePlanList: getLabel("packageTypeThreePlanList"),
      className: "package-three",
      iconColor: "purple-color-icon",
      btnLinkColor: "",
    },
  ];
};
