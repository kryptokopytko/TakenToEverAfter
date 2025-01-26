import { useUser } from "../providers/UserContext";
import * as DBApi from "./DbApi/DBApi";

const useFunctionsProxy = () => {
  const { isLogged } = useUser();

  return new Proxy(
    {},
    {
      get(_, prop) {
        if (isLogged) {
          return DBApi[prop as keyof typeof DBApi];
        } else {
          return () => {};
        }
      },
    }
  ) as typeof DBApi;
};

export default useFunctionsProxy;
