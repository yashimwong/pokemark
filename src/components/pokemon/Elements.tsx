import { Types } from "../../App";
import { ReactComponent as Bug } from "../../images/bug.svg";
import { ReactComponent as Dark } from "../../images/dark.svg";
import { ReactComponent as Dragon } from "../../images/dragon.svg";
import { ReactComponent as Electric } from "../../images/electric.svg";
import { ReactComponent as Fairy } from "../../images/fairy.svg";
import { ReactComponent as Fighting } from "../../images/fighting.svg";
import { ReactComponent as Fire } from "../../images/fire.svg";
import { ReactComponent as Flying } from "../../images/flying.svg";
import { ReactComponent as Ghost } from "../../images/ghost.svg";
import { ReactComponent as Grass } from "../../images/grass.svg";
import { ReactComponent as Ground } from "../../images/ground.svg";
import { ReactComponent as Ice } from "../../images/ice.svg";
import { ReactComponent as Normal } from "../../images/normal.svg";
import { ReactComponent as Poison } from "../../images/poison.svg";
import { ReactComponent as Psychic } from "../../images/psychic.svg";
import { ReactComponent as Rock } from "../../images/rock.svg";
import { ReactComponent as Steel } from "../../images/steel.svg";
import { ReactComponent as Water } from "../../images/water.svg";

enum Element {
  Bug = "bug",
  Dark = "dark",
  Dragon = "dragon",
  Electric = "electric",
  Fairy = "fairy",
  Fighting = "fighting",
  Fire = "fire",
  Flying = "flying",
  Ghost = "ghost",
  Grass = "grass",
  Ground = "ground",
  Ice = "ice",
  Normal = "normal",
  Poison = "poison",
  Psychic = "psychic",
  Rock = "rock",
  Steel = "steel",
  Water = "water",
}

type ElementProps = {
  data: Types[];
};

const element_color: { [key: string]: string } = {
  bug: "green-500",
  dark: "gray-600",
  dragon: "blue-600",
  electric: "yellow-300",
  fairy: "pink-400",
  fighting: "red-600",
  fire: "yellow-500",
  flying: "blue-100",
  ghost: "purple-200",
  grass: "green-300",
  ground: "yellow-900",
  ice: "blue-900",
  normal: "gray-200",
  poison: "purple-800",
  psychic: "pink-800",
  rock: "yellow-500",
  steel: "gray-400",
  water: "blue-500",
};

const getClassName = (name: string) => {
  return `fill-current text-${element_color[name]}`;
};

const getImage = (ele_name: string) => {
  const props = {
    width: "30",
    height: "30",
    className: getClassName(ele_name),
  };

  if (ele_name === Element.Bug) return <Bug {...props} />;
  if (ele_name === Element.Dark) return <Dark {...props} />;
  if (ele_name === Element.Dragon) return <Dragon {...props} />;
  if (ele_name === Element.Electric) return <Electric {...props} />;
  if (ele_name === Element.Fairy) return <Fairy {...props} />;
  if (ele_name === Element.Fighting) return <Fighting {...props} />;
  if (ele_name === Element.Fire) return <Fire {...props} />;
  if (ele_name === Element.Flying) return <Flying {...props} />;
  if (ele_name === Element.Ghost) return <Ghost {...props} />;
  if (ele_name === Element.Grass) return <Grass {...props} />;
  if (ele_name === Element.Ground) return <Ground {...props} />;
  if (ele_name === Element.Ice) return <Ice {...props} />;
  if (ele_name === Element.Normal) return <Normal {...props} />;
  if (ele_name === Element.Poison) return <Poison {...props} />;
  if (ele_name === Element.Psychic) return <Psychic {...props} />;
  if (ele_name === Element.Rock) return <Rock {...props} />;
  if (ele_name === Element.Steel) return <Steel {...props} />;
  if (ele_name === Element.Water) return <Water {...props} />;
};

const Elements = ({ data }: ElementProps) => {
  return (
    <div className="flex flex-row">
      {data.map((type) => {
        return getImage(type.type.name);
      })}
    </div>
  );
};

export default Elements;
