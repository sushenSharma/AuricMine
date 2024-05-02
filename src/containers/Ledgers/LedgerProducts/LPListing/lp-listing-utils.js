export const prepareLedgerColumns = () => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: "stockSymbol",
      header: "Stock Symbol",
    },
    {
      accessorKey: "buyPrice",
      header: "Buy Price",
    },
    {
      accessorKey: "buyDate",
      header: "Buy Date",
      muiEditTextFieldProps: {
        type: "date",
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "sellPrice",
      header: "Sell Price",
    },
    {
      accessorKey: "sellDate",
      header: "Sell Date",
      muiEditTextFieldProps: {
        type: "date",
      },
    },
    {
      accessorKey: "brokerage",
      header: "Brokerage",
    },
    {
      accessorKey: "daysHold",
      header: "Days Hold",
    },
    {
      accessorKey: "reasonToBuy",
      header: "Reason to Buy",
    },
    {
      accessorKey: "gttEnabled",
      header: "GTT Enabled",
      Cell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      accessorKey: "profitLoss",
      header: "Profit / Loss",
    },
    {
      accessorKey: "returnPercent",
      header: "Return %",
    },
    {
      accessorKey: "annualROI",
      header: "Annual ROI",
    },
    {
      accessorKey: "amount",
      header: "Amount Invested",
    },
    {
      accessorKey: "annualReturnGenerated",
      header: "Annual Return Generated",
    },
    {
      accessorKey: "roce",
      header: "Roce",
    },
  ];
};
