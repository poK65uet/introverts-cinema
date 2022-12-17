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
import { useGetShowtimes, useGetShowtimesQuery } from 'queries/showtimes';
import ShowtimeCustomToolbar from 'app/containers/ShowtimeCustomToolbar';
import { useGetAllMovies, useGetMovies } from 'queries/movies';
import { useGetAllRooms } from 'queries/rooms';

export default function ShowtimeManagementPage() {
  const classes = useStyles();
  const [pageState, setPageState] = useState({
    rows: [],
    count: 0,
    pageSize: 20,
    page: 1,
  });
  const [roomQuery, setRoomQuery] = useState(0);
  const [movieQuery, setMovieQuery] = useState(0);

  const { data, isLoading } = useGetShowtimes(
    pageState.page,
    pageState.pageSize,
  );

  const { data: queryData, isLoading: isLoadingQueryData } =
    useGetShowtimesQuery(movieQuery, roomQuery);
  console.log(roomQuery, movieQuery, queryData);
  const movieData = useGetAllMovies();
  const roomData = useGetAllRooms();
  useEffect(() => {
    if (data !== undefined && queryData === undefined) {
      setPageState({ ...pageState, count: data?.count, rows: data?.rows });
    }
    if (queryData !== undefined) {
      setPageState({
        ...pageState,
        rows: queryData.rows,
        count: queryData.count,
      });
    }
  }, [isLoading, isLoadingQueryData]);

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
      field: 'Room.name',
      headerName: 'Tên phòng chiếu',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'Film.title',
      headerName: 'Tên phim',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
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
    <Box className={classes.roomTable}>
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
