export const prepareLedgerColumns = (validationErrors, onColumnFocus) => {
  return [
    {
      accessorKey: "stockSymbol",
      header: "Stock Symbol",
      muiEditTextFieldProps: {
        type: "string",
        required: true,
        error: !!validationErrors?.stockSymbol,
        helperText: validationErrors?.stockSymbol,
        onFocus: () =>
          onColumnFocus({
            ...validationErrors,
            stockSymbol: undefined,
          }),
      },
    },
    {
      accessorKey: "buyPrice",
      header: "Buy Price",
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        inputProps: { min: 0 },
        error: !!validationErrors?.buyPrice,
        helperText: validationErrors?.buyPrice,
        onFocus: () =>
          onColumnFocus({
            ...validationErrors,
            buyPrice: undefined,
          }),
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
        onFocus: () =>
          onColumnFocus({
            ...validationErrors,
            buyDate: undefined,
          }),
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        inputProps: { min: 0 },
        error: !!validationErrors?.quantity,
        helperText: validationErrors?.quantity,
        onFocus: () =>
          onColumnFocus({
            ...validationErrors,
            quantity: undefined,
          }),
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
        onFocus: () =>
          onColumnFocus({
            ...validationErrors,
            reasonToBuy: undefined,
          }),
      },
    },
    {
      accessorKey: "sellPrice",
      header: "Sell Price",
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        inputProps: { min: 0 },
        error: !!validationErrors?.sellPrice,
        helperText: validationErrors?.sellPrice,
        onFocus: () =>
          onColumnFocus({
            ...validationErrors,
            sellPrice: undefined,
          }),
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
        onFocus: () =>
          onColumnFocus(
            {
              ...validationErrors,
              sellDate: undefined,
            },
            "sellDate"
          ),
      },
    },

    {
      accessorKey: "gttEnabled",
      header: "GTT Enabled",
      editVariant: "select",
      editSelectOptions: ["YES", "NO"],
      muiEditTextFieldProps: {
        select: true,
        error: !!validationErrors?.gttEnabled,
        helperText: validationErrors?.gttEnabled,
        onFocus: () =>
          onColumnFocus({
            ...validationErrors,
            gttEnabled: undefined,
          }),
      },
    },
    {
      accessorKey: "brokerage",
      header: "Brokerage",
      muiEditTextFieldProps: {
        type: "number",
        disabled: true,
      },
    },
    {
      accessorKey: "daysHold",
      header: "Days Hold",
      muiEditTextFieldProps: {
        type: "string",
        disabled: true,
      },
    },

    {
      accessorKey: "profitLoss",
      header: "Profit / Loss",
      muiEditTextFieldProps: {
        type: "number",
        disabled: true,
      },
    },
    {
      accessorKey: "amount",
      header: "Amount Invested",
      muiEditTextFieldProps: {
        type: "number",
        disabled: true,
      },
    },
    {
      accessorKey: "annualReturnGenerated",
      header: "Annual Return Generated",
      muiEditTextFieldProps: {
        type: "number",
        disabled: true,
      },
    },
    {
      accessorKey: "roce",
      header: "Roce",
      muiEditTextFieldProps: {
        type: "number",
        disabled: true,
      },
    },
    {
      accessorKey: "id",
      header: "ID",
      enableEditing: false,
      size: 80,
    },
  ];
};
