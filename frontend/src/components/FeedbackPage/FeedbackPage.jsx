import { useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import sweetAlert from "sweetalert2"

import useAxios from "../../utils/useAxios"
import { validateFeedback } from "../../utils/useFeedbackValidation"

import "./FeedbackPage.css" 

const FeedbackPage = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const { id } = useParams()

    const [theme, setTheme] = useState("")
    const [text, setText] = useState("")
    const [errors, setErrors] = useState({
        theme: "",
        text: "",
    })

    const themeRef = useRef(null)
    const textRef = useRef(null)
    const fileRef = useRef(null)
    const feedbackData = [
        {
            name: "theme",
            stateFunction: setTheme,
            error: errors.theme
        },
        {
            name: "text",
            stateFunction: setText,
            error: errors.text
        }
    ]

    const sendErrorMessage = (message) => {
        sweetAlert.fire({
            title: message,
            icon: "error",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const clearForm = () => {
        if (themeRef.current) themeRef.current.value = ""
        if (textRef.current) textRef.current.value = ""
        if (fileRef.current) fileRef.current.value = ""
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const error = validateFeedback(name, value)
        setErrors((prev) => ({...prev, [name]: error}))

        const stateFunction = feedbackData.find(
            (item) => item.name === name
        )?.stateFunction
        if (stateFunction) {
            stateFunction(value)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const hasNoErrors = Object.values(errors).every((err) => err === "")
        if (!hasNoErrors) {
            sendErrorMessage("Пожалуйста, исправьте ошибки в форме")
            return
        }
            
        const file = fileRef.current.files[0]

        if (theme && text) {
            const formData = new FormData()
            formData.append("theme", theme)
            formData.append("text", text)
            if (file) formData.append("file", file)

            try {
                await api.post(`/feedback/feedback/create/${id}/`, formData)
                navigate(`/user/id/${id}/feedback/`)
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            sendErrorMessage("Пожалйста, заполните все поля!")
        }
    }

    return (
        <section className="feedback-section">
            <h2>Заполните форму заявления</h2>

            <WarningMassage />

            <form className="feedback-form" method="post" onSubmit={onSubmit}>
                <div>
                    <label className="feedback-label">Тема заявления</label>
                    <input
                        type="text" 
                        placeholder="Введите тему..." 
                        className="feedback-input"
                        onChange={handleChange}
                        name="theme"
                        value={theme} />
                    {errors.theme && <span className="error-message">{errors.theme}</span>}
                </div>

                <div>
                    <label className="feedback-label">Текст заявления</label>
                    <textarea 
                        placeholder="Введите текст..."
                        className="feedback-text"
                        onChange={handleChange}
                        name="text"
                        value={text} />
                    {errors.text && <span className="error-message">{errors.text}</span>}
                </div>

                <label className="feedback-label">Файл</label>
                <input className="feedback-file-input" ref={fileRef} type="file" />

                <div className="feedback-button-container">
                    <button onClick={clearForm} className="feedback-button" type="reset">Очистить</button>
                    <button className="feedback-button" type="submit">Отправить</button>
                </div>
            </form>
        </section>
    )
}

export default FeedbackPage

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
