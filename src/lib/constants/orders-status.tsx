import {Order} from "@medusajs/medusa";

export const OrdersStatus: Record<string, any> = {
  PENDING: {
    value: "Pendiente",
    conditions: {
      payment: ["awaiting"],
      fulfillment: ["not_fulfilled"],
    }
  },
  PAID: {
    value: "Pagado",
    conditions: {
      payment: ["captured"],
      fulfillment: ["not_fulfilled"],
    }
  },
  TODO: {
    value: "Pendiente preparación",
    conditions: {
      payment: ["captured"],
      fulfillment: ["not_fulfilled"],
    }
  },
  PREPARING: {
    value: "Preparando",
    conditions: {
      payment: ["captured"],
      fulfillment: ["fulfilled", "partially_fulfilled"],
    }
  },
  FINISHED: {
    value: "Finalizado",
    conditions: {
      payment: ["captured"],
      fulfillment: ["shipped", "partially_shipped"],
      status: ["completed"]
    }
  }
}

export function computeStatus(order: Order) {
  const payment = order.payment_status;
  const fulfillment = order.fulfillment_status;
  const status = order.status;

  for (let key in OrdersStatus) {
    const conditions = OrdersStatus[key].conditions;

    if (
      (conditions.payment ? conditions.payment.includes(payment) : true) &&
      (conditions.fulfillment ? conditions.fulfillment.includes(fulfillment) : true) &&
      (conditions.status ? conditions.status.includes(status) : true)
    ) {
      return OrdersStatus[key];
    }
  }

  // If none of the statuses match, you can return a default value or undefined.
  return OrdersStatus.PENDING;
}

