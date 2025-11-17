import api from "../api/axiosClient";

export async function generate(prompt, token) {
  const res = await api.post(
    "/generate",
    { prompt },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}
