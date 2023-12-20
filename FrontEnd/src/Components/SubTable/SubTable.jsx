import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SubTable = ({ data }) => {
  // Define the columns for the nested table
  const nestedColumns = [
    { field: 'createdAt', header: 'Creation Date' },
    { field: 'updatedAt', header: 'Last Updated' },
    // Add more fields as needed
  ];

  return (
    <DataTable value={data} header="Prescription Details" style={{ width: '100%' }}>
      {nestedColumns.map((col) => (
        <Column key={col.field} field={col.field} header={col.header} />
      ))}
    </DataTable>
  );
};

export default SubTable;
