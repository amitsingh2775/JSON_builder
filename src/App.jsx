import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";
import JSONprev from "./components/JSONprev";
import SchemaFields from "./components/SchemaFields";

export default function App() {
  const [fields, setFields] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        
        <div className="flex flex-col max-h-[80vh] overflow-y-auto pr-2">
          <h2 className="text-4xl font-semibold text-[#2d98da] mb-4 sticky top-0 bg-gray-100 z-10">
            Schema Builder
          </h2>

          <SchemaFields fields={fields} setFields={setFields} />

          <div className="w-full flex justify-center">
            <button
              className="mt-4 px-4 py-2 bg-[#1289A7] text-white rounded shadow hover:bg-blue-700 flex items-center gap-2"
              onClick={() =>
                setFields([...fields, { id: uuidv4(), key: '', type: 'string' }])
              }
            >
              <Plus className="w-4 h-4" />
              Add Field
            </button>
          </div>
        </div>

       
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#1e272e]">
            JSON Output
          </h2>
          <JSONprev fields={fields} />
        </div>
      </div>
    </div>
  );
}
