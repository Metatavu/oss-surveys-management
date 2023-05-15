import { Box, Button, Stack, Toolbar, Typography, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import strings from "../../localization/strings";
import theme from "../../styles/theme";

/**
 * Component props
 */
interface Props {
  surveyName: string;
}

/**
 * Styled preview toolbar component
 */
const StyledToolbar = styled(Toolbar, {
  label: "preview-toolbar"
})(({ theme }) => ({
  width: "100%",
  background: theme.palette.common.black
}));

/**
 * Styled preview toolbar component
 */
const ToolbarContent = styled(Stack, {
  label: "preview-toolbar-content"
})(({ theme }) => ({
  width: "100%",
  color: theme.palette.primary.light,
  background: theme.palette.common.black
}));

/**
 * Renders preview toolbar
 *
 * @param props component properties
 */
const PreviewToolbar = ({ surveyName }: Props) => {
  const navigate = useNavigate();

  return (
    <StyledToolbar>
      <ToolbarContent direction="row">
        <Box flex={1}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            {strings.generic.back}
          </Button>
        </Box>
        <Stack spacing={1} direction="row" alignItems="center" flex={1} justifyContent="center">
          <Typography color={theme.palette.common.white}>
            {strings.editSurveysScreen.editing}
          </Typography>
          <Typography>/</Typography>
          <Typography variant="h5" color={theme.palette.primary.main}>
            {surveyName}
          </Typography>
        </Stack>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Button endIcon={<ShareIcon />}>{strings.previewScreen.sharePreview}</Button>
        </Box>
      </ToolbarContent>
    </StyledToolbar>
  );
};

export default PreviewToolbar;
