import {medusaService} from "@/lib/services/medusa-backend";
import {LineItem, Order} from "@medusajs/medusa";
import {Row} from "@tanstack/react-table";

export type IOrderAction = {
  name: string;
  label: string;
  onAction: (row: Row<Order>) => void;
};

export const OrderAction = {
  PREPARE: {
    name: "prepare",
    label: "Preparar",
    onAction: (row: Row<Order>) => {
      console.log("prepare")
      medusaService.admin.orders.createFulfillment(row.original.id, {
        items: row.original.items.map((item: LineItem) => ({
          item_id: item.id,
          quantity: item.quantity,
        }))
      })
        .then((res: any) => console.log(res));
    }
  },
  PAYMENT: {
    name: "payment",
    label: "Cobrar",
    onAction: (row: Row<Order>) => {
      console.log("prepare")
      medusaService.admin.orders.capturePayment(row.original.id)
        .then((res: any) => console.log(res))
    }
  },
  READY: {
    name: "ready",
    label: "Listo",
    onAction: (row: Row<Order>) => {
      console.log("ready")
      if (row.original.fulfillments.length === 0) {
        return;
      }
      medusaService.admin.orders.createShipment(row.original.id, { fulfillment_id: row.original.fulfillments[0].id })
        .then((res: any) => console.log(res))
    }
  },
  DELIVERY:   {
    name: "delivery",
    label: "Entregado",
    onAction: (row: Row<Order>) => {
      console.log("delivered")
      medusaService.admin.orders.complete(row.original.id)
        .then((res: any) => console.log(res))
    }
  },
  CANCEL: {
    name: "cancel",
    label: "Cancelar",
    onAction: (row: Row<Order>) => {
      console.log("cancel")
      // TODO: cancel order
      medusaService.admin.orders.list()
        .then((res: any) => console.log(res))
    }
  }
}

export const orderActions = [
  {
    name: "prepare",
    label: "Preparar",
    onAction: (row: Row<Order>) => {
      console.log("prepare")
      medusaService.admin.orders.createFulfillment(row.original.id, {
        items: row.original.items.map((item: LineItem) => ({
          item_id: item.id,
          quantity: item.quantity,
        }))
      })
        .then((res: any) => console.log(res));
    } // TODO: call a query to modify order
  },
  {
    name: "payment",
    label: "Pago",
    onAction: (row: Row<Order>) => {
      console.log("prepare")
      medusaService.admin.orders.capturePayment(row.original.id)
        .then((res: any) => console.log(res))
    }
  },
  {
    name: "ready",
    label: "Finalizado",
    onAction: (row: Row<Order>) => {
      console.log("ready")
      if (row.original.fulfillments.length === 0) {
        return;
      }
      medusaService.admin.orders.createShipment(row.original.id, { fulfillment_id: row.original.fulfillments[0].id })
        .then((res: any) => console.log(res))
    }
  },
  {
    name: "delivery",
    label: "Entregado",
    onAction: (row: Row<Order>) => {
      console.log("delivered")
      medusaService.admin.orders.complete(row.original.id)
        .then((res: any) => console.log(res))
    }
  },
  {
    name: "cancel",
    label: "Cancelar",
    onAction: (row: Row<Order>) => {
      console.log("cancel")
      medusaService.admin.orders.list()
        .then((res: any) => console.log(res))
    }
  }
]
