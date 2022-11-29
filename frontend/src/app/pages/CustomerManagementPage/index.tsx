import Box from '@mui/material/Box';
import useStyles from './style';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Button from '@mui/material/Button/Button';
// import { IconButton, Typography } from '@mui/material';
// import { Today } from '@mui/icons-material';
import { useGetUsers } from '../../../queries/getUsers'
import { useState, useEffect } from 'react';
import { UseQueryResult } from 'react-query';

export default function CustomerManagementPage() {
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const classes = useStyles();
  const [data, setData] = useState({count : 0, rows: []});
  const {newData : UseQueryResult<any,any>} = useGetUsers(page, pageSize);

  const updateDataLiterally = (newData: any) => {
    setData(newData);
  }

  useEffect(() => {
    updateDataLiterally(newData.data);
  }, [newData])

  const updatePage = async (newPage: number) => {
    await setPage(newPage);
  }

  const updatePageSize = async (newPageSize: number) => {
    await setPageSize(newPageSize);
  }

  // const updateLoading = async (status: boolean) => {
  //   await setIsLoading(status);
  // }

  // const updateData = async () => {
  //   newData = await useGetUsers(page, pageSize);
  //   if(newData.isSuccess) {
  //     updateDataLiterally(newData.data);
  //   }
  // }
  // updateData();

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
        loading={isLoading}
        onPageChange={(newPage) => {
          updatePage(newPage); 
        }}
        onPageSizeChange={(newPageSize) => {
          updatePageSize(newPageSize); 
        }}
        rowsPerPageOptions={[5, 10, 20]}
        rowCount={data.count}
        rows={data.rows} 
        disableSelectionOnClick
        columns={columns} 
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
