import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../assets/logo.png"

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
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },
    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },

    { id: 11, name: "Item 11", hsn: "69032099", qty: 1, rate: 3500, amount: 3500 },
    { id: 12, name: "Item 12", hsn: "69032100", qty: 2, rate: 500, amount: 1000 },

    // Add more items as needed
  ]);

  const taxPercentage = 9;

  const componentRef = useRef();

  const calculateTotals = () => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (totalAmount * taxPercentage) / 100;
    const totalWithTax = totalAmount + taxAmount * 2;
    return { totalAmount, taxAmount, totalWithTax };
  };

  const { totalAmount, taxAmount, totalWithTax } = calculateTotals();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
    pageStyle: `
      @page {
        size: auto;
        margin: 10mm;
      }
      @media print {
        textarea,
        input {
          border: none !important;
          box-shadow: none !important;
        }
        .bill-to,
        .ship-to {
          border: none !important;
          box-shadow: none !important;
        }
      }
      .page-break {
        page-break-before: always;
      }
      
    `,
  });

  const itemsPerPage = 10;
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  return (
    <div className=" w-full h-[80vh] overflow-x-scroll scrollbar-hide">
      <button
        onClick={handlePrint}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Print Invoice
      </button>

      <div ref={componentRef}>
        {pages.map((pageItems, pageIndex) => (
          <div key={pageIndex}>
            {/* First Page */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img
                    src={logo}// Replace with your logo path
                    alt="Logo"
                    className="w-24 h-auto mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">THERMICRAFT INDUSTRIES</h2>
                    <p>515/3, Bharathi Street, Chinnavedampatty,</p>
                    <p>Coimbatore, Tamil Nadu, 641049</p>
                    <p>GTSIN: 33AATFB4671D2Q</p>
                    <p>PAN Number: AATFB467D</p>
                    <p>Mobile: 9843094987</p>
                    <p>Email: info@thermicraft.com</p>
                  </div>
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
                    <label className="font-bold">Invoice Date: </label>
                    <input
                      className="border p-1"
                      type="date"
                      value={invoiceInfo.invoiceDate}
                      onChange={(e) =>
                        setInvoiceInfo({ ...invoiceInfo, invoiceDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
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

              {/* Bill To and Ship To - Full Size */}
              <div className="flex justify-between mb-4">
                <div className="w-1/2 bill-to">
                  <h3 className="font-bold mb-2">Bill To</h3>
                  <div className="p-2 border">
                    <p>{billTo.name}</p>
                    <p>{billTo.address}</p>
                    <p>GSTIN: {billTo.gstin}</p>
                  </div>
                </div>

                <div className="w-1/2 ship-to">
                  <h3 className="font-bold mb-2">Ship To</h3>
                  <div className="p-2 border">
                    <p>{shipTo.name}</p>
                    <p>{shipTo.address}</p>
                  </div>
                </div>
              </div>

              <hr className="border-t-2 border-black mb-4" />

              {/* Items Table */}
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
                  {pageItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border border-black p-2 text-center">
                        {index + pageIndex * itemsPerPage + 1}
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

              {/* Page Break */}
              {pageIndex < pages.length - 1 && <div className="page-break"></div>}
            </div>

            {/* Footer */}
            {pageIndex < pages.length - 1 && (
              <div className="no-footer flex justify-between flex-row ">
                <div>
                <hr className="border-t-2 border-black my-4" />
                <div className="mt-4 text-left">
                  <p><strong>Thermicraft Industries | Bank Details</strong></p>
                  <p>Account No: 51900901017285 | IFSC Code: CIUB0000428</p>
                  <p>City Union Bank, GANAPATHY</p>
                  </div>
                  <div className="mt-8">
                    <p><strong>Signature:</strong></p>
                    <div className="border-dashed border-2 border-gray-400 h-16 w-48 mt-4"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Totals */}
        <div className="flex justify-between mt-4">
          <div className="mt-4 text-left">
            <p><strong>Thermicraft Industries | Bank Details</strong></p>
            <p>Account No: 51900901017285 | IFSC Code: CIUB0000428</p>
            <p>City Union Bank, GANAPATHY</p>
          </div>

          <table className="w-1/3 border-collapse">
            <tbody>
              <tr>
                <td className="border border-black p-2">Total</td>
                <td className="border border-black p-2 text-right">{totalAmount}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">CGST ({taxPercentage}%) ({totalAmount})</td>
                <td className="border border-black p-2 text-right">{taxAmount}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">SGST ({taxPercentage}%) ({totalAmount})</td>
                <td className="border border-black p-2 text-right">{taxAmount}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold">Total with Tax</td>
                <td className="border border-black p-2 font-bold text-right">{totalWithTax}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
