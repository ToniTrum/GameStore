import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import trashIcon from "../../assets/img/trash.svg";
import documentIcon from "../../assets/img/document.svg";
import useAxios from "../../utils/useAxios";
import PaginationButtons from "../PaginationButtons/PaginationButtons";

import "./FeedbackPanel.css";

const FeedbackPanel = () => {
  const api = useAxios();
  const navigate = useNavigate();
  const { id, pageNumber } = useParams();

  const [feedbacks, setFeedbacks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("Все");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        let status = "";
        if (selectedStatus !== "Все") status = `&status=${selectedStatus}`;
        const response = await api.get(
          `/feedback/feedback/get/${id}/?page=${pageNumber}&page_size=5${status}`
        );
        setFeedbacks(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedbacks();
  }, [pageNumber, selectedStatus]);

  const onClick = () => {
    navigate(`/user/id/${id}/feedback/create`);
  };

  const handleDelete = (id) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changePage = (page) => {
    page = parseInt(page);
    if (page > 0 && page <= totalPages) {
      navigate(`/user/id/${id}/feedback/page/${page}`);
      scrollToTop();
    }
  };

  return (
    <section className="feedback-panel-section">
      <h2>Ваши заявления</h2>

      <div className="feedback-panel-section__buttons">
        <button onClick={onClick}>Добавить заявление</button>
        <select
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            navigate(`/user/id/${id}/feedback/page/1`);
          }}
          defaultValue={"Все"}
        >
          <option value="Все">Все</option>
          <option value="Отправлено">Отправлено</option>
          <option value="На рассмотрении">На рассмотрении</option>
          <option value="Принято">Принято</option>
          <option value="Отклонено">Отклонено</option>
        </select>
      </div>

      <ul>
        {feedbacks &&
          feedbacks.map((feedback, index) => (
            <Feedback key={index} feedback={feedback} onDelete={handleDelete} />
          ))}
        {feedbacks?.length === 0 && <p>Заявлений пока нет</p>}
      </ul>

      <PaginationButtons
        changePage={changePage}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
    </section>
  );
};

export default FeedbackPanel;

const Feedback = ({ feedback, onDelete }) => {
  const api = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();

  const MySwal = withReactContent(Swal);

  const date = dayjs(feedback.created_at).format("DD.MM.YYYY, HH:mm");

  const onClickView = () => {
    navigate(`/user/id/${id}/feedback/view/${feedback.id}`);
  };

  const onClickDelete = () => {
    MySwal.fire({
      title: <strong>Вы уверены?</strong>,
      html: (
        <p>
          Это действие <strong>нельзя отменить</strong>. Вы действительно хотите
          удалить заявление?
        </p>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Да, удалить",
      cancelButtonText: "Отмена",
      reverseButtons: true,
      customClass: {
        popup: "custom-popup",
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/feedback/feedback/delete/${feedback.id}/`);
          onDelete(feedback.id);
          Swal.fire("Удалено!", "Ваше заявление успешно удалено.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Ошибка!", "Не удалось удалить заявление.", "error");
        }
      }
    });
  };

  return (
    <li className="feedback">
      <div className="feedback-info">
        <p className="feedback-info__theme">{feedback.theme}</p>
        <p className="feedback-info__date">{date}</p>
      </div>

      <div className="feedback-buttons">
        <p>{feedback.status}</p>
        <div className="feedback-buttons-icons">
          <img onClick={onClickView} src={documentIcon} alt="view" />
          {feedback.status === "Отправлено" && (
            <img onClick={onClickDelete} src={trashIcon} alt="delete" />
          )}
        </div>
      </div>
    </li>
  );
};
