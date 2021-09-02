const users = [
    {
        id: 10000,
        username: 'player1',
        pass: 'QYCY5rcqLAgk699VDf2YWisi3IgEzvF93DvGgUJB',
        host: false,
    },
    {
        id: 10001,
        username: 'player2',
        pass: '2wpIjCP9YQSW0C6I0jAOVy6vLsoQZOvlcYYfw6XR',
        host: false,
    },
    {
        id: 10002,
        username: 'player3',
        pass: 'r4LUoL88a50PjRcHAtoTYgLz4CjmfE7mgJAg9GeF',
        host: false,
    },
    {
        id: 10003,
        username: 'testplayer',
        pass: 'nNpBEUihlIlR7by4tAeKn0fUJSq48XatjEcavfs9',
        host: false,
    },
    {
        id: 10004,
        username: 'potat',
        pass: 'TjV9y21pRL8eqOFxX81yoUu7jbOF5z648x9Ektcv',
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
