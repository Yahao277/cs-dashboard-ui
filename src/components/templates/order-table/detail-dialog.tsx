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
          {details.items.map(lineitem => (
            <div key={lineitem.id}>
              <span>{lineitem.title}</span>
              <span>{lineitem.quantity}</span>
              <span>{lineitem.unit_price}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DetailDialog;