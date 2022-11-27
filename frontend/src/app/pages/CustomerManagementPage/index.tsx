import Box from '@mui/material/Box';
import useStyles from './style';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import Button from '@mui/material/Button/Button';
// import { IconButton, Typography } from '@mui/material';
// import { Today } from '@mui/icons-material';
import { usegetUsers } from '../../../queries/getUsers'
import { useState } from 'react';

export default function CustomerManagementPage() {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  
  // let rows = [];

  const updateRows = async () => {
    const {data} = await usegetUsers(page, pageSize);
    if(data !== undefined) 
      setRows(data.rows);
  }
  updateRows();

  const handlePageChange = async (newPage: number) => {
      setPage(newPage);
      updateRows();
  }
  
  const handlePageSizeChange = async (newPageSize: number) => {
    setPageSize(newPageSize);
    updateRows();
}

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
        onPageChange={(newPage) => handlePageChange(newPage)}
        onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        rows={rows}
        columns={columns} 
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
