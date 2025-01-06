import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import useAxios from "../../utils/useAxios"

import "./FeedbackViewPage.css"

const FeedbackViewPage = () => {
    const api = useAxios()
    const { id, feedback_id } = useParams()
    const [feedback, setFeedback] = useState({})

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await api.get(`/feedback/feedback/get_by_id/${feedback_id}/`)
                setFeedback(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchFeedback()
    }, [])

    return (
        <section className="feedback-section">
            <form className="feedback-form">
                <label className="feedback-label">Тема заявления</label>
                <input 
                    type="text" 
                    placeholder="Введите тему..."
                    className="feedback-input"
                    readOnly
                    value={feedback?.theme || ""} />

                <label className="feedback-label">Текст заявления</label>
                <textarea readOnly className="feedback-text" value={feedback?.text || ""} />

                <label className="feedback-label">Изображения</label>
                <input readOnly className="feedback-image-input" type="file" accept=".jpg, .png, .jpeg" />

                <label className="feedback-label">Статус</label>
                <p className="feedback-status">
                    {feedback?.status || ""}
                </p>

                {feedback?.status === "Отправлено" && (
                    <button className="feedback-button">Редактировать</button>
                )}
            </form>
        </section>
    )
}

export default FeedbackViewPage