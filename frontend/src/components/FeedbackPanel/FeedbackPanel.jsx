import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import useAxios from "../../utils/useAxios";

import "./FeedbackPanel.css";

const FeedbackPanel = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const { id } = useParams()

    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await api.get(`/feedback/feedback/get/${id}/`)
                setFeedbacks(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchFeedbacks()
    }, [])

    const onClick = () => {
        navigate(`/user/id/${id}/feedback/create`)
    }

    return (
        <section className="feedback-panel-section">
            <h2>Ваши заявления</h2>

            <ul>
                {feedbacks.map((feedback, index) => (
                    <Feedback key={index} feedback={feedback} />
                ))}
                {feedbacks.length === 0 && (
                    <p>Заявлений пока нет</p>
                )}
            </ul>

            <button onClick={onClick}>Добавить заявление</button>
        </section>
    )
}

export default FeedbackPanel

const Feedback = ({ feedback }) => {
    const navigate = useNavigate()
    const { id } = useParams()

    const date = dayjs(feedback.created_at).format("DD.MM.YYYY, HH:mm")

    const onClick = () => {
        navigate(`/user/id/${id}/feedback/view/${feedback.id}`)
    }

    return (
        <li className="feedback">
            <div className="feedback-info">
                <p className="feedback-info__theme">{feedback.theme}</p>
                <p>{date}</p>
            </div>
            
            <div className="feedback-buttons">
                <button>Редактировать</button>
                <button>Удалить</button>
            </div>
        </li>
    )
}