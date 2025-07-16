import React from "react";

function CertificateList({ certificates }) {
  if (!certificates.length) return <p>No certificates found.</p>;

  return (
    <table border="1" cellPadding="10" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Recipient</th>
          <th>Course</th>
          <th>Issue Date</th>
          <th>Certificate Code</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((cert) => (
          <tr key={cert.id}>
            <td>{cert.recipient_name}</td>
            <td>{cert.course_name}</td>
            <td>{new Date(cert.issue_date).toLocaleDateString()}</td>
            <td>{cert.certificate_code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CertificateList;
