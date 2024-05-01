import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const columns = [
  {
    headerName: "Stock Name",
    field: "stock_name",
    filter: true,
    editable: true,
  },
  {
    headerName: "Buy Price",
    field: "buy_price",
    filter: true,
    editable: true,
  },
  {
    headerName: "Buy Date",
    field: "buy_date",
    filter: true,
    editable: true,
  },
  {
    headerName: "Amount Invested",
    field: "amount_invested",
    filter: true,
    editable: true,
  },
  {
    headerName: "Sell Price",
    field: "sell_price",
    filter: true,
    editable: true,
  },
  {
    headerName: "Sell Date",
    field: "sell_date",
    filter: true,
    editable: true,
  },
  {
    headerName: "Brokerage ",
    field: "brokerage",
    filter: true,
    editable: true,
  },
  {
    headerName: "Days Hold",
    field: "days_hold",
    filter: true,
    editable: true,
  },
  {
    headerName: "Reason to Buy",
    field: "reason_to_buy",
    filter: true,
    editable: true,
  },
  {
    headerName: "GTT Enabled",
    field: "gtt_enabled",
    filter: true,
    editable: true,
  },
  {
    headerName: "Profit / Loss",
    field: "profit_loss",
    filter: true,
    editable: true,
  },
  { headerName: "ROCE", field: "roce", filter: true, editable: true },
  {
    headerName: "Annual Return Generated",
    field: "annual_return_generated",
    filter: true,
    editable: true,
  },
];

export const userIdKey = "userId";
