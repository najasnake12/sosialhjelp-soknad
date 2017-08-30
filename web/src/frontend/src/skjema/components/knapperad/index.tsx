import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import "./knapperad.css";

interface Props {
	gaVidere?: () => void;
	gaTilbake?: () => void;
	avbryt?: () => void;
}

class SkjemaKnapperad extends React.Component<Props, {}> {
	render() {
		const { gaVidere, gaTilbake, avbryt } = this.props;
		return (
			<div className="skjema-knapperad">
				<Knapp type="hoved" htmlType="button" onClick={gaVidere}>
					Gå videre
				</Knapp>
				<Knapp type="standard" htmlType="button" onClick={gaTilbake}>
					Tilbake
				</Knapp>
				<a href="#" onClick={avbryt}>
					Avbryt
				</a>
			</div>
		);
	}
}

export default SkjemaKnapperad;