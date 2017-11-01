import { ValideringState } from "./valideringReducer";
import { FaktumState } from "./fakta/faktaReducer";
import { MiljovariablerApiType } from "./miljovariabler/miljovariablerTypes";
import { OppsummeringState } from "./oppsummering/oppsummeringReducer";
import { Soknad, Kvittering, Infofaktum, REST_STATUS } from "../types";
import { ApplikasjonsfeilState } from "./applikasjonsfeil/applikasjonsfeilReducer";

export * from "./fakta/faktaActionTypes";
export * from "./valideringActionTypes";

export type Dispatch = (action: any) => Promise<any>;

export type SoknadDispatch<AT> = (action: AT) => void;

export type Reducer<S, AT> = (state: S, action: AT) => S;

export interface DispatchProps {
	dispatch: Dispatch;
}

export interface SoknadAppState {
	soknad: SoknadState;
	fakta: FaktumState;
	validering: ValideringState;
	oppsummering: OppsummeringState;
	applikasjonsfeil: ApplikasjonsfeilState;
	miljovariabler: MiljovariablerApiType;
}

export interface SoknadState {
	restStatus: REST_STATUS;
	data: Soknad;
	/** Faktum som lagrer informasjon presentert på infosiden */
	infofaktum?: Infofaktum;
	kvittering?: Kvittering;
	sendSoknadPending: boolean;
	avbrytDialogSynlig: boolean;
}
