import styled from "@emotion/styled";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import theme from "../../styles/theme";
import strings from "../../localization/strings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  MoreHoriz,
  PlayArrowOutlined,
  PublishOutlined
} from "@mui/icons-material";
import { Survey, SurveyStatus } from "../../generated/client";
import { SurveyScreenMode } from "../../types";

/**
 * Styled toolbar container component
 */
const ToolbarContainer = styled(Paper, {
  label: "toolbar-container"
})(() => ({
  position: "relative",
  zIndex: 1100,
  borderTop: "1px solid #DADCDE",
  borderBottom: "1px solid #DADCDE",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 0
}));

/**
 * Styled controls container component
 */
const ControlsContainer = styled(Stack, {
  label: "controls-container"
})(() => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
  justifyContent: "flex-end"
}));

/**
 * Component props
 */
interface Props {
  survey?: Survey;
  mode: SurveyScreenMode;
  setMode: (mode: SurveyScreenMode) => void;
}

/**
 * Renders toolbar component
 */
const Toolbar = ({ survey, mode, setMode }: Props) => {
  const navigate = useNavigate();

  if (!survey) return null;

  const renderTitle = () => (
    <Stack spacing={1} direction="row" alignItems="center" flex={1} justifyContent="center">
      <Typography>{strings.editSurveysScreen.editing}</Typography>
      <Typography>/</Typography>
      <Typography variant="h5" color={theme.palette.primary.main}>
        {survey.title}
      </Typography>
    </Stack>
  );

  /**
   * Toggles Survey screen mode
   */
  const toggleMode = () =>
    mode === SurveyScreenMode.EDITOR
      ? setMode(SurveyScreenMode.PUBLISH)
      : setMode(SurveyScreenMode.EDITOR);

  const renderControls = () => (
    <>
      <Button
        disabled={survey.status === SurveyStatus.Draft}
        color="primary"
        title={strings.generic.notImplemented}
        startIcon={<PublishOutlined />}
        sx={{
          backgroundColor: mode === SurveyScreenMode.PUBLISH ? "#c8c8c8" : ""
        }}
        onClick={toggleMode}
      >
        {strings.editSurveysScreen.publish}
      </Button>
      <Button
        disabled
        color="primary"
        title={strings.generic.notImplemented}
        startIcon={<BarChartOutlined />}
      >
        {strings.editSurveysScreen.statistics}
      </Button>
      <Button
        color="primary"
        title={strings.generic.notImplemented}
        startIcon={<PlayArrowOutlined />}
        onClick={() => navigate(`/preview/${survey.id}`)}
      >
        {strings.editSurveysScreen.preview}
      </Button>
    </>
  );

  const renderMenu = () => (
    <>
      <IconButton>
        <MoreHoriz />
      </IconButton>
    </>
  );

  return (
    <ToolbarContainer elevation={0}>
      <Box flex={1}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          {strings.generic.back}
        </Button>
      </Box>
      {renderTitle()}
      <ControlsContainer spacing={2} direction="row">
        {renderControls()}
        {renderMenu()}
      </ControlsContainer>
    </ToolbarContainer>
  );
};

export default Toolbar;
