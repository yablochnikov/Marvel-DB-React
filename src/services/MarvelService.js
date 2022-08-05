import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=8d7ca5b95586291c6bf22ecc9918f8b8";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async id => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformSingleComic(res.data.results[0]);
  };

  const getCharacter = async id => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = char => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    };
  };

  const _transformComics = comics => {
    return {
      id: comics.id,
      name: comics.title,
      description: comics.description,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      price: comics.prices[0].price
    };
  };

  const _transformSingleComic = comic => {
    return {
      id: comic.id,
      name: comic.title,
      description: comic.description,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      price: comic.prices[0].price
        ? comic.prices[0].price + "$"
        : "Not available for sale ",
      pages: comic.pageCount
        ? comic.pageCount + " pages"
        : "No info about pages",
      language: comic.textObjects?.length
        ? comic.textObjects[0].language
        : "en-us"
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic
  };
};

export default useMarvelService;
