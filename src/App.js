import './App.scss';
import {Routers} from "./Pages";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routers/>
            </BrowserRouter>
        </Provider>

    );
}

export default App;
