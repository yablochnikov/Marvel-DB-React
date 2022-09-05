import { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage
} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import { ErrorMessage } from "formik";

import "./findChar.scss";

const FindChar = () => {
  const [char, setChar] = useState(null);
  const { getCharByName, clearError, process, setProcess } = useMarvelService();

  const onCharLoaded = char => {
    setChar(char);
  };

  const updateChar = name => {
    clearError();

    getCharByName(name)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const errorMessage =
    process === "error" ? (
      <div clasName='char__search-critical-error'>
        <ErrorMessage />
      </div>
    ) : null;

  const result = !char ? null : char.length > 0 ? (
    <div className='char__search-wrapper'>
      <div className='char__search-success'>
        There is! visit {char[0].name} page?
      </div>
      <Link
        to={`/characters/${char[0].id}`}
        className='button button__secondary'
      >
        <div className='inner'>To page</div>
      </Link>
    </div>
  ) : (
    <div className='char__search-error'>
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className='char__search-form'>
      <Formik
        initialValues={{
          charName: ""
        }}
        validationSchema={Yup.object({
          charName: Yup.string()
            .min(2, "Minimum 2 symbols!")
            .required("This field is required!")
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          <label className='char__search-label' htmlFor='charName'>
            Or find a character by name:
          </label>
          <div className='char__search-wrapper'>
            <Field
              id='charName'
              type='text'
              name='charName'
              placeholder='Enter name'
            />
            <button
              type='submit'
              className='button button__main'
              disabled={process === "loading"}
            >
              <div className='inner'>find</div>
            </button>
          </div>
          <FormikErrorMessage
            component='div'
            className='char__search-error'
            name='charName'
          />
        </Form>
      </Formik>
      {result}
      {errorMessage}
    </div>
  );
};

export default FindChar;
