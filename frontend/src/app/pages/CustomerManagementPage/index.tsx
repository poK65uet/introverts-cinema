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
import { useState, useEffect } from 'react';
import { UseQueryResult } from 'react-query';

export default function CustomerManagementPage() {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const store = useSelector<RootState, RootState>(state => state)
  
  const updateIsLoading = (status: boolean) => {
    setIsLoading(status);
  }
  const updatePage = (newPage: number) => {
    setPage(newPage);
  }

  const updatePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
  }



  useEffect(() => {
    const {data: data} = useGetUsers(page, pageSize);
  }, [page, pageSize])

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
    // {
    //   field: 'customerOption',
    //   type: 'any',
    //   headerName: 'Tùy chọn',
    //   width: 200,
    //   renderCell: () => (
    //     <Box>
    //       <IconButton aria-label="edit">
    //         <EditIcon />
    //       </IconButton>
    //       <IconButton aria-label="delete">
    //         <DeleteIcon />
    //       </IconButton>
    //     </Box>
    //   ),
    // },
  ];

  return (
    <Box className={classes.customerTable}>
      <DataGrid
        page={page}
        pageSize={pageSize}
        loading={data === undefined ? true : false}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        rowCount={data === undefined ? data.data.count : 0}
        rows={data === undefined ? data.data.rows : []} 
        disableSelectionOnClick
        columns={columns} 
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
