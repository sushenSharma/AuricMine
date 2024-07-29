import { getLabel } from "../../../hooks/use-labels";

export const preparePackageCardsData = () => {
//   console.log("nakr", getLabel("packageTypeOnePlanList"));
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
    },
  ];
};
