import { useCallback, useEffect, useState } from "react";

// custom hook requiere exportacion nombrada
// objetivo: reutilizar estados, useEffect, useCallback...

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("useFetch");

  const fechData = useCallback(async () => {
    // el useCallback impide la creacion del fetch mas de una vez
    setLoading(true);
    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Error al consumir la api");
      // throw new hace que salte a la seccion catch

      const data = await res.json();
      setData(data);
      setError(null);
    } catch (error) {
      //console.log(error.message);
      setError(error.message);
      setData([]); // mandamos array vacio para que la aplicacion no se caiga
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect");
    fechData();
  }, []);

  return { data, loading, error };
  //return { data: data }; // devuelve un objeto de la forma {nombre propiedad: valor}
  // como el nombre de la propiedad y el nombre coinciden, se puede colocar data
};
