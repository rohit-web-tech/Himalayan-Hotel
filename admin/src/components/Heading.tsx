import Dropdown, { DropdownItem } from "../components/Dropdown";
import { Download, Trash2, Search, Plus } from "lucide-react";
import { useGlobalContext } from '../contexts/GlobalContext';

interface Props {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    handleDownloadReport: () => void;
    handleBulkDelete?: () => void;
    selectedIds?: any;
    showFilter?: boolean;
    placeholder: string;
    heading: string;
    filterLabel?: string;
    filterItems?: DropdownItem[];
    onAdd?: ()=>void;
}

const Heading = ({
    searchTerm = "",
    setSearchTerm = () => { },
    handleDownloadReport = () => { },
    handleBulkDelete = () => { },
    selectedIds = "",
    showFilter = true,
    placeholder = "Search anything...",
    heading = "Records Management",
    filterLabel = "Select Room",
    filterItems = [],
    onAdd
}: Props) => {

    const { themeColor } = useGlobalContext();

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
            <h1 className="text-2xl font-semibold text-main-text">
                {heading}
            </h1>

            <div className="flex flex-col md:flex-row items-stretch gap-3 w-full md:w-auto">
                <div className="relative md:max-w-64">
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="text-sm w-full px-10 py-2 border border-border text-secondary-text rounded-lg shadow-sm focus:outline-none placeholder:text-gray bg-main-bg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>

                {
                    showFilter && (
                        <Dropdown
                            className="bg-main-bg"
                            label={filterLabel}
                            items={filterItems}
                        />
                    )

                }

                <button
                    className="flex text-sm items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                    onClick={handleDownloadReport}
                    style={{
                        background: themeColor
                    }}
                >
                    <Download className="w-4 h-4" />
                    <span className="md:hidden">Download Report</span>
                </button>

                {
                    selectedIds && (
                        <button
                            className="flex text-sm items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 text-center"
                            onClick={handleBulkDelete}
                            disabled={selectedIds.length === 0}
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="md:hidden">Delete Selected</span>
                        </button>
                    )
                }
                {
                    onAdd && (
                        <button
                            className="flex text-sm items-center gap-2 px-4 py-2 text-white rounded-lg transition text-center"
                            onClick={onAdd}
                            style={{
                                background: themeColor
                            }}
                        >
                            <Plus className="w-4 h-4" />
                            <span className="md:hidden">Add New</span>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Heading
