import React from "react";

/**
 * Component props
 */
export interface Props {
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
  return <>{children}</>;
};

export default BasicLayout;
