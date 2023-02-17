import * as React from "react";
import {getIntlTextOrKey} from "../../utils";
import {Button, Loader} from "@navikt/ds-react";
import {useDispatch, useSelector} from "react-redux";
import {AvbrytSoknadModal, minSideUrl} from "../avbrytsoknad/AvbrytSoknadModal";
import {useTranslation} from "react-i18next";
import {SkjemaConfig, SkjemaSteg} from "./digisosSkjema";
import {setVisBekreftMangler} from "../../../digisos/redux/oppsummering/oppsummeringActions";
import {createSkjemaEventData, logAmplitudeEvent} from "../../utils/amplitude";
import {sendSoknad} from "../../../lib/sendSoknad";
import {State} from "../../../digisos/redux/reducers";
import {logInfo} from "../../utils/loggerUtils";
import {useBehandlingsId} from "../../hooks/useBehandlingsId";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {useState} from "react";

interface SkjemaStegNavigasjonProps {
    skjemaConfig: SkjemaConfig;
    steg: SkjemaSteg;
    loading?: boolean;
    gaVidereLabel?: string;
    goToStep: (newStep: number) => void;
}

export const SkjemaStegNavKnapperLegacy = ({steg, loading, goToStep}: SkjemaStegNavigasjonProps) => {
    const [avbrytModalOpen, setAvbrytModalOpen] = useState<boolean>(false);
    const [sendSoknadPending, setSendSoknadPending] = useState<boolean>(false);

    const {oppsummering} = useSelector((state: State) => state);
    const behandlingsId = useBehandlingsId();
    const adresseValg = useHentAdresser(behandlingsId).data?.valg;
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const forwardInhibited = loading;
    const backwardInhibited = loading || steg.id <= 1;

    const getAttributesForSkjemaFullfortEvent = () => {
        const attr: Record<string, any> = {};

        oppsummering.nyOppsummering.forEach((steg) =>
            steg.avsnitt.forEach((avsnitt) =>
                avsnitt.sporsmal.forEach(({tittel, felt}) => {
                    if (tittel === "bosituasjon.sporsmal") attr["valgtBosted"] = !!felt?.length;
                    if (tittel === "arbeidsforhold.infotekst") attr["harArbeidsforhold"] = !!felt?.length;
                    if (tittel === "utbetalinger.inntekt.skattbar.har_gitt_samtykke") attr["skattSamtykke"] = true;
                    if (tittel === "utbetalinger.inntekt.skattbar.mangler_samtykke") attr["skattSamtykke"] = false;
                })
            )
        );

        return attr;
    };

    const sendInnSoknad = () => {
        if (!oppsummering.bekreftet) {
            dispatch(setVisBekreftMangler(true));
        } else {
            logAmplitudeEvent("skjema fullført", createSkjemaEventData(getAttributesForSkjemaFullfortEvent()));
            if (adresseValg) logInfo("klikk--" + adresseValg);
            setSendSoknadPending(true);
            sendSoknad(behandlingsId, dispatch).then((nextPage) => {
                if (nextPage) window.location.href = nextPage;
            });
        }
    };

    return (
        <>
            <AvbrytSoknadModal open={avbrytModalOpen} onClose={() => setAvbrytModalOpen(false)} />
            <div className={"space-y-8 lg:space-y-16 pt-2 md:pt-5 lg:pt-10 pb-8 lg:pb-16"}>
                <div className="space-x-3">
                    <Button
                        variant="secondary"
                        id="gaa_tilbake_button"
                        onClick={() => goToStep(steg.id - 1)}
                        disabled={backwardInhibited}
                    >
                        {getIntlTextOrKey(t, "skjema.knapper.forrige")}
                        {loading && <Loader />}
                    </Button>
                    {steg.type === "skjema" ? (
                        <Button
                            variant="primary"
                            id="gaa_videre_button"
                            onClick={() => goToStep(steg.id + 1)}
                            disabled={forwardInhibited}
                        >
                            {t("skjema.knapper.neste")}
                            {loading && <Loader />}
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            id="send_button"
                            onClick={sendInnSoknad}
                            disabled={sendSoknadPending || forwardInhibited}
                        >
                            {t("skjema.knapper.send")}
                            {sendSoknadPending && <Loader />}
                        </Button>
                    )}
                </div>
                <div>
                    <Button variant="tertiary" onClick={() => (window.location.href = minSideUrl)}>
                        {t("avbryt.fortsettsenere")}
                    </Button>
                    <Button variant="tertiary" onClick={() => setAvbrytModalOpen(true)}>
                        {t("avbryt.slett")}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SkjemaStegNavKnapperLegacy;