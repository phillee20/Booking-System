import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState("");

  function inputHeader(text) {
    return <h2 className="text-lg mt4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  async function addNewPlace(event) {
    event.preventDefault();
    try {
      await axios.post("/places", {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place")}
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
        />

        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Address"
        />

        {preInput("Photos", "More photos")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        {preInput("Perks", " Select all the perks for your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Information", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(event) => setExtraInfo(event.target.value)}
        />
        {preInput(
          "Check In and Check Out Times",
          "Remember to leave time for cleaning between guests"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="mt-2 -mb-2">
            <h3>Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
              placeholder="14:00"
            />
          </div>
          <div className="mt-2 -mb-2">
            <h3>Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
              placeholder="11:00"
            />
          </div>
          <div className="mt-2 -mb-2">
            <h3>Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(event) => setMaxGuests(event.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}
