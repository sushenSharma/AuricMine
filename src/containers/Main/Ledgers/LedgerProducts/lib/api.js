import {
  supabase,
  tableName,
  openAIConfig,
} from "../../../../../config/index_supabase";

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

export const fetchInsightsWithAI = async (formData) => {
  const requestBody = {
    prompt: `With json data ${formData}, ${openAIConfig.promptText}`,
    max_tokens: Math.min(formData.length, 1000),
  };

  const response = await fetch(openAIConfig.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": openAIConfig.apiKey,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  const text = data.choices[0].text.split("\n").map((line) => line.trim());

  return text;
};
