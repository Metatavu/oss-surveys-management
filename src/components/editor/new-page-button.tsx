import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import strings from "../../localization/strings";

/**
 * Styled new page button root component
 */
const Root = styled(Button, {
  label: "new-page-button"
})(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 280,
  height: 497,
  "&:hover": {
    borderStyle: "solid",
    color: theme.palette.primary.dark
  }
}));

/**
 * Styled new page button root component
 */
const IconContainer = styled(Box, {
  label: "icon-container"
})(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: theme.palette.primary.main,
  borderRadius: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 100,
  width: 100,
  position: "relative"
}));

/**
 * Component props
 */
interface Props {
  onClick(): void;
  disabled?: boolean;
}

/**
 * New page button component
 *
 * @param props component properties
 */
const NewPageButton = ({ onClick, disabled }: Props) => {
  return (
    <Root onClick={onClick} disabled={disabled}>
      <Stack gap={2}>
        <IconContainer>
          <Add color="primary" />
        </IconContainer>
        <Typography color="primary">{strings.editSurveysScreen.addNewPage}</Typography>
      </Stack>
    </Root>
  );
};

export default NewPageButton;
