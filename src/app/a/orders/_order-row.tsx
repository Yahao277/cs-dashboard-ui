import {LineItem, Order} from "@medusajs/medusa";
import {useOrderPaid, useOrderPreparing, useOrderReady} from "@/lib/hooks/use-order-action";
import {useMemo} from "react";
import {Button} from "@/components/ui/button";
import {OrdersStatus} from "@/lib/constants/orders-status";

function asList(str: string | string[]) {
  return Array.isArray(str) ? [...str] : [str];
}

function shallowEquals(objA: Record<string, any>, objB: Record<string, any>): boolean {
  // Get keys
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // If number of properties is different, they're not equivalent
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    const valA = objA[key];
    const valB = objB[key];

    // If both values are arrays of strings, check if they are equivalent
    if (Array.isArray(valA) && Array.isArray(valB) &&
      valA.every(item => typeof item === 'string') &&
      valB.every(item => typeof item === 'string')) {
      if (valA.length !== valB.length ||
        valA.some((str, idx) => str !== valB[idx])) {
        return false;
      }
    } else if (valA !== valB) {  // Otherwise, simply compare the values
      return false;
    }
  }

  // All checks passed
  return true;
}


function computeStatus(order: Order) {
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
      return OrdersStatus[key].value;
    }
  }

  // If none of the statuses match, you can return a default value or undefined.
  return undefined;
}

function remainingQuantity(item: LineItem) {
  return item.quantity - (item.fulfilled_quantity || 0)
}

const OrderRow = ({ order, onActionResponse }: { order: Order; onActionResponse: () => void}) => {

  const { mutate: paying } = useOrderPaid({ selectedOrder: order, onSettled: () => onActionResponse() } );
  const { mutate: preparing} = useOrderPreparing({ selectedOrder: order, onSettled: () => onActionResponse() });
  const { mutate: ready } = useOrderReady({ selectedOrder: order, onSettled: () => onActionResponse() });

  const handleClick = (action: string) => {
    console.log('click ', action);
    if (action === 'paying') {
      paying();
    } else if (action === 'preparing') {
      preparing({
        items: order.items.map((item) => {
          return ({
            item_id: item.id,
            quantity: remainingQuantity(item),
          });
        })
      });
    } else if (action === 'ready') {
      ready( { fulfillment_id: order.fulfillments.length > 0 ? order.fulfillments[0].id : undefined})
    }
  }

  const computedStatus = useMemo(() => computeStatus(order), [order]);
  return (
    <tr key={order.id}>
      <td>{order.display_id}</td>
      <td>{order.customer.first_name}</td>
      <td>{order.payment_status}</td>
      <td>{order.fulfillment_status}</td>
      <td>{order.status}</td>
      <td>{computedStatus}</td>

      <td><Button variant="default" size="sm" onClick={() => handleClick('paying')}>Cobro</Button></td>
      <td><Button variant="secondary" size="sm" onClick={() => handleClick('preparing')}>Preparando</Button></td>
      <td><Button variant="secondary" size="sm" onClick={() => handleClick('ready')}>Listo</Button></td>
    </tr>
  )
}

export default OrderRow;