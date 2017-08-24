import * as React from "react";
import Sporsmal from "../../../skjema/components/sporsmal";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { radioCheckKeys, faktumIsSelected } from "../../../skjema/utils";

import FaktumRadio from "../../../skjema/faktum/FaktumRadio";
import FaktumCheckbox from "../../../skjema/faktum/FaktumCheckbox";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../skjema/components/underskjema";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { faktum } = this.props;
		const innskudd = radioCheckKeys("inntekt.innskudd");
		const hvilkeInnskudd = radioCheckKeys("inntekt.innskudd.true");
		const hvilkeInnskuddAnnet = "inntekt.innskudd.true.annet";
		return (
			<Sporsmal sporsmalId={innskudd.sporsmal}>
				<FaktumRadio faktumKey={innskudd.faktum} option="true" />
				<Underskjema visible={faktumIsSelected(faktum.get(innskudd.faktum))}>
					<FaktumSkjemagruppe tittelId={hvilkeInnskudd.sporsmal}>
						<FaktumCheckbox
							faktumKey={hvilkeInnskudd.faktum}
							option="brukskonto"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeInnskudd.faktum}
							option="sparekonto"
						/>
						<FaktumCheckbox
							faktumKey={hvilkeInnskudd.faktum}
							option="livsforsikring"
						/>
						<FaktumCheckbox faktumKey={hvilkeInnskudd.faktum} option="aksjer" />
						<FaktumCheckbox faktumKey={hvilkeInnskudd.faktum} option="annet" />
						{faktumIsSelected(faktum.get(hvilkeInnskuddAnnet))
							? <FaktumTextarea
									faktumKey={`${hvilkeInnskuddAnnet}.beskrivelse`}
								/>
							: null}
					</FaktumSkjemagruppe>
				</Underskjema>
				<FaktumRadio faktumKey={innskudd.faktum} option="false" />
			</Sporsmal>
		);
	}
}

export default Bankinnskudd;
