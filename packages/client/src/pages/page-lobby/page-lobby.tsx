import { useSelector } from "react-redux";
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import avatar from "@images/chat-avatar.png";
import { useTheme } from "@hooks/use-theme";
import { PATH, API_URL, Theme } from "@config/constants";
import settings from "@images/settings.svg";
import { Rating } from "@pages/page-lobby/components/rating/rating";
import { BattleSetting } from "@pages/page-lobby/components/battle-settings/battle-settings";
import { ActiveTopicModal } from "@pages/page-lobby/components/active-forum-topic/active-forum-topic";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { FullScreenBtn } from "@ui/full-creen-btn/full-screen-btn";
import { NewTopicForm } from "@pages/page-lobby/components/new-topic-form/new-topic-form";
import { Guide } from "@pages/page-game/guide";
import { MainButton } from "@ui/main-button/main-button";
import { useForum } from "@hooks/use-forum";
import { useDebounce } from "@hooks/use-debounce";
import { Fields, useForm, Validators } from "@hooks/use-form";
import { MainInput } from "@ui/main-input/main-input";
import { Loading } from "@ui/loading/loading";
import { ForumItem } from "./components/forum-item/forum-item";
import styles from "./page-lobby.module.scss";

type OpenBtnProps = {
  onClick: () => void;
};
const OpenGuideButton = ({ onClick }: OpenBtnProps) => (
  <MainButton className={styles.button_link} onClick={onClick}>
    Справочник по игре
  </MainButton>
);

export const PageLobby = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const themeName = useTheme();
  const { forum, loading, error, activeTopic } = useSelector(
    (store: RootState) => store.forum
  );
  const { toGetForumTopics, toSearchForTopic, toChooseActiveTopic } =
    useForum();
  const [newTopic, setNewTopic] = useState<string | null>(null);
  const [newTopicForm, setNewTopicForm] = useState<boolean>(false);
  const [searchenTopic, setSearchenTopic] = useState<string | null>(null);
  const [topicToChange, setTopicToChange] = useState<{
    id: number;
    title: string;
    body: string;
  } | null>(null);

  const debouncedValue = useDebounce(searchenTopic, 1500);

  const validators: Validators = {
    title: {
      required: true,
      rule: /^.{1,50}$/,
      message: "в названии может быть до 50 символов",
    },
  };

  const initialForm: Fields = {
    title: "",
  };

  const { form, onChange, validate, onFocus, onBlur, resetForm } = useForm(
    initialForm,
    validators
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    toGetForumTopics(0);
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      toSearchForTopic(debouncedValue);
    } else {
      toGetForumTopics(0);
    }
  }, [debouncedValue]);

  const onNewTopicClose = () => {
    setNewTopic(null);
    setNewTopicForm(!newTopicForm);
    setTopicToChange(null);
  };

  return (
    <div className={styles.container}>
      <section
        className={cn(
          styles.window,
          themeName === Theme.Purple ? styles.purpur : styles.neon
        )}
      >
        <h3 className={styles.window_header}>доступные битвы</h3>
        <div className={styles.window_wrapper}>
          <h3
            style={{
              marginTop: "15%",
              textAlign: "center",
              fontFamily: "Blender Pro",
            }}
          >
            Раздел находится в разработке
          </h3>
          {/* TODO: добавить рабочие элементы после подключения АПИ */}
          {/* {tables_mock.map((table, index) => ( */}
          {/*  <TableItem key={index} {...table} /> */}
          {/* ))} */}
        </div>
      </section>
      <section
        className={cn(
          styles.forum,
          themeName === Theme.Purple ? styles.purpur : styles.neon
        )}
      >
        <input
          type="search"
          placeholder="Поиск по названию"
          className={cn(
            styles.forum_search,
            themeName === Theme.Purple ? styles.purpur : styles.neon
          )}
          onChange={(event: BaseSyntheticEvent) => {
            if (event.target.value) {
              setSearchenTopic(event.target.value);
            }
          }}
        />
        {loading && !activeTopic && <Loading />}
        {error && (
          <div className={styles.forum_error}>
            <span className={styles.forum_error_message}> {error} </span>
            <MainButton
              className={styles.forum_error_reset}
              onClick={() => {
                toGetForumTopics(0);
              }}
            >
              Сбросить поиск
            </MainButton>
          </div>
        )}
        <div className={styles.forum_items}>
          {!loading &&
            !error &&
            forum?.map((topic) => (
              <ForumItem
                key={topic.id}
                topic={topic}
                onClick={toChooseActiveTopic}
                onEdit={setTopicToChange}
              />
            ))}
        </div>
        <div className={styles.forum_input_wrapper}>
          <form>
            <MainInput
              name="title"
              id="topic-title-input"
              placeholder="Введите тему для обсуждения"
              value={form.title as string}
              onChange={onChange as (e: BaseSyntheticEvent) => void}
              onFocus={onFocus as (e: BaseSyntheticEvent) => void}
              onBlur={onBlur as (e: BaseSyntheticEvent) => void}
              error={validate.title.error}
              className={cn(
                styles.forum_input,
                themeName === Theme.Purple ? styles.purpur : styles.neon
              )}
            />
            <MainButton
              type="submit"
              className={cn(styles.forum_input_submit, {
                [styles.forum_input_submit_purpur]: themeName === Theme.Purple,
                [styles.forum_input_submit_neon]: themeName !== Theme.Purple,
              })}
              disabled={!form.title}
              onClick={(event: BaseSyntheticEvent) => {
                event.preventDefault();

                setNewTopic(form.title as string);
                resetForm();
                setNewTopicForm(!newTopicForm);
              }}
            >
              Создать новую тему
            </MainButton>
          </form>
        </div>
      </section>
      <section
        className={cn(styles.user, {
          [styles.user_purpur]: themeName === Theme.Purple,
          [styles.user_neon]: themeName === Theme.Neon,
        })}
      >
        <FullScreenBtn active />
        <div className={styles.user_avatar_wrap}>
          <img
            src={user?.avatar ? `${API_URL}/resources${user?.avatar}` : avatar}
            alt="аватар пользователя"
            className={styles.user_avatar}
          />
        </div>
        <div className={styles.user_row}>
          <span className={styles.user_name}>
            {user?.first_name} {user?.second_name}
          </span>
          <NavLink to={PATH.SETTINGS} className={styles.user_settings}>
            <img src={settings} alt="настройки" />
          </NavLink>
        </div>
        <Guide OpenComponent={OpenGuideButton} />
        {/* TODO: пока не реализованы страницы, добавить по мере реализации */}
        {/* <a */}
        {/*  className={classNames(styles.user_link, { */}
        {/*    [styles.purpur]: themeName === Theme.Purple, */}
        {/*    [styles.neon]: themeName === Theme.Neon, */}
        {/*  })}> */}
        {/*  бестиарий */}
        {/* </a> */}
        <Rating />
        <BattleSetting />
        {activeTopic && (
          <ActiveTopicModal
            data={activeTopic}
            onClose={() => {
              toChooseActiveTopic(null);
              toGetForumTopics(0);

              if (inputRef.current && inputRef.current.value) {
                inputRef.current.value = "";
              }
            }}
          />
        )}
        <NavLink
          to={PATH.ABOUT}
          className={cn(styles.user_link, {
            [styles.purpur]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
          })}
        >
          О разработчиках
        </NavLink>
      </section>
      {newTopicForm && newTopic && (
        <NewTopicForm title={newTopic} onClose={onNewTopicClose} />
      )}
      {topicToChange && (
        <NewTopicForm
          title={topicToChange.title}
          body={topicToChange && topicToChange.body}
          onClose={onNewTopicClose}
          id={topicToChange.id}
        />
      )}
    </div>
  );
};
