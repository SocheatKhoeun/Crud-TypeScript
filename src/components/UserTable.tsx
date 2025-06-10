import React from "react";
import { Trash2, Edit } from "lucide-react";
import { User } from "../models/User";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  isEditingOrAdding: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  isEditingOrAdding,
}) => (
  <div className="overflow-x-auto rounded-xl">
    <table className="w-full">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-12 py-3 text-left font-semibold">#</th>
          <th className="px-12 py-3 text-left font-semibold">Name</th>
          <th className="px-12 py-3 text-left font-semibold">Gender</th>
          <th className="px-12 py-3 text-left font-semibold">Age</th>
          <th className="px-12 py-3 text-left font-semibold">Address</th>
          <th className="px-12 py-3 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-12 py-8 text-center text-gray-500">
              No users found. Click "Add User" to create the first user.
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-12 py-3 text-gray-700">{index + 1}</td>
              <td className="px-12 py-3 text-gray-900 font-medium">
                {user.name}
              </td>
              <td className="px-12 py-3 text-gray-700 capitalize">
                {user.gender}
              </td>
              <td className="px-12 py-3 text-gray-700">{user.age}</td>
              <td className="px-12 py-3 text-gray-700">{user.address}</td>
              <td className="px-12 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    disabled={isEditingOrAdding}
                    className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    {/* Footer */}
        <div className="bg-gray-100 px-4 py-3 text-sm text-gray-600">
          Total Users: {users.length}
        </div>
  </div>
);

export default UserTable;
