import { useCallback, useRef } from "react";
import {
  InfiniteQueryObserverResult,
  FetchNextPageOptions,
} from "@tanstack/react-query";

type UseObserverParams = {
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<unknown, unknown>>;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
};

const useObserver = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseObserverParams) => {
  const intObserver = useRef<IntersectionObserver | null>(null);

  const observerRef = useCallback(
    (element: HTMLElement | null) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((div) => {
        if (div[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (element) intObserver.current.observe(element);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  return observerRef;
};

export default useObserver;
