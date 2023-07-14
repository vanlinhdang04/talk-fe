import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useFetch = (endpoint, options = {}, callback = () => {}) => {
  const baseUrl = import.meta.env.VITE_URL_API;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [countRefetch, setCountRefetch] = useState(1);

  useEffect(() => {
    if (!endpoint || !baseUrl || !options) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }
    console.log(endpoint, countRefetch);
    setLoading(true);
    const url = baseUrl + endpoint;
    let isMounted = true;

    const fetchData = async () => {
      try {
        const responese = await axios(url, {
          ...options,
          headers: {
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (isMounted) {
          setData(responese.data);
          setLoading(false);
        }

        callback(responese);
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [baseUrl, endpoint, countRefetch]);

  const refetch = () => {
    setCountRefetch((prev) => prev + 1);
  };

  return { loading, data, error, refetch };
};

export default useFetch;
