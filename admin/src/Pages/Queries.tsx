import { useState } from "react";
import Wrapper from "../components/Wrapper";
import Table from "../components/table/Table";
import Heading from "../components/Heading";
import { DropdownItem } from "../components/Dropdown";

const Queries = () => {
    const initialData = [
        {
            id: '1',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            contact: '123-456-7890',
            message: 'Is breakfast included in the Deluxe Suite?',
            status: 'Received'
        },
        {
            id: '2',
            name: 'Bob Smith',
            email: 'bob.smith@example.com',
            contact: '987-654-3210',
            message: 'Can I get a late checkout for the Economy Room?',
            status: 'Replied'
        },
        {
            id: '3',
            name: 'Catherine Lee',
            email: 'catherine.lee@example.com',
            contact: '456-789-1234',
            message: 'Do you allow pets in Family Room?',
            status: 'Received'
        }
    ];

    const columns = [
        {
            label : 'Name',
            key : 'name'
        },
        {
            label : 'Email',
            key : 'email'
        },
        {
            label : 'Contact',
            key : 'contact'
        },
        {
            label : 'Message',
            key : 'message'
        },
        {
            label : 'Status',
            key : 'status'
        },
        'Name', 'Email', 'Contact', 'Message', 'Status'];

    const [data, setData] = useState(initialData);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filterItems: DropdownItem[] = [
        { label: "All Queries", onClick: () => setStatusFilter("all") },
        { label: "Received", onClick: () => setStatusFilter("Received") },
        { label: "Replied", onClick: () => setStatusFilter("Replied") }
    ];

    const handleBulkDelete = () => {
        setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
    };

    const handleDownloadReport = () => {
        const csv = [
            ['Customer Name', 'Email', 'Contact', 'Message', 'Status'],
            ...filteredData.map(d => [d.name, d.email, d.contact, `"${d.message}"`, d.status])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "customer_queries_report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? data.map(item => item.id) : []);
    };

    const handleSelect = (id: string, checked: boolean) => {
        setSelectedIds(checked ? [...selectedIds, id] : selectedIds.filter(itemId => itemId !== id));
    };

    const filteredData = data
        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => statusFilter === "all" ? true : item.status === statusFilter);

    return (
        <Wrapper className="mx-3 py-5">
            <Heading
                handleBulkDelete={handleBulkDelete}
                handleDownloadReport={handleDownloadReport}
                searchTerm={searchTerm}
                selectedIds={selectedIds}
                setSearchTerm={setSearchTerm}
                placeholder="Search Customer Name..."
                heading="Customer Queries"
                filterItems={filterItems}
                filterLabel="Status"
            />

            <div className="overflow-x-auto">
                <Table
                    data={filteredData}
                    columns={columns}
                    onDelete={() => { }}
                    onReply={() => { }}
                    onSelect={handleSelect}
                    onSelectAll={handleSelectAll}
                    selectedIds={selectedIds}
                />
            </div>
        </Wrapper>
    );
};

export default Queries;
