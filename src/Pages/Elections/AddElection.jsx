import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Menu, Send, RotateCcw, ArrowLeft } from 'lucide-react';
// --- FIX: Using SunEditor instead of ReactQuill ---
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS

// ===================================================================================
// DUMMY API HANDLER
// ===================================================================================
const handleApiSubmission = async (formData) => {
  console.log('[API SIMULATION] Submitting form data...');
  console.log('[API SIMULATION] Data to be sent:', formData);
  await new Promise(resolve => setTimeout(resolve, 1500));
  try {
    console.log('[API SIMULATION] Submission successful!');
    alert('Dummy API call successful! Check the console for the submitted data.');
  } catch (error) {
    console.error('[API SIMULATION] Error:', error);
    alert('An error occurred during submission.');
  }
};

// ===================================================================================
// REUSABLE UI COMPONENTS
// ===================================================================================
const Card = ({ children, className }) => (<div className={`bg-white border border-gray-200 shadow-sm ${className}`}>{children}</div>);
const CardHeader = ({ children, className }) => (<div className={`p-4 border-b border-gray-200 flex justify-between items-center ${className}`}>{children}</div>);
const CardTitle = ({ children, className }) => (<h3 className={`text-lg font-semibold text-gray-800 flex items-center ${className}`}>{children}</h3>);
const CardContent = ({ children, className }) => (<div className={`p-4 md:p-6 ${className}`}>{children}</div>);
const FormRow = ({ label, children, required = false }) => (
  <div className="flex flex-col md:flex-row py-4 border-b border-dotted border-gray-300">
    <label className="w-full md:w-1/4 mb-2 md:mb-0 text-sm font-medium text-gray-700 pr-4 flex items-start md:items-center">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="w-full md:w-3/4">
      {children}
    </div>
  </div>
);

// ===================================================================================
// MAIN AddElection COMPONENT
// ===================================================================================
const AddElection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    electionName: '',
    state: '',
    electionDate: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDescriptionChange = (content) => {
    // Prevent the editor from setting the initial state to "<p><br></p>"
    if (content === '<p><br></p>') {
      setFormData(prev => ({ ...prev, description: '' }));
    } else {
      setFormData(prev => ({ ...prev, description: content }));
    }
  };

  const handleReset = () => {
    setFormData({ electionName: '', state: '', electionDate: '', description: '' });
    alert('Form has been reset.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { electionName, state, electionDate, description } = formData;
    if (!electionName || !state || !electionDate || !description) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsLoading(true);
    await handleApiSubmission(formData);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-6 flex justify-between items-center">
        <div><h1 className="text-2xl font-light text-gray-700">Election <span className="text-gray-400">Add Election</span></h1></div>
        <div><div className="w-10 h-12 bg-gray-200/80 rounded"></div></div>
      </header>
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li><a href="#" className="flex items-center text-red-500 hover:text-red-700"><Home className="h-4 w-4 mr-1.5" /> Home</a></li>
          <li><ChevronRight className="h-4 w-4 text-gray-400" /></li>
          <li><a href="#" className="text-gray-600">Election</a></li>
          <li><ChevronRight className="h-4 w-4 text-gray-400" /></li>
          <li><span className="text-red-500 font-medium">Add Election</span></li>
        </ol>
      </nav>
      <Card>
        <CardHeader>
          <CardTitle><Menu className="h-5 w-5 mr-2 text-gray-600" /> Election</CardTitle>
          <button onClick={() => navigate(-1)} className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center"><ArrowLeft className="h-4 w-4 mr-1.5" /> Back</button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormRow label="Election Name" required>
              <input type="text" name="electionName" value={formData.electionName} onChange={handleChange} placeholder="Election Name" className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>
            <FormRow label="State" required>
              <select name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm bg-white">
                <option value="">Select State</option>
                <option value="Assam">Assam</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Bihar">Bihar</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </FormRow>
            <FormRow label="Election Date" required>
              <input type="date" name="electionDate" value={formData.electionDate} onChange={handleChange} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-400 text-sm" />
            </FormRow>
            <FormRow label="Election Description" required>
              {/* --- FIX: Replaced ReactQuill with SunEditor --- */}
              <SunEditor
                setContents={formData.description}
                onChange={handleDescriptionChange}
                setOptions={{
                  height: 250,
                  buttonList: [
                    ['font', 'fontSize', 'formatBlock'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['removeFormat'],
                  ],
                }}
              />
            </FormRow>
            <div className="flex justify-start space-x-3 pt-6">
              <button type="submit" disabled={isLoading} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300">
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

export default AddElection;