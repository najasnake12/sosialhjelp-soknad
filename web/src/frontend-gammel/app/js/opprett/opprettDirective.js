angular.module('nav.soknadsosialhjelp.opprett')
    .directive('opprett', function (UtilService, RedirectRiktigDelsteg) {
        return {
            scope: true,
            templateUrl: 'js/opprett/opprett.html',
            link: function() {
                if(UtilService.getBehandlingIdFromUrl()) {
                    RedirectRiktigDelsteg.gaaTilRiktigDelsteg();
                }
            }
        };
    });
