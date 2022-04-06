import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formulario } from "../components/Formulario";

export const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClientesApi();
  }, []);
  return (
    <>
      {cliente?.nombre ? (
        <div>
          {" "}
          <h1 className="font-black text-4xl text-blue-900 p-10">
            {" "}
            Editar Cliente
          </h1>
          <p className="mt-3">
            Utiliza este formulario para Editar datos de un Cliente
          </p>
          <Formulario cliente={cliente} cargando={cargando} />
        </div>
      ) : (
        <>
          <h1 className="font-black text-4xl text-red-900 p-10">
            {" "}
            No existe el cliente
          </h1>
        </>
      )}
    </>
  );
};
