import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import Stateandmarketes from "../../utils/Stateandmarkte";
import ProductEvaluationData from "../../utils/Productevaluationdata";
import Typography from "../../ui/Heading";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Filterbystateandmarket() {
  const { isAuthenticated, user } = useAuth();

  const [remoteUser, setRemoteUser] = useState(null);
  const [breederRequests, setBreederRequests] = useState([]);
  const [acceleratorRequests, setAcceleratorRequests] = useState([]);
  const [memberRequests, setMemberRequests] = useState([]);

  // ✅ FIXED: Move ALL hooks to top level before any returns
  const [filters, setFilters] = useState({
    state: "",
    year: "",
    marketSegment: "",
    variety: "",
    institute: ""
  });

  /* ================= FETCH CURRENT USER ================= */
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

  /* ================= FETCH MEMBERSHIP REQUESTS ================= */
  useEffect(() => {
    let mounted = true;

    const fetchRequests = async () => {
      const userId = effectiveUser?.id;
      const email = effectiveUser?.email;

      if (!userId && !email) return;

      try {
        let breeders = [];
        let accelerators = [];
        let members = [];

        /* ===== BREEDER ===== */
        if (email) {
          const byEmail = await api
            .get(`/breeder-requests?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          breeders = byEmail.data.data || [];
        }

        if (!breeders.length && userId) {
          const byUser = await api
            .get(`/breeder-requests?filters[users_permissions_user][id][$eq]=${userId}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          breeders = byUser.data.data || [];
        }

        /* ===== MEMBERS ===== */
        if (email) {
          const byEmail = await api
            .get(`/members?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          members = byEmail.data.data || [];
        }

        if (!members.length && userId) {
          const byUser = await api
            .get(`/members?filters[users_permissions_user][id][$eq]=${userId}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          members = byUser.data.data || [];
        }

        /* ===== ACCELERATOR ===== */
        if (email) {
          const accByEmail = await api
            .get(`/accelartor-requests?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          accelerators = accByEmail.data.data || [];
        }

        if (!accelerators.length && userId) {
          const accByUser = await api
            .get(`/accelartor-requests?filters[users_permissions_user][id][$eq]=${userId}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          accelerators = accByUser.data.data || [];
        }

        if (!mounted) return;

        setBreederRequests(breeders);
        setAcceleratorRequests(accelerators);
        setMemberRequests(members);

        console.log("✅ Requests loaded:", {
          breeders,
          accelerators,
          members
        });
      } catch (err) {
        console.warn("Could not fetch membership:", err);
      }
    };

    fetchRequests();
    return () => (mounted = false);
  }, [effectiveUser?.id, effectiveUser?.email]);

  /* ================= ACCESS CONTROL ================= */
  const isBlocked =
    effectiveUser?.blocked === true ||
    effectiveUser?.blocked === "true";

  const breederApproved = breederRequests.some(
    (b) => b?.Approval === true || b?.attributes?.Approval === true
  );

  const acceleratorApproved = acceleratorRequests.some(
    (a) => a?.Approval === true || a?.attributes?.Approval === true
  );

  const memberApproved = memberRequests.some(
    (m) => m?.Approval === true || m?.attributes?.Approval === true
  );

  const isApproved = breederApproved || acceleratorApproved || memberApproved;

  console.log("🔍 Approval Debug:", {
    breederApproved,
    acceleratorApproved,
    memberApproved,
    isApproved,
  });

  // Data processing logic (moved before returns)
  const rawGraphData = Stateandmarketes?.[0]?.graphData || [];
  const rawTableData = ProductEvaluationData || [];

  const extractYear = (marketSegment) => {
    const match = marketSegment.match(/(\d{4})/);
    return match ? match[1] : "";
  };

  const graphData = rawGraphData.map(item => ({
    state: (item?.state || "").trim(),
    marketSegment: (item?.marketSegment || "").trim(),
    year: extractYear(item?.marketSegment || ""),
    variety: item?.variety || "",
    institute: (item?.nominatingInstitute || "").trim(),
    src: item?.src || ""
  }));

  const tableData = rawTableData.map(item => ({
    state: (item?.State || "").trim(),
    marketSegment: (item?.MarketSegment || "").trim(),
    year: (item?.Year || "").trim(),
    TestVarieties: (item?.TestVarieties || []).map(v => (v || "").trim()),
    Benchmark: (item?.Benchmark || "").trim(),
    LocalCheck: (item?.LocalCheck || "").trim(),
    BestPerformer: (item?.BestPerformer || "").trim()
  }));

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ state: "", year: "", marketSegment: "", variety: "", institute: "" });
  };

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map(item => item[key]).filter(Boolean))]
      .map(val => val.trim())
      .filter((val, index, self) => self.indexOf(val) === index)
      .sort();
  };

  const states = getUniqueValues([...graphData, ...tableData], 'state');
  const years = getUniqueValues([...graphData, ...tableData], 'year');
  const segments = getUniqueValues([...graphData, ...tableData], 'marketSegment');
  const varieties = getUniqueValues(graphData, 'variety');
  const institutes = getUniqueValues(graphData, 'institute');

  const filteredGraphs = useMemo(() => {
    return graphData.filter(item => {
      const stateMatch = !filters.state || item.state.toLowerCase() === filters.state.toLowerCase();
      const segmentMatch = !filters.marketSegment || item.marketSegment.toLowerCase() === filters.marketSegment.toLowerCase();
      const yearMatch = !filters.year || item.year === filters.year;
      const varietyMatch = !filters.variety || item.variety.toLowerCase() === filters.variety.toLowerCase();
      const instituteMatch = !filters.institute || item.institute.toLowerCase() === filters.institute.toLowerCase();
      return stateMatch && segmentMatch && yearMatch && varietyMatch && instituteMatch;
    });
  }, [filters, graphData]);

  const filteredTable = useMemo(() => {
    return tableData.filter(item => {
      const stateMatch = !filters.state || item.state.toLowerCase() === filters.state.toLowerCase();
      const segmentMatch = !filters.marketSegment || item.marketSegment.toLowerCase() === filters.marketSegment.toLowerCase();
      const yearMatch = !filters.year || item.year === filters.year;
      const varietyMatch = !filters.variety || item.TestVarieties.some(v => v.toLowerCase() === filters.variety.toLowerCase());
      const instituteMatch = !filters.institute || [item.Benchmark, item.LocalCheck, item.BestPerformer].some(inst => inst.toLowerCase() === filters.institute.toLowerCase());
      return stateMatch && segmentMatch && yearMatch && varietyMatch && instituteMatch;
    });
  }, [filters, tableData]);

  /* ================= NOT LOGGED IN ================= */
  if (!isAuthenticated) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-green-50 border border-green-200 rounded-xl p-10 text-center shadow-sm">
          <Typography variant="h1">Product Evaluation Information</Typography>
          <Typography variant="h2" className="mt-4">
            Please log in or register for a free account.
          </Typography>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/network-members#register" className="px-6 py-3 bg-green-700 text-white rounded-md font-semibold hover:bg-green-800 transition">
              Register Now
            </Link>
            <Link to="/login" className="px-6 py-3 border border-green-700 text-green-700 rounded-md font-semibold hover:bg-green-100 transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ================= BLOCKED ================= */
  if (isBlocked) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-orange-50 border-2 border-orange-200 rounded-xl p-12 text-center shadow-lg">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⛔</span>
          </div>
          <Typography variant="h1" className="text-2xl font-bold text-gray-800 mb-4">
            Account Blocked
          </Typography>
          <Typography variant="h2" className="text-lg text-gray-700 mb-6">
            Your account is <strong>blocked</strong>.
            Contact administrator to get unblocked.
          </Typography>

          <div className="bg-orange-100 p-4 rounded-lg mb-6 text-left text-sm">
            <p><strong>Account Status:</strong></p>
            <p>User: <span className="font-medium">{effectiveUser?.email || 'Unknown'}</span></p>
            <p>Blocked: <span className="font-semibold text-red-600">YES</span></p>
            <p>Access: <span className="font-semibold text-red-600">DENIED</span></p>
            <p className="mt-2 text-xs text-gray-600">
              Admin must go to Content Manager → Users → Toggle "Blocked" OFF
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="px-6 py-3 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition">
              Dashboard
            </Link>
            <Link to="/support" className="px-6 py-3 border border-orange-600 text-orange-600 rounded-md font-semibold hover:bg-orange-50 transition">
              Contact Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ================= APPROVAL PENDING ================= */
  if (!isApproved) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-yellow-50 border-2 border-yellow-200 rounded-xl p-12 text-center shadow-lg">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⏳</span>
          </div>
          <Typography variant="h1">Approval Pending</Typography>
          <Typography variant="h2">
            Your account is created but waiting for admin approval.
          </Typography>

          <Link to="/dashboard" className="px-6 py-3 bg-yellow-600 text-white rounded-md mt-6 inline-block font-semibold hover:bg-yellow-700 transition">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ✅ APPROVED CONTENT RENDERS HERE - UI unchanged
  return (
    <div className="min-h-screen container mx-auto mt-10 bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h1" className="text-2xl font-bold text-gray-800">
              Product Evaluation Information
            </Typography>
            <div className="text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
              ✅ ACCESS GRANTED - {effectiveUser?.email}
            </div>
          </div>

          {/* Results Counter */}
          <div className="mb-6 p-4 bg-blue-50 border rounded-lg">
            <div className="text-sm text-gray-700">
              📊 <strong>{filteredGraphs.length}</strong> graphs |
              📋 <strong>{filteredTable.length}</strong> table entries
              {Object.values(filters).some(v => v) && (
                <span className="ml-4 bg-yellow-200 px-2 py-1 rounded text-xs font-medium">
                  Filters Active
                </span>
              )}
            </div>
          </div>

          {/* GRAPHS */}
          {filteredGraphs.length > 0 ? (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                📈 Graph Insights ({filteredGraphs.length})
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGraphs.map((g, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-200">
                    <img
                      src={g.src}
                      alt={`${g.state} - ${g.marketSegment}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 text-sm">{g.state}</h4>
                      <p className="text-xs text-gray-600 truncate">{g.marketSegment}</p>
                      <p className="text-xs text-blue-600 mt-1">{g.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-8 p-12 text-center text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <div className="text-4xl mb-4">📊</div>
              No graphs match your filters
            </div>
          )}

          {/* TABLE */}
          {filteredTable.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                📋 Product Evaluation Data ({filteredTable.length})
              </h3>
              <div className="overflow-x-auto border rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Varieties</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benchmark</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local Check</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Performer</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-sm text-gray-900">{row.state}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.marketSegment}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.year}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={row.TestVarieties.join(", ")}>
                            {row.TestVarieties.slice(0, 3).join(", ")}
                            {row.TestVarieties.length > 3 && "..."}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.Benchmark}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.LocalCheck}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-700">{row.BestPerformer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <div className="text-4xl mb-4">📋</div>
              No table data matches your filters
            </div>
          )}
        </div>

        {/* FILTERS */}
        <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
            >
              Clear All
            </button>
          </div>

          {[
            { label: "State", key: "state", data: states },
            { label: "Year", key: "year", data: years },
            { label: "Market Segment", key: "marketSegment", data: segments },
            { label: "Variety", key: "variety", data: varieties },
            { label: "Institute", key: "institute", data: institutes }
          ].map(filter => (
            <div key={filter.key} className="mb-6 last:mb-0">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {filter.label} ({filter.data.length})
              </label>
              <select
                value={filters[filter.key]}
                onChange={(e) => updateFilter(filter.key, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 text-sm"
              >
                <option value="">All {filter.label}</option>
                {filter.data.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
