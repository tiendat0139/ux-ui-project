import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Slider,
} from "@mui/material";

const ProgressTable = () => {
  const headCells = [
    { id: "no", label: "No" },
    { id: "project", label: "Project Name" },
    { id: "update", label: "Last Update" },
    { id: "progress", label: "Progress" },
  ];
  const rows = [
    {
      name: "UX UI Design",
      updated: "15/06/2023",
      progress: 60,
    },
    {
      name: "Project ITSS",
      updated: "12/06/2023",
      progress: 50,
    },
    {
      name: "Software Engineering",
      updated: "09/06/2023",
      progress: 80,
    },
  ];
  return (
    <TableContainer>
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell key={headCell.id}>
                <TableSortLabel sx={{ color: "#666" }}>
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ py: "1rem" }}>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell sx={{ py: "1rem" }}>{row.updated}</TableCell>
              <TableCell sx={{ py: "1rem" }}>
                <Slider
                  size="small"
                  valueLabelDisplay="auto"
                  value={row.progress}
                  aria-labelledby="input-slider"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProgressTable;
