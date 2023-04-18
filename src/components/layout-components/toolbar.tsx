import styled from "@emotion/styled";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import theme from "../../styles/theme";
import strings from "../../localization/strings";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

/**
 * Styled filter container component
 */
const ToolbarContainer = styled(Paper, {
  label: "filter-container"
})(() => ({
  position: "relative",
  zIndex: 1100,
  borderTop: "1px solid #DADCDE",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0)
}));

/**
 * Component props
 */
interface Props {
  surveyName: string;
}

/**
 * Renders toolbar component
 */
const Toolbar = ({ surveyName }: Props) => {
  const navigate = useNavigate();

  return (
    <ToolbarContainer>
      <Stack direction="row" justifyContent="space-between">
        <Button
          startIcon={ <ArrowBackIcon /> }
          onClick={ () => navigate(-1) }
        >
          { strings.generic.back }
        </Button>
        <Typography>{ strings.editSurveysScreen.editing } { surveyName }</Typography>
        <Box>{ strings.generic.notImplemented }</Box>
      </Stack>
  </ToolbarContainer>
  )
};

export default Toolbar;