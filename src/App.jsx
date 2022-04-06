import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Layout } from "./layout/Layout";
import { Inicio } from "./paginas/Inicio";
import { NuevoCliente } from "./paginas/NuevoCliente";
import { EditarCliente } from "./paginas/EditarCliente";
import { VerCliente } from "./paginas/VerCliente";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/clientes" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="nuevo" element={<NuevoCliente />} />
            <Route path="editar/:id" element={<EditarCliente />} />
            <Route path=":id" element={<VerCliente />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
