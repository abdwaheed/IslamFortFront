import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Reciept from "./pages/reciept";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import SettingType from "./pages/settingType";
import RecieptList from "./pages/recieptList";

function App() {

  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"token"}
      // cookieDomain= {window.location.hostname}
      // cookieSecure= {false}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />}></Route>
          <Route exact path="/login" element={ <Login />}></Route>
          <Route
            exact
            path="/reciept"
            element={
              <RequireAuth loginPath="/login">
                <Reciept />
              </RequireAuth>
            }
          > </Route>
           <Route
            exact
            path="/recieptList"
            element={
              <RequireAuth loginPath="/login">
                <RecieptList />
              </RequireAuth>
            }
          > </Route>
          <Route
            exact
            path="/settingType"
            element={
              <RequireAuth loginPath="/login">
                <SettingType />
              </RequireAuth>
            }
          > </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
