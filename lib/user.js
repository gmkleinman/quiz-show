const users = [
    {
        id: 10000,
        username: 'guest1',
        pass: 'pass1',
        host: false,
    },
    {
        id: 10001,
        username: 'guest2',
        pass: 'pass2',
        host: false,
    },
    {
        id: 10002,
        username: 'guest3',
        pass: 'pass3',
        host: false,
    },
    {
        id: 10003,
        username: 'potat',
        pass: 'host',
        host: true,
    },
]

export async function findUser({ username }) {
    return users.find((user) => user.username === username)
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
    return user.pass = inputPassword;
}
