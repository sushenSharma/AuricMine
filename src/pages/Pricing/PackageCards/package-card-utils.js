import { indAmount, nonIndAmount } from "../../../constants";
import { getLabel } from "../../../hooks/use-labels";
import { isIndianUser } from "../../../utils/common-utils";

export const preparePackageCardsData = (onClickPackageHandler) => {
  return [
    {
      packageType: getLabel("packageTypeOne"),
      packageTypeLiner: getLabel("packageTypeOneLiner"),
      packageTypePrice: (isIndianUser() ? "₹" : "$") + getLabel("packageTypeOnePrice"),
      packageTypeDuration: getLabel("packageTypeTwoDuration"),
      packageTypePaymentDuration: getLabel("packageTypeOnePaymentDuration"),
      packageTypeLinkLabel: getLabel("packageTypeOneLinkLabel"),
      packageTypeBtnLink: onClickPackageHandler,
      packageTypeLink: getLabel("packageTypeOneLinkLabel"),
      packageTypePlanIncludes: getLabel("packageTypeOnePlanOffers"),
      packageTypePlanList: getLabel("packageTypeOnePlanList"),
      className: "package-one",
      iconColor: "white-color-icon",
      btnLinkColor: "",
      enableLink: false,
    },
    {
      packageType: getLabel("packageTypeTwo"),
      packageTypeLiner: getLabel("packageTypeTwoLiner"),
      packageTypePrice: isIndianUser() ? "₹"+indAmount : "$"+nonIndAmount,
      packageTypeDuration: getLabel("packageTypeTwoDuration"),
      packageTypePaymentDuration: getLabel("packageTypeTwoPaymentDuration"),
      packageTypeLinkLabel: getLabel("packageTypeTwoLinkLabel"),
      packageTypeBtnLink: onClickPackageHandler,
      packageTypePlanIncludes: getLabel("packageTypeTwoPlanOffers"),
      packageTypePlanList: getLabel("packageTypeTwoPlanList"),
      className: "package-two",
      iconColor: "blue-color-icon",
      btnLinkColor: "white-button-color",
      enableLink: false,
    },
  ];
};
