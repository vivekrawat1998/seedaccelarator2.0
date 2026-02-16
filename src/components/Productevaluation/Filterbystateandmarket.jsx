import React, { useState } from 'react';
import Stateandmarketes from '../../utils/Stateandmarkte'; // Adjust import path to your JSON data

export default function FilterPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const graphsPerPage = 4;

  // Normalize states to title case for dropdown display
  const allStates = Stateandmarketes[0].graphData.map(item => item.state.toLowerCase());
  const uniqueStates = Array.from(new Set(allStates))
    .map(state => state.charAt(0).toUpperCase() + state.slice(1));

  // Unique market segments (commented in your code, can be enabled if needed)
  const uniqueMarketSegments = Array.from(new Set(Stateandmarketes[0].graphData.map(item => item.marketSegment)));

  // Filter graph data based on selected state and segment
  const filteredGraphs = Stateandmarketes[0].graphData.filter(item => {
    const itemState = item.state.toLowerCase();
    const selectedStateLower = selectedState.toLowerCase();
    return (
      (selectedState === '' || itemState === selectedStateLower) &&
      (selectedSegment === '' || item.marketSegment === selectedSegment)
    );
  });

  // Pagination calculations
  const indexOfLastGraph = currentPage * graphsPerPage;
  const indexOfFirstGraph = indexOfLastGraph - graphsPerPage;
  const currentGraphs = filteredGraphs.slice(indexOfFirstGraph, indexOfLastGraph);
  const totalPages = Math.ceil(filteredGraphs.length / graphsPerPage);

  // Handle page change
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="md:p-6 container mx-auto ">
      <h1 className="text-2xl font-parkinsans text-prime font-bold mb-6 text-center sm:text-left">Filter Graphs</h1>

      <div className="flex flex-col sm:flex-row gap-6 mb-8 max-w-md sm:max-w-full mx-auto sm:mx-0">
        <div className="flex flex-col flex-1">
          <label htmlFor="state" className="mb-2 font-medium">State</label>
          <select
            id="state"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-prime transition"
            value={selectedState}
            onChange={e => {
              setSelectedState(e.target.value);
              setCurrentPage(1); // Reset page on filter change
            }}
          >
            <option value="">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Uncomment and enable if Market Segment filter is needed */}
        <div className="flex flex-col flex-1">
          <label htmlFor="segment" className="mb-2 font-medium">Market Segment</label>
          <select
            id="segment"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-prime transition"
            value={selectedSegment}
            onChange={e => {
              setSelectedSegment(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Segments</option>
            {uniqueMarketSegments.map(segment => (
              <option key={segment} value={segment}>{segment}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {currentGraphs.length > 0 ? (
          currentGraphs.map((graph, idx) => (
            <img
              key={idx}
              src={graph.src}
              alt={`${graph.state} - ${graph.marketSegment}`}
              className="w-full h-auto rounded shadow"
            />
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">No graph available for selected filters.</p>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            className={`rounded px-4 py-2 m-1 ${
              pageNum === currentPage ? 'bg-prime text-white' : 'bg-gray-200 hover:bg-gray-300'
            } transition`}
            onClick={() => handlePageChange(pageNum)}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}
