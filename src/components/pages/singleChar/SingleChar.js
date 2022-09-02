import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"; // ES6
import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/spinner";
import ErrorMessage from "../../errorMessage/errorMessage";

import "./singleComic.scss";

const SingleComic = () => {
  const { charId } = useParams();
  const { getCharacter, clearError, loading, error } = useMarvelService();
  const [char, setChar] = useState(null);

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [charId]);

  const updateChar = () => {
    clearError();

    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = comic => {
    setChar(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

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

const View = ({ char }) => {
  const { name, description, thumbnail, pages, price, language } = char;
  return (
    <>
      <img src={thumbnail} alt={name} className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{name}</h2>
        <p className='single-comic__descr'>
          {description != null
            ? description
            : "There is no description for this char"}
        </p>
        <p className='single-comic__descr'>{pages}</p>
        <p className='single-comic__descr'>Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
    </>
  );
};

export default SingleComic;
