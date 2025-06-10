import React, { useState } from "react";
import { Plus } from "lucide-react";
import { User } from "./models/User";
import UserForm, { FormData } from "./components/UserForm";
import UserTable from "./components/UserTable";
import Swal from "sweetalert2"; // Import SweetAlert2

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Dara", gender: "male", age: 25, address: "PP" },
  ]);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "male",
    age: "",
    address: "",
  });

  const resetForm = (): void => {
    setFormData({
      name: "",
      gender: "male",
      age: "",
      address: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (): Promise<void> => {
    setIsAddingNew(true);
    resetForm();
    // Removed SweetAlert for Add User
  };

  const handleSave = async (): Promise<void> => {
    if (
      !formData.name.trim() ||
      !formData.age.trim() ||
      !formData.address.trim()
    ) {
      await Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all fields",
        icon: "warning",
      });
      return;
    }

    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum <= 0) {
      await Swal.fire({
        title: "Invalid Age",
        text: "Please enter a valid age",
        icon: "error",
      });
      return;
    }

    if (editingId !== null) {
      // Update existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingId
            ? {
                ...user,
                name: formData.name,
                gender: formData.gender,
                age: ageNum,
                address: formData.address,
              }
            : user
        )
      );
      setEditingId(null);
      await Swal.fire({
        title: "User Updated",
        text: "The user has been updated successfully.",
        icon: "success",
      });
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now(), // Simple ID generation
        name: formData.name,
        gender: formData.gender,
        age: ageNum,
        address: formData.address,
      };
      setUsers((prev) => [...prev, newUser]);
      setIsAddingNew(false);
      await Swal.fire({
        title: "User Added",
        text: "The user has been added successfully.",
        icon: "success",
      });
    }

    resetForm();
  };

  const handleEdit = async (user: User): Promise<void> => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      gender: user.gender,
      age: user.age.toString(),
      address: user.address,
    });
  };

  const handleCancel = (): void => {
    setIsAddingNew(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: number): Promise<void> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      await Swal.fire({
        title: "Deleted!",
        text: "The user has been deleted.",
        icon: "success",
      });
    }
  };

  return (
    <div className="overflow-hidden px-6 py-4">
      {/* Header */}
      <div className="text-white flex justify-end items-center mb-4">
        <button
          onClick={handleAdd}
          disabled={isAddingNew || editingId !== null}
          className={`border border-blue-500 text-black bg-transparent ${
            isAddingNew || editingId !== null
              ? "bg-blue-300 cursor-not-allowed"
              : "hover:bg-blue-500"
          } px-4 py-2 rounded-md flex items-center gap-2 transition-colors`}
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId !== null) && (
        <UserForm
          formData={formData}
          onChange={handleInputChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Table */}
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isEditingOrAdding={isAddingNew || editingId !== null}
      />
    </div>
  );
};

export default App;
