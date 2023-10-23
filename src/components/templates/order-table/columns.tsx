"use client"

import {ColumnDef, Row} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "@/lib/data/data"
import { DataTableColumnHeader } from "@/components/molecules/data-table/data-table-column-header"
import { DataTableRowActions } from "@/components/molecules/data-table/data-table-row-actions"
import {Button} from "@/components/ui/button";
import {medusaService} from "@/lib/services/medusa-backend";
import {LineItem, Order} from "@medusajs/medusa";
import DetailDialog from "@/components/templates/order-table/detail-dialog";
import {IOrderAction} from "@/lib/hooks/use-order-action/order-actions";
import {computeStatus, OrdersStatus} from "@/lib/constants/orders-status";
import {format} from "date-fns";
import {formatAmount} from "@/lib/utils";

// Order available state changes
const orderActions = [
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
    name: "delivered",
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


export const getColumns: (action?: IOrderAction) => ColumnDef<Order>[] = (action) => {
  return [
    {
      id: "select",
      header: ({table}) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="nºPedido"/>
      ),
      cell: ({row}) => <div className="w-[10px]">#{row.original.display_id}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "customer",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Cliente"/>
      ),
      cell: ({row}) => {
        //const label = labels.find((label) => label.value === row.original.label)
        console.log('customer', row.original.customer)

        return (
          <div className="flex space-x-2">
            {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}
            <span className="max-w-[500px] font-medium w-[50px]">
            {row.original.customer.first_name || 'Sin nombre'}
          </span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Status"/>
      ),
      cell: ({row}) => {
        const status = computeStatus(row.original);

        if (!status) {
          return null
        }

        return (
          <div className="flex w-[100px] items-center">
            {/*{status.icon && (*/}
            {/*  <status.icon className="mr-2 h-4 w-4 text-muted-foreground"/>*/}
            {/*)}*/}
            {/*<span>{status.label}</span>*/}
            <Badge variant="outline">{status.value}</Badge>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "price",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Price"/>
      ),
      cell: ({row}) => {
        return <div className="w-[150px]">{formatAmount(row.original.total, row.original.currency_code)}</div>
      }
    },
    {
      accessorKey: "priority",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Priority"/>
      ),
      cell: ({row}) => {
        const priority = priorities.find(
          (priority) => priority.value === row.getValue("priority")
        )

        if (!priority) {
          return null
        }

        return (
          <div className="flex items-center">
            {priority.icon && (
              <priority.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
            )}
            <span>{priority.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "Tiempo",
      header: ({column}) => (
        <DataTableColumnHeader column={column} title="Time"/>
      ),
      cell: ({row}) => {
        const date = new Date(row.original.created_at)
        return <div className="w-[150px]">{format(date, 'dd/MM/yyyy hh:mm:ss')}</div>
      },
    },
    {
      id: "details",
      cell: ({row}) =>
        <DetailDialog details={row.original}>
          <Button size="sm">
            Ver Detalles
          </Button>
        </DetailDialog>
    },
    {
      id: "defaultAction",
      cell: ({row}) =>
        action && <Button size="sm"
                className="ml-1 w-[80px]"
                onClick={() => action.onAction(row)}
        >{action.label}
        </Button>
    },
    {
      id: "actions",
      cell: ({row}) => <DataTableRowActions row={row} actions={orderActions}/>,
    },
  ];
};