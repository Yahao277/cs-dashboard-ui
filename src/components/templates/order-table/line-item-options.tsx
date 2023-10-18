import { ProductVariant } from "@medusajs/medusa"
import {useAdminProducts, useProduct} from "medusa-react";

type LineItemOptionsProps = { variant: ProductVariant }

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  const variantOptions = useAdminProducts()

  return (
    <div className="text-xs text-gray-700">
      {variant.options && variant.options.map((option) => {
        const optionName =
          variant.product.options.find((opt) => opt.id === option.option_id)
            ?.title || "Option"
        return (
          <div key={option.id}>
            <span>
              {optionName}: {option.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default LineItemOptions
