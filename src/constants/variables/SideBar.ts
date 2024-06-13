import { HiOutlineHome } from "react-icons/hi";
import { LuUsers2 } from "react-icons/lu";
import { RxLayers } from "react-icons/rx";
import { GrLocation } from "react-icons/gr";
import { PiBagSimpleBold } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaListUl } from "react-icons/fa6";
import { AiOutlineFileSearch } from "react-icons/ai";
import { HiOutlineChartBar } from "react-icons/hi";

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
    name: "أصواتي",
    url: "/my-votes",
    icon: RxLayers,
  },
  {
    name: "مراكز الاقتراع",
    url: "/centers",
    icon: GrLocation,
  },
  {
    name: "المناديب",
    url: "/delegates",
    icon: PiBagSimpleBold,
  },
  {
    name: "المصروفات",
    url: "/expenses",
    icon: LiaCoinsSolid,
  },
  {
    name: "المهام",
    url: "/tasks",
    icon: FaListUl,
  },
  {
    name: "النتائج الأولية",
    url: "/preliminary-results",
    icon: AiOutlineFileSearch,
  },
  {
    name: "إحصائيات الحركة",
    url: "/transportation-statistics",
    icon: HiOutlineChartBar,
  },
];
