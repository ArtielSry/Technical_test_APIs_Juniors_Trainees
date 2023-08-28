/* 
Recupera un hecho aleatorio de gatos de la primera API
Recupera la primera palabra del hecho
Muestra una imagen de un gato con la primera palabra 
*/
import "../style.css";
import { useState, useEffect } from "react";

const URI = `https://catfact.ninja/fact`;

const App = () => {
  const [fact, setFact] = useState();

  const [imageUrl, setImageUrl] = useState();

  const [next, setNext] = useState(true)

  useEffect(() => {
    fetch(URI)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(data.fact);
      });
  }, [next]);

  useEffect(() => {
    if (!fact) return;

    const threeFirstWord = fact.split(" ", 3).join(" ");
    console.log(threeFirstWord);
    fetch(
      `https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(`https://cataas.com${url}`);
      });
  }, [fact]);

  return (
    <main className="container_center">
      <h1>Cats app</h1>
      <section className="container">
        {fact && <p>{fact}</p>}
        {imageUrl ? (
          <img
            className="img"
            src={imageUrl}
            alt={`image extracted using the first three words for ${imageUrl}`}
          />
        ) : (
          <p>Loading image</p>
        )}
      </section>
      <button onClick={() => setNext(!next)}>Next</button>
    </main>
  );
};

export default App;