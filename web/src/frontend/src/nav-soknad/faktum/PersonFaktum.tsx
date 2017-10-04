import * as React from "react";
import { Column, Container, Row } from "nav-frontend-grid";
import TallFaktum from "./typedInput/TallFaktum";
import NavnFaktum from "./typedInput/NavnFaktum";

interface OwnProps {
	faktumKey: string;
	faktumId?: number;
	validering?: {
		navnRequired?: boolean;
		fnrRequired?: boolean;
		pnrRequired?: boolean;
	};
}

class PersonFaktum extends React.Component<OwnProps, {}> {
	render() {
		const { faktumKey, validering = {}, faktumId } = this.props;
		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							<NavnFaktum
								faktumKey={faktumKey}
								required={validering.navnRequired}
								faktumId={faktumId}
								property="navn"
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12" md="6">
							<TallFaktum
								faktumKey={faktumKey}
								maxLength={6}
								bredde="s"
								required={validering.fnrRequired}
								faktumId={faktumId}
								property="fnr"
							/>
						</Column>
						<Column xs="12" md="6">
							<TallFaktum
								faktumKey={faktumKey}
								maxLength={5}
								bredde="s"
								required={validering.pnrRequired}
								faktumId={faktumId}
								property="pnr"
							/>
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonFaktum;
