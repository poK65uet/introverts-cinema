import { useGetMessage } from 'queries/message';
import Box from '@mui/material/Box';
import useStyles from './style';
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

//TODO: Add search button
//TODO: Add button to change film's status
export default function FilmManagementPage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowId, setEditRowId] = useState('0');
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  const handleClickOpenAddPage = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenEditPage = (params: any) => {
    setEditRowId(params.toString());
    setOpenEdit(true);
  };

  
  const { isLoading, data } = useGetMovies();

  const columns: GridColDef[] = [
    {
      field: 'imageUrl',
      headerName: 'Poster',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'collumnHeader',
      renderCell: (params: GridRenderCellParams<string>) => {
        return params.value && <a href={params.value}>Poster</a>;
      },
    },
    {
      field: 'title',
      headerName: 'Tên phim',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'duration',
      headerName: 'Thời lượng',
      type: 'number',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        return params.value === 'active' ? (
          <Chip label="active" variant="outlined" color="success" />
        ) : (
          <Chip label="inactive" variant="outlined" color="error" />
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
      field: 'NationalityId',
      headerName: 'Mã quốc gia',
      type: 'number',
      width: 140,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'trailerUrl',
      headerName: 'Trailer',
      width: 90,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        return <a href={params.value}>Trailer</a>;
      },
    },
  ];

  return (
    <Box className={classes.filmTable}>
      <AddFilmDialog
        open={open}
        onClose={handleClose}
      />
      <EditFilmDialog
        data={editRowId}
        open={openEdit}
        onClose={handleCloseEdit} />
      <Typography variant="h4" component="h4" fontWeight="bold">
        Quản lý phim trong hệ thống
      </Typography>
      <Button className={classes.addButton} onClick={handleClickOpenAddPage}>
        Thêm phim mới
      </Button>
      <DataGrid
        page={page}
        pageSize={pageSize}
        loading={isLoading}
        onPageChange={newPage => setPage(newPage)}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        rows={isLoading ? [] : data.rows}
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
