const sum = (...rest) => {
    return rest.reduce((pre, cur) => {
        return pre += cur
    })
}
module.exports = sum;
