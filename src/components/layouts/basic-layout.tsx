import Header from "../layout-components/header";
import { Stack, styled } from "@mui/material";
import { Outlet, useMatch } from "react-router-dom";
import { NavigationLinks } from "../../types";

/**
 * Styled image button
 */
const Root = styled(Stack, {
  label: "layout-root"
})(() => ({
  flex: 1,
  overflow: "hidden"
}));

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
      {!isPreviewPath && <Header />}
      <Root>
        <Outlet />
      </Root>
    </>
  );
};

export default BasicLayout;
