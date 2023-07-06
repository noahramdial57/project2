import { useState, useEffect} from 'react';



function App() {
  return (
   <Home />
  );
}


const Home = () => {
  const [data, setData] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/characters").then((response) => {
  //     setData(response.json());
  //   });
  // }, []);

  return (
    <>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label id="label1" for="searchString">
          Who you looking for?{" "}
          <span id="'span1" class="small">
            (Regular expressions are cool here)
          </span>
        </label>
        <input
          id="searchString"
          oninput="filterCharacters()"
          autocomplete="off"
        />
      </div>
      <section id="charactersList"></section>
      </>
  );
};

export default App;
