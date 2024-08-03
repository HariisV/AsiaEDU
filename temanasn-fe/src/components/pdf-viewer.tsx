import {Viewer, Worker} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PDFViewer({fileUrl}) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
      <div style={{height: '750px'}}>
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]}/>
      </div>
    </Worker>
  );
};