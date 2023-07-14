import axios from "axios";
import React from "react";

const postAvatar = async (pics) => {
  if (!pics) return;

  if (
    pics.type === "image/jpeg" ||
    pics.type === "image/png" ||
    pics.type === "image/jpg"
  ) {
    //   Check size
    let filesize = (pics.size / 1024 / 1024).toFixed(4); // mb
    if (filesize > 3) {
      throw new Error("File size limit 3MB");
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    return await axios
      .post("https://api.cloudinary.com/v1_1/db96neegb/image/upload", data)
      .then((res) => res.data.url.toString())
      .catch((err) => undefined);
  } else {
    throw Error("Only PNG/JPG/JPEG format is accepted");
  }
};

const postDetails = (pics) => {
  setLoading(true);
  console.log(pics === undefined);
  if (pics === undefined) {
    toast({
      title: "Please Select an Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    fetch("https://api.cloudinary.com/v1_1/db96neegb/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.message || "Upload Image Failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  } else {
    toast({
      title: "Please Select an Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }
};

export default postAvatar;
