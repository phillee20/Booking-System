import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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
  );
}
