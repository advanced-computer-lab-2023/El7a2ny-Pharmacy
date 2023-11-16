import React , { useState  }  from 'react'
import ApiBaseUrl from '../ApiBaseUrl'

export default function AddMedicine() {
  let PatientHeaders = { 'Authorization': `Bearer ${PatientToken}` };
  const [NewPatientFiles, setNewPatientFiles] = useState([])
  const [PatientFiles, setPatientFiles] = useState([]);
  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  async function sendNewPatientFiles(files){
    try {
      const formData = new FormData();
      formData.append('file', files);
      await axios.patch(ApiBaseUrl + `pharmacists/upload-medicine-image/${id}`, formData, {headers: PatientHeaders});
      setNewPatientFiles([]); 
      getPatientFiles(); 
    } catch (error) {
      console.error('Error uploading files:', error);
    }  
  }
    return <>
    <Helmet>
      <title>PatientDocs</title>
    </Helmet>
    <div className="container mt-4">
      <h5 className='text-muted'> medicine Documents :</h5>
      <div className="row">
        <div className="col-md-4">
          <div className="docContainer">
            <label htmlFor="medicalImage">Add medicine image :</label>
            <input type="file"className="form-control mb-2" multiple id="medicalImage" name="medicalImage" onChange={(e) => handleFileChange(e, setNewPatientFiles)}/>
            <button className='btn btn-primary btn-sm' onClick={()=>{sendNewPatientFiles(NewPatientFiles)}}>Upload</button>
          </div>
        </div>
      </div>
</div>
  </>
}
