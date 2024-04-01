import express from "express";
import * as authController from "../controllers/auth.js";
import * as userController from "../controllers/user.js";
import * as rbacController from "../controllers/role.js";
import * as profileController from "../controllers/profile.js";
import * as stsController from "../controllers/sts.js";
import * as landfillController from "../controllers/landfill.js";
import * as vehicleController from "../controllers/vehicle.js";
import * as dashboardController from "../controllers/dashboard.js";
import {
  landfillManagerOnly,
  stsManagerOnly,
  systemAdminOnly,
} from "../middlewares/auth.js";

const router = express.Router();

// Authentication Endpoints
router.get("/auth/logout", authController.logout);
router.post("/auth/login", authController.login);
router.post(
  "/auth/reset-password/initiate",
  authController.initiatePasswordReset
);
router.post(
  "/auth/reset-password/confirm",
  authController.confirmPasswordReset
);
router.post("/auth/change-password", authController.changePassword);

// User Management Endpoints
router.get("/users/unassigned", userController.getUnassignedUsers);
router.get("/users", systemAdminOnly, userController.getAllUsers);
router.get("/users/:userId", userController.getUserById);
router.post("/users", systemAdminOnly, userController.createUser);
router.put("/users/:userId", userController.updateUser);
router.delete("/users/:userId", systemAdminOnly, userController.deleteUser);
router.get("/users/rbac/roles", systemAdminOnly, userController.getAllRoles);
router.put("/users/:userId/roles", userController.updateUserRoles);

// Role Management Endpoints
router.post("/rbac/roles", systemAdminOnly, rbacController.createRole);
router.get("/rbac/roles", systemAdminOnly, rbacController.getAllRoles);
router.get("/rbac/roles/:roleId", systemAdminOnly, rbacController.getRoleById);
router.put(
  "/rbac/roles/:roleId",
  systemAdminOnly,
  rbacController.updateRoleById
);
router.delete(
  "/rbac/roles/:roleId",
  systemAdminOnly,
  rbacController.deleteRoleById
);

// Profile Management Endpoints
router.get("/profile", profileController.getUserProfile);
router.put("/profile", profileController.updateUserProfile);

// STS Management Endpoints
router.post("/sts", systemAdminOnly, stsController.createSTS);
router.get("/sts", stsController.getAllSTS);
router.get("/sts/:stsId", systemAdminOnly, stsController.getSTSById);
router.put("/sts/:stsId", systemAdminOnly, stsController.updateSTS);
router.delete("/sts/:stsId", systemAdminOnly, stsController.deleteSTS);
router.put(
  "/sts/:stsId/managers",
  systemAdminOnly,
  stsController.assignSTSManagers
);
router.put(
  "/sts/:stsId/trucks",
  systemAdminOnly,
  stsController.assignTrucksToSTS
);
router.get(
  "/sts/managers/unassigned",
  systemAdminOnly,
  stsController.getUnassignedSTSManagers
);
router.get(
  "/sts/vehicles/unassigned",
  systemAdminOnly,
  stsController.getUnassignedVehicles
);
router.get("/sts/vehicles/:stsId", stsController.getSTSVehicles);
router.get(
  "/sts/details/:managerId",
  stsManagerOnly,
  stsController.getSTSByManagerId
);
router.get(
  "/sts/managers/:stsId",

  stsController.getSTSManagers
);
router.get(
  "/sts/entries/:stsID",
  stsManagerOnly,
  stsController.getAllEntriesBySTSId
);
router.post(
  "/sts/add-vehicle-entry",
  stsManagerOnly,
  stsController.addVehicleEntry
);
router.post("/sts/optimize-route", stsManagerOnly, stsController.optimizeRoute);
router.post("/sts/optimize-fleet", stsManagerOnly, stsController.optimizeFleet);
router.get("/sts/overview/:stsId", stsController.getSTSOverview);

// Landfill Management Endpoints
router.post("/landfills", systemAdminOnly, landfillController.createLandfill);
router.get("/landfills", landfillController.getAllLandfills);
router.get(
  "/landfills/:landfillId",
  systemAdminOnly,
  landfillController.getLandfillById
);
router.put(
  "/landfills/:landfillId",
  systemAdminOnly,
  landfillController.updateLandfill
);
router.delete(
  "/landfills/:landfillId",
  systemAdminOnly,
  landfillController.deleteLandfill
);
router.put(
  "/landfills/:landfillId/managers",
  systemAdminOnly,
  landfillController.assignLandfillManagers
);
router.get(
  "/landfills/managers/unassigned",
  systemAdminOnly,
  landfillController.getUnassignedLandfillManagers
);
router.get(
  "/landfill/details/:managerId",
  landfillManagerOnly,
  landfillController.getLandfillByManagerId
);
router.get(
  "/landfill/managers/:landfillId",
  landfillController.getLandfillManagers
);
router.get(
  "/landfill/overview/:landfillId",
  landfillController.getLandfillOverview
);
router.get(
  "/landfill/entries/:landfillId",
  landfillManagerOnly,
  landfillController.getAllEntriesByLandfillId
);
router.post(
  "/landfills/add-truck-dumping-entry",
  landfillManagerOnly,
  landfillController.addTruckDumpingEntry
);
router.post(
  "/landfills/generate-billing-slip",
  landfillManagerOnly,
  landfillController.generateBillingSlip
);
router.get(
  "/landfill/all-billing-slip/:landfillId",
  landfillManagerOnly,
  landfillController.getAllBillingSlipsByLandfillId
);

//Vehicle Management Endpoints
router.post("/vehicle", systemAdminOnly, vehicleController.createVehicle);
router.get("/vehicle", vehicleController.getAllVehicles);
router.get("/vehicle/:id", systemAdminOnly, vehicleController.getVehicleById);
router.put("/vehicle/:id", systemAdminOnly, vehicleController.updateVehicle);
router.delete("/vehicle/:id", systemAdminOnly, vehicleController.deleteVehicle);

// Dashboard Statistics Endpoints
router.get(
  "/dashboard-statistics",
  systemAdminOnly,
  dashboardController.getDashboardStatistics
);

export default router;
