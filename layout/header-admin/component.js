import PropTypes from "prop-types";
import classnames from "classnames";
import Link from "next/link";

// components

// services
import { logoutUser } from "services/user";

// styles
import styles from "./header-admin.module.scss";

function HeaderAdmin(props) {
  return (
    <header className={styles["c-header-admin"]}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <a>
            <img src="/static/images/logo-light.svg" />
          </a>
        </Link>
      </div>
      <div className={styles["logout-button"]} onClick={() => logoutUser()}>
        Logout
      </div>
    </header>
  );
}

export default HeaderAdmin;
