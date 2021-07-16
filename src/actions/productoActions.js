import{
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO,
    OBTENER_PRODUCTO_EXITO,
    OBTENER_PRODUCTO_ERROR,
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    EDITAR_PRODUCTO,
    INICIAR_EDITAR_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import alerta from 'sweetalert2';


//crear nuevos prod
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try {
            await clienteAxios.post('/productos', producto)
            dispatch( agregarProductoExito(producto) );
            alerta.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( agregarProductoError(true) );
            alerta.fire(
                'Error',
                'El producto no se agrego',
                'error'
            )
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//si el producto se guarda
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hay error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})



//OBTENER PRODUCTOS
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( obtenerProductos() );

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( obtenerProductosExitosa(respuesta.data) );            
        } catch (error) {
            dispatch( obtenerProductosError() );
        }
    }
}

const obtenerProductos = () => ({
    type: OBTENER_PRODUCTO,
    payload: true
})

const obtenerProductosExitosa = (productos) => ({
    type: OBTENER_PRODUCTO_EXITO,
    payload: productos
})

const obtenerProductosError=()=>({
    type: OBTENER_PRODUCTO_ERROR,
    payload: true
}) 

//Eliminar Productos
export function eliminarProductoAction(id){
    return async (dispatch)=>{
        dispatch(obtenerProductoEliminar(id) );

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );
            alerta.fire(
                'Eliminado!',
                'El producto fue eliminado.',
                'success'
              )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id =>({
    type: ELIMINAR_PRODUCTO,
    payload: id
})

const eliminarProductoExito = () =>({
    type: ELIMINAR_PRODUCTO_EXITO
})

const eliminarProductoError=()=>({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
})

export function editarProductoAction(producto){
    return (dispatch) =>{
        dispatch( obtenerEditarProducto(producto) );
    }
}

const obtenerEditarProducto = (producto) =>({
    type: EDITAR_PRODUCTO,
    payload: producto
})

//FINALIZAR EDITAR
export function editarProductoFinal(producto){
    return async (dispatch) =>{
        dispatch( editarProducto(producto) );
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto) );
        } catch (error) {
            dispatch( editarProductoError() );
        }
    }
}

const editarProducto = (producto) =>({
    type: INICIAR_EDITAR_PRODUCTO,
    payload: producto
});

const editarProductoExito = producto =>({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
})

const editarProductoError = producto =>({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
})