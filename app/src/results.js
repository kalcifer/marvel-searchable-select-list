import React from 'react';

const Results = ({
  data = [],
  query = '',
  isMobile = false,
  handleResultsClick = () => {}
}) => (
  <ul>
    {query.length > 0 &&
      data.length > 0 &&
      data.map(({ id, name, description, thumbnail }) => (
        <li className="list" key={id} onClick={() => handleResultsClick(name)}>
          <div>
            <img
              className="character"
              src={`${thumbnail.path}.${thumbnail.extension}`}
              alt={name}
            />
          </div>
          <div className="meta">
            <h3
              className={
                !isMobile && description && description.length > 0 ? (
                  ''
                ) : (
                  'no-description'
                )
              }
            >
              {name}
            </h3>
            {!isMobile &&
            description && <p className="description">{description}</p>}
          </div>
        </li>
      ))}
    {query &&
    query.length > 0 &&
    data.length <= 0 && (
      <li className="list empty">
        <div className="meta">
          <h3>Oh No!</h3>
          <p className="description">No results found</p>
          <p className="description">for "{query}"</p>
        </div>
      </li>
    )}
  </ul>
);

export default Results;
