const sum = require('./books');


test('sum all pass-in numbers', () => {
    expect(
        sum(10, 20, 5, 2)
        ).toBe(37);
})
 

test('passed', ()=>{
    expect(
        sum(39,19)
    ).toBe(58)
})