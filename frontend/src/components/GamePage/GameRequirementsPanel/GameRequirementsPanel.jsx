import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { API_URL } from "../../../main";

import "./GameRequirementsPanel.css";

const GameRequirementsPanel = ({ requirements, platforms }) => {
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    function findPlatform(platformID) {
      for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].id === platformID) {
          return platforms[i];
        }
      }
    }

    const linkRequirementsWithPlatform = () => {
      try {
        if (requirements && platforms) {
          const tabs = [];
          for (let i = 0; i < requirements.length; i++) {
            const platformID = requirements[i].platform;
            const platform = findPlatform(platformID);
            if (platform) {
              const data = {
                label: platform.name,
                icon: platform.icon,
                minimum: requirements[i].minimum,
                recommended: requirements[i].recommended,
              };
              tabs.push(data);
            }
          }
          setTabs(tabs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (requirements && platforms) {
      linkRequirementsWithPlatform();
    }
  }, [requirements, platforms]);

  return tabs.length > 0 ? (
    <section className="requirement-panel">
      <h2>Требования:</h2>

      <div className="requirement-container">
        <div className="requirement-tabs">
          <ul className="tabs-container">
            {tabs.map((tab, index) => (
              <li
                key={index}
                onClick={() => setSelectedTab(index)}
                className={index === selectedTab ? "selected" : ""}
              >
                <div className="tab-label">
                  <img
                    className="tab-icon"
                    src={`${API_URL}/${tab.icon}`}
                    alt={tab.label}
                  />
                  <span className="tab-text">{tab.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="requirement-text-container"
            layoutId="requirement-text-container"
            transition={{ duration: 0.4 }}
          >

            <RequirementText
              text={tabs[selectedTab].minimum}
              title="Минимальные требования"
            />
            <RequirementText
              text={tabs[selectedTab].recommended}
              title="Рекомендуемые требования"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  ) : null;
};

export default GameRequirementsPanel;

const RequirementText = ({ text, title }) => {
  return (
    <div className="requirement-text">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};
