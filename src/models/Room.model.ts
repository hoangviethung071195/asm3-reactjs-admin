export interface RoomModel {
  _id?: string;
  customerId: string;
  message: {
    isCustomer: boolean;
    content: string;
    createdAt: string;
  }[];
}