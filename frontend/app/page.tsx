"use client";
import React, { useState } from "react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardPlus, Users } from "lucide-react";

interface Usuario {
  nombre: string;
  edad?: number | string;
  email: string;
  rol: string;
  tipoUsuario: "admin" | "comun";
  comentarios: string[];
  amigos: number[];
  id: number;
}
const usuariosIniciales: Usuario[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    edad: 30,
    email: "juan.perez@example.com",
    rol: "Desarrollador",
    tipoUsuario: "admin",
    comentarios: ["Excelente trabajador", "Siempre cumple con los plazos"],
    amigos: [2, 3], // IDs de sus amigos
  },
  {
    id: 2,
    nombre: "María Gómez",
    edad: 28,
    email: "maria.gomez@example.com",
    rol: "Diseñadora",
    tipoUsuario: "comun",
    comentarios: ["Gran creatividad", "Aporta buenas ideas"],
    amigos: [1, 4],
  },
  {
    id: 3,
    nombre: "Carlos López",
    edad: 35,
    email: "carlos.lopez@example.com",
    rol: "Gerente",
    tipoUsuario: "admin",
    comentarios: ["Buena gestión de equipo"],
    amigos: [1],
  },
  {
    id: 4,
    nombre: "Ana Torres",
    edad: 26,
    email: "ana.torres@example.com",
    rol: "Marketing",
    tipoUsuario: "comun",
    comentarios: ["Siempre tiene estrategias interesantes"],
    amigos: [2],
  },
];

export default function Home() {
  const [amigoAgregado, setAmigoAgregado] = useState<string>("");
  const [amigoSeleccionado, setAmigoSeleccionado] = useState<string>();
  const [openDialog2, setOpenDialog2] = useState<boolean>(false);

  const [usuarioMostrar, setUsuarioMostrar] = useState<number | string>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState<
    number | undefined
  >();
  const [coment, setComent] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales);
  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>({
    nombre: "",
    edad: "",
    email: "",
    rol: "",
    tipoUsuario: "comun",
    comentarios: [],
    amigos: [],
    id: usuarios.length + 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevoId =
      usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

    const usuarioAAgregar = { ...nuevoUsuario, id: nuevoId };
    // const usuariosAgregados:Usuario[] = [...usuarios]
    // usuariosAgregados.push (usuarioAAgregar)
    // usuariosAgregados[2].nombre="juan"

    setUsuarios([...usuarios, usuarioAAgregar]);
    toast("Se agrego un  nuevo Usuario");
    setNuevoUsuario({
      nombre: "",
      edad: 0,
      email: "",
      rol: "",
      tipoUsuario: "comun",
      comentarios: [],
      amigos: [],
      id: nuevoId + 1,
    });
  };
  const guardarComentario = () => {
    console.log(coment);
    console.log(usuarios);
    console.log(idUsuarioSeleccionado);
    let usuariosModificados = usuarios.map(
      (usuario: Usuario, index: number) => {
        if (usuario.id === idUsuarioSeleccionado) {
          return { ...usuario, comentarios: [...usuario.comentarios, coment] };
        } else {
          return usuario;
        }
      }
    );
    setComent("");
    setOpenDialog(false);
    setIdUsuarioSeleccionado(undefined);
    setUsuarios(usuariosModificados);

    console.log(usuariosModificados);
  };
  //supongamos que lo que se guardo en comentario va a ser el Index, osea la posicion... accedemos por posicion y guardamos por posicion
  // const guardarComentario2 = () => {
  //   let nuevaListaDeUsuarios = [...usuarios];
  //   let comentariosViejos =
  //     nuevaListaDeUsuarios[idUsuarioSeleccionado].comentarios;
  //   nuevaListaDeUsuarios[idUsuarioSeleccionado].comentarios = [
  //     ...comentariosViejos,
  //     coment,
  //   ];
  //   setUsuarios(nuevaListaDeUsuarios)
  // };
  const buscarComentarios = (id: any) => {
    let idFormateado = Number.parseInt(id);
    let usuarioEncontrado = usuarios.find(
      (usuario) => idFormateado === usuario.id
    );
    console.log(usuarioEncontrado);
    if (usuarioEncontrado) {
      return usuarioEncontrado.comentarios;
    } else {
      return null;
    }
  };
  const seleccionDeAmigos = () => {
    let listaFiltrada = usuarios.filter(
      (usuario) => usuario.id != idUsuarioSeleccionado
    );
    return listaFiltrada;
  };
  const añadirAmigos = () => {
    let idFormateado = Number.parseInt(amigoAgregado);
    let nuevoAmigo = usuarios.map((usuario, index) => {
      if (usuario.id === idUsuarioSeleccionado) {
        return { ...usuario, amigos: [...usuario.amigos, idFormateado] };
      } else {
        return usuario;
      }
    });
    let buscarAmigo = usuarios.find((usuario) => usuario.id === idFormateado);

    toast(`Usted a Agregado a ${buscarAmigo?.nombre} como amigo`);
    setUsuarios(nuevoAmigo);
    setOpenDialog2(false);
    setAmigoAgregado("");
  };
  const buscarAmigos = (id: any) => {
    let idFormateado = Number.parseInt(id);
    let usuarioEncontrado = usuarios.find(
      (usuario) => idFormateado === usuario.id
    );
    console.log(usuarioEncontrado);
    if (usuarioEncontrado) {
      return usuarioEncontrado.amigos;
    } else {
      return null;
    }
  };
  buscarAmigos("2");
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Sistema de Gestión de Usuarios
          </h1>
          <p className="text-slate-500">
            Administre usuarios, comentarios y conexiones de forma eficiente
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de registro */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <Users className="h-5 w-5 mr-2 text-slate-600" />
                Registro de Usuario
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Nombre
                  </Label>
                  <Input
                    required
                    value={nuevoUsuario.nombre}
                    onChange={(e) => {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        nombre: e.target.value,
                      });
                    }}
                    className="focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Ingrese nombre completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Edad
                  </Label>
                  <Input
                    required
                    value={nuevoUsuario.edad}
                    type="number"
                    onChange={(e) => {
                      const edadFormateada =
                        Number.parseInt(e.target.value) || 0;
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        edad: edadFormateada,
                      });
                    }}
                    className="focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Ingrese edad"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Email
                  </Label>
                  <Input
                    required
                    value={nuevoUsuario.email}
                    type="email"
                    onChange={(e) => {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        email: e.target.value,
                      });
                    }}
                    className="focus:ring-slate-500 focus:border-slate-500"
                    placeholder="correo@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Rol
                  </Label>
                  <Input
                    required
                    value={nuevoUsuario.rol}
                    onChange={(e) => {
                      setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value });
                    }}
                    className="focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Ej: Desarrollador, Gerente, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Tipo de Usuario
                  </Label>
                  <Select
                    value={nuevoUsuario.tipoUsuario}
                    onValueChange={(e) => {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        tipoUsuario: e as "comun" | "admin",
                      });
                    }}
                  >
                    <SelectTrigger className="w-full focus:ring-slate-500 focus:border-slate-500">
                      <SelectValue placeholder="Seleccione tipo de usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="comun">Usuario Común</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  Agregar Usuario
                </Button>
              </form>
            </div>

            {/* Sección de visualización de detalles */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200 mt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Detalles de Usuario
              </h2>
              <Select
                value={usuarioMostrar?.toString() || ""}
                onValueChange={(e) => {
                  setUsuarioMostrar(e);
                }}
              >
                <SelectTrigger className="w-full mb-4 focus:ring-slate-500 focus:border-slate-500">
                  <SelectValue placeholder="Seleccione un usuario" />
                </SelectTrigger>
                <SelectContent>
                  {usuarios.map((usuario, index) => {
                    return (
                      <SelectItem
                        key={usuario.id}
                        value={usuario.id.toString()}
                      >
                        {usuario.nombre}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {usuarioMostrar && (
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-md font-semibold text-slate-800 mb-2 flex items-center">
                      <ClipboardPlus className="h-4 w-4 mr-2 text-slate-600" />
                      Comentarios
                    </h3>
                    {buscarComentarios(usuarioMostrar) != null &&
                    buscarComentarios(usuarioMostrar)?.length ? (
                      <div className="space-y-2">
                        {buscarComentarios(usuarioMostrar)?.map(
                          (comentario, idx) => {
                            return (
                              <div
                                key={idx}
                                className="p-3 bg-slate-50 rounded-md border border-slate-200 text-sm text-slate-700"
                              >
                                {comentario}
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">
                        No hay comentarios disponibles
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-slate-800 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-slate-600" />
                      Amigos
                    </h3>
                    {buscarAmigos(usuarioMostrar) != null &&
                    buscarAmigos(usuarioMostrar)?.length ? (
                      <div className="grid grid-cols-1 gap-2">
                        {buscarAmigos(usuarioMostrar)?.map((amigo, idx) => {
                          const amigoEncontrado = usuarios.find(
                            (usuario) => usuario.id === amigo
                          );
                          return (
                            <div
                              key={idx}
                              className="flex items-center p-2 bg-slate-50 rounded-md border border-slate-200"
                            >
                              <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 mr-3">
                                {amigoEncontrado?.nombre.charAt(0)}
                              </div>
                              <span className="text-sm font-medium">
                                {amigoEncontrado?.nombre}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">
                        No hay amigos agregados
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800">
                  Listado de Usuarios
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Gestione los usuarios registrados en el sistema
                </p>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Total de usuarios: {usuarios.length}
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="w-[60px] text-slate-700">
                        ID
                      </TableHead>
                      <TableHead className="text-slate-700">Nombre</TableHead>
                      <TableHead className="text-slate-700">Edad</TableHead>
                      <TableHead className="text-slate-700">Email</TableHead>
                      <TableHead className="text-slate-700">Rol</TableHead>
                      <TableHead className="text-slate-700">Tipo</TableHead>
                      <TableHead className="text-slate-700 text-center">
                        Comentarios
                      </TableHead>
                      <TableHead className="text-slate-700 text-center">
                        Amigos
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuarios.map((usuario, index) => {
                      return (
                        <TableRow
                          key={usuario.id}
                          className="hover:bg-slate-50"
                        >
                          <TableCell className="font-medium text-slate-700">
                            {usuario.id}
                          </TableCell>
                          <TableCell className="font-medium text-slate-800">
                            {usuario.nombre}
                          </TableCell>
                          <TableCell>{usuario.edad}</TableCell>
                          <TableCell className="text-slate-700">
                            {usuario.email}
                          </TableCell>
                          <TableCell>{usuario.rol}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                usuario.tipoUsuario === "admin"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {usuario.tipoUsuario === "admin"
                                ? "Administrador"
                                : "Usuario Común"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium flex gap-2 items-center justify-center">
                              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                                {usuario.comentarios.length}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-full"
                                onClick={() => {
                                  setOpenDialog(true);
                                  setIdUsuarioSeleccionado(usuario.id);
                                }}
                              >
                                <ClipboardPlus className="h-4 w-4 text-slate-600" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium flex gap-2 items-center justify-center">
                              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs">
                                {usuario.amigos.length}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-full"
                                onClick={() => {
                                  setOpenDialog2(true);
                                  setIdUsuarioSeleccionado(usuario.id);
                                }}
                              >
                                <Users className="h-4 w-4 text-slate-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        {/* Diálogos */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-slate-800">
                Añadir Comentario
              </DialogTitle>
              <DialogDescription className="text-center text-slate-500">
                Agregue un comentario para el usuario seleccionado
              </DialogDescription>
            </DialogHeader>
            <div className="p-1">
              <Textarea
                value={coment}
                onChange={(e) => {
                  setComent(e.target.value);
                }}
                placeholder="Escriba su comentario aquí..."
                className="min-h-[120px] focus:border-slate-500"
              />
            </div>
            <DialogFooter className="flex space-x-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenDialog(false);
                }}
                className="border-slate-300 text-slate-700"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  guardarComentario();
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                Guardar Comentario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openDialog2} onOpenChange={setOpenDialog2}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-slate-800">
                Añadir Nuevo Amigo
              </DialogTitle>
              <DialogDescription className="text-center text-slate-500">
                Seleccione un usuario para agregar como amigo
              </DialogDescription>
            </DialogHeader>
            <div className="p-1">
              <Select
                value={amigoAgregado}
                onValueChange={(e) => {
                  setAmigoAgregado(e);
                }}
              >
                <SelectTrigger className="w-full focus:ring-slate-500 focus:border-slate-500">
                  <SelectValue placeholder="Seleccione un usuario" />
                </SelectTrigger>
                <SelectContent>
                  {seleccionDeAmigos().map((user, index) => {
                    return (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.nombre}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="flex space-x-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenDialog2(false);
                }}
                className="border-slate-300 text-slate-700"
              >
                Cancelar
              </Button>
              <Button
                onClick={añadirAmigos}
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                Añadir Amigo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
