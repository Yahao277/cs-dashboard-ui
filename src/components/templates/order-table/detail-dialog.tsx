import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {PropsWithChildren} from "react";
import {Order} from "@medusajs/medusa";
import {formatAmount} from "@/lib/utils";
import Thumbnail from "@/components/atoms/thumbnail";
import LineItemCard from "@/components/templates/order-table/line-item-card";

type Props = {
  details: Order
}

const DetailDialog = ({ details, children }: PropsWithChildren<Props>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Numero Pedido</DialogTitle>
          <DialogDescription>
            persona que hizo el pedido
          </DialogDescription>
        </DialogHeader>
        <span>Pedidos:</span>
        <div>
          {details.items && details.items.map(lineitem => (
            <LineItemCard lineItem={lineitem} key={lineitem.id}/>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DetailDialog;