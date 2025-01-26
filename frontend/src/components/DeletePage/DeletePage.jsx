import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import useAxios from "../../utils/useAxios"

import './DeletePage.css'

const DeletePage = () => {
    const api = useAxios()
    const {logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const {id} = useParams()

    const onClick = () => {
        navigate(`/user/id/${id}/profile`)
    }

    const deleteUser = async () => {
        const result = confirm("Вы действительно хотите удалить свой аккаунт?")
        if (!result) return

        try {
            const response = await api.delete(`/users/delete/${id}/`)
            if (response.status === 204) logoutUser()
            else console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="delete-section">
            <p>
                Удаляя свой аккаунт, вы соглашаетесь со следующими условиями:
                <ul className="delete-list">
                    <li>Ваш профиль будет деактивирован, и вы потеряете доступ к своему аккаунту, только если вы восстановите его.</li>
                    <li>Вся ваша персональная информация будет удалена через 30 дней после удаления, включая:
                        <ul className="delete-list">
                            <li>Ваши данные профиля (имя, электронная почта, фото и т.д.).</li>
                            <li>Ваша история покупок.</li>
                        </ul>
                    </li>
                </ul>
                Вы можете отменить удаление в течение 30 дней, нажав кнопку "Восстановить аккунт" на странице входа. 
                После этого срока ваши данные будут окончательно удалены и восстановлению не подлежат.<br/><br/>

                Если вы согласны с этими условиями, нажмите «Подтвердить удаление».
            </p>

            <div className="change-buttons">
                <button onClick={onClick}>Отмена</button>
                <button onClick={deleteUser}>Подтвердить удаление</button>
            </div>
        </section>
    )
}

export default DeletePage