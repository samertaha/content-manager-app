import axios from "axios";

export default async function (req, res) {
  if (req.method === "GET") {
    const dataRes = await fetch("http://localhost:3001/api/resources");
    const data = await dataRes.json();

    return res.send(data);
  }

  if (req.method === "POST" || req.method === "PATCH") {
    const { id, title, description, link, priority, timeToFinish } = req.body;
    if (!title || !description || !link || !priority || !timeToFinish) {
      return res.status(422).send("Data are missing!");
    }

    const url =
      req.method === "PPOST"
        ? "http://localhost:3001/api/resources"
        : `http://localhost:3001/api/resources/${id}`;

    try {
      const axiosRes = await axios[req.method.toLowerCase()](url, req.body);
      return res.send(axiosRes.data);
    } catch (error) {
      return res.status(422).send("Data cannot be stored!");
    }
  }
}
