export interface OrderData {
  ItemsId: string;
  restaurantId: string;
  Table_no: string;
  total_amount: string;
  isOrderPlaced: boolean;
  status: string;
  quantity:string;
}

// export enum STATUS{
//   "not-placed",
//   "preparing",
//   "prepared",
//   "out-for-delivery",
//   "fulfilled"
// }