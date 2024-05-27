/* eslint-disable @typescript-eslint/no-unused-vars */
//local imports
import useGetAllCharacters from "./hooks/services/useGetAllCharacters";
import useObserver from "./hooks/use-observer";
import useQuery from "./hooks/use-query";
import CustomMultiSelect from "./components/custom-multi-select";
import useDebounce from "./hooks/use-debounce";

const initialState = {
  name: "",
};

function App() {
  const { queries, handleFilterChange } = useQuery(initialState);
  const [debouncedValue] = useDebounce(queries.name);

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllCharacters(debouncedValue as string);

  const observerRef = useObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="w-full max-h-screen min-h-screen flex justify-center">
      <div className="w-11/12 md:w-5/12 mt-20">
        <CustomMultiSelect
          data={data}
          observerRef={observerRef}
          value={queries.name as string}
          handleChange={handleFilterChange}
          error={isError}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
