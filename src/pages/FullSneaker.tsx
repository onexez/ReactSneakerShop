import axios from "axios";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullSneaker: React.FC = () => {
  const [sneaker, setSneaker] = useState<{
    imageUrl: string;
    title: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSneaker() {
      try {
        const { data } = await axios.get(
          "https://650733753a38daf4803f3c39.mockapi.io/sneakers/" + id
        );
        setSneaker(data);
      } catch (error) {
        alert("ошибка");
        navigate("/");
      }
    }
    fetchSneaker();
  }, []);

  if (!sneaker) {
    return "Загрузка...";
  }
  return (
    <div className="container">
      <img src={sneaker.imageUrl} />
      <h2>{sneaker.title}</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus repellendus voluptas
        dolorem molestias officiis eius laudantium expedita neque quidem distinctio, autem sequi
        illo rem optio odit similique. Officia, laboriosam rerum!
      </p>
    </div>
  );
};

export default FullSneaker;
