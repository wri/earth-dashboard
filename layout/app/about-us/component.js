import Layout from "layout/layout/layout-app";
import HeroBanner from "layout/app/news/hero-banner";
import Section from "layout/app/news/section";
import EarthHQCTA from "layout/app/news/earth-hq-cta";
import Footer from "layout/footer";
import { Desktop, MediaContextProvider } from "utils/responsive";
import heroBannerStyles from "layout/app/news/hero-banner/hero-banner.module.scss";
import { BG_GALAXY } from "constants/section-colours";
import styles from "layout/app/about-us/about-us.module.scss";

const AboutUsLayout = () => (
  <Layout title="About" description="About EarthHQ">
    <Section
      bgColour={BG_GALAXY}
      paddingBottom={false}
      gridClassName={heroBannerStyles["c-page-section-grid-hero-banner"]}
    >
      <HeroBanner />
    </Section>

    <Section title="Our story">
      <div className={styles["c-about-us"]}>
        <p>
          We created the Earth Dashboard as a &quot;situation room&quot; for the planet. Earth Dashboard combines the
          rigor of scientific data and engaging visualization techniques with the storytelling power of environmental
          news media to present a new way of understanding and confronting the accelerating planetary emergency.
        </p>

        <p>
          From wildfires to air pollution to coral reef bleaching, Earth Dashboard tracks the forces imperilling the
          natural systems that support life on earth, in near-real time, as they are happening. It presents a constant
          flow of reliable, accessible scientific data on what can and must be done to protect the global commons – our
          vital resources and ecosystems.
        </p>

        <p>
          The Earth Dashboard is a joint project of the Global Commons Alliance, the largest coalition of scientific and
          conservation organizations, Resource Watch, an open source platform which compiles hundreds of visualized data
          sets from the world’s most reliable sources, and earth.nullschool.net, a visualization engine for near-real
          time global weather conditions, in partnership with popular environmental news site Mongabay, and leading
          digital news distributer NowThis Earth.
        </p>

        <p>This is a Beta version. Watch this space regularly for new updates.</p>

        <p className="u-margin-bottom-small">The team behind EarthHQ includes:</p>

        <ul className={styles["c-about-us__list"]}>
          <li>Tim Kelly, Executive Director of Earth HQ, Global Commons Alliance</li>
          <li>Cameron Beccario, Founder & CEO, earth.nullschool.net</li>
          <li>Owen Gaffney, Director of Communications, Global Commons Alliance</li>
          <li>Tea Tuur, Earth HQ Product Specialist, World Resources Institute</li>
          <li>Willie Schubert, Program Director, Mongabay</li>
        </ul>

        <p>
          For inquiries and feedback please contact Christine Southam:{" "}
          <a href="mailto:christine@globalcommons.org">christine@globalcommons.org</a>.<br />
          For details and methodology behind the weather data, visit{" "}
          <a href="https://earth.nullschool.net/about.html" rel="noopener noreferrer" target="_blank">
            earth.nullschool.net/about
          </a>
          .
        </p>
      </div>
    </Section>

    <MediaContextProvider>
      <Desktop>
        <EarthHQCTA />
      </Desktop>
    </MediaContextProvider>

    <Section bgColour={BG_GALAXY} paddingBottom={false}>
      <Footer />
    </Section>
  </Layout>
);

AboutUsLayout.propTypes = {};

AboutUsLayout.defaultProps = {};

export default AboutUsLayout;
