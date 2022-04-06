import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alerta } from "./Alerta";
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";

export const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(40, "El nombre es muy largo")
      .required("El Nombre del Cliente es Obligatorio"),
    empresa: Yup.string().required("El Nombre de la Empresa es Obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El Email es Obligatorio"),
    telefono: Yup.number()
      .integer("Numero no valido")
      .positive("Numero no valido")
      .typeError("El numero no es valido"),
    notas: "",
  });
  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        //Editando Registro

        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(respuesta);
        const resultado = await respuesta.json();
        console.log(resultado);
        navigate("/");
      } else {
        //Registro nuevo
        const url = import.meta.env.VITE_API_URL;
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json();

      navigate("/");
    } catch (error) {
      crossOriginIsolated.log(error);
    }
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-lg md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10 ">
              <div className="mb-4 ">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block p-3 w-full bg-gray-100"
                  placeholder="Nombre de Cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-4 ">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block p-3 w-full bg-gray-100"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4 ">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block p-3 w-full bg-gray-100"
                  placeholder="email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4 ">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono de Cliente:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block p-3 w-full bg-gray-100"
                  placeholder="Telefono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4 ">
                <label className="text-gray-800" htmlFor="notas">
                  Notas de Cliente:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block p-3 w-full bg-gray-100 h-40"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};
