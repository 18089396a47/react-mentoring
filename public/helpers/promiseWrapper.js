export default (func, param) => {
    return new Promise((resolve, reject) => {
        func(param, (result) => {
            resolve(result);
        }, (error) => {
            reject(error);
        });
    });
};
