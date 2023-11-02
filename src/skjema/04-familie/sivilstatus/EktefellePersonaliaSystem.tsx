import {useTranslation} from "react-i18next";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";
import {useHentSivilstatus} from "../../../generated/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import * as React from "react";
import LocalizedDate from "../../../components/LocalizedDate";
import {FullName} from "../../01-personalia/FulltNavn";
import {LocalizedYesNo} from "./LocalizedYesNo";

export const EktefellePersonaliaSystem = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "system.familie.sivilstatus"});
    const {expectOK} = useAlgebraic(useHentSivilstatus(useBehandlingsId()));

    // FIXME: Handle the reverse case of this if clause
    return expectOK(({ektefelle, erFolkeregistrertSammen, harDiskresjonskode}) =>
        ektefelle?.navn ? (
            <>
                <SysteminfoItem label={t("label")} comment={t("system.familie.sivilstatus")} />
                <SysteminfoItem label={t(`gift.ektefelle.navn`)}>
                    <FullName name={ektefelle.navn} />
                </SysteminfoItem>
                {ektefelle?.fodselsdato && (
                    <SysteminfoItem label={t(`gift.ektefelle.fodselsdato`)}>
                        <LocalizedDate date={ektefelle.fodselsdato} />
                    </SysteminfoItem>
                )}
                <SysteminfoItem label={t(`gift.ektefelle.folkereg`)}>
                    <LocalizedYesNo value={erFolkeregistrertSammen} />
                </SysteminfoItem>
            </>
        ) : null
    );
};
