import { useState, useEffect } from 'react';

const useFetch = (dataSource, delay = 500) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setData(dataSource);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataSource, delay]);

  return { data, loading, error };
};

export default useFetch;
