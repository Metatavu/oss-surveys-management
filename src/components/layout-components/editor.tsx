import { Stack, styled } from "@mui/material";
import theme from "../../styles/theme";
import NewPageButton from "./new-page-button";

/**
 * Styled editor container component
 */
const EditorContainer = styled(Stack, {
  label: "toolbar-container"
})(() => ({
  position: "relative",
  padding: theme.spacing(4),
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between"
}));

/**
 * Renders editor component
 */
const Editor = () => {
  return (
    <EditorContainer direction="row" gap={4}>
      <NewPageButton/>
    </EditorContainer>
  )
};

export default Editor;