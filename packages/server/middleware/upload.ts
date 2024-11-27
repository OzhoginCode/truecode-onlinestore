import fs from 'fs';
import multer from 'multer';

import uploadsDir from '../storage/uploadsDir';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${String(Date.now())}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
