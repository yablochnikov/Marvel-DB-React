import "./singleComic.scss";

const SingleComicLayout = ({ data }) => {
  const { name, description, thumbnail, pages, price, language } = data;
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

export default SingleComicLayout;
