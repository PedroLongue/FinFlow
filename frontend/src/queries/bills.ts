import type { QueryClient } from "@tanstack/react-query";
import { queryOptions, mutationOptions } from "@tanstack/react-query";
import { getData, postData } from "../services/api";
import type { BillStatusKey, IBill } from "../types/bills";

export type BillsResponse = {
  bills: IBill[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export const billsQueries = {
  getAll: (page: number, status?: BillStatusKey, category?: string) =>
    queryOptions({
      queryKey: ["bills", { page, status: status ?? null }],
      queryFn: () => {
        const qs = new URLSearchParams();
        qs.set("page", String(page));
        if (status) qs.set("status", status);
        if (category) qs.set("category", category);

        return getData<BillsResponse>(`/bills?${qs.toString()}`);
      },
      retry: false,
    }),
};
