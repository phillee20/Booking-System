import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-4">
      {places.length > 0 && //List of saved places mapped from here
        places.map((place) => (
          <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
            {place.photos?.[0] && (
              <img
                src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                alt=""
              />
            )}
            {place.title}
          </div>
        ))}
    </div>
  );
}
