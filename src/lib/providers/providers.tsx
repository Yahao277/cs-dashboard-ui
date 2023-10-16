'use client';

import { PropsWithChildren } from "react"
import { MedusaProvider } from "./medusa-provider"




/**
 * This component wraps all providers into a single component.
 */
export const Providers = ({
                            children,
                          }: PropsWithChildren) => {
  return (
      <MedusaProvider>
        {children}
      </MedusaProvider>
  )
}
