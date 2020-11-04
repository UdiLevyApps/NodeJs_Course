
function sumFunc(num1, num2) {
    return new Promise((res, rej) => {
        try {
            setTimeout(() => res(num1 + num2), 200);
        }
        catch (e) {
            rej("Error", e.message)
        }

    }
    );
}


module.exports = {
    sumFunc
};