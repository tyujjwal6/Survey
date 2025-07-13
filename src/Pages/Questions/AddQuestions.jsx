import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, ChevronRight, FileText, CheckSquare, AlertTriangle, Eye, Pencil, X, Circle, MoreHorizontal, Plus, Trash2
} from 'lucide-react';

// Assuming you have shadcn/ui components in these paths
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from '@/components/ui/pagination';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// DUMMY DATA mimicking the image content and structure
const questionsData = [
    { id: 61, question: 'Religious/Other', status: 'Active', updatedOn: '2025-06-24 11:27:55' },
    { id: 60, question: 'চাহ বাগান আদিবাসী Tea Garden Adivasi', status: 'Active', updatedOn: '2025-06-24 11:27:16' },
    { id: 59, question: 'STs (Plains + Hills)', status: 'Active', updatedOn: '2025-06-24 11:26:22' },
    { id: 58, question: 'তালিকভুক্ত জাতি SCs', status: 'Active', updatedOn: '2025-06-24 11:25:48' },
    { id: 57, question: 'অন্যান্য পিছপৰা OBCs', status: 'Active', updatedOn: '2025-06-24 11:24:53' },
    { id: 56, question: 'FCH (General)', status: 'Active', updatedOn: '2025-06-24 11:24:14' },
    { id: 55, question: 'সমুদায Community', status: 'Active', updatedOn: '2025-06-24 11:23:36' },
    { id: 54, question: 'কেন্দ্র আৰু ৰাজ্য চৰকাৰে চলাই থকা তলত উল্লেখ কৰা কল্যাণমূলক আঁচনিসমূহৰ ভিতৰত কোনখন আঁচনিৰ পৰা আপুনি লাভান্বিত হৈছে? Which of the following welfare schemes by central/state government have you benefited from? (Multiple answers allowed)', status: 'Active', updatedOn: '2025-06-24 04:12:30' },
    { id: 53, question: 'আপুনি নিজৰ ভোট কিহৰ আধাৰত দিয়ে? On what basis do you cast your vote?', status: 'Active', updatedOn: '2025-06-24 04:06:23' },
    { id: 52, question: 'বিধানসভা নিৰ্বাচন আজিৰ দিনত হলে আপুনি কোন দলক ভোট দিব? If the assembly elections were held today, which party would you vote for?', status: 'Active', updatedOn: '2025-06-24 04:01:05' },
];

// --- FIX START: Corrected StatCard component to perfectly match the image ---
// Reusable Stat Card Component - IMPROVED VERSION
const StatCard = ({ title, value, icon: Icon, iconBgClass, textColorClass }) => (
    <Card className="shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
            {/* Left side: Icon */}
            <div className={`p-3 rounded-full ${iconBgClass}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            {/* Right side: Text block */}
            <div className="text-right">
                <p className={`text-lg font-semibold ${textColorClass}`}>{title}</p>
                <p className="text-sm text-gray-500">{value}</p>
            </div>
        </CardContent>
    </Card>
);
// --- FIX END ---

const AllQuestions = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalData, setModalData] = useState({ view: null, edit: null, delete: null });
    
    const handleSelectAll = (checked) => {
        setSelectedRows(checked ? questionsData.map(q => q.id) : []);
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const openModal = (type, data) => {
        setModalData(prev => ({ ...prev, [type]: data }));
    };

    const closeModal = (type) => {
        setModalData(prev => ({ ...prev, [type]: null }));
    };

    const handleAddNew = () => {
        // navigate('/addquestions');
        alert("Navigating to Add New Question page...");
    };
    
    const confirmDelete = () => {
        console.log("Deleting question:", modalData.delete);
        alert(`Question with ID ${modalData.delete.id} deleted! (simulated)`);
        closeModal('delete');
    };

    const handleBulkAction = (action) => {
        if (selectedRows.length === 0) {
            alert("Please select rows to perform a bulk action.");
            return;
        }
        console.log(`Performing bulk action "${action}" on rows:`, selectedRows);
        alert(`Bulk action "${action}" triggered for selected rows. Check console.`);
    };

    return (
        <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Question</h1>
                        <p className="text-sm text-gray-500">Question</p>
                    </div>
                    <div className="p-2 bg-gray-200 rounded-md">
                       <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Home className="h-4 w-4 text-brand-secondary" />
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-brand-secondary">Question</span>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-gray-700 font-medium">Question</span>
                </div>

                {/* --- FIX START: Updated the calling of StatCard component --- */}
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Total" value="48" icon={FileText} iconBgClass="bg-brand-primary" textColorClass="text-brand-primary" />
                    <StatCard title="Active" value="48" icon={CheckSquare} iconBgClass="bg-brand-green" textColorClass="text-brand-green" />
                    <StatCard title="Inactive" value="0" icon={AlertTriangle} iconBgClass="bg-brand-orange" textColorClass="text-brand-orange" />
                </div>
                {/* --- FIX END --- */}


                {/* Main Table Card */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                        <CardTitle className="text-lg font-semibold">Question (Total Record: 48)</CardTitle>
                        <Button className="bg-brand-primary hover:bg-brand-primary-dark" onClick={handleAddNew}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-100">
                                        <TableHead className="w-[50px] px-4"><Checkbox onCheckedChange={handleSelectAll} checked={selectedRows.length === questionsData.length && questionsData.length > 0} /></TableHead>
                                        <TableHead className="font-bold text-black">Id</TableHead>
                                        <TableHead className="min-w-[300px]">Question</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Updated On</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {questionsData.map((q) => (
                                        <TableRow key={q.id}>
                                            <TableCell className="px-4"><Checkbox onCheckedChange={() => handleSelectRow(q.id)} checked={selectedRows.includes(q.id)} /></TableCell>
                                            <TableCell className="font-medium">{q.id}</TableCell>
                                            <TableCell className="max-w-md truncate">{q.question}</TableCell>
                                            <TableCell>{q.status}</TableCell>
                                            <TableCell><Badge className="bg-brand-orange text-white hover:bg-brand-orange">{q.updatedOn}</Badge></TableCell>
                                            <TableCell>
                                                <div className="flex space-x-1">
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openModal('view', q)}><Eye className="h-4 w-4" /></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-action-blue hover:bg-action-blue-dark text-white" onClick={() => openModal('edit', q)}><Pencil className="h-4 w-4" /></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-brand-primary hover:bg-brand-primary-dark text-white" onClick={() => openModal('delete', q)}><X className="h-4 w-4" /></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-brand-green hover:bg-brand-green-dark text-white" onClick={() => alert(`Toggling status for ID: ${q.id}`)}><Circle className="h-4 w-4" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                    {/* Footer with Bulk Actions and Pagination */}
                    <div className="px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
                        <div>
                            {selectedRows.length > 0 && (
                                <div className="flex items-center space-x-2">
                                     <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
                                     <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleBulkAction('action_circle')}><Circle className="h-4 w-4 p-0.5" /></Button>
                                     <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleBulkAction('action_more')}><MoreHorizontal className="h-4 w-4" /></Button>
                                     <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleBulkAction('delete')}><X className="h-4 w-4" /></Button>
                                </div>
                            )}
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}/></PaginationItem>
                                {[1, 2, 3, 4, 5].map(p => (
                                    <PaginationItem key={p}><PaginationLink href="#" isActive={currentPage === p} onClick={(e) => { e.preventDefault(); setCurrentPage(p); }}>{p}</PaginationLink></PaginationItem>
                                ))}
                                <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(5, p + 1)); }}/></PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </Card>
            </div>

            {/* View Modal */}
            <Dialog open={!!modalData.view} onOpenChange={() => closeModal('view')}>
                <DialogContent>
                    <DialogHeader><DialogTitle>View Question Details (ID: {modalData.view?.id})</DialogTitle></DialogHeader>
                    {modalData.view && <div className="py-4 space-y-2 text-sm"><p><span className="font-semibold">Question:</span> {modalData.view.question}</p><p><span className="font-semibold">Status:</span> {modalData.view.status}</p><p><span className="font-semibold">Last Updated:</span> {modalData.view.updatedOn}</p></div>}
                    <DialogFooter><Button variant="outline" onClick={() => closeModal('view')}>Close</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal (Placeholder) */}
            <Dialog open={!!modalData.edit} onOpenChange={() => closeModal('edit')}>
                 <DialogContent>
                    <DialogHeader><DialogTitle>Edit Question (ID: {modalData.edit?.id})</DialogTitle><DialogDescription>This form would allow you to edit the question.</DialogDescription></DialogHeader>
                    {modalData.edit && <div className="py-4"><textarea className="w-full p-2 border rounded" rows="4" defaultValue={modalData.edit.question}></textarea></div>}
                    <DialogFooter><Button variant="outline" onClick={() => closeModal('edit')}>Cancel</Button><Button className="bg-brand-primary text-white" onClick={() => alert('Save changes!')}>Save Changes</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!modalData.delete} onOpenChange={() => closeModal('delete')}>
                <DialogContent>
                    <DialogHeader><DialogTitle className="flex items-center"><Trash2 className="mr-2 text-brand-primary"/> Are you sure?</DialogTitle><DialogDescription>This will permanently delete the question (ID: {modalData.delete?.id}). This action cannot be undone.</DialogDescription></DialogHeader>
                    <DialogFooter><Button variant="outline" onClick={() => closeModal('delete')}>Cancel</Button><Button className="bg-brand-primary text-white" onClick={confirmDelete}>Confirm Delete</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllQuestions;