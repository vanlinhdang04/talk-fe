import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useErrorToast from "./useErrorToast";

const useSearchUsers = (keyword) => {
  const [endpoint, setEndpoint] = useState();
  const { data, error, loading, refetch } = useFetch(endpoint);
  const err = useErrorToast(error, "Error Search Users!");

  useEffect(() => {
    if (keyword) {
      setEndpoint(`/api/user?search=${keyword}`);
    }

    return () => setEndpoint();
  }, [keyword]);
  return { data, error, loading, refetch };
};

export default useSearchUsers;
