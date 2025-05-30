import { useState, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useSelector } from "react-redux";

export default function AdminProfileEdit() {
  const SERVER_URL = import.meta.env.VITE_BASE_URL ;
  const userData = useSelector((state : any)=>state?.user?.userData);
  const initialImage = userData?.image || "" ; 
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(SERVER_URL + initialImage);
  const [form,setForm] = useState({
    name:userData?.name,
    email:userData?.email,
    contactNumber:userData?.contactNumber,
  })
  const {themeColor} = useGlobalContext();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", profileImage || initialImage );
    formData.append("name", form?.name);
    formData.append("email", form?.email);
    formData.append("contactNumber", form?.contactNumber);

    

  };

  const handleUserInput = (e : any) => {
    setForm({...form,[e.target.name]:e.target.value})
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-main-text">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-main-bg p-6 rounded-2xl shadow">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <img
              src={previewUrl || "/default-avatar.png"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border"
            />
            <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-black p-1.5 rounded-full cursor-pointer hover:bg-gray-800">
              <Camera className="h-4 w-4 text-white" />
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h2 className="text-lg font-medium text-main-text">{form?.name}</h2>
            <p className="text-sm text-secondary-text">{form?.email}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text">Full Name</label>
          <input
            type="text"
            name="name"
            value={form?.name}
            onChange={handleUserInput}
            className="mt-1 p-2 w-full rounded-md outline-0 shadow-sm focus:outline-1 text-sm bg-secondary-bg text-secondary-text"
            required
            style={{
                outlineColor: themeColor
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text">Email</label>
          <input
            type="email"
            name="email"
            value={form?.email}
            onChange={handleUserInput}
            className="mt-1 p-2 w-full rounded-md outline-0 shadow-sm focus:outline-1 text-sm bg-secondary-bg text-secondary-text"
            required
            style={{
                outlineColor: themeColor
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text">Contact</label>
          <input
            type="number"
            name="contactNumber"
            value={form?.contactNumber}
            onChange={handleUserInput}
            className="mt-1 p-2 w-full rounded-md outline-0 shadow-sm focus:outline-1 text-sm bg-secondary-bg text-secondary-text"
            required
            style={{
                outlineColor: themeColor
            }}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-xl px-4 py-2 font-medium text-white cursor-pointer text-sm"
            style={{
                background: themeColor
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
