import React from "react";

import { Header, Footer } from "@components";

interface StandardLayoutProps {}

const StandardLayout: React.FunctionComponent<StandardLayoutProps> = ({
  children,
}) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default StandardLayout;
