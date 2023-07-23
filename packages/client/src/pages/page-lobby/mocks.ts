import { IChatData, ITopicDetails } from "@pages/page-lobby/types";

export const tablesMock = [
  {
    id: 832,
    title: "string",
    users: [
      {
        id: 111,
        first_name: "string",
        second_name: "string",
        display_name: "string",
        login: "string",
        email: "string",
        phone: "string",
        avatar: "",
      },
    ],
    // password: 111
  },
];
export const forumMockTopics: IChatData[] | [] = [
  {
    id: 123,
    title: "my-chat",
    avatar: null,
    unread_count: 15,
    last_message: {
      user: {
        first_name: "Petya",
        second_name: "Pupkin",
        avatar: "",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22",
      },
      time: "2020-01-02T14:22:22.000Z",
      content: "this is message content",
    },
  },
];

export const topicData: ITopicDetails = {
  title: "кому Вообще нужны эти правила?",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, " +
    "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna " +
    "aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, " +
    "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna " +
    "aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " +
    "eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  commentaries: [
    {
      comment_id: 1,
      time: "11/ 06/2023, 12:30",
      type: "message",
      user_data: {
        id: 1,
        first_name: "asd",
        second_name: "asd",
        display_name: "abracadabra",
        login: "abracadabra",
        email: "my@email.com",
        phone: "89223332211",
        avatar: "",
      },
      content: "abjsdljA alsjdhlas ahsjdl",
      likes: 0,
      liked: false,
      comments: [
        {
          time: "11/ 06/2023, 12:30",
          type: "message",
          user: {
            first_name: "asd",
            second_name: "asd",
            display_name: "abracadabra",
            login: "abracadabra",
            email: "my@email.com",
            phone: "89223332211",
            avatar: "",
          },
          content: "abjsdljA alsjdhlas ahsjdl",
        },
        {
          time: "11/ 06/2023, 12:30",
          type: "message",
          user: {
            first_name: "asd",
            second_name: "asd",
            display_name: "abracadabra",
            login: "abracadabra",
            email: "my@email.com",
            phone: "89223332211",
            avatar: "",
          },
          content: "abjsdljA alsjdhlas ahsjdl",
        },
      ],
    },
    {
      comment_id: 2,
      time: "11/ 06/2023, 12:30",
      type: "message",
      user_data: {
        id: 123,
        first_name: "Petya",
        second_name: "Pupkin",
        display_name: "Petya Pupkin",
        login: "userLogin",
        email: "my@email.com",
        phone: "89223332211",
        avatar: "/path/to/avatar.jpg",
      },
      content: "abjsdljA alsjdhlas ahsjdl",
      likes: 3,
      liked: true,
    },
  ],
};

export const mockRating = {
  score: 111,
  place: 11,
};
