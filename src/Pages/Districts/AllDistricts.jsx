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
import { Input } from '@/components/ui/input';

// DUMMY DATA mimicking the image content and structure
const districtData = [
    { id: 2, name: 'Baksa', state: 'Assam', status: 'Active', updatedOn: '2025-06-23 18:17:32' },
    { id: 1, name: 'Udalguri', state: 'Assam', status: 'Active', updatedOn: '2025-06-23 18:17:19' },
];

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, iconBgClass, textColorClass }) => (
    <Card className="shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
            <div className={`p-3 rounded-full ${iconBgClass}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
                <p className={`text-lg font-semibold ${textColorClass}`}>{title}</p>
                <p className="text-sm text-gray-500">{value}</p>
            </div>
        </CardContent>
    </Card>
);

const AllDistricts = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalData, setModalData] = useState({ view: null, edit: null, delete: null });
    
    const handleSelectAll = (checked) => {
        setSelectedRows(checked ? districtData.map(d => d.id) : []);
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
        // navigate('/add-district'); // Example navigation
        alert("Navigating to Add New District page...");
    };
    
    const confirmDelete = () => {
        console.log("Deleting district:", modalData.delete);
        alert(`District "${modalData.delete.name}" deleted! (simulated)`);
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
                        <h1 className="text-2xl font-bold text-gray-800">District</h1>
                        <p className="text-sm text-gray-500">District</p>
                    </div>
                    <div className="p-2 bg-gray-200 rounded-md">
                       <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Home className="h-4 w-4 text-brand-secondary" />
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-brand-secondary">District</span>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-gray-700 font-medium">District</span>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Total" value="2" icon={FileText} iconBgClass="bg-brand-primary" textColorClass="text-brand-primary" />
                    <StatCard title="Active" value="2" icon={CheckSquare} iconBgClass="bg-brand-green" textColorClass="text-brand-green" />
                    <StatCard title="Inactive" value="0" icon={AlertTriangle} iconBgClass="bg-brand-orange" textColorClass="text-brand-orange" />
                </div>

                {/* Main Table Card */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                        <CardTitle className="text-lg font-semibold">District (Total Record: 2)</CardTitle>
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
                                        <TableHead className="w-[50px] px-4"><Checkbox onCheckedChange={handleSelectAll} checked={selectedRows.length === districtData.length && districtData.length > 0} /></TableHead>
                                        <TableHead className="font-bold text-black">Id</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>State</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Updated On</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {districtData.map((d) => (
                                        <TableRow key={d.id}>
                                            <TableCell className="px-4"><Checkbox onCheckedChange={() => handleSelectRow(d.id)} checked={selectedRows.includes(d.id)} /></TableCell>
                                            <TableCell className="font-medium">{d.id}</TableCell>
                                            <TableCell>{d.name}</TableCell>
                                            <TableCell>{d.state}</TableCell>
                                            <TableCell>{d.status}</TableCell>
                                            <TableCell><Badge className="bg-brand-orange text-white hover:bg-brand-orange">{d.updatedOn}</Badge></TableCell>
                                            <TableCell>
                                                <div className="flex space-x-1">
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openModal('view', d)}><Eye className="h-4 w-4" /></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-action-blue hover:bg-action-blue-dark text-white" onClick={() => openModal('edit', d)}><Pencil className="h-4 w-4" /></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-brand-primary hover:bg-brand-primary-dark text-white" onClick={() => openModal('delete', d)}><X className="h-4 w-4" /></Button>
                                                    <Button size="icon" className="h-8 w-8 bg-brand-green hover:bg-brand-green-dark text-white" onClick={() => alert(`Toggling status for ID: ${d.id}`)}><Circle className="h-4 w-4" /></Button>
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
                                <PaginationItem className="pointer-events-none text-gray-400"><PaginationPrevious href="#" /></PaginationItem>
                                <PaginationItem><PaginationLink href="#" isActive>{currentPage}</PaginationLink></PaginationItem>
                                <PaginationItem className="pointer-events-none text-gray-400"><PaginationNext href="#" /></PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </Card>
            </div>

            {/* View Modal */}
            <Dialog open={!!modalData.view} onOpenChange={() => closeModal('view')}>
                <DialogContent>
                    <DialogHeader><DialogTitle>View District Details (ID: {modalData.view?.id})</DialogTitle></DialogHeader>
                    {modalData.view && <div className="py-4 space-y-2 text-sm"><p><span className="font-semibold">Name:</span> {modalData.view.name}</p><p><span className="font-semibold">State:</span> {modalData.view.state}</p><p><span className="font-semibold">Status:</span> {modalData.view.status}</p><p><span className="font-semibold">Last Updated:</span> {modalData.view.updatedOn}</p></div>}
                    <DialogFooter><Button variant="outline" onClick={() => closeModal('view')}>Close</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={!!modalData.edit} onOpenChange={() => closeModal('edit')}>
                 <DialogContent>
                    <DialogHeader><DialogTitle>Edit District (ID: {modalData.edit?.id})</DialogTitle><DialogDescription>This form allows you to edit the district details.</DialogDescription></DialogHeader>
                    {modalData.edit && <div className="py-4 space-y-4"><label className="block text-sm font-medium">Name<Input className="mt-1" defaultValue={modalData.edit.name} /></label><label className="block text-sm font-medium">State<Input className="mt-1" defaultValue={modalData.edit.state} /></label></div>}
                    <DialogFooter><Button variant="outline" onClick={() => closeModal('edit')}>Cancel</Button><Button className="bg-brand-primary text-white" onClick={() => alert('Save changes!')}>Save Changes</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!modalData.delete} onOpenChange={() => closeModal('delete')}>
                <DialogContent>
                    <DialogHeader><DialogTitle className="flex items-center"><Trash2 className="mr-2 text-brand-primary"/> Are you sure?</DialogTitle><DialogDescription>This will permanently delete the district "{modalData.delete?.name}" (ID: {modalData.delete?.id}). This action cannot be undone.</DialogDescription></DialogHeader>
                    <DialogFooter><Button variant="outline" onClick={() => closeModal('delete')}>Cancel</Button><Button className="bg-brand-primary text-white" onClick={confirmDelete}>Confirm Delete</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllDistricts;