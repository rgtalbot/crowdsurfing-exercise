import {
  CalendarIcon,
  DevicePhoneMobileIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const FriendProfile = async ({ params }) => {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/friends/${id}`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Error fetching friends: ${res.status}`);
  }

  const friend = await res.json();
  let relatedFriends;

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/friends/related?friendId=${id}`
  )
    .then((response) => response.json())
    .then((data) => (relatedFriends = data))
    .catch((error) => console.error("Error fetching data:", error));

  if (!friend) {
    return <div>Friend not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="header block mb-6">
        <h1 className="text-2xl font-bold mr-4 inline-block align-middle">Friend Details</h1>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block align-middle"
        >
          Home
        </a>
      </div>
      <div className="max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{friend.name}</h2>
          <p className="text-gray-600">
            <InboxArrowDownIcon className="h-4 w-4 inline align-middle" />:
            {friend.email}
          </p>
          <p className="text-gray-600">
            <DevicePhoneMobileIcon className="h-4 w-4 inline align-middle" />:{" "}
            {friend.phone}
          </p>
          <p className="text-gray-600">
            <CalendarIcon className="h-4 w-4 inline align-middle" />:{" "}
            {friend.birthday}
          </p>
        </div>
        {relatedFriends ? (
          <div className="bg-gray-200 p-4">
            <h2 className="text-xl font-bold text-gray-800">Related Friends</h2>
            <ul>
              {relatedFriends.map((friend) => (
                <li
                  key={friend.id}
                  className="bg-gray-600 text-white p-4 my-4 rounded-lg cursor-pointer hover:bg-blue-800 transition duration-200 shadow-md"
                >
                  <Link href={`/friends/${friend.id}`}>{friend.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-gray-200 p-4">
            <h2 className="text-xl font-bold text-gray-800">
              No Related Friends
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendProfile;
