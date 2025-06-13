import React, { useEffect } from 'react';

const OntarioFooter = () => {
  // useEffect(() => {
  //   // Ensure the Ontario Footer Web Component is loaded
  //   import('@ontario-digital-service/ontario-design-system-components/loader').then(loader => {
  //     loader.defineCustomElements(window);
  //   });
  // }, []);

  return (
    <ontario-footer
      language="en"
      display-social-media="false"
      footer-type="simple"
      logo-image-url="https://cdn.ontario.ca/ontario-logo--white.svg"
    />
  );
};

export default OntarioFooter;
