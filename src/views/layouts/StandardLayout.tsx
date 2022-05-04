import React from "react";

import Logger from "@utilities/tools/Logger";

import { Header, Footer } from "@components";

interface StandardLayoutProps {
  center?: boolean;
}

const StandardLayout: React.FunctionComponent<StandardLayoutProps> = ({
  children,
  center = false,
}) => {
  // Render Log
  React.useEffect(() => {
    Logger.logComponentRender(StandardLayout.name);
  });

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
