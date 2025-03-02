let store;

const init = () => {
    if (!store) {
        store = new Map();
    } 
    return store;
}

module.exports = init();