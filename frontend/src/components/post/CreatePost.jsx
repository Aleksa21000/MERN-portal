import { useRef, useState } from "react";
import usePostMutations from "../../hooks/usePostMutation";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

const CreatePost = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const imgRef = useRef(null);

    const { createPostMutation } = usePostMutations();

    const handleSubmit = (e) => {
        e.preventDefault();
        createPostMutation.mutate(
            { text, img },
            {
                onSuccess: () => {
                    setText("");
                    setImg(null);
                },
            }
        );
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImg(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex p-4 items-start gap-4 border-b border-gray-700">
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                <textarea
                    className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none"
                    placeholder="What is happening?!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {img && (
                    <div className="relative w-full mx-auto">
                        <IoCloseSharp
                            className="absolute top-3 right-3 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                            onClick={() => {
                                setImg(null);
                                imgRef.current.value = null;
                            }}
                        />
                        <img src={img} className="w-full mx-auto h-auto object-contain rounded" />
                    </div>
                )}
                <div className="flex justify-between border-t py-2 border-t-gray-700">
                    <CiImageOn
                        className="fill-primary w-6 h-6 cursor-pointer"
                        onClick={() => imgRef.current.click()}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={imgRef}
                        onChange={handleImgChange}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                        {createPostMutation.isPending ? "Posting..." : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
