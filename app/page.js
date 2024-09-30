import Link from "next/link";

const Home = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/friends`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error response:', errorText);
    throw new Error(`Error fetching friends: ${res.status}`);
  }

  const friends = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} className="bg-blue-600 text-white p-4 my-4 rounded-lg cursor-pointer hover:bg-blue-800 transition duration-200 shadow-md">
            <Link href={`/friends/${friend.id}`}>{friend.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
