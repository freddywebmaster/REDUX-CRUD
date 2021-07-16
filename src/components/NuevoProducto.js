import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { crearNuevoProductoAction } from '../actions/productoActions';
import {mostrarAlerta, ocultarAlerta} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    const dispatch = useDispatch();
    
    //acceder al state del store
    const cargando = useSelector( (state) => state.productos.loading);
    const error = useSelector((state) => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta)

    const agregarProducto = ( producto ) => dispatch( crearNuevoProductoAction(producto) );

    const submitNuevoProducto = (e) =>{
        e.preventDefault();

        //validar

        if(nombre.trim() === "" || precio <= 0){
            const alerta = {
                msg: 'Llena todos los campos',
                class: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta));
            return;
        }

        //si no hay errores
        dispatch( ocultarAlerta() );

        agregarProducto({
            nombre,
            precio
        });

        //redireccionar
        history.push('/');

    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mt-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Producto
                        </h2>
                        {
                            alerta ? <p className={alerta.class}>{alerta.msg}</p> : null
                        }
                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={ e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number" 
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={ e => guardarPrecio( Number(e.target.value)) }
                                />
                            </div>

                            <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Agregar
                            </button>
                        </form>
                        {   cargando ? <p>Cargando...</p> : null    }
                        {   error ? <p className="alert alert-danger p2 text-center mt-4">Hubo un Error</p> : null  }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;