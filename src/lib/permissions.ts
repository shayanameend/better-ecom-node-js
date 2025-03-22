import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  category: [
    "suggest",
    "approve",
    "list-approved",
    "create",
    "list-all",
    "update",
    "delete",
  ],
} as const;

export const ac = createAccessControl(statement);

export const userRole = ac.newRole({
  category: ["list-approved"],
});

export const vendorRole = ac.newRole({
  category: ["suggest", "list-approved"],
});

export const adminRole = ac.newRole({
  ...adminAc.statements,
  category: ["approve", "create", "list-all", "update", "delete"],
});
