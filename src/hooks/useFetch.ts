import { useState } from "react";
import { delayFn } from "../helper/delayFn";
import { toast } from "react-toastify";

export const useFetch = <T>(callback: (...data: T[]) => void): [(...data: T[]) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFn = async (...arg: T[]): Promise<void> => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();

      return await callback(...arg);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error];
};
