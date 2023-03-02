import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    message: ""
}

const messageSuccessSlice = createSlice({
    name: 'messageSuccess',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.message = action.payload

        }
    }
})

export const {addMessage} = messageSuccessSlice.actions

export default messageSuccessSlice.reducer