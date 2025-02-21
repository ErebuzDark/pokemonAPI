// custom type icons
import bugIcon from "../assets/type-icons/Bug_icon.png";
import darkIcon from "../assets/type-icons/Dark_icon.png";
import dragonIcon from "../assets/type-icons/Dragon_icon.png";
import electricIcon from "../assets/type-icons/Electric_icon.png";
import fairyIcon from "../assets/type-icons/Fairy_icon.png";
import fightingIcon from "../assets/type-icons/Fighting_icon.png";
import fireIcon from "../assets/type-icons/Fire_icon.png";
import flyingIcon from "../assets/type-icons/Flying_icon.png";
import ghostIcon from "../assets/type-icons/Ghost_icon.png";
import grassIcon from "../assets/type-icons/Grass_icon.png";
import groundIcon from "../assets/type-icons/Ground_icon.png";
import iceIcon from "../assets/type-icons/Ice_icon.png";
import noneTypeIcon from "../assets/type-icons/none-type.png";
import normalIcon from "../assets/type-icons/Normal_icon.png";
import poisonIcon from "../assets/type-icons/Poison_icon.png";
import psychicIcon from "../assets/type-icons/Psychic_icon.png";
import rockIcon from "../assets/type-icons/Rock_icon.png";
import steelIcon from "../assets/type-icons/Steel_icon.png";
import stellarIcon from "../assets/type-icons/Stellar_icon.png";
import waterIcon from "../assets/type-icons/Water_icon.png";

// custom type bg
import bugBG from "../assets/type-bg/bug.png";
import darkBG from "../assets/type-bg/dark.png";
import dragonBG from "../assets/type-bg/dragon.png";
import electricBG from "../assets/type-bg/electric.png";
import fairyBG from "../assets/type-bg/fairy.png";
import fightBG from "../assets/type-bg/fight.png";
import fireBG from "../assets/type-bg/fire.png";
import flyingBG from "../assets/type-bg/flying.png";
import ghostBG from "../assets/type-bg/ghost.png";
import grassBG from "../assets/type-bg/grass.png";
import groundBG from "../assets/type-bg/ground.png";
import iceBG from "../assets/type-bg/ice.png";
import normalBG from "../assets/type-bg/normal.png";
import poisonBG from "../assets/type-bg/poison.png";
import psychicBG from "../assets/type-bg/psychic.png";
import rockBG from "../assets/type-bg/rock.png";
import steelBG from "../assets/type-bg/steel.png";
import stellarBG from "../assets/type-bg/stellar.png";
import waterBG from "../assets/type-bg/water.png";


export const typeIcons = [
  { type: "bug", icon: bugIcon, bg: bugBG, title: "Bug" },
  { type: "dark", icon: darkIcon, bg: darkBG, title: "Dark" },
  { type: "dragon", icon: dragonIcon, bg: dragonBG, title: "Dragon" },
  { type: "electric", icon: electricIcon, bg: electricBG, title: "Electric" },
  { type: "fairy", icon: fairyIcon, bg: fairyBG, title: "Fairy" },
  { type: "fighting", icon: fightingIcon, bg: fightBG, title: "Fighting" },
  { type: "fire", icon: fireIcon, bg: fireBG, title: "Fire" },
  { type: "flying", icon: flyingIcon, bg: flyingBG, title: "Flying" },
  { type: "ghost", icon: ghostIcon, bg: ghostBG, title: "Ghost" },
  { type: "grass", icon: grassIcon, bg: grassBG, title: "Grass" },
  { type: "ground", icon: groundIcon, bg: groundBG, title: "Ground" },
  { type: "ice", icon: iceIcon, bg: iceBG, title: "Ice" },
  { type: "none-type", icon: noneTypeIcon, bg: null, title: "None" },
  { type: "normal", icon: normalIcon, bg: normalBG, title: "Normal" },
  { type: "poison", icon: poisonIcon, bg: poisonBG, title: "Poison" },
  { type: "psychic", icon: psychicIcon, bg: psychicBG, title: "Psychic" },
  { type: "rock", icon: rockIcon, bg: rockBG, title: "Rock" },
  { type: "steel", icon: steelIcon, bg: steelBG, title: "Steel" },
  { type: "stellar", icon: stellarIcon, bg: stellarBG, title: "Stellar" },
  { type: "water", icon: waterIcon, bg: waterBG, title: "Water" }
];


export const typeColors = {
  normal: "bg-gray-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-500",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-500",
  fighting: "bg-orange-500 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-orange-300 text-white",
  flying: "bg-indigo-500 text-white",
  psychic: "bg-pink-500 text-white",
  bug: "bg-green-700 text-white",
  rock: "bg-gray-700 text-white",
  ghost: "bg-indigo-900 text-white",
  dragon: "bg-purple-900 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-400 text-white",
  fairy: "bg-pink-300",
};