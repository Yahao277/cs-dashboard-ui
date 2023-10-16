'use client';

import {DataTable} from "@/components/organisms/task-table/data-table";
import {getColumns} from "./columns";
import {useAdminOrders} from "medusa-react";
import {AdminGetOrdersParams} from "@medusajs/medusa";
import {IOrderAction} from "@/lib/hooks/use-order-action/order-actions";


export default function OrderTable({ query, action }: { query?: AdminGetOrdersParams, action: IOrderAction }) {
  const { orders, isLoading } = useAdminOrders(query);

  const columns = getColumns(action);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex bg-background border rounded-lg">
        { isLoading && <div>Cargando...</div> }
        { orders && <DataTable data={orders} columns={columns} />}
      </div>
    </>
  )
}
