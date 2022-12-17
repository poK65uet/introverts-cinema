import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetMessage } from 'queries/message';
import useStyles from './styles';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridToolbar,
} from '@mui/x-data-grid';
import { useGetShowtimes, useGetShowtimesQuery } from 'queries/showtimes';
import ShowtimeCustomToolbar from 'app/containers/ShowtimeCustomToolbar';
import { useGetAllMovies, useGetMovies } from 'queries/movies';
import { useGetAllRooms } from 'queries/rooms';
import AddShowtimeDialog from 'app/components/ShowtimeDialog/AddShowtimeDialog';
import { validateEmailThunk } from 'app/components/LoginDialog/Register/slice';

export default function ShowtimeManagementPage() {
  const classes = useStyles();
  const [pageState, setPageState] = useState({
    rows: [],
    count: 0,
    pageSize: 20,
    page: 1,
  });
  const [open, setOpen] = useState(false);
  const [roomQuery, setRoomQuery] = useState(0);
  const [movieQuery, setMovieQuery] = useState(0);

  const { data, isLoading } = useGetShowtimes(
    pageState.page,
    pageState.pageSize,
  );

  const { data: queryData, isLoading: isLoadingQueryData } =
    useGetShowtimesQuery(movieQuery, roomQuery);
  const movieData = useGetAllMovies();
  const roomData = useGetAllRooms();
  useEffect(() => {
    if (
      data !== undefined &&
      queryData === undefined &&
      movieQuery === 0 &&
      roomQuery === 0
    ) {
      setPageState({ ...pageState, count: data?.count, rows: data?.rows });
    }
    if (queryData !== undefined) {
      setPageState({
        ...pageState,
        rows: queryData.rows,
        count: queryData.count,
      });
    }
  }, [isLoading, isLoadingQueryData, data, queryData]);

  const handleClickOpenAddPage = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(data);
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
      renderCell: (params: GridRenderCellParams<string>) => {
        if (params.value === undefined) return null;
        const openingDay = new Date(params.value);
        return (
          openingDay.getHours() +
          ':' +
          openingDay.getMinutes() +
          ' ' +
          openingDay.getDate() +
          '/' +
          openingDay.getMonth() +
          '/' +
          openingDay.getFullYear()
        );
      },
    },
    {
      field: 'Room',
      headerName: 'Tên phòng chiếu',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.value === undefined) return null;
        return params.value.name;
      },
    },
    {
      field: 'Film',
      headerName: 'Tên phim',
      width: 280,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.value === undefined) return null;
        return params.value.title;
      },
    },
    // {
    //   field: 'Film2',
    //   headerName: 'Thời lượng',
    //   width: 100,
    //   headerAlign: 'center',
    //   valueGetter: ({ id }) => {
    //     const item = data.find((item: { id: GridRowId }) => item.id === id);
    //     return item.duration;
    //   },
    // },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 180,
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
      width: 180,
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
    <Box className={classes.showtimeTable}>
      <AddShowtimeDialog open={open} onClose={handleClose} />
      <Button className={classes.addButton} onClick={handleClickOpenAddPage}>
        Thêm suất chiếu mới
      </Button>
      <DataGrid
        autoHeight
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        loading={isLoading || isLoadingQueryData}
        onPageChange={newPage =>
          setPageState({ ...pageState, page: newPage + 1 })
        }
        onPageSizeChange={newPageSize =>
          setPageState({ ...pageState, pageSize: newPageSize })
        }
        rowsPerPageOptions={[10, 30, 50]}
        rowCount={pageState.count}
        rows={pageState.rows ? pageState.rows : []}
        disableSelectionOnClick
        columns={columns}
        components={{
          Toolbar: ShowtimeCustomToolbar,
        }}
        componentsProps={{
          toolbar: { setMovieQuery, setRoomQuery, movieData, roomData },
        }}
      />
    </Box>
  );
}
