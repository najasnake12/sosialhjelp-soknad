import * as React from "react";
import { Checkbox, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumStoreState, FaktumComponentProps } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import {
	getFaktumCheckboksTekst,
	faktumIsSelected,
	boolToString
} from "../utils";

interface OwnProps {
	faktumKey: string;
	option: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumCheckbox extends React.Component<
	OwnProps & FaktumComponentProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			option,
			disabled,
			feil,
			fakta,
			dispatch,
			intl
		} = this.props;
		const key = `${faktumKey}.${option}`;
		const tekster = getFaktumCheckboksTekst(intl, key);
		const checked = faktumIsSelected(fakta.get(key));
		return (
			<Checkbox
				name={key}
				checked={checked}
				disabled={disabled}
				value={fakta.get(key)}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(key, boolToString(evt.target.checked)))}
				label={
					<LabelMedHjelpetekst
						id={key}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
				feil={feil}
			/>
		);
	}
}

export default connect((state: FaktumStoreState, props: OwnProps) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(injectIntl(FaktumCheckbox));
