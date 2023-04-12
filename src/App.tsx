import { CssBaseline, responsiveFontSizes } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ErrorHandler from "./components/contexts/error-handler";
import BasicLayout from "./components/layouts/basic-layout";
import AuthenticationProvider from "./components/providers/authentication-provider";
import SurveysScreen from "./components/screens/surveys-screen";
import theme from "./styles/theme";

const router = createBrowserRouter([
  {
    path: "/surveys",
    element: <SurveysScreen />
  },
  {
    path: "/",
    element: <Navigate to="/surveys" />
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
          <BasicLayout>
            <RouterProvider router={router} />
          </BasicLayout>
        </ThemeProvider>
      </AuthenticationProvider>
    </ErrorHandler>
  </div>
);

export default App;
