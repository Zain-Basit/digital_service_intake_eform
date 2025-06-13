import React, { useEffect } from 'react';

const OntarioHeader = () => {
  // useEffect(() => {
  //   // Ensure the Ontario Header Web Component is loaded
  //   import('@ontario-digital-service/ontario-design-system-components/loader').then(loader => {
  //     loader.defineCustomElements(window);
  //   });
  // }, []);

  return (
    <ontario-header
      language="en"
      logo-alt="Government of Ontario"
      logo-link="https://cdn.ontario.ca/ontario-logo--white.svg"
      max-width="full-width"
      heading="Digital Intake Form Application"
      heading-type="default"
      heading-url="/"
      />
  );
};

export default OntarioHeader;
