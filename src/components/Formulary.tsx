import React, { useState, useEffect } from 'react';
import Modal from './Modal';

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
  estimatedTime: number;
  lists: List[];
}

const Formulary: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    directedTo: '',
    description: '',
    estimatedTime: 0,
    lists: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem('formData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const addList = (title: string, items: string[]) => {
    if (title.trim() !== '' && items.length > 0) {
      const newListObj = {
        title: title,
        items: items.map((item, index) => ({
          id: index,
          name: item,
        })),
      };

      setFormData((prevData) => {
        const updatedData = { ...prevData, lists: [...prevData.lists, newListObj] };
        localStorage.setItem('formData', JSON.stringify(updatedData));
        return updatedData;
      });
    }
  };

  const removeList = (index: number) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.lists.splice(index, 1);
      localStorage.setItem('formData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const ListItemComponent = ({ index, list }: { index: number; list: List }) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{list.title}</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-600">
          {list.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <button
          onClick={() => removeList(index)}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          Eliminar
        </button>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Campos normales (izquierda) */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ingresa el título"
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="directedTo" className="block text-sm font-medium text-gray-700">A quién va dirigido:</label>
                <input
                  type="text"
                  id="directedTo"
                  name="directedTo"
                  value={formData.directedTo}
                  onChange={handleChange}
                  placeholder="Ingresa a quién va dirigido"
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Ingresa la descripción"
                  rows={4}
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">Tiempo estimado:</label>
                <input
                  type="number"
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                  placeholder="Tiempo en minutos"
                  className="w-full mt-2 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Listas (derecha) */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800">Listas:</h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-blue-500 text-white p-3 rounded-md"
            >
              Crear nueva lista
            </button>

            <div className="mt-6 space-y-4">
              {formData.lists.map((list, index) => (
                <ListItemComponent key={index} index={index} list={list} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md"
          >
            Enviar
          </button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addList}
      />
    </div>
  );
};

export default Formulary;
