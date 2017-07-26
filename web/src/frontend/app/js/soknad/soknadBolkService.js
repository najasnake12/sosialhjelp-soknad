angular.module('nav.soknadsosialhjelp.soknad')
    .factory('soknadBolkService', function () {
        const arbeidbolk = {
            id: 'arbeidbolk',
            tittel: 'arbeidbolk.tittel',
            template: '<div data-arbeidbolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const familiebolk = {
            id: 'familiebolk',
            tittel: 'familiebolk.tittel',
            template: '<div data-familiebolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const begrunnelsebolk = {
            id: 'begrunnelsebolk',
            tittel: 'begrunnelsebolk.tittel',
            template: '<div data-begrunnelsebolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const inntektbolk = {
            id: 'inntektbolk',
            tittel: 'inntektbolk.tittel',
            template: '<div data-inntektbolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const bosituasjonbolk = {
            id: 'bosituasjonbolk',
            tittel: 'bosituasjonbolk.tittel',
            template: '<div data-bosituasjonbolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const dummyBolk1 = {
            id: 'dummybolk1',
            tittel: 'arbeidsforhold.tittel',
            template: '<div data-dummybolk></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const dummyBolk2 = {
            id: 'dummybolk2',
            tittel: 'infofar.tittel',
            template: '<div data-dummybolk2></div>',
            apen: false,
            skalSettesTilValidVedForsteApning: false,
            validering: false
        };

        const alleBolker = [arbeidbolk, familiebolk, begrunnelsebolk, bosituasjonbolk, inntektbolk, dummyBolk1, dummyBolk2];

        const bolklister = {
            boilerplatedummysoknadstype: [arbeidbolk, familiebolk, begrunnelsebolk, bosituasjonbolk, inntektbolk, dummyBolk1, dummyBolk2]
        };

        const apneTab = (ider) => settApenStatusForAccordion(true, ider);

        const lukkTab = (ider) => settApenStatusForAccordion(false, ider);

        const getBolkliste = (soknadstype) => bolklister[soknadstype];

        const getBolkMedNavn = (bolknavn) => {
            return alleBolker.filter((bolk) => bolk.id === bolknavn)[0];
        };

        const settApenStatusForAccordion = (apen, ider) => {
            if (ider instanceof Array) {
                angular.forEach(ider, function (id) {
                    settApenForId(apen, id);
                });
            } else if (angular.isDefined(ider)) {
                settApenForId(apen, ider);
            }
        };

        const settApenForId = (apen, id) => getBolkMedNavn(id).apen = apen;

        const settValidert = (bolknavn) => getBolkMedNavn(bolknavn).validering = false;

        return {
            getBolkliste,
            getBolkMedNavn,
            settValidert,
            apneTab,
            lukkTab
        };
    });