import { userReducer } from "@redux/reducers";
import { combineReducers, legacy_createStore as createStore } from "redux";


const rootReducer = combineReducers({
    userReducer
})

const configureStore: any = () => {
    return createStore(rootReducer)
}

export default configureStore

export type State = ReturnType<typeof rootReducer>