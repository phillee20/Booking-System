import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            <h2 className="text-lg mt4">Title</h2>
            <input type="text" placeholder="Title" />
            <h2 className="text-lg mt4">Address</h2>
            <input type="text" placeholder="Address" />
            <h2 className="text-lg mt4">Photos</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={"Add using the link JPEG files"}
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
                Upload
              </button>
            </div>

            <h2 className="text-lg mt4">Description</h2>
            <textarea />

            <h2 className="text-lg mt4">Perks</h2>
            <div>
              <label>
                <input type="checkbox" />
                <span>WiFi</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>Free Parking</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>TV</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>Pets</span>
              </label>

              <label>
                <input type="checkbox" />
                <span>Private entrance</span>
              </label>
            </div>

            <input type="text" placeholder="Exra Information" />
          </form>
        </div>
      )}
    </div>
  );
}
