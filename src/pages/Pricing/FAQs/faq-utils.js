export const prepareFaqs = () => {
  return [
    {
      key: "faq1",
      label: "What is a connected account?",
      content:
        "A Connected Account represents a user's authorized account for a selected integration vendor. A single end-user of your application might have accounts at different integration vendors, which means they would have multiple different Connected Accounts.",
    },
    {
      key: "faq2",
      label: "Does AuthKit work with my frontend framework?",
      content:
        "AuthKit is compatible with almost all major frameworks, including React, Next.js, Vue, Svelte and more.",
    },
    {
      key: "faq3",
      label: "What's Standard API Pricing?",
      content:
        "Unified API is usage-based billing and gets cheaper with volume. API calls start on Standard Pricing, which bills each call at $0.029.",
    },
    {
      key: "faq4",
      label: "Why is IntegrationOS mainly usage-based vs value-based?",
      content:
        "Value-based pricing is geared around testing how much money you're willing to pay. Usage-based pricing is like a utility - where we continually seek to lower costs and make money through volume.",
    },
    {
      key: "faq5",
      label: "How can I manage my spend?",
      content:
        "We provide customers with tools to observe, control, and alert on their infrastructure spend with Spend Management. You can define a spend amount (e.g. $40) and receive email, web, and SMS notifications as you reach that amount.",
    },
    {
      key: "faq6",
      label: "Can I white label IntegrationOS?",
      content:
        "Yes. All customers on our Growth plan have access to the white label feature. Once enabled, IntegrationOS branding is hidden and not displayed to your end users when authenticating via the AuthKit drop-in component. ",
    },
  ];
};
