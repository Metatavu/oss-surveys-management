import Header from "../layout-components/header";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

/**
 * Basic layout component
 *
 * @param props component properties
 */
const BasicLayout = () => {
  /**
   * Component render
   */
  return (
    <>
      <Header />
      <Stack flex={1}>
        <Outlet/>
      </Stack>
    </>
  )

};

export default BasicLayout;
