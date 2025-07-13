import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, FileText, Menu, RefreshCw } from 'lucide-react';

// --- Mocked UI Components (equivalent to shadcn/ui) ---
const Card = ({ children, className = "" }) => <div className={`bg-white border border-gray-200/90 rounded-lg shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`p-4 border-b border-gray-200/90 ${className}`}>{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`${className}`}>{children}</div>;
const CardFooter = ({ children, className = "" }) => <div className={`p-6 border-t border-gray-200/90 ${className}`}>{children}</div>;

const Input = (props) => (
    <input
        {...props}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`}
    />
);

const Select = ({ children, value, onChange, name, placeholder, className }) => (
    <div className="relative w-full">
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={`flex h-10 w-full appearance-none items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50 ${value ? 'text-gray-800' : 'text-gray-400'} ${className}`}
        >
            <option value="" disabled>{placeholder}</option>
            {children}
        </select>
        <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 opacity-50" />
    </div>
);
// --- End of Mocked UI Components ---


const FormRow = ({ label, required, children }) => (
    <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-y-2 gap-x-8 py-4 px-6 border-b border-gray-200/90 last:border-b-0">
        <label className="text-sm font-semibold text-gray-700 md:text-right md:col-span-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="md:col-span-3">
            {children}
        </div>
    </div>
);


const AddQuestions = () => {
    const navigate = useNavigate();
    const initialFormState = {
        electionId: '',
        parentQuestionId: '',
        question: '',
        questionType: '',
        questionPrefix: '',
        questionOrder: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleReset = () => {
        setFormData(initialFormState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.electionId || !formData.question || !formData.questionType || !formData.questionPrefix || !formData.questionOrder) {
            alert('Please fill all the required fields.');
            return;
        }

        setIsSubmitting(true);
        console.log("Submitting Form Data:", formData);

        try {
            // Hitting a dummy API
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const result = await response.json();
            
            if (response.ok) {
                console.log('Dummy API Response:', result);
                alert('Question submitted successfully! (Simulated)');
                handleReset(); // Reset form on success
            } else {
                throw new Error('API submission failed.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit question. Please check the console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FEFBFB] p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl sm:text-3xl text-[#5a5a5a]">
                        Question <span className="font-light text-[#6c757d]">Question Add Question</span>
                    </h1>
                    <div className="p-3 bg-gray-200/70 rounded-md">
                        <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                </header>

                <nav className="text-sm mb-6 text-[#986A6A]" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex items-center flex-wrap space-x-2">
                        <li className="flex items-center">
                            <Home className="h-4 w-4 mr-2" />
                            <a href="#" className="hover:underline">Home</a>
                        </li>
                        <li><span className="text-gray-400">›</span></li>
                        <li><a href="#" className="hover:underline">Question</a></li>
                        <li><span className="text-gray-400">›</span></li>
                        <li><a href="#" className="hover:underline">Question</a></li>
                        <li><span className="text-gray-400">›</span></li>
                        <li className="font-semibold">Add Question</li>
                    </ol>
                </nav>

                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-[#495057] flex items-center">
                            <Menu className="w-5 h-5 mr-3" />
                            Question
                        </h3>
                        <button 
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-[#EE4B4B] text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors">
                            Back
                        </button>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="p-0">
                            <FormRow label="Election" required>
                                <Select name="electionId" value={formData.electionId} onChange={handleInputChange} placeholder="Select Election">
                                    <option value="1">General Election 2024</option>
                                    <option value="2">State Assembly Election 2025</option>
                                </Select>
                            </FormRow>
                            <FormRow label="Parent Question">
                                 <Select name="parentQuestionId" value={formData.parentQuestionId} onChange={handleInputChange} placeholder="Select Question">
                                    <option value="101">What is your primary concern?</option>
                                    <option value="102">How do you rate the current government?</option>
                                </Select>
                            </FormRow>
                             <FormRow label="Question" required>
                                <Input 
                                    name="question" 
                                    value={formData.question} 
                                    onChange={handleInputChange} 
                                    placeholder="Question" 
                                />
                            </FormRow>
                            <FormRow label="Question Type" required>
                                 <Select name="questionType" value={formData.questionType} onChange={handleInputChange} placeholder="Select Question Type">
                                    <option value="single_choice">Single Choice</option>
                                    <option value="multiple_choice">Multiple Choice</option>
                                    <option value="text_input">Text Input</option>
                                </Select>
                            </FormRow>
                            <FormRow label="Question Prefix" required>
                                 <Select name="questionPrefix" value={formData.questionPrefix} onChange={handleInputChange} placeholder="Select Question Prefix">
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Select>
                            </FormRow>
                            <FormRow label="Question Order" required>
                                <Input 
                                    name="questionOrder"
                                    type="number"
                                    value={formData.questionOrder} 
                                    onChange={handleInputChange} 
                                    placeholder="Question Order" 
                                />
                            </FormRow>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center space-x-2">
                                <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-4 py-2 bg-[#EE4B4B] text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed">
                                    <ChevronRight className="w-4 h-4 mr-1" />
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                                <button type="button" onClick={handleReset} className="inline-flex items-center px-4 py-2 bg-[#F5B440] text-white text-sm font-medium rounded-md hover:bg-yellow-500 transition-colors">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Reset
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddQuestions;