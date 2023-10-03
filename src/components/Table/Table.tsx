import { MouseEvent, PropsWithChildren, useState } from 'react';

// material-ui
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

// third-party

// project import
import MainCard from 'components/Table/border/MainCard';
import { PagingData, pagingEvent } from 'models/Pagination.model';
import { HeadTableModel, Sort } from 'models/Table.model';
import { DataDisplayType } from 'utils/constant/dataDisplayType';
import { getFileUrl } from 'utils/helpers/file';
import { getCellData } from 'utils/helpers/table';
import TableHead from './head.tsx/TableHead';
import Pagination from 'components/pagination/Pagination';
import ImageLoader from 'components/image-loader/ImageLoader';

export default function CustomTable<T>(props: PropsWithChildren<{
  title?: string;
  columns: HeadTableModel<T>[];
  tableData: PagingData<T>;
  onPagingChange?: (e: pagingEvent) => void;
  onRequestSort?: (event: MouseEvent<HTMLSpanElement>, sort: Sort, sortBy: keyof T) => void;
  initialSortInfo?: {
    sort: Sort;
    sortBy: keyof T;
  };
}>) {
  const { title, columns, tableData, onPagingChange, onRequestSort, initialSortInfo } = props;
  const { list: rows, total } = tableData;
  // console.log('columns ', columns);
  // console.log('tableData ', tableData);

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Typography variant="h5">{title}</Typography>
      {/* <MainCard sx={{ mt: 2 }} content={false}> */}
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <TableHead columns={columns} onRequestSort={onRequestSort} initialSortInfo={initialSortInfo}></TableHead>
          <TableBody>
            {rows?.map((row, index) => {
              // const isItemSelected = isSelected(row.trackingNo);
              // const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row['_id']}
                >
                  {
                    columns.map((col, i) => {
                      let result = getCellData(row, col.fieldNames);

                      if (col.renderResult) {
                        result = col.renderResult(row);
                      }

                      let sx = {};
                      if (col.actionElements?.length) {
                        sx = { width: '100px' };
                      } else {
                        sx = { maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' };
                      }

                      return (
                        <TableCell key={i} align={col.align}
                          sx={sx}
                          title={result?.toString()}
                        >
                          {
                            !col.dataDisplayType
                            &&
                            result
                          }
                          {
                            col.dataDisplayType === DataDisplayType.ImageFileId
                            &&
                            <ImageLoader fileId={result.toString()} width={50} />
                          }
                          {
                            col.actionElements?.length &&
                            col.actionElements?.map(e => (
                              <Button key={e.label} variant="outlined" onClick={() => e.onclick(row)} sx={{ marginRight: '10px' }}>
                                {e.label}
                              </Button>
                            ))
                          }
                        </TableCell>
                      );
                    })
                  }
                  {/* <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.trackingNo}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="left">
                    <OrderStatus status={row.carbs} />
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

      </TableContainer>
      {/* </MainCard> */}
      {onPagingChange && <Pagination onPagingChange={onPagingChange} total={total}></Pagination>}
    </Grid>
  );
}
