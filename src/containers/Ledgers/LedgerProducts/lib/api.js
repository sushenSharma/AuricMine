import { supabase } from "../../../../config/index_supabase";

export const fetchUserLedgerData = async (userId) => {
  const { REACT_APP_SUPABASE_TABLE_NAME } = process.env;

  return await supabase
    .from(REACT_APP_SUPABASE_TABLE_NAME)
    .select()
    .eq("user_id", userId)
    .order("buy_date", { ascending: true });
};
