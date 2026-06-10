import {BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Adminpanel from "./pages/adminPanel";
import Contact from "./pages/contact";
import Lead from "./pages/Lead";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Login />}/>
      <Route path = "/home" element={<Adminpanel />}/>
      <Route path = "/contacts" element={<Contact />}/>
      <Route path = "/leads" element={<Lead />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;