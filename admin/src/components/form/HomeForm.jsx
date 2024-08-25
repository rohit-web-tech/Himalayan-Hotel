import { useState, useEffect } from 'react'
import InputBox from './InputBox'
import Submit from './Submit'
import ImagePreview from './ImagePreview'
import { message } from "antd";

const Home = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [data, setData] = useState({
        title : "",
        subtitle : "" ,
        imageUrl : ""
    })

    const getData = async () => {
        fetch(`${BASE_URL}/getHome`)
            .then(res => res.json())
            .then(res => {
                if(res.message == "success"){
                    setData(res?.home || {
                        title : "",
                        subtitle : "" ,
                        imageUrl : ""
                    });
                }
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        getData();
    }, [])

    const addNewData = () => {
        if (!data?.title || !data?.subtitle || !data?.imageUrl) {
            message.warning("Please fill all the fields!!");
            return;
        }
        fetch(`${BASE_URL}/setHome`, {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    message.success("Home details edited successfully!!");
                    setData(res?.home || {
                        title : "",
                        subtitle : "" ,
                        imageUrl : ""
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
        <div className='sm:px-14 px-6 mt-4  w-full md:w-[calc(100%-300px)]  mb-3 flex flex-col justify-center'>
            <h3 className='text-base text-gray-700 font-semibold mb-2 mt-3'>Home</h3>
            <form className='flex flex-col gap-3' onSubmit={(e) => {
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
                <InputBox
                    handleUserInput={handleUserInput}
                    name="subtitle"
                    type="text"
                    placeholder="Enter subtitle"
                    value={data?.subtitle}
                    label="Subtitle"
                />
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

export default Home