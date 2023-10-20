import React, { useState } from 'react';
import Card from './Card';

const Carousel = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 9;

  const nextSlide = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(cards.data.length / cardsPerPage));
  };

  const prevSlide = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? Math.ceil(cards.data.length / cardsPerPage) - 1 : prevPage - 1
    );
  };

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Utilisez une déclaration conditionnelle pour vérifier si cards.data est défini
  const displayedCards = cards?.data ? cards.data.slice(startIndex, endIndex) : [];

  const totalPages = cards?.data ? Math.ceil(cards.data.length / cardsPerPage) : 0;

  return (
    <div className="carousel">
      <div className="CardLayout">
        {displayedCards.map((card, index) => (
          <div key={index} className="slider-card">
            <Card title={card.nomAd} description={card.descriptionAd} salary={card.salaireAd} id={card.idAd} />
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation" className="pagin">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={prevSlide}>
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage + 1} de {totalPages}
            </span>
          </li>
          <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={nextSlide}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Carousel;
