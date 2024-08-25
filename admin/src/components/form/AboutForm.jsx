import { useState, useEffect } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import ImagePreview from './ImagePreview'
import { message } from "antd";

const About = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [data, setData] = useState({
        title: "",
        description: "",
        imageUrl: ""
    })

    const getData = async () => {
        fetch(`${BASE_URL}/getAbout`)
            .then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    setData(res?.about || {
                        title: "",
                        description: "",
                        imageUrl: ""
                    });
                }
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, [])

    const addNewData = () => {
        if (!data?.title || !data?.description || !data?.imageUrl) {
            message.warning("Please fill all the fields!!");
            return;
        }
        fetch(`${BASE_URL}/setAbout`, {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("About details edited successfully!!");
                    setData(res?.about || {
                        title: "",
                        description: "",
                        imageUrl: ""
                    });
                } else {
                    message.error(res.message);
                }
            }).catch(err => {
                message.error(err);
            })
    }

    const handleUserInput = (e) => {
        setData(data => ({ ...data, [e.target.name]: e.target.value }))
    }

    return (
        <div className='px-14 w-[calc(100%-300px)] h-[90vh] flex flex-col justify-center'>
            <h3 className='text-base text-gray-700 font-semibold mb-2 mt-3'>About</h3>
            <form className='flex flex-col gap-2' onSubmit={(e) => {
                e.preventDefault();
                addNewData();
            }}>
                <InputBox
                    handleUserInput={handleUserInput}
                    name="title"
                    type="text"
                    placeholder="Enter Title"
                    value={data?.title}
                    label="Title"
                />
                <div>
                    <label htmlFor="" className='text-xs'>Description</label>
                    <textarea
                        onChange={handleUserInput}
                        name="description"
                        type="text"
                        placeholder="Enter description"
                        value={data?.description}
                        className='w-full bg-transparent text-gray-600 rounded-md border-2 border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500 h-40'
                    />
                </div>
                <InputBox
                    handleUserInput={handleUserInput}
                    name="imageUrl"
                    type="text"
                    placeholder="Enter Image Url"
                    value={data?.imageUrl}
                    label="Image"
                />
                <ImagePreview
                    src={data?.imageUrl}
                />
                <Submit value={"Save Changes"} />
            </form>
        </div>
    )
}

export default About