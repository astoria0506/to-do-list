export const refreshHelper = {
    subscribers: [],
    subscribe: function(callback) {
        this.subscribers.push(callback)
    },
    fire: function() {
        this.subscribers.forEach(callback => callback())
    }
}