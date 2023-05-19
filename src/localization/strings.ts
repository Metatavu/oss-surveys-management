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
    confirm: string;
    cancel: string;
    unnamed: string;
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
   * Translations related to localization
   */
  localization: {
    en: string;
    fi: string;
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
      deviceSurveysNotFound: string;
      devicesNotFound: string;
      deviceRequestsNotFound: string;
      deviceRequestUpdateError: string;
    };
    surveysScreen: {
      createSurveyError: string;
    };
    editSurveysScreen: {
      surveyNotFound: string;
      surveyNotSaved: string;
      surveyPagesNotFound: string;
      pageLayoutsNotFound: string;
      pageLayoutNotFound: string;
      pageNotSaved: string;
      pageNotDeleted: string;
      pageNotCreated: string;
    };
    previewScreen: {
      surveyNotFound: string;
      surveyPagesNotFound: string;
      pageLayoutsNotFound: string;
      previewNotFound: string;
    };
  };

  /**
   * Translations related to overview screen
   */
  overviewScreen: {
    activeSurveysTab: string;
    idleDevicesTab: string;
    offlineDevicesTab: string;
    newDevicesTab: string;
    activeSurveys: {
      surveyTitle: string;
      screens: string;
      publicationDate: string;
      endTime: string;
      mostPopular: string;
      answers: string;
    };
    devices: {
      idleActionButton: string;
      oflineActionButton: string;
      headings: {
        deviceName: string;
        status: string;
        description: string;
        location: string;
        action: string;
      };
    };
    deviceRequests: {
      actionButton: string;
      pendingStatus: string;
      approvedStatus: string;
      headings: {
        serialNumber: string;
        status: string;
        description: string;
        createdAt: string;
        action: string;
      };
    };
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
    deletePage: string;
    surveySaved: string;
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
    };
    pages: {
      noQuestion: string;
    };
    editPagesPanel: {
      page: string;
      title: string;
      questionType: string;
      answerOptions: string;
      answerOptionPlaceholder: string;
      deleteAnswerOptionTitle: string;
      addOption: string;
      confirmDeleteOption: string;
      infoText: string;
      buttonVisibility: string;
      background: string;
      backgroundImages: {
        default: string;
        image1: string;
        image2: string;
        image3: string;
        image4: string;
        image5: string;
      };
      pageSaved: string;
    };
  };

  /**
   * Translations related to page layouts
   */
  layouts: {
    addNewPage: string;
    title: string;
    question: string;
    info: string;
    infoImage: string;
    paragraphImage: string;
    imageParagraph: string;
    questionInfo: string;
    statistics: string;
  };

  /**
   * Translations related to devices
   */
  devices: {
    status: {
      online: string;
      offline: string;
    };
  };

  /**
   * Translations related to preview screen
   */
  previewScreen: {
    sharePreview: string;
  };
}
/**
 * Initialized localized strings
 */
const strings: Localized = new LocalizedStrings({ en: en, fi: fi });

export default strings;
