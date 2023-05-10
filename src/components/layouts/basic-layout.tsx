import Header from "../layout-components/header";
import { Stack } from "@mui/material";
import { Outlet, useMatch } from "react-router-dom";
import { NavigationLinks } from "../../types";

/**
 * Basic layout component
 *
 * @param props component properties
 */
const BasicLayout = () => {
  const isPreviewPath = !!useMatch(`${NavigationLinks.PREVIEW}/:id`);

  /**
   * Component render
   */
  return (
    <>
    {/* TODO: Is there a better way to do this? */}
      { !isPreviewPath && <Header /> }
      <Stack flex={1}>
        <Outlet/>
      </Stack>
    </>
  )

};

export default BasicLayout;
