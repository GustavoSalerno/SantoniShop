import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registro.css';

const Registro = () => {
    const [nuevoUsuario, setNuevoUsuario] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        tipoDocumento: '',
        documento: '',
        usuario: '',
        password: '',
        direccion: '',
        localidad: '',
        provincia: '',
        cpostal: '',
        direccionFiscal: '',
        localidadFiscal: '',
        ciudadFiscal: '',
        cpostalFiscal: '',
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_users_by_id.php');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/registro/registroUsers.php', formData)
            .then(response => {
                console.log(response.data);
                alert('Usuario registrado correctamente');
            })
            .catch(error => {
                console.error('Hubo un error al registrar el usuario!', error);
            });
    };

    const toggleNuevoUsuario = () => {
        setNuevoUsuario(!nuevoUsuario);
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
                        <div className="form-group-reg">
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="telefono">Número de Contacto:</label>
                            <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                            <input type="text" id="tipoDocumento" name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="documento">Documento:</label>
                            <input type="text" id="documento" name="documento" value={formData.documento} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="usuario">Usuario:</label>
                            <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="direccion">Dirección:</label>
                            <textarea id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required></textarea>
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
                            <input type="text" id="cpostal" name="cpostal" value={formData.cpostal} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="direccionFiscal">Dirección Fiscal:</label>
                            <textarea id="direccionFiscal" name="direccionFiscal" value={formData.direccionFiscal} onChange={handleChange} required></textarea>
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="localidadFiscal">Localidad Fiscal:</label>
                            <input type="text" id="localidadFiscal" name="localidadFiscal" value={formData.localidadFiscal} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row-reg">
                        <div className="form-group-reg">
                            <label htmlFor="ciudadFiscal">Ciudad Fiscal:</label>
                            <input type="text" id="ciudadFiscal" name="ciudadFiscal" value={formData.ciudadFiscal} onChange={handleChange} required />
                        </div>
                        <div className="form-group-reg">
                            <label htmlFor="cpostalFiscal">Código Postal Fiscal:</label>
                            <input type="text" id="cpostalFiscal" name="cpostalFiscal" value={formData.cpostalFiscal} onChange={handleChange} required />
                        </div>
                    </div>
                    <button className="button-reg" type="submit">Registrar</button>
                </form>
            )}

            <table className="usuario-table">
                <thead>
                    <tr>
                        <th>ID</th>
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
                            <td>
                                <button className="button-action">Editar</button>
                                <button className="button-action">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Registro;
