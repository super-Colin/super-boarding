import {createSlice} from '@reduxjs/toolkit';

const groupStaySlice = createSlice({
    name:"groupStays",
    initialState:{},
    reducers:{
        addGroupStay:(state, action)=>{},
        deleteGroupStay:(state, action)=>{},
        modifyGroupStay:(state, action)=>{},
    }
});

export const {
    addGroupStay,
    deleteGroupStay,
    modifyGroupStay
}

export default groupStaySlice.reducer;
