import { Paper, Stack, styled } from "@mui/material";
import { FC, ReactNode } from "react";

/**
 * Styled panel component
 */
const Panel = styled(Paper, {
  label: "panel"
})(() => ({
  display: "flex",
  borderLeft: "1px solid #DADCDE",
  width: 392,
  borderRadius: 0,
  overflow: "auto"
}));

/**
 * Component props
 */
interface Props {
  children: ReactNode;
  width?: number;
}

/**
 * Renders editor component
 */
const PropertiesPanel: FC<Props> = ({ children, width = 392 }) => {
  return (
    <Panel elevation={0} sx={{ width: width }}>
      <Stack flex={1}>{children}</Stack>
    </Panel>
  );
};

export default PropertiesPanel;
