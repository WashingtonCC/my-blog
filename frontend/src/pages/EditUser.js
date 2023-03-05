import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import EditUserForm from "../components/EditUserForm";
import { json, useActionData } from "react-router-dom";

const EditUser = () => {
  const { user } = useContext(AuthContext);
  const data = useActionData();

  return (
    <div className="edit-user">
      <EditUserForm user={user} data={data} />
    </div>
  );
};

export default EditUser;

export async function action({ request, params }) {
  const formData = await request.formData();
  // const image = formData.get("image");
  const response = await fetch(
    process.env.REACT_APP_API_URL + `user/users/${params.slug}/`,
    {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.access,
      },
      // body: JSON.stringify(Object.fromEntries(formData)),
      body: formData,
    }
  );

  if (!response.ok) {
    const errors = await response.json();
    return { errors: errors };
  }

  return response;
}