import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getInputFaktumTekst, getFaktumVerdi } from "../utils";
import { Select, SelectBredde } from "nav-frontend-skjema";
import {
	InjectedFaktumComponentProps,
	faktumComponent
} from "./FaktumComponent";

interface OwnProps {
	disabled?: boolean;
	bredde?: SelectBredde;
	labelFunc?: (label: string) => React.ReactNode;
}

class FaktumSelect extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			disabled,
			bredde,
			labelFunc,
			fakta,
			children,
			intl
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Select
				name={faktumKey}
				disabled={disabled}
				value={getFaktumVerdi(fakta, faktumKey)}
				bredde={bredde}
				onChange={(evt: any) =>
					this.props.setFaktumVerdi(faktumKey, evt.target.value)}
				label={
					<LabelMedHjelpetekst
						id={faktumKey}
						label={labelFunc ? labelFunc(tekster.label) : tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}>
				{children}
			</Select>
		);
	}
}

export default injectIntl(faktumComponent()(FaktumSelect));
