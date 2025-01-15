import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_URL } from "../../main";

import ImageCarousel from "./ImageCarousel/ImageCarousel";
import WrapListComponent from "./WrapListComponent/WrapListComponent";
import GameSidePagePart from "./GameSidePagePart/GameSidePagePart";
import GameRequirementsPanel from "./GameRequirementsPanel/GameRequirementsPanel";

import "./GamePage.css";

const GamePage = () => {
  const { game_id } = useParams();

  const [game, setGame] = useState({});
  const [screenshots, setScreenshots] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`${API_URL}/games/game/get/${game_id}`, {
          method: "GET",
        });
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGame();
  }, []);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        if (game?.screenshots) {
          const screenshotList = [];
          for (let i = 0; i < game.screenshots.length; i++) {
            const screenshotID = game.screenshots[i];
            const response = await fetch(
              `${API_URL}/games/screenshot/get/${screenshotID}`,
              { method: "GET" }
            );
            const data = await response.json();
            screenshotList.push(data.image);
          }

          setScreenshots(screenshotList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (game) {
      fetchScreenshots();
    }
  }, [game]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (game?.genres) {
          const genreList = [];
          for (let i = 0; i < game.genres.length; i++) {
            const genreID = game.genres[i];
            const response = await fetch(
              `${API_URL}/games/genre/get/${genreID}`,
              { method: "GET" }
            );
            const data = await response.json();
            genreList.push(data.name);
          }

          setGenres(genreList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (game) {
      fetchGenres();
    }
  }, [game]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        if (game?.tags) {
          const tagList = [];
          for (let i = 0; i < game.tags.length; i++) {
            const tagID = game.tags[i];
            const response = await fetch(`${API_URL}/games/tag/get/${tagID}`, {
              method: "GET",
            });
            const data = await response.json();
            tagList.push(data.name);
          }

          setTags(tagList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (game) {
      fetchGenres();
    }
  }, [game]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        if (game?.developers) {
          const developerList = [];
          for (let i = 0; i < game.developers.length; i++) {
            const developerID = game.developers[i];
            const response = await fetch(
              `${API_URL}/games/developer/get/${developerID}`,
              { method: "GET" }
            );
            const data = await response.json();
            developerList.push(data.name);
          }

          setDevelopers(developerList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (game) {
      fetchDevelopers();
    }
  }, [game]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        if (game?.id) {
          const response = await fetch(
            `${API_URL}/games/requirement/get/${game_id}`,
            { method: "GET" }
          );
          const data = await response.json();
          setRequirements(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (game) {
      fetchRequirements();
    }
  }, [game]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        if (game?.platforms) {
          const platformList = [];
          for (let i = 0; i < game.platforms.length; i++) {
            const platformID = game.platforms[i];
            const response = await fetch(
              `${API_URL}/games/platform/get/${platformID}`,
              { method: "GET" }
            );
            const data = await response.json();
            platformList.push(data);
          }
          setPlatforms(platformList);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (game) {
      fetchPlatforms();
    }
  }, [game]);

  return (
    <section className="game-section">
      <div className="game-container">
        <div className="game-main-info">
          <h1 className="game-title">{game.name}</h1>
          <ImageCarousel images={screenshots} />
          <GenreTagDeveloperTable
            genres={genres}
            tags={tags}
            developers={developers}
          />
        </div>
        <GameSidePagePart game={game} platforms={platforms} />
      </div>
      <div
        className="game-description"
        dangerouslySetInnerHTML={{ __html: game.description }}
      />

      {requirements.length > 0 ? (
        <GameRequirementsPanel
          requirements={requirements}
          platforms={platforms}
        />
      ) : null}
    </section>
  );
};

export default GamePage;

const GenreTagDeveloperTable = ({ genres, tags, developers }) => {
  return (
    <div className="genre-tag-developer-table">
      <WrapListComponent elements={genres} title="Жанры" />
      <div className="vertical-line"></div>
      <WrapListComponent elements={tags} title="Тэги" />
      <div className="vertical-line"></div>
      <WrapListComponent elements={developers} title="Разработчики" />
    </div>
  );
};
