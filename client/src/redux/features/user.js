import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: {}
}
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addNotifications: (state, { payload }) => { },
        resetNotifications: (state, { payload }) => { },
    }
});
export const { addNotifications, resetNotifications } = user.actions
export default user.reducer