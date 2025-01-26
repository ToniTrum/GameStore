import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import trashIcon from "../../assets/img/trash.svg";
import documentIcon from "../../assets/img/document.svg";
import useAxios from "../../utils/useAxios";
import PaginationButtons from "../PaginationButtons/PaginationButtons";

import "./FeedbackPanel.css";

const FeedbackPanel = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const { id, pageNumber } = useParams()

    const [feedbacks, setFeedbacks] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await api.get(`/feedback/feedback/get/${id}/?page=${pageNumber}`)
                setFeedbacks(response.data.results)
                setTotalPages(response.data.total_pages)
            } catch (error) {
                console.error(error)
            }
        }

        fetchFeedbacks()
    }, [pageNumber])

    const onClick = () => {
        navigate(`/user/id/${id}/feedback/create`)
    }

    const handleDelete = (id) => {
        setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id))
    }

    const changePage = (page) => {
        page = parseInt(page)
        if (page > 0 && page <= totalPages) {
            navigate(`/user/id/${id}/feedback/page/${page}`)
            scrollToTop()
        }
    }

    return (
        <section className="feedback-panel-section">
            <h2>Ваши заявления</h2>
            <button onClick={onClick}>Добавить заявление</button>

            <ul>
                {feedbacks.map((feedback, index) => (
                    <Feedback key={index} feedback={feedback} onDelete={handleDelete} />
                ))}
                {feedbacks.length === 0 && (
                    <p>Заявлений пока нет</p>
                )}
            </ul>

            <PaginationButtons 
                changePage={changePage}
                pageNumber={pageNumber}
                totalPages={totalPages} />
        </section>
    )
}

export default FeedbackPanel

const Feedback = ({ feedback, onDelete }) => {
    const api = useAxios()
    const navigate = useNavigate()
    const { id } = useParams()

    const date = dayjs(feedback.created_at).format("DD.MM.YYYY, HH:mm")

    const onClickView = () => {
        navigate(`/user/id/${id}/feedback/view/${feedback.id}`)
    }

    const onClickDelete = () => {
        const deleteFeedback = async () => {
            try {
                await api.delete(`/feedback/feedback/delete/${feedback.id}/`)
                onDelete(feedback.id)
            } catch (error) {
                console.error(error)
            }
        }

        const result = confirm("Вы действительно хотите удалить заявление?")
        if (result) deleteFeedback()
    }

    return (
        <li className="feedback">
            <div className="feedback-info">
                <p className="feedback-info__theme">{feedback.theme}</p>
                <p>{date}</p>
            </div>
            
            <div className="feedback-buttons">
                <p>{feedback.status}</p>
                <img onClick={onClickView} src={documentIcon} alt="view" />
                {feedback.status === "Отправлено" && (
                    <img onClick={onClickDelete} src={trashIcon} alt="delete" />
                )}
            </div>
        </li>
    )
}