import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { cloudName, uploadPreset } from "../../Cloudinary/Cloudinary";

const Login = () => {
  const [image, setimage] = useState("");
  const [loading, setLoading] = useState(false);
  const [haveAcount, setHaveAcount] = useState(false);

  // State for avatar
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  // Handle avatar upload
  const HandleAvatar = (e) => {
    uploadImageToCloudinary(e.target.files[0]);
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  // Upload image to Cloudinary
  async function uploadImageToCloudinary(file) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        setimage(data.url);
      } catch (err) {
        console.log(err);
        console.log("hamo error");
      }
    }
  }
  // Handle Login
  const HandleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Handle Register
  const HandleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        avatar: image || "",
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("User created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {!haveAcount && (
        <div className="item">
          <h2>Welcome Back,</h2>
          <form onSubmit={HandleLogin}>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit" disabled={loading}>
              {loading ? "Loading" : "Login"}
            </button>
          </form>
          <div>
            Don't have an account?{" "}
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setHaveAcount(true)}
            >
              Sign up
            </span>
          </div>
        </div>
      )}
      {/* <div className="separator"></div> */}
      {haveAcount && (
        <div className="item">
          <h2>Create an Account</h2>
          <form onSubmit={HandleRegister}>
            <label htmlFor="file">
              <img src={avatar?.url || "./avatar.png"} alt="" />
              Upload an image
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={HandleAvatar}
            />
            <input type="text" placeholder="Username" name="username" />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit" disabled={loading}>
              {loading ? "Loading" : "Sign Up"}
            </button>
          </form>
          <div>
            Already have an account?
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setHaveAcount(false)}
            >
              Sign in
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
