import { useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import sweetAlert from "sweetalert2"

import useAxios from "../../utils/useAxios"
import FileViewer from "../FileViewer/FileViewer"

import "./FeedbackEditPage.css" 

const FeedbackEditPage = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const { id, feedback_id } = useParams()

    const themeRef = useRef(null)
    const textRef = useRef(null)
    const fileRef = useRef(null)
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

    const clearForm = () => {
        if (themeRef.current) themeRef.current.value = ""
        if (textRef.current) textRef.current.value = ""
        if (fileRef.current) fileRef.current.value = ""
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const theme = themeRef.current.value
        const text = textRef.current.value
        const file = fileRef.current.files[0]

        if (theme && text) {
            const formData = new FormData()
            formData.append("theme", theme)
            formData.append("text", text)
            if (file) formData.append("file", file)

            try {
                await api.post(`/feedback/feedback/update/${feedback_id}/`, formData)
                navigate(`/user/id/${id}/feedback/`)
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            sweetAlert.fire({
                title: "Пожалйста, заполните все поля!",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    return (
        <section className="feedback-section">
            <h2>Заполните форму заявления</h2>

            <WarningMassage />

            <form className="feedback-form" method="put" onSubmit={onSubmit}>
                <label className="feedback-label">Тема заявления</label>
                <input 
                    type="text" 
                    placeholder="Введите тему..."
                    ref={themeRef}
                    className="feedback-input"
                    value={feedback?.theme || ""} />

                <label className="feedback-label">Текст заявления</label>
                <textarea 
                    placeholder="Введите текст..." 
                    ref={textRef} 
                    className="feedback-text"
                    value={feedback?.text || ""} />

                <label className="feedback-label">Файл</label>
                <input className="feedback-file-input" ref={fileRef} type="file" />
                <FileViewer 
                    fileUrl={feedback?.file ? `${API_URL}${feedback.file}` : ""} 
                    fileName={feedback?.file ? feedback.file.split('/').pop() : ""} />


                <div className="feedback-button-container">
                    <button onClick={clearForm} className="feedback-button" type="reset">Очистить</button>
                    <button className="feedback-button" type="submit">Изменить</button>
                </div>
            </form>
        </section>
    )
}

export default FeedbackEditPage

const WarningMassage = () => {
    return (
        <div className="warning-massage">
            <p>
                Пожалуйста, заполните все поля формы.<br />
                Так же просим вас, чтобы ваше заявление включало в себя лишь
                полезную и/или важную информацию о ошибках сайта, замеченные вами,
                пожелания об улучшении и другие важные вопросы. Также просим как
                можно подробнее описать вашу проблему и прикреплять
                файлы при необходимости для наибольшей ясности.<br />
                Просим также в заявлении соблюдать манеры и не выражаться нецензурной 
                бранью, соблюдать правила этикета и писать только нужную информацию, 
                будте уважительнее к администраторам и разработчикам сайта.<br />
                Также, после создания заявления Вы имеет возможность удалить заявление 
                или отредактировать его до тех пор, пока он не будет взят на рассмотрение.<br />
                Спасибо за помощь!
            </p>
        </div>
    )
}