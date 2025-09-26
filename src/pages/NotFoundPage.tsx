import { Home } from 'lucide-react'
import './NotFoundPage.css'

interface NotFoundPageProps {
  onGoHome: () => void
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-animation">
          <div className="floating-number">4</div>
          <div className="floating-icon">
            <div className="search-circle"></div>
            <div className="search-line"></div>
          </div>
          <div className="floating-number">4</div>
        </div>

        <div className="not-found-text">
          <h1 className="not-found-title">Сторінку не знайдено</h1>
          <p className="not-found-description">
            На жаль, сторінка, яку ви шукаете, не існує або була переміщена.
          </p>
        </div>

        <div className="not-found-actions">
          <button
            className="home-button"
            onClick={onGoHome}
          >
            <Home size={20} />
            Повернутися додому
          </button>
        </div>

        <div className="not-found-suggestions">
          <p className="suggestions-title">Можливо, вас зацікавить:</p>
          <ul className="suggestions-list">
            <li>Створити нову задачу</li>
            <li>Переглянути поточні задачі</li>
            <li>Організувати робочий процес</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
