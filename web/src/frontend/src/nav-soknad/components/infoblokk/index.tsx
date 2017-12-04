import * as React from "react";
import * as classNames from "classnames";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Innholdstittel, Systemtittel } from "nav-frontend-typografi";
import ProblemSirkel from "../svg/ProblemSirkel";

interface Props {
	tittel?: string;
	brukSystemtittel?: boolean;
	className?: string;
	ikon?: "standard" | "advarsel";
}

const Infoblokk: React.StatelessComponent<Props> = ({
	className,
	children,
	tittel,
	ikon,
	brukSystemtittel
}) => {
	const dashClassName = classNames("skjema-infoblokk__dash", {
		"skjema-infoblokk__dash--gul": ikon === "advarsel"
	});
	return (
		<Panel className={`skjema-infoblokk ${className}`}>
			<div className="skjema-infoblokk__content">
				<div className="skjema-infoblokk__icon">
					{ikon === "advarsel" ? (
						<div className="ikon-sirkel-gul">
							<ProblemSirkel />
						</div>
					) : (
						<Icon kind="info-sirkel" />
					)}
				</div>
				{tittel && (
					<div>
						{brukSystemtittel ? (
							<Systemtittel className="skjema-infoblokk__title">
								{tittel}
							</Systemtittel>
						) : (
							<Innholdstittel className="skjema-infoblokk__title">
								{tittel}
							</Innholdstittel>
						)}
						<div className={dashClassName} />
					</div>
				)}
				<div className="skjema-infoblokk__tekst">{children}</div>
			</div>
		</Panel>
	);
};

export default Infoblokk;
