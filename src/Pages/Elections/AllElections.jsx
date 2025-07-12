import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Plus,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image
} from 'lucide-react';

// ===================================================================================
// DUMMY DATA & API SIMULATION
// ===================================================================================
const mockElections = [
    { id: 1, name: 'जनमत सर्वेक्षण-असम 2025', date: '2025-06-23', status: 'Active', updatedOn: '2021-12-07 12:04:56', description: '<p>This is the detailed description for the <strong>Assam 2025</strong> election.</p>' },
    // Add more mock data here if needed for testing pagination
];

const apiHandler = async (action, data) => {
    console.log(`[API SIMULATION] Action: ${action}`, data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`[API SIMULATION] '${action}' successful!`);
    return { success: true, message: `${action} successful!` };
};

// ===================================================================================
// REUSABLE UI COMPONENTS
// ===================================================================================
const StatCard = ({ icon: Icon, title, value, colorClass, iconBgClass }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
        <div className={`p-3 rounded-full ${iconBgClass}`}><Icon className={`h-6 w-6 ${colorClass}`} /></div>
        <div><p className={`text-lg font-bold ${colorClass}`}>{title}</p><p className="text-2xl font-semibold text-gray-700">{value}</p></div>
    </div>
);

const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{status}</span>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const pages = [...Array(totalPages).keys()].map(i => i + 1);
    return (
        <nav className="flex items-center justify-end space-x-2 text-sm">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="h-4 w-4 transform rotate-180" /></button>
            {pages.map(page => (<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}>{page}</button>))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="h-4 w-4" /></button>
        </nav>
    );
};

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center p-4 border-b"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button></div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

// Custom Rich Text Editor Component
const RichTextEditor = ({ content, onChange, height = 200 }) => {
    const editorRef = useRef(null);

    const executeCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
        handleEditorChange();
    };

    const handleEditorChange = () => {
        if (editorRef.current && onChange) {
            onChange(editorRef.current.innerHTML);
        }
    };

    // Set initial content when component mounts or content prop changes
    React.useEffect(() => {
        if (editorRef.current && content !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = content || '';
        }
    }, [content]);

    return (
        <div className="border border-gray-300 rounded-md">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
                <button 
                    type="button" 
                    onClick={() => executeCommand('bold')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button 
                    type="button" 
                    onClick={() => executeCommand('italic')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button 
                    type="button" 
                    onClick={() => executeCommand('underline')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Underline"
                >
                    <Underline className="w-4 h-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                <button 
                    type="button" 
                    onClick={() => executeCommand('insertUnorderedList')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>
                <button 
                    type="button" 
                    onClick={() => executeCommand('insertOrderedList')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                <button 
                    type="button" 
                    onClick={() => executeCommand('justifyLeft')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button 
                    type="button" 
                    onClick={() => executeCommand('justifyCenter')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button 
                    type="button" 
                    onClick={() => executeCommand('justifyRight')} 
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </button>
            </div>
            
            {/* Editor Content Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorChange}
                className="p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ 
                    minHeight: `${height}px`, 
                    maxHeight: `${height * 2}px`, 
                    overflowY: 'auto',
                    lineHeight: '1.5'
                }}
                dangerouslySetInnerHTML={{ __html: content || '' }}
            />
        </div>
    );
};

// ===================================================================================
// MAIN AllElections COMPONENT
// ===================================================================================

const AllElections = () => {
    const navigate = useNavigate();
    const [elections, setElections] = useState(mockElections);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalState, setModalState] = useState({ type: null, data: null });
    const [isLoading, setIsLoading] = useState(false);
    
    const ITEMS_PER_PAGE = 10;

    const stats = useMemo(() => ({
        total: elections.length,
        active: elections.filter(e => e.status === 'Active').length,
        inactive: elections.filter(e => e.status === 'Inactive').length,
    }), [elections]);

    const paginatedElections = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return elections.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [elections, currentPage]);

    const totalPages = Math.ceil(elections.length / ITEMS_PER_PAGE);

    const handleSelectAll = (e) => setSelectedIds(e.target.checked ? paginatedElections.map(el => el.id) : []);
    const handleSelectOne = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(elId => elId !== id) : [...prev, id]);
    
    // --- Modal and Action Handlers ---
    const closeModal = () => setModalState({ type: null, data: null });
    const handleAdd = () => navigate('/add-election');
    const handleView = (election) => setModalState({ type: 'view', data: election });
    const handleEdit = (election) => setModalState({ type: 'edit', data: { ...election } });
    const handleDelete = (election) => setModalState({ type: 'delete', data: election });
    
    const handleFormSubmit = async (e, election, action) => {
        e.preventDefault();
        setIsLoading(true);
        const updatedData = { ...modalState.data };
        await apiHandler(action, updatedData);
        
        setElections(prev => prev.map(el => (el.id === election.id ? updatedData : el)));
        
        setIsLoading(false);
        closeModal();
    };

    const handleDeleteConfirm = async (electionId) => {
        setIsLoading(true);
        await apiHandler('Delete Election', { id: electionId });
        setElections(prev => prev.filter(el => el.id !== electionId));
        setIsLoading(false);
        closeModal();
    };
    
    const handleBulkDelete = async () => {
        setIsLoading(true);
        await apiHandler('Bulk Delete Elections', { ids: selectedIds });
        setElections(prev => prev.filter(el => !selectedIds.includes(el.id)));
        setSelectedIds([]);
        setIsLoading(false);
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(/ /g, '-');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-6">
                <h1 className="text-2xl font-light text-gray-700">Election <span className="text-gray-400">Election</span></h1>
                <nav aria-label="breadcrumb" className="mt-2">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><a href="#" className="flex items-center text-red-500 hover:text-red-700"><Home className="h-4 w-4 mr-1.5" /> Home</a></li>
                        <li><ChevronRight className="h-4 w-4" /></li>
                        <li><a href="#" className="text-gray-600">Election</a></li>
                        <li><ChevronRight className="h-4 w-4" /></li>
                        <li><span className="font-medium text-red-500">Election</span></li>
                    </ol>
                </nav>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard icon={FileText} title="Total" value={stats.total} colorClass="text-red-600" iconBgClass="bg-red-100" />
                <StatCard icon={CheckCircle2} title="Active" value={stats.active} colorClass="text-green-600" iconBgClass="bg-green-100" />
                <StatCard icon={AlertTriangle} title="Inactive" value={stats.inactive} colorClass="text-orange-600" iconBgClass="bg-orange-100" />
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Election( Total Record: {stats.total} )</h2>
                    <button onClick={handleAdd} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600">
                        <Plus className="h-4 w-4 mr-2" /> Add New
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 w-4">
                                    <input 
                                        type="checkbox" 
                                        onChange={handleSelectAll} 
                                        checked={selectedIds.length === paginatedElections.length && paginatedElections.length > 0} 
                                        className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                                    />
                                </th>
                                <th className="p-3 font-semibold text-gray-600">Id</th>
                                <th className="p-3 font-semibold text-gray-600">Election Name</th>
                                <th className="p-3 font-semibold text-gray-600">Election Date</th>
                                <th className="p-3 font-semibold text-gray-600">Status</th>
                                <th className="p-3 font-semibold text-gray-600">Updated On</th>
                                <th className="p-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedElections.map(election => (
                                <tr key={election.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedIds.includes(election.id)} 
                                            onChange={() => handleSelectOne(election.id)} 
                                            className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                                        />
                                    </td>
                                    <td className="p-3 text-gray-700">{election.id}</td>
                                    <td className="p-3 text-gray-700">{election.name}</td>
                                    <td className="p-3 text-gray-700">{formatDate(election.date)}</td>
                                    <td className="p-3"><StatusBadge status={election.status} /></td>
                                    <td className="p-3">
                                        <span className="bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">
                                            {election.updatedOn}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex space-x-1">
                                            <button 
                                                onClick={() => handleView(election)} 
                                                className="p-1.5 rounded bg-gray-100 hover:bg-gray-200"
                                                title="View"
                                            >
                                                <Search className="h-4 w-4 text-gray-600" />
                                            </button>
                                            <button 
                                                onClick={() => handleEdit(election)} 
                                                className="p-1.5 rounded bg-blue-100 hover:bg-blue-200"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4 text-blue-600" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(election)} 
                                                className="p-1.5 rounded bg-red-100 hover:bg-red-200"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </button>
                                            <button 
                                                className={`p-1.5 rounded ${election.status === 'Active' ? 'bg-green-100' : 'bg-orange-100'}`}
                                                title={`Status: ${election.status}`}
                                            >
                                                <div className={`h-4 w-4 rounded-full ${election.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 flex justify-end">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>

            {selectedIds.length > 0 && (
                <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-red-600 text-white p-2 shadow-lg flex items-center justify-between transition-transform duration-300 ease-in-out">
                    <span className="text-sm font-medium pl-4">{selectedIds.length} election(s) selected</span>
                    <div className="space-x-2">
                        <button onClick={handleBulkDelete} className="px-3 py-1 bg-red-800 rounded text-xs hover:bg-red-900">
                            Delete Selected
                        </button>
                    </div>
                    <button onClick={() => setSelectedIds([])} className="pr-4">
                        <X className="h-5 w-5"/>
                    </button>
                </div>
            )}
            
            {/* View Modal */}
            <Modal isOpen={modalState.type === 'view'} onClose={closeModal} title="View Election Details">
                {modalState.data && (
                    <div className="space-y-3 text-sm">
                        <p><strong>ID:</strong> {modalState.data.id}</p>
                        <p><strong>Name:</strong> {modalState.data.name}</p>
                        <p><strong>Date:</strong> {formatDate(modalState.data.date)}</p>
                        <p><strong>Status:</strong> <StatusBadge status={modalState.data.status} /></p>
                        <p><strong>Last Updated:</strong> {modalState.data.updatedOn}</p>
                        <div className="pt-2">
                            <strong>Description:</strong>
                            <div className="prose prose-sm max-w-none mt-1" dangerouslySetInnerHTML={{ __html: modalState.data.description }} />
                        </div>
                    </div>
                )}
            </Modal>
            
            {/* Edit Modal */}
            <Modal isOpen={modalState.type === 'edit'} onClose={closeModal} title="Edit Election">
                {modalState.data && (
                    <div onSubmit={(e) => handleFormSubmit(e, modalState.data, 'Edit Election')} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Election Name</label>
                            <input 
                                name="name" 
                                value={modalState.data.name} 
                                onChange={(e) => setModalState(prev => ({ ...prev, data: { ...prev.data, name: e.target.value } }))} 
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Election Date</label>
                            <input 
                                type="date" 
                                name="date" 
                                value={modalState.data.date} 
                                onChange={(e) => setModalState(prev => ({ ...prev, data: { ...prev.data, date: e.target.value } }))} 
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <RichTextEditor
                                content={modalState.data.description}
                                onChange={(content) => setModalState(prev => ({ ...prev, data: { ...prev.data, description: content } }))}
                                height={200}
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button 
                                onClick={(e) => handleFormSubmit(e, modalState.data, 'Edit Election')} 
                                disabled={isLoading} 
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-red-300"
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
            
            {/* Delete Modal */}
            <Modal isOpen={modalState.type === 'delete'} onClose={closeModal} title="Confirm Deletion">
                {modalState.data && (
                    <div>
                        <p>Are you sure you want to delete the election "<strong>{modalState.data.name}</strong>"?</p>
                        <div className="flex justify-end space-x-3 pt-6">
                            <button onClick={closeModal} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDeleteConfirm(modalState.data.id)} 
                                disabled={isLoading} 
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-red-300"
                            >
                                {isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AllElections;