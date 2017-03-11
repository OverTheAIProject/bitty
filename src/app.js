new Vue({
    el: '#event',
    data: {
        event: {name:'', description:'', gender:'', date:''},
        events: []
    },
    ready: function () {
        
    },
    addEvent: function () {
        if(this.event.name) {
            this.events.push(this.event);
            this.event = {name:'', description:'', gender:'', date:''};
        }
    },
    methods: {},
});