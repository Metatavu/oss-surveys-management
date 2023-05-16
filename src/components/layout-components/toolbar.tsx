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
  surveyName: string;
  surveyId: string;
}

/**
 * Renders toolbar component
 */
const Toolbar = ({ surveyName, surveyId }: Props) => {
  const navigate = useNavigate();

  const renderTitle = () => (
    <Stack spacing={1} direction="row" alignItems="center" flex={1} justifyContent="center">
      <Typography>{strings.editSurveysScreen.editing}</Typography>
      <Typography>/</Typography>
      <Typography variant="h5" color={theme.palette.primary.main}>
        {surveyName}
      </Typography>
    </Stack>
  );

  const renderControls = () => (
    <>
      <Button
        disabled
        color="primary"
        title={strings.generic.notImplemented}
        startIcon={<PublishOutlined />}
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
        onClick={() => navigate(`/preview/${surveyId}`)}
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
