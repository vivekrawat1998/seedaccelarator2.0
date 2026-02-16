import { configureStore } from "@reduxjs/toolkit";
import accelaratorReducer from "../redux/membership/Accelaratorslice"
import breederReducer from "../redux/membership/Breederslice"


export const store = configureStore({
    reducer: {
        accelartor: accelaratorReducer,
        breeder: breederReducer
    }
})