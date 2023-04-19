import { CssBaseline, responsiveFontSizes } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ErrorHandler from "./components/contexts/error-handler";
import BasicLayout from "./components/layouts/basic-layout";
import AuthenticationProvider from "./components/providers/authentication-provider";
import OverviewScreen from "./components/screens/overview-screen";
import ScreensScreen from "./components/screens/screens-screen";
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
        path: "/screens",
        element: <ScreensScreen />
      },
      {
        path: "/",
        element: <Navigate to="/overview" />
      }
    ]
  }
]);

/**
 * Application componenet
 */
const App = () => (
  <div className="App">
    <ErrorHandler>
      <AuthenticationProvider>
        <ThemeProvider theme={ responsiveFontSizes(theme) }>
          <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
      </AuthenticationProvider>
    </ErrorHandler>
  </div>
);

export default App;
