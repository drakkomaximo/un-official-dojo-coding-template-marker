import React, { useEffect, useState } from "react";

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
  lists: {
    title: string;
    items: { name: string }[]; 
  }[];
}

const Preview: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    // Recuperamos los datos del formulario del localStorage
    const data: FormData = JSON.parse(localStorage.getItem("formData") || "{}");
    setFormData(data);
  }, []);

  // Función para copiar los datos al portapapeles en formato Markdown
  const copyToClipboard = () => {
    if (formData) {
      const formattedData = `
# [${formData.category}]: ${formData.title}

Hi @${formData.directedTo} and everyone!, I'm a Dojo Coding member  

${formData.description}

## Steps to Resolve:
${formData.lists
  .map(
    (list, index) => `
<details>
  <summary><strong>${index + 1}) ${list.title}</strong></summary>
  <ul>
    ${list.items.map((item) => `<li>${item.name}</li>`).join("")}
  </ul>
</details>
`
  )
  .join("")}

---

**Estimated Time:** ${formData.estimatedTime.start}-${
        formData.estimatedTime.end
      } ${formData.estimatedTime.unit}

**Gratitude:** ${formData.gratitude}
      `;
      navigator.clipboard.writeText(formattedData).then(() => {
        alert("¡Datos copiados al portapapeles en formato Markdown!");
      });
    }
  };

  if (!formData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-6">
      <pre className="bg-gray-100 p-4 rounded-md text-sm">
        {`**[${formData.category}]: ${formData.title}**`}

        <div className="bg-white p-4 rounded-md max-h-40 overflow-y-auto">
          <div>
            Hi @{formData.directedTo} and everyone!, I'm a Dojo Coding member
          </div>
          <div>{formData.description}</div>
        </div>

        {`\n## Steps to Resolve:`}
        <div className="bg-white p-4 rounded-md max-h-40 overflow-y-auto">
        {formData.lists.map((list, idx) => (
          <div key={idx}>
            {`### ${list.title}:`}
            {list.items.map((item, index) => (
              <div key={index}>{`- ${item.name}`}</div>
            ))}
          </div>
        ))}
        </div>

        {`\n**Estimated Time:** ${formData.estimatedTime.start}-${formData.estimatedTime.end} ${formData.estimatedTime.unit}`}

        <div className="bg-white p-4 rounded-md max-h-40 overflow-y-auto">
          <div>{formData.gratitude}</div>
        </div>
      </pre>

      <button
        onClick={copyToClipboard}
        className="mt-4 bg-green-500 text-white p-2 rounded-md"
      >
        Copiar al Portapapeles (Markdown)
      </button>
    </div>
  );
};

export default Preview;
