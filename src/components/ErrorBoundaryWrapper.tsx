import React from "react";

import useErrorBoundary from "use-error-boundary";

const ErrorBoundaryWrapper:React.FC = ({ children }):JSX.Element => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  
  if(didCatch)
  return <div>this Error Occured: {error}</div>;

  return <ErrorBoundary>
    {children}
  </ErrorBoundary>;
};

export default ErrorBoundaryWrapper;