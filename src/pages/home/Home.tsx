import { Grid } from '@mui/material';
import CustomTable from 'components/Table/Table';
import AnalyticEcommerce from 'components/analyticEcommerce/AnalyticEcommerce';
import { PagingData } from 'models/Pagination.model';
import { Sort } from 'models/Table.model';
import { MouseEvent, PropsWithChildren, useEffect, useState } from "react";
import { useUpdateEffect } from 'react-use';
import { initialPagingData } from 'utils/constant/models/pagination';
import { orderColumns } from 'utils/constant/table/columns';
import { getAllSalesVNDTotalAmount } from 'utils/helpers/order';
import { OrderModel } from '../../models/Order.model';
import { UserModel } from '../../models/User.model';
import { getOrders } from '../../service/orders.service';
import { getUsers } from '../../service/users.service';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

function Home(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<PagingData<OrderModel>>(initialPagingData);
  const [users, setUsers] = useState<PagingData<UserModel>>(initialPagingData);
  const [sort, setSort] = useState<Sort>('desc');
  const [sortBy, setSortBy] = useState<keyof OrderModel>('createdAt');

  useEffect(() => {
    Promise.all([
      getOrders(),
      getUsers()
    ]).then(([oderRes, userRes]) => {
      setOrders(oderRes);
      setUsers(userRes);
      setLoading(false);
    });
  }, []);

  useUpdateEffect(() => {
    getOrders(undefined, undefined, sort, sortBy)
      .then(r => {
        setOrders(r);
        setLoading(false);
      });
  }, [sort, sortBy]);

  function requestSortHandler(event: MouseEvent<HTMLSpanElement>, sort: Sort, sortBy: keyof OrderModel) {
    setSort(sort);
    setSortBy(sortBy);
  }

  // console.log("orders ", orders);
  return (
    <LoadingOverlay loading={loading}>
      {/* <Grid item xs={12} sm={6} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid> */}
      <Grid item xs={12} lg={4}>
        <AnalyticEcommerce title="Total Users" count={(users.list.length).toString()} percentage={70.5} extra={users.list.length} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <AnalyticEcommerce title="Total Order" count={(orders.list.length).toString()} percentage={27.4} isLoss color="warning" extra={orders.list.length} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <AnalyticEcommerce
          title="Total Sales"
          count={getAllSalesVNDTotalAmount(orders.list)}
          percentage={27.4}
          isLoss color="warning"
          extra={getAllSalesVNDTotalAmount(orders.list)} />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <CustomTable columns={orderColumns} tableData={orders} title='Recent Orders' onRequestSort={requestSortHandler} initialSortInfo={{ sort, sortBy }} />
    </LoadingOverlay>
  );
}

export default Home;
