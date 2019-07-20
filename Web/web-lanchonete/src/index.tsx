import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import "semantic-ui-css/semantic.min.css"
import './index.css';
import IndexRedux from "./Redux/IndexRedux";
import store from './Redux/Store/Index'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <IndexRedux />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
