import { SoknadState } from "./reduxTypes";
import { FaktumState } from "./fakta/faktaReducer";
import { SynligeFaktaState } from "../../digisos/redux/synligefakta/synligeFaktaTypes";

function selectBrukerBehandlingId(state: { soknad: SoknadState }) {
	return state.soknad.data.brukerBehandlingId;
}

const selectProgresjonFaktum = (state: { fakta: FaktumState }) => {
	return state.fakta.data.filter(f => f.key === "progresjon")[ 0 ];
};

const selectSynligFaktaData = (state: { synligefakta: SynligeFaktaState }) => state.synligefakta.data;

export {
	selectBrukerBehandlingId,
	selectSynligFaktaData,
	selectProgresjonFaktum
};