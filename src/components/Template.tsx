import React, { useEffect, useState } from "react";
import type { FormData } from "../interfaces/general";
import Spinner from "./Spinner";
import { defaultFormData } from "../utils/defaultData";
import { formattedData } from "../utils/helpers";

const Preview: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const data: FormData = JSON.parse(localStorage.getItem("formData") || "{}");
    const formDataToLoad =
      Object.keys(data).length === 0 ? defaultFormData : data;

    setFormData(formDataToLoad);
    setIsLoading(false);
  }, []);

  const copyToClipboard = () => {
    if (formData) {
      navigator.clipboard.writeText(formattedData(formData)).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!formData) {
    return <div>Loading...</div>;
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
        <div className="bg-white p-4 rounded-md max-h-28 overflow-y-auto">
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
        className={`mt-4 font-bold text-white p-2 rounded-md transition-colors duration-300 ${
          isCopied ? "bg-orange-500 cursor-not-allowed" : "bg-blue-500"
        }`}
        disabled={isCopied}
      >
        {isCopied ? "Template copied successfully" : "Copy to clipboard (Markdown)"}
      </button>
    </div>
  );
};

export default Preview;
