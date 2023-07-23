export const validators = {
  players_count: {
    required: true,
    rule: /^[1234]{1}$/,
    message: "может играть до 4 человек",
  },
  type: {
    required: true,
    rule: /^(online|offline)$/,
    message: "",
  },
  table_name: {
    required: true,
    rule: /^[a-zA-Z0-9]{1,20}$/,
    message: "1-20 символов, буквы и цифры",
  },
};
