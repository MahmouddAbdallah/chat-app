import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: {}
}
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfo(state, action) {
            state.user = action.payload
        }
        // addNotifications: (state, { payload }) => { },
        // resetNotifications: (state, { payload }) => { },
    }
});
export const { addNotifications, resetNotifications, userInfo } = user.actions
export default user.reducer