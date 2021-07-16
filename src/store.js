import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


//El compose esta asi para que no explote la app al no tener REDUX DEV TOOLS
const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;