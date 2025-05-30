import React from 'react';
import { Eye, Layers, LogIn, LogOut, MoreHorizontal, Pencil, Reply, Trash2, X } from 'lucide-react';
import { column } from './TableHeader';

interface TableRowProps {
  item: any;
  columns: column[];
  selected?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
  onEdit?: (item: any) => void;
  onInventory?: (id: string) => void;
  onCheckIn?: (id: string) => void;
  onCheckOut?: (id: string) => void;
  onDelete?: (item: any) => void;
  onCancel?: (id: string) => void;
  onReply?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  item,
  columns,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onInventory,
  onCheckIn,
  onCheckOut,
  onCancel,
  onReply,
  onClick
}) => {
  const SERVER_URL = import.meta.env.VITE_BASE_URL ;
  const [showActions, setShowActions] = React.useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'booked':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      case 'checked in':
        return 'bg-yellow-100 text-yellow-800';
      case 'received':
        return 'bg-yellow-100 text-yellow-800';
      case 'checked out':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr
      className="border-b border-border hover:bg-hover cursor-pointer"
      onClick={()=> onClick && onClick(item?._id)}
    >
      {
        onSelect && (
          <td className="p-4 text-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={selected}
              onChange={(e) => onSelect(item._id, e.target.checked)}
            />
          </td>
        )
      }
      {columns.map((column, index) => (
        <td key={index} className="py-4 px-4 text-main-text text-sm">
          {column?.label === 'Image' ? (
            <img
              src={SERVER_URL + item[column?.key]}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : column?.label === 'Status' ? (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                item[column?.key]
              )}`}
            >
              {item[column?.key]}
            </span>
          ) : (
            item[column?.key]
          )}
        </td>
      ))}
      <td className="py-4 px-4 text-right relative">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 cursor-pointer rounded-full"
          >
            <MoreHorizontal className="h-5 w-5 text-secondary-text" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-main-bg ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">

                {onCheckIn && item?.status === "booked" && (
                  <button
                    onClick={() => {
                      onCheckIn(item.id);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-green-500 hover:bg-hover w-full cursor-pointer2"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Check In
                  </button>
                )}
                {onReply && item?.status === "Received" && (
                  <button
                    onClick={() => {
                      onReply(item.id);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-green-500 hover:bg-hover w-full cursor-pointer2"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </button>
                )}
                {onCheckOut && item?.status === "checked in" && (
                  <button
                    onClick={() => {
                      onCheckOut(item.id);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-orange-500 hover:bg-hover w-full cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Check Out
                  </button>
                )}
                {onCancel && item?.status === "booked" && (
                  <button
                    onClick={() => {
                      onCancel(item.id);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-hover w-full cursor-pointer"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                )}
                {onInventory && (
                  <button
                    onClick={() => {
                      onInventory(item._id);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-main-text hover:bg-hover w-full cursor-pointer"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Manage Inventory
                  </button>
                )}
                {onClick && (
                  <button
                    onClick={() => {
                      onClick(item._id);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-main-text hover:bg-hover w-full cursor-pointer"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => {
                      onEdit(item);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-main-text hover:bg-hover w-full cursor-pointer"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                )}
                {onDelete && (!item?.status || item?.status === "cancelled" || item?.status === "checked out" || item?.status === "Received" || item?.status === "Replied") && (
                  <button
                    onClick={() => {
                      onDelete(item);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-hover cursor-pointer w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};