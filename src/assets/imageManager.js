// ==========================================
// 統一管理專案內的所有圖片與 Icon
// 之後只要輸入以下就能使用↓↓↓↓↓↓↓↓↓↓↓
// import { Img } from "@/assets/imageManager"
// ==========================================

// --- 1. 品牌主視覺 Logo ---
import logoSubMate from "./images/SubMate_newLogo.svg";
import logoSubMateWord from "./images/SubMate_word_new.svg";
import logoDefault from "./images/logo.svg";

// --- 2. 產品/串流平台 Logo ---
import logoNetflix from "./images/Property1_NETFLIX.svg";
import logoDisney from "./images/Property1_Disney+.svg";
import logoYoutube from "./images/Property1_YouTubePremium.svg";
import logoKktv from "./images/Property1_KKTV.svg";
import logoIqiyi from "./images/Property1_iQIYI.svg";
import logoSpotify from "./images/Property1_Spotify.svg";
import logoHami from "./images/Property1_HamiVideo.svg";
import logoFriday from "./images/Property1_friday.svg";
import logoCanva from "./images/Property1_Canva.svg";
import logoMiro from "./images/Property1_miro.svg";
import logoMicrosoft from "./images/Property1_Microsoft365.svg";
import logoNotion from "./images/Property1_Notion.svg";

// --- 3. 社群與第三方登入 Icon ---
import iconFacebook from "./images/facebook.svg";
import iconInstagram from "./images/instagram.svg";
import iconLine from "./images/line-icon.svg";
import iconGmail from "./images/gmail-icon.svg";
import iconApple from "./images/apple-icon.svg";

// --- 4. 共用介面 Icon (Header / UI) ---
import iconCart from "./images/shopping-cart.svg";
import iconPortrait from "./images/portrait.svg";
import titleItemImg from "./images/title item.svg";
import iconCheckCircle from "./images/check-circle.svg";
import iconAlertCircle from "./images/alert-circle.svg";

// 將所有圖片打包成一個 Img 物件匯出
export const Img = {
  // 主 Logo
  logoSubMate,
  logoSubMateWord,
  logoDefault,

  // 產品 Logo
  logoNetflix,
  logoDisney,
  logoYoutube,
  logoKktv,
  logoIqiyi,
  logoSpotify,
  logoHami,
  logoFriday,
  logoCanva,
  logoMiro,
  logoMicrosoft,
  logoNotion,

  // 社群/登入 Icon
  iconFacebook,
  iconInstagram,
  iconLine,
  iconGmail,
  iconApple,

  // 介面 Icon
  iconCart,
  iconPortrait,
  titleItemImg,
  iconCheckCircle,
  iconAlertCircle,
};
