import { UserFileData } from "../interfaces/UserFileData";

const createUserFile = async (body: UserFileData) => {
  try {
    const response = await fetch("/api/xlsx/create-xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from User File Creation: ", err);
    return Promise.reject("Could not create ticket");
  }
};

export { createUserFile };
