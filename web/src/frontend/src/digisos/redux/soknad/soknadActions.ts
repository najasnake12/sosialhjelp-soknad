import { fetchDelete, fetchPost, fetchToJson } from "../../../nav-soknad/utils/rest-utils";
import {
	resetFakta, lagreFaktum
} from "../../../nav-soknad/redux/faktaActions";
import { updateFaktaMedLagretVerdi } from "../../../nav-soknad/redux/faktaUtils";
import { finnFaktum } from "../../../nav-soknad/utils";
import {
	FaktaActionTypeKeys,
	FaktaActionTypes,
	SoknadDispatch
} from "../../../nav-soknad/redux/reduxTypes";
import { Soknad, Faktum } from "../../../nav-soknad/types";

import { State } from "../reducers";
import {
	AvbrytSoknadAction,
	FortsettSoknadAction,
	HentetSoknadAction,
	HentSoknadAction,
	OpprettetSoknadAction,
	OpprettSoknadAction,
	ResetSoknadAction,
	SetServerFeilAction,
	SoknadActionTypeKeys
} from "./soknadTypes";
import { oppdaterFaktumMedVerdier } from "../../../nav-soknad/utils/faktumUtils";

export type SoknadActionTypes =
	| OpprettSoknadAction
	| OpprettetSoknadAction
	| HentSoknadAction
	| HentetSoknadAction
	| SetServerFeilAction
	| ResetSoknadAction
	| AvbrytSoknadAction
	| FortsettSoknadAction;

export function opprettSoknad(kommuneId: string, bydelId: string) {
	return (
		dispatch: SoknadDispatch<SoknadActionTypes | FaktaActionTypes>,
		getState: () => State
	) => {
		dispatch({ type: SoknadActionTypeKeys.OPPRETT_SOKNAD });
		const payload = JSON.stringify({ soknadType: "NAV DIGISOS" });
		fetchPost("soknader", payload)
			.then((response: { brukerBehandlingId: string }) => {
				dispatch({
					type: SoknadActionTypeKeys.OPPRETTET_SOKNAD,
					brukerBehandlingId: response.brukerBehandlingId
				});
				const brukerBehandlingId = getState().soknad.data.brukerBehandlingId;

				hentSoknad(brukerBehandlingId)(dispatch).then(() => {
					const fakta = getState().fakta.data;
					setBostedFaktum(
						finnFaktum("personalia.kommune", fakta),
						kommuneId,
						dispatch
					);
					if (bydelId !== "") {
						setBostedFaktum(
							finnFaktum("personalia.bydel", fakta),
							bydelId,
							dispatch
						);
					}
				});
			})
			.catch(reason => {
				dispatch({
					type: SoknadActionTypeKeys.SET_SERVER_FEIL,
					feilmelding: reason
				});
			});
	};
}

const setBostedFaktum = (faktum: Faktum, verdi: string, dispatch: any) => {
	lagreFaktum(oppdaterFaktumMedVerdier(faktum, verdi), dispatch);
};

export function hentSoknad(brukerBehandlingsId: string) {
	return (dispatch: SoknadDispatch<SoknadActionTypes | FaktaActionTypes>) => {
		dispatch({ type: SoknadActionTypeKeys.HENT_SOKNAD });
		return fetchToJson("soknader/" + brukerBehandlingsId)
			.then((soknadsdata: Soknad) => {
				const fakta = updateFaktaMedLagretVerdi(soknadsdata.fakta);
				dispatch({ type: FaktaActionTypeKeys.SET_FAKTA, fakta });
				dispatch({
					type: SoknadActionTypeKeys.HENTET_SOKNAD,
					data: soknadsdata
				});
			})
			.catch(reason => {
				dispatch({
					type: SoknadActionTypeKeys.SET_SERVER_FEIL,
					feilmelding: reason
				});
			});
	};
}

export function resetSoknad() {
	return (dispatch: SoknadDispatch<any>) => {
		dispatch({ type: SoknadActionTypeKeys.RESET_SOKNAD });
		dispatch(resetFakta());
	};
}

export function avbrytSoknad() {
	return (dispatch: SoknadDispatch<any>) => {
		dispatch({ type: SoknadActionTypeKeys.AVBRYT_SOKNAD });
	};
}

export function fortsettSoknad() {
	return (dispatch: SoknadDispatch<any>) => {
		dispatch({ type: SoknadActionTypeKeys.FORTSETT_SOKNAD });
	};
}

export function slettSoknad(brukerBehandlingsId: string) {
	return (dispatch: SoknadDispatch<any>) => {
		return fetchDelete("soknader/" + brukerBehandlingsId).then(() => {
			//
		})
		.catch(reason => {
			dispatch({
				type: SoknadActionTypeKeys.SET_SERVER_FEIL,
				feilmelding: reason
			});
		});
	};
}
