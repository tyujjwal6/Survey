import React, { useState } from 'react';
import {
  Home, ChevronRight, Search, RefreshCw, X, Eye, Calendar as CalendarIcon, MoreHorizontal, Trash2, Circle // Added Circle icon
} from 'lucide-react';
import { format } from 'date-fns';

// Assuming you have shadcn/ui components in these paths
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from '@/components/ui/pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog'; // Removed unused DialogTrigger
import { cn } from '@/lib/utils'; // Make sure you have this utility from shadcn

// DUMMY DATA mimicking the image
const surveyData = [
    { id: '10029', name: 'Sumon', mobile: '9190793656', qtName: 'Suman shekher', zcName: 'Ajit Kumar Singh', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '11 Jul, 2025' },
    { id: '10028', name: 'Bikram Ambani', mobile: '8812820712', qtName: 'Bikram Deka', zcName: 'Ajit Kumar Singh', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10027', name: 'Riajul ali', mobile: '7638079496', qtName: 'Rahul ali', zcName: 'Manish Kumar', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10026', name: 'Ambika kalita', mobile: '8822545692', qtName: 'Jyotisman deka', zcName: 'Manish Kumar', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10025', name: 'Babul kalita', mobile: '969570013', qtName: 'Jyotisman deka', zcName: 'Manish Kumar', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10024', name: 'Bakhanti kalita', mobile: '8855416265', qtName: 'Jyotisman deka', zcName: 'Manish Kumar', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10023', name: 'Bijoni kalita', mobile: '8822545869', qtName: 'Jyotisman deka', zcName: 'Manish Kumar', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10022', name: 'Khoru Rajbongsi', mobile: '9394243860', qtName: 'Prasanta boro', zcName: 'Ajit Kumar Singh', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10021', name: 'Jintu kalita', mobile: '6001233345', qtName: 'Jyotisman deka', zcName: 'Manish Kumar', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
    { id: '10020', name: 'Lakhi bala kalita', mobile: '8011536978', qtName: 'Jyotisman deka', zcName: 'Manish Kumar', qcName: 'Suman Sheikhar', zone: 'Goreshwar', date: '07 Jul, 2025' },
];

const AllSurveyData = () => {
    // State for form filters
    const [filters, setFilters] = useState({
        zone: 'all-zones',
        ot: 'all-ot',
        zc: 'all-zc',
        qc: 'all-qc',
    });
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    // State for table selections
    const [selectedRows, setSelectedRows] = useState([]);

    // State for modals
    const [viewModalData, setViewModalData] = useState(null);
    const [deleteModalData, setDeleteModalData] = useState(null);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(surveyData.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        const formData = {
            ...filters,
            dateFrom: dateFrom ? format(dateFrom, 'yyyy-MM-dd') : null,
            dateTo: dateTo ? format(dateTo, 'yyyy-MM-dd') : null,
        };
        // Dummy API call simulation
        console.log("Searching with data:", JSON.stringify(formData, null, 2));
        alert("Search data has been logged to the console. Ready for backend API integration.");
    };

    const handleResetFilters = () => {
        setFilters({ zone: 'all-zones', ot: 'all-ot', zc: 'all-zc', qc: 'all-qc' });
        setDateFrom(null);
        setDateTo(null);
        console.log("Filters reset!");
    };
    
    const handleExport = (type) => {
        // Dummy export function
        console.log(`Exporting ${type} CSV with selected rows:`, selectedRows);
        alert(`Exporting ${type} CSV... (check console)`);
    };

    const handleBulkAction = (action) => {
        console.log(`Performing bulk action "${action}" on rows:`, selectedRows);
        alert(`Bulk action "${action}" triggered for selected rows. Check console.`);
        // Here you would implement the logic for each bulk action
        if (action === 'delete') {
            // e.g., show a confirmation modal for bulk delete
        }
    };

    const handleViewClick = (rowData) => {
        setViewModalData(rowData);
    };

    const handleDeleteClick = (rowData) => {
        setDeleteModalData(rowData);
    };

    const confirmDelete = () => {
        // Dummy delete API call
        console.log("Deleting record:", deleteModalData);
        alert(`Record with ID ${deleteModalData.id} deleted! (simulated)`);
        setDeleteModalData(null); // Close modal
    };
    
    return (
        <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Home className="h-4 w-4 text-brand-secondary" />
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-brand-secondary">Survey Data</span>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-gray-700 font-medium">Survey Data</span>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-200">
                        <h1 className="text-lg font-semibold text-gray-800">
                            Survey Data (Total Record: 10025)
                        </h1>
                        <div className="flex space-x-2">
                            <Button variant="outline" className="bg-white border-brand-primary text-brand-primary hover:bg-brand-primary/10" onClick={() => handleExport('Normal')}>
                                Export Normal CSV
                            </Button>
                            <Button className="bg-brand-primary text-white hover:bg-brand-primary-dark" onClick={() => handleExport('Standard')}>
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* Advanced Search */}
                    <div className="p-6">
                        <Card className="shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-base font-medium">Advance Search</CardTitle>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleResetFilters}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleResetFilters}>
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">
                                    <div className="space-y-1 xl:col-span-1"><label className="text-sm font-medium text-gray-600">Filter By Zone</label><Select value={filters.zone} onValueChange={(v) => handleFilterChange('zone', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all-zones">All Zones</SelectItem><SelectItem value="goreshwar">Goreshwar</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-1 xl:col-span-1"><label className="text-sm font-medium text-gray-600">Filter By OT</label><Select value={filters.ot} onValueChange={(v) => handleFilterChange('ot', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all-ot">All OT</SelectItem><SelectItem value="ot-1">OT 1</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-1 xl:col-span-1"><label className="text-sm font-medium text-gray-600">Filter By ZC</label><Select value={filters.zc} onValueChange={(v) => handleFilterChange('zc', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all-zc">All ZC</SelectItem><SelectItem value="ajit-kumar-singh">Ajit Kumar Singh</SelectItem><SelectItem value="manish-kumar">Manish Kumar</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-1 xl:col-span-1"><label className="text-sm font-medium text-gray-600">Filter By QC</label><Select value={filters.qc} onValueChange={(v) => handleFilterChange('qc', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all-qc">All QC</SelectItem><SelectItem value="suman-sheikhar">Suman Sheikhar</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-1 xl:col-span-1"><label className="text-sm font-medium text-gray-600">Date from</label><Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dateFrom ? format(dateFrom, "dd-MM-yyyy") : <span>dd-mm-yyyy</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus/></PopoverContent></Popover></div>
                                    <div className="space-y-1 xl:col-span-1"><label className="text-sm font-medium text-gray-600">Date To</label><Popover><PopoverTrigger asChild><Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{dateTo ? format(dateTo, "dd-MM-yyyy") : <span>dd-mm-yyyy</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus/></PopoverContent></Popover></div>
                                    <div className="xl:col-span-1"><Button className="w-full bg-brand-primary text-white hover:bg-brand-primary-dark" onClick={handleSearch}><Search className="mr-2 h-4 w-4"/> Search</Button></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader><TableRow className="bg-gray-50 hover:bg-gray-100"><TableHead className="w-[50px] px-4"><Checkbox onCheckedChange={handleSelectAll} checked={surveyData.length > 0 && selectedRows.length === surveyData.length}/></TableHead><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Mobile</TableHead><TableHead>QT Name</TableHead><TableHead>ZC Name</TableHead><TableHead>QC Name</TableHead><TableHead>Zone</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {surveyData.map((row) => (
                                    <TableRow key={row.id}><TableCell className="px-4"><Checkbox onCheckedChange={() => handleSelectRow(row.id)} checked={selectedRows.includes(row.id)}/></TableCell><TableCell>{row.id}</TableCell><TableCell>{row.name}</TableCell><TableCell>{row.mobile}</TableCell><TableCell>{row.qtName}</TableCell><TableCell>{row.zcName}</TableCell><TableCell>{row.qcName}</TableCell><TableCell>{row.zone}</TableCell><TableCell>{row.date}</TableCell><TableCell><div className="flex space-x-1"><Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleViewClick(row)}><Eye className="h-4 w-4"/></Button><Button variant="destructive" size="icon" className="h-8 w-8 bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleDeleteClick(row)}><X className="h-4 w-4"/></Button></div></TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer with Bulk Actions and Pagination */}
                    <div className="px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
                        <div>
                            {selectedRows.length > 0 && (
                                <div className="flex items-center space-x-2">
                                     <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
                                    {/* --- FIX START: Corrected Bulk Action Buttons --- */}
                                    <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleBulkAction('action_circle')}>
                                        <Circle className="h-4 w-4 p-0.5" />
                                    </Button>
                                    <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleBulkAction('action_more')}>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full bg-brand-primary hover:bg-brand-primary-dark" onClick={() => handleBulkAction('delete')}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                     {/* --- FIX END --- */}
                                </div>
                            )}
                        </div>
                        {/* NOTE: For pagination active color to match the image, ensure 'brand-primary' is set as the 'primary' color in your tailwind.config.js for shadcn/ui */}
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}/></PaginationItem>
                                {[...Array(totalPages).keys()].map(i => (
                                    <PaginationItem key={i}><PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>{i + 1}</PaginationLink></PaginationItem>
                                ))}
                                <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}/></PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            <Dialog open={!!viewModalData} onOpenChange={() => setViewModalData(null)}>
                <DialogContent><DialogHeader><DialogTitle>View Survey Details (ID: {viewModalData?.id})</DialogTitle><DialogDescription>Detailed information for the selected survey record.</DialogDescription></DialogHeader>{viewModalData && (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 text-sm"><div><span className="font-semibold">Name:</span> {viewModalData.name}</div><div><span className="font-semibold">Mobile:</span> {viewModalData.mobile}</div><div><span className="font-semibold">Zone:</span> {viewModalData.zone}</div><div><span className="font-semibold">Date:</span> {viewModalData.date}</div><div className="sm:col-span-2"><span className="font-semibold">QT Name:</span> {viewModalData.qtName}</div><div className="sm:col-span-2"><span className="font-semibold">ZC Name:</span> {viewModalData.zcName}</div><div className="sm:col-span-2"><span className="font-semibold">QC Name:</span> {viewModalData.qcName}</div></div>)}<DialogFooter><Button variant="outline" onClick={() => setViewModalData(null)}>Close</Button></DialogFooter></DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!deleteModalData} onOpenChange={() => setDeleteModalData(null)}>
                <DialogContent><DialogHeader><DialogTitle className="flex items-center"><Trash2 className="mr-2 text-brand-primary"/> Are you sure?</DialogTitle><DialogDescription>This action cannot be undone. This will permanently delete the survey record for <span className="font-semibold">{deleteModalData?.name}</span> (ID: {deleteModalData?.id}).</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => setDeleteModalData(null)}>Cancel</Button><Button className="bg-brand-primary hover:bg-brand-primary-dark text-white" onClick={confirmDelete}>Confirm Delete</Button></DialogFooter></DialogContent>
            </Dialog>
        </div>
    );
};

export default AllSurveyData;