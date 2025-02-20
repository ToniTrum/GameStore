import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { API_URL } from "../../main"
import useAxios from "../../utils/useAxios"
import FileViewer from "../FileViewer/FileViewer"

import "./FeedbackViewPage.css"

const FeedbackViewPage = () => {
    const navigate = useNavigate()
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

    const onClickEdit = () => {
        navigate(`/user/id/${id}/feedback/edit/${feedback_id}/`)
    }
    console.log(feedback)
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

                {feedback?.file !== null && (
                    <>
                    <label className="feedback-label">Файл</label>
                    <FileViewer 
                        fileUrl={feedback?.file ? `${API_URL}${feedback.file}` : ""} 
                        fileName={feedback?.file ? feedback.file.split('/').pop() : ""} />
                    </>
                )}

                <label className="feedback-label">Статус</label>
                <p className="feedback-status">
                    {feedback?.status || ""}
                </p>

                {feedback?.status === "Отправлено" && (
                    <button onClick={onClickEdit} className="feedback-button">Редактировать</button>
                )}
                {feedback?.status !== "Отправлено" && feedback?.comment !== null && feedback?.comment !== "" && (
                    <>
                    <label className="feedback-label">Комментарий от администратора</label>
                    <textarea readOnly className="feedback-text" value={feedback?.comment || ""} />
                    </>
                )}
            </form>
        </section>
    )
}

export default FeedbackViewPage