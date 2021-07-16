import React, {useState, useEffect} from 'react';
import {editarProductoFinal} from '../actions/productoActions';
import {useHistory} from  'react-router-dom';
//redux
import {useSelector, useDispatch} from 'react-redux';

const EditarProducto = () => {

    const [productoEditando, setProductoEditando] = useState({
        nombre: '',
        precio: ''
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const producto = useSelector(state => state.productos.productoeditar);
    const { nombre, precio} = productoEditando;

    useEffect(()=>{
        setProductoEditando(producto);
    },[producto])

    const onChangeForm =(e)=>{
        setProductoEditando({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const submitForm =(e) =>{
        e.preventDefault();
        dispatch( editarProductoFinal(productoEditando));
        history.push('/');
    }

     return ( 
         <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mt-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form onSubmit={submitForm}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeForm}
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
                                    onChange={onChangeForm}
                                />
                            </div>

                            <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      );
 }
  
 export default EditarProducto;