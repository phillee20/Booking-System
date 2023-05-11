import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && //List of saved places mapped from here
        places.map((place) => (
          <Link key={place._id} to={"/place/" + place._id}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-over aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
            <div className="mt-2">
              <span className="font-bold">£{place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
