import { createContext, useState, useEffect } from "react";
import api from "../api/api"; // Usa la instancia personalizada
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

// Componente proveedor que envolverá el árbol de la aplicación
export const AuthProvider = ({ children }) => {

    // Estado para almacenar información del usuario autenticado
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    // Permite conocer desde otros componentes si la app está cargando
    const [loading, setLoading] = useState(true);

    // Al cargar la aplicación
    useEffect(() => {
        const storedAccess = localStorage.getItem("accessToken");
        const storedRefresh = localStorage.getItem("refreshToken");

        if (storedAccess && storedRefresh) {
            try {
                setAccessToken(storedAccess);
                setRefreshToken(storedRefresh);
                setUser(jwtDecode(storedAccess));
            } catch (err) {
                console.error("Token inválido, limpiando localStorage.", err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            }
        }

        setLoading(false);
    }, []);



    // Configura interceptores una vez cuando se montan los tokens
    useEffect(() => {
        if (!accessToken || !refreshToken) return;

        // Agrega token de acceso en cada solicitud
        api.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${accessToken}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Interceptor para respuestas 401 y renovar token
        api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Si el token expiró, intenta renovarlo una vez
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const response = await api.post("/api/token/refresh/", {
                            refresh: refreshToken,
                        });
                        const newAccess = response.data.access;

                        // Actualiza tokens en memoria y almacenamiento
                        localStorage.setItem("accessToken", newAccess);
                        setAccessToken(newAccess);
                        setUser(jwtDecode(newAccess));

                        // Reintenta la solicitud original con el nuevo token
                        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                        return api(originalRequest);
                    } catch (err) {
                        logout(); // Si falla el refresh, cierra sesión
                    }
                }

                return Promise.reject(error);
            }
        );
    }, [accessToken, refreshToken]);

    const login = async (username, password) => {
        try {
            const response = await api.post("/api/token/", {
                username,
                password,
            });

            const { access, refresh } = response.data;

            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);

            setAccessToken(access);
            setRefreshToken(refresh);
            setUser(jwtDecode(access));
        } catch (error) {
            console.error("Login failed", error);
            throw new Error("Credenciales inválidas");
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );

};