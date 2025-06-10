import React from "react";
import { Save, X } from "lucide-react";

export interface FormData {
  name: string;
  gender: string;
  age: string;
  address: string;
}

interface UserFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  formData,
  onChange,
  onSave,
  onCancel,
}) => (
  <div className="p-4 bg-blue-50 border-b mb-4 rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter age"
          min="1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter address"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center gap-1 transition-colors"
        >
          <Save size={16} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md flex items-center gap-1 transition-colors"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default UserForm;
