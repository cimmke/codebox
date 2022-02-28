import React, { useState } from 'react';
import Welcome from './Welcome';
import FormFirstName from './FormFirstName';
import FormLastName from './FormLastName';
import FormEmail from './FormEmail';
import FormSourceControl from './FormSourceControl';
import FormTeamSize from './FormTeamSize';
import FormConfirm from './FormConfirm';
import FormSuccess from './FormSuccess';


const defaultValues = {
  firstName:  "",
  lastName:  "",
  email: "",
  sourceControl: "other",
  teamSize: 1,
};

function LandingPage() {
  const [formValues, setFormValues] = useState(defaultValues);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = input => event => {
    setFormValues({
      ...formValues,
      [input]: event.target.value,
    });
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  switch(currentStep) {
    case 1:
      return <Welcome nextStep={nextStep} />;
    case 2:
      return (
        <FormFirstName
          nextStep={nextStep}
          previousStep={previousStep}
          onChange={handleChange}
          value={formValues.firstName}
        />
      )
    case 3:
      return (
        <FormLastName
          nextStep={nextStep}
          previousStep={previousStep}
          onChange={handleChange}
          value={formValues.lastName}
        />
      )
    case 4:
      return (
        <FormEmail
          nextStep={nextStep}
          previousStep={previousStep}
          onChange={handleChange}
          value={formValues.email}
        />
      )
    case 5:
      return (
        <FormSourceControl
          nextStep={nextStep}
          previousStep={previousStep}
          onChange={handleChange}
          value={formValues.sourceControl}
        />
      )
    case 6:
      return (
        <FormTeamSize
          nextStep={nextStep}
          previousStep={previousStep}
          onChange={handleChange}
          value={formValues.teamSize}
        />
      )
    case 7:
      return (
        <FormConfirm
          nextStep={nextStep}
          previousStep={previousStep}
          onChange={handleChange}
          values={formValues}
        />
      )
    case 8:
      return <FormSuccess />
    default:
      return <Welcome nextStep={nextStep} />;
  }
}

export default LandingPage;