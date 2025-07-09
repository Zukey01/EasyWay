import axios from 'axios';

// ⚠️ Usa tu IP local en vez de localhost si estás en Expo Web
const api = axios.create({
  baseURL: 'http://192.168.30.91:3000/api', // Reemplazar con tu IP local real
});

export { api };

export const register = async (
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  email: string,
  password: string,
  confirmPassword: string,
  telefono: string,
  tipoAcceso: string

) => {
  try {
    const response = await api.post('/auth/register', {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      email,
      password,
      confirmPassword,
      telefono,
      tipoAcceso
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al registrarse';
  }
};

export const login = async (
  email: string,
  password: string
) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};


export const reportarBache = async (
  descripcion: string,
  ubicacion: { lat: number; lng: number },
  imagenURL: string,
  fecha: string
) => {
  try {
    const response = await api.post('/reportes', {
      descripcion,
      ubicacion,
      imagenURL,
      fechaCreacion: fecha, // O puedes dejarlo que el backend lo genere si es opcional
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al reportar el bache';
  }
};
