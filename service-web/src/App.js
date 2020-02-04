import {Provider} from 'react-redux';
import {store, persistor} from './app/store';
import {PersistGate} from 'redux-persist/integration/react'
import React, {Component} from 'react';
import './App.css';
import './styles/app.css';
import './styles/fonts.css';
import './styles/animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from './app/routes';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
