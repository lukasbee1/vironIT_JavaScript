import Person from "./Person";


const person = new Person();

test('check time', () => {
    person.setTimeWait(1000,1000);
    expect(person.getTimeWait()).toEqual(1000);
});
