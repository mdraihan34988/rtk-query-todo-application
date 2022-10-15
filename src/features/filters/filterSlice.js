const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    status : 'All',
    colors : []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        chengestatus: (state, action) => {
            state.status = action.payload;
        },
        changecolor: (state, action) => {
            const {type,color} = action.payload;

           if(type === "add") {
                state.colors.push(color);
           } else if(type === "remove") {
                state.colors = state.colors.filter(existingColor => existingColor !== color)
           }
        },
    },
});

export default filterSlice.reducer;
export const { changecolor, chengestatus } = filterSlice.actions;