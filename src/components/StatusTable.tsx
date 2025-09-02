import React from 'react';
import Table, { ColumnConfig } from './Table';

interface StatusItem {
  model: string;
  product: string;
  reliability: string;
}

interface StatusTableProps {
  items?: StatusItem[];
}

const StatusTable: React.FC<StatusTableProps> = ({ items = [] }) => {
  // Sample data for demonstration
  const sampleData: StatusItem[] = items.length > 0 ? items : [
    {
      model: 'Model A',
      product: 'Product X',
      reliability: '99.5%'
    },
    {
      model: 'Model B',
      product: 'Product Y',
      reliability: '98.2%'
    },
    {
      model: 'Model C',
      product: 'Product Z',
      reliability: '99.8%'
    },
    {
      model: 'Model D',
      product: 'Product W',
      reliability: '97.1%'
    }
  ];

  const columns: ColumnConfig<StatusItem>[] = [
    {
      key: 'model',
      label: 'Model',
      width: '35%'
    },
    {
      key: 'product',
      label: 'Product',
      width: '35%'
    },
    {
      key: 'reliability',
      label: 'Reliability',
      width: '30%',
      sortable: true
    }
  ];

  return <Table columns={columns} data={sampleData} />;
};

export default StatusTable;
