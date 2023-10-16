'use client'

import {CalendarDateRangePicker} from "@/components/molecules/date-range-picker";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {capitalize} from "@/lib/utils";
import {useAdminOrders} from "medusa-react";
import OverviewExample from "@/components/templates/overview-example";
import {Order} from "@medusajs/medusa";
import OrderRow from "@/app/a/orders/_order-row";


const DashboardHandlePage = () => {
  const title = "Orders";

  const { orders, isLoading,  refetch} = useAdminOrders({ offset:0, limit: 10});

  const handleAction = (order: Order) => {
    console.log('onActionResponse', order);
    refetch().then((r) => console.log('refetched', r));
    //setParams({payment_status: asList(order.payment_status), fulfillment_status: asList(order.fulfillment_status), status: asList(order.status)});
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{capitalize(title)}</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewExample />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <table>
            <thead>
            <tr>
              <th>Order ID</th>
              <th>CustomerName</th>
              <th>PaymentStatus</th>
              <th>FulfillmentStatus</th>
              <th>Status</th>
              <th>ComputedStatus</th>
            </tr>
            </thead>
            <tbody>
            {orders && orders.map((order, index) => (
              <OrderRow key={index} order={order} onActionResponse={() => handleAction(order)}/>
            ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default DashboardHandlePage