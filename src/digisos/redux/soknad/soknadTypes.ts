import {ErSystemdataEndret, Samtykke} from "./soknadActionTypes";
import {NavEnhet} from "../../skjema/personopplysninger/adresse/AdresseTypes";
import {SoknadSendtTil} from "../../../lib/sendSoknad";

export interface SoknadState {
    // Visning state
    showSideIkkeFunnet: boolean;
    visSamtykkeInfo: boolean;
    visLasteOppVedleggModal: boolean;
    visMidlertidigDeaktivertPanel: boolean;
    visIkkePakobletPanel: boolean;
    visNedetidPanel: boolean;

    // Visning state skjema nivå
    showSendingFeiletPanel: boolean;
    showServerFeil: boolean;
    sendSoknadServiceUnavailable: boolean;

    // Authentication / tilgang state
    harTilgang: boolean;
    sperrekode: TilgangSperrekode | undefined;

    // Rest state
    restStatus: REST_STATUS;

    // Tilgang og fornavn
    tilgang: undefined | TilgangResponse;
    fornavn: undefined | string;

    // Opprettelse, innsending og ettersendelse
    startSoknadPending: boolean;
    startSoknadFeilet: boolean;
    sendSoknadPending: boolean;

    // Avbryt state
    visAvbrytOgSlettModal: boolean;

    // Soknad state
    behandlingsId: string | undefined;
    valgtSoknadsmottaker: NavEnhet | undefined;

    // Systemdata state
    erSystemdataEndret: ErSystemdataEndret;

    // Samtykke
    samtykker: Samtykke[] | undefined;
    samtykkeRestStatus: REST_STATUS;

    // Nedetid state
    nedetid: undefined | NedetidResponse;

    // HarNyligInnsendteSoknader state
    harNyligInnsendteSoknader: undefined | HarNyligInnsendteSoknaderResponse;

    pabegynteSoknader: PabegynteSoknaderResponse[];
}

export enum REST_STATUS {
    INITIALISERT = "INITIALISERT",
    PENDING = "PENDING",
    OK = "OK",
    REDIRECT = "REDIRECT",
    CLIENT_ERROR = "CLIENT_ERROR",
    SERVER_ERROR = "SERVER_ERROR",
    XSRF = "XSRF",
    LAST_OPP_FIL_FEILET = "LAST_OPP_FIL_FEILET",
    FEILET = "FEILET",
}

export enum REST_FEIL {
    FOR_STOR_FIL = "vedlegg.opplasting.feil.forStor",
    SAMLET_VEDLEGG_STORRELSE_FOR_STOR = "vedlegg.opplasting.feil.samletStorrelseForStor",
    SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE = "ettersending.vedlegg.feil.samletStorrelseForStor",
    FEIL_FILTPYE = "vedlegg.opplasting.feil.filType",
    KRYPTERT_FIL = "opplasting.feilmelding.pdf.kryptert",
    SIGNERT_FIL = "opplasting.feilmelding.pdf.signert",
}

export interface OpprettSoknadResponse {
    brukerBehandlingId: string;
}

export interface SendSoknadResponse {
    sendtTil: SoknadSendtTil;
    id: string;
}

export interface TilgangResponse {
    harTilgang: boolean;
    sperrekode: TilgangSperrekode;
}

export type LedeteksterResponse = {};

export interface FornavnResponse {
    fornavn: string;
}

export type TilgangSperrekode = "pilot" | "bruker";

export interface NedetidResponse {
    isNedetid: boolean;
    isPlanlagtNedetid: boolean;
    nedetidStart: string;
    nedetidSlutt: string;
    nedetidStartText: string;
    nedetidSluttText: string;
}

export interface HarNyligInnsendteSoknaderResponse {
    antallNyligInnsendte: number;
}

export interface PabegynteSoknaderResponse {
    behandlingsId: string;
    sistOppdatert: string;
}
