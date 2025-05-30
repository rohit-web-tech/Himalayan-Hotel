import { BarChart, BedDouble, Users } from 'lucide-react'
import Wrapper from '../components/Wrapper'
import { fetchGetData } from '../lib/fetchData'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const navigate = useNavigate();

    const getAllData = async () => {
        const res = await fetchGetData("/booking/allcounts", setLoading);
        if (res?.success) {
            setData(res?.data);
        }
    }

    useEffect(() => {
        getAllData();
    }, [])

    const handleNavigate = (to : string) => {
        navigate(to);
    } 

    return (
        <Wrapper>
            {/* <ModalUsage/> */}
            {
                loading ?
                    (
                        <Loader text="Loading..." />
                    ) : (
                        <div
                            className='w-full flex flex-col gap-4 py-10 md:py-20'
                        >
                            <div className="relative grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                {/* <div
                    className="bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer flex items-start justify-between p-4 col-span-full md:col-span-2"
                >
                    <div>
                        <h3 className="font-semibold text-sm text-gray">Earnings</h3>
                        <p className="text-main-text    text-base">₹63,448.78</p>
                        <Button className="rounded-md mt-2" text="Download" />
                    </div>
                    <div
                        className="p-3 rounded-full text-white"
                        style={{
                            backgroundColor: themeColor,
                        }}
                    >
                        <IndianRupee />
                    </div>
                </div> */}

                                <div
                                    className="bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer flex flex-col justify-center items-start p-4"
                                    onClick={()=>handleNavigate("/users")}
                                >
                                    <div className="p-3 bg-cyan-100 rounded-full hover:shadow-md mb-2"
                                    >
                                        <Users className="text-cyan-700" />
                                    </div>
                                    <p className="text-main-text text-base"
                                    >
                                        {data?.users}
                                    </p>
                                    <p className="font-normal text-sm text-gray">Customers</p>

                                </div>
                                <div
                                    className="bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer flex flex-col justify-center items-start p-4"
                                    onClick={()=>handleNavigate("/admins")}
                                    >
                                    <div className="p-3 bg-green-100 rounded-full hover:shadow-md mb-2"
                                    >
                                        <Users className="text-green-700" />
                                    </div>
                                    <p className="text-main-text    text-base"
                                    >
                                        {data?.admins}
                                    </p>
                                    <p className="font-normal text-sm text-gray">Staff</p>
                                </div>

                                <div
                                    className="bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer flex flex-col justify-center items-start p-4"
                                        onClick={()=>handleNavigate("/rooms")}
                                        >
                                    <div className="p-3 bg-yellow-100 rounded-full hover:shadow-md mb-2">
                                        <BedDouble className="text-yellow-700" />
                                    </div>
                                    <p className="text-main-text    text-base">
                                        {data?.rooms}
                                    </p>
                                    <p className="font-normal text-sm text-gray">Rooms</p>
                                </div>

                                <div
                                    className="bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer flex flex-col justify-center items-start p-4"
                                    onClick={()=>handleNavigate("/bookings")}
                                >
                                    <div className="p-3 bg-green-100 rounded-full hover:shadow-md mb-2">
                                        <BarChart className="text-green-700" />
                                    </div>
                                    <p className="text-main-text text-base">
                                        {data?.bookings}
                                    </p>
                                    <p className="font-normal text-sm text-gray">Bookings</p>
                                </div>
                            </div>
                            {/* <div
                className='relative grid gap-4 grid-cols-6'
            >
                <div
                    className="bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer flex items-start justify-between p-4  md:col-span-4 flex-col col-span-full"
                >
                    <div
                        className='flex justify-between w-full items-center'
                    >
                        <h3
                            className='text-main-text font-semibold text-lg'
                        >Revenue Updates</h3>
                        <div
                            className='flex gap-3 text-sm font-medium'
                        >
                            <div
                                className="text-gray"
                            >Expenses</div>
                            <div
                                style={{
                                    color: themeColor,
                                }}
                            >Budget</div>
                        </div>
                    </div>
                    <div
                        className='flex md:items-start items-center p-4 w-full md:flex-row flex-col md:gap-0 gap-4'
                    >
                        <div
                            className='flex flex-col gap-3 w-full relative md:border-r-1 md:pr-4 border-slate-300   '
                        >
                            <div
                                className='flex items-center gap-1'
                            >
                                <div>
                                    <h4
                                        className='font-semibold text-main-text    text-xl'
                                    >₹93,438</h4>
                                    <p
                                        className='font-normal text-gray text-sm'
                                    >Budget</p>
                                </div>
                                <div
                                    className='bg-green-500 text-white rounded-3xl p-1 text-xs'
                                >
                                    23%
                                </div>

                            </div>
                            <div>
                                <h4
                                    className='font-semibold text-main-text    text-xl'
                                >₹48,487</h4>
                                <p
                                    className='font-normal text-gray text-sm'
                                >Expenses</p>
                            </div>
                            <LineChartComponent />
                            <Button
                                className='rounded-lg'
                                text='Download Report'
                            />
                        </div>
                        <div
                            className='flex gap-3 w-full relative md:pl-4 justify-center h-full items-center'
                        >
                            <BarChartComponent />
                        </div>
                    </div>
                </div>
                <div
                    className='flex h-full w-full flex-col relative md:col-span-2 col-span-full gap-4'
                >
                    <div
                        className="bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer h-full w-full p-4 flex flex-col justify-between gap-3"
                    >
                        <div
                            className='flex justify-between'
                        >
                            <h3
                                className='font-medium text-xl text-main-text   '
                            >
                                Earnings
                            </h3>
                            <div>
                                <p
                                    className='text-lg text-main-text    font-semibold'
                                >₹63,448.78</p>
                                <p
                                    className='text-xs text-gray font-medium'
                                >Total Revenue</p>
                            </div>
                        </div>
                        <RevenueBarChart />
                    </div>
                    <div
                        className="bg-main-bg rounded-lg hover:shadow-sm hover:cursor-pointer h-full w-full p-4 flex justify-between items-center"
                    >
                        <div>
                            <p
                                className='text-lg text-main-text    font-semibold'
                            >₹43,246</p>
                            <p
                                className='text-xs text-gray font-medium'
                            >Total Sales</p>
                        </div>
                        <SalesPieChart />
                    </div>
                </div>
            </div>
            <div
                className='relative grid gap-4 grid-cols-6'
            >
                <div
                    className="bg-main-bg rounded-lg hover:shadow-sm hover:cursor-pointer flex p-4 md:col-span-2 flex-col gap-5 col-span-full h-[500px]"
                >
                    <div
                        className='flex justify-between w-full items-center'
                    >
                        <h3
                            className='text-main-text  font-semibold text-lg'
                        >Recent Transactions</h3>
                    </div>
                    <div
                        className='flex md:items-start items-center w-full flex-col gap-4 overflow-y-auto'
                    >
                        <Transaction
                            type="add"
                            method="paypal"
                            amount={500}
                        />
                        <Transaction
                            type="refund"
                            method="wallet"
                            amount={1000}
                        />
                        <Transaction
                            type="add"
                            method="credit-card"
                            amount={100}
                        />
                        <Transaction
                            type="add"
                            method="wallet"
                            amount={9000}
                        />
                        <Transaction
                            type="refund"
                            method="wallet"
                            amount={500}
                        />
                        <Transaction
                            type="add"
                            method="credit-card"
                            amount={6000}
                        />
                        <Transaction
                            type="refund"
                            method="paypal"
                            amount={300}
                        />
                        <Transaction
                            type="refund"
                            method="wallet"
                            amount={500}
                        />
                        <Transaction
                            type="add"
                            method="credit-card"
                            amount={6000}
                        />
                        <Transaction
                            type="refund"
                            method="paypal"
                            amount={300}
                        />
                    </div>
                    <div
                        className='border-t-1 border-gray pt-2 text-right text-gray text-sm'
                    >
                        20 Recent transactions
                    </div>
                </div>
                <div
                    className='flex h-full w-full flex-col relative md:col-span-4 col-span-full gap-4 bg-main-bg   rounded-lg hover:shadow-sm hover:cursor-pointer p-4 justify-between'
                >
                    <div
                        className='flex justify-between w-full items-center'
                    >
                        <h3
                            className='text-main-text  font-semibold text-lg'
                        >Sales Overview</h3>
                        
                        <Dropdown
                            label="Select Month"
                            items={[
                                {
                                    label: "March 2025",
                                    onClick: () => alert("Profile clicked"),
                                },
                                {
                                    label: "February 2025",
                                    onClick: () => alert("true"),
                                },
                                {
                                    label: "January 2025",
                                    onClick: () => alert("Logging out..."),
                                },
                            ]}
                        />
                    </div>
                    <SalesOverviewChart />
                </div>
            </div> */}
                        </div>
                    )
            }
        </Wrapper>
    )
}

export default Dashboard