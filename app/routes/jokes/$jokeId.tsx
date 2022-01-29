import { Joke } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "../../utils/db.server";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });

  if (!joke) {
    throw new Error("no joke found with this ID");
  }

  const data: LoaderData = { joke };

  return data;
};
const JokeRoute = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
    </div>
  );
};

export default JokeRoute;
