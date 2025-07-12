import React, { useState, useMemo } from 'react';
import { Home, ChevronRight, FileText, CheckCircle2, AlertTriangle, Search, Edit, Trash2, X, Plus, ChevronsLeft, ChevronsRight } from 'lucide-react';

// ===================================================================================
// DUMMY DATA & API SIMULATION
// ===================================================================================
const mockUsers = [
    { id: 14, parentName: 'Ajit Kumar Singh', name: 'Azizul rahman', role: 'OT', mobile: '8822835941', status: 'Inactive' },
    { id: 13, parentName: 'Manish Kumar', name: '9472650329', role: 'OT', mobile: null, status: 'Inactive' },
    { id: 4, parentName: 'Admin', name: 'Suman Shekhar', role: 'QC', mobile: '6350669415', status: 'Active' },
    { id: 12, parentName: 'Suman Shekhar', name: 'Manish Kumar', role: 'ZC', mobile: '9079365694', status: 'Active' },
    { id: 11, parentName: 'Suman Shekhar', name: 'Rajan bhardwaj', role: 'ZC', mobile: '7909055319', status: 'Active' },
    { id: 10, parentName: 'Suman Shekhar', name: 'Ajit Kumar Singh', role: 'ZC', mobile: '9262368453', status: 'Active' },
    { id: 15, parentName: 'Ajit Kumar Singh', name: 'Asis hussain', role: 'OT', mobile: '7975340173', status: 'Inactive' },
    { id: 16, parentName: 'Ajit Kumar Singh', name: 'Avinash', role: 'OT', mobile: '6003440743', status: 'Inactive' },
    { id: 17, parentName: 'Manish Kumar', name: 'Manish', role: 'OT', mobile: '9472650329', status: 'Inactive' },
    { id: 18, parentName: 'Ajit Kumar Singh', name: 'Bikram deka', role: 'OT', mobile: '8812820712', status: 'Inactive' },
    { id: 19, parentName: 'Admin', name: 'John Doe', role: 'Admin', mobile: '1234567890', status: 'Active' },
    { id: 20, parentName: 'Suman Shekhar', name: 'Jane Smith', role: 'QC', mobile: '0987654321', status: 'Active' },
];

// Dummy API handler
const apiHandler = async (action, data) => {
    console.log(`[API SIMULATION] Action: ${action}`, data);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`[API SIMULATION] '${action}' successful!`);
    // In a real app, you'd handle success/error from the server response
    return { success: true, message: `${action} successful!` };
};

// ===================================================================================
// REUSABLE UI COMPONENTS
// ===================================================================================

const StatCard = ({ icon: Icon, title, value, colorClass, iconBgClass }) => (
    <div className={`bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4`}>
        <div className={`p-3 rounded-full ${iconBgClass}`}>
            <Icon className={`h-6 w-6 ${colorClass}`} />
        </div>
        <div>
            <p className={`text-lg font-bold ${colorClass}`}>{title}</p>
            <p className="text-2xl font-semibold text-gray-700">{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
    }`}>
        {status}
    </span>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <nav className="flex items-center justify-end space-x-2 text-sm">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="h-4 w-4 transform rotate-180" />
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === page ? 'bg-red-500 text-white' : 'hover:bg-gray-100'
                    }`}
                >
                    {page}
                </button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
};

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// ===================================================================================
// MAIN AllUsers COMPONENT
// ===================================================================================

const AllUsers = () => {
    const [users, setUsers] = useState(mockUsers);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalState, setModalState] = useState({ type: null, user: null });
    const [isLoading, setIsLoading] = useState(false);
    
    const ITEMS_PER_PAGE = 10;

    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter(u => u.status === 'Active').length,
        inactive: users.filter(u => u.status === 'Inactive').length,
    }), [users]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return users.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [users, currentPage]);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUserIds(paginatedUsers.map(u => u.id));
        } else {
            setSelectedUserIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedUserIds(prev =>
            prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
        );
    };
    
    // --- Modal and Action Handlers ---
    const closeModal = () => setModalState({ type: null, user: null });

    const handleAdd = () => setModalState({ type: 'add', user: { name: '', parentName: '', role: '', mobile: '', status: 'Active' } });
    const handleView = (user) => setModalState({ type: 'view', user });
    const handleEdit = (user) => setModalState({ type: 'edit', user });
    const handleDelete = (user) => setModalState({ type: 'delete', user });
    
    const handleFormSubmit = async (e, user, action) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        await apiHandler(action, { id: user.id, ...data });

        if (action === 'Add User') {
            setUsers(prev => [...prev, { id: Date.now(), ...data }]);
        } else {
            setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, ...data } : u)));
        }
        
        setIsLoading(false);
        closeModal();
    };

    const handleDeleteConfirm = async (userId) => {
        setIsLoading(true);
        await apiHandler('Delete User', { id: userId });
        setUsers(prev => prev.filter(u => u.id !== userId));
        setIsLoading(false);
        closeModal();
    };

    const handleBulkAction = async (action) => {
        setIsLoading(true);
        await apiHandler(action, { ids: selectedUserIds });

        if (action === 'Delete Selected') {
            setUsers(prev => prev.filter(u => !selectedUserIds.includes(u.id)));
        } else if (action === 'Activate Selected') {
            setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, status: 'Active' } : u));
        } else if (action === 'Deactivate Selected') {
            setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, status: 'Inactive' } : u));
        }
        
        setSelectedUserIds([]);
        setIsLoading(false);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 font-sans">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-2xl font-light text-gray-700">Users <span className="text-gray-400">All Users</span></h1>
                <nav aria-label="breadcrumb" className="mt-2">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><a href="#" className="flex items-center text-red-500 hover:text-red-700"><Home className="h-4 w-4 mr-1.5" /> Home</a></li>
                        <li><ChevronRight className="h-4 w-4" /></li>
                        <li><span className="text-gray-500">Users</span></li>
                        <li><ChevronRight className="h-4 w-4" /></li>
                        <li><span className="font-medium text-red-500">All Users</span></li>
                    </ol>
                </nav>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard icon={FileText} title="Total" value={stats.total} colorClass="text-red-600" iconBgClass="bg-red-100" />
                <StatCard icon={CheckCircle2} title="Active" value={stats.active} colorClass="text-green-600" iconBgClass="bg-green-100" />
                <StatCard icon={AlertTriangle} title="Inactive" value={stats.inactive} colorClass="text-orange-600" iconBgClass="bg-orange-100" />
            </div>

            {/* Main Table Card */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">All Users( Total Record: {stats.total} )</h2>
                    <button onClick={handleAdd} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600">
                        <Plus className="h-4 w-4 mr-2" /> Add New
                    </button>
                </div>
                
                {/* Responsive Table Wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 w-4"><input type="checkbox" onChange={handleSelectAll} checked={selectedUserIds.length === paginatedUsers.length && paginatedUsers.length > 0} className="rounded border-gray-300 text-red-600 focus:ring-red-500" /></th>
                                <th className="p-3 font-semibold text-gray-600">User Id</th>
                                <th className="p-3 font-semibold text-gray-600">Parent Name</th>
                                <th className="p-3 font-semibold text-gray-600">Name</th>
                                <th className="p-3 font-semibold text-gray-600">Role</th>
                                <th className="p-3 font-semibold text-gray-600">Mobile Number</th>
                                <th className="p-3 font-semibold text-gray-600">Status</th>
                                <th className="p-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map(user => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3"><input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => handleSelectOne(user.id)} className="rounded border-gray-300 text-red-600 focus:ring-red-500" /></td>
                                    <td className="p-3 text-gray-700">{user.id}</td>
                                    <td className="p-3 text-gray-700">{user.parentName}</td>
                                    <td className="p-3 text-gray-700">{user.name}</td>
                                    <td className="p-3 text-gray-700">{user.role}</td>
                                    <td className="p-3 text-gray-500">{user.mobile || 'null'}</td>
                                    <td className="p-3"><StatusBadge status={user.status} /></td>
                                    <td className="p-3">
                                        <div className="flex space-x-1">
                                            <button onClick={() => handleView(user)} className="p-1.5 rounded bg-gray-100 hover:bg-gray-200"><Search className="h-4 w-4 text-gray-600" /></button>
                                            <button onClick={() => handleEdit(user)} className="p-1.5 rounded bg-blue-100 hover:bg-blue-200"><Edit className="h-4 w-4 text-blue-600" /></button>
                                            <button onClick={() => handleDelete(user)} className="p-1.5 rounded bg-red-100 hover:bg-red-200"><Trash2 className="h-4 w-4 text-red-600" /></button>
                                            <button className={`p-1.5 rounded ${user.status === 'Active' ? 'bg-green-100' : 'bg-orange-100'}`}>
                                                <div className={`h-4 w-4 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
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

            {/* Bulk Actions Bar */}
            {selectedUserIds.length > 0 && (
                <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-red-600 text-white p-2 shadow-lg flex items-center justify-between transition-transform duration-300 ease-in-out">
                    <span className="text-sm font-medium pl-4">{selectedUserIds.length} user(s) selected</span>
                    <div className="space-x-2">
                        <button onClick={() => handleBulkAction('Activate Selected')} className="px-3 py-1 bg-green-500 rounded text-xs hover:bg-green-600">Activate</button>
                        <button onClick={() => handleBulkAction('Deactivate Selected')} className="px-3 py-1 bg-orange-500 rounded text-xs hover:bg-orange-600">Deactivate</button>
                        <button onClick={() => handleBulkAction('Delete Selected')} className="px-3 py-1 bg-red-700 rounded text-xs hover:bg-red-800">Delete</button>
                    </div>
                    <button onClick={() => setSelectedUserIds([])} className="pr-4"><X className="h-5 w-5"/></button>
                </div>
            )}

            {/* Modals */}
            <Modal isOpen={modalState.type === 'view'} onClose={closeModal} title="View User Details">
                {modalState.user && (
                    <div className="space-y-3 text-sm">
                        <p><strong>User ID:</strong> {modalState.user.id}</p>
                        <p><strong>Name:</strong> {modalState.user.name}</p>
                        <p><strong>Parent Name:</strong> {modalState.user.parentName}</p>
                        <p><strong>Role:</strong> {modalState.user.role}</p>
                        <p><strong>Mobile:</strong> {modalState.user.mobile || 'N/A'}</p>
                        <p><strong>Status:</strong> <StatusBadge status={modalState.user.status} /></p>
                    </div>
                )}
            </Modal>
            
            <Modal isOpen={modalState.type === 'add' || modalState.type === 'edit'} onClose={closeModal} title={modalState.type === 'add' ? 'Add New User' : 'Edit User'}>
                {modalState.user && (
                    <form onSubmit={(e) => handleFormSubmit(e, modalState.user, modalState.type === 'add' ? 'Add User' : 'Edit User')} className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700">Name</label><input name="name" defaultValue={modalState.user.name} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Parent Name</label><input name="parentName" defaultValue={modalState.user.parentName} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Role</label><input name="role" defaultValue={modalState.user.role} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Mobile</label><input name="mobile" defaultValue={modalState.user.mobile} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select name="status" defaultValue={modalState.user.status} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={isLoading} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-red-300">{isLoading ? 'Saving...' : 'Save Changes'}</button>
                        </div>
                    </form>
                )}
            </Modal>
            
            <Modal isOpen={modalState.type === 'delete'} onClose={closeModal} title="Confirm Deletion">
                {modalState.user && (
                    <div>
                        <p>Are you sure you want to delete user <strong>{modalState.user.name}</strong> (ID: {modalState.user.id})?</p>
                        <div className="flex justify-end space-x-3 pt-6">
                            <button onClick={closeModal} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>
                            <button onClick={() => handleDeleteConfirm(modalState.user.id)} disabled={isLoading} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-red-300">{isLoading ? 'Deleting...' : 'Delete'}</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AllUsers;