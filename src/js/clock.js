const Clock = function(){
    let rate = 50,
        _clock,
        _eventListeners = [];

        console.log('trigger')

    const _tick = () =>{
        _emit('clock', {});
    }

    const _emit = (eventName, data) =>{
        const event = _eventListeners[eventName];
        if (event){
            event.forEach(fn =>{
                fn(data);
            })
        }
    }

    /********  PUBLIC FUNCTIONS  *************/
    this.start = () =>{
        _clock = setInterval(_tick.bind(this), rate); 

    }

    this.stop = () =>{
        clearInterval(_clock);

    }

   this.subscribe = (eventName, fn) =>{
        console.log('het', eventName, fn)
        if (!_eventListeners[eventName]){
            _eventListeners[eventName] = [];
        }

        _eventListeners[eventName].push(fn);
       
        return {
            unsubscribe: () =>{
                _eventListeners[eventName] = _eventListeners[eventName].filter(eventFn => fn !== eventFn);
            }   
        }
    }

    this.getListeners = ()=>{
        return _eventListeners;
    }

};

let clock = new Clock();

export {clock};