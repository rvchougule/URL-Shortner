import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch.js";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlState } from "@/contexts/UrlContext";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = useUrlState();
  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? longLink : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    setErrors([]);
  };

  const handleSignUp = async () => {
    console.log(formData);

    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
      console.log(newErrors);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account if you haven&apos;t already
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter name"
              //   value={formData.email}
              onChange={handleInputChange}
            />
            {errors.name ? <Error message={errors.name} /> : ""}
          </div>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter email"
              //   value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email ? <Error message={errors.email} /> : ""}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter password"
              //   value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password ? <Error message={errors.password} /> : ""}
          </div>
          <div className="space-y-1">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              //   value={formData.email}
              onChange={handleInputChange}
            />
            {errors.profile_pic ? <Error message={errors.profile_pic} /> : ""}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUp}>
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
