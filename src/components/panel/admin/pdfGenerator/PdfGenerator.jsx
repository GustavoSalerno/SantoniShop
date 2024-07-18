import jsPDF from 'jspdf';
import 'jspdf-autotable';

import Logo from '../../../logo.jpg'; // Ajusta la ruta según la ubicación de tu imagen
/**
 * utilizar jspdf-autotable para generar una tabla
 * npm install jspdf jspdf-autotable
 * 
 */
const generatePDF = (orderDetails, detalleOrden,datos) => {
  console.log(datos)
  var {
    cantidad,
    cantidad_total,
    detalle_orden_id,
    dni,
    email,
    estado,
    fechaorden,
    id,
    nombre,
    orden_id,
    product_id,
    productname,
    productprice,
    nombre_estado,
    description,
    telefono
  } = orderDetails;

  orderDetails.map((orden) =>{
    return (
      cantidad = orden.cantidad,
      cantidad_total = orden.cantidad_total,
      detalle_orden_id = orden.detalle_orden_id,
      dni = orden.dni,
      email = orden.email,
      estado = orden.estado,
      fechaorden = orden.fechaorden,
      id = orden.id,
      nombre = orden.nombre,
      orden_id = orden.orden_id,
      description = orden.productdescription,
      product_id = orden.product_id,
      nombre_estado = orden.nombre_estado,
      productname = orden.productname,
      productprice = orden.productprice,
      telefono = orden.telefono
    )
  })
  
    const formatearFecha = (fecha) => {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const marginLeft = 10;
    const marginRight = 130;
    const marginLeftTit = 65;
    const marginTop = 10;
  
    doc.setFontSize(40);
    doc.rect(marginRight - marginRight + 5, marginTop - 3, marginRight + 70, 280);
  
    // Dibujar un borde circular alrededor del logo
    const logoDiameter = 50;
    const logoRadius = logoDiameter / 2;
    const centerX = marginLeft + logoRadius;
    const centerY = marginTop + logoRadius;
  
    // doc.ellipse(centerX, centerY, logoRadius, logoRadius, 'S');
    doc.addImage(Logo, 'JPEG', marginLeft-4.7, marginTop-2.8, logoDiameter + 150, logoDiameter, 'S', 'FAST');
  
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Dirección:`, marginRight, marginTop + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(`${datos[0].direccion}`, marginRight + 25, marginTop + 5);
    doc.text(`Nombre: CasaSantoni`, marginRight, marginTop + 10);
    doc.text(`Teléfono: 1125252525`, marginRight, marginTop + 15);
    doc.text(`Correo electrónico: casasantoni@gmail.com`, marginRight, marginTop + 20);
  
    doc.setFontSize(30);
    doc.line(marginLeft - 5, marginTop + 35, pageWidth - marginLeft + 5, marginTop + 35);
    doc.setFontSize(20);
    doc.text(`Detalle de la Orden N°: ${orden_id}`, marginLeftTit, marginTop + 43);
    doc.line(marginLeft - 5, marginTop + 46, pageWidth - marginLeft + 5, marginTop + 46);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Cliente: `, marginLeft, marginTop + 52);
    doc.setFont('helvetica', 'normal');
    doc.text(`${nombre}`, marginLeft + 20, marginTop + 52);
    doc.text(`Dni: ${dni}`, marginLeft, marginTop + 57);
    doc.text(`email: ${email}`, marginLeft, marginTop + 62);
    doc.text(`F. Orden: ${formatearFecha(fechaorden)}`, marginLeft, marginTop + 67);
    doc.text(`Estado: ${nombre_estado}`, marginLeft, marginTop + 72);
    // doc.rect(marginRight - marginRight + 5, marginTop + 80, 100, 100);
    doc.line(marginLeft, marginTop + 85, pageWidth - marginLeft, marginTop + 85);
    doc.text(`Detalle de Productos:`, marginLeft, marginTop + 90);
  
    // Dibujar los encabezados de la tabla de productos
    const tableHeaderY = marginTop + 100;
    const tableHeaders = ['ID', 'Cant', 'Producto', 'P Unidad', 'Subtotal'];
    const tableData = orderDetails.map((detalle) => [
      detalle.product_id ? detalle.product_id.toString() : '',
      detalle.cantidad ? detalle.cantidad.toString() : '',
      detalle.productname ? detalle.productname : '',
      detalle.productprice ? detalle.productprice.toString() : '',
      detalle.cantidad && detalle.productprice ? (detalle.cantidad * detalle.productprice).toFixed(2) : '',
    ]);
  
    // Usar autotable para crear la tabla
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: tableHeaderY,
      margin: { left: marginLeft, right: marginLeft },
      theme: 'striped',
    });
  
    const total = detalleOrden.reduce((sum, detalle) => sum + detalle.cantidad * productprice, 0);
    doc.text(`Total: ${total.toFixed(2)}`, marginLeft + 140, doc.previousAutoTable.finalY + 10);
  
    doc.save(`orden_${orden_id}.pdf`);
  };
  
  export default generatePDF;
  