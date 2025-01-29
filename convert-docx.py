import os
from pdf2docx import parse

# Define paths for PDF and DOCX files
pdfs = os.path.join(os.getcwd(), 'pdfs')  # Use os.path.join() for safe paths
docx_dir = os.path.join(os.getcwd(), 'docxs')

# Ensure docx directory exists
if not os.path.exists(docx_dir):
    os.mkdir(docx_dir)

count = 1

# Loop through the files in the pdfs directory
for page in os.listdir(pdfs):
    # Check if the file is a PDF
    if page.endswith('.pdf'):
        pdf_path = os.path.join(pdfs, f"file-{count}.pdf")  # Full PDF path
        docx_path = os.path.join(docx_dir, f"file-{count}.docx")  # Full DOCX path
        
        print(f"Converting {pdf_path} to {docx_path}")
        
        # Convert the PDF to DOCX
        # convert pdf to docx
        
        # cv = Converter(pdf_path)
        # cv.convert(docx_path)
        # cv.close()
        parse(pdf_path, docx_path)
        count += 1

print("All PDFs have been converted!")