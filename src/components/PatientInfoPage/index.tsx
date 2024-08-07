import { Typography } from "@mui/material";
import ManIcon from '@mui/icons-material/Man';
import WomenIcon from '@mui/icons-material/Woman';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Patient } from "../../types";

interface patientProps{
  patient:Patient | null
}

const  PatientInfoPage =({patient}:patientProps)=>{
  //console.log(patient);
  
  if(!patient)return null;
  return(
    <>
      <Typography variant="h6" sx={{ marginTop:"2em" }}>
        {patient.name} 
        { patient.gender.toLowerCase()==='male'
          ? <ManIcon />
          :(patient.gender.toLowerCase()==='female' 
            ? <WomenIcon/>
            :<TransgenderIcon/>
           )
        }
      </Typography>
      
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <b>entries</b>
      { patient.entries.map(el=>{
        return (
          <div key={el.id}>
          <p >{el.date} {el.description}</p>
          {el.diagnosisCodes?.map(el=><li key={el}>{el}</li>)}
          </div>
        );
      })}
    </>
  );
};

export default PatientInfoPage;