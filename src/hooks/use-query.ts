import { useState } from "react";

//local imports
import { Config } from "../types/types";
import { ChangeEvent } from "../types/interfaces";

const useQuery = (config: Config) => {
  const [queries, setQueries] = useState<Config>(() => config);

  const handleFilterChange = (evt: ChangeEvent) => {
    const { value, name } = evt || {};
    setQueries((prevState) => ({
      ...prevState,
      [name]: value,
      skip: 0,
    }));
  };

  return { queries, handleFilterChange };
};

export default useQuery;
