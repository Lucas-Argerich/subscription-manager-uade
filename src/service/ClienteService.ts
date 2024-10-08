import axios from 'axios'

const CLIENTE_BASE_REST_API = 'http://localhost:8080/api/v1/cliente'

class ClienteService{

    createUsuario(){
        // nombreUsario
        // contraseña
        return axios.post(CLIENTE_BASE_REST_API)        
    }

    getAllServices(){
        /* Traeria todos los servicios/suscripciones
        Campos:
            - nombreServicio
            - costoMensual
            - plan (si es familiar, cuantos integranes)
            - cuenta (nombre del usuario para usar la suscripcion)
            - contraseña
            - seguridadCredencial (ver)
        */
        return axios.get(CLIENTE_BASE_REST_API)
    }

    createSevice(){
        /* Crear Servicio
        Campos:
            - nombreServicio
            - costoMensual
            - plan (si es familiar, cuantos integranes)
            - diaDeVecnimiento (ver)
            - cuenta (nombre del usuario para usar la suscripcion)
            - contraseña
            - seguridadCredencial (ver)
        */
        return axios.post(CLIENTE_BASE_REST_API)
    }

    updateService(idServicio,idUsuario){
        /*Update servicio/suscripcion
        Campos:
            - nombreServicio
            - costoMensual
            - plan (si es familiar, cuantos integranes)
            - diaDeVecnimiento (ver)
            - cuenta (nombre del usuario para usar la suscripcion)
            - contraseña
            - seguridadCredencial (ver)
        */
        return axios.put(CLIENTE_BASE_REST_API)
    }

    deleteService(idServicio,idUsuario){
        //Update servicio/suscripcion
        return axios.delete(CLIENTE_BASE_REST_API)
    }
}

export default new ClienteService()