import fetchMock from 'fetch-mock';
import { fetchCharactersWithName } from '../helpers';
import response from '../../__mocks__/characters_response';
import modifiedResponse from '../../__mocks__/modified_response';

afterEach(() => {
  fetchMock.restore();
});

describe('fetchCharactersWithName', () => {
  it('on successfull response', () => {
    fetchMock.get(
      `http://localhost:1111/characters?nameStartsWith=wolverine`,
      response
    );
    return fetchCharactersWithName('wolverine').then(data => {
      expect(fetchMock.called()).toBe(true);
      expect(data).toEqual(modifiedResponse);
    });
  });

  it('on failure', () => {
    fetchMock.get(`http://localhost:1111/characters?nameStartsWith=wolverine`, {
      status: 500
    });
    return fetchCharactersWithName('wolverine').then(data => {
      expect(fetchMock.called()).toBe(true);
      expect(data).toEqual([]);
    });
  });

  it('on successfull response but with no `results` key', () => {
    fetchMock.get(
      `http://localhost:1111/characters?nameStartsWith=wolverine`,
      {}
    );
    return fetchCharactersWithName('wolverine').then(data => {
      expect(fetchMock.called()).toBe(true);
      expect(data).toEqual([]);
    });
  });
});
