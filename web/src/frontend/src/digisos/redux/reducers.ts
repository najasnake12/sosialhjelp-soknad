import { combineReducers } from "redux";

import FaktumReducer from "../../nav-soknad/redux/faktaReducer";
import { SoknadAppState } from "../../nav-soknad/redux/reduxTypes";
import ValideringReducer from "../../nav-soknad/redux/valideringReducer";

import SoknadReducer from "./soknad/soknadReducer";
import OppsummeringReducer, {
	OppsummeringState
} from "./oppsummering/oppsummeringReducer";
import LedeteksterReducer from "./informasjon/informasjonReducer";
import SynligeFaktaReducer from "./synligefakta/synligeFaktaReducer";
import { SynligeFaktaState } from "./synligefakta/synligeFaktaTypes";
import MiljovariablerReducer from "./informasjon/miljovariablerReducer";

export interface State extends SoknadAppState {
	oppsummering: OppsummeringState;
	synligefakta: SynligeFaktaState;
}

const reducers = combineReducers({
	soknad: SoknadReducer,
	fakta: FaktumReducer,
	oppsummering: OppsummeringReducer,
	validering: ValideringReducer,
	ledetekster: LedeteksterReducer,
	synligefakta: SynligeFaktaReducer,
	ledetekster: LedeteksterReducer,
	miljovariabler: MiljovariablerReducer
});

export default reducers;
