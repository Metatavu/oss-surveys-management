import Header from "../layout-components/header";
import React from "react";

/**
 * Component props
 */
interface Props {
  children: React.ReactNode;
}

/**
 * Basic layout component
 *
 * @param props component properties
 */
const BasicLayout: React.FC<Props> = ({ children }) => {
  /**
   * Component render
   */
  return (
    <>
      <Header />
      <div>
        {children}
      </div>
    </>
  )

};

export default BasicLayout;
