import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import strings from '../../localization/strings';
import theme from '../../styles/theme';

/**
 * Component props
 */
interface Props {
  surveyName: string;
}

/**
 * Renders preview toolbar
 */
const PreviewToolbar = ({ surveyName }: Props) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row">
      <Box flex={1}>
        <Button
          startIcon={ <ArrowBackIcon /> }
          onClick={ () => navigate(-1) }
        >
          { strings.generic.back }
        </Button>
      </Box>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        flex={1}
        justifyContent="center"
      >
        <Typography>{ strings.editSurveysScreen.editing }</Typography>
        <Typography>/</Typography>
        <Typography variant="h6" color={ theme.palette.primary.main }>{ surveyName }</Typography>
      </Stack>
      <Box flex={1}>
        <Button
          endIcon={ <ShareIcon /> }
        >
          { strings.previewScreen.sharePreview }
        </Button>
      </Box>
    </Stack>
  )
};

export default PreviewToolbar;