import { Editor } from "@tinymce/tinymce-react";
import Wrapper from "../components/Wrapper";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Send } from "lucide-react";

const Newsletters = () => {

    const {themeColor} = useGlobalContext() ;

    const handleEditorChange = (content: string) => {
        console.log("Email HTML:", content);
    };

    return (
        <div
            className="py-5"
        >
            <Wrapper>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
                    <h1 className="text-2xl font-semibold text-main-text">
                        Send a Newsletter
                    </h1>
                    <button
                    className="flex text-sm items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center cursor-pointer"
                    onClick={()=>{}}
                    style={{
                        background: themeColor
                    }}
                >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                </button>
                </div>
                <Editor
                    apiKey="ghpyp5q67tj2hxudq5x1itfrn8rfzaec38cojqzmnbuzw01c"
                    init={{
                        height: 600,
                        menubar: false,
                        plugins: "link image code checklist numlist bullist lists table exportword exportpdf",
                        toolbar: "undo redo | blocks fontfamily fontsize |bold italic underline strikethrough | alignleft aligncenter alignright | align lineheight | code image link | checklist numlist bullist indent outdent | table exportword exportpdf",
                    }}
                    onEditorChange={handleEditorChange}
                />
            </Wrapper>
        </div>
    );
};

export default Newsletters;