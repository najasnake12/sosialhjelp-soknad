import {
	FaktaActionTypes,
	FaktaActionTypeKeys,
	FaktumActionTypeKeys,
} from "./faktaActionTypes";
import {
	SoknadDispatch,
	SoknadAppState
} from "../reduxTypes";
import { Faktum } from "../../types";
import { fetchPost, fetchDelete } from "../../utils/rest-utils";
import { FaktumActionTypes } from "./faktaTypes";
import { oppdaterFaktumMedVerdier } from "../../utils";

export function lagreFaktum( faktum: Faktum ): FaktumActionTypes {
	return {
		type: FaktumActionTypeKeys.LAGRE_FAKTUM,
		faktum
	};
}

export function setFaktum(faktum: Faktum) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		dispatch({
			type: FaktumActionTypeKeys.OPPDATER_FAKTUM,
			faktum
		});
	};
}

export function setFaktumVerdi(
	faktum: Faktum,
	verdi: string,
	property?: string
) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		dispatch({
			type: FaktumActionTypeKeys.OPPDATER_FAKTUM,
			faktum: oppdaterFaktumMedVerdier(faktum, verdi, property)
		});
	};
}

export function setFaktumIgnorert(faktum: Faktum, ignorert: boolean) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		dispatch({
			type: FaktumActionTypeKeys.IGNORER_FAKTUM,
			faktum,
			ignorert
		});
	};
}

interface OpprettFaktumType {
	key: string;
	parrentFaktum: number;
}
export function opprettFaktum(faktum: OpprettFaktumType | Faktum) {
	return (
		dispatch: SoknadDispatch<FaktumActionTypes>,
		getState: () => SoknadAppState
	) => {
		dispatch({ type: FaktumActionTypeKeys.OPPRETT_FAKTUM });
		return fetchPost(
			"fakta?behandlingsId=" + getState().soknad.data.brukerBehandlingId,
			JSON.stringify(faktum)
		)
			.then((response: Faktum) => {
				dispatch({
					type: FaktumActionTypeKeys.OPPRETTET_FAKTUM,
					faktum: response
				});
			})
			.catch((reason: string) => {
				dispatch({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}

export function resetFakta() {
	return {
		type: FaktaActionTypeKeys.RESET_FAKTA
	};
}

export function slettFaktum(faktumId: number) {
	return (dispatch: SoknadDispatch<FaktumActionTypes>) => {
		dispatch({ type: FaktumActionTypeKeys.SLETT_FAKTUM, faktumId });
		return fetchDelete("fakta/" + faktumId)
			.then(() => dispatch({ type: FaktumActionTypeKeys.SLETTET_FAKTUM }))
			.catch((reason: string) => {
				dispatch({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}
