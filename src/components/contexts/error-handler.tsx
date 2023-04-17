import { ReactNode, useMemo } from "react";
import { DialogContent, Divider, Typography } from "@mui/material";
import strings from "../../localization/strings";
import GenericDialog from "../generic/generic-dialog";
import * as Sentry from "@sentry/react";
import moment from "moment";
import { errorAtom } from "../../atoms/error";
import { useAtom } from "jotai";

/**
 * Componenet properties
 */
interface Props {
  children: ReactNode;
}

/**
 * Error handler component
 *
 * @param props component properties
 */
const ErrorHandler = ({ children }: Props) => {
  const [error, setError] = useAtom(errorAtom);
  /**
   * Handles error message and tries to print any given error to logs
   * Sends error message to sentry
   *
   * @param message error message
   * @param err any error
   */
  const handleError = async (message: string, err?: any) => {
    setError(message);

    Sentry.captureException(err);
    console.error(err);

    if (err instanceof Response) {
      try {
        const errorJson = await err.json();
        console.error(errorJson);
        setError(errorJson.message);
      } catch {
        setError(JSON.stringify(err));
      }
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(JSON.stringify(err));
    }
  };

  /**
   * Memoized context value
   */
  useMemo(
    () => ({
      setError: handleError
    }),
    [error]
  );

  /**
   * Returns current time
   *
   * @returns current time
   */
  const getTime = () => {
    return moment().format("DD.MM.YYYY HH:mm:ss");
  };

  /**
   * Returns current window URL
   *
   * @returns current window URL
   */
  const getURL = () => {
    return window.location.href;
  };

  /**
   * Component render
   */
  return (
    <>
      {children}
      <GenericDialog
        open={error !== undefined}
        error={false}
        onClose={() => setError(undefined)}
        onCancel={() => setError(undefined)}
        onConfirm={() => setError(undefined)}
        title={strings.errorHandling.title}
        closeButtonText={strings.generic.close}
      >
        <DialogContent id="error-dialog-description">
          {error && (
            <Typography marginBottom={3} sx={{ fontSize: 16, fontWeight: "bold" }}>
              {error}
            </Typography>
          )}
          <Typography marginBottom={2}>{strings.errorHandling.dialog.tryAgain}</Typography>
          <Typography marginBottom={2}>{strings.errorHandling.dialog.reportIssue}</Typography>
          <Typography fontWeight="bold">{strings.errorHandling.dialog.technicalDetails}</Typography>
          <Typography>
            {strings.formatString(strings.errorHandling.dialog.time, getTime())}
          </Typography>
          <Typography>
            {strings.formatString(strings.errorHandling.dialog.url, getURL())}
          </Typography>
          <Typography>{strings.errorHandling.dialog.errorMessage}</Typography>
          <code style={{ fontSize: "12px" }}>{error || ""}</code>
        </DialogContent>
        <Divider />
      </GenericDialog>
    </>
  );
};

export default ErrorHandler;
