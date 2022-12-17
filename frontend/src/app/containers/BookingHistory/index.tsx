import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, gridClasses } from '@mui/x-data-grid';
import useStyles from './styles';
import { useGetUserTickets } from 'queries/tickets';
import { formatDate, formatHour } from 'utils/date';
import { fullDigit } from 'utils/number';
import { useDispatch } from 'react-redux';
import { loadingActions } from '../../components/LoadingLayer/slice';

export default function BookingHistory() {

  const [rows, setRows] = useState<readonly any[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'MÃ VÉ',
      width: 105,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'movieName',
      headerName: 'TÊN PHIM',
      width: 250,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'date',
      headerName: 'NGÀY CHIẾU',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'time',
      headerName: 'GIỜ CHIẾU',
      width: 110,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'room',
      headerName: 'PHÒNG CHIẾU',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'seat',
      headerName: 'GHẾ',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'price',
      headerName: 'GIÁ',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'createdAt',
      headerName: 'ĐẶT LÚC',
      width: 175,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'status',
      headerName: 'TRẠNG THÁI',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (param: GridRenderCellParams<string>) => {
        return (
          <div className={param.value == 'active' ? classes.successText : classes.errorText}>
            {
              param.value == 'active' ? 'Còn hiệu lực' : 'Hết hiệu lực'
            }
          </div>
        );
      },
    },
  ];

  const noGrowContent =
    <Stack height="100%" alignItems="center" justifyContent="center" fontSize='1.375em'>
      Không tìm thấy vé
    </Stack>

  const {
    data: ticketsData,
    refetch: getTickets,
    isLoading: gettingTickets
  } = useGetUserTickets()

  useEffect(() => {
    if (!ticketsData) {
      getTickets()
    } else {
      setRows(ticketsData.map((ticket: any, index: number) => {
        return {
          id: 'TK' + fullDigit(ticket.id, 6),
          movieName: ticket.Film.title,
          date: formatDate(new Date(ticket.time)),
          time: formatHour(new Date(ticket.time)),
          room: ticket.room,
          seat: ticket.seatCode,
          price: ticket.price.toLocaleString() + ' VNĐ',
          createdAt: formatHour(new Date(ticket.createdAt)) + ' ' + formatDate(new Date(ticket.createdAt)),
          status: ticket.status
        }
      }))
    }
  }, [ticketsData])

  const dispatch = useDispatch()

  useEffect(() => {
    if (gettingTickets) {
      dispatch(loadingActions.load())
    } else {
      dispatch(loadingActions.finish())
    }
  }, [gettingTickets])

  const classes = useStyles()

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <DataGrid
        className={classes.grid}
        autoHeight={true}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        disableColumnMenu
        hideFooter
        getRowClassName={(params) => params.row.status != 'active' ? classes.inactiveRow : ''}
        components={{
          NoRowsOverlay: () => (
            noGrowContent
          ),
        }}
      />
    </div>
  )
}
