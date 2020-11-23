
const events = require('events');
const app = require('./app');

const evt = new events.EventEmitter();

evt.on('eventNumbersFire', (num1, num2) => {

    console.log("\n*********Fire event********* ")
    console.log("Event fired random numbers", num1, num2)
    getSum(num1, num2)

});

async function getSum(num1, num2) {
    try {
        const sum = await app.sumFunc(num1, num2); // simulating asyn promise !!!
        console.log("after async simulation 200 milisec Result:")
        console.log(`sum of ${num1} and ${num2} is ${sum}`)
    } catch (err) {
        console.error(err);
    }
}

evt.on('error', p => console.log('error occurred'));

function init() {
    setInterval(() => evt.emit('eventNumbersFire', Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)), 1000);
}

module.exports = {
    init,
};