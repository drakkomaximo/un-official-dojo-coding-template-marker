import React, { useState } from 'react';

export const ListItems: React.FC<any> = ({ list, index, formData, setFormData }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (_: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (_: React.DragEvent<HTMLUListElement>, targetIndex: number) => {
    if (draggedIndex !== null) {
      const draggedItem = list.items[draggedIndex];
      const updatedItems = [...list.items];
      updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(targetIndex, 0, draggedItem);

      const updatedLists = [...formData.lists];
      updatedLists[index].items = updatedItems;
      setFormData({ ...formData, lists: updatedLists });
    }
  };

  const removeItem = (itemIndex: number) => {
    const updatedItems = list.items.filter((_: any, index: number) => index !== itemIndex);
    const updatedLists = [...formData.lists];
    updatedLists[index].items = updatedItems;
    setFormData({ ...formData, lists: updatedLists });
  };

  const removeList = () => {
    console.log(formData)
    const updatedLists = formData.lists.filter((_: any, idx: any) => idx !== index);
    setFormData({ ...formData, lists: updatedLists });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{list.title}</h3>
      <ul
        className="list-disc pl-6 space-y-1"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, 0)}
      >
        {list.items.map((item: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, itemIndex: number) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, itemIndex)}
            className="cursor-pointer"
          >
            {item.name}
            <button
              onClick={() => removeItem(itemIndex)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={removeList}
        className="mt-2 text-red-500 hover:text-red-700"
      >
        Eliminar lista
      </button>
    </div>
  );
};
