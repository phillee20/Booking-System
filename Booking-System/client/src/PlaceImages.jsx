import Image from "./Image";

export default function PlaceImages({ place, index = 0, className = null }) {
  //if place photos length is falsey then return empty string
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }
  return <Image className={className} src={place.photos[index]} alt="" />;
}
