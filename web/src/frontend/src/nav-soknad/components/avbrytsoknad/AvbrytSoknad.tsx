import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import Icon from "nav-frontend-ikoner-assets";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { fortsettSoknad, slettSoknad } from "../../redux/soknad/soknadActions";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../redux/reduxTypes";
import { AVBRYT_DESTINASJON } from "../../redux/soknad/soknadActionTypes";

interface StateProps {
	avbrytDialogSynlig: boolean;
	destinasjon: AVBRYT_DESTINASJON;
	brukerBehandlingId: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

const TEKSTNOKLER_VANLIG = {
	overskrift: "avbryt.overskrift",
	tekst: "avbryt.tekst",
	bekreft: "avbryt.uthevet.tekst"
};

const TEKSTNOKLER_NAVIGASJON = {
	overskrift: "avbryt.navigasjon.overskrift",
	tekst: "avbryt.navigasjon.tekst",
	bekreft: "avbryt.navigasjon.uthevet.tekst"
};

class AvbrytSoknad extends React.Component<Props, {}> {
	onAvbryt() {
		this.props.dispatch(
			slettSoknad(this.props.brukerBehandlingId, this.props.destinasjon)
		);
	}

	onFortsett() {
		this.props.dispatch(fortsettSoknad());
	}

	render() {
		const tekst = {
			...this.props.destinasjon === "MINSIDE"
				? TEKSTNOKLER_VANLIG
				: TEKSTNOKLER_NAVIGASJON
		};

		return (
			<NavFrontendModal
				isOpen={this.props.avbrytDialogSynlig || false}
				contentLabel={this.props.intl.formatMessage({ id: "avbryt.avbryt" })}
				closeButton={false}
				onRequestClose={() => null}
			>
				<div className="avbrytmodal">
					<div className="avbrytmodal__infoikon_wrapper">
						<Icon kind="info-sirkel-orange" />
					</div>
					<div className="avbrytmodal__infoikon_wrapper">
						<div className="avbrytmodal__infoikon" />
					</div>
					<Innholdstittel className="blokk-s avbrytmodal__overskrift">
						<FormattedMessage id={tekst.overskrift} />
					</Innholdstittel>
					<div className="avbrytmodal__understrek_wrapper">
						<div className="avbrytmodal__understrek" />
					</div>
					<Normaltekst className="blokk-xxs avbrytmodal__tekst">
						<FormattedMessage id={tekst.tekst} />
					</Normaltekst>
					<Normaltekst className="blokk-xxs avbrytmodal__uthevet_tekst">
						<FormattedMessage id={tekst.bekreft} />
					</Normaltekst>
					<div className="timeoutbox__knapperad">
						<Hovedknapp onClick={() => this.onAvbryt()}>
							<FormattedMessage id={"avbryt.ja"} />
						</Hovedknapp>
						<Knapp
							type="standard"
							onClick={() => this.onFortsett()}
							className="avbrytmodal__neiknapp"
						>
							<FormattedMessage id={"avbryt.nei"} />
						</Knapp>
					</div>
				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: SoknadAppState, props: any): StateProps => {
	return {
		avbrytDialogSynlig: state.soknad.avbrytDialog.synlig,
		destinasjon: state.soknad.avbrytDialog.destinasjon,
		brukerBehandlingId: state.soknad.data.brukerBehandlingId
	};
})(injectIntl(AvbrytSoknad));
