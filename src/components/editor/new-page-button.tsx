import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import strings from "../../localization/strings";

/**
 * Styled new page button root component
 */
const Root = styled(Button, {
  label: "new-page-button"
})<{ scale?: number }>(({ theme, scale = 1 }) => ({
  borderWidth: 1 / scale,
  borderStyle: "dashed",
  borderColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 280 / scale,
  height: 497 / scale,
  "&:hover": {
    borderStyle: "solid",
    color: theme.palette.primary.dark
  }
}));

/**
 * Styled icon container component
 */
export const IconContainer = styled(Box, {
  label: "icon-container"
})<{ scale?: number; borderColor?: string }>(
  ({ theme, scale = 1, borderColor = theme.palette.primary.main }) => ({
    borderWidth: 1 / scale,
    borderStyle: "dashed",
    borderColor: borderColor,
    borderRadius: 100 / scale,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 100 / scale,
    width: 100 / scale,
    position: "relative"
  })
);

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
