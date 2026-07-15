import { useEffect, useState } from "react";
import { delayFn } from "../helper/delayFn";

export const useFetch = (callback) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFn = async (arg) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();

      const response = await callback(arg);

      return response;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error];
};
