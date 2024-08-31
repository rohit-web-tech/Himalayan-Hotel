import { useState, useEffect } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import ImagePreview from './ImagePreview'
import { message } from "antd";
import Loader from '../loader';
import { fetchData, fetchGetData } from '../../lib/fetchData';

const About = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        imageUrl: ""
    })
    const [loading, setLoading] = useState(true);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);

    const getData = async () => {
        const res = await fetchGetData("/about", setLoading);
        if (res?.success) {
            setData(res?.data || {
                title: "",
                description: "",
                imageUrl: ""
            });
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const addNewData = async () => {
        if (!data?.title || !data?.description || !data?.imageUrl) {
            message.warning("Please fill all the fields!!");
            return;
        }

        const res = await fetchData("/about", setFormSubmitLoading, "POST", data);
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
    }

    const handleUserInput = (e) => {
        setData(data => ({ ...data, [e.target.name]: e.target.value }))
    }

    return (
        <div className='sm:px-14 px-6 mb-3 mt-4 w-full md:w-[calc(100%-300px)]  flex flex-col justify-center'>
            {
                loading ? (
                    <Loader styles="h-10 w-10 my-[calc(50vh-40px)]" />
                ) : (
                    <>
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
                            <Submit value={formSubmitLoading ? <Loader styles='h-4 w-4' /> : "Save Changes"} />
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default About