import React from 'react';
import ApplicationForm from './Screen/ApplicationForm';
import { Route, Routes } from 'react-router-dom';
import Congrat from './Screen/Congrat';

function App() {
  return (

    <div>
      {/* <Navbar/> */}
        <Routes>
            
          <Route path='/' element={<ApplicationForm />} />
          <Route path='/congrat' element={<Congrat/>} />
          
        </Routes>

    </div>
  );
}

export default App;
