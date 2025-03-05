export const initialAuthState = {
  user: null,
  isAuthenticated: false,
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    default:
      return state
  }
}
