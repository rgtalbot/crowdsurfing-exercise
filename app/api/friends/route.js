import friends from "../../mockData/mockData";

export const GET = async () => {
  return new Response(JSON.stringify(friends), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
