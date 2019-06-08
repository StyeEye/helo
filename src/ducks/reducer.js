const types = {
    updateUser: "UPDATE_USER",
    resetUser: "RESET_USER"
};

const initialState = {
    username: "",
    profile: ""
}

function reducer(state = initialState, action) {
    console.log("Action triggered", action)
    switch(action.type) {
        case types.updateUser:
            return {
                username: action.payload.username,
                profile: action.payload.profile
            }
        case types.resetUser:
            return initialState;
        default:
            return state;
    }
}

export function updateUser(username, profile) {
    console.log("Updated")
    return {
        type: types.updateUser,
        payload: {
            username: username,
            profile: profile
        }
    }
}

export function resetBuilder() {
    return {
        type: types.resetUser
    }
}

export default reducer;