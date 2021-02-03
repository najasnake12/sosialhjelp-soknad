import * as React from "react";
import {DigisosFarge} from "./DigisosFarger";

const Ella = (props: {size?: number; visBakgrundsSirkel: boolean; bakgrundsFarge?: DigisosFarge}) => {
    const height = props.size || 80;
    const width = props.size || 80;
    const bakgrundsFarge: DigisosFarge | undefined = props.bakgrundsFarge;
    const showBackgroundCircle: boolean = props.visBakgrundsSirkel;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
            width={width}
            height={height}
            viewBox="0 0 175 175"
            className={"ella--" + bakgrundsFarge}
            aria-hidden="true"
        >
            <title>Veileder</title>
            <defs>
                {showBackgroundCircle && (
                    <path
                        className="bakgrunnsSirkel"
                        d="M175 87.5q0-17.8-6.9-34.05-6.6-15.7-18.75-27.8-12.1-12.1-27.8-18.75Q105.3 0 87.5 0 69.7 0 53.45 6.9q-15.7 6.65-27.85 18.75-12.1 12.1-18.75 27.8Q0 69.7 0 87.5q0 17.8 6.85 34.05 6.65 15.7 18.75 27.85 12.15 12.1 27.85 18.75Q69.7 175 87.5 175q17.8 0 34.05-6.85 15.7-6.65 27.8-18.75 12.15-12.15 18.75-27.85Q175 105.3 175 87.5z"
                        id="ella-a"
                    />
                )}
                <path
                    fill="#3E3832"
                    d="M115.25 33.35q-12.4-14-30-14.05-17.6-.05-30.1 13.95-12.45 14-12.55 33.8 0 11.4.6 17 1 9.45 4.35 15.8 8.6 16.2 35.55 16.8h3.85q26.95-.5 35.6-16.7 3.35-6.3 4.4-15.75.65-5.6.65-17 .05-19.85-12.35-33.85z"
                    id="ella-b"
                />
                <path
                    fill="#0C5472"
                    d="M71.8 104.75q-2.7 0-7.8 2.85-5.25 2.95-10.3 7.45-12.75 11.4-12.75 21.75v24.85q10.3 6.45 21.95 9.85 12 3.5 24.6 3.5 22.45 0 42.05-10.75V136.8q0-10.35-12.95-21.75-5.1-4.5-10.4-7.45-5.15-2.85-7.9-2.85H71.8z"
                    id="ella-c"
                />
                <path
                    fill="#FFF"
                    d="M66.95 105.8l-3.45 1.9q4.6 7.45 6.75 10.4 6.8 9.3 14 14.7 7.6-5.65 14.8-15.05 6.35-8.35 6.35-10.75-13.8-8.05-29.25-4.45-4.8 1.1-9.2 3.25z"
                    id="ella-d"
                />
                <path
                    fill="#D2242A"
                    d="M123 138.05q0-.85-.6-1.5-.6-.6-1.45-.6H95.5q-.85 0-1.45.6-.6.65-.6 1.5v13.9q0 .85.6 1.45t1.45.6h25.45q.85 0 1.45-.6t.6-1.45v-13.9z"
                    id="ella-e"
                />
                <path
                    fill="#FFF"
                    d="M114.55 145.8q0-2.55-1.8-4.35-1.8-1.8-4.4-1.8-2.55 0-4.35 1.8-1.85 1.8-1.85 4.35 0 2.6 1.85 4.4 1.8 1.8 4.35 1.8 2.6 0 4.4-1.8 1.8-1.8 1.8-4.4z"
                    id="ella-f"
                />
                <path fill="#FFF" d="M101.6 145.4h-1.2l-1.3 3.15h1.2l1.3-3.15z" id="g" />
                <path fill="#FFF" d="M116.85 145.4h-.75l-1.25 3.15h.75l1.25-3.15z" id="h" />
                <path fill="#FFF" d="M118.95 145.4h-.35l-1.25 3.15h.3l1.3-3.15z" id="i" />
                <path
                    fill="#C52D35"
                    d="M103.55 146.65v1.8l.1.1h.95l.1-.1v-2.95l-.1-.1h-.95q-.1 0-.1.1l-.4.95.05.1h.3l.05.1z"
                    id="ella-j"
                />
                <path
                    fill="#C52D35"
                    d="M105.2 145.4l-.1.1-.4.95-.15.1h.8q.3 0 .3.3v1.6l.05.1h.95l.1-.1v-2.95l-.1-.1h-1.45z"
                    id="ella-k"
                />
                <path
                    fill="#C52D35"
                    d="M110 145.4h-.95l-.1.1v2.95l.1.1h.95q.1 0 .1-.15l.4-.9q0-.1-.1-.1h-.25l-.05-.1v-1.8l-.1-.1z"
                    id="ella-l"
                />
                <path fill="#C52D35" d="M107.1 147.4h-.25l-.8 1.15h.65q.1 0 .1-.15l.4-.9-.1-.1z" id="m" />
                <path fill="#C52D35" d="M112.55 145.4l-.1.05-1 3.1h1.05l.05-.05 1.2-3q.1-.1-.05-.1h-1.15z" id="n" />
                <path fill="#C52D35" d="M111.25 145.5q0-.1-.15-.1h-1.6q-.1 0 .5.2l1.15 2.85.15.1h.95l-1-3.05z" id="o" />
                <path
                    fill="#C52D35"
                    d="M107.1 145.85q-.5.45-.5 1.15 0 .65.6 1.15.45.4.85.4h.4l.1-.1.5-1.05h-.85q-.1 0-.25-.15t-.15-.3q0-.5.6-.5.45 0 .55.6.1 0 .1-.65 0-1-1-1-.55 0-.95.45z"
                    id="ella-p"
                />
                <path
                    fill="#5A1F57"
                    d="M109.75 138.8q.35 0 .35-.35V138q0-.35-.35-.35h-2.65q-.35 0-.35.35v.45q0 .35.35.35h2.65z"
                    id="ella-q"
                />
                <path fill="#C2B5CF" d="M107.65 134.3v4.1h1.55v-4.1h-1.55z" id="r" />
                <path
                    fill="#E7E5E2"
                    d="M118.6 65.25q-.6 0-1 .2-21.95 2.6-37.2-8.35-4.6-3.3-8.4-7.8-2.8-3.7-3.05-3.7-3.7 3.45-7.7 7.55-8 8.2-9.55 11.35-.2 1-.4.85-.4-.2-1-.2-1.1-.05-1.95.8-.8.85-.8 2.05l-.05 10.9q0 1.2.8 2.05.8.85 1.95.85.95 0 1.65-.55 2.8 13.3 11.75 21.65 9.05 8.4 20.75 8.4 11.7.05 20.75-8.35 8.95-8.35 11.8-21.6.7.55 1.6.55 1.15 0 2-.85.8-.85.8-2V68.1q0-1.2-.8-2-.8-.85-1.95-.85z"
                    id="ella-s"
                />
                <path
                    fill="#635E59"
                    d="M72.65 74.8q1.8-.15 2.4-2.6.55-2.3-.3-4.15-.6-1.25-2.1-1.25t-2.3 2.4q-.6 1.9 0 3.7.65 2.05 2.3 1.9z"
                    id="ella-t"
                />
                <path
                    fill="#635E59"
                    d="M96.75 72.2q.6 2.45 2.4 2.6 1.7.15 2.35-1.9.6-1.8 0-3.7-.25-.75-.7-1.35-.75-1.05-1.65-1.05-.85 0-1.5.55-.45.4-.55.7-.85 1.85-.35 4.15z"
                    id="ella-u"
                />
                <path
                    fill="#D1BFA3"
                    d="M90.65 78.15q-1.15-1.4-4.25-.95-.35.05-.55.35-.15.25-.1.6.1.8.9.7 2.1-.35 2.7.3 1 1.2.65 2.4-.35 1.25-2 2.25-.85.55-1.9.75-1.05.15-1.7-.15-.3-.1-.6 0-.35.15-.45.45-.15.3 0 .6.1.35.4.45 1.05.5 2.5.25 1.45-.2 2.65-.95 2.25-1.4 2.75-3.3.45-1.95-1-3.75z"
                    id="ella-v"
                />
                <path
                    fill="#D19E9C"
                    d="M96.5 90.4q-.35.1-.5.4 0 .1-.5.95-.75 1.2-1.75 2.1-3.3 3.25-8.3 3.1-4.8-.15-8.25-3.1-1-.9-1.95-2.15-.5-.75-.55-.95-.15-.3-.45-.4-.35-.1-.65.05-.3.15-.4.5-.15.3 0 .6.5.85.75 1.15.8 1.25 2.2 2.4 3.8 3.35 9.25 3.55 5.65.15 9.5-3.55 1.2-1.15 2-2.45l.6-1.15q.15-.3.05-.6-.15-.35-.45-.45-.3-.15-.6 0z"
                    id="ella-w"
                />
            </defs>
            <use xlinkHref="#ella-a" className="bakgrunnsSirkel" />
            <use xlinkHref="#ella-b" />
            <use xlinkHref="#ella-c" />
            <use xlinkHref="#ella-d" />
            <use xlinkHref="#ella-e" />
            <use xlinkHref="#ella-f" />
            <use xlinkHref="#ella-g" />
            <use xlinkHref="#ella-h" />
            <use xlinkHref="#ella-i" />
            <use xlinkHref="#ella-j" />
            <use xlinkHref="#ella-k" />
            <use xlinkHref="#ella-l" />
            <use xlinkHref="#ella-m" />
            <use xlinkHref="#ella-n" />
            <use xlinkHref="#ella-o" />
            <use xlinkHref="#ella-p" />
            <use xlinkHref="#ella-q" />
            <use xlinkHref="#ella-r" />
            <use xlinkHref="#ella-s" />
            <use xlinkHref="#ella-t" />
            <use xlinkHref="#ella-u" />
            <use xlinkHref="#ella-v" />
            <use xlinkHref="#ella-w" />
        </svg>
    );
};

export default Ella;
