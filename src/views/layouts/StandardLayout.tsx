import React from "react";

import { Header, Footer } from "@components";

interface StandardLayoutProps {
  center?: boolean;
}

const StandardLayout: React.FunctionComponent<StandardLayoutProps> = ({
  children,
  center = false,
}) => {
  return (
    <React.Fragment>
      <Header />
      <div className={"page-content" + (center ? " center-content" : "")}>
        {children}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default StandardLayout;
