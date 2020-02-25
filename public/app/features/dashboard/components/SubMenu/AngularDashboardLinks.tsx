// Libaries
import React, { PureComponent } from 'react';

// Utils & Services
import { AngularComponent, getAngularLoader } from '@grafana/runtime';

// Types
import { DashboardModel } from '../../state/DashboardModel';

export interface Props {
  dashboard: DashboardModel | null;
}

export class AngularDashboardLinks extends PureComponent<Props> {
  element: HTMLElement;
  angularCmp: AngularComponent;

  componentDidMount() {
    const loader = getAngularLoader();

    const template = '<dash-links-container dashboard="dashboard" links="links" class="gf-form-inline" />';

    const scopeProps = {
      dashboard: this.props.dashboard,
      links: this.props.dashboard.links,
    };

    this.angularCmp = loader.load(this.element, scopeProps, template);
  }

  componentWillUnmount() {
    if (this.angularCmp) {
      this.angularCmp.destroy();
    }
  }

  render() {
    return <div ref={element => (this.element = element)} />;
  }
}
