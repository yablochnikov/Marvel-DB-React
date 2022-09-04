import { Helmet } from "react-helmet";

import "./singleComic.scss";

const SingleCharLayout = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className='single-comic'>
      <Helmet>
        <meta name='description' content={`${name} character page`} />
        <title>{name} character page</title>
      </Helmet>
      <img src={thumbnail} alt={name} className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{name}</h2>
        <p className='single-comic__descr'>{description !== "" ? description : "There is no description for this character"}</p>
      </div>
    </div>
  );
};

export default SingleCharLayout;
