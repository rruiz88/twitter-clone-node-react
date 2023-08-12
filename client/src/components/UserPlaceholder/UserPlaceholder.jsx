import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();
  const location = useLocation().pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`/user/find/${id}`);
        setUserData(userProfile.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
