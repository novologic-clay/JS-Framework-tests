var UUID = (function() {
    var self = {};
    var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    self.generate = function() {
        var d0 = Math.random()*0xffffffff|0;
        var d1 = Math.random()*0xffffffff|0;
        var d2 = Math.random()*0xffffffff|0;
        var d3 = Math.random()*0xffffffff|0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
            lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
            lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
            lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    };
    return self;
})();
var EventBus = new Vue();
var highchartsData = new Vue.Store({
    state: {
        charts: {}
    },
    getters: {
        getData: function(id) {
            return this.state.charts[id];
        }
    },
    setters: {
        setData: function(id, data) {
            this.state.charts[id] = data;
        }
    }
});
Vue.component('event-bus-button', {
    template: '<button @click="sendEvent"><slot></slot></button>',
    props: ['eventName'],
    methods: {
        sendEvent: function() {
            EventBus.$emit(this.eventName);
        }
    }
});
var app = new Vue({
    el: '#catalyst-app',
    store: highchartsData,
    data: {
        message: 'My super secret Message'
    }
});
Vue.component({
    el: 'highcharts-chart',
    template: '<div id="' + this.data.id + '"></div>',
    data: function() {
        return {
            id: UUID.generate(),
            chart: null
        };
    },
    methods: {
        refresh: function() {
            if(this.chart === null) {
                return;
            }
            for(var i = 0; i < chart.series.length; i++) {
                this.chart.series[i].setData(newVal[i], false);
            }
            this.chart.redraw();
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
    },
    created: function() {
        EventBus.$on('refresh', function() {
            highchartsData.setters.setData(this.highchartData)
        });
        EventBus.$on('initialize', function() {
            try {
                var config = JSON.parse(attributes.highchart);
                config.series = [{
                    name: 'Jeff',
                    data: this.getData()
                },{
                    name: 'Pete',
                    data: this.getData()
                }];
                this.chart = Highcharts.chart(uuid, config);
            } catch (e) {
                console.log('Failed to initialize highcharts.', e);
                return false;
            }
        });
        highchartsData.watch('getData', function() {

        });
    },
    props: ['highchartData']
});