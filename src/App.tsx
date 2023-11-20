import { CssBaseline, responsiveFontSizes } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useAtomValue } from "jotai";
import { Settings } from "luxon";
import { useMemo } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { languageAtom } from "./atoms/language";
import ErrorHandler from "./components/contexts/error-handler";
import BasicLayout from "./components/layouts/basic-layout";
import AuthenticationProvider from "./components/providers/authentication-provider";
import ScreensScreen from "./components/screens/devices-screen";
import EditorScreen from "./components/screens/editor-screen";
import OverviewScreen from "./components/screens/overview-screen";
import PreviewScreen from "./components/screens/preview-screen";
import SurveysScreen from "./components/screens/surveys-screen";
import theme from "./styles/theme";

const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/overview",
        element: <OverviewScreen />
      },
      {
        path: "/surveys",
        element: <SurveysScreen />
      },
      {
        path: "/surveys/edit/:id",
        element: <EditorScreen />
      },
      {
        path: "/screens",
        element: <ScreensScreen />
      },
      {
        path: "/",
        element: <Navigate to="/overview" />
      },
      {
        path: "/preview/:id",
        element: <PreviewScreen />
      }
    ]
  }
]);

/**
 * Application componenet
 */
const App = () => {
  const currentLocale = useAtomValue(languageAtom);

  useMemo(() => {
    Settings.defaultLocale = currentLocale;
    Settings.defaultZone = "Europe/Helsinki";
  }, [currentLocale]);

  return (
    <div className="App">
      <ErrorHandler>
        <AuthenticationProvider>
          <ThemeProvider theme={responsiveFontSizes(theme)}>
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              transition={Flip}
              hideProgressBar
            />
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <CssBaseline />
              <RouterProvider router={router} />
            </LocalizationProvider>
          </ThemeProvider>
        </AuthenticationProvider>
      </ErrorHandler>
    </div>
  );
};

export default App;
