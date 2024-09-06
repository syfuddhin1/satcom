import React from "react";

export default function RegistrationPage() {
  return (
    <form
      className="flex flex-col gap-4"
      action={async (formData) => {
        "use server";
        console.log("formData", formData);
        // TODO: implement registration logic
      }}
    >
      <caption>Registration Form</caption>
      <label>
        Email
        <input name="email" type="email" />
      </label>

      <label>
        Name
        <input name="name" type="text" />
      </label>
      <label>
        Code
        <input name="code" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <label>
        Confirm Password
        <input name="confirmPassword" type="password" />
      </label>

      <button>Register</button>
    </form>
  );
}
