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
      muiEditTextFieldProps: {
        type: "string",
      },
    },
    {
      accessorKey: "buyPrice",
      header: "Buy Price",
      muiEditTextFieldProps: {
        type: "number",
      },
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
      muiEditTextFieldProps: {
        type: "number",
      },
    },
    {
      accessorKey: "sellPrice",
      header: "Sell Price",
      muiEditTextFieldProps: {
        type: "number",
      },
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
      muiEditTextFieldProps: {
        type: "number",
      },
    },
    {
      accessorKey: "daysHold",
      header: "Days Hold",
      muiEditTextFieldProps: {
        type: "string",
      },
    },
    {
      accessorKey: "reasonToBuy",
      header: "Reason to Buy",
      muiEditTextFieldProps: {
        type: "string",
      },
    },
    {
      accessorKey: "gttEnabled",
      header: "GTT Enabled",
      Cell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      accessorKey: "profitLoss",
      header: "Profit / Loss",
      muiEditTextFieldProps: {
        type: "number",
      },
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
      muiEditTextFieldProps: {
        type: "number",
      },
    },
    {
      accessorKey: "annualReturnGenerated",
      header: "Annual Return Generated",
      muiEditTextFieldProps: {
        type: "number",
      },
    },
    {
      accessorKey: "roce",
      header: "Roce",
      muiEditTextFieldProps: {
        type: "number",
      },
    },
  ];
};
