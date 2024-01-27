export default function resolvePromise(prms, promiseState) {
    if (prms !== null) {    
        promiseState.data= null;
        promiseState.error= null;
        prms.then(retreivePromiseDataACB).catch(handlePromiseErrorACB)

        function retreivePromiseDataACB(data) {
            if (promiseState.promise === prms) promiseState.data = data;
        }
        
        function handlePromiseErrorACB(error) {
            if (promiseState.promise === prms) promiseState.error = error;
        }
    }

    promiseState.promise = prms;
}