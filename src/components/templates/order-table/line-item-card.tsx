import {LineItem} from "@medusajs/medusa";
import Thumbnail from "@/components/atoms/thumbnail";
import {formatAmount} from "@/lib/utils";
import LineItemOptions from "@/components/templates/order-table/line-item-options";

type CardProps = {
  lineItem: LineItem;
}

const LineItemCard = ({ lineItem }: CardProps) => {
  return (
    <div className="grid grid-cols-[122px_1fr] gap-x-4 mb-4">
      <div className="w-[100px]">
        <Thumbnail thumbnail={lineItem.thumbnail}></Thumbnail>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[130px]">
                  {lineItem.title}
              </h3>
              <LineItemOptions variant={lineItem.variant} />
              <span className="text-xs">Cantidad: {lineItem.quantity}</span>
            </div>
            <div className="flex justify-end">
              {formatAmount(lineItem.total, "eur")}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineItemCard;