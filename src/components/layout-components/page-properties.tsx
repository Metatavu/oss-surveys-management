import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import strings from "../../localization/strings";
import { Edit } from "@mui/icons-material";
import { QuestionType } from "../../types";
import AddCircleIcon from "@mui/icons-material/AddCircle";

/**
 * Renders page properties component
 */
const PageProperties = () => {
  return (
    <>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>
          {strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `(${1})`)}
        </Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          multiline
          placeholder={
            strings.formatString(strings.editSurveysScreen.editPagesPanel.page, `(${1})`) as string
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Edit fontSize="small" color="primary" />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{strings.editSurveysScreen.editPagesPanel.title}</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          multiline
          placeholder={strings.editSurveysScreen.editPagesPanel.title}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Edit fontSize="small" color="primary" />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box p={2} sx={{ borderBottom: "1px solid #DADCDE" }}>
        <Typography>{ strings.editSurveysScreen.editPagesPanel.question }</Typography>
        {/* TODO: Update with Debounce when backend ready */}
        <TextField
          fullWidth
          label={ strings.editSurveysScreen.editPagesPanel.question }
          size="small"
          select
          defaultValue={ QuestionType.SINGLE }
        >
          <MenuItem
            key={ QuestionType.SINGLE}
            value={ QuestionType.SINGLE }
          >
            { QuestionType.SINGLE }
          </MenuItem>
          <MenuItem key={ QuestionType.MULTIPLE } value={ QuestionType.MULTIPLE }>
            { QuestionType.MULTIPLE }
          </MenuItem>
        </TextField>
      </Box>
      <Box>
        <Button
          size="large"
          variant="contained"
          startIcon={ <AddCircleIcon /> }
          onClick={ () => console.log("TODO") }
        >
          { strings.editSurveysScreen.editPagesPanel.addOption }
        </Button>
      </Box>
    </>
  );
};

export default PageProperties;