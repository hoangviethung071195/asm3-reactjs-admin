import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfirmDialog } from 'primereact/confirmdialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode >
		<App />
		<ToastContainer />
		<ConfirmDialog />
	</React.StrictMode>
);

reportWebVitals();
