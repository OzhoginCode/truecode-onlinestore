import fs from 'fs';
import path from 'path';

import multer from 'multer';

const uploadDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${String(Date.now())}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
