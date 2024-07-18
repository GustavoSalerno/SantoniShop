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
    doc.setFillColor(220, 220, 220); // Gris claro
    doc.rect(marginRight - marginRight + 5, marginTop - 3, marginRight + 70, 280 );
  
  
  
    // doc.addImage(Logo, 'JPEG', marginLeft-4.7, marginTop-2.8, logoDiameter + 150, logoDiameter, 'S', 'FAST');
    doc.setTextColor(0,0,0);
    doc.text(`Casa Santoni`, 15, marginTop + 15);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Dirección:`, marginRight, marginTop + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${datos[0].direccion}`, marginRight + 21, marginTop + 10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Nombre: `, marginRight, marginTop + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(`${datos[0].rsocial}`, marginRight + 20, marginTop + 5);
    doc.setFont('helvetica', 'bold');
    doc.text(`Teléfono: `, marginRight, marginTop + 15);
    doc.setFont('helvetica', 'normal');
    doc.text(`${datos[0].telefono}`, marginRight + 20, marginTop + 15);
    doc.setFont('helvetica', 'bold');
    doc.text(`E-mail: `, marginRight, marginTop + 20);
    doc.setFont('helvetica', 'normal');
    doc.text(`${datos[0].mail}`, marginRight + 20, marginTop + 20);
  
    doc.setFontSize(30);
    doc.line(marginLeft - 5, marginTop + 22, pageWidth - marginLeft + 5, marginTop + 22);
    doc.setFontSize(20);
    // doc.text(`Detalle de la Orden N°: ${orden_id}`, marginLeftTit, marginTop + 43);
    // doc.line(marginLeft - 5, marginTop + 46, pageWidth - marginLeft + 5, marginTop + 46);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Cliente: `, marginLeft, marginTop + 42);
    doc.setFont('helvetica', 'normal');
    doc.text(`${nombre}`, marginLeft + 20, marginTop + 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Dni: `, marginLeft, marginTop + 48);
    doc.setFont('helvetica', 'normal');
    doc.text(`${dni}`, marginLeft + 20, marginTop + 48);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Email: `, marginLeft, marginTop + 54);
    doc.setFont('helvetica', 'normal');
    doc.text(`${email}`, marginLeft + 20, marginTop + 54);
    doc.setFont('helvetica', 'bold');
    doc.text(`F. Orden: `, marginLeft, marginTop + 60);
    doc.setFont('helvetica', 'normal');
    doc.text(` ${formatearFecha(fechaorden)}`, marginLeft + 20, marginTop + 60);
    doc.setFont('helvetica', 'bold');
    doc.text(`Tel.:`, marginLeft, marginTop + 66);
    doc.setFont('helvetica', 'normal');
    doc.text(` ${telefono}`, marginLeft + 20, marginTop + 66);
    // doc.rect(marginRight - marginRight + 5, marginTop + 80, 100, 100);
    doc.line(marginLeft -5 , marginTop + 70, pageWidth - marginLeft +5, marginTop + 70);
    doc.line(marginLeft -5 , marginTop + 33, pageWidth - marginLeft +5, marginTop + 33);
    doc.line(marginLeft -5 , marginTop + 33.2, pageWidth - marginLeft +5, marginTop + 33.2);
    doc.setFontSize(25);
    doc.text(`Orden N°: ${orden_id}`, marginLeft + 60, marginTop + 31);
    doc.line(marginLeft - 5, marginTop + 86, pageWidth - marginLeft + 5, marginTop + 86);
    // doc.text(`Detalle de Productos:`, marginLeft, marginTop + 90
  
    // Dibujar los encabezados de la tabla de productos
    const tableHeaderY = marginTop + 86.5;
    const tableHeaders = ['ID', 'Cant', 'Producto','', 'P Unidad', 'Subtotal'];
    const tableData = orderDetails.map((detalle) => [
        detalle.product_id ? detalle.product_id.toString() : '',
        detalle.cantidad ? detalle.cantidad.toString() : '',
        detalle.productname ? detalle.productname : '',
        detalle.er ? '' : '',
        detalle.productprice ? detalle.productprice.toString() : '',
        detalle.cantidad && detalle.productprice ? (detalle.cantidad * detalle.productprice).toFixed(2) : '',
    ]);
    
    
    // doc.rect(0, 0, pageWidth, doc.internal.pageSize.height, 'F'); // Dibujar un rectángulo que cubra toda la página
    // Usar autotable para crear la tabla
    doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: tableHeaderY,
        margin: { left: marginLeft - 4.5, right: marginLeft -4.5},
        theme: 'striped',
    });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const total = detalleOrden.reduce((sum, detalle) => sum + detalle.cantidad * productprice, 0);
    doc.text(`Total a pagar:`, marginLeft + 110, doc.previousAutoTable.finalY + 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text(`$ ${total.toFixed(2)}`, marginLeft + 150, doc.previousAutoTable.finalY + 105);
    
    console.log(doc.previousAutoTable.finalY + 100);
    doc.line(marginLeft -5 , doc.previousAutoTable.finalY + 98, pageWidth - marginLeft +5, doc.previousAutoTable.finalY + 98);
    doc.line(marginLeft -5 , doc.previousAutoTable.finalY + 110, pageWidth - marginLeft +5, doc.previousAutoTable.finalY + 110);
    doc.line(marginLeft -5 , marginTop + 270, pageWidth - marginLeft +5, marginTop + 270);
    doc.setFontSize(14);
    doc.setFont('arial' , 'black');
    doc.text('Comprobante NO VALIDO como factura', marginLeft + 50, 285);
    doc.save(`orden_${orden_id}.pdf`);
};

export default generatePDF;
