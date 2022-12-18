import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetMessage } from 'queries/message';
import useStyles from './styles';
import { Box, Grid, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import CustomToolbar from 'app/containers/CustomToolbar';
import { useGetTickets, useGetTicketsPagination } from 'queries/tickets';
import { useGetPrices } from 'queries/prices';

export default function TicketPriceManagementPage() {
  const classes = useStyles();
  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    count: 0,
    pageSize: 20,
    page: 0,
  });
  const [query, setQuery] = useState('');

  const { isLoading, data } = useGetPrices();

  console.log(data);

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
      field: 'dayCode',
      headerName: 'Thời gian',
      width: 170,
      headerAlign: 'center',
      // renderCell: (params: GridRenderCellParams<string>) => {
      //   if (params.value === undefined) return null;
      //   const openingDay = new Date(params.value);
      //   return openingDay;
      // },
    },
    {
      field: 'value',
      headerName: 'Giá tiền',
      width: 220,
      headerAlign: 'center',
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
        <Grid item={true} xs={12}>
          <Typography variant="h3">2D</Typography>
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
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: { setQuery },
            }}
          />
        </Grid>
        {/* <Grid item={true} xs={6}>
          <Typography variant="h3">3D</Typography>
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
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: { setQuery },
            }}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
}
