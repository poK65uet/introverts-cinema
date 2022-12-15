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
      {/* <GridToolbarColumnsButton
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      />
      <GridToolbarFilterButton
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      />
      <GridToolbarDensitySelector
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      /> */}
      <GridToolbarExport />
      <SearchBar {...props} />
    </GridToolbarContainer>
  );
}
