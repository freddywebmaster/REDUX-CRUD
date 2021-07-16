import React, { useEffect } from 'react'
//redux
import {useSelector, useDispatch} from 'react-redux';
import {obtenerProductosAction} from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

    const productos = useSelector((state) => state.productos.productos);
    const error = useSelector(state=> state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    useEffect(()=>{
        //consultar api
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();
        // eslint-disable-next-line
    },[]);

    return ( 
        <>
            <h2 className="text-center my-5">Listado de Producto</h2>
            {   cargando ? <p className="text-center font-weight-bold">Cargando...</p> : null    }
            {   error ? <p className="alert alert-danger p2 text-center mt-4">Hubo un Error</p> : null  }
            <table className="table table-striped">
                <thead  className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !productos ? <p>No hay Productos</p> :
                        productos.map((producto, index) =>(
                            <Producto key={index} producto={producto} actualizar={obtenerProductosAction}/>
                        )) 
                    }
                </tbody>
            </table>
        </>
     );
}
 
export default Productos;