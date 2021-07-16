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
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR
} from '../types';

const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null
}

export default function fn(state = initialState, action){
    switch (action.type) {
        case OBTENER_PRODUCTO:
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: action.payload 
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: [...state.productos, action.payload ]
            }
        case AGREGAR_PRODUCTO_ERROR:
        case OBTENER_PRODUCTO_ERROR:
        case ELIMINAR_PRODUCTO_ERROR:
        case EDITAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case ELIMINAR_PRODUCTO:
            return{
                ...state,
                productoeliminar: action.payload
            }
        case ELIMINAR_PRODUCTO_EXITO:
            return{
                ...state,
                productos: state.productos.filter(producto => state.productos.id !== state.productoeliminar),
                productoeliminar: null
            }
        case EDITAR_PRODUCTO:
            return{
                ...state,
                productoeditar: action.payload
            }
        case EDITAR_PRODUCTO_EXITO:
            return{
                ...state,
                productoeditar: null,
                productos: state.productos.map( producto=>
                    producto.id === action.payloa.id ? producto = action.payload :
                    producto
                )
            }
        default:
            return state;
    }
}