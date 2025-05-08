import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //   <App/>     
  //   </Provider>
  // </React.StrictMode>
  // <React.StrictMode>
  //   <Provider store={store}>
  //   <AppPro/>     
  //   </Provider>
  // </React.StrictMode>
  <React.StrictMode>
    <App></App>
  </React.StrictMode> //1:31:44
);


