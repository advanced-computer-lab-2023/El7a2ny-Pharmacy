import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import AddAdmin from '../AddAdmin/AddAdmin';

export default function AllAdmins({ AdminToken }) {
  let AdminHeaders = { 'Authorization': `Bearer ${AdminToken}` };

  const [Admins, setAdmins] = useState([]);
  const [displayAddAdminDialog, setDisplayAddAdminDialog] = useState(false);

  async function getAllAdmins() {
    try {
      let { data } = await axios.get(ApiBaseUrl + `administrators/all-admins`, { headers: AdminHeaders });
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function delAdmin(id) {
    try {
      let { data } = await axios.delete(ApiBaseUrl + `administrators/remove-admin/${id}`, { headers: AdminHeaders });
      getAllAdmins();
    } catch (error) {
      console.error(error);
    }
  }

  const createdAtBodyTemplate = (rowData) => {
    return <span>{rowData.createdAt ? rowData.createdAt.slice(0, 10) : ''}</span>;
  };

  useEffect(() => {
    getAllAdmins();
  }, [AdminToken]);

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-trash" className={`TabelButton mx-auto Cancel`} onClick={() => delAdmin(rowData._id)} />
      </div>
    );
  };

  const showDialog = () => {
    setDisplayAddAdminDialog(true);
  };

  const hideDialog = () => {
    setDisplayAddAdminDialog(false);
  };

  const header = (
    <div className="d-flex justify-content-between">
      <h2 className='text-secondary'>All Admins :</h2>
      <Button label="Add Admin" icon="pi pi-plus" className="mb-2 rounded" onClick={showDialog} />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>All Admins</title>
      </Helmet>
      <div className="container mt-3 w-75">
        <DataTable value={Admins} header={header} paginator selectionMode="single" className={`dataTabel mb-4 text-capitalize allAdminTable`} dataKey="_id" scrollable scrollHeight="100vh" rows={10} responsive="scroll">
          <Column field="username" header="User Name" sortable style={{ maxWidth: "40%" , borderBottom: '1px solid #dee2e6' }} />
          <Column field="createdAt" header="Created At" body={createdAtBodyTemplate} sortable style={{ maxWidth: '40%' , borderBottom: '1px solid #dee2e6' }}></Column>
          <Column body={actionTemplate} header="Actions" style={{ textAlign: 'center', width: '20%' , borderBottom: '1px solid #dee2e6' }} />
        </DataTable>
        <Dialog header="Add Admin" className='dialogWidth'  visible={displayAddAdminDialog} onHide={hideDialog} modal>
          <AddAdmin AdminToken={AdminToken} />
        </Dialog>
      </div>
    </>
  );
}
