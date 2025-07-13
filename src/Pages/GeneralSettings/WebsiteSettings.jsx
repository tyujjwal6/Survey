import React, { useState, useRef } from 'react';
import { Home, ChevronRight, Menu, Send, RotateCcw } from 'lucide-react';
import adminLogo from '../admin_logo.png'; // Adjust path and extension

// ===================================================================================
// DUMMY API HANDLER
// Simulates sending form data to a backend.
// ===================================================================================
const handleApiSubmission = async (formData) => {
  // We remove the file preview URL before sending, as the backend only needs the file itself.
  const { logoPreview, ...dataToSend } = formData;
  
  console.log('[API SIMULATION] Submitting form data...');
  console.log('[API SIMULATION] Data to be sent:', dataToSend);

  // Use FormData for file uploads
  const apiFormData = new FormData();
  Object.keys(dataToSend).forEach(key => {
    apiFormData.append(key, dataToSend[key]);
  });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // In a real app, you would use fetch like this:
    /*
    const response = await fetch('https://your-api.com/settings', {
      method: 'POST',
      body: apiFormData, // No 'Content-Type' header needed, browser sets it for FormData
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    console.log('[API SIMULATION] Success:', result);
    alert('Settings updated successfully!');
    */
    
    // For this demo, we'll just simulate success
    console.log('[API SIMULATION] Submission successful!');
    alert('Dummy API call successful! Check the console for the submitted data.');

  } catch (error) {
    console.error('[API SIMULATION] Error:', error);
    alert('An error occurred during submission.');
  }
};

// ===================================================================================
// REUSABLE UI COMPONENTS (Styled to mimic the image)
// ===================================================================================
const Card = ({ children, className }) => (
  <div className={`bg-white border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold text-gray-800 flex items-center ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 md:p-6 ${className}`}>
    {children}
  </div>
);

const FormRow = ({ label, children }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-dotted border-gray-300">
    <label className="w-full md:w-1/4 mb-2 md:mb-0 text-sm font-medium text-gray-700 pr-4">{label}</label>
    <div className="w-full md:w-3/4">
      {children}
    </div>
  </div>
);

// ===================================================================================
// MAIN WebsiteSettings COMPONENT
// ===================================================================================
const WebsiteSettings = () => {
  const initialData = {
    siteName: 'Vision Data',
    metaTitle: 'Vision Data',
    metaKeyword: 'Vision Data',
    metaDescription: 'Vision Data - Powered by Abhasthra Technology Pvt. Ltd',
    phoneNumber: '6350669414',
    siteStatus: 'active',
    copyrightText: 'Copyright © 2024 abhasthra.com All Rights Reserved.',
    pageSizeAdmin: 10,
    siteLogo: null,
  };
  
  // The logo from the image to use as the initial preview
  const initialLogoPreview = "https://i.imgur.com/As8d6hA.png";

  const [formData, setFormData] = useState(initialData);
  const [logoPreview, setLogoPreview] = useState(initialLogoPreview);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, siteLogo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setLogoPreview(initialLogoPreview);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    alert('Form has been reset.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleApiSubmission(formData);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-gray-700">General Settings</h1>
          <p className="text-sm text-gray-500">Website Settings</p>
        </div>
        <div>
           {/* Placeholder for right-side icon from image */}
          <div className="w-10 h-12 bg-gray-200/80 rounded"></div>
        </div>
      </header>

      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li><a href="#" className="flex items-center text-red-500 hover:text-red-700"><Home className="h-4 w-4 mr-1.5" /> Home</a></li>
          <li><ChevronRight className="h-4 w-4 text-gray-400" /></li>
          <li><a href="#" className="text-gray-600">General Settings</a></li>
          <li><ChevronRight className="h-4 w-4 text-gray-400" /></li>
          <li><span className="text-red-500 font-medium">Website Settings</span></li>
        </ol>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>
            <Menu className="h-5 w-5 mr-2 text-gray-600" />
            Website Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormRow label="Site Name">
              <input type="text" name="siteName" value={formData.siteName} onChange={handleChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>

            <FormRow label="Meta Title">
              <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>

            <FormRow label="Meta Keyword">
              <input type="text" name="metaKeyword" value={formData.metaKeyword} onChange={handleChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>

            <FormRow label="Meta Description">
              <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows="3" className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm resize-y" />
            </FormRow>

            <FormRow label="Phone Number">
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>

            <FormRow label="Site Status">
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="siteStatus" value="active" checked={formData.siteStatus === 'active'} onChange={handleChange} className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500" />
                  <span className="ml-2 text-sm">Yes, Site is live.</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="siteStatus" value="inactive" checked={formData.siteStatus === 'inactive'} onChange={handleChange} className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500" />
                  <span className="ml-2 text-sm">Inactive</span>
                </label>
              </div>
            </FormRow>
            
            <FormRow label="Website copyright Text">
              <input type="text" name="copyrightText" value={formData.copyrightText} onChange={handleChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>
            
            <FormRow label="Page size admin">
              <input type="number" name="pageSizeAdmin" value={formData.pageSizeAdmin} onChange={handleChange} className="w-full md:w-1/4 px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>

            <FormRow label="Site Logo">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="p-2 border border-gray-300 rounded-md bg-white">
                   <img src={adminLogo} alt="Site Logo Preview" className="h-16 w-auto object-contain" />
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-500 rounded-md hover:bg-red-50">
                  Select image
                </button>
              </div>
            </FormRow>

            <div className="flex justify-start space-x-3 pt-6">
              <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed">
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" onClick={handleReset} disabled={isLoading} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-yellow-400 border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteSettings;