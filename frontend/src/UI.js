import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inputs from "./Inputs";
import Outputs from './Outputs';


function UI() {

    return (
        <Router>
          <Routes>
              <Route path="/" element={<Inputs />} exact />
              <Route path="/outputs" element={<Outputs />} />
          </Routes>
        </Router>
    );
}

export default UI;