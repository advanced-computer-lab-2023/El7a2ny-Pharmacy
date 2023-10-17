import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import PharmacistRegister from './Components/PharmacistRegister/PharmacistRegister';
import Notfound from './Components/Notfound/Notfound';
import AddAdmin from './Components/AddAdmin/AddAdmin';
import PatientList from './Components/PatientList/PatientList';
import PatientRegister from './Components/PatientRegister/PatientRegister';
import PatientDetails from './Components/PatientDetails/PatientDetails';
import Home from './Components/Home/Home';
import PharmacistList from './Components/PharmacistList/PharmacistList';
import MedicineList from './Components/MedicineList/MedicineList';
import EditMedicine from './Components/EditMedicine/EditMedicine';

function App() {
  const routes = createHashRouter([
    {
      path: "",element:<Layout/>,
      children:[
        {index:true , element:<Home/>},
        {path : "Home",element:<Home/>},
        {path : "PharmacistRegister",element:<PharmacistRegister/>},
        {path : "MedicineList",element:<MedicineList/>},
        {path : "PharmacistList",element:<PharmacistList/>},
        {path : "AddAdmin",element:<AddAdmin/>},
        {path : "PatientList",element:<PatientList/>},
        {path : "EditMedicine/:id",element:<EditMedicine/>},
        {path : "PatientDetails/:id",element:<PatientDetails/>},
        {path : "PatientRegister",element:<PatientRegister/>},
        {path : "*",element:<Notfound/>}
      ]
    }
  ])
  return <>
      <RouterProvider router={routes}></RouterProvider>
    </>
}
export default App;