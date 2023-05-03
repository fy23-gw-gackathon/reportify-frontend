import { useEffect, useState } from "react";

type Props = {
  url: string;
  execOnLoad?: boolean;
};

export const useAPI = <T>({ url, execOnLoad = false }: Props) => {
  const [isLoading, setIsLoading] = useState(execOnLoad);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState<T | null>(null);
  const callAPI = () => {
    setIsLoading(true);
    setIsError(false);
  };
  useEffect(() => {
    if (isLoading)
      fetch(url)
        .then((result) => result.json())
        .then((result: T) => setResult(result))
        .catch(() => setIsError(true));
  }, [isLoading]);

  return { isLoading, isError, result, callAPI };
};
