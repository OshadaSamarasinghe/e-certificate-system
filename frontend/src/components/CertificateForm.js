import React, { useState } from "react";
import axios from "axios";

function CertificateForm({ onAdd, token }) {
  const [recipient_name, setRecipientName] = useState("");
  const [course_name, setCourseName] = useState("");
  const [issue_date, setIssueDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(
        "http://localhost:5000/api/certificates",
        { recipient_name, course_name, issue_date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecipientName("");
      setCourseName("");
      setIssueDate("");
      setSuccess("Certificate created!");
      onAdd();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create certificate");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <input
        type="text"
        placeholder="Recipient Name"
        value={recipient_name}
        onChange={(e) => setRecipientName(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="text"
        placeholder="Course Name"
        value={course_name}
        onChange={(e) => setCourseName(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="date"
        value={issue_date}
        onChange={(e) => setIssueDate(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <button type="submit" style={{ width: "100%", padding: "8px" }}>
        Create Certificate
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
      )}
    </form>
  );
}

export default CertificateForm;
