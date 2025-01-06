import "./FeedbackPage.css" 

const FeedbackPage = () => {
    return (
        <section className="feedback-section">
            <form className="feedback-form" action="">
                <textarea placeholder="Введите текст..." />
                <input className="feedback-image-input" type="file" accept=".jpg, .png" />
                <button className="feedback-button" type="reset">Очистить</button>
                <button className="feedback-button" type="submit">Отправить</button>
            </form>
        </section>
    )
}

export default FeedbackPage