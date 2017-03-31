import mongoose from "mongoose";
import async from "async";

const _createAsyncFn = Symbol("createAsyncFn");
const _getAllCollection = Symbol("getAllCollection");

class ClearDbHelper {
    constructor () {
        if (process.env.NODE_ENV !== "test") {
          throw new Error("Attempt to clear non testing database!");
        }

        this.fns = [];
    }
    
    [_createAsyncFn] (index) {
        this.fns.push((done) => {
          mongoose.connection.collections[index].remove(() => {
            done();
          });
      });
    } 

    [_getAllCollection] () {
        for (const i in mongoose.connection.collections) {
          if (mongoose.connection.collections.hasOwnProperty(i)) {
            this[_createAsyncFn](i);
          }
        }
    }

    clearDatabase (done) {
        this[_getAllCollection]();

        async.parallel(this.fns, () => done());
    }
}

export default new ClearDbHelper();