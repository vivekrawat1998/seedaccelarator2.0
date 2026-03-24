import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
  Pagination,
  Chip,
} from '@mui/material';

// VarietyInstitutionData
const VarietyInstitutionData = [
  { variety: "ADT 56", institution: "TNAU" },
  { variety: "ADT 59", institution: "TNAU" },
  // ... rest of your varieties (keeping it short for this example)
];

export default function ProductFilter() {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState({
    year: '',
    state: '',
    marketSegment: '',
    variety: '',
    institution: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [debugInfo, setDebugInfo] = useState({});
  const itemsPerPage = 10;

  const normalize = (str) => str ? String(str).toLowerCase().trim() : '';

  // 🔥 DEBUG - Run once to see your actual data
  useEffect(() => {
    const analysis = {
      totalRecords: ProductEvaluationData.length,
      hasTestVarieties: ProductEvaluationData.some(item => item.TestVarieties),
      sampleRecord: ProductEvaluationData[0],
      sampleTestVarieties: ProductEvaluationData.slice(0, 3).map(item => ({
        Year: item.Year,
        State: item.State,
        TestVarieties: item.TestVarieties
      })),
      varietiesFound: []
    };

    // Extract ALL varieties from your actual data
    const allVarieties = [];
    ProductEvaluationData.forEach((item, index) => {
      if (item.TestVarieties) {
        if (Array.isArray(item.TestVarieties)) {
          item.TestVarieties.forEach(v => {
            if (v && !allVarieties.includes(v)) allVarieties.push(v);
          });
        } else {
          allVarieties.push(item.TestVarieties);
        }
      }
    });

    analysis.varietiesFound = allVarieties.slice(0, 20);
    setDebugInfo(analysis);

    console.log('🔍 DATA ANALYSIS:', analysis);
  }, []);

  const varietyToInstitution = useMemo(() => {
    const mapping = {};
    VarietyInstitutionData.forEach(item => {
      mapping[normalize(item.variety)] = item.institution;
    });
    return mapping;
  }, []);

  // 🔥 FILTER OPTIONS - BULLETPROOF VERSION
  const years = useMemo(() => {
    const years = ProductEvaluationData
      .filter(item => item.Year)
      .map(item => item.Year)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => b - a);
    return years;
  }, []);

  const states = useMemo(() => {
    const states = ProductEvaluationData
      .filter(item => item.State)
      .map(item => item.State)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
    return states;
  }, []);

  const marketSegments = useMemo(() => {
    const segments = ProductEvaluationData
      .filter(item => item.MarketSegment)
      .map(item => item.MarketSegment)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
    return segments;
  }, []);

  // 🔥 VARIETIES - FROM YOUR ACTUAL DATA FIRST
  const varieties = useMemo(() => {
    const allVarieties = [];
    ProductEvaluationData.forEach(item => {
      if (item.TestVarieties) {
        if (Array.isArray(item.TestVarieties)) {
          item.TestVarieties.forEach(v => {
            if (v && !allVarieties.includes(v)) {
              allVarieties.push(v);
            }
          });
        } else if (item.TestVarieties && !allVarieties.includes(item.TestVarieties)) {
          allVarieties.push(item.TestVarieties);
        }
      }
    });
    return allVarieties.sort();
  }, []);

  // 🔥 INSTITUTIONS - Available ones that match your data
  const institutions = useMemo(() => {
    const insts = [...new Set(VarietyInstitutionData.map(i => i.institution))];
    return insts.sort();
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  }, []);

  const filteredData = useMemo(() => {
    return ProductEvaluationData.filter(item => {
      const testVarieties = Array.isArray(item.TestVarieties)
        ? item.TestVarieties
        : [item.TestVarieties].filter(Boolean);

      const matchYear = !filters.year || item.Year == filters.year;
      const matchState = !filters.state || item.State == filters.state;
      const matchSegment = !filters.marketSegment || item.MarketSegment == filters.marketSegment;

      const matchVariety = !filters.variety ||
        testVarieties.some(v => normalize(String(v)) === normalize(filters.variety));

      const matchInstitution = !filters.institution ||
        testVarieties.some(v => {
          const normV = normalize(String(v));
          return varietyToInstitution[normV] === filters.institution;
        });

      return matchYear && matchState && matchSegment && matchVariety && matchInstitution;
    });
  }, [filters, varietyToInstitution]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (e, page) => setCurrentPage(page);

  if (!isAuthenticated) return null;

  return (
    <Box mt={5} mx={3}>
      <Typography
        sx={{
          fontFamily: 'parkinsans',
          color: '#006401',
          fontWeight: 700,
          fontSize: { xs: "22px", md: "30px" }
        }}
      >
        Filter Product Evaluation Data
      </Typography>

      {/* 🔥 DEBUG INFO - REMOVE AFTER FIXING */}
      <Box mb={3} p={2} sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>Debug Info:</Typography>
        <Typography><strong>Total Records:</strong> {debugInfo.totalRecords || 'Loading...'}</Typography>
        <Typography><strong>Varieties Found:</strong> {varieties.length}</Typography>
        <Typography><strong>First 5 Varieties:</strong> {varieties.slice(0, 5).join(', ') || 'NONE'}</Typography>
        <Typography><strong>Sample TestVarieties:</strong></Typography>
        <pre style={{ fontSize: '12px', maxHeight: '100px', overflow: 'auto' }}>
          {JSON.stringify(debugInfo.sampleTestVarieties, null, 2)}
        </pre>
      </Box>

      {/* FILTERS */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select name="year" value={filters.year || ''} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>State</InputLabel>
          <Select name="state" value={filters.state || ''} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            {states.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Market Segment</InputLabel>
          <Select name="marketSegment" value={filters.marketSegment || ''} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            {marketSegments.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Variety ({varieties.length})</InputLabel>
          <Select name="variety" value={filters.variety || ''} onChange={handleFilterChange}>
            <MenuItem value="">All Varieties</MenuItem>
            {varieties.slice(0, 50).map(v => (
              <MenuItem key={v} value={v}>{v}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Institute ({institutions.length})</InputLabel>
          <Select name="institution" value={filters.institution || ''} onChange={handleFilterChange}>
            <MenuItem value="">All Institutes</MenuItem>
            {institutions.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {/* RESULTS */}
      <Typography variant="body1" mb={2}>
        Showing {filteredData.length} of {ProductEvaluationData.length} records
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#006401" }}>
              <TableCell sx={{ color: "#fff" }}>State</TableCell>
              <TableCell sx={{ color: "#fff" }}>Market Segment</TableCell>
              <TableCell sx={{ color: "#fff" }}>Year</TableCell>
              <TableCell sx={{ color: "#fff" }}>Test Varieties</TableCell>
              <TableCell sx={{ color: "#fff" }}>Benchmark</TableCell>
              <TableCell sx={{ color: "#fff" }}>Local Check</TableCell>
              <TableCell sx={{ color: "#fff" }}>Best Performer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.State}</TableCell>
                  <TableCell>{item.MarketSegment}</TableCell>
                  <TableCell>{item.Year}</TableCell>
                  <TableCell>
                    {Array.isArray(item.TestVarieties)
                      ? item.TestVarieties.join(', ')
                      : item.TestVarieties || 'N/A'}
                  </TableCell>
                  <TableCell>{item.Benchmark}</TableCell>
                  <TableCell>{item.LocalCheck}</TableCell>
                  <TableCell>{item.BestPerformer}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No matching data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}