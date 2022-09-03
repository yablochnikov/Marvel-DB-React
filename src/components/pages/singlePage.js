import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // ES6

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { getCharacter, getComic, clearError, loading, error } = useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [id]);

  const updateData = () => {
    clearError();
    // eslint-disable-next-line
    switch (dataType) {
      case "char":
        getCharacter(id).then(onDataLoaded);
        break;
      case "comic":
        getComic(id).then(onDataLoaded);
    }
  };

  const onDataLoaded = data => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;

  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !data) ? <Component data={data} /> : null;

  return (
    <div className='single-comic'>
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default SinglePage;
