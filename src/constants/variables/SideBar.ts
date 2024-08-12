import { HiOutlineHome } from "react-icons/hi";
import { LuUsers2 } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { PiBagSimpleBold } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaListUl } from "react-icons/fa6";
import { AiOutlineFileSearch } from "react-icons/ai";
import MessageIcon from "./MessageIcon";
import { FamilyCountIcon } from "@assets/icons";

export const links = [
  {
    name: "الرئيسية",
    url: "/",
    icon: HiOutlineHome,
  },
  {
    name: "الناخبين",
    url: "/voters",
    icon: LuUsers2,
  },
  {
    name: "مراكز الاقتراع",
    url: "/centers",
    icon: GrLocation,
  },
  {
    name: "نظام الحسابات",
    url: "/expenses",
    icon: LiaCoinsSolid,
  },
  {
    name: "المهام",
    url: "/tasks",
    icon: FaListUl,
  },
  {
    name: "المناديب",
    url: "/delegates",
    icon: PiBagSimpleBold,
  },
  {
    name: "نظام الرسائل",
    url: "/messages",
    icon: MessageIcon,
  },
  // {
  //   name: "إحصائيات الحركة",
  //   url: "/transportation-statistics",
  //   icon: HiOutlineChartBar,
  // },
  {
    name: "النتائج الأولية",
    url: "/preliminary-results",
    icon: AiOutlineFileSearch,
  },
  {
    name: "شجرة العائلة",
    url: "/family-tree",
    icon: FamilyCountIcon,
  },
];
