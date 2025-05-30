import { useState, useMemo } from "react";
import Wrapper from "../components/Wrapper";
import Table from "../components/table/Table";
import Heading from "../components/Heading";
import { DropdownItem } from "../components/Dropdown";

const Earnings = () => {
    const initialData = [
        {
            id: '1',
            transactionid: 'TXN1001',
            image: 'https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg',
            roomname: 'Deluxe Suite',
            "rent/day": 1200,
            from: '2025-05-01',
            to: '2025-05-03',
            total: 2400,
            paymentmode: 'Online',
            status: 'Paid'
        },
        {
            id: '2',
            transactionid: 'TXN1002',
            image: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill',
            roomname: 'Studio Apartment',
            "rent/day": 800,
            from: '2025-05-05',
            to: '2025-05-07',
            total: 1600,
            paymentmode: 'Cash',
            status: 'Refunded'
        },
        {
            id: '3',
            transactionid: 'TXN1003',
            image: 'https://www.gentinghotel.co.uk/_next/image?url=https%3A%2F%2Fs3.eu-west-2.amazonaws.com%2Fstaticgh.gentinghotel.co.uk%2Fuploads%2Fhero%2FSuiteNov2022_0008_1920.jpg&w=3840&q=75',
            roomname: 'Family Room',
            "rent/day": 1500,
            from: '2025-05-10',
            to: '2025-05-12',
            total: 3000,
            paymentmode: 'Online',
            status: 'Paid'
        },
        {
            id: '4',
            transactionid: 'TXN1004',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/160100977.jpg?k=d6b7d4dafb6698b2c857def3bb4e5c312c44ee3da2e1e573fe6c19dc97b516e0&o=&hp=1',
            roomname: 'Economy Room',
            "rent/day": 600,
            from: '2025-05-15',
            to: '2025-05-16',
            total: 600,
            paymentmode: 'Cash',
            status: 'Paid'
        }
    ];

    const columns = [
        {
            label : 'Transaction ID',
            key : 'transactionid'
        },
        {
            label : 'Room Name',
            key : 'roomname'
        },
        {
            label : 'From',
            key : 'from'
        },
        {
            label : 'To',
            key : 'to'
        },
        {
            label : 'Rent/Day',
            key : 'rent/day'
        },
        {
            label : 'Total',
            key : 'total'
        },
        {
            label : 'Payment Mode',
            key : 'paymentmode'
        },
        {
            label : 'Status',
            key : 'status'
        }
    ];

    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const filterItems: DropdownItem[] = [
        { label: "All Payments", onClick: () => setPaymentFilter("all") },
        { label: "Online", onClick: () => setPaymentFilter("Online") },
        { label: "Cash", onClick: () => setPaymentFilter("Cash") }
    ];

    const handleDownloadReport = () => {
        const csv = [
            ['Transaction ID', 'Room Name', 'Check-in', 'Check-out', 'Rent/Day', 'Total', 'Payment Mode', 'Status'],
            ...filteredData.map(d => [
                d.transactionid, d.roomname, d.from, d.to, `₹${d["rent/day"]}`, `$${d.total}`, d.paymentmode, d.status
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "earnings_report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredData = data
        .filter(item => item.roomname.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => paymentFilter === "all" ? true : item.paymentmode === paymentFilter);

    const {
        totalEarnings,
        totalRefunds,
        onlineEarnings,
        cashEarnings,
        onlineRefunds,
        cashRefunds
    } = useMemo(() => {
        let earnings = 0, refunds = 0, onlineE = 0, cashE = 0, onlineR = 0, cashR = 0;

        filteredData.forEach(item => {
            if (item.status === "Paid") {
                earnings += item.total;
                if (item.paymentmode === "Online") onlineE += item.total;
                else if (item.paymentmode === "Cash") cashE += item.total;
            }
            if (item.status === "Refunded") {
                refunds += item.total;
                if (item.paymentmode === "Online") onlineR += item.total;
                else if (item.paymentmode === "Cash") cashR += item.total;
            }
        });

        return {
            totalEarnings: earnings,
            totalRefunds: refunds,
            onlineEarnings: onlineE,
            cashEarnings: cashE,
            onlineRefunds: onlineR,
            cashRefunds: cashR
        };
    }, [filteredData]);

    return (
        <Wrapper className="mx-3 py-5">
            <Heading
                handleDownloadReport={handleDownloadReport}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search Room Name..."
                heading="Earnings"
                filterItems={filterItems}
                filterLabel="Payment Mode"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-xl shadow">
                    <h4 className="text-lg font-semibold">Total Earnings</h4>
                    <p className="text-xl font-bold text-green-700">₹{totalEarnings}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-xl shadow">
                    <h4 className="text-lg font-semibold">Total Refunds</h4>
                    <p className="text-xl font-bold text-red-700">₹{totalRefunds}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl shadow">
                    <h4 className="text-lg font-semibold">Online / Cash</h4>
                    <p className="text-sm text-gray-700">
                        Online: <strong className="text-green-600">₹{onlineEarnings}</strong> /
                        Refunds: <strong className="text-red-600">₹{onlineRefunds}</strong><br />
                        Cash: <strong className="text-green-600">₹{cashEarnings}</strong> /
                        Refunds: <strong className="text-red-600">₹{cashRefunds}</strong>
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table
                    data={filteredData}
                    columns={columns}
                />
            </div>
        </Wrapper>
    );
};

export default Earnings;
