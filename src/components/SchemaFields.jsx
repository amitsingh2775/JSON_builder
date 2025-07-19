import { v4 as uuidv4 } from 'uuid';

export default function SchemaField({ fields, setFields }) {

  // Kisi specific field ka key aur type update karne wala function
  const updatefield = (id, key, type) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              key,
              type,
              // agar type nested hai toh children ko empty array ya existing children de do
              children: type === 'nested' ? field.children || [] : undefined,
            }
          : field
      )
    );
  };

  // Field ko delete karne ka function
  const deletefield = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Nested type wale field mein ek aur nested field add karne ka logic
  const addNestedField = (id) => {
    setFields(
      fields.map((field) =>
        field.id === id && field.type === 'nested'
          ? {
              ...field,
              children: [
                ...(field.children || []), // existing nested fields ya empty array
                { id: uuidv4(), key: '', type: 'string' }, // new nested field
              ],
            }
          : field
      )
    );
  };

  // Nested field ke children ko update karne ka function
  const updateNestedFields = (id, children) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, children } : field
      )
    );
  };

  return (
    <div className="space-y-4">
      
      {fields.length === 0 && (
        <p className="text-gray-500 text-center">No fields added yet.</p>
      )}

     
      {fields.map((field) => (
        <div key={field.id} className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

           
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/3"
              value={field.key}
              onChange={(e) => updatefield(field.id, e.target.value, field.type)}
              placeholder="Field Key"
            />

         
            <select
              className="border border-gray-300 px-3 py-2 rounded w-full sm:w-1/4"
              value={field.type}
              onChange={(e) => updatefield(field.id, field.key, e.target.value)}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="nested">Nested</option>
            </select>

       
            <div className="flex gap-2">
              <button
                onClick={() => deletefield(field.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
              {field.type === 'nested' && (
                <button
                  onClick={() => addNestedField(field.id)}
                  className="text-green-600 hover:underline text-sm"
                >
                  + Add Nested
                </button>
              )}
            </div>
          </div>

       
          {field.type === 'nested' && field.children && (
            <div className="ml-4 mt-3 border-l border-gray-200 pl-4">
              <SchemaField
                fields={field.children}
                setFields={(newChildren) => updateNestedFields(field.id, newChildren)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
