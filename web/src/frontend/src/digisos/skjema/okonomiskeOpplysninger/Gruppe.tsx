import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {connect} from "react-redux";
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import {
    OpplysningerModel,
    Opplysning, OpplysningGruppe,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {getGruppeTittelKey} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerUtils";
import OpplysningView from "./OpplysningView";
import { InjectedIntlProps} from "react-intl";
import {State} from "../../redux/reducers";

export interface OwnProps {
    key: OpplysningGruppe;
    gruppeKey: OpplysningGruppe
    gruppe: Opplysning[];
}

interface StoreToProps {
    okonomiskeOpplysninger: OpplysningerModel;
    behandlingsId: string;
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;

class GruppeView extends React.Component<Props, {}> {

    renderGruppeInnhold(gruppe: Opplysning[]) {
        const gruppeInnhold = gruppe.map((okonomiskOpplysning: Opplysning, gruppeIndex: number) => {
            return (
                <OpplysningView
                    key={gruppeIndex}
                    opplysning={okonomiskOpplysning}
                    gruppeIndex={gruppeIndex}
                />
            )
        });
        return gruppeInnhold;
    }

    render() {
        const {gruppeKey, gruppe} = this.props;
        const gruppeTittelKey = getGruppeTittelKey(gruppeKey);
        if (gruppe && gruppe.length === 0) {
            return null;
        }

        return (
            <Skjemapanel className="skjema-progresjonsblokk">
                <div className="skjema-progresjonsblokk__head">
                    <h3><FormattedHTMLMessage id={gruppeTittelKey + ".sporsmal"}/></h3>
                </div>
                {this.renderGruppeInnhold(gruppe)}
            </Skjemapanel>
        );
    }
}

export default connect(
    (state: State) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId,
        };
    }
)(injectIntl(GruppeView));

