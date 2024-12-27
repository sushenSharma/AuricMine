import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const openAIConfig = {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  apiUrl: process.env.REACT_APP_OPENAI_URL,
  promptText: process.env.REACT_APP_OPENAI_API_PROMPT,
};

export const tableName = process.env.REACT_APP_SUPABASE_TABLE_NAME;
export const watchlistTableName =
  process.env.REACT_APP_SUPABASE_WATCHLIST_TABLE_NAME;
export const stateTableName = process.env.REACT_APP_SUPABASE_STATUS_TABLE_NAME;
