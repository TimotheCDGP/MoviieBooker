function filterUsers(users, criterion) {

    return users.filter(user => {

        if (criterion.type === "age") {
            return user.age > criterion.value;
        }
        else if (criterion.type === "city") {
            return user.city.toLowerCase().includes(criterion.value.toLowerCase());
        }
        else if (criterion.type === "name") {
            return user.name.toLowerCase().includes(criterion.value.toLowerCase());
        }
        return false;
    });
}

const users = [
    { id: 1, name: "user1", age: 25, city: "Paris" },
    { id: 2, name: "user2", age: 30, city: "Lyon" },
    { id: 3, name: "user3", age: 22, city: "Marseille" },
    { id: 4, name: "user4a", age: 35, city: "Paris" },
    { id: 5, name: "user5", age: 28, city: "Lille" }
];

console.log(filterUsers(users, { type: "age", value: 26 }));
console.log(filterUsers(users, { type: "city", value: "Paris" }));
console.log(filterUsers(users, { type: "name", value: "a" }));