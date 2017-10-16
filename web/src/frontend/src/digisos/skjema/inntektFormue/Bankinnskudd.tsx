import * as React from "react";

import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import CheckboxFaktum, {
	createCheckboxFaktumKey
} from "../../../nav-soknad/faktum/CheckboxFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	radioCheckKeys,
	faktumIsSelected,
	getFaktumVerdi
} from "../../../nav-soknad/utils";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

class Bankinnskudd extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const innskudd = radioCheckKeys("inntekt.bankinnskudd");
		const hvilkeInnskudd = radioCheckKeys("inntekt.bankinnskudd.type");
		const hvilkeInnskuddAnnet = "inntekt.bankinnskudd.type.annet";
		return (
			<SporsmalFaktum faktumKey={innskudd.faktum}>
				{/*TODO checkboxbgroup-faktum*/}
				<CheckboxFaktum
					faktumKey={createCheckboxFaktumKey(
						hvilkeInnskudd.faktum,
						"brukskonto"
					)}
				/>
				<CheckboxFaktum
					faktumKey={createCheckboxFaktumKey(
						hvilkeInnskudd.faktum,
						"sparekonto"
					)}
				/>
				<CheckboxFaktum
					faktumKey={createCheckboxFaktumKey(
						hvilkeInnskudd.faktum,
						"bsu"
					)}
				/>
				<CheckboxFaktum
					faktumKey={createCheckboxFaktumKey(
						hvilkeInnskudd.faktum,
						"livsforsikring"
					)}
				/>
				<CheckboxFaktum
					faktumKey={createCheckboxFaktumKey(
						hvilkeInnskudd.faktum,
						"aksjer"
					)}
				/>
				<CheckboxFaktum
					faktumKey={createCheckboxFaktumKey(
						hvilkeInnskudd.faktum,
						"annet"
					)}
				/>
				{faktumIsSelected(getFaktumVerdi(fakta, hvilkeInnskuddAnnet)) ? (
					<TextareaFaktum
						faktumKey={`${hvilkeInnskuddAnnet}.true.beskrivelse`}
						maxLength={400}
						validerFunc={[getMaksLengdeFunc(400)]}
					/>
				) : null}
			</SporsmalFaktum>
		);
	}
}

export default Bankinnskudd;
