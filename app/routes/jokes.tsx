import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData
} from "remix";
import stylesUrl from "../styles/jokes.css";
import { db } from "../utils/db.server";

type LoaderData = { jokes: { id: string; name: string }[] };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokes: await db.joke.findMany({
      take: 5,
      select: { id: true, name: true },
      orderBy: { createdAt: "desc" },
    }),
  };

  return data;
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const JokesRoute = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>J🤪KES</h1>
      <div>
        <ul>
          {data.jokes.map((joke) => {
            return (
              <li key={joke.id}>
                <Link to={joke.id}>{joke.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Link to="new" className="button">
        Add your own
      </Link>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default JokesRoute;
