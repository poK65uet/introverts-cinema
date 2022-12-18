import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetMessage } from 'queries/message';
import useStyles from './styles';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { useGetRooms } from 'queries/rooms';
import { formatDate } from 'utils/date';
import AddRoomDialog from 'app/components/RoomDialog/AddRoomDialog';

export default function RoomManagementPage() {
  const classes = useStyles();
  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    count: 0,
    pageSize: 20,
    page: 1,
  });
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetRooms(pageState.page, pageState.pageSize);
  console.log(data);
  useEffect(() => {
    if (data !== undefined) {
      setPageState({ ...pageState, count: data.count, rows: data.rows });
    }
  }, [isLoading]);

  const handleClickOpenAddPage = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      field: 'name',
      headerName: 'Tên phòng',
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'visionType',
      headerName: 'Loại phòng',
      width: 220,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'colNumber',
      headerName: 'Số cột',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'rowNumber',
      headerName: 'Số hàng',
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
        const openingDay = formatDate(new Date(params.value));
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
      <AddRoomDialog open={open} onClose={handleClose} />
      <Button className={classes.addButton} onClick={handleClickOpenAddPage}>
        Thêm phòng chiếu mới
      </Button>
      <DataGrid
        autoHeight
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        loading={pageState.isLoading}
        onPageChange={newPage =>
          setPageState({ ...pageState, page: newPage + 1 })
        }
        onPageSizeChange={newPageSize =>
          setPageState({ ...pageState, pageSize: newPageSize })
        }
        rowsPerPageOptions={[10, 30, 50]}
        rowCount={pageState.count}
        rows={pageState?.rows}
        disableSelectionOnClick
        columns={columns}
      />
    </Box>
  );
}
