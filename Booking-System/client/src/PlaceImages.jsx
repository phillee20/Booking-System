export default function PlaceImages({ place, index = 0, className = null }) {
  //if place photos length is falsey then return empty string
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      alt=""
    />
  );
}
