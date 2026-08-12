import { useState } from "react";
import { delayFn } from "../helper/delayFn";
import { toast } from "react-toastify";

export const useFetch = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFn = async (arg) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();

      return await callback(arg);
    } catch (err) {
      setError(err.message);

      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error];
};
