import { useState, useEffect } from "react";
import { fetchData } from "../api/supabaseClient";
import { userIdKey } from "../constants";

export const useSupabaseData = () => {
  const [materialdata, setMaterialData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData(userIdKey);
        setMaterialData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    loadData();
  }, []);

  return materialdata;
};
