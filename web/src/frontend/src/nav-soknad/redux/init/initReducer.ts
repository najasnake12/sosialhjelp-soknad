import { InitActionTypeKeys, InitActionTypes, InitState } from "./initTypes";

const { OK, START, FEILET } = InitActionTypeKeys;
import { REST_STATUS } from "../../types";

const initialState: InitState = {
	restStatus: REST_STATUS.INITIALISERT,
	visSamtykkeInfo: false
};

export default (state: InitState = initialState, action: InitActionTypes) => {
	switch (action.type) {
		case OK: {
			return {...state, restStatus: REST_STATUS.OK };
		}
		case START:
			return {...state, restStatus: REST_STATUS.PENDING };
		case FEILET:
			return {...state, restStatus: REST_STATUS.FEILET };
		case InitActionTypeKeys.SET_VIS_SAMTYKKE_INFO:
			return {
				...state,
				visSamtykkeInfo: action.visSamtykkeInfo,
			};
		default:
			return state;
	}
};
