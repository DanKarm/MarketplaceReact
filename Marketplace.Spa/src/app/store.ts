import {configureStore, createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState:{
        value:0,
    },
    reducers: {
        increment: (state) => {
            state.value ++;
        },
        decrement: (state) => {
            state.value --;
        }
    }
});

export const {increment, decrement} = counterSlice.actions;
export const store = configureStore({
    reducer: counterSlice.reducer,
    devTools: true,
});

store.subscribe(() => {console.log(store.getState())});
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());