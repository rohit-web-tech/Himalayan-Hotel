import Form, { FormField } from "./form/Form";
import Wrapper from "./Wrapper";

export default function CreateProductPage() {
  const fields: FormField[] = [
    { label: "Room Name", name: "name", type: "text", required: true },
    { label: "Capacity", name: "price", type: "number", required: true },
    { label: "Number of rooms", name: "price", type: "number", required: true },
    { label: "Rent", name: "price", type: "number", required: true },
    { label: "Description", name: "description", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, any>, image: File | null) => {
    console.log("Submitted data:", data);
    if (image) {
      console.log("Image file:", image);
    }
  };

  return (
    <Wrapper>
      <div className="min-h-screen py-6">
        <Form fields={fields} onSubmit={handleSubmit} title="Add new room" />
      </div>
    </Wrapper>
  );
}
