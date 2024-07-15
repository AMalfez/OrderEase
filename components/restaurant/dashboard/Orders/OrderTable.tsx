import { Payment, columns } from "./Columns"
import { DataTable } from "./DataTable"
export const OrderTable = () => {
    const data:Payment[] = [{
        id: "728ed52f",
        amount: 100,
        status: "unpaid",
        email: "m@example.com",
        name: "Alfez",
        table_no: 2,
        bill: "sent",
        order_status: "fulfilled"
      },
      {
        id: "721ed52f",
        amount: 10,
        status: "paid",
        email: "a@example.com",
        name: "sappu",
        table_no: 3,
        bill: "not-sent",
        order_status: "not-fulfilled"
      }]
  return (
  <div>
    <DataTable columns={columns} data={data} />
  </div>
);
};
