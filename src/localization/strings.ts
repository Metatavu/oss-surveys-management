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
}
/**
 * Initialized localized strings
 */
const strings: Localized = new LocalizedStrings({ en: en, fi: fi });

export default strings;
