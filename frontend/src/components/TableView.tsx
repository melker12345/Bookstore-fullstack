import React from 'react';
import { useState } from 'react';
import { BaseItem, OrderedItem, FeatureItem } from '../types/types';

interface TableViewProps<T extends BaseItem> {
  title: string;
  data: T[];
  deleteItem: (id: number) => void;
  toggleFeature?: (id: number, feature: keyof FeatureItem) => void;
}

const TableView = <T extends BaseItem>({
  title,
  data,
  deleteItem,
  toggleFeature,
}: TableViewProps<T>) => {
  const [expanded, setExpanded] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderValue = (key: string, value: any) => {
    if (key === 'orderedItems' && Array.isArray(value)) {
      return (
        <div>
          {value.map((item: OrderedItem) => (
            <div key={item.id}>{item.product_name}</div>
          ))}
        </div>
      );
    } else if (key === 'user' && typeof value === 'string') {
      return value;
    } else if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    } else if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div className="mb-8">
      <h2
        onClick={() => setExpanded(!expanded)}
        className="text-xl font-semibold mb-2 cursor-pointer"
      >
        {title} {expanded ? '-' : '+'}
      </h2>
      {expanded && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-2 border-b">
                      {key}
                    </th>
                  ))}
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {data.map((item) => (
                <tr key={item.id}>
                  {Object.entries(item).map(([key, value], index) => (
                    <td
                      key={index}
                      className="px-4 py-2 border-b border-r-[1px] border-gray-300"
                    >
                      {renderValue(key, value)}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b">
                    {toggleFeature &&
                      'isFeatured' in item &&
                      'isBestSeller' in item && (
                        <div>
                          <button
                            onClick={() => toggleFeature(item.id, 'isFeatured')}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                          >
                            {(item as FeatureItem).isFeatured
                              ? 'Unfeature'
                              : 'Feature'}
                          </button>
                          <button
                            onClick={() =>
                              toggleFeature(item.id, 'isBestSeller')
                            }
                            className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                          >
                            {(item as FeatureItem).isBestSeller
                              ? 'Unmark Best Seller'
                              : 'Mark Best Seller'}
                          </button>
                        </div>
                      )}
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableView;
