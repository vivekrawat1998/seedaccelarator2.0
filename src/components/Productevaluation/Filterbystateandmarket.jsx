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

  /* ================= FETCH MEMBERSHIP REQUESTS (DASHBOARD STYLE) ================= */
  useEffect(() => {
    let mounted = true;

    const fetchRequests = async () => {
      const userId = effectiveUser?.id;
      const email = effectiveUser?.email;

      if (!userId && !email) return;

      try {
        let breeders = [];
        let accelerators = [];

        /* ===== BREEDER ===== */

        // ⭐ FIRST: EMAIL FILTER
        if (email) {
          const byEmail = await api
            .get(`/breeder-requests?filters[email][$eq]=${encodeURIComponent(email)}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          breeders = byEmail.data.data || [];
        }

        // ⭐ FALLBACK: RELATION FILTERd
        if (!breeders.length && userId) {
          const byUser = await api
            .get(`/breeder-requests?filters[users_permissions_user][id][$eq]=${userId}&populate=*`)
            .catch(() => ({ data: { data: [] } }));

          breeders = byUser.data.data || [];
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

        console.log("✅ Requests loaded:", {
          breeders,
          accelerators,
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

  const isApproved = breederApproved || acceleratorApproved;

  console.log("🔍 Approval Debug:", {
    breederApproved,
    acceleratorApproved,
    isApproved,
  });

  /* ================= NOT LOGGED IN ================= */
  if (!isAuthenticated) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-green-50 border border-green-200 rounded-xl p-10 text-center shadow-sm">
          <Typography variant="h1">Product Evaluation Information</Typography>
          <Typography variant="h2" className="mt-4">
            Please log in or register for a free account.
          </Typography>

          <div className="flex gap-4 mt-8 justify-center">
            <Link to="/network-members#register" className="px-6 py-3 bg-green-700 text-white rounded-md">
              Register Now
            </Link>

            <Link to="/login" className="px-6 py-3 border border-green-700 text-green-700 rounded-md">
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
        <Typography variant="h1">⛔ Account Blocked</Typography>
      </div>
    );
  }

  /* ================= APPROVAL PENDING ================= */
  if (!isApproved) {
    return (
      <div className="py-32 flex justify-center">
        <div className="w-full max-w-2xl bg-yellow-50 border-2 border-yellow-200 rounded-xl p-12 text-center shadow-lg">
          <Typography variant="h1">Approval Pending</Typography>
          <Typography variant="h2">
            Your account is created but waiting for admin approval.
          </Typography>

          <Link to="/dashboard" className="px-6 py-3 bg-yellow-600 text-white rounded-md mt-6 inline-block">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  /* ================= APPROVED CONTENT ================= */

  const rawGraphData = Stateandmarketes?.[0]?.graphData || [];

  const extractYear = (marketSegment) => {
    const match = marketSegment.match(/(\d{4})/);
    return match ? match[1] : "";
  };

  const graphData = rawGraphData.map(item => ({
    state: (item?.state || "").trim(),
    marketSegment: (item?.marketSegment || "").trim(),
    year: extractYear(item?.marketSegment || ""),
    src: item?.src || ""
  }));

  return (
    <div className="min-h-screen container mx-auto mt-10 bg-gray-100 p-6">
      <Typography variant="h1" className="text-2xl font-bold mb-6">
        Product Evaluation Information
      </Typography>

      <div className="text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full mb-6">
        Approved ✅ {effectiveUser?.email}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {graphData.map((g, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <img src={g.src} alt={g.state} className="w-full h-48 object-cover" />
            <div className="p-4 bg-gray-50">
              <h4 className="font-semibold text-sm">{g.state}</h4>
              <p className="text-xs">{g.marketSegment}</p>
              <p className="text-xs text-blue-600">{g.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}