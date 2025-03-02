module.exports = async (email) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (String(email).match(/^\S+@\S+\.\S+$/)) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 200);
    });
};