import * as React from "react";
import {digisosSkjemaConfig} from "../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import FamilieIllustrasjon from "../../nav-soknad/components/svg/illustrasjoner/FamilieIllustrasjon";
import ForsorgerPlikt from "./forsorgerplikt/ForsorgerPlikt";
import DinSivilstatus from "./sivilstatus/DinSivilstatus";
import StegMedNavigasjon from "../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";

const Familie = () => (
    <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"familiebolk"} ikon={<FamilieIllustrasjon />}>
        <div className={"space-y-20"}>
            <DinSivilstatus />
            <ForsorgerPlikt />
        </div>
    </StegMedNavigasjon>
);

export default Familie;
