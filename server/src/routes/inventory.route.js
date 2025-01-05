import {
    AddInventory,
    EditInventory,
    clubInventoryToRoom,
    deleteInventory,
    deleteInventoryClubbedToRoom,
    editInventoryClubbedToRoom,
    fetchAllInventories,
    fetchInventories,
    getRoomInventory
} from "../controllers/inventory.controller.js";
import { Router } from "express";
import { adminAuth, auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/")
    .post(auth, adminAuth, AddInventory)
    .patch(auth, adminAuth, EditInventory)
    .delete(auth, adminAuth, deleteInventory)

router.route("/all")
    .get(auth, adminAuth, fetchInventories);

router.route("/allWithQuantity")
    .get(auth, adminAuth, fetchAllInventories);

router.route("/room")
    .post(auth,adminAuth,clubInventoryToRoom)
    .patch(auth,adminAuth,editInventoryClubbedToRoom)
    .delete(auth,adminAuth,deleteInventoryClubbedToRoom)

router.route("/room/:id")
    .get(auth, adminAuth, getRoomInventory);

export default router;