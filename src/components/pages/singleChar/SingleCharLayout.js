import "./singleComic.scss";

const SingleCharLayout = ({ data }) => {
  const { name, description, thumbnail } = data;
  console.log(data);
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
      </div>
    </>
  );
};

export default SingleCharLayout;
