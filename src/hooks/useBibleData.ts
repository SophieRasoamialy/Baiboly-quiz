import { useEffect, useState } from "react";
import { Book } from "../constants/bible";

export const useBibleData = () => {
  const [loading, setLoading] = useState(true);
  const [bibleData, setBibleData] = useState<Book[]>([]);

  useEffect(() => {
    const loadBible = async () => {
      try {
        const data = require("../../raw_data/baiboly.json");
        setBibleData(data.books || []);
      } catch (error) {
        console.error("Failed to load bible data", error);
      } finally {
        setLoading(false);
      }
    };

    loadBible();
  }, []);

  return {
    loading,
    bibleData,
  };
};