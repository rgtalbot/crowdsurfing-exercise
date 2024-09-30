import friends from "../../../mockData/mockData";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const friendId = searchParams.get('friendId');

  const relatedFriends = friends.filter((f) => f.friends.includes(parseInt(friendId)));

  console.log('relatedFriends', relatedFriends);

  if (!relatedFriends) {
    return new Response(JSON.stringify({ error: "Friend not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(relatedFriends), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
