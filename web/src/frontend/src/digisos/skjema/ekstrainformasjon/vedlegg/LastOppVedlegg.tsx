import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import { lastOppVedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggActions";
import { REST_STATUS } from "../../../../nav-soknad/types";

interface Props {
	belopFaktumId: number;
	opplastingStatus?: string;
	sistEndredeFaktumId?: number;
	disabled?: boolean;
	id?: string;
}

type AllProps = Props &
	DispatchProps &
	InjectedIntlProps;

class LastOppVedlegg extends React.Component<AllProps, {}> {
	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: AllProps) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
	}

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[0], files[0].name);
		this.props.dispatch(lastOppVedlegg( this.props.belopFaktumId, formData));
		this.leggTilVedleggKnapp.value = null;
	}

	render() {
		const gjeldende = this.props.belopFaktumId === this.props.sistEndredeFaktumId;
		const visSpinner = gjeldende && this.props.opplastingStatus === REST_STATUS.PENDING;
		const id = this.props.id ? this.props.id : this.props.belopFaktumId.toString();
		return (
			<div>
				<Knapp
					id={id.replace(/\./g, "_") + "_lastopp_knapp"}
					type="standard"
					htmlType="button"
					disabled={this.props.disabled}
					spinner={visSpinner}
					onClick={() => {
						this.leggTilVedleggKnapp.click();
					}}
				>
					+ <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/>
				</Knapp>
				<input
					id={id.replace(/\./g, "_") + "_skjult_upload_input"}
					ref={c => this.leggTilVedleggKnapp = c}
					onChange={(e) => this.handleFileUpload(e.target.files)}
					type="file"
					className="visuallyhidden"
					tabIndex={-1}
					accept="image/jpeg,image/png,application/pdf"
				/>

				<div role="alert" aria-live="assertive">
					{this.props.opplastingStatus === REST_STATUS.FEILET && gjeldende && (
						<div className="skjemaelement__feilmelding">
							<FormattedMessage id="opplysninger.vedlegg.ugyldig"/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) => ({

}))(injectIntl(LastOppVedlegg));
