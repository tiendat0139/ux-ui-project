import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  alpha,
  Pagination,
} from "@mui/material";
import SearchBox from "../SearchBox";
import Icon from "../Icons";

const List = () => {
  const { palette } = useTheme();
  const getStatusColor = (status) => {
    if(status === "Connected") return ["#b9f6ca", "#00c853"];
    if(status === "Pending") return ["#fff59d", "#f9a825"];
    if(status === "Failed") return ["#ffab91", "#d84315"];
  }
  const rows = [
    {
      name: "eHust",
      category: "Learning",
      link: "https://e.hust.edu.vn/",
      status: "Connected",
      updated: "09/06/2023",
    },
    {
      name: "Easy Edu",
      category: "Part time",
      link: "https://easyedu.vn/",
      status: "Pending",
      updated: "09/06/2023",
    },
    {
      name: "Backlog",
      category: "Working",
      link: "https://nulab.com",
      status: "Failed",
      updated: "09/06/2023",
    },
  ];
  const headCells = [
    { id: "name", label: "Name" },
    { id: "category", label: "Category" },
    { id: "link", label: "Link" },
    { id: "status", label: "Status" },
    { id: "updated", label: "Updated" },
    { id: "operation", label: "Operation" },
  ];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={{
            ":hover": {
              color: "white",
              bgcolor: alpha(palette.primary.main, 0.9),
            },
          }}
        >
          New
        </Button>
        <Box display="flex" alignItems="center" gap="2rem">
          <SearchBox trailingButton={false} />
          <Box
            display="flex"
            gap="0.5rem"
            alignItems="center"
            sx={{ cursor: "pointer", "&:hover": { opacity: "0.7" } }}
          >
            <Icon name="filter" size={20} />
            <Typography color="#999">Filters</Typography>
          </Box>
        </Box>
      </Box>
      <Box fullWidth>
        <TableContainer>
          <Table>
            <TableHead>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>
                  <TableSortLabel sx={{ color: "#666" }}>
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell sx={{ color: palette.primary.main }}>
                    {row.link}
                    <IconButton>
                      <Icon
                        name="copy"
                        size="16"
                        color={palette.primary.main}
                      ></Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        width: "10rem",
                        py: "0.1rem",
                        bgcolor: getStatusColor(row.status)[0],
                        color: getStatusColor(row.status)[1],
                        fontWeight: 500,
                        textAlign: "center",
                        borderRadius: "10rem",
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>{row.updated}</TableCell>
                  <TableCell>
                    <Box display="flex" gap="2rem">
                      <IconButton>
                        <Icon name="edit" size="20" color="#083AA9" />
                      </IconButton>
                      <IconButton>
                        <Icon name="delete" size="20" color="#E03B24" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ mt: "5rem", textAlign: "center" }}
      >
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default List;
