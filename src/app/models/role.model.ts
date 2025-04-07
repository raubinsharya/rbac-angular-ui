export interface RoleType {
  id: string;
  slug: string;
  title: string;
  entityType: string;
  entityId: null;
  scope: string;
  allowed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
