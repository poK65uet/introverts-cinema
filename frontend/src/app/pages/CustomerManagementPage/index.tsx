import Box from '@mui/material/Box';
import useStyles from './styles';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { IconButton, Typography } from '@mui/material';
import { useGetUsers } from '../../../queries/user';
import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

export default function CustomerManagementPage() {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [rows, setRows] = useState<readonly any[]>([]);

  const updatePage = async (newPage: number) => {
    setPage(newPage);
  };

  const updatePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const updateRows = (newRows: readonly any[]) => {
    if (rows.length === 0) {
      setRows(newRows);
      return;
    }
    if (rows.length === count) {
      return;
    }
    let run = newRows.length - 1;
    let largestId = rows.slice(-1)[0].id;
    while (run > 0 && newRows[run].id > largestId) {
      run--;
    }
    if (run == newRows.length - 1) {
      return;
    }
    setRows(rows.concat(newRows.slice(run - newRows.length)));
  };

  const { data, isLoading } = useGetUsers(page, pageSize);
  console.log(page);
  console.log(data);

  useEffect(() => {
    if (data !== undefined) {
      setCount(data.count);
      updateRows(data.rows);
    }
  }, [isLoading]);

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
      field: 'fullName',
      headerName: 'Họ tên',
      width: 220,
      headerAlign: 'center',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      headerAlign: 'center',
    },
    {
      field: 'birthDay',
      headerName: 'Ngày sinh',
      type: 'date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        if (params.value === undefined) return null;
        const openingDay = new Date(params.value);
        return (
          openingDay.getDate() +
          '/' +
          openingDay.getMonth() +
          '/' +
          openingDay.getFullYear()
        );
      },
      
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        if (params.value === undefined) return null;
        const openingDay = new Date(params.value);
        return (
          openingDay.getDate() +
          '/' +
          openingDay.getMonth() +
          '/' +
          openingDay.getFullYear()
        );
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      type: 'date',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        if (params.value === undefined) return null;
        const openingDay = new Date(params.value);
        return (
          openingDay.getDate() +
          '/' +
          openingDay.getMonth() +
          '/' +
          openingDay.getFullYear()
        );
      },
    },
  ];
  return (
    <Box className={classes.customerTable}>
      <DataGrid
        autoHeight
        page={page}
        pageSize={pageSize}
        loading={isLoading}
        onPageChange={newPage => updatePage(newPage)}
        onPageSizeChange={newPageSize => updatePageSize(newPageSize)}
        rowsPerPageOptions={[10, 30, 50]}
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
