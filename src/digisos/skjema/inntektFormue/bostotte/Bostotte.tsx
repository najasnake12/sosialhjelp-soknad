import * as React from "react";
import { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, IntlProps} from "../../../../nav-soknad/utils";
import { FormattedHTMLMessage, injectIntl } from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../redux/soknadsdata/soknadsdataReducer";
import { Bostotte } from "./bostotteTypes";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";

const FAKTUM_BOSTOTTE = "inntekt.bostotte";

type Props = SoknadsdataContainerProps & IntlProps;

interface State {
	oppstartsModus: boolean
}

class BostotteView extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		}
	}

	componentDidMount() {
		const {hentSoknadsdata, behandlingsId} = this.props;
		if (behandlingsId){
			hentSoknadsdata(behandlingsId, SoknadsSti.BOSTOTTE);
		}
	}

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
		if (this.state.oppstartsModus) {
			if (this.props.soknadsdata.restStatus.inntekt.bostotte === REST_STATUS.OK) {
				this.setState({oppstartsModus: false});
			}
		}
	}

	handleClickJaNeiSpsm(verdi: boolean) {
		const {behandlingsId, soknadsdata} = this.props;
		const restStatus = soknadsdata.restStatus.inntekt.bostotte;
		if(restStatus === REST_STATUS.OK && behandlingsId) {
			const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
			if(bostotte){
				bostotte.bekreftelse = verdi;
				this.props.oppdaterSoknadsdataSti(SoknadsSti.BOSTOTTE, bostotte);
				this.props.lagreSoknadsdata(behandlingsId, SoknadsSti.BOSTOTTE, bostotte);
			}
		}
	}

	render() {
		const {soknadsdata} = this.props;
		const bostotte: Bostotte | undefined = soknadsdata.inntekt.bostotte;
		const restStatus = soknadsdata.restStatus.inntekt.bostotte;
		let oppstartsModus = this.state.oppstartsModus;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		return (
			<div className="skjema-sporsmal">
				<JaNeiSporsmal
					visPlaceholder={oppstartsModus}
					tekster={getFaktumSporsmalTekst(this.props.intl, FAKTUM_BOSTOTTE)}
					faktumKey={FAKTUM_BOSTOTTE}
					verdi={bostotte ? bostotte.bekreftelse : null}
					onChange={(verdi: boolean) => this.handleClickJaNeiSpsm(verdi)}
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				/>
				<Informasjonspanel
					synlig={bostotte && bostotte.bekreftelse === false}
					ikon={InformasjonspanelIkon.ELLA}
					farge={DigisosFarge.VIKTIG}
				>
					<FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
				</Informasjonspanel>
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(BostotteView));
