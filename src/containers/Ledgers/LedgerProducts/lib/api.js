import { supabase, tableName } from "../../../../config/index_supabase";

export const fetchUserLedgerData = async (userId) => {
  return await supabase
    .from(tableName)
    .select()
    .eq("user_id", userId)
    .order("buy_date", { ascending: true });
};

export const postUserLedgerData = async (formData) => {
  return await supabase.from(tableName).insert(formData);
};

export const deleteUserLedgerData = async (dataID) => {
  return await supabase.from(tableName).delete().match({ id: dataID });
};

export const updateUserLedgerData = async (dataID, updateData) => {
  return await supabase
    .from(tableName)
    .update(updateData)
    .match({ id: dataID });
};
