import bcrypt from 'bcrypt';

const generateHash = async (input: string, saltRounds: number = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(input, saltRounds);
    return hash;
};

export default generateHash;
