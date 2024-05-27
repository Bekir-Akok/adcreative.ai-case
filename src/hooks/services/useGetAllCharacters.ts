/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";

//local imports
import { getAllCharacter } from "../../services/character";
import { Character } from "../../types/interfaces";

const useGetAllCharacters = (name: string) => {
  const callback = async ({ pageParam = 2 }) => {
    const topArtist = await getAllCharacter({
      pages: pageParam,
      name: name as string,
    });

    return topArtist?.data;
  };

  const queryKey = ["getAllCharacters", name];

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: callback,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage?.info?.pages) {
        return pages.length + 1;
      } else return undefined;
    },
  });

  const mergedCharacterData: Character[] =
    data?.pages?.flatMap((page) => page.results) ?? [];

  return {
    data: mergedCharacterData,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useGetAllCharacters;
