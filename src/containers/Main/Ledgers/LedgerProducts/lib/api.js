import {
  supabase,
  tableName,
  openAIConfig,
  watchlistTableName,
  stateTableName,
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
    messages: [
      {
        role: "system",
        content: `With json data ${JSON.stringify(formData)}, ${
          openAIConfig.promptText
        }`,
      },
    ],
    max_tokens: Math.min(formData.length, 1000),
    temperature: 0.7, // Adjust the temperature as needed
    frequency_penalty: 0, // Adjust the frequency penalty as needed
    presence_penalty: 0, // Adjust the presence penalty as needed
    top_p: 0.95, // Adjust top_p as needed
    stop: null, // Set stop to null or any specific stop sequence if needed
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

  // Extract the content from the response
  const text = data.choices[0].message.content
    .split("\n")
    .map((line) => line.trim());

  return text;
};

export const postWatchListData = async (formData) => {

  return await supabase.from(watchlistTableName).insert(formData);
};

export const fetchWatchlistData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from(watchlistTableName)
      .select("*") // Specify the columns you want to fetch
      .eq("userUUID", userId); // Ensure the filter is applied based on the userUUID

    if (error) {
      console.error("Error fetching watchlist data:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error fetching watchlist data:", err);
    return { data: null, error: err };
  }
};



export const updateCardStatus = async (taskId, newStatus) => {
  try {
    const { error } = await supabase
      .from(watchlistTableName) // Replace "watchlist" with your actual table name
      .update({ status: newStatus }) // Update the status field
      .eq("id", taskId); // Match the card by its id

    if (error) {
      console.error("Error updating status in database:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error updating status:", err);
    return { success: false, error: err };
  }
};

