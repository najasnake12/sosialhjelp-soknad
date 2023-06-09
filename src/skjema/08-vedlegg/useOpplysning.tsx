import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {opplysningSpec, VedleggFrontendMinusEtParTingSomTrengerAvklaring} from "../../lib/opplysninger";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useUpdateOkonomiskOpplysning} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {VedleggFrontend} from "../../generated/model";
import {useDebounce} from "react-use";
import {belopTekstfeltPreprocessor} from "./belopTekstfeltPreprocessor";

const zodBelopTekstfeltSchema = z.preprocess(
    belopTekstfeltPreprocessor,
    z.nullable(z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).min(0, ValideringsFeilKode.ER_TALL))
);

const VedleggRadFrontendSchema = z.object({
    rader: z.array(
        z
            .object({
                beskrivelse: z.string().max(100, ValideringsFeilKode.MAX_LENGDE).nullable(),
                belop: zodBelopTekstfeltSchema,
                brutto: zodBelopTekstfeltSchema,
                netto: zodBelopTekstfeltSchema,
                renter: zodBelopTekstfeltSchema,
                avdrag: zodBelopTekstfeltSchema,
            })
            .partial()
    ),
});

export type VedleggRadFrontendForm = z.infer<typeof VedleggRadFrontendSchema>;

export const useOpplysning = (opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring) => {
    const {textKey, inputs, numRows} = opplysningSpec[opplysning.type];

    const behandlingsId = useBehandlingsId();
    const {mutate} = useUpdateOkonomiskOpplysning();

    const {control, handleSubmit, watch} = useForm<VedleggRadFrontendForm>({
        defaultValues: {rader: opplysning.rader},
        resolver: zodResolver(VedleggRadFrontendSchema),
        mode: "onBlur",
        // Egentlig burde dette være true, men om det ikke er false så vil den
        // umiddelbart bytte fokus til første ugyldige felt dersom man endrer
        // et gyldig felt pga. mode: "onBlur"
        shouldFocusError: false,
    });

    // This has the effect of waiting 1 second after a change to "rader" before we try to push it to backend.
    const [rader, setRader] = useState<VedleggFrontend["rader"]>([]);
    useDebounce(
        () => {
            if (!rader.length) return;

            mutate({
                behandlingsId,
                data: {...opplysning, rader},
            });
        },
        200,
        [rader]
    );

    // Submit data to server when form changes, with delay - this could probably be done better.
    // The row state is changed, which starts a timer in useDebounce above before submitting to backend.
    useEffect(() => {
        const subscription = watch(() => handleSubmit(({rader}) => setRader(rader))());
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    const {fields, append, remove} = useFieldArray<VedleggRadFrontendForm>({
        control,
        name: "rader",
    });

    return {
        rows: {
            entries: fields,
            append,
            remove,
        },
        form: {
            control,
            handleSubmit,
        },
        textKey,
        numRows,
        inputs,
    };
};