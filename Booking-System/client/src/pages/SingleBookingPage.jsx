import { useParams } from "react-router";

export default function SingleBookingPage() {
  const { id } = useParams();
  return <div>single booking: {id}</div>;
}



