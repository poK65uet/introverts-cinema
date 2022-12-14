import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";

export default function CustomToolbar() {
    return (
        <GridToolbarContainer>
          <GridToolbarColumnsButton nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
          <GridToolbarFilterButton nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
          <GridToolbarDensitySelector nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
          <GridToolbarExport />
        </GridToolbarContainer>
      );
}