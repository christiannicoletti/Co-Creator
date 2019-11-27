import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";

import classes from "./Content.module.css";

import Spinner from "../../../shared/UI/Spinner/Spinner";
import Delete from "../../../shared/UI/Delete/Delete";

class content extends Component {
  state = {
    hoverId: null,
    clickId: null,
    isMouseInside: false
  };

  mouseEnter = index => {
    this.setState({ hoverId: index });
    this.setState({ isMouseInside: true });
  };

  mouseLeave = () => {
    this.setState({ hoverId: null });
    this.setState({ isMouseInside: false });
  };

  onClick = (arraycontent, index, publicName, privateName) => {
    if (publicName === privateName) {
      this.props.deleteFrontEnd(
        `${this.props.arrayName}Array`,
        this.props.array,
        arraycontent
      );
      this.props.deletePublicUserContent(
        this.props.username,
        this.props.arrayName,
        this.props.array,
        arraycontent
      );
      this.setState({ clickId: index });
    }
  };

  render() {
    let publicName = localStorage.getItem("publicuserinfoname");
    let privateName = localStorage.getItem("name");

    const spinner = <Spinner className={classes.Spinner} />
    const deleteTag = <Delete />

    return this.props.array.map((arraycontent, index) => (
      <div
        key={index}
        className={`${this.props.class} ${classes.mapItem}`}
        onClick={() => this.onClick(arraycontent, index, publicName, privateName)}
        onMouseEnter={() => this.mouseEnter(index)}
        onMouseLeave={this.mouseLeave}
      >
        {this.state.isMouseInside && 
        this.state.hoverId === index &&
        publicName === privateName
          ? arraycontent.content ===
              localStorage.getItem(`${arraycontent.content}`) &&
            this.state.clickId === index
            ? ([`${arraycontent.content}`, spinner, deleteTag])
            : ([`${arraycontent.content}`, deleteTag])
          : arraycontent.content ===
              localStorage.getItem(`${arraycontent.content}`) &&
            this.state.clickId === index
            ? ([`${arraycontent.content}`, spinner])
            : arraycontent.content}
      </div>
    ));
  }
}

const mapStateToProps = state => {
  return {
    deleteUserProfileContentLoading:
      state.userProfileDelete.deleteUserProfileContentLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePublicUserContent: (username, arrayName, array, id) => {
      dispatch(actions.deletePublicUserContent(username, arrayName, array, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(content);
