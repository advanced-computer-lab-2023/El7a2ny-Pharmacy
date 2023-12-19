import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import React , {useEffect , useState}from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';

export default function PharmacistDocs({PharmacistToken}) {
  let pharmacistHeaders = { 'Authorization': `Bearer ${PharmacistToken}` };
  const [workingLicense, setWorkingLicense] = useState(null);
  const [pharmacyDegree, setPharmacyDegree] = useState(null);
  const [govId, setGovId] = useState(null);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);

  useEffect(() => {
    // Enable the upload button only when all files are selected
    setUploadButtonDisabled(!(workingLicense && pharmacyDegree && govId));
    console.log(!(workingLicense && pharmacyDegree && govId));

  }, [workingLicense, pharmacyDegree, govId]);

  async function sendFiles() {
    try {
      if (workingLicense) {
        await sendWorkingLicense(workingLicense);
      }
      if (pharmacyDegree) {
        await sendPharmacyDegree(pharmacyDegree);
      }
      if (govId) {
        await sendGovId(govId);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function sendWorkingLicense(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.patch(ApiBaseUrl + 'pharmacists/upload-working-license', formData, { headers: pharmacistHeaders });
      setWorkingLicense(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendPharmacyDegree(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.patch(ApiBaseUrl + 'pharmacists/upload-pharmacy-degree', formData, { headers: pharmacistHeaders });
      setPharmacyDegree(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function sendGovId(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.patch(ApiBaseUrl + 'pharmacists/upload-gov-id', formData, { headers: pharmacistHeaders });
      setGovId(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Pharmacist Documents</title>
      </Helmet>
      <div className="container  mt-4">
        <h4 className="text-muted">Upload Pharmacist Documents :</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="docContainer">
              <label htmlFor="workingLicense" className='fs-5'>Working License</label>
              <FileUpload
                chooseOptions={{ label: 'Select File', className: 'p-button-secondary rounded' }}
                uploadOptions={{ label: 'Confirm',icon:'pi pi-check' ,className: 'p-button-secondary rounded d-none' }}
                cancelOptions={{ label: 'Cancel' ,className: 'p-button-danger rounded' }}
                accept="image/*"
                multiple={false}
                name="workingLicense"
                onSelect={(e) => setWorkingLicense(e.files[0])}
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="docContainer">
              <label htmlFor="pharmacyDegree" className='fs-5'>Pharmacy Degree </label>
              <FileUpload
                chooseOptions={{ label: 'Select File', className: 'p-button-secondary rounded' }}
                uploadOptions={{ label: 'Confirm',icon:'pi pi-check' ,className: 'p-button-secondary rounded d-none' }}
                cancelOptions={{ label: 'Cancel' ,className: 'p-button-danger rounded' }}
                accept="image/*"
                multiple={false}
                name="pharmacyDegree"
                onSelect={(e) => setPharmacyDegree(e.files[0])}
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="docContainer">
              <label htmlFor="govId" className='fs-5'>Government ID</label>
              <FileUpload
                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                chooseOptions={{ label: 'Select File', className: 'p-button-secondary rounded' }}
                uploadOptions={{ label: 'Confirm',icon:'pi pi-check' ,className: 'p-button-secondary rounded d-none' }}
                cancelOptions={{ label: 'Cancel' ,className: 'p-button-danger rounded' }}
                accept="image/*"
                multiple={false}
                name="govId"
                onSelect={(e) => setGovId(e.files[0])}
                />
            </div>
          </div>
          <Button
          className="p-button-primary mt-2 rounded col-md-4 mx-auto" 
          onClick={sendFiles}
          disabled={uploadButtonDisabled}
          
        >
          <span className='mx-auto text-uppercase'><i className='pi pi-upload me-1'></i> Upload All Files</span>
        </Button>

        </div>
      </div>
    </>
  );
}
