const _prop = key => obj => obj[key];
const _map = cb => (arr = []) => arr.map(cb);

export const fetchCharactersWithName = query =>
  fetch(`http://localhost:1111/characters?nameStartsWith=${query}`)
    .then(res => res.json())
    .then(_prop('results'))
    .then(
      _map(({ id, name, description, thumbnail }) => {
        return {
          id,
          name,
          thumbnail,
          description
        };
      })
    );
