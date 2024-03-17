import EventEmitter from "./task1.mjs";
import fetch from "node-fetch";


class WithTime extends EventEmitter {
   execute(asyncFunc, ...args) {
       this.emit('begin');
       const startTime = process.hrtime();

       asyncFunc(...args, (err, data) => {
           if (err) {
               return this.emit('error', err);
           }

           const elapsedTime = process.hrtime(startTime);
           const elapsedMilliseconds = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6;

           this.emit('data', data);
           this.emit('end', elapsedMilliseconds);
       });
   }
}

const fetchFromUrl = (url, cb) => {
   fetch(url)
       .then(response => {
           if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
           }
           return response.json();
       })
       .then(data => cb(null, data))
       .catch(error => cb(error));
};

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', (time) => console.log(`Done with execute in ${time} ms`));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));
