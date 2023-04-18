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
  }
};
/**
 * Initialized localized strings
 */
const strings: Localized = new LocalizedStrings({ en: en, fi: fi });

export default strings;
