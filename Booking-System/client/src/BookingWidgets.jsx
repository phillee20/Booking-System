import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookPlace() {
    try {
      const response = await axios.post("/bookings", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });

      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      alert("Please log in to book");
    }
  }

  //Get the total number of days end user wants
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: £{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(event) => setNumberOfGuests(event.target.value)}
          />
        </div>
        <div className="py-3 px-4 border-t">
          <label>Full name: </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label>Phone Number: </label>
          <input
            type="tel" //css styled in index.css to match other input boxes
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>

      <button onClick={bookPlace} className="primary mt-4">
        Book this place
      </button>
      {numberOfNights > 0 && (
        <span>Total = £{numberOfNights * place.price}</span>
      )}
    </div>
  );
}
