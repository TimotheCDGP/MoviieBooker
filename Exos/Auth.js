function generateToken(user) {

    const base64 = Buffer.from(JSON.stringify(user)).toString('base64');
    return base64;
}

function decodeToken(token) {
    const jsonString = Buffer.from(token, 'base64').toString('utf-8');
    return JSON.parse(jsonString);
}

const user = {
    id: 1,
    email: 'test@example.com',
    role: 'admin'
};

const token = generateToken(user);
console.log('Token généré :', token);

const decoded = decodeToken(token);
console.log('Token décodé :', decoded);