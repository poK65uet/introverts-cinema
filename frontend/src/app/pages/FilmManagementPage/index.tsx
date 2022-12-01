import { useGetMessage } from 'queries/message';
import Box from '@mui/material/Box';
import useStyles from './style';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { IconButton, Typography } from '@mui/material';
import { useState, useEffect, Component, useLayoutEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getValue } from '@mui/system';

export default function FilmManagementPage() {
  const classes = useStyles();

  const rows: readonly any[] = [
    {
      id: 1,
      image_url: 'https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg',
      title: 'Mắt biếc',
      duration: 150,
      nationality_id: 1,
      trailer_url: 'https://www.youtube.com/watch?v=xuakxSnFUxc',
    },
    {
      id: 2,
      image_url: 'https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg',
      title: 'Mắt biếc 2',
      duration: 150,
      nationality_id: 1,
      trailer_url: 'https://www.youtube.com/watch?v=xuakxSnFUxc',
    },
    {
      id: 3,
      image_url: 'https://innovavietnam.vn/wp-content/uploads/poster-561x800.jpg',
      title: 'Mắt biếc 3',
      duration: 150,
      nationality_id: 1,
      trailer_url: 'https://www.youtube.com/watch?v=xuakxSnFUxc',
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'image_url',
      headerName: 'Poster',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'collumnHeader',
      renderCell: (params: GridRenderCellParams<string>) => {
        return (
          <a href={params.value}>Poster</a>
        );
      },
    },
    {
      field: 'title',
      headerName: 'Tên phim',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'duration',
      headerName: 'Thời lượng',
      type: 'int',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'opening_day',
      headerName: 'Ngày khởi chiếu',
      type: 'date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'directors',
      headerName: 'Đạo diễn',
      type: 'array',
      width: 150,
      headerAlign: 'center',
    },
    {
      field: 'actors',
      headerName: 'Diễn viên',
      type: 'array',
      width: 240,
      headerAlign: 'center',
    },
    {
      field: 'nationality_id',
      headerName: 'Mã quốc gia',
      type: 'int',
      width: 140,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'trailer_url',
      headerName: 'Trailer',
      width: 90,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        return (
          <a href={params.value}>Trailer</a>
        );
      },
    },
  ];

  return (
    <Box className={classes.filmTable}>
      <Typography variant="h4" component="h4">
        Quản lý phim trong hệ thống
      </Typography>
      <Button className={classes.addButton}>Thêm phim mới</Button>
      <DataGrid
        rowsPerPageOptions={[5, 10, 20]}
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
