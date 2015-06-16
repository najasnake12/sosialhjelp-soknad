angular.module('nav.boilerplate.soknad', [
    'nav.boilerplate.soknad.dummybolk',
    'nav.bolker',
    'nav.cms',
    'nav.fremdriftsindikator',
    'nav.miljovariabler',
    'nav.modal',
    'nav.modalsideskall',
    'nav.sidetittel',
    'nav.stickyFeilmelding',
    'nav.validering',
    'ngResource'
]);

require('angular-cms');
require('angular-miljovariabler');
require('angular-resource');
require('angular-soknad-bolker');
require('angular-soknad-fremdriftsindikator');
require('angular-soknad-tittel');
require('angular-soknad-validering');
require('./soknadDirective');
require('./soknadService');
require('./dummybolk/dummybolkModule');