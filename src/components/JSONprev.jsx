import { useState } from 'react';
import { Copy } from 'lucide-react';
import {buildJSON} from "../jsonBuilder"
 

// function buildJSON(fields) {
//   const result = {};
//   fields.forEach((field) => {
//     if (!field.key) return;
//     if (field.type === 'nested') {
//       result[field.key] = buildJSON(field.children || []);
//     } else {
//       result[field.key] = field.type;
//     }
//   });
//   return result;
// }

export default function JsonPreview({ fields }) {
  const [copied, setCopied] = useState(false);
  const jsonData = JSON.stringify(buildJSON(fields), null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center gap-1 text-[#1e272e] hover:underline text-sm"
      >
        <Copy size={16} /> {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto border border-gray-200">
        {jsonData}
      </pre>
    </div>
  );
}
