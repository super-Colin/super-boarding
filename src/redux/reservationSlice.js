import {createSlice} from '@reduxjs/toolkit';

const reservationSlice = createSlice({
    name:"reservations",
    initialState:{},
    reducers:{
        addReservation:(state, action)=>{},
        deleteReservation:(state, action)=>{},
        modifyReservation:(state, action)=>{},
    }
});

export const {
    addReservation,
    deleteReservation,
    modifyReservation
} = reservationSlice.actions;

export default reservationSlice.reducers

