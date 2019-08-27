import {SagaIterator} from "redux-saga";
import {call, put, takeEvery, select} from "redux-saga/effects";
import {
    fetchDelete,
    fetchKvittering,
    fetchPost, fetchToJson, HttpStatus,
    lastNedForsendelseSomZipFilHvisMockMiljoEllerDev
} from "../../utils/rest-utils";
import {
    FinnOgOppdaterSoknadsmottakerStatus,
    HentKvitteringAction, HentSoknadAction,
    SendSoknadAction,
    SlettSoknadAction,
    SoknadActionTypeKeys, StartSoknadAction
} from "./soknadActionTypes";
import {
    navigerTilDittNav,
    navigerTilKvittering,
    navigerTilServerfeil,
    tilStart,
    tilSteg
} from "../navigasjon/navigasjonActions";

import {
    hentKvitteringOk, hentSoknadOk, oppdaterSoknadsmottakerStatus,
    opprettSoknadOk,
    resetSoknad,
    sendSoknadOk, setErSystemdataEndret,
    slettSoknadOk,
    startSoknadOk
} from "./soknadActions";
import {loggAdvarsel, loggFeil, loggInfo} from "../navlogger/navloggerActions";
import {NavEnhet} from "../../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {SoknadsSti} from "../soknadsdata/soknadsdataReducer";
import {push} from "connected-react-router";
import {selectBrukerBehandlingId} from "../selectors";

export interface OpprettSoknadResponse {
    brukerBehandlingId: string;
}

function* opprettSoknadSaga() {
    try {
        yield put(resetSoknad());

        const response: OpprettSoknadResponse = yield call(
            fetchPost,
            "soknader/opprettSoknad", ""
        );
        yield put(opprettSoknadOk(response.brukerBehandlingId));
        yield put(startSoknadOk()); // TODO Rename metode navn
        yield put(tilSteg(1));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("opprettSoknadSaga: " + reason));
        } else {
            yield put(loggFeil("opprett soknad saga feilet: " + reason));
            yield put(navigerTilServerfeil());
        }
    }
}

function* hentSoknadSaga(action: HentSoknadAction) {
    try {
        const xsrfCookieIsOk: boolean = yield call(
            fetchToJson,
            `soknader/${action.brukerBehandlingId}/xsrfCookie`
        );
        yield put(hentSoknadOk(xsrfCookieIsOk, action.brukerBehandlingId));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("hentSoknadsdata: " + reason));
        } else {
            yield put(loggFeil("hent soknad saga feilet: " + reason));
            yield put(navigerTilServerfeil());
        }
    }
}

function* startSoknadSaga(action: StartSoknadAction): SagaIterator {
    try {
        yield put(startSoknadOk());
        yield put(tilSteg(1));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("startSoknadSaga: " + reason));
        } else {
            yield put(loggFeil("start soknad saga feilet: " + reason));
            yield put(navigerTilServerfeil());
        }
    }
}

function* slettSoknadSaga(action: SlettSoknadAction): SagaIterator {
    try {
        yield call(fetchDelete, "soknader/" + action.brukerBehandlingId);
        yield put(slettSoknadOk());
        if (action.destinasjon === "START") {
            yield put(tilStart());
        } else {
            yield put(navigerTilDittNav());
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("slettSoknadSaga: " + reason));
        } else {
            yield put(loggFeil("slett soknad saga feilet: " + reason));
            yield put(navigerTilServerfeil());
        }
    }
}

function* sendSoknadSaga(action: SendSoknadAction): SagaIterator {
    try {
        yield call(
            fetchPost,
            `soknader/${action.brukerBehandlingId}/actions/send`,
            JSON.stringify({behandlingsId: action.brukerBehandlingId})
        );
        lastNedForsendelseSomZipFilHvisMockMiljoEllerDev(action.brukerBehandlingId);
        yield put(sendSoknadOk(action.brukerBehandlingId));
        yield put(navigerTilKvittering(action.brukerBehandlingId));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("sendSoknadSaga: " + reason));
        } else {
            yield put(loggFeil("send soknad saga feilet: " + reason));
            yield put(navigerTilServerfeil());
        }
    }
}

function* hentKvitteringSaga(action: HentKvitteringAction) {
    try {
        const kvittering = yield call(
            fetchKvittering,
            "soknader/" + action.brukerBehandlingId + "?sprak=nb_NO"
        );
        yield put(hentKvitteringOk(kvittering));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("hentKvitteringSaga: " + reason));
        } else {
            yield put(loggFeil("hent kvittering saga feilet: " + reason));
            yield put(navigerTilServerfeil());
        }
    }
}

function* finnOgOppdaterSoknadsmottakerStatusSaga(action: FinnOgOppdaterSoknadsmottakerStatus) {
    const {brukerbehandlingId} = action;

    try {
        const navenheter: NavEnhet[] = yield call(fetchToJson, `soknader/${brukerbehandlingId}/${SoknadsSti.NAV_ENHETER}`);
        const valgtSoknadsmottaker: NavEnhet | undefined = navenheter.find((n: NavEnhet) => n.valgt);
        if (!valgtSoknadsmottaker) {
            yield put(push(`/skjema/${brukerbehandlingId}/1`));
        } else {
            yield put(oppdaterSoknadsmottakerStatus(valgtSoknadsmottaker));
        }
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("finnOgOppdaterSoknadsmottakerStatusSaga: " + reason));
        } else {
            yield call(loggFeil, "feil i finnOgOppdaterSoknadsmottakerStatusSaga på side 9. Sender brukeren tilbake til steg 1 og håper dette i blir en infinite loop. Error message: " + reason);
            yield put(push(`/skjema/${brukerbehandlingId}/2`));
        }
    }
}

function* getErSystemdataEndretSaga() {
    try {
        const behandlingsID = yield select(selectBrukerBehandlingId);
        const urlPath = `soknader/${behandlingsID}/erSystemdataEndret`;
        const response = yield fetchToJson(urlPath);
        if (response) {
            yield put(loggInfo("Systemdata var endret for brukeren."));
        }
        yield put(setErSystemdataEndret(response));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED){
            yield put(loggAdvarsel("getErSystemdataEndretSaga: " + reason));
        } else {
            yield put(setErSystemdataEndret(false));
            yield put(loggFeil("getErSystemdataEndretSaga feilet: " + reason));
        }
    }
}

export {
    opprettSoknadSaga,
    startSoknadSaga,
    sendSoknadSaga,
    hentKvitteringSaga,
    slettSoknadSaga
};

function* soknadSaga(): SagaIterator {
    yield takeEvery(SoknadActionTypeKeys.START_SOKNAD, startSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.OPPRETT_SOKNAD, opprettSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.HENT_SOKNAD, hentSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.SLETT_SOKNAD, slettSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.SEND_SOKNAD, sendSoknadSaga);
    yield takeEvery(SoknadActionTypeKeys.HENT_KVITTERING, hentKvitteringSaga);
    yield takeEvery(SoknadActionTypeKeys.FINN_OG_OPPDATER_SOKNADSMOTTAKER_STATUS, finnOgOppdaterSoknadsmottakerStatusSaga);
    yield takeEvery(SoknadActionTypeKeys.GET_ER_SYSTEMDATA_ENDRET, getErSystemdataEndretSaga);
}

export default soknadSaga;
