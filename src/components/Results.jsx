import React from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {
  
  // reference the context for the "name".
  const { name } = useContext(UserContext);


  //the returned JSX for the results page , displaying the user's name, their element and the artwork details if available
  return (

    <div>

      <p>
        <strong>{name ? name : "User"}</strong>, your element is: {element}
      </p>

      {/* Artwork details  , if there is any  show the details*/}
      {artwork ? (

        <div className="artwork">

          <h2>{artwork.title}</h2>
          <img src={artwork.primaryImageSmall || artwork.primaryImage} alt={artwork.title} />
          <p>{artwork.artistDisplayName}</p>
          <p>{artwork.objectDate}</p>

        </div>

      ) : (
        <p>No artwork found.</p>
      )}

    </div>

  );
}