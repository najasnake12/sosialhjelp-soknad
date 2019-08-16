import * as React from 'react';
import {Opplysning} from "../../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {
    getSpcForOpplysning
} from "../../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerUtils";
import {getIntlTextOrKey} from "../../../../nav-soknad/utils";
import {InjectedIntlProps, injectIntl} from "react-intl";
import {getContextPathForStaticContent} from "../../../../configuration";

interface OwnProps {
    opplysning: Opplysning
}

type Props = OwnProps & InjectedIntlProps;

const VedleggSlettet: React.FC<Props> = (props: Props) => {

    const opplysningSpc = getSpcForOpplysning(props.opplysning.type);
    const textKeyBase = opplysningSpc ? opplysningSpc.textKey : "";
    const textKey = textKeyBase + ".slettet";
    const intlTextOrKey = getIntlTextOrKey(props.intl, textKey);

    return (
        <div className="vedlegg_slettet_wrapper">
            <div className="vedlegg_slettet_boks">
                <div className="vedlegg_slettet_ikon">
                    <div className="vedlegg_slettet_border">
                        <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_reportProblemCircle.svg`} alt=""/>
                    </div>
                </div>
                <div className="vedlegg_slettet_tekst">
                    {intlTextOrKey}
                </div>
            </div>
        </div>
    );
};

export default injectIntl(VedleggSlettet);