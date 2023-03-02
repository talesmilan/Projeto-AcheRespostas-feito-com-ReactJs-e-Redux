import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: ""
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addUser: (state, action) => {

            state.token = action.payload

        },
        removeUser: (state, action) => {
            state.token = ""
        }
    }
})

export const {addUser, removeUser} = loginSlice.actions

export default loginSlice.reducer