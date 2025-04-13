import './style.css'
import { useEffect, useState } from 'react'
import Character from './Character';
import CharacterList from './CharacterList';


function Personajes() {
 
 const [characters, setChatacters] = useState([])

  useEffect(()=> {
   async function fatchData(){
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()
    setChatacters(data.results);
   }

   fatchData()

  },[]);

  return (
    <div>
      <h1>Personajes</h1>
      

      {
        characters.map(character => {
          return(
            <div key={character.id}>
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name}/>
            </div>

          )
        })
      }

    </div>
  )
}

export default Personajes