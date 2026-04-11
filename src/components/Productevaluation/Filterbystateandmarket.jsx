import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import Typography from "../../ui/Heading";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell
} from "recharts";

// ─── Color palette for varieties ─────────────────────────────────────────────
const VARIETY_TYPE_COLORS = {
  local: "#195696",       // blue
  benchmark: "#8e91b6",   // gold/orange
  test: "#67a396",        // green
  default: "#6b7280",     // fallback gray
};

const getVarietyTypeColor = (varietyType = "") => {
  const type = String(varietyType).trim().toLowerCase();

  if (
    type.includes("local")
  ) {
    return VARIETY_TYPE_COLORS.local;
  }

  if (
    type.includes("benchmark") ||
    type.includes("bm")
  ) {
    return VARIETY_TYPE_COLORS.benchmark;
  }

  if (
    type.includes("test") ||
    type.includes("fv") ||
    type.includes("trial")
  ) {
    return VARIETY_TYPE_COLORS.test;
  }

  return VARIETY_TYPE_COLORS.default;
};
// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: "10px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      fontSize: 12,
      minWidth: 280
    }}>
      <p style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: 6, borderBottom: "1px solid #f0f0f0", paddingBottom: 4 }}>
        {label}
      </p>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 2 }}>
          <span style={{ color: entry.color, fontWeight: 500 }}>{entry.name}</span>
          <span style={{ fontWeight: 700, color: "#374151" }}>
            {typeof entry.value === "number" ? entry.value.toFixed(2) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Graph Card ───────────────────────────────────────────────────────────────
const GraphCard = ({ graph }) => {
  const [expanded, setExpanded] = useState(false);
  const displayRows = expanded ? graph.chartRows : graph.chartRows.slice(0, 12);

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)",
      border: "1px solid #e9ecef",
      transition: "box-shadow 0.2s ease, transform 0.2s ease",
      display: "flex",
      flexDirection: "column"
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header */}
      <div style={{
        padding: "14px 18px 10px",
        borderBottom: "1px solid #f3f4f6",
        background: "linear-gradient(135deg, #f8fffe 0%, #f0f9ff 100%)"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{
                background: "#1a6b9a",
                color: "#fff",
                borderRadius: 6,
                padding: "2px 9px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.3,
                whiteSpace: "nowrap"
              }}>
                📍 {graph.state}
              </span>
              {graph.year && (
                <span style={{
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  borderRadius: 6,
                  padding: "2px 9px",
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace: "nowrap"
                }}>
                  {graph.year}
                </span>
              )}
            </div>
            <p style={{
              margin: "6px 0 0",
              fontSize: 12,
              color: "#6b7280",
              fontWeight: 500,
              lineHeight: 1.4,
              wordBreak: "break-word"
            }}>
              {graph.marketSegment}
            </p>
          </div>
          <div style={{
            background: "#f1f5f9",
            borderRadius: 8,
            padding: "4px 8px",
            fontSize: 11,
            fontWeight: 600,
            color: "#475569",
            whiteSpace: "nowrap",
            flexShrink: 0
          }}>
            {graph.chartRows.length} varieties
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: "12px 6px 0", background: "#fff" }}>
        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={displayRows}
              margin={{ top: 8, right: 16, left: -8, bottom: 48 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                interval={0}
                height={60}
                tick={{ fontSize: 9.5, fill: "#6b7280", fontWeight: 500 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                yAxisId="left"
                domain={[0, "auto"]}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={v => `${v}t`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[-20, 40]}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={v => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                yAxisId="left"
                dataKey="yield"
                name="Yield (t/ha)"
                barSize={22}
                maxBarSize={46}
              // radius={[10, 10, 0, 0]}
              >
                {displayRows.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getVarietyTypeColor(entry.varietyType)}
                    fillOpacity={0.9}
                  />
                ))}
              </Bar>
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="gainBM"
                name="% Gain BM"
                stroke="#F1070F"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#F1070F", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="gainFV"
                name="% Gain FV"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#f59e0b", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend strip */}
      <div style={{
        display: "flex",
        gap: "150px",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 16px 10px",
        flexWrap: "wrap",
        fontSize: 11,
        color: "#6b7280"
      }}>
        <div>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ display: "inline-block", width: 12, height: 10, background: "#1a6b9a", borderRadius: 2 }} />
            Predicted Mean  Yield (t/ha)
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ display: "inline-block", width: 16, height: 2.5, background: "#F1070F", borderRadius: 2 }} />
            % Gain BM
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ display: "inline-block", width: 16, height: 2.5, background: "#f59e0b", borderRadius: 2 }} />
            % Gain FV
          </span>
        </div>

        <div>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 12, height: 12, background: VARIETY_TYPE_COLORS.local, borderRadius: 3 }} />
            Local Variety
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 12, height: 12, background: VARIETY_TYPE_COLORS.benchmark, borderRadius: 3 }} />
            Benchmark Variety
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 12, height: 12, background: VARIETY_TYPE_COLORS.test, borderRadius: 3 }} />
            Test Variety
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
const FilterSidebar = ({
  filters,
  states,
  years,
  segments,
  varieties,
  institutes,
  updateFilter,
  clearFilters
}) => {
  const filterDefs = [
    { label: "States", key: "state", data: states, icon: "📍" },
    { label: "Years", key: "year", data: years, icon: "📅" },
    { label: "Market Segments", key: "marketSegment", data: segments, icon: "🌾" },
    { label: "Varieties", key: "variety", data: varieties, icon: "🌱" },
    { label: "Institutes", key: "institute", data: institutes, icon: "🏛" }
  ];

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div style={{
      width: "100%",
      background: "#ffffff",
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      border: "1px solid #e9ecef",
      padding: "20px",
      height: "fit-content",
      position: "sticky",     // Changed from sticky to work within parent
      top: 24,                // Distance from top of the scrolling parent
      zIndex: 1,             // Ensure it stays above other content
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>Filters</h3>
          {activeCount > 0 && (
            <p style={{ fontSize: 11, color: "#6b7280", margin: "2px 0 0" }}>
              {activeCount} active filter{activeCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
        <button
          onClick={clearFilters}
          style={{
            padding: "6px 14px",
            fontSize: 12,
            background: activeCount ? "#fee2e2" : "#f3f4f6",
            color: activeCount ? "#dc2626" : "#9ca3af",
            border: "none",
            borderRadius: 8,
            cursor: activeCount ? "pointer" : "default",
            fontWeight: 600,
            transition: "all 0.15s"
          }}
        >
          Clear All
        </button>
      </div>

      {filterDefs.map((filter) => (
        <div key={filter.key} style={{ marginBottom: 16 }}>
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            fontWeight: 600,
            color: "#374151",
            marginBottom: 6
          }}>
            <span>{filter.icon}</span>
            {filter.label}
            <span style={{
              marginLeft: "auto",
              background: "#f3f4f6",
              color: "#6b7280",
              borderRadius: 10,
              padding: "1px 7px",
              fontSize: 10,
              fontWeight: 700
            }}>
              {filter.data.length}
            </span>
          </label>
          <select
            value={filters[filter.key] || ""}
            onChange={(e) => updateFilter(filter.key, e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px",
              border: filters[filter.key] ? "1.5px solid #3b82f6" : "1.5px solid #e5e7eb",
              borderRadius: 10,
              fontSize: 13,
              color: "#111827",
              background: filters[filter.key] ? "#eff6ff" : "#fafafa",
              outline: "none",
              cursor: "pointer",
              fontWeight: filters[filter.key] ? 600 : 400,
              transition: "all 0.15s"
            }}
          >
            <option value="">All {filter.label}</option>
            {filter.data.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Filterbystateandmarket() {
  const { isAuthenticated, user } = useAuth();
  const [graphApiData, setGraphApiData] = useState([]);
  const [remoteUser, setRemoteUser] = useState(null);
  const [breederRequests, setBreederRequests] = useState([]);
  const [acceleratorRequests, setAcceleratorRequests] = useState([]);
  const [memberRequests, setMemberRequests] = useState([]);

  const [filters, setFilters] = useState({
    state: "",
    year: "",
    marketSegment: "",
    variety: "",
    institute: ""
  });

  const extractYear = (marketSegment) => {
    const match = String(marketSegment || "").match(/(\d{4})/);
    return match ? match[1] : "";
  };

  useEffect(() => {
    let mounted = true;
    const fetchMe = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await api.get("/users/me?populate=*");
        let normalized = res?.data?.data
          ? { id: res.data.data.id, ...(res.data.data.attributes || {}) }
          : res.data;
        if (mounted) setRemoteUser(normalized);
      } catch (err) {
        console.warn("Could not fetch current user:", err);
      }
    };
    fetchMe();
    return () => (mounted = false);
  }, [isAuthenticated]);

  const effectiveUser = remoteUser || user || {};

  useEffect(() => {
    let mounted = true;
    const fetchRequests = async () => {
      const userId = effectiveUser?.id;
      const email = effectiveUser?.email;
      if (!userId && !email) return;
      try {
        let breeders = [], accelerators = [], members = [];

        if (email) {
          const byEmail = await api.get(`/breeder-requests?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`).catch(() => ({ data: { data: [] } }));
          breeders = byEmail.data.data || [];
        }
        if (!breeders.length && userId) {
          const byUser = await api.get(`/breeder-requests?filters[users_permissions_user][id][$eq]=${userId}&populate=*`).catch(() => ({ data: { data: [] } }));
          breeders = byUser.data.data || [];
        }
        if (email) {
          const byEmail = await api.get(`/members?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`).catch(() => ({ data: { data: [] } }));
          members = byEmail.data.data || [];
        }
        if (!members.length && userId) {
          const byUser = await api.get(`/members?filters[users_permissions_user][id][$eq]=${userId}&populate=*`).catch(() => ({ data: { data: [] } }));
          members = byUser.data.data || [];
        }
        if (email) {
          const accByEmail = await api.get(`/accelartor-requests?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`).catch(() => ({ data: { data: [] } }));
          accelerators = accByEmail.data.data || [];
        }
        if (!accelerators.length && userId) {
          const accByUser = await api.get(`/accelartor-requests?filters[users_permissions_user][id][$eq]=${userId}&populate=*`).catch(() => ({ data: { data: [] } }));
          accelerators = accByUser.data.data || [];
        }

        if (!mounted) return;
        setBreederRequests(breeders);
        setAcceleratorRequests(accelerators);
        setMemberRequests(members);
      } catch (err) {
        console.warn("Could not fetch membership:", err);
      }
    };
    fetchRequests();
    return () => (mounted = false);
  }, [effectiveUser?.id, effectiveUser?.email]);

  const isBlocked = effectiveUser?.blocked === true || effectiveUser?.blocked === "true";
  const breederApproved = breederRequests.some(b => b?.Approval === true || b?.attributes?.Approval === true);
  const acceleratorApproved = acceleratorRequests.some(a => a?.Approval === true || a?.attributes?.Approval === true);
  const memberApproved = memberRequests.some(m => m?.Approval === true || m?.attributes?.Approval === true);
  const isApproved = breederApproved || acceleratorApproved || memberApproved;

  useEffect(() => {
    const fetchGraphData = async () => {

      try {
        const res = await api.get("/graphdatas?populate=*");
        const formatted = (res?.data?.data || []).map((item) => {
          const attr = item.attributes || item;
          return { id: item.id, parsedData: attr.parseddata || attr.parsedData || [] };
        });
        setGraphApiData(formatted);
      } catch (err) {
        console.error("❌ API ERROR:", err);
      }
    };
    fetchGraphData();
  }, []);

  const rawTableData = useMemo(() => graphApiData.flatMap(item => item.parsedData || []), [graphApiData]);

  const tableData = useMemo(() => rawTableData.map((item) => ({
    state: String(item?.State || item?.state || "").trim(),
    marketSegment: String(item?.["Market Segment"] || item?.MarketSegment || item?.marketSegment || "").trim(),
    year: String(item?.Year || extractYear(item?.["Market Segment"] || item?.MarketSegment || "") || "").trim(),
    institute: String(item?.Institute || "").trim(),
    variety: String(item?.["Variety Name"] || "").trim(),
    varietyType: String(item?.["Variety Type"] || "").trim(),
    predictedMeans: Number(item?.["Predicted Means"] || 0),
    gainLocal: Number(item?.["% Gain over Local Variety"] || 0),
    gainBenchmark: Number(item?.["% Gain over Benchmark Variety"] || 0),
    TestVarieties: item?.["Variety Name"] ? [String(item["Variety Name"]).trim()] : [],
    Benchmark: "",
    LocalCheck: "",
    BestPerformer: ""
  })), [rawTableData]);

  const graphData = useMemo(() => {
    const groups = {};

    rawTableData.forEach((item) => {
      const state = String(item?.State || item?.state || "").trim();
      const marketSegment = String(
        item?.["Market Segment "]?.trim() ||  // ✅ Primary key with trailing space
        item?.["Market Segment"]?.trim() ||   // Fallback
        item?.MarketSegment?.trim() ||
        item?.marketSegment?.trim() ||
        ""
      ).trim();
      const year = String(item?.Year || extractYear(marketSegment) || "").trim();
      const institute = String(item?.Institute || "").trim();
      const variety = String(item?.["Variety Name"] || "").trim();
      const varietyType = String(item?.["Variety Type"] || "").trim();
      const predictedMeans = Number(item?.["Predicted Means"] || 0);
      const gainLocal = Number(item?.["% Gain over Local Variety"] || 0);
      const gainBenchmark = Number(item?.["% Gain over Benchmark Variety"] || 0);

      const key = `${state}__${marketSegment}__${year}`;

      if (!groups[key]) {
        groups[key] = {
          id: key,
          state,
          marketSegment,
          year,
          institute,
          variety: "",
          src: "",
          chartRows: [],
        };
      }

      groups[key].chartRows.push({
        name: variety,
        varietyType,
        yield: predictedMeans,
        gainBM: gainBenchmark,
        gainFV: gainLocal,
        institute,
      });
    });

    return Object.values(groups).map((group) => {
      const sortedRows = [...group.chartRows].sort((a, b) => b.yield - a.yield);

      return {
        ...group,
        variety: sortedRows[0]?.name || "",
        institute: [...new Set(sortedRows.map((r) => r.institute).filter(Boolean))].join(", "),
        chartRows: sortedRows,
      };
    });
  }, [rawTableData]);

  const getUniqueValues = (data, key) =>
    [...new Set(data.map(item => item[key]).filter(Boolean))]
      .map(val => val.trim())
      .filter((val, i, self) => self.indexOf(val) === i)
      .sort();

  const states = useMemo(() => getUniqueValues([...graphData, ...tableData], "state"), [graphData, tableData]);
  const years = useMemo(() => getUniqueValues([...graphData, ...tableData], "year"), [graphData, tableData]);
  const segments = useMemo(() => getUniqueValues([...graphData, ...tableData], "marketSegment"), [graphData, tableData]);
  const varieties = useMemo(() => [...new Set(tableData.map(item => item.variety).filter(Boolean))].sort(), [tableData]);
  const institutes = useMemo(() => [...new Set(tableData.map(item => item.institute).filter(Boolean))].sort(), [tableData]);

  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const clearFilters = () => setFilters({ state: "", year: "", marketSegment: "", variety: "", institute: "" });

  const filteredGraphs = useMemo(() => graphData.filter((item) => {
    const stateMatch = !filters.state || item.state.toLowerCase() === filters.state.toLowerCase();
    const segmentMatch = !filters.marketSegment ||
      item.marketSegment.toLowerCase().includes(filters.marketSegment.toLowerCase());
    const yearMatch = !filters.year || item.year === filters.year;
    const varietyMatch = !filters.variety || item.chartRows.some(v => v.name.toLowerCase().includes(filters.variety.toLowerCase()));
    const instituteMatch = !filters.institute || item.chartRows.some(v => v.institute.toLowerCase().includes(filters.institute.toLowerCase()));
    return stateMatch && segmentMatch && yearMatch && varietyMatch && instituteMatch;
  }), [filters, graphData]);



  const filteredTable = useMemo(() => tableData.filter((item) => {
    const stateMatch = !filters.state || item.state.toLowerCase() === filters.state.toLowerCase();
    const segmentMatch = !filters.marketSegment || item.marketSegment.toLowerCase() === filters.marketSegment.toLowerCase();
    const yearMatch = !filters.year || item.year === filters.year;
    const varietyMatch = !filters.variety || item.variety.toLowerCase() === filters.variety.toLowerCase();
    const instituteMatch = !filters.institute || item.institute.toLowerCase() === filters.institute.toLowerCase();
    return stateMatch && segmentMatch && yearMatch && varietyMatch && instituteMatch;
  }), [filters, tableData]);

  console.log(filteredTable)
  // ── Auth guards ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-green-50 border border-green-200 rounded-xl p-10 text-center shadow-sm">
          <Typography variant="h1" className="">Product Evaluation Information</Typography>
          <Typography variant="h2" className="mt-4">Please log in or register for a free account.</Typography>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/network-members#register" className="px-6 py-3 bg-green-700 text-white rounded-md font-semibold hover:bg-green-800 transition">Register Now</Link>
            <Link to="/login" className="px-6 py-3 border border-green-700 text-green-700 rounded-md font-semibold hover:bg-green-100 transition">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-orange-50 border-2 border-orange-200 rounded-xl p-12 text-center shadow-lg">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl">⛔</span></div>
          <Typography variant="h1" className="text-2xl font-bold text-gray-800 mb-4">Account Blocked</Typography>
          <Typography variant="h2" className="text-lg text-gray-700 mb-6">Your account is <strong>blocked</strong>. Contact administrator to get unblocked.</Typography>
          <div className="bg-orange-100 p-4 rounded-lg mb-6 text-left text-sm">
            <p><strong>Account Status:</strong></p>
            <p>User: <span className="font-medium">{effectiveUser?.email || "Unknown"}</span></p>
            <p>Blocked: <span className="font-semibold text-red-600">YES</span></p>
            <p>Access: <span className="font-semibold text-red-600">DENIED</span></p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="px-6 py-3 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition">Dashboard</Link>
            <Link to="/support" className="px-6 py-3 border border-orange-600 text-orange-600 rounded-md font-semibold hover:bg-orange-50 transition">Contact Admin</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-yellow-50 border-2 border-yellow-200 rounded-xl p-12 text-center shadow-lg">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl">⏳</span></div>
          <Typography variant="h1">Approval Pending</Typography>
          <Typography variant="h2">Your account is created but waiting for admin approval.</Typography>
          <Link to="/dashboard" className="px-6 py-3 bg-yellow-600 text-white rounded-md mt-6 inline-block font-semibold hover:bg-yellow-700 transition">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  // ── Main UI ─────────────────────────────────────────────────────────────────
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div style={{ minHeight: "100vh", marginTop: 28, padding: "28px 20px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* Page Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <Typography variant="h1" className="">Product Evaluation Information</Typography>
              <Typography variant="h3" className=""> Variety performance data across states and market segments</Typography>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0", fontWeight: 400 }}>

              </p>
            </div>
            <div style={{
              background: "#dcfce7",
              border: "1px solid #bbf7d0",
              borderRadius: 10,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 700,
              color: "#166534",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}>
              ✅ {effectiveUser?.email}
            </div>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "flex",
            gap: 12,
            marginTop: 16,
            flexWrap: "wrap"
          }}>
            {[
              { label: "Graphs", value: filteredGraphs.length, total: graphData.length, icon: "📈" },
              { label: "Table Entries", value: filteredTable.length, total: tableData.length, icon: "📋" },
              { label: "States", value: states.length, icon: "📍" },
              { label: "Varieties", value: varieties.length, icon: "🌱" },
            ].map(stat => (
              <div key={stat.label} style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
              }}>
                <span>{stat.icon}</span>
                <span style={{ fontWeight: 700, color: "#111827" }}>{stat.value}</span>
                {stat.total != null && stat.total !== stat.value && (
                  <span style={{ color: "#9ca3af", fontSize: 11 }}>/ {stat.total}</span>
                )}
                <span style={{ color: "#6b7280", fontWeight: 500 }}>{stat.label}</span>
              </div>
            ))}
            {activeFiltersCount > 0 && (
              <div style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: "#1d4ed8"
              }}>
                🔍 {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", position: "relative", alignItems: "flex-start" }}>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>

            {/* Graph section */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
                  📈 Graph Insights
                </h2>
                <span style={{
                  background: "#f3f4f6",
                  color: "#374151",
                  borderRadius: 20,
                  padding: "2px 10px",
                  fontSize: 12,
                  fontWeight: 700
                }}>
                  {filteredGraphs.length}
                </span>
              </div>

              {filteredGraphs.length > 0 ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(370px, 1fr))",
                  gap: 20
                }}>
                  {filteredGraphs.map((g, i) => (
                    <GraphCard key={g.id || i} graph={g} />
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: "60px 24px",
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 16,
                  border: "2px dashed #e5e7eb",
                  color: "#9ca3af"
                }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
                  <p style={{ fontWeight: 600, margin: 0 }}>No graphs match your current filters</p>
                  <p style={{ fontSize: 13, margin: "6px 0 0" }}>Try clearing some filters to see more results</p>
                </div>
              )}
            </div>

            {/* Table section */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
                  📋 Product Evaluation Data
                </h2>
                <span style={{
                  background: "#f3f4f6",
                  color: "#374151",
                  borderRadius: 20,
                  padding: "2px 10px",
                  fontSize: 12,
                  fontWeight: 700
                }}>
                  {filteredTable.length}
                </span>
              </div>

              {filteredTable.length > 0 ? (
                <div style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #e9ecef",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  overflow: "hidden"
                }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ background: "linear-gradient(135deg, #f8fffe 0%, #f0f9ff 100%)" }}>
                          {["State", "Segment", "Year", "Test Varieties"].map(h => (
                            <th key={h} style={{
                              padding: "12px 16px",
                              textAlign: "left",
                              fontSize: 11,
                              fontWeight: 700,
                              color: "#6b7280",
                              textTransform: "uppercase",
                              letterSpacing: 0.5,
                              borderBottom: "2px solid #e9ecef",
                              whiteSpace: "nowrap"
                            }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTable.map((row, idx) => (
                          <tr key={idx} style={{
                            background: idx % 2 === 0 ? "#fff" : "#fafafa",
                            transition: "background 0.1s"
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = "#f0f9ff"}
                            onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fafafa"}
                          >
                            <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600, color: "#111827", borderBottom: "1px solid #f3f4f6" }}>{row.state}</td>
                            <td style={{ padding: "11px 16px", fontSize: 13, color: "#374151", borderBottom: "1px solid #f3f4f6", maxWidth: 200 }}>
                              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={row.marketSegment}>
                                {row.marketSegment}
                              </div>
                            </td>
                            <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 600, color: "#059669", borderBottom: "1px solid #f3f4f6" }}>{row.year}</td>
                            <td style={{ padding: "11px 16px", fontSize: 13, color: "#374151", borderBottom: "1px solid #f3f4f6", maxWidth: 220 }}>
                              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={row.TestVarieties.join(", ")}>
                                {row.TestVarieties.slice(0, 3).join(", ")}{row.TestVarieties.length > 3 ? "…" : ""}
                              </div>
                            </td>
                            <td style={{ padding: "11px 16px", fontSize: 13, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>{row.Benchmark}</td>
                            <td style={{ padding: "11px 16px", fontSize: 13, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>{row.LocalCheck}</td>
                            <td style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700, color: "#059669", borderBottom: "1px solid #f3f4f6" }}>{row.BestPerformer}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: "60px 24px",
                  textAlign: "center",
                  background: "#fff",
                  borderRadius: 16,
                  border: "2px dashed #e5e7eb",
                  color: "#9ca3af"
                }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
                  <p style={{ fontWeight: 600, margin: 0 }}>No table data matches your filters</p>
                </div>
              )}
            </div>
          </div>

          {/* Filter Sidebar */}
          <div style={{
            width: 280,
            flexShrink: 0,
            position: "sticky",
            top: 88,           // adjust to match your navbar height
            alignSelf: "flex-start",
            zIndex: 10
          }}>
            <FilterSidebar
              filters={filters}
              states={states}
              years={years}
              segments={segments}
              varieties={varieties}
              institutes={institutes}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
