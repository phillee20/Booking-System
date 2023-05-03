import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";

//The URL below should match Network>Headers>SetCookie if setting cookie(Removes the exclamation mark)
axios.defaults.baseURL = "http://localhost:4000"; //Acts as base for all axios requests
axios.defaults.withCredentials = true; //Must be enabled for cookie to work!

function App() {
  return (
    //Wrapped around all routes so all can access the context
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}
export default App;
