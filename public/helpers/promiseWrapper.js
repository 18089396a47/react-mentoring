export default (func, param, success, fail) => {
    return new Promise((resolve) => {
        func(param, (result) => {
            success(result);
            resolve(result);
        }, (error) => {
            fail(error);
            resolve(error);
        });
    });
};
