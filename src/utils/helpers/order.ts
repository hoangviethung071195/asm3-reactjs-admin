import { OrderModel } from 'models/Order.model';

export function getVNDUnit(amount: number | string) {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(+amount);
}

export function getVNDTotalAmount(order: OrderModel) {
  return getVNDUnit(
    order?.products?.reduce(
      (a, b) => a + +b.product.price * b.quantity,
      0
    )
  );
}

export function getAllSalesVNDTotalAmount(orders: OrderModel[]) {
  return getVNDUnit(
    orders.map((order) => {
      return order.products?.reduce(
        (a, b) => a + +b.product.price * b.quantity,
        0
      );
    })?.reduce((a, b) => a + b, 0)
  );
}