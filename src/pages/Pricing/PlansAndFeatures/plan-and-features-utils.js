import { getLabel } from "../../../hooks/use-labels";
import {
  authKitIcon,
  infinityIcon,
  securityIcon,
  supportIcon,
  whiteTickProductIcon,
  blackTickIcon,
  unifiedIcon,
} from "../../../svgImages";
import LedgerButton from "../../../ui-kit/Buttons/LedgerButton";

export const columns = [
  {
    id: "planFeatures",
    label: "",
    className: "table-header-col",
  },
  {
    id: "planFree",
    label: (
      <div className="plan-header-content pb-3">
        <span className="plan-view-tag">
          <span className="plan-view-tag-icon white-color-icon"></span>Free
        </span>
        {/* <LedgerButton
          label={getLabel("tryItFreeLabel")}
          type="primary"
          size="lg"
          onClick={() => console.log("btn")}
          className="white-color-bg"
        /> */}
      </div>
    ),
    minWidth: 197,
    className: "table-header-col",
  },
  {
    id: "planRidiculous",
    label: (
      <div className="plan-header-content pb-3">
        <span className="plan-view-tag">
          <span className="plan-view-tag-icon blue-color-icon"></span>Pro Trader
        </span>
        {/* <LedgerButton
          label={getLabel("getStartedLabel")}
          type="primary"
          size="lg"
          onClick={() => console.log("btn")}
          className="blue-color-bg"
        /> */}
      </div>
    ),
    minWidth: 197,
    align: "right",
    className: "table-header-col",
  },
];

const createData = (
  planFeatures,
  planFree,
  planRidiculous,
  planGrowth,
  planEnterprise,
  className
) => {
  return {
    planFeatures,
    planFree,
    planRidiculous,
    planGrowth,
    planEnterprise,
    className,
  };
};

export const prepareTableData = () => {
  return [
    createData(
      <span className="product-content">
        <span className="product-icon">{unifiedIcon}</span>
        <span className="procuct-title">Basic journaling Features</span>
      </span>,
      "",
      "",
      "",
      "",
      "procduct-title-row"
    ),

    createData(
      <span className="feature-name">Track Parameters</span>,
      <span className="feature-item">5</span>,
      <span className="feature-item">15</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Pricing Type</span>,
      <span className="feature-item">Free</span>,
      <span className="feature-item">Standard</span>,
      <span className="feature-item">Volume</span>,
      <span className="feature-item">Custom</span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Charts and Analytics</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name"> Basic Integrations </span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Premium Integrations</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">1</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Passthrough API</span>,
      <span className="feature-item-icon tick-icon  white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Passthrough Forwarding</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">API Request Logs</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">SDKs</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),

    createData(
      <span className="product-content">
        <span className="product-icon">{authKitIcon}</span>
        <span className="procuct-title">AuthKit</span>
      </span>,
      "",
      "",
      "",
      "",
      "procduct-title-row"
    ),

    createData(
      <span className="feature-name">Connected Accounts</span>,
      <span className="feature-item">10</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      <span className="feature-item-icon">{infinityIcon}</span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Configuration</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">SDKs</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">OAuth2 Support</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">White labeling</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),

    createData(
      <span className="product-content">
        <span className="product-icon">{securityIcon}</span>
        <span className="procuct-title">Security</span>
      </span>,
      "",
      "",
      "",
      "",
      "procduct-title-row"
    ),

    createData(
      <span className="feature-name">HTTPS/SSL by default</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">DDoS Mitigation</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Audit Logs</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Single Sign-On (SSO)</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),

    createData(
      <span className="product-content">
        <span className="product-icon">{supportIcon}</span>
        <span className="procuct-title"> Support</span>
      </span>,
      "",
      "",
      "",
      "",
      "procduct-title-row"
    ),

    createData(
      <span className="feature-name">Community Support</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Email Support</span>,
      <span className="feature-item-icon tick-icon white-color-icon">
        {blackTickIcon}
      </span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Email Support SLA</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Onboarding Support</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Dedicated Slack Channel</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon blue-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Dedicated Account Manager</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon purple-color-icon">
        {whiteTickProductIcon}
      </span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">SLA for 99.99% Uptime</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Advanced Support Scope</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
    createData(
      <span className="feature-name">Core Audits & Professional Services</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item">-</span>,
      <span className="feature-item-icon tick-icon teal-color-icon">
        {whiteTickProductIcon}
      </span>,
      "procduct-data-row"
    ),
  ];
};
