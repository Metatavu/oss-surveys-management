import Header from "../layout-components/header";
import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * Basic layout component
 *
 * @param props component properties
 */
const BasicLayout: React.FC<Props> = () => {
  /**
   * Component render
   */
  return (
    <>
      <Header />
      <Box>
        <Outlet/>
      </Box>
    </>
  )

};

export default BasicLayout;
