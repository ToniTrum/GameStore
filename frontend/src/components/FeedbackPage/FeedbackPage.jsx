import { useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import sweetAlert from "sweetalert2"

import useAxios from "../../utils/useAxios"

import "./FeedbackPage.css" 

const FeedbackPage = () => {
    const api = useAxios()
    const navigate = useNavigate()
    const { id } = useParams()
    const themeRef = useRef(null)
    const textRef = useRef(null)

    const clearForm = () => {
        if (themeRef.current) themeRef.current.value = ""
        if (textRef.current) textRef.current.value = ""
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const theme = themeRef.current.value
        const text = textRef.current.value

        if (theme && text) {
            const formData = new FormData()
            formData.append("theme", theme)
            formData.append("text", text)

            try {
                await api.post(`/feedback/feedback/create/${id}/`, formData)
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

            <form className="feedback-form" method="post" onSubmit={onSubmit}>
                <label className="feedback-label">Тема заявления</label>
                <input 
                    type="text" 
                    placeholder="Введите тему..." 
                    id="theme"
                    ref={themeRef}
                    className="feedback-input" />

                <label className="feedback-label">Текст заявления</label>
                <textarea placeholder="Введите текст..." ref={textRef} />

                <label className="feedback-label">Изображения</label>
                <input className="feedback-image-input" type="file" accept=".jpg, .png, .jpeg" />

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
                Можно подробнее описать вашу проблему и по возможности прикреплять
                изображения для наибольшей ясности.<br />
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