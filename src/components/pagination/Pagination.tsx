import TablePaginationMui from '@mui/material/TablePagination';
import { PropsWithChildren, useState } from 'react';
import s from './pagination.module.scss';
import { pagingEvent } from 'models/Pagination.model';

export default function Pagination(props: PropsWithChildren<{
  total: number;
  onPagingChange: (e: pagingEvent) => void;
}>) {
  const { total, onPagingChange } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPagingChange({ page: newPage + 1, limit: rowsPerPage });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const limit = +event.target.value;
    onPagingChange({ page: page + 1, limit });
    setRowsPerPage(limit);
    setPage(0);
  };
  console.log('page', page + 1);
  console.log('rowsPerPage', rowsPerPage);
  console.log('total', total);

  return (
    <TablePaginationMui
      className={s['table-pagination']}
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}