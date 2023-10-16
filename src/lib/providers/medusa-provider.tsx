import { MedusaProvider as Provider } from "medusa-react"
import { PropsWithChildren } from "react"

import {MEDUSA_BACKEND_URL} from "@/lib/services/medusa-backend";
import {queryClient} from "@/lib/constants/query-client";



export const MedusaProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider
      queryClientProviderProps={{
        client: queryClient,
      }}
      baseUrl={MEDUSA_BACKEND_URL}
    >
      {children}
    </Provider>
  )
}
