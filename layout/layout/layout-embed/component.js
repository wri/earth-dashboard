import { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withRouter } from "next/router";

// components
import IconsRW from "components/icons";
import HeadApp from "layout/head/app";
import Tooltip from "components/ui/tooltip-legacy";

// vizzuality-components
import { Icons } from "vizzuality-components";

class LayoutEmbed extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string,
    className: PropTypes.string,
    toggleTooltip: PropTypes.func.isRequired,
    updateIsLoading: PropTypes.func.isRequired
  };

  static defaultProps = {
    thumbnailUrl: null,
    className: null
  };

  UNSAFE_componentWillMount() {
    // When a tooltip is shown and the router navigates to
    // another page, the tooltip stays in place because it is
    // managed in Redux
    // The way we prevent this is by listening to the router
    // and whenever we navigate, we hide the tooltip
    // NOTE: we can't just call this.props.toggleTooltip here
    // because for some pages, we don't re-mount the LayoutEmbed
    // component. If we listen for events from the router,
    // we're sure to not miss any page.
    this.props.toggleTooltip(false);
  }

  componentDidMount() {
    const { router } = this.props;
    router.onRouteChangeStart = () => {
      this.props.toggleTooltip(false);
      this.props.updateIsLoading(true);
    };
    router.onRouteChangeComplete = () => {
      this.props.updateIsLoading(false);
    };
  }

  render() {
    const { title, description, className, thumbnailUrl } = this.props;
    const pageClass = classnames({
      "l-page": true,
      [className]: !!className
    });

    return (
      <div className={pageClass}>
        <HeadApp title={title} description={description} thumbnail={thumbnailUrl} />

        <Icons />
        <IconsRW />

        {this.props.children}

        <Tooltip />
      </div>
    );
  }
}

export default withRouter(LayoutEmbed);
