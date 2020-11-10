
export const SET_CITY = 'SET_CITY';
export const setCity = (name, lat, lng) => {
    return function (dispatch) {
        dispatch({
            type: SET_CITY, selectedCity: { name, lat, lng }
        })
    }
}

const initalState = {}

export default function selectedCityReducer(state = initalState, action) {
    switch (action.type) {
        case SET_CITY:
            return action.selectedCity;
        default:
            return state
    }
}