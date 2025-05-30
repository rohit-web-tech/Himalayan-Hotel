import { useEffect, useState } from "react";
import { fetchGetData } from "../../lib/fetchData";
import {Loader} from "lucide-react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { X } from "lucide-react";

interface IProps {
    loading: boolean;
    title: string;
    initialUserData: any;
    edit: boolean;
    submitHandler: (inventory: any) => void;
    goBackHandler: () => void;
}

const RoomInventoryForm = ({ loading = false, title, initialUserData = "", edit = false, submitHandler = () => { }, goBackHandler = () => { } }: IProps) => {
    const [inventory, setInventory] = useState<any>(initialUserData ?
        {
            inventory: initialUserData?.item?._id,
            ...initialUserData
        }
        :
        {
            inventory: "",
            quantity: 0
        });

    const { themeColor } = useGlobalContext();
    const [inventories, setInventories] = useState([]);

    const handleUserInput = (e: any) => {
        setInventory((inventory: any) => ({ ...inventory, [e.target.name]: e.target.value }))
    }

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
        <form
            onSubmit={(e:any)=>{
                e.preventDefault();
                console.log(inventory)
                submitHandler(inventory)
            }}
            className="w-full bg-main-bg border border-border rounded-2xl shadow-2xl p-10 space-y-8 transition"
        >
            <div
                className="w-full flex justify-between items-center"
            >
                <h2 className="text-2xl font-semibold text-main-text">{title || "Admin Entry Form"}</h2>
                <X
                    className="text-gray w-6 h-6 cursor-pointer"
                    onClick={goBackHandler}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div >
                    <label className="block mb-1 text-sm font-medium text-gray">
                        Inventory
                    </label>
                    <select
                        name="inventory"
                        id="inventory"
                        className={"w-full rounded-lg border border-gray bg-main-bg text-secondary-text placeholder:text-gray-400 px-3 py-2 text-sm shadow-sm transition"}
                        onChange={handleUserInput}
                    >
                        <option value="">Select an inventory</option>
                        {
                            inventories?.map((val: any) => (
                                <option key={val._id} value={val._id} selected={val._id == inventory?.inventory}>{val.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div >
                    <label className="block mb-1 text-sm font-medium text-gray">
                        Quantity/Room
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        required={true}
                        onChange={handleUserInput}
                        value={inventory?.quantity}
                        style={{
                            outlineColor: themeColor
                        }}
                        className="w-full rounded-lg border border-gray bg-main-bg text-secondary-text placeholder:text-gray-400 px-3 py-2 text-sm shadow-sm transition"
                    />
                </div>
            </div>
            <div className="pt-2">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 text-white font-medium px-6 py-2.5 rounded-lg shadow transition text-sm cursor-pointer w-full disabled:cursor-progress disabled:opacity-75 hover:opacity-85"
                    style={{
                        background: themeColor
                    }}
                    disabled={loading}
                >
                    {loading ? (<Loader className="w-4 h-4 animate-spin" />) : (
                        (edit ? "Save Changes" : "Submit")
                    )}
                </button>
            </div>
        </form>
    )
}

export default RoomInventoryForm;