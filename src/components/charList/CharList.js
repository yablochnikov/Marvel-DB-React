import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/spinner";

import useMarvelService from "../../services/MarvelService";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./charList.scss";

const setContent = (process, Component, newItemsLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
      break;
    case "loading":
      return newItemsLoading ? <Component /> : <Spinner />;
      break;
    case "confirmed":
      return <Component />;
      break;
    case "error":
      return <ErrorMessage />;
      break;
    default:
      throw new Error("Unexpected process state");
  }
};

const CharList = props => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(
    Math.floor(Math.random() * (1562 - 0)) + 0
  );
  const [charsEnded, setCharsEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  const duration = 500;

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharListLoaded = async newCharList => {
    let ended = false;

    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charlist => [...charList, ...newCharList]);
    setNewItemsLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharsEnded(charsEnded => ended);
  };

  const itemRefs = useRef([]);

  const onCharFocus = id => {
    itemRefs.current.forEach(item =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <CSSTransition key={item.id} timeout={duration} classNames='char__item'>
          <li
            tabIndex={0}
            ref={el => (itemRefs.current[i] = el)}
            className='char__item'
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id);
              onCharFocus(i);
            }}
            onKeyPress={e => {
              if (e.key === "" || e.key === "Enter") {
                props.onCharSelected(item.id);
                onCharFocus(i);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className='char__name'>{item.name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <TransitionGroup component={"ul"} className='char__grid'>
        {items}{" "}
      </TransitionGroup>
    );
  }

  return (
    <div className='char__list'>
      <ul className='char__grid'>
        {setContent(process, () => renderItems(charList), newItemsLoading)}
      </ul>
      <button
        style={{ display: charsEnded ? "none" : "block" }}
        className='button button__main button__long'
        onClick={() => {
          onRequest(offset + 9);
        }}
        disabled={newItemsLoading}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
};

export default CharList;
