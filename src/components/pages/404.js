import { Helmet } from "react-helmet";

import ErrorMessage from "../errorMessage/errorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <meta name='description' content='This page not found' />
        <title>This page is not found</title>
      </Helmet>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>This page doesn't exist </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px"
        }}
        to='/'
      >
        Back to main page
      </Link>
    </>
  );
};

export default Page404;
