import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 90000,
      retry: 1,
    },
  },
})

export const queryIncludeFields = "total,created_at,currency_code";
export const queryExpandFields = "customer,items.variant.options,items.variant.product.options";

