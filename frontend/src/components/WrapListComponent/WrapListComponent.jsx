import './WrapListComponent.css'

const WrapListComponent = ({ elements, title }) => {
    return (
        <div className="wrap-list-container">
            <h2>{title}:</h2>

            <ul className="wrap-list">
                {elements.map((element, index) => (
                    <li key={index}>{element}</li>
                ))}
            </ul>
        </div>
    )
}

export default WrapListComponent