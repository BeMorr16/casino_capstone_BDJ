// import React from 'react'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authorizeUserRequest, editUserRequest } from "../Utils/APIRequests"
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function UserInfo() {
    const queryClient = useQueryClient();
    const { data: userData, isLoading: userLoading, isError: userError } = useQuery({
        queryKey: ['user'],
        queryFn: authorizeUserRequest
    })
    const editMutation = useMutation({
        mutationFn: editUserRequest,
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            setToggleEdit(false);
        },
        onError: (error) => {
            alert("Error editing user info: " + error.message);
        }
    })
    const [toggleEdit, setToggleEdit] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username || "",
                email: userData.email || "",
                password: '',
                confirmPassword: ''
            });
        }
    }, [userData]);

    if (userLoading) {
        return <div>Is Loading...</div>
    }
    
    if (userError) {
        return <div>Is Error.</div>
    }

    function handleEdit() {
        setToggleEdit(true)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    }

    function handleSave() {
        const updatedData = {
            ...formData,
            id: userData.id
        };
    editMutation.mutate(updatedData);
    }
  return (
    <div className="user-profile">
      <div className="header">
        <h2>User Profile</h2>
        <button className="edit-button" onClick={handleEdit}>
          <FaEdit />
        </button>
      </div>
      <div className="user-info">
        {toggleEdit ? (
          <>
            <div className="user-section">
              <strong>Username:</strong> 
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="user-section">
              <strong>Email:</strong> 
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="user-section">
              <strong>Password:</strong> 
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="user-section">
              <strong>Confirm Old Password:</strong> 
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button className="save-button" onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <div className="user-section">
              <strong>Username:</strong> <span>{userData.username}</span>
            </div>
            <div className="user-section">
              <strong>Email:</strong> <span>{userData.email}</span>
            </div>
            <div className="user-section">
              <strong>Password:</strong> <input type="password" value={userData.password} readOnly />
            </div>
          </>
        )}
        <div className="user-section">
          <strong>User Money:</strong> <span>${userData.user_money}</span>
        </div>
        <div className="user-section">
          <strong>Official Record:</strong> <span>{userData.wins} - {userData.losses}</span>
        </div>
      </div>
    </div>
);
}
