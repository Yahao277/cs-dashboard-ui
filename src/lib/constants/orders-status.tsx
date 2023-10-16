export const OrdersStatus = {
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

