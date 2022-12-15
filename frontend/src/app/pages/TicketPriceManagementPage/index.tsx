import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetMessage } from 'queries/message';
import useStyles from './styles';
import { Box, Grid } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';

export default function TicketPriceManagementPage() {
  const classes = useStyles();
  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    count: 0,
    pageSize: 20,
    page: 0,
  });

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '#',
      type: 'number',
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'room',
      headerName: 'Tên phòng',
      width: 220,
      headerAlign: 'center',
    },
    {
      field: 'seatRow',
      headerName: 'Số thứ tự hàng',
      width: 220,
      headerAlign: 'center',
    },
    {
      field: 'seatCollumn',
      headerName: 'Số thứ tự cột',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'price',
      headerName: 'Giá vé',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        if (params.value === undefined) return null;
        const openingDay = new Date(params.value);
        return (
          openingDay.getDate() +
          '/' +
          openingDay.getMonth() +
          '/' +
          openingDay.getFullYear()
        );
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      type: 'date',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        if (params.value === undefined) return null;
        const openingDay = new Date(params.value);
        return (
          openingDay.getDate() +
          '/' +
          openingDay.getMonth() +
          '/' +
          openingDay.getFullYear()
        );
      },
    },
  ];

  return (
    <Box className={classes.roomTable}>
      <Grid item={true} xs={12} container spacing={2}>
        <Grid item={true} xs={6}>
          <DataGrid
            autoHeight
            page={pageState.page}
            pageSize={pageState.pageSize}
            loading={pageState.isLoading}
            onPageChange={newPage =>
              setPageState({ ...pageState, page: newPage })
            }
            onPageSizeChange={newPageSize =>
              setPageState({ ...pageState, pageSize: newPageSize })
            }
            rowsPerPageOptions={[10, 30, 50]}
            rowCount={pageState.count}
            rows={pageState.rows}
            disableSelectionOnClick
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Grid>
        <Grid item={true} xs={6}>
          <DataGrid
            autoHeight
            page={pageState.page}
            pageSize={pageState.pageSize}
            loading={pageState.isLoading}
            onPageChange={newPage =>
              setPageState({ ...pageState, page: newPage })
            }
            onPageSizeChange={newPageSize =>
              setPageState({ ...pageState, pageSize: newPageSize })
            }
            rowsPerPageOptions={[10, 30, 50]}
            rowCount={pageState.count}
            rows={pageState.rows}
            disableSelectionOnClick
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
