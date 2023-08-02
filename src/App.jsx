import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

// alternativa para el useCallback: function fechData fuera de la app para que solo ejecute una vez

//console.log('Fuera del App')

/*const fechData = async (setUsers) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await res.json()

  setUsers(data)
  
}*/

const App = () => {
  const [counter, setCounter] = useState(0);

  //const [users, setUsers] = useState([])

  //const [users, setUsers] = useState(null)

  console.log("App");

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  /*useEffect( () => {
    console.log("useEffect")
    fechData(setUsers)
  }, [])
*/

  // PRIMER ESQUEMA DE USO DE USEEFFECT

  /* useEffect siempre se ejecuta al momento del primer renderizado de la pagina 
  useEffect toma una funcion de callBack y un array de dependiencias
  useEffect (callBack, array)
  el array puede contener estados, funciones ,...
  si alguno de los elementos del array cambia se ejecutará el useEffect
  si el array esta vacío (no hay elementos a controlar), entonces no se ejecutará el useEffect
  */

  //useEffect( () => {

  // console.log("useEffect") // es recomendable tener este log para evitar loops infinitos,
  // o que se este ejecutando en cada renderizado o mas de una vez
  //console.log("cambió el counter")
  // fetch vive en el navegador, es una api porque el navegador gestiona esa solicitud
  // el metodo fetch nos da facil acceso
  // localStorage tambien es una api del navegador
  // las ultimas versiones de node.js ya la incluyeron como parte de su libreria
  // axios es otra solucion para obtener http request para hacer solicitudes a otras paginas web
  // axios es manejado por el navegador, en cambio, node.js ejecuta javascript en nuestra maquina y no en el navegador
  // el useEffect debe devolver otra función o nada

  // .then es una promesa, se consume con .then, o con async await
  //fetch("https://jsonplaceholder.typicode.com/users")
  //.then( (res) => res.json()) // obtenemos respuesta y la formateamos en json
  //.then( (data) => { setUsers(data) }) // como el useEffect solo retorna datos, los guardamos en el useState Users
  //.then( data => console.log(data)) // nos devuelve un array de objetos [{obj1},{obj2}, ...]
  //console.log("el fetch se ejecuta después de todo el código")
  // es asincrono porque no sabemos cuanto tiempo demorara en consumir el json

  //}, []) // [] representa que el useEffect solo se ejecute una vez independientemente de que existan mas renderizaciones
  //},[counter]) esto implica que si cambia counter, la acción de callBack se ejecutará

  // useEffect usando async await, como no puede devolver una promesa, se coloca la alternativa:

  /*useEffect( () => {
  console.log("useEffect")
  async function fetchData(){
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await res.json

  setUsers(data)
  }
  fetchData()
}, [])
*/

  // Finalmente el useEffect se complementa con el useCallback

  // useCallback verifica que la función que ocupa no haya cambiado
  // si no ha cambiado solo se ejecuta una vez
  // queda guardada en memoria dicha funcion (en este caso fechData)
  // esto es creacion no ejecucion
  // aun cuando el App vuelva a crearse, el useCallback ya memorizó la función, ocupa caché
  // optimiza el consumo
  // hay otros hooks que memorizan datos y tambien componentes

  /*const fechData = useCallback ( async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data = await res.json

  setUsers(data)
  
}, [])

useEffect( () => {
  console.log("useEffect")
  fetchData()
}, [])
*/

  if (loading) return <p>Cargando...</p>; // antes users en vez de data
  // ahora loading por el hook personalizado useFetch

  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>UseEffect</h1>
      <button onClick={() => setCounter(counter + 1)}>
        Counter: {counter}
      </button>

      <ul>
        {data.map(
          (
            user // antes users en vez de data
          ) => (
            // useEffect se ejecuta primero, incluso antes del useState
            // por ello la constante useState(null) sigue estando en null cuando intenta pintar a los usuarios
            // una solucion es colocar el useState([]), osea inicializarlo con un array vacio
            // otra solucion es dejar el useState(null) y retornar un div por ejemplo
            // cuando se genera la aplicacion ( ver console.log('App')),
            // luego ingresa al useEffect (no espera a nadie, ni al fetch), luego llega al if, los users son vacios y se dispara el div ...cargando
            // el fetch se genera de forma asíncrona, cambia los users, se cambia el estado por setUsers
            // por ese cambio de estado se vuelve a renderizar TODA la pagina con sus componentes anidados
            // por lo que el if de users es falso y llega al return donde pinta los users
            // React hace una copia del DOM real y lo compara, por eso se ejecuta el div primero

            <li key={user.id}>{user.name}</li>
          )
        )}
      </ul>
    </>
  );
};

export default App;
