import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetMessage } from 'queries/message';
import useStyles from './styles';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { useGetShowtimes } from 'queries/showtimes';

export default function ShowtimeManagementPage() {
  const classes = useStyles();
  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    count: 0,
    pageSize: 20,
    page: 0,
  });

  const { data, isLoading } = useGetShowtimes(
    pageState.page,
    pageState.pageSize,
  );
  console.log(data);
  useEffect(() => {
    if (data !== undefined) {
      setPageState({ ...pageState, count: data.count, rows: data.rows });
    }
  }, [isLoading]);

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
      field: 'startTime',
      headerName: 'Giờ chiếu',
      width: 220,
      headerAlign: 'center',
      align: 'center',
      // renderCell: (params: GridRenderCellParams<string>) => {
      //   if (params.value === undefined) return null;
      //   const openingDay = new Date(params.value);
      //   return (
      //     openingDay.getHours() +
      //     ':' +
      //     openingDay.getMinutes() +
      //     ' ' +
      //     openingDay.getDate() +
      //     '/' +
      //     openingDay.getMonth() +
      //     '/' +
      //     openingDay.getFullYear()
      //   );
      // },
    },
    {
      field: 'roomId',
      headerName: 'Mã phòng chiếu',
      width: 220,
      headerAlign: 'center',
    },
    {
      field: 'filmId',
      headerName: 'Mã số phim',
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
      <DataGrid
        autoHeight
        page={pageState.page}
        pageSize={pageState.pageSize}
        loading={pageState.isLoading}
        onPageChange={newPage => setPageState({ ...pageState, page: newPage })}
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
    </Box>
  );
}
