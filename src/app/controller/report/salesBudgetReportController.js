import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import path from 'path';
import { logger } from '../../../config/index.js';

const salesBudgetReport = async (request, reply) => {
    try {
        const { month, products, totals } = request.body;

        const doc = new PDFDocument();
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const regularFontPath = path.resolve(__dirname, '../../../assets/fonts/Montserrat-Regular.ttf');
        const boldFontPath = path.resolve(__dirname, '../../../assets/fonts/Montserrat-Bold.ttf');
        doc.registerFont('Montserrat-Bold', boldFontPath);
        doc.registerFont('Montserrat', regularFontPath);

        const logoPath = path.resolve(__dirname, '../../../assets/imgs/logo_completo.png');
        doc.image(logoPath, 50, 50, { width: 150 });
        doc.moveDown(3);

        doc.font('Montserrat-Bold').fontSize(22).fillColor('#153265').text('Presupuestos de Ventas', { align: 'center' });
        doc.moveDown(1);
        doc.font('Montserrat').fontSize(12).fillColor('#000000').text(`Datos del mes: ${month}`, { align: 'left' });
        doc.moveDown(1);

        const totalDecada1 = products.reduce((acc, item) => acc + item.d1, 0);
        const totalDecada2 = products.reduce((acc, item) => acc + item.d2, 0);
        const totalDecada3 = products.reduce((acc, item) => acc + item.d3, 0);
        const totalGeneral = products.reduce((acc, item) => acc + item.total, 0);

        const columnX = [50, 150, 250, 350, 450];
        const yPosition = doc.y;

        doc.font('Montserrat-Bold').fontSize(12).fillColor('#153265')
            .text('Producto', columnX[0], yPosition)
            .text('Década 1', columnX[1], yPosition)
            .text('Década 2', columnX[2], yPosition)
            .text('Década 3', columnX[3], yPosition)
            .text('Total', columnX[4], yPosition);

        doc.moveTo(50, doc.y).lineTo(500, doc.y).stroke();

        let yPosition2 = doc.y;

        products.forEach(item => {
            doc.font('Montserrat').fontSize(10).fillColor('#000000')
                .text(item.name, columnX[0], yPosition2 + 15)
                .text(item.d1.toString(), columnX[1], yPosition2 + 15)
                .text(item.d2.toString(), columnX[2], yPosition2 + 15)
                .text(item.d3.toString(), columnX[3], yPosition2 + 15)
                .text(item.total.toString(), columnX[4], yPosition2 + 15);

            yPosition2 = yPosition2 + 40;
            doc.moveTo(50, yPosition2).lineTo(500, yPosition2).stroke();
        });

        doc.moveDown(1);
        let yPosition3 = doc.y;
        doc.font('Montserrat-Bold').fillColor('#153265')
            .text('Total', columnX[0], yPosition3 + 5)
            .text(totalDecada1.toString(), columnX[1], yPosition3 + 5)
            .text(totalDecada2.toString(), columnX[2], yPosition3 + 5)
            .text(totalDecada3.toString(), columnX[3], yPosition3 + 5)
            .text(totalGeneral.toString(), columnX[4], yPosition3 + 5);

        doc.moveTo(50, doc.y + 15).lineTo(500, doc.y + 15).stroke();

        const pageCount = doc.bufferedPageRange().count;
        const footerText = `Página ${pageCount} | Reporte generado el ${new Date().toLocaleDateString()}`;
        doc.fontSize(8).fillColor('#999999')
            .text(footerText, 50, doc.page.height - 90, { width: 500, align: 'center' });

        reply.raw.setHeader('Access-Control-Allow-Origin', '*');
        reply.raw.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        reply.raw.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        reply.raw.setHeader('Content-Type', 'application/pdf');
        reply.raw.setHeader('Content-Disposition', 'inline; filename="presupuesto_ventas.pdf"');

        doc.pipe(reply.raw);

        await new Promise((resolve, reject) => {
            doc.on('end', resolve);
            doc.on('error', reject);
            doc.end();
        });

    } catch (error) {
        logger.error("Se ha producido un error generando el reporte de presupuesto de ventas:", error);
        return reply.code(500).send({
            ok: false,
            statusCode: 500,
            message: "Se ha producido un error generando el reporte de presupuesto de ventas."
        });
    }
};


export { salesBudgetReport };
