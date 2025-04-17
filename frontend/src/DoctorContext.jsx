import { createContext, useContext } from 'react';

const DoctorContext = createContext();
  
export const useData = () => useContext(DoctorContext);

export default DoctorContext

