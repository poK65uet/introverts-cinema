import Box from '@mui/material/Box';
import useStyles from './style';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { IconButton, Typography } from '@mui/material';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUsers } from '../../../queries/getUsers'
import { useState, useEffect, Component, useLayoutEffect } from 'react';
import { UseQueryResult } from 'react-query';
import { resolve } from 'path';
import { ArrowRightAlt } from '@mui/icons-material';

export default function CustomerManagementPage(){
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  // const store = useSelector<RootState
  const [count, setCount] = useState<number>(0);
  const [rows, setRows] = useState<readonly any[]>([]);
  // let rows: readonly any[] = [];

  // console.log(page, pageSize);
  
  const updatePage = async (newPage: number) => {
    // const {data} = 
    // console.log(data);
    
    setPage(newPage);
    await refetch();
  }

  const updatePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
  }
  
  const asdf = useGetUsers(page, pageSize);
  // console.log(asdf);
  
  const {data, isLoading, refetch} = useGetUsers(page, pageSize);

  useEffect(() => {
    // console.log(data);
    console.log(isLoading);
    
    if(data !== undefined) {
      setCount(data.count);
      setRows(data.rows);
    }
  }, [isLoading, page]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number', 
      width: 70,
    },
    {
      field: 'fullName',
      headerName: 'Họ tên',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'birthDay',
      headerName: 'Ngày sinh',
      type: 'date',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 150,
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      type: 'date',
      width: 200,
    },
  ];
  return (
    <Box className={classes.customerTable}>
    <DataGrid
      page={page}
      pageSize={pageSize}
      // loading={isLoading ? true : false}
      onPageChange={(newPage) => updatePage(newPage)}
      onPageSizeChange={(newPageSize) => updatePageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
      rowCount={count}
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
