import React, { useState } from 'react';
import {
  Home, ChevronRight, FileText, CheckCircle2, AlertTriangle, Plus, Eye, Pencil, X, Circle, MoreHorizontal, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Shadcn/ui Components
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

// DUMMY DATA mimicking the image
const questionsData = [
  { id: 61, question: 'Religious/Other', status: 'Active', updatedOn: '2025-06-24 11:27:55' },
  { id: 60, question: 'চাহ বাগান আদিবাসী Tea Garden Adivasi', status: 'Active', updatedOn: '2025-06-24 11:27:16' },
  { id: 59, question: 'STs (Plains + Hills)', status: 'Active', updatedOn: '2025-06-24 11:26:22' },
  { id: 58, question: 'তালিকভুক্ত জাতি SCs', status: 'Active', updatedOn: '2025-06-24 11:25:48' },
  { id: 57, question: 'অন্যান্য পিছপৰা OBCs', status: 'Active', updatedOn: '2025-06-24 11:24:53' },
  { id: 56, question: 'FCH (General)', status: 'Active', updatedOn: '2025-06-24 11:24:14' },
  { id: 55, question: ' समुदाय Community', status: 'Active', updatedOn: '2025-06-24 11:23:36' },
  { id: 54, question: 'কেন্দ্র আৰু ৰাজ্য চৰকাৰে চলাই থকা তলত উল্লেখ কৰা কল্যাণমূলক আঁচনিসমূহৰ ভিতৰত কোনখন আঁচনিৰ পৰা আপুনি লাভান্বিত হৈছে? Which of the following welfare schemes by central/state government have you benefited from? (Multiple answers allowed)', status: 'Active', updatedOn: '2025-06-24 04:12:30' },
  { id: 53, question: 'আপুনি নিজৰ ভোট কিহৰ ভিত্তিত দিয়ে? On what basis do you cast your vote?', status: 'Active', updatedOn: '2025-06-24 04:06:23' },
  { id: 52, question: 'বিধানসভা নিৰ্বাচন আজিৰ দিনত হলে আপুনি কোন দলক ভোট দিব? If the assembly elections were held today, which party would you vote for?', status: 'Active', updatedOn: '2025-06-24 04:01:05' },
];

const StatCard = ({ icon, title, value, colorClass }) => {
    const IconComponent = icon;
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${colorClass.bg}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                    <p className={`text-lg font-bold ${colorClass.text}`}>{title}</p>
                    <p className="text-gray-500 font-medium">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
};

const AllQuestions = () => {
    const navigate = useNavigate(); // Correctly initialized
    const [selectedRows, setSelectedRows] = useState([]);
    const [deleteModalData, setDeleteModalData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handleSelectAll = (checked) => {
        setSelectedRows(checked ? questionsData.map(q => q.id) : []);
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    // --- THIS IS THE CHANGE ---
    // Update this function to navigate to the correct route
    const handleAddNew = () => {
        navigate('/addquestions');
    };

    const handleEdit = (question) => {
        console.log("Editing question:", question);
        alert(`Editing question with ID: ${question.id}`);
    };

    const handleDeleteClick = (question) => {
        setDeleteModalData(question);
    };
    
    const handleToggleStatus = (question) => {
        console.log("Toggling status for question:", question);
        alert(`Toggling status for question ID: ${question.id}`);
    }

    const confirmDelete = () => {
        console.log("Deleting question:", deleteModalData);
        alert(`Question with ID ${deleteModalData.id} has been deleted (simulated).`);
        setDeleteModalData(null); // Close modal
    };
    
    const handleBulkAction = (action) => {
         console.log(`Performing bulk action "${action}" on rows:`, selectedRows);
         alert(`Bulk action "${action}" triggered for selected rows: ${selectedRows.join(', ')}`);
    }

    return (
        <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Question</h1>
                        <p className="text-sm text-gray-500">Question</p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-md">
                       <FileText className="h-6 w-6 text-brand-primary" />
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

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <StatCard icon={FileText} title="Total" value="48" colorClass={{ bg: 'bg-brand-primary', text: 'text-brand-primary' }} />
                    <StatCard icon={CheckCircle2} title="Active" value="48" colorClass={{ bg: 'bg-brand-green', text: 'text-brand-green' }} />
                    <StatCard icon={AlertTriangle} title="Inactive" value="0" colorClass={{ bg: 'bg-brand-orange', text: 'text-brand-orange' }} />
                </div>

                {/* Main Table Card */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                        <CardTitle className="text-lg font-semibold">Question (Total Record: 48)</CardTitle>
                        <Button className="bg-brand-primary text-white hover:bg-brand-primary-dark" onClick={handleAddNew}>
                            <Plus className="h-4 w-4 mr-2" /> Add New
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="w-[50px] px-4"><Checkbox onCheckedChange={handleSelectAll} checked={questionsData.length > 0 && selectedRows.length === questionsData.length} /></TableHead>
                                        <TableHead>Id</TableHead>
                                        <TableHead className="min-w-[300px]">Question</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Updated On</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {questionsData.map(q => (
                                        <TableRow key={q.id}>
                                            <TableCell className="px-4"><Checkbox onCheckedChange={() => handleSelectRow(q.id)} checked={selectedRows.includes(q.id)}/></TableCell>
                                            <TableCell>{q.id}</TableCell>
                                            <TableCell className="max-w-md truncate">{q.question}</TableCell>
                                            <TableCell><span className="text-brand-green font-medium">{q.status}</span></TableCell>
                                            <TableCell><span className="bg-brand-orange text-white text-xs font-semibold px-2 py-1 rounded-full">{q.updatedOn}</span></TableCell>
                                            <TableCell>
                                                <div className="flex space-x-1">
                                                    <Button variant="outline" size="icon" className="h-8 w-8"><Eye className="h-4 w-4"/></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-brand-blue hover:bg-brand-blue/90" onClick={() => handleEdit(q)}><Pencil className="h-4 w-4"/></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleDeleteClick(q)}><X className="h-4 w-4"/></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-brand-green hover:bg-brand-green/90" onClick={() => handleToggleStatus(q)}><Circle className="h-4 w-4"/></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                     {/* Footer with Bulk Actions and Pagination */}
                    <div className="px-4 py-4 flex flex-wrap gap-4 justify-between items-center border-t">
                        <div>
                            {selectedRows.length > 0 && (
                                <div className="flex items-center space-x-2">
                                     <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
                                    <Button variant="destructive" size="icon" className="h-8 w-8 rounded-md bg-brand-primary" onClick={() => handleBulkAction('action_circle')}><Circle className="h-4 w-4"/></Button>
                                    <Button variant="destructive" size="icon" className="h-8 w-8 rounded-md bg-brand-primary" onClick={() => handleBulkAction('action_more')}><MoreHorizontal className="h-4 w-4"/></Button>
                                    <Button variant="destructive" size="icon" className="h-8 w-8 rounded-md bg-brand-primary" onClick={() => handleBulkAction('delete')}><X className="h-4 w-4"/></Button>
                                </div>
                            )}
                        </div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p-1)); }} /></PaginationItem>
                                {[...Array(totalPages).keys()].map(i => (
                                    <PaginationItem key={i}><PaginationLink href="#" isActive={currentPage === i+1} onClick={(e) => {e.preventDefault(); setCurrentPage(i+1);}}>{i+1}</PaginationLink></PaginationItem>
                                ))}
                                <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p+1)); }} /></PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </Card>
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!deleteModalData} onOpenChange={() => setDeleteModalData(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center"><Trash2 className="mr-2 text-brand-primary"/>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the question: <span className="font-semibold">"{deleteModalData?.question}"</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteModalData(null)}>Cancel</Button>
                        <Button className="bg-brand-primary text-white hover:bg-brand-primary-dark" onClick={confirmDelete}>Confirm Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllQuestions;