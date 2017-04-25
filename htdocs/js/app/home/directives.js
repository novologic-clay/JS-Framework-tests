;(function() {
    var home = angular.module('catalyst.home.directives', [
        'catalyst.home.services'
    ]);

    home
        .directive('rootEmit', [
            '$rootScope',
            function($rootScope) {
                var directive = {
                    restrict: 'AE',
                    link: function(scope, element, attributes) {
                        try {
                            $(element).click(function () {
                                attributes.rootEmit && attributes.rootEmit.length > 0 && $rootScope.$emit(attributes.rootEmit, attributes.emitObj && JSON.parse(attributes.emitObj) || {});
                            });
                        } catch (e) {
                            console.log('Failed to emit message.', e);
                        }
                    }
                };
                return directive;
            }
        ])
        .directive('highchart', [
            '$rootScope',
            'ChartDataService',
            function($rootScope, Service) {
                var directive = {
                    restrict: 'A',
                    scope: true,
                    link: function(scope, element, attributes) {
                        var uuid = UUID.generate();
                        var chart = null;
                        scope.data = {};
                        $(element).attr('id', uuid);
                        var initializeChart = function(event, data) {
                            console.log(data);
                            try {
                                var config = JSON.parse(attributes.highchart);
                                config.series = [{
                                    name: 'Jeff',
                                    data: Service.getData()
                                },{
                                    name: 'Pete',
                                    data: Service.getData()
                                }];
                                console.log(config);
                                chart = Highcharts.chart(uuid, config);
                            } catch (e) {
                                console.log('Failed to initialize highcharts.', e);
                                return false;
                            }
                        };
                        var onDataChange = function(result) {
                            scope.data.values = result;
                        };
                        scope.$watch('data.values', function(newVal, oldVal) {
                            if(chart === null) {
                                return;
                            }
                            for(var i = 0; i < chart.series.length; i++) {
                                chart.series[i].setData(newVal[i], false);
                            }
                            chart.redraw();
                        });
                        scope.$onRootEmit('chart-init', initializeChart);
                        scope.$onRootEmit('chart-refresh', function(event, data) {
                            Service.update().then(onDataChange);
                        });
                    }
                };
                return directive;
            }
        ]);

}());