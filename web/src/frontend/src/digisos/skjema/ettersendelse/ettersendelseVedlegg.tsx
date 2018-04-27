import * as React from "react";
import {
	lastOppEttersendelseVedlegg,
	slettEttersendtVedlegg
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import { downloadAttachedFile } from "../../../nav-soknad/utils/rest-utils";
import { REST_STATUS } from "../../../nav-soknad/types";
import { MargIkoner } from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";

interface OwnProps {
	children: React.ReactNode;
	vedlegg?: any;
	restStatus?: string;
}

interface OwnState {
	filnavn: string;
}
export type Props = OwnProps & DispatchProps;

class EttersendelseVedlegg extends React.Component<Props, OwnState> {

	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.state = {
			filnavn: null
		};
	}

	removeFile(filId: string, vedleggId: string) {
		this.props.dispatch(slettEttersendtVedlegg(vedleggId, filId));
	}

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[ 0 ], files[ 0 ].name);
		this.setState({filnavn: files[ 0 ].name});
		const vedleggId = this.props.vedlegg.vedleggId;
		this.props.dispatch(lastOppEttersendelseVedlegg(vedleggId, formData));
		this.leggTilVedleggKnapp.value = "";
	}

	render() {
		return (
			<span>
				<AvsnittMedMarger
					hoyreIkon={MargIkoner.LAST_OPP}
					onClickHoyreIkon={() => this.leggTilVedleggKnapp.click()}
				>
					{this.props.children}
					<input
						ref={c => this.leggTilVedleggKnapp = c}
						onChange={(e) => this.handleFileUpload(e.target.files)}
						type="file"
						className="visuallyhidden"
						tabIndex={-1}
						accept="image/jpeg,image/png,application/pdf"
					/>
				</AvsnittMedMarger>

				{this.props.vedlegg && this.props.vedlegg.filer.map((fil: any) => {
						const vedleggId = this.props.vedlegg.vedleggId;
						const lastNedUrl = `sosialhjelpvedlegg/${fil.filId}/fil`;

						return (
							<AvsnittMedMarger
								hoyreIkon={MargIkoner.SØPPELBØTTE}
								key={fil.filId}
								onClickHoyreIkon={() => this.removeFile(fil.filId, vedleggId)}
							>
								<Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
									{fil.filnavn}
								</Lenkeknapp>
							</AvsnittMedMarger>
						);
					}
				)}

				{this.state.filnavn && this.props.restStatus === REST_STATUS.PENDING && (
					<AvsnittMedMarger hoyreIkon={MargIkoner.SPINNER} key={this.state.filnavn}>
						{this.state.filnavn}
					</AvsnittMedMarger>
				)}

			</span>
		);
	}
}

export default connect<{}, {}, Props>((state: State) => ({}))(EttersendelseVedlegg);