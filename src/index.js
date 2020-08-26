import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import 'bootstrap/dist/css/bootstrap.css';
import MoviesServices from './services/services';
import {Provider} from 'react-redux';
import MoviesServicesContext from './components/moviesContext/moviesContext';
import store from './store';
import ErrorBoundry from './components/errorComponent/errorComponent';

const moviesServices = new MoviesServices();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundry>
				<MoviesServicesContext.Provider value={moviesServices}>
					<App/>
				</MoviesServicesContext.Provider>
			</ErrorBoundry>
		</Provider>
	</React.StrictMode>,
  document.getElementById('root')
);


