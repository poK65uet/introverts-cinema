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
import { useGetPrices, useUpdatePrice } from 'queries/prices';
import { formatDate, formatHour } from 'utils/date';
import { notify } from 'app/components/MasterDialog';
import UpdatePriceDialog from 'app/components/UpdatePriceDialog';
import { SettingsPowerRounded } from '@mui/icons-material';

export default function TicketPriceManagementPage() {
  const classes = useStyles();
  const [rows2D, setRows2D] = useState<any[]>([]);
  const [rows3D, setRows3D] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState({ type: '2D', id: 0, value: 0 });
  const { isLoading, data } = useGetPrices();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (visionType: any, params: any) => {
    setEditRow({ type: visionType, id: params.id, value: params.value });
    setOpen(true);
  };
  useEffect(() => {
    let tmpRows2D = [];
    let tmpRows3D = [];
    if (data !== undefined) {
      for (const e of data) {
        if (e.visionType === 2) {
          tmpRows2D.push(e);
        } else {
          tmpRows3D.push(e);
        }
      }
      setRows2D(tmpRows2D);
      setRows3D(tmpRows3D);
    }
  }, [data]);

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
    },
    {
      field: 'value',
      headerName: 'Giá tiền',
      width: 220,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      renderCell: (params: GridRenderCellParams<string>) => {
        if (params.value === undefined) return null;
        const openingDay = params.value.toLocaleString() + ' VNĐ';
        return openingDay;
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
        const openingDay = formatDate(new Date(params.value));
        return openingDay;
      },
    },
  ];

  return (
    <Box className={classes.roomTable}>
      <UpdatePriceDialog open={open} onClose={handleClose} data={editRow} />

      <Grid item={true} xs={12} container spacing={2}>
        <Grid item={true} xs={6}>
          <Typography variant="h3">2D</Typography>
          <DataGrid
            autoHeight
            loading={isLoading}
            rowsPerPageOptions={[10, 30, 50]}
            rowCount={rows2D.length}
            rows={rows2D}
            disableSelectionOnClick
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: { setQuery },
            }}
            onRowDoubleClick={params => handleOpen('2D', params)}
          />
        </Grid>
        <Grid item={true} xs={6}>
          <Typography variant="h3">3D</Typography>
          <DataGrid
            autoHeight
            loading={isLoading}
            rowsPerPageOptions={[10, 30, 50]}
            rowCount={rows3D.length}
            rows={rows3D}
            disableSelectionOnClick
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: { setQuery },
            }}
            onRowDoubleClick={params => handleOpen('3D', params)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
