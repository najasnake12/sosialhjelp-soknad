import * as React from 'react';
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, IntlProps} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Barneutgifter, BarneutgifterKeys} from "./BarneutgifterTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";

const BarneutgifterKey = "utgifter.barn";

type Props = SoknadsdataContainerProps & IntlProps;

export class BarneutgifterView extends React.Component<Props, {}> {

    componentDidMount(): void {
        const {behandlingsId} = this.props;
        if (behandlingsId){
            this.props.hentSoknadsdata(behandlingsId, SoknadsSti.BARNEUTGIFTER);
        }
    }

    handleClickJaNeiSpsm(verdi: boolean) {
        const {behandlingsId, soknadsdata} = this.props;
        if (behandlingsId){
            const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
            barneutgifter.bekreftelse = verdi;
            if (!verdi) {
                barneutgifter.fritidsaktiviteter = false;
                barneutgifter.barnehage = false;
                barneutgifter.sfo = false;
                barneutgifter.tannregulering = false;
                barneutgifter.annet = false;
            }
            this.props.oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter);
            this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BARNEUTGIFTER, barneutgifter);
        }
    }

    handleClickRadio(idToToggle: BarneutgifterKeys) {
        const {behandlingsId, soknadsdata} = this.props;
        if (behandlingsId){
            const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
            barneutgifter[idToToggle] = !barneutgifter[idToToggle];
            this.props.oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter);
            this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BARNEUTGIFTER, barneutgifter);
        }
    }

    renderCheckBox(navn: BarneutgifterKeys, textKey: string) {
        const {soknadsdata} = this.props;
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;

        const barneutgifterElement: boolean | null = barneutgifter[navn];
        const isChecked: boolean = barneutgifterElement ? barneutgifterElement : false;

        return (
            <CheckboxPanel
                id={"barneutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={isChecked}
                label={<FormattedHTMLMessage id={BarneutgifterKey + ".true.utgifter." + textKey}/>}
                onClick={() => this.handleClickRadio(navn)}
            />
        )
    }

    render() {
        const {soknadsdata, intl} = this.props;
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
        return (
            <JaNeiSporsmal
                tekster={getFaktumSporsmalTekst(intl, BarneutgifterKey)}
                visible={barneutgifter.harForsorgerplikt}
                faktumKey={BarneutgifterKey}
                verdi={barneutgifter.bekreftelse}
                onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(intl, BarneutgifterKey + ".true.utgifter")}
                >
                    {this.renderCheckBox(BarneutgifterKeys.FRITIDSAKTIVITETER, BarneutgifterKeys.FRITIDSAKTIVITETER)}
                    {this.renderCheckBox(BarneutgifterKeys.BARNEHAGE, BarneutgifterKeys.BARNEHAGE)}
                    {this.renderCheckBox(BarneutgifterKeys.SFO, BarneutgifterKeys.SFO)}
                    {this.renderCheckBox(BarneutgifterKeys.TANNREGULERING, BarneutgifterKeys.TANNREGULERING)}
                    {this.renderCheckBox(BarneutgifterKeys.ANNET, BarneutgifterKeys.ANNET)}
                </Sporsmal>
            </JaNeiSporsmal>
        )
    }
}


export default connectSoknadsdataContainer(injectIntl(BarneutgifterView));
