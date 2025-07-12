import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Menu, Send, RotateCcw, ArrowLeft } from 'lucide-react';

// ===================================================================================
// DUMMY API HANDLER
// Simulates sending form data (including a file) to a backend.
// ===================================================================================
const handleApiSubmission = async (formData) => {
  console.log('[API SIMULATION] Submitting form data...');
  
  // Log the FormData entries to see what would be sent.
  for (let [key, value] of formData.entries()) {
    console.log(`[API SIMULATION] Data: ${key}`, value);
  }

  // Simulate network delay for the upload process
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // In a real application, you would use fetch like this:
    /*
    const response = await fetch('https://your-api.com/emoji', {
      method: 'POST',
      body: formData, // When using FormData, the browser sets the 'Content-Type' to 'multipart/form-data' automatically.
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    console.log('[API SIMULATION] Success:', result);
    alert('Emoji added successfully!');
    */
    
    // For this demo, we'll just simulate success
    console.log('[API SIMULATION] Submission successful!');
    alert('Dummy API call successful! Check the console for the submitted FormData.');

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
  <div className={`p-4 border-b border-gray-200 flex justify-between items-center ${className}`}>
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

const FormRow = ({ label, children, required = false }) => (
  <div className="flex flex-col md:flex-row py-4 border-b border-dotted border-gray-300">
    <label className="w-full md:w-1/4 mb-2 md:mb-0 text-sm font-medium text-gray-700 pr-4 flex items-center">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="w-full md:w-3/4">
      {children}
    </div>
  </div>
);

// ===================================================================================
// MAIN AddEmoji COMPONENT
// ===================================================================================
const AddEmoji = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [emojiImage, setEmojiImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setEmojiImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setEmojiImage(null);
      setImagePreview(null);
      alert('Please select a valid image file.');
    }
  };

  const handleReset = () => {
    setTitle('');
    setEmojiImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    alert('Form has been reset.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !emojiImage) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('emojiImage', emojiImage);

    await handleApiSubmission(formData);
    
    setIsLoading(false);
    // Optionally, navigate away or reset the form after successful submission
    // navigate('/emoji-list'); 
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-gray-700">Emoji <span className="text-gray-400">Add Emoji</span></h1>
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
          <li><a href="#" className="text-gray-600">Emoji</a></li>
          <li><ChevronRight className="h-4 w-4 text-gray-400" /></li>
          <li><span className="text-red-500 font-medium">Add Emoji</span></li>
        </ol>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>
            <Menu className="h-5 w-5 mr-2 text-gray-600" />
            Emoji
          </CardTitle>
          <button onClick={() => navigate(-1)} className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormRow label="Title" required>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" 
              />
            </FormRow>

            <FormRow label="Emoji Image" required>
              <div className="flex flex-col items-start">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-3">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Emoji Preview" className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-xs text-gray-400">Preview</span>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current.click()} 
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-500 rounded-md hover:bg-red-50"
                >
                  Select image
                </button>
              </div>
            </FormRow>

            <div className="flex justify-start space-x-3 pt-6">
              <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed">
                <ChevronRight className="h-4 w-4" />
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

export default AddEmoji;