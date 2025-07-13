import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, FileText, CheckCircle2, AlertTriangle, Search, Edit, Trash2, X, Plus, ChevronsLeft, ChevronsRight } from 'lucide-react';

// ===================================================================================
// DUMMY DATA & API SIMULATION
// ===================================================================================
const mockEmojis = [
    { id: 6, title: "ক’ব নোৱাৰো Can't say", emojiUrl: 'https://twemoji.maxcdn.com/v/latest/svg/1f928.svg', status: 'Active', updatedOn: '2024-05-14 08:14:11' },
    { id: 5, title: 'বহুত সন্তুষ্ট Very satisfied', emojiUrl: 'https://twemoji.maxcdn.com/v/latest/svg/1f600.svg', status: 'Active', updatedOn: '2021-12-07 12:12:17' },
    { id: 4, title: 'সন্তুষ্ট Satisfied', emojiUrl: 'https://twemoji.maxcdn.com/v/latest/svg/1f642.svg', status: 'Active', updatedOn: '2021-12-07 12:11:48' },
    { id: 3, title: 'Little Happy- Little Sad ল্প সুখী- অলপ দুখী', emojiUrl: 'https://twemoji.maxcdn.com/v/latest/svg/1f610.svg', status: 'Active', updatedOn: '2021-12-07 12:11:16' },
    { id: 2, title: 'অসন্তুষ্ট Dissatisfied', emojiUrl: 'https://twemoji.maxcdn.com/v/latest/svg/1f615.svg', status: 'Active', updatedOn: '2021-12-07 12:08:25' },
    { id: 1, title: 'বৰ অসন্তুষ্ট Very dissatisfied', emojiUrl: 'https://twemoji.maxcdn.com/v/latest/svg/1f61e.svg', status: 'Active', updatedOn: '2021-12-07 12:07:34' },
    // Add more mock data for pagination testing if needed
];

// Dummy API handler for simulating backend calls
const apiHandler = async (action, data) => {
    console.log(`[API SIMULATION] Action: ${action}`, data);
    if (data instanceof FormData) {
        console.log("--- FormData Content ---");
        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }
        console.log("----------------------");
    }
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md"><div className="flex justify-between items-center p-4 border-b"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button></div><div className="p-6">{children}</div></div>
        </div>
    );
};

// ===================================================================================
// MAIN AllEmoji COMPONENT
// ===================================================================================

const AllEmoji = () => {
    const navigate = useNavigate();
    const [emojis, setEmojis] = useState(mockEmojis);
    const [selectedEmojiIds, setSelectedEmojiIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalState, setModalState] = useState({ type: null, data: null });
    const [isLoading, setIsLoading] = useState(false);
    
    const ITEMS_PER_PAGE = 10;

    const stats = useMemo(() => ({
        total: emojis.length,
        active: emojis.filter(u => u.status === 'Active').length,
        inactive: emojis.filter(u => u.status === 'Inactive').length,
    }), [emojis]);

    const paginatedEmojis = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return emojis.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [emojis, currentPage]);

    const totalPages = Math.ceil(emojis.length / ITEMS_PER_PAGE);

    const handleSelectAll = (e) => setSelectedEmojiIds(e.target.checked ? paginatedEmojis.map(e => e.id) : []);
    const handleSelectOne = (id) => setSelectedEmojiIds(prev => prev.includes(id) ? prev.filter(emojiId => emojiId !== id) : [...prev, id]);
    
    // --- Modal and Action Handlers ---
    const closeModal = () => setModalState({ type: null, data: null });

    // --- THIS IS THE CHANGE ---
    // This function now navigates to the /addemoji route
    const handleAdd = () => {
        navigate('/addemoji');
    };
    
    const handleView = (emoji) => setModalState({ type: 'view', data: emoji });
    const handleEdit = (emoji) => setModalState({ type: 'edit', data: emoji });
    const handleDelete = (emoji) => setModalState({ type: 'delete', data: emoji });
    
    const handleFormSubmit = async (e, emoji, action) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const dataObject = Object.fromEntries(formData.entries());
        
        await apiHandler(action, dataObject);
        // Here you would update the state based on the API response
        setEmojis(prev => prev.map(em => (em.id === emoji.id ? { ...em, ...dataObject, emojiUrl: e.target.emojiImage.files[0] ? URL.createObjectURL(e.target.emojiImage.files[0]) : em.emojiUrl } : em)));
        setIsLoading(false);
        closeModal();
    };

    const handleDeleteConfirm = async (emojiId) => {
        setIsLoading(true);
        await apiHandler('Delete Emoji', { id: emojiId });
        setEmojis(prev => prev.filter(em => em.id !== emojiId));
        setIsLoading(false);
        closeModal();
    };

    const handleBulkDelete = async () => {
        setIsLoading(true);
        await apiHandler('Bulk Delete Emojis', { ids: selectedEmojiIds });
        setEmojis(prev => prev.filter(em => !selectedEmojiIds.includes(em.id)));
        setSelectedEmojiIds([]);
        setIsLoading(false);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 font-sans">
            <header className="mb-6">
                <h1 className="text-2xl font-light text-gray-700">Emoji <span className="text-gray-400">Emoji</span></h1>
                <nav aria-label="breadcrumb" className="mt-2"><ol className="flex items-center space-x-2 text-sm text-gray-500"><li><a href="#" className="flex items-center text-red-500 hover:text-red-700"><Home className="h-4 w-4 mr-1.5" /> Home</a></li><li><ChevronRight className="h-4 w-4" /></li><li><span className="font-medium text-red-500">Emoji</span></li></ol></nav>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard icon={FileText} title="Total" value={stats.total} colorClass="text-red-600" iconBgClass="bg-red-100" />
                <StatCard icon={CheckCircle2} title="Active" value={stats.active} colorClass="text-green-600" iconBgClass="bg-green-100" />
                <StatCard icon={AlertTriangle} title="Inactive" value={stats.inactive} colorClass="text-orange-600" iconBgClass="bg-orange-100" />
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b flex justify-between items-center"><h2 className="text-lg font-semibold text-gray-800">Emoji( Total Record: {stats.total} )</h2><button onClick={handleAdd} className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"><Plus className="h-4 w-4 mr-2" /> Add New</button></div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left"><thead className="bg-gray-50"><tr><th className="p-3 w-4"><input type="checkbox" onChange={handleSelectAll} checked={selectedEmojiIds.length === paginatedEmojis.length && paginatedEmojis.length > 0} className="rounded border-gray-300 text-red-600 focus:ring-red-500" /></th><th className="p-3 font-semibold text-gray-600">Id</th><th className="p-3 font-semibold text-gray-600">Title</th><th className="p-3 font-semibold text-gray-600">Emoji</th><th className="p-3 font-semibold text-gray-600">Status</th><th className="p-3 font-semibold text-gray-600">Updated On</th><th className="p-3 font-semibold text-gray-600">Actions</th></tr></thead>
                        <tbody>
                            {paginatedEmojis.map(emoji => (
                                <tr key={emoji.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3"><input type="checkbox" checked={selectedEmojiIds.includes(emoji.id)} onChange={() => handleSelectOne(emoji.id)} className="rounded border-gray-300 text-red-600 focus:ring-red-500" /></td>
                                    <td className="p-3 text-gray-700">{emoji.id}</td>
                                    <td className="p-3 text-gray-700">{emoji.title}</td>
                                    <td className="p-3"><div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><img src={emoji.emojiUrl} alt={emoji.title} className="h-6 w-6" /></div></td>
                                    <td className="p-3"><StatusBadge status={emoji.status} /></td>
                                    <td className="p-3"><span className="bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded">{emoji.updatedOn}</span></td>
                                    <td className="p-3"><div className="flex space-x-1"><button onClick={() => handleView(emoji)} className="p-1.5 rounded bg-gray-100 hover:bg-gray-200"><Search className="h-4 w-4 text-gray-600" /></button><button onClick={() => handleEdit(emoji)} className="p-1.5 rounded bg-blue-100 hover:bg-blue-200"><Edit className="h-4 w-4 text-blue-600" /></button><button onClick={() => handleDelete(emoji)} className="p-1.5 rounded bg-red-100 hover:bg-red-200"><Trash2 className="h-4 w-4 text-red-600" /></button><button className={`p-1.5 rounded ${emoji.status === 'Active' ? 'bg-green-100' : 'bg-orange-100'}`}><div className={`h-4 w-4 rounded-full ${emoji.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div></button></div></td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 flex justify-end"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>
            </div>

            {selectedEmojiIds.length > 0 && (
                <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-red-600 text-white p-2 shadow-lg flex items-center justify-between transition-transform duration-300 ease-in-out">
                    <span className="text-sm font-medium pl-4">{selectedEmojiIds.length} emoji(s) selected</span>
                    <div className="space-x-2"><button onClick={handleBulkDelete} className="px-3 py-1 bg-red-800 rounded text-xs hover:bg-red-900">Delete Selected</button></div>
                    <button onClick={() => setSelectedEmojiIds([])} className="pr-4"><X className="h-5 w-5"/></button>
                </div>
            )}

            <Modal isOpen={modalState.type === 'view'} onClose={closeModal} title="View Emoji">
                {modalState.data && (<div className="space-y-3 text-sm text-center"><img src={modalState.data.emojiUrl} alt={modalState.data.title} className="mx-auto h-20 w-20" /><p><strong>ID:</strong> {modalState.data.id}</p><p><strong>Title:</strong> {modalState.data.title}</p><p><strong>Status:</strong> <StatusBadge status={modalState.data.status} /></p><p><strong>Last Updated:</strong> {modalState.data.updatedOn}</p></div>)}
            </Modal>
            
            <Modal isOpen={modalState.type === 'edit'} onClose={closeModal} title="Edit Emoji">
                {modalState.data && (
                    <form onSubmit={(e) => handleFormSubmit(e, modalState.data, 'Edit Emoji')} className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700">Title</label><input name="title" defaultValue={modalState.data.title} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" required /></div>
                        <div><label className="block text-sm font-medium text-gray-700">Emoji Image</label><input type="file" name="emojiImage" accept="image/*" className="mt-1 w-full text-sm" /></div>
                        <div className="flex justify-end pt-4"><button type="submit" disabled={isLoading} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-red-300">{isLoading ? 'Saving...' : 'Save Changes'}</button></div>
                    </form>
                )}
            </Modal>
            
            <Modal isOpen={modalState.type === 'delete'} onClose={closeModal} title="Confirm Deletion">
                {modalState.data && (
                    <div><p>Are you sure you want to delete the emoji "<strong>{modalState.data.title}</strong>"?</p><div className="flex justify-end space-x-3 pt-6"><button onClick={closeModal} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button><button onClick={() => handleDeleteConfirm(modalState.data.id)} disabled={isLoading} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-red-300">{isLoading ? 'Deleting...' : 'Delete'}</button></div></div>
                )}
            </Modal>
        </div>
    );
};

export default AllEmoji;