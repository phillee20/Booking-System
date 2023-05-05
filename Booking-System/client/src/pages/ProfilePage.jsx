import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null); //Takes us back to indexPage once user clicks Logout
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams(); //Takes me to each subpage as required, set on App.jsx
  //console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null); //This resets the user thats logged in so it becomes empty
  }

  if (!ready) {
    return "Loading...";
  }
  //No redirects and no user logged in and ready then go login page
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && ( //TAKE THIS AWAY?!
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">
            Log Out
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
