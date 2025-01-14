import {useState} from "react";
import {sendSoknad} from "../../generated/soknad-actions/soknad-actions";
import digisosConfig from "../../lib/config";
import {faro} from "@grafana/faro-react";

export const useSendSoknad = (behandlingsId: string) => {
    const [isError, setIsError] = useState<boolean>(false);

    const sendSoknaden = async () => {
        setIsError(false);
        try {
            try {
                const {id} = await sendSoknad(behandlingsId);
                window.location.assign(`${digisosConfig.innsynURL}${id}/status`);
            } catch (e: any) {
                faro.api.pushError(e);
                throw e;
            }
        } catch (e: any) {
            faro.api.pushError(e);
            setIsError(true);
        }
    };

    return {sendSoknad: sendSoknaden, isError};
};
