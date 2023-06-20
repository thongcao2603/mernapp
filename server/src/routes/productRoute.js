import express from "express";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
} from "../controllers/productController";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, createProductController);
router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/product-category/:slug", productCategoryController);

export default router;
