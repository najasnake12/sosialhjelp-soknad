import { InjectedIntl } from "react-intl";
import { FaktumCheckboksTekst, Infotekst, FaktumInputTekst } from "./types";

export const radioCheckKeys = (key: string) => ({
	faktum: `${key}`,
	sporsmal: `${key}.sporsmal`,
	hjelpetekst: `${key}.hjelpetekst`
});

export const inputKeys = (key: string) => ({
	faktum: `${key}`,
	sporsmal: `${key}.sporsmal`,
	pattern: `${key}.pattern`,
	hoyretekst: `${key}.hoyretekst`,
	venstretekst: `${key}.venstretekst`
});

export function faktumIsSelected(value: string) {
	return value === "true";
}

export function boolToString(flag: boolean) {
	return flag ? "true" : "false";
}

export function intlHasKey(intl: InjectedIntl, key: string) {
	return intl.messages[key] !== undefined;
}

export function getIntlText(intl: InjectedIntl, key?: string) {
	if (!key) {
		return undefined;
	}
	return intlHasKey(intl, key) ? intl.formatMessage({ id: key }) : undefined;
}

export function getIntlTextOrKey(intl: InjectedIntl, key: string): string {
	const tekst = getIntlText(intl, key);
	return tekst || key;
}

export function getIntlInfoTekst(
	intl: InjectedIntl,
	key: string
): Infotekst | undefined {
	const tittel = getIntlText(intl, `${key}.tittel`);
	const tekst = getIntlText(intl, `${key}.tekst`);
	return tittel || tekst ? { tittel, tekst } : undefined;
}

export function getFaktumCheckboksTekst(
	intl: InjectedIntl,
	key: string
): FaktumCheckboksTekst {
	return {
		label: getIntlTextOrKey(intl, key),
		feilmelding: getIntlTextOrKey(intl, `${key}.feilmelding`),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${key}.hjelpetekst`)
	};
}

export function getFaktumRadioTekst(
	intl: InjectedIntl,
	key: string,
	value: string
): FaktumCheckboksTekst {
	return getFaktumCheckboksTekst(intl, `${key}.${value}`);
}

export function getFaktumInputTekst(
	intl: InjectedIntl,
	key: string
): FaktumInputTekst {
	return {
		label: getIntlTextOrKey(intl, `${key}.sporsmal`),
		feilmelding: getIntlTextOrKey(intl, `${key}.feilmelding`),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlInfoTekst(intl, `${key}.hjelpetekst`),
		placeholder: getIntlText(intl, `${key}.placeholder`)
	};
}