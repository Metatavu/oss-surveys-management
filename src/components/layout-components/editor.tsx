import { Stack, Typography, styled } from "@mui/material";
import theme from "../../styles/theme";
import NewPageButton from "./new-page-button";
import GenericDialog from "../generic/generic-dialog";
import { useState } from "react";
import ImageButton from "./image-button";
import QuestionnaireLayoutImage from "../images/svg/layout-thumbnails/questionnaire";
import InfoLayoutImage from "../images/svg/layout-thumbnails/info";
import InfoImageLayoutImage from "../images/svg/layout-thumbnails/info-image";
import strings from "../../localization/strings";
import QuestionnaireParagraphLayoutImage from "../images/svg/layout-thumbnails/questionnaire-paragraph";
import ImageParagraphLayoutImage from "../images/svg/layout-thumbnails/image-paragraph";
import ParagraphImageLayoutImage from "../images/svg/layout-thumbnails/paragraph-image";
import StatisticsLayoutImage from "../images/svg/layout-thumbnails/statistics";

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
  const [ showAddPage, setShowAddPage ] = useState(false);

  const renderAddNewPageDialog = () => (
    <GenericDialog
      maxWidth="lg"
      open={ showAddPage }
      onCancel={ () => setShowAddPage(false) }
      onClose={ () => setShowAddPage(false) }
      cancelButtonText="Peruuta"
      title="Lisää uusi sivu"
    >
      <Typography>{ strings.layouts.title }</Typography>
      <Stack direction="row" gap={2} pt={3}>
        <ImageButton
          title={ strings.layouts.question }
          image={ <QuestionnaireLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.info }
          image={ <InfoLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.infoImage }
          image={ <InfoImageLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.questionInfo }
          image={ <QuestionnaireParagraphLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.imageParagraph }
          image={ <ImageParagraphLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          title={ strings.layouts.paragraphImage }
          image={ <ParagraphImageLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
        <ImageButton
          disabled
          title={ strings.layouts.statistics }
          image={ <StatisticsLayoutImage/> }
          onClick={ () => {} }
          selected={ false }
        />
      </Stack>
    </GenericDialog>
  );

  return (
    <EditorContainer direction="row" gap={4}>
      <NewPageButton onClick={ () => setShowAddPage(true) }/>
      { renderAddNewPageDialog() }
    </EditorContainer>
  )
};

export default Editor;