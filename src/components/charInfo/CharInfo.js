import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // ES6

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  const updateChar = () => {
    clearError();

    if (!charId) {
      return;
    }

    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = char => {
    setChar(char);
  };

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [charId]);

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>Homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>
        {description.length > 0
          ? description
          : "There is no description for this character"}
      </div>
      <div className='char__comics'>Comics:</div>

      <ul className='char__comics-list'>
        {comics.length !== 0 ? null : "There is no comics with this character"}
        {comics.slice(0, 9).map((item, id) => {
          return (
            <li className='char__comics-item' key={id}>
              <Link to={"comics/" + id}> {item.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number
};

export default CharInfo;
