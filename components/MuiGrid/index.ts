// "use client";
// import { Box } from "@mui/material";
// import { DataGrid, GridToolbarQuickFilter, GridPaginationModel } from "@mui/x-data-grid";
// import { useState } from "react";
// import "../app/globals.css";

// interface MuiGridProps {
//   data: any[];
//   columns: any[];
//   clickHandler?: (params: any) => void;
//   autoHeight?: boolean;
//   loading?: boolean;
//   rowCount: number;
//   paginationModel: GridPaginationModel;
//   search: string;
//   setSearch: (value: string) => void;
//   onPaginationModelChange: (model: GridPaginationModel) => void;
//   isSearch?: boolean;
//   getRowId?: (row: any) => string | number;
// }

// export default function MuiGrid({
//   data,
//   columns,
//   clickHandler,
//   autoHeight = true,
//   loading = false,
//   rowCount,
//   paginationModel,
//   search,
//   setSearch,
//   onPaginationModelChange,
//   isSearch = true,
//   getRowId,
// }: MuiGridProps) {
  
//   function QuickSearchToolbar() {
//     return (
//       <GridToolbarQuickFilter
//         className="mt-3 mb-5 !mx-auto"
//         value={search}
//         onChange={(event) => setSearch(event.target.value)}
//         autoFocus={true}
//       />
//     );
//   }

//   return (
//     <Box sx={{ width: "100%" }}>
//       <DataGrid
//         rows={data}
//         rowCount={rowCount}
//         columns={columns}
//         disableRowSelectionOnClick
//         loading={loading}
//         pageSizeOptions={[5]}
//         paginationModel={paginationModel}
//         paginationMode="server"
//         onPaginationModelChange={onPaginationModelChange}
//         getRowId={getRowId}
//         className="w-full !border-white !border-opacity-0"
//         pagination
//         getRowHeight={() => (!autoHeight ? 200 : autoHeight)}
//         columnVisibilityModel={{ id: false }}
//         autoHeight
//         onRowClick={clickHandler}
//         disableSelectionOnClick
//         disableColumnFilter
//         disableColumnSelector
//         disableDensitySelector
//         disableColumnMenu
//         slots={{
//           toolbar: isSearch ? QuickSearchToolbar : undefined,
//         }}
//         sx={{
//           ".css-204u17-MuiDataGrid-main::-webkit-scrollbar": {
//             width: "2px !important",
//           },
//           ".css-204u17-MuiDataGrid-main::-webkit-scrollbar-track": {
//             backgroundColor: "#f1f1f1",
//           },
//           ".css-204u17-MuiDataGrid-main::-webkit-scrollbar-thumb": {
//             backgroundColor: "#888",
//           },
//           ".css-204u17-MuiDataGrid-main::-webkit-scrollbar-thumb:hover": {
//             backgroundColor: "#555",
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-row": {
//             borderBottom: "none",
//           },
//         }}
//       />
//     </Box>
//   );
// }
