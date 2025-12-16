import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const manejarSubmit = (evento) => {
    evento.preventDefault();

    if (login(usuario, contrasenia)) {
      navigate("/");
    } else {
      alert("Usuario o Contraseña invalido");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
            Iniciar Sesion
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={manejarSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="usuario"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  value={usuario}
                  onChange={(evento) => setUsuario(evento.target.value)}
                  className="block w-full border rounded-md px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Olvidaste la contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={contrasenia}
                  onChange={(evento) => setContrasenia(evento.target.value)}
                  className="block w-full border rounded-md px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-[#333]  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Ingresá
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-600">
            No estas registrado?{" "}
            <a
              href="#"
              className="font-semibold text-gray-900 hover:text-gray-700"
            >
              Hacelo aca
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;