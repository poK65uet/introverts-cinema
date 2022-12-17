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
import { useGetTickets, useGetTicketsPagination } from 'queries/tickets';
import { formatDate, formatHour } from 'utils/date';

export default function BookedTicketManagementPage() {
  const classes = useStyles();
  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    count: 0,
    pageSize: 20,
    page: 0,
  });

  const { data, isLoading } = useGetTickets();

  console.log(data);

  useEffect(() => {
    if (data !== undefined) {
      setPageState({
        ...pageState,
        count: data?.count,
        rows: data?.rows.map((row: any, index: any) => {
          return {
            id: row.id,
            filmTitle: row.Film?.title,
            startDateTime: formatDate(new Date(row.startTime)),
            startHourTime: formatHour(new Date(row.startTime)),
            roomName: row.room,
            setCode: row.seatCode,
            price: row.price.toLocaleString() + ' VNĐ',
            createAt:
              formatHour(new Date(row.createAt)) +
              ' ' +
              formatDate(new Date(row.createAt)),
          };
        }),
      });
    }
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã vé',
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'filmTitle',
      headerName: 'Tên phim',
      width: 280,
      headerAlign: 'center',
    },
    {
      field: 'roomName',
      headerName: 'Tên phòng chiếu',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'startHourTime',
      headerName: 'Giờ chiếu',
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'startDateTime',
      headerName: 'Ngày chiếu',
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'filmDuration',
      headerName: 'Thời lượng',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 180,
      align: 'center',
      headerAlign: 'center',
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
      />
    </Box>
  );
}
