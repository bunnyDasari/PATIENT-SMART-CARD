import "./index.css"
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { PDFDocument } from 'pdf-lib';

import * as pdfjsLib from 'pdfjs-dist/webpack';

const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const [pdfText, setPdfText] = useState('');
    const [data, setdata] = useState({ data: "" })
    const handleChange = async (file) => {
        setFile(file);
        if (file && file.type === 'application/pdf') {
            const text = await extractTextFromPDF(file);
            setPdfText(text);
            console.log(file);
            console.log(pdfText);
        }
    };

    const extractTextFromPDF = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            text += strings.join(' ');
        }

        return text;

    };
    const onClickSubmit = () => {
        setdata({ data: pdfText })
        console.log(data)
    }
    console.log(file)
    console.log(pdfText)
    return (
        <div className="container">
            <h1 className="heading">Upload your Document</h1>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <button onClick={onClickSubmit}>Submit</button>
        </div>
    );
}
export default UploadDocument