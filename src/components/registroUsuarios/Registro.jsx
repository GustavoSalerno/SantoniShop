import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registro.css';
import Swal from 'sweetalert2';

const Registro = () => {
    const [nuevoUsuario, setNuevoUsuario] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [editUserId, setEditUserId] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        tipodocumento: 1,
        documento: '',
        usuario: '',
        clave: '',
        direccion: '',
        localidad: '',
        provincia: '',
        cpostal: '',
        direccionfiscal: '',
        localidadfiscal: '',
        ciudadfiscal: '',
        cpostalfiscal: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_users_by_id.php');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        const url = editUserId
            ? `https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/registro/registroUsers.php?id=${editUserId}`
            : 'https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/registro/registroUsers.php';

        try {
            const response = await axios.post(url, data, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.status) {
                Swal.fire('Exito', `El usuario ha sido ${editUserId ? 'actualizado' : 'creado'}.`, 'success');
                setNuevoUsuario(false);
                fetchUsuarios();
                setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    tipodocumento: 1,
                    documento: '',
                    usuario: '',
                    clave: '',
                    direccion: '',
                    localidad: '',
                    provincia: '',
                    cpostal: '',
                    direccionfiscal: '',
                    localidadfiscal: '',
                    ciudadfiscal: '',
                    cpostalfiscal: ''
                });
                setEditUserId(null);
            } else {
                Swal.fire('Error', response.data.message, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al registrar el usuario');
            setSuccessMessage('');
        }
    };

    const toggleNuevoUsuario = () => {
        setNuevoUsuario(!nuevoUsuario);
        setEditUserId(null);
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            tipodocumento: 1,
            documento: '',
            usuario: '',
            clave: '',
            direccion: '',
            localidad: '',
            provincia: '',
            cpostal: '',
            direccionfiscal: '',
            localidadfiscal: '',
            ciudadfiscal: '',
            cpostalfiscal: ''
        });
    };

    const confirmDeleteProduct = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteUser(id);
                Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
            }
        });
    };

    const handleDeleteUser = async (userid) => {
        try {
            const response = await axios.delete(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/registro/deleteUser.php?id=${userid}`);
            if (response.data.status) {
                setSuccessMessage(response.data.message);
                setErrorMessage('');
                Swal.fire('Exito', 'El usuario ha sido eliminado correctamente.', 'success');
                fetchUsuarios();
            } else {
                setErrorMessage(response.data.message);
                setSuccessMessage('');
                Swal.fire('Error', response.data.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setErrorMessage('Error al eliminar el usuario');
            setSuccessMessage('');
            Swal.fire('Error', 'Error al eliminar el usuario', 'error');
        }
    };

    const handleEditUser = (user) => {
        setFormData({
            nombre: user.nombre,
            email: user.email,
            telefono: user.telefono,
            tipodocumento: user.tipodocumento,
            documento: user.documento,
            usuario: user.usuario,
            clave: user.clave,
            direccion: user.direccion,
            localidad: user.localidad,
            provincia: user.provincia,
            cpostal: user.cpostal,
            direccionfiscal: user.direccionfiscal,
            localidadfiscal: user.localidadfiscal,
            ciudadfiscal: user.ciudadfiscal,
            cpostalfiscal: user.cpostalfiscal
        });
        setEditUserId(user.id);
        setNuevoUsuario(true);
    };

    return (
        <div className="usuario-container">
            <button className="button-reg" onClick={toggleNuevoUsuario}>
                {nuevoUsuario ? 'Cancelar' : 'Nuevo Usuario'}
            </button>
            {nuevoUsuario && (
                <form onSubmit={handleSubmit}>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="telefono">Número de Contacto:</label>
                            <input type="number" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="tipodocumento">Tipo de Documento:</label>
                            <input type="number" id="tipodocumento" name="tipodocumento" value={formData.tipodocumento} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="documento">DNI:</label>
                            <input type="text" id="documento" name="documento" value={formData.documento} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="usuario">Usuario:</label>
                            <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                    
                            <label htmlFor="clave">Contraseña</label>
                            <input type="password" id="clave" name="clave" value={formData.clave} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="direccion">Dirección:</label>
                            <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="localidad">Localidad:</label>
                            <input type="text" id="localidad" name="localidad" value={formData.localidad} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="provincia">Provincia:</label>
                            <input type="text" id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="cpostal">Código Postal:</label>
                            <input type="number" id="cpostal" name="cpostal" value={formData.cpostal} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="direccionfiscal">Dirección Fiscal:</label>
                            <input type="text" id="direccionfiscal" name="direccionfiscal" value={formData.direccionfiscal} onChange={handleChange} />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="localidadfiscal">Localidad Fiscal:</label>
                            <input type="text" id="localidadfiscal" name="localidadfiscal" value={formData.localidadfiscal} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="ciudadfiscal">Ciudad Fiscal:</label>
                            <input type="text" id="ciudadfiscal" name="ciudadfiscal" value={formData.ciudadfiscal} onChange={handleChange} />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="cpostalfiscal">Código Postal Fiscal:</label>
                            <input type="number" id="cpostalfiscal" name="cpostalfiscal" value={formData.cpostalfiscal} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="button">  {editUserId ? 'Actualizar Usuario' : 'Guardar Usuario'}</button>
                </form>
            )}

            <table className="usuario-table">
                <thead>
                    <tr>
                        <th>ID de Usuarios</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Contacto</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefono}</td>
                            <td className='buttons'>
                                <button className="button-action" onClick={() => handleEditUser(usuario)}>Editar</button>
                                <button className="button-action" onClick={() => confirmDeleteProduct(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Registro;
