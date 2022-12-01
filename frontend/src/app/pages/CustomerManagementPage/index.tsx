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
  const [count, setCount] = useState<number>(0);
  const [rows, setRows] = useState<readonly any[]>([]);
  
  const updatePage = async (newPage: number) => {
    setPage(newPage);
  }

  const updatePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
  }

  const updateRows = (newRows: readonly any[]) => {
    // setRows(rows.concat(newRows));
    if(rows.length === 0) {
      setRows(newRows);
      return;
    }
    let run = newRows.length - 1;
    let largestId = rows.slice(-1)[0].id;
    while(run > 0 && newRows[run].id > largestId) {
      run--;
    }
    if(run == newRows.length - 1) {
      return; 
    }
    setRows(rows.concat(newRows.slice(run-newRows.length)));
    
  }
  
  const {data, isLoading} = useGetUsers(page, pageSize);
  

  useEffect(() => {
    if(data !== undefined) {
      setCount(data.count);
      updateRows(data.rows);
      console.log(rows);
      console.log(data.rows);
    }
  }, [isLoading]);

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
      loading={isLoading ? true : false}
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
