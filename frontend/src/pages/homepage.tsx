import React, { useCallback, useEffect, useState } from "react";
import { titleCreator } from "../../utils/titleCreator";
import style from "../styles/homePage.module.scss";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import {
  TopicsReturnType,
  allTopicsQuery,
} from "../../queries/questionQueries";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { OperationVariables } from "@apollo/client";

// Not being used, but decent format for pagination in the future.
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

interface ChatMessage {
  message: string;
  sentTime?: string;
  direction: MessageDirection;
  position: any;
  sender: string;
}

const API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;

export default function HomePage() {
  useEffect(() => {
    document.title = titleCreator("Homepage");
  }, []);
  const token = process.env.PUBLIC_STRAPI_API_TOKEN; // Auth not used yet.

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: TopicsReturnType | undefined;
  } = useStrapiQuery(allTopicsQuery, {
    variables: {},
  } as OperationVariables);

  function ShowAnswer() {}

  return (
    <div className={style.homePageWrapper}>
      <section className={style.factionsWrapper}>
        <section className={style.questionSection}>
          <h2 className={style.sectionHeader}>TOPIC</h2>
          <div className={style.sectionContent}></div>
        </section>
        <section className={style.questionSection}>
          <h2 className={style.sectionHeader}>QUESTION</h2>
          <div className={style.sectionContent}>
            <div className={style.question}>
              put question here (need to have spinner while waiting)
            </div>
            <div className={style.answer}>
              put answer here (hide it until reveal is clicked)
              <button onClick={ShowAnswer}>REVEAL</button>
            </div>
          </div>
        </section>
        {/* {data ? (
          data.factions.data.map((faction, i) => (
            <Link to={"/faction/" + faction.id}>
              <div className={style.factionTile} key={faction.id.toString()}>
                <h3 className={style.factionName}>
                  {faction.attributes.display_name}
                </h3>
                <Link to={"/faction/" + faction.id + "/faction_datasheets"}>
                  <button className={style.unitsButton}>UNITS</button>
                </Link>
              </div>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )} */}
      </section>
    </div>
  );
}
