import React, { useState, useEffect } from "react";
import Modal from "./Modal";

interface ListItem {
  id: number;
  name: string;
}

interface List {
  title: string;
  items: ListItem[];
}

interface FormData {
  title: string;
  directedTo: string;
  description: string;
  category: string;
  estimatedTime: {
    start: number;
    end: number;
    unit: string;
  };
  gratitude: string;
  lists: List[];
}

const Formulary: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    directedTo: "",
    description: "",
    category: "",
    estimatedTime: {
      start: 0,
      end: 0,
      unit: "days",
    },
    gratitude: "",
    lists: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem("formData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        estimatedTime: {
          ...prevData.estimatedTime,
          [name]:
            name === "start" || name === "end" ? parseInt(value, 10) : value,
        },
      };
      localStorage.setItem("formData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
      <form className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter the title"
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="directedTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Directed To:
                </label>
                <input
                  type="text"
                  id="directedTo"
                  name="directedTo"
                  value={formData.directedTo}
                  onChange={handleChange}
                  placeholder="Enter who it's directed to"
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category:
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="FE">Frontend</option>
                  <option value="BE">Backend</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter the description"
                  rows={4}
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="estimatedTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estimated Time:
                </label>
                <div className="flex space-x-4 mt-2">
                  <input
                    type="number"
                    name="start"
                    value={formData.estimatedTime.start}
                    onChange={handleTimeChange}
                    placeholder="Start"
                    className="w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    name="end"
                    value={formData.estimatedTime.end}
                    onChange={handleTimeChange}
                    placeholder="End"
                    className="w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-md"
                  />
                  <select
                    name="unit"
                    value={formData.estimatedTime.unit}
                    onChange={handleTimeChange}
                    className="w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-md"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="gratitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gratitude:
                </label>
                <textarea
                  id="gratitude"
                  name="gratitude"
                  value={formData.gratitude}
                  onChange={handleChange}
                  placeholder="Write your gratitude message"
                  rows={4}
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800">
              Steps to Resolve:
            </h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-blue-500 text-white p-3 rounded-md"
            >
              Create New List
            </button>
            <div className="mt-6 space-y-4 max-h-[500px] overflow-y-auto">
              {formData.lists.map((list, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md border"
                >
                  <h4 className="text-lg font-semibold">{list.title}</h4>
                  <ul className="list-disc pl-4">
                    {list.items.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      const updatedLists = [...formData.lists];
                      updatedLists.splice(index, 1);
                      setFormData({ ...formData, lists: updatedLists });
                    }}
                    className="mt-2 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(title, items) => {
          setFormData((prevData) => ({
            ...prevData,
            lists: [
              ...prevData.lists,
              {
                title,
                items: items.map((item, idx) => ({ id: idx, name: item })),
              },
            ],
          }));
        }}
      />
    </div>
  );
};

export default Formulary;
