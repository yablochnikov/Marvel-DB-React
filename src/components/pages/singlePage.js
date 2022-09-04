import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // ES6

import useMarvelService from "../../services/MarvelService";

import setContent from "../../utils/setContent";

import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { getCharacter, getComic, clearError, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [id]);

  const updateData = () => {
    clearError();
    // eslint-disable-next-line
    switch (dataType) {
      case "char":
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "comic":
        getComic(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
    }
  };

  const onDataLoaded = data => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      <div className='single-comic'>{setContent(process, Component, data)}</div>
    </>
  );
};

export default SinglePage;
