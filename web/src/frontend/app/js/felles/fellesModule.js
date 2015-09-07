angular.module('nav.kravdialogbp.felles', [
    'nav.constant',
    'lodash',
    'nav.kravdialogbp.googleanalytics',
    'nav.kravdialogbp.httpProvider',
    'nav.kravdialogbp.loader',
    'nav.kravdialogbp.routes'
]);

require('./constants/constantsModule');
require('./lodash/lodahs-module');
require('./googleanalytics/googleAnalyticsModule');
require('./httpprovider/httpProviderModule');
require('./loader/loaderModule');
require('./routes/routesModule');