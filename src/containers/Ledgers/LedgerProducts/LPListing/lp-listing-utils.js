import { TextField } from "@mui/material";

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
        inputProps: { min: 0 },
        error: !!validationErrors?.buyPrice,
        helperText: validationErrors?.buyPrice,
        min: 0,
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
        inputProps: { min: 0 },
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
        inputProps: { min: 0 },
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
        select: true, // This should be 'select', not 'type'
        required: true,
        SelectProps: {
          // Specify the SelectProps for dropdown specific properties
          native: true, // Use native select options
        },
        error: !!validationErrors?.gttEnabled,
        helperText: validationErrors?.gttEnabled,
      },
      Cell: ({ value }) => (value ? "Yes" : "No"),
      CellEdit: (props) => {
        return (
          <TextField
            {...props}
            select
            SelectProps={{ native: true }}
            error={!!validationErrors?.gttEnabled}
            helperText={validationErrors?.gttEnabled || "Select Yes or No"}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </TextField>
        );
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
  ];
};
