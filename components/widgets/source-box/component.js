import PropTypes from "prop-types";
import ExternalLink from "components/ui/external-link";

// styles
import styles from "./source-box.module.scss";

function SourceBox({ source }) {
  return (
    <div className={styles["c-source-box"]}>
      {Array.isArray(source) &&
        source.map(sourceObj => {
          const sourcePrefix = sourceObj.prefix;
          const sourceSuffix = sourceObj.suffix;

          return (
            <div className={styles["source-container"]} key={`container-${sourcePrefix?.label}-${sourceSuffix?.label}`}>
              <div className={styles.prefix}>
                {sourcePrefix?.link && sourcePrefix?.label && (
                  <ExternalLink link={sourcePrefix?.link} label={sourcePrefix?.label} />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

SourceBox.propTypes = { source: PropTypes.array.isRequired };

export default SourceBox;
