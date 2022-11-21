import * as React from 'react';
import Box from '@mui/material/Box';
import useStyles from './style';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button/Button';
import { IconButton } from '@mui/material';

export default function CustomerManagementPage() {


  const classes = useStyles();

  interface editButton {
    customerId: number
    icon: any
  }

  function createData(
    id: number,
    customerFullname: string,
    customerEmail: string,
    customerBirthday: Date,
    customerStatus: any,
    customerOption: any,
  ) {
    return { id, customerFullname, customerEmail, customerBirthday, customerStatus, customerOption };
  }
  
  const rows = [
    createData(1, 'Nguyễn Văn A', 'a@gmail.com', new Date("09/09/1999"), null, null),
    createData(2, 'Nguyễn Văn B', 'b@gmail.com', new Date("09/09/1999"), null, null),
    createData(3, 'Nguyễn Văn C', 'c@gmail.com', new Date("09/09/1999"), null, null),
    createData(4, 'Nguyễn Văn D', 'd@gmail.com', new Date("09/09/1999"), null, null),
    createData(5, 'Nguyễn Văn E', 'e@gmail.com', new Date("09/09/1999"), null, null),
    createData(6, 'Nguyễn Văn A', 'a@gmail.com', new Date("09/09/1999"), null, null),
    createData(7, 'Nguyễn Văn B', 'b@gmail.com', new Date("09/09/1999"), null, null),
    createData(8, 'Nguyễn Văn C', 'c@gmail.com', new Date("09/09/1999"), null, null),
    createData(9, 'Nguyễn Văn D', 'd@gmail.com', new Date("09/09/1999"), null, null),
    createData(10, 'Nguyễn Văn E', 'e@gmail.com', new Date("09/09/1999"), null, null),
    createData(11, 'Nguyễn Văn E', 'e@gmail.com', new Date("09/09/1999"), null, null),
  ];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 90,
    },
    {
      field: 'customerFullname',
      headerName: 'Họ tên',
      width: 220,
      editable: true,
    },
    {
      field: 'customerEmail',
      headerName: 'Email',
      width: 220,
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
      field: 'customerStatus',
      headerName: 'Trạng thái',
      type: 'any',
      width: 160,
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
    // <h2>Trang quản lý khách hàng </h2>
    <Box className={classes.customerTable}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
