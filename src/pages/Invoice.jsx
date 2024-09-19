import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const [billTo, setBillTo] = useState({
    name: "BHEEMAS CONTROLS",
    address: "55D/1 ST FLOOR, GREY TOWN, DR. NANJAPPA ROAD, Coimbatore, 641018",
    gstin: "33AAMFB0570C1ZZ",
  });

  const [shipTo, setShipTo] = useState({
    name: "BHEEMAS CONTROLS",
    address: "55D/1 ST FLOOR, GREY TOWN, DR. NANJAPPA ROAD, Coimbatore, 641018",
  });

  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceNo: "TC/24-25/37",
    invoiceDate: "09/08/2024",
    alternativeNumber: "9768087860",
  });

  const [items, setItems] = useState([
    { id: 1, name: "Muffle 5x5x10", hsn: "69032090", qty: 1, rate: 2500, amount: 2500 },
    { id: 2, name: "Muffle 5x5x10", hsn: "69032090", qty: 1, rate: 2500, amount: 2500 },
    { id: 3, name: "Item 3", hsn: "69032091", qty: 2, rate: 1500, amount: 3000 },
    { id: 4, name: "Item 4", hsn: "69032092", qty: 3, rate: 1000, amount: 3000 },
    { id: 5, name: "Item 5", hsn: "69032093", qty: 4, rate: 1200, amount: 4800 },
    { id: 6, name: "Item 6", hsn: "69032094", qty: 5, rate: 800, amount: 4000 },
    { id: 7, name: "Item 7", hsn: "69032095", qty: 1, rate: 750, amount: 750 },
    { id: 8, name: "Item 8", hsn: "69032096", qty: 2, rate: 900, amount: 1800 },
    { id: 9, name: "Item 9", hsn: "69032097", qty: 1, rate: 1250, amount: 1250 },
    { id: 10, name: "Item 10", hsn: "69032098", qty: 2, rate: 2000, amount: 4000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },

    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },

    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },{ id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
  ]);

  const taxPercentage = 9;

  const componentRef = useRef();

  // Calculate total amount and taxes
  const calculateTotals = () => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (totalAmount * taxPercentage) / 100;
    const totalWithTax = totalAmount + taxAmount * 2; // Assuming CGST and SGST
    return { totalAmount, taxAmount, totalWithTax };
  };

  const { totalAmount, taxAmount, totalWithTax } = calculateTotals();

  // Handle printing to PDF
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
    removePrintContainer: true, // Remove localhost URL from the PDF
    pageStyle: `
      @page {
        size: auto;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
      .page-break {
        page-break-before: always;
      }
    `,
  });

  // Split items into two arrays (first 10 and the rest)
  const firstPageItems = items.slice(0, 10);
  const secondPageItems = items.slice(10);

  return (
    <div>
      <button
        onClick={handlePrint}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Print Invoice
      </button>

      <div ref={componentRef}>
        {/* First Page */}
        <div>
          {/* Invoice Heading */}
          <h1 className="text-center text-2xl font-bold mb-6">INVOICE</h1>

          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold">THERMICRAFT INDUSTRIES</h2>
              <p>515/3, Bharathi Street, Chinnavedampatty,</p>
              <p>Coimbatore, Tamil Nadu, 641049</p>
              <p>GTSIN: 33AATFB4671D2Q</p>
              <p>PAN Number: AATFB467D</p>
              <p>Mobile: 9843094987</p>
              <p>Email: info@thermicraft.com</p>
            </div>

            <div className="text-right">
              <div className="mb-2">
                <label className="font-bold">Invoice No: </label>
                <input
                  className="border p-1"
                  type="text"
                  value={invoiceInfo.invoiceNo}
                  onChange={(e) =>
                    setInvoiceInfo({ ...invoiceInfo, invoiceNo: e.target.value })
                  }
                />
              </div>
              <div className="mb-2">
                <label className="font-bold">Alternative No: </label>
                <input
                  className="border p-1"
                  type="text"
                  value={invoiceInfo.alternativeNumber}
                  onChange={(e) =>
                    setInvoiceInfo({
                      ...invoiceInfo,
                      alternativeNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-black mb-4" />

          {/* Bill To and Ship To */}
          <div className="flex justify-between mb-4">
            <div className="w-1/2">
              <h3 className="font-bold mb-2">Bill To</h3>
              <textarea
                className="w-full border p-2 resize-none overflow-hidden"
                value={`${billTo.name}\n${billTo.address}\nGTSIN: ${billTo.gstin}`}
                onChange={(e) => {
                  const [name, address, gstin] = e.target.value.split("\n");
                  setBillTo({ name, address, gstin: gstin?.replace("GTSIN: ", "") });
                }}
                rows="1"
              />
            </div>

            <div className="w-1/2">
              <h3 className="font-bold mb-2">Ship To</h3>
              <textarea
                className="w-full border p-2 resize-none overflow-hidden"
                value={`${shipTo.name}\n${shipTo.address}`}
                onChange={(e) => {
                  const [name, address] = e.target.value.split("\n");
                  setShipTo({ name, address });
                }}
                rows="1"
              />
            </div>
          </div>

          <hr className="border-t-2 border-black mb-4" />

          {/* Items Table - First Page */}
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr>
                <th className="border border-black p-2 bg-gray-100">S.NO</th>
                <th className="border border-black p-2 bg-gray-100">ITEMS</th>
                <th className="border border-black p-2 bg-gray-100">HSN</th>
                <th className="border border-black p-2 bg-gray-100">QTY</th>
                <th className="border border-black p-2 bg-gray-100">RATE</th>
                <th className="border border-black p-2 bg-gray-100">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {firstPageItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-black p-2 text-center">{index + 1}</td>
                  <td className="border border-black p-2">{item.name}</td>
                  <td className="border border-black p-2 text-center">{item.hsn}</td>
                  <td className="border border-black p-2 text-center">{item.qty}</td>
                  <td className="border border-black p-2 text-right">{item.rate}</td>
                  <td className="border border-black p-2 text-right">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals for First Page */}
          {secondPageItems.length === 0 && (
            <div className="flex justify-end">
              <table className="w-1/2 border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-black p-2">Total Amount</td>
                    <td className="border border-black p-2 text-right">{totalAmount}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Add CGST {taxPercentage}%</td>
                    <td className="border border-black p-2 text-right">{taxAmount}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Add SGST {taxPercentage}%</td>
                    <td className="border border-black p-2 text-right">{taxAmount}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Grand Total</td>
                    <td className="border border-black p-2 text-right font-bold">
                      {totalWithTax}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Bank Details Footer */}
          <div className="mt-8">
            <h3 className="font-bold">Bank Details:</h3>
            <p>Name: Thermicraft Industries</p>
            <p>Bank: State Bank of India</p>
            <p>Account No: 1234567890</p>
            <p>IFSC: SBIN0000123</p>
          </div>

          {/* Page Break if there are more than 10 items */}
          {secondPageItems.length > 0 && <div className="page-break"></div>}
        </div>

        {/* Second Page (Header, Footer, and Remaining Items) */}
        {secondPageItems.length > 0 && (
          <div>
            {/* Replicate Invoice Heading */}
            <h1 className="text-center text-2xl font-bold mb-6">INVOICE</h1>

            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold">THERMICRAFT INDUSTRIES</h2>
                <p>515/3, Bharathi Street, Chinnavedampatty,</p>
                <p>Coimbatore, Tamil Nadu, 641049</p>
                <p>GTSIN: 33AATFB4671D2Q</p>
                <p>PAN Number: AATFB467D</p>
                <p>Mobile: 9843094987</p>
                <p>Email: info@thermicraft.com</p>
              </div>

              <div className="text-right">
                <div className="mb-2">
                  <label className="font-bold">Invoice No: </label>
                  <input
                    className="border p-1"
                    type="text"
                    value={invoiceInfo.invoiceNo}
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <label className="font-bold">Invoice Date: </label>
                  <input
                    className="border p-1"
                    type="date"
                    value={invoiceInfo.invoiceDate}
                    readOnly
                  />
                </div>
                <div>
                  <label className="font-bold">Alternative No: </label>
                  <input
                    className="border p-1"
                    type="text"
                    value={invoiceInfo.alternativeNumber}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <hr className="border-t-2 border-black mb-4" />

            {/* Items Table - Second Page */}
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th className="border border-black p-2 bg-gray-100">S.NO</th>
                  <th className="border border-black p-2 bg-gray-100">ITEMS</th>
                  <th className="border border-black p-2 bg-gray-100">HSN</th>
                  <th className="border border-black p-2 bg-gray-100">QTY</th>
                  <th className="border border-black p-2 bg-gray-100">RATE</th>
                  <th className="border border-black p-2 bg-gray-100">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {secondPageItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-black p-2 text-center">
                      {index + firstPageItems.length + 1}
                    </td>
                    <td className="border border-black p-2">{item.name}</td>
                    <td className="border border-black p-2 text-center">{item.hsn}</td>
                    <td className="border border-black p-2 text-center">{item.qty}</td>
                    <td className="border border-black p-2 text-right">{item.rate}</td>
                    <td className="border border-black p-2 text-right">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals for Second Page */}
            <div className="flex justify-end">
              <table className="w-1/2 border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-black p-2">Total Amount</td>
                    <td className="border border-black p-2 text-right">{totalAmount}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Add CGST {taxPercentage}%</td>
                    <td className="border border-black p-2 text-right">{taxAmount}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Add SGST {taxPercentage}%</td>
                    <td className="border border-black p-2 text-right">{taxAmount}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Grand Total</td>
                    <td className="border border-black p-2 text-right font-bold">
                      {totalWithTax}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bank Details Footer on Second Page */}
            <div className="mt-8">
              <h3 className="font-bold">Bank Details:</h3>
              <p>Name: Thermicraft Industries</p>
              <p>Bank: State Bank of India</p>
              <p>Account No: 1234567890</p>
              <p>IFSC: SBIN0000123</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
