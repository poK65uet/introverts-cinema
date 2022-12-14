import { useGetMessage } from 'queries/message';
import Box from '@mui/material/Box';
import useStyles from './styles';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Button, Chip, Typography } from '@mui/material';
import AddFilmDialog from '../../components/FilmDialog/AddFilmDialog';
import { useGetMovies } from 'queries/movies';
import EditFilmDialog from 'app/components/FilmDialog/EditFilmDialog';

export default function FilmManagementPage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowId, setEditRowId] = useState('0');
  const [count, setCount] = useState<number>(0);
  const [rows, setRows] = useState<readonly any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);

  const handleClickOpenAddPage = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditRowId('0');
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenEditPage = (params: any) => {
    setEditRowId(params.toString());
    setOpenEdit(true);
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
    while (run >= 0 && newRows[run].id > largestId) {
      run--;
    }
    if (run == newRows.length - 1) {
      return;
    }
    // console.log(newRows, run, newRows.slice(run - newRows.length + 1));
    setRows(rows.concat(newRows.slice(run - newRows.length + 1)));
    // console.log(rows);
  };

  const { isLoading, data } = useGetMovies(page, pageSize);
  // console.log(page, pageSize, data?.rows);

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
      width: 80,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'collumnHeader',
    },
    {
      field: 'title',
      headerName: 'Tên phim',
      width: 300,
      headerAlign: 'center',
    },
    {
      field: 'duration',
      headerName: 'Thời lượng',
      type: 'number',
      width: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        return params.value === 'active' ? (
          <Chip label="Đang chiếu" variant="outlined" color="success" />
        ) : (
          <Chip label="Ngừng chiếu" variant="outlined" color="error" />
        );
      },
    },
    {
      field: 'openingDay',
      headerName: 'Ngày khởi chiếu',
      width: 150,
      type: 'date',
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
      field: 'trailerUrl',
      headerName: 'Trailer',
      width: 90,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        return params.value && <a href={params.value}>Trailer</a>;
      },
    },
  ];

  return (
    <Box className={classes.filmTable}>
      <AddFilmDialog open={open} onClose={handleClose} />
      <EditFilmDialog
        data={editRowId}
        open={openEdit}
        onClose={handleCloseEdit}
      />
      <Button className={classes.addButton} onClick={handleClickOpenAddPage}>
        Thêm phim mới
      </Button>
      <DataGrid
        autoHeight
        page={page - 1}
        pageSize={pageSize}
        loading={isLoading}
        onPageChange={newPage => setPage(newPage + 1)}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[15, 30, 50]}
        rows={rows}
        rowCount={count}
        disableSelectionOnClick
        columns={columns}
        onRowDoubleClick={GridCellParams =>
          handleClickOpenEditPage(GridCellParams.id)
        }
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
