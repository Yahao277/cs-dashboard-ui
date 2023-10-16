'use client';
import {CalendarDateRangePicker} from "@/components/molecules/date-range-picker";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {capitalize} from "@/lib/utils";
import OverviewExample from "@/components/templates/overview-example";
import TableExample from "@/components/templates/table-example";
import OrderTable from "@/components/templates/order-table";
import {OrderAction} from "@/lib/hooks/use-order-action/order-actions";

const tabs = [
  {
    value: "pendiente de pago"
  },
  {
    value: "pagado" // tambien en prerapacion
  },
  {
    value: "entregado"
  },
  {
    value: "cancelado"
  },
]

const DashboardHandlePage = () => {
  const title = "Cajero";

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{capitalize(title)}</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="pendiente de pago" className="space-y-4">
        <TabsList>
          {
            tabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>{capitalize(tab.value)}</TabsTrigger>
              )
            )
          }
        </TabsList>
        <TabsContent value="pendiente de pago" className="space-y-4">
          <OrderTable
            action={OrderAction.PAYMENT}
            query={{
            payment_status: ['awaiting'],
            offset: 0,
            limit: 100
          }}/>
        </TabsContent>
        <TabsContent value="pagado" className="space-y-4">
          <OrderTable
            action={OrderAction.READY}
            query={{
            fulfillment_status: ['fulfilled','not_fulfilled'],
            payment_status: ['captured'],
            offset: 0,
            limit: 100
          }}/>
        </TabsContent>
        <TabsContent value="entregado" className="space-y-4">
          <OrderTable
            action={OrderAction.DELIVERY}
            query={{
            fulfillment_status: ['shipped'],
            payment_status: ['captured'],
            offset: 0,
            limit: 100
          }}/>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default DashboardHandlePage