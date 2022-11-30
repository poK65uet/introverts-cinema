import { useGetMessage } from 'queries/message';
import Box from '@mui/material/Box';
import useStyles from './style';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { IconButton, Typography } from '@mui/material';
import { useState, useEffect, Component, useLayoutEffect } from 'react';

export default function FilmManagementPage() {
  const classes = useStyles();

  const rows: readonly any[] = [];

  
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number', 
      width: 70,
    },
    {
      field: 'title',
      headerName: 'Tên phim',
      width: 200,
    },
    {
      field: 'image_url',
      headerName: 'Poster',
      width: 200,
    },
    {
      field: 'duration',
      headerName: 'Thời hạn',
      type: 'int',
      width: 150,
    },
    {
      field: 'opening_day',
      headerName: 'Ngày khởi chiếu',
      type: 'date',
      width: 200,
    },
    {
      field: 'nationality_id',
      headerName: 'Ngày khởi chiếu',
      type: 'int',
      width: 200,
    },
  ];

  return (
    <Box className={classes.filmTable}>
    <DataGrid
      // page={page}
      // pageSize={pageSize}
      // loading={isLoading ? true : false}
      // onPageChange={async (newPage) => await updatePage(newPage)}
      // onPageSizeChange={async (newPageSize) => await updatePageSize(newPageSize)}
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
