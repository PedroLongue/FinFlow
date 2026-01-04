import { useQuery } from "@tanstack/react-query";
import { billsQueries } from "../queries/bills";
import type { BillStatusKey } from "../types/bills";

export const useBill = (
  page = 1,
  status?: BillStatusKey,
  category?: string
) => {
  const {
    data: bills,
    isLoading,
    isError,
  } = useQuery(billsQueries.getAll(page, status, category));

  return {
    bills,
    isLoading,
    isError,
  };
};
