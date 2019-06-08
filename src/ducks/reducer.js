const types = {
    updateUser: "UPDATE_USER"
};

const initialState = {
    username: "",
    userid: 0,
    profile: ""
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case types.updateUser:
            return {
                username: action.payload.username,
                userid: action.payload.userid,
                profile: action.payload.profile
            }
        default:
            return state;
    }
}

export function updateUser(userid, username, profile) {
    return {
        type: types.updateUser,
        payload: {
            userid: userid,
            username: username,
            profile: profile
        }
    }
}

export default reducer;