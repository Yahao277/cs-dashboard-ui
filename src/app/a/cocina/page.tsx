'use client';
import {CalendarDateRangePicker} from "@/components/molecules/date-range-picker";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {capitalize} from "@/lib/utils";
import OrderTable from "@/components/templates/order-table";
import {OrderAction} from "@/lib/hooks/use-order-action/order-actions";
import {RefreshCw} from "lucide-react";

const tabs = [
  {
    value: "para preparar"
  },
  {
    value: "preparando"
  },
  {
    value: "listo"
  },
  {
    value: "cancelado"
  },
]

const DashboardHandlePage = () => {
  const title = "Cocina";

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{capitalize(title)}</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button><RefreshCw /></Button>
        </div>
      </div>
      <Tabs defaultValue="para preparar" className="space-y-4">
        <TabsList>
          {
            tabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>{capitalize(tab.value)}</TabsTrigger>
              )
            )
          }
        </TabsList>
        <TabsContent value="para preparar" className="space-y-4">
          <OrderTable
            action={OrderAction.PREPARE}
            query={{
            fulfillment_status: ['not_fulfilled'],
            payment_status: ['captured'],
            offset: 0,
            limit: 100
          }}/>
        </TabsContent>
        <TabsContent value="preparando" className="space-y-4">
          <OrderTable
            action={OrderAction.READY}
            query={{
            fulfillment_status: ['fulfilled'],
            payment_status: ['captured'],
            offset: 0,
            limit: 100
          }}/>
        </TabsContent>
        <TabsContent value="listo" className="space-y-4">
          <OrderTable
            action={OrderAction.DELIVERY}
            query={{
            fulfillment_status: ['shipped'],
            payment_status: ['captured'],
            offset: 0,
            limit: 100
          }}/>
        </TabsContent>
        <TabsContent value="cancelado" className="space-y-4">
          <OrderTable />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default DashboardHandlePage