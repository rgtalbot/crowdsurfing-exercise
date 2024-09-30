import friends from "../../../mockData/mockData";

export const GET = async (req, { params }) => {
  const { id } = params;
  const friend = friends.find((friend) => friend.id === parseInt(id, 10));

  if (friend) {
    return new Response(JSON.stringify(friend), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Friend not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
};
