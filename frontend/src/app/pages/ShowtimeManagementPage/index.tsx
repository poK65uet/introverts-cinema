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
import { formatDate, formatHour } from 'utils/date';

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
      setPageState({
        ...pageState,
        count: data?.count,
        rows: data?.rows.map((row: any, index: any) => {
          return {
            id: row.id,
            startDateTime: formatDate(new Date(row.startTime)),
            startHourTime: formatHour(new Date(row.startTime)),
            roomName: row.Room?.name,
            filmTitle: row.Film?.title,
            filmDuration: row.Film?.duration + ' phút',
            createdAt:
              formatHour(new Date(row.createdAt)) +
              ' ' +
              formatDate(new Date(row.createdAt)),
          };
        }),
      });
    }
    if (queryData !== undefined) {
      setPageState({
        ...pageState,
        count: queryData.count,
        rows: queryData.rows.map((row: any, index: any) => {
          return {
            id: row.id,
            startDateTime: formatDate(new Date(row.startTime)),
            startHourTime: formatHour(new Date(row.startTime)),
            roomName: row.Room?.name,
            filmTitle: row.Film?.title,
            filmDuration: row.Film?.duration + ' phút',
            createdAt:
              formatHour(new Date(row.createdAt)) +
              ' ' +
              formatDate(new Date(row.createdAt)),
          };
        }),
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
