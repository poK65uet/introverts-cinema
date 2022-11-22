import * as React from 'react';
import Box from '@mui/material/Box';
import useStyles from './style';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button/Button';
import { IconButton, Typography } from '@mui/material';
import { Today } from '@mui/icons-material';

export default function CustomerManagementPage() {
  const [pageSize, setPageSize] = React.useState<number>(5);


  const classes = useStyles();


  function createData(
    id: number,
    customerFullname: string,
    customerEmail: string,
    customerBirthday: string,
  ) {
    return {
      id, customerFullname, customerEmail, customerBirthday,

    };
  }

  const rows = [
    createData(1, 'Nguyễn Văn A', 'a@gmail.com', '09/09/1999'),
    createData(2, 'Nguyễn Văn B', 'b@gmail.com', '09/09/1999'),
    createData(3, 'Nguyễn Văn C', 'c@gmail.com', '09/09/1999'),
    createData(4, 'Nguyễn Văn D', 'd@gmail.com', '09/09/1999'),
    createData(5, 'Nguyễn Văn E', 'e@gmail.com', '09/09/1999'),
    createData(6, 'Nguyễn Văn A', 'a@gmail.com', '09/09/1999'),
    createData(7, 'Nguyễn Văn B', 'b@gmail.com', '09/09/1999'),
    createData(8, 'Nguyễn Văn C', 'c@gmail.com', '09/09/1999'),
    createData(9, 'Nguyễn Văn D', 'd@gmail.com', '09/09/1999'),
    createData(10, 'Nguyễn Văn E', 'e@gmail.com', '09/09/1999'),
    createData(11, 'Nguyễn Văn E', 'e@gmail.com', '09/09/1999'),
  ];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 110,
    },
    {
      field: 'customerFullname',
      headerName: 'Họ tên',
      width: 300,
      editable: true,
    },
    {
      field: 'customerEmail',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'customerBirthday',
      headerName: 'Ngày sinh',
      type: 'date',
      width: 200,
      editable: true,
    },
    {
      field: 'customerOption',
      type: 'any',
      headerName: 'Tùy chọn',
      width: 200,
      renderCell: () => (
        <Box>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];



  return (
    <Box className={classes.customerTable}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
