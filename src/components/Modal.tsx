import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, items: string[]) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newListTitle, setNewListTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10);
    const updatedItems = [...items];
    const draggedItem = updatedItems[draggedIndex];
    updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onReset = () => {
    onClose();
    setNewListTitle("");
    setNewItem("");
    setItems([]);
  };

  const handleSave = () => {
    onSave(newListTitle, items);
    onReset();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Crear nueva lista
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título de la lista:
              </label>
              <input
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                className="w-full mt-2 p-2 bg-gray-100 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Nuevo item:
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="w-full mt-2 p-2 bg-gray-100 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleAddItem}
                  className="ml-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Agregar
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={onReset}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Guardar lista
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
