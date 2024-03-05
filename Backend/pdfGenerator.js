const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
const DB = process.env.DATABASE;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express()
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express());

const Linkdata22 = require('./Link'); // Assuming this is the path to your Mongoose model





// Route to generate and download the PDF
app.get('/generate-pdf', async (req, res) => {
  try {
    const data = await Linkdata22.find(); // Fetch data from MongoDB

    const doc = new PDFDocument();
    // Pipe the PDF output to the response
    doc.pipe(res);

    doc.fontSize(16).text('Data from MongoDB', { align: 'center' });
    doc.moveDown();

    data.forEach((item, index) => {
      doc.fontSize(12).text(`#${index + 1} - URL: ${item.url}`);
      doc.moveDown();
    });

    doc.end();
    console.log('PDF sent successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Failed to generate PDF');
  }
});




