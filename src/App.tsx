import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ErrorHandler from "./components/contexts/error-handler";
import BasicLayout from "./components/layouts/basic-layout";
import AuthenticationProvider from "./components/providers/authentication-provider";
import SurveysScreen from "./components/screens/surveys-screen";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/surveys",
        element: <SurveysScreen />
      },
      {
        path: "/",
        element: <Navigate to="/surveys" />
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
        <BasicLayout>
        <RouterProvider router={router} />
      </BasicLayout>
      </AuthenticationProvider>
    </ErrorHandler>
  </div>
);

export default App;
