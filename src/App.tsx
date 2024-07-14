import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes,useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient]= useState<Patient>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match=useMatch('/patients/:id');

  useEffect(()=>{
    const fetchPatientDetail=async()=>{
      if( match && typeof match.params.id==='string'){
        const patient=await patientService.getPatient(match.params.id);
        setPatient(patient);
      }
       
    };
    void fetchPatientDetail();
  },[ match ]);
  
  /*const patient=match 
    ? patients.find((patObj:Patient)=>patObj.id===match.params.id)
    : null;
  */
  return (
    <div className="App">
     
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientInfoPage patient={patient ? patient :null}/>}/>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          </Routes>
        </Container>
      
    </div>
  );
};

export default App;
