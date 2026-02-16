import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import ProductEvaluationData from '../utils/Productevaluationdata';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from '@mui/material';

export default function ProductFilter() {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState({
    year: '',
    state: '',
    marketSegment: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const years = Array.from(new Set(ProductEvaluationData.map(item => item.Year)));
  const states = Array.from(new Set(ProductEvaluationData.map(item => item.State)));
  const marketSegments = Array.from(new Set(ProductEvaluationData.map(item => item.MarketSegment)));

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  }

  // Filtering data based on selected filters
  const filteredData = ProductEvaluationData.filter(item => {
    return (
      (filters.year === '' || item.Year === filters.year) &&
      (filters.state === '' || item.State === filters.state) &&
      (filters.marketSegment === '' || item.MarketSegment === filters.marketSegment)
    );
  });
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    isAuthenticated ? (
      <Box mt={5} mx={3}>
        <Typography
          sx={{
            fontFamily: 'parkinsans, sans-serif',
            color: '#006401',
            fontWeight: 700,
            fontSize: { xs: "22px", md: "30px" }
          }}
          variant="h5"
          gutterBottom
        >
          Filter Product Evaluation Data
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          mb={3}
          flexWrap="wrap"
        >
          <FormControl sx={{ minWidth: { xs: "100%", sm: 180 } }} size="small">
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={filters.year}
              label="Year"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {years.map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: "100%", sm: 180 } }} size="small">
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={filters.state}
              label="State"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {states.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: "100%", sm: 180 } }} size="small">
            <InputLabel>Market Segment</InputLabel>
            <Select
              name="marketSegment"
              value={filters.marketSegment}
              label="Market Segment"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {marketSegments.map(m => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Responsive Table Container */}
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#006401" }}>
                <TableCell sx={{ color: "#fff", fontFamily: "parkinsans, sans-serif", fontWeight: 600 }}>State</TableCell>
                <TableCell sx={{ color: "#fff", fontFamily: "parkinsans, sans-serif", fontWeight: 600 }}>Market Segment</TableCell>
                <TableCell sx={{ color: "#fff", fontFamily: "parkinsans, sans-serif", fontWeight: 600 }}>Year</TableCell>
                <TableCell sx={{ color: "#fff", fontFamily: "parkinsans, sans-serif", fontWeight: 600 }}>Test Varieties</TableCell>
                <TableCell sx={{ color: "#fff", fontFamily: "parkinsans, sans-serif", fontWeight: 600 }}>Benchmark</TableCell>
                <TableCell sx={{ color: "#fff", fontFamily: "parkinsans, sans-serif", fontWeight: 600 }}>Local Check</TableCell>
                <TableCell sx={{ color: "#fff", fontFamily: "parkinsans, sans-serif", fontWeight: 600 }}>Best Performer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ fontFamily: "parkinsans, sans-serif" }}>{item.State}</TableCell>
                    <TableCell sx={{ fontFamily: "parkinsans, sans-serif" }}>{item.MarketSegment}</TableCell>
                    <TableCell sx={{ fontFamily: "parkinsans, sans-serif" }}>{item.Year}</TableCell>
                    <TableCell sx={{ fontFamily: "parkinsans, sans-serif" }}>{item.TestVarieties.join(', ')}</TableCell>
                    <TableCell sx={{ fontFamily: "parkinsans, sans-serif" }}>{item.Benchmark}</TableCell>
                    <TableCell sx={{ fontFamily: "parkinsans, sans-serif" }}>{item.LocalCheck}</TableCell>
                    <TableCell sx={{ fontFamily: "parkinsans, sans-serif" }}>{item.BestPerformer}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">No data matches the filter</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
        {/* Pagination controls */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${page === currentPage ? 'bg-prime text-white' : 'bg-gray-200 cursor-pointer font-parkinsans'}`}
            >
              {page}
            </button>
          ))}
        </Box>
      </Box>
    ) : (
      <Box mt={5} mx={3}>
        <Typography variant="h6" color="error" align="center">
          Please log in to view Product Evaluation data.
        </Typography>
      </Box>
    )
  );
}
