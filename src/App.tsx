import { CssBaseline, responsiveFontSizes } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ErrorHandler from "./components/contexts/error-handler";
import BasicLayout from "./components/layouts/basic-layout";
import AuthenticationProvider from "./components/providers/authentication-provider";
import OverviewScreen from "./components/screens/overview-screen";
import ScreensScreen from "./components/screens/devices-screen";
import SurveysScreen from "./components/screens/surveys-screen";
import theme from "./styles/theme";
import EditSurveysScreen from "./components/screens/edit-surveys-screen";
import PreviewScreen from "./components/screens/preview-screen";
import { useAtomValue } from "jotai";
import { languageAtom } from "./atoms/language";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        element: <EditSurveysScreen />
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
  useAtomValue(languageAtom);

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
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthenticationProvider>
      </ErrorHandler>
    </div>
  );
};

export default App;
