import React, { Component } from 'react';

export default class OutsideAlert extends Component<{handler: () => any}, {}> {
  public wrapperRef: any;

  constructor(props: any) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  public componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  public setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  public handleClickOutside(event: MouseEvent) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handler();
    }
  }

  public render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}
