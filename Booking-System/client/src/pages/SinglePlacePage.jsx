import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import BookingWidgets from "../BookingWidgets";

export default function SinglePlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  //axios GET request for single place
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      //console.log(response.data);
      setPlace(response.data);
    });
  }, [id]); //Everytime the ID changes, it runs this useEffect function again

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute insert-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-18">Photos of{place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-17 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                ></img>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className=" flex gap-1 my-3 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => {
                    setShowAllPhotos(true);
                  }}
                  className="aspect-square object-cover cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt="No Image Available"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="aspect-square object-cover cursor-pointer"
                src={"http://localhost:4000/uploads/" + place.photos?.[1]}
                alt="No Image Available"
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => {
                    setShowAllPhotos(true);
                  }}
                  className="aspect-square object-cover relative top-2 cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                  alt="No Image Available"
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="mt-8 mb-6 grid gap-8 grid cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <b>Check In: </b>
          {place.checkIn} <br />
          <b>Check Out: </b>
          {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <BookingWidgets place={place} />
        <div></div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="mt-4 font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
