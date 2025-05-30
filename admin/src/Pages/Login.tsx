import { FC, useState } from "react";
import Input from "../components/FormComponents/Input";
import Button from "../components/Button";
import { z } from "zod";
import { userSchema } from "../hooks/zodForm";
import { KeyIcon, Mail, UserCircle } from "lucide-react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { fetchData } from "../lib/fetchData";
import { login } from "../store/slice/user";
import { useNavigate } from "react-router-dom";
import {message} from "antd" ;
import { useDispatch } from "react-redux";

type ErrorMessage = {
  mailerror: string;
  passworderror: string;
};

const Login: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;

  const [Errors, setErrors] = useState<ErrorMessage>({
    mailerror: "",
    passworderror: "",
  });
  const [form, setForm] = useState<z.infer<typeof userSchema>>({
    email: "",
    password: "",
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setForm({ ...form, [name]: value });
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setErrors({
      mailerror: "",
      passworderror: "",
    });

    const res = await fetchData("/user/adminLogin", setLoading, "POST", form);
      if (res?.success) {
        dispatch(login(res?.data));
        navigate("/");
      } else {
        message.error(res?.message || "Something went wrong please try again after some time!!");
      }
  };

  const {themeColor} = useGlobalContext();

  return (
    <div
      className="h-screen w-full relative flex items-center justify-center bg-primary flex-col bg-secondary-bg"
    >
      <form
        className="flex justify-center bg-main-bg items-center flex-col max-w-[400px] w-full relative gap-2 shadow-2xl px-4 py-5 rounded-lg"
        onSubmit={submitForm}
      >
        <UserCircle
          className="w-20 h-10"
          style={{
            color : themeColor
          }}
        />
        <h3
          className="font-bold text-[18px] mb-2 text-main-text text-center"
        >
          Admin login to The Himalayan Hotel !
        </h3>
        <Input
          label="Email Address"
          name="email"
          value={form.email}
          Icon={Mail}
          Error={Errors.mailerror}
          placeholder="example@mail.com"
          required
          type="text"
          onChange={onChange}
          className="w-full gap-1 my-1"
        />
        <Input
          label="Password"
          name="password"
          onChange={onChange}
          placeholder="***********"
          required
          Error={Errors.passworderror}
          Icon={KeyIcon}
          type="password"
          value={form.password}
          className="w-full gap-1 my-1"
        />
        <Button
          text="Log In"
          className="rounded-full mt-2"
        />
        <p
          className="text-secondary-text text-xs font-semibold underline cursor-pointer hover:text-blue-600 mt-2"
        >
          Forget Password
        </p>
      </form>
    </div>
  );
};

export default Login;
