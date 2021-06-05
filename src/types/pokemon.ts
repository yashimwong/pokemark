export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprite;
  stats: Array<Stats>;
  types: Array<Types>;
};

export type Sprite = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type Stats = {
  base_stat: number;
  effort: number;
  stat: Stat;
};

export type Stat = {
  name: string;
  url: string;
};

export type Types = {
  slot: number;
  type: Type;
};

export type Type = {
  name: string;
  url: string;
};
