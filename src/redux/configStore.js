import {combineReducers,createStore} from "redux";
import {DanhSachSinhVienReducer} from "./reducers/DanhSachSinhVienReducer";


const rootReducer = combineReducers({
    DanhSachSinhVienReducer
})

export const store = createStore(rootReducer);