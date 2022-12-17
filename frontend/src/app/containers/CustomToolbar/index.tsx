import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import SearchBar from 'app/components/SearchBar';

export default function CustomToolbar(props: any) {
  return (
    <GridToolbarContainer>
      <SearchBar {...props} />
    </GridToolbarContainer>
  );
}
