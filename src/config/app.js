import { useApiUrl } from "@/config/url.js";
import CommonConfig from "@/config/common.js";
import SystemConfig from "@/config/system.js";

export default {
  ...CommonConfig,
  ...SystemConfig,
  apiUrl: useApiUrl,
  corporation: "爱有由科技(安徽)有限公司",
  siteName: "牵挂"
};
