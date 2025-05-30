import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Table from "../components/table/Table";
import Heading from "../components/Heading";
import { DropdownItem } from "../components/Dropdown";
import { column } from "../components/table/TableHeader";
import { fetchGetData } from "../lib/fetchData";
import Loader from "../components/Loader";
import {useNavigate} from "react-router-dom";

const Bookings = () => {

    const columns: column[] = [
        {
            label: 'Image',
            key: 'roomImage'
        },
        {
            label: 'Room Name',
            key: 'roomName'
        },
        {
            label: 'Booked By',
            key: 'bookerName'
        },
        {
            label: 'From',
            key: 'fromDate'
        },
        {
            label: 'To',
            key: 'toDate'
        },
        {
            label: 'Total Rent',
            key: 'totalAmount'
        },
        {
            label: 'Payment Mode',
            key: 'paymentMode'
        },
        {
            label: "Status",
            key: 'status'
        }
    ];

    const [bookingsData, setBookingsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [roomFilter, setRoomFilter] = useState("all");
    const navigate = useNavigate();

    const getBookings = async () => {
        try {
            const res = await fetchGetData(`/booking/admin/all`, setLoading)
            if (res?.success) {
                setBookingsData(res?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBookings();
    }, [])

    const filterItems: DropdownItem[] = [
        {
            label: "All Bookings",
            onClick: () => setRoomFilter("all"),
        },
        {
            label: "Booked",
            onClick: () => setRoomFilter("Booked"),
        },
        {
            label: "Cancelled",
            onClick: () => setRoomFilter("Cancelled"),
        },
        {
            label: "Checked In",
            onClick: () => setRoomFilter("Checked In"),
        },
        {
            label: "Checked Out",
            onClick: () => setRoomFilter("Checked Out"),
        },
    ]

    const handleDownloadReport = () => {
        const csv = [
            ['ID','Room Name', 'Booked By', 'Rent', 'From', "To", "Total Rent", "Payment Mode", "Status"],
            ...filteredData.map((d:any) => [d?._id,d?.roomName, d?.bookerName, `${d.totalAmount}/night`, d.fromDate, d.toDate, `${d.totalrent}`, d.paymentMode, d.status])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bookings_report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };


    const filteredData = bookingsData
        .filter((booking:any) =>
            booking?.roomName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((booking:any) =>
            roomFilter === "all" ? true : booking?.status?.toLowerCase() === roomFilter?.toLowerCase()
        )

    console.log(bookingsData,filteredData)

    const showBookingDetails = (id : string) => {
        navigate(`/booking-details?id=${id}`)
    }

    return (
        <Wrapper className="mx-3 py-5">

            {
                loading ? (
                    <Loader text="Loading Bookings Data..." />
                ) : (
                    <>
                        <Heading
                            handleDownloadReport={handleDownloadReport}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            placeholder="Search Bookings..."
                            heading="Bookings"
                            filterItems={filterItems}
                            filterLabel="Booking Status"
                        />

                        <div className="overflow-x-auto">
                            <Table
                                data={filteredData}
                                columns={columns}
                                onCheckIn={showBookingDetails}
                                onCheckOut={showBookingDetails}
                                onCancel={() => { }}
                                onClick={showBookingDetails}
                            />
                        </div>
                    </>
                )
            }
        </Wrapper>

    );
};

export default Bookings;
