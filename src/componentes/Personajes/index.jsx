import './style.css';
import CharacterList from './CharacterList';

function Personajes() {
  return (
    <div className='bg-dark text-white'>
      <h1 className='text-center display-1 py-4'>Personajes</h1>
      <CharacterList />
    </div>
  );
}

export default Personajes;
