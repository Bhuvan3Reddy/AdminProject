import React, { useState, useEffect } from 'react';
import { Button, Table, Badge, Alert, Spinner, Modal, TextInput, Label } from 'flowbite-react';
import { HiPlus, HiPencil, HiTrash, HiExclamation } from 'react-icons/hi';
import CardBox from 'src/components/shared/CardBox';
import { useRoles } from 'src/hooks/useRoles';

interface Role {
  roleId: string;
  roleName: string;
  createdBy: string;
  createdDate: string;
  modifiedBy?: string;
  modifiedDate: string;
  isActive: boolean;
}

interface RoleFormData {
  roleName: string;
  isActive: boolean;
}

export const RoleManagementPage: React.FC = () => {
  const {
    roles,
    loading,
    error: apiError,
    createRole,
    updateRole,
    deleteRole,
    fetchRoles,
  } = useRoles();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<RoleFormData>({
    roleName: '',
    isActive: true,
  });
  const [formLoading, setFormLoading] = useState(false);

  // Create role
  const handleCreateRole = async () => {
    try {
      setFormLoading(true);
      await createRole({ roleName: formData.roleName });
      setSuccess('Role created successfully');
      setShowCreateModal(false);
      setFormData({ roleName: '', isActive: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  // Update role
  const handleUpdateRole = async () => {
    if (!selectedRole) return;
    
    try {
      setFormLoading(true);
      await updateRole(selectedRole.roleId, formData);
      setSuccess('Role updated successfully');
      setShowEditModal(false);
      setSelectedRole(null);
      setFormData({ roleName: '', isActive: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  // Delete role
  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    
    try {
      setFormLoading(true);
      await deleteRole(selectedRole.roleId);
      setSuccess('Role deleted successfully');
      setShowDeleteModal(false);
      setSelectedRole(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      roleName: role.roleName,
      isActive: role.isActive,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (role: Role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error || apiError) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error, apiError]);

  // Initial load
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-ld dark:text-white">Role Management</h1>
          <p className="text-darklink dark:text-bodytext">Manage system roles and permissions</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <HiPlus className="mr-2" />
          Create Role
        </Button>
      </div>

      {/* Alerts */}
      {(error || apiError) && (
        <Alert color="failure" onDismiss={() => { setError(null); }}>
          {error || apiError}
        </Alert>
      )}

      {success && (
        <Alert color="success" onDismiss={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Roles Table */}
      <CardBox>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Spinner size="lg" />
            <span className="ml-3">Loading roles...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Role Name</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Created By</Table.HeadCell>
                <Table.HeadCell>Created Date</Table.HeadCell>
                <Table.HeadCell>Modified By</Table.HeadCell>
                <Table.HeadCell>Modified Date</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {roles.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={7} className="text-center py-8">
                      No roles found. Create your first role to get started.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  roles.map((role) => (
                    <Table.Row key={role.roleId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="font-medium text-gray-900 dark:text-white">
                        {role.roleName}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color={role.isActive ? "success" : "failure"}>
                          {role.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{role.createdBy}</Table.Cell>
                      <Table.Cell>{formatDate(role.createdDate)}</Table.Cell>
                      <Table.Cell>{role.modifiedBy || '-'}</Table.Cell>
                      <Table.Cell>{formatDate(role.modifiedDate)}</Table.Cell>
                      <Table.Cell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            color="light"
                            onClick={() => openEditModal(role)}
                          >
                            <HiPencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            color="failure"
                            onClick={() => openDeleteModal(role)}
                          >
                            <HiTrash className="w-4 h-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        )}
      </CardBox>

      {/* Create Role Modal */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <Modal.Header>Create New Role</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="roleName" value="Role Name" />
              <TextInput
                id="roleName"
                placeholder="Enter role name"
                value={formData.roleName}
                onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleCreateRole}
            disabled={formLoading || !formData.roleName.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            {formLoading ? <Spinner size="sm" className="mr-2" /> : null}
            Create Role
          </Button>
          <Button color="gray" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Role Modal */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Header>Edit Role</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editRoleName" value="Role Name" />
              <TextInput
                id="editRoleName"
                placeholder="Enter role name"
                value={formData.roleName}
                onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isActive" value="Active" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleUpdateRole}
            disabled={formLoading || !formData.roleName.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            {formLoading ? <Spinner size="sm" className="mr-2" /> : null}
            Update Role
          </Button>
          <Button color="gray" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Role Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <div className="flex items-center">
            <HiExclamation className="text-red-500 mr-2" />
            Confirm Delete
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete the role "{selectedRole?.roleName}"? 
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={handleDeleteRole}
            disabled={formLoading}
          >
            {formLoading ? <Spinner size="sm" className="mr-2" /> : null}
            Delete
          </Button>
          <Button color="gray" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
