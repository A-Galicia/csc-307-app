import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch('http://localhost:8000/users');
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json['users_list']))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch('Http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status != 201) {
          throw new Error('adding user');
        } else {
          //setCharacters([...characters, res.json()]);
          return res.json();
        }
      })
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneCharacter(index) {
    let id;
    const updated = characters.filter((character, i) => {
      if (i == index) id = character.id;
      return i !== index;
    });

    fetch(`Http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    })
    .then((res) => {
      if (res.status != 204){
        throw new Error(`deleting user ${id}`)
      }
      else {
        setCharacters(updated);
      }
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className='container'>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
