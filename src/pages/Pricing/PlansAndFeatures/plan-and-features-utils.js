import { getLabel } from "../../../hooks/use-labels";
import {
  authKitIcon,
  infinityIcon,
  securityIcon,
  supportIcon,
  tickIcon,
  unifiedIcon,
} from "../../../svgImages";
import LedgerButton from "../../../ui-kit/Buttons/LedgerButton";

export const columns = [
  {
    id: "planFeatures",
    label: "",
    minWidth: 170,
    className: "table-header-col",
  },
  {
    id: "planFree",
    label: (
      <div className="plan-header-content">
        <span className="plan-view-tag">Free</span>
        <LedgerButton
          label={getLabel("tryItFreeLabel")}
          type="primary"
          size="lg"
          onClick={() => console.log("btn")}
        />
      </div>
    ),
    minWidth: 100,
    className: "table-header-col",
  },
  {
    id: "planRidiculous",
    label: (
      <div className="plan-header-content">
        <span className="plan-view-tag">Ridiculous</span>
        <LedgerButton
          label={getLabel("getStartedLabel")}
          type="primary"
          size="lg"
          onClick={() => console.log("btn")}
        />
      </div>
    ),
    minWidth: 170,
    align: "right",
    className: "table-header-col",
  },
  {
    id: "planGrowth",
    label: (
      <div className="plan-header-content">
        <span className="plan-view-tag">Growth</span>
        <LedgerButton
          label={getLabel("getStartedLabel")}
          type="primary"
          size="lg"
          onClick={() => console.log("btn")}
        />
      </div>
    ),
    minWidth: 170,
    align: "right",
    className: "table-header-col",
  },
  {
    id: "planEnterprise",
    label: (
      <div className="plan-header-content">
        <span className="plan-view-tag">Enterprise</span>
        <LedgerButton
          label={getLabel("contactSalesLabel")}
          type="primary"
          size="lg"
          onClick={() => console.log("btn")}
        />
      </div>
    ),
    minWidth: 170,
    align: "right",
    className: "table-header-col",
  },
];

const createData = (
  planFeatures,
  planFree,
  planRidiculous,
  planGrowth,
  planEnterprise
) => {
  return {
    planFeatures,
    planFree,
    planRidiculous,
    planGrowth,
    planEnterprise,
  };
};

export const prepareTableData = () => {
  return [
    createData(
      <span className="plan-title">{unifiedIcon} Unified</span>,
      "",
      "",
      ""
    ),

    createData("API Calls", "2,000", "50,000", infinityIcon, infinityIcon),
    createData("Pricing Type", "Free", "Standard", "Volume", "Custom"),
    createData("Common Models", tickIcon, tickIcon, tickIcon, tickIcon),
    createData(
      "Basic Integrations",
      infinityIcon,
      infinityIcon,
      infinityIcon,
      infinityIcon
    ),
    createData("Premium Integrations", "-", "1", infinityIcon, infinityIcon),
    createData("Passthrough API", tickIcon, tickIcon, tickIcon, tickIcon),
    createData(
      "Passthrough Forwarding",
      tickIcon,
      tickIcon,
      tickIcon,
      tickIcon
    ),
    createData("API Request Logs", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("SDKs", tickIcon, tickIcon, tickIcon, tickIcon),

    createData(
      <span className="plan-title">{authKitIcon} AuthKit</span>,
      "",
      "",
      ""
    ),

    createData(
      "Connected Accounts",
      "10",
      infinityIcon,
      infinityIcon,
      infinityIcon
    ),
    createData("Configuration", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("SDKs", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("OAuth2 Support", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("White labeling", "-", "-", tickIcon, tickIcon),

    createData(
      <span className="plan-title">{securityIcon} Security</span>,
      "",
      "",
      ""
    ),

    createData("HTTPS/SSL by default", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("DDoS Mitigation", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("Audit Logs", "-", "-", "-", tickIcon),
    createData("Single Sign-On (SSO)", "-", "-", "-", tickIcon),

    createData(
      <span className="plan-title">{supportIcon} Support</span>,
      "",
      "",
      ""
    ),

    createData("Community Support", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("Email Support", tickIcon, tickIcon, tickIcon, tickIcon),
    createData("Email Support SLA", "-", "-", "-", tickIcon),
    createData("Onboarding Support", "-", tickIcon, tickIcon, tickIcon),
    createData("Dedicated Slack Channel", "-", tickIcon, tickIcon, tickIcon),
    createData("Dedicated Account Manager", "-", "-", tickIcon, tickIcon),
    createData("SLA for 99.99% Uptime", "-", "-", "-", tickIcon),
    createData("Advanced Support Scope", "-", "-", "-", tickIcon),
    createData("Core Audits & Professional Services", "-", "-", "-", tickIcon),
  ];
};
