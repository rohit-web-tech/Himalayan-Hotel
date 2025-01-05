import { useState } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import Loader from '../loader'
import { fetchGetData } from '../../lib/fetchData'
import { useEffect } from 'react'

const RoomInventoryForm = ({ loading = false, title, initialUserData = "", edit = false, submitHandler = () => { }, goBackHandler = () => { } }) => {
    const [inventory, setInventory] = useState(initialUserData ?
        {
            inventory : initialUserData?.item?._id,
            ...initialUserData
        }
        :
        {
            inventory: "",
            quantity: 0
        });
    const [inventories, setInventories] = useState([]);

    const handleUserInput = (e) => {
        setInventory(inventory => ({ ...inventory, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        console.log(inventory)
    }, [inventory])

    const fetchAllInventories = async () => {
        const res = await fetchGetData("/inventory/all");
        if (res?.success) {
            setInventories(res?.data || []);
        }
    }

    useEffect(() => {
        fetchAllInventories();
    }, []);

    return (
        <div className='w-full mt-4 my-3 flex flex-col justify-center'>
            <div className='absolute sm:right-14 right-6 top-6 text-sm text-gray-600 cursor-pointer' onClick={goBackHandler}>Go Back</div>
            <h3 className='text-base text-gray-700 font-semibold mb-4 mt-3'>{title}</h3>
            <form className='flex flex-col gap-4' onSubmit={(e) => {
                e.preventDefault();
                submitHandler(inventory);
            }}>
                <select
                    name="inventory"
                    id="inventory"
                    className={`w-full bg-transparent text-gray-600 rounded-md border-2 border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500`}
                    onChange={handleUserInput}
                >
                    <option value="">Select an inventory</option>
                    {
                        inventories?.map(val => (
                            <option key={val._id} value={val._id} selected={val._id == inventory?.inventory}>{val.name}</option>
                        ))
                    }
                </select>
                <InputBox
                    handleUserInput={handleUserInput}
                    name="quantity"
                    type="number"
                    placeholder="Enter Quantity Per Room"
                    value={inventory?.quantity}
                    label="Quantity"
                />
                <Submit value={loading ? (<Loader styles="h-4 w-4" />) : (edit ? "Save Changes" : "Add")} />
            </form>
        </div>
    )
}

export default RoomInventoryForm;
