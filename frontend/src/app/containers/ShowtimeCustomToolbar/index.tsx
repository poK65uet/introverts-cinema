import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import FilmFilter from 'app/components/FilmFilter';
import RoomFilter from 'app/components/RoomFilter';
import SearchBar from 'app/components/SearchBar';

export default function CustomToolbar(props: any) {
  return (
    <GridToolbarContainer>
      <FilmFilter {...props} />
      <RoomFilter {...props} />
    </GridToolbarContainer>
  );
}
