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
import { useGetMovies, useSearchMovies } from 'queries/movies';
import EditFilmDialog from 'app/components/FilmDialog/EditFilmDialog';
import CustomToolbar from 'app/containers/CustomToolbar';
import { formatDate } from 'utils/date';

export default function FilmManagementPage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowId, setEditRowId] = useState('0');
  const [count, setCount] = useState<number>(0);
  const [rows, setRows] = useState<readonly any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [query, setQuery] = useState('');

  const handleClickOpenAddPage = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditRowId('0');
    refetch();
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    // refetch();
    remove();
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
    while (run >= 0 && newRows[run].id != largestId) {
      run--;
    }
    if (run == newRows.length - 1) {
      return;
    }
    setRows(rows.concat(newRows.slice(run - newRows.length + 1)));
  };

  const { isLoading, data, refetch, remove } = useGetMovies(page, pageSize);
  const { isLoading: isLoadingQueryData, data: queryData } =
    useSearchMovies(query);
  useEffect(() => {
    if (data !== undefined && queryData === undefined) {
      setCount(data.count);
      updateRows(data.rows);
    }
    if (queryData !== undefined) {
      setCount(queryData.count);
      setRows(queryData.rows);
    }
  }, [isLoading, isLoadingQueryData, data]);

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
        const openingDay = formatDate(new Date(params.value));
        return openingDay;
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
        setRows={setRows}
      />
      <Button className={classes.addButton} onClick={handleClickOpenAddPage}>
        Thêm phim mới
      </Button>
      <DataGrid
        autoHeight
        page={page - 1}
        pageSize={pageSize}
        loading={isLoading || isLoadingQueryData}
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
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: { setQuery },
        }}
      />
    </Box>
  );
}
