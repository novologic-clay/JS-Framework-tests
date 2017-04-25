;(function() {
    var home = angular.module('catalyst.home.services', []);

    home
        .factory('RandomNumberService', [
            '$timeout',
            function($timeout) {
                var service = {
                    data: {
                        number: 100
                    },
                    init: function(multiplier) {
                        var multiplier = multiplier || 100;
                        var update = function() {
                            service.data.number = Math.random() * multiplier;
                            $timeout(update, 500);
                        };
                        update();
                    }
                };
                return service;
            }
        ])
        .factory('ChartDataService', [
            '$rootScope',
            '$timeout',
            function($rootScope, $timeout) {
                var service = {
                    update: function() {
                        return $timeout(function() {
                            return [
                                service.getData(),
                                service.getData()
                            ];
                        }, 5000 + Math.random() * 5000);
                    },
                    getData: function() {
                        var rand = function() {
                            return Math.ceil(Math.random() * 10)
                        };
                        return [
                            rand(),
                            rand(),
                            rand()
                        ];
                    }
                };
                return service;
            }
        ]);
}());