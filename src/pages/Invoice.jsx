import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../assets/logo.png";
import { dataRef } from '../utils/Firebabse';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const Invoice = () => {
  const PoNoRef = dataRef.child('PO');
  
  const [selectedPo, setSelectedPo] = useState('');
  const [poNumbers, setPoNumbers] = useState([]);
  const [costData, setCostData] = useState([]);
  const [billTo, setBillTo] = useState({
    name: "",
    address: "",
    gstin: "",
  });

  const [shipTo, setShipTo] = useState({
    name: "",
    address: "",
  });

  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceNo: "",
    invoiceDate: "09/08/2024",
    alternativeNumber: "9768087860",
  });

  const [items, setItems] = useState([]);

  const taxPercentage = 9;
  const componentRef = useRef();

  useEffect(() => {
    // Fetch PO numbers
    PoNoRef.once('value', snapshot => {
      const poData = snapshot.val();
      const poNumbers = Object.keys(poData);
      setPoNumbers(poNumbers);
    });
  }, []);

  const handlePoChange = (poNo) => {
    setSelectedPo(poNo);

    // Fetch selected PO data
    PoNoRef.child(poNo).once('value', snapshot => {
      const poData = snapshot.val();
      setBillTo({
        name: poData.billedTo || "",
        address: "Default address", // Add address from your PO data if available
        gstin: "Default GSTIN", // Add gstin from your PO data if available
      });
      setShipTo({
        name: poData.shipTo || "",
        address: "Default address", // Add address from your PO data if available
      });
      setItems(poData.products || []);
  
      setInvoiceInfo(prev => ({
        ...prev,
        invoiceNo: poNo, // Set selected PO number as invoice number
      }));
    });
  };
  
  const handleHSNChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].hsn = value;
    setItems(updatedItems);
  };

  const calculateTotals = () => {
    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
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
      }
      .page-break {
        page-break-before: always;
      }
    `,
  });

  const itemsPerPage = 8;
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }
   const handleDownload = () => {
   
  };
  const handleBillToChange = (e) => {
    setBillTo({ ...billTo, name: e.target.value });
  };

  const handleShipToChange = (e) => {
    setShipTo({ ...shipTo, name: e.target.value });
  };
 
  return (
    <div className="w-full h-[80vh] overflow-x-scroll scrollbar-hide">
      <div className="flex justify-between mb-4">
        <select
          className="mr-4 w-[200px] bg-gray-100 rounded-lg"
          value={selectedPo}
          onChange={(e) => handlePoChange(e.target.value)}
        >
          <option value="">Select PO Number</option>
          {poNumbers.map(poNo => (
            <option key={poNo} value={poNo}>
              {poNo}
            </option>
          ))}
        </select>
        <div>
        
         <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1"
        >
          Print Invoice
        </button>
        </div>
      </div>

      <div ref={componentRef}>
        {pages.map((pageItems, pageIndex) => (
          <div key={pageIndex}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-24 h-auto mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">THERMICRAFT INDUSTRIES</h2>
                    <p>515/3, Bharathi Street, Chinnavedampatty</p>
                    <p>Coimbatore, Tamil Nadu, 641049</p>
                    <p>GTSIN: 33AATFB4671D2Q</p>
                    <p>PAN Number: AATFB467D</p>
                    <p>Mobile: 9843094987</p>
                    <p>Email: info@thermicraft.com</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="mb-2">
                    <label className="font-bold">Invoice No: &nbsp;&nbsp;&nbsp;</label>
                    <input
                      className="border p-1 w-[150px]"
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
                      className="border p-1 w-[150px]"
                      type="date"
                      value={invoiceInfo.invoiceDate}
                      onChange={(e) =>
                        setInvoiceInfo({ ...invoiceInfo, invoiceDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr className="border-t-2 border-black mb-4" />

              {/* Bill To and Ship To */}
              <div className="flex justify-between mb-4">
                <div className="w-1/2 bill-to">
                  <h3 className="font-bold mb-2">Bill To</h3>
                  <div className="p-2 ">
                  <input
            type="text"
            value={billTo.name}
            onChange={handleBillToChange}
            className="w-full border p-2"
          />
                  </div>
                </div>

                <div className="w-1/2 ship-to">
                  <h3 className="font-bold mb-2">Ship To</h3>
                  <div className="p-2 ">
                  <input
            type="text"
            value={shipTo.name}
            onChange={handleShipToChange}
            className="w-full border p-2"
          />
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
                    <th className="border border-black p-2 bg-gray-100">QTY</th>
                    <th className="border border-black p-2 bg-gray-100">HSN</th>
                    <th className="border border-black p-2 bg-gray-100">AMOUNT</th>
                 
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border border-black p-2 text-center">
                        {index + pageIndex * itemsPerPage + 1}
                      </td>
                      <td className="border border-black p-2">{item.itemName}</td>
                      <td className="border border-black p-2 text-center">{item.quantity}</td>
                      <td className="border border-black p-2 text-center">
                        <input
                          className="w-full p-1"
                          type="text"
                          value={item.hsn || ''}
                          onChange={(e) => handleHSNChange(index, e.target.value)}
                        />
                      </td>
                      <td className="border border-black p-2 text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="border-t-2 border-black my-4" />
            </div>

            {/* Totals */}
            <div className="flex justify-between mt-4">
              {/* Footer Section */}
              {pageIndex < pages.length - 1 ? (
                <div className="mt-4 text-left">
                  <p><strong>Thermicraft Industries | Bank Details</strong></p>
                  <p>Account No: 51900901017285 | IFSC: KARB0000519</p>
                  <p>Karnataka Bank Ltd, Coimbatore, Tamil Nadu</p>
                </div>
              ) : null}

           
            </div>

            {pageIndex === pages.length - 1 && (
              <div className="flex justify-between mt-4">
                <div className="mt-4 text-left">
                  <p><strong>Thermicraft Industries | Bank Details</strong></p>
                  <p>Account No: 51900901017285 | IFSC: KARB0000519</p>
                  <p>Karnataka Bank Ltd, Coimbatore, Tamil Nadu</p>
                </div>
           
              </div>
            )}

            {pageIndex < pages.length - 1 && <div className="page-break" />}
          </div>
        ))}
            <div className="text-right">
    <p className="mb-2"><strong>Taxable Amount: </strong>₹{totalAmount.toFixed(2)}</p>
    <p className="mb-2"><strong>CGST {taxPercentage}%: </strong>₹{taxAmount.toFixed(2)}</p>
    <p className="mb-2"><strong>SGST {taxPercentage}%: </strong>₹{taxAmount.toFixed(2)}</p>
    <p className="mb-2"><strong>Total Amount: </strong>₹{totalWithTax.toFixed(2)}</p>
  </div>



{/* Signature Section */}
<div className="flex justify-end mt-8">
  <div className="text-right">
    <p><strong>Signature:</strong></p>
    <div className="border-dashed border-2 border-gray-400 h-16 w-[250px] mt-4"></div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Invoice;
