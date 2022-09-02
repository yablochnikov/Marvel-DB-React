import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; // ES6
import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/spinner";
import ErrorMessage from "../../errorMessage/errorMessage";

import "./singleComic.scss";

const SingleComic = () => {
  const { comicId } = useParams();
  const { getComic, clearError, loading, error } = useMarvelService();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    updateComic();
    // eslint-disable-next-line
  }, [comicId]);

  const updateComic = () => {
    clearError();

    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = comic => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <div className='single-comic'>
      {errorMessage}
      {spinner}
      {content}
      <Link to='/comics' className='single-comic__back'>
        Back to all
      </Link>
    </div>
  );
};

const View = ({ comic }) => {
  const { name, description, thumbnail, pages, price, language } = comic;
  return (
    <>
      <img src={thumbnail} alt={name} className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{name}</h2>
        <p className='single-comic__descr'>
          {description != null
            ? description
            : "There is no description for this comic"}
        </p>
        <p className='single-comic__descr'>{pages}</p>
        <p className='single-comic__descr'>Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
    </>
  );
};

export default SingleComic;
