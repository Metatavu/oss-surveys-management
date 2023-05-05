import en from "./en.json";
import fi from "./fi.json";
import LocalizedStrings, { LocalizedStringsMethods } from "localized-strings";

/**
 * Localized strings
 */
export interface Localized extends LocalizedStringsMethods {
  /**
   * Translations related to generic words
   */
  generic: {
    close: string;
    logout: string;
    notImplemented: string;
    back: string;
  };

  /**
   * Translations related to navigation
   */
  navigation: {
    overview: string;
    surveys: string;
    screens: string;
    logo: string;
  };

  /**
   * Translations related to error handling
   */
  errorHandling: {
    title: string;
    dialog: {
      tryAgain: string;
      reportIssue: string;
      technicalDetails: string;
      time: string;
      url: string;
      errorMessage: string;
    };
    overviewScreen: {
      surveysNotFound: string;
    };
    surveysScreen: {
      createSurveyError: string;
    };
    editSurveysScreen: {
      surveyNotFound: string;
      surveyNotSaved: string;
    };
  };

  /**
   * Translations related to overview screen
   */
  overviewScreen: {
    surveyTitle: string;
    screens: string;
    publicationDate: string;
    endTime: string;
    mostPopular: string;
    answers: string;
    activeSurveys: string;
  };

  /**
   * Translations related to surveys screen
   */
  surveysScreen: {
    show: string;
    sortBy: string;
    category: string;
    filter: string;
    createButton: string;
    newSurvey: string;
    findByName: string;
  };

  /**
   * Translations related to surveys screen
   */
  editSurveysScreen: {
    addNewPage: string;
    editing: string;
    publish: string;
    published: string;
    statistics: string;
    preview: string;
    editSurveyPanel: {
      name: string;
      description: string;
      category: string;
      returnTimeout: string;
      readyForPublish: string;
    }
  };

  /**
   * Translations related to page layouts
   */
  layouts: {
    title: string;
    question: string;
    info: string;
    infoImage: string;
    paragraphImage: string;
    imageParagraph: string;
    questionInfo: string;
    statistics: string;
  }

  /**
   * Translations related to preview screen
   */
  previewScreen: {
    sharePreview: string;
  }
}
/**
 * Initialized localized strings
 */
const strings: Localized = new LocalizedStrings({ en: en, fi: fi });

export default strings;
