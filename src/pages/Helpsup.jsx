import React, { useState } from 'react';

function Helpsup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // Display success message
    setSuccessMessage('Submitted Successfully');
    
    // Clear form fields
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    // Hide the message after a few seconds (optional)
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Toggle popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
    setSuccessMessage(''); // Reset success message when popup is reopened
  };

  return (
    <div className="p-6 bg-[#f9f9f9] min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={togglePopup}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Open Help & Support Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={togglePopup}
          ></div>

          {/* Popup Modal */}
          <div className="bg-white p-6 rounded shadow-lg z-10 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Help & Support Form</h2>
            
            {successMessage && (
              <p className="text-green-600 font-semibold mb-4">{successMessage}</p>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Helpsup;
