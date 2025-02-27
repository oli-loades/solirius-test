const mockValidateEmail = async (email) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email.match(/^\S+@\S+\.\S+$/)) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 200);
    });
};

module.exports = {
    mockValidateEmail
}