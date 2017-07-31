import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './utills/registerServiceWorker';
import './scss/styles.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
