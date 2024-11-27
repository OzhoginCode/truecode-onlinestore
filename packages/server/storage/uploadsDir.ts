import path from 'path';

const pathFixer = process.env.NODE_ENV === 'production' ? '..' : '';
console.log(path.join(__dirname, '..', pathFixer, 'uploads'));
export default path.join(__dirname, '..', pathFixer, 'uploads');
