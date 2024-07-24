import { cookies } from "next/headers";

export default async function handler(req, res) {
  //   if (req.method !== 'POST') {
  //     return res.status(405).json({ message: 'Method not allowed' });
  //   }

  const { email, password } = req.body;

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await response.json();

    if (result.message === "success") {
      //   const cookies = new Cookies(req, res);
      cookies.set("token", result.token);
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
