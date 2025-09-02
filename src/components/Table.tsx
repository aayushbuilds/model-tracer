import React, { useState, useMemo } from 'react';

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  width: string;
  sortable?: boolean;
  sortKey?: keyof T;
  render?: (value: any, item: T) => React.ReactNode;
}

interface TableProps<T extends Record<string, any>> {
  columns: ColumnConfig<T>[];
  data: T[];
  emptyMessage?: string;
}

function Table<T extends Record<string, any>>({
                                                columns,
                                                data,
                                                emptyMessage = 'No data available'
                                              }: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    order: 'asc' | 'desc' | null;
  }>({ key: null, order: null });

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.order) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof T];
      const bVal = b[sortConfig.key as keyof T];

      // Extract numeric values from percentages if present
      const parseValue = (val: any) => {
        if (typeof val === 'string' && val.includes('%')) {
          return parseFloat(val.replace('%', ''));
        }
        return val;
      };

      const aNum = parseValue(aVal);
      const bNum = parseValue(bVal);

      // Compare numerically if both are numbers
      if (typeof aNum === 'number' && typeof bNum === 'number') {
        return sortConfig.order === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Otherwise compare as strings
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleSort = (columnKey: keyof T, order: 'asc' | 'desc') => {
    setSortConfig(prev =>
        prev.key === columnKey && prev.order === order
            ? { key: null, order: null }
            : { key: columnKey, order }
    );
  };

  const SortButton = ({ column, direction }: { column: ColumnConfig<T>, direction: 'asc' | 'desc' }) => {
    const sortKey = column.sortKey || column.key;
    const isActive = sortConfig.key === sortKey && sortConfig.order === direction;
    const path = direction === 'asc' ? 'M4 0L0 5H8L4 0Z' : 'M4 5L8 0H0L4 5Z';

    return (
        <button
            onClick={() => handleSort(sortKey, direction)}
            className={`transition-colors ${direction === 'desc' ? 'p-1' : ''}`}
            title={`Sort ${direction}ending`}
        >
          <svg width="8" height="5" viewBox="0 0 8 5"
               className={`transition-colors cursor-pointer ${isActive ? 'text-[#737373]' : 'text-gray-400'}`}>
            <path d={path} fill="currentColor" />
          </svg>
        </button>
    );
  };

  const getCellClass = (rowIdx: number, colIdx: number, totalRows: number, totalCols: number) => {
    const classes = ['p-3 align-middle whitespace-nowrap text-sm'];
    const isFirst = rowIdx === 0;
    const isLast = rowIdx === totalRows - 1;
    const isFirstCol = colIdx === 0;
    const isLastCol = colIdx === totalCols - 1;

    if (isFirst && isFirstCol) classes.push('rounded-tl-xl');
    if (isFirst && isLastCol) classes.push('rounded-tr-xl');
    if (isLast && isFirstCol) classes.push('rounded-bl-xl');
    if (isLast && isLastCol) classes.push('rounded-br-xl');

    return classes.join(' ');
  };

  return (
      <div className="relative w-full overflow-hidden bg-[#fafafb] rounded-2xl border border-gray-200 px-2 pb-2">
        <table className="w-full caption-bottom text-sm border-separate border-spacing-0 table-fixed rounded-xl overflow-hidden">
          <thead>
          <tr className="border-b border-gray-200">
            {columns.map(column => (
                <th
                    key={String(column.key)}
                    className="h-10 px-3 align-middle font-medium text-left text-xs uppercase text-[#a1a1a1] whitespace-nowrap"
                    style={{ width: column.width }}
                >
                  {column.sortable ? (
                      <div className="flex items-center justify-start">
                        <span className="text-[#a1a1a1]">{column.label}</span>
                        <div className="flex flex-col items-center ml-2">
                          <SortButton column={column} direction="asc" />
                          <SortButton column={column} direction="desc" />
                        </div>
                      </div>
                  ) : (
                      column.label
                  )}
                </th>
            ))}
          </tr>
          </thead>
          <tbody className="bg-white text-[#737373]">
          {sortedData.length > 0 ? (
              sortedData.map((item, rowIdx) => (
                  <tr
                      key={rowIdx}
                      className={`hover:bg-[#73737310] transition-colors border-b border-gray-100 last:border-b-0 
                  ${rowIdx === 0 ? 'first:rounded-t-xl' : ''} 
                  ${rowIdx === sortedData.length - 1 ? 'last:rounded-b-xl' : ''}`}
                  >
                    {columns.map((column, colIdx) => (
                        <td
                            key={String(column.key)}
                            className={getCellClass(rowIdx, colIdx, sortedData.length, columns.length)}
                        >
                          {column.render ? column.render(item[column.key], item) : item[column.key]}
                        </td>
                    ))}
                  </tr>
              ))
          ) : (
              <tr>
                <td
                    className="p-3 align-middle whitespace-nowrap text-center py-8 text-gray-500"
                    colSpan={columns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
}

export default Table;
