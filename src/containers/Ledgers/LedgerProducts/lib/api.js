import { supabase } from "../../../../config/index_supabase";

const { REACT_APP_SUPABASE_TABLE_NAME } = process.env;

export const fetchUserLedgerData = async (userId) => {
  return await supabase
    .from(REACT_APP_SUPABASE_TABLE_NAME)
    .select()
    .eq("user_id", userId)
    .order("buy_date", { ascending: true });
};

export const postUserLedgerData = async (formData) => {
  return await supabase.from(REACT_APP_SUPABASE_TABLE_NAME).insert(formData);
};
