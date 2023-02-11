import { useState } from "react";
import { FiHome, FiList, FiMessageCircle, FiUser } from "react-icons/fi";
import styles from "./styles.module.scss";

enum TabName {
  Home,
  Tasks,
  Users,
  Chat,
}

export const BottomTabNavigator = () => {
  const [selectedTab, SetSelectedTab] = useState(TabName.Home);
  return (
    <div className={styles.navigatorContainer}>
      <FiHome
        color={selectedTab === TabName.Home ? "var(--purple)" : "var(--grey)"}
        size={24}
        onClick={() => SetSelectedTab(TabName.Home)}
      />
      <FiList
        color={selectedTab === TabName.Tasks ? "var(--purple)" : "var(--grey)"}
        size={24}
        onClick={() => SetSelectedTab(TabName.Tasks)}
      />
      <FiUser
        color={selectedTab === TabName.Users ? "var(--purple)" : "var(--grey)"}
        size={24}
        onClick={() => SetSelectedTab(TabName.Users)}
      />
      <FiMessageCircle
        color={selectedTab === TabName.Chat ? "var(--purple)" : "var(--grey)"}
        size={24}
        onClick={() => SetSelectedTab(TabName.Chat)}
      />
    </div>
  );
};
