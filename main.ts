import * as fs from 'fs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile';
const PDFDocument = require('pdf-lib').PDFDocument;
import { instance } from './constants';
import { join } from 'path';
import pdfParse from 'pdf-parse';
import { spawnSync } from 'child_process';

/**
 * This function is used to convert docx into pdf file format.
 * @param {string} inputPath
 * @param {string} fileName
 * @returns Promise{void}
 */
async function covertDocxToPDF(
  inputPath: string,
  fileName: string
): Promise<void> {
  const task = instance.newTask('officepdf');
  return await task
    .start()
    .then(() => {
      const file = new ILovePDFFile(inputPath);
      return task.addFile(file);
    })
    .then(() => {
      console.log('✅ Convert file to single PDF processing...');
      return task.process();
    })
    .then(() => {
      console.log('✅ Download file to single PDF processing...');
      return task.download();
    })
    .then((data) => {
      fs.writeFileSync(fileName, data);
      console.log('✅ CONVERT TO SINGLE PDF SUCCESSFULLY !!!');
    });
}

/**
 * This function is responsible for splitting the main PDF file into pdf files by each page number
 * @param {string}  fileName
 * @param {string} storingAt
 */
async function splitPdf(fileName: string, storingAt: string): Promise<void> {
  const documentAsBytes = fs.readFileSync(fileName);

  // Load your PDFDocument
  const pdfDoc = await PDFDocument.load(documentAsBytes);
  const numberOfPages = pdfDoc.getPages().length;

  // Create directory to store PDF documents
  fs.mkdirSync(storingAt, {
    recursive: true,
  });

  for (let i = 0; i < numberOfPages; i++) {
    // Create a new "sub" document
    const subDocument = await PDFDocument.create();
    // copy the page at current index
    const [copiedPage] = await subDocument.copyPages(pdfDoc, [i]);

    subDocument.addPage(copiedPage);

    const pdfBytes = await subDocument.save();
    fs.writeFileSync(`${storingAt}/file-${i + 1}.pdf`, pdfBytes);

    console.log(`✅ Split to pdf file: ${i}.pdf`);
  }
}

/**
 * This function is used to storing names of user on PDF files and used internally for mapping name files after converted
 * @param {string} fileName
 * @returns Promise{string[]}
 */
async function storingNames(fileName: string): Promise<string[]> {
  const pdfBuffer = fs.readFileSync(fileName);

  return await pdfParse(pdfBuffer).then((pdf) => {
    const names = pdf.text
      .split('\n')
      .map((line) => {
        if (line.startsWith('HỌ VÀ TÊN: ')) {
          return line
            .replace('HỌ VÀ TÊN: ', ' ')
            .replace(/\s*ĐƠN VỊ:.*$/, '')
            .trim();
        }
        return null;
      })
      .filter(Boolean) as string[];

    return Promise.resolve(names);
  });
}

/**
 * This function is used for rename the files after storing names by method `storingNames`
 * @param {string} fromDir
 * @param {string} toDir
 * @param {string} type
 * @param {string[]} names
 */
function renameFiles(
  fromDir: string,
  toDir: string,
  type: string,
  names: string[]
): void {
  // Create directory to store PDF documents
  fs.mkdirSync(toDir, {
    recursive: true,
  });

  for (let index = 1; index <= names.length; index++) {
    fs.rename(
      `${fromDir}/file-${index}.${type}`,
      `${toDir}/${index}. ${names[index - 1]}.${type}`,
      (err) => {
        if (err) console.error('❌ Error renaming file:', err);
        else
          console.log(
            `✅ Renamed: file-${index}.${type} → ${names[index - 1]}.${type}`
          );
      }
    );
  }
}

/**
 * Main function for executing a command
 */
(async () => {
  // File pdf full after convert from docx
  const docx = join(process.cwd(), 'document.docx');
  const pdf = join(process.cwd(), 'document.pdf');

  try {
    const dirStorage = ['docxs', 'pdfs'];

    // Convert docx file to pdf
    await covertDocxToPDF(docx, pdf);

    // Collect content name ownership file name
    const names = await storingNames(pdf);

    // Split pdf files by page
    await splitPdf(pdf, dirStorage[1]);

    spawnSync('python3', ['convert-docx.py'], {
      cwd: '.',
    });

    // Rename file pdfs to correct with users name
    renameFiles(dirStorage[1], dirStorage[1], 'pdf', names);

    // Rename file docx to correct with users name
    renameFiles(dirStorage[0], dirStorage[0], 'docx', names);
  } catch (error) {
    console.log('❌ Got crashing when execute process', error);
  } finally {
    // Remove pdf after splitting
    fs.rmSync(pdf);
    console.log('✅ Process finished !');
  }
})();
