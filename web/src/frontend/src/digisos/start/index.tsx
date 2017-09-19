import * as React from "react";
import Bosted from "./Bosted";
import "./start.css";
import { getIntlTextOrKey } from "../../nav-soknad/utils";
import { InjectedIntlProps, injectIntl } from "react-intl";

const DocumentTitle = require("react-document-title");

class Start extends React.Component<InjectedIntlProps, {}> {
	render() {
		const intl = this.props.intl;
		const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");
		return (
			<DocumentTitle title={title}>
				<div className="skjema-content">
					<p className="blokk-l">
						For at vi skal kunne sende din søknad til riktig kommune trenger vi å
						vite hvor du bor og-/eller oppholder deg nå.
					</p>
					<Bosted />
				</div>
			</DocumentTitle>
		);
	}
}

export default injectIntl(Start);