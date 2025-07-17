import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CertificateForm from "./CertificateForm";
import CertificateList from "./CertificateList";

function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const token = localStorage.getItem("token");

  // Fixed: useCallback ensures this function reference is stable
  const fetchCertificates = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/certificates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertificates(res.data.certificates);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchCertificates(); // Called once when the component mounts
  }, [fetchCertificates]); // ✅ Fixes the warning

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "30px" }}>
      <h2>Dashboard</h2>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>
      <CertificateForm onAdd={fetchCertificates} token={token} />
      <CertificateList certificates={certificates} />
    </div>
  );
}

export default Dashboard;
