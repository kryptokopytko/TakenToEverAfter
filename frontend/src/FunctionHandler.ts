import { useUser } from "./providers/UserContext";
import * as DBApi from "./DBApi";
import useExampleFunctions from "./exampleApi";

const useFunctionsProxy = () => {
  const { isLogged } = useUser();
  const exampleFunctions = useExampleFunctions();

  return new Proxy(
    {},
    {
      get(_, prop) {
        return isLogged
          ? DBApi[prop as keyof typeof DBApi]
          : exampleFunctions[prop as keyof typeof exampleFunctions];
      },
    }
  ) as typeof DBApi & ReturnType<typeof useExampleFunctions>; 
};

export default useFunctionsProxy;
