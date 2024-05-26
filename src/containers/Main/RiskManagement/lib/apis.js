import { supabase } from "../../../../config/index_supabase";

export const saveRiskManagementData = async (formData) => {
  return await supabase.from("Risk_Management").insert(formData);
};

export const fetchRiskManagementData = async (userId) => {
  return await supabase.from("Risk_Management").select().eq("Userid", userId);
};

export const updateRiskManagementData = async (userId, updateData) => {
  return await supabase
    .from("Risk_Management")
    .update(updateData)
    .match({ Userid: userId });
};
