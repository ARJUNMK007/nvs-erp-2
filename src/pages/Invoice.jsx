import React from "react";

const Invoice = () => {
  return (
    <div style={styles.invoiceContainer}>
      {/* Header */}
      <div style={styles.headerContainer}>
        <div style={styles.companyInfo}>
          <h2 style={styles.companyTitle}>THERMICRAFT INDUSTRIES</h2>
          <p>515/3, Bharathi Street, Chinnavedampatty,</p>
          <p>Coimbatore, Tamil Nadu, 641049</p>
          <p>GTSIN: 33AATFB4671D2Q</p>
          <p>PAN Number: AATFB467D</p>
          <p>Mobile: 9843094987</p>
          <p>Email: info@thermicraft.com</p>
        </div>
        <div style={styles.invoiceInfo}>
          <p>Invoice No: TC/24-25/37</p>
          <p>Invoice Date: 09/08/2024</p>
          <p>Alternative No: 9768087860</p>
        </div>
      </div>

      <hr style={styles.line} />

      {/* Bill To and Ship To */}
      <div style={styles.addressContainer}>
        <div style={styles.billTo}>
          <h3>Bill To</h3>
          <p>BHEEMAS CONTROLS</p>
          <p>Address: 55D/1 ST FLOOR, GREY TOWN,</p>
          <p>DR. NANJAPPA ROAD, Coimbatore, 641018</p>
          <p>GTSIN: 33AAMFB0570C1ZZ</p>
        </div>
        <div style={styles.shipTo}>
          <h3>Ship To</h3>
          <p>BHEEMAS CONTROLS</p>
          <p>Address: 55D/1 ST FLOOR, GREY TOWN,</p>
          <p>DR. NANJAPPA ROAD, Coimbatore, 641018</p>
        </div>
      </div>

      <hr style={styles.line} />

      {/* Items Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>S.NO</th>
            <th style={styles.th}>ITEMS</th>
            <th style={styles.th}>HSN</th>
            <th style={styles.th}>QTY</th>
            <th style={styles.th}>RATE</th>
            <th style={styles.th}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>1</td>
            <td style={styles.td}>Muffle 5x5x10</td>
            <td style={styles.td}>69032090</td>
            <td style={styles.td}>1 NOS</td>
            <td style={styles.td}>2,500</td>
            <td style={styles.td}>2,500</td>
          </tr>
        </tbody>
      </table>

      <hr style={styles.line} />

      {/* Tax and Total Section */}
      <div style={styles.taxSection}>
        <p>CGST @9%: ₹ 225</p>
        <p>SGST @9%: ₹ 225</p>
        <p>Total: ₹ 2,950</p>
      </div>

      <hr style={styles.line} />

      {/* Footer */}
      <div style={styles.footer}>
        <p>Thermicraft Industries | Bank Details</p>
        <p>Account No: 51900901017285 | IFSC Code: CIUB0000428</p>
        <p>City Union Bank, GANAPATHY</p>
      </div>

      <hr style={styles.line} />
    </div>
  );
};

const styles = {
  invoiceContainer: {
    width: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid black",
    fontFamily: "Arial, sans-serif",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  companyInfo: {
    width: "60%",
  },
  companyTitle: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  invoiceInfo: {
    width: "40%",
    textAlign: "right",
  },
  addressContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  billTo: {
    width: "45%",
  },
  shipTo: {
    width: "45%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid black",
    padding: "8px",
    backgroundColor: "#f0f0f0",
  },
  td: {
    border: "1px solid black",
    padding: "8px",
    textAlign: "center",
  },
  line: {
    margin: "20px 0",
    border: "0",
    height: "1px",
    background: "black",
  },
  taxSection: {
    marginTop: "20px",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
  },
};

export default Invoice;
