import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

// --- Start of Mocked Icons (equivalent to lucide-react) ---
const Home = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const FileText = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M16 13H8"></path><path d="M10 9H8"></path><path d="M16 17H8"></path></svg>;
const CheckCircle2 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;
const AlertTriangle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>;
const Search = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>;
const Pencil = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>;
const X = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>;
const Circle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;
const ChevronLeft = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>;
const ChevronRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"></path></svg>;
// --- End of Mocked Icons ---

// --- Start of Mocked UI Components ---
const Card = ({ children, className = "" }) => <div className={`bg-white border border-gray-200/90 rounded-lg shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className = "" }) => <div className={`p-4 sm:p-5 border-b border-gray-200/90 ${className}`}>{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={`p-4 sm:p-6 ${className}`}>{children}</div>;
const CardFooter = ({ children, className = "" }) => <div className={`p-4 sm:p-5 border-t border-gray-200/90 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`text-lg font-semibold leading-none tracking-tight text-[#495057] ${className}`}>{children}</h3>;
// --- End of Mocked UI Components ---


const StatCard = ({ icon, label, value, colorClass, iconBgClass }) => (
    <Card className="flex items-center p-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${iconBgClass}`}>
            {icon}
        </div>
        <div className="ml-4 text-right flex-1">
            <p className={`text-2xl font-bold ${colorClass}`}>{label}</p>
            <p className="text-lg text-gray-600">{value}</p>
        </div>
    </Card>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, recordName }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        {message} <strong className="text-gray-800">{recordName}</strong>?
                    </p>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                    <button onClick={onConfirm} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                        Confirm
                    </button>
                    <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const AllLoksabha = () => {
    const navigate = useNavigate(); // 2. Initialize the hook
    const initialData = [
      { id: 99, name: 'Udalguri', code: 15, status: 'Active', updatedOn: '2025-06-23 18:18:39' },
      { id: 98, name: 'Darrang-Udalguri', code: 14, status: 'Active', updatedOn: '2025-06-23 18:16:09' },
      { id: 80, name: 'Test Loksabha', code: 1100, status: 'Active', updatedOn: '2024-07-07 08:29:21' },
    ];
    
    const [loksabhaData, setLoksabhaData] = useState(initialData);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);

    const counts = useMemo(() => {
        const total = loksabhaData.length;
        const active = loksabhaData.filter(item => item.status === 'Active').length;
        const inactive = total - active;
        return { total, active, inactive };
    }, [loksabhaData]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = loksabhaData.map(item => item.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev => 
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleAction = (action, record) => {
      if (action === 'delete') {
          setRecordToDelete(record);
          setDeleteModalOpen(true);
      } else {
          alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action for: ${record.name}`);
      }
    };

    const handleDeleteConfirm = async () => {
        if (!recordToDelete) return;
        console.log(`Attempting to delete record with ID: ${recordToDelete.id}`);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${recordToDelete.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Dummy API response: OK. Deleting from local state.');
                setLoksabhaData(prev => prev.filter(item => item.id !== recordToDelete.id));
                setSelectedRows(prev => prev.filter(id => id !== recordToDelete.id));
                alert(`Successfully deleted Loksabha: ${recordToDelete.name}`);
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Failed to delete record. Please check the console.");
        } finally {
            setDeleteModalOpen(false);
            setRecordToDelete(null);
        }
    };

    const handleBulkAction = (action) => {
      if (selectedRows.length === 0) {
          alert("Please select at least one record.");
          return;
      }
      alert(`Bulk Action: ${action} on ${selectedRows.length} record(s). IDs: ${selectedRows.join(', ')}`);
    };
    
    return (
        <div className="min-h-screen bg-[#FEFBFB] p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl sm:text-3xl text-[#5a5a5a]">
                        Loksabha <span className="font-light text-[#6c757d]">Loksabha</span>
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
                        <li><a href="#" className="hover:underline">Loksabha</a></li>
                        <li><span className="text-gray-400">›</span></li>
                        <li className="font-semibold">Loksabha</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <StatCard icon={<FileText className="w-8 h-8 text-white"/>} label="Total" value={counts.total} colorClass="text-[#EE4B4B]" iconBgClass="bg-[#EE4B4B]" />
                    <StatCard icon={<CheckCircle2 className="w-8 h-8 text-white"/>} label="Active" value={counts.active} colorClass="text-[#3B8D61]" iconBgClass="bg-[#3B8D61]" />
                    <StatCard icon={<AlertTriangle className="w-8 h-8 text-white" strokeWidth="1.5" />} label="Inactive" value={counts.inactive} colorClass="text-[#EC971F]" iconBgClass="bg-[#EC971F]" />
                </div>
                
                <Card>
                    <CardHeader className="flex flex-wrap items-center justify-between gap-4">
                        <CardTitle>Loksabha (Total Record: {counts.total})</CardTitle>
                        {/* 3. Update the onClick handler */}
                        <button 
                            onClick={() => navigate('/addloksabha')} 
                            className="px-4 py-2 bg-[#EE4B4B] text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors">
                            Add New
                        </button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-4"><input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === loksabhaData.length && loksabhaData.length > 0} className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500" /></th>
                                        <th scope="col" className="px-6 py-3 font-bold">Id</th>
                                        <th scope="col" className="px-6 py-3 font-bold">Name</th>
                                        <th scope="col" className="px-6 py-3 font-bold">Code</th>
                                        <th scope="col" className="px-6 py-3 font-bold">Status</th>
                                        <th scope="col" className="px-6 py-3 font-bold">Updated On</th>
                                        <th scope="col" className="px-6 py-3 font-bold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loksabhaData.map(item => (
                                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="w-4 p-4"><input type="checkbox" onChange={() => handleSelectRow(item.id)} checked={selectedRows.includes(item.id)} className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"/></td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                                            <td className="px-6 py-4">{item.name}</td>
                                            <td className="px-6 py-4">{item.code}</td>
                                            <td className="px-6 py-4">{item.status}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-[#F5B440] text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                                    {item.updatedOn}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center space-x-1">
                                                    <button onClick={() => handleAction('view', item)} className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"><Search className="w-4 h-4 text-gray-600" /></button>
                                                    <button onClick={() => handleAction('edit', item)} className="p-1.5 bg-[#5BC0DE] rounded hover:bg-cyan-400"><Pencil className="w-4 h-4 text-white" /></button>
                                                    <button onClick={() => handleAction('delete', item)} className="p-1.5 bg-[#D9534F] rounded hover:bg-red-600"><X className="w-4 h-4 text-white" /></button>
                                                    <button onClick={() => handleAction('status change', item)} className="p-1.5 bg-[#5CB85C] rounded hover:bg-green-600"><Circle className="w-4 h-4 text-white" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            {selectedRows.length > 0 ? (
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => handleBulkAction('Activate')} className="p-1.5 bg-[#5CB85C] rounded hover:bg-green-600"><Circle className="w-4 h-4 text-white" /></button>
                                    <button onClick={() => handleBulkAction('Deactivate')} className="p-1.5 bg-[#D9534F] rounded hover:bg-red-600"><X className="w-4 h-4 text-white" /></button>
                                    <button onClick={() => handleBulkAction('Delete')} className="p-1.5 bg-[#D9534F] rounded hover:bg-red-600"><X className="w-4 h-4 text-white" /></button>
                                </div>
                             ) : (
                                <div className="flex items-center space-x-2 invisible">
                                     <button className="p-1.5 bg-gray-300 rounded"><Circle className="w-4 h-4 text-white" /></button>
                                     <button className="p-1.5 bg-gray-300 rounded"><X className="w-4 h-4 text-white" /></button>
                                     <button className="p-1.5 bg-gray-300 rounded"><X className="w-4 h-4 text-white" /></button>
                                </div>
                            )}
                        </div>
                        <nav>
                            <ul className="inline-flex items-center -space-x-px">
                                <li><a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100"><ChevronLeft className="w-4 h-4"/></a></li>
                                <li><a href="#" aria-current="page" className="px-3 py-2 leading-tight text-white bg-[#EE4B4B] border border-[#EE4B4B]">1</a></li>
                                <li><a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"><ChevronRight className="w-4 h-4"/></a></li>
                            </ul>
                        </nav>
                    </CardFooter>
                </Card>
            </div>
            
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Loksabha Record"
                message="Are you sure you want to delete this record:"
                recordName={recordToDelete?.name}
            />
        </div>
    );
};

export default AllLoksabha;