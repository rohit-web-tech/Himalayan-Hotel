import React from 'react';

export interface column {
  label : string ;
  key : string ;
}

interface TableHeaderProps {
  columns: column[];
  onSelectAll?: (checked: boolean) => void;
  allSelected?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  onSelectAll,
  allSelected,
}) => {
  return (
    <thead>
      <tr className="bg-hover border-b border-gray-200">
        {
          onSelectAll && (
            <th className="p-4">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
          )
        }
        {columns?.map((column, index) => (
          <th
            key={index}
            className="py-4 px-4 text-left text-xs font-medium text-secondary-text uppercase tracking-wider"
          >
            {column?.label}
          </th>
        ))}
        <th className="py-4 px-4 text-right text-main-text">Actions</th>
      </tr>
    </thead>
  );
};