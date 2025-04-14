import { useEffect, useState } from 'react';
import Character from './Character';

function NavPage(props) {
  return (
    <header className='d-flex justify-content-between align-items-center'>
      <p>page : {props.page}</p>
      <button
        className='btn btn-primary btn-sm'
        onClick={() => props.setPage(props.page + 1)}
      >
        page {props.page}
      </button>

      
    </header>
  );
}

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }

    fetchData();
  }, [page]);

  return (
    <div className='container bg-danger'>
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='row'>
          {characters.map((character) => (
            <div className='col-md-4' key={character.id}>
              <Character character={character} />
            </div>
          ))}
        </div>
      )}

    <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default CharacterList;
