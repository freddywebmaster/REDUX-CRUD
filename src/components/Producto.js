import React from 'react'
import {useHistory} from 'react-router-dom';
import alerta from 'sweetalert2';
//redux
import { useDispatch } from 'react-redux';
import {eliminarProductoAction, editarProductoAction} from '../actions/productoActions';

const Producto = ({producto, actualizar}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmarEliminarProducto = (id) =>{

        alerta.fire({
            title: 'Seguro de eliminar?',
            text: "No se podra recuperar el producto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch( eliminarProductoAction(id));
                dispatch(actualizar())
            }
          })
    }
    const redireccionarEditar = producto =>{
        dispatch( editarProductoAction(producto))
        history.push(`/productos/editar/${producto.id}`)
    }
    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> Q {precio} </span></td>
            <td className="acciones">
                <button onClick={()=> redireccionarEditar(producto)} className="btn btn-primary">Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={()=> confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Producto;