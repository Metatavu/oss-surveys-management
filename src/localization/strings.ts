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
    yes: string;
    no: string;
    loadNew: string;
    upload: string;
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
      surveysNotFound: string;
      deviceSurveysNotFound: string;
      devicesNotFound: string;
    };
    editSurveysScreen: {
      surveyNotFound: string;
      surveyNotSaved: string;
      surveyNotPublished: string;
      surveyPagesNotFound: string;
      pageLayoutsNotFound: string;
      pageLayoutNotFound: string;
      pageNotSaved: string;
      pageNotDeleted: string;
      pageNotCreated: string;
      questionNotAdded: string;
      backgroundImagesNotFound: string;
      imageNotUploaded: string;
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
      dialog: {
        title: string;
        helperText: string;
        approve: string;
        name: string;
        namePlaceholder: string;
        description: string;
        descriptionPlaceholder: string;
        location: string;
        locationPlaceholder: string;
      };
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
    createButton: string;
    newSurvey: string;
    filters: {
      show: string;
      showAll: string;
      showDrafts: string;
      showReadyToPublish: string;
      showScheduled: string;
      showPublished: string;
      sortBy: string;
      sortByTitle: string;
      sortByStatus: string;
      sortByPublicationDate: string;
      sortByCreator: string;
      sortByModifiedAt: string;
      category: string;
      filter: string;
      findByName: string;
    };
    headings: {
      surveyTitle: string;
      status: string;
      publicationDate: string;
      category: string;
      creator: string;
      modifiedAt: string;
    };
    status: {
      draft: string;
      readyToPublish: string;
      scheduled: string;
      published: string;
    };
  };

  /**
   * Translations related to surveys screen
   */
  editSurveysScreen: {
    addQuestion: {
      dialog: {
        title: string;
        description: string;
        singleSelect: string;
        multiSelect: string;
        freeText: string;
        addQuestion: string;
      };
      helperText: string;
      questionAdded: string;
    };
    addNewPage: string;
    deletePage: string;
    surveySaved: string;
    editing: string;
    publish: string;
    editor: string;
    published: string;
    statistics: string;
    pdfDownload: string;
    pdfGenerate: string;
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
      questionTypes: {
        singleSelect: string;
        multiSelect: string;
        freeText: string;
      };
      question: string;
      answerOptions: string;
      answerOptionPlaceholder: string;
      deleteAnswerOptionTitle: string;
      addOption: string;
      confirmDeleteOption: string;
      infoText: string;
      buttonVisibility: string;
      background: string;
      addNewImage: string;
      image: string;
      images: {
        noImage: string;
        image1: string;
        image2: string;
      };
      backgroundImages: {
        green: string;
        white: string;
        image1: string;
        image2: string;
      };
      pageSaved: string;
      previewTitle: string;
    };
  };

  /**
   * Translations related to survey statistics
   */
  surveyStatistics: {
    surveyStatistics: string;
    chooseStatisticsSource: string;
    answerCount: string;
    mostAttainableTime: string;
    mostPopularAnswer: string;
    mostEfficientScreen: string;
    noStatistics: string;
    answersPerDisplay: string;
    answersDistribution: string;
    answers: string;
    mostPopularDays: string;
    mostPopularHours: string;
    statisticsSource: string;
    labels: {
      answerCount: string;
      percentageCount: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
  };

  /**
   * Translations related to PDF statistics download
   */
  pdfStatisticsDownload: {
    totalAnswerCount: string;
    answerDivision: string;
    answersPerDisplayChart: string;
    mostPopularDaysChart: string;
    mostPopularHoursChart: string;
  };

  /**
   * Translations related to publishing a survey
   */
  publishSurveys: {
    surveyPublished: string;
    leftPanel: {
      heading: string;
    };
    rightPanel: {
      heading: string;
      description: string;
      devicesCount: string;
      scheduling: string;
      publishStartTime: string;
      publishEndTime: string;
      publishButton: string;
      activateButtonTitle: string;
    };
    headings: {
      device: string;
      activeSurveys: string;
      description: string;
      status: string;
    };
    dialog: {
      title: string;
      description: string;
      button: string;
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
    image: string;
    imageParagraph: string;
    questionInfo: string;
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
