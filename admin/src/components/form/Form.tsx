import { useState, ChangeEvent, FormEvent } from "react";
import { UploadCloud, X } from "lucide-react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import {Loader} from "lucide-react";

export type FormField = {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "textarea" | "password";
  placeholder?: string;
  required?: boolean;
};

type AdminFormProps = {
  fields: FormField[];
  onSubmit: (data: Record<string, any>, image: File | null) => void;
  title: string;
  loading?: boolean;
  intialData?: any;
  isEditing?: boolean;
  goBackHandler?: () => void;
};

export default function Form({
  fields,
  onSubmit,
  title,
  loading = false,
  intialData = {},
  isEditing = false,
  goBackHandler
}: AdminFormProps) {
  const SERVER_URL = import.meta.env.VITE_BASE_URL ;
  const initialImageUrl = intialData?.image ? intialData?.image : intialData?.imageUrl ? intialData?.imageUrl : "";
  const [formData, setFormData] = useState<Record<string, any>>(intialData || {});
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ? SERVER_URL + initialImageUrl : "");

  const { themeColor } = useGlobalContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({...formData, image : initialImageUrl}, image);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-main-bg border border-border rounded-2xl shadow-2xl p-10 space-y-8 transition"
    >
      <div 
        className="w-full flex justify-between items-center"
      >
        <h2 className="text-2xl font-semibold text-main-text">{title || "Admin Entry Form"}</h2>
        <X
          className="text-gray w-6 h-6 cursor-pointer"
          onClick={goBackHandler}
        />
      </div>

      {/* Image Upload */}
      <div className="flex items-center gap-6">
        <div className="relative h-32 w-32 rounded-xl border-2 border-dashed border-gray bg-main-bg flex items-center justify-center overflow-hidden hover:border-blue-400 transition">
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
              <button
                type="button"
                onClick={resetImage}
                className="absolute top-1 right-1 bg-white dark:bg-gray-900 p-1 rounded-full shadow hover:bg-red-100 dark:hover:bg-red-900 transition"
              >
                <X size={14} className="text-red-500" />
              </button>
            </>
          ) : (
            <UploadCloud className="h-6 w-6 text-gray-400" />
          )}
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-sm text-gray">
          Upload product or user image
        </span>
      </div>

      {/* Dynamic Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-sm font-medium text-gray">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                value={formData[field.name]}
                className="w-full h-28 resize-none rounded-lg border border-gray bg-main-bg text-secondary-text px-3 py-2 text-sm shadow-sm transition"
                style={{
                  outlineColor: themeColor
                }}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                value={formData[field.name]}
                style={{
                  outlineColor: themeColor
                }}
                className="w-full rounded-lg border border-gray bg-main-bg text-secondary-text placeholder:text-gray-400 px-3 py-2 text-sm shadow-sm transition"
              />
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 text-white font-medium px-6 py-2.5 rounded-lg shadow transition text-sm cursor-pointer w-full disabled:cursor-progress disabled:opacity-75 hover:opacity-85"
          style={{
            background: themeColor
          }}
          disabled={loading}
        >
          {loading ? (<Loader className="w-4 h-4 animate-spin" />) : (
            (isEditing ? "Save Changes" : "Submit")
          )}
        </button>
      </div>
    </form>
  );
}
