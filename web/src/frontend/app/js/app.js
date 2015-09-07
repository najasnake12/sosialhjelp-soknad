var Globals = window.Globals || {};
Globals.utils = require("angular-common-utils").utils;
window.Globals = Globals;

angular.module('kravdialogbp', [
    'nav.kravdialogbp.felles',
    'nav.kravdialogbp.informasjonsside',
    'nav.kravdialogbp.soknad',
    'nav.kravdialogbp.opprett',
    'nav.kravdialogbp.vendors'
]);

require('fellesModule');
require('./informasjonsside/informasjonssideModule');
require('./soknad/soknadModule');
require('./opprett/opprettModule');
