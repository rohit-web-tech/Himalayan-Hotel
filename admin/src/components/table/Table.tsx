import React from 'react';
import { column, TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { FileX } from 'lucide-react'; // Lucide icon for "No Data"

interface TableProps {
  data: any[];
  columns: column[];
  onEdit?: (item: any) => void;
  onInventory?: (id: string) => void;
  onDelete?: (item: any) => void;
  onSelect?: (id: string, checked: boolean) => void;
  onReply?: (id: string) => void;
  onSelectAll?: (checked: boolean) => void;
  selectedIds?: string[];
  onCheckOut?: (id: string) => void;
  onCheckIn?: (id: string) => void;
  onCancel?: (id: string) => void;
  onClick?: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  onSelect,
  onSelectAll,
  selectedIds,
  onInventory,
  onCheckOut,
  onCheckIn,
  onCancel,
  onReply,
  onClick
}) => {
  const allSelected = selectedIds?.length === data?.length && data?.length > 0;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} onSelectAll={onSelectAll} allSelected={allSelected} />
        <tbody className="bg-main-bg">
          {data.length === 0 ? (
            <tr
              className='w-full'
            >
              <td colSpan={columns.length + 2} className="text-center py-10 text-gray-500">
                <div className="flex flex-col items-center justify-center gap-2">
                  <FileX className="w-10 h-10 text-gray-400" />
                  <p className="text-sm font-medium">No data found</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <TableRow
                key={item._id}
                item={item}
                columns={columns}
                selected={selectedIds?.includes(item._id)}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
                onInventory={onInventory}
                onCheckOut={onCheckOut}
                onCheckIn={onCheckIn}
                onCancel={onCancel}
                onReply={onReply}
                onClick={onClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
