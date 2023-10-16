import {
  useAdminCapturePayment,
  useAdminCreateFulfillment,
  useAdminCreateShipment,
  useAdminOrders,
} from "medusa-react";
import {useToast} from "@/components/ui/use-toast";
import {useEffect} from "react";

import {Order} from "@medusajs/medusa";

/*
* Estados de flujo de ordenes:
* Pagado / Pendiente de preparacion: payment_status: captured
* en preparacion: fulfillment_status: fulfilled / partial_fulfilled
* listo: fulfillment_status: shipped
* entregado: status: completed
* */

type OrderActionProps = {
  enabled: boolean;
  payment_status: string[];
  fulfillment_status: string[];
  status: string[];
  manual?: boolean;
}

type OrderActionProps2 = {
  enabled?: boolean;
  selectedOrder: Order;
  onSettled?: () => void;
}

export const useOrderPaid = ({ selectedOrder, enabled = false, onSettled }: OrderActionProps2) => {
  const { mutate  } = useAdminCapturePayment(selectedOrder.id, { onSettled: onSettled});

  return {
    mutate
  }
}

export const useOrderPreparing = ({ selectedOrder, enabled = false, onSettled }: OrderActionProps2) => {
  const { mutate} = useAdminCreateFulfillment(selectedOrder.id, { onSettled: onSettled});

  return {
    mutate
  }
}

export const useOrderReady = ({ selectedOrder, enabled = false, onSettled }: OrderActionProps2) => {
  const { mutate } = useAdminCreateShipment(selectedOrder.id, { onSettled: onSettled});

  return {
    mutate
  }
}
export const useOrderAction = ({ enabled , payment_status, fulfillment_status, status }: OrderActionProps) => {
  // const { data, isLoading, isError, isSuccess, refetch, isRefetching} =
  //   useQuery<unknown, unknown, AdminOrdersListRes>(["orders", payment_status, fulfillment_status, status],
  //     () => medusaService.admin.orders.list({ status, payment_status, fulfillment_status}),
  //     { enabled });
  const { orders, isLoading, isError, isSuccess, refetch, isRefetching } = useAdminOrders(
    { payment_status, fulfillment_status, status ,fields: "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code", offset: 0, limit: 100},
    { enabled });
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "No se pudo realizar la acción",
      })
    }
    if (isSuccess) {
      toast({
        title: "Éxito",
        description: "La acción se realizó correctamente",
      })
    }
  }, [isError, isSuccess, toast, isRefetching, isLoading])

  return {
    orders,
    refetch,
    isLoading
  }
}