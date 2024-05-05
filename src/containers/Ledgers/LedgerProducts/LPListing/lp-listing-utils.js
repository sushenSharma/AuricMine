export const prepareLedgerColumns = (validationErrors) => {
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
        required: true,
        error: !!validationErrors?.stockSymbol,
        helperText: validationErrors?.stockSymbol,
      },
    },
    {
      accessorKey: "buyPrice",
      header: "Buy Price",
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        error: !!validationErrors?.buyPrice,
        helperText: validationErrors?.buyPrice,
      },
    },
    {
      accessorKey: "buyDate",
      header: "Buy Date",
      muiEditTextFieldProps: {
        type: "date",
        required: true,
        error: !!validationErrors?.buyDate,
        helperText: validationErrors?.buyDate,
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        error: !!validationErrors?.quantity,
        helperText: validationErrors?.quantity,
      },
    },
    {
      accessorKey: "sellPrice",
      header: "Sell Price",
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        error: !!validationErrors?.sellPrice,
        helperText: validationErrors?.sellPrice,
      },
    },
    {
      accessorKey: "sellDate",
      header: "Sell Date",
      muiEditTextFieldProps: {
        type: "date",
        required: true,
        error: !!validationErrors?.sellDate,
        helperText: validationErrors?.sellDate,
      },
    },
    {
      accessorKey: "brokerage",
      header: "Brokerage",
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        error: !!validationErrors?.brokerage,
        helperText: validationErrors?.brokerage,
      },
    },
    {
      accessorKey: "daysHold",
      header: "Days Hold",
      muiEditTextFieldProps: {
        type: "string",
        required: true,
        error: !!validationErrors?.daysHold,
        helperText: validationErrors?.daysHold,
      },
    },
    {
      accessorKey: "reasonToBuy",
      header: "Reason to Buy",
      muiEditTextFieldProps: {
        type: "string",
        required: true,
        error: !!validationErrors?.reasonToBuy,
        helperText: validationErrors?.reasonToBuy,
      },
    },
    {
      accessorKey: "gttEnabled",
      header: "GTT Enabled",
      muiEditTextFieldProps: {
        type: "select",
        requird: true,
        error: !!validationErrors?.gttEnabled,
        helperText: validationErrors?.gttEnabled,
      },
      Cell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      accessorKey: "profitLoss",
      header: "Profit / Loss",
      muiEditTextFieldProps: {
        type: "number",
        requird: true,
        error: !!validationErrors?.profitLoss,
        helperText: validationErrors?.profitLoss,
      },
    },
    {
      accessorKey: "amount",
      header: "Amount Invested",
      muiEditTextFieldProps: {
        type: "number",
        requird: true,
        error: !!validationErrors?.amount,
        helperText: validationErrors?.amount,
      },
    },
    {
      accessorKey: "annualReturnGenerated",
      header: "Annual Return Generated",
      muiEditTextFieldProps: {
        type: "number",
        requird: true,
        error: !!validationErrors?.annualReturnGenerated,
        helperText: validationErrors?.annualReturnGenerated,
      },
    },
    {
      accessorKey: "roce",
      header: "Roce",
      muiEditTextFieldProps: {
        type: "number",
        requird: true,
        error: !!validationErrors?.roce,
        helperText: validationErrors?.roce,
      },
    },
  ];
};
