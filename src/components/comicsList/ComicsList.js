import "./comicsList.scss";
import { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const { loading, error, getAllComics } = useMarvelService();
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(
    Math.floor(Math.random() * (52761 - 0)) + 0
  );
  const [comicsEnded, setComicsEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = newComics => {
    setComics(comics);
    let ended = false;

    if (newComics.length < 8) {
      ended = true;
    }
    setComics(comics => [...comics, ...newComics]);
    setNewItemsLoading(false);
    setOffset(offset => offset + 9);
    setComicsEnded(comicsEnded => ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li tabIndex={0} className='comics__item' key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              className='comics__item-img'
              alt={item.name}
            />
            <div className='comics__item-name'>{item.name}</div>
            <div className='comics__item-price'>
              {item.price !== 0 ? item.price + "$" : "Unavailable"}
            </div>
          </Link>
        </li>
      );
    });

    return <div className='comics__grid'>{items}</div>;
  }

  const items = renderItems(comics);
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  return (
    <>
      <div className='comics__list'>
        <ul className='comics__grid'>
          {spinner}
          {errorMessage}
          {items}
        </ul>
        <button
          style={{ display: comicsEnded ? "none" : "block" }}
          className='button button__main button__long'
          onClick={() => {
            onRequest(offset + 9);
          }}
          disabled={newItemsLoading}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    </>
  );
};

export default ComicsList;
