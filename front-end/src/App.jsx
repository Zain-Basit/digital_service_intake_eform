import React from 'react';
import OntarioHeader from './components/OntarioHeader.jsx';
import OntarioFooter from './components/OntarioFooter.jsx';
import IntakeForm from './components/IntakeForm.jsx';
import './App.css';

const App = () => {
  return (
    <>
      <OntarioHeader />
      <main className="ontario-row ontario-margin-top-32 ontario-margin-bottom-32">
        <div className="ontario-column ontario-small-12 ontario-medium-12 ontario-large-8 ontario-large-offset-2">
          <h1>Digital Service Intake Form</h1>
          <IntakeForm />
        </div>
      </main>
      <OntarioFooter />
    </>
  );
};

export default App;
