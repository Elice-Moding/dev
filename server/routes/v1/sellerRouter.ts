import express from "express";
import sellerController from "../../controllers/sellerController";
import asyncHandler from "../../utils/asyncHandler";
import isAuthenticated from "../../middleware/isAuthenticated";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "mainImageUrl", maxCount: 1 },
    { name: "imageUrls", maxCount: 5 },
  ]),
  asyncHandler(sellerController.createFunding)
);

export default router;
